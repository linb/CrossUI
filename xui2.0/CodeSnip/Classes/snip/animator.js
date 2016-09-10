Class('App.snip_animator', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append((new xui.UI.SButton())
            .setHost(host,"sbutton3")
            .setLeft(528)
            .setTop(18)
            .setWidth(80)
            .setCaption("Go")
            .onClick("_sbutton3_onclick")
            );
            
            append((new xui.UI.List())
            .setHost(host,"list2")
            .setShowDirtyMark(false)
            .setItems([{"id":"linear", "caption":"linear"}, {"id":"quadIn", "caption":"quadIn"}, {"id":"quadOut", "caption":"quadOut"}, {"id":"quadInOut", "caption":"quadInOut"}, {"id":"cubicIn", "caption":"cubicIn"}, {"id":"cubicOut", "caption":"cubicOut"}, {"id":"cubicInOut", "caption":"cubicInOut"}, {"id":"easeIn", "caption":"easeIn"}, {"id":"easeOut", "caption":"easeOut"}, {"id":"easeInOut", "caption":"easeInOut"}, {"id":"quartIn", "caption":"quartIn"}, {"id":"quartOut", "caption":"quartOut"}, {"id":"quartInOut", "caption":"quartInOut"}, {"id":"quintIn", "caption":"quintIn"}, {"id":"quintOut", "caption":"quintOut"}, {"id":"quintInOut", "caption":"quintInOut"}, {"id":"sineIn", "caption":"sineIn"}, {"id":"sineOut", "caption":"sineOut"}, {"id":"sineInOut", "caption":"sineInOut"}, {"id":"expoIn", "caption":"expoIn"}, {"id":"expoOut", "caption":"expoOut"}, {"id":"expoInOut", "caption":"expoInOut"}, {"id":"circIn", "caption":"circIn"}, {"id":"circOut", "caption":"circOut"}, {"id":"circInOut", "caption":"circInOut"}, {"id":"bounceIn", "caption":"bounceIn"}, {"id":"bounceOut", "caption":"bounceOut"}, {"id":"bounceInOut", "caption":"bounceInOut"}, {"id":"elasticIn", "caption":"elasticIn"}, {"id":"elasticOut", "caption":"elasticOut"}, {"id":"elasticInOut", "caption":"elasticInOut"}])
            .setLeft(38)
            .setTop(138)
            .setValue("")
            .onChange("_list2_onchange")
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"cWidth")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(8)
            .setCaption("width")
            .setValue(true)
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"cHeight")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(28)
            .setCaption("height")
            .setValue(true)
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"cLeft")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(48)
            .setCaption("left")
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"cTop")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(68)
            .setCaption("top")
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"cOpacity")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(88)
            .setCaption("opacity")
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"cBackgroundColor")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(108)
            .setCaption("backgroundColor")
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"cScrollTop")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(128)
            .setCaption("scrollTop")
            );
            
            append((new xui.UI.Image())
            .setHost(host,"ctl_image8")
            .setLeft(38)
            .setTop(18)
            .setWidth(120)
            .setHeight(120)
            .setSrc("http://localhost/crossui.com/rad/img/pic.png")
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"cRotate")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(148)
            .setCaption("rotate")
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"cReverse")
            .setDirtyMark(false)
            .setLeft(388)
            .setTop(18)
            .setCaption("reverse")
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"cscaleX")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(168)
            .setCaption("scaleX")
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"ctranslateX")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(208)
            .setCaption("translateX")
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"cscaleY")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(188)
            .setCaption("scaleY")
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"cskewX")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(248)
            .setCaption("skewX")
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"ctranslateY")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(228)
            .setCaption("translateY")
            );
            
            append((new xui.UI.SCheckBox())
            .setHost(host,"cskewY")
            .setDirtyMark(false)
            .setShowDirtyMark(false)
            .setLeft(198)
            .setTop(268)
            .setCaption("skewY")
            );
            
            append((new xui.UI.Block())
            .setHost(host,"ctl_block11")
            .setLeft(348)
            .setTop(58)
            .setWidth(370)
            .setHeight(240)
            .setBorderType("inset")
            );
            
            host.ctl_block11.append((new xui.UI.Div())
            .setHost(host,"divDemo")
            .setLeft(7)
            .setTop(7)
            .setWidth(50)
            .setHeight(50)
            .setHtml("A div <br />A div <br />A div <br />A div <br />A div <br />A div <br />A div <br />A div<br />A div<br />A div<br />A div<br />A div <br />A div<br />A div<br />A div<br />A div")
            .setCustomStyle({"KEY":"border:solid 1px;background-color:#fff;overflow:auto;"})
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _sbutton3_onclick:function (profile, e, src, value) {
            var ns=this, args={},type=ns.list2.getUIValue(),fun=function(){
                if(ns.cWidth.getUIValue())args.width=[50,250];
                if(ns.cHeight.getUIValue())args.height=[50,250];
                if(ns.cLeft.getUIValue())args.left=[100,300];
                if(ns.cTop.getUIValue())args.top=[100,300];
                if(ns.cOpacity.getUIValue())args.opacity=[1,0.2];
                if(ns.cBackgroundColor.getUIValue())args.backgroundColor=['#ffffff','#000000'];
                if(ns.cScrollTop.getUIValue())args.scrollTop=[0,100];
                if(ns.cRotate.getUIValue())args.rotate=[0,360];
                if(ns.cscaleX.getUIValue())args.scaleX=[1,5];
                if(ns.cscaleY.getUIValue())args.scaleY=[1,5];
                if(ns.ctranslateX.getUIValue())args.translateX=[0,200];
                if(ns.ctranslateY.getUIValue())args.translateY=[0,200];
                if(ns.cskewX.getUIValue())args.skewX=[0,180];
                if(ns.cskewY.getUIValue())args.skewY=[0,180];

                if(!xui.isEmpty(args) && type){
                    var args2={}, target = ns.divDemo,
                        node=target.getRoot();
                    xui.each(args,function(o,i){
                        if(o[1])
                            args2[i]=[o[1],o[0]];
                        else
                            args2[i]=o;
                    });
                    node.animate(args,null,function(){
                        if(ns.cReverse.getUIValue()){
                            xui.asyRun(function(){
                                node.animate(args2,null,null,300,0, type).start();
                            },300);
                        }else{
                            xui.asyRun(function(){
                                if(ns.divDemo)
                                ns.divDemo.refresh();
                            },1000);
                        }
                    },300,0,type).start();
                }
            };
            fun();
        },
        _list2_onchange:function (profile, oldValue, newValue){
            var ns = this;
            ns.ctl_image8.setSrc("{/}img/animate/"+newValue+".gif");
        },
        events:{"onRender":"_com_onrender"},
        _com_onrender:function (com, threadid){
            this.list2.setUIValue("linear");
        }
    }
});