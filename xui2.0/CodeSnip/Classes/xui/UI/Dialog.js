xui.Class('App.xui_UI_Dialog', 'xui.Module',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Block)
                .setHost(host,"Block2")
                .setDock("top")
                .setHeight(32)
                .setBorderType("none")
            );
            
            host.Block2.append(
                (new xui.UI.Div)
                .setHost(host,"Div3")
                .setLeft(16)
                .setTop(5)
                .setWidth(96)
                .setHeight(24)
                .setHtml("<b>Dialog demo</b>")
            );
            
            append(
                (new xui.UI.Layout)
                .setHost(host,"layout1")
                .setItems([{"id":"before", "pos":"before", "locked":false, "size":200, "min":50, "max":400, "cmd":true, "folded":false, "hidden":false}, {"id":"main", "min":10}])
                .setType("horizontal")
            );
            
            host.layout1.append(
                (new xui.UI.Dialog)
                .setHost(host,"Dialog1")
                .setLeft(80)
                .setTop(70)
                .setWidth(408)
                .setHeight(264)
                .setCaption("Dialog")
            , 'main');
            
            host.Dialog1.append(
                (new xui.UI.Tabs)
                .setHost(host,"Tabs1")
                .setItems([{"id":"view1", "caption":"view1"}, {"id":"view2", "caption":"view2"}, {"id":"view3", "caption":"view3"}, {"id":"view4", "caption":"view4"}])
                .setValue("view2")
            );
            
            host.Tabs1.append(
                (new xui.UI.Group)
                .setHost(host,"Group1")
                .setLeft(33)
                .setTop(25)
                .setWidth(336)
                .setHeight(160)
                .setCaption("Group1")
            , 'view1');
            
            host.Group1.append(
                (new xui.UI.Button)
                .setHost(host,"Button16")
                .setLeft(96)
                .setTop(56)
                .setCaption("Close me")
                .onClick("_button16_onclick")
            );
            
            host.layout1.append(
                (new xui.UI.Stacks)
                .setHost(host,"Stacks1")
                .setItems([{"id":"view1", "caption":"alert"}, {"id":"view2", "caption":"MDI"}, {"id":"view3", "caption":"others"}])
                .setValue("view1")
            , 'before');
            
            host.Stacks1.append(
                (new xui.UI.Button)
                .setHost(host,"Button8")
                .setLeft(40)
                .setTop(16)
                .setCaption("New window")
                .onClick("_button8_onclick")
            , 'view2');
            
            host.Stacks1.append(
                (new xui.UI.Button)
                .setHost(host,"Button3")
                .setLeft(40)
                .setTop(56)
                .setCaption("Modal")
                .onClick("_button3_onclick")
            , 'view2');
            
            host.Stacks1.append(
                (new xui.UI.Button)
                .setHost(host,"Button2")
                .setLeft(24)
                .setTop(56)
                .setCaption("confirm")
                .onClick("_button2_onclick")
            , 'view1');
            
            host.Stacks1.append(
                (new xui.UI.Button)
                .setHost(host,"Button1")
                .setLeft(24)
                .setTop(16)
                .setCaption("alert")
                .onClick("_button1_onclick")
            , 'view1');
            
            host.Stacks1.append(
                (new xui.UI.Button)
                .setHost(host,"Button7")
                .setLeft(24)
                .setTop(96)
                .setCaption("pop")
                .onClick("_button7_onclick")
            , 'view1');
            
            host.Stacks1.append(
                (new xui.UI.Button)
                .setHost(host,"Button4")
                .setLeft(40)
                .setTop(16)
                .setCaption("min")
                .onClick("_button4_onclick")
            , 'view3');
            
            host.Stacks1.append(
                (new xui.UI.Button)
                .setHost(host,"Button5")
                .setLeft(40)
                .setTop(56)
                .setCaption("max")
                .onClick("_button5_onclick")
            , 'view3');
            
            host.Stacks1.append(
                (new xui.UI.Button)
                .setHost(host,"Button6")
                .setLeft(40)
                .setTop(96)
                .setCaption("no max button")
                .onClick("_button6_onclick")
            , 'view3');
            
            host.Stacks1.append(
                (new xui.UI.Button)
                .setHost(host,"Button9")
                .setLeft(40)
                .setTop(136)
                .setCaption("no min button")
                .onClick("_button9_onclick")
            , 'view3');
            
            host.Stacks1.append(
                (new xui.UI.Button)
                .setHost(host,"Button10")
                .setLeft(40)
                .setTop(176)
                .setCaption("with pin button")
                .onClick("_button10_onclick")
            , 'view3');
            
            host.Stacks1.append(
                (new xui.UI.Button)
                .setHost(host,"Button11")
                .setLeft(40)
                .setTop(216)
                .setCaption("can't move")
                .onClick("_button11_onclick")
            , 'view3');
            
            host.Stacks1.append(
                (new xui.UI.Button)
                .setHost(host,"Button12")
                .setLeft(40)
                .setTop(256)
                .setCaption("can't resize")
                .onClick("_button12_onclick")
            , 'view3');
            
            host.Stacks1.append(
                (new xui.UI.Button)
                .setHost(host,"Button13")
                .setLeft(40)
                .setTop(296)
                .setCaption("No shadow")
                .onClick("_button13_onclick")
            , 'view3');
            
            host.Stacks1.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_sbutton1")
                .setLeft(40)
                .setTop(340)
                .setWidth(120)
                .setCaption("ifarme autoload")
                .onClick("_ctl_sbutton1_onclick")
            , 'view3');
            
            host.Stacks1.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_sbutton2")
                .setLeft(40)
                .setTop(380)
                .setWidth(120)
                .setCaption("ajax autoload")
                .onClick("_ctl_sbutton2_onclick")
            , 'view3');
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _button1_onclick:function (profile, e, value) {
            xui.UI.Dialog.alert('alert','this is an alert message!');
        }, 
        _button2_onclick:function (profile, e, value) {
            xui.UI.Dialog.confirm('confirm','this is an confirm message!');
        }, 
        _button7_onclick:function (profile, e, value) {
            xui.UI.Dialog.pop('pop','this is an pop message!');
        }, 
        _button8_onclick:function (profile, e, value) {
            var rnd = 100 + Math.random()*200, parent=this.layout1.getPanel('main');
            new xui.UI.Dialog({caption:'dialog demo', width:rnd, height:rnd, left:rnd, top:rnd ,
                fromRegion:profile.getRoot().cssRegion(true)})
            .show()
        }, 
        _button3_onclick:function (profile, e, value) {
            var rnd = 100 + Math.random()*200;
            new xui.UI.Dialog({caption:'Modal',left:rnd, top:rnd, width:200, height:300}).showModal()
        }, 
        _button4_onclick:function (profile, e, value) {
            new xui.UI.Dialog({status:'min',resizer:false}).show(this.layout1.getPanel('main'))
        }, 
        _button5_onclick:function (profile, e, value) {
            new xui.UI.Dialog({status:'max'}).show(this.layout1.getPanel('main'))
        }, 
        _button6_onclick:function (profile, e, value) {
            new xui.UI.Dialog({maxBtn:false}).show(this.layout1.getPanel('main'))
        }, 
        _button9_onclick:function (profile, e, value) {
            new xui.UI.Dialog({minBtn:false}).show(this.layout1.getPanel('main'))
        }, 
        _button10_onclick:function (profile, e, value) {
            new xui.UI.Dialog({pinBtn:true}).show(this.layout1.getPanel('main'))
        }, 
        _button11_onclick:function (profile, e, value) {
            new xui.UI.Dialog({movable:false}).show(this.layout1.getPanel('main'))
        }, 
        _button12_onclick:function (profile, e, value) {
            new xui.UI.Dialog({resizer:false}).show(this.layout1.getPanel('main'))
        }, 
        _button13_onclick:function (profile, e, value) {
            new xui.UI.Dialog({shadow:false}).show(this.layout1.getPanel('main'))
        }, 
        _button16_onclick:function (profile, e, value) {
            this.Dialog1.destroy();
        },
        _ctl_sbutton2_onclick : function (profile, e, src, value) {
            new xui.UI.Dialog({ajaxAutoLoad:"files/block.html"}).show(this.layout1.getPanel('main'))
        },
        _ctl_sbutton1_onclick : function (profile, e, src, value) {
            new xui.UI.Dialog({iframeAutoLoad:"http://www.crossui.com"}).show(this.layout1.getPanel('main'))
        }
    }
});