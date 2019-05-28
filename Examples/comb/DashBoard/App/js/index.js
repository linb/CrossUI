// The default code is a module class (inherited from xui.Module)
// Ensure that all the value of "key/value pair" does not refer to external variables
xui.Class('App', 'xui.Module',{
    Instance:{
        // Dependency classes
        Dependencies:[],
        // Required modules
        Required:[],

        // To initialize properties
        properties : {},

        // To initialize instance(e.g. properties)
        initialize : function(){
        },

        // To initialize internal components (mostly UI controls)
        // *** If you're not a skilled, dont modify this function manually ***
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.APICaller")
                .setHost(host,"api_1")
                .setName("api_1")
            );
            
            append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div17")
                .setDock("top")
                .setLeft("21.666666666666668em")
                .setHeight("3.75em")
                .setZIndex(10)
                .setCustomStyle({
                    "KEY":{
                        "background-color":"#3498DB",
                        "box-shadow":"0px 2px 4px 0px #BC8F8F"
                    }
                }
                )
            );
            
            host.xui_ui_div17.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div22")
                .setHoverPop("xui_ui_svgpaper1")
                .setLeft("10.625em")
                .setTop("0.9375em")
                .setWidth("8.75em")
                .setHeight("2.5em")
                );
            
            host.xui_ui_div22.append(
                xui.create("xui.UI.Image")
                .setHost(host,"xui_ui_image5")
                .setClassName("xui-uiborder-circle")
                .setLeft("3.125em")
                .setTop("0.625em")
                .setWidth("2.5em")
                .setHeight("2.5em")
                .setPosition("static")
                .setSrc("{/}img/head.jpg")
                );
            
            host.xui_ui_div22.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_space")
                .setWidth("1em")
                .setTabindex(2)
                .setPosition("static")
                );
            
            host.xui_ui_div22.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label3")
                .setTabindex(3)
                .setPosition("static")
                .setCaption("Tom")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF"
                    }
                }
                )
                );
            
            host.xui_ui_div22.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label4")
                .setLeft("0em")
                .setTabindex(4)
                .setPosition("static")
                .setCaption("")
                .setImageClass("xui-icon-sort-checked")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF"
                    }
                }
                )
                );
            
            host.xui_ui_div17.append(
                xui.create("xui.UI.Image")
                .setHost(host,"xui_ui_image4")
                .setLeft("0em")
                .setTop("0.6875em")
                .setWidth("8.4375em")
                .setHeight("2.375em")
                .setSrc("{/}img/logo.png")
                .setCustomStyle({
                    "KEY":{
                        "opacity":0.75
                    }
                }
                )
                );
            
            host.xui_ui_div17.append(
                xui.create("xui.UI.Gallery")
                .setHost(host,"xui_ui_gallery3")
                .setDirtyMark(false)
                .setItems([{
                    "id":"a",
                    "caption":"Search",
                    "imageClass":"xui-icon-search"
                },
                {
                    "id":"b",
                    "caption":"Mail",
                    "imageClass":"xui-uicmd-file",
                    "flagText":"3"
                },
                {
                    "id":"c",
                    "caption":"Message",
                    "imageClass":"xui-uicmd-remove",
                    "flagText":"8"
                }])
                .setTop("0.6875em")
                .setWidth("11em")
                .setHeight("2.75em")
                .setRight("0em")
                .setSelMode("none")
                .setBorderType("none")
                .setIconOnly(true)
                .setImgWidth(32)
                .setImgHeight(32)
                .setValue("")
                .onClick([{
                    "desc":"Action1",
                    "type":"control",
                    "target":"xui_ui_svgpaper10",
                    "params":[],
                    "method":"pop",
                    "conditions":[{
                        "left":"{args[1].id}",
                        "symbol":"=",
                        "right":"a"
                    }]
                }])
                .setCustomStyle({
                    "ITEMS":{
                        "background-color":"transparent",
                        "overflow":"hidden"
                    },
                    "ICON":{
                        "font-size":"2em"
                    },
                    "ITEM":{
                        "background-color":"transparent"
                    }
                }
                )
                );
            
            append(
                xui.create("xui.UI.SVGPaper")
                .setHost(host,"xui_ui_svgpaper1")
                .setLeft("4.375em")
                .setTop("3.75em")
                .setWidth("11.25em")
                .setHeight("1.375em")
                .setZIndex(1002)
                .setOverflow("visible")
                .setGraphicZIndex(2)
            );
            
            host.xui_ui_svgpaper1.append(
                xui.create("xui.UI.List")
                .setHost(host,"xui_ui_list8")
                .setDirtyMark(false)
                .setItems([{
                    "id":"a",
                    "caption":"My Profile",
                    "imageClass":"xui-icon-smill"
                },
                {
                    "id":"b",
                    "caption":"My Account",
                    "imageClass":"xui-uicmd-opt"
                },
                {
                    "id":"c",
                    "caption":"My Calender",
                    "imageClass":"xui-uicmd-datetime"
                },
                {
                    "id":"d",
                    "caption":"My Tasks",
                    "imageClass":"xui-icon-bullet",
                    "disabled":false
                },
                {
                    "id":"e",
                    "type":"split",
                    "caption":"e"
                },
                {
                    "id":"f",
                    "caption":"Log out",
                    "imageClass":"xui-uicmd-popbox"
                }])
                .setClassName("xui-ui-shadow")
                .setLeft("0.625em")
                .setTop("1.25em")
                .setHeight("auto")
                .setSelMode("none")
                .setValue("")
                );
            
            host.xui_ui_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"xui_svg_path1")
                .setSvgTag("Shapes:Triangle")
                .setAttr({
                    "path":"M,21,21L,28,1L,51,21",
                    "stroke":"#B6B6B6",
                    "fill":"#ffffff"
                }
                )
                );
            
            append(
                xui.create("xui.UI.SVGPaper")
                .setHost(host,"xui_ui_svgpaper10")
                .setLeft("42.3125em")
                .setTop("3.5625em")
                .setWidth("17em")
                .setHeight("4.5em")
                .setZIndex(1002)
                .setOverflow("visible")
                .setGraphicZIndex(2)
            );
            
            host.xui_ui_svgpaper10.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block124")
                .setLeft("0em")
                .setTop("1.25em")
                .setWidth("16.875em")
                .setHeight("3.125em")
                .setZIndex(0)
                .setShadow(true)
                .setBorderType("flat")
                .setBackground("#FFFFFF")
                );
            
            host.xui_ui_svgpaper10.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput718")
                .setDirtyMark(false)
                .setLeft("0.625em")
                .setTop("1.875em")
                .setWidth("14.875em")
                .setZIndex(1002)
                .setLabelSize("8em")
                .setLabelPos("none")
                .setLabelCaption("Combo Input")
                .setType("none")
                .setCommandBtn("xui-icon-search")
                );
            
            host.xui_ui_svgpaper10.append(
                xui.create("xui.svg.path")
                .setHost(host,"xui_svg_path10")
                .setSvgTag("Shapes:Triangle")
                .setAttr({
                    "path":"M,140,21L,133,1L,110,21",
                    "stroke":"#B6B6B6",
                    "fill":"#ffffff"
                }
                )
                );
            
            append(
                xui.create("xui.UI.ButtonViews")
                .setHost(host,"xui_ui_buttonviews2")
                .setItems([{
                    "id":"a",
                    "caption":"Dashboard",
                    "image":"",
                    "imageBgSize":"",
                    "imageClass":"fa fa-lg fa-dashboard"
                },
                {
                    "id":"b",
                    "caption":"Forms",
                    "image":"",
                    "imageBgSize":"",
                    "imageClass":"fa fa-lg fa-wpforms"
                },
                {
                    "id":"c",
                    "caption":"Charts",
                    "image":"",
                    "imageBgSize":"",
                    "imageClass":"fa fa-lg fa-area-chart"
                },
                {
                    "id":"d",
                    "caption":"File Manager",
                    "image":"",
                    "imageBgSize":"",
                    "imageClass":"fa fa-lg fa-folder-open-o",
                    "closeBtn":false,
                    "optBtn":false,
                    "popBtn":false
                }])
                .setLeft("0em")
                .setTop("0em")
                .setBarLocation("left")
                .setBarSize("10em")
                .setValue("a")
                .onItemSelected([{
                    "desc":"Action 1",
                    "type":"control",
                    "target":"xui_ui_treeview12",
                    "params":["files"],
                    "method":"fireItemClickEvent",
                    "conditions":[{
                        "left":"{args[1].id}",
                        "symbol":"=",
                        "right":"d"
                    }]
                }])
            );
            
            host.xui_ui_buttonviews2.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div21")
                .setDock("fill")
                .setLeft("13.125em")
                .setTop("4.375em")
                .setConDockPadding({
                    "left":10,
                    "top":10,
                    "right":10,
                    "bottom":10
                }
                )
                .setConDockSpacing({
                    "width":10,
                    "height":10
                }
                )
                .setConDockFlexFill("none")
                .setConDockStretch("0.5")
                , "c");
            
            host.xui_ui_div21.append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel4")
                .setDock("top")
                .setDockMinW("12em")
                .setDockStretch("0.4")
                .setLeft("2.9375em")
                .setWidth("21.25em")
                .setHeight("24.375em")
                .setCaption("Pie")
                .setImageClass("fa fa-lg fa-pie-chart")
                .setToggleBtn(true)
                );
            
            host.xui_ui_panel4.append(
                xui.create("xui.UI.FusionChartsXT")
                .setHost(host,"xui_ui_fusionchartsxt1")
                .setDock("fill")
                .setLeft("2.5em")
                .setTop("3.125em")
                .setWidth("19.6875em")
                .setHeight("21.125em")
                .setChartType("Pie2D")
                .setJSONData({
                    "chart":{
                        "caption":"Monthly Sales Summary",
                        "subcaption":"For the year 2006",
                        "xaxisname":"Month",
                        "yaxisname":"Sales",
                        "numberprefix":"$",
                        "useroundedges":"1",
                        "bgcolor":"FFFFFF,FFFFFF",
                        "showborder":"0",
                        "enablerotation":"0",
                        "animation":"0"
                    },
                    "data":[{
                        "label":"January",
                        "value":"17400"
                    },
                    {
                        "label":"February",
                        "value":"19800"
                    },
                    {
                        "label":"March",
                        "value":"21800"
                    },
                    {
                        "label":"April",
                        "value":"23800"
                    },
                    {
                        "label":"May",
                        "value":"29600"
                    },
                    {
                        "label":"June",
                        "value":"27600"
                    }]
                }
                )
                );
            
            host.xui_ui_div21.append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel9")
                .setDock("top")
                .setDockMinW("18em")
                .setDockStretch("0.6")
                .setLeft("3.75em")
                .setWidth("21.25em")
                .setHeight("24.375em")
                .setCaption("Column")
                .setImageClass("fa fa-lg fa-bar-chart")
                .setToggleBtn(true)
                );
            
            host.xui_ui_panel9.append(
                xui.create("xui.UI.FusionChartsXT")
                .setHost(host,"xui_ui_fusionchartsxt13")
                .setDock("fill")
                .setLeft("5.625em")
                .setTop("3.125em")
                .setHeight("21.125em")
                .setChartType("MSColumn2D")
                .setJSONData({
                    "chart":{
                        "caption":"Business Results 2005 v 2006",
                        "xaxisname":"Month",
                        "yaxisname":"Revenue",
                        "showvalues":"0",
                        "numberprefix":"$",
                        "useroundedges":"0",
                        "animation":"0",
                        "bgcolor":"FFFFFF",
                        "borderthickness":"0",
                        "showborder":"0",
                        "canvasborderthickness":"1"
                    },
                    "categories":[{
                        "category":[{
                            "label":"Jan"
                        },
                        {
                            "label":"Feb"
                        },
                        {
                            "label":"Mar"
                        },
                        {
                            "label":"Apr"
                        },
                        {
                            "label":"May"
                        },
                        {
                            "label":"Jun"
                        },
                        {
                            "vline":"1",
                            "color":"FF5904",
                            "thickness":"2"
                        },
                        {
                            "label":"July"
                        }]
                    }],
                    "dataset":[{
                        "seriesname":"2006",
                        "data":[{
                            "value":"27400"
                        },
                        {
                            "value":"29800"
                        },
                        {
                            "value":"25800"
                        },
                        {
                            "value":"26800"
                        },
                        {
                            "value":"29600"
                        },
                        {
                            "value":"32600"
                        },
                        {
                            "value":"31800"
                        }]
                    },
                    {
                        "seriesname":"2005",
                        "data":[{
                            "value":"10000"
                        },
                        {
                            "value":"11500"
                        },
                        {
                            "value":"12500"
                        },
                        {
                            "value":"15000"
                        },
                        {
                            "value":"11000"
                        },
                        {
                            "value":"9800"
                        },
                        {
                            "value":"11800"
                        }]
                    }],
                    "trendlines":[{
                        "line":[{
                            "startvalue":"26000",
                            "color":"91C728",
                            "displayvalue":"Target",
                            "showontop":"1"
                        }]
                    }],
                    "annotations":{
                        "groups":[{
                            "items":[{
                                "type":"text"
                            }]
                        }]
                    }
                }
                )
                );
            
            host.xui_ui_div21.append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel10")
                .setDock("top")
                .setDockMinW("18em")
                .setDockStretch(".6")
                .setLeft("3.75em")
                .setWidth("21.25em")
                .setHeight("19.375em")
                .setCaption("Lines")
                .setImageClass("fa fa-lg fa-line-chart")
                .setToggleBtn(true)
                );
            
            host.xui_ui_panel10.append(
                xui.create("xui.UI.FusionChartsXT")
                .setHost(host,"xui_ui_fusionchartsxt12")
                .setDock("fill")
                .setLeft("1.25em")
                .setTop("1.875em")
                .setWidth("29.9375em")
                .setHeight("16.125em")
                .setChartType("MSLine")
                .setJSONData({
                    "chart":{
                        "caption":"Business Results 2005 v 2006",
                        "xaxisname":"Month",
                        "yaxisname":"Revenue",
                        "showvalues":"0",
                        "numberprefix":"$",
                        "useroundedges":"1",
                        "animation":"0",
                        "borderthickness":"0",
                        "bgcolor":"FFFFFF",
                        "showshadow":"0",
                        "canvasborderthickness":"1"
                    },
                    "categories":[{
                        "category":[{
                            "label":"Jan"
                        },
                        {
                            "label":"Feb"
                        },
                        {
                            "label":"Mar"
                        },
                        {
                            "label":"Apr"
                        },
                        {
                            "label":"May"
                        },
                        {
                            "label":"Jun"
                        },
                        {
                            "vline":"1",
                            "color":"FF5904",
                            "thickness":"2"
                        },
                        {
                            "label":"July"
                        }]
                    }],
                    "dataset":[{
                        "seriesname":"2006",
                        "data":[{
                            "value":"27400"
                        },
                        {
                            "value":"29800"
                        },
                        {
                            "value":"25800"
                        },
                        {
                            "value":"26800"
                        },
                        {
                            "value":"29600"
                        },
                        {
                            "value":"32600"
                        },
                        {
                            "value":"31800"
                        }]
                    },
                    {
                        "seriesname":"2005",
                        "data":[{
                            "value":"10000"
                        },
                        {
                            "value":"11500"
                        },
                        {
                            "value":"12500"
                        },
                        {
                            "value":"15000"
                        },
                        {
                            "value":"11000"
                        },
                        {
                            "value":"9800"
                        },
                        {
                            "value":"11800"
                        }]
                    }],
                    "trendlines":[{
                        "line":[{
                            "startvalue":"26000",
                            "color":"91C728",
                            "displayvalue":"Target",
                            "showontop":"1"
                        }]
                    }],
                    "annotations":{
                        "groups":[{
                            "items":[{
                                "type":"text"
                            }]
                        }]
                    }
                }
                )
                );
            
            host.xui_ui_div21.append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel11")
                .setDock("top")
                .setDockMinW("12em")
                .setDockStretch(".4")
                .setLeft("3.75em")
                .setWidth("21.25em")
                .setHeight("19.375em")
                .setCaption("Radar")
                .setToggleBtn(true)
                );
            
            host.xui_ui_panel11.append(
                xui.create("xui.UI.FusionChartsXT")
                .setHost(host,"xui_ui_fusionchartsxt11")
                .setDock("fill")
                .setLeft("3.75em")
                .setTop("1.25em")
                .setWidth("19.75em")
                .setHeight("16.125em")
                .setChartType("Radar")
                .setJSONData({
                    "chart":{
                        "caption":"Radar Chart",
                        "anchoralpha":"0",
                        "showborder":"0",
                        "animation":"0",
                        "bgcolor":"FFFFFF"
                    },
                    "categories":[{
                        "category":[{
                            "label":"Index 1"
                        },
                        {
                            "label":"Index 2"
                        },
                        {
                            "label":"Index 3"
                        },
                        {
                            "label":"Index 4"
                        },
                        {
                            "label":"Index 5"
                        },
                        {
                            "label":"Index 6"
                        },
                        {
                            "label":"Index 7"
                        },
                        {
                            "label":"Index 8"
                        },
                        {
                            "label":"Index 9"
                        },
                        {
                            "label":"Index 10"
                        },
                        {
                            "label":"Index 11"
                        }]
                    }],
                    "dataset":[{
                        "seriesname":"Series 1",
                        "data":[{
                            "value":"9"
                        },
                        {
                            "value":"9"
                        },
                        {
                            "value":"9"
                        },
                        {
                            "value":"7"
                        },
                        {
                            "value":"8"
                        },
                        {
                            "value":"8"
                        },
                        {
                            "value":"9"
                        },
                        {
                            "value":"9"
                        },
                        {
                            "value":"9"
                        },
                        {
                            "value":"7"
                        },
                        {
                            "value":"8"
                        }]
                    },
                    {
                        "seriesname":"Series 2",
                        "data":[{
                            "value":"5"
                        },
                        {
                            "value":"3"
                        },
                        {
                            "value":"2"
                        },
                        {
                            "value":"4"
                        },
                        {
                            "value":"5"
                        },
                        {
                            "value":"9"
                        },
                        {
                            "value":"5"
                        },
                        {
                            "value":"3"
                        },
                        {
                            "value":"2"
                        },
                        {
                            "value":"4"
                        },
                        {
                            "value":"5"
                        }]
                    }]
                }
                )
                );
            
            host.xui_ui_buttonviews2.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div44")
                .setDock("fill")
                .setLeft("14em")
                .setTop("5.25em")
                .setConDockPadding({
                    "left":10,
                    "top":10,
                    "right":10,
                    "bottom":10
                }
                )
                .setConDockSpacing({
                    "width":10,
                    "height":10
                }
                )
                .setConDockFlexFill("width")
                , "b");
            
            host.xui_ui_div44.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div55")
                .setDock("top")
                .setDockStretch("0.5")
                .setWidth("16.25em")
                .setHeight("auto")
                .setOverflow("visible")
                .setConDockSpacing({
                    "width":0,
                    "height":10
                }
                )
                );
            
            host.xui_ui_div55.append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel33")
                .setDock("top")
                .setDockMinW("12em")
                .setLeft("2.9375em")
                .setWidth("21.25em")
                .setHeight("16.875em")
                .setConDockRelative(true)
                .setConDockPadding({
                    "left":8,
                    "top":8,
                    "right":8,
                    "bottom":8
                }
                )
                .setConDockSpacing({
                    "width":0,
                    "height":16
                }
                )
                .setCaption("Users")
                .setImageClass("fa fa-lg fa-user")
                .setToggleBtn(true)
                .setCloseBtn(true)
                .setRefreshBtn(true)
                );
            
            host.xui_ui_panel33.append(
                xui.create("xui.UI.Input")
                .setHost(host,"xui_ui_input17")
                .setDirtyMark(false)
                .setLeft("6.25em")
                .setWidth("24.8125em")
                .setPosition("relative")
                .setLabelSize("8em")
                .setLabelCaption("First Name")
                );
            
            host.xui_ui_panel33.append(
                xui.create("xui.UI.Input")
                .setHost(host,"xui_ui_input19")
                .setDirtyMark(false)
                .setLeft("2.5em")
                .setWidth("24.8125em")
                .setPosition("relative")
                .setLabelSize("8em")
                .setLabelCaption("Last Name")
                );
            
            host.xui_ui_panel33.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput106")
                .setDirtyMark(false)
                .setLeft("9.375em")
                .setWidth("24.8125em")
                .setPosition("relative")
                .setLabelSize("8em")
                .setLabelCaption("Date of Birth")
                .setType("date")
                );
            
            host.xui_ui_panel33.append(
                xui.create("xui.UI.Input")
                .setHost(host,"xui_ui_input20")
                .setDirtyMark(false)
                .setLeft("3.125em")
                .setWidth("24.8125em")
                .setPosition("relative")
                .setLabelSize("8em")
                .setLabelCaption("Phone Number")
                );
            
            host.xui_ui_panel33.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block20")
                .setDock("bottom")
                .setDockFloat(true)
                .setLeft("4.833333333333333em")
                .setHeight("3em")
                .setOverflow("hidden")
                );
            
            host.xui_ui_block20.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button19")
                .setDirtyMark(false)
                .setLeft("1.8125em")
                .setTop("0.625em")
                .setWidth("4.9375em")
                .setCaption("Reset")
                );
            
            host.xui_ui_block20.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button20")
                .setDirtyMark(false)
                .setLeft("8em")
                .setTop("0.625em")
                .setWidth("4.9375em")
                .setCaption("Save")
                );
            
            host.xui_ui_div55.append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel35")
                .setDock("top")
                .setDockMinW("18em")
                .setLeft("3.75em")
                .setWidth("21.25em")
                .setHeight("26.3125em")
                .setConDockRelative(true)
                .setConDockPadding({
                    "left":10,
                    "top":10,
                    "right":10,
                    "bottom":10
                }
                )
                .setConDockSpacing({
                    "width":10,
                    "height":10
                }
                )
                .setCaption("Tasks")
                .setImageClass("fa fa-lg fa-tasks")
                .setToggleBtn(true)
                .setTagCmds([{
                    "id":"a",
                    "type":"text",
                    "itemClass":"xuicon xui-uicmd-file"
                },
                {
                    "id":"b",
                    "itemClass":"xuicon xui-icon-print"
                }])
                );
            
            host.xui_ui_panel35.append(
                xui.create("xui.UI.Input")
                .setHost(host,"xui_ui_input61")
                .setDirtyMark(false)
                .setWidth("24.8125em")
                .setPosition("relative")
                .setLabelSize("8em")
                .setLabelCaption("Title")
                );
            
            host.xui_ui_panel35.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput693")
                .setDirtyMark(false)
                .setWidth("24.8125em")
                .setPosition("relative")
                .setLabelSize("8em")
                .setLabelCaption("Start Date")
                .setType("date")
                );
            
            host.xui_ui_panel35.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput697")
                .setDirtyMark(false)
                .setWidth("24.8125em")
                .setPosition("relative")
                .setLabelSize("8em")
                .setLabelCaption("End Date")
                .setType("date")
                );
            
            host.xui_ui_panel35.append(
                xui.create("xui.UI.CheckBox")
                .setHost(host,"xui_ui_checkbox1")
                .setDirtyMark(false)
                .setWidth("24.8125em")
                .setPosition("relative")
                .setHAlign("right")
                .setIconPos("right")
                .setCaption("All Day")
                );
            
            host.xui_ui_panel35.append(
                xui.create("xui.UI.Input")
                .setHost(host,"xui_ui_input66")
                .setDirtyMark(false)
                .setWidth("24.8125em")
                .setHeight("10em")
                .setPosition("relative")
                .setLabelSize("8em")
                .setLabelCaption("Memo")
                .setMultiLines(true)
                );
            
            host.xui_ui_panel35.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block135")
                .setDock("bottom")
                .setDockFloat(true)
                .setLeft("4.833333333333333em")
                .setHeight("3em")
                .setOverflow("hidden")
                );
            
            host.xui_ui_block135.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button100")
                .setDirtyMark(false)
                .setLeft("2.4375em")
                .setTop("0.625em")
                .setWidth("4.9375em")
                .setCaption("Reset")
                );
            
            host.xui_ui_block135.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button101")
                .setDirtyMark(false)
                .setLeft("8.625em")
                .setTop("0.625em")
                .setWidth("4.9375em")
                .setCaption("Save")
                );
            
            host.xui_ui_div44.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div61")
                .setDock("top")
                .setDockStretch("0.5")
                .setWidth("15.625em")
                .setHeight("auto")
                .setOverflow("visible")
                .setConDockSpacing({
                    "width":0,
                    "height":10
                }
                )
                );
            
            host.xui_ui_div61.append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel34")
                .setDock("top")
                .setDockMinW("18em")
                .setLeft("3.75em")
                .setWidth("21.25em")
                .setHeight("18.75em")
                .setConDockRelative(true)
                .setConDockPadding({
                    "left":10,
                    "top":10,
                    "right":10,
                    "bottom":10
                }
                )
                .setConDockSpacing({
                    "width":10,
                    "height":10
                }
                )
                .setCaption("Style")
                .setImageClass("fa fa-lg fa-paint-brush")
                .setToggleBtn(true)
                );
            
            host.xui_ui_panel34.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput62")
                .setDirtyMark(false)
                .setWidth("24.875em")
                .setPosition("relative")
                .setLabelSize("12em")
                .setLabelCaption("Font Family")
                .setType("listbox")
                .setItems([{
                    "id":"Arail",
                    "caption":"Arail",
                    "imageClass":""
                },
                {
                    "id":"Verdada",
                    "caption":"Verdada",
                    "imageClass":"",
                    "disabled":false
                }])
                );
            
            host.xui_ui_panel34.append(
                xui.create("xui.UI.RadioBox")
                .setHost(host,"xui_ui_radiobox1")
                .setDirtyMark(false)
                .setItems([{
                    "id":"400",
                    "caption":"400",
                    "imageClass":""
                },
                {
                    "id":"700",
                    "caption":"700",
                    "imageClass":""
                },
                {
                    "id":"900",
                    "caption":"900",
                    "imageClass":""
                }])
                .setWidth("24.875em")
                .setHeight("auto")
                .setPosition("relative")
                .setLabelSize("12em")
                .setLabelCaption("Font Weight")
                .setValue("400")
                );
            
            host.xui_ui_panel34.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput473")
                .setDirtyMark(false)
                .setWidth("24.875em")
                .setPosition("relative")
                .setLabelSize("12em")
                .setLabelCaption("Front Color")
                .setType("color")
                );
            
            host.xui_ui_panel34.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput477")
                .setDirtyMark(false)
                .setWidth("24.875em")
                .setPosition("relative")
                .setLabelSize("12em")
                .setLabelCaption("Background Color")
                .setType("color")
                );
            
            host.xui_ui_panel34.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block134")
                .setDock("bottom")
                .setDockFloat(true)
                .setLeft("4.833333333333333em")
                .setHeight("3em")
                .setOverflow("hidden")
                );
            
            host.xui_ui_block134.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button98")
                .setDirtyMark(false)
                .setLeft("1.1875em")
                .setTop("0.625em")
                .setWidth("4.9375em")
                .setCaption("Reset")
                );
            
            host.xui_ui_block134.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button99")
                .setDirtyMark(false)
                .setLeft("7.375em")
                .setTop("0.625em")
                .setWidth("4.9375em")
                .setCaption("Save")
                );
            
            host.xui_ui_div61.append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel36")
                .setDock("top")
                .setDockMinW("12em")
                .setLeft("3.75em")
                .setWidth("21.25em")
                .setHeight("19.375em")
                .setConDockRelative(true)
                .setConDockPadding({
                    "left":10,
                    "top":10,
                    "right":10,
                    "bottom":10
                }
                )
                .setConDockSpacing({
                    "width":10,
                    "height":10
                }
                )
                .setCaption("Project")
                .setImageClass("fa fa-lg fa-star")
                .setToggleBtn(true)
                );
            
            host.xui_ui_panel36.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block11")
                .setDock("bottom")
                .setDockFloat(true)
                .setLeft("4em")
                .setHeight("3em")
                .setOverflow("hidden")
                );
            
            host.xui_ui_block11.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button5")
                .setDirtyMark(false)
                .setLeft("1.4375em")
                .setTop("0.625em")
                .setWidth("4.9375em")
                .setImageClass("xui-icon-doubleleft")
                .setCaption("Prev")
                );
            
            host.xui_ui_block11.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button6")
                .setDirtyMark(false)
                .setLeft("8.6875em")
                .setTop("0.625em")
                .setWidth("4.9375em")
                .setImageClass("xui-icon-doubleright")
                .setCaption("Next")
                );
            
            host.xui_ui_panel36.append(
                xui.create("xui.UI.Slider")
                .setHost(host,"xui_ui_slider1")
                .setDirtyMark(false)
                .setLeft("2.5em")
                .setTop("6.875em")
                .setWidth("24.875em")
                .setHeight("1.8125em")
                .setPosition("relative")
                .setIsRange(false)
                .setLabelSize("12em")
                .setLabelGap("0.25em")
                .setLabelCaption("Project 1")
                .setLabelHAlign("left")
                .setValue("25")
                );
            
            host.xui_ui_panel36.append(
                xui.create("xui.UI.Slider")
                .setHost(host,"xui_ui_slider7")
                .setDirtyMark(false)
                .setLeft("3.3333333333333335em")
                .setTop("7.75em")
                .setWidth("24.875em")
                .setHeight("1.8125em")
                .setPosition("relative")
                .setIsRange(false)
                .setLabelSize("12em")
                .setLabelGap("0.25em")
                .setLabelCaption("Project  2")
                .setLabelHAlign("left")
                .setValue("45")
                );
            
            host.xui_ui_panel36.append(
                xui.create("xui.UI.Slider")
                .setHost(host,"xui_ui_slider8")
                .setDirtyMark(false)
                .setLeft("4.166666666666667em")
                .setTop("8.583333333333334em")
                .setWidth("24.875em")
                .setHeight("1.8125em")
                .setPosition("relative")
                .setIsRange(false)
                .setLabelSize("12em")
                .setLabelGap("0.25em")
                .setLabelCaption("Project 3")
                .setLabelHAlign("left")
                .setValue("48")
                );
            
            host.xui_ui_panel36.append(
                xui.create("xui.UI.Slider")
                .setHost(host,"xui_ui_slider9")
                .setDirtyMark(false)
                .setLeft("5em")
                .setTop("9.416666666666666em")
                .setWidth("24.875em")
                .setHeight("1.8125em")
                .setPosition("relative")
                .setLabelSize("12em")
                .setLabelGap("0.25em")
                .setLabelCaption("Project 4")
                .setLabelHAlign("left")
                .setValue("20:80")
                );
            
            host.xui_ui_panel36.append(
                xui.create("xui.UI.Slider")
                .setHost(host,"xui_ui_slider10")
                .setDirtyMark(false)
                .setLeft("5.833333333333333em")
                .setTop("10.25em")
                .setWidth("24.875em")
                .setHeight("1.8125em")
                .setPosition("relative")
                .setLabelSize("12em")
                .setLabelGap("0.25em")
                .setLabelCaption("Project 5")
                .setLabelHAlign("left")
                .setValue("20:60")
                );
            
            host.xui_ui_buttonviews2.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div33")
                .setDock("fill")
                .setLeft("11.25em")
                .setTop("11.875em")
                .setConDockPadding({
                    "left":10,
                    "top":10,
                    "right":10,
                    "bottom":10
                }
                )
                .setConDockSpacing({
                    "width":10,
                    "height":10
                }
                )
                , "d");
            
            host.xui_ui_div33.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block30")
                .setDock("top")
                .setLeft("5.625em")
                .setTop("8.125em")
                .setHeight("3.3125em")
                .setBorderType("flat")
                .setBackground("#FFFFFF")
                .setOverflow("hidden")
                );
            
            host.xui_ui_block30.append(
                xui.create("xui.UI.StatusButtons")
                .setHost(host,"xui_ui_statusbuttons1")
                .setDirtyMark(false)
                .setItems([{
                    "id":"new",
                    "caption":"New Folder",
                    "imageClass":"xui-icon-file-fold"
                },
                {
                    "id":"rename",
                    "caption":"Rename",
                    "imageClass":"fa fa-lg fa-edit"
                },
                {
                    "id":"refresh",
                    "caption":"Refresh",
                    "imageClass":"xui-uicmd-refresh"
                },
                {
                    "id":"del",
                    "caption":"Delete",
                    "imageClass":"xui-uicmd-delete"
                }])
                .setLeft("0.625em")
                .setTop("0.25em")
                .setWidth("31.875em")
                .setSelMode("none")
                .setBorderType("none")
                .setItemMargin("2px 4px")
                .setValue("")
                .onItemSelected([{
                    "desc":"new",
                    "type":"control",
                    "target":"xui_ui_treeview12",
                    "params":[[{
                        "id":"?",
                        "caption":"new Folder",
                        "imageClass":"xui-icon-file-fold"
                    }],true,"",false],
                    "method":"insertItems",
                    "conditions":[{
                        "left":"{args[1].id}",
                        "symbol":"=",
                        "right":"new"
                    }]
                },
                {
                    "desc":"rename",
                    "type":"control",
                    "target":"xui_ui_treeview12",
                    "params":[null],
                    "method":"editItem",
                    "conditions":[{
                        "left":"{args[1].id}",
                        "symbol":"=",
                        "right":"rename"
                    }]
                },
                {
                    "desc":"del",
                    "type":"control",
                    "target":"xui_ui_treeview12",
                    "params":[],
                    "method":"removeItems",
                    "conditions":[{
                        "left":"{args[1].id}",
                        "symbol":"=",
                        "right":"del"
                    }]
                },
                {
                    "desc":"del-2",
                    "type":"control",
                    "target":"xui_ui_gallery10",
                    "params":[],
                    "method":"clearItems",
                    "conditions":[{
                        "left":"{args[1].id}",
                        "symbol":"=",
                        "right":"del"
                    }]
                }])
                );
            
            host.xui_ui_block30.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button59")
                .setDirtyMark(false)
                .setTop("0.3125em")
                .setHeight("2.5em")
                .setRight("1em")
                .setImageClass("xui-icon-upload")
                .setCaption("Upload")
                .onClick([{
                    "desc":"sel file",
                    "type":"other",
                    "target":"url",
                    "params":[],
                    "method":"selectFile",
                    "onOK":0
                },
                {
                    "desc":"alert name",
                    "type":"other",
                    "target":"msg",
                    "params":["File","{temp.okData.value}"],
                    "method":"alert",
                    "onOK":2
                }])
                );
            
            host.xui_ui_div33.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block41")
                .setDock("fill")
                .setLeft("20.625em")
                .setTop("10.625em")
                .setWidth("12.5em")
                .setBorderType("flat")
                .setBackground("transparent")
                );
            
            host.xui_ui_block41.append(
                xui.create("xui.UI.Layout")
                .setHost(host,"xui_ui_layout11")
                .setItems([{
                    "id":"before",
                    "pos":"before",
                    "size":200,
                    "min":10,
                    "locked":false,
                    "folded":false,
                    "hidden":false,
                    "cmd":false
                },
                {
                    "id":"main",
                    "size":80,
                    "min":10
                },
                {
                    "id":"after",
                    "pos":"after",
                    "size":80,
                    "min":10,
                    "locked":false,
                    "folded":false,
                    "hidden":true,
                    "cmd":false
                }])
                .setLeft("0em")
                .setTop("0em")
                .setType("horizontal")
                .setCustomStyle({
                    "MOVE":{
                        "color":"transparent",
                        "border":"none"
                    }
                }
                )
                );
            
            host.xui_ui_layout11.append(
                xui.create("xui.UI.TreeView")
                .setHost(host,"xui_ui_treeview12")
                .setDirtyMark(false)
                .setItems([{
                    "id":"files",
                    "caption":"Files",
                    "iniFold":false,
                    "sub":[{
                        "id":"doc",
                        "caption":"Documents",
                        "imageClass":"",
                        "sub":[{
                            "id":"pdf",
                            "caption":"Pdf",
                            "imageClass":"xui-icon-file-fold"
                        },
                        {
                            "id":"excel",
                            "caption":"Excel",
                            "imageClass":"xui-icon-file-fold"
                        },
                        {
                            "id":"word",
                            "caption":"Word",
                            "imageClass":"xui-icon-file-fold"
                        },
                        {
                            "id":"ppt",
                            "caption":"Ppt",
                            "imageClass":"xui-icon-file-fold"
                        },
                        {
                            "id":"txt",
                            "caption":"Txt",
                            "imageClass":"xui-icon-file-fold"
                        }]
                    },
                    {
                        "id":"img",
                        "caption":"Images",
                        "imageClass":"xui-icon-file-fold"
                    },
                    {
                        "id":"video",
                        "caption":"Videos",
                        "imageClass":"xui-icon-file-fold"
                    },
                    {
                        "id":"prj",
                        "caption":"Projects",
                        "imageClass":"xui-icon-file-fold"
                    }]
                }])
                .setLeft("0em")
                .setTop("0em")
                .setWidth("14.0625em")
                .setIniFold(false)
                .setValue("")
                .onDblclick([{
                    "desc":"Action 1",
                    "type":"control",
                    "target":"xui_ui_treeview12",
                    "params":[null],
                    "method":"editItem"
                }])
                .onItemSelected([{
                    "desc":"assign",
                    "type":"other",
                    "target":"var",
                    "params":["temp1","[data]data/folders.json","{args[1].id}"],
                    "method":"temp"
                },
                {
                    "desc":"clear",
                    "type":"control",
                    "target":"xui_ui_gallery10",
                    "params":[],
                    "method":"clearItems"
                },
                {
                    "desc":"add",
                    "type":"other",
                    "target":"callback",
                    "params":["{page.xui_ui_gallery10.setItems}",undefined,undefined,"{temp.temp1}"],
                    "method":"call"
                }])
                , "before");
            
            host.xui_ui_layout11.append(
                xui.create("xui.UI.Gallery")
                .setHost(host,"xui_ui_gallery10")
                .setDirtyMark(false)
                .setDock("fill")
                .setLeft("9.375em")
                .setTop("11.875em")
                .setBorderType("none")
                .setAutoItemSize(false)
                .setIconFontSize("3em")
                .setItemMargin(18)
                .setItemPadding(12)
                .setItemWidth("5em")
                .setItemHeight("5em")
                .setValue("a")
                .onDblclick([{
                    "desc":"Action 1",
                    "type":"control",
                    "target":"xui_ui_treeview12",
                    "params":["{args[1].id}"],
                    "method":"fireItemClickEvent"
                }])
                , "main");
            
            host.xui_ui_buttonviews2.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div26")
                .setDock("fill")
                .setConDockPadding({
                    "left":12,
                    "top":12,
                    "right":12,
                    "bottom":12
                }
                )
                .setConDockSpacing({
                    "width":12,
                    "height":12
                }
                )
                , "a");
            
            host.xui_ui_div26.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div43")
                .setDock("top")
                .setDockMinW("8em")
                .setDockStretch("0.25")
                .setHeight("6.75em")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "background-color":"#A693EB"
                    }
                }
                )
                );
            
            host.xui_ui_div43.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div84")
                .setTop("0.1875em")
                .setWidth("6.75em")
                .setHeight("5em")
                .setRight("0em")
                );
            
            host.xui_ui_div84.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span44")
                .setLeft("0.625em")
                .setTop("0em")
                .setWidth("auto")
                .setHeight("auto")
                .setZIndex(1002)
                .setHtml("12")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "font-size":"2em"
                    }
                }
                )
                );
            
            host.xui_ui_div84.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span45")
                .setLeft("1.25em")
                .setTop("2.5em")
                .setWidth("auto")
                .setZIndex(1002)
                .setHtml("New Users")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "font-size":"1em"
                    }
                }
                )
                );
            
            host.xui_ui_div43.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div86")
                .setDock("bottom")
                .setLeft("3.125em")
                .setTop("5.625em")
                .setWidth("auto")
                .setHeight("1.6875em")
                .setHtml("&gt;&gt; View more")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "background-color":"#9E8CE0",
                        "font-size":".75em",
                        "text-align":"center",
                        "cursor":"pointer"
                    }
                }
                )
                );
            
            host.xui_ui_div43.append(
                xui.create("xui.UI.Icon")
                .setHost(host,"xui_ui_label40")
                .setLeft("0.3125em")
                .setTop("1.25em")
                .setWidth("6.5625em")
                .setHeight("4.125em")
                .setZIndex(0)
                .setImageClass("fa fa-lg fa-users")
                .setIconFontSize("4em")
                .setIconColor("#B4A4EE")
                );
            
            host.xui_ui_div26.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div89")
                .setDock("top")
                .setDockOrder(2)
                .setDockMinW("8em")
                .setDockStretch("0.25")
                .setHeight("6.75em")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "background-color":"#A693EB"
                    }
                }
                )
                );
            
            host.xui_ui_div89.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div90")
                .setTop("0.1875em")
                .setWidth("6.75em")
                .setHeight("5em")
                .setRight("0em")
                );
            
            host.xui_ui_div90.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span48")
                .setLeft("0.625em")
                .setTop("0em")
                .setWidth("auto")
                .setHeight("auto")
                .setZIndex(1002)
                .setHtml("25")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "font-size":"2em"
                    }
                }
                )
                );
            
            host.xui_ui_div90.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span49")
                .setLeft("1.25em")
                .setTop("2.5em")
                .setWidth("auto")
                .setZIndex(1002)
                .setHtml("New Orders")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "font-size":"1em"
                    }
                }
                )
                );
            
            host.xui_ui_div89.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div91")
                .setDock("bottom")
                .setLeft("3.125em")
                .setTop("5.625em")
                .setWidth("auto")
                .setHeight("1.6875em")
                .setHtml("&gt;&gt; View more")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "background-color":"#9E8CE0",
                        "font-size":".75em",
                        "text-align":"center",
                        "cursor":"pointer"
                    }
                }
                )
                );
            
            host.xui_ui_div89.append(
                xui.create("xui.UI.Icon")
                .setHost(host,"xui_ui_label41")
                .setLeft("0.5625em")
                .setTop("1.0625em")
                .setWidth("5.625em")
                .setHeight("4.5625em")
                .setZIndex(0)
                .setImageClass("fa fa-lg fa-wpforms")
                .setIconFontSize("4em")
                .setIconColor("#B4A4EE")
                );
            
            host.xui_ui_div26.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div92")
                .setDock("top")
                .setDockOrder(3)
                .setDockMinW("8em")
                .setDockStretch("0.25")
                .setHeight("6.75em")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "background-color":"#F19B60"
                    }
                }
                )
                );
            
            host.xui_ui_div92.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div93")
                .setTop("0.1875em")
                .setWidth("6.75em")
                .setHeight("5em")
                .setRight("0em")
                .setZIndex(1002)
                );
            
            host.xui_ui_div93.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span50")
                .setLeft("0.625em")
                .setTop("0em")
                .setWidth("auto")
                .setHeight("auto")
                .setHtml("32")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "font-size":"2em"
                    }
                }
                )
                );
            
            host.xui_ui_div93.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span51")
                .setLeft("1.25em")
                .setTop("2.5em")
                .setWidth("auto")
                .setHtml("Messages")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "font-size":"1em"
                    }
                }
                )
                );
            
            host.xui_ui_div92.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div94")
                .setDock("bottom")
                .setLeft("3.125em")
                .setTop("5.625em")
                .setWidth("auto")
                .setHeight("1.6875em")
                .setHtml("&gt;&gt; View more")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "background-color":"#E6945C",
                        "font-size":".75em",
                        "text-align":"center",
                        "cursor":"pointer"
                    }
                }
                )
                );
            
            host.xui_ui_div92.append(
                xui.create("xui.UI.Icon")
                .setHost(host,"xui_ui_label42")
                .setLeft("0.5625em")
                .setTop("1.25em")
                .setWidth("5.625em")
                .setHeight("3.9375em")
                .setZIndex(0)
                .setImageClass("fa fa-lg fa-info-circle")
                .setIconFontSize("4em")
                .setIconColor("#F3AB7A")
                );
            
            host.xui_ui_div26.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div95")
                .setDock("top")
                .setDockOrder(4)
                .setDockMinW("8em")
                .setDockStretch("0.25")
                .setHeight("6.75em")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "background-color":"#49CD81"
                    }
                }
                )
                );
            
            host.xui_ui_div95.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div96")
                .setTop("0.1875em")
                .setWidth("6.75em")
                .setHeight("5em")
                .setRight("0em")
                );
            
            host.xui_ui_div96.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span52")
                .setLeft("0.625em")
                .setTop("0em")
                .setWidth("auto")
                .setHeight("auto")
                .setZIndex(1002)
                .setHtml("8")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "font-size":"2em"
                    }
                }
                )
                );
            
            host.xui_ui_div96.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span53")
                .setLeft("1.25em")
                .setTop("2.5em")
                .setWidth("auto")
                .setZIndex(1002)
                .setHtml("New Tasks")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "font-size":"1em"
                    }
                }
                )
                );
            
            host.xui_ui_div95.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div97")
                .setDock("bottom")
                .setLeft("3.125em")
                .setTop("5.625em")
                .setWidth("auto")
                .setHeight("1.6875em")
                .setHtml("&gt;&gt; View more")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "background-color":"#46C37B",
                        "font-size":".75em",
                        "text-align":"center",
                        "cursor":"pointer"
                    }
                }
                )
                );
            
            host.xui_ui_div95.append(
                xui.create("xui.UI.Icon")
                .setHost(host,"xui_ui_label43")
                .setLeft("0em")
                .setTop("1.25em")
                .setWidth("5.625em")
                .setHeight("5em")
                .setZIndex(0)
                .setImageClass("fa fa-lg fa-users")
                .setIconFontSize("4em")
                .setIconColor("#67D596")
                );
            
            host.xui_ui_div26.append(
                xui.create("xui.UI.Group")
                .setHost(host,"xui_ui_group3")
                .setDock("top")
                .setDockOrder(7)
                .setDockMargin({
                    "left":0,
                    "top":6,
                    "right":0,
                    "bottom":6
                }
                )
                .setDockMinW("20em")
                .setDockStretch(".5")
                .setLeft("4.166666666666667em")
                .setTop("15.416666666666666em")
                .setWidth("18em")
                .setHeight("16.25em")
                .setCaption("Messages")
                .setImageClass("fa fa-lg fa-info-circle")
                .setToggleBtn(true)
                );
            
            host.xui_ui_group3.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div42")
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                );
            
            host.xui_ui_div42.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div45")
                .setLeft("0em")
                .setTop("0em")
                .setWidth("auto")
                .setHeight("auto")
                .setZIndex(0)
                .setPosition("relative")
                .setHtml(" \n    <div>\n        <span style=\"font-size: x-small;\">\n            <font color=\"#8a2be2\">\n                <b>\n                    \n                Tina\n                </b>\n            </font>\n            <i>\n                <font color=\"#bc8f8f\">\n                    3 mins ago&nbsp;\n                </font>\n            </i>\n        </span>\n    </div>\n    <div>\n        <span style=\"font-size: x-small;\">\n            The screenshot above shows the default column layout. Click the column picker button on the far right of the label bar to see a list of the available columns. Alternatively, you can right-click on any column label to display the list.\n        </span>\n    </div>\n \n")
                .setCustomStyle({
                    "KEY":{
                        "margin-left":"70px",
                        "padding":"6px 6px 6px 12px",
                        "border-left":"solid 3px #ff0000"
                    }
                }
                )
                );
            
            host.xui_ui_div42.append(
                xui.create("xui.UI.Image")
                .setHost(host,"xui_ui_image19")
                .setClassName("xui-uiborder-circle")
                .setLeft("1.25em")
                .setTop("1.1875em")
                .setWidth("2.5em")
                .setHeight("2.5em")
                .setSrc("{/}img/animals-kitten_cute_toon_character_t.png")
                .setCustomStyle({
                    "KEY":{
                        "background-color":"#FF69B4"
                    }
                }
                )
                );
            
            host.xui_ui_group3.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div105")
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                );
            
            host.xui_ui_div105.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div106")
                .setLeft("0em")
                .setTop("0em")
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                .setHtml("  <div style=\"text-align: right;\">\n        <span style=\"font-size: x-small;\">\n            <font color=\"#8a2be2\">\n                <b>\n                    \n                    Westing\n                </b>\n            </font>\n            <i>\n                <font color=\"#bc8f8f\">\n                    10:20\n                </font>\n            </i>\n        </span>\n    </div>\n    <div style=\"text-align: right;\">\n        <span style=\"font-size: x-small;\">\n            The screenshot above shows the default column layout. Click the column picker button on the far right of the label bar to see a list of the available columns. Alternatively, you can right-click on any column label to display the list.\n        </span>\n    </div>\n \n")
                .setCustomStyle({
                    "KEY":{
                        "border-right":"solid 3px #ff0000",
                        "padding":"6px 12px 6px 6px",
                        "margin":"0 70px 0 0",
                        "line-height":"1.22"
                    }
                }
                )
                );
            
            host.xui_ui_div105.append(
                xui.create("xui.UI.Image")
                .setHost(host,"xui_ui_image39")
                .setClassName("xui-uiborder-circle")
                .setTop("1.25em")
                .setWidth("2.5em")
                .setHeight("2.5em")
                .setRight("1.25em")
                .setSrc("{/}img/people-kid_head.png")
                .setCustomStyle({
                    "KEY":{
                        "background-color":"#FF69B4"
                    }
                }
                )
                );
            
            host.xui_ui_div26.append(
                xui.create("xui.UI.Group")
                .setHost(host,"xui_ui_group4")
                .setDock("top")
                .setDockOrder(8)
                .setDockMargin({
                    "top":6,
                    "right":0,
                    "bottom":6,
                    "left":0
                }
                )
                .setDockMinW("20em")
                .setDockStretch(".5")
                .setLeft("4.166666666666667em")
                .setTop("15.416666666666666em")
                .setWidth("18em")
                .setHeight("16.25em")
                .setCaption("Pending Tasks")
                .setImageClass("fa fa-lg fa-tasks")
                .setToggleBtn(true)
                );
            
            host.xui_ui_group4.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div63")
                .setDock("bottom")
                .setLeft("6.875em")
                .setTop("10em")
                .setHeight("1.5625em")
                .setHtml("<div style=\"text-align: center;\">Show all &gt;&gt;</div>")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "background-color":"#B0C4DE"
                    }
                }
                )
                );
            
            host.xui_ui_group4.append(
                xui.create("xui.UI.List")
                .setHost(host,"xui_ui_list4")
                .setDirtyMark(false)
                .setItems([{
                    "id":"a",
                    "caption":"Financial report",
                    "imageClass":"",
                    "tagCmds":[{
                        "id":"a",
                        "location":"left",
                        "itemClass":"xuicon xui-icon-star",
                        "itemStyle":"color:#ff0000"
                    }]
                },
                {
                    "id":"b",
                    "caption":"Member call",
                    "imageClass":""
                },
                {
                    "id":"c",
                    "caption":"Research analysis",
                    "imageClass":""
                },
                {
                    "id":"d",
                    "caption":"Home work",
                    "imageClass":"",
                    "disabled":true
                }])
                .setDock("fill")
                .setDockMargin({
                    "left":8,
                    "top":8,
                    "right":8,
                    "bottom":8
                }
                )
                .setLeft("5.625em")
                .setTop("3.75em")
                .setWidth("26.666666666666668em")
                .setSelMode("multibycheckbox")
                .setBorderType("none")
                .setTagCmds([{
                    "id":"e",
                    "location":"left",
                    "itemClass":"xuicon xui-icon-placeholder"
                }])
                .setLabelSize("8.333333333333334em")
                .setLabelPos("none")
                .setLabelHAlign("")
                .setValue("b")
                );
            
            host.xui_ui_div26.append(
                xui.create("xui.UI.Group")
                .setHost(host,"xui_ui_group1")
                .setDock("top")
                .setDockOrder(5)
                .setDockMargin({
                    "left":0,
                    "top":6,
                    "right":0,
                    "bottom":6
                }
                )
                .setDockMinW("20em")
                .setDockStretch(".5")
                .setLeft("2.5em")
                .setTop("13.75em")
                .setWidth("18em")
                .setHeight("20em")
                .setCaption("Unique Visitors")
                .setImageClass("fa fa-lg fa-user-circle")
                .setToggleBtn(true)
                .setTagCmds([{
                    "id":"ref",
                    "itemClass":"fa fa-lg fa-refresh"
                }])
                );
            
            host.xui_ui_group1.append(
                xui.create("xui.UI.FusionChartsXT")
                .setHost(host,"xui_ui_fusionchartsxt10")
                .setDock("fill")
                .setLeft("8.75em")
                .setTop("3.125em")
                .setWidth("23.375em")
                .setHeight("18.5625em")
                .setChartType("Area2D")
                .setJSONData({
                    "chart":{
                        "yaxisname":"Unique Visitors",
                        "useroundedges":"1",
                        "bgcolor":"FFFFFF,FFFFFF",
                        "showShadow":"0",
                        "showborder":"0",
                        "rotatevalues":"1",
                        "xaxisname":"Month",
                        "animation":"0",
                        "borderthickness":"1",
                        "showplotborder":"1",
                        "canvasborderthickness":"1",
                        "bordercolor":"808080",
                        "plotborderthickness":"1",
                        "plotbordercolor":"0000CD",
                        "plotborderdashed":"0"
                    },
                    "data":[{
                        "label":"January",
                        "value":"146"
                    },
                    {
                        "label":"February",
                        "value":"167"
                    },
                    {
                        "label":"March",
                        "value":"245"
                    },
                    {
                        "label":"April",
                        "value":"267"
                    },
                    {
                        "label":"May",
                        "value":"333"
                    },
                    {
                        "label":"June",
                        "value":"336"
                    }],
                    "trendlines":[{
                        "line":[]
                    }],
                    "annotations":{
                        "groups":[{
                            "items":[{
                                "type":"text"
                            }]
                        }]
                    }
                }
                )
                );
            
            host.xui_ui_div26.append(
                xui.create("xui.UI.Group")
                .setHost(host,"xui_ui_group2")
                .setDock("top")
                .setDockOrder(6)
                .setDockMargin({
                    "left":0,
                    "top":6,
                    "right":0,
                    "bottom":6
                }
                )
                .setDockMinW("20em")
                .setDockStretch(".5")
                .setLeft("3.3333333333333335em")
                .setTop("14.583333333333334em")
                .setWidth("18em")
                .setHeight("20em")
                .setCaption("Orders")
                .setImageClass("fa fa-lg fa-wpforms")
                .setToggleBtn(true)
                .setTagCmds([{
                    "id":"ref",
                    "itemClass":"fa fa-lg fa-refresh"
                }])
                );
            
            host.xui_ui_group2.append(
                xui.create("xui.UI.FusionChartsXT")
                .setHost(host,"xui_ui_fusionchartsxt14")
                .setDock("fill")
                .setLeft("3.75em")
                .setTop("5em")
                .setWidth("23.4375em")
                .setHeight("18.5625em")
                .setJSONData({
                    "chart":{
                        "xaxisname":"Month",
                        "yaxisname":"Orders",
                        "useroundedges":"0",
                        "bgcolor":"FFFFFF,FFFFFF",
                        "showborder":"0",
                        "rotatevalues":"0",
                        "animation":"0",
                        "useellipseswhenoverflow":"0",
                        "showshadow":"0",
                        "canvasborderthickness":"1"
                    },
                    "data":[{
                        "label":"January",
                        "value":"1740"
                    },
                    {
                        "label":"February",
                        "value":"1908"
                    },
                    {
                        "label":"March",
                        "value":"2180"
                    },
                    {
                        "label":"April",
                        "value":"2380"
                    },
                    {
                        "label":"May",
                        "value":"2960"
                    },
                    {
                        "label":"June",
                        "value":"2760"
                    }],
                    "trendlines":[{
                        "line":[]
                    }],
                    "annotations":{
                        "groups":[{
                            "items":[{
                                "type":"text"
                            }]
                        }]
                    }
                }
                )
                );
            
            host.xui_ui_buttonviews2.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block23")
                .setDock("top")
                .setDockOrder(-1)
                .setDockStretch("stretch")
                .setLeft("14.583333333333334em")
                .setHeight("3.1875em")
                .setBorderType("none")
                , "c");
            
            host.xui_ui_block23.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label22")
                .setLeft("0.625em")
                .setTop("1.25em")
                .setCaption("Charts&nbsp;&nbsp;<em style='font-size:12px'>(demo)</em>")
                .setCustomStyle({
                    "KEY":{
                        "font-size":"1.25em"
                    }
                }
                )
                );
            
            host.xui_ui_buttonviews2.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block27")
                .setDock("top")
                .setDockOrder(-1)
                .setDockStretch("stretch")
                .setLeft("14.583333333333334em")
                .setHeight("3.1875em")
                .setBorderType("none")
                , "a");
            
            host.xui_ui_block27.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label25")
                .setLeft("0.625em")
                .setTop("1.25em")
                .setCaption("Home&nbsp;&nbsp;<em style='font-size:12px'>(demo)</em>")
                .setCustomStyle({
                    "KEY":{
                        "font-size":"1.25em"
                    }
                }
                )
                );
            
            host.xui_ui_buttonviews2.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block28")
                .setDock("top")
                .setDockOrder(-1)
                .setDockStretch("stretch")
                .setLeft("14.583333333333334em")
                .setHeight("3.1875em")
                .setBorderType("none")
                , "b");
            
            host.xui_ui_block28.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label26")
                .setLeft("0.625em")
                .setTop("1.25em")
                .setCaption("Forms&nbsp;&nbsp;<em style='font-size:12px'>(demo)</em>")
                .setCustomStyle({
                    "KEY":{
                        "font-size":"1.25em"
                    }
                }
                )
                );
            
            host.xui_ui_buttonviews2.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block29")
                .setDock("top")
                .setDockOrder(-1)
                .setDockStretch("stretch")
                .setLeft("14.583333333333334em")
                .setHeight("3.1875em")
                .setBorderType("none")
                .setOverflow("hidden")
                , "d");
            
            host.xui_ui_block29.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label27")
                .setLeft("0.625em")
                .setTop("1.25em")
                .setCaption("File Manager&nbsp;&nbsp;<em style='font-size:12px'>(demo)</em>")
                .setCustomStyle({
                    "KEY":{
                        "font-size":"1.25em"
                    }
                }
                )
                );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui_ui_cssbox3")
                .setClassName("xui-css-cmd")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },

        // Give a chance to determine which UI controls will be appended to parent container
        customAppend : function(parent, subId, left, top){
            // "return false" will cause all the internal UI controls will be added to the parent panel
            return false;
        },
            events:{
                "onReady":[{
                    "desc":"Action 1",
                    "type":"control",
                    "target":"xui_ui_svgpaper10",
                    "params":[{
                        "visibility":"hidden"
                    }],
                    "method":"setProperties"
                }]
            }

        /*,
        // To determine how properties affects this module
        propSetAction : function(prop){
        },
        // To set all node's style in this modlue
        customStyle:{}
    },
    //To customize the default properties and event handlers
    Static:{
        $DataModel:{
        },
        $EventHandlers:{
        }
    */
},
    Static:{
        designViewConf:{
    "width":960,
    "height":600,
    "mobileFrame":false
}





    }
});