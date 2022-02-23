/*
profile input:
===========================
    [dragType]: String , "move","copy","deep_copy","shape","icon","blank" and "none", default is "shape"
        "blank": moves a empty proxy when mouse moves
        "move": moves target object directly when mouse moves
        "copy": moves a copy of target object when mouse moves
        "deep_copy": moves a deep copy of target object when mouse moves
        "shape": moves a shape of target object when mouse moves
        "icon": moves a icon that represents target object when mouse moves
        "none": moves mouse only
-------------------------
    [dragDefer] :  Number, when [xui.DragDrop.startDrag] is called, the real drag action will be triggered after [document.onmousemove] runs [dragDefer] times, default is 0;
-------------------------
    [magneticDistance]: Number,
    [xMagneticLines]: Array of Number,
    [yMagneticLines]: Array of Number,
        Magnetic setting:
        yMagneticLines 1                      2                     3
              |                      |                     |       xMagneticLines
          ----+----------------------+---------------------+-------1
              |                      |                     |
              |                      |                     |
              |                      |                     |
              |                      |                     |
          ----+----------------------+---------------------+-------2
              |                      |                     |
              |                      |                     |
              |                      |                     |
          ----+----------------------+---------------------+-------3
              |                      |                     |

        magneticDistance
         +-------------
         |*************
         |*************
         |**
         |**
         |**
-------------------------
    [widthIncrement]: Number,
    [heightIncrement]: Number,
        Increment setting:
                   widthIncrement
               <-------------------->
              |                      |                     |
          ----+----------------------+---------------------+-------
              |                      |                     |
heightIncrement|                      |                     |
              |                      |                     |
              |                      |                     |
          ----+----------------------+---------------------+-------
              |                      |                     |
              |                      |                     |
              |                      |                     |
              |                      |                     |
          ----+----------------------+---------------------+-------
              |                      |                     |
              |                      |                     |
-------------------------
    [horizontalOnly]: Number,
    [verticalOnly]: Number,
    horizontalOnly
    ------------------------------------------
                ****************
                ****************
                ****************
                ****************
                ****************
                ****************
    ------------------------------------------
    verticalOnly
               |                |
               |                |
               |****************|
               |****************|
               |****************|
               |****************|
               |****************|
               |****************|
               |                |
               |                |
-------------------------
    [maxBottomOffset]: Number,
    [maxLeftOffset]: Number,
    [maxRightOffset]: Number,
    [maxTopOffset]: Number,
        you can set the limited offset region
        +----------------------------------------------+
        |              |                               |
        |              |maxTopOffset                   |
        |<------------>****************<-------------->|
        |maxLeftOffset**************** maxRightOffset  |
        |              ****************                |
        |              ****************                |
        |              ****************                |
        |              ****************                |
        |              |maxBottomOffset                |
        |              |                               |
        +----------------------------------------------+
-------------------------
    [targetReposition]: <bool>,

    //ini pos and size
    [targetLeft]: Number
    [targetTop]: Number
    [targetWidth]: Number
    [targetHeight]: Number
    [targetCSS]: <object>
        You can set position and size when drag start:
                      targetLeft
                      |
                      |
        targetTop  ---**************** |
                      **************** |
                      **************** |
                      **************** |targetHeight
                      **************** |
                      **************** |
                     |<--targetWidth ->+
-------------------------
    //properties
    [dragCursor]: <string>
-------------------------
    //for drag data
    [dragKey]
    [dragData]

profile output: readonly
===========================
xui.DragDrop.getProfile():
    x  :current X value of mouse;
    y  :current Y value of mouse;
    ox: mouse original X when drag start;
    oy: mouse original Y when drag start;
    curPos:{left:xx,top:xx}: current css pos of the dragging node;
    offset : {x:,y}: offset from now to origin
    restrictedLeft : Number
    restrictedRight : Number
    restrictedTop : Number
    restrictedBottom : Number
    isWorking: Bool.
    proxyNode: xui.Dom object,
    dropElement: String, DOM element id.
*/
xui.Class('xui.DragDrop',null,{
    Static:{
        _eh:"_dd",
        _id:"xui.dd:proxy:",
        _idi:"xui.dd:td:",
        _type:{blank:1,move:1,shape:1,deep_copy:1,copy:1,icon:1,none:1},
        _Icons:{none:'0 0', move:'0 -16px', link:'0 -32px',add:'0 -48px'},
        _profile:{},

        //get left for cssPos
        _left:function(value){
            var proxySize=this.$proxySize, prf=this._profile;
            if(prf.magneticDistance>0 && prf.xMagneticLines.length){
                var l=prf.xMagneticLines.length;
                while(l--)
                    if(Math.abs(value + proxySize - prf.xMagneticLines[l])<=prf.magneticDistance)
                        return prf.xMagneticLines[l] - proxySize;
            }
            if(prf.widthIncrement>1)
               return Math.floor((value + proxySize)/prf.widthIncrement)*prf.widthIncrement - proxySize;
            return value;
        },
        //get top for cssPos
        _top:function(value){
            var proxySize=this.$proxySize, prf=this._profile;
            if(prf.magneticDistance>0 && prf.yMagneticLines.length){
                var l=prf.yMagneticLines.length;
                while(l--)
                    if(Math.abs(value + proxySize - prf.yMagneticLines[l])<=prf.magneticDistance)
                        return prf.yMagneticLines[l] - proxySize;
            }
            if(prf.heightIncrement>1)
                return Math.floor((value + proxySize)/prf.heightIncrement)*prf.heightIncrement - proxySize;
            return value;
        },

        _ini:function(o){
            var d=this,p=d._profile,_t=xui.win;

            d._box = { width :_t.width()+_t.scrollLeft(),  height :_t.height()+_t.scrollTop()};

            p.ox = p.x;
            p.oy = p.y;

            if(d._proxy = o){
                d._proxystyle=o.get(0).style;

                //ini cssPos here
                d._profile.curPos = d._cssPos= d._proxy.cssPos();

                d._cssPos_x = p.x - d._cssPos.left;
                d._cssPos_y = p.y - d._cssPos.top;

                p.restrictedLeft = p.x - (p.maxLeftOffset||0);
                p.restrictedRight =  p.x + (p.maxRightOffset||0);
                p.restrictedTop = p.y - (p.maxTopOffset||0);
                p.restrictedBottom = p.y + (p.maxBottomOffset||0);

                //here
                d._proxyLeft = d._pre.left = d._cssPos.left;
                d._proxyTop = d._pre.top = d._cssPos.top;

                if("move" !== p.dragType){
                    d._proxy.css('zIndex',xui.Dom.TOP_ZINDEX*10);
                    xui.setNodeData(d._proxy.get(0),'zIndexIgnore', 1);
                }
            }

        },
        _reset:function(){
            var d=this,NULL=null,FALSE=false;
            //reset
            xui.tryF(d.$reset);
            d.setDropFace();
            d._resetProxy();

            d.$proxySize=50;
            //event
            d.$mousemove=d.$mouseup=d.$onselectstart=d.$ondragstart='*';

            //reset private vars
            d._cursor='';
            d._pre={};
            d._proxyLeft=d._proxyTop=d._cssPos_x=d._cssPos_y=0;
            d._stop=FALSE;
            if(d._onDrag && d._onDrag.tasks){
                d._onDrag.tasks.length=0;
                delete d._onDrag.tasks;
            }
            if(d._onDragover && d._onDragover.tasks){
                d._onDragover.tasks.length=0;
                delete d._onDragover.tasks;
            }
            if(d._c_droppable){d._c_droppable.length=0;}
            d._c_droppable=d._c_dropactive=d._cssPos=d._box=d._dropElement=d._source=d._proxy=d._proxystyle=d._onDrag=d._onDragover=NULL;
            //reset profile
            d._profile={
                // the unqiue id for dd
                $id:xui.rand(),
                dragType:'shape',
                dragCursor:'move',
                targetReposition:true,

                dragIcon:xui.ini.img_dd,
                magneticDistance:0,
                xMagneticLines:[],
                yMagneticLines:[],
                widthIncrement:0,
                heightIncrement:0,
                dragDefer:0,

                horizontalOnly:FALSE,
                verticalOnly:FALSE,
                maxBottomOffset:NULL,
                maxLeftOffset:NULL,
                maxRightOffset:NULL,
                maxTopOffset:NULL,

                targetNode:NULL,
                targetCSS:NULL,
                dragKey:NULL,
                dragData:NULL,
                targetLeft:NULL,
                targetTop:NULL,
                targetWidth:NULL,
                targetHeight:NULL,
                targetOffsetParent:NULL,
                targetCallback:NULL,
                tagVar:NULL,

                shadowFrom:NULL,

                //Cant input the following items:
                proxyNode:NULL,
                x:0,
                y:0,
                ox:0,
                oy:0,
                curPos:{},
                offset:{},
                isWorking:FALSE,
                restrictedLeft:NULL,
                restrictedRight:NULL,
                restrictedTop:NULL,
                restrictedBottom:NULL,
                dropElement:NULL
            };
            d.__touchingfordd=0;
            return d;
        },
        abort:function(){
            this._stop=true;
        },
        _end:function(){
            var d=this,win=window,doc=document,body=doc.body,md="onmousedown",mm="onmousemove",mu="onmouseup",
                mm2,mu2;
            if(xui.browser.isTouch){
                mm2=(xui.browser.ie&&win.PointerEvent)?"onpointermove":(xui.browser.ie&&win.MSPointerEvent)?"onmspointermove":"ontouchmove";
                mu2=(xui.browser.ie&&win.PointerEvent)?"onpointerup":(xui.browser.ie&&win.MSPointerEvent)?"onmspointerup":"ontouchend";
            }

            if(d._proxy) d._unpack();

            //must here
            //if bak, restore
            if(d.$onselectstart!='*')body.onselectstart=d.$onselectstart;
            if(d.$ondragstart!='*')doc.ondragstart=d.$ondragstart;
            //if bak, restore
            if(d.$mousemove!='*')doc[mm]=d.$mousemove;
            if(d.$mouseup!='*')doc[mu]=d.$mouseup;
            if(xui.browser.isTouch){
                if(d.$touchmove!='*')doc[mm2]=d.$touchmove;
                if(d.$touchend!='*')doc[mu2]=d.$touchend;
            }

            return  d;
        },
        startDrag:function(e, targetNode, profile, dragKey, dragData){
            var d=this,win=window,t;
            if(d._profile.isWorking)return false;
            //clear
            d._end()._reset();
            d._profile.isWorking=true;
            d.__touchingfordd = e.type=="xuitouchdown";

            profile=xui.isHash(profile)?profile:{};
            e = e || win.event;
            // not left button
            if(xui.Event.getBtn(e) !== 'left')
               return true;

            d._source = profile.targetNode = xui(targetNode);
            d._cursor = d._source.css('cursor');

            if((t=profile.targetNode.get(0)) && !t.id){
                t.id=xui.Dom._pickDomId();
                t=null;
            }

            //must set here
            d._defer = profile.dragDefer = xui.isNumb(profile.dragDefer) ? profile.dragDefer : 0;
            if(true===profile.dragCursor)profile.dragCursor=d._cursor;
            if(typeof profile.dragIcon == 'string') profile.dragType="icon";

            var doc=document, body=doc.body, _pos = xui.Event.getPos(e),md="onmousedown",mm="onmousemove",mu="onmouseup",
                mm2,mu2;
            if(xui.browser.isTouch){
                mm2=(xui.browser.ie&&win.PointerEvent)?"onpointermove":(xui.browser.ie&&win.MSPointerEvent)?"onmspointermove":"ontouchmove";
                mu2=(xui.browser.ie&&win.PointerEvent)?"onpointerup":(xui.browser.ie&&win.MSPointerEvent)?"onmspointerup":"ontouchend";
            }

            profile.x = _pos.left;
            profile.y = _pos.top;

            profile.dragKey= dragKey || profile.dragKey || null;
            profile.dragData= dragData  || profile.dragData|| null;

            var fromN=xui.Event.getSrc(e);

            d._start=function(e){
//ie6: mousemove - mousedown =>78 ms
//delay is related to window size, weird
            //                  try{
                var p=d._profile;
                //set profile
                xui.merge(p, profile, "with");

                //call event, you can call abort(set _stoop)
                d._source.beforeDragbegin();

                if(d._stop){d._end()._reset();return false}

                //set xui.Event._preDroppable at the begining of drag, for a dd from a child in a droppable node
                if(xui.Event && (t=d._source.get(0))){
                    xui.Event._preDroppable= t.id;
                    t=null;
                }

                //set default icon
                if(p.dragType=='icon')p.targetReposition=false;

                //ini
                d._ini(p.dragType=='none'?null:d._pack(_pos, p.targetNode));
                // on scrollbar
                if(profile.x >= d._box.width  || profile.y >= d._box.height ){d._end()._reset();return true}

                d._source.onDragbegin();

                //set back first
                if(p.dragDefer<1){
                    d.$mousemove = doc[mm];
                    d.$mouseup = doc[mu];
                    if(xui.browser.isTouch){
                        d.$touchmove = doc[mm2];
                        d.$touchend = doc[mu2];
                    }
                }
                //avoid setcapture
                if(xui.browser.ie)
                    xui.setTimeout(function(){if(fromN.releaseCapture)fromN.releaseCapture()});

                //back up
                doc[mm] = d.$onDrag;
                doc[mu] = d.$onDrop;
                if(xui.browser.isTouch){
                    doc[mm2] = d.$onDrag;
                    doc[mu2] = d.$onDrop;
                }

                //for events
                d._source.afterDragbegin();
                //for delay, call ondrag now
                if(p.dragDefer>0)d.$onDrag.call(d, e);

                // For touch-only platform
                // In ipad or other touch-only platform, you have to decide the droppable order by youself
                // The later added to DOM the higher the priority
                // Add droppable links
                if(xui.browser.isTouch && d.__touchingfordd){
                    d._c_droppable=[];
                    var cdata=xui.$cache.droppable[p.dragKey],purge=[];
                    xui.arr.each(cdata,function(i){
                        if(!xui.use(i).get(0)){
                            purge.push(i);
                            return;
                        }
                        var ni=xui.use(i),h=ni.offsetHeight(),w=ni.offsetWidth(),v=ni.css('visibility'),hash;
                        if(w&&h&&v!='hidden'){
                            hash=ni.offset();
                            hash.width=w;hash.height=h;hash.id=i;
                            d._c_droppable.unshift(hash);
                        }
                    });
                    // self clear
                    if(purge.length){
                        xui.arr.each(purge,function(key){
                            xui.arr.removeValue(cdata,key);
                        });
                    }
                }
            //                  }catch(e){d._end()._reset();}
            };
            if(xui.browser.ie){
                d.$ondragstart=doc.ondragstart;
                d.$onselectstart=body.onselectstart;
                doc.ondragstart = body.onselectstart = null;
                if(doc.selection && doc.selection.empty)try{doc.selection.empty()}catch(e){}            }
            //avoid select
            xui.Event.stopBubble(e);

            //fire document onmousedown event
            if(profile.targetNode.get(0)!==doc)
                xui(doc).onMousedown(true, xui.Event.getEventPara(e, _pos));

            if(profile.dragDefer<1){
                xui.tryF(d._start,[e],d);
                return false;
            }else{
                //for mouseup before drag
                d.$mouseup = doc[mu];
                doc[mu] = function(e){
                    xui.DragDrop._end()._reset();
                    return xui.tryF(document.onmouseup,[e],null,true);
                };
                if(xui.browser.isTouch){
                    d.$touchend = doc[mu2];
                    doc[mu2]=doc[mu];
                }
                var pbak={};
                //for mousemove before drag
                d.$mousemove = doc[mm];
                doc[mm] = function(e){
                    var p=xui.Event.getPos(e);
                    if(p.left===pbak.left&&p.top===pbak.top)return;
                    pbak=p;
                    if(--d._defer<=0)xui.DragDrop._start(e);
                    return false;
                };
                if(xui.browser.isTouch){
                    d.$touchmove = doc[mm2];
                    doc[mm2]=doc[mm];
                }
            }
//ie6: mousemove - mousedown =>78 ms
        },
        $onDrag:function(e){
            var d=xui.DragDrop,p=d._profile;

            if(d.$SimulateMousemoveInMobileDevice)return false;

           //try{
                e = e || window.event;
                //set _stop or (in IE, show alert)
                if(!p.isWorking || d._stop){
                //if(!p.isWorking || d._stop || (xui.browser.ie && (!e.button) )){
                    d.$onDrop(e);
                    return true;
                }

                var _pos=xui.Event.getPos(e);
                p.x=_pos.left;
                p.y=_pos.top;

                if(!p.isWorking)return false;

                if(d._proxy){
                    // crack for new chrome performance problem
                    d._proxystyle.contentVisibility="hidden";
                    if(!p.verticalOnly){
                        d._proxyLeft=Math.floor(d._left(
                            ((p.maxLeftOffset!==null && p.x<=p.restrictedLeft)?p.restrictedLeft:
                             (p.maxRightOffset!==null && p.x>=p.restrictedRight)?p.restrictedRight : p.x)
                            - d._cssPos_x)
                        );
                        if(d._proxyLeft-d._pre.left)
                            d._proxystyle.left=Math.round(parseFloat(d._proxyLeft))+'px';
                        d._pre.left=d._proxyLeft;
                        p.curPos.left = d._proxyLeft + d.$proxySize;
                    }
                    if(!p.horizontalOnly){
                        d._proxyTop=Math.floor(d._top(
                            ((p.maxTopOffset!==null && p.y<=p.restrictedTop) ? p.restrictedTop :
                             (p.maxBottomOffset!==null && p.y>=p.restrictedBottom) ? p.restrictedBottom : p.y)
                            - d._cssPos_y)
                        );
                        if(d._proxyTop-d._pre.top)
                            d._proxystyle.top=Math.round(parseFloat(d._proxyTop))+'px';
                        d._pre.top=d._proxyTop;
                        p.curPos.top = d._proxyTop + d.$proxySize;
                    }
                    d._proxystyle.contentVisibility="";
                }else{
                    p.curPos.left = p.x;
                    p.curPos.top = p.y;
                    //style='none', no dd.current dd._pre provided
                    //fireEvent
                    //d._source.onDrag(true); //shortcut for mousemove
                }

                if(d._onDrag!=1){
                    if(d._onDrag)d._onDrag(e,d._source._get(0));
                    else{
                        //ensure to run once only
                        d._onDrag=1;
                        //if any ondrag event exists, this function will set _onDrag
                        d._source.onDrag(true,xui.Event.getEventPara(e, _pos));
                    }
                }

                // For touch-only platform
                // In ipad or other touch-only platform, you have to decide the droppable order by youself
                // The later joined the higher the priority
                if(xui.browser.isTouch && d.__touchingfordd){
                    if(d._c_droppable){
                        for(var i=0,l=d._c_droppable.length;i<l;i++){
                            var o=d._c_droppable[i],
                                target=xui.use(o.id).get(0),
                                oactive=d._c_dropactive,
                                otarget=xui.use(oactive).get(0);

                            if(p.x>=o.left&&p.y>=o.top&&p.x<=(o.left+o.width)&&p.y<=(o.top+o.height)){
                                if(oactive==o.id){
                                    //console.log('in ' +o.id );
                                    var first = e.changedTouches[0];
                                    d.$SimulateMousemoveInMobileDevice=1;
                                    xui.Event.simulateEvent(target,"mousemove",{screenX:first.screenX, screenY:first.screenY, clientX:first.clientX, clientY:first.clientY});
                                    delete d.$SimulateMousemoveInMobileDevice;
                                }else{
                                    xui.Event.simulateEvent(target,"mouseover",{screenX:p.left, screenY:p.top, clientX:p.left, clientY:p.top});
                                    d._c_dropactive=o.id;

                                    //console.log('active ' +o.id);
                                    if(oactive && otarget){
                                        xui.Event.simulateEvent(otarget,"mouseout",{screenX:p.left, screenY:p.top, clientX:p.left, clientY:p.top});
                                        //console.log('deactive ' + oactive);
                                    }
                                }
                                break;
                            }else{
                                if(oactive==o.id){
                                    if(otarget){
                                        xui.Event.simulateEvent(otarget,"mouseout",{screenX:p.left, screenY:p.top, clientX:p.left, clientY:p.top});
                                    }
                                    d._c_dropactive=null;
                                    //console.log('deactive ' + oactive);
                                    break;
                                }
                            }
                        }
                    }
                }

            //}catch(e){xui.DragDrop._end()._reset();}finally{
               return false;
            //}
        },
        $onDrop:function(e){
            var d=xui.DragDrop,p=d._profile,evt=xui.Event;
//                try{
                e = e || window.event;

                // opera 9 down with
                // if(!isWorking){evt.stopBubble(e);return false;}
                d._end();
                if(p.isWorking){

                    //here, release drop face first
                    //users maybe use html() function in onDrop function
                    d.setDropFace();

                    var r = d._source.onDragstop(true,evt.getEventPara(e));
                    if(d._dropElement)
                        xui.use(d._dropElement).onDrop(true,evt.getEventPara(e));
                }
//                }catch(a){}finally{
                d._reset();
                evt.stopBubble(e);
                xui.tryF(document.onmouseup,[e]);
                return !!r;
//                }
        },
        setDropElement:function(id){
            this._profile.dropElement=this._dropElement=id;
            return this;
        },
        getProfile:function(){
            var d=this,p=d._profile;
            p.offset=d._proxy
            ?
            { x : d._proxyLeft-p.ox+d._cssPos_x,  y : d._proxyTop-p.oy+d._cssPos_y}
            :
            { x : p.x-p.ox,  y : p.y-p.oy}
            ;
            return p;
        },
        setDropFace:function(target, dragIcon){
            var d=this,
                s1='<div style="position:absolute;z-index:'+xui.Dom.TOP_ZINDEX+';font-size:0;line-height:0;border-',
                s2=":dashed 1px #ff6600;",
                region=d._Region,rh=d._rh, st, sl,
                bg='backgroundColor';
            if(region && region.parent())
                region.remove(false);
            if(d._R){
                d._R.css(bg, d._RB);
                delete d._R;
                delete d._RB;
            }

            if(target){
                //never create, or destroy the region
                if(!region || !region.get(0)){
                    region=d._Region=xui.create(s1+'top:solid 2px #ff6600;left:0;top:0;width:100%;height:0;"></div>'+s1+'right'+s2+'right:0;top:0;height:100%;width:0;"></div>'+s1+'bottom'+s2+'bottom:0;left:0;width:100%;height:0;"></div>'+s1+'left'+s2+'width:0;left:0;top:0;height:100%;"></div>');
                    rh=d._rh=xui([region.get(1),region.get(3)]);
                }
                region.get(0).style.contentVisibility="hidden";
                target=xui(target);
                if(xui.browser.ie6)rh.height('100%');
                if(target.css('display')=='block'){
                    xui.setNodeData(region.get(0),'zIndexIgnore', 1);
                    target.append(region);
                    // ensure in the view
                    region.top(st=target.scrollTop()).left(sl=target.scrollLeft());
                    region.get(2).style.top='auto';region.get(1).style.left='auto';
                    region.get(2).style.bottom='-'+st+'px';
                    region.get(1).style.right='-'+sl+'px';

                    if(xui.browser.ie6 && !rh.get(0).offsetHeight)
                        rh.height(target.get(0).offsetHeight);
                }else{
                    d._RB = target.get(0).style[bg];
                    d._R=target;
                    target.css(bg, '#FA8072');
                }
                region.get(0).style.contentVisibility="";
                d.setDragIcon(dragIcon||'move');
            }else
                d.setDragIcon('none');
            return d;
        },
        setDragIcon:function(key){
            //avoid other droppable targetNode's setDropFace disturbing.
            xui.resetRun('setDropFace', null);
            var d=this,p=d._profile,i=p.proxyNode,ic=d._Icons;
            if(i && p.dragType=='icon')
                i.first(4).css(typeof key=='object'?key:{backgroundPosition: (ic[key]||key)});
            return d;
        },
        _setProxy:function(child, pos){
            var t,temp,d=this,p=d._profile,dom=xui.Dom;
            if(!dom.byId(d._id))
                xui('body').prepend(
                    //&nbsp; for IE6
                    xui.create('<div id="' + d._id + '" style="left:0;top:0;border:0;font-size:0;line-height:0;padding:'+d.$proxySize+'px;position:absolute;background:url('+xui.ini.img_bg+') repeat;"><div style="font-size:0;line-height:0;" id="' +d._idi+ '">'+(xui.browser.ie6?'&nbsp;':'')+'</div></div>')
                );
            t=xui(d._id);
            //t.rotate('10');
            if(p.dragKey){
                d.$proxySize=0;
                t.css('padding',0);
            }else{
                pos.left -=  d.$proxySize;
                pos.top -= d.$proxySize;
                if(!p.targetOffsetParent)
                    dom.setCover(true,null,false,p.dragCursor);
            }
            if(temp=p.targetOffsetParent)
                xui(temp).append(t);

            if(child){
                xui(d._idi).empty(false).append(child);
                p.proxyNode = child;
            }else
                p.proxyNode = xui(d._idi);
            t.css({display:'',zIndex:dom.TOP_ZINDEX*10,cursor:p.dragCursor}).offset(pos, temp);
            xui.setNodeData(t.get(0),'zIndexIgnore', 1);

            return t;
        },
        _resetProxy:function(){
            var d=this, p=d._profile,
                dom=xui.Dom,
                id1=d._id,
                id2=d._idi;
            if(dom.byId(id1)){
                var k,o=xui(id2),t=xui(id1);
                //&nbsp; for IE6
                if(xui.browser.ie6)
                    o.html('&nbsp;');
                else o.empty();
                o.attr('style','font-size:0;line-height:0;');
                //o.rotate(0);
                xui('body').prepend(
                    t
                    .css({
                        zIndex:0,
                        cursor:'',
                        display:'none',
                        padding:Math.round(parseFloat(d.$proxySize))+'px'
                    })
                );
                p.proxyNode=d._proxystyle=null;
                dom.setCover(false);
            }
        },
        _pack:function(mousePos,targetNode){
            var target, pos={}, size={}, d=this, p=d._profile, t;
            // get abs pos (border corner)
            if(p.targetLeft===null || null===p.targetTop)
                t=targetNode.offset(null, p.targetOffsetParent);
            pos.left = null!==p.targetLeft?p.targetLeft: t.left;
            pos.top = null!==p.targetTop?p.targetTop: t.top;

            switch(p.dragType){
                case 'deep_copy':
                case 'copy':
                    size.width =  xui.isNumb(p.targetWidth)? p.targetWidth:(targetNode.cssSize().width||0);
                    size.height = xui.isNumb(p.targetHeight)?p.targetHeight:(targetNode.cssSize().height||0);
                    var n=targetNode.clone(p.dragType=='deep_copy')
                        .css({position:'relative',margin:'0',left:'0',top:'0',right:'',bottom:'',cursor:p.dragCursor,'cssFloat':'none'})
                        .cssSize(size)
                        .id('',true)
                        .css('opacity',0.8);

                    if(p.targetCallback)
                        p.targetCallback(n);

                    n.query('*').id('',true);
                    if(p.targetCSS)
                        n.css(p.targetCSS);
                    target = d._setProxy(n,pos);
                    break;
                case 'shape':
                    // get size
                    size.width = null!==p.targetWidth?p.targetWidth:targetNode.offsetWidth();
                    size.height = null!==p.targetHeight?p.targetHeight:targetNode.offsetHeight();
                    size.width-=2;size.height-=2;
                    target = d._setProxy(
                        xui.create('div').css({border:'dashed 1px',fontSize:'0',lineHeight:'0'}).cssSize(size)
                        ,pos);
                    break;
                case 'blank':
                    target = d._setProxy(null,pos);
                    break;
                case 'icon':
                    pos.left=xui.isNumb(p.targetLeft)?p.targetLeft:(mousePos.left /*- xui.win.scrollLeft()*/ + 16);
                    pos.top=xui.isNumb(p.targetTop)?p.targetTop:(mousePos.top /*- xui.win.scrollTop()*/ + 16);
                    t='<table border="0" class="xui-node xui-node-table"><tr><td valign="top"><span class="xui-node xui-node-span" style="background:url('+p.dragIcon+') no-repeat left top;width:'+(xui.isNumb(p.targetWidth)?p.targetWidth:16)+'px;height:'+(xui.isNumb(p.targetHeight)?p.targetHeight:16)+'px;" ></span></td><td id="xui:dd:shadow" '+(p.shadowFrom?'style="border:solid 1px #e5e5e5;background:#fff;font-size:12px;line-height:14px;"':'')+'>'+(p.shadowFrom?

                    xui(p.shadowFrom).clone(true)
                    .css({left:'auto',top:'auto', position:'relative'})
                    .outerHTML().replace(/\s*id\=[^\s\>]*/g,''):'')

                    +'</td></tr></table>';
                    target = d._setProxy(xui.create(t).css('opacity',0.8), pos);
                    break;
                case 'move':
                    d.$proxySize=0;
                    target=targetNode;
                    if(target.css('position') != 'absolute')
                        target.css('position','absolute').offset(pos);
                    target.css('cursor',p.dragCursor);
            }

            return target;
        },
        _unpack:function(){
            var d=this, p=d._profile, t,f;
            if(p.targetReposition && ("move" != p.dragType)){
                if((t=xui(d._source)))
                    if(!t.isEmpty()){
                        if(t.css('position')!= 'absolute')
                            t.css('position','absolute').cssPos(t.offset(null,t.get(0).offsetParent ));

                        //for ie bug
                        if(xui.browser.ie)
                            t.cssRegion({right:'',bottom:''});
                        t.offset(p.curPos, p.targetOffsetParent||document.body);
                    }
            }
            if("move" == p.dragType)
                d._source.css('cursor',d._cursor);
        },
        _unRegister:function(node, key){
            var eh=this._eh;
            xui([node])
                .$removeEvent('beforeMouseover', eh)
                .$removeEvent('beforeMouseout', eh)
                .$removeEvent('beforeMousemove', eh);

            var o=xui.getNodeData(node.$xid, ['_dropKeys']),c=xui.$cache.droppable;
            if(o)
                for(var i in o)
                    if(c[i])
                        xui.arr.removeValue(c[i],node.$xid);

            xui.setNodeData(node.$xid, ['_dropKeys']);
        },
        _register:function(node, key){
            var eh=this._eh;
            xui(node)
                .beforeMouseover(function(p,e,i){
                    var t=xui.DragDrop;
                    p=t._profile;
                    if(p.dragKey && xui.getNodeData(i,['_dropKeys', p.dragKey])){
                        t.setDropElement(i);
                        t._onDragover=null;
                        xui.use(i).onDragenter(true);
                        if(t._dropElement)
                            xui.resetRun('setDropFace', t.setDropFace, 0, [i], t);
                    }
                }, eh)
                .beforeMouseout(function(p,e,i){
                    var t=xui.DragDrop;
                    p=t._profile;
                     if(p.dragKey && xui.getNodeData(i,['_dropKeys', p.dragKey])){
                        xui.use(i).onDragleave(true);
                        if(t._dropElement==i){
                            t.setDropElement(t._onDragover=null);
                            xui.resetRun('setDropFace', t.setDropFace, 0, [null], t);
                        }
                    }
                }, eh)
                .beforeMousemove(function(a,e,i){
                    var t=xui.DragDrop, h=t._onDragover, p=t._profile;
                    //no dragover event
                    if(h==1)return;
                    if(t._dropElement==i && p.dragKey && xui.getNodeData(i,['_dropKeys', p.dragKey])){
                        if(h)h(e,i);
                        else{
                            //ensure to run once only
                            t._onDragover=1;
                            //if any dragover event exists, this function will set _onDragover
                            xui.use(i).onDragover(true,xui.Event.getEventPara(e));
                        }
                    }
                }, eh);

            var o=xui.getNodeData(node.$xid, ['_dropKeys']),c=xui.$cache.droppable;
            if(o)
                for(var i in o)
                    if(c[i])
                        xui.arr.removeValue(c[i],node.$xid);

            var h={},a=key.split(/[^\w-]+/)
            for(var i=0,l=a.length;i<l;i++){
                h[a[i]]=1;
                c[a[i]]=c[a[i]]||[];
                c[a[i]].push(node.$xid);
            }
            xui.setNodeData(node.$xid, ['_dropKeys'], h);

        }
    },
    After:function(){
        this._reset();
        //add dom dd functions
        xui.each({
            startDrag:function(e, profile, dragKey, dragData){
                xui.DragDrop.startDrag(e, this.get(0), profile, dragKey||'', dragData||null);
                return this;
            },
            draggable:function(flag, profile, dragKey, dragData, target){
                var self=this, dd=xui.DragDrop;
                target=target?typeof(target)=="function"?xui.tryF(self.getTarget,[],this):xui(target):null;
                if(!target || !target.get(0)){
                    target=self;
                }
                self.removeClass('xui-ui-selectable').addClass('xui-ui-unselectable')
                if(flag===undefined)
                    flag=true;
                else if(typeof flag=='object'){
                    profile=flag;
                    flag=true;
                }
                var f=function(p,e,src){
                    if(xui.getId(xui.Event.getSrc(e))!=src)return true;
                    target.startDrag(e, profile, dragKey, dragData);
                };

                if(!!flag){
                    self.$addEvent('beforeMousedown',f, dd._eh, -1);
                }else{
                    self.$removeEvent('beforeMousedown', dd._eh);
                }

                return self;
            },
            droppable:function(flag, key){
                if(flag===undefined)flag=true;
                key = key || 'default';
                var d=xui.DragDrop;
                return this.each(function(o){
                    if(!!flag)
                        d._register(o, key);
                    else
                        d._unRegister(o, key);
                });
            }
        },function(o,i){
            xui.Dom.plugIn(i,o);
        });
    }
});