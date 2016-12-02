Class("xui.UI.TreeView","xui.UI.TreeBar",{
    Initialize:function(){
        this.addTemplateKeys(['IMAGE']);
         var t = this.getTemplate();
         t.$submap.items.ITEM.BAR.className='xui-uitembg xui-uiborder-radius xui-showfocus {cls_group} {cls_fold} {_split} {disabled} {readonly}';
         var n=t.$submap.items.ITEM.BAR.ITEMICON;
         n.$fonticon = '{_fi_cls_file}';
         this.setTemplate(t);
    },
    Static:{
        Appearances:{
            ITEMS:{
                //overflow: 'visible'
                'padding':'.25em'
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
               '-moz-outline-offset':(xui.browser.gek && xui.browser.ver<3)?'-1px !important':null
            },
            SUB:{
                zoom:xui.browser.ie?1:null,
                height:0,
                'font-size':xui.browser.ie68?'1px':null,
                //1px for ie8
                'line-height':xui.browser.ie68?'1px':null,
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
            $subMargin:1.8,
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
                    item.rulerStyle='width:'+(oitem._deep*p.$subMargin)+'em;';
                    // for the last one
                    item._fi_togglemark = item.sub?('xui-uicmd-toggle' + (item._checked?'-checked':'')):(p.togglePlaceholder?'xui-uicmd-empty':'xui-uicmd-none');
                }
            }else{
                oitem._deep=0;
                item.rulerStyle='';
                item.innerIcons='';
                item._fi_togglemark = item.sub?('xui-uicmd-toggle' + (item._checked?'-checked':'')):(p.togglePlaceholder?'xui-uicmd-empty':'xui-uicmd-none');
            }
            // show image
            item.imageDisplay=(item.noIcon||p.noIcon)?"display:none;":"";
            //
            item.cls_fold = item.sub?profile.getClass('BAR','-fold'):'';

            if(!(item.imageClass||item.image||item.iconFontCode))
                item._fi_cls_file = 'xui-icon-file' + (item.sub?' xui-icon-file-fold':'');

            item.disabled = item.disabled?'xui-ui-disabled':'';
            item._itemDisplay=item.hidden?'display:none;':'';
            item.mark2Display = ('showMark' in item)?(item.showMark?'':'display:none;'):(p.selMode=='multi'||p.selMode=='multibycheckbox')?'':'display:none;';
            item._tabindex = p.tabindex;
            this._prepareCmds(profile, item);
            
            if(item.type=='split'){
                item._split='xui-uitem-split';
                item._ruleDisplay=item._ltagDisplay=item._tglDisplay=item._rtagDisplay=item.imageDisplay=item.mark2Display=item._capDisplay=item._extraDisplay=item._optDisplay='display:none;';
            }
        },
        _tofold:function(profile,item,pid){
            var cls=profile.getClass('IMAGE');
            profile.getSubNodeByItemId('BAR', pid).addClass(profile.getClass('BAR','-fold'));
            profile.getSubNodeByItemId('TOGGLE', pid).replaceClass(new RegExp("\\b"+cls+"-path([-\\w]+)\\b"), cls + '-fold$1');
        }
    }
});
