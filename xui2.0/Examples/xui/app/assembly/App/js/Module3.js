xui.Class('App.Module3', 'xui.Module',{
    Instance:{
        customAppend:function(){
            this.dialog.show();
        }, 
        iniResource:function(com, threadid){
            var ns=this;
            xui.absIO.groupCall({data:xui.Ajax('App/js/data.js','',function(txt){
                ns.$cap=txt;
            })},null,function(threadid){
                xui.echo('thread id: '+threadid, 'to get Datasource in Module3.js');
                xui.Thread(threadid).insert(1000);
            },function(threadid){
                xui.echo('thread id: '+threadid, 'Datasource is ready in Module3.js');
                xui.Thread(threadid).insert(1000);
            },threadid);
        },
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Dialog)
                .setHost(host,"dialog")
                .setLeft(480)
                .setTop(160)
                .setHeight(200)
                .setCaption("dialog in Module3")
            );
            
            host.dialog.append((new xui.UI.Pane)
                .setHost(host,"panelMain")
                .setLeft(20)
                .setTop(30)
                .setWidth(220)
                .setHeight(80)
            );
            
            host.panelMain.append((new xui.UI.Div)
                .setHost(host,"div37")
                .setLeft(30)
                .setTop(10)
                .setHeight(20)
                .setHtml("UI in Module3")
            );
            
            host.panelMain.append((new xui.UI.Button)
                .setHost(host,"button22")
                .setLeft(20)
                .setTop(40)
                .setWidth(180)
                .setCaption("button in Module3")
                .onClick("_button22_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _button22_onclick:function (profile, e, value) {
            alert("I'm in Module3");
        }, 
        _beforecreated:function (com, threadid) {
            xui.echo('thread id: '+threadid, 'Module3.js is loaded');
            xui.Thread(threadid).insert(1000);
        }, 
        events:{"onCreated":"_beforecreated", "onReady":"_onready"}, 
        _onready:function (com, threadid) {
            com.dialog.setCaption(com.$cap);
            
            xui.echo('thread id: '+threadid, 'Module3.js is ready');
            xui.Thread(threadid).insert(1000);
        }
    }
});