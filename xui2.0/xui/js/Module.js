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

    onModulePropChange

    // for values
    getValue:function(){},
    getUIValue:function(){},
    resetValue:function(){},
    setUIValue:function(){},
    updateValue:function(){},
    isDirtied:function(){},
    checkValid:function(){},
*/
xui.Class('xui.Module','xui.absProfile',{
    Initialize:function(){
        var ns=this;
        xui.launch = function(cls, onEnd, lang, theme, showUI, parent, subId){
            ns.load.apply(ns, arguments);
        };
        // compitable
        ns['xui.Com']=ns.prototype['xui.Com']=1;
        xui.Com=ns;
        ns.$activeClass$='xui.Module';
    },
    After:function(){
        var self=this,k, e, t, b, i;
        xui.arr.each(['$DataModel','$EventHandlers'],function(v){
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
        e = self.prototype;
        if('_evsClsBuildIn' in e){
            b = e._evsClsBuildIn;
            // for parents defination
            t = e._evsPClsBuildIn || (e._evsPClsBuildIn={});
            for(i in b){
                if(t[i]){
                    if(!xui.isArr(t[i]))t[i]=[t[i]];
                    xui.arr.insertAny(t[i],b[i]);
                }else t[i]=xui.clone(b[i]);
            }
            e._evsClsBuildIn=null;
        }
        if('events' in e){
            // for class defination
            e._evsClsBuildIn=e.events;
            // events for instance
            e.events={};
        }
        self._nameId=0;
        self._nameTag=self.$nameTag||(self.KEY.replace(/\./g,'_').toLowerCase());
        self._cache=[];
    },
    Constructor:function(properties, events, host){
        var self=this,opt,alias;

        // If it's a older moudle object, set xid first
		if(properties && properties.constructor==self.constructor){
			if(properties.$xid){
				self.$xid = properties.$xid;
			}
		}

        var upper=arguments.callee.upper;
        if(upper)upper.call(self);
        upper=null;

        // If it's a older moudle object, refresh itself
        if(properties && properties.constructor==self.constructor){
        	 var oldm = properties; 
             
             events = oldm.events || {};
             alias = oldm.alias;
             host = oldm.host;
             properties = oldm.properties || {};
             // for refresh , use the old pointer
             self=oldm;
        }else{
        	if(properties && properties.key && properties["xui.Module"]){
	             var opt=properties;
	             properties = (opt && opt.properties) || {};
	             events = (opt && opt.events) || {};
	             alias = opt.alias;
	             host = opt.host;
	        }else{
	            properties = properties || (self.properties?xui.clone(self.properties):{});
	            events = events || (self.events?xui.clone(self.events):{});
	        }
	    }
        

        self.Class=self.constructor;
        self.box=self.constructor;
        self.key=self.KEY;

        if(!alias)alias =self.constructor.pickAlias();
        if(!xui.isEmpty(self.constructor.$DataModel)){
            xui.merge( properties, xui.clone(self.constructor.$DataModel),'without');
        }
        //
        self._links={};
        self.link(self.constructor._cache, "self");
        self.link(xui.Module._cache, "xui.module");
        self.link(xui._pool,'xui');
        
        self.host=host||self;
        self.alias=alias;
        
        self.$UIvalue="";

        self._nodes=[];
        self._ctrlpool={};
        self.events=events;
        self.properties={};
        if(self._evsClsBuildIn) self._evsClsBuildIn = xui.clone(self._evsClsBuildIn);
        if(self._evsPClsBuildIn) self._evsPClsBuildIn = xui.clone(self._evsPClsBuildIn);

        self.setProperties(properties, null, true);

        self._innerCall('initialize');

        return self;
    },
    Instance:{
        autoDestroy:true,
        background:"",

        // [[[ fake boxing
        get:function(index){
            return  xui.isNumb(index)?this:[this];
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
        getRoot:function(rtnPrf){
            if(!this._innerModulesCreated)this._createInnerModules();
            var fun = function(m){
                if(m["xui.Module"]){
                    for(var i=0,l=m._nodes,o;i<l, o=m._nodes[i];i++){
                        if(o["xui.Module"]) return fun(o);
                        if(o["xui.UIProfile"] && !o.box.$initRootHidden) return rtnPrf?o:o.getRoot();
                    }
                }
            };
            return fun(this);
        },
        getRootNode:function(){
            var ui=this.getRoot();
            if(!ui.isEmpty())return ui.get(0);
        },
        getModule:function(top){
        	var getUpperModule=function(module){
                // if it's a inner module
                if(module.moduleClass && module.moduleXid){
                    var pm = xui.SC.get(module.moduleClass);
                    if(pm && (pm = pm.getInstance(module.moduleXid))){
                        return getUpperModule(pm);    
                    }         
                }
                return module;
            };
            return top?getUpperModule(this):this;
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
            var ns=this, innerUI=ns.getUIComponents();
            if(!ns.created)
                // create synchronously
                ns.create(null,false)
            ns.render();

            // force to create and render the first layer inner modules
            innerUI.each(function(o,i){
            	if((o=o.getModule()) && o!=ns){
            		o._toDomElems();
            	}
            });

            return innerUI._toDomElems();
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
        setFunctions:function(key,value){
            var self=this;

            if(!key)
                delete self.functions;
            else if(typeof key=='string')
                self.functions[key]=value;
            else if(xui.isHash(key)){
                if(value/*force*/){
                    self.functions = xui.clone(key);
                }else{
                    xui.merge(self.functions, key, 'all');
                }
            }
        },
        getFunctions:function(key){
            var fs=this.functions;
            if(fs && xui.isHash(fs)){
                return key?fs[key]:fs;
            }
        },
        setProperties:function(key,value,ignoreEvent,innerDataOnly){
            var self=this;

            if(!key)
                self.properties={};
            else if(typeof key=='string')
                self.properties[key]=value;
            else if(xui.isHash(key)){
                if(value/*force*/){
                    self.properties = xui.clone(key);
                }else{
                    xui.merge(self.properties, key, 'all');
                }
            }

            if(self.propSetAction)self.propSetAction(self.properties);
            if(!ignoreEvent){
                if(!innerDataOnly){
                    var oDataBinder;
                    if('dataBinder' in self.properties){
                        oDataBinder = self.properties.dataBinder;
                    }
                    if('dataBinder' in self.properties){
                        if(oDataBinder!==self.properties.dataBinder){
                            if(oDataBinder)xui.DataBinder._unBind(oDataBinder, self);
                            if(self.properties.dataBinder)xui.DataBinder._bind(self.properties.dataBinder, self);
                        }
                    }
                }

                if(self._innerModulesCreated && ('__inner_coms_prop__' in self.properties))
                    self.setProfile(self.properties.__inner_coms_prop__);
            
                // the last one
                if(!innerDataOnly){
                    self._fireEvent('onModulePropChange');
                }
            }
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
            else if(xui.isHash(key)){
                if(value/*force*/){
                    self.events = xui.clone(key);            
                }else{
                    xui.merge(self.events, key, 'all');
                }
            }
            return self;
        },
        getEvents:function(key){
            return key?this.events[key]:this.events;
        },
        postMessage:function(message, sender){
           this.fireEvent('onMessage',  [this, message, sender]);
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
            xui.merge(c,o.properties, function(o,i){return p[i]!==o});
            if(!xui.isEmpty(c))r.properties=c;
            if(xui.isEmpty(r.properties))delete r.properties;

            //functions
            if(!xui.isEmpty(o.functions))r.functions=c;
            if(xui.isEmpty(r.functions))delete r.functions;

            //events
            if(!xui.isEmpty(t=this.getEvents()))r.events=t;
            var eh = o.box.$EventHandlers;
            xui.filter(r.events, function(o,i){
                return o!==eh[i];
            });

            //events
            if(!xui.isEmpty(t=this.getEvents()))r.events=t;
            if(xui.isEmpty(r.events))delete r.events;

            return rtnString===false?r:xui.serialize(r);
        },
        clone:function(){
            var ns=this.serialize(false,true);
            delete ns.alias;
            return this.constructor.unserialize(ns);
        },
        // for outter events
        fireEvent:function(name, args, host){
            var r,
                self = this,
                tp = self._evsPClsBuildIn && self._evsPClsBuildIn[name],
                ti = self._evsClsBuildIn && self._evsClsBuildIn[name],
                tt = self.events && self.events[name],
                applyEvents=function(prf, events, host, args){
                    var j;
                    args=args||[];
                    if(!xui.isArr(events))events=[events];
                    if(xui.isNumb(j=events[0].event) && xui.isObj(args[j]))args[j]=xui.Event.getEventPara(args[j]);

                    return xui.pseudocode._callFunctions(events, args, host,null,prf.$holder);
                };
            if(self.$inDesign)return;
            self.$lastEvent=name;
            if(tp && (!xui.isArr(tp) || tp.length))r = applyEvents(self, tp, self, args);
            if(ti && (!xui.isArr(ti) || ti.length))r = applyEvents(self, ti, self, args);
            // only events can use host
            if(tt && (!xui.isArr(tt) || tt.length))r = applyEvents(self, tt,  host||self.host||self, args);
            return r;
        },
        // for inner events
        _fireEvent:function(name, args){
            var self = this;
            args=args||[];
            args.splice(0,0,self,self.threadid);
            return this.fireEvent(name, args);
        },
        _innerCall:function(name){
            var self=this;
            return xui.tryF(self[name],[self, self.threadid],self);
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
                if(style && !xui.isEmpty(style)){
                    var arr=[];
                    xui.each(style,function(v,k){
                        arr.push(k+" : "+v+";");
                    });
                    var txt=".xui-module-"+self.$xid+"{\r\n"+arr.join("\r\n")+"\r\n}";
                    xui.CSS.addStyleSheet(txt,"xui:css:module-"+self.$xid,1);
                }
                // no UI control in module
                if(self.getUIComponents().isEmpty()){
                    xui.tryF(self.customAppend,[parent,subId,left,top,threadid], self);
                    xui.tryF(onEnd,[null, self, threadid],self.host);
                }else{
                    // if parent is an ui object without rendered, dont render the module
                    if(!(parent && parent['xui.UI']  && !parent.get(0).renderId))
                        self.render();

                    if(false===xui.tryF(self.customAppend,[parent,subId,left,top,threadid], self)){
                        //append only
                        parent.append(self.getUIComponents(false),subId);
                        // append and show
                        self.getUIComponents(true).each(function(o){
                            o.boxing().show(parent, subId);
                            if(o.KEY=='xui.UIProfile' && xui.get(o,['properties','defaultFocus'])){
                               try{xui.asyRun(function(){o.boxing().activate()})}catch(e){}
                            }
                        });
                    }
                    self.renderId='ok';
                    xui.tryF(onEnd,[null, self, threadid],self.host);
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
                self.renderId='ok';
                self.getUIComponents().render(triggerLayout);
                self._fireEvent('onRender');
            }
            return self;
        },
        refresh:function(callback,ignoreEffects, purgeNow){
            var paras, b, p, s, fun, 
                o=this,
                inm, firstUI,
                // for builder project module updating
                box=o.box,
                host=o.host,
                alias=o.alias,
                $xid=o.$xid,
                rt = o.$refreshTrigger,
                mcls = o.moduleClass,
                mxid = o.moduleXid;

            if(!o.renderId)return;
            if((inm=o.getUIComponents()).isEmpty())return;
            firstUI = inm.get(0);

            if(host && host['xui.Module']){
                host.$ignoreAutoDestroy=true;
            }
            //keep parent
            if(b=!!firstUI.parent){
                p=firstUI.parent.boxing();
                childId=firstUI.childrenId;
            }else{
                p=firstUI.parent();
            }

            //unserialize
            s = o.serialize(false, true);
            o.destroy(true, true, true);
            //set back
            xui.merge(o,s,'all');
            // notice: remove destroyed here
            delete o.destroyed;
            o.$xid=$xid;
            //create, must keep the original refrence pointer
            new box(o);
            if(host)o.setHost(host,alias);

            // must here
            o.moduleClass=mcls;
            o.moduleXid=mxid;

            o.create(function(){
            	var f=function(t,m){
	                //for functions like: UI refresh itself
	                if(rt)rt.call(rt.target, o);
                    if(callback)xui.tryF(callback);
            	};
                //add to parent, and trigger RenderTrigger
                if(b)o.show(f,p,childId);
                else if(!p.isEmpty())o.show(f,p);
            });

            if(o.host&&o.host['xui.Module']){
                delete o.host.$ignoreAutoDestroy;
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
                xui.tryF(onEnd,[null, self, threadid],self.host);
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

            //base classes
            if((t=self.Dependencies) && t.length)
                funs.push(function(threadid){
                    xui.require(self.Dependencies,null,function(uri,key){
                        self._fireEvent('onLoadBaseClass', [uri,key]);
                    },function(){
                        self._fireEvent('onLoadBaseClassErr', xui.toArr(arguments));
                    },function(){
                        self._fireEvent('onLoadBaseClassErr',  xui.toArr(arguments));
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
                    if(self.Required&&xui.isArr(self.Required)){
                        self.Required.concat(arr);
                    }else{
                        self.Required=arr;
                    }
                }
            }
            //load required class
            if((t=self.Required) && t.length)
                funs.push(function(threadid){
                    xui.require(self.Required,null,function(uri,key){
                        self._fireEvent('onLoadRequiredClass', [uri,key]);
                    },function(){
                        self._fireEvent('onLoadRequiredClassErr',  xui.toArr(arguments));
                    },function(msg){
                        self._fireEvent('onLoadRequiredClassErr',  xui.toArr(arguments));
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
                xui.tryF(onEnd,[null, self, threadid],self.host);
            });
            if(threadid===false){
                xui.arr.each(funs,function(fun){
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
            if(self._recursived || self._innerModulesCreated)
                return;            
            var stop, checkCycle=function(h){
                if(h && h["xui.Module"] && h.moduleClass && h.moduleXid){
                    if(self.KEY == h.moduleClass){
                        if(self.$xid != h.moduleXid){
                            self._recursived = h._recursived = true;
                            h.destroy();
                            self.destroy();
                            stop=1;
                        }else{
                            // self is ok
                            return;
                        }
                    }else{
                        checkCycle(h.host);
                    }
                }
            };
            checkCycle(self.host);
            if(stop){
                alert("There's a [" + self.KEY + "] in another [" + self.KEY+"], check this recursive call please!");
                return;
            }


            if(false===self._fireEvent('beforeIniComponents'))return;
            Array.prototype.push.apply(self._nodes, self._innerCall('iniComponents')||[]);

            xui.arr.each(self._nodes,function(o){
                xui.Module.$attachModuleInfo(self,o);
                //Recursive call
                if(o['xui.Module'])o._createInnerModules();
            });
            // attach destroy to the first UI control
            var autoDestroy = self.autoDestroy || self.properties.autoDestroy;
            if(autoDestroy)
                xui.arr.each(self._nodes,function(o){
                    if(o.box && o.box["xui.UI"] && !o.box["xui.UI.MoudluePlaceHolder"] && !o.box.$initRootHidden){
                        (o.$afterDestroy=(o.$afterDestroy||{}))["moduleDestroyTrigger"]=function(){
                            if(autoDestroy && !self.destroyed && !self.$ignoreAutoDestroy)
                                self.destroy();
                            self=null;
                        };
                        return false;
                    }
                });
            self._fireEvent('afterIniComponents');
            
            self._innerModulesCreated=true;
            // must be here
            self.setProperties({});
        },
        iniComponents:function(){},

        getProfile:function(){
            if(!this._innerModulesCreated)this._createInnerModules();

            var hash={},t;
            xui.each(this._ctrlpool, function(prf){
                t=hash[prf.alias]=prf.serialize(false,false,false);
                delete t.key;
                delete t.alias;
                delete t.events;
                delete t['xui.Module'];
            });
            return hash;
        },
        setProfile:function(profiles){
            if(!this._innerModulesCreated)this._createInnerModules();

             xui.each(this._ctrlpool, function(prf,i){
                if(prf.alias in profiles){
                    i=profiles[prf.alias];
                    var ins=prf.boxing();
                    if(i && xui.isHash(i) && !xui.isEmpty(i)){
                        if(i.theme&&typeof(ins.setTheme)=="function")ins.setTheme(i.theme);
                        if(i.properties &&!xui.isEmpty(i.properties))ins.setProperties(i.properties);
                        if(i.CA&&!xui.isEmpty(i.CA))ins.setCustomAttr(i.CA);
                        if(i.CC&&!xui.isEmpty(i.CC))ins.setCustomClass(i.CC);
                        if(i.CS&&!xui.isEmpty(i.CS))ins.setCustomStyle(i.CS);
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
                 xui.each(this._ctrlpool, function(prf){
                    var prop=prf.properties;
                    if(prop.propBinder)
                        xui.each(prop.propBinder,function(fun,key){
                            if((key in prop) && xui.isFun(fun))fun();
                        });
                });
            }catch(e){}finally{window.get=bak}
            return xui.toArr(hash,true);
        },
        reBindProp:function(dataMap){
            if(!this._innerModulesCreated)this._createInnerModules();

            var bak;
            if(window.get)bak=get;
            window.get=function(k){return xui.SC.get(k,dataMap)};
            try{
                 xui.each(this._ctrlpool, function(prf){
                    prf.boxing().reBindProp(dataMap,true);
                });
            }catch(e){window.get=bak}
        },

        getData:function(withValue){
            if(!this._innerModulesCreated)this._createInnerModules();

            var hash={};
             xui.each(this._ctrlpool, function(prf){
                var prop=prf.properties,
                    ins=prf.boxing(),
                    ih=hash[prf.alias]={};
                xui.arr.each(["src","html","items","listKey","header","rows","target","toggle","attr","JSONData","XMLData","JSONUrl","XMLUrl","name",'labelCaption'],function(k){
                    if(k in prop)ih[k]=prop[k];
                });
                if(withValue)
                    if('value' in prop)ih.value=prop.value;
                if('caption' in prop && xui.isSet(prop.caption)){
                    ih.caption=typeof(ins.getCaption)=="function"?ins.getCaption():prop.caption;
                }
            });
            return hash;
        },
        setData:function(data){
            if(!this._innerModulesCreated)this._createInnerModules();

             xui.each(this._ctrlpool, function(prf){
                var prop=prf.properties,
                    ins=prf.boxing(),ih;
               if(prf.alias in data){
                    ih=data[prf.alias];
                    if(ih && xui.isHash(ih) && !xui.isEmpty(ih)){
                        xui.arr.each(["src","html","items","listKey","header","rows","target","toggle","attr","JSONData","XMLData","JSONUrl","XMLUrl","name","value",'labelCaption',"caption"],function(k){
                            if(k in prop && k in ih)ins['set'+xui.str.initial(k)](ih[k]);
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
                 xui.each(this._ctrlpool, function(prf){
                    if('value' in prf.properties){
                        if(xui.isSet(prf.properties.caption)){
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

                if(!xui.isEmpty(values)){
                     xui.each(this._ctrlpool, function(prf){
                        if('value' in prf.properties && prf.alias in values){
                            var v=values[prf.alias],b=xui.isHash(v) ;
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
                 xui.each(this._ctrlpool, function(prf){
                    if('$UIvalue' in prf.properties)
                        hash[prf.alias]=prf.properties.$UIvalue;
                });
                return hash;
            }else{
                return this.$UIvalue;
            }
        },
        setUIValue:function(values,innerUI){
            if(innerUI){
                if(!this._innerModulesCreated)this._createInnerModules();

                if(!xui.isEmpty(values)){
                     xui.each(this._ctrlpool, function(prf){
                        if('value' in prf.properties && prf.alias in values){
                            var v=values[prf.alias],b=xui.isHash(v) ;
                            prf.boxing().setUIValue((b && ('value' in v))?v.value:v, true,false,'module');
                            if(typeof(prf.boxing().setCaption)=="function" && b &&  'caption' in v)
                                prf.boxing().setCaption(v.caption, null, true,'module');
                        }
                    });
                }
            }else{
                this.$UIvalue = values;
            }
            return this;
        },
        resetValue:function(innerUI){
            if(innerUI){
                if(!this._innerModulesCreated)this._createInnerModules();
                xui.each(this._ctrlpool, function(prf){
                     if(prf.boxing().resetValue)prf.boxing().resetValue();
                });
            }else{
                this.$UIvalue=this.properties.value; 
            }
            return this;
        },
        updateValue:function(innerUI){
            if(innerUI){
                if(!this._innerModulesCreated)this._createInnerModules();
                xui.each(this._ctrlpool, function(prf){
                     if(prf.boxing().updateValue)prf.boxing().updateValue();
                });
            }else{
                this.properties.value=this.$UIvalue; 
                return this;
            }
            return this;
        },
        isDirtied:function(innerUI){
            if(innerUI){
                if(!this._innerModulesCreated)this._createInnerModules();

                var dirtied=false;
                xui.each(this._ctrlpool, function(prf){
                    if(prf.boxing().isDirtied){
                        if(prf.boxing().isDirtied()){
                            return false;
                        }
                    }
                });
                 return dirtied;
            }else{
                return this.properties.value===this.$UIvalue;
            }
        },
        checkValid:function(innerUI){
            if(innerUI){
                if(!this._innerModulesCreated)this._createInnerModules();

                  xui.each(this._ctrlpool, function(prf){
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
            
            var nodes = xui.copy(this._nodes),t,k='xui.DataBinder';
            xui.filter(nodes,function(o){
                return !!(o.box[k]);
            });
            return nodes;
        },
        getForms:function(){
            if(!this._innerModulesCreated)this._createInnerModules();
            
            var nodes = xui.copy(this._ctrlpool),t,k='xui.absContainer';
            xui.filter(nodes,function(o){
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
                        xui.each(m._ctrlpool,function(o){
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
                    xui.arr.each(m._nodes,function(o){
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
            xui.filter(nodes,function(o){
                return !!(o && o.box &&o.box[k]) && (flag===true?!o.box[n]:flag===false?o.box[n]:true);
            });
            return xui.UI.pack(nodes, false);
        },
        setComponents:function(obj){
            var self=this,t;
            xui.arr.each(self._nodes,function(o){
                if((t=self[o.alias]) &&t.get(0)==o)
                    delete self[o.alias];
            });
            xui.arr.each(self._nodes=obj.get(),function(o){
                // set host
                o.boxing().setHost(self, o.alias);
            });
            xui.arr.each(self._nodes,function(o){
                xui.Module.$attachModuleInfo(self,o);
            });
            return self;
        },
        AddComponents:function(obj){
            var self=this;
            xui.arr.each(obj.get(),function(o){
                o.boxing().setHost(self, o.alias);
                self._nodes.push(o);
                xui.Module.$attachModuleInfo(self,o);
            });
            return self;
        },
        isDestroyed:function(){
            return !!this.destroyed;
        },
        destroy:function(ignoreEffects, purgeNow,keepStructure){
            var self=this,con=self.constructor,ns=self._nodes;
            if(self.destroyed)return;
            
            self._fireEvent('onDestroy');
            if(self.alias && self.host && self.host[self.alias]){
                delete self.host[self.alias];
            }

            //set once
        	self.destroyed=true;
            if(ns && ns.length)
                xui.arr.each(ns, function(o){
                    if(o && o.box)
                        o.boxing().destroy(ignoreEffects, purgeNow);
                },null,true);

            if(ns && ns.length)
                self._nodes.length=0;
        	self._ctrlpool=null;
            
            self.unLinkAll();

            if(!keepStructure){
	            xui.breakO(self);
	        }else{
                // for refresh itself
                delete self.renderId;
                delete self.created;
                delete self._innerModulesCreated;
            }
            //afterDestroy
            if(self.$afterDestroy){
                xui.each(self.$afterDestroy,function(f){
                    xui.tryF(f,[],self);
                });
                xui.breakO(self.$afterDestroy,2);
            }
            //set again
        	self.destroyed=true;
        }
    },
    Static:{
        // fake absValue
        "xui.absValue":true,
        refresh:function(code){
            var m=this,keep={
                '$children':m.$children,
                _cache:m._cache,
                _nameId:m._nameId
            },
            key=m.KEY,
            path=key.split("."),
            n;
            // clear cache
            if(s=xui.get(window,['xui','$cache','SC']))delete s[key];
            xui.set(window, path);
            // rebuild
            xui.exec(code);
            // the new one
            n=xui.get(window, path);
            // merge new to old
            xui.merge(m,n,function(o,i){return n.hasOwnProperty(i);});
            xui.merge(m.prototype, n.prototype,function(o,i){return n.prototype.hasOwnProperty(i);});
            // restore those
            xui.merge(m,keep,'all');
            // break new
            xui.breakO(n.prototype,1);
            xui.breakO(n,1);
            // restore namespace
            xui.set(window, path, m);
            return m;
        },
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
            return xui.get(this.getFromDom(id),["KEY"]);
        },
        getAllInstance:function(){
            var hash={};
            xui.arr.each(this._cache,function(o){
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
                if(xui.isFinite(i) ? (xid+"")==i : ('$'+xid)==i)return c[i];
        },
        postMessage:function(cls, message, sender){
           var m = xui.SC.get(cls),hash;
            if(m && m['xui.Module'])
                xui.arr.each(m._cache,function(o){
                     m.fireEvent('onMessage',  [m,message, sender]);
                });
        },
        destroyAll:function(ignoreEffects, purgeNow){
            xui.arr.each(this._cache,function(o){
                if(!o.destroyed)o.destroy(ignoreEffects, purgeNow);
            });
        },
        load:function(cls, onEnd, lang, theme, showUI, parent, subId){
            if(!cls){
                var e=new Error("No cls");
                xui.tryF(onEnd,[e,null]);
                throw e;
            }
            // compitable
            if(typeof theme=='function')thowUI=theme;
                var ifun=function(path){
                    var a=this,
                        t, bg, 
                        f=function(i,l,flag){
                            if(bg && xui.isHash(bg)){
                                xui.each(bg,function(v,k){
                                    xui('html').css(k, xui.adjustRes(v));
                                });
                            }

                            if(!xui.isFun(a)){
                                var e=new Error( "'"+cls+"' is not a constructor");
                                xui.tryF(onEnd,[e,null]);
                                throw e;
                            }else{
                                var o=new a();
                                // record it
                                a._callfrom=cls;
    
                                xui.set(xui.ModuleFactory,["_cache",cls],o);
    
                                if(showUI!==false)o.show(onEnd, parent, subId);
                                else xui.tryF(onEnd,[null,o],o);
                            }
                        };
                    //if successes
                    if(path){
                        try{
                            // for CDN font icons
                            if((t=xui.ini.$FontIconsCDN) && xui.isHash(t)){
                                xui.each(t,function(o,i){
                                    if(o.href){
                                        var attr={crossorigin:'anonymous'};
                                        xui.merge(attr, o, function(v,j){return j!=='href'});
                                        xui.CSS.includeLink(xui.adjustRes(o.href), 'xui_app_fscdn-'+i, false,attr);
                                    }
                                });
                            }
                            // for theme or background of root
                            if((t=xui.ini.$PageAppearance) && xui.isHash(t)){
                                if(t.theme)theme=t.theme;
                                if(t.lang)lang=t.lang;
                                bg=t.background;
                            }
                            if((t=xui.ini.$ElementStyle) && xui.isHash(t)){
                                xui.CSS.setStyleRules(".xui-custom",t,true);
                            }
                            if((t=xui.ini.$DefaultProp) && xui.isHash(t)){
                                var allp={}, ctl;
                                xui.each(t,function(v,k){
                                    if(/^xui\.UI\./.test(k) && xui.isHash(v) && (ctl=xui.get(window, k.split('.')))) {
                                        ctl.setDftProp(v);
                                    }else{
                                        allp[k]=v;
                                    }
                                });
                                if(!xui.isEmpty(allp)){
                                    xui.UI.setDftProp(allp);
                                }
                            }
                            if((t=xui.ini.$WebAPIMocker) && xui.isHash(t)){
                                xui.APICaller.setMocker(t);
                            }
                        }catch(e){}
                        if(theme&&theme!="default"){
                            xui.setTheme(theme,true,function(){
                                if(lang) xui.setLang(lang, f); else f();
                            },function(){
                                xui.alert("Can't load theme - " + theme);
                                if(lang) xui.setLang(lang, f); else f();
                            });
                        }else{
                            //get locale info
                            if(lang) xui.setLang(lang, f);else f();
                        }
                    }else{
                        var e=new Error("No class name");
                        xui.tryF(onEnd,[e,null]);
                        throw e;
                    }
                },
                fun=function(){
                    if(typeof(cls)=='function'&&cls.$xui$)ifun(ok);
                    else cls=cls+"";
                    if(/\//.test(cls) && !/\.js$/i.test(cls))
                        cls=cls+".js";
                    if(/\.js$/i.test(cls)){
                        xui.fetchClass(cls,ifun,
                            function(e){
                                xui.tryF(onEnd,[e,null]);
                            });
                    }else
                        //get app class
                        xui.SC(cls,ifun,true,null,{
                            retry:0,
                            onFail:function(e){
                                xui.tryF(onEnd,[e,null]);
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
            xui.arr.each(prf.children,function(v){
               xui.Module.$attachModuleInfo(module, v[0]);
            });
        },

        // for setting only
        $DataModel:{
            autoDestroy:true,
            dataBinder:"",
            value:""
        },
        $EventHandlers:{
            onFragmentChanged:function(module, fragment, init, newAdd){},
            onMessage:function(module, message, source){},
            beforeCreated:function(module, threadid){},
            onLoadBaseClass:function(module, threadid, uri, key){},
            onLoadBaseClassErr:function(module, threadid, key){},
            onLoadRequiredClass:function(module, threadid, uri, key){},
            onLoadRequiredClassErr:function(module, threadid, uri){},
            onIniResource:function(module, threadid){},
            beforeIniComponents:function(module, threadid){},
            afterIniComponents:function(module, threadid){},
            onModulePropChange:function(module, threadid){},
            onReady:function(module, threadid){},
            onRender:function(module, threadid){},
            onDestroy:function(module){}
        }
    }
});