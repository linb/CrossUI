Class("xui.UI.Slider", ["xui.UI","xui.absValue"],{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                var p=profile.properties,
                    steps=p.steps,
                    fun=function(k){return profile.getSubNode(k)},
                    a=fun('IND1'),
                    b=fun('IND2'),
                    arr = profile.box._v2a(profile,value),
                    ori=p.type=='vertical'?'top':'left';
                a[ori](arr[0]+'%');
                if(p.isRange)
                    b[ori](arr[1]+'%');
            });
        },
        _setDirtyMark:function(){
            return arguments.callee.upper.apply(this,['BOX']);
        }
    },
    Static:{
        Templates:{
            style:'{_style}',
            className:'{_className}',
            LABEL:{
                className:'{_required}',
                style:'{labelShow};width:{_labelSize};{labelHAlign}',
                text:'{labelCaption}'
            },
            BOX:{
                tagName:'div',
                className:'{_cls}',
                BG:{
                    tagName:'div'
                },
                RULER:{
                    $order:1,
                    tagName:'div',
                    className:'xui-uiborder-flat',
                    RULERLEFT:{},
                    RULERRIGHT:{}
                },
                IND:{
                    $order:2,
                    IND1:{
                        tagName:'button',
                        className:'xui-ui-btn',
                        style:'{_showD}',
                        tabindex:'{tabindex}'
                    },
                    IND2:{
                        tagName:'button',
                        className:'xui-ui-btn',
                        style:'{_showD2}',
                        tabindex:'{tabindex}'
                    }
                },
                DECREASE:{
                    style:'{_showDes}',
                    className:'xuifont',
                    $fonticon:'{_fi_decls}',
                    tabindex:'{tabindex}'
                },
                INCREASE:{
                    style:'{_showIns}',
                    className:'xuifont',
                    $fonticon:'{_fi_incls}',
                    tabindex:'{tabindex}'
                }
            }
        },
        Appearances:{
            'IND, BT, RULER, RULERLEFT, RULERRIGHT, IND1, IND2, DECREASE, INCREASE':{
                position:'absolute'
            },
            LABEL:{
               'z-index':1,
               top:0,
               left:0,
               position:'absolute',
               'padding-top':'4px'
            },
            BOX:{
                position:'absolute',
                left:0,
                top:0,
                width:'100%',
                height:'100%'
            },
            'BOX-h DECREASE, BOX-h INCREASE':{
                top:'50%',
                'margin-top':'-.5em'
            },            
            'BOX-h IND1,BOX-h IND2, BOX-v IND1,BOX-v IND2':{
                padding:0,
                margin:0
            },
            'BOX-h DECREASE':{
                $order:1,
                left:0
            },
            'BOX-h INCREASE':{
                $order:1,
                right:0
            },
            'BOX-h BG':{
                top:'50%'                
            },
            'BOX-h IND, BOX-h RULER':{
                'z-index':1,
                top:'50%',
                height:'2px',
                'margin-top':'-2px'
            },
            'BOX-h RULER, BOX-h RULERLEFT, BOX-h RULERRIGHT':{
            },
            'BOX-h RULER':{
                $order:2
            },
            'BOX-h RULERLEFT, BOX-h RULERRIGHT':{
                'z-index':1,
                height:'2px',
                width:'2px'
            },
            'BOX-h RULERLEFT':{
                $order:2,
                left:'-2px',
                top:0
            },
            'BOX-h RULERRIGHT':{
                $order:2,
                right:'-2px',
                top:0
            },

            'BOX-v DECREASE, BOX-v INCREASE':{
                $order:10,
                left:'50%',
                'margin-left':'-.5em'
            },            
            'BOX-v DECREASE':{
                $order:10,
                top:0
            },
            'BOX-v INCREASE':{
                $order:10,
                bottom:0
            },
            'BOX-v BG':{
                $order:10,
                left:'50%'                
            },
            'BOX-v IND, BOX-v RULER':{
                $order:10,
                'z-index':1,
                left:'50%',
                width:'2px',
                'margin-left':'-2px'
            },
            'BOX-v RULER, BOX-v RULERLEFT, BOX-v RULERRIGHT':{
            },
            'BOX-v RULER':{
                $order:10
            },
            'BOX-v RULERLEFT, BOX-v RULERRIGHT':{
                $order:10,
                'z-index':1,
                width:'2px',
                height:'2px'
            },
            'BOX-v RULERLEFT':{
                $order:12,
                top:'-2px',
                left:0
            },
            'BOX-v RULERRIGHT':{
                $order:12,
                bottom:'-2px',
                left:0
            },
            'BOX-h IND1,BOX-h IND2':{
                $order:1,
                'z-index':2,
                height:'18px',
                width:'8px',
                left:0,
                top:0,
                cursor:'e-resize',
                'margin-top':'-7px'
            },
            'BOX-v IND1,BOX-v IND2':{
                $order:10,
                'z-index':2,
                width:'18px',
                height:'8px',
                left:0,
                top:0,
                cursor:'n-resize',
                'margin-left':'-7px'
            }
        },
        Behaviors:{
            HoverEffected:{IND1:'IND1',IND2:'IND2',DECREASE:'DECREASE',INCREASE:'INCREASE'},
            ClickEffected:{IND1:'IND1',IND2:'IND2',DECREASE:'DECREASE',INCREASE:'INCREASE'},
            onSize:xui.UI.$onSize,
            IND:{
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled || p.readonly)return false;
                    var p1=xui.use(src).offset(),
                        p2=xui.Event.getPos(e),
                        arr=profile.box._v2a(profile,profile.properties.$UIvalue),
                        i1,i2,
                        type=p.type=='vertical',
                        k1=type?'top':'left',
                        k2=type?'offsetTop':'offsetLeft',
                        k3=type?'offsetHeight':'offsetWidth',
                        cur=p2[k1]-p1[k1],
                        v=(cur/xui.use(src).get(0)[k3])*100;
                    if(!p.isRange)
                        arr[0]=v;
                    else{
                        i1=profile.getSubNode('IND1')[k2](),
                        i2=profile.getSubNode('IND2')[k2]();
                        if(Math.abs(i1-cur)<Math.abs(i2-cur))
                            arr[0]=v;
                        else arr[1]=v;
                    }
                    profile.boxing().setUIValue(profile.box._adjustValue(profile,arr),null,null,'click');
                }
            },
            IND1:{
                onKeydown:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled || p.readonly)return;
                    var type=p.type=='vertical',
                        key=xui.Event.getKey(e).key;
                    if(key==(type?'up':'left'))
                        profile.box._auto(profile, false);
                    if(key==(type?'down':'right'))
                        profile.box._auto(profile, true);
                },
                onKeyout:function(profile){
                    xui.Thread.abort(profile.$xid+':auto');
                },
                onKeyup:function(profile){
                    xui.Thread.abort(profile.$xid+':auto');
                },
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    var p=profile.properties;
                    if(p.disabled || p.readonly)return;
                    var type=p.type=='vertical',
                        k2=type?'offsetTop':'offsetLeft',
                        k3=type?'offsetHeight':'offsetWidth',
                        box=profile.box;
                    xui.use(src).startDrag(e,{
                        widthIncrement:p.steps?profile._size/p.steps:null,
                        dragType:'none',
                        targetReposition:true,
                        horizontalOnly:type?true:null,
                        verticalOnly:type?null:true,
                        maxLeftOffset: xui.use(src).get(0)[k2],
                        maxRightOffset: xui.use(src).parent().get(0)[k3]-xui.use(src).get(0)[k2],
                        dragCursor:'default'
                    });

                    xui.use(src).css('zIndex',10).focus();
                    profile.getSubNode('IND2').css('zIndex',5);
                },
                beforeDragbegin:function(profile, e, src){
                    var type=profile.properties.type=='vertical';
                    xui(src)[type?'top':'left'](profile.__x=xui.use(src).get(0)[type?'offsetTop':'offsetLeft']);
                },
                onDrag:function(profile, e, src){
                    var offset=xui.DragDrop.getProfile().offset,
                        type=profile.properties.type=='vertical',
                        arr=profile.box._v2a(profile,profile.properties.$UIvalue);
                    arr[0]=((profile.__x+offset[type?'y':'x'])/xui.use(src).parent().get(0)[type?'offsetHeight':'offsetWidth'])*100;
                    profile.boxing().setUIValue(profile.box._adjustValue(profile,arr),null,null,'drag');
                },
                onDragstop:function(profile, e, src){
                    xui(src).onMouseout(true,{$force:true}).onMouseup(true);
                },
                onClick:function(){return false}
            },
            IND2:{
                onKeydown:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled || p.readonly)return;
                    var type=p.type=='vertical',
                        key=xui.Event.getKey(e).key;
                    if(key==(type?'up':'left'))
                        profile.box._auto(profile, false);
                    if(key==(type?'down':'right'))
                        profile.box._auto(profile, true);
                },
                onKeyout:function(profile){
                    xui.Thread.abort(profile.$xid+':auto');
                },
                onKeyup:function(profile){
                    xui.Thread.abort(profile.$xid+':auto');
                },
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    var p=profile.properties;
                    if(p.disabled || p.readonly)return;
                    var type=p.type=='vertical',
                        k2=type?'offsetTop':'offsetLeft',
                        k3=type?'offsetHeight':'offsetWidth',
                        box=profile.box;
                    xui.use(src).startDrag(e,{
                        widthIncrement:p.steps?profile._size/p.steps:null,
                        dragType:'none',
                        targetReposition:true,
                        horizontalOnly:type?true:null,
                        verticalOnly:type?null:true,
                        maxLeftOffset: xui.use(src).get(0)[k2],
                        maxRightOffset: xui.use(src).parent().get(0)[k3]-xui.use(src).get(0)[k2],
                        dragCursor:'default'
                    });

                    xui.use(src).css('zIndex',10).focus();
                    profile.getSubNode('IND1').css('zIndex',5);
                },
                beforeDragbegin:function(profile, e, src){
                    var type=profile.properties.type=='vertical';
                    xui(src)[type?'top':'left'](profile.__x=xui.use(src).get(0)[type?'offsetTop':'offsetLeft']);
                },
                onDrag:function(profile, e, src){
                    var offset=xui.DragDrop.getProfile().offset,
                        type=profile.properties.type=='vertical',
                        arr=profile.box._v2a(profile,profile.properties.$UIvalue);
                    arr[1]=((profile.__x+offset[type?'y':'x'])/xui.use(src).parent().get(0)[type?'offsetHeight':'offsetWidth'])*100;
                    profile.boxing().setUIValue(profile.box._adjustValue(profile,arr),null,null,'drag2');
                },
                onDragstop:function(profile, e, src){
                    xui(src).onMouseout(true,{$force:true}).onMouseup(true);
                },
                onClick:function(){return false}
            },
            RULERRIGHT:{
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled || p.readonly)return false;
                    var b=profile.boxing(),
                        c=profile.box,
                        arr=c._v2a(profile,p.$UIvalue);
                    if(!p.isRange)
                        arr[0]=100;
                    else
                        arr[1]=100;
                    b.setUIValue(profile.box._adjustValue(profile,arr),null,null,'click2');
                }
            },
            DECREASE:{
                onMousedown:function(profile){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    profile.box._auto(profile, false);
                },
                onMouseout:function(profile){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    xui.Thread.abort(profile.$xid+':auto');
                },
                onMouseup:function(profile){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    xui.Thread.abort(profile.$xid+':auto');
                }
            },
            INCREASE:{
                onMousedown:function(profile){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    profile.box._auto(profile, true);
                },
                onMouseout:function(profile){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    xui.Thread.abort(profile.$xid+':auto');
                },
                onMouseup:function(profile){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    xui.Thread.abort(profile.$xid+':auto');
                }
            },
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
            }
        },
        DataModel:{
            position:'absolute',
            width:{
                $spaceunit:1,
                ini:'15em'
            },
            height:{
                $spaceunit:1,
                ini:'4em'
            },
            steps:0,
            value:'0:0',
            type:{
                listbox:['vertical', 'horizontal'],
                ini:'horizontal',
                action:function(v){
                    this.boxing().refresh();
                }
            },
            isRange:{
                ini:true,
                action:function(v){
                    this.boxing().refresh();
                }
            },
            showIncreaseHandle:{
                ini:true,
                action:function(v){
                    this.boxing().refresh();
                }
            },
            showDecreaseHandle:{
                ini:true,
                action:function(v){
                    this.boxing().refresh();
                }
            },
            // label
            labelSize:{
                $spaceunit:1,
                ini:0,
                action: function(v){
                    this.getSubNode('LABEL').css({display:v?'':'none'});
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
                $spaceunit:1,
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
            }
        },
        EventHandlers:{
            onLabelClick:function(profile, e, src){},
            onLabelDblClick:function(profile, e, src){},
            onLabelActive:function(profile, e, src){}
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile),
                N='display:none',t;
            d._showDes=d.showDecreaseHandle?'':N,
            d._showIns=d.showIncreaseHandle?'':N,
            d._showD2=d.isRange?'':N;
            d._cls=profile.getClass('BOX',d.type=='vertical'?'-v':'-h');
            d.labelHAlign=d.labelHAlign?("text-align:" + d.labelHAlign):"";
            d.labelShow=d.labelSize?"":("display:none");
            d._labelSize=d.labelSize?'':0+xui.CSS.$picku();
            // adjustRes for labelCaption
            if(d.labelCaption)
                d.labelCaption=xui.adjustRes(d.labelCaption,true);

            d._fi_decls = 'xui-icon-triangle-'+(d.type=='vertical'?'up':'left');
            d._fi_incls = 'xui-icon-triangle-'+(d.type=='vertical'?'down':'right');
            return d;
        },
        _adjustValue:function(profile,value){
            var p = profile.properties,
                b=[];
            b[0]=parseFloat(value[0])||0;
            b[1]=parseFloat(value[1])||0;
            if(p.steps){
                value=100/p.steps;
                b[0]=Math.ceil(b[0]/value);
                if(p.isRange)
                    b[1]=Math.ceil(b[1]/value);
            }
            return p.isRange?b.join(':'):(b[0]+'');
        },
        _ensureValue:function(profile, value){
            var p = profile.properties,
                a = String(value).split(':'),
                min=0,
                max=p.steps?p.steps:100,
                b=[],
                f1=function(a){return parseFloat(a)||0},
                f2=function(a){return Math.min(max, Math.max(min,a))};
            b[0]= f1(a[0]);
            if(p.isRange){
                b[1]= f1(a[1]);
                if(b[0]>b[1]){
                    a=b[1];
                    b[1]=b[0];
                    b[0]=a;
                }
            }
            b[0]= f2(b[0]);
            if(p.isRange)
                b[1]= f2(b[1]);
            return p.isRange?b.join(':'):(b[0]+'');
        },
        _v2a:function(profile,v){
            var steps=profile.properties.steps,t;
            v = typeof v == 'string'? v.split(':') : v;
            v[0]=parseFloat(v[0])||0;v[1]=parseFloat(v[1])||0;
            if(steps)v[0]=v[0]*100/steps;
            if(steps)v[1]=v[1]*100/steps;
            if(v[0]>v[1]){
                t=v[0];
                v[1]=v[0];
                v[0]=t;
            }
            return v;
        },
        _auto:function(profile, flag){
            var id=profile.$xid+':auto';
            if(xui.Thread.isAlive(id))return;
            var p=profile.properties,t,
                //%
                off=(p.steps?100/p.steps:1)*(flag?1:-1),
                task={delay:300},
                arr=profile.box._v2a(profile,p.$UIvalue),
                fun=function(){
                    arr[0] += off;
                    if(p.isRange)
                        arr[1] += off;
                    profile.boxing().setUIValue(profile.box._adjustValue(profile,arr),null,null,'auto');
                    task.delay *=0.8;
                };
            task.task=fun;
            xui.Thread(id,[task],500,null,fun,null,true).start();
        },
        _onresize:function(profile, width, height){
            var prop=profile.properties,
                type=prop.type,
                f=function(k){return profile.getSubNode(k)},
                root = f('KEY'),
                ruler = f('RULER'),
                ind = f('IND'),
                ru1 = f('RULERLEFT'),
                box = f('BOX'),
                label = f('LABEL'),
                
                css = xui.CSS,
                useem = (prop.spaceUnit||xui.SpaceUnit)=='em',
                adjustunit = function(v,emRate){return css.$forceu(v, useem?'em':'px', emRate)},
                needfz = useem||css.$isEm(width)||css.$isEm(height),
                rootfz=needfz?root._getEmSize():null,
                boxfz=useem?box._getEmSize():null,
                labelfz=needfz||css.$isEm(labelSize)?label._getEmSize():null,
                rulerfz = useem?ruler._getEmSize():null,
                indfz = useem?ind._getEmSize():null,

                label = profile.getSubNode('LABEL'),
                labelSize=css.$px(prop.labelSize, labelfz)||0,
                labelGap=css.$px(prop.labelGap)||0,
                labelPos = prop.labelPos || 'left',
                ll, tt, ww, hh;

            // caculate by px
            if(width && width!='auto')width=css.$px(width, rootfz);
            if(height && height!='auto')height=css.$px(height, rootfz);

            box.cssRegion({
                left : adjustunit(ll = labelPos=='left'?labelSize:0,boxfz),
                top : adjustunit(tt = labelPos=='top'?labelSize:0,boxfz),
                width : adjustunit(ww = width===null?null:Math.max(0,(width - ((labelPos=='left'||labelPos=='right')?labelSize:0))),boxfz),
                height : adjustunit(hh = height===null?null:Math.max(0,(height - ((labelPos=='top'||labelPos=='bottom')?labelSize:0))),boxfz)
            });

            if(labelSize)
                label.cssRegion({
                    left: adjustunit(width===null?null:Math.max(0,labelPos=='right'?(width-labelSize+labelGap):0),labelSize),
                    top:  adjustunit(height===null?null:Math.max(0,labelPos=='bottom'?(height-labelSize+labelGap):0),labelSize), 
                    width: adjustunit(width===null?null:Math.max(0,((labelPos=='left'||labelPos=='right')?(labelSize-labelGap):width)),labelSize),
                    height: adjustunit(height===null?null:Math.max(0,((labelPos=='top'||labelPos=='bottom')?(labelSize-labelGap):height)),labelSize)
                });

            if(type=='vertical'){
                var w=ru1.height(),
                    w1=prop.showDecreaseHandle?f('DECREASE').height():0,
                    w2=prop.showIncreaseHandle?f('INCREASE').height():0,
                    w3=f('IND1').height();
    
                if(hh){
                    ruler.top(adjustunit(w1+w,rulerfz)).height(adjustunit(hh-w1-w2-2*w,rulerfz));
                    ind.top(adjustunit(w1,indfz)).height(adjustunit(profile._size=hh-w1-w2-w3,indfz));
                }
            }else{
                var w=ru1.width(),
                    w1=prop.showDecreaseHandle?xui.CSS._getDftFISize():0,
                    w2=prop.showIncreaseHandle?xui.CSS._getDftFISize():0,
                    w3=f('IND1').width();
    
                if(ww){
                    ruler.left(adjustunit(w1+w, rulerfz)).width(adjustunit(ww-w1-w2-2*w,rulerfz));
                    ind.left(adjustunit(w1,indfz)).width(adjustunit(profile._size=ww-w1-w2-w3,indfz));
                }
            }
        }
    }
});