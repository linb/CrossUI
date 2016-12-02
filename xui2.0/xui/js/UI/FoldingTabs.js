Class("xui.UI.FoldingTabs", "xui.UI.Tabs",{
    Instance:{
        _setCtrlValue:function(value,init){
            this.each(function(profile){
                var id=profile.domId,
                    box = profile.boxing(),
                    uiv = init?'':box.getUIValue(),
                    prop = profile.properties,

                    fold=function(itemId, arr){
                        var subId = profile.getSubIdByItemId(itemId),
                            item=profile.getItemByItemId(itemId);
                        if(subId){
                            arr.push(subId);
                            
                            var itemnode=profile.getSubNode('BODY',subId);
                            if(itemnode.css('display')!='none'){
                                item._scrollTop=itemnode.get(0).scrollTop||0;
                                if(item._scrollTop)
                                    itemnode.get(0).scrollTop=0;
                                itemnode.css('display','none');
                            }
                        }
                    },
                    expand = function(itemId, arr){
                        var subId = profile.getSubIdByItemId(itemId),
                            item=profile.getItemByItemId(itemId);
                        if(subId){
                            arr.push(subId);
                            
                            var itemnode=profile.getSubNode('BODY',subId);
                            if(itemnode.css('display')=='none'){
                                 // show pane
                                //box.getPanel(itemId).css('position','relative').show('auto','auto');
                                itemnode.css('display','block');
                                if(item._scrollTop)
                                    itemnode.get(0).scrollTop=item._scrollTop;
    
                                profile.box._forLazyAppend(profile, item, itemId);
                                profile.box._forIniPanelView(profile, item, itemId);
                            }
                        }
                    };
                var arr1=[], arr2=[];
                if(prop.selMode=="multi"){
                    uiv = uiv?uiv.split(prop.valueSeparator):[];
                    value = value?value.split(prop.valueSeparator):[];

                    xui.arr.each(uiv,function(key){
                        if(xui.arr.indexOf(value,key)==-1)
                            fold(key, arr1);
                    });
                    xui.arr.each(value,function(key){
                        if(xui.arr.indexOf(uiv,key)==-1)
                            expand(key, arr2);
                    });
                }else{
                    fold(uiv, arr1);
                    expand(value, arr2);
                }
                if(arr1.length){
                    profile.getSubNodes(['ITEM','TOGGLE'],arr1).tagClass('-checked',false);
                    profile.getSubNodes('ITEM',arr1).next().tagClass('-prechecked',false);
                }
                if(arr2.length){
                    profile.getSubNodes(['ITEM','TOGGLE'],arr2).tagClass('-checked');
                    profile.getSubNodes('ITEM',arr2).next().tagClass('-prechecked');
                }

                var t=profile.getRootNode().style;
                xui.UI.$tryResize(profile, t.width, t.height, true);
            });
        },
        _afterInsertItems:null
    },
    Static:{
        Templates:{
            tagName : 'div',
            style:'{_style};',
            BOX:{
                $order:0,
                tagName : 'div',
                ITEMS:{
                    tagName : 'div',
                    text:"{items}"
                }
            },
            $submap:{
                items:{
                    ITEM:{
                        tagName : 'div',
                        className:'xui-uiborder-flat xui-uiborder-radius {_checked} {_precheked} {itemClass} {disabled} {readonly}',
                        style:'{_itemDisplay} {itemStyle}',
                        HEAD:{
                            tagName : 'div',
                            className:'xui-uibar  {_checked} {_precheked} ',
                            HL:{tagName : 'div'},
                            HR:{tagName : 'div'},
                            TITLE:{
                                tabindex: '{_tabindex}',
                                TLEFT:{
                                    $order:0,
                                    tagName:'div',
                                    LTAGCMDS:{
                                        $order:0,
                                        tagName:'span',
                                        style:'{_ltagDisplay}',
                                        text:"{ltagCmds}"
                                    },
                                    TOGGLE:{
                                        $order:1,
                                        className:'xuifont {_tlgchecked}',
                                         $fonticon:'xui-uicmd-toggle'
                                    },
                                    ICON:{
                                        $order:2,
                                        className:'xuicon {imageClass}',
                                        style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}',
                                        text:'{iconFontCode}'
                                    },
                                    CAPTION:{
                                        $order:3,
                                        className:"xui-title-node",
                                        text:'{caption}'
                                    }
                                },
                                TRIGHT:{
                                    $order:1,
                                    tagName:'div',
                                    style:'{_capDisplay}',
                                    MESSAGE:{
                                        $order:0,
                                        text:'{message}'
                                    },
                                    CMDS:{
                                        $order:2,
                                        RTAGCMDS:{
                                            $order:0,
                                            tagName:'span',
                                            style:'{_rtagDisplay}',
                                            text:"{rtagCmds}"
                                        },
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
                                }/*,
                                TCLEAR:{
                                    $order:2,
                                    tagName:'div'
                                }*/
                            }
                        },
                        BODY:{
                            $order:1,
                            tagName : 'div',
                            className:'xui-uibase',
                            BODYI:{
                                tagName : 'div',
                                PANEL:{
                                    tagName : 'div',
                                    style:'{_itemHeight};{_overflow};{_bginfo}',
                                    className:'xui-uibase xui-uicontainer',
                                    text:xui.UI.$childTag
                                }
                            }
                        },
                        TAIL:{
                            $order:4,
                            tagName : 'div',
                            className:'xui-uibar',
                            TL:{tagName : 'div'},
                            TR:{tagName : 'div'}
                        }
                    }
                },
                'items.ltagCmds':function(profile,template,v,tag,result){
                    var me=arguments.callee,map=me._m||(me._m={'text':'.text','button':'.button','image':'.image'});
                    xui.UI.$doTemplate(profile,template,v,"items.tagCmds"+(map[v.type]||'.button'),result)
                },
                'items.rtagCmds':function(profile,template,v,tag,result){
                    var me=arguments.callee,map=me._m||(me._m={'text':'.text','button':'.button','image':'.image'});
                    xui.UI.$doTemplate(profile,template,v,"items.tagCmds"+(map[v.type]||'.button'),result)
                },
                'items.tagCmds.text':xui.UI.$getTagCmdsTpl('text'),
                'items.tagCmds.button':xui.UI.$getTagCmdsTpl('button'),
                'items.tagCmds.image':xui.UI.$getTagCmdsTpl('image')
            }
        },
        Appearances:{
            KEY:{
            },
            BOX:{
                    
            },
            ITEMS:{
                border:0,
                position:'relative',
                zoom:xui.browser.ie?1:null,
                padding:'11px 4px 4px 4px'//,
                //for ie6 1px bug,  HR/TR(position:absolute;right:0;)
                //'margin-right':xui.browser.ie6?'expression(this.parentNode.offsetWidth?(this.parentNode.offsetWidth-(parseInt(this.parentNode.style.paddingLeft,10)||0)-(parseInt(this.parentNode.style.paddingRight,10)||0) )%2+"px":"auto")':null
            },
            ITEM:{
                //for ie6 bug
                zoom:xui.browser.ie?1:null,
                'margin-top':'-7px',
                padding:0,
                position:'relative',
                overflow:'hidden',
                'border-radius': '6px',
                'box-shadow': '-1px -1px 2px #EDEDED'
            },
            'HEAD, BODY, BODYI, PANEL, TAIL':{
                position:'relative'
            },

            CMDS:{
                padding:'.25em 0 0 .25em',
                'vertical-align':'middle',
                position:'relative'
            },
            BODY:{
                display:'none',
                zoom:xui.browser.ie?1:null,
                position:'relative'
            },
            BODYI:{
                padding:'0 .25em'
            },
            PANEL:{
                overflow:'auto',
                padding:'.25em'
            },
            'ITEM-hover':{
            },
            'ITEM-active, ITEM-checked':{
            },
            'ITEM-checked':{
                $order:2,
                'margin-bottom':'1em'
             },
            'ITEM-checked BODY':{
                $order:2,
                display:'block'
            },
            'HL, HR, TL, TR':{
                position:'absolute',
                width:'.75em'
            },
            'HL, HR':{
                height:'2.5em'
            },
            'ITEM-prechecked HL':{
                $order:1
            },
            'ITEM-prechecked HR':{
                $order:1
            },
            'TL, TR':{
                height:'1.75em'
            },
            HL:{
                $order:1,
                top:0,
                left:0
            },
            HR:{
                $order:1,
                top:0,
                right:0
            },
            TL:{
                $order:1,
                bottom:0,
                left:0
            },
            TR:{
                $order:1,
                bottom:0,
                right:0
            },
            HEAD:{
                cursor:'pointer',
                position:'relative',
                zoom:xui.browser.ie?1:null,
                overflow:'hidden'
            },
            TITLE:{
                $order:1,
                display:'block',
                position:'relative',
                'white-space':'nowrap',
                overflow:'hidden',
               padding:'.25em .5em'
            },
            'BODY, BODYI':{
                overflow:'hidden'
            },
            TAIL:{
                height:'.25em'
            },
            'CAPTION, MESSAGE':{
                padding:'.25em',
                'vertical-align':'middle'
            },
            MESSAGE:{
                'font-size':'1em'
            },
            CAPTION:{
                'white-space':'nowrap'
            },
            'ITEM-checked CAPTION':{
                $order:2,
                'font-weight':'bold'
            },
            TLEFT:{
                //position:xui.browser.ie6?'relative':null,
                //'float':'left',
                position:'relative',
               left:'.5em',
                padding:"0 0 0 .5em",
                'white-space':'nowrap',
                overflow:'hidden'
            },
            TRIGHT:{
                //position:xui.browser.ie6?'relative':null,
                //'float':'right',

                position:'absolute',
                right:'.5em',
                top:'.25em',
                'white-space':'nowrap',
                overflow:'hidden'
            }
        },
        Behaviors:{
            DraggableKeys:['HEAD'],
            HoverEffected:{OPT:'OPT',CLOSE:'CLOSE',POP:'POP',ITEM:'HEAD'},
            ClickEffected:{OPT:'OPT',CLOSE:'CLOSE',POP:'POP',ITEM:'HEAD'},
            ITEM:{onClick:null},
            ITEMS:{onMousedown:null,onDrag:null,onDragstop:null},
            HEAD:{
                onClick:function(profile, e, src){
                    if(xui.Event.getBtn(e)!='left')return;

                    var prop = profile.properties,
                        item = profile.getItemByDom(src),
                        itemId =profile.getSubId(src),
                        box = profile.boxing();
                    if(!item)return;

                    if(prop.disabled|| item.disabled)return false;
                    if(prop.readonly|| item.readonly)return false;

                    profile.getSubNode('TITLE').focus();

                    switch(prop.selMode){
                    case 'multi':
                        var value = box.getUIValue(),
                            arr = value?value.split(prop.valueSeparator):[],
                            checktype=1;

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
                            if(box.getUIValue() !== value){
                                box.setUIValue(value,null,null,'click');
                                if(box.get(0) && box.getUIValue() == value)
                                    box.onItemSelected(profile, item, e, src, checktype);
                            }
                            break;
                        }
                    case 'single':

                        if(box.getUIValue() !== item.id){
                            box.setUIValue(item.id,null,null,'click');
                            if(box.get(0) && box.getUIValue() == item.id)
                                box.onItemSelected(profile, item, e, src, 1);
                        }
                        break;
                    }
                },
                onKeydown:function(profile, e, src){
                    var keys=xui.Event.getKey(e), key = keys.key, shift=keys.shiftKey;
                    if(key==' '||key=='enter'){
                        profile.getSubNode('HEAD',profile.getSubId(src)).onClick();
                        return false;
                    }
                }
            }
        },
        DataModel:{
            $border:0,
            noPanel:null,
            noHandler:null,
            HAlign:null,
            selMode:{
                ini:'single',
                listbox:['single', 'multi']
            }
        },
        _prepareItems:function(profile, arr, pid){
            if(arr.length)
                arr[0]._precheked = profile.getClass('ITEM','-prechecked');
            return arguments.callee.upper.apply(this, arguments);
        },
        _prepareItem:function(profile, item){
            var dpn = 'display:none',p=profile.properties,t;
            item.closeDisplay = item.closeBtn?'':dpn;
            item.popDisplay = item.popBtn?'':dpn;
            item._opt = item.optBtn?'':dpn;
            item._itemDisplay = item.hidden?dpn:'';

            if(item.height)
                item._itemHeight="height:"+profile.$forceu(item.height);

            var prop = profile.properties,o;
            item._tabindex = prop.tabindex;
            if(!item.caption)
                item._capDisplay=dpn;

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

            if(item._show){
                item._checked = profile.getClass('ITEM','-checked');
                item._tlgchecked = profile.getClass('TOGGLE','-checked');
            }
            this._prepareCmds(profile, item);
        },
        _onresize:function(profile,width,height,force,key){
            if(force){profile._w=profile._h=null;}
            if(width && profile._w!=width){
                profile._w=width;
                profile.getSubNode("PANEL",true).each(function(panel){
                    if(panel.offsetWidth){
                        xui(panel).width('auto');
                        var w=xui(panel).width(), prop=profile.properties;
                        if(xui.$us(prop)>0)w=profile.$px2em(w, panel)+'em';
                        xui(panel).width(w);

                        xui.UI._adjustConW(profile, panel, w);
                    }
                });
            }
        },
        _adjustScroll:null
    }
});
