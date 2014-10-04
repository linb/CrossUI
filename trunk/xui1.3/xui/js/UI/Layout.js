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
                            profile.getSubNodeByItemId('MOVE',subId).css('display',options.locked?'none':'');
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
                            className:'xui-uibg-bar {cls2} ',
                            style:'{moveDisplay}'
                        },
                        CMD:{
                            $order:1,
                            tagName:'div',
                            style:'{cmdDisplay}',
                            className:'{cls3} '
                        },
                        PANEL:{
                            tagName:'div',
                            className:'xui-uibg-base',
                            style:'position:absolute;left:0;top:0;{_overflow};',
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
            'MOVE-mouseover':{
                $order:1,
                'background-color':'#C8E1FA'
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
                /*for opera, opera defalut set border to 3 ;( */
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
                cursor:'n-resize',
                'border-top':'solid 1px #c8e1fa',
                'border-bottom':'solid 1px #648cb4'
            },
            'MOVE-LEFT, MOVE-RIGHT':{
                height:'100%',
                width:'7px',
                cursor:'w-resize',
                'border-left':'solid 1px #c8e1fa',
                'border-right':'solid 1px #648cb4'
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
                            if(item.size <= m.height() - main.min + _handlerSize){
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
                            }else
                                xui.message('no enough space!');
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
                            if(item.size <= m.width()-main.min + _handlerSize){
                                o.width(item.size);
                                panel.show();
                                item.folded=false;
                                if(item.pos=='before')
                                    xui.use(src).replaceClass(/right/g,'left');
                                else
                                    xui.use(src).replaceClass(/left/g,'right');

                                if(!item.locked)move.css('cursor','w-resize');
                                profile.getSubNode('MOVE').tagClass('-checked',false);
                            }else
                                xui.message('no enough space!');
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
            }
        },
        DataModel:{
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
            overflow:{
                ini:xui.browser.isTouch?'auto':undefined,
                listbox:['','visible','hidden','scroll','auto'],
                action:function(v){
                    var node=this.getSubNode('PANEL',true);
                    if(v){
                        if(v.indexOf(':')!=-1){
                            _.arr.each(v.split(/\s*;\s*/g),function(s){
                                var a=s.split(/\s*:\s*/g);
                                if(a.length>1)node.css(_.str.trim(a[0]),_.str.trim(a[1]||''));
                            });
                            return;
                        }
                    }
                    node.css('overflow',v||'');
                }
            },
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
        _prepareItem:function(profile, item){
            var prop=profile.properties;
            if(item.id=='main'){
                item.cls1=profile.getClass('ITEM', '-main');
                item.cls2  = profile.getClass('MOVE', '-main');
                item.cls3  = profile.getClass('CMD', '-main' );
                return;
            }

            if(prop.type=='vertical')
                item.size = 'height:'+item.size+'px';
            else
                item.size = 'width:'+item.size+'px';

            var pos;
            if(prop.type=='vertical'){
                if(item.pos=='before')
                    pos='top';
                else
                    pos='bottom';
            }else{
                if(item.pos=='before')
                    pos='left';
                else
                    pos='right';
            }

            item.cls1  = profile.getClass('ITEM', '-' + pos );
            item.cls2  = profile.getClass('MOVE', '-' + pos );
            item.cls3  = profile.getClass('CMD', '-' + pos );
            item.display = item.hidden?'display:none':'';
            item.moveDisplay = item.locked?'display:none':'';
            item.cmdDisplay = item.cmd?'':'display:none';

            if(_.isStr(item.overflow))
                item._overflow = item.overflow.indexOf(':')!=-1?(item.overflow):("overflow:"+item.overflow);
            else if(_.isStr(prop.overflow))
                item._overflow = prop.overflow.indexOf(':')!=-1?(prop.overflow):("overflow:"+prop.overflow);
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
            var _t,t=profile.properties, m,n, itemId, temp1,temp2,temp, key=profile.keys.ITEM, panel=profile.keys.PANEL,
            move=profile.getSubNode('MOVE',true),
            _handlerSize=xui.UI.$getCSSValue('setting-xui-layout','width');

            var obj={}, obj2={};
            _.arr.each(t.items,function(o){
                itemId = profile.getSubIdByItemId(o.id);
                obj[itemId] = {};
                obj2[itemId] = {};
            });
            if(t.type!='vertical'){
                if(!_.isNull(width)){
                    //get left
                    temp=temp1=temp2=0;
                    _.arr.each(t.items,function(o){
                        if(o.id=='main')return;
                        itemId = profile.getSubIdByItemId(o.id);
                        if(o.pos=='before'){
                            n=profile.getSubNode('ITEM', itemId);

                            if(o.hidden){
                                m=0;
                                obj2[itemId].width=o.size;
                            }else if(o.folded){
                                m=obj2[itemId].width=_handlerSize;
                            }else
                                m= n.width();

                            obj2[itemId].left=temp1;
                            temp1 +=m;
                            obj2[itemId].right='auto';
                            obj[itemId].right='auto';
                            obj[itemId].left=0;
                            obj[itemId].width = m - (o.locked?0:_handlerSize);
                        }
                    });
                    _.arr.each(t.items,function(o){
                        if(o.id=='main')return;
                        itemId = profile.getSubIdByItemId(o.id);
                        if(o.pos=='after'){
                            n =profile.getSubNode('ITEM', itemId);

                            if(o.hidden){
                                m=0;
                                obj2[itemId].width=o.size;
                            }else if(o.folded){
                                m=obj2[itemId].width=_handlerSize;
                            }else
                                m= n.width();

                            obj2[itemId].right=temp2;
                            temp2 +=m;
                            obj2[itemId].left='auto';
                            obj[itemId].right=0;
                            obj[itemId].left='auto';
                            obj[itemId].width = m-(o.locked?0:_handlerSize);
                        }
                    },null,true);
                    temp = temp1+temp2;

                    //set main
                    //specify widht/height first,
                    if(width-temp>=0){
                        _t=profile.getSubIdByItemId('main');
                        obj[_t].width=width-temp;
                        obj2[_t].width=width-temp;
                        obj2[_t].left=temp1;
                    }
                }
                if(!_.isNull(height)){
                    _.each(obj,function(o,id){
                        o.height=height;
                        obj2[id].height=height;
                    });
                }
            }else{
                if(!_.isNull(height)){
                    //get top
                    temp=temp1=temp2=0;
                    _.arr.each(t.items,function(o){
                        if(o.id=='main')return;
                        itemId=profile.getSubIdByItemId(o.id);
                        if(o.pos=='before'){
                            n=profile.getSubNode('ITEM', itemId);

                            if(o.hidden){
                                m=0;
                                obj2[itemId].height=o.size;
                            }else if(o.folded){
                                m=obj2[itemId].height=_handlerSize;
                            }else
                                m= n.height();
                            obj2[itemId].top=temp1;
                            temp1 += m;
                            obj2[itemId].bottom='auto';
                            obj[itemId].top=0;
                            obj[itemId].bottom='auto';
                            obj[itemId].height=m-(o.locked?0:_handlerSize);
                        }
                    });
                    _.arr.each(t.items,function(o){
                        if(o.id=='main')return;
                        itemId=profile.getSubIdByItemId(o.id);
                        if(o.pos=='after'){
                            n=profile.getSubNode('ITEM', itemId);

                            if(o.hidden){
                                m=0;
                                obj2[itemId].height=o.size;
                            }else if(o.folded){
                                m=obj2[itemId].height=_handlerSize;
                            }else
                                m= n.height();

                            obj2[itemId].bottom=temp2;
                            temp2 += m;
                            obj2[itemId].top='auto';
                            obj[itemId].bottom=0;
                            obj[itemId].top='auto';
                            obj[itemId].height=m-(o.locked?0:_handlerSize);
                        }
                    },null,true);

                    temp =temp1+temp2;
                    //set main
                    if(height-temp>=0){
                        _t=profile.getSubIdByItemId('main');
                        obj[_t].height=height-temp;
                        obj2[_t].height=height-temp;
                        obj2[_t].top=temp1;
                    }
                }
                if(!_.isNull(width)){
                    _.each(obj,function(o, id){
                        o.width=width;
                        obj2[id].width=width;
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
