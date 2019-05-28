xui.Class('App', 'xui.Module',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Dialog")
                .setHost(host,"ctl_panel3")
                .setLeft("4.25em")
                .setTop("2.5833333333333335em")
                .setWidth("46.666666666666664em")
                .setHeight("40em")
                .setCaption("Dynamic Chart Switching")
            );
            
            host.ctl_panel3.append(
                xui.create("xui.UI.FusionChartsXT")
                .setHost(host,"ctl_fusionchartsxt1")
                .setDock("fill")
                .setWidth("45.833333333333336em")
                .setHeight("30.75em")
                .setJSONData({
                    "chart":{
                        "caption":"Monthly Sales Summary",
                        "subcaption":"For the year 2006",
                        "xaxisname":"Month",
                        "yaxisname":"Sales",
                        "logoScale":"50",
                        "logoURL":"http://www.crossui.com/img/logo.png",
                        "numberprefix":"$",
                        "useroundedges":"1",
                        "bgcolor":"FFFFFF,FFFFFF",
                        "showborder":"0",
                        "placevaluesinside":"1",
                        "enablerotation":"0"
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
                    }],
                    "styles":{
                        "definition":[{
                            "name":"CanvasAnim",
                            "type":"animation",
                            "param":"_xScale",
                            "start":"0",
                            "duration":"1"
                        }],
                        "application":[{
                            "toobject":"Canvas",
                            "styles":"CanvasAnim"
                        }]
                    }
                })
                .onDataClick("_ctl_fusionchartsxt1_ondataclick")
                );
            
            host.ctl_panel3.append(
                xui.create("xui.UI.Block")
                .setHost(host,"ctl_block7")
                .setDock("top")
                .setHeight("5.75em")
                .setOverflow("hidden")
                );
            
            host.ctl_block7.append(
                xui.create("xui.UI.StatusButtons")
                .setHost(host,"ctl_statusbuttons1")
                .setDirtyMark(false)
                .setItems([{
                    "id":"Column2D",
                    "caption":"Column2D"
                },
                {
                    "id":"Column3D",
                    "caption":"Column3D"
                },
                {
                    "id":"Line",
                    "caption":"Line"
                },
                {
                    "id":"Area2D",
                    "caption":"Area2D"
                },
                {
                    "id":"Bar2D",
                    "caption":"Bar2D"
                },
                {
                    "id":"Pie2D",
                    "caption":"Pie2D"
                },
                {
                    "id":"Pie3D",
                    "caption":"Pie3D"
                },
                {
                    "id":"Doughnut2D",
                    "caption":"Doughnut2D"
                },
                {
                    "id":"Doughnut3D",
                    "caption":"Doughnut3D"
                },
                {
                    "id":"Pareto2D",
                    "caption":"Pareto2D"
                }])
                .setDock("fill")
                .setLeft("0em")
                .setTop("0.2962962962962963em")
                .setWidth("34.916666666666664em")
                .setHeight("7.166666666666667em")
                .setBorderType("none")
                .setItemMargin("2px 4px")
                .setItemWidth("5.555555555555555em")
                .setValue("Column2D")
                .afterUIValueSet("_ctl_statusbuttons1_afteruivalueset")
                );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },
        _ctl_statusbuttons1_afteruivalueset:function (profile, oldValue, newValue){
            var ns = this;
            ns.ctl_fusionchartsxt1.setChartType(newValue);
        }
    }
});