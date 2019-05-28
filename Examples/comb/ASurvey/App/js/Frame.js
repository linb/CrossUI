// The default code is a module class (inherited from xui.Module)
// Ensure that all the value of "key/value pair" does not refer to external variables
xui.Class('App.Frame', 'xui.Module',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div19")
                .setClassName("xui-uisyle-mobile")
                .setDock("center")
                .setShowEffects("Flip V")
                .setHideEffects("Flip V")
                .setLeft("2.5em")
                .setTop("1em")
                .setWidth("22em")
                .setHeight("34em")
            );
            
            host.xui_ui_div19.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_container")
                .setDock("fill")
                .setLeft("-0.08333333333333333em")
                .setTop("5.583333333333333em")
                .setWidth("30.166666666666668em")
                .setHeight("22.666666666666668em")
                );
            
            host.xui_ui_div19.append(
                xui.create("xui.UI.Icon")
                .setHost(host,"xui_ui_icon10")
                .setRotate(24)
                .setLeft("18.875em")
                .setTop("0.375em")
                .setWidth("3.8125em")
                .setHeight("1.9375em")
                .setImageClass("fa fa-lg fa-american-sign-language-interpreting")
                .setIconFontSize("2em")
                .setCustomStyle({
                    "KEY":{
                        "color":"#B22222"
                    }
                })
                );
            
            host.xui_ui_div19.append(
                xui.create("xui.UI.Gallery")
                .setHost(host,"xui_ui_gallery18")
                .setDirtyMark(false)
                .setItems([{
                    "id":"home",
                    "caption":"",
                    "comment":"Post",
                    "imageClass":"fa fa-lg fa-mail-forward"
                },
                {
                    "id":"reply",
                    "caption":"",
                    "comment":"Receive",
                    "imageClass":"fa fa-lg fa-rss"
                },
                {
                    "id":"mine",
                    "caption":"",
                    "comment":"Config",
                    "imageClass":"fa fa-lg fa-user-circle"
                }])
                .setDock("bottom")
                .setLeft("15em")
                .setTop("42.5em")
                .setHeight("auto")
                .setBorderType("none")
                .setItemMargin(null)
                .setItemPadding(10)
                .setColumns(3)
                .setValue("")
                .onItemSelected([{
                    "desc":"Action 1",
                    "type":"other",
                    "target":"callback",
                    "args":[{
                        "ipage":"{args[1].id}",
                        "tab":"{args[1].id}"
                    }],
                    "method":"setFI",
                    "event":2
                }])
                .setCustomStyle({
                    "ITEM":{
                        "border-radius":"0"
                    },
                    "ITEMS":{
                        "background-color":"#E1FFFF"
                    }
                })
                );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },
        events:{
            "onRender":[{
                "desc":"Action 1",
                "type":"control",
                "target":"xui_ui_gallery18",
                "args":["{getFI(\"ipage\")}"],
                "method":"fireItemClickEvent"
            }],
            "onFragmentChanged":[{
                "desc":"clear",
                "type":"control",
                "target":"xui_container",
                "args":[],
                "method":"dumpContainer"
            },
            {
                "desc":"setTab",
                "type":"control",
                "target":"xui_ui_gallery18",
                "args":["{getFI(\"tab\")}"],
                "method":"fireItemClickEvent"
            },
            {
                "desc":"home",
                "type":"page",
                "target":"App.Home",
                "args":["{page.xui_container}"],
                "method":"show",
                "conditions":[{
                    "left":"{getFI(\"ipage\")}",
                    "symbol":"=",
                    "right":"home"
                }],
                "return":false
            },
            {
                "desc":"reply",
                "type":"page",
                "target":"App.Reply",
                "args":["{page.xui_container}"],
                "method":"show",
                "conditions":[{
                    "left":"{getFI(\"ipage\")}",
                    "symbol":"=",
                    "right":"reply"
                }],
                "return":false
            },
            {
                "desc":"mine",
                "type":"other",
                "target":"msg",
                "args":["Not yet implemented!","Message",200,5000],
                "method":"message",
                "conditions":[{
                    "left":"{getFI(\"tab\")}",
                    "symbol":"=",
                    "right":"mine"
                }],
                "return":false
            },
            {
                "desc":"options",
                "type":"page",
                "target":"App.Options",
                "args":["{page.xui_container}"],
                "method":"show",
                "conditions":[{
                    "left":"{getFI(\"ipage\")}",
                    "symbol":"=",
                    "right":"status_options"
                }],
                "return":false
            },
            {
                "desc":"status_from",
                "type":"page",
                "target":"App.Status_from",
                "args":["{page.xui_container}"],
                "method":"show",
                "conditions":[{
                    "left":"{getFI(\"ipage\")}",
                    "symbol":"=",
                    "right":"status_from"
                }],
                "return":false
            }]
        }
    }
});