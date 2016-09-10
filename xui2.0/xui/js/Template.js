Class('xui.Template','xui.absProfile',{
    Constructor:function(template,properties,events,domId){
        var upper=arguments.callee.upper, args=xui.toArr(arguments);
        upper.apply(this,args);
        upper=null;
        
        var self=this;
        self.$domId = self.KEY + ':' + (self.serialId=self._pickSerialId()) + ':';
        self.domId = typeof domId == 'string'?domId:self.$domId;
        self._links={};
        self.template={'root':[['<div></div>'],[]]};
        self.properties={};
        self.events={};
        self.$template={};
        self.link(self.constructor._cache,'self').link(xui._pool,'xui');
        self.Class=self.constructor;
        self.box=self.constructor;
        self.boxing=function(){return this};

        if(template)self.setTemplate(typeof template=='string'?{'root':template}:template);
        if(events)self.setEvents(events);
        if(properties)self.setProperties(properties);
        return self;
    },
    Instance : {
        renderId:null,
        __gc:function(){
            var self=this,
                t=xui.$cache.reclaimId;
            if(!self.$noReclaim) 
                (t[self.KEY] || (t[self.KEY]=[])).push(self.serialId);
            else 
                delete self.$noReclaim

            delete xui.$cache.profileMap[self.domId];
            delete xui.$cache.profileMap[self.$domId];
            self.unLinkAll();
            xui.breakO([self.properties, self.event, self], 2);
        },
        _reg0:/^\w[\w_-]*$/,
        show:function(parent){
            if(!parent)parent=xui('body');
            parent=xui(parent);
            parent.append(this);
            return this;
        },
        getRootNode:function(){
            return xui.getNodeData(this.renderId, 'element');
        },
        /*
         *getRoot is the only function that depends on xui.Dom Class
        */
        getRoot:function(){
            return xui([this.renderId],false);
        },
        setDomId:function(id){
            var t=this, c=xui.$cache.profileMap, reg=t._reg0;
            //ensure the value
            if(typeof id== 'string' && reg.test(id) && !document.getElementById(id)){
                //delete the original one
                if(t.domId!=t.$domId)delete c[t.domId];
                //set profile's domId
                t.domId=id;
                //change the domNode id value
                if(t.renderId)
                    t.getRootNode().id=id;
                //if doesn't create yet, don't set it to xui.$cache:
                if(c[t.$domId])c[id]=t;
            }
            return t;
        },
        destroy:function(){
            if(this.renderId){
                var rn=this.getRootNode();
                xui.$purgeChildren(rn);
                if(rn.parentNode)
                    rn.parentNode.removeChild(rn);
                rn=null;
            }else this.__gc();          
        },
        setEvents:function(key,value){
            var self=this;
            if(typeof key == 'object')
                self.events=key;
            else
                self.events[key]=value;
            return self;
        },
        setTemplate:function(key,value){
            var self=this, t=self.template,$t=self.$template,h;
            if(typeof key == 'object'){
                self.template=key;
                h={};
                for(var i in key)
                    h[i||'root']=self._buildTemplate(key[i]);
                self.$template=h;
            }else if(typeof value == 'string')
                $t[key]=self._buildTemplate(t[key]=value);
            else
                $t['root']=self._buildTemplate(t['root']=key);
            return self;
        },
        setProperties:function(key,value){
            var self=this;
            if(typeof key == 'object')
                self.properties=key;
            else
                self.properties[key]=value;
            return self;
        },
        getItem:function(src){
            var obj=xui.getNodeData(src);
            if(!obj)return;

            var id=obj.tpl_evid, tpl_evkey=obj.tpl_evkey;
            if(!id || !tpl_evkey)return;

            var me=arguments.callee,
                f = me.f || (me.f = function(data, tpl_evkey, id){
                    var i,o,j,v;
                    for(j in data){
                        o=data[j];
                        if(xui.isArr(o) && (tpl_evkey==j||tpl_evkey.indexOf((data.tpl_evkey||j)+'.')===0))
                            for(i=0;v=o[i];i++){
                                if(v.tpl_evkey==tpl_evkey&&v.id==id)return v;
                                else if(v=f(v,tpl_evkey,id)) return v;
                            }
                    }
                });
            return f(this.properties, tpl_evkey, id);
        } ,
        _pickSerialId:function(){
            //get id from cache or id
            var arr = xui.$cache.reclaimId[this.KEY];
            if(arr && arr[0])return arr.shift();
            return this.constructor._ctrlId.next();
        },
        render:function(){
            var self=this;
            if(!self.renderId){
                var div=xui.$getGhostDiv();
                xui.$cache.profileMap[self.domId]=xui.$cache.profileMap[self.$domId]=this;
                div.innerHTML = self.toHtml();
                //add event handler
                var ch=self.events,
                    eh=xui.Event._eventHandler,
                    children=div.getElementsByTagName('*'),
                    domId=self.$domId,
                    f=function(){return xui.Event(arguments[0],this,0,domId)},
                    i,l,j,k,o,key,id,t,v;
                if(l=children.length){
                    for(i=0;i<l;i++){
                        if((o=children[i]).nodeType!=1)continue;
                        key=o.getAttribute('tpl_evkey');
                        id=o.getAttribute('tpl_evid');
                        if(key!==null && id!==null){
                            v=xui.$registerNode(o);
                            v.tpl_evkey=key;
                            v.tpl_evid=id;
                            if(t = ch[key] ){
                                v=v.eHandlers||(v.eHandlers={});
                                for(j in t){
                                    //attach event handler to domPurgeData
                                    v[j]=f;
                                    //attach event handler to dom node
                                    if(k=eh[j])
                                        v[k]=o[k]=f;
                                }
                            }
                            o.removeAttribute('tpl_evkey');
                            o.removeAttribute('tpl_evid');
                        }
                    }
                    if(!div.firstChild.$xid)
                        xui.$registerNode(div.firstChild);
                    //the first
                    self.renderId=div.firstChild.$xid;
                }
                o=div=null;
            }
            return self;
        },
        refresh:function(){
            var ns=this;
            if(ns.renderId){
                var proxy = document.createElement('span'), 
                    rn = ns.getRootNode(),
                    cache=xui.$cache.profileMap;
                
                //avoid of being destroyed                
                delete cache[ns.domId];
                delete cache[ns.$domId];
                
                if(rn.parentNode)
                    rn.parentNode.replaceChild(proxy,rn);
                ns.destroy();
                
                delete ns.renderId;

                ns.render();

                if(proxy.parentNode)
                    proxy.parentNode.replaceChild(ns.getRootNode(), proxy);

                proxy=rn=null;
            }
            return ns;
        },
        renderOnto:function(node){
            var self=this,id,domNode,style='style',t;
            if(typeof node=='string')node=document.getElementById(node);
            id=node.id||self.domId;
            
            //ensure renderId
            if(!self.renderId)
                self.render();
            
            domNode=self.getRootNode();
            node.parentNode.replaceChild(domNode,node);

            if(domNode.tabIndex!=node.tabIndex)
                domNode.tabIndex!=node.tabIndex;
            if(node.className)
                domNode.className += node.className;
            if(xui.browser.ie && (t=node.style.cssText))
                domNode.style.cssText += t+'';
            else if(t=node.getAttribute(style))
                domNode.setAttribute(style, (domNode.getAttribute(style)||'') + t);

            this.setDomId(id);
        },
        toHtml:function(properties){
            //must copy it for giving a default tpl_evkey
            var p=xui.copy(properties||this.properties||{});
            p.tpl_evkey="root";
            return this._doTemplate(p);
        },
        _reg1:/([^{}]*)\{([\w]+)\}([^{}]*)/g,
        _reg2:/\[event\]/g,
        _buildTemplate:function(str){
            if(typeof str=='string'){
                var obj=[[],[]],
                    a0=obj[0],
                    a1=obj[1];
                str=str.replace(this._reg2,' tpl_evid="{id}" tpl_evkey="{tpl_evkey}" ');
                str.replace(this._reg1,function(a,b,c,d){
                    if(b)a0[a0.length]=b;
                    a1[a0.length]=a0[a0.length]=c;
                    if(d)a0[a0.length]=d;
                    return '';
                });
                return obj;
            }else
                return str;
        },
        _getEV:function(funs, id, name, xid){
            var obj=xui.getNodeData(xid);
            if(!obj)return;

            var evs = this.events,
                tpl_evkey = obj.tpl_evkey,
                evg = (tpl_evkey&&evs&&evs[tpl_evkey])||evs,
                ev = evg&&evg[name];
            if(ev)funs.push(ev);
        },
        _reg3:/(^\s*<\w+)(\s|>)(.*)/,
        _doTemplate:function(properties, tag, result){
            if(!properties)return '';

            var self=this, me=arguments.callee,s,t,n,isA = xui.isArr(properties),
            template = self.$template,
            temp = template[tag||'root'],
            r = !result;

            result= result || [];
            if(isA){
                if(typeof temp != 'function')temp = me;
                for(var i=0;t=properties[i++];){
                    t.tpl_evkey=tag;
                    temp.call(self, t, tag, result);
                }
            }else{
                if(typeof temp == 'function')
                    temp.call(self, properties, tag, result);
                else{
                    tag = tag?tag+'.':'';
                    var a0=temp[0], a1=temp[1];
                    for(var i=0,l=a0.length;i<l;i++){
                        if(n=a1[i]){
                            if(n in properties){
                                t=typeof properties[n]=='function'?properties[n].call(self, n, properties):properties[n];
                                //if sub template exists
                                if(template[s=tag+n])
                                    me.call(self, t, s, result);
                                else
                                    result[result.length]=t;
                            }
                        }else
                            result[result.length]=a0[i];
                    }
                }
            }
            if(r){
                return result.join('')
                    .replace(self._reg3, '$1 id="'+self.$domId+'" $2$3');
            }
        },
        serialize:function(){
            var self=this,
                s=xui.serialize,
                t=xui.absObj.$specialChars,
                properties = xui.isEmpty(self.properties)?null:xui.clone(self.properties,function(o,i){return !t[(i+'').charAt(0)]});            
            return 'new xui.Template(' + 
            s(self.template||null) + "," + 
            s(properties) + "," + 
            s(xui.isEmpty(self.events)?null:self.events) + "," + 
            s(self.$domId!=self.domId?self.domId:null) + 
            ')';
        }
    },
    Static : {
        getFromDom:function(id){
            if((id=typeof id=='string'?id:(id && id.id)) &&(id=xui.$cache.profileMap[id]) && id['xui.Template'])
                return id.boxing();
        },
        _cache:[],
        _ctrlId : new xui.id()
    }
});