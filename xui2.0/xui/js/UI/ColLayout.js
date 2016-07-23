Class("xui.UI.ColLayout",["xui.UI","xui.absList"],{
    Dependencies:['xui.UI.Panel'],
    Instance:{
        addPanel:function(args, col, basePrf, before, type){
            var profile=this.get(0),
                items=profile.properties.items,
                prop=profile.properties;
            if(!col)
                col=items[0].id;

            if(!type)type="manual";

            if(_.arr.subIndexOf(items, 'id',col)==-1)
                return this;
            
            if(!args.properties)args.properties={};
            var ns=this, profile=ns.get(0);
            _.merge(args.properties,{   
                dock:'none',
                position:'relative',
                left:0,
                top:0,
                width:'auto',
                height:'auto',
                
                toggle:true,
                toggleBtn:true,
                
                dragKey: prop.disabled?null:profile.box.KEY+":"+profile.$xid,                
                closeBtn:!prop.disabled 
            });
            _.set(args,['CC','TBAR'],"");
            args.CC['TBAR']+=" xui-ui-unselectable";

            var panel=new xui.UI.Panel(args.properties, args.events, args.host, args.theme, args.CS, args.CC, args.CB, args.CF);

            return this.movePanel(panel.get(0), col, basePrf, before,type);
        },
        movePanel:function(prf, col, basePrf, before,type){
            var profile=this.get(0);
            if(!type)type="manual";
            prf.ColLayoutColumn=parseInt(col,10)-1;
            var old=prf.ColLayoutSize;            
            prf.ColLayoutSize=profile._warr?profile._warr[prf.ColLayoutColumn]:300;

            if(prf["xui.UI"])prf=prf.get(0);
            if(basePrf && basePrf["xui.UI"])basePrf=basePrf.get(0);

            if(prf && prf!=basePrf){
                var flag2,items=profile.children;

                // add to collayout, or move to the right container first
                if(prf.parent!=profile || prf.childrenId != col){
                    this.append(prf, col);
                    flag2=1;
                }
                
                var node,
                    tnode=prf.getRootNode();

                // reposition
                if(!basePrf){
                    node=this.getSubNodeByItemId('PANEL', col);
                    if(node.last().isEmpty() || node.last().id()!=tnode.id){
                        node.append(tnode);
                        flag2=1;
                    }
                }else if(before){
                    node=basePrf.getRoot();
                    if(node.prev().isEmpty() || node.prev().id()!=tnode.id){
                        node.addPrev(tnode);
                        flag2=1;
                        
                        var i1=_.arr.subIndexOf(items,'0',basePrf),
                            i2=_.arr.subIndexOf(items,'0',prf);
                        if(i1!=-1){
                            var item=items[i2];
                            _.arr.removeFrom(items, i2);
                            _.arr.insertAny(items, item, i1, true);
                        }
                    }
                }else{
                    node=basePrf.getRoot();
                    if(node.next().isEmpty() || node.next().id()!=tnode.id){
                        node.addNext(tnode);
                        flag2=1;

                        var i1=_.arr.subIndexOf(items,'0',basePrf),
                            i2=_.arr.subIndexOf(items,'0',prf);
                        if(i1!=-1 && i1 > items.length){
                            var item=items[i2];
                            _.arr.removeFrom(items, i2);
                            _.arr.insertAny(items, item, i1+1, true);
                        }
                    }
                }
                var flag=xui.browser.ie6 && (!old || old>prf.ColLayoutSize);
                if(flag)prf.getRootNode().parentNode.style.display= 'none';

                if(flag2 && profile.onRelayout)this.onRelayout(profile, type, prf, prf.ColLayoutSize);

                if(flag)_.asyRun(function(){
                    prf.getRootNode().parentNode.style.display='';
                });
            }
            return this;
        },
        append:function(target,subId, pre, base){
            var p=this.get(0).properties;
            if(subId=subId||(p.items && p.items[0] && p.items[0].id))
                arguments.callee.upper.call(this, target, subId, pre, base);
            return this;
        }
    },
    Static:{
        Templates:{
            tagName:'div',
            style:'{_style}',
            className:'{_className}',
            ITEMS:{
               $order:10,
               tagName:'div',
               text:"{items}"
            },
            COVER:{
                tagName:'div'
            },
            $submap:{
                items:{
                    ITEM:{
                        tagName:'div',
                        style:'width:{width}',
                        MOVE:{
                            // must be first one
                            $order:1,
                            tagName:'div',
                            className:'xui-ui-unselectable',
                            style:'{_displaymove}'
                        },
                        PANEL:{
                            $order:2,
                            tagName:'div',
                            text:xui.UI.$childTag
                        }
                    }
                }
            }
        },
        Appearances:{
            KEY:{
                position:'absolute',
                'overflow':'auto',
                'overflow-x':'hidden',
                'overflow-y':'auto',
                border:'none',
                zoom:xui.browser.ie6?1:null
            },            
            ITEMS:{
                position:'relative',
                // ensure to get heigth
                overflow:'hidden',
                border:'none',
                zoom:xui.browser.ie6?1:null
            },
            COVER:{
                position:'absolute',
                left:0,
                top:0,
                width:'100%',
                height:'100%',
                display:'none',
                'z-index':10,
                background: xui.browser.ie?'url('+xui.ini.img_bg+')':null
            },
            MOVE:{
                $order:0,
                position:'relative',
                'float':'right',
                width:'4px',
                height:'200px',
                cursor:'e-resize',
                'background-color':'#f0f0f0',
                'border-width':xui.browser.opr?'0':null,
                'font-size':xui.__iefix1,
                'line-height':xui.__iefix1,
                zoom:xui.browser.ie6?1:null
            },
            'MOVE-mouseover':{
                $order:1,
                'background-color': '#e4e4e4'
            },
            ITEM:{
                position:'static',
                'float':'left',
                overflow:'hidden',
                'border-width':'0',
                'font-size':xui.__iefix1,
                'line-height':xui.__iefix1,
                zoom:xui.browser.ie6?1:null
            },
            PANEL:{
                position:'static',
                overflow:'hidden',
                zoom:xui.browser.ie6?1:null,
                /*for opera, opera defalut set border to 3 ;( */
                'border-width':xui.browser.opr?'0':null,
                'font-size':xui.__iefix1,
                'line-height':xui.__iefix1
            }
        },
        Behaviors:{
            HoverEffected:{MOVE:'MOVE'},
            DroppableKeys:['KEY'],
            onSize:xui.UI.$onSize,
            disableTips:true,
            MOVE:{
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    var pro=profile.properties;
                    if(pro.disabled)return;
                    
                    var min=pro.minWidth,
                        cursor=xui.use(src).css('cursor'),
                        pre=profile._pre=xui.use(src).parent(),
                        preW=profile._preW=pre.offsetWidth(),
                        next=profile._next=pre.next(),
                        nextW=profile._nextW=next.offsetWidth(),
                        offset1 = preW-min,
                        offset2 = nextW-min;

                        if(offset1<0)offset1=0;
                        if(offset2<0)offset2=0;

                    profile._bg=null;
                    profile._limited=0;
                        
                    xui.use(src).startDrag(e,{
                        dragType:'copy',
                        targetReposition:false,
                        horizontalOnly:true,
                        widthIncrement:10,
                        maxLeftOffset:offset1,
                        maxRightOffset:offset2,
                        dragCursor:cursor
                    });
                    
                },
                onDrag:function(profile, e, src){
                    var p=xui.DragDrop.getProfile(),b=0;
                    if(p.x<=p.restrictedLeft || p.x>=p.restrictedRight)b=true;
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
                    var pro=profile.properties,
                        min=pro.minWidth,
                        items=pro.items,
                        mins=[],
                        p=xui.DragDrop.getProfile(),
                        arr=profile.getSubNode('ITEM',true).get(),
                        n=xui.use(src),
                        l=profile.getRoot().width(),
                        a=[],t;

                    _.arr.each(arr,function(o,i){
                        a[i]=xui([o]).offsetWidth();
                        if(o==profile._pre.get(0))
                            a[i]+=p.offset.x;
                        else if(o==profile._next.get(0))
                            a[i]-=p.offset.x;
                    });                    
                    _.arr.each(items,function(o,i){
                        o.width=((a[i]/l)*100)+"";
                    });
                    xui.UI.$doResize(profile,l,null,true);
                }
            },
            onMousemove:function(profile,e){
                if(profile.$$ondrag){
                    var prop=profile.properties;
                    if(prop.disabled)return;
                    
                    if(xui.DragDrop.getProfile().isWorking){
                        var box=profile.box,
                            height=profile.$$height,
                            dragid = profile.$$dragitemid,
                            rst=box._checkpos(profile,xui.Event.getPos(e));
                        if(rst){
                            var col=rst[0],
                                row=rst[1],
                                rowup=rst[2];
                            if(col){
                                if(row)
                                    profile.$$droppable=box._checkDroppable(profile, rowup?2:3, xui(row), height, dragid);
                                else
                                    profile.$$droppable=box._checkDroppable(profile, 1, xui(col), height, dragid);
                            }else{
                                box._setNoDroppable(profile);
                                delete profile.$$droppable;
                            }
                        }
                    }
                }
            }
        },
        DataModel:{
            rotate:null,
            position:'absolute',
            dock:'fill',
            listKey:null,
            width:200,
            height:200,
            minWidth:200,
            disabled:{
                ini:false,
                action: function(v){
                    // no ui 
                }
            },
            items:[
                {id:'1',width:'33.3%'},
                {id:'2',width:'33.3%'},
                {id:'3',width:'33.3%'}
            ]
        },
        EventHandlers:{
            onColResize:function(profile, sizes){},
            onRelayout:function(profile, type, panel, size){}
        },
        _preparePosSizeEtc:function(profile){
            var root=profile.getRoot(),
                items=profile.getSubNode('ITEM',true),
                w=0,h=0,ns,i,t,

                rootPos=root.offset(),
                rootSize=root.cssSize(),
                colsWidthData=[],
                rowsHeightData=[];

            // gets contrl's pos / size, and inner widgets' cols/rows data for dragDrop
            items.each(function(o){
                w=w+xui(o).offsetWidth();
                colsWidthData.push([w, o.lastChild.id]);
                //get panel's children
                ns=o.lastChild.childNodes;
                h=0;
                rowsHeightData.push([]);
                for(i=0;t=ns[i];i++){
                    //ignore node without id/not uiprovile/
                    if(!t.id || !xui.UIProfile.getFromDom(t) || !t.style || t.style.display=='none' || t.style.visibility=='hidden')continue;
                    h=h+t.offsetHeight;
                    rowsHeightData[rowsHeightData.length-1].push([h,t.id]);
                }
            });
            profile._cachePosSizeData = [rootPos, rootSize, colsWidthData, rowsHeightData];
            
            profile._ddup=profile._ddid=profile._ddincol=profile._ddi==null;
        },
        _checkpos:function(profile, pos, force){
            var _data=profile._cachePosSizeData,
                rootPos=_data[0],
                rootSize=_data[1],
                colsWidthData=_data[2],
                rowsHeightData=_data[3],
                
                changed;

            var col,
                left = pos.left-rootPos.left,
                top = pos.top-rootPos.top,
                i=0, temp,
                t, to=0,
                arr;

            while(t=colsWidthData[i++]){
                if(left<t[0]){
                    if(profile._ddincol===t[1])
                        break;
                    changed=true;
                    profile._ddi=i-1;
                    profile._ddincol=t[1];
                    //if col changed, clear row vars
                    profile._ddid=profile._ddup=null;
                    break;
                }
            }
            if(profile._ddi!==null){
                col=profile._ddincol;
                arr=rowsHeightData[profile._ddi];
                i=0;
                while(t=arr[i++]){
                    if(top<t[0]){
                        //if raw changed, clear pos
                        if(profile._ddid!==t[1])
                            profile._ddup=null;
                        j=(top < (to+(t[0]-to)/2));
                        if(profile._ddid===t[1] && profile._ddup===j)
                            break;
                        profile._ddid=t[1];
                        profile._ddup=j;
                        changed=true;
                        break;
                    }
                    to=t[0];
                }
                if(changed || force)
                    return [col,profile._ddid,profile._ddup];
            }else{
                if(changed || force)
                    return [null];
                else
                    return;
            }
        },
        _checkDroppable:function(profile, type, node, height, dragid){
            var self=this,
                candrop=false,
                proxy= profile._proxy || (profile._proxy=xui.create('<div style="border:1px dashed #FF0000;">'));

            proxy.height(height||20);
            if(node.isEmpty())return;
            if(type===1){
                if(node.last().isEmpty() || node.last().id()!=dragid){
                    node.append(proxy);
                    candrop=true;
                }
            }else if(type===2){
                if(node.id()!=dragid){
                    if(node.prev().isEmpty() || node.prev().id()!=dragid){
                        node.addPrev(proxy);
                        candrop=true;
                    }
                }
            }else{
                if(node.id()!=dragid){
                    if(node.next().isEmpty() || node.next().id()!=dragid){
                        node.addNext(proxy);
                        candrop=true;
                    }
                }
            }
            if(candrop){
                xui.DragDrop.setDragIcon('add');
                return true;
            }else{
                self._setNoDroppable(profile);
                return false;
            }
        },
        _setNoDroppable:function(profile){
            if(profile._proxy){
                profile._proxy.remove();
                delete profile._proxy;
            }
            profile._ddup=profile._ddid=profile._ddincol=profile._ddi==null;
            xui.DragDrop.setDropFace();
        },
        
        _onDropMarkShow:function(){ 
            return false;
        },
        _onDropMarkClear:function(profile){
            profile.box._setNoDroppable(profile);
        },
        _onDragEnter:function(profile,e,src){
            var ddId=xui.DragDrop.getProfile().$id;
            if(profile.$$ddfalg != ddId){
                profile.$$ddfalg = ddId;
                profile.box._preparePosSizeEtc(profile);
            }
            
            var targetPrf = xui.DragDrop.getProfile().dragData.profile;

            // inner panel
            if(targetPrf &&  targetPrf.parent==profile){
                profile.$$dragitemid=xui.DragDrop.getProfile().dragData.profile.domId;
                profile.$$height=xui.DragDrop.getProfile().dragData.profile.getRoot().offsetHeight();
            }
            profile.getSubNode('COVER').css({display:'block'});
            profile.$$ondrag=true;

            delete profile.$$dropalbe;
        },
        _onDragLeave:function(profile){
            profile.getSubNode('COVER').css({display:'none'});
            delete profile.$$dragitemid;
            delete profile.$$height;
            delete profile.$$ondrag;
        },
        _onDrop:function(profile, e){
            if(profile.$$droppable){
                var rst=profile.box._checkpos(profile, xui.Event.getPos(e), true),
                    ddd=xui.DragDrop.getProfile().dragData,
                    targetPrf=ddd.profile,
                    exists = targetPrf.parent==profile;

                if(rst && rst[0]){
                    var col=profile.getItemIdByDom(rst[0]),
                        base=xui.UIProfile.getFromDom(rst[1]),
                        before=rst[2];
                    if(col){
                        if(exists){
                            // move only
                            profile.boxing().movePanel(targetPrf,col,base,before,'repos');
                        }else{
                            // add
                            profile.boxing().addPanel(ddd.data.properties,ddd.data.events,col,base,before,'dropadd');
                        }
                    }
                }
            }
            profile.getSubNode('COVER').css({display:'none'});
            profile.box._setNoDroppable(profile);
            delete profile._cachePosSizeData;
            delete profile.$$height;
            delete profile.$$ondrag;
        },
        _prepareData:function(profile){
            profile.properties.dropKeys = profile.box.KEY+":"+profile.$xid;
            var data = arguments.callee.upper.call(this, profile);
            data.items[data.items.length-1]._displaymove="display:none";
            return data;
        },
        _onresize:function(profile,width,height){
            if(!width)return;
            var ins=profile.boxing(),
                root=profile.getRoot(),
                pro=profile.properties,
                min=pro.minWidth,
                items=pro.items,
                mins=[],othersl=0,
                arr=profile.getSubNode('ITEM',true).get(),
                arr2=profile.getSubNode('PANEL',true).get(),
                itemsN=profile.getSubNode('ITEMS'),
                ll=width,
                a=[],t,needRec;

            //1
            _.arr.each(items,function(o,i){
                t=parseFloat(o.width)/100;
                a[i]=width*t;
                // fix
                if(a[i]<min){
                    a[i]=min;
                    ll-=min;
                    mins.push(o);
                    needRec=true;
                }
                // need recaculate
                else{
                    othersl+=t;
                }
            });
            //2
            if(needRec){
                width=ll;
                needRec=false;
                _.arr.each(items,function(o,i){
                    if(_.arr.indexOf(mins,o)==-1){
                        t=parseFloat(o.width)/100;
                        a[i]=width*(t/othersl);
                        // fix
                        if(a[i]<min){
                            a[i]=min;
                            ll-=min;
                            mins.push(o);
                            needRec;
                        }
                    }
                });
            }
            //3
            if(needRec){
                _.arr.each(items,function(o,i){
                    if(_.arr.indexOf(mins,o)==-1){
                        a[i]=ll;
                        if(a[i]<min){
                            a[i]=min;
                        }
                    }
                });
            }
            // set items' with
            width=0;
            _.arr.each(a,function(o,i){
                width+=o;
            });
            itemsN.width(width);

            // set item's width
            _.arr.each(arr,function(o,i){
                var flag=xui.browser.ie6 && parseFloat(o.style.width)>a[i];
                if(!flag)o.style.width = parseInt(a[i],10) + 'px';
            });
            profile._warr=a;
            if(profile.onColResize)ins.onColResize(profile, a);
            
            if(profile.onRelayout){
                ins.getChildren().each(function(panel){
                    panel.ColLayoutSize=profile._warr?profile._warr[panel.ColLayoutColumn]:300;
                    ins.onRelayout(profile, 'resize', panel, panel.ColLayoutSize);
                });
            }
            if(xui.browser.ie6)
                _.arr.each(arr,function(o,i){
                    var flag=parseFloat(o.style.width)>a[i];
                    if(flag)o.style.width = a[i] + 'px';
                });
        }
    }
});
