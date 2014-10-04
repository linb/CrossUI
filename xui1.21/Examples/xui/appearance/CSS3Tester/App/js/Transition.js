// The default code is a com class (inherited from xui.Com)
Class('App.Transition', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group1")
                .setLeft(20)
                .setTop(20)
                .setWidth(590)
                .setHeight(210)
                .setCaption("Transition Test")
                .setToggleBtn(false)
            );
            
            host.ctl_group1.append(
                (new xui.UI.Div)
                .setHost(host,"div1")
                .setLeft(30)
                .setTop(10)
                .setWidth(180)
                .setHeight(110)
                .setHtml("<font size=\"4\"><b><br><br><br>&nbsp; Transition Test</b><br></font>")
                .onRender("_div1_onrender")
                .setCustomStyle({"KEY":"background-color:#B0C4DE"})
            );
            
            host.ctl_group1.append(
                (new xui.UI.Block)
                .setHost(host,"ctl_block8")
                .setLeft(270)
                .setTop(10)
                .setWidth(290)
                .setHeight(110)
                .setBorderType("none")
            );
            
            host.ctl_block8.append(
                (new xui.UI.Input)
                .setHost(host,"i_cssStyle")
                .setReadonly(true)
                .setDirtyMark(false)
                .setDock("fill")
                .setMultiLines(true)
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel261")
                .setLeft(20)
                .setTop(132)
                .setCaption("Transition Property :- All ")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel262")
                .setLeft(20)
                .setTop(160)
                .setWidth(124)
                .setHeight(22)
                .setCaption("Transition Duration  ")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"t_td")
                .setDirtyMark(false)
                .setLeft(130)
                .setTop(152)
                .setWidth(430)
                .setHeight(30)
                .setSteps(50)
                .setIsRange(false)
                .setValue("20")
                .afterUIValueSet("_t_cs2_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel263")
                .setLeft(300)
                .setTop(132)
                .setWidth(124)
                .setHeight(22)
                .setCaption("Transition Timing")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"t_tt")
                .setDirtyMark(false)
                .setLeft(430)
                .setTop(130)
                .setType("listbox")
                .setItems([{"id":"ease", "caption":"ease"}, {"id":"linear", "caption":"linear"}, {"id":"ease-in", "caption":"ease-in"}, {"id":"ease-out", "caption":"ease-out"}, {"id":"ease-in-out", "caption":"ease-in-out"}])
                .setValue("ease")
                .afterUIValueSet("_t_cs2_afteruivalueset")
            );
            
            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group59")
                .setLeft(20)
                .setTop(240)
                .setWidth(590)
                .setHeight(200)
                .setCaption("Actions")
                .setToggleBtn(false)
            );
            
            host.ctl_group59.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel3")
                .setLeft(20)
                .setTop(20)
                .setWidth(84)
                .setCaption("Rotate")
                .setHAlign("left")
            );
            
            host.ctl_group59.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel4")
                .setLeft(20)
                .setTop(58)
                .setWidth(84)
                .setCaption("Scale X")
                .setHAlign("left")
            );
            
            host.ctl_group59.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel5")
                .setLeft(20)
                .setTop(88)
                .setWidth(84)
                .setCaption("Skew X")
                .setHAlign("left")
            );
            
            host.ctl_group59.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel6")
                .setLeft(20)
                .setTop(118)
                .setWidth(84)
                .setCaption("Translate X")
                .setHAlign("left")
            );
            
            host.ctl_group59.append(
                (new xui.UI.Slider)
                .setHost(host,"t_Rotate")
                .setDirtyMark(false)
                .setLeft(110)
                .setTop(10)
                .setWidth(440)
                .setHeight(30)
                .setSteps(360)
                .setIsRange(false)
                .setValue("0")
            );
            
            host.ctl_group59.append(
                (new xui.UI.Slider)
                .setHost(host,"t_ScaleY")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(50)
                .setWidth(150)
                .setHeight(30)
                .setSteps(150)
                .setIsRange(false)
                .setValue("0")
            );
            
            host.ctl_group59.append(
                (new xui.UI.Slider)
                .setHost(host,"t_ScaleX")
                .setDirtyMark(false)
                .setLeft(110)
                .setTop(50)
                .setWidth(150)
                .setHeight(30)
                .setSteps(150)
                .setIsRange(false)
                .setValue("0")
            );
            
            host.ctl_group59.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel63")
                .setLeft(290)
                .setTop(58)
                .setWidth(84)
                .setCaption("Scale Y")
                .setHAlign("left")
            );
            
            host.ctl_group59.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel64")
                .setLeft(290)
                .setTop(90)
                .setWidth(84)
                .setCaption("Skew Y")
                .setHAlign("left")
            );
            
            host.ctl_group59.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel65")
                .setLeft(290)
                .setTop(120)
                .setWidth(84)
                .setCaption("Translate Y")
                .setHAlign("left")
            );
            
            host.ctl_group59.append(
                (new xui.UI.Slider)
                .setHost(host,"t_SkewX")
                .setDirtyMark(false)
                .setLeft(110)
                .setTop(80)
                .setWidth(150)
                .setHeight(30)
                .setSteps(360)
                .setIsRange(false)
                .setValue("317")
            );
            
            host.ctl_group59.append(
                (new xui.UI.Slider)
                .setHost(host,"t_SkewY")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(80)
                .setWidth(150)
                .setHeight(30)
                .setSteps(360)
                .setIsRange(false)
                .setValue("0")
            );
            
            host.ctl_group59.append(
                (new xui.UI.Slider)
                .setHost(host,"t_TransY")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(110)
                .setWidth(150)
                .setHeight(30)
                .setSteps(200)
                .setIsRange(false)
                .setValue("0")
            );
            
            host.ctl_group59.append(
                (new xui.UI.Slider)
                .setHost(host,"t_TransX")
                .setDirtyMark(false)
                .setLeft(110)
                .setTop(110)
                .setWidth(150)
                .setHeight(30)
                .setSteps(200)
                .setIsRange(false)
                .setValue("3")
            );
            
            append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_sbutton12")
                .setLeft(410)
                .setTop(240)
                .setWidth(170)
                .setCaption("Do Transition")
                .onClick("_ctl_sbutton12_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _getValues:function(){
            var ns=this;
            return {
                rotate:parseInt(ns.t_Rotate.getValue()),
                scale:[parseInt(ns.t_ScaleX.getValue(100))/100,  parseInt(ns.t_ScaleY.getValue(100))/100],
                skew:[parseInt(ns.t_SkewX.getValue())-180, parseInt(ns.t_SkewY.getValue())-180],
                translate:[parseInt(ns.t_TransX.getValue())-100, parseInt(ns.t_TransY.getValue())-100]
            };
        },
        _ctl_sbutton12_onclick : function (profile){
            _.resetRun("transform2",this.setTF,0,null,this);
        },
        _t_cs2_afteruivalueset : function (profile){
            _.resetRun("transition",this.setTS,0,null,this);
        },
        setTS:function(){
            var ns=this,
            values ={
                tt:ns.t_tt.getValue(),
                td:parseInt(ns.t_td.getValue(100))/10
            },
            node=this.div1.getRoot();
            
            node.css('transition', "All " + values.td + "s " + values.tt );
                                      
            this.i_cssStyle.setValue("transition: "+node.css("transition"));
        },
        setTF:function(){
            var values = this._getValues(),
                node=this.div1.getRoot();
            
            node.css('transform', "rotate("+values.rotate+"deg) " +  "scale("+values.scale.join(',')+") " +  "skew("+values.skew.join('deg,')+"deg) " +  "translate("+values.translate.join('px,')+"px) " );
        },
        _div1_onrender : function (profile){
            var ns=this;
            ns.t_Rotate.setValue(30);
            ns.t_ScaleX.setValue(100);
            ns.t_ScaleY.setValue(100);
            ns.t_SkewX.setValue(180);
            ns.t_SkewY.setValue(180);
            ns.t_TransX.setValue(100);
            ns.t_TransY.setValue(100);
            
            ns.t_tt.setValue("ease");
            ns.t_td.setValue(10);
            
            
            ns.setTS();
        }
    }
});