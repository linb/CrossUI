Class("xui.UI.FoldingTabs", "xui.UI.Tabs",{
    Initialize:function(){
        var t=this.getTemplate(),keys=this.$Keys;
        delete t.LIST;
        delete keys.PNAELS;
        this.setTemplate(t);
        delete keys.LEFT;delete keys.RIGHT;delete keys.DROP;delete keys.LIST;delete keys.PNAELS;
    },    
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

                    _.arr.each(uiv,function(key){
                        if(_.arr.indexOf(value,key)==-1)
                            fold(key, arr1);
                    });
                    _.arr.each(value,function(key){
                        if(_.arr.indexOf(uiv,key)==-1)
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
                className:'xui-uibg-base',
                ITEMS:{
                    tagName : 'div',
                    text:"{items}"
                }
            },
            $submap:{
                items:{
                    ITEM:{
                        tagName : 'div',
                        className:'{_checked} {_precheked} {itemClass} {disabled} {readonly}',
                        style:'{itemDisplay} {itemStyle}',
                        HANDLE:{
                            tagName : 'div',
                            HL:{tagName : 'div'},
                            HR:{tagName : 'div'},
                            TITLE:{
                                tabindex: '{_tabindex}',
                                TLEFT:{
                                    $order:0,
                                    tagName:'div',
                                    TOGGLE:{
                                        $order:0,
                                        className:'xui-uicmd-toggle {_tlgchecked}'
                                    },
                                    ICON:{
                                        $order:2,
                                        className:'xui-ui-icon {imageClass}',
                                        style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                                    },
                                    CAPTION:{
                                        $order:3,
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
                                        OPT:{
                                            $order:1,
                                            className:'xui-uicmd-opt',
                                            style:'{_opt}'
                                        },
                                        POP:{
                                            className:'xui-uicmd-pop',
                                            style:'{popDisplay}',
                                            $order:1
                                        },
                                        CLOSE:{
                                            className:'xui-uicmd-close ',
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
                            BODYI:{
                                tagName : 'div',
                                PANEL:{
                                    tagName : 'div',
                                    style:'{_itemHeight}',
                                    className:'xui-uibg-base',
                                    text:xui.UI.$childTag
                                }
                            }
                        },
                        TAIL:{
                            $order:4,
                            tagName : 'div',
                            TL:{tagName : 'div'},
                            TR:{tagName : 'div'}
                        }
                    }
                }
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
                'padding-top':'8px'//,
                //for ie6 1px bug,  HR/TR(position:absolute;right:0;)
                //'margin-right':xui.browser.ie6?'expression(this.parentNode.offsetWidth?(this.parentNode.offsetWidth-(parseInt(this.parentNode.style.paddingLeft,10)||0)-(parseInt(this.parentNode.style.paddingRight,10)||0) )%2+"px":"auto")':null
            },
            ITEM:{
                border:0,
                //for ie6 bug
                zoom:xui.browser.ie?1:null,
                'margin-top':'-9px',
                padding:0,
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                position:'relative',
                overflow:'hidden'
            },
            'HANDLE, BODY, BODYI, PANEL, TAIL':{
                position:'relative'
            },

            CMDS:{
                padding:'2px 0 0 4px',
                'vertical-align':'middle',
                position:'relative'
            },
            BODY:{
                display:'none',
                'border-right': 'solid 1px #CCC',
                zoom:xui.browser.ie?1:null,
                position:'relative',
                overflow:'auto',
                'background-image':xui.UI.$bg('border_left.gif', '','FoldingList'),
                'background-repeat':'repeat-y',
                'background-position':'left top'
            },
            BODYI:{
                padding:'0 8px',
                'background-image':xui.UI.$bg('border_left.gif', '','FoldingList'),
                'background-repeat':'repeat-y',
                'background-position':'left top'
            },
            PANEL:{
                overflow:'auto',
                padding:'2px'
            },
            'ITEM-mouseover':{
            },
            'ITEM-mousedown, ITEM-checked':{
            },
            'ITEM-checked':{
                $order:2,
                'margin-bottom':'12px'
             },
            'ITEM-checked BODY':{
                $order:2,
                display:'block'
            },
            'HL, HR, TL, TR':{
                position:'absolute',
                'font-size':0,
                'line-height':0,
                width:'8px',
                'background-image':xui.UI.$bg('corner.gif', '','FoldingList'),
                'background-repeat':'no-repeat'
            },
            'HL, HR':{
                height:'30px'
            },
            'ITEM-prechecked HL':{
                $order:1,
                'background-position': 'left top'
            },
            'ITEM-prechecked HR':{
                $order:1,
                'background-position': 'right top'
            },
            'TL, TR':{
                height:'20px'
            },
            HL:{
                $order:1,
                top:0,
                left:0,
                'background-position': 'left -37px'
            },
            HR:{
                $order:1,
                top:0,
                right:0,
                'background-position': 'right -37px'
            },
            TL:{
                $order:1,
                bottom:0,
                left:0,
                'background-position': 'left bottom'
            },
            TR:{
                $order:1,
                bottom:0,
                right:0,
                'background-position': 'right bottom'
            },
            HANDLE:{
                position:'relative',
                zoom:xui.browser.ie?1:null,
                'background-image':xui.UI.$bg('border_top.gif', '','FoldingList'),
                'background-repeat':'repeat-x',
                'background-color':'#fff',
                'background-position':'left top',
                overflow:'hidden'
            },
            TITLE:{
                $order:1,
                height:'26px',
                display:'block',
                position:'relative',
                'white-space':'nowrap',
                overflow:'hidden'
            },
            'BODY, BODYI, PANEL':{
                'font-size':0,
                'line-height':0
            },
            TAIL:{
                'font-size':0,
                'line-height':0,
                height:'5px',
                'background-image':xui.UI.$bg('border_bottom.gif', '','FoldingList'),
                'background-repeat':'repeat-x',
                'background-color':'#EEE',
                'background-position':'left bottom'
            },
            'CAPTION, MESSAGE':{
                padding:'3px',
                'vertical-align':'middle'
            },
            CAPTION:{
                color:'#666',
                cursor:'pointer',
                'white-space':'nowrap',
            	font: '12px arial,sans-serif',
            	color: '#00681C'
            },
            'ITEM-checked CAPTION':{
                $order:2,
                'font-weight':'bold'
            },
            TLEFT:{
                //position:xui.browser.ie6?'relative':null,
                //'float':'left',
                position:'absolute',
                left:'4px',
                top:'2px',
                padding:"0 0 0 4px",
                'white-space':'nowrap',
                overflow:'hidden'
            },
            TRIGHT:{
                //position:xui.browser.ie6?'relative':null,
                //'float':'right',

                position:'absolute',
                right:'4px',
                top:'2px',
                'white-space':'nowrap',
                overflow:'hidden'
            }
        },
        Behaviors:{
            DraggableKeys:['HANDLE'],
            HoverEffected:{OPT:'OPT',CLOSE:'CLOSE',POP:'POP'},
            ClickEffected:{OPT:'OPT',CLOSE:'CLOSE',POP:'POP'},
            ITEM:{onClick:null,onMousedown:null},
            ITEMS:{onMousedown:null,onDrag:null,onDragstop:null},
            HANDLE:{
                onClick:function(profile, e, src){
                    if(xui.Event.getBtn(e)!='left')return;

                    var prop = profile.properties,
                        item = profile.getItemByDom(src),
                        itemId =profile.getSubId(src),
                        box = profile.boxing();

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
                            if(_.arr.indexOf(arr,item.id)!=-1){
                                _.arr.removeValue(arr,item.id);
                                checktype=-1
                            }else
                                arr.push(item.id);

                            arr.sort();
                            value = arr.join(prop.valueSeparator);

                            //update string value only for setCtrlValue
                            if(box.getUIValue() !== value){
                                box.setUIValue(value);
                                if(box.get(0) && box.getUIValue() == value)
                                    box.onItemSelected(profile, item, e, src, checktype);
                            }
                            break;
                        }
                    case 'single':

                        if(box.getUIValue() !== item.id){
                            box.setUIValue(item.id);
                            if(box.get(0) && box.getUIValue() == item.id)
                                box.onItemSelected(profile, item, e, src, 1);
                        }
                        break;
                    }
                },
                onKeydown:function(profile, e, src){
                    var keys=xui.Event.getKey(e), key = keys.key, shift=keys.shiftKey;
                    if(key==' '||key=='enter'){
                        profile.getSubNode('HANDLE',profile.getSubId(src)).onClick();
                        return false;
                    }
                }
            }
        },
        DataModel:{
            $border:0,
            noPanel:null,
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
            var dpn = 'display:none';
            item.closeDisplay = item.closeBtn?'':dpn;
            item.popDisplay = item.popBtn?'':dpn;
            item._opt = item.optBtn?'':dpn;
            item.itemDisplay = item.hidden?dpn:'';

            if(item.height && item.height!='auto'){
                item._itemHeight="height:"+item.height+"px;";
            }

            var prop = profile.properties,o;
            item._tabindex = prop.tabindex;
            if(!item.caption)
                item._capDisplay=dpn;
            else
                item.caption = item.caption.replace(/</g,"&lt;");

            if(item._show){
                item._checked = profile.getClass('ITEM','-checked');
                item._tlgchecked = profile.getClass('TOGGLE','-checked');
            }
        },
        _onresize:function(profile,width,height,force,key){
            if(force){profile._w=profile._h=null;}
            if(width && profile._w!=width){
                profile._w=width;
                profile.getSubNode("PANEL",true).each(function(panel){
                    if(panel.offsetWidth)
                        xui(panel).width('auto').width(xui(panel).width());
                });
            }
        },
        _adjustScroll:null
    }
});
