/*
        initialize
    beforeCreated
    onCreated
    beforeShow
    afterShow
    onLoadBaseClass
    onLoadRequiredClass
    onLoadRequiredClassErr
    onIniResource
        iniResource (asy)
    beforeIniComponents
        iniComponents (asy)
    afterIniComponents
        iniExModules (asy)
    onReady
    onRender
    onDestroy

    // for values
    getValue:function(){},
    getUIValue:function(){},
    resetValue:function(){},
    setUIValue:function(){},
    updateValue:function(){},
    isDirtied:function(){},
    checkValid:function(){},
*/
Class('xui.Module','xui.absProfile',{
    Initialize:function(){
        var ns=this;
        xui.launch = function(cls, onEnd, lang, theme, showUI){
            ns.load.apply(ns, arguments);
        };
        // compitable
        ns['xui.Com']=ns.prototype['xui.Com']=1;
        xui.Com=ns;
    },
    After:function(){
        var self=this,k, e, t, b, i;
        _.arr.each(['$DataModel','$EventHandlers'],function(v){
            k=self[v]||{};
            if((t=self.$parent) && (e=t.length)){
                while(e--){
                    b=t[e][v];
                    for(i in b){
                        if(!(i in k))k[i]=b[i];
                    }
                }
            }
            self[v]=k;
        });
        self._nameId=0;
        self._namePool={};
        self._nameTag=self.$nameTag||(self.KEY.replace(/\./g,'_').toLowerCase());
        self._cache=[];
    },
    Constructor:function(properties, events, host){
        var upper=arguments.callee.upper;
        if(upper)upper.call(this);
        upper=null;

        var self=this,opt,alias;

        self.Class=self.constructor;
        self.box=self.constructor;
        self.key=self.KEY;

        if(properties && properties.key && properties["xui.Module"]){
             opt=properties;
             properties = (opt && opt.properties) || {};
             events = (opt && opt.events) || {};
             alias = opt.alias;
             host = opt.host;
        }else{
            properties = properties || (self.properties?_.clone(self.properties):{});
            events = events || (self.events?_.clone(self.events):{});
        }
        if(!alias)alias =self.constructor.pickAlias();
        if(!_.isEmpty(self.constructor.$DataModel)){
            _.merge( properties, _.clone(self.constructor.$DataModel),'without');
        }
        //
        self._links={};
        self.link(self.constructor._cache, "self")
        self.link(xui.Module._cache, "xui.module");
        self.link(xui._pool,'xui');
        
        self.host=host||self;
        self.alias=alias;

        self._nodes=[];
        self._ctrlpool={};
        self.events=events;
        self.properties={};
        self.setProperties(properties);

        self._innerCall('initialize');
    },
    Instance:{
        autoDestroy:true,
        dataBindLoadType:"none", // "sync", "async", "none"
        background:"",

        // [[[ fake boxing
        get:function(index){
            return  _.isNumb(index)?this:[this];
        },
        size:function(){
            return 1;
        },
        boxing:function(){
            return this;
        },
        each:function(fun,scope){
            fun.call(scope, this);
            return this;
        },
        getRoot:function(){
            if(!this._innerModulesCreated)this._createInnerModules();
            var fun = function(m){
                if(m["xui.Module"]){
                    for(var i=0,l=m._nodes,o;i<l, o=m._nodes[i];i++){
                        if(o["xui.Module"]) return fun(o);
                        if(o["xui.UIProfile"] && !o.box.$initRootHidden) return o.getRoot();
                    }
                }
            };
            return fun(this);
        },
        getRootNode:function(){
            var ui=this.getRoot();
            if(!ui.isEmpty())return ui.get(0);
        },
        getModule:function(){
            return this;
        },
        // ]]] 
        /*
         // [[[ fake UIProfile
        linkParent:function(parentProfile, linkId, index){
            var profile=this;
            //unlink first
            profile.unlinkParent();
            if(!profile.destroyed){ 
            //link
                profile.parent = parentProfile;
                profile.childrenId = linkId;
                profile.link(parentProfile.children, '$parent', [profile, linkId], index);
            }
            return profile;
        },
        unlinkParent:function(){
            var profile=this;
            delete profile.parent;
            delete profile.childrenId;
            profile.unLink('$parent');
            return profile;
        },
        // ]]] 
        */
        _toDomElems:function(){
            var ns=this;
            if(!ns.created)
                // create synchronously
                ns.create(null,false)
            ns.render();
            return ns.getUIComponents()._toDomElems();
        },
        setAlias:function(alias){
            return xui.absObj.prototype._setHostAlias.call(this, null, alias);
        },
        getAlias:function(){
            return this.alias;
        },
        setHost:function(host, alias){
            return xui.absObj.prototype._setHostAlias.call(this, host, alias);
        },
        getName:function(){
            return this.properties.name || this.alias;
        },
        setName:function(name){
            this.properties.name=name;
        },
        getDesc:function(){
            return this.properties.desc;
        },
        setDesc:function(desc){
            this.properties.desc=desc;
        },
        getTabindex:function(){
            return this.properties.tabindex;
        },
        setTabindex:function(tabindex){
            this.properties.tabindex=tabindex;
        },
        getHost:function(){
            return this.host;
        },
        setProperties:function(key,value){
            var self=this;
            if(!key)
                self.properties={};
            else if(typeof key=='string')
                self.properties[key]=value;
            else if(_.isHash(key)){
                if(value/*force*/){
                    self.properties = _.clone(key);
                }else{
                    _.merge(self.properties, key, 'all');
                }
            }

            if(self._setProperties)self._setProperties(self.properties);

            return self;
        },
        getProperties:function(key){
             var self=this;
             if(self._getProperties)self.properties=self._getProperties();

            return key?self.properties[key]:self.properties;
        },
        setEvents:function(key,value){
            var self=this;
            if(!key)
                self.events={};
            else if(typeof key=='string')
                self.events[key]=value;
            else if(_.isHash(key)){
                if(value/*force*/){
                    self.events = _.clone(key);            
                }else{
                    _.merge(self.events, key, 'all');
                }
            }
            return self;
        },
        getEvents:function(key){
            return key?this.events[key]:this.events;
        },
        serialize:function(rtnString, keepHost, children){
            var t,m,
                self=this,
                o=(t=self.constructor._beforeSerialized)?t(self):self,
                r={
                    "xui.Module":true,
                    alias:o.alias,
                    key:o.KEY,
                    host:o.host
                };
            //host
            if(r.host===self){
                delete r.host;
            }else if(o.host && !keepHost ){
                if(rtnString!==false)
                    r.host='@this';
                else
                    delete r.host;
            }
            //properties
            var c={}, p=o.box.$DataModel;
            _.merge(c,o.properties, function(o,i){return p[i]!==o});
            if(!_.isEmpty(c))r.properties=c;

            //events
            if(!_.isEmpty(t=this.getEvents()))r.events=t;
            var eh = o.box.$EventHandlers;
            _.filter(r.events, function(o,i){
                return o!==eh[i];
            });
            if(_.isEmpty(r.properties))delete r.properties;

            //events
            if(!_.isEmpty(t=this.getEvents()))r.events=t;
            if(_.isEmpty(r.events))delete r.events;

            return rtnString===false?r:_.serialize(r);
        },
        clone:function(){
            var ns=this.serialize(false,true);
            delete ns.alias;
            return this.constructor.unserialize(ns);
        },
        // for outter events
        fireEvent:function(name, args, host){
            var t,o,r,l,self=this;
            if(self.events && (t=self.events[name])){
                if(t && (!_.isArr(t) || t.length)){
                    var host=host||self.host||self;
                    args=args||[];
                    if(!_.isArr(t))t=[t];
                    l=t.length;
                    if(_.isNumb(j=t[0].event))args[j]=xui.Event.getEventPara(args[j]);
                    var temp={};
                    var n=0,fun=function(data){
                        // set prompt's global var
                        if(_.isStr(this))temp[this+""]=data||"";
                        //callback from [n]
                        for(j=n;j<l;j++){
                            n=j+1;
                            o=t[j];
                            if(typeof o=='string')o=host[o];
                            if(typeof o=='function')r=_.tryF(o, args, host);
                            else if(_.isHash(o)){
                                if('onOK' in o ||'onKO' in o){
                                    // onOK
                                    if('onOK' in o)(o.params||(o.params=[]))[parseInt(o.onOK,10)||0]=function(){
                                        if(fun)fun.apply("okData",arguments);
                                    };
                                    if('onKO' in o)(o.params||(o.params=[]))[parseInt(o.onKO,10)||0]=function(){
                                        if(fun)fun.apply("koData",arguments);
                                    };
                                    if(false===(r=xui.pseudocode.exec(o,args,host,temp))){
                                        n=temp=fun=null;
                                    }
                                    break;
                                }else
                                    if(false===(r=xui.pseudocode.exec(o,args,host,temp))){
                                        n=j;break;
                                    }
                            }
                        }
                        if(n==j)n=temp=fun=null;
                        return r;
                    };
                    return fun();
                }
            }
        },
        // for inner events
        _fireEvent:function(name, args){
            var t,o,r,l,self=this;
            if(self.events && (t=self.events[name])){
                self.$lastEvent=name;
                if(t){
                    var host=self.host||self
                    args=args||[];
                    args.splice(0,0,self,self.threadid);

                    if(!_.isArr(t))t=[t];
                    l=t.length;
                    for(var i=0;i<l;i++){
                        o=t[i];
                        if(typeof o=='string')o=self[o];
                        if(typeof o=='function')r=o.apply(host, args);
                        else if(_.isHash(o))r=xui.pseudocode.exec(o,args,host);
                    }
                    return r;
                }
            }
        },
        _innerCall:function(name){
            var self=this;
            return _.tryF(self[name],[self, self.threadid],self);
        },
        customAppend:function(parent,subId,left,top,threadid){
            return false;
        },
        show:function(onEnd,parent,subId,threadid,left,top){
            if(false===this._fireEvent('beforeShow'))return false;
            parent=parent||xui('body');
            
            if(parent['xui.UIProfile'])parent=parent.boxing();

            var self=this,f=function(){
                var style=self.customStyle;
                if(style && !_.isEmpty(style)){
                    var arr=[];
                    _.each(style,function(v,k){
                        arr.push(k+" : "+v+";");
                    });
                    var txt=".xui-module-"+self.$xid+"{\r\n"+arr.join("\r\n")+"\r\n}";
                    xui.CSS.addStyleSheet(txt,"xui:css:module-"+self.$xid,1);
                }
                // no UI control in module
                if(self.getUIComponents().isEmpty()){
                    _.tryF(self.customAppend,[parent,subId,left,top,threadid], self);
                    _.tryF(onEnd,[null, self, threadid],self.host);
                }else{
                    // if parent is an ui object without rendered, dont render the module
                    if(!(parent && parent['xui.UI'] && !parent.get(0).renderId))
                        self.render();

                    if(false===_.tryF(self.customAppend,[parent,subId,left,top,threadid], self)){
                        //append only
                        parent.append(self.getUIComponents(false),subId);
                        // append and show
                        self.getUIComponents(true).each(function(o){
                            o.boxing().show(parent, subId);
                            if(o.KEY=='xui.UIProfile' && _.get(o,['properties','defaultFocus'])){
                               try{_.asyRun(function(){o.boxing().activate()})}catch(e){}
                            }
                        });
                    }
                    self.renderId='ok';
                    _.tryF(onEnd,[null, self, threadid],self.host);
                }
                self._showed=1;
                self._fireEvent('afterShow');
            };
            
            self.threadid=threadid;
            if(self.created) f();
            else self.create(f,threadid);
            return self;
        },
        hide:function(){
            this.getUIComponents(true).hide();
            this._showed=0;
        },
        render:function(triggerLayout){
            var self=this;
            if(self.renderId!='ok'){
                self.getUIComponents().render(triggerLayout);
                self._fireEvent('onRender');
                self.renderId='ok';
            }
            return self;
        },
        refresh:function(){
            var paras, b, p, s, fun, autoDestroy, 
                o=this,
                inm, firstUI,
                box=o.box,
                host=o.host,
                alias=o.alias,
                $xid=o.$xid,
                rt = o.$refreshTrigger;
                
            if(!o.renderId)return;
            if((inm=o.getUIComponents()).isEmpty())return;
            firstUI = inm.get(0);

            if(host && host['xui.Module'] && host.autoDestroy){
                host.autoDestroy=false;
            }
            //keep parent
            if(b=!!firstUI.parent){
                p=firstUI.parent.boxing();
                paras=firstUI.childrenId;
            }else{
                p=firstUI.parent();
            }
            //unserialize
            s = o.serialize(false, true);
            o.destroy();
            //set back
            _.merge(o,s,'all');
            // notice: remove destroyed here
            delete o.destroyed;
            o.$xid=$xid;

            //create
            var n = new box(o);
            if(host)n.setHost(host,alias);

            n.create(function(){
                //add to parent, and trigger RenderTrigger
                if(b)
                    p.append(n,paras);
                else if(!p.isEmpty())
                    p.append(n);

                //for functions like: UI refresh itself
                if(rt)
                    rt.call(rt.target, n);
            });

            if(_.isSet(autoDestroy&&n.host&&n.host['xui.Module'])){
                n.host.autoDestroy=autoDestroy;
            }
            return this;
        },
        getParent:function(){
            var prf=this.getUIComponents().get(0);
            if(prf)return prf.parent && prf.parent.boxing();
        },
        getChildrenId:function(){
            var prf=this.getUIComponents().get(0);
            if(prf)return prf.childrenId;
        },
        create:function(onEnd, threadid){
            //get paras
            var self=this;

            if(self.created){
                _.tryF(onEnd,[null, self, threadid],self.host);
                return;
            }

            var  t,funs=[];
            self.threadid=threadid;

            if(false===self._fireEvent('beforeCreated'))return;
            //if no threadid or threadid doesn't exist, reset threadid to self
            funs.push(function(threadid){
                if(threadid)
                    self.threadid=threadid;
                self._fireEvent('onCreated');
            });

            //databinder
            if(self.dataBindLoadType!="none"){
                var bds=self.getDataBinders();
                if(bds && bds.length){
                    var dbf=function(threadid){
                        var hash={};
                        _.arr.each(bds,function(bd, i){
                            var ajax=bd.boxing().read(null,null,null,null,"return");
                            if(ajax)hash[i]=ajax;
                        });
                        if(!_.isEmpty(hash))
                            xui.absIO.groupCall(hash, null, null, null, threadid);
                        bds.length=0;
                        hash=bds=null;
                    };
                    if(self.dataBindLoadType=="sync")
                        funs.push(dbf);
                    else
                        dbf();
                }
            }

            //base classes
            if((t=self.dependencies) && t.length)
                funs.push(function(threadid){
                    xui.require(self.dependencies,null,function(uir,key){
                        self._fireEvent('onLoadBaseClass', [uri,key]);
                    },function(){
                        self._fireEvent('onLoadBaseClassErr', _.toArr(arguments));
                    },function(){
                        self._fireEvent('onLoadBaseClassErr',  _.toArr(arguments));
                    },false, threadid);
                });
            if(self.iniComponents){
                var arr=[];
                try{
                    (self.iniComponents+"").replace(/append\s*\(\s*xui.create\(['"]([\w.]+)['"]\)/g,function(a,b){
                        if(!xui.SC.get(b))arr.push(b);
                    });
                }catch(e){}
                if(arr.length){
                    if(self.required&&_.isArr(self.required)){
                        self.required.concat(arr);
                    }else{
                        self.required=arr;
                    }
                }
            }
            //load required class
            if((t=self.required) && t.length)
                funs.push(function(threadid){
                    xui.require(self.required,null,function(uir,key){
                        self._fireEvent('onLoadRequiredClass', [uri,key]);
                    },function(){
                        self._fireEvent('onLoadRequiredClassErr',  _.toArr(arguments));
                    },function(msg){
                        self._fireEvent('onLoadRequiredClassErr',  _.toArr(arguments));
                    },false, threadid);
                });
            //inner components
            if(self.iniComponents)
                funs.push(function(){
                    self._createInnerModules();
                });
            //load resource here
            if(self.iniResource)
                funs.push(function(){
                    self._fireEvent('onIniResource');
                    self._innerCall('iniResource');
                });
            //Outter components
            if(self.iniExComs){
                self.iniExModules=self.iniExComs;
                delete self.iniExComs;
            }
            if(self.iniExModules)
                funs.push(function(){
                    self._innerCall('iniExModules');
                });
            //core
            funs.push(function(threadid){
                //lazy load
                if(self.background)
                    xui.SC.runInBG(self.background);
                self._fireEvent('onReady');
            });
            funs.push(function(threadid){
                self.created=true;
                _.tryF(onEnd,[null, self, threadid],self.host);
            });
            if(threadid===false){
                _.arr.each(funs,function(fun){
                    fun.call();
                });
            }else{
                //use asyUI to insert tasks
                xui.Thread.observableRun(funs,null,threadid);
            }

            return self;
        },
        _createInnerModules:function(){
            var self=this;
            if(self._innerModulesCreated)
                return;
            if(false===self._fireEvent('beforeIniComponents'))return;
            Array.prototype.push.apply(self._nodes, self._innerCall('iniComponents')||[]);

            _.arr.each(self._nodes,function(o){
                xui.Module.$attachModuleInfo(self,o);
                //Recursive call
                if(o['xui.Module'])o._createInnerModules();
            });
            // attach destroy to the first UI control
            var autoDestroy = self.autoDestroy || self.properties.autoDestroy;
            if(autoDestroy)
                _.arr.each(self._nodes,function(o){
                    if(o.box && o.box["xui.UI"] && !o.box["xui.UI.MoudluePlaceHolder"] && !o.box.$initRootHidden){
                        (o.$afterDestroy=(o.$afterDestroy||{}))["moduleDestroyTrigger"]=function(){
                            if(autoDestroy && !self.destroyed)
                                self.destroy();
                            self=null;
                        };
                        return false;
                    }
                });
            self._fireEvent('afterIniComponents');
            self._innerModulesCreated=true;
        },
        iniComponents:function(){},

        getProfile:function(){
            if(!this._innerModulesCreated)this._createInnerModules();

            var hash={};
            _.each(this._ctrlpool, function(prf){
                hash[prf.alias]=prf.serialize(false,false,false);
                delete hash[prf.alias].key;
                delete hash[prf.alias].alias;
                delete hash[prf.alias].events;
                delete hash[prf.alias]['xui.Module'];
            });
            return hash;
        },
        setProfile:function(profiles){
            if(!this._innerModulesCreated)this._createInnerModules();

             _.each(this._ctrlpool, function(prf,i){
                if(prf.alias in profiles){
                    i=profiles[prf.alias];
                    var ins=prf.boxing();
                    if(i && _.isHash(i) && !_.isEmpty(i)){
                        if(i.theme&&typeof(ins.setTheme)=="function")ins.setTheme(i.theme);
                        if(i.properties &&!_.isEmpty(i.properties))ins.setProperties(i.properties);
                        if(i.CA&&!_.isEmpty(i.CA))ins.setCustomAttr(i.CA);
                        if(i.CC&&!_.isEmpty(i.CC))ins.setCustomClass(i.CC);
                        if(i.CS&&!_.isEmpty(i.CS))ins.setCustomStyle(i.CS);
                    }else{
                        ins.setValue(i);
                    }
                }
            });
            return this;
        },
        _getPropBinderKeys:function(){
            if(!this._innerModulesCreated)this._createInnerModules();

            var bak;
            if(window.get)bak=get;
            // collect keys
            var hash={};
            window.get=function(k){
                if(k){
                    var arr=k.split(".");
                    if(arr.length)hash[arr.shift()]=1;
                }
            };
            try{
                 _.each(this._ctrlpool, function(prf){
                    var prop=prf.properties;
                    if(prop.propBinder)
                        _.each(prop.propBinder,function(fun,key){
                            if((key in prop) && _.isFun(fun))fun();
                        });
                });
            }catch(e){}finally{window.get=bak}
            return _.toArr(hash,true);
        },
        reBindProp:function(dataMap){
            if(!this._innerModulesCreated)this._createInnerModules();

            var bak;
            if(window.get)bak=get;
            window.get=function(k){return xui.SC.get(k,dataMap)};
            try{
                 _.each(this._ctrlpool, function(prf){
                    prf.boxing().reBindProp(dataMap,true);
                });
            }catch(e){window.get=bak}
        },

        getData:function(withValue){
            if(!this._innerModulesCreated)this._createInnerModules();

            var hash={};
             _.each(this._ctrlpool, function(prf){
                var prop=prf.properties,
                    ins=prf.boxing(),
                    ih=hash[prf.alias]={};
                _.arr.each(["src",'html','items','lsitKey','header','rows',"target","toggle","attr","JSONData","XMLData","JSONUrl","XMLUrl","dateStart","name",'labelCaption'],function(k){
                    if(k in prop)ih[k]=prop[k];
                });
                if(withValue)
                    if('value' in prop)ih.value=prop.value;
                if('caption' in prop && _.isSet(prop.caption)){
                    ih.caption=typeof(ins.getCaption)=="function"?ins.getCaption():prop.caption;
                }
            });
            return hash;
        },
        setData:function(data){
            if(!this._innerModulesCreated)this._createInnerModules();

             _.each(this._ctrlpool, function(prf){
                var prop=prf.properties,
                    ins=prf.boxing(),ih;
               if(prf.alias in data){
                    ih=data[prf.alias];
                    if(ih && _.isHash(ih) && !_.isEmpty(ih)){
                        _.arr.each(["src",'html','items','lsitKey','header','rows',"target","toggle","attr","JSONData","XMLData","JSONUrl","XMLUrl","dateStart","name","value",'labelCaption',"caption"],function(k){
                            if(k in prop && k in ih)ins['set'+_.str.initial(k)](ih[k]);
                        });
                    }else
                        ins.setValue(ih);
                }
            });
            return this;
        },

        // fack absValue
        getValue:function(innerUI){
            if(innerUI){
                if(!this._innerModulesCreated)this._createInnerModules();

                var hash={}, cap, uv;
                 _.each(this._ctrlpool, function(prf){
                    if('value' in prf.properties){
                        if(_.isSet(prf.properties.caption)){
                            cap = prf.properties.caption;
                            uv = prf.properties.value;

                            // igore unnecessary caption
                            if((!cap && !uv) || cap==uv)
                                hash[prf.alias]=uv;
                            else
                                hash[prf.alias]={value:uv, caption:cap};
                        }
                        else{
                            hash[prf.alias]=prf.properties.value;
                        }
                    }
                });
                return hash;
            }else{
                return this.properties.value;
            }
        },
        setValue:function(values, innerUI){
            if(innerUI){
                if(!this._innerModulesCreated)this._createInnerModules();

                if(!_.isEmpty(values)){
                     _.each(this._ctrlpool, function(prf){
                        if('value' in prf.properties && prf.alias in values){
                            var v=values[prf.alias],b=_.isHash(v) ;
                            prf.boxing().setValue((b && ('value' in v)) ? v.value : v, true,'module');
                            if(typeof(prf.boxing().setCaption)=="function" &&  b  && 'caption' in v)
                                prf.boxing().setCaption(v.caption, null, true,'module');
                        }
                    });
                }
            }else{
                this.properties.value = values;
            }
            return this;
        },
        getUIValue:function(innerUI){
            if(innerUI){
                if(!this._innerModulesCreated)this._createInnerModules();

                var hash={};
                 _.each(this._ctrlpool, function(prf){
                    if('$UIValue' in prf.properties)
                        hash[prf.alias]=prf.properties.$UIValue;
                });
                return hash;
            }else{
                return this.properties.$UIValue;
            }
        },
        setUIValue:function(values,innerUI){
            if(innerUI){
                if(!this._innerModulesCreated)this._createInnerModules();

                if(!_.isEmpty(values)){
                     _.each(this._ctrlpool, function(prf){
                        if('value' in prf.properties && prf.alias in values){
                            var v=values[prf.alias],b=_.isHash(v) ;
                            prf.boxing().setUIValue((b && ('value' in v))?v.value:v, true,false,'module');
                            if(typeof(prf.boxing().setCaption)=="function" && b &&  'caption' in v)
                                prf.boxing().setCaption(v.caption, null, true,'module');
                        }
                    });
                }
            }else{
                this.properties.$UIValue = values;
            }
            return this;
        },
        resetValue:function(innerUI){
            if(innerUI){
                if(!this._innerModulesCreated)this._createInnerModules();
                _.each(this._ctrlpool, function(prf){
                     if(prf.boxing().resetValue)prf.boxing().resetValue();
                });
            }else{
                this.properties.$UIValue=this.properties.value; 
            }
            return this;
        },
        updateValue:function(innerUI){
            if(innerUI){
                if(!this._innerModulesCreated)this._createInnerModules();
                _.each(this._ctrlpool, function(prf){
                     if(prf.boxing().updateValue)prf.boxing().updateValue();
                });
            }else{
                this.properties.value=this.properties.$UIValue; return this;
            }
            return this;
        },
        isDirtied:function(innerUI){
            if(innerUI){
                if(!this._innerModulesCreated)this._createInnerModules();

                var dirtied=false;
                _.each(this._ctrlpool, function(prf){
                    if(prf.boxing().isDirtied){
                        if(prf.boxing().isDirtied()){
                            return false;
                        }
                    }
                });
                 return dirtied;
            }else{
                return this.properties.value===this.properties.$UIValue;
            }
        },
        checkValid:function(innerUI){
            if(innerUI){
                if(!this._innerModulesCreated)this._createInnerModules();

                  _.each(this._ctrlpool, function(prf){
                     if(prf.boxing().checkValid){
                         if(!prf.boxing().checkValid()){
                             return false;
                         }
                    }
                 });
            }else{
                return true;
            }
        },

        getDataBinders:function(){
            if(!this._innerModulesCreated)this._createInnerModules();
            
            var nodes = _.copy(this._nodes),t,k='xui.DataBinder';
            _.filter(nodes,function(o){
                return !!(o.box[k]);
            });
            return nodes;
        },
        // get all children
        getAllComponents:function(){
            if(!this._innerModulesCreated)this._createInnerModules();
            var nodes=[];
            var fun = function(m){
                    if(m["xui.Module"]){
                        _.each(m._ctrlpool,function(o){
                            if(o["xui.Module"])fun(o);
                            else nodes.push(o);
                        });
                    }
                };
            fun(this);
            return xui.absObj.pack(nodes,false);
        },
        // get first level children only
        getComponents:function(){
            if(!this._innerModulesCreated)this._createInnerModules();
            var nodes = [];
            var fun = function(m){
                if(m["xui.Module"]){
                    _.arr.each(m._nodes,function(o){
                        if(o["xui.Module"])fun(o);
                        else nodes.push(o);
                    });
                }
            };
            fun(this);
            return xui.absObj.pack(nodes,false);
        },
        // get first level UI children only
        // flag:true => no  $initRootHidden
        // flag:false => $initRootHidden
        // no flag: all
        getUIComponents:function(flag){
            var nodes = this.getComponents().get(),
                k='xui.UI', n='$initRootHidden';
            _.filter(nodes,function(o){
                return !!(o && o.box &&o.box[k]) && (flag===true?!o.box[n]:flag===false?o.box[n]:true);
            });
            return xui.UI.pack(nodes, false);
        },
        setComponents:function(obj){
            var self=this,t;
            _.arr.each(self._nodes,function(o){
                if((t=self[o.alias]) &&t.get(0)==o)
                    delete self[o.alias];
            });
            _.arr.each(self._nodes=obj.get(),function(o){
                // set host
                o.boxing().setHost(self, o.alias);
            });
            _.arr.each(self._nodes,function(o){
                xui.Module.$attachModuleInfo(self,o);
            });
            return self;
        },
        AddComponents:function(obj){
            var self=this;
            _.arr.each(obj.get(),function(o){
                o.boxing().setHost(self, o.alias);
                self._nodes.push(o);
                xui.Module.$attachModuleInfo(self,o);
            });
            return self;
        },
        isDestroyed:function(){
            return !!this.destroyed;
        },
        destroy:function(){
            var self=this,con=self.constructor,ns=self._nodes;
            
            self._fireEvent('onDestroy');
            if(self.alias && self.host && self.host[self.alias]){
                delete self.host[self.alias];
            }

            //set once
            self.destroyed=true;
            if(ns && ns.length)
                _.arr.each(ns, function(o){
                    if(o && o.box)
                        o.boxing().destroy();
                },null,true);
            if(ns && ns.length)
                self._nodes.length=0;
            self._ctrlpool=null;
            
            delete con._namePool[self.alias];
            self.unLinkAll();

            _.breakO(self);
            self.destroy=function(){};
            //afterDestroy
            if(self.$afterDestroy){
                _.each(self.$afterDestroy,function(f){
                    _.tryF(f,[],self);
                });
                _.breakO(self.$afterDestroy,2);
            }
            //set again
            self.destroyed=true;
        }
    },
    Static:{
        // fake absValue
        "xui.absValue":true,
        pickAlias:function(){
            return xui.absObj.$pickAlias(this);
        },
        getFromDom:function(id){
            var prf=xui.UIProfile.getFromDom(id);
            if(prf&&(prf=prf.host)){
                return (!prf.destroyed) &&prf;
            }
        },
        getClsFromDom:function(id){
            return _.get(this.getFromDom(id),["KEY"]);
        },
        getAllInstance:function(){
            var hash={};
            _.arr.each(this._cache,function(o){
                hash[o.$xid]=o;
            });
            return hash;
        },
        getInstance:function(module, xid){
            var m=this;
            if(!xid){
                if(module['xui.Profile'] && module.moduleClass && module.moduleXid){
                    xid = module.moduleXid;
                    module = module.moduleClass;
                }else{
                    xid = module;
                    module = null;
                }
            }
            if(module){
                m=xui.SC.get(module);
                if(!m||!m['xui.Module'])return;
            }
            var c=m._cache;
            for(var i in c)
                if(_.isFinite(i) ? (xid+"")==i : ('$'+xid)==i)return c[i];
        },
        destroyAll:function(){
            _.arr.each(this._cache,function(o){
                if(!o.destroyed)o.destroy();
            });
        },
        load:function(cls, onEnd, lang, theme, showUI){
            if(!cls){
                var e=new Error("No cls");
                _.tryF(onEnd,[e,null]);
                throw e;
            }
            // compitable
            if(typeof theme=='function')thowUI=theme;

            var fun=function(){
                var ifun=function(path){
                    //if successes
                    if(path){
                        if(this.viewStyles && _.isHash(this.viewStyles)){
                            try{
                                if(this.viewStyles.theme){
                                    theme=this.viewStyles.theme;
                                    delete this.viewStyles.theme;
                                }
                                _.each(this.viewStyles,function(v,k){
                                    xui('html').css(k, xui.adjustRes(v));
                                });
                            }catch(e){}
                        }
                        var a=this,f=function(){
                            if(!_.isFun(a)){
                                var e=new Error( "'"+cls+"' is not a constructor");
                                _.tryF(onEnd,[e,null]);
                                throw e;
                            }else{
                                var o=new a();
                                // record it
                                a._callfrom=cls;
    
                                _.set(xui.ModuleFactory,["_cache",cls],o);
    
                                if(showUI!==false)o.show(onEnd);
                                else _.tryF(onEnd,[null,o],o);
                            }
                        };
                        if(theme&&theme!="default"){
                            xui.setTheme(theme,true,function(){
                                //get locale info
                                if(lang) xui.setLang(lang, f);
                                else f();
                            });
                        }else{
                            //get locale info
                            if(lang) xui.setLang(lang, f);
                            else f();
                        }
                    }else{
                        var e=new Error("No class name");
                        _.tryF(onEnd,[e,null]);
                        throw e;
                    }
                };
                if(typeof(cls)=='function'&&cls.$xui$)ifun(ok);
                else cls=cls+"";
                if(/\//.test(cls) && !/\.js$/i.test(cls))
                    cls=cls+".js";
                if(/\.js$/i.test(cls)){
                    xui.fetchClass(cls,ifun,
                        function(e){
                            _.tryF(onEnd,[e,null]);
                        });
                }else
                    //get app class
                    xui.SC(cls,ifun,true,null,{
                        retry:0,
                        onFail:function(e){
                            _.tryF(onEnd,[e,null]);
                        }
                    });
            };
            if(xui.isDomReady)
                fun();
            else
                xui.main(fun);
        },
        unserialize:function(hash){
            return new this(hash);
        },
        $attachModuleInfo:function(module,prf){
            // module in module
            if(prf.moduleClass && prf.moduleXid){
                var t=xui.SC.get(prf.moduleClass);
                    t=t.getInstance(prf.moduleXid);
                if(t!==module){
                    t.moduleClass=module.KEY;
                    t.moduleXid=module.$xid;
                    return;
                }
            }

            prf.moduleClass=module.KEY;
            prf.moduleXid=module.$xid;
            _.arr.each(prf.children,function(v){
               xui.Module.$attachModuleInfo(module, v[0]);
            });
        },

        // for setting only
        $DataModel:{
            autoDestroy:true,
            $UIValue:"",
            value:""
        },
        $EventHandlers:{
            beforeCreated:function(module, threadid){},
            onLoadBaseClass:function(module, threadid, key){},
            onLoadBaseClassErr:function(module, threadid, key){},
            onLoadRequiredClass:function(module, threadid, uri, key){},
            onLoadRequiredClassErr:function(module, threadid, uri){},
            onIniResource:function(module, threadid){},
            beforeIniComponents:function(module, threadid){},
            afterIniComponents:function(module, threadid){},
            onReady:function(module, threadid){},
            onRender:function(module, threadid){},
            onDestroy:function(module){}
        }
    }
});