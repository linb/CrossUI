xui.Class('App', 'xui.Module',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Dialog")
                .setHost(host,"xui_ui_dialog1")
                .setLeft("6.66667em")
                .setTop("1.66667em")
                .setWidth("44.8333em")
                .setHeight("24.666700000000002em")
                .setCaption("Column Flex Width")
            );
            
            host.xui_ui_dialog1.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block3")
                .setDock("fill")
                .setBorderType("inset")
                );
            
            host.xui_ui_block3.append(
                xui.create("xui.UI.TreeGrid")
                .setHost(host,"xui_ui_treegrid2")
                .setLeft("0em")
                .setTop("0em")
                .setEditable(true)
                .setRowHandler(false)
                .setHeader([{
                    "id":"label",
                    "caption":"Fixed",
                    "width":"8em",
                    "type":"label"
                },
                {
                    "id":"input",
                    "caption":"Flex: 30%",
                    "width":"8em",
                    "flexSize":true,
                    "type":"input"
                },
                {
                    "id":"combobox",
                    "caption":"Flex: 40%",
                    "width":"8em",
                    "flexSize":true,
                    "type":"combobox"
                },
                {
                    "id":"listbox",
                    "caption":"Flex: 30%",
                    "width":"8em",
                    "flexSize":true,
                    "type":"listbox"
                }])
                .setRows([{
                    "cells":[{
                        "value":"",
                        "dirty":true
                    },
                    {
                        "value":"",
                        "dirty":true
                    },
                    {
                        "value":""
                    },
                    {
                        "value":""
                    },
                    {
                        "value":""
                    },
                    {
                        "value":""
                    },
                    {
                        "value":""
                    },
                    {
                        "value":new Date(2016,9,23,9,38,40,868)
                    },
                    {
                        "value":"00:00"
                    },
                    {
                        "value":new Date(2016,9,23,9,38,40,868)
                    },
                    {
                        "value":"#FFFFFF"
                    },
                    {
                        "value":12
                    },
                    {
                        "value":12
                    },
                    {
                        "value":23.44
                    },
                    {
                        "value":43.23
                    }]
                }])
                );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        }
    }
});