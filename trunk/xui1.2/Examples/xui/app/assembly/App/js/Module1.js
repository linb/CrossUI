Class('App.Module1', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Pane)
                .setHost(host,"panelMain")
                .setLeft(0)
                .setTop(0)
                .setWidth(250)
                .setHeight(180)
            );
            
            host.panelMain.append((new xui.UI.Div)
                .setHost(host,"div37")
                .setLeft(20)
                .setTop(10)
                .setHeight(20)
                .setHtml("UI in Module1")
            );
            
            host.panelMain.append((new xui.UI.Tag)
                .setHost(host,"tag2")
                .setLeft(20)
                .setTop(70)
                .setWidth(218)
                .setHeight(98)
                .setTagKey("tag_SubModule1")
            );
            
            host.panelMain.append((new xui.UI.Button)
                .setHost(host,"button22")
                .setLeft(20)
                .setTop(40)
                .setWidth(170)
                .setCaption("button in Module1")
                .onClick("_button22_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _button22_onclick:function (profile, e, value) {
            alert("I'm in Module1");
        }, 
        _beforecreated:function (com, threadid) {
            xui.echo('thread id: '+threadid,'Module1.js is loaded');
            xui.Thread(threadid).insert(1000);
        }, 
        events:{"onCreated":"_beforecreated", "onReady":"_onready"}, 
        _onready:function (com, threadid) {
            xui.echo('thread id: '+threadid,'Module1.js is ready');
            xui.Thread(threadid).insert(1000);
        }
    }
});