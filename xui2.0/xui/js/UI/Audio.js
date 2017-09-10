xui.Class("xui.UI.Audio", "xui.UI",{
    Instance:{
        play:function(){
            var v = this.getSubNode("H5"), vn = v.get(0);if(vn)vn.play();
        },
        pause:function(){
            var v = this.getSubNode("H5"), vn = v.get(0);if(vn)vn.pause();
        },
        load:function(){
            var v = this.getSubNode("H5"), vn = v.get(0);if(vn)vn.load();
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
            }
        },
        Templates:{
            tagName:'div',
            className:'{_className}',
            style:'{_style}',
            H5:{
                tagName:'audio',
                autoplay:'{_autoplay}',
                controls:'{_controls}',
                loop:'{_loop}',
                muted:'{_muted}',

                preload:'{preload}',
                volume:'{volume}',
                src:'{src}',
                text:'Your browser does not support the audio element.'
            }
        },
        Behaviors:{
            HotKeyAllowed:false,
            onSize:xui.UI.$onSize
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
                ini:'',
                action:function(v){
                    this.getSubNode("H5").attr("src",v||null);
                }
            },
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
                ef = function(){
                    if(prf.onMediaEvent){
                        prf.boxing().onMediaEvent(prf, event,  arguments);
                    }
                },t;
   
            "loadstart progress durationchange seeked seeking timeupdate playing canplay canplaythrough volumechange ratechange loadedmetadata loadeddata play pause ended".split(" ").forEach(function(event, i){
                if(H5&&H5.get(0))H5.get(0).addEventListener(event, ef, false);  
            });
            
            (prf.$beforeDestroy=(prf.$beforeDestroy||{}))["detachEvents"]=function(){
                "loadstart progress durationchange seeked seeking timeupdate playing canplay canplaythrough volumechange ratechange loadedmetadata loadeddata play pause ended".split(" ").forEach(function(event, i){
                    if(H5&&H5.get(0))H5.get(0).removeEventListener(event, ef, false);  
                });
            };

            if(!prop.controls)H5.attr("controls",null);
            if(!prop.loop)H5.attr("loop",null);
            if(!prop.muted)H5.attr("muted",null);

            if(!prop.autoplay)H5.attr("autoplay",null);
            else xui.asyRun(function(t){if(t=H5.get(0))t.play();});
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            if(data.autoplay)data._autoplay = "autoplay";
            if(data.controls)data._controls = "controls";
            if(data.loop)data._loop = "loop";
            if(data.muted)data._muted = "muted";
            if(data.autoplay)data._autoplay = "autoplay";
            return data;
        },
        EventHandlers:{
            onMediaEvent:function(profile, eventType, params){}
        },
        _onresize:function(profile,width,height){
            var H5=profile.getSubNode('H5'), 
                size=H5.cssSize(),
                prop=profile.properties,
                us = xui.$us(prop),
                adjustunit = function(v,emRate){return profile.$forceu(v, us>0?'em':'px', emRate)},
                root = profile.getRoot(),
                // caculate by px
                ww=width?profile.$px(width):width, 
                hh=height?profile.$px(height):height;

            if( (width && !xui.compareNumber(size.width,ww,6)) || (height && !xui.compareNumber(size.height,hh,6)) ){
                // reset here
                if(width){
                    prop.width=adjustunit(ww);
                    H5.attr("width", ww);
                }
                if(height){
                    prop.height=adjustunit(hh);
                    H5.attr("height", hh);
                }
            }
        }
    }
});