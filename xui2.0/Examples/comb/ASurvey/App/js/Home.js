xui.Class('App.Home', 'xui.Module',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div19")
                .setShowEffects("Blur")
                .setHideEffects("Blur")
                .setLeft("0em")
                .setTop("0em")
                .setWidth("22em")
                .setHeight("30em")
                .setOverflow("hidden")
            );
            
            host.xui_ui_div19.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button10")
                .setDirtyMark(false)
                .setLeft("0.8333333333333334em")
                .setTop("9.833333333333334em")
                .setWidth("20.4375em")
                .setHeight("4.083333333333333em")
                .setCaption("multiple - multiple choice")
                .onClick([{
                    "desc":"Action 1",
                    "type":"other",
                    "target":"callback",
                    "args":["{functions.tooptions}"],
                    "method":"call"
                }])
                );
            
            host.xui_ui_div19.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label14")
                .setLeft("1.25em")
                .setTop("3.125em")
                .setWidth("17.0625em")
                .setHeight("1.25em")
                .setCaption("Specify the question type first:")
                .setHAlign("left")
                );
            
            host.xui_ui_div19.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button57")
                .setDirtyMark(false)
                .setLeft("0.8333333333333334em")
                .setTop("4.916666666666667em")
                .setWidth("20.4375em")
                .setHeight("4.083333333333333em")
                .setCaption(" multiple choice")
                .onClick([{
                    "desc":"Action 1",
                    "type":"other",
                    "target":"callback",
                    "args":["{functions.tooptions}"],
                    "method":"call"
                }])
                );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        }
    }
});