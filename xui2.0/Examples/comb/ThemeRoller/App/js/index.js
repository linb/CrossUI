xui.Class('App', 'xui.Module',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};

            append(
                xui.create("xui.UI.Panel")
                .setHost(host,"basePanel")
                .setCaption("CrossUI Theme Roller")
                .setHAlign("center")
                .setCustomStyle({
                    "CAPTION" : {
                        "font-size" : "1.5em",
                        "font-family" : "comic sans ms,cursive",
                        "font-weight" : "bold"
                    }
                }
                               )
                .setCustomClass({
                    "BARCMDL" : "xui-css-ecz"
                }
                               )
            );

            host.basePanel.append(
                xui.create("xui.UI.Div")
                .setHost(host,"_themeRoller")
                .setDock("fill")
            );

            host._themeRoller.append(
                xui.create("xui.UI.Div")
                .setHost(host,"_demo")
                .setClassName("xui-uibase")
                .setDock("fill")
                .setConDockPadding({
                    "left" : 12,
                    "top" : 12,
                    "right" : 12,
                    "bottom" : 12
                }
                                  )
                .setConDockSpacing({
                    "width" : 12,
                    "height" : 12
                }
                                  )
                .setConDockStretch("fixed")
            );

            host._demo.append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel16")
                .setDock("top")
                .setDockOrder(2)
                .setDockMinW("23em")
                .setDockStretch(".3")
                .setLeft("12.3333em")
                .setWidth("23em")
                .setHeight("25.833299999999998em")
                .setZIndex(1)
                .setOverflow("hidden")
                .setCaption("Panel(Overlay and Shadow)")
            );

            host.xui_ui_panel16.append(
                xui.create("xui.UI.Dialog")
                .setHost(host,"xui_ui_dialog4")
                .setLeft("3.16667em")
                .setTop("4.08333em")
                .setWidth("15.8333em")
                .setHeight("11.6667em")
                .setInitPos("auto")
                .setCaption("Modal Dialog")
                .setCloseBtn(false)
                .setModal(true)
            );

            host.xui_ui_dialog4.append(
                xui.create("xui.UI.RadioBox")
                .setHost(host,"xui_ui_radiobox1")
                .setItems([{
                    "id" : "a",
                    "caption" : "item a",
                    "image" : ""
                },
                           {
                               "id" : "b",
                               "caption" : "item b",
                               "image" : ""
                           },
                           {
                               "id" : "c",
                               "caption" : "item c",
                               "image" : ""
                           }])
                .setLeft("0.75em")
                .setTop("0.75em")
                .setWidth("11.6667em")
                .setHeight("7.5em")
                .setLabelPos("top")
                .setLabelGap("0.3333333333333333em")
                .setLabelHAlign("left")
                .setValue("a")
            );

            host.xui_ui_panel16.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"xui_ui_htmlbutton9")
                .setLeft("3.16667em")
                .setTop("16.5833em")
                .setWidth("15.8333em")
                .setHtml("Button under the overlay")
            );

            host.xui_ui_panel16.append(
                xui.create("xui.UI.ProgressBar")
                .setHost(host,"xui_ui_progressbar1")
                .setLeft("1em")
                .setTop("0.583333em")
                .setWidth("21.3333em")
                .setHeight("1.83333em")
                .setValue(20)
            );

            host._demo.append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel6")
                .setDock("top")
                .setDockOrder(2)
                .setDockMinW("23em")
                .setDockStretch(".3")
                .setLeft("13.166666666666666em")
                .setWidth("23em")
                .setHeight("23.5em")
                .setZIndex(1)
                .setOverflow("hidden")
                .setCaption("List")
            );

            host.xui_ui_panel6.append(
                xui.create("xui.UI.Tabs")
                .setHost(host,"xui_ui_tabs4")
                .setItems([{
                    "id" : "a",
                    "caption" : "List",
                    "image" : ""
                },
                           {
                               "id" : "b",
                               "caption" : "TreeBar",
                               "image" : ""
                           },
                           {
                               "id" : "c",
                               "caption" : "TreeView",
                               "image" : ""
                           }])
                .setLeft("0em")
                .setTop("0em")
                .setHAlign("center")
                .setValue("a")
            );

            host.xui_ui_tabs4.append(
                xui.create("xui.UI.TreeView")
                .setHost(host,"xui_ui_treeview5")
                .setItems([{
                    "id" : "node1",
                    "sub" : ["node11",{
                        "id" : "node12",
                        "imageClass" : "xui-icon-xui"
                    },
                             "node13","node14"],
                    "caption" : "node1"
                },
                           {
                               "id" : "node2",
                               "iniFold" : false,
                               "caption" : "node2",
                               "sub" : [{
                                   "id" : "node21",
                                   "caption" : "node21"
                               },
                                        {
                                            "id" : "node22",
                                            "caption" : "node22"
                                        },
                                        {
                                            "id" : "node23",
                                            "caption" : "node23"
                                        },
                                        {
                                            "id" : "node24",
                                            "caption" : "node24"
                                        }]
                           }])
                .setLeft("0em")
                .setTop("0em")
                , "c");

            host.xui_ui_tabs4.append(
                xui.create("xui.UI.TreeBar")
                .setHost(host,"xui_ui_treebar3")
                .setItems([{
                    "id" : "node1",
                    "sub" : ["node11",{
                        "id" : "node12",
                        "imageClass" : "xui-icon-xui"
                    },
                             "node13","node14"],
                    "caption" : "node1"
                },
                           {
                               "id" : "node2",
                               "group" : true,
                               "iniFold" : false,
                               "caption" : "node2",
                               "sub" : [{
                                   "id" : "node21",
                                   "caption" : "node21"
                               },
                                        {
                                            "id" : "node22",
                                            "caption" : "node22"
                                        },
                                        {
                                            "id" : "node23",
                                            "caption" : "node23"
                                        },
                                        {
                                            "id" : "node24",
                                            "caption" : "node24"
                                        }]
                           }])
                .setLeft("0em")
                .setTop("0em")
                , "b");

            host.xui_ui_tabs4.append(
                xui.create("xui.UI.List")
                .setHost(host,"xui_ui_list2")
                .setItems([{
                    "imageClass" : "xui-icon-loading",
                    "caption" : "xui-icon-loading",
                    "id" : "es"
                },
                           {
                               "imageClass" : "xui-icon-empty",
                               "caption" : "xui-icon-empty",
                               "id" : "et"
                           },
                           {
                               "imageClass" : "xui-uicmd-helpinput",
                               "caption" : "xui-uicmd-helpinput",
                               "id" : "eu"
                           },
                           {
                               "imageClass" : "xui-icon-zoomin",
                               "caption" : "xui-icon-zoomin",
                               "id" : "ev"
                           },
                           {
                               "imageClass" : "xui-icon-zoomout",
                               "caption" : "xui-icon-zoomout",
                               "id" : "ew"
                           },
                           {
                               "imageClass" : "xui-icon-bullet",
                               "caption" : "xui-icon-bullet",
                               "id" : "ex"
                           },
                           {
                               "imageClass" : "xui-icon-minus",
                               "caption" : "xui-icon-minus",
                               "id" : "ey"
                           },
                           {
                               "imageClass" : "xui-uicmd-add",
                               "caption" : "xui-uicmd-add",
                               "id" : "ez"
                           },
                           {
                               "imageClass" : "xui-icon-star",
                               "caption" : "xui-icon-star",
                               "id" : "fa"
                           },
                           {
                               "imageClass" : "xui-icon-dragmove",
                               "caption" : "xui-icon-dragmove",
                               "id" : "fb"
                           },
                           {
                               "imageClass" : "xui-uicmd-check",
                               "caption" : "xui-uicmd-check",
                               "id" : "fc"
                           }])
                .setDock("fill")
                .setLeft("5.833333333333333em")
                .setTop("5em")
                .setWidth("26.666666666666668em")
                .setSelMode("multi")
                .setBorderType("none")
                .setLabelSize(null)
                .setLabelGap("0.3333333333333333em")
                .setValue("a")
                , "a");

            host.xui_ui_panel6.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block55")
                .setDock("top")
                .setLeft("21.666666666666668em")
                .setHeight("2.41667em")
            );

            host.xui_ui_block55.append(
                xui.create("xui.UI.PageBar")
                .setHost(host,"xui_ui_pagebar2")
                .setLeft("-0.41666700000000007em")
                .setTop("0.25em")
                .setPrevMark("")
                .setNextMark("")
                .setValue("1:12:200")
            );

            host._demo.append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel7")
                .setDock("top")
                .setDockOrder(2)
                .setDockMinW("23em")
                .setDockStretch(".7")
                .setLeft("14em")
                .setWidth("23em")
                .setHeight("23.5em")
                .setZIndex(1)
                .setOverflow("hidden")
                .setCaption("TreeGrid")
            );

            host.xui_ui_panel7.append(
                xui.create("xui.UI.TreeGrid")
                .setHost(host,"xui_ui_treegrid2")
                .setLeft("0em")
                .setTop("0em")
                .setSelMode("multibycheckbox")
                .setAltRowsBg(true)
                .setRowNumbered(true)
                .setEditable(true)
                .setRowHandlerWidth("10em")
                .setHeader([{
                    "id" : "a3-1",
                    "caption" : "col 1",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "4.9375em",
                    "type" : "input"
                },
                            {
                                "id" : "a3-2",
                                "caption" : "col 2",
                                "cellStyle" : "text-align:center;cursor:pointer;",
                                "width" : "6.75em",
                                "type" : "input"
                            },
                            {
                                "id" : "a3-3",
                                "caption" : "col 3",
                                "cellStyle" : "text-align:center;cursor:pointer;",
                                "width" : "6em",
                                "type" : "input"
                            },
                            {
                                "id" : "a3-4",
                                "caption" : "col 4",
                                "cellStyle" : "text-align:center;cursor:pointer;",
                                "width" : "4.75em",
                                "disabled" : true,
                                "type" : "input"
                            },
                            {
                                "id" : "a3-5",
                                "caption" : "col 5",
                                "cellStyle" : "text-align:center;cursor:pointer;",
                                "width" : "5.5em",
                                "type" : "input"
                            },
                            {
                                "id" : "a3-6",
                                "caption" : "col 6",
                                "cellStyle" : "text-align:center;cursor:pointer;",
                                "width" : "5.0625em",
                                "type" : "input"
                            },
                            {
                                "id" : "a3-7",
                                "caption" : "col 7",
                                "cellStyle" : "text-align:center;cursor:pointer;",
                                "width" : "4.6875em",
                                "type" : "input"
                            },
                            {
                                "id" : "a3-8",
                                "caption" : "col 8",
                                "cellStyle" : "text-align:center;cursor:pointer;",
                                "width" : "7.5625em",
                                "readonly" : true,
                                "type" : "input"
                            },
                            {
                                "id" : "a3-9",
                                "caption" : "col 9",
                                "cellStyle" : "text-align:center;cursor:pointer;",
                                "width" : "3.5625em",
                                "type" : "input"
                            },
                            {
                                "id" : "a3-10",
                                "caption" : "col 10",
                                "cellStyle" : "text-align:center;cursor:pointer;",
                                "width" : "4.6875em",
                                "type" : "input"
                            },
                            {
                                "id" : "a3-11",
                                "caption" : "col 11",
                                "cellStyle" : "text-align:center;cursor:pointer;",
                                "width" : "4.5625em",
                                "type" : "input"
                            },
                            {
                                "id" : "a3-12",
                                "caption" : "col 12",
                                "cellStyle" : "text-align:center;cursor:pointer;",
                                "width" : "4.25em",
                                "type" : "input"
                            },
                            {
                                "id" : "a3-13",
                                "caption" : "col 13",
                                "cellStyle" : "text-align:center;cursor:pointer;",
                                "width" : "4.6875em",
                                "type" : "input"
                            }])
                .setGrpCols([{
                    "from" : 0,
                    "id" : "a1-1",
                    "caption" : "col grp 1",
                    "to" : 3
                },
                             {
                                 "from" : 0,
                                 "id" : "a2-1",
                                 "caption" : "col grp 11",
                                 "to" : 0
                             },
                             {
                                 "from" : 1,
                                 "id" : "a2-2",
                                 "caption" : "col grp 12",
                                 "to" : 3
                             },
                             {
                                 "from" : 4,
                                 "id" : "a1-2",
                                 "caption" : "col grp 2",
                                 "to" : 8
                             },
                             {
                                 "from" : 4,
                                 "id" : "a2-3",
                                 "caption" : "col grp 21",
                                 "to" : 6
                             },
                             {
                                 "from" : 7,
                                 "id" : "a2-4",
                                 "caption" : "col grp 22",
                                 "to" : 8
                             },
                             {
                                 "from" : 9,
                                 "id" : "a2-5",
                                 "caption" : "col grp 3",
                                 "to" : 12
                             },
                             {
                                 "from" : 9,
                                 "id" : "a1-3",
                                 "caption" : "col grp 31",
                                 "to" : 12
                             }])
                .setRows([{
                    "id" : "s1-1",
                    "caption" : "Row 1",
                    "iniFold" : false,
                    "cells" : [{
                        "value" : "1",
                        "caption" : "↻"
                    },
                               {
                                   "value" : "1",
                                   "caption" : "↻"
                               },
                               {
                                   "value" : "1",
                                   "caption" : "↻"
                               },
                               {
                                   "value" : "1",
                                   "caption" : "↻"
                               },
                               {
                                   "value" : "1",
                                   "caption" : "↻"
                               },
                               {
                                   "value" : "1",
                                   "caption" : "↻"
                               },
                               {
                                   "value" : "1",
                                   "caption" : "↻"
                               },
                               {
                                   "value" : "1",
                                   "caption" : "↻"
                               },
                               {
                                   "value" : "1",
                                   "caption" : "↻"
                               },
                               {
                                   "value" : "1",
                                   "caption" : "↻"
                               },
                               {
                                   "value" : "1",
                                   "caption" : "↻"
                               },
                               {
                                   "value" : "1",
                                   "caption" : "↻"
                               },
                               {
                                   "value" : "1",
                                   "caption" : "↻"
                               }],
                    "sub" : [{
                        "caption" : "Row 1 sub 1",
                        "cells" : [{
                            "value" : "10",
                            "caption" : "✓"
                        },
                                   {
                                       "value" : "0",
                                       "caption" : "✖",
                                       "disabled" : true
                                   },
                                   {
                                       "value" : "0",
                                       "caption" : "✖",
                                       "readonly" : true
                                   },
                                   {
                                       "value" : "0",
                                       "caption" : "✖"
                                   },
                                   {
                                       "value" : "0",
                                       "caption" : "✖"
                                   },
                                   {
                                       "value" : "0",
                                       "caption" : "✖"
                                   },
                                   {
                                       "value" : "0",
                                       "caption" : "✖"
                                   },
                                   {
                                       "value" : "0",
                                       "caption" : "✖"
                                   },
                                   {
                                       "value" : "0",
                                       "caption" : "✖"
                                   },
                                   {
                                       "value" : "0",
                                       "caption" : "✖"
                                   },
                                   {
                                       "value" : "0",
                                       "caption" : "✖"
                                   },
                                   {
                                       "value" : "0",
                                       "caption" : "✖"
                                   },
                                   {
                                       "value" : "0",
                                       "caption" : "✖"
                                   }]
                    },
                             {
                                 "id" : "s3-2",
                                 "caption" : "Row 1 sub 2",
                                 "cells" : [{
                                     "value" : "10",
                                     "caption" : "✓"
                                 },
                                            {
                                                "value" : "0",
                                                "caption" : "✖"
                                            },
                                            {
                                                "value" : "0",
                                                "caption" : "✖"
                                            },
                                            {
                                                "value" : "0",
                                                "caption" : "✖"
                                            },
                                            {
                                                "value" : "0",
                                                "caption" : "✖"
                                            },
                                            {
                                                "value" : "0",
                                                "caption" : "✖"
                                            },
                                            {
                                                "value" : "0",
                                                "caption" : "✖"
                                            },
                                            {
                                                "value" : "0",
                                                "caption" : "✖"
                                            },
                                            {
                                                "value" : "0",
                                                "caption" : "✖"
                                            },
                                            {
                                                "value" : "0",
                                                "caption" : "✖"
                                            },
                                            {
                                                "value" : "0",
                                                "caption" : "✖"
                                            },
                                            {
                                                "value" : "0",
                                                "caption" : "✖"
                                            },
                                            {
                                                "value" : "0",
                                                "caption" : "✖"
                                            }]
                             }]
                },
                          {
                              "id" : "s2-1",
                              "caption" : "Row 2",
                              "iniFold" : false,
                              "cells" : [{
                                  "value" : "1",
                                  "caption" : "↻"
                              },
                                         {
                                             "value" : "1",
                                             "caption" : "↻"
                                         },
                                         {
                                             "value" : "1",
                                             "caption" : "↻"
                                         },
                                         {
                                             "value" : "1",
                                             "caption" : "↻"
                                         },
                                         {
                                             "value" : "1",
                                             "caption" : "↻"
                                         },
                                         {
                                             "value" : "1",
                                             "caption" : "↻"
                                         },
                                         {
                                             "value" : "1",
                                             "caption" : "↻"
                                         },
                                         {
                                             "value" : "1",
                                             "caption" : "↻"
                                         },
                                         {
                                             "value" : "1",
                                             "caption" : "↻"
                                         },
                                         {
                                             "value" : "1",
                                             "caption" : "↻"
                                         },
                                         {
                                             "value" : "1",
                                             "caption" : "↻"
                                         },
                                         {
                                             "value" : "1",
                                             "caption" : "↻"
                                         },
                                         {
                                             "value" : "1",
                                             "caption" : "↻"
                                         }],
                              "sub" : [{
                                  "id" : "s23-1",
                                  "caption" : "Row 2 sub 1",
                                  "cells" : [{
                                      "value" : "10",
                                      "caption" : "✓"
                                  },
                                             {
                                                 "value" : "0",
                                                 "caption" : "✖"
                                             },
                                             {
                                                 "value" : "0",
                                                 "caption" : "✖"
                                             },
                                             {
                                                 "value" : "0",
                                                 "caption" : "✖"
                                             },
                                             {
                                                 "value" : "0",
                                                 "caption" : "✖"
                                             },
                                             {
                                                 "value" : "0",
                                                 "caption" : "✖"
                                             },
                                             {
                                                 "value" : "0",
                                                 "caption" : "✖"
                                             },
                                             {
                                                 "value" : "0",
                                                 "caption" : "✖"
                                             },
                                             {
                                                 "value" : "0",
                                                 "caption" : "✖"
                                             },
                                             {
                                                 "value" : "0",
                                                 "caption" : "✖"
                                             },
                                             {
                                                 "value" : "0",
                                                 "caption" : "✖"
                                             },
                                             {
                                                 "value" : "0",
                                                 "caption" : "✖"
                                             },
                                             {
                                                 "value" : "0",
                                                 "caption" : "✖"
                                             }]
                              },
                                       {
                                           "id" : "s23-2",
                                           "caption" : "Row 2 sub 2",
                                           "cells" : [{
                                               "value" : "10",
                                               "caption" : "✓"
                                           },
                                                      {
                                                          "value" : "0",
                                                          "caption" : "✖"
                                                      },
                                                      {
                                                          "value" : "0",
                                                          "caption" : "✖"
                                                      },
                                                      {
                                                          "value" : "0",
                                                          "caption" : "✖"
                                                      },
                                                      {
                                                          "value" : "0",
                                                          "caption" : "✖"
                                                      },
                                                      {
                                                          "value" : "0",
                                                          "caption" : "✖"
                                                      },
                                                      {
                                                          "value" : "0",
                                                          "caption" : "✖"
                                                      },
                                                      {
                                                          "value" : "0",
                                                          "caption" : "✖"
                                                      },
                                                      {
                                                          "value" : "0",
                                                          "caption" : "✖"
                                                      },
                                                      {
                                                          "value" : "0",
                                                          "caption" : "✖"
                                                      },
                                                      {
                                                          "value" : "0",
                                                          "caption" : "✖"
                                                      },
                                                      {
                                                          "value" : "0",
                                                          "caption" : "✖"
                                                      },
                                                      {
                                                          "value" : "0",
                                                          "caption" : "✖"
                                                      }]
                                       }]
                          }])
                .setHotRowMode("show")
                .setValue("")
            );

            host._demo.append(
                xui.create("xui.UI.Stacks")
                .setHost(host,"xui_ui_stacks1")
                .setItems([{
                    "id" : "a",
                    "caption" : "First",
                    "image" : ""
                },
                           {
                               "id" : "b",
                               "caption" : "Second",
                               "image" : ""
                           },
                           {
                               "id" : "c",
                               "caption" : "Third",
                               "image" : ""
                           }])
                .setDock("top")
                .setDockMinW("13em")
                .setDockStretch("0.2")
                .setLeft("0em")
                .setWidth("13em")
                .setHeight("25.833299999999998em")
                .setValue("a")
            );

            host.xui_ui_stacks1.append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel15")
                .setLeft("1.91667em")
                .setTop("1.08333em")
                .setWidth("12.5em")
                .setHeight("15.8333em")
                .setZIndex(1)
                .setCaption("Panel")
                , "a");

            host.xui_ui_panel15.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block22")
                .setLeft("1.5em")
                .setTop("0.75em")
                .setWidth("10.8333em")
                .setHeight("8.33333em")
                .setBorderType("ridge")
            );

            host.xui_ui_block22.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"xui_ui_htmlbutton3")
                .setLeft("0.357133em")
                .setTop("1.58333em")
                .setWidth("8.33333em")
                .setHeight("2.5em")
                .setHtml("Button")
            );

            host.xui_ui_block22.append(
                xui.create("xui.UI.CheckBox")
                .setHost(host,"xui_ui_checkbox1")
                .setLeft("0.75em")
                .setTop("5.75em")
                .setWidth("7.5em")
                .setCaption("CheckBox")
            );

            host.xui_ui_panel15.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput88")
                .setLeft("1.5em")
                .setTop("9.08333em")
                .setWidth("10.8333em")
                .setHeight("3.83333em")
                .setLabelSize("2em")
                .setLabelPos("top")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Spin")
                .setLabelHAlign("left")
                .setType("spin")
            );

            host.xui_ui_stacks1.append(
                xui.create("xui.UI.ToolBar")
                .setHost(host,"xui_ui_toolbar9")
                .setItems([{
                    "id" : "grp1",
                    "sub" : [{
                        "id" : "a1",
                        "caption" : "button"
                    },
                             {
                                 "id" : "a2",
                                 "type" : "split"
                             },
                             {
                                 "id" : "a3",
                                 "caption" : "drop button",
                                 "type" : "dropButton"
                             },
                             {
                                 "id" : "a4",
                                 "caption" : "status button",
                                 "type" : "statusButton"
                             }],
                    "caption" : "grp1"
                }])
                , "c");

            host.xui_ui_stacks1.append(
                xui.create("xui.UI.Gallery")
                .setHost(host,"xui_ui_gallery2")
                .setItems([{
                    "id" : "a",
                    "caption" : "item a",
                    "imageClass" : "xui-icon-xui"
                },
                           {
                               "id" : "b",
                               "caption" : "item b",
                               "imageClass" : "xui-icon-xui"
                           },
                           {
                               "id" : "c",
                               "caption" : "item c",
                               "imageClass" : "xui-icon-xui"
                           },
                           {
                               "id" : "d",
                               "caption" : "item d",
                               "imageClass" : "xui-icon-xui",
                               "disabled" : true
                           }])
                .setDock("fill")
                .setLeft("1.6666666666666667em")
                .setTop("10em")
                .setWidth("16.666666666666668em")
                .setHeight("16.666666666666668em")
                .setBorderType("none")
                .setLabelGap("0.3333333333333333em")
                .setItemMargin("0.5em")
                .setItemPadding("0.16666666666666666em")
                .setItemWidth("2.6666666666666665em")
                .setItemHeight("2.6666666666666665em")
                .setValue("a")
                , "c");

            host.xui_ui_stacks1.append(
                xui.create("xui.UI.MenuBar")
                .setHost(host,"xui_ui_menubar2")
                .setItems([{
                    "id" : "menu1",
                    "sub" : [{
                        "id" : "normal",
                        "caption" : "normal"
                    },
                             {
                                 "id" : "disabled",
                                 "caption" : "disabled",
                                 "disabled" : true
                             },
                             {
                                 "id" : "image",
                                 "caption" : "image",
                                 "imageClass" : "xui-icon-xui"
                             },
                             {
                                 "type" : "split"
                             },
                             {
                                 "id" : "checkbox 1",
                                 "caption" : "checkbox 1",
                                 "type" : "checkbox"
                             },
                             {
                                 "id" : "checkbox 2",
                                 "caption" : "checkbox 2",
                                 "type" : "checkbox"
                             }],
                    "caption" : "menu1"
                },
                           {
                               "id" : "menu2",
                               "sub" : [{
                                   "id" : "sub menu 1",
                                   "caption" : "sub menu 1",
                                   "add" : "[Ctrl+F]",
                                   "sub" : [{
                                       "id" : "sub 1",
                                       "type" : "radiobox"
                                   },
                                            {
                                                "id" : "sub 2",
                                                "type" : "radiobox"
                                            },
                                            {
                                                "id" : "sub 3"
                                            }]
                               },
                                        {
                                            "id" : "sub menu 2",
                                            "caption" : "sub menu 2",
                                            "add" : "[Ctrl+T]",
                                            "sub" : ["sub 3","sub 4"]
                                        }],
                               "caption" : "menu2"
                           }])
                , "b");

            host.xui_ui_stacks1.append(
                xui.create("xui.UI.Layout")
                .setHost(host,"xui_ui_layout7")
                .setItems([{
                    "id" : "before",
                    "pos" : "before",
                    "min" : 10,
                    "size" : 80,
                    "locked" : false,
                    "folded" : false,
                    "hidden" : false,
                    "cmd" : true
                },
                           {
                               "id" : "main",
                               "min" : 10,
                               "size" : 80
                           },
                           {
                               "id" : "after",
                               "pos" : "after",
                               "min" : 10,
                               "size" : 80,
                               "locked" : false,
                               "folded" : false,
                               "hidden" : false,
                               "cmd" : true
                           }])
                .setLeft("0em")
                .setTop("0em")
                , "b");

            host.xui_ui_layout7.append(
                xui.create("xui.UI.Gallery")
                .setHost(host,"xui_ui_iconlist2")
                .setItems([{
                    "id" : "a",
                    "imageClass" : "xui-icon-xui"
                },
                           {
                               "id" : "b",
                               "imageClass" : "xui-icon-xui"
                           },
                           {
                               "id" : "c",
                               "imageClass" : "xui-icon-xui"
                           },
                           {
                               "id" : "d",
                               "imageClass" : "xui-icon-xui",
                               "disabled" : true
                           }])
                .setDock("fill")
                .setLeft("0em")
                .setIconOnly(true)
                .setTop("0.8333333333333334em")
                .setWidth("16.666666666666668em")
                .setHeight("16.666666666666668em")
                .setBorderType("none")
                .setLabelGap("0.3333333333333333em")
                .setValue("a")
                , "main");

            host._demo.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_b2")
                .setDock("top")
                .setDockOrder(0)
                .setDockMinW("15em")
                .setDockStretch(".5")
                .setLeft("0em")
                .setHeight("26.166700000000002em")
                .setBorderType("ridge")
            );

            host.xui_ui_b2.append(
                xui.create("xui.UI.ButtonViews")
                .setHost(host,"xui_ui_buttonviews1")
                .setItems([{
                    "id" : "a",
                    "caption" : "Fist",
                    "imageClass" : "xui-icon-bullet"
                },
                           {
                               "id" : "b",
                               "caption" : "Second",
                               "imageClass" : "xui-icon-bgcolor"
                           },
                           {
                               "id" : "c",
                               "caption" : "Thrid",
                               "imageClass" : "xui-icon-date"
                           },
                           {
                               "id" : "d",
                               "caption" : "Fourth",
                               "imageClass" : "xui-icon-clock"
                           }])
                .setBarLocation("left")
                .setBarSize(120)
                .setSideBarStatus("fold")
                .setValue("a")
            );

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.DatePicker")
                .setHost(host,"xui_ui_datepicker1")
                .setLeft("1.33333em")
                .setTop("2.33333em")
                .setValue(new Date(2016,8,26,0,0,0,0))
                , "c");

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.TimePicker")
                .setHost(host,"xui_ui_timepicker1")
                .setLeft("1.33333em")
                .setTop("1.5em")
                , "d");

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.ColorPicker")
                .setHost(host,"xui_ui_colorpicker1")
                .setLeft("1.33333em")
                .setTop("0.833333em")
                , "b");

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.Input")
                .setHost(host,"xui_ui_input1")
                .setLeft("2.5em")
                .setTop("0.5em")
                .setWidth("18.333333333333332em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Input")
                , "a");

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.Input")
                .setHost(host,"xui_ui_input2")
                .setLeft("2.5em")
                .setTop("3em")
                .setWidth("18.333333333333332em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Pasword")
                .setType("password")
                .setValue("pwd")
                , "a");

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput30")
                .setDisabled(true)
                .setLeft("2.5em")
                .setTop("5.5em")
                .setWidth("18.333333333333332em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Combo Input")
                .setItems([{
                    "id" : "a",
                    "caption" : "item a",
                    "image" : ""
                },
                           {
                               "id" : "b",
                               "caption" : "item b",
                               "image" : ""
                           },
                           {
                               "id" : "c",
                               "caption" : "item c",
                               "image" : ""
                           },
                           {
                               "id" : "d",
                               "caption" : "item d",
                               "image" : "",
                               "disabled" : true
                           }])
                .setValue("Disabled")
                , "a");

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput36")
                .setLeft("2.5em")
                .setTop("8em")
                .setWidth("18.333333333333332em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Drop List")
                .setType("listbox")
                .setItems([{
                    "id" : "a",
                    "caption" : "item a",
                    "image" : ""
                },
                           {
                               "id" : "b",
                               "caption" : "item b",
                               "image" : ""
                           },
                           {
                               "id" : "c",
                               "caption" : "item c",
                               "image" : ""
                           },
                           {
                               "id" : "d",
                               "caption" : "item d",
                               "image" : "",
                               "disabled" : true
                           }])
                , "a");

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput57")
                .setLeft("2.5em")
                .setTop("10.5em")
                .setWidth("18.333333333333332em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Date")
                .setType("date")
                , "a");

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput63")
                .setLeft("2.5em")
                .setTop("13em")
                .setWidth("18.333333333333332em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Time")
                .setType("time")
                , "a");

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput69")
                .setLeft("2.5em")
                .setTop("15.5em")
                .setWidth("18.333333333333332em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Color")
                .setType("color")
                , "a");

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput84")
                .setLeft("2.5em")
                .setTop("18em")
                .setWidth("18.333333333333332em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Upload")
                .setType("file")
                , "a");

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput90")
                .setLeft("2.5em")
                .setTop("20.5em")
                .setWidth("18.333333333333332em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Button")
                .setType("dropbutton")
                , "a");

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput96")
                .setLeft("2.5em")
                .setTop("23em")
                .setWidth("18.333333333333332em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Command")
                .setType("cmdbox")
                .setCommandBtn("save")
                , "a");

            host.xui_ui_buttonviews1.append(
                xui.create("xui.UI.Slider")
                .setHost(host,"xui_ui_slider1")
                .setLeft("0.833333em")
                .setTop("0.833333em")
                .setWidth("4.166666666666667em")
                .setHeight("24.166700000000002em")
                .setType("vertical")
                .setIsRange(false)
                .setLabelGap("0.3333333333333333em")
                .setValue("0")
                , "a");

            host.basePanel.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_main")
                .setDomId("xui_config_block")
                .setDock("left")
                .setTop("0em")
                .setWidth("20em")
                .setSideBarType("right")
                .setSideBarCaption("<strong>Theme Roller</strong>")
                .setSandboxTheme("vista")
            );

            host.xui_main.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_panel3")
                .setDock("fill")
                .setBorderType("inset")
            );

            host.xui_ui_panel3.append(
                xui.create("xui.UI.Div")
                .setHost(host,"_paneBottom")
                .setDock("fill")
                .setOverflow("overflow-y:auto")
            );

            host._paneBottom.append(
                xui.create("xui.UI.FoldingTabs")
                .setHost(host,"_tabs")
                .setShowDirtyMark(false)
                .setSelMode("multi")
                .setOverflow("hidden")
                .beforePagePop("__tabs_beforepagepop")
                .setCustomStyle({
                    "PANEL" : "line-height:2.2em"
                }
                               )
            );

            host.xui_main.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block13")
                .setDock("bottom")
                .setLeft("8.333333333333334em")
                .setHeight("4.25em")
                .setBorderType("none")
                .setOverflow("hidden")
            );

            host.xui_ui_block13.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"xui_ui_htmlbutton1")
                .setLeft("1.66667em")
                .setTop("0.75em")
                .setWidth("14.75em")
                .setHeight("2.58333em")
                .setHtml("<b>Output CSS Code</b>")
                .onClick("_xui_ui_htmlbutton1_onclick")
            );

            host.xui_main.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block6")
                .setDock("top")
                .setLeft("7.5em")
                .setHeight("2.66667em")
                .setBorderType("none")
                .setOverflow("hidden")
            );

            host.xui_ui_block6.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_theme")
                .setDirtyMark(false)
                .setLeft("0.25em")
                .setTop("0.333333em")
                .setWidth("16.4167em")
                .setHeight("2.08333em")
                .setLabelSize("8em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Base Theme")
                .setType("listbox")
                .setParentID("xui_config_block")
                .setItems([{
                    "id" : "default",
                    "caption" : "default"
                },
                           {
                               "id" : "army",
                               "caption" : "army"
                           },
                           {
                               "id" : "classic",
                               "caption" : "classic"
                           },
                           {
                               "id" : "darkblue",
                               "caption" : "darkblue"
                           },
                           {
                               "id" : "electricity",
                               "caption" : "electricity"
                           },
                           {
                               "id" : "lightblue",
                               "caption" : "lightblue"
                           },
                           {
                               "id" : "moonify",
                               "caption" : "moonify"
                           },
                           {
                               "id" : "orange",
                               "caption" : "orange"
                           },
                           {
                               "id" : "pink",
                               "caption" : "pink"
                           },
                           {
                               "id" : "red",
                               "caption" : "red"
                           },
                           {
                               "id" : "vista",
                               "caption" : "vista"
                           },
                           {
                               "id" : "webflat",
                               "caption" : "webflat"
                           }])
                .setValue("default")
                .afterUIValueSet("_theme_afteruivalueset")
                .setCustomStyle({
                    "LABEL" : {
                        "font-size" : "1.25em"
                    },
                    "INPUT" : {
                        "font-size" : "1.25em"
                    }
                }
                               )
            );

            return children;
            // ]]Code created by CrossUI RAD Studio
        },

        customAppend : function(parent, subId, left, top){
            return false;
        },
        events:{
            "onRender" : "_page_onrender"
        },
        _page_onrender:function (module, threadid){
            module._prepare(module);
            // for pop menu
            var pid = module._themeRoller.getDomId();
            module.xui_ui_menubar2.setParentID(pid);
            module.xui_ui_comboinput36.setParentID(pid);
            module.xui_ui_comboinput57.setParentID(pid);
            module.xui_ui_comboinput63.setParentID(pid);
            module.xui_ui_comboinput69.setParentID(pid);
            module.xui_ui_pagebar2.setParentID(pid);
        },
        _prepare:function(module){
            var ns=this,
                // to cover image background
                prev=''+
                /*reset image background */
                '.xui-uicon-main, .xui-uicon-maini, .xui-uibar-tdl, .xui-uibar-tdm, .xui-uibar-tdr, .xui-uibar-tdlt, .xui-uibar-tdmt, .xui-uibar-tdrt{background-image:none !important;}'+
                '.xui-tabs-item{background-image:none !important;}'+
                '.xui-hcell, .xui-treegrid-fhcell, .xui-treegrid-hcell, .xui-treegrid-hscell, .xui-treegrid-header1, .xui-treegrid-header2{background-image:none !important;}'+
                '.xui-uiborder-box{ border-width:1px;}',
                tail=''+
                '/** important => the last one: this theme\'s name */' +
                '/*Here, only if you wanna save it as an xui theme file, need to specify the theme name*/'+
                '/*.setting-uikey{\n'+
                '    font-family: newThemeName;\n'+
                '}*/',
                items=[
                    // Font
                    {
                        id:'Font Setting',
                        setting:[
                            {
                                id:'Font Family',
                                map:[{
                                    clsname:'.xui-ui-ctrl', 
                                    stylename:'font-family'
                                }]
                            },
                            {
                                id:'Font Weight',
                                map:[{
                                    clsname:'.xui-ui-ctrl', 
                                    stylename:'font-weight'
                                }]
                            },
                            {
                                id:'Font Size',
                                map:[{
                                    clsname:'.xui-ui-ctrl', 
                                    stylename:'font-size'
                                }]
                            },
                            {
                                id:'Font Color',
                                status:['default','readonly','disabled','highlight'],
                                map:[{
                                    clsname:'.xui-ui-ctrl', 
                                    stylename:'color'
                                }]
                            },
                            {
                                id:'FontIcon Color',
                                status:['default','hover','active','checked'],
                                map:[{
                                    clsname:'.xuicon', 
//                                    pclsname:'.xui-ui-ctrl',
                                    stylename:'color'
                                }]
                            }
                        ],
                        template: '' +
                        '.xui-ui-ctrl, .xui-ui-reset{' +
                        '    color:[Font Color];' +
                        '    font-family:[Font Family];' +
                        '    font-size:[Font Size];' +
                        '    font-weight:[Font Weight];' +
                        '}' +
                        '.xui-title-node{'+
                        '    font-size:1.1667em;'+
                        '}'+                    
                        '.xuifont, .xuicon{' +
                        '    font-size:1.3333333333333333em;'+
                        '    color:[FontIcon Color];' +
                        '}' +
                        '.xuifont-hover, .xuicon-hover{' +
                        '    color:[FontIcon Color>hover];' +
                        '}' +
                        '.xuifont-active, .xuicon-active{' +
                        '    color:[FontIcon Color>active];' +
                        '}' +
                        '.xuifont-checked, .xuicon-checked{' +
                        '    color:[FontIcon Color>checked];' +
                        '}' +
                        '.xui-node-readonly, ' +
                        'input[readonly], textarea[readonly], input:read-only, textarea:read-only,' +
                        '.xui-ui-readonly, .xui-ui-readonly .xui-node,' +
                        '.xui-ui-itemreadonly, .xui-ui-itemreadonly .xui-node{' +
                        '    color:  [Font Color>readonly] !important;' +
                        '}' +
                        '.xui-node-disabled,' +
                        'button:disabled, a:disabled, input:disabled, textarea:disabled, ' +
                        '.xui-ui-disabled, .xui-ui-disabled .xui-node,' +
                        '.xui-ui-itemdisabled, .xui-ui-itemdisabled .xui-node,' +
                        '.xui-uicell-disabled, .xui-uicell-disabled .xui-node{' +
                        '   color: [Font Color>disabled] !important;' +
                        '}' +
                        '.xui-ui-ctrl-highlight, .xui-node-highlight, .xui-uibar-checked, .xui-uibar-expand, '+
                        '.xui-uimenu-hover, .xui-uimenu-active{'+
                        '    color: [Font Color>highlight];'+
                        '}'+
                        '.xui-uitembg-checked{'+
                        '    color: [Font Color>highlight];'+
                        '}'+
                        '.xui-uicell-checked,'+
                        '.xui-treegrid-cell-checked, .xui-treegrid-cells1-checked, .xui-treegrid-cells2-checked{'+
                        '    color: [Font Color>highlight];'+
                        '}'
                    },
                    // Background
                    {
                        id:'Background Setting',
                        setting:[
                            {
                                id:'Base Background',
                                map:[{
                                    clsname:'.xui-uibase', 
                                    stylename:'background-color'
                                }]
                            },
                            {
                                id:'Bar Background',
                                status:['default','hover','active','focus'],
                                map:[{
                                    clsname:'.xui-uibar', 
                                    stylename:'background-color'
                                }]
                            }
                        ],
                        template: '' +
                        '.xui-uibase{'+
                        '    background-color:[Base Background];'+
                        '}'+
                        '.xui-uicontainer{'+
                        '    background-color:[Base Background];'+
                        '}'+
                        '.xui-uibar{'+
                        '    background-color:[Bar Background];'+
                        '}'+
                        '.xui-uibar-hover{'+
                        '    background-color:[Bar Background>hover];'+
                        '}'+
                        '.xui-uibar-active, .xui-uibar-checked, .xui-uibar-expand, .xui-uimenu-hover, .xui-uimenu-active{'+
                        '    background-color:[Bar Background>active];'+
                        '}'+
                        '.xui-uibar-focus, .xui-uibar-top-focus .xui-uibar-tdl, .xui-uibar-top-focus .xui-uibar-tdm, .xui-uibar-top-focus .xui-uibar-tdr{'+
                        '  background-color:[Bar Background>focus];'+
                        '}'
                    },
                    // Border
                    {
                        id:'Border Setting',
                        setting:[
                            {
                                id:'Border Style',
                                map:[{
                                    clsname:'.xui-uiborder-flat', 
                                    stylename:'border-left-style'
                                }]
                            },
                            {
                                id:'Border Width',
                                map:[{
                                    clsname:'.xui-uiborder-flat', 
                                    stylename:'border-left-width'
                                }]
                            },
                            {
                                id:'Border Color',
                                status:['inset','outset','light','dark'],
                                map:[{
                                    clsname:'.xui-uiborder-flat', 
                                    stylename:'border-color'
                                },{
                                    clsname:'.xui-uiborder-l', 
                                    stylename:'border-left-color'
                                },{
                                    clsname:'.xui-uiborder-light', 
                                    stylename:'border-color'
                                },{
                                    clsname:'.xui-uiborder-dark', 
                                    stylename:'border-color'
                                }]
                            }
                        ],
                        template: '' +
                        '.xui-uiborder-box{'+
                        '    border-width: [Border Width];'+
                        '}'+                    
                        '.xui-uiborder-l{' +
                        '    border-left-style: [Border Style];' +
                        '    border-left-width: [Border Width];' +
                        '    border-left-color: [Border Color>outset];' +
                        '}' +
                        '.xui-uiborder-t{' +
                        '    border-top-style: [Border Style];' +
                        '    border-top-width: [Border Width];' +
                        '    border-top-color: [Border Color>outset];' +
                        '}' +
                        '.xui-uiborder-r{' +
                        '    border-right-style: [Border Style];' +
                        '    border-right-width: [Border Width];' +
                        '    border-right-color: [Border Color];' +
                        '}' +
                        '.xui-uiborder-b, .xui-uitem-split{' +
                        '    border-bottom-style: [Border Style];' +
                        '    border-bottom-width: [Border Width];' +
                        '    border-bottom-color: [Border Color];' +
                        '}' +
                        '.xui-uiborder-flat{' +
                        '    border-style: [Border Style];' +
                        '    border-width: [Border Width];' +
                        '    border-color: [Border Color];' +
                        '}' +
                        '.xui-uiborder-outset{' +
                        '    border-style: [Border Style];' +
                        '    border-width: [Border Width];' +
                        '    border-color: [Border Color>outset] [Border Color] [Border Color] [Border Color>outset];' +
                        '}' +
                        '.xui-uiborder-inset, .xui-uiborder-hidden-active, .xui-uiborder-hidden-checked{' +
                        '    border-style: [Border Style];' +
                        '    border-width: [Border Width];' +
                        '    border-color: [Border Color] [Border Color>outset] [Border Color>outset] [Border Color];' +
                        '}' +
                        '.xui-uiborder-nob{'+
                        '    border-bottom-width:0;'+
                        '    border-bottom-style:none;'+
                        '}'+
                        '.xui-uiborder-hidden-active, .xui-uiborder-hidden-checked{' +
                        '    background-color:[Border Color>light];' +
                        '}' +
                        ' .xui-uiborder-dark, .xui-uiborder-flat-hover, .xui-tabs-item{' +
                        '    border-color:[Border Color];' +
                        ' }' +
                        ' .xui-uiborder-light, .xui-uiborder-hidden-hover{' +
                        '    border-color:[Border Color>light];' +
                        '}'
                    },
                    // Gradient
                    {
                        id:"Gradients Bar",
                        setting:[{
                            id:"Gradients Bar",
                            map:[{
                                clsname:'.xui-uigradient', 
                                stylename:'Gradients Bar'
                            }]
                        }],
                        template:''+
                            '.xui-uigradient{'+
                            '[normalStatus]'+
                            '}'+
                            '.xui-uigradient-hover, .xui-uigradient:hover{'+
                            '[hoverStatus]'+
                            '}'+
                            '.xui-uigradient-active, .xui-uigradient-checked,  .xui-uigradient-expand, '+
                            '.xui-uigradient:active, '+
                            '.xui-uigradient-active:hover, .xui-uigradient-checked:hover, .xui-uigradient-expand:hover{'+
                            '[activeStatus]'+
                            '}'
                    },
                    // List Item
                    {
                        id:"List Setting",
                        setting:[{
                            id:"Item Background",
                            status:['default','hover','active','checked'],
                            map:[{
                                clsname:'.xui-uitembg', 
                                stylename:'background-color'
                            }]
                        },{
                            id:"Item Border Color",
                            status:['default','hover','active','checked'],
                            map:[{
                                clsname:'.xui-uitembg', 
                                stylename:'border-left-color'
                            }]
                        }],
                        template:''+
                        '.xui-uitembg{'+
                        '    background-image:none; '+
                        '    background-color: [Item Background];'+
                        '    border-color: [Item Border Color];'+
                        '}'+
                        '.xui-uitembg-hover{'+
                        '    background-color: [Item Background>hover];'+
                        '    border-color: [Item Border Color>hover];'+
                        '}'+
                        '.xui-uitembg-active{'+
                        '    background-color: [Item Background>active];'+
                        '    border-color: [Item Border Color>active];'+
                        '}'+
                        '.xui-uitembg-checked{'+
                        '    background-color: [Item Background>checked];'+
                        '    border-color: [Item Border Color>checked];'+
                        '}'
                    },
                    //Grid
                    {
                        id:"Grid Setting",
                        setting:[{
                            id:"Row Background",
                            status:['default','alt','hover','active','checked','hot'],
                            map:[{
                                clsname:'.xui-treegrid-cells1', 
                                stylename:'background-color'
                            }]
                        },{
                            id:"Cell Hover Background",
                            map:[{
                                clsname:'.xui-uicell-hover', 
                                stylename:'background-color'
                            }]
                        }],
                        template:''+
                        '.xui-uicell,'+
                        '.xui-treegrid-cells1, .xui-treegrid-cells2{'+
                        '        background-color: [Row Background];'+
                        '}'+
                        '.xui-uicell-alt,'+
                        '.xui-treegrid-cells1-alt, .xui-treegrid-cells2-alt{'+
                        '        background-color: [Row Background>alt];'+
                        '}'+
                        '.xui-treegrid-cells1-hover, .xui-treegrid-cells2-hover{'+
                        '    background-color: [Row Background>hover];'+
                        '}'+
                        '.xui-treegrid-cells1-active, .xui-treegrid-cells2-active, '+
                        '.xui-treegrid-cell-active, .xui-treegrid-cell-active .xui-treegrid-cella{'+
                        '    background-color: [Row Background>active];'+
                        '}'+
                        '.xui-treegrid-cells1-hot, .xui-treegrid-cells2-hot{'+
                        '    background-color: [Row Background>hot];'+
                        '}'+
                        '.xui-uicell-checked, '+
                        '.xui-treegrid-cell-checked, '+
                        '.xui-treegrid-cells1-checked, '+
                        '.xui-treegrid-cells2-checked{'+
                        '    background-color: [Row Background>checked];'+
                        '}'+
                        '.xui-uicell-hover,'+
                        '.xui-treegrid-cell-hover{'+
                        '    background-color:[Cell Hover Background];'+
                        '}'
                    },
                    // Corner Radius
                    {
                        id:'Corner Setting',
                        setting:[
                            {
                                id:'Normal Radius',
                                map:[{
                                    clsname:'.xui-uiborder-radius', 
                                    stylename:'border-top-left-radius'
                                }]
                            },{
                                id:'Large Radius',
                                map:[{
                                    clsname:'.xui-uiborder-radius-big', 
                                    stylename:'border-top-left-radius'
                                }]
                            }
                        ],
                        template:''+
                        '.xui-uiborder-radius{ '+
                        '    border-radius: [Normal Radius];'+
                        '    -moz-border-radius: [Normal Radius];'+
                        '    -webkit-border-radius: [Normal Radius];'+
                        '    -o-border-radius: [Normal Radius];'+
                        '    -ms-border-radius: [Normal Radius];'+
                        '    -khtml-border-radius: [Normal Radius];'+
                        '}'+
                        '.xui-uiborder-radius-tl{'+
                        '    border-top-left-radius: [Normal Radius];'+
                        '    -moz-border-top-left-radius: [Normal Radius];'+
                        '    -webkit-border-top-left-radius: [Normal Radius];'+
                        '    -o-border-top-left-radius: [Normal Radius];'+
                        '    -ms-border-top-left-radius: [Normal Radius];'+
                        '     -khtml-border-top-left-radius: [Normal Radius];'+
                        '}'+
                        '.xui-uiborder-radius-tr{'+
                        '    border-top-right-radius: [Normal Radius];'+
                        '    -moz-border-top-right-radius: [Normal Radius];'+
                        '    -webkit-border-top-right-radius: [Normal Radius];'+
                        '    -o-border-top-right-radius: [Normal Radius];'+
                        '    -ms-border-top-right-radius: [Normal Radius];'+
                        '    -khtml-border-top-right-radius: [Normal Radius];'+
                        '}'+
                        '.xui-uiborder-radius-bl{'+
                        '    border-bottom-left-radius: [Normal Radius];'+
                        '    -moz-border-bottom-left-radius: [Normal Radius];'+
                        '    -webkit-border-bottom-left-radius: [Normal Radius];'+
                        '    -o-border-bottom-left-radius: [Normal Radius];'+
                        '    -ms-border-bottom-left-radius: [Normal Radius];'+
                        '    -khtml-border-bottom-left-radius: [Normal Radius];'+
                        '}'+
                        '.xui-uiborder-radius-br{'+
                        '    border-bottom-right-radius: [Normal Radius];'+
                        '    -moz-border-bottom-right-radius: [Normal Radius];'+
                        '    -webkit-border-bottom-right-radius: [Normal Radius];'+
                        '    -o-border-bottom-right-radius: [Normal Radius];'+
                        '    -ms-border-bottom-right-radius: [Normal Radius];'+
                        '    -khtml-border-bottom-right-radius: [Normal Radius];'+    
                        '}'+
                        '.xui-uiborder-radius-big{'+
                        '    border-radius: [Large Radius];'+
                        '    -moz-border-radius: [Large Radius];'+
                        '    -webkit-border-radius: [Large Radius];'+
                        '    -o-border-radius: [Large Radius];'+
                        '    -ms-border-radius: [Large Radius];'+
                        '    -khtml-border-radius: [Large Radius];'+
                        '}'+
                        '.xui-uiborder-radius-big-tl{'+
                        '    border-top-left-radius: [Large Radius];'+
                        '    -moz-border-top-left-radius: [Large Radius];'+
                        '    -webkit-border-top-left-radius: [Large Radius];'+
                        '    -o-border-top-left-radius: [Large Radius];'+
                        '    -ms-border-top-left-radius: [Large Radius];'+
                        '     -khtml-border-top-left-radius: [Large Radius];'+
                        '}'+
                        '.xui-uiborder-radius-big-tr{'+
                        '    border-top-right-radius: [Large Radius];'+
                        '    -moz-border-top-right-radius: [Large Radius];'+
                        '    -webkit-border-top-right-radius: [Large Radius];'+
                        '    -o-border-top-right-radius: [Large Radius];'+
                        '    -ms-border-top-right-radius: [Large Radius];'+
                        '    -khtml-border-top-right-radius: [Large Radius];'+
                        '}'+
                        '.xui-uiborder-radius-big-bl{'+
                        '    border-bottom-left-radius: [Large Radius];'+
                        '    -moz-border-bottom-left-radius: [Large Radius];'+
                        '    -webkit-border-bottom-left-radius: [Large Radius];'+
                        '    -o-border-bottom-left-radius: [Large Radius];'+
                        '    -ms-border-bottom-left-radius: [Large Radius];'+
                        '    -khtml-border-bottom-left-radius: [Large Radius];'+
                        '}'+
                        '.xui-uiborder-radius-big-br{'+
                        '    border-bottom-right-radius: [Large Radius];'+
                        '    -moz-border-bottom-right-radius: [Large Radius];'+
                        '    -webkit-border-bottom-right-radius: [Large Radius];'+
                        '    -o-border-bottom-right-radius: [Large Radius];'+
                        '    -ms-border-bottom-right-radius: [Large Radius];'+
                        '    -khtml-border-bottom-right-radius: [Large Radius];'+    
                        '}'
                    },
                    // Shadow
                    {
                        id:"Shadow Setting",
                        setting:[
                            {
                                id:"Dialog Shadow",
                                map:[{
                                    clsname:'.xui-ui-shadow',
                                    stylename:'box-shadow'
                                }]
                            },{
                                id:"Input Shadow",
                                map:[{
                                    clsname:'.xui-ui-shadow-input',
                                    stylename:'box-shadow'
                                }]
                            }],
                        template:''+
                        '.xui-ui-shadow{'+
                        '    -moz-box-shadow: [Dialog Shadow];'+
                        '    -webkit-box-shadow: [Dialog Shadow];'+
                        '    box-shadow: [Dialog Shadow];'+
                        '}'+
                        '.xui-ui-shadow-r{'+
                        '    -moz-box-shadow: [Dialog Shadow];'+
                        '    -webkit-box-shadow: [Dialog Shadow];'+
                        '    box-shadow: [Dialog Shadow];'+
                        '}'+
                        '.xui-ui-shadow-b{'+
                        '    -moz-box-shadow: [Dialog Shadow];'+
                        '    -webkit-box-shadow: [Dialog Shadow];'+
                        '    box-shadow: [Dialog Shadow];'+
                        '}'+
                        '.xui-ui-shadow-input{'+
                        '    -moz-box-shadow: [Input Shadow];'+
                        '    -webkit-box-shadow: [Input Shadow];'+
                        '    box-shadow: [Input Shadow];'+
                        '}'
                    },
                    // Focus Outline
                    {
                        id:'Focus Outline',
                        setting:[{
                            id:'Outline Style',
                            map:[{
                                clsname:'.xui-showfocus:focus',
                                stylename:'outline-style'
                            }]
                        },{
                            id:'Outline Width',
                            map:[{
                                clsname:'.xui-showfocus:focus',
                                stylename:'outline-width'
                            }]
                        }],
                        template:''+
                        '.xui-showfocus:focus {'+
                        '    outline-width: [Outline Width];'+
                        '    outline-style: [Outline Style];'+
                        '}'
                    },
                    // Modal Screen for Overlays
                    {
                        id:'Modal Screen for Overlays',
                        setting:[{
                            id:'Overlay Background',
                            map:[{
                                clsname:'.xui-cover',
                                stylename:'background-color'
                            }]
                        },{
                            id:'Overlay Opacity',
                            map:[{
                                clsname:'.xui-cover',
                                stylename:'opacity'
                            }]
                        }],
                        template:''+
                        '.xui-cover, .xui-cover-modal{'+
                        '    background-color: [Overlay Background];'+
                        '    opacity: [Overlay Opacity];'+
                        '}'
                    },{
                        id:'Custom CSS',
                        popBtn:true
                    }
                ];

            var arr=[],hash={};
            xui.arr.each(items,function(o,index){
                if(o.setting){
                    arr.push("\n\n/*"+o.id+"*/\n"+o.template);
                    hash[o.id]=index;
                }
            });

            ns._prev=prev;
            ns._tail=tail;
            ns._conf_arr=arr;
            ns._conf_index_map=hash;
            ns._setting={};

            module._tabs.setItems(items).setUIValue('Font Setting');

            ns._cssscope="";
            xui.arr.each(ns._tabs.getItems(),function(item){
                //collect classes
                if(item.template){
                    ns._cssscope += item.template.replace(/(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)/g,'')
                        .replace(/\,([^\s])/g,", $1")
                        .replace(/\s+/g," ");
                }
                ns.__tabs_oninipanelview(ns._tabs, item);
            });

            ns._themeRoller.setSandboxTheme(ns._prev);
        },
        __tabs_oninipanelview:function (ctrl, item){
            var ns=this, 
                group, 
                subid;
            if(item.setting){
                xui.arr.each(item.setting, function(subItem){
                    subid = subItem.id;
                    if(subItem.status){
                        group = new xui.UI.Group({
                            position:'relative',
                            caption:subid,
                            width:"15em",
                            height:"auto",
                            overflow:'hidden'
                        });
                        group.setCustomStyle({KEY:'margin:0.25em 0;padding-left:1em;',PANEL:'line-height:2.2em'});
                        xui.arr.each(subItem.status,function(stt, index){
                            group.append(ns._createEditor(item, subItem, stt, index, stt));
                        });
                        ctrl.append(group, item.id);
                        group.getRoot().setInlineBlock();
                    }else{
                        ctrl.append(ns._createEditor(item, subItem, subid, 0), item.id);
                    }
                });
            }else{
                if(item.id=="Custom CSS"){
                    ns._cstomCSS = new xui.UI.Input({
                        position:'relative',
                        width:"15em",
                        height:"20em",
                        multiLines:true,
                        dirtyMark:false
                    });
                    ns._cstomCSS.onChange(function(){
                        ns._refreshTheme();
                    });
                    ctrl.append(ns._cstomCSS, item.id);
                }
            }
        },
        _createEditor: function(item, subItem, title, index, status){
            var ns=this,
                map=subItem.map[index||0],
                key = "\\["+subItem.id+((status&&status!='default'&&status!='inset')?('>'+status):'')+"\\]",
                editor = new xui.UI.ComboInput({
                    position:"relative",
                    dirtyMark:false,
                    labelSize:status?'7em':'8em',
                    width:status?'14em':'15em',
                    labelCaption:title
                }),
                value ,
                status2 = map?null:status;

            if(!map){
                map = subItem.map[0];
            }
            value = xui.CSS.$getCSSValue(xui.UI._getThemePrevId(ns._themeRoller.get(0)) +" " +map.clsname+(status2?('-'+status2):''), map.stylename);
            if(!value && map.pclsname){
                value = xui.CSS.$getCSSValue(xui.UI._getThemePrevId(ns._themeRoller.get(0)) +" " +map.pclsname+(status2?('-'+status2):''), map.stylename);
            }
            if(!value){
                value = xui.CSS.$getCSSValue(map.clsname+(status2?('-'+status2):''), map.stylename);
            }
            if(!value && map.pclsname){
                value = xui.CSS.$getCSSValue(map.pclsname+(status2?('-'+status2):''), map.stylename);
            }

            editor.setValue(value);
            // ini here
            xui.set(ns._setting,[item.id, key], editor.getValue());

            switch(map.stylename){
                case 'box-shadow':
                    editor.setType("popbox")
                        .beforeComboPop(function(prf,pos, e, src){
                        xui.ModuleFactory.getModule("RAD.CustomBoxShadow",function(){
                            this.init(prf,prf.boxing().getUIValue(),{},2);
                            this.setEvents({
                                onChange:function(str){
                                    prf.boxing().setUIValue(str);
                                }
                            });
                            this.render();
                            var r=this.mainPane.getRoot();
                            r.popToTop(prf.getRoot());
                            r.setBlurTrigger(r.$xid, function(){
                                r.setBlurTrigger(r.$xid);
                                r.hide();
                                prf.boxing().setPopWnd(null);    
                            });
                            prf.boxing().setPopWnd(this);
                        });                            
                    });
                    break;
                case 'Gradients Bar':
                    var clsname,
                        normalStatus ={},
                        hoverStatus ={},
                        activeStatus ={},
                        ls1,ls2, ls;
                    ls=[];
                    // normal status
                    clsname=".xui-uigradient";
                    ls1 = xui.CSS.$getCSSValue(xui.UI._getThemePrevId(ns._themeRoller.get(0)) +" " +clsname+(status2?('-'+status2):''));
                    ls2 = xui.CSS.$getCSSValue(clsname+(status2?('-'+status2):''));
                    Array.prototype.push.apply(ls, ls1);
                    Array.prototype.push.apply(ls, ls2);
                    if(ls && ls.length){
                        ls = ls.reverse();
                        xui.arr.each(ls, function(value){
                            xui.arr.each((value.style.cssText || value.style.rules || "").split(/\s*;\s*/),function(o, i){
                                o = o.split(/\s*:\s*/); 
                                if(o[0]){
                                    if(o[0]=='background'&& o[1]=='none')normalStatus['background-image'] = o[1];
                                    else normalStatus[o[0]] = o[1];
                                }
                            });                            
                        });
                    }

                    // hover status
                    ls=[];
                    clsname = ".xui-uigradient-hover";
                    ls1 = xui.CSS.$getCSSValue(xui.UI._getThemePrevId(ns._themeRoller.get(0)) +" " +clsname+(status2?('-'+status2):''));
                    ls2 = xui.CSS.$getCSSValue(clsname+(status2?('-'+status2):''));
                    Array.prototype.push.apply(ls, ls1);
                    Array.prototype.push.apply(ls, ls2);
                    if(ls && ls.length){
                        ls = ls.reverse();
                        xui.arr.each(ls, function(value){
                            xui.arr.each((value.style.cssText || value.style.rules || '').split(/\s*;\s*/),function(o, i){
                                o = o.split(/\s*:\s*/); 
                                if(o[0]){
                                    if(o[0]=='background'&& o[1]=='none')hoverStatus['background-image'] = o[1];
                                    else hoverStatus[o[0]] = o[1];
                                }
                            });                            
                        });
                    }

                    // active status
                    ls=[];
                    clsname = ".xui-uigradient-active";
                    ls1 = xui.CSS.$getCSSValue(xui.UI._getThemePrevId(ns._themeRoller.get(0)) +" " +clsname+(status2?('-'+status2):''));
                    ls2 = xui.CSS.$getCSSValue(clsname+(status2?('-'+status2):''));
                    Array.prototype.push.apply(ls, ls1);
                    Array.prototype.push.apply(ls, ls2);
                    if(ls && ls.length){
                        ls = ls.reverse();
                        xui.arr.each(ls, function(value){
                            xui.arr.each((value.style.cssText || value.style.rules || '').split(/\s*;\s*/),function(o, i){
                                o = o.split(/\s*:\s*/); 
                                if(o[0]){
                                    if(o[0]=='background'&& o[1]=='none')activeStatus['background-image'] = o[1];
                                    else activeStatus[o[0]] = o[1];
                                }
                            });                            
                        });
                    }
                    xui.filter(hoverStatus,function(o,i){
                        return normalStatus[i] !== o;
                    });
                    xui.filter(activeStatus,function(o,i){
                        return normalStatus[i] !== o;
                    });

                    xui.each([normalStatus,hoverStatus,activeStatus],function(k){
                        xui.each(k, function(o,i ){
                            k[i] = o = o.replace(/(?:rgb\((\d+), ?(\d+), ?(\d+)\)([^,]*))+/g,function(a,b,c,d,e){
                                return '#'+xui.UI.ColorPicker.rgb2hex(b, c, d) + e;
                            });
                            k[i] = o = o.replace(/(?:rgba\((\d+), ?(\d+), ?(\d+), ?([.\d]+)\)([^,]*))+/g,function(a,b,c,d,e,f){
                                return '#'+xui.UI.ColorPicker.rgb2hex(b, c, d) + ":" +e + f;
                            });
                            if(i=='background' || i=='background-image'){
                                if(/gradient\([^)]+\)/.test(o)){
                                    var moz = /-moz-/.test(o), g;
                                    if(/\blinear\b/.test(o)){
                                        g = {stops:[]},
                                            o = o.replace(/[^(]+\(([^)]+)\)/,'$1');
                                        g.type = 'liner';
                                        var a1=o.split(/,\s*/);
                                        xui.each(a1, function(s,i){
                                            switch(s){
                                                case 'left top':
                                                    if(a1[i+1] == 'right bottom'){
                                                        g.orient='LT';
                                                    }else if(a1[i+1]=='left bottom'){
                                                        g.orient='T';
                                                    }else if(a1[i+1]=='right top'){
                                                        g.orient='L';
                                                    }
                                                    break;
                                                case 'right top':
                                                    if(a1[i+1] == 'left top'){
                                                        g.orient='R';
                                                    }else if(a1[i+1]=='left bottom'){
                                                        g.orient='RT';
                                                    }
                                                    break;
                                                case 'left bottom':
                                                    if(a1[i+1] == 'right top'){
                                                        g.orient='LB';
                                                    }else if(a1[i+1]=='left top'){
                                                        g.orient='B';
                                                    }
                                                    break;
                                                case 'right bottom':
                                                    if(a1[i+1] == 'left top'){
                                                        g.orient='RB';
                                                    }
                                                    break;

                                                case '45deg':
                                                    g.orient='LB';
                                                    break;
                                                case '-45deg':
                                                    g.orient=moz?'LT':'RB';
                                                case '135deg': 
                                                    g.orient=moz?'RB':'LT';
                                                    break;
                                                case '-135deg': 
                                                    g.orient='RT';
                                                    break;

                                                case 'to bottom': 
                                                case 'top': 
                                                    g.orient='T';
                                                    break;
                                                case 'to right':
                                                case 'left':
                                                    g.orient="L";
                                                    break;
                                                case 'to left':
                                                case 'right':
                                                    g.orient="R";
                                                    break;
                                                case 'to top':
                                                case 'bottom':
                                                    g.orient="B";
                                                    break;
                                                default: 
                                                    i = s.split(' ');
                                                    if(/^#[0-f]{6}$/.test(i[0])){
                                                        g.stops.push({
                                                            pos:i[1],
                                                            clr:i[0].split(':')[0],
                                                            opacity:i[0].split(':')[1]||1
                                                        });
                                                    }

                                            }
                                        });
                                    }else if(/\bradial\b/.test(o) || /\bcircle\b/.test(o)){
                                        g = {stops:[]};
                                        o = o.replace(/[^(]+\(([^)]+)\)/,'$1');
                                        g.type = 'radial';
                                        var a2=o.split(/,\s*/);
                                        xui.each(a1, function(s,i){
                                            switch(s){
                                                case 'center center':g.orient = 'C';break;
                                                case 'left top':g.orient = 'LT';break;
                                                case 'right top':g.orient = 'RT';break;
                                                case 'left bottom':g.orient = 'LB';break;
                                                case 'right bottom':g.orient = 'RB';break;
                                                case 'top': case 'center top': g.orient = 'T';break;
                                                case 'left': case 'left center': g.orient = 'L'; break;
                                                case 'right': case 'right center': g.orient = 'R'; break;
                                                case 'bottom': case 'center bottom':g.orient = 'B'; break;
                                                default:
                                                    i = s.split(' ');
                                                    if(/^#[0-f]{6}/.test(i[0])){
                                                        g.stops.push({
                                                            pos:i[1],
                                                            clr:i[0].split(':')[0],
                                                            opacity:i[0].split(':')[1]||1
                                                        });
                                                    }                                                    
                                            }                                            
                                        });
                                    }
                                    if(g)k.$gradient=g;
                                }
                            }
                        });
                    });
                    // remove these 
                    delete normalStatus.background;
                    delete normalStatus['background-image'];
                    delete hoverStatus.background;
                    delete hoverStatus['background-image'];
                    delete activeStatus.background;
                    delete activeStatus['background-image'];

                    var prop={
                        normalStatus: normalStatus,
                        hoverStatus: hoverStatus,
                        activeStatus: activeStatus
                    };
                    //console.log(prop);

                    editor.setType('button')
                        .setCaption("Normal | Hover | Active")
                        .setLabelSize(0)
                        .onClick(function(prf,pos, e, src){
                        xui.ModuleFactory.getModule("RAD.CustomDecoration2",function(){
                            this.setProperties({
                                // getter & setter
                                targetProfile:{
                                    _noFocusStatus:true,
                                    _title:"Gradients Bar Setting",
                                    properties: prop,
                                    boxing:function(){
                                        return {
                                            setNormalStatus:function(hash){
                                                prop.normalStatus=hash;
                                                ns._updateGradient(prop);
                                            },
                                            setHoverStatus:function(hash){
                                                prop.hoverStatus=hash;
                                                ns._updateGradient(prop);
                                            },
                                            setActiveStatus:function(hash){
                                                prop.activeStatus=hash;
                                                ns._updateGradient(prop);
                                            },
                                            setFocusStatus:function(hash){}
                                        };
                                    }
                                },
                                src:prf.getRoot()
                            });
                            this.setEvents({
                                onFinished:function(){
                                    var nstyle=xui.clone(prf.properties.normalStatus,true),
                                        hstyle=xui.clone(prf.properties.hoverStatus,true),
                                        astyle=xui.clone(prf.properties.activeStatus,true);
                                }
                            });
                            this.show();
                        });                            
                    });

                    return editor;

                case 'font-family':
                    editor.setType("listbox")
                        .setItems([
                        {caption:"<span style='font-family:arial,helvetica,clean,sans-serif'>Arial</span>",id:"arial,helvetica,clean,sans-serif"},
                        {caption:"<span style='font-family:'arial black',avant garde'>Arial Black</span>",id:"'arial black',avant garde"},
                        {caption:"<span style='font-family:'comic sans ms',cursive'>Comic Sans MS</span>",id:"'comic sans ms',cursive"},
                        {caption:"<span style='font-family:'courier new',courier,monospace'>Courier New</span>",id:"'courier new',courier,monospace"},
                        {caption:"<span style='font-family:georgia,serif'>Georgia</span>",id:"georgia,serif"},
                        {caption:"<span style='font-family:'PT Sans', Tahoma'>PT Sans</span>",id:"'PT Sans', Tahoma"},
                        {caption:"<span style='font-family:impact,chicago'>impact</span>",id:"impact,chicago"},
                        {caption:"<span style='font-family:'lucida sans unicode','lucida grande',sans-serif'>Lucida Sans Unicode</span>",id:"'lucida sans unicode','lucida grande',sans-serif"},
                        {caption:"<span style='font-family:tahoma,geneva,sans-serif'>Tahoma</span>",id:"tahoma,geneva,sans-serif"},
                        {caption:"<span style='font-family:'times new roman',times,serif'>Times New Roman</span>",id:"'times new roman',times,serif"},
                        {caption:"<span style='font-family:'trebuchet ms',helvetica,sans-serif'>Trebuchet MS</span>",id:"'trebuchet ms',helvetica,sans-serif"},
                        {caption:"<span style='font-family:verdana,geneva,sans-serif'>Verdana</span>",id:"verdana,geneva,sans-serif"},
                        {caption:"<span style='font-family:Roboto, Arial'>Roboto</span>",id:"Roboto, Arial"}
                    ]);
                    break;
                case 'font-size':
                    editor.setType("listbox")
                        .setItems([".75rem","1rem","1.25rem","1.5rem","2rem","3rem","4rem"]);
                    break;
                case 'font-weight':
                    editor.setType("listbox")
                        .setItems(["normal","bolder","bold","lighter","600","700","800","900","1000"]);
                    break;
                case 'border-left-width':
                case 'outline-width':
                    editor.setType("listbox")
                        .setItems(["0", "1px", "2px", "3px", "4px", "5px"]);
                    break;
                case 'border-left-style':
                case 'outline-style':
                    editor.setType("listbox")
                        .setItems(["solid", "dashed", "dotted", "double", "groove", "hidden", "inset", "none", "outset", "ridge"]);
                    break;
                case 'opacity':
                    editor.setType("spin")
                        .setMin(0)
                        .setMax(1)
                        .setIncrement(0.1);
                    break;
                default:
                    if(xui.str.endWith(map.stylename,"color")){
                        editor.setType("color");
                    }else if(xui.str.endWith(map.stylename,"radius")){
                        editor.setType("listbox")
                            .setItems(["0","1px","2px","3px","4px","5px","6px","7px","8px","9px","10px"]);
                    }                    
            }


            editor.onChange(function (profile, oldValue, newValue){
                ns._onchange(item, subItem, profile, newValue, status);
            });
            return editor;
        },
        _updateGradient:function(gradient){
            var ns=this,
                fun=function(hash, clearFirst, g){
                    if(hash.$gradient && hash.$gradient.stops && hash.$gradient.stops.length){
                        delete hash['background-image'];
                        delete hash['background'];
                    }
                    var rst=clearFirst?['background-image:none']:[];
                    
                    var newO=function(){
                        var arr = this.arr=[];
                        Object.defineProperty(this, 'backgroundImage', {
                            set:function(v){
                               arr.push('background-image: ' + v);
                            }
                        });                        
                    };
                    
                    xui.each(hash,function(v,k){
                        switch(k){
                            case 'box-shadow':
                                rst.push("-moz-box-shadow: " + v);
                                rst.push("-webkit-box-shadow: " + v);
                                rst.push("box-shadow: " + v);
                                break;
                            case '$gradient':
                                if(v && v.stops&& v.stops.length){
                                    rst.push("filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='"+v.stops[0].clr+"', endColorstr='"+(v.stops[1]||v.stops[0]).clr+"')");
                                    rst.push("-ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='"+v.stops[0].clr+"', endColorstr='"+(v.stops[1]||v.stops[0]).clr+"')");
                                    
                                    var fakeStyle=new newO(),
                                        fakeNode = {
                                            nodeType:1,
                                            style:fakeStyle
                                        };
                                    xui.Dom.$setGradients(fakeNode, v, {
                                        gek:1,
                                        ver:100,
                                        cssTag1:'-moz-'
                                    });
                                    xui.Dom.$setGradients(fakeNode, v, {
                                        opr:1,
                                        ver:100,
                                        cssTag1:'-o-'
                                    });
                                    xui.Dom.$setGradients(fakeNode, v, {
                                        isWebKit:1,
                                        isChrome:1,
                                        isSafari:1,
                                        ver:100,
                                        cssTag1:'-webkit-'
                                    });
                                    xui.arr.removeDuplicate(fakeStyle.arr);
                                    if(fakeStyle.arr.length){
                                        xui.arr.insertAny(rst,fakeStyle.arr);
                                        if(g)g.length = fakeStyle.arr.length;
                                    }
                                } 
                                break;
                          default :
                              rst.push(k+": "+v);
                        }
                    });
                    return '    ' + rst.join(';\n') +";";  
                },
                t, normalGradient={};

            if((t=gradient.normalStatus)){
                xui.set(ns._setting,['Gradients Bar', '\\[normalStatus\\]'], fun(t,true,normalGradient));
            }
            if((t=gradient.hoverStatus)){
                xui.set(ns._setting,['Gradients Bar', '\\[hoverStatus\\]'], fun(t, !normalGradient.length));
            }
            if((t=gradient.activeStatus)){
                xui.set(ns._setting,['Gradients Bar', '\\[activeStatus\\]'], fun(t, !normalGradient.length));
            }
            ns._refreshTheme();
        },
        _onchange:function (item, subItem, profile, newValue, status){
            var ns=this, 
                key = "\\["+subItem.id+((status&&status!='default'&&status!='inset')?('>'+status):'')+"\\]";

            xui.set(ns._setting,[item.id, key], newValue);

            ns._refreshTheme();

            if("Font Size"==subItem.id){
                xui.CSS.adjustFont();
            }
        },
        _refreshTheme:function(){
            var ns=this;
            ns._themeRoller.setSandboxTheme(ns._buildTheme());
        },
        _buildTheme:function(){
            var ns=this, 
                // must be the original one
                arr=xui.copy(ns._conf_arr),
                index,themeStr;

            xui.each(ns._setting,function(subMap,itemId){
                index = ns._conf_index_map[itemId];
                xui.each(subMap,function(value,key){
                    if(key)arr[index] = arr[index].replace(new RegExp(key,'g'), value);                    
                });
            });
            arr = arr.join('\n').replace(/([},])\s*(\.)/g,function(a,b,c){
                return b + "\n" + c;
            }).replace(/([{;])\s*(.)/g,function(a,b,c){
                return b + '\n' + c;
            }).split('\n');
            xui.filter(arr,function(s){
                return !(/\:\s*\[/.test(s) || /\]\s*\;/.test(s)|| /\:\s*;/.test(s));
            });
            themeStr=arr.join('');
            themeStr=themeStr.replace(/[^}]+\{\s*\}/g,'');
            return (ns._prev + themeStr + (ns._cstomCSS ? "\n\n"+ns._cstomCSS.getValue() : "") + ns._tail)
                .replace(/(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)/g,'\n\n$1\n')
                .replace(/([},])\s*(\.)/g,function(a,b,c){
                    return b + "\n" + "" + c;
                })
                .replace(/([{;])\s*(.)/g,function(a,b,c){
                    return b + '\n' + (c=='}'?'':'    ') + c;
                })
                .replace(/\{\s+;\s*\}/g,'{}');
        },
        _theme_afteruivalueset:function (profile,oldValue,newValue){            
            var ns=this;
            ns._setting={};
            ns._themeRoller.setSandboxTheme("");

            delete ns._cstomCSS;

            xui.busy("id","Loading theme ...",true);
            xui.getFileAsync(xui.getPath('xui.appearance.' + newValue,'/theme.css'), function(rsp){
                rsp = rsp.replace(/\.setting-uikey\{[^}]+\}/,'');
                ns._themeRoller.setSandboxTheme(rsp + ns._prev);

                ns._tabs.resetPanelView(true,true,true);

                xui.arr.each(ns._tabs.getItems(),function(item){
                    ns.__tabs_oninipanelview(ns._tabs, item);
                });

                // [[ get non-standard css
                rsp = xui.replace(rsp, [[/(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)/,''],
                                              [/\{[^}]*\}/,'$0'],
                                              [/\s+/," "],
                                              [/\,([^\s])/,", $1"]
                                             ]);
                var v=[],k=[],hash={},
                    aa1=ns._cssscope.split(/\s*\{[^}]*\}\s*/);

                rsp.replace(/\s*\{[^}]*\}\s*/g,function(a){
                    v.push(a);
                });
                k=rsp.split(/\s*\{[^}]*\}\s*/);

                xui.arr.each(aa1,function(o,i){aa1[i]=xui.str.trim(o);});
                xui.arr.each(k,function(o,i){k[i]=xui.str.trim(o);});

                xui.arr.each(v,function(o,i){
                    hash[k[i]]=o;
                });

                hash = xui.filter(hash,function(v,k){
                    return xui.arr.indexOf(aa1, k)==-1; 
                });
                var aa2=[];
                xui.each(hash,function(o,i){
                    aa2.push(i+o+"\n");
                });
                ns._cstomCSS.setValue(aa2.join("\n"));
                // ]]


                xui.CSS.adjustFont();

                xui.free("id");
            });
            // xui.setTheme(newValue,true,function(){});
        },
        _xui_ui_htmlbutton1_onclick:function (profile, e, value){
            var ns = this, uictrl = profile.boxing();
            var dlg = new xui.UI.Dialog({
                caption:"CrossUI Theme - CSS Code",
                status:"max",
                minBtn:false,
                maxBtn:false,
                html:xui.Coder.formatHTML(ns._buildTheme(), 'css', ['plain'], null, null,null, function(div){
                    div.css('width','auto');
                })
            });
            dlg.showModal();
        },
        __tabs_beforepagepop:function (profile, item, options, e, src){
            var ns=this,
                dlg = xui.prompt("Custom CSS", "CSS Code", ns._cstomCSS.getUIValue(), function(value){
                    xui.Coder.formatText(ns._cstomCSS.setValue(value,true),'css');
                },0, 0,0,0,0,0,0,true);
            dlg.setStatus('max');
            return false;
        }
    }
});