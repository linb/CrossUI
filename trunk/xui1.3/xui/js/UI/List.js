Class("xui.UI.List", ["xui.UI", "xui.absList","xui.absValue" ],{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                if(!profile.renderId)return;

                var box=profile.box,
                    uiv=profile.boxing().getUIValue(),
                    p=profile.properties,
                    item=box._ITEMKEY || 'ITEM',
                    k=box._DIRTYKEY || 'ITEM',
                    getN=function(k,i){return profile.getSubNode(k,i)},
                    getI=function(i){return profile.getSubIdByItemId(i)};
                if(p.selMode=='single'){
                    var itemId = getI(uiv);
                    if(uiv!==null && itemId)
                        getN(k,itemId).tagClass('-checked',false).tagClass('-mouseover',false);

                    itemId = getI(value);
                    if(itemId)
                        getN(k,itemId).tagClass('-checked');

                    //scroll
                    if(itemId){
                        var o = getN(item,itemId);
                        if(o){
                            var items = profile.getSubNode('ITEMS'),
                                offset = o.offset(null, items),
                                top = offset?offset.top:0,
                                height = o.offsetHeight(),
                                sh=items.scrollHeight(),
                                st=items.scrollTop(),
                                hh=items.height();
                            if(sh > hh)
                                if(top<st || (top+height)>(st+hh))
                                    items.scrollTop(top);
                        }
                    }
                }else if(p.selMode=='multi'||p.selMode=='multibycheckbox'){
                    uiv = uiv?uiv.split(p.valueSeparator):[];
                    value = value?value.split(p.valueSeparator):[];
                    //check all
                    _.arr.each(uiv,function(o){
                        getN(k, getI(o)).tagClass('-checked',false).tagClass('-mouseover',false);
                    });
                    _.arr.each(value,function(o){
                        getN(k, getI(o)).tagClass('-checked');
                    });
                }
            });
        },
        _clearMouseOver:function(){
            var box=this.constructor,
                item=box._ITEMKEY || 'ITEM';
            this.getSubNode(item, true).tagClass('-mouseover',false);
        },
        adjustSize:function(){
            return this.each(function(profile){
                var root = profile.getRoot(),
                    items = profile.getSubNode('ITEMS'),
                    pp=profile.properties,h,flag;
                if(root.css('display')=='none'){
                    flag=1;
                    root.css('visibility','hidden');
                }
                if(profile.properties.height!='auto'){
                    items.height('auto');
                    h=Math.min(pp.maxHeight, items.offsetHeight());
                    pp.height=h;
                    items.height(h);
                }else{
                    items.height('auto');
                    h=items.offsetHeight();
                    if(h>pp.maxHeight){
                        items.height(pp.maxHeight);
                        profile.getRoot().height(pp.maxHeight);                        
                    }
                }
                if(flag){
                    root.css('visibility','');
                    root.css('display','none');
                }
                profile.getRoot().height('auto');
            });
        },
        activate:function(){
            return xui.absList.prototype.activate.call(this);
        },
        getShowValue:function(value){
            var profile=this.get(0),
                pro=profile.properties,v,t;
            if(!_.isDefined(value))
                value=pro.$UIvalue;
            if( (v=_.arr.subIndexOf(pro.items,'id',value))!=-1){
                v=pro.items[v].caption;
                v=v.charAt(0)=='$'?xui.getRes(v.slice(1)):v;
            }else
                v='';
            return v;
        },
        _setDirtyMark:function(){
            return arguments.callee.upper.apply(this,['ITEMS']);
        }
    },
    Static:{
        _DIRTYKEY:'ITEM',
        Templates:{
            tagName : 'div',
            style:'{_style}',
            className:'xui-uibg-base {_className}',
            ITEMS:{
               $order:10,
               tagName:'div',
               className:'{_bordertype}',
               text:"{items}"
            },
            $submap:{
                items:{
                    ITEM:{
                        className:'{_itemRow} {itemClass} {disabled} {readonly}',
                        style:'{itemStyle}{_itemDisplay}',
                        tabindex:'{_tabindex}',
                        MARK:{
                            $order:5,
                            style:"{_cbDisplay}"
                        },
                        ICON:{
                            $order:10,
                            className:'xui-ui-icon {imageClass}',
                            style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                        },
                        CAPTION:{
                            text : '{caption}',
                            $order:20
                        },
                        EXTRA:{
                            text : '{ext}',
                            $order:30
                        },
                        TAGCMDS:{
                            $order:40,
                            tagName:'span',
                            text:"{tagCmds}"
                        },
                        OPT:{
                            $order:50
                        }
                    }
                },
                'items.tagCmds':function(profile,template,v,tag,result){
                    var me=arguments.callee,map=me._m||(me._m={'text':'.text','button':'.button','image':'.image'});
                    xui.UI.$doTemplate(profile,template,v,tag+(map[v.type]||'.button'),result)
                },
                'items.tagCmds.text':{
                    CMD:{
                        tagName:"a",
                        title:"{tips}",
                        href:xui.$DEFAULTHREF,
                        style:'{_style}{itemStyle}',
                        className:'{itemClass}',
                        tabindex: '{_tabindex}',
                        text:"{caption}"
                    }
                },
                'items.tagCmds.button':{
                    CMD:{
                        _NativeElement:true,
                        tagName:"button",
                        title:"{tips}",
                        style:'{_style}{itemStyle}',
                        className:'xui-list-cmd {itemClass}',
                        tabindex: '{_tabindex}',
                        text:"{caption}"
                    }
                },
                'items.tagCmds.image':{
                    CMD:{
                        tagName:"image",
                        title:"{tips}",
                        src:"{image}",
                        border:"0",
                        style:'{_style}{itemStyle}',
                        className:'{itemClass}',
                        tabindex: '{_tabindex}',
                        alt:"{caption}"
                    }
                }
            }
        },
        Appearances:{
            KEY:{
                'font-size':'12px'
            },
            EXTRA:{
                display:'none'
            },
            ITEMS:{
                position:'relative',
                overflow:'auto',
                'overflow-x': 'hidden',
                'padding':'1px'
            },
            ITEM:{
                display:'block',
                zoom:xui.browser.ie?1:null,
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                border:0,
                cursor:'pointer',
                'font-size':'12px',
                padding:"2px",
                position:'relative'
            },
            'ITEM-mouseover, ITEM-mousedown, ITEM-checked':{
               'background-image':xui.UI.$bg('item.gif', ''),
               'background-repeat':'repeat-x',
               'border-radius':'3px',
               padding:'1px',
               border:'solid 1px #D9D9D9'
            },
            'ITEM-mouseover':{
                $order:1,
                'background-color':'#FAD200',
                'background-position': 'left -51px'
            },
            'ITEM-mousedown':{
                $order:2,
                'background-color':'#F5D22D',
                'background-position': 'left -101px'
            },
            'ITEM-checked':{
                $order:2,
                'background-color':'#AAD2FA',
                'background-position': 'left top'
            },
            MARK:{
               $order:1,
               cursor:'pointer',
               width:'16px',
               height:'16px',
               'vertical-align':'middle',
               'background-image':xui.UI.$bg('icons.gif', '',true),
               'background-repeat':'no-repeat',
               'background-position':'-20px -70px'
            },
            'ITEM-checked MARK':{
                $order:2,
                'background-position': '0 -70px'
            },
            CAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                padding:'2px'
            },
            OPT:{
                $order:10,
                position:'absolute',
                left:'auto',
                top:'auto',
                right:'2px',
                top:'2px',
                width:'16px',
                height:'16px',
                display:'none',
                'background-image': xui.UI.$bg('icons.gif','', true),
               'background-repeat':'no-repeat',
               'background-position':'-130px -224px'
            },
            'OPT-mouseover':{
                $order:20,
                'background-position':'-130px -244px'
            },
            'OPT-mousedown':{
                $order:30,
                'background-position':'-130px -264px'
            },
            TAGCMDS:{
                position:'relative',
                "padding-right":'4px',
                'vertical-align':'middle',
                zoom:xui.browser.ie?1:null,
                "float":"right"
            },
            CMD:{
                "margin-left":'2px',
                padding:'0 2px',
                'vertical-align':'middle',
                cursor:'pointer'
            }
        },
        Behaviors:{
            HoverEffected:{ITEM:'ITEM', OPT:'OPT'},
            ClickEffected:{ITEM:'ITEM', OPT:'OPT'},
            DraggableKeys:["ITEM"],
            DroppableKeys:["ITEM","ITEMS"],
            onSize:xui.UI.$onSize,
            ITEM:{
                onDblclick:function(profile, e, src){
                    var properties = profile.properties,
                        item = profile.getItemByDom(src);
                    profile.boxing().onDblclick(profile, item, e, src);
                },
                onClick:function(profile, e, src){
                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        itemId =profile.getSubId(src),
                        box = profile.boxing(),
                        ks=xui.Event.getKey(e);
                        
                    if(profile.beforeClick && false===o.boxing().beforeClick(profile,item,e,src))return false;
                        
                    if(properties.disabled|| item.disabled)return false;

                    if(profile.onClick)
                        box.onClick(profile,item,e,src);

                    xui.use(src).focus();

                    switch(properties.selMode){
                    case 'none':
                        box.onItemSelected(profile, item, e, src, 0);
                        break;
                    case 'multibycheckbox':
                        if(properties.readonly|| item.readonly)return false;
                        if(profile.keys.MARK){
                            if(profile.getKey(xui.Event.getSrc(e).id||"")!=profile.keys.MARK){
                                box.onItemSelected(profile, item, e, src, 0);
                                break;
                            }
                        }
                    case 'multi':
                        if(properties.readonly|| item.readonly)return false;
                        var value = box.getUIValue(),
                            arr = value?value.split(properties.valueSeparator):[],
                            checktype=1;

                        if(arr.length&&(ks.ctrlKey||ks.shiftKey||properties.noCtrlKey||properties.$checkbox)){
                            //for select
                            if(ks.shiftKey){
                                var items=properties.items,
                                    i1=_.arr.subIndexOf(items,'id',profile.$firstV.id),
                                    i2=_.arr.subIndexOf(items,'id',item.id),
                                    i;
                                arr.length=0;
                                for(i=Math.min(i1,i2);i<=Math.max(i1,i2);i++)
                                    arr.push(items[i].id);
                            }else{
                                if(_.arr.indexOf(arr,item.id)!=-1){
                                    _.arr.removeValue(arr,item.id);
                                    checktype=-1
                                }else
                                    arr.push(item.id);
                            }

                            arr.sort();
                            value = arr.join(properties.valueSeparator);

                            //update string value only for setCtrlValue
                            if(box.getUIValue() !== value){
                                box.setUIValue(value,null,null,'click');
                                if(box.get(0) && box.getUIValue() == value)
                                    box.onItemSelected(profile, item, e, src, checktype);
                            }
                            break;
                        }
                    case 'single':
                        if(properties.readonly|| item.readonly)return false;
                        if(box.getUIValue() !== item.id){
                            profile.$firstV=item;
                            box.setUIValue(item.id,null,null,'click');
                            if(box.get(0) && box.getUIValue() == item.id)
                                box.onItemSelected(profile, item, e, src, 1);
                        }

                        break;
                    }
                    if(profile.afterClick)box.afterClick(profile,item,e,src);
                },
                onKeydown:function(profile, e, src){
                    var keys=xui.Event.getKey(e), key = keys[0], shift=keys[2],
                    cur = xui(src),
                    first = profile.getRoot().nextFocus(true, true, false),
                    last = profile.getRoot().nextFocus(false, true, false);

                    switch(xui.Event.getKey(e)[0]){
                        case 'tab':
                            if(shift){
                                if(cur.get(0)!=first.get(0)){
                                    first.focus();
                                    return false;
                                }
                            }else{
                                if(cur.get(0)!=last.get(0)){
                                    last.focus();
                                    return false;
                                }
                            }
                            break;
                        case 'left':
                        case 'up':
                            var next = cur.nextFocus(false, true, false);
                            if(cur.get(0)==first.get(0))
                                last.focus();
                            else
                                cur.nextFocus(false);
                            return false;
                            break;
                        case 'right':
                        case 'down':
                            var next = cur.nextFocus(true, false, false);
                            if(cur.get(0)==last.get(0))
                                first.focus();
                            else
                                cur.nextFocus();
                            return false;
                            break;
                        case 'enter':
                            cur.onClick(true);
                            break;
                    }
                },
                onContextmenu:function(profile, e, src){
                    if(profile.onContextmenu)
                        return profile.boxing().onContextmenu(profile, e, src,profile.getItemByDom(src))!==false;
                },
                onMouseover:function(profile, e, src){
                    if(!profile.properties.optBtn)return;
                    profile.getSubNode('OPT',profile.getSubId(src)).setInlineBlock();
                },
                onMouseout:function(profile, e, src){
                    if(!profile.properties.optBtn)return;
                    profile.getSubNode('OPT',profile.getSubId(src)).css('display','none');
                }
            },
            OPT:{
                onClick:function(profile, e, src){
                    if(!profile.properties.optBtn)return;
                    if(profile.onShowOptions){
                        var item = profile.getItemByDom(src);
                        profile.boxing().onShowOptions(profile, item, e, src);
                    }
                    return false;
                },
                onDblclick:function(profile, e, src){
                    return false;
                }
            },
            CMD:{
                onClick:function(profile,e,src){
                    var prop=profile.properties,
                        item=profile.getItemByDom(xui.use(src).parent().get(0));
                    if(!item)return false;

                    if(prop.disabled|| item.disabled)return false;
                    if(profile.onCmd)
                        profile.boxing().onCmd(profile,item, xui.use(src).id().split('_')[1],e,src);
                    return false;
                },
                beforeMousedown:function(){return false;},
                beforeMouseup:function(){return false;}
            }
        },
        DataModel:{
            selMode:{
                ini:'single',
                listbox:['single','none','multi','multibycheckbox'],
                action:function(value){
                    if(!this.box._ITEMMARKED)
                        this.getSubNode('MARK',true).css('display',(value=='multi'||value=='multibycheckbox')?'':'none');
                }  
            },
            borderType:{
                ini:'flat',
                listbox:['none','flat','inset','outset'],
                action:function(v){
                    var ns=this,
                        p=ns.properties,
                        node=ns.getSubNode('ITEMS'),
                        reg=/^xui-uiborder-/,
                        pretag='xui-uiborder-',
                        root=ns.getRoot();
                    node.removeClass(reg);
                    node.addClass(pretag+v);

                    //force to resize
                    xui.UI.$tryResize(ns,root.get(0).style.width,root.get(0).style.height,true);
                }
            },
            noCtrlKey:true,
            width:120,
            height:150,
            maxHeight:420,
            itemRow:{
                ini:false,
                action:function(v){
                    var ns=this.getSubNode('ITEM',true);
                    if(v)ns.addClass('xui-item-row');else ns.removeClass('xui-item-row');
                }
            },
            optBtn:false,
            tagCmds:{
                ini:[],
                action:function(){
                    this.boxing().refresh();
                }
            }
        },
        EventHandlers:{
            onClick:function(profile, item, e, src){},
            onCmd:function(profile,item,cmdkey,e,src){},
            beforeClick:function(profile, item, e, src){},
            afterClick:function(profile, item, e, src){},
            onDblclick:function(profile, item, e, src){},
            onShowOptions:function(profile, item, e, src){},
            onItemSelected:function(profile, item, e, src, type){}
        },
        _onStartDrag:function(profile, e, src, pos){
            var pos=xui.Event.getPos(e);
            xui.use(src).startDrag(e, {
                dragType:'icon',
                shadowFrom:src,
                targetLeft:pos.left+12,
                targetTop:pos.top+12,
                dragCursor:'pointer',
                dragDefer:1,
                dragKey: profile.box.getDragKey(profile, src),
                dragData: profile.box.getDragData(profile, e, src)
            });
            return false;
        },
        _onDropTest:function(profile, e, src, key, data, item){
            var fid=data&&data.domId, tid=xui.use(src).id();
            if(fid){
                if(fid==tid)return false;
                if(_.get(xui.use(src).get(0),['previousSibling','id'])==fid)return false;
            }
        },
        _onDrop:function(profile, e, src, key, data, item){
            xui.DragDrop.setDragIcon('none');

            var k=profile.getKey(xui.use(src).id()),
                po=data.profile,
                ps=data.domId,
                oitem,
                t=xui.absObj.$specialChars,
                uiv=profile.properties.$UIvalue;
            //remove
            oitem=_.clone(po.getItemByDom(ps),function(o,i){return !t[(i+'').charAt(0)]});
            po.boxing().removeItems([oitem.id]);

            if(k==profile.keys.ITEM)
                profile.boxing().insertItems([oitem], item.id, true);
            else
                profile.boxing().insertItems([oitem]);

            if(oitem.id==uiv)
                profile.boxing().setUIValue(oitem.id,true,null,'drop');

            return false;
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            data._bordertype='xui-uiborder-'+data.borderType;
            return data;
        },
        _prepareItem:function(profile, item){
            item._cbDisplay = (profile.properties.selMode=='multi'||profile.properties.selMode=='multibycheckbox')?'':'display:none;';
            item._itemRow = profile.properties.itemRow?'xui-item-row':'';
            this._prepareCmds(profile, item);
        },
        _prepareCmds:function(profile, item){
            var p=profile.properties,
                cmds = item.tagCmds || _.clone(p.tagCmds,true);
            if(cmds && cmds.length){
                var sid=xui.UI.$tag_subId,
                    a=[],c;
                for(var i=0,t=cmds,l=t.length;i<l;i++){
                    if(typeof t[i]=='string')t[i]={id:t[i]};
                    c=t[i];
                    if(!c.caption)c.caption=c.id;
                    c.id=c.id.replace(/[^0-9a-zA-Z]/g,'');
                    if(!c.type)c.type="button";
                    if(c.image)c.image=xui.adjustRes(c.image);
                    c._style="";
                    if('width' in c)c._style+=c.width + (_.isFinite(c.width) &&"px") + ";";
                    if('height' in c)c._style+=c.height + (_.isFinite(c.height) &&"px")+ ";";
                    a.push(c);
                    c[sid]=(item[sid]?( item[sid] + '_'):"") + c.id;
                }
                item.tagCmds=a;
            }
        },
        RenderTrigger:function(){
            if(this.key!="xui.UI.List")return;

            var p=this.properties;
            xui.UI.$doResize(this,p.width,p.height);
        },
        _onresize:function(profile,width,height){
            var pp=profile.properties,
                size=pp.borderType!='none'?2:0,
                dock=pp.dock,
                max=pp.maxHeight;
            if(height){
                profile.getSubNode('ITEMS').height(height=='auto'?height:(height-size));
                if(dock!="fill"&&dock!="cover"&&dock!="height"&&dock!="left"&&dock!="right"){
                    if(profile.getSubNode('ITEMS').height()>max){
                        profile.getSubNode('ITEMS').height(max);
                        profile.getRoot().height('auto');
                    }
                }
            }
            if(width)
                profile.getSubNode('ITEMS').width(width=='auto'?width:(width-size));
        }
    }
});