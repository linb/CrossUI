xui.Class("xui.UI.SVGPaper", "xui.UI.Div",{
    Initialize:function(){
        this.addTemplateKeys(['SVG']);
    },
    Instance:{
        append:function(target, pre, base){
            if(xui.isHash(target) || xui.isStr(target))
                target=xui.create(target);
            if(target['xui.UIProfile'])target=target.boxing();

            var ns=this,f=arguments.callee.upper,isSvg,rendersvg;
            target.each(function(prf){
                isSvg=!!prf.box['xui.svg'];
                if(isSvg&&prf.renderId){
                    prf.clearCache();
                    prf.$beforeDestroy["svgClear"]();
                    delete prf.renderId;
                    delete prf.rendered;
                    rendersvg=1;
                }
                f.call(ns, prf, null, pre, base, isSvg, ns.get(0)&&xui(ns.get(0)._canvas));
                if(rendersvg){
                    prf.box._initAttr2UI(prf);
                }
            });
            return this;
        },
        getPaper:function(){
            return xui.get(this.get(0), ["_paper"]);
        },
        getSVGString:function(){
            var paper = xui.get(this.get(0), ["_paper"]);
            return paper?paper.toSVG():"";
        }
    },
    Static:{
        DataModel:{
            iframeAutoLoad:null,
            html:null,
            width:{
                $spaceunit:1,
                ini:'32em'
            },
            height:{
                $spaceunit:1,
                ini:'25em'
            },
            scaleChildren:{
                ini:false
            },
            overflow:{
                ini:undefined
            },
            graphicZIndex:{
                ini:0,
                action:function(v){
                    this.getSubNode('SVG').css('zIndex',v);
                }
            }
        },
        RenderTrigger:function(){
            var profile=this,
                root=profile.getRootNode(),
                prop=profile.properties,
            // force to px    
            w=xui.CSS.$px(prop.width,root,true),h=xui.CSS.$px(prop.height,root,true);
            (profile.$beforeDestroy=(profile.$beforeDestroy||{}))["svgClear"]=function(){
                if(profile._paper){
                    profile._paper.clear();
                    profile._paper.remove();
                }
            };
            profile._paper=Raphael(profile.$domId, w, h);
            profile._canvas=profile._paper.canvas;
            profile._canvas.id=profile.box.KEY+"-SVG:"+profile.serialId+":";
            var s=profile._canvas.style;
            s.position='absolute';
            s.left=0;
            s.top=0;
            s.zIndex=prop.graphicZIndex;

            // contents
            var a=[];
            xui.arr.each(profile.children,function(o){
                if(o[0].box["xui.svg"])a.push(o[0]);
            });
            if(a.length){
                profile.boxing().append(xui.svg.pack(a));
                // for IE
                if(!Raphael.svg){
                    xui.setTimeout(function(){
                        if(profile && !profile.destroyed){
                        	  // read again in IE
                            profile.boxing().append(xui.svg.pack(a));
                        }
                    });
                }
            }
            if(profile._paper){
            	  xui.setTimeout(function(){
            	        if(profile && !profile.destroyed){
            	  	    // ensure right position
            	  	    if(profile.$designerRoot)
                                 profile._frame=profile._paper.rect(0,0,1,1,0).attr({"stroke-width":"0px"});
            	  	    else if(profile.$inDesign)
                                profile._frame=profile._paper.rect(0,0,w,h,8).attr({"stroke-dasharray": ". ", stroke: "#666"});
                        if(profile._frame)profile._frame._decoration=1;
                    }
                });
            }
        },
        _onresize:function(profile,width,height){
            var paper=profile._paper, scaleChildren=profile.properties.scaleChildren,ow,oh,
                prop=profile,properties,
                us = xui.$us(profile),
                adjustunit = function(v,emRate){return profile.$forceu(v, us>0?'em':'px', emRate)};

            // caculate by px
            width=width?profile.$px(width, null, true):width;
            height=height?profile.$px(height, null, true):height;

            if(scaleChildren){
                ow=profile.$px(paper.width,null,true);
                oh=profile.$px(paper.height,null,true);
            }
            if(paper){
                var pw=profile.$px(paper.width,null,true), ph=profile.$px(paper.height,null,true);
                if( (width && pw!=width) || (height && ph!=height) ){
                    var args={},node=profile.getSubNode("SVG");
                    paper.setSize(width,height);
                    
                    if(profile.$inDesign && profile._frame){
                        if(width||width===0)
                            profile._frame.attr('width',width);
                        if(height||height===0)
                            profile._frame.attr('height',height);
                    }
                    
                    if(!(width||width===0)){
                       width=pw; 
                    }
                    args.width=width;
                    if((height||height===0)){
                       height=ph; 
                    }
                    args.height=height;
                    
                    if((!xui.isEmpty(args)) && xui.Dom.$hasEventHandler(node.get(0),'onsize'))
                        node.onSize(true, args);

                    if(scaleChildren){
                        paper.forEach(function(elem){
                            var wr=width/ow,hr=height/oh,xuiElem, 
                                fun=function(elem, key) {
                                    var xuiElem=xui.UIProfile.getFromDom(elem.node.id);
                                    if(!xuiElem)return;

                                    var attr=elem.attr(),
                                        hash;
                                        
                                    switch(elem.type){
                                        // circle is xuiElem, so dont use cirle in this case
                                        case 'circle':
                                            hash={
                                                cx:attr.cx*wr,
                                                cy:attr.cy*hr,
                                                r:attr.r*(wr+hr)/2
                                            };
                                        break;
                                        case 'ellipse':
                                            hash={
                                                cx:attr.cx*wr,
                                                cy:attr.cy*hr,
                                                rx:attr.rx*wr,
                                                ry:attr.ry*hr
                                            };
                                        break;
                                        case 'rect':
                                        case 'image':
                                        hash={
                                                x:attr.x*wr,
                                                y:attr.y*hr,
                                                width:attr.width*wr,
                                                height:attr.height*hr
                                            };
                                        break;
                                        case 'text':
                                        hash={
                                                x:attr.x*wr,
                                                y:attr.y*hr
                                            };
                                        break;
                                        case 'path':
                                            hash={
                                                path:Raphael.transformPath(xui.isArr(attr.path)?attr.path.join(""):attr.path, "s"+wr+","+hr+",0,0")
                                            };
                                        break;
                                    }

                                    if(hash){
                                        xuiElem.boxing().setAttr(key || "KEY",hash,false,true);
                                        //elem.attr(hash);
                                    }
                                };
                            // find root node
                            if(profile._frame!==elem 
                                && elem.node.$xid 
                                && elem.node.id 
                                && !/^[^:]+-/.test(elem.node.id) 
                                ){

                                if(elem._isGroupFirst){
                                    var xuiElem=xui.UIProfile.getFromDom(elem.node.id);
                                    if(xuiElem){
                                        xuiElem._elset.forEach(function(o){
                                            fun(o, xuiElem.getKey(o.node.id, true));
                                        })
                                    }
                                }else{
                                    fun(elem);
                                }
                            }
                        });
                    }
                }
            }
        }
    }
});