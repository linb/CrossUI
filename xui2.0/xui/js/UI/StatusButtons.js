Class("xui.UI.StatusButtons", ["xui.UI.List"],{
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        t.className='{_className}';
        t.ITEMS.className='{_bordertype}';
        t.$submap={
            items:{
                ITEM:{
                    className:'{_itemClass} {itemClass} {disabled} {readonly}',
                    style:'{itemPadding};{itemMargin};{itemWidth};{itemAlign};{itemStyle}',
                    tabindex: '{_tabindex}',
                    ICON:{
                        $order:10,
                        className:'xuicon {imageClass}',
                        style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}',
                        text:'{iconFontCode}'
                    },
                    CAPTION:{
                        $order:11,
                        text:'{caption}'
                    },
                    DROP:{
                        $order:12,
                        className:'xuifont',
                        $fonticon:'xui-uicmd-arrowdrop',
                        style:'{_dropDisplay}'
                    },
                    FLAG:{
                        $order:13,
                        className:'xui-display-none {flagClass}',
                        style:'{_flagStyle};{flagStyle}',
                        text:'{flagText}'
                    }
                }
            }
        };
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            ITEMS:{
                position:'relative',
                overflow:'visible'
            },
            ITEM:{
                'vertical-align':'middle',
                position:'relative',
                padding:'.5em',
                margin:'.166667em',
                cursor:'pointer',
                'white-space':'nowrap'
            },
            'ITEM-hover, ITEM-active, ITEM-checked':{
            },
            'ITEM-hover':{
            },
            'ITEM-active':{
            },
            'ITEM-checked':{
            },
            CAPTION:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                'vertical-align':'middle',
                'font-size':'1em'
            },
            DROP:{
                'vertical-align': 'middle'
            },
            FLAG:{
                top:'-.5em',
                right:'-.5em',
                position:'absolute',
                'z-index':10
            }
        },
        DataModel:({
            maxHeight:null,
            tagCmds:null,
            height:'auto',

            itemMargin:{
                ini:"",
                action:function(value){
                    this.getSubNode('ITEM',true).css('margin',v);
                }
            },
            itemPadding:{
                ini:"",
                action:function(v){
                    this.getSubNode('ITEM',true).css('padding',v);
                }
            },
            itemWidth:{
                $spaceunit:1,
                ini:"auto",
                action:function(v){
                    this.getSubNode('ITEM',true).width(v||'auto');
                }
            },
            itemAlign:{
                ini:"",
                listbox:['','left','center','right'],
                action:function(value){
                    this.getSubNode('ITEM',true).css('text-align',value);
                }
            },
            itemType:{
                ini:"button",
                listbox:['text','button','dropButton'],
                action:function(value){
                    this.boxing().refresh();
                }
            },
            connected:{
                ini:false,
                action:function(){
                    this.boxing().refresh();
                }
            }
        }),
        Behaviors:{
            DroppableKeys:["ITEMS"]
        },
        EventHandlers:{
            onCmd:null
        },
        _prepareItem:function(profile, item, a, b, i, l){
            var p = profile.properties, t,
                type=item.type||p.itemType;
            item._tabindex = p.tabindex;

            if(p.connected)item.itemMargin = "margin:" + (i===0?"0":"0 0 0 -1px");
            else if(t = item.itemMargin || p.itemMargin)item.itemMargin = "margin:" + t;
            
            if(t = item.itemPadding || p.itemPadding)item.itemPadding = "padding:" + t;

            if(t = item.itemWidth || p.itemWidth)item.itemWidth = "width:"+ profile.$forceu(t||'auto');
            if(t = item.itemAlign || p.itemAlign)item.itemAlign = "text-align:"+ t;

            if(item.flagText||item.flagClass)item._flagStyle='display:block';
            if(!item.flagClass)item.flagClass='xui-uiflag-1';

            item._itemClass = type == "text" ? "xui-node-a" 
                : ("xui-ui-btn xui-uibar xui-uigradient " + ( p.connected ? ( i==0 ? "xui-uiborder-radius-tl xui-uiborder-radius-bl xui-uiborder-noradius-r" 
                    : i===l-1 ? "xui-uiborder-radius-tr xui-uiborder-radius-br xui-uiborder-noradius-l"
                    :"xui-uiborder-noradius") 
                : "xui-uiborder-radius"));

            item._dropDisplay=type=="dropButton"?'':'display:none';
        }
    }
});

