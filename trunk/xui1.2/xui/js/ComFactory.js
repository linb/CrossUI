Class('xui.ComFactory',null,{
    Initialize:function(){
        var ns=this;
        xui.getCom=function(cls, onEnd, threadid, cached, properties, events){
            return ns.getCom.apply(ns,arguments)
        };
        xui.newCom=function(cls, onEnd, threadid, properties, events){
            return ns.newCom.apply(ns,arguments)
        };
        xui.showCom=function(cls, beforeShow, onEnd, threadid, cached, properties, events, parent, subId, left, top){
            return ns.getCom(cls, function(err, threadid, com){
                if(!err && false!==_.tryF(beforeShow, [threadid, com], com)){
                    this.show.apply(com, [onEnd,parent,subId,threadid,left,top]);
                }else{
                    _.tryF(onEnd, [err, threadid, com], com);
                }
            }, threadid, cached, properties, events);
        };
    },
    Static:{
        _pro:{},
        _cache:{},
        _domId:'xui:ComFactory:',
        getProfile:function(key){
            return key?this._pro[key]:this._pro;
        },
        setProfile:function(key, value){
            if(typeof key=='string')
                this._pro[key]=value;
            else
                this._pro=key;
            return this;
        },
        destroyAll:function(){
            _.each(this._cache,function(o){
                _.tryF(o.destroy,[],o);
            });
            this._cache={};
        },
        broadcast:function(fun){
            if(typeof fun=='function'){
                var i,c=this._cache;
                for(i in c)
                    fun.call(c[i],i);
            }
        },

        setCom:function(id, obj){
            this._cache[id]=obj;
            if(obj)obj.comRefId=id;
            return this;
        },
        getComFromCache:function(id){
            return this._cache[id]||null;
        },
        //cached:false->don't get it from cache, and don't cache the result.
        getCom:function(id, onEnd, threadid, cached, properties, events){
            if(!id){
                var e=new Error("No id");
                _.tryF(onEnd,[e,threadid,null]);
                if(threadid&&xui.Thread.isAlive(threadid))xui.Thread(threadid).abort();
                throw e;
                return;
            }
            cached=cached!==false;
            var c=this._cache,
                p=this._pro,
                config,
                clsPath;

            if(cached && c[id] && !c[id].destroyed){
                _.tryF(onEnd, [null,threadid,c[id]], c[id]);
                return c[id];
            }else{
                // if no configure
                if(!(config=p[id])){
                    config={
                        cls:id,
                        cached:cached,
                        properties:properties,
                        events:events
                    };
                    clsPath=id;
                }else
                    clsPath=config.cls || config;

                var self=arguments.callee, 
                    me=this,
                    task=function(cls,config,threadid){
                        if(!_.isFun(cls))
                            throw new Error("'"+clsPath+"' is not a constructor");
                        var o = new cls();

                        if(config.properties)
                            _.merge(o.properties,config.properties,'all');
                        if(config.events)
                            _.merge(o.events,config.events,'all');
                        if(config.cached!==false)
                            xui.ComFactory.setCom(id, o);

                        var args = [function(err,threadid,com){
                            var arr = com.getUIComponents().get(),
                                fun=function(arr,subcfg,firstlayer){
                                    var self1 = arguments.callee;
                                    _.arr.each(arr,function(v,i){
                                        //if tag exists, replace tag with com from xui.ComFactory
                                        if(v.key=='xui.UI.Tag'){
                                            var tag=v, cid=tag.properties.tagKey;

                                            if(cid && subcfg && subcfg[cid])
                                                self.apply(me, [subcfg[cid], function(){
                                                    //set link to parent com(xui.Com)
                                                    com[cid]=this;
                                                    //set com parent
                                                    this.parent=com;

                                                    //replace tag with this
                                                    var ui = this.getUIComponents(), root;
                                                    // no UI in this com
                                                    if(!(root=ui.get(0)))return;

                                                    xui.UI.Tag.replace(tag,root,firstlayer?com:null);
                                                },threadid]);
                                        }
                                        if(v.children){
                                            var a=[];
                                            _.arr.each(v.children,function(o){
                                                a[a.length]=o[0];
                                            });
                                            self1(a, subcfg);
                                        }
                                    });
                                };
                            //handle tag sub from com
                            fun(arr,config.children,1);
                        }];
                        args.push(threadid||null);

                        //insert first
                        if(onEnd)
                            xui.Thread(threadid).insert({
                                task:onEnd,
                                // have to add [null] to block the extra threadid added by xui.Thread
                                args:[null,threadid,o],
                                scope:o
                            });
                        //latter
                        _.tryF(o[config.iniMethod ||'create'], args, o);
                    };
                xui.Thread.observableRun(function(threadid){
                    var f=function(a,b,threadid){
                        var cls;
                        if(cls=xui.SC.get(clsPath)){
                            xui.Thread(threadid).insert({
                                task:task,
                                args:[cls, config,threadid]
                            });
                        }else{
                            var e=new Error("Variable not found (maybe SyntaxError) - " + clsPath);
                            _.tryF(onEnd,[e,threadid,null]);
                            if(threadid&&xui.Thread.isAlive(threadid))xui.Thread(threadid).abort();
                            throw e;
                        }
                    };
                    xui.SC(clsPath, function(path){
                        if(path)
                            f(0,0,threadid);
                        else{
                            var e=new Error("No class name");
                            _.tryF(onEnd,[e, threadid,null]);
                            if(threadid&&xui.Thread.isAlive(threadid))xui.Thread(threadid).abort();
                            throw e;
                        }
                    }, true,threadid,{
                        retry:0,
                        onFail:function(e){
                            _.tryF(onEnd,[e,threadid,null]);
                        }
                    });
                },null,threadid);
            }
        },
        newCom:function(cls, onEnd, threadid, properties, events){
            return this.getCom(cls, onEnd, threadid, false, properties, events);
        },
        storeCom:function(id){
            var m,t,c=this._cache,domId=this._domId;
            if(t=c[id]){
                if(!(m=xui.Dom.byId(domId)))
                    //using display:none here for performance, when appendchild, it'll not trigger layout etc.
                    xui('body').prepend(xui.create('<div id="'+domId+'" style="display:none;"></div>'));
                m=xui(domId);
                t=t.getUIComponents();
                if(!t.isEmpty()){
                    //detach
                    t.get(0).unlinkParent();
                    //move to hide
                    m.append(t);
                }
            }
        },
        prepareComs:function(arr){
            var self=this,funs=[];
            _.arr.each(arr, function(i){
                funs.push(function(){
                    self.getCom(i);
                });
            });
            xui.Thread(null, funs, 500).start();
            return this;
        }
    }
});