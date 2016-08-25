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
                size = H5.cssSize(),
                prop=profile.properties,
                // compare with px
                w_em=xui.CSS.$isEm(width),
                h_em=xui.CSS.$isEm(height),
                ww=w_em?xui.CSS.$em2px(width):width, 
                hh=h_em?xui.CSS.$em2px(height):height;
            if( (width && !_.compareNumber(size.width,ww,6)) || (height && !_.compareNumber(size.height,hh,6)) ){
                // reset here
                if(width)prop.width=width;
                if(height)prop.height=height;
                if(width)H5.attr("width", width);
                if(height)H5.attr("height", height);
            }
        }
    }
});