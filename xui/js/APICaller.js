xui.Class("xui.APICaller","xui.absObj",{
    Instance:{
        _ini:xui.Timer.prototype._ini,
        _after_ini:function(profile,ins,alias){
             if(!profile.name)profile.Instace.setName(alias);
        },
        destroy:function(){
            this.each(function(profile){
              if(!profile.destroyed){
                var box=profile.box,name=profile.properties.name;
                //delete from pool
                delete box._pool[name];
                //free profile
                profile.__gc();
              }
            });
        },
        setHost:function(value, alias){
            var self=this;
            if(value && alias)
                self.setName(alias);
            return arguments.callee.upper.apply(self,arguments);
        },

        setQueryData:function(data, path){
            return this.each(function(prf){
                if(path)xui.set(prf.properties.queryData, (path||"").split("."), data);
                else prf.properties.queryData=data||{};
            });
        },
        setQueryArgs:function(data, path){
            return this.each(function(prf){
                if(path)xui.set(prf.properties.queryArgs, (path||"").split("."), data);
                else prf.properties.queryArgs=data||{};
            });
        },
        invoke:function(onSuccess, onFail, onStart, onEnd, mode, threadid, options){
            var ns=this,
                con=ns.constructor,
                prf=ns.get(0),
                prop=prf.properties,
                funs=xui.$cache.functions,
                t1=funs['$APICaller:beforeInvoke'],
                t2=funs['$APICaller:beforeData'],
                t3=funs['$APICaller:onError'];
            // the global handler
            if(xui.isFun(t1) && false===t1(requestId, prf))
                return;
            else if( xui.isHash(t1) && xui.isArr(t1.actions) && false===xui.pseudocode._callFunctions(t1,  [requestId, prf], ns.getHost(),null,null,'$APICaller:beforeInvoke'))
                return;
            // Normally, Gives a change to modify "queryArgs" for XML
            if(prf.beforeInvoke && false===prf.boxing().beforeInvoke(prf, requestId))
                return;

            var responseType=prop.responseType,
                requestType=prop.requestType,
                requestId=prop.requestId,
                queryURL=prop.queryURL,
                proxyType=prop.proxyType.toLowerCase(),
                queryUserName=prop.queryUserName,
                queryPassword=prop.queryPassword,
                queryData=prop.queryData,
                queryArgs=xui.clone(prop.queryArgs),
                oAuth2Token=prop.oAuth2Token,
                queryOptions=xui.clone(prop.queryOptions),
                queryHeader=xui.clone(prop.queryHeader),
                requestDataSource=prop.requestDataSource,
                responseDataTarget=prop.responseDataTarget,
                responseCallback=prop.responseCallback;

            queryURL = xui.adjustVar(queryURL);

            if(proxyType=="sajax") proxyType="jsonp";
            else if(proxyType=="iajax") proxyType="xdmi";
            if(requestType=="FORM"||requestType=="JSON") queryArgs = typeof queryArgs=='string'?xui.unserialize(queryArgs):queryArgs;
            if(!queryArgs)queryArgs={};
            if(prop.avoidCache){
                var i=0, rnd="_rand_";
                while(queryArgs.hasOwnProperty(rnd))rnd="_rand_" + ++i;
                queryArgs[rnd] = xui.rand();
            }
            // merge request data
            if(requestDataSource&&requestDataSource.length){
                for(var i in requestDataSource){
                    var o=requestDataSource[i],t,v,path;
                    switch(o.type){
                        case "databinder":
                            if(t = xui.DataBinder.getFromName(o.name)){
                                if(mode!=="force" && !t.updateDataFromUI()){
                                    return;
                                }else{
                                    path=(o.path||"").split('.');
                                    if(xui.isHash(v = xui.get(queryArgs, path)))xui.merge(v, t.getData(), 'without');
                                    else xui.set(queryArgs, path,t.getData());
                                }
                            }
                            break;
                        case "form":
                            if((t = xui.get(prf,["host",o.name])) && t.Class['xui.absContainer'] && t.getRootNode()){
                                if(mode!=="force" && (!t.checkValid() || !t.checkRequired())){
                                    return;
                                }else{
                                    path=(o.path||"").split('.');
                                    if(xui.isHash(v = xui.get(queryArgs, path)))xui.merge(v, t.getFormValues(), 'without');
                                    else xui.set(queryArgs, path,t.getFormValues());
                                }
                            }
                            break;
                    }
                }
            }

            // for auto adjusting options
            var rMap={header:{}};
            if(!xui.isEmpty(queryHeader)){
                xui.merge(rMap.header, queryHeader);
            }
            if(queryOptions.header && !xui.isEmpty(queryOptions.header)){
                xui.merge(rMap.header, queryOptions.header);
                delete queryOptions.header;
            }
            if(responseType=='SOAP'||requestType=='SOAP'){
                // for wsdl
                if(!con.WDSLCache)con.WDSLCache={};
                if(!con.WDSLCache[queryURL]){
                    var wsdl=xui.SOAP.getWsdl(queryURL,function(rspData){
                       if(prf.afterInvoke)prf.boxing().afterInvoke(prf, rspData, requestId);

                        // the global handler
                        if(xui.isFun(t3))t3(rspData, requestId, prf);
                        else if( xui.isHash(t3) && xui.isArr(t3.actions))xui.pseudocode._callFunctions(t3,  [rspData, requestId, prf], ns.getHost(),null,null,'$APICaller:onError');

                        if(prf.onError)prf.boxing().onError(prf, rspData, requestId);
                        xui.tryF(onFail,arguments,this);
                        xui.tryF(onEnd,arguments,this);
                    });
                    if(wsdl)
                        con.WDSLCache[queryURL] = wsdl;
                    else
                        // stop the further call
                        return;
                }
            }
            switch(responseType){
                case "TEXT":
                    rMap.rspType="text";
                break;
                case "JSON":
                    rMap.rspType="json";
                break;
                case "XML":
                    proxyType="ajax";
                    rMap.rspType="xml";
                break;
                case "SOAP":
                    proxyType="ajax";
                    rMap.rspType="xml";
                    var namespace=xui.SOAP.getNameSpace(con.WDSLCache[queryURL]),
                        action = ((namespace.lastIndexOf("/")!=namespace.length-1)?namespace+"/":namespace)+(queryArgs.methodName||"");
                    rMap.header["SOAPAction"]=action;
                break;
            }
            switch(requestType){
                case "FORM":
                    // ensure object
                    queryArgs = typeof queryArgs=='string'?xui.unserialize(queryArgs):queryArgs;
                break;
                case "JSON":
                    rMap.reqType="json";

                    if(prop.queryMethod=="auto")
                        rMap.method="POST";
                    // ensure string
                    queryArgs = typeof queryArgs=='string'?queryArgs:xui.urlEncode(queryArgs);
                break;
                case "XML":
                    rMap.reqType="xml";
                    proxyType="ajax";
                    rMap.method="POST";
                    if(queryUserName && queryPassword){
                        rMap.username=queryUserName;
                        rMap.password=queryPassword;
                        rMap.header["Authorization"]="Basic "+con._toBase64(queryUserName+":"+queryPassword);
                    }
                    // ensure string
                    queryArgs = typeof queryArgs=='string'?queryArgs:xui.XMLRPC.wrapRequest(queryArgs);
                break;
                case "SOAP":
                    rMap.reqType="xml";
                    proxyType="ajax";
                    rMap.method="POST";
                    if(queryUserName && queryPassword){
                        rMap.username=queryUserName;
                        rMap.password=queryPassword;
                        rMap.header["Authorization"]="Basic "+con._toBase64(queryUserName+":"+queryPassword);
                    }
                    // ensure string
                    queryArgs = typeof queryArgs=='string'?queryArgs:xui.SOAP.wrapRequest(queryArgs, con.WDSLCache[queryURL]);
                break;
            }
            if(oAuth2Token)
               rMap.header["Authorization"]="Bearer " + oAuth2Token

            // Ajax/JSONP/XDMI
            if(proxyType!="ajax")
                rMap.asy=true;
            if(proxyType=="jsonp")
                rMap.method="GET";

            options=options||{};
            if(!("asy" in options))
                options.asy=!!prop.queryAsync;
            if(!("method" in options)&&prop.queryMethod!="auto")
                options.method=prop.queryMethod;
            if(!("onEnd" in options))
                options.onEnd=onEnd;
            if(!("onStart" in options))
                options.onStart=onStart;

            xui.merge(options, queryOptions);

            xui.merge(options, rMap, 'all');
            options.proxyType=proxyType;

            if(queryData)options.data=queryData;

            if(xui.isEmpty(options.header)){
                delete options.header;
            }
            var cookies={},t;
            if(!xui.isEmpty(prop.fakeCookies)){
                options.$onStart = function(){
                    xui.each(prop.fakeCookies,function(v,k){
                        if(xui.isSet(t=xui.Cookies.get(k))){
                            cookies[k] = t;
                            xui.Cookies.remove(k);
                        }
                    });
                    xui.Cookies.set(prop.fakeCookies,1,"/");
                }
            }
            if(!xui.isEmpty(prop.fakeCookies)){
                options.$onEnd = function(){
                    xui.each(prop.fakeCookies,function(v,k){
                        xui.Cookies.remove(k);
                    });
                    xui.Cookies.set(cookies);
                };
            }
            var ajax = xui._getrpc(queryURL, queryArgs, options).apply(null, [queryURL, queryArgs, function(rspData){
                var mapb,t;
                // ensure to json
                if((responseType=="XML"||responseType=="SOAP") && !xui.isHash(rspData)){
                    if(xui.isStr(rspData))
                        rspData=xui.XML.parseXML(rspData);
                    if(responseType=="XML")
                        rspData=xui.XMLRPC.parseResponse(rspData);
                    else if(responseType=="SOAP")
                        rspData=xui.SOAP.parseResponse(rspData, queryArgs.methodName, con.WDSLCache[queryURL]);
                }
                // Normally, Gives a change to modify the "rspData"
                if(prf.afterInvoke){
                    mapb = prf.boxing().afterInvoke(prf, rspData, requestId);
                    if(xui.isSet(mapb))rspData=mapb;
                    mapb=null;
                }

                // the global handler
                if(xui.isFun(t2) && false===t2(rspData, requestId, prf)){
                    return false;
                }else if( xui.isHash(t2) && xui.isArr(t2.actions)
                        && false===xui.pseudocode._callFunctions(t2,  [rspData, requestId, prf], ns.getHost(),null,null,'$APICaller:beforeData')
                    ){
                    return false;
                }
                if(prf.beforeData && false===prf.boxing().beforeData(prf, rspData, requestId)){
                    return false;
                }
                if(responseDataTarget&&responseDataTarget.length){
                    xui.arr.each(responseDataTarget, function(o){
                        var data = o.path?xui.get(rspData,o.path.split('.')):rspData,t;
                        switch(o.type){
                            case "alert":
                                data = xui.stringify(data);
                                if(xui.Coder)data=xui.Coder.formatText(data);
                                alert(data);
                            break;
                            case "log":
                                xui.log(data);
                            break;
                            case "databinder":
                                if(t = xui.DataBinder.getFromName(o.name)){
                                    t.setData(data);
                                    t.updateDataToUI();
                                }
                                break;
                            case "form":
                                if((t = xui.get(prf,["host",o.name])) && t.Class['xui.absContainer'] /*&& t.getRootNode()*/){
                                    t.setFormValues(data);
                                }
                                break;
                        }
                    });
                }
                if(responseCallback&&responseCallback.length){
                    xui.arr.each(responseCallback, function(o){
                        var t,host;
                        switch(o.type){
                            case "host":
                                if((t=ns.getHost()) && (t=t.functions) && (t=t[o.name])){
                                    host = ns.getHost();
                                }
                            break;
                            default:
                                if((t=xui.$cache.functions[o.name])){
                                    host = null;
                                }
                                break;
                        }
                        if(t && t.actions && xui.isArr(t.actions)){
                            xui.pseudocode._callFunctions(t, [rspData, ns], host,null,null,(host&&host.alias)+"."+ns.alias + "." + o.name);
                        }
                    });
                }
                if(prf.onData)prf.boxing().onData(prf, rspData, requestId);
                xui.tryF(onSuccess,arguments,this);

            }, function(rspData){
                if(prf.afterInvoke)prf.boxing().afterInvoke(prf, rspData, requestId);

                if(responseDataTarget&&responseDataTarget.length){
                    xui.arr.each(responseDataTarget, function(o, t){
                        switch(o.type){
                            case "alert":
                                rspData = xui.stringify(rspData);
                                if(xui.Coder)rspData=xui.Coder.formatText(rspData);
                                alert(rspData);
                            break;
                            case "log":
                                xui.log(rspData);
                            break;
                        }
                    });
                }

                // the global handler
                if(xui.isFun(t3))t3(rspData, requestId, prf);
                else if( xui.isHash(t3) && xui.isArr(t3.actions))xui.pseudocode._callFunctions(t3,  [rspData, requestId, prf], ns.getHost(),null,null,'$APICaller:onError');

                if(prf.onError)prf.boxing().onError(prf, rspData, requestId);
                xui.tryF(onFail,arguments,this);
            }, threadid, options]);

            if(mode=="busy")
                xui.observableRun(function(threadid){
                    ajax.threadid=threadid;
                    ajax.start();
                });
            else if(mode=="return")
                return ajax;
            else
                ajax.start();
        }
    },
    Static:{
        WDSLCache:{},
        $nameTag:"api_",
        _pool:{},
        _objectProp:{tagVar:1,propBinder:1,queryArgs:1,queryHeader:1,queryOptions:1,fakeCookies:1,requestDataSource:1,responseDataTarget:1,responseCallback:1},
        destroyAll:function(){
            this.pack(xui.toArr(this._pool,false),false).destroy();
            this._pool={};
        },
        getFromName:function(name){
            var o=this._pool[name];
            return o && o.boxing();
        },
        _toBase64:function(str){
            var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                arr=[],
                i=0,
                c1,c2,c3,e1,e2,e3,e4;
            do {
                c1=str.charCodeAt(i++);
                c2=str.charCodeAt(i++);
                c3=str.charCodeAt(i++);
                e1=c1>>2;
                e2=((c1&3)<<4)|(c2>>4);
                e3=((c2&15)<<2)|(c3>>6);
                e4=c3&63;
                if (isNaN(c2))e3=e4=64;
                else if(isNaN(c3))e4=64;
                arr.push(keyStr.charAt(e1)+keyStr.charAt(e2)+keyStr.charAt(e3)+keyStr.charAt(e4));
            }while(i<str.length);
            return arr.join('');
        },
        _beforeSerialized:xui.Timer._beforeSerialized,
        DataModel:{
            dataBinder:null,
            dataField:null,
            requestId:"",
            queryAsync:true,
            queryURL:"",
            avoidCache:true,

            oAuth2Token:"",
            queryUserName:"",
            queryPassword:"",

            queryMethod:{
                ini:"auto",
                listbox:["auto","GET","POST","PUT","DELETE","HEAD","PATCH","OPTIONS"]
            },
            requestType:{
                ini:"JSON",
                listbox:["JSON","FORM","XML","SOAP","BLOB","STREAM","ASIS"]
            },
            responseType:{
                ini:"JSON",
                listbox:["JSON","TEXT","XML","SOAP","FORMDATA","BLOB","ARRAYBUFFER"]
            },

            requestDataSource:{
                ini:[]
            },
            responseDataTarget:{
                ini:[]
            },
            responseCallback:{
                ini:[]
            },

            queryArgs:{
                ini:{}
            },
            queryData:{
                ini:{}
            },
            queryHeader:{
                ini:{}
            },
            queryOptions:{
                ini:{}
            },
            fakeCookies:{
                ini:{}
            },
            proxyType:{
                ini:"auto",
                listbox:["auto","AJAX","JSONP","XDMI","FETCH"]// Cross-Domain Messaging with iframes
            },
            "name":{
                set:function(value){
                    var o=this,
                        ovalue=o.properties.name,
                         c=o.box,
                        _p=c._pool,
                        _old=_p[ovalue],
                        _new=_p[value],
                        ui;

                    //if it exists, overwrite it dir
                    //if(_old && _new)
                    //    throw value+' exists!';

                    _p[o.properties.name=value]=o;

                    //pointer _old the old one
                    if(_new && !_old) o._n=_new._n;
                    //delete the old name from pool
                    if(_old)delete _p[ovalue];
                }
            },
            proxyInvoker:{
                inner:true,
                trigger:function(){
                    var prf = this.get(0),
                        prop = prf.properties,
                        bak1 = prop.responseDataTarget,
                        bak2 = prop.responseCallback,
                        fun = function(d){
                            prop.responseDataTarget = bak1;
                            prop.responseCallback = bak2;

                            d=xui.stringify(d);
                            if(xui.Coder)d=xui.Coder.formatText(d);
                            alert(d);
                        };

                    prop.responseDataTarget=[];
                    prop.responseCallback=[];
                    this.invoke(fun,fun);
                }
            }
        },
        EventHandlers:{
            beforeInvoke:function(profile, requestId){},
            afterInvoke:function(profile, rspData, requestId){},
            onData:function(profile, rspData, requestId){},
            beforeData:function(profile, rspData, requestId){},
            onError:function(profile, rspData, requestId){}
        }
    }
});