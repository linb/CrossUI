Class("xui.UI.Layout",["xui.UI", "xui.absList"],{
    Instance:{
        getPanel:function(subId){
            return this.get(0).getSubNodeByItemId('PANEL', subId);
        },
        append:function(target, subId,  pre, base){
            var pro=this.get(0);
            return arguments.callee.upper.call(this, target, subId||'main', pre, base);
        },
        insertItems:function(arr, base, before){
            return this._insertItems(arr, base, before);
        },
        _insertItems:function(arr, base, before, all){
            var node,arr2,
                items, index, r,
                data,box,
                pos="before",
                b=this._afterInsertItems;
            return this.each(function(profile){
                box=profile.box;
                items = profile.properties.items;
                if(!all){
                    index = _.arr.subIndexOf(items,'id',base);
                    if(index==-1){
                        pos=before?'before':'after';
                    }else{
                        if(items[index].id=='main')
                            pos=before?'before':'after';
                        else
                            pos=items[index].pos;
                    }

                    arr2=box._adjustItems2(arr, pos);
                }else{
                    arr2=arr;
                }

                //must be here
                if(index==-1)
                    _.arr.insertAny(items,arr2, before?0:-1);
                else
                    _.arr.insertAny(items,arr2, before?index:index+1);

                //if in dom, create it now
                if(profile.renderId){
                    data = box._prepareItems(profile, arr2, base);
                    r=profile._buildItems('items', data);
                    profile.getRoot().prepend(r);

                    var t=profile.getRootNode().style;
                    xui.UI.$tryResize(profile, t.width, t.height, true);
                    t=null;
                }

                if(b)
                    profile.boxing()._afterInsertItems(profile, data, base, before);
            });
        },
        _afterRemoveItems:function(profile){
            if(profile.renderId){
                var t=profile.getRootNode().style;
                xui.UI.$tryResize(profile, t.width, t.height, true);
                t=null;
            }
        },
        updateItem:function(subId,options){
            var self=this,
                profile=self.get(0),
                vertical=profile.properties.type=='vertical',
                box=profile.box,
                items=profile.properties.items,
                rst=profile.queryItems(items,function(o){return typeof o=='object'?o.id===subId:o==subId},true,true,true),
                nid,item,serialId,node,sub,t;
            if(typeof options!='object')return;

            if(rst.length){
                rst=rst[0];
                if(typeof rst[0]!='object')
                    item=rst[2][rst[1]]={id:rst[0]};
                else
                    item=rst[0];

                // [[modify id
                if(_.isSet(options.id))options.id+="";
                if(options.id && subId!==options.id){
                    nid=options.id;
                    var m2=profile.ItemIdMapSubSerialId, v;
                    if(!m2[nid]){
                        if(v=m2[subId]){
                            m2[nid]=v;
                            delete m2[subId];
                            profile.SubSerialIdMapItem[v].id=nid;
                        }else{
                            item.id=nid;
                        }
                    }
                }
                delete options.id;
                // modify id only
                if(_.isEmpty(options))
                    return self;
                //]]

                var bResize=false;
                //in dom already?
                node=profile.getSubNodeByItemId('ITEM',subId);
                if(!node.isEmpty()){
                    if(options.hasOwnProperty('size')){
                        options.size = parseInt(''+options.size,10);
                        if(options.size!=item.size){
                            item.size=options.size;
                            if(vertical)
                                node.height(options.size);
                             else
                                node.width(options.size);
                            bResize=true;
                        }
                    }
                    if(options.hasOwnProperty('hidden')){
                        options.hidden = !!options.hidden;
                        if(options.hidden !== item.hidden){
                            profile.getSubNodeByItemId('ITEM',subId).css('display',options.hidden?'none':'');
                            bResize=true;
                        }
                    }
                    if(options.hasOwnProperty('locked')){
                        options.locked = !!options.locked;
                        if(options.locked !== item.locked){
                           // profile.getSubNodeByItemId('MOVE',subId).css('display',options.locked?'none':'');
                            profile.getSubNodeByItemId('MOVE',subId).css('cursor',options.locked?'default':vertical?'n-resize':'w-resize');
                            bResize=true;
                        }
                    }
                    if(options.hasOwnProperty('folded')){
                        options.folded = !!options.folded;
                        if(options.folded !== item.folded)
                            profile.boxing().fireCmdClickEvent(subId);
                    }
                    if(options.hasOwnProperty('cmd')){
                        options.cmd = !!options.cmd;
                        if(options.cmd !== item.cmd)
                            profile.getSubNodeByItemId('CMD',subId).css('display',options.cmd?'':'none');
                    }

                    var hash={};
                    if(options.hasOwnProperty('panelBgClr'))hash["background-color"]=options.panelBgClr;
                    if(options.hasOwnProperty('panelBgImg')){
                        hash["background-image"]=options.panelBgImg?("url("+xui.adjustRes(options.panelBgImg)+")"):"";
                    }
                    if(options.hasOwnProperty('panelBgImgPos'))hash["position-color"]=options.panelBgImgPos;
                    if(options.hasOwnProperty('panelBgImgRepeat'))hash["background-repeat"]=options.panelBgImgRepeat;
                    if(options.hasOwnProperty('panelBgImgAttachment'))hash["background-attachment"]=options.panelBgImgAttachment;
                    if(options.hasOwnProperty('overflow')){
                        var v=options.overflow;
                        if(v){
                            if(v.indexOf(':')!=-1){
                                _.arr.each(v.split(/\s*;\s*/g),function(s){
                                    var a=s.split(/\s*:\s*/g);
                                    if(a.length>1){
                                        hash[_.str.trim(a[0])]=_.str.trim(a[1]||'');
                                    }
                                });
                            }
                        }
                        hash.overflow=v||"";
                    }
                    if(!_.isEmpty(hash)){
                        profile.getSubNodeByItemId('PANEL',subId).css(hash);
                    }
                }

                //merge options
                _.merge(item, options, 'all');

                if(bResize){
                    var t=profile.getRootNode().style;
                    xui.UI.$tryResize(profile, t.width, t.height, true);
                    t=null;
                }
            }
            return self;
        },
        fireCmdClickEvent:function(subId){
            this.getSubNodeByItemId('CMD', subId).onMousedown();
            return this;
        }
    },
    Static:{
        Templates:{
            tagName:'div',
            style:'{_style}',
            className:'{_className}',
            text:"{items}",
            $submap:{
                items:{
                    ITEM:{
                        tagName:'div',
                        className:'{cls1} {itemClass}',
                        style:'{size};{itemStyle};{display}',
                        MOVE:{
                            $order:0,
                            tagName:'div',
                            className:'xui-ui-unselectable xui-uibg-bar {clsmovebg} {cls2} ',
                            style:'cursor:{_cursor}'
                        },
                        CMD:{
                            $order:1,
                            tagName:'div',
                            style:'{cmdDisplay}',
                            className:'xui-ui-unselectable {cls3} '
                        },
                        PANEL:{
                            tagName:'div',
                            className:'xui-uibg-base',
                            style:'position:absolute;left:0;top:0;{_bginfo};{_overflow};',
                            text:xui.UI.$childTag
                        }
                    }
                }
            }
        },
        Appearances:{
            '.setting-xui-layout':{
                width:'9px'
            },
            KEY:{
                position:'absolute',
                overflow:'hidden',
                left:0,
                top:0,
                'font-size':xui.browser.ie?0:null,
                'line-height':xui.browser.ie?0:null
            },
            MOVE:{
                $order:0,
                position:'absolute',

                'z-index':'10',
                'font-size':xui.browser.ie?0:null,
                'line-height':xui.browser.ie?0:null
            },
            CMD:{
                position:'absolute',
                cursor:'pointer',
                'z-index':'20',
                'font-size':xui.browser.ie?0:null,
                'line-height':xui.browser.ie?0:null
            },
            ITEM:{
                position:'absolute',
                "z-index":1,
                overflow:'hidden',
                'border-width':xui.browser.opr?'0px':null,
                'font-size':xui.browser.ie?0:null,
                'line-height':xui.browser.ie?0:null
            },
            PANEL:{
                position:'absolute',
                overflow:'auto',
                /*for opera, opera default set border to 3 ;( */
                'border-width':xui.browser.opr?'0px':null,
                'font-size':xui.browser.ie?0:null,
                'line-height':xui.browser.ie?0:null
            },
            'ITEM-MAIN':{
                left:0,
                right:0,
                top:0,
                bottom:0
            },
            'ITEM-TOP, ITEM-BOTTOM':{
                left:0,
                right:0
            },
            'ITEM-LEFT, ITEM-RIGHT':{
                top:0,
                bottom:0
            },
            'MOVE-TOP, MOVE-BOTTOM':{
                width:'100%',
                height:'7px',
                cursor:'n-resize'
            },
            'MOVE-LEFT, MOVE-RIGHT':{
                height:'100%',
                width:'7px',
                cursor:'w-resize'
            },
            'MOVE-TOP':{
                bottom:0
            },
            'MOVE-BOTTOM':{
                top:0
            },
            'MOVE-LEFT':{
                right:'0px'
            },
            'MOVE-RIGHT':{
                left:0
            },
            'CMD-TOP, CMD-BOTTOM, CMD-LEFT, CMD-RIGHT':{
               'background-image':xui.UI.$bg('icons.gif', '',true),
               'background-repeat':'no-repeat'
            },
            'CMD-TOP':{
                $order:1,
                left:'50%',
                'margin-left':'-20px',
                bottom:0,
                width:'40px',
                height:'9px',
                'background-position':'-360px -232px'
            },
            'CMD-BOTTOM':{
                $order:1,
                left:'50%',
                'margin-left':'-20px',
                top:0,
                width:'40px',
                height:'9px',
                'background-position':'-360px -258px'
            },
            'CMD-LEFT':{
                $order:1,
                top:'50%',
                'margin-top':'-20px',
                right:0,
                height:'40px',
                width:'9px',
                'background-position':'-310px -240px'
            },
            'CMD-RIGHT':{
                $order:1,
                top:'50%',
                'margin-top':'-20px',
                left:0,
                height:'40px',
                width:'9px',
                'background-position':'-336px -240px'
            },
            'CMD-TOP-mouseover':{
                $order:2,
                'background-position':'-360px -245px'
            },
            'CMD-BOTTOM-mouseover':{
                $order:2,
                'background-position':'-360px -271px'
            },
            'CMD-LEFT-mouseover':{
                $order:2,
                'background-position':'-323px -240px'
            },
            'CMD-RIGHT-mouseover':{
                $order:2,
                'background-position':'-349px -240px'
            },

            'MOVE-MAIN':{
                $order:5,
                display:'none'
            },
            'CMD-MAIN':{
                $order:5,
                display:'none'
            }
        },
        Behaviors:{
            DroppableKeys:['PANEL'],
            PanelKeys:['PANEL'],
            HoverEffected:{MOVE:'MOVE',CMD:'CMD'},
            onSize:xui.UI.$onSize,
            MOVE:{
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    var itemId = profile.getSubId(src),
                        item = profile.getItemByDom(src);
                    if(item.folded)return;
                    if(item.locked)return;

                    var main = profile.getItemByItemId('main'),
                        o=profile.getSubNode('ITEM', itemId),
                        m=profile.getSubNodeByItemId('ITEM', 'main'),
                        cursor=xui.use(src).css('cursor'),
                        t=profile.properties,
                        h,w,mh,mw,offset1,offset2;

                    profile.pos=item.pos;

                    if(t.type=='vertical'){
                        h = profile._cur = o.height();
                        mh = m.height();
                        if(item.pos=='before'){
                            offset1 = h - item.min;
                            offset2 = item.max?Math.min(parseInt(item.max,10)-h, (mh-main.min)):(mh-main.min);
                        }else{
                            offset1 = item.max?Math.min(parseInt(item.max,10)-h, (mh-main.min)):(mh-main.min);
                            offset2 = h - item.min;
                        }

                        xui.use(src).startDrag(e,{
                            dragType:'copy',
                            targetReposition:false,
                            verticalOnly:true,
                            maxTopOffset:offset1,
                            maxBottomOffset:offset2,
                            dragCursor:cursor,
                            // IE8 bug
                            targetWidth:xui.browser.ie?xui.use(src).offsetWidth():null,
                            targetHeight:xui.browser.ie?xui.use(src).offsetHeight():null,
                            targetCallback:xui.browser.ie?function(n){n.tagClass('-(top|bottom)',false)}:null
                        });
                    }else{
                        w = profile._cur = o.width();
                        mw = m.width();
                        if(item.pos=='before'){
                            offset1 = w - item.min;
                            offset2 = item.max?Math.min(parseInt(item.max,10)-w, (mw-main.min)):(mw-main.min);
                        }else{
                            offset1 = item.max?Math.min(parseInt(item.max,10)-w, (mw-main.min)):(mw-main.min);
                            offset2 = w - item.min;
                        }

                        xui.use(src).startDrag(e,{
                            dragType:'copy',
                            targetReposition:false,
                            horizontalOnly:true,
                            maxLeftOffset:offset1,
                            maxRightOffset:offset2,
                            dragCursor:cursor,
                            // IE8 bug
                            targetWidth:xui.browser.ie?xui.use(src).offsetWidth():null,
                            targetHeight:xui.browser.ie?xui.use(src).offsetHeight():null,
                            targetCallback:xui.browser.ie?function(n){n.tagClass('-(left|right)',false)}:null
                        });
                    }

                    profile._limited=0;
                },
                onDrag:function(profile, e, src){
                    var t=profile.properties,
                        d=xui.DragDrop,
                        p=xui.DragDrop._profile,
                        b=0;
                    if(t.type=='vertical'){
                        if((p.y<=p.restrictedTop) || (p.y>=p.restrictedBottom))b=true;
                    }else{
                        if(p.x<=p.restrictedLeft || p.x>=p.restrictedRight)b=true;
                    }

                    if(b){
                        if(!profile._limited){
                            profile._bg=p.proxyNode.css('backgroundColor');
                            p.proxyNode.css('backgroundColor','#ff6600');
                            profile._limited=true;
                        }
                    }else{
                        if(profile._limited){
                            p.proxyNode.css('backgroundColor',profile._bg);
                            profile._limited=0;
                        }
                    }

                },
                onDragstop:function(profile, e, src){
                    var t=profile.properties,
                        o=xui.use(src).parent(),
                        r=profile.getRoot(),
                        item = profile.getItemByDom(src);

                    //add offset and refresh
                    if(t.type=='vertical'){
                        //use size to ignore onresize event once
                        o.height(item.size =  profile._cur + (profile.pos=='before'?1:-1)*xui.DragDrop.getProfile().offset.y);
                        xui.UI.$tryResize(profile,null,r.height(),true);
                    }else{
                        o.width(item.size = profile._cur + (profile.pos=='before'?1:-1)*xui.DragDrop.getProfile().offset.x);
                        //use size to ignore onresize event once
                        xui.UI.$tryResize(profile,r.width(),null,true);
                    }
                    profile._limited=0;
                }
            },
            CMD:{
                onMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    var t=profile.properties,
                        itemId = profile.getSubId(src),
                        item = profile.getItemByDom(src),
                        r=profile.getRoot(),
                        main = profile.getItemByItemId('main'),
                        m=profile.getSubNodeByItemId('ITEM', 'main'),
                        o = profile.getSubNode('ITEM',itemId),
                        panel = profile.getSubNode('PANEL',itemId),
                        move = profile.getSubNode('MOVE',itemId),
                        _handlerSize=xui.UI.$getCSSValue('setting-xui-layout','width');

                    if(t.type=='vertical'){
                        // restore resize mode
                        if(item.folded){
                           // if(item.size <= m.height() - main.min + _handlerSize){
                                //restore h
                                o.height(item.size);
                                panel.show();

                                item.folded=false;
                                //set appearance
                                if(item.pos=='before')
                                    xui.use(src).replaceClass(/bottom/g,'top');
                                else
                                    xui.use(src).replaceClass(/top/g,'bottom');

                                //hidden 'move'
                                if(!item.locked)move.css('cursor','n-resize');
                                profile.getSubNode('MOVE').tagClass('-checked',false);
                           // }else
                           //    xui.message('no enough space!');
                        // to min and fix mode
                        }else{
                            o.height(_handlerSize);
                            panel.hide();

                            item.folded=true;
                            if(item.pos=='before')
                                xui.use(src).replaceClass(/top/g,'bottom');
                            else
                                xui.use(src).replaceClass(/bottom/g,'top');

                            if(!item.locked)
                                move.css('cursor','default');
                            profile.getSubNode('MOVE').tagClass('-checked');
                        }
                        xui.UI.$tryResize(profile,null,r.height(),true);
                    }else{
                        if(item.folded){
                           // if(item.size <= m.width()-main.min + _handlerSize){
                                o.width(item.size);
                                panel.show();
                                item.folded=false;
                                if(item.pos=='before')
                                    xui.use(src).replaceClass(/right/g,'left');
                                else
                                    xui.use(src).replaceClass(/left/g,'right');

                                if(!item.locked)move.css('cursor','w-resize');
                                profile.getSubNode('MOVE').tagClass('-checked',false);
                            //}else
                            //    xui.message('no enough space!');
                        }else{
                            o.width(_handlerSize);
                            panel.hide();
                            item.folded=true;
                            if(item.pos=='before')
                                xui.use(src).replaceClass(/left/g,'right');
                            else
                                xui.use(src).replaceClass(/right/g,'left');


                            if(!item.locked)
                                move.css('cursor','default');
                            profile.getSubNode('MOVE').tagClass('-checked');
                        }
                        xui.UI.$tryResize(profile,r.width(),null,true);
                    }

                    return false;
                }
            },
            PANEL:{
                onClick:function(profile, e, src){
                    var p=profile.properties,
                        item = profile.getItemByDom(src);
                    if(p.disabled || item.disabled)return false;
                    if(profile.onClickPanel)
                        return profile.boxing().onClickPanel(profile, item, e, src);
                }
            }
        },
        DataModel:{
            rotate:null,
            selectable:true,
            disabled:null,
            position:'absolute',
            type:{
                listbox:['vertical', 'horizontal'],
                ini:'vertical',
                action:function(value, ovalue){
                    if(value != ovalue){
                        var self=this, auto='auto',
                        nodes2 = self.getSubNode('ITEM',true),
                        nodes1 = self.getSubNode('MOVE',true),
                        nodes3 = self.getSubNode('CMD',true);
                        nodes1.merge(nodes2).merge(nodes3);

                        if(value=='vertical'){
                            nodes1.replaceClass(/(-left)(\b)/ig,'-top$2');
                            nodes1.replaceClass(/(-right)(\b)/ig,'-bottom$2');
                            nodes2.each(function(o){
                                xui(o).height(xui(o).width());
                            })
                            .css({left:0,top:auto,right:auto,bottom:auto})
                            ;
                        }else{
                            nodes1.replaceClass(/(-top)(\b)/ig,'-left$2');
                            nodes1.replaceClass(/(-bottom)(\b)/ig,'-right$2');
                            nodes2.each(function(o){
                                xui(o).width(xui(o).height());
                            })
                            .css({left:auto,top:0,right:auto,bottom:auto})
                            ;

                        }

                        var size = self.getRoot().cssSize();
                        xui.UI.$tryResize(self, size.width, size.height,true);
                    }
                }
            },
            dock:'fill',
            listKey:null,
            width:200,
            height:200,
            items:{
                ini:[],
                set:function(value){
                   var o=this;
                    if(o.renderId){
                        var box = o.boxing(),
                            temp = xui.$getGhostDiv(),
                            //keep children
                            children = _.copy(o.children),
                            p,vv
                        ;
                        o.children.length=0;
                        _.arr.each(children,function(o){
                            //for flush dock
                            delete o[0].$dockParent;
                            //keep it in dom
                            temp.appendChild(o[0].getRootNode());
                        });

                        //bak value

                        //clear all
                        box.clearItems();

                        //set items
                        //for adjust 'main'
                        vv = o.box._adjustItems(value);
                        //inset all items
                        box._insertItems(vv,null,null,true);

                        //restore children
                        _.arr.each(children,function(v){
                            box.append.apply(box,v);
                        });

                        //clear
                        temp.innerHTML='';
                        //set value

                        //resize
                        var size = o.getRoot().cssSize();
                        xui.UI.$tryResize(o, size.width, size.height,true);
                    }else
                        o.properties.items = _.copy(value);
                }
            }
        },
        EventHandlers:{
            onClickPanel:function(profile, item, e, src){}
        },
        _adjustItems2:function(items, pos){
            var arr=[];
            //arrage items
            _.arr.each(items,function(o){
                if(o.id!='main'){
                    arr.push(o=_.isHash(o)?o:{id:''+o});
                    o.pos=pos;
                }
            });

            //set the items to default value
            _.arr.each(arr,function(o){
                o.id = _.isStr(o.id)?o.id:_.id();
                o.min = o.min || 10;
                o.size = parseInt(o.size,10) || 80;
                o.locked= typeof o.locked=='boolean'?o.locked:false;
                o.folded = typeof o.folded=='boolean'?o.folded:false;
                o.hidden = typeof o.hidden=='boolean'?o.hidden:false;
                o.cmd = typeof o.cmd=='boolean'?o.cmd:true;
            });
            return arr;
        },
        _adjustItems:function(items){
            var main, before=[], after=[];

            //arrage items
            _.arr.each(items,function(o){
                if(o.id=='main'){
                    main=o
                }else{
                    if(o.pos=='before')
                        before.push(o);
                    else{
                        o.pos='after';
                        after.push(o);
                    }
                }
            });

            main = main || {};
            main.id = 'main';
            main.min = main.min || 10;

            //reset items
            items.length = 0;
            _.arr.insertAny(items, this._adjustItems2(before,'before'));
            _.arr.insertAny(items, main);
            _.arr.insertAny(items, this._adjustItems2(after,'after'));

            return items;
        },
        _prepareData:function(profile){
            var prop=profile.properties;
            if(!prop.items || !_.isArr(prop.items))
                prop.items = _.clone([
                    {id:'before', pos:'before', locked:false, size:60, min: 50, max:200},
                    {id:'after',pos:'after', locked:false, size:60, min: 50, max:200}
                ]);

            prop.items = this._adjustItems(prop.items);
            return arguments.callee.upper.call(this, profile);
        },
        _prepareItems:function(profile, items){
            var data = arguments.callee.upper.apply(this, arguments);
            _.arr.each(items,function(o){
                delete o.caption;
            });
            return data;
        },
        _prepareItem:function(profile, data,item){
            var p=profile.properties,t;
            if(data.id=='main'){
                data.cls1=profile.getClass('ITEM', '-main');
                data.cls2  = profile.getClass('MOVE', '-main');
                data.cls3  = profile.getClass('CMD', '-main' );
            }else{
                if(p.type=='vertical')
                    data.size = 'height:'+data.size+'px';
                else
                    data.size = 'width:'+data.size+'px';

                var pos;
                if(p.type=='vertical'){
                    data.clsmovebg = "xui-uiborder-tb";
                    if(data.pos=='before')
                        pos='top';
                    else
                        pos='bottom';
                }else{
                    data.clsmovebg = "xui-uiborder-lr";
                    if(data.pos=='before')
                        pos='left';
                    else
                        pos='right';
                }

                data.cls1  = profile.getClass('ITEM', '-' + pos );
                data.cls2  = profile.getClass('MOVE', '-' + pos );
                data.cls3  = profile.getClass('CMD', '-' + pos );

                data.display = data.hidden?'display:none':'';
                data._cursor = data.locked?'default':(p.type=='vertical')?'n-resize':'w-resize';
                data.cmdDisplay = data.cmd?'':'display:none';
            }
            data._bginfo="";
            if(t=data.panelBgClr||p.panelBgClr)
                data._bginfo+="background-color:"+t+";";
            if(t=data.panelBgImg||p.panelBgImg)
                data._bginfo+="background-image:url("+xui.adjustRes(t)+");";
            if(t=data.panelBgImgPos||p.panelBgImgPos)
                data._bginfo+="background-position:"+t+";";
            if(t=data.panelBgImgRepeat||p.panelBgImgRepeat)
                data._bginfo+="background-repeat:"+t+";";
            if(t=data.panelBgImgAttachment||p.panelBgImgAttachment)
                data._bginfo+="background-attachment:"+t+";";
            if(_.isStr(data.overflow))
                data._overflow = data.overflow.indexOf(':')!=-1?(data.overflow):(data.overflow?("overflow:"+data.overflow):"");
            else if(_.isStr(p.overflow))
                data._overflow = p.overflow.indexOf(':')!=-1?(p.overflow):(p.overflow?("overflow:"+p.overflow):"");
        },
        RenderTrigger:function(){
            var t, profile=this;
            _.arr.each(profile.properties.items,function(item){
                if(item.id!='main'){
                    if(item.folded && (t=profile.getSubIdByItemId(item.id))){
                            item.folded=false;
                            profile.getSubNode('CMD',t).onMousedown();
                        }
                }
            });
        },
        _onresize:function(profile,width,height){
            var t=profile.properties,itemId,
                key=profile.keys.ITEM,
                panel=profile.keys.PANEL,
                move=profile.getSubNode('MOVE',true),
                main=profile.getItemByItemId('main'),
                mainmin=main.min||10,
                _handlerSize=xui.UI.$getCSSValue('setting-xui-layout','width');

            var obj={}, obj2={};
            // **keep the original size
            //,obj3={};
            _.arr.each(t.items,function(o){
                itemId = profile.getSubIdByItemId(o.id);
                obj[itemId] = {};
                obj2[itemId] = {};
//                obj3[itemId] = o;
            });

            var fun=function(prop,w,width,left,right,offset,forceoffset){
                var _t,m,m1,itemId, temp1=0,temp2=0,temp=0,blocknumb=0,offsetbak=offset;
                _.arr.each(prop.items,function(o){
                    if(o.id=='main')return;
                    if(o.pos=='before'){
                        itemId = profile.getSubIdByItemId(o.id);
                        if(o.hidden){
                            m=0;
                            obj2[itemId][width]=o.size;
                        }else if(o.folded){
                            m=obj2[itemId][width]=_handlerSize;
                        }else{
                            blocknumb++;
                            m=m1=o.size;
                            if(m>offset+o.min){
                                m-=offset;
                            }else{
                                offset=m-o.min;
                                m=o.min;
                            }
                            m-=forceoffset;
                            m=Math.max(m,_handlerSize);
                        }
                        obj2[itemId][left]=temp1;
                        temp1 +=m;
                        obj[itemId][left]=0;
                        obj[itemId][width] = m - _handlerSize;
                        obj2[itemId][right]=obj[itemId][right]='auto';
                        obj2[itemId][width] = m;
                        mainmin+=_handlerSize;
                    }
                });
                _.arr.each(prop.items,function(o){
                    if(o.id=='main')return;
                    if(o.pos=='after'){
                        itemId = profile.getSubIdByItemId(o.id);
                        if(o.hidden){
                            m=0;
                            obj2[itemId][width]=o.size;
                        }else if(o.folded){
                            m=obj2[itemId][width]=_handlerSize;
                        }else{
                            blocknumb++;
                            m=m1=o.size;
                            if(m>offset+o.min){
                                m-=offset;
                            }else{
                                offset=m-o.min;
                                m=o.min;
                            }
                            m-=forceoffset;
                            m=Math.max(m,_handlerSize);
                        }
                        obj2[itemId][right]=temp2;
                        temp2 +=m;
                        obj[itemId][right]=0;
                        obj[itemId][width] = m-_handlerSize;
                        obj2[itemId][left]=obj[itemId][left]='auto';
                        obj2[itemId][width] = m;
                        mainmin+=_handlerSize;
                    }
                },null,true);
                temp = temp1+temp2;

                //set main
                if(w-temp>=mainmin || forceoffset){
                    _t=profile.getSubIdByItemId('main');
                    obj2[_t][width]=obj[_t][width]=w-temp;
                    obj2[_t][left]=temp1;
                }else{
                    var args=_.toArr(arguments);
                    // second time only
                    if(!offsetbak){
                        args[args.length-2]=(mainmin-(w-temp))/blocknumb;
                    }
                    // third time only
                    else{
                        args[args.length-2]=offsetbak;
                        args[args.length-1]=(mainmin-(w-temp))/blocknumb;
                    }
                    //second time
                    fun.apply(null,args);
                }
            };

            if(t.type!='vertical'){
                if(!_.isNull(width)){
                    //get left
                    fun(t,width,'width','left','right',0,0);
//                    _.each(obj2,function(o,i){
//                       if(o.width && !obj3[i].folded)obj3[i].size=o.width;
//                    });
                 }
                if(!_.isNull(height)){
                    _.each(obj,function(o,id){
                        obj2[id].height=o.height=height;
                    });
                }
            }else{
                if(!_.isNull(height)){
                    //get left
                    fun(t,height,'height','top','bottom',0,0);
//                    _.each(obj2,function(o,i){
//                        if(o.height  && !obj3[i].folded)obj3[i].size=o.height;
//                    });
                }
                if(!_.isNull(width)){
                    _.each(obj,function(o,id){
                        obj2[id].width=o.width=width;
                    });
                }
            }

            //collect width/height in size
            _.each(obj2, function(o, id){
                profile.getSubNode('PANEL', id).cssRegion(obj[id], true);
                profile.getSubNode('ITEM', id).cssRegion(obj2[id]);
            });
        }
    }
});
