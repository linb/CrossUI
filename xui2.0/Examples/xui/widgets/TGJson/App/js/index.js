xui.Class('App', 'xui.Module',{
    Instance:{
        events:{"onReady":"_onready"}, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Panel)
                .setHost(host,"panel4")
                .setDock("none")
                .setLeft(30)
                .setTop(10)
                .setWidth(700)
                .setHeight(400)
                .setCaption("Build Grid from JSON!")
            );
            
            host.panel4.append((new xui.UI.TreeGrid)
                .setHost(host,"treegrid")
                .setRowHandler(false)
                .setRowResizer(false)
                .setColHidable(true)
                .setColMovable(true)
            );
            
            append((new xui.UI.SButton)
                .setHost(host,"sbutton1")
                .setLeft(270)
                .setTop(420)
                .setWidth(160)
                .setCaption("Make Grid Editable")
                .onClick("_sbutton1_onclick")
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div8")
                .setLeft(130)
                .setTop(450)
                .setWidth(420)
                .setHeight(140)
                .setHtml("<b>Try keyboard</b>: <br /><b>up</b> : to upper cell;<br /><b>down</b> : to below cell; <br /><b>(alt+)left</b>: to left cell; <br /><b>(alt+)right</b> : to right cell;<br /><b>tab</b> : direct to the last cell; <br /><b>enter</b> : equal to down(in edit mode); <br /><b>alt+enter</b> : input 'enter' in textarea(in edit mode); <br /><b>ctrl+enter</b>: show pop wnd(in edit mode); ")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _onready:function (com, threadid) {
            var ns=this;
            if(!ns._data)alert("no data");
            ns.treegrid.setHeader(ns._data.header).setRows(ns._data.rows);
        }, 
        iniResource:function (com, threadid) {
            xui.Ajax("App/js/data.js","",function(rsp){
                com._data=rsp;
            },function(){},threadid).start();
        }, 
        _sbutton1_onclick:function (profile, e, src, value) {
            this.treegrid.setEditable(true);
        }
    }
});