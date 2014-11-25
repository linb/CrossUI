Class("xui.UI.ProgressBar", ["xui.UI.Widget","xui.absValue"] ,{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                profile.getSubNode('FILL').width(value+"%");
                profile.getSubNode('CAP').text(profile.properties.captionTpl.replace(/\{value\}|\*/g,value));
            });
        }
    },
    Initialize:function(){
        var self=this,
            t = self.getTemplate();
        //modify
        _.merge(t.FRAME.BORDER,{
            className:"xui-uiborder-flat xui-uibg-base",
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
                'font-size':0,
                'line-height':0,
                overflow:'hidden'
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
                position:'relative',
                width:'1px',
                left:0,
                top:0,
                height:'100%',
                'background-image':xui.UI.$bg('bar.gif', ''),
                'background-repeat':'repeat-x',
                'background-position':'left top',
                'background-color':'#96E115',
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
                ini:'* %',
                action:function(){
                    this.boxing()._setCtrlValue(this.properties.$UIvalue);
                }
            },
            fillBG:{
                ini:'',
                format:'color',
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

