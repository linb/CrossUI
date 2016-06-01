Class('xui.UIProfile','xui.Profile', {
    Instance:{
        //readonly please
        renderId:null,
        _render:function(){
            var ns=this,ins=ns.boxing(),t,map=xui.$cache.profileMap;

            if(ns.beforeRender&&false===ins.beforeRender(ns))
                return;

            //first render
            if(!ns.renderId){
                var ele=xui.Dom.byId(ns.$domId);

                //for dynRender
                if(!ele)return;

                if(ns.domId!=ns.$domId)
                    ele.id=ns.domId;

                map[ns.domId] = map[ns.$domId] = ns;

                //e.g. use div.innerHTML = ui.toHtml();
                if(!ele.$xid)
                    xui.UI.$addEventsHanlder(ns,ele, true);

                // for svg widget
                if(ns._elset){
                    for(var i=1,l=ns._elset.length;i<l;i++)
                        xui.UI.$addEventsHanlder(ns,ns._elset[i].node, true);
                }

                // unselectable="on" will kill onBlur
                if(xui.browser.ie && xui.browser.ver<10 && 'selectable' in ns.properties)
                    xui.setNodeData(ele,"_onxuisel",ns.properties.selectable?"true":"false");

                ns.rendered=ns.renderId=ele.$xid;

                ele=null;
            }
            
            if(ns.CA&&!_.isEmpty(ns.CA)){
                ins.setCustomAttr(ns.CA);
            }
            if(ns.CS&&!_.isEmpty(ns.CS)){
                ins.setCustomStyle(ns.CS);
            }

            // For touch-only platform
            // In ipad or other touch-only platform, you have to decide the droppable order by youself
            // The later added to DOM the higher the priority
            // Add droppable links
            if(xui.browser.isTouch){
                if((t=ns.box.$Behaviors.DroppableKeys) && t.length){
                    _.arr.each(t,function(o){
                        ins.getSubNode(o,true).each(function(node){
                            var key=ns.box.getDropKeys(ns,node.$xid);
                            if(key){
                                var c=xui.$cache.droppable,a=key.split(/[^\w-]+/);
                                for(var i=0,l=a.length;i<l;i++){
                                    c[a[i]]=c[a[i]]||[];
                                    c[a[i]].push(node.$xid);
                                }
                            }
                        });
                    });
                }
            }
            
            if(xui.browser.isTouch && (xui.browser.isAndroid||xui.browser.isBB)){
                var check={'auto':1,'scroll':1};
                // for UI's appearances overflow
                _.each(ns.box.$Appearances,function(o,i){
                    if(check[o.overflow]){
                        ns.getSubNode(i,true).$touchscroll('xy');
                    }else{
                        if(check[o['overflow-x']]){
                            ns.getSubNode(i,true).$touchscroll('x');
                        }else if(check[o['overflow-y']]){
                            ns.getSubNode(i,true).$touchscroll('y');
                        }
                    }
                });
                // for UI's overflow property
                if(check[ns.properties.overflow]){
                    ins.setOverflow(ns.properties.overflow,true);
                }
            }

            //RenderTrigger
            if(t=ns.RenderTrigger){
                for(var i=0,l=t.length;i<l;i++)
                    t[i].call(ns);
                delete ns.RenderTrigger;
            }
            
            if(ns.onRender)
                ins.onRender(ns);
            _.tryF(ns.$onrender,[],ns);

            if(arguments[0]===true && (t=ns.LayoutTrigger)){
                for(var i=0,l=t.length;i<l;i++)
                    t[i].call(ns);
                if(ns.onLayout)
                    ins.onLayout(ns);
            }
            if(!ns.properties.lazyAppend){
                if(ns.children)
                    for(var i=0,v;v=ns.children[i++];)
                        if(v[0]._render)
                            v[0]._render(true);

                if(ns.$attached){
                    for(var i=0,v;v=ns.$attached[i++];)
                        if(v._render)
                            v._render(true);
                    delete ns.$attached;
                }
                if(ns.exchildren){
                    var arr=[];
                    for(var i=0,v;v=ns.exchildren[i++];)
                        ins.append(v[0],v[1]);
                    delete ns.exchildren;
                }
                if(ns.exmodules){
                    var arr=[];
                    for(var i=0,v;v=ns.exmodules[i++];)
                        v[0].show(null, ins, v[1], false);
                    delete ns.exmodules;
                }
            }
            
            ns.renderCompleted=1;
        },
        __gc:function(){
            var ns=this, t;
            if(ns.destroyed)return;
            if(ns.$beforeDestroy){
                _.each(ns.$beforeDestroy,function(f){
                    _.tryF(f,[],ns);
                });
                _.breakO(ns.$beforeDestroy,2);
            }
            _.tryF(ns.$ondestory,[],ns);
            if(ns.onDestroy)ns.boxing().onDestroy();
            if(ns.destroyTrigger)ns.destroyTrigger();

            //gc already
            if(!ns.serialId)return;
            if(t=ns._$composed)
                _.each(t,function(v){
                    v.__gc();
                });

            //clear cache things
            ns.clearCache();

            //for refresh function
            if(!ns.$noReclaim){
                //restore dom id
                t=xui.$cache.reclaimId;
                (t[ns.key] || (t[ns.key]=[])).push(ns.serialId);
            }else delete ns.$noReclaim

            //clear cache point
            delete xui.$cache.profileMap[ns.domId];
            delete xui.$cache.profileMap[ns.$domId];
            if(ns.box)
                delete ns.box._namePool[ns.alias];

            // try to clear parent host
            var o;
            if(ns.alias && ns.host && (o=ns.host[ns.alias]) && (o=o._nodes) && o.length===1){
                delete ns.host[ns.alias];
            }

            //clear anti link
            ns.unLinkAll();

            if(ns.LayoutTrigger)
                ns.LayoutTrigger.length=0;
            if(ns.RenderTrigger)
                ns.RenderTrigger.length=0;

            //gc children
            if((t=ns.children).length){
                t=_.copy(t);
                for(var i=0;i<t.length;i++){
                    t[i][0].__gc();
                    t[i].length=0;
                }
                t.length=0;
            }

            //set once
            ns.destroyed=true;
            //afterDestroy
            if(ns.$afterDestroy){
                _.each(ns.$afterDestroy,function(f){
                    _.tryF(f,[],ns);
                });
                _.breakO(ns.$afterDestroy,2);
            }
            if(ns.afterDestroy)ns.boxing().afterDestroy(ns);
            _.breakO([ns.properties,ns.events, ns.CF, ns.CB, ns.CC, ns.CA, ns.CS, ns],2);
            //set again
            ns.destroy=function(){};
            ns.destroyed=true;
        },
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
        getRootNode:function(){
            return xui.getNodeData(this.renderId, 'element');
        },
        getRoot:function(){
            return xui(this.renderId?[this.renderId]:[],false);
        },
        getContainer:function(subId){
            if(subId!==true&&(subId=typeof subId=='string'?subId:null))subId=this.getSubIdByItemId(subId);
            return this.box._CONTAINERKEY?this.getSubNodes(this.box._CONTAINERKEY, subId):this.keys.PANEL?this.getSubNodes(this.keys.PANEL, subId):this.getRoot();
        },
        _cacheR1:/^\w[\w_-]*$/,
        setDomId:function(id){
            var t=this, c=xui.$cache.profileMap;
            //ensure the value
            if(typeof id== 'string' && (t._cacheR1.test(id)||id==t.$domId) && !xui.Dom.byId(id)){
                //delete the original one
                if(t.domId!=t.$domId)delete c[t.domId];
                //set profile's domId
                t.domId=id;

                //change the dom Node id value
                if(t.renderId)
                    t.getRootNode().id=id;

                //if doesn't create yet, don't set it to xui.$cache:
                if(c[t.$domId])c[id]=t;
            }
            return t;
        },
        getDomId:function(){
            return this.domId;
        },
        clearCache:function(){
            var ns=this,
                t=ns.$_egetter;
            for(var i in t){
                t[i].length=0;
                delete t[i];
            }

            t=ns.$_domid;
            for(var i in t){
                 t[i].__gc();
                 delete t[i];
            }

            return ns;
        },
        //get events function from profile
        _getEV:function(funs,id, name){
            var self=this,
                $k = id+"+"+name,
                g = self.$_egetter ||(self.$_egetter={}),
                cache;
            if(g[$k]){
                Array.prototype.push.apply(funs,g[$k]);
                return;
            }else cache=g[$k]=[];

            var dom=xui.$cache.profileMap,t,key;
            //for event attached on dom node
            if( (t=dom[id]) && (t=t.events) && (t=t[name]) )
                for(var i=0,l=t.length;i<l;i++)
                    if(typeof t[t[i]]=='function')
                        cache.push(funs[funs.length]=t[t[i]]);

            //for event attached on xui widgets
            //get event function path of cache
            key = id.split(":")[0].split("-")[1];

            //for priority intercept
            if(typeof (((t=self._CB) && (key?(t=t[key]):1)) && (t=t[name]))=='function')
                cache.push(funs[funs.length]=t);
            else{
                //get event function from customBehavior first
                if(typeof (((t=self.CB) && (key?(t=t[key]):1)) && (t=t[name]))=='function')
                    cache.push(funs[funs.length]=t);
                else{
                    //get event function from public behavior
                    if(typeof (((t=self.behavior) && (key?(t=t[key]):1)) && (t=t[name]))=='function')
                        cache.push(funs[funs.length]=t);
                }
            }
        },
        _cacheR2:/<!--\x03([^>^\s]*)\x04-->/g,
        toHtml:function(force){
            var self=this,
                prop=self.properties,
                c = self.box,
                h={},
                str,
                k1='xui.UIProfile',
                k2='xui.Module',
                id, i, l, o, m, a, b, data;
            if(self.destroyed)return "";

            // create first
            if(c['xui.svg']){
                c._RenderSVG(self);
                return "";
            }else{
                //before _dynamicTemplate
                data=c._prepareData(self);
                if(c._dynamicTemplate)c._dynamicTemplate(self);
                str = c._build(self, data);
    
                if((!prop.lazyAppend||force) && (m=self.children)){
                    for(i=0, l=m.length; i<l; i++){
                        o=m[i];
                        if(o&&o[0]){
                            if(o[0][k2]){
                                var mh=new xui.UI.MoudluePlaceHolder({
                                    host:o[0].host,
                                    alias:o[0].alias
                                });
                                mh.get(0)._module = o[0];
                                o[0] = mh.get(0);
                            }
                            if(o[0][k1]){
                                id=o[1]||'';
                                a=h[id]||(h[id]=[]);
                                a[a.length]=o[0].toHtml(force);
                            }
                        }
                    }
                }
    
                return str.replace(self._cacheR2, function(a,b){
                    return h[b]?h[b].join(''):'';
                });
            }
        },
        _buildItems:function(key, items, addEventHandler){
            var ns=this,
                box=ns.box,
                str=box._rpt(ns, xui.UI.$doTemplate(ns, _.get(xui.$cache.template,[box.KEY, ns._hash]), items, key)),
                nodes = xui.UI.$toDom(ns, str.replace(ns._cacheR2,''), addEventHandler);
            if(ns.CA&&!_.isEmpty(ns.CA)){
                ns.boxing().setCustomAttr(ns.CA,undefined,nodes);
            }
            // set custom styles for the given nodes only
            if(ns.CS&&!_.isEmpty(ns.CS)){
                ns.boxing().setCustomStyle(ns.CS,undefined,nodes);
            }
            return nodes;
        },
        serialize:function(rtnString, keepHost, children){
            var t,m,moduleHash={},
                self=this,
                o=(t=self.box._beforeSerialized)?t(self):self,
                r={
                    alias:o.alias,
                    key:o.key,
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
            if(typeof o.theme=="string")
              r.theme=o.theme;

            //domId
            if(o.$domId!=o.domId)r.domId=o.domId;

            //properties
            var c={}, p=o.box.$DataStruct, map=xui.absObj.$specialChars;
            _.merge(c,o.properties, function(o,i){return (i in p) &&  p[i]!==o && !map[i.charAt(0)]});
            if(!_.isEmpty(c))r.properties=c;

            //events
            if(!_.isEmpty(t=this.getEvents()))r.events=t;
            var eh = o.box.$EventHandlers;
            _.filter(r.events, function(o,i){
                return o!=eh[i];
            });
            if(_.isEmpty(r.events))delete r.events;

            if(!_.isEmpty(o.CB)) r.CB=_.copy(o.CB);
            if(!_.isEmpty(o.CC)) r.CC=_.copy(o.CC);
            if(!_.isEmpty(o.CF)) r.CF=_.copy(o.CF);
            if(!_.isEmpty(o.CS)) r.CS=_.clone(o.CS,function(o,i){return !((i+"").charAt(0)=="$"&&!o)});
            if(!_.isEmpty(o.CA)) r.CA=_.copy(o.CA);
            if(typeof o.theme == "string") r.theme=o.theme;

            //children
            if(false!==children && o.children && o.children.length){
                if(o.box.KEY!="xui.UI.SVGPaper"){
                    _.arr.stableSort(o.children,function(x,y){
                        x=(x[0].properties.tabindex||0);y=(y[0].properties.tabindex||0);
                        return x>y?1:x==y?0:-1;
                    });
                }
                t=r.children=[];
                _.arr.each(o.children,function(v,w,y,z){
                    w=v[0];
                    if(w.moduleClass && w.moduleXid && (y=xui.SC.get(w.moduleClass)) && (y=y.getInstance(w.moduleXid)) && y["xui.Module"]){
                        if(moduleHash[z=w.moduleClass+"["+w.moduleXid+"]"]){
                            return;
                        }else{
                            moduleHash[z]=1;
                            w=y;
                        }
                    }
                    m=[w.serialize(false, keepHost)];
                    if(v[1])m[1]=v[1];
                    t[t.length]=m
                });
            }
            if(false!==children && o.exchildren && o.exchildren.length){
                r.exchildren=o.exchildren;
            }
            moduleHash=null;
            return rtnString===false?r:_.serialize(r);
        },
        _applySetAction:function(fun, value, ovalue){
            if(this.renderId)
                return fun.call(this, value, ovalue);
        },
        getKey:function(id,tagOnly){
            var t;
            if(id.charAt(0)=='!')id=xui.use(id).id();
            if(id.indexOf(':')==-1)id=(t=xui.$cache.profileMap[id])&&(t.$domId);
            if(id){
                id=id.split(":")[0];
                if(tagOnly)id=id.split('-')[1]||"KEY";
            }
            return id||"";
        },
        getSubId:function(id){
            var t;
            if(id.charAt(0)=='!')id=xui.use(id).id();
            if(id.indexOf(':')==-1)id=(t=xui.$cache.profileMap[id])&&(t.$domId);
            return id?id.split(":")[2]:"";
        },
        pickSubId:function(key){
            var self=this, r,o = self.cache_subid || (self.cache_subid={});
            if((o[key] || (o[key]=[]))[0])return o[key].shift();
            o = self.subId || (self.subId={});
            r=(o[key] || (o[key]=new _.id)).next();
            return r;
        },
        reclaimSubId:function(id, key){
            var o = this.cache_subid || (this.cache_subid={});
            (o[key] || (o[key]=[])).push(id);
        },
        /*
        *('KEY','-mouseover',false);
        */
        _cacheR3:/\./g,
        _cacheH1:{},
        getClass:function(key, tag){
            key=this.keys[key] || key;
            var self=this,
                hash=key+":"+(tag||'');
            return self._cacheH1[hash] || (self._cacheH1[hash]=key.replace(self._cacheR3,'-').toLowerCase().replace('xui-ui','xui') + (tag||''));
        },
        _getSubNodeId:function(key, subId, tag){
            var arr = this.$domId.split(':');
            arr[0]=key;
            arr[2]=_.isSet(subId)?(subId+""):'';
            if(tag)arr[2]+='_'+tag;
            key=arr.join(':');
            return key==this.$domId
                ? xui.$cache.profileMap[key].domId
                : key;
        },
        //flag : remove from cache
        getSubNode:function(key, subId, tag){
            var self=this;

            // destroyed already
            if(!self.renderId)return xui();

            var key=self.keys[key] || key,
                r,
                t,
                s,
                h=self.$_domid||(self.$_domid={});


            // by key only
            if(subId===true)
                //key==self.keys.KEY for domId!=$domId
                r =xui([self.renderId]).query('*', 'id', key==self.keys.KEY?self.domId:new RegExp('^'+key+':'+self.serialId +(tag?("_"+tag):"")));
            else{
                if(!_.isSet(subId) && h[key] && h[key]._nodes.length==1)return h[key];
                r = (t=xui.Dom.byId(s=self._getSubNodeId(key, subId,tag))) ? xui([t]) : ((t=self.renderId) && xui.use(t).query('*', 'id', s));
                if(!_.isSet(subId))h[key]=r;
            }
            return r;
        },
        getSubNodes:function(arr,subId,tag){
            if(!_.isDefined(subId))subId=true;
            var a=[],s1=typeof arr=='string',s2=typeof subId=='string'||subId===true||_.isNull(subId),o,v;
            if(s1){
                if(s2)
                    Array.prototype.push.apply(a,this.getSubNode(arr,subId,tag).get());
                else
                    for(var j=0;v=subId[j++];)
                        Array.prototype.push.apply(a,this.getSubNode(arr,v,tag).get());
            }else
                for(var i=0;o=arr[i++];){
                    if(s2)
                        Array.prototype.push.apply(a,this.getSubNode(o,subId,tag).get());
                    else
                        for(var j=0;v=subId[j++];)
                            Array.prototype.push.apply(a,this.getSubNode(o,v,tag).get());
                }
            return xui(a);
        },
        getSubNodeByItemId:function(key, itemId, tag){
            return (itemId=this.getSubIdByItemId(itemId)) ? this.getSubNode(key, itemId, tag) : xui();
        },
        getItemByItemId:function(itemId){
            var prf=this,t;
            if((t=prf.ItemIdMapSubSerialId) && (t=t[itemId]))
                return prf.SubSerialIdMapItem[t];
            t=prf.queryItems(prf.properties.items, function(v,k){
                return v.id==itemId;
            }, 1,1);
            return t&&t[0];
        },
        getItemByDom:function(src){
            return this.SubSerialIdMapItem && this.SubSerialIdMapItem[
                this.getSubId( typeof src=='string'
                    ? src.charAt(0)=='!'
                        ? ((src=xui.use(src).get(0))&&src.id)
                        : src
                    : src.id )
             ];
        },
        getItemIdByDom:function(src){
            var t;
            return (t=this.getItemByDom(src)) && t.id;
        },
        getSubIdByItemId:function(itemId){
            var t;
            return (t=this.ItemIdMapSubSerialId) && t[itemId];
        },
        queryItems:function(items, fun, deep, single, flag){
            var r=[],
                me=arguments.callee,
                f = me.f || (me.f = function(items, fun, deep, single, flag, r){
                    _.arr.each(items,function(o,i){
                        if(fun===true || fun.call(null, o, i, items)){
                            r.push(flag?[o,i,items]:o);
                            if(single)
                                return false;
                        }
                        if(deep && o.sub && o.sub.length)
                            f(o.sub, fun, deep, single, flag, r);
                    });
                });
            f(items, fun, deep, single, flag, r);
            return r;
        }
    },
    Static:{
        getFromDom:function(id){
            if(
                (id = (id && id.KEY=="xui.Dom")? id.get(0).id
                   : typeof id=='string' ? id.charAt(0)=='!'
                        ? ((id=xui.use(id).get(0)) && id.id)
                        :id
                    : (id && id.id)
                ) &&
                (id=xui.Event._getProfile(id)) && id['xui.UIProfile']
               )
                return id;
        }
    }
});

//UI Class
Class("xui.UI",  "xui.absObj", {
    Before:function(key, parent_key, o){
        xui.absBox.$type[key.replace("xui.UI.","").replace("xui.","")]=xui.absBox.$type[key]=key;
        return true;
    },
    After:function(){
        var self=this,me=arguments.callee,
            temp,t,k,u,c,i,j,e,w,v,b,d;

        xui.absObj.After.apply(this,arguments);

        // remove datafield for containers
        if(self.Behaviors && self.Behaviors.PanelKeys &&  self.$DataModel && self.$DataModel.dataField){
            delete self.$DataModel.dataField;
            delete self.$DataStruct.dataField;
            delete self.prototype.setDataField;
            delete self.prototype.getDataField;
        }

        self._ctrlId = new _.id();
        self._idCache=[];
        self.$cssKeys={};

        /*change keys*/
        t=self.$Keys;
        t.KEY = t.$key = self.KEY;
        self.addTemplateKeys(_.toArr(t,true));

        //Inheriates Behaviors
        v='$Behaviors';
        k={};
        if((t=self.$parent) && (e=t.length)){
            while(e--){
                b=t[e][v];
                for(i in b){
                    if(typeof b[i]=='object'){
                        if(_.isArr(b[i])){
                            u=k[i]||(k[i]=[]);
                            u.push.apply(u,b[i]);
                        }else{
                            u=k[i]||(k[i]={});
                            _.merge(u,b[i]);
                        }
                    }else
                        k[i]=b[i];
               }
            }
        }
        self[v]=k;

        //Inheriates Templates
        v='$Templates';
        k={};
        if((t=self.$parent) && (e=t[0]))
            for(i in e[v])
                if(i.charAt(0)!='$')
                    k[i]=e[v][i];
        self[v]=_.clone(k);

        //Inheriates Appearances
        v='$Appearances';
        k={};
        if((t=self.$parent) && (e=t.length))
        while(e--){
            b=t[e];
            for(i in b[v]){
                t=b[v][i];
                u=k[i]||(k[i]={});
                _.merge(u,t);
            }
        }
        self[v]=k;

        self.setTemplate(self.Templates);
        delete self.Templates;

        self.setBehavior(self.Behaviors||{});
        delete self.Behaviors;

        self.setAppearance(self.Appearances);
        delete self.Appearances;

        if(t=self.PublicAppearance){
            xui.UI.$cache_css += self.buildCSSText(t);
            delete self.PublicAppearance;
        }
    },
    Instance:{
        hoverPop : function(node, type, beforePop, beforeHide, parent, groupid){
            var prf=this.get(0),source=prf.boxing();
            if(!prf.box.$EventHandlers.beforeHoverEffect){
                source.getRoot().hoverPop(node, type, beforePop,beforeHide, parent, groupid);
                return this;
            }
            node=xui(node);
            if(!_.isDefined(type))type='outer';
            var aysid=groupid||(source.getRoot().xid()+":"+node.xid());
            source.each(function(o){
                o.$beforeHover=type===null?null:function(prf, item, e, src, mtype){
                    if(e.$force)return;
                    if(mtype=='mouseover'){
                        _.resetRun(aysid,null);
                        var ignore=xui.getData([aysid,'$ui.hover.pop'])
                                        && xui.getNodeData(node.get(0)||"empty",'$ui.hover.parent')==src;
                        if(!ignore){
                            xui.setData([aysid,'$ui.hover.pop'],item);
                            xui.setNodeData(node.get(0)||"empty",'$ui.hover.parent',src);
                            if(!beforePop || false!==beforePop(prf, node, e, src, item)){
                                node.popToTop(src, type, parent);
                                node.onMouseover(function(){
                                    xui(src).onMouseover(true)
                                },'hoverPop').onMouseout(function(){
                                    xui(src).onMouseout(true)
                                },'hoverPop');
                            }
                        }
                    }else{
                        _.resetRun(aysid,function(){
                            xui.setData([aysid,'$ui.hover.pop']);
                            xui.setNodeData(node.get(0)||"empty",'$ui.hover.parent',0);
                            if(!beforeHide || false!==beforeHide(prf, node,e, src ,'host',item)){
                                node.hide();
                                node.onMouseover(null,'hoverPop').onMouseout(null,'hoverPop');
                            }
                        });
                    }
                };
            });
            if(node){
                node.onMouseover(type===null?null:function(e){
                    if(e.$force)return;
                    _.resetRun(aysid,null);
                },aysid).onMouseout(type===null?null:function(prf,e,src){
                    if(e.$force)return;
                    _.resetRun(aysid,function(){
                        xui.setData([aysid,'$ui.hover.pop'])
                        xui.setNodeData(node.get(0)||"empty",'$ui.hover.parent',0);
                        var item=xui.getData([aysid,'$ui.hover.pop']);
                        if(!beforeHide || false!==beforeHide(prf,node, e,src,'pop',item)){
                            node.hide();
                            node.onMouseover(null,'hoverPop').onMouseout(null,'hoverPop');
                        }
                    });
                },aysid);
            }
            node.css('display','none');
            return this;
        },
        setTheme:function(key){
            if(typeof key!="string" || !key)key=null;
            var k,arr=[];
            this.each(function(o){
                if(key!=o.theme){
                    if(key===null)
                        delete o.theme;
                    else
                        o.theme=key;
                    arr.push(o);
                }
            });
            xui.UI.pack(arr,false).refresh();
            return this;
        },
        getTheme:function(){
            return this.get(0) && this.get(0).theme;
        },
        getModule:function(){
            var prf=this.get(0);
            if(prf)return prf.getModule();
        },
        destroy:function(ignoreEffects, purgeNow){
            var ns=this;
            this.each(function(o,i){
                if(o.destroyed)return;
                if(o.beforeDestroy && false===o.boxing().beforeDestroy())return;
                var p=o.properties,
                     a=ignoreEffects?null:xui.Dom._getEffects(p.hideEffects,0),
                 fun=function(){
                    if(o.$beforeDestroy){
                        _.each(o.$beforeDestroy,function(f){
                            _.tryF(f,[],o);
                        });
                        _.breakO(o.$beforeDestroy,2);
                    }
                    if(o.$afterDestroy){
                        _.each(o.$afterDestroy,function(f){
                            _.tryF(f,[],o);
                        });
                        _.breakO(o.$afterDestroy,2);
                    }
                    if(o.renderId)o.getRoot().remove(true, purgeNow);
                    else o.__gc();    
                    _.arr.removeFrom( ns._nodes, i);
                };
                if(a)xui.Dom._vAnimate(o.getRoot(),false,a,fun);else fun();
            },null,true);
        },
        isDestroyed:function(){
            return !!(this.get(0)?this.get(0).destroyed:1);
        },
        _toDomElems:function(){
            var arr=[];
            //collect those need to be rendered
            _.arr.each(this._nodes,function(o){
                if(!o.renderId)
                    arr.push(o);
            });
            //render those
            if(arr.length)
                xui.UI.pack(arr,false).render();

            //get rendered
            arr.length=0;
            _.arr.each(this._nodes,function(o){
                arr.push(o.renderId);
            });
            return arr;
        },

        _ini:function(properties, events, host, theme, CS, CC, CB, CF, CA){
            var self=this,
                c=self.constructor,
                profile,
                t='default',
                options,
                np=c._namePool,
                df1=xui.UI.__resetDftProp,
                df2=c.__resetDftProp,
                df3=c.$adjustProp,
                ds=c.$DataStruct,
                alias,temp;
            if(properties && properties['xui.Profile']){
                profile=properties;
                alias = profile.alias || c.pickAlias();
                xui.UIProfile.apply(profile,[host,self.$key,alias,c,null,events]);
            }else{
                if(properties && properties.key && xui.absBox.$type[properties.key]){
                    options=properties;
                    properties=null;
                    alias = options.alias;
                    alias = (alias&&!np[alias])?alias:c.pickAlias();
                }else
                    alias = c.pickAlias();
                profile=new xui.UIProfile(host,self.$key,alias,c,properties,events, options);
            }
            np[alias]=1;
    
            for(var i in ds){
                if(!(i in profile.properties)){
                    temp = df2&&(i in df2) ? df2[i] : df1&&(i in df1) ? df1[i] : ds[i];
                    profile.properties[i]=typeof temp=='object'?_.clone(temp,true):temp;
                }
            }
            if(typeof(df3)=="function")df3(profile);

            profile.keys = c.$Keys;

            // custom
            profile.CS = CS?_.copy(CS):(profile.CS||{});
            profile.CB = CB?_.copy(CB):(profile.CB||{});
            profile.CC = CC?_.copy(CC):(profile.CC||{});
            profile.CF = CF?_.copy(CF):(profile.CF||{});
            profile.CA = CA?_.copy(CA):(profile.CA||{});
            if(typeof theme =="string")profile.theme = theme;

            profile.template = c.getTemplate();
            profile.behavior = c.$Behaviors;

            if(!profile.serialId)profile.serialId=c._pickSerialId();

            profile.$domId = profile.key + ":" + profile.serialId + ":";
            profile.domId = profile.domId || profile.$domId;

            profile.RenderTrigger=_.copy(c.$RenderTrigger);
            profile.LayoutTrigger=_.copy(c.$LayoutTrigger);

            //set links
            profile.link(xui.UI._cache,'UI').link(c._cache,'self').link(xui._pool,'xui');

            temp=profile.children;
            profile.children=[];
            if(temp && temp.length){
                for(var i=0,v;v=temp[i++];){
                    //from serialize
                    if(!v[0]['xui.UIProfile'])  v[0]=xui.create(v[0]).get(0);
                    if(v[0]['xui.UIProfile'])  v[0].linkParent(profile,v[1]);
                    else if(v[0]['xui.Module']) 
                        v[0].getUIComponents().each(function(p){
                            p.linkParent(profile,v[1]);
                        });
                }
            }
            self._nodes.push(profile);
            profile.Instace=self;
            self.n0=profile;

            return self;
        },
        busy:function(message,html,key,subId){
            var msg=typeof message=='string'?message:'Loading...',
                htm=typeof html=='string'?html:'<span style="background:url('+xui.ini.img_busy+') no-repeat left center;padding-left:16px;">'+msg+'</span>';
            // busy dom too
            if(message===true||html===true)xui.Dom.busy();
            return this.each(function(profile){
                _.resetRun(profile.$xid+':busy',function(profile,key,subId){
                    // destroyed
                    if(!profile.box)return;

                    var keys=profile.keys,node;
                    key=keys[key]||keys['BORDER']||keys['PANEL']||keys['KEY'];
                    var parentNode=profile.getSubNode(key,subId);
                    if(parentNode.isEmpty())
                        return;

                    if(!profile.$busy||profile.$busy.isEmpty()){
                        node=profile.$busy=xui.create('<div style="left:0;top:0;z-index:10;position:absolute;background-color:#DDD;width:100%;height:100%"></div><div style="left:0;top:0;z-index:20;text-align:center;position:absolute;width:100%;height:100%;font-size:12px;line-height:24px;cursor:wait;"><div>'+htm+'</div></div>');
                        xui([node.get(0)]).css({opacity:0.5});
                    }
                    node=profile.$busy;

                    xui([node.get(1).firstChild]).html(htm,false).css('paddingTop',(parentNode.offsetHeight()||0)/2+'px');

                    parentNode.append(node);
                },50,[profile,key,subId]);
            });
        },
        free:function(){
            xui.Dom.free();
            return this.each(function(profile){
                _.resetRun(profile.$xid+':busy');
                if(profile.$busy){
                    profile.$busy.remove();
                    delete profile.$busy;
                }
            });
        },
        reLayout:function(force){
            return this.each(function(o){
                if(!o.renderId)return;
                var p=o.properties;

                if((!o.$noB) && p.border && o.boxing()._border)
                    o.boxing()._border(null,false);

                if(p.dock && p.dock!='none'){
                    o.boxing().adjustDock(force);
                }else{
                    if(force){
                        o._resize_h=o._resize_w=-1;
                    }
                    xui.UI.$tryResize(o,p.width,p.height,force);
                }
            });
        },
        toHtml:function(force){
            var a=[];
            _.arr.each(this._nodes,function(o){
                a[a.length]=o.toHtml(force);
            });
            return a.join('');
        },
        render:function(triggerLayOut){
            var ns=this, arr=[], i, l, o, n=ns._nodes, matrix, a=[],byId=xui.Dom.byId;

            xui.UI.$applyCSS();

            //get those no-html items
            for(i=0;o=n[i++];)
                if(!o.renderId && !xui.Dom.byId(o.domId) && !xui.Dom.byId(o.$domId))
                    arr[arr.length]=o;

            //build html and to dom
            if(l=arr.length){
                for(i=0;i<l;i++)
                    if(o=arr[i].toHtml())
                        a[a.length]=o;
                if(a.length)
                    xui.UI.$toDom(ns.get(0)/*first represents all*/,a.join(''));
            }

            //render all UIProfiles
            for(i=0;o=n[i++];)
                o._render(triggerLayOut);
                
            a.length=arr.length=0;
            return ns;
        },
        renderOnto:function(node, host){
            node=xui(node);
            if(node.isEmpty())return this;

            var self=this,
                pro=self.get(0),
                me=arguments.callee,
                paras=me.paras||(me.paras=function(node){
                    var r = node.cssRegion();
                    r.tabindex=node.attr('tabIndex');
                    if(r.tabindex<=0)delete r.tabindex;
                    r.zIndex=node.css('zIndex');
                    r.position=node.css('position');
                    return r;
                }),
                id=node.id();

            _.merge(pro.properties, paras(node),'all');
            pro.properties.dock='none';
            if(!pro.alias && id)
                pro.alias=id;
            if(pro.alias)
                self.setHost(host||window, pro.alias);
            self.render(true);
            node.replace(self.getRoot());

            if(id)
                self.setDomId(id);

            return self;
        },
        setDomId:function(id){
            this.get(0).setDomId(id);
            return this;
        },
        hide:function(ignoreEffects){
            return this.each(function(o){
                if(o.renderId){
                    var t=o.properties,a=ignoreEffects?null:xui.Dom._getEffects(t.hideEffects,0);
                    o.getRoot().hide(function(){
                        t.top=t.left=parseInt(xui.Dom.HIDE_VALUE,10);
                        t.dockIgnore=true;
                    },a);
                }
            });
        },
        show:function(parent,subId,left,top,ignoreEffects){
            return this.each(function(o){
                var t=o.properties,ins=o.boxing(),b;
                left=(left||left===0)?(parseInt(left,10)||0):null;
                top=(top||top===0)?(parseInt(top,10)||0):null;
                if(left!==null)t.left=left;
                if(top!==null)t.top=top;
                if(xui.getNodeData(o.renderId,'_xuihide')){
                    b=1;
                    t.dockIgnore=false;
                    o.getRoot().show(left&&(left+'px'), top&&(top+'px'),null,ignoreEffects);
                    if(t.dock && t.dock!='none')
                        xui.UI.$dock(o,false,true);
                //first call show
                }else{
                    parent = parent || o.parent;
                    if(!parent && (!o.renderId || (o.getRootNode().id || "").indexOf(xui.Dom._emptyDivId)===0))
                        parent=xui('body');
                }
                var p=parent,n;
                if(p){
                    if(p['xui.UIProfile']){n=p.renderId;p=p.boxing()}
                    else if(p['xui.UI'])n=(n=p.get(0))&&n.renderId;
                    else n=(p=xui(p))&&p._nodes[0];
                    if(n){
                        p.append(ins,subId);
//                        if(t.visibility=="hidden")ins.setVisibility("",true);
//                        if(t.display=="none")ins.setDisplay("",true);
                        if(!b)o.getRoot().show(left&&(left+'px'), top&&(top+'px'));
                    }
                }
            });
        },
        clone:function(){
            return arguments.callee.upper.apply(this,["domId"]);
        },
        refresh:function(remedy){
            var paras,node,b,p,s,$xid,serialId,fun,box,children,uiv,ns=this;
            return ns.each(function(o,i){
                if(!o.renderId)return;

                box=o.box;
                
                var autoDestroy,
                    host=o.host,
                    alias=o.alias;
                if(o.host&&o.host['xui.Module']&&o.host.autoDestroy){
                    o.host.autoDestroy=false;
                }
                //save related id
                $xid=o.$xid;
                serialId=o.serialId;

                var ar=o.$afterRefresh;

                if(typeof o.boxing().getUIValue=='function'){
                    uiv=o.boxing().getUIValue();
                    if((o.boxing().getValue() + " ")==(uiv+" "))
                        uiv=null;
                }

                //keep parent
                if(b=!!o.parent){
                    p=o.parent.boxing();
                    paras=o.childrenId;
                }else
                    p=o.getRoot().parent();

                //protect children's dom node
                //no need to trigger layouttrigger here
                //for example: if use getGhostDiv, upload input cant show file name
                node=remedy?xui.Dom.getEmptyDiv():xui.$getGhostDiv();
                o.boxing().getChildren().reBoxing().each(function(v){
                    node.appendChild(v);
                });
                node=null;

                //keep children
                children = _.copy(o.children);
                o.boxing().removeChildren();

                //unserialize
                s = o.serialize(false, true);
                fun = o.$refreshTrigger;

                //replace
                var replace = xui.create('span');
                o.getRoot().replace(replace);

                //destroy it
                //avoid reclaiming serialId
                o.$noReclaim=1;

                // keep cache refrence
                var _c=o.Instace;
                o.boxing().destroy(true,true);

                //set back
                _.merge(o,s,'all');
                // notice: remove destroyed here
                delete o.destroyed;
                o.$xid=$xid;
                o.serialId=serialId;

                //create
                var n=new box(o).render();
                
                // set cache refrence
                if(_c){
                    _.merge(_c,n,'all');
                    n.get(0).Instace=_c;
                    // must reset it to keep memory pointer
                    n=_c;
                }
                ns[i]=n.get(0);

                //for functions like: UI refresh itself
                if(fun)
                    fun.call(fun.target,n.get(0));

                //add to parent, and trigger RenderTrigger
                if(b)
                    p.append(n,paras);
                else
                    p.append(n);

                if(host)n.setHost(host,alias);

                //restore children
                _.arr.each(children,function(v){
                    delete v[0].$dockParent;
                    n.append.apply(n,v);
                });

                //back to original position
                replace.replace(n.get(0).getRoot());
                replace.remove();
                replace=null;

                if(uiv)
                    n.setUIValue(uiv,true,null,'refresh');
                    
                if(ar){
                    n.get(0).$afterRefresh=ar;
                    ar(n.get(0));
                }
                if(_.isSet(autoDestroy&&n.host&&n.host['xui.Module'])){
                    n.host.autoDestroy=autoDestroy;
                }
            });
        },
        append:function(target, subId, pre, base){
            var pro=this.get(0),prop=pro.properties;
            // default is append to last
            var index,baseN,
                inParent=arguments[4],
                parentNode=arguments[5];
            // add to first, or previous of base
            pre=!!pre;
            if(base){
                if(base['xui.UI']){
                    base=base.get(0);
                }
                _.arr.each(pro.children,function(o,i){
                    if(o[0]===base){
                        index=i;
                        return false;
                    }
                });
                if(_.isNumb(index)){
                    index=pre?index:(index+1);
                    baseN=base.getRoot();
                    if(baseN.isEmpty())baseN=null;
                }
            }else{
                index=pre?0:-1;
            }
            
            if(_.isHash(target) || _.isStr(target))
                target=xui.create(target);
            if(target['xui.UIProfile'])target=target.boxing();

            if(pro.beforeAppend && false===this.beforeAppend(pro,target,subId,pre,base))
                return;

            if(target['xui.Module']){
                if(subId!==false){
                    var i=index;
                    target.getUIComponents().each(function(profile){
                        profile.linkParent(pro,subId,base?(i++):i);
                    });
                }
                if(pro.renderId){
                    parentNode=inParent?parentNode:pro.getContainer(subId);
                    if(parentNode && (!parentNode.isEmpty()) && (!prop.lazyAppend || parentNode.css('display')!='none')){
                        if(!base){
                            parentNode[pre?'prepend':'append'](target);
                        }else if(baseN){
                            baseN[pre?'addPrev':'addNext'](target);
                        }
                    }
                }
                else{
                    _.arr.insertAny(pro.exmodules||(pro.exmodules=[]),[target,subId],index,true);
                }
            }else{
                if(subId!==false){
                    if(target['xui.UI']){
                        var i=index;
                        target.each(function(profile){
                             profile.linkParent(pro,subId,base?(i++):i);
                        });
                    }
                }
                if(pro.renderId){
                    var oldp;
                    if(pro.parent && _.get(pro,["properties","dock"])!='none' && !_.get(pro,["properties","dockIgnore"]) && !_.get(pro,["properties","dockFloat"])){
                        if(target['xui.absBox'])
                            oldp=target.reBoxing().parent();
                    }
                    parentNode=inParent?parentNode:pro.getContainer(subId);
                    if(parentNode && (!parentNode.isEmpty()) && (!prop.lazyAppend || parentNode.css('display')!='none')){
                        if(!base){
                            parentNode[pre?'prepend':'append'](target);
                        }else if(baseN){
                            baseN[pre?'addPrev':'addNext'](target);
                        }
                    }
                    //adjust old parent
                    if(oldp&&oldp.get(0))
                        oldp.onSize();
                }else{
                    if(!target['xui.UI']){
                        _.arr.insertAny(pro.exchildren||(pro.exchildren=[]),[target,subId],index,true);
                    }
                }
            }

            if(pro.afterAppend)
                this.afterAppend(pro,target,subId,pre,base);
            return this;
        },
        getParent:function(){
            var prf=this.get(0);
            if(prf)return prf.parent && prf.parent.boxing();
        },
        getChildrenId:function(){
            var prf=this.get(0);
            if(prf)return prf.childrenId;
        },
        getChildren:function(subId, type){
            // return array only, don't recursive call in any module
            if(type===false || type=="withModule"){
                var prf=this.get(0),
                    moduleHash={},
                    a=[],z,
                    moduleClass=prf.moduleClass,
                    moduleXid=prf.moduleXid,
                    getModlue=function(p){
                        if(p.moduleClass && p.moduleXid){
                            // exclude the container's module
                            if(p.moduleClass!==moduleClass && p.moduleXid!==moduleXid){
                                // got it already
                                if(moduleHash[z=p.moduleClass+"'"+p.moduleXid+"]"]){
                                    return null;
                                }else{
                                    moduleHash[z]=1;
                                    var q = p.getModule();
                                    // module in module, we use the top mudule only( exclude the container's module )
                                     if(q && q.moduleClass && q.moduleXid){
                                         // look up toward top layer
                                         if(q.moduleClass!==moduleClass && q.moduleXid!==moduleXid){
                                            return getModlue(q);
                                         }else{
                                             return q;
                                         }
                                     }
                                }
                            }
                        }
                        return p;
                    },
                    f=function(p){
                        _.arr.each(p.children,function(v,t){
                            t=getModlue(v[0]);
                            if(t){
                                a.push(t);
                                if(t['xui.UIProfile'] && t.children && t.children.length)
                                    f(t);
                            }
                        });
                    };
                _.arr.each(prf.children,function(v,t){
                    if((subId&&typeof(subId)=="string")?v[1]===subId:1){
                        t=getModlue(v[0]);
                        if(t){
                            a.push(t);
                            if(t['xui.UIProfile'] && t.children && t.children.length)
                                f(t);
                        }
                    }
                });
                // return array only
                return a;
            }else{
                var a=[],f=function(prf){
                    _.arr.each(prf.children,function(v){
                        a.push(v[0]);
                        if(v[0].children && v[0].children.length)
                            f(v[0]);
                    });
                };
                _.arr.each(this.get(0).children,function(v){
                    if((subId&&typeof(subId)=="string")?v[1]===subId:1){
                        a.push(v[0]);
                        if((type===true ||type=="recurse") && v[0].children && v[0].children.length)
                            f(v[0]);
                    }
                });
                return xui.UI.pack(a);
            }
        },
        /**
        * subId:
        *     "id1"
        *     ["id1","id2"]
        *     ["id1;id2"]
        *     [xui.UIProfile]
        *     [xui.UIProfile, [xui.UIProfile]
        *     [xui.UI]
        *     [xui.UI, [xui.UI]
        **/
        removeChildren:function(subId, bDestroy){
            return this.each(function(o){
                var c=_.copy(o.children),
                    s=o.box.$DataModel.valueSeparator||";",
                    b,arr;
                _.arr.each(c,function(v){
                    b=0;
                    if(!subId || subId===true){
                        b=1;
                    }else{
                        if(_.isStr(subId) || _.isArr(subId)) {
                            arr = _.isArr(subId)?subId:(subId+"").split(s);
                            b=_.arr.indexOf(arr, v[1])!=-1 || _.arr.indexOf(arr, v[0])!=-1 || _.arr.indexOf(arr, v[0].boxing())!=-1;
                        }else{
                            b=v[0]==subId["xui.UI"]?subId.get(0):subId;
                        }
                    }
                    if(b){
                        if(o.beforeRemove && false===o.boxing().beforeRemove(o,v[0],v[1],bDestroy))
                            return;

                        v[0].unlinkParent();

                        if(o.afterRemove)
                            o.boxing().afterRemove(o,v[0],v[1],bDestroy);

                        if(bDestroy && !v[0].destroyed)
                            v[0].boxing().destroy(true);
                    }
                });
            });
        },
        draggable:function(dragKey, dragData, key, options, target){
            return this.each(function(o){
                o.getSubNode(o.keys[key] || 'KEY', true)
                .beforeMousedown(dragKey?function(pro,e,src){
                    if(xui.Event.getBtn(e)!="left")return;
                    if(pro.properties.disabled)return;

                    var target=target?typeof(target)=="function"?_.tryF(getTarget,[],o):xui(target):null;
                    if(!target || !target.get(0)){
                        target=xui(src);
                    }

                    options=options||{};
                    options.dragKey=dragKey;
                    options.dragData=typeof dragData == 'function'?dragData():dragData;
                    _.merge(options,{
                        dragCursor:'pointer',
                        dragType:'icon',
                        dragDefer:2
                    });
                    target.startDrag(e, options);
                }:null,'_d',-1)
                .beforeDragbegin(dragKey?function(profile, e, src){
                    xui.use(src).onMouseout(true,{$force:true}).onMouseup(true);
                }:null,'_d',-1);
                if(!dragKey)
                    o.clearCache();
            });
        },
        setCustomFunction:function(key, value){
            return this.each(function(o){
                if(typeof key=='string'){
                    if(value) o.CF[key]=value;
                    else delete o.CF[key];
                }else
                    o.CF=key||{};
            });
        },
        setCustomClass:function(key, value){
            var me=arguments.callee,
                fun=(me.fun||(me.fun=function(pro,i, h, flag){
                    if(!h[i])return;
                    var node=pro.getSubNode(i,true),b;
                    if(!node.isEmpty())
                        _.arr.each(h[i].split(/\s+/),function(o){
                            node[flag?'removeClass':'addClass'](o);
                        });
                }));
            return this.each(function(o){
                var bak = _.copy(o.CC),t;

                //set key and value
                if(typeof key=='string'){
                    t=key;
                    key=_.copy(o.CC);
                    key[t]=value;
                }
                _.filter(key,function(o,i){
                    if(!/^[A-Z][A-Z0-9]*$/.test(i)){
                        t=key.KEY=key.KEY||{};
                        if(!(i in t))t[i]=o;
                        return false;
                    }
                    if(!o)return false;
                });
                if(key && typeof key=='object'){
                    if(o.renderId){
                        for(var i in bak)
                            fun(o, i, bak, true);
                        for(var i in key)
                            fun(o, i, key);
                    }
                    o.CC=key;
                //clear all
                }else{
                    if(o.renderId)
                        for(var i in bak)
                            fun(o, i, bak, true);
                    o.CC={};
                }
            });
        },
        setCustomAttr:function(key,value,nodes){
            var me=arguments.callee,
                fun=(me.fun||(me.fun=function(pro,key,CAObj,clear,nodes){
                    if(!CAObj[key])return;
                    var hkey=pro.keys[key] || key,
                        tnodes,b;
                    // get target nodes fromin given nodes
                    if(nodes){
                        tnodes=nodes.query('*', 'id', hkey==pro.keys.KEY?pro.domId:new RegExp('^'+hkey+':'+pro.serialId));
                    }
                    // get target nodes from the whole widget
                    else{
                        tnodes=pro.getSubNode(key,true);
                    }
                    if(!tnodes.isEmpty()){
                        if(_.isHash(CAObj[key])){
                            _.each(CAObj[key],function(o,i){
                                tnodes.attr(i, clear?'':(o && typeof o=="string")?xui.adjustRes(o,0,1):o);
                            });
                        }          
                    }
                }));
            return this.each(function(o){
                var bak = _.copy(o.CA),t;
                if(typeof key=='string'){
                    t=key;
                    key=_.copy(o.CA);
                    key[t]=value;
                }
                _.filter(key,function(o,i){
                    if(!/^[A-Z][A-Z0-9]*$/.test(i)){
                        t=key.KEY=key.KEY||{};
                        if(!(i in t))t[i]=o;
                        return false;
                    }
                    if(!o)return false;
                });
                //set key and value
                if(!!key && typeof key=='object'){
                    if(key){
                        _.filter(key,function(o,i){
                            return i!='id' && i!='class' && i!='style' && i!='$xid'
                        });
                    }
                    if(o.renderId){
                        for(var i in key)
                            fun(o, i, bak, true, nodes);
                        for(var i in key)
                            fun(o, i, key, false, nodes);
                    }
                    o.CA=key;
                //clear all
                }else{
                    if(o.renderId)
                        for(var i in bak)
                            fun(o, i, bak, true, nodes);
                    o.CA={};
                }
            });        
        },
        setCustomStyle:function(key,value,nodes){
            var me=arguments.callee,
                fun=(me.fun||(me.fun=function(pro,key,CSObj,clear,nodes){
                    if(!CSObj[key])return;
                    var hkey=pro.keys[key] || key,
                        tnodes,b;
                    // get target nodes fromin given nodes
                    if(nodes){
                        tnodes=nodes.query('*', 'id', hkey==pro.keys.KEY?pro.domId:new RegExp('^'+hkey+':'+pro.serialId));
                    }
                    // get target nodes from the whole widget
                    else{
                        tnodes=pro.getSubNode(key,true);
                    }
                    if(!tnodes.isEmpty()){
                        if(_.isStr(CSObj[key]))
                            _.arr.each(CSObj[key].split(';'),function(o,i){
                                if((b=o.split(':')).length>=2){
                                    i=b.shift();o=b.join(':');
                                    i=i.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()});
                                    tnodes.css(i, (clear?'':(o && typeof o=="string")?xui.adjustRes(o,0,1):o)||"");
                                }
                            });
                         else if(_.isHash(CSObj[key]))
                            _.each(CSObj[key],function(v,i){
                                if(_.isStr(v)){
                                    // "cursor":"point"
                                    if(v.indexOf(';')==-1){
                                         tnodes.css(i, (clear?'':(v && typeof v=="string")?xui.adjustRes(v,0,1):v)||"");
                                    }
                                    // "overflow":"overflow-x:auto;overflow-y:hidden"
                                    else{
                                        _.arr.each(v.split(';'),function(o){
                                            if((b=o.split(':')).length>=2){
                                                i=b.shift();o=b.join(':');
                                                i=i.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()});
                                                tnodes.css(i, (clear?'':(o && typeof o=="string")?xui.adjustRes(o,0,1):o)||"");
                                            }
                                        });
                                    }
                                }else{
                                    i=i.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()});
                                    tnodes.css(i, (clear?'':(v && typeof v=="string")?xui.adjustRes(v,0,1):v)||"");
                                }
                            });                            
                    }
                }));
            return this.each(function(o){
                var bak = _.copy(o.CS),t;

                if(typeof key=='string'){
                    t=key;
                    key=_.copy(o.CS);
                    key[t]=value;
                }
                _.filter(key,function(o,i){
                    if(!/^[A-Z][A-Z0-9]*$/.test(i)){
                        t=key.KEY=key.KEY||{};
                        if(!(i in t))t[i]=o;
                        return false;
                    }
                    if(!o)return false;
                });
                //set hash dir
                if(!!key && typeof key=='object'){
                    if(o.renderId){
                        for(var i in bak)
                            fun(o, i, bak, true, nodes);
                        for(var i in key)
                            fun(o, i, key, false, nodes);
                    }
                    o.CS=key;
                //clear all
                }else{
                    if(o.renderId)
                        for(var i in bak)
                            fun(o, i, bak, true, nodes);
                    o.CS={};
                }
            });
        },
        setCustomBehavior:function(key, value){
            return this.each(function(o){
                if(typeof key=='string'){
                    if(o.keys[key])
                        o.CB[key]=value||{};
                }else
                    o.CB=key||{};
                if(o.CB.KEY){
                    _.merge(o.CB, o.CB.KEY, 'all');
                    delete o.CB.KEY;
                }
                o.clearCache();
            });
        },
        adjustDock:function(force){
            return this.each(function(o){
                if(!o.renderId)return;
                // adjust self
                if('dock' in o.properties && o.properties.dock && o.properties.dock!='none' && o.renderId){
                    var n=o.getRootNode();
                    // ensure display
                    if(n.clientHeight){
                        if(force){
                            // ensure force 1
                            n.style.width=0;
                            n.style.height=0;
                            // ensure force 2
                            o._resize_h=o._resize_w=-1;
                        }
                        xui.UI.$dock(o,true,true);
                    }
                }
                // adjust children
                if(o.$onDock){
                    var n =o.boxing().getContainer(true);
                    if(n&&n.onSize&&n.get(0))n.onSize();
                }
            });
        }
    },
    Initialize:function(){
        var ns=this.prototype;
        _.arr.each('getSubNode,getSubNodes,getDomId,getRootNode,getRoot,getContainer'.split(','),function(o){
            if(!ns[o])
                ns[o]=function(){
                    var p=this.get(0);
                    return p ? p[o].apply(p,arguments) : null;
                };
                ns[o].$original$='xui.UI';
                ns[o].$type$='instance';
                ns[o].$name$=o;
        });

        var self=this, hash={};
        _.each(xui.UI.$ps,function(i,o){
            hash[o] = {
                ini:'auto',
                action:function(value){
                    var self=this,
                        p=self.properties,b=false,
                        args;
                    self.getRoot()[o]?self.getRoot()[o](value):xui.Dom._setPxStyle(self.getRootNode(),o,value);
                    if(o=='width'||o=='height'){
                        // for no _onresize widget only
                        if(!self.box._onresize && self.onResize)
                            self.boxing().onResize(self,o=='width'?value:null,o=='height'?value:null)
                    }else{
                        if(self.onMove)
                            self.boxing().onMove(self,o=='left'?value:null,o=='top'?value:null,o=='right'?value:null,o=='bottom'?value:null)
                    }

                    if(p.dock!='none'){
                            args={
                            $type:p.dock,
                            $dockid:_.arr.indexOf(['width','height','fill','cover'],p.dock)!=-1?self.$xid:null
                        };
                        switch(p.dock){
                            case 'middle':
                                if(o!='height'&&o!='top')return;
                                args.top=args.height=1;
                                break;
                            case 'center':
                                if(o!='width'&&o!='left')return;
                                args.left=args.width=1;
                                break;
                            case 'top':
                                if(o!='height'&&o!='top')return;
                                args.width=args.height=1;
                                break;
                            case 'bottom':
                                if(o!='height'&&o!='bottom')return;
                                args.width=args.height=1;
                                break;
                            case 'left':
                                if(o!='width'&&o!='left')return;
                                args.width=args.height=1;
                                break;
                            case 'right':
                                if(o!='width'&&o!='right')return;
                                args.width=args.height=1;
                                break;
                            case 'width':
                                if('width'==o)return;
                                args.width=1;
                                break;
                            case 'height':
                                if('height'==o)return;
                                args.height=1;
                                break;
                            case 'fill':
                            case 'cover':
                                if(o=='width'&&o=='height')return;
                                args.width=args.height=1;
                                break;
                        }
                        var pp = xui.UIProfile.getFromDom(self.$dockParent);
                        if(pp && pp.properties.conDockFlexFill){
                            pp.boxing().adjustDock(true);
                        }else{
                            _.tryF(self.$dockFun,[args],self);
                        }
                    }
                }
            }
        });
        _.merge(hash,{
            renderer:{
                ini:null
            },
            //invalid after dom dom Node
            zIndex:{
                ini:1,
                action:function(value){
                    this.getRoot().css('zIndex',value);
                }
            },
            tabindex:{
                ini:1,
                action:function(value){
                    var ns=this,
                        reg=new RegExp("^"+ns.key+"[-\\w]*"+":"+ns.serialId+":");
                    ns.getRoot().query("*",function(n){
                        return n.id && reg.test(n.id) && n.getAttribute('tabIndex');
                    }).attr('tabIndex',value);
                }
            },
            position:{
                ini : 'absolute',
                listbox:['','static','relative','absolute'],
                action:function(value){
                    this.getRoot().css('position',value);
                }
            },
            visibility:{
                listbox:['','visible','hidden'],
                action:function(value){
                    this.getRoot().css('visibility',value);
                    // special for resizer
                    if(this.$resizer){
                        if(value=='hidden')
                            this.$resizer.hide();
                        else
                            this.$resizer.show();
                    }

                    xui.setNodeData(this.getRootNode(),'_setVisibility',1);
                }
            },
            display:{
                listbox:['','none','block','inline','inline-block'],
                action:function(value){
                    if(value=='inline-block')
                        this.getRoot().setInlineBlock();
                    else
                        this.getRoot().css('display',value);
                }
            },
            selectable:{
                ini:false,
                action:function(value){
                    this.getRoot().setSelectable(!!value);
                }
            }
        });

        self.setDataModel(hash);

        xui.UI.$cache_css += xui.UI.buildCSSText({
            '.xui-css-viewport, .xui-css-viewport body':{
                height:'100%',
                border:'0 none',
                margin:'0',
                padding:'0'
            },
            '.xui-ui-draggable':{},
            '.xui-inline-block':{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie?1:null
            },
            '.xui-ui-btn, .xui-ui-btni, .xui-ui-btnc':{
                height:'22px',
                'line-height':'22px',
                background:xui.UI.$bg('button.gif', 'no-repeat', true)
            },
            '.xui-ui-btn':{
                $order:1,
                'white-space': 'nowrap',
                'vertical-align':'top',
                overflow:'hidden',
                'background-position':'right top',
                'padding-right':'4px',
                'font-size':'12px'
            },
            '.xui-ui-btn *':{
                cursor:'pointer'
            },
            '.xui-ui-btnc button, .xui-ui-btnc a':{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie?1:null,
                background:'transparent',
                border:0,
                margin:0,
                padding:0
            },
            '.xui-ui-btnc a':{
                padding:'0 4px'
            },
            '.xui-ui-btnc a, .xui-ui-btnc span, .xui-ui-btnc button':{
                'line-height':'22px'
            },
            '.xui-ui-btni':{
                $order:1,
                'background-position':'left -60px',
                'padding-left':'4px',
                'vertical-align':'top',
                overflow:'hidden'
            },
            '.xui-ui-btnc':{
                $order:1,
                'background-position':'left -30px',
                'background-repeat': 'repeat-x',
                'vertical-align':'top'
            },
            '.xui-ui-btn-mouseover, .xui-ui-btn-focus':{
                $order:2,
                'background-position':'right -90px'
            },
            '.xui-ui-btn-mouseover .xui-ui-btni, .xui-ui-btn-focus .xui-ui-btni':{
                $order:2,
                'background-position':'left -150px'
            },
            '.xui-ui-btn-mouseover .xui-ui-btnc, .xui-ui-btn-focus .xui-ui-btnc':{
                $order:2,
                'background-position':'left -120px'
            },
            '.xui-ui-btn-mousedown, .xui-ui-btn-checked':{
                $order:3,
                'background-position':'right -180px'
            },
            '.xui-ui-btn-mousedown .xui-ui-btni, .xui-ui-btn-checked .xui-ui-btni':{
                $order:3,
                'background-position':'left -240px'
            },
            '.xui-ui-btn-mousedown .xui-ui-btnc, .xui-ui-btn-checked .xui-ui-btnc':{
                $order:3,
                'background-position':'left -210px'
            },
            '.xui-ui-image':{
                'vertical-align':'middle',
                width:'16px',
                height:'16px',
                'background-repeat':'no-repeat'
            },
            '.xui-ui-icon':{
                'vertical-align':'middle',
                width:'16px',
                height:'16px',
                'background-repeat':'no-repeat',
                'background-position' : 'center',
                margin:'0 2px'
            },
            '.xui-uicmd-close, .xui-uicmd-info, .xui-uicmd-opt, .xui-uicmd-pop, .xui-uicmd-land, .xui-uicmd-refresh, .xui-uicmd-toggle, .xui-uicmd-toggle2, .xui-uicmd-min, .xui-uicmd-max,.xui-uicmd-restore,.xui-uicmd-pin, .xui-uicmd-check, .xui-uicmd-radio, .xui-uicmd-add, .xui-uicmd-remove':{
                'background-image': xui.UI.$bg('icons.gif', '', true),
                'background-repeat':'no-repeat', 
                'background-position': 'left top',
                width:'16px',
                height:'16px',
                'margin-right':'2px',
                cursor:'default',
                'vertical-align':'middle'
            },
            '.xui-uicmd-info':{
                $order:1,
                'background-position' : '-320px 0'
            },
            '.xui-uicmd-info-mouseover':{
                $order:2,
                'background-position' : '-320px  -20px'
            },
            '.xui-uicmd-info-mousedown':{
                $order:3,
                'background-position' : '-320px  -40px'
            },
            '.xui-uicmd-opt':{
                $order:1,
                'background-position' : '0 0'
            },
            '.xui-uicmd-opt-mouseover':{
                $order:2,
                'background-position' : '0 -20px'
            },
            '.xui-uicmd-opt-mousedown':{
                $order:3,
                'background-position' : '0 -40px'
            },
            '.xui-uicmd-pop, .xui-uicmd-land':{
                $order:1,
                'background-position' : '-40px 0'
            },
            '.xui-uicmd-pop-mouseover, .xui-uicmd-land-mouseover':{
                $order:2,
                'background-position' : '-40px -20px'
            },
            '.xui-uicmd-pop-mousedown, .xui-uicmd-land-mousedown':{
                $order:3,
                'background-position' : '-40px -40px'
            },
            '.xui-uicmd-refresh':{
                $order:1,
                'background-position' : '-280px 0'
            },
            '.xui-uicmd-refresh-mouseover':{
                $order:2,
                'background-position' : '-280px -20px'
            },
            '.xui-uicmd-refresh-mousedown':{
                $order:3,
                'background-position' : '-280px -40px'
            },
            '.xui-uicmd-pin':{
                $order:1,
                'background-position' : '-80px 0'
            },
            '.xui-uicmd-pin-mouseover':{
                $order:2,
                'background-position': '-80px -20px'
            },
            '.xui-uicmd-pin-mousedown':{
                $order:3,
                'background-position': '-80px -40px'
            },
            '.xui-uicmd-pin-checked, .xui-uicmd-pin-checked-mouseover, .xui-uicmd-pin-checked-mousedown':{
                $order:4,
                'background-position':  '-80px -40px'
            },
            '.xui-uicmd-min':{
                $order:1,
                'background-position' : '-120px 0'
            },
            '.xui-uicmd-min-mouseover':{
                $order:2,
               'background-position': ' -120px -20px'
            },
            '.xui-uicmd-min-mousedown':{
                $order:3,
               'background-position':  '-120px -40px'
            },
            '.xui-uicmd-restore':{
                $order:1,
                'background-position' : '-160px 0'
            },
            '.xui-uicmd-restore-mouseover':{
                $order:2,
               'background-position':  '-160px -20px'
            },
            '.xui-uicmd-restore-mousedown':{
                $order:3,
               'background-position':  '-160px -40px'
            },
            '.xui-uicmd-max':{
                $order:1,
                'background-position' : '-200px 0'
            },
            '.xui-uicmd-max-mouseover':{
                $order:2,
               'background-position':  '-200px -20px'
            },
            '.xui-uicmd-max-mousedown':{
                $order:3,
               'background-position':  '-200px -40px'
            },
            '.xui-uicmd-close':{
                $order:1,
                'background-position' : '-240px 0'
            },
            '.xui-uicmd-close-mouseover':{
                $order:2,
                'background-position' : '-240px -20px'
            },
            '.xui-uicmd-close-mousedown':{
                $order:3,
                'background-position' : '-240px -40px'
            },
            '.xui-uicmd-check':{
                $order:1,
                margin:'0 4px 0 2px',
                'background-position' : '-20px -70px'
            },
            '.xui-uicmd-check-mouseover':{
                $order:2,
                'background-position' : '-20px -90px'
            },
            '.xui-uicmd-check-mousedown':{
                $order:3,
                'background-position' : '-20px -110px'
            },
            '.xui-uicmd-check-checked':{
                $order:4,
                'background-position' : '0 -70px'
            },
            '.xui-uicmd-check-checked-mouseover':{
                $order:5,
                'background-position' : '0 -90px'
            },
            '.xui-uicmd-check-checked-mousedown':{
                $order:6,
                'background-position' : '0 -110px'
            },
            '.xui-uicmd-radio':{
                $order:1,
                margin:'0 4px 0 2px',
                'background-position' : '-60px -70px'
            },
            '.xui-uicmd-radio-mouseover':{
                $order:2,
                'background-position' : '-60px -90px'
            },
            '.xui-uicmd-radio-mousedown':{
                $order:3,
                'background-position' : '-60px -110px'
            },
            '.xui-uicmd-radio-checked':{
                $order:4,
                'background-position' : '-40px -70px'
            },
            '.xui-uicmd-radio-checked-mouseover':{
                $order:5,
                'background-position' : '-40px -90px'
            },
            '.xui-uicmd-radio-checked-mousedown':{
                $order:6,
                'background-position' : '-40px -110px'
            },
            '.xui-uicmd-add':{
                $order:1,
               'background-position':'-56px -222px'
            },
           '.xui-uicmd-add-mouseover':{
                $order:2,
                'background-position':'-56px -222px'
           },
           '.xui-uicmd-add-mousedown':{
                $order:3,
                'background-position':'-56px -222px'
           },
            '.xui-uicmd-remove':{
                $order:1,
                'background-position': '-72px -222px'
            },
            '.xui-uicmd-remove-mouseover':{
                $order:1,
                'background-position': '-72px -222px'
            },
            '.xui-uicmd-remove-mousedown':{
                $order:1,
                'background-position': '-72px -222px'
            },

            '.xui-uicmd-toggle':{
                $order:1,
                'background-position': '-160px -70px'
            },
            '.xui-uicmd-toggle-mouseover':{
                $order:2,
                'background-position': '-160px -90px'
            },
            '.xui-uicmd-toggle-mousedown':{
                $order:3,
                'background-position': '-160px -110px'
            },
            '.xui-uicmd-toggle-checked':{
                $order:4,
                'background-position': '-180px -70px'
            },
            '.xui-uicmd-toggle-checked-mouseover':{
                $order:5,
                'background-position': '-180px -90px'
            },
            '.xui-uicmd-toggle-checked-mousedown':{
                $order:6,
                'background-position': '-180px -110px'
            },
            '.xui-uicmd-toggle2':{
                $order:1,
                'background-position': '-200px -70px'
            },
            '.xui-uicmd-toggle2-mouseover':{
                $order:2,
                'background-position': '-200px -90px'
            },
            '.xui-uicmd-toggle2-mousedown':{
                $order:3,
                'background-position': '-200px -110px'
            },
            '.xui-uicmd-toggle2-checked':{
                $order:4,
                'background-position': '-220px -70px'
            },
            '.xui-uicmd-toggle2-checked-mouseover':{
                $order:5,
                'background-position': '-220px -90px'
            },
            '.xui-uicmd-toggle2-checked-mousedown':{
                $order:6,
                'background-position': '-220px -110px'
            },
            '.xui-uicmd-none, .xui-display-none':{
                display:'none'
            },
            '.xui-uicmd-empty':{
                $order:1000,
                width:'16px',
                height:'16px',
                'margin-right':'2px',
                cursor:'default',
                'vertical-align':'middle',
                background:'none'
            },

            ".xui-uitembg":{
                "background-color":"#FFF",
                 "padding":"1px"
            },
            ".xui-uitembg-mouseover":{
                $order:2,
                "padding":"0px",
               'border-radius':'3px',
               "border":'solid 1px #FAD200'
            },
            ".xui-uitembg-mousedown":{
                $order:3,
                "padding":"0px",
               'border-radius':'3px',
               "border":'solid 1px #F5D22D'
            },
            ".xui-uitembg-checked":{
                $order:4,
                "padding":"0px",
               'border-radius':'3px',
               "border":'solid 1px #AAD2FA',
                "color":"#000"
            },

            ".xui-uibarbg":{
                "background-color":"#CCE4FC"
            },
            ".xui-uibarbg-mouseover, .xui-uibarbg2-mouseover":{
                $order:2,
                "background-color":"#FAD200"
            },
            ".xui-uibarbg-mousedown, .xui-uibarbg2-mousedown":{
                $order:3,
                 "background-color":"#F5D22D"
            },
            ".xui-uibarbg-checked,.xui-uibarbg2-checked":{
                $order:4,
                 "background-color":"#AAD2FA",
                 "color":"#000"
            },
            ".xui-bginput":{
                background: "#fff"
            },
            /*
            ".xui-uirowbg":{
                "background-color":"#FFF"
            },
            ".xui-uirowbg-mouseover":{
                $order:2,
                "background-color":"#FFF1A0"
            },
            ".xui-uirowbg-mousedown":{
                $order:3,
                 "background-color":"#7199E8"
            },
            ".xui-uirowbg-checked":{
                $order:4,
                 "background-color":"#7199E8",
                 "color":"#fff"
            },
            ".xui-uirowbg-active":{
                $order:5,
                "background-color":"#A3BAE9"
            },
            ".xui-uirowbg-hot":{
                $order:6,
                "background-color":"#FFE97F"
            },*/
            ".xui-uitd":{
                "background-color": "#F9F9FB"
            },
            ".xui-uitd-mouseover":{
                 $order:2,
                "background-color": "#d9e8fb"
            },
            ".xui-uitd-checked, .xui-uitd-checked .xui-node":{
                 $order:3,
                "background-color":"#316AC5",
                color:"#fff"
            },
            ".xui-uitd-alt":{
                 $order:1,
                "background-color":"#FDF8D2"
            },
            ".xui-uith":{
                 $order:1,
                color:"#333333",
                "background-color":"#E8EEF7"
            },
            '.xui-uibar-top, .xui-uibar-bottom, .xui-uibar-top-s, .xui-uibar-bottom-s':{
                position:'relative',
                //for avoiding extra space after table in IE
                'vertical-align':'baseline',
                'font-size':0,
                'line-height':0
            },
            '.xui-uibar-top td, .xui-uibar-top-s td, .xui-uibar-bottom td, .xui-uibar-bottom-s td':{
                $order:1,
                'background-image': xui.UI.$bg('bar_vertical.gif', '', true),
                'background-repeat':'no-repeat', 
                'background-position': 'left top'
            },
//uibar-top
            /*set table height for ff2, set uibar height for performance*/
            '.xui-uibar-top, .xui-uibar-top .xui-uibar-t':{
                height:'29px'
            },
            '.xui-uibar-top .xui-uibar-tdl':{
                $order:1,
                'padding-left':'4px',
                height:'100%',
                'background-position': '0 0'
            },
            '.xui-uibar-top .xui-uibar-tdm':{
                $order:1,
                'background-position': '0 -30px',
                'background-repeat': 'repeat-x'
            },
            '.xui-uibar-top .xui-uibar-tdr':{
                $order:1,
                'padding-left':'4px',
                'background-position': 'right -60px'
            },
            '.xui-uibar-top-focus .xui-uibar-tdl':{
                $order:2,
                'padding-left':'4px',
                height:'100%',
                'background-position': 'left -90px'
            },
            '.xui-uibar-top-focus .xui-uibar-tdm':{
                $order:2,
                'background-position': 'left -120px',
                'background-repeat': 'repeat-x'
            },
            '.xui-uibar-top-focus .xui-uibar-tdr':{
                $order:2,
                'padding-left':'4px',
                'background-position': 'right -150px'
            },
            '.xui-uibar-top .xui-uibar-cmdl':{
                overflow:'hidden',
                position:'absolute',
                left:0,
                top:'6px',
                width:'92%',
                height:'22px',
                'padding-left':'8px',
                'white-space': 'nowrap'
            },
            '.xui-uibar-top .xui-uibar-cmdr':{
                position:'absolute',
                top:'6px',
                right:'8px',
                'text-align':'right'
            },
            '.xui-uicon-main':{
                position:'relative',
                'padding-left':'4px',
                'font-size':0,
                'line-height':0,
                'z-index':1,
                overflow:'visible',
                'background-image': xui.UI.$bg('bar_horizontal.gif', '', true),
                'background-repeat':'repeat-y', 
                'background-position': '-595px top'
            },
            '.xui-uicon-maini':{
                'padding-right':'4px',
                'font-size':0,
                'line-height':0,
                'background-image': xui.UI.$bg('container_right.gif', '', true),
                'background-repeat':'repeat-y', 
                'background-position': 'right top'
            },
//uibar-bottom
            '.xui-uibar-bottom, .xui-uibar-bottom .xui-uibar-t':{
                height:'12px'
            },
            '.xui-uibar-bottom .xui-uibar-tdl':{
                $order:1,
                'padding-left':'4px',
                height:'100%',
                'background-position': 'left -189px'
            },
            '.xui-uibar-bottom .xui-uibar-tdm':{
                $order:1,
                'background-position': 'left -211px',
                'background-repeat': 'repeat-x'
            },
            '.xui-uibar-bottom .xui-uibar-tdr':{
                $order:1,
                'padding-left':'4px',
                'background-position': 'right -233px'
            },
//uibar-top-s
            '.xui-uibar-top-s, .xui-uibar-top-s .xui-uibar-t':{
                $order:3,
                height:'7px'
            },
            '.xui-uibar-top-s .xui-uibar-tdl':{
                $order:3,
                height:'100%',
                'padding-left':'4px',
                'background-position': 'left -2`61px'
            },
            '.xui-uibar-top-s .xui-uibar-tdm':{
                $order:3,
                'background-position': 'left -283px',
                'background-repeat': 'repeat-x'
            },
            '.xui-uibar-top-s .xui-uibar-tdr':{
                $order:3,
                'padding-left':'4px',
                'background-position': 'right -305px'
            },
            '.xui-uibar-top-s .xui-uibar-cmdl':{
                $order:3,
                display:'none'
            },
            '.xui-uibar-top-s .xui-uibar-cmdr':{
                $order:3,
                display:'none'
            },
//uibar-bottom-s
            '.xui-uibar-bottom-s, .xui-uibar-bottom-s .xui-uibar-t':{
                $order:3,
                height:'6px'
            },
            '.xui-uibar-bottom-s .xui-uibar-tdl':{
                $order:3,
                height:'100%',
                'padding-left':'4px',
                'background-position': 'left -327px'
            },
            '.xui-uibar-bottom-s .xui-uibar-tdm':{
                $order:3,
                'background-position': 'left -349px',
                'background-repeat': 'repeat-x'
            },
            '.xui-uibar-bottom-s .xui-uibar-tdr':{
                $order:3,
                'padding-left':'4px',
                'background-position': 'right -371px'
            }
        })
        + xui.UI.buildCSSText({
            '.xui-ui-unselectable':{
                $order:0,
                '-moz-user-select': xui.browser.gek?'-moz-none':null,
                '-khtml-user-select': xui.browser.kde?'none':null,
                '-webkit-user-select': xui.browser.kde?'none':null,
                '-o-user-select':xui.browser.opr?'none':null,
                '-ms-user-select':(xui.browser.ie||xui.browser.newie)?'none':null,
                'user-select':'none'
            },
            '.xui-ui-selectable':{
                $order:1,
                '-moz-user-select': xui.browser.gek?'text':null,
                '-khtml-user-select': xui.browser.kde?'text':null,
                '-webkit-user-select': xui.browser.kde?'text':null,
                '-o-user-select':xui.browser.opr?'text':null,
                '-ms-user-select':(xui.browser.ie||xui.browser.newie)?'text':null,
                'user-select':'text'
            },
            '.xui-ui-ctrl':{
                cursor:'default',
                'font-family':'arial,helvetica,clean,sans-serif',
                'font-style':'normal',
                'font-weight':'normal',
                'font-size':'12px',
                'vertical-align':'middle'
            },
            '.xui-uiw-shell':{
                background:'transparent',
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                //overflow:'hidden',
                /*opera must be 0 not 'none'*/
                border:0,
                padding:0,
                margin:0
            },
            /*span*/
            '.xui-uiw-frame':{
                $order:1,
                display:'block',
                position:'relative',
                //overflow:'hidden',
                border:0,
                padding:0,
                margin:0,
                width:'100%',
                height:'100%',
                '-moz-box-flex':'1'
            },
            /*span*/
            '.xui-uiw-border':{
                $order:2,
                display:'block',
                position:'absolute',
                border:0,
                padding:0,
                margin:0,
                left:0,
                top:0,
                width:'100%',
                height:'100%'
            }
        })
        + xui.UI.buildCSSText({
            '.xui-uibg-base':{
                'background-color':'#fff'
            },
            '.xui-uibg-content':{
                'background-color':'#fff'
            },
            '.xui-uibg-bar':{
                'background-color':'#aad2fa'
            },
            '.xui-uiborder-linkbottombar':{
                'border-bottom':'solid 1px #FAD600'
            },
            '.xui-uibg-bar-mouseover':{
                'background-color':'#C8E1FA'
            },
            '.xui-hiddenborder':{
                border:'solid 1px #FFFFFF'
            },
            '.xui-hiddenborder-mouseover':{
                border:'solid 1px #aad2fa'
            },
            '.xui-hiddenborder-mousedown,.xui-hiddenborder-checed':{
                border:'solid 1px #648cb4'
            },
            '.xui-uiborder-flat':{
                border:'solid 1px #648cb4'
            },
            '.xui-uiborder-l':{
                'border-left-style':'solid',
                'border-left-width':'1px',
                'border-left-color':'#c8e1fa'
            },
            '.xui-uiborder-t':{
                'border-top-style':'solid',
                'border-top-width':'1px',
                'border-top-color':'#c8e1fa'
            },
            '.xui-uiborder-r':{
                'border-right-style':'solid',
                'border-right-width':'1px',
                'border-right-color':'#648cb4'
            },
            '.xui-uiborder-b':{
                'border-bottom-style':'solid',
                'border-bottom-width':'1px',
                'border-bottom-color':'#648cb4'
            },
            '.xui-uiborder-r2':{
                'border-right-style':'solid',
                'border-right-width':'1px',
                'border-right-color':'#A2BBD9'
            },
            '.xui-uiborder-b2':{
                'border-bottom-style':'solid',
                'border-bottom-width':'1px',
                'border-bottom-color':'#A2BBD9'
            },
            '.xui-uiborder-tb':{
                'border-style':'solid',
                'border-width':'1px 0 1px 0 ',
                'border-top-color':'#c8e1fa',
                'border-bottom-color':'#648cb4'
            },
            '.xui-uiborder-lr':{
                'border-style':'solid',
                'border-width':'0 1px 0 1px',
                'border-left-color':'#c8e1fa',
                'border-right-color':'#648cb4'
            },
            '.xui-uiborder-lt':{
                'border-style':'solid',
                'border-width':'1px 0 0 1px',
                'border-left-color':'#c8e1fa',
                'border-top-color':'#c8e1fa'
            },
            '.xui-uiborder-rb':{
                'border-style':'solid',
                'border-width':'0 1px 1px 0',
                'border-right-color':'#648cb4',
                'border-bottom-color':'#648cb4'
            },
            '.xui-uiborder-rb2':{
                'border-style':'solid',
                'border-width':'0 1px 1px 0',
                'border-right-color':'#A2BBD9',
                'border-bottom-color':'#A2BBD9'
            },
            '.xui-uiborder-outset':{
                $order:8,
                border:'solid 1px',
                'border-color':'#c8e1fa #648cb4 #648cb4 #c8e1fa'
            },
            '.xui-uiborder-inset':{
                $order:9,
                border:'solid 1px',
                'border-color':'#648cb4 #c8e1fa #c8e1fa #648cb4'
            },
            '.xui-uiborder-none':{
                $order:10,
                border:'none'
            }
        });

        xui.UI.$cache_css2 += xui.UI.buildCSSText({
            '.xui-css-noscroll, .xui-css-noscroll body':{
                'overflow':'hidden',
                'overflow-x':'hidden',
                'overflow-y':'hidden'
            },
            '.xui-css-noscrollx, .xui-css-noscroll body':{
                'overflow-x':'hidden'
            },
            '.xui-css-noscrolly, .xui-css-noscroll body':{
                'overflow-y':'hidden'
            },
            '.xui-css-dockparent':{
                overflow:'hidden'
             },
            '.xui-ui-dirty':{
                $order:1,
                'background-image': xui.UI.$bg('icons.gif', '', true),
                'background-repeat': 'no-repeat',
                'background-position':'-390px -290px'
            },
            // Firefox will ignore input:read-only
            'input[readonly], textarea[readonly], .xui-ui-readonly, .xui-ui-inputreadonly, .xui-ui-itemreadonly, .xui-ui-readonly, .xui-ui-itemreadonly *, .xui-ui-readonly *':{
                $order:2,
                color: '#808080'
            },
            '.xui-ui-itemreadonly input, .xui-ui-readonly textarea, .xui-ui-itemreadonly textarea':{
                $order:3,
                color: '#909090'
            },
            'input:disabled, button:disabled, a:disabled,  .xui-ui-inputdisabled, .xui-ui-itemdisabled, .xui-ui-disabled *, .xui-ui-itemdisabled *':{
                $order:2,
                cursor:'not-allowed',
                color: '#808080'
            },
            'input:disabled, button:disabled, a:disabled,  .xui-ui-inputdisabled, .xui-ui-itemdisabled, .xui-ui-disabled input, .xui-ui-itemdisabled input, .xui-ui-disabled textarea, .xui-ui-itemdisabled textarea':{
                $order:3,
                'background-color':'#eee'
            },
            '.xui-ui-invalid, .xui-ui-invalid *':{
                $order:1,
                'background-color': '#FFEBCD'
            },
            '.xui-item-row':{
                display:"block",
                'white-space': 'nowrap'
            },
            '.xui-ui-busy':{
                 'background-image': 'url('+xui.ini.img_busy+')',
                'background-repeat':'no-repeat', 
                'background-position': 'center center'
            },
            '.xui-uicmd-toggle-busy':{
                $order:7,
                'background-image': 'url('+xui.ini.img_busy+')',
                'background-repeat':'no-repeat', 
                'background-position': 'center center'
            },
            '.xui-uicmd-toggle2-busy':{
                $order:7,
                'background-image': 'url('+xui.ini.img_busy+')',
                'background-repeat':'no-repeat', 
                'background-position': 'center center'
            },
            ".xui-busy":{
                "background-image":"url(data:image/gif;base64,R0lGODlhEAAQAOMAAAQCBHx+fLy+vOTm5ERCRMTGxISGhAQGBISChMTCxOzq7FRSVMzKzP7+/gAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCQANACwAAAAAEAAQAAAESrDJSau9OOvNe1VFonCFIBRcIiQJp7BjNySDxRjMNAQBUk+FAwCAaiR6gURhsUgYhgCEZIDgDRYEwqIALTZmNay2UTB4KwKmwBIBACH5BAkJAA8ALAAAAAAQABAAgwQCBHx+fLy+vERCRKSmpOTi5BQWFNTW1KyurIyKjMTCxERGRPTy9BwaHLSytP7+/gRE8MlJq7046827n47RIJwBAEZ5phsikg9TMNZBHBMj7PR0DEDco7ATFA6JhA04IEh0AgUjEQgomcLY7EG1PmzZClJpiQAAIfkECQkADQAsAAAAABAAEAAABEewyUmrtcywWxn4BTcZH4CIUlGGaFMYbOsuSywuBLHIuC4LNEFrkBjIBoEAwmhRFBKKRDKQuBQEgsIAoWRWEoJEleitRKGWCAAh+QQJCQAPACwAAAAAEAAQAIMEAgR8fny8vrxEQkSkpqTk4uQUFhTU1tSsrqyMiozEwsRERkT08vQcGhy0srT+/v4ERfDJ6UxDM2sDgHkHcWgT5x1DOpKIhRDpQJAaqtK1iJNHkqy7RyIQSAQlw+IR5APiGAXGkiGoSoOFqqBwpAoU1yA0vJxEAAAh+QQJCQANACwAAAAAEAAQAAAES7DJWdYqMzdmWFsEsTRDMkwMoFbhMgQBcjaGCiCCJQhwkEgFG2YyQMRmjYJhmCkhNVBFoqCAQgu7nzWTECS0W4k0UQ2bz+i0en2OAAAh+QQJCQAPACwAAAAAEAAQAIMEAgR8fny8vrxEQkSkpqTk4uQUFhTU1tSsrqyMiozEwsRERkT08vQcGhy0srT+/v4ERfDJeVI6M79DcApB8jAFQy3DUIEJI7zmQ6RDZx3FKxTSQWMTl0AR23Q0o5LEYWggkEgDAGCAaqRUawbRfGq/4LB4TC5DIwAh+QQJCQANACwAAAAAEAAQAAAER7DJqUpSM7eRRkuCUGjSgAQIJyQJ+QXwxWLkAKeuxnm5VCyLVk+yIBAWQ6IRmRQABclJwcCIMg4AwGhoyAIQyYJ3O5ySo9EIACH5BAkJAA8ALAAAAAAQABAAgwQCBHx+fLy+vERCRKSmpOTi5BQWFNTW1KyurIyKjMTCxERGRPTy9BwaHLSytP7+/gRG8MlJ62SFWcuE19tUeEIRXp4Cng+2hkeSHKyUBEFSP3e+x7Od5ECg1Q6LwcB4IigHBETD4NgcngcDAGCAFR9a7g5hMCAsEQA7)",
                "background-repeat":"no-repeat",
                "background-position":"center center"
            },
            ".xui-required":{
                "color":"#ff0000"
            },
            ".xui-err":{
                "background-image":"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAJdnBBZwAAABAAAAAQAFzGrcMAAADdSURBVCjPfdGxTsJQGIbhpw20GgN1IZQBDQnGxvu/FEU3IjEBB5SKUsGkdTiCYeGb/pw803uixum1iMJ1KZdp40dpYQWNqBERuXItRY1YrPJspmm0wNAYlZkvdPR1jTVmtJAZgUhliaWFQs9IqYwxkKhUUnf64NuTD6kBMTK8mKgkigNZaGQBJGqfVh6PyFotCWC/NxMbiUL+/xhjJ9Y5kEriVk9HbBdAKZI7A+8ebLQVhigDmNvqKg7k3kZbamceOpSmbvSkXq1xIfSfKh2lPlf/pWa7Tx3A6c86vV+v4FNOkQDWwAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMC0wMi0xMVQxMTo1MDowOC0wNjowMNYQZfsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMDYtMDUtMDVUMTM6MjI6NDAtMDU6MDC/5P4aAAAAAElFTkSuQmCC)",
                "background-repeat":"no-repeat",
                "background-position":"center center"
            }
        });
    },
    $End:function(){
        var hash={},keys=this.$Keys;
        _.filter(this.getAppearance(),function(o,i){
            var arr1=i.split(/\s*,\s*/),arr2;
            for(var l=arr1.length-1;l>=0;l--){
                arr2=arr1[l].match(/[A-Z][A-Z0-9]*/g);
                if(arr2&&arr2.length){
                    for(var j=0,m=arr2.length;j<m;j++){
                        if(!keys[arr2[j]]){
                            arr1.splice(l,1);
                            break;
                        }
                    }
                }
            }
            if(arr1.length)hash[arr1.join(", ")]=o;
        });
        this.setAppearance(hash);        
        xui.UI.$cache_css += this.buildCSSText(this.$Appearances);
    },
    Static:{
        $cache_css:'',
        $cache_css2:'',
        $css_tag_dirty: "xui-ui-dirty",
        $css_tag_invalid: "xui-ui-invalid",
        $tag_left:"{",
        $tag_right:"}",
        $tag_subId:"_serialId",


        $x01:/\x01/img,
        $x01r:/ \x01 /img,

        $tag_special:'\x01',
        $ID:"\x01id\x01",
        $DOMID:'\x01domid\x01',
        $CLS:"\x01cls\x01",
        $MODULECLS:"\x01modulecls\x01",
        $childTag:"<!--\x03{id}\x04-->",

        $onSize:function(profile,e){
            var style = profile.getRootNode().style;
            if(e.width||e.height)
                xui.UI.$tryResize(profile, style.width, style.height);
            style=null;
        },
        $ps:{left:1,top:1,width:1,height:1,right:1,bottom:1},
        objectProp:{},
        $toDom:function(profile, str, addEventHandler){
            if(addEventHandler===false)
                return _.str.toDom(str);

            //must use empty div for RenderTriggers
            var matrix=xui.Dom.getEmptyDiv().get(0), r=[];
            // for control size
            matrix.style.position='relative';
            matrix.innerHTML=str;
            //add event handlers
            this.$addEventsHanlder(profile, matrix);
            for(var i=0,t=matrix.childNodes,l=t.length;i<l;i++){
                //ensure the root nodes
                xui.$registerNode(t[i]);
                r[r.length]=t[i].$xid;
            }
            matrix=null;
            return xui(r,false);
        },
        $evtsindesign:{
            "onload":1,
            "onerror":1,
            "onscroll":1,
            "onunload":1,
            "onsize":1,
            "onmousedown":1,
            "onmouseup":1
        },
        _handleEventConf:function(conf, args){
            var ns=this;
        },
        $addEventsHanlder:function(profile, node, includeSelf){
            var ch=xui.$cache.UIKeyMapEvents,
                eh=xui.Event._eventHandler,
                hash=this.$evtsindesign,
                handler=xui.Event.$eventhandler,
                children=_.toArr(node.getElementsByTagName('*')),
                i,l,j,k,id,t,v;

            if(includeSelf)
                children.push(node);
            if(l=children.length){
                for(i=0;i<l;i++){
                    if((node=children[i]).nodeType!=1)continue;
                    if(id=node.id){
                        if(t = ch[id] || ch[id.substr(0,id.indexOf(':'))] ){
                            v=xui.$registerNode(node);
                            v=v.eHandlers||(v.eHandlers={});
                            for(j in t){
                                if(profile.$inDesign && !hash[j])continue;
                                //attach event handler to domPurgeData
                                v[j]=t[j];
                                //attach event handler to dom node
                                if(k=eh[j]){
                                    v[k]=node[k]=t[j];
                                    if(xui.browser.isTouch && k=='onmousedown'){
                                        xui.setNodeData(node, ['eHandlers', 'onxuitouchdown'], handler);
                                        if(node.addEventListener){
                                            node.addEventListener("xuitouchdown", handler,false);
                                        }else if(node.attachEvent){
                                            node.attachEvent("xuitouchdown", handler);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            children.length=0;
            node=t=null;
        },
        setDftProp:function(prop){
            this.__resetDftProp=prop;
            return this;
        },
        getFromDom:function(id){
            if(id=xui.UIProfile.getFromDom(id))
                return id.boxing();
        },
        _ensureValues:function(arr){
            var a=[],i=0,k=0,o,key=this.KEY,cache=xui.$cache.profileMap,getData=xui.getNodeData;
            if(arr['xui.absBox'])arr=arr._nodes;
            for(;o=arr[i++];)
                if((o.box && o.box[key]) || ((o=cache[getData(o.renderId?o.renderId:o,['element','id'])]) && o.box && o.box[key]))
                    a[k++]=o;
            return a.length<=1?a:this._unique(a);
        },

        __gc:function(){
            var self=this, k=self.$key, cache=xui.$cache;
            //clear templates memory in xui.$cache
            _.breakO([cache.template[k], cache.reclaimId[k], self._cache, self._idCache, self.$DataModel, self.$Templates,  self.$Behaviors, self],2);
            delete xui.absBox.$type[k.replace("xui.UI.","")];
            delete xui.absBox.$type[k];
            _.filter(xui.$cache.UIKeyMapEvents,function(o,i){
                return !(i==k||i.indexOf(k+'-')==0);
            });
            // add for base class
            Class.__gc(k);
        },
        _pickSerialId:function(){
            //get id from cache or id
            var arr = xui.$cache.reclaimId[this.$key];
            if(arr && arr[0])return arr.pop();
            return this._ctrlId.next();
        },
        $bg:function(path, paras, forceKey){
            return function(key){
                var p=xui.ini.path + 'appearance/default/'+ (typeof forceKey=='string'?forceKey:forceKey?'Public':(p=key.split('.'))[p.length-1]) + "/" + path;
                //_.asyRun(function(){new Image().src=p;});
                return 'url(' + p +') '+ (paras||'');
            }
        },
        $ieBg:function(path,  forceKey){
            return function(key){
                var p=xui.ini.path + 'appearance/default/'+ (typeof forceKey=='string'?forceKey:forceKey?'Public':(p=key.split('.'))[p.length-1]) + "/" + path;
                //_.asyRun(function(){new Image().src=p;});
                return 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+p+'",sizingMethod="crop")';
            }
        },

       /* deep template function
          template: string
          properties: hash

          $doTemplate("{a}{b}{c}{a}{b}{/c}", {a:'*',b:'#',c:[{a:'1',b:'.'},{a:'2',b:'.'},{a:'3',b:'.'},{a:'4',b:'.'}]})
              will return "*#1.2.3.4."
          doTemplate("{a}{b}{c}{}{/c}", {a:'*',b:'#',c:['1','2','3','4']})
              will return "*#1234"

          flag: default flase => no clear not mactched symbols
        */
        $doTemplate:function(profile, template, properties, tag, result, index, realtag){
            var self=arguments.callee,
                s,t,n,
                x01=xui.UI.$x01,
                x01r=' \x01 ',
                str='',
                isA = _.isArr(properties),
                // this one maybe a fake tamplate tag, for switch function
                temp = template[tag||''],
                r = !result,
                result= result || [];
            // get the real tag
            tag = realtag||tag;
            if(isA){
                if(typeof temp != 'function')temp = self;
                for(var i=0;t=properties[i++];){
                    if(false===temp(profile, template, t, tag, result, i)){
                        break;
                    }
                }
            }else{
                if(t=properties.object){
                    //[properties] is for xui.Template
                    result[result.length]=t.toHtml();
                }else{
                    if(typeof temp == 'function'){
                        t=temp(profile, template, properties, tag, result);
                        if(t)tag=t;
                    }else{
                        tag = tag?tag+'.':'';
                        var a0=temp[0], a1=temp[1];
                        for(var i=0,l=a0.length;i<l;i++){
                            if(n=a1[i]){
                                if(n in properties){
                                    t=properties[n];
                                    //if sub template exists
                                    if(template[s=tag+n] && t)
                                        self(profile, template, t, s, result);
                                    else
                                        result[result.length]= (t===undefined || t===null || t===NaN)?str:typeof t=='string'?t.replace(x01,x01r):t;
                                }
                            }else
                                result[result.length]=(a0[i]===undefined || a0[i]===null || a0[i]===NaN)?str:a0[i];
                        }
                    }
                }
            }
            if(r)return result.join('');
        },
        /*
        set properties default map and set properties handler
        It's a merge function, not replace

        this.$DataStruct: {a:,b:,c}
        this.$DataModel: from hash, for example:
        hash:{
            key1:{
                ini:xx,
                set:fun..,
                get:fun..,
                action: fun
            },
            key2:null,
            key3:'abc
        }
        */
        $buildTemplate:function(profile, template, key, obj, arr){
            if(template && (template.tagName+"").toLowerCase()=='text'){
                arr[arr.length] = template.text;
                return;
            }
            var self =arguments.callee,
                behavior = profile.behavior?key?profile.behavior[key]:profile.behavior:null,
                prop=profile.properties,
                map1 = self.map1 ||(self.map1={tagName:1,text:1}),
                map2 = self.map2 ||(self.map2={image:1,input:1,br:1,meta:1,hr:1,abbr:1,embed:1}),
                map3 = self.map3 ||(self.map3={input:1,textarea:1,pre:1,code:1}),
                r2=self.r2||(self.r2=/[a-z]/),
                r3=self.r3 || (self.r3=/^(on|before|after)/),
                r7=self.r7 || (self.r7=/([^{}]*)\{([\w]+)\}([^{}]*)/g),
                first=false,
                u=xui.UI,
                t, o , bak, tagN,lkey;

            if(!template)template=profile.template;
            lkey = key?profile.keys[key]:profile.key;

            //tagName
            if(!template.tagName)template.tagName="span";

            if(template.id!==null)
                //id
                template.id = key?lkey + ":" + u.$ID + ":" + u.$tag_left + u.$tag_subId + u.$tag_right:u.$DOMID;
            else
                delete template.id;

            if(template.className!==null){
                //save bak
                bak = template.className || '';
                if(!template._NativeElement){
                    //className
                    t = u.$CLS + (key?'-'+key.toLowerCase():'');
                    tagN = template.tagName.charAt(0)!="{"?template.tagName.toLowerCase():template.tagName;
    
                    //default class first
                    template['class'] =  'xui-node xui-node-'+tagN+' ' + t+' '+
                        //custom class here
                        bak + ' ' +
                        //add a special
                        (lkey==profile.key ? ('xui-ui-ctrl '+((xui.browser.ie && xui.browser.ver<10)?'':'{_selectable} ')) : '' );
                }else{
                    //default class first
                    template['class'] =  bak + ' ' +
                        //add a special
                        (lkey==profile.key ? ((xui.browser.ie && xui.browser.ver<10)?'':'{_selectable} ') : '' ) ;
                }
                template['class'] +=  '' +
                    //custom theme
                    u.$tag_special + (key||'KEY') + '_CT'+u.$tag_special + ' ' +
                    //custom class
                    u.$tag_special + (key||'KEY') + '_CC'+u.$tag_special + ' '+
                    u.$MODULECLS +" xui-custom"
            }
            delete template.className;

            template.style = (template.style?(template.style + ';'):'') 
                + u.$tag_special + (key||'KEY') + '_CS'+u.$tag_special;

            var a=[], b={},
                tagName=template.tagName.charAt(0)!="{"?template.tagName.toLowerCase():template.tagName,
                text= template.text,
                sc=xui.absObj.$specialChars;

            for(var i in template){
                if(!template[i])continue;
                if(!sc[i.charAt(0)] && !map1[i]){
                    o=template[i];
                    if(!r2.test(i)){
                        // collect sub node
                        if(typeof o == 'object'){
                            if(!o.$order)o.$order=0;
                            o.$key=i;
                            a[a.length]=o;
                        }
                    }else
                        b[i]=o;
                }
            }
            // sort sub node
            _.arr.stableSort(a,function(x,y){
                x=x.$order||0;y=y.$order||0;
                return x>y?1:x==y?0:-1;
            });

            //first
            if(!arr){
                first=true;
                arr=[];
            }
            //<span id="" style="">
            arr[arr.length]='<'+tagName+' ';

            for(var i in b)
                if(b[i])
                    arr[arr.length]=i+'="'+b[i]+'" ';

            //set className bak
            if(template.className!==null)
                template.className = bak;

            delete template['class'];

            arr[arr.length]= u.$tag_special + (key||'KEY') + '_CA'+u.$tag_special;
            arr[arr.length]='>';

            if(!map2[tagName] && text)
                arr[arr.length]=text;

            // add sub node
            for(var i=0,l=a.length;i<l;){
                o=a[i++];
                self(profile, o, o.$key, obj, arr)
            }
            if(!map2[tagName])
                arr[arr.length]='</'+tagName+'>';

            if(first){
                var a0=obj[0],a1=obj[1],str=arr.join(''),has=false;
                str.replace(r7,function(a,b,c,d){
                    if(b)a0[a0.length]=b;
                    a1[a0.length]=a0[a0.length]=c;
                    if(d)a0[a0.length]=d;
                    has=true;
                    return '';
                });
                if(!has){a0[0]=str;}
            }
        },
        _rpt:function(profile,temp){
            var me=arguments.callee,
                host = profile.host,
                moduleCls = (host&&host['xui.Module']&&host.customStyle&&!_.isEmpty(host.customStyle))?(" xui-module-"+host.$xid):null,
                ui=xui.UI,
                tag=ui.$tag_special,
                ca=function(h,s,i){
                    s="";
                    for(i in h)s+= (i+'="'+h[i]+'" ');
                    return s;
                },
                r=me._r||(me._r=new RegExp( tag+'([0-9A-Z_]+)_C([CTA])'+tag + '|'+ tag+'([\\w_\\-\\.]*)'+tag, 'img')),
                h1={
                    id:profile.serialId,
                    cls:profile.getClass('KEY'),
                    domid:profile.$domId,
                    modulecls:moduleCls
                },
                h2={
                    A:profile.CA,
                    C:profile.CC,
                    T:profile._CT
                };
            return temp.replace(r, function(a,b,c,d){
                return h1[d] || (h2[c]? (c=="A"?ca(h2[c][b]) : (h2[c][b]||"")):'');
            }).replace(ui.$x01r,'\x01');
        },
        _build:function(profile, data){
            var template, t, m,
                u=xui.UI,
                temp=[[],[]],
                self=this,
                key=self.KEY,
                cache=xui.$cache.template,
                hash = profile._hash =
                    'b:' + (profile.template._subid||'') + ';' +
                    '!' + (profile._exhash||'');

            //build custom theme hash here
            if(typeof profile.theme == "string"){
                var h=profile._CT={},
                    pre=profile.key.replace(/\./g,'-').toLowerCase().replace('xui-ui','xui')+"-";
                _.each(profile.keys,function(o,i){
                    if(i.charAt(0)!='$')
                        h[i]=pre + profile.theme + "-" + i.toLowerCase();
                });
            }
            //get template
            if(!(template = _.get(cache,[key, hash]))){

                //get main template
                u.$buildTemplate(profile,null,null,temp);
                //split sub template from main template

                //set main template
                _.set(cache, [key, hash, ''], temp);
                //set sub template
                if(t=profile.template.$submap)
                    for(var i in t){
                        if(typeof (m=t[i])!='function'){
                            var temp=[[],[]];
                            for(var j in m)
                                if(typeof m[j] == 'object')
                                    u.$buildTemplate(profile, m[j], j, temp);
                            m=temp;
                        }
                        _.set(cache, [key,hash,i], m);
                    }

                template = _.get(cache,[key, hash]);
            }
            if(!template)return '';

            //replace main template
            return self._rpt(profile, u.$doTemplate(profile, template, data));
        },
        /*
        allow function input, for some css bug
        */
        _setDefaultBehavior:function(hash){
            var self=this,
                me=arguments.callee,
                map=me._m||(me._m={'':1,KEY:1,$key:1}),
                f=me._f1||(me._f1=function(arr, type, mode){
                    var fun = function(profile, e, src){
                        var t,
                            id=xui.use(src).id(),
                            item,
                            cid = profile.getSubId(id),
                            prop = profile.properties,nodes,funs,box;
                        if(prop.disabled || prop.readonly)return;
                        item = profile.SubSerialIdMapItem && profile.SubSerialIdMapItem[cid];
                        if(item && item.disabled)return;
                        if(item && item.readonly)return;
                        switch(typeof arr){
                            case 'string':
                                nodes=profile.getSubNode(arr,cid)._get();
                                break;
                            case 'function':
                                funs=[arr];
                                break;
                            case 'object':
                                nodes=[];funs=[];
                                for(var o,i=0,l=arr.length;i<l;i++){
                                    o=arr[i];
                                    if(typeof o=='string')
                                        nodes.push.apply(nodes,profile.getSubNode(o,cid)._get());
                                    else
                                        funs.push(o);
                                }
                        }

                        if(nodes&&nodes.length){
                            nodes=xui(nodes);
                            box=profile.boxing();
                            if(mode==1){
                                if(type=='mouseover'){
                                    if(profile.$beforeHover && false == profile.$beforeHover(profile, item, e, src, 'mouseover'))
                                        return;
                                    if(prop.disableHoverEffect)
                                        return;
                                    if(profile.beforeHoverEffect && false === box.beforeHoverEffect(profile, item, e, src, 'mouseover'))
                                        return;
                                }
                                if(type=='mousedown'){
                                    if(profile.$beforeClick&& false==profile.$beforeClick(profile, item, e, src, 'mousedown'))
                                        return;
                                    if(prop.disableClickEffect)
                                        return;
                                    if(profile.beforeClickEffect && false === box.beforeClickEffect(profile, item, e, src, 'mousedown'))
                                        return;
                                }

                                //default action
                                nodes.tagClass('-'+type);
                            }else{
                                if(type=='mouseup'){
                                    if(profile.$beforeClick&& false==profile.$beforeClick(profile, item, e, src, 'mouseup'))
                                        return;
                                    if(prop.disableClickEffect)
                                        return;
                                    if(profile.beforeClickEffect && false === box.beforeClickEffect(profile, item, e, src, 'mouseup'))
                                        return;
                                    nodes.tagClass('-mousedown', false);
                                }else{
                                    if(profile.$beforeHover && false == profile.$beforeHover(profile, item, e, src, 'mouseout'))
                                        return;
                                    if(prop.disableHoverEffect)
                                        return;
                                    if(profile.beforeHoverEffect && false === box.beforeHoverEffect(profile, item, e, src, 'mouseout'))
                                        return;
                                    nodes.tagClass('(-mouseover|-mousedown)', false);
                                }
                            }
                        }
                        if(funs&&funs.length){
                            _.arr.each(funs,function(o){
                                _.tryF(o,[profile],profile)
                            });
                            funs.length=0;
                        }
                   };
                    return fun;
                }),
                hls={},t;
            if(!xui.SC.get('xui.absContainer'))
                Class('xui.absContainer','xui.absObj',{
                    Instance:{
                        addPanel:function(paras, children, item){
                            var pro = _.clone(xui.UI.Panel.$DataStruct,true);
                            _.merge(pro, paras, 'with');
                            _.merge(pro,{
                                dock:'fill',
                                tag:paras.tag||paras.id
                            },'all');

                            var pb = new xui.UI.Panel(pro),arr=[];
                            this.append(pb, item&&item.id);
                            _.arr.each(children,function(o){
                                arr.push(o[0]);
                            });
                            pb.append(xui.UI.pack(arr,false));
                            return this;
                        },
                        removePanel:function(){
                            this.destroy(true);
                        },
                        getPanelPara:function(){
                            return _.clone(this.get(0).properties,true);
                        },
                        dumpContainer:function(subId){
                            return this.each(function(profile){
                               var dm = profile.box.$DataModel,
                                    s = dm.valueSeparator||";",
                                    p = profile.properties,
                                    hasitems='items' in p,
                                    b,id,arr,con;
                                if(!hasitems){
                                    if(con=profile.boxing().getContainer())con.html("",true);
                                }else{
                                    _.arr.each(p.items, function(item){
                                        id = item.id;
                                        if(!subId || subId===true){
                                            b=1;
                                        }else{
                                            arr = _.isArr(subId)?subId:(subId+"").split(s);
                                            b=_.arr.indexOf(arr, id)!=-1;
                                        }
                                        if(b){
                                            if(con=profile.boxing().getContainer(id))con.html("",true);
                                        }
                                    });
                                }
                            });
                        },
                        getPanelChildren:function(){
                            return this.get(0).children;
                        },
                        getFormValues:function(dirtied, subId, withCaption){
                            var hash={};
                            this.getFormElements(subId).each(function(prf){
                                var p=prf.properties,
                                    ins = prf.boxing(),
                                    // maybe return array
                                    uv = ins.getUIValue();
                                // v and uv can be object(Date,Number)
                                if(!dirtied || (uv+" ")!==(ins.getValue()+" ")){
                                    if(withCaption && ins.getCaption){
                                        hash[p.name||prf.alias]={value:uv,caption:ins.getCaption()};
                                    }else{
                                        hash[p.name||prf.alias]=uv;
                                    }
                                }
                            });
                            return hash;
                        },
                        setFormValues:function(values, subId){
                            if(!_.isEmpty(values)){
                                this.getFormElements(subId).each(function(prf){
                                    if('value' in prf.properties && (prf.properties.name||prf.alias) in values){
                                        var v=values[prf.properties.name||prf.alias],b=_.isHash(v) ;
                                        prf.boxing().setValue((b && ('value' in v)) ? v.value : v, true,'module');
                                        if(typeof(prf.boxing().setCaption)=="function" &&  b  && 'caption' in v)
                                            prf.boxing().setCaption(v.caption, null, true,'module');
                                    }
                                });
                            }
                            return this;
                        },
                        getFormElements:function(subId, dirtiedOnly){
                            var a=this.getChildren(subId, false),
                                elems = xui.absValue.pack(a);
                            if(dirtiedOnly){
                                var arr=[],ins,t;
                                elems.each(function(p,z){
                                    ins = p.boxing();
                                    if( (ins.getUIValue()+" ")!==(ins.getValue()+" ")){
                                        arr.push(p);    
                                    }
                                });
                                return xui.absValue.pack(arr);
                            }
                            return elems;
                        },
                        isDirtied:function(subId){
                           var elems = this.getFormElements(subId).get();
                           for(var i=0,l=elems.length;i<l;i++){
                                var profile=elems[i],ins;
                                if(profile.box["xui.absValue"]){
                                    ins = profile.boxing();
                                    if((ins.getUIValue()+" ")!==(ins.getValue()+" ")){
                                        return true;
                                    }
                                }
                            }
                            return false;
                        },
                        checkValid:function(ignoreAlert, subId){
                            var profile=this.get(0), result=true;
                            this.getFormElements(subId).each(function(prf){
                                if(!prf.boxing().checkValid()){
                                    if(!ignoreAlert){
                                        if(!prf.beforeInputAlert || false!==prf.boxing().prf.beforeInputAlert(profile, prf, 'invalid')){
                                            xui.alert('$inline.invalid',xui.getRes('$inline.invalid') + (prf.properties.labelCaption?(" : " +prf.properties.labelCaption):"")  , function(){
                                                if(prf&&prf.renderId)
                                                       prf.boxing().activate();
                                            });
                                        }
                                        return result=false;
                                    }
                                     result=false;
                                }
                            });
                            return result;
                        },
                        checkRequired:function(ignoreAlert, subId){
                            var result=true;
                            this.getFormElements(subId).each(function(prf, i){
                                if(prf.properties.required && (!(i=prf.boxing().getUIValue())) && i!==0){
                                    if(!ignoreAlert){
                                        if(!prf.beforeInputAlert || false!==prf.boxing().prf.beforeInputAlert(profile, prf, 'required')){
                                            xui.alert('$inline.required',xui.getRes('$inline.required') + (prf.properties.labelCaption?(" : " +prf.properties.labelCaption):"")  , function(){
                                                if(prf&&prf.renderId)
                                                       prf.boxing().activate();
                                            });
                                        }
                                        return result=false;
                                    }
                                    result=false;
                                }
                            });
                            return result;
                        },
                        formReset:function(subId){
                            return this.each(function(prf){
                                var p = prf.properties,
                                     elems = prf.boxing().getFormElements();
                                if(prf.beforeFormReset && false===prf.boxing().beforeFormReset(prf, elems, subId)){
                                        return;
                                }
                                elems.each(function(p,i){
                                        if((i=p.properties.$UIValue) !== p.properties.value)
                                        p.boxing().setValue(i, true);
                                });
                                if(prf.afterFormReset){
                                        prf.boxing().afterFormReset(prf, elems, subId);
                                }
                            });
                        },
                        formSubmit:function(ignoreAlert, subId){
                            var ns=this;
                            // check valid first
                            if(!ignoreAlert && !ns.checkValid()){
                                return;
                            }
                            var prf=ns.get(0),
                              p = prf.properties,
                              data = ns.getFormValues(subId),
                              apicaller;
                            // call before event
                            if(prf.beforeFormSubmit && false===prf.boxing().beforeFormSubmit(prf, data, subId)){
                                    return;
                            }
                            // and check required
                            if(!ignoreAlert && !ns.checkRequired()){
                                return;
                            }
                            // try to get APICaller
                            if(xui.APICaller && _.arr.indexOf(['_blank','_self','_parent','_top'],p.formTarget)==-1) {
                                apicaller = xui.APICaller.getFromName(p.formTarget);
                            }
                            if(apicaller){
                                apicaller.setQueryArgs(data);
                                apicaller.invoke();
                            }else{
                                xui.Dom.submit(p.formAction, data, p.formMethod, p.formTarget, p.formEnctype);
                            }
                            // update UI 
                            ns.getFormElements().updateValue();

                            if(prf.afterFormSubmit)prf.boxing().afterFormSubmit(prf, data, subId);
                        },
                        // use refrence to keep the Class's function mark
                        _e1:function(profile, item, e, src, type){},
                        _e2:function(profile, keyboard, e, src){},
                        _e3:function(profile, e, shiftKey, src){},
                        _e4:function(profile, e, src, dragKey, dragData, item){},
                        _e5:function(profile, e, src){},
                        _e6:function(profile, ctrlPrf, type){},
                        _e7:function(profile, elems, subId){},
                        _e8:function(profile, data, subId){}
                    },
                    Static:{
                        $abstract:true,
                        DataModel:{
                            dragKey:'',
                            dropKeys:'',
                            overflow:{
                                ini:xui.browser.isTouch?'auto':undefined,
                                combobox:['','visible','hidden','scroll','auto','overflow-x:auto;overflow-y:auto'],
                                action:function(v){
                                    var prf=this;
                                    _.arr.each(prf.box.$Behaviors.PanelKeys,function(k){
                                        var node=prf.getSubNode(k,true);
                                        if(v){
                                            if(v.indexOf(':')!=-1){
                                                _.arr.each(v.split(/\s*;\s*/g),function(s){
                                                    var a=s.split(/\s*:\s*/g);
                                                    if(a.length>1)node.css(_.str.trim(a[0]),_.str.trim(a[1]||''));
                                                });
                                                return;
                                            }
                                        }
                                        node.css('overflow',v||'');
                                    });
                                }
                            },
                            panelBgClr:{
                                type:'color',
                                ini:"",
                                action:function(v){
                                    var prf=this;
                                    _.arr.each(prf.box.$Behaviors.PanelKeys,function(k){
                                        prf.getSubNode(k,true).css('background-color',v);
                                    });
                                }
                            },
                            panelBgImg:{
                                format:'image',
                                ini:"",
                                action:function(v){
                                    var prf=this;
                                    _.arr.each(prf.box.$Behaviors.PanelKeys,function(k){
                                        prf.getSubNode(k,true).css('background-image',v?('url('+xui.adjustRes(v||'')+')'):'');
                                    });
                                }
                            },
                            panelBgImgPos:{
                                ini:"",
                                combobox:["","top left","top center","top right","center left","center center","center right","bottom left","bottom center","bottom right","0% 0%","-0px -0px"],
                                action:function(v){
                                    var prf=this;
                                    _.arr.each(prf.box.$Behaviors.PanelKeys,function(k){
                                        prf.getSubNode(k,true).css('background-position',v);
                                    });
                                }
                            },
                            panelBgImgRepeat:{
                                ini:"",
                                combobox:["","repeat","repeat-x","repeat-y","no-repeat"],
                                action:function(v){
                                    var prf=this;
                                    _.arr.each(prf.box.$Behaviors.PanelKeys,function(k){
                                        prf.getSubNode(k,true).css('background-repeat',v);
                                    });
                                }
                            },
                            panelBgImgAttachment:{
                                ini:"",
                                combobox:["","scroll","fixed"],
                                action:function(v){
                                    var prf=this;
                                    _.arr.each(prf.box.$Behaviors.PanelKeys,function(k){
                                        prf.getSubNode(k,true).css('background-attachment',v);
                                    });
                                }
                            },
                            conDockPadding:{
                                ini:{left:0,top:0,right:0,bottom:0},
                                action:function(){
                                    this.boxing().adjustDock(true);
                                }
                            },
                            conDockSpacing:{
                                ini:{width:0,height:0},
                                action:function(){
                                    this.boxing().adjustDock(true);
                                }
                            },
                            conDockFlexFill:{
                                ini:"",
                                combobox:['none','width','height','both'],
                                action:function(){
                                    this.boxing().adjustDock(true);
                                }
                            },
                            conDockStretch:{
                                ini:"",
                                combobox:['fixed','forward','rearward','stretch','0.25','0.33','0.5','0.25,0.5,0.25'],
                                action:function(){
                                    this.boxing().adjustDock(true);
                                }
                            },
                            formMethod:{
                                ini:'get',
                                listbox:['get','post']
                            },
                            formTarget:{
                                ini:'_blank',
                                combobox:['_blank','_self','_parent','_top','[framename]']
                            },
                           formAction:"",
                           formEnctype:{
                                ini:'application/x-www-form-urlencoded',
                                listbox:['application/x-www-form-urlencoded','multipart/form-data','text/plain']
                            }
                        }
                    }
                });
            var src=xui.absContainer.prototype;
            // form
            hls.beforeInputAlert=src._e6;
            hls.beforeFormReset=hls.afterFormReset=src._e7;
            hls.beforeFormSubmit=hls.afterFormSubmit=src._e8;
            
            if(hash.HoverEffected){
                _.each(hash.HoverEffected,function(o,i){
                    t=map[i]?hash:(hash[i]||(hash[i]={}));
                    if(!o)
                        t.afterMouseover = t.afterMouseout = null;
                    else{
                        t.afterMouseover = f(o,'mouseover', 1);
                        t.afterMouseout = f(o,'mouseout', 2);
                    }
                });
                hls.beforeHoverEffect=src._e1;
            }
            if(hash.ClickEffected){
                _.each(hash.ClickEffected,function(o,i){
                    t=map[i]?hash:(hash[i]||(hash[i]={}));
                    if(!o)
                        t.afterMousedown = t.afterMouseup = null;
                    else{
                        t.afterMousedown = f(o,'mousedown', 1);
                        t.afterMouseup = f(o,'mouseup', 2);
                    }
                });
                hls.beforeClickEffect=src._e1;
            }

            if(hash.HotKeyAllowed){
                //for onHotKey
                _.merge(hash,{
                    beforeKeydown:function(profile, e, src){
                        if(profile.onHotKeydown)
                            return false !== profile.boxing().onHotKeydown(profile,xui.Event.getKey(e),e, src);
                    },
                    beforeKeypress:function(profile, e, src){
                        if(profile.onHotKeypress)
                            return false !== profile.boxing().onHotKeypress(profile,xui.Event.getKey(e),e, src);
                    },
                    beforeKeyup: function(profile, e, src){
                        if(profile.onHotKeyup)
                            return false !== profile.boxing().onHotKeyup(profile,xui.Event.getKey(e),e, src);
                    }
                });
    
                hls.onHotKeydown=hls.onHotKeypress=hls.onHotKeyup=src._e2;
            }
            
            //for focus action
            if(hash.NavKeys){
                _.each(hash.NavKeys,function(o,i){
                    var map=arguments.callee, k, m1=map.m1||(map.m1={KEY:1,$key:1});
                    if(m1[i])return;
                    var m2=map.m2||(map.m2={input:1,textarea:1}),
                    m3=map.m3||(map.m3={tab:1,enter:1,up:1,down:1,left:1,right:1}),
                    m4=map.m4||(map.m4={tab:1,up:1,down:1,left:1,right:1}),
                    t=hash[i]||(hash[i]={});

                    var t=hash[i]||(hash[i]={});

                    if(null===o)
                        t.afterKeydown = null;
                    else{
                        t.afterKeydown = function(profile, e, src){
                            var k=xui.Event.getKey(e), key = k.key, ctrl=k.ctrlKey, shift=k.shiftKey, alt=k.altKey, b=false, smartnav=profile._smartnav;
                            if(smartnav){
                                var node=xui.use(src).get(0);
                                if(m2[k=node.tagName.toLowerCase()]){
                                    if(key && k=="input" && node.type.toLowerCase()!='text'&& node.type.toLowerCase()!='password'){
                                        b=true;
                                    }else if(m3[key]){
                                        var reg = xui.use(src).caret(),txt=xui.use(src).get(0).value;

                                        switch(key){
                                            case 'up':
                                                if(!/[\n\r]/.test(txt.substr(0,reg[0]))) b=true;
                                                break;
                                            case 'left':
                                                if(!shift && (ctrl || (reg[0]===0 && (reg[1]!==txt.length || reg[1]===0)))) b=true;
                                                break;
                                            case 'down':
                                                if(!/[\n\r]/.test(txt.substr(reg[1],txt.length))) b=true;
                                                break;
                                            case 'right':
                                                if(!shift && (ctrl || (reg[1]===txt.length && (reg[0]!==0 || reg[1]===0)))) b=true;
                                                break;
                                            case 'enter':
                                                if(k=='input' || alt)b=true;
                                                break;
                                            case "tab":
                                                b=true;
                                                break;
                                        }
                                    }
                                }else{
                                    if(m4[key])
                                        b=true;
                                }
                               node=null;
                            }else
                                b=key==='tab';

                            //hanlder focus
                            if(b){
                                //export event
                                if(profile.beforeNextFocus && false === profile.boxing().beforeNextFocus(profile,e,k.shiftKey,src))
                                    return false;

                                if(smartnav){
                                    if(key!='tab')
                                        xui.use(src).nextFocus(('up'==key || 'left'==key)?false:true);
                                }
                            }
                        }
                    }
                });
                hls.beforeNextFocus=src._e3;
            }
            if((t=hash.DroppableKeys) && t.length){
                _.arr.each(t,function(o){
                    self._droppable(o)
                });

                t=self.prototype;
                _.arr.each('addPanel,removePanel,dumpContainer,getPanelPara,getPanelChildren,getDropKeys,setDropKeys,getFormValues,setFormValues,getFormElements,isDirtied,checkValid,checkRequired,formReset,formSubmit'.split(','),function(o){
                    if(!t[o])t[o]=src[o];
                });
                self.$DataModel.dropKeys=self.$DataStruct.dropKeys='';
                hls.onDragEnter=hls.onDragLeave=hls.beforeDrop=hls.onDrop=hls.afterDrop=hls.onDropTest=hls.onDropMarkShow=hls.onDropMarkClear=src._e4;
            }
            if((t=hash.DraggableKeys)&& t.length){
                _.arr.each(t,function(o){
                    self._draggable(o)
                });
                t=self.prototype;
                _.arr.each('getDragKey,setDragKey'.split(','),function(o){
                    if(!t[o])t[o]=src[o];
                });
                self.$DataModel.dragKey=self.$DataStruct.dragKey='';
                hls.onGetDragData=hls.onStartDrag=hls.onDragStop=src._e5;
            }
            if((t=hash.NoDraggableKeys)&& t.length){
                self.NoDraggableKeys=t;
            }
            if((t=hash.NoDroppableKeys) && t.length){
                self.NoDroppableKeys=t;
            }
            if((t=hash.PanelKeys) && t.length){
                t=self.prototype;
                _.arr.each('overflow,panelBgClr,panelBgImg,panelBgImgPos,panelBgImgRepeat,panelBgImgAttachment,conDockPadding,conDockSpacing,conDockFlexFill,conDockStretch,formMethod,formTarget,formAction,formEnctype'.split(','),function(o){
                    var f='get'+_.str.initial(o),dm;
                    if(!t[f])t[f]=src[f];
                    f='set'+_.str.initial(o);
                    if(!t[f])t[f]=src[f];
                    dm=xui.absContainer.$DataModel[o];
                    self.$DataStruct[o]=_.isSet(dm.ini)?_.copy(dm.ini):"";
                    self.$DataModel[o]=_.copy(dm);
                });

                 _.merge(hls, xui.absContainer.$EventHandlers);

                 self['xui.absContainer']=true;
            }
            self.setEventHandlers(hls);
        },

        addTemplateKeys:function(arr){
            var self=this, key=self.KEY, me=arguments.callee, reg=me._reg||(me._reg=/\./g);
            _.arr.each(arr,function(i){
                self.$cssKeys[i]=(self.$Keys[i]=i=='KEY'?key:key+"-"+i).replace(reg,'-').toLowerCase().replace('xui-ui','xui');
            });
            return self;
        },
        $getCSSValue:function(cls, key){
            var cache=xui.$CSSCACHE,
                ck=cls+'->'+key;
            if(ck in cache)return cache[ck];
            var c=xui.Dom.getEmptyDiv().get(0),r;
            xui.Dom._setClass(c,cls);
            r=cache[ck]=parseInt(xui.Dom.getStyle(c,key),10)||0;
            xui.Dom._setClass(c,"");
            return r;
        },
        setAppearance:function(hash){
            _.merge(this.$Appearances,hash,'all');
            return this;
        },
        getAppearance:function(){
            return this.$Appearances;
        },
        /*replace mode*/
        setTemplate:function(hash, cacheId){
            if(hash){
                var self=this,
                    tagNames=self.$tagName||(self.$tagName={}),
                    me=arguments.callee,
                    r2=me.r2||(me.r2=/[a-z]/),
                    sc=xui.absObj.$specialChars,
                    _ks=['KEY'],
                    fun = me._fun || (me._fun=function(hash, arr, tagNames){
                        var o,i;
                        for(i in hash){
                            if(!sc[i.charAt(0)])
                                if(!r2.test(i)){
                                    arr[arr.length]=i;
                                    o=hash[i];
                                    if(typeof o == 'object'){
                                        tagNames[i]=o.tagName||'';
                                        arguments.callee(o, arr, tagNames);
                                    }
                                }
                        };
                    })
                    ,t;
                tagNames.KEY=hash.tagName||'';
                fun(hash,_ks, tagNames);
                self.addTemplateKeys(_ks);

                t = self.$Templates;

                // for sub template,
                if(typeof cacheId=='string'){
                    hash._subid = cacheId;
                    t[cacheId]=hash;
                }else
                    t._=hash;

                //set sub
                if(t=hash.$submap)
                    for(var i in t)
                        for(var j in t[i])
                            me.call(self, t[i], j);
            }
            return this;
        },
        getTemplate:function(cacheId){
            return this.$Templates[cacheId||'_'];
        },
        /*replace mode*/
        setBehavior:function(hash){
            if(hash){
                var self=this,
                    ch=xui.$cache.UIKeyMapEvents,
                    skey=self.$key,
                    check=xui.absObj.$specialChars,
                    handler = xui.Event.$eventhandler,
                    eventType=xui.Event._eventMap,
                    me=arguments.callee,
                    r1=me.r1||(me.r1=/[a-z]/),
                    r2=me.r2||(me.r2=/^(on|before|after)/),
                    t= self.$Behaviors,
                    m,i,j,k,o,v, type;
                //set shortcut first
                self._setDefaultBehavior(hash);
                //merge KEY
                if(hash.KEY){
                    _.merge(hash, hash.KEY, 'all');
                    delete hash.KEY;
                }

                //merge hash
                for(i in hash){
                    o=hash[i];
                    if(!check[i.charAt(0)]){
                        //only two layer
                        if(!r1.test(i)){
                            m=t[i]||(t[i]={});
                            for(j in o){
                                v=o[j];
                                if(!check[j.charAt(0)]){
                                    /*set to behavior*/
                                    if(v)
                                        m[j]=v;
                                    else
                                        delete m[j];
                                }
                            }
                        }else if(r2.test(i)){
                            /*set to behavior*/
                            if(o)
                                t[i]=o;
                            else
                                delete t[i];
                        //for those special keys
                        }else
                            t[i]=o;
                    }
                }

                //remove all handler cache
                _.filter(ch,function(o,i){
                    return !(i==skey||i.indexOf(skey+'-')==0);
                });
                //add handler cache
                for(i in t){
                    o=t[i];
                    if(!check[i.charAt(0)]){
                        //only two layer
                        if(!r1.test(i)){
                            for(j in o){
                                if(!check[j.charAt(0)] && o[j]){
                                    k=skey+'-'+i;
                                    (ch[k]||(ch[k]={}))['on'+eventType[j]]=handler;
                                }
                            }
                        }else if(r2.test(i) && o){
                            k=skey;
                            (ch[k]||(ch[k]={}))['on'+eventType[i]]=handler;
                        }
                    }
                }
            }

            return self;
        },
        getBehavior:function(){
            return this.$Behaviors;
        },
        $applyCSS:function( ){
            var self=xui.UI, cache1=self.$cache_css, cache2=self.$cache_css2;
            if(!self.$cssNo){
                self.$cssNo=1;
                var b=xui.browser;
                xui('body').addClass(
                          (b.ie ? ("xui-css-ie xui-css-ie" + b.ver + " ") :
                           b.gek ? ("xui-css-gek xui-css-gek" + b.ver + " ") :
                           b.kde ? ("xui-css-kde xui-css-kde" + b.ver + " ") :
                           b.opr ? ("xui-css-opr xui-css-opr" + b.ver + " ") : "")
                        + (b.isSafari ? "xui-css-safari ": b.isChrome ? "xui-css-chrome " :"")
                        + (b.isMac ? "xui-css-mac": b.isLinux ? "xui-css-linux " :"")
                );
                xui('html').addClass(b.isStrict?"xui-css-base xui-css-strict xui-css-viewport":"xui-css-base xui-css-viewport");
            }
            if(cache1){
                xui.CSS.addStyleSheet(cache1, 'xui.UI-CSS'+(self.$cssNo++));
                xui.UI.$cache_css='';
            }
            if(cache2){
                xui.CSS.addStyleSheet(cache2, 'xui.UI-CSS'+(self.$cssNo++),true);
                xui.UI.$cache_css2='';
            }
        },
        buildCSSText:function(hash){
            var self=this,
                me=arguments.callee,
                r1=me._r1||(me._r1=/(^|\s|,)([0-9A-Z_]+)/g),
                h=[], r=[],
                browser=xui.browser,
                ie6=browser.ie6,
                ie=browser.ie,
                gek=browser.gek,
                ks=self.$cssKeys,
                t,v,o;

            for(var i in hash){
                if(o=hash[i]){
                    t=i.replace(r1,function(a,b,c){return  b + '.' + (ks[c]||c)}).toLowerCase();
                    o.$order=parseInt(o.$order,10)||0;
                    o.$=t;
                    h[h.length]=o;
                }
            };
            _.arr.stableSort(h,function(x,y){
                x=x.$order||0;y=y.$order||0;
                return x>y?1:x==y?0:-1;
            });

            for(var i=0,l=h.length;i<l;){
                o=h[i++];
                r[r.length]=o.$+"{";
                if(t=o.$before)r[r.length]=t;
                if(t=o.$text)r[r.length]=t;
                for(var j in o){
                    if(j.charAt(0)=='$')continue;
                    //neglect '' or null
                    if((v=o[j])||o[j]===0){
                        //put string dir
                        switch(typeof v){
                        case 'string':
                        case 'number':
                            r[r.length]=j+":"+v+";";break;
                        case 'function':
                            r[r.length]=j+":"+v(self.KEY)+";";break;
                        //arrray
                        default:
                            _.arr.each(v,function(k){
                                //neglect '' or null
                                if(k)r[r.length]=j+":"+k+";";
                            });
                        }
                    }
                }
                if(v=o.$after)r[r.length]=v;
                r[r.length]="}";
            }
            return r.join('');
        },
        _droppable:function(key){
            var self=this,
                h2=xui.Event.$eventhandler2,
                o=self.$Behaviors,
                v=key=='KEY'?o:(o[key]||(o[key]={})),
                handler=xui.$cache.UIKeyMapEvents,
                k2=key=='KEY'?self.KEY:(self.KEY+'-'+key),
                ch=handler[k2]||(handler[k2]={});

            //attach Behaviors
            _.merge(v, {
                beforeMouseover:function(profile, e, src){
                    if(profile.properties.disabled||profile.properties.readonly)return;

                    // avoid no droppable keys
                    if(profile.behavior.NoDroppableKeys){
                        var sk = profile.getKey(xui.Event.getSrc(e).id || "").split('-')[1];
                        if(sk && _.arr.indexOf(profile.behavior.NoDroppableKeys, sk)!=-1)return;
                    }

                    var ns=src,
                        dd = xui.DragDrop,
                        pp = dd.getProfile(),
                        key = pp.dragKey,
                        data = pp.dragData,
                        item,box,t,args
                        ;

                    //not include the dragkey
                    if(!key
                    || !data
                    || !(new RegExp('\\b'+key+'\\b')).test(profile.box.getDropKeys(profile, ns))
                    )return;

                    box=profile.boxing();
                    if(box.getItemByDom)
                        item=box.getItemByDom(src);

                    args=[profile, e, ns, key, data, item];
                    if((t=profile.onDropTest) && (false===box.onDropTest.apply(box,args)))
                        return;
                    if((t=profile.box._onDropTest) && (false===t.apply(profile.host||profile, args)))
                        return;
                    //for trigger onDrop
                    dd.setDropElement(src);
                    if(profile.onDropMarkShow && (false===box.onDropMarkShow.apply(box,args))){}
                    else if((t=profile.box._onDropMarkShow) && (false===t.apply(profile.host||profile, args))){}
                    else
                        //show region
                        _.resetRun('setDropFace', dd.setDropFace, 0, [ns], dd);

                    if(t=profile.box._onDragEnter)t.apply(profile.host||profile, args);
                    if(profile.onDragEnter)box.onDragEnter.apply(box,args);
                    //dont return false, multi layer dd wont work well
                    //return false;
                },
                beforeMouseout:function(profile, e, src){
                    if(profile.properties.disabled||profile.properties.readonly)return;
                    var dd = xui.DragDrop,
                        pp = dd.getProfile(),
                        key = pp.dragKey,
                        data = pp.dragData,
                        item, box, args;

                    //not include the dragkey
                    if(pp.dropElement==src){
                        box=profile.boxing();
                        if(box.getItemByDom)
                            item=box.getItemByDom(src);

                        args=[profile, e, src, key, data, item];
                        if(profile.onDropMarkClear && (false===box.onDropMarkClear.apply(box,args))){}
                        else if((t=profile.box._onDropMarkClear) && (false===t.apply(profile.host||profile, args))){}
                        else _.resetRun('setDropFace', dd.setDropFace, 0, [null], xui.DragDrop);

                        if(t=profile.box._onDragLeave)t.apply(profile.host||profile, args);
                        if(profile.onDragLeave)box.onDragLeave.apply(box,args);
                        dd.setDropElement(null);
                    }
                    //return false;
                },
                beforeDrop:function(profile, e, src){
                    var dd = xui.DragDrop,
                        pp = dd.getProfile(),
                        key = pp.dragKey,
                        data = pp.dragData,
                        item,t,args,
                        box=profile.boxing();
                    if(box.getItemByDom)
                        item=box.getItemByDom(src);
                    args=[profile, e, src, key, data, item];

                    if(profile.onDropMarkClear && (false===box.onDropMarkClear.apply(box,args))){}
                    else if((t=profile.box._onDropMarkClear) && (false===t.apply(profile.host||profile, args))){}

                    if(profile.beforeDrop && (false===box.beforeDrop.apply(box,args)))
                        return;

                    if(profile.onDrop && (false===box.onDrop.apply(box,args))){
                        // dont call inner _onDrop
                    }else if(profile.box._onDrop)
                        profile.box._onDrop.apply(profile.host||profile, args);

                    if(profile.afterDrop)
                        box.afterDrop.apply(box,args);
                }
            }, 'all');
            _.merge(ch,{
                onmouseover:h2,
                onmouseout:h2,
                ondrop:h2,
                afterDrop:h2,
                beforeDrop:h2
            });
            
            
            return self;
        },
        _draggable:function(key){
            var self=this,
                h2=xui.Event.$eventhandler2,
                o=self.$Behaviors,
                v=key=='KEY'?o:(o[key]||(o[key]={})),
                handler=xui.$cache.UIKeyMapEvents,
                k2=key=='KEY'?self.KEY:(self.KEY+'-'+key),
                ch=handler[k2]||(handler[k2]={});
            //attach Behaviors
            _.merge(v, {
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    if(profile.properties.disabled)return;
                    // not resizable or drag
                    if(!profile.properties.dragKey)return;

                    // avoid nodraggable keys
                    if(profile.behavior.NoDraggableKeys){
                        var sk = profile.getKey(xui.Event.getSrc(e).id || "").split('-')[1];
                        if(sk && _.arr.indexOf(profile.behavior.NoDraggableKeys, sk)!=-1)return;
                    }

                    var pos=xui.Event.getPos(e),box=profile.boxing(),args=[profile,e,src],t;
                    if(profile.onStartDrag && (false===box.onStartDrag.apply(box,args))){}
                    else if((t=profile.box._onStartDrag) && (false===t.apply(profile.host||profile, args))){}
                    else{
                        var con=profile.box;
                        xui.use(src).startDrag(e, {
                            dragType:'icon',
                            targetLeft:pos.left+12,
                            targetTop:pos.top+12,
                            dragCursor:'pointer',
                            dragDefer:2,
                            dragKey: con.getDragKey(profile, src),
                            dragData: con.getDragData(profile, e, src)
                        });
                    }
                },
                beforeDragbegin:function(profile, e, src){
                    xui.use(src).onMouseout(true,{$force:true}).onMouseup(true);
                },
                beforeDragstop:function(profile, e, src){
                    var t;
                    if(profile.onDragStop)profile.boxing().onDragStop(profile.e,src);
                    if(t=profile.box._onDragStop)t.apply(profile.host||profile, arguments);
                }
            }, 'all');
            _.merge(ch,{
                onmousedown:h2,
                ondragbegin:h2
            });

            return self;
        },
        /*copy item to hash, use 'without'
        exception: key start with $
        value(start with $) get a change to get value from lang setting
        */
        adjustData:function(profile, hashIn, hashOut, type){
            if(!hashOut)hashOut={};

            var box=profile.box, dm = box.$DataModel,i,o;
            
            for(i in hashIn){
                if(i.charAt(0)=='$')continue;
                if(hashIn.hasOwnProperty(i) &&  !hashOut.hasOwnProperty(i))
                    hashOut[i] = typeof (o=hashIn[i])=='string' ? i=='html' ? xui.adjustRes(o,0,1) : xui.adjustRes(o,true) : o;
            }
            if('hidden' in hashIn)
                hashOut._itemDisplay=hashIn.hidden?'display:none;':'';
            if('disabled' in dm)
                hashOut.disabled= (_.isSet(hashOut.disabled) && hashOut.disabled) ?'xui-ui-itemdisabled':'';
            if('readonly' in dm)
                hashOut.readonly= (_.isSet(hashOut.readonly) && hashOut.readonly) ?'xui-ui-itemreadonly':'';

            //todo:remove the extra paras
            hashOut.imageDisplay = (hashOut.imageClass||hashOut.image)?'':'display:none';
            if(hashOut.image)
                hashOut.backgroundImage="background-image:url("+ hashOut.image +");";
            if(hashOut.imagePos)
                hashOut.backgroundPosition='background-position:'+hashOut.imagePos+';';
            else if(hashOut.image)
                hashOut.backgroundPosition='background-position:center;';

            if(hashOut.imageRepeat)
                hashOut.backgroundRepeat='background-repeat:'+hashOut.imageRepeat+';';
            else if(hashOut.image)
                hashOut.backgroundRepeat='background-repeat:no-repeat;';
            //must be here
            //Avoid Empty Image src
            if(!hashOut.image && box.IMGNODE)hashOut.image=xui.ini.img_bg;

            if((typeof (o=hashOut.renderer)=='function') || (typeof (o=hashIn.renderer)=='function'))
                hashOut.caption=xui.adjustRes(o.call(profile,hashIn,hashOut));

            return hashOut;
        },

        cacheData:function(key, obj){
            _.set(xui.$cache,['UIDATA', key], obj);
            return this;
        },
        getCachedData:function(key){
            var r = _.get(xui.$cache,['UIDATA', key]);
            if(typeof r == 'function')r=r();
            return r;
        },

        Behaviors:{
            HotKeyAllowed:true,
            onContextmenu:function(profile, e, src){
                if(profile.onContextmenu)
                    return profile.boxing().onContextmenu(profile, e, src)!==false;
            }
        },
        DataModel:{
            autoTips:true,
            "className":{
                ini:"",
                action:function(v,ov){
                    if(ov)
                        this.getRoot().removeClass(ov);
                    this.getRoot().addClass(v);
                }
            },
            disableClickEffect:false,
            disableHoverEffect:false,
            disableTips:false,
            disabled:{
                ini:false,
                action: function(v){
                    var i=this.getRoot();
                    if(v)
                        i.addClass('xui-ui-disabled');
                    else
                        i.removeClass('xui-ui-disabled');
                }
            },
            defaultFocus:false,
            hoverPop:{
                ini:'',
                action:function(v,ov){
                     var ns=this,b=ns.boxing(),p=ns.properties,t;
                     if(!ns.destroyed && ns.host){
                         if(ov && (t=ns.host[ov]) && (t=t.get(0)) && t.renderId&& !t.destroyed)
                            b.hoverPop(t,null);
                         if(v && (t=ns.host[v]) && (t=t.get(0)) && t.renderId&& !t.destroyed)
                            b.hoverPop(t, p.hoverPopType, function(){
                                t.properties.tagVar.hoverFrom=arguments;
                            },function(){
                                delete t.properties.tagVar.hoverFrom;
                            },t.getRoot().parent(),v);
                     }
                }
            },
            hoverPopType:{
                ini:'outer',
                dftWidth:180,
                listbox:['outer','inner',
                'outerleft-outertop','left-outertop','center-outertop','right-outertop','outerright-outertop',
                'outerleft-top','left-top','center-top','right-top','outerright-top',
                'outerleft-middle','left-middle','center-middle','right-middle','outerright-middle',
                'outerleft-bottom','left-bottom','center-bottom','right-bottom','outerright-bottom',
                'outerleft-outerbottom','left-outerbottom','center-outerbottom','right-outerbottom','outerright-outerbottom'
                ]
            },
            locked:{
                ini:false,
                action:function(){
                    if(this.$inDesign){
                            this.boxing().refresh(true);
                    }
                }
            },
            dock:{
                ini:'none',
                listbox:['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'],
                action:function(v){
                    xui.UI.$dock(this,true,true);
                }
            },
            dockIgnore:{
                ini:false,
                action:function(v){
                    var self=this;
                    if(self.properties.dock!='none')
                        xui.UI.$dock(self,true,true);
                }
            },
            dockFloat:{
                ini:false,
                action:function(v){
                    var self=this;
                    if(self.properties.dock!='none')
                        xui.UI.$dock(self,true,true);
                }
            },
            dockOrder:{
                ini: 1,
                action:function(v){
                    var self=this;
                    if(self.properties.dock!='none')
                        xui.UI.$dock(self,true,true);
                }
            },
            showEffects:"",
            hideEffects:"",
            dockMargin:{
                ini:{left:0,top:0,right:0,bottom:0},
                action:function(v){
                    var self=this;
                    if(self.properties.dock!='none')
                        xui.UI.$dock(self,true,true);
                }
            },

            dockMinW:0,
            dockMinH:0,
            dockMaxW:0,
            dockMaxH:0,

            // to stop conDockFlexFill
            dockIgnoreFlexFill:{
                ini:false,
                action:function(v){
                    var self=this;
                    if(self.properties.dock!='none')
                        xui.UI.$dock(self,true,true);
                }
            },
            // for top/left/right/bottom only
            // "" can be reset by container's conDockStretch
            dockStretch:{
                ini:"",
                combobox:['fixed','forward','rearward','stretch','0.25','0.33','0.5'],
                set:function(value){
                    var o=this, t=o.properties;
                    t.dockStretch=value;
                    if(t.dock == "fill"||t.dock == "cover"||t.dock == "width"||t.dock == "height"){
                        if(value!='forward'&&value!='rearward'&&value!='stretch'){
                            t.dockStretch="stretch";
                        }
                    }
                    if(o.rendered && t.dock!='none'){
                        xui.UI.$dock(o,true,true);
                    }
                }
            },
            tips:{
                ini:'',
                action:function(v){
                    var t=xui.Tips;
                    if(t&&t._showed){
                        if(xui.UIProfile.getFromDom(t._markId)==this){
                            t.setTips(v, true);
                        }
                    }
                }
            },
            rotate:{
                ini:0,
                action:function(v){
                    var root=this.getRoot(),ins=this.boxing();
                    v=parseInt(v,10)||0;
                    v=v%360;
                    if(v<0)v=v+360;
                    if(this.box['xui.svg']){
                        ins.setAttr("KEY", {transform:'r'+v}, false);
                    }else{
                        root.rotate(v);
                    }
                }
            },
            animConf:{
                hidden:true,
                ini:{}
            },
            activeAnim:{
                ini:"",
                action:function(v){
                    // stop first
                    var prf=this,
                        node=prf.getRootNode(),
                        tid=xui.getNodeData(node,'_inthread'),
                         reset=xui.getNodeData(node,'_animationreset');
                    if(tid && xui.Thread.isAlive(tid)){
                        xui.Thread(tid).abort('force');
                        xui.setNodeData(node,'_inthread',null);
                    }
                    if(typeof reset=="function"){
                        reset();
                        xui.setNodeData(node,'_animationreset',null);
                    }
                    if(v){
                        var items=this.properties.animConf, item=items[v];
                        if(!item)item=xui.Dom.$preDefinedAnims[v];
                        if(item && item.params)prf.getRoot().animate(item.params, item.onStart, item.onEnd,item.duration||200, null, item.type||"linear", null, item.unit, item.returned, item.times).start();
                    }
                }
            }
        },
        EventHandlers:{
            beforeRender:function(profile){},
            onRender:function(profile){},
            onLayout:function(profile){},
            onResize:function(profile,width,height){},
            onMove:function(profile,left,top,right,bottom){},
            onDock:function(profile,region){},
            beforePropertyChanged:function(profile,name,value,ovalue){},
            afterPropertyChanged:function(profile,name,value,ovalue){},
            beforeAppend:function(profile,child){},
            afterAppend:function(profile,child){},
            beforeRemove:function(profile,child,subId,bdestroy){},
            afterRemove:function(profile,child,subId,bdestroy){},
            onDestroy:function(profile){},
            beforeDestroy:function(profile){},
            afterDestroy:function(profile){},
            onShowTips:function(profile, node, pos){},
            onContextmenu:function(profile, e, src, item){}
        },
        RenderTrigger:function(){
            var prf=this, b=prf.boxing(),p=prf.properties,t;
            if(prf.box._onresize){
                //avoid UI blazzing
                if(!prf._syncResize && !prf.box._syncResize){
                    var style=prf.getRootNode().style,t
                    if((t=style.visibility)!='hidden'){
                       prf._$visibility=t;
                       style.visibility='hidden';
                    }
                    style=null;
                }
                xui.UI.$tryResize(prf,p.width,p.height);
            }
            if(p.disabled) b.setDisabled(true,true);
            if(p.rotate) b.setRotate(p.rotate,true);
             if(!prf.$inDesign && p.hoverPop){
                _.asyRun(function(){
                    b.setHoverPop(p.hoverPop,true);
                });
            }
            if(p.activeAnim){
                _.asyRun(function(){
                    b.setActiveAnim(p.activeAnim, true);
                });
            }
            // set dataBinder for container 
            if(prf.behavior.PanelKeys){
                if(t=p.dataBinder)b.setDataBinder(t,true);
            }
            prf._inValid=1;
        },
        $doResize:function(profile,w,h,force,key){
            if(force || ((w||h) && (profile._resize_w!=w || profile._resize_h!=h))){
                //destroyed before resize
                if(!profile.getRootNode())return false;

                profile._resize_w=w;
                profile._resize_h=h;
                _.tryF(profile.box._onresize,[profile,w,h,force,key],profile.box);

                // for have _onresize widget only
                if(profile.onResize)
                    profile.boxing().onResize(profile,w,h);
            }

            //some control will set visible to recover the css class
            if('_$visibility' in profile){
                var node=profile.getRootNode(),
                    style=node.style;
                if(style.visibility!='visible' && !xui.getNodeData(node,'_setVisibility'))
                    style.visibility=profile._$visibility;
                node=style=null;
                _.clearTimeout(profile._$rs_timer);
                delete profile._$rs_timer;
                delete profile._$rs_args;
                delete profile._$visibility;
            }
        },
        $tryResize:function(profile,w,h,force,key){
            var s=profile.box,t=s._onresize;
            if(t&&(force||w||h)){
                //adjust width and height
                //w=parseInt(w,10)||null;
                w=((w===""||w=='auto')?"auto":parseInt(w,10))||null
                h=((h===""||h=='auto')?"auto":parseInt(h,10))||null;

                //if it it has delay resize, overwrite arguments
                if('_$visibility' in profile){
                    var args=profile._$rs_args;
                    // asyrun once only
                    if(!args){
                        args=profile._$rs_args=[profile,null,null];
                        profile._$rs_timer=_.asyRun(function(){
                            // destroyed
                            if(!profile.box)return;
                            if(profile && profile._$rs_args)
                                xui.UI.$doResize.apply(null,profile._$rs_args);
                        });
                    }
                    //keep the last one, neglect zero and 'auto'
                    args[1]=w;
                    args[2]=h;
                    args[3]=force;
                    args[4]=key;
                //else, call resize right now
                }else{
//for performance checking
//console.log('resize',profile.$xid,w,h,force,key);
                    xui.UI.$doResize(profile,w,h,force,key);
                }
            }
        },
        LayoutTrigger:function(){
            var self=this, b=self.boxing(),p=self.properties;
            if(p.dock && p.dock != 'none'){
                //first time, ensure _onresize to be executed.
                if(!self.$laidout){
                    self.$laidout=1;
                    var stl=self.getRootNode().style;
                    switch(p.dock){
                        case 'top':
                        case 'bottom':
                        case 'width':
                            stl.width=0;
                            break;
                        case 'left':
                        case 'right':
                        case 'height':
                            stl.height=0;
                            break;
                        default:
                            stl.width=stl.height=0;
                    }
                }
                xui.UI.$dock(this,false,true);
            }
        },
        $dock_args:['top','bottom','left','right','center','middle','width','height'],
        $dock_map:{middle:1,center:1},
        $dock:function(profile, force, trigger){
            var node = profile.getRoot(),
                isSVG = profile.box['xui.svg'],
                ins = profile.boxing(),
                i1=-1,i2=-1,i3=-1,i4=-1,
                p=xui((node.get(0) && node.get(0).parentNode)||profile.$dockParent),
                adjustOverflow=function(p,isWin){
                    var f,t,c,x,y;
                    if(isWin){
                        f=xui.win.$getEvent('onSize','dock');
                    }else if(p && p.get(0)){
                        f=p.$getEvent('onSize','dock');
                    }

                    if(f && f.dockall && f.dockall.length){
                        for(var i=0,l=f.dockall.length,s; i<l; i++){
                            s=f.dockall[i].$dockType;
                            switch(s){
                                case "fill":
                                case "cover":
                                    x=y=1;
                                break;
                                case "top":
                                case "bottom":
                                case "width":
                                    x=1;
                                break;
                                case "left":
                                case "right":
                                case "height":
                                    y=1;
                                break;
                            }
                        }
                    }
                    if(x&&y){
                        c="xui-css-noscroll";
                    }else if(x){
                        c="xui-css-noscrollx";
                    }else if(y){
                        c="xui-css-noscrolly";
                    }
                    if(isWin){
                        xui('html').removeClass(/^xui-css-noscroll(x|y)?$/);
                        t=xui('body').get(0);
                        if(t)t.scroll='';
                        if(c){
                            if(x)xui.win.scrollLeft(0);
                            if(y)xui.win.scrollTop(0);
                            xui('html').addClass(c);
                            if(x && y && t){
                                t.scroll='no';
                            }
                        }
                    }else{
                        p.removeClass(/^xui-css-noscroll(x|y)?$/);
                        if(c){
                            if(x)p.scrollLeft(0);
                            if(y)p.scrollTop(0);
                            p.addClass(c);
                        }
                    }
                };

            if(!p.get(0))
                return;
            var prop = profile.properties,
                margin=prop.dockMargin,
                auto = 'auto',
                value = prop.dock || 'none',
                pid=xui.Event.getId(p.get(0)),
                order=function(x,y){
                    x=parseInt(x.properties.dockOrder,10)||0;y=parseInt(y.properties.dockOrder,10)||0;
                    return x>y?1:x==y?0:-1;
                },
                region,
                inMatrix='$inMatrix',
                f,t,isWin,
                //for ie6 1px bug
                _adjust=function(v){return xui.browser.ie6?v-v%2:v}

            if(isSVG){
                var bbox=ins._getBBox();
                prop.left=bbox.x;
                prop.top=bbox.y;
                prop.width=bbox.width;
                prop.height=bbox.height;
            }
            if(p.get(0)===document.body || p.get(0)===document || p.get(0)===window){
                pid='!document';
                isWin=true;
            }

            //attached to matrix
            if(pid && (pid==xui.Dom._ghostDivId || _.str.startWith(pid,xui.Dom._emptyDivId)))
                return;

            if(profile.$dockParent!=pid || profile.$dockType != value || force){
                profile.$dockParent=pid;
                profile.$dockType = value;

                //unlink first
                i1=profile.unLink('$dockall');
                i2=profile.unLink('$dock');
                i3=profile.unLink('$dock1');
                i4=profile.unLink('$dock2');

                //set the fix value first
                switch(value){
                    case 'middle':
                        region={right:prop.right=='auto'?auto:(prop.right||''), bottom:auto,left:prop.left=='auto'?auto:(prop.left||''),width:prop.width||'',height:prop.height||''};
                        break;
                    case 'center':
                        region={right:auto, bottom:prop.bottom=='auto'?auto:(prop.bottom||''),top:prop.top=='auto'?auto:(prop.top||''),width:prop.width||'',height:prop.height||''};
                        break;
                    case 'origin':
                        region={right:auto, bottom:auto,width:prop.width||'',height:prop.height||''};
                        break;
                    case 'top':
                        region={left:margin.left, right:margin.right, bottom:auto, height:prop.height||''};
                        //width top
                        break;
                    case 'bottom':
                        region={left:margin.left, right:margin.right, top:auto, height:prop.height||''};
                        //width bottom
                        break;
                    case 'left':
                        region={right:auto,width:prop.width||''};
                        //height top left
                        break;
                    case 'right':
                        region={left:auto,width:prop.width||''};
                        //height top right
                        break;
                    case 'width':
                        region={bottom:auto,height:prop.height||'',top:prop.top||''};
                        //width left
                        break;
                    case 'height':
                        region={right:auto,width:prop.width||'',left:prop.left||''};
                        //height top
                        break;
                    case 'fill':
                    case 'cover':
                        region={right:auto,bottom:auto};
                        break;
                    case 'none':
                        region={left:prop.left, top:prop.top, width:prop.width||'',height:prop.height||''};
                        break;
                }
                if(node.get(0)){
                    if(isSVG)
                        ins._setBBox(region);
                    else
                        node.cssRegion(region,true);
                }
                //if in body, set to window
                if(isWin){
                    p=xui.win;
                    if(!xui.$cache._resizeTime)xui.$cache._resizeTime=1;
                }
                //set dynamic part
                if(value != 'none'){
                    f = p.$getEvent('onSize','dock');
                    if(!f){
                        f=function(arg){
                            //get self vars
                            var me=arguments.callee,
                                map=xui.UI.$dock_map,
                                arr=xui.UI.$dock_args,
                                rePos=me.rePos,
                                pid=me.pid,
                                // the dock parent is window
                                isWin= me.pid=="!window" || me.pid=="!document",
                                pprf = isWin?0:xui.UIProfile.getFromDom(pid),
                                pprop = pprf && pprf.properties,
                                conDockSpacing=(pprop && ('conDockSpacing' in pprop))?pprop.conDockSpacing:{width:0,height:0},
                                conDockPadding=(pprop && ('conDockPadding' in pprop))?pprop.conDockPadding:{left:0,top:0,right:0,bottom:0},
                                conDockFlexFill=(pprop && ('conDockFlexFill' in pprop))?pprop.conDockFlexFill:'',
                                conDockStretch=(pprop && ('conDockStretch' in pprop))?pprop.conDockStretch.split(/[,;\s]+/):[],
                                perW=conDockFlexFill=="width"||conDockFlexFill=="both",
                                perH=conDockFlexFill=="height"||conDockFlexFill=="both",
                                node=isWin?xui.win:xui(pid);

                             if(!node.get(0))
                                return;

                             var style=(isWin?xui.win:node).get(0).style,
                                obj,i,k,o,key,target,width,height;

                            var ofs = isWin ? xui('body').get(0).style : style,
                                old_of=ofs.overflow,
                                old_ofx=ofs.overflowX,
                                old_ofy=ofs.overflowY;

                            if(style){
                                style.overflow=style.overflowX=style.overflowY="hidden";
                            }

                            width=(style&&parseInt(style.width,10))||node.width()||0;
                            height=(style&&parseInt(style.height,10))||node.height()||0;
                            //width=Math.max( node.scrollWidth()||0,  (style&&parseInt(style.width,10))||node.width()||0);
                            //height=Math.max( node.scrollHeight()||0, (style&&parseInt(style.height,10))||node.height()||0);

                           if(style){
                               style.overflow = old_of;
                               style.overflowX = old_ofx;
                               style.overflowY = old_ofy;
                           }

                            //window resize: check time span, for window resize in firefox
                            //force call when input $dockid
                            //any node resize
                            if( arg.$dockid || !isWin || ((_() - xui.$cache._resizeTime) > 50)){
                                //recruit call, give a short change
                                obj = {
                                    left: conDockPadding.left,
                                    top: conDockPadding.top,
                                    right: conDockPadding.right,
                                    bottom: conDockPadding.bottom,
                                    width: width,
                                    height: height
                                };
                                obj.preX = obj.oX = obj.left;
                                obj.preY = obj.oY = obj.top;
                                obj.ww = obj.width - obj.left - obj.right + conDockSpacing.width;
                                obj.hh = obj.height - obj.top - obj.bottom + conDockSpacing.height;
                                obj.leftHolder=obj.topHolder=obj.rightHolder=obj.bottomHolder=0;


                                // adjust width/height first
                                if(perW || perH){
                                    var wCount=0,wSum=0,hCount=0,hSum=0,tmp,hMax=0,adjustMM=function(prop,direction,numb,t){
                                        if(t=prop['dockMin'+direction])numb=Math.max(t,numb);
                                        if(t=prop['dockMax'+direction])numb=Math.min(t,numb);
                                        return numb;
                                    };
                                    // collect controls (w/h) to be percentaged, no dockIgnore
                                    for(k=0;key=arr[k++];){
                                        target = me[key];
                                        if(target.length){
                                            for(i=0;o=target[i++];){
                                                if(!(o.properties.dockIgnore || o.properties.dockIgnoreFlexFill)){
                                                    var node = o.getRoot();
                                                    if(perW && (key=='left'||key=='right'||key=='width')){
                                                        wCount++;
                                                        tmp= adjustMM(o.properties,"W",parseFloat(o.properties.width) || node.width()) ;
                                                        wSum +=tmp;
                                                        if(o.properties.dock!="fill"){
                                                            hMax = Math.max(hMax, adjustMM(o.properties,"H",parseFloat(o.properties.height) || node.height()));
                                                        }
                                                    }
                                                    if(perH && (key=='top'||key=='bottom'||key=='height')){
                                                        hCount++;
                                                        hSum += adjustMM(o.properties,"H",parseFloat(o.properties.height) || node.height());
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if(hSum&&hMax){
                                        hSum += hMax;
                                    }
                                    // for w percent
                                    if(wCount>=1 && wSum && obj.width){
                                        var innerW = obj.width - conDockPadding.left - conDockPadding.right - (wCount-1)*conDockSpacing.width;
                                        for(k=0;key=arr[k++];){
                                            target = me[key];
                                            if(target.length){
                                                for(i=0;o=target[i++];){
                                                    if(!o.properties.dockIgnore && o.properties.dockIgnoreFlexFill){
                                                        var node = o.getRoot();
                                                        if(key=='left'||key=='right'||key=='width'){
                                                            innerW -= adjustMM(o.properties,"W",parseFloat(o.properties.width) || node.width());
                                                            innerH -= conDockSpacing.width;
                                                        }
                                                    }
                                                }
                                                for(i=0;o=target[i++];){
                                                    if(!(o.properties.dockIgnore || o.properties.dockIgnoreFlexFill)){
                                                        var node = o.getRoot();
                                                        if(key=='left'||key=='right'||key=='width'){
                                                            node.width(adjustMM(o.properties,"W",Math.min(1, (parseFloat(o.properties.width) || node.width()) / wSum) * innerW));
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    // for h percent
                                    if(hCount>=1  && hSum && obj.height){
                                        var innerH = obj.height - conDockPadding.top - conDockPadding.bottom - (hCount-1)*conDockSpacing.height;
                                        for(k=0;key=arr[k++];){
                                            target = me[key];
                                            if(target.length){
                                                for(i=0;o=target[i++];){
                                                    if(!o.properties.dockIgnore && o.properties.dockIgnoreFlexFill){
                                                        var node = o.getRoot();
                                                        if(key=='top'||key=='bottom'||key=='height'){
                                                            innerH -= adjustMM(o.properties,"H",parseFloat(o.properties.height) || node.height());
                                                            innerH -= conDockSpacing.height;
                                                        }
                                                    }
                                                }
                                                for(i=0;o=target[i++];){
                                                    if(!(o.properties.dockIgnore || o.properties.dockIgnoreFlexFill)){
                                                        var node = o.getRoot();
                                                        if(key=='top'||key=='bottom'||key=='height'){
                                                            node.height(adjustMM(o.properties,"H",Math.min(1, (parseFloat(o.properties.height) || node.height())/ hSum) * innerH));
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if(pprf&&perW)pprf._conDockFlexFillW=1;
                                    if(pprf&&perH)pprf._conDockFlexFillH=1;
                                }
                                if(conDockFlexFill!="both"){
                                    for(k=0;key=arr[k++];){
                                        target = me[key];
                                        if(target.length){
                                            for(i=0;o=target[i++];){
                                                if(!(o.properties.dockIgnore || o.properties.dockIgnoreFlexFill)){
                                                    var node = o.getRoot();
                                                    if(pprf&&pprf._conDockFlexFillW && !perW && (key=='left'||key=='right'||key=='width')){
                                                        node.width(o.properties.width) ;
                                                    }
                                                    if(pprf&&pprf._conDockFlexFillH && !perH && (key=='top'||key=='bottom'||key=='height')){
                                                        node.height(o.properties.height);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if(pprf&&!perW)delete pprf._conDockFlexFillW;
                                    if(pprf&&!perH)delete pprf._conDockFlexFillH;
                                }

                                // repos && resize
                                for(k=0;key=arr[k++];){
                                    obj.preX = obj.oX;
                                    obj.preY = obj.top;

                                    target = me[key];
                                    var ii=0;
                                    if(target.length){
                                        delete obj.$prevLeft;
                                        if(!map[key])arg.width=arg.height=1;
                                        for(i=0;o=target[i++];){
                                            if(!o.properties.dockIgnore){
                                                rePos(o, ii++, obj, key, arg.$dockid, isWin||arg.width, isWin||arg.height, conDockSpacing.width, conDockSpacing.height, conDockStretch);
                                            }
                                        }
                                    }
                                }
                                
                                if(obj.later){
                                    _.each(obj.later, function(o){
                                        var profile;
                                        //for safari
                                        try{
                                            if(o.isSVG)
                                                o.ins._setBBox(o);
                                            else
                                                o.node.cssRegion(o, true);
                                            if(profile=xui.UIProfile.getFromDom(o.node.get(0))){
                                                delete o.node;
                                                // for no _onresize widget only
                                                if(!profile.box._onresize && profile.onResize && (o.width!==null||o.height!==null))
                                                    profile.boxing().onResize(profile,o.width,o.height);
                                                if(profile.onDock)profile.boxing().onDock(profile,o);
                                                if(profile.$onDock)profile.$onDock(profile,o);
                                            }
                                        }catch(e){
                                            _.asyRun(function(){
                                                // destroyed
                                                if(!o.node)return;
                                                
                                                o.width+=1;o.height+=1;
                                                if(o.isSVG)
                                                    o.ins._setBBox(o);
                                                else
                                                    o.node.cssRegion(o);
                                                o.width-=1;o.height-=1;
                                                if(o.isSVG)
                                                    o.ins._setBBox(o);
                                                else
                                                    o.node.cssRegion(o, true);

                                                if(profile=xui.UIProfile.getFromDom(o.node.get(0))){
                                                    delete o.node;
                                                    // for no _onresize widget only
                                                    if(!profile.box._onresize && profile.onResize && (o.width!==null||o.height!==null))
                                                        profile.boxing().onResize(profile,o.width,o.height);
                                                    if(profile.onDock)profile.boxing().onDock(profile,o);
                                                    if(profile.$onDock)profile.$onDock(profile,o);
                                                }
                                            })
                                        }
                                    });
                                }
                                // for those are not in obj.later
                                for(k=0;key=arr[k++];){
                                    target = me[key];
                                    if(target.length){
                                        for(i=0;o=target[i++];){
                                            if(!o.properties.dockIgnore){
                                                if(!obj.later || !obj.later[o.$xid]){
                                                    if(o.onDock)o.boxing().onDock(o);
                                                    if(o.$onDock)o.$onDock(o);
                                                }
                                            }
                                        }
                                    }
                                }

                                //if window resize, keep the timestamp
                                if(isWin)
                                    xui.$cache._resizeTime = _();
                            }

                            me=rePos=node=style=null;
                        };
                        f.pid=pid;
                        _.arr.each(xui.UI.$dock_args,function(key){
                            f[key]=[];
                        });
                        f.dockall=[];
                        f.rePos=function(profile, index, obj, value, id, w, h, spaceW, spaceH, conDockStretch){
                            //if $dockid input, and not the specific node, return
                            var flag=false;
                            if(id && profile.$xid!=id)flag=true;
                            var prop = profile.properties,
                                flt=prop.dockFloat,
                                margin = prop.dockMargin,
                                stretch=prop.dockStretch,
                                sStart,sEnd,noStretch,pct,isCover,
                                tempW=0,tempH=0,
                                node = profile.getRoot(),
                                ins = profile.boxing(),
                                style = profile.getRootNode().style,
                                left, top, right, bottom,temp, other,
                                x = parseInt(prop._dockBorderWidth,10) || 0,
                                y = parseInt(prop._dockBorderHeight,10) || 0,
                                region={},
                                isSVG=profile.box['xui.svg'],bbox;
                            if(isSVG){
                                bbox=ins._getBBox();
                                prop.left=bbox.x;
                                prop.top=bbox.y;
                                prop.width=bbox.width;
                                prop.height=bbox.height;
                            }

                            if(style.display=='none')
                                return;
                            switch(value){
                                case 'middle':
                                case 'center':
                                    sStart = sEnd = 0;
                                    break;
                                default:                                    
                                    // flow stretch can be copy from container
                                    stretch = stretch || ((value=="width"||value=="height")?"":conDockStretch[index % conDockStretch.length]) || "stretch";

                                    // width/height support 3 only:
                                    if(value=="width" || value=="height"){
                                        if(stretch!="stretch" && stretch!="forward" && stretch!="rearward"){
                                            stretch='stretch';
                                        }
                                    }
                                    switch(stretch){
                                        case 'stretch':
                                            sStart=1;
                                            sEnd=1;
                                            noStretch=0;
                                        break;
                                        case 'forward':
                                            sStart=1;
                                            sEnd=0;
                                            noStretch=0;
                                        break;
                                        case 'rearward':
                                            sStart=0;
                                            sEnd=1;
                                            noStretch=0;
                                        break;
                                        case 'fixed':
                                            noStretch=1;
                                        break;
                                        default:
                                            noStretch=1;
                                            pct = Math.min(1, Math.max(0, parseFloat(stretch) ));
                                    }
                            }

                            isCover = prop.dock=='cover';
                            //top/bottom/left/right must be set by order first
                            switch(value){
                                case 'middle':
                                    //use height() is ok
                                    if(isSVG)
                                        ins.setTop(Math.max(0,(obj.height - bbox.height)/2));
                                    else
                                        node.top(Math.max(0,(obj.height - node.height())/2));
                                    break;
                                case 'center':
                                    if(isSVG)
                                        ins.setLeft(Math.max(0,(obj.width - bbox.width)/2));
                                    else
                                        node.left(Math.max(0,(obj.width - node.width())/2));
                                    break;
                                case 'top':
                                    if(!flag){
                                        if(noStretch){
                                            temp = (pct ? parseInt(obj.ww*pct,10) : _adjust(isSVG ? bbox.width : parseFloat(prop.width))) + (obj.$prevLeft||0);
                                            delete obj.$prevLeft;
                                            if(prop.dockMinW) temp=_adjust((prop.dockMinW<=temp)?(temp):(obj.$prevLeft=temp-prop.dockMinW,  prop.dockMinW));
                                            if(prop.dockMaxW) temp=_adjust((prop.dockMaxW<=temp)?(obj.$prevLeft=temp-prop.dockMaxW,  prop.dockMaxW):(temp));
                                            
                                            tempW = temp - margin.left - margin.right;
                                            if((obj.preX + temp - obj.oX) > obj.ww){
                                                obj.top += obj.topHolder;
                                                obj.topHolder=0;
                                                obj.preX = obj.oX;
                                            }
                                            tempW -= spaceW;

                                            left=obj.preX;
                                            top=obj.top + margin.top;
                                           
                                            if(parseFloat(style.left)!=left)region.left=left;
                                            if(parseFloat(style.top)!=top)region.top=top;
                                            if(parseFloat(style.width)!=tempW)region.width=tempW=_adjust(tempW)

                                            if(!_.isEmpty(region)){
                                                if(isSVG)  ins._setBBox(region);
                                                else node.cssRegion(region,true);
                                            }

                                            // keep for next calculation
                                            obj.preX += temp;
                                            obj.topHolder = Math.max(obj.topHolder, (isSVG ? bbox.height : node.offsetHeight()) + margin.top + margin.bottom + spaceH);
                                        }else{
                                            if(obj.topHolder){
                                                obj.top += obj.topHolder;
                                                obj.topHolder=0;
                                                obj.preX = obj.oX;
                                            }
                                            left = sStart ? ((flt?0:obj.left)+margin.left) : parseFloat(prop.left);
                                            right = sEnd ? ((flt?0:obj.right)+margin.right) : (obj.width-parseFloat(prop.width)-parseFloat(prop.left));
                                            top=(flt?0:obj.top)+margin.top;
                                            temp = obj.width - left - right - x + (obj.$prevLeft||0);
                                            delete obj.$prevLeft;                                            
                                            if(prop.dockMinW) temp=_adjust((prop.dockMinW<=temp)?(temp):(obj.$prevLeft=temp-prop.dockMinW,  prop.dockMinW));
                                            if(prop.dockMaxW) temp=_adjust((prop.dockMaxW<=temp)?(obj.$prevLeft=temp-prop.dockMaxW,  prop.dockMaxW):(temp));
                                            

                                            if(parseFloat(style.left)!=left)region.left=left;
                                            if(parseFloat(style.top)!=top)region.top=top;
                                            if(parseFloat(style.width)!=temp)region.width=_adjust(temp);

                                            if(!_.isEmpty(region)){
                                                if(isSVG) ins._setBBox(region);
                                                else node.cssRegion(region,true);
                                            }

                                            if(!flt)
                                                obj.top += (isSVG ? bbox.height : node.offsetHeight()) + margin.top + margin.bottom + spaceH;
                                        }
                                    }

                                    break;
                                case 'bottom':
                                    if(!flag){
                                        if(noStretch){
                                            temp = (pct ? parseInt(obj.ww*pct,10) : _adjust(isSVG ? bbox.width : parseFloat(prop.width))) + (obj.$prevLeft||0);
                                            delete obj.$prevLeft;                                            
                                            if(prop.dockMinW) temp=_adjust((prop.dockMinW<=temp)?(temp):(obj.$prevLeft=temp-prop.dockMinW,  prop.dockMinW));
                                            if(prop.dockMaxW) temp=_adjust((prop.dockMaxW<=temp)?(obj.$prevLeft=temp-prop.dockMaxW,  prop.dockMaxW):(temp));

                                            tempW = temp - margin.left - margin.right;
                                            if((obj.preX + temp - obj.oX) > obj.ww){
                                                obj.bottom += obj.bottomHolder;
                                                obj.bottomHolder=0;
                                                obj.preX = obj.oX;
                                            }
                                            tempW -= spaceW;

                                            left=obj.preX;
                                            bottom=obj.bottom + margin.bottom;
                                           
                                            if(parseFloat(style.left)!=left)region.left=left;
                                            if(parseFloat(style.bottom)!=bottom)region.bottom=bottom;
                                            if(parseFloat(style.width)!=tempW)region.width=tempW=_adjust(tempW)

                                            if(!_.isEmpty(region)){
                                                if(isSVG)  ins._setBBox(region);
                                                else node.cssRegion(region,true);
                                            }

                                            // keep for next calculation
                                            obj.preX += temp;
                                            obj.bottomHolder = Math.max(obj.bottomHolder, (isSVG ? bbox.height : node.offsetHeight()) + margin.top + margin.bottom + spaceH);
                                        }
                                        else{
                                            if(obj.bottomHolder){
                                                obj.bottom += obj.bottomHolder;
                                                obj.bottomHolder=0;
                                                obj.preX = obj.oX;
                                            }
                                            left=sStart?((flt?0:obj.left)+margin.left):parseFloat(prop.left);
                                            right=sEnd?((flt?0:obj.right)+margin.right):(obj.width-parseFloat(prop.width)-parseFloat(prop.left));
                                            bottom=(flt?0:obj.bottom)+margin.bottom;

                                            temp=obj.width - left - right - x + (obj.$prevLeft||0);
                                            delete obj.$prevLeft;                                            
                                            if(prop.dockMinW) temp=_adjust((prop.dockMinW<=temp)?(temp):(obj.$prevLeft=temp-prop.dockMinW,  prop.dockMinW));
                                            if(prop.dockMaxW) temp=_adjust((prop.dockMaxW<=temp)?(obj.$prevLeft=temp-prop.dockMaxW,  prop.dockMaxW):(temp));

                                            if(parseFloat(style.bottom)!=bottom)region.bottom=bottom;
                                            if(parseFloat(style.left)!=left)region.left=left;
                                            if(parseFloat(style.width)!=temp)region.width=_adjust(temp);
                                            
                                            if(!_.isEmpty(region)){
                                                if(isSVG)
                                                    ins._setBBox(region);
                                                else
                                                    node.cssRegion(region,true);
                                            }
                                        
                                            if(!flt)
                                                obj.bottom += (isSVG?bbox.height:node.offsetHeight()) + margin.top + margin.bottom + spaceH;
                                        }
                                    }
                                    break;
                                case 'left':
                                    if(!flag){
                                        if(obj.topHolder){
                                            obj.top += obj.topHolder;
                                            obj.topHolder=0;
                                            // reset preY
                                            obj.preY = obj.top;
                                        }
                                        if(obj.bottomHolder){
                                            obj.bottom += obj.bottomHolder;
                                            obj.bottomHolder = 0;
                                        }
                                        // reset hh
                                        obj.hh = obj.height - obj.top - obj.bottom + spaceH;

                                        if(obj.hh<=0)return;

                                        if(noStretch){
                                            temp = (pct ? parseInt(obj.hh*pct,10) : _adjust(isSVG ? bbox.height : parseFloat(prop.height))) + (obj.$prevLeft||0);
                                            delete obj.$prevLeft;                                            
                                            if(prop.dockMinH) temp=_adjust((prop.dockMinH<=temp)?(temp):(obj.$prevLeft=temp-prop.dockMinH,  prop.dockMinH));
                                            if(prop.dockMaxH) temp=_adjust((prop.dockMaxH<=temp)?(obj.$prevLeft=temp-prop.dockMaxH,  prop.dockMaxH):(temp));


                                            tempH = temp - margin.top - margin.bottom;
                                            if((obj.preY + temp + obj.bottom - spaceH) > obj.height){
                                                obj.left += obj.leftHolder;
                                                obj.leftHolder=0;
                                                // reset preY
                                                obj.preY = obj.top;
                                            }
                                            tempH -= spaceH;

                                            top=obj.preY;
                                            left=obj.left + margin.left;
                                           
                                            if(parseFloat(style.left)!=left)region.left=left;
                                            if(parseFloat(style.top)!=top)region.top=top;
                                            if(parseFloat(style.height)!=tempH)region.height=tempH=_adjust(tempH)

                                            if(!_.isEmpty(region)){
                                                if(isSVG)  ins._setBBox(region);
                                                else node.cssRegion(region,true);
                                            }

                                            // keep for next calculation
                                            obj.preY += temp;
                                            obj.leftHolder = Math.max(obj.leftHolder, (isSVG ? bbox.width : node.offsetWidth()) + margin.left + margin.right + spaceW);
                                        }
                                        else{
                                            if(obj.leftHolder){
                                                obj.left += obj.leftHolder;
                                                obj.leftHolder=0;
                                                obj.preY = obj.top;
                                            }

                                            left=(flt?0:obj.left)+margin.left;
                                            top=sStart?((flt?0:obj.top)+margin.top):parseFloat(prop.top);
                                            bottom=sEnd?((flt?0:obj.bottom)+margin.bottom):(obj.height-parseFloat(prop.height)-parseFloat(prop.top));

                                            temp=obj.height - top - bottom - y + (obj.$prevLeft||0);
                                            delete obj.$prevLeft;                                            
                                            if(prop.dockMinH) temp=_adjust((prop.dockMinH<=temp)?(temp):(obj.$prevLeft=temp-prop.dockMinH,  prop.dockMinH));
                                            if(prop.dockMaxH) temp=_adjust((prop.dockMaxH<=temp)?(obj.$prevLeft=temp-prop.dockMaxH,  prop.dockMaxH):(temp));
                                            
                                            if(parseFloat(style.left)!=left)region.left=left;
                                            if(parseFloat(style.top)!=top)region.top=top;
                                            if(parseFloat(style.height)!=temp)region.height=_adjust(temp);

                                            if(!_.isEmpty(region)){
                                                if(isSVG)
                                                    ins._setBBox(region);
                                                else
                                                    node.cssRegion(region,true);
                                            }
                                            if(!flt)
                                                obj.left += (isSVG?bbox.width:node.offsetWidth()) + margin.left + margin.right + spaceW;
                                        }
                                    }
                                    break;
                                case 'right':
                                    //if no top/bottom and change w only
                                    if(!flag){
                                        if(obj.topHolder){
                                            obj.top += obj.topHolder;
                                            obj.topHolder=0;
                                            // reset preY
                                            obj.preY = obj.top;
                                        }
                                        if(obj.bottomHolder){
                                            obj.bottom += obj.bottomHolder;
                                            obj.bottomHolder = 0;
                                        }
                                        // reset hh
                                        obj.hh = obj.height - obj.top - obj.bottom + spaceH;

                                        if(obj.hh<=0)return;

                                        if(noStretch){
                                            temp = (pct ? parseInt(obj.hh*pct,10) : _adjust(isSVG ? bbox.height : parseFloat(prop.height))) + (obj.$prevLeft||0);
                                            delete obj.$prevLeft;                                            
                                            if(prop.dockMinH) temp=_adjust((prop.dockMinH<=temp)?(temp):(obj.$prevLeft=temp-prop.dockMinH,  prop.dockMinH));
                                            if(prop.dockMaxH) temp=_adjust((prop.dockMaxH<=temp)?(obj.$prevLeft=temp-prop.dockMaxH,  prop.dockMaxH):(temp));

                                            tempH = temp - margin.top - margin.bottom;
                                            if((obj.preY + temp + obj.bottom - spaceH) > obj.height){
                                                obj.right += obj.rightHolder;
                                                obj.rightHolder=0;
                                                // reset preY
                                                obj.preY = obj.top;
                                            }
                                            tempH -= spaceH;

                                            top=obj.preY;
                                            right=obj.right + margin.right;
                                           
                                            if(parseFloat(style.right)!=right)region.right=right;
                                            if(parseFloat(style.top)!=top)region.top=top;
                                            if(parseFloat(style.height)!=tempH)region.height=tempH=_adjust(tempH)

                                            if(!_.isEmpty(region)){
                                                if(isSVG)  ins._setBBox(region);
                                                else node.cssRegion(region,true);
                                            }

                                            // keep for next calculation
                                            obj.preY += temp;
                                            obj.rightHolder = Math.max(obj.rightHolder, (isSVG ? bbox.width : node.offsetWidth()) + margin.left + margin.right + spaceW);
                                        }
                                        else{
                                            if(obj.rightHolder){
                                                obj.right += obj.rightHolder;
                                                obj.rightHolder=0;
                                                obj.preY = obj.top;
                                            }

                                            right=(flt?0:obj.right)+margin.right;
                                            top=sStart?((flt?0:obj.top)+margin.top):(parseFloat(prop.top));
                                            bottom=sEnd?((flt?0:obj.bottom)+margin.bottom):(obj.height-parseFloat(prop.height)-parseFloat(prop.top));

                                            temp=obj.height - top - bottom - y + (obj.$prevLeft||0);
                                            delete obj.$prevLeft;                                            
                                            if(prop.dockMinH) temp=_adjust((prop.dockMinH<=temp)?(temp):(obj.$prevLeft=temp-prop.dockMinH,  prop.dockMinH));
                                            if(prop.dockMaxH) temp=_adjust((prop.dockMaxH<=temp)?(obj.$prevLeft=temp-prop.dockMaxH,  prop.dockMaxH):(temp));
                                            
                                            if(parseFloat(style.right)!=right)region.right=right;
                                            if(parseFloat(style.top)!=top)region.top=top;
                                            if(parseFloat(style.height)!=temp)region.height=_adjust(temp);

                                            if(!_.isEmpty(region)){
                                                if(isSVG)
                                                    ins._setBBox(region);
                                                else
                                                    node.cssRegion(region,true);
                                            }
                                            if(!flt)
                                                obj.right += (isSVG?bbox.width:node.offsetWidth()) + margin.left + margin.right + spaceW;
                                        }
                                    }
                                    break;
                                case 'width':
                                    //if no top/bottom/left/right and change h only
                                    if(!w)return;
                                    if(obj.leftHolder){
                                        obj.left += obj.leftHolder;
                                        obj.leftHolder=0;
                                    }
                                    if(obj.rightHolder){
                                        obj.right += obj.rightHolder;
                                        obj.rightHolder=0;
                                    }

                                    left = sStart?((isCover?0:(flt?0:obj.left)) + margin.left):parseFloat(prop.left);
                                    right = sEnd?((isCover?0:(flt?0:obj.right))  + margin.right):(obj.width-parseFloat(prop.width)-parseFloat(prop.left));
                                    top = prop.dock=='width'?(parseInt(prop.top,10) || 0):(sStart?((isCover?0:(flt?0:obj.top)) + margin.top):parseFloat(prop.top));
                                    //later call for w/h change once
                                    temp=obj.width - left - right - x;
                                    if(prop.dockMinW) temp=_adjust((prop.dockMinW<=temp)?(delete profile.$dockMinW, temp):(profile.$dockMinW=1,  prop.dockMinW));
                                    if(prop.dockMaxW) temp=_adjust((prop.dockMaxW<=temp)?(profile.$dockMaxW=1,  prop.dockMaxW):(delete profile.$dockMaxW, temp));

                                    obj.later=obj.later||{};
                                    obj.later[profile.$xid] = obj.later[profile.$xid] || {};
                                    _.merge(obj.later[profile.$xid],{
                                        isSVG:isSVG,
                                        ins:ins,
                                        node:node,
                                        width: temp,
                                        left:left,
                                        top:top
                                    },'all');
                                    break;
                                case 'height':
                                    //if no top/bottom/left/right and change w only
                                    if(!h)return;
                                    if(obj.topHolder){
                                        obj.top += obj.topHolder;
                                        obj.topHolder=0;
                                        obj.preX = obj.oX;
                                    }
                                    if(obj.bottomHolder){
                                        obj.bottom += obj.bottomHolder;
                                        obj.bottomHolder=0;
                                        obj.preX = obj.oX;
                                    }

                                    top = sStart?((isCover?0:(flt?0:obj.top)) + margin.top):parseFloat(prop.top);
                                    bottom = sEnd?((isCover?0:(flt?0:obj.bottom))  + margin.bottom):(obj.height-parseFloat(prop.height)-parseFloat(prop.top));
                                    left = prop.dock=='height'?(parseInt(prop.left,10) || 0):(sStart?((isCover?0:(flt?0:obj.left)) + margin.left):parseFloat(prop.left));
                                    //later call for w/h change once
                                    temp=obj.height - top - bottom - y;
                                    if(prop.dockMinH) temp = _adjust((prop.dockMinH<=temp)?(delete profile.$dockMinH, temp):(profile.$dockMinH=1,  prop.dockMinH));
                                    if(prop.dockMaxH) temp=_adjust((prop.dockMaxH<=temp)?(profile.$dockMaxH=1,  prop.dockMaxH):(delete profile.$dockMaxH, temp));

                                    obj.later=obj.later||{};
                                    obj.later[profile.$xid] = obj.later[profile.$xid] || {};
                                    _.merge(obj.later[profile.$xid],{
                                        isSVG:isSVG,
                                        ins:ins,
                                        node:node,
                                        height: temp,
                                        left:left,
                                        top:top
                                    },'all');

                                    break;
                            }
                        };
  
                        //add handler to window or node
                        p.onSize(f,'dock');
                    }
                    //set link to node
                    if(value=='fill' || value=='cover'){
                        profile.link(f.height, '$dock1',null,i3);
                        profile.link(f.width, '$dock2',null,i4);
                        _.arr.stableSort(f.height,order);
                        _.arr.stableSort(f.width,order);
                    }else if(value=='origin'){
                        profile.link(f.center, '$dock1',null,i3);
                        profile.link(f.middle, '$dock2',null,i4);
                    }else{
                        profile.link(f[value], '$dock',null,i2);
                        _.arr.stableSort(f[value],order);
                    }
                    profile.link(f.dockall, '$dockall',null,i1);

                    //
                    xui.$cache._resizeTime=1;

                    //set shortuct
                    profile.$dockFun=f;
                }

                // adjust dock parent's overflow
                adjustOverflow(p, isWin);
                
                if(value != 'none'){
                    (profile.$beforeDestroy=(profile.$beforeDestroy||{}))["releaseDock"]=function(){
                        profile.unLink('$dockall');
                        profile.unLink('$dock');
                        profile.unLink('$dock1');
                        profile.unLink('$dock2');
                        adjustOverflow(p,isWin);

                        if( p && p.get(0) && (p=xui.UIProfile.getFromDom(p.id())) )
                            _.tryF(p.clearCache,[],p);
                        profile=fun=p=null;
                    }
                }else{
                    if(profile.$beforeDestroy)
                         delete profile.$beforeDestroy["releaseDock"];
                }

            }

            //run once now
            if(trigger)
                p.onSize();
//            if(value != 'none' && trigger)
//                profile.$dockFun({width:1, height:1, $dockid:_.arr.indexOf(['width','height','fill','cover'],value)!=-1?profile.$xid:null, $type: value});
        },

        _beforeSerialized:function(profile){
            var b,t,r,o={};
            _.merge(o, profile, 'all');
            var p = o.properties = _.clone(profile.properties,true),
                ds = o.box.$DataStruct;
            switch(p.dock){
                case 'top':
                case 'bottom':
                    delete delete p.top;delete p.bottom;delete p.right;
                    break;
                case 'left':
                case 'right':
                    delete p.left;delete p.right;delete p.bottom;
                    break;
            }
            for(var i in xui.UI.$ps)
                if((i in p) && typeof p[i]!='number' && p[i]!='' && p[i]!='auto')p[i]=isNaN(p[i]=parseFloat(p[i]))?'auto':p[i];

            if(p.items && p.items.length){
                t=xui.absObj.$specialChars;
                p.items = _.clone(p.items,function(o,i,d){
                    return !t[((d===1?o.id:i)+'').charAt(0)] && o!=undefined;
                });
            }
            if(p.tagCmds && p.tagCmds.length){
                t=xui.absObj.$specialChars;
                p.tagCmds = _.clone(p.tagCmds,function(o,i,d){
                    return !t[((d===1?o.id:i)+'').charAt(0)] && o!=undefined;
                });
            }
            // for empty object
            for(var i in profile.box._objectProp)
                if((i in p) && p[i] && (_.isHash(p[i])||_.isArr(p[i])) && _.isEmpty(p[i]))delete p[i];
            // 
            _.arr.each(["dockMargin","conDockPadding","conDockSpacing","propBinder","tagVar","animConf"],function(key){
                if(t=p[key]){
                    r=ds[key];
                    for(var i in t){
                        if(r[i]!==t[i]){
                            return;
                        }
                    }
                    delete p[key];
                }
            });
            
            if(_.isEmpty(p.resizerProp))
                delete p.resizerProp;
            if(p.items&&(p.items.length==0||p.listKey))
                delete p.items;
            if(p.tagCmds&&(p.tagCmds.length==0||p.listKey))
                delete p.tagCmds;

            return o;
        },
        getDropKeys:function(profile,node){
            return profile.properties.dropKeys;
        },
        getDragKey:function(profile,node){
            return profile.properties.dragKey;
        },
        getDragData:function(profile,event,node){
            return {
                profile:profile,
                domId:xui.use(node).id(),
                data: profile.onGetDragData ? profile.boxing().onGetDragData(profile,event,node) : null
            };
        },
        _prepareData:function(profile, data){
            var prop = profile.properties,
                dm = this.$DataModel,
                me = arguments.callee,
                map = me.map || (me.map=_.toArr('left,top,bottom,right,width,height')),
                a=[],
                box=profile.box,
                ajd=profile.box.adjustData,
                t;
            data = data||{};
            //can't input id in properties
            if(prop.id)delete prop.id;

            if('required' in dm)
                prop._required=prop.required?"xui-required":"";

            // cant null
            if('nodeName' in dm && !prop.nodeName)
                prop.nodeName="xui";

            //give default caption
            if('caption' in dm && prop.caption!==null)
                prop.caption = prop.caption===undefined ? profile.alias : prop.caption;
            
            if('html' in dm && prop.html)
                data.html = xui.adjustRes(prop.html,0,1);
            if('src' in dm && prop.src)
                data.src = xui.adjustRes(prop.src,0,1);

            //give border width
            if('$hborder' in dm)
                data.bWidth=parseFloat(prop.width) - (prop.$hborder||0)*2;
            if('$vborder' in dm)
                data.bHeight=parseFloat(prop.height) - (prop.$vborder||0)*2;

            //set left,top,bottom,right,width,height,position,z-index,visibility,display
            for(var j=0,i;i=map[j];j++){
                var t=(i in data)?data[i]:prop[i];
                if(t || t===0){
                    if(String(parseFloat(t))==String(t))
                        a[a.length]=i+':'+(parseInt(t,10)||0)+'px';
                    else if(t!='auto' && t)
                        a[a.length]=i+':'+t;
                }
            }
            if(prop.position)a[a.length] = 'position:'+prop.position;
            if(prop.visibility)a[a.length]= 'visibility:'+prop.visibility;
            if('zIndex' in prop)a[a.length]= 'z-index:'+prop.zIndex;
            if(prop.display)a[a.length]= 'display:'+ (prop.display=='inline-block'? xui.browser.gek?'-moz-inline-block;display:-moz-inline-box;display:inline-block;':'inline-block' :prop.display)

           data._style = a.join(';');
           if(box.$Behaviors.PanelKeys && !box["xui.absList"]){
                a=[];
                if(prop.panelBgClr)a[a.length] = 'background-color:'+prop.panelBgClr;
                if(prop.panelBgImg)a[a.length] = 'background-image:url('+xui.adjustRes(prop.panelBgImg)+')';
                if(prop.panelBgImgPos)a[a.length] = 'background-position:'+prop.panelBgImgPos;
                if(prop.panelBgImgRepeat)a[a.length] = 'background-repeat:'+prop.panelBgImgRepeat;
                if(prop.panelBgImgAttachment)a[a.length] = 'background-attachment:'+prop.panelBgImgAttachment;
                data._panelstyle=a.join(';');
            }

            if('className' in dm)
            	data._className=prop.className||"";

            if('readonly' in dm)data.readonly=prop.readonly?"xui-ui-readonly":"";
            if('href' in dm)data.href = prop.href || xui.$DEFAULTHREF;
            if('tabindex' in dm)data.tabindex = prop.tabindex || '-1';
            if('items' in dm){
                profile.ItemIdMapSubSerialId = {};
                profile.SubSerialIdMapItem = {};

                prop.items=profile.box._adjustItems(prop.items);
                data.items = this._prepareItems(profile, prop.items);
            }


            if('selectable' in dm)
                data._selectable=(xui.browser.ie && xui.browser.ver<10)
                    ? ""
                    : (prop.selectable?"xui-ui-selectable":"xui-ui-unselectable");

            //default prepare
            data =  ajd(profile, prop, data);

            profile.prepared=true;
            return data;
        },
        _prepareItems:function(profile, items, pid, mapCache, serialId){
            var result=[],
                item,dataItem,t,
                SubID=xui.UI.$tag_subId,id ,
                tabindex = profile.properties.tabindex,
                ajd=profile.box.adjustData;
            //set map
            for(var i=0,l=items.length;i<l;i++){
                if(typeof items[i]!='object')
                    items[i]={id:items[i]};
                item=items[i];

                if(profile.beforePrepareItem && false===profile.boxing().beforePrepareItem(profile, item, pid, mapCache, serialId)){
                    continue;
                }

                if(!item.hasOwnProperty('caption'))item.caption=item.id;

                dataItem={id: item.id};
                if(pid)dataItem._pid = pid;

                id=dataItem[SubID]=typeof serialId=='string'?serialId:profile.pickSubId('items');

                if(false!==mapCache){
                    profile.ItemIdMapSubSerialId[item.id] = id;
                    profile.SubSerialIdMapItem[id] = item;
                }
                if(t=item.object){
                    t=dataItem.object=t['xui.absBox']?t.get(0):t;
                    //relative it.
                    if(t['xui.UIProfile'])
                        t.properties.position='relative';
                    item.$xid=t.$xid;
                    t.$item=item;
                    t.$holder=profile;
                    if(!t.host||t.host===t)t.boxing().setHost(profile.host,t.alias);
                    if(!profile.$attached)profile.$attached=[];
                    profile.$attached.push(t);
                }else{
                    dataItem._tabindex=tabindex;

                    //others
                    ajd(profile, item, dataItem);
                    if(this._prepareItem)
                        this._prepareItem(profile, dataItem, item, pid, i,l,mapCache, serialId);
                }
                result.push(dataItem);
            }

            return result;
        },
        _showTips:function(profile, node, pos){
            if(profile.properties.disableTips)return;
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);
        }
    }
});
//absList cls
Class("xui.absList", "xui.absObj",{
    Instance:{
        activate:function(){
            var profile = this.get(0),
                items = profile.getSubNode('ITEM',true);
            if(!items.isEmpty())
                items.focus();
            return this;
        },
        /*
        [x] ,valid id   ,true  => insert [x] before node
        [x] ,valid id   ,false => insert [x ]after node
        [x] ,null ,true  => insert [x ] to head
        [x] ,null ,false => insert [x ] to tail
        */
        insertItems:function(arr, base, before){
            var node,arr2,
                items, index, r,
                data,box,
                b=this._afterInsertItems;
            return this.each(function(profile){
                box=profile.box;

                arr2=box._adjustItems(arr);

                items = profile.properties.items;
                index = _.arr.subIndexOf(items,'id',base);

                //if in dom, create it now
                if(profile.renderId){
                    // prepare properties format
                    data = box._prepareItems(profile, arr2, base);

                    r=profile._buildItems('items', data);

                    // try to render inner xui.UI
                    if(profile.$attached){
                        for(var i=0,v;v=profile.$attached[i++];)
                            if(v._render)
                                v._render(true);
                        delete profile.$attached;
                    }

                    if(index==-1){
                        //if no base specified
                        node = profile.getSubNode(box._ITEMSKEY || profile.keys.ITEMS || profile.keys.KEY);
                        //items.length==1 for that one have fake item(for example: editable poll)
                        if(before)
                            node.prepend(r);
                        else
                            node.append(r);
                    }else{
                        node=profile.getSubNodeByItemId(box._ITEMKEY || 'ITEM', base);
                        if(before)
                            node.addPrev(r);
                        else
                            node.addNext(r);
                    }
                }

                //must be here
                if(index==-1){
                    _.arr.insertAny(items,arr2, before?0:-1);
                }else
                    _.arr.insertAny(items,arr2, before?index:index+1);

                if(b)
                    profile.boxing()._afterInsertItems(profile, data, base, before);
            });
        },
        removeItems:function(arr, key){
            var obj,v,
                b=this._afterRemoveItems;
                remove=function(profile, arr, target, data, ns, force){
                    var self=arguments.callee;
                    if(!ns)ns=xui();
                    _.filter(arr,function(o){
                        var serialId,b;
                        if(force || (b=(_.arr.indexOf(target,o.id)!=-1))){
                            if(profile.renderId){
                                if(serialId=profile.ItemIdMapSubSerialId[o.id]){
                                    data.push(_.copy(profile.SubSerialIdMapItem[serialId]));
                                    // clear maps
                                    delete profile.SubSerialIdMapItem[serialId];
                                    delete profile.ItemIdMapSubSerialId[o.id];
                                    profile.reclaimSubId(serialId, 'items');

                                    //parent node is deleted
                                    if(!force){
                                        if(!(obj = profile.getSubNode(profile.keys[key]?key:(profile.box._ITEMKEY||'ITEM'), serialId) ).isEmpty() )
                                            ns.merge(obj);
                                        //for inner template or xui.UI
                                        if(o.$xid)ns.get().push(xui.getObject(o.$xid).getRootNode());
                                    }
                                }
                            }
                        }
                        //check sub
                        if(o.sub)self(profile, o.sub,target,  data, ns, force || b);
                        //filter it
                        if(b){
                            for(var i in o)o[i]=null;
                            return false;
                        }
                    });
                    ns.remove();
                };
            return this.each(function(profile){
                var p=profile.properties,data=[];
                 arr = _.isHash(arr)?[arr.id+'']:_.isArr(arr)?arr:(arr+"").split(p.valueSeparator);
                _.arr.each(arr,function(o,i){arr[i]=''+(_.isHash(o)?o.id:o)});
                // clear properties
                remove(profile, p.items, arr, data);
                // clear value
                if(v=p.$UIvalue){
                    if((v=(''+v).split(p.valueSeparator)).length>1){
                        _.filter(v,function(o){
                            return _.arr.indexOf(arr,o)==-1;
                        });
                        p.$UIvalue=v.join(p.valueSeparator);
                    }else{
                        if(_.arr.indexOf(arr,p.$UIvalue)!=-1)
                            p.$UIvalue=null;
                    }
                }
                if(b && profile.renderId)
                    profile.boxing()._afterRemoveItems(profile, data);
            });
        },
        clearItems:function(){
            return this.each(function(profile){
                if(profile.SubSerialIdMapItem){
                    //empty dom
                    if(profile.renderId){
                        profile.getSubNode(profile.keys[profile.box._ITEMKEY||'ITEM'], true).remove();
                    }
                    //save subid
                    _.each(profile.SubSerialIdMapItem, function(o,serialId){
                        profile.reclaimSubId(serialId, 'items');
                    });
                    //clear cache
                    profile.SubSerialIdMapItem={};
                    profile.ItemIdMapSubSerialId={};
                }

                //delete items
                profile.properties.items.length=0;
                profile.properties.$UIvalue=null;
                //keep the value
                //profile.properties.value=null;
            });
        },
        updateItem:function(itemId,options){
            itemId=_.isHash(itemId)?itemId.id:(itemId+'');
            var self=this,
                profile=self.get(0),
                box=profile.box,
                items=profile.properties.items,
                rst=profile.queryItems(items,function(o){return typeof o=='object'?o.id===itemId:o==itemId},true,true,true),
                nid,item,serialId,arr,node,oldsub,t;
            if(!_.isHash(options))options={caption:options+''};

            if(rst && rst.length){
                rst=rst[0];
                if(typeof rst[0]!='object')
                    item=rst[2][rst[1]]={id:rst[0]};
                else
                    item=rst[0];

                // [[modify id
                if(_.isSet(options.id))options.id+="";
                if(options.id && itemId!==options.id){
                    nid=options.id;
                    var m2=profile.ItemIdMapSubSerialId, v;
                    if(!m2[nid]){
                        if(v=m2[itemId]){
                            m2[nid]=v;
                            delete m2[itemId];
                            profile.SubSerialIdMapItem[v].id=nid;
                        }else{
                            item.id=nid;
                        }
                    }
                }
                delete options.id;
                // modify id only
                if(_.isEmpty(options))
                    return self;
                //]]
                
                //in dom already?
                node=profile.getSubNodeByItemId('ITEM',nid || itemId);
                if(!node.isEmpty()){
                    //for the sub node
                    if('sub' in options){
                        delete item._created;
                        delete item._checked;
                        delete item._inited;

                        // destroy all sub dom
                        if(item.sub){
                            var sub=[];
                            _.arr.each(item.sub,function(o){
                                sub.push(o.id);
                            });
                            self.removeItems(sub);
                        }
                    }
                    // keep sub nodes
                    else if(item.sub){
                        oldsub=profile.getSubNodeByItemId('SUB',nid || itemId);
                    }
                    
                    //merge options
                    _.merge(item, options, 'all');
                    //prepared already?
                    serialId=_.get(profile,['ItemIdMapSubSerialId',nid || itemId]);
                    arr=box._prepareItems(profile, [item],item._pid,false, serialId);
                    node.replace(profile._buildItems(arguments[2]||'items', arr),false);

                    // restore sub nodes
                    if(oldsub && !oldsub.isEmpty()){
                        if(!(t=profile.getSubNodeByItemId('SUB',nid || itemId)).isEmpty())
                            t.replace(oldsub);
                    }
                    if(typeof self.setUIValue=='function'){
                        var uiv=profile.properties.$UIvalue||"", arr=(''+uiv).split(profile.properties.valueSeparator);
                        if(arr.length && _.arr.indexOf(arr, itemId)!=-1){
                            if(nid){
                                _.arr.removeValue(arr,itemId);
                                arr.push(item.id);
                                // id changed
                                self.setUIValue(arr.join(profile.properties.valueSeparator), true,null,'update');
                            }else{
                                // id didn't change, but item refreshed
                                self._setCtrlValue(uiv)
                            }
                        }
                    }
                }else{
                    //merge options
                    _.merge(item, options, 'all');
                }

                if(box.$Behaviors.PanelKeys){
                    var hash={};
                    if(options.hasOwnProperty('panelBgClr'))hash["background-color"]=options.panelBgClr;
                    if(options.hasOwnProperty('panelBgImg')){
                        hash["background-image"]=options.panelBgImg?("url("+xui.adjustRes(options.panelBgImg)+")"):"";
                    }
                    if(options.hasOwnProperty('panelBgImgPos'))hash["position-color"]=options.panelBgImgPos;
                    if(options.hasOwnProperty('panelBgImgRepeat'))hash["background-repeat"]=options.panelBgImgRepeat;
                    if(options.hasOwnProperty('panelBgImgAttachment'))hash["background-attachment"]=options.panelBgImgAttachment;
                    if(options.hasOwnProperty('overflow')){
                        var v=options.overflow;
                        if(v){
                            if(v.indexOf(':')!=-1){
                                _.arr.each(v.split(/\s*;\s*/g),function(s){
                                    var a=s.split(/\s*:\s*/g);
                                    if(a.length>1){
                                        hash[_.str.trim(a[0])]=_.str.trim(a[1]||'');
                                    }
                                });
                            }
                        }
                        hash.overflow=v||"";
                    }
                    if(!_.isEmpty(hash)){
                        _.arr.each(box.$Behaviors.PanelKeys,function(k){
                            panel=profile.getSubNode(k,nid || itemId).css(hash);
                        });
                    }
                }
            }
            return self;
        },
        hideItems:function(itemId){
            return this.each(function(profile){
                _.arr.each(_.isHash(itemId)?itemId.id:_.isArr(itemId)?itemId:(itemId+"").split(profile.properties.valueSeparator),function(i){
                    if(!(i=profile.getSubNodeByItemId('ITEM',i)).isEmpty())
                        i.css('display','none');
                });
            });
        },
        showItems:function(itemId){
            return this.each(function(profile){
                _.arr.each(_.isHash(itemId)?itemId.id:_.isArr(itemId)?itemId:(itemId+"").split(profile.properties.valueSeparator),function(i){
                    if(!(i=profile.getSubNodeByItemId('ITEM',i)).isEmpty())
                        i.css('display','');
                });
            });
        },
        getItems:function(type, v){
            v=v||this.get(0).properties.items;
            if(type=='data')
                return _.clone(v,true);
            else if(type=='min'){
                var a=_.clone(v,true),b;
                _.arr.each(a,function(o,i){
                    a[i]=o.id;
                });
                return a;
            }else
                return v;
        },
        selectItem:function(itemId){
            return this.fireItemClickEvent(_.isHash(itemId)?itemId.id:(itemId+''));
        },
        fireItemClickEvent:function(itemId){
            itemId=_.isHash(itemId)?itemId.id:(itemId+'');
            this.getSubNodeByItemId(this.constructor._focusNodeKey, itemId).onClick();
            return this;
        },
        editItem:function(itemId){
            itemId=_.isHash(itemId)?subId.id:(itemId+'');
            var profile=this.get(0),item,source;
            if(profile&&profile.renderId&&!profile.destroyed){
                if(item=profile.getItemByItemId(itemId)){
                    source = profile.getSubNodeByItemId('ITEMCAPTION',itemId);
                    if(source.isEmpty())source = profile.getSubNodeByItemId('CAPTION',itemId);
                    if(!source.isEmpty()){
                        var pp=source.parent(),
                        pos = source.offset(null,pp.get(0)),
                        size = source.cssSize(),
                        pos2 = pp.offset(),
                        size2 = pp.cssSize();

                        var editor;
                        if(profile.beforeIniEditor){
                            editor=profile.boxing().beforeIniEditor(profile, item, source);
                            if(editor===false)
                                return;
                        }

                        if(!editor || !editor['xui.UI']){
                            var editor=new xui.UI.ComboInput({type:"input"});
                            editor.setWidth(Math.max(size2.width-pos.left,40))
                                .setHeight(Math.max(size2.height, 20))
                                .setResizer(true)
                                .setValue(item.caption||"");
                            if(profile.onBeginEdit)profile.boxing().onBeginEdit(profile,item,editor);
                            var undo=function(){
                                // ays is a must
                                _.resetRun('absList_editor_reset', function(){
                                    if(editor&&!editor.isDestroyed()){
                                        editor.getRoot().setBlurTrigger("absList_editor_blur",null);
                                        editor.destroy();
                                        editor=null;
                                    }
                                });
                            };
                            editor.beforeUIValueSet(function(prf, ov, nv, force, tag){
                                if(false!==(profile.beforeEditApply&&profile.boxing().beforeEditApply(profile, item, nv, editor, tag))){
                                    profile.boxing().updateItem(item.id, {caption:nv});
                                    if(profile.onEndEdit)profile.boxing().onEndEdit(profile,item,editor);
                                    undo();
                                }
                            }).onCancel(function(){
                                undo();
                            });
                            xui('body').append(editor);
                            var root=editor.getRoot();
    
                            root.popToTop({
                                left:pos.left+pos2.left,
                                top:pos2.top
                            });
                            // For scroll to undo
                            root.setBlurTrigger("absList_editor_blur",function(){
                                undo();
                            }); 
                            editor.activate();
                        }
                    }
                }
            }
            return this;
        },
        getSelectedItem:function(){
            var uiv=this.getUIValue(true),
                prf=this.get(0),
                items=[],
                item;
            if(_.isArr(uiv)){
                if(uiv.length){
                    _.arr.each(uiv,function(id){
                        if(item=prf.getItemByItemId(id)){
                            items.push(item);
                        }
                    });
                    return items;
                }
            } else if (uiv){
                return prf.getItemByItemId(uiv);
            }
        }
    },
    Initialize:function(){
        var o=this.prototype;
        _.arr.each(_.toArr('getItemByItemId,getItemByDom,getSubIdByItemId,getSubNodeByItemId'),function(s){
            o[s]=function(){
                var t=this.get(0);
                return t[s].apply(t,arguments);
            };
            Class._fun(o[s],s,o.KEY,null,'instance');
        });
    },
    Static:{
        _focusNodeKey:'ITEM',
        $abstract:true,
        // for item in box array
        _ensureValues:xui.UI._ensureValues,

        DataModel:{
            listKey:{
                set:function(value){
                    var o=this,
                        t = o.box.getCachedData(value);
                    if(t)
                        o.boxing().setItems(_.clone(t));
                    else
                        o.boxing().setItems(o.properties.items);
                    o.properties.listKey = value;
                }
            },
            items:{
                ini:[],
                set:function(value){
                    var o=this,
                        ins=o.boxing(),
                        items=o.properties.items,
                        children,ia,bv;

                    //bak value
                    if(typeof ins.setValue=='function'){
                        bv=o.properties.value;
                        if(bv && value && value.length){
                            var i=_.arr.indexOf(value,bv);
                            if(i===-1)
                                i=_.arr.subIndexOf(value,"id",o.properties.value);
                            if(i===-1)
                                bv=value?value[0]?value[0].id?value[0].id:value[0]:"":"";
                        }
                    }

                    // keep children objects
                    if(items && items.length){
                        if(o.children && o.children.length){
                            children=[]
                            _.arr.each(o.children,function(arr){
                                children.push(ia=[arr[0].serialize(false,true),null,null]);
                                if(ia[1]=arr[1]){
                                    var i=_.arr.indexOf(items,arr[1]);
                                    if(i===-1)
                                        i=_.arr.subIndexOf(items,"id",arr[1]);
                                    if(i!==-1)
                                        ia[2]=i;
                                }
                            });
                            // destroy all
                            ins.removeChildren(true,true);
                        }
                        ins.clearItems();
                    }
 
                    ins.insertItems(value?_.copy(value):null);

                    // restore children
                    if(value && value.length && children){
                        var hash={},rhash={},len=value.length;
                        _.arr.each(value,function(item,i){
                            hash[item.id||item]=i;
                            rhash[i]=item.id||item;
                        });
                        _.arr.each(children,function(arr){
                            var added,t;
                            if(_.isSet(arr[1])){
                                // add by id
                                if(hash[arr[1]]){
                                    t=xui.create(arr[0]);
                                    ins.append(t,arr[1]);
                                    if(o.$panelRestore)o.$panelRestore(t.get(0));
                                    added=1;
                                }else{
                                    // add by index
                                    if(rhash[arr[2]]){
                                        t=xui.create(arr[0]);
                                        ins.append(t,rhash[arr[2]]);
                                        if(o.$panelRestore)o.$panelRestore(t.get(0));
                                        added=1;
                                    }
                                }
                            }
                            if(!added){
                                t=xui.create(arr[0]);
                                ins.append(t,bv);
                                if(o.$panelRestore)o.$panelRestore(t.get(0));
                            }
                        });
                    }
                    //try to set value
                    if(_.isSet(bv)){
                        ins.setValue(bv,true,'items');
                    }
                    if(o.renderId){
                        //resize
                        var t=o.getRootNode().style;
                        xui.UI.$tryResize(o, t.width, t.height,true);
                        t=null;
                    }
                }
            },
            valueSeparator:';'
        },
        RenderTrigger:function(){
            this.destroyTrigger=function(){
                _.each(this.SubSerialIdMapItem,function(o){
                    _.breakO(o)
                });
                this.properties.items.length=0;
            };
        },
        EventHandlers:{
            beforePrepareItem:function(profile, item, pid){},
            beforeIniEditor:function(profile, item, captionNode){},
            onBeginEdit:function(profile, item, editor){},
            beforeEditApply:function(profile, item, caption, editor, tag){},
            onEndEdit:function(profile, item, editor){}
        },
        getDropKeys:function(profile,node){
            var item=profile.getItemByDom(node);
            return (item&&item.dropKeys) ||profile.properties.dropKeys;
        },
        getDragKey:function(profile,node){
            var item=profile.getItemByDom(node);
            return (item&&item.dragKey) ||profile.properties.dragKey;
        },
        _adjustItems:function(arr){
            if(!_.isSet(arr))arr=[];
            if(!_.isArr(arr))arr=[arr];
            var a=_.copy(arr),m;
            _.arr.each(a,function(o,i){
                if(!_.isHash(o))
                    a[i]={id:o+''};
                else{
                    a[i]=_.copy(o);
                    a[i].id=_.isSet(a[i].id)?(a[i].id+''):_.id();
                }
            });
            return a;
        },
        //
        _showTips:function(profile, node, pos){
            if(profile.properties.disableTips)return;
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);
            if(!xui.Tips)return;

            var t=profile.properties,
                id=node.id,
                sid=profile.getSubId(id),
                map=profile.SubSerialIdMapItem,
                item=map&&map[sid];

            if(item && ('tips' in item)){
                if(item.tips)xui.Tips.show(pos, item);
                else xui.Tips.hide();
                return false;
            }else if(profile.properties.autoTips && item && 'caption' in item){
                if(item.caption)xui.Tips.show(pos, {tips:item.caption});
                else xui.Tips.hide();
                return false;
            }else
                return true;
        }
    }
});

Class("xui.absValue", "xui.absObj",{
    Instance:{
        /*
        getUIValue:         return $UIvalue
        setUIValue:         set $UIvalue,and _setCtrlValue                   beforeUIValueSet/afterUIValueSet
        getValue:           return value
        setValue:           set value, set $UIvalue, and _setCtrlValue       beforeValueSet/afterValueSet
        resetValue:         reset value,UIvalue,Ctrlvalue not trigger event
        updateValue:        set $UIvalue to value

        _setCtrlValue:      change control value                *need to be overwritten
        _getCtrlValue:      get value from control              *need to be overwritten
        _setDirtyMark:      mark UI ctrl when value!==UIvalue   *need to be overwritten
        */
        _getCtrlValue:function(){return this.get(0).properties.$UIvalue},
        _setCtrlValue:function(value){return this},
        _setDirtyMark:function(key){
          return this.each(function(profile){
                if(!profile.renderId)return;
                var properties = profile.properties,
                    flag=properties.value !== properties.$UIvalue,
                    o=profile.getSubNode(key||"KEY"),
                    d=xui.UI.$css_tag_dirty;
                if(profile._dirtyFlag!==flag){
                    if(properties.dirtyMark && properties.showDirtyMark){
                        if(profile.beforeDirtyMark && false===profile.boxing().beforeDirtyMark(profile,flag)){}
                        else{
                            if(flag) o.addClass(d);
                            else o.removeClass(d);
                        }
                    }
                    profile._dirtyFlag=flag;
                }
            });
        },
        getValue:function(returnArr){
            var prf=this.get(0),
                prop=prf.properties,
                v=prop.value;
            
            if(prf.box.$valuemode=='multi')
                if(returnArr)
                    if(_.isStr(v))
                        v=v.split(prop.valueSeparator);
            
            if(prf.box.$DataModel.selMode && (prop.selMode=='multi'||prop.selMode=='multibycheckbox') && returnArr){
                if(_.isStr(v))
                    v=v.split(prop.valueSeparator);
                if(v && _.isArr(v) && v.length>1)
                    v.sort();
            }
            return v;
        },
        getUIValue:function(returnArr){
            var prf=this.get(0),
                prop=prf.properties;
           
            if(!prf.renderId)
                return prop&&prop.value;

            var cv=this._getCtrlValue(),v;
            if(!prf.box._checkValid || false!==prf.box._checkValid(prf,cv))
                prop.$UIvalue=cv;
            v=prop.$UIvalue;
            
            if(prf.box.$valuemode=='multi')
                if(returnArr)
                    if(_.isStr(v))
                        v=v.split(prop.valueSeparator);

            if(prf.box.$DataModel.selMode && (prop.selMode=='multi'||prop.selMode=='multibycheckbox') && returnArr){
                if(_.isStr(v))
                    v=v.split(prop.valueSeparator);
                if(v && _.isArr(v) && v.length>1)
                    v.sort();
            }
            return v;
        },
        resetValue:function(value){
            var self=this;
            self.each(function(profile){
                var r,pro=profile.properties;
                if(typeof (r=profile.box._ensureValue)=='function')
                    value=r.call(profile.box, profile, value);
                if(pro.value !== value || pro.$UIvalue!==value){
                    if(profile.box._beforeResetValue)profile.box._beforeResetValue(profile);
                    if(typeof(r=profile.$onValueSet)=='function'){
                        r=r.call(profile,pro.value,value);
                        if(_.isSet(r))value=r;
                    }

                    // _setCtrlValue maybe use $UIvalue
                    profile.boxing()._setCtrlValue(pro.value = value);
                    // So, maintain $UIvalue during _setCtrlValue call
                    pro.$UIvalue = value;
                }
                profile._inValid=1;
            });
            self._setDirtyMark();
            return self;
        },
        setUIValue:function(value, force, triggerEventOnly, tag){
            var self=this;
            this.each(function(profile){
                var prop=profile.properties, r,
                    ovalue = prop.$UIvalue,
                    box = profile.boxing();
                if(force || (ovalue !== value)){
                    if(
                        (profile.box._checkValid && false===profile.box._checkValid(profile, value)) ||
                        (profile.beforeUIValueSet && false===(r=box.beforeUIValueSet(profile, ovalue, value, force, tag)))
                      )
                        return;

                    //can get return value
                    if(r!==undefined && typeof r!=='boolean')value=r;
                    //before _setCtrlValue
                    if(profile.box && (typeof (r=profile.box._ensureValue)=='function'))
                        value = r.call(profile.box, profile, value);
                    if(typeof(r=profile.$onUIValueSet)=='function'){
                        r=r.call(profile,value,force,tag);
                        if(_.isSet(r))value=r;
                    }

                    //before value copy
                    var cv;
                    if(profile.renderId && !triggerEventOnly){
                        cv=1;
                        box._setCtrlValue(value);
                    }
        
                    //value copy
                    prop.$UIvalue = value;

                    if(profile.renderId && !triggerEventOnly)box._setDirtyMark();

                    if(profile.afterUIValueSet)box.afterUIValueSet(profile, ovalue, value, force, tag);
                    if(profile.onChange)box.onChange(profile, ovalue, value, force, tag);

                    if(!prop.dirtyMark)
                        box.setValue(value,false,'uiv',cv || triggerEventOnly);
                }
            });
            return this;
        },
        updateValue:function(){
            return this.each(function(profile){
                var prop = profile.properties;
                if(prop.value!==prop.$UIvalue){
                    var ins=profile.boxing();
                    if(ins.checkValid()){
                        // prop.value = ins.getUIValue();
                        ins.setValue(ins.getUIValue(),true,'update');
                        ins._setDirtyMark();
                    }
                }
            });
        },
        isDirtied:function(){
            var dirtied=false;
            this.each(function(profile){
                var p=profile.properties;

                // inner value is alway string
                dirtied = (p.value+" ") !== (p.$UIvalue+" ");
                if(dirtied)
                    return false;
            });
            return dirtied
        },
        checkValid:function(value){
            var prop,tr,r=true,outv=_.isSet(value);
            this.each(function(profile){
                prop=profile.properties;
                tr=true;
                
                // for checking html ctrl valid, <input> only
                if(profile.box._checkValid2)
                    // r must be at the end
                    r = (tr=profile.box._checkValid2(profile)) && r;
                if(tr && profile.box._checkValid)
                    //r must be at the end
                    r = profile.box._checkValid(profile, outv?value:prop.$UIvalue) && r;

                if(!outv && profile.renderId)
                    profile.boxing()._setDirtyMark();
            });
            return r;
        }
    },
    Static:{
        $abstract:true,
        DataModel:{
            readonly:{
                ini:false,
                action: function(v){
                    var i=this.getRoot();
                    if(v)
                        i.addClass('xui-ui-readonly');
                    else
                        i.removeClass('xui-ui-readonly');
                }
            },
            required:{
                ini:false,
                // mark required
                action:function(v){
                    if(this.keys['LABEL']){
                        var node = this.getSubNode('LABEL');
                        if(v)node.addClass('xui-required');
                        else node.removeClass('xui-required');
                    }
                }
            },
            // setValue and getValue
            value:{
                ini:null,
                set:function(value, force, tag, triggerEventOnly){
                    var profile=this,
                        p=profile.properties,r,
                        ovalue=p.value,
                        box=profile.boxing();

                    //check format
                    if(profile.box._checkValid && profile.box._checkValid(profile, value)===false)return;
                    //if return false in beforeValueSet, not set
                    if(profile.beforeValueSet && false=== (r=box.beforeValueSet(profile, ovalue, value,force, tag)))return;
                    // can get return value
                    if(r!==undefined)value=r;
                    //before _setCtrlValue
                    //ensure value
                    if(typeof (r=profile.box._ensureValue)=='function')
                        value = r.call(profile.box, profile, value);

                    if(typeof(r=profile.$onValueSet)=='function'){
                        r=r.call(profile,ovalue,value,force,tag);
                        if(_.isSet(r))value=r;
                    }

                    //before value copy
                    if(profile.renderId && !triggerEventOnly)box._setCtrlValue(value);
                    //value copy
                    p.value = p.$UIvalue = value;

                    if(!profile._inValid)profile._inValid=1;
                    if(profile.renderId)box._setDirtyMark();
                    if(profile.afterValueSet)box.afterValueSet(profile, ovalue, value, force, tag);
                    if(profile.onValueChange)box.onValueChange(profile, ovalue, value, force, tag);
                }
            },
            dirtyMark:true,
            showDirtyMark:true
        },
        // for item in box array
        _ensureValues:xui.UI._ensureValues,
        // for value
        _ensureValue:function(profile,value){
            if(profile.box.$DataModel.selMode && (profile.properties.selMode=='multi'||profile.properties.selMode=='multibycheckbox')){
                if(!_.isArr(value)){
                    value = (value?(''+value):'').split(profile.properties.valueSeparator);
                }
                value.sort();
                return value.join(profile.properties.valueSeparator);
            }else
                return _.isArr(value)?value[0]:value;
        },
        EventHandlers:{
           //real value set
            beforeValueSet:function(profile, oldValue, newValue,force, tag){},
            afterValueSet:function(profile, oldValue, newValue,force, tag){},
            onValueChange:function(profile, oldValue, newValue, force, tag){},

            //ui value set
            beforeUIValueSet:function(profile, oldValue, newValue, force, tag){},
            afterUIValueSet:function(profile, oldValue, newValue, force, tag){},
            onChange:function(profile, oldValue, newValue, force, tag){},

            beforeDirtyMark:function(profile, dirty){}
        },
        RenderTrigger:function(){
            var self=this, b=self.boxing(),p=self.properties,t;
            // disable dataField for container control
            if(!self.behavior.PanelKeys){
                if(t=p.dataBinder)b.setDataBinder(t,true);
                if(t=p.dataField)b.setDataField(t);
            }

            if(p.value!==undefined){
                if(typeof (t=self.box._ensureValue)=='function'){
                    p.value = t.call(self.box, self, p.value);
                    if(p.$UIvalue)
                        p.$UIvalue = t.call(self.box, self, p.$UIvalue);
                }
                if(!p.$UIvalue)
                    p.$UIvalue=p.value;
                b._setCtrlValue(p.$UIvalue,true);
            }            
        }
    }
});

//som base widgets Classes
new function(){
    var u='xui.UI';
    //Widget cls
    Class(u+".Widget", u,{
        Static:{
            Appearances:{
                KEY:{
                    'font-size':xui.browser.ie?0:null,
                    'line-height':xui.browser.ie?0:null
                }
            },
            Templates:{
                className:'xui-uiw-shell {_className}',
                style:'{_style}',
                FRAME:{
                    className:'xui-uiw-frame ',
                    BORDER:{
                        style:'width:{bWidth}px;height:{bHeight}px;',
                        className:'xui-uiw-border'
                    }
                }
            },
            Behaviors:{
                onSize:xui.UI.$onSize
            },
            DataModel:{
                width:100,
                height:100,
                //hide props
                $hborder:0,
                $vborder:0
            },
            RenderTrigger:function(){
                var self=this, p=self.properties, o=self.boxing();

                if(self.renderId)
                    if((!self.$noB) && p.border && o._border)o._border();

                if((!self.$noR) && p.resizer && o.setResizer)
                    o.setResizer(p.resizer,true);
                if((!self.$noS) && p.shadow && o._shadow)
                    o._shadow();
            },
            _onresize:function(profile,width,height){
                var t = profile.properties,
                    o = profile.getSubNode('BORDER'),
                    region,
                    ww=width,
                    hh=height,
                    left=Math.max(0, (t.$b_lw||0)-(t.$hborder||0)),
                    top=Math.max(0, (t.$b_tw||0)-(t.$vborder||0));
                if(ww&&'auto'!==ww){
                    ww -= Math.max((t.$hborder||0)*2, (t.$b_lw||0)+(t.$b_rw||0));
                    /*for ie6 bug*/
                    /*for example, if single number, 100% width will add 1*/
                    /*for example, if single number, attached shadow will overlap*/
                    if(xui.browser.ie6)ww=(parseInt(ww/2,10))*2;
                }
                if(hh&&'auto'!==hh){
                    hh -=Math.max((t.$vborder||0)*2, (t.$b_lw||0) + (t.$b_rw||0));

                    if(xui.browser.ie6)hh=(parseInt(hh/2,10))*2;
                    /*for ie6 bug*/
                    if(xui.browser.ie6&&null===width)o.ieRemedy();
                }
                region={left:left,top:top,width:ww,height:hh};
                o.cssRegion(region);

                /*for ie6 bug*/
                if((profile.$border||profile.$shadow||profile.$resizer) && xui.browser.ie)o.ieRemedy();

                return region;
            }
        }
    });
    
    Class(u+".Link", u,{
        Static:{
            Appearances:{
                KEY:{
                   'font-size':xui.browser.ie?'12px':null,
                   'line-height':xui.browser.ie?'14px':null,
                   cursor:'pointer'
                }
            },
            Templates:{
                tagName:'a',
                className:'{_className}',
                style:'{_style}',
                href :"{href}",
                target:'{target}',
                tabindex: '{tabindex}',
                text:'{caption}'
            },
            Behaviors:{
                HoverEffected:{KEY:'KEY'},
                ClickEffected:{KEY:'KEY'},
                onClick:function(profile, e, src){
                    var r;
                    if(!profile.properties.disabled && profile.onClick)
                        r = profile.boxing().onClick(profile, e, src);
                    //**** if dont return false, this click will break jsonp in IE
                    //**** In IE, click a fake(javascript: or #) href(onclick not return false) will break the current script downloading
                    var href=xui.use(src).attr('href');
                    return typeof r=='boolean'?r:(href.indexOf('javascript:')===0||href.indexOf('#')===0)?false:true;
                }
            },
            DataModel:{
                caption:{
                    ini:undefined,
                    action:function(v){
                        v=(_.isSet(v)?v:"")+"";
                        this.getRoot().html(xui.adjustRes(v,true));
                    }
                },
                href:{
                    ini:xui.$DEFAULTHREF,
                    action:function(v){
                        this.getRoot().attr('href',v);
                    }
                },
                target:{
                    action:function(v){
                        this.getRoot().attr('target',v);
                    }
                }
            },
            EventHandlers:{
                onClick:function(profile, e){}
            }
        }
    });
    
    Class(u+".SLabel", u,{
        Static:{
            Templates:{
                className:'{_className}',
                style:'{_style};text-align:{hAlign}',
                text:'{caption}'
            },
            Appearances:{
                KEY:{
                   'padding-right':'6px'
                }
            },
            DataModel:{
                selectable:true,
                caption:{
                    ini:undefined,
                    action: function(v){
                        v=(_.isSet(v)?v:"")+"";
                        this.getRoot().html(xui.adjustRes(v,true));
                    }
                },
                hAlign:{
                    ini:'right',
                    listbox:['left','center','right'],
                    action: function(v){
                        this.getRoot().css('textAlign',v);
                    }
                }
            },
            Behaviors:{
                HoverEffected:{KEY:'KEY'},
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return false;
                    if(profile.onClick)
                        return profile.boxing().onClick(profile, e, src);
                }
            },
            EventHandlers:{
                onClick:function(profile, e, src){}
            }
        }
    });

    Class(u+".SButton", u,{
        Instance:{
            activate:function(){
                this.getSubNode('FOCUS').focus();
                return this;
            }
        },
        Static:{
            Templates:{
                className:'xui-ui-unselectable {_clsName} {_className}',
                style:'{_style}',
                BTN:{
                    className:'xui-ui-btn',
                    BTNI:{
                        className:'xui-ui-btni',
                        BTNC:{
                            className:'xui-ui-btnc',
                            FOCUS:{
                                tabindex: '{tabindex}',
                                style:"{_align}",
                                ICON:{
                                    $order:1,
                                    className:'xui-ui-icon {imageClass}',
                                    style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                                },
                                CAPTION:{
                                    $order:2,
                                    text:'{caption}'
                                }
                            }
                        }
                    }
                }
            },
            Appearances:{
                BTN:{
                    overflow:'hidden'
                },
                'KEY-auto BTN, KEY-auto BTNI, KEY-auto BTNC, KEY-auto FOCUS':{
                    $order:1,
                    display:xui.$inlineBlock
                },
                'BTN,BTNI,BTNC':{
                    display:'block'
                },
                'KEY FOCUS':{
                    cursor:'pointer',
                    'font-size':'12px',
                    'text-align':'center',
                    display:'block'
                },
                CAPTION:{
                    'vertical-align':xui.browser.ie6?'baseline':'middle',
                    display:'inline'
                }
            },
            Behaviors:{
                HoverEffected:{BTN:['BTN']},
                ClickEffected:{BTN:['BTN']},
                NavKeys:{FOCUS:1},
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return false;
                    profile.getSubNode('FOCUS').focus();
                    if(profile.onClick)
                        return profile.boxing().onClick(profile, e, src);
                },
                onKeydown:function(profile, e, src){
                    var keys=xui.Event.getKey(e), key = keys.key;
                    if(key==' '||key=='enter'){
                        profile.getSubNode('BTN').afterMousedown();
                        profile.__fakeclick=1;
                    }
                },
                onKeyup:function(profile, e, src){
                    var keys=xui.Event.getKey(e), key = keys.key;
                    if(key==' '||key=='enter'){
                        profile.getSubNode('BTN').afterMouseup();
                        if(profile.__fakeclick)
                            xui.use(src).onClick();
                    }
                    delete profile.__fakeclick;
                }
            },
            DataModel:{
                image:{
                   format:'image',
                    action: function(value){
                        this.getSubNode('ICON')
                            .css('display',value?'':'none')
                            .css('backgroundImage',value?('url('+xui.adjustRes(value)+')'):"");
                    }
                },
                imagePos:{
                    action: function(value){
                        this.getSubNode('ICON')
                            .css('backgroundPosition', value);
                    }
                },
                caption:{
                    ini:undefined,
                    action: function(v){
                        v=(_.isSet(v)?v:"")+"";
                        this.getSubNode('CAPTION').html(xui.adjustRes(v,true));
                    }
                },
                hAlign:{
                    ini:'center',
                    listbox:['left','center','right'],
                    action: function(v){
                        this.getSubNode('FOCUS').css('textAlign',v);
                    }
                },
                width:{
                    ini:'auto',
                    action:function(value){
                        if(value=='auto'){
                            this.getRoot().width('auto').tagClass('-auto');
                        }else
                            this.getRoot().width(value).tagClass('-auto',false);
                    }
                },
                height:{
                    readonly:true
                }
            },
            EventHandlers:{
                onClick:function(profile, e, src){}
            },
            _prepareData:function(profile, data){
                data=arguments.callee.upper.call(this, profile,data);
                data._align = 'text-align:'+data.hAlign+';';
                data._clsName=parseInt(data.width,10)?'':profile.getClass('KEY','-auto');
                return data;
            }
        }
    });
    
    Class(u+".SCheckBox", [u,"xui.absValue"],{
        Instance:{
            activate:function(){
                this.getSubNode('FOCUS').focus();
                return this;
            },
            _setCtrlValue:function(value){
                return this.each(function(profile){
                   profile.getSubNode('MARK').tagClass('-checked', !!value);
                });
            },
            //update UI face
            _setDirtyMark:function(){
                return arguments.callee.upper.apply(this,['CAPTION']);
            }
        },
        Static:{
            Templates:{
                className:'{_clsName} {_className}',
                style:'{_style}',
                FOCUS:{
                    tabindex: '{tabindex}',
                    MARK:{
                        $order:0,
                        className:'xui-uicmd-check'
                    },
                    ICON:{
                        $order:1,
                        className:'xui-ui-icon {imageClass}',
                        style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                    },
                    CAPTION:{
                        $order:2,
                        text:'{caption}'
                    }
                }
            },
            Appearances:{
                KEY:{
                    overflow:'visible'
                },
                FOCUS:{
                    cursor:'default',
                    'vertical-align':'middle',
                    padding:'2px 0',
                    'font-size':'12px',
                    'line-height':'22px'
                },
                CAPTION:{
                    'vertical-align':xui.browser.ie6?'baseline':'middle'
                }
            },
            Behaviors:{
                HoverEffected:{KEY:'MARK'},
                ClickEffected:{KEY:'MARK'},
                NavKeys:{FOCUS:1},
                onClick:function(profile, e, src){
                    var p=profile.properties,b=profile.boxing();
                    if(p.disabled)return false;
                    if(p.readonly)return false;
                    b.setUIValue(!p.$UIvalue,null,null,'click');
                    if(profile.onChecked)b.onChecked(profile, e, p.$UIvalue);
                    profile.getSubNode('FOCUS').focus();
                },
                FOCUS:{
                    onKeydown:function(profile, e, src){
                        var key = xui.Event.getKey(e).key;
                        if(key ==' ' || key=='enter'){
                            profile.getRoot().onClick(true);
                            return false;
                        }
                    }
                }
            },
            DataModel:{
                value:false,
                image:{
                    format:'image',
                    action: function(value){
                        this.getSubNode('ICON')
                            .css('display',value?'':'none')
                            .css('backgroundImage',value?('url('+xui.adjustRes(value)+')'):"");
                    }
                },
                imagePos:{
                    action: function(value){
                        this.getSubNode('ICON')
                            .css('backgroundPosition', value);
                    }
                },
                caption:{
                    ini:undefined,
                    action: function(v){
                        v=(_.isSet(v)?v:"")+"";
                        this.getSubNode('CAPTION').html(xui.adjustRes(v,true));
                    }
                }
            },
            EventHandlers:{
                onChecked:function(profile, e, value){}
            },
            _ensureValue:function(profile, value){
                return !!value;
            }
        }
    });
    
    Class(u+".Element", u,{
        Static:{
            _objectProp:{attributes:1},
            Templates:{
                _NativeElement:true,
                tagName:'{nodeName}',
                // dont set class to HTML Element
                className:'xui-wrapper {_className}',
                style:'{_style};',
                //for firefox div focus bug: outline:none; tabindex:'-1'
                tabindex: '{tabindex}',
                text:'{html}'+xui.UI.$childTag
            },
            DataModel:{
                width:'100',
                height:'22',
                nodeName:{
                    ini:"xui",
                    action:function(v){
                        this.boxing().refresh();
                    }
                },
                selectable:true,
                html:{
                    html:1,
                    action:function(v){
                        this.getRoot().html(xui.adjustRes(v,0,1));
                    }
                },
                attributes:{
                    ini:{},
                    action:function(v,ov){
                        var root=this.getRoot();
                        if(!_.isEmpty(ov)){
                            _.each(ov,function(o,i){
                                root.attr(i,null);
                            });
                        }
                        if(!_.isEmpty(v)){
                            _.each(v,function(o,i){
                                root.attr(i,o);
                            });
                        }
                    }
                },
                tabindex:-1
            },
            Appearances:{
                KEY:{
                    'line-height':'auto'
                }
            },
            Behaviors:{
                HoverEffected:{KEY:'KEY'},
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return false;
                    if(profile.onClick)
                        return profile.boxing().onClick(profile, e, src);
                }
            },
            EventHandlers:{
                onClick:function(profile, e, value){}
            },
            RenderTrigger:function(){
                var v=this.properties.attributes;
                if(!_.isEmpty(v)){
                    var root=this.getRoot();
                    _.each(v,function(o,i){
                        root.attr(i,o);
                    });
                }
            }
        }
    });
    
    Class(u+".HTMLButton", u+".Element",{
        Instance:{
            activate:function(){
                this.getRoot().focus();
                return this;
            }
        },
        Static:{
            Templates:{
                _NativeElement:true,
                tagName:'button',
                // dont set class to HTML Element
                className:'xui-wrapper {_className}',
                style:'{_style};',
                tabindex: '{tabindex}',
                text:'{html}'+xui.UI.$childTag 
            },
            DataModel:{
                nodeName:null,
                tabindex:1,
                disabled:{
                    ini:false,
                    action: function(v){
                        var i=this.getRoot(),
                            cls="xui-ui-disabled";
                        
                        if(v)this.getRoot().addClass(cls);
                        else this.getRoot().removeClass(cls);
                        i.attr('disabled',v?"1":null);
                    }
                }
            },
            Behaviors:{
                HoverEffected:{KEY:'KEY'}
            },
            Appearances:{
                KEY:{
                    'line-height':'auto',
                    'cursor':'pointer'
                }
            }
        }
    });
    
    Class(u+".Span", u,{
        Static:{
            Templates:{
                className:'{_className}',
                style:'{_style};{_overflow};',
                //for firefox div focus bug: outline:none; tabindex:'-1'
                tabindex: '{tabindex}',
                text:'{html}'+xui.UI.$childTag
            },
            DataModel:{
                width:'16',
                height:'16',
                selectable:true,
                html:{
                    html:1,
                    action:function(v){
                        this.getRoot().html(xui.adjustRes(v,0,1));
                    }
                },
                overflow:{
                    ini:xui.browser.isTouch?'auto':undefined,
                    combobox:['','visible','hidden','scroll','auto','overflow-x:auto;overflow-y:auto'],
                    action:function(v){
                        var node=this.getContainer();
                        if(v){
                            if(v.indexOf(':')!=-1){
                                _.arr.each(v.split(/\s*;\s*/g),function(s){
                                    var a=s.split(/\s*:\s*/g);
                                if(a.length>1)node.css(_.str.trim(a[0]),_.str.trim(a[1]||''));
                                });
                                return;
                            }
                        }
                        node.css('overflow',v||'');
                    }
                },
                tabindex:-1
            },
            Appearances:{
                KEY:{
                    'line-height':'auto'
                }
            },
            Behaviors:{
                HoverEffected:{KEY:'KEY'},
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return false;
                    if(profile.onClick)
                        return profile.boxing().onClick(profile, e, src);
                }
            },
            EventHandlers:{
                onClick:function(profile, e, value){}
            },
            _prepareData:function(profile,data){
                data=arguments.callee.upper.call(this, profile,data);
                if(_.isStr(data.overflow))
                    data._overflow = data.overflow.indexOf(':')!=-1?(data.overflow):(data.overflow?("overflow:"+data.overflow):"");
                return data;
            }
        }
    });

    Class(u+".CSSBox", u+".Span",{
        Instance:{
            adjustDock:null,
            draggable:null,
            busy:null,
            free:null
        },
        Static:{
            $initRootHidden:true,
            _objectProp:{normalStatus:1,hoverStatus:1,activeStatus:1,focusStatus:1},
            Templates:{
                style:'padding:6px;left:'+xui.Dom.HIDE_VALUE+';top:'+xui.Dom.HIDE_VALUE+';width:150px;height:60px;visibility:hidden;display:none;position:absolute;z-index:0;',
                className:'{_className}',
                text:'{_html}'
            },
            DataModel:{
                className:{
                    ini:null,
                    action:function(){
                        this.box._refreshCSS(this);
                    }
                },
                normalStatus:{
                    ini:{},
                    action:function(v){
                        this.box._refreshCSS(this);
                    }
                },
                hoverStatus:{
                    ini:{},
                    action:function(v){
                        this.box._refreshCSS(this);
                    }
                },
                activeStatus:{
                    ini:{},
                    action:function(v){
                        this.box._refreshCSS(this);
                    }
                },
                focusStatus:{
                    ini:{},
                    action:function(v){
                        this.box._refreshCSS(this);
                    }
                },
                showEffects:null,
                hideEffects:null,
                position:null,
                display:null,
                visibility:null,
                zIndex:null,
                left:null,
                top:null,
                width:null,
                height:null,
                right:null,
                bottom:null,
                rotate:null,
                activeAnim:null,
                hoverPop:null,
                hoverPopType:null,
                dock:null,
                dockStretch:null,
                renderer:null,
                display:null,
                html:null,
                selectable:null,
                overflow:null,
                tabindex:null,
                autoTips:null,
                disableClickEffect:null,
                disableHoverEffect:null,
                disableTips:null,
                disabled:null,
                defaultFocus:null,
                dockStretch:null,
                dockIgnore:null,
                dockOrder:null,
                dockMargin:null,
                dockFloat:null,
                dockMinW:null,
                dockMinH:null,
                dockMaxW:null,
                dockMaxH:null,
                tips:null
            },
            $adjustProp:function(profile,force){
                var cls = (!force && profile.properties.className) || ('xui-css-'+profile.$xid),
                    ko,i=1,hash={};
                profile.box.getAll().each(function(prf){
                    if(prf!==profile)hash[prf.properties.className]=1;                        
                });
                while(hash[cls])cls = cls + (i++);
                profile.properties.className=cls;
            },
            RenderTrigger:function(){
                var prf=this;
                if(!prf.$inDesign){
                    xui('body').prepend(prf.getRoot());
                }
            },
            _prepareData:function(profile,data){
                data=arguments.callee.upper.call(this, profile,data);
                data._html = "Text"+"<"+"style type='text/css'>"+this._getCon(profile)+"<"+"/style>";
                return data;
            },
            _getCon:function(prf){
                    var prop=prf.properties,css="",
                        cls=prop.className,
                        hash1=prop.normalStatus,
                        hash2=prop.hoverStatus,
                        hash3=prop.activeStatus,
                        hash4=prop.focusStatus;
                    if(hash1&&!_.isEmpty(hash1))css+="."+cls+"{"+xui.Dom.$adjustCss(hash1,true)+"}\n";
                    if(hash2&&!_.isEmpty(hash2))css+="."+cls+":hover{"+xui.Dom.$adjustCss(hash2,true)+"}\n";
                    if(hash3&&!_.isEmpty(hash3))css+="."+cls+":active{"+xui.Dom.$adjustCss(hash3,true)+"}";
                    if(hash4&&!_.isEmpty(hash4))css+="."+cls+":focus{"+xui.Dom.$adjustCss(hash4,true)+"}";
                    return css;
            },
            _refreshCSS:function(prf){
                var ns=this;
                _.resetRun(prf.key+":"+prf.$xid,function(){
                    if(prf.destroyed)return;
                    var prop=prf.properties,
                         rootNode=prf.getRootNode(),
                         css=ns._getCon(prf);
                    xui.Dom._setClass(rootNode, prop.className);
                    if(css)xui.CSS._appendSS(rootNode, css);
                });
            },
            EventHandlers:{
                onContextmenu:null,
                onClick:null,
                onDock:null,
                onLayout:null,
                onMove:null,
                onRender:null,
                onResize:null,
                onShowTips:null,
                beforeHoverEffect:null,
                beforeAppend:null,
                afterAppend:null,
                beforeRender:null,
                afterRender:null,
                beforeRemove:null,
                afterRemove:null,
                onHotKeydown:null,
                onHotKeypress:null,
                onHotKeyup:null
            }
        }
    });

    Class(u+".Div", u,{
        Static:{
            Appearances:{
                KEY:{
                   // overflow:(xui.browser.gek && !xui.browser.gek3)?'auto':null,
                    outline:xui.browser.gek?'none':null,
                    zoom:(xui.browser.ie && xui.browser.ver<9)?'1':null,
                    'line-height':'normal',
                    background:xui.browser.ie?'url('+xui.ini.img_bg+') no-repeat left top':null
                }
            },
            Templates:{
                tagName:'div',
                className:'xui-nooutline {_className}',
                style:'{_style};{_panelstyle};{_overflow};',
                //for firefox div focus bug: outline:none; tabindex:'-1'
                tabindex: '{tabindex}',
                text:'{html}'+xui.UI.$childTag
            },
            DataModel:{
                iframeAutoLoad:{
                    ini:"",
                    action:function(){
                        this.box._applyAutoLoad(this);
                    }
                },
                ajaxAutoLoad:{
                    ini:"",
                    action:function(){
                        this.box._applyAutoLoad(this);
                    }
                },
                width:'100',
                height:'100',
                selectable:true,
                html:{
                    html:1,
                    action:function(v){
                        this.getRoot().html(xui.adjustRes(v,0,1));
                    }
                },
                overflow:{
                    ini:xui.browser.isTouch?'auto':undefined,
                    combobox:['','visible','hidden','scroll','auto','overflow-x:auto;overflow-y:auto'],
                    action:function(v){
                        var node=this.getContainer();
                        if(v){
                            if(v.indexOf(':')!=-1){
                                _.arr.each(v.split(/\s*;\s*/g),function(s){
                                    var a=s.split(/\s*:\s*/g);
                                if(a.length>1)node.css(_.str.trim(a[0]),_.str.trim(a[1]||''));
                                });
                                return;
                            }
                        }
                        node.css('overflow',v||'');
                    }
                },
                tabindex:-1
            },
            RenderTrigger:function(){
                // only div
                var ns=this;
                if(ns.box.KEY=="xui.UI.Div")
                    if(ns.properties.iframeAutoLoad||ns.properties.ajaxAutoLoad)
                        ns.box._applyAutoLoad(this);
            },
            Behaviors:{
                HoverEffected:{KEY:'KEY'},
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return false;
                    if(profile.onClick)
                        return profile.boxing().onClick(profile, e, src);
                }
            },
            EventHandlers:{
                onClick:function(profile, e, value){}
            },
            _prepareData:function(profile,data){
                data=arguments.callee.upper.call(this, profile,data);
                if(_.isStr(data.overflow))
                    data._overflow = data.overflow.indexOf(':')!=-1?(data.overflow):(data.overflow?("overflow:"+data.overflow):"");
                return data;
            },
            _applyAutoLoad:function(prf){
                var prop=prf.properties, ins=prf.boxing();
                if(prop.iframeAutoLoad){
                    ins.getContainer().css('overflow','hidden');
                    var _if=typeof prop.iframeAutoLoad=='string'?{url:prop.iframeAutoLoad}:_.clone(prop.iframeAutoLoad,true),
                        id="biframe_"+_(),
                        e=xui.browser.ie && xui.browser.ver<9,
                        ifr=document.createElement(e?"<iframe name='"+id+"'>":"iframe");

                    _if.url=xui.adjustRes(_if.url,false,true);

                    ifr.id=ifr.name=id;
                    if(_.isHash(prop.iframeAutoLoad))prop.iframeAutoLoad.frameName=id;
                    prop._frameName=id;

                    if(!_if.query)_if.query={};
                    _if.query._rand=_();                    
                    ifr.frameBorder='0';
                    ifr.marginWidth='0';
                    ifr.marginHeight='0';
                    ifr.vspace='0';
                    ifr.hspace='0';
                    ifr.allowTransparency='true';
                    ifr.width='100%';
                    ifr.height='100%';
                    ins.getContainer().html("",false);
                    ins.append(ifr);
    
                    if((_if.method||"").toLowerCase()=="post")
                        xui.Dom.submit(_if.url, _if.query, "post", id, _if.enctype);
                    else
                        ifr.src=_if.url;
                }else if(prop.ajaxAutoLoad){
                    var _ajax=typeof prop.ajaxAutoLoad=='string'?{url:prop.ajaxAutoLoad}:_.clone(prop.ajaxAutoLoad,true),
                        options={rspType:"text"};
                    if(!_ajax.query)_ajax.query={};
                    _ajax.query._rand=_();
                    _.merge(options, _ajax.options);
                    ins.busy();
                    var node=ins.getContainer(); 
                    xui.Ajax(xui.adjustRes(_ajax.url,false,true), _ajax.query, function(rsp){
                        node.html(rsp,true,true);
                        ins.free();
                    }, function(err){
                        node.html("<div>"+err+"</div>",true,false);
                        ins.free();
                    }, null, options).start();
                }
            }
        }
    });
    
    Class(u+".Pane", u+".Div",{
        Static:{
            Behaviors:{
                DroppableKeys:['KEY'],
                PanelKeys:['KEY']
            },
            Appearances:{
                KEY:{
                    'line-height':'auto'
                }
            },
            RenderTrigger:function(){
                // only div
                var ns=this;
                if(ns.box.KEY=="xui.UI.Pane")
                    if(ns.properties.iframeAutoLoad||ns.properties.ajaxAutoLoad)
                        ns.box._applyAutoLoad(ns);
            },
            DataModel:{
                rotate:null
            }
        }
    }); 

    Class(u+".MoudluePlaceHolder", u+".Div",{
        Instance:{
            adjustDock:null,
            draggable:null,
            busy:null,
            free:null,
            // for Module
            setProperties:function(key,value){
                var self=this.get(0);
                if(!self._properties)self._properties={};
                if(!key)self._properties={};
                else if(typeof key=='string') self._properties[key]=value;
                else _.merge(self._properties, key, 'all');
                return this;
            },
            getProperties:function(key){
                var self=this.get(0);
                if(!self._properties)self._properties={};
                return key?self._properties[key]:self._properties;
            },
            setEvents:function(key,value){
                var self=this.get(0);
                if(!self._events)self._events={};
                if(!key)
                    self._events={};
                else if(typeof key=='string')
                    self._events[key]=value;
                else
                    _.merge(self._events, key, 'all');
                return this;
            },
            getEvents:function(key){
                var self=this.get(0);
                if(!self._events)self._events={};
                return key?this._events[key]:this._events;
            },
            replaceWithModule:function(module){
                var self=this, 
                    prf=self.get(0), 
                    m,t,parent,subId;
                
                if(!prf || prf.destroyed || prf._replaced)return;
                prf._replaced=1;

                if(prf.$beforeReplaced)prf.$beforeReplaced.call(module);
                // host and alias
                if(prf.host || prf.alias)module.setHost(prf.host, prf.alias);
                if(t=prf._events)module.setEvents(t);
                if(t=prf._properties)module.setProperties(t);
                // maybe in other module
                if(prf.moduleClass && prf.moduleXid){
                    if(m = xui.Module.getInstance(prf.moduleClass, prf.moduleXid)){
                        m.AddComponents(module);
                    }
                }
                if(parent = prf.parent){
                    subId = prf.childrenId;
                    parent.boxing().append(module, subId);
                }else if(prf.rendered && (parent = prf.getRoot().parent()) && !parent.isEmpty()){
                    parent.append(module);
                }

                if(prf.$afterReplaced)prf.$afterReplaced.call(module);
                // Avoid being removed from host 
                prf.alias=null;
                self.destroy();
            }
        },
        Static:{
            Templates:{
                tagName:'div',
                style:'left:0px;top:0px;width:0px;height:0px;visibility:hidden;display:none;position:absolute;z-index:0;'
            },
            DataModel:{
                showEffects:null,
                hideEffects:null,
                activeAnim:null,
                hoverPop:null,
                hoverPopType:null,
                dock:null,
                dockStretch:null,
                renderer:null,
                html:null,
                disableClickEffect:null,
                disableHoverEffect:null,
                disableTips:null,
                disabled:null,
                defaultFocus:null,
                dockStretch:null,
                dockIgnore:null,
                dockOrder:null,
                dockMargin:null,
                dockFloat:null,
                dockMinW:null,
                dockMinH:null,
                dockMaxW:null,
                dockMaxH:null,
                tips:null
            },
            EventHandlers:{
                onContextmenu:null,
                onDock:null,
                onLayout:null,
                onMove:null,
                onRender:null,
                onResize:null,
                onShowTips:null,
                beforeAppend:null,
                afterAppend:null,
                beforeRender:null,
                afterRender:null,
                beforeRemove:null,
                afterRemove:null,
                onHotKeydown:null,
                onHotKeypress:null,
                onHotKeyup:null
            },
            // for parent UIProfile toHtml case
            RenderTrigger:function(){
                var prf=this, self=prf.boxing(), module=prf._module, parent, subId;
                // try it now
                if(module){
                    if(prf&&prf._replaced)return;
                    prf._replaced=1;
                    if(prf.$beforeReplaced)prf.$beforeReplaced.call(module);
                    // host and alias
                    module.setHost(prf.host, prf.alias);
                    if(parent = module.parent){
                        subId = module.childrenId;
                        module.show(function(){
                            if(prf.$afterReplaced)prf.$afterReplaced.call(module);
                            if(self){
                                // Avoid being removed from host 
                                prf.alias=null;
                                self.destroy();
                            }
                        },parent,subId);
                    }else if(prf.rendered && (parent = prf.getRoot().parent()) && !parent.isEmpty()){
                        module.show(function(){
                            if(prf.$afterReplaced)prf.$afterReplaced.call(module);
                            if(self){
                                // Avoid being removed from host 
                                prf.alias=null;
                                self.destroy();
                            }
                        },parent);
                    }
                }
            }
        }
    });
};