Class("xui.UI.Dialog","xui.UI.Widget",{
    Instance:{
        showModal:function(parent, left, top){
            this.show(parent, true, left, top);
        },
        show:function(parent, modal, left, top){
            parent = parent || xui('body');

            return this.each(function(profile){
                if(profile.inShowing)return;
                var t,
                    p=profile.properties,
                    ins = profile.boxing(),
                    fun = function(){
                        var ins=profile.boxing();

                        if(left||left===0)
                            ins.setLeft(left);
                        if(top||top===0)
                            ins.setTop(top);
                        parent.append(ins);
                        var box=profile.box,
                            root=profile.getRoot();
                        
                        var tt=profile._$rs_args;
                        if(p.status=='normal'){
                            // resize immidiately here, maybe max here
                            xui.UI.$doResize(profile, (tt&&tt[1])||p.width, (tt&&tt[2])||p.height);
                            root.show(left?(parseInt(left,10)||0)+'px':null, top?(parseInt(top,10)||0)+'px':null);
                        }
                        if(p.iframeAutoLoad||p.ajaxAutoLoad)
                            xui.UI.Div._applyAutoLoad(profile);

                        if((modal || p.modal) && !profile.$inModal)
                            box._modal(profile);
                        ins.activate();

                        if(profile.onShow)profile.boxing().onShow(profile);

                        if(profile.properties.status=='normal')
                            box._refreshRegion(profile);

                        delete profile.inShowing;
                    };

                // default to center dlg
                switch(p.initPos){
                    case 'auto':
                   if(_.isHash(left)){
                        top=left.top;
                        left=left.left;
                    }else{
                        top=(top||top===0)?top:p.top;
                        left=(left||left===0)?left:p.left;
                    }
                    break;
                    case 'center':
                    if(_.isHash(left)){
                        top=left.top+(left.height-p.height)/2;
                        left=left.left+(left.width-p.width)/2;
                    }else{
                        var pr = parent.get(0)==xui('body').get(0)?xui.win:(parent['xui.UI']?parent.getRoot():parent);
                        top=(top||top===0)?top:Math.max(0,(pr.height()-p.height)/2+pr.scrollTop());
                        left=(left||left===0)?left:Math.max(0,(pr.width()-p.width)/2+pr.scrollLeft());
                    }
                    break;
                }
                if(left<0)left=0;
                if(top<0)top=0;

                p.left=left;
                p.top=top;
                if(p.status=='max'){
                    left=top=0;
                }

                profile.inShowing=1;
                if(t=p.fromRegion)
                    xui.Dom.animate({border:'dashed 1px #ff0000'},{left:[t.left,left],top:[t.top,top],width:[t.width,p.width],height:[t.height,p.height]}, null,fun,500,0,'expoIn').start();
                else
                    fun();
            });
        },
        hide:function(){
            this.each(function(profile){
                var pro=profile.properties,
                    box=profile.box,
                    root=profile.getRoot();

                if(profile.inHiding)return;
                profile.inHiding=1;

                if(profile.$inModal)
                    box._unModal(profile);
                //max has dock prop
                if(pro.status=='max' || pro.status=='min')
                    box._restore(profile);

                root.hide();

                var t=pro.fromRegion, fun=function(){
                    delete profile.inHiding;
                };
                if(t)
                    xui.Dom.animate({border:'dashed 1px #ff0000'},{left:[pro.left,t.left],top:[pro.top,t.top],width:[pro.width,t.width],height:[pro.height,t.height]},  null, fun,500,0,'expoOut').start();
                else
                    fun();
            });
            return this;
        },
        close:function(triggerEvent){
            return this.each(function(profile){
                if(false!==triggerEvent && profile.beforeClose && false === profile.boxing().beforeClose(profile))
                    return;
                if(profile.inClosing)return;
                profile.inClosing=1;
                var pro=profile.properties, t=pro.fromRegion, fun=function(){
                    profile.boxing().destroy();
                    delete profile.inClosing;
                };

                if(t)
                    xui.Dom.animate({border:'dashed 1px #ff0000'},{left:[pro.left,t.left],top:[pro.top,t.top],width:[pro.width,t.width],height:[pro.height,t.height]}, null,fun,500,0,'expoOut').start();
                else
                    fun();
            });
        },
        activate:function(flag){
            var self=this, profile=this.get(0),ifocus;
            profile.box._active(profile,flag);
            this.getChildren(null,true).each(function(o){
                if(_.get(o,['properties','defaultFocus'])){
                    try{_.asyRun(function(){o.boxing().activate()})}catch(e){}
                    ifocus=1;
                    return false;
                }
            });
            if(flag!==false && !ifocus){
                try{profile.getSubNode('CAPTION').focus();}catch(e){}
            }
            _.asyRun(function(){
                if(self.onActivated)self.onActivated(profile);                        
            });
        },
        isPinned:function(){
            return !!_.get(this.get(0),['properties','pinned']);
        }
    },
    Initialize:function(){
        var ns=this, t=ns.getTemplate();
        _.merge(t.FRAME.BORDER,{
            TABSTOP1:{$order:-1},
            TBAR:{
                tagName:'div',
                className:'xui-uibar-top',
                TBART:{
                    cellpadding:"0",
                    cellspacing:"0",
                    width:'100%',
                    border:'0',
                    tagName:'table',
                    className:'xui-uibar-t',
                    TBARTR:{
                        tagName:'tr',
                        TBARTDL:{
                            tagName:'td',
                            className:'xui-uibar-tdl'
                        },
                        TBARTDM:{
                            $order:1,
                            width:'100%',
                            tagName:'td',
                            className:'xui-uibar-tdm'
                        },
                        TBARTDR:{
                            $order:2,
                            tagName:'td',
                            className:'xui-uibar-tdr'
                        }
                    }
                },
                BARCMDL:{
                    $order:1,
                    tagName: 'div',
                    className:'xui-uibar-cmdl',
                    ICON:{
                        $order:0,
                        className:'xui-ui-icon {imageClass}',
                        style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                    },
                    CAPTION:{
                        $order:1,
                        tabindex: '{tabindex}',
                        text:'{caption}'
                    }
                },
                BARCMDR:{
                    $order:2,
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
                    PIN:{
                        $order:2,
                        className:'xui-uicmd-pin',
                        style:'{pinDisplay}'
                    },
                    LAND:{
                        $order:3,
                        className:'xui-uicmd-land',
                        style:'{landDisplay}'
                    },
                    REFRESH:{
                        className:'xui-uicmd-refresh',
                        style:'{refreshDisplay}',
                        $order:4
                    },
                    MIN:{
                        $order:5,
                        className:'xui-uicmd-min',
                        style:'{minDisplay}'
                    },
                    RESTORE:{
                        $order:6,
                        className:'xui-uicmd-restore',
                        style:'display:none;'
                    },
                    MAX:{
                        $order:7,
                        className:'xui-uicmd-max',
                        style:'{maxDisplay}'
                    },
                    CLOSE:{
                        $order:8,
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
                    PANEL:{
                        tagName:'div',
                        style:"{_overflow};",
                        text:'{html}'+xui.UI.$childTag
                    }
                }
            },
            BBAR:{
                $order:3,
                tagName:'div',
                className:'xui-uibar-bottom',
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
            },
            TABSTOP2:{$order:9}
        },'all');
        ns.setTemplate(t);

        xui.alert=ns.alert;
        xui.confirm=ns.confirm;
        xui.pop=ns.pop;
        xui.prompt=ns.prompt;
    },
    Static:{
        _shadowRB:"BBARTDR",
        Appearances:{
            KEY:{
                overflow:'visible'
            },
            "TABSTOP1,TABSTOP2":{
                height:0,
                width:"16px",
                display:'inline',
                position:'absolute'
            },
            PANEL:{
                position:'relative',
                overflow:'auto',
                'font-size':'12px',
                'line-height':'1.22em'
            },
            CAPTION:{
                'font-size':'12px',
                display:'inline',
                'vertical-align':xui.browser.ie6?'baseline':'middle'
            },
            BORDER:{
                position:'relative',
                'font-size':0,
                'line-height':0
            }
        },
        Behaviors:{
            DroppableKeys:['PANEL'],
            PanelKeys:['PANEL'],
            DraggableKeys:['LAND'],
            HoverEffected:{INFO:'INFO', OPT:'OPT', PIN:'PIN',MIN:'MIN',MAX:'MAX',RESTORE:'RESTORE',CLOSE:'CLOSE',REFRESH:'REFRESH',LAND:'LAND'},
            ClickEffected:{INFO:'INFO', OPT:'OPT', PIN:'PIN',MIN:'MIN',MAX:'MAX',RESTORE:'RESTORE',CLOSE:'CLOSE',REFRESH:'REFRESH',LAND:'LAND'},
            onMousedown:function(profile, e){
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
    xui.Dom.byId(id).innerHTML=_()+"";
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
                var pos = profile.getRoot().cssPos(),p=profile.properties,l=null,t=null;
                if(p.left !== pos.left)
                    p.left = l = pos.left;
                if(p.top !== pos.top)
                    p.top = t = pos.top;

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
                        xui(o).focus();
                        xui.use(src).get(0).tabIndex=o.tabIndex;
                    }
                    else{
                        o=profile.getRoot().nextFocus(false,true,false);
                        xui(o).focus();
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
                        xui(o).focus();
                        xui.use(src).get(0).tabIndex=o.tabIndex;
                    }
                    else{
                        o=profile.getRoot().nextFocus(true,true,false);
                        xui(o).focus();
                        xui.use(src).get(0).tabIndex=o.get(0).tabIndex;
                    }
                    children=o=null;
                }
            },
            TBAR:{
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    if(profile.getKey(xui.Event.getSrc(e).parentNode.id)==profile.keys.BARCMDR)return;

                    if(profile.properties.movable && !profile._locked){
                        profile.box._active(profile);
                        profile.getRoot().startDrag(e, {
                            dragDefer:1,
                            maxTopOffset:profile.getRoot().top(),
                            maxLeftOffset:profile.getRoot().left(),
                            targetOffsetParent:profile.getRoot().parent()
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
                    var key=profile.keys.PIN, t=profile.properties;
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
                            if(t.status != 'min' && profile.$resizer)
                                profile.$resizer.show();
                        }else
                            if(profile.$resizer)
                                //profile.boxing().setResizer(false);
                                profile.$resizer.hide();
                    }
                }
            },
            MIN:{
                onClick:function(profile, e, src){
                    profile.box._min(profile);
                }
            },
            MAX:{
                onClick:function(profile, e, src){
                    profile.box._max(profile);
                }
            },
            RESTORE:{
                onClick:function(profile, e, src){
                    profile.box._restore(profile);
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
            LAND:{
                onClick:function(profile, e, src){
                    profile.boxing().onLand(profile, e, src);
                }
            }
        },
        DataModel:{
            selectable:true,
            tips:null,
            border:null,
            disabled:null,
            dock:'none',
            initPos:{
                ini:'center',
                listbox:['auto','center']
            },
            iframeAutoLoad:{
                ini:"",
                action:function(){
                    this.getSubNode("PANEL").html("",false);
                    xui.UI.Div._applyAutoLoad(this);
                }
            },
            ajaxAutoLoad:{
                ini:"",
                action:function(){
                    this.getSubNode("PANEL").html("",false);
                    xui.UI.Div._applyAutoLoad(this);
                }
            },
            html:{
                html:1,
                action:function(v){
                    this.getSubNode('PANEL').html(xui.adjustRes(v,0,1));
                }
            },
            overflow:{
                ini:xui.browser.isTouch?'auto':undefined,
                listbox:['','visible','hidden','scroll','auto'],
                action:function(v){
                                        var node=this.getSubNode('PANEL');
                    if(v){
                        if(v.indexOf(':')!=-1){
                            _.arr.each(v.split(/\s*;\s*/g),function(s){
                                var a=s.split(/\s*:\s*/g);
                                if(a.length>1)node.css(_.str.trim(a[0]),_.str.trim(a[1]||''));
                            });
                            return;
                        }
                    }
                    node.css('overflow',v||'');
                }
            },
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
            width:300,
            height:300,
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
                    if(v=='min')b._min(self,o);
                    else if(v=='max')b._max(self,o);
                    else b._restore(self,o);
                }
            }
        },
        EventHandlers:{
            onRefresh:function(profile){},
            onShow:function(profile){},
            beforeClose:function(profile){},
            onShowInfo:function(profile, e, src){},
            onShowOptions:function(profile, e, src){},
            onLand:function(profile, e, src){},
            onActivated:function(profile){}
        },
        RenderTrigger:function(){
            var ns=this;
            ns.destroyTrigger = function(){
                var s=this;
                if(s.$inModal)s.box._unModal(s);
            };
        },
        LayoutTrigger:function(){
            var self=this, t=self.properties, b=self.box;
            if(t.status=='min')
                b._min(self);
            else if(t.status=='max')
                b._max(self);
            else
                xui.UI.$tryResize(self, t.width, t.height);
            // ensure modal
            if(t.modal){
                var p=self.$modalDiv&&self.$modalDiv.parent();
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
            data.statusDisplay = data.statusDisplay?'':nodisplay;
            data.statusHeight = 'height:'+data.statusHeight+'px';
            var status=profile.properties.status;
            if(status=='min'||status=='max')
                profile.$noR=profile.$noS=1;
            if(_.isStr(data.overflow))
                data._overflow = data.overflow.indexOf(':')!=-1?(data.overflow):("overflow:"+data.overflow);
            return data;
        },

        //ov from design mode
        _min:function(profile,status){
            var o=profile.getRoot(),
                box=profile.box,
                p=o.parent(),
                t=profile.properties;
            if(!status)status=t.status;
            // unMax
            if(status=='max')
                box._unMax(profile);
            // keep restore values
            else
                box._refreshRegion(profile);

            // hide those
            profile.getSubNodes(['PANEL','STATUS']).css('display','none');

            if(t.minBtn){
                // show restore button
                profile.getSubNode('RESTORE').setInlineBlock();
                // hide min button
                profile.getSubNode('MIN').css('display','none');
            }

            // lockResize function
            if(t.resizer && profile.$resizer)
                profile.$resizer.hide();


            if(t.shadow)
                profile.boxing()._unShadow(false);

            //set it before resize
            t.status='min';

            var h1=o.height(),
                h2=profile.getSubNode('BORDER').height(),
                h=profile.getSubNode('TBAR').height();
            // resize
            o.cssSize({ width :t.minWidth, height :h+h1-h2},true);
        },
        _max:function(profile,status){
            var o=profile.getRoot(),
                box=profile.box,
                ins=profile.boxing(),
                p=o.parent(),
                t=profile.properties;
            if(!status)status=t.status;
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
                profile.getSubNode('RESTORE').setInlineBlock();
            }

            // set not movable
            profile.old_m = t.movable;
            t.movable=false;

            if(t.resizer && profile.$resizer)
                profile.$resizer.hide();

            if(t.shadow)
                //ins.setShadow(false);
                ins._unShadow(false);

            t.status='max';

            ins.setDock('cover',true);
        },
        _restore:function(profile,status){
            var o=profile.getRoot(),
                box=profile.box,
                t=profile.properties;
            if(!status)status=t.status;

            t.status='normal';

            // if from max
            if(status=='max')box._unMax(profile);
            if(status=='min')box._unMin(profile);

            // hide restore button
            profile.getSubNode('RESTORE').css('display','none');

        },
        _unMax:function(profile){
            var t=profile.properties,
                ins=profile.boxing();
            profile.getSubNode('MAX').setInlineBlock();
            if(t.pinBtn)
                profile.getSubNode('PIN').setInlineBlock();

            t.movable=profile.old_m;

            if(t.shadow)
                ins._shadow();

            if(t.resizer && !t.pinned){
                if(profile.$resizer)
                    profile.$resizer.show();
                else
                    ins._resizer();
            }

            ins.setDock('none');

            // resize
            xui.UI.$tryResize(profile, t.width, t.height,true);
        },
        _unMin:function(profile){
            var t=profile.properties,
            ins=profile.boxing();
            profile.getSubNodes(['PANEL','STATUS']).css('display','block');
            profile.getSubNode('MIN').setInlineBlock();

            if(t.shadow)
                ins._shadow();

            if(t.resizer && !t.pinned){
                if(profile.$resizer)
                    profile.$resizer.show();
                else
                    ins._resizer();
            }

            profile.getRoot().cssSize({width:t.width, height:t.height});
            // resize
            xui.UI.$tryResize(profile, t.width, t.height,true);
        },
        _active:function(profile,flag){
            var self=this;
            if(flag!==false && xui.$cache.unique.activeWndId==profile.$xid)return;

            self._deActive();
            if(flag!==false){
                var o=xui(profile.domId),
                    //in ie, .children can't get the same thread added node(modal div,  here)
                    t1=o.topZindex(),
                    t2=o.css('zIndex');
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
                    if(p.get(0)===document.body || p.get(0)===document || p.get(0)===window)
                        p=xui.win;

                    cover.css({
                        display:'block',width:Math.max(p.width(),p.scrollWidth())+'px',height:Math.max(p.height(),p.scrollHeight())+'px'
                    })
                    .onMousedown(function(){return false})
                    .topZindex(true);

                    p.onSize(function(p){
                        p=xui(p);
                        // set widht/height first
                        cover.width(p.width()).height(p.height());
                        _.asyRun(function(){
                            cover.width(Math.max(p.width(),p.scrollWidth()));
                            cover.height(Math.max(p.height(),p.scrollHeight()));
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
                        if(o)xui(o).focus();
                        else profile.getRoot().nextFocus();

                        children=o=null;
                    });
                    */

                    profile.$inModal=true;
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
                _.breakO(profile.$focusHash,2);
                xui.Event.popTabOutTrigger();
                */
                p.setBlurTrigger(profile.$xid+"_anti");
            }
        },
        _refreshRegion:function(profile){
            if(!profile.renderId) return;
            var pro=profile.properties;
            return _.merge(pro, profile.getRoot().cssRegion(), function(o,i){return pro[i]!='auto'});
        },

        _adjust:function(dialog,caption, content, left, top){
            caption = caption ||'';
            if(!content){
                content = caption;
                caption = "";
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

            w=size.width + 40;
            h=size.height + 90;
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
                        _.tryF(dialog._$onClose);
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
                    height:26,
                    dock:'bottom'
                },null,null,null,{KEY:"text-align:center;"}),

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
                },null,null,{KEY:'margin:0 4px'});
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

            var size=xui.UI.Dialog._adjust(dialog,title, content);

            if(parent && parent["xui.UI"])parent=parent.getContainer(subId);
            if(!_.isSet(parent))parent=xui('body');

            dialog.show(parent,true, left, top);
            _.resetRun("dlg_focus:"+dialog.get(0).$xid,function(){
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
                            _.tryF(dialog._$onNo,['close']);
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
                    height:26,
                    dock:'bottom'
                },null,null,null,{KEY:"text-align:center;"}),
                btn = dialog.$btn1 = new xui.UI.SButton({
                    tabindex:1,
                    position:'relative'
                },
                {
                    onClick:function(){
                        _.tryF(dialog._$onYes);
                        dialog._$_clicked=1;
                        dialog.close();
                    }
                },null,null,{KEY:'margin:0 4px'});
                cmd.append(btn);

                btn = dialog.$btn2=new xui.UI.SButton({
                    tabindex:1,
                    position:'relative'
                },
                {
                    onClick:function(){
                        _.tryF(dialog._$onNo,['no']);
                        dialog._$_clicked=1;
                        dialog.close();
                    }
                },null,null,{KEY:'margin:0 4px'});
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
            var size=xui.UI.Dialog._adjust(dialog, title, caption);

            if(parent && parent["xui.UI"])parent=parent.getContainer(subId);
            if(!_.isSet(parent))parent=xui('body');

            dialog.show(parent, true, left, top);
            _.resetRun("dlg_focus:"+dialog.get(0).$xid,function(){
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
                    height:26,
                    dock:'bottom'
                },null,null,null,{KEY:"text-align:center;"})
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
            },null,null,{KEY:'margin:0 4px'})),

            div = dialog.$div = new xui.UI.Div({
                left:10,
                top:10,
                width:80
            }).setCustomStyle({
                KEY:'overflow:visible'
            });

            dialog.append(cmd).append(div).render();;

            var size=xui.UI.Dialog._adjust(dialog, title, content);

            if(parent && parent["xui.UI"])parent=parent.getContainer(subId);
            if(!_.isSet(parent))parent=xui('body');

            dialog.show(parent,false,left, top);

            _.resetRun("dlg_focus:"+dialog.get(0).$xid,function(){
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
                    resizer:false,
                    left:200,
                    top:200,
                    width:300,
                    height:130
                },{
                    beforeClose:function(){
                        if(!dialog._$_clickYes)
                        _.tryF(dialog._$onNo);
                        else
                            delete dialog._$_clickYes;

                        dialog._$inp.setValue('');
                        dialog._$onYes=dialog._$onNo=null;
                        if(!noCache){
                            dialog.hide();
                            return false;                        }
                    }
                });
                var con = dialog._$con = new xui.UI.Div({
                    top:4,
                    left:10,
                    width:270,
                    height:18
                }),
                cmd = new xui.UI.Div({
                    height:26,
                    dock:'bottom'
                },null,null,null,{KEY:"text-align:center;"})
                .append(dialog.$btn1 = new xui.UI.SButton({
                    position:'relative',
                    tabindex:1
                },
                {
                    onClick:function(){
                        if(false!==_.tryF(dialog._$onYes,[dialog._$inp.getUIValue()])){
                            dialog._$_clickYes=1;
                            dialog.close();
                        }
                    }
                },null,null,{KEY:'margin:0 4px'}));

                cmd.append(dialog.$btn2 = new xui.UI.SButton({
                    tabindex:1,
                    position:'relative'
                },
                {
                    onClick:function(){
                        dialog.close();
                    }
                },null,null,{KEY:'margin:0 4px'}));
                var inp=dialog._$inp=new xui.UI.Input({
                    left:10,
                    top:22,
                    width:270,
                    height:36,
                    multiLines:true
                })
                dialog.append(con).append(cmd).append(inp).render();
                if(!noCache)
                    me.dialog = dialog;
            }
            dialog.setCaption(title||'Prompt');
            dialog._$con.setHtml(caption||"");
            dialog._$inp.setValue(content||"",true);
            dialog._$onYes=onYes;
            dialog._$onNo=onNo;
            delete dialog._$_clickYes;
            dialog.$btn1.setCaption("&nbsp;&nbsp;"+(btnCapYes || xui.wrapRes('$inline.ok'))+"&nbsp;&nbsp;");
            dialog.$btn2.setCaption("&nbsp;&nbsp;"+(btnCapNo || xui.wrapRes('$inline.cancel'))+"&nbsp;&nbsp;");

            if(parent && parent["xui.UI"])parent=parent.getContainer(subId);
            if(!_.isSet(parent))parent=xui('body');

            dialog.show(parent, true, left, top);
            _.resetRun("dlg_focus:"+dialog.get(0).$xid,function(){
                dialog._$inp.activate();
            });
            return dialog;
        },
        //
        _onresize:function(profile,width,height,force){
    		if(width && profile.properties.status=='min')
    			width=profile.properties.minWidth;

            var size = arguments.callee.upper.apply(this,arguments),
                isize={},
                v1=profile.getSubNode('TBAR'),
                v2=profile.getSubNode('PANEL'),
                v4=profile.getSubNode('BBAR'),
                v5=profile.getSubNode('MAIN'),
                v6=profile.getSubNode('MAINI'),
                h1,h4,t;
            if(height){
                if(height=='auto'){
                    isize.height=height;
                }else{
                    h1=v1.height(), h4=v4.height();
                    if((t=size.height-h1-h4)>0)
                        isize.height=t;
                }
            }

            if(width)
                isize.width=size.width-(parseInt(v6.css('paddingRight'),10)||0)-(parseInt(v5.css('paddingLeft'),10)||0);
            v2.cssSize(isize, true);
        }
    }
});
