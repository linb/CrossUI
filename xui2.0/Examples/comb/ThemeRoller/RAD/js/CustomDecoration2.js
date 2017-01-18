xui.Class('RAD.CustomDecoration2', 'xui.Module',{
    Instance:{
        initialize : function(){
            this.autoDestroy = true;
            this.properties = {};
        },
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Dialog")
                .setHost(host,"dialog")
                .setLeft("17.5em")
                .setTop("1.6666666666666667em")
                .setWidth("39.166666666666664em")
                .setHeight("37.5em")
                .setShadow(false)
                .setResizer(false)
                .setMinBtn(false)
                .setMaxBtn(false)
                .setOverflow("visible")
                .beforeClose("_dialog_beforeclose")
            );
            
            host.dialog.append(
                xui.create("xui.UI.Group")
                .setHost(host,"grpNodes")
                .setLeft("12.166666666666666em")
                .setTop("0.25em")
                .setWidth("26.083333333333332em")
                .setHeight("17.3333em")
                .setOverflow("hidden")
                .setCaption("$(RAD.custom_dlg.Gradient Patterns)")
                .setToggleBtn(false)
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton6")
                .setClassName("xui-predifined-css-1")
                .setLeft("0.5833333333333334em")
                .setTop("0.833333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton19")
                .setClassName("xui-predifined-css-2")
                .setLeft("5.583333333333333em")
                .setTop("0.833333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton20")
                .setClassName("xui-predifined-css-3")
                .setLeft("10.583333333333334em")
                .setTop("0.833333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton21")
                .setClassName("xui-predifined-css-4")
                .setLeft("15.666666666666666em")
                .setTop("0.833333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton22")
                .setClassName("xui-predifined-css-5")
                .setLeft("20.666666666666668em")
                .setTop("0.833333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton23")
                .setClassName("xui-predifined-css-6")
                .setLeft("0.5833333333333334em")
                .setTop("3.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton24")
                .setClassName("xui-predifined-css-7")
                .setLeft("5.583333333333333em")
                .setTop("3.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton25")
                .setClassName("xui-predifined-css-8")
                .setLeft("10.583333333333334em")
                .setTop("3.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton26")
                .setClassName("xui-predifined-css-9")
                .setLeft("15.666666666666666em")
                .setTop("3.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton27")
                .setClassName("xui-predifined-css-10")
                .setLeft("20.666666666666668em")
                .setTop("3.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton28")
                .setClassName("xui-predifined-css-11")
                .setLeft("0.5833333333333334em")
                .setTop("6.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton29")
                .setClassName("xui-predifined-css-12")
                .setLeft("5.583333333333333em")
                .setTop("6.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton30")
                .setClassName("xui-predifined-css-13")
                .setLeft("10.583333333333334em")
                .setTop("6.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton31")
                .setClassName("xui-predifined-css-14")
                .setLeft("15.666666666666666em")
                .setTop("6.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton32")
                .setClassName("xui-predifined-css-15")
                .setLeft("20.666666666666668em")
                .setTop("6.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton33")
                .setClassName("xui-predifined-css-16")
                .setLeft("0.5833333333333334em")
                .setTop("9.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton34")
                .setClassName("xui-predifined-css-17")
                .setLeft("5.583333333333333em")
                .setTop("9.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton35")
                .setClassName("xui-predifined-css-18")
                .setLeft("10.583333333333334em")
                .setTop("9.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton36")
                .setClassName("xui-predifined-css-19")
                .setLeft("15.666666666666666em")
                .setTop("9.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton37")
                .setClassName("xui-predifined-css-20")
                .setLeft("20.666666666666668em")
                .setTop("9.83333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton38")
                .setClassName("xui-predifined-css-21")
                .setLeft("0.5833333333333334em")
                .setTop("12.8333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton39")
                .setClassName("xui-predifined-css-22")
                .setLeft("5.583333333333333em")
                .setTop("12.8333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton40")
                .setClassName("xui-predifined-css-23")
                .setLeft("10.583333333333334em")
                .setTop("12.8333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton41")
                .setClassName("xui-predifined-css-24")
                .setLeft("15.666666666666666em")
                .setTop("12.8333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.grpNodes.append(
                xui.create("xui.UI.HTMLButton")
                .setHost(host,"ctl_htmlbutton42")
                .setClassName("xui-predifined-css-25")
                .setLeft("20.666666666666668em")
                .setTop("12.8333em")
                .setWidth("4.75em")
                .setHeight("2.5em")
                .setHtml("$RAD.custom_dlg.Text")
                .onClick("_btnclick")
                );
            
            host.dialog.append(
                xui.create("xui.UI.Group")
                .setHost(host,"ctl_group11")
                .setLeft("0.3333333333333333em")
                .setTop("0.25em")
                .setWidth("11em")
                .setHeight("17.3333em")
                .setOverflow("hidden")
                .setCaption("$(RAD.custom_dlg.Color Patterns)")
                .setToggleBtn(false)
                .setCustomStyle({
                    "PANEL":"padding:2px;"
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"clr1")
                .setTagVar({
                    "clr1":"#4BA3CC",
                    "clr2":"#3289B2",
                    "clr3":"#3899C6 ",
                    "clr4":"#2D7A9E",
                    "boxshadow1":"#87C1DD",
                    "boxshadow2":"#297192"
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #3899C6",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#4ba3cc"
                            },
                            {
                                "pos":"100%",
                                "clr":"#3289B2"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"clr2")
                .setTagVar({
                    "clr1":"#A5B8DA",
                    "clr2":"#7089B3",
                    "clr3":"#819bcb",
                    "clr4":"#536f9d",
                    "boxshadow1":"#87C1DD",
                    "boxshadow2":"#297192"
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #819bcb",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#A5B8DA"
                            },
                            {
                                "pos":"100%",
                                "clr":"#7089B3"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"clr3")
                .setTagVar({
                    "clr1":"#ffd65e",
                    "clr2":"#febf04",
                    "clr3":"#ffd65e",
                    "clr4":"#ce9a01",
                    "boxshadow1":"#FFEC93",
                    "boxshadow2":"#B28C00"
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #ffc926",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#ffd65e"
                            },
                            {
                                "pos":"100%",
                                "clr":"#febf04"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"clr4")
                .setTagVar({
                    "clr1":"#606c88",
                    "clr2":"#3f4c6b",
                    "clr3":"#4b546a",
                    "clr4":"#2c354b",
                    "boxshadow1":"#A7AEC2",
                    "boxshadow2":"#272742"
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #4b546a",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#606c88"
                            },
                            {
                                "pos":"100%",
                                "clr":"#3f4c6b"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"clr5")
                .setTagVar({
                    "clr1":"#d5cea6",
                    "clr2":"#b7ad70",
                    "clr3":"#c5bb83",
                    "clr4":"#a29752",
                    "boxshadow1":"#E1E1B6",
                    "boxshadow2":"#8C8F42"
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #c5bb83",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#d5cea6"
                            },
                            {
                                "pos":"100%",
                                "clr":"#b7ad70"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"clr6")
                .setTagVar({
                    "clr1":"#a90329",
                    "clr2":"#6d0019",
                    "clr3":"#77021d",
                    "clr4":"#3a000d",
                    "boxshadow1":"#D9D961",
                    "boxshadow2":"#000000"
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #77021d",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#a90329"
                            },
                            {
                                "pos":"100%",
                                "clr":"#6d0019"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"clr7")
                .setTagVar({
                    "clr1":"#4ba614",
                    "clr2":"#008c00",
                    "clr3":"#36780f",
                    "clr4":"#005900",
                    "boxshadow1":"#9FD53E",
                    "boxshadow2":"#002F00"
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #36780f",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#4ba614"
                            },
                            {
                                "pos":"100%",
                                "clr":"#008c00"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"clr8")
                .setTagVar({
                    "clr1":"#ff5db1",
                    "clr2":"#ef007c",
                    "clr3":"#ff2a98",
                    "clr4":"#bc0062",
                    "boxshadow1":"#FFBAE8",
                    "boxshadow2":"#880037"
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #ff2a98",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#ff5db1"
                            },
                            {
                                "pos":"100%",
                                "clr":"#ef007c"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span500")
                .setTagVar({
                    "clr1":"#7d7e7d",
                    "clr2":"#0e0e0e",
                    "clr3":"#646464",
                    "clr4":"#282828",
                    "boxshadow1":"#C9C9CD",
                    "boxshadow2":"#121212"
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #819bcb",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#7d7e7d"
                            },
                            {
                                "pos":"100%",
                                "clr":"#0e0e0e"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span501")
                .setTagVar({
                    "clr1":"#cef8ff",
                    "clr2":"#7fe0f8",
                    "clr3":"#9bf1ff",
                    "clr4":"#4fd4f5",
                    "boxshadow1":"#ffffff",
                    "boxshadow2":"#239397 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #9bf1ff",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#cef8ff"
                            },
                            {
                                "pos":"100%",
                                "clr":"#7fe0f8"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span502")
                .setTagVar({
                    "clr1":"#f2f9fe",
                    "clr2":"#d6f0fd",
                    "clr3":"#c3e3fa",
                    "clr4":"#a5defb",
                    "boxshadow1":"#ffffff",
                    "boxshadow2":"#6884FF "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #c3e3fa",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#f2f9fe"
                            },
                            {
                                "pos":"100%",
                                "clr":"#d6f0fd"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span503")
                .setTagVar({
                    "clr1":"#fb83fa",
                    "clr2":"#e93cec",
                    "clr3":"#f952f8",
                    "clr4":"#dc16df",
                    "boxshadow1":"#FDD9FA",
                    "boxshadow2":"#5908C9 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #f952f8",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#fb83fa"
                            },
                            {
                                "pos":"100%",
                                "clr":"#e93cec"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span504")
                .setTagVar({
                    "clr1":"#3093c7",
                    "clr2":"#1c5a85",
                    "clr3":"#26759e",
                    "clr4":"#133d5b",
                    "boxshadow1":"#65B6EC",
                    "boxshadow2":"#04233A "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #26759e",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#3093c7"
                            },
                            {
                                "pos":"100%",
                                "clr":"#1c5a85"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span505")
                .setTagVar({
                    "clr1":"#a9db80",
                    "clr2":"#96c56f",
                    "clr3":"#8ed058",
                    "clr4":"#7bb64b",
                    "boxshadow1":"#C9F0B6",
                    "boxshadow2":"#598F33 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #8ed058",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#a9db80"
                            },
                            {
                                "pos":"100%",
                                "clr":"#96c56f"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span506")
                .setTagVar({
                    "clr1":"#cef8ff",
                    "clr2":"#7fe0f8",
                    "clr3":"#9bf1ff",
                    "clr4":"#4fd4f5",
                    "boxshadow1":"#ffffff",
                    "boxshadow2":"#239397 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #819bcb",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#A5B8DA"
                            },
                            {
                                "pos":"100%",
                                "clr":"#7089B3"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span507")
                .setTagVar({
                    "clr1":"#b29af8",
                    "clr2":"#9174ed",
                    "clr3":"#8e6af5",
                    "clr4":"#6d47e7",
                    "boxshadow1":"#4E2B78",
                    "boxshadow2":"#239397 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #8e6af5",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#b29af8"
                            },
                            {
                                "pos":"100%",
                                "clr":"#9174ed"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span508")
                .setTagVar({
                    "clr1":"#f2f5f6",
                    "clr2":"#c8d7dc",
                    "clr3":"#d4dee1",
                    "clr4":"#a9c0c8",
                    "boxshadow1":"#ffffff",
                    "boxshadow2":"#699B9F "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #d4dee1",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#f2f5f6"
                            },
                            {
                                "pos":"100%",
                                "clr":"#c8d7dc"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span509")
                .setTagVar({
                    "clr1":"#ffc579",
                    "clr2":"#fb9d23",
                    "clr3":"#ffaf46",
                    "clr4":"#e78404",
                    "boxshadow1":"#FFE8B6",
                    "boxshadow2":"#885D00 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #ffaf46",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#ffc579"
                            },
                            {
                                "pos":"100%",
                                "clr":"#fb9d23"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span510")
                .setTagVar({
                    "clr1":"#d3d3d3",
                    "clr2":"#707070",
                    "clr3":"#bababa",
                    "clr4":"#575757",
                    "boxshadow1":"#E8E8E8",
                    "boxshadow2":"#373737 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #bababa",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#d3d3d3"
                            },
                            {
                                "pos":"100%",
                                "clr":"#707070"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span511")
                .setTagVar({
                    "clr1":"#fcfac0",
                    "clr2":"#f6f283",
                    "clr3":"#faf68f",
                    "clr4":"#f3ed53",
                    "boxshadow1":"#FFFFE8",
                    "boxshadow2":"#C2CD3A "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #faf68f",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#fcfac0"
                            },
                            {
                                "pos":"100%",
                                "clr":"#f6f283"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span512")
                .setTagVar({
                    "clr1":"#f4f5f5",
                    "clr2":"#dfdddd",
                    "clr3":"#d9dddd",
                    "clr4":"#c6c3c3",
                    "boxshadow1":"#ffffff",
                    "boxshadow2":"#8C8989 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #d9dddd",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#f4f5f5"
                            },
                            {
                                "pos":"100%",
                                "clr":"#dfdddd"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span513")
                .setTagVar({
                    "clr1":"#f7e3e3",
                    "clr2":"#ffd7d7",
                    "clr3":"#ecbbbb",
                    "clr4":"#ffa4a4",
                    "boxshadow1":"#ffffff",
                    "boxshadow2":"#887178 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #ecbbbb",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#f7e3e3"
                            },
                            {
                                "pos":"100%",
                                "clr":"#ffd7d7"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span514")
                .setTagVar({
                    "clr1":"#ff9a9a",
                    "clr2":"#ff4040",
                    "clr3":"#ff6767",
                    "clr4":"#ff0d0d",
                    "boxshadow1":"#FFC2D9",
                    "boxshadow2":"#AE0000 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #ff6767",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#ff9a9a"
                            },
                            {
                                "pos":"100%",
                                "clr":"#ff4040"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span515")
                .setTagVar({
                    "clr1":"#a9a588",
                    "clr2":"#8e865b",
                    "clr3":"#938e6b",
                    "clr4":"#6f6947",
                    "boxshadow1":"#D5C2B2",
                    "boxshadow2":"#42331C "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #938e6b",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#a9a588"
                            },
                            {
                                "pos":"100%",
                                "clr":"#8e865b"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span516")
                .setTagVar({
                    "clr1":"#f62b2b",
                    "clr2":"#d20202",
                    "clr3":"#e40a0a",
                    "clr4":"#9f0202",
                    "boxshadow1":"#FF938C",
                    "boxshadow2":"#610000 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #e40a0a",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#f62b2b"
                            },
                            {
                                "pos":"100%",
                                "clr":"#d20202"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span517")
                .setTagVar({
                    "clr1":"#a67939",
                    "clr2":"#845108",
                    "clr3":"#805d2c",
                    "clr4":"#543305",
                    "boxshadow1":"#E1BA8C",
                    "boxshadow2":"#1F1800 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #805d2c",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#a67939"
                            },
                            {
                                "pos":"100%",
                                "clr":"#845108"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span518")
                .setTagVar({
                    "clr1":"#d2d2f9",
                    "clr2":"#a6a6f2",
                    "clr3":"#a5a5f3",
                    "clr4":"#7a7aeb",
                    "boxshadow1":"#ffffff",
                    "boxshadow2":"#273A8F "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #a5a5f3",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#d2d2f9"
                            },
                            {
                                "pos":"100%",
                                "clr":"#a6a6f2"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span519")
                .setTagVar({
                    "clr1":"#49c0f0",
                    "clr2":"#2cafe3",
                    "clr3":"#1ab0ec",
                    "clr4":"#1a92c2",
                    "boxshadow1":"#8FECFF",
                    "boxshadow2":"#005D71 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #1ab0ec",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#49c0f0"
                            },
                            {
                                "pos":"100%",
                                "clr":"#2cafe3"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span520")
                .setTagVar({
                    "clr1":"#cedce7",
                    "clr2":"#596a72",
                    "clr3":"#acc4d6",
                    "clr4":"#434f55",
                    "boxshadow1":"#ffffff",
                    "boxshadow2":"#182F33 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #acc4d6",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#cedce7"
                            },
                            {
                                "pos":"100%",
                                "clr":"#596a72"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span521")
                .setTagVar({
                    "clr1":"#b6e026",
                    "clr2":"#abdc28",
                    "clr3":"#95b91a",
                    "clr4":"#8bb41d",
                    "boxshadow1":"#C9EC78",
                    "boxshadow2":"#4E550C "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #95b91a",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#b6e026"
                            },
                            {
                                "pos":"100%",
                                "clr":"#abdc28"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span522")
                .setTagVar({
                    "clr1":"#eab92d",
                    "clr2":"#c79810",
                    "clr3":"#cf9f15",
                    "clr4":"#98740c",
                    "boxshadow1":"#F8D980",
                    "boxshadow2":"#524600 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #cf9f15",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#eab92d"
                            },
                            {
                                "pos":"100%",
                                "clr":"#c79810"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span523")
                .setTagVar({
                    "clr1":"#45484d",
                    "clr2":"#000000",
                    "clr3":"#9bf1ff",
                    "clr4":"#1a1a1a",
                    "boxshadow1":"#9F9F9B",
                    "boxshadow2":"#000 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #819bcb",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#45484d"
                            },
                            {
                                "pos":"100%",
                                "clr":"#000000"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span524")
                .setTagVar({
                    "clr1":"#6bbed2",
                    "clr2":"#76bdd1",
                    "clr3":"#6bbed2",
                    "clr4":"#50abc4",
                    "boxshadow1":"#C6E8F8",
                    "boxshadow2":"#275588 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #6bbed2",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#6bbed2"
                            },
                            {
                                "pos":"100%",
                                "clr":"#76bdd1"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span525")
                .setTagVar({
                    "clr1":"#6bbed2",
                    "clr2":"#23538a",
                    "clr3":"#82bbd1",
                    "clr4":"#193b61",
                    "boxshadow1":"#ffffff",
                    "boxshadow2":"#001F33 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #82bbd1",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#6bbed2"
                            },
                            {
                                "pos":"100%",
                                "clr":"#23538a"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.ctl_group11.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span760")
                .setTagVar({
                    "clr1":"#e6e6e6",
                    "clr2":"#cccccc",
                    "clr3":"#a3a3a3",
                    "clr4":"#999",
                    "boxshadow1":"#ffffff",
                    "boxshadow2":"#444 "
                }
                )
                .setWidth("1.6666666666666667em")
                .setHeight("1.6666666666666667em")
                .setPosition("relative")
                .onClick("_clrpatternclicked")
                .setCustomStyle({
                    "KEY":{
                        "margin":"2px",
                        "cursor":"pointer",
                        "border":"1px solid #e6e6e6",
                        "border-radius":"6px",
                        "$gradient":{
                            "stops":[{
                                "pos":"0%",
                                "clr":"#e6e6e6"
                            },
                            {
                                "pos":"100%",
                                "clr":"#cccccc"
                            }],
                            "type":"linear",
                            "orient":"T"
                        }
                    }
                }
                )
                );
            
            host.dialog.append(
                xui.create("xui.UI.Block")
                .setHost(host,"ctl_block3")
                .setLeft("0.5em")
                .setTop("20.833333333333332em")
                .setWidth("37.5833em")
                .setHeight("13.333333333333334em")
                .setBorderType("inset")
                .setBackground("#ffffff")
                );
            
            host.ctl_block3.append(
                xui.create("xui.UI.TreeGrid")
                .setHost(host,"tg")
                .setDirtyMark(false)
                .setRowHandler(false)
                .setColResizer(false)
                .setColSortable(false)
                .setHeader([{
                    "id":"key",
                    "caption":"$RAD.custom_dlg.Attribute",
                    "width":"7em",
                    "type":"label"
                },
                {
                    "id":"normal",
                    "caption":"$RAD.custom_dlg.normal",
                    "width":"7em",
                    "flexSize":true,
                    "type":"input",
                    "editable":true
                },
                {
                    "id":"hover",
                    "caption":"$RAD.custom_dlg.hover",
                    "width":"7em",
                    "flexSize":true,
                    "type":"input",
                    "editable":true
                },
                {
                    "id":"active",
                    "caption":"$RAD.custom_dlg.active",
                    "width":"7em",
                    "flexSize":true,
                    "type":"input",
                    "editable":true
                },
                {
                    "id":"focus",
                    "caption":"$RAD.custom_dlg.focus",
                    "width":"7em",
                    "flexSize":true,
                    "type":"input",
                    "editable":true
                }])
                .afterCellUpdated("_tg_aftercellupdated")
                .beforeComboPop("_tg_beforeComboPop")
                .setCustomStyle({
                    "SCROLL":{
                        "overflowX":"hidden",
                        "overflowY":"auto"
                    }
                }
                )
                );
            
            host.dialog.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block6")
                .setLeft("0.8333333333333334em")
                .setTop("19.166666666666668em")
                .setWidth("36.666666666666664em")
                .setHeight("0em")
                .setZIndex(0)
                );
            
            host.dialog.append(
                xui.create("xui.UI.StatusButtons")
                .setHost(host,"xui_ui_statusbuttons3")
                .setDirtyMark(false)
                .setItems([{
                    "id":"normal",
                    "caption":"$RAD.custom_dlg.normal",
                    "disabled":true
                },
                {
                    "id":"hover",
                    "caption":"$RAD.custom_dlg.hover"
                },
                {
                    "id":"active",
                    "caption":"$RAD.custom_dlg.active"
                },
                {
                    "id":"focus",
                    "caption":"$RAD.custom_dlg.focus"
                }])
                .setDock("center")
                .setLeft("4.083333333333333em")
                .setTop("17.916666666666668em")
                .setWidth("auto")
                .setHeight("auto")
                .setSelMode("multi")
                .setBorderType("none")
                .setLabelGap("0.3333333333333333em")
                .setItemWidth("6em")
                .setValue("active;focus;hover;normal")
                .onChange("_xui_ui_statusbuttons3_onchange")
                );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-25")
                .setClassName("xui-predifined-css-25")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-12")
                .setClassName("xui-predifined-css-12")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-24")
                .setClassName("xui-predifined-css-24")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-7")
                .setClassName("xui-predifined-css-7")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-5")
                .setClassName("xui-predifined-css-5")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-3")
                .setClassName("xui-predifined-css-3")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-10")
                .setClassName("xui-predifined-css-10")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-13")
                .setClassName("xui-predifined-css-13")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-1")
                .setClassName("xui-predifined-css-1")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-8")
                .setClassName("xui-predifined-css-8")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-2")
                .setClassName("xui-predifined-css-2")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-15")
                .setClassName("xui-predifined-css-15")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-22")
                .setClassName("xui-predifined-css-22")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-11")
                .setClassName("xui-predifined-css-11")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-18")
                .setClassName("xui-predifined-css-18")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-20")
                .setClassName("xui-predifined-css-20")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-14")
                .setClassName("xui-predifined-css-14")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-16")
                .setClassName("xui-predifined-css-16")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-21")
                .setClassName("xui-predifined-css-21")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-19")
                .setClassName("xui-predifined-css-19")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-4")
                .setClassName("xui-predifined-css-4")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-6")
                .setClassName("xui-predifined-css-6")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-23")
                .setClassName("xui-predifined-css-23")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-9")
                .setClassName("xui-predifined-css-9")
            );
            
            append(
                xui.create("xui.UI.CSSBox")
                .setHost(host,"xui-predifined-css-17")
                .setClassName("xui-predifined-css-17")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },
        customAppend : function(parent, subId, left, top){
            var ns=this,
                prop=ns.properties;

            ns.setTargetProfile(prop.targetProfile);

            xui("body").append(ns.dialog);
            ns.dialog.getRoot()
            .popToTop(prop.src, 2)
            .setBlurTrigger("RAD.CustomDecoration2",function(){
                ns.dialog.close();
            });
            
            ns.clr1.getRoot().onClick(true);
            
            ns.dialog.activate();

            return true;
        },
        _attr:['font-family','font-size','font-weight','font-style','color','background-color','background-image',
               'background-position','background-repeat','background-attachment',
               //'background-size','background-origin','background-clip',
               'border-top','border-right','border-bottom','border-left','border-radius','padding','margin',
                'text-align','text-decoration','text-shadow','box-shadow','$gradient','cursor','overflow','line-height'//,'transform'
              ],
        setTargetProfile:function(profile){
            var ns=this, arr=['normal'],
                prop=profile.properties,
                mapNormal=prop.normalStatus,
                mapHover=prop.hoverStatus,
                mapActive=prop.activeStatus,
                mapFocus=prop.focusStatus;

            if(!xui.isEmpty(mapHover))arr.push('hover');
            if(!xui.isEmpty(mapActive))arr.push('active');
            if(mapFocus && !xui.isEmpty(mapFocus))arr.push('focus');

            ns._targetPrf=profile;
            if(profile['xui.UIProfile'])profile.getRoot().css({left:'10px',top:'10px',visibility:'visible',display:'block'}).topZindex(true);
            xui.arr.each(ns._attr,function(key){
                ns.tg.updateCellByRowCol(key,'normal',{value:mapNormal[key]||"", caption:xui.isHash(mapNormal[key])?'[object]':null},false,false);
                ns.tg.updateCellByRowCol(key,'hover',{value:mapHover[key]||"", caption:xui.isHash(mapHover[key])?'[object]':null},false,false);
                ns.tg.updateCellByRowCol(key,'active',{value:mapActive[key]||"", caption:xui.isHash(mapActive[key])?'[object]':null},false,false);
                if(mapFocus)ns.tg.updateCellByRowCol(key,'focus',{value:mapFocus[key]||"", caption:xui.isHash(mapFocus[key])?'[object]':null},false,false);
            });
            var opacity=(parseFloat(mapNormal.opacity)||parseFloat(mapNormal.opacity)===0)?mapNormal.opacity:1;
            ns.tg.updateCellByRowCol('opacity','normal',{value:opacity},false,false);
            ns.tg.updateCellByRowCol('opacity','hover',{value:opacity},false,false);
            ns.tg.updateCellByRowCol('opacity','active',{value:opacity},false,false);
            ns.tg.updateCellByRowCol('opacity','focus',{value:opacity},false,false);

            if(profile._noFocusStatus)
                ns.xui_ui_statusbuttons3.removeItems('focus');
            ns.xui_ui_statusbuttons3.setUIValue(arr.join(';'),true);

            ns.dialog.setCaption("$(RAD.custom_dlg."+(profile._title||"CSS Box Editor")+")")
        },
        events : {"onReady":"_com_onready", "onDestroy":"_com_ondestroy"},
        _com_onready : function (com, threadid) {
            var ns=this,rows=[],cell;
            cell={
                type:"color"
            };
            rows.push({id:'color',cells:[{id:'color',caption:"$RAD.custom_dlg.color"},cell,cell,cell,cell]});
            rows.push({id:'background-color',cells:[{id:'background-color',caption:"$(RAD.custom_dlg.background$-color)"},cell,cell,cell,cell]});

            cell={
                type:CONF.isPureClientMode()?"input":"popbox",
                event : CONF.isPureClientMode()?null:
                function(profile, cell,editorprf){
                    if(CONF.isPureClientMode())return;
                    var node = profile.getSubNode('CELL', cell._serialId);
                    xui.ComFactory.getCom('RAD.ImageSelector',function(){
                        this.setProperties({
                            fromRegion:node.cssRegion(true),
                            onOK:function(obj, path){
                                if(path &&  SPA.curProjectPath)
                                    path=path.replace(/\\/g,"/").replace(SPA.curProjectPath.replace(/\\/g,"/")+"/","{/}");
                                editorprf.boxing().setUIValue("url("+path+")");
                                node.focus();
                            }
                        });
                        this.show();
                    });
                }
            };
            rows.push({id:'background-image',cells:[{id:'background-image',caption:"$(RAD.custom_dlg.background$-image)"},cell,cell,cell,cell]});

            cell={
                type:"combobox", editorListItems:CONF.designer_background_position
            };
            rows.push({id:'background-position',cells:[{id:'background-position',caption:"$(RAD.custom_dlg.background$-position)"},cell,cell,cell,cell]});

            cell={
                type:"combobox", editorListItems:CONF.designer_background_repeat
            };
            rows.push({id:'background-repeat',cells:[{id:'background-repeat',caption:"$(RAD.custom_dlg.background$-repeat)"},cell,cell,cell,cell]});

            cell={
                type:"combobox", editorListItems:CONF.designer_background_attachment
            };
            rows.push({id:'background-attachment',cells:[{id:'background-attachment',caption:"$(RAD.custom_dlg.background$-attachment)"},cell,cell,cell,cell]});
            /*
            cell={
               type:"combobox", editorListItems:CONF.designer_background_size
            };
           rows.push({id:'background-size',cells:[{id:'background-size',caption:"$(RAD.custom_dlg.background$-size)"},cell,cell,cell,cell]});
           cel=,{
               type:"combobox", editorListItems:CONF.designer_background_origin
            };
           rows.push({id:'background-origin',cells:[{id:'background-origin',caption:"$(RAD.custom_dlg.background$-origin)"},cell,cell,cell,cell]});
           cell={
               type:"combobox", editorListItems:CONF.designer_background_clip
            };
            rows.push({id:'background-clip',cells:[{id:'background-clip',caption:"$(RAD.custom_dlg.background$-clip)"},cell,cell,cell,cell]});
            */
            cell={
                type:"helpinput", editorListItems:CONF.designer_data_fontfamily
            };
            rows.push({id:'font-family',cells:[{id:'font-family',caption:"$(RAD.custom_dlg.font$-family)"},cell,cell,cell,cell]});
            cell={
                type:"combobox", editorListItems:CONF.designer_data_fontsize
            };
            rows.push({id:'font-size',cells:[{id:'font-size',caption:"$(RAD.custom_dlg.font$-size)"},cell,cell,cell,cell]});
            cell={
                type:"combobox", editorListItems:CONF.designer_data_fontweight
            };
            rows.push({id:'font-weight',cells:[{id:'font-weight',caption:"$(RAD.custom_dlg.font$-weight)"},cell,cell,cell,cell]});
            cell={
                type:"combobox", editorListItems:CONF.designer_data_fontstyle
            };
            rows.push({id:'font-style',cells:[{id:'font-style',caption:"$(RAD.custom_dlg.font$-style)"},cell,cell,cell,cell]});

            cell={
                type:"popbox"
            };
            rows.push({id:'border-top',cells:[{id:'border-top',caption:"$(RAD.custom_dlg.border$-top)"},cell,cell,cell,cell]});
            rows.push({id:'border-right',cells:[{id:'border-right',caption:"$(RAD.custom_dlg.border$-right)"},cell,cell,cell,cell]});
            rows.push({id:'border-bottom',cells:[{id:'border-bottom',caption:"$(RAD.custom_dlg.border$-bottom)"},cell,cell,cell,cell]});
            rows.push({id:'border-left',cells:[{id:'border-left',caption:"$(RAD.custom_dlg.border$-left)"},cell,cell,cell,cell]});
            if(xui.Dom.css3Support("border-radius")){
                rows.push({id:'border-radius',cells:[{id:'border-radius',caption:"$(RAD.custom_dlg.border$-radius)"},cell,cell,cell,cell]});
            }
            rows.push({id:'padding',cells:[{id:'padding',caption:"$RAD.custom_dlg.padding"},cell,cell,cell,cell]});
            rows.push({id:'margin',cells:[{id:'margin',caption:"$RAD.custom_dlg.margin"},cell,cell,cell,cell]});

            cell={
                type:"combobox", editorListItems:CONF.designer_data_textalign
            };
            rows.push({id:'text-align',cells:[{id:'text-align',caption:"$(RAD.custom_dlg.text$-align)"},cell,cell,cell,cell]});
            
            cell={
                type:"combobox", editorListItems:CONF.designer_data_textdecoration
            };
            rows.push({id:'text-decoration',cells:[{id:'text-decoration',caption:"$(RAD.custom_dlg.text$-decoration)"},cell,cell,cell,cell]});
            if(xui.Dom.css3Support("text-shadow")){
                cell={
                    type:"popbox"
                };
                rows.push({id:'text-shadow',cells:[{id:'text-shadow',caption:"$(RAD.custom_dlg.text$-shadow)"},cell,cell,cell,cell]});
            }
            if(xui.Dom.css3Support("box-shadow")){
                cell={
                    type:"popbox"
                };
                rows.push({id:'box-shadow',cells:[{id:'box-shadow',caption:"$(RAD.custom_dlg.box$-shadow)"},cell,cell,cell,cell]});
            }
            if(xui.Dom.css3Support("gradient")){
                cell={
                    type:"cmdbox", editorReadonly:true
                };
                rows.push({id:'$gradient',cells:[{id:'gradients',caption:"$RAD.custom_dlg.gradients"},cell,cell,cell,cell]});
            }
            /*
            if(xui.Dom.css3Support("transform")){
                cell={
                    type:"popbox"
                };
                rows.push({id:'transform',cells:[{id:'transform',caption:"$RAD.custom_dlg.transform"},cell,cell,cell,cell]});
            }*/
            cell={
                type:"combobox", editorListItems:CONF.designer_data_cursor
            };
            rows.push({id:'cursor',cells:[{id:'cursor',caption:"$RAD.custom_dlg.cursor"},cell,cell,cell,cell]});
            cell={
                type:"combobox", editorListItems:CONF.designer_data_overflow
            };
            rows.push({id:'overflow',cells:[{id:'overflow',caption:"$RAD.custom_dlg.overflow"},cell,cell,cell,cell]});
            cell={
                type:"combobox", editorListItems:[1,1.22,1.5,2]
            };
            rows.push({id:'line-height',cells:[{id:'line-height',caption:"$(RAD.custom_dlg.line$-height)"},cell,cell,cell,cell]});

            if(xui.Dom.css3Support("opacity")){
                cell={
                    value:1,
                    type:"progress", editorProperties:{
                        min:0,max:1
                    }
                };
                rows.push({id:'opacity',cells:[{id:'opacity',caption:"$RAD.custom_dlg.opacity"},cell,cell,cell,cell]});
            }

            ns.tg.setRows(rows);

        },
        _dialog_beforeclose : function (profile) {
            var ns=this;
            ns.dialog.getRoot().setBlurTrigger("RAD.CustomDecoration2");
            if(ns._targetPrf){
                xui.arr.each(ns._attr,function(key){
                    ns.tg.updateCellByRowCol(key,'normal',{value:""},false,false);
                    ns.tg.updateCellByRowCol(key,'hover',{value:""},false,false);
                    ns.tg.updateCellByRowCol(key,'active',{value:""},false,false);
                    ns.tg.updateCellByRowCol(key,'focus',{value:""},false,false);
                });
                ns.tg.updateCellByRowCol('opacity','normal',{value:1},false,false);
                ns.tg.updateCellByRowCol('opacity','hover',{value:1},false,false);
                ns.tg.updateCellByRowCol('opacity','active',{value:1},false,false);
                ns.tg.updateCellByRowCol('opacity','focus',{value:1},false,false);
    
                ns.fireEvent('onFinished');
                if(ns._targetPrf['xui.UIProfile'])
                    ns._targetPrf.getRoot().css({left:xui.Dom.HIDE_VALUE,top:xui.Dom.HIDE_VALUE,visibility:'hidden',display:'none','z-index':0});
                ns._targetPrf=null;
    
                profile.boxing().hide();
            }

            return false;
        },
        _tg_beforeComboPop:function(profile, cell, editorprf, pos, e, src){
            var ns=this,
                prf=ns._targetPrf,
                prop=prf.properties,
                colId=cell._col.id,
                attr={},
                getV=function(key){return xui.get(prop,[colId+"Status",key])||""},
                cls,t;

            switch(cell._row.id){
                case "border-top":
                case "border-right":
                case "border-bottom":
                case "border-left":
                case "border-radius":
                case "padding":
                case "margin":
                    attr.border = { 
                        top: getV('border-top') || getV('border'),
                        right: getV('border-right') || getV('border'),
                        bottom: getV('border-bottom') || getV('border'),
                        left: getV('border-left') || getV('border')
                    };
                    attr['border-radius'] = getV('border-radius');
                    attr['padding'] = getV('padding');
                    attr['margin'] = getV('margin');
                    break;
                default:
                    attr = getV(cell._row.id);
            }
            switch(cell._row.id){
                case "border-top":
                case "border-right":
                case "border-bottom":
                case "border-left":
                case "border-radius":
                case "padding":
                case "margin":
                    cls="RAD.CustomBorder";
                    break;
                case "text-shadow":
                    cls="RAD.CustomTextShadow";
                    break;
                case "box-shadow":
                    cls="RAD.CustomBoxShadow";
                    break;
                /*
                case "transform":
                    cls="RAD.CustomTransform";
                    break;
                */
                case "$gradient":
                    cls="RAD.CustomGradients";
                    break;
            }
            if(cls){
                xui.ComFactory.getCom(cls,function(){
                    this.init(prf,attr,{
                        pro:editorprf,
                        cell:cell,
                        isSvg:0,
                        grid:ns.tg
                    },2);
                    this.setEvents({
                        onChange:function(str){
                            switch(cell._row.id){
                                case "border-top":
                                    editorprf.boxing().setUIValue(str['border']['top']||"",true);
                                    break;
                                case "border-right":
                                    editorprf.boxing().setUIValue(str['border']['right']||"",true);
                                    break;
                                case "border-bottom":
                                    editorprf.boxing().setUIValue(str['border']['bottom']||"",true);
                                    break;
                                case "border-left":
                                    editorprf.boxing().setUIValue(str['border']['left']||"",true);
                                    break;
                                case "border-radius":
                                case "padding":
                                case "margin":
                                    editorprf.boxing().setUIValue(str[cell._row.id]||"",true);
                                    break;
                                default:
                                    if(xui.isHash(str)){
                                        editorprf.boxing().setCaption("[object]",true);
                                    }else if(xui.isNull(str)){
                                            editorprf.boxing().setCaption(null,true);
                                    }
                                    editorprf.boxing().setUIValue(str?xui.isStr(str)?str:"[object]":"",true);
                            }
                            switch(cell._row.id){
                                case "border-top":
                                case "border-right":
                                case "border-bottom":
                                case "border-left":
                                case "border-radius":
                                case "padding":
                                case "margin":
                                    profile.boxing().updateCellByRowCol('padding',colId,{value:str['padding']||""},false,true);
                                    profile.boxing().updateCellByRowCol('margin',colId,{value:str['margin']||""},false,true);
                                    profile.boxing().updateCellByRowCol('border-radius',colId,{value:str['border-radius']||""},false,true);
                                    profile.boxing().updateCellByRowCol('border-left',colId,{value:str['border']['left']||""},false,true);
                                    profile.boxing().updateCellByRowCol('border-right',colId,{value:str['border']['right']||""},false,true);
                                    profile.boxing().updateCellByRowCol('border-top',colId,{value:str['border']['top']||""},false,true);
                                    profile.boxing().updateCellByRowCol('border-bottom',colId,{value:str['border']['bottom']||""},false,true);
                                    break;
                                default:
                                    if(xui.isHash(str)){
                                        profile.boxing().updateCell(cell,{caption:"[object]"},false,true);
                                    }else if(xui.isNull(str)){
                                        profile.boxing().updateCell(cell,{caption:""},false,true);
                                    }
                                    profile.boxing().updateCell(cell,{value:str||""},false,true);
                            }
                        }
                    });
                    this.render();
                    var r=this.mainPane.getRoot();
                    r.popToTop(editorprf.getRoot());
                    r.setBlurTrigger(r.$xid, function(){
                        r.setBlurTrigger(r.$xid);
                        r.hide();
                    });
                });
            }
        },
        _tg_aftercellupdated : function (profile, cell, options) {
            if("value" in options){
                var ns=this,
                    grid=ns.tg,
                    key=cell._col.id;
                hash={};
                xui.each(grid.getCells(null,key),function(cell){
                    var v="";
                    if(cell._row.id=="$gradient"){
                        hash[cell._row.id]=cell.value;
                        if(!cell.value)delete hash[cell._row.id];
                    }else if(cell._row.id=="opacity"){
                        if(parseFloat(cell.value)!==1.0){
                            v=parseFloat(cell.value);
                            hash[cell._row.id]=v;
                            if(v==1)delete hash[cell._row.id];
                        }
                    }else if(xui.str.trim(cell.value)!==""){
                        v=xui.str.trim(cell.value);
                        hash[cell._row.id]=v;
                    }
                });
                // custom style
                ns._targetPrf.boxing()['set'+xui.str.initial(key)+"Status"](hash);
                ns.fireEvent('onDirty');
            }
        },
        _clrpatternclicked:function(profile){
            this._applyClrs(profile.properties.tagVar);
        },
        _applyClrs:function(setting){
            var ns=this;
            var simplePattern=[
                {"color":"{txtclr}", "border":"solid {clr3} 1px", "border-radius":"6px", "box-shadow":"inset 0px 1px 0px {boxshadow1}",  "text-shadow":"{txtshadow}","$gradient":{"stops":[{"pos":"0%", "clr":"{clr2}"}, {"pos":"100%", "clr":"{clr3}"}], "type":"linear", "orient":"T"}, "cursor":"pointer"},
                {"$gradient":{"stops":[{"pos":"0%", "clr":"{clr3}"}, {"pos":"100%", "clr":"{clr4}"}], "type":"linear", "orient":"T"}},
                {"box-shadow":"inset 0px 1px 2px {boxshadow2}","background-image":"none","background-color":"{clr1}"},
                {}
            ],
            mattePattern=[
                {"color":"{txtclr}", "border":"solid {clr3} 1px", "border-radius":"6px", "box-shadow":"inset 0px 1px 0px {boxshadow1}",  "text-shadow":"{txtshadow}","$gradient":{"stops":[{"pos":"0%", "clr":"{clr1}"}, {"pos":"70%", "clr":"{clr2}"}], "type":"linear", "orient":"T"}, "cursor":"pointer"},
                {"$gradient":{"stops":[{"pos":"3%", "clr":"{clr3}"}, {"pos":"95%", "clr":"{clr4}"}], "type":"linear", "orient":"T"}},
                {"box-shadow":"inset 0px 1px 2px {boxshadow2}","background-image":"none","background-color":"{clr1}"},
                {}
            ],
            shinyPattern=[
                {"color":"{txtclr}", "border":"solid {clr3} 1px", "border-radius":"6px", "box-shadow":"inset 0px 1px 0px {boxshadow1}",  "text-shadow":"{txtshadow}","$gradient":{"stops":[{"pos":"0%", "clr":"{clr1}"}, {"pos":"50%", "clr":"{clr2}"}, {"pos":"100%", "clr":"{clr3}"}], "type":"linear", "orient":"T"}, "cursor":"pointer"},
                {"$gradient":{"stops":[{"pos":"0%", "clr":"{clr3}"}, {"pos":"50%", "clr":"{clr4}"}, {"pos":"100%", "clr":"{boxshadow2}"}], "type":"linear", "orient":"T"}},
                {"box-shadow":"inset 0px 1px 2px {boxshadow2}","background-image":"none","background-color":"{clr1}"},
                {}
            ],
            classPattern=[
                {"color":"{txtclr}", "border":"solid {clr3} 1px", "border-radius":"6px", "box-shadow":"inset 0px 1px 0px {boxshadow1}",  "text-shadow":"{txtshadow}","$gradient":{"stops":[{"pos":"50%", "clr":"{clr1}"}, {"pos":"51%", "clr":"{clr2}"}], "type":"linear", "orient":"T"}, "cursor":"pointer"},
                {"$gradient":{"stops":[{"pos":"50%", "clr":"{clr3}"}, {"pos":"51%", "clr":"{clr4}"}], "type":"linear", "orient":"T"}},
                {"box-shadow":"inset 0px 1px 2px {boxshadow2}","background-image":"none","background-color":"{clr1}"},
                {}
            ],
            flatPattern=[
                {"color":"{txtclr}", "border":"none","border-radius":"6px", "text-shadow":"{txtshadow}","background-color":"{clr1}", "cursor":"pointer"},
                {"background-color":"{clr2}"},
                {"background-color":"{clr4}"},
                {}
            ];

 
            var patternArray=[simplePattern,mattePattern,shinyPattern,classPattern,flatPattern];
            var textColorSetting=["#eeeeee","#eeeeee","#eeeeee","#222222","#222222"];
            var textshadowSetting=["none","0 -1px 0 {boxshadow2}","0 1px 0 {boxshadow2}","0 1px 0 {boxshadow1}","0 -1px 0 {boxshadow1}"];
            var rep=function(str){
                return str.replace("{clr1}",setting.clr1).replace("{clr2}",setting.clr2).replace("{clr3}",setting.clr3).replace("{clr4}",setting.clr4)
                    .replace("{boxshadow1}",setting.boxshadow1).replace("{boxshadow2}",setting.boxshadow2);
            };

            for(var i=1;i<=25;i++){
                var j=i%5 || 5, k=parseInt((i-1)/5,10), o,
                      pattern=xui.clone(patternArray[k]);
                if(!pattern[0])continue;

                o=pattern[0];
                if(o.color)o.color=rep(textColorSetting[j-1]);
                o["text-shadow"]=o["text-shadow"]?rep(textshadowSetting[j-1]):"";
                o["box-shadow"]=o["box-shadow"]?rep(o["box-shadow"]):'none';
                if(o.border){
                    o.border=rep(o.border);
                    o['border-top']=o.border;
                    o['border-right']=o.border;
                    o['border-bottom']=o.border;
                    o['border-left']=o.border;
                    delete o.border;
                }
                if(o['background-color'])o['background-color']=rep(o['background-color']);
                if(o['background-image'])o['background-image']=rep(o['background-image']);
                if(o.$gradient){
                    xui.arr.each(o.$gradient.stops,function(a,i){
                        if(a.clr)a.clr=rep(a.clr);
                    });
                }else{
                    if(!o['background-image'])o['background-image']='none';
                }
        
                if(o=pattern[1]){
                    if(o.color)o.color=rep(textColorSetting[j-1]);
                    if(o["text-shadow"])o["text-shadow"]=rep(textshadowSetting[j-1]);
                    if(o["box-shadow"])o["box-shadow"]=rep(o["box-shadow"]);
                    if(o.border){
                        o.border=rep(o.border);
                        o['border-top']=o.border;
                        o['border-right']=o.border;
                        o['border-bottom']=o.border;
                        o['border-left']=o.border;
                        delete o.border;
                    }
                    if(o['background-color'])o['background-color']=rep(o['background-color']);
                    if(o['background-image'])o['background-image']=rep(o['background-image']);
                    if(o.$gradient){
                        xui.arr.each(o.$gradient.stops,function(a,i){
                            if(a.clr)a.clr=rep(a.clr);
                        });
                    }else{
                        if(!o['background-image'])o['background-image']='none';
                    }
                }
        
                if(o=pattern[2]){
                    if(o.color)o.color=rep(textColorSetting[j-1]);
                    if(o["text-shadow"])o["text-shadow"]=rep(textshadowSetting[j-1]);
                    if(o["box-shadow"])o["box-shadow"]=rep(o["box-shadow"]);
                    if(o.border){
                        o.border=rep(o.border);
                        o['border-top']=o.border;
                        o['border-right']=o.border;
                        o['border-bottom']=o.border;
                        o['border-left']=o.border;
                        delete o.border;
                    }
                    if(o['background-color'])o['background-color']=rep(o['background-color']);
                    if(o['background-image'])o['background-image']=rep(o['background-image']);
                    if(o.$gradient){
                        xui.arr.each(o.$gradient.stops,function(a,i){
                            if(a.clr)a.clr=rep(a.clr);
                        });
                    }else{
                        if(!o['background-image'])o['background-image']='none';
                    }
                }
                if(o=pattern[3]){
                    if(o.color)o.color=rep(textColorSetting[j-1]);
                    if(o["text-shadow"])o["text-shadow"]=rep(textshadowSetting[j-1]);
                    if(o["box-shadow"])o["box-shadow"]=rep(o["box-shadow"]);
                    if(o.border){
                        o.border=rep(o.border);
                        o['border-top']=o.border;
                        o['border-right']=o.border;
                        o['border-bottom']=o.border;
                        o['border-left']=o.border;
                        delete o.border;
                    }
                    if(o['background-color'])o['background-color']=rep(o['background-color']);
                    if(o['background-image'])o['background-image']=rep(o['background-image']);
                }
                ns["xui-predifined-css-"+i].setNormalStatus(pattern[0]).setHoverStatus(pattern[1]).setActiveStatus(pattern[2]).setFocusStatus(pattern[3]||{});
            }
        },
        _btnclick:function (profile, e, value){
            var ns = this, 
                target=ns._targetPrf,
                ins=target.boxing(),
                cls=profile.properties.className,
                arr=ns.xui_ui_statusbuttons3.getUIValue(true);
            //cope pattern
            ins.setNormalStatus(xui.clone(ns[cls].getNormalStatus()));
            if(xui.arr.indexOf(arr,'hover')!=-1)
                ins.setHoverStatus(xui.clone(ns[cls].getHoverStatus()));
            if(xui.arr.indexOf(arr,'active')!=-1)
                ins.setActiveStatus(xui.clone(ns[cls].getActiveStatus()));
            if(xui.arr.indexOf(arr,'focus')!=-1)
                ins.setFocusStatus(xui.clone(ns[cls].getFocusStatus()));
            //reset
            ns.setTargetProfile(target);
            ns.fireEvent('onDirty');
        },
        _xui_ui_statusbuttons3_onchange:function (profile, oldValue, newValue, force, tag){
            var ns = this, 
                tg = ns.tg, 
                arr = newValue.split(';'),
                target = ns._targetPrf,
                ins=target.boxing && target.boxing();
            xui.arr.each(['normal','hover','active','focus'],function(colId){
                tg.showColumn(colId, xui.arr.indexOf(arr,colId)!=-1);
            });
            if(ins){
                if(xui.arr.indexOf(arr,"hover")==-1)
                    ins.setHoverStatus({},true);
                if(xui.arr.indexOf(arr,"active")==-1)
                    ins.setActiveStatus({},true);
                if(xui.arr.indexOf(arr,"focus")==-1)
                    ins.setFocusStatus({},true);
            }
        }
    }
});