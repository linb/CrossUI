xui.Class("xui.UI.Video", "xui.UI.Audio",{
    Instance:{
    },
    Static:{
        Templates:{
            tagName:'div',
            crossOrigin:  'anonymous',
            className:'{_className}',
            style:'{_style}',
            H5:{
                tagName:'video',
                autoplay:'{_autoplay}',
                controls:'{_controls}',
                loop:'{_loop}',
                muted:'{_muted}',

                preload:'{preload}',
                volume:'{volume}',
                src:'{src}',

                width:'{width}',
                height:'{height}',
                text:'Your browser does not support the audio element.'
            },
            COVER:{
                tagName:'div',
                style:"background-image:url("+xui.ini.img_bg+");"
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
        }
    }
});