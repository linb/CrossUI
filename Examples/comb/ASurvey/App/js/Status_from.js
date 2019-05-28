// The default code is a module class (inherited from xui.Module)
// Ensure that all the value of "key/value pair" does not refer to external variables
xui.Class('App.Status_from', 'xui.Module',{
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
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div19")
                .setShowEffects("Blur")
                .setHideEffects("Blur")
                .setLeft("0em")
                .setTop("0em")
                .setWidth("22em")
                .setHeight("30em")
                .setOverflow("hidden")
            );
            
            host.xui_ui_div19.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span87")
                .setLeft("-0.625em")
                .setTop("20.4375em")
                .setWidth("22.0625em")
                .setHeight("2.9166666666666665em")
                .setCustomStyle({
                    "KEY":{
                        "background-color":"#FFFFFF"
                    }
                })
                );
            
            host.xui_ui_div19.append(
                xui.create("xui.UI.FusionChartsXT")
                .setHost(host,"xui_ui_fusionchartsxt1")
                .setLeft("-2.5em")
                .setTop("1.25em")
                .setWidth("26.25em")
                .setHeight("21.875em")
                .setZIndex(0)
                .setChartType("Pie2D")
                .setJSONData({
                    "chart":{
                        "xaxisname":"Month",
                        "yaxisname":"Sales",
                        "useroundedges":"1",
                        "bgcolor":"FFFFFF,FFFFFF",
                        "showborder":"0",
                        "enablerotation":"0",
                        "labelfontsize":"14",
                        "numbersuffix":"votes"
                    },
                    "data":[{
                        "label":"Red",
                        "value":"4"
                    },
                    {
                        "label":"Blue",
                        "value":"6"
                    }]
                })
                );
            
            host.xui_ui_div19.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label7")
                .setLeft("1.35em")
                .setTop("1.85em")
                .setWidth("15.15em")
                .setHeight("1.45em")
                .setCaption("What color do you prefer?")
                .setHAlign("left")
                .setCustomStyle({
                    "KEY":{
                        "font-size":"1.25em"
                    }
                })
                );
            
            host.xui_ui_div19.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block109")
                .setLeft("0.625em")
                .setTop("4.375em")
                .setWidth("20em")
                .setHeight("0em")
                );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },

        // Give a chance to determine which UI controls will be appended to parent container
        customAppend : function(parent, subId, left, top){
            // "return false" will cause all the internal UI controls will be added to the parent panel
            return false;
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
    }
});