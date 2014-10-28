Class("xui.DataBinder","xui.absObj",{
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
            profile._cacheInstance=self;
            self.n0=profile;

            if(!profile.name)self.setName(alias);

            return self;
        },
        destroy:function(){
            this.each(function(profile){
                var box=profile.box,name=profile.properties.name;
                //unlink
                _.arr.each(profile._n, function(v){if(v)box._unBind(name,v)});
                //delete from pool
                delete box._pool[name];
                //free profile
                profile.__gc();
            });
        },

        // for UI Controls
        getUI:function(key){
            var r;
            if(!key)
                r=xui.UI.pack(this.get(0)._n,false);
            else
                _.arr.each(this.get(0)._n,function(profile){
                    if(profile.properties.dataField==key){
                        r=profile.boxing();
                        return false;
                    }
                });
            return r;
        },
        checkValid:function(){
            return xui.absValue.pack(this.get(0)._n,false).checkValid();
        },
        getUIValue:function(withCaption, dirtied){
            var ns=this,
                prf=ns.get(0),
                hash={};
            _.arr.each(prf._n,function(profile){
                if(!profile.box["xui.absValue"])return;
                var p=profile.properties,
                    b = profile.boxing(),
                    // maybe return array
                    uv = b.getUIValue();
                // v and uv can be object(Date,Number)
                if(!dirtied || (uv+" ")!==(b.getValue()+" ")){
                    if(withCaption && b.getCaption){
                        hash[p.dataField]={value:uv,caption:b.getCaption()};
                    }else{
                        hash[p.dataField]=uv;
                    }
                }
            });
            return hash;
        },
        isDirtied:function(){
            var prf=this.get(0);
            for(var i=0,l=prf._n.length;i<l;i++){
                var profile=prf._n[i],ins;
                if(profile.box["xui.absValue"]){
                    ins = profile.boxing();
                    if((ins.getUIValue()+" ")!==(ins.getValue()+" ")){
                        return true;
                    }
                }
            }
            return false;
        },
        // get dirtied UI Value
        getDirtied:function(withCaption){
            return this.getUIValue(withCaption, true);
        },
        updateValue:function(){
            xui.absValue.pack(this.get(0)._n,false).updateValue();
            return this;
        },
        updateDataFromUI:function(updateUIValue,withCaption,returnArr,adjustData,dataKeys){
            var ns=this,
                prf=ns.get(0),
                prop=prf.properties,
                map={},
                mapb;
            _.merge(map,prop.data,function(v,t){
                return !dataKeys || dataKeys===t || (_.isArr(dataKeys)?_.arr.indexOf(dataKeys,t)!=-1:false);
            });
            _.arr.each(prf._n,function(profile){
                var p=profile.properties,
                      eh=profile.box.$EventHandlers,
                      t=p.dataField;
                if(!dataKeys || dataKeys===t || (_.isArr(dataKeys)?_.arr.indexOf(dataKeys,t)!=-1:false)){
                    var b = profile.boxing(),
                        // for absValue, maybe return array
                        uv = profile.box['xui.absValue']?b.getUIValue(_.isBool(returnArr)?returnArr:profile.__returnArray):null;
                    // v and uv can be object(Date,Number)
                    if(_.isHash(map[t])){
                        var pp=map[t].properties,cc=map[t].CC,ca=map[t].CA,cs=map[t].CS,events=map[t].events;

                        if(pp)delete map[t].properties;
                        if(ca)delete map[t].CA;
                        if(cc)delete map[t].CC;
                        if(cs)delete map[t].CS;
                        if(events)delete map[t].events;
                        // remove non-properties
                        _.filter(map[t],function(o,i){
                            return !!(i in p);
                        });
                        // reset
                        if(!_.isEmpty(map[t])){
                            _.each(map[t],function(o,i){
                                if(i in p)map[t][i]=p[i];
                            });
                        }
                        // reset pp
                        if(_.isHash(pp)){
                            _.filter(pp,function(o,i){
                                return i in p && !(i in map[t]);
                            });
                            if(!_.isEmpty(pp)){
                                _.each(pp,function(o,i){
                                    if(i in p)pp[i]=p[i];
                                });                         
                                map[t].properties=pp
                            }
                        }
                        if(ca){map[t].CA=_.clone(profile.CA,true);}
                        if(cc){map[t].CC=_.clone(profile.CC,true);}
                        if(cs){map[t].CS=_.clone(profile.CS,true);}
                        // databinder dont output events, but can input

                        if('caption' in p &&('caption' in map[t] || withCaption)&& b.getCaption)
                            if(pp&&'caption' in pp)pp.caption=b.getCaption();else map[t].caption=b.getCaption();
                        if(_.isSet(uv) && 'value' in p)
                            if(pp&&'value' in pp)pp.value=uv;else map[t].value=uv;
                    }else{
                        if(withCaption && 'caption' in p){
                            map[t]={value:uv, caption:typeof(b.getCaption)=="function"?b.getCaption():p.caption};
                        }else{
                            map[t]=uv;
                        }
                    }
                    // for absValue
                    if(updateUIValue!==false && profile.renderId && profile.box['xui.absValue'])
                        b.updateValue();
                }
            });

            // adjust UI data
            if(adjustData)
                map = _.tryF(adjustData,[map, prf],this);

            if(prf.afterUpdateDataFromUI){
                mapb = this.afterUpdateDataFromUI(prf, map);
                if(_.isHash(mapb))map=mapb;
                mapb=null;
            }

            _.merge(prf.properties.data,map,'all');

            return ns;
        },
        updateDataToUI:function(adjustData, dataKeys){
            var t,p,v,c,b,pp,uv,eh,
                ns=this,
                prf=ns.get(0),
                prop=prf.properties,
                map={},mapb;

            _.merge(map,prop.data,function(v,t){
                return !dataKeys || dataKeys===t || (_.isArr(dataKeys)?_.arr.indexOf(dataKeys,t)!=-1:false);
            });

            if(adjustData)
                map = _.tryF(adjustData,[map, prf],ns);

            if(prf.beforeUpdateDataToUI){
                mapb = ns.beforeUpdateDataToUI(prf, map);
                if(_.isHash(mapb))map=mapb;
                mapb=null;
            }

            _.arr.each(prf._n,function(profile){
                p=profile.properties;
                eh=profile.box.$EventHandlers;
                t=p.dataField;
                if(!dataKeys || dataKeys===t || (_.isArr(dataKeys)?_.arr.indexOf(dataKeys,t)!=-1:false)){
                    // need reset?
                    if(map && t in map){
                        v=_.clone(map[t],null,2);
                        uv=c=null;
                        b=profile.boxing();
                        if(_.isHash(v)){
                            if(pp=v.properties){
                                _.filter(pp,function(o,i){
                                    return i in p;
                                });
                                // keep value and caption at first
                                c=_.isSet(pp.caption)?pp.caption:null;
                                uv=_.isSet(pp.value)?pp.value:null;
                                delete pp.caption;delete pp.value;
                                if(!_.isEmpty(pp))
                                    b.setProperties(pp);
                                delete v.properties;
                            }
                            if(pp=v.events){
                                _.filter(pp,function(o,i){
                                    return i in ev;
                                });
                                if(!_.isEmpty(pp))
                                    b.setEvents(pp);
                                delete v.events;
                            }
                            if(pp=v.CS){if(!_.isEmpty(pp))b.setCustomStyle(pp);delete v.CS}
                            if(pp=v.CC){if(!_.isEmpty(pp))b.setCustomClass(pp);delete v.CC}
                            if(pp=v.CA){if(!_.isEmpty(pp))b.setCustomAttr(pp);delete v.CA}

                            if(!_.isEmpty(v)){
                                _.filter(v,function(o,i){
                                    return i in p || i in ev;
                                });
                                if(!_.isEmpty(v)){
                                    // keep value and caption at first
                                    // value and caption in properties have high priority
                                    c=_.isSet(c)?c:_.isSet(v.caption)?v.caption:null;
                                    uv=_.isSet(uv)?uv:_.isSet(v.value)?v.value:null;
                                    delete v.caption;delete v.value;
                                    
                                    if(!_.isEmpty(v))
                                        b.setProperties(v);
                                }
                            }
                        }else uv=v;
                        // set value and caption at last
                        if(_.isSet(uv) && _.isFun(b.resetValue)){
                            b.resetValue(uv);
                            profile.__returnArray=_.isArr(uv);
                        }
                        // set caption
                        if(_.isSet(c) && _.isFun(b.setCaption))
                            _.tryF(b.setCaption,[c,true],b);
                    }
                }
            });
            return ns;
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
                prop=prf.properties,
                dsType=prop.dataSourceType;
            if(dsType!="remoting")return;                
            var responseType=prop.responseType,
                requestType=prop.requestType,
                requestId=prop.requestId,
                hashModel=_.isSet(prop.queryModel) && prop.queryModel!=="",
                queryURL=(hashModel?(((prop.queryURL.lastIndexOf("/")!=prop.queryURL.length-1)?(prop.queryURL+"/"):prop.queryURL)+prop.queryModel):prop.queryURL),
                queryUserName=prop.queryUserName;
                queryPasswrod=prop.queryPasswrod;
                queryArgs=_.copy(prop.queryArgs),
                tokenParams=_.copy(prop.tokenParams),
                queryOptions=_.copy(prop.queryOptions);

            if(requestType=="HTTP")
                    queryArgs = typeof queryArgs=='string'?_.unserialize(queryArgs):queryArgs;
            if(_.isHash(queryArgs) && !_.isEmpty(tokenParams))
                _.merge(queryArgs,tokenParams,'all');

            // Normally, Gives a change to modify "queryArgs" for XML
            if(prf.beforeInvoke && false===prf.boxing().beforeInvoke(prf, requestId))
                return;

            // for auto adjusting options
            var proxyType,rMap={};
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
                    rMap.header=rMap.header||{};
                    rMap.header["SOAPAction"]=action;
                break;
            }
            switch(requestType){
                case "HTTP":
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
                        rMap.header=rMap.header||{};
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
                        rMap.header=rMap.header||{};
                        rMap.header["Authorization"]="Basic "+con._toBase64(queryUserName+":"+queryPassword);
                    }
                    // ensure string
                    queryArgs = typeof queryArgs=='string'?queryArgs:xui.SOAP.wrapRequest(queryArgs, con.WDSLCache[queryURL]);
                break;
            }

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

            var ajax=xui._getrpc(queryURL, queryArgs, options).apply(null, [
                queryURL,
                queryArgs,
                function(rspData){
                    var mapb;

                    // Normally, Gives a change to modify the "rspData" format for XML
                    if(prf.afterInvoke){
                        mapb = prf.boxing().afterInvoke(prf, rspData, requestId||this.uid);
                        if(_.isSet(mapb))rspData=mapb;
                        mapb=null;
                    }
                    // ensure to json
                    if(dsType=='remoting' && !_.isHash(rspData) && !_.isStr(rspData)){
                        if(responseType=="XML")
                            rspData=xui.XMLRPC.parseResponse(rspData);
                        else if(responseType=="SOAP")
                            rspData=xui.SOAP.parseResponse(rspData, queryArgs.methodName, con.WDSLCache[queryURL]);
                    }
                   if(prf.onData)prf.boxing().onData(prf, rspData, requestId||this.uid);
                   _.tryF(onSuccess,arguments,this);
                },
                function(rspData){
                   if(prf.afterInvoke)prf.boxing().afterInvoke(prf, rspData, requestId||this.uid);
                   if(prf.onError)prf.boxing().onError(prf, rspData, requestId||this.uid);
                    _.tryF(onFail,arguments,this);
                },
                threadid,
                options]
            );
            if(mode=="busy")
                _.observableRun(function(threadid){
                    ajax.start();
                });
            else if(mode=="return")
                return ajax;
            else
                ajax.start();
        },
        "read":function(onSuccess, onFail, onStart, onEnd, mode, threadid, options, adjustData){
            var ns=this,prf=ns.get(0),
                prop=prf.properties,
                requestId=prop.requestId,
                dsType=prop.dataSourceType;
            if(dsType=='none'||dsType=='memory')return;

            if(prf.beforeRead && false===prf.boxing().beforeRead(prf, requestId||this.uid))
                return;

            return ns.invoke(function(rspData){
                var mapb;
                // Normally, Gives a change to modify the "rspData" format to suitable key/value maps
                if(prf.afterRead){
                    mapb = prf.boxing().afterRead(prf, rspData, requestId||this.uid);
                    if(_.isSet(mapb))rspData=mapb;
                    mapb=null;
                }

                if(_.isHash(rspData))
                    // auto setData ,and reset values to UI
                    prf.boxing().setData(rspData).updateDataToUI(adjustData);

                _.tryF(onSuccess,arguments,this);

            }, onFail, onStart, onEnd, mode, threadid, options);
        },
        "write":function(onSuccess, onFail, onStart, onEnd, mode, threadid, options){
            var ns=this,prf=ns.get(0),dsType=prf.properties.dataSourceType;
            if(dsType=='none'||dsType=='memory')return;

            if(prf.beforeWrite && false===prf.boxing().beforeWrite(prf, requestId||this.uid))
                return;

            return ns.invoke(function(rspData){
               var mapb;
               if(prf.afterWrite){
                    mapb = prf.boxing().afterWrite(prf, rspData, requestId||this.uid);
                    if(_.isSet(mapb))rspData=mapb;
                    mapb=null;
                }
                _.tryF(onSuccess,arguments,this);
            }, onFail, onStart, onEnd, mode, threadid, options);
        },
        getData:function(key){
            var prf=this.get(0),
                data=prf.properties.data;
            return _.isSet(key)?data[key]:data;
        },
        setData:function(key,value){
            var prop=this.get(0).properties;

            //clear data
            if(key===false){
                _.each(prop.data,function(o,i){
                    prop.data[i]=null;
                });
            }
            // reset all data
            else if(!_.isSet(key))
                prop.data={};
            // reset all data
            else if(_.isHash(key))
                prop.data=key;
            // reset one
            else
                prop.data[key]=value;

            return this;
        }
    },
    Static:{
        WDSLCache:{},
        $nameTag:"databinder_",
        _pool:{},
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
        _bind:function(name, profile){
            var t,v,b,o=this._pool[name];
            if(!o){
                b=new xui.DataBinder();
                b.setName(name);
                o=b.get(0);
            }else{
                b=o.boxing();
            }
            var map=o.properties.data;
            if(profile){
                if(_.arr.indexOf(o._n,profile)==-1)
                    //use link for 'destroy UIProfile' trigger 'auto unbind function '
                    profile.link(o._n, 'databinder.'+name);
                if(t=profile.properties.dataField){
                    if(map && t in map)
                        b.updateDataToUI(null, t);
                    else
                        b.updateDataFromUI(false,true,false,null,t);
                }
            }
        },
        _unBind:function(name, profile){
            if(profile && profile.box && this._pool[name])
                profile.unLink('databinder.'+name);
        },
        _beforeSerialized:function(profile){
            var o={};
            _.merge(o, profile, 'all');
            var p = o.properties = _.clone(profile.properties,true);
            if(p.dataSourceType!='memory'){
                delete p.data;
            }
            if(p.dataSourceType=='none' && p.dataSourceType=='memory'){
                delete p.queryURL;
                delete p.queryUserName;
                delete p.queryPassword;
                delete p.queryModel;
                delete p.queryArgs;
                delete p.queryOptions;
                delete p.tokenParams;
                delete p.proxyType;
                delete p.queryAsync;
                delete p.queryMethod;
                delete p.requestType;
                delete p.responseType;
            }
            if(p.data && _.isEmpty(p.data))
                delete p.data;
            if(p.queryArgs && _.isEmpty(p.queryArgs))
                delete p.queryArgs;
            if(p.tokenParams && _.isEmpty(p.tokenParams))
                delete p.tokenParams;
            if(p.queryOptions && _.isEmpty(p.queryOptions))
                delete p.queryOptions;
            return o;
        },
        DataModel:{
            dataBinder:null,
            dataField:null,
            "data":{
                ini:{}
            },
            requestId:"",
            dataSourceType:{
                ini:"none",
                listbox:["none","memory","remoting"]
            },
            queryURL:{
                ini:""
            },
            queryUserName:{
                ini:""
            },
            queryPassword:{
                ini:""
            },
            queryModel:"",
            queryMethod:{
                ini:"auto",
                listbox:["auto","GET","POST"]
            },
            queryAsync:true,
            requestType:{
                ini:"HTTP",
                listbox:["HTTP","JSON","XML","SOAP"]
            },
            responseType:{
                ini:"JSON",
                listbox:["JSON","XML","SOAP"]
            },
            queryArgs:{
                ini:{}
            },
            tokenParams:{
                ini:{}
            },
            queryOptions:{
                ini:{}
            },
            proxyType:{
                ini:"auto",
                listbox:["auto","Ajax","SAjax","IAjax"]
            },
            "name":{
                set:function(value,ovalue){
                    var o=this,
                        c=xui.DataBinder,
                        _p=c._pool,
                        _old=_p[ovalue],
                        _new=_p[value],
                        ui;

                    //if it exists, overwrite it dir
                    //if(_old && _new)
                    //    throw value+' exists!';

                    _p[o.properties.name=value]=o;
                    //modify name
                    if(_old && !_new && o._n.length){
                        ui=xui.absValue.pack(_.copy(o._n));
                        _.arr.each(o._n, function(v){c._unBind(ovalue,v)});
                        ui.setDataBinder(value);
                    }
                    //pointer _old the old one
                    if(_new && !_old) o._n=_new._n;
                    //delete the old name from pool
                    if(_old)delete _p[ovalue];
                }
            },
            proxyInvoker:{
                inner:true,
                trigger:function(){
                    this.read(function(d){
                        xui.alert("onData",_.stringify(d));
                    },function(e){
                        xui.alert("onError",_.stringify(e));
                    });
                }
            }
        },
        EventHandlers:{
            beforeUpdateDataToUI:function(profile, dataToUI){},
            afterUpdateDataFromUI:function(profile, dataFromUI){},
            beforeInvoke:function(profile, requestId){},
            afterInvoke:function(profile, rspData, requestId){},
            onData:function(profile, rspData, requestId){},
            onError:function(profile, rspData, requestId){},
            beforeRead:function(profile, requestId){},
            afterRead:function(profile, rspData, requestId){},
            beforeWrite:function(profile, requestId){},
            afterWrite:function(profile, rspData, requestId){}
        }
    }
});