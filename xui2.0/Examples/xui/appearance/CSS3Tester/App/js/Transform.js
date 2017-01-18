xui.Class('App.Transform', 'xui.Module',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group1")
                .setLeft(40)
                .setTop(30)
                .setWidth(590)
                .setHeight(310)
                .setCaption("Transform   Test")
                .setToggleBtn(false)
            );

            host.ctl_group1.append(
                (new xui.UI.Div)
                .setHost(host,"div1")
                .setLeft(30)
                .setTop(20)
                .setWidth(180)
                .setHeight(110)
                .setHtml("<font size=\"4\"><b><br><br><br>&nbsp; Transform Test</b><br></font>")
                .onRender("_div1_onrender")
                .setCustomStyle({"KEY":"background-color:#B0C4DE"})
            );

            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel3")
                .setLeft(20)
                .setTop(160)
                .setWidth(84)
                .setCaption("Rotate")
                .setHAlign("left")
            );

            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel4")
                .setLeft(20)
                .setTop(198)
                .setWidth(84)
                .setCaption("Scale X")
                .setHAlign("left")
            );

            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel5")
                .setLeft(20)
                .setTop(228)
                .setWidth(84)
                .setCaption("Skew X")
                .setHAlign("left")
            );

            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel6")
                .setLeft(20)
                .setTop(258)
                .setWidth(84)
                .setCaption("Translate X")
                .setHAlign("left")
            );

            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"t_Rotate")
                .setDirtyMark(false)
                .setLeft(110)
                .setTop(150)
                .setWidth(430)
                .setHeight(30)
                .setSteps(360)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_t_cs_afteruivalueset")
            );

            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"t_ScaleY")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(190)
                .setWidth(150)
                .setHeight(30)
                .setSteps(150)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_t_cs_afteruivalueset")
            );

            host.ctl_group1.append(
                (new xui.UI.Block)
                .setHost(host,"ctl_block8")
                .setLeft(270)
                .setTop(20)
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
                (new xui.UI.Slider)
                .setHost(host,"t_ScaleX")
                .setDirtyMark(false)
                .setLeft(110)
                .setTop(190)
                .setWidth(150)
                .setHeight(30)
                .setSteps(150)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_t_cs_afteruivalueset")
            );

            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel63")
                .setLeft(290)
                .setTop(198)
                .setWidth(84)
                .setCaption("Scale Y")
                .setHAlign("left")
            );

            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel64")
                .setLeft(290)
                .setTop(230)
                .setWidth(84)
                .setCaption("Skew Y")
                .setHAlign("left")
            );

            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel65")
                .setLeft(290)
                .setTop(260)
                .setWidth(84)
                .setCaption("Translate Y")
                .setHAlign("left")
            );

            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"t_SkewX")
                .setDirtyMark(false)
                .setLeft(110)
                .setTop(220)
                .setWidth(150)
                .setHeight(30)
                .setSteps(360)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_t_cs_afteruivalueset")
            );

            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"t_SkewY")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(220)
                .setWidth(150)
                .setHeight(30)
                .setSteps(360)
                .setIsRange(false)
                .setValue("104")
                .afterUIValueSet("_t_cs_afteruivalueset")
            );

            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"t_TransY")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(250)
                .setWidth(150)
                .setHeight(30)
                .setSteps(200)
                .setIsRange(false)
                .setValue("49")
                .afterUIValueSet("_t_cs_afteruivalueset")
            );

            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"t_TransX")
                .setDirtyMark(false)
                .setLeft(110)
                .setTop(250)
                .setWidth(150)
                .setHeight(30)
                .setSteps(200)
                .setIsRange(false)
                .setValue("4")
                .afterUIValueSet("_t_cs_afteruivalueset")
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
        _t_cs_afteruivalueset : function (profile){
            xui.resetRun("transform",this.setTF,0,null,this);
        },
        setTF:function(){
            var values = this._getValues(),
                node=this.div1.getRoot();

            node.css('transform', "translate("+values.translate.join('px,')+"px) " + "rotate("+values.rotate+"deg) " +  "scale("+values.scale.join(',')+") " +  "skew("+values.skew.join('deg,')+"deg) " );

            this.i_cssStyle.setValue("transform : "+node.css("transform"));
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

            ns.setTF();
        }
    }
});