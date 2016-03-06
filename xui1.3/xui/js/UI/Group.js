Class("xui.UI.Group", "xui.UI.Div",{
    Instance:{
        activate:function(){
            var profile = this.get(0);
            profile.getSubNode('HANDLE').focus();
            return this;
        },
        resetPanelView:function(removeChildren,destroyChildren){
            if(!_.isSet(removeChildren))removeChildren=true;
            if(!_.isSet(destroyChildren))destroyChildren=true;
            var ins;
            return this.each(function(profile){
                if(profile.renderId){
                    delete profile.$ini;
                    if(removeChildren){
                        ins=profile.boxing();
                        ins.removeChildren(true,destroyChildren);
                    }
                    if(profile.properties.toggle)
                        ins.setToggle(false);
                }
            });
        },
        iniPanelView:function(){
            return this.each(function(profile){
                profile.$ini=true;
                var p=profile.properties;
                if(profile.onIniPanelView)profile.boxing().onIniPanelView(profile);
                if(p.iframeAutoLoad||p.ajaxAutoLoad)
                    xui.UI.Div._applyAutoLoad(profile);
            });
        }
    },
    Static:{
        Behaviors:{
            NavKeys:{CAPTION:1},
            HoverEffected:{TOGGLE:'TOGGLE'},
            ClickEffected:{TOGGLE:'TOGGLE'},
            DroppableKeys:['PANEL'],
            PanelKeys:['PANEL'],
            DraggableKeys:['HANDLE'],
            onSize:xui.UI.$onSize,
            HANDLE:{
                onClick:function(profile, e, src){
                    if(profile.properties.toggleBtn){
                        profile.box._toggle(profile, !profile.properties.toggle);
                        return false;
                    }
                },
                onKeydown : function(profile, e, src){
                    if(xui.Event.getKey(e).key=='enter')
                        xui(src).onClick();
                }
            },
            PANEL:{
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return false;
                    if(profile.onClickPanel)
                        return profile.boxing().onClickPanel(profile, e, src);
                }
            }
        },
        Templates:{
            tagName : 'div',
            style:'{_style}',
            className:'{_className}',
            FIELDSET:{
                tagName : 'fieldset',
                className: ' {toggleCls}',
                LEGEND:{
                    tagName : 'legend',
                    HANDLE:{
                        tabindex: '{tabindex}',
                        TOGGLE:{
                            className: 'xui-uicmd-toggle2 {toggleCls2}',
                            style:"{toggleDispplay}"
                        },
                        ICON:{
                            $order:1,
                            className:'xui-ui-icon {imageClass}',
                            style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                        },
                        CAPTION : {
                            text:   '{caption}',
                            $order:2
                        }
                    }
                },
                PANEL:{
                    $order:1,
                    tagName:'div',
                    style:'{panelDisplay};{_panelstyle};{_overflow};',
                    text:'{html}'+xui.UI.$childTag
                }
            }
        },
        Appearances:{
            KEY:{
                zoom:xui.browser.ie6?"1":null
            },
            FIELDSET:{
                border:'1px solid #7ba3cb',
                position:'relative',
                overflow:'hidden',
                zoom:xui.browser.ie6?"1":null
            },
            'FIELDSET-checked':{
                $order:2,
                'padding-left':'2px',
                'border-left':'0',
                'border-right':'0',
                'border-bottom':'0'
            },
            LEGEND:{
                'margin-left':'3px'
            },
            HANDLE:{
                cursor:'default',
                padding:'0 3px 0 6px',
                display:xui.$inlineBlock
            },
            PANEL:{
                position:'relative',
                overflow:'auto',
                'line-height':'auto',
                 background:xui.browser.ie?'url('+xui.ini.img_bg+') no-repeat left top':null
            },
            'FIELDSET-checked PANEL':{
                $order:4,
                display:'none'
            },
            CAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                'font-size':'12px',
                'line-height':'18px'
            }
        },

        DataModel:{
            rotate:null,
            selectable:true,
            caption:{
                ini:undefined,
                // ui update function when setCaption
                action: function(v){
                    v=(_.isSet(v)?v:"")+"";
                    this.getSubNode('CAPTION').html(xui.adjustRes(v,true));
                }
            },
            html:{
                action:function(v){
                    this.getSubNode('PANEL').html(xui.adjustRes(v,0,1));
                }
            },
            toggleBtn:{
                ini:true,
                action:function(v){
                    this.getSubNode('TOGGLE').css('display',v?'':'none');
                }
            },
            toggle:{
                ini:true,
                action:function(v){
                    this.box._toggle(this, v);
                }
            },
            image:{
                format:'image',
                action: function(value){
                    this.getSubNode('ICON')
                        .css('display',value?'':'none')
                        .css('backgroundImage',value?('url('+xui.adjustRes(value||'')+')'):"");
                }
            },
            imagePos:{
                action: function(value){
                    this.getSubNode('ICON')
                        .css('backgroundPosition', value);
                }
            }
        },
        LayoutTrigger:function(){
            var self=this, t=self.properties;
            // for expand
            if(!t.toggle){
                self.box._toggle(self,false,true);
            }else{
                // for default expand container
                self.boxing().iniPanelView();
            }
        },
        EventHandlers:{
            onIniPanelView:function(profile){},
            beforeFold:function(profile){},
            beforeExpand:function(profile){},
            afterFold:function(profile){},
            afterExpand:function(profile){},
            onClickPanel:function(profile, e, src){}
        },
        _prepareData:function(profile){
            var data={};
            if(!profile.properties.toggle)data.height="auto";
            data=arguments.callee.upper.call(this, profile, data);
            var nodisplay='display:none';

            data.toggleDispplay=data.toggleBtn?'':nodisplay;

            data.panelDisplay = data.toggleBtn&&!data.toggle?nodisplay:'';
            data.toggleCls = data.toggleBtn&&!data.toggle?profile.getClass('FIELDSET','-checked'):'';
            data.toggleCls2 = data.toggleBtn&&data.toggle?'xui-uicmd-toggle2-checked':'';

            profile._toggle = !!data.toggle;

            return data;
        },
        _toggle:function(profile, value, ignoreEvent){
            var p=profile.properties, ins=profile.boxing();

            //event
            if(value && !profile.$ini){
                ins.iniPanelView();
            }
            if(ignoreEvent || profile._toggle !== !!value){
                //set toggle mark
                profile._toggle = p.toggle = !!value;

                if(!ignoreEvent){
                    if(value){
                        if(ins.beforeExpand && false===ins.beforeExpand(profile))return;
                    }else{
                        if(ins.beforeFold && false===ins.beforeFold(profile))return;
                    }
                }
                //show/hide/panel
                profile.getSubNode('PANEL').css('display',value?'':'none');
                //chang toggle button
                if(p.toggleBtn)
                    profile.getSubNode('TOGGLE').tagClass('-checked', !!value);

                profile.getSubNode('FIELDSET').tagClass('-checked',!value);

                var h=profile.getSubNode('LEGEND').height();
                // same to ***
                // for expand status:
                //    adjust ctrl's height to p.height
                // for fold status:
                //    if display => adjust ctrl's height to legend's
                //    if non-display => adjust ctrl's height to 'auto'
                profile.getRoot().height(p.toggle?p.height:h?h:'auto');

                if(!ignoreEvent){
                    if(value){
                        if(ins.afterExpand)
                            ins.afterExpand(profile);
                    }else{
                        if(ins.afterFold)
                            ins.afterFold(profile);
                    }
                }
            }
        },
        _onresize:function(profile,width,height){
            if(profile._toggle){
                if(height && height!='auto'){
                    profile.getSubNode('FIELDSET').height(height);
                    profile.getSubNode('PANEL').height(height-(profile.getSubNode('LEGEND').height()||18));
                }
            }else{
                // same to ***
                // for expand status:
                //    height is set in upper function
                // for fold status:
                //    if display => adjust ctrl's height to legend's
                //    if non-display => adjust ctrl's height to 'auto'
                profile.getRoot().height(profile.getSubNode('LEGEND').height() || 'auto');
            }
            if(width && width!='auto')
                profile.getSubNode('PANEL').width(width-2);
        }
    }
});