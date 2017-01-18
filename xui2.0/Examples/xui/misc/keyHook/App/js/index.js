xui.Class('App', 'xui.Module',{
    Instance:{
        _input3_onhotkey:function (profile, kb, e) {
            this.treegrid2.insertRows([{id:xui.id(), cells:[
                e.type, e.keyCode,  e.charCode, kb.key, kb.ctrlKey, kb.shiftKey, kb.altKey
            ]}],'','',true);
        },
        _input3_onhotkey2:function (profile, kb, e) {
            this.treegrid2.insertRows([{id:xui.id(), cells:[
                e.type, e.keyCode,  e.charCode, kb.key, kb.ctrlKey, kb.shiftKey, kb.altKey
            ]}],'','',true);
        },
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new xui.UI.Button)
                .setHost(host,"button5")
                .setLeft(460)
                .setTop(460)
                .setCaption("Clear output")
                .onClick("_button5_onclick")
            );

            append((new xui.UI.Div)
                .setHost(host,"div9")
                .setLeft(100)
                .setTop(42)
                .setWidth(162)
                .setHeight(20)
                .setHtml("Type something in the Input:")
            );

            append((new xui.UI.Pane)
                .setHost(host,"panel3")
                .setLeft(90)
                .setTop(110)
                .setWidth(638)
                .setHeight(330)
                .setCustomStyle({"KEY":"border:solid 1px"})
            );

            host.panel3.append((new xui.UI.TreeGrid)
                .setHost(host,"treegrid2")
                .setColResizer(false)
                .setRowResizer(false)
                .setColSortable(false)
                .setRowHandler(false)
                .setHeader([{"id":"type", "caption":"type", "type":"label", "width":90}, {"id":"kcode", "caption":"keyCode", "type":"label", "width":80}, {"id":"ccode", "caption":"charCode", "type":"label", "width":80}, {"id":"key", "caption":"key", "type":"label", "width":80}, {"id":"contrl", "caption":"contrl", "type":"checkbox", "width":80}, {"id":"shift", "caption":"shift", "type":"checkbox", "width":80}, {"id":"alt", "caption":"alt", "type":"checkbox", "width":80}])
            );

            append((new xui.UI.Input)
                .setHost(host,"input3")
                .setLeft(270)
                .setTop(40)
                .onHotKeydown("_input3_onhotkey")
                .onHotKeypress("_input3_onhotkey")
                .onHotKeyup("_input3_onhotkey")
            );

            append((new xui.UI.Input)
                .setHost(host,"input2")
                .setLeft(440)
                .setTop(10)
                .setHeight(90)
                .setMultiLines(true)
                .onHotKeydown("_input3_onhotkey")
                .onHotKeypress("_input3_onhotkey2")
                .onHotKeyup("_input3_onhotkey")
            );

            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _button5_onclick:function (profile, e, value) {
            this.treegrid2.removeAllRows();
        }
    }
});