Class("xui.APICaller","xui.absObj",{
    Instance:{
        _ini:function(properties, events, host){
            var self=this,
                c=self.constructor,
                profile,
                options,
                np=c._namePool,
                alias,temp;
            if(properties && properties['xui.Profile']){
                profile=properties;
                alias = profile.alias || c.pickAlias();
            }else{
                if(properties && properties.key && xui.absBox.$type[properties.key]){
                    options=properties;
                    properties=null;
                    alias = options.alias;
                    alias = (alias&&!np[alias])?alias:c.pickAlias();
                }else
                    alias = c.pickAlias();
                profile=new xui.Profile(host,self.$key,alias,c,properties,events, options);
            }
            np[alias]=1;
            profile._n=profile._n||[];

            for(var i in (temp=c.$DataStruct))
                if(!(i in profile.properties))
                    profile.properties[i]=typeof temp[i]=='object'?_.copy(temp[i]):temp[i];

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
                proxyType=prop.proxyType;
                queryUserName=prop.queryUserName,
                queryPasswrod=prop.queryPasswrod,
                queryArgs=_.copy(prop.queryArgs),
                OAuth2Token=prop.OAuth2Token,
                queryOptions=_.copy(prop.queryOptions);

            if(proxyType=="JSONP") proxyType="sajax";
            else if(proxyType=="IFRAME") proxyType="iajax";
            if(requestType=="FORM") queryArgs = typeof queryArgs=='string'?_.unserialize(queryArgs):queryArgs;

            // Normally, Gives a change to modify "queryArgs" for XML
            if(prf.beforeInvoke && false===prf.boxing().beforeInvoke(prf, requestId))
                return;

            // for auto adjusting options
            var rMap={header:{}};
            if(responseType=='SOAP'||requestType=='SOAP'){
                // for wsdl
                if(!con.WDSLCache)con.WDSLCache={};
                if(!con.WDSLCache[queryURL]){
                    var wsdl=xui.SOAP.getWsdl(queryURL,function(rspData){
                       if(prf.afterInvoke)prf.boxing().afterInvoke(prf, rspData, requestId||this.uid);
                        if(prf.onError)prf.boxing().onError(prf, rspData);
                        _.tryF(onFail,arguments,this);
                        _.tryF(onEnd,arguments,this);
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
                    queryArgs = typeof queryArgs=='string'?_.unserialize(queryArgs):queryArgs;
                break;
                case "JSON":
                    rMap.reqType="json";

                    if(prop.queryMethod=="auto")
                        rMap.method="POST";
                    // ensure string
                    queryArgs = typeof queryArgs=='string'?queryArgs:_.serialize(queryArgs);
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
            if(OAuth2Token)
               rMap.header["Authorization"]="Bearer " + OAuth2Token

            // Ajax/SAjax/IAjax
            if(!proxyType && prop.proxyType!="auto")
                proxyType = prop.proxyType;
            if(proxyType!="ajax")
                rMap.asy=true;
            if(proxyType=="sajax")
                rMap.method="GET";
            if(proxyType)
                proxyType=proxyType.toLowerCase();

            options=options||{};
            if(!("asy" in options))
                options.asy=!!prop.queryAsync;
            if(!("method" in options)&&prop.queryMethod!="auto")
                options.method=prop.queryMethod;
            if(!("onEnd" in options))
                options.onEnd=onEnd;
            if(!("onStart" in options))
                options.onStart=onStart;
            _.merge(options, queryOptions);

            _.merge(options, rMap, 'all');
            options.proxyType=proxyType;

            // If there's mocker, we need try to adjust queryURL and other args
            var mocker = xui.APICaller.Mocker;
            if(mocker){
                //
                // remoteSericeURL
                // mockerURL
                // endpoints
                
                // remvoe header / and tail /
                var endPoint = queryArgs.replace(mocker.remoteSericeURL, '').replace(/^[/]+/,'').replace(/[/]+$/,'');                
                if(mocker.endpoints && mocker.endpoints[endPoint]){
                    queryURL = mocker.mockerURL.replace(/[/]+$/,'') + "/" + endPoint;
                }
            }

            var ajax = xui._getrpc(queryURL, queryArgs, options).apply(null, [queryURL, queryArgs, function(rspData){
                var mapb;

                // Normally, Gives a change to modify the "rspData" format for XML
                if(prf.afterInvoke){
                    mapb = prf.boxing().afterInvoke(prf, rspData, requestId||this.uid);
                    if(_.isSet(mapb))rspData=mapb;
                    mapb=null;
                }
                // ensure to json
                if(!_.isHash(rspData) && !_.isStr(rspData)){
                    if(responseType=="XML")
                        rspData=xui.XMLRPC.parseResponse(rspData);
                    else if(responseType=="SOAP")
                        rspData=xui.SOAP.parseResponse(rspData, queryArgs.methodName, con.WDSLCache[queryURL]);
                }

               if(prf.onData)prf.boxing().onData(prf, rspData, requestId||this.uid);
               _.tryF(onSuccess,arguments,this);
            }, function(rspData){
               if(prf.afterInvoke)prf.boxing().afterInvoke(prf, rspData, requestId||this.uid);
               if(prf.onError)prf.boxing().onError(prf, rspData, requestId||this.uid);
                _.tryF(onFail,arguments,this);
            }, threadid, options]);

            if(mode=="busy")
                _.observableRun(function(){
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
        _objectProp:{tagVar:1,propBinder:1,queryArgs:1,queryOptions:1},
        destroyAll:function(){
            this.pack(_.toArr(this._pool,false),false).destroy();
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
            _.merge(o, profile, 'all');
            var p = o.properties = _.clone(profile.properties,true);
            for(var i in profile.box._objectProp)
                if((i in p) && p[i] && _.isHash(p[i]) && _.isEmpty(p[i]))delete p[i];
            return o;
        },
        DataModel:{
            dataBinder:null,
            dataField:null,
            requestId:"",
            queryAsync:true,
            queryURL:"",

            OAuth2Token:"",
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

            requestDataSource:null,
            responseDataTarget:null,

            queryArgs:{
                ini:{}
            },
            queryOptions:{
                ini:{}
            },
            proxyType:{
                ini:"auto",
                listbox:["auto","AJAX","JSONP","IFRAME"]
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
                    //modify name
                    if(_old && !_new && o._n.length)
                        for(var i=0,l=o._n.length;i<l;i++)
                            _.set(o._n[i], ["properties","dataBinder"], value);

                    //pointer _old the old one
                    if(_new && !_old) o._n=_new._n;
                    //delete the old name from pool
                    if(_old)delete _p[ovalue];
                }
            },
            proxyInvoker:{
                inner:true,
                trigger:function(){
                    this.invoke(function(d){
                        xui.alert("onData",_.stringify(d));
                    },function(e){
                        xui.alert("onError",_.stringify(e));
                    });
                }
            }
        },
        EventHandlers:{
            beforeInvoke:function(profile, requestId){},
            afterInvoke:function(profile, rspData, requestId){},
            onData:function(profile, rspData, requestId){},
            onError:function(profile, rspData, requestId){}
        }
    }
});