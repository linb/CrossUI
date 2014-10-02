Class('xui.DomProfile', 'xui.absProfile', {
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
Class('xui.Dom','xui.absBox',{
    Instance:{
        get:function(index){
            var purge=xui.$cache.domPurgeData,t=this._nodes,s;
            if(_.isNumb(index))
                return (s=t[index]) && (s=purge[s]) && s.element;
            else{
                var a=[],l=t.length;
                for(var i=0;i<l;i++)
                    a[a.length] = (s=purge[t[i]]) && s.element;
                return a;
            }
        },
        each:function(fun){
            var ns=this,purge=xui.$cache.domPurgeData,n;
            for(var i=0,j=ns._nodes,l=j.length;i<l;i++)
                if((n=purge[j[i]]) && (n=n.element))
                    if(false===fun.call(ns,n,i))
                        break;
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
                return this.get(0).id;
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
                    if(_.isArr(r))
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
                return _.toArr(this.childNodes)
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
                        inn=_.isBool(inn)?inn:true;
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
                return _.toArr(this[f](tag));
            }),f5=me.f5||(me.f5=function(tag, attr){
                var all = this[f](tag), arr=[];
                if(attr(this))
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(attr(o))
                        arr[arr.length]=o;
                return arr;
            });
            return this.$sum(property?typeof property=='function'?f5:expr?_.isReg(expr)?f1:f2:f3:f4, [tagName, property, expr]);
        },

        /*
        dom add implementation
        for addPrev prepend addNext append
        */
        $add:function(fun,target,reversed){
            if(_.isHash(target) || _.isStr(target))
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
            if(_.isHash(target) || _.isStr(target))
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

            if(_.isHash(target) || _.isStr(target))
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
        remove:function(triggerGC){
            var c=xui.$getGhostDiv();
            if(triggerGC===false)
                this.each(function(o,i){
                    if(o.raphael&&o.remove)o.remove();
                    else if(o.parentNode)o.parentNode.removeChild(o);
                });
            else{
                this.each(function(o){
                    c.appendChild(o);
                });
                xui.$purgeChildren(c);
                c.innerHTML='';
                c=null;
            }
            return this;
        },
        //set innerHTML empty
        //flag = false: no gc
        empty:function(triggerGC){
            return this.each(function(o){
                xui([o]).html('',triggerGC);
            });
        },

        //flag = false: no gc
        html:function(content,triggerGC,loadScripts){
            var s='',t,o=this.get(0);triggerGC=triggerGC!==false;
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
                         if(triggerGC)
                            xui.$purgeChildren(o);

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
                            _.arr.each(scripts,function(s){
                                if(s[0]==1)
                                    xui.include(null,s[1]);
                                else
                                    _.exec(s[1]);
                            });
                        }

                        //if(triggerGC)
                        //    xui.UI.$addEventsHanlder(o);

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
            _.tryF(onStart);
            xui.Ajax(options.url, options.query, function(rsp){
                var n=xui.create("div");
                n.html(rsp,false,true);
                ns.append(n.children());
                _.tryF(onEnd);
            }, function(err){
                ns.append("<div>"+err+"</div>");
                _.tryF(onEnd);
            }, null, options.options).start();
        },
        loadIframe:function(options, domId){
            if(typeof options=='string')options={url:options};
            var id=domId||("aiframe_"+_()),t;
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
                var n=self.replace(_.str.toDom(content),false);
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
                  var i,a=o.childNodes,l=a.length,content='',me=arguments.callee;
                  for(i=0;i<l;i++)
                    if(a[i].nodeType!= 8)
                      content += (a[i].nodeType!=1) ? a[i].nodeValue : me(a[i]);
                  return content;
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
                return r;
            }
        },
        $touchscroll:function(type){
            if(xui.browser.isTouch && (xui.browser.isAndroid||xui.browser.isBB)){
                var hash={"x":1,"y":1,"xy":1},opx=0,opy=0,ox=null,oy=null,nodes=this._nodes;
                if(!hash[type])type=null;
                xui(nodes).onTouchstart(hash[type]?function(p,e,src){
                    if(xui.DragDrop._profile.isWorking) return true;
                    var s=e.touches[0],t=xui(src).get(0);
                    if(t){
                        if(type=='xy'||type=='x')
                            opx=s.pageX;
                        if(type=='xy'||type=='y')
                            opy=s.pageY;
                    }
                    return true;
                }:null);
                xui(nodes).onTouchmove(hash[type]?function(p,e,src){
                    if(xui.DragDrop._profile.isWorking) return true;
                    var s=e.touches[0],t=xui(src).get(0),x1,y1,first;
                    if(t){
                        x1=t.scrollLeft;y1=t.scrollTop;
                        if(type=='xy'||type=='x'){
                            // for multi-layers scroll
                            if(ox===null){
                                first=1;
                                ox=t.scrollLeft+s.pageX+(opx==s.pageX?0:opx>s.pageX?1:-1)*10;
                            }
                            t.scrollLeft=ox-s.pageX;
                        }
                        if(type=='xy'||type=='y'){
                            if(oy===null){
                                first=1;
                                oy=t.scrollTop+s.pageY+(opy==s.pageY?0:opy>s.pageY?1:-1)*10;
                            }
                            t.scrollTop=oy-s.pageY;
                        }
                        return (!first)&&x1==t.scrollLeft&&y1==t.scrollTop;
                    }
                }:null);
                xui(nodes).onTouchend(hash[type]?function(p,e,src){
                    if(xui.DragDrop._profile.isWorking) return true;
                    ox=oy=null;
                }:null);
            }
            return this;
        },
        isScrollBarShowed:function(type){
            type=type=='x'?'scrollLeft':'scrollTop';
            if(this[type]()!==0)return true;
            this[type](1);
            if(this[type]()===0)return false;
            this[type](0);
            return true;
        },
        scrollIntoView:function(){
            if(this.get(0))this.get(0).scrollIntoView();
            return this;
        },
        /*
        name format: 'xxxYxx', not 'xxx-yyy'
        left/top/width/height like, must specify 'px'
        Does't fire onResize onMove event
        */
        css:function(name, value){
            if(typeof name=='object' || value!==undefined){
                this.each(function(o){
                    xui.Dom.setStyle(o,name,value)
                });
                
                if(xui.browser.isTouch && (xui.browser.isAndroid||xui.browser.isBB)){
                    if(name=='overflow'||name=='overflow-x'||name=='overflow-y'){
                        if(value=='auto'||value=='scroll')
                            this.$touchscroll(name=='overflow'?'xy':name=='overflow-x'?'x':'y');
                        else
                            this.$touchscroll(null);
                    }
                }
                return this;
            }else{
                return xui.Dom.getStyle(this.get(0), name);
            };
        },
        /*
        *IE/opera \r\n will take 2 chars
        *in IE: '/r/n'.lenght is 2, but range.moveEnd/moveStart will take '/r/n' as 1.
        */
        caret:function(begin,end){
            var input =this.get(0), tn=input.tagName.toLowerCase(), type=typeof begin,ie=xui.browser.ie, pos;
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
                }else
                    input.setSelectionRange(begin, end);
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
                if(ie){
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
        show:function(left,top){
            var style,t,auto='auto',v=xui.Dom.HIDE_VALUE,vv;
            return this.each(function(o){
                if(o.nodeType != 1)return;
                style=o.style;
                vv=xui.getNodeData(o);
                if( t = (top || (style.top==v && (vv._top || auto))))style.top = t;
                if( t = (left || (style.left==v && (vv._left || auto))))style.left = t;
                if(t=vv._position)if(style.position!=t)style.position=t;
                vv._xuihide=0;

                if(style.visibility!='visible')style.visibility='visible';
                //ie6 bug
              /*  if(xui.browser.ie6){
                    t=style.wordWrap=='normal';
                    _.asyRun(function(){
                        style.wordWrap=t?'break-word':'normal'
                    })
                }*/
            });
        },
        hide:function(){
            var style,t,vv;
            return this.each(function(o){
                if(o.nodeType != 1)return;
                style=o.style;t=xui([o]);
                vv=xui.getNodeData(o);
                if(vv._xuihide!==1){
                    vv._position = style.position;
                    vv._top = style.top;
                    vv._left = style.left;
                    vv._xuihide=1;
                }
                if(style.position!='absolute')style.position = 'absolute';
                style.top = style.left = xui.Dom.HIDE_VALUE;
            });
        },
        cssRegion:function(region,triggerEvent) {
            var self=this;
            if(typeof region=='object'){
                var i,t,m,  node=self.get(0), dom=xui.Dom, f=dom._setPxStyle,m={};
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
            var self=this, node=self.get(0),r,dom=xui.Dom,f=dom._setPxStyle,b1,b2;
           if(size){
                var t;
                b1 = size.width!==null?f(node,'width',size.width):false;
                b2 = size.height!==null?f(node,'height',size.height):false;
                if(triggerEvent && (b1||b2) && dom.$hasEventHandler(node,'onsize'))self.onSize(true, {width:b1,height:b2});
                r=self;
            }else
                r={ width :self._W(node,1)||0,  height :self._H(node,1)};
            return r;
        },
        //for quick move
        cssPos:function(pos, triggerEvent){
            var node=this.get(0),dom=xui.Dom,f=dom._setPxStyle,b1,b2,r;
            if(pos){
                var t;
                b1 = pos.left!=null?f(node,'left',pos.left):false;
                b2 = pos.top!==null?f(node,'top',pos.top):false;
                if(triggerEvent && (b1||b2) && dom.$hasEventHandler(node,'onmove'))this.onMove(true, {left:b1,top:b2});
                r=this;
            }else{
                f=dom.getStyle;
                r={left :parseInt(f(node, 'left'),10)||0,  top :parseInt(f(node, 'top'),10)||0};
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
        offset:function (pos,boundary){
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
                pos.left += parseInt(l,10)||0;
                pos.top += parseInt(t,10)||0;
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
                    t = node.getBoundingClientRect();
                    pos = {left :t.left, top :t.top};
                    if(boundary.nodeType==1 && boundary!==document.body)
                        add(pos, -(t=boundary.getBoundingClientRect()).left+boundary.scrollLeft, -t.top+boundary.scrollTop);
                    else
                        add(pos, (_.isNumb(dd.scrollLeft)?dd.scrollLeft:db.scrollLeft)-dd.clientLeft, (_.isNumb(dd.scrollTop)?dd.scrollTop:db.scrollTop)-dd.clientTop);
                }else{
                    pos = {left :0, top :0};
                    add(pos, node.offsetLeft, node.offsetTop );
                    //get offset, stop by boundary or boundary.offsetParent
                    while(op && op!=boundary && op!=boundary.offsetParent){
                        add(pos, op.offsetLeft, op.offsetTop);
                        if(browser.kde || (browser.gek && !TTAG[op.tagName]))
                            border(op, pos);
                        if ( !fixed && getStyle(op,"position")== "fixed")
                            fixed = true;
                        if(op.tagName!='BODY')
                            keepNode=op.tagName=='BODY'?keepNode:op;
                        op = op.offsetParent;
                    }

                    //get scroll offset, stop by boundary
                    while (parent && parent.tagName && parent!=boundary && !HTAG[parent.tagName]){
                        if(!_d.test(getStyle(parent, "display")) )
                            add(pos, -parent.scrollLeft, -parent.scrollTop );
                        if(browser.gek && getStyle(parent,"overflow")!= "visible" )
                            border(parent,pos);
                        parent = parent.parentNode;
                    }
                    if((browser.gek && getStyle(keepNode,"position")!="absolute"))
                        add(pos, -db.offsetLeft, -db.offsetTop);
                    if(fixed)
                        add(pos, _.isNumb(dd.scrollLeft)?dd.scrollLeft: db.scrollLeft, _.isNumb(dd.scrollTop)?dd.scrollTop:db.scrollTop);
                }
                r=pos;
            }
            return r;
        },
//class and src
        hasClass:function(name){
            var arr = xui.Dom._getClass(this.get(0)).split(/\s+/);
            return _.arr.indexOf(arr,name)!=-1;
        },
        addClass:function(name){
            var arr, t, me=arguments.callee,reg=(me.reg||(me.reg=/\s+/));
            return this.each(function(o){
                arr = (t=xui.Dom._getClass(o)).split(reg);
                if(_.arr.indexOf(arr,name)==-1)
                    xui.Dom._setClass(o, t + " " +name);
            });
        },
        removeClass:function(name){
            var arr, i,l,a, t, bs=typeof name=='string', me=arguments.callee,reg=(me.reg||(me.reg=/\s+/));
            return this.each(function(o){
                arr = xui.Dom._getClass(o).split(reg);
                l=arr.length;
                a=[];
                for(i=0;t=arr[i];i++)
                    if(bs?(t!=name):(!name.test(String(t))))
                        a[a.length]=t;
                if(l!=a.length)xui.Dom._setClass(o,a.join(' '));
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
            return (false===isAdd)? self : self.replaceClass(r2, '$1 $1' + tag);
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
                    o[type]=handler;
                    xui.setNodeData(o, ['eHandlers', type], handler);

                    if(xui.browser.isTouch && type=='onmousedown'){
                        xui.setNodeData(o, ['eHandlers', 'onxuitouchdown'], handler);
                        if(o.addEventListener){
                            o.addEventListener("xuitouchdown", handler,false);
                        }else if(o.attachEvent){
                            o.attachEvent("xuitouchdown", handler);
                        }
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
                type;
            return this.each(function(o){
                //remove from dom node
                if(type=event._eventHandler[name]){
                    o[type]=null;
                    if(xui.browser.isTouch && type=='onmousedown'){
                        if(o.removeEventListener){
                            o.removeEventListener("xuitouchdown", handler,false);
                        }else if(o.detachEvent){
                            o.detachEvent("xuitouchdown", handler);
                        }
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
                arv=_.arr.removeValue,
                ari=_.arr.insertAny,
                id,c,t,m;

            if(!index && index!==0)index=-1;

            if(typeof label=='string')
                label="$"+label;
            else label=undefined;

            self.$addEventHandler(name).each(function(o){
                if(o.nodeType==3)return;

                if(!(id=event.getId(o)))
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
                    _.arr.each(event._getEventName(type),function(o){
                        delete t[o];
                    });
                else{
                    if(typeof label == 'string'){
                        label='$'+label;
                        if(k=t[name]){
                            if(_.arr.indexOf(k,label)!=-1)
                                _.arr.removeValue(k,label);
                            delete k[label];
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
                return _.get(xui.$cache.profileMap,[id,'events',name,'$' + label]);
            else{
                var r=[],arr = _.get(xui.$cache.profileMap,[id,'events',name]);
                _.arr.each(arr,function(o,i){
                    r[r.length]={o:arr[o]};
                });
                return r;
            }
        },
        $clearEvent:function(){
            return this.each(function(o,i){
                if(!(i=xui.Event.getId(o)))return;
                if(!(i=xui.$cache.profileMap[i]))return;
                _.breakO(i.events,2);
                delete i.events;

                _.arr.each(xui.Event._events,function(s){
                   if(o["on"+s])o["on"+s]=null;
                });
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
                      hash=_.copy(args);
                      _.merge(hash,{
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
                (((t=map[node.tagName.toLowerCase()]) && !(parseInt(node.tabIndex,10)<=-1)) || (!t && parseInt(node.tabIndex,10)>=(xui.browser.ie?1:0))) &&
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
        setSelectable:function(value){
            var me=arguments.callee,cls;
            this.removeClass("xui-ui-selectable").removeClass("xui-ui-unselectable");
            this.addClass(value?"xui-ui-selectable":"xui-ui-unselectable");
            return this.each(function(o){
                if(xui.browser.ie && xui.browser.ver<10)
                    xui.setNodeData(o,"_onxuisel",value?"true":"false");
            })
        },
        setInlineBlock:function(){
            var ns=this;
            if(xui.browser.gek){
                if(xui.browser.ver<3)
                    ns.css('display','-moz-inline-block').css('display','-moz-inline-box').css('display','inline-block');
                else
                    ns.css('display','inline-block');
            }else if(xui.browser.ie6)
                ns.css('display','inline-block').css({display:'inline',zoom:'1'});
            else
                ns.css('display','inline-block');
            return ns;
        },
        topZindex:function(flag){
            //set the minimum to 1000
            var i=1000, j=0, k, node = this.get(0), p = node.offsetParent, t, o;
            if(xui.browser.ie && (!p||(p.tagName+"").toUpperCase()=="HTML")){
                p=xui("body").get(0);
            }
            if(node.nodeType !=1 || !p)return 1;

            t=p.childNodes;
            for(k=0;o=t[k];k++){
                if(o==node || o.nodeType !=1 || !o.$xid || o.style.display=='none' || o.style.visibility=='hidden' ||  xui.getNodeData(o,'zIndexIgnore') )continue;
                j = parseInt(o.style && o.style.zIndex,10) || 0 ;
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
        nextFocus:function(downwards, includeChild, setFocus){
            downwards=_.isBool(downwards)?downwards:true;
            var self=this.get(0),node = this.$iterator('',downwards,includeChild,function(node){return node!==self && xui([node]).$canFocus()});
            if(!node.isEmpty() && setFocus!==false)node.focus();
            self=null;
            return node;
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
        animate: function(args, onStart, onEnd, time, step, type, threadid, unit){
            var me=arguments.callee,
            hash = me.lib ||  (me.lib = {
                linear:function(x,s){return x/s},
                expoIn:function(x,s){return (x/s==0)?0:Math.pow(2,10*(x/s-1))},
                expoOut:function(x,s){return (x/s==1)?1:-Math.pow(2,-10*x/s)+1},
                expoInOut:function(x,s){
                    if(x==0)return 0;
                    else if(x==s)return 1;
                    else if((x/=s/2) < 1) return 1/2 * Math.pow(2, 10 * (x - 1));
                    return 1/2 * (-Math.pow(2, -10 * --x) + 2);
                },
                sineIn:function(x,s){return -1*Math.cos(x/s*(Math.PI/2))+1},
                sineOut:function(x,s){return Math.sin(x/s*(Math.PI/2))},
                sineInOut:function(x,s){return -1/2*(Math.cos(Math.PI*x/s)-1)},
                backIn:function(x,s){
                    var n=1.70158;
                    return (x/=s)*x*((n+1)*x - n);
                },
                backOut:function(x,s){
                    var n=1.70158;
                    return ((x=x/s-1)*x*((n+1)*x + n) + 1);
                },
                backInOut:function(x,s){
                    var n=1.70158;
                    if ((x/=s/2) < 1) return 1/2*(x*x*(((n*=(1.525))+1)*x - n));
                    return 1/2*((x-=2)*x*(((n*=(1.525))+1)*x + n) + 2);
                },
                bounceOut:function(x,s){
                    if((x/=s) < (1/2.75))return 7.5625*x*x;
                    else if(x < (2/2.75))return 7.5625*(x-=(1.5/2.75))*x + .75;
                    else if(x < (2.5/2.75))return 7.5625*(x-=(2.25/2.75))*x + .9375;
                    else return 7.5625*(x-=(2.625/2.75))*x + .984375;
                }
            }),
            color = me.color || (me.color = function(type, args, step, j){
                var f,fun,value = 0 + (100-0)*hash[type](j,step), from = args[0], to = args[1];

                if(typeof from !='string' || typeof to != 'string')return '#fff';
                if(value<0)
                    return from;
                else if(value>100)
                    return to;

                f=function(str){
                    return (str.charAt(0)!='#')?('#'+str):str;
                };
                from=f(from);to=f(to);

                f=function(str, i, j){
                    return parseInt(str.slice(i,j),16)||0;
                };
                fun=function(o){
                    return {red:f(o,1,3),green:f(o,3,5),blue:f(o,5,7)}
                };
                from = fun(from);to = fun(to);

                f=function(from, to, value,c){
                    var r= from[c]+Math.round((value/100)*(to[c]-from[c]));
                    return (r < 16 ? '0' : '') + r.toString(16)
                };
                return '#' + f(from,to, value, 'red') + f(from,to, value, 'green') + f(from,to, value, 'blue');
            });
            
            // Estimate time by steps
            if((step||0)>0)
                time=step*16;
            else
                time = time||200;

            type = hash[type]!==undefined?type:'expoIn';

            var startTime,self=this, funs=[function(threadid){
                var off = _() - startTime;
                // the last time
                if(off >= time)off=time;
                _.each(args,function(o,i){
                    if(typeof o == 'function') o(hash[type](off,time));
                    else{
                        var value = String( _.str.endWith(i.toLowerCase(),'color') ? color(type, o, time, off) : (o[0] + (o[1]-o[0])*hash[type](off,time)));
                        (self[i]) ? (self[i](value+(unit||''))) :(self.css(i, value+(unit||'')));
                    }
                });
                if(off==time){
                    xui.Thread(threadid).abort();
                    return false;
                }
            }];
            return xui.Thread(threadid||_.id(), funs, 0, null, function(){
                startTime=_();
                _.tryF(onStart,arguments,this);
            }, onEnd ,true);
        },
        /*
        pos: {left:,top:} or dom element
        parent:parent node
        type:1,2,3,4
        */
        popToTop : function(pos, type, parent){
            var region, target=this, t;

            parent=xui(parent);
            if(parent.isEmpty())parent=xui('body');

            //prepare
            target.css({position:'absolute',left:xui.Dom.HIDE_VALUE, top:xui.Dom.HIDE_VALUE,display:'block', zIndex:xui.Dom.TOP_ZINDEX++});

            if(pos['xui.Dom'] || pos.nodeType==1 || typeof pos=='string'){
                if(typeof(type)!="function"){
                    type=(type||12)+'';
                }
                var node=xui(pos),
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
            pos={left :0, top :0};

            //window edge
            var t=(parent.get(0)===document.body || parent.get(0)===document || parent.get(0)===window)?xui.win:parent,
                box = {};

            //ensure show target on the top of the other elements with the same zindex
            //parent.get(0).appendChild(target.get(0));
            target.cssPos(pos).css({visibility:'hidden',display:'block'});
            parent.append(target);
            box.left=t.scrollLeft();
            box.top=t.scrollTop();
            box.width =t.width()+box.left;
            box.height =t.height()+box.top;
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
                pos=type(region, box, target, t);
            }else{
                //target size
                var w = target.offsetWidth(), h = target.offsetHeight(),
                    adjust=function(type){
                        var hi,wi;
                        switch(type){
                            case '1':
                                hi=false;wi=true;
                            break;
                            case '2':
                                hi=true;wi=false;
                            break;
                            case '3':
                                hi=wi=false;
                            break;
                            case '4':
                                hi=wi=true;
                            break;
                        }
            
                        if(hi){
                            if(region.top + h < box.height)
                                pos.top=region.top;
                            else
                                pos.top=region.top+region.height-h;
                        }else{
                            if(region.top + region.height + h < box.height)
                                pos.top=region.top + region.height;
                            else
                                pos.top=region.top - h;
                        }
                        if(wi){
                            if(region.left + w < box.width)
                                pos.left=region.left;
                            else
                                pos.left=region.left+region.width-w;
                        }else{
                            if(region.left + region.width + w < box.width)
                                pos.left=region.left + region.width;
                            else
                                pos.left=region.left - w;
                        }
                    };

                if(type=='12'){
                    adjust('1');
                    if(pos.top + h>  box.height || pos.top < box.top)adjust('2');
                }else{
                    adjust(type);
                }
                //over right
                if(pos.left + w>  box.width)pos.left = box.width - w;
                //over left
                if(pos.left < box.left)pos.left = box.left;
                //over bottom
                if(pos.top + h>  box.height)pos.top = box.height - h;
                //over top
                if(pos.top < box.top)pos.top = box.top;
            }
            //show
            target.cssPos(pos).css({visibility:'visible'});

            return this;
        },
        setHoverPop : function(node, type, beforePop,beforeHide, parent){
            var c=this.get(0),sor=xui(c);
            if(node["xui.UI"]){
                node=node.getRoot();
            }else if(node['xui.UIProfile']||node['xui.Template']){
               node=node.boxing(); 
            }else if(typeof(node)=="string" && node.chartAt(0)=="!"){
                node=xui(node);
            }
            if(!_.isDefined(type))type='12';
            var aysid=c.xid()+":"+node.xid();
            sor.onMouseover(type===null?null:function(prf, e, src){
                 _.resetRun(aysid,null);
                 if(!beforePop || false!==beforePop(prf, node, e, src))
                    node.popToTop(src, type);
            },aysid).onMouseout(type===null?null:function(profile, e, src){
                    _.resetRun(aysid,function(){
                        if(!beforeHide || false!==beforeHide(profile, node,e, src, 'host'))
                            node.hide();
                    });
            },aysid);

            node.onMouseover(type===null?null:function(){
                 _.resetRun(aysid,null);
            },aysid).onMouseout(type===null?null:function(){
                    _.resetRun(aysid,function(){
                        if(!beforeHide || false!==beforeHide(profile, node,e, src, 'pop'))
                            node.hide();
                    });
            },aysid);
            return this;
        },
        //for remove obj when blur
        setBlurTrigger : function(id, trigger/*[false] for anti*/, group /*keep the original refrence*/, 
                                  /*next params are inner*/ checkChild, triggerNext){
            var ns=this,
                doc=document,
                sid='$blur_triggers$',
                fun=xui.Dom._blurTrigger||(xui.Dom._blurTrigger=function(p,e){
                    var p=xui.Event.getPos(e),
                        arr=arguments.callee.arr,
                        srcN=xui.Event.getSrc(e),
                        a=_.copy(arr),
                        b, pos, w, h, v;
                    //filter first
                    _.arr.each(a,function(i){
                        b=true;
                        if(!(v=arr[i].target))b=false;
                        else
                            v.each(function(o){
                                if(!xui.Dom.byId(o.id))
                                    return b=false;
                            });
                        if(!b){
                            _.arr.removeValue(arr,i);
                            delete arr[i];
                        };
                    });
                    a=_.copy(arr);
                    _.arr.each(a,function(i){
                        v=arr[i];
                        b=true;
                        var isChild=function(){
                            var nds=v.target.get();
                            while (srcN && srcN.tagName && srcN.tagName!="BODY" && srcN.tagName!="HTML"){
                                if(_.arr.indexOf(nds,srcN)!=-1)
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
                        if(!b && !_.isFun(v.trigger))
                            return false;

                        if(b){
                            _.tryF(v.trigger,[p,e],v.target);
                            _.arr.removeValue(arr,i);
                            delete arr[i];
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
                _.arr.removeValue(arr,id);
                delete arr[id];
            }
            // add trigger
            if(trigger){
                if(group){
                    //keep the original refrence
                    if(group['xui.Dom'])
                        target=group;
                    else if(_.isArr(group)){
                        target=xui();
                        target._nodes=group;
                    }
                }else{
                    target=ns;
                }

                target.each(function(o){if(!o.id)o.id=xui.Dom._pickDomId()});
                
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
            _.asyRun(function(){ns.css('overflow','auto')});
            return ns;
        },
        //IE not trigger dimension change, when change height only in overflow=visible.
        ieRemedy:function(){
            if(xui.browser.ie){
                var a1=this.get(),a2=[],l=a1.length;
                _.asyRun(function(){
                    for(var i=0;i<l;i++){
                        if((a2[i]=a1[i].style.WordWrap)=='break-word')
                            a1[i].style.WordWrap='normal';
                        else
                            a1[i].style.WordWrap='break-word';
                    }
                });
                _.asyRun(function(){
                    for(var i=0;i<l;i++)
                        a1[i].style.WordWrap=a2[i];
                    a1.length=a2.length=0;
                });
            }
            return this;
        },
        //for ie6
        fixPng:function(type){
            if(xui.browser.ie6){
                type=type||"crop";
                return this.each(function(n){
                    if(n.tagName=='IMG' && /\.png$/i.test(n.src)){
                        n.style.height = n.height;
                        n.style.width = n.width;
                        n.style.filter = (n.style.filter||"")+"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src=" + n.src + ", sizingMethod="+type+")";
                        if('msfilter' in n.style)n.style.msfilter = n.style.filter;
                        n.src = xui.ini.img_bg;
                    }
                    var bgimg = n.currentStyle.backgroundImage || n.style.backgroundImage,
                        bgmatch = bgimg.match(/^url[("']+(.*\.png[^\)"']*)[\)"']+[^\)]*$/i);
                    if(bgmatch){
                        n.style.backgroundImage = 'url(' + xui.ini.img_bg + ')';
                        n.style.filter = (n.style.filter||"")+"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src=" + bgmatch[1] + ", sizingMethod="+type+")";
                        if('msfilter' in n.style)n.style.msfilter = n.style.filter;
                    }
                });
            }
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

        _boxArr:_.toArr('width,height,left,top,right,bottom'),
        _cursor:{},

        _pickDomId:function(){
            var id;
            do{id='xui_'+_.id()}while(document.getElementById(id))
            return id;
        },
        _map:{
            'html':1,
            'head':1,
            'body':1
        },
        _getTag:function(n){ return n ? n.$xid ? n.$xid : n.nodeType==1 ? xui.$registerNode(n).$xid : 0 : 0},
        _ensureValues:function(obj){
            var t,i,map=this._map,a=[],
            //can't be obj, or opera will crash
            arr =  obj===window
                    ? ['!window']
                    : obj===document
                    ? ['!document']
                    : _.isArr(obj)
                    ? obj
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
        _scrollBarSize:0,
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
        getScrollBarSize: function(force){
            var ns=this;
            if(force||!ns._scrollBarSize){
                var div;
                xui('body').append(div=xui.create('<div style="width:50px;height:50px;visibility:hidden;position:absolute;margin:0;padding:0;left:-10000px;overflow:scroll;"></div>'));
                ns._scrollBarSize=div.get(0).offsetWidth-div.get(0).clientWidth;
                div.remove();
            }
            return ns._scrollBarSize;
        },
        getStyle:function(node, name){
            if(!node || node.nodeType!=1)return '';
            var ns=xui.Dom,
                css3prop=xui.Dom._css3prop;

            var value,b;
            if(name=='opacity' && (!ns.css3Support("opacity")) && xui.browser.ie)
                b = name = 'filter';

            value= node.style[name];
            if(!value){

                var me = arguments.callee,t,
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
                if(_.arr.indexOf(css3prop,n1)!=-1){
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
                :((node.style && (node.style[name]||(name3 && node.style[name3])))||'');
/*
                if(xui.browser.opr){
                    var map2 = me.map2 || (me.map2={left:1,top:1,right:1,bottom:1});
                    if(map2[name] && (xui.Dom.getStyle(node,'position')=='static'))
                        value = 'auto';
                }
*/
            }
            return b?value?(parseFloat(value.match(/alpha\(opacity=(.*)\)/)[1] )||0)/100:1:(value||'');
        },
        $transformIE:function(node, value) {
            var r,angle, scaleX, scaleY, skewX, skewY, transX,transY, toD=function(d){
                return d*(Math.PI/180);
            };
            if(!value){
                node.style.filter = (node.style.filter||"").replace(/progid\:DXImageTransform\.Microsoft\.Matrix\([^)]+\)/ig,"");
                if('msfilter' in node.style)node.style.msfilter = node.style.filter;
                node.style.marginTop=node.style.marginLeft="";
            }else{
                r=value.match(/(rotate)\(\s*([\d.-]+)deg\s*\)/);
                if(r&&r.length==3){
                    angle=r[2];
                }
                r=value.match(/(scale)\(\s*([\d.-]+)\s*,\s*([\d.-]+)\)/);
                if(r&&r.length==4){
                    scaleX=r[2];
                    scaleY=r[3];
                }
                r=value.match(/(skew)\(\s*([\d.-]+)deg\s*,\s*([\d.-]+)deg\s*\)/);
                if(r&&r.length==4){
                    skewX=r[2];
                    skewY=r[3];
                }
                r=value.match(/(translate)\(\s*([\d.-]+)px\s*,\s*([\d.-]+)px\s*\)/);
                if(r&&r.length==4){
                    transX=r[2];
                    transY=r[3];
                }
                angle=parseFloat(angle)||0;
                scaleX=parseFloat(scaleX)||1;
                scaleY=parseFloat(scaleY)||1;
                skewX=parseFloat(skewX)||0;
                skewY=parseFloat(skewY)||0;
                transX=parseFloat(transX)||0;
                transY=parseFloat(transY)||0;
            
                node.style.filter = (node.style.filter||"").replace(/progid\:DXImageTransform\.Microsoft\.Matrix\([^)]+\)/ig,"");
                if('msfilter' in node.style)node.style.msfilter = node.style.filter;
                node.style.marginTop=node.style.marginLeft="";
                var ow=node.offsetWidth,oh=node.offsetHeight;
            
                var m11=1,m21=0,m12=0,m22=1;
                if(angle){
                    var rad = toD(angle);
                    m11 = Math.cos(rad);
                    m21 = Math.sin(rad); 
                    m12 = -1 * Math.sin(rad); 
                    m22 = Math.cos(rad);
                }
                if(scaleX!=1){
                    m11 *= scaleX;
                    m21 *= scaleX; 
                }
                if(scaleY!=1){
                    m12 *= scaleY; 
                    m22 *= scaleY;
                }
                if(skewX){
                    m12 += Math.tan(toD(skewX));
                }
                if(skewY){
                    m21 += Math.tan(toD(skewY));
                }
                
                node.style.filter = (n.style.filter||"")+"progid:DXImageTransform.Microsoft.Matrix(M11="+ m11 +",M12="+ m12 +",M21="+ m21 +",M22="+ m22 +",SizingMethod='auto expand')";
                if('msfilter' in node.style)node.style.msfilter = node.style.filter;
                
                var w=node.offsetWidth,h=node.offsetHeight;
                if(w!=ow || transX){
                    node.style.marginLeft = -(w-ow)/2 + transX + 'px';
                }
                if(h!=oh || transY){
                    node.style.marginTop=-(h-oh)/2 + transY +  'px';
                }
            }
        },
        $textShadowIE:function(node, value, box){
            if(!value){
                var f=function(s){
                    return (s||"").replace(/progid\:DXImageTransform\.Microsoft\.(Chroma|DropShadow|Glow)\([^)]+\)/ig,"");
                },
                s1=node.style.filter,
                s2=('msfilter' in node.style)?node.style.msfilter:"";
                
                if(s1)node.style.filter=f(s1);
                if(s2)node.style.msfilter=f(s2);
                if(!box)
                    node.style.backgroundColor="";
            }else{
                var f=function(x,y,r,c){
                    return (box?"":"progid:DXImageTransform.Microsoft.Chroma(Color=#cccccc) ")
                    + "progid:DXImageTransform.Microsoft.DropShadow(Color="+c+", OffX="+x+", OffY="+y+") "
                    + (parseFloat(r)>0 ?"progid:DXImageTransform.Microsoft.Glow(Strength="+r+", Color="+c+")":"");
                },
                r=value.match(/([\d\.-]+)px\s+([\d\.-]+)px(\s+([\d\.-]+)px)?(\s+([#\w]+))?/);
                if(r){
                    node.style.filter=(node.style.filter||"")+f(r[1],r[2],r[4],r[6]||"#000000");
                    if('msfilter' in node.style)node.style.msfilter = node.style.filter;
                    if(!box)
                        node.style.backgroundColor="#cccccc";
                }
            }
        },
        /*
        *type:linear, or radial
        *orient:LT/T/RT/R/RB/B/LB/L, + C for radial
        *stops:{clr:, pos:, opacity:}
        *rate:0~1
        *shape: circle or ellipse, only for radial
        *size: farthest-corner....
        */
        $setGradients:function(node, value){
            var ns=this,
                xb=xui.browser,
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
            if(!window.btoa){
                
                window.btoa=function (text){
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
            }
            var iecracker1=function(node, orient, stops, shape, size, rate){
                var id="xui.s-ie8gdfix";
                if(!node || node.nodeType != 1 || !node.style)return;
                var tmp1=ns.getStyle(node,'overflow'),
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
                    node.style.backgroundColor='';
                    node.style.filter = (node.style.filter||"").replace(/progid\:DXImageTransform\.Microsoft\.Alpha\([^)]+\)/ig,'');
                    if('msfilter' in node.style)node.style.msfilter = node.style.filter;
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
                    if(_.isObj(orient)){
                        l=orient.left||(l+'px');
                        t=orient.top||(t+'px');
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
                	s.width = w+'px';
                	s.height = h+'px';
                	s.backgroundColor=innerColor;
                	
                	var starto=stops[0].opacity?parseFloat(stops[0].opacity)*100:100
                	s.filter = (s.filter||"")+'progid:DXImageTransform.Microsoft.Alpha(opacity='+starto+', finishopacity=0, style=2)';
                	if('msfilter' in s)s.msfilter = s.filter;
                    
                    // the first node
                    if(node.firstChild)
                        node.insertBefore(at, node.firstChild);
                    else
                        node.appendChild(at);
                	node.style.backgroundColor = outerColor;
                	if(stops[stops.length-1].opacity){
                	    node.style.filter = (node.style.filter||"")+"progid:DXImageTransform.Microsoft.Alpha(opacity="+(parseFloat(stops[stops.length-1].opacity)*100)+")";
                	    if('msfilter' in node.style)node.style.msfilter = node.style.filter;
                	}
                }
            },
            iecracker21=function(node, orient, stops){
                var id="xui.s-ie8gdfix";
                if(!node || node.nodeType != 1 || !node.style)return;
                var tmp1=ns.getStyle(node,'overflow'),
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
                    node.style.backgroundColor='';
                    node.style.filter = (node.style.filter||"").replace(/progid\:DXImageTransform\.Microsoft\.Alpha\([^)]+\)/ig,'');
                    if('msfilter' in node.style)node.style.msfilter = node.style.filter;
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
//                    	case 'T':
//                	    xs=0;ys=0;xe=0;ye=size;
//                	    break;
                    	case 'RT':
                	    xs=size;ys=0;xe=0;ye=size;
                	    break;
//                    	case 'L':
//                	    xs=0;ys=0;xe=0;ye=size;
//                	    break;
//                    	case 'R':
//                	    xs=size;ys=0;xe=0;ye=0;
//                	    break;
                    	case 'LB':
                	    xs=0;ys=size;xe=size;ye=0;
                	    break;
//                    	case 'B':
//                	    xs=0;ys=size;xe=0;ye=0;
//                	    break;
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
                	s.filter = (s.filter||"")+'progid:DXImageTransform.Microsoft.Alpha(style=1, opacity='+starto+', finishopacity=0, startX='+xs+',finishX='+xe+',startY='+ys+',finishY='+ye+')';
                	if('msfilter' in s)s.msfilter = s.filter;
                    
                    // the first node
                    if(node.firstChild)
                        node.insertBefore(at, node.firstChild);
                    else
                        node.appendChild(at);
                	node.style.backgroundColor = outerColor;
                	if(stops[stops.length-1].opacity){
                	    node.style.filter = (node.style.filter||"")+"progid:DXImageTransform.Microsoft.Alpha(opacity="+(parseFloat(stops[stops.length-1].opacity)*100)+")";
                	    if('msfilter' in node.style)node.style.msfilter = node.style.filter;
                	}
                }
            },
            iecracker2=function(node,orient,stops){
                var id="xui.s-ie8gdfix";
                if(!node || node.nodeType!=1 || !node.style)return;
                if(!orient){
                    node.style.filter = (node.style.filter||"").replace(/progid\:DXImageTransform\.Microsoft\.Gradient\([^)]+\)/ig,'');
                    if('msfilter' in node.style)node.style.msfilter = node.style.filter;
                    var i,a=node.childNodes,l=a.length;
                    for(i=0;i<l;i++){
                        if(a[i].nodeType==1 && a[i].id==id){
                            node.removeChild(a[i]);
                            break;
                        }
                    }
                    node.style.backgroundColor='';
                    node.style.filter = (node.style.filter||"").replace(/progid\:DXImageTransform\.Microsoft\.Alpha\([^)]+\)/ig,'');
                    if('msfilter' in node.style)node.style.msfilter = node.style.filter;
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
                	node.style.filter = (node.style.filter||"")+"progid:DXImageTransform.Microsoft.Gradient(StartColorstr='"+innerColor+"',EndColorstr='"+outerColor+"',GradientType="+ori+")";
                	if('msfilter' in node.style)node.style.msfilter = node.style.filter;
                }
            },
            svgcracker1=function(node,orient,stops, shape, size, rate){
                if(!orient){
                    node.style.backgroundImage="";
                }else{
                    rate=rate||1;
                	var id='svg:'+_.id(),
                	    cx='0%',cy='0%',
                	    r=rate*100+"%";
                	if(_.isObj(orient)){
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
                        svg += '<stop stop-color="'+stops[i].clr+'" offset="'+stops[i].pos+'" '+(_.isSet(stops[i].opacity)?(' stop-opacity="'+stops[i].opacity+'"'):'')+' />';
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
                	var id='svg'+_.id(),x1='0%',y1='0%',x2='0%',y2='100%';
                	
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
                        svg += '<stop stop-color="'+stops[i].clr+'" offset="'+stops[i].pos+'" '+(_.isSet(stops[i].opacity)?(' stop-opacity="'+stops[i].opacity+'"'):'')+'/>';
                    }
    
                	svg += '</linearGradient>'
                    +'<rect x="0" y="0" width="1" height="1" fill="url(#'+id+')" />'
                    +'</svg>';
    
                	node.style.backgroundImage = 'url("data:image/svg+xml;base64,'+window.btoa(svg)+'")';
                }
            },
            css1=function(node,orient,stops, shape, size, rate){
                var arr1=[],arr2=[],style=node.style;
                _.arr.each(stops,function(o){
                    var clr=o.clr;
                    if(_.isSet(o.opacity) && clr.charAt(0)=='#'){
                        clr=clr.slice(1);
                        clr="rgba("+_to255(clr.substr(0, 2))+","+_to255(clr.substr(2, 2))+","+_to255(clr.substr(4, 2))+","+parseFloat(o.opacity)+")";
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
                	if(_.isObj(orient)){
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
                _.arr.each(stops,function(o){
                    var clr=o.clr;
                    if(_.isSet(o.opacity) && clr.charAt(0)=='#'){
                        clr=clr.slice(1);
                        clr="rgba("+_to255(clr.substr(0, 2))+","+_to255(clr.substr(2, 2))+","+_to255(clr.substr(4, 2))+","+parseFloat(o.opacity)+")";
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
                    	    directionmoz="top";
                    	    direction="to bottom";
                    	    directionwebkit = 'left top, left bottom';
                    	break;
                    	case 'RT':
                    	    direction=directionmoz="-135deg";
                    	    directionwebkit = 'right top, left bottom';
                    	break;
                    	case 'L':
                    	    directionmoz="left";
                    	    direction="to right";
                    	    directionwebkit = 'left top, right top';
                    	break;
                    	case 'R':
                    	    directionmoz="right";
                    	    direction="to left";
                    	    directionwebkit = 'right top, left top';
                    	break;
                    	case 'LB':
                    	    direction=directionmoz="45deg";
                    	    directionwebkit = 'left bottom, right top';
                    	break;
                    	case 'B':
                    	    directionmoz="bottom";
                    	    direction="to top";
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
                    _.arr.stableSort(stops,function(x,y){
                        x=parseFloat(x.pos);
                        y=parseFloat(y.pos);
                        return x>y?1:x==y?0:-1;
                    });
                }else{
                    return;
                }
            }

            if(xb.ie && ver>=6 && ver<9){
                if(type=='linear'){iecracker2(node,orient,stops);}
                else{iecracker1(node,orient,stops,shape,size,rate);}
            }else if((xb.ie && ver>=9 && ver<10) || (xb.opr && ver<11.1)){
                if(type=='linear'){svgcracker2(node,orient,stops);}
                else{svgcracker1(node,orient,stops,shape,size,rate);}
            }else{
                if((xb.gek && ver>=3.6)
                    ||(xb.isChrome && ver>=10)
                    ||(xb.isSafari && ver>=5.1)
                    ||(xb.ie && ver>=10)
                    ||(xb.opr && ver>=11.1)
                    ){
                    if(type=='linear'){css2(node,orient,stops);}
                    else{
                        if(xb.opr && ver<12)
                            svgcracker1(node,orient,stops,shape,size,rate);
                        else
                            css1(node,orient,stops,shape,size,rate);
                    }
                }
            }
        },
        $adjustCss:function(hash,returnStr){
            var fack={nodeType:1,style:{}};
            xui.Dom.setStyle(fack,hash);
            if(returnStr){
                var arr=[];
                if(xui.browser.ie&&xui.browser.ver==8&&fack.style.filter)
                    fack.style["-ms-filter"]=fack.style.filter;
                _.each(fack.style,function(o,i){
                    arr.push(i.replace(/([A-Z])/g, "-$1" ).toLowerCase()+":"+o);
                });
                return arr.join(';');
            }else{
                return fack.style;
            }
        },
        setStyle:function(node, name , value){
            var ns=xui.Dom,
                css3prop=xui.Dom._css3prop,
                xb=xui.browser;
            if(node.nodeType != 1)return;
            if(typeof name == 'string'){
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
                }else if(name=='opacity'){
                    value=_.isFinite(value)?
                            parseFloat(value)>1?
                                1
                                :parseFloat(value)<=0?
                                    0
                                :parseFloat(value)
                            :1;
                    value= value >0.9999 ? '' : ((!ns.css3Support("opacity"))&&xb.ie) ? "alpha(opacity="+ 100*value +")" : value;
                    if((!ns.css3Support("opacity"))&&xb.ie){
                        node.style.zoom=1;
                        name='filter';
                        value = (node.style.filter||"").replace(r1, "") + value;
                    }
                }else if(_.arr.indexOf(css3prop,n1)!=-1){
                    if(!ns.css3Support(name)){
                        if(xb.ie && xb.ver<9){
                            switch(name){
                                case "transform":
                                linb.Dom.$transformIE(node,value);
                                break;
                                case "boxShadow":
                                linb.Dom.$textShadowIE(node,value, true);
                                break;
                            }
                        }
                        if(name=="textShadow" && xb.ie && xb.ver<10){
                            linb.Dom.$textShadowIE(node,value);
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

                node.style[name]=value;
                if(name2)node.style[name2]=value;
                if(name3)node.style[name3]=value;
                if(name4)node.style[name4]=value;
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
            n.id="xui_css3_"+_();

            if(key.indexOf("border")===0){
                key=key.replace(/[-]?(left|top|right|bottom)/ig,'');
            }
            switch(key){
                case "opacity":
                case "textShadow":{
                    rt = s[key]==='';
                }break;
                case "generatedContent":{
                    var id="tmp_css3_test"+_.id(),
                        css='#'+n.id+'{line-height:auto;margin:0;padding:0;border:0;font:0/0 a}#'+n.id+':after{content:\'a\';visibility:hidden;line-height:auto;margin:0;padding:0;border:0;font:3px/1 a}';
                    linb.CSS.addStyleSheet(css,id);
                    xui('body').append(n);
                    var v=n.offsetHeight;
                    linb.CSS.remove("id",id);
                    xui(n.id).remove(n);
                    rt = v>=3;
                }break;
                case "fontFace":{
                    if(xb.ie && xb.ver>=6){
                        rt=true;
                    }else{
                        var id="tmp_css3_test"+_.id(),
                            css='@font-face{font-family:"font";src:url("https://")}',
                            s=linb.CSS.addStyleSheet(css,id),
                            sh=s.sheet || s.styleSheet,
                            ctxt=sh?((sh.cssRules && sh.cssRules[0])?sh.cssRules[0].cssText:sh.cssText||''):'';
                            
                        rt=/src/i.test(ctxt) && ctxt.indexOf("@font-face") === 0;
                        linb.CSS.remove("id",id);
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
                        var id="tmp_css3_test"+_.id(),
                            css='@media (transform-3d),(-webkit-transform-3d){#'+n.id+'{font:0/0;line-height:0;margin:0;padding:0;border:0;left:9px;position:absolute;height:3px;}}';
                        linb.CSS.addStyleSheet(css,id);
                        xui('body').append(n);
                        var v1=n.offsetLeft,v2=n.offsetHeight;
                        linb.CSS.remove("id",id);
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
        _setPxStyle:function(node, key, value){
            if(node.nodeType != 1)return false;
            var style=node.style;
            if(value || value===0){
                value = ((''+parseFloat(value))==(''+value)) ? (parseInt(value,10)||0) + "px" : value +'';
                if((key=='width'||key=='height') && value.charAt(0)=='-')value='0';
                if(style[key]!=value){
                    style[key]=value;
                    return true;
                }
            }return false;
        },
        _emptyDivId:"xui.empty::",
        getEmptyDiv:function(sequence){
            var i=1,id,rt,style,o,t,count=0,doc=document,body=doc.body,ini=function(o){
                o.id=id;
                xui([o]).attr('style','position:absolute;visibility:hidden;overflow:visible;left:'+xui.Dom.HIDE_VALUE+';top:'+xui.Dom.HIDE_VALUE+';');
            };
            sequence=sequence || 1;
            while(1){
                id = this._emptyDivId + i;
                //don't remove this {
                if(o=xui.Dom.byId(id)){
                    //Using firstChild, for performance
                    if(!o.firstChild && ++count == sequence)
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
        setCover:function(visible,label){
            // get or create first
            var me=arguments.callee,
                id="xui.temp:cover:",
                id2="xui.temp:message:",
                content = (typeof(visible)=='string'||typeof(visible)=='function')?visible:'',
                o1,o2;

            if((o1=xui(id)).isEmpty()){
                xui('body').prepend(o1=xui.create('<div id="'+ id +'" class="xui-cover xui-custom" style="position:absolute;display:none;left:0;top:0;"><div id="'+id2+'" class="xui-coverlabel xui-custom" style="position:absolute;"></div></div>'));
                o1.setSelectable(false);
                xui.setNodeData(o1.get(0),'zIndexIgnore',1);
            }
            if(xui.Dom.byId(id2)){
                o2=xui(id2);
            }
             
            //clear
            if(!visible){
                if(typeof me._label =='string' && me._label!==label)
                    return;
                if(me._showed){
                    if(o2)o2.empty(false);
                    o1.css({zIndex:0,cursor:'',display:'none'});
                    me._showed=false;
                }
                delete me._label;
            }else{
                if(typeof label=='string')me._label=label;
                var t = xui.win;
                if(!me._showed){
                    o1.css({zIndex:xui.Dom.TOP_ZINDEX*10,display:'',width:t.scrollWidth()+'px',height:t.scrollHeight()+'px',cursor:'progress'});
                    me._showed=true;
                }
                //show content
                if(content){
                    if(typeof(content)=='function'){
                        content(o1,o2);
                    }else if(o2){
                        o2.html(content +'',false);
                        o2.css({left :t.scrollLeft()+t.width()/2-o2.width()/2+'px', top: t.scrollTop()+t.height()/2-o2.height()/2+'px'});
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
            data=_.isHash(data)?data:{};
            data=_.clone(data, function(o){return o!==undefined});

            method=method||'get';
            action=action||'';
            target=target||(action.substring(0,6).toLowerCase()=='mailto'?'_self':'_blank');
            var _t=[];
            if(!_.isEmpty(data)){
                if(method.toLowerCase()=='get'){
                    window.open(action + "?" + _.urlEncode(data),target);
                }else{
                    _.each(data,function(o,i){
                        if(_.isDefined(o))
                            _t.push('<textarea name="'+i+'">'+(typeof o=='object'?_.serialize(o):o)+'</textarea>');
                    });
                    _t.push('<input type="hidden" name="rnd" value="'+_()+'">');
                    _t=_.str.toDom('<form target="'+target+'" action="'+action+'" method="'+method  + (enctype?'" enctype="' +enctype:'') +  '">'+_t.join('')+'</form>');
                    xui.Dom.getEmptyDiv().append(_t);
                    _t.get(0).submit();
                    _t.remove();
                    _t=null;
                }
            }else{
                window.open(action,target);
            }
        },
        busy:function(label,busyMsg){
            xui.Dom.setCover(busyMsg||true,label);
        },
        free:function(label){
           xui.Dom.setCover(false,label);
        },
        animate:function(css, args, onStart, onEnd, time, step, type, threadid, unit){
            var node = document.createElement('div');
            _.merge(css,{position:'absolute', left:this.HIDE_VALUE, zIndex:this.TOP_ZINDEX++});
            xui.Dom.setStyle(node, css);
            document.body.appendChild(node);
            return xui([node]).animate(args, onStart, function(){
                _.tryF(onEnd);
                if(node.parentNode)
                    node.parentNode.removeChild(node);
                node=null;
            }, time, step, type, threadid, unit);
        },
        //plugin event function to xui.Dom
        $enableEvents:function(name){
            if(!_.isArr(name))name=[name];
            var self=this,f;
            _.arr.each(name,function(o){
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
        _.each({ parent:['y',false], prev:['x',false], next:['x',true], first:['y',true], last:['y',1]},function(o,i){
            self.plugIn(i, function(index){
                return this.$iterator(o[0], o[1], true, index || 1)
            });
        });

        //readonly profile
        _.arr.each(_.toArr('offsetLeft,offsetTop,scrollWidth,scrollHeight'),function(o){
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
        _.arr.each([['_'+p+'H',p+T,p+B],
            ['_'+p+'W',p+L,p+R],
            ['_'+b+'H',b+T+W,b+B+W],
            ['_'+b+'W',b+L+W,b+R+W],
            ['_'+m+'W',m+L,m+R],
            ['_'+m+'H',m+T,m+B]
        ],function(o){
            //use get Style dir
            var node,fun=xui.Dom.getStyle;
            self.plugIn(o[0],function(){
                node = this.get(0);
                return (parseInt(fun(node, o[1]),10) + parseInt(fun(node, o[2]),10)) || 0;
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

        _.arr.each([['_W',w, '_'+p+'W', '_'+b+'W', '_'+m+'W', c+W, o+W],
        ['_H',h, '_'+p+'H', '_'+b+'H', '_'+m+'H', c+H, o+H]],function(o){
            self.plugIn(o[0],function(node,index,value){
                var n,r,t,style=node.style,me=arguments.callee,contentBox=xui.browser.contentBox,
                r1=me.r1 || (me.r1=/%$/),
                getStyle=xui.Dom.getStyle,
                f=xui.Dom._setPxStyle,type=typeof value,t1;
                if(type=='undefined' || type=='boolean'){
                    if(value===true){
                        n=(getStyle(node,'display')=='none');
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
                            if(isNaN(parseInt(r,10)) || r1.test(r))
                                r = me(node,2) - (contentBox?t[o[2]]():0);
                            r=parseInt(r,10)||0;
                            break;
                        case 2:
                            r=node[o[6]]-t[o[3]]();
                            break;
                        case 3:
                            //for in firefox, offsetHeight/Width's bad performance
                            //if(node._bp)
                            //    r=node['_'+o[6]];
                            //else{
                            //    t1=_();
                                r=node[o[6]];
                            //    if(_()-t1>60){
                            //        node['_'+o[6]]=r;
                            //        node._bp=1;
                            //    }
                            //}
                            if(!r)
                                //get from css setting before css applied
                                r=me(node,1)+(contentBox?t[o[2]]():0)+t[o[3]]();
                            break;
                        case 4:
                            r=me(node,3);
                            r+=t[o[4]]();
                            break;
                    }
                    if(n){
                        style.display = d; style.position = p;style.visibility = b;
                        t.swap(temp);
                        temp.empty(false);
                    }
                    return parseInt(r,10)||0;
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
                            me(node, 1, value - (contentBox?xui([node])[o[2]]():0));
                            break;
                        case 3:
                            //back value for offsetHeight/offsetWidth slowly
                            me(node, 1, value - (t=xui([node]))[o[3]]() - (contentBox?t[o[2]]():0));
                            break;
                        case 4:
                            me(node, 1, value - (t=xui([node]))[o[4]]() - t[o[3]]() - (contentBox?t[o[2]]():0));
                            break;
                    }
                    //if(node._bp)
                    //    node['_'+o[6]]=null;
                }
            })
        });
        _.arr.each([[c+W,'_W',2],[o+W,'_W',3],[r+W,'_W',4],
         [c+H,'_H',2],[o+H,'_H',3],[r+H,'_H',4]],function(o){
            self.plugIn(o[0],function(value){
                var type=typeof value;
                if(type=='undefined' || type=='boolean')
                    return this[o[1]](this.get(0), o[2]);
                else
                    return this.each(function(v){
                        this[o[1]](v, o[2],value);
                    });
            })
        });
        _.arr.each([[l+'By',l],[t+'By',t],[w+'By',w],[h+'By',h]],function(o){
            self.plugIn(o[0],function(offset,triggerEvent){
                if(offset===0)return this;
                var m,args,k=o[1];
                return this.each(function(node){
                    m=xui.use(node.$xid)[k]();
                    m=(parseInt(m,10)||0)+offset;
                    if(k=='width'||k=='height')m=m>0?m:0;
                    node.style[k]=m+'px';
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
        _.arr.each(['scrollLeft','scrollTop'],function(o){
            self.plugIn(o,function(value){
                var a=document.documentElement,b=document.body;
                if(value !==undefined)
                    return this.each(function(v){
                        if(v===window || v===document){
                            a[o]=b[o]=value;
                        }else
                            v[o]=value;
                    });
                else{
                    var v=this.get(0);
                    if(v===window || v===document){
                        if("scrollTop"==o)return window.pageYOffset || (_.isNumb(a[o])?a[o]:b[o]);
                        if("scrollLeft"==o)return window.pageXOffset || (_.isNumb(a[o])?a[o]:b[o]);
                    }
                    return v[o];
                }
            })
        });
        _.arr.each('width,height,left,top'.split(','),function(o){
            self.plugIn(o,function(value){
                var self=this, node=self.get(0),b=xui.browser,type=typeof value,doc=document,t;
                if(!node || node.nodeType==3)return;
                if(type=='undefined'||type=='boolean'){
                    if((o=='width' && (t='Width'))||(o=='height' && (t='Height'))){
                        if(doc===node)return Math.max( doc.body['scroll'+t], doc.body['offset'+t], doc.documentElement['scroll'+t], doc.documentElement['offset'+t]);
                        if(window===node)return b.opr?Math.max(doc.body['client'+t],window['inner'+t]):b.kde?window['inner'+t]:(xui.browser.contentBox && doc.documentElement['client'+t]) ||doc.body['client'+t];
                    }
                    //give shortcut
                    if(o=='width')value=parseInt(node.style.width,10)||self._W(node,1,value);
                    else if(o=='height')value=parseInt(node.style.height,10)||self._H(node,1,value);
                    else
                        value = xui.Dom.getStyle(node, o);
                    return value=='auto'?value:(parseInt(value,10)||0);
                }else{
                    var f=xui.Dom._setPxStyle,t,a;
                    return self.each(function(v){
                        if(v.nodeType!=1)return;
                            if(v.style[o]!==value){
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
        _.arr.each(xui.Event._events,function(o){
            _.arr.each(xui.Event._getEventName(o),function(o){
                self.$enableEvents(o);
            })
        });
    },
    Initialize:function(){
        var w=window,d=document;
        _.set(xui.$cache.domPurgeData,'!window',{$xid:'!window',element:w});
        _.set(xui.$cache.domPurgeData,'!document',{$xid:'!document',element:d});

        xui.win=xui(['!window'],false);
        xui.doc=xui(['!document'],false);

        xui.$inlineBlock=xui.browser.gek
            ? xui.browser.ver<3
                ? ['-moz-inline-block', '-moz-inline-box','inline-block']
                : 'inline-block'
            : xui.browser.ie6
                ? ['inline-block', 'inline']
                : 'inline-block',
        //hot keys
        xui.doc.onKeydown(function(p,e,s){
            xui.Event.$keyboard=xui.Event.getKey(e);

            var event=xui.Event,set,
                ks=event.getKey(e);
            if(ks){
                if(ks[0].length==1)ks[0]=ks[0].toLowerCase();
                set = xui.$cache.hookKey[ks.join(":")];
                //if hot function return false, stop bubble
                if(set){
                    // auto clear function
                    if(set[3]){
                        if(typeof set[3]=='function'?false===(set[3])():(!xui(set[3]).size())){
                            delete xui.$cache.hookKey[ks.join(":")];
                            return;
                        }
                    }
                    if(_.tryF(set[0],set[1],set[2])===false){
                        event.stopBubble(e);
                        return false;
                    }
                }

            }
            return true;
        },"document")
        .onKeyup(function(p,e){
            delete xui.Event.$keyboard;

            var event=xui.Event,set,
                ks=event.getKey(e);
            if(ks){
                if(ks[0].length==1)ks[0]=ks[0].toLowerCase();
                set = xui.$cache.hookKeyUp[ks.join(":")];
                //if hot function return false, stop bubble
                if(set){
                    // auto clear function
                    if(set[3]){
                        if(typeof set[3]=='function'?false===(set[3])():(!xui(set[3]).size())){
                            delete xui.$cache.hookKeyUp[ks.join(":")];
                            return;
                        }
                    }
                    if(_.tryF(set[0],set[1],set[2])===false){
                        event.stopBubble(e);
                        return false;
                    }
                }
            }
            return true;
        },"document");

        //hook link(<a ...>xxx</a>) click action
        //if(xui.browser.ie || xui.browser.kde)
            xui.doc.onClick(function(p,e,src){
                var o=xui.Event.getSrc(e),
                    i=0,b,href;
                do{
                    if(o.tagName == 'A'){
                        b=true;
                        break;
                    }
                    if(++i>8)break;
                }while(o=o.parentNode)
                if(b){
                    href=_.str.trim(o.href||"").toLowerCase();
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

        if(xui.browser.ie && xui.browser.ver<10 && d.body)
            d.body.onselectstart=function(n,v){
                n=event.srcElement;
                while(n&&n.tagName&&n.tagName!="BODY"&&n.tagName!="HTML"){
                    if(v=xui.getNodeData(n,"_onxuisel"))
                        return v!='false';
                    // check self only
                    if(n.tagName=="INPUT"||n.tagName=="TEXTAREA")
                        break;
                    n=n.parentNode;
                }
                return true;
            };
        //free memory
        xui.win.afterUnload(function(){
            w.onresize=null;
            if(w.removeEventListener)
                w.removeEventListener('DOMMouseScroll', xui.Event.$eventhandler3, false);

            d.onmousewheel=w.onmousewheel=null;

            // for simulation mouse event in touable device
            if(xui.browser.isTouch){
                if(d.removeEventListener){
                    d.removeEventListener(
                        (xui.browser.ie&&w.PointerEvent)?"pointerdown":
                        (xui.browser.ie&&w.MSPointerEvent)?"MSPointerDown":
                        "touchstart", xui.Event._simulateMousedown, false);
                    d.removeEventListener(
                        (xui.browser.ie&&xui.browser.ver>=11)?"pointerup":
                        (xui.browser.ie&&xui.browser.ver>=10)?"MSPointerUp":
                        "touchend", xui.Event._simulateMouseup, false);
                }else if(d.detachEvent){
                    d.detachEvent(
                        (xui.browser.ie&&xui.browser.ver>=11)?"pointerdown":
                        (xui.browser.ie&&xui.browser.ver>=10)?"MSPointerDown":
                        "touchstart", xui.Event._simulateMousedown);
                    d.detachEvent(
                        (xui.browser.ie&&xui.browser.ver>=11)?"pointerup":
                        (xui.browser.ie&&xui.browser.ver>=10)?"MSPointerUp":
                        "touchend", xui.Event._simulateMouseup);
                }
            }

            if(xui.browser.ie && d.body)
                d.body.onselectstart=null;

            if("onhashchange" in w)w.onhashchange=null;
            
            xui('body').empty();
            xui([w, d]).$clearEvent();
            //unlink link 'App'
            xui.SC.__gc();
            xui.Thread.__gc();
            Class.__gc();
            _.breakO(xui.$cache,2);
            _.breakO([xui,Class,_],3);
            w.Namespace=w.Class=w.xui=w.linb=w._=undefined;
        },"window",-1);

    }
});