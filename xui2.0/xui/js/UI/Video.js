Class("xui.UI.Video", "xui.UI.Audio",{
    Instance:{
    },
    Static:{
        Templates:{
            tagName:'div',
            className:'{_className}',
            style:'{_style}',
            H5:{
                tagName:'video',
                width:'{width}',
                height:'{height}'
            }
        },
        DataModel:{
            width:{
                $spaceunit:1,
                ini:'34em'
            },
            height:{
                $spaceunit:1,
                ini:'25em'
            },
            poster:{
                format:'image',
                ini: '',
                action:function(v){
                    this.getSubNode("H5").attr("poster", v||null);
                }
            }
        },
        RenderTrigger:function(){
            var prf=this,
                H5 = prf.getSubNode('H5'),
                prop = prf.properties,
                t;
            if(t=prop.poster)H5.attr("poster",t);
        },
        _onresize:function(profile,width,height){
            var H5=profile.getSubNode('H5'), 
                size=H5.cssSize(),
                prop=profile.properties,
                css = xui.CSS,
                useem = (prop.spaceUnit||xui.SpaceUnit)=='em'
                adjustunit = function(v,emRate){return css.$forceu(v, useem?'em':'px', emRate)},
                root = profile.getRoot(),
                rootfz = useem||css.$isEm(width)||css.$isEm(height)?root._getEmSize():null,
                // caculate by px
                ww=css.$px(width, rootfz), 
                hh=css.$px(height, rootfz);

            if( (width && !xui.compareNumber(size.width,ww,6)) || (height && !xui.compareNumber(size.height,hh,6)) ){
                // reset here
                if(width){
                    prop.width=adjustunit(ww, rootfz);
                    H5.attr("width", ww);
                }
                if(height){
                    prop.height=adjustunit(hh, rootfz);
                    H5.attr("height", hh);
                }
            }
        }
    }
});