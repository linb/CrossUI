 Class('App.xui_UI_Link', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new xui.UI.Link)
                .setHost(host,"link1")
                .setLeft(60)
                .setTop(60)
                .setCaption("A default link can't open the href")
                .setHref("http://www.google.com")
                .setTarget("_blank")
                .onClick("_link1_onclick")
            );

            append((new xui.UI.Link)
                .setHost(host,"link2")
                .setLeft(60)
                .setTop(140)
                .setCaption("A link with onClick event")
                .onShowTips("_shotips")
                .onClick("_link2_onclick")
            );

            append((new xui.UI.Link)
                .setHost(host,"link3")
                .setDisabled(true)
                .setLeft(60)
                .setTop(200)
                .setCaption("a disabled link")
            );

            append((new xui.UI.Link)
                .setHost(host,"link6")
                .setLeft(60)
                .setTop(100)
                .setCaption("A link can open the href")
                .setHref("http://www.google.com")
                .setTarget("_blank")
            );

            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _link2_onclick:function (profile, e) {
            xui.message(profile.boxing().getCaption() + ' clicked')
        },
        _shotips:function(profile,node, pos){
            xui.Tips.show(pos, 'link tips');
            return true;
        },
        _link1_onclick:function (profile, e) {
            return false;
        }
    }
});