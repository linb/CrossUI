Class("xui.UI.PopMenu",["xui.UI.Widget","xui.absList"],{
    Instance:{
        adjustSize:function(){
            this.each(function(profile){
                if(profile.renderId){
                    var root=profile.getRoot();
                    if(root.css('display')=='none'){
                        profile._needadjust=1;
                        return;
                    }
                    var border = profile.getSubNode('BORDER'),
                        box = profile.getSubNode('BOX'),
                        bg = profile.getSubNode('BOXBGBAR'),
                        items = profile.getSubNode('ITEMS'),
                        nodes = profile.getSubNode('ITEM',true),
                        prop=profile.properties,
                        css=xui.CSS,
                        useem = (prop.spaceUnit||xui.SpaceUnit)=='em',
                        adjustunit = function(v,emRate){return css.$forceu(v, useem?'em':'px', emRate)},
                        rootfz =root._getEmSize(),
                        ww=0,hh=0;
                       
                       items.cssSize({width:'auto',height:'auto'});
 
                        hh = items.height() + 2/*border*/;
                        if(xui.browser.ie67 && hh%2==1)hh+=1;
                        items.addClass(profile.getClass('ITEMS','-inline'));
                        nodes.each(function(n){
                            ww=Math.max(ww, n.offsetWidth);
                        });
                        if(ww%2==1)ww+=1;
                        items.removeClass(profile.getClass('ITEMS','-inline'));

                    // for IE7
                    items.cssSize({
                        width:adjustunit(ww, rootfz),
                        height:adjustunit(hh,rootfz)
                    });
                    bg.height(adjustunit(hh,rootfz));

                    var h = adjustunit(Math.min(prop._maxHeight, hh),rootfz),
                        w = adjustunit(Math.min(prop._maxWidth, ww),rootfz),
                        size={
                            width:w,
                            height:h
                        };
                    prop.width=w;
                    prop.height=h;

                    root.cssSize(size);
                    border.cssSize(size);
                    box.cssSize({
                        width:adjustunit(Math.min(prop._maxWidth, ww)  + xui.Dom.getScrollBarSize(), rootfz),
                        height:size.height
                    });
                }
            });
            return this._setScroll();
        },
        _setScroll:function(){
            return this.each(function(profile){
                if(profile.renderId){
                    var o=profile.getSubNode('BOX'),
                        t=o.scrollTop(),
                        h=o.scrollHeight(),
                        b = profile.getRoot(),
                        hh=b.offsetHeight();
                    profile.getSubNode('TOP').css('display',t===0?'none':'block');
                    profile.getSubNode('BOTTOM').css('display',(hh>=h-t)?'none':'block');
                }
            })
        },
        _scrollToBottom:function(){
            return this.each(function(profile){
                var o = profile.getSubNode('BOX'),
                border = profile.getSubNode('BORDER'),
                y = o.scrollTop(),
                offset,
                h = o.scrollHeight(),
                b=false,
                bh = border.height();
                if(bh<h-y){
                    if(!profile.$scrollStep)profile.$scrollStep=1;

                    if(profile.$scrollStep<5)
                        profile.$scrollStep = profile.$scrollStep*1.01;

                    y += profile.$scrollStep;
                    if(bh>=h-y){
                        y=h-bh;
                        b=true;
                    }
                    o.scrollTop(y);
                    if(b){
                        profile.getSubNode('BOTTOM').css('display','none');
                        profile.$scrollTobottom=false;
                        profile.$scrollStep=null;
                    }else{
                        profile.getSubNode('TOP').css('display','block');
                        if(profile.$scrollTobottom)
                            xui.asyRun(arguments.callee, 0, [profile], this);
                    }
                }
            });
        },
        _scrollToTop:function(){
            return this.each(function(profile){
                var o = profile.getSubNode('BOX'),
                y = o.scrollTop(),
                b=false;

                if(y>0){
                    if(!profile.$scrollStep)profile.$scrollStep=1;

                    if(profile.$scrollStep<5)
                        profile.$scrollStep = profile.$scrollStep*1.01;

                    y -= profile.$scrollStep;
                    if(y<0){
                        y=0;
                        b=true;
                    }
                    o.scrollTop(y);
                    if(b){
                        profile.getSubNode('TOP').css('display','none');
                        profile.$scrollToTop=false;
                        profile.$scrollStep=null;
                    }else{
                        profile.getSubNode('BOTTOM').css('display','block');
                        if(profile.$scrollToTop)
                            xui.asyRun(arguments.callee, 0, [profile], this);
                    }
                }
            });
        },
        pop:function(obj, type, parent,ignoreEffects){
            var profile=this.get(0),
                p=profile.properties,
                sms='$subPopMenuShowed',
                hl='$highLight',
                cm='$childPopMenu';
            //ensure rendered
            if(!profile.renderId){
                var o=profile.boxing().render(true);
                //use empty idv for LayoutTrigger
                xui.Dom.getEmptyDiv().append(o);
            }
            var root = profile.getRoot();

            //clear highLight first
            if(profile.$highLight)
                xui([profile.$highLight]).tagClass('-mouseover',false);
            profile._conainer=parent;

            root.popToTop(obj, type, parent);

            this._setScroll();

            if(profile._needadjust){
                delete profile._needadjust;
                profile.boxing().adjustSize();
            };

            var f=function(){
                var p=arguments.callee.profile;
                // maybe destroyed here
                if(p.box){
                    p.boxing().hide();
                    if(p.$popGrp)
                        p.$popGrp.length=0;
                }
            };
            f.profile=profile;

            if(!profile.$popGrp || !profile.$popGrp.length){
                profile.$popGrp = [root._get(0)];
                //group blur trigger
                root.setBlurTrigger(profile.$xid, null);
                root.setBlurTrigger(profile.$xid, f, profile.$popGrp);
            }
            profile[cm]=profile[sms]=profile[hl]=null;
            return this;
        },
        hide:function(triggerEvent, ignoreEffects , e){
            var t,
                profile=this.get(0),
                p=profile.properties,
                root=profile.getRoot(),
                sms='$subPopMenuShowed',
                hl='$highLight',
                cm='$childPopMenu',
                fun=function(){
                    if(false!==triggerEvent)
                        if(false===profile.boxing().beforeHide(profile, ignoreEffects, e))
                            return this;

                    if(!root || root.css('display')=='none')return;

                    //remove trigger
                    root.setBlurTrigger(profile.$xid,null);
                    if(profile.$hideMenuPool)
                        profile.$hideMenuPool.append(root);
                    else
                        root.css('display','none');

                    if(t=profile[hl])
                       xui([t]).tagClass('-mouseover',false);

                    //hide all parent pop
                    var p=profile[cm],q;
                    if(t=profile[sms])t.hide(triggerEvent, ignoreEffects);
                    while(p){
                        p.boxing().hide(triggerEvent, ignoreEffects);
                        p=(q=p)[cm];
                        q[cm] = q[sms] = q[hl] = null;
                    }
                    profile[cm]=profile[sms]=profile[hl]=null;
                    if(t=profile.$parentPopMenu)t[sms]=null;

                    if(profile.$popGrp)
                        xui.arr.removeValue(profile.$popGrp,root._get(0));

                    if(false!==triggerEvent)
                        profile.boxing().onHide(profile);
                };
            root.hide(fun,null,ignoreEffects);
            return this;
        },
        _afterInsertItems:function(profile){
            if(!profile.renderId)return;
            profile.boxing().adjustSize();
        },
        _afterRemoveItems:function(profile){
            if(!profile.renderId)return;
            profile.boxing().adjustSize();
        }
    },
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        xui.merge(t.FRAME.BORDER,{
            className:"xui-uiborder-outset",
             TOP:{
                className:'xuifont xui-uibg-bar xui-uiborder-b',
                $fonticon:'xui-icon-circleup'
             },
             BOTTOM:{
                className:'xuifont xui-uibg-bar xui-uiborder-t',
                $fonticon:'xui-icon-circledown'
             },
             BOX:{
                tagName:'div',
                className:"xui-uibg-base",
                BOXBGBAR:{
                    tabName:'div',
                    className:'xui-uibg-bar',
                    style:'{_iconDisplay}'
                },
                 ITEMS:{
                    tagName:'div',
                    text:"{items}"
                 }
             },
             POOL:{}
        },'all');
        t.$submap = {
            'items':function(profile,template,v,tag,result){
                var t;
                tag = tag+'.'+v.type;
                //for xui.UI or xui.Template
                if(t=v.object){
                    //[v] is for xui.Template
                    result[result.length]=t.build(v);
                }else{
                    if(template[tag])
                        xui.UI.$doTemplate(profile,template,v,tag,result);
                }
             },
            'items.split':{
                ITEMSPLIT:{
                    style:"{_itemDisplay}",
                    className:'xui-uiborder-b'
                }
            },
            'items.button':{
                ITEM:{
                    tabindex: -1,
                    className: ' xui-uitembg-menu {itemClass} {disabled}',
                    style:'{itemStyle}{_itemDisplay}',
                    ICON:{
                        $order:0,
                        className:'xuicon xui-icon-empty {imageClass}',
                        style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {_iconDisplay}'
                    },
                    CAPTION:{
                        text : '{caption}',
                        $order:1
                    },
                    RULER:{
                        style:'{displayAdd}',
                        $order:2
                    },
                    ADD:{
                        tagName : 'div',
                        style:'{displayAdd}',
                        text : '{add}',
                        $order:2
                    },
                    SUB:{
                        className:'xuifont',
                        $fonticon:'xui-icon-singleright',
                        style:'{displaySub}'
                    }
                }
            },
            'items.checkbox':{
                ITEM:{
                    tabindex: -1,
                    className: '  xui-uitembg-menu {itemClass} {disabled}',
                    style:'{itemStyle}{_itemDisplay}',
                    CHECKBOX:{
                        $order:0,
                         className:'xuifont',
                        $fonticon:'{_fi_checkboxCls1} {_fi_checkboxCls2}  {_iconDisplay}'
                    },
                    CAPTION:{
                        text : '{caption}',
                        $order:1
                    },
                    RULER:{
                        style:'{displayAdd}',
                        $order:2
                    },
                    ADD:{
                        tagName : 'div',
                        style:'{displayAdd}',
                        text : '{add}',
                        $order:2
                    }
                }
            },
            'items.radiobox':{
                ITEM:{
                    tabindex: -1,
                    className: '  xui-uitembg-menu {itemClass} {disabled}',
                    style:'{itemStyle}{_itemDisplay}',
                    RADIOBOX:{
                        $order:0,
                        className:'xuifont',
                        $fonticon:'{_fi_radioboxCls1} {_fi_radioboxCls2}  {_iconDisplay}'
                    },
                    CAPTION:{
                        text : '{caption}',
                        $order:1
                    },
                    RULER:{
                        style:'{displayAdd}',
                        $order:2
                    },
                    ADD:{
                        tagName : 'div',
                        style:'{displayAdd}',
                        text : '{add}',
                        $order:2
                    }
                }
            }
        };
        this.setTemplate(t);
    },
    Static:{
        $initRootHidden:true,
        Appearances:{
            KEY:{
                visibility:'hidden'
            },
            POOL:{
                position:'absolute',
                display:'none'
            },
            BOX:{
                overflow:'hidden',
                position:'relative',
                overflow:'hidden',
                'overflow-y':'auto',
                'z-index':'3'
            },
            BORDER:{
                position:'relative',
                overflow:'hidden'
            },
            ITEMS:{
                position:'relative',
                top:0,
                left:0,
                overflow:'hidden',
                'white-space':'nowrap'
            },
            BOXBGBAR:{
                'z-index':-1,
                position:'absolute',
                left:0,
                top:0,
                width:'2em',
                height:'100%'
            },
            'ITEMS-inline ITEM':{
                $order:5,
                display:xui.$inlineBlock
            },
            ITEM:{
                display:'block',
                position:'relative',
                overflow:'visible',
                'white-space': 'nowrap',
                cursor:'pointer',
                padding:'.25em 1.75em .25em .25em',
                outline:0
            },
            ITEMSPLIT:{
                display:'block',
                position:'relative',
                overflow:'visible',
                'white-space': 'nowrap',
                margin:'.25em .25em .25em 2em'
            },
            ICON:{
                margin:0
            },
            TOP:{
                cursor:'pointer',
                display:'none',
                position:'absolute',
                'z-index':'10',
                top:0,
                'text-align':'center',
                width:'100%'
            },
            BOTTOM:{
                cursor:'pointer',
                display:'none',
                position:'absolute',
                bottom:0,
                'z-index':'10',
                'text-align':'center',
                width:'100%'
            },
            'RADIOBOX, CHECKBOX, RADIOBOX-checked, CHECKBOX-checked':{
                cursor:'pointer',
                'vertical-align':'middle'
            },
            CAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                'padding-left':'.75em',
                'font-size':'1em'
            },
            RULER:{
                width:'8em'
            },
            ADD:{
                position:'absolute',
                top:'.25em',
                right:0,
                width:'7em',
                'padding-right':'1.75em',
                'text-align':'right',
                'z-index':'10',
                zoom:xui.browser.ie?1:null
            },
            SUB:{
                position:'absolute',
                top:'.15em',
                right:'.15em'
            }
        },
        Behaviors:{
            HoverEffected:{TOP:'TOP', BOTTOM:'BOTTOM'},
            BOX:{
                onScroll:function(profile, e, src){
                    profile.boxing()._setScroll();
                }
            },
            ITEM:{
                onMouseover:function(profile, e, src){
                    var sms='$subPopMenuShowed',
                        all='$allPops',
                        hl='$highLight',
                        showp='$showpops',
                        popgrp='$popGrp';
                    //for stop second trigger by focus event
                    if(profile[hl] == src)return;

                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        itemId = item.id,
                        Cancel = false,
                        pop,popp,t;
                    //if sub pop menu showed
                    if(t=profile[sms]){
                        //if the showed menu is self
                        if(t == xui.get(profile,[all,itemId]))
                            Cancel=true;
                        else{
                            t.hide();
                            profile[sms] = null;
                        }
                    }
                    if(!Cancel){
                        if(t=profile[hl])
                            xui([t]).tagClass( '-mouseover',false);
                        profile[hl] = src;
                        xui.use(src).tagClass('-mouseover');
                        //don't fire events here
                        try{xui.use(src).get(0).focus()}catch(e){}
                    }

                    if(!Cancel && item.sub){
                        // if no sub arrays
                        if(!(xui.isArr(item.sub) && item.sub.length)){
                            if(profile.onShowSubMenu){
                                var r=profile['$sub:'+item.id];
                                if(r && r['xui.UI'] && !r.isEmpty()){}
                                else
                                    r=profile.boxing().onShowSubMenu(profile, item, src);

                                // return UI control
                                if(r && r['xui.UI'] && !r.isEmpty()){
                                    profile[sms] = r;
                                    r=r.reBoxing();
                                    r.onMouseout(function(p,e,src){
                                        profile.box._mouseout(profile, e, src);
                                    },null,-1);
                                    profile[popgrp].push(r._get(0));

                                    r.popToTop(src,2,profile._conainer);

                                    return;
                                }
                                // return items array
                                else if(r && xui.isArr(r) && r.length){
                                    item.sub=r;
                                }
                            }
                        }

                        // show items
                        if(xui.isArr(item.sub) && item.sub.length){
                            profile[all] = profile[all] || {};

                            //no create
                            if(!(pop = profile[all][itemId])){
                                var pro=profile.properties;
                                pop = (new xui.UI.PopMenu({position:'absolute', items:item.sub, autoHide:pro.autoHide, showEffects:pro.showEffects, hideEffects:pro.hideEffects})).render(true);
                                pop.onShowSubMenu(function(pro, item, src){
                                    return profile.boxing().onShowSubMenu(profile, item, src);
                                });
                                pop.onMenuSelected(function(pro, item, src){
                                    return profile.boxing().onMenuSelected(profile, item, src);
                                });
                                popp=pop.get(0);
                                //set pool to parent
                                popp.$hideMenuPool = profile.$hideMenuPool || profile.getSubNode('POOL');

                                profile[all][itemId] = pop;

                                //collect
                                profile[showp] = profile[showp] || [profile];
                                popp[showp] = profile[showp];
                                profile[showp].push(popp);
                            }else popp=pop.get(0);

                            //input a copy of root for group trigger
                            profile[popgrp].push(popp.getRoot()._get(0));
                            popp[popgrp] = profile[popgrp];

                            //set parent pop
                            popp.$parentPopMenu = profile;
                            profile.$childPopMenu = popp;

                            pop.pop(src, 2);
                            profile[sms] = pop;
                        }
                    }
                },
                onMouseout:function(profile, e, src){
                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        itemId = item.id,
                        action = true,
                        hl='$highLight',
                        t;
                    if(profile[hl] == src)return;

                    //if cursor move to submenu, keep the hover face
                    if(t=profile.$subPopMenuShowed){
                        var node = e.toElement||e.relatedTarget,
                            target = t.get(0).getRootNode();
                        try{
                            do{
                                if(node==target)
                                    return;
                            }while((node && (node=node.parentNode)))
                        }catch(a){}
                    }
                    xui.use(src).tagClass('-mouseover',false);
                    profile[hl] = null;
                },
                onClick:function(profile, e, src){
                    var prop = profile.properties,
                        item = profile.getItemByDom(src),
                        itemId = item.id;
                    if(prop.disabled || item.disabled)return false;

                    // give a change to click an item with sub popmenu
                    if(!item.group){
                        if(item.type=='checkbox')
                            profile.getSubNodeByItemId('CHECKBOX',item.id).tagClass('-checked', item.value = !item.value);
                        else if(item.type=='radiobox'){
                            profile.getSubNode('RADIOBOX',true).tagClass('-checked', false);
                            xui.arr.each(prop.items,function(o){
                                if(o.type=='radiobox')
                                    o.value=false;
                            });
                            profile.getSubNodeByItemId('RADIOBOX',item.id).tagClass('-checked', item.value = true);
                        }

                        if(profile.onMenuSelected)profile.boxing().onMenuSelected(profile, item, src);

                        if(prop.hideAfterClick){
                            xui.use(src).tagClass('-mouseover',false);
                            //hide all parent pop
                            xui.asyRun(function(){
                                var p=profile,q;
                                if(!p.renderId)return;
                                while(p){
                                    p.boxing().hide();
                                    p=(q=p).$parentPopMenu;
                                    q.$parentPopMenu = q.$subPopMenuShowed = null;
                                }
                                //reset
                                profile.$subPopMenuShowed = null;
                                if(profile.$popGrp)
                                    profile.$popGrp.length=0;
                            },100);
                        }
                    }
                },
                onFocus:function(profile, e, src){
                    var box = profile.getSubNode('BOX'),
                        top=box.scrollTop(), h=box.scrollHeight(),
                        n = xui.use(src).offsetTop();

                    if(n<top || n>top+h)
                        xui.use(src).offsetTop(top);

                    xui.use(src).onMouseover();
                },
                onKeydown : function(profile, e, src){
                    var item = profile.getItemByDom(src),
                        items = profile.properties.items,
                        key = xui.Event.getKey(e).key,
                        itemId = item.id,
                        flag,r,tid,node,t;

                    switch(key){
                        case 'enter':
                            xui(src).onClick();
                            break;
                        case 'up':
                            r=true;
                            flag=false;
                            xui.arr.each(items,function(o,i){
                                if(o.type == 'split')return;
                                if(flag){
                                    tid=o.id;
                                    return r=false;
                                }
                                if(o.id == itemId)flag=true;
                            },null,true);
                            //last
                            if(r)tid=items[items.length-1].id;
                            node = profile.getSubNodeByItemId('ITEM', tid).get(0);
                            break;
                        case 'down':
                            r=true;
                            flag=false;
                            xui.arr.each(items,function(o,i){
                                if(o.type == 'split')return;
                                if(flag){
                                    tid=o.id;
                                    return r=false;
                                }
                                if(o.id == itemId)flag=true;
                            });
                            //first
                            if(r)tid=items[0].id;
                            node = profile.getSubNodeByItemId('ITEM', tid).get(0);
                            break;
                        case 'left':
                            if(t=profile.$parentPopMenu){
                                if(t=profile.$parentPopMenu.$highLight)
                                    node = t;
                            }
                            break;
                        case 'right':
                            if((t=profile.$subPopMenuShowed) && t == profile.$allPops[itemId])
                                t.activate();
                            break;
                    }
                     if(node&&node.tagName)try{node.focus()}catch(e){}
                }
            },
            TOP:{
                onMouseover:function(profile){
                    profile.$scrollToTop=true;
                    profile.boxing()._scrollToTop();
                },
                onMouseout:function(profile){
                    profile.$scrollToTop=false;
                    profile.$scrollStep=null;
                },
                onClick:function(profile){
                    profile.$scrollStep*=2;
                }
            },
            BOTTOM:{
                onMouseover:function(profile){
                    profile.$scrollTobottom=true;
                    profile.boxing()._scrollToBottom();
                },
                onMouseout:function(profile){
                    profile.$scrollTobottom=false;
                    profile.$scrollStep=null;
                },
                onClick:function(profile){
                    profile.$scrollStep*=2;
                }
            },
            ITEMS:{
                afterKeydown:function(profile, e){
                    var key=xui.Event.getKey(e).key;
                    if(key=='tab' || key=='enter')
                        return true;
                    else if(key=='esc'){
                        //top
                        do{
                            profile.boxing().hide();
                        }while(profile = profile.$parentPopMenu)

                        return false;
                    }else return false;
                }
            },
            BORDER:{
                onMouseout:function(profile, e, src){
                    profile.box._mouseout(profile, e, src);
                }
            }
        },
        DataModel:({
            dock:null,
            tabindex:null,
            tips:null,
            border:null,
            resizer:null,
            showEffects:"Blur",
            hideEffects:"",
            autoTips:false,
            shadow:true,
            _maxHeight:260,
            _maxWidth:300,
            left:-10000,

            hideAfterClick:true,

            autoHide:false,

            height:{
                $spaceunit:1,
                ini:'auto'
            },
            //opera needs more space for initialize
            width:{
                $spaceunit:1,
                ini:'auto'
            },
            position:'absolute',
            noIcon:{
                ini:false,
                action:function(){
                    this.boxing().refresh();
                }
            },
            $hborder:0,
            $vborder:0
        }),
        EventHandlers:{
            onShowSubMenu:function(profile, item, src){},
            beforeHide:function(profile,e){},
            onHide:function(profile){},
            onMenuSelected:function(profile, item, src){}
        },
        RenderTrigger:function(){
            this.boxing().adjustSize();
        },
        _beforeSerialized:function(profile){
            var o=arguments.callee.upper.call(this, profile),
                op=o.properties;
            delete op.left;delete op.top;delete op.right;delete op.bottom;delete op.width;delete op.height;
            return o;
        },
        _mouseout:function(profile, e){
            if(profile.properties.autoHide){
                var p1=xui.Event.getPos(e),
                    size, p2, b;
                xui.arr.each(profile.$popGrp,function(o){
                    o=xui([o]);
                    p2=o.offset();
                    size=o.cssSize();
                    if(p1.left>=p2.left && p1.top>=p2.top && p1.left<=p2.left+size.width && p1.top<=p2.top+size.height){
                        b=1;return false;
                    }
                });
                if(!b){
                    while(b=profile.$parentPopMenu)profile=b;
                    profile.boxing().hide(true,null,e);
                    if(profile.$popGrp)
                        profile.$popGrp.length=0;
                }
            }
        },
        _prepareData:function(profile){
            var data = arguments.callee.upper.call(this, profile),
                NONE='display:none',
                prop=profile.properties;
            if(prop.noIcon)data._iconDisplay=NONE;
            return data;
        },
        _prepareItem:function(profile, item){
            var NONE='display:none;',
                prop=profile.properties;

            item.add = item.add || '';
            item.displayAdd = item.add?'':NONE;
            item.displaySub = item.sub?'':NONE;
            item._itemDisplay=item.hidden?NONE:'';

            item._iconDisplay=prop.noIcon?NONE:'';

            item.type=item.type||'button';
            if(item.type=='checkbox'){
                item._fi_checkboxCls1 = 'xui-uicmd-check';
                item._fi_checkboxCls2 = item.value?'xuicon-checked xui-uicmd-check-checked':'';
            }
            else if(item.type=='radiobox'){
                item._fi_radioboxCls1 = 'xui-uicmd-radio';
                item._fi_radioboxCls2 = item.value?'xuicon-checked xui-uicmd-radio-checked':'';
            }
        },
        _onresize:null
    }
});