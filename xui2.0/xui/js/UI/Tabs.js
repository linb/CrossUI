Class("xui.UI.Tabs", ["xui.UI", "xui.absList","xui.absValue"],{
    Instance:{
        _setCtrlValue:function(value){
            this.each(function(profile){
                var id=profile.domId,
                    box = profile.boxing(),
                    uiv = box.getUIValue(),
                    prop = profile.properties,
                    dm=profile.box.$DataModel,

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

                    if(!prop.noHandler && lastV)
                        xui.tryF(profile.box._adjustScroll,[profile,lastV],profile.box);
                }else{
                    fold(uiv, arr1);
                    expand(value, arr2);
                    
                    if(!prop.noHandler && arr2.length)
                        xui.tryF(profile.box._adjustScroll,[profile,value],profile.box);
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
                if(!profile.box.$DataModel.hasOwnProperty("noPanel")){
                    if(!(v=this.getUIValue()))
                        this.fireItemClickEvent((v=pp.items[0]) && (v=v.id));

                    var t=profile.getRootNode().style;
                    xui.UI.$tryResize(profile, t.width, t.height, true,v);
                    t=null;
                }
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
                if(!profile.box.$DataModel.hasOwnProperty("noPanel") || !profile.properties.noPanel){
                    var t=profile.getRootNode().style;
                    xui.UI.$tryResize(profile, t.width, t.height, true, profile.boxing().getUIValue());
                    t=null;
                }
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
        },
        _scrollToBottom:function(node, asy){
            var profile=this.get(0),
                o = profile.getSubNode('ITEMS'),
                w = profile.getSubNode('LIST').width(),
                flag;
            if(node){
                o.left(w-(node.offsetLeft+node.offsetWidth));
                if(!node.nextSibling){
                    profile.getSubNode('RIGHT').css('display','none');
                    flag=false;
                }else{
                    if(asy!==false && node.nextSibling)
                        profile.$scrollTobottom=xui.asyRun(arguments.callee, 1000, [node.nextSibling], this);
                }
                profile.getSubNode('LEFT').css('display','block');
                return flag;
            }

        },
        _scrollToTop:function(node, asy){
            var profile=this.get(0),
                o = profile.getSubNode('ITEMS'),
                flag;
            if(node){
                o.left(-node.offsetLeft);
                if(!node.previousSibling){
                    profile.getSubNode('LEFT').css('display','none');
                    flag=false;
                }else{
                    if(asy!==false && node.previousSibling)
                        profile.$scrollToTop=xui.asyRun(arguments.callee, 1000, [node.previousSibling], this);
                }
                profile.getSubNode('RIGHT').css('display','block');
            }
            return flag;
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
                     className:'xui-uiborder-tb-dark xui-uitembg-bar-checked'
                },
                LEFT:{
                    className:'xui-ui-unselectable xui-special-icon',
                    text:'&#10094'
                },
                RIGHT:{
                    className:'xui-ui-unselectable xui-special-icon',
                    text:'&#10095'
                },
                DROP:{
                    className:'xui-ui-unselectable xui-special-icon',
                    text:'&#9660'
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
                        className:'xui-uiborder-flat xui-uitembg {itemClass} {disabled} {readonly}',
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
                                            style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                                        },
                                        CAPTION:{
                                            text: '{caption}',
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
                        className:'xui-uibg-base',
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
                padding:'.25em .25em 0 .25em '
            },
            LISTBG:{
                position:'absolute',
                overflow:'hidden',
                left:0,
                bottom:0,
                height:'3px',
                width:'100%'                
            },
            'LEFT, RIGHT, DROP':{
                cursor:'pointer',
                display:'none',
                position:'absolute',
                top:'.25em',
                'z-index':'10',
                width:'1em',
                height:'1em',
                'font-weight': 'bold',
                'text-align': 'center',
                'font-size': '1.5em'
            },
            LEFT:{
                left:0
            },
            RIGHT:{
                right:"1.75em"
            },
            DROP:{
                right:".25em"
            },

            ITEMS:{
                padding:'0 0 4px 0',
                position:'relative',
                left:0,
                top:0,
                'white-space':'nowrap'
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
            'ITEM-mouseover':{
                $order:1
            },
            'ITEM-mousedown, ITEM-checked':{
                $order:2
            },
            ITEMI:{
                $order:0,
                'padding-left':'.5em',
                //keep this same with ITEM
                'vertical-align':'top'
            },
            'ITEM-mouseover ITEMI':{
                $order:1
            },
            'ITEM-mousedown ITEMI, ITEM-checked ITEMI':{
                $order:2
            },
            ITEMC:{
                $order:0,
                padding:'.5em 0 .25em 0',
                //keep this same with ITEM
                'vertical-align':'top',
                'text-align': 'center'
            },
            'ITEM-mouseover ITEMC':{
                $order:1
            },
            'ITEM-mousedown ITEMC, ITEM-checked ITEMC':{
                $order:2
            },
            HANDLE:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                cursor:'pointer',
                'vertical-align':'middle'
            },
            RULER:{
                height:'1.5em',
                width:'1px',
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
                'font-size':'1em'
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
            HoverEffected:{ITEM:'ITEM',OPT:'OPT',CLOSE:'CLOSE',POP:'POP',LEFT:"LEFT",RIGHT:"RIGHT",DROP:"DROP"},
            ClickEffected:{ITEM:'ITEM',OPT:'OPT',CLOSE:'CLOSE',POP:'POP'},
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
            ITEMS:{
                beforeMousedown:function(profile, e, src){
                    var ep=xui.Event.getPos(e);
                    if(!profile._$scroll_l && !profile._$scroll_r)return;
                    xui.use(src).startDrag(e, {
                        horizontalOnly:true,
                        dragType:'blank',
                        dragDefer:2,
                        targetLeft:ep.left,
                        targetTop:ep.top,
                        targetReposition:false,
                        maxLeftOffset:profile._$scroll_l,
                        maxRightOffset:profile._$scroll_r
                    });
                },
                onDrag:function(profile, e, src){
                    var dd=xui.DragDrop.getProfile();
                    xui.use(src).left(-profile._$scroll_r + dd.offset.x);
                },
                onDragstop:function(profile, e, src){
                    if(profile.box._adjustScroll)profile.box._adjustScroll(profile);
                }
            },
            LEFT:{
                onMouseover:function(profile, e, src){
                     xui(src).css('display','none');
                     var d=xui(src).get(0).ownerDocument||document;
                        pos=xui.Event.getPos(e),
                        node=d.elementFromPoint(pos.left,pos.top),
                        pnode=profile.getSubNode("ITEM",profile.getSubId(node.id));
                     xui(src).css('display','block');
                     if(pnode=pnode.get(0)){
                        if(false===profile.boxing()._scrollToTop(pnode)){
                            return;
                        }
                     }
                     xui(src).css('display','block');
                },
                onMouseout:function(profile, e, src){
                    xui.clearTimeout(profile.$scrollToTop);
                },
                onClick:function(profile, e, src){
                    xui(src).css('display','none');
                    var d=xui(src).get(0).ownerDocument||document;
                        pos=xui.Event.getPos(e),
                        node=d.elementFromPoint(pos.left,pos.top),
                        pnode=profile.getSubNode("ITEM",profile.getSubId(node.id));
                     xui(src).css('display','block');
                     if(pnode=pnode.get(0)){
                        if(pnode.previousSibling)pnode=pnode.previousSibling;
                        xui.clearTimeout(profile.$scrollToTop);
                        profile.boxing()._scrollToTop(pnode,false);
                     }
                }
            },
            RIGHT:{
                onMouseover:function(profile, e, src){
                    xui(src).css('display','none');
                    var d=xui(src).get(0).ownerDocument||document;
                        pos=xui.Event.getPos(e),
                        node=d.elementFromPoint(pos.left,pos.top),
                        pnode=profile.getSubNode("ITEM",profile.getSubId(node.id));
                     xui(src).css('display','block');
                     if(pnode=pnode.get(0)){
                        if(false===profile.boxing()._scrollToBottom(pnode)){
                            return;
                        }
                     }
                },
                onMouseout:function(profile, e, src){
                    xui.clearTimeout(profile.$scrollTobottom);
                },
                onClick:function(profile, e, src){
                     xui(src).css('display','none');
                     var d=xui(src).get(0).ownerDocument||document;
                        pos=xui.Event.getPos(e),
                        node=d.elementFromPoint(pos.left,pos.top),
                        pnode=profile.getSubNode("ITEM",profile.getSubId(node.id));
                     xui(src).css('display','block');
                     if(pnode=pnode.get(0)){
                        if(pnode.nextSibling)pnode=pnode.nextSibling;
                         xui.clearTimeout(profile.$scrollTobottom);
                        profile.boxing()._scrollToBottom(pnode,false);
                     }
                }
            },
            DROP:{
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
                    xui.UI.$tryResize(this, t.width, t.height, true, this.$UIValue);
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
                key=prop.$UIvalue;
                item = profile.getItemByItemId(key);
            }

            var panel = profile.boxing().getPanel(key),
                css = xui.CSS,
                useem = (prop.spaceUnit||xui.SpaceUnit)=='em',
                adjustunit = function(v,emRate){return css.$forceu(v, useem?'em':'px', emRate)},
                root = profile.getRoot(),
                list=profile.getSubNode('LIST'),
                rootfz = useem||css.$isEm(width)||css.$isEm(height)?root._getEmSize():null,
                panelfz = useem?panel._getEmSize():null,
                listfz = useem?list._getEmSize():null,
                wc=null,
                hc=null,
                listH;

             // caculate by px
            width=width?css.$px(width, rootfz):width;
            height=height?css.$px(height, rootfz):height;

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
                if(height!='auto'){
                    if(!prop.noHandler){
                        height = height-listH;
                    }
                    if(height>0)hc=height;
                };
            }else hc=height;

            if(width && item._w!=width){
                list.width(adjustunit(item._w=width, listfz));
                if(!prop.noHandler){
                    this._adjustScroll(profile,prop.$UIvalue||prop.value);
                }
                wc=width;
            }
            if(hc||wc)panel.height(adjustunit(hc,panelfz)).onSize();
        },

        _adjustScroll:function(profile,itemid,h_em){
            // SCROLL
            var css=xui.CSS,
                list = profile.getSubNode('LIST'),
                rootwidth=profile.getRoot().offsetWidth(),
                items = profile.getSubNode('ITEMS'),
                left =  profile.getSubNode('LEFT'),
                right =  profile.getSubNode('RIGHT'),
                drop =  profile.getSubNode('DROP'),
                bgh = profile.getSubNode('LISTBG').offsetHeight(),
                lastitemright=0,
                selectitemleft=0,
                selectitemwidth=0,
                ks=profile.keys, 
                prop=profile,properties,
                css = xui.CSS,
                useem = (prop.spaceUnit||xui.SpaceUnit)=='em',
                adjustunit = function(v,emRate){return css.$forceu(v, useem?'em':'px', emRate)},
                itemsfz=useem?items._getEmSize():null,
                itemsleft=css.$px(items.left(),itemsfz);

            items.children().each(function(item){
                if(item.hidden)return;
                if(item.id.indexOf(ks.ITEM)!==0)return;

                if(!lastitemright){
                    lastitemright = item.offsetLeft + item.offsetWidth;
                }
                
                // to show the seleted one
                if(itemid && profile.getItemIdByDom(item.id) == itemid){
                    selectitemwidth=item.offsetWidth;
                    selectitemleft=item.offsetLeft;
                    return false;
                }
            },true);

            items.width(adjustunit(Math.max(lastitemright, rootwidth),itemsfz));

            if(lastitemright<=rootwidth){
                items.left(0+xui.CSS.$picku());
                profile._$scroll_r=profile._$scroll_l=0;
                items.css('cursor','');
            }else{
                // to show the seleted one
                if(selectitemwidth){
                    if((selectitemleft+itemsleft<0) || (selectitemleft+selectitemwidth-itemsleft>rootwidth)){
                        itemsleft=-selectitemleft;
                    }
                }

                if(lastitemright+itemsleft<rootwidth){
                    items.left(adjustunit(rootwidth-lastitemright,itemsfz));
                    profile._$scroll_r = lastitemright-rootwidth;
                    profile._$scroll_l = 0;
                }else{
                    items.left(adjustunit(itemsleft,itemsfz));
                    profile._$scroll_r = -itemsleft;
                    profile._$scroll_l =  lastitemright - rootwidth + itemsleft;
                }
                items.css('cursor','move');
            }
            
            left.css('display', profile._$scroll_r ? 'block' : 'none');
            right.css('display', profile._$scroll_l ? 'block' : 'none');
            drop.css('display', (profile._$scroll_l||profile._$scroll_r) ? 'block' : 'none');
        }
    }
});