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
                cls._setClrName(profile,hexs);
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
            evs=xui.$IEUNSELECTABLE();

        ns.addTemplateKeys(['TXT', 'DD1', 'DD2', 'DD3','R','G','B','HH','S','V','H','E','X']);

        //simple list
        for(i=0;i<l;i++)
            arr.push('<span  '+'id="'+key+'-SC:'+id+':'+list[i]+'" style="background-color:#'+list[i]+'" '+evs+'>'+list[i]+'</span>');

        //data
        data = '<div '+evs+'><span class="'+cls+'-txt"'+evs+'>R: </span><span '+'id="'+key+'-R:'+id+':" class="'+cls+'-dd2 xui-ui-draggable '+tag+'DD2_CC'+tag+'" '+evs+'>R</span><span style="width:8px;height:8px" '+evs+' ></span><span class="'+cls+'-txt"'+evs+'>H: </span><span '+'id="'+key+'-HH:'+id+':" class="'+cls+'-dd2 xui-ui-draggable '+tag+'DD2_CC'+tag+'" '+evs+'>H</span><span '+evs+'>\xB0</span></div>' +
               '<div '+evs+'><span class="'+cls+'-txt"'+evs+'>G: </span><span '+'id="'+key+'-G:'+id+':" class="'+cls+'-dd2 xui-ui-draggable '+tag+'DD2_CC'+tag+'" '+evs+'>G</span><span style="width:8px;height:8px" '+evs+' ></span><span class="'+cls+'-txt"'+evs+'>S: </span><span '+'id="'+key+'-S:'+id+':" class="'+cls+'-dd2 xui-ui-draggable '+tag+'DD2_CC'+tag+'"  '+evs+'>S</span><span '+evs+'>%</span></div>' +
               '<div '+evs+'><span class="'+cls+'-txt"'+evs+'>B: </span><span '+'id="'+key+'-B:'+id+':" class="'+cls+'-dd2 xui-ui-draggable '+tag+'DD2_CC'+tag+'" '+evs+'>B</span><span style="width:8px;height:8px" '+evs+' ></span><span class="'+cls+'-txt"'+evs+'>V: </span><span '+'id="'+key+'-V:'+id+':" class="'+cls+'-dd2 xui-ui-draggable '+tag+'DD2_CC'+tag+'" '+evs+'>V</span><span '+evs+'>%</span></div>' +
               '<div '+evs+'><span style="width:38px"'+evs+'>HEX: </span><span '+'id="'+key+'-H:'+id+':" class="'+cls+'-dd3 xui-ui-draggable '+tag+'DD3_CC'+tag+'" '+evs+'>H</span><span '+'id="'+key+'-E:'+id+':" class="'+cls+'-dd3 xui-ui-draggable '+tag+'DD3_CC'+tag+'" '+evs+''+evs+'>E</span><span '+'id="'+key+'-X:'+id+':" class="'+cls+'-dd1 xui-ui-draggable '+tag+'DD1_CC'+tag+'" '+evs+'>X</span></div>'
        ns.setTemplate({
            style:'{_style};height:auto;width:{_width}px;',
            tagName : 'div',
            onselectstart:'return false',
            BORDER:{
                tagName : 'div',
                BAR:{
                    tagName:'div',
                    className:'{classBar}',
                    BART:{
                        cellpadding:"0",
                        cellspacing:"0",
                        width:'100%',
                        border:'0',
                        className:'xui-uibar-t',
                        tagName:'table',
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
                        className:'xui-uibar-cmdl'
                    },
                    BARCMDR:{
                        tagName: 'div',
                        className:'xui-uibar-cmdr',
                        CLOSE:{
                            className:'xui-uicmd-close ',
                            style:'{closeDisplay}'
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
                        CON:{
                            $order:1,
                            tagName:'div',
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
                                    TRANS:{
                                        className:'xui-ui-btn',
                                        TRANSI:{
                                            className:'xui-ui-btni',
                                            TRANSC:{
                                                className:'xui-ui-btnc',
                                                TRANSA:{
                                                    tabindex: '{tabindex}',
                                                    text:xui.wrapRes('inline.transparent')
                                                }
                                            }
                                        }
                                    },
                                    EXAM:{
                                        $order:3,
                                        tagName:'div',
                                        EXAMI:{
                                            tagName:'div'
                                        }
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
                    className:'xui-uicon-main',
                    TAILI:{
                        tagName:'div',
                        className:'xui-uicon-maini',
                        CAPTION:{
                            text : '{caption}'
                        },
                        SET:{
                            className:'xui-ui-btn',
                            SETI:{
                                className:'xui-ui-btni',
                                SETC:{
                                    className:'xui-ui-btnc',
                                    SETA:{
                                        tabindex: '{tabindex}',
                                        text:xui.wrapRes('inline.set')
                                    }
                                }
                            }
                        },
                        TOGGLE:{
                            $order:2,
                            tabindex: '{tabindex}'
                        }
                    }
                },
                BBAR:{
                    $order:4,
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
        });
    },
    Static:{
        _radius:84,
        _square:100,
        _bigRadius:97,
        _shadowRB:"BBARTDR",
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
                    var ns=this;
                    ns.getSubNode('ADV').css('display',v?'':'none');
                    ns.getSubNode('TOGGLE').tagClass("-adv", v);
                    ns.getRoot().width(v?410:210);
                    if(v)
                        ns.box._updateMarks(ns,ns.properties.$UIvalue,true, ns.$hsv[0])
                }
            }
        },
        Appearances:{
            KEY:{
            },
            MAINI:{
                padding:'4px 5px 4px 0'
            },
            CON:{
                height:'198px',
                padding:'3px',
                position:'relative',
                border:'solid 1px #648CB4'
            },
            DATA:{
                'float':'left',
                width:'112px',
                height:'86px'
            },
            'DATA span':{
                'float':'left'
            },
            'DATA div':{
                'padding-top':'3px',
                'clear':'both'
            },
            TXT:{
                width:'16px'
            },
            CAPTION:{
                'font-size':'12px',
                'vertical-align':xui.browser.ie6?'baseline':'middle'
            },
            EXAM:{
                'float':'left',
                'margin-top':'24px',
                padding:'3px',
                border:'solid 1px #648CB4',
                'background-color':'#E5EBFB'
            },
            EXAMI:{
                height:'50px',
                width:'70px',
                'white-space':'normal',
                'text-align':'center',
                border:'solid 1px #648CB4'
            },
            'DD1, DD2, DD3':{
                display:'block',
                height:'16px',
                border:'1px solid #779EBF',
                'padding-right':'2px',
                cursor:'e-resize',
                'text-align':'right',
                background:'#F8FBFF'
            },
            DD1:{
                width:'16px'
            },
            DD2:{
                width:'24px'
            },
            DD3:{
                $order:2,
                width:'16px',
                'border-right':'none'
            },
            TOP:{
                height:'92px',
                position:'relative'
            },
            LIST :{
                height:'106px',
                position:'relative',
                overflow:'hidden',
                margin:'0 2px',
                'line-height':xui.browser.ie6?'0':null,
                'clear':'both'
            },
            TAILI:{
                position:'relative',
                'padding-top':'4px',
                height:'22px',
                'text-align':'center'
            },
            SIMPLE:{
                'float':'left',
                width:'192px',
                position:'relative'
            },
            ADV:{
                'float':'right',
                width:'195px',
                height:'195px',
                position:'relative'
            },
            'ADV div':{
                cursor:'crosshair',
                position:'absolute'
            },
            ADVCLR:{
                background: xui.browser.ie6?null:xui.UI.$bg('bg.png', 'no-repeat left top'),
                _filter: xui.UI.$ieBg('bg.png'),
                height:'101px',
                left:'47px',
                top:'47px',
                width:'101px'
            },
            ADVWHEEL:{
                background: xui.browser.ie6?null:xui.UI.$bg('clr.png', 'no-repeat left top'),
                _filter: xui.UI.$ieBg('clr.png'),
                height:'195px',
                width:'195px'
            },
            'ADVMARK1, ADVMARK2':{
                background:xui.browser.ie6?null:xui.UI.$bg('picker.png', 'no-repeat left top'),
                _filter: xui.UI.$ieBg('picker.png'),
                height:'17px',
                margin:'-8px 0pt 0pt -8px',
                overflow:'hidden',
                width:'17px'
            },
            'LIST span':{
                height: '12px',
                width: '10px',
                'font-size':xui.browser.ie6?'0':null,
                'float': 'left',
                display: 'block',
                overflow: 'hidden',
                'text-indent': '100px',
                margin: '0',
                cursor: 'pointer',
                border: '1px solid #000',
                margin:'0 -1px -1px 0'
            },
            TRANS:{
                position:'absolute',
                top:'0',
                right:'0'
            },
            TRANSA:{
                width:'72px'
            },
            SET:{
                position:'absolute',
                color:'#ff0000',
                display:'none',
                top:'0',
                right:'28px'
            },
            TOGGLE:{
                position:'absolute',
                right:'6px',
                top:'4px',
                display:xui.$inlineBlock,
                width:'15px',
                height:'15px',
                cursor:'default',
                'background-image':xui.UI.$bg('icons.gif', '', true),
                'background-repeat':'no-repeat',
                'background-position':'-300px -70px',
                 zoom:xui.browser.ie6?1:null
            },
            'TOGGLE-mouseover':{
                'background-position': '-300px -90px'
            },
            'TOGGLE-mousedown':{
                'background-position': '-300px -110px'
            },
            "TOGGLE-adv":{
                'background-position': '-240px -70px'
            },
            'TOGGLE-adv-mouseover':{
                'background-position': '-240px -90px'
            },
            'TOGGLE-adv-mousedown':{
                'background-position': '-240px -110px'
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
                        p.boxing().setUIValue(sid,true);
                        
                    return false;
                },
                onDblclick:function(p,e,s){
                    var sid=p.getSubId(s);
                    p.boxing()._setCtrlValue(p.$tempValue=sid,false);
                    p.box._vC(p);
                    p.boxing().setUIValue(sid,true);
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
                    p.boxing().setUIValue(p.$tempValue,true);
                }
            },
            TRANS:{
                onClick:function(p,e,src){
                    p.box._vC(p);
                    p.boxing().setUIValue(p.$tempValue='transparent',true);
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
                    //for design mode in firefox
                    return false;
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
                    p.boxing().setUIValue(p.$tempValue,true);
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
                    p.boxing().setUIValue(p.$tempValue,true);
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
            data._width = data.advance?'410':'210';
            data.advDispay = data.advance?'':'display:none;';
            return data;
        },
        EventHandlers:{
            beforeClose:function(profile, src){}
        },
        RenderTrigger:function(){
            this.$onValueSet=this.$onUIValueSet=function(v){
                this.box._setClrName(this,v);
            };
        },
        _setClrName:function(profile,v){
            var p=profile,
                k='color.LIST.',
                vv=xui.getRes(k+v);
            if(vv==v)
                p.$clrN2 = p.$clrN = '#'+v;
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
                ex=b.getSubNode('EXAMI'),
                hsv=cls.rgb2hsv(rgb),
                vv=xui.getRes('color.LIST.'+v);
            ex.css({backgroundColor:'#'+v, color:hsv[2]>0.6?'#000':'#FFF'});
            ex.text(p.show_color=vv==v?'#'+v:vv);
        },
        //reset example block
        _updateDftTip:function(p){
            var cls=p.box,
                ex=p.boxing().getSubNode('EXAMI');
            ex.css({backgroundColor:'#'+p.$hex.join(''), color:p.$hsv[2]>0.6?'#000':'#FFF'});
            ex.html(p.$clrN2||'',false);
        },
        _to3:function(s){
            if(!s)s="FFFFFF";
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
                h=Math.floor((angle/6.28)*360);
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
                _.arr.each(ns._C16.split(''),function(o,i){
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
            if(!hex)hex="FFFFFF";
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