Class('App.BorderRadius', 'xui.Com',{
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
                .setCaption("Border Radius Test")
                .setToggleBtn(false)
            );
            
            host.ctl_group1.append(
                (new xui.UI.Div)
                .setHost(host,"div1")
                .setLeft(30)
                .setTop(20)
                .setWidth(180)
                .setHeight(110)
                .setHtml("<font size=\"4\"><b><br><br><br>&nbsp;&nbsp;&nbsp;&nbsp; Border Radius</b><br></font>")
                .onRender("_div1_onrender")
                .setCustomStyle({"KEY":"background-color:#B0C4DE"})
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"r_cS")
                .setDirtyMark(false)
                .setLeft(120)
                .setTop(160)
                .setType("listbox")
                .setItems([{"id":"dashed", "caption":"dashed"}, {"id":"dotted", "caption":"dotted"}, {"id":"double", "caption":"double"}, {"id":"groove", "caption":"groove"}, {"id":"hidden", "caption":"hidden"}, {"id":"inset", "caption":"inset"}, {"id":"none", "caption":"none"}, {"id":"outset", "caption":"outset"}, {"id":"ridge", "caption":"ridge"}, {"id":"solid", "caption":"solid"}, {"id":"inherit", "caption":"inherit"}])
                .setValue("dashed")
                .afterUIValueSet("_r_cs_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel1")
                .setLeft(10)
                .setTop(164)
                .setWidth(84)
                .setCaption("Style")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel2")
                .setLeft(10)
                .setTop(258)
                .setWidth(84)
                .setCaption("Width")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel3")
                .setLeft(310)
                .setTop(168)
                .setWidth(84)
                .setCaption("Radius T-left")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel4")
                .setLeft(310)
                .setTop(198)
                .setWidth(84)
                .setCaption("Radius T-Right")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel5")
                .setLeft(310)
                .setTop(228)
                .setWidth(84)
                .setCaption("Radius B-left")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel6")
                .setLeft(310)
                .setTop(258)
                .setWidth(84)
                .setCaption("Radius B-Right")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel7")
                .setLeft(10)
                .setTop(214)
                .setWidth(84)
                .setCaption("Color")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"r_sW")
                .setDirtyMark(false)
                .setLeft(101)
                .setTop(250)
                .setWidth(150)
                .setHeight(30)
                .setSteps(15)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_r_cs_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"r_cC")
                .setDirtyMark(false)
                .setLeft(120)
                .setTop(210)
                .setType("color")
                .afterUIValueSet("_r_cs_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"r_sTL")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(160)
                .setWidth(150)
                .setHeight(30)
                .setSteps(100)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_r_cs_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"r_sTR")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(190)
                .setWidth(150)
                .setHeight(30)
                .setSteps(100)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_r_cs_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"r_sBL")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(220)
                .setWidth(150)
                .setHeight(30)
                .setSteps(100)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_r_cs_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"r_sBR")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(250)
                .setWidth(150)
                .setHeight(30)
                .setSteps(100)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_r_cs_afteruivalueset")
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
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _getValues:function(){
            var ns=this;
            return {
                style:ns.r_cS.getValue(),
                color:ns.r_cC.getValue(),
                width:ns.r_sW.getValue(),
                tl:ns.r_sTL.getValue(),
                tr:ns.r_sTR.getValue(),
                bl:ns.r_sBL.getValue(),
                br:ns.r_sBR.getValue()
            };
        },
        _r_cs_afteruivalueset : function (profile){
            _.resetRun("border_radius",this.setBR,0,null,this);
        },
        setBR:function(){
            var values = this._getValues(),
                node=this.div1.getRoot();
            
            node.css('border',values.style +  " " + values.color + " " + values.width +"px");
            if(values.tl){
                node.css("borderTopLeftRadius",values.tl+"px");
            }
            if(values.tr){
                node.css("borderTopRightRadius",values.tr+"px");
            }
            if(values.bl){
                node.css("borderBottomLeftRadius",values.bl+"px");
            }
            if(values.br){
                node.css("borderBottomRightRadius",values.br+"px");
            }
                           
            this.i_cssStyle.setValue("border : "+node.css("border") +"\n\n" + "border-radius : "+node.css("borderRadius"));
        },
        _div1_onrender : function (profile){
            var ns=this;
            ns.r_cS.setValue("dashed");
            ns.r_cC.setValue("#000000");
            ns.r_sW.setValue(5);
            ns.r_sTL.setValue(0);
            ns.r_sTR.setValue(0);
            ns.r_sBL.setValue(0);
            ns.r_sBR.setValue(0);  
           
            ns.setBR();
        }
    }
});

