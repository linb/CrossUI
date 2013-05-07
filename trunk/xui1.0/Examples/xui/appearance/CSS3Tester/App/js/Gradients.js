// The default code is a com class (inherited from xui.Com)
Class('App.Gradients', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group1")
                .setLeft(30)
                .setTop(30)
                .setWidth(590)
                .setHeight(450)
                .setCaption("Gradients Test")
                .setToggleBtn(false)
            );
            
            host.ctl_group1.append(
                (new xui.UI.Div)
                .setHost(host,"div1")
                .setLeft(30)
                .setTop(20)
                .setWidth(180)
                .setHeight(110)
                .setHtml("<font size=\"4\"><b><br><br><br></b></font><font size=\"4\"><b><span class=\"js-string\">&nbsp;&nbsp;&nbsp;&nbsp; Gradients Test</span></b><br></font>")
                .onRender("_div1_onrender")
                .setCustomStyle({"KEY":"background-color:#B0C4DE"})
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel3")
                .setLeft(40)
                .setTop(250)
                .setWidth(84)
                .setHeight(14)
                .setCaption("Step 1")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"g_step1")
                .setDirtyMark(false)
                .setLeft(150)
                .setTop(240)
                .setWidth(220)
                .setHeight(30)
                .setSteps(100)
                .setIsRange(false)
                .setValue("20")
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
                (new xui.UI.ComboInput)
                .setHost(host,"g_step1clr")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(244)
                .setType("color")
                .setValue("#B22222")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel21")
                .setLeft(40)
                .setTop(284)
                .setWidth(84)
                .setHeight(14)
                .setCaption("Step 2")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"g_step2")
                .setDirtyMark(false)
                .setLeft(150)
                .setTop(274)
                .setWidth(220)
                .setHeight(30)
                .setSteps(100)
                .setIsRange(false)
                .setValue("40")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"g_step2clr")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(278)
                .setType("color")
                .setValue("#7FFF00")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel22")
                .setLeft(40)
                .setTop(324)
                .setWidth(84)
                .setHeight(14)
                .setCaption("Step 3")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"g_step3")
                .setDirtyMark(false)
                .setLeft(150)
                .setTop(314)
                .setWidth(220)
                .setHeight(30)
                .setSteps(100)
                .setIsRange(false)
                .setValue("60")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"g_step3clr")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(318)
                .setType("color")
                .setValue("#00008B")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel23")
                .setLeft(40)
                .setTop(364)
                .setWidth(84)
                .setHeight(14)
                .setCaption("Step 4")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"g_step4")
                .setDirtyMark(false)
                .setLeft(150)
                .setTop(354)
                .setWidth(220)
                .setHeight(30)
                .setSteps(100)
                .setIsRange(false)
                .setValue("80")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"g_step4clr")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(358)
                .setType("color")
                .setValue("#FF7F50")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel24")
                .setLeft(40)
                .setTop(400)
                .setWidth(84)
                .setHeight(14)
                .setCaption("End")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"g_end")
                .setDirtyMark(false)
                .setDisabled(true)
                .setLeft(150)
                .setTop(390)
                .setWidth(220)
                .setHeight(30)
                .setSteps(100)
                .setIsRange(false)
                .setValue("100")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"g_endclr")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(394)
                .setType("color")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel25")
                .setLeft(40)
                .setTop(210)
                .setWidth(84)
                .setHeight(14)
                .setCaption("Start")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Slider)
                .setHost(host,"t_start")
                .setDirtyMark(false)
                .setDisabled(true)
                .setLeft(150)
                .setTop(200)
                .setWidth(220)
                .setHeight(30)
                .setSteps(100)
                .setIsRange(false)
                .setValue("0")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"g_startclr")
                .setDirtyMark(false)
                .setLeft(400)
                .setTop(204)
                .setType("color")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel26")
                .setLeft(40)
                .setTop(170)
                .setWidth(84)
                .setHeight(14)
                .setCaption("Orientation")
                .setHAlign("left")
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"t_otype")
                .setDirtyMark(false)
                .setLeft(160)
                .setTop(170)
                .setWidth(190)
                .setType("listbox")
                .setItems([{"id":"l2r", "caption":"horizontal      →"}, {"id":"t2d", "caption":"vertical      ↓"}, {"id":"lt2br", "caption":"diagonal      ↘"}, {"id":"lb2tr", "caption":"diagonal      ↗"}, {"id":"radial", "caption":"radial      ○"}])
                .setValue("l2r")
                .afterUIValueSet("_t_sd_afteruivalueset")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _getValues:function(){
            var ns=this,
                arr=[];
            arr.push({step:ns.g_step1.getValue(),clr:ns.g_step1clr.getValue()||"#ffffff"});
            arr.push({step:ns.g_step2.getValue(),clr:ns.g_step2clr.getValue()||"#ffffff"});
            arr.push({step:ns.g_step3.getValue(),clr:ns.g_step3clr.getValue()||"#ffffff"});
            arr.push({step:ns.g_step4.getValue(),clr:ns.g_step4clr.getValue()||"#ffffff"});

            arr.sort(function(x,y){
               x=x.step; y=y.step;
               return x>y?1:x==y?0:-1;
            });
            arr.unshift({step:0,clr:ns.g_startclr.getValue()||"#ffffff"});
            arr.push({step:100,clr:ns.g_endclr.getValue()||"#ffffff"});
            return  arr;
        },
        _t_sd_afteruivalueset : function (profile){
            _.resetRun("Gradients",this.setTS,0,null,this);
        },
        setTS:function(){
            var ns=this,
                ori = ns.t_otype.getValue(),
                type = "linear",
                str,str1,str2,
                arr=[];
            switch(ori){
                case "l2r":
                    deg="left";
                    break;
                case "t2d":
                    deg="top";
                    break;
                case "lt2br":
                    deg="-45deg";
                    break;
                case "lb2tr":
                    deg="45deg";
                    break;
                case "radial":
                    type = "radial";
                    deg="center";
                    break;
            }
            arr.push(deg);

            var values = this._getValues(),
                node=this.div1.getRoot();

            _.arr.each(values,function(o){
                arr.push(o.clr + " " + o.step+'%');
            });
            str = type+"-gradient("+ arr.join(",") + ") ";
            str1 = xui.browser.cssTag1 + str;
try{
            node.css('background', str1);
}catch(e){}
            if(xui.browser.isWebKit){
                var str2="-webkit-gradient(" + type +",left bottom, right top,";
                arr=[];

                _.arr.each(values,function(o){
                    arr.push("color-stop(" + o.step + '%,' + o.clr + ")");
                });

                str += arr.join(",");
                str2 += ")";
try{
                node.css('background', str2);
}catch(e){}
            }
try{ 
            node.css('background', str);
}catch(e){}            
            this.i_cssStyle.setValue("background : "+node.css("background"));
        },
        _div1_onrender : function (profile){
            var ns=this;

            ns.setTS();
        }
    }
});