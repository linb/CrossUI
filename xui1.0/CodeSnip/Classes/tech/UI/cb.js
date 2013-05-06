Class('App.tech_UI_cb', 'xui.Com',{
    Instance:{
        _button21_onclick:function (profile, e, value) {
            xui.message('click fired in normal onclick event')
        },
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new xui.UI.Button)
                .setHost(host,"button21")
                .setLeft(110)
                .setTop(100)
                .setCaption("button21")
                .onClick("_button21_onclick")
            );

            append((new xui.UI.Button)
                .setHost(host,"button24")
                .setLeft(270)
                .setTop(100)
                .setCaption("button21")
                .onClick("_button21_onclick")
                .setCustomBehavior({"onClick":function () {
                xui.message("click fired in Custom Behaviors");
            }})
            );

            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});