xui.Class("xui.svg", "xui.UI",{
    Before:function(key, parent_key, o){
        xui.absBox.$type[key.replace("xui.","")]=xui.absBox.$type[key]=key;
        return true;
    },
    Initialize:function(){
        if(typeof(Raphael)=="function"){
            Raphael._availableAttrs.href="";
            Raphael._availableAttrs.title="";
    
            Raphael.el.shadow = function () {
                var ns=this;
                if (ns.type == "text")return null;
                ns._.dirty=true;
                var sw=ns.attr("stroke-width"),
                    f=ns.attr("fill"),
                    o=ns.attr("opacity"),
                    fo=ns.attr("fill-opacity"),
                    tr=ns.attr("transform"),
                    c = 4,
                    r = ns.paper,
                    out = r.set(),
                    bbox = ns._getBBox(false),
                    rx=!bbox.width?0:(bbox.width+sw-c-4)/bbox.width,
                    ry=!bbox.height?0:(bbox.height+sw-c-4)/bbox.height,
                    path = ns.getPath();
                // path = ns.matrix ? Raphael.mapPath(path, ns.matrix) : path;
                if(f!=='none' && fo!==0)
                    path = Raphael.transformPath(path, "t"+(sw/2)+","+(sw/2)+"s"+rx+","+ry+","+(bbox.x+bbox.width+sw)+","+(bbox.y+bbox.height+sw));
                else
                    path = Raphael.transformPath(path, "t"+c/2+","+c/2);
    
                for (var i=1,s; i < c+1; i++) {
                    s=r.path(path).attr({
                        stroke: "#666",
                        fill: f=='none'?'none':'#555',
                        "fill-opacity": fo,
                        "stroke-linejoin": "round",
                        "stroke-linecap": "round",
                        "stroke-width": 2*i,
                        opacity: (.2 * (1-i/c) + .05)*o
                    });
                    s._decoration=1;
                    out.push(s);
                }
                if(tr && tr.length)
                    out.transform(tr);
                return out.insertBefore(ns);
            };
            
            var  r = function(){
                var m=arguments, g = m.length, b=0, a;
                for (;b<g;b++)if ((a = m[b]) || !(a !== !1 && a !== 0)) return a;
            },
            u = function(){
                var m=arguments, g = m.length, b=0, a;
                for (;b <g;b++)if((a = m[b]) || !(a !== !1 && a !== 0)) if (!isNaN(a = Number(a))) return a;
            },
            t = function(m){
                return "matrix(" + [ m.get(0), m.get(1), m.get(2), m.get(3), m.get(4), m.get(5) ].join() + ")";
            },
            h = /^matrix\(|\)$/g, 
            M = /\,/g, 
            e = /\n|<br\s*?\/?>/gi, 
            k = /[^\d\.]/gi, 
            V = /[\(\)\s,\xb0#]/g, 
            ga = /group/gi, 
            w = /&/g, 
            Q = /"/g, K = /'/g, 
            G = /</g, aa = />/g, 
            A = 0,
            l = Math, D = parseFloat, q = l.max, j = l.abs, s = l.pow, fa = String, ea = /[, ]+/, U = [ {
                reg: /xmlns\=\"http\:\/\/www.w3.org\/2000\/svg\"/gi,
                str: ""
            }, {
                reg: /^.*<svg /,
                str: '<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" '
            }, {
                reg: /\/svg>.*$/,
                str: "/svg>"
            }, {
                reg: /\<desc[\s\>][^\<]*\<\/desc\>/,
                str: ""
            }, {
                reg: /zIndex="[^"]+"/g,
                str: ""
            }, {
                reg: /url\((\\?[\'\"])[^#]+#/g,
                str: "url($1#"
            }, {
                reg: / href=/g,
                str: " xlink:href="
            }, {
                reg: /(id|class|width|height)=([^" >]+)/g,
                str: '$1="$2"'
            }, {
                reg: /:(path|rect)/g,
                str: "$1"
            }, {
                reg: /\<ima?ge? ([^\>]+?)[^\/]\>/gi,
                str: "<image $1 />"
            }, {
                reg: /\<\/ima?ge?\>/g,
                str: ""
            }, {
                reg: /style="([^"]+)"/g,
                str: function(e) {
                    return e.toLowerCase();
                }
            } ], 
            W = {
                blur: function() {},
                transform: function() {},
                src: function(e, d) {
                    d.attrSTR += ' xlink:href="' + d.attrs.src + '"';
                },
                path: function(e, d) {
                    var h = d.attrs.path, h = Raphael._pathToAbsolute(h || "");
                    d.attrSTR += ' d="' + (h.toString && h.toString() || "").replace(M, " ") + '"';
                },
                gradient: function(e, d, h) {
                    var b = e.attrs.gradient, f = "linear", a, g, c = .5, k = .5, r = g = "", u = "";
                    a = b.replace(V, "_");
                    if (!h[a]) {
                        b = fa(b).replace(Raphael._radial_gradient, function(a, b, e) {
                            f = "radial";
                            b && e && (c = D(b), k = D(e), a = (k > .5) * 2 - 1, s(c - .5, 2) + s(k - .5, 2) > .25 && (k = l.sqrt(.25 - s(c - .5, 2)) * a + .5) && k != .5 && (k = k.toFixed(5) - 1e-5 * a));
                            return "";
                        });
                        b = b.split(/\s*\-\s*/);
                        if (f === "linear") {
                            g = b.shift();
                            g = -D(g);
                            if (isNaN(g)) return null;
                            var w = [ 0, 0, l.cos(Raphael.rad(g)), l.sin(Raphael.rad(g)) ];
                            g = 1 / (q(j(w[2]), j(w[3])) || 1);
                            w[2] *= g;
                            w[3] *= g;
                            w[2] < 0 && (w[0] = -w[2], w[2] = 0);
                            w[3] < 0 && (w[1] = -w[3], w[3] = 0);
                        }
                        b = Raphael._parseDots(b);
                        if (!b) return null;
                        f === "radial" ? (g = '<radialGradient fx = "' + c + '" fy = "' + k + '" id = "' + a + '">', 
                        r = "</radialGradient>") : (g = '<linearGradient x1 = "' + w[0] + '" y1 = "' + w[1] + '" x2 = "' + w[2] + '" y2 = "' + w[3] + '" gradientTransform ="matrix(' + e.matrix.invert() + ')" id = "' + a + '">', 
                        r = "</linearGradient>");
                        e = 0;
                        for (w = b.length; e < w; e++) u += '<stop offset="' + (b[e].offset ? b[e].offset : e ? "100%" : "0%") + '" stop-color="' + (b[e].color || "#fff") + '" stop-opacity="' + (b[e].opacity === void 0 ? 1 : b[e].opacity) + '" />';
                        h[a] = !0;
                        h.str += g + u + r;
                    }
                    d.attrSTR += " fill=\"url('#" + a + "')\"";
                },
                fill: function(e, d) {
                    var h = d.attrs, b = h.fill, f;
                    if (!e.attrs.gradient) if (b = Raphael.color(b), f = b.opacity, e.type === "text") d.styleSTR += "fill:" + b + "; stroke-opacity:0; "; else if (d.attrSTR += ' fill="' + b + '"', 
                    !h["fill-opacity"] && (f || f === 0)) d.attrSTR += ' fill-opacity="' + f + '"';
                },
                stroke: function(e, d) {
                    var h = d.attrs, b, f;
                    b = Raphael.color(h.stroke);
                    f = b.opacity;
                    if (e.type !== "text" && (d.attrSTR += ' stroke="' + b + '"', !h["stroke-opacity"] && (f || f === 0))) d.attrSTR += ' stroke-opacity="' + f + '"';
                },
                "clip-rect": function(e, d, i) {
                    var b = fa(d.attrs["clip-rect"]), f = b.split(ea), b = b.replace(V, "_") + "__" + A++;
                    f.length === 4 && (i[b] || (i[b] = !0, i.str += '<clipPath id="' + b + '"><rect x="' + f[0] + '" y="' + f[1] + '" width="' + f[2] + '" height="' + f[3] + '" transform="matrix(' + t(e.matrix.invert()).replace(h, "") + ')"/></clipPath>'), 
                    d.attrSTR += ' clip-path="url(#' + b + ')"');
                },
                cursor: function(e, d) {
                    var h = d.attrs.cursor;
                    h && (d.styleSTR += "cursor:" + h + "; ");
                },
                font: function(e, d) {
                    d.styleSTR += "font:" + d.attrs.font.replace(/\"/gi, " ") + "; ";
                },
                "font-size": function(e, d) {
                    var h = r(d.attrs["font-size"], "10");
                    h && h.replace && (h = h.replace(k, ""));
                    d.styleSTR += "font-size:" + h + "px; ";
                },
                "font-weight": function(e, d) {
                    d.styleSTR += "font-weight:" + d.attrs["font-weight"] + "; ";
                },
                "font-family": function(e, d) {
                    d.styleSTR += "font-family:" + d.attrs["font-family"] + "; ";
                },
                "line-height": function() {},
                "clip-path": function() {},
                visibility: function() {},
                "vertical-align": function() {},
                "text-anchor": function(e, d) {
                    var h = d.attrs["text-anchor"] || "middle";
                    e.type === "text" && (d.attrSTR += ' text-anchor="' + h + '"');
                },
                title: function() {},
                text: function(d, h) {
                    var i = h.attrs, b = i.text, f = r(i["font-size"], i.font, "10"), a = r(i["line-height"]), g;
                    f && f.replace && (f = f.replace(k, ""));
                    f = u(f);
                    a && a.replace && (a = a.replace(k, ""));
                    a = u(a, f && f * 1.2);
                    g = f ? f * .85 : a * .75;
                    for (var f = i.x, c = r(i["vertical-align"], "middle").toLowerCase(), b = fa(b).split(e), i = b.length, l = 0, c = c === "top" ? g : c === "bottom" ? g - a * i : g - a * i * .5; l < i; l++) h.textSTR += "<tspan ", 
                    g = (b[l] || "").replace(w, "&amp;").replace(Q, "&quot;").replace(K, "&#39;").replace(G, "&lt;").replace(aa, "&gt;"), 
                    h.textSTR += l ? 'dy="' + a + '" x="' + f + '" ' : 'dy="' + c + '"', h.textSTR += ">" + g + "</tspan>";
                }
            }, 
            X = function(e, i) {
                var k = "", b = {
                    attrSTR: "",
                    styleSTR: "",
                    textSTR: "",
                    attrs: e.attr()
                }, f = "", a = "", g = "", c, l, j = b.attrs;
                if (e.node.style.display !== "none") {
                    for (c in j) if (c !== "gradient" && (Raphael._availableAttrs[c] !== void 0 || W[c])) if (W[c]) W[c](e, b, i); else b.attrSTR += " " + c + '="' + j[c] + '"';
                    e.attrs.gradient && W.gradient(e, b, i);
                    e.type === "rect" && j.r && (b.attrSTR += ' rx="' + j.r + '" ry="' + j.r + '"');
                    for (l in e.styles) b.styleSTR += l + ":" + e.styles[l] + "; ";
                    e.type === "image" && (b.attrSTR += ' preserveAspectRatio="none"');
                    e.bottom && (a = X(e.bottom, i));
                    e.next && (g = X(e.next, i));
                    f = e.type;
                    f.match(ga) && (f = "g");
                    k += "<" + f + ' transform="matrix(' + t(e.matrix).replace(h, "") + ')" style="' + b.styleSTR + '"' + b.attrSTR + ">" + b.textSTR + a + "</" + f + ">" + g;
                } else e.next && (k += X(e.next, i));
                return k;
            };
            Raphael.fn.toSVG = function(includeImage) {
                var d = "", h = {str: ""}, b = 0, f = U.length, a = "";
                if (Raphael.svg) {
                    if (this.canvas && this.canvas.parentNode) 
                        for (d = this.canvas.parentNode.innerHTML; b < f; b += 1) 
                            h = U[b], d = d.replace(h.reg, h.str);
                } else{
                    d = '<svg style="overflow: hidden; position: relative;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + this.width + '" version="1.1" height="' + this.height + '">';
                    if(this.bottom){
                        a = X(this.bottom, h);
                        d += "<defs>" + h.str + "</defs>" + a + "</svg>";
                    }
                }
                if(!includeImage){
                    d = d.replace(/\<image [^\>]*\>/gi, "");
                }
                return d;
            };
        }

        var attr={
            "arrow-start":1,
            "arrow-end":1,
            "clip-rect":1,
            "fill":1, // Radial gradients can only be applied to circles and ellipses.
            "fill-opacity":1,
//            "href":1,
//            "target":1,
            "title":1,
            "cursor":1,
            "transform":1,
            "opacity":1,
            "stroke":1,
            "stroke-dasharray":1,
            "stroke-linecap":1,
            "stroke-linejoin":1,
            "stroke-miterlimit":1,
            "stroke-opacity":1,
            "stroke-dashoffset":1,
            "stroke-width":1
        };
        this.$attr={
            circle:{cx:1,cy:1,r:1},
            ellipse:{cx:1,cy:1,rx:1,ry:1},
            rect:{x:1,y:1,r:1,width:1,height:1},
            text:{x:1,y:1,text:1,font:1,"font-family":1,"font-style":1,"font-size":1,"font-weight":1,"text-anchor":1,"letter-spacing":1},
            image:{src:1,x:1,y:1,width:1,height:1},
            path:{path:1}
        };
        xui.each(this.$attr,function(o) {
            xui.merge(o,attr);
        });

        var o=this.$attr.text;
        delete o["arrow-start"];
        delete o["arrow-end"];
        delete o["stroke-dasharray"];
        delete o["stroke-linecap"];
        delete o["stroke-linejoin"];
        delete o["stroke-miterlimit"];
        delete o["stroke-opacity"];
//        delete o['stroke-dashoffset'];
        delete o["stroke-width"];
        
        delete this.prototype.toHtml;
    },
    Instance:{
        initialize:function(){
            if(typeof(Raphael)!="function")throw "Browser doesn't suppor SVG or VML, all diagram functions were disabled!";
        },
        getAttr:function(key){
            var prf=this.get(0);
            if(prf){
                var prop=prf.properties,
                    dftAttr=Raphael._availableAttrs,
                    attr=prf.box.ISCOMBO?prop.attr:{KEY:prop.attr},node;

                if(prf._elset){
                    prf._elset.forEach(function(el){
                        var key1=el.type,tag=prf.getKey(el.node.id,true);
                        if(!key || key===tag){
                            node=el.node;
                            if(node&&('raphaelid' in node)){
                                var paper=prf.boxing().getPaper();
                                if(paper && (node=paper.getById(node.raphaelid))){
                                    var attf=node.attr();
                                    xui.filter(attf,function(o,i){
                                        if(i=='transform' && xui.isArr(o) && o.length===0)o="";
                                        // get the simple transform string
                                        if(i=='transform' && o)
                                            o=node.matrix.toTransformString();

                                        // special for text
                                        if(key1=='text'){
                                            if(i=='stroke') return o!="none";
                                            if(i=='fill') return o!="#000";
                                            if(tag!="KEY" && ('hAlign' in prf.box.$DataModel) && (i=='x'||i=='y'))return false;
                                        }
                                        if(tag!="KEY" &&  i=='transform')return false;
                                        return o!=dftAttr[i];
                                    });
                                    // keep the  original src attr
                                    if('src' in attf && 'src' in attr[tag])
                                        attf.src=attr[tag].src;
                                    attr[tag]=attf;
                                }
                            }
                        }
                    });
                }
            }
            // filter
            attr=prf.box._adjustAttr(attr);
            return prf.box.ISCOMBO? (key?attr[key]:attr) :attr.KEY;
        },
        setAttr:function(key, attr, reset, notify){
            if(xui.isHash(key))attr=key;
            else{
                var h={};
                h[key]=attr;
                attr=h;
                key=key||"KEY";
            };
            reset=reset!==false;
            return this.each(function(prf){
                var prop=prf.properties,node,
                    dftAttr=Raphael._availableAttrs,
                    oAttr=prf.box._adjustAttr(prop.attr),
                    attr2=prf.box._adjustAttr(attr);
                if(reset){
                    // add dft attr to reset the old attr
                    xui.each(oAttr,function(o,i){
                        if(!(i in attr2)){
                            attr2[i]={};
                        }

                        xui.each(o,function(o1,i1){
                            if(!(i1 in attr2[i])){
                                attr2[i][i1]=dftAttr[i1];
                                // special for text
                                if((prf.box.$tagName[i]|| i.split("_")[0].toLowerCase())=='text'){
                                    if(i1=='stroke') attr2[i][i1]="none";
                                    if(i1=='fill') attr2[i][i1]="#000";
                                }
                            }
                        });
                        // special for text
                        if((prf.box.$tagName[i]|| i.split("_")[0].toLowerCase())=='text'){
                            if(i!="KEY" && ('hAlign' in prf.box.$DataModel) ){
                                delete attr2[i].x;
                                delete attr2[i].y;
                            }
                        }
                        if(i!="KEY"){
                            delete attr2[i].transform;
                        }
                    });
                }

                if(prf._elset){
                    prf._elset.forEach(function(el){
                        var key1=el.type,tag=prf.getKey(el.node.id,true);
                        if(xui.isHash(key) || key===tag){
                            node=el.node;
                            if(node&&('raphaelid' in node)){
                                var paper=prf.boxing().getPaper();
                                if(paper && (node=paper.getById(node.raphaelid))){
                                    var rattr=xui.copy(attr2[tag]);
                                    if(rattr){
                                        if('src' in rattr)
                                            rattr.src = xui.adjustRes(rattr.src);
                                        node.attr(rattr);
                                    }
                                }
                            }
                        }
                    });

                    var ot=attr2.KEY,
                        shapeChanged=ot && ('x' in ot
                        || 'y' in ot
                        || 'width' in ot
                        || 'height' in ot
                        || 'r' in ot
                        || 'rx' in ot
                        || 'ry' in ot
                        || 'path' in ot
                        || 'transform' in ot
                        || 'arrow-start' in ot
                        || 'arrow-end' in ot);
                    if(ot){
                        var ss=prf._elset;
                        if(ss[1]){
                            // sync transform
                            if('transform' in ot){
                                for(var i=1,l=ss.length;i<l;i++)
                                    ss[i].attr('transform', ot.transform);
                            }
                        }
                        if(notify!==false)
                            prf.box._notify(prf, ot, shapeChanged);
                    }
                }

                // set to attr property
                if(prf.box.ISCOMBO){
                    prop.attr=xui.merge(prop.attr,attr2,function(o,i){
                        if(typeof o=='object'){
                            if(i in prop.attr)
                                xui.merge(prop.attr[i], o, 'all');
                            else
                                prop.attr[i]=xui.copy(o);
                        }else{
                            return true;
                        }
                    });

                    // filter default setting
                    xui.each(prop.attr,function(o,i){
                        xui.filter(o,function(o1,i1){
                            if(i1=='transform' && xui.isArr(dftAttr[i1]) && dftAttr[i1].length===0)dftAttr[i1]="";
                            // special for text
                            if((prf.box.$tagName[i]|| i.split("_")[0].toLowerCase())=='text'){
                                if(i1=='stroke') return o1!="none";
                                if(i1=='fill') return o1!="#000";
                                if(i!="KEY" && ('hAlign' in prf.box.$DataModel) && (i1=='x'||i1=='y'))return false;
                            }
                            if(i!="KEY" && i1=='transform')return false;
                            return dftAttr[i1]!==o1;
                        });
                    });
                }else{
                    xui.merge(prop.attr, attr2.KEY, 'all');

                    // filter default setting
                    xui.filter(prop.attr,function(o1,i1){
                        if(i1=='transform' && xui.isArr(dftAttr[i1]) && dftAttr[i1].length===0)dftAttr[i1]="";
                        // special for text
                        if((prf.box.$tagName.KEY|| i.split("_")[0].toLowerCase())=='text'){
                            if(i1=='stroke') return o1!="none";
                            if(i1=='fill') return o1!="#000";
                        }
                        return dftAttr[i1]!==o1;
                    });
                }
            });
        },
        toFront:function(){
            return this.each(function(prf){
                if(prf._shadow)prf._shadow.toFront();
                if(prf._elset)
                    xui.arr.each(prf._elset.items,function(el){
                        el.toFront();
                    });
                var arr=xui.get(prf,['parent','children']);
                if(arr && arr.length){
                    var index=xui.arr.subIndexOf(arr,"0",prf),o;
                    if(index!=-1){
                        o=arr[index];
                        arr.splice(index,1);
                        arr.push(o);
                    }
                }
            });
        },
        toBack:function(){
            return this.each(function(prf){
                if(prf._elset)
                    xui.arr.each(prf._elset.items,function(el){
                        el.toBack();
                    },null,true);
                if(prf._shadow)prf._shadow.toBack();
                var arr=xui.get(prf,['parent','children']);
                if(arr && arr.length){
                    var index=xui.arr.subIndexOf(arr,"0",prf),o;
                    if(index!=-1){
                        o=arr[index];
                        arr.splice(index,1);
                        arr.unshift(o);
                    }
                }
            });
        },
        getAllNodes:function(){
            var prf=this.get(0),arr=[];
            if(prf&&prf._elset){
                prf._elset.forEach(function(el){
                    arr.push(el.node);
                });
            }
            return xui(arr);
        },
        getPaper:function(){
            var prf=this.get(0);
            return prf && prf.parent && prf.parent._paper;
        },
        elemsAnimate:function(endpoints, ms, easing, callback){
            var prf=this.get(0);
            if(prf&&prf._elset){
                prf._elset.animate(endpoints, ms, easing, callback);
            }
            return this;
        },
        getElemSet:function(){
            var prf=this.get(0);
            prf&&prf._elset;
        },
        getLeft:function(){
            return this._getBBox('x');
        },
        setLeft:function(value){
            return this._setBBox('x',value);
        },
        getTop:function(){
            return this._getBBox('y');
        },
        setTop:function(value){
            return this._setBBox('y',value);
        },
        getWidth:function(){
            return this._getBBox('width');
        },
        getHeight:function(){
            return this._getBBox('height');
        },
        setWidth:function(value){
            return this._setBBox('width',parseFloat(value));
        },
        setHeight:function(value){
            return this._setBBox('height',parseFloat(value));
        },

        _getBBox:function(key, withTransform){
            var prf=this.get(0),el,bbox;
            if((el=prf._elset)&&el.length){
                el[0]._.dirty=1;
                bbox={};
                xui.merge(bbox,el[0]._getBBox(withTransform!==false),'all',true);
                for(var i=1,l=el.length,t;i<l;i++){
                   if(!(el[i].type=='text' && ('hAlign' in prf.box.$DataModel))){
                        el[i]._.dirty=1;
                        t=el[i]._getBBox(withTransform!==false);
                        bbox.x=Math.min(t.x,bbox.x);
                        bbox.y=Math.min(t.y,bbox.y);
                        bbox.x2=Math.max(('x2' in t)?t.x2:(t.x+t.width), ('x2' in bbox)?bbox.x2:(bbox.x+bbox.width));
                        bbox.y2=Math.max(('y2' in t)?t.y2:(t.y+t.height), ('y2' in bbox)?bbox.y2:(bbox.y+bbox.height));
                    }
                }

                if('x2' in bbox)bbox.width=bbox.x2-bbox.x;
                if('y2' in bbox)bbox.height=bbox.y2-bbox.y;

                delete bbox.x2;
                delete bbox.y2;
                return key?bbox[key]:bbox;
            }
        },
        _setBBox:function(key,value){
        },
        _getConnectAnchors:function(){
            var prf=this.get(0),rst;
            if(prf){
                if(xui.get(prf._pathCached,['_connAnchors']))
                    return xui.get(prf._pathCached,['_connAnchors']);

                var ss=prf._elset;
                if(ss&&ss[0]){
                    ss[0]._.dirty=1;
                    var tf=Raphael.parseTransformString(ss[0].transform()),
                        matrix;
                    if(tf && tf.length){
                        matrix=ss[0].matrix;
                    }

                    var bbox=ss[0]._getBBox(true),
                        r1=180,r2=270,r3=0,r4=90,
                        x1=bbox.x ,y1=bbox.y+bbox.height/2 ,
                        x2=bbox.x+bbox.width/2 ,y2=bbox.y ,
                        x3=bbox.x+bbox.width ,y3=bbox.y+bbox.height/2 ,
                        x4=bbox.x+bbox.width/2 ,y4=bbox.y+bbox.height;
                    if(matrix){
                        var xx1=x1,xx2=x2,xx3=x3,xx4=x4,yy1=y1,yy2=y2,yy3=y3,yy4=y4;
                        x1=matrix.x(xx1,yy1);y1=matrix.y(xx1,yy1);
                        x2=matrix.x(xx2,yy2);y2=matrix.y(xx2,yy2);
                        x3=matrix.x(xx3,yy3);y3=matrix.y(xx3,yy3);
                        x4=matrix.x(xx4,yy4);y4=matrix.y(xx4,yy4);

                        var xc=(x1+x2+x3+x4)/4,
                             yc=(y1+y2+y3+y4)/4;

                        r1=Raphael.angle(x1,y1,xc,yc);
                        r2=Raphael.angle(x2,y2,xc,yc);
                        r3=Raphael.angle(x3,y3,xc,yc);
                        r4=Raphael.angle(x4,y4,xc,yc);
                    }

                    rst={
                        "left":{x:x1, y:y1, alpha:r1, solid:1},
                        "top":{x:x2, y:y2, alpha:r2, solid:1},
                        "right":{x:x3, y:y3, alpha:r3, solid:1},
                        "bottom":{x:x4, y:y4,alpha:r4, solid:1}
                    }

                    if(prf._pathCached)xui.set(prf._pathCached,['_connAnchors'], rst);

                    return rst;
                }
            }
        },
        _getConnectPath:function(){
            var prf=this.get(0),ss;

            if(xui.get(prf._pathCached,['_connPath']))
                return xui.get(prf._pathCached,['_connPath']);

            if(prf && (ss=prf._elset) && ss[0]){
                var tf=Raphael.parseTransformString(ss[0].transform()),
                        matrix;
                    if(tf && tf.length){
                        matrix=ss[0].matrix;
                    }
                var path=ss[0].getPath();
                if(matrix){
                    path=Raphael.mapPath(path,matrix);
                }

                if(prf._pathCached)xui.set(prf._pathCached,['_connPath'], path);

                return path;
            }
        },
        _getConnectPoint:function(anchor){
            if(anchor){
                var prf=this.get(0),rst;

                if(xui.get(prf._pathCached,['_connPoint',anchor]))
                    return xui.get(prf._pathCached,['_connPoint',anchor]);

                if(/^[1-9][0-9]*:((1([.][0]+)?)|(0\.[0-9]+))$/.test(anchor)){
                    var arr=anchor.split(":");
                    arr[0]=+arr[0];
                    arr[1]=+arr[1];
                    if(arr[0]>=1 && arr[1]>=0 && arr[1]<=1){
                        var prf=this.get(0),cp=this._getConnectPath();
                        if(cp){
                            var cv=Raphael.path2curve(cp),cur,prev;
                            if((cur=cv[arr[0]])&&(prev=cv[arr[0]-1])){
                                rst = Raphael.findDotsAtSegment(prev[prev.length-2],prev[prev.length-1], cur[1],cur[2],cur[3],cur[4],cur[5],cur[6],arr[1]);
                            }
                        }
                    }
                }else{
                    var hash=this._getConnectAnchors();
                    rst = hash && hash[anchor];
                }

                if(prf._pathCached)xui.set(prf._pathCached,['_connPoint',anchor],rst);

                return rst;
            }
        },
        _removeHandler:function(){
            return this.each(function(prf){
                var el,tt,hh;
                if(tt=prf._pathHandler){
                    if(hh=tt.handlers){
                        for(var i=0, ii=hh.length,o,t; i<ii; i++){
                            o=hh[i];
                            for(var j in o){
                                if((t=o[j]) && typeof t.remove=='function')t.remove();
                                o[i]=null;
                            }
                        }
                    }
                    el=tt.el;
                    delete tt.el;
                    delete prf._pathHandler;
                }
                delete prf._ddstartFun;
                delete prf._ddendFun;
                if(el && el._shape){
                    el._shape.remove();
                    delete el._shape;
                }
            });
        },
        _addHandler:function(callback, type){
            type=type||"adv";
            this._removeHandler();
            return this.each(function(prf){
                if(!prf._elset || !prf._elset[0])return;

                var r=prf.boxing().getPaper(),
                    isCombo=prf.box.ISCOMBO,
                    el=prf._elset[0],
                    absPos,
                    isConnector=prf.box._CONNECTOR,
                    connType=prf.properties.type,
                    dotAttr1 = {fill:"#fff",stroke:"#000",r:5},
                    dotAttr2 = {fill:"#fff",stroke:"#000",r:4},
                    dotAttr3 = {fill:"#fff",stroke:"#000",r:3},
                    dotAttr4 = {fill:"#fff",stroke:"#000",r:4},
                    dotAttr6 = {fill:"#bf5600",stroke:"#bf5600",r:5,"fill-opacity":0.5},

                    lineAttr = {stroke:"#0000FF","stroke-dasharray":". "},
                    rectAttr = {stroke:"#0000FF","stroke-dasharray":"- "},
                    shadowAttr1 = {stroke:"#ccc","stroke-dasharray":"- ",opacity:0.8},
                    shadowAttr2 = {opacity:0.8},

                    magneticDistance1 = 16,
                    magneticDistance2 = 16,

                    magneticPos,
                    magneticOffPos,

                    handlers = {
                        /*text:function (el){
                            el._.dirty=1;
                            var attr=el.attr(),handler={},bbox=el._getBBox(true);
                            handler.rectBox=createDDElem(r.rect(bbox.x, bbox.y, bbox.width, bbox.height).attr(rectAttr),el);
                            handler.dot = createDDElem(r.circle(bbox.cx, bbox.cy).attr(dotAttr1).attr('cursor','move'),
                                el,function (x, y){
                                    var rtn = moveFun(this, x,y);

                                    bbox.x+=rtn.rx;
                                    bbox.y+=rtn.ry;
                                    handler.rectBox.attr({x:bbox.x, y:bbox.y, width:bbox.width, height:bbox.height});
                                    moveFun(el, rtn.rx, rtn.ry);
                                });
                            return {
                                el:el,
                                handlers:[handler]
                            }
                        },*/
                        rect:function (el){
                            var attr=el.attr(),handler={};
                            handler.dot = createDDElem(r.circle(attr.x+attr.width/2, attr.y+attr.height/2).attr(dotAttr1).attr('cursor','move'),
                                el, function (x, y, ax, ay){
                                    var pos = moveFun(this, x,y,ax,ay),nshape;
                                    attr.x+=pos.rx;
                                    attr.y+=pos.ry;

                                    nshape={x:attr.x,y:attr.y};
                                    el.attr(nshape);

                                    if(el._shape)el._shape.attr(nshape);
                                    xui.tryF(el.onShapeChanged,[nshape]);

                                    moveFun(handler.dot1, x,y,ax,ay);
                                    moveFun(handler.dot2, x,y,ax,ay);
                                    moveFun(handler.dot3, x,y,ax,ay);

                                    return {dx:pos.dx,dy:pos.dy};
                                },'main');
                            handler.dot1 = createDDElem(r.circle(attr.x, attr.y).attr(dotAttr2).attr('cursor','nw-resize'),
                                el, function (x, y, ax, ay){
                                    var x2=el.attr("x")+el.attr("width"),
                                        y2=el.attr("y")+el.attr("height"),
                                        pos = moveFun(this, x,y,ax,ay,null,x2,null,y2),
                                        nshape;
                                    attr.x=pos.cx;
                                    attr.y=pos.cy;
                                    attr.height=y2-pos.cy;
                                    attr.width=x2-pos.cx;

                                    nshape={x:attr.x,y:attr.y,width:attr.width,height:attr.height};
                                    el.attr(nshape);
                                    if(el._shape)el._shape.attr(nshape);
                                    xui.tryF(el.onShapeChanged,[nshape]);

                                    handler.dot.attr({cx:attr.x+attr.width/2, cy:attr.y+attr.height/2});

                                    var m=Math.min(el.attr("width"),el.attr("height"));
                                    if(el.attr("r")>m){
                                        el.attr("r",attr.r=m);
                                        if(el._shape)el._shape.attr("r",m);
                                        xui.tryF(el.onShapeChanged,[{r:m}]);
                                    }
                                    handler.dot3.attr({
                                        cx:el.attr("x")+el.attr("width")-el.attr("r"),
                                        cy:el.attr("y")
                                    });

                                    return {dx:pos.dx,dy:pos.dy};
                                },'w');
                            handler.dot2= createDDElem(r.circle(attr.x+attr.width, attr.y+attr.height).attr(dotAttr2).attr('cursor','se-resize'),
                                el, function (x, y, ax, ay){
                                    var pos = moveFun(this, x,y,ax,ay,attr.x,null,attr.y,null),
                                        nshape;

                                    attr.width=pos.cx-attr.x;
                                    attr.height=pos.cy-attr.y;

                                    nshape={width:attr.width, height:attr.height};
                                    el.attr(nshape);
                                    if(el._shape)el._shape.attr(nshape);
                                    xui.tryF(el.onShapeChanged,[nshape]);

                                    handler.dot.attr({cx:attr.x+attr.width/2, cy:attr.y+attr.height/2});

                                    var m=Math.min(el.attr("width"),el.attr("height"));
                                    if(el.attr("r")>m){
                                        el.attr("r",attr.r=m);
                                        if(el._shape)el._shape.attr("r",m);
                                        xui.tryF(el.onShapeChanged,[{r:m}]);
                                    }
                                    handler.dot3.attr({
                                        cx:el.attr("x")+el.attr("width")-el.attr("r"),
                                        cy:el.attr("y")
                                    });
                                    return {dx:pos.dx,dy:pos.dy};
                                },'h');
                            handler.dot3= createDDElem(r.circle(attr.x+attr.width-(attr.r||0), attr.y).attr(dotAttr3).attr('cursor','e-resize'),
                                el, function (x, y, ax, ay){
                                    var attr=el.attr(),
                                        pos = moveFun(this, x,y,ax,ay,(attr.x+attr.width-Math.max(attr.width,attr.height)/2),attr.x+attr.width, attr.y,attr.y),
                                        nshape;
                                    nshape={r:attr.width-(pos.cx-attr.x)};
                                    el.attr(nshape);
                                    if(el._shape)el._shape.attr(nshape);
                                    xui.tryF(el.onShapeChanged,[nshape]);

                                    return {dx:pos.dx,dy:pos.dy};
                                },'r');
                            return {
                                el:el,
                                handlers:[handler]
                            }
                        },
                        circle:function (el){
                            var attr=el.attr(),handler={};
                            handler.dot = createDDElem(r.circle(attr.cx, attr.cy).attr(dotAttr1).attr('cursor','move'),
                                el, function (x, y){
                                    var rtn = moveFun(this, x, y ),
                                        pos = {cx:rtn.cx,cy:rtn.cy};
                                    attr.cx=pos.cx;
                                    attr.cy=pos.cy;
                                    el.attr(pos);
                                    if(el._shape)el._shape.attr(pos);
                                    xui.tryF(el.onShapeChanged,[pos]);

                                    pos.cx += el.attr("r");
                                    handler.dotr.attr(pos);
                                },'main');
                            handler.dotr = createDDElem(r.circle(attr.cx+attr.r, attr.cy).attr(dotAttr2).attr('cursor','e-resize'),
                                el, function (x, y,ax,ay){
                                    var attr=el.attr(),
                                        pos = moveFun(this, x,y,ax,ay,attr.cx,null,attr.cy,attr.cy),
                                        nshape;
                                    attr.r=pos.cx-attr.cx;
                                    nshape={r:attr.r};
                                    el.attr(nshape);
                                    if(el._shape)el._shape.attr(nshape);
                                    xui.tryF(el.onShapeChanged,[nshape]);

                                    return {dx:pos.dx,dy:pos.dy};
                                },'r');
                            return {
                                el:el,
                                handlers:[handler]
                            }
                        },
                        ellipse:function (el){
                            var attr=el.attr(),handler={},dot;
                            handler.dot = createDDElem(r.circle(attr.cx, attr.cy).attr(dotAttr1).attr('cursor','move'),
                                el, function (x, y){
                                    var rtn = moveFun(this, x,y),
                                        pos = {cx:rtn.cx,cy:rtn.cy};
                                    attr.cx=pos.cx;
                                    attr.cy=pos.cy;
                                    el.attr(pos);
                                    if(el._shape)el._shape.attr(pos);
                                    xui.tryF(el.onShapeChanged,[pos]);

                                    handler.dotrx.attr({cx:pos.cx+el.attr("rx"),cy:pos.cy});
                                    handler.dotry.attr({cy:pos.cy-el.attr("ry"),cx:pos.cx});
                                },'main');
                            handler.dotrx = createDDElem(r.circle(attr.cx+attr.rx, attr.cy).attr(dotAttr2).attr('cursor','w-resize'),
                                el, function (x, y,ax,ay){
                                    var attr=el.attr(),
                                        pos = moveFun(this, x,y,ax,ay,attr.cx,null,attr.cy,attr.cy),
                                        nshape;
                                    attr.rx=pos.cx-attr.cx;
                                    nshape={rx:attr.rx};
                                    el.attr(nshape);
                                    if(el._shape)el._shape.attr(nshape);
                                    xui.tryF(el.onShapeChanged,[nshape]);
                                    return {dx:pos.dx,dy:pos.dy};
                                },'rx');
                            handler.dotry = createDDElem(r.circle(attr.cx, attr.cy-attr.ry).attr(dotAttr2).attr('cursor','n-resize'),
                                el,function (x, y,ax,ay){
                                    var attr=el.attr(),
                                        pos = moveFun(this, x,y,ax,ay,attr.cx,attr.cx,null,attr.cy),
                                        nshape;
                                    attr.ry=attr.cy-pos.cy;
                                    nshape={ry:attr.ry};
                                    el.attr(nshape);
                                    if(el._shape)el._shape.attr(nshape);
                                    xui.tryF(el.onShapeChanged,[nshape]);

                                    return {dx:pos.dx,dy:pos.dy};
                                },'ry');

                            return {
                                el:el,
                                handlers:[handler]
                            }
                        },
                        path : function (el){
                            var x, y, ox, oy, ax, ay, bx, by, zx, zy,
                                paths=el.getPath(),
                                manualPathModify,
                                addSegmentJunctionDD=function(r,el,x,y,index,type3,conType,prf){
                                    var circle=r.circle(x, y);

                                    if(conType=='from')
                                        circle.attr(dotAttr4);
                                    else if(conType=='to')
                                        circle.attr(dotAttr4);
                                    else
                                        circle.attr(dotAttr1).attr('cursor','move');

                                    return createDDElem(circle, el, function (x, y, ax, ay, beForced, mx, my,ix,iy,event, callback) {
                                        var paper=el.paper,
                                            ox = this.attr('cx'),
                                            oy = this.attr('cy'),
                                            X = xui.isSet(ix)?ix:(ox + x),
                                            Y = xui.isSet(iy)?iy:(oy + y),
                                            pos,anchorPos;
                                        if(xui.isSet(ix)){
                                            x=X-ox;
                                        }
                                        if(xui.isSet(iy)){
                                            y=Y-oy;
                                        }
                                        // for connector
                                        // find target connected el, draw/undraw magnetic dots
                                        if(conType=='from'||conType=='to'){
                                            var d=el.node.ownerDocument||document;

                                            // hide those for get right object
                                            this.hide();
                                            prf._elset.hide();
                                            el._shape.hide();
                                            xui.arr.each(handlers,function(o,i){
                                                if(i=o.dot)i.hide();
                                                if(i=o.dot1)i.hide();
                                                if(i=o.dot2)i.hide();
                                                if(i=o.dot3)i.hide();
                                                if(i=o.dotPrev)i.hide();
                                                if(i=o.dotNext)i.hide();
                                                if(i=o.linePrev)i.hide();
                                                if(i=o.lineNext)i.hide();
                                            });
                                            // get right object under mouse
                                            var esrc=d.elementFromPoint(mx, my);
                                            // show again
                                            this.show();
                                            prf._elset.show();
                                            el._shape.show();
                                            xui.arr.each(handlers,function(o,i){
                                                if(i=o.dot)i.show();
                                                if(i=o.dot1)i.show();
                                                if(i=o.dot2)i.show();
                                                if(i=o.dot3)i.show();
                                                if(i=o.dotPrev)i.show();
                                                if(i=o.dotNext)i.show();
                                                if(i=o.linePrev)i.show();
                                                if(i=o.lineNext)i.show();
                                            });

                                            if(esrc._rootNode)
                                                esrc=esrc._rootNode;

                                            if(!esrc)
                                                return;
                                            // special one
                                            if(esrc && esrc.raphael){
                                                var o=paper.getById(esrc.raphaelid);
                                                if(o && o._attached){
                                                    esrc = o._attached;
                                                }
                                            }

                                            // get the top widget
                                            while(esrc &&
                                                (
                                                    (!esrc.id)
                                                    || esrc.id==xui.$localeDomId
                                                    || esrc.tagName=='tspan'
                                                )
                                                && esrc!==paper.canvas.parentNode
                                                && esrc.parentNode!==d
                                            ){
                                                esrc=esrc.parentNode;
                                            }

                                            if(!esrc)
                                                return;

                                            // has anchors or anchorPath
                                            var magneticObj,anchorKey,
                                                targetNode,anchors,anchorPath,centerPoint,
                                                anchorShadow=paper._anchorShadow;
                                            if(esrc!==paper.canvas){
                                                var tobj=xui.UIProfile.getFromDom(esrc.id);
                                                if(tobj && tobj.parent&& tobj.parent._paper==paper){
                                                    if(tobj.box['xui.svg']){
                                                        targetNode=tobj.getRootNode();
                                                        if(!tobj.box._CONNECTOR){
                                                            anchors=tobj.boxing()._getConnectAnchors();
                                                            anchorPath=tobj.boxing()._getConnectPath();
                                                            if(anchorPath){
                                                                var anchorBBox;
                                                                if(anchorBBox=xui.get(tobj._pathCached,['_connBBox'])){
                                                                }else{
                                                                    anchorBBox=Raphael.pathBBox(anchorPath);
                                                                    xui.set(tobj._pathCached,['_connBBox'], anchorBBox);
                                                                }
                                                                centerPoint={x:anchorBBox.x+anchorBBox.width/2,y:anchorBBox.y+anchorBBox.height/2};
                                                            }
                                                            magneticObj=tobj.alias;
                                                        }
                                                    }else if(tobj.box['xui.UI']){
                                                        //console.log(esrc.id,tobj.getRoot().cssRegion(),X,Y,mx,my);
                                                    }
                                                }
                                            }


                                            // remove anchorShadow
                                            if(anchorShadow && ((!anchors && !anchorPath) || anchorShadow._attached!==targetNode)){
                                                anchorShadow.remove();
                                                anchorShadow.clear();
                                                anchorShadow=null;
                                                delete paper._anchorShadow;
                                                this.show();
                                            }
                                            // draw anchorShadow
                                            if(anchors || anchorPath){
                                                if(!anchorShadow){
                                                    anchorShadow=paper.set();
                                                    anchorShadow._attached=targetNode;

                                                    var circle=paper.circle(-100,-100);
                                                    circle._attached=targetNode;
                                                    circle.hide();
                                                    anchorShadow.push(circle);

                                                    // draw anchorShadow
                                                    for(var i in anchors){
                                                        o=anchors[i];
                                                        circle=paper.circle(o.x, o.y);
                                                        circle._attached=targetNode;
                                                        circle._anchorKey=i;
                                                        anchorShadow.push(circle);
                                                    }

                                                    anchorShadow.attr(dotAttr6);
                                                    paper._anchorShadow=anchorShadow;
                                                }

                                                // magnetic function
                                                var minDis=null;
                                                for(var i in anchors){
                                                    distance=Math.pow(Math.pow(Math.abs(ix-anchors[i].x),2)+Math.pow(Math.abs(iy-anchors[i].y),2),1/2);
                                                    if(distance<=magneticDistance1){
                                                        if(minDis===null || minDis>distance){
                                                            minDis=distance;
                                                            anchorPos=anchors[i];
                                                            anchorKey=i;
                                                        }
                                                    }
                                                }
                                                if(!anchorPos){
                                                    // for path magnetic
                                                    if(anchorPath){
                                                        var v=magneticDistance2,
                                                            path="M,"+X+","+Y+"m,0,-"+v+"a,"+v+","+v+",0,1,1,0,"+v*2+"a,"+v+","+v+",0,1,1,0,-"+v*2+"z",
                                                            len=Raphael.getTotalLength(path)/2,
                                                            cross=Raphael.pathIntersection(anchorPath, path);

                                                        if(cross.length>=2){
                                                            var x0=(cross[0].x+cross[1].x)/2,y0=(cross[0].y+cross[1].y)/2,
                                                                angle=Raphael.angle(x0,y0,X,Y);

                                                            if((Math.abs(x0-centerPoint.x)+Math.abs(y0-centerPoint.y))<Math.abs(X-centerPoint.x)+Math.abs(Y-centerPoint.y)){
                                                                angle+=180;
                                                            }

                                                            var rad=Raphael.rad(angle),
                                                                x1 = X - v * Math.cos(rad),
                                                                x2 = X + v * Math.cos(rad),
                                                                y1 = Y - v * Math.sin(rad),
                                                                y2 = Y + v * Math.sin(rad);

                                                            cross=Raphael.pathIntersection(anchorPath, "M"+x1+","+y1+",L"+x2+","+y2);
                                                            if(cross.length===1){
                                                                var b=cross[0].bez1,
                                                                    ppath="M"+b[0]+","+b[1]+"C"+b[2]+","+b[3]+","+b[4]+","+b[5]+","+b[6]+","+b[7],
                                                                    point=Raphael.getPointAtLength(ppath, cross[0].t1*Raphael.getTotalLength(ppath));
                                                                anchorKey=cross[0].segment1 + ":" + cross[0].t1;
                                                                anchorPos={
                                                                    x:cross[0].x,
                                                                    y:cross[0].y,
                                                                    alpha:angle,
                                                                    _path:true
                                                                };
                                                            }
                                                        }
                                                    }
                                                }

                                                if(anchorPos){
                                                    // hold
                                                    if(magneticPos){
                                                        // still the old magnetic
                                                        if(magneticPos.x==anchorPos.x && magneticPos.y==anchorPos.y){
//console.log('still the old magnetic');
                                                            x=y=0;
                                                            ax=magneticOffPos.x;
                                                            ay=magneticOffPos.y;
                                                        }
                                                        // swtich to the new magnetic
                                                        else{
//console.log('swtich to the new magnetic');
                                                            x = anchorPos.x-magneticPos.x;
                                                            y = anchorPos.y-magneticPos.y;

                                                            // need return to adjust
                                                            ax = magneticOffPos.x + x;
                                                            ay = magneticOffPos.y + y;
                                                            magneticPos={x:anchorPos.x,y:anchorPos.y};
                                                            magneticOffPos={x:ax,y:ay};
                                                            if(anchorPos._path){
                                                                anchorShadow[0].attr({cx:anchorPos.x,cy:anchorPos.y});
                                                                anchorShadow[0].show();
                                                            }else{
                                                                anchorShadow[0].hide();
                                                            }
                                                        }
                                                    }
                                                    // first magnetic
                                                    else{
//console.log('first magnetic');
                                                        x += anchorPos.x-ix;
                                                        y += anchorPos.y-iy;

                                                        // need return to adjust
                                                        ax += anchorPos.x-ix;
                                                        ay += anchorPos.y-iy;
                                                        magneticPos={x:anchorPos.x,y:anchorPos.y};
                                                        magneticOffPos={x:ax,y:ay};

                                                        if(anchorPos._path){
                                                            anchorShadow[0].attr({cx:anchorPos.x,cy:anchorPos.y});
                                                            anchorShadow[0].show();
                                                        }else{
                                                            anchorShadow[0].hide();
                                                        }
                                                    }

                                                    X = anchorPos.x;
                                                    Y = anchorPos.y;

                                                    pos={dx:ax,dy:ay};
                                                }
                                            }
                                            // off-magnetic
                                            if(!anchorPos && magneticPos){
                                                x = ix-magneticPos.x;
                                                y = iy-magneticPos.y;

                                                // need return to adjust
                                                ax = magneticOffPos.x + x;
                                                ay = magneticOffPos.y + y;

                                                magneticPos=magneticOffPos=null;

                                                if(anchorShadow)
                                                    anchorShadow[0].hide();
                                            }

                                            // keep connector parameters
                                            prf.properties[conType=='from'?'fromObj':'toObj'] = magneticObj || "";
                                            prf.properties[conType=='from'?'fromPoint':'toPoint'] = anchorKey || "";
                                        }

                                        // normal move function
                                        var pathModified,
                                            pos = {cx: X, cy: Y};
                                        if(beForced || false!==xui.tryF(manualPathModify,[index,paths,X,Y,this,pos])){
                                            var i=this._handlerIndex,
                                                l=paths[i].length,
                                                data=handlers[i],
                                                data2,p,d;

                                            if(!beForced){
                                                if(type3=='V'){
                                                    // stop the last H/V's prev V/H moving
                                                    if(handlers.length-1==i+1 && handlers[i+1].type=='H'){
                                                        delete pos.cy;
                                                        y=ay=0;
                                                    }else{
                                                        paths[i][l-1] = Y;
                                                    }

                                                    // try to move previoius path point
                                                    if((0!==i-1)&&(data2=handlers[i-1])){
                                                        if(data2.type=="H"){
                                                            paths[i-1][1] = X;
                                                            if(d=data2.dot)d.update(x, 0, ax, 0, true, mx, my);
                                                        }else if(data2.type=="V"){
                                                            delete pos.cx;
                                                        }else if(data2.type=="L"){
                                                            paths[i-1][paths[i-1].length-2] = X;
                                                            if(d=data2.dot)d.update(x, 0, ax, 0, true, mx, my);
                                                        }else{
                                                            delete pos.cx;
                                                        }
                                                    }else{
                                                        delete pos.cx;
                                                    }
                                                }else if(type3=='H'){
                                                    // stop the last H/V's prev V/H moving
                                                    if(handlers.length-1==i+1 && handlers[i+1].type=='V'){
                                                        delete pos.cx;
                                                        x=ax=0;
                                                    }else{
                                                        paths[i][l-1] = X;
                                                    }

                                                    // try to move previoius path point
                                                    if((0!==i-1)&&(data2=handlers[i-1])){
                                                        if(data2.type=="H"){
                                                            delete pos.cy;
                                                        }else if(data2.type=="V"){
                                                            paths[i-1][1] = Y;
                                                            if(d=data2.dot)d.update(0, y, ax, ay, true, mx, my);
                                                        }else if(data2.type=="L"){
                                                            paths[i-1][paths[i-1].length-1] = Y;
                                                            if(d=data2.dot)d.update(0, y, ax, ay, true, mx, my);
                                                        }else{
                                                            delete pos.cy;
                                                        }
                                                    }else{
                                                        delete pos.cy;
                                                    }
                                                }else{
                                                    paths[i][l-2] = X;
                                                    paths[i][l-1] = Y;
                                                }

                                                // move next handler's dot
                                                if((data2=handlers[i+1]) && (d=data2.dot)){
                                                    if(data2.type=='V'){
                                                        d.update(x, 0, ax, 0, true, mx, my);
                                                    }else if(data2.type=='H'){
                                                        d.update(0, y, 0, ay, true, mx, my);
                                                    }
                                                }
                                            }

                                            // move dot itself
                                            this.attr(pos);

                                            // move other linked dots
                                            if(p=data.linePrevPath){
                                                p[0][1] = X;
                                                p[0][2] = Y;
                                            }
                                            if(p=data.lineNextPath){
                                                p[0][1] = X;
                                                p[0][2] = Y;
                                            }
                                            if(d=data.dotPrev){
                                                d.update(X-ox, Y-oy, ax, ay, true);
                                                pathModified=true;
                                            }
                                            if(d=data.dotNext){
                                                d.update(X-ox, Y-oy, ax, ay, true);
                                                pathModified=true;
                                            }
                                        }
                                        // modify path
                                        if(!pathModified){
                                            var nshape={path: paths};
                                            el.attr(nshape);
                                            if(el._shape)el._shape.attr(nshape);
                                            xui.tryF(el.onShapeChanged,[nshape]);
                                        }

                                        // adjust angle for connector
                                        if((conType=='from'||conType=='to') && connType=='bezier' && anchorPos && (X!==ox || Y!==oy)){
                                            var dot=conType=='from'?handlers[0].dotNext:handlers[paths.length-1].dotPrev;
                                            if(dot){
                                                var x0=dot.attr('cx'),
                                                    y0=dot.attr('cy'),
                                                    distance=Math.pow(Math.pow(Math.abs(X-x0),2)+Math.pow(Math.abs(Y-y0),2),1/2),
                                                    rad=Raphael.rad(anchorPos.alpha),
                                                    x1 = X + distance * Math.cos(rad),
                                                    y1 = Y + distance * Math.sin(rad);
                                                dot.update(x1-x0, y1-y0, null, null, true);
                                            }
                                        }
                                        // adjust drag pos
                                        if(pos)return pos;
                                    },'main',index);
                                },
                                addBezierAnchor2DD=function(r,el,x,y,index,conType,prf){
                                    return createDDElem(r.circle(x, y).attr(dotAttr3),
                                        el, function (x, y) {
                                            var X = this.attr("cx") + x,
                                                Y = this.attr("cy") + y,
                                                nshape;
                                            this.attr({cx: X, cy: Y});

                                            var i=this._handlerIndex,data=handlers[i],p,d;
                                            if(p=data.lineNextPath){
                                                p[1][1] = X;
                                                p[1][2] = Y;
                                            }
                                            if(d=data.lineNext){
                                                d.attr({path: p});
                                            }

                                            paths[i+1][1] = X;
                                            paths[i+1][2] = Y;

                                            nshape={path: paths};
                                            el.attr(nshape);
                                            if(el._shape)el._shape.attr(nshape);
                                            xui.tryF(el.onShapeChanged,[nshape]);
                                        },'path2',index);
                                },
                                addBezierAnchor1DD=function(r,el,x,y,index,conType,prf){
                                    return createDDElem(r.circle(x, y).attr(dotAttr3),
                                        el, function (x, y) {
                                            var X = this.attr("cx") + x,
                                                Y = this.attr("cy") + y,
                                                nshape;
                                            this.attr({cx: X, cy: Y});

                                            var i=this._handlerIndex,data=handlers[i],p,d;
                                            if(p=data.linePrevPath){
                                                p[1][1] = X;
                                                p[1][2] = Y;
                                            }
                                            if(d=data.linePrev){
                                                d.attr({path: p});
                                            }

                                            paths[i][paths[i].length-4] = X;
                                            paths[i][paths[i].length-3] = Y;
                                            nshape={path: paths};
                                            el.attr(nshape);
                                            if(el._shape)el._shape.attr(nshape);
                                            xui.tryF(el.onShapeChanged,[nshape]);
                                        },'path1',index);
                                },
                                type1=1,type2=1,type3=0,prevtype2=1,
                                handlers=[];
                            if(xui.isStr(paths))paths=Raphael.parsePathString(paths);
                            // connector [type=flowchart] show two point only when dd
                            if(isConnector && connType=="flowchart"){
                                prf._ddstartFun=function(prf,index,dot){
                                    if(index===0 || index===prf._pathHandler.handlers.length-1)
                                        xui.arr.each(prf._pathHandler.handlers,function(o,i){
                                            if(i!==0 && i!==prf._pathHandler.handlers.length-1)
                                                o.dot.attr({opacity:0,r:0});
                                        });
                                };
                                prf._ddendFun=function(prf,index, dot){
                                    if(index===0 || index===prf._pathHandler.handlers.length-1)
                                        prf.boxing()._addHandler(callback);
                                };
                                manualPathModify=function(index,paths,X,Y,dot,pos){
                                    if(index===0 || index===prf._pathHandler.handlers.length-1){
                                        // move the dot itself
                                        dot.attr(pos);
                                        // modify path manually
                                        var np=prf.box._redrawBrokenLine(prf,index===0?'start':'end',X,Y);

                                        // renew paths
                                        paths.length=0;
                                        xui.arr.each(np,function(p){
                                            paths.push(p);
                                        });
                                        // stop default path modifing
                                        return false;
                                    }
                                }
                            }

                            for(var i=0, ii=paths.length, l, handler; i<ii; i++){
                                var conType;
                                if(isConnector)
                                    conType=(i===0)?"from":(i===(ii-1))?"to":null;

                                handlers.push(handler={
                                    dot:0,
                                    dotPrev:0,
                                    dotNext:0,
                                    linePrev:0,
                                    lineNext:0,
                                    linePrevPath:0,
                                    lineNextPath:0,
                                    type:paths[i][0]
                                });

                                l = paths[i].length;
                                type3=0;
                                switch (paths[i][0]) {
                                    case "M":
                                        x = zx = ox = paths[i][l - 2];
                                        y = zy = oy = paths[i][l - 1];
                                        type1=0;
                                        type2=1;
                                        break;
                                    case "L":
                                        type1=type2=1;
                                        zx = ox = paths[i][l - 2];
                                        zy = oy = paths[i][l - 1];
                                        break;
                                    case "H":
                                        type1=type2=1;
                                        zy = oy = y;
                                        zx = ox = paths[i][1];
                                        type3='H';
                                        break;
                                    case "V":
                                        type1=type2=1;
                                        zx = ox = x;
                                        zy = oy = paths[i][1];
                                        type3='V';
                                        break;
                                    case "C":
                                        type1=type2=2;
                                        ax = paths[i][l - 6];
                                        ay = paths[i][l - 5];
                                        bx = paths[i][l - 4];
                                        by = paths[i][l - 3];
                                        ox = zx = paths[i][l - 2];
                                        oy = zy = paths[i][l - 1];
                                        break;
                                    case "Q":
                                        type1=2;
                                        type2=1;
                                        ax = paths[i][l - 4];
                                        ay = paths[i][l - 3];
                                        ox = zx = paths[i][l - 2];
                                        oy = zy = paths[i][l - 1];
                                        break;
                                    case "S":
                                        type1=1;
                                        type2=2;
                                        bx = paths[i][l - 4];
                                        by = paths[i][l - 3];
                                        ox = zx = paths[i][l - 2];
                                        oy = zy = paths[i][l - 1];
                                        break;
                                    case "T":
                                        type1=type2=1;
                                        ox = zx = paths[i][l - 2];
                                        oy = zy = paths[i][l - 1];
                                        break;
                                    case "A":
                                        // TODO: to add
                                        // currently, jump to end only
                                        type1=type2=0;
                                        ox = zx = paths[i][l - 2];
                                        oy = zy = paths[i][l - 1];
                                        continue;
                                    //case "R":
                                    //case "Z":
                                    default:
                                        continue;
                                }

                                switch(type1){
                                    case 0:
                                    // no dot
                                    break;
                                    case 1:
                                    // added
                                    break;
                                    case 2:
                                        if(type=="adv"){
                                            handlers[i-1].lineNextPath=[["M", x, y], ["L", ax, ay]],
                                            handlers[i-1].lineNext=r.path(handlers[i-1].lineNextPath).attr(lineAttr);
                                            handlers[i-1].dotNext=addBezierAnchor2DD(r,el,ax,ay,i-1,conType,prf);
                                        }
                                    break;
                                }

                                switch(type2){
                                    // case 0:
                                    // no dot
                                    // break;
                                    case 1:
                                        // 1 dot
                                        handlers[i].dot=addSegmentJunctionDD(r,el,zx,zy,i,type3,conType,prf);

                                        // hide this unmovable dot
                                        if(isConnector && connType=="flowchart" && ii===3 && i===1){
                                            handlers[i].dot.attr({opacity:0,r:0});
                                        }
                                    break;
                                    case 2:
                                        // 2 dots
                                        handlers[i].dot=addSegmentJunctionDD(r,el,zx,zy,i,null,conType,prf);
                                        if(type=="adv"){
                                            handlers[i].linePrevPath=[["M", zx, zy], ["L", bx, by]],
                                            handlers[i].linePrev=r.path(handlers[i].linePrevPath).attr(lineAttr);
                                            handlers[i].dotPrev=addBezierAnchor1DD(r,el,bx,by,i,conType,prf);
                                        }
                                    break;
                                }
                                if(ox!=undefined)x=ox;
                                if(oy!=undefined)y=oy;

                                prevtype2=type2;
                            }
                            // ensure dd point on the top
                            for(var i=0, ii=paths.length, l, handler; i<ii; i++){
                                handler=handlers[i];
                                if(handler.dot)handler.dot.toFront();
                            }
                            return {
                                el:el,
                                handlers:handlers
                            }
                        }
                    },
                    move = function(dx, dy, mx, my, event) {
                        var rtn = this.update(dx - (this.dx || 0), dy - (this.dy || 0), dx, dy, false, mx, my, mx-absPos.left, my-absPos.top, event);
                        this.dx = (rtn&&rtn.dx)||dx;
                        this.dy = (rtn&&rtn.dy)||dy;

                        if(callback)callback(this, event, 'drag', this._attached);
                    },
                    start = function(mx,my,event){
                        if(callback)callback(this, event, 'beforedragstart', this._attached);
                        this.toFront();

                        this.dx = this.dy = 0;

                        magneticPos=magneticOffPos=null;

                        absPos = xui(this.paper.canvas.parentNode).offset(null);

                        var cursor=this.attr('cursor'),t;
                        this._oldCursor = (t=r.canvas.style).cursor||"";
                        t.cursor = cursor;

                        if(t=this._attached){
                            t._oldCursor=t.attr('cursor')||"";
                            t.attr("cursor", cursor);
                            t._opath=t.getPath();
                            t._obbox=Raphael.pathBBox(t._opath);

                            // get prf
                            if(prf._ddstartFun)xui.tryF(prf._ddstartFun,[prf, this._handlerIndex,this]);
                        }

                        if(callback)callback(this, event, 'dragstart', this._attached);
                    },
                    end=function(event){
                        if(callback)callback(this, event, 'beforedragend', this._attached);
                        absPos=null;

                        magneticPos=magneticOffPos=null;

                        var paper=this.paper;
                        r.canvas.style.cursor = this._oldCursor;
                        delete this._oldCursor;

                        var t;
                        if(t=this._attached){
                            t.attr('cursor',t._oldCursor);
                            delete t._oldCursor;
                            delete t._obbox;
                            delete t._opath;

                            var attr=t.attr();
                            if(isCombo){
                                xui.merge(prf.properties.attr.KEY,attr,'all');
                                attr=prf.properties.attr.KEY;
                            }else{
                                xui.merge(prf.properties.attr,attr,'all');
                                attr=prf.properties.attr;
                            }
                            if(attr.path)
                                attr.path=t.getPath().join('');

                            prf.box._notify(prf, {path:1}, true);


                            // get prf
                            if(prf._ddendFun)xui.tryF(prf._ddendFun,[prf,this._handlerIndex,this]);

                        }
                        if(t=paper._anchorShadow){
                            t.remove();
                            t.clear();
                            delete paper._anchorShadow;
                        }
                        if(callback)callback(this, event, 'dragend', this._attached);
                    },
                    createDDElem=function(obj,el,update,key,index){
                        obj._handlerIndex=index||0;
                        obj._attached=el;
                        if(update){
                            obj.drag(move,start,end);
                            obj.update=update;
                            obj.dblclick(function(event){
                                if(callback)callback(this, event, 'dblclick', el, key, index);
                            });
                            obj.click(function(event){
                                if(callback)callback(this, event, 'click', el, key, index);
                                xui.Event.stopBubble(event);
                                xui.Event.stopDefault(event);
                            });
                            obj.contextmenu(function(event){
                                if(callback)callback(this, event, 'contextmenu', el, key, index);
                            });
                            // stop select parent
                            //xui(obj.node).onContextMenu(function(){
                            //    return false;
                            //});
                        }
                        obj.toFront();
                        return obj;
                    },
                    moveFun=function (el, x, y, ax, ay, limitX1, limitX2, limitY1, limitY2){
                        switch(el.type){
                            case 'path':{
                                var paths=el.getPath(),nshape;
                                for(var i=0, ii=paths.length, l; i<ii; i++){
                                    l = paths[i].length;
                                    switch (paths[i][0]) {
                                        case "M":
                                        case "L":
                                            paths[i][1] += x;
                                            paths[i][2] += y;
                                            break;
                                        case "H":
                                            paths[i][1] += x;
                                            break;
                                        case "V":
                                            paths[i][1] += y;
                                            break;
                                        case "C":
                                            paths[i][1] += x;
                                            paths[i][2] += y;
                                            paths[i][3] += x;
                                            paths[i][4] += y;
                                            paths[i][5] += x;
                                            paths[i][6] += y;
                                            break;
                                        case "Q":
                                        case "S":
                                            paths[i][1] += x;
                                            paths[i][2] += y;
                                            paths[i][3] += x;
                                            paths[i][4] += y;
                                            break;
                                        case "T":
                                            paths[i][1] += x;
                                            paths[i][2] += y;
                                            break;
                                        case "A":
                                            paths[i][l-2] += x;
                                            paths[i][l-1] += y;
                                            continue;
                                        //case "R":
                                        //case "Z":
                                        default:
                                            continue;
                                    }
                                }
                                nshape={path: paths};
                                el.attr(nshape);
                                if(el._shape)el._shape.attr(nshape);
                                xui.tryF(el.onShapeChanged,[nshape]);
                                break;
                            }
                            case 'circle':{
                                var X1=el.attr("cx"),
                                    Y1=el.attr("cy"),
                                    X = X1 + x,
                                    Y = Y1 + y,
                                    lx=0,
                                    ly=0,rst;
                                if((limitX1===0||limitX1)&&X<(limitX1+1)){
                                    lx=X-(limitX1+1);
                                    X=(limitX1+1);
                                }
                                if((limitX2===0||limitX2)&&X>limitX2){
                                    lx=X-limitX2;
                                    X=limitX2;
                                }
                                if((limitY1===0||limitY1)&&Y<(limitY1+1)){
                                    ly=Y-(limitY1+1);
                                    Y=(limitY1+1);
                                }
                                if((limitY2===0||limitY2)&&Y>limitY2){
                                    ly=Y-limitY2;
                                    Y=limitY2;
                                }
                                rst={cx: X, cy: Y, rx:x, ry:y};
                                el.attr(rst);
                                if(el._shape)el._shape.attr(rst);
                                xui.tryF(el.onShapeChanged,[rst]);
                                rst.dx=ax-lx;
                                rst.dy=ay-ly;
                                return rst;
                            }
                            case 'ellipse':{
                                var X = el.attr("cx") + x,
                                    Y = el.attr("cy") + y,
                                    nshape={cx: X, cy: Y};
                                el.attr(nshape);
                                if(el._shape)el._shape.attr(nshape);
                                xui.tryF(el.onShapeChanged,[nshape]);
                                break;
                            }
                            case 'rect':{
                                var X = el.attr("x") + x,
                                    Y = el.attr("y") + y,
                                    nshape={x: X, y: Y};
                                el.attr(nshape);
                                if(el._shape)el._shape.attr(nshape);
                                xui.tryF(el.onShapeChanged,[nshape]);
                                break;
                            }
                            case 'text':{
                                var X = el.attr("x") + x,
                                    Y = el.attr("y") + y,
                                    nshape={x: X, y: Y};
                                el.attr(nshape);
                                if(el._shape)el._shape.attr(nshape);
                                xui.tryF(el.onShapeChanged,[nshape]);
                                break;
                            }
                        }
                    };

                if(handlers[el.type]){
                    prf._pathHandler=handlers[el.type](el);

                    el=el._shape=el.clone();
                    el.attr({"arrow-start":"none","arrow-end":"none"});
                    el.transform("").attr(el.type=='text'?shadowAttr2:shadowAttr1).toBack();
                }
            });
        }
    },
    Static:{
        $abstract:true,
        _objectProp:{attr:1},
        DataModel:{
            selectable:null,
            defaultFocus:null,
            renderer:null,
            position:null,
            disableClickEffect:null,
            disableHoverEffect:null,
            disableTips:null,
            disabled:null,
            //zIndex:null,
            left:null,
            top:null,
            right:null,
            bottom:null,
            width:null,
            height:null,


            svgTag:{
                ini:""
            },
            attr:{
                ini:{}
            },
            shadow:{
                ini:false,
                action:function(v){
                    if(v && !this._shadow){
                        this._shadow=this._elset[0].shadow();
                    }else if(this._shadow){
                        this._shadow.remove();
                        this._shadow.clear();
                        delete this._shadow;
                    }
                }
            }
        },
        Behaviors:{
            HotKeyAllowed:false,
            HoverEffected:{KEY:'KEY'},
            ClickEffected:{KEY:'KEY'},
            onClick:function(profile, e, src){
                if(profile.$inDesign)return false;
                var p=profile.properties;
                if(p.disabled)return false;
                //onClick event
                if(profile.onClick)
                    return profile.boxing().onClick(profile, e, src);
            },
            onDblclick:function(profile, e, src){
                if(profile.$inDesign)return false;
                var p=profile.properties;
                if(p.disabled)return false;
                //onClick event
                if(profile.onDblClick)
                    return profile.boxing().onDblClick(profile, e, src);
            },
            onContextmenu:function(profile, e, src){
                if(profile.onContextmenu)
                    return profile.boxing().onContextmenu(profile, e, src)!==false;
            }
        },
        EventHandlers:{
            onClick:function(profile, e, src){},
            onDblClick:function(profile, e, src){},
            onContextmenu:function(profile, e, src){},
            onHotKeydown:null,
            onHotKeypress:null,
            onHotKeyup:null
        },
        _beforeSerialized:function(profile){
            var o = arguments.callee.upper.call(this,profile),prop=o.properties;
            prop.attr=xui.clone(prop.attr,true);
            xui.filter(prop.attr,function(o,i){
                if(i=='transform'&&(!o||o.length<1))return false;
                if(i=='href'||i=='target')return false;
                if(i=='path' && xui.isArr(prop.attr.path))prop.attr.path=o.join('');
            });
            return o;
        },
        RenderTrigger:function(){
            var prf=this;
            (prf.$beforeDestroy=(prf.$beforeDestroy||{}))["svgClear"]=function(){
                if(prf._elset){
                    prf._elset.forEach(function(el){
                        if(el)delete el._rootNode;
                    });
                    prf._elset.remove();
                    prf._elset.clear();
                    delete prf._elset;
                }
                if(prf._shadow){
                    prf._shadow.remove();
                    prf._shadow.clear();
                    delete prf._shadow;
                }
            };
            prf.box._initAttr2UI(prf);
        },
        _RenderSVG:function(prf){
            prf._pathCached={};
            var p=prf.parent;
            if(p && p._paper && p._canvas){
                prf._elset=this._draw(p._paper, prf, prf.properties);
                for(var i=1,l=prf._elset.length;i<l;i++){
                    prf._elset._rootNode=prf._elset[0];
                }
            }
        },
        _adjustAttr:function(attr){
            var ns=this,
                attr2={},
                attr3=xui.svg.$attr;
            // get valid attr
            xui.each(attr,function(o,i){
                if(/^[A-Z_]+(_[0-9]+)?$/.test(i) && xui.isHash(o) && ((i.indexOf("_")!=-1)||( i in ns.$tagName))){
                    attr2[i]=attr2[i]||{};
                    xui.each(o,function(o1,i1){
                        if(attr3[ns.$tagName[i]|| i.split("_")[0].toLowerCase()][i1])
                            attr2[i][i1]=o1;
                    });
                }else if(attr3[ns.$tagName.KEY][i]){
                    attr2.KEY=attr2.KEY||{};
                    attr2.KEY[i]=o;
                }
            });
            return attr2;
        },
        _initAttr2UI:function(prf){
            var attr=this._adjustAttr(prf.properties.attr);
            // set svg attr
            if(prf._elset){
                prf.boxing().setAttr(attr);
            }
            if(prf.properties.shadow)
                prf.boxing().setShadow(true,true);
        },
        $adjustBB:function(key,value){
            var bb=typeof(key)=='object'?key:{},keys="left,top,right,bottom,x,y,x2,y2,width,height".split(",");
            if(typeof(key)=="string")bb[key]=value;
            xui.filter(bb,function(v,k){
                if(xui.arr.indexOf(keys,k)==-1 || v==='auto' || v==='')return false;
                if(!xui.isNumb(v)){
                    bb[k]=parseFloat(v)||0;
                    return false;
                }
            });
            if('left' in bb){bb.x=bb.left;delete bb.left;}
            if('top' in bb){bb.y=bb.top;delete bb.top;}
            if('right' in bb){bb.x2=bb.right;delete bb.right;}
            if('bottom' in bb){bb.y2=bb.bottom;delete bb.bottom;}
            // conflict
            if('x' in bb && 'width' in bb)delete bb.x2;
            if('y' in bb && 'height' in bb)delete bb.y2;
            // recaculate
            if('x2' in bb){
                if('width' in bb) bb.x=bb.x2-bb.width;
                else bb.width=bb.x2-bb.x;
                delete bb.x2;
            }
            if('y2' in bb){
                if('height' in bb)bb.y=bb.y2-bb.height;
                else bb.height=bb.y2-bb.y;
                delete bb.y2;
            }

            return bb;
        },
        $transform:function(opath,trans){
            if(!xui.isStr(opath))opath=opath.join('');
            if(/[mlhvcsqtaz]/.test(opath)){
                opath = Raphael._pathToAbsolute(opath);
            }else{
                opath=Raphael.parsePathString(opath);
            }
            var npath=Raphael.transformPath(opath,trans),
                rotate=/[r]/.test(trans);
            for(var i=0,l=npath.length,ll,t;i<l;i++){
                if(npath[i][0]!=opath[i][0]){
                    ll=npath[i].length;
                    switch (t=opath[i][0]) {
                    case "M":
                        // keep "M"
                        break;
                    case "L":
                        npath[i]=[t,npath[i][ll-2],npath[i][ll-1]];
                        break;
                    case "H":
                        if(rotate)
                            npath[i]=["L",npath[i][ll-2],npath[i][ll-1]];
                        else
                            npath[i]=[t,npath[i][ll-2]];
                        break;
                    case "V":
                        if(rotate)
                            npath[i]=["L",npath[i][ll-2],npath[i][ll-1]];
                        else
                            npath[i]=[t,npath[i][ll-1]];
                        break;
                    case "C":
                        // keep "C"
                        break;
                    case "Q":
                        npath[i]=[t,npath[i][ll-6],npath[i][ll-5],npath[i][ll-2],npath[i][ll-1]];
                        break;
                    case "S":
                        npath[i]=[t,npath[i][ll-4],npath[i][ll-3],npath[i][ll-2],npath[i][ll-1]];
                        break;
                    case "T":
                        npath[i]=[t,npath[i][ll-2],npath[i][ll-1]];
                        break;
                    case "A":
                        // keep "C"
                        break;
                    //case "R":
                    case "Z":
                        npath[i]=[t];
                        break;
                    default:
                        continue;
                    }
                }
            }
            return npath.join('');
        },
        $setBB:function(prf,type,bbox,attr,el,notify){
            var h={},
                // for IE9 cant set bbox prop
                copy=function(o){var a={};for(var i in o)a[i]=o[i];return a;};
            switch(type){
                case 'circle':{
                    if(xui.isNumb(bbox.width))
                        h.r=bbox.width/2;
                    if(xui.isNumb(bbox.height)){
                        if(bbox.height/2>=attr.r && (xui.isSet(h.r)?h.r>=attr.r:1))
                            h.r=xui.isSet(h.r)?Math.max(h.r,bbox.height/2):(bbox.height/2);
                        else
                            h.r=xui.isSet(h.r)?Math.min(h.r,bbox.height/2):(bbox.height/2);
                    }
                    h.cx=xui.isNumb(bbox.x)?(bbox.x+(xui.isSet(h.r)?h.r:attr.r)):(attr.cx+(xui.isSet(h.r)?(h.r-attr.r):0));
                    h.cy=xui.isNumb(bbox.y)?(bbox.y+(xui.isSet(h.r)?h.r:attr.r)):(attr.cy+(xui.isSet(h.r)?(h.r-attr.r):0));
                }break;
                case 'ellipse':{
                    if(xui.isNumb(bbox.width))
                        h.rx=bbox.width/2;
                    if(xui.isNumb(bbox.height))
                        h.ry=bbox.height/2;
                    h.cx=xui.isNumb(bbox.x)?(bbox.x+(xui.isSet(h.rx)?h.rx:attr.rx)):(attr.cx+(xui.isSet(h.rx)?(h.rx-attr.rx):0));
                    h.cy=xui.isNumb(bbox.y)?(bbox.y+(xui.isSet(h.ry)?h.ry:attr.ry)):(attr.cy+(xui.isSet(h.ry)?(h.ry-attr.ry):0));
                }break;
                case 'rect':
                case 'image':{
                    if(xui.isNumb(bbox.x))
                        h.x=bbox.x;
                    if(xui.isNumb(bbox.y))
                        h.y=bbox.y;
                    if(xui.isNumb(bbox.width))
                        h.width=bbox.width;
                    if(xui.isNumb(bbox.height))
                        h.height=bbox.height;
                }break;
                case 'text':{
                    var obbox,textAnchor;
                    // must get real size first
                    if(el){
                        el._.dirty=1;
                        obbox=copy(el._getBBox(true));
                        textAnchor=el.attr('text-anchor');
                    }else{
                        var div=xui.Dom.getEmptyDiv(),
                            r=Raphael(div.get(0).id,1,1),
                            t=r.text(0,0,attr.text);
                       obbox=copy(t._getBBox(true));
                       textAnchor=t.attr('text-anchor');
                       t.remove();
                       r.remove();
                       div.empty();
                    }
                    
                    if(xui.isNumb(bbox.x))
                        obbox.x=bbox.x;
                    if(xui.isNumb(bbox.y))
                        obbox.y=bbox.y;
                        
                    //if('hAlign' in prf.box.$DataModel){
                        var ha=attr.hAlign||'center',
                            va=attr.vAlign||'middle',
                            offsetx=obbox?(textAnchor=='start'?-obbox.width/2:textAnchor=='middle'?0:obbox.width/2):0;
    
                        if(xui.isNumb(bbox.x)){
                            if(ha=='center'){
                                if(xui.isNumb(bbox.width)){
                                    h.x=bbox.x + bbox.width/2;
                                }else{
                                    h.x=bbox.x+(obbox?(obbox.width/2):0);
                                }
                            }else if(ha=='left'){
                                h.x=bbox.x+(obbox?(obbox.width/2):0);
                            }else if(ha=='outterleft'){
                                h.x=bbox.x-(obbox?(obbox.width/2):0);
                            }else if(ha=='right'){
                                if(xui.isNumb(bbox.width)){
                                    h.x=bbox.x+bbox.width-(obbox?(obbox.width/2):0);
                                }else{
                                    //
                                }
                            }else if(ha=='outterright'){
                                if(xui.isNumb(bbox.width)){
                                    h.x=bbox.x+bbox.width+(obbox?(obbox.width/2):0);
                                }else{
                                    //
                                }
                            }else{
                                if(xui.isNumb(bbox.width)){
                                    h.x=bbox.x+bbox.width*parseFloat(ha)/100;
                                }else{
                                    h.x=bbox.x+(obbox?(obbox.width*parseFloat(ha)/100):0);
                                }
                            }
                            h.x += offsetx;
                        }
    
                        if(xui.isNumb(bbox.y)){
                            if(va=='middle'){
                                if(xui.isNumb(bbox.height)){
                                    h.y=bbox.y+bbox.height/2;
                                }else{
                                    h.y=bbox.y+(obbox?(obbox.height/2):0);
                                }
                            }else if(va=='top'){
                                h.y=bbox.y+(obbox?(obbox.height/2):0);
                            }else if(va=='outtertop'){
                                h.y=bbox.y-(obbox?(obbox.height/2):0);
                            }else if(va=='bottom'){
                                if(xui.isNumb(bbox.height)){
                                    h.y=bbox.y+bbox.height-(obbox?(obbox.height/2):0);
                                }else{
                                    //
                                }
                            }else if(va=='outterbottom'){
                                if(xui.isNumb(bbox.height)){
                                    h.y=bbox.y+bbox.height+(obbox?(obbox.height/2):0);
                                }else{
                                    //
                                }
                            }else{
                                if(xui.isNumb(bbox.height)){
                                    h.y=bbox.y+bbox.height*parseFloat(va)/100;
                                }else{
                                    h.y=bbox.y+(obbox?(obbox.height*parseFloat(va)/100):0);
                                }
                            }
                        }
                    /*}else{
                        if(xui.isNumb(obbox.x))
                            h.x=obbox.x;
                        if(xui.isNumb(obbox.y))
                            h.y=obbox.y;
                        if(xui.isNumb(obbox.width))
                            h.width=obbox.width;
                        if(xui.isNumb(obbox.height))
                            h.height=obbox.height;
                    }*/
                }break;
                case 'path':{
                    var obbox;
                    if(el){
                        el._.dirty=1;
                        obbox=copy(el._getBBox(true));
                    }else{
                        var div=xui.Dom.getEmptyDiv(),
                            r=Raphael(div.get(0).id,1,1),
                            t=r.path("");
                       t.attr(attr);
                       obbox=copy(t._getBBox(true));
                       t.remove();
                       r.remove();
                       div.empty();
                    }
                    var obbox2=copy(obbox);
                    
                    //if(obbox.width===0 || obbox.height===0)
                    //    return;

                    if(xui.isNumb(bbox.x))
                        h.x=bbox.x;
                    if(xui.isNumb(bbox.y))
                        h.y=bbox.y;
                    if(xui.isNumb(bbox.width))
                        h.width=bbox.width;
                    if(xui.isNumb(bbox.height))
                        h.height=bbox.height;

                    if(('x' in h && obbox.x!==h.x)||('y' in h && obbox.y!==h.y)){
                        var x=0,y=0;
                        if('x' in h){
                            x=h.x-obbox.x;
                            obbox.x=h.x;
                        }
                        if('y' in h){
                            y=h.y-obbox.y;
                            obbox.y=h.y;
                        }

                        var paths=Raphael.parsePathString(attr.path);
                        for(var i=0, ii=paths.length, l; i<ii; i++){
                            l = paths[i].length;
                            switch (paths[i][0]) {
                                case "M":
                                case "L":
                                    paths[i][1] += x;
                                    paths[i][2] += y;
                                    break;
                                case "H":
                                    paths[i][1] += x;
                                    break;
                                case "V":
                                    paths[i][1] += y;
                                    break;
                                case "C":
                                    paths[i][1] += x;
                                    paths[i][2] += y;
                                    paths[i][3] += x;
                                    paths[i][4] += y;
                                    paths[i][5] += x;
                                    paths[i][6] += y;
                                    break;
                                case "Q":
                                case "S":
                                    paths[i][1] += x;
                                    paths[i][2] += y;
                                    paths[i][3] += x;
                                    paths[i][4] += y;
                                    break;
                                case "T":
                                    paths[i][1] += x;
                                    paths[i][2] += y;
                                    break;
                                case "A":
                                    paths[i][l-2] += x;
                                    paths[i][l-1] += y;
                                    continue;
                                //case "R":
                                //case "Z":
                                default:
                                    continue;
                            }
                        }
                        h.path=paths.join('');
                    }
                    if(('width' in h && obbox.width!==h.width)||('height' in h && obbox.height!==h.height)){
                        var ww=('width' in h)?h.width:null,
                            hh=('height' in h)?h.height:null,
                            opath= h.path ||attr.path,
                            npath=xui.svg.$transform(opath, "s"+((xui.isSet(ww)&&ww!==obbox2.width)?(obbox2.width===0?(ww>=0?1.1:0.9):ww/obbox2.width):"1")+","+((xui.isSet(hh)&&hh!==obbox2.height)?(obbox2.height===0?(hh>=0?1.1:0.9):hh/obbox2.height):"1")+","+obbox.x+","+obbox.y);
                        h.path=npath;
                    }
                }break;
            }

            var attr2=xui.svg.$attr[type];
            xui.filter(h,function(o,i){
                if(xui.isSet(o) && (i in attr2)){
                    attr[i]=o;
                }else{
                    return false;
                }
            });
            if(el && (!xui.isEmpty(h))){
                // keep transfrom
                var ts=Raphael.parseTransformString(el.transform()),withTransform;
                if(ts && ts.length){
                    withTransform=1;
                    el.transform("");

                    //for rotate setting
                    var ir=-1, it=-1, rot; 
                    for(var i=0,l=ts.length; i<l; i++){
                        if(ts[i][0]=='r'){
                            ir = i;
                            rot = ts[i][1];
                        }else if(ts[i][0]=='t'){
                            it = i;
                        }
                    }
                    if(it!=-1 && ir!=-1){
                        // recalculate it back precisely
                        el.rotate(rot);
                        var ts2=Raphael.parseTransformString(el.transform());
                        //reset it gain
                        el.transform("");
                        ts[it][1]-=ts2[0][1];
                        ts[it][2]-=ts2[0][2];
                        
                        if(!ts[it][1] && !ts[it][2]){
                            xui.arr.removeFrom(ts, it);
                        }
                    }
                }

                el.attr(h);

                // reset transform
                if(withTransform){
                    el.transform("r"+rot);
                }

                if(notify!==false)
                    prf.box._notify(prf,{bBox:1},true);
            }
        },
        _syncAttr:function(prf,options,shapeChanged){
            prf._pathCached={};
        },
        _notify:function(prf, options, shapeChanged){
            // sync attr
            if(prf.box._syncAttr){
                prf.box._syncAttr(prf,options,shapeChanged);
            }
            // sync connectors
            if(shapeChanged && !prf.box._CONNECTOR && prf.box._syncConnectors){
                prf.box._syncConnectors(prf);
            }
            // refresh shadow
            if(shapeChanged && prf._shadow){
                prf.boxing().setShadow(false).setShadow(true);
            }
        },
        _draw:function(){},

        _syncConnectors:function(prf){
            // find all connectors connected to me
            // redraw those connectors
            if(prf.parent.key!=="xui.UI.SVGPaper")return;

            var children=xui.get(prf,['parent','children']),
                alias=prf.alias;
            if(children&&children.length){
                xui.arr.each(children,function(o,i){
                    if(!o[0].destroyed && prf.renderCompleted && o[0].renderCompleted && o[0].key==="xui.svg.connector"){
                        if(alias===xui.get(o[0],['properties','fromObj'])){
                            // redraw from point
                            o[0].box._reconnect(o[0],prf);
                        }
                        if(alias===xui.get(o[0],['properties','toObj'])){
                            // redraw to point
                            o[0].box._reconnect(o[0],null,prf);
                        }
                    }
                });
            }
        },
        _syncAlias:function(prf,oa,na){
            // find all connectors connected on me, sync alias
            var children=xui.get(prf,['parent','children']);
            if(children&&children.length){
                xui.arr.each(children,function(o,i){
                    if(o[0].key==="xui.svg.connector"){
                        if(oa===xui.get(o[0],['properties','fromObj'])){
                            xui.set(o[0],['properties','fromObj'],na);
                        }
                        if(oa===xui.get(o[0],['properties','toObj'])){
                            xui.set(o[0],['properties','toObj'],na);
                        }
                    }
                });
            }
        }
    }
});

xui.Class("xui.svg.circle", "xui.svg",{
    Instance:{
        _setBBox:function(key,value){
            var bb=xui.svg.$adjustBB(key,value);
            return this.each(function(prf){
                xui.svg.$setBB(prf,'circle', bb, prf.properties.attr, prf._elset&&prf._elset[0]);
            });
        }
    },
    Static:{
        DataModel:{
            attr:{
                ini:{cx:0,cy:0,r:20}
            }
        },
        Templates:{
            tagName:'circle'
        },
        _draw:function(paper, prf, prop){
            prop=prop.attr;
            var el = paper.circle(prop.cx,prop.cy,prop.r);
            el.node.id=prf.box.KEY+":"+prf.serialId+":";
            return paper.set().push(el);
        }
    }
});
xui.Class("xui.svg.ellipse", "xui.svg",{
    Instance:{
        _setBBox:function(key,value){
            var bb=xui.svg.$adjustBB(key,value);
            return this.each(function(prf){
                xui.svg.$setBB(prf,'ellipse', bb, prf.properties.attr, prf._elset&&prf._elset[0]);
            });
        }
    },
    Static:{
        DataModel:{
            attr:{
                ini:{cx:0,cy:0,rx:20,ry:40}
            }
        },
        Templates:{
            tagName:'ellipse'
        },
        _draw:function(paper, prf, prop){
            prop=prop.attr;
            var el = paper.ellipse(prop.cx,prop.cy,prop.rx,prop.ry);
            el.node.id=prf.box.KEY+":"+prf.serialId+":";
            return paper.set().push(el);
        }
    }
});
xui.Class("xui.svg.rect", "xui.svg",{
    Instance:{
        _setBBox:function(key,value){
            var bb=xui.svg.$adjustBB(key,value);
            return this.each(function(prf){
                xui.svg.$setBB(prf,'rect', bb, prf.properties.attr, prf._elset&&prf._elset[0]);
            });
        }
    },
    Static:{
        DataModel:{
            attr:{
                ini:{x:0,y:0,r:0,width:40,height:40}
            }
        },
        Templates:{
            tagName:'rect'
        },
        _draw:function(paper, prf, prop){
            prop=prop.attr;
            var el = paper.rect(prop.x,prop.y,prop.width,prop.height,prop.r);
            el.node.id=prf.box.KEY+":"+prf.serialId+":";
            return paper.set().push(el);
        }
    }
});
xui.Class("xui.svg.image", "xui.svg",{
    Instance:{
        _setBBox:function(key,value){
            var bb=xui.svg.$adjustBB(key,value);
            return this.each(function(prf){
                xui.svg.$setBB(prf,'image', bb, prf.properties.attr, prf._elset&&prf._elset[0]);
            });
        }
    },
    Static:{
        IMGNODE:1,
        DataModel:{
            attr:{
                ini:{src:"",x:0,y:0,width:20,height:20}
            }
        },
        Templates:{
            tagName:'image'
        },
        _draw:function(paper, prf, prop){
            prop=prop.attr;
            var el = paper.image(xui.adjustRes(prop.src),prop.x,prop.y,prop.width,prop.height);
            el.node.id=prf.box.KEY+":"+prf.serialId+":";
            return paper.set().push(el);
        }
    }
});
xui.Class("xui.svg.text", "xui.svg",{
    Instance:{
        _setBBox:function(key,value){
            var bb=xui.svg.$adjustBB(key,value);
            return this.each(function(prf){
                xui.svg.$setBB(prf,'text', bb, prf.properties.attr, prf._elset&&prf._elset[0]);
            });
        }
    },
    Static:{
        DataModel:{
            attr:{
                ini:{x:0,y:0,text:"text"}
            },
            text:{
                ini:undefined,
                hidden:true,
                set:function(value){
                    this.boxing().setAttr('KEY',{text:this.properties.text=value||""},false);
                }
            }
        },
        Templates:{
            tagName:'text'
        },
        _draw:function(paper, prf, prop){
            prop=prop.attr;
            var el = paper.text(prop.x,prop.y,prop.text);
            if(xui.isSet(prop.text))el.attr('text',prop.text);
            el.node.id=prf.box.KEY+":"+prf.serialId+":";
            return paper.set().push(el);
        }
    }
});
xui.Class("xui.svg.path", "xui.svg",{
    Instance:{
        getPath:function(){
            var prf=this.get(0),prop=prf.properties;
            if(prf._elset && prf._elset[0])prop.path=prf._elset[0].attr('path').join('');
            return prop.path;
        },
        _getConnectAnchors:function(){
            // no solid anchors
        },
        _setBBox:function(key,value){
            var bb=xui.svg.$adjustBB(key,value);
            return this.each(function(prf){
                xui.svg.$setBB(prf,'path', bb, prf.properties.attr, prf._elset&&prf._elset[0]);
            });
        }
    },
    Static:{
        $abstract:true,
        _draw:function(paper, prf, prop){
            prop=prop.attr;
            var el = paper.path(prop.path);
            el.node.id=prf.box.KEY+":"+prf.serialId+":";
            return paper.set().push(el);
        },
        DataModel:{
            attr:{
                ini:{path:""}
            }
        },
        Templates:{
            tagName:'path'
        }
    }
});

xui.Class("xui.svg.absComb", "xui.svg",{
    Instance:{
        _setBBox:function(key,value,notify){
            var bb=xui.svg.$adjustBB(key,value);
            return this.each(function(prf){
                var prop=prf.properties, ss=prf._elset;
                xui.svg.$setBB(prf,prf.box._type, bb, prop.attr.KEY, ss&&ss[0]);

                if(prf.renderId && ss&&ss[0]){
                    if(prop.attr.TEXT&&prop.attr.TEXT.text){
                        var attr=xui.copy(prop.attr.TEXT||{}),att2=ss[0]._getBBox(true);
                        attr.hAlign=prop.hAlign;
                        attr.vAlign=prop.vAlign;
                        if(!('x' in bb))bb.x=att2.x;
                        if(!('y' in bb))bb.y=att2.y;
                        if(!('width' in bb))bb.width=att2.width;
                        if(!('height' in bb))bb.height=att2.height;
                        xui.svg.$setBB(prf,"text", bb, attr, ss&&ss[1],notify);
                    }
                }
            });
        },
        _adjustText:function(){
            return this.each(function(prf){
                var prop=prf.properties, ss=prf._elset;
                if(prf.renderId && ss && ss[0]){
                    if(prop.attr.TEXT && prop.attr.TEXT.text){
                        var attr=xui.copy(prop.attr.TEXT||{}),att2=ss[0]._getBBox(true);
                        attr.hAlign=prop.hAlign;
                        attr.vAlign=prop.vAlign;
                        xui.svg.$setBB(prf,"text", att2, attr, ss[1], false);
                    }
                }
            });
        },
        setAttr:function(key, value, reset, notify){
            var h;
            if(xui.isHash(key))h=key;
            else{
                h={};
                h[key]=value;
            };
            arguments.callee.upper.call(this, key, value, reset, notify);
            return this.each(function(prf){
                if(prf._elset){
                    // adjust text postion
                    if((h=h.TEXT)&&h['text-anchor'])
                        prf.boxing()._adjustText();
                }
            });
        }
    },
    Static:{
        $abstract:true,
        ISCOMBO:1,
        _beforeSerialized:function(profile){
            var o = arguments.callee.upper.call(this,profile),prop=o.properties;
            prop.attr=xui.clone(prop.attr,true);
            xui.filter(prop.attr.KEY,function(o,i){
                if(i=='transform'&&(!o||o.length<1))return false;
                if(i=='href'||i=='target')return false;
                if(i=='path' && xui.isArr(prop.attr.KEY.path))prop.attr.KEY.path=o.join('');
            });
            if(prop.attr.TEXT){
                xui.filter(prop.attr.TEXT,function(o,i){
                    // TEXT's transform is from KEY
                    if(i=='transform')return false;
                    // TEXT's postition is caculated from KEY
                    if(i=='x'||i=='y')return false;
                    if(i=='href'||i=='target')return false;
                });
            }
            delete prop.text;
            return o;
        },
        DataModel:{
            attr:{
                ini:{
                    KEY:{
                    },
                    TEXT:{
                    }
                }
            },
            hAlign:{
                ini:'center',
                combobox:['left','25%','center','75%','right','outterleft','outterright'],
                action: function(){
                    // adjust text postion
                    this.boxing()._adjustText();
                }
            },
            vAlign:{
                ini:'middle',
                combobox:['top','25%','middle','75%','bottom','outtertop','outterbottom'],
                action: function(){
                    // adjust text postion
                    this.boxing()._adjustText();
                }
            },
            text:{
                ini:undefined,
                hidden:true,
                get:function(){
                    var att=this.boxing().getAttr('TEXT');
                    return att&&att.text;
                },
                set:function(value){
                        this.boxing().setAttr('TEXT',{text:value||""},false);
                }
            },
            shadow:true
        },
        Behaviors:{
            onClick:function(profile, e, src){
                if(profile.$inDesign)return false;
                var p=profile.properties;
                if(p.disabled)return false;
                //onClick event
                if(profile.onClick)
                    return profile.boxing().onClick(profile, e, src);
            },
            onDblclick:function(profile, e, src){
                if(profile.$inDesign)return false;
                var p=profile.properties;
                if(p.disabled)return false;
                //onClick event
                if(profile.onDblClick)
                    return profile.boxing().onDblClick(profile, e, src);
            },            
            onContextmenu:function(profile, e, src){
                if(profile.onContextmenu)
                    return profile.boxing().onContextmenu(profile, e, src)!==false;
            },
            TEXT:{
                onClick:function(profile, e, src){
                    if(profile.$inDesign)return false;
                    var p=profile.properties,rtn;
                    if(p.disabled)return false;
                    //onClick event
                    if(profile.onTextClick)
                        rtn=profile.boxing().onTextClick(profile, e, src);
                    if(rtn!==false && profile.onClick)
                        return profile.boxing().onClick(profile, e, src);
                },
                onDblclick:function(profile, e, src){
                    if(profile.$inDesign)return false;
                    var p=profile.properties;
                    if(p.disabled)return false;
                    //onClick event
                    if(profile.onDblClick)
                        return profile.boxing().onDblClick(profile, e, src);
                },
                onContextmenu:function(profile, e, src){
                    if(profile.onContextmenu)
                        return profile.boxing().onContextmenu(profile, e, src)!==false;
                }
            }
        },
        EventHandlers:{
            onTextClick:function(profile, e, src){}
        },
        _initAttr2UI:function(prf){
            arguments.callee.upper.call(this,prf);

            // adjust text postion
            prf.boxing()._adjustText();

            // transform
            var ss=prf._elset;
            if(ss&&ss[1]){
                var tf=ss[0].attr('transform');
                for(var i=1,l=ss.length;i<l;i++)
                    ss[i].attr('transform', tf);
            }
        },
        _syncAttr:function(prf,options,shapeChanged){
            var upper=arguments.callee.upper, args=xui.toArr(arguments);
            upper.apply(this,args);
            upper=null;
            if(shapeChanged){
                prf.boxing()._adjustText();
            }
        },
        _draw:function(paper, prf, prop){
            var s=paper.set(), attr=prop.attr.KEY,att2=prop.attr.TEXT,
                el = this._drawRoot(paper,attr);

            el.node.id=prf.box.KEY+":"+prf.serialId+":";
            s.push(el);

            el = paper.text(attr.x, attr.y, att2.text);
            el.node.id=prf.box.KEY+"-TEXT:"+prf.serialId+":";
            s.push(el);

            return s;
        }
    }
});
xui.Class("xui.svg.rectComb", "xui.svg.absComb",{
    Static:{
        _type:'rect',
        Templates:{
            tagName:'rect',
            TEXT:{
                tagName:'text',
                svg:1
            }
        },
        _drawRoot:function(paper,attr){
            return paper.rect(attr.x,attr.y,attr.width,attr.height);
        }
    }
});
xui.Class("xui.svg.circleComb", "xui.svg.absComb",{
    Static:{
        _type:'circle',
        Templates:{
            tagName:'circle',
            TEXT:{
                tagName:'text',
                svg:1
            }
        },
        _drawRoot:function(paper,attr){
            return paper.circle(attr.cx,attr.cy,attr.r);
        }
    }
});
xui.Class("xui.svg.ellipseComb", "xui.svg.absComb",{
    Static:{
        _type:'ellipse',
        Templates:{
            tagName:'ellipse',
            TEXT:{
                tagName:'text',
                svg:1
            }
        },
        _drawRoot:function(paper,attr){
            return paper.ellipse(attr.cx,attr.cy,attr.rx,attr.ry);
        }
    }
});
xui.Class("xui.svg.pathComb", "xui.svg.absComb",{
    Static:{
        _type:'path',
        Templates:{
            tagName:'path',
            TEXT:{
                tagName:'text',
                svg:1
            }
        },
        _drawRoot:function(paper,attr){
            return paper.path(attr.path);
        }
    }
});
xui.Class("xui.svg.imageComb", "xui.svg.absComb",{
    Static:{
        IMGNODE:1,
        _type:'image',
        Templates:{
            tagName:'image',
            TEXT:{
                tagName:'text',
                svg:1
            }
        },
        _drawRoot:function(paper,attr){
            return paper.image(attr.src,attr.x,attr.y,attr.width,attr.height);
        }
    }
});


xui.Class("xui.svg.connector","xui.svg.absComb",{
    Instance:{
        _getConnectAnchors:null,
        _getConnectPath:null,
        _getConnectPoint:null,
        toFront:function(){
            return this.each(function(prf){
                if(prf=prf._elset){
                    prf[1].toFront();
                    prf[0].toFront();
                }
                var arr=xui.get(prf,['parent','children']);
                if(arr && arr.length){
                    var index=xui.arr.subIndexOf(arr,"0",prf),o;
                    if(index!=-1){
                        o=arr[index];
                        arr.splice(index,1);
                        arr.push(o);
                    }
                }
            });
        },
        toBack:function(){
            return this.each(function(prf){
                if(prf=prf._elset){
                    prf[0].toBack();
                    prf[1].toBack();
                }
                var arr=xui.get(prf,['parent','children']);
                if(arr && arr.length){
                    var index=xui.arr.subIndexOf(arr,"0",prf),o;
                    if(index!=-1){
                        o=arr[index];
                        arr.splice(index,1);
                        arr.unshift(o);
                    }
                }
            });
        }
    },
    Static:{
        _CONNECTOR:true,
        _beforeSerialized:function(profile){
            var o = arguments.callee.upper.call(this,profile),prop=o.properties;
            if(prop.attr.BG){
                delete prop.attr.BG.path;
                delete prop.attr.BG['arrow-start'];
                delete prop.attr.BG['arrow-end'];
            }
            return o;
        },
        DataModel:{
            hAlign:null,
            vAlign:null,
            shadow:null,

            bgLine:{
                ini:true,
                action:function(v){
                    if(this._bg){
                        if(v)this._bg.show();else this._bg.hide();
                    }
                }
            },
            attr:{
                ini:{
                    KEY:{path:""}//,
                   // TEXT:{text:""}
                }
            },
            type:{
                ini:'straight',
                listbox:['straight','bezier','flowchart'],
                action:function(v,ov){
                    // stop changing type
                    if(this.renderId)
                        this.properties.type=ov;
                }
            },
            fromObj:"",
            fromPoint:{
                ini:'',
                combobox:['left','top','right','bottom']
            },
            //fromDDKey:"default",

            toObj:"",
            toPoint:{
                ini:'',
                combobox:['left','top','right','bottom']
            }//,
            //toDDKey:"default",

            //textPos:0.5

        },
        _type:'path',
        Templates:{
            tagName:'path',
          /*  TEXT:{
                tagName:'text',
                svg:1
            },*/
            BG:{
                tagName:'path',
                svg:1
            }
        },
        _draw:function(paper, prf, prop){
           var s=paper.set(),
               attr=prop.attr.KEY,//att2=prop.attr.TEXT,
               obj1,obj2;

            obj2 = paper.path(attr.path);
            obj2.node.id=prf.box.KEY+":"+prf.serialId+":";
            obj2.onShapeChanged=function(attr){
                if(attr.path)obj1.attr({path:attr.path},null,false);
            };
            s.push(obj2);

            obj1 = paper.path(attr.path);
            
            if(!prf.properties.bgLine)obj1.hide();
            
            obj1.node.id=prf.box.KEY+"-BG:"+prf.serialId+":";
            s.push(obj1);
            obj1.insertBefore(obj2);
            prf._bg=obj1;

            (prf.$beforeDestroy=(prf.$beforeDestroy||{}))["unbind"]=function(){
                obj2.onShapeChanged=null;
                obj2=null;
            };

            /*
                        el = paper.text(attr.x, attr.y, att2.text);
                        el.node.id=prf.box.KEY+"-TEXT:"+prf.serialId+":";
                        s.push(el);
            */
            return s;
        },
        _syncAttr:function(prf,options,shapeChanged){
            var upper=arguments.callee.upper,args=xui.toArr(arguments);
            upper.apply(this,args);
            upper=null;
            prf._pathCached={};

            if(!prf._bg)return;

            var ns=this,prop=prf.properties,t=prf._elset[0],h={},a,k;
            k='path';
            if((k in options) || ('bBox' in options)){
                h[k]=t.attr(k);
            }
            k='arrow-start';
            if(k in options){
                a=t.attr(k);
                a=a.split('-');
                if(a[0]!='none')h[k]=a[0]+"-narrow-short";
                else h[k]='none';
            }
            k='arrow-end';
            if(k in options){
                a=t.attr(k);
                a=a.split('-');
                if(a[0]!='none')h[k]=a[0]+"-narrow-short";
                else h[k]='none';
            }
            prf._bg.attr(h,null,false);

            if(('bBox' in options) && prf.parent){
                if(prop.fromObj&&prop.fromPoint){
                    xui.arr.each(prf.parent.children,function(o){
                        if(o[0].alias==prop.fromObj){
                            ns._reconnect(prf,o[0]);
                            return false;
                        }
                    });
                }
                if(prop.toObj&&prop.toPoint){
                    xui.arr.each(prf.parent.children,function(o){
                        if(o[0].alias==prop.toObj){
                            ns._reconnect(prf,null,o[0]);
                            return false;
                        }
                    });
                }

            }
        },
        // have to set to null
        _reconnect:function(prf,fromPrf,toPrf){
            if(prf.destroyed)return;
            var prop=prf.properties,
                type=prop.type,
                path=Raphael.parsePathString(prop.attr.KEY.path),
                conn=prf.boxing(),
                ins,cp;
            if(fromPrf && prop.fromObj && prop.fromPoint){
                ins=fromPrf.boxing();
                cp=ins._getConnectPoint(prop.fromPoint);
                if(cp){
                    switch(type){
                        case 'flowchart':
                            // need to redraw it
                            var np=this._redrawBrokenLine(prf);
                            if(np){
                                // renew paths
                                path.length=0;
                                xui.arr.each(np,function(p){
                                    path.push(p);
                                });
                            }
                        break;
                        case 'straight':
                            path[0][1]=cp.x;
                            path[0][2]=cp.y;
                        break;
                        case 'bezier':
                            var ox=cp.x-path[0][1],
                                oy=cp.y-path[0][2];
                            path[0][1]=cp.x;
                            path[0][2]=cp.y;
                            path[1][1]+=ox;
                            path[1][2]+=oy;
                        break;
                    }
                    conn.setAttr("KEY",{path:path},false);
                }
            }
            if(toPrf && prop.toObj  && prop.toPoint){
                ins=toPrf.boxing();
                cp=ins._getConnectPoint(prop.toPoint);
                if(cp){
                    var l=path.length-1;
                    if( (path[l][0]||"").toUpperCase()=='Z')l--;
                    switch(type){
                        case 'flowchart':
                            // need to redraw it
                            var np=this._redrawBrokenLine(prf);
                            if(np){
                                // renew paths
                                path.length=0;
                                xui.arr.each(np,function(p){
                                    path.push(p);
                                });
                            }
                        break;
                        case 'straight':
                            path[l][1]=cp.x;
                            path[l][2]=cp.y;
                        break;
                        case 'bezier':
                            var ox=cp.x-path[l][5],
                                oy=cp.y-path[l][6];
                            path[l][5]=cp.x;
                            path[l][6]=cp.y;
                            path[l][3]+=ox;
                            path[l][4]+=oy;
                        break;
                    }
                    conn.setAttr("KEY",{path:path},false);
                }
            }
        },
        _redrawBrokenLine:function(prf,inputPoint,x,y){
            var offset=30,
                offsetx=30,
                offsety=30,
                prop=prf.properties,
                attr=prop.attr.KEY,
                opath=Raphael.parsePathString(attr.path),
                startConn=prop.fromObj && prop.fromPoint,
                endConn=prop.toObj && prop.toPoint,
                startPoints,endPoints,
                startPath=[],endPath=[],
                startPathLen=[],endPathLen=[],
                ins,
                sPath,ePath,sBox,eBox,
                sPoint,ePoint,angle,sCenter,eCenter,
                sdir,edir,
                t;
            // Collect possible start points
            if(startConn){
                ins=null;
                //startPoints 3
                xui.arr.each(prf.parent.children,function(p){
                    if(p[0].alias==prop.fromObj){
                        ins=p[0].boxing();
                        sPoint=ins._getConnectPoint(prop.fromPoint);
                        if(sPoint){
                            sPath=ins._getConnectPath();

                            if(sBox=xui.get(p[0]._pathCached,['_connBBox'])){
                            }else{
                                sBox=Raphael.pathBBox(sPath);
                                xui.set(p[0]._pathCached,['_connBBox'], sBox)
                            }

                            if(sPoint.solid){
                                angle=sPoint.alpha;
                            }else{
                                angle=sPoint.alpha-90;
                            }
                            sCenter={x:sBox.x+sBox.width/2,y:sBox.y+sBox.height/2};
                            sdir = (angle>45&&angle<=135)?'down':
                                  (angle>135&&angle<=225)?'left':
                                  (angle>225&&angle<=315)?'up':'right';
                            if(sdir=='down'&&sPoint.y<sCenter.y)
                                sdir='up';
                            if(sdir=='right'&&sPoint.x<sCenter.x)
                                sdir='left';
                        }
                        return false;
                    }
                });
            }
            if(endConn){
                ins=null;
                //endPoints 3
                xui.arr.each(prf.parent.children,function(p){
                    if(p[0].alias==prop.toObj){
                        ins=p[0].boxing();
                        ePoint=ins._getConnectPoint(prop.toPoint);
                        if(ePoint){
                            ePath=ins._getConnectPath();

                            if(eBox=xui.get(p[0]._pathCached,['_connBBox'])){
                            }else{
                                eBox=Raphael.pathBBox(ePath);
                                xui.set(p[0]._pathCached,['_connBBox'], eBox)
                            }

                            if(ePoint.solid){
                                angle=ePoint.alpha;
                            }else{
                                angle=ePoint.alpha-90;
                            }
                            eCenter={x:eBox.x+eBox.width/2,y:eBox.y+eBox.height/2};
                            edir = (angle>45&&angle<=135)?'down':
                                  (angle>135&&angle<=225)?'left':
                                  (angle>225&&angle<=315)?'up':'right';
                            if(edir=='down'&&ePoint.y<eCenter.y)
                                edir='up';
                            if(edir=='right'&&ePoint.x<eCenter.x)
                                edir='left';
                        }
                        return false;
                    }
                });
            }
            if(sPoint&&ePoint){
                // These points can link to each other directly(opposite)
                if((sdir=='left'&&edir=='right'&&ePoint.x>=sPoint.x)||(sdir=='right'&&edir=='left'&&ePoint.x<=sPoint.x))
                    offsetx=Math.min(offsetx, Math.abs(ePoint.x-sPoint.x)/2);
                if((sdir=='down'&&edir=='up'&&ePoint.y>=sPoint.y)||(sdir=='up'&&edir=='down'&&ePoint.y<=sPoint.y))
                    offsety=Math.min(offsety, Math.abs(ePoint.y-sPoint.y)/2);
            }

            // Collect possible start points
            if(sPoint){
                switch(sdir){
                    case 'down':{
                    startPoints=[
                        {x:sPoint.x, y:t=sPoint.y+offsety},
                        {x:sBox.x-offset, y:t},
                        {x:sBox.x+offset+sBox.width, y:t}
                    ];
                    startPath=[
                        [["M",sPoint.x,sPoint.y],["V",startPoints[0].y]],
                        [["M",sPoint.x,sPoint.y],["V",startPoints[0].y],["H",startPoints[1].x]],
                        [["M",sPoint.x,sPoint.y],["V",startPoints[0].y],["H",startPoints[2].x]]
                    ];
                    startPathLen=[offsety, offsety + Math.abs(startPoints[1].x-startPoints[0].x), offsety + Math.abs(startPoints[2].x-startPoints[0].x)];
                    }break;
                    case 'left':{
                    startPoints=[
                        {x:t=sPoint.x-offsetx, y:sPoint.y},
                        {x:t,y:sBox.y-offset},
                        {x:t,y:sBox.y+offset+sBox.height}
                    ];
                    startPath=[
                        [["M",sPoint.x,sPoint.y],["H",startPoints[0].x]],
                        [["M",sPoint.x,sPoint.y],["H",startPoints[0].x],["V",startPoints[1].y]],
                        [["M",sPoint.x,sPoint.y],["H",startPoints[0].x],["V",startPoints[2].y]]
                    ];
                    startPathLen=[offsetx, offsetx + Math.abs(startPoints[1].y-startPoints[0].y), offsetx + Math.abs(startPoints[2].y-startPoints[0].y)];
                    }break;
                    case 'up':{
                    startPoints=[
                        {x:sPoint.x, y:t=sPoint.y-offsety},
                        {x:sBox.x-offset, y:t},
                        {x:sBox.x+offset+sBox.width, y:t}
                    ];
                    startPath=[
                        [["M",sPoint.x,sPoint.y],["V",startPoints[0].y]],
                        [["M",sPoint.x,sPoint.y],["V",startPoints[0].y],["H",startPoints[1].x]],
                        [["M",sPoint.x,sPoint.y],["V",startPoints[0].y],["H",startPoints[2].x]]
                    ];
                    startPathLen=[offsety, offsety + Math.abs(startPoints[1].x-startPoints[0].x), offsety + Math.abs(startPoints[2].x-startPoints[0].x)];
                    }break;
                    case 'right':{
                    startPoints=[
                        {x:t=sPoint.x+offsetx, y:sPoint.y},
                        {x:t,y:sBox.y-offset},
                        {x:t,y:sBox.y+offset+sBox.height}
                    ];
                    startPath=[
                        [["M",sPoint.x,sPoint.y],["H",startPoints[0].x]],
                        [["M",sPoint.x,sPoint.y],["H",startPoints[0].x],["V",startPoints[1].y]],
                        [["M",sPoint.x,sPoint.y],["H",startPoints[0].x],["V",startPoints[2].y]]
                    ];
                    startPathLen=[offsetx, offsetx + Math.abs(startPoints[1].y-startPoints[0].y), offsetx + Math.abs(startPoints[2].y-startPoints[0].y)];
                    }break;
                }
            }else{
                if(inputPoint=='start'){
                    startPoints=[{x:x,y:y}];
                }else{
                    startPoints=[{x:opath[0][1],y:opath[0][2]}];
                }
                startPath=[
                    [["M",startPoints[0].x,startPoints[0].y]]
                ];
                startPathLen=[0];
            }
            // Collect possible end points
            if(ePoint){
                switch(edir){
                    case 'down':{
                    endPoints=[
                        {x:ePoint.x, y:t=ePoint.y+offsety},
                        {x:eBox.x-offset, y:t},
                        {x:eBox.x+offset+eBox.width, y:t}
                    ];
                    endPath=[
                        [["V",ePoint.y]],
                        [["H",ePoint.x],["V",ePoint.y]],
                        [["H",ePoint.x],["V",ePoint.y]]
                    ];
                    endPathLen=[offsety, offsety + Math.abs(endPoints[1].x-endPoints[0].x), offsety + Math.abs(endPoints[2].x-endPoints[0].x)];
                    }break;
                    case 'left':{
                    endPoints=[
                        {x:t=ePoint.x-offsetx, y:ePoint.y},
                        {x:t,y:eBox.y-offset},
                        {x:t,y:eBox.y+offset+eBox.height}
                    ];
                    endPath=[
                        [["H",ePoint.x]],
                        [["V",ePoint.y],["H",ePoint.x]],
                        [["V",ePoint.y],["H",ePoint.x]]
                    ];
                    endPathLen=[offsetx, offsetx + Math.abs(endPoints[1].y-endPoints[0].y), offsetx + Math.abs(endPoints[2].y-endPoints[0].y)];
                    }break;
                    case 'up':{
                    endPoints=[
                        {x:ePoint.x, y:t=ePoint.y-offsety},
                        {x:eBox.x-offset, y:t},
                        {x:eBox.x+offset+eBox.width, y:t}
                    ];
                    endPath=[
                        [["V",ePoint.y]],
                        [["H",ePoint.x],["V",ePoint.y]],
                        [["H",ePoint.x],["V",ePoint.y]]
                    ];
                    endPathLen=[offsety, offsety + Math.abs(endPoints[1].x-endPoints[0].x), offsety + Math.abs(endPoints[2].x-endPoints[0].x)];
                    }break;
                    case 'right':{
                    endPoints=[
                        {x:t=ePoint.x+offsetx, y:ePoint.y},
                        {x:t,y:eBox.y-offset},
                        {x:t,y:eBox.y+offset+eBox.height}
                    ];
                    endPath=[
                        [["H",ePoint.x]],
                        [["V",ePoint.y],["H",ePoint.x]],
                        [["V",ePoint.y],["H",ePoint.x]]
                    ];
                    endPathLen=[offsetx, offsetx + Math.abs(endPoints[1].y-endPoints[0].y), offsetx + Math.abs(endPoints[2].y-endPoints[0].y)];
                    }break;
                }
            }else{
                if(inputPoint=='end'){
                    endPoints=[{x:x,y:y}];
                }else{
                    var p={x:opath[0][1],y:opath[0][2]};
                    xui.arr.each(opath,function(o){
                        if(o[0]=='H')p.x=o[1];
                        else p.y=o[1];
                    });
                    endPoints=[p];
                }
                endPath=[];
                endPathLen=[0];
            }

            // Collect all possible paths
            var paths=[],path,inter;
            xui.arr.each(startPoints,function(sp,i){
                xui.arr.each(endPoints,function(ep,j){
                    for(var k=0;k<=1;k++){
                        path=xui.clone(startPath[i],true);
                        if(k===0){
                            if(ep.x!==sp.x)path.push(['H',ep.x]);
                            if(ep.y!==sp.y)path.push(['V',ep.y]);
                        }else{
                            if(ep.y!==sp.y)path.push(['V',ep.y]);
                            if(ep.x!==sp.x)path.push(['H',ep.x]);
                        }
                        if(endPath[j] && endPath[j].length)xui.arr.insertAny(path, endPath[j]);

                        paths.push({
                            path:path,
                            len:path.length,
                            len2:(startPathLen[i]||0)+(endPathLen[j]||0)+Math.abs(ep.x-sp.x)+Math.abs(ep.y-sp.y)
                        });
                    }
                });
            });

            // filter repeat segments
            var arr=[];
            xui.filter(paths,function(o){
                var ox=o.path[0][1],
                    oy=o.path[0][2],
                    xdir,ydir,
                    preType;
                for(var i=1,l=o.path.length;i<l;i++){
                    if(preType==o.path[i][0]){
                        if(preType=='H'){
                            if((o.path[i][1]>ox)===xdir){
                                // filter the segement
                                o.path.splice(i-1,1);
                                o.len--;
                                l--;
                                i--;
                                continue;
                            }else{
                                // filter the whole path
                                return false;
                            }
                        }else{
                            if((o.path[i][1]>oy)===ydir){
                                // filter the segement
                                o.path.splice(i-1,1);
                                o.len--;
                                l--;
                                i--;
                                continue;
                            }else{
                                // filter the whole path
                                return false;
                            }
                        }
                    }
                    if(o.path[i][0]=='H'){
                        xdir=o.path[i][1]>ox;
                        ox=o.path[i][1];
                    }else{
                        ydir=o.path[i][1]>oy;
                        oy=o.path[i][1];
                    }
                    preType=o.path[i][0];
                }
            });

            // caculate cross count
            xui.arr.each(paths,function(o){
                inter=0;
                var cx,cy;
                if(sBox||eBox){
                    cx=o.path[0][1];cy=o.path[0][2];
                    xui.arr.each(o.path,function(p,i){
                        if(i!==0){
                            if(p[0]=='H'){
                                if(sBox && cy>=sBox.y && cy<=sBox.y2 && Math.max(cx,p[1])>Math.min(sBox.x,sBox.x2) && Math.min(cx,p[1])<Math.max(sBox.x,sBox.x2))inter++;
                                if(eBox && cy>=eBox.y && cy<=eBox.y2 && Math.max(cx,p[1])>Math.min(eBox.x,eBox.x2) && Math.min(cx,p[1])<Math.max(eBox.x,eBox.x2))inter++;
                                cx=p[1];
                            }else{
                                if(sBox && cx>=sBox.x && cx<=sBox.x2 && Math.max(cy,p[1])>Math.min(sBox.y,sBox.y2) && Math.min(cy,p[1])<Math.max(sBox.y,sBox.y2))inter++;
                                if(eBox && cx>=eBox.x && cx<=eBox.x2 && Math.max(cy,p[1])>Math.min(eBox.y,eBox.y2) && Math.min(cy,p[1])<Math.max(eBox.y,eBox.y2))inter++;
                                cy=p[1];
                            }
                        }
                    });
                }
                o.inter=inter;
            });

            // Sort paths by path length
			// < 22, stable sort
            xui.arr.stableSort(paths,function(x,y){
                return x.inter>y.inter?1:
                       x.inter<y.inter?-1:
                       x.len>y.len?1:
                       x.len<y.len?-1:
                       x.len2>y.len2?1:x.len2==y.len2?0:-1;
            });
            // set the shortest path

            prf.boxing().setAttr('KEY',{path: paths[0].path},false);

            return paths[0].path;
        }
    }
});

xui.Class("xui.svg.group", "xui.svg.absComb",{
    Instance:{
        _adjustText:function(){
            return this;
        },
        _setBBox:function(key,value,notify){
            var bb=xui.svg.$adjustBB(key,value);
            return this.each(function(prf){
                var prop=prf.properties, ss=prf._elset, attrs=prop.attr;
                if(prf.renderId && ss&&ss[0]){
                    var bbo=prf.boxing()._getBBox();
                    ss.forEach(function(el){
                        var attr=attrs[prf.getKey(el.node.id,true)], bbn={};
                        if(el.type=="text"){
                            bbn={x:attr.x, y:attr.y};
                            if('x' in bb)bbn.x+=bb.x-bbo.x;
                            if('y' in bb)bbn.y+=bb.y-bbo.y;
                            attr.x=bbn.x;
                            attr.y=bbn.y;
                            el.attr(bbn);
                        }else{
                            xui.merge(bbn, el._getBBox(true),'all',true);
                            if('x' in bb)bbn.x+=bb.x-bbo.x;
                            if('y' in bb)bbn.y+=bb.y-bbo.y;
                            if('width' in bb)bbn.width+=bb.width-bbo.width;
                            if('height' in bb)bbn.height+=bb.height-bbo.height;
                            xui.svg.$setBB(prf, el.type, bbn, attr, el, notify);
                        }
                    });
                }else{
                    if(!prf._init_bbox)prf._init_bbox={};
                    xui.merge(prf._init_bbox,bb,'all',true);
                }
            });
        }
    },
    Static:{
        ISCOMBO:1,
        _beforeSerialized:function(profile){
            var o = arguments.callee.upper.call(this,profile),prop=o.properties;
            var attrs=prop.attr=xui.clone(prop.attr,true);
            
            xui.filter(attrs.KEY,function(o,i){
                if(i=='transform'&&(!o||o.length<1))return false;
                if(i=='href'||i=='target')return false;
                if(i=='path' && xui.isArr(prop.attr.KEY.path))prop.attr.KEY.path=o.join('');
            });
            // other elements
            xui.each(attrs,function(attr,key){
                if(key=="KEY")return;
                xui.filter(attr,function(o,i){
                    // transform is from KEY
                    if(i=='transform')return false;
                });
                
                var type=key.split("_")[0];
                if(type=="path"){
                    xui.each(attr,function(o,i){
                        if(i=='path' && xui.isArr(o))attr.path=o.join('');
                    });
                }
            });

            return o;
        },
        _type:'path',
        Templates:{
            tagName:'path'
        },
        DataModel:{
            attr:{
                ini:{
                    KEY:{
                    }
                }
            },
            hAlign:null,
            vAlign:null,
            shadow:false
        },
        RenderTrigger:function(){
            var prf=this,bb;
            if(bb=prf._init_bbox){
                prf.boxing()._setBBox(bb);
                delete prf._init_bbox;
            }
        },
        _draw:function(paper, prf, prop){
            var s=paper.set(), attrs=prop.attr, rootattr=attrs.KEY||{path:""},
                el=paper.path(rootattr.path||"");
            el._isGroupFirst=1;
            // root is a path
            el.node.id=prf.box.KEY+":"+prf.serialId+":";
            s.push(el);
            // other elements
            xui.each(attrs,function(attr,key){
                if(key=="KEY")return;
                
                var type=key.split("_")[0].toLowerCase();
                switch(type){
                    case "rect":
                        el = paper.rect(attr.x,attr.y,attr.width,attr.height);
                        break;
                    case "circle":
                        el = paper.circle(attr.cx,attr.cy,attr.r);
                        break;
                    case "ellipse":
                        el = paper.ellipse(attr.cx,attr.cy,attr.rx,attr.ry);
                        break;
                    case "image":
                        el =paper.image(attr.src,attr.x,attr.y,attr.width,attr.height);
                        break;
                    case "path":
                        el =paper.path(attr.path);
                        break;                    
                    case "text":
                        el = paper.text(attr.x, attr.y, attr.text);
                        break;
                    default:
                        return;
                }
                var src = xui(this.node).xid();
                if(type=="text"){
                    el.click(function(e){
                        if(prf.$inDesign)return false;
                        if(prf.properties.disabled)return false;
                        var rtn;
                        if(prf.onTextClick)
                            rtn=prf.boxing().onTextClick(prf, e, src);
                        if(rtn!==false && prf.onClick)
                            return prf.boxing().onClick(prf, e, src);
                    });
                }else{
                    el.click(function(e){
                        if(prf.$inDesign)return false;
                        if(prf.properties.disabled)return false;
                        if(prf.onClick)
                            return prf.boxing().onClick(prf, e, src);
                    });
                }
                el.dblclick(function(e){
                    if(prf.$inDesign)return false;
                    if(prf.properties.disabled)return false;
                    if(prf.onDblClick)
                        return prf.boxing().onDblClick(prf, e, src);
                });
                el.contextmenu(function(e){
                    if(prf.onContextmenu)
                        return prf.boxing().onContextmenu(prf, e, src)!==false;
                });
                el.node.id=prf.box.KEY+"-"+key+":"+prf.serialId+":";
                s.push(el);
            });
            return s;
        }
    }
});