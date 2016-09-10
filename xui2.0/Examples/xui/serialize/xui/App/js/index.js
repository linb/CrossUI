Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Group)
                .setHost(host,"Group1")
                .setLeft(16)
                .setTop(16)
                .setWidth(776)
                .setHeight(184)
                .setCaption("(un)serialize 1")
            );
            
            host.Group1.append((new xui.UI.Button)
                .setHost(host,"Button11")
                .setLeft(200)
                .setTop(60)
                .setWidth(48)
                .setCaption(">>")
                .onClick("_button1_onclick")
            );
            
            host.Group1.append((new xui.UI.Block)
                .setHost(host,"Block12")
                .setLeft(616)
                .setTop(32)
                .setWidth(152)
                .setHeight(96)
            );
            
            host.Group1.append((new xui.UI.Block)
                .setHost(host,"Block11")
                .setLeft(8)
                .setTop(32)
                .setWidth(152)
                .setHeight(96)
            );
            
            host.Block11.append((new xui.UI.Button)
                .setHost(host,"Button1")
                .setLeft(16)
                .setTop(32)
                .setCaption("Button")
            );
            
            host.Group1.append((new xui.UI.Input)
                .setHost(host,"Input1")
                .setLeft(290)
                .setTop(8)
                .setWidth(208)
                .setHeight(144)
                .setMultiLines(true)
            );
            
            host.Group1.append((new xui.UI.Button)
                .setHost(host,"Button12")
                .setLeft(528)
                .setTop(64)
                .setWidth(48)
                .setCaption(">>")
                .onClick("_button12_onclick")
            );
            
            append((new xui.UI.Group)
                .setHost(host,"Group2")
                .setLeft(16)
                .setTop(216)
                .setWidth(776)
                .setHeight(184)
                .setCaption("(un)serialize 2")
            );
            
            host.Group2.append((new xui.UI.Input)
                .setHost(host,"Input2")
                .setLeft(288)
                .setTop(8)
                .setWidth(208)
                .setHeight(144)
                .setMultiLines(true)
            );
            
            host.Group2.append((new xui.UI.Block)
                .setHost(host,"Block22")
                .setLeft(616)
                .setTop(32)
                .setWidth(152)
                .setHeight(96)
            );
            
            host.Group2.append((new xui.UI.Button)
                .setHost(host,"Button21")
                .setLeft(192)
                .setTop(64)
                .setWidth(64)
                .setCaption(">>")
                .onClick("_button21_onclick")
            );
            
            host.Group2.append((new xui.UI.Block)
                .setHost(host,"Block21")
                .setLeft(8)
                .setTop(32)
                .setWidth(152)
                .setHeight(96)
            );
            
            host.Block21.append((new xui.UI.Group)
                .setHost(host,"Group7")
                .setLeft(0)
                .setTop(0)
                .setWidth(144)
                .setHeight(88)
                .setCaption("Group7")
            );
            
            host.Group7.append((new xui.UI.Button)
                .setHost(host,"Button14")
                .setLeft(8)
                .setTop(16)
                .setCaption("Button14")
            );
            
            host.Group2.append((new xui.UI.Button)
                .setHost(host,"Button22")
                .setLeft(520)
                .setTop(64)
                .setWidth(64)
                .setCaption(">>")
                .onClick("_button22_onclick")
            );
            
            append((new xui.UI.Group)
                .setHost(host,"Group3")
                .setLeft(16)
                .setTop(408)
                .setWidth(776)
                .setHeight(184)
                .setCaption("(un)serialize 3")
            );
            
            host.Group3.append((new xui.UI.Input)
                .setHost(host,"Input3")
                .setLeft(288)
                .setTop(8)
                .setWidth(208)
                .setHeight(144)
                .setMultiLines(true)
            );
            
            host.Group3.append((new xui.UI.Block)
                .setHost(host,"Block32")
                .setLeft(616)
                .setTop(32)
                .setWidth(152)
                .setHeight(96)
            );
            
            host.Group3.append((new xui.UI.Button)
                .setHost(host,"Button31")
                .setLeft(192)
                .setTop(64)
                .setWidth(64)
                .setCaption(">>")
                .onClick("_button31_onclick")
            );
            
            host.Group3.append((new xui.UI.Block)
                .setHost(host,"Block31")
                .setLeft(8)
                .setTop(32)
                .setWidth(152)
                .setHeight(96)
            );
            
            host.Block31.append((new xui.UI.Tabs)
                .setHost(host,"Tabs1")
                .setLeft(0)
                .setTop(0)
                .setItems([{"id":"view1", "caption":"view1", "_w":144, "_h":88}, {"id":"view2", "caption":"view2"}])
                .setValue("view1")
            );
            
            host.Tabs1.append((new xui.UI.Button)
                .setHost(host,"button1")
                .setLeft(17)
                .setTop(17)
                .setCaption("button1")
            , 'view1');
            
            host.Tabs1.append((new xui.UI.Button)
                .setHost(host,"button2")
                .setLeft(17)
                .setTop(17)
                .setCaption("button2")
            , 'view2');
            
            host.Group3.append((new xui.UI.Button)
                .setHost(host,"Button32")
                .setLeft(520)
                .setTop(64)
                .setWidth(64)
                .setCaption(">>")
                .onClick("_button32_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _button1_onclick:function (profile, e, value) {
            this.Input1.setValue(xui.Coder.formatText(xui.serialize(this.Button1)),true)
        }, 
        _button12_onclick:function (profile, e, value) {
            this.Block12.removeChildren(null,true);
            this.Block12.append(
                xui.unserialize(this.Input1.getUIValue())
            );
        }, 
        _button21_onclick:function (profile, e, value) {
            this.Input2.setValue(xui.Coder.formatText(xui.serialize(this.Group7)),true)
        }, 
        _button31_onclick:function (profile, e, value) {
            this.Input3.setValue(xui.Coder.formatText(xui.serialize(this.Tabs1)),true)
        }, 
        _button22_onclick:function (profile, e, value) {
            this.Block22.removeChildren(null,true);
            this.Block22.append(
                xui.unserialize(this.Input2.getUIValue())
            );
        }, 
        _button32_onclick:function (profile, e, value) {
            this.Block32.removeChildren(null,true);
            this.Block32.append( 
                xui.unserialize(this.Input3.getUIValue())
            );
        }, 
        _onready:function () {
            SPA=this;
        }, 
        events:{"onReady":"_onready"}
    }
});