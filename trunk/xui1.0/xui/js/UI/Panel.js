Class("xui.UI.Panel", "xui.UI.Div",{
    Instance:{
        activate:function(flag){
            var profile, cls=this.constructor;
            if(profile=xui.UI._cache['$'+cls.activeWndId])
                profile.getSubNode('TBAR').tagClass('-focus',false);
            delete cls.activeWndId;

            if(flag!==false){
                profile=this.get(0);
                profile.getSubNode('TBAR').tagClass('-focus');
                profile.getSubNode('CAPTION').focus();
                cls.activeWndId=profile.$xid;
            }
        },
        resetPanelView:function(destroyChildren){
            if(!_.isSet(destroyChildren))destroyChildren=true;
            var ins;
            return this.each(function(profile){
                if(profile.renderId){
                    delete profile.$ini;
                    ins=profile.boxing();
                    ins.removeChildren(true,destroyChildren)
                    if(profile.properties.toggle)
                        ins.setToggle(false);
                }
            });
        }
    },
    Static:{
        Templates:{
            tagName : 'div',
            style:'{_style}',
            className:'{_className}',
            BORDER:{
                tagName:'div',
                TBAR:{
                    tagName:'div',
                    className:'xui-uibar-top',
                    BART:{
                        cellpadding:"0",
                        cellspacing:"0",
                        width:'100%',
                        height:'100%',
                        border:'0',
                        tagName:'table',
                        className:'xui-uibar-t',
                        BARTR:{
                            tagName:'tr',
                            BARTDL:{
                                tagName:'td',
                                className:'xui-uibar-tdl'
                            },
                            BARTDM:{
                                $order:1,
                                width:'100%',
                                tagName:'td',
                                className:'xui-uibar-tdm'
                            },
                            BARTDR:{
                                $order:2,
                                tagName:'td',
                                className:'xui-uibar-tdr'
                            }
                        }
                    },
                    BARCMDL:{
                        tagName: 'div',
                        className:'xui-uibar-cmdl',
                        TOGGLE:{
                            className: 'xui-uicmd-toggle {toggleCls}',
                            style:'{toggleDisplay}',
                            $order:0
                        },
                        ICON:{
                            $order:0,
                            className:'xui-ui-icon {imageClass}',
                            style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                        },
                        CAPTION:{
                            tabindex: '{tabindex}',
                            text : '{caption}',
                            $order:1
                        }
                    },
                    BARCMDR:{
                        tagName: 'div',
                        className:'xui-uibar-cmdr',
                        INFO:{
                            className:'xui-uicmd-info',
                            style:'{infoDisplay}',
                            $order:1
                        },
                        OPT:{
                            className:'xui-uicmd-opt',
                            style:'{optDisplay}',
                            $order:1
                        },
                        POP:{
                            className:'xui-uicmd-pop',
                            style:'{popDisplay}',
                            $order:2
                        },
                        REFRESH:{
                            className:'xui-uicmd-refresh',
                            style:'{refreshDisplay}',
                            $order:3
                        },
                        CLOSE:{
                            className:'xui-uicmd-close ',
                            style:'{closeDisplay}',
                            $order:4
                        }
                    }
                },
                MAIN:{
                    $order:2,
                    tagName:'div',
                    className:'xui-uicon-main',
                    MAINI:{
                        tagName:'div',
                        className:'xui-uicon-maini',
                        PANEL:{
                            tagName:'div',
                            className:'{_bordertype}',
                            style:'{panelDisplay};{_overflow};',
                            text:'{html}'+xui.UI.$childTag
                        }
                    }
                },
                BBAR:{
                    $order:3,
                    tagName:'div',
                    className:'xui-uibar-bottom-s',
                    BBART:{
                        cellpadding:"0",
                        cellspacing:"0",
                        width:'100%',
                        border:'0',
                        tagName:'table',
                        className:'xui-uibar-t',
                        BBARTR:{
                            tagName:'tr',
                            BBARTDL:{
                                tagName:'td',
                                className:'xui-uibar-tdl'
                            },
                            BBARTDM:{
                                $order:1,
                                width:'100%',
                                tagName:'td',
                                className:'xui-uibar-tdm'
                            },
                            BBARTDR:{
                                $order:2,
                                tagName:'td',
                                className:'xui-uibar-tdr'
                            }
                        }
                    }
                }                
            }
        },
        Appearances:{
            KEY:{
                overflow:'hidden',
                background:'transparent'
            },
            'KEY BORDER':{
                zoom:xui.browser.ie6?1:null
            },
            PANEL:{
                position:'relative',
                left:0,
                top:0,
                overflow:'hidden',
                zoom:xui.browser.ie6?1:null
            },

            CAPTION:{
                'font-size':'12px',
                cursor:'pointer',
                display:'inline',
                'vertical-align':xui.browser.ie6?'baseline':'middle'
            }
        },
        Behaviors:{
            DroppableKeys:['PANEL'],
            PanelKeys:['PANEL'],
            DraggableKeys:['TBAR'],
            NoDraggableKeys:['INFO','OPT','CLOSE','POP','REFRESH','TOGGLE','CAPTION'],
            HoverEffected:{INFO:'INFO',OPT:'OPT', CLOSE:'CLOSE',POP:'POP', REFRESH:'REFRESH',TOGGLE:'TOGGLE'},
            ClickEffected:{INFO:'INFO',OPT:'OPT', CLOSE:'CLOSE',POP:'POP', REFRESH:'REFRESH',TOGGLE:'TOGGLE'},
            onSize:xui.UI.$onSize,
            INFO:{
                onClick:function(profile, e, src){
                    profile.boxing().onShowInfo(profile, e, src);
                }
            },
            OPT:{
                onClick:function(profile, e, src){
                    profile.boxing().onShowOptions(profile, e, src);
                }
            },
            REFRESH:{
                onClick:function(profile, e, src){
                    profile.boxing().onRefresh(profile);
                }
            },
            TOGGLE:{
                onClick:function(profile, e, src){
                    profile.box._toggle(profile, !profile.properties.toggle);
                    return false;
                }
            },
            CAPTION:{
                onClick:function(profile, e, src){
                    if(!profile.onClickBar || false===profile.boxing().onClickBar(profile,src))
                        return xui.Event.getKey(e).shiftKey;
                }
            },
            CLOSE:{
                onClick:function(profile, e, src){
                    var properties = profile.properties;
                    if(properties.disabled)return;
                    var instance = profile.boxing();

                    if(false===instance.beforeClose(profile)) return;

                    instance.destroy();

                    //for design mode in firefox
                    return false;
                }
            },
            POP:{
                onClick:function(profile, e, src){
                    var properties=profile.properties;
                    if(properties.disabled)return;
                    var pos = profile.getRoot().offset(), size=profile.getRoot().cssSize(),
                        options={parent:null,host:null,properties:null,events:null,CS:null,CC:null,CB:null,CF:null};

                    if(profile.beforePop && false==profile.boxing().beforePop(profile,options))
                        return false;
                        
                    var pro = _.copy(xui.UI.Dialog.$DataStruct),
                        events={};
                    _.merge(pro, properties, 'with');
                    _.merge(pro,{
                        dock:'none',
                        width:Math.max(size.width,200),
                        height:Math.max(size.height,100),
                        left:pos.left,
                        top:pos.top,
                        landBtn:true
                    },'all');
                     if(options.properties)
                        _.merge(pro, options.properties, 'with');

                    if(options.events)
                        _.merge(events, options.events, 'all');
                    if(!events.onRender){
                        var arr=[];
                        _.arr.each(profile.children,function(o){
                            arr.push(o[0]);
                        });
                        if(arr.length)
                            events.onRender=function(){
                                dialog.append(xui.UI.pack(arr,false));
                            };
                    }                    

                    var dialog = new xui.UI.Dialog(pro,events,options.host||profile.host,options.CS||null,options.CC||null,options.CB||null,options.CF||null);
                    
                    (options.parent||xui('body')).append(dialog);

                    profile.boxing().removeChildren().destroy();

                    //for design mode in firefox
                    return false;
                }
            }
        },
        DataModel:{
            selectable:true,
            position:'absolute',
            zIndex:0,
            dock:'fill',
            // setCaption and getCaption
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
            html:{
                action:function(v){
                    this.getSubNode('PANEL').html(v);
                }
            },
            toggle:{
                ini:true,
                action:function(v){
                    this.box._toggle(this, v);
                }
            },
            infoBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('INFO').css('display',v?'':'none');
                }
            },
            optBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('OPT').css('display',v?'':'none');
                }
            },
            toggleBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('TOGGLE').css('display',v?'':'none');
                }
            },
            closeBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('CLOSE').css('display',v?'':'none');
                }
            },
            refreshBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('REFRESH').css('display',v?'':'none');
                }
            },
            popBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('POP').css('display',v?'':'none');
                }
            },
            borderType:{
                ini:'inset',
                listbox:['none','flat','inset','outset'],
                action:function(v){
                    var ns=this,
                        p=ns.properties,
                        node=ns.getSubNode('PANEL'),
                        reg=/^xui-uiborder-/,
                        pretag='xui-uiborder-',
                        root=ns.getRoot();
                    node.removeClass(reg);
                    node.addClass(pretag+v);

                    //force to resize
                    xui.UI.$tryResize(ns,root.get(0).style.width,root.get(0).style.height,true);
                }
            }
        },
        EventHandlers:{
            onRefresh:function(profile){},
            beforePop:function(profile, options){},
            beforeClose:function(profile){},
            onIniPanelView:function(profile){},
            beforeFold:function(profile){},
            beforeExpend:function(profile){},
            afterFold:function(profile){},
            afterExpend:function(profile){},
            onShowInfo:function(profile, e, src){},
            onShowOptions:function(profile, e, src){},
            onClickBar:function(profile, src){}
        },
        LayoutTrigger:function(){
            var self=this, t=self.properties, b=self.box;
            if(t.toggle)
                b._toggle(self,t.toggle);
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            var nodisplay='display:none';

            data.panelDisplay = data.toggle?'':nodisplay;
            data.toggleCls = data.toggle?'xui-uicmd-toggle-checked':'';

            data.toggleDisplay = data.toggleBtn?'':nodisplay;
            data.infoDisplay = data.infoBtn?'':nodisplay;
            data.optDisplay = data.optBtn?'':nodisplay;
            data.closeDisplay = data.closeBtn?'':nodisplay;
            data.popDisplay = data.popBtn?'':nodisplay;
            data.refreshDisplay= data.refreshBtn?'':nodisplay;
            
            data._bordertype='xui-uiborder-'+data.borderType;
            
            profile._toggle = !!data.toggle;

            return data;
        },
        _onresize:function(profile,width,height){
            var isize={},
                v1=profile.getSubNode('TBAR'),
                v2=profile.getSubNode('PANEL'),
                v4=profile.getSubNode('BBAR'),
                v5=profile.getSubNode('MAIN'),
                v6=profile.getSubNode('MAINI'),
                size=profile.properties.borderType=='none'?0:2,
                h1,h4,t;
            if(height){
                if(height=='auto')
                    isize.height=height;
                else{
                    h1=v1.height(), h4=v4.height();
                    if((t=height-h1-h4)>0)
                        isize.height=t-size;
                }
            }
            if(width)
                isize.width=width-(parseInt(v6.css('paddingRight'),10)||0)-(parseInt(v5.css('paddingLeft'),10)||0)-v2._borderW();
            v2.cssSize(isize, true);
        },

        _toggle:function(profile, value){
            var p=profile.properties, ins=profile.boxing();

            //event
            if(value &&!profile.$ini){
                if(ins.onIniPanelView){
                    if(ins.onIniPanelView(profile)!==false){
                        profile.$ini=true;
                    }
                    
                    if(p.iframeAutoLoad||p.ajaxAutoLoad)
                        xui.UI.Div._applyAutoLoad(profile);
                }
            }

            if(profile._toggle !== !!value){
                //set toggle mark
                profile._toggle = p.toggle = !!value;

                if(value){
                    if(ins.beforeExpend && false===ins.beforeExpend(profile))return;
                }else{
                    if(ins.beforeFold && false===ins.beforeFold(profile))return;
                }

                //show/hide/panel
                profile.getSubNode('PANEL').css('display',value?'':'none');
                //chang toggle button
                if(p.toggleBtn)
                    profile.getSubNode('TOGGLE').tagClass('-checked', !!value);

                var h=profile.getSubNode('BORDER').height();
                // display => adjust ctrl's height to border's
                // display-none => adjust ctrl's height to p.height(expand) or 'auto'(fold)
                profile.getRoot().height(h?h:p.toggle?p.height:'auto');

                if(value){
                    if(ins.afterExpend)
                        ins.afterExpend(profile);
                }else{
                    if(ins.afterFold)
                        ins.afterFold(profile);
                }
            }
        }
    }
});
