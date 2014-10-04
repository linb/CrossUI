Class('App.xui_UI_Tabs', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Tabs)
                .setHost(host,"Tabs1")
                .setItems([{"id":"view1", "caption":"view1", "image":"img/demo.gif"}, {"id":"view2", "caption":"view2"}, {"id":"view3", "caption":"view3", "closeBtn":true}, {"id":"view4", "caption":"view4", "closeBtn":true, "popBtn":true, "optBtn":true}, {"id":"view5", "caption":"view5", "closeBtn":true, "landBtn":true, "optBtn":true}, {"id":"view6", "caption":"view6", "closeBtn":true}, {"id":"view7", "caption":"view7", "closeBtn":true, "landBtn":true, "optBtn":true}, {"id":"view8", "caption":"view8", "closeBtn":true}, {"id":"view9", "caption":"view9", "closeBtn":true}, {"id":"view10", "caption":"view10", "closeBtn":true}, {"id":"view11", "caption":"view11", "closeBtn":true}])
                .setValue("view1")
                .beforePageClose("_tabs1_beforepageclose")
                .onShowOptions("_tabs1_onshowoptions")
            );
            
            host.Tabs1.append(
                (new xui.UI.Tabs)
                .setHost(host,"tabTest1")
                .setItems([{"id":"a", "caption":"html", "html":"<strong>I'm html string</strong>"}, {"id":"b", "caption":"src", "iframeAutoLoad":"http://www.crossui.com"}, {"id":"c", "caption":"autoLoad", "ajaxAutoLoad":"files/block.html"}])
                .setDock("none")
                .setLeft(30)
                .setTop(20)
                .setWidth(410)
                .setHeight(170)
                .setHAlign("right")
                .setValue("b")
            , 'view1');
            
            host.Tabs1.append(
                (new xui.UI.Button)
                .setHost(host,"button34")
                .setLeft(240)
                .setTop(220)
                .setCaption("select the first tab")
                .onClick("_button34_onclick")
            , 'view1');
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _tabs1_beforepageclose:function (profile, item, src) {
            if(item.id=='view9'){
                xui.message('You cant close me!');
                return false;
            }
        }, 
        _button34_onclick:function (profile, e, src, value) {
            this.tabTest1.setValue('a',true);
        }, 
        _tabs1_onshowoptions:function (profile, item, e, src) {
            xui.message('onShowOptions : ' +item.id);
        }
    }
});