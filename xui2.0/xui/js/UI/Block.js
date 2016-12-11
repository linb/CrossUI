Class("xui.UI.Block", "xui.UI.Widget",{
    Initialize:function(){
        var self=this,
            t = self.getTemplate();
        //modify
        t.className += ' {_sidebarStatus}';
        xui.merge(t.FRAME.BORDER,{
            className:'xui-uiw-border {clsBorderType1}',
            SIDEBAR:{
                tagName:'div',
                className:'xui-uisb xui-uibar {_sidebar}',
                SBCAP:{
                    className:'xui-uisbcap xui-title-node',
                    text:'{sideBarCaption}'
                },
                SBBTN:{
                    $order:1,
                    className:'xui-uisbbtn xuifont',
                    $fonticon:'{_fi_btn}'
                }
            },
            PANEL:{
                tagName:'div',
                className:'xui-uibar xui-uicontainer {clsBorderType2}',
                style:'{_panelstyle};{background};{_overflow};',
                text:'{html}'+xui.UI.$childTag
            }
        },'all');
        //set back
        self.setTemplate(t);

        //get default Appearance
        t = self.getAppearance();
        //modify
        xui.merge(t,{
            PANEL:{
                position:'relative',
                overflow:'auto'
            },
            SBBTN:{
                'z-index':2,
                padding:'0.33333em'
            }
        });
        //set back
        self.setAppearance(t);
    },
    Static:{
        Behaviors:{
            HoverEffected:{SBBTN:'SBBTN',SBCAP:null},
            ClickEffected:{SBBTN:'SBBTN'},
            DroppableKeys:['PANEL'],
            PanelKeys:['PANEL'],
            PANEL:{
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return false;
                    if(profile.onClickPanel)
                        return profile.boxing().onClickPanel(profile, e, src);
                }
            },
            SBBTN:{
                onClick:function(profile, e, src){
                    var p=profile.properties,
                        a=p.sideBarType,
                        b=p.sideBarStatus,
                        c;
                    if(p.disabled)return false;
                    profile.boxing().setSideBarStatus(c  = b=='fold'?'expand':'fold');                    
                }
            },
            SIDEBAR:{
                onClick:function(profile, e, src){
                    var p=profile.properties,
                        btn=profile.getSubNode('SBBTN');
                    if(p.disabled)return false;
                    if(xui.Event.getSrc(e).$xid!=btn.xid()){
                        if(p.sideBarStatus=='fold'){
                            btn.onClick(true);
                        }
                    }
                }
            }
        },
        EventHandlers:{
            onClickPanel:function(profile, e, src){}
        },
        DataModel:{
            //delete those properties
            disabled:null,
            tips:null,
            rotate:null,
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
            selectable:true,
            html:{
                html:1,
                action:function(v,ov,force){
                    this.getSubNode('PANEL').html(xui.adjustRes(v,0,1),null,null,force);
                }
            },
            borderType:{
                ini:'outset',
                listbox:['none','flat','inset','outset','groove','ridge'],
                action:function(v){
                    var ns=this,
                        p=ns.properties,
                        type=p.sideBarType,
                        n1=ns.getSubNode('BORDER'), n2=ns.getSubNode('PANEL'),
                        reg=/^xui-uiborder-/,
                        b='xui-uiborder-',
                        r=b+'radius',
                        i=b+'flat',
                        o=b+'outset',
                        f=b+'flat',
                        ibr = type=='left'?r+'-tr '+r+'-br':type=='top'?r+'-bl '+r+'-br':type=='right'?r+'-tl '+r+'-bl':type=='bottom'?r+'-tl '+r+'-tr':r,
                        flat=f+' ' +r,
                        ins=i+' '+r,
                        outs=o+' ' +r,
                        ins2=i + ' '+ibr,
                        outs2=o+' '+ibr,
                        root=ns.getRoot();
                    n1.removeClass(reg);
                    n2.removeClass(reg);
                    switch(v){
                        case 'flat':
                        n1.addClass(flat);
                        n2.addClass(ibr);
                        break;
                        case 'inset':
                        n1.addClass(ins);
                        n2.addClass(ibr);
                        break;
                        case 'outset':
                        n1.addClass(outs);
                        n2.addClass(ibr);
                        break;
                        case 'groove':
                        n1.addClass(ins);
                        n2.addClass(outs2);
                        break;
                        case 'ridge':
                        n1.addClass(outs);
                        n2.addClass(ins2);
                        break;
                    }

                    //force to resize
                    ns.box._setB(ns);
                    ns.adjustSize();
                }
            },

            // for side bar
            sideBarType:{
                ini:'none',
                listbox:['none','left','top','right','bottom'],
                action:function(v){
                    var ns=this, 
                        prop=ns.properties,
                        reg=/^xui-uisb-/,
                        node=ns.getSubNode('SIDEBAR');
                    
                    node.removeClass(reg).addClass('xui-uisb-'+v);

                    ns.box._sbicon(ns,true);

                    ns.boxing().setBorderType(prop.borderType,true);

                    if(prop.dock=='none')
                        ns.adjustSize();
                    else
                        ns.boxing().adjustDock(true);
                }
            },
            sideBarCaption:{
                ini:'',
                action:function(v){
                    this.getSubNode("SBCAP").html(v);
                }
            },
            sideBarStatus:{
                ini:'expand',
                listbox:['expand','fold'],
                action:function(v){
                    var ns=this, 
                        prop=ns.properties;
                    ns.getRoot().tagClass('-fold', v!='expand');

                    ns.box._sbicon(ns,true);

                    // use sync way
                    xui.UI.$doResize(ns, prop.width, prop.height,true);
                    ns.boxing().adjustDock(true);
                }
            },
            sideBarSize:{
                ini:'2em',
                action:function(v){
                    var ns=this, 
                        prop=ns.properties;
                    if(prop.dock=='none')
                        ns.adjustSize();
                    else
                        ns.boxing().adjustDock(true);
                }
            },

            background:{
                format:'color',
                ini:'',
                action:function(v){
                    this.getSubNode('PANEL').css('background',v);
                }
            },
            width:{
                $spaceunit:1,
                ini:'10em'
            },
            height:{
                $spaceunit:1,
                ini:'10em'
            }
        },
        Appearances:{
            KEY:{
                'line-height':'auto'
            },
            'KEY-fold PANEL':{
                display:'none'
            },
            'KEY-fold SIDEBAR':{
                cursor:'pointer'
            }
        },
        RenderTrigger:function(){
            // only div
            var ns=this;
            if(ns.box.KEY=="xui.UI.Block")
                if(ns.properties.iframeAutoLoad||ns.properties.ajaxAutoLoad)
                    xui.UI.Div._applyAutoLoad(this);
        },
        _sbicon:function(profile, ui){
            var p=profile.properties,
                a=p.sideBarType,
                target=p.sideBarStatus=='fold'
                ? a=='left'?'left':a=='right'?'right':a=='top'?'up':'down'
                : a=='left'?'right':a=='right'?'left':a=='top'?'down':'up';
            return ui ? profile.getSubNode('SBBTN').replaceClass(/(xui-icon-double)[\w]+/g,'$1' + target) : 'xui-icon-double'+target;
        },
        _setB:function(profile){
            var p=profile.properties,
                type=p.borderType,
                nd=profile.getSubNode("BORDER"),
                w=nd._borderW('left');
            p.$hborder=p.$vborder=p.$iborder=0;

            if(type=='flat'||type=='inset'||type=='outset'){p.$hborder=p.$vborder=w;p.$iborder=0;}
            else if(type=='groove'||type=='ridge'){p.$hborder=p.$vborder=p.$iborder=w;}
        },
        LayoutTrigger:function(){
            var prop=this.properties,
                m=prop.sideBarStatus,
                v=prop.borderType;
            if(v!='none')this.boxing().setBorderType(v,true);
            if(m=='fold')this.boxing().setSideBarStatus('fold',true);
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile),
                a=data.sideBarType,
                b=data.sideBarStatus;
            data.background= data.background?'background:'+data.background:'';
            if(xui.isStr(data.overflow))
                data._overflow = data.overflow.indexOf(':')!=-1?(data.overflow):(data.overflow?("overflow:"+data.overflow):"");
            
            data._sidebar = 'xui-uisb-' + a;
            data._sidebarStatus = b=='fold'?profile.getClass('KEY','-fold'):'';

            data._fi_btn =  profile.box._sbicon(profile);

            return data;
        },        
        _onresize:function(profile,width,height){
            var size = arguments.callee.upper.apply(this,arguments),
                root=profile.getRoot(),
                border=profile.getSubNode('BORDER'),
                panel=profile.getSubNode('PANEL'),
                sidebar=profile.getSubNode('SIDEBAR'),
                sbcap=profile.getSubNode('SBCAP'),
                prop=profile.properties,
                sbs=prop.sideBarStatus,
                sbtype=prop.sideBarType,
                b=(prop.$iborder||0)*2,
                us = xui.$us(prop),
                adjustunit = function(v,emRate){return profile.$forceu(v, us>0?'em':'px', emRate)},

                fzrate=profile.getEmSize()/root._getEmSize(),
                panelfz = panel._getEmSize(fzrate),

                // caculate by px
                ww=width?profile.$px(size.width):size.width, 
                hh=height?profile.$px(size.height):size.height,
                sbsize=profile.$px(prop.sideBarSize),
                sbsize2=adjustunit(sbsize);

            size.left=size.top=0;
            if(sbtype!='none'){
                sbcap.css('line-height',adjustunit(sbsize - 2));
                if(sbtype=='left'||sbtype=='right'){
                    sidebar.width(sbsize2);
                    if(height&&'auto'!==height)
                        sidebar.height(adjustunit(hh));
                }else{
                    sidebar.height(sbsize2);
                    sidebar.width(adjustunit(ww));
                }

                if(sbs=='fold'){
                    if(sbtype=='left'||sbtype=='right'){
                        root.width(adjustunit(sbsize+prop.$hborder*2));
                        border.width(sbsize2);
                    }else{
                        root.height(adjustunit(sbsize+prop.$hborder*2));
                        border.height(sbsize2);
                    }
                    return;
                }else{
                    switch(sbtype){
                        case 'left':
                            ww-=sbsize;
                            size.left=sbsize;
                            break;
                        case 'right':
                            ww-=sbsize;
                            break;
                        case 'top':
                            hh-=sbsize;
                            size.top=sbsize;
                            break;
                        case 'bottom':
                            hh-=sbsize;
                            break;
                    }
                }
            }
            if(size.width) size.width = adjustunit(ww -b, panelfz);
            if(size.height&&'auto'!==size.height)
                size.height = adjustunit(hh - b, panelfz);
            panel.cssRegion(size,true);

            if(size.width){
                xui.UI._adjustConW(profile, panel, size.width);
            }
        },
        _showTips:function(profile, node, pos){
            var p=profile.properties;
            if(p.disableTips)return;
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);

            if(!xui.Tips)return;
            if(p.sideBarType=='none')return;

            var id=node.id, ks=profile.keys;
            if(p.sideBarStatus=="fold" && (id.indexOf(ks.SBCAP)===0||id.indexOf(ks.SBBTN)===0)){
                xui.Tips.show(pos, {tips: xui.wrapRes('$inline.Expand')});
                return false;
            }else if(p.sideBarStatus=="expand" && id.indexOf(ks.SBBTN)===0){
                xui.Tips.show(pos, {tips: xui.wrapRes('$inline.Fold')});
                return false;
            }
        }
    }
});

