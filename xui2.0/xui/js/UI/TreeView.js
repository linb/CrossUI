Class("xui.UI.TreeView","xui.UI.TreeBar",{
    Initialize:function(){
        this.addTemplateKeys(['IMAGE']);
         var t = this.getTemplate();
         t.$submap.items.ITEM.BAR.className='xui-uitembg {cls_group} {cls_fold} {disabled} {readonly}';
         t.$submap.items.ITEM.BAR.className='xui-uitembg {cls_group} {cls_fold} {disabled} {readonly}';
         t.$submap.items.ITEM.BAR.ITEMICON.className='xuicon {cls_file} {imageClass}';
         this.setTemplate(t);
    },
    Static:{
        Appearances:{
            ITEMS:{
                //overflow: 'visible'
                'padding':'1px'
            },
            ITEM:{
                'white-space': 'nowrap',
                position:'relative',
                overflow:'hidden'
            },
            BAR:{
               zoom:xui.browser.ie?1:null,
               position:'relative',
               display:'block',
               'outline-offset':'-1px',
               '-moz-outline-offset':(xui.browser.gek && xui.browser.ver<3)?'-1px !important':null,
               'border-radius':'3px'
            },
            'BAR-mouseover, BAR-mousedown, BAR-checked':{
            },
            'BAR-mouseover':{
                $order:1,
                'background-color':'#FCDD7A',
                'border-color':'#DCB400'                
            },
            'BAR-mousedown':{
                $order:2,
                'background-color':'#FAD200',
                'border-color':'#DCB400'                
            },
            'BAR-checked':{
                $order:2,
                'background-color':'#CBE4FC',
                'border-color':'#AAD2FA'                
            },
            SUB:{
                zoom:xui.browser.ie?1:null,
                height:0,
                'font-size':'1px',
                //1px for ie8
                'line-height':'1px',
                position:'relative',
                overflow:'hidden'
            },
            BOX:{
                left:0,
                overflow: 'auto',
                position:'relative'
            }
        },
        Behaviors:{
            MARK:{
                onClick:function(profile, e, src){
                   profile.box._onclickbar(profile,e,xui.use(src).parent().xid());
                   return false;
                }
            },
            ITEMICON:{
                onClick:function(profile, e, src){
                   profile.box._onclickbar(profile,e,xui.use(src).parent().xid());
                   return false;
                }
            }
        },
        DataModel:{
            $subMargin:22,
            group:null,
            noIcon:{
                ini:false,
                action:function(v){
                    this.getSubNode("ITEMICON",true).css('display',v?'none':'');
                }
            }
        },
        _prepareItem:function(profile, item, oitem, pid, index,len){
            var p=profile.properties,
                map1=profile.ItemIdMapSubSerialId,
                map2=profile.SubSerialIdMapItem,
                pitem;

            if(pid){
                oitem._pid=pid;
                if(pitem=map2[map1[pid]]){
                    oitem._deep=pitem._deep+1;
                    item.rulerStyle='width:'+(oitem._deep*p.$subMargin)+'px;';
                    // for the last one
                    item.togglemark = item.sub?('xui-uicmd-toggle' + (item._checked?'-checked':'')):(p.togglePlaceholder?'xui-uicmd-empty':'xui-uicmd-none');
                }
            }else{
                oitem._deep=0;
                item.rulerStyle='';
                item.innerIcons='';
                item.togglemark = item.sub?('xui-uicmd-toggle' + (item._checked?'-checked':'')):(p.togglePlaceholder?'xui-uicmd-empty':'xui-uicmd-none');
            }
            // show image
            item.imageDisplay=(item.noIcon||p.noIcon)?"display:none;":"";
            //
            item.cls_fold = item.sub?profile.getClass('BAR','-fold'):'';
            item.cls_file = 'xui-icon-file' + (item.sub?' xui-icon-file-fold':'');

            item.disabled = item.disabled?'xui-ui-disabled':'';
            item._itemDisplay=item.hidden?'display:none;':'';
            item.mark2Display = ('showMark' in item)?(item.showMark?'':'display:none;'):(p.selMode=='multi'||p.selMode=='multibycheckbox')?'':'display:none;';
            item._tabindex = p.tabindex;
            xui.UI.List._prepareCmds(profile, item);
        },
        _tofold:function(profile,item,pid){
            var cls=profile.getClass('IMAGE');
            profile.getSubNodeByItemId('BAR', pid).addClass(profile.getClass('BAR','-fold'));
            profile.getSubNodeByItemId('TOGGLE', pid).replaceClass(new RegExp("\\b"+cls+"-path([-\\w]+)\\b"), cls + '-fold$1');
        }
    }
});
