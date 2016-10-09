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
                    style:'{itemMargin};{itemWidth};{itemAlign};{itemStyle}',
                    tabindex: '{_tabindex}',
                    ICON:{
                        $order:10,
                        className:'xuicon {imageClass}',
                        style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}',
                        text:'{fontCode}'
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
                        className:'xui-uiflag-1 xui-display-none {flagClass}',
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
                padding:'.25em .5em',
                margin:'0 .5em',
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
                right:'-.5em'
            }
        },
        DataModel:({
            maxHeight:null,
            tagCmds:null,
            
            itemMargin:{
                ini:"",
                action:function(value){
                    this.getSubNode('ITEM',true).css('margin',value);
                }
            },
            itemWidth:{
                ini:0,
                action:function(value){
                    this.getSubNode('ITEM',true).width(value||'auto');
                }
            },
            itemAlign:{
                ini:"",
                listbox:['','left','center','right'],
                action:function(value){
                    this.getSubNode('ITEM',true).css('text-align',value);
                }
            }
        }),
        Behaviors:{
            DroppableKeys:["ITEMS"]
        },
        EventHandlers:{
            onCmd:null
        },
        _prepareItem:function(profile, item){
            var p = profile.properties, t;
            item._tabindex = p.tabindex;

            if(t = item.itemMargin || p.itemMargin)item.itemMargin = "margin:" + t;
            if(t = item.itemWidth || p.itemWidth)item.itemWidth = "width:"+ xui.CSS.$forceu(t);
            if(t = item.itemAlign || p.itemAlign)item.itemAlign = "text-align:"+ t;
            if(item.flagText)item._flagStyle='display:block';

            // item.type: text button dropButton
            item._itemClass=item.type=="text"?"xui-node-a":"xui-ui-btn xui-uiborder-radius";
            item._dropDisplay=item.type=="dropButton"?'':'display:none';
        }
    }
});

