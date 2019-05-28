xui.Class('App.xui_UI_RichEditor', 'xui.Module',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.RichEditor)
                .setHost(host,"richeditor1")
                .setLeft(50)
                .setTop(30)
                .setHeight(140)
                .setValue("<font style=\"background-color: rgb(0, 255, 0);\" size=\"4\">A</font> <font size=\"4\" face=\"Arial Black\">RichEditor </font><b><font color=\"#9400d3\">powered by</font></b> <font face=\"Comic Sans MS\">xui.</font><br>")
            );
            
            append((new xui.UI.RichEditor)
                .setHost(host,"richeditor2")
                .setLeft(50)
                .setTop(180)
                .setHeight(140)
                .setCmdList("font1;font2;font3;font4")
                .setValue("Customized command button group.")
            );
            
            append((new xui.UI.RichEditor)
                .setHost(host,"richeditor3")
                .setDisabled(true)
                .setLeft(50)
                .setTop(330)
                .setHeight(140)
                .setValue("Disabled")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});