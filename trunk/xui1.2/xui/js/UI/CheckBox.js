Class("xui.UI.CheckBox", "xui.UI.Button",{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
               profile.getSubNode('MARK').tagClass('-checked', !!value);
            });
        },
        //update UI face
        _setDirtyMark:function(){
            return arguments.callee.upper.apply(this,['CAPTION']);
        }
    },
    Initialize:function(){
        //modify default template for shell
        var t = this.getTemplate();
        _.merge(t.FRAME.FOCUS.TB.TR.TD.BOX,{
            MARK:{
                $order:0,
                className:'xui-uicmd-check'
            }
        },'all');
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            KEY:{
                'font-size':'12px',
                'line-height':'14px',
                border:0,
                cursor:'pointer'
            },
            BORDER:{},
            /*a*/
            FOCUS:{
                overflow:'hidden',
                display:'block',
                position:'absolute',
                left:0,
                top:0,
                'z-index':'200',
                width:'100%',
                height:'100%',
                'outline-offset':'-1px',
                '-moz-outline-offset':(xui.browser.gek && xui.browser.ver<3)?'-1px !important':null
            },
            /*span*/
            BOX:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                'font-size':'12px',
                'line-height':'14px',
                overflow:'hidden',
                'vertical-align':'middle',
                'white-space':'nowrap'
            },
            TD:{
                background:'transparent'
            },
            TDR:{
                background:'transparent'
            },
            TDL:{
                background:'transparent'
            },
            CAPTION:{
                display:'inline',
                'white-space':'normal',
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                cursor:'pointer',
                zoom:xui.browser.ie?0:null
            }
        },
        Behaviors:{
            HoverEffected:{KEY:'MARK'},
            ClickEffected:{KEY:'MARK'},
            onClick:function(profile, e, src){
                var p=profile.properties,b=profile.boxing();
                if(p.disabled || p.readonly)return false;
                //onClick event
                b.setUIValue(!p.$UIvalue);

                if(profile.onChecked)b.onChecked(profile, p.$UIvalue);
                profile.getSubNode('FOCUS').focus();
            },
            FOCUS:{
                onKeydown:function(profile, e, src){
                    var key = xui.Event.getKey(e).key;
                    if(key ==' ' || key=='enter'){
                        profile.getRoot().onClick(true);
                        return false;
                    }
                }
            }
        },
        DataModel:{
            type:null,
            value:false,
            hAlign:'left',
            _customBorder:false,
            border:false
        },
        EventHandlers:{
            onClick:null
        },
        _ensureValue:function(profile, value){
            return !!value;
        }
    }
});
