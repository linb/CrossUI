Class('App.xui_UI_List', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.List)
                .setHost(host,"list2")
                .setItems([{"id":"item a", "caption":"item a", "tips":"item a"}, {"id":"item b1", "caption":"item b1", "tips":"item b1"}, {"id":"item b2", "caption":"item b2", "tips":"item b2"}, {"id":"item b3", "caption":"item b3", "tips":"item b3"}])
                .setDisabled(true)
                .setLeft(30)
                .setTop(240)
                .setHeight(100)
                .onItemSelected("_list5_onitemselected")
            );
            
            append(
                (new xui.UI.Div)
                .setHost(host,"div36")
                .setLeft(30)
                .setTop(50)
                .setWidth(120)
                .setHeight(20)
                .setHtml("select mode : single")
            );
            
            append(
                (new xui.UI.Div)
                .setHost(host,"div37")
                .setLeft(200)
                .setTop(50)
                .setWidth(120)
                .setHeight(20)
                .setHtml("select mode : multi")
            );
            
            append(
                (new xui.UI.Div)
                .setHost(host,"div38")
                .setLeft(30)
                .setTop(210)
                .setWidth(100)
                .setHeight(20)
                .setHtml("disabled")
            );
            
            append(
                (new xui.UI.List)
                .setHost(host,"list3")
                .setItems([{"id":"item a", "caption":"<b>long</b> long long item a", "tips":"item a"}, {"id":"item b", "caption":"<span style='color:red'>long</span> long long item b", "tips":"item b"}, {"id":"item c", "caption":"<span style='font-size:20px'>long</span> long long item c", "tips":"item c"}])
                .setLeft(200)
                .setTop(240)
                .setHeight(100)
                .onItemSelected("_list5_onitemselected")
            );
            
            append(
                (new xui.UI.List)
                .setHost(host,"list1")
                .setItems([{"id":"item a", "caption":"item a", "image":"img/demo.gif"}, {"id":"item b", "caption":"item b", "image":"img/demo.gif"}, {"id":"item c", "caption":"item c", "image":"img/demo.gif"}])
                .setLeft(200)
                .setTop(80)
                .setHeight(100)
                .setSelMode("multi")
                .setValue("")
                .onItemSelected("_list5_onitemselected")
            );
            
            append(
                (new xui.UI.List)
                .setHost(host,"list4")
                .setItems([{"id":"item a", "caption":"item a", "image":"img/demo.gif"}, {"id":"item b", "caption":"item b", "image":"img/demo.gif"}, {"id":"item c", "caption":"item c", "image":"img/demo.gif"}])
                .setLeft(30)
                .setTop(80)
                .setHeight(100)
                .setMaxHeight("200")
                .onItemSelected("_list5_onitemselected")
            );
            
            append(
                (new xui.UI.Div)
                .setHost(host,"div39")
                .setLeft(200)
                .setTop(210)
                .setWidth(100)
                .setHeight(20)
                .setHtml("custom item")
            );
            
            append(
                (new xui.UI.Div)
                .setHost(host,"div27")
                .setLeft(380)
                .setTop(210)
                .setWidth(100)
                .setHeight(20)
                .setHtml("Use listKey")
            );
            
            append(
                (new xui.UI.List)
                .setHost(host,"list7")
                .setListKey("testkey")
                .setLeft(380)
                .setTop(240)
                .setHeight(100)
                .setMaxHeight("200")
                .onItemSelected("_list5_onitemselected")
            );
            
            append(
                (new xui.UI.Div)
                .setHost(host,"div46")
                .setLeft(380)
                .setTop(50)
                .setWidth(170)
                .setHeight(20)
                .setHtml("select mode : none")
            );
            
            append(
                (new xui.UI.List)
                .setHost(host,"list23")
                .setItems([{"id":"item a", "caption":"item a", "image":"img/demo.gif"}, {"id":"item b", "caption":"item b", "image":"img/demo.gif"}, {"id":"item c", "caption":"item c", "image":"img/demo.gif"}])
                .setLeft(380)
                .setTop(80)
                .setHeight(100)
                .setSelMode("none")
                .onItemSelected("_list23_onitemselected")
            );
            
            append(
                (new xui.UI.List)
                .setHost(host,"ctl_list1")
                .setItems([
                    {"imageClass":"xui-icon-loading", "caption":"xui-icon-loading", "id":"aq"}, 
                {"imageClass":"xui-uicmd-none", "caption":"xui-uicmd-none", "id":"ar"}, 
                {"imageClass":"xui-uicmd-empty", "caption":"xui-uicmd-empty", "id":"as"}, 
                {"imageClass":"xui-uicmd-opt", "caption":"xui-uicmd-opt", "id":"at"}, 
                {"imageClass":"xui-uicmd-pop", "caption":"xui-uicmd-pop", "id":"au"}, 
                {"imageClass":"xui-uicmd-land", "caption":"xui-uicmd-land", "id":"av"}, 
                {"imageClass":"xui-uicmd-refresh", "caption":"xui-uicmd-refresh", "id":"aw"}, 
                {"imageClass":"xui-uicmd-toggle", "caption":"xui-uicmd-toggle", "id":"ax"}, 
                {"imageClass":"xui-uicmd-toggle2", "caption":"xui-uicmd-toggle2", "id":"ay"}, 
                {"imageClass":"xui-uicmd-min", "caption":"xui-uicmd-min", "id":"az"}, 
                {"imageClass":"xui-uicmd-max", "caption":"xui-uicmd-max", "id":"ca"}, 
                {"imageClass":"xui-uicmd-restore", "caption":"xui-uicmd-restore", "id":"cb"}, 
                {"imageClass":"xui-uicmd-pin", "caption":"xui-uicmd-pin", "id":"cc"}, 
                {"imageClass":"xui-uicmd-check", "caption":"xui-uicmd-check", "id":"cd"}, 
                {"imageClass":"xui-uicmd-radio", "caption":"xui-uicmd-radio", "id":"ce"}, 
                {"imageClass":"xui-uicmd-add", "caption":"xui-uicmd-add", "id":"cf"}, 
                {"imageClass":"xui-uicmd-remove", "caption":"xui-uicmd-remove", "id":"cg"}
                
            ])
                .setLeft(560)
                .setTop(80)
                .setWidth(200)
                .setHeight(260)
                .setValue("a")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _list5_onitemselected:function (profile, item, src) {
            xui.message('You selected "' + profile.boxing().getUIValue()  +'"');
            return false;
        },
        _list23_onitemselected:function (profile, item, src) {
            xui.message('You selected "' + item.id +'"');
            return false;
        },
        _onCreated:function () {
            xui.UI.cacheData('testkey',['in listkey 1', 'in listkey 2'])
        },
        events:{"onCreated":"_onCreated"}
    }
});