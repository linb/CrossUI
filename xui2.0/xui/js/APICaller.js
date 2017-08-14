xui.Class("xui.APICaller","xui.absObj",{
    Instance:{
        _ini:function(properties, events, host){
            var self=this,
                c=self.constructor,
                profile,
                options,
                alias,temp;
            if(properties && properties['xui.Profile']){
                profile=properties;
                alias = profile.alias || c.pickAlias();
            }else{
                if(properties && properties.key && xui.absBox.$type[properties.key]){
                    options=properties;
                    properties=null;
                    alias = options.alias || c.pickAlias();
                }else
                    alias = c.pickAlias();
                profile=new xui.Profile(host,self.$key,alias,c,properties,events, options);
            }
            profile._n=profile._n||[];

            for(var i in (temp=c.$DataStruct))
                if(!(i in profile.properties))
                    profile.properties[i]=typeof temp[i]=='object'?xui.copy(temp[i]):temp[i];

            //set anti-links
            profile.link(c._cache,'self').link(xui._pool,'xui');

            self._nodes.push(profile);
            profile.Instace=self;
            self.n0=profile;

            if(!profile.name)self.setName(alias);

            return self;
        },
        destroy:function(){
            this.each(function(profile){
                var box=profile.box,name=profile.properties.name;
                //delete from pool
                delete box._pool[name];
                //free profile
                profile.__gc();
            });
        },
        setHost:function(value, alias){
            var self=this;
            if(value && alias)
                self.setName(alias);
            return arguments.callee.upper.apply(self,arguments);
        },
        invoke:function(onSuccess, onFail, onStart, onEnd, mode, threadid, options){
            var ns=this,
                con=ns.constructor,
                prf=ns.get(0),
                prop=prf.properties;
            
            var responseType=prop.responseType,
                requestType=prop.requestType,
                requestId=prop.requestId,
                queryURL=prop.queryURL,
                proxyType=prop.proxyType.toLowerCase(),
                queryUserName=prop.queryUserName,
                queryPasswrod=prop.queryPasswrod,
                queryArgs=xui.copy(prop.queryArgs),
                oAuth2Token=prop.oAuth2Token,
                queryOptions=xui.copy(prop.queryOptions),
                queryHeader=xui.copy(prop.queryHeader),
                requestDataSource=prop.requestDataSource,
                responseDataTarget=prop.responseDataTarget;

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
                    var o=requestDataSource[i],t;
                    switch(o.type){
                        case "databinder":
                            if(t = xui.DataBinder.getFromName(o.name)){
                                if(!t.updateDataFromUI()){
                                    return;
                                }else{
                                    if(o.path) xui.set(queryArgs, o.path.split('.'),t.getData());
                                    else xui.merge(queryArgs, t.getData(), 'without');
                                }
                            }
                            break;
                        case "form":
                            if((t = xui.get(prf,["host",o.name])) && t.Class['xui.absContainer'] && t.getRootNode()){
                                if(!t.checkValid() || !t.checkRequired()){
                                    return;
                                }else{
                                    if(o.path)  xui.set(queryArgs, o.path.split('.'), t.getFormValues());
                                    else xui.merge(queryArgs, t.getFormValues(), 'without');
                                }
                            }
                            break;
                    }
                }
            }


            // Normally, Gives a change to modify "queryArgs" for XML
            if(prf.beforeInvoke && false===prf.boxing().beforeInvoke(prf, requestId))
                return;

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
                       if(prf.afterInvoke)prf.boxing().afterInvoke(prf, rspData, requestId||this.uid);
                        if(prf.onError)prf.boxing().onError(prf, rspData);
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
                    queryArgs = typeof queryArgs=='string'?queryArgs:xui.serialize(queryArgs);
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

            if(xui.isEmpty(options.header)){
                delete options.header;
            }
            // If there's mocker, we need try to adjust queryURL and other args
            var mocker = xui.APICaller.getMocker();
            if(mocker && mocker.remoteSericeURL){
                // remove header / and tail /
                var endPoint = queryURL.replace(mocker.remoteSericeURL, '').replace(/^[/]+/,'').replace(/[/]+$/,'');                
                if((mocker.blacklist && !mocker.blacklist[endPoint]) || (mocker.whitelist && mocker.whitelist[endPoint])){
                    queryURL = mocker.mockerURL.replace(/[/]+$/,'') + "/" + endPoint;
                }
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
                var mapb;
                // ensure to json
                if(!xui.isHash(rspData) && !xui.isStr(rspData)){
                    if(responseType=="XML")
                        rspData=xui.XMLRPC.parseResponse(rspData);
                    else if(responseType=="SOAP")
                        rspData=xui.SOAP.parseResponse(rspData, queryArgs.methodName, con.WDSLCache[queryURL]);
                }
                // Normally, Gives a change to modify the "rspData"
                if(prf.afterInvoke){
                    mapb = prf.boxing().afterInvoke(prf, rspData, requestId||this.uid);
                    if(xui.isSet(mapb))rspData=mapb;
                    mapb=null;
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
                                if((t = xui.get(prf,["host",o.name])) && t.Class['xui.absContainer'] && t.getRootNode()){
                                    t.setFormValues(data);
                                }
                                break;
                        }
                    });
                }
                if(prf.onData)prf.boxing().onData(prf, rspData, requestId||this.uid);
                xui.tryF(onSuccess,arguments,this);

            }, function(rspData){
                if(prf.afterInvoke)prf.boxing().afterInvoke(prf, rspData, requestId||this.uid);

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
               
                if(prf.onError)prf.boxing().onError(prf, rspData, requestId||this.uid);
                xui.tryF(onFail,arguments,this);
            }, threadid, options]);

            if(mode=="quiet")
                ajax.start();
            else if(mode=="return")
                return ajax;
            else
                xui.observableRun(function(threadid){
                    ajax.threadid=threadid;
                    ajax.start();
                });                
        }
    },
    Static:{
        WDSLCache:{},
        $nameTag:"api_",
        _pool:{},
        _objectProp:{tagVar:1,propBinder:1,queryArgs:1,queryHeader:1,queryOptions:1,fakeCookies:1,requestDataSource:1,responseDataTarget:1},
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
        _beforeSerialized:function(profile){
            var o={};
            xui.merge(o, profile, 'all');
            var p = o.properties = xui.clone(profile.properties,true);
            for(var i in profile.box._objectProp)
                if((i in p) && p[i] && (xui.isHash(p[i])||xui.isArr(p[i])) && xui.isEmpty(p[i]))delete p[i];
            return o;
        },
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
                listbox:["auto","GET","POST","PUT","DELETE"]
            },
            requestType:{
                ini:"FORM",
                listbox:["FORM","JSON","XML","SOAP"]
            },
            responseType:{
                ini:"JSON",
                listbox:["JSON","TEXT","XML","SOAP"]
            },

            requestDataSource:{
                ini:[]
            },
            responseDataTarget:{
                ini:[]
            },

            queryArgs:{
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
                listbox:["auto","AJAX","JSONP","XDMI"]// Cross-Domain Messaging with iframes
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
                        bak = prf.properties.responseDataTarget;
                    prf.properties.responseDataTarget=[];
                    this.invoke(function(d){
                        prf.properties.responseDataTarget = bak;

                        d=xui.stringify(d);
                        if(xui.Coder)d=xui.Coder.formatText(d);
                        alert(d);
                    },function(d){
                        prf.properties.responseDataTarget = bak;

                        d=xui.stringify(d);
                        if(xui.Coder)d=xui.Coder.formatText(d);
                        alert(d);
                    });
                }
            }
        },
        EventHandlers:{
            beforeInvoke:function(profile, requestId){},
            afterInvoke:function(profile, rspData, requestId){},
            onData:function(profile, rspData, requestId){},
            onError:function(profile, rspData, requestId){}
        },
        getMocker:function(){
            return this._Mocker;
        },
        setMocker:function(obj){
            this._Mocker=obj;
        }//,
        //_Mocker:{
        //    remoteSericeURL:"",
        //    mockerURL:"",
        //    blacklist:{
        //      xxx:1
        //    },
        //    whitelist:{
        //      xxx:1
        //    }
        //}
    }
});