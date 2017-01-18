xui.Class('App.DetailInfo', 'xui.Module',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div74")
                .setDock("top")
                .setLeft("1.25em")
                .setTop("4.375em")
                .setHeight("2.3125em")
                .setPanelBgClr("#FFFFFF")
                .onClick([{
                    "desc":"hide",
                    "type":"page",
                    "target":"App.DetailInfo",
                    "params":[],
                    "method":"hide"
                }])
                .setCustomStyle({
                    "KEY":{
                        "cursor":"pointer"
                    }
                })
            );
            
            host.xui_ui_div74.append(
                xui.create("xui.UI.Icon")
                .setHost(host,"xui_ui_icon1")
                .setLeft("0.625em")
                .setTop("0.625em")
                .setImageClass("xui-icon-singleleft")
                );
            
            host.xui_ui_div74.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label16")
                .setLeft("2.4375em")
                .setTop("0.6875em")
                .setCaption("Back")
                );
            
            append(
                xui.create("xui.UI.Div")
                .setHost(host,"ctl_main")
                .setDock("fill")
                .setShowEffects({
                    "params":{
                        "translateX":["100%","0%"]
                    },
                    "type":"circOut",
                    "duration":100
                })
                .setHideEffects({
                    "params":{
                        "translateX":["0%","100%"]
                    },
                    "type":"circIn",
                    "duration":100
                })
                .setPanelBgClr("#FFFFFF")
            );
            
            host.ctl_main.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div69")
                .setDock("top")
                .setLeft("8.75em")
                .setTop("20em")
                .setHeight("7.6875em")
                );
            
            host.xui_ui_div69.append(
                xui.create("xui.UI.Image")
                .setHost(host,"xui_icon")
                .setLeft("2.3125em")
                .setTop("1.25em")
                .setSrc("{xui.ini.img_pic}")
                );
            
            host.xui_ui_div69.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_name")
                .setLeft("5.291666666666667em")
                .setTop("1.4583333333333333em")
                .setCaption("Name")
                .setHAlign("left")
                .setCustomStyle({
                    "KEY":{
                        "font-size":"1.5em"
                    }
                })
                );
            
            host.xui_ui_div69.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_types")
                .setLeft("8.125em")
                .setTop("4.6875em")
                .setCaption("Name")
                .setHAlign("left")
                );
            
            host.ctl_main.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div70")
                .setDock("top")
                .setLeft("10em")
                .setTop("20.625em")
                .setHeight("5.4375em")
                );
            
            host.xui_ui_div70.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div85")
                .setDock("top")
                .setLeft("8.75em")
                .setTop("1.25em")
                .setHeight("2.1875em")
                .setHtml("<div style=\"padding:8px 0\">\n    &nbsp;&nbsp;&nbsp;COMPANY\n</div>\n")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "background-color":"#008080"
                    }
                })
                );
            
            host.xui_ui_div70.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_company")
                .setLeft("1.25em")
                .setTop("2.5em")
                .setCaption("Name")
                .setHAlign("left")
                );
            
            host.ctl_main.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div86")
                .setDock("top")
                .setLeft("10.833333333333334em")
                .setTop("21.5em")
                .setHeight("5.625em")
                );
            
            host.xui_ui_div86.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div87")
                .setDock("top")
                .setLeft("8.75em")
                .setTop("1.25em")
                .setHeight("2.1875em")
                .setHtml("<div style=\"padding:8px 0\">\n    &nbsp;&nbsp;&nbsp;ADDRESS\n</div>\n")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "background-color":"#008080"
                    }
                })
                );
            
            host.xui_ui_div86.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_address")
                .setLeft("1.25em")
                .setTop("2.5em")
                .setHeight("1.875em")
                .setCaption("Address")
                .setHAlign("left")
                );
            
            host.ctl_main.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div88")
                .setDock("top")
                .setLeft("11.666666666666666em")
                .setTop("22.333333333333332em")
                .setHeight("5em")
                );
            
            host.xui_ui_div88.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div89")
                .setDock("top")
                .setLeft("8.75em")
                .setTop("1.25em")
                .setHeight("2.25em")
                .setHtml("<div style=\"padding:8px 0\">\n    &nbsp;&nbsp;&nbsp; PHONE\n</div>\n")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "background-color":"#008080"
                    }
                })
                );
            
            host.xui_ui_div88.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_phone")
                .setLeft("1.25em")
                .setTop("2.5em")
                .setCaption("Phone")
                .setHAlign("left")
                );
            
            host.ctl_main.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div90")
                .setDock("top")
                .setLeft("11.666666666666666em")
                .setTop("22.333333333333332em")
                .setHeight("4.375em")
                );
            
            host.xui_ui_div90.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div91")
                .setDock("top")
                .setLeft("8.75em")
                .setTop("1.25em")
                .setHeight("2.25em")
                .setHtml("<div style=\"padding:8px 0\">\n    &nbsp;&nbsp;&nbsp;EMAIL\n</div>\n")
                .setCustomStyle({
                    "KEY":{
                        "color":"#FFFFFF",
                        "background-color":"#008080"
                    }
                })
                );
            
            host.xui_ui_div90.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_email")
                .setLeft("1.25em")
                .setTop("2.5625em")
                .setCaption("Email")
                .setHAlign("left")
                );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },
        events:{
            "onReady":[{
                "desc":"image",
                "type":"control",
                "target":"xui_icon",
                "params":[{
                    "src":"{global.detailVar.image}"
                }],
                "method":"setProperties"
            },
                       {
                           "desc":"name",
                           "type":"control",
                           "target":"xui_name",
                           "params":[{
                               "caption":"{global.detailVar.name}"
                           }],
                           "method":"setProperties"
                       },
                       {
                           "desc":"type",
                           "type":"control",
                           "target":"xui_types",
                           "params":[{
                               "caption":"{global.detailVar.type}"
                           }],
                           "method":"setProperties"
                       },
                       {
                           "desc":"company",
                           "type":"control",
                           "target":"xui_company",
                           "params":[{
                               "caption":"{global.detailVar.com}"
                           }],
                           "method":"setProperties"
                       },
                       {
                           "desc":"address",
                           "type":"control",
                           "target":"xui_address",
                           "params":[{
                               "caption":"{global.detailVar.address}"
                           }],
                           "method":"setProperties"
                       },
                       {
                           "desc":"phone",
                           "type":"control",
                           "target":"xui_phone",
                           "params":[{
                               "caption":"{global.detailVar.phone}"
                           }],
                           "method":"setProperties"
                       },
                       {
                           "desc":"email",
                           "type":"control",
                           "target":"xui_email",
                           "params":[{
                               "caption":"{global.detailVar.email}"
                           }],
                           "method":"setProperties"
                       }]
        }
    }
});