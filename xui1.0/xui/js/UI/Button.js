Class("xui.UI.Button", ["xui.UI.Widget","xui.absValue"],{
    Instance:{
        activate:function(){
            this.getSubNode('FOCUS').focus();
            return this;
        },
        _setCtrlValue:function(value){
            if(_.isNull(value) || !_.isDefined(value))value=false;
            return this.each(function(profile){
                var pp=profile.properties;
                if(pp.type!='status')return;
                profile.getSubNode('BORDER').tagClass('-checked', value);

                if(pp.border){
                    var b = profile.getSubNode('BORDER').$getBorder();
                    if(b)b.get(0).getRoot().tagClass('-checked', value);
                }
            });
        },
        _setDirtyMark:function(){
            return arguments.callee.upper.apply(this,['FOCUS']);
        },
        resetValue:function(value){
            this.each(function(p){
                if(p.properties.type=='drop')
                    p.boxing().setCaption("",true);
            });
            return arguments.callee.upper.apply(this,arguments);
        },
        setUIValue:function(value, force){
            this.each(function(profile){
                var p=profile.properties;
                if(p.$UIvalue!==value && p.type=='drop')
                    profile.boxing().setCaption("",true);
            });
            return arguments.callee.upper.apply(this,arguments);
        }
    },
    Initialize:function(){
        this.addTemplateKeys(['DROP']);
        //modify default template for shell
        var t = this.getTemplate();
        _.merge(t.FRAME,{
            FOCUS:{
                $order:2,
                className:"xui-ui-unselectable",
                tabindex: '{tabindex}',
                TB:{
                    cellpadding:"0",
                    cellspacing:"0",
                    width:'100%',
                    height:'100%',
                    border:'0',
                    tagName:'table',
                    TR:{
                        tagName:'tr',
                        TDL:{
                            tagName:'td'
                        },
                        TD:{
                            $order:1,
                            align:'{hAlign}',
                            valign:'{vAlign}',
                            tagName:'td',
                            width:'100%',
                            height:'100%',
                            BOX:{
                                ICON:{
                                    $order:1,
                                    className:'xui-ui-icon {imageClass}',
                                    style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                                },
                                CAPTION:{
                                    $order:2,
                                    text: '{caption}'
                                }
                            }
                        },
                        TDR:{
                            $order:2,
                            tagName:'td',
                            className:'{dropCls}',
                            TDRI:{}
                        }
                    }
                }
            }
        },'all');
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            KEY:{
                'font-size':'12px',
                'line-height':'14px'
            },
            BORDER:{
                'font-size':0,
                'line-height':0,
                'background-color':'#D2D7DF'
            },
            'BORDER-mouseover':{
                $order:2,
                'background-color':'#F7D928'
            },
            'BORDER-mousedown, BORDER-checked':{
                $order:2,
                'background-color':'#F9E56A'
            },
            'DROP':{
                $order:10,
                background: xui.UI.$bg('drop.gif', 'no-repeat left bottom','Button'),
                'padding-left':'16px'
            },
            'DROP-mouseover':{
                $order:11,
                'background-position':'-16px bottom'
            },
            'DROP-mousedown':{
                $order:12,
                'background-position':'right bottom'
            },
            'TDR,TDL':{
                'padding-left':'6px'
            },
//border<<<
            '.setting-xui-button':{
                'border-top-width':'1px',
                'border-bottom-width':'1px',
                'border-left-width':'1px',
                'border-right-width':'1px'
            },
            'KEY-b-t':{
                top:'-1px',
                height:'10px',
                background: xui.UI.$bg('vertical.gif', 'repeat-x left top','Button')
            },
            'KEY-b-b':{
                bottom:'-1px',
                height:'10px',
                background: xui.UI.$bg('vertical.gif', 'repeat-x left bottom','Button')
            },
            'BORDER-mouseover KEY-b-t, BORDER-mouseover KEY-b-b':{
                $order:1,
                'background-image':xui.UI.$bg('vertical_mouseover.gif','','Button')
            },
            'BORDER-checked KEY-b-t, BORDER-checked KEY-b-b, BORDER-mousedown KEY-b-t, BORDER-mousedown KEY-b-b':{
                $order:2,
                'background-image':xui.UI.$bg('vertical_mousedown.gif','','Button')
            },
            'KEY-b-l':{
                left:'-1px',
                width:'4px',
                background: xui.UI.$bg('horizontal.gif', 'repeat-y left top','Button')
            },
            'KEY-b-r':{
               right:'-1px',
               width:'4px',
               background: xui.UI.$bg('horizontal.gif', 'repeat-y right top','Button')
            },
            'BORDER-mouseover KEY-b-l, BORDER-mouseover KEY-b-r':{
                $order:1,
                'background-image': xui.UI.$bg('horizontal_mouseover.gif','','Button')
            },
            'BORDER-checked KEY-b-l, BORDER-checked KEY-b-r, BORDER-mousedown KEY-b-l, BORDER-mousedown KEY-b-r':{
                $order:2,
                'background-image': xui.UI.$bg('horizontal_mousedown.gif','','Button')
            },
            'KEY-b-lt':{
                top:'-1px',
                left:'-1px',
                width:'4px',
                height:'10px',
                background: xui.UI.$bg('corner.gif', 'no-repeat left top','Button')
            },
            'KEY-b-rt':{
               top:'-1px',
               right:'-1px',
               width:'4px',
               height:'10px',
               background: xui.UI.$bg('corner.gif', 'no-repeat right top','Button')
            },
            'KEY-b-rb':{
                right:'-1px',
                bottom:'-1px',
                width:'4px',
                height:'10px',
                background: xui.UI.$bg('corner.gif', 'no-repeat right bottom','Button')
            },
            'KEY-b-lb':{
                left:'-1px',
                bottom:'-1px',
                width:'4px',
                height:'10px',
                background: xui.UI.$bg('corner.gif', 'no-repeat left bottom','Button')
            },
            'BORDER-mouseover KEY-b-lt, BORDER-mouseover KEY-b-rt, BORDER-mouseover KEY-b-rb, BORDER-mouseover KEY-b-lb':{
                $order:1,
                'background-image': xui.UI.$bg('corner_mouseover.gif','','Button')
            },
            'BORDER-checked KEY-b-lt, BORDER-checked KEY-b-rt, BORDER-checked KEY-b-rb, BORDER-checked KEY-b-lb, BORDER-mousedown KEY-b-lt, BORDER-mousedown KEY-b-rt, BORDER-mousedown KEY-b-rb, BORDER-mousedown KEY-b-lb':{
                $order:2,
                'background-image' : xui.UI.$bg('corner_mousedown.gif','','Button')
            },
//border>>>
            /*a*/
            FOCUS:{
                overflow:'hidden',
                display:'block',
                left:0,
                top:0,
                'z-index':'20',
                width:'100%',
                height:'100%',
                position:'absolute',
                'outline-offset':'-1px',
                '-moz-outline-offset':(xui.browser.gek && xui.browser.ver<3)?'-1px !important':null
            },
            /*span*/
            BOX:{
                display:'inline',
                'white-space':'nowrap'
            },
            CAPTION:{
                cursor:'pointer',
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                display:'inline',
                'font-size':'12px',
                'line-height':'14px'
            }
        },
        Behaviors:{
            HoverEffected:{KEY:['BORDER']},
            ClickEffected:{KEY:['BORDER']},
            NavKeys:{FOCUS:1},
            onClick:function(profile, e, src){
                var p=profile.properties;
                if(p.disabled)return false;

                //before event
                profile.getSubNode('FOCUS').focus();

                var b=profile.boxing();

                if(p.type=='status'){
                    if(p.readonly)return false;
                    
                    b.setUIValue(!p.$UIvalue);
                    if(profile.onChecked)
                        b.onChecked(profile, e, p.$UIvalue);
                }

                //onClick event
                if(profile.onClick)
                    b.onClick(profile, e, src, p.$UIvalue);

            },
            onKeydown:function(profile, e, src){
                var keys=xui.Event.getKey(e), key = keys.key;
                if(key==' '||key=='enter'){
                    profile.getSubNode('KEY').afterMousedown();
                    profile.__fakeclick=1;
                }
            },
            onKeyup:function(profile, e, src){
                var keys=xui.Event.getKey(e), key = keys.key;
                if(key==' '||key=='enter'){
                    profile.getSubNode('KEY').afterMouseup();
                    if(profile.__fakeclick)
                        xui.use(src).onClick();
                }
                delete profile.__fakeclick;
            },
            TDR:{
                onMousedown:function(profile,e,src){
                    if(profile.properties.type!='drop')return;
                    xui.use(src).addClass(profile.getClass('DROP','-mousedown'));
                    return false;
                },
                onMouseup:function(profile,e,src){
                    if(profile.properties.type!='drop')return;
                    xui.use(src).removeClass(profile.getClass('DROP','-mousedown'));
                    return false;
                },
                onMouseover:function(profile,e,src){
                    if(profile.properties.type!='drop')return;
                    xui.use(src).addClass(profile.getClass('DROP','-mouseover'));
                },                
                onMouseout:function(profile,e,src){
                    if(profile.properties.type!='drop')return;
                    xui.use(src).removeClass(profile.getClass('DROP','-mouseover')).removeClass(profile.getClass('DROP','-mousedown'));
                },
                onClick:function(profile, e, src){
                    if(profile.properties.type!='drop')return;
                    profile.boxing().onClickDrop(profile, e, src);
                    return false;
                }
            }
        },
        DataModel:{
            caption:{
                ini:undefined,
                // ui update function when setCaption
                action: function(v){
                    v=(_.isSet(v)?v:"")+"";
                    this.getSubNode('CAPTION').html(xui.adjustRes(v,true));
                }
            },
            image:{
                format:'image',
                action: function(value){
                    this.getSubNode('ICON')
                        .css('display',value?'':'none')
                        .css('backgroundImage','url('+xui.adjustRes(value||'')+')');
                }
            },
            imagePos:{
                action: function(value){
                    this.getSubNode('ICON')
                        .css('backgroundPosition', value);
                }
            },
            hAlign:{
                ini:'center',
                listbox:['left','center','right'],
                action: function(v){
                    this.getSubNode('TD').attr('align',v);
                }
            },
            vAlign:{
                ini:'middle',
                listbox:['top','middle','bottom'],
                action: function(v){
                    this.getSubNode('TD').attr('valign',v);
                }
            },
            value:false,
            type:{
                ini:'normal',
                listbox:['normal','status','drop'],
                action:function(value){
                    var self=this,
                        root=self.getRoot(),
                        tdr=self.getSubNode('TDR'),
                        drop=self.getClass('DROP');
                    if(value=='drop')
                        tdr.addClass(drop);
                    else
                        tdr.removeClass(drop);
                    self.box._onresize(self);
                }
            },
            width:120,
            height:22,
            _customBorder:'BORDER',
            border:true
        },
        _ensureValue:function(profile,value){
            if(profile.properties.type=="status")
                return !!value;
            else
                return value;
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            data.dropCls = data.type=='drop'?profile.getClass('DROP'):'';
            return data;
        },
        RenderTrigger:function(){
            var self=this,p = self.properties, o=self.boxing();
            //set value later
            if(p.type=='status' && p.value)
                o.setValue(true, true);
        },
        EventHandlers:{
            onClick:function(profile, e, src, value){},
            onClickDrop:function(profile, e, src){},
            onChecked:function(profile, e, value){}
        }
    }
});