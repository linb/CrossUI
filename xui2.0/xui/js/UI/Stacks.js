Class("xui.UI.Stacks", "xui.UI.Tabs",{
    Initialize:function(){
        var t=this.getTemplate(),keys=this.$Keys;
        t.BOX={tagName:'div',LIST:t.LIST, PNAELS:t.PNAELS};
        delete t.LIST.LEFT;
        delete t.LIST.RIGHT;
        delete t.LIST.DROP;
        delete t.LIST;
        delete t.PNAELS;
        t.$submap.items.ITEM.className = 'xui-uibarbg xui-uiborder-tb ';
        this.setTemplate(t);
        delete keys.LEFT;delete keys.RIGHT;delete keys.DROP;
    },
    Static:{
        Appearances:{
            BOX:{
                border:'solid 1px #648CB4',
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
            $border:1,
            noPanel:null,
            noHandler:null,
            selMode:null
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
                boxfz = useem?box._getEmSize():1,
                rootfz = useem||css.$isEm(width)||css.$isEm(height)?root._getEmSize():1,
                panelfz = useem?panel._getEmSize():1,
                listfz = useem?list._getEmSize():1,
                bw=prop.$border*2,
                wc=null,
                hc=null,
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

                    // offsetHeight maybe not set here
                    t1 += obj.offsetHeight();
                    if(o.id == key)return false;
                });
                _.arr.each(prop.items,function(o){
                    if(o.id == key)return false;
                    obj = profile.getSubNodeByItemId('ITEM', o.id);
                    obj.cssRegion({top:'auto',bottom:adjustunit(t2,obj)});
                    t2+= obj.offsetHeight();
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
