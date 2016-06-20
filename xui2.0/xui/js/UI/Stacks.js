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
                'padding':'5px 8px',
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
                top:'6px',
                right:'8px',
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
            var t=profile.properties,
                item = profile.getItemByItemId(key),
                bw=t.$border*2;
            if(!item)
                key=t.$UIvalue;

            var temp,t1,t2,obj,top,
                wc=null,hc=null,
                bx=profile.getSubNode('BOX'),
                o = profile.boxing().getPanel(key);
            if(!o || o.isEmpty())return;

            // change value
            if(height){
                height-=bw;
                t2=t1=0;
                _.arr.each(t.items,function(o){
                    obj = profile.getSubNodeByItemId('ITEM', o.id);
                    obj.cssRegion({bottom:'auto',top:t1});

                    // offsetHeight maybe not set here
                    t1 += obj.offsetHeight();
                    if(o.id == key)return false;
                });
                _.arr.each(t.items,function(o){
                    if(o.id == key)return false;
                    obj = profile.getSubNodeByItemId('ITEM', o.id);
                    obj.cssRegion({top:'auto',bottom:t2});
                    t2+= obj.offsetHeight();
                },null,true);

                temp = height - t1 - t2;
                if(temp>0){
                    top=t1;
                    hc=temp;
                }

                bx.height(height);
            }
            if(width){
                width-=bw;
                wc=width;
                bx.width(width);
            }    

            o.cssRegion({width:wc?wc:null,height:hc?hc:null,top:top,left:0},true);
            if(wc)profile.getSubNode('LIST').width(wc);
        },
        _adjustScroll:null
    }
});
