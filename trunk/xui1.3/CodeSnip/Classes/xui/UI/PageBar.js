
Class('App.xui_UI_PageBar', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host = this,
                children = [],
                append = function(child){
                    children.push(child.get(0))
                };
            
            append((new xui.UI.Pane)
                .setHost(host,"panel9")
                .setLeft(20)
                .setTop(20)
                .setWidth(460)
                .setHeight(330)
            );
            
            host.panel9.append((new xui.UI.PageBar)
                .setHost(host,"pagebar4")
                .setValue("1:300:300")
                .setLeft(24)
                .setTop(170)
                .setWidth(330)
                .setHeight(23)
                .setTabindex("5")
                .setCaption("To : ")
                .setTextTpl("[*]")
                .onClick("_pagebar1_onclick")
            );
            
            host.panel9.append((new xui.UI.PageBar)
                .setHost(host,"pagebar3")
                .setValue("1:6:20")
                .setLeft(24)
                .setTop(90)
                .setWidth(330)
                .setHeight(23)
                .setTabindex("5")
                .setTextTpl("p *")
                .onClick("_pagebar1_onclick")
            );
            
            host.panel9.append((new xui.UI.PageBar)
                .setHost(host,"pagebar1")
                .setValue("1:3:32383")
                .setLeft(24)
                .setTop(15)
                .setWidth(330)
                .setHeight(23)
                .setTabindex("5")
                .onClick("_pagebar1_onclick")
            );
            
            host.panel9.append((new xui.UI.PageBar)
                .setHost(host,"pagebar5")
                .setValue("1:300:600")
                .setLeft(24)
                .setTop(250)
                .setWidth(330)
                .setHeight(23)
                .setTabindex("5")
                .setPrevMark("previous")
                .setNextMark("next")
                .onClick("_pagebar1_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _pagebar1_onclick:function (profile, page) {
            profile.boxing().setPage(page);
        }
    }
});