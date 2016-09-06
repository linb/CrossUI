Class("xui.UI.Stacks", "xui.UI.Tabs",{
    Initialize:function(){
        var t=this.getTemplate(),keys=this.$Keys;
        t.BOX={tagName:'div',LIST:t.LIST, PNAELS:t.PNAELS};
        delete t.LIST.LEFT;
        delete t.LIST.RIGHT;
        delete t.LIST.DROP;
        delete t.LIST;
        delete t.PNAELS;
        t.$submap.items.ITEM.className = 'xui-uitembg-bar xui-uiborder-tb ';
        this.setTemplate(t);
        delete keys.LEFT;delete keys.RIGHT;delete keys.DROP;
    },
    Static:{
        Appearances:{
            BOX:{
                position:'absolute',
                left:0,
                top:0
            },
            LIST:{
                position:'static'
            },
            ITEMS:{
                position:'static'
            },
            ITEM:{
                $order:0,
                display:'block',
                position:'absolute',
                cursor:'pointer',
                width:'100%',
                left:0
            },
            // to cover Tab's setting, must use ITEMC/ITEMI separately
            ITEMC:{
                display:'block'
            },
            ITEMI:{
                display:'block'
            },
            'ITEM-mouseover':{
                $order:1
            },
            'ITEM-mousedown ITEMC, ITEM-checked ITEMC':{
                $order:2
            },
            'ITEM-mousedown ITEMI, ITEM-checked ITEMI':{
                $order:2
            },
            'ITEM-mousedown, ITEM-checked':{
                $order:3
            },
            HANDLE:{
                cursor:'pointer',
                display:'block',
                'padding':'.5em .7em',
                'white-space':'nowrap'
            },
            PANEL:{
                position:'absolute',
//                visibility:'hidden',
//                top:'-10000px',
//                left:'-10000px',
                display:'none',
                overflow:'auto'
            },
            CMDS:{
                position:'absolute',
                top:'.5em',
                right:'.7em',
                'text-align':'right',
                'vertical-align': 'middle'
            }
        },
        DataModel:{
            noPanel:null,
            noHandler:null,
            selMode:null,
            borderType:{
                ini:'flat',
                listbox:['none','flat','inset','outset'],
                action:function(v){
                    var ns=this,
                        p=ns.properties,
                        n1=ns.getSubNode('BOX'),
                        reg=/^xui-uiborder-/,
                        flat='xui-uiborder-flat',
                        ins='xui-uiborder-inset',
                        outs='xui-uiborder-outset',
                        root=ns.getRoot();
                    n1.removeClass(reg);
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
                    }

                    //force to resize
                    xui.UI.$tryResize(ns,root.get(0).style.width,root.get(0).style.height,true);
                }
            }
        },
        LayoutTrigger:function(){
            var v=this.properties.borderType;
            if(v&&v!='none')this.boxing().setBorderType(v,true);
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
                adjustunit = function(v,emRate){return css.$forceu(v, useem?'em':'px', emRate)},
                root = profile.getRoot(),
                box=profile.getSubNode('BOX'),
                list=profile.getSubNode('LIST'),
                boxfz = useem?box._getEmSize():null,
                rootfz = useem||css.$isEm(width)||css.$isEm(height)?root._getEmSize():null,
                panelfz = useem?panel._getEmSize():null,
                listfz = useem?list._getEmSize():null,
                type = prop.borderType,
                bw = (type=='flat'||type=='inset'||type=='outset') ? 2 : 0,
                wc=null,
                hc=null,
                off,
                temp,t1,t2,obj,top;

            if(!panel || panel.isEmpty())return;

            // caculate by px
            width=width?css.$px(width, rootfz):width;
            height=height?css.$px(height, rootfz):height;

            // change value
            if(height){
                height-=bw;
                t2=t1=0;
                _.arr.each(prop.items,function(o){
                    obj = profile.getSubNodeByItemId('ITEM', o.id);
                    obj.cssRegion({bottom:'auto',top:adjustunit(t1,obj)});

                    // force to get offsetHeight
                    off=obj.offsetHeight(true);
                    t1 += off
                    if(o.id == key)return false;
                });
                _.arr.each(prop.items,function(o){
                    if(o.id == key)return false;
                    obj = profile.getSubNodeByItemId('ITEM', o.id);
                    obj.cssRegion({top:'auto',bottom:adjustunit(t2,obj)});

                    // offsetHeight maybe not set here
                    off=obj.offsetHeight(true);
                    t2+= off
                },null,true);

                temp = height - t1 - t2;
                if(temp>0){
                    top=t1;
                    hc=temp;
                }

                box.height(adjustunit(height,boxfz));
            }
            if(width){
                width-=bw;
                wc=width;
                box.width(adjustunit(width,boxfz));
            }    

            panel.cssRegion({
                width:wc?adjustunit(wc,panelfz):null,
                height:hc?adjustunit(hc,panelfz):null,
                top:adjustunit(top,panelfz),
                left:0+xui.CSS.$picku()
            },true);
            if(wc)list.width(adjustunit(wc,listfz));
        },
        _adjustScroll:null
    }
});
