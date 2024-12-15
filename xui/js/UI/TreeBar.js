xui.Class("xui.UI.TreeBar",["xui.UI","xui.absList","xui.absValue"],{
    $Start:function(t){
        if(t=this.Static.RenderTrigger)t.$order = -1;
    },
    Instance:{
        _setCtrlValue:function(value, flag){
            return this.each(function(profile){
                if(!profile.renderId)return;

                var box = profile.boxing(),
                    uiv = box.getUIValue(),
                    properties = profile.properties,
                    fun=function(key,o,b){
                        profile.getSubNodeByItemId(key, o).tagClass('-checked', b);
                    },
                    selmode=properties.selMode
                    ;
                if(selmode=='single'){
                    var itemId = profile.getSubIdByItemId(uiv);
                    if(uiv && itemId)
                        fun('BAR', uiv, false);

                    itemId = profile.getSubIdByItemId(value);
                    if(itemId){
                        fun('BAR', value, true);
                        //scroll
                        if(!profile._noScroll){
                            var o = profile.getSubNode('ITEM',itemId);
                            if(o){
                                var items = profile.getSubNode('BOX'),
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
                    }
                }else if(selmode=='multi'||selmode=='multibycheckbox'){
                    uiv = uiv?uiv.split(properties.valueSeparator):[];
                    value = value?value.split(properties.valueSeparator):[];
                    if(flag){
                        xui.arr.each(value,function(o){
                            fun('BAR', o);
                            fun('MARK', o);
                        });
                    }else{
                        //check all
                        xui.arr.each(uiv,function(o){
                            fun('BAR', o, false);
                            fun('MARK', o, false);
                        });
                        xui.arr.each(value,function(o){
                            fun('BAR', o);
                            fun('MARK', o);
                        });
                    }
                }
            });
        },
        insertItems:function(arr, pid/*true: the current item*/, base/*true: the current item*/,before, toggle){
            var node,data,v,
                b=this._afterInsertItems;

            return this.each(function(profile){
                // prepare properties format
                var tar,r,k,newsub,
                    prop=profile.properties;

                data=profile.box._adjustItems(arr);

                // current
                if(pid===true){
                    v=prop.$UIvalue||prop.value;
                    if(v)v=(v+'').split(prop.valueSeparator);
                    k=v&&v.length&&profile.getItemByItemId(v[0]);
                    pid=k?k.id:null;
                }

                if(xui.isSet(pid)){
                    k=profile.getItemByItemId(pid);
                    if(!k){
                        // no parent
                        return;
                    }
                    tar = xui.isArr(k.sub)?k.sub:(newsub=true, k.sub= []);
                }else{
                    k=prop;
                    tar = k.items ||(k.items=[])
                }
                //1
                if(profile.renderId){
                    if(base===true){
                        v=prop.$UIvalue||prop.value;
                        if(v)v=(v+'').split(prop.valueSeparator);
                        k=v&&v.length&&profile.getItemByItemId(v[0]);
                        base=k?k.id:null;
                    }
                    if(base){
                        node=profile.getSubNodeByItemId('ITEM', base);
                        if(node && node.get(0)){
                            r=profile._buildItems('items', profile.box._prepareItems(profile, data, pid));
                            if(before)
                                node.addPrev(r);
                            else
                                node.addNext(r);
                        }
                    }else{
                        if(xui.isSet(pid)){
                            if(newsub){
                                profile.getSubNodeByItemId('TOGGLE', pid)
                                    .removeClass('xui-icon-placeholder xui-uicmd-none')
                                    .addClass('xui-uicmd-toggle');
                            }
                            if(k._inited){
                                node=profile.getSubNodeByItemId('SUB', pid);
                            }
                        }
                        else
                            node=profile.getSubNode('ITEMS');

                        if(node && node.get(0)){
                            r=profile._buildItems('items', profile.box._prepareItems(profile, data, pid));
                            if(before)
                                node.prepend(r);
                            else
                                node.append(r);
                        }
                    }
                }
                //2
                //must be here
                if(!base)
                    xui.arr.insertAny(tar,data, before?0:-1);
                else{
                    var index = xui.arr.subIndexOf(tar, 'id', base);
                    xui.arr.insertAny(tar,data, before?index:(index+1));
                }
                //3
                if(profile.renderId && toggle!==false){
                    // try to open root subs
                    if(!xui.isSet(pid)){
                        profile.boxing()._toggleNodes(data, true, true, true);
                    }
                    // try to open parent node
                    else if (profile.getItemByItemId(pid)._inited){
                        if(!(('iniFold' in k)?k.iniFold:profile.properties.iniFold))
                            profile.boxing()._toggleNodes(data, true, true, true);
                    }
                }

                if(b && profile.renderId)
                    profile.boxing()._afterInsertItems(profile, data, pid, base, before);

                if(profile.renderId && xui.isSet(pid)){
                    profile.box._tofold(profile,k,pid);
                }

            });
        },
        _toggleNodes:function(items, expand, recursive, init){
            var self=this,prf=self.get(0),pro=prf.properties,
                f=function(items,expand,recursive,init){
                    if(xui.isArr(items)){
                        xui.arr.each(items,function(o){
                            if(init && (xui.isBool(o.iniFold)?o.iniFold:pro.iniFold))return;
                            self.toggleNode(o.id, expand, false, recursive);
                            if(recursive && o.sub && xui.isArr(o.sub) && o.sub.length)
                                f(o.sub,expand,true,init);
                        });
                    }
                };
            f(items,expand,recursive,init);
            return self;
        },
        /*
        *expand:true->expand false->fold
        *recursive:true open recursively
        */
        toggleNode:function(id, expand, recursive, stopanim, callback){
            var profile=this.get(0),ns=this,self=arguments.callee;
            if(xui.isSet(id)){
                var o=profile.getItemByItemId(id);
                if(o && o.sub && (!xui.isSet(expand) || !!expand !== !!o._checked))
                    profile.box._setSub(profile, o, xui.isSet(expand) ?!!expand:!o._checked, recursive, stopanim||recursive, callback);
            }else{
                xui.arr.each(profile.properties.items,function(item){
                    if(item.sub)self.call(ns,item.id,expand,recursive);
                })
            }
            return this;
        },
        /*
        *open to deep node
        */
        openToNode:function(id, triggerEvent, stopanim, intoView, callback){
            return this.each(function(profile){
                var res=false, a=[];
                var fun=function(arr, catId, layer){
                        layer = layer || 0;
                        xui.arr.each(arr,function(o){
                            if(o.id==catId){
                                a.push(o);
                                res=true;
                                return false;
                            }
                            if(o.sub && xui.isArr(o.sub)){
                                res = fun.call(null, o.sub, catId, ++layer);
                                if(res){
                                    a.push(o);
                                    return false;
                                }
                            }
                        });
                        return res;
                    };
                fun.call(null, profile.properties.items, id);
                if(res){
                    a.reverse();
                    xui.arr.each(a,function(o,i){
                        if(o.sub){
                            profile.boxing().toggleNode(o.id,true,false, stopanim);
                            // for the last one, trigger its onclick event
                            if(triggerEvent!==false &&  i==a.length-1 && !(o.hasOwnProperty('group')?o.group:profile.properties.group))
                                profile.boxing().fireItemClickEvent(o.id);
                        }else if(triggerEvent!==false){
                            profile.boxing().fireItemClickEvent(o.id);
                        }
                        if(intoView&&(i==a.length-1 || o.sub)){
                            profile.boxing().getSubNode("BAR",o.id).scrollIntoView();
                            xui.tryF(callback);
                        }
                    });
                }else{
                  xui.tryF(callback);
                }
            });
        },
        isSubInited:function(id){
            var item=this.getItemByItemId(id);
            return item && item.sub && xui.isArr(item.sub);
        }
    },
    Static:{
        _scrollItemKey:"ITEM",
        _focusNodeKey:'BAR',
        Templates:{
            tagName : 'div',
            style:'{_style}',
            className:'{_className}',
            //ondrag:'return false',
            //onselectstart:'return false',
            BORDER:{
                tagName : 'div',
                className:"xui-uibase",
                BOX:{
                    tagName : 'div',
                    //onselectstart:'return false',
                    ITEMS:{
                        tagName : 'div',
                        className:'{_cmdsalign}',
                        text:"{items}"
                    }
                }
            },
            $submap:{
                items:{
                    ITEM:{
                        className:'',
                        style:'{_itemDisplay}',
                        tagName : 'div',
                        BAR:{
                            $order:0,
                            tabindex: '{_tabindex}',
                            className:'xui-uitembg  xui-showfocus  {itemClass} {cls_group} {cls_fold} {_split} {disabled} {readonly}',
                            style:'{itemStyle};{_splitstyle}',
                            RULER:{
                                $order:2,
                                style:'{_ruleDisplay};{rulerStyle}',
                                text:'{innerIcons}'
                            },
                            TOGGLE:{
                                $order:3,
                                style:'{_tglDisplay}',
                                className:'xuifont',
                                $fonticon:'{_fi_togglemark}'
                            },
                            LTAGCMDS:{
                                $order:4,
                                tagName:'span',
                                style:'{_ltagDisplay}',
                                text:"{ltagCmds}"
                            },
                            MARK:{
                                $order:5,
                                className:'xuifont',
                                $fonticon:'xui-uicmd-check',
                                style:'{mark2Display}'
                            },
                            ITEMICON:{
                                $order:6,
                                className:'xuicon {imageClass} {picClass}',
                                style:'{backgroundImage}{backgroundPosition}{backgroundSize}{backgroundRepeat}{iconFontSize}{imageDisplay}',
                                text:'{iconFontCode}'
                            },
                            ITEMCAPTION:{
                                text : '{caption}',
                                style:'{_capDisplay}',
                                className:"{disabled}  {readonly}",
                                $order:7
                            },
                            EXTRA:{
                                style:'{_extraDisplay}',
                                text : '{ext}',
                                $order:8
                            },
                            RTAGCMDS:{
                                $order:9,
                                tagName:'span',
                                style:'{_rtagDisplay}',
                                text:"{rtagCmds}"
                            },
                            OPT:{
                                $order:10,
                                style:'{_optDisplay}',
                                className:'xuifont',
                                $fonticon:'{_fi_optClass}'
                            }
                        },
                        SUB:{
                            $order:1,
                            tagName : 'div',
                            text:xui.UI.$childTag
                        }
                    }
                },
                'items.ltagCmds':function(profile,template,v,tag,result){
                    var me=arguments.callee,map=me._m||(me._m={'text':'.text','button':'.button','image':'.image'});
                    xui.UI.$doTemplate(profile,template,v,'items.tagCmds'+(map[v.type]||'.button'),result)
                },
                'items.rtagCmds':function(profile,template,v,tag,result){
                    var me=arguments.callee,map=me._m||(me._m={'text':'.text','button':'.button','image':'.image'});
                    xui.UI.$doTemplate(profile,template,v,'items.tagCmds'+(map[v.type]||'.button'),result)
                },
                'items.tagCmds.text':xui.UI.$getTagCmdsTpl('text'),
                'items.tagCmds.button':xui.UI.$getTagCmdsTpl('button'),
                'items.tagCmds.image':xui.UI.$getTagCmdsTpl('image')
            }
        },
        Appearances:{
            KEY: {
                'border':0
            },
            EXTRA:{
                display:'none'
            },
            BOX:{
                left:0,
                overflow: 'auto',
                'overflow-x': 'hidden',
                position:'relative',
                clear:"both"
            },
            ITEMS:{
                overflow: 'hidden'
            },
            ITEM:{
                'white-space': 'nowrap',
                position:'relative',
                overflow:'hidden'
            },
            BAR:{
               cursor:'pointer',
               zoom:xui.browser.ie?1:null,
               position:'relative',
               display:'block',
               overflow: 'hidden',
               padding:'.25em .5em',
                'border-radius': '.3px 0 0 3px',
                '-moz-border-radius': '3px 0 0 3px',
                '-webkit-border-radius': '3px 0 0 3px',
                '-o-border-radius': '3px 0 0 3px',
                '-ms-border-radius': '3px 0 0 3px',
                '-khtml-border-radius': '3px 0 0 3px',

               'outline-offset':'-1px',
               '-moz-outline-offset':(xui.browser.gek && xui.browser.ver<3)?'-1px !important':null
            },
            SUB:{
                overflow:'hidden',
                zoom:xui.browser.ie?1:null,
                height:0,
                'font-size':xui.browser.ie68?'1px':null,
                //1px for ie8
                'line-height':xui.browser.ie68?'1px':null,
                position:'relative',
                'margin-left':'1.75em'
            },
            MARK:{
               cursor:'pointer',
               'vertical-align':'middle'
            },
            'BAR-group':{
                $order:4,
                border:'none'
            },
            ITEMCAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                padding:'.167em',
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
            },
            'ITEMS-tagcmdtopright RTAGCMDS':{
                "top":'-.25em',
                "right":'-.5em',
                "position":"absolute"
            },
            TOGGLE:{
                padding:'0 .334em 0 0'
            }
        },
        Behaviors:{
            HoverEffected:{TOGGLE:'TOGGLE', BAR:'BAR',OPT:'OPT',CMD:'CMD'},
            ClickEffected:{TOGGLE:'TOGGLE', BAR:'BAR',OPT:'OPT',CMD:'CMD'},
            DraggableKeys:["BAR"],
            NoDraggableKeys:['TOGGLE'],
            DroppableKeys:["BAR","TOGGLE","BOX"],
            TOGGLE:{
                onClick:function(profile, e, src){
                    var properties = profile.properties,
                        domId=xui.use(src).id(),
                        item = profile.getItemByDom(domId);

                    if(properties.disabled || item.disabled)return false;
                    if(!('sub' in item))return false;
                    profile.box._setSub(profile, item, !item._checked);

                    // not to fire BAR's onclick event;
                    return false;
                }
            },
            BAR:{
                onContextmenu:function(profile, e, src){
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;
                    if(profile.onItemContextmenu)
                        return profile.boxing().onItemContextmenu(profile, item, e, src);
                },
                onClick:function(profile, e, src){
                    return profile.box._onclickbar(profile,e,src);
                },
                onDblclick:function(profile, e, src){
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;

                    var rtn;
                    if(profile.onItemDblclick)
                        rtn=profile.boxing().onItemDblclick(profile, item, e, src);
                    // Override onDblclick for compatibility
                    else if(profile.onDblclick)
                        rtn=profile.boxing().onDblclick(profile, item, e, src);

                    if(item.sub && rtn!==false){
                        profile.getSubNode('TOGGLE',profile.getSubId(src)).onClick();
                    }
                },
                onMousedown:function(profile, e, src){
                    var p = profile.properties,item = profile.getItemByDom(src);
                    if(p.disabled || !item || item.disabled)return;
                    if(profile.onItemMousedown)
                        return profile.boxing().onItemMousedown(profilonItemMousedown, item, e, src);
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
                    return profile.box._onkeydownbar(profile,e,src);
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

                    if(prop.disabled|| item.disabled|| item.type=='split')return false;
                    if(profile.onCmd)
                        profile.boxing().onCmd(profile,item, xui.use(src).id().split('_')[1],e,src);
                    return false;
                }
            },
            BOX:{
                onScroll:function(profile, e, src){
                    //for ie 'href focus' will scroll view
                    if((e=xui.use(src)).scrollLeft()!==0)
                        e.scrollLeft(0);
                }
            }
        },
        EventHandlers:{
            onShowOptions:function(profile, item, e, src){},
            beforeClick:function(profile, item, e, src){},

            afterClick:function(profile, item, e, src){},
            onCmd:function(profile,item,cmdkey,e,src){},

            onGetContent:function(profile, item, callback){},
            onItemSelected:function(profile, item, e, src, type){},

            beforeFold:function(profile,item){},
            beforeExpand:function(profile,item){},
            afterFold:function(profile,item){},
            afterExpand:function(profile,item){},

            onInitList:function(profile, callback){}
        },
        DataModel:{
            listKey:null,
            isFormField:{
                hidden:true,
                ini:false
            },

            width:{
                $spaceunit:1,
                ini:'18em'
            },
            height:{
                $spaceunit:1,
                ini:'18em'
            },
            iniFold:true,
            animCollapse:true,
            dock:'fill',
            group:{
                ini:false,
                action:function(v){
                    var self = this,
                        items = self.properties.items,
                        results = self.queryItems(items, function(o){return o.sub && o.group===undefined }),
                        nodes=xui();
                    xui.arr.each(results,function(o){
                        nodes.merge( self.getSubNodeByItemId('BAR', o.id) );
                    });
                    if(v)
                       nodes.addClass('xui-uigradient xui-uibar ' + self.getClass('BAR','-group'));
                    else
                       nodes.removeClass('xui-uigradient xui-uibar ' + self.getClass('BAR','-group'));
                }
            },
            selMode:{
                ini:'single',
                listbox:['single','none','multi','multibycheckbox'],
                action:function(value){
                    var ns=this,p=this.properties,sels=[];
                    xui.each(this.SubSerialIdMapItem,function(o){
                        if(!(o.sub && (o.hasOwnProperty('group')?o.group:p.group)))
                            sels.push(ns.getSubNodeByItemId('MARK',o.id).get(0));
                    });
                    xui(sels).css('display',(value=='multi'||value=='multibycheckbox')?'':'none');
                }
            },
            noCtrlKey:true,
            singleOpen:false,
            dynDestory:false,
            position:'absolute',
            optBtn:{
                ini:"",
                combobox:xui.toArr("xui-uicmd-opt,xui-icon-singleright"),
                action:function(){
                    this.boxing().refresh();
                }
            },
            togglePlaceholder:false,
            tagCmds:{
                ini:[],
                action:function(){
                    this.boxing().refresh();
                }
            },
            tagCmdsAlign:{
                ini:"right",
                listbox:['left','right','floatright','topright'],
                action:function(v){
                    var profile=this,box=profile.getSubNode("ITEMS"),cls=profile.getClass('ITEMS','-tagcmd');
                    box.removeClass(new RegExp(cls+'[\w]*')).addClass(profile.getClass('ITEMS','-tagcmd'+v));
                }
            }
        },
        RenderTrigger:function(){
            this.boxing()._toggleNodes(this.properties.items, true, true, true);
        },
        _onclickbar:function(profile, e, src){
            var properties = profile.properties,
                domId=xui.use(src).id(),
                item = profile.getItemByDom(domId),
                itemId =profile.getSubId(domId),
                box = profile.boxing(),
                ks = xui.Event.getKey(e),
                sk = profile.getKey(xui.Event.getSrc(e).id||""),
                ignoreClick = sk==profile.keys.TOGGLE||sk==profile.keys.MARK;

            if(!ignoreClick && profile.beforeClick && false===box.beforeClick(profile,item,e,src))return false;

            if(properties.disabled|| item.disabled|| item.type=='split')return false;

            if(!ignoreClick){
                if(profile.onItemClick)
                    box.onItemClick(profile,item,e,src);
                // Override onClick for compatibility
                else if(profile.onClick)
                    box.onClick(profile,item,e,src);
            }

            //group not fire event
            if(item.sub && (item.hasOwnProperty('group')?item.group:properties.group)){
                profile.getSubNode('TOGGLE', itemId).onClick();
                return;
            }

            profile.getSubNode(profile.box._focusNodeKey, itemId).focus(true);

            switch(properties.selMode){
            case 'none':
                box.onItemSelected(profile, item, e, src, 0);
                break;
            case 'multibycheckbox':
                if(properties.readonly|| item.readonly)return false;
                if(profile.keys.MARK){
                    if(sk!=profile.keys.MARK){
                        box.onItemSelected(profile, item, e, src, 0);
                        break;
                    }
                }
            case 'multi':
                if(properties.readonly|| item.readonly)return false;
                var value = box.getUIValue(),
                    arr = value?value.split(properties.valueSeparator):[],
                    checktype=1;
                if(arr.length&&(ks.ctrlKey||ks.shiftKey||properties.noCtrlKey)){
                    if(ks.shiftKey){
                        if(profile.$firstV._pid!=item._pid)return;
                        var items=properties.items;
                        if(item._pid){
                            var pitem=profile.getItemByItemId(item._pid);
                            if(pitem)items=pitem.sub;
                        }
                        var i1=xui.arr.subIndexOf(items,'id',profile.$firstV.id),
                            i2=xui.arr.subIndexOf(items,'id',item.id),
                            i;
                        arr.length=0;
                        for(i=Math.min(i1,i2);i<=Math.max(i1,i2);i++)
                            arr.push(items[i].id);
                    }else{
                        if(xui.arr.indexOf(arr,item.id)!=-1){
                            xui.arr.removeValue(arr,item.id);
                            checktype=-1;
                        }else
                            arr.push(item.id);
                    }
                    arr.sort();
                    value = arr.join(properties.valueSeparator);

                    //update string value only for _setCtrlValue
                    if(box.getUIValue() != value){
                        profile._noScroll=1;
                        box.setUIValue(value,null,null,'click');
                        delete profile._noScroll;
                        if(box.get(0) && box.getUIValue() == value)
                            box.onItemSelected(profile, item, e, src, checktype);
                    }
                    break;
                }
            case 'single':
                if(box.getUIValue() != item.id){
                    profile.$firstV=item;
                    profile._noScroll=1;
                    box.setUIValue(item.id,null,null,'click');
                    delete profile._noScroll;
                    if(box.get(0) && box.getUIValue() == item.id)
                        box.onItemSelected(profile, item, e, src, 1);
                }
                break;
            }
            if(!ignoreClick && profile.afterClick)box.afterClick(profile,item,e,src);
            return !ignoreClick;
        },
        _onkeydownbar:function(profile, e, src){
            var keys=xui.Event.getKey(e), key = keys.key, shift=keys.shiftKey, ctrl=keys.ctrlKey,
                cur = profile.getSubNode(profile.box._focusNodeKey, profile.getSubId(src)),
                root = profile.getRoot(),
                first = root.nextFocus(true, true, false),
                last = root.nextFocus(false, true, false);

            switch(key){
                case 'enter':
                    cur.onClick();
                    break;
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
                case 'up':
                    if(ctrl){
                        profile.getSubNode('TOGGLE',profile.getSubId(src)).onClick();
                        return false;
                    }
                    if(cur.get(0)==first.get(0))
                        last.focus(true);
                    else
                        cur.nextFocus(false, true, false).focus(true);
                     return false;
                     break;
                case 'down':
                    if(ctrl){
                        profile.getSubNode('TOGGLE',profile.getSubId(src)).onClick();
                        return false;
                    }
                     if(cur.get(0)==last.get(0))
                        first.focus(true);
                     else
                        cur.nextFocus(true, false, false).focus(true);
                     return false;
                     break;
                case 'right':
                case 'left':
                    profile.getSubNode('TOGGLE',profile.getSubId(src)).onClick();
                    return false;
            }
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
            var fid=data&&data.domId;
            if(fid){
                var tid=xui.use(src).id();
                // stop to self
                if(fid==tid)return false;
                // stop to the next
                if(xui.get(xui.use(src).get(0),['parentNode','previousSibling','firstChild','id'])==fid)return false;
                // stop to descendants
                var p=xui.use(src).get(0),
                    rn=profile.getRootNode();
                // stop children
                if(xui.UIProfile.getFromDom(fid)===profile){
                  while((p=p.parentNode) && xui.UIProfile.getFromDom(p)===profile){
                      if(profile.getSubId(p.id) == profile.getSubId(fid)){
                          return false;
                      }
                  }
                }
            }
        },
        _onDrop:function(profile, e, src, key, data, item){
            var k=profile.getKey(xui.use(src).id()),
                po=data.profile,
                ps=data.domId,
                oitem,
                ks=profile.keys,
                t=xui.absObj.$specialChars,
                b=profile.boxing(),
                arr=xui.copy(b.getUIValue(true));
            //remove
            oitem=xui.clone(po.getItemByDom(ps),function(o,i){return !t[(i+'').charAt(0)]});
            po.boxing().removeItems([oitem.id]);

            //add
            if(k==ks.BOX)
                b.insertItems([oitem], null, null, false);
            else if(k==ks.BAR)
                b.insertItems([oitem], item._pid, item.id, true);
            else if(k==ks.TOGGLE)
                b.insertItems([oitem], item.id, null, false);

            if(arr && arr.length){
                if(xui.arr.indexOf(arr, oitem.id)!=-1){
                    //set checked items
                    profile._noScroll=1;
                    b.setUIValue(arr,true,null,'drop');
                    delete profile._noScroll;
                }
            }
            data._new = oitem;
            return false;
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile);
            d._cmdsalign=profile.getClass('ITEMS','-tagcmd'+profile.properties.tagCmdsAlign);
            return d;
        },
        _prepareItem:function(profile, item, oitem, pid, index,len){
            var p=profile.properties,
                map1=profile.ItemIdMapSubSerialId,
                map2=profile.SubSerialIdMapItem,
                pitem;

            if(pid)
                oitem._pid=pid;
            if(item.isFolder){
                if(!oitem.sub)oitem.sub=true;
                if(!item.sub)item.sub=true;
            }
            // set 'visible' will show when parent call .height()
            item._fi_togglemark = item.sub?('xui-uicmd-toggle'+(item._checked?" xuifont-checked xui-uicmd-toggle-checked":"")):(p.togglePlaceholder?'xui-icon-placeholder':'xui-uicmd-none');

            item.disabled = item.disabled?'xui-ui-disabled':'';
            item.mark2Display = ('showMark' in item)?(item.showMark?'':'display:none;'):(p.selMode=='multi'||p.selMode=='multibycheckbox')?'':'display:none;';
            item._tabindex = p.tabindex;
            item._fi_optClass = p.optBtn;

            if(item.group && !item.sub){
                item.sub = oitem.sub = [];
            }
            //change css class
            if(item.sub && (item.hasOwnProperty('group')?item.group:p.group)){
                item.cls_group = "xui-uigradient xui-uibar "  + profile.getClass('BAR','-group');
                item.mark2Display = 'display:none';
            }
            this._prepareCmds(profile, item);

            if(xui.browser.fakeTouch || xui.browser.deviceType == 'touchOnly'){
                item._optDisplay = p.optBtn?'display:block;':'';
            }

            if(item.type=='split'){
                item._split='xui-uitem-split';
                item._ruleDisplay=item._ltagDisplay=item._tglDisplay=item._rtagDisplay=item.imageDisplay=item.mark2Display=item._capDisplay=item._extraDisplay=item._optDisplay='display:none;';
            }
        },
        _setSub:function(profile, item, flag, recursive, stopanim, cb){
            var id=profile.domId,
                ins=profile.boxing(),
                prop = profile.properties,
                itemId = profile.getSubIdByItemId(item.id),
                markNode = profile.getSubNode('TOGGLE', itemId),
                subNs = profile.getSubNode('SUB', itemId),

                barNode = profile.getSubNode('BAR', itemId),
                icon = profile.getSubNode('ITEMICON', itemId);

            if(xui.Thread.isAlive(profile.key+":"+profile.$xid)) return;
            //close
            if(!flag){
                if(item._checked){
                    if(ins.beforeFold && false===ins.beforeFold(profile,item)){
                        return;
                    }
                    var onend=function(){
                        subNs.css({display:'none',height:0});
                        markNode.tagClass('-checked', false);
                        barNode.tagClass('-expand',false).tagClass('-fold');
                        icon.tagClass('-expand',false).tagClass('-fold');
                        item._checked = false;
                        if(prop.dynDestory || item.dynDestory){
                            var bak=xui.clone(item.sub, true);
                            var s=item.sub, arr=[];
                            for(var i=0,l=s.length;i<l;i++)
                                arr.push(s[i].id);
                            profile.boxing().removeItems(arr);
                            delete item._inited;
                            item.sub = bak;
                        }
                        if(ins.afterFold)
                            ins.afterFold(profile,item);
                       xui.resetRun(id, function(cb){
                            if(cb)xui.tryF(cb,[profile,item],ins);
                        },0,[cb]);
                    };
                    if(!stopanim){
                         if(prop.animCollapse){
                            subNs.animate({'height':[subNs.height(),0]},null,onend, 200, null, 'expoOut', profile.key+":"+profile.$xid).start();
                        }else onend();
                    }else onend();
                }
                if(recursive && item.sub && !prop.dynDestory && !item.dynDestory){
                    xui.arr.each(item.sub,function(o){
                        if(o.sub && o.sub.length)
                            profile.box._setSub(profile, o, flag, recursive, true, cb);
                    });
                }
            }else{
                //open
                if(!item._checked){
                    if(ins.beforeExpand && false===ins.beforeExpand(profile,item)){
                        return;
                    }
                    var onend=function(empty){
                        subNs.css({display:'',height:'auto'});
                        //markNode.css('background','');
                        // compitable with IE<8
                        if(xui.browser.ie && xui.browser.ver<=8){
                            markNode.css({
                                backgroundImage:'',
                                backgroundRepeat:'',
                                backgroundPositionX:'',
                                backgroundPositionY:'',
                                backgroundColor:'',
                                backgroundAttachment:''
                              });
                        }else{
                            markNode.removeClass('xui-icon-loading');
                        }
                        if(!empty){
                            item._checked = true;
                            if(ins.afterExpand)
                                ins.afterExpand(profile,item);
                        }
                       xui.resetRun(id, function(cb){
                            if(cb)xui.tryF(cb,[profile,item],ins);
                        },0,[cb]);
                    },
                    openSub = function(profile, item, id, markNode, subNs, barNode, icon, sub){
                        var b=profile.boxing(),
                            p=profile.properties,
                            empty = sub===false;
                        //created
                        if(!empty&& !item._inited){
                            delete item.sub;
                            //before insertRows
                            item._inited=true;
                            if(sub){
                                if(typeof sub=='string')
                                    subNs.html(item.sub=sub,false);
                                else if(sub['xui.Template']||sub['xui.UI']){
                                    subNs.append(item.sub=sub.render(true));
                                }else if(xui.isArr(sub)){
                                    b.insertItems(sub, item.id);
                                    // for []
                                    if(!item.sub)item.sub=sub;
                                }
                                var s=0,arr=b.getUIValue(true);
                                if(arr && arr.length){
                                    xui.arr.each(sub,function(o){
                                        if(xui.arr.indexOf(arr, o.id||o)!=-1){
                                            s=1;
                                            return false;
                                        }
                                    });
                                    if(s){
                                        //set checked items
                                        profile._noScroll=1;
                                        b._setCtrlValue(b.getUIValue());
                                        delete profile._noScroll;
                                    }
                                }
                            }
                        }

                        if(p.singleOpen)
                            b._toggleNodes(item._pid?profile.getItemByItemId(item._pid).sub:p.items, false)

                        if(!empty){
                            markNode.tagClass('-checked');
                            barNode.tagClass('-expand').tagClass('-fold',false);
                            icon.tagClass('-fold',false).tagClass('-expand');
                        }

                        if(!stopanim){
                            subNs.css("height","0px").css("display",'');

                            if(p.animCollapse){
                                var h=0;
                                subNs.children().each(function(o){
                                    h+=o.offsetParent?o.offsetHeight:0;
                                });
                                subNs.animate({'height':[0,h]},null,function(){
                                    onend(empty);
                                }, 200, null, 'expoIn', profile.key+":"+profile.$xid).start();
                            }else onend(empty);
                        }else onend(empty);
                    },
                    sub=item.sub,
                    callback=function(sub){
                        openSub(profile, item, id, markNode, subNs, barNode, icon, sub)
                    },t;

                    if((t=typeof sub)=='string'||t=='object')
                        callback(sub);
                    else if(profile.onGetContent){
                        if(xui.browser.ie && xui.browser.ver<=8){
                            markNode.css('background','url('+xui.ini.img_busy+') no-repeat');
                        }else{
                            markNode.addClass('xui-icon-loading');
                        }
                        var r=profile.boxing().onGetContent(profile, item, callback);
                        if(r||r===false){
                            //return true: toggle icon will be checked
                            if(r===true)
                                item._inited=true;
                            callback(r);
                        }
                    }
                }
                if(recursive&& item.sub){
                    xui.arr.each(item.sub,function(o){
                        if(o.sub && o.sub.length && !o._checked)
                            profile.box._setSub(profile, o, flag, recursive, true, cb);
                    });
                }
            }
        },
        _tofold:function(profile,item,pid){
            profile.getSubNodeByItemId('BAR', pid).addClass(profile.getClass('BAR','-fold'));
            profile.getSubNodeByItemId('TOGGLE', pid).replaceClass(new RegExp("\\buicmd-(none|empty)\\b"), "xui-uicmd-toggle");
        },
        _onresize:function(profile,width,height){
            profile.getSubNode('BORDER').cssSize({ width :width?width:null, height :height?height:null});
            profile.getSubNode('BOX').cssSize({ width :width?width:null, height : height?height:null});
        }
    }
});
