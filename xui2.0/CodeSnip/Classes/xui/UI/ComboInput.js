Class('App.xui_UI_ComboInput', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label6")
                .setLeft(32)
                .setTop(200)
                .setWidth(104)
                .setCaption("ongetshowvalue")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label11")
                .setLeft(8)
                .setTop(96)
                .setWidth(136)
                .setCaption("combobox (textarea)")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label3")
                .setLeft(320)
                .setTop(110)
                .setWidth(104)
                .setCaption("getter")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label2")
                .setLeft(8)
                .setTop(144)
                .setWidth(136)
                .setCaption("combobox (integer only)")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label12")
                .setLeft(320)
                .setTop(80)
                .setWidth(104)
                .setCaption("listbox(disabled)")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label5")
                .setLeft(320)
                .setTop(140)
                .setWidth(104)
                .setCaption("pop box")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label1")
                .setLeft(40)
                .setTop(16)
                .setWidth(104)
                .setCaption("combobox")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label10")
                .setLeft(320)
                .setTop(48)
                .setWidth(104)
                .setCaption("helfinput")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label9")
                .setLeft(304)
                .setTop(19)
                .setCaption("listbox(shadow/resizer)")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label6")
                .setLeft(8)
                .setTop(48)
                .setWidth(136)
                .setCaption("combobox (set items)")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label4")
                .setLeft(32)
                .setTop(170)
                .setWidth(104)
                .setCaption("command box")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label44")
                .setLeft(32)
                .setTop(230)
                .setWidth(104)
                .setCaption("time ")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label45")
                .setLeft(32)
                .setTop(260)
                .setWidth(104)
                .setCaption("color ")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label46")
                .setLeft(320)
                .setTop(200)
                .setWidth(104)
                .setCaption("date ")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label47")
                .setLeft(320)
                .setTop(260)
                .setWidth(104)
                .setCaption("uploader")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label48")
                .setLeft(320)
                .setTop(170)
                .setWidth(104)
                .setCaption("with save button")
            );
            
            append(
                (new xui.UI.Label)
                .setHost(host,"label21")
                .setLeft(320)
                .setTop(230)
                .setWidth(104)
                .setCaption("spin")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput4")
                .setLeft(160)
                .setTop(16)
                .setLabelCaption("comboinput4")
                .setListKey("test2")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput11")
                .setDock("bottom")
                .setLabelCaption("comboinput11")
                .setItems([{"id":"itema", "caption":"itema", "tips":"item a"}, {"id":"itemb", "caption":"itemb", "tips":"item b"}, {"id":"itemc", "caption":"itemc", "tips":"item c"}, {"id":"itemd", "caption":"itemd", "tips":"item d"}])
                .setValue("dock:bottom")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput9")
                .setDisabled(true)
                .setLeft(470)
                .setTop(80)
                .setLabelCaption("comboinput9")
                .setListKey("test2")
            );
            
            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group1")
                .setLeft(30)
                .setTop(330)
                .setWidth(680)
                .setHeight(170)
                .setCaption("Number & Currency")
                .setToggleBtn(false)
            );
            
            host.ctl_group1.append(
                (new xui.UI.Label)
                .setHost(host,"ctl_label37")
                .setLeft(320)
                .setTop(31)
                .setWidth(104)
                .setCaption("US currency")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Label)
                .setHost(host,"ctl_label38")
                .setLeft(320)
                .setTop(61)
                .setWidth(104)
                .setCaption("Germany currency")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Label)
                .setHost(host,"ctl_label39")
                .setLeft(320)
                .setTop(91)
                .setWidth(104)
                .setCaption("Sweden currency")
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"ctl_comboinput23")
                .setLeft(440)
                .setTop(30)
                .setLabelCaption("ctl_comboinput23")
                .setType("currency")
                .setValue(12345.67)
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"ctl_comboinput25")
                .setLeft(440)
                .setTop(60)
                .setLabelCaption("ctl_comboinput23")
                .setType("currency")
                .setGroupingSeparator(".")
                .setDecimalSeparator(",")
                .setCurrencyTpl("DEM *")
                .setValue(12345.67)
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"ctl_comboinput26")
                .setLeft(440)
                .setTop(90)
                .setLabelCaption("ctl_comboinput23")
                .setType("currency")
                .setGroupingSeparator(" ")
                .setCurrencyTpl("SEK *")
                .setValue(12345.67)
            );
            
            host.ctl_group1.append(
                (new xui.UI.Label)
                .setHost(host,"ctl_label41")
                .setLeft(10)
                .setTop(31)
                .setWidth(104)
                .setCaption("US number")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Label)
                .setHost(host,"ctl_label42")
                .setLeft(10)
                .setTop(61)
                .setWidth(104)
                .setCaption("Germany number")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Label)
                .setHost(host,"ctl_label43")
                .setLeft(10)
                .setTop(91)
                .setWidth(104)
                .setCaption("Sweden number")
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"ctl_comboinput28")
                .setLeft(130)
                .setTop(30)
                .setLabelCaption("ctl_comboinput23")
                .setType("number")
                .setValue(12345.67)
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"ctl_comboinput29")
                .setLeft(130)
                .setTop(60)
                .setLabelCaption("ctl_comboinput23")
                .setType("number")
                .setGroupingSeparator(".")
                .setDecimalSeparator(",")
                .setCurrencyTpl("DEM *")
                .setValue(12345.67)
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"ctl_comboinput30")
                .setLeft(130)
                .setTop(90)
                .setLabelCaption("ctl_comboinput23")
                .setType("number")
                .setGroupingSeparator(" ")
                .setCurrencyTpl("SEK *")
                .setValue(12345.67)
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput6")
                .setLeft(160)
                .setTop(50)
                .setTabindex("2")
                .setLabelCaption("comboinput6")
                .setItems([{"id":"a", "caption":"a"}, {"id":"b", "caption":"b"}, {"id":"c", "caption":"c"}])
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput8")
                .setLeft(160)
                .setTop(80)
                .setHeight(48)
                .setTabindex("3")
                .setLabelCaption("comboinput8")
                .setMultiLines(true)
                .setListKey("test2")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput12")
                .setTips("input integer only")
                .setLeft(160)
                .setTop(140)
                .setTabindex("4")
                .setTipsErr("Format error")
                .setLabelCaption("comboinput12")
                .setValueFormat("^-?\\d\\d*$")
                .setItems([{"id":"1", "caption":"1"}, {"id":"2", "caption":"2"}])
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput14")
                .setLeft(160)
                .setTop(170)
                .setTabindex("5")
                .setLabelCaption("comboinput14")
                .setType("cmdbox")
                .beforeComboPop("_comboinput14_beforeComboPop")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput16")
                .setLeft(160)
                .setTop(200)
                .setTabindex("6")
                .setLabelCaption("comboinput16")
                .setListKey("test2")
                .setCustomFunction({"getShowValue":function (profile, value) {
                value = value || "";
                return "[" + value.replace(/[\[\]]*/g, "") + "]";
            }})
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput15")
                .setLeft(160)
                .setTop(230)
                .setTabindex("7")
                .setLabelCaption("comboinput15")
                .setType("time")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput17")
                .setLeft(160)
                .setTop(260)
                .setTabindex("8")
                .setLabelCaption("comboinput17")
                .setType("color")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput5")
                .setLeft(470)
                .setTop(14)
                .setHeight(27)
                .setTabindex("9")
                .setShadow(true)
                .setResizer(true)
                .setLabelCaption("comboinput5")
                .setType("listbox")
                .setListKey("test2")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput7")
                .setLeft(470)
                .setTop(48)
                .setTabindex("10")
                .setLabelCaption("comboinput7")
                .setType("helpinput")
                .setItems([{"id":"id a", "caption":"caption a"}, {"id":"id b", "caption":"caption b"}, {"id":"id c", "caption":"caption c"}])
                .setCommandBtn("save")
                .onCommand("_comboinput28_onsave")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput13")
                .setLeft(470)
                .setTop(110)
                .setTabindex("11")
                .setLabelCaption("comboinput13")
                .setType("getter")
                .setCommandBtn("save")
                .onCommand("_comboinput28_onsave")
                .beforeComboPop("_comboinput13_beforeComboPop")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput15")
                .setLeft(470)
                .setTop(140)
                .setTabindex("12")
                .setLabelCaption("comboinput15")
                .setType("popbox")
                .setCommandBtn("save")
                .onCommand("_comboinput28_onsave")
                .beforeComboPop("_comboinput14_beforeComboPop")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput28")
                .setLeft(470)
                .setTop(170)
                .setTabindex("13")
                .setLabelCaption("comboinput28")
                .setType("none")
                .setCommandBtn("save")
                .onCommand("_comboinput28_onsave")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput35")
                .setLeft(470)
                .setTop(200)
                .setTabindex("14")
                .setLabelCaption("comboinput35")
                .setType("date")
                .setValue("-28800000")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput26")
                .setLeft(470)
                .setTop(230)
                .setTabindex("15")
                .setLabelCaption("comboinput26")
                .setType("spin")
                .setValue(0)
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"comboinput41")
                .setLeft(470)
                .setTop(260)
                .setWidth(240)
                .setTabindex("16")
                .setLabelCaption("comboinput41")
                .setType("upload")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _comboinput13_beforeComboPop:function (profile, pos) {
            profile.boxing().setUIValue(xui.rand());
            return false;
        }, 
        _comboinput14_beforeComboPop:function (profile, pos) {
            xui.message('clicked');
            return false;
        }, 
        _comboinput28_onsave:function (profile, node) {
            xui.message('onSave event')
        }, 
        _onready:function () {
            xui.UI.cacheData('test2',['t1', 't2','t3'])
        }, 
        events:{"onReady":"_onready"}
    }
});