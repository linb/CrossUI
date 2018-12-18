xui.Class("xui.UI.MenuBar",["xui.UI","xui.absList" ],{
    Instance:{
        updateItem:function(subId,options){
            var self=this,
                profile=self.get(0),
                items=profile.properties.items;
            //the root
            if(xui.arr.subIndexOf(items,"id",subId)!=-1)
                arguments.callee.upper.call(self,subId,options);
            //try each sub popmenu
            else{
                var ok=0;
                xui.each(profile.$allPops,function(o){
                    o.updateItem(subId,options);
                    ok=1;
                });
                if(!ok)
                    arguments.callee.upper.call(self,subId,options);
            }
            return self;
        },
        _pop:function(item,src){
            var self=this,
                profile=self.get(0);
            //hide first, ignoreEffects false,true
            if(profile.$curPop)self.hide();

            if(!item.sub)return ;

            if(profile.beforePopMenu && false==profile.boxing().beforePopMenu(profile, item, src)){
                return;
            }else{
                
                xui.use(src).tagClass('-active');
                
                var menu, 
                    id=item.id,
                    pro=profile.properties,
                    pid=pro.parentID||xui.ini.$rootContainer,
                    all='$allPops';
                
                profile.$curPop=id;
                profile.$curElem=src;
                profile.$menuPop = id;

                profile[all] = profile[all] || {};
                if(!profile[all][id]){
                    var callback=function(sub){
                        var hash={position:'absolute', items:sub, autoHide:!!pro.autoShowTime};
                        if(pro.showEffects)hash.showEffects=pro.showEffects;
                        if(pro.hideEffects)hash.hideEffects=pro.hideEffects;
                        var menu = xui.create('PopMenu',hash);
                        profile.getSubNode('POOL').append(menu);
                        menu.onHide(function(pro){
                            self.hide(false);
                        }).onMenuSelected(function(pro, item, src){
                            return profile.boxing().onMenuSelected(profile, pro, item, src);
                        }).onShowSubMenu(function(pro, item, src){
                            return profile.boxing().onShowSubMenu(profile, pro, item, src);
                        });
                        menu.get(0).$hideMenuPool = profile.getSubNode('POOL');
                        menu.get(0)[all] = profile[all];
                        profile[all][id] = menu;
                    }

                    if(xui.isArr(item.sub) && item.sub.length)
                        callback(item.sub);
                    else if(profile.onGetPopMenu){
                        var r=profile.boxing().onGetPopMenu(profile, item, callback);
                        if(xui.isArr(r) && r.length)
                            callback(item.sub=r);
                    }
                }
                // popmenu
                if(profile[all][id])
                    profile[all][id].pop(xui(src), 1, pid ? xui.get(profile,["host", pid]) ? profile.host[pid].getContainer(): xui(pid) : null);

                return false;
            }
        },
        _afterInsertItems:function(){
            this.clearPopCache();
        },
        hide:function(ignoreEffects){
            var profile=this.get(0),menu,
            id = profile.$curPop,
            node = profile.$curElem;

            if(menu = profile.$allPops[id]){
                //To avoid trigger recursive call
                if(false!==arguments[0])
                    menu.hide(false,ignoreEffects);
                // collect
                profile.getSubNode('POOL').append(menu.reBoxing());
                xui([node]).tagClass('-active',false);
            }
            profile.$menuPop=profile.$curPop=profile.$curElem=null;
        },
        clearPopCache:function(){
            var profile=this.get(0);
            if(profile.renderId){
                profile.getSubNode('POOL').empty();
                profile.$allPops=profile.$curPop=profile.$curElem=null;
            }
        }
    },
    Initialize:function(){
        xui.SC('xui.UI.PopMenu');
    },
    Static:{
        _nocap2tip:true,
        Templates:{
            tagName:'div',
            className:'{_className}',
            style:'{_style}',
            POOL:{
                tagName:'div'
            },
            BORDER:{
                className:'xui-uibar xui-uiborder-outset xui-uiborder-radius',
                tagName:'div',
                LIST:{
                    tagName:'div',
                    HANDLER:{
                        className:'xuifont',
                        $fonticon:'xui-icon-placeholder',
                        style:'{handler}'
                    },
                    ITEMS:{
                        $order:1,
                        text:"{items}"
                    }
                }
            },
            $submap:{
                items:{
                    ITEM:{
                        style:'{itemStyle}{_itemDisplay}',
                        className:'xui-uimenu',
                        ITEMI:{
                            ITEMC:{
                                ITEMA:{
                                    tabindex: '{_tabindex}',
                                    className:' {typeCls} {disabled}',
                                    ICON:{
                                        $order:1,
                                        className:'xuicon {imageClass}  {picClass}',
                                        style:'{backgroundImage}{backgroundPosition}{backgroundSize}{backgroundRepeat}{iconFontSize}{imageDisplay}{iconStyle}',
                                        text:'{iconFontCode}'
                                    },
                                    CAPTION:{
                                        $order:2,
                                        text : '{caption}',
                                        style:'{captionDisplay}'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        Appearances:{
            KEY:{
                position:'absolute',
                left:0,
                top:0
            },
            POOL:{
                width:0,
                height:0,
                visibility:'hidden',
                position:'absolute',
                left:'-10000px',
                top:'-10000px'
            },
            BORDER:{
                left:0,
                top:0
            },
            HANDLER:{
                height:'100%',
                width:'0.5em',
                background:'url('+xui.ini.img_handler+') repeat-y left top',
                cursor:'move',
                'vertical-align':'middle'
            },
            LIST:{
                padding:'.125em'
            },
            ITEMS:{
                'vertical-align':'middle'
            },
            ITEM:{
                'white-space': 'nowrap',
                'vertical-align':'top',
                overflow:'hidden',
                margin:'0 .25em 0 .25em',
                'padding-right':'.5em'
            },
            'ITEM *':{
                cursor:'pointer'
            },
            ITEMI:{
                'padding':'0 .25em',
                'vertical-align':'top'
            },
            ITEMC:{
                'padding':'.25em 0',
                'vertical-align':'top'
            },
            ITEMA:{
                display:xui.$inlineBlock
            },
            CAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                'font-size':'1em'
            }
        },
        Behaviors:{
            ITEM:{
                onMouseover:function(profile, e, src){
                    var p = profile.properties, ns=src;
                    if(p.disabled)return;
                    var item = profile.getItemByDom(src),
                        itemId = item.id;
                    if(item.disabled)return;
                    xui.use(ns).tagClass('-hover');

                    if(profile.$menuPop){
                        if(profile.$menuPop != itemId){
                            //show current popmenu
                            profile.boxing()._pop(item, ns);
                        }
                    }else{
                        if(p.autoShowTime){
                            xui.resetRun(profile.$xid+':autoShowTime', function(){
                                profile.boxing()._pop(item, ns);
                            },p.autoShowTime);
                        }
                    }
                },
                onMouseout:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled)return;
                    var item = profile.getItemByDom(src);
                    if(item.disabled)return;
                    xui.use(src).tagClass('-hover',false);

                    if(p.autoShowTime){
                        var pop = profile.$allPops;
                        if(pop=pop && pop[profile.$curPop]){
                            var node=pop.get(0).getRoot(),
                                p1=xui.Event.getPos(e),
                                size=node.cssSize(),
                                add=3,
                                p2=node.offset();

                            if(p1.left>p2.left && p1.top>p2.top-add && p1.left<p2.left+size.width && p1.top<p2.top+size.height){}else
                                pop.hide();
                        }
                        xui.resetRun(profile.$xid+':autoShowTime', null);
                    }
                },
                onMousedown:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled)return;
                    var item = profile.getItemByDom(src),
                        itemId = item.id;
                    if(item.disabled)return;

                    xui.use(src).tagClass('-active');
                    
                    // if poped, stop to trigger document.body's onmousedown event
                    return profile.boxing()._pop(item, src);                    
                },
                onMouseup:function(profile,e,src){
                    var item = profile.getItemByDom(src);
                    if(profile.$menuPop != item.id)
                        xui.use(src).tagClass('-active',false);
                },
                onKeydown:function(profile, e, src){
                    var keys=xui.Event.getKey(e), key = keys.key, shift=keys.shiftKey,
                    cur = xui(src),
                    first = profile.getRoot().nextFocus(true, true, false),
                    last = profile.getRoot().nextFocus(false, true, false);

                    switch(xui.Event.getKey(e).key){
                        case 'tab':
                            if(shift){
                                if(cur.get(0)!=first.get(0)){
                                    first.focus(true);
                                    return false;
                                }
                            }else{
                                if(cur.get(0)!=last.get(0)){
                                    last.focus(true);
                                    return false;
                                }
                            }
                            break;
                        case 'left':
                        case 'up':
                            var next = cur.nextFocus(false, true, false);
                            if(cur.get(0)==first.get(0))
                                last.focus(true);
                            else
                                cur.nextFocus(false);
                            return false;
                            break;
                        case 'right':
                        case 'down':
                            var next = cur.nextFocus(true, false, false);
                            if(cur.get(0)==last.get(0))
                                first.focus(true);
                            else
                                cur.nextFocus();
                            return false;
                            break;
                        case 'enter':
                            cur.onMousedown();
                            break;
                    }
                },
                onClick:function(profile, e, src){
                    var item = profile.getItemByDom(src);
                    if(profile.$menuPop != item.id)
                        if(profile.onMenuBtnClick)
                            profile.boxing().onMenuBtnClick(profile, item, src);
                }
            }
        },
        DataModel:{
            listKey:null,
            dragSortable:null,
            autoTips:false,
            //can't change height
            height:{
                $spaceunit:1,
                ini:'auto',
                readonly:true
            },
                
            width:{
                $spaceunit:1,
                ini:'auto'
            },
            parentID:'',
            $hborder:1,
            $vborder:1,
            left:0,
            top:0,

            autoShowTime:200,

            handler:{
                ini:true,
                action:function(v){
                    this.getSubNode('HANDLER').css('display',v?'':'none');
                }
            },
            position:'absolute',
            dock:{
                ini:'top',
                listbox:['top','bottom']
            }
        },
        LayoutTrigger:function(){
            var v=this.properties,nd=this.getSubNode("BORDER");
            v.$hborder=v.$vborder= nd._borderW('left');
        },
        EventHandlers:{
            onGetPopMenu:function(profile, item, callback){},
            onMenuBtnClick:function(profile, item, src){},
            beforePopMenu:function(profile, item, src){},
            onShowSubMenu:function(profile, popProfile, item, src){},
            onMenuSelected:function(profile, popProfile, item, src){}
        },
        RenderTrigger:function(){
            if(this.properties.disabled)this.boxing().setDisabled(true,true);
        },
        _prepareData:function(profile){
            var none='display:none;';
            var data=arguments.callee.upper.call(this, profile);
            data.handler = data.handler?'':none;
            data._itemDisplay=data.hidden?none:'';
            return data;
        }
    }
});

