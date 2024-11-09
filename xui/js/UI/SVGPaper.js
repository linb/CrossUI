xui.Class("xui.UI.SVGPaper", "xui.UI.Div",{
    Initialize:function(){
        this.addTemplateKeys(['SVG']);
    },
    Instance:{
        getPaper:function(){
            return xui.get(this.get(0), ["_svg_papers","#"]);
        },
        getSVGString:function(){
            var paper = xui.get(this.get(0), ["_svg_papers","#"]);
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
        BeforeRenderTrigger:function(){
            var profile=this,
                root=profile.getRootNode(),
                prop=profile.properties;
            profile._svg_papers = {};
            profile._svg_nodes = {};

            // add a default svg node
            var paper = profile._svg_papers["#"] = Raphael(profile.$domId),
                canvas = profile._svg_nodes["#"] = paper.canvas,
                style = canvas.style;
            canvas.id=profile.box.KEY+"-SVG:"+profile.serialId+":";
            canvas.setAttribute("class", "xui-svg-container");
            style.position = "absolute";
            style.overflow = "visible";
            style.left=style.top=style.border=style.padding=style.margin=0;
            // graphicZIndex > zInde
            style.zIndex=prop.graphicZIndex;
        },
        _onresize:function(profile,width,height){
            var paper=profile._svg_papers["#"], scaleChildren=profile.properties.scaleChildren,ow,oh,
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
                            if(elem.node.$xid
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