Class('xui.UI.ColorPicker', ['xui.UI',"xui.absValue"], {
    Instance:{
        activate:function(){
            this.getSubNode('TOGGLE').focus();
            return this;
        },
        _setCtrlValue:function(value,inner){
            return this.each(function(profile){
                if(!profile.renderId)return;
                var cls = profile.box,
                    p = profile.properties;
                if(value && value.toLowerCase()=='transparent')value='transparent';

                var hex = profile.$hex = cls._to3(value),
                    hexs = profile.$hex.join(''),
                    rgb = profile.$rgb = cls.hex2rgb(value),
                    hsv = profile.$hsv = cls.rgb2hsv(rgb),
                    f=function(s,v){profile.getSubNode(s).get(0).firstChild.nodeValue=String(v)},
                    ff=function(v){return parseInt(v*100,10)};
                if(value=='transparent'){
                    hex=profile.$hex = ['00','00','00'];
                    rgb=profile.$rgb = [0,0,0];
                    hsv=profile.$hsv = [0,0,0];
                };

                f('R',rgb[0]);
                f('G',rgb[1]);
                f('B',rgb[2]);
                f('H',hex[0]);
                f('E',hex[1]);
                f('X',hex[2]);

                //dont update hsv UI again, if hsv value is the newest
                if(profile.$hexinhsv != hexs){
                    f('HH',hsv[0]);
                    f('S',ff(hsv[1]));
                    f('V',ff(hsv[2]));
                    delete profile.$hexinhsv;
                }
                cls._setClrName(profile,value=='transparent'?value:hexs);
                cls._updateDftTip(profile);
                //dont update adv UI again, if adv value is the newest
                if(p.advance && profile.$hexinadv != hexs){
                    cls._updateMarks(profile, value, true, hsv[0]);
                    delete profile.$hexinadv;
                }
                //from setUIValue/setValue
                if(inner!=false)
                    profile.getSubNode('CAPTION').html((value=='transparent'?'':'#')+value,false);
           });
        },
        getColorName:function(){
            return this.get(0).$clrN||'';
        }
    },
    Initialize:function(){
        var ns=this,
            id=xui.UI.$ID,
            cls=xui.UI.$CLS,
            tag=xui.UI.$tag_special,
            key=ns.KEY,
            list=ns._slist,
            l=list.length,
            i,data,
            arr=[],
            evs=xui.$IEUNSELECTABLE(),
            evs2='style="visibility:hidden;"',
            ddcls = 'xui-node xui-node-span xui-ui-draggable xui-uibase xui-uiborder-flat xui-uiborder-radius';

        ns.addTemplateKeys(['DD1', 'DD2', 'DD3','R','G','B','TXT','HH','S','V','H','E','X']);

        //simple list
        for(i=0;i<l;i++){
            arr.push('<span  '+'id="'+key+'-SC:'+id+':'+list[i]+'" style="background-color:#'+list[i]+'" '+evs+' class="xui-node xui-span xuicon xui-uiborder-flat xui-uiborder-radius xui-icon-empty">'+(xui.__iefix2&&xui.__iefix2['xui-icon-empty']||'')+'</span>');
            if((i+1)%17==0)arr.push('<br />');
        }
        //data
        data = '<div '+evs+'><span class="'+cls+'-txt"'+evs+'>R: </span><span '+'id="'+key+'-R:'+id+':" class="'+cls+'-dd2 '+ddcls+' '+tag+'DD2_CC'+tag+'" '+evs+'>R</span><span '+evs2+'>%</span><span class="'+cls+'-txt"'+evs+'>G: </span><span '+'id="'+key+'-G:'+id+':" class="'+cls+'-dd2 '+ddcls+'  '+tag+'DD2_CC'+tag+'" '+evs+'>G</span><span '+evs2+'>\xB0</span><span class="'+cls+'-txt"'+evs+'>B: </span><span '+'id="'+key+'-B:'+id+':" class="'+cls+'-dd2 '+ddcls+'  '+tag+'DD2_CC'+tag+'" '+evs+'>B</span></div>' +
                '<div '+evs+'><span class="'+cls+'-txt"'+evs+'>S: </span><span '+'id="'+key+'-S:'+id+':" class="'+cls+'-dd2 '+ddcls+'  '+tag+'DD2_CC'+tag+'"  '+evs+'>S</span><span '+evs+'>%</span><span class="'+cls+'-txt"'+evs+'>H: </span><span '+'id="'+key+'-HH:'+id+':" class="'+cls+'-dd2 '+ddcls+'  '+tag+'DD2_CC'+tag+'" '+evs+'>H</span><span '+evs+'>\xB0</span><span class="'+cls+'-txt"'+evs+'>V: </span><span '+'id="'+key+'-V:'+id+':" class="'+cls+'-dd2 '+ddcls+'  '+tag+'DD2_CC'+tag+'" '+evs+'>V</span><span '+evs+'>%</span></div>' +
               '<div '+evs+'><span class="'+cls+'-txt"'+evs+'>HEX: </span><span '+'id="'+key+'-H:'+id+':" class="'+cls+'-dd3 '+ddcls+'  '+tag+'DD3_CC'+tag+'" '+evs+'>H</span><span '+'id="'+key+'-E:'+id+':" class="'+cls+'-dd3 '+ddcls+'  '+tag+'DD3_CC'+tag+'" '+evs+''+evs+'>E</span><span '+'id="'+key+'-X:'+id+':" class="'+cls+'-dd3 '+ddcls+'  '+tag+'DD1_CC'+tag+'" '+evs+'>X</span></div>'
        ns.setTemplate({
            style:'{_style};height:auto;width:auto',
            tagName : 'div',
            onselectstart:'return false',
            BORDER:{
                tagName : 'div',
                className: 'xui-uiborder-radius-big',
                BAR:{
                    tagName:'div',
                    className:'{classBar}',
                    BARTDL:{
                        className:'xui-uibar-tdl xui-uibar xui-uiborder-l xui-uiborder-t xui-uiborder-radius-lt',
                        BARTDLT:{
                            className:'xui-uibar-tdlt'
                        }
                    },
                    BARTDM:{
                        $order:1,
                        className:'xui-uibar-tdm xui-uibar xui-uiborder-t',
                        BARTDMT:{
                            className:'xui-uibar-tdmt'
                        }
                    },
                    BARTDR:{
                        $order:2,
                        className:'xui-uibar-tdr xui-uibar xui-uiborder-r xui-uiborder-t xui-uiborder-radius-rt',
                        BARTDRT:{
                            className:'xui-uibar-tdrt'
                        }
                    },
                    BARCMDL:{
                        $order:3,
                        tagName: 'div',
                        className:'xui-uibar-cmdl',
                        SPACE:{
                            className:'xuifont',
                            $fonticon:'xui-icon-empty'
                        }
                    },
                    BARCMDR:{
                        $order:4,
                        tagName: 'div',
                        className:'xui-uibar-cmdr',
                        CLOSE:{
                            className:'xuifont',
                            $fonticon:'xui-uicmd-close',
                            style:'{closeDisplay}'
                        }
                    },
                    TBARTDB:{
                        $order:5,
                        tagName: 'div',
                        className:'xui-uibar-tdb xui-uiborder-inset xui-uiborder-radius'
                    }
                },
                MAIN:{
                    $order:2,
                    tagName:'div',
                    className:'xui-uicon-main xui-uibar xui-uiborder-l',
                    MAINI:{
                        tagName:'div',
                        className:'xui-uicon-maini xui-uibar xui-uiborder-r',
                        CON:{
                            $order:1,
                            tagName:'div',
                            className:'xui-uiborder-inset xui-uiborder-radius',
                            SIMPLE:{
                                tagName:'div',
                                TOP:{
                                    $order:1,
                                    tagName:'div',
                                    DATA:{
                                        $order:0,
                                        tagName:'div',
                                        onselectstart:'return false',
                                        text:data
                                    },
                                    EXAM:{
                                        $order:3,
                                        tagName:'div',
                                        className:'xui-uiborder-inset xui-uiborder-radius'
                                    }
                                },
                                LIST:{
                                   $order:2,
                                   tagName:'div',
                                   text: arr.join('')
                                }
                            },
                            ADV:{
                                $order:2,
                                style:'{advDispay}',
                                tagName:'div',
                                ADVWHEEL:{
                                    $order:0,
                                    tagName:'div'
                                },
                                ADVCLR:{
                                    $order:1,
                                    tagName:'div'
                                },
                                ADVMARK1:{
                                    $order:3,
                                    tagName:'div'
                                },
                                ADVMARK2:{
                                    $order:4,
                                    tagName:'div'
                                }
                            }
                        }
                    }
                },
                TAIL:{
                    $order:3,
                    tagName:'div',
                    className:'xui-uicon-main xui-uibar xui-uiborder-l',
                    TAILI:{
                        tagName:'div',
                        className:'xui-uibar xui-uicon-maini xui-uiborder-r',
                        TRANS:{
                            className:'xuicon',
                            $fonticon:'xui-icon-transparent',
                            tabindex: '{tabindex}',
                            title:"{_transparent}"
                        },
                        CAPTION:{
                            text : '{caption}'
                        },
                        SET:{
                            tagName:"button",
                            className:'xui-ui-btn',
                            tabindex: '{tabindex}',
                            text:"{_set}"
                        },
                        TOGGLE:{
                            $order:2,
                            className:'xuifont',
                            $fonticon:'xui-icon-doubleright',
                            tabindex: '{tabindex}'
                        }
                    }
                },
                BBAR:{
                    $order:4,
                    tagName:'div',
                    className:'xui-uibar-bottom-s',
                    BBARTDL:{
                        className:'xui-uibar-tdl xui-uibar xui-uiborder-l xui-uiborder-b xui-uiborder-radius-lb'
                    },
                    BBARTDM:{
                        $order:1,
                        className:'xui-uibar-tdm xui-uibar xui-uiborder-b'
                    },
                    BBARTDR:{
                        $order:2,
                        className:'xui-uibar-tdr xui-uibar xui-uiborder-r xui-uiborder-b xui-uiborder-radius-rb'
                    }
                }
            }
        });
    },
    Static:{
        _radius:84,
        _square:100,
        _bigRadius:97,
        DataModel:{
            height:{
                ini:'auto',
                readonly:true
            },
            width:{
                ini:'auto',
                readonly:true
            },
            value:{
                ini:"FFFFFF",
                format:'color'
            },
            barDisplay : {
                ini:true,
                action:function(v){
                    if(v)
                        this.getSubNode('BAR').replaceClass('xui-uibar-top-s','xui-uibar-top');
                    else
                        this.getSubNode('BAR').replaceClass('xui-uibar-top','xui-uibar-top-s');
                }
            },
            closeBtn:{
                ini:true,
                action:function(v){
                    this.getSubNode('CLOSE').css('display',v?'':'none');
                }
            },
            advance:{
                ini:false,
                action:function(v){
                    var ns=this,
                        tg=ns.getSubNode('TOGGLE');
                    ns.getSubNode('ADV').css('display',v?'':'none');
                    ns.getSubNode('CON').css('padding-right',v?'205px':'0px');
                    if(xui.__iefix2){
                        tg.html(xui.__iefix2[v?'xui-icon-doubleleft':'xui-icon-doubleright']);
                    }else{
                        if(v) tg.removeClass('xui-icon-doubleright').addClass('xui-icon-doubleleft');
                        else tg.removeClass('xui-icon-doubleleft').addClass('xui-icon-doubleright');
                    }
                    if(v)
                        ns.box._updateMarks(ns,ns.properties.$UIvalue,true, ns.$hsv[0])
                }
            }
        },
        Appearances:{
            KEY:{
            },
            'TBART, BBART':{
                'border-spacing':0,
                'border-collapse':'separate'
            },
            MAINI:{
                padding:'.5em .5em .25em 0'
            },
            CON:{
                padding:'.25em',
                position:'relative'
            },
            '.xui-uibar-top BARCMDL':{
                padding:".25em 0 0 0"
            },
            '.xui-uibar-top BARCMDR':{
                top:".3334em",
                right:".5em"
            },
            CMDL:{
                padding:".25em 0 .25em 0"
            },
            DATA:{
            },
            'DATA span':{
                'padding':'0 1px',
                'margin-left': '-1px',
                'margin-right':'1px',
                'width':'1.75em'
            },
            'DATA div':{
                'padding':'.5em 0'
            },
            CAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                'font-size':'1em'
            },
            EXAM:{
                padding:'.125em',
                position:'absolute',
                width:'5.5em',
                height:'5.5em',
                top:'.25em',
                right:'.25em',
                'white-space':'normal',
                'text-align':'center'
            },
            'DD1, DD2, DD3':{
                'padding-right':'2px',
                cursor:'e-resize',
                'text-align':'center'
            },
            TOP:{
                position:'relative'
            },
            LIST :{
                position:'relative',
                overflow:'hidden',
                padding:'.25em',
                'white-space': 'nowrap',
                'line-height':'1em'
            },
            TAILI:{
                position:'relative',
                'padding':'.5em 0 .25em 0',
                'text-align':'center'
            },
            SIMPLE:{
                position:'relative'
            },
            ADV:{
                position:'absolute',
                right:'4px',
                bottom:'4px',
                width:'195px',
                height:'195px'
            },
            'ADV div':{
                cursor:'crosshair',
                position:'absolute'
            },
            ADVCLR:{
                background: xui.browser.ie6?null:"url(data:image/png;base64,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)",
                height:'101px',
                left:'47px',
                top:'47px',
                width:'101px'
            },
            ADVWHEEL:{
                background: xui.browser.ie6?null:"url(data:image/png;base64,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)",
                height:'195px',
                width:'195px'
            },
            'ADVMARK1, ADVMARK2':{
                background:xui.browser.ie6?null:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAK3RFWHRDcmVhdGlvbiBUaW1lAHZyIDE0IGp1bCAyMDA2IDEzOjMxOjIzICswMTAwHvJDZwAAAAd0SU1FB9YHDgsgJYiZ4bUAAAAJcEhZcwAALiIAAC4iAari3ZIAAAAEZ0FNQQAAsY8L/GEFAAAB5ElEQVR42q2Tz0sqURTH72Qq4mASSAoSIfSDdCEI8qJFLXSjLYSQNoGLINrI8/0ZD9q0KnDlKkIMebmP9xZRCEEiLQLBiMiNJDYq/Zg573vpCkM6CdGBD3Pn3OvXe77nDGPfENKwJBHx/CxYAtNAAVfgXJKk7khVCCyCP6ALVKAJXkEdbINxw5tgM4HHPphSFEUql8usXq8zWZZZKBRiPp+PH3sBx2Br4FbiBg+aplGxWKRgMPiMH1+YTKZDq9V64na7G+l0mprNJo7RG/g94IEoQSsUCuRyue6QToIJYAJWMA/Bo2QySZ1Ohws9gZBeZI570Gq1yO/395BKGJg+ZbFYznK5HAmf9vQiKW5iqVQim832Fyn5E+83Y7EYieAdY2Nig7dRqtVqrNfr3YiWGsVltVrtr2f0IrwEZrfbGeqWhQ9GMeFwOPprRS9SAWo4HGZOp/MH1l4DAS6+HolE+u9Xek9kcK+qKqVSKUL/s0hPDhFY83g8j5VKhcQg7nxs80/w0mg0KB6Pa2az+RTpDbDA3sd/lwvk8/l+Z7iS/FHEAor8H9rtNmWzWYpGo+T1eikQCFAmkyFxAy7AJ255aMHYcIID8d1oNBi8hGuwwkYFDq0CPlG3YsTb4B/4BRwjBb4S/wGzT16tu5THiAAAAABJRU5ErkJggg==)",
                height:'16px',
                margin:'-8px 0 0 -8px',
                overflow:'hidden',
                width:'16px'
            },
            ".xui-nodatauri ADVCLR":{
                background: xui.browser.ie6?null:xui.UI.$oldBg('clrbg.png', 'no-repeat left top'),
                //for ie6
                _filter: xui.UI.$ieOldBg('clrbg.png')
            },
            ".xui-nodatauri ADVWHEEL":{
                background: xui.browser.ie6?null:xui.UI.$oldBg('clr.png', 'no-repeat left top'),
                //for ie6
                _filter: xui.UI.$ieOldBg('clr.png')
            },
            '.xui-nodatauri ADVMARK1, .xui-nodatauri ADVMARK2':{
                background:xui.browser.ie6?null:xui.UI.$oldBg('picker.png', 'no-repeat left top'),
                //for ie6
                _filter: xui.UI.$ieOldBg('picker.png')
            },

            'LIST span':{
                overflow: 'hidden',
                margin: '0',
                cursor: 'pointer',
                margin:'0 -1px -1px 0',
                display: xui.$inlineBlock,
                'font-size': '1.18em'
            },
            TRANS:{
                position:'absolute',
                top:'.25em',
                left:'0',
                display:xui.$inlineBlock,
                cursor:'pointer'
            },
            SET:{
                position:'absolute',
                display:'none',
                top:'.125em',
                right:'2.5em'
            },
            TOGGLE:{
                position:'absolute',
                right:'.5em',
                top:'0.25em',
                display:xui.$inlineBlock,
                cursor:'default'
            }
        },
        Behaviors:{
            HoverEffected:{CLOSE:'CLOSE',SET:'SET',TRANS:'TRANS',TOGGLE:'TOGGLE'},
            ClickEffected:{CLOSE:'CLOSE',SET:'SET',TRANS:'TRANS',TOGGLE:'TOGGLE'},
            KEY:{onClick:function(){return false}},
            SC:{
                onMouseover:function(p,e,s){
                    p.box._setTempUI(p,p.getSubId(s));
                },
                onClick:function(p,e,s){
                    var sid=p.getSubId(s);
                    p.boxing()._setCtrlValue(p.$tempValue=sid,false);
                    p.box._vC(p);
                    if(!p.properties.advance)
                        p.boxing().setUIValue(sid,true,null,'click');
                        
                    return false;
                },
                onDblclick:function(p,e,s){
                    var sid=p.getSubId(s);
                    p.boxing()._setCtrlValue(p.$tempValue=sid,false);
                    p.box._vC(p);
                    p.boxing().setUIValue(sid,true,null,'dblclick');
                    return false;
                }
            },
            LIST:{
                onMouseout:function(p,e,s){
                    p.box._updateDftTip(p);
                }
            },
            SET:{
                onClick:function(p,e,src){
                    p.box._vC(p);
                    p.boxing().setUIValue(p.$tempValue,true,null,'setbtn');
                }
            },
            TRANS:{
                onClick:function(p,e,src){
                    p.box._vC(p);
                    p.boxing().setUIValue(p.$tempValue='transparent',true,null,'transbtn');
                }
            },
            CANCEL:{
                onClick:function(p,e,src){
                    p.getSubNode('CLOSE').onClick(true);
                }
            },
            TOGGLE:{
                onClick:function(p,e,src){
                    p.boxing().setAdvance(!p.properties.advance)
                }
            },
            R:{
                beforeMousedown:function(p, e, src){
                    p.box._dd1(p,e,src);
                },
                onDrag:function(p, e, src){
                    p.box._dd2(p,e,src,0);
                },
                onDragstop:function(p, e, src){
                    p.box._dd3(p,e,src,0);
                }
            },
            G:{
                beforeMousedown:function(p, e, src){
                    p.box._dd1(p,e,src);
                },
                onDrag:function(p, e, src){
                    p.box._dd2(p,e,src,1);
                },
                onDragstop:function(p, e, src){
                    p.box._dd3(p,e,src,1);
                }
            },
            B:{
                beforeMousedown:function(p, e, src){
                    p.box._dd1(p,e,src);
                },
                onDrag:function(p, e, src){
                    p.box._dd2(p,e,src,2);
                },
                onDragstop:function(p, e, src){
                    p.box._dd3(p,e,src,2);
                }
            },
            HH:{
                beforeMousedown:function(p, e, src){
                    p.box._dd1(p,e,src,true);
                },
                onDrag:function(p, e, src){
                    p.box._dd2(p,e,src,0,'hsv1');
                },
                onDragstop:function(p, e, src){
                    p.box._dd3(p,e,src,0,true,'hsv1');
                }
            },
            S:{
                beforeMousedown:function(p, e, src){
                    p.box._dd1(p,e,src,true);
                },
                onDrag:function(p, e, src){
                    p.box._dd2(p,e,src,1,'hsv2');
                },
                onDragstop:function(p, e, src){
                    p.box._dd3(p,e,src,1,true,'hsv2');
                }
            },
            V:{
                beforeMousedown:function(p, e, src){
                    p.box._dd1(p,e,src,true);
                },
                onDrag:function(p, e, src){
                    p.box._dd2(p,e,src,2,'hsv2');
                },
                onDragstop:function(p, e, src){
                    p.box._dd3(p,e,src,2,true,'hsv2');
                }
            },
            H:{
                beforeMousedown:function(p, e, src){
                    p.box._dd1(p,e,src);
                },
                onDrag:function(p, e, src){
                    p.box._dd2(p,e,src,0,'hex');
                },
                onDragstop:function(p, e, src){
                    p.box._dd3(p,e,src,0);
                }
            },
            'E':{
                beforeMousedown:function(p, e, src){
                    p.box._dd1(p,e,src);
                },
                onDrag:function(p, e, src){
                    p.box._dd2(p,e,src,1,'hex');
                },
                onDragstop:function(p, e, src){
                    p.box._dd3(p,e,src,1);
                }
            },
            X:{
                beforeMousedown:function(p, e, src){
                    p.box._dd1(p,e,src);
                },
                onDrag:function(p, e, src){
                    p.box._dd2(p,e,src,2,'hex');
                },
                onDragstop:function(p, e, src){
                    p.box._dd3(p,e,src,2);
                }
            },
            CLOSE:{
                onClick:function(profile, e, src){
                    var properties = profile.properties,
                        instance = profile.boxing();
                    if(properties.disabled||properties.readonly)return;
                    if(false===instance.beforeClose(profile)) return;
                    instance.destroy();
                }
            },
            ADVWHEEL:{
                beforeMousedown:function(p, e, src){
                    var cls=p.box;
                    cls._prepareAdv(p,e);
                    cls._updateClrByPos(p,e,true);
                    p.getSubNode('ADVMARK1').startDrag(e, {
                        dragType:'none'
                    });
                }
            },
            ADVMARK1:{
                beforeMousedown:function(p, e, src){
                    var cls=p.box;
                    cls._prepareAdv(p,e);
                    cls._updateClrByPos(p,e,true);
                    p.getSubNode('ADVMARK1').startDrag(e, {
                        dragType:'none'
                    });
                },
                onDrag:function(p, e, src){
                    var cls=p.box;
                    cls._updateClrByPos(p,e,true);
                },
                onDragstop:function(p, e, src){
                    p.box._updateValueByPos(p, e);
                },
                onDblclick:function(p,e,src){
                    p.box._updateValueByPos(p, e);
                    p.box._vC(p);
                    p.boxing().setUIValue(p.$tempValue,true,null,'advdblclick');
                }
            },
            ADVCLR:{
                beforeMousedown:function(p, e, src){
                    var cls=p.box;
                    cls._prepareAdv(p,e);
                    cls._updateClrByPos(p,e);
                    p.getSubNode('ADVMARK2').startDrag(e, {
                        dragType:'none'
                    });
                    return false;
                }
            },
            ADVMARK2:{
                beforeMousedown:function(p, e, src){
                    var cls=p.box;
                    cls._prepareAdv(p,e);
                    cls._updateClrByPos(p,e);
                    p.getSubNode('ADVMARK2').startDrag(e, {
                        dragType:'none'
                    });
                    return false;
                },
                onDrag:function(p, e, src){
                    var cls=p.box;
                    cls._updateClrByPos(p, e);
                },
                onDragstop:function(p, e, src){
                    p.box._updateValueByPos(p, e);
                },
                onDblclick:function(p,e,src){
                    p.box._updateValueByPos(p, e);
                    p.box._vC(p);
                    p.boxing().setUIValue(p.$tempValue,true,null,'adv2dblclick');
                }
            }
        },
        _vC:function(profile){
            var pro=profile.properties,
                v=pro.$UIvalue,
                d=v==profile.$tempValue;
            profile.getSubNode('SET').css('display',d?'none':'block');
            profile.getSubNode('CAPTION').css('color',d?'#000':'#ff0000');
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            var nodisplay='display:none';
            data.classBar= data.barDisplay?'xui-uibar-top':'xui-uibar-top-s';
            data.closeDisplay = data.closeBtn?'':nodisplay;
            data.advDispay = data.advance?'':'display:none;';
            
            data._transparent = xui.getRes('inline.transparent');
            data._set = xui.wrapRes('inline.set');
            return data;
        },
        EventHandlers:{
            beforeClose:function(profile, src){}
        },
        RenderTrigger:function(){
            this.$onValueSet=this.$onUIValueSet=function(o,v){
                this.box._setClrName(this,v);
            };
        },
        _setClrName:function(profile,v){
            var p=profile,
                k='color.LIST.',
                vv=xui.getRes(k+v);
            if(vv==v)
                p.$clrN2 = p.$clrN = (v=='transparent'?'':'#')+v;
            else{
                p.$clrN = vv;
                p.$clrN2 = xui.wrapRes(k+v);
            }
        },
        _slist:"FFFFFF,FFFFF0,FFFFE0,FFFF00,FFFAFA,FFFAF0,FFFACD,FFF8DC,FFF5EE,FFF0F5,FFEFD5,FFEBCD,FFE4E1,FFE4C4,FFE4B5,FFDEAD,FFDAB9,FFD700,FFC0CB,FFB6C1,FFA500,FFA07A,FF8C00,FF7F50,FF69B4,FF6347,FF4500,FF1493,FF00FF,FF00FF,FF0000,FDF5E6,FAFAD2,FAF0E6,FAEBD7,FA8072,F8F8FF,F5FFFA,F5F5F5,F5DEB3,F4A460,F0FFFF,F0FFF0,F0F8FF,F0E68C,F08080,EEE8AA,EE82EE,E9967A,E6E6FA,E1FFFF,DEB887,DDA0DD,DCDCDC,DC143C,DB7093,DAA520,DA70D6,D8BFD8,D3D3D3,D2B48C,D2691E,CD853F,CD5C5C,C71585,C0C0C0,BDB76B,BC8F8F,BA55D3,B22222,B0E0E6,B0C4DE,AFEEEE,ADFF2F,ADD8E6,A9A9A9,A52A2A,A0522D,9932CC,98FB98,9400D3,9370DB,90EE90,8FBC8F,8B4513,8B008B,8B0000,8A2BE2,87CEFA,87CEEB,808080,808000,800080,800000,7FFFAA,7FFF00,7CFC00,7B68EE,778899,708090,6B8E23,6A5ACD,696969,6495ED,5F9EA0,556B2F,4B0082,48D1CC,483D8B,4682B4,4169E1,40E0D0,3CB371,32CD32,2F4F4F,2E8B57,228B22,20B2AA,1E90FF,191970,00FFFF,00FFFF,00FF7F,00FF00,00FA9A,00CED1,00BFFF,008B8B,008080,008000,006400,0000FF,0000CD,00008B,000080,000000".split(','),
        _C16:"0123456789ABCDEF",
        //for drag rgb span
        _dd1:function(profile, e, src, hsv){
            if(xui.Event.getBtn(e)!="left")return;
            var p=profile.properties,
                cls=profile.box,
                f=function(){var rgb = cls.hex2rgb(profile.$tempValue||p.$UIvalue); return hsv?cls.rgb2hsv(rgb):rgb;};

            xui.use(src).css('backgroundColor','red').startDrag(e, {
                dragType:'blank',
                targetReposition:false,
                widthIncrement:2,
                dragCursor:true
            });
            profile.$temp=0;
            profile.$start = f();
            profile.$temp2 = f();
        },
        _dd2:function(profile, e, src, i, type){
            var count,
                off = xui.DragDrop.getProfile().offset,
                p=profile.properties,
                old=profile.$temp2,
                cls=profile.box,
                rate = type=='hsv1'?361:type=='hsv2'?101:256,
                v;

            count = (type=='hsv2'?parseInt(profile.$start[i]*100,10):parseInt(profile.$start[i],10))+parseInt(off.x/2,10);

            count=(count%rate+rate)%rate;
            if(profile.$temp!=count){
                old[i]=profile.$temp = type=='hsv2'?count/100:count;
                v = (type=='hsv1'||type=='hsv2')?cls.hsv2rgb(old):old;
                v=cls.rgb2hex(v);
                cls._setTempUI(profile,v);
                xui.use(src).text(type=='hex'?cls._toFF(count):count);
            }
        },
        _dd3:function(profile, e, src, i, hsv){
            if(profile.$start[i] !== profile.$temp){
                var p=profile.properties,
                    cls=profile.box,
                    old=profile.$start,
                    v;
                old[i]=profile.$temp;
                v=hsv?cls.hsv2rgb(old):old;
                v=cls.rgb2hex(v);

                //set the cur hex value of hsv for preventing update adv UI again
                if(hsv)profile.$hexinhsv=v;
                profile.boxing()._setCtrlValue(profile.$tempValue=v,false);
                delete profile.$hexinhsv;
                profile.box._vC(profile);
            }
            xui.use(src).css('backgroundColor','');
            profile.$temp=profile.$start=0;
        },
        //set temp UI
        _setTempUI:function(p,v){
            var cls=this,
                rgb=cls.hex2rgb(v),
                b=p.boxing(),
                ex=b.getSubNode('EXAM'),
                hsv=cls.rgb2hsv(rgb),
                vv=xui.getRes('color.LIST.'+v),
                v1=(v=='transparent'?'':'#')+v;
            ex.css({backgroundColor: v1, color:hsv[2]>0.6?'#000':'#FFF'});
            ex.text(p.show_color = vv==v? v1 : vv);
        },
        //reset example block
        _updateDftTip:function(prf){
            var cls=prf.box,
                p=prf.properties,
                trans=(prf.$tempValue||p.$UIvalue)=='transparent',
                ex=prf.boxing().getSubNode('EXAM');
            ex.css({backgroundColor:trans?'transparent':'#'+prf.$hex.join(''), color:trans?'#000':prf.$hsv[2]>0.6?'#000':'#FFF'});
            ex.html(prf.$clrN2||'',false);
        },
        _to3:function(s){
            if(!s||s=="transparent")s="FFFFFF";
            return [s.substr(0, 2), s.substr(2, 2), s.substr(4, 2)];
        },
        //0...255 to 00...FF
        _toFF: function(n) {
            var C16=this._C16;
            n = parseInt(n,10)||0;
            n = (n>255||n<0)?0:n;
            return C16.charAt((n-n%16)/16) + C16.charAt(n%16);
        },
        // 00...FF to 0...255
        _to255: function(str) {
            var C16=this._C16, s=str.split('');
            return C16.indexOf(s[0].toUpperCase())*16 + C16.indexOf(s[1].toUpperCase());
        },
        _webSafe:function(r, g, b){
            //safe divisor is 51, smart divisor is 17
            var me=arguments.callee,f=me.f||(me.f=function(n){
                return parseInt(n/51,10)*51;
            });
            if(typeof r=='object'){
                g=r[1];b=r[2];r=r[0];
            }
            return [f(r),f(g),f(b)];
        },
        _updateMarks:function(profile, hex, forcePos, hsv0){
            var cls=this,
                rgb=cls.hex2rgb(hex),
                hsv=cls.rgb2hsv(rgb),
                angle=(hsv[0]/360)*6.28,
                clr=profile.getSubNode('ADVCLR');
            if(forcePos){
                var m1=profile.getSubNode('ADVMARK1'),
                    m2=profile.getSubNode('ADVMARK2');
                m1.cssPos({
                  left: Math.round(Math.sin(angle)*cls._radius+cls._bigRadius),
                  top: Math.round(-Math.cos(angle)*cls._radius+cls._bigRadius)
                });
                m2.cssPos({
                  left: Math.round(cls._square*(hsv[1]-0.5)+cls._bigRadius),
                  top: Math.round(cls._square*(0.5-hsv[2])+cls._bigRadius)
                });
            }

            if(hsv0 !== undefined)
                clr.css('backgroundColor', '#'+cls.rgb2hex(cls.hsv2rgb([hsv0, 1, 1])));
            cls._setTempUI(profile, hex);
        },
        //flag:change h
        _updateClrByPos:function(profile, e, flag){
            var cls=this,
                mPos=xui.Event.getPos(e),
                pos=profile.$tpos,
                left=mPos.left-pos.left,
                top=mPos.top-pos.top,
                angle,m1,m2,
                h,s,v,hsv,rgb,hex;
            ;
            if(flag){
                m1=profile.getSubNode('ADVMARK1');
                angle=Math.atan2(left, -top);
                m1.cssPos({
                  left: Math.round(Math.sin(angle)*cls._radius+cls._bigRadius),
                  top: Math.round(-Math.cos(angle)*cls._radius+cls._bigRadius)
                });
                h=Math.floor((angle/Math.PI)*180);
                if(h<0)h +=360;
                hsv=[h, profile.$hsv[1], profile.$hsv[2]];
                rgb = cls.hsv2rgb(hsv);
                hex = cls.rgb2hex(rgb);
                cls._updateMarks(profile, profile.$t_hex=hex, false, h);
            }else{
                m2=profile.getSubNode('ADVMARK2');
                s=Math.max(0, Math.min(1, (left/cls._square) + 0.5));
                v=Math.max(0, Math.min(1, 0.5 - (top/cls._square)));
                m2.cssPos({
                  left: Math.round(cls._square*(s-0.5)+cls._bigRadius),
                  top: Math.round(cls._square*(0.5-v)+cls._bigRadius)
                });
                hsv=[profile.$hsv[0], s, v];
                rgb = cls.hsv2rgb(hsv);
                hex = cls.rgb2hex(rgb);
                cls._updateMarks(profile, profile.$t_hex=hex);
            }
        },
        _updateValueByPos:function(profile, e){
            //set the cur hex value of adv for preventing update adv UI again
            profile.$hexinadv=profile.$t_hex;
            profile.boxing()._setCtrlValue(profile.$tempValue=profile.$t_hex,false);
            delete profile.$hexinadv;
            profile.box._vC(profile);
        },
        _prepareAdv:function(profile,e){
            var cls=this,
                pos=profile.getSubNode('ADVWHEEL').offset();
            profile.$tpos= { left:pos.left+cls._bigRadius, top:pos.top+cls._bigRadius };
        },
        _ensureValue:function(profile,v){
            var ns=this,me=arguments.callee,map=me.map||(me.map=(function(){
                var h={};
                xui.arr.each(ns._C16.split(''),function(o,i){
                    h[o]=1;
                });
                return h;
            }())),
            reg=me._r||(me._r=/rgb\(([^)]*)\)/);
            if(!v || typeof v !='string'||v=='transparent')return 'transparent';
            if(reg.test(v)){
                v=v.replace(reg,'$1');
                v=v.split(',');
                v[0]=parseInt(v[0],10)||0;
                v[1]=parseInt(v[1],10)||0;
                v[2]=parseInt(v[2],10)||0;
                v=ns.rgb2hex(v);
            }
            if(v.charAt(0)=='#')v=v.substr(1,v.length);
            var a='',k;
            for(var i=0;i<6;i++){
                k=v.charAt(i).toUpperCase();
                a += (map[k]?k:'F');
            }
           return a;
        },
        //HSV (h[0-360], s[0-1]), v[0-1] to RGB [255,255,255]
        hsv2rgb: function(h, s, v) {
            if(h instanceof Array) {
                s=h[1]; v=h[2]; h=h[0];
            }
            var me=arguments.callee, f = me.f ||
                (me.f=function(n) {
                    return Math.min(255, Math.round(n*256));
                }),
                r, g, b, i, k, p, q, t;
            if(s==0)
                return [v=f(v),v,v];
            else{
                i = Math.floor((h/60)%6);
                k = (h/60)-i;
                p = v*(1-s);
                q = v*(1-k*s);
                t = v*(1-(1-k)*s);
                switch(i) {
                    case 0: r=v; g=t; b=p; break;
                    case 1: r=q; g=v; b=p; break;
                    case 2: r=p; g=v; b=t; break;
                    case 3: r=p; g=q; b=v; break;
                    case 4: r=t; g=p; b=v; break;
                    case 5: r=v; g=p; b=q; break;
                }
                return s==0?[v=f(v),v,v]:[f(r), f(g), f(b)];
            }
        },
        // RGB [255,255,255] to HSV (h[0-360], s[0-1]), v[0-1]
        rgb2hsv: function(r, g, b) {
            if(r instanceof Array) {
                g=r[1];b=r[2];r=r[0];
            }
            r=r/255;g=g/255;b=b/255;
            var min=Math.min(r,g,b),
                max=Math.max(r,g,b),
                delta = max-min,
                s = (max===0)?0:1-(min/max),
                v = max,
                h;
            switch (max) {
                case min:
                    h=0;
                    break;
                case r:
                    h=60*(g-b)/delta;
                    if(g<b)h+=360;
                    break;
                case g:
                    h=(60*(b-r)/delta)+120;
                    break;
                case b:
                    h=(60*(r-g)/delta)+240;
                    break;
            }
            return [Math.round(h), s, v];
        },
        //rgb values into a hex string; 255,255,255 -> FFFFFF
        rgb2hex: function(r, g, b) {
            var ns=this;
            if(r instanceof Array) {
                g=r[1];b=r[2];r=r[0];
            }
            return ns._toFF(r) + ns._toFF(g) + ns._toFF(b);
        },
        // Converts a hex string to rgb
        hex2rgb: function(hex) {
            var ns=this;
            if(!hex || hex=="transparent")hex="FFFFFF";
            if(hex.charAt(0)=='#')hex=hex.slice(1);
            return [ns._to255(hex.substr(0, 2)), ns._to255(hex.substr(2, 2)), ns._to255(hex.substr(4, 2))];
        },
        getTextColor:function(value){
            var ns=this;
            value=ns._ensureValue(0,value);
            if(value && value.toLowerCase()=="transparent")return '#000000';

            value=ns.hex2rgb(value);
            value=ns.rgb2hsv(value);
            return (value&&value[2])>0.6?'#000000':'#FFFFFF';
        },
        _onresize:function(){}
    }
});