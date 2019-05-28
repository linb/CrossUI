// The default code is a module class (inherited from xui.Module)
// Ensure that all the value of "key/value pair" does not refer to external variables
xui.Class('App.Reply', 'xui.Module',{
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
                .setHost(host,"xui_ui_div104")
                .setShowEffects("Blur")
                .setHideEffects("Blur")
                .setLeft("0em")
                .setTop("0em")
                .setWidth("22em")
                .setHeight("30em")
                .setOverflow("hidden")
            );
            
            host.xui_ui_div104.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button22")
                .setDirtyMark(false)
                .setLeft("9.916666666666666em")
                .setTop("38.25em")
                .setWidth("11.5em")
                .setHeight("2.8333333333333335em")
                .setCaption("邀 请 好 友 来 参 谋")
                .onClick([{
                    "desc":"Action 1",
                    "type":"other",
                    "target":"callback",
                    "args":[{
                        "ipage":"status_from",
                        "tab":"home"
                    }],
                    "method":"setFI",
                    "event":1
                }])
                );
            
            host.xui_ui_div104.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button23")
                .setDirtyMark(false)
                .setLeft("22.5em")
                .setTop("33.25em")
                .setWidth("5em")
                .setImageClass("fa fa-lg fa-plus")
                .setCaption("选项")
                );
            
            host.xui_ui_div104.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block45")
                .setLeft("1.6666666666666667em")
                .setTop("8.75em")
                .setWidth("18.9375em")
                .setHeight("8.125em")
                .setBorderType("flat")
                .setBackground("#FFFFFF")
                .setOverflow("hidden")
                );
            
            host.xui_ui_block45.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label49")
                .setLeft("1.6666666666666667em")
                .setTop("0.8333333333333334em")
                .setWidth("5.666666666666667em")
                .setCaption("Blue")
                .setHAlign("left")
                );
            
            host.xui_ui_block45.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"xui_ui_htmlbutton7")
                .setLeft("3.6875em")
                .setTop("4.125em")
                .setWidth("13.125em")
                .setHeight("2.5em")
                .setHtml("I pick option 1")
                .onClick([{
                    "desc":"Action 1",
                    "type":"other",
                    "target":"callback",
                    "args":[{
                        "tab":"reply",
                        "ipage":"status_from"
                    }],
                    "method":"setFI",
                    "event":1
                }])
                );
            
            host.xui_ui_div104.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput1250")
                .setDirtyMark(false)
                .setLeft("13.25em")
                .setTop("42.416666666666664em")
                .setWidth("15.833333333333334em")
                .setHeight("1.8333333333333333em")
                .setLabelSize("8em")
                .setLabelCaption("过期时间")
                .setType("counter")
                .setUnit("分钟")
                .setPrecision(0)
                .setValue(10)
                );
            
            host.xui_ui_div104.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label50")
                .setLeft("1.875em")
                .setTop("6.875em")
                .setWidth("18.875em")
                .setCaption("Choose one please")
                .setHAlign("left")
                );
            
            host.xui_ui_div104.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block46")
                .setLeft("1.6875em")
                .setTop("17.5em")
                .setWidth("18.9375em")
                .setHeight("7.5em")
                .setBorderType("flat")
                .setBackground("#FFFFFF")
                .setOverflow("hidden")
                );
            
            host.xui_ui_block46.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label51")
                .setLeft("1.6666666666666667em")
                .setTop("0.8333333333333334em")
                .setWidth("5.666666666666667em")
                .setCaption("Red")
                .setHAlign("left")
                );
            
            host.xui_ui_block46.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"xui_ui_htmlbutton8")
                .setLeft("3.75em")
                .setTop("3.5em")
                .setWidth("13.125em")
                .setHeight("2.5em")
                .setHtml("I pick option 2")
                .onClick([{
                    "desc":"Action 1",
                    "type":"other",
                    "target":"callback",
                    "args":[{
                        "tab":"reply",
                        "ipage":"status_from"
                    }],
                    "method":"setFI",
                    "event":1
                }])
                );
            
            host.xui_ui_div104.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label55")
                .setLeft("2.1666666666666665em")
                .setTop("2.6666666666666665em")
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
            
            host.xui_ui_div104.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block50")
                .setLeft("0.625em")
                .setTop("5.25em")
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