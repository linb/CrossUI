Class('App.xui_UI_CheckBox', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Group)
                .setHost(host,"group2")
                .setLeft(50)
                .setTop(110)
                .setWidth(330)
                .setHeight(310)
                .setCaption("xui.UI.CheckBox")
                .setToggleBtn(false)
            );
            
            host.group2.append((new xui.UI.CheckBox)
                .setHost(host,"checkbox5")
                .setLeft(30)
                .setTop(50)
                .setWidth(250)
                .setHeight(30)
                .setCaption("a advanced checkbox with image")
                .setImage("img/demo.gif")
            );
            
            host.group2.append((new xui.UI.CheckBox)
                .setHost(host,"checkbox4")
                .setLeft(30)
                .setTop(90)
                .setWidth(250)
                .setHeight(30)
                .setCaption("a advanced checkbox with shadow")
            );
            
            host.group2.append((new xui.UI.CheckBox)
                .setHost(host,"checkbox6")
                .setLeft(30)
                .setTop(210)
                .setWidth(250)
                .setHeight(30)
                .setCaption("Check me to check all")
                .afterUIValueSet("_checkbox_aftervalueupdated")
            );
            
            host.group2.append((new xui.UI.CheckBox)
                .setHost(host,"checkbox1")
                .setLeft(30)
                .setTop(180)
                .setWidth(250)
                .setCaption("Cant check me")
                .beforeUIValueSet("_checkbox1_beforeuivalueset")
            );
            
            host.group2.append((new xui.UI.CheckBox)
                .setHost(host,"checkbox3")
                .setLeft(30)
                .setTop(140)
                .setWidth(250)
                .setHeight(27)
                .setCaption("Right Alignment")
            );
            
            host.group2.append((new xui.UI.CheckBox)
                .setHost(host,"checkbox2")
                .setLeft(30)
                .setTop(10)
                .setWidth(250)
                .setHeight(27)
                .setCaption("a advanced checkbox with border")
            );
            
            append((new xui.UI.Group)
                .setHost(host,"group1")
                .setLeft(50)
                .setTop(20)
                .setWidth(330)
                .setHeight(70)
                .setCaption("xui.UI.SCheckBox (recommended)")
                .setToggleBtn(false)
            );
            
            host.group1.append((new xui.UI.SCheckBox)
                .setHost(host,"scheckbox1")
                .setLeft(30)
                .setTop(20)
                .setCaption("a simple checkbox ")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _checkbox_aftervalueupdated:function (profile, oldValue, newValue) {
            xui.UI.CheckBox.getAll().setUIValue(newValue);
        }, 
        _checkbox1_beforeuivalueset:function (profile, oldValue, newValue) {
            return false;
        }
    }
});