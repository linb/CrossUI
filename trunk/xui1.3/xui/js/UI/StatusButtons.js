Class("xui.UI.StatusButtons", ["xui.UI.List"],{
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        t.className='{_className}';
        t.$submap={
            items:{
                ITEM:{
                    className:'{itemClass} {_endsClass} {disabled} {readonly}',
                    style:'{itemMargin};{itemWidth};{itemAlign};{itemStyle}',
                    tabindex: '{_tabindex}',
                    ICON:{
                        $order:10,
                        className:'xui-ui-icon {imageClass}',
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
                height:'16px',
                padding:'3px',
                cursor:'pointer',
                'font-size':0,
                'line-height':0,
                'white-space':'nowrap'
            },
            "ITEM-none":{
                'background-image': xui.UI.$bg('icons.gif', '',true),
                'background-repeat':'no-repeat',
                'background-position':'-12px -130px',
                'border-left':'solid 1px #7C9CBC',
                'border-right':'solid 1px #7C9CBC'
            },
            "ITEM-left":{
                'background-image': xui.UI.$bg('icons.gif', '',true),
                'background-repeat':'no-repeat',
                'background-position':'left -130px',
                'border-right':'solid 1px #7C9CBC'
            },
            "ITEM-right":{
                'background-image': xui.UI.$bg('icons.gif', '',true),
                'background-repeat':'no-repeat',
                'background-position':'right -130px',
                'border-left':'solid 1px #7C9CBC'
            },
            // ignore xui.UI.List setting
            'ITEM-mouseover, ITEM-mousedown, ITEM-checked':{
            },
            'ITEM-mouseover':{},
            'ITEM-mousedown':{},
            'ITEM-checked':{},
            
            'ITEM-left-mouseover':{
                $order:1,
                'background-position': 'left -153px'
            },
            'ITEM-left-mousedown':{
                $order:2,
                'background-position': 'left -176px'
            },
            'ITEM-left-checked':{
                $order:3,
                'background-position': 'left -176px'
            },
            'ITEM-none-mouseover':{
                $order:1,
                'background-position': '-20px -153px'
            },
            'ITEM-none-mousedown':{
                $order:2,
                'background-position': '-20px -176px'
            },
            'ITEM-none-checked':{
                $order:3,
                'background-position': '-20px -176px'
            },
            'ITEM-right-mouseover':{
                $order:1,
                'background-position': 'right -153px'
            },
            'ITEM-right-mousedown':{
                $order:2,
                'background-position': 'right -176px'
            },
            'ITEM-right-checked':{
                $order:3,
                'background-position': 'right -176px'
            },
            CAPTION:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                'vertical-align':'middle',
                'font-size':'12px',
                'line-height':'14px'
            },
            "ITEM-none CAPTION":{
                padding:'1px 4px'
            },
            "ITEM-left":{
                padding:'4px 4px 2px 12px'
            },
            "ITEM-right":{
                padding:'4px 12px 2px 2px'
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
            itemLinker:{
                ini:'left',
                listbox:['none','left','right'],
                action:function(value){
                    this.getSubNode('ITEM',true)
                    .tagClass('-none', false)
                    .tagClass('-left', false)
                    .tagClass('-right', false)
                    .tagClass('-'+value, true);
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

            if(t = item.itemMargin || p.itemMargin)
                item.itemMargin = "margin:" + t;

            if(t = item.itemWidth || p.itemWidth)
                item.itemWidth = "width:"+ ( t=='auto'?t:(t+'px'));

            if(t = item.itemAlign || p.itemAlign)
                item.itemAlign = "text-align:"+ t;

            if(t = item.itemLinker || p.itemLinker)
               item._endsClass = profile.getClass('ITEM', '-'+t);
        }
    }
});

