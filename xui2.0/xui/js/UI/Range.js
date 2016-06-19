/*
300: ruler width
30: ruler height
15: ruler shadow height

15: indicator width => 8: indicator offset
14: indicator height
*/
Class("xui.UI.Range", ["xui.UI","xui.absValue"],{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                var p=profile.properties,
                    tpl=p.captionTpl,
                    fun=function(k){return profile.getSubNode(k)},
                    fun1=function(a,i){a.cssPos({left:profile[i], top: box._x2y(profile[i])}) },
                    fun2=function(o,v){o.get(0).style.width = v +'px'},
                    title = fun('CAPTION'),
                    a=fun('IND1'),
                    b=fun('IND2'),
                    r1 = fun('RULER1'),
                    r3 = fun('RULER3'),
                    box = profile.box,
                    arr = box._v2a(value);

                profile._rate= 300/(p.max-p.min);
                //use Math.round
                profile._v1= Math.round((arr[0]-p.min) /  (p.max-p.min) *300) ;
                profile._v2= Math.round((1-(p.max - arr[1]) /  (p.max-p.min)) *300);

                //text value
                title.html(box._buildTpl(p.singleValue,tpl, arr,p.unit),false);
                //indicator position
                fun1(a, '_v1');
                fun1(b,'_v2');
                //background div width
                fun2(r1, profile._v1+8);
                fun2(r3, profile._v2+8);
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
            BOX:{
                tagName:'div',
                RULER:{
                    tagName:'div',
                    IND1:{
                        tabindex:'{tabindex}',
                        style:'{_single}'
                    },
                    IND2:{
                        tabindex:'{tabindex}'
                    },
                    RULER1:{
                        $order:2,
                        style:'{_single}'
                    },
                    RULER3:{}
                },
                TAIL:{
                    tagName:'div',
                    CAPTION:{
                        tagName:'div'
                    },
                    MIN:{
                        text:'{min}'
                    },
                    MAX:{
                        text:'{max}'
                    }
                }
            }
        },
        Appearances:{
            'KEY, RULER, IND1, IND1':{
                'font-size':0,
                'line-height':0,
                position:'relative'
            },
            BOX:{
                position:'absolute',
                left:0,
                top:0,
                width:'316px'
            },
            'CAPTION, IND1, TAIL, MIN':{
                'font-size':'12px',
                'line-height':'14px'
            },
            RULER:{
                $order:1,
                position:'relative',
                height:'30px',
                overflow:'visible',
                'margin-bottom':'3px',
                background: xui.UI.$bg('bg.png'),
                _background:'none',
                _filter: xui.UI.$ieBg('bg.png')
            },
            'RULER1, RULER3':{
                position:'absolute',
                left:0,
                top:0,
                height:'30px',
                width:'300px'
            },
            RULER1:{
                background: xui.UI.$bg('bg.png'),
                _background:'none',
                _filter: xui.UI.$ieBg('bg.png')
            },
            RULER3:{
                background: xui.UI.$bg('front.png'),
                _background:'none',
                _filter: xui.UI.$ieBg('front.png')
            },
            'IND1,IND2':{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                'z-index':'2',
                width:'15px',
                height:'14px',
                position:'absolute'
            },
            IND1:{
                'background-image':xui.UI.$bg('icons.gif', '', true),
                'background-repeat':'no-repeat',
                'background-position':'left -225px',
                left:'0px',
                top:'11px'
            },
            IND2:{
                'background-image':xui.UI.$bg('icons.gif', '', true),
                'background-repeat':'no-repeat',
                'background-position':'-15px -225px',
                left:'300px',
                top:'1px'
            },
            TAIL:{
                $order:2,
                width:'300px',
                position:'relative'
            },
            CAPTION:{
                position:'relative',
                'text-align':'center'
            },
            MIN:{
                position:'absolute',
                left:0,
                top:0
            },
            MAX:{
                position:'absolute',
                right:0,
                top:0
            }
        },
        Behaviors:{
            IND1:{
                onKeydown:function(profile, e, src){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    profile.box._keydown.apply(profile.box,[profile, e, src,0]);
                },
                beforeMousedown:function(profile, e, src){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    if(xui.Event.getBtn(e)!="left")return;
                    var p=profile.properties,
                        box=profile.box,
                        arr = box._v2a(p.$UIvalue);

                    xui.use(src).startDrag(e,{
                        widthIncrement:p.steps?p.width/p.steps:null,
                        dragType:'move',
                        targetReposition:true,
                        horizontalOnly:true,
                        maxLeftOffset: (profile._v1),
                        maxRightOffset: (profile._v2-profile._v1),
                        dragCursor:'default'
                    });
                    xui.use(src).css('zIndex',10).focus();
                    profile.getSubNode('IND2').css('zIndex',5);
                },
                onDrag:function(profile, e, src){
                    var d=xui.DragDrop.getProfile();
                    profile.box._ondrag.apply(profile.box,[profile,d.curPos.left,src,0]);
                },
                onDragstop:function(profile, e, src){
                    var p=profile.properties,
                        box=profile.boxing(),
                        rate = profile._rate,
                        d=xui.DragDrop.getProfile(),
                        f,
                        arr = p.$UIvalue.split(':');
                    profile._v1=d.curPos.left;
                    arr[0]= ((profile._v1)/rate + p.min);
                    box.setUIValue(arr.join(':'),null,null,'drag');

                    if(profile._v1==profile._v2){
                        xui.use(src).css('zIndex',10);
                        profile.getSubNode('IND2').css('zIndex',5);
                    }
                }
            },
            IND2:{
                onKeydown:function(profile, e, src){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    profile.box._keydown.apply(profile.box,[profile, e, src,1]);
                },
                beforeMousedown:function(profile, e, src){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    if(xui.Event.getBtn(e)!="left")return;
                    var p=profile.properties,
                        box=profile.box,
                        arr = box._v2a(p.$UIvalue);

                    xui.use(src).startDrag(e,{
                        widthIncrement:p.steps?p.width/p.steps:null,
                        dragType:'move',
                        targetReposition:true,
                        horizontalOnly:true,
                        maxLeftOffset: (profile._v2-profile._v1),
                        maxRightOffset: (300 - profile._v2),
                        dragCursor:'default'
                    });
                    xui.use(src).css('zIndex',10).focus();
                    profile.getSubNode('IND1').css('zIndex',5);
                },
                onDrag:function(profile, e, src){
                    var d=xui.DragDrop.getProfile();
                    profile.box._ondrag.apply(profile.box,[profile,d.curPos.left,src,1]);
                },
                onDragstop:function(profile, e, src){
                    var p=profile.properties,
                        box=profile.boxing(),
                        rate = profile._rate,
                        d=xui.DragDrop.getProfile(),
                        f,
                        arr = p.$UIvalue.split(':');
                    profile._v2=d.curPos.left;
                    arr[1]= ((profile._v2)/rate + p.min);
                    box.setUIValue(arr.join(':'),null,null,'drag2');
                }
            }
        },
        DataModel:{
            position:'absolute',
            
            width:{
                ini:300,
                readonly:true
            },
            height:{
                ini:46,
                readonly:true
            },
            min:{
                ini:0,
                action:function(){
                    var self=this,t,pro=self.properties,b=self.boxing();
                    b.refresh();
                    if(pro.$UIvalue!=(t=this.box._ensureValue(self,pro.$UIvalue)))
                        b.setValue(t,false,'min');
                }
            },
            max:{
                ini:100,
                action:function(){
                    var self=this,t,pro=self.properties,b=self.boxing();
                    b.refresh();
                    if(pro.$UIvalue!=(t=this.box._ensureValue(self,pro.$UIvalue)))
                        b.setValue(t,false,'max');
                }
            },
            unit:{
                ini:'',
                action:function(){
                    this.boxing()._setCtrlValue(this.properties.$UIvalue);
                }
            },
            steps:0,
            captionTpl:{
                ini:'{fromvalue}{unit} - {tovalue}{unit}',
                action:function(){
                    this.boxing()._setCtrlValue(this.properties.$UIvalue);
                }
            },
            value:'0:100',
            singleValue:{
                ini:false,
                action:function(v){
                    this.boxing().refresh();
                }
            }
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile);
            var p=profile.properties,
                arr=profile.box._v2a(p.value);
            d._single = p.singleValue?'display:none':'';

            p.min=parseFloat(p.min);
            p.max=parseFloat(p.max);

            d.min = d.min + p.unit;
            d.max = d.max + p.unit;
            return d;
        },
        _ensureValue:function(profile, value){
            if(!value)value="";
            var p = profile.properties,
                a = value.split(':'),
                min=p.min,
                max=p.max,
                b=[],
                f1=function(a){return parseFloat(a)},
                f2=function(a){return Math.min(max, Math.max(min,a))};
            
            b[0]= f1(a[0]);
            b[1]= f1(a[1]);
            b[0] = Math.min(b[0],b[1]);
            if(!min)min=b[0];
            if(!max)max=b[1];
            b[0]= f2(b[0]);
            b[1]= f2(b[1]);            
            return b.join(':');
        },
        _v2a:function(value){
            return typeof value == 'string'? value.split(':') : value;
        },
        _buildTpl:function(single,tpl,arr,unit){
            return single?
              arr[1] + unit
            : tpl.replace(/\{fromvalue\}/g,arr[0]).replace(/\{tovalue\}/g,arr[1]).replace(/\{unit\}/g,unit);
        },
        _x2y:function(x){
            return (15 + 1 - (x) * (15/300));
        },
        _keydown:function(profile, e, src,type){
            var key=xui.Event.getKey(e);
            if(key.key=='left' || key.key=='right'){
                var s=xui.use(src).get(0).style, left=parseInt(s.left,10), pro=profile.properties, steps=pro.steps, span=300/steps, v,f=function(key){
                    return parseInt(profile.getSubNode(key).get(0).style.left,10);
                };
                left += key.key=='left'?-1:1;
                if(steps){
                    left = left-left%span;
                    if(key.key=='right')
                        left += span;
                }
                if(!pro.singleValue)
                    if(type===0){
                        v=f('IND2');
                        if(left>v)left=v;
                    }else{
                        v=f('IND1');
                        if(left<v)left=v;
                    }
                if(left<0)left=0;
                if(left>300)left=300;
                
                s.left=left+'px';

                profile.box._ondrag.apply(profile.box,[profile,left,src,type]);

                var  rate = profile._rate,
                    arr = pro.$UIvalue.split(':');
                if(type===0){
                    profile._v1=left;
                    arr[0]= ((profile._v1)/rate + pro.min);
                }else{
                    profile._v2=left;
                    arr[1]= ((profile._v2)/rate + pro.min);
                }
                profile.boxing().setUIValue(arr.join(':'),null,null,'kb');                
            }
        },
        _ondrag:function(profile, left, src, tag){
            var p=profile.properties,
                d=xui.DragDrop.getProfile(),
                box=profile.box,
                fun=function(k){return profile.getSubNode(k)},
                fun2=function(o,v){o.get(0).style.width = v +'px'},
                cap = fun('CAPTION'),
                r1 = fun('RULER1'),
                r3 = fun('RULER3'),
                t,f,
                arr=this._v2a(p.$UIvalue);

             //adjust top
            xui.use(src).get(0).style.top = this._x2y(left) + 'px';

            t = ((left)/profile._rate + p.min);

            if(tag){
                arr[1] = t;
                fun2(r3, left + 8);
            }else{
                arr[0] = t;
                fun2(r1, left + 8);
            }
             cap.html(box._buildTpl(p.singleValue, p.captionTpl, arr,p.unit),false);
        },
        _onresize:function(){}
    }
});