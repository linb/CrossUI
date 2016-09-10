Class('App', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Panel)
                .setHost(host,"ctl_panel4")
                .setDock("none")
                .setLeft(50)
                .setTop(70)
                .setWidth(210)
                .setHeight(430)
                .setZIndex(1)
                .setCaption("JSON Webservices")
            );
            
            host.ctl_panel4.append(
                (new xui.UI.List)
                .setHost(host,"ctl_list")
                .setDirtyMark(false)
                .setDock("fill")
                .setBorderType("none")
                .onItemSelected("_ctl_list5_onitemselected")
            );
            
            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group1")
                .setLeft(280)
                .setTop(120)
                .setWidth(430)
                .setHeight(96)
                .setCaption("Example Request Object")
                .setToggleBtn(false)
            );
            
            host.ctl_group1.append(
                (new xui.UI.Input)
                .setHost(host,"ctl_request")
                .setDirtyMark(false)
                .setLeft(10)
                .setTop(0)
                .setWidth(410)
                .setHeight(70)
                .setLabelCaption("")
                .setMultiLines(true)
            );
            
            append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_do")
                .setDisabled(true)
                .setLeft(330)
                .setTop(230)
                .setWidth(340)
                .setCaption("Invoke")
                .onClick("_ctl_do_onclick")
            );
            
            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group2")
                .setLeft(280)
                .setTop(260)
                .setWidth(430)
                .setHeight(240)
                .setCaption("Response Object")
                .setToggleBtn(false)
            );
            
            host.ctl_group2.append(
                (new xui.UI.Input)
                .setHost(host,"ctl_response")
                .setDirtyMark(false)
                .setLeft(10)
                .setTop(0)
                .setWidth(410)
                .setHeight(210)
                .setLabelCaption("")
                .setMultiLines(true)
            );
            
            append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel10")
                .setLeft(280)
                .setTop(84)
                .setWidth(54)
                .setCaption("WS URL")
            );
            
            append(
                (new xui.UI.Input)
                .setHost(host,"ctl_url")
                .setReadonly(true)
                .setLeft(350)
                .setTop(80)
                .setWidth(350)
                .setLabelCaption("")
            );
            
            append(
                (new xui.UI.Block)
                .setHost(host,"ctl_block6")
                .setLeft(50)
                .setTop(30)
                .setWidth(660)
                .setHeight(30)
                .setBorderType("ridge")
            );
            
            host.ctl_block6.append(
                (new xui.UI.Label)
                .setHost(host,"ctl_slabel7")
                .setLeft(181)
                .setTop(6)
                .setWidth(261)
                .setCaption("CrossUI JSON Webservice Client")
                .setFontSize("14px")
                .setFontWeight("bold")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _com_onready : function (com, threadid) {
            var ns=this;
            var items=xui.copy(examplesSetting);
            items.push({id:"custom"});
            ns.ctl_list.setItems(items);
        },
        events : {"onReady":"_com_onready"},
        _ctl_list5_onitemselected : function (profile, item, e, src, type) {
            var ns = this;

            ns.ctl_url.setReadonly(item.id!="custom");
            
            ns.ctl_url.setValue(item.url || "http://");
            ns.ctl_request.setValue(item.args ? xui.stringify(item.args) : "");
            ns.ctl_do.setDisabled(false);
            
            ns.ctl_response.setValue("");
        },
        _ctl_do_onclick : function (profile, e, src, value) {
            var ns = this,
                uri = ns.ctl_url.getValue(),
                args = xui.unserialize(ns.ctl_request.getValue());
            if(uri && args){
                ns.ctl_response.setValue("Asynchronous calling...");
                xui.Thread.observableRun(function(threadid){
                    xui.request(uri, args, function(rsp){
                        ns.ctl_response.setValue(xui.Coder.formatText(xui.stringify(rsp)));
                    }, function(msg){
                        ns.ctl_response.setValue(msg);
                    }, threadid);
                });
            }
        }
    }
});