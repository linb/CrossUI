Class("xui.UI.Audio", "xui.UI",{
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
                tagName:'audio'
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
                    this.getSubNode("H5").attr("controls", v||null);
                }
            },
            preload:{
                ini: false,
                action:function(v){
                    this.getSubNode("H5").attr("preload", v||null);
                }
            },
            loop:{
                ini: false,
                action:function(v){
                    this.getSubNode("H5").attr("loop", v||null);
                }
            },
            muted:{
                ini: false,
                action:function(v){
                    this.getSubNode("H5").attr("muted", v||null);
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
                    this.getSubNode("H5").attr("autoplay", v||null);
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

            if(t=prop.src)H5.attr("src",t);
            if(t=prop.controls)H5.attr("controls",t);
            if(t=prop.preload)H5.attr("preload",t);
            if(t=prop.loop)H5.attr("loop",t);
            if(t=prop.muted)H5.attr("muted",t);
            if(t=prop.autoplay)H5.attr("autoplay",t);
            if((t=prop.volume) !== 1)H5.attr("volume",t);
        },
        EventHandlers:{
            onMediaEvent:function(profile, eventType, params){}
        },
        _onresize:function(profile,width,height){
            var H5=profile.getSubNode('H5'), 
                size=H5.cssSize(),
                prop=profile.properties,
                css = xui.CSS,
                useem = (prop.spaceUnit||xui.SpaceUnit)=='em',
                adjustunit = function(v,emRate){return css.$forceu(v, useem?'em':'px', emRate)},
                root = profile.getRoot(),
                rootfz = useem||css.$isEm(width)||css.$isEm(height)?root._getEmSize():null,
                // caculate by px
                ww=width?css.$px(width, rootfz):width, 
                hh=height?css.$px(height, rootfz):height;

            if( (width && !_.compareNumber(size.width,ww,6)) || (height && !_.compareNumber(size.height,hh,6)) ){
                // reset here
                if(width){
                    prop.width=adjustunit(ww,rootfz);
                    H5.attr("width", ww);
                }
                if(height){
                    prop.height=adjustunit(hh,rootfz);
                    H5.attr("height", hh);
                }
            }
        }
    }
});