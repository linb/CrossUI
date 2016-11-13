Class("xui.UI.Image", "xui.UI",{
    Initialize:function(){
        var ns=this;
        ns._adjustItems = xui.absList._adjustItems;
        ns.prototype._prepareItems  = function(a){return a;};
    },
    Instance:{
        getRate:function(){
            return parseFloat(this.get(0)._rate) || 1;
        }
    },
    Static:{
        IMGNODE:1,
        Templates:{
            tagName:'img',
            style:'cursor:{cursor};{_style}',
            className:'{_className}',
            border:"0",
            src:xui.ini.img_bg,
            alt:"{alt}"
        },
        Behaviors:{
            HoverEffected:{KEY:'KEY'},
            ClickEffected:{KEY:'KEY'},
            DraggableKeys:["KEY"],
            onError:function(profile, e, src){
                profile.boxing().onError(profile);
            },
            onLoad:function(profile, e, src){
                var img=xui.use(src).get(0),path;
                // for IE8 bug
                try{path=img.src;}catch(e){
                    return;
                }
                if(path!=xui.ini.img_bg){
                    var i=new Image();
                    i.onload=function(){
                        if(!profile||profile.isDestroyed)return;
                        var prop=profile.properties,
                            size=profile.box._adjust(profile, (prop.width===""||prop.width=="auto")?i.width:prop.width, (prop.height===""||prop.height=="auto")?i.height:prop.height);
                        if(profile.$afterLoad)profile.$afterLoad.apply(profile.host, [profile, path, size[0], size[1]]);
                        profile.boxing().afterLoad(profile, path, size[0], size[1]);
                        if(prop.dock!='none')
                            profile.boxing().adjustDock();
                       i.onload=null;
                    }
                    // must after onload for IE<8 fix
                    i.src=path;
                   xui.Dom.fixPng(img);
                }
            },
            onClick:function(profile, e, src){
                var p=profile.properties;
                if(p.disabled)return false;
                if(profile.onClick)
                    return profile.boxing().onClick(profile, e, src);
            },
            onDblclick:function(profile, e, src){
                var p=profile.properties;
                if(p.disabled)return false;
                if(profile.onDblclick)
                    profile.boxing().onDblclick(profile, e, src);
            }
        },
        RenderTrigger:function(){
            var self=this, pro=self.properties,
                  v=pro.src, v2=pro.activeItem;
            if(v2 && -1!=xui.arr.subIndexOf(pro.items,"id",v2)){
                self.boxing().setActiveItem(v2, true);
            }else if(v)self.boxing().setSrc(v, v!=xui.ini.img_bg);
        },
        EventHandlers:{
            onClick:function(profile, e, src){},
            onDblclick:function(profile, e, src){},
            onError:function(profile){},
            beforeLoad:function(profile){},
            afterLoad:function(profile, path, width, height){}
        },
        _adjust:function(profile,width,height){
            var prop=profile.properties,
                src=profile.getRootNode(),
                us = xui.$us(prop),
                adjustunit = function(v,emRate){return profile.$forceu(v, us>0?'em':'px', emRate)};

            width=width?profile.$px(width, null, true):width;
            height=height?profile.$px(height, null, true):height;

            src.style.width=src.style.height='';
            if(width>0 && height>0){
                var r1=prop.maxWidth/width, 
                    r2=prop.maxHeight/height,
                    r= r1<r2?r1:r2;
                if(r>=1)r=1;
                profile._rate=r;
                return [src.width=width*r, src.height=height*r];
            }
            return [0,0];
        },
        DataModel:{
            maxWidth:{
                ini:800,
                action:function(v){
                    var src=this.getRootNode(),prop=this.properties;
                    this.box._adjust(this, (prop.width===""||prop.width=="auto")?src.width:prop.width, (prop.height===""||prop.height=="auto")?src.height:prop.height);
                }
            },
            maxHeight:{
                ini:600,
                action:function(v){
                    var src=this.getRootNode(),prop=this.properties;
                    this.box._adjust(this, (prop.width===""||prop.width=="auto")?src.width:prop.width, (prop.height===""||prop.height=="auto")?src.height:prop.height);
                }
            },
            width:{
                ini:'auto',
                action:function(v){
                    var src=this.getRootNode(),
                        prop=this.properties,
                        i=new Image();
                    i.src=src.src;
                    this.box._adjust(this, (v===""||v=="auto")?i.width:v, (prop.height===""||prop.height=="auto")?i.height:prop.height);
                }
            },
            height:{
                ini:'auto',
                action:function(v){
                    var src=this.getRootNode(),
                        prop=this.properties,
                        i=new Image();
                    i.src=src.src;
                    this.box._adjust(this, (prop.width===""||prop.width=="auto")?i.width:prop.width, (v===""||v=="auto")?i.height:v);
                }
            },
            src:{
                format:'image',
                ini:xui.ini.img_bg,
                linkage:["activeItem"],
                //use asyn mode
                action:function(v){
                    var self=this;
                    if(false!==self.boxing().beforeLoad(this))
                        xui.asyRun(function(){self.getRoot().attr({width:'0',height:'0',src:xui.adjustRes(v)})});
                    if(!self.$inner)
                        self.properties.activeItem="";
                }
            },
            alt:{
                ini:"",
                action:function(v){
                    this.getRoot().attr('alt',v);
                }
            },
            items:{
                ini:[]
            },
            activeItem:{
                ini:"",
                linkage:["src","alt","tips"],
                action:function(v){
                    var items=this.properties.items,
                        i=xui.arr.subIndexOf(items,"id",""+v),
                        item,ins=this.boxing(),
                        src,alt,tips;
                    if((i!=-1) && (item=items[i])){
                        src=item.image||xui.ini.img_bg;
                        alt=item.alt||"";
                        tips=item.tips||"";
                    }
                    this.$inner=1;
                    ins.setSrc(src||xui.ini.img_bg, true);
                    delete this.$inner;
                    ins.setAlt(alt||"");
                    ins.setTips(tips||"");
                }
            },
            cursor:{
                ini:"auto",
                combobox:["","default","text","pointer","move","crosshair","wait","help","e-resize","ne-resize","nw-resize","n-resize","se-resize","sw-resize","s-resize","w-resize"],
                action:function(v){
                    this.getRoot().css('cursor',v);
                }
            }
        }
    }
});