Class("xui.UI.Tabs", ["xui.UI", "xui.absList","xui.absValue"],{
    Instance:{
        _setCtrlValue:function(value){
            this.each(function(profile){
                var id=profile.domId,
                    box = profile.boxing(),
                    uiv = box.getUIValue(),
                    prop = profile.properties,
                    dm=profile.box.$DataModel,

                    fold=function(itemId, arr){
                        var subId = profile.getSubIdByItemId(itemId),
                            item = profile.getItemByItemId(itemId);
                        if(subId){
                            arr.push(subId);
                            
                            if(!dm.hasOwnProperty("noPanel") || !prop.noPanel){
                                // hide pane
                                //box.getPanel(itemId).hide();
                                var pn=box.getPanel(itemId).get(0);
                                if(pn && (item._scrollTop=pn.scrollTop||0))
                                    pn.scrollTop=0;

                                box.getPanel(itemId).css('display','none');
                            }
                        }
                    },
                    expand = function(itemId, arr){
                        var subId = profile.getSubIdByItemId(itemId),
                            item=profile.getItemByItemId(itemId);
                        if(subId){
                            arr.push(subId);

                            if(!dm.hasOwnProperty("noPanel") || !prop.noPanel){
                                // show pane
                                //box.getPanel(value).css('position','relative').show('auto','auto');
                                box.getPanel(itemId).css('display','block');
                                if(item._scrollTop)
                                    box.getPanel(itemId).get(0).scrollTop=item._scrollTop;

                                var t=profile.getRootNode().style;
                                //reset width and height
                                xui.UI.$tryResize(profile, t.width, t.height, true, value);
                                t=null;

                                profile.box._forLazyAppend(profile, item, value);
                                profile.box._forIniPanelView(profile, item, value);
                            }
                        }
                    };
                var arr1=[],arr2=[];
                if(dm.hasOwnProperty("selMode") &&
                    dm.hasOwnProperty("noPanel") &&
                    prop.noPanel &&
                    prop.selMode=="multi"){

                    uiv = uiv?uiv.split(prop.valueSeparator):[];
                    _.arr.each(uiv,function(key){
                        fold(key, arr1);
                    });
                    value = value?value.split(prop.valueSeparator):[];
                    var lastV="";
                    _.arr.each(value,function(key){
                        var l=arr2.length;
                        expand(key, arr2);
                        // the last one
                        if(l<arr2.length)
                            lastV=key;
                    });

                    if(lastV)
                        _.tryF(profile.box._adjustScroll,[profile,lastV],profile.box);
                }else{
                    fold(uiv, arr1);
                    expand(value, arr2);
                    
                    if(arr2.length)
                        _.tryF(profile.box._adjustScroll,[profile,value],profile.box);
                }

                if(arr1.length)
                    profile.getSubNodes('ITEM',arr1).tagClass('-checked',false);
                if(arr2.length){
                    profile.getSubNodes('ITEM',arr2).tagClass('-checked');
                }

            });
        },
        append:function(target,subId){
            var p=this.get(0).properties;
            if(subId=subId||p.$UIvalue||p.value)
                arguments.callee.upper.call(this, target, subId);
            return this;
        },
        getCurPanel:function(){
            var profile = this.get(0),
                dm=profile.box.$DataModel,
                v=profile.properties.$UIvalue;
            if(dm.hasOwnProperty("noPanel") && dm.hasOwnProperty("selMode") && profile.properties.selMode=='multi'){
                v=v.split(prop.valueSeparator);
                v=v[0]||null;
            }
            return v?this.getPanel(v):null;
        },
        // get pane in page views
        getPanel:function(subId){
            var profile = this.get(0);
            return profile.getSubNodeByItemId('PANEL', subId);
        },
        ////
        addPanel:function(paras, children, item){
            var i={},
                id = item&&item.id,
                items = this.getItems(),
                id2=paras.id||paras.tag;
            if(items.length){
                if(-1!=_.arr.subIndexOf(items,'id',id2))
                    return false;

                if(!id)
                    id = items[items.length-1].id;
            }

            _.merge(i, {
                caption:paras.caption,
                image:paras.image,
                closeBtn:paras.closeBtn || false,
                popBtn:paras.popBtn || false,
                optBtn:paras.optBtn || false,
                imagePos:paras.imagePos,
                dragKey:paras.dragKey,
                dropKeys:paras.dropKeys,
                id : paras.id || paras.tag || _.id()
            });

            this.insertItems([i], id);
            var arr=[];
            _.arr.each(children,function(o){
                arr.push(o[0]);
            });
            this.append(xui.UI.pack(arr,false), i.id);

            return this;
        },
        removePanel:function(domId){
            var self=this,
                item = self.getItemByDom(domId);
            return self.removeItems([item.id]);
        },
        getPanelPara:function(domId){
            var profile=this.get(0),
                pp=profile.properties,
                item = profile.getItemByDom(domId),
                paras = _.clone(item);
            if(!paras.dragKey)paras.dragKey=pp.dragKey;
            if(!paras.dropKeys)paras.dropKeys=pp.dropKeys;
            return paras;
        },
        getPanelChildren:function(domId){
            var profile=this.get(0),
                id = profile.getItemIdByDom(domId),
                arr=[];
            if(id)
                _.arr.each(profile.children,function(o){
                    if(o[1]==id)arr.push(o);
                });
            return arr;
        },

        ////
        fireItemClickEvent:function(subId){
            this.getSubNodeByItemId('ITEM', subId).onMousedown();
            return this;
        },
        /* insert some views to pageView widgets
            arr: hash(view properties) or array of hash
            before: views will insert before it, string
        */
        _afterInsertItems:function(profile, data){
            if(!profile.renderId)return;
            var box=profile.box,obj,v,pp=profile.properties;
            if(obj=profile.getSubNode(profile.keys.BOX||profile.keys.KEY)){
                // add panels anyway
                obj.append(profile._buildItems('panels', data));
                // for stacks only
                if(!profile.box.$DataModel.hasOwnProperty("noPanel")){
                    if(!(v=this.getUIValue()))
                        this.fireItemClickEvent((v=pp.items[0]) && (v=v.id));

                    var t=profile.getRootNode().style;
                    xui.UI.$tryResize(profile, t.width, t.height, true,v);
                    t=null;
                }
            }
        },
        /*  remove some views from pageView
            arr: array for id
        */
        removeItems:function(arr){
            var self=this,
                obj,serialId;
            if(!_.isArr(arr))arr=[arr];

            self.each(function(profile){
                if(!profile.box.$DataModel.hasOwnProperty("noPanel") || !profile.properties.noPanel)
                    _.arr.each(arr,function(o){
                        // get ui serial id
                        serialId=profile.getSubIdByItemId(o);
                        if(serialId && !(obj = profile.getSubNode('PANEL', serialId) ).isEmpty() ){
                            // remove ui
                            obj.remove();
                        }
                    });
            });
            arguments.callee.upper.apply(self,arguments);

            self.each(function(profile){
                if(!profile.boxing().getUIValue()){
                    var i;
                    profile.boxing().fireItemClickEvent((i=profile.properties.items[0]) && i.id);
                }
                if(!profile.box.$DataModel.hasOwnProperty("noPanel") || !profile.properties.noPanel){
                    var t=profile.getRootNode().style;
                    xui.UI.$tryResize(profile, t.width, t.height, true, profile.boxing().getUIValue());
                    t=null;
                }
            });

            return self;
        },
        clearItems:function(){
            var self=this;
            self.each(function(profile){
                if(!profile.box.$DataModel.hasOwnProperty("noPanel") || !profile.properties.noPanel)
                    profile.getSubNode('PANEL',true).remove();
            });
            self.setValue(null,true);
            arguments.callee.upper.apply(self,arguments);
            return self;
        },
        markItemCaption:function(subId, mark, force){
            var profile = this.get(0);
            subId=profile.getItemByItemId(subId);

            if((subId._dirty !=mark) || force){
                var id = subId.id,
                    caption = profile.getItemByItemId(id).caption;
                profile.getSubNodeByItemId('CAPTION', id).html(
                    profile.getItemByItemId(id).caption=mark?('*'+caption):caption.replace(/^\*/,'')
                ).css('fontStyle',mark?'italic':'normal');
                subId._dirty=mark;
            }
            return this;
        },
        _scrollToBottom:function(){
            return this.each(function(profile){
                var o = profile.getSubNode('ITEMS'),
                border = profile.getSubNode('LIST'),
                y = o.left(),
                offset,
                h = o.width(),
                b=false,
                bh = border.width();
                if(bh<h+y){
                    if(!profile.$scrollStep)profile.$scrollStep=1;

                    if(profile.$scrollStep<5)
                        profile.$scrollStep = profile.$scrollStep*1.01;

                    y -= profile.$scrollStep;
                    if(bh>h+y){
                        y=bh-h;
                        b=true;
                    }
                    o.left(y);
                    if(b){
                        profile.getSubNode('RIGHT').css('display','none');
                        profile.$scrollTobottom=false;
                        profile.$scrollStep=null;
                    }else{
                        profile.getSubNode('LEFT').css('display','block');
                        if(profile.$scrollTobottom)
                            _.asyRun(arguments.callee, 0, [profile], this);
                    }
                }
            });
        },
        _scrollToTop:function(){
            return this.each(function(profile){
                var o = profile.getSubNode('ITEMS'),
                y = o.left(),
                b=false;

                if(y<0){
                    if(!profile.$scrollStep)profile.$scrollStep=1;

                    if(profile.$scrollStep<5)
                        profile.$scrollStep = profile.$scrollStep*1.01;

                    y += profile.$scrollStep;
                    if(y>=-1){
                        y=0;
                        b=true;
                    }
                    o.left(y);
                    if(b){
                        profile.getSubNode('LEFT').css('display','none');
                        profile.$scrollToTop=false;
                        profile.$scrollStep=null;
                    }else{
                        profile.getSubNode('RIGHT').css('display','block');
                        if(profile.$scrollToTop)
                            _.asyRun(arguments.callee, 0, [profile], this);
                    }
                }
            });
        }
    },
    Static:{
        Templates:{
            tagName : 'div',
            style:'{_style};',
            className:'{_className}',
            LIST:{
                $order:0,
                tagName : 'div',
                ITEMS:{
                    tagName : 'div',
                    text:"{items}",
                    style:'{HAlign}'
                },
                LEFT:{},
                RIGHT:{}
            },
            PNAELS:{
                $order:1,
                tagName:'text',
                text:'{panels}'
            },
            $submap:{
                items:{
                    ITEM:{
                        className:'{itemClass} {disabled} {readonly}',
                        style:'{itemDisplay} {itemStyle}',
                        ITEMI:{
                            ITEMC:{
                                HANDLE:{
                                    tabindex: '{_tabindex}',
                                    IBWRAP:{
                                        tagName:'div',
                                        style:"white-space:nowrap;",
                                        RULER:{},
                                        ICON:{
                                            $order:0,
                                            className:'xui-ui-icon {imageClass}',
                                            style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                                        },
                                        CAPTION:{
                                            text: '{caption}',
                                            $order:1
                                        },
                                        CMDS:{
                                            $order:2,
                                            OPT:{
                                                $order:1,
                                                className:'xui-uicmd-opt',
                                                style:'{_opt}'
                                            },
                                            POP:{
                                                className:'xui-uicmd-pop',
                                                style:'{popDisplay}',
                                                $order:1
                                            },
                                            CLOSE:{
                                                className:'xui-uicmd-close ',
                                                style:'{closeDisplay}',
                                                $order:2
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                panels:{
                    PANEL:{
                        tagName : 'div',
                        className:'xui-uibg-base',
                        style:"{_overflow};",
                        text:'{html}'+xui.UI.$childTag
                    }
                }
            }
        },
        Appearances:{
            KEY:{
                position:'absolute',
                overflow:'hidden'
            },
            LIST:{
                position:'relative',
                overflow:'hidden',
                left:0,
                width:'100%',
                background: xui.UI.$bg('line.gif', 'repeat-x center bottom')
            },
            LEFT:{
                cursor:'pointer',
                display:'none',
                position:'absolute',
                top:0,
                left:0,
                height:'16px',
                width:'16px',
                'z-index':'10',
                background: xui.UI.$bg('icons.gif', 'no-repeat -152px -244px', true)
            },
            RIGHT:{
                cursor:'pointer',
                display:'none',
                position:'absolute',
                top:0,
                right:0,
                height:'16px',
                width:'16px',
                'z-index':'10',
                background: xui.UI.$bg('icons.gif', 'no-repeat -170px -244px', true)
            },
            ITEMS:{
                padding:'0 4px 2px 0',
                position:'relative',
                left:0,
                top:0,
                'white-space':'nowrap'
            },
            ITEM:{
                $order:0,
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                cursor:'pointer',
                'padding-right':'6px',
                'vertical-align':'top',
                background: xui.UI.$bg('button.gif', 'no-repeat right -540px', true)
            },
            'ITEM-mouseover':{
                $order:1,
                'background-position' : 'right -690px'
            },
            'ITEM-mousedown, ITEM-checked':{
                $order:2,
                'background-position' : 'right -840px',
                'border-bottom':'solid 1px #FAD600;'
            },
            ITEMI:{
                $order:0,
                'padding-left':'6px',
                //keep this same with ITEM
                'vertical-align':'top',
                background: xui.UI.$bg('button.gif', 'no-repeat left -640px',true)
            },
            'ITEM-mouseover ITEMI':{
                $order:1,
                'background-position' : 'left -790px'
            },
            'ITEM-mousedown ITEMI, ITEM-checked ITEMI':{
                $order:2,
                'background-position' : 'left -940px'
            },
            ITEMC:{
                $order:0,
                padding:'5px 0 3px 0',
                //keep this same with ITEM
                'vertical-align':'top',
                'text-align': 'center',
                background: xui.UI.$bg('button.gif', 'repeat-x left -590px',true)
            },
            'ITEM-mouseover ITEMC':{
                $order:1,
                'background-position' : 'left -740px'
            },
            'ITEM-mousedown ITEMC, ITEM-checked ITEMC':{
                $order:2,
                'background-position' : 'left -890px'
            },
            HANDLE:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                cursor:'pointer',
                'vertical-align':'middle',
                'font-size':'12px'
            },
            RULER:{
                height:'18px',
                width:'1px',
                'vertical-align':'middle'
            },
            PANEL:{
                position:'relative',
                //visibility:'hidden',
                //top:'-10000px',
                //left:'-10000px',
                display:'none',
                width:'100%',
                overflow:'auto'
            },
            CAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                margin:'0 4px'
            },
            CMDS:{
                'vertical-align':'middle'
            }
        },
        Behaviors:{
            DroppableKeys:['PANEL','KEY', 'ITEM'],
            PanelKeys:['PANEL'],
            DraggableKeys:['ITEM'],
            HoverEffected:{ITEM:'ITEM',OPT:'OPT',CLOSE:'CLOSE',POP:'POP'},
            ClickEffected:{ITEM:'ITEM',OPT:'OPT',CLOSE:'CLOSE',POP:'POP'},
            onSize:xui.UI.$onSize,
            OPT:{
                onMousedown:function(){
                    return false;
                },
                onClick:function(profile, e, src){
                    profile.boxing().onShowOptions(profile, profile.getItemByDom(src), e, src);
                    return false;
                }
            },
            CAPTION:{
                onMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!='left')return;
                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        box = profile.boxing();

                    if(properties.disabled || item.disabled)return false;
                    if(properties.readonly || item.readonly)return false;
                    if(box.getUIValue() == item.id){
                         if(profile.onCaptionActive)
                            profile.boxing().onCaptionActive(profile, profile.getItemByDom(src), e, src);
                    }
                }
            },
            ITEM:{
                onClick:function(profile, e, src){
                    return false;
                },
                onMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!='left')return false;
                    if(profile.getKey(xui.Event.getSrc(e).parentNode.id)==profile.keys.CMDS)return false;

                    var prop = profile.properties,
                        dm=profile.box.$DataModel,
                        itemId = profile.getSubId(src),
                        item = profile.getItemByDom(src),
                        box = profile.boxing();

                    if(prop.disabled || item.disabled)return false;
                    if(prop.readonly || item.readonly)return false;

                    //for some input onblur event
                    profile.getSubNode('HANDLE', itemId).focus();

                    if(dm.hasOwnProperty("selMode") &&
                        dm.hasOwnProperty("noPanel") &&
                        prop.noPanel &&
                        prop.selMode=="multi"){

                        var value = box.getUIValue(),
                            arr = value?value.split(prop.valueSeparator):[],
                            checktype=1,
                            rt=false,
                            rt2=false;
                        // for multi selection
                        if(arr.length){
                            //for select
                            if(_.arr.indexOf(arr,item.id)!=-1){
                                _.arr.removeValue(arr,item.id);
                                checktype=-1
                            }else
                                arr.push(item.id);

                            arr.sort();
                            value = arr.join(prop.valueSeparator);

                            //update string value only for setCtrlValue
                            if(box.getUIValue() == value)
                                rt=false;
                            else{
                                box.setUIValue(value);
                                if(box.get(0) && box.getUIValue() == value)
                                    rt=box.onItemSelected(profile, item, e, src, checktype)||rt2;
                            }
                            return rt;
                        }

                    }
                    // for single selection
                    if(box.getUIValue() != item.id){
                        box.setUIValue(item.id);
                        //if success
                        if(box.getUIValue() == item.id){
                            box.onItemSelected(profile, item, e, src);
                            return false;
                        }
                    }
                }
            },
            HANDLE:{
                onClick:function(profile, e, src){
                    return xui.Event.getKey(e).shiftKey;
                },
                onKeydown:function(profile, e, src){
                    var keys=xui.Event.getKey(e), key = keys.key, shift=keys.shiftKey;
                    if(key==' '||key=='enter'){
                        profile.getSubNode('ITEM',profile.getSubId(src)).onMousedown();
                        return false;
                    }

                    var cur = xui(src),
                    target = profile.getSubNode('ITEMS'),
                    first = target.nextFocus(true, true, false),
                    last = target.nextFocus(false, true, false);

                    switch(key){
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
                    }
                }
            },
            CLOSE:{
                onMousedown:function(){
                    return false;
                },
                onClick:function(profile, e, src){
                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        uiv=properties.$UIvalue,
                        bak;

                    if(properties.disabled || item.disabled)return;
                    if(properties.readonly || item.readonly)return false;
                    var instance = profile.boxing();

                    if(false===instance.beforePageClose(profile, item, src)) return;

                    bak=_.copy(item);

                    // if the current item is selected, select the next or the pre one item
                    if(uiv && uiv==item.id){
                        var items=properties.items,
                        index=_.arr.subIndexOf(items,"id",item.id),
                        t,
                        nuiv=(t=items[index+1])?t.id:(t=items[index-1])?t.id:(t=items[0])?t.id:null;
                        if(nuiv && nuiv!=uiv){
                            profile.boxing().fireItemClickEvent(nuiv);
                        }
                    }

                    instance.removeItems(item.id);

                    instance.afterPageClose(profile, bak);

                    var t=profile.getRootNode().style;
                    xui.UI.$tryResize(profile, t.width, t.height,true);
                    t=null;
                    //for design mode in firefox
                    return false;
                }
            },
            POP:{
                onMousedown:function(){
                    return false;
                },
                onClick:function(profile, e, src){
                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        options={parent:null,host:null,properties:null,events:null,CS:null,CC:null,CB:null,CF:null},
                        id=item.id;

                    if(properties.disabled || item.disabled)return;
                    if(properties.readonly || item.readonly)return false;

                    if(profile.beforePagePop && false==profile.boxing().beforePagePop(profile,item,options))
                        return false;

                    var panel = profile.boxing().getPanel(id),
                        pos = profile.getRoot().offset(),
                        size=profile.getRoot().cssSize(),
                        pro = _.copy(xui.UI.Dialog.$DataStruct),
                        events={};
                    
                    _.merge(pro, item, 'with');
                    _.merge(pro,{
                        dragKey: item.dragkey || properties.dragKey ,
                        dock:'none',
                        tag:item.tag||item.id,
                        width:Math.max(size.width,200),
                        height:Math.max(size.height,100),
                        left:pos.left,
                        top:pos.top,
                        landBtn:true
                    },'all');
                    if(options.properties)
                        _.merge(pro, options.properties, 'with');
                    
                    if(options.events)
                        _.merge(events, options.events, 'all');
                    if(!events.onRender){
                        var arr=[];
                        _.arr.each(profile.children,function(o){
                            if(o[1]==id){
                                // removed the lazy render flag
                                delete o[0]['parent:'+profile.$xid];
                                arr.push(o[0]);
                            }
                        });
                        if(arr.length)
                            events.onRender=function(){
                                dialog.append(xui.UI.pack(arr,false));
                            };
                    }
                    var dialog = new xui.UI.Dialog(pro,events,options.host||profile.host,options.CS||null,options.CC||null,options.CB||null,options.CF||null);
                    (options.parent||xui('body')).append(dialog);

                    profile.boxing().removeChildren(id).removeItems(id);

                    //for design mode in firefox
                    return false;
                }
            },
            ITEMS:{
                onMousedown:function(profile, e, src){
                    var ep=xui.Event.getPos(e);
                    if(!profile._$scroll_l && !profile._$scroll_r)return;
                    xui.use(src).startDrag(e, {
                        horizontalOnly:true,
                        dragType:'blank',
                        dragDefer:2,
                        targetLeft:ep.left,
                        targetTop:ep.top,
                        targetReposition:false,
                        maxLeftOffset:profile._$scroll_l,
                        maxRightOffset:profile._$scroll_r
                    });
                },
                onDrag:function(profile, e, src){
                    var dd=xui.DragDrop.getProfile();
                    xui.use(src).left(-profile._$scroll_r + dd.offset.x);
                },
                onDragstop:function(profile, e, src){
                    profile.box._adjustScroll(profile);
                }
            },
            LEFT:{
                onMouseover:function(profile, e, src){
                    profile.$scrollToTop=true;
                    profile.boxing()._scrollToTop();
                },
                onMouseout:function(profile, e, src){
                    profile.$scrollToTop=false;
                    profile.$scrollStep=null;
                },
                onClick:function(profile, e, src){
                    profile.$scrollStep*=2;
                }
            },
            RIGHT:{
                onMouseover:function(profile, e, src){
                    profile.$scrollTobottom=true;
                    profile.boxing()._scrollToBottom();
                },
                onMouseout:function(profile, e, src){
                    profile.$scrollTobottom=false;
                    profile.$scrollStep=null;
                },
                onClick:function(profile, e, src){
                    profile.$scrollStep*=2;
                }
            }
        },
        DataModel:{
            selectable:true,
            dirtyMark:false,

            dataBinder:null,
            dataField:null,

            lazyAppend:true,

            dock:'fill',
            noPanel:false,
            width:200,
            height:200,
            position:'absolute',
            overflow:{
                ini:undefined,
                listbox:['','visible','hidden','scroll','auto','inherited'],
                action:function(v){
                    this.getSubNode('PANEL',true).css('overflow',v||'');
                }
            },
            HAlign:{
                ini:'left',
                listbox:['left','center','right'],
                action:function(value){
                    this.getSubNode('ITEMS').css('textAlign',value);
                }
            },
            dropKeysPanel:'',
            value:{
                ini:''
            },
            selMode:{
                ini:'single',
                listbox:['single', 'multi']
            },
            //use ilist defualt items
            items:{
                set:function(value){
                    var o=this;
                    if(o.renderId){
                        var box = o.boxing(),
                            p,
                            temp = xui.$getGhostDiv(),
                            children = _.copy(o.children);
                        o.children.length=0;
                        _.arr.each(children,function(o){
                            //for flush dock
                            delete o[0].$dockParent;
                            //keep it in dom
                            temp.appendChild(o[0].getRootNode());
                        });

                        //bak value
                        var bv = o.properties.value;

                        //clear all
                        box.clearItems();

                        //inset items
                        box.insertItems(value);

                        //restore children
                        _.arr.each(children,function(v){
                            box.append.apply(box,v);
                        });

                        //clear
                        temp.innerHTML='';

                        //set value
                        box.setValue(bv,true);

                        //resize
                        var t=o.getRootNode().style;
                        xui.UI.$tryResize(o, t.width, t.height,true);
                        t=null;
                    }else
                        o.properties.items = _.copy(value);
                }
            }
        },
        EventHandlers:{
            onIniPanelView:function(profile, item){},
            beforePagePop:function(profile, item, options){},
            beforePageClose:function(profile, item, src){},
            afterPageClose:function(profile, item){},
            onShowOptions:function(profile,item,e,src){},
            onItemSelected:function(profile, item,e,src,type){},
            onCaptionActive:function(profile, item,e,src){}
        },
        RenderTrigger:function(){
            var self=this,v,i,ins;
            // set default value
            if(v=self.properties.value){
                (ins=self.boxing()).setUIValue(v);
                if(i=self.getItemByItemId(v))
                    ins.onItemSelected(self, i);
            }
        },
        _prepareData:function(profile){
            var data = arguments.callee.upper.call(this, profile);
            data.panels = data.items;
            if(data.HAlign)
                data.HAlign = 'text-align:'+data.HAlign+';';
            return data;
        },
        _prepareItem:function(profile, item){
            var dpn = 'display:none',prop=profile.properties;
            item.closeDisplay = item.closeBtn?'':dpn;
            item.popDisplay = item.popBtn?'':dpn;
            item._opt = item.optBtn?'':dpn;
            item.itemDisplay = item.hidden?dpn:'';

            if(_.isStr(item.overflow))
                item._overflow = item.overflow.indexOf(':')!=-1?(item.overflow):("overflow:"+item.overflow);
            else if(_.isStr(prop.overflow))
                item._overflow = prop.overflow.indexOf(':')!=-1?(prop.overflow):("overflow:"+prop.overflow);
        },
        getDropKeys:function(profile,node){
            return profile.properties[profile.getKey(xui.use(node).id())==profile.keys.PANEL?'dropKeys':'dropKeysPanel'];
        },
        _forLazyAppend:function(profile, item, value){
            var prop=profile.properties,box=profile.boxing();
            //dynamic render
            if(prop.lazyAppend){
                var arr=profile.children,a=[];
                _.arr.each(arr,function(o){
                    if(o[1]==value && !o[0]['parent:'+profile.$xid]){
                        a.push(o[0]);
                        o[0]['parent:'+profile.$xid]=1;
                    }
                });
                if(a.length)
                    box.append(xui.UI.pack(a),value);

                // $attached is dynamic
                if(profile.$attached){
                    for(var i=0,v;v=profile.$attached[i++];)
                        if(v._render)
                            v._render(true);
                    delete profile.$attached;
                }

                arr=profile.exchildren;
                if(arr && arr.length){
                    a=[];
                    _.filter(arr,function(o){
                        if(o[1]==value){
                            a.push(o[0]);
                            return false;
                        }
                    });
                    if(a.length)
                        _.arr.each(a,function(o){
                            box.append(xui(o),value);
                        });
                }

                arr=profile.excoms;
                if(arr && arr.length){
                    a=[];
                    _.filter(arr,function(o){
                        if(o[1]==value){
                            a.push(o[0]);
                            return false;
                        }
                    });
                    if(a.length)
                        _.arr.each(a,function(o){
                            o.show(null, box, value, false);
                        });
                }
            }
        },
        _forIniPanelView:function(profile, item, value){
            var prop=profile.properties,box=profile.boxing();
            if(!item._$ini){
                if(box.onIniPanelView(profile,item)!==false)
                    item._$ini=true;
                if(item.iframeAutoLoad){
                    box.getPanel(item.id).css('overflow','hidden');

                    if(typeof item.iframeAutoLoad=='string')
                        item.iframeAutoLoad={url:item.iframeAutoLoad};
                    var hash=item.iframeAutoLoad,
                        id="diframe_"+_(),
                        e=xui.browser.ie && xui.browser.ver<9,
                        ifr=document.createElement(e?"<iframe name='"+id+"'>":"iframe");
                    item.iframeAutoLoad.frameName=ifr.id=ifr.name=id;
                    if(!hash.query)hash.query={};
                    hash.query._rand=_();
                    ifr.src=hash.url;
                    ifr.frameBorder='0';
                    ifr.marginWidth='0';
                    ifr.marginHeight='0';
                    ifr.vspace='0';
                    ifr.hspace='0';
                    ifr.allowTransparency='true';
                    ifr.width='100%';
                    ifr.height='100%';
                    box.getPanel(item.id).html("").append(ifr);
                    xui.Dom.submit(hash.url, hash.query, hash.method, id, hash.enctype);
                }else if(item.ajaxAutoLoad){
                    if(typeof item.ajaxAutoLoad=='string')
                        item.ajaxAutoLoad={url:item.ajaxAutoLoad};
                    var hash=item.ajaxAutoLoad,options={rspType:"text"};
                    _.merge(options, hash.options);
                    if(!hash.query)hash.query={};
                    hash.query._rand=_();
                    box.busy(null,null,"PANEL",profile.getSubIdByItemId(item.id));
                    xui.Ajax(hash.url, hash.query, function(rsp){
                        var n=xui.create("div");
                        n.html(rsp,false,true);
                        box.getPanel(item.id).html("").append(n.children());
                        box.free();
                    }, function(err){
                        box.getPanel(item.id).html("").append("<div>"+err+"</div>");
                        box.free();
                    }, null, options).start();
                }
            }
        },
        _showTips:function(profile, node, pos){
            if(profile.properties.disableTips)return;
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);
            if(!xui.Tips)return;

            if(!node.id)return false;
            return arguments.callee.upper.apply(this,arguments);
        },
        //for tabs only
        _onresize:function(profile,width,height,force,key){
            var t=profile.properties,
                item = profile.getItemByItemId(key);
            if(!item)
                key=t.$UIvalue;
            item = profile.getItemByItemId(key);
            var o = profile.boxing().getPanel(key),
                l=profile.getSubNode('LIST'),
                listH;
            ;
            if(!o || o.isEmpty())return;

            var hc=null,wc=null;
            if(force)item._w=item._h=null;
            if(height && item._h!=height){
                item._h=height;
                if(height && height!='auto'){
                    listH = l.get(0).offsetHeight ||
                        //for opear 9.0 get height bug, get offsetheight in firefox is slow
                        l.offsetHeight();

                    height = height-listH;
                    if(height>0)hc=height;
                }else hc=height;
            }

            if(width && item._w!=width){
                l.width(item._w=width);
                this._adjustScroll(profile);
                wc=width;
            }
            if(hc||wc)o.height(hc).onSize();
        },

        _adjustScroll:function(profile, itemid){
            // SCROLL
            var list = profile.getSubNode('LIST'),
                w=list.offsetWidth(),
                items = profile.getSubNode('ITEMS'),
                l=items.left(),
                left =  profile.getSubNode('LEFT'),
                right =  profile.getSubNode('RIGHT'),
                wi=0,
                sl=0,sw=0;
            items.children().each(function(item){
                // to show the seleted one
                if(itemid && profile.getItemIdByDom(item.id) == itemid){
                    sl=wi;
                    sw=item.offsetWidth;
                }
                wi += item.offsetWidth;
            });
            items.width(Math.max(wi,w));

            if(wi<=w){
                items.left(0);
                profile._$scroll_r=profile._$scroll_l=0;
                items.css('cursor','');
            }else{
                // to show the seleted one
                if(sw){
                    if((sl+l<0) || (sl+sw-l>w)){
                        l=-sl;
                    }
                }

                if(wi+l<w){
                    items.left(w-wi);
                    profile._$scroll_r = wi-w;
                    profile._$scroll_l = 0;
                }else{
                    items.left(l);
                    profile._$scroll_r = -l;
                    profile._$scroll_l =  wi - w + l;
                }
                items.css('cursor','move');
            }


            left.css('display', profile._$scroll_r ? 'block' : 'none');
            right.css('display', profile._$scroll_l ? 'block' : 'none');

        }
    }
});