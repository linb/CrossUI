Class('App', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append((new xui.UI.Div())
            .setHost(host,"div")
            .setLeft(40)
            .setTop(240)
            .setWidth(160)
            .setHeight(100)
            .setHtml("<div align=\"center\">div</div>")
            .setCustomStyle({"KEY":{"background-color":"#FFC0CB"}})
            );
            
            append((new xui.UI.Panel())
            .setHost(host,"log")
            .setDock("none")
            .setLeft(230)
            .setTop(10)
            .setWidth(400)
            .setHeight(330)
            .setZIndex(1)
            .setCaption("Mouse Events")
            .setRefreshBtn(true)
            .onRefresh("_log_onrefresh")
            );
            
            append((new xui.UI.Element())
            .setHost(host,"btn")
            .setLeft(40)
            .setTop(20)
            .setWidth(158)
            .setHeight(30)
            .setNodeName("input")
            .setAttributes({"type":"button", "value":"Button"})
            );
            
            append((new xui.UI.Element())
            .setHost(host,"input")
            .setLeft(40)
            .setTop(70)
            .setWidth(158)
            .setHeight(30)
            .setNodeName("input")
            .setAttributes({"type":"input", "value":"Input"})
            );
            
            append((new xui.UI.Element())
            .setHost(host,"textarea")
            .setLeft(40)
            .setTop(150)
            .setWidth(158)
            .setHeight(68)
            .setNodeName("textarea")
            .setAttributes({"value":"Textarea"})
            );
            
            append((new xui.UI.Element())
            .setHost(host,"input2")
            .setLeft(40)
            .setTop(110)
            .setWidth(158)
            .setHeight(30)
            .setNodeName("input")
            .setAttributes({"type":"input", "value":"Input2"})
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        events:{"onRender":"_com_onrender"},
        addLog:function(txt){
            var ns=this;
            _.asyRun(function(){
                ns.log.getSubNode("PANEL").prepend("<div>"+txt+"</div>");
            });
        },
        _com_onrender:function (com, threadid){
            var ns=this;

            ns.btn.getRoot().onMousedown(function(p,e,s){
                ns.addLog("Mousedown event "+ _.stringify(xui.Event.getPos(e)) + " on Button");
            }).onMouseup(function(p,e,s){
                ns.addLog("Mouseup event "+ _.stringify(xui.Event.getPos(e)) + " on Button");
            }).onMousemove(function(p,e,s){
                ns.addLog("Mousemove event "+ _.stringify(xui.Event.getPos(e)) + " on Button");
            }).onClick(function(p,e,s){
                ns.addLog("Click event "+ _.stringify(xui.Event.getPos(e)) + " on Button");
            }).onDblclick(function(p,e,s){
                ns.addLog("Dblclick event "+ _.stringify(xui.Event.getPos(e)) + " on Button");
            });

            ns.div.getRoot().onMousedown(function(p,e,s){
                ns.addLog("Mousedown event "+ _.stringify(xui.Event.getPos(e)) + " on Div");
            }).onMouseup(function(p,e,s){
                ns.addLog("Mouseup event "+ _.stringify(xui.Event.getPos(e)) + " on Div");
            }).onMousemove(function(p,e,s){
                ns.addLog("Mousemove event "+ _.stringify(xui.Event.getPos(e)) + " on Div");
            }).onClick(function(p,e,s){
                ns.addLog("Click event "+ _.stringify(xui.Event.getPos(e)) + " on Div");
            }).onDblclick(function(p,e,s){
                ns.addLog("Dblclick event "+ _.stringify(xui.Event.getPos(e)) + " on Div");
            });

            ns.input.getRoot().onMousedown(function(p,e,s){
                ns.addLog("Mousedown event "+ _.stringify(xui.Event.getPos(e)) + " on Input");
            }).onMouseup(function(p,e,s){
                ns.addLog("Mouseup event "+ _.stringify(xui.Event.getPos(e)) + " on Input");
            }).onMousemove(function(p,e,s){
                ns.addLog("Mousemove event "+ _.stringify(xui.Event.getPos(e)) + " on Input");
            }).onClick(function(p,e,s){
                ns.addLog("Click event "+ _.stringify(xui.Event.getPos(e)) + " on Input");
            }).onDblclick(function(p,e,s){
                ns.addLog("Dblclick event "+ _.stringify(xui.Event.getPos(e)) + " on Input");
            }).beforeFocus(function(p,e,s){
                ns.addLog("Focus event on Input");
            });
            
            ns.input2.getRoot().onMousedown(function(p,e,s){
                ns.addLog("Mousedown event "+ _.stringify(xui.Event.getPos(e)) + " on Input2");
            }).onMouseup(function(p,e,s){
                ns.addLog("Mouseup event "+ _.stringify(xui.Event.getPos(e)) + " on Input2");
            }).onMousemove(function(p,e,s){
                ns.addLog("Mousemove event "+ _.stringify(xui.Event.getPos(e)) + " on Input2");
            }).onClick(function(p,e,s){
                ns.addLog("Click event "+ _.stringify(xui.Event.getPos(e)) + " on Inpu2t");
            }).onDblclick(function(p,e,s){
                ns.addLog("Dblclick event "+ _.stringify(xui.Event.getPos(e)) + " on Input2");
            }).beforeFocus(function(p,e,s){
                ns.addLog("Focus event on Input2");
            });

            ns.textarea.getRoot().onMousedown(function(p,e,s){
                ns.addLog("Mousedown event "+ _.stringify(xui.Event.getPos(e)) + " on Textarea");
            }).onMouseup(function(p,e,s){
                ns.addLog("Mouseup event "+ _.stringify(xui.Event.getPos(e)) + " on Input");
            }).onMousemove(function(p,e,s){
                ns.addLog("Mousemove event "+ _.stringify(xui.Event.getPos(e)) + " on Textarea");
            }).onClick(function(p,e,s){
                ns.addLog("Click event "+ _.stringify(xui.Event.getPos(e)) + " on Textarea");
            }).onDblclick(function(p,e,s){
                ns.addLog("Dblclick event "+ _.stringify(xui.Event.getPos(e)) + " on Textarea");
            }).beforeFocus(function(p,e,s){
                ns.addLog("Focus event on Textarea");
            });            
        },
        _log_onrefresh:function (profile){
            var ns = this, uictrl = profile.boxing();
            uictrl.setHtml("",true);
        }
    }
});