xui.Class('App', 'xui.Module',{
    Instance:{
        events:{"onCreated":"_beforecreated", "onReady":"_onready"}, 
        _beforecreated:function (com, threadid) {
            SPA=this;
            xui.echo('thread id: '+threadid,'index.js is loaded');
            
            xui.Thread(threadid).insert(1000);
        }, 
        iniExModules:function(com, threadid){
            //use getCom
            xui.getCom('App.Module2',function(err,com,threadid){
                var ns=this;
                SPA.div2.append(ns.panelMain);
            },threadid);
        }, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Pane)
                .setHost(host,"tag2")
                .setLeft(400)
                .setTop(20)
                .setWidth(268)
                .setHeight(188)
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div2")
                .setLeft(400)
                .setTop(230)
                .setWidth(268)
                .setHeight(188)
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _onready:function (com, threadid) {
            xui.echo('thread id: '+threadid,'index.js is ready');
            xui.Thread(threadid).insert(1000);
        }
    }
});