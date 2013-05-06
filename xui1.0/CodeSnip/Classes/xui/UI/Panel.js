
Class('App.xui_UI_Panel', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Pane)
                .setHost(host,"pane4")
                .setLeft(60)
                .setTop(20)
                .setWidth(240)
                .setHeight(340)
            );
            
            host.pane4.append((new xui.UI.Panel)
                .setHost(host,"panelbar2")
                .setDock("width")
                .setHeight("auto")
                .setZIndex(1)
                .setPosition("relative")
                .setCaption("relative auto-adjust height 1")
                .setToggleBtn(true)
            );
            
            host.panelbar2.append((new xui.UI.Button)
                .setHost(host,"button9")
                .setLeft(67)
                .setPosition("relative")
                .setCaption("button9")
            );
            
            host.pane4.append((new xui.UI.Panel)
                .setHost(host,"panelbar3")
                .setDock("width")
                .setHeight("auto")
                .setZIndex(1)
                .setPosition("relative")
                .setCaption("relative auto-adjust height 1")
            );
            
            host.panelbar3.append((new xui.UI.Button)
                .setHost(host,"button11")
                .setLeft(67)
                .setPosition("relative")
                .setCaption("button9")
            );
            
            host.pane4.append((new xui.UI.Panel)
                .setHost(host,"panel7")
                .setDock("width")
                .setHeight(96)
                .setZIndex(1)
                .setPosition("relative")
                .setCaption("relative auto-adjust height 1")
            );
            
            host.panel7.append((new xui.UI.Button)
                .setHost(host,"button10")
                .setLeft(67)
                .setPosition("relative")
                .setCaption("button9")
            );
            
            append((new xui.UI.Pane)
                .setHost(host,"panel5")
                .setLeft(420)
                .setTop(19)
                .setWidth(260)
                .setHeight(135)
            );
            
            host.panel5.append((new xui.UI.Panel)
                .setHost(host,"panelbar6")
                .setZIndex(1)
                .setCaption("in container dock=fill")
                .setToggleBtn(true)
            );
            
            host.panelbar6.append((new xui.UI.Button)
                .setHost(host,"button15")
                .setLeft(62)
                .setCaption("button15")
            );
            
            append((new xui.UI.Panel)
                .setHost(host,"panelbar7")
                .setDock("none")
                .setLeft(420)
                .setTop(180)
                .setWidth(280)
                .setHeight(180)
                .setZIndex(1)
                .setCaption("absolute dock=none")
                .setToggle(false)
                .setOptBtn(true)
                .setToggleBtn(true)
                .setCloseBtn(true)
                .setPopBtn(true)
                .onIniPanelView("_panelbar7_oninipanelview")
                .beforeFold("_panelbar7_onfold")
                .beforeExpend("_panelbar7_onexpend")
                .onShowOptions("_panelbar7_onshowoptions")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _panelbar7_oninipanelview:function (profile) {
            profile.boxing().append(new xui.UI.Button);
        }, 
        _panelbar7_onfold:function (profile) {
            xui.message('fold');
        }, 
        _panelbar7_onexpend:function (profile) {
            xui.message('expend');
        }, 
        _panelbar7_onshowoptions:function (profile, e, src) {
            xui.message('onShowOptions');
        }
    }
});