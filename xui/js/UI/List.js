xui.Class("xui.UI.List", ["xui.UI", "xui.absList","xui.absValue" ],{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                if(!profile.renderId)return;

                var box=profile.box,
                    uiv=profile.boxing().getUIValue(),
                    p=profile.properties,
                    item=box._ITEMKEY || 'ITEM',
                    k=box._DIRTYKEY || 'ITEM',
                    mk='MARK',
                    getN=function(k,i){return profile.getSubNode(k,i)},
                    getI=function(i){return profile.getSubIdByItemId(i)};
                if(p.selMode=='single'){
                    var itemId = getI(uiv);
                    if(uiv!==null && itemId){
                        getN(item,itemId).tagClass('-checked',false).tagClass('-hover',false);
                        getN(mk, itemId).tagClass('-checked',false);
                    }

                    itemId = getI(value);
                    if(itemId){
                        getN(item,itemId).tagClass('-checked');
                        getN(mk,itemId).tagClass('-checked');
                    }

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
                    xui.arr.each(uiv,function(o){
                        getN(item, getI(o)).tagClass('-checked',false).tagClass('-hover',false);
                        getN(mk, getI(o)).tagClass('-checked',false);
                    });
                    xui.arr.each(value,function(o){
                        getN(item, getI(o)).tagClass('-checked');
                        getN(mk, getI(o)).tagClass('-checked');
                    });
                }
            });
        },
        _clearMouseOver:function(){
            var box=this.constructor,
                item=box._ITEMKEY || 'ITEM';
            this.getSubNode(item, true).tagClass('-hover',false);
        },
        adjustSize:function(){
            return this.each(function(profile){
                var root = profile.getRoot(),
                    items = profile.getSubNode('ITEMS'),
                    pp=profile.properties,
                    mh=pp.maxHeight,
                    h_em=profile.$isEm(pp.height),
                    h,flag;

                if(profile.$isEm(mh))mh=profile.$em2px(mh, items,true);

                if(root.css('display')=='none'){
                    flag=1;
                    root.css('visibility','hidden');
                }
                items.height('auto');
                if(profile.properties.height!='auto'){
                    h=Math.min(mh, items.offsetHeight());
                    if(h_em)h=profile.$px2em(h, items)+'em';
                    items.height(pp.height=h);
                }else{
                    h=items.offsetHeight();
                    if(h>mh){
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
            if(!xui.isDefined(value))
                value=pro.$UIvalue;
            if( (v=xui.arr.subIndexOf(pro.items,'id',value))!=-1){
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
            className:'{_className}',
            LABEL:{
                className:'{_required} xui-ui-ellipsis',
                style:'{labelShow};width:{_labelSize};{_labelHAlign};{_labelVAlign}',
                text:'{labelCaption}'
            },
            ITEMS:{
               $order:10,
               tagName:'div',
               className:'xui-uibase {_cmdsalign} {_bordertype} {_itemscls1}',
               text:"{items}"
            },
            $submap:{
                items:{
                    ITEM:{
                        className:'xui-uitembg xui-uiborder-radius xui-showfocus {_itemCls} {_split} {itemClass} {disabled} {readonly}',
                        style:'{itemStyle};{_itemDisplay};',
                        tabindex:'{_tabindex}',
                        LTAGCMDS:{
                            $order:2,
                            tagName:'span',
                            style:'{_ltagDisplay}',
                            text:"{ltagCmds}"
                        },
                        MARK:{
                            $order:5,
                            className:'xuifont',
                            $fonticon:'xui-uicmd-check',
                            style:"{_cbDisplay}"
                        },
                        ICON:{
                            $order:10,
                            className:'xuicon {imageClass}  {picClass}',
                            style:'{backgroundImage}{backgroundPosition}{backgroundSize}{backgroundRepeat}{iconFontSize}{imageDisplay}',
                            text:'{iconFontCode}'
                        },
                        CAPTION:{
                            style:'{_capDisplay}',
                            text : '{caption}',
                            $order:20
                        },
                        EXTRA:{
                            style:'{_extraDisplay}',
                            text : '{ext}',
                            $order:30
                        },
                        RTAGCMDS:{
                            $order:40,
                            tagName:'span',
                            style:'{_rtagDisplay}',
                            text:"{rtagCmds}"
                        },
                        OPT:{
                            $order:50,
                            style:'{_optDisplay}',
                            className:'xuifont',
                            $fonticon:'{_fi_optClass}'
                        }
                    }
                },
                'items.ltagCmds':function(profile,template,v,tag,result){
                    var me=arguments.callee,map=me._m||(me._m={'text':'.text','button':'.button','image':'.image'});
                    xui.UI.$doTemplate(profile,template,v,"items.tagCmds"+(map[v.type]||'.button'),result)
                },
                'items.rtagCmds':function(profile,template,v,tag,result){
                    var me=arguments.callee,map=me._m||(me._m={'text':'.text','button':'.button','image':'.image'});
                    xui.UI.$doTemplate(profile,template,v,"items.tagCmds"+(map[v.type]||'.button'),result)
                },
                'items.tagCmds.text':xui.UI.$getTagCmdsTpl('text'),
                'items.tagCmds.button':xui.UI.$getTagCmdsTpl('button'),
                'items.tagCmds.image':xui.UI.$getTagCmdsTpl('image')
            }
        },
        Appearances:{
            KEY:{
            },
            LABEL:{
               'z-index':1,
               top:0,
               left:0,
               display:xui.browser.isWebKit?'-webkit-flex':'flex',
               position:'absolute',
               'padding-top':'.333em'
            },
            EXTRA:{
                display:'none'
            },
            ITEMS:{
                position:'relative',
                overflow:'auto',
                'overflow-x': 'hidden'
            },
            ITEM:{
                display:'block',
                zoom:xui.browser.ie?1:null,
                cursor:'pointer',
                position:'relative',
                'white-space': 'nowrap'
            },
            MARK:{
               $order:1,
               cursor:'pointer',
               'vertical-align':'middle'
            },
            CAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                padding:'.167em',
                'font-size':'1em',
                'white-space': 'normal'
            },
            OPT:{
                $order:10,
                position:'absolute',
                left:'auto',
                top:'50%',
                'margin-top':'-0.5em',
                right:'.167em',
                display:'none'
            },
            'LTAGCMDS, RTAGCMDS':{
                padding:0,
                margin:0,
                'vertical-align': 'middle'
            },
            'ITEMS-tagcmdleft RTAGCMDS':{
                "padding-right":'.333em',
                "float":"left"
            },
            'ITEMS-tagcmdfloatright RTAGCMDS':{
                "padding-right":'.333em',
                "float":"right"
            }
        },
        Behaviors:{
            HoverEffected:{ITEM:'ITEM', OPT:'OPT',CMD:'CMD',ICON:'ICON'},
            ClickEffected:{ITEM:'ITEM', OPT:'OPT',CMD:'CMD'},
            DraggableKeys:["ITEM"],
            DroppableKeys:["ITEM","ITEMS"],
            ITEM:{
                onContextmenu:function(profile, e, src){
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;
                    if(profile.onItemContextmenu)
                        return profile.boxing().onItemContextmenu(profile, item, e, src);
                },
                onClick:function(profile, e, src){
                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        itemId =profile.getSubId(src),
                        box = profile.boxing(),
                        ks=xui.Event.getKey(e);

                    if(profile.beforeClick && false===box.beforeClick(profile,item,e,src))return false;

                    if(properties.disabled||item.disabled || item.type=='split')return false;


                    if(profile.onItemClick)
                        box.onItemClick(profile, item, e, src);
                    // Override onClick for compatibility
                    else if(profile.onClick){
                        box.onClick(profile, item, e, src);
                        // stop to trigger the top onClick
                        return false;
                    }

                    xui.use(src).focus(true);

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
                                    i1=xui.arr.subIndexOf(items,'id',profile.$firstV.id),
                                    i2=xui.arr.subIndexOf(items,'id',item.id),
                                    i;
                                arr.length=0;
                                for(i=Math.min(i1,i2);i<=Math.max(i1,i2);i++)
                                    arr.push(items[i].id);
                            }else{
                                if(xui.arr.indexOf(arr,item.id)!=-1){
                                    xui.arr.removeValue(arr,item.id);
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
                    if(profile.afterClick)return box.afterClick(profile,item,e,src);
                },
                onDblclick:function(profile, e, src){
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;
                    if(profile.onItemDblclick)
                        return profile.boxing().onItemDblclick(profile, item, e, src);
                    // Override onDblclick for compatibility
                    else if(profile.onDblclick)
                        return profile.boxing().onDblclick(profile, item, e, src);
                },
                onMousedown:function(profile, e, src){
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;
                    if(profile.onItemMousedown)
                        return profile.boxing().onItemMousedown(profile, item, e, src);
                },
                onMouseup:function(profile, e, src){
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;
                    if(profile.onItemMouseup)
                        return profile.boxing().onItemMouseup(profile, item, e, src);
                },
                onMouseover:function(profile, e, src){
                    if(xui.browser.fakeTouch || xui.browser.deviceType == 'touchOnly')return;
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;

                    if(!p.optBtn && !item.optBtn)return;
                    profile.getSubNode('OPT',profile.getSubId(src)).setInlineBlock();

                    if(profile.onItemHover)
                        return profile.boxing().onItemHover(profile, item, true, e, src);
                },
                onMouseout:function(profile, e, src){
                    if(xui.browser.fakeTouch || xui.browser.deviceType == 'touchOnly')return;
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;

                    if(!p.optBtn && !item.optBtn)return;
                    profile.getSubNode('OPT',profile.getSubId(src)).css('display','none');

                    if(profile.onItemHover)
                        return profile.boxing().onItemHover(profile, item, false, e, src);
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
                                    first.focus(true);
                                    return false;
                                }
                            }else{
                                if(cur.get(0)!=last.get(0)){
                                    last.focus(true);
                                    return false;
                                }
                            }
                            break;
                        case 'left':
                        case 'up':
                            var next = cur.nextFocus(false, true, false);
                            if(cur.get(0)==first.get(0))
                                last.focus(true);
                            else
                                cur.nextFocus(false);
                            return false;
                            break;
                        case 'right':
                        case 'down':
                            var next = cur.nextFocus(true, false, false);
                            if(cur.get(0)==last.get(0))
                                first.focus(true);
                            else
                                cur.nextFocus();
                            return false;
                            break;
                        case 'enter':
                            cur.onClick(true);
                            break;
                    }
                }
            },
            OPT:{
                onClick:function(profile, e, src){
                    if(profile.onShowOptions){
                        var item = profile.getItemByDom(src);
                        if(!item)return;
                        if(!profile.properties.optBtn && !item.optBtn)return;
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

                    if(prop.disabled|| item.disabled || item.type=='split')return false;
                    if(profile.onCmd)
                        profile.boxing().onCmd(profile,item, xui.use(src).id().split('_')[1],e,src);
                    return false;
                }
            },
            LABEL:{
                onClick:function(profile, e, src){
                    if(profile.properties.disabled)return false;
                    if(profile.onLabelClick)
                        return profile.boxing().onLabelClick(profile, e, src);
                },
                onDblClick:function(profile, e, src){
                    if(profile.properties.disabled)return false;
                    if(profile.onLabelDblClick)
                        return profile.boxing().onLabelDblClick(profile, e, src);
                },
                onMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!='left')return;
                    if(profile.properties.disabled)return false;
                     if(profile.onLabelActive)
                        return profile.boxing().onLabelActive(profile, e, src);
                }
            }
        },
        DataModel:{
            lite:{
                'private':1,
                ini:false,
                action: function(value){
                    this.boxing().refresh();
                }
            },
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
                    ns.adjustSize();
                }
            },
            noCtrlKey:true,
            width:{
                $spaceunit:1,
                ini:'10em'
            },
            height:{
                $spaceunit:1,
                ini:'15em'
            },
            maxHeight:420,
            itemRow:{
                ini:'',
                combobox:["row","cell"],
                action:function(v){
                    var ns=this.getSubNode('ITEM',true);
                    ns.removeClass(/xui-item-[\w]+/);
                    if(v)ns.addClass('xui-item-'+(v||'row'));
                }
            },
            optBtn:{
                ini:"",
                combobox:xui.toArr("xui-uicmd-opt,xui-icon-singleright"),
                action:function(){
                    this.boxing().refresh();
                }
            },
            tagCmds:{
                ini:[],
                action:function(){
                    this.boxing().refresh();
                }
            },
            tagCmdsAlign:{
                ini:"right",
                listbox:['left','right','floatright'],
                action:function(v){
                    var profile=this,box=profile.getSubNode("ITEMS"),cls=profile.getClass('ITEMS','-tagcmd');
                    box.removeClass(new RegExp(cls+'[\w]*')).addClass(profile.getClass('ITEMS','-tagcmd'+v));
                }
            },
            // label
            labelSize:{
                $spaceunit:2,
                ini:0,
                action: function(v){
                    this.getSubNode('LABEL').css({display:v?'':'none'});
                    xui.UI.$tryResize(this,this.properties.width,this.properties.height,true);
                }
            },
            labelPos:{
                ini:"left",
                listbox:['none','left','top', 'right', 'bottom'],
                action: function(v){
                    xui.UI.$tryResize(this,this.properties.width,this.properties.height,true);
                }
            },
            labelGap:{
                $spaceunit:2,
                ini:4,
                action: function(v){
                    xui.UI.$tryResize(this,this.properties.width,this.properties.height,true);
                }
            },
            labelCaption:{
                ini:"",
                action: function(v){
                    v=(xui.isSet(v)?v:"")+"";
                    this.getSubNode('LABEL').html(xui.adjustRes(v,true));
                }
            },
            labelHAlign:{
                ini:'right',
                listbox:['','left','center','right'],
                action: function(v){
                    this.getSubNode('LABEL').css({
                        'textAlign': v||'',
                        'justifyContent':v=='right'?'flex-end':v=='center'?'center':v=='left'?'flex-start':''
                    });
                }
            },
            labelVAlign:{
                ini:'top',
                listbox:['','top','middle','bottom'],
                action: function(v){
                    this.getSubNode('LABEL').css('align-items',v=='bottom'?'flex-end':v=='middle'?'center':v=='top'?'flex-start':'');
                }
            },
            isFormField:{
                ini:false
            }
        },
        EventHandlers:{
            onCmd:function(profile,item,cmdkey,e,src){},
            beforeClick:function(profile, item, e, src){},
            afterClick:function(profile, item, e, src){},
            onShowOptions:function(profile, item, e, src){},
            onItemSelected:function(profile, item, e, src, type){},

            onLabelClick:function(profile, e, src){},
            onLabelDblClick:function(profile, e, src){},
            onLabelActive:function(profile, e, src){},

            onInitList:function(profile, callback){}
        },
        _onStartDrag:function(profile, e, src, pos){
            var pos=xui.Event.getPos(e);
            xui.use(src).startDrag(e, {
                dragSource:profile.$xid,
                dragType:'icon',
                shadowFrom:src,
                targetLeft:pos.left+12,
                targetTop:pos.top+12,
                dragCursor:'pointer',
                dragDefer:2,
                dragKey: profile.box.getDragKey(profile, src),
                dragData: profile.box.getDragData(profile, e, src)
            });
            return false;
        },
        _onDropTest:function(profile, e, src, key, data, item){
            var fid=data&&data.domId, tid=xui.use(src).id();
            if(fid){
                if(fid==tid)return false;
                if(xui.get(xui.use(src).get(0),['previousSibling','id'])==fid)return false;
            }
        },
        _onDrop:function(profile, e, src, key, data, item){
            var k=profile.getKey(xui.use(src).id()),
                po=data.profile,
                ps=data.domId,
                oitem,
                t=xui.absObj.$specialChars,
                uiv=profile.properties.$UIvalue;
            //remove
            oitem=xui.clone(po.getItemByDom(ps),function(o,i){return !t[(i+'').charAt(0)]});
            po.boxing().removeItems([oitem.id]);

            if(k==profile.keys.ITEM)
                profile.boxing().insertItems([oitem], item.id, true);
            else
                profile.boxing().insertItems([oitem]);

            if(oitem.id==uiv)
                profile.boxing().setUIValue(oitem.id,true,null,'drop');

            data._new = oitem;
            return false;
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile),t,v;
            d._bordertype='xui-uiborder-'+d.borderType;
            d._labelHAlign = 'text-align:'+(v=d.labelHAlign||'')+';justify-content:'+(v=='right'?'flex-end':v=='center'?'center':v=='left'?'flex-start':'');
            d._labelVAlign = 'align-items:'+((v=d.labelVAlign)=='bottom'?'flex-end':v=='middle'?'center':v=='top'?'flex-start':'');
            d.labelShow=d.labelPos!='none'&&d.labelSize&&d.labelSize!='auto'?"":"display:none";
            d._labelSize=d.labelSize?'':0+profile.$picku();
            // adjustRes for labelCaption
            if(d.labelCaption)
                d.labelCaption=xui.adjustRes(d.labelCaption,true);
            d._cmdsalign=profile.getClass('ITEMS','-tagcmd'+profile.properties.tagCmdsAlign);
            return d;
        },
        _prepareItem:function(profile, item){
            var p=profile.properties,m=p.selMode,t;
            item._cbDisplay = (m=='multi'||m=='multibycheckbox')?'':'display:none;';
            item._itemCls = (t=profile.properties.itemRow)?('xui-item-'+t):'';
            if(p.lite) item._itemCls += " xui-ui-clear-size ";
            if(xui.browser.fakeTouch || xui.browser.deviceType !== 'mouseOnly'){
                item._optDisplay = p.optBtn?'display:block;':'';
            }

            item._fi_optClass = p.optBtn;

            if(item.type=='split'){
                item._split='xui-uitem-split';
                item._ltagDisplay=item._rtagDisplay=item.imageDisplay=item._cbDisplay=item._capDisplay=item._extraDisplay=item._optDisplay='display:none;';
            }
            this._prepareCmds(profile, item);
        },
        _dynamicTemplate:function(profile){
            var prop = profile.properties,t,
                hash = profile._exhash = "$" +'lite:'+prop.lite,
                template = profile.box.getTemplate(hash);

            prop.$UIvalue = prop.value;

            // set template dynamic
            if(!template){
                template = xui.clone(profile.box.getTemplate());
                if(prop.lite){
                    delete template.LABEL;
                    t= template.$submap.items;
                    t.ITEM = {
                        className:t.ITEM.className,
                        style:t.ITEM.style,
                        tabindex:t.ITEM.tabindex,
                        text : '{caption}'
                    };
                }
                // set template
                profile.box.setTemplate(template, hash);
            }
            profile.template = template;
        },
        RenderTrigger:function(){
            if(this.key!="xui.UI.List")return;

            var p=this.properties;
            xui.UI.$tryResize(this,p.width,p.height);
        },
        _syncResize:true,
        _onresize:function(profile,width,height){
            var prop=profile.properties,
                // compare with px
                us = xui.$us(profile),
                adjustunit = function(v,emRate){return profile.$forceu(v, us>0?'em':'px', emRate)},
                root = profile.getRoot(),
                cb=xui.browser.contentBox,

                f=function(k){return profile.getSubNode(k)},
                items = f('ITEMS'),
                label = f('LABEL'),

                fzrate=profile.getEmSize()/root._getEmSize(),
                itemsfz=items._getEmSize(fzrate),
                labelfz=label._getEmSize(fzrate),

                border=!cb?0:prop.borderType!='none'?items._borderW():0,
                dock=prop.dock,
                max=prop.maxHeight,

                labelPos=prop.labelPos,
                labelSize=(labelPos=='none'||!labelPos)?0:profile.$px(prop.labelSize,labelfz)||0,
                labelGap=(labelPos=='none'||!labelPos)?0:profile.$px(prop.labelGap)||0,
                ll, tt, ww, hh;

            // caculate by px
            if(width && width!='auto')width = profile.$px(width);
            if(height && height!='auto')height = profile.$px(height);

            items.cssRegion({
                left : adjustunit(ll = labelPos=='left'?labelSize:0, itemsfz),
                top : adjustunit(tt = labelPos=='top'?labelSize:0, itemsfz),
                width : adjustunit(ww = width===null?null:width=='auto'?width:Math.max(0,(width - (!cb?0:items._paddingW('both')) - ((labelPos=='left'||labelPos=='right')?labelSize:0) - border)), itemsfz),
                height : adjustunit(hh = height===null?null:height=='auto'?height:Math.max(0,(height - (!cb?0:items._paddingH('both')) - ((labelPos=='top'||labelPos=='bottom')?labelSize:0)- border)), itemsfz)
            });


            if(height=="auto"){
                if(dock!="fill"&&dock!="cover"&&dock!="height"&&dock!="left"&&dock!="right"){
                    if(items.height()>max){
                        items.height(adjustunit(max, itemsfz));
                        root.height('auto');
                    }
                }
            }
            if(labelSize){
                if(width=='auto')ww=items.offsetWidth();
                if(height=='auto')hh=items.offsetHeight();
                label.cssRegion({
                    left: adjustunit(width===null?null:Math.max(0,labelPos=='right'?((width=='auto'?ww:(width-labelSize))+labelGap):0),labelfz),
                    top:  adjustunit(height===null?null:Math.max(0,labelPos=='bottom'?((height=='auto'?hh:(height-labelSize))+labelGap):0),labelfz),
                    width: adjustunit(width===null?null:Math.max(0,((labelPos=='left'||labelPos=='right')?(labelSize-labelGap):(width=='auto'?ww:width))),labelfz),
                    height: adjustunit(height===null?null:Math.max(0,((labelPos=='top'||labelPos=='bottom')?(labelSize-labelGap):(height=='auto'?hh:height))),labelfz)
                });
            }
        }
    }
});