Class('App.xui_UI_Calendar', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Block)
                .setHost(host,"block1")
                .setLeft(50)
                .setTop(80)
                .setWidth(340)
                .setHeight(304)
                .setBorder(true)
                .setResizer(true)
                .setCustomStyle({"PANEL":"background:#fff;"})
            );
            
            host.block1.append((new xui.UI.Calendar)
                .setHost(host,"calendar1")
                .setDropKeys("iEvent")
                .onDrop("_calendar1_ondrop")
            );
            
            append((new xui.UI.Button)
                .setHost(host,"button3")
                .setLeft(170)
                .setTop(30)
                .setCaption("drag me to calendar")
                .onRender("_button3_aftercreated")
            );
            
            append((new xui.UI.Button)
                .setHost(host,"button5")
                .setLeft(150)
                .setTop(410)
                .setCaption("xui.setLang('cn')")
                .onClick("_button5_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _button3_aftercreated:function (profile) {
            profile.boxing().draggable('iEvent','data');
        }, 
        _calendar1_ondrop:function (profile, e, node, key, data, item) {
            xui.message('drop key="'+key+'" date="'+data+'" at '+profile.getSubId(node))
        }, 
        _button5_onclick:function (profile, e, value) {
            xui.setLang('cn');
        }
    }
});