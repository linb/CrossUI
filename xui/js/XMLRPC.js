xui.Class('xui.XMLRPC',null,{
    Static:{
        //wrapRequest(hash)
        // or wrapRequest(string, hash)
        wrapRequest:function(methodName,params){
            if(typeof methodName=="object"){
                params=methodName.params;
                methodName=methodName.methodName;
            }

            if(!methodName)return null;
            if(params && !(params instanceof Array))return null;

            var ns=this,
                xml = ['<?xml version="1.0"?><methodCall><methodName>'+ methodName+'</methodName>'];
            if(params){
                xml.push('<params>');
                for(var i=0,j=params.length;i<j;i++)
                    xml.push('<param>'+ns._wrapParam(params[i])+'</param>');
                xml.push('</params>');
            }
            xml.push('</methodCall>');
            return xml.join('');
        },
        parseResponse:function(xmlObj){
            if(!xmlObj || !xmlObj.documentElement)return null;
            var doc=xmlObj.documentElement;
            if(doc.nodeName!='methodResponse')return null;
            var ns=this,
                json={},
                err,elem;

            elem = doc.getElementsByTagName('value')[0];
            if(elem.parentNode.nodeName=='param'&&elem.parentNode.parentNode.nodeName=='params'){
                json.result=ns._parseElem(elem);
            }
            else if(elem.parentNode.nodeName=='fault'){
                err=ns._parseElem(elem);
                json.error = {
                    code:err.faultCode,
                    message:err.faultString
                };
            }
            else return null;

            if(!json.result && !json.error)
                return null;
            return json;
        },
        _dateMatcher:/^(?:(\d\d\d\d)-(\d\d)(?:-(\d\d)(?:T(\d\d)(?::(\d\d)(?::(\d\d)(?:\.(\d+))?)?)?)?)?)$/,
        _parseElem:function(elem){
            var ns=this,
                nodes=elem.childNodes,
                typeElem, dateElem, name, value, tmp;
            if(nodes.length==1&&nodes.item(0).nodeType==3)
                return nodes.item(0).nodeValue;

            for(var i=0,l=nodes.length;i<l;i++){
                if(nodes.item(i).nodeType==1){
                    typeElem=nodes.item(i);
                    switch(typeElem.nodeName.toLowerCase()){
                        case 'i4':
                        case 'int':
                            value=parseInt(typeElem.firstChild.nodeValue,10);
                            return isNaN(value)?null:value;
                        case 'double':
                            value=parseFloat(typeElem.firstChild.nodeValue);
                            return isNaN(value)?null:value;
                        case 'boolean':
                            return Boolean(parseInt(typeElem.firstChild.nodeValue,10)!==0);
                        case 'string':
                            return typeElem.firstChild?typeElem.firstChild.nodeValue:"";
                        case 'datetime.iso8601':
                            if(tmp=typeElem.firstChild.nodeValue.match(ns._dateMatcher)){
                                value = new Date;
                                if(tmp[1]) value.setUTCFullYear(parseInt(tmp[1],10));
                                if(tmp[2]) value.setUTCMonth(parseInt(tmp[2]-1,10));
                                if(tmp[3]) value.setUTCDate(parseInt(tmp[3],10));
                                if(tmp[4]) value.setUTCHours(parseInt(tmp[4],10));
                                if(tmp[5]) value.setUTCMinutes(parseInt(tmp[5],10));
                                if(tmp[6]) value.setUTCSeconds(parseInt(tmp[6],10));
                                if(tmp[7]) value.setUTCMilliseconds(parseInt(tmp[7],10));
                                return value;
                            }
                            return null;
                        case 'base64':
                            return null;
                        case 'nil':
                            return null;
                        case 'struct':
                            value = {};
                            for(var mElem,j=0;mElem=typeElem.childNodes.item(j);j++){
                                if(mElem.nodeType==1&&mElem.nodeName=='member'){
                                    name='';
                                    elem=null;
                                    for(var child,k=0;child=mElem.childNodes.item(k);k++){
                                        if(child.nodeType==1){
                                            if(child.nodeName=='name')
                                                name=child.firstChild.nodeValue;
                                            else if(child.nodeName=='value')
                                                elem = child;
                                        }
                                    }
                                    if(name&&elem)
                                       value[name] = ns._parseElem(elem);
                                }
                            }
                            return value;
                        case 'array':
                                value = [];
                                dateElem=typeElem.firstChild;
                                while(dateElem&&(dateElem.nodeType!=1||dateElem.nodeName!='data'))
                                    dateElem = dateElem.nextSibling;
                                if(!dateElem)
                                    return null;
                                elem=dateElem.firstChild;
                                while(elem){
                                    if(elem.nodeType==1)
                                        value.push(elem.nodeName=='value'?ns._parseElem(elem):null);
                                    elem=elem.nextSibling;
                                }
                                return value;
                        default:
                                return null;
                    }
                }
            }
            return null;
        },
        _map:{
            "<":"&lt;",
            ">":"&gt;",
            "&":"&amp;",
            '"':"&quot;",
            "'":"&apos;"
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
        },
        _wrapParam:function(value){
            var ns=this,
                map=ns._map,
                xml=['<value>'],sign;
            switch(typeof value){
                case 'number':
                    xml.push(!isFinite(value)?'<nil/>':
                        parseInt(value,10)===Math.ceil(value)?('<int>'+value+'</int>'):
                        ('<double>'+value+'</double>')
                    );
                    break;
                case 'boolean':
                    xml.push('<boolean>'+(value?'1':'0')+'</boolean>');
                    break;
                case 'string':
                    xml.push('<string>'+value.replace(/[<>&"']/g, function(a){return map[a]})+'</string>');
                    break;
                case 'undefined':
                    xml.push('<nil/>');
                case 'function':
                    xml.push('<string>'+(""+value).replace(/[<>&"']/g, function(a){return map[a]})+'</string>');
                case 'object':
                    sign=Object.prototype.toString.call(value);
                    if(value===null)
                        xml.push('<nil/>');
                    else if(sign==='[object Array]'){
                        xml.push('<array><data>');
                        for(var i=0,j=value.length;i<j;i++)
                            xml.push(ns._wrapParam(value[i]));
                        xml.push('</data></array>');
                    }
                    else if(sign==='[object Date]' && isFinite(+value)){
                        xml.push('<dateTime.iso8601>' + ns._date2utc(value) + '</dateTime.iso8601>');
                    }
                    else {
                        xml.push('<struct>');
                        for(var key in value)
                            if(value.hasOwnProperty(key))
                                xml.push('<member>'+'<name>'+key+'</name>'+ns._wrapParam(value[key])+'</member>');
                        xml.push('</struct>');
                    }
                    break;
            }
            xml.push('</value>');
            return xml.join('');
        }
    }
});