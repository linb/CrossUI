xui.Class("xui.UI.Group", "xui.UI.Panel",{
    Static:{
        Templates:{
            tagName : 'div',
            style:'{_style}',
            className:'{_className}',
            BORDER:{
                tagName : 'fieldset',
                className: '{_fieldCls} xui-uibar-top2',
                TBAR:{
                    tagName : 'legend',
                    style:'{_align}',
                    BARCMDL:{
                        LTAGCMDS:{
                            tagName:'span',
                            className:'xui-ltag-cmds',
                            style:'{_ltagDisplay}',
                            text:"{ltagCmds}"
                        },
                        TOGGLE:{
                            $order:1,
                            className: 'xuifont',
                            $fonticon:'{_fi_toggleCls2}',
                            style:'{toggleDisplay}'
                        },
                        ICON:{
                            $order:2,
                            className:'xuicon {imageClass}  {picClass}',
                            style:'{backgroundImage}{backgroundPosition}{backgroundSize}{backgroundRepeat}{iconFontSize}{imageDisplay}',
                            text:'{iconFontCode}'
                        },
                        CAPTION : {
                            tabindex: '{tabindex}',
                            className:"xui-title-node",
                            text:   '{caption}',
                            $order:3
                        }
                    },
                    BARCMDR:{
                    $order:4,
                        tagName: 'div',
                        className:'xui-uibar-cmdr xui-uibase',
                        RTAGCMDS:{
                            $order:0,
                            tagName:'span',
                            className:'xui-rtag-cmds',
                            style:'{_rtagDisplay}',
                            text:"{rtagCmds}"
                        } ,
                        INFO:{
                            className:'xuicon',
                            $fonticon:'xui-uicmd-info',
                            style:'{infoDisplay}',
                            $order:1
                        },
                        OPT:{
                            className:'xuicon',
                            $fonticon:'xui-uicmd-opt',
                            style:'{optDisplay}',
                            $order:2
                        },
                        POP:{
                            className:'xuicon',
                            $fonticon:'xui-uicmd-pop',
                                style:'{popDisplay}',
                            $order:3
                        },
                        REFRESH:{
                            className:'xuicon',
                            $fonticon:'xui-uicmd-refresh',
                            style:'{refreshDisplay}',
                            $order:4
                        },
                        CLOSE:{
                            className:'xuicon',
                            $fonticon:'xui-uicmd-close',
                            style:'{closeDisplay}',
                            $order:5
                        }
                    }
                },
                PANEL:{
                    $order:1,
                    tagName:'div',
                    style:'{panelDisplay};{_panelstyle};{_overflow};',
                    className:'xui-uicontainer xui-uiborder-radius-bl xui-uiborder-radius-br',
                    text:'{html}'+xui.UI.$childTag
                }
            },
            $submap:xui.UI.$getTagCmdsTpl()
        },
        Appearances:{
            KEY:{
                zoom:xui.browser.ie6?"1":null
            },
            BORDER:{
                position:'relative',
                overflow:'visible',
                zoom:xui.browser.ie6?"1":null
            },
            'LTAGCMDS, RTAGCMDS':{
                padding:0,
                margin:0,
                'vertical-align': 'middle'
            },
            TBAR:{
                width: 'auto',
                padding: '0 0 .1666667em 0',
                margin: '0 0 0 .5em',
                border: 0,
                'font-size': 'inherit'
            },
            'BORDER-checked TBAR':{
                'margin-left':'-.5em'
            },
            'BORDER-checked BARCMDL':{
                'padding-left':'1em'
            },
            BARCMDL:{
                cursor:'default',
                'padding-right':'.25em',
                display:xui.$inlineBlock
            },
            PANEL:{
                position:'relative',
                overflow:'auto',
                'line-height':'normal',
                 background:xui.browser.ie?'url('+xui.ini.img_bg+') no-repeat left top':null
            },
            CAPTION:{
                display:'inline',
                'vertical-align':xui.browser.ie6?'baseline':'middle'
            },
            TOGGLE:{
                padding:'0 .334em 0 0'
            }
        },
        DataModel:{
            dock:'none',
            noFrame:null,
            borderType:null,
            toggleBtn:{
                ini:true
            }
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            if(!profile.properties.toggle)data.height="auto";
            data._fieldCls = data.toggleBtn&&!data.toggle?' xui-uiborder-t':' xui-uiborder-flat xui-uiborder-radius';
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
                //chang toggle button
                if(p.toggleBtn)
                    profile.getSubNode('TOGGLE').tagClass('-checked', !!value);

                var border=profile.getSubNode('BORDER')
                if(value)
                    border.removeClass('xui-uiborder-t').addClass('xui-uiborder-flat xui-uiborder-radius');
                else
                    border.removeClass('xui-uiborder-flat xui-uiborder-radius').addClass('xui-uiborder-t');

                // use onresize function
                profile.adjustSize(true);

                if(!ignoreEvent){
                    if(value){
                        if(ins.afterExpand)
                            ins.afterExpand(profile);
                    }else{
                        if(ins.afterFold)
                            ins.afterFold(profile);
                    }
                }
                // try redock
                if(p.dock && p.dock!='none'){
                    ins.adjustDock(true);
                }
            }
        },
        _onresize:function(profile,width,height){
            var prop=profile.properties,

                // compare with px
                us = xui.$us(profile),
                adjustunit = function(v,emRate){return profile.$forceu(v, us>0?'em':'px', emRate)},

                border = profile.getSubNode('BORDER'),
                panel =profile.getSubNode('PANEL'),
                root = profile.getRoot(),
                cb = border.contentBox(),
                h0=border._borderH(),
                // caculate by px
                ww=width?profile.$px(width):null,
                hh=height?profile.$px(height):null;
            if(height){
                if(profile._toggle){
                    panel.css('display','');
                }else{
                    panel.css('display','none');
                }
                if(height=='auto'){
                    panel.height('auto');
                    border.height('auto');
                    root.height('auto');
                }else{
                    if(profile._toggle){
                        panel.height(adjustunit(hh - profile.getSubNode('TBAR').offsetHeight(true) - h0/2, panel));
                        border.height(adjustunit(hh - (cb?h0:0), border));
                        root.height(adjustunit(hh));
                    }else{
                        // here, panel's display is 'none'
                        border.height('auto');
                        root.height('auto');
                    }
                }
            }

            if(width && width!='auto' && ww>=2 && profile._toggle){
                panel.width(ww = adjustunit(ww-2));
                xui.UI._adjustConW(profile, panel, ww);
            }
        }
    }
});