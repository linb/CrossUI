Class("xui.UI.Image", "xui.UI",{
    Instance:{
        getRate:function(){
            return parseFloat(this.get(0)._rate) || 1;
        }
    },
    Static:{
        IMGNODE:1,
        Templates:{
            tagName:'image',
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
                var i=new Image(), path=xui.use(src).get(0).src;
                i.onload=function(){
                    if(!profile||profile.isDestroyed)return;
                    var prop=profile.properties,
                        size=profile.box._adjust(profile, _.isFinite(prop.width)?prop.width:i.width,_.isFinite(prop.height)?prop.height:i.height);
                    if(profile.$afterLoad)profile.$afterLoad.apply(profile.host, [profile, path, size[0], size[1]]);
                    profile.boxing().afterLoad(profile, path, size[0], size[1]);                    
                    if(prop.dock!='none')
                        profile.boxing().adjustDock();
                   i.onload=null;
                };
                // must after onload for IE<8 fix
                i.src=path;
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
            var self=this, pro=self.properties, v=pro.src;
            if(v){
                self.boxing().setSrc(v, v!=xui.ini.img_bg);
            }
        },
        EventHandlers:{
            onClick:function(profile, e, src){},
            onDblclick:function(profile, e, src){},
            onError:function(profile){},
            beforeLoad:function(profile){},
            afterLoad:function(profile, path, width, height){}
        },
        _adjust:function(profile,width,height){
            var pro=profile.properties,
                src=profile.getRootNode();
            width=parseInt(width,10)||0;
            height=parseInt(height,10)||0;
            src.style.width=src.style.height='';
            if(width>0 && height>0){
                var r1=pro.maxWidth/width, r2=pro.maxHeight/height,r= r1<r2?r1:r2;
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
                    this.box._adjust(this,_.isFinite(prop.width)?prop.width:src.width,_.isFinite(prop.height)?prop.height:src.height);
                }
            },
            maxHeight:{
                ini:600,
                action:function(v){
                    var src=this.getRootNode(),prop=this.properties;
                    this.box._adjust(this,_.isFinite(prop.width)?prop.width:src.width,_.isFinite(prop.height)?prop.height:src.height);
                }
            },
            width:{
                ini:'auto',
                action:function(v){
                    var src=this.getRootNode(),
                        prop=this.properties,
                        i=new Image();
                    i.src=src.src;
                    this.box._adjust(this, _.isFinite(v)?parseInt(v,10):i.width, _.isFinite(prop.height)?prop.height:i.height);
                }
            },
            height:{
                ini:'auto',
                action:function(v){
                    var src=this.getRootNode(),
                        prop=this.properties,
                        i=new Image();
                    i.src=src.src;
                    this.box._adjust(this,_.isFinite(prop.width)?prop.width:i.width,_.isFinite(v)?parseInt(v,10):i.height);
                }
            },
            src:{
                format:'image',
                ini:xui.ini.img_bg,
                //use asyn mode
                action:function(v){
                    var self=this;
                    if(false!==self.boxing().beforeLoad(this))
                        _.asyRun(function(){self.getRoot().attr({width:'0',height:'0',src:xui.adjustRes(v)})});
                }
            },
            alt:{
                ini:"",
                action:function(v){
                    this.getRoot().attr('alt',v);
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