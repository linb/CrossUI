Class("xui.UI.ButtonViews", "xui.UI.Tabs",{
    Initialize:function(){        
        var t=this.getTemplate(),keys=this.$Keys;
        t.LIST.className='xui-uibg-bar xui-uiborder-outset';
        delete t.LIST.LEFT;
        delete t.LIST.RIGHT;
        delete t.LIST.DROP;
        this.setTemplate(t);
        t.$submap.items.ITEM.className = 'xui-ui-btn {itemClass} {disabled} {readonly}';
        delete keys.LEFT;delete keys.RIGHT;delete keys.DROP;
    },
    Static:{
        Appearances:{
            LIST:{
                'z-index':'2',
                position:'absolute'
            },
            LISTBG:{
                display:'none'
            },
            ITEMS:{
                'z-index':'2',
                position:'absolute',
                left:0,
                top:0
            },
            'ITEMS-left, ITEMS-left ITEMC':{
                $order:1,
                'text-align': 'left'
            },
            'ITEMS-center, ITEMS-center ITEMC':{
                $order:1,
                'text-align': 'center'
            },
            'ITEMS-right, ITEMS-right ITEMC':{
                $order:1,
                'text-align': 'right'
            },
            ITEM:{
                $order:0,
                margin:'.15em',
                position:'relative',
                cursor:'pointer',
                'padding':'0 .3em 0 0',
                'vertical-align':'top'
            },
            'ITEMS-block ITEM, ITEMS-block ITEMI, ITEMS-block ITEMC':{
                $order:2,
                display:'block'
            },
            ITEMC:{
                $order:0,
                padding:'.15em 0 .1em 0',
                //keep this same with ITEM
                'vertical-align':'top',
                'text-align': 'center'
            },             
            HANDLE:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                cursor:'pointer',
                'vertical-align':'middle',
                margin:'.1em'
            }
        },
        DataModel:{
            HAlign:null,
            barLocation:{
                ini:'top',
                listbox:['top','bottom','left','right'],
                action:function(v){
                    var self=this,
                        hs = self.getSubNode('LIST'),
                        h = self.getSubNode('ITEMS');
                    switch(v){
                        case 'left':
                            hs.cssRegion({left:0,top:0,right:'auto',bottom:0});
                        break;
                        case 'top':
                            hs.cssRegion({left:0,top:0,right:0,bottom:'auto'});
                        break;
                        case 'right':
                            hs.cssRegion({left:'auto',top:0,right:0,bottom:0});
                        break;
                        case 'bottom':
                            hs.cssRegion({left:0,top:'auto',right:0,bottom:0});
                       break;
                    }
                    switch(v){
                        case 'left':
                        case 'right':
                            h.tagClass('-block',true);
                            break;
                        case 'top':
                        case 'bottom':
                            h.tagClass('-block',false);
                            hs.height('auto');
                            break;
                    }
                    self.boxing().setBarSize(self.properties.barSize,true);
                }
            },
            barHAlign:{
                ini:'left',
                listbox:['left','center', 'right'],
                action:function(v){
                    var hl=this.getSubNode('ITEMS');
                    hl.tagClass('(-left|-right|-center)',false).tagClass('-'+v, true);
                }
            },
            barVAlign:{
                ini:'top',
                listbox:['top','bottom'],
                action:function(v){
                    var hl = this.getSubNode('ITEMS');
                    if(v=='top')
                        hl.cssRegion({top:0,bottom:'auto'});
                    else
                        hl.cssRegion({bottom:0,top:'auto'});
                }
            },
            barSize:{
                ini:50,
                action:function(v){
                    var self=this,
                        t=self.properties,
                        noPanel=t.noPanel,
                        hs = self.getSubNode('LIST'),
                        hl = self.getSubNode('ITEMS');
                    if(t.barLocation=='left'||t.barLocation=='right'){
                        if(!noPanel)
                            hs.merge(hl).width(v);
                    }else{
                        if(!noPanel)
                            hs.height(v);
                    }
                    var t=self.getRootNode().style;
                    xui.UI.$tryResize(self,t.width, t.height,true);
                }
            },
            noPanel:{
                ini:false,
                action:function(v){
                    this.boxing().setBarSize(this.properties.barSize,true);
                }
            }
        },
        LayoutTrigger:function(){
            var pro = this.properties;
            this.boxing().setBarLocation(pro.barLocation,true)
            .setBarHAlign(pro.barHAlign,true)
            .setBarVAlign(pro.barVAlign,true);
        },
        _onresize:function(profile,width,height,force,key){
            var prop=profile.properties,
                noPanel=prop.noPanel,
                item = profile.getItemByItemId(key);

            if(!item){
                key=prop.$UIvalue;
                item = profile.getItemByItemId(key);
            }

            var panel = profile.boxing().getPanel(key),
                css = xui.CSS,
                useem = (prop.spaceUnit||xui.SpaceUnit)=='em',
                adjustunit = function(v,emRate){return v=='auto'?'auto':useem?(css.$em(v,emRate)+'em'):(css.$px(v,emRate)+'px')},
                root = profile.getRoot(),
                rootfz = useem?root._getEmSize():1,
                panelfz = useem?panel._getEmSize():1,
                // caculate by px
                ww=width?css.$px(width, rootfz):width, 
                hh=height?css.$px(height, rootfz):height,

                
                hs = profile.getSubNode('LIST'),
                hl = profile.getSubNode('ITEMS'),
                hsfz =  useem?hs._getEmSize():1,
                hlfz =  useem?hl._getEmSize():1,
                wc=null,
                hc=null,
                top, left, itmsH;

            if(!prop.noHandler){
                if(prop.barLocation=='top'||prop.barLocation=='bottom'){
                    if(width){
                        hs.width(css.$addpx(ww, -2, hsfz));
                        hl.width(css.$addpx(ww, -2, hlfz));
                        // for nopanel:
                        if(noPanel)
                            hs.height(css.$addpx(hh, -2, hsfz));
                     
                        left = 0;
                        wc=ww;
                    }

                    // caculate by px
                    itmsH = hl.offsetHeight()
                    if(hh-itmsH>0)hc=hh-itmsH-2;
                    top = prop.barLocation=='top'?2+itmsH:0;

                    hs.height(adjustunit(itmsH, hsfz));
                }else{
                    if(height){
                        // for nopanel:
                        if(noPanel){
                            hs.width(css.$addpx(ww,-2,hsfz));
                            hl.width(css.$addpx(ww,-2,hlfz));
                        }
                        hs.height(css.$addpx(hh,-2,hsfz));
    
                        top=0;
                        hc=hh;
                    }
                    if(width){
                        //caculate by px
                        left = prop.barLocation=='left'?2+css.$px(prop.barSize, hsfz):0;
                        wc = ww-css.$px(prop.barSize, hsfz)-2;
                    }
                }
            }else{
                wc=ww;
                hc=hh;
            }

            if(!noPanel)
                if(panel && !panel.isEmpty())panel.cssRegion({
                    width : wc?adjustunit(wc,panelfz):null,
                    height : hc?adjustunit(hc,panelfz):null,
                    left : adjustunit(left,panelfz),
                    top : adjustunit(top,panelfz)
                },true);
        },
        _adjustScroll:null
    }
});