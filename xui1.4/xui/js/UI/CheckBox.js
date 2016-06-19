
Class("xui.UI.CheckBox", ["xui.UI","xui.absValue"],{
    Initialize:function(){
        // compitable
        xui.UI.SCheckBox = xui.UI.CheckBox;
    },
    Instance:{
        activate:function(){
            this.getSubNode('FOCUS').focus();
            return this;
        },
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
    Static:{
        Templates:{
            className:'{_className}',
            style:'{_style}',
            FOCUS:{
                tabindex: '{tabindex}',
                MARK:{
                    $order:0,
                    className:'xui-uicmd-check'
                },
                ICON:{
                    $order:1,
                    className:'xui-ui-icon {imageClass}',
                    style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                },
                CAPTION:{
                    $order:2,
                    text:'{caption}'
                }
            }
        },
        Appearances:{
            KEY:{
                overflow:'visible'
            },
            FOCUS:{
                cursor:'default',
                'vertical-align':'middle',
                padding:'2px 0',
                'font-size':'12px',
                'line-height':'22px'
            },
            CAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle'
            }
        },
        Behaviors:{
            HoverEffected:{KEY:'MARK'},
            ClickEffected:{KEY:'MARK'},
            NavKeys:{FOCUS:1},
            onClick:function(profile, e, src){
                var p=profile.properties,b=profile.boxing();
                if(p.disabled)return false;
                if(p.readonly)return false;
                b.setUIValue(!p.$UIvalue,null,null,'click');
                if(profile.onChecked)b.onChecked(profile, e, p.$UIvalue);
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
            value:false,
            image:{
                format:'image',
                action: function(value){
                    this.getSubNode('ICON')
                        .css('display',value?'':'none')
                        .css('backgroundImage',value?('url('+xui.adjustRes(value)+')'):"");
                }
            },
            imagePos:{
                action: function(value){
                    this.getSubNode('ICON')
                        .css('backgroundPosition', value);
                }
            },
            caption:{
                ini:undefined,
                action: function(v){
                    v=(_.isSet(v)?v:"")+"";
                    this.getSubNode('CAPTION').html(xui.adjustRes(v,true));
                }
            }
        },
        EventHandlers:{
            onChecked:function(profile, e, value){}
        },
        _ensureValue:function(profile, value){
            return !!value;
        }
    }
});
