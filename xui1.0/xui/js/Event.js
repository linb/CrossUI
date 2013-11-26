/* event
*  dependency: base _ ; Class ; xui ;
*/
Class('xui.Event',null,{
    Constructor:function(event,node,fordrag,tid){
        var self = xui.Event,
            dd=0,id,t,
            dragdrop=xui.DragDrop,
            src, type,  pre, obj;

        //get event object , and src of event
        if(!(event=event||window.event) || !(src=node)){
            src=node=null;
            return false;
        }
        node=null;

        //type
        type = event.type;
        
        // if touable, use only simulatedMousedown
        if(xui.browser.isTouch && self.__realtouch){
            if(('mousedown'==type || 'dblclick'==type) && !self.__simulatedMousedown)
                return false;
        }

        //for correct mouse hover problems;
        if('mouseover'==type || 'mouseout'==type){
            dd=(dragdrop&&dragdrop._profile.isWorking)?1:2;
            //for droppable
            if(dd!=1 && fordrag){
                src=null;
                return self.$FALSE;
            }
            //don't return false, here, opera will stop the system event hander => cursor not change
            if(!self._handleMouseHover(event, src, dd==1)){
                src=null;
                return self.$FALSE;
            }
            if(dd==1)
                pre=dragdrop&&dragdrop._dropElement;
        //for tab focusHook
        }else if((obj=self._tabHookStack).length &&
            self._kb[type] &&
            (event.$key || event.keyCode || event.charCode)==9 &&
            false === self._handleTabHook(self.getSrc(event), obj=obj[obj.length-1])){
                src=null;
                return;
            }

        id = tid||self.getId(src);
        //get profile from dom cache
        if(obj = self._getProfile(id)){
            if(type=="DOMMouseScroll")
                type="mousewheel";
            //for setBlurTrigger
            if(type=='mousedown' || type=="mousewheel")
                _.tryF(xui.Dom._blurTrigger,[obj,event]);
            //for resize
            else if(type=="resize"){
                type='size';
                //for IE, always fire window onresize event after any innerHTML action
                if(xui.browser.ie && window===src){
                    var w=xui.browser.contentBox && document.documentElement.clientWidth || document.body.clientWidth,
                        h=xui.browser.contentBox && document.documentElement.clientHeight || document.body.clientHeight;
                    if(obj._w==w&&obj._h==h){
                        src=null;
                        return;
                    }
                    obj._w=w;obj._h=h;
                }
            }

            var j, f, name, r=true, funs=[];
            //order by: before, on, after
            for(j=0; j<=2; ++j){
                //if in dd, get before Mouse.. only
                if(dd==1 && j!==0 && !event.$force)break;
                //if not in dd, get on/after Mouse.. only
                if(dd==2 && j===0)continue;
                //get event name from event type
                name = self._type[type+j] || ( self._type[type+j] = self._getEventName(type, j));
                /*
                event.$e : called by fireEvent
                event.$all : fire all events of the type: before/on/after
                event.$name : fire one group of event of the type.
                */
                if(!event.$e || event.$all || (name==event.$name))obj._getEV(funs, id, name, src.$xid);
            }

            /*call function by order
             widget before -> dom before -> widget on -> dom on -> widget after -> dom after
            */
            f=function(a,b){
                for(var i=0,v;v=arguments.callee.tasks[i++];)
                    //if any fun return false, stop event bubble
                    if(false === v(obj, a, b))
                        return false;
                return true;
            };
            f.tasks=funs;
            r = f(event, src.$xid);

            if(dragdrop){
                //shortcut for onDrag('mousemove')
                if(type=='drag')
                    dragdrop._onDrag=f;
                else if(type=='dragover')
                    dragdrop._onDragover=f;
            }else{
                f.tasks.length=0;
                delete f.tasks;
                f=null;
            }

            if(dd==1){
                //From parent droppable node to child droppable node, fire parent node's mouseout manually
                if('mouseover'==type && dragdrop._dropElement==src.$xid && pre && pre!=src.$xid){
                    t=xui.use(pre).get(0);
                    self({
                        type: 'mouseout',
                        target: t,
                        $e:true,
                        $name:'beforeMouseout',
                        preventDefault:function(){this.returnValue=false},
                        stopPropagation:function(){this.cancelBubble=true}
                        },t);
                    dragdrop.setDropElement(src.$xid);
                }

                //Out of droppable node, 'dragdrop._dropElement' will be set to null in beforeMouseover
                //set _preDroppable flag, for parent node is droppable too
                if('mouseout'==type && !dragdrop._dropElement && pre && pre==src.$xid){
                    self._preDroppable=id;
                    _.asyRun(function(){delete xui.Event._preDroppable});
                }

                //if fire dd, prevent to fire parent dd
                //notice: this dont trigger cursor changing in opera
                if(src.$xid==dragdrop._dropElement)
                    r=false;
            }

            if(r===false)self.stopBubble(event);
            src=null;                
            return r;
        }
    },
    Static:{
        $FALSE:xui.browser.opr?undefined:false,
        _type:{},
        _kb:{keydown:1,keypress:1,keyup:1},
        _reg:/(-[\w]+)|([\w]+$)/g,
        $eventhandler:function(){return xui.Event(arguments[0],this)},
        $eventhandler2:function(){return xui.Event(arguments[0],this,1)},
        $eventhandler3:function(){return xui.Event(arguments[0],xui.Event.getSrc(arguments[0]||window.event))},
        //collection
        _events : ("mouseover,mouseout,mousedown,mouseup,mousemove,mousewheel,click,dblclick,contextmenu," +
                "keydown,keypress,keyup,scroll,"+
                "blur,focus,"+
                "load,unload,abort,"+
                "change,select,submit,reset,error,"+
                //customized handlers:
                //dont use resize in IE
                "move,size," +
                //dragstart dragdrop dragout will not work in IE(using innerHTML)
                // Use "dragbegin instead of dragstart" to avoid native DnD
                "dragbegin,drag,dragstop,dragleave,dragenter,dragover,drop,"+
                // 3 touch event
                "touchstart,touchmove,touchend,touchcancel")
                .split(','),
        _getEventName:function(name,pos){
            return (name=this._map1[name]) && ((pos===0||pos==1||pos==2) ? name[pos] : name);
        },
        _getProfile:function(id,a,b){
            return id && (typeof id=='string') && ((a=(b=xui.$cache.profileMap)[id])
                            ?
                            a['xui.UIProfile']
                                ?
                                a
                                :
                                (b=b[id.replace(this._reg,'')])
                                    ?
                                    b
                                    :
                                    a
                            :
                            b[id.replace(this._reg,'')]);
        },
        _handleTabHook:function(src, target){
            if(src===document)return true;
            var node=src,r,tabindex=node.tabIndex;
            do{
                if(xui.getId(node)==target[0]){
                    node=src=null;
                    return true;
                }
            }while(node && (node=node.parentNode) && node!==document && node!==window)

            r=_.tryF(target[1],[target[0],tabindex],src);
            node=src=null;
            return false;
        },
        _handleMouseHover:function(event,target,dd){
            if(target==document){
                target=null;
                return true;
            }
            var node = (event.type=='mouseover'?event.fromElement:event.toElement)||event.relatedTarget;

            //When out of droppable node, if the parent node is droppable return true;
            if(dd && event.type=='mouseover' &&this._preDroppable)
                try{
                    do{
                        if(node && node.id && node.id==this._preDroppable){
                            target=node=null;
                            return true
                        }
                    }while(node && (node=node.parentNode) && node!==document && node!==window)
                }catch(a){}

            //for firefox wearing anynomous div in input/textarea
            //related to 'div.anonymous-div' always returns true
            if(xui.browser.gek)
                try{
                    do{
                        if(node==target){
                            target=node=null;
                            return false
                        }
                    }while(node && (node=node.parentNode))
                }catch(a){
                    var pos=this.getPos(event),
                        node=xui([target]),
                        p=node.offset(),
                        s=node.cssSize(),
                        out=(pos.left<p.left||pos.left>p.left+s.width||pos.top<p.top||pos.top>p.top+s.height);
                    target=node=null;
                    return event.type=='mouseover'?!out:out;
                }
            else
                do{
                    if(node==target){
                        target=node=null;
                        return false
                    }
                }while(node && (node=node.parentNode))
            target=node=null;
            return true;
        },

        _tabHookStack:[],
        pushTabOutTrigger:function(boundary, trigger){this._tabHookStack.push([xui(boundary)._nodes[0], trigger]);return this},
        popTabOutTrigger:function(flag){if(flag)this._tabHookStack=[];else this._tabHookStack.pop();return this},
        getSrc:function(event){
            var a;
            return ((a=event.target||event.srcElement||null) && xui.browser.kde && a.nodeType == 3)?a.parentNode:a
        },
        getId:function(node){
            return window===node?"!window":document===node?"!document":node.id;
        },
        // only for mousedown and mouseup
        // return 1 : left button, else not left button
        getBtn:function(event){
            return xui.browser.ie ?
                    event.button==4 ?
                        'middle' :
                            event.button==2 ?
                                'right' :
                                    'left' :
                    event.which==2 ?
                        'middle':
                            event.which==3 ?
                                'right':
                                    'left';
        },
        getPos:function(event){
            event = event || window.event;
            if(xui.browser.isTouch && event.changedTouches && event.changedTouches[0])
                event = event.changedTouches[0];

            if('pageX' in event)
                return {left:event.pageX, top:event.pageY};
            else{
    			var d=document, doc = d.documentElement, body = d.body,
    			_L = (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0),
    			_T = (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
                return {left:event.clientX+_L, top:event.clientY+_T};
            }
        },
        /*return array(key, control, shift, alt)
        ['k','1','',''] : 'k' pressed, 'control' pressed, 'shift' and 'alt' not pressed
        */
        /*
        opear in window:
            ' = right (39)
            - = insert (45)
            . = del (46)
        */
        getKey:function(event){
            event=event||window.event;
            // use keyCode first for newer safari
            var res=[],t, k= event.$key || event.keyCode || event.charCode || 0;
            //from xui event
            if(typeof k == 'string')
                res[0]=k;
            else{
                var key= String.fromCharCode(k),
                    type=event.type;
                if(
                 //visible char
                 (type=='keypress' && k>=33 && k<=128)
                 //0-9, A-Z
                 ||((k>=48&&k<=57) || (k>=65&&k<=90))
                 )res[0]=key;
                else{
                    if(!(t=arguments.callee.map)){
                        t = arguments.callee.map ={};
                        var k,arr =
                        ("3,enter,8,backspace,9,tab,12,numlock,13,enter,19,pause,20,capslock," +
                        "27,esc,32, ,33,pageup,34,pagedown,35,end,36,home,37,left,38,up,39,right,40,down,44,printscreen," +
                        "45,insert,46,delete,50,down,52,left,54,right,56,up," +
                        "91,win,92,win,93,apps," +
                        "96,0,97,1,98,2,99,3,100,4,101,5,102,6,103,7,104,8,105,9," +
                        "106,*,107,+,109,-,110,.,111,/," +
                        "112,f1,113,f2,114,f3,115,f4,116,f5,117,f6,118,f7,119,f8,120,f9,121,f10,122,f11,123,f12," +
                        "144,numlock,145,scroll," +
                        "186,;,187,=,189,-,190,.,191,/,192,`,"+
                        "219,[,220,\\,221,],222,'," +
                        "224,meta,"+ //Apple Meta and Windows key
                        //safari
                        "63289,numlock,63276,pageup,63277,pagedown,63275,end,63273,home,63234,left,63232,up,63235,right,63233,down,63272,delete,63302,insert,63236,f1,63237,f2,63238,f3,63239,f4,63240,f5,63241,f6,63242,f7,63243,f8,63244,f9,63245,f10,63246,f11,63247,f12,63248,print"
                        ).split(',')
                        for(var i=1,l=arr.length; i<l; i=i+2)
                            t[arr[i-1]]=arr[i]
                        arr.length=0;
                        //add
                        t[188]=',';
                    }
                    res[0]= t[k] || key;
                }
            }

            //control
            if((event.modifiers)?(event.modifiers&Event.CONTROL_MASK):(event.ctrlKey||event.ctrlLeft||k==17||k==57391)){
                if(k==17||k==57391)
                    res[0]='';
                res.push('1');
            }else
                res.push('');

            //shift
            if((event.modifiers)?(event.modifiers&Event.SHIFT_MASK):(event.shiftKey||event.shiftLeft||k==16||k==57390)){
                if(k==16||k==57390)
                    res[0]='';
                res.push('1');
            }else
                res.push('');

            //alt
            if((event.modifiers)?false:(event.altKey||event.altLeft||k==18||k==57388)){
                if(k==18||k==57388)
                    res[0]='';
                res.push('1');
            }else
                res.push('');

            // use keydown char
            res[0]=res[0];
            res.key=res[0];
            res.type=type;
            res.ctrlKey=!!res[1];
            res.shiftKey=!!res[2];
            res.altKey=!!res[3];

            if(type=='keypress'){
                if(this.$keydownchar && this.$keydownchar.length>1)
                    res.key=this.$keydownchar;
            
            }
            // keep the prev keydown char
            else if(type=='keydown'){
                if(res[0].length>1)
                    this.$keydownchar=res[0];
                else if(this.$keydownchar)
                    this.$keydownchar=null;
            }
            // clear it
            else if(type=='keyup'){
                if(this.$keydownchar)
                    this.$keydownchar=null;
            }

            return res;
        },
        getEventPara:function(event, mousePos){
            if(!mousePos)mousePos=xui.Event.getPos(event);
            var keys = this.getKey(event), h={
                pageX:mousePos&&mousePos.left,
                pageY:mousePos&&mousePos.top,
                keyCode:keys.key,
                ctrlKey:keys.ctrlKey,
                shiftKey:keys.shiftKey,
                altKey:keys[3].altKey
            };
            for(var i in event)if(i.charAt(0)=='$')h[i]=event[i];
            return h;
        },
        stopBubble:function(event){
            event=event||window.event;
            if(event.stopPropagation)event.stopPropagation();
            event.cancelBubble = true;
            this.stopDefault(event);
        },
        stopDefault:function(event){
            event=event||window.event;
            if(event.preventDefault)event.preventDefault();
            event.returnValue = false;
        },
        //key:control:shift:alt
        keyboardHook:function(key, ctrl, shift, alt, fun, args, scope, host){
            if(key){
                var p = xui.$cache.hookKey, k = (key||'').toLowerCase() + ":"  + (ctrl?'1':'') + ":"  +(shift?'1':'')+ ":" + (alt?'1':'');
                if(typeof fun!='function')delete p[k];
                else p[k]=[fun,args,scope,host];
             }
            return this;
        },
        keyboardHookUp:function(key, ctrl, shift, alt, fun,args,scope, host){
            if(key){
                var p = xui.$cache.hookKeyUp, k = (key||'').toLowerCase() + ":"  + (ctrl?'1':'') + ":"  +(shift?'1':'')+ ":" + (alt?'1':'');
                if(typeof fun!='function')delete p[k];
                else p[k]=[fun,args,scope,host];
             }
            return this;
        },
        getWheelDelta:function(e){
            return e.wheelDelta
            // ie/opr/kde
            ?e.wheelDelta/120
            // gek
            :-e.detail/3
        },
        _simulateMousedown:function(event){
            if(xui.Event.__simulatedMousedown)return;
            var touches = event.changedTouches,
                first = touches[0],
                type = "mousedown";
            var evn = document.createEvent("MouseEvent");
            evn.initMouseEvent(type, true, true, window, 1,
                              first.screenX, first.screenY,
                              first.clientX, first.clientY, false,
                              false, false, false, 0/*left*/, null);
            // For touch-only platform: has real touch event
            xui.Event.__realtouch=1;

            xui.Event.__simulatedMousedown=1;
            first.target.dispatchEvent(evn);
            xui.Event.__simulatedMousedown=0;
        },
        _simulateFocus:function(event){
            var touches = event.changedTouches,
                first = touches[0];
            if(first.target.tagName == "INPUT"){
                switch(first.target.type){
                case "button":
                    event.preventDefault();
                    var evn = document.createEvent("MouseEvent"),
                        type = "click";
                    evn.initMouseEvent(type, true, true, window, 1,
                                   first.screenX, first.screenY,
                                   first.clientX, first.clientY, false,
                                   false, false, false, 0/*left*/, null);
                    xui.Event.__simulatedClick=1;
                    first.target.dispatchEvent(evn);
                    xui.Event.__simulatedClick=0;
                break;
                default:
                    first.target.focus();
                }
            }
        },
        stopPageTouchmove:function(){
            document.addEventListener('touchmove', function(e){ e.preventDefault(); });
        }
    },
    Initialize:function(){
        var ns=this;
        var m1={
                move:null,
                size:null,
    
                drag:null,
                dragstop:null,
                dragover:null,

                mousewheel:null,
    
                dragbegin:'onmousedown',
                dragenter:'onmouseover',
                dragleave:'onmouseout',
                drop:'onmouseup'
            },
            a1=['before','on','after'],
            t1,t2,s;
        
        t1=ns._map1={};
        _.arr.each(ns._events,function(o){
            s=_.str.initial(o);
            t1[o]=[a1[0]+s, a1[1]+s, a1[2]+s];
        });
        
        t1=ns._eventMap={};
        t2=ns._eventHandler={};
        _.arr.each(ns._events,function(o){
            s=_.str.initial(o);
            t1[o]=t1[a1[1]+o]=t1[a1[0]+s]=t1[a1[1]+s]=t1[a1[2]+s]= o;
            t2[o]=t2[a1[1]+o]=t2[a1[0]+s]=t2[a1[1]+s]=t2[a1[2]+s]= (o in m1)?m1[o]:('on'+o);
        });
        
        //add the root resize handler
        window.onresize=ns.$eventhandler;

        if (window.addEventListener)
            window.addEventListener('DOMMouseScroll', ns.$eventhandler3, false);

        document.onmousewheel=window.onmousewheel =ns.$eventhandler3;
        
        // if touable, use only simulatedMousedown
        if(xui.browser.isTouch){
            document.addEventListener("touchstart", xui.Event._simulateMousedown, true);
            if(xui.browser.isAndroid||xui.browser.isBB){
                document.addEventListener("touchend", xui.Event._simulateFocus, true);
            }
        }
    }
});