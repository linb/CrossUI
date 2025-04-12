/*
    initialize
    beforeCreated
    onCreated
    onLoadRequiredClass
    onLoadRequiredClassErr
    onIniResource
        iniResource (asy)
    beforeIniComponents
        iniComponents (asy)
    afterIniComponents
        iniExModules (asy)
    onReady
    onInitValues
    onRender
    beforeShow
    onShow
    afterShow

    onHide

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
        xui.launch = function(cls, onEnd, lang, theme, showUI, parent, subId, onCreated, onDomReady){
            ns.load.apply(ns, [cls, function(err, module){
                if(xui.ini.rootModuleName) window[xui.ini.rootModuleName] = module;
                xui.tryF(onEnd, [err, module], module);
            }, lang, theme, showUI, parent, subId, onCreated, onDomReady]);
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
        self._nameId=self._refId=0;
        self._nameTag=self.$nameTag||(self.KEY.replace("xui.",'').replace(/\./g,'_').toLowerCase());
        self._cache=[];
    },
    Constructor:function(properties, events, host){
        var self=this,opt,alias,ref,t;

        // If it's a older module object, set xid first
        if(properties && properties.constructor==self.constructor){
            if(properties.$xid){
                self.$xid = properties.$xid;
            }
        }

        var upper=arguments.callee.upper;
        if(upper)upper.call(self);
        upper=null;

        // If it's a older module object, refresh itself
        if(properties && properties.constructor==self.constructor){
             var oldm = properties;

             events = oldm.events || {};
             alias = oldm.alias;
             ref = oldm.ref;
             host = oldm.host;
             properties = oldm.properties || {};
             // for refresh , use the old pointer
             self=oldm;
        }else{
            if(properties && properties.key && properties["xui.Module"]){
                 opt=properties;
                 properties = (opt && opt.properties) || {};
                 events = (opt && opt.events) || {};
                 alias = opt.alias;
                 ref = opt.ref;
                 host = opt.host;
            }else{
                if(!properties){
                    if(self.properties){
                        properties =  xui.clone(self.properties,true);
                        // for inner coms prf
                        if(t=self.properties.__inner_coms_prf__)properties.__inner_coms_prf__=t;
                    }else properties =  {};
                }
                events = events || (self.events?xui.clone(self.events):{});
            }
        }


        self.Class=self.constructor;
        self.box=self.constructor;
        self.key=self.KEY;

        if(!xui.isEmpty(self.constructor.$DataModel)){
            xui.merge( properties, xui.clone(self.constructor.$DataModel),'without');
        }
        //
        self._links={};
        self.link(self.constructor._cache, "self").link(xui.Module._cache, "xui.module");

        self.host=host||self;
        self.alias=alias;
        self.ref=ref;
        self.container = null;

        self.$UIvalue="";
        // init
        self._hidden=-1;

        self._nodes=[];
        self.events=events;
        self.properties={};
        self.hooks={};
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
                    for(var i=0,o;o=m._nodes[i];i++){
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
                profile.containerId = linkId;
                profile.link(parentProfile.children, '$parent', [profile, linkId], index);
            }
            return profile;
        },
        unlinkParent:function(){
            var profile=this;
            delete profile.parent;
            delete profile.containerId;
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
        setRef:function(ref){
            return xui.absObj.prototype._setHostAlias.call(null, null, ref);
        },
        getRef:function(){
            return this.ref;
        },
        setContainer:function(container){
            return this.container = container;
        },
        getContainer:function(){
            return this.container;
        },
        setHost:function(host, alias, ref){
            return xui.absObj.prototype._setHostAlias.call(this, host, alias, ref);
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
        setModuleProperties:function(key,value,ignoreEvent,innerDataOnly){
            return this.setProperties(key,value,ignoreEvent,innerDataOnly);
        },
        setProperties:function(key,value,ignoreEvent,innerDataOnly){
            var self=this,
                h=self.properties,
                oDataBinder=('dataBinder' in h)?h.dataBinder:null,
                t;

            if(!key)
                h={};
            else if(typeof key=='string')
                h[key]=value;
            else if(xui.isHash(key)){
                if(value/*force*/){
                    h = xui.copy(key);
                }else{
                    h=xui.clone(h, true);
                    // for inner coms prf
                    if(t=self.properties.__inner_coms_prf__)h.__inner_coms_prf__=t;
                    xui.merge(h, key, 'all');
                    if(value && xui.isHash(value))
                        xui.merge(h, value, 'all');
                }
            }
            self.properties=h;

            if(!ignoreEvent){
                if(!innerDataOnly){
                    if('dataBinder' in h){
                        if(oDataBinder!==(t=h.dataBinder||null)){
                            if(oDataBinder)xui.DataBinder._unBind(oDataBinder, self);
                            if(t)xui.DataBinder._bind(t, self);
                        }
                    }
                }

                if(self._innerModulesCreated){
                    // to apply inner control profile setting
                    if(t=self.properties.__inner_coms_prf__) self.setProfile(t);
                    // to apply inner control prop map
                    if(xui.isFun(self._propSetAction))self._propSetAction(self.properties);
                }

                if(xui.isFun(self.propSetAction))self.propSetAction(self.properties);

                // the last one
                if(!innerDataOnly){
                    self._fireEvent('onModulePropChange',[self.properties]);
                }
            }
            return self;
        },
        /*
        _propGetter:function(prop){
            var mdl=this,reg=/^\s*([^>\s]+)\s*>\s*([^>\s]+)\s*$/,r,t,f;
            xui.each(prop,function(o,i){
                if( (r=reg.exec(i)) && (t=mdl[r[1]]) )
                    prop[i] = xui.isFun(t[f='get'+xui.str.initial(r[2])]) ? t[f]() : xui.get(mdl,[r[1],'properties',r[2]]);
            });
            return prop;
        },*/
        _propSetAction:function(prop){
            var mdl=this,reg=/^\s*([^>\s]+)\s*>\s*([^>\s]+)\s*$/,r,t,f;
            xui.each(prop,function(o,i){
                // ignore [null/undifined]
                if(xui.isSet(o) && (r=reg.exec(i)) && (t=mdl[r[1]]) )
                    xui.isFun(t[f='set'+xui.str.initial(r[2])]) ? t[f](o) : xui.set(mdl,[r[1],'properties',r[2]],o);
            });
        },
        getProperties:function(key){
            var self=this, prop=self.properties;
            if(xui.isFun(self._propGetter))prop=self._propGetter(prop);
            if(xui.isFun(self.propGetter))prop=self.propGetter(prop);
            return key?prop[key]:xui.copy(prop);
        },
        setModuleEvents:function(key,value){
            return this.setEvents(key,value);
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
        setHooks:function(key,value){
            var self=this;
            if(!key)
                self.hooks={};
            else if(typeof key=='string')
                self.hooks[key]=value;
            else if(xui.isHash(key)){
                if(value/*force*/){
                    self.hooks = xui.clone(key);
                }else{
                    xui.merge(self.hooks, key, 'all');
                }
            }
            return self;
        },
        getHooks:function(key){
            return key?this.hooks[key]:this.hooks;
        },
        notifyHooks:function(key, msg1, msg2, msg3, msg4, msg5,  msg6, msg7, msg8, msg9){
            var ns=this, hook, hooks=ns.hooks;
            if(key  && hooks  && (hook=hooks[key]) && xui.isFun(hook)){
                return xui.tryF(hook, xui.toArr(arguments).slice(1), ns);
            }
        },
        postMessage:function(msg1, msg2, msg3, msg4, msg5,  msg6, msg7, msg8, msg9, sender){
            var arr=xui.toArr(arguments);
            arr.unshift(this);
            return this.fireEvent('onMessage',  arr);
        },
        serialize:function(rtnString, keepHost, oldDftProps){
            var t,m,
                self=this,
                o=(t=self.constructor._beforeSerialized)?t(self):self,
                r={
                    "xui.Module":true,
                    alias:o.alias,
                    key:o.KEY,
                    host:o.host
                };
            if(o.ref)r.ref=o.ref;
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
            xui.merge(c,o.properties, function(o,i){return !xui.deepEquals(p[i], o) });

            if(oldDftProps){
              xui.each(oldDftProps,function(v,k){
                if(v===c[k])delete c[k];
              });
            }

            // for inner coms prf
            if(t=o.properties.__inner_coms_prf__)c.__inner_coms_prf__=t;

            if(!xui.isEmpty(c))r.properties=c;
            if(xui.isEmpty(r.properties))delete r.properties;

            //functions
            if(!xui.isEmpty(c=o.functions))r.functions=c;
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
            delete ns.ref;
            return this.constructor.unserialize(ns);
        },
        // for outter events
        fireEvent:function(name, args, host){
            var self = this;
            if((self.$inDesign || (self.host && self.host.$inDesign)) && !xui.get(self,["_PASSEVTS",name]))return;

            var r, tp = self._evsPClsBuildIn && self._evsPClsBuildIn[name],
                ti = self._evsClsBuildIn && self._evsClsBuildIn[name],
                tt = self.events && self.events[name],
                applyEvents=function(prf, events, host, args){
                    var j;
                    args=xui.isSet(args)?xui.isArr(args)?args:[args]:[];

                    if(xui.isStr(events)||xui.isFun(events))events=[events];
                    if(xui.isNumb(j=(events.actions||events)[0].event)  && xui.isObj(args[j]))args[j]=xui.Event.getEventPara(args[j]);
                    return xui.pseudocode._callFunctions(events, args, host,null,prf.$holder,((host&&(host.alias||('['+host.key+']')))||(prf.$holder&&prf.$holder.alias)) + "."+ prf.alias + "."+ name);
                };
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
            if(self.destroyed)return;
            return xui.tryF(self[name],[self, self.threadid],self);
        },
        customAppend:function(parent,subId,left,top,threadid){
            return false;
        },
        popUp:function(pos, type, parent, properties,events, trigger, group){
            var module=this,
                f=function(){
                    var coms = module.getUIComponents(true),
                        first = coms.get(0);
                    if(first){
                        if(!first.rendered)first.boxing().render(true);
                        first.boxing().popUp(pos, type, parent, trigger, group);
                        self._hidden = 0;
                    }
                };
            if(self.created)f()
            else this.create(f,null,properties,events);
        },
        replace: function(onEnd,parent,subId,properties,events,left,top,ignoreEffects,callback,ignoreFocus){
            if(!parent)return;
            if(xui.isHash(subId))subId=subId.id;
            if(parent['xui.UIProfile'])parent=parent.boxing();
            if(parent["xui.UI"]){
                parent.dumpContainer(subId, true);
            }else if(parent["xui.Dom"]){
                parent.emtpy(true, true);
            }
            this.show(onEnd,parent,subId,null,properties,events,left,top,ignoreFocus,false,ignoreEffects,callback);
        },
        toggle:function(onEnd,parent,subId,properties,events,left,top,ignoreEffects,callback){
            var self=this;
            if(self.destroyed)return self;
            if(self._hidden === 0){
                self.hide();
            }else{
                self.show(onEnd,parent,subId,properties,events,null,left,top,false,false,ignoreEffects,callback);
            }
        },
        toggleOverlay:function(onEnd,anchor_target,anchor_type,properties,events,left,top,ignoreEffects,callback){
            var self=this;
            if(self.destroyed)return self;
            if(self._hidden === 0){
                return self.hide();
            }else{
                var module=this,
                    f=function(){
                        var coms = module.getUIComponents(true),
                            first = coms.get(0);
                        if(first){
                            if(!first.rendered){
                                first.boxing().render(true);
                                first._ignoreCursor=first._ignoreFocus=1;
                                first.getRoot().addClass("xui-overlay");
                            }
                            first.boxing().popUp(anchor_target, function(region, pregion, pop_node, parent){
                                var tr = pop_node.cssRegion();
                                //TODO: add more options for pop_node
                                // pop_node: center
                                pop_node.cssPos({
                                    left: (region.left + (region.width - tr.width) / 2 ) + "px",
                                    top: (region.top + (region.height - tr.height) / 2 ) + "px"
                                });
                            },xui('body'), callback);
                            self._hidden = 0;
                        }
                    };
                if(self.created)f()
                else this.create(f,null,properties,events);
            }
        },
        show:function(onEnd,parent,subId,threadid,properties,events,left,top,ignoreFocus,ignoreCursor,ignoreEffects,callback){
            var self=this;
            if(xui.isHash(properties)) xui.merge(self.properties, properties, 'all');
            if(xui.isHash(events)) xui.merge(self.events, events, 'all');
            if(self.destroyed)return self;
            if(false===self._fireEvent('beforeShow'))return false;
            if(xui.isHash(subId))subId=subId.id;
            parent=parent||xui('body');
            if(parent['xui.UIProfile'])parent=parent.boxing();

            if(self._hidden===1){
                self.getUIComponents(true).each(function(prf){
                    if(ignoreFocus)prf._ignoreFocus=1;
                    if(ignoreCursor)prf._ignoreCursor=1;
                    prf.boxing().show(parent,subId,left,top,ignoreEffects,callback);
                });
                if(!ignoreFocus && !ignoreCursor){
                    for(var i in self._alias_pool){
                        i = self._alias_pool[i];
                        if(i.box['xui.UI'] && i.boxing().getDefaultFocus && i.boxing().getDefaultFocus()){
                            try{xui.asyRun(function(){i.boxing().activate()})}catch(e){}
                            break;
                        }
                    }
                }
                self._hidden = 0;
                xui.tryF(onEnd,[null, self, threadid], self);
                self._fireEvent('onShow');
                self._fireEvent('afterShow');
            }else{
                xui.UI.$trytoApplyCSS();
                self._hidden=0;
                var f=function(){
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
                        xui.tryF(onEnd,[null, self, threadid], self);
                    }else{
                        // if parent is an ui object without rendered, dont render the module
                        if(!(parent && parent['xui.UI'] && parent.get(0) && !parent.get(0).renderId))
                            self.render();

                        if(false===xui.tryF(self.customAppend,[parent,subId,left,top,threadid], self)){
                            //append only
                            parent.append(self.getUIComponents(false),subId);
                            var svg_added = null;
                            // append and show
                            self.getUIComponents(true).each(function(o){
                                // allow showing svg in root
                                if(parent.get(0)==xui("body").get(0) && o.box && o.box['xui.svg']){
                                    svg_added = 1;
                                    var svg_id = '$xui_body:svg:', svg = xui(svg_id);
                                    if(!svg.get(0)){
                                        var paper = self._svg_paper = Raphael(document.body),
                                            canvas = self._svg_node = paper.canvas, style = canvas.style;
                                        canvas.id=svg_id;
                                        style.position=="relative";
                                        style.left=style.top=style.border=style.padding=style.margin=0;
                                        svg = xui(paper.canvas);

                                        var bd = xui.get(self,["$afterDestroy", "svgClear"]);
                                        if(!bd){
                                            (self.$afterDestroy=(self.$afterDestroy||{}))["svgClear"]=function(){
                                                if(prf._svg_paper){
                                                    xui.each(prf._svg_paper, function(paper){
                                                        paper.clear();
                                                        paper.remove();
                                                    });
                                                    prf._svg_paper = prf._svg_node = null;
                                                }
                                            };
                                        }
                                    }
                                    o._paper = self._svg_paper;
                                    svg.append(o);
                                }else{
                                    if(ignoreFocus)o._ignoreFocus=1;
                                    if(ignoreCursor)o._ignoreCursor=1;
                                    o.boxing().show(parent, subId,left,top,ignoreEffects,callback);
                                }
                            });
                            if(!ignoreFocus && !ignoreCursor){
                                for(var i in self._alias_pool){
                                    i = self._alias_pool[i];
                                    if(i.box['xui.UI'] && i.boxing().getDefaultFocus && i.boxing().getDefaultFocus()){
                                        try{xui.asyRun(function(){i.boxing().activate()})}catch(e){}
                                        break;
                                    }
                                }
                            }else if(ignoreCursor){
                                for(var i in self._alias_pool){
                                    i = self._alias_pool[i];
                                    if(i.box['xui.UI']){
                                        i.getRoot().addClass("xui-overlay");
                                    }
                                }
                            }
                        }
                        self.renderId='ok';
                        self.renderCompleted = 1;
                        if(svg_added){
                            var canvas = self._svg_node, box = canvas.getBBox();
                            if(parseInt(canvas.style.width) != Math.ceil(box.x + box.width)) {
                                canvas.style.width = Math.ceil(box.x + box.width) + "px";
                            }
                            if(parseInt(canvas.style.height) != Math.ceil(box.y + box.height)) {
                                canvas.style.height = Math.ceil(box.y + box.height) + "px";
                            }
                        }
                        xui.tryF(onEnd,[null, self, threadid], self);
                    }
                    self._fireEvent('onShow');
                    self._fireEvent('afterShow');
                };

                self.threadid=threadid;
                if(self.created) f();
                else self.create(f,threadid);
            }
            return self;
        },
        hide:function(ignoreEffects, callback){
            this.getUIComponents(true).each(function(prf){
                prf.boxing().hide();
            });
            this._hidden=1;
            xui.tryF(callback);
        },
        render:function(triggerLayout){
            if(this.destroyed)return self;
            var self=this, checkSubMdls=function(m){
                xui.arr.each(m._nodes,function(o){
                    //Recursive call
                    if(o['xui.Module']){
                      checkSubMdls(o);
                      o.render(triggerLayout);
                    }
                });
            };
            if(!self.created)
                // create synchronously
                self.create(null,false)
            if(self.renderId!='ok'){
                checkSubMdls(self);

                self.renderId='ok';
                self.renderCompleted = 1;
                self.getUIComponents().render(triggerLayout);
                self._fireEvent('onRender');
            }
            return self;
        },
        refresh:function(callback, ignoreEffects, purgeNow, oldDftProps){
            var paras, b, p, s, fun,
                o=this,
                inm, firstUI, childId,
                // for builder project module updating
                box=o.box,
                host=o.host,
                alias=o.alias,
                ref=o.ref,
                $xid=o.$xid,
                hashIn=o._render_conf,
                pPrf=o._render_holder,
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
                childId=firstUI.containerId;
            }else{
                p=firstUI.getParent();
                if(!p) p=firstUI.getRoot().parent();
            }

            //unserialize
            s = o.serialize(false, true, oldDftProps);
            o.destroy(ignoreEffects!==false, purgeNow!==false, true);

            if(oldDftProps && o.properties){
              xui.each(oldDftProps,function(v,k){
                if(v===o.properties[k])delete o.properties[k];
              });
            }

            //set back
            xui.merge(o,s,'all');
            // notice: remove destroyed here
            delete o.destroyed;
            o.$xid=$xid;
            if(hashIn)o._render_conf=hashIn;
            if(pPrf)o._render_holder=pPrf;

            //create, must keep the original refrence pointer
            new box(o);
            if(host)o.setHost(host,alias,ref);

            // must here
            o.moduleClass=mcls;
            o.moduleXid=mxid;

            o.create(function(){
                var f=function(t,m){
                    if(callback)xui.tryF(callback);
                };
                //for functions like: UI refresh itself
                if(rt)rt.call(rt.target, o);
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
        getContainerId:function(){
            var prf=this.getUIComponents().get(0);
            if(prf)return prf.containerId;
        },
        // onEnd(err, module, threadid)
        create:function(onEnd, threadid, properties, events){
            //get paras
            var self=this;

            if(xui.isHash(properties)) xui.merge(self.properties, properties, 'all');
            if(xui.isHash(events)) xui.merge(self.events, events, 'all');

            if(self.created){
                xui.tryF(onEnd,[null, self, threadid], self);
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

            var required = [], required2 = [];
            xui._collectClassRequired(self.Class, required,required2);
            //load required class recursively
            if(required.length || required2.length){
                var layer=0,attrs,id,uri;
                var fetchRequired = function(threadid,funs,index){
                    // load css first
                    if(required2.length){
                        for(var j=0,m=required2.length;j<m;j++){
                            id=attrs=null;
                            if(xui.isHash(required2[j])){
                                id = required2[j].id||null;
                                uri = required2[j].uri;
                                attrs=xui.copy(required2[j]);
                                delete attrs.id;delete attrs.uri;
                            }else{
                                uri= required2[j];
                            }
                            if(id && !xui.Dom.byId(id)){
                                xui.CSS.includeLink(uri,id,false, attrs);
                                self._fireEvent('onLoadRequiredCSS', [uri,j,layer]);
                            }else if(!xui.querySelector('link[href="'+uri+'"]').get(0)){
                                xui.CSS.includeLink(uri,id,false, attrs);
                                self._fireEvent('onLoadRequiredCSS', [uri,j,layer]);
                            }
                        }
                        required2=[];
                    }
                    if(required.length){
                        // next round
                        var requireDeep=[];
                        xui.filter(required,function(path){
                            if(xui.isArr(path)){
                                Array.prototype.push.apply(requireDeep, path);
                                return false;
                            }
                        });

                        xui.require(required,function(results){
                            // try to load deeper sub module's required classes
                            layer++;
                            // if inner module have classes to load, add a task to the current thread
                            if(required.length || required2.length){
                                xui.Thread(threadid).insert(fetchRequired);
                            }
                        },function(uri, key){
                            var obj;
                            if(key && (obj=xui.SC.get(key)) && obj.$xuiclass$){
                                xui._collectClassRequired(obj, required,required2);
                            }
                            self._fireEvent('onLoadRequiredClass', [uri,key,layer]);
                        },function(e){
                            self._fireEvent('onLoadRequiredClassErr',  [e,layer]);
                        },null,false, threadid,
                        // dont use require's recursive
                        {stopRecursive:1, sync:true});

                        required=[];
                        if(requireDeep.length){
                            Array.prototype.push.apply(required, requireDeep);
                        }
                    }
                };
                funs.push(fetchRequired);
            }

            //inner components
            if(self.iniComponents)
                funs.push(function(tid){
                    self._createInnerModules(tid);
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
                var f=function(values){
                    if(values && xui.isHash(values)){
                        if(('values' in values) && xui.isHash(values.values)) values = values.values;
                        self.setValue(values, true);
                    }
                }, values = self._fireEvent('onInitValues',[f]);
                if(values) f(values);
            });
            funs.push(function(threadid){
                self.created=true;
                xui.tryF(onEnd,[null, self, threadid], self);
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
        _createInnerModules:function(tid){
            var self=this;
            if(self.destroyed || self._recursived || self._innerModulesCreated)
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
                if(o['xui.Module']){
                  // o._createInnerModules(tid);
                  o.create(function(){}, tid);
                }
            });
            // attach destroy to the first UI control
            var autoDestroy = self.autoDestroy || self.properties.autoDestroy;
            if(autoDestroy)
                xui.arr.each(self._nodes,function(o){
                    if(o.box && o.box["xui.UI"] && !o.box["xui.UI.ModulePlaceHolder"] && !o.box.$initRootHidden){
                        (o.$afterDestroy=(o.$afterDestroy||{}))["moduleDestroyTrigger"]=function(ignoreEffects, purgeNow){
                            if(autoDestroy && !self.destroyed && !self.$ignoreAutoDestroy)
                                self.destroy(ignoreEffects, purgeNow);
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

        // calculate the profileTo's formula, and apply to it
        applyExcelFormula:function(profileTo){
            var ns=this,
                xformula = xui.ExcelFormula,
                formula = profileTo && profileTo.properties.excelCellFormula,
                colMax,rowMax,
                cellsMap={},
                cell2alias = {}, alias2cell={};
            if(formula){
                xui.each(this._alias_pool, function(prf){
                    var p = prf.properties,t;
                    if((t=p.excelCellId) && /^\s*[a-zA-Z]+[\d]+\s*$/.test(t)){
                        cell2alias[t]=prf.alias;
                        alias2cell[prf.alias]=t;
                        t = xformula.toCoordinate(t,0);
                        colMax=Math.max(colMax, t[0]);
                        rowMax=Math.max(rowMax, t[1]);
                    }
                });
                var refs = xformula.getRefCells(formula,colMax,rowMax)
                if(!refs)return ;
                xui.each(cell2alias,function(o, i){
                    if( i in refs){
                        if(!(i in cellsMap)){
                            cellsMap[i] = ns[o].getExcelCellValue();
                        }
                    }
                });
                profileTo.boxing()._applyExcelFormula(cellsMap);
            }
            return ns;
        },
        // calculate all profiles' (or profileFrom's)  formula, and apply to them(it)
        triggerExcelFormulas:function(profileFrom){
            var ns=this,
                formulaCells = {}, cell2alias = {}, alias2cell={},
                xformula = xui.ExcelFormula,
                rowMax = 0, colMax = 0,
                cellId = profileFrom && profileFrom.alias;
            //1. collection all formula cells
            xui.each(this._alias_pool, function(prf){
                var p = prf.properties,t;
                if(t=p.excelCellFormula){
                    formulaCells[prf.alias]=[prf,t];
                }
                if((t=p.excelCellId) && /^\s*[a-zA-Z]+[\d]+\s*$/.test(t)){
                    t.replace(/\s/g,'');
                    cell2alias[t]=prf.alias;
                    alias2cell[prf.alias]=t;
                    t = xformula.toCoordinate(t,0);
                    colMax=Math.max(colMax, t.col);
                    rowMax=Math.max(rowMax, t.row);
                }
            });
            // if input cell, must remove itself;
            if(cellId)delete formulaCells[cellId];
            if(xui.isEmpty(formulaCells))return;

            //2. collect refs for formulaCells
            var refs={};
            xui.each(formulaCells,function(a, alias,hash,hash1){
                 if(hash = xformula.getRefCells(a[1],colMax,rowMax)){
                     hash1={};
                     xui.each(hash,function(o,i){
                         hash1[cell2alias[i]] = o;
                     });
                     refs[alias]=hash1;
                 }
            });
            //3. loop to calculate non-ref cells
            var count, noFormulaRef, cellsMap={}, coo,
                changed={}, needRec;
            if(cellId){
                changed[cellId]=1;
            }
            do{
                count=0;
                xui.filter(refs,function(v,alias){
                    needRec=0;
                    if(!cellId)needRec=1;
                    else{
                        for(var i in v){
                            if(i in changed){
                                needRec=1;
                                break;
                            }
                        }
                    }
                    // no need to re-calculate
                    if(!needRec){
                        return false;
                    }

                    noFormulaRef=true;
                     for(var i in v){
                        if(!cellId && (i in formulaCells)){
                            noFormulaRef=false;
                        }else{
                            if(!(alias2cell[i] in cellsMap)){
                                cellsMap[alias2cell[i]] = ns[i].getExcelCellValue();
                            }
                        }
                     }
                     if(noFormulaRef){
                        // update value
                        ns[alias]._applyExcelFormula(cellsMap);
                        if(cellId)changed[alias]=1;
                        // remove from formulaCells
                        delete formulaCells[alias];
                        count++;
                        return false;
                     }
                });
            }
            // Avoid circular references
            while(!xui.isEmpty(formulaCells) && count>0);
            return ns;
        },

        getProfile:function(){
            if(!this._innerModulesCreated)this._createInnerModules();

            var hash={},t;
            xui.each(this._alias_pool, function(prf){
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

             xui.each(this._alias_pool, function(prf,i){
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
        getPropBinderKeys:function(scope_set, scope_clear){
            if(!this._innerModulesCreated)this._createInnerModules();

            scope_set=scope_set || xui._scope_set;
            scope_clear=scope_clear || xui._scope_clear;

            // collect keys
            var hash={};
            try{
                scope_set.call(this);
                xui.each(this._alias_pool, function(prf){
                    var prop=prf.properties;
                    if(prop.propBinder)
                        xui.each(prop.propBinder,function(fun,key){
                            if(key in prop){
                                if(xui.isFun(fun))fun();
                            }
                        });
                });
            }catch(e){}finally{
                scope_clear.call(this);
            }

            xui.each(hash, function(v,k){
                hash[k] = xui.toArr(v, true);
            });
            return hash;
        },
        reBindProp:function(dataMap, scope_set, scope_clear){
            if(!this._innerModulesCreated)this._createInnerModules();
            scope_set=scope_set || xui._scope_set;
            scope_clear=scope_clear || xui._scope_clear;

            try{
                scope_set.call(this, dataMap);
                 xui.each(this._alias_pool, function(prf){
                    prf.boxing().reBindProp(dataMap,scope_set,scope_clear, true);
                });
            }catch(e){
                scope_clear.call(this);
            }
        },
        getData:function(withValue){
            if(!this._innerModulesCreated)this._createInnerModules();

            var hash={};
             xui.each(this._alias_pool, function(prf){
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

             xui.each(this._alias_pool, function(prf){
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
                 xui.each(this._alias_pool, function(prf){
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
                     xui.each(this._alias_pool, function(prf){
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
                 xui.each(this._alias_pool, function(prf){
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
                     xui.each(this._alias_pool, function(prf){
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
                xui.each(this._alias_pool, function(prf){
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
                xui.each(this._alias_pool, function(prf){
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
                xui.each(this._alias_pool, function(prf){
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

                  xui.each(this._alias_pool, function(prf){
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

            var nodes = xui.copy(this._alias_pool),t,k='xui.absContainer';
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
                        xui.each(m._alias_pool,function(o){
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
        // flag:true => without $initRootHidden UI widgets
        // flag:false => $initRootHidden UI widgets only
        // no flag: all
        getUIComponents:function(flag){
            var nodes = this.getComponents().get(),
                k='xui.UI', n='$initRootHidden';
            xui.filter(nodes,function(o){
                return !!((o && o.box &&o.box[k]) && (flag===true?!o.box[n]:flag===false?o.box[n]:true));
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
                o.boxing().setHost(self, o.alias, o.ref);
                self._nodes.push(o);
                xui.Module.$attachModuleInfo(self,o);
            });
            return self;
        },
        isDestroyed:function(){
            return !!this.destroyed;
        },
        destroy:function(ignoreEffects, purgeNow, keepStructure){
            var self=this,con=self.constructor,ns=self._nodes;
            if(self.destroyed)return;

            self._fireEvent('onHide', ['destroy']);
            self._fireEvent('onDestroy');
            if(self.alias && self.host && self.host[self.alias]){
                try{if(self.alias in self.host)delete self.host[self.alias];}catch(e){self.host[self.alias]=void(0)}
                if(self.host._alias_pool && (self.alias in self.host._alias_pool))delete self.host._alias_pool[self.alias];
            }
            if(self.ref && self.host && self.host[self.ref]){
                try{if(self.ref in self.host)delete self.host[self.ref];}catch(e){self.host[self.ref]=void(0)}
                if(self.host._ref_pool && (self.ref in self.host._ref_pool))delete self.host._ref_pool[self.ref];
            }

            //set once
            self.destroyed=true;
            //disable autoDestroy
            self.autoDestroy=self.properties.autoDestroy=false;
            if(ns && ns.length)
                xui.arr.each(ns, function(o){
                    if(o && o.box)
                        o.boxing().destroy(ignoreEffects, purgeNow);
                },null,true);

            if(ns && ns.length)
                self._nodes.length=0;

            xui.absProfile.prototype.__gc.call(this);

            self.unLinkAll();

            if(!keepStructure){
                xui.breakO(self);
            }else{
                // for refresh itself
                delete self.renderId;
                delete self.renderCompleted;
                delete self.created;
                delete self._innerModulesCreated;
            }
            //afterDestroy
            if(self.$afterDestroy){
                xui.each(self.$afterDestroy,function(f){
                    xui.tryF(f,[ignoreEffects, purgeNow],self);
                });
                xui.breakO(self.$afterDestroy,2);
            }
            //set again
            self.destroyed=true;
        },
        applyPseudo:function(funConf, args, scope){
            var ns=this;
            if(xui.isStr(funConf))funConf=ns.functions&&ns.functions[funConf];
            return xui.isObj(funConf) ? xui.pseudocode._callFunctions(funConf, args||[], scope||this) : null;
        }
    },
    Static:{
        // fake absValue
        "xui.absValue":true,
        refresh:function(code){
            var m=this,keep={
                    '$children':m.$children,
                    _cache:m._cache,
                    _nameId:m._nameId,
                    _refId:m._refId
                },
                key=m.KEY,
                path=key.split("."),
                n,s;
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
        pickRef:function(){
            return xui.absObj.$pickRef(this);
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
        // module: module class name
        // xid: module xid
        // xui.Module.getInstance("App.Cls1",1)
        // xui.Module.getInstance("App.Cls1","c")
        // App.Cls1.getInstance(1)
        // App.Cls1.getInstance('c')
        // App.Cls1.getInstance() == App.Cls1.getInstance(0) : get the first instance
        getInstance:function(module, xid){
            var m=this;
            if(!xid && module){
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
            }else{
                m=this;
            }
            var c=m._cache;
            if(xid){
                for(var i in m._cache)
                    if(xui.isFinite(i) ? (xid+"")==i : ('$'+xid)==i)
                        return m._cache[i];
            }else{
                return c[0];
            }
        },
        postMessage:function(cls, msg1, msg2, msg3, msg4, msg5,  msg6, msg7, msg8, msg9, sender){
           var m = xui.SC.get(cls), arr;
            if(m && m['xui.Module']){
                arr=xui.toArr(arguments);
                arr[0]=m;
                xui.arr.each(m._cache,function(o){
                     m.fireEvent('onMessage',  arr);
                });
            }
        },
        destroyAll:function(ignoreEffects, purgeNow){
            xui.arr.each(this._cache,function(o){
                if(!o.destroyed)o.destroy(ignoreEffects, purgeNow);
            });
        },
        // onEnd(err, module)
        load:function(cls, onEnd, lang, theme, showUI, parent, subId, onCreated, onDomReady){
            if(!cls){
                var e=new Error("No cls");
                xui.tryF(onEnd,[e,null]);
                throw e;
            }
            // compitable
            if(typeof theme=='function')showUI=theme;

            var applyEnv=function(setting){
                var t;

                // overwrite theme
                if((t=setting.theme)/* && !theme*/)theme=t;

                //[[ apply memory
                    // apply SpaceUnit
                    if(t=setting.SpaceUnit)xui.SpaceUnit=t;
                    // apply DefaultProp
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
                //]] apply memory

                //[[ apply dom
                   // apply zoom
                   // use setting.zoom to determine whether to call zoom or not
                   if(setting.zoom){
                        var  zoom=function(type, width, height){
                            var rw=parseInt(width,10)||800,rh=parseInt(height,10)||600;
                            if(!xui.isNumb(type)){
                                var win=xui.win, ww=win&&win.width(), wh=win&&win.height(),cl;
                                if(ww && wh){
                                    var r_w=ww/rw,r_h=wh/rh;
                                    switch(type.split('-')[0]){
                                        case 'width': type = r_w; cl='xui-css-noscrollx'; break;
                                        case 'height': type = r_h;  cl='xui-css-noscrolly'; break;
                                        case 'cover': type = Math.max(r_w,r_h);  cl='xui-css-noscroll'+(r_w>=r_h?'x':'y'); break;
                                        case 'contain': type = Math.min(r_w,r_h);  cl='xui-css-noscroll'; break;
                                    }
                                    xui('html').removeClass(/^xui-css-noscroll(x|y)?$/).addClass(cl);
                                    xui.ini.$fixFrame=1;
                                }
                            }
                            if((type=parseFloat(type)) && type!=1){
                                if(xui.ini.$fixFrame){
                                    xui('html').css({width:rw+'px',height:rh+'px'});
                                    xui.frame=xui('html');
                                }

                                // keep the scale for calculating [window]'s dimension and adjusting event's pageX/pageY
                                xui.ini.$zoomScale = type;
                                xui.Dom.$setZoom(xui('html').get(0), type);
                                // 'getBoundingClientRect' will need to adjust too
                                xui.ini.$transformScale = type;
                            }
                        };
                        if(t=xui.ini.$frame){
                            zoom(t.zoom, t.width, t.height);

                            if(!xui.isNumb(t.zoom) && /-resize$/.test(t.zoom+'')){
                                xui.win.onSize(function(){
                                    var t=xui.ini.$frame;
                                    xui.resetRun("_xui_auto_zoom", zoom, 0, [t.zoom, t.width, t.height]);
                                },"_xui_auto_zoom");
                            }
                        }
                    }
                    // apply background
                    if((t=setting.background) && xui.isHash(t)){
                        xui.each(t,function(v,k){
                            xui('html').css(k, xui.adjustRes(v));
                        });
                    }
                    // apply xui-custom
                    if((t=xui.ini.$ElementStyle) && xui.isHash(t)) xui.CSS.setStyleRules(".xui-custom",t,true);
                //]] apply dom

                 //[[ apply url
                // apply CDN font icons
                    if((t=xui.ini.$FontIconsCDN) && xui.isHash(t)){
                        // use asyn
                        xui.asyRun(function(){
                            xui.each(t,function(o,i){
                                if(o.href && !o.disabled){
                                    var attr={crossorigin:'anonymous'};
                                    xui.merge(attr, o, function(v,j){return j!=='href' && j!=='disabled'});
                                    xui.CSS.includeLink(xui.adjustRes(o.href), 'xui_app_fscdn-'+i, false,attr);
                                }
                            });
                        },20);
                    }
                //]] apply url
            },
            createModule=function(path){
                var clsObj=this, t, setting={},
                    showModule=function(i,l,flag){
                        if(!xui.isFun(clsObj)){
                            var e=new Error( "'"+cls+"' is not a constructor");
                            xui.tryF(onEnd,[e,null]);
                            throw e;
                        }else{
                            var o=new clsObj();
                            // record it
                            clsObj._callfrom=cls;

                            xui.set(xui.ModuleFactory,["_cache",cls],o);

                            if(onCreated)xui.tryF(onCreated, [o]);

                            if(showUI!==false)o.show(onEnd, parent, subId);
                            else xui.tryF(onEnd,[null,o], o);
                        }
                    };
                //if successes
                if(path){
                    //[[ collect setting (background, spaceunit, view size,  view zoom ...
                    // for non-project
                    if((t=this.designViewConf) && xui.isHash(t)) xui.merge(setting, t);
                    if((t=this.viewStyles) && xui.isHash(t)){
                        xui.each(t,function(o,i){
                            if(/^background/.test(i)) (setting.background||(setting.background={}))[i]=o;
                            else setting[i]=o;
                        });
                    }
                    //]] collect setting

                    // for zoom
                    if(setting.zoom)xui.set(xui.ini, ['$frame','zoom'], setting.zoom);
                    if(setting.width)xui.set(xui.ini, ['$frame','width'], setting.width);
                    if(setting.height)xui.set(xui.ini, ['$frame','height'], setting.height);

                    if(!xui.isEmpty(setting)) applyEnv(setting);

                    // If theme is not 'default', apply theme frist
                    if(theme&&theme!="default"){
                        xui.setTheme(theme,true,function(){
                            xui.setLang(lang||'en', showModule);
                        },function(){
                            xui.alert("Can't load theme - " + theme);
                            xui.setLang(lang||'en', showModule);
                        });
                    }else{
                        xui.setLang(lang||'en', showModule);
                    }
                }else{
                    var e=new Error("No class name");
                    xui.tryF(onEnd,[e,null]);
                    throw e;
                }
            },
            domReady=function(){
                if(onDomReady)xui.tryF(onDomReady);

                var t, setting={};
                //[[ collect setting (background, spaceunit, view size,  view zoom ...
                // for project
                if((t=xui.ini.$DevEnv) && xui.isHash(t)){
                    if(t.SpaceUnit)setting.SpaceUnit=t.SpaceUnit;
                    if(t=t.designViewConf)xui.merge(setting, t, 'all');
                }
                if((t=xui.ini.$PageAppearance) && xui.isHash(t)){
                    xui.merge(setting, t, 'all');
                }
                //]] collect setting

                // for zoom
                if(setting.zoom)xui.set(xui.ini, ['$frame','zoom'], setting.zoom);
                if(setting.width)xui.set(xui.ini, ['$frame','width'], setting.width);
                if(setting.height)xui.set(xui.ini, ['$frame','height'], setting.height);

                if(!xui.isEmpty(setting)) applyEnv(setting);

                if(typeof(cls)=='function'&&cls.$xui$)createModule.apply(['ok'],cls);
                else cls=cls+"";
                if(/\//.test(cls) && !/\.js$/i.test(cls))
                    cls=cls+".js";
                if(/\.js$/i.test(cls)){
                    xui.fetchClass(cls,createModule,
                        function(e){
                            xui.tryF(onEnd,[e,null]);
                        });
                }else{
                    //get app class
                    xui.SC(cls,createModule,true,null,{
                        retry:0,
                        onFail:function(e){
                            xui.tryF(onEnd,[e,null]);
                        }
                    });
                }
            };

            if(xui.isDomReady) domReady(); else xui.main(domReady);
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
            onHookKey:function(module, key, keyDown, e, src){},
            onFragmentChanged:function(module, fragment, init, newAdd){},
            onMessage:function(module, msg1, msg2, msg3, msg4, msg5,  msg6, msg7, msg8, msg9, source){},
            onGlobalMessage:function(id, msg1, msg2, msg3, msg4, msg5,  msg6, msg7, msg8, msg9, source){},
            beforeCreated:function(module, threadid){},
            beforeShow:function(module, threadid){},
            onShow:function(module, threadid){},
            afterShow:function(module, threadid){},
            onLoadRequiredCSS:function(module, threadid, uri, index, layer){},
            onLoadRequiredClass:function(module, threadid, uri, key, layer){},
            onLoadRequiredClassErr:function(module, threadid, error, layer){},
            onIniResource:function(module, threadid){},
            beforeIniComponents:function(module, threadid){},
            afterIniComponents:function(module, threadid){},
            onModulePropChange:function(module, threadid, prop){},
            onReady:function(module, threadid){},
            onInitValues:function(module, threadid, callback){},
            onRender:function(module, threadid){},
            onHide:function(module, type){},
            onDestroy:function(module){}
        }
    }
});