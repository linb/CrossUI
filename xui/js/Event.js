/* event
*  Dependencies: base _ ; Class ; xui ;
*/
xui.Class('xui.Event',null,{
    //Reserved: fordrag
    Constructor:function(event,node,fordrag,tid){
        var self = xui.Event,
            w=window,
            d=document,
            dd=0,id,t,
            dragdrop=xui.DragDrop,
            src, pre, obj;

        //get event object , and src of event
        if(!(event=event||w.event) || !(src=node)){
            src=node=null;
            return false;
        }
        node=null;
 
        //type
        var type = event.type,
            xuievent=event.$xuievent,
            xuitype=event.$xuitype,
            xuiall=event.$xuiall;
        
        if(xui.browser.fakeTouch && type=="click" && xui.getData(['!document','$fakescrolling'])){
            return false;
        }

        // simulate for DD
        if(type=="xuitouchdown"){
            type="mousedown";
            xuievent=1;
            xuiall=0;
            xuitype="beforeMousedown";
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
                xui.tryF(xui.Dom._blurTrigger,[obj,event]);
            //for resize
            else if(type=="resize"){
                type='size';
                //for IE, always fire window onresize event after any innerHTML action
                if(xui.browser.ie && w===src){
                    var w=xui.browser.contentBox && d.documentElement.clientWidth || d.body.clientWidth,
                        h=xui.browser.contentBox && d.documentElement.clientHeight || d.body.clientHeight;
                    if(obj._w==w&&obj._h==h){
                        src=null;
                        return;
                    }else{
                        obj._w=w;obj._h=h;
                    }
                }
            }

            var j, f, name, r=true, funs=[];
            //order by: before, on, after
            for(j=0; j<=2; ++j){
                // if in dd, effect beforeMouse(move/over/out) only
                if(dd==1 && j!==0 && !event.$force)break;
                // if not in dd, effect (on/after)Mouse(move/over/out) only
                if(dd==2 && j===0)continue;
                // get event name from event type
                name = self._type[type+j] || ( self._type[type+j] = self._getEventName(type, j));
                /*
                event.$xui : called by xui fireEvent
                event.$xuiall : fire all events of the type: before/on/after
                event.$xuitype : fire specific type only
                */
                if(!xuievent || xuiall || (name===xuitype))obj._getEV(funs, id, name, src.$xid);
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
            // add a patch for resize
            if(w===src && type=="size"){
                xui.asyRun(function(){
                    f(event, src.$xid);
                    f.tasks.length=0;
                    delete f.tasks;
                    f=src=null;
                },150);
            }
    
            if(dragdrop){
                //shortcut for onDrag('mousemove')
                if(type=='drag')
                    dragdrop._onDrag=f;
                else if(type=='dragover')
                    dragdrop._onDragover=f;
            }else if(type!=="size"){
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
                        $xui:true,
                        $xuitype:'beforeMouseout',
                        preventDefault:function(e){xui.Event.stopDefault(e);},
                        stopPropagation:function(e){xui.Event.stopBubble(e);}
                        },t);
                    dragdrop.setDropElement(src.$xid);
                }

                //Out of droppable node, 'dragdrop._dropElement' will be set to null in beforeMouseover
                //set _preDroppable flag, for parent node is droppable too
                if('mouseout'==type && !dragdrop._dropElement && pre && pre==src.$xid){
                    self._preDroppable=id;
                    xui.asyRun(function(){delete xui.Event._preDroppable});
                }

                //if fire dd, prevent to fire parent dd
                //notice: this dont trigger cursor changing in opera
                if(src.$xid==dragdrop._dropElement)
                    r=false;
            }

            if(r===false)self.stopBubble(event);
            return r;
        }
    },
    Static:{
        $FALSE:xui.browser.opr?undefined:false,
        _type:{},
        _kb:{keydown:1,keypress:1,keyup:1},
        _reg:/(-[\w]+)|([\w]+$)/g,
        $eventhandler:function(){return xui.Event(arguments[0], this)},
        // Reserved
        $eventhandler2:function(){return xui.Event(arguments[0], this,1)},
        $eventhandler3:function(){var a=arguments[0], t=xui.Event.getSrc(a||window.event), r=xui.Event(a, t); if(r===false)return r; else if(t!==this) return xui.Event(a, this)},
        $lastMouseupTime:0,
        $dblcInterval:500,
        $lastClickFunMark:0,
        //collection
        _events : ("mouseover,mouseout,mousedown,mouseup,mousemove,mousewheel,click,dblclick,contextmenu," +
                "keydown,keypress,keyup,scroll,"+
                "blur,focus,"+
                "load,unload,beforeunload,abort,"+
                "change,select,submit,reset,error,"+
                //customized handlers:
                //dont use resize in IE
                "move,size," +
                //dragstart dragdrop dragout will not work in IE(using innerHTML)
                // Use "dragbegin instead of dragstart" to avoid native DnD
                "dragbegin,drag,dragstop,dragleave,dragenter,dragover,drop,"+
                // touch event
                "touchstart,touchmove,touchend,touchcancel,mspointerdown,mspointermove,mspointerup,mspointercancel,pointerdown,pointermove,pointerup,pointercancel")
                .split(','),
        _addEventListener : function(node, evt, fnc) {
            // name: click/onclick/onClick/beforeClick/afterClick
            var getName=function(name){
                return name.replace(/^on|before|after/,'').toLowerCase();
            },
            // name: click/onclick/onClick/beforeClick/afterClick
            getHandler=function(name, force){
                var map={touchstart:1,touchmove:1,touchend:1,touchcancel:1};
                name=getName(name);
                return (force || !map[name]) ? ('on'+name) : name;
            };
            // W3C model
            if (node.addEventListener) {
                var passiveSupported = false;
                try {
                    var options = Object.defineProperty({}, "passive", {
                        get: function() {
                            passiveSupported = true;
                        }
                    });
                    window.addEventListener("test", null, options);
                } catch(e) {}
                node.addEventListener(getName(evt), fnc, passiveSupported ? { passive: false} : false);
                return true;
            }
            // Microsoft model (ignore attachEvent)
            // reason: [this] is the window object, not the element; 
            //             If use fnc.apply(node, arguments), you can hardly handle detachEvent when you  attachEvent a function for multi nodes, multi times
            //else if (node.attachEvent) {
            //    return node.attachEvent(getHandler(evt),  fnc);
            //}
            // Browser don't support W3C or MSFT model, go on with traditional
            else {
                evt = getHandler(evt,true);
                if(typeof node[evt] === 'function'){
                    // Node already has a function on traditional
                    // Let's wrap it with our own function inside another function
                    fnc = (function(f1,f2){
                        var f = function(){
                            var funs=arguments.callee._funs;
                            for(var i=0,l=funs.length;i<l;i++)
                                funs[i].apply(this,arguments);
                        };
                        f._funs=f1._funs||[f1];
                        f1._funs=null;
                        f._funs.push(f2);
                        return f;
                    })(node[evt], fnc);
                }
                node[evt] = fnc;
                return true;
            }
            return false;
        },
        _removeEventListener : function(node, evt, fnc) {
            // name: click/onclick/onClick/beforeClick/afterClick
            var getName=function(name){
                return name.replace(/^on|before|after/,'').toLowerCase();
            },
            // name: click/onclick/onClick/beforeClick/afterClick
            getHandler=function(name, force){
                var map={touchstart:1,touchmove:1,touchend:1,touchcancel:1};
                name=getName(name);
                return (force || !map[name]) ? ('on'+name) : name;
            };
            // W3C model
            if (node.removeEventListener) {
                var passiveSupported = false;
                try {
                    var options = Object.defineProperty({}, "passive", {
                        get: function() {
                            passiveSupported = true;
                        }
                    });
                    window.addEventListener("test", null, options);
                } catch(e) {}
                node.removeEventListener(getName(evt), fnc, passiveSupported ? { passive: false} : false);
                return true;
            } 
            // Microsoft model (ignore attachEvent)
            // reason: [this] is the window object, not the element; 
            //             If use fnc.apply(node, arguments), you can hardly handle detachEvent when you  attachEvent a function for multi nodes, multi times
            //else if (node.detachEvent) {
            //    return node.detachEvent(getHandler(evt), fnc);
            //}
            // Browser don't support W3C or MSFT model, go on with traditional
            else {
                evt = getHandler(evt,true);
                if(node[evt]  === fnc){
                    node[evt]=null;
                    return true;
                }else if(node[evt] && node[evt]._funs && xui.arr.indexOf(node[evt]._funs, fnc)!=-1){
                    xui.arr.removeValue(node[evt]._funs, fnc);
                    return true;
                }
            }
            return false;
        },
        simulateEvent : function(target, type, options, fromtype) {
            options = options || {};
            if(target[0])target = target[0];
            xui.tryF(xui.Event.$eventsforSimulation[fromtype||type],[target, type, options]);
        },
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

            r=xui.tryF(target[1],[target[0],tabindex],src);
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
        getPos:function(event,original){
            event = event || window.event;
            if(xui.browser.isTouch && event.changedTouches && event.changedTouches[0])
                event = event.changedTouches[0];

            if('pageX' in event){
                var scale=original?1:(xui.ini.$zoomScale||1);
                return {left:event.pageX/scale, top:event.pageY/scale};
            }else{
    			var d=document, doc = d.documentElement, body = d.body,t,
    			_L = (xui.isSet(t=doc && doc.scrollLeft)?t:xui.isSet(t=body && body.scrollLeft)?t:0) - (xui.isSet(t=doc.clientLeft)?t:0),
    			_T = (xui.isSet(t=doc && doc.scrollTop)?t:xui.isSet(t=body && body.scrollTop)?t:0) - (xui.isSet(t=doc.clientTop)?t:0);
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
            // for the fake one
            if(event&&event.$xuievent)return event;

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
            res.keyCode=k;
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
            var keys = this.getKey(event), 
            button=this.getBtn(event), 
            h={
                button:button,
                pageX:mousePos&&mousePos.left,
                pageY:mousePos&&mousePos.top,
                key:keys.key,
                keyCode:keys.keyCode,
                ctrlKey:keys.ctrlKey,
                shiftKey:keys.shiftKey,
                altKey:keys.altKey,
                $xuieventpara:true
            };
            for(var i in event)if(i.charAt(0)=='$')h[i]=event[i];
            return h;
        },
        stopBubble:function(event){
            event=event||window.event;
            if(event.stopPropagation)event.stopPropagation();
            if("cancelBubble" in event)event.cancelBubble = true;
            this.stopDefault(event);
        },
        stopDefault:function(event){
            event=event||window.event;
            if(event.preventDefault)event.preventDefault();
            else if("returnValue" in event)event.returnValue = false;
        },
        _kbh:function(cache, key, ctrl, shift, alt, fun, id, args, scope, base){
            if(key){
                id = id || ((typeof fun=='string') ? fun :null);
                key = (key||'').toLowerCase() + ":"  + (ctrl?'1':'') + ":"  +(shift?'1':'')+ ":" + (alt?'1':'');
                cache[key] = cache[key]||[];
                if(typeof fun=='function'){
                    // remove previous attach
                    // try 1
                    if(id){
                        delete cache[key][id];
                        xui.arr.removeValue(cache[key], id);
                    }else id=xui.rand();

                    cache[key][id]=[fun,args,scope,base]
                    cache[key].push( id );
                    return id;
                }else{
                    if(id){
                        delete cache[key][id];
                        xui.arr.removeValue(cache[key], id);
                    }else
                        delete cache[key];
                }
            }
            return this;
        },
        //key:control:shift:alt
        keyboardHook:function(key, ctrl, shift, alt, fun, id, args, scope, base){
            return this. _kbh(xui.$cache.hookKey, key, ctrl, shift, alt, fun, id, args, scope, base);
        },
        keyboardHookUp:function(key, ctrl, shift, alt, fun, id, args,scope, base){
            return this. _kbh(xui.$cache.hookKeyUp, key, ctrl, shift, alt, fun, id, args, scope, base);
        },
        getWheelDelta:function(e){
            return e.wheelDelta
            // ie/opr/kde
            ?e.wheelDelta/120
            // gek
            :-e.detail/3
        },
        $TAGNAMES:{
          'select':'input','change':'input',  
          'submit':'form','reset':'form',  
          'error':'img','load':'img','abort':'img'  
        },
        _supportCache:{},
        isSupported:function(name, node) {
            var ns=this,c=ns._supportCache,rn=(node?node.tagName.toLowerCase():"div")+":"+name;
            if(rn in c)return c[rn];
            node = node || document.createElement(ns.$TAGNAMES[name] || 'div');
            name = 'on' + name;
            // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
            var isSupported = (name in node);
            if (!isSupported) {
              // if it has no `setAttribute` (i.e. doesn't implement Node interface), try generic node
              if(!node.setAttribute)node = document.createElement('div');
                if(node.setAttribute) {
                  node.setAttribute(name, '');
                  isSupported = typeof node[name] == 'function';
                  if (typeof node[name] != 'undefined')node[name] = undefined;
                  node.removeAttribute(name);
                }
            }
            node = null;
            return c[rn]=isSupported;
        },
        _simulateMousedown:function(event){
            if(!event.touches)return true;
            var E=xui.Event,
                touches = event.changedTouches, 
                first = touches[0];
            if(event.touches.length>1)return true;

            E.__simulatedMousedownNode=first.target;

            if(!E.isSupported("mousedown")){
                E.simulateEvent(first.target,"mousedown",{screenX:first.screenX, screenY:first.screenY, clientX:first.clientX, clientY:first.clientY});
            }else{
                // use custom event to avoid affecting system or 3rd lib
                // it will fire xui beforeMousedown event group only
                // Needs delay to allow the browser to determine if the user is performing another gesture (etc. double-tap zooming)
                E._xuitouchdowntime=xui.setTimeout(function(){
                    E._xuitouchdowntime=0;
                    E.simulateEvent(first.target,"xuitouchdown",{screenX:first.screenX, screenY:first.screenY, clientX:first.clientX, clientY:first.clientY},'mousedown');
                },100);
            }
            
            return true;
        },
        _simulateMouseup:function(event){
            if(!event.touches)return true;
            var E=xui.Event,
                _now=(new Date).getTime(),
                interval=_now-E.$lastMouseupTime,
                touches = event.changedTouches, first = touches[0];
            if(E._xuitouchdowntime){
                xui.clearTimeout(E._xuitouchdowntime);
            }
            E.__simulatedMouseupNode=first.target;
            if(!E.isSupported("mouseup")){
                E.simulateEvent(first.target,"mouseup",{screenX:first.screenX, screenY:first.screenY, clientX:first.clientX, clientY:first.clientY});
            }

            // click and dblclick
            if(E.__simulatedMouseupNode===E.__simulatedMousedownNode){
                if(!E.isSupported("click")){
                    E.simulateEvent(first.target,"click",{screenX:first.screenX, screenY:first.screenY, clientX:first.clientX, clientY:first.clientY});
                }
                // doubleclick for touch event
                if(interval<=E.$dblcInterval){
                    xui.asyRun(function(){
                        // disalbe next one
                        E.$lastMouseupTime=0;
                        E.simulateEvent(first.target,"dblclick",{screenX:first.screenX, screenY:first.screenY, clientX:first.clientX, clientY:first.clientY});
                    });
                }
            }
            E.__simulatedMouseupNode=E.__simulatedMousedownNode=null;
            E.$lastMouseupTime=_now;

            return true;
        },
        stopPageTouchmove:function(){
            xui.Event._addEventListener(document,
                (xui.browser.ie&&xui.browser.ver>=11)?"pointermove":
                (xui.browser.ie&&xui.browser.ver>=10)?"MSPointerMove":
                'touchmove', xui.Event.stopDefault
            );
        },
        allowPageTouchmove:function(){
            xui.Event._removeEventListener(document,
                (xui.browser.ie&&xui.browser.ver>=11)?"pointermove":
                (xui.browser.ie&&xui.browser.ver>=10)?"MSPointerMove":
                'touchmove', xui.Event.stopDefault
            );
        }
    },
    Initialize:function(){
        var ns=this,
        w=window,
        d=document,
        m1={
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
        xui.arr.each(ns._events,function(o){
            s=xui.str.initial(o);
            t1[o]=[a1[0]+s, a1[1]+s, a1[2]+s];
        });
        
        t1=ns._eventMap={};
        t2=ns._eventHandler={};
        xui.arr.each(ns._events,function(o){
            s=xui.str.initial(o);
            t1[o]=t1[a1[1]+o]=t1[a1[0]+s]=t1[a1[1]+s]=t1[a1[2]+s]= o;
            t2[o]=t2[a1[1]+o]=t2[a1[0]+s]=t2[a1[1]+s]=t2[a1[2]+s]= (o in m1)?m1[o]:('on'+o);
        });
        
        //add the root resize handler
        ns._addEventListener(w, "resize", ns.$eventhandler);
        
        // DOMMouseScroll is for firefox only
        ns._addEventListener(w, "DOMMouseScroll", ns.$eventhandler3);

        // for simulation dblclick event in touchable device
        if(xui.browser.isTouch){
            ns._addEventListener(d, 
                    (xui.browser.ie&&xui.browser.ver>=11)?"pointerdown":
                    (xui.browser.ie&&xui.browser.ver>=10)?"MSPointerDown":
                    "touchstart", ns._simulateMousedown);
            ns._addEventListener(d, 
                    (xui.browser.ie&&xui.browser.ver>=11)?"pointerup":
                    (xui.browser.ie&&xui.browser.ver>=10)?"MSPointerUp":
                    "touchend", ns._simulateMouseup);
            ns._addEventListener(d,  "xuitouchdown", ns.$eventhandler);
        }

        // for simulation
        ns._addEventListener(w, "mousewheel", ns.$eventhandler3);
        // window enough
        // ns._addEventListener(d, "mousewheel", ns.$eventhandler3);

        var keyEvent=function(target, type , options){
            switch(type) {
                case "textevent":
                    type = "keypress"
                    break
                case "keyup":
                case "keydown":
                case "keypress":
                    break;
            }
           xui.merge(options,{
                bubbles :true,
                cancelable:true,
                view:w,
                ctrlKey:false,
                altKey:false,
                shiftKey:false,
                metaKey:false,
                keyCode : 0,
                charCode : 0
            },'without');
            var bubbles=options.bubbles,
                cancelable=options.cancelable,
                view=options.view,
                ctrlKey=options.ctrlKey,
                altKey=options.altKey,
                shiftKey=options.shiftKey,
                metaKey=options.metaKey,
                keyCode=options.keyCode,
                charCode=options.charCode;

            var customEvent = null;
            if (d.createEvent){    
                try {
                    customEvent = d.createEvent("KeyEvents");
                    // TODO: special decipher in Firefox
                    customEvent.initKeyEvent(type, bubbles, cancelable, view, ctrlKey,altKey, shiftKey, metaKey, keyCode, charCode);
                } catch (ex) {
                    try {
                        customEvent = d.createEvent("Events");    
                    } catch (uierror) {
                        customEvent = d.createEvent("UIEvents");    
                    } finally {
                        customEvent.initEvent(type, bubbles, cancelable);
                        customEvent.view = view;
                        customEvent.altKey = altKey;
                        customEvent.ctrlKey = ctrlKey;
                        customEvent.shiftKey = shiftKey;
                        customEvent.metaKey = metaKey;
                        customEvent.keyCode = keyCode;
                        customEvent.charCode = charCode;    
                    }
                }
                target.dispatchEvent(customEvent);    
                
            } 
            // for IE
            else if(d.createEventObject) {
                customEvent = d.createEventObject();
    
                customEvent.bubbles = bubbles;
                customEvent.cancelable = cancelable;
                customEvent.view = view;
                customEvent.ctrlKey = ctrlKey;
                customEvent.altKey = altKey;
                customEvent.shiftKey = shiftKey;
                customEvent.metaKey = metaKey;
        
    
                customEvent.keyCode = (charCode > 0) ? charCode : keyCode;
        
                target.fireEvent("on" + type, customEvent);
            } else {
                throw type + ' cant be simulated in ' + navigator.userAgent;
            }
        },
        mouseEvent=function(target, type , options){
           options=options||{};
           xui.merge(options,{
                bubbles :true,
                cancelable:true,
                view:w,
                detail:1,
                ctrlKey:false,
                altKey:false,
                shiftKey:false,
                metaKey:false,
                screenX:0,
                screenY:0,
                clientX:0,
                clientY:0,
                button:0,
                relatedTarget: null
            },'without');
            var bubbles=options.bubbles,
                cancelable=options.cancelable,
                view=options.view,
                detail=options.detail,
                ctrlKey=options.ctrlKey,
                altKey=options.altKey,
                shiftKey=options.shiftKey,
                metaKey=options.metaKey,
                screenX=options.screenX,
                screenY=options.screenY,
                clientX=options.clientX,
                clientY=options.clientY,
                button=options.button,
                relatedTarget=options.relatedTarget;
        
            var customEvent = null;    
            if (d.createEvent){    
                customEvent = d.createEvent("MouseEvents");
                
                if (customEvent.initMouseEvent){
                    customEvent.initMouseEvent(type, bubbles, cancelable, view, detail,
                                         screenX, screenY, clientX, clientY,
                                         ctrlKey, altKey, shiftKey, metaKey,
                                         button, relatedTarget);
                }
                // Safari 2.x doesn't support initMouseEvent
                else {
                    customEvent = d.createEvent("UIEvents");
                    customEvent.initEvent(type, bubbles, cancelable);
                    customEvent.view = view;
                    customEvent.detail = detail;
                    customEvent.screenX = screenX;
                    customEvent.screenY = screenY;
                    customEvent.clientX = clientX;
                    customEvent.clientY = clientY;
                    customEvent.ctrlKey = ctrlKey;
                    customEvent.altKey = altKey;
                    customEvent.metaKey = metaKey;
                    customEvent.shiftKey = shiftKey;
                    customEvent.button = button;
                    customEvent.relatedTarget = relatedTarget;
                }
    
                if (relatedTarget && !customEvent.relatedTarget) {
                    if (type === "mouseout") {
                        customEvent.toElement = relatedTarget;
                    } else if (type === "mouseover") {
                        customEvent.fromElement = relatedTarget;
                    }
                }
                target.dispatchEvent(customEvent);
            }
            //IE
            else if(d.createEventObject){
                customEvent = d.createEventObject();
        
                customEvent.bubbles = bubbles;
                customEvent.cancelable = cancelable;
                customEvent.view = view;
                customEvent.detail = detail;
                customEvent.screenX = screenX;
                customEvent.screenY = screenY;
                customEvent.clientX = clientX;
                customEvent.clientY = clientY;
                customEvent.ctrlKey = ctrlKey;
                customEvent.altKey = altKey;
                customEvent.metaKey = metaKey;
                customEvent.shiftKey = shiftKey;
        
                switch(button) {
                    case 0:
                        customEvent.button = 1;
                        break;
                    case 1:
                        customEvent.button = 4;
                        break;
                    case 2:
                        //leave as is
                        break;
                    default:
                        customEvent.button = 0;
                }
        
                customEvent.relatedTarget = relatedTarget;
        
                target.fireEvent("on" + type, customEvent);    
            } else {
                throw type + ' cant be simulated in ' + navigator.userAgent;
            }
        },
        UIEvent=function(target, type , options){    
           xui.merge(options,{
                bubbles : true,
                cancelable:(type === "submit"),
                view:w,
                detail:1
            },'without');
            var bubbles=options.bubbles,
                cancelable=options.cancelable,
                view=options.view,
                detail=options.detail;
    
            var customEvent = null;
            if (d.createEvent){    
                customEvent = d.createEvent("UIEvents");
                customEvent.initUIEvent(type, bubbles, cancelable, view, detail);
                target.dispatchEvent(customEvent);    
            }
            //IE
            else if(d.createEventObject){ 
                customEvent = d.createEventObject();
                customEvent.bubbles = bubbles;
                customEvent.cancelable = cancelable;
                customEvent.view = view;
                customEvent.detail = detail;
    
                target.fireEvent("on" + type, customEvent);    
            } else {
                throw type + ' cant be simulated in ' + navigator.userAgent;
            }
        },
        // for ios v2.0+
        gestureEvent=function(target, type , options){
           xui.merge(options,{
                bubbles :true,
                cancelable:true,
                detail:2,
                view:w,
                ctrlKey:false,
                altKey:false,
                shiftKey:false,
                metaKey:false,
                scale : 1.0,
                rotation : 0.0
            },'without');
            var bubbles=options.bubbles,
                cancelable=options.cancelable,
                detail=options.detail,
                view=options.view,
                ctrlKey=options.ctrlKey,
                altKey=options.altKey,
                shiftKey=options.shiftKey,
                metaKey=options.metaKey,
                scale=options.scale,
                rotation=options.rotation;
        
            var customEvent;
            customEvent = d.createEvent("GestureEvent");
            customEvent.initGestureEvent(type, bubbles, cancelable, view, detail,
                screenX, screenY, clientX, clientY,
                ctrlKey, altKey, shiftKey, metaKey,
                target, scale, rotation);
            target.dispatchEvent(customEvent);
        },
        touchEvent=function(target, type , options){
            if (type === 'touchstart' || type === 'touchmove') {
                if (!options.touches || !options.touches.length) {
                    throw new Error('No touch object in touches.');
                }
            } else if (type === 'touchend') {
                if (!options.changedTouches || !options.changedTouches.length) {
                    throw new Error('No touch object in changedTouches.');
                }
            }
           xui.merge(options,{
                bubbles :true,
                cancelable:(type !== "touchcancel"),
                detail:1,
                view:w,
                ctrlKey:false,
                altKey:false,
                shiftKey:false,
                metaKey:false,
                screenX:0,
                screenY:0,
                clientX:0,
                clientY:0,
                scale : 1.0,
                rotation : 0.0
            },'without');
            var bubbles=options.bubbles,
                cancelable=options.cancelable,
                detail=options.detail,
                view=options.view,
                scale=options.scale,
                rotation=options.rotation,
                touches=options.touches,
                targetTouches=options.targetTouches,
                changedTouches=options.changedTouches,
                ctrlKey=options.ctrlKey,
                altKey=options.altKey,
                shiftKey=options.shiftKey,
                metaKey=options.metaKey,
                screenX=options.screenX,
                screenY=options.screenY,
                clientX=options.clientX,
                clientY=options.clientY,
                cancelable = type=="touchcancel"? false : options.cancelable;
            var customEvent;
            if (d.createEvent){
                if (xui.browser.isAndroid) {
                    if (xui.browser.ver < 4.0) {
                        customEvent = d.createEvent("MouseEvents");
                        customEvent.initMouseEvent(type, bubbles, cancelable, view, detail, 
                            screenX, screenY, clientX, clientY,
                            ctrlKey, altKey, shiftKey, metaKey,
                            0, target);
                        customEvent.touches = touches;
                        customEvent.targetTouches = targetTouches;
                        customEvent.changedTouches = changedTouches;
                    } else {
                        customEvent = d.createEvent("TouchEvent");
                        // Andoroid isn't compliant W3C initTouchEvent
                        customEvent.initTouchEvent(touches, targetTouches, changedTouches,
                            type, view,
                            screenX, screenY, clientX, clientY,
                            ctrlKey, altKey, shiftKey, metaKey);
                    }
                } else if (xui.browser.isIOS) {
                    if (xui.browser.ver >= 2.0) {
                        customEvent = d.createEvent("TouchEvent");
                        customEvent.initTouchEvent(type, bubbles, cancelable, view, detail,
                            screenX, screenY, clientX, clientY,
                            ctrlKey, altKey, shiftKey, metaKey,
                            touches, targetTouches, changedTouches,
                            scale, rotation);
                    } else {
                        throw type + ' cant be simulated in ' + navigator.userAgent;
                    }
                } else {
                    throw type + ' cant be simulated in ' + navigator.userAgent;
                }
                target.dispatchEvent(customEvent);
            } else {
                throw type + ' cant be simulated in ' + navigator.userAgent;
            }
        };
        ns.$eventsforSimulation={
            click: mouseEvent,
            dblclick: mouseEvent,
            mouseover: mouseEvent,
            mouseout: mouseEvent,
            mouseenter: mouseEvent,
            mouseleave: mouseEvent,
            mousedown: mouseEvent,
            mouseup: mouseEvent,
            mousemove: mouseEvent,
            pointerover:  mouseEvent,
            pointerout:   mouseEvent,
            pointerdown:  mouseEvent,
            pointerup:    mouseEvent,
            pointermove:  mouseEvent,
            MSPointerOver:  mouseEvent,
            MSPointerOut:   mouseEvent,
            MSPointerDown:  mouseEvent,
            MSPointerUp:    mouseEvent,
            MSPointerMove:  mouseEvent,
            
            keydown: keyEvent,
            keyup: keyEvent,
            keypress: keyEvent,
            
            submit: UIEvent,
            blur: UIEvent,
            change: UIEvent,
            focus: UIEvent,
            resize: UIEvent,
            scroll: UIEvent,
            select: UIEvent,
            
            touchstart: touchEvent,
            touchmove: touchEvent,
            touchend: touchEvent,
            touchcancel: touchEvent,
            
            gesturestart: gestureEvent,
            gesturechange: gestureEvent,
            gestureend: gestureEvent
        };
    }
});