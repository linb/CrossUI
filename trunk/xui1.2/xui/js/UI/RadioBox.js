Class("xui.UI.RadioBox", "xui.UI.List",{
    Initialize:function(){
        //modify default template for shell
        var t = this.getTemplate();
        t.className='{_className}';
        t.$submap={
            items:{
                ITEM:{
                    className:'{itemClass} {_itemRow} {disabled} {readonly}',
                    style:'{itemStyle}',
                    tabindex: '{_tabindex}',
                    MARK:{
                        $order:0,
                        className:'{_markcls}'
                    },
                    ICON:{
                        $order:1,
                        className:'xui-ui-icon {imageClass}',
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
               'font-family':' "Verdana", "Helvetica", "sans-serif"',
               border:0,
               padding:'4px',
               position:'relative',
               zoom:xui.browser.ie?1:null,
               cursor:'pointer',
               overflow:'hidden',
               'vertical-align':'middle',
               'font-size':'12px'
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
               width:'16px',
               height:'16px',
               'vertical-align':'middle'
            },
            'ITEM-checked MARK':{
                $order:2
            }
        },
        DataModel:{
            borderType:{
                ini:'none'
            },
            checkBox:{
                ini:false,
                action:function(v){
                    this.getSubNode('MARK',true).replaceClass(v ? /(uicmd-radio)|(\s+uicmd-radio)/g : /(^uicmd-check)|(\s+uicmd-check)/g , v ? ' xui-uicmd-check' : ' xui-uicmd-radio');
                }
            },
            itemRow:{
                ini:false,
                action:function(v){
                    var ns=this.getSubNode('ITEM',true);
                    if(v)ns.addClass('xui-item-row');else ns.removeClass('xui-item-row');
                }
            }
        },
        Behaviors:{
            HoverEffected:{ITEM:null,MARK:'MARK'},
            ClickEffected:{ITEM:null,MARK:'MARK'}
        },
        _prepareItem:function(profile, item){
            item._markcls = profile.properties.checkBox?'xui-uicmd-check':'xui-uicmd-radio';
            item._itemRow = profile.properties.itemRow?'xui-item-row':'';
        }
    }
});
