Class("xui.UI.ButtonViews", "xui.UI.Tabs",{
    Initialize:function(){        
        var t=this.getTemplate(),keys=this.$Keys;
        t.LIST.className='xui-uibg-bar xui-uiborder-outset';
        delete t.LIST.LEFT;
        delete t.LIST.RIGHT;
        delete t.LIST.DROP;
        this.setTemplate(t);
        delete keys.LEFT;delete keys.RIGHT;delete keys.DROP;
    },
    Static:{
        Appearances:{
            LIST:{
                'z-index':'2',
                position:'absolute'
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
                margin:'2px',
                position:'relative',
                cursor:'pointer',
                'padding-right':'4px',
                'vertical-align':'top',
                'background-image':xui.UI.$bg('button.gif', '', true),
                'background-repeat':'no-repeat',
                'background-position':'right -270px'
            },
            'ITEM-mouseover':{
                $order:1,
                'background-position' : 'right -360px'
            },
            'ITEM-mousedown, ITEM-checked':{
                $order:2,
                'background-position' : 'right -450px'
            },
            ITEMI:{
                $order:0,
                'padding-left':'4px',
                //keep this same with ITEM
                'vertical-align':'top',
                'background-image':xui.UI.$bg('button.gif', '', true),
                'background-repeat':'no-repeat',
                'background-position':'left -330px'
            },
            'ITEM-mouseover ITEMI':{
                $order:1,
                'background-position' : 'left -420px'
            },
            'ITEM-mousedown ITEMI, ITEM-checked ITEMI':{
                $order:2,
                'background-position' : 'left -510px'
            },
            ITEMC:{
                $order:0,
                //keep this same with ITEM
                'vertical-align':'top',
                height:'20px',
                padding:'2px 0',
                'background-image':xui.UI.$bg('button.gif', '', true),
                'background-repeat':'repeat-x',
                'background-position':'left -300px'
            },
            'ITEMS-block ITEM, ITEMS-block ITEMI, ITEMS-block ITEMC':{
                $order:2,
                display:'block'
            }, 
            'ITEM-mouseover ITEMC':{
                $order:1,
                'background-position' : 'left -390px'
            },
            'ITEM-mousedown ITEMC, ITEM-checked ITEMC':{
                $order:2,
                'background-position' : 'left -480px'
            },
            HANDLE:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                cursor:'pointer',
                'vertical-align':'middle',
                margin:'1px'
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
            var t=profile.properties,
                noPanel=t.noPanel,
                item = profile.getItemByItemId(key);
            if(!item)
                key=t.$UIvalue;
            var o = profile.boxing().getPanel(key),
                top, left,
                hs = profile.getSubNode('LIST'),
                hl = profile.getSubNode('ITEMS'),
                wc=null,hc=null,itmsH;
            if(!t.noHandler){
                if(t.barLocation=='top'||t.barLocation=='bottom'){
                    if(width){
                        hs.width(width-2);
                        hl.width(width-2);
                        // for nopanel:
                        if(noPanel)
                            hs.height(height-2);
                     
                        left = 0;
                        wc=width;
                    }
    
                    hs.height(itmsH = hl.offsetHeight());
                    if(height-itmsH>0)hc=height-itmsH-2;
                    top = t.barLocation=='top'?2- -itmsH:0;
                }else{
                    if(height){
                        // for nopanel:
                        if(noPanel){
                            hs.width(width-2);
                            hl.width(width-2);
                        }
                        hs.height(height-2);
    
                        top=0;
                        hc=height;
                    }
                    if(width){
                        left = t.barLocation=='left'?2- -t.barSize:0;
                        wc=width-t.barSize-2;
                    }
                }
            }else{
                wc=width;
                hc=height;
            }

            if(!noPanel)
                if(o && !o.isEmpty())o.cssRegion({width:wc?wc:null,height:hc?hc:null,left:left,top:top},true);
        },
        _adjustScroll:null
    }
});