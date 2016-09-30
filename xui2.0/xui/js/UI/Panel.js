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
        resetPanelView:function(removeChildren,destroyChildren){
            if(!xui.isSet(removeChildren))removeChildren=true;
            if(!xui.isSet(destroyChildren))destroyChildren=true;
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
                if(!profile.$ini){
                    profile.$ini=true;
                    var p=profile.properties;
                    if(profile.onIniPanelView)profile.boxing().onIniPanelView(profile);
                    if(p.iframeAutoLoad||p.ajaxAutoLoad)
                        xui.UI.Div._applyAutoLoad(profile);
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
                className: 'xui-uiborder-outset xui-uiborder-box xui-uiborder-radius-big',
                TBAR:{
                    tagName:'div',
                    className:'xui-uibar-top',
                    BARTDL:{
                        className:'xui-uibar-tdl xui-uibar xui-uiborder-radius-big-tl',
                        BARTDLT:{
                            className:'xui-uibar-tdlt'
                        }
                    },
                    BARTDM:{
                        $order:1,
                        className:'xui-uibar-tdm xui-uibar',
                        BARTDMT:{
                            className:'xui-uibar-tdmt'
                        }
                    },
                    BARTDR:{
                        $order:2,
                        className:'xui-uibar-tdr xui-uibar xui-uiborder-radius-big-tr',
                        BARTDRT:{
                            className:'xui-uibar-tdrt'
                        }
                    },
                    BARCMDL:{
                        $order:3,
                        tagName: 'div',
                        className:'xui-uibar-cmdl',
                        TOGGLE:{
                            className: 'xuifont',
                            $fonticon:'{_fi_toggleCls2}',
                            style:'{toggleDisplay}',
                            $order:0
                        },
                        ICON:{
                            $order:0,
                            className:'xuicon {imageClass}',
                            style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}',
                            text:'{fontCode}'
                        },
                        CAPTION:{
                            tabindex: '{tabindex}',
                            className:"xui-title-node",
                            text : '{caption}',
                            $order:1
                        }
                    },
                    BARCMDR:{
                        $order:4,
                        tagName: 'div',
                        className:'xui-uibar-cmdr',
                        INFO:{
                            className:'xuifont',
                            $fonticon:'xui-uicmd-info',
                            style:'{infoDisplay}',
                            $order:1
                        },
                        OPT:{
                            className:'xuifont',
                            $fonticon:'xui-uicmd-opt',
                            style:'{optDisplay}',
                            $order:1
                        },
                        POP:{
                            className:'xuifont',
                            $fonticon:'xui-uicmd-pop',
                            style:'{popDisplay}',
                            $order:2
                        },
                        REFRESH:{
                            className:'xuifont',
                            $fonticon:'xui-uicmd-refresh',
                            style:'{refreshDisplay}',
                            $order:3
                        },
                        CLOSE:{
                            className:'xuifont',
                            $fonticon:'xui-uicmd-close',
                            style:'{closeDisplay}',
                            $order:4
                        }
                    }
                },
                MAIN:{
                    $order:2,
                    tagName:'div',
                    className:'xui-uicon-main xui-uibar',
                    style:"{_leftp}",
                    MAINI:{
                        tagName:'div',
                        className:'xui-uicon-maini xui-uibar',
                        style:"{_rightp}",
                        PANEL:{
                            tagName:'div',
                            className:'xui-uibase xui-uicontainer {_bordertype}',
                            style:'{panelDisplay};{_panelstyle};{_overflow};',
                            text:'{html}'+xui.UI.$childTag
                        }
                    }
                },
                BBAR:{
                    $order:3,
                    tagName:'div',
                    className:'xui-uibar-bottom-s',
                    style:"{_bbarDisplay}",
                    BBARTDL:{
                        className:'xui-uibar-tdl xui-uibar xui-uiborder-radius-big-bl'
                    },
                    BBARTDM:{
                        $order:1,
                        className:'xui-uibar-tdm xui-uibar'
                    },
                    BBARTDR:{
                        $order:2,
                        className:'xui-uibar-tdr xui-uibar xui-uiborder-radius-big-br'
                    }
                }
            }
        },
        Appearances:{
            KEY:{
                background:'transparent'
            },
            'KEY BORDER':{
                zoom:xui.browser.ie6?1:null
            },
            'TBART, BBART':{
                'border-spacing':0,
                'border-collapse':'separate'
            },
            PANEL:{
                position:'relative',
                left:0,
                top:0,
                overflow:'auto',
                'line-height':'auto',
                zoom:xui.browser.ie6?1:null
            },
            CAPTION:{
                cursor:'pointer',
                display:'inline',
                padding:'.25em',
                'vertical-align':xui.browser.ie6?'baseline':'middle'
            }
        },
        Behaviors:{
            DroppableKeys:['PANEL'],
            PanelKeys:['PANEL'],
            DraggableKeys:['TBAR'],
            NoDraggableKeys:['INFO','OPT','CLOSE','POP','REFRESH','TOGGLE'],
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
                }
            },
            POP:{
                onClick:function(profile, e, src){
                    var properties=profile.properties;
                    if(properties.disabled)return;
                    var pos = profile.getRoot().offset(), size=profile.getRoot().cssSize(),
                        options={parent:null,host:null,properties:null,events:null,CS:null,CC:null,CB:null,CF:null,init:null};

                    if(profile.beforePop && false==profile.boxing().beforePop(profile,options,e,src))
                        return false;

                    var pro = xui.copy(xui.UI.Dialog.$DataStruct),
                        events={};
                    xui.merge(pro, properties, 'with');
                    xui.merge(pro,{
                        dock:'none',
                        width:Math.max(size.width,200),
                        height:Math.max(size.height,100),
                        left:pos.left,
                        top:pos.top,
                        landBtn:true
                    },'all');
                     if(options.properties)
                        xui.merge(pro, options.properties, 'with');

                    if(options.events)
                        xui.merge(events, options.events, 'all');

                    var dialog = new xui.UI.Dialog(pro,events,options.host||profile.host,options.CS||null,options.CC||null,options.CB||null,options.CF||null);

                    if(xui.isFun(options.init) && false===options.init(dialog,profile,options)){
                    }else{
                        dialog.show(options.parent||xui('body'));
                        var arr=[];
                        xui.arr.each(profile.children,function(o){
                            arr.push(o[0]);
                        });
                        if(arr.length){
                            dialog.append(xui.UI.pack(arr,false));
                        }
                        profile.boxing().removeChildren().destroy(true);
                    }
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
        DataModel:{
            rotate:null,
            selectable:true,
            position:'absolute',
            zIndex:0,
            dock:'fill',
            // setCaption and getCaption
            caption:{
                ini:undefined,
                // ui update function when setCaption
                action: function(v){
                    v=(xui.isSet(v)?v:"")+"";
                    this.getSubNode('CAPTION').html(xui.adjustRes(v,true));
                }
            },
            image:{
                format:'image',
                action: function(value){
                    this.getSubNode('ICON')
                        .css('display',value?'':'none')
                        .css('backgroundImage',value?('url('+xui.adjustRes(value||'')+')'):'');
                }
            },
            imagePos:{
                action: function(value){
                    this.getSubNode('ICON')
                        .css('backgroundPosition', value);
                }
            },
            html:{
                action:function(v,ov,force){
                    this.getSubNode('PANEL').html(xui.adjustRes(v,0,1),null,null,force);
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
            },
            noFrame:{
                ini:false,
                action:function(v){
                    var ns=this,root=ns.getRoot();
                    ns.getSubNode('BBAR').css('display',v?'none':'');
                    ns.getSubNode('MAIN').css('paddingLeft',v?'0':'');
                    ns.getSubNode('MAINI').css('paddingRight',v?'0':'').css('backgroundImage',v?'none':'');
                    //force to resize
                    xui.UI.$tryResize(ns,root.get(0).style.width,root.get(0).style.height,true);
                }
            }
        },
        EventHandlers:{
            onRefresh:function(profile){},
            beforePop:function(profile, options,e,src){},
            beforeClose:function(profile){},
            onIniPanelView:function(profile){},
            beforeFold:function(profile){},
            beforeExpand:function(profile){},
            afterFold:function(profile){},
            afterExpand:function(profile){},
            onShowInfo:function(profile, e, src){},
            onShowOptions:function(profile, e, src){},
            onClickBar:function(profile, src){},
            onClickPanel:function(profile, e, src){}
        },
        LayoutTrigger:function(ns){
            var self=this, t=self.properties;
            // for fold
            if(!t.toggle){
                self.box._toggle(self,false,true);
            }else{
                // for default expand container
                self.boxing().iniPanelView();
            }
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            var nodisplay='display:none';

            data.panelDisplay = data.toggle?'':nodisplay;
            data._fi_toggleCls2 = data.toggle?'xui-uicmd-toggle xuifont-checked xui-uicmd-toggle-checked':'xui-uicmd-toggle';

            data.toggleDisplay = data.toggleBtn?'':nodisplay;
            data.infoDisplay = data.infoBtn?'':nodisplay;
            data.optDisplay = data.optBtn?'':nodisplay;
            data.closeDisplay = data.closeBtn?'':nodisplay;
            data.popDisplay = data.popBtn?'':nodisplay;
            data.refreshDisplay= data.refreshBtn?'':nodisplay;

            data._bordertype='xui-uiborder-'+data.borderType;

            data._bbarDisplay=data.noFrame?nodisplay:"";
            data._leftp=data.noFrame?"padding-left:0;":"";
            data._rightp=data.noFrame?"padding-right:0;background-image:none;":"";

            profile._toggle = !!data.toggle;
            return data;
        },
        _toggle:function(profile, value, ignoreEvent){
            var p=profile.properties, ins=profile.boxing();

            //event
            if(value){
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

                // same to ***
                // for expand status:
                //    adjust ctrl's height to p.height
                // for fold status:
                //    if display => adjust ctrl's height to border's
                //    if non-display => adjust ctrl's height to 'auto'
                if(p.toggle){
                        profile.getRoot().height(p.height);
                }else{
                    var useem = xui.$uem(p),
                        adjustunit = function(v,emRate){return profile.$forceu(v, useem?'em':'px', emRate)},
                        root = profile.getRoot(),
                        h1=profile.getSubNode('BORDER').height();
                    h1 = h1?adjustunit(h1):null;
                    profile.getRoot().height(h1?h1:'auto');
                }

                if(!ignoreEvent){
                    if(value){
                        if(ins.afterExpand)
                            ins.afterExpand(profile);
                    }else{
                        if(ins.afterFold)
                            ins.afterFold(profile);
                    }
                    // try redock
                    if(p.dock && p.dock!='none'){
                        ins.adjustDock(true);
                    }
                }
            }
        },
        _onresize:function(profile,width,height){
           var prop=profile.properties,
                // compare with px
                useem = xui.$uem(prop),
                adjustunit = function(v,emRate){return profile.$forceu(v, useem?'em':'px', emRate)},
                root = profile.getRoot();

            var isize={},
                noFrame=prop.noFrame,
                bd=profile.getSubNode('BORDER'),
                v1=profile.getSubNode('TBAR'),
                v2=profile.getSubNode('PANEL'),
                v4=profile.getSubNode('BBAR'),
                v5=profile.getSubNode('MAIN'),
                v6=profile.getSubNode('MAINI'),
                panelfz = useem?v2._getEmSize():null,
                bordersize=profile.properties.borderType!='none'?v2._borderW():0,
                h0=bd._borderH(),
                h1,h4,t;

            // caculate by px
            if(width && width!='auto')width=profile.$px(width,null, true);
            if(height && height!='auto')height=profile.$px(height,null, true);

            if(height){
                if(height=='auto')
                    isize.height=height;
                else{
                    if(profile._toggle){
                        //force to get height
                        h1=v1.offsetHeight(true);
                        h4=noFrame?0:v4.offsetHeight(true);
                        if((t=height-h0-h1-h4)>0)
                            isize.height=adjustunit(t-bordersize, panelfz);
                    }else{
                        // same to ***
                        // for expand status:
                        //    height is set in upper function
                        // for fold status:
                        //    if display => adjust ctrl's height to border's
                        //    if non-display => adjust ctrl's height to 'auto'
                        h1 = bd.height();
                        h1 = h1?adjustunit(h1):null;
                        profile.getRoot().height(h1 || 'auto');
                    }
                }
            }
            if(width){
                isize.width=adjustunit(width
                    -(noFrame?0:(Math.round(parseFloat(v6.css('paddingRight')))||0))
                    -(noFrame?0:(Math.round(parseFloat(v5.css('paddingLeft')))||0))
                    -h0
                    -bordersize
                    -v5._borderW()
                    -v6._borderW()
                    , panelfz);
            }
            v2.cssSize(isize, true);
        }
    }
});
