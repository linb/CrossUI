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
                ini:'25rem'
            },
            height:{
                $spaceunit:1,
                ini:'20rem'
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
                css=xui.CSS,
                size=H5.cssSize(),
                prop=profile.properties,
                useem =xui.$rem(prop),
                adjustunit = function(v){return xui.CSS.$forceu(v, useem?'rem':'px')},
                // caculate by px
                ww=css.$px(width), 
                hh=css.$px(height);

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