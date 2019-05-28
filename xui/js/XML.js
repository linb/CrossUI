xui.Class('xui.XML',null,{
    Static:{
        //return xml text (for post data)
        json2xml:function(jsonObj, kf, vf){
           var arr=[],
           _f=function(key,value,arr){
                if(typeof value=="object"){
                    if(xui.isArr(value)){
                        if(value.length){
                            for(var i=0,l=value.length; i<l; i++)
                                arr.push(_f(key,value[i],arr));
                        }else
                            arr.push("<"+(kf?kf(key):key)+">"+"__[]__"+"</"+(kf?kf(key):key)+">");
                    }else{
                        var b;
                        arr.push("<"+(kf?kf(key):key));
                        for(var i in value) {
                            if(i.charAt(0)=="@")
                                arr.push(" "+i.substr(1)+'="'+(vf?vf(value[i]):value[i])+'"');
                            else
                                b=1;
                        }
                        arr.push(b?">":"/>");
                        if(b){
                            for(var i in value) {
                                if(i=="#text")
                                    arr.push((vf?vf(value[i]):value[i]));
                                else if(i=="#cdata")
                                    arr.push("<![CDATA["+(vf?vf(value[i]):value[i])+"]]>");
                                else if (i.charAt(0)!="@")
                                    arr.push(_f(i,value[i],arr));
                            }
                            arr.push("</"+(kf?kf(key):key)+">");
                        }
                    }
                }else
                    arr.push("<"+(kf?kf(key):key)+">"+(vf?vf(value):value)+"</"+(kf?kf(key):key)+">");
           };
           for(var i in jsonObj)
              _f(i,jsonObj[i],arr);
           return '<?xml version="1.0" encoding="UTF-8" ?>'+arr.join('');
        },
        //return json object (for request data)
        xml2json:function(xmlObj){
            if(xmlObj.nodeType==9)
                xmlObj=xmlObj.documentElement;
            var o={},
            M={
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"' : '\\"',
                '\\': '\\\\'
            },
            R=/^-?(\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/,
            _map={
                "__[]__":[],
                "null":null,
                'false':false,
                'true':true
             },
            _es=function(str){
                return str.replace(/[\s\S]/g,function(a,b){return (b=M[a])?b:a});
            },
            _clear = function(xml) {
                var n,k;
                xml.normalize();
                for(n=xml.firstChild;n;){
                    k=n;
                    if(n.nodeType==1)_clear(n);
                    n=n.nextSibling;
                    if(k.nodeType==3 && !k.nodeValue.match(/\S/))
                        xml.removeChild(k);
                }
                return xml;
            },
            _xml=function(n){
                if ("innerHTML" in n){
                    n=n.innerHTML;
                    n=n in _map?_map[n]:R.test(n)?parseFloat(n):n;
                }else{
                    var arr=[],t,
                    _in=function(n) {
                        if(n.nodeType==1) {
                            arr.push("<"+n.nodeName);
                            var m=n.attributes;
                            for(var i=0,l=m.length;i<l;i++)
                                arr.push(" "+m[i].nodeName+'="'+(m[i].nodeValue||"")+'"');
                            if (n.firstChild) {
                                arr.push(">");
                                for(m=n.firstChild;m;m=m.nextSibling)
                                    arr.push(_in(m));
                                arr.push("</"+n.nodeName+">");
                            }else arr.push("/>");
                        }else if(n.nodeType==3){
                            n=n.nodeValue;
                            arr.push(n in _map?_map[n]:R.test(n)?parseFloat(n):n);
                        }else if(n.nodeType==4)
                            arr.push("<![CDATA[" + n.nodeValue + "]]>");
                    };
                    for(var m=n.firstChild;m;m=m.nextSibling)
                        _in(m);
                    n=(arr.length==1?arr[0]:arr.join(''))
                }
                return typeof n=='string'?_es(n):n;
            },
            _f=function(xml){
                var o=null,t,tt;
                if(xml.nodeType==1 && ((t=xml.attributes).length||xml.firstChild)){
                    o={};
                    if(t.length){
                        for(var i=0,l=t.length;i<l;i++)
                            o["@"+t[i].nodeName]=(t[i].nodeValue||"")+"";
                    }
                    if(xml.firstChild){
                        var text=0, cdata=0, children=0, n;
                        for(n=xml.firstChild;n;n=n.nextSibling){
                            tt=n.nodeType;
                            if(tt==1)
                                children++;
                            else if(tt==3)
                                text++;
                            else if(tt==4)
                                cdata++;
                        }
                        if(children){
                            if(text<2 && cdata<2) {
                                for(n=xml.firstChild;n;n=n.nextSibling){
                                    if (n.nodeType==3)
                                        o["#text"]=_es(n.nodeValue);
                                    else if(n.nodeType==4)
                                        o["#cdata"]=_es(n.nodeValue);
                                    else if(o[tt=n.nodeName]){
                                        if(o[tt] instanceof Array)
                                            o[tt][o[tt].length]=_f(n);
                                        else
                                            o[tt]=[o[tt],_f(n)];
                                    }else
                                        o[tt]=_f(n);
                                }
                            }else {
                                if(!t.length)
                                    o=_xml(xml);
                                else
                                    o["#text"]= _xml(xml);
                            }
                        }else if(text){
                            if(!t.length) {
                                o=_xml(xml);
                            }else
                                o["#text"]=_xml(xml);
                        }else if(cdata) {
                            if(cdata>1)
                                o=_xml(xml);
                            else
                                for(n=xml.firstChild;n;n=n.nextSibling)
                                    o["#cdata"] = _es(n.nodeValue);
                        }
                    }
                }
                return o;
            };
            o[xmlObj.nodeName]=_f(_clear(xmlObj));
            return o;
        },
        parseXML:function(xmlText){
            var dom=null;
            if(typeof DOMParser=='undefined'){
                try{
                    dom=new ActiveXObject('Microsoft.XMLDOM');
                    dom.async=false;
                    dom.loadXML(xmlText||"");
                }catch(e){dom=null}
            }else{
                try{
                    var p=new DOMParser();
                    dom=p.parseFromString(xmlText||"", "text/xml");
                }catch(e){dom=null}finally{p=null}
            }
            return dom;
        }
    }
});