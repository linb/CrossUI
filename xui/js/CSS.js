xui.Class("xui.CSS", null,{
    Static:{
        _r:xui.browser.ie?'rules':'cssRules',
        _baseid:'xui:css:base',
        _firstid:'xui:css:first',
        _lastid:'xui:css:last',
        _reg1:/\.(\w+)\[CLASS~="\1"\]/g,
        _reg2:/\[ID"([^"]+)"\]/g,
        _reg3:/\*([.#])/g,
        _reg4:/\s+/g,
        _reg5:/\*\|/g,
        _reg6:/(\s*,\s*)/g,
        _rep:function(str){
            var ns=this;
            return str.replace(ns._reg1,'.$1')
                     .replace(ns._reg2,'#$1')
                     .replace(ns._reg3,'$1')
                     .replace(ns._reg4,' ')
                     .replace(ns._reg5,'')
                     .replace(ns._reg6,',').toLowerCase();
        },
        _appendSS:function(container,txt, id, before, attr){
            var fc=document.createElement('style');
            fc.type="text/css";
            if(id)fc.id=id;
            if(xui.browser.ie && fc.styleSheet && "cssText" in fc.styleSheet)
                fc.styleSheet.cssText = txt||'';
            else
                try{fc.appendChild(document.createTextNode(txt||''))}catch(p){fc.styleSheet.cssText = txt||''}
            if(attr){
                xui(fc).attr(attr);
            }
            if(before) xui(container).prepend(fc);
            else xui(container).append(fc);
            return fc;
        },
        _createCss:function(id, txt,last){
            var ns=this,
                head=this._getHead(),
                fid=ns._firstid,
                lid=ns._lastid,
                fc,
                c;
            fc=document.createElement('style');
            fc.type="text/css";
            fc.id=id;
            if(txt){
                if(xui.browser.ie && fc.styleSheet && "cssText" in fc.styleSheet)
                    fc.styleSheet.cssText = txt||'';
                else
                    try{fc.appendChild(document.createTextNode(txt||''))}catch(p){fc.styleSheet.cssText = txt||''}
            }
            if(!last){
                c= document.getElementById(fid) || head.firstChild;
                while((c=c.nextSibling) && !/^(script|link|style)$/i.test(''+c.tagName));
                if(c)
                    head.insertBefore(fc, c);
                else{
                    if(c= document.getElementById(lid))
                        head.insertBefore(fc, c);
                    else
                        head.appendChild(fc);
                }
            }else
                head.appendChild(fc);
            return fc;
        },
        _getCss:function(id, css, last){
            return document.getElementById(id) || this._createCss(id, css, last);
        },
        _getBase:function(){
            return this._getCss(this._baseid);
        },
        _getFirst:function(){
            return this._getCss(this._firstid);
        },
        _getLast:function(){
            return this._getCss(this._lastid, null, true);
        },
        _getHead:function(){
            return this._head || (this._head=document.getElementsByTagName("head")[0]||document.documentElement);
        },
        _check:function(){
            if(!xui.browser.ie)return;
            var count=0;
            for(var head = this._getHead(),i=0,t=head.childNodes,l;l=t[i++];)
                if(l.type=="text/css" )
                    count++
            return count>20;
        },
        get:function(property, value){
            for(var head = this._getHead(),i=0,t=head.childNodes,l;l=t[i++];)
                if(l.type=="text/css" && property in l && l[property]==value)
                    return l;
        },
        //if backOf==true, add to head last node
        //else add to the before position of the base styleSheet
        addStyleSheet:function(txt, id, backOf, force){
            var e, ns=this, head = ns._getHead(),
            add=function(txt,id,backOf){
                var e = document.createElement('style');
                e.type="text/css";
                if(id)e.id=id;
                //for ie
                if(xui.browser.ie && e.styleSheet && "cssText" in e.styleSheet)
                    e.styleSheet.cssText = txt||'';
                else
                    try{e.appendChild(document.createTextNode(txt||''))}catch(p){e.styleSheet.cssText = txt||''}
                if(backOf===-1){
                    if(head.firstChild) head.insertBefore(e, head.firstChild); 
                    else head.appendChild(e);
                }else if(backOf===1){
                    head.appendChild(e);
                }else{
                    head.insertBefore(e, backOf?ns._getLast():ns._getBase());
                }
                e.disabled=true;
                e.disabled=false;
                return e;
            },merge=function(txt,backOf){
                var e=backOf ?ns._getLast():ns._getBase();
                e.styleSheet.cssText +=txt;
                return e;
            };
            if(id && (id=id.replace(/[^\w\-\_\.\:]/g,'_')) && (e=ns.get('id',id))){
                if(force){
                    e.disabled=true;
                    head.removeChild(e);
                }
                else return e;
            }

            if(ns._check()){
                return merge(txt, backOf);
            }else
                return add(txt,id,backOf);
        },
        //if front==true, add to the before position of the base styleSheet
        //else add to the last postion
        includeLink:function(href, id, front, attrs){
            var e, ns=this, head = ns._getHead();
            if(href && (e=ns.get('href',href))){}else{
                e = document.createElement('link');
                e.type = 'text/css';
                e.rel = 'stylesheet';
                e.href = href;
                if(id)
                    e.id=id;
                e.media = 'all';
                xui.each(attrs,function(o,i){
                    e.setAttribute(i,o);
                });
            }
            head.insertBefore(e, front?ns._getBase():ns._getLast());
            e.disabled=true;
            e.disabled=false;
            return e;
        },
        remove:function(property,value){
            var head = this._getHead();
            if(value=this.get(property,value)){
                value.disabled=true;
                head.removeChild(value);
            }
        },
        replaceLink:function(href, property, oValue, nValue){
            var ns=this,
                head=ns._getHead(),
                attr={},e,v;
            attr[property]=nValue;
            e=ns.includeLink(href,null,false,attr);
            if(v=ns.get(property,oValue))
                head.replaceChild(e,v);
            e.disabled=true;
            e.disabled=false;
        },
        _build:function(selector, value, flag){
            var t='';
            xui.each(value,function(o,i){
                t += i.replace(/([A-Z])/g,"-$1").toLowerCase() + ":" + o +";";
            });
            return flag?t:selector+"{" + t + "}";
        },
        //selector: single css exp without ','; not allow '.a, .b{}'
        //  for *** IE *** allow single css exp only
        setStyleRules:function(selector, value, force){
            var ns=this,
                add=true,
                ds=document.styleSheets,
                target, target2, selectorText, bak, h, e, t, _t;
            selector = xui.str.trim(selector.replace(/\s+/g,' '));
            if(!(value&&force)){
                bak=selector.toLowerCase();
                xui.arr.each(xui.toArr(ds),function(o){
                    try{o[ns._r]}catch(e){return}
                    xui.arr.each(xui.toArr(o[ns._r]),function(v,i){
                        if(!v.selectorText)return;
                        if(v.disabled)return;
                        selectorText = ns._rep(v.selectorText);
                        /*Notice: in IE, no ',' in any selectorTExt*/
                        _t=selectorText.split(',');
                        //null=>remove
                        if(!value){
                            add=false;
                            if(xui.arr.indexOf(_t,bak)!=-1 && _t.length>1){
                                _t=xui.arr.removeFrom(_t,xui.arr.indexOf(_t,bak)).join(',');
                                t=v.cssText.slice(v.cssText.indexOf("{")+1,v.cssText.lastIndexOf("}"));
                                if(o.insertRule)
                                    o.insertRule(_t+"{" + t + "}", o[ns._r].length);
                                else if(o.addRule )
                                    o.addRule(_t, t||"{}");
                                if(o.deleteRule)
                                    o.deleteRule(i);
                                else
                                    o.removeRule(i);
                                o.disabled=true;
                                o.disabled=false;
                            }else if(selectorText == bak){
                                if(o.deleteRule)
                                    o.deleteRule(i);
                                else
                                    o.removeRule(i);
                                o.disabled=true;
                                o.disabled=false;
                            }
                        //modify the last one
                        }else{
                            //for single css exp, (all single css exp in IE)
                            if(selectorText==bak){target=v;return false}
                            //for multi css exps, not in IE
                            if(xui.arr.indexOf(_t,bak)!=-1){target2=v;return false}
                        }
                    },null,true);
                    if(target){
                        add=false;
                        try{
                            xui.each(value,function(o,i){
                                i=i.replace(/(-[a-z])/gi, function(m,a){return a.charAt(1).toUpperCase()});
                                target.style[i]= typeof o=='function'?o(target.style[i]):o;
                            })
                        }catch(e){}
                        o.disabled=true;
                        o.disabled=false;
                        return false;
                    //not in IE
                    }else if(target2){
                        add=false;
                        o.insertRule(ns._build(selector,value), o[ns._r].length);
                        o.disabled=true;
                        o.disabled=false;
                        return false;
                    }
                },null,true);
            }
            //need to add
            if(force || add)
                ns._addRules(selector,value);
            return ns;
        },
        $getCSSValue:function(selector, cssKey, cssValue, ownerNode){
            var ns=this,
                k=ns._r, css,
                ds=document.styleSheets,
                l=ds.length,m, o,v,i,j,
                selectorText;
            selector=xui.str.trim(selector.replace(/\s+/g,' ').toLowerCase());
            for(i=l-1; i>=0; i--){
                try{
                    //firefox cracker
                    o=ds[i][k];
                }catch(e){continue;}
                if(!ds[i].disabled){
                    o=ds[i][k];
                    if(o){
                        m=o.length;
                        for(j=m-1; j>=0; j--){
                            if((v=o[j]).selectorText && !v.disabled){
                                selectorText = ns._rep(v.selectorText);
                                if(xui.arr.indexOf(selectorText.split(/\s*,\s*/g),selector)!=-1){
                                    if(!cssKey){
                                        (css=css||[]).push(v);
                                    }else{
                                        if(!cssValue){
                                            if(!ownerNode || (ownerNode==ds[i].ownerNode||ds[i].owningElement))
                                                if(v.style[cssKey]!=='')
                                                    // return cssValue
                                                    // replace is crack for opera
                                                    return (v.style[cssKey]||"").replace(/^\"|\"$/g,'');
                                        }else if(cssValue===v.style[cssKey]){
                                            // return css dom node
                                            return ds[i].ownerNode||ds[i].owningElement ;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // return all stylesheets named cssKey
            return css;
        },
        _addRules:function(selector,value){
            var ns=this,
                target=ns._getLast(),
                changed=target.sheet || target.styleSheet;
            if(changed.insertRule)
                changed.insertRule(ns._build(selector,value), changed[ns._r].length);
            else if(changed.addRule )
                changed.addRule(selector, ns._build(selector,value,true)||"{}");
            target.disabled=true;
            target.disabled=false;
            return ns;
        },
        /*resetCSS:function(){
            var css = '';
            this.addStyleSheet(css,"xui.CSSreset");
        },*/
        adjustFont:function(fontSize, fontFamily, fontWeight, fontStyle){
            if(fontSize)xui('html').css('font-size', fontSize);
            if(fontFamily)xui('html').css('font-family', fontFamily);
            if(fontWeight)xui('html').css('font-weight', fontWeight);
            if(fontStyle)xui('html').css('font-style', fontStyle);

            this._dftEmStr='';
            this._getDftEmSize(true);
            this._dftRemStr='';
            this._getDftRemSize(true);
            if(xui.UI)
                xui.UI.getAll().reLayout(true);
        },
        _dftEmStr:'',
        _dftEm:0,
        _getDftEmSize: function(force){
            var ns=this;
            if(force || !ns._dftEm){
                var fz=ns.$getCSSValue('.xui-ui-ctrl','fontSize'),num;

                // only can be triggerred by modifing font-size of '.xui-ui-ctrl' itslef.
                if(!ns._dftEmStr || ns._dftEmStr!=fz){
                    num=parseFloat(fz);
                    if(num && ns.$isPx(fz)){
                        ns._dftEm=num;

                        ns._dftEmStr=fz;
                    }else if(num && ns.$isRem(fz)){
                        ns._dftEm=num*ns._getDftRemSize();

                        ns._dftEmStr=fz;
                    }else{
                        var div;
                        xui('body').append(div=xui.create('<div class="xui-ui-ctrl" style="height:1em;visibility:hidden;position:absolute;border:0;margin:0;padding:0;left:-10000px;"></div>'));
                        ns._dftEm=div.get(0).offsetHeight;
                        div.remove();

                        ns._dftEmStr=ns._dftEm+"px";
                    }
                }
            }
            return ns._dftEm;
        },
        $resetEm:function(){
            delete xui.CSS._dftEm;
        },
        _dftRemStr:'',
        _dftRem:0,
        _getDftRemSize: function(force){
            var ns=this;
            if(force || !ns._dftRem)
                ns._dftRem=parseFloat(xui('html').css('font-size'))||16;
            return ns._dftRem;
        },
        $resetRem:function(){
            delete xui.CSS._dftRem;
        },
        $isEm:function(value){
            return (!value||value=='auto')? xui.$us()==1 : /^-?((\d\d*\.\d*)|(^\d\d*)|(^\.\d\d*))em$/i.test(xui.str.trim(value+''));
        },
        $isRem:function(value){
            return (!value||value=='auto')? xui.$us()==1 : /^-?((\d\d*\.\d*)|(^\d\d*)|(^\.\d\d*))rem$/i.test(xui.str.trim(value+''));
        },
        $isPx:function(value){
            return (!value||value=='auto')? xui.$us()==1  : /^-?((\d\d*\.\d*)|(^\d\d*)|(^\.\d\d*))px$/i.test(xui.str.trim(value+''));
        },

        $em2px:function(value, node, roundPx){
            value = (!value||value=='auto')?value:(xui.isFinite(value) || this.$isEm(value)) ? (parseFloat(value)||0) * (node?xui.isFun(node)?node():xui.isFinite(node)?node:xui(node)._getEmSize():this._getDftEmSize()||this._getDftEmSize()) : value;
            return roundPx?Math.round(parseFloat(value)||0):value;
        },
        $px2em:function(value, node, roundPx){
            return (!value||value=='auto')?value:(xui.isFinite(value) || this.$isPx(value)) ?  (roundPx?Math.round(parseFloat(value)||0):(parseFloat(value)||0)) / (node?xui.isFun(node)?node():xui.isFinite(node)?node:xui(node)._getEmSize():this._getDftEmSize()||this._getDftEmSize()): value;
        },
        $rem2px:function(value, roundPx){
            value = (!value||value=='auto')?value:(xui.isFinite(value) || this.$isRem(value)) ? (parseFloat(value)||0) * this._getDftRemSize() : value;
            return roundPx?Math.round(parseFloat(value)||0):value;
        },
        $px2rem:function(value, roundPx){
            return (!value||value=='auto')?value:(xui.isFinite(value) || this.$isPx(value)) ?  (roundPx?Math.round(parseFloat(value)||0):(parseFloat(value)||0)) / this._getDftRemSize(): value;
        },
        $em2rem:function(value, node){
            return (!value||value=='auto') ? value : (xui.isFinite(value) || this.$isEm(value)) ? (parseFloat(value)||0)  * (node?xui.isFinite(node)?node:xui(node)._getEmSize():this._getDftEmSize()||this._getDftEmSize()) / this._getDftRemSize() : value;
        },
        $rem2em:function(value, node){
            return (!value||value=='auto') ? value : (xui.isFinite(value) || this.$isRem(value)) ? (parseFloat(value)||0)  * this._getDftRemSize() / (node?xui.isFinite(node)?node:xui(node)._getEmSize():this._getDftEmSize()||this._getDftEmSize()) : value;
        },
        $px:function(value, node, roundPx){
            value = ((!xui.isFinite(value)&&this.$isRem(value))?this.$rem2px(value,roundPx):this.$isEm(value)?this.$em2px(value, node, roundPx):(!value||value=='auto')?value:(parseFloat(value)||0));
            return roundPx?Math.round(parseFloat(value)||0):value;
        },
        $em:function(value, node, roundPx){
            return ((xui.isFinite(value)||this.$isPx(value))?this.$px2em(value, node,roundPx):this.$isRem(value)?this.$rem2em(value, node):(!value||value=='auto')?value:(parseFloat(value)||0));
        },
        $rem:function(value, node, roundPx){
            return ((xui.isFinite(value)||this.$isPx(value))?this.$px2rem(value,roundPx):this.$isEm(value)?this.$em2rem(value,node):(!value||value=='auto')?value:(parseFloat(value)||0));
        },
        $addpx:function(a,b,node){
            if(a=='auto')return a;
            if(this.$isRem(a)){
                return this.$px2rem(Math.round(this.$rem2px(a)+(parseFloat(b)||0)))+'rem';
            }else if(this.$isEm(a)){
                return this.$px2em(Math.round(this.$em2px(a,false,node)+(parseFloat(b)||0)))+'em';
            }else{
                return Math.round((parseFloat(a)||0)+(parseFloat(b)||0))+'px';
            }
        },
        $forceu:function(v,u,node,roundPx){
            return (v===null||v===undefined||v===''||v=='auto') ? v:
                ( u ? u=='rem' : (xui.$us()===0)) ? this.$rem(v,node,roundPx!==false)+'rem':
                ( u ? u=='em' : (xui.$us()==1)) ? this.$em(v,node,roundPx!==false)+'em':
                Math.round(this.$px(v,node,roundPx!==false))+'px'
        },
       
        $picku:function(v){return v && v!='auto' && (v+'').replace(/[-\d\s.]*/g,'') || (xui.$us()==1?'em':'px')},
        $addu:function(v){return v=='auto'?v:(xui.isFinite(v)||this.$isPx(v))?Math.round(parseFloat(v)||0)+'px':v+''}
    },
    Initialize:function(){
        var b=xui.browser,
            inlineblock= (b.gek
                    ? b.ver<3 
                        ? ((b.ver<3?"-moz-outline-offset:-1px !important;":"") + "display:-moz-inline-block;display:-moz-inline-box;display:inline-block;")
                        :"display:inline-block;"
                    : b.ie6
                        ?"display:inline-box;display:inline;"
                    :"display:inline-block;")+
                (b.ie?"zoom:1;":""),
            css =  ".xui-node{margin:0;padding:0;line-height:1.22;-webkit-text-size-adjust:none;}"+
            ".xui-node-highlight{color:#000;}"+
            ".xui-title-node{}"+
            ".xuifont-hover, .xuicon-hover{ color: #686868; }"+
            (!xui.browser.fakeTouch && xui.browser.deviceType != 'touchOnly'?".xuifont-active, .xuicon-active{ color: #3393D2; }":"")+
            ".xuifont-checked, .xuicon-checked{ color: #3393D2; }"+
            
            ".xui-wrapper{color:#000;font-family:arial,helvetica,clean,sans-serif;font-style:normal;font-weight:normal;vertical-align:middle;}"+
            ".xui-cover{cursor:wait;background:url("+xui.ini.img_bg+") transparent repeat;opacity:1;}"+
            ".xui-node-table{border-collapse:collapse;border-spacing:0;empty-cells:show;font-size:inherit;"+(b.ie?"font:100%;":"")+"}"+
            ".xui-node-fieldset,.xui-node-img{border:0;}"+
            ".xui-node-ol,.xui-node-ul,.xui-node-li{list-style:none;}"+
            ".xui-node-caption,.xui-node-th{text-align:left;}"+
            ".xui-node-th{font-weight:normal;}"+
            ".xui-node-q:before,.xui-node-q:after{content:'';}"+
            ".xui-node-abbr,.xui-node-acronym{border:0;font-variant:normal;}"+
            ".xui-node-sup{vertical-align:text-top;}"+
            ".xui-node-sub{vertical-align:text-bottom;}"+
            ".xui-node-input,.xui-node-textarea,.xui-node-select{cursor:text;font-family:inherit;font-size:inherit;font-weight:inherit;"+(b.ie?"font-size:100%;":"")+"}"+
            ".xui-node-del,.xui-node-ins{text-decoration:none;}"+
            ".xui-node-pre,.xui-node-code,.xui-node-kbd,.xui-node-samp,.xui-node-tt{font-family:monospace;"+(b.ie?"font-size:108%;":"")+"line-height:100%;}"+
// dont use font(use font-size/font-family) in IE678
            ".xui-node-select,.xui-node-input,.xui-node-textarea{font-family:arial,helvetica,clean,sans-serif;border-width:1px;}"+
            ((b.ie && b.ver<=8)?".xui-node-input{overflow:hidden;}":"")+
// base setting
            ".xui-node-a, .xui-node-a .xui-node{cursor:pointer;color:#0000ee;text-decoration:none;}"+
            ".xui-node-a:hover, .xui-node-a:hover .xui-node{color:red}"+
            (b.gek? (".xui-node-a:focus{outline-offset:-1px;"+ (b.ver<3?"-moz-outline-offset:-1px !important":"") +"}" ):"")+
            ".xui-node-span, .xui-node-div{border:0;}"+
            ((b.ie && b.ver<=8)?"":".xui-node-span:not(.xui-showfocus):focus, .xui-node-div:not(.xui-showfocus):focus{outline:0;}.xui-showfocus:focus{outline-width: 1px;outline-style: dashed;}")+
            ".xui-node-span, .xui-wrapper span"+((b.ie && b.ver<=7)?"":", .xui-v-wrapper:before, .xui-v-wrapper > .xui-v-node")+"{outline-offset:-1px;"+
            inlineblock+
            "}"+
            ".xui-node-h1,.xui-node-h2,.xui-node-h3,.xui-node-h4,.xui-node-h5,.xui-node-h6{font-size:100%;font-weight:normal;}"+
            ".xui-node-h1{font-size:138.5%;}"+
            ".xui-node-h2{font-size:123.1%;}"+
            ".xui-node-h3{font-size:108%;}"+
            ".xui-node-h1,.xui-node-h2,.xui-node-h3{margin:1em 0;}"+
            ".xui-node-h1,.xui-node-h2,.xui-node-h3,.xui-node-h4,.xui-node-h5,.xui-node-h6,.xui-node-strong{font-weight:bold;}"+
            ".xui-node-em{font-style:italic;}"+
            ".xui-node-legend{color:#000;}"+
            (b.ie6?("#"+xui.$localeDomId+"{vertical-align:baseline;}"):"")+
            
            // some cross browser css solution
            ".xui-nofocus:focus{outline:0;}"+
            ".xui-cls-wordwrap{"+
                "white-space: pre-wrap;word-break: break-all;" + // css-3
                (b.gek?"white-space: -moz-pre-wrap;":"") +  // Mozilla, since 1999
                (b.opr?"white-space: -pre-wrap;":"") + // Opera 4-6
                (b.opr?"white-space: -o-pre-wrap;":"") + // Opera 7
                (b.ie?"word-wrap: break-word;":"")+ // Internet Explorer 5.5+
           "}"+
           ((b.ie && b.ver<=8)?"":(".xui-v-wrapper:before{content:'';height:100%;font-size:0;vertical-align:middle;}"+
           ".xui-v-wrapper > .xui-v-node{vertical-align:middle;}"+
           ".xui-v-top > .xui-v-wrapper:before{vertical-align:top;}"+
           ".xui-v-top > .xui-v-wrapper > .xui-v-node{vertical-align:top;}"+
           ".xui-v-bottom > .xui-v-wrapper:before{vertical-align:bottom;}"+
           ".xui-v-bottom > .xui-v-wrapper > .xui-v-node{vertical-align:bottom;}"))+
            ".xui-node-tips{background-color:#FDF8D2;}"+

            // must here for get correct base font size
            ".xuifont, .xuicon{font-size:1.3333333333333333em;line-height:1em;}"+
            ".xuicon{margin: 0 .25em;"+
            inlineblock +
            "}" +
            ".xuicon:before{height:1em;width:1em;}" + 
            ".xui-ui-ctrl, .xui-ui-reset{font-family:arial,helvetica,clean,sans-serif; font-style:normal; font-weight:normal; vertical-align:middle; color:#000; }" + 
            //xui-ui-ctrl must be after xui-ui-reset
            ".xui-ui-reset{font-size: inherit;}"+
            // html(default 10px) > .xui-ui-ctrl(rem) > inner nodes(em)
            ".xui-ui-ctrl{cursor:default;font-size:1rem;}"+
            ".xui-title-node{font-size:1.1667em  !important;}"+
            ".setting-uikey{font-family:'default'}"
           ;

        this.addStyleSheet(css, 'xui.CSS');
        
        /*
        xui.Thread.repeat(function(t){
            if((t=xui.CSS._dftEm) && (t!==xui.CSS._getDftEmSize(true)))xui.CSS.adjustFont();
        }, 10000);
        */
    }   
});