Class("xui.UI.Block", "xui.UI.Widget",{
    Initialize:function(){
        var self=this,
            t = self.getTemplate();
        //modify
        xui.merge(t.FRAME.BORDER,{
            className:'xui-uiw-border {clsBorderType1}',
            PANEL:{
                tagName:'div',
                className:'xui-uibg-bar {clsBorderType2}',
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
            }
        });
        //set back
        self.setAppearance(t);
    },
    Static:{
        Behaviors:{
            DroppableKeys:['PANEL'],
            PanelKeys:['PANEL'],
            PANEL:{
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return false;
                    if(profile.onClickPanel)
                        return profile.boxing().onClickPanel(profile, e, src);
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
                action:function(v){
                    this.getSubNode('PANEL').html(xui.adjustRes(v,0,1));
                }
            },
            borderType:{
                ini:'outset',
                listbox:['none','flat','inset','outset','groove','ridge'],
                action:function(v){
                    var ns=this,
                        p=ns.properties,
                        n1=ns.getSubNode('BORDER'), n2=ns.getSubNode('PANEL'),
                        reg=/^xui-uiborder-/,
                        flat='xui-uiborder-flat',
                        ins='xui-uiborder-inset',
                        outs='xui-uiborder-outset',
                        root=ns.getRoot();
                    n1.removeClass(reg);
                    n2.removeClass(reg);
                    switch(v){
                        case 'flat':
                        n1.addClass(flat);
                        break;
                        case 'inset':
                        n1.addClass(ins);
                        break;
                        case 'outset':
                        n1.addClass(outs);
                        break;
                        case 'groove':
                        n1.addClass(ins);
                        n2.addClass(outs);
                        break;
                        case 'ridge':
                        n1.addClass(outs);
                        n2.addClass(ins);
                        break;
                    }

                    //force to resize
                    ns.box._setB(ns);
                    xui.UI.$tryResize(ns,root.get(0).style.width,root.get(0).style.height,true);
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
            }
        },
        RenderTrigger:function(){
            // only div
            var ns=this;
            if(ns.box.KEY=="xui.UI.Block")
                if(ns.properties.iframeAutoLoad||ns.properties.ajaxAutoLoad)
                    xui.UI.Div._applyAutoLoad(this);
        },
        _setB:function(profile){
            var p=profile.properties,type=p.borderType;
            p.$hborder=p.$vborder=p.$iborder=0;
            if(type=='flat'||type=='inset'||type=='outset'){p.$hborder=p.$vborder=1;p.$iborder=0;}
            else if(type=='groove'||type=='ridge'){p.$hborder=p.$vborder=p.$iborder=1;}
        },
        LayoutTrigger:function(){
            var v=this.properties.borderType;
            if(v!='none')this.boxing().setBorderType(v,true);
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            data.background= data.background?'background:'+data.background:'';
            if(xui.isStr(data.overflow))
                data._overflow = data.overflow.indexOf(':')!=-1?(data.overflow):(data.overflow?("overflow:"+data.overflow):"");
            return data;
        },        
        _onresize:function(profile,width,height){
            var size = arguments.callee.upper.apply(this,arguments),
                panel=profile.getSubNode('PANEL'),
                prop=profile.properties,
                b=(prop.$iborder||0)*2,

                css = xui.CSS,
                useem = (prop.spaceUnit||xui.SpaceUnit)=='em',
                adjustunit = function(v,emRate){return css.$forceu(v, useem?'em':'px', emRate)},
                panelfz = useem||css.$isEm(size.width)||css.$isEm(size.height)?panel._getEmSize():null,
                // caculate by px
                ww=width?css.$px(size.width, panelfz):size.width, 
                hh=height?css.$px(size.height, panelfz):size.height;

            if(size.width) size.width = adjustunit(ww -b, panelfz);
            if(size.height&&'auto'!==size.height)
                size.height = adjustunit(hh - b, panelfz);
            panel.cssSize(size,true);
        }
    }
});

