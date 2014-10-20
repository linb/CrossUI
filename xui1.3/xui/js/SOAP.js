Class('xui.SOAP',null,{
    Static:{
        RESULT_NODE_NAME:"return",

        getNameSpace:function(wsdl){
            var ns=wsdl.documentElement.attributes["targetNamespace"];
            return ns===undefined?wsdl.documentElement.attributes.getNamedItem("targetNamespace").nodeValue:ns.value;
        },
        getWsdl:function(queryURL,onFail){
            var rst=false;

            // sync call for wsdl
            xui.Ajax(queryURL+'?wsdl',null,function(rspData){
                rst=rspData;
            },function(){
                _.tryF(onFail,arguments,this);
            },null,{
                method:'GET',
                rspType:'xml',
                asy:false
            }).start();

            return rst;
        },
        wrapRequest:function(methodName, params, wsdl){
            if(typeof methodName=="object"){
                wsdl=params;
                params=methodName.params;
                methodName=methodName.methodName;
            }
            var ns=this, namespace=ns.getNameSpace(wsdl);
            //return "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
            return  "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
                    "<soap:Body>" +
                    "<" + methodName + " xmlns=\""+namespace+"\">" +
                    ns._wrapParams(params) +
                    "</"+methodName+"></soap:Body></soap:Envelope>";
        },
        parseResponse:function(xmlObj, methodName, wsdl){
            if(typeof methodName=="object"){
                methodName=methodName.methodName;
            }
            var ns=this,
                hash={},
                nd=xmlObj.getElementsByTagName(methodName+"Result");
            if(!nd.length)
                nd=xmlObj.getElementsByTagName(ns.RESULT_NODE_NAME);
            if(!nd.length){
                hash.fault={
                    faultcode:xmlObj.getElementsByTagName("faultcode")[0].childNodes[0].nodeValue,
                    faultstring:xmlObj.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue
                };
            }else{
                hash.result=ns._rsp2Obj(nd[0],wsdl);
            }
            return hash;
        },
        _rsp2Obj:function(xmlNode, wsdl){
            var ns=this,
                types=ns._getTypesFromWsdl(wsdl);
            return ns._node2obj(xmlNode,types);
        },
        _getTypesFromWsdl:function(wsdl){
            var types=[],
                ell,useNamedItem;

            ell=wsdl.getElementsByTagName("s:element");
            if(ell.length){
                useNamedItem=true;
            }else{
                ell=wsdl.getElementsByTagName("element");
                useNamedItem=false;
            }
            for(var i=0,l=ell.length;i<l;i++){
                if(useNamedItem){
                    if(ell[i].attributes.getNamedItem("name") != null && ell[i].attributes.getNamedItem("type") != null)
                        types[ell[i].attributes.getNamedItem("name").nodeValue] = ell[i].attributes.getNamedItem("type").nodeValue;
                }else{
                    if(ell[i].attributes["name"] != null && ell[i].attributes["type"] != null)
                        types[ell[i].attributes["name"].value] = ell[i].attributes["type"].value;
                }
            }
            return types;
        },
        _getTypeFromWsdl:function(elems, types){
            return types[elems]==undefined?"":types[elems];
        },
        _node2obj:function(xmlNode, types){
            if(xmlNode==null)return null;
            var ns=this,value,tmp;
            if(xmlNode.nodeType==3||xmlNode.nodeType==4){
                value=xmlNode.nodeValue;
                switch(ns._getTypeFromWsdl(xmlNode.parentNode.nodeName, types).toLowerCase()){
                    case "s:boolean":
                        return value+""=="true";
                    case "s:int":
                    case "s:long":
                        return value===null?0:parseInt(value+"", 10);
                    case "s:double":
                        return value===null?0:parseFloat(value+"");
                    case "s:datetime":
                        if(value == null)
                            return null;
                        else{
                            if(tmp=value.match(ns._dateMatcher)){
                                var d = new Date;
                                if(tmp[1]) d.setUTCFullYear(parseInt(tmp[1],10));
                                if(tmp[2]) d.setUTCMonth(parseInt(tmp[2]-1,10));
                                if(tmp[3]) d.setUTCDate(parseInt(tmp[3],10));
                                if(tmp[4]) d.setUTCHours(parseInt(tmp[4],10));
                                if(tmp[5]) d.setUTCMinutes(parseInt(tmp[5],10));
                                if(tmp[6]) d.setUTCSeconds(parseInt(tmp[6],10));
                                if(tmp[7]) d.setUTCMilliseconds(parseInt(tmp[7],10));
                                return d;
                            }
                            return null;
                        }
                    //case "s:string":
                    default:
                        return value===null?"":(value+"");
                }
            }else if(xmlNode.childNodes.length==1&&(xmlNode.childNodes[0].nodeType==3||xmlNode.childNodes[0].nodeType==4))
                return ns._node2obj(xmlNode.childNodes[0], types);
            else{
                if(ns._getTypeFromWsdl(xmlNode.nodeName, types).toLowerCase().indexOf("arrayof") == -1){
                    var obj=xmlNode.hasChildNodes()?{}:null;
                    for(var i=0,l=xmlNode.childNodes.length;i<l;i++)
                        obj[xmlNode.childNodes[i].nodeName]=ns._node2obj(xmlNode.childNodes[i], types);
                    return obj;
                }else{
                    var arr =[];
                    for(var i=0,l=xmlNode.childNodes.length;i<l;i++)
                        arr.push(ns._node2obj(xmlNode.childNodes[i], types));
                    return arr;
                }
            }
            return null;
        },
         _wrapParams:function(params){
            var ns=this,arr=[];
            for(var p in params){
                switch(typeof(params[p])){
                    case "string":
                    case "number":
                    case "boolean":
                    case "object":
                        arr.push("<" + p + ">" + ns._wrapParam(params[p]) + "</" + p + ">");
                        break;
                    default:
                        break;
                }

            }
            return arr.join('');
        },
        _map:{
            "<":"&lt;",
            ">":"&gt;",
            "&":"&amp;",
            '"':"&quot;",
            "'":"&apos;"
        },
        _wrapParam:function(param){
            var ns=this,
                s="",
                map=ns._map,
                sign,sign2,type,value;
            switch(typeof(param)){
                case "string":
                    s += param.replace(/[<>&"']/g, function(a){return map[a]});
                    break;
                case "number":
                case "boolean":
                    s += param+"";
                    break;
                case "object":
                    sign=Object.prototype.toString.call(param);
                    // Date
                    if(sign==='[object Date]' && isFinite(+param)){
                        s += ns._date2utc(param);
                    }else if(sign==='[object Array]'){
                        for(var p in param){
                            value=param[p];
                            switch(typeof value){
                                case 'number':
                                    type=parseInt(value,10)===Math.ceil(value)?'int':'double';
                                    break;
                                case 'boolean':
                                    type='bool';
                                    break;
                                case 'string':
                                    type='string';
                                    break;
                                case 'object':
                                    sign2=Object.prototype.toString.call(value);
                                    if(sign2==='[object Array]'){
                                        type="Array";
                                    }else if(sign2==='[object Date]' && isFinite(+value)){
                                        type="DateTime";
                                    }else
                                        type="object";
                                    break;
                            }
                            s += "<"+type+">"+ns._wrapParam(param[p])+"</"+type+">";
                        }
                    }else{
                        for(var p in param)
                            if(param.hasOwnProperty(p))
                                s += "<"+p+">"+ns._wrapParam(param[p])+"</"+p+">";
                    }
                    break;
            }
            return s;
        },
        _date2utc:function(d){
            var ns=this,r=this._zeroPad;
            return d.getUTCFullYear()+'-'+
               r(d.getUTCMonth()+1)+'-'+
               r(d.getUTCDate())+'T'+
               r(d.getUTCHours())+':'+
               r(d.getUTCMinutes())+':'+
               r(d.getUTCSeconds())+'.'+
               r(d.getUTCMilliseconds(), 3);
        },
        _zeroPad:function(v,w){
            if(!w)w=2;
            v=((!v&&v!==0)?'':(''+v));
            while(v.length<w)v='0'+v;
            return v;
        }
    }
});