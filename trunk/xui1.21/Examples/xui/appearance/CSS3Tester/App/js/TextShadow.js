// The default code is a com class (inherited from xui.Com)
Class('App.TextShadow', 'xui.Com',{
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
                .setCaption("Text Shadow Test")
                .setToggleBtn(false)
            );
            
            host.ctl_group1.append(
                (new xui.UI.Div)
                .setHost(host,"div1")
                .setLeft(30)
                .setTop(20)
                .setWidth(180)
                .setHeight(110)
                .setHtml("<font size=\"4\"><b><br><br><br>&nbsp;&nbsp;&nbsp;&nbsp; Text Shadow</b><br></font>")
                .onRender("_div1_onrender")
                .setCustomStyle({"KEY":"background-color:#B0C4DE"})
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel3")
                .setLeft(20)
                .setTop(160)
                .setWidth(114)
                .setHeight(10)
                .setCaption("Horizontal Length")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel4")
                .setLeft(20)
                .setTop(193)
                .setWidth(84)
                .setCaption("Vertical Length")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel5")
                .setLeft(20)
                .setTop(228)
                .setWidth(84)
                .setCaption("Blur Radius")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel6")
                .setLeft(20)
                .setTop(264)
                .setWidth(84)
                .setCaption("Shadow Color")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"sd_hl")
                .setDirtyMark(false)
                .setLeft(150)
                .setTop(150)
                .setWidth(390)
                .setHeight(30)
                .setSteps(150)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_t_sd_afteruivalueset")
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
                .setHost(host,"sd_vl")
                .setDirtyMark(false)
                .setLeft(150)
                .setTop(190)
                .setWidth(390)
                .setHeight(20)
                .setSteps(100)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"sd_br")
                .setDirtyMark(false)
                .setLeft(150)
                .setTop(220)
                .setWidth(390)
                .setHeight(30)
                .setSteps(35)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"sd_clr")
                .setDirtyMark(false)
                .setLeft(160)
                .setTop(260)
                .setType("color")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _getValues:function(){
            var ns=this;
            return {
                hl:parseInt(ns.sd_hl.getValue())-75,
                vl:parseInt(ns.sd_vl.getValue())-50,
                br:ns.sd_br.getValue(),
                clr:ns.sd_clr.getValue()
            };
        },
        _t_sd_afteruivalueset : function (profile){
            _.resetRun("textShadow",this.setTS,0,null,this);
        },
        setTS:function(){
            var values = this._getValues(),
                node=this.div1.getRoot();
            
            node.css('textShadow', values.hl + "px " + values.vl + "px " + values.br + "px " + values.clr);
                                      
            this.i_cssStyle.setValue("text-shadow : "+node.css("textShadow"));
        },
        _div1_onrender : function (profile){
            var ns=this;
            ns.sd_hl.setValue(75);
            ns.sd_vl.setValue(50);
            ns.sd_br.setValue(3);
            ns.sd_clr.setValue("#000000");
            
            ns.setTS();
        }
    }
});