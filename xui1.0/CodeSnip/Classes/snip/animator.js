Class('App.snip_animator', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Div)
                .setHost(host,"divDemo")
                .setLeft(50)
                .setTop(100)
                .setWidth(50)
                .setHeight(50)
                .setHtml("A div <br />A div <br />A div <br />A div <br />A div <br />A div <br />A div <br />A div<br />A div<br />A div<br />A div<br />A div <br />A div<br />A div<br />A div<br />A div")
                .setCustomStyle({"KEY":"border:solid 1px;background-color:#fff;overflow:auto;"})
            );
            
            append((new xui.UI.SButton)
                .setHost(host,"sbutton3")
                .setLeft(410)
                .setTop(480)
                .setCaption("Go")
                .onClick("_sbutton3_onclick")
            );
            
            append((new xui.UI.List)
                .setHost(host,"list2")
                .setItems([{"id":"linear", "caption":"linear"}, {"id":"expoIn", "caption":"expoIn"}, {"id":"expoOut", "caption":"expoOut"}, {"id":"expoInOut", "caption":"expoInOut"}, {"id":"sineIn", "caption":"sineIn"}, {"id":"sineOut", "caption":"sineOut"}, {"id":"sineInOut", "caption":"sineInOut"}, {"id":"backIn", "caption":"backIn"}, {"id":"backOut", "caption":"backOut"}, {"id":"backInOut", "caption":"backInOut"}, {"id":"bounceOut", "caption":"bounceOut"}])
                .setLeft(290)
                .setTop(190)
                .setHeight(250)
                .setValue("linear")
            );
            
            append((new xui.UI.SCheckBox)
                .setHost(host,"cWidth")
                .setLeft(450)
                .setTop(210)
                .setCaption("width")
            );
            
            append((new xui.UI.SCheckBox)
                .setHost(host,"cHeight")
                .setLeft(450)
                .setTop(240)
                .setCaption("height")
            );
            
            append((new xui.UI.SCheckBox)
                .setHost(host,"cLeft")
                .setLeft(450)
                .setTop(270)
                .setCaption("left")
            );
            
            append((new xui.UI.SCheckBox)
                .setHost(host,"cTop")
                .setLeft(450)
                .setTop(300)
                .setCaption("top")
            );
            
            append((new xui.UI.SCheckBox)
                .setHost(host,"cOpacity")
                .setLeft(450)
                .setTop(330)
                .setCaption("opacity")
            );
            
            append((new xui.UI.SCheckBox)
                .setHost(host,"cBackgroundColor")
                .setLeft(450)
                .setTop(360)
                .setCaption("backgroundColor")
            );
            
            append((new xui.UI.SCheckBox)
                .setHost(host,"cScrollTop")
                .setLeft(450)
                .setTop(390)
                .setCaption("scrollTop")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _sbutton3_onclick:function (profile, e, src, value) {
            var args={},type=this.list2.getUIValue();
            if(this.cWidth.getUIValue()){
                args.width=[50,250];
            }

            if(this.cHeight.getUIValue()){
                args.height=[50,250];
            }

            if(this.cLeft.getUIValue()){
                args.left=[100,300];
            }

            if(this.cTop.getUIValue()){
                args.top=[100,300];
            }

            if(this.cOpacity.getUIValue()){
                args.opacity=[1,0.2];
            }

            if(this.cBackgroundColor.getUIValue()){
                args.backgroundColor=['#ffffff','#000000'];
            }

            if(this.cScrollTop.getUIValue()){
                args.scrollTop=[0,100];
            }

            if(!_.isEmpty(args) && type){
                var args2={}, node=this.divDemo.getRoot();
                _.each(args,function(o,i){
                    args2[i]=[o[1],o[0]];
                });
                node.animate(args,null,function(){
                    _.asyRun(function(){
                        node.animate(args2,null,null,600,0, type).start();
                    },300);
                },600,0,type).start();
            }
        }
    }
});