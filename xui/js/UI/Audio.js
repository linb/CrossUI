xui.Class("xui.UI.Audio", "xui.UI",{
    Instance:{
        play:function(){
            var v = this.getSubNode("H5"), vn = v.get(0);if(vn&&this.getSrc())vn.play();
        },
        pause:function(){
            var v = this.getSubNode("H5"), vn = v.get(0);if(vn&&this.getSrc())vn.pause();
        },
        load:function(){
            var v = this.getSubNode("H5"), vn = v.get(0);if(vn&&this.getSrc())vn.load();
        },
        canPlayType:function(type){
            var v = this.getSubNode("H5"), vn = v.get(0);if(vn) return vn.canPlayType(type);
        }
    },
    Static:{
        Appearances:{
            KEY:{
                overflow:'hidden'
            },
            H5:{
                position:'absolute',
                left:0,
                top:0,
                'z-index':1
            },
            COVER:{
                position:'absolute',
                left:'-1px',
                top:'-1px',
                width:0,
                height:0,
                'z-index':4
            }
        },
        Templates:{
            tagName:'div',
            className:'{_className}',
            style:'{_style}',
            H5:{
                tagName:'audio',
                crossOrigin:  'anonymous',
                autoplay:'{_autoplay}',
                controls:'{_controls}',
                loop:'{_loop}',
                muted:'{_muted}',

                preload:'{preload}',
                volume:'{volume}',
                src:'{src}',
                text:'Your browser does not support the audio element.'
            },
            COVER:{
                tagName:'div',
                style:"background-image:url("+xui.ini.img_bg+");"
            }
        },
        Behaviors:{
            HotKeyAllowed:false
        },
        DataModel:{
            selectable:true,
            width:{
                $spaceunit:1,
                ini:'18em'
            },
            height:{
                $spaceunit:1,
                ini:'5em'
            },
            src:{
                format:'media',
                ini:'',
                action:function(v){
                    this.getSubNode("H5").attr("src", xui.adjustRes(v));
                }
            },
            cover:false,
            controls:{
                ini: true,
                action:function(v){
                    this.getSubNode("H5").attr("controls", v?'controls':null);
                }
            },
            preload:{
                ini: "none",
                listbox:["none", "metadata", "auto" ],
                action:function(v){
                    this.getSubNode("H5").attr("preload", (!v||v=='none')?null:v);
                }
            },
            loop:{
                ini: false,
                action:function(v){
                    this.getSubNode("H5").attr("loop", v?'loop':null);
                }
            },
            muted:{
                ini: false,
                action:function(v){
                    this.getSubNode("H5").attr("muted", v?'muted':null);
                }
            },
            volume:{
                ini: 1,
                action:function(v){
                    this.getSubNode("H5").attr("volume", v);
                }
            },
            autoplay:{
                ini: false,
                action:function(v){
                    this.getSubNode("H5").attr("autoplay", v?'autoplay':null);
                }
            }
        },
        RenderTrigger:function(){
            var prf = this,
                H5 = prf.getSubNode('H5'),
                prop = prf.properties,
                ef = function(event){
                    if(prf.onMediaEvent){
                        prf.boxing().onMediaEvent(prf, (event||window.event).type,  arguments);
                    }
                },t;
   
            xui.arr.each("loadstart progress durationchange seeked seeking timeupdate playing canplay canplaythrough volumechange ratechange loadedmetadata loadeddata play pause ended".split(" "), function(event, i){
                if(i = H5&&H5.get(0))
                    xui.Event._addEventListener(i, event, ef);
            });
            
            (prf.$beforeDestroy=(prf.$beforeDestroy||{}))["detachEvents"]=function(){
                xui.arr.each("loadstart progress durationchange seeked seeking timeupdate playing canplay canplaythrough volumechange ratechange loadedmetadata loadeddata play pause ended".split(" "),function(event, i){
                    if(i=H5&&H5.get(0))
                        xui.Event._removeEventListener(i, event, ef);
                });
            };

            if(!prop.controls)H5.attr("controls",null);
            if(!prop.loop)H5.attr("loop",null);
            if(!prop.muted)H5.attr("muted",null);

            if(!prop.autoplay)H5.attr("autoplay",null);
            else xui.asyRun(function(t){
                if(prf.$inDesign)return;
                if(prop.src && xui.isStr(prop.src) && (t=H5.get(0)))t.play();}
            );
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            if(data.autoplay)data._autoplay = "autoplay";
            if(data.controls)data._controls = "controls";
            if(data.loop)data._loop = "loop";
            if(data.muted)data._muted = "muted";
            return data;
        },
        EventHandlers:{
            onMediaEvent:function(profile, eventType, params){}
        },
        _onresize:function(profile,width,height){
            var H5=profile.getSubNode('H5'), 
                size=H5.cssSize(),
                prop=profile.properties,
                us = xui.$us(profile),
                adjustunit = function(v,emRate){return profile.$forceu(v, us>0?'em':'px', emRate)},

                // caculate by px
                ww=width?profile.$px(width):width, 
                hh=height?profile.$px(height):height;

            if( (width && !xui.compareNumber(size.width,ww,6)) || (height && !xui.compareNumber(size.height,hh,6)) ){
                // reset here
                if(width){
                    H5.attr("width", ww).width(prop.width=adjustunit(ww));
                }
                if(height){
                    H5.attr("height", hh).height(prop.height=adjustunit(hh));
                }
                if(profile.$inDesign || prop.cover){
                    profile.getSubNode('COVER').cssSize({
                        width:width?prop.width:null,
                        height:height?prop.height:null
                    },true);
                }
            }
        }
    }
});