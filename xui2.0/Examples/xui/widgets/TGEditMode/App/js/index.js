Class('App', 'xui.Module',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel3")
                .setDock("none")
                .setLeft("0.833333em")
                .setTop("0.833333em")
                .setWidth("65em")
                .setHeight("22.5em")
                .setZIndex(1)
                .setCaption("TreeGrid Edit Mode")
            );
            
            host.xui_ui_panel3.append(
                xui.create("xui.UI.TreeGrid")
                .setHost(host,"xui_ui_treegrid3")
                .setLeft("0em")
                .setTop("0em")
                .setRowNumbered(true)
                .setEditable(true)
                .setGridHandlerCaption("Edit Mode")
                .setRowHandlerWidth("10em")
                .setHeader([{
                    "id":"col1",
                    "caption":"input",
                    "width":"0.08333333333333333em",
                    "flexSize":true,
                    "type":"input"
                },
                {
                    "id":"col2",
                    "caption":"combobox",
                    "width":"0.08333333333333333em",
                    "flexSize":true,
                    "type":"combobox",
                    "editorListItems":[{
                        "id":"a",
                        "caption":"item a"
                    },
                    {
                        "id":"b",
                        "caption":"item b"
                    }]
                },
                {
                    "id":"col3",
                    "caption":"listbox",
                    "width":"0.08333333333333333em",
                    "flexSize":true,
                    "type":"listbox",
                    "editorListItems":[{
                        "id":"a",
                        "caption":"item a"
                    },
                    {
                        "id":"b",
                        "caption":"item b"
                    }]
                },
                {
                    "id":"col4",
                    "caption":"color",
                    "width":"0.08333333333333333em",
                    "flexSize":true,
                    "type":"color"
                }])
                .setRows([{
                    "caption":"focus mode",
                    "editMode":"focus",
                    "cells":[{
                        "value":""
                    },
                    {
                        "value":"item a"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"#FFF1FC"
                    }]
                },
                {
                    "caption":"sharp mode",
                    "editMode":"sharp",
                    "cells":[{
                        "value":""
                    },
                    {
                        "value":"item a"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"#FFF2FC"
                    }]
                },
                {
                    "caption":"hover mode",
                    "editMode":"hover",
                    "cells":[{
                        "value":""
                    },
                    {
                        "value":"item a"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"#FFF3FC"
                    }]
                },
                {
                    "caption":"inline mode",
                    "editMode":"inline",
                    "iniFold":false,
                    "cells":[{
                        "value":""
                    },
                    {
                        "value":"item a"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"#FFF4FC"
                    }]
                }])
                );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        }
    }
});