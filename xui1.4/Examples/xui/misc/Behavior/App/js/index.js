
Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Button)
                .setHost(host,"button7")
                .setLeft(60)
                .setTop(50)
                .setWidth(260)
                .setCaption("Use default event behavior")
                .onClick("_button7_onclick")
            );
            
            append((new xui.UI.Button)
                .setHost(host,"button10")
                .setLeft(60)
                .setTop(90)
                .setWidth(260)
                .setCaption("Use custom behavior")
                .onClick("_button7_onclick")
                .setCustomBehavior({"onClick":function () {
                alert("In custom behavior!");
            }})
            );
            
            append((new xui.UI.Button)
                .setHost(host,"button13")
                .setLeft(60)
                .setTop(130)
                .setWidth(260)
                .setCaption("Use DOM attached behavior")
                .onRender("_button13_onrender")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _button7_onclick:function (profile, e, src, value) {
            alert('In default event behavior!');
        }, 
        _button13_onrender:function (profile) {
            profile.getRoot()
            .beforeClick(function(){
                alert('In DOM attached event 1');
            })
            .onClick(function(){
                alert('In DOM attached event 2');
                return false;
            })
            .afterClick(function(){
                alert('In DOM attached event 3(will never be excuted!)');
            })
        }
    }
});