Class('App.xui_UI_Poll', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Block)
                .setHost(host,"block1")
                .setLeft(60)
                .setTop(20)
                .setWidth(553)
                .setHeight(600)
                .setBorder(true)
                .setResizer(true)
                .setBackground("#fff")
            );
            
            host.block1.append((new xui.UI.Poll)
                .setHost(host,"poll05")
                .setItems([{"id":"a", "caption":"option 1", "message":"1", "percent":"0.1"}, {"id":"b", "caption":"option 2", "message":"90%", "percent":"0.9"}])
                .setDisabled(true)
                .setLeft(null)
                .setTop(null)
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                .setTitle("5. single select (disabled)")
                .setValue("")
            );
            
            host.block1.append((new xui.UI.Poll)
                .setHost(host,"poll02")
                .setItems([{"id":"a", "caption":"option 1", "message":"2", "percent":"0.2"}, {"id":"b", "caption":"option 2", "message":"80%", "percent":"0.8"}])
                .setLeft(null)
                .setTop(null)
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                .setSelMode("multi")
                .setTitle("2. multi select ")
                .setValue("")
            );
            
            host.block1.append((new xui.UI.Poll)
                .setHost(host,"poll06")
                .setItems([{"id":"a", "caption":"option 1", "message":"4", "percent":"0.4"}, {"id":"b", "caption":"option 2", "message":"60%", "percent":"0.6"}])
                .setLeft(null)
                .setTop(null)
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                .setTitle("6. Editable ")
                .setEditable(true)
                .setValue("")
            );
            
            host.block1.append((new xui.UI.Poll)
                .setHost(host,"poll03")
                .setItems([{"id":"a", "caption":"option 1", "message":"1", "percent":"0.1"}, {"id":"b", "caption":"option 2", "message":"90%", "percent":"0.9"}])
                .setLeft(null)
                .setTop(null)
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                .setTitle("3. single select + new option")
                .setNewOption("new option")
                .setValue("")
            );
            
            host.block1.append((new xui.UI.Poll)
                .setHost(host,"poll01")
                .setItems([{"id":"a", "caption":"option 1", "message":"1", "percent":"0.1"}, {"id":"b", "caption":"option 2", "message":"90%", "percent":"0.9"}])
                .setLeft(null)
                .setTop(null)
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                .setTitle("1. single select ")
                .setToggle(true)
                .setValue("")
                .setCustomFunction({"formatCaption":function (s) {
                return s + "-";
            }})
            );
            
            host.block1.append((new xui.UI.Poll)
                .setHost(host,"poll04")
                .setItems([{"id":"a", "caption":"option 1", "message":"2", "percent":"0"}, {"id":"b", "caption":"option 2", "message":"100%", "percent":"1"}])
                .setLeft(null)
                .setTop(null)
                .setWidth("auto")
                .setHeight("auto")
                .setTabindex(3)
                .setPosition("relative")
                .setSelMode("multi")
                .setTitle("4. multi select + new option")
                .setCmds([{"id":"cast", "caption":"cast"}, {"id":"refuse", "caption":"refuse"}])
                .setNewOption("new option")
                .setValue("")
                .onClickButton("_poll04_oncommand")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _poll04_oncommand:function (profile, key, src) {
            xui.message(key+' was clicked!')
        }
    }
});