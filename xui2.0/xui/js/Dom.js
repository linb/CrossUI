xui.Class('xui.DomProfile', 'xui.absProfile', {
    Constructor:function(domId){
        var upper=arguments.callee.upper;
        if(upper)upper.call(this);
        upper=null;
        xui.$cache.profileMap[this.domId=domId]=this;
    },
    Instance:{
        __gc:function(){
            delete xui.$cache.profileMap[this.domId];
        },
        _getEV:function(funs, id, name){
            var t=xui.$cache.profileMap[id];
            if(t&&(t=t.events)&&(t=t[name]))
                for(var i=0,l=t.length;i<l;i++)
                    if(typeof t[t[i]]=='function')
                        funs[funs.length]=t[t[i]];
        }
    },
    Static:{
        get:function(id){
            return xui.$cache.profileMap[id];
        },
        $abstract:true
    }
});

/*xui.Dom
*/
xui.Class('xui.Dom','xui.absBox',{
    Instance:{
        get:function(index){
            var purge=xui.$cache.domPurgeData,t=this._nodes,s;
            if(xui.isNumb(index))
                return (s=t[index]) && (s=purge[s]) && s.element;
            else{
                var a=[],l=t.length;
                for(var i=0;i<l;i++)
                    a[a.length] = (s=purge[t[i]]) && s.element;
                return a;
            }
        },
        each:function(fun,desc){
            var ns=this,purge=xui.$cache.domPurgeData,n,
                  i, j=ns._nodes, l=j.length;
            if(desc){
                for(i=l;i>=0;i--)
                    if((n=purge[j[i]]) && (n=n.element))
                        if(false===fun.call(ns,n,i))
                            break;
            }else{
                for(i=0;i<l;i++)
                    if((n=purge[j[i]]) && (n=n.element))
                        if(false===fun.call(ns,n,i))
                            break;
            }
            n=null;
            return ns;
        },

        serialize:function(){
            var a=[];
            this.each(function(o){
                a[a.length]=o.id;
            });
            return "xui(['"+a.join("','")+"'])";
        },
        xid:function(){
            return xui.getId(this.get(0));
        },
        //Need to consider the cache in xui.$cache.profileMap
        id:function(value, ignoreCache){
            var t,i,cache=xui.$cache.profileMap;
            if(typeof value == 'string')
                return this.each(function(o){
                    if((i=o.id)!==value){
                        if(!ignoreCache&&(t=cache[i])){
                            cache[value] = t;
                            delete cache[i];
                        }
                        o.id=value;
                    }
                });
            else
                return this.get(0)&&this.get(0).id;
        },

        /*dom collection
        fun: fun to run
        args: arguments for fun
        */
        $sum:function(fun, args){
            var arr=[],r,i;
            this.each(function(o){
                r=fun.apply(o, args||[]);
                if(r){
                    if(xui.isArr(r))
                        for(i=0;o=r[i];i++)
                            arr[arr.length]=o;
                    else
                        arr[arr.length]=r;
                }
            });
            return xui(arr);
        },
        /*get all dir children
        */
        children:function(){
            return this.$sum(function(){
                return xui.toArr(this.childNodes)
            });
        },
        /* clone
         deep for clone all children
        */
        clone:function(deep){
            return this.$sum(function(){
                var n = this.cloneNode(deep?true:false),
                    children=n.getElementsByTagName('*'),
                    ie=xui.browser.ie && xui.browser.ver<9,
                    i=0,o;
                if(ie) n.removeAttribute('$xid');
                else delete n.$xid;
                for(;o=children[i];i++){
                    if(ie) o.removeAttribute('$xid');
                    else delete o.$xid;
                }
                return n;
            },arguments);
        },
        /* iterator
        // type: left : x-axis,  top :y-axis, xy: x-axis and y-axis
        // dir : true => left to right; top to buttom, false => right to left ; bottom to top
        // inn: does start consider children
         fun : number or function => number is iterator index; function is "return true ->stop"
        */
        $iterator:function(type, dir, inn, fun, top){
            return this.$sum(function(type, dir, inn, fun, top){
                var self=arguments.callee;
                if(typeof fun != 'function'){
                    var count=fun||0;
                    fun = function(n,index){return index==count;}
                }
                var index=0,m,n=this,flag=0,t;
                while(n){
                    if(n.nodeType==1)
                        if(fun(n, index++)===true)break;

                    //x-axis true: right ;false: left
                    if(type=='x')
                        n= dir?n.nextSibling:n.previousSibling;
                    //y-axis true: down ;false: up
                    else if(type=='y')
                        n= dir ? self.call(dir===1?n.lastChild:n.firstChild, 'x',(dir!==1), true, 0, top) : n.parentNode;
                    else{
                        inn=xui.isBool(inn)?inn:true;
                        m=null;
                        n= dir ?
                                 (t = inn && n.firstChild ) ? t
                                              : (t = n.nextSibling ) ? t
                                                              :(m=n.parentNode)
                               : (t = inn && n.lastChild) ? t
                                              : (t = n.previousSibling ) ? t
                                                              :(m=n.parentNode);
                        if(m){
                            while(!( m = dir ? n.nextSibling: n.previousSibling)){
                                n=n.parentNode;
                                //to the top node
                                if(!n)
                                    if(flag)
                                        return null;
                                    else{
                                        flag=true;
                                        m = dir ? document.body.firstChild : document.body.lastChild;
                                        break;
                                    }
                            }
                            n=m;
                        }
                        inn=true;
                    }
                }
                return n;
            },arguments);
        },
        /*
        query('div');
        query('div','id');
        query('div','id','a');
        query('div','id',/^a/);
        query('div',function(){return true});
        */
        query:function(tagName, property, expr){
            tagName = tagName||'*';
            var f='getElementsByTagName',
                me=arguments.callee, f1=me.f1||(me.f1=function(tag, attr, expr){
                var all = this[f](tag), arr=[];
                if(expr.test(this[attr]))
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(expr.test(o[attr]))
                        arr[arr.length]=o;
                return arr;
            }),f2=me.f2||(me.f2=function(tag, attr, expr){
                var all = this[f](tag), arr=[];
                if(this[attr]==expr)
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(o[attr]==expr)
                        arr[arr.length]=o;
                return arr;
            }),f3=me.f3||(me.f3=function(tag, attr, expr){
                var all = this[f](tag), arr=[];
                if(this[attr])
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(o[attr])
                        arr[arr.length]=o;
                return arr;
            }),f4=me.f4||(me.f4=function(tag){
                return xui.toArr(this[f](tag));
            }),f5=me.f5||(me.f5=function(tag, attr){
                var all = this[f](tag), arr=[];
                if(attr(this))
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(attr(o))
                        arr[arr.length]=o;
                return arr;
            });
            return this.$sum(property?typeof property=='function'?f5:expr?xui.isReg(expr)?f1:f2:f3:f4, [tagName, property, expr]);
        },
        querySelector:function(selectors){
            return this.$sum(function(){
                return this.querySelector(selectors);
            });
        },
        querySelectorAll:function(selectors){
            return this.$sum(function(){
                return xui.toArr(this.querySelectorAll(selectors));
            });
        },
        /*
        dom add implementation
        for addPrev prepend addNext append
        */
        $add:function(fun,target,reversed){
            if(xui.isHash(target) || xui.isStr(target))
                target=xui.create(target);
            if(reversed){
                reversed=xui(target);
                target=this;
            }else{
                target=xui(target);
                reversed=this;
            }
            if(target._nodes.length){
                var one=reversed.get(0),
                    ns=target.get(),
                    dom=xui.Dom,
                    cache=xui.$cache.profileMap,
                    fragment,uiObj,p,i,o,j,v,uiObj,arr=[];
                target.each(function(o){
                    uiObj=(p=o.id)&&(p=cache[p])&&p.LayoutTrigger&&(one===xui('body').get(0)||dom.getStyle(one,'display')!='none')&&p.LayoutTrigger;
                    if(uiObj)arr.push([uiObj,p]);
                });
                if(ns.length==1)
                    fragment=ns[0];
                else{
                    fragment=document.createDocumentFragment();
                    for(i=0;o=ns[i];i++)
                        fragment.appendChild(o);
                }
                fun.call(one,fragment);
                for(i=0;o=arr[i];i++){
                    for(j=0;v=o[0][j];j++)
                        v.call(o[1]);
                    if(o[1].onLayout)
                        o[1].boxing().onLayout(o[1]);
                }
                arr.length=0;

                one=o=fragment=null;
            }

            return this;
        },
        prepend:function(target,reversed){
            return this.$add(function(node){
                if(this.previousSibling!=node){
                    if(this.firstChild) this.insertBefore(node, this.firstChild);
                    else this.appendChild(node);
                }
            },target,reversed);
        },
        append:function(target,reversed,force){
            return this.$add(function(node){
                if(force||this!=node.parentNode){
                    this.appendChild(node);
                }
            },target,reversed);
        },
        addPrev:function(target,reversed){
            return this.$add(function(node){
                if(this.firstChild!=node)
                    this.parentNode.insertBefore(node,this);
            },target,reversed);
        },
        addNext:function(target,reversed){
            return this.$add(function(node){
                if(this.nextSibling!=node){
                    if(this.nextSibling) this.parentNode.insertBefore(node,this.nextSibling);
                    else this.parentNode.appendChild(node);
                }
            },target,reversed);
        },

        //flag: false => no remove this from momery(IE)
        replace:function(target, triggerGC){
            if(xui.isHash(target) || xui.isStr(target))
                target=xui.create(target);
            target=xui(target);
            var v,i,c=this.get(0),ns=target.get(),l=ns.length;
            if(l>0 && (v=ns[l-1])){
                c.parentNode.replaceChild(v,c);
                for(i=0;i<l-1;i++)
                    v.parentNode.insertBefore(ns[i],v);
                //for memory __gc
                if(triggerGC)
                    this.remove();
            }
            c=v=null;
            return target;
        },
        swap:function(target){
            var self=this,t = xui.Dom.getEmptyDiv().html('*',false);

            if(xui.isHash(target) || xui.isStr(target))
                target=xui.create(target);
            target=xui(target);

            self.replace(t,false);
            target.replace(self,false);
            t.replace(target,false);

            t.get(0).innerHTML='';
            document.body.insertBefore(t.get(0), document.body.firstChild);
            return self;
        },
        //flag : false => remove from dom tree, not free memory
        remove:function(triggerGC, purgeNow, callback){
            if(triggerGC===false)
                this.each(function(o,i){
                    if(o.raphael&&o.remove)o.remove();
                    else if(o.parentNode)o.parentNode.removeChild(o);
                });
            else{
                var c=xui.$getGhostDiv();
                // append to ghost first
                this.each(function(o){
                    c.appendChild(o);
                },true);
                var f=function(){
                    xui.$purgeChildren(c);
                    if(callback){
                        xui.tryF(callback);
                        callback=null;
                    }
                    c=null;
                };
                // for performance
                if(purgeNow)f();else xui.asyRun(f);
            }
            return this;
        },
        //set innerHTML empty
        //flag = false: no gc
        empty:function(triggerGC, purgeNow){
            return this.each(function(o){
                xui([o]).html('',triggerGC, null, purgeNow);
            });
        },

        //flag = false: no gc
        html:function(content,triggerGC,loadScripts,purgeNow, callback){
            var s='',t,i,o=this.get(0);triggerGC=triggerGC!==false;
            if(content!==undefined){
                if(o){
                    if(o.nodeType==3)
                        o.nodeValue=content;
                    else{
                         if(!o.firstChild && content==="")return this;
                         // innerHTML='' in IE, will clear it's childNodes innerHTML
                         // only asy purgeChildren need this line
                         // if(!triggerGC && xui.browser.ie)while(t=o.firstChild)o.removeChild(t);
                         //clear first
                         if(triggerGC){
                            // append to ghost first
                            var c=xui.$getGhostDiv();
                            for (i=o.childNodes.length-1; i>=0; i--)
                                c.appendChild(o.childNodes[i]);
                            var f=function(){
                                xui.$purgeChildren(c);
                                if(callback){
                                    xui.tryF(callback);
                                    callback=null;
                                }
                                c=null;
                            };
                            // for performance
                            if(purgeNow)f();else xui.asyRun(f);                            
                         }

                         var scripts;
                         if(loadScripts){
                            var reg1=/(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig,
                                reg2=/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
                                reg3 = /\ssrc=([\'\"])(.*?)\1/i,
                                matched, attr,src;
                            scripts=[];
                            while((matched = reg1.exec(content))){
                                attr = matched[1];
                                src = attr ? attr.match(reg3) : false;
                                if(src && src[2]){
                                   scripts.push([1,src[2]]);
                                }else if(matched[2] && matched[2].length > 0){
                                   scripts.push([2,matched[2]]);
                                }
                            }
                            content=content.replace(reg2, '');
                        }

                        o.innerHTML=content;
                        if(scripts && scripts.length>0){
                            xui.arr.each(scripts,function(s){
                                if(s[0]==1)
                                    xui.include(null,s[1]);
                                else
                                    xui.exec(s[1]);
                            });
                        }

                        //if(triggerGC)
                        //    xui.UI.$addEventsHandler(o);

                    }
                    o=null;
                }
                return this;
            }else{
                if(o){
                    s = (o.nodeType==3)?o.nodeValue:o.innerHTML;
                    o=null;
                }
                return s;
            }
        },
        loadHtml:function(options, onStart, onEnd){
            var ns=this;
            if(typeof options=='string')options={url:options};
            xui.tryF(onStart);
            xui.Ajax(options.url, options.query, function(rsp){
                var n=xui.create("div");
                n.html(rsp,false,true);
                ns.append(n.children());
                xui.tryF(onEnd);
            }, function(err){
                ns.append("<div>"+err+"</div>");
                xui.tryF(onEnd);
            }, null, options.options).start();
        },
        loadIframe:function(options, domId){
            if(typeof options=='string')options={url:options};
            var id=domId||("aiframe_"+xui.stamp()),t;
            if(t=xui.Dom.byId(domId)){
                xui(t).remove();
            }
            var e=xui.browser.ie && xui.browser.ver<9,
                ifr=document.createElement(e?"<iframe name='"+id+"'>":"iframe");
            ifr.id=ifr.name=id;
            ifr.src=options.url;
            ifr.frameBorder='0';
            ifr.marginWidth='0';
            ifr.marginHeight='0';
            ifr.vspace='0';
            ifr.hspace='0';
            ifr.allowTransparency='true';
            ifr.width='100%';
            ifr.height='100%';
            this.append(ifr);
            xui.Dom.submit(options.url, options.query, options.method, ifr.name, options.enctype);
        },
        outerHTML:function(content, triggerGC){
            var self=this, t,s='', o=self.get(0),id=o.id;
            if(content!==undefined){
                var n=self.replace(xui.str.toDom(content),false);
                self._nodes[0]=n._nodes[0];

                //avoid inner nodes memory leak
                xui([o]).remove(triggerGC);
                return self;
            }else{
                if(xui.browser.gek){
                    var m = xui.$getGhostDiv();
                    m.appendChild(self.get(0).cloneNode(true));
                    s=m.innerHTML;
                    m.innerHTML="";
                    m=null;
                }else{
                    s= o.outerHTML;
                }
                o=null;
                return s;
            }
        },
        text:function(content){
            if(content!==undefined){
                var self=this, arr=[];
                self.each(function(o){
                    var t=o.firstChild;
                     if(t&&t.nodeType!=1)
                        t.nodeValue = content;
                     else
                        arr[arr.length]=o;
                });
                if(arr.length){
                    xui(arr).empty().each(function(o){
                        o.appendChild(document.createTextNode(content));
                    })
                }
                return self;
            }else{
               return (function(o){
                  if(!o)return '';
                  return o.textContent || o.innerText;
                  /*
                  var i,a=o.childNodes,l=a.length,content='',me=arguments.callee;
                  for(i=0;i<l;i++)
                    if(a[i].nodeType!= 8)
                      content += (a[i].nodeType!=1) ? a[i].nodeValue : me(a[i]);
                  return content;
                  */
                })(this.get(0));
            }
        },
        /*
        .attr(name)=>get attr
        .attr(name,value)=>set attr
        .attr(name,null)=>remove attr
        */
        attr:function(name, value){
            //set one time only
            var self=this,
                me = arguments.callee,
                map1 = me.map1 || (me.map1 = {
                    'class':'className',
                    readonly: "readOnly",
                    tabindex: "tabIndex",
                    'for':'htmlFor',
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    rowspan: "rowSpan",
                    value:'value'
                }),
                map2 = me.map2||(me.map2={
                    href:1,src:1,style:1
                });

            if(typeof name=='object'){
                for(var i in name)
                    me.call(self,i,name[i]);
                return self;
            }

            var iestyle = xui.browser.ie && name=='style',
                normal=!map2[name=map1[name]||name];
            if(value!==undefined){
                return self.each(function(o){
                    //remove attr
                    if(value===null){
                        if(iestyle)o.style.cssText='';
                        else if(normal){
                            try{
                                o[name]=null;
                                if(o.nodeType==1)o.removeAttribute(name)
                            }catch(e){}
                        }
                    //set attr
                    }else{
                        value=name=='style'?(value+'').replace(/[;]+/g,';').replace(/^;/,''):value;
                        if(iestyle)o.style.cssText=''+value;
                        else if(normal){
                             o[name]=value;
                             if(o.nodeType==1 && name!="value" && typeof value=='string')o.setAttribute(name, value);
                        }else
                            o.setAttribute(name, value);
                    }
                 });
            //get attr
            }else{
                var r,o=self.get(0);
                if(iestyle) return o.style.cssText;
                if(name=="selected"&&xui.browser.kde) return o.parentNode.selectedIndex;
                r=((name in o) && normal)?o[name]:o.getAttribute(name, xui.browser.ie && !normal ? 2 : undefined );
                o=null;
                return name=='style'?r.replace(/[;]+/g,';').replace(/^;/,''):r;
            }
        },
        $touchscroll:function(type){
            if(xui.browser.fakeTouch || (xui.browser.isTouch && (xui.browser.isAndroid||xui.browser.isBB))){
                var hash={"x":1,"y":1,"xy":1},nodes=this._nodes,getD=function(t){
                        var o=xui.getNodeData(t,'_wheelscroll');
                        if(!o)xui.setNodeData(t,'_wheelscroll',o={});
                        return o;
                    },
                    doSwipe = function(t){
                            var wheel=getD(t);
                            if((wheel._speedx||wheel._speedy) && ((new Date).getTime() - wheel._lastTime)<50){
                                var params={},sl=t.scrollLeft,st=t.scrollTop,limit=50,rate=40,duration=2000,m;
                                if(wheel._speedx){
                                    m=[Math.max(0,sl), Math.max(0,sl + Math.sign(wheel._speedx)*Math.min(limit,Math.abs(wheel._speedx))*rate)];
                                    if(m[0]!==m[1])params.scrollLeft=m;
                                }
                                if(wheel._speedy){
                                    m=[Math.max(0,st), Math.max(0,st + Math.sign(wheel._speedy)*Math.min(limit,Math.abs(wheel._speedy))*rate)];
                                    if(m[0]!==m[1])params.scrollTop=m;
                                }
                                if(!xui.isEmpty(params)){
                                    var tid=xui.getNodeData(t,'_inthread');
                                    if(tid){
                                        xui.Thread.abort(tid);
                                        xui.setNodeData(t,'_inthread');
                                        xui.setData(['!document','$fakescroll']);
                                    }
                                    xui(t).animate(params, null, null,duration,null,"expoOut").start();
                                }
                            }
                            wheel._opx=wheel._opy=wheel._ox=wheel._oy=wheel._lastTime=wheel._speedx=wheel._speedy=null;
                    };
                if(!hash[type])type=null;
                xui(nodes)[xui.browser.fakeTouch?'onMousedown':'onTouchstart'](hash[type]?function(p,e,src){
                    if(xui.DragDrop._profile.isWorking) return true;
                    if(!xui(src).scrollable('x') && !xui(src).scrollable('y'))return true;
                    var s,t=xui(src).get(0);
                    var tid=xui.getNodeData(t,'_inthread');
                    if(tid){
                        xui.Thread.abort(tid);
                        xui.setNodeData(t,'_inthread');
                    }
                    var wheel=getD(t);

                    if(xui.browser.fakeTouch){
                        if(xui.Event.getBtn(e)!=='left')return true;
                        s=e;
                    }else{
                        if(e.touches.length>1)return true;
                        s=e.touches[0];
                    }
                    if(t){
                        if(type=='xy'||type=='x'){
                            wheel._ox=t.scrollLeft;
                            wheel._opx=s.pageX;
                        }
                        if(type=='xy'||type=='y'){
                            wheel._oy=t.scrollTop
                            wheel._opy=s.pageY;
                        }
                    }
                    // ***add for fake case
                    if(xui.browser.fakeTouch){
                        xui.setData(['!document','$fakescroll'],src);
                        xui.doc.onMouseup(function(p,e,src){
                            xui.setData(['!document','$fakescroll']);
                            xui.asyRun(function(){xui.setData(['!document','$fakescrolling']);});
                            // ***clear for fake case
                            xui.doc.onMouseup(null,'touchscroll');
                            doSwipe(t);
                        },'touchscroll');
                        return false;
                    }
                    return true;
                }:null,'touchscroll');

                xui(nodes)[xui.browser.fakeTouch?'onMousemove':'onTouchmove'](hash[type]?function(p,e,src){
                    if(xui.DragDrop._profile.isWorking) return true;
                    if(xui.browser.fakeTouch && xui.getData(['!document','$fakescroll'])!=src)return true;
                    var s,t=xui(src).get(0),x1,y1,first;
                    if(xui.browser.fakeTouch){
                        if(xui.Event.getBtn(e)!=='left')return true;
                        s=e;
                    }else{
                        if(e.touches.length>1)return true;
                        s=e.touches[0];
                    }
                    if(t){
                        var wheel=getD(t);
                        wheel._lastTime=(new Date).getTime();
                        x1=t.scrollLeft;y1=t.scrollTop;
                        if(type=='xy'||type=='x'){
                            t.scrollLeft=wheel._ox + wheel._opx - s.pageX;
                            if(x1==t.scrollLeft){
                                wheel._ox=t.scrollLeft;
                                wheel._opx=s.pageX;
                            }else{
                                wheel._speedx=t.scrollLeft-x1;
                            }
                        }
                        if(type=='xy'||type=='y'){
                            if(wheel._oy===null)wheel._oy=t.scrollTop+wheel._opy;
                            t.scrollTop=wheel._oy + wheel._opy - s.pageY;

                            if(y1==t.scrollTop){
                                wheel._oy=t.scrollTop;
                                wheel._opy=s.pageY;
                            }else{
                                wheel._speedy=t.scrollTop-y1;
                            }
                        }
                        // effected
                        if(xui.browser.fakeTouch){
                            if(x1!==t.scrollLeft || y1!==t.scrollTop){
                                xui.setData(['!document','$fakescrolling'], 1);
                            }
                        }
                        return x1==t.scrollLeft && y1==t.scrollTop;
                    }
                }:null,'touchscroll');

                xui(nodes).onTouchend(hash[type]?function(p,e,src){
                    if(xui.DragDrop._profile.isWorking) return true;
                    if(e.touches.length>1)return true;
                    doSwipe(xui(src).get(0));
                }:null,'touchscroll');
            }
            return this;
        },
        isScrollBarShowed:function(type){
            var n=this.get(0);
            if(n)return type=='y'?((n.offsetWidth||0)>(n.clientWidth||0)):((n.offsetHeight||0)>(n.clientHeight||0));
        },
        scrollable:function(type){
            type=type=='x'?'scrollLeft':'scrollTop';
            if(this[type]()!==0)return true;
            this[type](1);
            if(this[type]()===0)return false;
            this[type](0);
            return true;
        },
        scrollIntoView:function(){
            return  this.each(function(o){
                o.scrollIntoView();
            });
        },
        /*
        name format: 'xxxYxx', not 'xxx-yyy'
        left/top/width/height like, must specify 'px'
        Does't fire onResize onMove event
        */
        css:function(name, value, force){
            if(typeof name=='object' || value!==undefined){
                this.each(function(o){
                    xui.Dom.setStyle(o,name,value)
                });

                if(xui.browser.fakeTouch || (xui.browser.isTouch && (xui.browser.isAndroid||xui.browser.isBB))){
                    if(name=='overflow'||name=='overflow-x'||name=='overflow-y'){
                        if(value=='auto'||value=='scroll')
                            this.$touchscroll(name=='overflow'?'xy':name=='overflow-x'?'x':'y');
                        else
                            this.$touchscroll(null);
                    }
                }
                return this;
            }else{
                return xui.Dom.getStyle(this.get(0), name, force);
            };
        },
        _getEmSize:function(rate){
            return this.get(0) ? (parseFloat(xui.Dom.getStyle(this.get(0), 'fontSize', true))||xui.CSS._getDftEmSize() ) * (rate||1) : null;
        },
        rotate:function(v){
            if(xui.isSet(v)){
                v=parseFloat(v)||0;
                v=v%360;
                if(v<0)v=v+360;
                return this.each(function(o){
                    if(o.raphael&&o.id){
                        var prf=xui.Event._getProfile(o.id);
                        if((prf = prf && prf.parent && prf.parent._paper) && (o=prf.getById(o.raphaelid)))
                            o.transform('r'+v);
                    }else{
                        v+='deg';
                        var transform=o.style.transform||"";
                        if(/rotate\([^)]*\)/i.test(transform))transform=transform.replace(/(rotate\()([^)]+)/i, '$1'+v);
                        else transform+=" rotate("+v+")";
                        xui.Dom.setStyle(o,'transform',transform);
                    }
                });
            }else{
                var o=this.get(0);
                if(o.raphael&&o.id){
                        var prf=xui.Event._getProfile(o.id);
                        if((prf = prf && prf.parent && prf.parent._paper) && (o=prf.getById(o.raphaelid))){
                            // for format
                            o=o.transform();
                            if(xui.isArr(o)){
                                if(!o.length) o="";
                                else o=o.join();
                            }else{
                                if(!o)o="";
                                else o=Raphael.parseTransformString(o).join();
                            }
                            var arr=/r,([-\d.]+)/i.exec(o);
                            v=arr?parseFloat(arr[1]||0):0;
                            v=v%360;
                            if(v<0)v=v+360;
                            return v;
                        }
                        return 0;
                }else{
                   var arr=/rotate\(([-\d.]+)/i.exec(o.style.transform);
                   return arr?parseFloat(arr[1]||0):0;
                }
            }
        },
        scaleX:function(v){
            if(xui.isSet(v)){
                return this.each(function(o){
                     v=parseFloat(v);
                     if(o.raphael&&o.id){
                         v=v||0;
                        var prf=xui.Event._getProfile(o.id),t;
                        if((prf = prf && prf.parent && prf.parent._paper) && (o=prf.getById(o.raphaelid))){
                            t=xui.clone(Raphael.parseTransformString(o.transform()),true);
                            // only for the first
                            if(t&&t[0]&&t[0][0]=="s"){
                                t[0][1]=v;
                            }else{
                                t=t||[];
                                t.unshift(['s',v,1]);
                            }
                            o.transform(t);
                        }
                    }else{
                        if(xui.isNaN(v))v=1;
                        var transform=o.style.transform||"";
                        if(/(scale\()([^,]+),([^)]+)/i.test(transform))transform=transform.replace(/(scale\()([^,]+),([^)]+)/i, '$1'+v+',$3');
                        else if(/scale\([-\d.]*\)/i.test(transform))transform=transform.replace(/scale\([-\d.]*\)/i, 'scale('+v+',1)');
                        else transform+=" scale("+v+",1)";
                        xui.Dom.setStyle(o,'transform',transform);
                    }
                });
            }else{
                 var o=this.get(0);
                if(o.raphael&&o.id){
                    v=1;
                    var prf=xui.Event._getProfile(o.id);
                    if((prf = prf && prf.parent && prf.parent._paper) && (o=prf.getById(o.raphaelid))){
                         xui.arr.each(Raphael.parseTransformString(o.transform()),function(t){
                            if(t[0]=="s")v*=t[1];
                        });
                    }
                    return v;
                }else{
                   var arr=/(scale\()([^,]+),([^)]+)/i.exec(this.get(0).style.transform);
                   if(arr)return parseFloat(arr[2]||1);
                   else{
                        arr=/scale\(([-\d.]*)\)/i.exec(this.get(0).style.transform);
                        return arr?arr[1]:1;
                    }
                }
            }
        },
        scaleY:function(v){
            if(xui.isSet(v)){
                return this.each(function(o){
                    v=parseFloat(v);
                    if(o.raphael&&o.id){
                        v=v||0;
                        var prf=xui.Event._getProfile(o.id),t;
                        if((prf = prf && prf.parent && prf.parent._paper) && (o=prf.getById(o.raphaelid))){
                            t=xui.clone(Raphael.parseTransformString(o.transform()),true);
                            // only for the first
                            if(t&&t[0]&&t[0][0]=="s"){
                                t[0][2]=v;
                            }else{
                                t=t||[];
                                t.unshift(['s',1,v]);
                            }
                            o.transform(t);
                        }
                    }else{
                         if(xui.isNaN(v))v=1;
                        var transform=o.style.transform||"";
                        if(/(scale\()([^,]+),([^)]+)/i.test(transform))transform=transform.replace(/(scale\()([^,]+),([^)]+)/i, '$1$2,'+v);
                        else if(/scale\([-\d.]*\)/i.test(transform))transform=transform.replace(/scale\([-\d.]*\)/i, 'scale(1,'+v+')');
                        else transform+=" scale(1,"+v+")";
                        xui.Dom.setStyle(o,'transform',transform);
                    }
                });
            }else{
                var o=this.get(0);
                if(o.raphael&&o.id){
                   v=1;
                    var prf=xui.Event._getProfile(o.id);
                    if((prf = prf && prf.parent && prf.parent._paper) && (o=prf.getById(o.raphaelid))){
                         xui.arr.each(Raphael.parseTransformString(o.transform()),function(t){
                            if(t[0]=="s")v*=t[2];
                        });
                    }
                    return v;
                }else{
                   var arr=/(scale\()([^,]+),([^)]+)/i.exec(this.get(0).style.transform);
                   if(arr)return parseFloat(arr[3]||1);
                   else{
                        arr=/scale\(([-\d.]*)\)/i.exec(this.get(0).style.transform);
                        return arr?arr[1]:1;
                    }
                }
            }
        },
        translateX:function(v){
            if(xui.isSet(v)){
                return this.each(function(o){
                     if(o.raphael&&o.id){
                        v=parseFloat(v)||0;
                        var prf=xui.Event._getProfile(o.id),t;
                        // modify the last 't'
                        if((prf = prf && prf.parent && prf.parent._paper) && (o=prf.getById(o.raphaelid))){
                            t=xui.clone(Raphael.parseTransformString(o.transform()),true);
                            if(t&&t.length&&t[t.length-1]&&(t[t.length-1][0]=="t")){
                                t[t.length-1][1]=v;
                            }else{
                                t=t||[];
                                t.push(['t',v,0]);
                            }
                            o.transform(t);
                        }
                    }else{
                        v=xui.CSS.$addu(v);
                        var transform=o.style.transform||"";
                        if(/translate\([^)]*\)/i.test(transform))transform=transform.replace(/(translate\()([^,]+),([^)]+)/i, '$1'+v+',$3');
                        else transform+=" translate("+v+",0)";
                        xui.Dom.setStyle(o,'transform',transform);
                    }
                });
            }else{
                var o=this.get(0);
                if(o.raphael&&o.id){
                    v=0;
                    var prf=xui.Event._getProfile(o.id);
                    if((prf = prf && prf.parent && prf.parent._paper) && (o=prf.getById(o.raphaelid))){
                         xui.arr.each(Raphael.parseTransformString(o.transform()),function(t){
                            if(t[0]=="t")v+=t[1];
                        });
                    }
                    return v;
                }else{
                   var arr=/(translate\()([^,]+),([^)]+)/i.exec(this.get(0).style.transform);
                   return arr?(arr[2]||"").replace(/\s/g,''):'';
                }
            }
        },
        translateY:function(v){
            if(xui.isSet(v)){
                return this.each(function(o){
                     if(o.raphael&&o.id){
                        v=parseFloat(v)||0;
                        var prf=xui.Event._getProfile(o.id);
                        if((prf = prf && prf.parent && prf.parent._paper) && (o=prf.getById(o.raphaelid))){
                            t=xui.clone(Raphael.parseTransformString(o.transform()),true);
                            // modify the last 't'
                            if(t&&t.length&&t[t.length-1]&&(t[t.length-1][0]=="t")){
                                t[t.length-1][2]=v;
                            }else{
                                t=t||[];
                                t.push(['t',0,v]);
                            }
                            o.transform(t);
                        }
                    }else{
                        v=xui.CSS.$addu(v);
                        var transform=o.style.transform||"";
                        if(/translate\([^)]*\)/i.test(transform))transform=transform.replace(/(translate\()([^,]+),([^)]+)/i, '$1$2,'+v);
                        else transform+=" translate(0,"+v+")";
                        xui.Dom.setStyle(o,'transform',transform);
                    }
                });
            }else{
                var o=this.get(0);
                if(o.raphael&&o.id){
                    v=0;
                    var prf=xui.Event._getProfile(o.id);
                    if((prf = prf && prf.parent && prf.parent._paper) && (o=prf.getById(o.raphaelid))){
                         xui.arr.each(Raphael.parseTransformString(o.transform()),function(t){
                            if(t[0]=="t")v+=t[2];
                        });
                    }
                    return v;
                }else{
                   var arr=/(translate\()([^,]+),([^)]+)/i.exec(this.get(0).style.transform);
                   return arr?(arr[3]||"").replace(/\s/g,''):'';
                }
            }
        },
        skewX:function(v){
            if(xui.isSet(v)){
                if(xui.isFinite(v))v+='deg';
                return this.each(function(o){
                    var transform=o.style.transform||"";
                    if(/skew\([^)]*\)/i.test(transform))transform=transform.replace(/(skew\()([^,]+),([^)]+)/i, '$1'+(v||0)+',$3');
                    else transform+=" skew("+v+",0deg)";
                    xui.Dom.setStyle(o,'transform',transform);
                });
            }else{
               var arr=/(skew\()([^,]+),([^)]+)/i.exec(this.get(0).style.transform);
               return arr?parseFloat(arr[2]||0):0;
            }
        },
        skewY:function(v){
            if(xui.isSet(v)){
                 if(xui.isFinite(v))v+='deg';
                return this.each(function(o){
                    var transform=o.style.transform||"";
                    if(/skew\([^)]*\)/i.test(transform))transform=transform.replace(/(skew\()([^,]+),([^)]+)/i, '$1$2,'+(v||0));
                    else transform+=" skew(0deg,"+v+")";
                    xui.Dom.setStyle(o,'transform',transform);
                });
            }else{
               var arr=/(skew\()([^,]+),([^)]+)/i.exec(this.get(0).style.transform);
               return arr?parseFloat(arr[3]||0):0;
            }
        },
        /*
        *IE/opera \r\n will take 2 chars
        *in IE: '/r/n'.lenght is 2, but range.moveEnd/moveStart will take '/r/n' as 1.
        */
        caret:function(begin,end){
            var input =this.get(0), tn=input.nodeName.toLowerCase(), type=typeof begin,ie=xui.browser.ie, pos;
            if(!/^(input|textarea)$/i.test(tn))return;
            if(tn=="input" && input.type.toLowerCase()!='text'&& input.type.toLowerCase()!='password')return;
            input.focus();
            //set caret
            if(type=='number'){
                if(ie){
                    var r = input.createTextRange();
                    r.collapse(true);
                    r.moveEnd('character', end);
                    r.moveStart('character', begin);
                    r.select();
                }else{
                    input.focus();
                    input.setSelectionRange(begin, end);
                }
                return this;
            //replace text
            }else if(type=='string'){
                    var r=this.caret(),l=0,m=0,ret,
                        v=input.value,
                        reg1=/\r/g;
                    //for IE, minus \r
                    if(ie){
                        l=v.substr(0,r[0]).match(reg1);
                        l=(l && l.length) || 0;
                        m=begin.match(reg1);
                        m=(m && m.length) || 0;
                    }
                    //opera will add \r to \n, automatically
                    if(xui.browser.opr){
                        l=begin.match(/\n/g);
                        l=(l && l.length) || 0;
                        m=begin.match(/\r\n/g);
                        m=(m && m.length) || 0;
                        m=l-m;l=0;
                    }
                    input.value=v.substr(0,r[0])+begin+v.substr(r[1],v.length);
                    ret= r[0] - l + m + begin.length;
                    this.caret(ret,ret);
                    return ret;
            //get caret
            }else{
                if(ie && document.selection){
                    var r=document.selection.createRange(),
                        txt=r.text,
                        l=txt.length,
                        e,m;
                    if(tn.toLowerCase()=='input'){
                        r.moveStart('character', -input.value.length);
                        e=r.text.length;
                        return [e-l,e];
                    }else{
                        var rb=r.duplicate();
                        rb.moveToElementText(input);
                        rb.setEndPoint('EndToEnd',r);
                        e=rb.text.length;
                        return [e-l, e];
                    }
                //firefox opera safari
                }else
                    return [input.selectionStart, input.selectionEnd];
            }
        },
        //left,top format: "23px"
        show:function(left,top,callback,showEffects,ignoreEffects){
            var style,t,v=xui.Dom.HIDE_VALUE,vv;
            return this.each(function(o){
                if(o.nodeType != 1)return;
                var tid=xui.getNodeData(o,'_inthread');
                if(tid){
                    xui.Thread.abort(tid);
                    xui.setNodeData(o,'_inthread');
                }

                style=o.style;
                vv=xui.getNodeData(o);
                if(vv._xuihide){
                    if('_left' in vv)if(style.left!=(t=vv._left))style.left=t;
                    if('_top' in vv)if(style.top!=(t=vv._top))style.top=t;
                    if('_position' in vv)if(style.position!=(t=vv._position))style.position=t;
                    if(style.visibility!='visible')style.visibility='visible';
                    vv._xuihide=0;
                }
                if(xui.isSet(left))style.left=left;
                if(xui.isSet(top))style.top=top;
                //force to visible
//                if(style.visibility!='visible')style.visibility='visible';
//                if(style.display=='none')style.display='';

                //ie6 bug
              /*  if(xui.browser.ie&&xui.browser.ver<=6){
                    t=style.wordWrap=='normal';
                    xui.asyRun(function(){
                        style.wordWrap=t?'break-word':'normal'
                    })
                }*/
                showEffects=ignoreEffects?null:showEffects?showEffects:xui.get(xui.UIProfile.getFromDom(o),['properties','showEffects']);
                if(showEffects)showEffects=xui.Dom._getEffects(showEffects,1);
                if(showEffects)xui.Dom._vAnimate(o,showEffects,callback);else if(callback)callback();
            });
        },
        hide:function(callback,hideEffects,ignoreEffects){
            var style,vv;
            return this.each(function(o){
                if(o.nodeType != 1)return;
                var tid=xui.getNodeData(o,'_inthread');
                if(tid){
                    xui.Thread.abort(tid);
                    xui.setNodeData(o,'_inthread');
                }

                style=o.style;
                vv=xui.getNodeData(o);
                var fun=function(){
                    if(vv._xuihide!==1){
                        vv._position = style.position;
                        vv._visibility = style.visibility;
                        vv._top = style.top;
                        vv._left = style.left;
                        vv._xuihide=1;
                    }
                    if(style.position!='absolute')style.position = 'absolute';
                    style.visibility="hidden";
                    style.top = style.left = xui.Dom.HIDE_VALUE;

                    if(callback)callback();
                };
                hideEffects=ignoreEffects?null:hideEffects?hideEffects:xui.get(xui.UIProfile.getFromDom(o),['properties','hideEffects']);
               if(hideEffects)hideEffects=xui.Dom._getEffects(hideEffects,0);
                if(hideEffects)xui.Dom._vAnimate(o,hideEffects,fun);else fun();
            });
        },
        cssRegion:function(region,triggerEvent) {
            var self=this;
            if(typeof region=='object'){
                var i,t,m,  node=self.get(0), dom=xui.Dom, f=dom._setUnitStyle,m={};
                for(var j=0,c=dom._boxArr;i=c[j++];)
                    m[i] = ((i in region) && region[i]!==null)?f(node,i,region[i]):false;
                if(triggerEvent){
                    var f=dom.$hasEventHandler;
                    if(f(node,'onsize') && (m.width||m.height))self.onSize(true, {width:m.width,height:m.height});
                    if(f(node,'onmove') && (m.left||m.top))self.onMove(true, {left:m.left,top:m.top});
                }
                return self;
            }else{
                var offset=region,parent=triggerEvent,
                    pos = offset?self.offset(null,parent):self.cssPos(),
                    size = self.cssSize();
                return {
                    left:pos.left,
                    top:pos.top,
                    width:size.width,
                    height:size.height
                };
            }
        },
        //for quick size
        cssSize:function(size,triggerEvent) {
            var self=this, node=self.get(0),r,dom=xui.Dom,f=dom._setUnitStyle,b1,b2;
            if(node){
               if(size){
                    var t;
                    b1 = size.width!==null?f(node,'width',size.width):false;
                    b2 = size.height!==null?f(node,'height',size.height):false;
                    if(triggerEvent && (b1||b2) && dom.$hasEventHandler(node,'onsize'))self.onSize(true, {width:b1,height:b2});
                    r=self;
                }else
                    r={ width :self._W(node,1)||0,  height :self._H(node,1)};
                return r;
            }else{
                return size?self:{};
            }
        },
        //for quick move
        cssPos:function(pos, triggerEvent){
            var node=this.get(0),
                dom=xui.Dom,
                css=xui.CSS,
                f=dom._setUnitStyle,
                b1,b2,r;
            if(pos){
                var t;
                b1 = pos.left!=null?f(node,'left',pos.left):false;
                b2 = pos.top!==null?f(node,'top',pos.top):false;
                if(triggerEvent && (b1||b2) && dom.$hasEventHandler(node,'onmove'))this.onMove(true, {left:b1,top:b2});
                r=this;
            }
            // get always returns to px
            else{
                f=dom.getStyle;
                r={left :css.$px(f(node, 'left'),node),  top : css.$px(f(node, 'top'),node)};
            }
            node=null;
            return r;
        },
        /*
        +--------------------------+
        |margin                    |
        | #----------------------+ |
        | |border                | |
        | | +------------------+ | |
        | | |padding           | | |
        | | | +--------------+ | | |
        | | | |   content    | | | |

        # is the offset position in CrossUI
        */
        offset:function (pos,boundary,original){
            var r,t,
            browser = xui.browser,
            ns=this,
            node = ns.get(0),
            keepNode=node,
            parent =node.parentNode,
            op=node.offsetParent,
            doc=node.ownerDocument,
            dd=doc.documentElement,
            db=doc.body,
            _d=/^inline|table.*$/i,
            getStyle=xui.Dom.getStyle,
            fixed = getStyle(node, "position") == "fixed",

            me=arguments.callee,
            add= me.add || (me.add=function(pos, l, t){
                pos.left += parseFloat(l)||0;
                pos.top += parseFloat(t)||0;
            }),
            border=me.border || ( me.border = function(node, pos){
                add(pos, getStyle(node,'borderLeftWidth'), getStyle(node,'borderTopWidth'));
            }),
            TTAG=me.TTAG||(me.TTAG={TABLE:1,TD:1,TH:1}),
            HTAG = me.HTAG ||(me.HTAG={BODY:1,HTML:1}),
            posDiff=me.posDiff ||(me.posDiff=function(o,target){
                var cssPos = o.cssPos(),absPos = o.offset(null,target);
                return {left :absPos.left-cssPos.left, top :absPos.top-cssPos.top};
            });

            boundary=boundary?xui(boundary).get(0):doc;

            if(pos){
                //all null, return dir
                if(pos.left===null&&pos.top===null)return ns;
                var d = posDiff(ns,boundary);
                ns.cssPos({left :pos.left===null?null:(pos.left - d.left),  top :pos.top===null?null:(pos.top - d.top)});
                r=ns;
            }else{
                //for IE, firefox3(except document.body)
                if(!(xui.browser.gek && node===document.body) && node.getBoundingClientRect){
                    t = xui.Dom.$getBoundingClientRect(node,original);
                    pos = {left :t.left, top :t.top};
                    if(boundary.nodeType==1 && boundary!==document.body)
                        add(pos, -(t=xui.Dom.$getBoundingClientRect(boundary,original)).left+boundary.scrollLeft, -t.top+boundary.scrollTop);
                    else{ 
                        // old:
                        // add(pos, (dd.scrollLeft||db.scrollLeft||0)-dd.clientLeft, (dd.scrollTop||db.scrollTop||0)-dd.clientTop);

                        // new:
                        // getBoundingClientRect returns different value in different browser
                        // some include window.scrollX/Y, others do not include
                        // we have to use a base div {left:0,top:0} to do offset, to replace "scrollXXX" offset solution
                        var base = xui.Dom.getEmptyDiv();
                        base.css({left:0,top:0,position:'absolute'});
                        var basRect=xui.Dom.$getBoundingClientRect(base.get(0), original);
                        base.css({left:xui.Dom.HIDE_VALUE,top:xui.Dom.HIDE_VALUE});

                        // var basRect=xui.Dom.$getBoundingClientRect(db, original);
                        add(pos, -basRect.left, -basRect.top);
                    }
                }else{
                    pos = {left :0, top :0};
                    add(pos, node.offsetLeft, node.offsetTop );
                    //get offset, stop by boundary or boundary.offsetParent
                    while(op && op!=boundary && op!=boundary.offsetParent){
                        add(pos, op.offsetLeft, op.offsetTop);
                        if(browser.kde || (browser.gek && !TTAG[op.nodeName]))
                            border(op, pos);
                        if ( !fixed && getStyle(op,"position")== "fixed")
                            fixed = true;
                        if(op.nodeName!='BODY')
                            keepNode=op.nodeName=='BODY'?keepNode:op;
                        op = op.offsetParent;
                    }

                    //get scroll offset, stop by boundary
                    while (parent && parent.nodeName && parent!=boundary && !HTAG[parent.nodeName]){
                        if(!_d.test(getStyle(parent, "display")) )
                            add(pos, -parent.scrollLeft, -parent.scrollTop );
                        if(browser.gek && getStyle(parent,"overflow")!= "visible" )
                            border(parent,pos);
                        parent = parent.parentNode;
                    }
                    if((browser.gek && getStyle(keepNode,"position")!="absolute"))
                        add(pos, -db.offsetLeft, -db.offsetTop);
                    if(fixed)
                        add(pos, dd.scrollLeft||db.scrollLeft||0, dd.scrollTop||db.scrollTop||0);
                }
                r=pos;
            }
            return r;
        },
//class and src
        hasClass:function(name){
            var i,l,isReg=xui.isReg(name), arr = xui.Dom._getClass(this.get(0)).split(/\s+/);
            if(isReg){
                for(i=0,l=arr.length;i<l;i++){
                    if(name.test(arr[i])){
                        return true;
                    }
                }
            }else{
                return xui.arr.indexOf(arr, name+"")!=-1;
            }
            return false;
        },
        addClass:function(name){
            if(!name)return this;
            var arr, i,l,me=arguments.callee,reg=(me.reg||(me.reg=/\s+/)),t,ok,
                  arr2 = (name+"").split(reg);                
            if(!arr2.length)return this;

            return this.each(function(o){
                ok=0;
                arr = xui.Dom._getClass(o).split(reg);
                t=[];
                for(i=0,l=arr.length;i<l;i++)if(arr[i])t.push(arr[i]);
                for(i=0,l=arr2.length;i<l;i++){
                    if(arr2[i] && xui.arr.indexOf(arr, arr2[i])==-1){
                        ok=1;
                        t.push(arr2[i]);
                    }
                };
                if(ok)xui.Dom._setClass(o, t.join(" "));
            });
        },
        removeClass:function(name){
            var arr, i,l, isReg=xui.isReg(name), me=arguments.callee,reg=(me.reg||(me.reg=/\s+/)),ok,
                  arr2;
            if(!isReg){
                arr2=(name+"").split(reg);
                if(!arr2.length)return this;
            }
            return this.each(function(o){
                ok=0;
                arr = xui.Dom._getClass(o).split(reg);
                if(!isReg){
                    for(i=0,l=arr2.length;i<l;i++){
                        if(xui.arr.indexOf(arr,arr2[i])!=-1){
                            ok=1;
                            xui.arr.removeValue(arr, arr2[i]);
                        }
                    }
                }else{
                    xui.filter(arr,function(o,i){
                        if(name.test(o)){
                            ok=1;
                            return false;
                        }
                    });
                }
                if(ok)xui.Dom._setClass(o, arr.join(" "));
            });
        },
        replaceClass:function(regexp,replace){
            var n,r;
            return this.each(function(o){
                r = (n=xui.Dom._getClass(o)).replace(regexp, replace);
                if(n!=r)xui.Dom._setClass(o,r);
            });
        },
        tagClass:function(tag, isAdd){
            var self=this,
                me=arguments.callee,
                r1=me["_r1_"+tag]||(me["_r1_"+tag]=new RegExp("([-\\w]+" + tag + "[-\\w]*)")),
                r2=me["_r2"]||(me["_r2"]=/([-\w]+)/g);
            self.removeClass(r1);
            isAdd=false!==isAdd;
            var r= isAdd ? self.replaceClass(r2, '$1 $1' + tag) : self;

            //fix for ie67
            if(xui.__iefix2 && (tag=="-checked"||tag=="-fold"||tag=="-expand")){
                this.each(function(n){
                    var arr = xui.Dom._getClass(n).split(/\s+/);
                    if(xui.arr.indexOf(arr,'xuifont')!=-1 || xui.arr.indexOf(arr,'xuicon')!=-1){
                        xui.arr.each(arr,function(s){
                            //It has 'xxxx' and 'xxxx-checked'
                            if(xui.__iefix2[s+(isAdd?'':tag)] && xui.__iefix2[isAdd?s.replace(new RegExp(tag+'$'),''):s] ){
                                xui(n).html(xui.__iefix2[s.replace(new RegExp(tag+'$'),'')+(isAdd?tag:'')]);
                                return false;
                            }
                        });
                    }
                });
            }
            return r;
        },
//events:
        /*
        $addEvent('onClick',fun,'idforthisclick';)
        $addEvent([['onClick',fun,'idforthisclick'],[...]...])

        do:
            add onclick to dom
            append fun to xui.$cache.profileMap.id.events.onClick array
            append 'onclick' to xui.$cache.profileMap.id.add array
        */

        $addEventHandler:function(name){
            var event=xui.Event,
                type,
                handler=event.$eventhandler;
            return this.each(function(o){
                if(o.nodeType==3)return;
                //set to purge map
                xui.setNodeData(o, ['eHandlers', 'on'+event._eventMap[name]], handler);

                //set to dom node
                if(type=event._eventHandler[name]){
                    xui.setNodeData(o, ['eHandlers', type], handler);
                    event._addEventListener(o, event._eventMap[name], handler);

                    if(xui.browser.isTouch && type=='onmousedown'){
                        xui.setNodeData(o, ['eHandlers', 'onxuitouchdown'], handler);
                        event._addEventListener(o, "xuitouchdown", handler);
                    }
                }
            });
        },
        /*
        'mousedown' -> 'dragbegin'
        'mouseover' -> 'dragenter'
        'mouseout' -> 'dragleave'
        'mouseup' -> 'drop'
        */
        $removeEventHandler:function(name){
            var event=xui.Event,
                handler=event.$eventhandler,
                handler3=event.$eventhandler3,
                type;
            return this.each(function(o){
                //remove from dom node
                if(type=event._eventHandler[name]){
                    event._removeEventListener(o, type, handler);
                    event._removeEventListener(o, type, handler3);
                    
                    if(xui.browser.isTouch && type=='onmousedown'){
                        event._removeEventListener(o, 'xuitouchdown', handler);
                    }
                }
                //remove from purge map
                if(o=xui.getNodeData(o,'eHandlers')){
                    type='on'+event._eventMap[name];
                    delete o[type];
                    if(xui.browser.isTouch && type=='onmousedown'){
                        delete o['onxuitouchdown'];
                    }
                }
            });
        },
        $addEvent:function(name, fun, label, index){
            var self=this,
                event=xui.Event,
                arv=xui.arr.removeValue,
                ari=xui.arr.insertAny,
                id,c,t,m;

            if(!index && index!==0)index=-1;

            if(typeof label=='string')
                label="$"+label;
            else label=undefined;

            self.$addEventHandler(name).each(function(o){
                if(o.nodeType==3)return;

                if(!(id=event.getId(o))&&o!==window&&o!==document)
                    id=o.id=xui.Dom._pickDomId();

                if(!(c=xui.$cache.profileMap[id]))
                    c=new xui.DomProfile(id);

                t = c.events || (c.events = {});
                m = t[name] || (t[name]=[]);

                //if no label input, clear all, and add a single
                if(label===undefined){
                    m.length=0;
                    m=t[name]=[];
                    index=-1;
                    label='_';
                }
                m[label]=fun;
                arv(m,label);
                if(index==-1)m[m.length]=label;
                else
                    ari(m,label, index);

                if(xui.Event && (c=xui.Event._getProfile(id)) && c.clearCache)
                    c.clearCache();
            });

            return self;
        },
        /*
        $removeEvent('onClick','idforthisclick')
        $removeEvent('onClick')
            will remove all onClick in xui.$cache.profileMap.id.events.
        $removeEvent('onClick',null,true)
            will remove all onClick/beforeClick/afterClick in xui.$cache.profileMap.id.events.
        */
        $removeEvent:function(name, label, bAll){
            var self=this,c,t,k,id,i,type,
                event=xui.Event,
                dom=xui.$cache.profileMap,
                type=event._eventMap[name];

            self.each(function(o){
                if(!(id=event.getId(o)))return;
                if(!(c=dom[id]))return;
                if(!(t=c.events))return;
                if(bAll)
                    xui.arr.each(event._getEventName(type),function(o){
                        delete t[o];
                    });
                else{
                    if(typeof label == 'string'){
                        label='$'+label;
                        if(k=t[name]){
                            delete k[label];
                            if(xui.arr.indexOf(k,label)!=-1)
                                xui.arr.removeValue(k,label);
                        }
                    }else
                        delete t[name];
                }

                if(xui.Event && (c=xui.Event._getProfile(id)) && c.clearCache)
                    c.clearCache();
            });

            return self;
        },
        $getEvent:function(name, label){
            var id;
            if(!(id=xui.Event.getId(this.get(0))))return;

            if(label)
                return xui.get(xui.$cache.profileMap,[id,'events',name,'$' + label]);
            else{
                var r=[],arr = xui.get(xui.$cache.profileMap,[id,'events',name]);
                xui.arr.each(arr,function(o,i){
                    r[r.length]={o:arr[o]};
                });
                return r;
            }
        },
        $clearEvent:function(){
            return this.each(function(o,i){
                var event=xui.Event,
                    handler=event.$eventhandler,
                    handler3=event.$eventhandler3,
                    type;

                if(!(i=event.getId(o)))return;
                if(!(i=xui.$cache.profileMap[i]))return;
                if(i.events){
                    xui.each(i.events, function(f, name){
                        type=xui.Event._eventMap[name];
                        if(type){
                            event._removeEventListener(o, type, handler);
                            event._removeEventListener(o, type, handler3);
                        }
                    });
                    xui.breakO(i.events,2);
                    delete i.events;
                }
                xui.set(xui.$cache.domPurgeData,[o.$xid,'eHandlers'],{});
            });
        },
        $fireEvent:function(name, args){
            var type=xui.Event._eventMap[name],
            t,s='on'+type,
            handler,
            hash,
            me=arguments.callee,
            f=xui.Event.$eventhandler,
            f1=me.f1||(me.f1=function(){this.returnValue=false}),
            f2=me.f2||(me.f2=function(){this.cancelBubble=true});
            return this.each(function(o){
                if(!(handler=xui.getNodeData(o,['eHandlers', s])))return;
                if('blur'==type || 'focus'==type){
                    try{o[type]()}catch(e){}
                }else{
                      hash=xui.copy(args);
                      xui.merge(hash,{
                        type: type,
                        target: o,
                        button : 1,
                        $xuievent:true,
                        $xuitype:name,
                        preventDefault:f1,
                        stopPropagation:f2
                      },'all');
                    handler.call(o,hash);
                }
            });
        },
        nativeEvent:function(name){
            return this.each(function(o){
                if(o.nodeType===3||o.nodeType===8)return;
                try{o[name]()}catch(e){}
            });
        },

//functions
        $canFocus:function(){
            var me=arguments.callee, getStyle=xui.Dom.getStyle, map = me.map || (me.map={a:1,input:1,select:1,textarea:1,button:1,object:1}),t,node;
            return !!(
                (node = this.get(0)) &&
                node.focus &&
                //IE bug: It can't be focused with 'default tabIndex 0'; but if you set it to 0, it can be focused.
                //So, for cross browser, don't set tabIndex to 0
                (((t=map[node.nodeName.toLowerCase()]) && !(parseInt(node.tabIndex,10)<=-1)) || (!t && parseInt(node.tabIndex,10)>=(xui.browser.ie?1:0))) &&
                getStyle(node,'display')!='none' &&
                getStyle(node,'visibility')!='hidden' &&
                node.offsetWidth>0 &&
                node.offsetHeight>0
            );
        },
        focus:function(force){
            var ns=this;
            if(force || ns.$canFocus())
                try{ns.get(0).focus()}catch(e){}
            return ns;
        },
        blur:function(){
            var n=this.get(0);
            if(!n)return;
            n.blur();
            if(document.activeElement===n){
                xui.asyRun(function(){
                    xui('body').append(n = xui.create("<button style='position:absolute;width:1px;height:1px;left:-1000px;'></button>"));
                    n.focus();
                    n.remove();
                });
            }
        },
        setSelectable:function(value){
            var me=arguments.callee,cls;
            this.removeClass("xui-ui-selectable").removeClass("xui-ui-unselectable");
            this.addClass(value?"xui-ui-selectable":"xui-ui-unselectable");
            return this.each(function(o){
                if(xui.browser.ie && xui.browser.ver<10)
                    xui.setNodeData(o,"_onxuisel",value?"true":"false");
            })
        },
        contentBox : function(d){
            return (xui.browser.ie||xui.browser.opr) ?
                    !/BackCompat|QuirksMode/.test((d||document).compatMode) :
                    (this.css("box-sizing") || this.css("-moz-box-sizing")) == "content-box";
        },
        setInlineBlock:function(){
            var ns=this;
            if(xui.browser.gek){
                if(xui.browser.ver<3)
                    ns.css('display','-moz-inline-block').css('display','-moz-inline-box').css('display','inline-block');
                else
                    ns.css('display','inline-block');
            }else if(xui.browser.ie&&xui.browser.ver<=6)
                ns.css('display','inline-block').css({display:'inline',zoom:'1'});
            else
                ns.css('display','inline-block');
            return ns;
        },
        topZindex:function(flag){
            //set the minimum to 1000
            var i=1000, j=0, k, node = this.get(0), p = node.offsetParent, t, o, style;
            if(xui.browser.ie && (!p||(p.nodeName+"").toUpperCase()=="HTML")){
                p=xui("body").get(0);
            }
            if(node.nodeType !=1 || !p)return 1;

            t=p.childNodes;
            for(k=0;o=t[k];k++){
                style = o.style;
                if(o==node || o.nodeType !=1 || !o.$xid || (style&&style.display=='none') || (style&&style.visibility=='hidden') || o.zIndexIgnore ||  xui.getNodeData(o,'zIndexIgnore') )continue;
                j = parseInt(style && style.zIndex,10) || 0 ;
                i=i>j?i:j;
            }
            i++;
            if(i>=xui.Dom.TOP_ZINDEX)
                xui.Dom.TOP_ZINDEX =i+1;

            if(flag)
                 node.style.zIndex = i;
            else{
                j = parseInt(node.style.zIndex,10) || 0;
                return i>j?i:j;
            }
            return this;
        },
        /*
        dir:true for next, false for prev
        inn:true for include the inner node
        set:true for give focus
        */
        nextFocus:function(downwards, includeChild, setFocus, pattern){
            downwards=xui.isBool(downwards)?downwards:true;
            var self=this.get(0),node = this.$iterator('',downwards,includeChild,function(node){return node!==self && (!pattern || (node.id&&pattern.test(node.id))) && xui([node]).$canFocus()});
            if(!node.isEmpty() && setFocus!==false)node.focus();
            self=null;
            return node;
        },
        fullScreen:function(full){
            var e=this.get(0), d=document;
            if(e){
                if(e===d)e=d.documentElement;
                var requestMethod =  full!==false ? (e.requestFullScreen || e.webkitRequestFullScreen || e.mozRequestFullScreen || e.msRequestFullScreen)
                    : (d.exitFullscreen || d.mozCancelFullScreen || d.webkitExitFullscreen || d.webkitExitFullscreen);
                if (requestMethod) {
                    requestMethod.call(full!==false ? e : d);
                }else if (typeof window.ActiveXObject !== "undefined") {
                    var wscript = new ActiveXObject("WScript.Shell");
                    if (wscript !== null) {
                        wscript.SendKeys("{F11}");
                    }
                }
            }
        },
        /*
        args:{
            width:[0,100],
            height:[0,100],
            left:[0,100]
            top:[0,100]
            opacity:[0,1],
            backgroundColor:['#ffffff','#000000']
            scrollTop:[0,100]
            scrollLeft:[0,100]
            fontSize:[12,18]
        }
        */
        animate: function(endpoints, onStart, onEnd, duration, step, type, threadid, unit, restore, times, _goback){
            var self=this,  f, map={left:1,top:1,right:1,bottom:1,width:1,height:1},
                prf = xui.$cache.profileMap[self.id()],
                ctrl = prf?prf['xui.DomProfile']?xui(prf):prf.boxing():null,
                css = xui.CSS,
                tween = xui.Dom.$AnimateEffects,
                _get = function(node, ctrl, key, t){
                    return (map[key] && ctrl && xui.isFun(ctrl[t='get'+xui.str.initial(key)])) ? ctrl[t](key) : node[key] ? node[key]() :node.css(key);
                },
                _set = function(node, ctrl, key, value, t){
                    return (map[key] && ctrl && xui.isFun(ctrl[t='set'+xui.str.initial(key)])) ? ctrl[t](value) : node[key] ? node[key](value) :node.css(key, value);
                },
                color = function(from,to,curvalue){
                    if(typeof from !='string' || typeof to != 'string')return '#fff';
                    if(curvalue<0)return from;
                    if(curvalue>1) return to;

                    var f,f1,f2,f3;
                    f=function(str){
                        return (str.charAt(0)!='#')?('#'+str):str;
                    };
                    from=f(from);to=f(to);

                    f1=function(str, i, j){
                        return parseInt(str.slice(i,j),16)||0;
                    };
                    f2=function(o){
                        return {red:f1(o,1,3),green:f1(o,3,5),blue:f1(o,5,7)}
                    };
                    from = f2(from);
                    to = f2(to);

                    f3=function(from, to, value,c){
                        var r= from[c]+Math.round(parseFloat(value*(to[c]-from[c]))||0);
                        return (r < 16 ? '0' : '') + r.toString(16)
                    };
                    return '#' + f3(from,to, curvalue, 'red') + f3(from,to, curvalue, 'green') + f3(from,to, curvalue, 'blue');
                };
            if(!endpoints){
                if(onEnd)xui.tryF(onEnd);
                return;
            }else{
                // adjust endpoints
                xui.each(endpoints,function(o,i){
                    if(!xui.isFun(o)){
                        if(!xui.isArr(o) || o.length===1) o = [_get(self, ctrl, i), o];
                        endpoints[i]=o;
                    }
                });
            }
            var parmsBak=endpoints;
            // clone it now
            endpoints=xui.clone(endpoints);
            
            // Estimate duration by steps
            if((step||0)>0)
                duration=step*16;
            else
                duration = duration||200;
            times=times||1;
            if((type||"").indexOf('-')!=-1)type=type.replace(/\-(\w)/g, function(a,b){return b.toUpperCase()});
            type = (type in tween)?type:'circIn';

            var starttime, node=self.get(0), fun=function(tid){
                var offtime=xui.stamp() - starttime, curvalue,u,eu,su,s,e;
                if(offtime >= duration)offtime=duration;
                xui.each(endpoints,function(o,i){
                    curvalue = tween[type](duration, offtime);
                    if(typeof o == 'function') o.call(self, curvalue);
                    else{
                        s=o[0];e=o[1];u=o[2];
                        if(xui.str.endWith(i.toLowerCase(),'color')){
                            curvalue = color(s, e, curvalue);
                        }else{
                            if(!xui.isFinite(e)){
                                u=e.replace(/[-\d.]*/,'');
                                eu=u||'px';
                                if(!xui.isFinite(s)){
                                    su=s.replace(/[-\d.]*/,'')||'px';
                                    if(su!=eu){
                                        if(su=='em'&&eu=='px'){
                                            s=css.$em2px(s,node);
                                        }else if(su=='px'&&eu=='em'){
                                            s=css.$px2em(s,node);
                                        }
                                    }
                                }
                            }
                            s=parseFloat(s)||0;
                            e=parseFloat(e)||0;
                            curvalue = xui.toFixedNumber(s + (e-s)*curvalue, 6);
                        }
                        curvalue+=u||unit||'';
                        _set(self, ctrl, i, curvalue)
                    }
                });
                if(offtime==duration){
                    if(restore&&!_goback){
                        starttime=xui.stamp();
                        _goback=1;
                        xui.each(endpoints,function(v,k){if(!xui.isFun(v)){k=v[0];v[0]=v[1];v[1]=k}});
                    }else{
                        if(times==-1||times>0){
                            starttime=xui.stamp();
                            if(times>0)times-=1;
                            if(_goback){
                                _goback=0;
                                xui.each(endpoints,function(v,k){if(!xui.isFun(v)){k=v[0];v[0]=v[1];v[1]=k}});
                            }
                        }
                    }
                    if(!times){
                        xui.Thread.abort(tid,'normal');
                    }
                    return false;
                }
            },funs=[fun];

            var tid=xui.getNodeData(node,'_inthread');
            if(tid && xui.Thread.isAlive(tid)){
                xui.Thread.abort(tid,'force');
                xui.setNodeData(node,'_inthread',null);
            }
            var reset=xui.getNodeData(node,'_animationreset');
            if(typeof reset=="function"){                
                reset();
                xui.setNodeData(node,'_animationreset',null);
            }
            // allow custom threadid, except existing one
            return xui.Thread((!threadid || xui.Thread.get(threadid)) ? xui.id()  : threadid, funs, 0, null, function(tid){
                xui.setNodeData(node,'_inthread',tid);
                starttime=xui.stamp();
                xui.setNodeData(node,'_animationreset',function(){
                    xui.merge(endpoints,parmsBak,'all');
                    starttime=xui.stamp();
                    fun();
                });
                return xui.tryF(onStart,arguments,this);
            }, function(tid,flag){
                //maybe destroyed
                if(node&&node.$xid){
                    xui.setNodeData(node,'_inthread',null);
                    xui.setNodeData(node,'_animationreset',null);
                }
                if('force'!=flag)
                    xui.tryF(onEnd,arguments,this);
            },true);
        },
        pop : function(pos, type, parent, trigger, group){
            var ns=this,id=xui.stamp()+":"+ns.xid();
            ns.popToTop(pos, type||"outer",parent).setBlurTrigger(id, function(){
                if(typeof(trigger)=="function")xui.tryF(trigger);
                else ns.hide();
            });
            return id;
        },
        // pop to the top layer
        popToTop : function(pos, type, parent, callback, showEffects, ignoreEffects){
            var region, target=this, t;
            parent=xui(parent);
            if(parent.isEmpty())
                parent=xui('body');

            //prepare
            target.css({position:'absolute',left:xui.Dom.HIDE_VALUE, top:xui.Dom.HIDE_VALUE,display:'block', zIndex:xui.Dom.TOP_ZINDEX++});

            //ensure show target on the top of the other elements with the same zindex
            //parent.get(0).appendChild(target.get(0));
            target.css({left :0, top :0, visibility:'hidden',display:'block'});
            parent.append(target);

            //show
            target.cssPos(xui.Dom.getPopPos(pos, type, target, parent)).css({visibility:'visible'});

            showEffects=ignoreEffects?null:showEffects?showEffects:xui.get(xui.UIProfile.getFromDom(target),['properties','showEffects']);
            if(showEffects)showEffects=xui.Dom._getEffects(showEffects,1);
            if(showEffects)xui.Dom._vAnimate(target,showEffects,callback);else if(callback)callback();
            return this;
        },
        hoverPop : function(node, type, beforePop,beforeHide, parent, groupid, showEffects, hideEffects){
            node=xui(node);
            if(showEffects)showEffects=xui.Dom._getEffects(showEffects,1);
            if(hideEffects)hideEffects=xui.Dom._getEffects(hideEffects,0);
            if(!xui.isDefined(type))type='outer';

            var aysid=groupid || (this.xid()+":"+node.xid()),self=this;
            this.onMouseover(type===null?null:function(prf, e, src){
                if(e.$force)return;
                xui.resetRun(aysid,null);
                var ignore=xui.getData([aysid,'$ui.hover.pop'])
                                && xui.getNodeData(node.get(0)||"empty",'$ui.hover.parent')==src;
                if(!ignore){
                    xui.setData([aysid,'$ui.hover.pop'],1);
                    xui.setNodeData(node.get(0)||"empty",'$ui.hover.parent',src);
                    if(!beforePop || false!==beforePop(prf, node, e, src)){
                        node.popToTop(src, type, parent,showEffects);
                        node.onMouseover(function(){
                            self.onMouseover(true)
                        },'hoverPop').onMouseout(function(){
                            self.onMouseout(true)
                        },'hoverPop');
                    }
                }
            },aysid).onMouseout(type===null?null:function(prf, e, src){
                if(e.$force)return;
                xui.resetRun(aysid,function(){
                    xui.setData([aysid,'$ui.hover.pop']);
                    xui.setNodeData(node.get(0)||"empty",'$ui.hover.parent',0);
                    if(!beforeHide || false!==beforeHide(prf, node,e, src,'host')){
                        node.hide(null,hideEffects);
                        node.onMouseover(null,'hoverPop').onMouseout(null,'hoverPop');
                    }
                });
            },aysid);
            if(node){
                node.onMouseover(type===null?null:function(e){
                    if(e.$force)return;
                     xui.resetRun(aysid,null);
                },aysid).onMouseout(type===null?null:function(prf,e,src){
                    if(e.$force)return;
                    xui.resetRun(aysid,function(){
                        xui.setData([aysid,'$ui.hover.pop']);
                        xui.setNodeData(node.get(0)||"empty",'$ui.hover.parent',0);
                        if(!beforeHide || false!==beforeHide(prf, node,e, src, 'pop')){
                            node.hide(null,hideEffects);
                            node.onMouseover(null,'hoverPop').onMouseout(null,'hoverPop');
                        }
                    });
                },aysid);
            }
            node.css('display','none');
            return this;
        },
        //for remove obj when blur
        setBlurTrigger : function(id, trigger/*[false] for anti*/, group /*keep the original refrence*/,
                                  /*two inner params */ checkChild, triggerNext){
            var ns=this,
                doc=document,
                sid='$blur_triggers$',
                fun=xui.Dom._blurTrigger||(xui.Dom._blurTrigger=function(p,e){
                    var p=xui.Event.getPos(e),
                        arr=arguments.callee.arr,
                        srcN=xui.Event.getSrc(e),
                        a=xui.copy(arr),
                        b, pos, w, h, v;
                    //filter first
                    xui.arr.each(a,function(i){
                        b=true;
                        if(!(v=arr[i].target))b=false;
                        else
                            v.each(function(o){
                                if(o!==window&&o!==document&&!xui.Dom.byId(o.id))
                                    return b=false;
                            });
                        if(!b){
                            delete arr[i];
                            xui.arr.removeValue(arr,i);
                        };
                    });
                    a=xui.copy(arr);
                    xui.arr.each(a,function(i){
                        v=arr[i];
                        if(!v)return;

                        b=true;
                        var isChild=function(){
                            var nds=v.target.get();
                            while (srcN && srcN.nodeName && srcN.nodeName!="BODY" && srcN.nodeName!="HTML"){
                                if(xui.arr.indexOf(nds,srcN)!=-1)
                                    return true;
                                srcN = srcN.parentNode;
                            }
                        };
                        if(!v.checkChild || isChild()){
                            v.target.each(function(o){
                                if(o.parentNode && (w=o.offsetWidth) && (h=o.offsetHeight)){
                                    pos=xui([o]).offset();
                                    if(p.left>=pos.left && p.top>=pos.top && p.left<=(pos.left+w) && p.top<=(pos.top+h)){
                                        return b=false;
                                    }
                                }
                            });
                        }

                        isChild=null;

                        // anti trigger
                        if(!b && !xui.isFun(v.trigger))
                            return false;

                        if(b){
                            delete arr[i];
                            xui.arr.removeValue(arr,i);
                            xui.tryF(v.trigger,[p,e],v.target);
                            v=null;
                        }else if(v.stopNext){
                            //if the top layer popwnd cant be triggerred, prevent the other layer popwnd trigger
                            return false;
                        }
                    },null,true);
                    srcN=null;
                    a.length=0;
                }),
                arr=fun.arr||(fun.arr=[]),
                target;

            // remove this trigger first
            if(arr[id]){
                if(trigger===true){
                    xui.tryF(arr[id].trigger);
                    trigger=false;
                }
                delete arr[id];
                xui.arr.removeValue(arr,id);
            }
            // add trigger
            if(trigger){
                if(group){
                    //keep the original refrence
                    if(group['xui.Dom'])
                        target=group;
                    else if(xui.isArr(group)){
                        target=xui();
                        target._nodes=group;
                    }
                    target.merge(ns);
                }else{
                    target=ns;
                }

                target.each(function(o){if(!o.id&&o!==window&&o!==document)o.id=xui.Dom._pickDomId()});

                //double link
                arr[id]={
                    trigger:trigger,
                    target:target,
                    checkChild:!!checkChild,
                    stopNext:!triggerNext
                };
                arr.push(id);

                if(!doc.onmousedown)doc.onmousedown=xui.Event.$eventhandler;
                doc=fun=null;
            }
            return this;
        },
        //for firefox disappeared cursor bug in input/textarea
        $firfox2:function(){
            if(!xui.browser.gek2)return this;
            var ns=this;
            ns.css('overflow','hidden');
            xui.asyRun(function(){ns.css('overflow','auto')});
            return ns;
        },
        //IE not trigger dimension change, when change height only in overflow=visible.
        ieRemedy:function(){
            if(xui.browser.ie&&xui.browser.ver<=6){
                var a1=this.get(),a2=[],a3=[],l=a1.length,style;
                //xui.asyRun(function(){                    
                    for(var i=0;i<l;i++){
                        style=a1[i].style;
                        // allow once
                        if(!xui.isSet(a1[i].$ieRemedy)){
                            if(xui.isSet(style.width)){
                                a1[i].$ieRemedy=style.width;
                                style.width=((xui.CSS.$px(a1[i].$ieRemedy,a1[i])||0)+1)+"px";
                            }
                        }
                        /*
                        if((a3[i]=style.WordWrap)=='break-word')
                            style.WordWrap='normal';
                        else
                            style.WordWrap='break-word';
                        */
                    }
                    xui.asyRun(function(){
                        for(var i=0;i<l;i++){
                            if(xui.isSet(a1[i].$ieRemedy)){
                                a1[i].style.width=a1[i].$ieRemedy;
                                a1[i].removeAttribute('$ieRemedy');
                            }
                            //a1[i].style.WordWrap=a3[i];
                        }
                        a1.length=a2.length=a3.length=0;
                    });                    
               // });
            }
            return this;
        }
        /*,
        gekRemedy:function(){
            if(xui.browser.gek)
                return this.each(function(o,i){
                    if(i=o.style){
                        var b=i.zIndex||0;
                        i.zIndex=++b;
                        i.zIndex=b;
                    }
                });
        }*/
    },
    Static:{
        HIDE_VALUE : '-10000px',
        TOP_ZINDEX:10000,

        _boxArr:xui.toArr('width,height,left,top,right,bottom'),
        _cursor:{},

        _pickDomId:function(){
            var id;
            do{id='xui_'+xui.id()}while(document.getElementById(id))
            return id;
        },
        _map:{
            'html':1,
            'head':1,
            'body':1
        },
        //for ie6
        fixPng:function(n){
            if(xui.browser.ie&&xui.browser.ver<=6){
                if(n.nodeName=='IMG' && n.src.toLowerCase().search(/\.png$/) != -1){
                    var style=n.style;
                    style.height = n.height;
                    style.width = n.width;
                    style.backgroundImage ="none";
                    var t= ((style.filter?(style.filter+","):"")+"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src=" + n.src + "', sizingMethod='image')").replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/[,\s]+/g,', ');
                    if(xui.browser.ie8)style.msfilter = t;
                    style.filter = t;
                    n.src = xui.ini.img_bg;
                }
                var bgimg = n.currentStyle.backgroundImage || style.backgroundImage,
                    bgmatch = (bgimg||"").toLowerCase().match(/^url[("']+(.*\.png[^\)"']*)[\)"']+[^\)]*$/i);
                if(bgmatch){
                    style.backgroundImage ="none";
                    var t = ((style.filter?(style.filter+","):"")+"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src=" + bgmatch[1] + "', sizingMethod='crop')").replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/[,\s]+/g,', ');
                    if(xui.browser.ie8)style.msfilter = t;
                    style.filter=t;
                }
            }
        },
        _getTag:function(n){ return n ? n.$xid ? n.$xid : n.nodeType==1 ? xui.$registerNode(n).$xid : 0 : 0},
        _ensureValues:function(obj){
            var t,i,map=this._map,a=[],
            //can't be obj, or opera will crash
            arr =  obj===window
                    ? ['!window']
                    : obj===document
                    ? ['!document']
                    : xui.isArr(obj)
                    ? obj
                    :(obj=='[object NodeList]' || obj=='[object HTMLCollection]')
                    ? xui.toArr(obj)
                    : obj['xui.Dom']
                    ? obj._nodes
                    : obj._toDomElems
                    ? obj._toDomElems()
                    : typeof obj == 'function'
                    ? obj()
                    :[obj];
            for(i=0;i<arr.length;i++)
                if( t = !(t=arr[i])
                            ? 0
                            : t===window
                            ? '!window'
                            : t===document
                            ? '!document'
                            : (typeof t=='string' || (t['xui.DomProfile'] && (t=t.domId)))
                                ? t.charAt(0)=='!'
                                    ?  t
                                    : this._getTag( map[t] ? document.getElementsByTagName(t)[0] : document.getElementById(t))
                            : ((t=arr[i])['xui.UIProfile']||t['xui.Template'])
                            ? t.renderId ? t.renderId : (t.boxing().render() && t.renderId)
                            : this._getTag(t)
                  )
                    a[a.length]=t;
            return a.length<=1?a:this._unique(a);
        },
        _getClass:function(o){
            return (typeof o.className=="string"&&o.className)
            || (typeof o.className.baseVal=="string"&&o.className.baseVal)
            || (typeof o.getAttribute!=="undefined" && o.getAttribute("class"))
            || "";
        },
        _setClass:function(o,v){
            if(typeof o.className=="string"){
                o.className=v;
            }else if(typeof o.className.baseVal=="string"){
                o.className.baseVal=v;
            }else if(typeof o.getAttribute!="undefined"){
                o.setAttribute(v);
            }
        },
        /*
        pos: {left:,top:} or dom element
        parent:parent node
        type:1,2,3,4
        */
        getPopPos : function(pos, type, target, parent){
            var result={left :0, top :0};
            if(!pos){
                return result;
            }else if(xui.isEvent(pos)){
                return xui.Event.getPos(pos);
            }else{
                var region, node, abspos, t, box;
                if((parent=xui(parent)).isEmpty())
                    parent=xui('body');
                if(pos['xui.UI'] || pos['xui.UIProfile'] || pos['xui.Dom'] || pos.nodeType==1 || typeof pos=='string'){
                    if(typeof(type)!="function"){
                        type=(type||12)+'';
                    }
                    node=xui(pos);
                    //base region
                    abspos = node.offset(null, parent);
                    region = {
                        left:abspos.left,
                        top:abspos.top,
                        width:node.offsetWidth(),
                        height:node.offsetHeight()
                    };
                }else{
                    if(typeof(type)!="function"){
                        type = type?'3':'0';
                    }
                    t=type=='0'?0:8;
                    region = pos.region || {
                        left:pos.left-t,
                        top:pos.top-t,
                        width:t*2,
                        height:t*2
                    };
                }
                

                //window edge
                t=(parent.get(0)===document.body || parent.get(0)===document || parent.get(0)===window)?xui.win:parent;
                box = {};

                box.left=t.scrollLeft();
                box.top=t.scrollTop();
                box.width =t.width()+box.left;
                box.height =t.height()+box.top;

                if(t == xui.win && xui.ini.$zoomScale){
                    for(var i in box)
                        box[i] /= xui.ini.$zoomScale;
                }

                /*
                    type:1
                        +------------------+    +------------------+
                        |        3         |    |        4         |
                        +--------------+---+    +---+--------------+
                        |              |            |              |
                        |              |            |              |
                        +--------------+---+    +---+--------------+
                        |        1         |    |        2         |
                        +------------------+    +------------------+
                    type:2
                                             +---+              +---+
                                             |   |              |   |
                    +---+--------------+---+ |   +--------------+   |
                    |   |              |   | | 3 |              | 4 |
                    | 2 |              | 1 | |   |              |   |
                    |   +--------------+   | +---+--------------+---+
                    |   |              |   |
                    +---+              +---+
                    type:3
                                             +---+              +---+
                                             | 3 |              | 4 |
                        +--------------+     +---+--------------+---+
                        |              |         |              |
                        |              |         |              |
                    +---+--------------+---+     +--------------+
                    | 2 |              | 1 |
                    +---+              +---+
                    type:4
                                         +------------------+
                                         | 3                |
                    +--------------+---+ |   +--------------+ +----+--------------+ +--------------+----+
                    |              |   | |   |              | |    |              | |              |    |
                    |              |   | |   |              | |    |              | |              |    |
                    +--------------+   | +---+--------------+ |    +--------------+ +--------------+    |
                    |                1 |                      |  2                | |               4   |
                    +------------------+                      +-------------------- +-------------------+
                */
                if(typeof(type)=='function'){
                    result=type(region, box, target, t);
                }else{
                    //target size
                    var w = target?target.offsetWidth():0,
                        h = target?target.offsetHeight():0,
                        arr=type.split(/-/g);
                    if(arr.length==2){
                        var hp=arr[0],vp=arr[1];
                        switch(vp){
                            case "outertop":
                                result.top=region.top-h;break;
                            case "top":
                                result.top=region.top;break;
                            case "middle":
                                result.top=region.top+region.height/2-h/2;break;
                            case "bottom":
                                result.top=region.top+region.height-h;break;
                            default:
                            //case "outerbottom":
                                result.top=region.top+region.height;
                        }
                        switch(hp){
                            case "outerleft":
                                result.left=region.left-w;break;
                            case "left":
                                result.left=region.left;break;
                            case "center":
                                result.left=region.left+region.width/2-w/2;break;
                            case "right":
                                result.left=region.left+region.width-w;break;
                            default:
                            //case "outerright":
                                result.left=region.left+region.width;
                        }
                    }else{
                        if(type=="outer")type="12";
                        else if(type=="inner")type="4";

                        var adjust=function(type){
                            var hi,wi;
                            switch(type){
                                case '2':
                                    hi=true;wi=false;
                                break;
                                case '3':
                                    hi=wi=false;
                                break;
                                case '4':
                                    hi=wi=true;
                                break;
                                default:
                                //case '1':
                                    hi=false;wi=true;
                            }

                            if(hi){
                                if(region.top + h < box.height)
                                    result.top=region.top;
                                else
                                    result.top=region.top+region.height-h;
                            }else{
                                if(region.top + region.height + h < box.height)
                                    result.top=region.top + region.height;
                                else
                                    result.top=region.top - h;
                            }
                            if(wi){
                                if(region.left + w < box.width)
                                    result.left=region.left;
                                else
                                    result.left=region.left+region.width-w;
                            }else{
                                if(region.left + region.width + w < box.width)
                                    result.left=region.left + region.width;
                                else
                                    result.left=region.left - w;
                            }
                            //over right
                            if(result.left + w>  box.width)result.left = box.width - w;
                            //over left
                            if(result.left < box.left)result.left = box.left;
                            //over bottom
                            if(result.top + h>  box.height)result.top = box.height - h;
                            //over top
                            if(result.top < box.top)result.top = box.top;
                        };

                        if(type=='12'){
                            adjust('1');
                            if(result.top < region.top+region.height && result.top+h > region.top)adjust('2');
                        }else if(type=='21'){
                            adjust('2');
                            if(result.left < region.left+region.width && result.left+w > region.left)adjust('1');
                        }else{
                            adjust(type);
                        }
                    }
                }
                return result;
            }
        },
        _scrollBarSize:0,
        getScrollBarSize: function(force){
            var ns=this;
            if(force||!ns._scrollBarSize){
                var div;
                xui('body').append(div=xui.create('<div style="width:50px;height:50px;visibility:hidden;position:absolute;margin:0;padding:0;left:-100%;top:-100%;overflow:scroll;"></div>'));
                ns._scrollBarSize=div.get(0).offsetWidth-div.get(0).clientWidth;
                div.remove();
            }
            return ns._scrollBarSize;
        },
        _dpi:0,
        getDPI:function(force){
            var ns=this;
            if(force||!ns._dpi){
                var div;
                xui('body').append(div=xui.create('<div style="width:1in;height:1in;visibility:hidden;position:absolute;margin:0;padding:0;left:-100%;top:-100%;overflow:scroll;"></div>'));
                ns._dpi=div.get(0).offsetHeight;
                div.remove();
            }
            return ns._dpi;
        },
        getStyle:function(node, name, force){
            if(!node || node.nodeType!=1)return '';
            if(name=="rotate"){
               return xui(node).rotate();
            }
            var ns=xui.Dom,
                css3prop=xui.Dom._css3prop,
                style=node.style,
                value,b;
            if(name=='opacity' && (!ns.css3Support("opacity")) && xui.browser.ie)
                b = name = 'filter';

            value= style[name];
            if(force || !value || value==="initial"){
                var me =xui.Dom.getStyle,t,
                brs=xui.browser,
                map = me.map || (me.map = {'float':1,'cssFloat':1,'styleFloat':1}),
                c1 = me._c1 || (me._c1={}),
                c2 = me._c2 || (me._c2={}),
                c3 = me._c3 || (me._c3={}),
                name = c1[name] || (c1[name] = name.replace(/\-(\w)/g, function(a,b){return b.toUpperCase()})),
                name2 = c2[name] || (c2[name] = name.replace(/([A-Z])/g, "-$1" ).toLowerCase()),
                name3,name4;

                var n1=name;
                if(n1.indexOf("border")===0){
                    n1=n1.replace(/[-]?(left|top|right|bottom)/ig,'');
                }
                if(xui.arr.indexOf(css3prop,n1)!=-1){
                    if(!ns.css3Support(name)){
                        return '';
                    }else{
                        if(name!="textShadow"){
                            name3 = brs.cssTag2+name2.charAt(0).toUpperCase()+name2.substr(1);
                            name4 = brs.cssTag1+name2;
                        }
                    }
                }

                if(map[name])
                    name = xui.browser.ie?"styleFloat":"cssFloat";
                //document.defaultView first, for opera 9.0
                value = ((t=document.defaultView) && t.getComputedStyle)?
                    (t=t.getComputedStyle(node,null))?
                        (t.getPropertyValue(name2) || (name4 && t.getPropertyValue(name4)))
                        :''
                    :node.currentStyle?
                        (node.currentStyle[name] || node.currentStyle[name2] || (name3 && (node.currentStyle[name3] || node.currentStyle[name4])))
                :((style && (style[name]||(name3 && style[name3])))||'');
            /*
                            if(xui.browser.opr){
                                var map2 = me.map2 || (me.map2={left:1,top:1,right:1,bottom:1});
                                if(map2[name] && (xui.Dom.getStyle(node,'position')=='static'))
                                    value = 'auto';
                            }
            */
            }
            // xui.CSS.$px is for IE678
            if(!b && xui.browser.ie678){
                // INPUT/TEXTREA will always return % for font-size
                if((name=='fontSize'||name2=='font-size') && /%/.test(value) && node.parentNode){
                    value=(node.parentNode.currentStyle[name]||node.parentNode.currentStyle[name2]) * (parseFloat(value)||0);
                }else if(xui.CSS.$isEm(value)){
                    value=xui.CSS.$px(value, node);;
                }
            }
            return b?value?(parseFloat(value.match(/alpha\(opacity=(.*)\)/)[1] )||0)/100:1:(value||'');
        },
        $getBoundingClientRect:function(node, original) {
            var rect = node.getBoundingClientRect(),t;
            if(!original && (t = xui.ini.$transformScale))
                for(var i in rect)
                    rect[i] /= t;
            return rect;
        },
        $transformIE:function(node, value) {
            var style=node.style, t = (style.filter||"").replace(/progid\:DXImageTransform\.Microsoft\.Matrix\([^)]+\)/ig,"").replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
            if(xui.browser.ie8)style.msfilter = t;
            style.filter = t;
            style.marginTop=style.marginLeft="";
            if(value){
                var tmatrix = function(){
                    var current,
                        degRat = Math.PI/180,
                        //create new matrix
                        matrix = function(m11, m12, m21, m22, dx, dy){
                            var m = {};
                            m.m11 = xui.isSet(m11)?parseFloat(m11):1;
                            m.m12 = xui.isSet(m12)?parseFloat(m12):0;
                            m.m21 = xui.isSet(m21)?parseFloat(m21):0;
                            m.m22 = xui.isSet(m22)?parseFloat(m22):1;
                            m.dx = xui.isSet(dx)?parseFloat(dx):0;
                            m.dy = xui.isSet(dy)?parseFloat(dy):0;
                            return m;
                        },
                        //multiply matrices
                        multiply = function(newMatrix, currentMatrix){
                            //modify transformation matrix
                            var m ={};
                            m.m11 = roundNumber(newMatrix.m11*currentMatrix.m11 + newMatrix.m21*currentMatrix.m12, 10);
                            m.m12 = roundNumber(newMatrix.m12*currentMatrix.m11 + newMatrix.m22*currentMatrix.m12, 10);
                            m.m21 = roundNumber(newMatrix.m11*currentMatrix.m21 + newMatrix.m21*currentMatrix.m22, 10);
                            m.m22 = roundNumber(newMatrix.m12*currentMatrix.m21 + newMatrix.m22*currentMatrix.m22, 10);
                            m.dx = roundNumber(currentMatrix.dx + newMatrix.dx, 10);
                            m.dy = roundNumber(currentMatrix.dy + newMatrix.dy, 10);
                            //return new transformation matrix
                            return m;
                        },
                        //convert degrees to radians
                        deg2rad = function(deg){
                            return degRat*deg;
                        },
                        //format number
                        roundNumber = function(num, dec) {
                            var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
                            return result;
                        };

                    //rotate transformation
                    this.rotate = function(deg){
                        var rad = xui.isSet(deg)?parseFloat(deg2rad(parseFloat(deg))):0;
                        var m = matrix(Math.cos(rad), -Math.sin(rad), Math.sin(rad), Math.cos(rad), 0, 0);
                        current = multiply(m, current);
                    };
                    //translate transformations
                    this.translate = function(x, y){
                        var m = matrix(1, 0, 0, 1, parseFloat(x), parseFloat(y));
                        current = multiply(m, current);
                    };
                    this.translateX = function(x){
                        this.translate(x,0);
                    };
                    this.translateY = function(y){
                        this.translate(0,y);
                    };
                    //scaling transformations
                    this.scale = function(x,y){
                        var m = matrix(xui.isSet(x)?parseFloat(x):1, 0, 0, xui.isSet(y)?parseFloat(y):1, 0, 0);
                        current = multiply(m, current);
                    };
                    this.scaleX = function(x){
                        this.scale(x,1);
                    };
                    this.scaleY = function(y){
                        this.scale(1,y);
                    };
                    //skew transformations
                    this.skew = function(xAng, yAng){
                        xAng = xui.isSet(xAng)?parseFloat(deg2rad(parseFloat(xAng))):0;
                        yAng = xui.isSet(yAng)?parseFloat(deg2rad(parseFloat(yAng))):0;
                        var m = matrix(1, Math.tan(xAng), Math.tan(yAng), 1, 0, 0);
                        current = multiply(m, current);
                    };
                    this.skewX = function(xAng){
                        this.skew(xAng, 0);
                    };
                    this.skewY = function(yAng){
                        this.skew(0, yAng);
                    };
                    //transformation matrix
                    this.matrix = function(m11,m12,m21,m22,dx,dy){
                        current = multiply(matrix(m11,m12,m21,m22,dx,dy), current);
                    };
                    //return matrix
                    this.getMatrix = function(){
                        return current;
                    };
                    //return IE CSS matrix
                    this.getFilter = function(){
                        return "progid:DXImageTransform.Microsoft.Matrix(M11=" + current.m11 + ", M12=" + current.m12 + ", M21=" + current.m21 + ", M22=" + current.m22 + ", Dx=" + current.dx + ", Dy=" + current.dy + ", SizingMethod='auto expand')";
                    };
                    this.getX=function(){
                        return current.dx;
                    };
                    this.getY=function(){
                        return current.dy;
                    };
                    this.reset=function(){
                        current = matrix(1,0,0,1,0,0);
                    };
                    this.reset();
                };
                var computeMatrix = function(transform) {
                    var m=new tmatrix();
                    //Split the webkit functions and loop through them
                    var functions = transform.match(/[A-z]+\([^\)]+/g) || [];
                    for (var k=0; k < functions.length; k++) {
                        //Prepare the function name and its value
                        var arr=functions[k].split('('),
                            func=arr[0],
                            value=arr[1],
                            values;
                        //Now we rotate through the functions and add it to our matrix
                        switch(func) {
                            case 'rotate':
                                m.rotate(value);
                                break;
                            case 'scale':
                                values = value.split(',');
                                m.scale(values[0],values[1]);
                                break;
                            case 'scaleX':
                                m.scaleX(value);
                                break;
                            case 'scaleY':
                                m.scaleY(value);
                                break;
                            case 'skew':
                                values = value.split(',');
                                 m.skew(values[0],values[1]);
                                break;
                            case 'skewX':
                                 m.skewX(value);
                                break;
                            case 'skewY':
                                 m.skewY(value);
                                break;
                            case 'translate':
                                values = value.split(',');
                                 m.translate(values[0],values[1]);
                                break;
                            case 'translateX':
                                 m.translateX(value);
                                break;
                            case 'translateY':
                                 m.translateY(value);
                                break;
                            }
                    }
                    return m;
                };
                var matrix=computeMatrix(value);
                var ow=node.offsetWidth,oh=node.offsetHeight;
                var filter=matrix.getFilter();
//xui.echo(filter);
                var t=((style.filter?(style.filter+","):"")+filter).replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
                if(xui.browser.ie8)style.msfilter = t;
                style.filter=t;
//xui.echo(t);

                // for fake case
                if(node.getBoundingClientRect){
                    var transX=matrix.getX(), 
                        transY=matrix.getY(),
                        rect = xui.Dom.$getBoundingClientRect(node),
                        w=rect.right - rect.left, 
                        h=rect.bottom-rect.top;
     
                    style.marginLeft =Math.round(parseFloat((ow-w)/2  + 10 + transX))+'px';
                    style.marginTop = Math.round(parseFloat((oh-h)/2 + 10 + transY))+ 'px';
                }

                // fake
                style.transform=value;
            }
        },
        $textShadowIE:function(node, value, box){
            var style=node.style;
            if(!value){
                var f=function(s){
                    return (s||"").replace(/progid\:DXImageTransform\.Microsoft\.(Chroma|DropShadow|Glow)\([^)]+\)/ig,"").replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
                },
                s1=style.filter;
                if(s1){
                    if(xui.browser.ie8)style.msfilter=f(s1);
                    style.filter=f(s1);
                }
                if(!box)
                    style.backgroundColor="";
            }else{
                var f=function(x,y,r,c){
                    return (box?"":"progid:DXImageTransform.Microsoft.Chroma(Color=#cccccc) ")
                    + "progid:DXImageTransform.Microsoft.DropShadow(Color="+c+", OffX="+x+", OffY="+y+") "
                    + (parseFloat(r)>0 ?"progid:DXImageTransform.Microsoft.Glow(Strength="+r+", Color="+c+")":"");
                },
                r=value.match(/([\d\.-]+)px\s+([\d\.-]+)px(\s+([\d\.-]+)px)?(\s+([#\w]+))?/);
                if(r){
                    var t=((style.filter?(style.filter+","):"")+f(r[1],r[2],r[4],r[6]||"#000000")).replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
                    if(xui.browser.ie8)style.msfilter=t;
                    style.filter=t;
                    if(!box)
                        style.backgroundColor="#C5C5C5";
                }
            }
        },
        /*
        *type:linear, or radial
        *orient:LT/T/RT/R/RB/B/LB/L, + C for radial
        *stops:{clr:, pos:, opacity:}
        *rate:0~1
        *shape: circle or ellipse, only for radial
        *size: farthest-corner..
        */
        $setGradients:function(node, value, xb){
            xb=xb||xui.browser;
            var ns=this,
                ver=xb.ver,
                c16="0123456789ABCDEF",
                _toFF=function(n,b){
                    n = parseInt(n*b,10)||0;
                    n = (n>255||n<0)?0:n;
                    return c16.charAt((n-n%16)/16) + c16.charAt(n%16);
                },
                _to255=function(s){
                    s=s.split('');
                    return c16.indexOf(s[0].toUpperCase())*16 + c16.indexOf(s[1].toUpperCase());
                };
            window.btoa=window.btoa||function (text){
                if(/([^\u0000-\u00ff])/.test(text))return ;
                var table="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,cur,prev,byteNum,result=[];
                while(i<text.length){
                  cur=text.charCodeAt(i);
                  byteNum=(i+1)%3;
                  switch(byteNum){
                    case 1://first byte
                      result.push(table.charAt(cur >> 2));
                      break;
                    case 2: //second byte
                      result.push(table.charAt((prev & 3) << 4 | (cur >> 4)));
                      break;
                    case 0: //third byte
                      result.push(table.charAt((prev & 0x0f) << 2 | (cur >> 6)));
                      result.push(table.charAt(cur & 0x3f));
                      break;
                  }
                  prev = cur;
                  i++;
                }
                if (byteNum == 1){
                  result.push(table.charAt((prev & 3) << 4));
                  result.push("==");
                } else if (byteNum == 2){
                  result.push(table.charAt((prev & 0x0f) << 2));
                  result.push("=");
                }
                return result.join("");
            }
            var iecracker1=function(node, orient, stops, shape, size, rate){
                var id="xui.s-ie8gdfix";
                if(!node || node.nodeType != 1 || !node.style)return;
                var style=node.style, 
                    tmp1=ns.getStyle(node,'overflow'),
                    tmp2=ns.getStyle(node,'display');
                if(tmp1!='hidden' || (tmp2!='block' && tmp2!='relative'))return;

                if(!orient){
                    var i,a=node.childNodes,l=a.length;
                    for(i=0;i<l;i++){
                        if(a[i].nodeType==1 && a[i].id==id){
                            node.removeChild(a[i]);
                            break;
                        }
                    }
                    style.backgroundColor='';
                    var t = ((style.filter||"").replace(/progid\:DXImageTransform\.Microsoft\.Alpha\([^)]+\)/ig,'')).replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
                    if(xui.browser.ie8)style.msfilter = t;
                    style.filter=t;
                }else{
                    rate=rate||1;

                    var innerColor=stops[0].clr,
                        outerColor=stops[stops.length-1].clr;

                    var ew=node.offsetWidth||0,
                    eh=node.offsetHeight||0,
                    aw=ew*rate*2,
                    ah=eh*rate*2;

                    if(shape=='circle')
                        aw=ah=Math.min(aw,ah);

                    var l=-aw/2,t=-ah/2,w=aw,h=ah;
                    if(xui.isObj(orient)){
                        l=orient.left||(Math.round(parseFloat(l)||0)+'px');
                        t=orient.top||(Math.round(parseFloat(t)||0)+'px');
                    }else{
                        switch(orient){
                            case 'LT':
                                l=-aw/2;t=-ah/2;
                            break;
                            case 'T':
                                l=(ew-aw)/2;t=-ah/2;
                            break;
                            case 'RT':
                                l=ew-aw/2;t=-ah/2;
                            break;
                            case 'L':
                                l=-aw/2;t=(eh-ah)/2;
                            break;
                            case 'C':
                                l=(ew-aw)/2;t=(eh-ah)/2;
                            break;
                            case 'R':
                                l=ew-aw/2;t=(eh-ah)/2;
                            break;
                            case 'LB':
                                l=-aw/2;t=eh-ah/2;
                            break;
                            case 'B':
                                l=(ew-aw)/2;t=eh-ah/2;
                            break;
                            case 'RB':
                                l=ew-aw/2;t=eh-ah/2;
                            break;
                        }
                        l+='px';
                        t+='px';
                    }

                    var at = document.createElement('div'),
                        s=at.style;
                    at.id=id;
                    s.position = 'absolute';
                    s.zIndex = '0';
                    s.top = t;
                    s.left = l;
                    s.width = Math.round(parseFloat(w)||0)+'px';
                    s.height = Math.round(parseFloat(h)||0)+'px';
                    s.backgroundColor=innerColor;

                    var starto=stops[0].opacity?parseFloat(stops[0].opacity)*100:100
                    var t = ((s.filter?(s.filter+","):"")+'progid:DXImageTransform.Microsoft.Alpha(opacity='+starto+', finishopacity=0, style=2)').replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
                    if(xui.browser.ie8)s.msfilter = t;
                    s.filter=t;

                    // the first node
                    if(node.firstChild)
                        node.insertBefore(at, node.firstChild);
                    else
                        node.appendChild(at);
                    style.backgroundColor = outerColor;
                    if(stops[stops.length-1].opacity){
                        var t = ((style.filter?(style.filter+","):"")+"progid:DXImageTransform.Microsoft.Alpha(opacity="+(parseFloat(stops[stops.length-1].opacity)*100)+")").replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
                        if(xui.browser.ie8)style.msfilter = t;
                        style.filter=t;
                    }
                }
            },
            iecracker21=function(node, orient, stops){
                var id="xui.s-ie8gdfix";
                if(!node || node.nodeType != 1 || !node.style)return;
                var style=node.style, 
                    tmp1=ns.getStyle(node,'overflow'),
                    tmp2=ns.getStyle(node,'display');
                if(tmp1!='hidden'){
                    ns.setStyle(node,'overflow','hidden');
                }
                if(tmp2!='block' && tmp2!='relative'){
                    ns.setStyle(node,'display','relative');
                }

                if(!orient){
                    var i,a=node.childNodes,l=a.length;
                    for(i=0;i<l;i++){
                        if(a[i].nodeType==1 && a[i].id==id){
                            node.removeChild(a[i]);
                            break;
                        }
                    }
                    style.backgroundColor='';
                    var t = (style.filter||"").replace(/progid\:DXImageTransform\.Microsoft\.Alpha\([^)]+\)/ig,'').replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
                    if(xui.browser.ie8)style.msfilter = t;
                    style.filter=t;
                }else{
                    var innerColor=stops[0].clr,
                        outerColor=stops[stops.length-1].clr;

                    var ew=node.offsetWidth||0 ,
                    eh=node.offsetHeight||0,
                    size=Math.min(ew,eh),
                    xs=0,xe=size,ys=0,ye=size;

                    switch(orient){
                        case 'LT':
                        xs=0;ys=0;xe=size;ye=size;
                        break;
//                      case 'T':
//                      xs=0;ys=0;xe=0;ye=size;
//                      break;
                        case 'RT':
                        xs=size;ys=0;xe=0;ye=size;
                        break;
//                      case 'L':
//                      xs=0;ys=0;xe=0;ye=size;
//                      break;
//                      case 'R':
//                      xs=size;ys=0;xe=0;ye=0;
//                      break;
                        case 'LB':
                        xs=0;ys=size;xe=size;ye=0;
                        break;
//                      case 'B':
//                      xs=0;ys=size;xe=0;ye=0;
//                      break;
                        case 'RB':
                        xs=size;ys=size;xe=0;ye=0;
                        break;
                    }

                    var at = document.createElement('div'),
                        s=at.style;
                    at.id=id;
                    s.position = 'absolute';
                    s.zIndex = '0';
                    s.top = 0;
                    s.left = 0;
                    s.width = ew;
                    s.height = eh;
                    s.backgroundColor=innerColor;

                    var starto=stops[0].opacity?parseFloat(stops[0].opacity)*100:100
                    var t =( (s.filter?(s.filter+","):"")+'progid:DXImageTransform.Microsoft.Alpha(style=1, opacity='+starto+', finishopacity=0, startX='+xs+',finishX='+xe+',startY='+ys+',finishY='+ye+')').replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
                    if(xui.browser.ie8)s.msfilter = t;
                    s.filter=t;

                    // the first node
                    if(node.firstChild)
                        node.insertBefore(at, node.firstChild);
                    else
                        node.appendChild(at);
                    style.backgroundColor = outerColor;
                    if(stops[stops.length-1].opacity){
                        var t = ((style.filter?(style.filter+","):"")+"progid:DXImageTransform.Microsoft.Alpha(opacity="+(parseFloat(stops[stops.length-1].opacity)*100)+")").replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
                        if(xui.browser.ie8)style.msfilter = t;
                        style.filter=t;
                    }
                }
            },
            iecracker2=function(node,orient,stops){
                var id="xui.s-ie8gdfix";
                if(!node || node.nodeType!=1 || !node.style)return;
                 var style=node.style;
                if(!orient){
                    var t = ((style.filter||"").replace(/progid\:DXImageTransform\.Microsoft\.Gradient\([^)]+\)/ig,'')).replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
                    if(xui.browser.ie8)style.msfilter = t;
                    style.filter=t;
                    var i,a=node.childNodes,l=a.length;
                    for(i=0;i<l;i++){
                        if(a[i].nodeType==1 && a[i].id==id){
                            node.removeChild(a[i]);
                            break;
                        }
                    }
                    style.backgroundColor='';
                    var t = ((style.filter||"").replace(/progid\:DXImageTransform\.Microsoft\.Alpha\([^)]+\)/ig,'')).replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
                    if(xui.browser.ie8)style.msfilter = t;
                    style.filter = t;
                }else{
                    var innerColor=stops[0].clr,
                        outerColor=stops[stops.length-1].clr,
                        ori=1,t;
                    if(stops[0].opacity)
                        innerColor = innerColor.replace('#','#'+_toFF(stops[0].opacity,255));
                    if(stops[stops.length-1].opacity)
                        outerColor = outerColor.replace('#','#'+_toFF(stops[stops.length-1].opacity,255));
                    switch(orient){
                        case 'LT':
                        case 'RT':
                        case 'LB':
                        case 'RB':
                           iecracker21(node, orient, stops);
                        return;
                        case "L":
                            ori=1;
                        break;
                        case "R":
                            ori=1;
                            t=innerColor;
                            innerColor=outerColor;
                            outerColor=t;
                        break;
                        case "T":
                            ori=0;
                        break;
                        case "B":
                            ori=0;
                            t=innerColor;
                            innerColor=outerColor;
                            outerColor=t;
                        break;
                    }
                    var t = ((style.filter?(style.filter+","):"")+"progid:DXImageTransform.Microsoft.Gradient(StartColorstr='"+innerColor+"',EndColorstr='"+outerColor+"',GradientType="+ori+")").replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
                    if(xui.browser.ie8)style.msfilter = t;
                    style.filter =t;
                }
            },
            svgcracker1=function(node,orient,stops, shape, size, rate){
                if(!orient){
                    node.style.backgroundImage="";
                }else{
                    rate=rate||1;
                    var id='svg:'+xui.id(),
                        cx='0%',cy='0%',
                        r=rate*100+"%";
                    if(xui.isObj(orient)){
                        cx=orient.left||cx;
                        cy=orient.left||cy;
                    }else{
                        switch(orient){
                            case "T":
                                cx='50%';cy='0%';
                            break;
                            case "B":
                                cx='50%';cy='100%';
                            break;
                            case "L":
                                cx='0%';cy='50%';
                            break;
                            case "R":
                                cx='100%';cy='50%';
                            break;
                            case "LT":
                                cx='0%';cy='0%';
                            break;
                            case "RT":
                                cx='100%';cy='0%';
                            break;
                            case "RB":
                                cx='100%';cy='100%';
                            break;
                            case "LB":
                                cx='0%';cy='100%';
                            break;
                            case "C":
                                cx='50%';cy='50%';
                            break;
                        }
                    }
                    /*                    var rectw=1,recth=1;
                                        if(shape=='circle'){
                                            var m=Math.min(node.offsetWidth,node.offsetHeight);
                                            if(m==node.offsetWidth){
                                                recth=m/node.offsetHeight;
                                            }else{
                                                rectw=m/node.offsetWidth;
                                            }
                                        }
                    */
                    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">'
                    +'<radialGradient id="'+id+'" gradientUnits="userSpaceOnUse" cx="'+cx+'" cy="'+cy+'" r="'+r+'">';

                    for(var i=0,l=stops.length;i<l;i++){
                        svg += '<stop stop-color="'+stops[i].clr+'" offset="'+stops[i].pos+'" '+(xui.isSet(stops[i].opacity)?(' stop-opacity="'+stops[i].opacity+'"'):'')+' />';
                    }

                    svg += '</radialGradient>'
                    +'<rect x="-50" y="-50" width="101" height="101" fill="url(#'+id+')" />'
                    +'</svg>';

                    node.style.backgroundImage = 'url("data:image/svg+xml;base64,'+window.btoa(svg)+'")';
                }
            },
            svgcracker2=function(node,orient,stops){
                if(!orient){
                    node.style.backgroundImage='';
                }else{
                    var id='svg'+xui.id(),x1='0%',y1='0%',x2='0%',y2='100%';

                    switch(orient){
                        case "T":
                            x1='50%'; y1='0%';
                            x2='50%'; y2='100%';
                        break;
                        case "B":
                            x1='50%'; y1='100%';
                            x2='50%'; y2='0%';
                        break;
                        case "L":
                            x1='0%'; y1='50%';
                            x2='100%'; y2='50%';
                        break;
                        case "R":
                            x1='100%'; y1='50%';
                            x2='0%'; y2='50%';
                        break;
                        case "LT":
                            x1='0%'; y1='0%';
                            x2='100%'; y2='100%';
                        break;
                        case "RT":
                            x1='100%'; y1='0%';
                            x2='0%'; y2='100%';
                        break;
                        case "RB":
                            x2='0%'; y2='0%';
                            x1='100%'; y1='100%';
                        break;
                        case "LB":
                            x1='0%'; y1='100%';
                            x2='100%'; y2='0%';
                        break;
                        default:
                        /*To caculate x1/x2/y1/y2 from orient*/
                    }

                    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">'
                    +'<linearGradient id="'+id+'" gradientUnits="userSpaceOnUse" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'">';

                    for(var i=0,l=stops.length;i<l;i++){
                        svg += '<stop stop-color="'+stops[i].clr+'" offset="'+stops[i].pos+'" '+(xui.isSet(stops[i].opacity)?(' stop-opacity="'+stops[i].opacity+'"'):'')+'/>';
                    }

                    svg += '</linearGradient>'
                    +'<rect x="0" y="0" width="1" height="1" fill="url(#'+id+')" />'
                    +'</svg>';

                    node.style.backgroundImage = 'url("data:image/svg+xml;base64,'+window.btoa(svg)+'")';
                }
            },
            css1=function(node,orient,stops, shape, size, rate){
                var arr1=[],arr2=[],style=node.style;
                xui.arr.each(stops,function(o){
                    var clr=o.clr;
                    if(xui.isSet(o.opacity) && clr.charAt(0)=='#'){
                        clr=clr.slice(1);
                        clr="rgba("+_to255(clr.substr(0, 2))+","+_to255(clr.substr(2, 2))+","+_to255(clr.substr(4, 2))+","+(parseFloat(o.opacity)||1)+")";
                    }
                    arr1.push(clr + " " + o.pos);
                    if(xb.isWebKit){
                        arr2.push("color-stop(" + o.pos + ',' + clr + ")");
                    }
                });

                if(!orient){
                    style.backgroundImage="";
                }else{
                    var position;
                    if(xui.isObj(orient)){
                        position = orient.left + " " + orient.top;
                    }else{
                        switch(orient){
                            case 'LT':position = 'left top';break;
                            case 'T':position = 'center top';break;
                            case 'RT':position = 'right top';break;
                            case 'L':position = 'left center';break;
                            case 'C':position = 'center center';break;
                            case 'R':position = 'right center';break;
                            case 'LB':position = 'left bottom';break;
                            case 'B':position = 'center bottom';break;
                            case 'RB':position = 'right bottom';break;
                            default:
                                position = 'left top';
                        }
                    }

                    if(xb.isWebKit){
                        style.backgroundImage = "-webkit-gradient(radial,"+position+", 0px, "+position+", 100%," + arr2.join(",") + ")";
                    }

                    var v1="radial-gradient("+ position +"," + shape + " "+ size +"," + arr1.join(",") + ")";
                    if(xb.cssTag1){
                        style.backgroundImage = xb.cssTag1+v1;
                    }
                    style.backgroundImage = "radial-gradient(" + size + " "+ shape + " at " + position +"," + arr1.join(",") + ")";
                }
            },
            css2=function(node,orient,stops){
                var arr1=[],arr2=[],style=node.style;
                xui.arr.each(stops,function(o){
                    var clr=o.clr;
                    if(xui.isSet(o.opacity) && clr.charAt(0)=='#'){
                        clr=clr.slice(1);
                        clr="rgba("+_to255(clr.substr(0, 2))+","+_to255(clr.substr(2, 2))+","+_to255(clr.substr(4, 2))+","+(parseFloat(o.opacity)||1)+")";
                    }
                    arr1.push(clr + " " + o.pos);
                    if(xb.isWebKit){
                        arr2.push("color-stop(" + o.pos + ',' + clr + ")");
                    }
                });

                if(!orient){
                    style.backgroundImage="";
                }else{
                    var direction = 'to bottom';
                    var directionmoz="top";
                    var directionwebkit = 'left top, left bottom';
                    switch(orient){
                        case 'LT':
                            direction="135deg";
                            directionmoz="-45deg";
                            directionwebkit = 'left top, right bottom';
                        break;
                        case 'T':
                            direction="to bottom";
                            directionmoz="top";
                            directionwebkit = 'left top, left bottom';
                        break;
                        case 'RT':
                            direction=directionmoz="-135deg";
                            directionwebkit = 'right top, left bottom';
                        break;
                        case 'L':
                            direction="to right";
                            directionmoz="left";
                            directionwebkit = 'left top, right top';
                        break;
                        case 'R':
                            direction="to left";
                            directionmoz="right";
                            directionwebkit = 'right top, left top';
                        break;
                        case 'LB':
                            direction=directionmoz="45deg";
                            directionwebkit = 'left bottom, right top';
                        break;
                        case 'B':
                            direction="to top";
                            directionmoz="bottom";
                            directionwebkit = 'left bottom, left top';
                        break;
                        case 'RB':
                            direction="-45deg";
                            directionmoz="135deg";
                            directionwebkit = 'right bottom, left top';
                        break;
                        default:
                            direction=orient;
                            directionmoz=orient;
                            directionwebkit = 'left top, right bottom';
                    }

                    if(xb.isWebKit){
                        style.backgroundImage = "-webkit-gradient(linear,"+directionwebkit+", " + arr2.join(",") + ")";
                    }

                    var v1="linear-gradient({#}," + arr1.join(",") + ")";
                    if(xb.cssTag1){
                        style.backgroundImage = xb.cssTag1+v1.replace("{#}",directionmoz);
                    }
                    style.backgroundImage = v1.replace("{#}",direction);
                }
            };

            var type=value?(value.type||value||'linear').toLowerCase():null,
                rate=value?(value.rate||1):null,
                shape=value?(value.shape||'circle').toLowerCase():null,
                size=value?(value.size||'farthest-corner').toLowerCase():null,
                orient=value?value.orient:null,
                stops=value?value.stops:null;

            if(type!='linear')
                type='radial';

            if(stops){
                if(stops.length>1){
                    xui.arr.stableSort(stops,function(x,y){
                        x=parseFloat(x.pos)||0;
                        y=parseFloat(y.pos)||0;
                        return x>y?1:x==y?0:-1;
                    });
                }else{
                    return;
                }
            }

            if(xb.ie678){
                if(type=='linear'){iecracker2(node,orient,stops);}
                else{iecracker1(node,orient,stops,shape,size,rate);}
            }
            if(xb.ie9 || (xb.opr && ver<11.1)){
                if(type=='linear'){svgcracker2(node,orient,stops);}
                else{svgcracker1(node,orient,stops,shape,size,rate);}
            }
            if(((xb.gek && ver>=3.6)
                ||(xb.isChrome && ver>=10)
                ||(xb.isSafari && ver>=5.1)
                ||(xb.ie && ver>=10)
                ||(xb.opr && ver>=11.1)
                )){
                if(type=='linear'){
                    css2(node,orient,stops);
                }else{
                    if(xb.opr && ver<12)
                        svgcracker1(node,orient,stops,shape,size,rate);
                    else
                        css1(node,orient,stops,shape,size,rate);
                }
            }
        },
        $setZoom:function(node,scale,transx,transy,origin){
            scale=parseFloat(scale);
            if(xui.isNaN(scale) || scale<=0)scale='';
            var b=xui.browser,h={};
            h[b.cssTag1 + "transform"] = h.transform = scale===''?'': ((xui.isNumb(transx)&&xui.isNumb(transy)?('translate('+transx+'px,'+transy+'px) '):'') + 'scale('+scale+','+scale+')');
            h[b.cssTag1 + "transform-origin"] = h["transform-origin"] = scale===''?'':(origin||'0 0 0');
            xui(node).css(h);
        },
        _vAnimate:function(node,setting,callback){
            if(!setting || !setting.endpoints || xui.isEmpty(setting.endpoints)){
                if(callback)xui.tryF(callback);
                return;
            }

            var endpoints=setting.endpoints,begin={},end={};
            node=xui(node);
            xui.each(endpoints,function(o,i){if(!xui.isFun(o)){begin[i]=o[0];end[i]=o[1]}});

            return node.animate(endpoints, function(threadid){
                node.css(begin);
            },function(threadid){
                node.css(end);
                if(callback)xui.tryF(callback);
            },setting.duration,0,setting.type).start();
        },
        $adjustCss:function(hash,returnStr){
            var fack={nodeType:1,style:{}}, style=fack.style;
            xui.Dom.setStyle(fack,hash);
            if(returnStr){
                var arr=[];
                if(xui.browser.ie&&xui.browser.ver==8){
                    if(style.filter)
                        style["-ms-filter"]=style.filter;
                    if(style['background-image']=='none')
                        style['background-image']="url(about:blank)";
                }
                xui.each(style,function(o,i){
                    arr.push(i.replace(/([A-Z])/g, "-$1" ).toLowerCase()+":"+o);
                });
                return arr.join(';').replace(/[;]+/g,';');
            }else{
                return style;
            }
        },
        _cssfake:{rotate:1, scaleX:1,scaleY:1,translateX:1,translateY:1,skewX:1,skewY:1},
        setStyle:function(node, name , value){
            if(name=="rotate"){
               xui(node).rotate(value);
               return this;
            }
            var ns=xui.Dom,
                css3prop=xui.Dom._css3prop,
                xb=xui.browser,
                fake=ns._cssfake,
                style=node.style;

            if(node.nodeType != 1)return;
            if(typeof name == 'string'){
                if(fake[name]){
                    xui(node)[name](value);
                }else{
                    var me=this.getStyle,
                    c1 = me._c1 || (me._c1={}),
                    r1 = me._r1 || (me._r1=/alpha\([^\)]*\)/ig),
                    map = me.map || (me.map = {'float':1,'cssFloat':1,'styleFloat':1});
                    var name2,name3,name4;
                    name = c1[name] || (c1[name] = name.replace(/\-(\w)/g, function(a,b){return b.toUpperCase()}));

                    var n1=name;
                    if(n1.indexOf("border")===0){
                        n1=n1.replace(/[-]?(left|top|right|bottom)/ig,'');
                    }

                    if(name=="$gradient"){
                        return ns.$setGradients(node,value);
                    }if(name=="$zoom"){
                        return ns.$setZoom(node,value);
                    }else if(name=='opacity'){
                        value=xui.isFinite(value)?
                                parseFloat(value)>1?
                                    1
                                    :parseFloat(value)<=0?
                                        0
                                    :parseFloat(value)
                                :1;
                        value= value >0.9999 ? '' : value;
                        if((!ns.css3Support("opacity"))&&xb.ie){
                            if(value==='')value=1;
                            // fake
                            style.opacity=value;
                            style.zoom=1;
                            value = "alpha(opacity="+ 100*value +")";
                            var ov = (style.filter||"").replace(r1, "");
                            value = (ov?(ov+","):"") + value;
                            name="filter";
                            if(xb.ver==8)name2="msfilter";
                        }
                    }else if(xui.arr.indexOf(css3prop,n1)!=-1){
                        if(!ns.css3Support(name)){
                            if(xb.ie && xb.ver<9){
                                switch(name){
                                    case "transform":
                                    xui.Dom.$transformIE(node,value);
                                    break;
                                    case "boxShadow":
                                    xui.Dom.$textShadowIE(node,value, true);
                                    break;
                                }
                            }
                            if(name=="textShadow" && xb.ie && xb.ver<10){
                                xui.Dom.$textShadowIE(node,value);
                            }
                            return this;
                        }else{
                            if(xb.cssTag2){
                                if(name!="textShadow"){
                                    name2=xb.cssTag2 + name.charAt(0).toUpperCase() + name.substr(1);
                                }
                            }
                        }
                    }else if(map[name]){
                        name = xb.ie?"styleFloat":"cssFloat";
                    }

                    if(name=="filter"){
                        value=value.replace(/(^[\s,]*)|([\s,]*$)/g,'').replace(/,[\s]+/g,','+(xui.browser.ver==8?"":" "));
                    }
                    style[name]=value;
                    if(name2)style[name2]=value;
                    if(name3)style[name3]=value;
                    if(name4)style[name4]=value;
                }
            }else
                for(var i in name)
                    arguments.callee.call(this,node, i, name[i]);
        },
        _css3prop:'opacity,textShadow,animationName,columnCount,flexWrap,boxDirection,backgroundSize,perspective,boxShadow,borderImage,borderRadius,boxReflect,transform,transition'.split(','),
        css3Support:function(key){
            var self=arguments.callee,
                _c=self._c||(self._c={});

            key=key.replace("$","").replace(/\-(\w)/g, function(a,b){return b.toUpperCase()});

            if(key in _c)return _c[key];

            var n = document.createElement("div"),
                s = n.style,
                rt = false,
                xb = xui.browser,
                f = function(k){
                    k=k.replace(/\-(\w)/g, function(a,b){return b.toUpperCase()});
                    if(s[k]!==undefined)
                        return true;
                    if(xui.browser.cssTag2){
                        k=xui.browser.cssTag2+k.charAt(0).toUpperCase()+k.substr(1);
                        if(s[k]!==undefined)
                            return true;
                    }
                    return false;
                };
            n.id="xui_css3_"+xui.stamp();

            if(key.indexOf("border")===0){
                key=key.replace(/[-]?(left|top|right|bottom)/ig,'');
            }
            switch(key){
                case "opacity":
                case "textShadow":{
                    rt = s[key]==='';
                }break;
                case "generatedContent":{
                    var id="tmp_css3_test"+xui.id(),
                        css='#'+n.id+'{line-height:auto;margin:0;padding:0;border:0;font:0/0 a}#'+n.id+':after{content:\'a\';visibility:hidden;line-height:auto;margin:0;padding:0;border:0;font:3px/1 a}';
                    xui.CSS.addStyleSheet(css,id);
                    xui('body').append(n);
                    var v=n.offsetHeight;
                    xui.CSS.remove("id",id);
                    xui(n.id).remove(n);
                    rt = v>=3;
                }break;
                case "fontFace":{
                    if(xb.ie && xb.ver>=6){
                        rt=true;
                    }else{
                        var id="tmp_css3_test"+xui.id(),
                            css='@font-face{font-family:"font";src:url("https://")}',
                            s=xui.CSS.addStyleSheet(css,id),
                            sh=s.sheet || s.styleSheet,
                            ctxt=sh?((sh.cssRules && sh.cssRules[0])?sh.cssRules[0].cssText:sh.cssText||''):'';

                        rt=/src/i.test(ctxt) && ctxt.indexOf("@font-face") === 0;
                        xui.CSS.remove("id",id);
                    }
                }break;
                case "rgba":{
                    s.cssText = "background-color:rgba(0,0,0,0.1)";
                    rt = s.backgroundColor.indexOf("rgba")!=-1;
                }break;
                case "hsla":{
                    s.cssText = 'background-color:hsla(120,40%,100%,.5)';
                    rt = s.backgroundColor.indexOf('hsla')!=-1 || s.backgroundColor.indexOf('rgba')!=-1;
                }break;
                case "multiplebgs":{
                    s.cssText = "background:url(//:),url(//:),red url(//:)";
                    rt = /(url\s*\(.*?){3}/.test(s.background);
                }break;
                case "gradient":{
                    var k = 'background-image:',
                    v1 = '-webkit-gradient(linear,left top,right bottom,from(#000),to(#fff));',
                    v2 = 'linear-gradient(left top,#000,#fff);',
                    arr=[k,v2];
                    if(xui.browser.cssTag1){
                        arr.push(k);
                        arr.push(xui.browser.cssTag1+v2);
                    }
                    if(xui.browser.isWebKit){
                        arr.push(k);
                        arr.push(v1);
                    }
                    s.cssText = arr.join('');
                    rt = !!s.backgroundImage;
                }break;
                case "transform3d":{
                    var r=f("perspective");
                    if(r && 'webkitPerspective' in document.documentElement.style){
                        var id="tmp_css3_test"+xui.id(),
                            css='@media (transform-3d),(-webkit-transform-3d){#'+n.id+'{font:0/0;line-height:0;margin:0;padding:0;border:0;left:9px;position:absolute;height:3px;}}';
                        xui.CSS.addStyleSheet(css,id);
                        xui('body').append(n);
                        var v1=n.offsetLeft,v2=n.offsetHeight;
                        xui.CSS.remove("id",id);
                        xui(n.id).remove(n);
                        rt = v1===9&&v2===3;
                    }
                    rt = r;
                }break;
                default:{
                    rt = f(key);
                }
            }
            return _c[key]=rt;
        },
        $AnimateEffects:{
            linear:function(s,c) {return (1/s)*c;},
            sineIn:function(s,c) {return -1*Math.cos(c/s*(Math.PI/2))+1;},
            sineOut:function(s,c) {return Math.sin(c/s*(Math.PI/2));},
            sineInOut:function(s,c) {return -1/2*(Math.cos(Math.PI*c/s)-1);},
            quadIn:function(s,c) {return (c/=s)*c;},
            quadOut:function(s,c) {return -1*(c/=s)*(c-2);},
            quadInOut:function(s,c) {if((c/=s/2)<1) {return 1/2*c*c;} return -1/2*((--c)*(c-2)-1);},
            cubicIn:function(s,c) {return (c/=s)*c*c;},
            cubicOut:function(s,c) {return ((c=c/s-1)*c*c+1);},
            cubicInOut:function(s,c) {if((c/=s/2)<1) {return 1/2*c*c*c;} return 1/2*((c-=2)*c*c+2);},
            quartIn:function(s,c) {return (c/=s)*c*c*c;},
            quartOut:function(s,c) {return -1*((c=c/s-1)*c*c*c-1);},
            quartInOut:function(s,c) {if((c/=s/2)<1) {return 1/2*c*c*c*c;} return -1/2*((c-=2)*c*c*c-2);},
            quintIn:function(s,c) {return (c/=s)*c*c*c*c;},
            quintOut:function(s,c) {return ((c=c/s-1)*c*c*c*c+1);},
            quintInOut:function(s,c) {if((c/=s/2)<1) {return 1/2*c*c*c*c*c;} return 1/2*((c-=2)*c*c*c*c+2);},
            expoIn:function(s,c) {return (c==0)?0:Math.pow(2,10*(c/s-1));},
            expoOut:function(s,c) {return (c==s)?1:(-Math.pow(2,-10*c/s)+1);},
            expoInOut:function(s,c) {if(c==0) {return 0;} if(c==s) {return 1;} if((c/=s/2)<1) {return 1/2*Math.pow(2,10*(c-1));} return 1/2*(-Math.pow(2,-10*--c)+2);},
            circIn:function(s,c) {return -1*(Math.sqrt(1-(c/=s)*c)-1);},
            circOut:function(s,c) {return Math.sqrt(1-(c=c/s-1)*c);},
            circInOut:function(s,c) {if((c/=s/2)<1) {return -1/2*(Math.sqrt(1-c*c)-1);} return 1/2*(Math.sqrt(1-(c-=2)*c)+1);},
            bounceIn:function(s,c) {return 1-xui.Dom.$AnimateEffects.bounceOut(s,s-c);},
            bounceOut:function(s,c) {var k=7.5625; if((c/=s)<(1/2.75)) {return (k*c*c);}else if(c<(2/2.75)) {return (k*(c-=(1.5/2.75))*c+.75);}else if(c<(2.5/2.75)) {return (k*(c-=(2.25/2.75))*c+.9375);}else {return (k*(c-=(2.625/2.75))*c+.984375);}},
            bounceInOut:function(s,c) {if(c<s/2) {return xui.Dom.$AnimateEffects.bounceIn(s,c*2)*.5;}else {return xui.Dom.$AnimateEffects.bounceOut(s,c*2-s)*.5+1*.5;}},
            backIn:function(s,c) {var k=1.70158; return (c/=s)*c*((k+1)*c-k);},
            backOut:function(s,c) {var k=1.70158;   return ((c=c/s-1)*c*((k+1)*c+k)+1);},
            backInOut:function(s,c) {var k=1.70158; if((c/=s/2)<1) {return 1/2*(c*c*(((k*=(1.525))+1)*c-k));} return 1/2*((c-=2)*c*(((k*=(1.525))+1)*c+k)+2);},
            elasticIn:function(s,c,p,a,z) {if(c==0) {return 0;} if((c/=s)==1) {return 1;} if(!z) {z=s*.3;} if(!a||a<1) {a=1; var k=z/4;}else {var k=z/(2*Math.PI)*Math.asin(1/a);} return -(a*Math.pow(2,10*(c-=1))*Math.sin((c*s-k)*(2*Math.PI)/z));},
            elasticOut:function(s,c,p,a,z) {if(c==0) {return 0;} if((c/=s)==1) {return 1;} if(!z) {z=s*.3;} if(!a||a<1) {a=1; var k=z/4;}else {var k=z/(2*Math.PI)*Math.asin(1/a);} return (a*Math.pow(2,-10*c)*Math.sin((c*s-k)*(2*Math.PI)/z)+1);},
            elasticInOut:function(s,c,p,a,z) {if(c==0) {return 0;} if((c/=s/2)==2) {return 1;} if(!z) {z=s*(.3*1.5);} if(!a||a<1) {a=1; var k=z/4;}else {var k=z/(2*Math.PI)*Math.asin(1/a);} if(c<1) {return -.5*(a*Math.pow(2,10*(c-=1))*Math.sin((c*s-k)*(2*Math.PI)/z));} return a*Math.pow(2,-10*(c-=1))*Math.sin((c*s-k)*(2*Math.PI)/z)*.5+1;}
        },
        $preDefinedAnims:{
            blinkAlert:{
                endpoints:{opacity:[1,0]}, 
                duration:200, 
                restore: true, 
                times:3
            },
            blinkAlertLoop:{
                endpoints:{opacity:[1,0]}, 
                duration:500, 
                restore: true, 
                times:-1
            },
            rotateAlert:{
                endpoints:{rotate:[0,360]}, 
                duration:400, 
                restore: false
            },
            rotateAlertLoop1:{
                endpoints:{rotate:[0,360]}, 
                duration:2000, 
                restore: false,
                times:-1
            },
            rotateAlertLoop2:{
                endpoints:{rotate:[0,-360]}, 
                duration:2000, 
                returned: false,
                times:-1
            },
            zoomAlert:{
                endpoints:{scaleX:[1,1.1],scaleY:[1,1.1]}, 
                duration:100, 
                restore: true, 
                times:3
            },
            translateXAlert:{
                endpoints:{translateX:[0,5]}, 
                duration:100, 
                restore: true, 
                times:3
            },
            translateYAlert:{
                endpoints:{translateY:[0,5]}, 
                duration:100, 
                restore: true, 
                times:3
            }
        },
        $preDefinedEffects:{
           "Classic":[{type:"circOut",duration:200,endpoints: {opacity:[0,1],scaleX:[.75,1],scaleY:[.75,1]}}, {type:"circIn",duration:200,endpoints: {opacity:[1,0],scaleX:[1,.75],scaleY:[1,.75]}}],
           "Blur":[{type:"circOut",duration:200,endpoints: {opacity:[0,1]}}, {type:"circIn",duration:200,endpoints: {opacity:[1,0]}}],
           "Drop":[{type:"circOut",duration:200,endpoints: {opacity:[0,1],translateY:["-25%","0%"],scaleY:[.5,1]}}, {type:"circIn",duration:200,endpoints: {opacity:[1,0],translateY:["0%","-25%"],scaleY:[1,.5]}}],
           "From Below":[{type:"circOut",duration:200,endpoints: {opacity:[0,1],scaleX:[0,1],scaleY:[0,1]}}, {type:"circIn",duration:200,endpoints: {opacity:[1,0],scaleX:[1,0],scaleY:[1,0]}}],
           "From Above":[{type:"circOut",duration:200,endpoints: {opacity:[0,1],scaleX:[2,1],scaleY:[2,1]}}, {type:"circIn",duration:200,endpoints: {opacity:[1,0],scaleX:[1,2],scaleY:[1,2]}}],
           "Slide In LR":[{type:"circOut",duration:200,endpoints: {opacity:[0,1],translateX:["-150%","0%"]/*,scaleX:[.2,1],scaleY:[.2,1]*/}}, {type:"circIn",duration:200,endpoints: {opacity:[1,0],translateX:["0%","150%"]/*,scaleX:[1,.2],scaleY:[1,.2]*/}}],
           "Slide In TB":[{type:"circOut",duration:200,endpoints: {opacity:[0,1],translateY:["-150%","0%"]/*,/*scaleX:[.2,1],scaleY:[.2,1]*/}}, {type:"circIn",duration:200,endpoints: {opacity:[1,0],translateY:["0%","150%"]/*,scaleX:[1,.2],scaleY:[1,.2]*/}}],
           "Flip V":[{type:"circOut",duration:200,endpoints: {opacity:[0,1],scaleY:[0,1]}}, {type:"circIn",duration:200,endpoints: {opacity:[1,0],scaleY:[1,0]}}],
           "Flip H":[{type:"circOut",duration:200,endpoints: {opacity:[0,1],scaleX:[0,1]}}, {type:"circIn",duration:200,endpoints: {opacity:[1,0],scaleX:[1,0]}}]
        },
        _getEffects:function(key,isIn){
                if(key && typeof(key)=="string"){
                    key=this.$preDefinedEffects[key];
                    key=key?isIn?key[0]:key[1]:null;
                }
                if(key &&xui.browser.ie&&xui.browser.ver<=8){
                    xui.filter(key,function(o,i){
                        return !!xui.Dom._cssfake[i];
                    });
                }
                return key;
        },
        _setUnitStyle:function(node, key, value){
            if(node.nodeType != 1)return false;
            var style=node.style;
            if(value || value===0){
                value =xui.CSS.$addu(value);
                if(value && (key=='width'||key=='height') && value.charAt(0)=='-')value='0';
                if(style[key]!=value){
                    style[key]=value;
                    return true;
                }
            }return false;
        },
        _emptyDivId:"xui.empty:",
        getEmptyDiv:function(pid, sequence){
            var i=1,id,rt,style,o,t,count=0,doc=document,
                body = pid && (pid=xui(pid)).get(0) || doc.body,
                ini=function(o){
                o.id=id;
                // position:relative; is for text wrap bug
                xui([o]).attr('style','position:absolute;visibility:hidden;overflow:visible;left:'+xui.Dom.HIDE_VALUE+';top:'+xui.Dom.HIDE_VALUE+';');
            };
            sequence=sequence || 1;
            pid=body==doc.body?'':pid.n0.replace('!','');
            while(1){
                id = this._emptyDivId + pid + ":" + i;
                //don't remove this {
                if(o=xui.Dom.byId(id)){
                    //Using firstChild, for performance
                    if((!o.firstChild||(o.firstChild.nodeType==3&&!o.firstChild.nodeValue)) && ++count == sequence)
                        return xui([o]);
                }else{
                    o=doc.createElement('div');
                    ini(o,id);
                    if(body.firstChild)
                        body.insertBefore(o, body.firstChild);
                    else
                        body.appendChild(o);
                    rt=xui([o]);
                    body=o=null;
                    return rt;
                }
                i++;
            }
            body=o=null;
        },
        setCover:function(visible,label,busyIcon,cursor,bgStyle){
            // get or create first
            var me=arguments.callee,
                id="xui.temp:cover:",
                id2="xui.temp:message:",
                content = (typeof(visible)=='string'||typeof(visible)=='function')?visible:'',
                o1,o2;

            if((o1=xui(id)).isEmpty()){
                xui('body').prepend(o1=xui.create('<button id="'+ id +'" class="xui-node xui-node-div xui-cover xui-cover-global xui-custom" style="position:absolute;display:none;text-align:center;left:0;top:0;border:0;padding:0;margin:0;padding-top:2em;"><div id="'+id2+'" class="xui-node xui-node-div xui-coverlabel xui-custom"></div></button>'));
                o1.setSelectable(false);
                xui.setNodeData(o1.get(0),'zIndexIgnore',1);
            }
            if(xui.Dom.byId(id2)){
                o2=xui(id2);
            }

            //clear the last one
            if(!visible){
                if(typeof me._label =='string' && me._label!==label)
                    return;
                if(me._showed){
                    if(o2)o2.empty(false);
                    o1.css({zIndex:0,cursor:'',display:'none',cursor:''});
                    o1.query('style').remove(false);
                    me._showed=false;
                }
                delete me._label;
            }else{
                if(typeof label=='string')me._label=label;
                var t = xui.win;
                if(!me._showed){
                    o1.css({zIndex:xui.Dom.TOP_ZINDEX*10,display:'',width:t.scrollWidth()+'px',height:t.scrollHeight()+'px',cursor:cursor||'progress'});
                    if(busyIcon)o1.addClass('xuicon xui-icon-loading'); else o1.removeClass('xuicon xui-icon-loading');
                    me._showed=true;
                }

                o1.query('style').remove(false);
                if(bgStyle)
                    xui.CSS._appendSS(o1.get(0), ".xui-cover-global:before{" + bgStyle + "}", "" ,true);

                //show content
                if(content){
                    if(typeof(content)=='function'){
                        content(o1,o2);
                    }else if(o2){
                        o2.html(content +'',false);
                    }
                }
            }
        },

        byId:function(id){
            return  document.getElementById(id||"");
        },
        $hasEventHandler:function(node, name){
            return xui.getNodeData(node,['eHandlers', name]);
        },
        /*
        action: uri
        data:hash{key:value}
        method:'post'(default) or 'get'
        target: uri target: _blank etc.
        */
        submit:function(action, data, method, target, enctype){
            data=xui.isHash(data)?data:{};
            data=xui.clone(data, function(o){return o!==undefined});

            action=action||'';
            target=target||(action.substring(0,6).toLowerCase()=='mailto'?'_self':'_blank');
            var _t=[];
            if(!xui.isEmpty(data)){
                var file,files=[];
                xui.each(data,function(o,i){
                    if(o && o['xui.UIProfile'] && o.$xuiFileCtrl){
                        if(file=o.boxing().getUploadObj()){
                            files.push({id:o.$xid, file:file});
                            file.id=file.name=i;
                            data[i]=file;
                        }
                    }
                });

                method=method||(file?'post':'get');

                if(method.toLowerCase()=='get'){
                    window.open(action + "?" + xui.urlEncode(data),target);
                }else{
                    xui.each(data,function(o,i){
                        if(xui.isDefined(o) && !xui.isElem(o))
                            _t.push('<textarea name="'+i+'">'+(typeof o=='object'?xui.serialize(o):o)+'</textarea>');
                    });
                    _t.push('<input type="hidden" name="rnd" value="'+xui.rand()+'">');
                    _t=xui.str.toDom('<form target="'+target+'" action="'+action+'" method="'+method  + (enctype?'" enctype="' +enctype:'') +  '">'+_t.join('')+'</form>');
                    xui.Dom.getEmptyDiv().append(_t);
                    // 1. add files
                    if(files.length){
                        xui.arr.each(files,function(o,i){
                            _t.append(o.file);
                        });
                    }
                    // 2.submit
                    _t.get(0).submit();
                    _t.remove();
                    _t=null;
                }
                // 3.restore file input
                if(files.length){
                    xui.arr.each(files,function(o,i){
                        if(i=xui.getObject(o.id)){
                            if(i['xui.UIProfile'] && i.boxing() && i.boxing().setUploadObj){
                                i.boxing().setUploadObj(o.file);
                            }
                        }
                    });
                }
            }else{
                window.open(action,target);
            }
        },
        selectFile:function(callback, accept, multiple){
            var fileInput=document.createElement( "input" );
            fileInput.type="file";
            // "image/*, video/*, audio/*"
            if(accept)fileInput.accept = accept;
            if(multiple)fileInput.multiple = "multiple";

            fileInput.onchange=function(){
                xui.tryF(callback, [this, this.files[0], this.files], this);
            };
            if (!!window.ActiveXObject || "ActiveXObject" in window)  {
              var label=document.createElement( "div" );
              fileInput.appendChild(label);
              label.click();
              fileInput.removeChild(label);
            }else{
              fileInput.click();
            }
            fileInput=null;
        },
        busy:function(id,busyMsg,busyIcon,cursor,bgStyle){
            xui.Dom.setCover(busyMsg||true,id,busyIcon,cursor,bgStyle);
        },
        free:function(id){
           xui.Dom.setCover(false,id);
        },
        animate:function(css, endpoints, onStart, onEnd, duration, step, type, threadid, unit, restore,times){
            var node = document.createElement('div');
            xui.merge(css,{position:'absolute', left:this.HIDE_VALUE, zIndex:this.TOP_ZINDEX++});
            xui.Dom.setStyle(node, css);
            document.body.appendChild(node);
            return xui([node]).animate(endpoints, onStart, function(){
                xui.tryF(onEnd);
                if(node.parentNode)
                    node.parentNode.removeChild(node);
                node=null;
            }, duration, step, type, threadid, unit, restore, times);
        },
        //plugin event function to xui.Dom
        $enableEvents:function(name){
            if(!xui.isArr(name))name=[name];
            var self=this,f;
            xui.arr.each(name,function(o){
                f=function(fun, label, flag){
                    if(typeof fun  == 'function')
                        return this.$addEvent(o, fun, label, flag);
                    else if(fun===null)
                        return this.$removeEvent(o, label, flag);
                    var args = arguments[1] || {};
                    args.$xuiall = (arguments[0]===true);
                    return this.$fireEvent(o, args)
                };
                f.$event$=1;
                self.plugIn(o, f)
            });
        }
    },
    After:function(d){
        var self=this;
       //getter
        xui.each({ parent:['y',false], prev:['x',false], next:['x',true], first:['y',true], last:['y',1]},function(o,i){
            self.plugIn(i, function(index){
                return this.$iterator(o[0], o[1], true, index || 1)
            });
        });

        //readonly profile
        xui.arr.each(xui.toArr('offsetLeft,offsetTop,scrollWidth,scrollHeight'),function(o){
            self.plugIn(o,function(){
                var t=this.get(0),w=window,d=document;
                if(t==w||t==d){
                    if("scrollWidth"==o||"scrollHeight"==o){
                        var a=d.documentElement,b=d.body;
                        return Math.max(a[o], b[o]);
                    }else
                        t = xui.browser.contentBox ? d.documentElement : d.body;
                }
                return t[o];
            })
        });

        var p='padding',m='margin',b='border',c='inner',o='offset',r='outer',w='width',h='height',W='Width',H='Height',T='Top',L='Left',t='top',l='left',R='Right',B='Bottom';
        //dimesion
        xui.arr.each([['_'+p+'H',p+T,p+B],
            ['_'+p+'W',p+L,p+R],
            ['_'+b+'H',b+T+W,b+B+W],
            ['_'+b+'W',b+L+W,b+R+W],
            ['_'+m+'W',m+L,m+R],
            ['_'+m+'H',m+T,m+B]
        ],function(o){
            //use get Style dir
            var node,fun=xui.Dom.getStyle;
            self.plugIn(o[0],function(type){
                type=type||'both';
                node = this.get(0);
                return ((type=='both'||type=='left'||type=='top')?xui.CSS.$px(fun(node, o[1]),node):0) 
                     + ((type=='both'||type=='right'||type=='bottom')?xui.CSS.$px(fun(node, o[2]),node):0) || 0;
            })
        });
        /*
        get W/H for

        1:width
        2:innerWidth
        3:offsetWidth
        4:outerWidth

        content-box
        +--------------------------+
        |margin                    |
        | +----------------------+ |
        | |border                | |
        | | +------------------+ | |
        | | |padding           | | |
        | | | +--------------+ | | |
        | | | |   content    | | | |
        |-|-|-|--------------|-|-|-|
        | | | |<-css width ->| | | |
        | | |<-  innerWidth  ->| | |
        | |<--  offsetWidth   -->| |
        |<--    outerWidth      -->|

        border-box
        +--------------------------+
        |margin                    |
        | +----------------------+ |
        | |border                | |
        | | +------------------+ | |
        | | |padding           | | |
        | | | +--------------+ | | |
        | | | |   content    | | | |
        |-|-|-|--------------|-|-|-|
        | | |<-   css width  ->| | |
        | | |<-  innerWidth  ->| | |
        | |<--  offsetWidth   -->| |
        |<--    outerWidth      -->|
        */

        xui.arr.each([['_W',w, '_'+p+'W', '_'+b+'W', '_'+m+'W', c+W, o+W],
        ['_H',h, '_'+p+'H', '_'+b+'H', '_'+m+'H', c+H, o+H]],function(o){
            var _size=function(node,index,value,_in){
                var n,r,t,style=node.style,contentBox=xui.browser.contentBox,
                r1=/%$/,
                getStyle=xui.Dom.getStyle,
                f=xui.Dom._setUnitStyle,type=typeof value,t1;
                if(type=='undefined' || type=='boolean'){
                    if(value===true){
                        n=(getStyle(node,'display')=='none') || node.offsetHeight===0;
                        if(n){
                            var temp = xui.Dom.getEmptyDiv().html('*',false);
                            xui([node]).swap(temp);
                            var b,p,d;
                            b = style.visibility,p = style.position,d = style.display; p=p||'';b=b||'';d=d||'';
                            style.visibility = 'hidden'; style.position ='absolute';style.display = 'block';
                        }
                    }
                    t=xui([node]);
                    switch(index){
                        case 1:
                            r=getStyle(node,o[1]);
                            if((isNaN(parseFloat(r)) || r1.test(r))&&!_in)
                                r = _size(node,2,undefined,true) - (contentBox?t[o[2]]():0);
                            r=xui.CSS.$px(r,node)||0;
                            break;
                        case 2:
                            if(node===document||node===window){
                                r=xui(node)[o[1]]();
                            }else{
                                r=node[o[6]];
                                //get from css setting before css applied
                                if(!r){
                                    if(!_in)r=_size(node,1,undefined,true)+(contentBox?t[o[2]]():0);
                                }else r-=t[o[3]]();
                            }
                            break;
                        case 3:
                            if(node===document||node===window){
                                r=xui(node)[o[1]]();
                            }else{
                                r=node[o[6]];
                                //get from css setting before css applied
                                if(!r)r=_size(node,1,value,true)+(contentBox?t[o[2]]():0)+t[o[3]]();
                            }
                            break;
                        case 4:
                            r=_size(node,3,value);
                            r+=t[o[4]]();
                            break;
                    }
                    if(n){
                        style.display = d; style.position = p;style.visibility = b;
                        t.swap(temp);
                        temp.empty(false);
                    }
                    return parseFloat(r)||0;
                }else{
                    switch(index){
                        case 1:
                            if(f(node, o[1], value))
                                if(xui.Dom.$hasEventHandler(node,'onsize')){
                                    var args={};args[o[1]]=1;
                                    xui([node]).onSize(true, args);
                                }
                            break;
                        case 2:
                            _size(node, 1, value - (contentBox?xui([node])[o[2]]():0));
                            break;
                        case 3:
                            //back value for offsetHeight/offsetWidth slowly
                            _size(node, 1, value - (t=xui([node]))[o[3]]() - (contentBox?t[o[2]]():0));
                            break;
                        case 4:
                            _size(node, 1, value - (t=xui([node]))[o[4]]() - t[o[3]]() - (contentBox?t[o[2]]():0));
                            break;
                    }
                    //if(node._bp)
                    //    node['_'+o[6]]=null;
                }
            };
            self.plugIn(o[0], _size)
        });
        xui.arr.each([[c+W,'_W',2],[o+W,'_W',3],[r+W,'_W',4],
         [c+H,'_H',2],[o+H,'_H',3],[r+H,'_H',4]],function(o){
            self.plugIn(o[0],function(value){
                var type=typeof value;
                if(type=='undefined' || type=='boolean')
                    return this[o[1]](this.get(0), o[2], value);
                else
                    return this.each(function(v){
                        this[o[1]](v, o[2],value);
                    });
            })
        });
        xui.arr.each([[l+'By',l],[t+'By',t],[w+'By',w],[h+'By',h]],function(o){
            self.plugIn(o[0],function(offset,triggerEvent){
                if(offset===0)return this;
                var m,args,k=o[1];
                return this.each(function(node){
                    m=xui.use(node.$xid)[k]();
                    m=(parseFloat(m)||0)+offset;
                    if(k=='width'||k=='height')m=m>0?m:0;
                    node.style[k]=xui.CSS.$forceu(m,null,node);
                    if(triggerEvent){
                        args={};args[k]=1;
                        var f=xui.Dom.$hasEventHandler;
                        if((k=='left' || k=='top')&& f(node,'onmove'))
                            xui([node]).onMove(true, args);
                        if((k=='width' || k=='height')&& f(node,'onsize')){
                            xui([node]).onSize(true, args);
                        }
                    }
                },this)
            });
        });
        xui.arr.each(['scrollLeft','scrollTop'],function(o){
            self.plugIn(o,function(value){
                var a=document.documentElement,b=document.body,v;
                if(value !==undefined)
                    return this.each(function(v){
                        if(v===window || v===document){
                            if(a)a[o]=value;if(b)b[o]=value;
                        }else if(v)v[o]=value;
                    });
                else
                    return (v=this.get(0)) ? (v===window || v===document) ? (window["scrollTop"==o?"pageYOffset":"pageXOffset"] || (a[o]||b[o]||0))
                                                                                                            : v[o]
                                                        : 0;
            })
        });
        xui.arr.each('width,height,left,top'.split(','),function(o){
            self.plugIn(o,function(value){
                var self=this, node=self.get(0),b=xui.browser,type=typeof value,doc=document,t,style;
                if(!node || node.nodeType==3)return;
                if(type=='undefined'||type=='boolean'){
                    if((o=='width' && (t='Width'))||(o=='height' && (t='Height'))){
                        if(doc===node)return Math.max( doc.body['scroll'+t], doc.body['offset'+t], doc.documentElement['scroll'+t], doc.documentElement['offset'+t]);
                        if(window===node)return b.opr?Math.max(doc.body['client'+t],window['inner'+t]):b.kde?window['inner'+t]:(xui.browser.contentBox && doc.documentElement['client'+t]) ||doc.body['client'+t];
                    }
                    style=node.style;
                    // give shortcut
                    // we force to get px number of width/height 
                    if(o=='width')value=(xui.CSS.$isPx(style.width)&&parseFloat(style.width))||self._W(node,1,value);
                    else if(o=='height')value=(xui.CSS.$isPx(style.height)&&parseFloat(style.height))||self._H(node,1,value);
                    else
                        value = xui.Dom.getStyle(node, o, true);
                    return (value=='auto'||value==='')?value:(value||0);
                }else{
                    var f=xui.Dom._setUnitStyle,t,a,
                    av = xui.CSS.$addu(value);
                    return self.each(function(v){
                        if(v.nodeType!=1)return;
                            if(v.style[o]!==av){
                                if(o=='width')self._W(v,1,value);
                                else if(o=='height')self._H(v,1,value);
                                else{
                                    if(f(v, o, value))
                                        if((o=='top' || o=='left') && xui.Dom.$hasEventHandler(node,'onmove')){
                                            a={};a[o]=1;
                                            xui([v]).onMove(true, a);
                                        }
                                }
                            }
                    });
                }
            });
        });

        //xui.Dom event
        xui.arr.each(xui.Event._events,function(o){
            xui.arr.each(xui.Event._getEventName(o),function(o){
                self.$enableEvents(o);
            })
        });
    },
    Initialize:function(){
        var w=window,d=document;
        xui.browser.contentBox = xui(d.documentElement).contentBox();
        xui.set(xui.$cache.domPurgeData,'!window',{$xid:'!window',element:w});
        xui.set(xui.$cache.domPurgeData,'!document',{$xid:'!document',element:d});

        xui.win=xui(['!window'],false);
        xui.doc=xui(['!document'],false);
        xui.frame=xui.win;

        xui.busy=xui.Dom.busy;
        xui.free=xui.Dom.free;

        xui.$inlineBlock=xui.browser.gek
            ? xui.browser.ver<3
                ? ['-moz-inline-block', '-moz-inline-box','inline-block']
                : ['inline-block']
            : (xui.browser.ie&&xui.browser.ver<=6)
                ? ['inline-block', 'inline']
                : ['inline-block'];
        var fun=function(p,e,cache,keydown){
             var event=xui.Event,set,hash,rtnf,rst,remove={},
                ks=event.getKey(e);
            if(ks){
                if(ks[0].length==1)ks[0]=ks[0].toLowerCase();
                //if hot function return false, stop bubble
                if(arr = cache[ks.join(":")]){
                    xui.arr.each(arr,function(key,i){
                        set = arr[key];
                        if(set){
                            // remove hook for non-exist dom
                            if(set[3] && (typeof set[3]=='function'?false===(set[3])() : (!xui(set[3]).size()))){
                                // do nothing and detach it
                                delete arr[key];
                                remove[i]=1;
                                return;
                            }
                            rst = xui.tryF(set[0],set[1]||[arr,i,key],set[2]);
                            if(rst===false){
                                rtnf=1;
                                return false;
                            }else if(rst===true){
                                // detach it
                                delete arr[key];
                                remove[i]=1;
                            }
                        }
                    },null,true);
                    // remove
                    xui.filter(arr, function(key,i){
                        return !remove[i];
                    });
                    if(rtnf){
                        event.stopBubble(e);
                        return false;
                    }
                }
                if(xui.Module){
                    xui.arr.each(xui.Module._cache,function(m){
                       // by created order    
                       if(m._evsClsBuildIn && ('onHookKey' in m._evsClsBuildIn)){
                           // function or pseudocode
                           if(xui.isFun(f = m._evsClsBuildIn.onHookKey) || (xui.isArr(f) && f[0].type))
                               m.fireEvent('onHookKey', [m,ks, keydown, e]);
                       }
                       else if(m._evsPClsBuildIn && ('onHookKey' in m._evsPClsBuildIn)){
                           // function or pseudocode
                           if(xui.isFun(f = m._evsPClsBuildIn.onHookKey) || (xui.isArr(f) && f[0].type))
                               m.fireEvent('onHookKey', [m,ks, keydown, e]);
                       }
                    });
                }
            }
            return true;
        };
        //hot keys
        xui.doc.onKeydown(function(p,e){xui.Event.$keyboard=xui.Event.getKey(e); fun(p,e,xui.$cache.hookKey,true)},"document")
        .onKeyup(function(p,e){delete xui.Event.$keyboard; fun(p,e,xui.$cache.hookKeyUp,false)},"document");

        //hook link(<a ...>xxx</a>) click action
        //if(xui.browser.ie || xui.browser.kde)
        xui.doc.onClick(function(p,e,src){
            var o=xui.Event.getSrc(e),
                i=0,b,href;
            do{
                if(o.nodeName == 'A'){
                    b=true;
                    break;
                }
                if(++i>8)break;
            }while(o=o.parentNode)
            if(b){
                href=xui.str.trim(o.href||"").toLowerCase();
                if(xui.History){
                    var s = location.href.split('#')[0];
                    if(!xui.Event.getKey(e).shiftKey && xui.Event.getBtn(e)=='left' && (href.indexOf(s+'#')==0||href.indexOf('#')==0)){
                        xui.History.setFI(o.href.replace(s,''));
                    }
                }
                //**** In IE, click a fake(javascript: or #) href(onclick not return false) will break the current script downloading(SAajx)
                //**** You have to return false here
                if(xui.browser.ie && (href.indexOf('javascript:')==0 || href.indexOf('#')!==-1))return false;
            }
        },'hookA',0);

        var _ieselectstart=function(n,v){
            n=window.event.srcElement;
            while(n&&n.nodeName&&n.nodeName!="BODY"&&n.nodeName!="HTML"){
                if(v=xui.getNodeData(n,"_onxuisel"))
                    return v!='false';
                // check self only
                if(n.nodeName=="INPUT"||n.nodeName=="TEXTAREA")
                    break;
                n=n.parentNode;
            }
            return true;
        };
        if(xui.browser.ie && xui.browser.ver<10 && d.body)
            xui.Event._addEventListener(d.body,"selectstart", _ieselectstart);

        //free memory
        xui.win.afterUnload(xui._destroy = function(){
            var t, 
            lowie=xui.browser.ie && xui.browser.ver<=8,
            e=xui.Event,
            _cw=function(w,k){
                w[k]=undefined;
                if(!lowie)
                    delete w[k];
            };
            
            if(xui.History._checker)e._removeEventListener(w, "hashchange", xui.History._checker);
            e._removeEventListener(d.body, "selectstart", _ieselectstart);
            e._removeEventListener(w, "resize", e.$eventhandler);

            e._removeEventListener(w, "mousewheel", e.$eventhandler3);
            e._removeEventListener(d, "mousewheel", e.$eventhandler3);
            // firfox only
            e._removeEventListener(w, "DOMMouseScroll", e.$eventhandler3);
            // for simulation mouse event in touable device
            if(xui.browser.isTouch){
                e._removeEventListener(d, 
                    (xui.browser.ie&&w.PointerEvent)?"pointerdown":
                    (xui.browser.ie&&w.MSPointerEvent)?"MSPointerDown":
                    "touchstart", e._simulateMousedown);
                e._removeEventListener(d, 
                    (xui.browser.ie&&xui.browser.ver>=11)?"pointerup":
                    (xui.browser.ie&&xui.browser.ver>=10)?"MSPointerUp":
                    "touchend", e._simulateMouseup);
            }

            // xui.win.afterUnload ...
            for(var i in (t=xui.$cache.domPurgeData))
                if(t[i].eHandlers)
                    xui(i).$clearEvent();

            // destroy all widgets and moudles
            // xui('body').empty(true,true);
            for(var i in (t=xui._pool)){
                t[i] && t[i].destroy && t[i].destroy(1,1);
                t[i] && t[i].Instace && t[i].Instace.destroy && t[i].Instace.destroy(1,1);
            }

            // root module ref
            _cw(w,xui.ini.rootModuleName);
            if(w.Raphael && w.Raphael._in_xui){
                _cw(w,'Raphael');
            }

            xui.SC.__gc();
            xui.Thread.__gc();
            xui.Class.__gc();
            if(/xui\.Class\.apply/.test(w.Class)) _cw(w,'Class');
            if((t=xui.Namespace._all))for(var i in t)  _cw(w, t[i]);
            xui.breakO(xui.$cache,2);
            xui.breakO([xui.Class, xui],3);
            _cw(w,'xui_ini');
            _cw(w,'xui');
            
            w=d=null;
        },"window",-1);

    }
});