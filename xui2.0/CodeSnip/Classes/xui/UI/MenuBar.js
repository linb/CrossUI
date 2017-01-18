xui.Class('App.xui_UI_MenuBar', 'xui.Module',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.PopMenu)
                .setHost(host,"popmenu2")
                .setItems([{"id":"a", "caption":"item a", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b", "sub":[{"id":"itema1", "caption":"itema", "tips":"item a"}, {"id":"itemb1", "caption":"itemb", "tips":"item b", "sub":[{"id":"itemc11", "caption":"itemc", "tips":"item c"}, {"id":"itemd11", "caption":"itemd", "tips":"item d"}]}, {"id":"itemc1", "caption":"itemc", "tips":"item c"}, {"id":"itemd1", "caption":"itemd", "tips":"item d", "sub":[{"id":"itemc11", "caption":"itemc", "tips":"item c"}, {"id":"itemd11", "caption":"itemd", "tips":"item d"}]}]}, {"id":"itemc", "caption":"itemc", "tips":"item c"}, {"id":"itemd", "caption":"itemd", "tips":"item d"}, {"id":"iteme", "caption":"iteme"}, {"id":"itemf", "caption":"itemf"}, {"id":"itemg", "caption":"itemg"}, {"id":"itemh", "caption":"itemh"}, {"id":"itemi", "caption":"itemi"}, {"id":"itemj", "caption":"itemj"}, {"id":"itemk", "caption":"itemk"}, {"id":"iteml", "caption":"iteml"}, {"id":"itemm", "caption":"itemm"}, {"id":"itemn", "caption":"itemn"}, {"id":"itemo", "caption":"itemo"}, {"id":"itemp", "caption":"itemp"}])
                .onMenuSelected("_popmenu2_onmenuselected")
            );
            
            append((new xui.UI.PopMenu)
                .setHost(host,"popmenu1")
                .setItems([{"id":"itema", "caption":"itema", "tips":"item a"}, {"type":"split"}, {"id":"itemb", "caption":"itemb", "tips":"item b"}, {"id":"itemc", "caption":"itemc", "tips":"item c"}, {"id":"itemd", "caption":"itemd", "tips":"item d"}])
                .onMenuSelected("_popmenu1_onmenuselected")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"block1")
                .setLeft(40)
                .setTop(20)
                .setWidth(520)
                .setHeight(120)
                .setResizer(true)
            );
            
            host.block1.append((new xui.UI.MenuBar)
                .setHost(host,"menubar1")
                .setItems([{"id":"file", "caption":"File", "sub":[{"id":"newproject", "caption":"New Project", "image":"img/App.gif", "imagePos":"-32px top"}, {"id":"openproject", "caption":"Open Project", "add":"Ctrl+Alt+O", "image":"img/App.gif", "imagePos":"-48px top"}, {"id":"closeproject", "caption":"Close Project"}, {"type":"split"}, {"id":"save", "caption":"Save", "image":"img/App.gif", "imagePos":"-80px top"}, {"id":"saveall", "caption":"Save All", "add":"Ctrl+Alt+S", "image":"img/App.gif", "imagePos":"-96px top"}]}, {"id":"tools", "caption":"Tools", "sub":[{"id":"command", "caption":"Command Window", "image":"img/App.gif", "imagePos":"-112px top"}, {"id":"spy", "caption":"Components Spy", "image":"img/App.gif", "imagePos":"-128px top"}]}, {"id":"build", "caption":"Build", "sub":[{"id":"debug", "caption":"Debug", "image":"img/App.gif", "imagePos":"top left", "add":"F9"}, {"id":"release", "caption":"Release", "image":"img/App.gif", "imagePos":"-64px top", "add":"Ctrl+F9"}, {"type":"split"}, {"id":"setting", "caption":"Build Setting"}]}, {"id":"help", "caption":"Help", "sub":[{"id":"Forum", "caption":"forum"}, {"type":"split"}, {"id":"License", "caption":"License"}, {"type":"split"}, {"id":"about", "caption":"About"}]}])
                .setAutoShowTime(0)
                .onMenuSelected("_menubar1_onmenuselected")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"block26")
                .setLeft(40)
                .setTop(160)
                .setWidth(520)
                .setHeight(120)
                .setResizer(true)
            );
            
            host.block26.append((new xui.UI.MenuBar)
                .setHost(host,"menubar5")
                .setItems([{"id":"file", "caption":"File", "sub":[{"id":"newproject", "caption":"New Project", "image":"img/App.gif", "imagePos":"-32px top"}, {"id":"openproject", "caption":"Open Project", "add":"Ctrl+Alt+O", "image":"img/App.gif", "imagePos":"-48px top"}, {"id":"closeproject", "caption":"Close Project"}, {"type":"split"}, {"id":"save", "caption":"Save", "image":"img/App.gif", "imagePos":"-80px top"}, {"id":"saveall", "caption":"Save All", "add":"Ctrl+Alt+S", "image":"img/App.gif", "imagePos":"-96px top"}]}, {"id":"tools", "caption":"Tools", "sub":[{"id":"command", "caption":"Command Window", "image":"img/App.gif", "imagePos":"-112px top"}, {"id":"spy", "caption":"Components Spy", "image":"img/App.gif", "imagePos":"-128px top"}]}, {"id":"build", "caption":"Build", "sub":[{"id":"debug", "caption":"Debug", "image":"img/App.gif", "imagePos":"top left", "add":"F9"}, {"id":"release", "caption":"Release", "image":"img/App.gif", "imagePos":"-64px top", "add":"Ctrl+F9"}, {"type":"split"}, {"id":"setting", "caption":"Build Setting"}]}, {"id":"help", "caption":"Help", "sub":[{"id":"Forum", "caption":"forum"}, {"type":"split"}, {"id":"License", "caption":"License"}, {"type":"split"}, {"id":"about", "caption":"About"}]}])
                .onMenuSelected("_menubar1_onmenuselected")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _menubar1_onmenuselected:function (profile, popPro, item, src) {
            xui.message(item.id+' selected.')
        }
    }
});