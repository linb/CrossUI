// The default code is a com class (inherited from xui.Com)
Class('App.RGBA', 'xui.Com',{
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
                .setCaption("rgba Test")
                .setToggleBtn(false)
            );
            
            host.ctl_group1.append(
                (new xui.UI.Div)
                .setHost(host,"div1")
                .setLeft(30)
                .setTop(20)
                .setWidth(180)
                .setHeight(110)
                .setHtml("<font size=\"4\"><b><br><br><br>&nbsp;&nbsp;&nbsp;&nbsp; rgba Test</b><br></font>")
                .onRender("_div1_onrender")
                .setCustomStyle({"KEY":"background-color:#B0C4DE"})
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel3")
                .setLeft(40)
                .setTop(160)
                .setWidth(34)
                .setHeight(10)
                .setCaption("R")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel4")
                .setLeft(40)
                .setTop(193)
                .setWidth(34)
                .setCaption("G")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel5")
                .setLeft(40)
                .setTop(228)
                .setWidth(34)
                .setCaption("B")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel6")
                .setLeft(40)
                .setTop(264)
                .setWidth(34)
                .setCaption("A")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"rgba_r")
                .setDirtyMark(false)
                .setLeft(70)
                .setTop(150)
                .setWidth(430)
                .setHeight(30)
                .setSteps(255)
                .setIsRange(false)
                .setValue("3")
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
                .setHost(host,"rgba_g")
                .setDirtyMark(false)
                .setLeft(70)
                .setTop(190)
                .setWidth(430)
                .setHeight(20)
                .setSteps(255)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"rgba_b")
                .setDirtyMark(false)
                .setLeft(70)
                .setTop(220)
                .setWidth(430)
                .setHeight(30)
                .setSteps(255)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"rgba_a")
                .setDirtyMark(false)
                .setLeft(70)
                .setTop(260)
                .setWidth(430)
                .setHeight(30)
                .setSteps(100)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _getValues:function(){
            var ns=this;
            return {
                r:parseInt(ns.rgba_r.getValue()),
                g:parseInt(ns.rgba_g.getValue()),
                b:parseInt(ns.rgba_b.getValue()),
                a:parseInt(ns.rgba_a.getValue())/100
            };
        },
        _t_sd_afteruivalueset : function (profile){
            _.resetRun("RGBA",this.setTS,0,null,this);
        },
        setTS:function(){
            var values = this._getValues(),
                node=this.div1.getRoot();
            
            node.css('backgroundColor', "rgba(" +values.r+","+values.g+","+values.b+","+values.a+")");
                                      
            this.i_cssStyle.setValue("background-color : "+node.css("backgroundColor"));
        },
        _div1_onrender : function (profile){
            var ns=this;
            ns.rgba_a.setValue(100)
            ns.rgba_r.setValue(255)
            ns.rgba_g.setValue(0)
            ns.rgba_b.setValue(0)
            ns.setTS();
        }
    }
});