Class("xui.UI.ProgressBar", ["xui.UI.Widget","xui.absValue"] ,{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                var type=profile.properties.type,
                    inn=profile.getSubNode('FILL');
               if(type=="horizontal"){
                    inn.width(value+"%");
                }else{
                    inn.top((100-value)+"%").height(value+"%");
                }
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
                style:'{fillBG}',
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
                'font-size':xui.__iefix1,
                'line-height':xui.__iefix1,
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
                width:0,
                height:0,
                left:0,
                top:0,
                'background-color':'#96E115'
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
            type:{
                listbox:['vertical', 'horizontal'],
                ini:'horizontal',
                action:function(v){
                    var w=this.properties.width,h=this.properties.height;
                    this.properties.height=w;this.properties.width=h;
                    this.boxing().refresh();
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
            var size = arguments.callee.upper.apply(this,arguments),v,
                type=profile.properties.type,
                node=profile.getSubNodes(['INN','CAP','FILL']);
            if(type=="horizontal"){
                if(size.height){
                    v=size.height+'px';
                    node.css({height:v,'line-height':v});
                }
            }else{
                if(size.width)node.css({width:size.width+'px'});                
                if(size.height)node.css({'line-height':size.height+'px'});
            }
        }
    }
});

