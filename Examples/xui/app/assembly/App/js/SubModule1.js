xui.Class('App.SubModule1', 'xui.Module',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Pane)
                .setHost(host,"panelMain")
                .setLeft(60)
                .setTop(50)
                .setWidth(160)
                .setHeight(70)
            );
            
            host.panelMain.append((new xui.UI.Div)
                .setHost(host,"div37")
                .setLeft(10)
                .setTop(10)
                .setHeight(20)
                .setHtml("UI in SubModule1")
            );
            
            host.panelMain.append((new xui.UI.Button)
                .setHost(host,"button22")
                .setLeft(10)
                .setTop(40)
                .setWidth(140)
                .setCaption("button in SubModule1")
                .onClick("_button22_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _button22_onclick:function (profile, e, value) {
            alert("I'm in SubModule1");
        }, 
        _beforecreated:function (com, threadid) {
            xui.echo('thread id: '+threadid, 'SubModule1.js is loaded');
            xui.Thread(threadid).insert(1000);
        }, 
        events:{"onCreated":"_beforecreated", "onReady":"_onready"}, 
        iniExComs:function(com, threadid){
            //use newCom
            xui.newModule('App.Module3' ,function(){
                this.show(null,null,null,threadid);
            },threadid);
        },
        _onready:function (com, threadid) {
            xui.echo('thread id: '+threadid, 'SubModule1.js is ready');
            xui.Thread(threadid).insert(1000);
        }
    }
});