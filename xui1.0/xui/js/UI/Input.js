Class("xui.UI.Input", ["xui.UI.Widget","xui.absValue"] ,{
    Instance:{
        _setTB:function(type){
            var profile=this.get(0), p=profile.properties, o, t;
            if(!profile.host|| !p.tipsBinder)return;
            var ot=profile.tips;
            t = profile.tips = profile.tips||p.tips||'';
            o = xui.getObject(p.tipsBinder)|| ((o=profile.host[p.tipsBinder]) &&o.get(0) );
            if(o && (o.key=='xui.UI.Span'||o.key=='xui.UI.Div'||o.key=='xui.UI.SLabel')){
                if(o.renderId){
                    //use innerHTML, not setHtml
                    o.getRootNode().innerHTML =  t.charAt(0)=='$'?xui.wrapRes(t):t;
                    o.getRoot().css('color', type==1?'gray':type==2?'red':'#000');
                }
            }
            if(ot!==profile.tips && xui.Tips && xui.Tips.getTips())xui.Tips.setTips(profile.tips);
        },
        activate:function(){
            var profile = this.get(0);
            if(profile.renderId){
                var node=profile.getSubNode('INPUT').get(0);
                if(node){
                    try{
                        node.focus();
                        if(!node.readOnly && node.select)node.select();
                    }catch(e){}
                }
            }
            return this;
        },
        _setCtrlValue:function(value){
            if(_.isNull(value) || !_.isDefined(value))value='';
            return this.each(function(profile){
                profile.getSubNode('INPUT').attr('value',value+"");
            });
        },
        _getCtrlValue:function(){
            var node=this.getSubNode('INPUT');
            return (node&&!node.isEmpty()) ? this.getSubNode('INPUT').attr('value') : null;
        },
        _setDirtyMark:function(){
            return this.each(function(profile){
                var properties = profile.properties,
                    o=profile.getSubNode('INPUT'),
                    cls=profile.box,
                    box=profile.boxing(),
                    d=xui.UI.$css_tag_dirty,
                    v=xui.UI.$css_tag_invalid,
                    flag=properties.value !== properties.$UIvalue;
                var ot=profile.tips;
                if(profile._inValid==2){
                    //display tips
                    profile.tips = properties.tipsErr || properties.tips;
                }else{
                    if(profile._inValid==1)
                        profile.tips = properties.tips;
                    else{
                        profile.tips = properties.tipsOK || properties.tips;
                    }
                }
                if(ot!==profile.tips && xui.Tips && xui.Tips.getTips())xui.Tips.setTips(profile.tips);
                
                if(profile._dirtyFlag!==flag){
                    if(properties.dirtyMark && properties.showDirtyMark){
                        if(profile.beforeDirtyMark && false===box.beforeDirtyMark(profile,flag)){}
                        else{
                            if(profile._dirtyFlag=flag) o.addClass(d);
                            else o.removeClass(d);
                        }
                    }
                    profile._dirtyFlag=flag
                }
                
                //format statux
                if(profile.beforeFormatMark && false===box.beforeFormatMark(profile, profile._inValid==2)){}
                else{
                    var err = profile.getSubNode('ERROR');
                    if(profile._inValid==2){
                        o.addClass(v);
                        err.css('display','block');
                    }else{
                        o.removeClass(v);
                        err.css('display','none');
                    }
                }
                box._setTB(profile._inValid);
            });
        }
    },
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        _.merge(t.FRAME.BORDER,{
            style:'',
            LABEL:{
                style:'{labelShow};width:{labelSize}px;{labelHAlign}',
                text:'{labelCaption}'
            },
            BOX:{
                WRAP:{
                    tagName : 'div',
                    INPUT:{
                        tagName : 'input',
                        type : '{_type}',
                        maxlength:'{maxlength}',
                        tabindex:'{tabindex}',
                        style:'{_css};{hAlign};'
                    }
                }
            }
        },'all');
        t.FRAME.ERROR = {};
        this.setTemplate(t)
    },
    Static:{
        _maskMap:{
            '~':'[+-]',
    		'1':'[0-9]',
    		'a':'[A-Za-z]',
    		'u':'[A-Z]',
    		'l':'[a-z]',
    		'*':'[A-Za-z0-9]'
        },
        _maskSpace:'_',
        Appearances:{
            KEY:{
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                position:'relative'
            },
            BORDER:{
                'line-height':'0px',
                'font-size':'0px'
            },
            LABEL:{
               'z-index':1,
               top:0,
               left:0,
               position:'absolute',
               'padding-top':'4px',
               'font-size':'12px'
            },
            WRAP:{
                left:0,
                //for firefox bug: cursor not show
                position:'absolute',
                overflow:(xui.browser.gek&&xui.browser.ver<3)?'auto':'hidden'
            },
            BOX:{
                left:0,
                top:0,
                position:'absolute',
                background:xui.UI.$bg('inputbg.gif', '#fff repeat-x',"Input"),
                'border':'solid 1px #B5B8C8',
                'z-index':10
            },
            "KEY-readonly input":{
                $order:2,
                color:'#909090',
                cursor:'pointer'
            },
            "KEY-readonly BOX, KEY-inputreadonly BOX":{
                $order:2,
                background:'#eee'
            },
            'BOX-focus, BOX-mouseover':{
                'border-color':'#7EADD9'
            },
            INPUT:{
               //don't change it in custom class or style
               'padding-top':'2px',
               'padding-left':'2px',
               'padding-right':'2px',

               "background-color":"transparent",
               "background-image":xui.browser.ie?'url(.)':null,
               border:0,
               margin:0,

               'margin-top':xui.browser.ie?'-1px':null,
               'font-size':'12px',
               position:'relative',
               //give default size
               width:'102px',

               overflow:'auto',
               'overflow-y':'auto',
               'overflow-x':'hidden',
               resize:'none'
            },
            ERROR:{
                width:'9px',
                height:'9px',
                position:'absolute',
                right:'2px',
                top:'2px',
                display:'none',
                'font-size':0,
                background: xui.UI.$bg('icons.gif', 'no-repeat left -244px', true),
                'z-index':'50'
            },
//border<<<
            '.setting-xui-input':{
                'border-style':'solid',
                'border-top-width':'1px',
                'border-bottom-width':'1px',
                'border-left-width':'1px',
                'border-right-width':'1px'
            },
            'KEY-b-t':{
                height:'2px',
                top:'-1px',
                background: xui.UI.$bg('vertical.gif', 'repeat-x left top','Input')
            },
            'KEY-b-b':{
                height:'2px',
                bottom:'-1px',
                background: xui.UI.$bg('vertical.gif', 'repeat-x left bottom','Input')
            },
            'BOX-focus KEY-b-t, BOX-focus KEY-b-b, BOX-mouseover KEY-b-t, BOX-mouseover KEY-b-b':{
                $order:1,
                'background-image':xui.UI.$bg('vertical_mouseover.gif','','Input')
            },
            'KEY-b-l':{
                width:'2px',
                left:'-1px',
                background: xui.UI.$bg('horizontal.gif', 'repeat-y left top','Input')
            },
            'KEY-b-r':{
               width:'2px',
               right:'-1px',
               background: xui.UI.$bg('horizontal.gif', 'repeat-y right top','Input')
            },
            'BOX-focus KEY-b-l, BOX-focus KEY-b-r, BOX-mouseover KEY-b-l, BOX-mouseover KEY-b-r':{
                $order:1,
                'background-image': xui.UI.$bg('horizontal_mouseover.gif','','Input')
            },
            'KEY-b-lt':{
                width:'2px',
                height:'2px',
               left:'-1px',
               top:'-1px',
                background: xui.UI.$bg('corner.gif', 'no-repeat left top','Input')
            },
            'KEY-b-rt':{
               width:'2px',
               height:'2px',
               right:'-1px',
               top:'-1px',
               background: xui.UI.$bg('corner.gif', 'no-repeat right top','Input')
            },
            'KEY-b-rb':{
                width:'2px',
                height:'2px',
                right:'-1px',
                bottom:'-1px',
                background: xui.UI.$bg('corner.gif', 'no-repeat right bottom','Input')
            },
            'KEY-b-lb':{
                width:'2px',
                height:'2px',
                left:'-1px',
                bottom:'-1px',
                background: xui.UI.$bg('corner.gif', 'no-repeat left bottom','Input')
            },
            'BOX-focus KEY-b-lt, BOX-focus KEY-b-rt, BOX-focus KEY-b-rb, BOX-focus KEY-b-lb, BOX-mouseover KEY-b-lt, BOX-mouseover KEY-b-rt, BOX-mouseover KEY-b-rb, BOX-mouseover KEY-b-lb':{
                $order:1,
                'background-image': xui.UI.$bg('corner_mouseover.gif','','Input')
            }
//border>>>
        },
        Behaviors:{
            HoverEffected:{BOX:['BOX']},
            NavKeys:{INPUT:1},
            LABEL:{
                onClick:function(profile, e, src){
                    if(profile.properties.disabled)return false;
                    if(profile.onLabelClick)
                        profile.boxing().onLabelClick(profile, e, src);
                },
                onDblClick:function(profile, e, src){
                    if(profile.properties.disabled)return false;
                    if(profile.onLabelDblClick)
                        profile.boxing().onLabelDblClick(profile, e, src);
                },
                onMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!='left')return;
                    if(profile.properties.disabled)return false;
                     if(profile.onLabelActive)
                        profile.boxing().onLabelActive(profile, e, src);
                }
            },
            INPUT:{
                onChange:function(profile, e, src){
                    var p=profile.properties,b=profile.box,
                        o=profile._inValid,
                        value=xui.use(src).get(0).value;
                    // trigger events
                    profile.boxing().setUIValue(value);
                    // input/textarea is special, ctrl value will be set before the $UIvalue
                    p.$UIvalue=value;
                    if(o!==profile._inValid) if(profile.renderId)profile.boxing()._setDirtyMark();

                    b._asyCheck(profile);
                },
                //if properties.mask exists, onHotKeyxxx wont be tigger any more
                onKeydown:function(profile, e, src){
                   var p=profile.properties,b=profile.box,
                        m=p.multiLines,
                        evt=xui.Event,
                        k=evt.getKey(e);
                    if(p.disabled || p.readonly)return;

                    //fire onchange first
                    if(k.key=='enter'&& (!m||k.altKey))
                        xui.use(src).onChange();

                    b._asyCheck(profile);

                    if(p.mask){
                        if(k.key.length>1)profile.$ignore=true;
                        else delete profile.$ignore;
                        switch(k.key){
                            case 'backspace':
                                b._changeMask(profile,xui.use(src).get(0),'',false);
                                return false;
                            case 'delete':
                                b._changeMask(profile,xui.use(src).get(0),'');
                                return false;
                        }
                    }
                },
                onKeypress:function(profile, e, src){
                    var p=profile.properties,
                    b=profile.box,
                    cls=profile.box,
                    map=cls._maskMap,
                    k=xui.Event.getKey(e),t,
                    caret=xui.use(src).caret();
                    
                    if(profile.beforeKeypress && false===profile.boxing().beforeKeypress(profile,caret, k,e,src))
                        return false;
                    t=profile.CF.beforeKeypress||profile.$beforeKeypress;
                    if(t && false===t(profile,caret,k,e,src))
                        return false;

                    b._asyCheck(profile);

                    if(p.mask){
                        if(profile.$ignore){
                            delete profile.$ignore;
                            return true;
                        }
                        if(k.ctrlKey||k.altKey)return true;

                        cls._changeMask(profile,xui.use(src).get(0),k.key,true);
                        return false;
                    }
                },
                onKeyup:function(profile, e, src){
                    var p=profile.properties,b=profile.box;
                    // must be key up event
                    if(xui.Event.getKey(e).key=='esc'){
                        profile.boxing().setUIValue(p.value,true);
                        if(profile.onCancel)
                            profile.boxing().onCancel(profile);
                    }

                    if(p.dynCheck){
                        var value=xui.use(src).get(0).value;
                        profile.box._checkValid(profile, value);
                        profile.boxing()._setDirtyMark();
                    }
                    b._asyCheck(profile);
                },
                onFocus:function(profile, e, src){
                    var p=profile.properties,b=profile.box;
                    if(p.disabled)return false;
                    if(profile.onFocus)profile.boxing().onFocus(profile);
                    profile.getSubNode('BORDER').tagClass('-focus');
                    //if no value, add mask
                    if(p.mask){
                        var value=xui.use(src).get(0).value;
                        if(!value)
                            _.asyRun(function(){
                                profile.boxing().setUIValue(value=profile.$Mask);
                                b._setCaret(profile,xui.use(src).get(0))
                            });
                    }
                    //show tips color
                    profile.boxing()._setTB(3);

                    b._asyCheck(profile);
                },
                onBlur:function(profile, e, src){
                    var p=profile.properties,b=profile.box;
                    if(p.disabled || p.readonly)return false;

                    if(profile.onBlur)profile.boxing().onBlur(profile);
                    profile.getSubNode('BORDER').tagClass('-focus',false);
                    var value=xui.use(src).get(0).value;
                    //onblur check it
                    if(p.$UIvalue==value)
                        profile.box._checkValid(profile, value);

                    profile.boxing()._setDirtyMark();

                    b._asyCheck(profile);
                }
            }
        },
        DataModel:{
            selectable:true,
            _customBorder:'BOX',
            border:false,

            tipsErr:'',
            tipsOK:'',

            dynCheck:false,

            labelSize:{
                ini:0,
                action: function(v){
                    this.getSubNode('LABEL').css({display:v?'':'none',width:(v||0)+"px"});
                    xui.UI.$doResize(this,this.properties.width,this.properties.height,true);
                }
            },
            labelPos:{
                ini:"left",
                listbox:['left','top', 'right', 'bottom'],
                action: function(v){
                    xui.UI.$doResize(this,this.properties.width,this.properties.height,true);
                }                
            },
            labelGap:{
                ini:4,
                action: function(v){
                    xui.UI.$doResize(this,this.properties.width,this.properties.height,true);
                }
            },
            labelCaption:{
                ini:"",
                action: function(v){
                    v=(_.isSet(v)?v:"")+"";
                    this.getSubNode('LABEL').html(xui.adjustRes(v,true));
                }
            },
            labelHAlign:{
                ini:'right',
                listbox:['','left','center','right'],
                action: function(v){
                    this.getSubNode('LABEL').css('textAlign',v);
                }
            },

            valueFormat:{
                helpinput:[
                    {caption : 'required', id: "[^.*]"},
                    {caption : 'email',id:"^[\\w\\.=-]+@[\\w\\.-]+\\.[\\w\\.-]{2,4}$"},
                    {caption : 'charOnly',id:"^[a-zA-Z]*$"},
                    {caption : 'words',id:"^[\\w ]*$"},
                    {caption : 'integer',id:"^-?\\d\\d*$"},
                    {caption : 'positiveInteger',id:"^\\d\\d*$"},
                    {caption : 'number',id:"^-?(\\d\\d*\\.\\d*$)|(^-?\\d\\d*$)|(^-?\\.\\d\\d*$)"},
                    {caption : 'filepath',id:"([\\/]?[\\w_]+)+\\.\\w{1,9}$"},
                    {caption : 'URL', id:"^(http|https|ftp)\\:\\/\\/[\\w\\-\\_\\.]+[\\w\\-\\_](:[\\w]*)?\\/?([\\w\\-\\._\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$"},
                    {caption : 'color',id:"^\\#[0-9A-Fa-f]{6}$"},
                    {caption : "HH:MM", id:"^\(\([0-1][0-9]\)|\([2][0-3])\)\:\([0-5][0-9]\)$"},
                    {caption : "HH:MM:SS", id:"^\(\([0-1][0-9]\)|\([2][0-3])\)\:\([0-5][0-9]\)\\:\([0-5][0-9]\)$"},
                    {caption : "YYYY-MM-DD",id:"^\([0-9]{4}\)\\-\(\([0][0-9]\)|\([1][0-2]\)\)\\-\([0-3][0-9]\)$"},
                    {caption : "DD/MM/YYYY",id:"^\(\([0-2][0-9]\)|\([3][0-1]\)\)\/\(\([0][0-9]\)|\([1][0-2]\)\)\/\([0-9]{4}\)$"}
                ]
            },
            mask:{
                action:function(value){
                    var ns=this,
                        b=ns.box;
                    if(value){
                        ns.$MaskFormat=function(ns, v){
                            var m=ns._maskMap,a=[],r=/[A-Za-z0-9]/;
                            _.arr.each(v.split(''),function(o,i){
                                a.push(m[o]||(r.test(o)?"":"\\")+o)
                            });
                            return '^'+a.join('')+'$';
                        }(b, value);
                        ns.$Mask = function(ns, v){
                            var m=ns._maskMap,a=[],s=ns._maskSpace;
                            _.arr.each(v.split(''),function(o,i){
                                a.push(m[o]?s:o);
                            });
                            return  a.join('');
                        }(b,value);
                        var uiv=ns.properties.$UIvalue;
                        uiv=_.isSet(uiv)?(uiv+""):"";
                        //visibility mask string
                        ns.boxing()._setCtrlValue(uiv + ns.$Mask.slice(uiv.length));
                   }else{
                        delete ns.$MaskFormat;
                        delete ns.$Mask;
                   }
                }
            },
            value:'',
            width:120,
            height:22,
            disabled:{
                ini:false,
                action: function(v){
                    var i=this.getSubNode('INPUT');
                    if(v)
                        i.addClass('xui-ui-inputdisabled');
                    else
                        i.removeClass('xui-ui-inputdisabled');
                    if((""+i.get(0).type).toLowerCase()!='button'){
                        if(!v && this.properties.readonly)
                            v=true;
                        // use 'readonly'(not 'disabled') for selection
                        i.attr('readonly',v);
                    }
                }
            },
            hAlign:{
                ini:'',
                listbox:['','left','center','right'],
                action: function(v){
                    this.getSubNode("INPUT").css('textAlign',v);
                }
            },
            readonly:{
                ini:false,
                action: function(v){
                    var i=this.getSubNode('INPUT'),
                        cls=this.getClass('KEY','-readonly');
                    
                    if(v)this.getRoot().addClass(cls);
                    else this.getRoot().removeClass(cls);

                    if((""+i.get(0).type).toLowerCase()!='button'){
                        if(!v && this.properties.disabled)
                            v=true;
                        // use 'readonly'(not 'disabled') for selection
                        i.attr('readonly',v);
                    }
                }
            },
            type:{
                ini:'text',
                listbox:['text','password'],
                set:function(value){
                    var pro=this;
                    pro.properties.type=value;
                    if(pro.renderId)
                        pro.boxing().refresh(true);
                }
            },
            maxlength:{
            	ini:'',
            	action: function(value){
                  this.getSubNode('INPUT').attr('maxlength',value);
                }
            },
            multiLines:{
                ini:false,
                action: function(value){
                    this.boxing().refresh();
                }
            },
            tipsBinder:{
                ini:'',
                set:function(value){
                    if(value['xui.UIProfile'])
                        value=value.$xid;
                    if(value['xui.UI'] && (value=value.get(0)))
                        value=value.$xid;
                    this.properties.tipsBinder = value +'';
                }
            }
        },
        EventHandlers:{
            onFocus:function(profile){},
            onBlur:function(profile){},
            onCancel:function(profile){},
            beforeFormatCheck:function(profile, value){},
            beforeFormatMark:function(profile, formatErr){},
            beforeKeypress:function(profile,caret,keyboard,e,src){},
            
            onLabelClick:function(profile, e, src){},
            onLabelDblClick:function(profile, e, src){},
            onLabelActive:function(profile, e, src){}
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile);

            d._type = d.type || '';
            if(xui.browser.kde)
                d._css='resize:none;';
            d.hAlign=d.hAlign?("text-align:" + d.hAlign):"";
            
            d.labelHAlign=d.labelHAlign?("text-align:" + d.labelHAlign):"";
            d.labelShow=d.labelSize?"":("display:none");
    
            // adjustRes for labelCaption
            if(d.labelCaption)
                d.labelCaption=xui.adjustRes(d.labelCaption,true);

            return d;
        },
        _dynamicTemplate:function(profile){
            var properties = profile.properties,t,
                hash = profile._exhash = "$" +'multiLines:'+properties.multiLines,
                template = profile.box.getTemplate(hash);

            properties.$UIvalue = properties.value;

            // set template dynamic
            if(!template){
                template = _.clone(profile.box.getTemplate());
                if(properties.multiLines){
                    t=template.FRAME.BORDER.BOX.WRAP.INPUT;
                    t.tagName='textarea';
                    delete t.type;
                }

                // set template
                profile.box.setTemplate(template, hash);
            }
            profile.template = template;
        },
        _ensureValue:function(profile, value){
            // ensure return string
            return ""+(_.isSet(value)?value:"");
        },
        RenderTrigger:function(){
            var ns=this,p=ns.properties;
            _.asyRun(function(){
                if(ns.box)
                    ns.boxing()._setTB(1);
            });
            ns.getSubNode('WRAP').$firfox2();
            if(p.readonly)
                ns.boxing().setReadonly(true,true);
            if(p.tipsBinder)
                ns.boxing().setTipsBinder(p.tipsBinder,true);
            //add event for cut/paste text
            var ie=xui.browser.ie,
                src=ns.getSubNode('INPUT').get(0),
                b=ns.box,
                f=function(o){
                    if(ie && ('propertyName' in o) && o.propertyName!='value')return;
                    b._asyCheck(ns);
                };
            if(ie){
                src.attachEvent("onpropertychange",f);
                src.attachEvent("ondrop",f);
                ns.$ondestory=function(){
                    var ns=this,
                        src=ns.getSubNode('INPUT').get(0);
                    if(src){
                        src.detachEvent("onpropertychange",f);
                        src.detachEvent("ondrop",f);
                        src=null;
                    }
                }
            }else{
                src.addEventListener("input",f,false);
                src.addEventListener("drop",f,false);
                //Firefox earlier than version 3.5
                if(xui.browser.gek)
                    src.addEventListener("dragdrop",f,false);

                ns.$ondestory=function(){
                    var ns=this,
                        src=ns.getSubNode('INPUT').get(0);
                    if(src){
                        src.removeEventListener("input",f,false);
                        src.removeEventListener("drop",f,false);
                        if(xui.browser.gek)
                            src.removeEventListener("dragdrop",f,false);
                        src=null;
                    }
                }
            }
            src=null;
        },
        LayoutTrigger:function(){
            var p = this.properties;
            if(p.mask)this.boxing().setMask(p.mask,true);
        },
    //v=value.substr(0,caret);
    //i=v.lastIndexOf(ms);

        _changeMask:function(profile,src,v,dir){
            var ns=this,
                p=profile.properties,
                map=ns._maskMap,
                ms=ns._maskSpace,
                maskTxt=p.mask,
                maskStr = profile.$Mask,
                input = xui(src),
                caret = input.caret();
            //for backspace
            if(dir===false && caret[0]==caret[1] && caret[0]>0)
                input.caret(caret[0]-1,caret[0]);

            //for delete
            if(dir===undefined && caret[0]==caret[1])
                input.caret(caret[0],caret[0]+1);

            //for caret is from a fix char, nav to the next 'input allow' char
            if(dir===true){
                if(maskStr.charAt(caret[0])!=ms){
                    var from = caret[0] + maskStr.substr(caret[0],maskStr.length).indexOf(ms);
                    input.caret(from,Math.max(caret[1],from))
                }
            }

            var caret = input.caret(),
                value=src.value,
                cc=p.mask.charAt(caret[0]),
                reg = ns._maskMap[cc],
                i,t;

            if(reg && v && v.length==1){
                if(cc=='l')
                    v=v.toLowerCase();
                else if(cc=='u')
                    v=v.toUpperCase();
            }

            if(reg && new RegExp('^'+reg+'$').test(v) || v==''){
                t=value;
                //if select some text
                if(caret[0]!=caret[1])
                    t=t.substr(0,caret[0]) + maskStr.substr(caret[0],caret[1]-caret[0]) + t.substr(caret[1],t.length-caret[1]);
                //if any char input
                if(v)
                    t=t.substr(0,caret[0])+v+t.substr(caret[0]+1,t.length-caret[0]-1);

                //get corret string according to maskTxt
                var a=[];
                _.arr.each(maskTxt.split(''),function(o,i){
                    a.push( (new RegExp('^'+(map[o]?map[o]:'\\'+o)+'$').test(t.charAt(i))) ? t.charAt(i) : maskStr.charAt(i))
                });

                //if input visible char
                if(dir===true){
                    v=maskStr.substr(caret[0]+1,value.length-caret[0]-1);
                    i=v.indexOf(ms);
                    i=caret[0] + (i==-1?0:i) + 1;
                }else
                    i=caret[0];
                //in opera, delete/backspace cant be stopbubbled
                //add a dummy maskSpace
                if(xui.browser.opr){
                    //delete
                    if(dir===undefined)
                        _.arr.insertAny(a,ms,i);
                    //backspace
                    if(dir===false)
                        _.arr.insertAny(a,ms,i++);
                }
                profile.boxing().setUIValue(src.value=a.join(''));
                ns._setCaret(profile,src,i);
            }

        },
        _setCaret:function(profile, src, pos){
            if(profile.properties.mask){
                if(typeof pos !='number')
                    pos=src.value.indexOf(this._maskSpace);
                xui(src).caret(pos,pos);
            }
        },
        // for checking html <input>
        _checkValid2:function(profile){
            if(!profile.renderId)return true;
            return this._checkValid(profile, profile.getSubNode('INPUT').get(0).value);
        },
        //check valid manually
        _checkValid:function(profile, value){
            var p=profile.properties,
                vf1 = (p.mask&&profile.$MaskFormat) ,
                vf2 = p.valueFormat || profile.$valueFormat;
            if( (profile.beforeFormatCheck && (profile.boxing().beforeFormatCheck(profile, value)===false)) ||
                (vf1 && typeof vf1=='string' && !(new RegExp(vf1)).test((value===0?'0':value)||'')) ||
                (vf2 && typeof vf2=='string' && !(new RegExp(vf2)).test((value===0?'0':value)||''))
            ){
                profile._inValid=2;
                return false;
            }{
                profile._inValid=3;
                return true;
            }
        },
        _asyCheck:function(profile){
            _.resetRun(profile.$xid+":asycheck",function(){
                if(!profile.renderId)return;

                var input=profile.getSubNode("INPUT"),
                    src=input.get(0);
                if(!src)return;

                //for onchange event
                if(profile.properties.dynCheck)
                    profile.boxing().setUIValue(src.value);

                //for mask
                if(profile.properties.mask){
                    if(src.value.length != profile.$Mask.length)
                        profile.box._changeMask(profile,src,'',true);
                }
            });
        },
        _onresize:function(profile,width,height){
                var $hborder=1, $vborder=1,
                    toff=xui.UI.$getCSSValue('xui-input-input','paddingTop'),
                    loff=xui.UI.$getCSSValue('xui-input-input','paddingLeft'),
                    roff=xui.UI.$getCSSValue('xui-input-input','paddingRight');

                var t = profile.properties,
                    o = profile.getSubNode('BOX'),
                    label = profile.getSubNode('LABEL'),
                    labelSize=t.labelSize||0,
                    labelGap=t.labelGap||0,
                    labelPos=t.labelPos || 'left',
                    v1=profile.getSubNode('INPUT'),
                    ww=width,
                    hh=height,
                    left=Math.max(0, (t.$b_lw||0)-$hborder),
                    top=Math.max(0, (t.$b_tw||0)-$vborder);
                if(null!==ww){
                    ww -= Math.max($hborder*2, (t.$b_lw||0)+(t.$b_rw||0));
                    /*for ie6 bug*/
                    /*for example, if single number, 100% width will add 1*/
                    /*for example, if single number, attached shadow will overlap*/
                    if(xui.browser.ie6)ww=(parseInt(ww/2,10))*2;
                }
                if(null!==hh){
                    hh -=Math.max($vborder*2, (t.$b_lw||0) + (t.$b_rw||0));

                    if(xui.browser.ie6)hh=(parseInt(hh/2,10))*2;
                    /*for ie6 bug*/
                    if(xui.browser.ie6&&null===width)o.ieRemedy();
                }

                o.cssRegion({
                    left:left + (labelPos=='left'?labelSize:0),
                    top:top + (labelPos=='top'?labelSize:0),
                    width:ww===null?null:Math.max(0,(ww - ((labelPos=='left'||labelPos=='right')?labelSize:0))),
                    height:hh===null?null:Math.max(0,(hh - ((labelPos=='top'||labelPos=='bottom')?labelSize:0)))
                });
                
                if(labelSize)
                    label.cssRegion({
                        left:ww===null?null:Math.max(0,labelPos=='right'?(ww-labelSize+labelGap):0),
                        top: height===null?null:Math.max(0,labelPos=='bottom'?(height-labelSize+labelGap):0), 
                        width:ww===null?null:Math.max(0,((labelPos=='left'||labelPos=='right')?(labelSize-labelGap):ww)),
                        height:height===null?null:Math.max(0,((labelPos=='top'||labelPos=='bottom')?(labelSize-labelGap):height))
                    });

                if(ww||hh)
                    v1.cssSize({
                        width:ww?Math.max(0,(ww-loff-roff-((labelPos=='left'||labelPos=='right')?labelSize:0))):null,
                        height:hh?Math.max(0,(hh-toff-((labelPos=='top'||labelPos=='bottom')?labelSize:0))):null
                    });

                /*for ie6 bug*/
                if((profile.$border||profile.$shadow||profile.$resizer) && xui.browser.ie)o.ieRemedy();
        }
    }
});