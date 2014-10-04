Class("xui.UI.MenuBar",["xui.UI","xui.absList" ],{
    Instance:{
        updateItem:function(subId,options){
            var self=this,
                profile=self.get(0),
                items=profile.properties.items;
            //the root
            if(_.arr.subIndexOf(items,"id",subId)!=-1)
                arguments.callee.upper.call(self,subId,options);
            //try each sub popmenu
            else{
                var ok=0;
                _.each(profile.$allPops,function(o){
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
                
                xui.use(src).tagClass('-mousedown');
                
                var menu, 
                    id=item.id,
                    pro=profile.properties,
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

                    if(_.isArr(item.sub) && item.sub.length)
                        callback(item.sub);
                    else if(profile.onGetPopMenu){
                        var r=profile.boxing().onGetPopMenu(profile, item, callback);
                        if(_.isArr(r) && r.length)
                            callback(item.sub=r);
                    }
                }
                // popmenu
                if(profile[all][id])
                    profile[all][id].pop(xui(src), 1, xui(pro.parentID));

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
                xui([node]).tagClass('-mousedown',false);
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
                className:'xui-uibg-bar xui-uiborder-outset',
                tagName:'div',
                LIST:{
                    tagName:'div',
                    HANDLER:{
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
                        ITEMI:{
                            ITEMC:{
                                ITEMA:{
                                    tabindex: '{_tabindex}',
                                    className:' {typeCls} {disabled}',
                                    ICON:{
                                        $order:1,
                                        className:'xui-ui-icon {imageClass}',
                                        style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
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
                'font-size':0,
                'line-height':0,
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
                top:0,
                'font-size':0,
                'line-height':0
            },
            HANDLER:{
                height:'22px',
                width:'7px',
                'background-image':xui.UI.$bg('handler.gif', '',true),
                'background-position':'left top',
                cursor:'move',
                'vertical-align':'middle'
            },
            LIST:{
                padding:'2px'
            },
            ITEMS:{
                'vertical-align':'middle'
            },
            'LIST-disabled':{
                'background-color':'#E4E4E4'
            },
            'ITEM-mouseover, ITEM-mouseover ITEMI, ITEM-mouseover ITEMC, ITEM-mousedown, ITEM-mousedown ITEMI, ITEM-mousedown ITEMC':{
                'background-image':xui.UI.$bg('button.gif', '',true),
                'background-repeat':'no-repeat'
           },
            ITEM:{
                height:'22px',
                'white-space': 'nowrap',
                'vertical-align':'top',
                overflow:'hidden',
                margin:'0  3px 0 3px',
                'padding-right':'6px',
                'font-size':0,
                'line-height':0
            },
            'ITEM *':{
                cursor:'pointer'
            },
            ITEMI:{
                height:'22px',
                'padding-left':'6px',
                'vertical-align':'top'
            },
            ITEMC:{
                height:'22px',
                'padding-top':'3px',
                'vertical-align':'top'
            },
            ITEMA:{
                display:xui.$inlineBlock
            },
            'ITEM-mouseover':{
                $order:2,
                'background-position':'right -90px'
            },
            'ITEM-mousedown':{
                $order:3,
                'background-position':'right -180px'
            },
            'ITEM-mouseover ITEMI':{
               $order:2,
                'background-position':'left -150px'
            },
            'ITEM-mousedown ITEMI':{
                $order:3,
                'background-position':'left -240px'
            },            
            'ITEM-mouseover ITEMC':{
                $order:2,
                'background-position':'left -120px',
                'background-repeat': 'repeat-x'
            },
            'ITEM-mousedown ITEMC':{
                $order:3,
                'background-position':'left -210px',
                'background-repeat': 'repeat-x'
            },            
            CAPTION:{
                'font-size':'12px',
                'line-height':'14px',
                'vertical-align':xui.browser.ie6?'baseline':'middle'
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
                    xui.use(ns).tagClass('-mouseover');

                    if(profile.$menuPop){
                        if(profile.$menuPop != itemId){
                            //show current popmenu
                            profile.boxing()._pop(item, ns);
                        }
                    }else{
                        if(p.autoShowTime){
                            _.resetRun(profile.$xid+':autoShowTime', function(){
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
                    xui.use(src).tagClass('-mouseover',false);

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
                        _.resetRun(profile.$xid+':autoShowTime', null);
                    }
                },
                onMousedown:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled)return;
                    var item = profile.getItemByDom(src),
                        itemId = item.id;
                    if(item.disabled)return;

                    xui.use(src).tagClass('-mousedown');
                    
                    // if poped, stop to trigger document.body's onmousedown event
                    return profile.boxing()._pop(item, src);                    
                },
                onMouseup:function(profile,e,src){
                    var item = profile.getItemByDom(src);
                    if(profile.$menuPop != item.id)
                        xui.use(src).tagClass('-mousedown',false);
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
                                    first.focus();
                                    return false;
                                }
                            }else{
                                if(cur.get(0)!=last.get(0)){
                                    last.focus();
                                    return false;
                                }
                            }
                            break;
                        case 'left':
                        case 'up':
                            var next = cur.nextFocus(false, true, false);
                            if(cur.get(0)==first.get(0))
                                last.focus();
                            else
                                cur.nextFocus(false);
                            return false;
                            break;
                        case 'right':
                        case 'down':
                            var next = cur.nextFocus(true, false, false);
                            if(cur.get(0)==last.get(0))
                                first.focus();
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
            autoTips:false,
            //can't change height
            height:{
                ini:'auto',
                readonly:true
            },
                
            width:'auto',
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
            var data=arguments.callee.upper.call(this, profile);
            data.handler = data.handler?'':'display:none';
            return data;
        }
    }
});

