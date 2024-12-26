xui.Class("xui.UI.ToolBar",["xui.UI","xui.absList"],{
    Instance:{
        updateItem:function(subId,options){
            if(options.type){
                return arguments.callee.upper.call(this,subId,options);
            }else{
                var self=this,
                    profile=self.get(0),
                    box=profile.box,
                    items=profile.properties.items,
                    rst=profile.queryItems(items,function(o){return typeof o=='object'?o.id===subId:o==subId},true,true,true),
                    nid,item,n1,n2,n3,n4,n5,t;
                if(xui.isStr(options))options={caption:options};

                if(rst.length){
                        rst=rst[0];
                        if(item=rst[0]){

                        // [[modify id
                        if(xui.isSet(options.id))options.id+="";
                        if(options.id && subId!==options.id){
                            nid=options.id;
                            var m2=profile.ItemIdMapSubSerialId, v;
                            if(!m2[nid]){
                                if(v=m2[subId]){
                                    m2[nid]=v;
                                    delete m2[subId];
                                    profile.SubSerialIdMapItem[v].id=nid;
                                }else{
                                    item.id=nid;
                                }
                            }
                        }
                        delete options.id;
                        // modify id only
                        if(xui.isEmpty(options))
                            return self;
                        //]]

                        //in dom already?
                        n1=profile.getSubNodeByItemId('ICON',nid||subId);
                        n2=profile.getSubNodeByItemId('CAPTION',nid||subId);
                        n3=profile.getSubNodeByItemId('ITEM',nid||subId);
                        n4=profile.getSubNodeByItemId('LABEL',nid||subId);
                        n5=profile.getSubNodeByItemId('BTN',nid||subId);

                        if('value' in options && options.value!==item.value)
                            profile.getSubNodeByItemId('BTN',nid||subId).tagClass('-checked', !!options.value);

                        if('caption' in options&& options.caption!==item.caption){
                            n2.html(options.caption);
                            if(options.caption && !item.caption)
                                n2.css('display','');
                            if(!options.caption && item.caption)
                                n2.css('display','none');
                        }
                        if('label' in options&& options.label!==item.label){
                            n4.html(options.label);
                            if(options.label && !item.label)
                                n4.css('display','');
                            if(!options.label && item.label)
                                n4.css('display','none');
                        }
                        if('disabled' in options && options.disabled!==item.disabled){
                            if(options.disabled)
                                n3.addClass('xui-ui-itemdisabled');
                            else
                                n3.removeClass('xui-ui-itemdisabled');

                            n5.onMouseout(true,{$force:true})
                        }
                        if('image' in options&& options.image!==item.image)
                            n1.css('background-image',options.image);
                        if('imagePos' in options&& options.imagePos!==item.imagePos)
                            n1.css('background-position',options.imagePos);
                        if('imageClass' in options&& options.imageClass!==item.imageClass){
                            if(item.imageClass)
                                n1.removeClass(item.imageClass);
                            if(options.imageClass)
                                n1.addClass(options.imageClass);
                        }
                        if('hidden' in options){
                            var  b = !!options.hidden;
                            if(b){
                                if(item.hidden!==true){
                                    n3.css('display','none');
                                }
                            }else{
                                if(item.hidden===true){
                                    n3.css('display','');
                                }
                            }
                        }

                        //merge options
                        xui.merge(item, options, 'all');
                    }
                }
                return self;
            }
        },
        showItem:function(itemId, value){
            return this.each(function(profile){
                var item=profile.getItemByItemId(itemId);
                if(item){
                    item.hidden=value===false;
                    profile.getSubNodeByItemId('ITEM', itemId).css('display',value===false?'none':'');
                }
            });
        },
        showGroup:function(grpId, value){
            return this.each(function(profile){
                xui.arr.each(profile.properties.items,function(o){
                    if(o.id==grpId){
                        o.hidden=value===false;
                        return false;
                    }
                });
                var n=profile.getSubNodeByItemId('GROUP', grpId);
                n.css('display',value===false?'none':'');

                xui.resetRun(profile.$xid+':showgrp',function(){
                    if(profile.renderId && profile.getRootNode().offsetWidth){
                        xui.UI.$dock(profile,true,true);
                    }
                });
            });
        }
    },
    Static:{
        _focusNodeKey:'BTN',
        _ITEMKEY:'GROUP',
        Templates:{
            tagName:'div',
            className:'{_className}',
            style:'{_style}',
            ITEMS:{
                className:'xui-uibar xui-uiborder-outset xui-uiborder-radius',
                tagName:'div',
                style:'{mode}',
                text:'{items}'
            },
            $submap:{
                items:{
                    GROUP:{
                        className:'{groupClass}',
                        style:'{grpDisplay} {groupStyle}',
                        HANDLER:{
                            className:'xuifont',
                            $fonticon:'xui-icon-placeholder',
                            style:'{mode2}'
                        },
                        LIST:{
                            $order:1,
                            tagName:'text',
                            text:'{sub}'
                        }
                    }
                },
                'items.sub':{
                    ITEM:{
                        style:'{_itemDisplay}',
                        className:" {disabled}",
                    //for firefox2 image in -moz-inline-box cant change height bug
                        IBWRAP:{
                            tagName:'div',
                            SPLIT:{
                                style:'{splitDisplay}',
                                className:"xui-uiborder-l xui-uiborder-r",
                                // for auto height
                                text:'&nbsp;'
                            },
                            LABEL:{
                                style:'{labelDisplay}',
                                text:'{label}'
                            },
                            BTN:{
                                tagName:'button',
                                className:'xui-uiborder-hidden xui-uiborder-radius xui-showfocus {itemcls} {itemClass}',
                                style:'{itemStyle};{_boxDisplay};',
                                tabindex: '{_tabindex}',
                                BOXWRAP:{
                                    tagName:'div',
                                    RULER:{},
                                    ICON:{
                                        $order:1,
                                        className:'xuicon {imageClass}  {picClass}',
                                        style:'{backgroundImage}{backgroundPosition}{backgroundSize}{backgroundRepeat}{iconFontSize}{imageDisplay}',
                                        text:'{iconFontCode}'
                                    },
                                    CAPTION:{
                                        $order:2,
                                        text : '{caption}',
                                        style:'{captionDisplay}'
                                    },
                                    DROP:{
                                        $order:3,
                                        className:'xuifont',
                                        $fonticon:'xui-uicmd-arrowdrop',
                                        style:'{_dropDisplay}'
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
                overflow:'hidden',
                left:0,
                top:0
            },
            RULER:{
                padding:'0',
                margin:'0',
                width:'0'
            },
            ICON:{
                margin:0,
                'vertical-align':'middle'
            },
            ITEMS:{
                display:'block',
                overflow:'hidden',
                'padding-bottom':'.125em'
            },
            HANDLER:{
                height:'100%',
                width:'.75em',
                background:'url('+xui.ini.img_handler+') repeat-y left top',
                cursor:'move',
                'vertical-align':'middle'
            },
            GROUP:{
                // crack for: The IE 'non-disappearing content' bug
                position:'static',
				display:'inline',
                padding:'.125em .25em 0 .125em',
                'vertical-align':'middle'
            },
            ITEM:{
                'vertical-align': 'middle',
                padding: '0 .125em',
                margin: '0'
            },
            'SPLIT':{
                $order:1,
                width:'0',
                'vertical-align':'middle',
                margin: '0 .25em'
            },
            BTN:{
                'padding':'.25em',
                'cursor':'pointer',
                // for extra padding bug in IE678
                '*width':'auto',
                '*overflow':'visible'
            },
            BOX:{
                height:'auto'
            },
            'LABEL, CAPTION':{
                'vertical-align':'middle',
                'margin-left':'.25em',
                'margin-right':'.25em',
                'font-size':'1em'
            },
            LABEL:{
                cursor:'default',
                'padding':'.25em'
            },
            DROP:{
                'vertical-align': 'middle'
            }
        },
        Behaviors:{
            NoTips:["GROUP","HANDLER"],
            HoverEffected:{BTN:['BTN']},
            ClickEffected:{BTN:['BTN']},
            DraggableKeys:["HANDLER"],
            DroppableKeys:["GROUP","ITEMS"],
            BTN:{
                onContextmenu:function(profile, e, src){
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;
                    if(profile.onItemContextmenu)
                        return profile.boxing().onItemContextmenu(profile, item, e, src);
                },
                onClick:function(profile, e, src){
                    if(profile.properties.disabled)return false;
                    var id2=xui.use(src).parent(3).id(),
                        box = profile.boxing(),
                        item2 = profile.getItemByDom(id2);
                    if(item2.disabled)return false;

                    var item = profile.getItemByDom(src);
                    if(item.disabled)return false;

                    xui.use(src).focus(true);
                    if(item.type=="statusButton")
                        xui.use(src).tagClass('-checked',item.value=!item.value);
                    else if(item.type=="dropButton"){
                        if(profile.onInitPopup){
                            if(xui.UI._handleMdlPopup(box.onInitPopup(profile, item, e, src)), src, profile, item, item2, e, src){
                                return;
                            }
                        }
                    }

                    if(profile.onItemClick)
                        profile.boxing().onItemClick(profile, item, e, src);

                    // Override onClick for compatibility
                    if(profile.onClick)
                        profile.boxing().onClick(profile, item, item2, e, src);

                    return false;
                },
                onDblclick:function(profile, e, src){
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;
                    if(profile.onItemDblclick)
                        return profile.boxing().onItemDblclick(profile, item, e, src);
                },
                onMousedown:function(profile, e, src){
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;
                    if(profile.onItemMousedown)
                        return profile.boxing().onItemMousedown(profile, item, e, src);
                },
                onMouseup:function(profile, e, src){
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;
                    if(profile.onItemMouseup)
                        return profile.boxing().onItemMouseup(profile, item, e, src);
                },
                onMouseover:function(profile, e, src){
                    if(xui.browser.fakeTouch || xui.browser.deviceType == 'touchOnly')return;
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;
                    if(profile.onItemHover)
                        return profile.boxing().onItemHover(profile, item, true, e, src);
                },
                onMouseout:function(profile, e, src){
                    if(xui.browser.fakeTouch || xui.browser.deviceType == 'touchOnly')return;
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;
                    if(profile.onItemHover)
                        return profile.boxing().onItemHover(profile, item, false, e, src);
                }
            }
        },
        DataModel:{
            listKey:null,
            height:{
                ini:'auto',
                readonly:true
            },
            width:{
                $spaceunit:1,
                ini:'auto'
            },

            left:{
                $spaceunit:1,
                ini:0
            },
            top:{
                $spaceunit:1,
                ini:0
            },

            handler:{
                ini:true,
                action:function(v){
                    this.getSubNode('HANDLER',true).css('display',v?'':'none');
                }
            },
            position:'absolute',
            hAlign:{
                ini:'left',
                listbox:['left','center','right'],
                action:function(v){
                    this.getSubNode('ITEMS', true).css('textAlign', v);
                }
            },
            dock:{
                ini:'top',
                listbox:['top','bottom']
            }
        },
        EventHandlers:{
            // Override onClick for compatibility
            onClick:function(profile, item, group, e, src){},
            onInitPopup:function(profile, item, e, src){}
        },
        _adjustItems:function(arr){
            if(!arr)arr=[xui.stamp()+''];
            if(xui.isStr(arr))arr=[arr];

            var a=xui.copy(arr),m;
            xui.arr.each(a,function(o,i){
                if(xui.isArr(o)){
                    o={
                        id:xui.id(),
                        sub:o
                    };
                }
                if(xui.isHash(o)){
                    //copy group
                    a[i]=xui.copy(o);
                    a[i].sub=[];
                    //copy sub(tool item)
                    if(o.sub)
                        xui.arr.each(o.sub,function(v){
                            a[i].sub.push(xui.isHash(v)?xui.copy(v):{id:v+""});
                        });
                }
            });
            return a;
        },
        _onDrop:function(profile, e, src, key, data, item){
            var k=profile.getKey(xui.use(src).id()),
                po=data.profile,
                ps=data.domId,
                oitem,
                t=xui.absObj.$specialChars;

            //remove
            oitem=xui.clone(po.getItemByDom(ps),function(o,i){return !t[(i+'').charAt(0)]});
            po.boxing().removeItems([oitem.id], 'GROUP', true);

            if(k==profile.keys.GROUP)
                profile.boxing().insertItems([oitem], item.id, true);
            else
                profile.boxing().insertItems([oitem]);

            data._new = oitem;
            return false;
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile);
            var p = profile.properties;

            d.mode = p.hAlign!='left'?('text-align:'+p.hAlign+';'):'';

            return d;
        },
        _prepareItem:function(profile, oitem, sitem, pid, index,len, mapCache, serialId){
            var ns=this,
                dn='display:none;',
                tabindex = profile.properties.tabindex,
                fun=function(profile, dataItem, item, pid, index,len, mapCache,serialId){
                    var id=dataItem[xui.UI.$tag_subId]=typeof serialId=='string'?serialId:('a_'+profile.pickSubId('aitem')), t;
                    if(typeof item=='string')
                        item={caption:item};

                    if(false!==mapCache){
                        profile.ItemIdMapSubSerialId[item.id] = id;
                        profile.SubSerialIdMapItem[id] = item;
                    }

                    if(item['object']){
                        dataItem['object']=ns._prepareInlineObj(profile, item, tabindex);
                    }else{
                        // for compitable with older versions
                        if(item.statusButton){item.type="statusButton";delete item.statusButton;}
                        else if(item.dropButton){item.type="dropButton";delete item.dropButton;}
                        else if(item.split){item.type="split";delete item.split;}

                        if(item.type!=="split" && !item.caption){
                            item.caption="";
                        }

                        xui.UI.adjustData(profile,item, dataItem);

                        if(item.type=="statusButton" && !!item.value)
                            dataItem.itemcls=" xui-uiborder-hidden-checked "+profile.getClass('BTN','-checked', !!item.value);

                        dataItem._tabindex=tabindex;
                        dataItem.splitDisplay=dataItem.type=="split"?'':dn;
                        dataItem.labelDisplay=dataItem.label?'':dn;
                        dataItem.captionDisplay=dataItem.caption?'':dn;
                        dataItem._dropDisplay=item.type=="dropButton"?'':dn;
                        dataItem._boxDisplay= (dataItem.type!=="split" && (dataItem.caption || dataItem.image || dataItem.imageClass))?'':dn;
                    }
                    dataItem._itemDisplay=item.hidden?dn:'';
                    item._pid=pid;
                };

            if(pid){
                fun(profile,oitem,sitem,pid,index,len,mapCache,serialId);
            }else{
                var arr=[],
                dataItem,
                a=sitem.sub||[];

                pid=sitem.id;
                oitem.mode2 = ('handler' in sitem)?(sitem.handler?'':dn):(profile.properties.handler?'':dn);
                oitem.grpDisplay=sitem.hidden?dn:'';
                oitem.sub = arr;

                xui.arr.each(a,function(item){
                    dataItem={id: item.id};
                    fun(profile,dataItem,item,pid,index,len,mapCache,serialId);
                    arr.push(dataItem);
                });
            }
        }
    }
});
