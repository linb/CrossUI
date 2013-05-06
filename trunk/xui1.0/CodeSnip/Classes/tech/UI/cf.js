Class('App.tech_UI_cf', 'xui.Com',{
    Instance:{
        _button21_onclick:function (profile, e, value) {
            if(profile.CF.click){
                _.tryF(profile.CF.click);
            }else
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
                .setCustomFunction({"click":function () {
                xui.message("click fired in Custom Functions");
            }})
            );

            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});