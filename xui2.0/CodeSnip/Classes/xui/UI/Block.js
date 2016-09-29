Class('App.xui_UI_Block', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Pane")
                .setHost(host,"xui_ui_pane6")
                .setLeft("4.166666666666667em")
                .setTop("10em")
                .setWidth("38.3333em")
                .setHeight("27.5em")
            );
            
            host.xui_ui_pane6.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block1")
                .setDock("fill")
                );
            
            host.xui_ui_pane6.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block2")
                .setDock("left")
                .setSideBarType("right")
                .setSideBarCaption("with right SideBar")
                );
            
            host.xui_ui_block2.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block11")
                .setDock("fill")
                .setLeft("1.6666666666666667em")
                .setTop("5em")
                .setBorderType("inset")
                );
            
            host.xui_ui_pane6.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block3")
                .setDock("top")
                .setSideBarType("bottom")
                .setSideBarCaption("with bottom SidBar")
                .setSideBarStatus("fold")
                );
            
            host.xui_ui_block3.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block14")
                .setDock("fill")
                .setLeft("25em")
                .setTop("3.3333333333333335em")
                .setBorderType("inset")
                );
            
            host.xui_ui_pane6.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block4")
                .setDock("bottom")
                .setSideBarType("top")
                .setSideBarCaption("with top SidBar")
                );
            
            host.xui_ui_block4.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block13")
                .setDock("fill")
                .setLeft("25.833333333333332em")
                .setTop("2.5em")
                .setBorderType("inset")
                );
            
            host.xui_ui_pane6.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block5")
                .setDock("right")
                .setSideBarType("left")
                .setSideBarCaption("with left SideBar")
                );
            
            host.xui_ui_block5.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block12")
                .setDock("fill")
                .setLeft("1.6666666666666667em")
                .setTop("6.666666666666667em")
                .setBorderType("inset")
                );
            
            append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block24")
                .setLeft("17.5em")
                .setTop("1.6666666666666667em")
                .setWidth("5.83333em")
                .setHeight("5.83333em")
                .setHtml("<div align=\"center\">inset<br></div>")
                .setBorderType("inset")
            );
            
            append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block25")
                .setLeft("24.166700000000002em")
                .setTop("1.66667em")
                .setHeight("5.83333em")
                .setWidth("5.83333em")
                .setHtml("<div align=\"center\">outset<br></div>")
            );
            
            append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block26")
                .setLeft("30.833299999999998em")
                .setTop("1.66667em")
                .setHeight("5.83333em")
                .setWidth("5.83333em")
                .setHtml("<div align=\"center\">groove</div>")
                .setBorderType("groove")
            );
            
            append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block27")
                .setLeft("37.5em")
                .setTop("1.66667em")
                .setHeight("5.83333em")
                .setWidth("5.83333em")
                .setHtml("<div align=\"center\">ridge</div>")
                .setBorderType("ridge")
            );
            
            append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block30")
                .setLeft("10.8333em")
                .setTop("1.66667em")
                .setWidth("5.83333em")
                .setHeight("5.83333em")
                .setHtml("<div align=\"center\">flat<br></div>")
                .setBorderType("flat")
            );
            
            append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block31")
                .setLeft("4.16667em")
                .setTop("1.66667em")
                .setWidth("5.83333em")
                .setHeight("5.83333em")
                .setHtml("<div align=\"center\">none<br></div>")
                .setBorderType("none")
                .setPanelBgClr("transparent")
            );
            
            append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block32")
                .setLeft("44.1667em")
                .setTop("1.66667em")
                .setWidth("17.5em")
                .setHeight("35.8333em")
                .setHtml("<div align=\"center\">inset<br></div>")
                .setBorderType("inset")
                .setIframeAutoLoad("http://www.crossui.com")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        }
    }
});