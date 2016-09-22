/*!
* CrossUI(xui) JavaScript Library v2.0
* http://crossui.com
* 
* Copyright ( 2004 ~ present) CrossUI.com
* Released under the MIT license
*
*/
// speed up references
undefined;

// global : xui
var xui=function(nodes,flag){return xui.Dom.pack(nodes, flag)},
    Class=xui.Class=function(key, pkey, obj){
        var _Static, _parent=[], self=Class, w=window, env=self._fun, reg=self._reg, parent0, _this,i,t,_t,_c=self._all,
            _funadj = function(str){return (str+"").replace(/(\s*\/\*[^*]*\*+([^\/][^*]*\*+)*\/)|(\s*\/\/[^\n]*)|(\)[\s\S]*)/g,function(a){return a.charAt(0)!=")"?"":a});}
        obj=obj||{};
        //exists?
        if(!self._ignoreNSCache && (t=xui.get(w, key.split('.')))&&typeof(t)=='function'&&t.$xuiclass$)return self._last=t;
        //clear SC
        if(t=xui.get(w,['xui','$cache','SC']))delete t[key];

        //multi parents mode
        pkey = ( !pkey?[]:typeof pkey=='string'?[pkey]:pkey);
        for(i=0; t=pkey[i]; i++)
            if(!(_parent[i]=(xui.get(w, t.split('.')) || (xui&&xui.SC&&xui.SC(t)))))
                throw 'errNoParent--'+ t;
        if(obj.Dependencies){
            if(typeof obj.Dependencies == "string")obj.Dependencies=[obj.Dependencies];
            for(i=0; t=obj.Dependencies[i]; i++)
                if(!(xui.get(w, t.split('.')) || (xui&&xui.SC&&xui.SC(t))))
                    throw 'errNoDependency--'+ t;
        }
        parent0=_parent[0];

        // Give a change to modify the original object
        var $Start = obj.$Start || (parent0&&parent0.$Start);
        xui.tryF($Start, [], obj);

        // collect items
        _Static=obj.Static||{};
        t={};
        for(i in _Static)
            if(reg[i])t[i]=1;
        for(i in t)
            delete _Static[i];
        
        //before and after will pass to children
        _Static.Before = obj.Before || (parent0&&parent0.Before);
        _Static.After = obj.After || (parent0&&parent0.After);
        _Static.$Start = $Start;
        _Static.$End = obj.$End || (parent0&&parent0.$End);
        _Static.__gc = obj.__gc || _Static.__gc || (parent0&&parent0.__gc) || function(){Class.__gc(this.$key)};

        /*set constructor first and create _this
        upper is the first parent Class
        */
        var cf=function(){if(typeof this.initialize=='function')this.initialize()};
        if(typeof obj.Constructor == 'function'){
            _this = env(obj.Constructor, 'Constructor', key, parent0||cf,'constructor');
            _this.Constructor = _funadj(obj.Constructor);
        }else{
            if(parent0){
                // Constructor is for opera, in opear fun.toString can't get arguments sometime
                var f=cf,str = parent0.Constructor;
                if(str)f=new Function(str.slice(str.indexOf("(") + 1, str.indexOf(")")).split(','), str.slice(str.indexOf("{") + 1, str.lastIndexOf("}")));
                _this = env(f, 'Constructor', key, parent0.upper,'constructor');
                _this.Constructor = _funadj(str);
            }else
                _this = cf;
        }

        //collect parent items, keep the last one
        _t=xui.fun();
        for(i=_parent.length-1; t=_parent[i--];){
            xui.merge(_t,t);
            xui.merge(_t.prototype,t.prototype);
        }
        //set keys
        _this.KEY=_this.$key=_this.prototype.KEY=_this.prototype.$key=key;
        //envelop
        //  from Static
        self._wrap(_this,_Static,0,_t,'static');
        //  from Instance
        if(t=obj.Instance)
            self._wrap(_this.prototype,t,1,_t.prototype,'instance');
        //inherite from parents
        self._inherit(_this,_t);
        self._inherit(_this.prototype,_t.prototype);
        _t=null;

        //exe before functoin
        if(xui.tryF(_this.Before, arguments, _this)===false)
            return false;

        //add child key to parents
        for(i=0; t=_parent[i]; i++){
            t=(t.$children || (t.$children=[]));
            for(var j=0,k=t.length,b;j<k;j++)
                if(t[k]==key){
                    b=true;
                    break;
                }
            if(!b)t[t.length]=key;
        }

        //set symbol
        _this.$xui$ = _this.$xuiclass$ = 1;
        _this.$children = [];
        _this.$parent = _parent;

        //set constructor
        _this.prototype.constructor = _this;
        _this.prototype.$xui$ = 1;
        //set key
        _this[key] = _this.prototype[key] = true;

        //allow load App.Sub first
        _t=t=xui.get(w, key.split('.'));
        xui.set(w, key.split('.'), _this);
        if(Object.prototype.toString.call(_t)=='[object Object]')
            for(i in _t)_this[i]=_t[i];

        //exe after function
        xui.tryF(_this.After, [], _this);
        //exe ini function
        xui.tryF(obj.Initialize, [], _this);
        xui.tryF(_this.$End, [], _this);

        xui.breakO([obj.Static, obj.Instance, obj],2);
        
        if(!(key in _c)){
            _c[key]=_c.length;
            _c.push(key);
        }

        //return Class
        return self._last=_this;
    };

    // namespace
    xui.Namespace=function(key){
        var a=key.split('.'),w=window;
        return xui.get(w, a) || xui.set(w, a, {});
    };
//window.onerror will be redefined in xui.Debugger
//window.onerror=function(){return true};

/*merge hash from source to target
  target:hash
  source:hash
  type:'all', 'with', 'without'[default], or function <return true will trigger merge>
  return: merged target
*/
xui.merge=function(target, source, type, force){
    var i,f;
    if(typeof type == "function"){
        f=type;
        type='fun';
    }
    switch(type){
        case 'fun':
            for(i in source)if((force||source.hasOwnProperty(i)) && true===f(source[i],i))target[i]=source[i];
            break;
        case 'all':
            for(i in source)if((force||source.hasOwnProperty(i)))target[i]=source[i];
            break;
        case 'with':
            for(i in source)if((force||source.hasOwnProperty(i)) && target.hasOwnProperty(i))target[i]=source[i];
            break;
        default:
            for(i in source)if((force||source.hasOwnProperty(i)) && !target.hasOwnProperty(i))target[i]=source[i];
    }
    return target;
};

new function(){
    var lastTime=0,vendors=['ms','moz','webkit','o'],w=window,i=0,l=vendors.length,tag;
    for(;i<l && !w.requestAnimationFrame && (tag=vendors[i++]);) {
        w.requestAnimationFrame = w[tag+'RequestAnimationFrame'];
        w.cancelAnimationFrame = w[tag+'CancelAnimationFrame']||w[tag+'CancelRequestAnimationFrame'];
    }
    if (!w.requestAnimationFrame)
        w.requestAnimationFrame=function(callback,element){
            var currTime=(new Date()).getTime(),
                timeToCall=Math.max(0,   1000 / 60 - (currTime-lastTime)),
                id=setTimeout(function(){callback(currTime + timeToCall)}, timeToCall);
            lastTime=currTime+timeToCall;
            return id;
        };
    if (!w.cancelAnimationFrame)
        w.cancelAnimationFrame = function(id){clearTimeout(id)};
};
new function(){
    var _to = Object.prototype.toString;
    xui.merge(xui,{
        stamp:function(){return +new Date()},
        rand:function(){
            return parseInt(xui.stamp()*Math.random(),10).toString(36);
        },
        setTimeout:function(callback,delay){
            return (delay||0)> 1000 / 60?(setTimeout(callback,delay)*-1):requestAnimationFrame(callback);
        },
        clearTimeout:function(id){
            if(id>=0)cancelAnimationFrame(id);
            else clearTimeout(Math.abs(id));
        },
        fun:function(){return function(){}},
        exec:function(script, id){
            var me=this,
                d=document,
                h=d.getElementsByTagName("head")[0] || d.documentElement,
                s=d.createElement("script"),n;
            s.type = "text/javascript";
            if(id){
                if((n=d.getElementById(id))&&n.parentNode==h){
                    h.removeChild(n);
                }
                s.id=id;
            }
            if(xui.browser.ie)
                s.text=script;
            else
                s.appendChild(d.createTextNode(script));
            h.appendChild(s);
            s.disalbed=true;
            s.disabled=false;
            if(!id){
                h.removeChild(s);
            }
            return s;
        },
        /*
        get something from deep hash
        hash:target hash
        arr:path array,
        example:
        xui.get({a:{b:{c:1}}},['a','b']) => {c:1};
            xui.get({a:{b:{c:1}}},['a','b','c']) => 1;
            xui.get({a:{b:{c:1}}},['a','b','c','d']) => undefined;
        */
        get:function(hash,path){
            if(!path) return hash;
            if(!xui.isSet(hash))return undefined;
            else if(typeof path=='string') return hash[path];
            else{
                for(var i=0,l=path.length,t;i<l;){
                    if(!(t=path[i++]+''))continue;
                    if(!hash || (hash=t!=(t=t.replace("()","")) ? (typeof(hash[t])=="function" && 0!==t.indexOf("set"))? hash[t]() : undefined : hash[t])===undefined )return;
                }
                return hash;
            }
        },
        /*
        set/unset a value to deep hash
        example:
            xui.set({a:{b:{c:1}}},['a','b','c'],2) => {a:{b:{c:2}}}
            xui.set({a:{b:{c:1}}},['a','b','c']) => {a:{b:{}}}
        */
        set:function(hash,path,value){
            if(!hash)return;
            if(typeof path!='string'){
                var v,i=0,m,last=path.length-1;
                for(;i<last;){
                    v=path[i++];
                    if(hash[v]&&((m=typeof hash[v])=='object' || m=='function')) hash=hash[v];
                    else hash=hash[v]={};
                }
                path=path[last];
            }
            // the last one can be a [set] function
            if(path!=(path=(path+"").replace("()","")) ){
                if(typeof(hash[path])=="function"){
                    hash[path](value);
                    return value;
                }
            }else{
                if(value===undefined){
                    if(hash.hasOwnProperty && hash.hasOwnProperty(path))
                        delete hash[path];
                    else hash[path]=undefined;
                }else{
                    return hash[path]=value;
                }
            }
        },
        /* try to excute a function
        fun:target function
        args:arguments for fun
        scope:[this] pointer for fun
        df:default return vale
        */
        tryF:function(fun, args, scope, df){
            return (fun && typeof fun=='function') ? fun.apply(scope||{}, args||[]) : df
        },
        /*asynchronous run function
        fun:target function
        defer: setTimeout defer time
        args: arguments for fun
        scope: [this] pointer for fun
        */
        asyRun:function(fun, defer, args, scope){
            //defer must set in opera
            return xui.setTimeout(typeof fun=='string' ? function(){xui.exec(fun)} : function(){fun.apply(scope,args||[]);fun=args=null;}, defer||0);
        },
        asyHTML:function(content, callback, defer, size){
            var div = document.createElement('div'),
                fragment = document.createDocumentFragment();
            div.innerHTML = content;
            (function(){
                var i=size||10;
                while(--i && div.firstChild)
                    fragment.appendChild(div.firstChild);
                if(div.firstChild)
                    xui.setTimeout(arguments.callee, defer||0);
                else
                    callback(fragment);
            })();
        },
        isEmpty:function(hash){
            if (hash==null) return true;
            if (xui.isNumb(hash)) return false;
            if (xui.isArr(hash) || xui.isStr(hash) || xui.isArguments(hash)) return hash.length === 0;
            for(var i in hash)if(Object.prototype.hasOwnProperty.call(hash, i))return false;
            return true;
        },

        /*
        this will always run newer function
        key: for identify
        fun: to run
        defer: setTimeout defer time
        args: arguments for fun
        scope: 'this' for fun
        */
        resetRun:function(key, fun, defer ,args, scope){
            var me=arguments.callee, k=key, cache = me.$cache || ( (me.exists=function(k){return this.$cache[k]})&& (me.$cache = {}));
            if(cache[k]){xui.clearTimeout(cache[k])}
            if(typeof fun=='function')
                cache[k] = xui.setTimeout(function(){delete cache[k];fun.apply(scope||null,args||[])},defer||0);
            else delete cache[k];
        },
        //Dependencies: xui.Dom xui.Thread
        observableRun:function(tasks,onEnd,threadid,busyMsg){
            xui.Thread.observableRun(tasks,onEnd,threadid,busyMsg);
        },

        /*break object memory link
        target: target object
        n: depth, default 1
        */
        breakO:function(target,depth){
            var n=depth||1, l=1+(arguments[2]||0), self=arguments.callee, _t='___gc_', i;
            if(target && (typeof target=='object' || typeof target=='function') && target!==window&&target!==document&&target.nodeType!==1){
                try{if(target.hasOwnProperty(_t))return; else target[_t]=null}catch(e){return}
                try{for(i in target){
                    if(target.hasOwnProperty(i) && target[i]){
                        if(typeof target[i]=='object' || typeof target[i]=='function')
                            if(l<n)
                                self(target[i],n,l);
                        try{target[i]=null}catch(e){}
                    }
                }}catch(e){return}
                if(target.length)target.length=0;
                delete target[_t];
            }
        },

        /*each function for hash
        fun: fun to exec, if return false, stop the $iterator
        scope: 'this' pointer;
        */
        each:function(hash,fun,scope){
            scope = scope||hash;
            for(var i in hash)
                if(false===fun.call(scope, hash[i], i, hash))
                    break;
            return hash;
        },
        compareNumber:function(a,b,digits){
            return xui.toFixedNumber(a,digits) === xui.toFixedNumber(b,digits);
        },
        toFixedNumber:function(number,digits) {
            if(!xui.isSet(digits))digits=2;
            var m=Math.abs(number),
                s=''+Math.round(m * Math.pow(10, digits)),
                v, t, start, end;
            if(/\D/.test(s)){
              v = ""+m;
            }else{
                while(s.length<1+digits)s='0'+s;
                start=s.substring(0, t=(s.length-digits));
                end=s.substring(t);
                if(end)end="."+end;
                v=start+end;
            }
            return parseFloat((number<0?"-":"")+v);
        },
        toNumeric:function(value, precision, groupingSeparator, decimalSeparator){
            if(!xui.isNumb(value))
                value=parseFloat((value+"").replace(/\s*(e\+|[^0-9])/g, function(a,b,c){return b=='e+'||b=='E+'||(c==0&&b=='-')?b:b==decimalSeparator?'.':''}))||0;
            if(xui.isSet(precision) && precision>=0)
                 value=xui.toFixedNumber(value,precision);
            return value;
        },
        formatNumeric:function(value, precision, groupingSeparator, decimalSeparator, forceFillZero){
            if(xui.isSet(precision))precision=parseInt(precision,10);
            precision=(precision||precision===0)?precision:0;
            groupingSeparator=xui.isSet(groupingSeparator)?groupingSeparator:",";
            decimalSeparator=decimalSeparator||".";
            value=""+parseFloat(value);
            if(value.indexOf('e')==-1){
                value=xui.toFixedNumber(value,precision) + "";
                value= value.split(".");
                if(forceFillZero!==false){
                    if((value[1]?value[1].length:0)<precision)value[1]=(value[1]||"")+xui.str.repeat('0',precision-(value[1]?value[1].length:0));
                }
                value[0] = value[0].split("").reverse().join("").replace(/(\d{3})(?=\d)/g, "$1"+groupingSeparator).split("").reverse().join("");
                return value.join(decimalSeparator);
            }else
                return value;
        },
        /*shadow copy for hash/array
        * var a=[]; a.b='b'; a.b will not be copied
        */
        copy:function(hash,filter){
            return xui.clone(hash,filter,1);
        },
        /*deep copy for hash/array, and hash/array only
        * var a=[]; a.b='b'; a.b will not be cloned
        *be careful for dead lock
        */
        clone:function(hash,filter,deep){
            var layer=arguments[3]||0;
            if(hash && (xui.isHash(hash)||xui.isArr(hash))){
                if(xui.isObj(hash)){                var me=arguments.callee,
                        isArr=xui.isArr(hash),
                        h=isArr?[]:{},
                        i=0,v,l;
                    if(!deep){
                        if(deep<=0)return hash;
                        else deep=100;
                    }
                    if(isArr){
                        l=hash.length;
                        for(;i<l;i++){
                            if(typeof filter=='function'&&false===filter.call(hash,hash[i],i,layer+1))continue;
                            h[h.length]=((v=hash[i]) && deep && (xui.isHash(v)||xui.isArr(v)))?me(v,filter,deep-1,layer+1):v;
                        }
                    }else{
                        for(i in hash){
                            if(filter===true?i.charAt(0)=='_':
                                filter===false?(i.charAt(0)=='_'||i.charAt(0)=='$'):
                                typeof filter=='function'?false===filter.call(hash,hash[i],i,layer+1):0)
                                continue;
                            h[i]=((v=hash[i]) && deep && (xui.isHash(v)||xui.isArr(v)))?me(v,filter,deep-1,layer+1):v;
                        }
                    }
                    return h;
                }else return hash;
            }else return hash;
        },
        /*filter hash/array
        filter: filter function(will delete "return false")
        */
        filter:function(obj, filter, force){
            if(!force && obj && xui.isArr(obj)){
                var i,l,v,a=[],o;
                for(i=0, l=obj.length; i<l; i++)a[a.length]=obj[i];
                obj.length=0;
                for(i=0, l=a.length; i<l; i++)
                    if(typeof filter=='function'?false!==filter.call(a,a[i],i):1)
                        obj[obj.length]=a[i];
            }else{
                var i, bak={};
                for(i in obj)
                    if(filter===true?i.charAt(0)=='_':
                        filter===false?(i.charAt(0)=='_'||i.charAt(0)=='$'):
                        typeof filter=='function'?false===filter.call(obj,obj[i],i):0)
                        bak[i]=1;

                for(i in bak)
                    delete obj[i];
            }
            return obj;
        },
        /*convert iterator to Array
        value: something can be iteratorred
        xui.toArr({a:1},true) => [a];
        xui.toArr({a:1},false) => [1];
        xui.toArr('a,b') => ['a','b'];
        xui.toArr('a;b',';') => ['a','b'];
        */
        toArr:function(value, flag){
            if(!value)return [];
            var arr=[];
            //hash
            if(typeof flag == 'boolean')
                for(var i in value)
                    arr[arr.length]=flag?i:value[i];
            //other like arguments
            else{
                if(xui.isHash(value)){
                    for(var i in value){
                        arr.push({key:i,value:value[i]});
                    }
                }else if(typeof value=='string')
                    arr=value.split(flag||',');
                else
                    for(var i=0,l=value.length; i<l; ++i)
                        arr[i]=value[i];
            }
            return arr;
        },
        toUTF8:function(str){
            return str.replace(/[^\x00-\xff]/g, function(a,b) {
                return '\\u' + ((b=a.charCodeAt())<16?'000':b<256?'00':b<4096?'0':'')+b.toString(16)
            })
        },
        fromUTF8:function(str){
            return str.replace(/\\u([0-9a-f]{3})([0-9a-f])/g,function(a,b,c){return String.fromCharCode((parseInt(b,16)*16+parseInt(c,16)))})
        },
        urlEncode:function(hash){
            var a=[],i,o;
            for(i in hash)
                if(xui.isDefined(o=hash[i]))
                    a.push(encodeURIComponent(i)+'='+encodeURIComponent(typeof o=='string'?o:xui.serialize(o)));
            return a.join('&');
        },
        urlDecode:function(str, key){
            if(!str)return key?'':{};
            var arr,hash={},a=str.split('&'),o;
            for(var i=0,l=a.length;i<l;i++){
                o=a[i];
                arr=o.split('=');
                try{
                    hash[decodeURIComponent(arr[0])]=decodeURIComponent(arr[1]);
                }catch(e){
                    hash[arr[0]]=arr[1];
                }
            }
            return key?hash[key]:hash;
        },
        preLoadImage:function(src, onSuccess, onFail) {
            if(xui.isArr(src)){
                for(var i=0, l=arr.length; i<l; i++)
                    xui.preLoadImage(src[i], onSuccess, onFail);
                return l;
            }
            var img = document.createElement("img");
            img.style.cssText = "position:absolute;left:-999px;top:-999px";
            img.width=img.height=2;
            img.onload = function () {
                if(typeof onSuccess=='function')onSuccess.call(this);
                this.onload = this.onerror = null;
                document.body.removeChild(this);
            };
            img.onerror = function () {
                if(typeof onFail=='function')onFail.call(this);
                this.onload = this.onerror = null;
                document.body.removeChild(this);
            };
            document.body.appendChild(img);
            img.src = src;
        return 1;
        },
        // type detection
        isDefined:function(target)  {return target!==undefined},
        isNull:function(target)  {return target===null},
        isSet:function(target)   {return target!==undefined && target!==null && target!==NaN},
        // including : object array function
        isObj:function(target)   {return !!target  && (typeof target == 'object' || typeof target == 'function')},
        isHash:function(target)  {return !!target && _to.call(target)=='[object Object]' && target.constructor && /^\s*function\s+Object\(\s*\)/.test(target.constructor.toString()) && !Object.prototype.hasOwnProperty.call(target,"callee")},
        isBool:function(target)  {return typeof target == 'boolean'},
        isNumb:function(target)  {return typeof target == 'number' && isFinite(target)},
        isFinite:function(target)  {return (target||target===0) && isFinite(target) && !isNaN(parseFloat(target))},
        isDate:function(target)  {return _to.call(target)==='[object Date]' && isFinite(+target)},
        isFun:function(target)   {return _to.call(target)==='[object Function]'},
        isArr:function(target)   {return _to.call(target)==='[object Array]'},
        isReg:function(target)   {return _to.call(target)==='[object RegExp]'},
        isStr:function(target)   {return _to.call(target)==='[object String]'},
        isArguments:function(target)   {return target && (_to.call(target)==='[object Arguments]' || Object.prototype.hasOwnProperty.call(target,"callee"))},
        isElem:function(target) {return !!(target && target.nodeType === 1)},
        isNaN:function(target) {return typeof target == 'number' && target != +target;},
        //for handling String
        str:{
            startWith:function(str,sStr){
                return str.indexOf(sStr) === 0;
            },
            endWith:function (str,eStr) {
                var l=str.length-eStr.length;
                return l>=0 && str.lastIndexOf(eStr) === l;
            },
            repeat:function(str,times){
                return new Array(times+1).join(str);
            },
            initial:function(str){
                return str.charAt(0).toUpperCase() + str.substring(1);
            },
            trim:function(str){
                return str?str.replace(/^(\s|\uFEFF|\xA0)+|(\s|\uFEFF|\xA0)+$/g, ''):str;
            },
            ltrim:function(str){
                return str?str.replace(/^(\s|\uFEFF|\xA0)+/,''):str;
            },
            rtrim:function(str){
                return str?str.replace(/(\s|\uFEFF|\xA0)+$/,''):str;
            },
            /*
            blen : function(s){
                var _t=s.match(/[^\x00-\xff]/ig);
                return s.length+(null===_t?0:_t.length);
            },
            */
            //Dependencies: xui.Dom
            toDom:function(str){
                var p=xui.$getGhostDiv(), r=[];
                p.innerHTML=str;
                for(var i=0,t=p.childNodes,l=t.length;i<l;i++)r[r.length]=t[i];
                p=null;
                return xui(r);
            }
        },
        //for handling Array
        arr:{
            fastSortObject:function(arr, getKey){
                if(!arr||arr.length<2)return arr;

                var ll=arr.length,
                    zero=[],
                    len=(ll+"").length,
                    p=Object.prototype,
                    o,s,c,t;
                for(var i=0;i<len;i++)zero[i]=new Array(len-i).join("0");
                for(var j=0;j<ll;j++){
                    s=j+'';
                    c=arr[j];
                    if(typeof c=="object")c._xui_$s$=(xui.isSet(t=getKey.call(c,j))?t:'') + zero[s.length-1] + s;
                }
                try{
                    o=p.toString;
                    p.toString=function(){return this.hasOwnProperty('_xui_$s$')?(this._xui_$s$):(o.call(this));};
                    arr.sort();
                }finally{
                    p.toString=o;
                    for(var j=0;j<ll;j++)if(typeof arr[j]=="object")delete arr[j]._xui_$s$;
                }
                return arr;
            },
            stableSort:function(arr,sortby){
                if(arr && arr.length > 1){
                    for(var i=0,l=arr.length,a=[],b=[];i<l;i++)b[i]=arr[a[i]=i];
                    if(xui.isFun(sortby))
                        a.sort(function(x,y){
                            return sortby.call(arr,arr[x],arr[y]) || (x>y?1:-1);
                        });
                    else
                        a.sort(function(x,y){
                            return arr[x]>arr[y]?1:arr[x]<arr[y]?-1:x>y?1:-1;
                        });
                    for(i=0;i<l;i++)arr[i]=b[a[i]];
                    a.length=b.length=0;
                }
                return arr;
            },
            subIndexOf:function(arr,key,value){
                if(value===undefined)return -1;
                for(var i=0, l=arr.length; i<l; i++)
                    if(arr[i] && arr[i][key] === value)
                        return i;
                return -1;
            },
            removeFrom:function(arr, index,length){
                arr.splice(index, length || 1);
                return arr;
            },
            removeValue:function(arr, value){
                for(var l=arr.length,i=l-1; i>=0; i--)
                    if(arr[i]===value)
                        arr.splice(i,1);
                return arr;
            },
            /*
             insert something to array
             arr: any
             index:default is length-1
             flag: is add array

             For example:
             [1,2].insertAny(3)
                will return [1,2,3]
             [1,2].insertAny(3,0)
                will return [3,1,2]
             [1,2].insertAny([3,4])
                will return [1,2,3,4]
             [1,2].insertAny([3,4],3,true)
                will return [1,2,[3,4]]
            */
            insertAny:function (arr, target,index, flag) {
                var l=arr.length;
                flag=(!xui.isArr(target)) || flag;
                if(index===0){
                    if(flag)
                        arr.unshift(target);
                    else
                        arr.unshift.apply(arr, target);
                }else{
                    var a;
                    if(!index || index<0 || index>l)index=l;
                    if(index!=l)
                        a=arr.splice(index,l-index);
                    if(flag)
                        arr[arr.length]=target;
                    else
                        arr.push.apply(arr, target);
                    if(a)
                        arr.push.apply(arr, a);
                }
                return index;
            },
            indexOf:function(arr, value) {
                for(var i=0, l=arr.length; i<l; i++)
                    if(arr[i] === value)
                        return i;
                return -1;
            },
            /*
            fun: fun to apply
            desc: true - max to min , or min to max
            atarget: for this
            */
            each:function(arr,fun,scope,desc){
                var i, l, a=arr;
                if(!a)return a;
                if(!xui.isArr(a)){
                    if(!xui.isArr(a._nodes))
                        return a;
                    a=a._nodes;
                    if(desc===undefined)
                        desc=1;
                }
                l=a.length;
                scope = scope||arr;
                if(!desc){
                    for(i=0; i<l; i++)
                        if(fun.call(scope, a[i], i, a)===false)
                            break;
                }else
                    for(i=l-1; i>=0; i--)
                        if(fun.call(scope, a[i], i, a)===false)
                            break;
                return arr;
            },
            removeDuplicate:function(arr,subKey){
                var l=arr.length,a=arr.concat();
                arr.length=0;
                for(var i=l-1;i>=0;i--){
                    if(subKey? this.subIndexOf(a, subKey, a[i][subKey])===i: this.indexOf(a, a[i])===i)
                        arr.push(a[i]);
                }
                return arr.reverse();
            }
        }
    });
};
xui.merge(xui.fun,{
    body:function(fun){
        var s=""+fun;
        s=s.replace(/(\s*\/\*[^*]*\*+([^\/][^*]*\*+)*\/)|(\s*\/\/[^\n]*)|(\)[\s\S]*)/g,function(a){return a.charAt(0)!=")"?"":a});        
        return s.slice(s.indexOf("{") + 1, s.lastIndexOf("}"));
    },
    args:function(fun){
        var s=""+fun;
        s=s.replace(/(\s*\/\*[^*]*\*+([^\/][^*]*\*+)*\/)|(\s*\/\/[^\n]*)|(\)[\s\S]*)/g,function(a){return a.charAt(0)!=")"?"":a});
        s=s.slice(s.indexOf("(") + 1, s.indexOf(")")).split(/\s*,\s*/);
        return s[0]&&s;
    },
    clone:function(fun){
        return new Function(xui.fun.args(fun),xui.fun.body(fun));
    }
});

xui.merge(Class, {
    _reg:{$key:1,$parent:1,$children:1,KEY:1,Static:1,Instance:1,Constructor:1,Initialize:1},
    // give nodeType to avoid breakO
    _reg2:{'nodeType':1,'constructor':1,'prototype':1,'toString':1,'valueOf':1,'hasOwnProperty':1,'isPrototypeOf':1,'propertyIsEnumerable':1,'toLocaleString':1},
    _all:[],
    /*envelop a function by some keys
    */
    _fun:function(fun, name, original, upper, type){
        fun.$name$=name;
        fun.$original$=original;
        if(type)fun.$type$=type;
        if(upper && fun!==upper)fun.upper=upper;
        return fun;
    },
    _other:["toString", "valueOf"],
    /*envelop object's item from an object
    target: target object
    src: from object
     i: key in hash
    limit: envelop values in a hash
    */
    _o:{},
    //inherit from parents
    _inherit:function (target, src, instance){
        var i, o, r=this._reg;
        for(i in src){
            if(i in target || (!instance && r[i]) || i.charAt(0)=='$')continue;
            o=src[i];
            if(o && o.$xui$)continue;
            target[i]=o;
        }
    },
    //wrap
    _wrap:function (target, src, instance, parent, prtt){
        var self=this, i,j,o,k=target.KEY,r=self._reg,r2=self._reg2,f=self._fun,oo=self._other;
        for(i in src){
            if(r2[i] || (!instance && r[i]))continue;
            o=src[i];
            target[i] = (typeof o != 'function') ? o : f(o, i, k, typeof parent[i]=='function'&&parent[i],prtt);
        }
        for(j=0;i=oo[j++];){
            o=src[i];
            if(o && (o == self._o[i]))continue;
            target[i] = (typeof o != 'function') ? o : f(o, i, k, typeof parent[i]=='function'&&parent[i],prtt);
        }
    },
    __gc:function(key){
        var _c=Class._all;
        if(!key){
            for(var i=_c.length-1;i>0;i--)
                Class.__gc(_c[i]);
            return;
        }
        if(typeof key=='object')key=key.KEY||"";
        var t = xui.get(window, key.split('.')),s,i,j;
        if(t){
            //remove from SC cache
            if(s=xui.get(window,['xui','$cache','SC']))delete s[key];

            //remove parent link
            if(t.$parent)
                t.$parent.length=0;

            //remove chidlren link
            //gc children
            if(s=t.$children){
                //destroy children
                for(var i=0,o; o=s[i];i++)
                    if(o=xui.get(window,o.split('.')))
                        o.__gc();
                s.length=0;
            }

            //break function links
            for(i in t)
                if(i!='upper' && typeof t[i]=='function')
                    for(j in t[i])
                        if(t[i].hasOwnProperty(j))
                           delete t[i][j];
            xui.breakO(t);

            t=t.prototype;
            for(i in t)
                if(i!='upper' && typeof t[i]=='function')
                    for(j in t[i])
                        if(t[i].hasOwnProperty(j))
                            delete t[i][j];
            xui.breakO(t);

            //remove it out of window
            xui.set(window, key.split('.'));
        }

        _c.splice(_c[key],1);
        delete _c[key];
    },
    destroy:function(key){Class.__gc(key)}
});

//function Dependencies: xui.Dom xui.Thread
xui.merge(xui,{
    version:2.0,
    $DEFAULTHREF:'javascript:;',
    $IEUNSELECTABLE:function(){return xui.browser.ie?' onselectstart="return false;" ':''},
    SERIALIZEMAXLAYER:99,
    SERIALIZEMAXSIZE:9999,

    $localeKey:'en',
    $localeDomId:'xlid',
    $dateFormat:'',
    $rand:"_r_",

    SpaceUnit:'em',
    $uem:function(p){return ((p?p.spaceUnit:'')||xui.SpaceUnit) == 'em'},
    // for show xui.echo
    debugMode:true,

    Locale:{},
    $cache:{
        thread:{},
        SC:{},
        clsByURI:{},
        fetching:{},
        hookKey:{},
        hookKeyUp:{},
        snipScript:{},

        subscribes:{},

        //ghost divs
        ghostDiv:[],
        data:{},
        callback:{},
        //cache purge map for dom element
        domPurgeData:{},
        //cache DomProfile or UIProfile
        profileMap:{},
        //cache the reclaim serial id for UIProfile
        reclaimId:{},
        //cache built template for UIProfile
        template:{},
        //cache [key]=>[event handler] map for UIProfile
        UIKeyMapEvents:{},
        droppable:{},
        unique:{}
    },
    subscribe:function(topic, subscriber, receiver, asy){
        if(topic===null||topic===undefined||subscriber===null||subscriber===undefined||typeof receiver!='function')return;
        var c=xui.$cache.subscribes,i;
        c[topic]=c[topic]||[];
        i=xui.arr.subIndexOf(c[topic],"id",subscriber);
        if(i!=-1)xui.arr.removeFrom(c[topic],i);
        return c[topic].push({id:subscriber,receiver:receiver,asy:!!asy});
    },
    unsubscribe:function(topic, subscriber){
        var c=xui.$cache.subscribes,i;
        if(!subscriber){
            if(topic===null||topic===undefined)
                c={};
            else
                delete c[topic];
        }else if(c[topic]){
            i=xui.arr.subIndexOf(c[topic],"id",subscriber);
            if(i!=-1)xui.arr.removeFrom(c[topic],i);
        }
    },
    publish:function(topic, args, subscribers, scope){
        var c=xui.$cache.subscribes;
        if(topic===null||topic===undefined){
            for(var topic in c){
                xui.arr.each(c[topic],function(o){
                    if(!subscribers || subscribers===o.id || (xui.isArr(subscribers)&&xui.arr.indexOf(subscribers,o.id)!=-1)){
                        if(o.asy)
                            xui.asyRun(o.receiver, 0, args, scope);
                        else
                            return xui.tryF(o.receiver, args, scope, true);
                    }
                });
            }
        }else if(c[topic]){
            xui.arr.each(c[topic],function(o){
                if(!subscribers || subscribers===o.id || (xui.isArr(subscribers)&&xui.arr.indexOf(subscribers,o.id)!=-1)){
                    if(o.asy)
                        xui.asyRun(o.receiver, 0, args, scope);
                    else
                        return xui.tryF(o.receiver, args, scope, true);
                }
            });
        }
    },
    getSubscribers:function(topic){
        return (topic===null||topic===undefined)?xui.$cache.subscribes:xui.$cache.subscribes[topic];
    },

    setDateFormat:function(format){xui.$dateFormat=format},
    getDateFormat:function(){return xui.$dateFormat},

    setAppLangKey:function(key){xui.$appLangKey=key},
    getAppLangKey:function(key){return xui.$appLangKey},
    getLang:function(){return xui.$localeKey},
    setLang:function(key,callback){
        var g=xui.getRes,t,v,i,j,f,m,z,a=[],l;
        xui.$localeKey=key;
        v = xui.browser.ie ? document.all.tags('span') : document.getElementsByTagName('span');
        for(i=0;t=v[i];i++)if(t.id==xui.$localeDomId)a[a.length]=t;
        l=a.length;
        f=function(){
            (function(){
                j=a.splice(0,100);
                for(i=0;t=j[i];i++)
                    if(t.className && typeof(v=g(t.className))=='string')
                        t.innerHTML=v;
                if(a.length)
                    xui.setTimeout(arguments.callee,0);
                xui.tryF(callback,[a.length,l]);
            }())
        },
        z = 'xui.Locale.' + key,
        m=function(){
            var k=xui.$appLangKey;
            if(k)xui.include(z+'.'+k,xui.getPath('Locale.' + key, '.js'),f,f);
            else f();
        };
        // use special key to invoid other lang setting was loaded first
        xui.include(z+'.inline.$_$', xui.getPath(z, '.js'),m,m);
    },
    getTheme:function(a){
        try{
            a=xui.CSS.$getCSSValue('.setting-uikey','fontFamily');
        }catch(e){}finally{
            return a||"default";
        }
    },
    setTheme:function(key, refresh, onSucess, onFail){
        key=key||'default';
        var okey=xui.getTheme();
        if(key!=okey){
            var onend=function(onSucess){
                if(okey!='default'){
                    var style;
                    while(style=xui.CSS.$getCSSValue('.setting-uikey','fontFamily',okey)){
                        style.disabled=true;
                        style.parentNode.removeChild(style);
                        style=null;
                    }
                }
                if(refresh!==false){
                    xui.$CSSCACHE={};
                    xui.CSS.adjustFont();
                    if(xui.UI)xui.UI.getAll().reLayout(true);
                 }
                xui.tryF(onSucess);
            };
            if(key=='default'){
                onend(onSucess);
            }else{
                try{
                    var tkey=xui.CSS.$getCSSValue('.setting-uikey','fontFamily');
                }catch(e){}finally{
                    if(tkey==key){
                        xui.tryF(onSucess);
                        return;
                    }else{
                        xui.CSS.includeLink(xui.getPath('xui.appearance.'+key,'/theme.css'),'theme:'+key);
                    }
                    var count=0,fun=function(){
                        // timeout: 21 seconds
                        if(count++>20){
                            fun=count=null;
                            if(false!==xui.tryF(onFail))
                                throw 'errLoadTheme:'+key;
                            return;
                        }
                        //test
                        try{
                            var tkey=xui.CSS.$getCSSValue('.setting-uikey','fontFamily');
                        }catch(e){}finally{
                            if(tkey==key){
                                onend(onSucess);
                                fun=count=null;
                            }else{
                                xui.asyRun(fun,100*count);
                            }
                        }
                    };fun();
                }
            }
        }else{
            xui.tryF(onSucess);
        }
    },
    reLayout:function(){
        xui.$CSSCACHE={};
        if(xui.UI)xui.UI.getAll().reLayout(true);
    },
    $CSSCACHE:{},
    _langParamReg:/\x24(\d+)/g,
    _langscMark:/[$@{][\S]+/,
     // locale  pattern  :  $*  $a  $a.b.c  $(a.b.c- d)
     // variable pattern: @a.b.c@  @a@  {!}  {a.b.c}
    _langReg:/((\$)([^\w\(]))|((\$)([\w][\w\.-]*[\w]+))|((\$)\(([\w][\w\.]*[^)\n\r]+))\)|((\$)([^\s]))|((\@)([\w][\w\.]*[\w]+)(\@?))|((\@)([^\s])(\@?))|((\{)([~!@#$%^&*+-\/?.|:][\w\[\]]*|[\w\[\]]+(\(\))?(\.[\w\[\]]+(\(\))?)*)(\}))/g,
    _escapeMap:{
        "$":"\x01",
        ".":"\x02",
        "-":"\x03",
        ")":"\x04",
        "@":"\x05"
    },
    _unescapeMap:{
        "\x01":"$",
        "\x02":".",
        "\x03":"-",
        "\x04":")",
        "\x05":"@"
    },
    //test1: xui.getRes("start.a.b.c $0 $1 ($- $. $$) end-1-2")  => "c 1 2 (- . $) end"
    //tset2: xui.getRes( ["a","b","c $0 $1 ($- $. $$) end"],1,2) => "c 1 2 (- . $) end"
    getRes:function(path){
        var arr,conf,tmp,params=arguments,rtn;
        if(xui.isStr(path)){
            path=path.replace(/\$([$.-])/g,function(a,b){return xui._escapeMap[b]||a;});
            if(path.charAt(0)=='$')path=path.slice(1);
            if(path.indexOf('-')!=-1){
                tmp=path.split('-');
                path=tmp[0];
                params=tmp;
            }else if(xui.isArr(params[1])){
                params=params[1];
                params.unshift(path);
            }
            arr=path.split(".");
            arr[arr.length-1]=arr[arr.length-1].replace(/([\x01\x02\x03\x04])/g,function(a){return xui._unescapeMap[a];});
        }else if(xui.isArr(path)){
            arr=path;
        }else{
            return path;
        }
        conf=xui.get(xui.Locale[xui.$localeKey], arr);
        if((tmp=typeof conf)=='function'){
           return conf.apply(null,params) ;
        }else if(tmp=='object'){
            return conf;
        }else{
            conf = tmp=='string' ? conf.replace(/\$([$.-])/g,function(a,b){return xui._escapeMap[b]||a;}) : arr[arr.length-1];
            rtn = params.length>1 ? conf.replace(xui._langParamReg,function(z,id,k){k=params[1+ +id];return (k===null||k===undefined)?z:k}) : conf;
            return rtn.replace(/([\x01\x02\x03])/g,function(a){return xui._unescapeMap[a];});
        }
    },
    wrapRes:function(id){
        if(!xui.isStr(id))return id;
        var i=id, s,r;
        if(i.charAt(0)=='$')arguments[0]=i.substr(1,i.length-1);
        s=id;
        r= xui.getRes.apply(null,arguments);
        if(s==r)r=i;
        return '<span id="'+xui.$localeDomId+'" class="'+s.replace(/([\x01\x02\x03\x04])/g,function(a){return '$'+xui._unescapeMap[a];})+'" '+xui.$IEUNSELECTABLE()+'>'+r+'</span>';
    },
    //test1: xui.adjustRes("$(start.a.b.c $0 $1 ($- $. $$$) end-1-2)"); => "c 1 2 (- . $) end"
    adjustRes:function(str, wrap, onlyBraces, onlyVars, params, scope){
        if(!xui.isStr(str))return str;
        wrap=wrap?xui.wrapRes:xui.getRes;
        str=str.replace(/\$([\$\.\-\)])/g,function(a,b){return xui._escapeMap[b]||a;});
        str=xui._langscMark.test(str) ?  str.replace(xui._langReg, function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z){
                    // protect $@{
            return c=='$' ? onlyVars?a:d :
                    // $a.b.c-1-3
                    f=='$' ? onlyVars?a:wrap(g,params) :
                    // $(a.b.c-d) 
                    i=='$' ? onlyVars?a:wrap(j,params) : 
                    // $a
                    l=='$' ? onlyVars?a:wrap(m,params) :
                    // variable: @a@ @a.b.c@ {a.b.c}
                     ((onlyBraces?0:(o=='@'||s=='@'))||w=="{") ? ((z=xui.SC.get(o=="@"?p:s=="@"?t:x,scope)) || (xui.isSet(z)?z:""))
                     : a;
            }): str;
            return str.replace(/([\x01\x02\x03\x04])/g,function(a){return xui._unescapeMap[a];});
    },
    adjustVar:function(obj,scope){
        var t;
        return typeof(obj)=="string" ?
                    obj=="{[]}"?[]:
                    obj=="{{}}"?{}:
                    obj=="{}"?"":
                    obj=="{true}"?true:
                    obj=="{false}"?false:
                    obj=="{NaN}"?NaN:
                    obj=="{null}"?null:
                    obj=="{undefined}"?undefined:
                    obj=="{now}"?new Date():
                    (t=/^\s*\{((-?\d\d*\.\d*)|(-?\d\d*)|(-?\.\d\d*))\}\s*$/.exec(obj))  ? parseFloat(t[1]):
                    (t=/^\s*\{([\S]+)\}\s*$/.exec(obj))  ?
                    xui.SC.get(t[1], scope)
                   : xui.adjustRes(obj, false, true, true, null, scope)
                   : obj;
    },
    _getrpc:function(uri,query,options){
        var t = (options&&options.proxyType) ? options.proxyType.toLowerCase() : "";

        return (t=="sajax"||t=="jsonp") ? xui.JSONP 
        : (t=="iajax"||t=="xdmi") ? xui.XDMI 
        : (t=="ajax") ? xui.Ajax
        // include a file => XDMI
        : (typeof query=='object' && ((function(d){if(!xui.isHash(d))return 0; for(var i in d)if((d[i] && d[i].nodeType==1 && d[i].nodeName=="INPUT") || (d[i] && d[i].$xuiFileCtrl))return 1})(query))) ? xui.XDMI
        // post: crossdomain => XDMI, else Ajax
        : (options&&options.method&&options.method.toLowerCase()=='post') ?  xui.absIO.isCrossDomain(uri) ? xui.XDMI  : xui.Ajax
        // get : crossdomain => JSONP, else Ajax
        : xui.absIO.isCrossDomain(uri) ? xui.JSONP : xui.Ajax;
    },
    request:function(uri, query, onSuccess, onFail, threadid, options){
        return xui._getrpc(uri, query, options).apply(null, arguments).start();
    },
    ajax:function(uri, query, onSuccess, onFail, threadid, options){
        return xui.Ajax.apply(null, arguments).start();
    },
    jsonp:function(uri, query, onSuccess, onFail, threadid, options){
        return xui.JSONP.apply(null, arguments).start();
    },
    xdmi:function(uri, query, onSuccess, onFail, threadid, options){
        return xui.XDMI.apply(null, arguments).start();
    },
    restGet:function(uri, query, onSuccess, onFail, threadid,options){
        if(!options) options={};options.method="get";
        return xui.Ajax(uri, query, onSuccess, onFail, threadid, options).start();
    },
    restPost:function(uri, query, onSuccess, onFail, threadid,options){
        if(!options) options={};options.method="post";
        return xui.Ajax(uri, query, onSuccess, onFail, threadid, options).start();
    },
    restPut:function(uri, query, onSuccess, onFail, threadid,options){
        if(!options) options={};options.method="put";
        return xui.Ajax(uri, query, onSuccess, onFail, threadid, options).start();
    },
    restDelete:function(uri, query, onSuccess, onFail, threadid,options){
        if(!options) options={};options.method="delete";
        return xui.Ajax(uri, query, onSuccess, onFail, threadid, options).start();
    },
    getFileSync:function(uri, rspType, onSuccess, onFail, options){
        return xui.Ajax(uri, xui.$rand+"="+xui.rand(),onSuccess,onFail, null, xui.merge({asy:false, rspType: rspType||"text"},options,'without')).start()||null;
    },
    getFileAsync:function(uri, rspType, onSuccess, onFail, threadid, options){
        xui.Ajax(uri,xui.$rand+"="+xui.rand(),onSuccess, onFail,threadid, xui.merge({asy:true, rspType: rspType||"text"},options,'without')).start();
    },
    include:function(id,path,onSuccess,onFail,sync,options){
        if(id&&xui.SC.get(id))
            xui.tryF(onSuccess);
        else{
            options=typeof options=='object'?options:{};
            if(!sync){
                options.rspType='script';
                options.checkKey=id;
                xui.JSONP(path,xui.$rand+"="+xui.rand(),onSuccess,onFail,0,options).start()
            }else{
                options.asy=!sync;
                xui.Ajax(path,xui.$rand+"="+xui.rand(),function(rsp){
                    try{xui.exec(rsp,id)}
                    catch(e){xui.tryF(onFail,[e.name + ": " + e.message])}
                    xui.tryF(onSuccess);
                },onFail,0,options).start();
                }
        }
    },
    mailTo:function(email, subject,body,cc,bcc){
       var url = 'mailto:'+email+
            '?subject=' +encodeURIComponent(xui.adjustRes(subject||""))
            + '&body= ' + encodeURIComponent(xui.adjustRes(body||""))
            + '&cc= ' + (cc||"")
            + '&bcc= ' + (bcc||"");
        xui.XDMI(url).start();
    },
    fetchClass:function(uri, onSuccess, onFail, onAlert, force, threadid, options){
        if(/\//.test(uri) && !/\.js$/i.test(uri))
            uri=uri+".js";
        options=options||{};
        var isPath=/\.js$/i.test(uri), 
            c=xui.$cache.clsByURI,
            f=xui.$cache.fetching,
            cls,t;
         if(!isPath){
             // special path( dont use any dynamic
             if(!options.hasOwnProperty('appPath') && window["/"])options.appPath=window["/"];
             cls=uri;
             uri=xui.getPath(uri,'.js','js',options);
         }
        if(!force && (isPath?((t=c[uri]) && t.$xui$):(t=xui.SC.get(cls))))
            xui.tryF(onSuccess,[uri,cls],t);
        else{
            // For fetching one class multiple times
            if(!f[uri]){
                f[uri]=[onSuccess=onSuccess?[onSuccess]:[], onFail=onFail?[onFail]:[], onAlert=onAlert?[onAlert]:[],[]];
                if(xui.absIO.isCrossDomain(uri)){
                    Class._ignoreNSCache=1;Class._last=null;
                    xui.JSONP(uri,xui.$rand+"="+xui.rand(),function(){
                        if(Class._last)t=c[uri]=Class._last;
                        Class._ignoreNSCache=Class._last=null;
                        if(t){for(var i in onSuccess)xui.tryF(onSuccess[i], [uri,t.KEY],t);}
                        else{for(var i in onFail)xui.tryF(onFail[i],  xui.toArr(arguments));}
                        var s=xui.getClassName(uri);
                        if(t&&t.KEY!=s){
                            var msg="The last class name in '"+uri+"' should be '"+s+"', but it's '"+t.KEY+"'!";
                            for(var i in onAlert)xui.tryF(onAlert[i], [msg, uri, s, t.KEY]);
                            xui.asyRun(function(){
                                throw msg;
                            });
                        }
                        // for Thread.group in fetchClasses
                        for(var i in f[uri][3])xui.Thread(f[uri][3][i]).abort();
                        if(f[uri]){f[uri][0].length=0;f[uri][1].length=0;f[uri][2].length=0;f[uri][3].length=0;f[uri].length=0;delete f[uri];}
                    },function(){
                        Class._ignoreNSCache=1;Class._last=null;
                        for(var i in onFail)xui.tryF(onFail[i], xui.toArr(arguments));
                        // for Thread.group in fetchClasses
                        for(var i in f[uri][3])xui.Thread(f[uri][3][i]).abort();
                        if(f[uri]){f[uri][0].length=0;f[uri][1].length=0;f[uri][2].length=0;f[uri][3].length=0;f[uri].length=0;delete f[uri];}
                    },threadid,{rspType:'script'}).start();
                }else{
                    xui.Ajax(uri,xui.$rand+"="+xui.rand(),function(rsp){
                        Class._ignoreNSCache=1;Class._last=null;
                        var scriptnode;
                        var s=xui.getClassName(uri);
                        try{scriptnode=xui.exec(rsp, s)}
                        catch(e){for(var i in onFail)xui.tryF(onFail[i],[e.name + ": " + e.message]);Class._last=null;}
                        if(Class._last)t=c[uri]=Class._last;
                        Class._last=null;
                        if(t){for(var i in onSuccess)xui.tryF(onSuccess[i], [uri,t.KEY],t);}
                        else{for(var i in onFail)xui.tryF(onFail[i],  xui.toArr(arguments));}
                        if(t&&t.KEY!=s){
                            var msg="The last class name in '"+uri+"' should be '"+s+"', but it's '"+t.KEY+"'!";
                            for(var i in onAlert)xui.tryF(onAlert[i], [msg, uri, s,  t.KEY]);
                            xui.asyRun(function(){
                                throw msg;
                            });
                        }
                        // for Thread.group in fetchClasses
                        for(var i in f[uri][3])xui.Thread(f[uri][3][i]).abort();
                        if(f[uri]){f[uri][0].length=0;f[uri][1].length=0;f[uri][2].length=0;f[uri][3].length=0;f[uri].length=0;delete f[uri];}
                    },function(){
                        Class._ignoreNSCache=Class._last=null;
                        for(var i in onFail)xui.tryF(onFail[i], xui.toArr(arguments));
                        // for Thread.group in fetchClasses
                        for(var i in f[uri][3])xui.Thread(f[uri][3][i]).abort();
                        if(f[uri]){f[uri][0].length=0;f[uri][1].length=0;f[uri][2].length=0;f[uri][3].length=0;f[uri].length=0;delete f[uri];}
                    },threadid,{rspType:'text',asy:true}).start();
                }
            }else{
                if(onSuccess)f[uri][0].push(onSuccess);
                if(onFail)f[uri][1].push(onFail);
                if(onAlert)f[uri][2].push(onAlert);
                if(threadid){
                    f[uri][3].push(threadid);
                    xui.Thread(threadid).suspend();
                }
            }
        }
    },
    fetchClasses:function(uris, onEnd, onSuccess, onFail, onAlert, force, threadid, options){
        var hash={}, f=function(uri,i,hash){
            hash[i]=xui.Thread(null,[function(tid){
                xui.fetchClass(uri, onSuccess, onFail, onAlert, force, tid, options);
            }]);
        };
        for(var i=0,l=uris.length;i<l;i++)f(uris[i],i,hash);
        return xui.Thread.group(null, hash, null, function(){
            xui.Thread(threadid).suspend();
        }, function(){
            xui.tryF(onEnd,arguments,this);
            xui.Thread(threadid).resume();
        }).start();
    },
    // Recursive require
    require:function(clsArr, onEnd, onSuccess, onFail, onAlert,force, threadid, options){
        if(xui.isStr(clsArr))clsArr=[clsArr];
        var fun=function(paths, tid){
            xui.fetchClasses(paths,function(){ 
                var a2=[], t, r;
                for(var i=0,l=paths.length;i<l;i++){
                    t=xui.SC.get(paths[i]);
                    //collect  required class
                    if(t && (r=t.Required) && r.length){
                        for(var j=0,m=r.length;j<m;j++){
                            if(!xui.SC.get(r[j]))a2.push(r[j]);
                        }
                    }
                    // if it's module, collect required class in iniComponents
                    if(t && t['xui.Module'] && (t=t.prototype&&t.prototype.iniComponents)){
                        xui.fun.body(t).replace(/\bxui.create\s*\(\s*['"]([\w.]+)['"]\s*[,)]/g,function(a,b){
                            if(!(a=xui.SC.get(b))){
                                a2.push(b);
                                a=null;
                            }
                           // if(force && a && a['xui.Module']){
                           //     a2.push(b);
                           // }
                        });
                    }
                }
                if(a2.length){
                    fun(a2, null);
                }else{
                    var arr=[];
                    for(var i=0,l=clsArr.length;i<l;i++){
                        arr.push(xui.SC.get(clsArr[i]));
                    }
                    if(onEnd)onEnd.apply(null,arr);
                }
            },onSuccess,onFail,onAlert,force,tid,options);
        };
        fun(clsArr, threadid);
    },
    /*
    set application main function
    example:
        xui.main(function(){
            ...
        });
    */
    _m:[],
    main:function(fun){
        if(xui.arr.indexOf(xui._m, fun)==-1)
            xui._m.push(fun);
        // run it now
        if(xui.isDomReady){
            xui._domReadyFuns();
        }
    },
    /*
    key: xui.UI.xxx
    tag: file tag
    add: appearance or bahavior
    example:
        xui.getPath('xui.UI.Button','','appearance') => xui.ini.path + /appearance/UI/Button/
        xui.getPath('xui.UI.Button','.gif','appearance') => xui.ini.path + /appearance/UI/Button.gif
        xui.getPath('a.b','','appearance') => xui.ini.appPath + /a/appearance/b/"
        xui.getPath('a.b','.gif','appearance') => xui.ini.appPath + /a/appearance/b.gif"
    */
    getPath : function(key, tag, folder,options){
        key=key.split('.');
        if(folder){
            var a=[key[0],folder];
            for(var i=1,l=key.length;i<l;i++)
                a.push(key[i]);
            key.length=0;
            key=a;
        }

        var pre,ini=xui.ini;
        if(key[0]=='xui'){
            pre=(options&&options.xuiPath)||ini.path;
            key.shift();
            if(key.length==(folder?1:0))key.push('xui');
        }else{
            pre=(options&&options.appPath)||ini.appPath;
            if(key.length==((folder?1:0)+1) && tag=='.js')key.push('index');
            if((options&&options.verPath)||ini.verPath) pre += ((options&&options.verPath)||ini.verPath) + '/';
            if(ini.ver) pre += ini.ver + '/';
        }
        if(pre.slice(-1)!="/")
            pre+="/";
        return pre + key.join('\/') + (tag||'\/');
    },
    getClassName:function(uri){
        if(uri&&xui.isStr(uri)){
            var a=uri.split(/\/js\//g),
                b,c,n=a.length;
            if(n>=2){
                // get the last one: any/js/any/App/js/index.js
                b=a[n-2].split(/\//g);
                b=b[b.length-1];
                a=a[n-1].replace(/\.js$/i,"");
                return (b+(a?".":"")+a.replace(/\//g,".")).replace(/^([^.]+)\.index$/,'$1');
            }
        }
    },
    log:xui.fun(),
    echo:xui.fun(),
    message:xui.fun(),

    //profile object cache
    _pool:[],
    getObject:function(id){return xui._pool['$'+id]},
    getObjectByAlias:function(alias){
        var o;
        for(var i in xui._pool){
            o=xui._pool[i];
            if(('alias' in o)&&o.alias===alias){
                return typeof(o.boxing)=="function"?o.boxing():o;
            }
        }
    },
    _ghostDivId:"xui.ghost::",
    $getGhostDiv:function(){
        var pool=xui.$cache.ghostDiv,
            i=0,l=pool.length,p;
        do{p=pool[i++]}while(i<l && (p&&p.firstChild))
        if(!p || p.firstChild){
            p=document.createElement('div');
            p.id=xui._ghostDivId;
            pool.push(p);
        }
        return p;
    },
    //for handling dom element
    $xid:0,
    $registerNode:function(o){
        //get id from cache or id
        var id,v,purge=xui.$cache.domPurgeData;
        if(!(o.$xid && (v=purge[o.$xid]) && v.element==o)){
            id='!'+xui.$xid++;
            v=purge[id]||(purge[id]={});
            v.element=o;
            o.$xid=v.$xid=id;
        }
        o=null;
        return v;
    },
    getId:function(node){
        if(typeof node=='string')node=document.getElementById(node);
        return node ? window===node?"!window":document===node?"!document":(node.$xid||'') : '';
    },
    getNode:function(xid){
        return xui.use(xid).get(0);
    },
    getNodeData:function(node,path){
        if(!node)return;
        return xui.get(xui.$cache.domPurgeData[typeof node=='string'?node:xui.getId(node)],path);
    },
    setData:function(path,value){
        return xui.set(xui.$cache.data,path,value);
    },
    getData:function(path){
        return xui.get(xui.$cache.data,path);
    },
    setNodeData:function(node,path,value){
        if(!node)return;
        return xui.set(xui.$cache.domPurgeData[typeof node=='string'?node:xui.getId(node)],path,value);
    },
    $purgeChildren:function(node){
        var cache=xui.$cache,
            proMap=cache.profileMap,
            ch=cache.UIKeyMapEvents,
            pdata=cache.domPurgeData,
            handler=xui.Event.$eventhandler,
            // ie<=10
            children=(xui.browser.ie && node.all )? node.all : node.getElementsByTagName('*'),
            l=children.length,
            bak=[],
            i,j,o,t,v,w,id;
         for(i=0;i<l;i++){
            if(!(v=children[i]))continue;
            if(t=v.$xid){
                if(o=pdata[t]){
                    if(w=o.eHandlers){
                        if(xui.browser.isTouch && w['onxuitouchdown']){
                            if(v.removeEventListener){
                                v.removeEventListener("xuitouchdown", handler,false);
                            }else if(v.detachEvent){
                                v.detachEvent("xuitouchdown", handler);
                            }
                        }
                        for(j in w)
                            v[j]=null;
                    }
                    for(j in o)
                        o[j]=null;

                    delete pdata[t];
                }

                //remove the only var in dom element
                if(xui.browser.ie)
                    v.removeAttribute('$xid');
                else
                    delete v.$xid;
            }

            //clear event handler
            if(id=v.id){
                //clear dom cache
                //trigger object __gc
                if(id in proMap){
                     o=proMap[id];
                     if(!o)continue;
                     t=o.renderId;
                     if('!window'===t||'!document'===t)continue;

                     //don't trigger any innerHTML or removeChild in __gc()
                     o.__gc();
                     //clear the cache
                     bak[bak.length]=id;
                     //clear the cache shadow
                     if(o.$domId && o.$domId!=o.domId)
                        bak[bak.length]=o.$domId;
                }
            }
         }
         //clear dom cache
         for(i=0;i<bak.length;)
             delete proMap[bak[i++]];
         //clear dom content
         //while(node.firstChild)
         //   node.removeChild(node.firstChild);
         node.innerHTML='';
    },

    //create:function(tag, properties, events, host){
    create:function(tag,bak){
        var arr,o,t,me=arguments.callee,r1=me.r1||(me.r1=/</);
        if(typeof tag == 'string'){
            //Any class inherited from xui.absBox
            if(t=xui.absBox.$type[tag]){
                arr=[];
                //shift will crash in opera
                for(var i=1,l=arguments.length;i<l;i++)
                    arr[i-1]=arguments[i];
                o = new (xui.SC(t))(false);
                if(o._ini)o._ini.apply(o, arr);
            }else if( ((t=xui.SC.get(tag))&&t["xui.Module"]) || bak =="xui.Module" ){
                if(t){
                    o=new t();
                // use place holder to lazy bind
                }else{
                    o = new xui.UI.MoudluePlaceHolder();
                    xui.require(tag,function(module){
                         if(module&&module["xui.Module"]){
                            if(o.get(0).renderId){
                                var m=new module();
                                m.create(function(){
                                    o.replaceWithModule(m);
                                });
                            }else{
                                o.get(0)._module = new module();
                            }
                         }
                     }); 
                }
            //from HTML string
            }else if(r1.test(tag)){
                o = xui.str.toDom(tag);
            //from HTML element tagName
            }else{
                o=document.createElement(tag);
                o.id = typeof id=='string'?id:xui.id();
                o=xui(o);
            }
        //Any class inherited from xui.absBox
        }else{
            if(tag['xui.Module']){
                if( (t=xui.SC.get(tag.key)) && t["xui.Module"]){
                    o=new t(tag);
                // use place holder to lazy bind
                }else{
                    o = new xui.UI.MoudluePlaceHolder();
                    if(tag.host ||  tag.alias)o.setHost(tag.host, tag.alias);
                    if(t=tag.events)o.setEvents(t);
                    if(t=tag.properties)o.setProperties(t);

                    if(tag.moduleClass && tag.moduleXid){
                        o.get(0).moduleClass = tag.moduleClass;
                        o.get(0).moduleXid = tag.moduleXid;
                    }
                    xui.require(tag.key, function(module){
                        if(module&&module["xui.Module"]){
                            var m=new module(tag);
                            m.create(function(){
                                o.replaceWithModule(m);
                            });
                         }
                     });
                }
            }else{
                o = new (xui.SC(tag.key))(tag);
            }
        }
        return o;
    },
    query:function(){
        return xui.doc.query.apply(xui.doc, arguments);
    },
    querySelector:function(){
        return xui.doc.querySelector.apply(xui.doc, arguments);
    },
    querySelectorAll:function(){
        return xui.doc.querySelectorAll.apply(xui.doc, arguments);
    },
    use:function(xid){
        var c=xui._tempBox||(xui._tempBox=xui()), n=c._nodes;
        n[0]=xid;
        if(n.length!=1)n.length=1;
        return c;
    }
});

/* xui.ini xui.browser dom ready
*/
new function(){
    //browser sniffer
    var w=window, u=navigator.userAgent.toLowerCase(), d=document, dm=d.documentMode, b=xui.browser={
        kde:/webkit/.test(u),
        applewebkit:/applewebkit/.test(u),
        opr:/opera/.test(u),
        ie:(/msie/.test(u) && !/opera/.test(u)),
        newie:/trident\/.* rv:([0-9]{1,}[.0-9]{0,})/.test(u),
        gek:/mozilla/.test(u) && !/(compatible|webkit)/.test(u),

        isStrict:d.compatMode=="CSS1Compat",
        isWebKit:/webkit/.test(u),
        isFF:/firefox/.test(u),
        isChrome:/chrome/.test(u),
        isSafari:(!/chrome/.test(u)) && /safari/.test(u),

        isWin:/(windows|win32)/.test(u),
        isMac:/(macintosh|mac os x)/.test(u),
        isAir:/adobeair/.test(u),
        isLinux:/linux/.test(u),
        isSecure:location.href.toLowerCase().indexOf("https")==0,
        // detect touch for browser
        isTouch: !!navigator.userAgent.match(/AppleWebkit.*Mobile.*/)
            || (("ontouchend" in d) && !(/hp-tablet/).test(u) ) 
            || (w.DocumentTouch && d instanceof DocumentTouch) 
            || w.PointerEvent 
            || w.MSPointerEvent,
        isIOS:/iphone|ipad|ipod/.test(u),
        isAndroid:/android/.test(u),
        isBB:/blackberry/.test(u) || /BB[\d]+;.+\sMobile\s/.test(navigator.userAgent)
    },v=function(k,s){
        s=u.split(s)[1].split('.');
        return k + (b.ver=parseFloat((s.length>0 && isFinite(s[1]))?(s[0]+'.'+s[1]):s[0]))
    };
   // for new device
    if(w.matchMedia && typeof w.matchMedia=='function'){
        // detect touch for device
        b.isTouch = w.matchMedia('(any-pointer: coarse)').matches;
        b.deviceType = b.isTouch 
            ? ( 
                (w.matchMedia('(any-hover: hover)').matches || w.matchMedia('(any-pointer: fine)').matches) 
                    ? 'hybrid'
                    : 'touchOnly'
            ) 
            : 'mouseOnly';
    }else{
        b.deviceType = b.isTouch ? 'touchOnly' : 'mouseOnly';
    }

    xui.$secureUrl=b.isSecure&&b.ie?'javascript:""':'about:blank';

    xui.filter(b,function(o){return !!o});
    if(b.newie){
        b["newie"+(b.ver=dm)]=true;
        b.cssTag1="-ms-";
        b.cssTag2="ms";
    }else if(b.ie){
        // IE 8+
        if(xui.isNumb(dm))
            b["ie"+(b.ver=dm)]=true;
        else
            b[v('ie','msie ')]=true;
        if(b.ie6){
            //ex funs for ie6
            try {document.execCommand('BackgroundImageCache', false, true)}catch(e){}
            w.XMLHttpRequest = function(){return new ActiveXObject("Msxml2.XMLHTTP")};
        }
        if(b.ie6||b.ie7)b.ie67=1;
        if(b.ie6||b.ie7||b.ie8)b.ie678=1;
        b.cssTag1="-ms-";
        b.cssTag2="ms";
    }else if(b.gek){
        b[v('gek',/.+\//)]=true;
        b.cssTag1="-moz-";
        b.cssTag2="Moz";
    }else if(b.opr){
        b[v('opr','opera/')]=true;
        b.cssTag1="-o-";
        b.cssTag2="O";
    }else if(b.kde){
        b[v('kde','webkit/')]=true;
        if(b.isSafari){
           if(/applewebkit\/4/.test(u))
                b["safari"+(b.ver=2)]=true;
           else
                b[v('safari','version/')]=true;
        }else if(b.isChrome)
            b[v('chrome','chrome/')]=true;

        if(b.isWebKit){
            b.cssTag1="-webkit-";
            b.cssTag2="Webkit";
        }else{
            b.cssTag1="-khtml-";
            b.cssTag2="Khtml";
        }
    }
    // BB 6/7 is AppleWebKit
    if(b.isBB && !b.ver){
        // BB 4.2 to 5.0
        b.ver=parseFloat(ua.split("/")[1].substring(0, 3));
        b["bb"+b.ver]=true;
    }

    b.contentBox = function(n){
        return (b.ie||b.opr) ?
                !/BackCompat|QuirksMode/.test(d.compatMode) :
                (n = (n=n||d.documentElement).style["-moz-box-sizing"] || n.style["box-sizing"]) ? (n=="content-box") : true;
    }();

    var ini=xui.ini={};
    //special var
    if(window.xui_ini)
        xui.merge(ini,window.xui_ini);

    if(!ini.path){
        var s,arr = document.getElementsByTagName('script'), reg = /js\/xui(-[\w]+)?\.js$/,l=arr.length;
        while(--l>=0){
            s=arr[l].src;
            if(s.match(reg)){
                ini.path = s.replace(reg,'').replace(/\(/g,"%28").replace(/\)/g,"%29");
                break;
            }
        }
    }
    xui.merge(ini,{
        appPath:location.href.split('?')[0].replace(/[^\\\/]+$/,''),
        dummy_tag:'$_dummy_$'
    },'without');
    if(!ini.path) ini.path=ini.appPath+'/xui/';
    if(!ini.basePath)ini.basePath=ini.path.replace(/xui\/$/,"").replace(/runtime\/$/,"");
    ini.releasePath=ini.appPath;
    if(ini.verPath)ini.releasePath+=(ini.verPath?(ini.verPath+"/"):"")+(ini.ver?(ini.ver+"/"):"");

    var data = new Image();
    data.onload = data.onerror = function(){
        var path=xui.ini.path+"appearance/_oldbrowser/";
        if(this.width != 1 || this.height != 1){
            document.documentElement.className += " xui-nodatauri";
            xui.merge(xui.ini,{
                img_dd: path+'ondrag.gif',
                img_busy: path+'busy.gif',
                img_icon: path+'icon.png',
                img_pic: path+'picture.png',
                img_handler: path+'handler.gif',
                img_bg: path+'bg.gif',
                img_blank: path+'bg.gif'
            },'without');
        }
        data.onload = data.onerror = null;
    };
    data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    xui.merge(xui.ini,{
        img_dd:     "data:image/gif;base64,R0lGODlhEABAAPcAAAAAAAEBAQICAgMDAwUFBAUFBQcHBwgICAkJCQwMDA8PDx4eHiQkJDAwMD8/P0JCQl1dXf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQAEAAAAj/AP8JHPigQQMHAxMOTAAAgIABAgAkUPgPQsMABAoQCNAQAISEFw0cMMCxI4CFAAIY+Eey4b+LCgSmXCnzpECVBf49AEBgJEWVBwg8WCCgQMuEQEkuYDBgo8uBIlsyeCCgJMWWAB68fPpP5cCOAhm6TLpV4teQI0tyrTgzrcmPChNoVIuAYsKCB+3qtQsgQt+/fgPb/Ce4MOCvEfb6HbhYb1/Eigc35ptYZmW7kw1rRgy48+S9oEOLHk26tGnRnlMzTl0Yst7Mgyk+tnzWpO3JfSPo3q274eXcfjv21rxbeHDBwE32VphbeHPmvYEvBzmc9+eXxa3Hxm69OHPbtk2zNO68WvNh2q8lb6fuuix434Ola5/Nvbt53tLhH8/unXpw49vlhx90/E2HmH3XyTcgSO91FBAAOw==",
        img_busy:  "data:image/gif;base64,R0lGODlhEAAQAOMAAAQCBHx+fLy+vOTm5ERCRMTGxISGhAQGBISChMTCxOzq7FRSVMzKzP7+/gAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCQANACwAAAAAEAAQAAAESrDJSau9OOvNe1VFonCFIBRcIiQJp7BjNySDxRjMNAQBUk+FAwCAaiR6gURhsUgYhgCEZIDgDRYEwqIALTZmNay2UTB4KwKmwBIBACH5BAkJAA8ALAAAAAAQABAAgwQCBHx+fLy+vERCRKSmpOTi5BQWFNTW1KyurIyKjMTCxERGRPTy9BwaHLSytP7+/gRE8MlJq7046827n47RIJwBAEZ5phsikg9TMNZBHBMj7PR0DEDco7ATFA6JhA04IEh0AgUjEQgomcLY7EG1PmzZClJpiQAAIfkECQkADQAsAAAAABAAEAAABEewyUmrtcywWxn4BTcZH4CIUlGGaFMYbOsuSywuBLHIuC4LNEFrkBjIBoEAwmhRFBKKRDKQuBQEgsIAoWRWEoJEleitRKGWCAAh+QQJCQAPACwAAAAAEAAQAIMEAgR8fny8vrxEQkSkpqTk4uQUFhTU1tSsrqyMiozEwsRERkT08vQcGhy0srT+/v4ERfDJ6UxDM2sDgHkHcWgT5x1DOpKIhRDpQJAaqtK1iJNHkqy7RyIQSAQlw+IR5APiGAXGkiGoSoOFqqBwpAoU1yA0vJxEAAAh+QQJCQANACwAAAAAEAAQAAAES7DJWdYqMzdmWFsEsTRDMkwMoFbhMgQBcjaGCiCCJQhwkEgFG2YyQMRmjYJhmCkhNVBFoqCAQgu7nzWTECS0W4k0UQ2bz+i0en2OAAAh+QQJCQAPACwAAAAAEAAQAIMEAgR8fny8vrxEQkSkpqTk4uQUFhTU1tSsrqyMiozEwsRERkT08vQcGhy0srT+/v4ERfDJeVI6M79DcApB8jAFQy3DUIEJI7zmQ6RDZx3FKxTSQWMTl0AR23Q0o5LEYWggkEgDAGCAaqRUawbRfGq/4LB4TC5DIwAh+QQJCQANACwAAAAAEAAQAAAER7DJqUpSM7eRRkuCUGjSgAQIJyQJ+QXwxWLkAKeuxnm5VCyLVk+yIBAWQ6IRmRQABclJwcCIMg4AwGhoyAIQyYJ3O5ySo9EIACH5BAkJAA8ALAAAAAAQABAAgwQCBHx+fLy+vERCRKSmpOTi5BQWFNTW1KyurIyKjMTCxERGRPTy9BwaHLSytP7+/gRG8MlJ62SFWcuE19tUeEIRXp4Cng+2hkeSHKyUBEFSP3e+x7Od5ECg1Q6LwcB4IigHBETD4NgcngcDAGCAFR9a7g5hMCAsEQA7",
        img_icon:   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACmwAAApsBm2pmsgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJgSURBVDiNZZNfSNNRFMc/s8gaizkXgrM2sicFIVJ7Cx82qsmaxAz7I/5QEyGGfxiWaJCRT1rQQxkR1KPQU5CWShiYuAedPtSmsOeI3GJsut0X3elhbv5W53Lhcrif7+V87zkGESEf1QaD4wq8scKpDZieFZkEMLgNGufpYpcdlhmUDYkWIBEpbB9MZUEEJAxpN4zjxs8SCeRg3eatnjmKLlLwaxc4CdSC8YKDoYUA2f1LHAdgD1Ck9Aw2G3afjxdOJyNAWRcsKpBXdsTyqfCusI8QYA0rNpzOEVpbX2Kz2entZS6bRVIpRNNYAKwN1WxZZovhEz38xMIZNG2eVErIZgW/f4HRUdbzJSmFtLWzzkddzftIYzvyrYRMWVNTGKUODRgbC9HczFA4TFovcq2LOIkc3NCObJfkjH1vNKpjExNxRIRIRNHS8gARwe1m/D+RbmL0sXrjCMvJg5/Ji5QODMTwep9ILivgpqf2Dr9//EDpRTo6WKSz80uF1/snoRNZhbQXHuV66Cq3WCKOILV9xPMiiQRScdcbQylBKflXJAzpFhiEYb4WDMsiddeJrqyQLsB5w0KhdGNl5abSiTyGNbjHBwRhD+E+K1g4XdrR9r0IDoeVw1MXAcq7YHEHJAvihzlwcBYf7/DwHCOVdHd/LoIjEeX018SVQjSNeaDsMjz0wVQ12ItmAZdrmGTyMLG1lbmo1cTzV5JJxOViWM+UFPW12VyFyZQ7R6MZAoGn1u3N15EIGQCTCcxmqvRI0TARDE7Q33+O8vIKQqFpmZl5BuDxGBL19dyMx4kFg0zqkb+vwqjwTYPW6AAAAABJRU5ErkJggg==",
        img_pic:    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAJOgAACToB8GSSSgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAA92SURBVHiczZt7fFTlmce/ZzKT66S5cQsChUC4yKVsFaEUYlAWi4ClfqTq6tYVrfVSy1W01roudPWj4H6ga6ygu3SpZdeu0iKIgLFoIZREBAIGSDDhHkLIhMncJzNz3v3jPScZkklyzkzYT5/5vJ9J5pzznvf3O8/7vM/zvM9RhBAkIoqiWAALYNNaMpCkHY4AIaBV+1aFEGpCN+xlURIhQAOfBKQCGUAmkI4kQUEC9wEewAv4gfDfEgnWeC9UFEVBPvk04BtAXyAXSUKqdloQCf4q4ABaAK+iKKG/FRLiJgAJPgUJuL/W+gHpAyBTBdEon74PqR2p2v0UJAmtZkjQCL9GRKLzlzgJiHr6KUAWkJMPgyfB8BkwdDjkW4DTcGU31B6D+jNgsUJSWF6nAJ6eSFAURcFJAWl8Cz9ZOKliPcd5iSAgFEVRkTzETURcNkCb+8lIlc8fDeN/CjO/D7f2gb5WsGoGIOSCli1QthEOfgE1yKlwCWhCTo+Y00HxKzeQyjsofO+aAxHqqWIR32I30rCGgEjcJAghTDek4csAhoyHO7fCe5ehQYCI1a6C869w8LvwPHA3UAwUAnlILbJc07+fIgTNiG4+VfwKyEfaH1vHPow2S1ysSVFSIHk2DJoKk/tJGxBTsiFrLIx6FeYXwY0a8IFIDbIDNk2rUAJKEal8BOR0e/fRrOBFpml9pANJsexET5IIAaIAlHtgUhbc0NPJmWCfCDe+Bt+fBqOJRYJTmaGBtxsYuY0fsRgYgLRDKYDFLAnxrgIqEJ4MDIZh1nbHp1vJgIwbYczLoD4P7IOTbQcrmEo2mzECXpc+FCI1L4D0MVq1sRmWRDQgMhWUTKmqhg1QJmRMhLFr4AdFuia8zmxu4j3MgJed5ZJEDlID0mlfZg1LXARoFlf9IzS0QoUwyXomZIyD0f8Kdw1/jNn8jNewkGZ6IE04iJBKu/dpSBOjJW5HSAihblCUsApVQi5pA8xcnwEZzmLGX1jLzVjj1MRTnEc+xCTa/YvrrwG6PCaEbyNsjMABs9d+VgT3bSctmBbnGAIEeJrdyIArrH2rmJiOkCABABUQcMEqAYeNXrPnVpi7A7wZcd9WsJZtHMaBNH5eZNxhPr4w6Pjorm90U9A8yR2Qch5GhOFAV86Q3v58KyLD062L09NH5U22ASuAx4F5wASgD9IOWLoab0xs3QH3+xkaibAyHOajcJjyQIC3Gxq4H2l0UpA2xAIo68HWBLcI+Or/AfxzwJPAAmAKMBiw4/PdQzi8nnC4nFBoB17vy3z++RhkIKYbScUQAeEwjwqBK9Zht5udK1cyFumGpugdb4P0Bhgfhr2dwBf3Avg3+Aj4OfAUcC8wDRjOW28VEgp9GBNIJOKhpmY50vHKoIPb3BX4BT3NDL+fc88+yzRkHqBtDV4ASZdgrArHosGnexME/zp/BlYCi4D7gOnACDZtGkckUtvjPC4tXappSpY+VWIS4HKRJwSXjcQSXi8XnniCmcigxK6TsB/SHDAlDOW9An4VB4H1wEvAo8BtwCg2bhxvCLwQgkDAye23/z0wlPYASon19P/BTEDl8XDxkUf4HjIeaCNhPdiKt/Ngqp9IvNAVFfHtxTj7wi7gbeBfgPuBSaxZc5Nh8Hr77W//DbhFG2s6YOlk7UMhXjdDgGYT6hcuZPY1JPi5HUHcz15REXOfQPwSgj+Guhvgv4EXgAd46KE5tLaeNjdKIfjss13AbGAM0oW3dvIDhCCl4289id1O/rp1/MfChUwAsjjGHVj5EEG62b4AFAFznoLv/gb6Q/IUyF8KE8dCDsXFfSkp2YDNNjSOrlOR6m9HWxU6usKKz8eRrCzzPesk1Exl3b5s/pkAaaSirQ/G+4kGn4lc3AdCagZ8c1BGxm0PvP/+4HBGRp75EQJHjtQjV60UtNWgkwYcPkypquKJp3+7nfxt97JsSCM+WpBBagTDzmkX4BkADIW0GV7viIfWrPEY7zFKgsEgGzee6vR7RxsApNTVscysHYhuzS6uDDlIMxcQuBGEEKjG5vwrIN4A8T8g/gKiBoQDRABECMQVcP9oxYpzCKGaGtWvf/1HYAnSiN6i8ZoSiwAbkFNfz5ZESHC00DSkAqcREoyAj2gtAKIWPD945pkLhknYt+8Q8CzwE2AuMBZpBG2dzkXO2vTsbL555gzbEyHhylWah5TT0h0JRsGrWguBaAFRCd55y5df6pGEsrJDWK3PA08jvcepSIcoHUiKRYCuBdmZmYyqrWXHdSRBvW0RLiPgda8yAiIIohnEIfDOWb68vksSysoOa+AXAQ/Qno3OpitHSCNB3/ToY7dz49dfs/M6kKAm/Ts7RsO6lVBrBHw0CQHtvEPgmRNLE/bu/Qqr9UVgMfAgcDsyBdeHqFR8l6PWSEgF+trtjO1lElTeYCvwnAWevgWW7oQ6I+CF9ns0CV+Cb240CXv21GC1rkFGjf8EzESm4/tqmNqCoS53hqK2v2xApt1O/8pKXi8oYFb3603X0uTk6k3VJJ3bSynPsB+ZzHDkgWMp5D4MP8+BiTbaA/quRGgthMyGnAHfi8uXt5TOmhUMzp69i0jEC9QDtfIwl5Cbs/o2fdtTjn0DeYKqXeD2eLg8+k/8/vOzVMVLQJ9scg6PJPSdLRxBbos5gAYHnF29cmX1iOZmb/WoUcf0/FZ3LoSe/LMhY9yhkL5qzZqsV2fN8g2JRNKQGaIQ0hvxaf9HosHrQLtt2n2SqGEml/FYqojsqeN4ItPh6lUai4tZBMwCxrJ69TgikWqEECk+X8P+wsJTzSC8mtXvaip0nA7NII6C9zdQWQjrkEmTecB4pPp33oYzMmLc3EoYN34EjQhLFZHSU9QkQkJLCw3z53M/jz46ndbWU9FHrR5P45ZRo47Vg3CDaDVIQhCEC0QdeLbCl38no8cFQBFQgIwDrERlhXoGLzcq3agIwog2Er5C3X2S2kRIONgw6ARe75lYR60uV9N7I0acO6+BMkpCSCPCAe49cGCKdIDmAZOQnnU6PWWE2g6GmK4tXEJLTXQm4QR18YCvduW3pLQ0NnZ3ltXpbN40cmS1URJ0IvTWAq59sL8IltG+DGYDth4J6AS+Iwm++Ek42ZLvSm6+5DBydpLL1fT7wsJaMyRENze4y2DvZHgYmT3ur9kCpUsC8DAAgaPL0CUBEk625LuSHfXNZvTF5nQ2by4sPK2T0JNhjFGfcOV92PRtmUobiKxriu0IAQoqW3rM2cQg4ZMeSIgHfLQmbBo58sR5zTCaJaERau6UgdAgjYDYGoCbvj2C75qESNkRjvU2eL31+fjj0r9C3SUQPs3oGSUgCIG9sGqcDITalsPOjpCNm7r1Zjp6I3q1kB3U3WwtnsTblZVURJ9W7cp3Twh/GW7Nze++6qM7KS+v8N111x9Ww6uX4ZBeCGA0M5IESf0hq0j+23bpNQQoiqKgkm1qYDoJ/8V2lrI/FCI4ZQolx49TBlDjzndNiBwKJQS+rOww06Z94AuF1K1wvgReCMFxM2khBUKZQKHcSA3rv3fWgEYqTQ/wbT7iCcqQvr0zEODS5Mm8uK1q2M4JHA205gzINd2nPvD9ZUcoLv6AcDgI+CLgKYW6Y/AzAUdMdBWKwL4T0CI0gVgEzKSOCLWGu32HHfyEfYCb9hK4i56HnvLfVVA1OpjZp5+JQV4jeeU7zj6/s2jQ4PxwCjKQcQCO0+BYCxUn4F4VvjDQlVBlUHR+vRC+a490XAHAxiFmIwxsaLzDDmTI+VNktqUIGMnq1eMIhWoSMXh55TvO/OplS2TtWsRbb3F54kQeQ26EDkGmtZNeAqsXJgm5IRvqwgCqETjph0diLvkxlsEkIJOj/JIwgZjAAwRYwwdIN/Mp5F5dEVBISckYPbDpDfC/+x2itBRRUUH9vHnMR25tZaFldE5BihOGqfC+KmsVVc0jjKgQUOFkCJa9BNZYt+uUD4iqAs1mCZN5jEX0YwzZ9OUKTZziPMsppZwmZCjuABqABkpKrDz++J+wWEYaU/LOklfx8dkln84dbE9XLXl5kJ8vW9++ANQvXszCzZupApxoiXchhLisKBm5cE8STFJk4OMX8JkKR6xC7O3qfrEIUDQtSEPW8A0A+pNEjlaQlISMq/3aIK4AjZSUJCcM/uDOs0s+mRMTfGYm2Gzg83HhySdZ+O67HIf23QchhEBRrC2QaYPUdAhfhdYcIVq6u2fMjJBGghUZOWXBNaVoOgFebQBOXnnFyooVH19v8BYLKAq43Vz44Q/5x507OYV8CEHirBfuLiWmV1+lILUhTfvbgiRAfxkiQCj0n1itC+IBDpB3cNe5JZ/cOcierlpyc2HgwK7B61JXx1+GD2cRcBn5IIJ0zPYYkO5SYirSYfBrN2hCLnH1yDnfBLjweot7E3z0k7fbY4MHKCigqKSEecgsbwZxFElCD1ViGpt6XlAvR/Vp3wEgRHLyDLM3bZMDByoXbLzTEQ1+4MB28MnJscHrMmEC30Gmutpqhc0OoccLRLuoQohIVJMlaYoy3uxNASgvr2T69P99Z4O62e3mC7PgAQYMYCjSPn0DLd1tdhiJ1gkqqGqz6avKyyuZNu0PhMPecBjHqlWsDoX43Ax4gJYWAkj1z6C9WMuUJFwoSSh0zNT5UeCBZqC+tZVz993Hc01NfGoUPEB1NQ20v65nshJBSuIE7Nu3GVV1Gjq3vPxoR/DAReCiy8WFqVNZdvYsnxoB7/fjf+01vkSGtaZLZHVJnIA77rhEdfULPZ5XXn6UoqJo8PqKcgW5ljudThpuvpklp0/zaU/drVvH9spKmpHGWN8EuT6lsl012jdnctm162n8/s6JzmAwyJtvfojF8hxyi/pB2vfq+iH9C6vW0oB+ycmM3bWLdaEQ/o63dblw/eIXvAs8A/wYmIPc788lKttrtCX05ii0OUypQC7Tp4/i4YdnM2zYOBQlnaNH69m06WsOHtSLmp1AI+1+hJtr3/LQ45BMoM/8+Yy7+25mFBQwyuuFQ4eo37CB6tOncdO+tXYRqUnNQECYfCGzNwjQ3eY05JLUD+mc6GW0oO0vaoNs0r69aOB17y1qQzYZadlztb70N1JtWn9BwKX11Yh8M1V/LdcUoETeHAWkn6Aoih4cgfQePciYPZoAD5IEN9KZCtPBddX6UmnXighyjrdo/UUT4EGS4Nbu3buxgOmO2qPIZK3p1eQKEmyrNvBWtI3frgas9RXdX4r2bUVa+3BUX60k8OJkrxEAnQau1+mDfJptzehgo6ZEdIvur1sijcj/AcgCrHU5y1W7AAAAAElFTkSuQmCC",
        img_handler:"data:image/gif;base64,R0lGODlhBAAEAPcAAAAAAGSMtP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAEAAQAAAgPAP8JFCDwX4B/BAUe/BcQADs=",
        // transparent 1*1 gif and png
        img_bg:     data.src,
        img_blank: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII="
    },'without');

    //for dom ready
    var f = xui._domReadyFuns= function(){
        if(!xui.isDomReady){
            if(d.addEventListener ) {
              d.removeEventListener("DOMContentLoaded", f, false );
              w.removeEventListener("load", f, false );
            } else if(d.detachEvent){
              d.detachEvent("onreadystatechange", f);
              w.detachEvent("onload", f);
            }

            // adjust touchonly again
            if(xui.browser.deviceType != 'touchOnly' && !xui.Dom.getScrollBarSize()){
                xui.browser.deviceType = 'touchOnly';
                if(xui.UI){
                    var f2=function(c){
                        xui.arr.each(c,function(key){
                            if(key=xui.SC.get(key)){
                                if(key.$DataModel.overflow){
                                    key.$DataModel.overflow.ini='auto';
                                    key.$DataStruct.overflow='auto';
                                }
                                if(key.$children && key.$children.length)f2(key.$children);
                            }
                        });
                    };
                    f2(xui.UI.$children);
                }
            }
        }

        try{
            if(xui.ini.customStyle&&!xui.isEmpty(xui.ini.customStyle)){
                var arr=[],style=xui.ini.customStyle,txt;
                xui.each(style,function(v,k){arr.push(k+" : "+v+";")});
                txt=".xui-custom{\r\n"+arr.join("\r\n")+"\r\n}";
                xui.CSS.addStyleSheet(txt,"xui:css:custom",1);
            };
            for(var i=0,l=xui._m.length;i<l;i++)
                xui.tryF(xui._m[i])
            xui._m.length=0;
            xui.isDomReady=true;
        }catch(e){
            xui.asyRun(function(){throw e})
        }
    };

    if (d.addEventListener){
        d.addEventListener("DOMContentLoaded", f, false);
        w.addEventListener("load", f, false);
    }
    //IE<=10
    else{
    d.attachEvent("onreadystatechange", f);
        w.attachEvent("onload", f);

        (function(){
            if(xui.isDomReady)return;
            try{
                //for ie7 iframe(doScroll is always ok)
                d.activeElement.id;
                d.documentElement.doScroll('left');f()
            }catch(e){xui.setTimeout(arguments.callee,9)}
        })();
    }

    // to ensure
    (function(){((!xui.isDomReady)&&((!d.readyState)||/in/.test(d.readyState)))?xui.setTimeout(arguments.callee,9):f()})();
};

// for loction url info
new function(){
    xui._uriReg=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/;
    xui._localReg=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/;
    xui._curHref=(function(a){
        try{return location.href;}catch(e){
            a=document.createElement("a");
            a.href="";
            return a.href;
        }})(),
    xui._localParts=xui._uriReg.exec(xui._curHref.toLowerCase())||[];
};

new function(){
    xui.pseudocode={
        exec:function(conf, args, scope, temp, resume){
           var  t,m,n,p,k,type=conf.type||"other",
                _ns={
                    "temp":temp,
                    "page":scope,
                    "args":args,
                    "global":xui.$cache.data
                },
                comparevars=function(x,y,s){
                    switch(xui.str.trim(s)){
                        case '=':
                            return x===y;
                        case '<>':
                        case '!=':
                            return x!==y;
                        case 'empty':
                            return xui.isEmpty(x);
                        case 'non-empty':
                            return !xui.isEmpty(x);
                        case '>':
                            return parseFloat(x)>parseFloat(y);
                        case '<':
                            return parseFloat(x)<parseFloat(y);
                        case '>=':
                            return parseFloat(x)>=parseFloat(y);
                        case '<=':
                            return parseFloat(x)<=parseFloat(y);
                        case 'include':
                            return (x+"").indexOf(y+"")!=-1;
                        case 'exclude':
                            return (x+"").indexOf(y+"")==-1;
                        case 'begin':
                            return (x+"").indexOf(y+"")===0;
                        case 'end':
                            return (x+"").indexOf(y+"")===(x+"").length-(y+"").length;
                        case "objhaskey":
                            return typeof(x)=="object"?(y in x):false;
                        case "objnokey":
                            return typeof(x)=="object"?!(y in x):false;
                        case "arrhasvalue":
                            return xui.isArr(x)?xui.arr.indexOf(x,y)!==-1:false;
                        case "arrnovalue":
                            return xui.isArr(x)?xui.arr.indexOf(x,y)==-1:false;
                        case "objarrhaskey":
                            return xui.isArr(x)?xui.arr.subIndexOf(x,'id',y)!==-1:false;                        
                        case "objarrnokey":
                            return xui.isArr(x)?xui.arr.subIndexOf(x,'id',y)==-1:false;                        
                        default:
                            return false;
                    }
                },
                adjustparam=function(o){
                    if(typeof(o)=="string"){
                        var rpc;
                        if(xui.str.startWith(o,"[data]")){
                            o=o.replace("[data]","");
                            rpc=1;
                        }
                        o=xui.adjustVar(o, _ns);
                        // for file
                        if(rpc && typeof(o)=="string")
                            o=xui.unserialize(xui.getFileSync(o));
                    }else if(xui.isHash(o)){
                        // one layer
                        for(var i in o)o[i]=adjustparam(o[i]);
                    }else if(xui.isArr(o)){
                        // one layer
                        for(var i=0,l=o.length;i<l;i++)o[i]=adjustparam(o[i]);
                    }
                    return o;
                },
                target=conf.target,
                method=(conf.method+"").split("-")[0],
                iparams=xui.clone(conf.params)||[],
                conditions=conf.conditions||[],
                adjust=conf.adjust||null,
                iconditions=[],
                timeout=xui.isSet(conf.timeout)?parseInt(conf.timeout,10):null;
            // handle conditions
            // currently, support and only
            // TODO: complex conditions
            for(var i=0,l=conditions.length;i<l;i++){
                if(!comparevars(xui.adjustVar(conditions[i].left, _ns),xui.adjustVar(conditions[i].right, _ns),conditions[i].symbol)){
                    if(typeof resume=="function")resume();
                    return;
                }
            }
            if(target && method && target!="none"&&method!="none"){   
                //adjust params
                for(var i=(type=="other" && target=="callback")?method=="call"?1:method=="set"?2:0:0,l=iparams.length;i<l;i++)
                    iparams[i]=adjustparam(iparams[i]);
                // cover with inline params
                if(method.indexOf("-")!=-1){
                    t=method.split("-");
                    method=t[0];
                    for(var i=1,l=t.length;i<l;i++)
                        if(t[i])iparams[i-1]=t[i];
                }
                var fun=function(){
                    switch(type){
                        case 'page':
                            // handle switch
                            if(method=="switch"){
                                if(!xui.History._callback){
                                    xui.History.setCallback(function(fi,init){
                                       if(init)return;
                                       var ar=xui.urlDecode(fi||"");
                                       if(!ar.xuicom){
                                            ar.xuicom="App";
                                            ar.cache=true;
                                        }
                                        // get root only
                                        xui('body').children().each(function(xid){
                                            var module=xui.Module.getFromDom(xid);
                                            if(module && module._showed){
                                                if(ar.cache)module.hide();else module.destroy();
                                            }
                                        });   
                                        xui.showModule(ar.xuimodule);
                                    });
                                }
                                
                                var fi="xuimodule="+target;
                                if(iparams[0])fi+="&cache="+(iparams[0]?true:false);
                                xui.History.setFI(fi);
                                return;
                            }
                            // try to get module
                            var cls=xui.get(window,target.split(".")),ins;
                            // get first one
                            if(cls)for(var i in cls._pool){ins=cls._pool[i];break;}

                            // handle hide / destroy
                            if(method=="show"||method=="pop"){
                                // special for xui.Module.show
                                iparams.unshift(function(err,module){
                                    if(method=="pop" && !err){
                                        t=module.getUIComponents(true);
                                        if((t=t.getRoot())&&(t=t.get(0)))
                                            xui(t).pop(iparams[1]||_ns.args[0]);
                                    }
                                });
                                // handle other methods
                                var ff=function(err,ins){
                                    if(err)return;
                                    if(xui.isFun(t=ins.show))t.apply(ins, iparams);
                                };
                                if(!ins)xui.getModule(target,ff);  else ff(null, ins);
                            }else{
                                if(ins && xui.isFun(t=xui.get(ins,[method])))t.apply(ins,iparams)
                                return;
                            }
                            break;
                        case 'control':
                        case 'module':
                            if(method=="pop"){
                                 t=xui.get(scope,[target]);
                                 if((t=t.getRoot())&&(t=t.get(0)))
                                    xui(t).pop(iparams[1]||_ns.args[0]);
                            }else{
                                if(method=="setProperties"){
                                    if(m=iparams[0]){
                                        if(m.CA){
                                            if(xui.isFun(t=xui.get(scope,[target,"setCustomAttr"])))t.apply(scope[target],[m.CA]);
                                            delete m.CA;
                                        }
                                        if(m.CC){
                                            if(xui.isFun(t=xui.get(scope,[target,"setCustomClass"])))t.apply(scope[target],[m.CC]);
                                            delete m.CC;
                                        }
                                        if(m.CS){
                                            if(xui.isFun(t=xui.get(scope,[target,"setCustomStyle"])))t.apply(scope[target],[m.CS]);
                                            delete m.CS;
                                        }
                                    }
                                }
                                if(xui.isFun(t=xui.get(scope,[target,method])))t.apply(scope[target],iparams);
                            }
                            break;
                        case 'other':
                            switch(target){
                                case 'url':
                                    switch(method){
                                        case "close":
                                            window.close();
                                            break;
                                        case "open":
                                            window.open(iparams[0],iparams[1],iparams[2],iparams[3]);
                                            break;
                                        case "mailTo":
                                            xui.mailTo.apply(xui,iparams);
                                            break;
                                    }
                                break;
                                case 'msg':
                                    if(method=="busy"||method=="free"){
                                        if(xui.isFun(t=xui.get(xui.Dom,[method])))t.apply(xui.Dom,iparams);
                                    }else if(method=="console" && xui.isDefined(window.console) && (typeof console.log=="function"))console.log.apply(console,iparams);
                                     else if(xui.isFun(t=xui.get(xui,[method]))) t.apply(xui,iparams);
                                break;
                                case "var":
                                    if(method=="cookie"){
                                        xui.$cache.data.Cookies=xui.Cookies.get();
                                    }else if(iparams[0].length){
                                        if(adjust){
                                            switch(adjust){
                                                case "serialize":
                                                    iparams[1]=xui.serialize(iparams[1]);
                                                break;
                                                case "unserialize":
                                                    iparams[1]=xui.unserialize(iparams[1]);
                                                break;
                                                case "stringify":
                                                    iparams[1]=xui.stringify(iparams[1]);
                                                break;
                                                default:
                                                    if(typeof(adjust=xui.get(adjust))=="function")
                                                        iparams[1]=adjust(iparams[1]);
                                                break;
                                            }
                                        }
                                        xui.set(_ns, (method+"."+xui.str.trim(iparams[0])).split(/\s*\.\s*/), iparams[1]);
                                    }
                                break;
                                case "callback":
                                    switch(method){
                                        case "set":
                                            t=iparams[1];
                                            if(xui.isStr(t)&&/[\w\.\s*]+\(\s*\)\s*\}$/.test(t)){
                                                t=t.split(/\s*\.\s*/);
                                                m=t.pop().replace(/[()}\s]/g,'');
                                                t=xui.adjustVar(t.join(".")+"}", _ns);
                                                if(t && xui.isFun(t[m]))
                                                    xui.$cache.callback[iparams[0]]=[t,m];
                                            }
                                            break;
                                        case "call":
                                            var args=iparams.slice(3), doit;
                                            t=iparams[0];
                                            if(xui.isStr(t)&&/[\w\.\s*]+\(\s*\)\s*\}$/.test(t)){
                                                t=t.split(/\s*\.\s*/);
                                                m=t.pop().replace(/[()}\s]/g,'');
                                                t=t.join(".")+"}";
                                                t=xui.adjustVar(t, _ns) || xui.adjustVar(t);
                                                doit=t&&t[m]&&xui.isFun(t[m]);
                                            }else if(xui.isStr(t=iparams[0])&&xui.isFun((n=xui.$cache.callback[t])&&(t=n[0])&&t&&(t[m=n[1]]))){
                                                doit=1;
                                            }
                                            if(doit){
                                                t=t[m].apply(t,args);
                                                if(iparams[1]&&iparams[2]&&xui.get(_ns,iparams[1].split(/\s*\.\s*/)))xui.set(_ns, (iparams[1]+"."+iparams[2]).split(/\s*\.\s*/), t);
                                           }
                                           break;
                                     }
                                break;
                            }
                            break;
                    }
                };
                // asy
                if(timeout!==null)xui.asyRun(fun,timeout);
                else fun();
            }
            return conf["return"];
        }/*,
        toCode:function(conf, args, scope,temp){
        }*/
    };
};

/*serialize/unserialize
*/
new function(){
    var M ={
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '\"' : '\\"',
            '\\': '\\\\',
            '/': '\\/',
            '\x0B': '\\u000b'
        },
        H={'@window':'window','@this':'this'},
        // A1/A2 for avoiding IE's lastIndex problem
        A1=/\uffff/.test('\uffff') ? /[\\\"\x00-\x1f\x7f-\uffff]/ : /[\\\"\x00-\x1f\x7f-\xff]/,
        A2=/\uffff/.test('\uffff') ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g,
        D=/^(-\d+|\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?((?:[+-](\d{2})(\d{2}))|Z)?$/,
        E=function(t,i,a,v,m,n,p){
            for(i in t)
                if((a=typeof (v=t[i]))=='string' && (v=D.exec(v))){
                    m=v[8]&&v[8].charAt(0);
                    if(m!='Z')n=(m=='-'?-1:1)*((+v[9]||0)*60)+(+v[10]||0);
                    else n=0;
                    m=new Date(+v[1],+v[2]-1,+v[3],+v[4],+v[5],+v[6],+v[7]||0);
                    n+=m.getTimezoneOffset();
                    if(n)m.setTime(m.getTime()+n*60000);
                    t[i]=m;
                }else if(a=='object' && t[i] && (xui.isObj(t[i]) || xui.isArr(t[i]))) E(t[i]);
            return t;
        },

        F='function',
        N='number',
        L='boolean',
        S='string',
        O='object',
        T={},
        PS=function(v,n){return ("000"+(v||0)).slice(-n)},
        Z=(function(a,b){a=-(new Date).getTimezoneOffset()/60; b=a>0?'+':'-'; a=''+Math.abs(a); return b+(a.length==1?'0':'')+a+'00'})();

    T['undefined']=function(){return 'null'};
    T[L]=function(x){return String(x)};
    T[N]=function(x){return ((x||x===0)&&isFinite(x))?String(x):'null'};
    T[S]=function(x){
        return H[x] ||
            '"' +
            (
            A1.test(x)
            ?
            x.replace(A2, function(a,b) {
                if(b=M[a])return b;
                return '\\u' + ((b=a.charCodeAt())<16?'000':b<256?'00':b<4096?'0':'')+b.toString(16)
            })
            :
            x
            )
            + '"'
    };
    T[O]=function(x,filter,dateformat,deep,max){
        var me=arguments.callee, map = me.map || (me.map={prototype:1,constructor:1,toString:1,valueOf:1,toLocaleString:1,propertyIsEnumerable:1,isPrototypeOf:1,hasOwnProperty:1});
        deep=deep||1;
        max=max||0;
        if(deep>xui.SERIALIZEMAXLAYER||max>xui.SERIALIZEMAXSIZE)return '"too much recursion!"';
        max++;
        if (x){
            var a=[], b=[], f, i, l, v;
            if(x===window)return "window";
            if(x===document)return "document";
            //for ie alien
            if((typeof x==O || typeof x==F) && !xui.isFun(x.constructor))
                return x.nodeType? "document.getElementById('"+x.id+"')" :"$alien";
            else if(xui.isArr(x)){
                a[0] = '[';
                l = x.length;
                for(i=0;i<l;++i){
                    if(typeof filter=='function' && false==filter.call(x,x[i],i))continue;
                    
                    if(xui.isNaN(v=x[i]))b[b.length]="NaN";
                    else if(xui.isNull(v))b[b.length]="null";
                    else if(!xui.isDefined(v))b[b.length]="undefined";
                    else if(f=T[typeof v]){
                        if(typeof (v=f(v,filter,dateformat,deep+1,max))==S)
                            b[b.length]=v;
                    }
                }
                a[2]=']';
            }else if(xui.isDate(x)){
                if(dateformat=='utc')
                    return '"'+ PS(x.getUTCFullYear(),4) + '-' +
                         PS(x.getUTCMonth() + 1,2) + '-' +
                         PS(x.getUTCDate(),2) + 'T' +
                         PS(x.getUTCHours(),2) + ':' +
                         PS(x.getUTCMinutes(),2) + ':' +
                         PS(x.getUTCSeconds(),2) + '.' +
                         PS(x.getUTCMilliseconds(),3)+
                         'Z"';
                else if(dateformat=='gmt')
                    return '"'+ PS(x.getFullYear(),4) + '-' +
                         PS(x.getMonth() + 1,2) + '-' +
                         PS(x.getDate(),2) + 'T' +
                         PS(x.getHours(),2) + ':' +
                         PS(x.getMinutes(),2) + ':' +
                         PS(x.getSeconds(),2) + '.' +
                         PS(x.getMilliseconds(),3)+
                         Z+'"';
                else
                    return 'new Date('+[x.getFullYear(),x.getMonth(),x.getDate(),x.getHours(),x.getMinutes(),x.getSeconds(),x.getMilliseconds()].join(',')+')';
            }else if(xui.isReg(x)){
                return String(x);
            }else{
                if(typeof x.serialize == F)
                    x = x.serialize();
                if(typeof x==O){
                    if(x.nodeType){
                        return "document.getElementById('"+x.id+"')";
                    }else{
                        a[0] = '{';
                        for(i in x){
                            if(map[i] ||
                                (filter===true?i.charAt(0)=='_':typeof filter=='function'?false===filter.call(x,x[i],i):0))
                                continue;
                            if(xui.isNaN(v=x[i]))b[b.length]=T.string(i) + ':' + "NaN";
                            else if(xui.isNull(v))b[b.length]=T.string(i) + ':' + "null";
                            else if(!xui.isDefined(v))b[b.length]=T.string(i) + ':' + "undefined";
                            else if (f=T[typeof v]){
                                if (typeof (v=f(v,filter,dateformat,deep+1,max))==S)
                                    b[b.length] = T.string(i) + ':' + v;
                            }
                        }
                        a[2]='}';
                    }
                }else return String(x);
            }
            a[1]=b.join(', ');
            return a[0]+a[1]+a[2];
        }
        return 'null'
    };
    T[F]=function(x){return x.$path?x.$path:String(x)};

    //serialize object to string (bool/string/number/array/hash/simple function)
    xui.serialize = function (obj,filter,dateformat){
        return xui.isNaN(obj) ? "NaN" : 
                    xui.isNull(obj) ? "null" : 
                    !xui.isDefined(obj) ? "undefined" :
                    T[typeof obj](obj,filter,dateformat||(xui&&xui.$dateFormat))||'';
    };
    xui.stringify = function(obj,filter,dateformat){
        return xui.fromUTF8(xui.serialize(obj,filter,dateformat));
    };
    // for safe global
    var safeW;
    //unserialize string to object
    xui.unserialize = function(str, dateformat){
        if(typeof str !="string")return str;
        if(!str)return false;
        try{
            if(!safeW){
                var ifr = document.createElement( xui.browser.ie && xui.browser.ver<9?"<iframe>":"iframe"),w;
                document.body.appendChild(ifr);
                w=frames[frames.length-1].window;
                safeW={};
                for(var i in w)safeW[i]=null;
                document.body.removeChild(ifr);                
            }
            str='({_:(function(){with(this){return '+str+'}}).call(safeW)})';
            str=eval(str);
            if(dateformat||(xui&&xui.$dateFormat))E(str);
            str=str._;
            return str;
        }catch(e){
            return false;
        }
    };
};

/*26 based id, some number id can crash opera9
*/
new function(){
    xui.id=function(){
        var self=this, me=arguments.callee;
        if(self.constructor!==me || self.a)
            return (me._ || (me._= new me)).next();
        self.a=[-1];
        self.b=[''];
        self.value='';
    };
    xui.id.prototype = {
        constructor:xui.id,
        _chars  :"abcdefghijklmnopqrstuvwxyz".split(''),
        next : function(i){
            with(this){
                i = (i||i===0)?i:b.length-1;
                var m,k,l;
                if((m=a[i]) >= 25){
                    m=0;
                    if(i===0){
                        a.splice(0,0,1);
                        b.splice(0,0,'a');
                        l=a.length;
                        for(k=1;k<l;++k){
                            a[k]=0;
                            b[k]='0';
                        }
                        ++i;
                    }else
                      next(i-1);
                }else ++m;
                a[i]=m;
                b[i]=_chars[m];
                return value = b.join('');
            }
        }
    };
};


// Some basic Classes

/*
*xui.Thread
*  Dependencies: _ ; Class ; xui
parameters:
id: id of this thread, if input null, thread will create a new id
tasks: [task,task,task ...] or [{},{},{} ...]
    task: function
    or
    {
      task,      //function
      args,      //args array for task
      scope,     //this object for task
      delay ,    //ms number
      callback   //function for callback
   }
delay:default delay time;
callback:default calback function;
onStart: on start function
onEnd: on end function
cycle: is the thread circular
*/
Class('xui.Thread',null,{
    Constructor:function(id, tasks, delay, callback, onStart, onEnd, cycle){
        var upper=arguments.callee.upper;
        if(upper)upper.call(this);
        upper=null;
        //for api call directly
        var self=this,me=arguments.callee,t=xui.$cache.thread;
        // xui.Thread() => self.constructor!==me
        // in an inner method => !!self.id is true
        if(self.constructor!==me || !!self.id)
            return new me(id, tasks, delay, callback, onStart, onEnd, cycle);

        if(typeof id!='string')id='$' + (self.constructor.$xid++);
        self.id=id;
        //thread profile
        self.profile = t[id] || (t[id] = {
            id:id,
            _start:false,
            time:0,
            _left:0,
            _asy:0.1,
            //sleep_flag:-1,
            index:0,

            tasks:tasks||[],
            delay: delay || 0,
            callback:callback,
            onStart:onStart,
            onEnd:onEnd,
            cache:{},
            status:"ini",
            cycle:!!cycle
        });
    },
    Instance:{
        _fun:xui.fun(),
        __gc:function(){
            var m=xui.$cache.thread,t=m[this.id];
            if(t){
                delete m[this.id];
                t.tasks.length=0;
                for(var i in t)t[i]=null;
            }
        },
        _task:function(){
            var self=this,p=self.profile;

            // maybe abort or no task
            if(!p||!p.status||!p.tasks)
                return;
            // reset the asy flag
            p._asy=0.1;

            var t={}, value=p.tasks[p.index],r,i,type=typeof value;

            //function
            if(type=='function') t.task=value;
            //hash
            else if(type=='object')
                for(i in value) t[i]=value[i];

            //default callback
            if(typeof t.callback!='function')
                t.callback=p.callback

            if(typeof t.task=='function'){
                t.args=t.args||[];
                //last arg is threadid
                t.args.push(p.id);
            }

            // to next pointer
            p.index++;
            p.time=xui.stamp();

            // the real task
            if(typeof t.task=='function'){
                r = xui.tryF(t.task, t.args || [p.id], t.scope||self, null);
            }

            // maybe abort called in abover task
            if(!p.status)
                return;

            // cache return value
            if(t.id)
                p.cache[t.id] = r;

            // if callback return false, stop.
            if(t.callback && false===xui.tryF(t.callback, [p.id], self, true))
                return self.abort('callback');
            // if set suspend at t.task or t.callback , stop continue running
            if(p.status!=="run")
                return;

            self.start();
        },
        start:function(time, delaycb){
            var self=this, p=self.profile, task,delay;

            if(p.__delaycb){
                xui.tryF(p.__delaycb,[p.id],self);
                delete p.__delaycb;
            }
            if(delaycb){
                p.__delaycb=delaycb;
            }

            if(p._start===false){
                p._start=true;
                //call onstart
                if(p.onStart){
                    var r=xui.tryF(p.onStart,[p.id],self);
                    if(false===r){
                        return self.abort('start');
                    }else if(true===r){
                        return;
                    }else if(xui.isNumb(r)){
                        self.suspend(r);
                        return;
                    }
                }
            }
            if(p.status!="run")
                p.status="run";

            if(!p.tasks.length)
                return self.abort('empty');

            if(p.index>=p.tasks.length){
                if(p.cycle===true)
                    self.profile.index = 0;
                else
                    return self.abort('normal');
            }
            task=p.tasks[p.index];

            delay=typeof task=='number' ? task : (task && typeof task.delay=='number') ? task.delay : p.delay;
            p._left= (time || time===0)?time:delay;

            // clear the mistake trigger task
            if(p._asy!=0.1)
                xui.clearTimeout(p._asy);

            p._asy = xui.asyRun(self._task, p._left, [], self);
            p.time=xui.stamp();
            return self;
        },
        suspend:function(time,delaycb){
            var n,p=this.profile;
            if(p.status=="pause")return;
            p.status="pause";
            if(p._asy!==0.1){
                xui.clearTimeout(p._asy);
                if(p.index>0)p.index--;
            }
            n=p._left-(xui.stamp() - p.time);

            p._left=(n>=0?n:0);

            if((Number(time) || 0))
                this.resume(time, delaycb);

            return this;
        },
        /*time
        number:set timeout to number
        true:set timeout to default
        false:set timeout to 0
        undefined: timetou to left
        */
        resume:function(time, delaycb){
            var self=this;
            if(self.profile.status=="run")return;

            time = time===undefined ? self.profile._left :
                        time===true ? self.profile.delay :
                        time===false ? 0 :
                        (Number(time) || 0);

            self.profile.status="run";
            self.start(time, delaycb);
            return self;
        },
        abort:function(flag){
            var t=this.profile;
            t.status="stop";
            xui.clearTimeout(t._asy);
            xui.tryF(t.onEnd, [t.id,flag]);
            this.__gc();
        },
        links:function(thread){
            var p=this.profile, onEnd=p.onEnd, id=p.id;
            p.onEnd=function(){xui.tryF(onEnd,[id]); thread.start()};
            return this;
        },
        insert:function(arr, index){
            var self=this,o=self.profile.tasks,l=o.length,a;
            if(!xui.isArr(arr))arr=[arr];
            index= index || self.profile.index;
            if(index<0)index=-1;
            if(index==-1){
                Array.prototype.push.apply(o, arr);
            }else{
                if(index>l)index=l;
                a=o.splice(index,l-index);
                o.push.apply(o, arr);
                o.push.apply(o, a);
            }
            return self;
        },
        getCache:function(key){
            return this.profile.cache[key];
        },
        setCache:function(key,value){
            this.profile.cache[key] = value;
            return this;
        },
        isAlive:function(){
            return !!xui.$cache.thread[this.id];
        },
        getStatus:function(){
            return this.profile.status;
        }
    },
    After:function(){
        /*
        give shortcut to some functions
        */
        var self=this, f=function(i){
            self[i]=function(id){
                var t;
                if(xui.$cache.thread[id])
                    (t=xui.Thread(id))[i].apply(t,Array.prototype.slice.call(arguments,1));
            }
        },
        a = 'start,suspend,resume,abort'.split(',');
        for(var i=0,l=a.length;i<l;i++)f(a[i]);
    },
    Static:{
        $asFunction:1,
        $xid:1,
        __gc : function(){
            xui.$cache.thread={};
        },
        isAlive:function(id){
            return !!xui.$cache.thread[id];
        },
        //Dependencies: xui.Dom
        observableRun:function(tasks,onEnd,threadid,busyMsg){
            var thread=xui.Thread, dom=xui.Dom;
            if(!xui.isArr(tasks))tasks=[tasks];
            //if thread exists, just inset task to the next positiong
            if(xui.$cache.thread[threadid]){
                if(typeof onEnd=='function')
                    tasks.push(onEnd);
                thread(threadid).insert(tasks);
            //if does not exist, create a new thread
            }else{
                thread(threadid, tasks,
                    0,null,
                    //set busy status to UI
                    function(threadid){
                        if(dom)dom.busy(threadid,busyMsg);
                    },
                    //set free status to UI
                    function(threadid){
                        xui.tryF(onEnd,arguments,this);
                        if(dom)dom.free(threadid);
                    }
                ).start();
            }
        },
        /*group thread run once
        group: hash include thread or threadid
        callback: call after a thread finish
        onStart:before all threads start
        onEnd:after all threads end
        */
        group:function(id, group, callback,onStart,onEnd){
            var bak={},
                thread=xui.Thread,
                f=function(o,i,threadid){
                    if(typeof o == 'string')o=thread(o);
                    if(o){
                        var f = function(){
                            var me=arguments.callee;
                            xui.tryF(me.onEnd,arguments,this);
                            me.onEnd=null;
                            delete bak[i];
                            //call callback here
                            xui.tryF(callback,[i, threadid],this);
                            if(xui.isEmpty(bak))
                                thread.resume(threadid);
                        };
                        f.onEnd = o.profile.onEnd;
                        o.profile.onEnd = f;
                        o.start();
                    }
                };
            for(var i in group)bak[i]=1;
            return thread(id, [function(threadid){
                if(!xui.isEmpty(group)){
                    thread.suspend(threadid);
                    for(var i in group)f(group[i],i, threadid);
                }
            }],0,null,onStart,onEnd);
        },
        repeat:function(task, interval, onStart, onEnd){
            return xui.Thread(null,[null],interval||0,task,onStart,onEnd,true).start();
        }
    }
});

/*xui.absIO/ajax
*  Dependencies: _ ; Class ; xui ; xui.Thread
*/
/*
        get     post    get(cross domain)   post(corss domain)  post file   return big data(corss domain)
ajax    +       +       -                   -                   -           -
sajax   +       -       +                   -                   -           * JSONP
iajax   +       +       +                   *                   *           * IDMI
*/
Class('xui.absIO',null,{
    Constructor:function(uri, query, onSuccess, onFail, threadid, options){
        var upper=arguments.callee.upper;
        if(upper)upper.call(this);
        upper=null;
        //get properties
        if(typeof uri=='object')
            options=uri;
        else{
            options=options||{};
            xui.merge(options, {
                uri:uri,
                query:query,
                onSuccess:onSuccess,
                onFail:onFail,
                threadid:threadid
            });
        }
        //for cache
        var self=this,  me=arguments.callee,con=self.constructor;
        if((con !== me) || self.id)
            return new me(options);

        //give defalut value to those members
        xui.merge(options,{
            id : options.id || (''+(con._id++)),
            uid: (''+(con.uid++)),
            uri : options.uri?xui.adjustRes(options.uri,0,1,1):'',
            username:options.username||undefined,
            password:options.password||undefined,
            query : options.query||'',
            contentType : options.contentType||'',
            Accept : options.Accept||'',
            header : options.header||null,
            asy : options.asy!==false
        },'all');
        var m=(options.method||con.method).toUpperCase();
        options.method = 'POST'==m ? 'POST' : 'PUT'==m ? 'PUT' : 'DELETE'==m ? 'DELETE' : 'PATCH'==m ? 'PATCH' : 'GET';

        var a='retry,timeout,reqType,rspType,optimized,customQS'.split(',');
        for(var i=0,l=a.length;i<l;i++){
            options[a[i]] = (a[i] in options)?options[a[i]]:con[a[i]];
            if(typeof options[a[i]]=="string")
                options[a[i]]=options[a[i]].toLowerCase();
        }

        xui.merge(self, options, 'all');

        if(self.reqType=='xml')
            self.method="POST";

        if(con.events)
            xui.merge(self, con.events);

        self.query = self.customQS(self.query);

        // remove all undifiend item
        if(typeof self.query=='object' && self.reqType!="xml")
            self.query=xui.copy(self.query, function(o){return o!==undefined});

        if(!self._useForm && xui.isHash(self.query) && self.reqType!="xml")
            self.query = con._buildQS(self.query, self.reqType=="json",self.method=='POST');

        return self;
    },
    Instance:{
        _fun:xui.fun(),
        _flag:0,
        _response:false,
        _txtresponse:'',
        _retryNo:0,

        _time:function() {
            var self=this,c=self.constructor;
            self._clear();
            if (self._retryNo < self.retry) {
                self._retryNo++;
                xui.tryF(self.onRetry,[self._retryNo],self);
                self.start();
            }else{
                if(false!==xui.tryF(self.onTimeout,[],self))
                    self._onError(new Error("Request timeout"));
            }
        },
        _onEnd:function(){
            var self=this;
            if(!self._end){
                self._end=true;
                if(self._flag>0){
                    xui.clearTimeout(self._flag);
                    self._flag=0
                }
                xui.Thread.resume(self.threadid);
                xui.tryF(self.$onEnd,[],self);
                xui.tryF(self.onEnd,[],self);
                self._clear();
            }
        },
        _onStart:function(){
            var self=this;
            xui.Thread.suspend(self.threadid);
            xui.tryF(self.$onStart,[],self);
            xui.tryF(self.onStart,[],self);
        },
        _onResponse:function(){
            var self=this;
            if(false!==xui.tryF(self.beforeSuccess,[self._response, self.rspType, self.threadid], self))
                xui.tryF(self.onSuccess,[self._response, self.rspType, self.threadid], self);
            self._onEnd();
        },
        _onError:function(e){
            var self=this;
            if(false!==xui.tryF(self.beforeFail,[e, self.threadid],self))
                xui.tryF(self.onFail,[e.name?( e.name + ": " + e.message):e, self.rspType, self.threadid, e], self);
            self._onEnd();
        },
        isAlive:function(){
            return !this._end;
        },
        abort:function(){
            this._onEnd();
        }
    },
    Static:{
        $abstract:true,
        get:function(uri, query, onSuccess, onFail, threadid, options){
            options=options||{};
            options.mothod="GET";
            return this.apply(this, arguments).start();
        },
        post:function(uri, query, onSuccess, onFail, threadid, options){
            options=options||{};
            options.mothod="POST";
            return this.apply(this, arguments).start();
        },
        _id:1,
        uid:1,
        method:'GET',
        retry:0,
        timeout:60000,
        //form, xml, or json
        reqType:'form',
        //json, xml, text, script
        rspType:'json',

        optimized:false,

        callback:'callback',

        _buildQS:function(hash, flag, post){
            hash=xui.clone(hash,function(o,i){return !(xui.isNaN(o)||!xui.isDefined(o))});
            return flag?((flag=xui.serialize(hash))&&(post?flag:encodeURIComponent(flag))):xui.urlEncode(hash);
        },
        customQS:function(obj){
            return obj;
        },
        _if:function(doc,id,onLoad){
            var ie8=xui.browser.ie && xui.browser.ver<9,
                scr=ie8
                    ? ("<iframe "+(id?("name='"+"xui_xdmi:"+id+"'"):"")+(onLoad?(" onload='xui.XDMI._o(\""+id+"\")'"):"")+">")
                    : "iframe";
            var n=doc.createElement(scr),w;
            if(id)n.id=n.name="xui_xdmi:"+id;
            if(!ie8 && onLoad)n.onload=onLoad;
            n.style.display = "none";
            doc.body.appendChild(n);
            w=frames[frames.length-1].window;
            return [n,w,w.document];
        },
        isCrossDomain:function(uri){
            var b=xui._localParts;
            uri=uri.replace(/#.*$/,"").replace(/^\/\//,b[1]+"//");
            var a=xui._uriReg.exec((uri||'').toLowerCase());
            return !!( a&&(
                    a[1]!==b[1]||
                    a[2]!==b[2]||
                    (a[3]||(a[1]==="http:"?80:443))!==(b[3]||(b[1]==="http:"?80:443))
                )
            );
        },
        //get multi ajax results once
        groupCall:function(hash, callback, onStart, onEnd, threadid){
            var i,f=function(o,i,hash){
                hash[i]=xui.Thread(null,[function(threadid){
                    o.threadid=threadid;
                    o.start();
                }]);
            };
            for(i in hash)f(hash[i],i,hash);
            return xui.Thread.group(null, hash, callback, function(){
                xui.Thread(threadid).suspend();
                xui.tryF(onStart,arguments,this);
            }, function(){
                xui.tryF(onEnd,arguments,this);
                xui.Thread(threadid).resume();
            }).start();
        }
    }
});

Class('xui.Ajax','xui.absIO',{
    Instance:{
        _XML:null,
        _unsafeHeader:"Accept-Charset,Accept-Encoding,Access-Control-Request-Headers,Access-Control-Request-Method,Connection,Content-Length,Cookie,Cookie2,Date,DNT,Expect,Host,Keep-Alive,Origin,Referer,TE,Trailer,Transfer-Encoding,Upgrade,User-Agent,Via".toLowerCase().split(","),
        _isunsafe:function(k){
            return xui.browser.isWebKit && (xui.str.startWith("Proxy-",k)||xui.str.startWith("Sec-",k)||xui.arr.indexOf(this._unsafeHeader,k.toLowerCase())!==-1);
        },
        _header:function(n,v){
            if(!this._isunsafe(n)){
                if(this._XML)this._XML.setRequestHeader(n,v);
            }
        },
        start:function() {
            var self=this;
            if(false===xui.tryF(self.beforeStart,[],self)){
                self._onEnd();
                return;
            }
            if (!self._retryNo)
                self._onStart();
            try {
                with(self){
                    //must use "self._XML", else opera will not set the new one
                   self._XML = new window.XMLHttpRequest();
                   if(asy)
                       self._XML.onreadystatechange = function(){
                           if(self && self._XML && self._XML.readyState==4) {
                               /*//Checking responseXML for Terminated unexpectedly in firfox
                               if(xui.browser.gek && !self._XML.responseXML)
                                    self._onError(new Error('errXMLHTTP:Terminated unexpectedly!'));
                               else*/
                                   self._complete.apply(self);
                               //must clear here, else memory leak
                               self._clear();
                           }
                       };

                    if (!_retryNo && method != "POST"){
                        if(query)
                            uri = uri.split("?")[0] + "?" + query;
                        query=null;
                    }
                    if(username&&password)
                        self._XML.open(method, uri, asy, username, password);
                    else
                        self._XML.open(method, uri, asy);

                    self._header("Accept", Accept ? Accept :
                        (rspType=='json' ? "application/json,text/javascript,*/*;q=0.01" : rspType=='xml' ? "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" : "*/*")
                    );
                    self._header("Content-type", contentType ? contentType : (
                        (reqType=='xml' ? "text/xml; " : reqType=='json' ? "application/json; " : method=="POST" ? "application/x-www-form-urlencoded; " : "") + "charset=" + (self.charset||"UTF-8")
                    ));
                    self._header("X-Requested-With", "XMLHttpRequest");
                    if(optimized){
                        try {
                            self._header("User-Agent", null);
                            self._header("Accept-Language", null);
                            self._header("Connection", "keep-alive");
                            self._header("Keep-Alive", null);
                            self._header("Cookie", null);
                            self._header("Cookie", "");
                        } catch(e) {}
                    }
                    try {
                        if(xui.isHash(header))
                            xui.each(header,function(o,i){
                                self._header(i, o);
                            });
                    } catch(e) {}

                    if(false===xui.tryF(self.beforeSend,[self._XML],self)){
                        self._onEnd();
                        return;
                    }

                    //for firefox syc GET bug
                    try{self._XML.send(query);}catch(e){}

                    if(asy){
                      if(self._XML&&timeout > 0)
                        _flag = xui.asyRun(function(){if(self && !self._end){self._time()}}, self.timeout);
                    }else
                        return _complete();
                }
            }catch(e){
                self._onError(e);
            }
            return self;
        },
        abort:function(){
            var self=this;
            if(self._XML){
                self._XML.onreadystatechange=self._fun;
                self._XML.abort();
                self._XML=null;
            }
            arguments.callee.upper.call(self);
        },
        _clear:function(){
            var self=this;
            if(self._XML){
                self._XML.onreadystatechange=self._fun;
                self._XML=null;
            }
        },
        _complete:function() {
            with(this){
                //this is for opera
                var ns=this,obj,status = ns._XML.status;
                _txtresponse = rspType=='xml'?ns._XML.responseXML:ns._XML.responseText;
                // try to get js object, or the original
                _response=rspType=="json"?((obj=xui.unserialize(_txtresponse))===false?_txtresponse:obj):_txtresponse;

                // crack for some local case ( OK but status is 0 in no-IE browser)
                if(!status && xui._localReg.test(xui._localParts[1])){
                    status=ns._XML.responseText?200:404;
                }

                // for IE7
                if(status==1223)status=204;

                if(status >= 200 && status < 300 || status==304)
                    _onResponse();
                // offline or other Network problems
                else if(status===undefined || status<10 )
                    _onError(new Error('Network problems--' +status));
                else
                    _onError(new Error('XMLHTTP returns--' +status));
            }
            return this._response;
        }
    },
    Static:{
        $asFunction:1
    }
});
// JSONP
Class('xui.JSONP','xui.absIO',{
    Instance:{
        start:function(){
            var self=this,id,c=self.constructor, t, n, ok=false;
            if(false===xui.tryF(self.beforeStart,[],self)){
                self._onEnd();
                return;
            }
            if(!self._retryNo)
                self._onStart();
            //dont retry for loading script
            if(self.rspType=='script')
                self.retry=0;

            //first
            id=self.id;
            if(c._pool[id])
                c._pool[id].push(self);
            else
                c._pool[id]=[self];

            c.No["_"+id]=function(rsp){
                c.$response(rsp,id);
            };

            var w=document,
                _cb=function(){
                    if(!ok){
                        ok=true;
                        if(self.rspType=='script'){
                            if(typeof self.checkKey=='string')
                                xui.asyRun(function(){
                                    xui.exec("if(xui.SC.get('"+self.checkKey+"'))xui.JSONP._pool['"+id+"'][0]._onResponse();" +
                                        "else xui.JSONP._pool['"+id+"'][0]._loaded();");
                                });
                            else
                                self._onResponse();
                        }else
                            self._loaded();
                    }
                };
            n = self.node = w.createElement("script");

            var uri = self.uri;
            if(self.query)
                uri = uri.split("?")[0]  + "?" + self.query;

            n.src = uri;
            n.type= 'text/javascript';
            n.charset=self.charset||'UTF-8';
            n.onload = n.onreadystatechange = function(){
                if(ok)
                    return;
                var t=this.readyState;
                if(!t || t == "loaded" || t == "complete")
                    _cb();

                if(t=='interactive' && xui.browser.opr){
                    xui.Thread.repeat(function(){
                        if(ok)
                            return false;
                        if (/loaded|complete/.test(document.readyState)) {
                            _cb();
                            return false;
                        }
                    },50);
                }
            };

            if('onerror' in n)
                n.onerror=function(e){
                    //clear first
                    self._clear();
                    self._onError(new Error("Not Found - " + uri));
                    self=null;
                    return;
                };

            (w.body||w.getElementsByTagName("head")[0]).appendChild(n);

            n=null;

            //set timeout
            if(self.timeout > 0)
                self._flag = xui.asyRun(function(){if(self && !self._end){self._time()}}, self.timeout);
        },
        _clear:function(){
            var self=this, n=self.node, c=self.constructor,id=self.id,_pool=c._pool;
            if(_pool[id]){
                _pool[id].length=0;
                delete _pool[id];
            }
            delete c.No["_"+id];

            if(n){
                self.node=n.onload=n.onreadystatechange=n.onerror=null;

                var div=document.createElement('div');
                //in ie + add script with url(remove script immediately) + add the same script(remove script immediately) => crash
                //so, always clear it later
                div.appendChild(n.parentNode&&n.parentNode.removeChild(n)||n);
                if(xui.browser.ie)
                    xui.asyRun(function(){div.innerHTML=n.outerHTML='';if(xui.isEmpty(_pool))c._id=1;_pool=c=n=div=null;});
                else{
                    xui.asyRun(function(){
                        div.innerHTML='';
                        n=div=null;
                        if(xui.isEmpty(_pool))c._id=1;
                    });
                }
            }else{
                if(xui.isEmpty(_pool))c._id=1;
            }
        },
        _loaded:function(){
            var self=this;
            xui.asyRun(function(){
                if(self.id && self.constructor._pool[self.id])
                    self._onError(new Error("JSONP return script doesn't match"));
            },500);
        }
    },
    Static : {
        $asFunction:1,
        _pool:{},
        "No":{},
        $response:function(obj,id) {
            var self=this,o;
            if(obj && (o = self._pool[id])){
                for(var i=0,l=o.length;i<l;i++){
                    o[i]._response=obj;
                    o[i]._onResponse();
                }
            }else
                self._onError(new Error("JSONP return value formatting error--"+obj));
        },
        customQS:function(obj){
            var c=this.constructor,  b=c.callback,nr=(this.rspType!='script');
            if(typeof obj=='string')
                return (obj||"") + (nr?("&" + b + '=xui.JSONP.No._'+this.id):'');
            else{
                if(nr){
                    obj[b]="xui.JSONP.No._"+this.id;
                }
                return obj;
            }
        }
    }
});
// XDMI : Cross-Domain Messaging with iframes
Class('xui.XDMI','xui.absIO',{
    Instance:{
        _useForm:true,
        start:function(){
            var self=this,w=window,c=self.constructor, i, id, t, n, k, o, b, form,onload;
            if(false===xui.tryF(self.beforeStart,[],self)){
                self._onEnd();
                return;
            }
            if (!self._retryNo)
                self._onStart();

            //first
            id=self.id;
            if(c._pool[id])
                c._pool[id].push(self);
            else
                c._pool[id]=[self];

            //create form
            var a=c._if(document,id, onload);
            self.node=a[0];
            self.frm=a[1];
            //create form
            form = self.form = document.createElement('form');
            form.style.display='none';

            // use postmessage
            if (w['postMessage']) {
                self._msgcb=function(e){
                    if(!self.node)return;
                    // only take self message
                    if(e.source!==self.frm){
                        return;
                    }
                    e=e.data;
                    if(self.rspType=="json"){
                        e = xui.unserialize(e) || e;
                    }
                    if(e && (t=c._pool[self.id])){
                        for(var i=0,l=t.length;i<l;i++){
                            t[i]._response=e;
                            t[i]._onResponse();
                        }
                    }else{
                        //clear first
                        self._clear();
                        self._onError(new Error("XDMI return value formatting error"));                        
                    }
                };
                 if (w.addEventListener) w.addEventListener('message', self._msgcb, false);
                 else w.attachEvent('onmessage', self._msgcb);
            }
            // use window.name
            else{
                self._onload = onload = function(id){
                    //in some situation, this function will be triggered twice.
                    if(self.OK)return;
                    //in IE/opera, "setting an image file as dummy" will trigger the second onload event with 'self.node == null'
                    if(!self.node)return;
                    var w=self.node.contentWindow,c=xui.XDMI,o,t;
                    //in opera, "set location" will trigger location=='about:blank' at first
                    if(xui.browser.opr)try{if(w.location=='about:blank')return}catch(e){}
                    self.OK=1;
                    // first round: try to syn domain
                    var flag=0;
                    try{if(w.name===undefined)flag=1}catch(e){flag=1}
                    if(flag){
                        w.location.replace(c._getDummy()+'#'+xui.ini.dummy_tag);
                    }

                    // get data
                    (function(){
                        // second round: try to get data
                        var flag=0;
                        try{if(w.name===undefined)flag=1}catch(e){flag=1}
                        if(flag){
                            return xui.asyRun(arguments.callee);
                        }

                        var data;
                        if(("xui_xdmi:"+self.id)==w.name){
                            //clear first
                            self._clear();
                            self._onError(new Error('XDMI no return value'));
                            return;
                        }else{
                            data=w.name;
                        }

                        if(data && (o=xui.unserialize(data)) && (t=c._pool[self.id]) ){
                            for(var i=0,l=t.length;i<l;i++){
                                t[i]._response=o;
                                t[i]._onResponse();
                            }
                        }else{
                            //clear first
                            self._clear();
                            self._onError(new Error("XDMI return value formatting error, or no matched 'id'-- "+data));
                        }
                    })();
                };
            }

            var uri=self.uri;
            if(self.method!='POST')
                uri = uri.split("?")[0];

            form.action=self.uri;
            form.method=self.method;
            form.target="xui_xdmi:"+id;

            k=self.query||{};
            var file,files=[];
            for(i in k){
                if(k[i] && k[i]['xui.UIProfile'] && k[i].$xuiFileCtrl){
                    if(file=k[i].boxing().getUploadObj()){
                        files.push({id:k[i].$xid, file:file});
                        file.id=file.name=i;
                        form.appendChild(file);
                        b=true;
                    }
                }else if(k[i] && k[i].nodeType==1){
                    k[i].id=k[i].name=i;
                    form.appendChild(k[i]);
                    b=true;
                }else{
                    if(xui.isDefined(k[i])){
                        t=document.createElement('textarea');
                        t.id=t.name=i;
                        t.value= typeof k[i]=='string'?k[i]:xui.serialize(k[i],function(o){return o!==undefined});
                        form.appendChild(t);
                    }
                }
            }
            if(self.method=='POST' && b){
                form.enctype = 'multipart/form-data';
                if(form.encoding)
                    form.encoding = form.enctype;
            }
            document.body.appendChild(form);
            //submit
            form.submit();
            
            if(files.length){
                xui.arr.each(files,function(o,i){
                    if(i=xui.getObject(o.id)){
                        if(i['xui.UIProfile'] && i.boxing() && i.boxing().setUploadObj){
                            i.boxing().setUploadObj(o.file);
                        }
                    }
                });
            }
            
            t=form=null;
            //set timeout
            if(self.timeout > 0)
                self._flag = xui.asyRun(function(){if(self && !self._end){self._time()}}, self.timeout);
        },
        _clear:function(){
            var self=this, n=self.node,f=self.form, c=self.constructor, w=window, div=document.createElement('div'),id=self.id,_pool=c._pool;
            if(_pool[id]){
                _pool[id].length=0;
                delete _pool[id];
            }
            if (n&&w['postMessage']) {
                 if (w.removeEventListener) w.removeEventListener('message', self._msgcb, false);
                 else w.detachEvent('onmessage', self._msgcb);
                 self._msgcb=null;
            }else{
                if(xui.browser.gek&&n)try{n.onload=null;var d=n.contentWindow.document;d.write(" ");d.close()}catch(e){}
            }
            self.form=self.node=self.frm=null;
            if(n)div.appendChild(n.parentNode.removeChild(n));
            if(f)div.appendChild(f.parentNode.removeChild(f));
            div.innerHTML='';
            if(xui.isEmpty(_pool))c._id=1;
            f=div=null;
        }
    },
    Static : {
        $asFunction:1,
        method:'POST',
        _pool:{},
        _o:function(id){
            var self=this,p=self._pool[id],o=p[p.length-1];
            xui.tryF(o._onload);
        },
        _getDummy:function(win){
            win=win||window;
            var ns=this,
                arr,o,
                d=win.document,
                ini=xui.ini,
                b=xui.browser,
                f=ns.isCrossDomain;
            if(ns.dummy)return ns.dummy;
            //can get from xui.ini;
            if(ini.dummy)return ns.dummy=ini.dummy;
            if(!f(ini.path)){
                //not for 'ex-domain include xui' case
                if(!d.getElementById('xui:img:bg')){
                    o=d.createElement('img');
                    o.id='xui:img:bg';
                    o.src=ini.img_bg;
                    o.style.display='none';
                    d.body.appendChild(o);
                    o=null;
                }
            }
            if(o=d.getElementById('xui:img:bg')){
                return ns.dummy=o.src.split('#')[0];
            }else{
                arr=d.getElementsByTagName("img");
                for(var i=0,j=arr.length; i<j; i++){
                    o = arr[i];
                    if(o.src && !f(o.src))
                        return ns.dummy=o.src.split('#')[0];
                }

                if(b.gek){
                    arr=d.getElementsByTagName("link");
                    for(var i=0,j=arr.length; i<j; i++){
                        o = arr[i];
                        if (o.rel == "stylesheet" && !f(o.href))
                            return ns.dummy=o.href.split('#')[0];
                    }
                }
            }
            //get from parent, not for opera in this case
            try{
                if(win!=win.parent)
                    if((win=win.parent) && !f(''+win.document.location.href))
                        return ns._getDummy(win);
            }catch(e){}
            //for the last change, return a file name whether it existes or does not exist, and not cache it.
            return '/favicon.ico';
        },
        customQS:function(obj){
            var s=this,c=s.constructor,t=c.callback,w=window;
            obj[t]='window.name';
            if(window['postMessage'])
                obj[t]=obj.parentDomain=w.location.origin || (w.location.protocol + "//" + w.location.hostname + (w.location.port ? ':' + w.location.port: ''));
            else
                obj[t]='window.name';
            return obj;
        }
    }
});
new function(){
    // for compitable
    xui.SAjax=xui.JSONP;
    xui.IAjax=xui.XDMI;
};
/*xui.SC for straight call
*  Dependencies: _ ; Class ; xui ; xui.Thread ; xui.absIO/ajax
*/
Class('xui.SC',null,{
    Constructor:function(path, callback, isAsy, threadid, options, force){
        var upper=arguments.callee.upper;
        if(upper)upper.call(this);
        upper=null;
        var p = xui.$cache.SC,r;
        if(r=p[path]||(p[path]=xui.get(window,path.split('.'))))
            xui.tryF(callback,[path,null,threadid],r);
        else{
            options=options||{};
            options.$cb=callback;
            if(isAsy)options.threadid=threadid;
            r=p[path]=xui.SC._call(path||'', options, isAsy, force);
        }
        return r;
    },
    Static:{
        $asFunction:1,
        __gc:function(k){
            xui.$cache.SC={};
        },

        //get object from obj string
        get:function (path, obj){
            // a[1][2].b[3] => a,1,2,b,3
            return xui.get(obj||window,(path||'').replace(/\]$/g,'').split(/[\[\]\.]+/));
        },
        /* function for "Straight Call"
        *   asy     loadSnips use
        *   true    true    ajax
        *   true    false   sajax JSONP
        *   false   ture    ajax
        *   false   false   ajax
        */
        _call : function (s, options, isAsy, force){
            isAsy = !!isAsy;
            var i,t,r,o,funs=[],ep=xui.SC.get,ct=xui.$cache.snipScript,
            f= function(text,n,threadid){
                var self=this,t,uri=this.uri;
                if(text){
                    //test again when asy end.
                    if(!ep(s)){
                        //loadSnips only
                        if(self.$p)
                            (self.$cache || ct)[self.$tag]=text;
                        else
                            //for sy xmlhttp ajax
                            try{xui.exec(text,s)}catch(e){throw e.name + ": " + e.message+ " " + self.$tag}
                    }
                }
                t=Class._last;
                Class._ignoreNSCache=Class._last=null;
                // specified class must be in the first, maybe multi classes in code
                // and give a change to load the last class in code, if specified class doesn't exist
                xui.tryF(self.$cb,[self.$tag,text,threadid],ep(s)||t||{});
                if(!ep(s)&&t&&t.KEY!=s)
                    xui.asyRun(function(){
                            throw "'"+s+"' doesn't in '"+uri+"'. The last class '"+t.KEY+"' was triggered.";
                    });
            },fe=function(text){
                var self=this;
                //for loadSnips resume with error too
                xui.tryF(self.$cb,[null,null,self.threadid],self);
            };
            //get from object first
            if(force || !(r=ep(s))){
                //if script in cache
                if(!force && (t=ct[s])){
                    isAsy=false;
                    f.call({$cb: options.$cb},t);
                    //delete it
                    delete ct[s];
                }
                //get from object second
                if(force || !(r=ep(s))){
                     options = options ||{};
                     //load from sy ajax
                     o=xui.getPath(s,'.js','js',options);
                     options.$tag = s;
                     Class._ignoreNSCache=1;Class._last=null;
                     var ajax;
                     //asy and not for loadSnips
                     if(isAsy && !options.$p){
                        options.rspType="script";
                        ajax=xui.JSONP;
                     }else{
                        options.asy=isAsy;
                        ajax=xui.Ajax;
                    }
                    //get text from sy ajax
                    ajax(o, xui.$rand+"="+xui.rand(), f, fe, null, options).start();
                    //for asy once only
                    if(!isAsy)
                        r=ep(s);
                }
            }else
                if(options.$cb)
                    f.call(options);
            return r;
        },
        /*
        arr: key array, ['xui.UI.Button','xui.UI.Input']
        callback: fire this function after all js loaded
        */
        loadSnips:function(pathArr,cache,callback,onEnd,threadid,options,isAsy){
            if(!pathArr || !pathArr.length){
                xui.tryF(onEnd,[threadid]);
                return;
            }
            var bak={}, options=xui.merge(options||{}, {$p:1,$cache:cache||xui.$cache.snipScript});
            for(var i=0,l=pathArr.length;i<l;i++)
                bak[pathArr[i]]=1;

            if(callback||onEnd){
                options.$cb=function(path){
                    //give callback call
                    if(callback)xui.tryF(callback,arguments,this);
                    delete bak[path||this.$tag];
                    if(xui.isEmpty(bak)){
                        xui.tryF(onEnd,[threadid]);
                        onEnd=null;
                        xui.Thread.resume(threadid);
                    }
                };
            }
            xui.Thread.suspend(threadid);
            for(var i=0,s; s=pathArr[i++];)
                this._call(s, xui.merge({$tag:s},options,isAsy), true);
        },
        runInBG:function(pathArr, callback, onStart, onEnd){
            var i=0,j,t,self=this,fun=function(threadid){
                while(pathArr.length>i && (t=self.get(j=pathArr[i++])));
                if(!t)
                    self._call(j, {threadid:threadid},true);
                //set abort function to the next step
                if(pathArr.length<i)
                    xui.Thread(threadid).abort();
                if(pathArr.length==i)i++;
            };
            xui.Thread(null, [fun], 1000, callback, onStart, onEnd, true).start();
        },
        execSnips:function(cache){
            var i,h=cache||xui.$cache.snipScript;
            for(i in h)
                try{xui.exec(h[i],i)}catch(e){throw e}
            h={};
        },
        //asy load multi js file, whatever Dependencies
        /*
        *1.busy UI
        *3.xui.SC.groupCall some js/class
        *4.resume thread
        *5.xui.SC.loadSnips other js/class
        *6.execute other ..
        *7.free UI
        */
        groupCall:function(pathArr, onEnd, callback, threadid,options,isAsy){
            if(pathArr){
                //clear first
                var self=this;
                self.execSnips();
                xui.Thread.suspend(threadid);
                self.loadSnips(pathArr, 0, callback, function(){
                    self.execSnips();
                    xui.tryF(onEnd,[threadid]);
                    onEnd=null;
                    xui.Thread.resume(threadid);
                },null,options,isAsy);
            }else
                xui.tryF(onEnd,[threadid]);
        }
    }
});

//xui.absBox
Class('xui.absBox',null, {
    Constructor:function(){
        var upper=arguments.callee.upper;
        if(upper)upper.call(this);
        upper=null;
        this._nodes=[];
        this.Class=this.constructor;
    },
    Before:function(key){
        var t=xui.absBox;
        if(t)(t=t.$type)[key.replace('xui.','')]=t[key]=key;
    },
    Instance:{
        __gc:function(){
            this.each(function(profile){
                xui.tryF(profile.__gc);
            });
            this._nodes=0;
        },
        _get:function(index){
            var t=this._nodes;
            return  xui.isNumb(index)?t[index]:t;
        },
        _empty:function(){
            this._nodes.length=0;
            return this;
        },
        get:function(index){
            return this._get(index);
        },
        size:function(){
            return this._nodes.length;
        },
        _each:function(fun,scope,desc){
            var self=this,j=self._nodes,l=j.length,i,n;
            if(desc){
                for(i=l;i>=0;i--)
                    if(n=j[i])
                        if(false===fun.call(scope||self,n,i))
                            break;
            }else{
                for(i=0;i<l;i++)
                    if(n=j[i])
                        if(false===fun.call(scope||self,n,i))
                            break;
            }
            n=null;
            return self;
        },
        each:function(fun,scope,desc){
            return this._each(fun,scope,desc);
        },
        isEmpty:function(){
            return !this._nodes.length;
        },
        merge:function(obj){
            if(this==xui.win||this==xui.doc||this==xui('body'))return this;
            var self=this, c=self.constructor, obj=obj._nodes, i=0, t, n=self._nodes;
            if(obj.length){
                for(;t=obj[i++];)n[n.length]=t;
                self._nodes=c._unique(n);
            }
            return self;
        },
        reBoxing:function(key,ensureValue){
            var self=this, t=xui.absBox.$type[key||'Dom'];
            if(!t)return xui.UI.pack([]);
            if(t==self.KEY)return self;
            if(t=xui.SC(t))return t.pack(self._nodes, ensureValue);
        }
    },
    Static:{
        $abstract:true,
        $type:{},
        pack:function(arr, ensureValue){
            var o = new this(false);

            o._nodes =  !arr
                            ? []
                            : ensureValue===false
                            ? xui.isArr(arr)
                                ? arr
                                : [arr]
                            : typeof this._ensureValues=='function'
                                ? this._ensureValues(arr)
                                : xui.isArr(arr)
                                    ? arr
                                    : [arr];
            o.n0=o._nodes[0];
            return o;
        },
        _unique:function(arr){
            var h={},a=[],i=0,l=arr.length,t,k;
            for(;i<l;i++)a[i]=arr[i];
            arr.length=0;
            i=0;
            for(;t=a[i++];){
                k=typeof t=='string'? t : t.$xid;
                if(!h[k]){
                    h[k]=1;
                    arr.push(t);
                }
            }
            return arr;
        },
        plugIn:function(name, fun){
            this.prototype[name]=fun;
            return this;
        }
    }
});

Class('xui.absProfile',null,{
    Constructor:function(){
        var upper=arguments.callee.upper;
        if(upper)upper.call(this);
        upper=null;
        if(!this.$xid)this.$xid=xui.absProfile.$xid.next();
    },
    Instance:{
        getId:function(){
            return this.$xid;
        },
        link:function(obj,id,target,index){
            return xui.absProfile.prototype.$link(this,obj,id,target,index);
        },
        $link:function(self,obj,id,target,index){
            var uid='$'+self.$xid;

            target = target||self;
            if(obj[uid])self.unLink(id);

            //double link
            obj[uid]=target;
            if(xui.isArr(obj))
                xui.arr.insertAny(obj,target,index,true);

            //antilink track
            self._links[id]=obj;
            return self;
        },
        unLink:function(id){
             return xui.absProfile.prototype.$unLink(this,id);
        },
        $unLink:function(self, id){
            var o, index,
                //avoid Number;
                uid='$'+self.$xid;
            if(!self._links)return;
            if(!(o=self._links[id]))return;

            //remove from target
            if(xui.isArr(o)){
                index = xui.arr.indexOf(o,o[uid]);
                if(index!=-1){
                    xui.arr.removeFrom(o, index);
                }
            }delete o[uid];

            //remove from self
            delete self._links[id];

            return index;
        },
        unLinkAll:function(){
            return xui.absProfile.prototype.$unLinkAll(this);
        },
        $unLinkAll:function(self){
            var id='$'+self.$xid,
                l=self._links,
                o,i;
            for(i in l){
                o=l[i];
                if(xui.isArr(o))xui.arr.removeValue(o,o[id]);
                delete o[id];
            }
            self._links={};
            return self;
        },
        getModule:function(top){
            var prf=this, getUpperModule=function(module){
                    // if it's a inner module
                    if(module.moduleClass && module.moduleXid){
                        var pm = xui.SC.get(module.moduleClass);
                        if(pm && (pm = pm.getInstance(module.moduleXid))){
                            return getUpperModule(pm);    
                        }         
                    }
                    return module;
                },t;

            if(prf.moduleClass&&prf.moduleXid){
                if(t=xui.SC.get(prf.moduleClass)){
                    if(t=t.getInstance(prf.moduleXid)){
                        return top?getUpperModule(t):t;
                    }
                }
            }
        },
        getParent:function(){
            return this.parent && this.parent.boxing();
        },
        getChildrenId:function(){
            return this.childrenId;
        }
    },
    Static:{
        $xid:new xui.id,
        $abstract:true
    }
});

Class('xui.Profile','xui.absProfile',{
    Constructor:function(host,key,alias,box,properties,events,options){
        var upper=arguments.callee.upper,args=xui.toArr(arguments);
        upper.apply(this,args);
        upper=null;
        var self=this;
        xui.merge(self,options);

        self.key=key||self.key||'';
        self.alias=alias||self.alias||'',
        self.properties=properties?xui.copy(properties):(self.properties||{});
        self.events=events?xui.copy(events):(self.events||{});
        self.host=host||self.host||self;
        self.Class=self.constructor;
        self.box=box||self.box;
        if(self.events){
            self.setEvents(self.events);
            delete self.events;
        }
        self._links={};
    },
    Instance:{
        setEvents:function(key, value){
            var evs=this.box.$EventHandlers;
            if(xui.isHash(key)){
                return xui.merge(this,key,'all',function(o,i){return evs[i]});
            }else{
                if(evs[key])
                    this[key]=value;
            }
        },
        getEvents:function(key){
            if(key){
                return this[key];
            }else{
                var self=this, t,hash={};
                xui.each(self.box.$EventHandlers,function(o,i){
                    if(self[i])hash[i]=self[i];
                });
                return hash;
            }
        },
        getProperties:function(key){
            if(this._getProperties)this.properties=this._getProperties();
            var prop=this.properties;
            return key?prop[key]:xui.copy(prop);
        },
        setProperties:function(key, value){
            if(xui.isHash(key)){
                xui.merge(key, this.box.$DataStruct, function(o,i){
                    if(!(i in key)){
                        key[i] = xui.isObj(o)?xui.clone(o):o;
                    }
                });
                this.properties=key;
            }else
                this.properties[key]=value;
            if(this.propSetAction)this.propSetAction(this.properties);
        },
        _applySetAction:function(fun, value, ovalue, force, tag, tag2){
            return fun.call(this,value, ovalue, force, tag, tag2);
        },
        __gc:function(){
            var ns=this;
            if(ns.$beforeDestroy){
                xui.each(ns.$beforeDestroy,function(f){
                    xui.tryF(f,[],ns);
                });
                delete ns.$beforeDestroy;
            }
            xui.tryF(ns.$ondestory,[],ns);
            if(ns.onDestroy)ns.boxing().onDestroy();
            if(ns.destroyTrigger)ns.destroyTrigger();

            // try to clear parent host
            var o;
            if(ns.alias && ns.host && (o=ns.host[ns.alias]) && (o=o._nodes) && (o.length===0 || o.length===1 && o[0]==ns)){
                delete ns.host[ns.alias];
            }

            ns.unLinkAll();
            xui.tryF(ns.clearCache,[],ns);
            var o=xui.get(ns,['box','_namePool']);
            if(o)delete o[ns.alias];

            //set once
            ns.destroyed=true;
            //afterDestroy
            if(ns.$afterDestroy){
                xui.each(ns.$afterDestroy,function(f){
                    xui.tryF(f,[],ns);
                });
                delete ns.$afterDestroy;
            }
            if(ns.afterDestroy)ns.boxing().afterDestroy(ns);
            xui.breakO([ns.properties, ns.events, ns],2);
            //set again
            ns.destroyed=true;
        },
        boxing:function(){
            //cache boxing
            var self=this, t;
            //for destroyed UIProfile
            if(!self.box)return null;
            if(!((t=self.Instace) && t.get(0)==self && t._nodes.length==1))
                t = self.Instace = self.box.pack([self],false);
            return t;
        },
        serialize:function(rtnString, keepHost){
            var t,
                self = this,
                o = (t=self.box._beforeSerialized)?t(self):self,
                r={
                    alias:o.alias,
                    key:o.key,
                    host:o.host
                };
            //host
            if(r.host===self){
                delete r.host;
            }else if(o.host && !keepHost ){
                if(rtnString!==false)
                    r.host='@this';
                else
                    delete r.host;
            }

            //properties
            var c={}, p=o.box.$DataStruct, map=xui.absObj.$specialChars;
            xui.merge(c,o.properties, function(o,i){return (i in p) &&  p[i]!==o && !map[i.charAt(0)]});
            if(!xui.isEmpty(c))r.properties=c;

            //events
            if(!xui.isEmpty(t=this.getEvents()))r.events=t;
            var eh = o.box.$EventHandlers;
            xui.filter(r.events, function(o,i){
                return o!=eh[i];
            });
            if(xui.isEmpty(r.events))delete r.events;
            return rtnString===false?r:xui.serialize(r);
        }
    }
});

Class('xui.absObj',"xui.absBox",{
    //properties, events, host
    Constructor:function(){
        var upper=arguments.callee.upper,args=xui.toArr(arguments);
        upper.apply(this,args);
        upper=null;
        //for pack function
        if(args[0]!==false && typeof this._ini=='function')
            return this._ini.apply(this,args);
    },
    Before:function(key, parent_key, o){
        xui.absBox.$type[key]=key;
        return true;
    },
    After:function(){
        var self=this, me=arguments.callee,
            temp,t,k,u,m,i,j,l,v,n,b;
        self._nameId=0;
        self._namePool={};
        self._nameTag=self.$nameTag||(self.KEY.replace(/\./g,'_').toLowerCase());
        self._cache=[];
        m=me.a1 || (me.a1=xui.toArr('$Keys,$DataStruct,$EventHandlers,$DataModel'));
        for(j=0;v=m[j++];){
            k={};
            if((t=self.$parent) && (i=t.length))
                while(i--)
                    xui.merge(k, t[i][v]);
            self[v]=k;
        }

        self.setDataModel(self.DataModel);
        delete self.DataModel;

        self.setEventHandlers(self.EventHandlers);
        delete self.EventHandlers;

        m=me.a5 || (me.a5=xui.toArr('RenderTrigger,LayoutTrigger'));
        for(j=0;v=m[j++];){
            temp=[];
             if((t=self.$parent) && (l=t.length))
                for(i=0;i<l;i++){
                    u=t[i]
                    if(u=u['$'+v])
                        temp.push.apply(temp,u);
                }
            if(self[v])
                temp.push(self[v]);
            
            // sort sub node
            xui.arr.stableSort(temp,function(x,y){
                x=x.$order||0;y=y.$order||0;
                return x>y?1:x==y?0:-1;
            });

            self['$'+v] = temp;
            delete self[v];
        }
    },
    //don't add any other function or member to absObj
    Static:{
        $abstract:true,
        $specialChars:{_:1, $:1},

        // *** non-abstract child must have this
        //_objectProp:{tagVar:1,propBinder:1},
        DataModel:{
            tag:'',
            "name":'',
            desc:'',
            tagVar:{
                ini:{}
            },
            propBinder:{
                hidden:1,
                ini:{}
            },
            dataBinder:{
                ini:'',
                set:function(value){
                    var profile=this,
                        p=profile.properties,
                        ovalue=p.dataBinder;
                    if(ovalue)
                        xui.DataBinder._unBind(ovalue, profile);
                    p.dataBinder=value;
                    xui.DataBinder._bind(value, profile);
                }
            },
            dataField:{
                ini:''
            }
        },
        get:function(index){
          return this.pack([this._cache[index||0]]);
        },
        getAll:function(){
          return this.pack(this._cache);
        },
        pickAlias:function(){
            return xui.absObj.$pickAlias(this);
        },
        $pickAlias:function(cls){
            var t,p=cls._namePool,a=cls._nameTag;
            while(p[t=(a+(++cls._nameId))]){}
            return  t;
        },
        setDataModel:function(hash){
            var self=this,
                sc=xui.absObj.$specialChars,
                ds=self.$DataStruct,
                dm=self.$DataModel,
                ps=self.prototype,
                i,j,t,o,n,m,r;

            //merge default value and properties
            for(i in hash){
                if(!dm[i])dm[i]={};
                o=hash[i];
                if(null===o || undefined===o){
                    r=xui.str.initial(i);
                    delete ds[i];
                    delete dm[i]
                    if(ps[j='get'+r]&&ps[j].$auto$)delete ps[j];
                    if(ps[j='set'+r]&&ps[j].$auto$)delete ps[j];
                //Here, if $DataModel inherites from it's parent class, properties[i] will pointer to parent's object.
                }else{
                    t=typeof o;
                    if(t!='object' || o.constructor!=Object)
                        o={ini:o};
                    ds[i] = ('ini' in o)?o.ini:(i in ds)?ds[i]:'';

                    t=dm[i];
                    for(j in t)
                        if(!(j in o))
                            o[j]=t[j];
                    dm[i]=o;
                }
            }

            xui.each(hash,function(o,i){
                if(null===o || undefined===o || sc[i.charAt(0)])return;
                r=xui.str.initial(i);
                n = 'set'+r;
                //readonly properties
                if(o.set!==null && !(o && (o.readonly || o.inner))){
                    //custom set
                    var $set = o.set;
                    m = ps[n];
                    ps[n] = (typeof $set!='function' && typeof m=='function') ? m : Class._fun(function(value,force,tag,tag2){
                        return this.each(function(v){
                            if(!v.properties)return;

                            var t,nfz;
                            // *** force to em
                            if(xui.$uem(v.properties)){
                                if(dm[i] && dm[i]['$spaceunit'])
                                    if(value!='auto'&&(xui.isFinite(value )||xui.CSS.$isPx(value)))
                                        // only have root dom node
                                        if(v.getRootNode && (t=v.getRootNode())){
                                            if(!nfz)nfz=xui(t)._getEmSize();
                                            value=xui.CSS.$px2em(value, nfz)+'em';
                                        }
                            }else{
                                if(dm[i] && dm[i]['$spaceunit'])
                                    if(value!='auto'&& xui.CSS.$isEm(value))
                                        // only have root dom node
                                        if(v.getRootNode && (t=v.getRootNode())){
                                            if(!nfz)nfz=xui(t)._getEmSize();
                                            value=xui.CSS.$em2px(value, nfz, true)+'px';
                                        }
                            }
                            //if same return
                            if(v.properties[i] === value && !force)return;

                            if(v.$beforePropSet && false===v.$beforePropSet(i,value,force,tag,tag2)){
                                return;
                            }else{
                                var ovalue = v.properties[i];
                                if(v.beforePropertyChanged && false===v.boxing().beforePropertyChanged(v,i,value,ovalue))
                                    return;

                                if(typeof $set=='function'){
                                    $set.call(v,value,force,tag,tag2);
                                }else{
                                    var m = xui.get(v.box.$DataModel, [i, 'action']);
                                    v.properties[i] = value;
                                    if(typeof m == 'function' && v._applySetAction(m, value, ovalue, force, tag, tag2) === false)
                                        v.properties[i] = ovalue;
                                }

                                if(v.afterPropertyChanged)v.boxing().afterPropertyChanged(v,i,value,ovalue);
                                if(v.$afterPropertyChanged) xui.tryF(v.$afterPropertyChanged,[v,i,value,ovalue],v);
                            }
                        });
                    },n,self.KEY,null,'instance');
                    //delete o.set;
                    if(ps[n]!==m)ps[n].$auto$=1;
                }else
                    delete ps[n];
                n = 'get'+r;
                if(!(o && o.inner)){
                    // get custom getter
                    var $get = o.get;
                    m = ps[n];
                    ps[n] = (typeof $get!='function' && typeof m=='function') ? m : Class._fun(function(){
                        if(typeof $get=='function')
                            return $get.apply(this.get(0),arguments);
                        else
                            return this.get(0).properties[i];
                    },n,self.KEY,null,'instance');
                    //delete o.get;
                    if(ps[n]!==m)ps[n].$auto$=1;
                }else
                    delete ps[n];
            });
            return self;
        },
        setEventHandlers:function(hash){
            var self=this;
            xui.each(hash,function(o,i){
                if(null===o){
                    delete self.$EventHandlers[i];
                    delete self.prototype[i];
                }else{
                    self.$EventHandlers[i]=o;
                    var f=function(fun){
                        var l=arguments.length;
                        if(l==1 && (typeof fun == 'function' || typeof fun == 'string' || xui.isHash(fun) || xui.isArr(fun)))
                            return this.each(function(v){
                                if(v.renderId)
                                    v.clearCache();
                                if(v.box._addEventHanlder)v.box._addEventHanlder(v,i,fun);
                                v[i] =fun;
                            });
                        else if(l==1 && null===fun)
                            return this.each(function(v){
                                v.clearCache();
                                if(v.box._removeEventHanlder)v.box._removeEventHanlder(v,i,v[i]);
                                delete v[i];
                            });
                        else{
                            var args=[], v=this.get(0);
                            if(v){
                                var t=v[i], host=v.host || v,j,o,r;
                                if(t && (!xui.isArr(t) || t.length)){
                                    if(v.$inDesign)return;
                                    if(arguments[0]!=v)args[0]=v;
                                    for(j=0;j<l;j++)args[args.length]=arguments[j];
                                    v.$lastEvent=i;
                                    if(!xui.isArr(t))t=[t];
                                    l=t.length;
                                    if(xui.isNumb(j=t[0].event))args[j]=xui.Event.getEventPara(args[j]);
                                    var temp={};
                                    var n=0,fun=function(data){
                                        // set prompt's global var
                                        if(xui.isStr(this))temp[this+""]=data||"";
                                        //callback from [n]
                                        for(j=n;j<l;j++){
                                            n=j+1;
                                            o=t[j];
                                            if(typeof o=='string')o=host[o];
                                            if(typeof o=='function')r=xui.tryF(o, args, host);
                                            else if(xui.isHash(o)){
                                                if('onOK' in o ||'onKO' in o){
                                                    var resume=function(key,args){
                                                        if(fun)fun.apply(key,args);
                                                    };
                                                    // onOK
                                                    if('onOK' in o)onOK=(o.params||(o.params=[]))[parseInt(o.onOK,10)||0]=function(){
                                                       resume("okData",arguments);
                                                    };
                                                    if('onKO' in o)(o.params||(o.params=[]))[parseInt(o.onKO,10)||0]=function(){
                                                        resume("koData",arguments);
                                                    };
                                                    if(false===(r=xui.pseudocode.exec(o,args,host,temp,resume))){
                                                        n=temp=fun=null;
                                                    }
                                                    break;
                                                }else
                                                    if(false===(r=xui.pseudocode.exec(o,args,host,temp))){
                                                        n=j;break;
                                                    }
                                            }
                                        }
                                        if(n==j)n=temp=fun=null;
                                        return r;
                                    };
                                    return fun();
                                }
                            }
                        }
                    };
                    f.$event$=1;
                    f.$original$=o.$original$||self.KEY;
                    f.$name$=i;
                    f.$type$='event';
                    self.plugIn(i,f);
                }
            });
            return self;
        },
        unserialize:function(target,keepSerialId){
            if(typeof target=='string')target=xui.unserialize(target);
            var f=function(o){
                if(xui.isArr(o))o=o[0];
                delete o.serialId;
                if(o.children)xui.arr.each(o.children,f);
            }, a=[];
            xui.arr.each(target,function(o){
                if(!keepSerialId)f(o);
                a.push((new (xui.SC(o.key))(o)).get(0));
            });
            return this.pack(a,false);
        }
    },
    Instance:{
        clone:function(){
            var arr=[],clrItems=arguments,f=function(p){
                //remove those
                delete p.alias;
                for(var i=0;i<clrItems.length;i++)
                    delete p[clrItems[i]];
                if(p.children)
                    for(var i=0,c;c=p.children[i];i++)
                        f(c[0]);
            };
            this.each(function(o){
                o=o.serialize(false,true);
                f(o);
                arr.push(o);
            });
            return this.constructor.unserialize(arr);
        },
        serialize:function(rtnString, keepHost){
            var a=[];
            this.each(function(o){
                a[a.length]=o.serialize(false, keepHost);
            });
            return rtnString===false?a:a.length==1?" new "+a[0].key+"("+xui.serialize(a[0])+")":"xui.UI.unserialize("+xui.serialize(a)+")";
        },
        getProperties:function(key){
            var h={},prf=this.get(0),prop=prf.properties,funName;
            if(key===true)
                return xui.copy(prop);
            else if(typeof key=='string')
                return prop[key];
            else{
                for(var k in prop){
                    funName="get"+xui.str.initial(k);
                    if(typeof this[funName]=='function')
                        h[k]=this[funName].call(this);
                }
                return h;
            }
        },
        setProperties:function(key, value, force){
            if(typeof key=="string"){
                var h={};
                h[key]=value;
                key=h;
            }
            return this.each(function(o){
                xui.each(key, function(v,k){
                    var funName="set"+xui.str.initial(k),ins=o.boxing();
                    if(ins && typeof ins[funName]=='function'){
                        ins[funName].call(ins, v, !!force);
                    }
                    // can set hidden prop here
                    else{
                        o.properties[k]=v;
                    }
                });
            });
        },
        getEvents:function(key){
            return this.get(0).getEvents(key);
        },
        setEvents:function(key, value){
            if(typeof key=="string"){
                var h={};
                h[key]=value;
                key=h;
            }
            return this.each(function(o){
                var ins=o.boxing();
                xui.each(key, function(v,k){
                    if(typeof ins[k]=='function')
                        ins[k].call(ins, v);
                });
            });
        },
        alias:function(value){
            return value?this.setAlias(value):this.getAlias();
        },
        host:function(value, alias){
            return value?this.setHost(value, alias):this.getHost();
        },
        setHost:function(host, alias){
            return this._setHostAlias(host, alias);
        },
        _setHostAlias:function(host, alias){
            var self=this,
                  prf=this.get(0),
                  oldAlias=prf.alias;
            
            alias=alias||prf.alias;

            if(oldAlias){
                if(prf.host && prf.host!==prf){
                    try{delete prf.host[oldAlias]}catch(e){prf.host[oldAlias]=undefined}
                    if(prf.host._ctrlpool)
                        delete prf.host._ctrlpool[oldAlias];
                }
                delete self.constructor._namePool[oldAlias];
            }
            self.constructor._namePool[prf.alias=alias]=1;
            if(prf.box&&prf.box._syncAlias){
                prf.box._syncAlias(prf,oldAlias,alias);
            }

            if(host)prf.host=host;
            if(prf.host && prf.host!==prf){
                prf.host[alias]=self;
                if(prf.host._ctrlpool)
                    prf.host._ctrlpool[alias]=self.get(0);
            }
            return self;
        },
        setAlias:function(alias){
            return this._setHostAlias(null, alias);
        },
        getAlias:function(){
            return this.get(0).alias;
        },
        getHost:function(){
            return this.get(0).host;
        },
        reBindProp:function(dataMap, inner){
            var ns=this,prop,ins,fn,r,
                fun=function(){
                    ns.each(function(prf){
                        prop=prf.properties;
                        if(prop.propBinder && !xui.isEmpty(prop.propBinder)){
                            ins=prf.boxing();
                            xui.each(prop.propBinder, function(fun,key){
                                if(xui.isFun(fun)){
                                    r=fun(prf);
                                    if(key=="CA")
                                        ins.setCustomAttr(r);
                                    else if(key=="CC")
                                        ins.setCustomClass(r);
                                    else if(key=="CS")
                                        ins.setCustomStyle(r);
                                    else if(xui.isFun(ins[fn='set'+xui.str.initial(key)]))
                                        ins[fn](r,true);
                                }
                            });
                        }
                    });
            };

            if(!inner){
                var bak;
                if(window.get)bak=get;
                window.get=function(k){return xui.SC.get(k,dataMap)};
                try{fun();}catch(e){}finally{window.get=bak}
            }else fun();

            return this;
        }
        /*non-abstract inheritance must have those functions:*/
        //1. destroy:function(){delete this.box._namePool[this.alias];this.get(0).__gc();}
        //2. _ini(properties, events, host, .....){/*set _nodes with profile*/return this;}
        //3. render(){return this}
    }
});

Class("xui.Timer","xui.absObj",{
    Instance:{
        _ini:function(properties, events, host){
            var self=this,
                c=self.constructor,
                profile,
                options,
                alias,temp;
            if(properties && properties['xui.Profile']){
                profile=properties;
                alias = profile.alias || c.pickAlias();
            }else{
                if(properties && properties.key && xui.absBox.$type[properties.key]){
                    options=properties;
                    properties=null;
                    alias = options.alias;
                    alias = c.pickAlias();
                }else
                    alias = c.pickAlias();
                profile=new xui.Profile(host,self.$key,alias,c,properties,events, options);
            }
            profile._n=profile._n||[];

            for(var i in (temp=c.$DataStruct))
                if(!(i in profile.properties))
                    profile.properties[i]=typeof temp[i]=='object'?xui.copy(temp[i]):temp[i];

            //set anti-links
            profile.link(c._cache,'self').link(xui._pool,'xui');

            self._nodes.push(profile);
            profile.Instace=self;
            self.n0=profile;

            xui.asyRun(function(){
                if(profile&&profile.box)profile.boxing().start();
            });
            return self;
        },
        destroy:function(){
            this.each(function(profile){
                if(profile._threadid)xui.Thread(profile._threadid).abort();
                //free profile
                profile.__gc();
            });
        },
        start:function(){
            return this.each(function(profile){
                if(profile.$inDesign)return;

                var p=profile.properties,box=profile.boxing(),
                t=xui.Thread.repeat(function(threadId){
                    if(profile.onTime && false===box.onTime(profile,threadId))return false;
                }, p.interval, function(threadId){
                    profile.onStart && box.onStart(profile,threadId);
                }, function(threadId){
                    profile.onEnd && box.onEnd(profile,threadId);
                });
                profile._threadid = t.id;
            });
        },
        suspend:function(){
            return this.each(function(profile){
                if(profile._threadid)xui.Thread(profile._threadid).suspend();
                profile.onSuspend && box.onSuspend(profile,threadId);
            });
        },
        getParent:function(){
            return this.parent && this.parent.boxing();
        },
        getChildrenId:function(){
            return this.childrenId;
        }
    },
    Static:{
        _objectProp:{tagVar:1,propBinder:1},
        _beforeSerialized:function(profile){
            var o={};
            xui.merge(o, profile, 'all');
            var p = o.properties = xui.clone(profile.properties,true);
            if(profile.box._objectProp){
                for(var i in profile.box._objectProp)
                    if((i in p) && p[i] && xui.isHash(p[i]) && xui.isEmpty(p[i]))delete p[i];
            }
            return o;
        },
        DataModel:{
            "interval":1000
        },
        EventHandlers:{
            // return false will stop the Timer
            onTime:function(profile, threadId){},
            onStart:function(profile, threadId){},
            onSuspend:function(profile, threadId){},
            onEnd:function(profile, threadId){}
        }
    }
});