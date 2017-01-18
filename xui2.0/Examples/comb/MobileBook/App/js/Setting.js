xui.Class('App.Setting', 'xui.Module',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Div")
                .setHost(host,"ctl_pane10")
                .setDock("fill")
                .setShowEffects({
                    "params":{
                        "translateX":["100%","0%"]
                    },
                    "type":"circIn",
                    "duration":100
                }
                )
                .setHideEffects({
                    "params":{
                        "translateX":["0%","100%"]
                    },
                    "type":"circOut",
                    "duration":100
                }
                )
                .setConDockPadding({
                    "left":32,
                    "right":32,
                    "bottom":0
                }
                )
            );
            
            host.ctl_pane10.append(
                xui.create("xui.UI.Slider")
                .setHost(host,"xui_ui_slider1")
                .setDirtyMark(false)
                .setDock("width")
                .setLeft("0.625em")
                .setTop("1.875em")
                .setWidth("22em")
                .setHeight("2.5625em")
                .setIsRange(false)
                .setLabelSize("8em")
                .setLabelCaption("Font Size")
                .setLabelHAlign("left")
                .setValue("23")
                );
            
            host.ctl_pane10.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput548")
                .setDirtyMark(false)
                .setLeft("1.875em")
                .setTop("5.4375em")
                .setWidth("14.875em")
                .setLabelSize("8em")
                .setLabelCaption("Counter")
                .setLabelHAlign("left")
                .setType("counter")
                .setPrecision(0)
                .setValue(12)
                );
            
            host.ctl_pane10.append(
                xui.create("xui.UI.Input")
                .setHost(host,"xui_ui_input17")
                .setDirtyMark(false)
                .setDock("width")
                .setLeft("2.3125em")
                .setTop("9.1875em")
                .setWidth("18em")
                .setHeight("10em")
                .setPlaceholder("Some text here")
                .setLabelSize("8em")
                .setLabelCaption("Memo")
                .setLabelHAlign("left")
                .setMultiLines(true)
                );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        }
    }
});