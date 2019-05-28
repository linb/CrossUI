xui.Class('App.Module3', 'xui.Module',{
    Instance:{
        customAppend:function(){
            this.dialog.show();
        }, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Dialog)
                .setHost(host,"dialog")
                .setLeft(130)
                .setTop(160)
                .setHeight(200)
                .setCaption("dialog in Module3")
            );
            
            host.dialog.append((new xui.UI.Pane)
                .setHost(host,"panelMain")
                .setLeft(20)
                .setTop(30)
                .setWidth(220)
                .setHeight(80)
            );
            
            host.panelMain.append((new xui.UI.Div)
                .setHost(host,"div37")
                .setLeft(30)
                .setTop(10)
                .setHeight(20)
                .setHtml("UI in Module3")
            );
            
            host.panelMain.append((new xui.UI.Button)
                .setHost(host,"button22")
                .setLeft(20)
                .setTop(40)
                .setWidth(180)
                .setCaption("button in Module3")
                .onClick("_button22_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _button22_onclick:function (profile, e, value) {
            alert("I'm in Module3");
        }
    }
});