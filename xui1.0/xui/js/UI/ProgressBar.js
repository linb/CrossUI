Class("xui.UI.ProgressBar", ["xui.UI.Widget","xui.absValue"] ,{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                profile.getSubNode('FILL').width(value+"%");
                profile.getSubNode('CAP').text(profile.properties.captionTpl.replace(/\{value\}/g,value));
            });
        }
    },
    Initialize:function(){
        var self=this,
            t = self.getTemplate();
        //modify
        _.merge(t.FRAME.BORDER,{
            FILL:{
                tagName:'div',
                style:'width:{value}%;{fillBG}',
                text:'{html}'+xui.UI.$childTag
            },
            INN:{
                $order:2,
                tagName:'div',
                CAP:{
                    tagName:'div'
                }
            }
        },'all');
        //set back
        self.setTemplate(t);

        //get default Appearance
        t = self.getAppearance();
        //modify
        _.merge(t,{
            BORDER:{
                border:'1px solid #95B611',
                'font-size':0,
                'line-height':0
            },
            INN:{
                display:'table',
                position:'absolute',
                left:0,
                top:0,
                width:'100%',
                height:'100%'
            },
            CAP:{
                'text-align':'center'
            },
            FILL:{
                position:'absolute',

                width:'1px',
                left:0,
                top:0,
                height:'100%',
                background: xui.UI.$bg('bar.gif', '#96E115 repeat-x left top'),
                width:0
            }
        });
        //set back
        self.setAppearance(t);
    },
    Static:{
        DataModel:{
            value:0,
            width:300,
            height:22,
            captionTpl:{
                ini:'{value}%',
                action:function(){
                    this.boxing()._setCtrlValue(this.properties.$UIvalue);
                }
            },
            fillBG:{
                ini:'',
                action:function(v){
                    this.getSubNode('FILL').css('background',v);
                }
            },
            $hborder:1,
            $vborder:1
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            data.fillBG = data.fillBG?'background:'+data.fillBG:'';
            return data;
        },
        _ensureValue:function(profile,value){
            return parseInt(value,10)||0;
        },
        _onresize:function(profile,width,height){
            var size = arguments.callee.upper.apply(this,arguments),h;
            if(size.height){
                h=size.height+'px';
                profile.getSubNodes(['INN','CAP','FILL']).css({height:h,'line-height':h});
            }
        }
    }
});

