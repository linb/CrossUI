Class('RAD.CustomBorder', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Dialog")
                .setHost(host,"mainPane")
                .setLeft("0.8333333333333334em")
                .setTop("0.8333333333333334em")
                .setWidth("40em")
                .setHeight("30.833333333333332em")
                .setCaption("$(RAD.custom_dlg.borderdlg.Custom padding, margin and border)")
                .setMinBtn(false)
                .setMaxBtn(false)
                .setRestoreBtn(false)
                .setOverflow("hidden")
            );
            
            host.mainPane.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div46")
                .setLeft("28.25em")
                .setTop("0.9166666666666666em")
                .setHeight("2.5em")
                .setCustomStyle({
                    "KEY":{
                        "background-color":"#E9967A"
                    }
                }
                )
                );
            
            host.xui_ui_div46.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span1")
                .setLeft("3.25em")
                .setTop("0.6666666666666666em")
                .setWidth("3.6666666666666665em")
                .setHeight("1.5833333333333333em")
                .setHtml("$(RAD.custom_dlg.borderdlg.Margin)")
                );
            
            host.mainPane.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div48")
                .setLeft("28.25em")
                .setTop("3.4166666666666665em")
                .setHeight("2.5em")
                .setCustomStyle({
                    "KEY":{
                        "background-color":"#00FF00"
                    }
                }
                )
                );
            
            host.xui_ui_div48.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span92")
                .setLeft("3.25em")
                .setTop("0.6666666666666666em")
                .setWidth("3.6666666666666665em")
                .setHeight("1.5833333333333333em")
                .setHtml("$(RAD.custom_dlg.borderdlg.Border)")
                );
            
            host.mainPane.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div47")
                .setLeft("28.25em")
                .setTop("5.916666666666667em")
                .setHeight("2.5em")
                .setCustomStyle({
                    "KEY":{
                        "background-color":"#FFA07A"
                    }
                }
                )
                );
            
            host.xui_ui_div47.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span91")
                .setLeft("3.25em")
                .setTop("0.6666666666666666em")
                .setWidth("3.6666666666666665em")
                .setHeight("1.5833333333333333em")
                .setHtml("$(RAD.custom_dlg.borderdlg.Padding)")
                );
            
            host.mainPane.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div_realo")
                .setLeft("28.333333333333332em")
                .setTop("10.083333333333334em")
                .setWidth("auto")
                .setHeight("auto")
                .setCustomStyle({
                    "KEY":{
 
                        background:"url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+)"
                    }
                })
                );
            
            host.xui_ui_div_realo.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div_real")
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                .setCustomStyle({
                    "KEY":{
                        background:"url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNiIgaGVpZ2h0PSI2Ij4KPHJlY3Qgd2lkdGg9IjYiIGhlaWdodD0iNiIgZmlsbD0iI2VlZSI+PC9yZWN0Pgo8ZyBpZD0iYyI+CjxyZWN0IHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGZpbGw9IiNlNmU2ZTYiPjwvcmVjdD4KPHJlY3QgeT0iMSIgd2lkdGg9IjMiIGhlaWdodD0iMiIgZmlsbD0iI2Q4ZDhkOCI+PC9yZWN0Pgo8L2c+Cjx1c2UgeGxpbms6aHJlZj0iI2MiIHg9IjMiIHk9IjMiPjwvdXNlPgo8L3N2Zz4=)"
                    }
                })
                );
            
            host.xui_ui_div_real.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div_reali")
                .setWidth("4em")
                .setHeight("4em")
                .setPosition("relative")
                .setCustomStyle({
                    "KEY":{
 
                        background:"url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pgo8cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+)"
                    }
                } )
                );
            
            host.mainPane.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button10")
                .setLeft("28.333333333333332em")
                .setTop("23.33333333333333em")
                .setWidth("10em")
                .setHeight("2.5em")
                .setCaption("$(RAD.Clear)")
                .onClick("_xui_ui_button10_onclick")
                );
            

            host.mainPane.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block27")
                .setLeft("0.08333333333333333em")
                .setTop("0em")
                .setWidth("26.5em")
                .setHeight("26.666666666666668em")
                .setBorderType("inset")
                .setOverflow("hidden")
                );
            
            host.xui_ui_block27.append(
                xui.create("xui.UI.SVGPaper")
                .setHost(host,"xui_ui_svgpaper1")
                .setLeft("-0.08333333333333333em")
                .setTop("0em")
                .setWidth("26.666666666666668em")
                .setHeight("26.666666666666668em")
                .setCustomStyle({
                    "KEY":"background-color:transparent"
                }
                )
                );
            
            host.xui_ui_svgpaper1.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div1")
                .setLeft("0.8333333333333334em")
                .setTop("0.8333333333333334em")
                .setWidth("auto")
                .setHeight("auto")
                .setCustomStyle({
                    "KEY":{
                        "background-color":"#E9967A"
                    }
                }
                )
                );
            
            host.xui_ui_div1.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div_demo")
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                .setCustomStyle({
                    "KEY":{
                        "background-color":"#FFA07A",
                        "border":"solid #00ff00 30px",
                        "padding":"30px",
                        "margin":"30px"
                    }
                }
                )
                );
            
            host.xui_ui_div_demo.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_div3")
                .setPosition("relative")
                .setCustomClass({
                    "KEY":"xui-uibar"
                }
                )
                );
            
            host.xui_ui_block27.append(
                xui.create("xui.UI.Div")
                .setHost(host,"xui_ui_block22")
                .setLeft("0em")
                .setTop("0em")
                .setWidth("14.083333333333334em")
                .setHeight("26.666666666666668em")
                .setCustomStyle({
                    "KEY":{
                        "opacity":0.9
                    }
                }
                )
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span110")
                .setLeft("11.416666666666666em")
                .setTop("12.583333333333334em")
                .setWidth("3.3333333333333335em")
                .setHtml("Matrix")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_radius_tl")
                .setDirtyMark(false)
                .setRotate(225)
                .setLeft("0.75em")
                .setTop("2.4166666666666665em")
                .setWidth("5em")
                .setHeight("1.8333333333333333em")
                .setLabelSize("9.166666666666666em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Radius")
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_radius_tr")
                .setDirtyMark(false)
                .setRotate(315)
                .setLeft("20.75em")
                .setTop("2.4166666666666665em")
                .setWidth("5em")
                .setLabelSize("9.166666666666666em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Radius")
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_margin_t")
                .setDirtyMark(false)
                .setLeft("10.5em")
                .setTop("1.1666666666666667em")
                .setWidth("5em")
                .setLabelSize("8em")
                .setLabelPos("none")
                .setType("counter")
                .setShowMode("compact")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Margin")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(-500)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_border_t_s")
                .setDirtyMark(false)
                .setLeft("5.833333333333333em")
                .setTop("3.6666666666666665em")
                .setWidth("4.5em")
                .setLabelSize("6.666666666666667em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Style")
                .setLabelHAlign("")
                .setHAlign("center")
                .setType("listbox")
                .setShowMode("compact")
                .setValue("none")
                .onChange("_border_t_s_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_border_t_c")
                .setDirtyMark(false)
                .setDisabled(true)
                .setLeft("15.583333333333334em")
                .setTop("3.6666666666666665em")
                .setWidth("5em")
                .setLabelSize("6.666666666666667em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Color")
                .setType("color")
                .setShowMode("compact")
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_border_t_w")
                .setDirtyMark(false)
                .setDisabled(true)
                .setLeft("10.5em")
                .setTop("3.6666666666666665em")
                .setWidth("5em")
                .setLabelSize("6.666666666666667em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Width")
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_padding_t")
                .setDirtyMark(false)
                .setLeft("10.5em")
                .setTop("6.166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Padding")                
                .setWidth("5em")
                .setLabelSize("8em")
                .setLabelPos("none")
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_padding_r")
                .setDirtyMark(false)
                .setRotate(90)
                .setLeft("17em")
                .setTop("12.166666666666666em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Padding")                
                .setWidth("5em")
                .setLabelSize("8em")
                .setLabelPos("none")
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_padding_b")
                .setDirtyMark(false)
                .setLeft("10.333333333333334em")
                .setTop("18.666666666666668em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Padding")                
                .setWidth("5em")
                .setLabelSize("8em")
                .setLabelPos("none")
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_border_b_s")
                .setDirtyMark(false)
                .setLeft("5.75em")
                .setTop("21.166666666666668em")
                .setWidth("4.5em")
                .setLabelSize("6.666666666666667em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Style")
                .setHAlign("center")
                .setType("listbox")
                .setShowMode("compact")
                .setValue("none")
                .onChange("_border_b_s_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_margin_b")
                .setDirtyMark(false)
                .setLeft("10.416666666666666em")
                .setTop("23.583333333333332em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Margin")                
                .setWidth("5em")
                .setLabelSize("8em")
                .setLabelPos("none")
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(-500)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_border_r_s")
                .setDirtyMark(false)
                .setRotate(90)
                .setLeft("19.75em")
                .setTop("7.333333333333333em")
                .setWidth("4.5em")
                .setLabelSize("6.666666666666667em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Style")
                .setHAlign("center")
                .setType("listbox")
                .setShowMode("compact")
                .setValue("none")
                .onChange("_border_r_s_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_border_r_c")
                .setDirtyMark(false)
                .setDisabled(true)
                .setRotate(90)
                .setLeft("19.5em")
                .setTop("17.083333333333332em")
                .setWidth("5em")
                .setLabelSize("6.666666666666667em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Color")
                .setType("color")
                .setShowMode("compact")
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_border_r_w")
                .setDirtyMark(false)
                .setDisabled(true)
                .setRotate(90)
                .setLeft("19.5em")
                .setTop("12.083333333333334em")
                .setWidth("5em")
                .setLabelSize("6.666666666666667em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Width")
                
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_radius_br")
                .setDirtyMark(false)
                .setRotate(45)
                .setLeft("20.75em")
                .setTop("22.416666666666668em")
                .setWidth("5em")
                .setLabelSize("9.166666666666666em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Radius")
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_radius_bl")
                .setDirtyMark(false)
                .setRotate(135)
                .setLeft("0.75em")
                .setTop("22.416666666666668em")
                .setWidth("5em")
                .setLabelSize("9.166666666666666em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Radius")
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_margin_r")
                .setDirtyMark(false)
                .setRotate(90)
                .setLeft("22em")
                .setTop("12.083333333333334em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Margin")
                .setWidth("5em")
                .setLabelSize("8em")
                .setLabelPos("none")
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(-500)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_padding_l")
                .setDirtyMark(false)
                .setRotate(90)
                .setLeft("4.5em")
                .setTop("12.166666666666666em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Padding")                
                .setWidth("5em")
                .setLabelSize("8em")
                .setLabelPos("none")
                .setLabelGap("auto")
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_border_l_c")
                .setDirtyMark(false)
                .setDisabled(true)
                .setRotate(90)
                .setLeft("2em")
                .setTop("17.25em")
                .setWidth("5em")
                .setLabelSize("6.666666666666667em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Color")
                .setType("color")
                .setShowMode("compact")
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_border_l_w")
                .setDirtyMark(false)
                .setDisabled(true)
                .setRotate(90)
                .setLeft("2em")
                .setTop("12.25em")
                .setWidth("5em")
                .setLabelSize("6.666666666666667em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Width")
                
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_margin_l")
                .setDirtyMark(false)
                .setRotate(90)
                .setLeft("-0.5em")
                .setTop("12.083333333333334em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Margin")                
                .setWidth("5em")
                .setLabelSize("8em")
                .setLabelPos("none")
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(-500)
                .setMax(500)
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_border_l_s")
                .setDirtyMark(false)
                .setRotate(90)
                .setLeft("2.25em")
                .setTop("7.416666666666667em")
                .setWidth("4.5em")
                .setLabelSize("6.666666666666667em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Style")
                .setHAlign("center")
                .setType("listbox")
                .setShowMode("compact")
                .setValue("none")
                .onChange("_border_l_s_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_border_b_c")
                .setDirtyMark(false)
                .setDisabled(true)
                .setLeft("15.5em")
                .setTop("21.166666666666668em")
                .setWidth("5em")
                .setLabelSize("6.666666666666667em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Color")
                .setType("color")
                .setShowMode("compact")
                .onChange("_change")
                );
            
            host.xui_ui_block22.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"_border_b_w")
                .setDirtyMark(false)
                .setDisabled(true)
                .setLeft("10.416666666666666em")
                .setTop("21.166666666666668em")
                .setWidth("5em")
                .setLabelSize("6.666666666666667em")
                .setLabelPos("none")
                .setLabelGap("0.4166666666666667em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Width")
                
                .setType("counter")
                .setShowMode("compact")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(500)
                .onChange("_change")
                );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },
        init:function(prf,obj,prop,type){
            var ns=this,n,adj;

            if(type==2){
                adj=function(){return xui.CSS.$px.apply(xui.CSS, arguments)||'';};
                n=xui(xui.$getGhostDiv());
                n.css({
                    borderLeft:obj.border&&obj.border.left||0,
                    borderTop:obj.border&&obj.border.top||0,
                    borderRight:obj.border&&obj.border.right||0,
                    borderBottom:obj.border&&obj.border.bottom||0,

                    borderRadius:obj['border-radius']||0,
                    margin:obj.margin||0,
                    padding:obj.padding||0
                });
            }else{
                adj=function(){return prf.$px.apply(prf, arguments)||'';};
                n=prf.getSubNode(obj);
            }
            var adj2=function(v){
                v = v.replace(/(?:rgb\((\d+), ?(\d+), ?(\d+)\)([^,]*))+/g,function(a,b,c,d,e){
                    return '#'+xui.UI.ColorPicker.rgb2hex(b, c, d) + e;
                });
                v = v.replace(/(?:rgba\((\d+), ?(\d+), ?(\d+), ?([.\d]+)\)([^,]*))+/g,function(a,b,c,d,e,f){
                    opacity = parseFloat(e)||1;
                    return '#'+xui.UI.ColorPicker.rgb2hex(b, c, d) + f;
                });
                return v;
            }
            ns._ignoreChange=1;
            //border top
            ns._border_t_s.setUIValue(n.css('borderTopStyle')||'none',true);
            ns._border_t_w.resetValue(adj(n.css('borderTopWidth')));
            ns._border_t_c.resetValue(adj2(n.css('borderTopColor')));

            //border right 
            ns._border_r_s.setUIValue(n.css('borderRightStyle')||'none',true);
            ns._border_r_w.resetValue(adj(n.css('borderRightWidth')));
            ns._border_r_c.resetValue(adj2(n.css('borderRightColor')));

            //border bottom
            ns._border_b_s.setUIValue(n.css('borderBottomStyle')||'none',true);
            ns._border_b_w.resetValue(adj(n.css('borderBottomWidth')));
            ns._border_b_c.resetValue(adj2(n.css('borderBottomColor')));

            //border left
            ns._border_l_s.setUIValue(n.css('borderLeftStyle')||'none',true);
            ns._border_l_w.resetValue(adj(n.css('borderLeftWidth')));
            ns._border_l_c.resetValue(adj2(n.css('borderLeftColor')));

            //padding
            ns._padding_t.resetValue(adj(n.css('paddingTop')));
            ns._padding_r.resetValue(adj(n.css('paddingRight')));
            ns._padding_b.resetValue(adj(n.css('paddingBottom')));
            ns._padding_l.resetValue(adj(n.css('paddingLeft')));

            //margin
            ns._margin_t.resetValue(adj(n.css('marginTop')));
            ns._margin_r.resetValue(adj(n.css('marginRight')));
            ns._margin_b.resetValue(adj(n.css('marginBottom')));
            ns._margin_l.resetValue(adj(n.css('marginLeft')));

            // radius
            ns._radius_tl.resetValue(adj(n.css("borderTopLeftRadius")));
            ns._radius_tr.resetValue(adj(n.css("borderTopRightRadius")));
            ns._radius_bl.resetValue(adj(n.css("borderBottomLeftRadius")));
            ns._radius_br.resetValue(adj(n.css("borderBottomRightRadius")));
            ns._ignoreChange=0;

            ns._change(false);
            n=null;
        },
        events:{
            "onReady":"_page_onready"
        },
        _page_onready:function (module, threadid){
            var ns=this,items=[
                {
                    "id":"none",
                    "caption":"$RAD.custom_dlg.borderdlg.none"
                },
                {
                    "id":"solid",
                    "caption":"$RAD.custom_dlg.borderdlg.solid"
                },
                {
                    "id":"dashed",
                    "caption":"$RAD.custom_dlg.borderdlg.dashed"
                },
                {
                    "id":"dotted",
                    "caption":"$RAD.custom_dlg.borderdlg.dotted"
                },
                {
                    "id":"double",
                    "caption":"$RAD.custom_dlg.borderdlg.double"
                }
            ];
            ns._border_l_s.setItems(items);
            ns._border_r_s.setItems(items);
            ns._border_t_s.setItems(items);
            ns._border_b_s.setItems(items);
        },
        _border_s_change:function(v, dir){
            var ns=this, b=v!='none',t;
            (t=ns['_border_' + dir + '_w']).setDisabled(!b);
            if(b){
                if(!t.getUIValue())t.setValue(1);
            }else{
                t.resetValue(null);
            }
            (t=ns['_border_' + dir + '_c']).setDisabled(!b);
            if(b){
                if(!t.getUIValue())t.setValue("#000000");
            }else{
                t.resetValue(null);
            }
            ns._change();
        },
        _border_t_s_change:function(prf,o,v){
            this._border_s_change(v, 't');
        },
        _border_b_s_change:function(prf,o,v){
            this._border_s_change(v, 'b');
        },
        _border_l_s_change:function(prf,o,v){
            this._border_s_change(v, 'l');
        },
        _border_r_s_change:function(prf,o,v){
            this._border_s_change(v, 'r');
        },
        
        _change:function(triggEvent){
            var ns=this;
            if(ns._ignoreChange)return;
            xui.resetRun("bs:"+ns.$xid,function(){
                var empty='',
                    borderL=empty, 
                    borderR=empty, 
                    borderT=empty, 
                    borderB=empty, 
                    margin=empty, 
                    padding=empty, 
                    radius=empty, 
                    t1, t2, t3, t4;
                // collect all
                
                //border top
                t1=ns._border_t_s.getUIValue();
                if(t1!='none')
                    borderT = t1 + ' ' + (ns._border_t_w.getUIValue()||0) + "px " + (ns._border_t_c.getUIValue()||''); 
                
                //border right 
                t2=ns._border_r_s.getUIValue();
                if(t2!='none')
                    borderR = t2 + ' ' + (ns._border_r_w.getUIValue()||0) + "px " + (ns._border_r_c.getUIValue()||''); 

                //border bottom
                t3=ns._border_b_s.getUIValue();
                if(t3!='none')
                    borderB = t3 + ' ' + (ns._border_b_w.getUIValue()||0) + "px " + (ns._border_b_c.getUIValue()||''); 
                
                //border left
                t4=ns._border_l_s.getUIValue();
                if(t4!='none')
                    borderL = t4 + ' ' + (ns._border_l_w.getUIValue()||0) + "px " + (ns._border_l_c.getUIValue()||''); 
                
                //padding
                t1=ns._padding_t.getUIValue()||0;
                t2=ns._padding_r.getUIValue()||0;
                t3=ns._padding_b.getUIValue()||0;
                t4=ns._padding_l.getUIValue()||0;
                if(t1 || t2 || t3 || t4)
                    padding = t1 +"px "+ t2 +"px "+ t3 +"px "+ t4 +"px";
                
                //margin
                t1=ns._margin_t.getUIValue()||0;
                t2=ns._margin_r.getUIValue()||0;
                t3=ns._margin_b.getUIValue()||0;
                t4=ns._margin_l.getUIValue()||0;
                if(t1 || t2 || t3 || t4)
                    margin = t1 +"px "+ t2 +"px "+ t3 +"px "+ t4 +"px";
                
                //radius 
                t1=parseInt(ns._radius_tl.getUIValue(),10)||0;
                t2=parseInt(ns._radius_tr.getUIValue(),10)||0;
                t3=parseInt(ns._radius_br.getUIValue(),10)||0;
                t4=parseInt(ns._radius_bl.getUIValue(),10)||0;
                if(t1 || t2 || t3 || t4)
                    radius = t1 +"px "+ t2 +"px "+ t3 +"px "+ t4 +"px";
                if(triggEvent!==false){
                    ns.fireEvent("onChange",[{
                        border:{
                            left:borderL,
                            top:borderT,
                            right:borderR,
                            bottom:borderB
                        },
                        margin:margin,
                        padding:padding,
                        "border-radius":radius
                    }]);
                }
                
                // show preview
                ns._preview(borderL, borderR, borderT, borderB, margin, padding, radius);                
            });
        },
        _preview:function(borderL, borderR, borderT, borderB, margin, padding, radius){
            var ns=this;
            ns.xui_ui_div_real.getRoot().css({
                borderLeft:borderL||0,
                borderTop:borderT||0,
                borderRight:borderR||0,
                borderBottom:borderB||0,
                margin:margin||0,
                padding:padding||0,
                borderRadius:radius||0
            });
        },
        _xui_ui_button10_onclick:function (profile, e, src, value){
           var ns=this;
            ns.init(null,{},null,2);
            ns._change(true);
        }
    }
});