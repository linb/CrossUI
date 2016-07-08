Class("xui.UI.RadioBox", "xui.UI.List",{
    Initialize:function(){
        //modify default template for shell
        var t = this.getTemplate();
        t.className='{_className}';
        t.ITEMS.className='{_bordertype}';
        t.$submap={
            items:{
                ITEM:{
                    className:'{_itemRow} {itemClass} {disabled} {readonly}',
                    style:'{itemStyle}{_itemDisplay}',
                    tabindex: '{_tabindex}',
                    MARK:{
                        $order:0,
                        className:'xuicon {_markcls}'
                    },
                    ICON:{
                        $order:1,
                        className:'xuicon {imageClass}',
                        style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                    },
                    CAPTION:{
                        text : '{caption}',
                        $order:2
                    }
                }
            }
        };
        this.setTemplate(t);
    },
    Static:{
        _DIRTYKEY:'MARK',
        _ITEMMARKED:true,
        Appearances:{
            ITEM:{
               display:xui.$inlineBlock,
               border:0,
               padding:'4px',
               position:'relative',
               zoom:xui.browser.ie?1:null,
               cursor:'pointer',
               overflow:'hidden',
               'vertical-align':'middle'
            },
            'ITEM-checked':{
                
            },
            CAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle'
            },
            ITEMS:{
                overflow:'auto',
                'overflow-x': 'hidden',
                position:'relative',
                'line-height':'14px'
            },
            MARK:{
               $order:1,
               cursor:'pointer',
               margin: '0 4px 0 2px',
               'vertical-align':'middle'
            }
        },
        DataModel:{
            tagCmds:null,
            borderType:{
                ini:'none'
            },
            checkBox:{
                ini:false,
                action:function(v){
                    this.getSubNode('MARK',true).replaceClass(v ? /(uicmd-radio)|(\s+uicmd-radio)/g : /(^uicmd-check)|(\s+uicmd-check)/g , v ? ' xui-uicmd-check' : ' xui-uicmd-radio');
                }
            }
        },
        Behaviors:{
            HoverEffected:{ITEM:null,MARK:'MARK'},
            ClickEffected:{ITEM:null,MARK:'MARK'}
        },
        EventHandlers:{
            onCmd:null
        },
        _prepareItem:function(profile, item){
            item._markcls = profile.properties.checkBox?'xui-uicmd-check':'xui-uicmd-radio';
            item._itemRow = profile.properties.itemRow?'xui-item-row':'';
        }
    }
});
