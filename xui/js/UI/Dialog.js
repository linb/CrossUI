xui.Class("xui.UI.Dialog","xui.UI.Widget",{
    Instance:{
        showModal:function(parent, left, top, callback, ignoreEffects){
            this.show(parent, true, left, top, callback, ignoreEffects);
        },
        show:function(parent, modal, left, top, callback,ignoreEffects){
            parent = parent || xui('body');
            return this.each(function(profile){
                if(profile.inShowing)return;
                var t,
                    p=profile.properties,
                    us = xui.$us(profile),
                    ins = profile.boxing();
                // default to center dlg
                switch(p.initPos){
                    case 'auto':
                        // all in px
                       if(xui.isHash(left)){
                            top=left.top;
                            left=left.left;
                        }else{
                            top=(top||top===0)?top:profile.$px(p.top);
                            left=(left||left===0)?left:profile.$px(p.left);
                        }
                    break;
                    case 'center':
                        if(xui.isHash(left)){
                            top=left.top+(left.height-profile.$px(p.height))/2;
                            left=left.left+(left.width-profile.$px(p.width))/2;
                        }else{
                            var pr = parent.get(0)==xui('body').get(0)?xui.win:(parent['xui.UI']?parent.getRoot():parent),
                                scale =  pr == xui.win && xui.ini.$zoomScale || 1;
                            // here, have to use global em
                            top=(top||top===0)?top:Math.max(0,(pr.height()/scale-profile.$px(p.height))/2 + pr.scrollTop()/scale);
                            left=(left||left===0)?left:Math.max(0,(pr.width()/scale-profile.$px(p.width))/2 + pr.scrollLeft()/scale);
                        }
                    break;
                }
                if(left<0)left=0;
                if(top<0)top=0;

                if(p.status=='max'){
                    left=top=0;
                }

                var f1 = function(){
                    parent.append(ins);
                    var box=profile.box,
                        root=profile.getRoot(),
                        adjustunit = function(v,emRate){return profile.$forceu(v, us>0?'em':'px', emRate)};
                    
                    if(p.iframeAutoLoad||p.ajaxAutoLoad)
                        xui.UI.Div._applyAutoLoad(profile);

                    if((modal || p.modal) && !profile.$inModal)
                        box._modal(profile);
                        
                    ins.activate();
                    var tt=profile._$rs_args,fun=function(){
                        if(profile.onShow)profile.boxing().onShow(profile);                            
                        delete profile.inShowing;
                        delete profile.$inThread;
                        xui.tryF(callback);

                        // attention animation
                        if(p&&p.activeAnim){
                            xui.asyRun(function(){
                                if(profile && !profile.destroyed)
                                    ins.setActiveAnim(p.activeAnim, true);
                            });
                        }

                    };
                    if(p.status=='min')
                        box._min(profile,'normal', fun, true);
                    else if(p.status=='max')
                        box._max(profile,'normal', fun, ignoreEffects);
                    else{
                        // resize immidiately here, maybe max here
                        xui.UI.$doResize(profile, (tt&&tt[1])||p.width, (tt&&tt[2])||p.height);
                        root.show(left||left===0?adjustunit(left):null, top||top===0?adjustunit(top):null, fun,null,ignoreEffects);
                        box._refreshRegion(profile);
                    }
                };

                profile.inShowing=1;
                if(t=p.fromRegion)
                    profile.$inThread = xui.Dom.animate({border:'solid 1px #555',background:'#888',opacity:.1},{
                        left:[t.left,left],
                        top:[t.top,top],
                        width:[t.width, profile.$px(p.width)],
                        height:[t.height, profile.$px(p.height)]
                    }, null,f1,300,0,'expoIn').start();
                else
                    f1();
            });
        },
        hide:function(ignoreEffects){
            this.each(function(profile){
                var pro=profile.properties,
                    box=profile.box,
                    us = xui.$us(profile),
                    root=profile.getRoot();

                var fun=function(){
                    if(profile.inHiding)return;
                    profile.inHiding=1;
                    if(profile.$inModal)
                        box._unModal(profile);
                    //max has dock prop
                    if(pro.status=='max' || pro.status=='min'){
                        var os=pro.status;
                        box._restore(profile);
                        pro.status=os;
                    }
    
                    var t=pro.fromRegion, f1=function(){
                        delete profile.inHiding;
                        delete profile.$inThread;
                    };
                    if(t)
                        profile.$inThread = xui.Dom.animate({border:'solid 1px #555',background:'#888',opacity:.1},{
                            left:[profile.$px(pro.left),t.left],
                            top:[profile.$px(pro.top),t.top],
                            width:[profile.$px(pro.width),t.width],
                            height:[profile.$px(pro.height),t.height]
                        },  null, f1,300,0,'expoOut').start();
                    else
                        f1();
                };
                root.hide(fun,null,ignoreEffects);
            });
            return this;
        },
        close:function(triggerEvent,ignoreEffects){
            return this.each(function(profile){
                if(false!==triggerEvent && profile.beforeClose && false === profile.boxing().beforeClose(profile))
                    return;
                if(profile.inClosing)return;
                profile.inClosing=1;
                var pro=profile.properties, t=pro.fromRegion, fun=function(){
                    profile.boxing().destroy(ignoreEffects);
                    delete profile.inClosing;
                    delete profile.$inThread;
                };

                if(t)
                    profile.$inThread = xui.Dom.animate({
                        border:'solid 1px #555',
                        background:'#888',
                        opacity:.1
                    },{
                        left:[pro.left,t.left],
                        top:[pro.top,t.top],
                        width:[pro.width,t.width],
                        height:[pro.height,t.height]
                    }, null,fun,300,0,'expoOut').start();
                else
                    fun();
            });
        },
        activate:function(flag){
            var self=this, profile=this.get(0),ifocus;
            profile.box._active(profile,flag);
            this.getChildren(null,true).each(function(o){
                if(xui.get(o,['properties','defaultFocus'])){
                    try{xui.asyRun(function(){o.boxing().activate()})}catch(e){}
                    ifocus=1;
                    return false;
                }
            });
            xui.asyRun(function(){
                if(flag!==false && !ifocus){
                    try{profile.getSubNode('CAPTION').focus(true);}catch(e){}
                }
                if(self.onActivated)self.onActivated(profile);                        
            });
        },
        isPinned:function(){
            return !!xui.get(this.get(0),['properties','pinned']);
        }
    },
    Initialize:function(){
        var ns=this, t=ns.getTemplate();
        xui.merge(t.FRAME.BORDER,{
            tabindex: '{tabindex}',
            className: 'xui-uiborder-outset xui-uiborder-box xui-uiborder-radius-big',
            TABSTOP1:{$order:-1},
            TBAR:{
                tagName:'div',
                className:'xui-uibar-top',
                TBARTDL:{
                    className:'xui-uibar-tdl xui-uibar xui-uiborder-radius-big-tl',
                    TBARTDLT:{
                        className:'xui-uibar-tdlt'
                    }
                },
                TBARTDM:{
                    $order:1,
                    className:'xui-uibar-tdm xui-uibar',
                    TBARTDMT:{
                        className:'xui-uibar-tdmt'
                    }
                },
                TBARTDR:{
                    $order:2,
                    className:'xui-uibar-tdr xui-uibar xui-uiborder-radius-big-tr',
                    TBARTDRT:{
                        className:'xui-uibar-tdrt'
                    }
                },
                BARCMDL:{
                    $order:3,
                    tagName: 'div',
                    className:'xui-uibar-cmdl',
                    style:'{_align}',
                    RULER:{
                        className:'xui-ui-ruler'
                    },
                    LTAGCMDS:{
                        tagName:'span',
                        className:'xui-ltag-cmds',
                        style:'{_ltagDisplay}',
                        text:"{ltagCmds}"
                    },
                    ICON:{
                        $order:2,
                        className:'xuicon {imageClass}  {picClass}',
                        style:'{backgroundImage}{backgroundPosition}{backgroundSize}{backgroundRepeat}{iconFontSize}{imageDisplay}{iconStyle}',
                        text:'{iconFontCode}'
                    },
                    CAPTION:{
                        tabindex: '{tabindex}',
                        className:"xui-title-node",
                        text : '{caption}',
                        $order:3
                    }
                },
                BARCMDR:{
                    $order:4,
                    tagName: 'div',
                    className:'xui-uibar-cmdr',
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
                        $order:2
                    },
                    OPT:{
                        className:'xuicon',
                        $fonticon:'xui-uicmd-opt',
                        style:'{optDisplay}',
                        $order:3
                    },
                    PIN:{
                        $order:4,
                        className:'xuicon',
                        $fonticon:'xui-uicmd-pin',
                        style:'{pinDisplay}'
                    },
                    LAND:{
                        $order:5,
                        className:'xuicon',
                        $fonticon:'xui-uicmd-land',
                        style:'{landDisplay}'
                    },
                    REFRESH:{
                        className:'xuicon',
                        $fonticon:'xui-uicmd-refresh',
                        style:'{refreshDisplay}',
                        $order:6
                    },
                    MIN:{
                        $order:7,
                        className:'xuicon',
                        $fonticon:'xui-uicmd-min',
                        style:'{minDisplay}'
                    },
                    RESTORE:{
                        $order:8,
                        className:'xuicon',
                        $fonticon:'xui-uicmd-restore',
                        style:'display:none;'
                    },
                    MAX:{
                        $order:9,
                        className:'xuicon',
                        $fonticon:'xui-uicmd-max',
                        style:'{maxDisplay}'
                    },
                    CLOSE:{
                        $order:10,
                        className:'xuicon',
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
                className:'xui-uicon-main xui-uibar',
                MAINI:{
                    tagName:'div',
                    className:'xui-uicon-maini xui-uibar',
                    PANEL:{
                        tagName:'div',
                        style:"{_panelstyle};{_overflow};",
                        className:'xui-uibar xui-uicontainer',
                        text:'{html}'+xui.UI.$childTag
                    }
                }
            },
            BBAR:{
                $order:3,
                tagName:'div',
                className:'xui-uibar-bottom',
                BBARTDL:{
                    $order:1,
                    className:'xui-uibar-tdl xui-uibar xui-uiborder-radius-big-bl'
                },
                BBARTDM:{
                    $order:2,
                    className:'xui-uibar-tdm xui-uibar'
                },
                BBARTDR:{
                    $order:3,
                    className:'xui-uibar-tdr xui-uibar xui-uiborder-radius-big-br'
                }
            },
            TABSTOP2:{$order:9}
        },'all');
        t.$submap = xui.UI.$getTagCmdsTpl();

        ns.setTemplate(t);

        xui.alert=ns.alert;
        xui.confirm=ns.confirm;
        xui.pop=ns.pop;
        xui.prompt=ns.prompt;
    },
    Static:{
        Appearances:{
            KEY:{
                overflow:'visible'
            },
            'LTAGCMDS, RTAGCMDS':{
                padding:0,
                margin:0,
                'vertical-align': 'middle'
            },
            "TABSTOP1,TABSTOP2":{
                height:0,
                width:"16px",
                display:'inline',
                position:'absolute'
            },
            'TBART, BBART':{
                'border-spacing':0,
                'border-collapse':'separate'
            },
            MAINI:{
                'padding-top':'.16667em'
            },
            PANEL:{
                position:'relative',
                overflow:'auto'
            },
            CAPTION:{
                display:'inline',
                'vertical-align':xui.browser.ie6?'baseline':'middle'
            },
            BORDER:{
                position:'relative',
                outline:0
            }
        },
        Behaviors:{
            DroppableKeys:['PANEL'],
            PanelKeys:['PANEL'],
            DraggableKeys:['LAND'],
            NoDraggableKeys:['LAND','MIN','MAX','RESTORE','PIN','INFO','OPT','CLOSE','REFRESH','CMD'],
            HoverEffected:{LAND:'LAND',MIN:'MIN',MAX:'MAX',RESTORE:'RESTORE',PIN:'PIN',INFO:'INFO',OPT:'OPT', CLOSE:'CLOSE',REFRESH:'REFRESH',CMD:'CMD',ICON:'ICON'},
            ClickEffected:{LAND:'LAND',MIN:'MIN',MAX:'MAX',RESTORE:'RESTORE',PIN:'PIN',INFO:'INFO',OPT:'OPT', CLOSE:'CLOSE',REFRESH:'REFRESH',CMD:'CMD',ICON:'ICON'},
            onMousedown:function(profile, e){
                if(!profile.$inModal)
                    profile.box._active(profile);
            },
            afterKeydown:function(profile, e){
                var keys = xui.Event.getKey(e);
                if((e.$key || e.keyCode || e.charCode)==9){
                    // hack for ie tab event
                    if(xui.browser.ie){
                        var id="xui::_specialforietab";
                        if(!xui.Dom.byId(id))
                            xui('body').append("<div style='display:none;position:absolute;' id="+id+"></div>");
                        xui.Dom.byId(id).innerHTML=xui.stamp()+"";
                    }
                    var n1=profile.getSubNode("TABSTOP1").get(0),
                        n2=profile.getSubNode("TABSTOP2").get(0),
                        m=xui.Event.getSrc(e),t;
                    if(keys.shiftKey){
                        if(m!==n1)
                            n1.tabIndex = m.tabIndex;
                        n2.removeAttribute("tabIndex");
                    }else{
                        if(m!==n2)
                            n2.tabIndex = m.tabIndex;
                        n1.removeAttribute("tabIndex");
                    }
                    n1=n2=m=null;
                }
            },
            onDragstop:function(profile){
                var p = profile.properties,
                    us = xui.$us(profile),
                    root=profile.getRoot(),
                    pos = root.cssPos(),
                    l = null, t = null;

                if(profile.$px(p.left) !== pos.left)
                    p.left = l = profile.$forceu( pos.left,null);
                if(profile.$px(p.top) !== pos.top)
                    p.top = t = profile.$forceu( pos.top,null);

                root.cssPos({ left: l, top: t });

                if(profile.onMove && (l!==null||t!==null))
                    profile.boxing().onMove(profile,l,t,null,null);
            },
            TABSTOP1:{
                onFocus:function(profile,e,src){
                    var tabindex = parseInt(xui.use(src).get(0).tabIndex||1 +"",10)-1;
                    var children = profile.getRoot().get(0).getElementsByTagName('*'),t,n;
                    for(var i=0,l=children.length,o;o=children[i];i++){
                        if(o.nodeType==1){
                            //cant set tabIndex to zero
                            if(o.tabIndex && o.tabIndex<=tabindex){
                                if(!t)t=(n=o).tabIndex;
                                if(o.tabIndex>t)t=(n=o).tabIndex;
                                if(t===tabindex)break;
                            }
                        }
                    }
                    if(o){
                        xui(o).focus(true);
                        xui.use(src).get(0).tabIndex=o.tabIndex;
                    }
                    else{
                        o=profile.getRoot().nextFocus(false,true,false);
                        xui(o).focus(true);
                        xui.use(src).get(0).tabIndex=o.get(0).tabIndex;
                    }
                    children=o=null;
                }
            },
            TABSTOP2:{
                onFocus:function(profile,e,src){
                    var tabindex = parseInt(xui.use(src).get(0).tabIndex||1 +"")+1;
                    var children = profile.getRoot().get(0).getElementsByTagName('*'),t,n;
                    for(var i=0,l=children.length,o;o=children[i];i++){
                        if(o.nodeType==1){
                            //cant set tabIndex to zero
                            if(o.tabIndex && o.tabIndex>=tabindex){
                                if(!t)t=(n=o).tabIndex;
                                if(o.tabIndex<t)t=(n=o).tabIndex;
                                if(t===tabindex)break;
                            }
                        }
                    }
                    if(o){
                        xui(o).focus(true);
                        xui.use(src).get(0).tabIndex=o.tabIndex;
                    }
                    else{
                        o=profile.getRoot().nextFocus(true,true,false);
                        xui(o).focus(true);
                        xui.use(src).get(0).tabIndex=o.get(0).tabIndex;
                    }
                    children=o=null;
                }
            },
            TBAR:{
                beforeMousedown:function(profile, e, src){
                    if(profile.$inDesign)return;

                    if(xui.Event.getBtn(e)!="left")return;
                    if(profile.getKey(xui.Event.getSrc(e).parentNode.id)==profile.keys.BARCMDR)return;
                    if(profile.properties.status=="max")return false;

                    if(profile.properties.movable && !profile._locked){
                        profile.box._active(profile);
                        var root=profile.getRoot(),
                            region=root.cssRegion(),
                            pregion=root.parent().cssRegion(),
                            dist=profile.getEmSize();
                        root.startDrag(e, {
                            dragDefer:2,
                            maxLeftOffset:region.left,
                            maxRightOffset:pregion.width-region.left-dist,
                            maxTopOffset:region.top,
                            maxBottomOffset:pregion.height-region.top-dist,
                            magneticDistance:dist,
                            xMagneticLines:[0,pregion.width-region.width],
                            yMagneticLines:[0,pregion.height-region.height],
                            targetOffsetParent:root.parent()
                        });
                    }
                },
                onDblclick:function(profile, e, src){
                    if(profile.getKey(xui.Event.getSrc(e).parentNode.id)==profile.keys.BARCMDR)return;
                    if(!profile.properties.maxBtn)return;
                    if(profile.properties.status=='max')
                        profile.box._restore(profile);
                    else
                        profile.box._max(profile);
                }
            },
            PIN:{
                onClick:function(profile, e, src){
                    var key=profile.keys.PIN, t=profile.properties,ins=profile.boxing();
                    if( profile.beforePin && false === profile.boxing().beforePin(profile, t.pinned))
                        return;

                    //set pinned status
                    t.pinned = !t.pinned;
                    //set appea
                    profile.getSubNode('PIN').tagClass('-checked', t.pinned);
                    //set lock flag for not movable
                    profile._locked = t.pinned;

                    // add/remove resize
                    if(t.resizer){
                        if(!t.pinned){
                            // if not in min mode
                            if(t.status != 'min')
                                ins._resizer();
                        }else
                            if(profile.$resizer)
                                //profile.boxing().setResizer(false);
                                ins._unResizer();
                    }
                }
            },
            MIN:{
                onClick:function(profile, e, src){
                    profile.box._min(profile,null,null,true);
                }
            },
            MAX:{
                onClick:function(profile, e, src){
                    profile.box._max(profile,null,null,true);
                }
            },
            RESTORE:{
                onClick:function(profile, e, src){
                    profile.box._restore(profile);
                }
            },
            LAND:{
                onClick:function(profile, e, src){
                    profile.boxing().onLand(profile, e, src);
                }
            },
            PANEL:{
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return false;
                    if(profile.onClickPanel)
                        return profile.boxing().onClickPanel(profile, e, src);
                }
            },

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
            CLOSE:{
                onClick:function(profile, e, src){
                    profile.boxing().close();
                }
            },
            CMD:{
                onClick:function(profile,e,src){
                    var prop=profile.properties;
                    if(prop.disabled)return false;
                    if(profile.onCmd)
                        profile.boxing().onCmd(profile,xui.use(src).id().split('_')[1],e,src);
                    return false;
                }
            }
        },
        DataModel:{
            rotate:null,
            selectable:true,
            tips:null,
            border:null,
            disabled:null,
            dock:'none',
            showEffects:"Classic",
            hideEffects:"",
            initPos:{
                ini:'center',
                listbox:['auto','center']
            },
            iframeAutoLoad:{
                ini:"",
                action:function(){
                    xui.UI.Div._applyAutoLoad(this);
                }
            },
            ajaxAutoLoad:{
                ini:"",
                action:function(){
                    xui.UI.Div._applyAutoLoad(this);
                }
            },
            html:{
                html:1,
                action:function(v,ov,force){
                    this.getSubNode('PANEL').html(xui.adjustRes(v,0,1),null,null,force);
                }
            },
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
                action: function(v){
                    xui.UI.$iconAction(this);
                }
            },
            imagePos:{
                action: function(value){
                    this.getSubNode('ICON').css('backgroundPosition', value||'center');
                }
            },
            imageBgSize:{
                action: function(value){
                    this.getSubNode('ICON').css('backgroundSize', value||'');
                }
            },
            imageClass: {
                ini:'',
                action:function(v,ov){
                    xui.UI.$iconAction(this, 'ICON', ov);
                }
            },
            iconFontCode:{
                action:function(v){
                    xui.UI.$iconAction(this);
                }
            },
            // setCaption and getCaption
            shadow: true,
            resizer:true,
            movable: true ,

            minBtn:{
                ini:true,
                action:function(v){
                    var o = this.getSubNode('MIN');
                    if(v)
                        o.setInlineBlock();
                    else
                        o.css('display','none');
                }
            },
            maxBtn:{
                ini:true,
                action:function(v){
                    var o = this.getSubNode('MAX');
                    if(v)
                        o.setInlineBlock();
                    else
                        o.css('display','none');
                }
            },
            restoreBtn:{
                ini:true,
                action:function(v){
                    var o = this.getSubNode('RESTORE');
                    if(v)
                        o.setInlineBlock();
                    else
                        o.css('display','none');
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
            closeBtn:{
                ini:true,
                action:function(v){
                    var o = this.getSubNode('CLOSE');
                    if(v)
                        o.setInlineBlock();
                    else
                        o.css('display','none');
                }
            },
            refreshBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('REFRESH').css('display',v?'':'none');
                }
            },
            pinBtn:{
                ini:false,
                action:function(v){
                    var o = this.getSubNode('PIN');
                    if(v)
                        o.setInlineBlock();
                    else
                        o.css('display','none');
                }
            },
            landBtn:{
                ini:false,
                action:function(v){
                    var o = this.getSubNode('LAND');
                    if(v)
                        o.setInlineBlock();
                    else
                        o.css('display','none');
                }
            },
            width: {
                $spaceunit:1,
                ini:'25em'
            },
            height: {
                $spaceunit:1,
                ini:'25em'
            },
            minWidth : 200,
            minHeight : 100,

            position:'absolute',
            fromRegion:{
                hidden:true,
                ini:null
            },
            modal:{
                ini:false,
                action:function(v){
                    if(this.box){
                        if(v)this.box._modal(this);
                        else this.box._unModal(this);
                    }
                }
            },
            status:{
                ini:'normal',
                listbox:['normal','min','max'],
                action:function(v,o){
                    var self=this, b=self.box;
                    if(v=='min')b._min(self,o,null,true);
                    else if(v=='max')b._max(self,o,null,true);
                    else b._restore(self,o);
                }
            },
            hAlign:{
                ini:'left',
                listbox:['left','center','right'],
                action: function(v){
                    this.getSubNode("BARCMDL").css('textAlign',v);
                }
            },
            tagCmds:{
                ini:[],
                action:function(){
                    this.boxing().refresh();
                }
            },
            //hide props( with px)
            $hborder:1,
            $vborder:1
        },
        EventHandlers:{
            onIniPanelView:function(profile){},
            onShow:function(profile){},
            onActivated:function(profile){},
            beforePin:function(profile, value){},
            beforeStatusChanged:function(profile, oldStatus, newStatus){},
            afterStatusChanged:function(profile, oldStatus, newStatus){},
            onClickPanel:function(profile, e, src){},

            onLand:function(profile, e, src){},
            beforeClose:function(profile){},
            onShowInfo:function(profile, e, src){},
            onShowOptions:function(profile, e, src){},
            onRefresh:function(profile){},
            onCmd:function(profile,cmdkey,e,src){}
        },
        RenderTrigger:function(){
            var ns=this;
            ns.destroyTrigger = function(){
                var s=this;
                if(s.$inModal)s.box._unModal(s);
            };
        },
        LayoutTrigger:function(){
            var self=this, t=self.properties;
            // ensure modal
            if(t.modal){
                var p=self.$modalDiv&&self.$modalDiv.parent(),b=self.box;
                if(p&&p.get(0)&&p.get(0)!==self.getRootNode()){
                    b._unModal(self);
                }
                b._modal(self);
            }
        },
        _prepareData:function(profile){
            var data = arguments.callee.upper.call(this, profile),
                nodisplay='display:none';
            data.minDisplay = data.minBtn?'':nodisplay;
            data.maxDisplay = data.maxBtn?'':nodisplay;
            data.infoDisplay = data.infoBtn?'':nodisplay;
            data.optDisplay = data.optBtn?'':nodisplay;
            data.closeDisplay = data.closeBtn?'':nodisplay;
            data.pinDisplay = data.pinBtn?'':nodisplay;
            data.landDisplay = data.landBtn?'':nodisplay;
            data.refreshDisplay= data.refreshBtn?'':nodisplay;
            data._align = 'text-align:'+data.hAlign+';';

            var status=profile.properties.status;
            if(status=='min'||status=='max')
                profile.$noR=1;
            if(xui.isStr(data.overflow))
                data._overflow = data.overflow.indexOf(':')!=-1?(data.overflow):(data.overflow?("overflow:"+data.overflow):"");

            if(!xui.isEmpty(data.tagCmds))
                this._prepareCmds(profile, data);

            return data;
        },

        //ov from design mode
        _min:function(profile,status,effectcallback,ignoreEffects){
            var o=profile.getRoot(),
                box=profile.box,
                p=o.parent(),
                ins=profile.boxing(),
                t=profile.properties,
                a=xui.Dom._getEffects(t.showEffects,1);
            if(profile.$inThread)profile.$inThread.abort();
            if(!status)status=t.status;
            if(profile.beforeStatusChanged && false===profile.boxing().beforeStatusChanged(profile, 'min', status))
                return;

            // unMax
            if(status=='max')
                box._unMax(profile);
            // keep restore values
            else
                box._refreshRegion(profile);

            // hide those
            profile.getSubNodes(['PANEL','BBAR']).css('display','none');

            if(t.minBtn){
                // show restore button
                if(t.restoreBtn)
                profile.getSubNode('RESTORE').setInlineBlock();
                // hide min button
                profile.getSubNode('MIN').css('display','none');
            }

            // lockResize function
            if(t.resizer && profile.$resizer)
                ins._unResizer();

            //set it before resize
            t.status='min';

            var h1=o.height(),
                h2=profile.getSubNode('BORDER').height(),
                h=profile.getSubNode('TBAR').height();
            // resize
            o.cssSize({ width :t.minWidth, height :h+h1-h2},true);
            if(profile.afterStatusChanged)profile.boxing().afterStatusChanged (profile, 'min', status);
            
            if(a&&xui.browser.ie678)
                xui.filter(a.params,function(o,i){
                    return !!xui.Dom._cssfake[i];
                });
            o.show(null,null,effectcallback,null,ignoreEffects);
        },
        _max:function(profile,status,effectcallback,ignoreEffects){
            var o=profile.getRoot(),
                box=profile.box,
                ins=profile.boxing(),
                p=o.parent(),
                t=profile.properties,
                a=xui.Dom._getEffects(t.showEffects,1);
            if(!status)status=t.status;
            if(profile.$inThread)profile.$inThread.abort();
            
            if(profile.beforeStatusChanged && false===profile.boxing().beforeStatusChanged(profile, 'max', status))
                return;
            
            // if from normal status
            if(status=='min')
                //unset min
                box._unMin(profile);
            else
                box._refreshRegion(profile);

            // hide pin button
            if(t.pinBtn)
                profile.getSubNode('PIN').css('display','none');
            if(t.maxBtn){
                // hide max button
                profile.getSubNode('MAX').css('display','none');
                // show restore button
                if(t.restoreBtn)
                profile.getSubNode('RESTORE').setInlineBlock();
            }

            if(t.resizer && profile.$resizer)
                ins._unResizer(); 

            t.status='max';

            ins.setDock('cover',true);
            if(profile.afterStatusChanged)profile.boxing().afterStatusChanged (profile, 'max', status);
            if(a&&xui.browser.ie678)
                xui.filter(a.params,function(o,i){
                    return !!xui.Dom._cssfake[i];
                });
            o.show(null,null,effectcallback,null,ignoreEffects);
        },
        _restore:function(profile,status){
            var o=profile.getRoot(),
                box=profile.box,
                t=profile.properties;
            if(!status)status=t.status;
            t.status='normal';

            if(profile.beforeStatusChanged && false===profile.boxing().beforeStatusChanged(profile, 'normal', status))
                return;

            // if from max
            if(status=='max')box._unMax(profile);
            if(status=='min')box._unMin(profile);

            profile.getSubNode('BORDER').ieRemedy();

            // hide restore button
            profile.getSubNode('RESTORE').css('display','none');
        },
        _unMax:function(profile){
            var t=profile.properties,
                ins=profile.boxing();
            profile.getSubNode('MAX').setInlineBlock();
            if(t.pinBtn)
                profile.getSubNode('PIN').setInlineBlock();

            if(t.resizer && !t.pinned){
                    ins._resizer();
            }

            ins.setDock('none');

            // resize
            profile.adjustSize(true);
            if(profile.afterStatusChanged)profile.boxing().afterStatusChanged (profile, 'normal', status);
        },
        _unMin:function(profile){
            var t=profile.properties,
            ins=profile.boxing();
            profile.getSubNodes(['PANEL','BBAR']).css('display','block');
            profile.getSubNode('MIN').setInlineBlock();

            if(t.resizer && !t.pinned){
                    ins._resizer();
            }

            profile.getRoot().cssSize({width:t.width, height:t.height});
            // resize
            profile.adjustSize(true);
        },
        _active:function(profile,flag){
            var self=this;
            if(profile.$inDesign)return;

            if(flag!==false && xui.$cache.unique.activeWndId==profile.$xid)return;

            self._deActive();
            if(flag!==false){
                var o=xui(profile.domId),
                    //in ie, .children can't get the same thread added node(modal div,  here)
                    t1=o.topZindex(),
                    t2=parseInt(o.css('zIndex'),0);
                o.css('zIndex',t1>t2?t1:t2);

                profile.getSubNode('TBAR').tagClass('-focus');
                xui.$cache.unique.activeWndId = profile.$xid;
            }
        },
        _deActive:function(){
            var profile;
            if(profile=xui.UI._cache['$'+xui.$cache.unique.activeWndId])
                profile.getSubNode('TBAR').tagClass('-focus',false);
            delete xui.$cache.unique.activeWndId;
        },
        _modal:function(profile){
            var s=profile.getRoot(),temp,p=s.parent(),cover;
            if(!p.isEmpty()){
                if(!profile.$inModal){
                    cover = profile.$modalDiv;
                    if(!cover || !cover.get(0) || !cover.get(0).parentNode){
                        cover = profile.$modalDiv = xui.create("<div class='xui-cover xui-custom xui-cover-modal' style='left:0;top:0;position:absolute;overflow:hidden;display:block;z-index:0;'></div>");
                        cover.setSelectable(false);
                    }
                    p.append(cover);

                    // attach onresize event
                    if(p.get(0)===document.body || p.get(0)===document || p.get(0)===window) p=xui.win;

                    cover.css({
                        display:'block',width:Math.max(p.width(), p.scrollWidth())+'px',height:Math.max(p.height(), p.scrollHeight())+'px'
                    })
                    .onMousedown(function(){return profile.$inDesign?null:false})
                    .topZindex(true);

                    if(profile.$inDesign)cover.onClick(function(){s.onClick(true)});

                    p.onSize(function(node){
                        node=xui(node);
                        var w=node.width()+"px",h=node.height()+"px";
                        // set widht/height first
                        cover.css({width:w,height:h});
                        xui.asyRun(function(){
                            var w=Math.max(node.width(),node.scrollWidth())+"px",h=Math.max(node.height(),node.scrollHeight())+"px";
                            cover.css({width:w,height:h});
                        });
                    },"dialog:"+profile.serialId);
                    
                    var i=(parseInt(cover.css('zIndex'),10)||0)+1;
                    s.css('zIndex',i);

                    if(i>=xui.Dom.TOP_ZINDEX)
                        xui.Dom.TOP_ZINDEX =i+1;
                    /*
                    //bak dlg tabzindnex
                    var hash={},a=profile.getRoot().query('*',function(o){return o.tabIndex>0}).get();
                    for(var i=0,o;o=a[i++];){
                        (hash[o.tabIndex] = hash[o.tabIndex]||[]).push(o);
                        o.tabIndex=-1;
                    }
                    //save others tabzindex
                    var h = profile.$focusHash={}, b=xui('body').query('*',function(o){return o.tabIndex>0}).get();
                    for(var i=0,o;o=b[i++];){
                        (h[o.tabIndex] = h[o.tabIndex]||[]).push(o);
                        o.tabIndex=-1;
                    }
                    //restore dlg tabzindnex
                    for(var i in hash){
                        h=hash[i];
                        for(var j in h)
                            h[j].tabIndex=i;
                    }
                    xui.Event.pushTabOutTrigger(profile.renderId, function(src,tabindex){
                        tabindex = parseInt(tabindex||1 +"",10);
                        var children = xui.use(src).get(0).getElementsByTagName('*'),t,n;
                        for(var i=0,l=children.length,o;o=children[i];i++){
                            if(o.nodeType==1){
                                if(o.tabIndex>=tabindex){
                                    if(!t)t=(n=o).tabIndex;
                                    if(o.tabIndex<t)t=(n=o).tabIndex;
                                    if(t===tabindex)break;
                                }
                            }
                        }
                        if(o)xui(o).focus(true);
                        else profile.getRoot().nextFocus();

                        children=o=null;
                    });
                    */

                    profile.$inModal=true;
                    // avoid triggering the previously set trigger
                    p.setBlurTrigger(profile.$xid+"_anti", true, xui([cover.get(0),profile.getRootNode()]));
                }
            }
        },
        _unModal:function(profile){
            if(profile.$inModal){
                // detach onresize event
                var p=profile.$modalDiv.parent();
                if(p.get(0)===document.body || p.get(0)===document || p.get(0)===window)
                    p=xui.win;

                p.onSize(null, "dialog:"+profile.serialId);

                profile.getRoot().css('zIndex',0);
                
                profile.$modalDiv.css('display','none');
                var node=profile.getSubNode('BORDER');
                if(!node.isEmpty())
                    node.append(profile.$modalDiv);

                profile.$inModal=false;
                /*
                var hash=profile.$focusHash,h;
                for(var i in hash){
                    h=hash[i];
                    for(var j in h)
                        h[j].tabIndex=i;
                }
                xui.breakO(profile.$focusHash,2);
                xui.Event.popTabOutTrigger();
                */
                p.setBlurTrigger(profile.$xid+"_anti");
            }
        },
        _refreshRegion:function(profile){
            if(!profile.renderId) return;
            var prop=profile.properties, 
                root=profile.getRoot(),
                us=xui.$us(profile),
                adjustunit = function(v,emRate){return profile.$forceu(v, us>0?'em':'px', emRate)},
                nr=root.cssRegion();

            nr.left=adjustunit(nr.left);
            nr.top=adjustunit(nr.top);
            nr.width=adjustunit(nr.width);
            nr.height=adjustunit(nr.height);

            return xui.merge(prop, nr, function(o,i){return prop[i]!='auto'});
        },

        _adjust:function(dialog,caption, content, dftTilte, left, top){
            caption = xui.adjustRes(caption ||'');
            if(!xui.isSet(content)||content===""){
                content = caption;
                caption = dftTilte||"";
            }

            var node = dialog.$div.reBoxing(),
            ID='xui:temp:dialog',
            me=arguments.callee,
            w,h;

            if(!xui.Dom.byId(ID)){
                n2 = me._cache=node.clone(false);
                xui('body').append(n2);
                n2.css({overflow:'visible',position:'absolute',visibility:'visible',left:xui.Dom.HIDE_VALUE,top:xui.Dom.HIDE_VALUE})
                .id(ID,true);
            }
            var n2 = me._cache;
            n2.width('auto').height('auto');
            n2.html(content,false);
            var size = n2.cssSize();
            size.width+=10;
            size.height+=10;

            node.html(content);

            if(size.width>500){
                size.width=500;
                n2.width(500);
                size.height = n2.offsetHeight() + 10;
                n2.width('auto');
            }
            n2.html("",false);
            size.height += 10;
            if(size.height>400)size.height=400;
            if(size.width<150)size.width=150;
            if(size.height<30)size.height=30;

            node.cssSize(size).css('overflow','auto').show();

            var fs=dialog.getRoot()._getEmSize();
            w=size.width + fs*2;
            h=size.height + fs*7.5;
            dialog.setCaption(caption).setWidth(w).setHeight(h);
            return {width:w, height:h};
        },
        alert:function(title, content, onClose, btnCap, left, top, parent, subId, noCache){
            var me=arguments.callee, dialog;
            if(noCache || !(dialog=me.dialog) || !dialog.get(0) || (!dialog.get(0).renderId)){
                dialog = new xui.UI.Dialog({
                    overflow:'hidden',
                    minBtn:false,
                    maxBtn:false,
                    pinBtn:false,
                    resizer:false
                },{
                    beforeClose:function(){
                        xui.tryF(dialog._$onClose);
                        dialog._$onClose=null;
                        if(!noCache){
                            dialog.hide();
                            return false;
                        }
                    },
                    onHotKeydown:function(p,k){
                        if(k.key=='esc')
                            dialog.close();
                    }
                });

                var cmd = dialog.$cmd = new xui.UI.Div({
                    height:'2.5em',
                    dock:'bottom',
                    zIndex:10
                },null,null,null,{KEY:"text-align:center;padding-top:.5em"}),

                btn = dialog.$btn = new xui.UI.SButton({
                    position:'relative',
                    tabindex:1
                },
                {
                    onClick:function(){
                        dialog.close();
                    },
                    onHotKeydown:function(p,k){
                        if(k.key=='enter')
                            dialog.close();
                    }
                },null,null,{KEY:'margin:0 .5em'});
                cmd.append(btn);

                var div = dialog.$div = new xui.UI.Div({
                    left:10,
                    top:10
                });
                dialog.append(cmd).append(div).render();
                
                if(!noCache)
                    me.dialog = dialog;
            }
            dialog._$onClose=onClose;
            
            dialog.$btn.setCaption("&nbsp;&nbsp;"+(btnCap || xui.wrapRes('$inline.ok'))+"&nbsp;&nbsp;");

            var size=xui.UI.Dialog._adjust(dialog,title, content, "Alert");

            if(parent && parent["xui.UI"])parent=parent.getContainer(subId);
            if(!xui.isSet(parent))parent=xui('body');

            dialog.show(parent,true, left, top);
            xui.resetRun("dlg_focus:"+dialog.get(0).$xid,function(){
                dialog.$btn.activate();
            });
            return dialog;
        },
        confirm:function(title, caption, onYes, onNo, btnCapYes, btnCapNo, left, top, parent, subId, noCache){
            var me=arguments.callee, dialog;

            if(noCache || !(dialog=me.dialog) || !dialog.get(0) || (!dialog.get(0).renderId)){
                dialog = new xui.UI.Dialog({
                    overflow:'hidden',
                    minBtn:false,
                    maxBtn:false,
                    pinBtn:false,
                    resizer:false
                },{
                    beforeClose:function(){
                        if(!dialog._$_clicked)
                            xui.tryF(dialog._$onNo,['close']);
                        else
                            delete dialog._$_clicked;
                        dialog._$onYes=dialog._$onNo=null;
                        if(!noCache){
                            dialog.hide();
                            return false;
                        }
                    },
                    onHotKeydown:function(p,k){
                        if(k.key=='esc')
                            dialog.close();
                    }
                });

                var cmd = dialog.$cmd=new xui.UI.Div({
                    height:'2.5em',
                    dock:'bottom',
                    zIndex:10
                },null,null,null,{KEY:"text-align:center;padding-top:.5em"}),
                btn = dialog.$btn1 = new xui.UI.SButton({
                    tabindex:1,
                    position:'relative'
                },
                {
                    onClick:function(){
                        xui.tryF(dialog._$onYes,['yes']);
                        dialog._$_clicked=1;
                        dialog.close();
                    }
                },null,null,{KEY:'margin:0 .5em'});
                cmd.append(btn);

                btn = dialog.$btn2=new xui.UI.SButton({
                    tabindex:1,
                    position:'relative'
                },
                {
                    onClick:function(){
                        xui.tryF(dialog._$onNo,['no']);
                        dialog._$_clicked=1;
                        dialog.close();
                    }
                },null,null,{KEY:'margin:0 .5em'});
                cmd.append(btn);

                var div = dialog.$div=new xui.UI.Div({
                    left:10,
                    top:10
                });
                dialog.append(cmd).append(div).render();

                if(!noCache)
                    me.dialog = dialog;
            }
            dialog._$onYes=onYes;
            dialog._$onNo=onNo;
            delete dialog._$_clicked;
            dialog.$btn1.setCaption("&nbsp;&nbsp;"+(btnCapYes || xui.wrapRes('$inline.yes'))+"&nbsp;&nbsp;");
            dialog.$btn2.setCaption("&nbsp;&nbsp;"+(btnCapNo || xui.wrapRes('$inline.no'))+"&nbsp;&nbsp;");
            var size=xui.UI.Dialog._adjust(dialog, title, caption, "Confirm");

            if(parent && parent["xui.UI"])parent=parent.getContainer(subId);
            if(!xui.isSet(parent))parent=xui('body');

            dialog.show(parent, true, left, top);
            xui.resetRun("dlg_focus:"+dialog.get(0).$xid,function(){
                dialog.$btn2.activate();
            });
            return dialog;
        },
        pop:function(title, content, btnCap, left, top, parent, subId){
            var dialog = new xui.UI.Dialog({
                overflow:'hidden',
                minBtn:false,
                maxBtn:false,
                pinBtn:false,
                resizer:false
            },{
                onHotKeydown:function(p,k){
                    if(k.key=='esc')
                        dialog.close();
                }
            }),

            cmd = dialog.$cmd = new xui.UI.Div({
                    height:'2.5em',
                    dock:'bottom',
                    zIndex:10
                },null,null,null,{KEY:"text-align:center;padding-top:.5em"})
            .append( dialog.$btn = new xui.UI.SButton({
                caption: "&nbsp;&nbsp;"+(btnCap || '$inline.ok')+"&nbsp;&nbsp;",
                tabindex:1,
                position:'relative'
            },
            {
                onClick:function(){
                    dialog.destroy();
                },
                onHotKeydown:function(p,k){
                    if(k.key=='enter')
                        dialog.close();
                }
            },null,null,{KEY:'margin:0 .5em'})),

            div = dialog.$div = new xui.UI.Div({
                left:10,
                top:10,
                width:'7em'
            }).setCustomStyle({
                KEY:'overflow:visible'
            });

            dialog.append(cmd).append(div).render();

            var size=xui.UI.Dialog._adjust(dialog, title, content, "Message");

            if(parent && parent["xui.UI"])parent=parent.getContainer(subId);
            if(!xui.isSet(parent))parent=xui('body');

            dialog.show(parent,false,left, top);

            xui.resetRun("dlg_focus:"+dialog.get(0).$xid,function(){
                dialog.$btn.activate();
            });
            return dialog;
        },
        prompt:function(title, caption, content, onYes, onNo, btnCapYes, btnCapNo, left, top, parent, subId, noCache){
            var dialog,
                me=arguments.callee;
            if(noCache || !(dialog=me.dialog) || !dialog.get(0) || (!dialog.get(0).renderId)){
                dialog = new xui.UI.Dialog({
                    overflow:'hidden',
                    minBtn:false,
                    maxBtn:false,
                    pinBtn:false,
                    left:left||200,
                    top:top||200,
                    width:'25em',
                    height:'11em',
                    conDockPadding:{left:'.5em',right:'.5em',top:0,bottom:0}
                },{
                    beforeClose:function(){
                        if(!dialog._$_clickYes)
                        xui.tryF(dialog._$onNo,["no"]);
                        else
                            delete dialog._$_clickYes;

                        dialog._$input.setValue('',false,'prompt');
                        dialog._$onYes=dialog._$onNo=null;
                        if(!noCache){
                            dialog.hide();
                            return false;                        
                        }
                    }
                });
                var con = dialog._$caption = new xui.UI.Div({
                    height:'1.5em',
                    dock:'top'
                }),
                cmd = new xui.UI.Div({
                    height:'2.5em',
                    dock:'bottom',
                    zIndex:10
                },null,null,null,{KEY:"text-align:center;padding-top:.5em"})
                .append(dialog.$btn1 = new xui.UI.SButton({
                    position:'relative',
                    tabindex:1
                },
                {
                    onClick:function(){
                        if(false!==xui.tryF(dialog._$onYes,[dialog._$input.getUIValue()])){
                            dialog._$_clickYes=1;
                            dialog.close();
                        }
                    }
                },null,null,{KEY:'margin:0 .5em'}));

                cmd.append(dialog.$btn2 = new xui.UI.SButton({
                    tabindex:1,
                    position:'relative'
                },
                {
                    onClick:function(){
                        dialog.close();
                    }
                },null,null,{KEY:'margin:0 .5em'}));
                var inp=dialog._$input=new xui.UI.Input({
                    dock:'fill',
                    multiLines:true
                })
                dialog.append(con).append(cmd).append(inp).render();
                if(!noCache)
                    me.dialog = dialog;
            }
            dialog.setCaption(title||'Prompt');
            dialog._$caption.setHtml(caption||"");
            dialog._$input.setValue(content||"",true,'prompt');
            dialog._$onYes=onYes;
            dialog._$onNo=onNo;
            delete dialog._$_clickYes;
            dialog.$btn1.setCaption("&nbsp;&nbsp;"+(btnCapYes || xui.wrapRes('$inline.ok'))+"&nbsp;&nbsp;");
            dialog.$btn2.setCaption("&nbsp;&nbsp;"+(btnCapNo || xui.wrapRes('$inline.cancel'))+"&nbsp;&nbsp;");

            if(parent && parent["xui.UI"])parent=parent.getContainer(subId);
            if(!xui.isSet(parent))parent=xui('body');

            dialog.show(parent, true, left, top);
            xui.resetRun("dlg_focus:"+dialog.get(0).$xid,function(){
                dialog._$input.activate();
            });
            return dialog;
        },
        //
        _onresize:function(profile,width,height,force){
    		if(width && profile.properties.status=='min')
    			width=profile.properties.minWidth;

            var prop=profile.properties,
                us=xui.$us(profile),
                adjustunit = function(v,emRate){return profile.$forceu(v, us>0?'em':'px', emRate)},
                size = arguments.callee.upper.apply(this,arguments),
                isize={},
                v0=profile.getSubNode('BORDER'),
                v1=profile.getSubNode('TBAR'),
                v2=profile.getSubNode('PANEL'),
                v4=profile.getSubNode('BBAR'),
                v5=profile.getSubNode('MAIN'),
                v6=profile.getSubNode('MAINI'),
                cb1=v0.contentBox(),
                cb2=v2.contentBox(),
                h1,h4,t;
            // caculate with px
            if(width)width=profile.$px(width);
            if(height)height=profile.$px(height);
            if(size.left)size.left=profile.$px(size.left);
            if(size.top)size.top=profile.$px(size.top);
            if(size.width)size.width=profile.$px(size.width);
            if(size.height)size.height=profile.$px(size.height);

            if(height){
                if(height=='auto'){
                    isize.height=height;
                }else{
                    //force to get height
                    h1=v1.offsetHeight(true);
                    h4=v4.offsetHeight(true);
                    if((t=size.height-h1-h4)>0)
                        isize.height=t;
                }
            }
            if(height)
                isize.height = isize.height - v6._paddingH() - (cb1?0:v0._borderH())- (cb2?0:v2._borderH());

            if(width)
                isize.width = size.width
                    - (parseFloat(v6.css('paddingRight'))||0)  - (parseFloat(v6.css('borderRightWidth'))||0)
                    - (parseFloat(v5.css('paddingLeft'))||0) - (parseFloat(v5.css('borderLeftWidth'))||0);
                    - (cb1?0:v0._borderW()) -  (cb2?0:v2._borderW())
            
            if(width&&us>0)isize.width=adjustunit(isize.width);
            if(height&&us>0)isize.height=adjustunit(isize.height);

            v2.cssSize(isize, true);
            if(width){
                xui.UI._adjustConW(profile, v2, isize.width);
            }
        }
    }
});
