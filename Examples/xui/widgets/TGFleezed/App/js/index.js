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
                .setWidth("40em")
                .setHeight("24.5em")
                .setCaption("Fleezed Columns and Rows")
            );
            
            host.xui_ui_dialog1.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block3")
                .setDock("fill")
                .setBorderType("inset")
                );
            
            host.xui_ui_block3.append(
                xui.create("xui.UI.TreeGrid")
                .setHost(host,"xui_ui_treegrid7")
                .setLeft("0em")
                .setTop("0em")
                .setAltRowsBg(true)
                .setRowHandler(false)
                .setRowResizer(true)
                .setColHidable(true)
                .setColMovable(true)
                .setHeader([{
                    "id":"col1",
                    "caption":"col1",
                    "width":"8em",
                    "type":"input"
                },
                {
                    "id":"col2",
                    "caption":"col2",
                    "width":"8em",
                    "type":"input"
                },
                {
                    "id":"col3",
                    "caption":"col3",
                    "width":"8em",
                    "type":"input"
                },
                {
                    "id":"col4",
                    "caption":"col4",
                    "width":"8em",
                    "type":"input"
                },
                {
                    "id":"col5",
                    "caption":"col5",
                    "width":"8em",
                    "flexSize":false,
                    "type":"input"
                }])
                .setRows([{
                    "cells":[{
                        "value":"row1 col1"
                    },
                    {
                        "value":"row1 col2"
                    },
                    {
                        "value":"row1 col3"
                    },
                    {
                        "value":"row1 col4"
                    },
                    {
                        "value":""
                    }]
                },
                {
                    "cells":[{
                        "value":"row2 col1"
                    },
                    {
                        "value":"row2 col2"
                    },
                    {
                        "value":"row2 col3"
                    },
                    {
                        "value":"row2 col4"
                    },
                    {
                        "value":""
                    }]
                },
                {
                    "cells":[{
                        "value":"row3 col1"
                    },
                    {
                        "value":"row3 col2"
                    },
                    {
                        "value":"row3 col3"
                    },
                    {
                        "value":"row3 col4"
                    },
                    {
                        "value":""
                    }],
                    "sub":[{
                        "cells":[{
                            "value":"sub31"
                        },
                        {
                            "value":"sub32"
                        },
                        {
                            "value":"sub33"
                        },
                        {
                            "value":"sub34"
                        }]
                    }]
                },
                {
                    "iniFold":false,
                    "cells":[{
                        "value":"row4 col1"
                    },
                    {
                        "value":"row4 col2"
                    },
                    {
                        "value":"row4 col3"
                    },
                    {
                        "value":"row4 col4"
                    },
                    {
                        "value":""
                    }],
                    "sub":[{
                        "cells":[{
                            "value":"sub41"
                        },
                        {
                            "value":"sub42"
                        },
                        {
                            "value":"sub43"
                        },
                        {
                            "value":"sub44"
                        },
                        {
                            "value":""
                        }]
                    }]
                },
                {
                    "id":"a",
                    "cells":[{
                        "value":"row5 col1",
                        "dirty":true
                    },
                    {
                        "value":"row5 col2",
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
                    }]
                },
                {
                    "id":"b",
                    "cells":[{
                        "value":"row6 col1",
                        "dirty":true
                    },
                    {
                        "value":"row6 col2",
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
                    }]
                },
                {
                    "id":"c",
                    "cells":[{
                        "value":"row7 col1",
                        "dirty":true
                    },
                    {
                        "value":"row7 col2",
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
                    }]
                },
                {
                    "id":"d",
                    "cells":[{
                        "value":"row8 col1",
                        "dirty":true
                    },
                    {
                        "value":"row8 col2",
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
                    }]
                },
                {
                    "id":"e",
                    "cells":[{
                        "value":"row9 col1",
                        "dirty":true
                    },
                    {
                        "value":"row9 col2",
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
                    }]
                },
                {
                    "id":"f",
                    "cells":[{
                        "value":"row10 col1",
                        "dirty":true
                    },
                    {
                        "value":"row10 col2",
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
                    }]
                },
                {
                    "id":"g",
                    "cells":[{
                        "value":"row11 col1",
                        "dirty":true
                    },
                    {
                        "value":"row11 col2",
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
                    }]
                }])
                .setTreeMode("infirstcell")
                .setFreezedColumn(1)
                .setFreezedRow(1)
                );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        }
    }
});