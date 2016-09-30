Class("xui.UI.Tabs", ["xui.UI", "xui.absList","xui.absValue"],{
    Instance:{
        _setCtrlValue:function(value){
            this.each(function(profile){
                var id=profile.domId,
                    box = profile.boxing(),
                    uiv = box.getUIValue(),
                    prop = profile.properties,
                    dm=profile.box.$DataModel,
                    mcap=profile.getSubNode('MENUCAPTION'),
                    fold=function(itemId, arr){
                        var subId = profile.getSubIdByItemId(itemId),
                            item = profile.getItemByItemId(itemId);
                        if(subId){
                            arr.push(subId);
                            
                            if(!dm.hasOwnProperty("noPanel") || !prop.noPanel){
                                // hide pane
                                //box.getPanel(itemId).hide();
                                var pn=box.getPanel(itemId).get(0);
                                if(pn && (item._scrollTop=pn.scrollTop||0))
                                    pn.scrollTop=0;

                                box.getPanel(itemId).css('display','none');
                            }
                        }
                    },
                    expand = function(itemId, arr){
                        var subId = profile.getSubIdByItemId(itemId),
                            item=profile.getItemByItemId(itemId);
                        if(subId){
                            arr.push(subId);
                            mcap.html(item.caption);
                            if(!dm.hasOwnProperty("noPanel") || !prop.noPanel){
                                // show pane
                                //box.getPanel(value).css('position','relative').show('auto','auto');
                                box.getPanel(itemId).css('display','block');
                                if(item._scrollTop)
                                    box.getPanel(itemId).get(0).scrollTop=item._scrollTop;

                                var t=profile.getRootNode().style;
                                //reset width and height
                                xui.UI.$tryResize(profile, t.width, t.height, true, value);
                                t=null;

                                profile.box._forLazyAppend(profile, item, value);
                                profile.box._forIniPanelView(profile, item);
                            }
                        }
                    };
                var arr1=[],arr2=[];
                if(dm.hasOwnProperty("selMode") &&
                    dm.hasOwnProperty("noPanel") &&
                    prop.noPanel &&
                    prop.selMode=="multi"){

                    uiv = uiv?uiv.split(prop.valueSeparator):[];
                    xui.arr.each(uiv,function(key){
                        fold(key, arr1);
                    });
                    value = value?value.split(prop.valueSeparator):[];
                    var lastV="";
                    xui.arr.each(value,function(key){
                        var l=arr2.length;
                        expand(key, arr2);
                        // the last one
                        if(l<arr2.length)
                            lastV=key;
                    });
                }else{
                    fold(uiv, arr1);
                    expand(value, arr2);
                }

                if(arr1.length){
                    profile.getSubNodes('ITEM',arr1).tagClass('-checked',false);
                }
                if(arr2.length){
                    profile.getSubNodes('ITEM',arr2).tagClass('-checked');
                }

            });
        },
        append:function(target,subId, pre, base){
            var p=this.get(0).properties;
            if(subId=subId||p.$UIvalue||p.value)
                arguments.callee.upper.call(this, target, subId+'', pre, base);
            return this;
        },
        getCurPanel:function(){
            var profile = this.get(0),
                dm=profile.box.$DataModel,
                v=profile.properties.$UIvalue;
            if(dm.hasOwnProperty("noPanel") && dm.hasOwnProperty("selMode") && profile.properties.selMode=='multi'){
                v=v.split(prop.valueSeparator);
                v=v[0]||null;
            }
            return v?this.getPanel(v):null;
        },
        // get pane in page views
        getPanel:function(subId){
            var profile = this.get(0);
            return profile.getSubNodeByItemId('PANEL', subId+'');
        },
        ////
        addPanel:function(paras, children, item){
            var i={},
                id = item&&item.id,
                items = this.getItems(),
                id2=paras.id||paras.tag;
            if(items.length){
                if(-1!=xui.arr.subIndexOf(items,'id',id2))
                    return false;

                if(!id)
                    id = items[items.length-1].id;
            }

            xui.merge(i, {
                caption:paras.caption,
                image:paras.image,
                closeBtn:paras.closeBtn || false,
                popBtn:paras.popBtn || false,
                optBtn:paras.optBtn || false,
                imagePos:paras.imagePos,
                dragKey:paras.dragKey,
                dropKeys:paras.dropKeys,
                id : paras.id || paras.tag || xui.id()
            });

            this.insertItems([i], id);
            var arr=[];
            xui.arr.each(children,function(o){
                arr.push(o[0]);
            });
            this.append(xui.UI.pack(arr,false), i.id);

            return this;
        },
        removePanel:function(domId){
            var self=this,
                item = self.getItemByDom(domId);
            return self.removeItems([item.id]);
        },
        getPanelPara:function(domId){
            var profile=this.get(0),
                pp=profile.properties,
                item = profile.getItemByDom(domId),
                paras = xui.clone(item,false);
            if(!paras.dragKey)paras.dragKey=pp.dragKey;
            if(!paras.dropKeys)paras.dropKeys=pp.dropKeys;
            return paras;
        },
        getPanelChildren:function(domId){
            var profile=this.get(0),
                id = profile.getItemIdByDom(domId),
                arr=[];
            if(id)
                xui.arr.each(profile.children,function(o){
                    if(o[1]==id)arr.push(o);
                });
            return arr;
        },

        resetPanelView:function(subId, removeChildren, destroyChildren){
            if(!xui.isSet(removeChildren))removeChildren=true;
            if(!xui.isSet(destroyChildren))destroyChildren=true;
            var ins,item;
            return this.each(function(profile){
                if(profile.renderId){
                    xui.arr.each(profile.properties.items,function(o){
                        if(subId===true || (subId+'')===o.id)
                            delete o._$ini;
                    });
                    if(removeChildren)
                        profile.boxing().removeChildren(subId,destroyChildren)
                }
            });
        },
        iniPanelView:function(subId){
            return this.each(function(profile){
                if(subId){
                    if(subId=profile.getItemByItemId(subId+'')){
                        profile.box._forIniPanelView(profile, subId);
                    }
                }else{
                    xui.arr.each(profile.properties.items,function(item){
                        profile.box._forIniPanelView(profile, item);
                    });
                }
            });
        },
        
        ////
        fireItemClickEvent:function(subId){
            var node=this.getSubNodeByItemId('ITEM', subId+''),ev=xui.Event;
            node.onClick(true);

            //if(ev.__realtouch)ev.__simulatedMousedown=1;
            //node.onMousedown(true).onMouseup(true);
            //if(ev.__realtouch)ev.__simulatedMousedown=0;
            return this;
        },
        /* insert some views to pageView widgets
            arr: hash(view properties) or array of hash
            before: views will insert before it, string
        */
        _afterInsertItems:function(profile, data){
            if(!profile.renderId)return;
            var box=profile.box,obj,v,pp=profile.properties;
            if(obj=profile.getSubNode(profile.keys.BOX||profile.keys.KEY)){
                // add panels anyway
                obj.append(profile._buildItems('panels', data));
                // for stacks only
                if(!profile.box.$DataModel.hasOwnProperty("noPanel") ){
                    if(!(v=this.getUIValue()))
                        this.fireItemClickEvent((v=pp.items[0]) && v.id);
                }
                var t=profile.getRootNode().style;
                xui.UI.$tryResize(profile, t.width, t.height, true);
                t=null;
            }
        },
        /*  remove some views from pageView
            arr: array for id
        */
        removeItems:function(arr){
            var self=this,
                p,obj,serialId;
            self.each(function(profile){
                var p=profile.properties;
                arr = xui.isArr(arr)?arr:(arr+"").split(p.valueSeparator);
                if(!profile.box.$DataModel.hasOwnProperty("noPanel") || !profile.properties.noPanel)
                    xui.arr.each(arr,function(o){
                        // get ui serial id
                        serialId=profile.getSubIdByItemId(o+"");
                        if(serialId && !(obj = profile.getSubNode('PANEL', serialId) ).isEmpty() ){
                            // remove ui
                            obj.remove();
                        }
                    });
            });
            arguments.callee.upper.apply(self,arguments);

            self.each(function(profile){
                if(!profile.boxing().getUIValue()){
                    xui.asyRun(function(){
                        if(!profile || !profile.renderId || !profile.properties || !profile.properties.items.length)return;
                        var i;
                        profile.boxing().fireItemClickEvent((i=profile.properties.items[0]) && i.id);
                    });
                }

                var t=profile.getRootNode().style;
                xui.UI.$tryResize(profile, t.width, t.height, true);
                t=null;
            });

            return self;
        },
        clearItems:function(){
            var self=this;
            self.each(function(profile){
                if(!profile.box.$DataModel.hasOwnProperty("noPanel") || !profile.properties.noPanel)
                    profile.getSubNode('PANEL',true).remove();
            });
            self.setValue(null,true,'clear');
            arguments.callee.upper.apply(self,arguments);
            return self;
        },
        markItemCaption:function(subId, mark, force){
            var profile = this.get(0);
            subId=profile.getItemByItemId(subId+'');

            if((subId._dirty !=mark) || force){
                var id = subId.id,
                    caption = profile.getItemByItemId(id).caption;
                profile.getSubNodeByItemId('CAPTION', id).html(
                    profile.getItemByItemId(id).caption=mark?('*'+caption):caption.replace(/^\*/,'')
                ).css({color:mark?'#ff0000':'','font-weight':mark?'bold':''});
                subId._dirty=mark;
            }
            return this;
        }
    },
    Static:{
        Templates:{
            tagName : 'div',
            style:'{_style};',
            className:'{_className}',
            LIST:{
                $order:1,
                tagName : 'div',
                style:'{_liststyle}',
                LISTBG:{
                     $order:0,
                     className:'xui-uiborder-t xui-uiborder-b xui-uiborder-dark xui-uibar-checked'
                },
                MENU:{
                    className:'xui-ui-unselectable xui-uiborder-hidden xui-uiborder-radius',
                    MENUICON:{
                        className:'xuicon',
                        $fonticon:'xui-icon-menu'
                    },
                    MENUCAPTION:{}
                },
                MENU2:{
                    tagName:'div',
                    className:'xui-ui-unselectable',
                    MENUICON2:{
                        className:'xui-uiborder-hidden xui-uiborder-radius xuicon',
                        $fonticon:'xui-icon-menu'
                    }
                },
                ITEMS:{
                    tagName : 'div',
                    className:'xui-ui-unselectable',
                    text:"{items}",
                    style:'{HAlign}'
                }
            },
            PNAELS:{
                $order:2,
                tagName:'text',
                text:'{panels}'
            },
            $submap:{
                items:{
                    ITEM:{
                        className:'xui-uiborder-flat xui-uiborder-nob xui-uiborder-box xui-uiborder-radius-big-tl xui-uiborder-radius-big-tr xui-uibar {itemClass} {disabled} {readonly}',
                        style:'{_itemDisplay} {itemStyle}',
                        ITEMI:{
                            ITEMC:{
                                HANDLE:{
                                    tabindex: '{_tabindex}',
                                    className:'xui-showfocus',
                                    IBWRAP:{
                                        tagName:'div',
                                        style:"white-space:nowrap;",
                                        RULER:{},
                                        ICON:{
                                            $order:0,
                                            className:'xuicon {imageClass}',
                                            style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}',
                                            text:'{fontCode}'
                                        },
                                        CAPTION:{
                                            text: '{caption}',
                                            className:"xui-title-node",
                                            style:'{itemWidth};{itemAlign}',
                                            $order:1
                                        },
                                        CMDS:{
                                            $order:2,
                                            OPT:{
                                                $order:1,
                                                className:'xuifont',
                                                $fonticon:'xui-uicmd-opt',
                                                style:'{_opt}'
                                            },
                                            POP:{
                                                className:'xuifont',
                                                $fonticon:'xui-uicmd-pop',
                                                style:'{popDisplay}',
                                                $order:1
                                            },
                                            CLOSE:{
                                                className:'xuifont',
                                                $fonticon:'xui-uicmd-close',
                                                style:'{closeDisplay}',
                                                $order:2
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                panels:{
                    PANEL:{
                        tagName : 'div',
                        className:'xui-uibase xui-uicontainer',
                        style:"{_overflow};{_bginfo}",
                        text:'{html}'+xui.UI.$childTag
                    }
                }
            }
        },
        Appearances:{
            KEY:{
                position:'absolute',
                overflow:'hidden'
            },
            LIST:{
                position:'relative',
                overflow:'hidden',
                left:0,
                width:'100%',
                padding:'.25em .25em 0 .25em ',
                'white-space': 'nowrap'
            },
            LISTBG:{
                position:'absolute',
                overflow:'hidden',
                left:0,
                bottom:0,
                height:'3px',
                width:'100%'                
            },
            MENU:{
                display:'none',
                margin:'.25em',
                padding:'.16667em',
                cursor:'pointer'
            },
            MENU2:{
                display:'none'
            },
            MENUICON:{
                'vertical-align':xui.browser.ie6?'baseline':'middle'
            },
            MENUCAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                margin:'0 4px',
                'font-size':'1em'
            },
            ITEMS:{
                padding:'0 0 4px 0',
                position:'relative',
                left:0,
                top:0,
                'white-space':'nowrap'
            },
            'ITEMS-icon CAPTION, ITEMS-icon CMDS, ITEMS-icon2 CAPTION, ITEMS-icon2 CMDS':{
                display:'none'
            },
            'ITEMS-menu ITEM':{
                display:'none'
            },
            ITEM:{
                $order:0,
                cursor:'pointer',
                'padding':'0 .5em 0 0',
                'vertical-align':'top',
                'margin':'0 .25em',
                'border-bottom':0,
                'border-radius':'6px 6px 0 0',
                '-moz-border-radius': '6px 6px 0 0',
                '-webkit-border-radius': '6px 6px 0 0',
                '-o-border-radius': '6px 6px 0 0',
                '-ms-border-radius': '6px 6px 0 0',
                '-khtml-border-radius': '6px 6px 0 0'
            },
            ITEMI:{
                $order:0,
                'padding-left':'.5em',
                //keep this same with ITEM
                'vertical-align':'top'
            },
            ITEMC:{
                $order:0,
                padding:'.5em 0 .25em 0',
                //keep this same with ITEM
                'vertical-align':'top',
                'text-align': 'center'
            },
            HANDLE:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                cursor:'pointer',
                'vertical-align':'middle',
                padding:0
            },
            'ITEM-checked HANDLE':{
                'padding-bottom':'1px'
            },
            RULER:{
                height:'1.5em',
                width:'0',
                'vertical-align':'middle'
            },
            PANEL:{
                position:'relative',
                //visibility:'hidden',
                //top:'-10000px',
                //left:'-10000px',
                display:'none',
                width:'100%',
                overflow:'auto'
            },
            CAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                margin:'0 4px',
                overflow: 'hidden'
            },
            CMDS:{
                'vertical-align':'middle'
            }
        },
        Behaviors:{
            NOTIPS:["GROUP","HANDLER"],
            DroppableKeys:['PANEL','KEY', 'ITEM'],
            PanelKeys:['PANEL'],
            DraggableKeys:['ITEM'],
            HoverEffected:{ITEM:'ITEM',MENU:'MENU',MENU2:'MENU2',MENUICON2:'MENUICON2',OPT:'OPT',CLOSE:'CLOSE',POP:'POP'},
            ClickEffected:{ITEM:'ITEM',MENU:'MENU',MENU2:'MENU2',MENUICON2:'MENUICON2',OPT:'OPT',CLOSE:'CLOSE',POP:'POP'},
            onSize:xui.UI.$onSize,
            CAPTION:{
                onMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!='left')return;
                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        box = profile.boxing();

                    if(properties.disabled || item.disabled)return false;
                    if(properties.readonly || item.readonly)return false;
                    if(box.getUIValue() == item.id){
                         if(profile.onCaptionActive)
                            profile.boxing().onCaptionActive(profile, profile.getItemByDom(src), e, src);
                    }
                }
            },
            ITEM:{
                onClick:function(profile, e, src){
                    if(xui.Event.getBtn(e)!='left')return false;
                    var t;
                    if((t=xui.Event.getSrc(e).parentNode) && t.id && (profile.getKey(t.id))==profile.keys.CMDS)return false;

                    var prop = profile.properties,
                        dm=profile.box.$DataModel,
                        itemId = profile.getSubId(src),
                        item = profile.getItemByDom(src),
                        box = profile.boxing();

                    if(prop.disabled || item.disabled)return false;
                    if(prop.readonly || item.readonly)return false;

                    //for some input onblur event
                    //profile.getSubNode('HANDLE', itemId).focus();

                    if(dm.hasOwnProperty("selMode") &&
                        dm.hasOwnProperty("noPanel") &&
                        prop.noPanel &&
                        prop.selMode=="multi"){

                        var value = box.getUIValue(),
                            arr = value?value.split(prop.valueSeparator):[],
                            checktype=1,
                            rt=false,
                            rt2=false;
                        // for multi selection
                        if(arr.length){
                            //for select
                            if(xui.arr.indexOf(arr,item.id)!=-1){
                                xui.arr.removeValue(arr,item.id);
                                checktype=-1
                            }else
                                arr.push(item.id);

                            arr.sort();
                            value = arr.join(prop.valueSeparator);

                            //update string value only for setCtrlValue
                            if(box.getUIValue() == value)
                                rt=false;
                            else{
                                box.setUIValue(value,null,null,'md');
                                if(box.get(0) && box.getUIValue() == value)
                                    rt=box.onItemSelected(profile, item, e, src, checktype)||rt2;
                            }
                            return rt;
                        }

                    }
                    // for single selection
                    if(box.getUIValue() != item.id){
                        box.setUIValue(item.id,null,null,'md');
                        //if success
                        if(box.getUIValue() == item.id){
                            rt=box.onItemSelected(profile, item, e, src)||rt2;
                            return rt;
                        }
                    }
                }
            },
            HANDLE:{
                onKeydown:function(profile, e, src){
                    var keys=xui.Event.getKey(e), key = keys.key, shift=keys.shiftKey;
                    if(key==' '||key=='enter'){
                        profile.getSubNode('ITEM',profile.getSubId(src)).onClick();
                        return false;
                    }

                    var cur = xui(src),
                    target = profile.getSubNode('ITEMS'),
                    first = target.nextFocus(true, true, false),
                    last = target.nextFocus(false, true, false);

                    switch(key){
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
                    }
                }
            },
            OPT:{
                onClick:function(profile, e, src){
                    profile.boxing().onShowOptions(profile, profile.getItemByDom(src), e, src);
                    return false;
                }
            },
            CLOSE:{
                onClick:function(profile, e, src){
                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        uiv=properties.$UIvalue,
                        bak;

                    if(properties.disabled || item.disabled)return;
                    if(properties.readonly || item.readonly)return false;
                    var instance = profile.boxing();

                    if(false===instance.beforePageClose(profile, item, src)) return;

                    bak=xui.copy(item);

                    // if the current item is selected, select the next or the pre one item
                    if(uiv && uiv==item.id){
                        var items=properties.items,
                        index=xui.arr.subIndexOf(items,"id",item.id),
                        t,
                        nuiv=(t=items[index+1])?t.id:(t=items[index-1])?t.id:(t=items[0])?t.id:null;
                        if(nuiv && nuiv!=uiv){
                            profile.boxing().fireItemClickEvent(nuiv);
                        }
                    }

                    instance.removeItems(item.id);

                    instance.afterPageClose(profile, bak);

                    var t=profile.getRootNode().style;
                    xui.UI.$tryResize(profile, t.width, t.height,true);
                    t=null;

                    return false;
                }
            },
            POP:{
                onClick:function(profile, e, src){
                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        options={parent:null,host:null,properties:null,events:null,CS:null,CC:null,CB:null,CF:null,init:null},
                        id=item.id;
                    if(properties.disabled || item.disabled)return false;
                    if(properties.readonly || item.readonly)return false;

                    if(profile.beforePagePop && false==profile.boxing().beforePagePop(profile,item,options,e,src))
                        return false;

                    var panel = profile.boxing().getPanel(id),
                        pos = profile.getRoot().offset(),
                        size=profile.getRoot().cssSize(),
                        pro = xui.copy(xui.UI.Dialog.$DataStruct),
                        events={};
                    
                    xui.merge(pro, item, 'with');
                    xui.merge(pro,{
                        dragKey: item.dragkey || properties.dragKey ,
                        dock:'none',
                        tag:item.tag||item.id,
                        width:Math.max(size.width,200),
                        height:Math.max(size.height,100),
                        left:pos.left,
                        top:pos.top,
                        landBtn:true
                    },'all');
                    if(options.properties)
                        xui.merge(pro, options.properties, 'with');
                    
                    if(options.events)
                        xui.merge(events, options.events, 'all');

                    var dialog = new xui.UI.Dialog(pro,events,options.host||profile.host,options.CS||null,options.CC||null,options.CB||null,options.CF||null);

                    if(xui.isFun(options.init) && false===options.init(dialog,profile,options)){
                    }else{
                        dialog.show(options.parent||xui('body'));    
                        var arr=[];
                        xui.arr.each(profile.children,function(o){
                            if(o[1]==id){
                                arr.push(o[0]);
                            }
                        });
                        if(arr.length){
                            dialog.append(xui.UI.pack(arr,false));
                        }
                        profile.boxing().removeChildren(id).removeItems(id);
                    }
                    return false;
                }
            },
            MENU:{
                onMouseover:function(profile, e, src){
                    var menu=profile._droppopmenu;
                    if(menu)return;

                    var ins=profile.boxing(),
                        items=profile.properties.items,
                        nitems=[],
                        l=items.length,
                        ll;
                    if(items.length>10){
                        ll=Math.ceil(l/10);
                        for(var i=0;i<ll;i++)
                            nitems.push({caption:(i*10+1) + " - " + Math.min(l,((i+1)*10+1)), sub:[]});
                        xui.arr.each(items,function(item,i){
                            nitems[parseInt(i/10)].sub.push(xui.clone(item,false,1));
                        });
                    }else{
                        nitems=xui.clone(items,false,2);
                    }
                    //POPMENU
                    menu=profile._droppopmenu=new xui.UI.PopMenu({
                        items:nitems,
                        autoHide:true
                    },{onMenuSelected:function(profile, item){
                        ins.fireItemClickEvent(item.id);
                    },
                    beforeHide:function(p,e){
                        if(e){
                            var node=xui(src),
                            p1=xui.Event.getPos(e),
                            size=node.cssSize(),
                            add=3,
                            p2=node.offset();

                            if(p1.left>p2.left && p1.top>p2.top-add && p1.left<p2.left+size.width && p1.top<p2.top+size.height){
                                return false;
                            }
                        }
                    },onHide:function(){
                        profile._droppopmenu.destroy(true);
                        delete profile._droppopmenu;
                    }});
                    menu.pop(src);
                },
                onMouseout:function(profile, e, src){
                    var pop;
                    if(pop=profile._droppopmenu){
                        var node=pop.get(0).getRoot(),
                        p1=xui.Event.getPos(e),
                        size=node.cssSize(),
                        add=3,
                        p2=node.offset();

                        if(p1.left>p2.left && p1.top>p2.top-add && p1.left<p2.left+size.width && p1.top<p2.top+size.height){}else
                            pop.hide();
                    }
                },
                onClick:function(p, e, src){
                    xui(src).onMouseover(true);
                }
            },
            PANEL:{
                onClick:function(profile, e, src){
                    var p=profile.properties,
                        item = profile.getItemByDom(src);
                    if(p.disabled || item.disabled)return false;
                    if(profile.onClickPanel)
                        return profile.boxing().onClickPanel(profile, item, e, src);
                }
            }
        },
        DataModel:{
            rotate:null,

            selectable:true,
            dirtyMark:false,

            lazyAppend:true,

            dock:'fill',
            noPanel:false,
            width:{
                $spaceunit:1,
                ini:'18em'
            },
            height:{
                $spaceunit:1,
                ini:'18em'
            },
            position:'absolute',
            itemWidth:{
                ini:0,
                action:function(value){
                    this.getSubNode('CAPTION',true).width(value);
                }
            },
            itemAlign:{
                ini:"",
                listbox:['','left','center','right'],
                action:function(value){
                    this.getSubNode('CAPTION',true).css('text-align',value);
                }
            },
            HAlign:{
                ini:'left',
                listbox:['left','center','right'],
                action:function(value){
                    this.getSubNode('ITEMS').css('textAlign',value);
                }
            },
            dropKeysPanel:'',
            value:{
                ini:''
            },
            selMode:{
                ini:'single',
                listbox:['single', 'multi']
            },
            noHandler:{
                ini:false,
                action:function(value){
                    this.getSubNode('LIST').css('display',value?'none':'');
                    var t=this.getRootNode().style;
                    xui.UI.$tryResize(this, t.width, t.height, true);
                }
            }
        },
        EventHandlers:{
            onIniPanelView:function(profile, item){},
            beforePagePop:function(profile, item, options, e, src){},
            beforePageClose:function(profile, item, src){},
            afterPageClose:function(profile, item){},
            onShowOptions:function(profile,item,e,src){},
            onItemSelected:function(profile, item,e,src,type){},
            onCaptionActive:function(profile, item,e,src){},
            onClickPanel:function(profile, item, e, src){}
        },
        RenderTrigger:function(){
            var self=this,v,i,ins;
            // set default value
            if(v=self.properties.value){
                (ins=self.boxing()).setUIValue(v,null,null,'render');
                if(i=self.getItemByItemId(v))
                    ins.onItemSelected(self, i);
            }
        },
        _prepareData:function(profile){
            var data = arguments.callee.upper.call(this, profile);
            data.panels = data.items;
            if(data.HAlign)
                data.HAlign = 'text-align:'+data.HAlign+';';
            data._liststyle = data.noHandler?'display:none':'';
            return data;
        },
        _prepareItem:function(profile, item){
            var dpn = 'display:none',p=profile.properties,t;
            item.closeDisplay = item.closeBtn?'':dpn;
            item.popDisplay = item.popBtn?'':dpn;
            item._opt = item.optBtn?'':dpn;
            item._itemDisplay = item.hidden?dpn:'';
            if(t = item.itemWidth || p.itemWidth)
                item.itemWidth="width:"+t+(xui.isFinite(t)?"px":"");
            if(t = item.itemAlign || p.itemAlign)
                item.itemAlign = "text-align:"+ t;

            item._bginfo="";
            if(t=item.panelBgClr||p.panelBgClr)
                item._bginfo+="background-color:"+t+";";
            if(t=item.panelBgImg||p.panelBgImg)
                item._bginfo+="background-image:url("+xui.adjustRes(t)+");";
            if(t=item.panelBgImgPos||p.panelBgImgPos)
                item._bginfo+="background-position:"+t+";";
            if(t=item.panelBgImgRepeat||p.panelBgImgRepeat)
                item._bginfo+="background-repeat:"+t+";";
            if(t=item.panelBgImgAttachment||p.panelBgImgAttachment)
                item._bginfo+="background-attachment:"+t+";";
                
            if(xui.isStr(item.overflow))
                item._overflow = item.overflow.indexOf(':')!=-1?(item.overflow):(data.overflow?("overflow:"+data.overflow):"");
            else if(xui.isStr(p.overflow))
                item._overflow = p.overflow.indexOf(':')!=-1?(p.overflow):(p.overflow?("overflow:"+p.overflow):"");
        },
        getDropKeys:function(profile,node){
            return profile.properties[profile.getKey(xui.use(node).id())==profile.keys.PANEL?'dropKeys':'dropKeysPanel'];
        },
        _forLazyAppend:function(profile, item, value){
            var prop=profile.properties,box=profile.boxing();
            //dynamic render
            if(prop.lazyAppend){
                var arr=profile.children,a=[];
                xui.arr.each(arr,function(o){
                    if(o[1]==value && 
                        // not rendered, or node not in
                        (!o[0].renderId || xui.UIProfile.getFromDom(xui(o[0].renderId).parent().id())!=profile )
                    ){
                        a.push(o[0]);
                    }
                });
                if(a.length)
                    box.append(xui.UI.pack(a),value);

                // $attached is dynamic
                if(profile.$attached){
                    for(var i=0,v;v=profile.$attached[i++];)
                        if(v._render)
                            v._render(true);
                    delete profile.$attached;
                }

                arr=profile.exchildren;
                if(arr && arr.length){
                    a=[];
                    xui.filter(arr,function(o){
                        if(o[1]==value){
                            a.push(o[0]);
                            return false;
                        }
                    });
                    if(a.length)
                        xui.arr.each(a,function(o){
                            box.append(xui(o),value);
                        });
                }

                arr=profile.excoms;
                if(arr && arr.length){
                    a=[];
                    xui.filter(arr,function(o){
                        if(o[1]==value){
                            a.push(o[0]);
                            return false;
                        }
                    });
                    if(a.length)
                        xui.arr.each(a,function(o){
                            o.show(null, box, value, false);
                        });
                }
            }
        },
        _forIniPanelView:function(profile, item){
            if(!item)return;
            var prop=profile.properties,box=profile.boxing();
            if(!item._$ini){
                item._$ini=true;
                if(profile.onIniPanelView)box.onIniPanelView(profile,item);
                if(item.iframeAutoLoad){
                    box.getPanel(item.id).css('overflow','hidden');
                    var _if=typeof item.iframeAutoLoad=='string'?{url:item.iframeAutoLoad}:xui.clone(item.iframeAutoLoad,true),
                        id="diframe_"+xui.rand(),
                        e=xui.browser.ie && xui.browser.ver<9,
                        ifr=document.createElement(e?"<iframe name='"+id+"'>":"iframe");

                    _if.url=xui.adjustRes(_if.url,false,true);

                    ifr.id=ifr.name=id;
                    if(xui.isHash(item.iframeAutoLoad))item.iframeAutoLoad.frameName=id;
                    item._frameName=id;

                    if(!_if.query)_if.query={};
                    _if.query._rand=xui.rand();
                    ifr.frameBorder='0';
                    ifr.marginWidth='0';
                    ifr.marginHeight='0';
                    ifr.vspace='0';
                    ifr.hspace='0';
                    ifr.allowTransparency='true';
                    ifr.width='100%';
                    ifr.height='100%';
                    box.getPanel(item.id).html("").append(ifr);
    
                    if((_if.method||"").toLowerCase()=="post")
                        xui.Dom.submit(_if.url, _if.query, "post", id, _if.enctype);
                    else
                        ifr.src=_if.url;
                }else if(item.ajaxAutoLoad){
                    var _ajax=typeof item.ajaxAutoLoad=='string'?{url:item.ajaxAutoLoad}:xui.clone(item.ajaxAutoLoad,true),
                        options={rspType:"text"};
                    xui.merge(options, _ajax.options);
                    if(!_ajax.query)_ajax.query={};
                    _ajax.query._rand=xui.rand();
                    box.busy(null,null,"PANEL",profile.getSubIdByItemId(item.id));
                    var node=box.getPanel(item.id);
                    xui.Ajax(xui.adjustRes(_ajax.url,false,true), _ajax.query, function(rsp){
                        node.html(rsp,true,true);
                        box.free();
                    }, function(err){
                        node.html("<div>"+err+"</div>",true,false);
                        box.free();
                    }, null, options).start();
                }
            }
        },
        _showTips:function(profile, node, pos){
            if(profile.properties.disableTips)return;
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);
            if(!xui.Tips)return;
            var id=node.id,pid,ppid,ks=profile.keys;
            pid=xui.get(node,["parentNode","id"])||"";
            ppid=xui.get(node,["parentNode","parentNode","id"])||"";
            if(id.indexOf(ks.ITEM)===0||pid.indexOf(ks.ITEM)===0||ppid.indexOf(ks.ITEM)===0||
                id.indexOf(ks.HANDLE)===0||pid.indexOf(ks.HANDLE)===0||ppid.indexOf(ks.HANDLE)===0||
                id.indexOf(ks.CMDS)===0||pid.indexOf(ks.CMDS)===0||ppid.indexOf(ks.CMDS)===0){
                var upper=arguments.callee.upper,
                    rtn=upper.apply(this,xui.toArr(arguments));
                upper=null;
                return rtn;
            }
        },
        //for tabs only
        _onresize:function(profile,width,height,force,key){
              var prop=profile.properties,
                item = profile.getItemByItemId(key);

            if(!item){
                key=prop.$UIvalue||prop.value;
                item = profile.getItemByItemId(key);
            }

            var panel = profile.boxing().getPanel(key),
                useem = xui.$uem(prop),
                adjustunit = function(v,emRate){return profile.$forceu(v, useem?'em':'px', emRate)},
                root = profile.getRoot(),
                list=profile.getSubNode('LIST'),
                panelfz = useem?panel._getEmSize():null,
                listfz = useem?list._getEmSize():null,
                wc=null,
                hc=null,
                listH;

            // caculate by px
            if(width && width!='auto')width=profile.$px(width, null, true);
            if(height && height!='auto')height=profile.$px(height, null, true);

            if(!panel || panel.isEmpty())return;
            
            if(!prop.noHandler){
                //force to get offsetHeight
                listH = list.offsetHeight(true);
                if(profile._listH!=listH){
                    profile._listH=listH;
                    force=true;
                }
            }

            if(force)item._w=item._h=null;
            if(height && item._h!=height){
                item._h=height;
                if(height=='auto'){
                    hc='auto';
                }else{
                    if(!prop.noHandler){
                        height = height-listH;
                    }
                    if(height>0)hc=height;
                };
            }else hc=height;

            if(width && item._w!=width){
                list.width(adjustunit(item._w=width, listfz));
                if(!prop.noHandler){
                    this._adjustHScroll(profile);
                }
                wc=width;
            }
            if(hc||wc)panel.height(adjustunit(hc,panelfz)).onSize();
        },
        _adjustHScroll:function(profile){
            // SCROLL
            var items = profile.getSubNode('ITEMS'),
                innerW=items.width(),
                list = profile.getSubNode('LIST'),
                menu = profile.getSubNode('MENU'),
                caps = profile.getSubNode('CAPTION',true),
                itemsW = 0,
                getItemsW=function(){
                    var w=0;
                    items.children().each(function(item){
                        if(item.offsetWidth==0)return;
                        if(!w){
                            w = item.offsetLeft + item.offsetWidth;
                            return false;
                        }
                    },true);
                    return w;
                },
                getCapsW=function(){
                    var w=0;
                    caps.each(function(item){
                        if(item.clientWidth==0)return;
                        w += item.clientWidth;
                    });
                    return w;
                },
                ignoreCap;

                // init
                items.tagClass('-icon',false);
                items.tagClass('-icon2',false);
                items.tagClass('-menu',false);
                menu.css('display','none');
                caps.css('width','');
                
                profile._mode='normal';
                // try 1: minus caption width
                itemsW = getItemsW();
                if(itemsW>innerW){
                    var capw=getCapsW();
                    if((itemsW - innerW) < capw * .75){
                        var percent = 1- (itemsW - innerW) / capw;
                        caps.each(function(cap){
                            xui(cap).width(Math.floor(cap.clientWidth * percent) +'px');
                        });
                        profile._mode='narrow';
                    }else{
                        ignoreCap=1;
                    }

                    // try 2: icon mode
                    if(ignoreCap || getItemsW()>innerW){
                        items.tagClass('-icon',true);
                        profile._mode='icon';
                        // try 3: menu mode
                        if(getItemsW()>innerW){
                            items.tagClass('-menu',true);
                            menu.setInlineBlock();
                            profile._mode='menu';
                        }
                    }
                }
        }
    }
});