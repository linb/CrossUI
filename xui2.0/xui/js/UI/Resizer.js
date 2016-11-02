//resizer class, add a plug in to xui.Dom
Class("xui.UI.Resizer","xui.UI",{
    Instance:{
        _attachTo:function(target, parent){
            var self=this, v=self.get(0);

            //set target first
            v._target= xui(target);
            v._parent= parent || xui('body');

            //add to dom
            v._parent.append(self);

            v.$resizeId = xui(target).id();

            return self;
        },
        show:function(){
            var self=this;
            self.each(function(o){
                o.getRoot().css('display','');
            });
            if(xui.browser.ie)
                self.reBoxing().ieRemedy();
            return self;
        },
        hide:function(){
            var self=this;
            self.reBoxing().css('display','none');
            return self;
        }
    },
    Initialize:function(){
        this.addTemplateKeys(['HANDLER','HIDDEN','MOVE','CONF1','CONF2','ROTATE','L','R','T','B','LT','RT','LB','RB','REGION']);
        xui.each({
            // add resizer to xui.Dom plugin
            addResizer:function(properties, onUpdate, onChange){
                var target=xui([this.get(0)]);
                properties=properties||{};
                xui.merge(properties,{
                    _attached:true
                });

                var r = new xui.UI.Resizer(properties)._attachTo(target, target);

                //set event
                if(onUpdate) r.onUpdate(onUpdate);
                if(onChange) r.onChange(onChange);
                return r;
            },
            removeResizer:function(){
                var s = this.id();
                xui.arr.each(xui.UI.Resizer._cache,function(o){
                    if(o && o.$resizeId==s)
                        o.boxing().destroy(true);
                });
                return this;
            },
            $getResizer:function(){
                var s = this.id(), b;
                xui.arr.each(xui.UI.Resizer._cache,function(o){
                    if(o && o.$resizeId==s){b=o;return false;}
                });
                return b && b.boxing();
            }
        },function(o,i){
            xui.Dom.plugIn(i,o);
        });

        //for xui.UI.Widget
        xui.each({
            _resizer:function(key, args){
                return this.each(function(o){
                    var target = o.getSubNode('BORDER'),
                        d = o.properties;
                    if(target.$getResizer())return;
                    args = args || {};
                    var update = function(pro, target, size, cssPos){
                        var profile=arguments.callee.profile,
                            node=profile.getRoot(),
                            instance=profile.boxing(),
                            prop=profile.properties,
                            svg=profile.box['xui.svg'],
                            t;
                        if(size){
                            var w=null,h=null,l=null,t=null;
                            if(t=size.width){
                                node.widthBy(t);
                                prop.width = w = profile.$forceu(svg?instance.getWidth():node.width());
                            }
                            if(t=size.height){
                                node.heightBy(t);
                                prop.height = h = profile.$forceu(svg?instance.getHeight():node.height());
                            }
                            xui.UI.$tryResize(profile,w,h,true);

                            // for no _onresize widget only
                            if(!profile.box._onresize && profile.onResize && (w!==null||h!==null))
                                instance.onResize(profile,w,h);
                        }
                        if(cssPos){
                            if((t=cssPos.left) && !(prop.left=='auto'&&Math.round(parseFloat(prop.right))>=0)){
                                node.leftBy(t);
                                prop.left= l = profile.$forceu(svg?instance.getLeft():node.left());
                            }
                            if((t=cssPos.top) && !(prop.top=='auto'&&Math.round(parseFloat(prop.bottom))>=0)){
                                node.topBy(t);
                                prop.top = t = profile.$forceu(svg?instance.getTop():node.top());
                            }
                            if(profile.onMove && (l!==null||t!==null))
                                instance.onMove(profile,l,t,null,null);
                        }
                        return false;
                    };
                    update.profile = o;

                    o.$resizer = target.addResizer(args, update);

                    o.$resizer.get(0).$parentUIProfile=o;
                    
                    // hide resizer
                    if(d.visibility=='hidden'){
                        o.$resizer.hide();
                    }
                });
            },
            _unResizer:function(){
                return this.each(function(o){
                    var target = o.getSubNode('BORDER');
                    if(!target.$getResizer())return;
                    target.removeResizer();
                    delete o.$resizer;
                });
            }
        },function(o,i){
            xui.UI.Widget.plugIn(i,o);
        });
        xui.UI.Widget.setDataModel({
            resizer:{
                ini:false,
                action: function(v){
                    var b=this.boxing();
                    if(v){
                        var t = this.properties,
                            arg={};
                        xui.each('minHeight,minWidth,maxHeight,maxWidth'.split(','),function(i){
                            if(i in t)arg[i]=t[i];
                        });
                        
                        if(t.resizerProp && !xui.isEmpty(t.resizerProp)){
                            xui.merge(arg,t.resizerProp,'all');
                        }
                        if(t.tagVar.resizerProp){
                            xui.merge(arg,t.tagVar.resizerProp,'all');
                        }
                        b._resizer(v,arg);
                    }else
                        b._unResizer();
                }
            },
            resizerProp:{
                ini:{}
            }
        });
    },
    Static:{
        Templates:{
            tagName:'div',
            className:'{_disabled}',
            style:'{_style};'
        },
        Appearances:{
            KEY:{
                position:'absolute',
                margin:'0 -1px -1px 0',
                visibility: 'visible',

                //for ie
                background: (xui.browser.ie&&!xui.browser.newie)?('url('+xui.ini.img_bg+')'):'',
                /*for get top Index, when it's static*/
                'z-index':60,
                cursor:'move'
            },
            "KEY.disabled":{
                background: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 200 200'><rect x='0' y='0' width='200' height='200' stroke='black' fill='transparent' stroke-width='1'></rect><path d='M200 0 L0 200 ' stroke='black' stroke-width='1'/><path d='M0 0 L200 200 ' stroke='black' stroke-width='1'/></svg>\")",
                'background-repeat':'no-repeat',
                'background-position':'center center',
                'background-size':'100% 100%, auto',
                'background-color':'#bbb',
                 opacity: '0.3'
            },
            "KEY.disabled.active":{
                'background-color':'#eee'
            },
            "KEY.disabled div":{
                display:'none'
            },
            MOVE:{
                position:'absolute',
                display:'block',
                'z-index':100,
                visibility: 'visible'
            },
            'CONF1, CONF2, ROTATE':{
                position:'absolute',
                display:'block',
                'z-index':100,
                visibility: 'visible',
                cursor:'pointer'
            },
             HANDLER:{
                $order:0,
                position:'absolute',
                display:'block',
                border:'solid 1px',
                'z-index':100,
                visibility: 'visible'
            },
            T:{
               $order:1,
               left:'50%',
               cursor: 'n-resize'
            },
            RT:{
               $order:1,
               cursor: 'ne-resize',
               'z-index': 110
            },
            R:{
               $order:1,
               top:'50%',
               cursor: 'e-resize'
            },
            RB:{
               $order:1,
                cursor: 'se-resize',
                'z-index': 110
            },
            B:{
               $order:1,
                left:'50%',
                cursor: 's-resize'
            },
            LB:{
               $order:1,
                cursor: 'sw-resize',
                'z-index': 110
            },
            L:{
               $order:1,
                top:'50%',
                cursor: 'w-resize'
            },
            LT:{
               $order:1,
                cursor: 'nw-resize',
                'z-index': 110
            },
            //must after HANDLER
            HIDDEN:{
                $order:10,
                'background-color':'transparent',
                'border-width': 0
            }
        },
        Behaviors:{
            beforeMousedown:function(profile, e, src){
                profile.box._onMousedown(profile, e, src, "move");
            },
            onDragbegin:function(profile, e, src){
                profile.box._onDragbegin(profile, e, src,"move");
            },
            onDrag:function(profile, e, src){
                profile.box._onDrag(profile, e, src, "move");
            },
            onDragstop:function(profile, e, src){
                profile.box._onDragstop(profile, e, src, "move");
            },
            onDblclick:function(profile, e, src){
                if(profile.onDblclick)profile.boxing().onDblclick(profile, e, src);
            },
            CONF1:{
                onMouseover:function(profile, e, src){
                    if(profile.properties.disabled)return false;
                    if(profile.onConfig)
                        return profile.boxing().onConfig(profile,e,src, 'left','mouseover');
                    return false;
                },
                onMousedown:function(profile, e, src){
                    if(profile.properties.disabled)return false;
                    if(profile.onConfig)
                        return profile.boxing().onConfig(profile,e,src,'left','mousedown');
                    return false;
                },
                onClick:function(profile,e,src){
                    if(profile.properties.disabled)return false;
                    if(profile.onConfig)
                        return profile.boxing().onConfig(profile,e,src,'left','click');
                    return false;
                }
            },
            CONF2:{
                onMouseover:function(profile, e, src){
                    if(profile.properties.disabled)return false;
                    if(profile.onConfig)
                        return profile.boxing().onConfig(profile,e,src,'right','mouseover');
                    return false;
                },
                onMousedown:function(profile, e, src){
                    if(profile.properties.disabled)return false;
                    if(profile.onConfig)
                        return profile.boxing().onConfig(profile,e,src,'right','mousedown');
                    return false;
                },
                onClick:function(profile,e,src){
                    if(profile.properties.disabled)return false;
                    if(profile.onConfig)
                        return profile.boxing().onConfig(profile,e,src,'right','click');
                    return false;
                }
            },
            ROTATE:{
                beforeMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src, "rotate");
                    return false;
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src, "rotate");
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src, "rotate");
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src, "rotate");
                } 
            },
            LT:{
                beforeMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src,'nw');
                    return false;
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src,'nw');
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src, 'nw');
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src, 'nw');
                }
            },
            RT:{
                beforeMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src, 'ne');
                    return false;
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src, 'ne');
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src, 'ne');
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src, 'ne');
                }
            },
            LB:{
                beforeMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src, 'sw');
                    return false;
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src, 'sw');
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src, 'sw');
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src, 'sw');
                }
            },
            RB:{
                beforeMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src, 'se');
                    return false;
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src,'se');
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src, 'se');
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src, 'se');
                }
            },
            L:{
                beforeMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src, 'w');
                    return false;
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src,'w');
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src,'w');
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src,'w');
                }
            },
            T:{
                beforeMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src,'n');
                    return false;
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src,'n');
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src,'n');
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src,'n');
                }
            },
            R:{
                beforeMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src,'e');
                    return false;
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src,'e');
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src,'e');
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src,'e');
                }
            },
            B:{
                beforeMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src,'s');
                    return false;
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src,'s');
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src,'s');
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src,'s');
                }
            }
        },
        DataModel:{
            // attached to a dom node for resizer function.
            _attached:false,

//<< can be used in addResizer({*})
            // handler visible?
            forceVisible:false,
            // movable
            forceMovable:'',

            // only show right/bottom handlers
            singleDir:false,
            // can change width
            vertical :true,
            // can chang height
            horizontal :true,

            minHeight: 12,
            minWidth: 12,
            maxHeight: 5000,
            maxWidth: 5000,

            // with px (base: 1em=12px)
            handlerSize:4,
            handlerOffset:0,

            disabled:{
                ini:false,
                action:function(v){
                     if(v)this.getRoot().addClass("disabled");
                     else this.getRoot().removeClass("disabled");
                }
            },
            leftConfigBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('CONF1').css('display',v?'':'none');
                }
            },
            rightConfigBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('CONF2').css('display',v?'':'none');
                }
            },
            rotatable:{
                ini:false,
                action:function(v){
                    if(v && xui.browser.ie&&xui.browser.ver<=8)
                        v = false;
                    this.getSubNode('ROTATE').css('display',v?'':'none');
                }
            },
//>>

            left: 100,
            top: 100,
            height: 100,
            width: 100,
            position:'absolute',
            display:'block'
        },
        EventHandlers:{
            onDblclick:function(profile, e, src){},
            onUpdate:function(profile, target, size, cssPos, rotate){},
            onChange:function(profile, proxy){},
            onConfig:function(profile, e, src,pos,type){}
        },
        _dynamicTemplate:function(profile){
            var pro = profile.properties,size,pos,temp,
                hash = profile._exhash =
                    "$" +
                    '_attached:' + pro._attached + ';' +
                    'forceVisible:' + pro.forceVisible + ';' +
                    'singleDir:' + pro.singleDir + ';' +
                    'vertical:' + pro.vertical + ';' +
                    'horizontal:' + pro.horizontal + ';' +
                    'forceMovable:' + pro.forceMovable + ';'
            ;

            var map= arguments.callee.map || (arguments.callee.map={
                //move icon size 13*13
                MOVE: {tagName:'div', className:'xuifont',$fonticon:'xui-icon-dragmove', style:'top:50%;left:50%;margin-left:-0.5em;margin-top:-0.5em;'},
                CONF1:{tagName:'div', className:'xuifont',$fonticon:'xui-icon-star', style:'top:0em;left:-1em;{_leftCofigBtn};'},
                CONF2:{tagName:'div', className:'xuifont',$fonticon:'xui-icon-dropdown', style:'top:0em;left:auto;right:-1em;{_rightCofigBtn};'},
                ROTATE:{tagName:'div', className:'xuifont',$fonticon:'xui-icon-circle', style:'top:-1.25em;left:50%;margin-left:-0.5em;{_rotateBtn};'},
                T:{tagName:'div', style:'top:-{_extend};margin-left:-{_extend};width:{_handlerSize};height:{_handlerSize};'},
                RT:{tagName:'div', style:'top:-{_extend};right:-{_extend};width:{_handlerSize};height:{_handlerSize};'},
                R:{tagName:'div', style:'right:-{_extend};margin-top:-{_extend};width:{_handlerSize};height:{_handlerSize};'},
                RB:{tagName:'div', style:'bottom:-{_extend};right:-{_extend};width:{_handlerSize};height:{_handlerSize};'},
                B:{tagName:'div', style:'bottom:-{_extend};margin-left:-{_extend};width:{_handlerSize};height:{_handlerSize};'},
                LB:{tagName:'div',style:'bottom:-{_extend};left:-{_extend};width:{_handlerSize};height:{_handlerSize};'},
                L:{tagName:'div', style:'left:-{_extend};margin-top:-{_extend};width:{_handlerSize};height:{_handlerSize};'},
                LT:{tagName:'div', style:'left:-{_extend};top:-{_extend};width:{_handlerSize};height:{_handlerSize};'},
                cover:{
                    T:{tagName:'div', style:'width:100%;left:0em;top:-{_extend};height:{_handlerSize};'},
                    RT:{tagName:'div', style:'top:-{_extend};right:-{_extend};width:{_handlerSize};height:{_handlerSize};'},
                    R:{tagName:'div', style:'height:100%;top:0em;right:-{_extend};width:{_handlerSize};' },
                    RB:{tagName:'div', style:'right:-{_extend};bottom:-{_extend};width:{_handlerSize};height:{_handlerSize};'},
                    B:{tagName:'div', style:'width:100%;left:0em;bottom:-{_extend};height:{_handlerSize};'},
                    LB:{tagName:'div', style:'left:-{_extend};bottom:-{_extend};width:{_handlerSize};height:{_handlerSize};'},
                    L:{tagName:'div', style:'height:100%;top:0em;left:-{_extend};width:{_handlerSize};' },
                    LT:{tagName:'div', style:'top:-{_extend};left:-{_extend};width:{_handlerSize};height:{_handlerSize};'}
                }
            });

            /* dynamic template set here
                template._id is main id, which can input by create arg
                template._did is sub id, which must be built on fly, and cached
            */
            var template = profile.box.getTemplate(hash);
            // set template dynamic
            if(!template){
                var t,n;
                template = xui.clone(profile.box.getTemplate());

                // cover or not?
                t = pro._cover?map.cover:map;
                // can move?
                if(pro._move)template.MOVE = map.MOVE;

                template.CONF1 = map.CONF1;
                template.CONF2 = map.CONF2;
                template.ROTATE = map.ROTATE;

                // change height only
                if(pro.vertical){
                    if(!pro.singleDir)
                        template.T = t.T;
                    template.B = t.B;
                }
                // change width only
                if(pro.horizontal){
                    if(!pro.singleDir)
                        template.L = t.L;
                    template.R = t.R;
                    // change height and width
                    if(pro.vertical){
                        if(!pro.singleDir){
                            template.LB = t.LB;
                            template.RT = t.RT;
                            template.LT = t.LT;
                        }
                        template.RB = t.RB;
                    }
                }

                n = profile.getClass('KEY', '-handler') + " ";
                if(t=template.T)t.className = n;
                if(t=template.RT)t.className = n;
                if(t=template.R)t.className = n;
                if(t=template.RB)t.className = n;
                if(t=template.B)t.className = n;
                if(t=template.LB)t.className = n;
                if(t=template.L)t.className = n;
                if(t=template.LT)t.className = n;

                // if hidden
                if(!pro._visible){
                    n = profile.getClass('KEY', '-hidden') + " ";
                    if(t=template.T)t.className += n;
                    if(t=template.RT)t.className += n;
                    if(t=template.R)t.className += n;
                    if(t=template.RB)t.className += n;
                    if(t=template.B)t.className += n;
                    if(t=template.LB)t.className += n;
                    if(t=template.L)t.className += n;
                    if(t=template.LT)t.className += n;

                }
                // set template
                profile.box.setTemplate(template, hash);
            }
            profile.template = template;
        },
        _prepareData:function(profile){
            var t = profile.properties, 
                css=xui.CSS;
            //default is true
            t._visible=true;
            t._cover=false;
            t._move=true;
            // for _attached type
            if(t._attached){
                t._visible=false;
                t._cover=true;
                t._move=false;

                t.position = 'static';
                t.display = 'inline';
                t.left = t.top = t.width = t.height = 0;
            }
            if(t.forceVisible){
                t._visible=true;
                t._cover=false;
            }
            if(typeof t.forceMovable=="boolean")
                t._move=t.forceMovable;

            t.extend =  (parseFloat(t.handlerSize)||0)/2 + (parseFloat(t.handlerOffset)||0);
            t._handlerSize =  css.$em(t.handlerSize)+'em';
            t._extend =  css.$em(t.extend)+'em';

            t._leftCofigBtn = t.leftConfigBtn?'':'display:none';       
            t._rightCofigBtn = t.rightConfigBtn?'':'display:none';
            
            var r=t.rotatable;
            if(r && xui.browser.ie&&xui.browser.ver<=8)
                r=false;
            t._rotateBtn = r?'':'display:none';
            t._disabled = t.disabled?"disabled":"";
            return arguments.callee.upper.call(this, profile);
        },
        RenderTrigger:function(){
            var self=this;
            xui.setNodeData(self.renderId,'zIndexIgnore',1);
            self.box._tryCursors(self);
        },
        _onUpdate:function(profile, target, size, cssPos, rotate){
            if(target){
                if(size)target.widthBy(size.width,true).heightBy(size.height,true);
                if(cssPos){
                    var t=target.get(0).style;
                    if(t.left=='auto'&&(Math.round(parseFloat(t.right))>=0)){}else
                    target.leftBy(cssPos.left)
                    if(t.top=='auto'&&(Math.round(parseFloat(t.bottom))>=0)){}else
                    target.topBy(cssPos.top);
                }
                if(xui.isDefined(rotate)){
                    target.rotate(rotate);
                }
            }
        },
        //
        _switchAxis : function (axis, angle, dir4) {
            var a = (angle + 360 ) % 360,
                axisArray = ["n", "ne", "e", "se", "s", "sw", "w", "nw"],
                // 0 .. 7
                octant = Math.round(a /45),
                oindex = xui.arr.indexOf(axisArray, axis),
                index = oindex + octant,
                naxis = axisArray[index % 8];
            if(dir4 && index%2 == 1){
                if(a < octant*45){
                    naxis = axisArray[(index-1) % 8];
                }else{
                    naxis = axisArray[(index+1) % 8];
                }
            }
            return naxis;
        },
        _tryCursors : function(profile){
               var a = (profile.getRoot().rotate() + 360 ) % 360,
                    f = this._switchAxis,
                    hash = {T:"n", RT:"ne", R:"e", RB:"se", B:"s", LB:"sw", L:"w", LT:"nw"},n;
                xui.each(hash,function(k,i){
                    if((n=profile.getSubNode(i)).get(0)){
                        n.css('cursor', f(k, a)+"-resize");
                    }
                });
        },
        _getDDParas:function(angle, axis, switched){
            switch(axis){
            case "move":
                return {move:true};
            case "rotate":
                return {rotate:true};
            case "nw":
                return {left:true, top:true};
            case "ne":
                return {right:true, top:true};
            case "sw":
                return {left:true, bottom:true};
            case "se":
                return {right:true, bottom:true};
            case "w":
                return {left:true};
            case "n":
                return {top:true};
            case "e":
                return {right:true};
            case "s":
                return  {bottom:true};
            }
        },
        _onMousedown:function(profile, e, src, axis){
            if(profile.properties.disabled)return false;

            var ddparas=this._getDDParas(0, axis);
            if(xui.Event.getBtn(e)!="left")return;
            var puip=profile.$parentUIProfile;
            if(puip && puip['xui.UIProfile'] && puip.beforeResizerDrag && false=== xui.tryF(puip.beforeResizerDrag,[puip,profile,ddparas],puip.boxing()))
                return;

            var pos=xui.Event.getPos(e);
            xui.use(src).startDrag(e,{
                dragDefer:2,
                targetReposition:false,
                dragType:'blank',
                dragCursor:true,
                targetLeft:pos.left,
                targetTop:pos.top
            });
        },
        _onDragbegin:function(profile, e, src, axis){
            var prop=profile.properties,
                rotatable = prop.rotatable,
                //set target to specific target
                //or, set target to resizer
                o = profile.properties._attached?profile._target:xui([profile.renderId]),
                w = o.width(),
                h = o.height(),
                pos = o.offset(),
                rotate;
            if(rotatable){
                rotate = o.rotate();
                if(o.get(0).getBoundingClientRect){
                    var rect = o.get(0).getBoundingClientRect();
                    profile.o_center = {
                        x : (rect.right + rect.left)/2,
                        y : (rect.bottom + rect.top)/2
                    };
                }else{
                    profile.o_center = {
                        x : pos.left +  w/2,
                        y : pos.top + w/2
                    };
                }
            }

            if(profile.properties._attached){
                //custom proxy
                profile.proxy = xui.Dom.getEmptyDiv();
                profile.proxy
                    .html(' ',false)
                    .css({border:'1px dashed',visibility:'visible',position:'absolute'})
                    .offset(pos)
                    .width(w)
                    .height(h)
                    .css('zIndex',xui.Dom.TOP_ZINDEX+20);
                if(rotate)
                    profile.proxy.rotate(rotate);
            }else
                //set proxy to itself
                profile.proxy = o;


            //get current w h from target
            profile.o_w2 =profile.o_w =w;
            profile.o_h2 =profile.o_h = h;
            //get pos for target and proxy
            profile.o_pos = profile.proxy.cssPos();
            profile.o_size = {width:w, height:h};
            profile.o_rotate = rotate;
            if(profile.regions){
                profile.o_regions=[];
                profile.regions.each(function(n){
                    profile.o_regions.push(xui(n).cssSize());
                });
            }

            profile.$onDrag = true;
        },
        _onDrag:function(profile, e, src, axis){
            var args=this._getDDParas(profile.o_rotate, axis);

            //get dragdop off set
            profile.oos = profile.oos ||{};
            var dd = xui.DragDrop.getProfile(),
                t=profile.properties,
                elemAngle = profile.o_rotate,
                cs = profile.o_size, 
                sp = profile.o_pos,    
                os = dd.offset,
                dx = os.x,
                dy = os.y,
                x,y,w,h,rotate,
                data={};

            // no move
            if(dx===0 && dy===0)return;
            // for rotate
            if(elemAngle && !(args.move || args.rotate)){
                var adjustAngle = function(a){return (a + 360 ) % 360;},
                    distance = Math.pow(Math.pow(dx, 2)+ Math.pow(dy,2),.5),
                    mouseAngle = adjustAngle(Math.atan2(dx, -dy) * 180 /Math.PI),
                    offAngle = elemAngle  + 90 - mouseAngle,
                    flagX = (adjustAngle(mouseAngle - elemAngle) <  180) ? 1 : -1,
                    flagY = (adjustAngle(mouseAngle - elemAngle) < 90 || adjustAngle(mouseAngle - elemAngle) > 270) ? -1 : 1;

                dx = distance * Math.abs(Math.cos(offAngle * Math.PI/180)) * flagX;
                dy = distance * Math.abs(Math.sin(offAngle* Math.PI/180)) * flagY;
            } 
            // no data
            if(dx == profile.oos.width && dy == profile.oos.height)return;
            profile.oos={width:dx, height:dy};

            // pos and size
            if(args.left){
                // width of proxy
                w = profile.o_w - dx;
                // left of proxy
                x = sp.left + dx;
                if(w<t.minWidth){
                    w=t.minWidth;
                    x = profile.o_w+sp.left - w;
                }else if(w>t.maxWidth){
                    w=t.maxWidth;
                    x= profile.o_w+sp.left - w;
                }
                xui.merge(data,{width:w,left:x});
            }else if(args.right){
                w = profile.o_w + dx;
                if(w<t.minWidth)w=t.minWidth;
                else if(w>t.maxWidth)w=t.maxWidth;
                xui.merge(data,{width:w});
            }
            if(args.top){
                h = profile.o_h - dy;
                y = sp.top + dy;
                if(h<t.minHeight){
                    h=t.minHeight;
                    y=profile.o_h+sp.top - h;
                }else if(h>t.maxHeight){
                    h=t.maxHeight;
                    y=profile.o_h+sp.top - h;
                }
                xui.merge(data,{height:h,top:y});
            }else if(args.bottom){
                h= profile.o_h + dy;
                if(h<t.minHeight)h=t.minHeight;
                else if(h>t.maxHeight)h=t.maxHeight;
                xui.merge(data,{height:h});
            }

            if(elemAngle && !(args.move || args.rotate)){
                delete data.left;
                delete data.top;

               var xRate = Math.abs (Math.cos(elemAngle * Math.PI/180)),
                    yRate = Math.abs(Math.sin(elemAngle * Math.PI/180)),
                    // old bbox
                    oldBBoxCX = sp.left + cs.width/2,
                    oldBBoxCY = sp.top + cs.height/2,
                    oldBboxW = cs.width * xRate + cs.height * yRate,
                    oldBboxH = cs.width * yRate + cs.height * xRate,
                    oldBboxL = oldBBoxCX - oldBboxW/2,
                    oldBboxT = oldBBoxCY - oldBboxH/2,
                    
                    // new bbox
                    newBboxCX = (data.left||sp.left) +  (data.width||cs.width)/2,
                    newBboxCY = (data.top||sp.top) +  (data.height||cs.height)/2,
                    newBboxW = (data.width||cs.width) * xRate + (data.height||cs.height) * yRate,
                    newBboxH = (data.width||cs.width) * yRate + (data.height||cs.height) * xRate,
                    newBboxL = newBboxCX - newBboxW/2,
                    newBboxT = newBboxCY - newBboxH/2,
                    offW = (newBboxW-oldBboxW)/2,
                    offH =  (newBboxH-oldBboxH)/2,
                    //two original points offset
                    offCX =  newBboxCX - oldBBoxCX,
                    offCY =  newBboxCY - oldBBoxCY;

                //Alignment by origin point
                data.left =  sp.left - offCX;
                data.top =  sp.top - offCY;

                // find the direction
                var naxis = this._switchAxis (axis, elemAngle,true);

                switch(naxis){
                    case "e":
                        if(elemAngle < 90 ){
                            data.top -= ((data.height||cs.height)*xRate - newBboxH/2) - (cs.height* xRate - oldBboxH/2);
                        }else if(elemAngle > 90 && (elemAngle < 180)){
                            data.top -= ((data.width||cs.width)*yRate - newBboxH/2) - (cs.width* yRate - oldBboxH/2);
                        }else if(elemAngle > 180 && (elemAngle < 270)){
                            data.top += ((data.width||cs.width)*yRate - newBboxH/2) - (cs.width* yRate - oldBboxH/2);
                        }else{
                            data.top += ((data.height||cs.height)*xRate - newBboxH/2) - (cs.height* xRate - oldBboxH/2);
                        }
                        data.left += offW;
                        break;
                    case "s":
                        if(elemAngle < 90 ){
                            data.left -= ((data.height||cs.height)*yRate - newBboxW/2) - (cs.height* yRate - oldBboxW/2);
                        }else if(elemAngle > 90 && (elemAngle < 180)){
                            data.left -= ((data.width||cs.width)*xRate - newBboxW/2) - (cs.width* xRate - oldBboxW/2);
                        }else if(elemAngle > 180 && (elemAngle < 270)){
                            data.left += ((data.width||cs.width)*xRate - newBboxW/2) - (cs.width* xRate - oldBboxW/2);
                        }else{
                            data.left += ((data.height||cs.height)*yRate - newBboxW/2) - (cs.height* yRate - oldBboxW/2);
                        }
                        data.top += offH;
                        break;
                    case "w":
                        if(elemAngle < 90 ){
                            data.top += ((data.height||cs.height)*xRate - newBboxH/2) - (cs.height* xRate - oldBboxH/2);
                        }else if(elemAngle > 90 && (elemAngle < 180)){
                            data.top += ((data.width||cs.width)*yRate - newBboxH/2) - (cs.width* yRate - oldBboxH/2);
                        }else if(elemAngle > 180 && (elemAngle < 270)){
                            data.top -= ((data.width||cs.width)*yRate - newBboxH/2) - (cs.width* yRate - oldBboxH/2);
                        }else{
                            data.top -= ((data.height||cs.height)*xRate - newBboxH/2) - (cs.height* xRate - oldBboxH/2);
                        }
                        data.left -= offW;
                        break;
                    case "n":
                        if(elemAngle < 90 ){
                            data.left += ((data.height||cs.height)*yRate - newBboxW/2) - (cs.height* yRate - oldBboxW/2);
                        }else if(elemAngle > 90 && (elemAngle < 180)){
                            data.left += ((data.width||cs.width)*xRate - newBboxW/2) - (cs.width* xRate - oldBboxW/2);
                        }else if(elemAngle > 180 && (elemAngle < 270)){
                            data.left -= ((data.width||cs.width)*xRate - newBboxW/2) - (cs.width* xRate - oldBboxW/2);
                        }else{
                            data.left -= ((data.height||cs.height)*yRate - newBboxW/2) - (cs.height* yRate - oldBboxW/2);
                        }
                        data.top -= offH;
                        break;
                }
            }
            // for inner region
            if(args.left || args.right){
                //resize inner region block
                if(profile.regions && "width" in data && data.width!==cs.width){
                    var offw=data.width-cs.width;
                    profile.regions.each(function(n,i){
                        xui(n).width(profile.o_regions[i].width + offw);
                    });
                }
            }

            if(args.top || args.bottom){
                //resize inner region block
                if(profile.regions && "height" in data && data.height!==cs.height){
                    var offh=data.height-cs.height;
                    profile.regions.each(function(n,i){
                        xui(n).height(profile.o_regions[i].height + offh);
                    });
                }
            }

            if(args.move){
                x = sp.left + dx;
                y = sp.top + dy;
                xui.merge(data,{top:y,left:x});
            }
            if(args.rotate){
                rotate =  (180 - Math.atan2( dd.x - profile.o_center.x, dd.y - profile.o_center.y ) * 180 / Math.PI );
                if(rotate<0)rotate+=360;
                xui.merge(data,{rotate:rotate});
            }
            
            if(!xui.isEmpty(data)){
                xui.each(data,function(o,i){
                    data[i]=Math.round(parseFloat(o))+'px';
                });
                profile.proxy.css(data);

                if(profile.onChange)
                    profile.boxing().onChange(profile,profile.proxy);
            }
        },
        _onDragstop:function(profile, e, src, axis){
            var cssSize, cssPos,
                offsize, offpos,
                rotate,
                cs = profile.o_size, 
                sp = profile.o_pos,    
                o = profile.proxy,
                args = this._getDDParas(profile.o_rotate, axis);

            if(!args.move && !args.rotate){
                cssSize = o.cssSize();
                offsize = {
                    width : cssSize.width - cs.width, 
                    height : cssSize.height - cs.height
                };
               if(offsize.width===0 && offsize.height===0)offsize=null;
            }
            
            cssPos = o.cssPos();
            offpos = {
                left : cssPos.left - sp.left,  
                top : cssPos.top - sp.top
            };
           if(offpos.left===0 && offpos.top===0)offpos=null;
            
            if(args.rotate)
                rotate=o.rotate();

            if(profile.onUpdate && false===profile.boxing().onUpdate(profile, profile._target, offsize, offpos, rotate)){}
            else{
                profile.box._onUpdate(profile, profile._target, offsize, offpos, rotate);
            }

            if(profile.properties._attached){
                if(xui.browser.ie6)profile._target.ieRemedy();
                profile.proxy.html('',false).css({visibility:'hidden',border:'none',zIndex:'0',width:'0',height:'0',rotate:0});
            }
            //profile.boxing().active();
            profile.$onDrag = false;
            delete profile.o_rotate;
            
            profile.box._tryCursors(profile);
        }
    }
});