Class("xui.UI.StatusButtons", ["xui.UI.List"],{
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        t.className='{_className}';
        t.ITEMS.className='{_bordertype}';
        t.$submap={
            items:{
                ITEM:{
                    className:'xui-ui-btn {itemClass} {_endsClass} {disabled} {readonly}',
                    style:'{itemMargin};{itemWidth};{itemAlign};{itemStyle}',
                    tabindex: '{_tabindex}',
                    ICON:{
                        $order:10,
                        className:'xuicon {imageClass}',
                        style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                    },
                    CAPTION:{
                        $order:11,
                        text:'{caption}'
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
                overflow:'auto',
                'overflow-x': 'hidden'
            },
            ITEM:{
                'vertical-align':'middle',
                position:'relative',
                padding:'.25em .5em',
                margin:'0 .5em',
                cursor:'pointer',
                'font-size':xui.__iefix1,
                'line-height':xui.__iefix1,
                'white-space':'nowrap'
            },
            'ITEM-mouseover, ITEM-mousedown, ITEM-checked':{
            },
            'ITEM-mouseover':{
            },
            'ITEM-mousedown':{
            },
            'ITEM-checked':{
            },
            CAPTION:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                'vertical-align':'middle',
                'font-size':'1em'
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
            },
            // deprecated
            itemLinker:{
                hidden:true
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

            if(t = item.itemMargin || p.itemMargin)
                item.itemMargin = "margin:" + t;

            if(t = item.itemWidth || p.itemWidth)
                item.itemWidth = "width:"+ xui.CSS.$forceu(t);

            if(t = item.itemAlign || p.itemAlign)
                item.itemAlign = "text-align:"+ t;

            if(t = item.itemLinker || p.itemLinker)
               item._endsClass = profile.getClass('ITEM', '-'+t) +" "+ (t=="left"?"xui-uiborder-r":t=="right"?"xui-uiborder-l":"xui-uiborder-l xui-uiborder-r");
        }
    }
});

