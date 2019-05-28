xui.Class('App.xui_UI_Pane', 'xui.Module',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Pane)
                .setHost(host,"pane1")
                .setLeft(60)
                .setTop(40)
                .setWidth(110)
                .setHeight(178)
                .setHtml("pane1")
            );
            
            host.pane1.append(
                (new xui.UI.Button)
                .setHost(host,"button15")
                .setLeft(10)
                .setTop(70)
                .setWidth(60)
                .setCaption("btn")
            );
            
            append(
                (new xui.UI.Pane)
                .setHost(host,"pane2")
                .setLeft(190)
                .setTop(40)
                .setWidth(110)
                .setHeight(178)
                .setHtml("pane2")
                .setCustomStyle({"KEY":"background:#00ff00;border:solid 1px #888"})
            );
            
            host.pane2.append(
                (new xui.UI.Button)
                .setHost(host,"button16")
                .setLeft(20)
                .setTop(80)
                .setWidth(60)
                .setCaption("btn")
            );
            
            append(
                (new xui.UI.Pane)
                .setHost(host,"pane3")
                .setLeft(320)
                .setTop(40)
                .setWidth(110)
                .setHeight(178)
                .setHtml("<strong>pane3</strong>")
            );
            
            host.pane3.append(
                (new xui.UI.Button)
                .setHost(host,"button17")
                .setLeft(20)
                .setTop(70)
                .setWidth(60)
                .setCaption("btn")
            );
            
            append(
                (new xui.UI.Pane)
                .setHost(host,"ctl_pane13")
                .setLeft(540)
                .setTop(140)
                .setWidth(100)
                .setHeight(100)
                .setAjaxAutoLoad("files/block.html")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});