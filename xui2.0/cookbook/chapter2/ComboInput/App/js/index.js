Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Label)
                .setHost(host,"label6")
                .setLeft(32)
                .setTop(200)
                .setWidth(104)
                .setCaption("ongetshowvalue")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label11")
                .setLeft(8)
                .setTop(96)
                .setWidth(136)
                .setCaption("combobox (textarea)")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label3")
                .setLeft(320)
                .setTop(110)
                .setWidth(104)
                .setCaption("getter")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label2")
                .setLeft(8)
                .setTop(144)
                .setWidth(136)
                .setCaption("combobox (integer only)")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label12")
                .setLeft(320)
                .setTop(80)
                .setWidth(104)
                .setCaption("listbox(disabled)")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label5")
                .setLeft(320)
                .setTop(140)
                .setWidth(104)
                .setCaption("pop box")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label1")
                .setLeft(40)
                .setTop(16)
                .setWidth(104)
                .setCaption("combobox")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label10")
                .setLeft(320)
                .setTop(48)
                .setWidth(104)
                .setCaption("helfinput")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label9")
                .setLeft(304)
                .setTop(19)
                .setCaption("listbox(shadow/resizer)")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label6")
                .setLeft(8)
                .setTop(48)
                .setWidth(136)
                .setCaption("combobox (set items)")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label4")
                .setLeft(32)
                .setTop(170)
                .setWidth(104)
                .setCaption("command box")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label44")
                .setLeft(32)
                .setTop(230)
                .setWidth(104)
                .setCaption("time ")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label45")
                .setLeft(32)
                .setTop(260)
                .setWidth(104)
                .setCaption("color ")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label46")
                .setLeft(320)
                .setTop(200)
                .setWidth(104)
                .setCaption("date ")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label47")
                .setLeft(320)
                .setTop(260)
                .setWidth(104)
                .setCaption("uploader")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label48")
                .setLeft(320)
                .setTop(170)
                .setWidth(104)
                .setCaption("with save button")
            );
            
            append((new xui.UI.Label)
                .setHost(host,"label21")
                .setLeft(320)
                .setTop(230)
                .setWidth(104)
                .setCaption("spin")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput4")
                .setLeft(160)
                .setTop(16)
                .setBorder(false)
                .setListKey("test2")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput11")
                .setDock("bottom")
                .setItems([{"id":"itema", "caption":"itema", "tips":"item a"}, {"id":"itemb", "caption":"itemb", "tips":"item b"}, {"id":"itemc", "caption":"itemc", "tips":"item c"}, {"id":"itemd", "caption":"itemd", "tips":"item d"}])
                .setValue("dock:bottom")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput9")
                .setDisabled(true)
                .setLeft(470)
                .setTop(80)
                .setListKey("test2")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput6")
                .setLeft(160)
                .setTop(50)
                .setTabindex("2")
                .setBorder(false)
                .setItems([{"id":"a", "caption":"a"}, {"id":"b", "caption":"b"}, {"id":"c", "caption":"c"}])
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput8")
                .setLeft(160)
                .setTop(80)
                .setHeight(48)
                .setTabindex("3")
                .setBorder(false)
                .setMultiLines(true)
                .setListKey("test2")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput12")
                .setTips("input integer only")
                .setLeft(160)
                .setTop(140)
                .setTabindex("4")
                .setBorder(false)
                .setTipsErr("Format error")
                .setValueFormat("^-?\\d\\d*$")
                .setItems([{"id":"1", "caption":"1"}, {"id":"2", "caption":"2"}])
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput14")
                .setLeft(160)
                .setTop(170)
                .setTabindex("5")
                .setBorder(false)
                .setType("cmdbox")
                .beforeComboPop("_comboinput14_beforeComboPop")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput16")
                .setLeft(160)
                .setTop(200)
                .setTabindex("6")
                .setBorder(false)
                .setListKey("test2")
                .setCustomFunction({"getShowValue":function (profile, value) {
                value = value || "";
                return "[" + value.replace(/[\[\]]*/g, "") + "]";
            }})
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput15")
                .setLeft(160)
                .setTop(230)
                .setTabindex("7")
                .setBorder(false)
                .setType("time")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput17")
                .setLeft(160)
                .setTop(260)
                .setTabindex("8")
                .setBorder(false)
                .setType("color")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput5")
                .setLeft(470)
                .setTop(14)
                .setHeight(27)
                .setTabindex("9")
                .setShadow(true)
                .setResizer(true)
                .setType("listbox")
                .setListKey("test2")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput7")
                .setLeft(470)
                .setTop(48)
                .setTabindex("10")
                .setType("helpinput")
                .setItems([{"id":"id a", "caption":"caption a"}, {"id":"id b", "caption":"caption b"}, {"id":"id c", "caption":"caption c"}])
                .setCommandBtn('save')
                .onCommand("_comboinput28_onsave")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput13")
                .setLeft(470)
                .setTop(110)
                .setTabindex("11")
                .setType("getter")
                .setCommandBtn('save')
                .onCommand("_comboinput28_onsave")
                .beforeComboPop("_comboinput13_beforeComboPop")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput15")
                .setLeft(470)
                .setTop(140)
                .setTabindex("12")
                .setType("popbox")
                .setCommandBtn('save')
                .onCommand("_comboinput28_onsave")
                .beforeComboPop("_comboinput14_beforeComboPop")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput28")
                .setLeft(470)
                .setTop(170)
                .setTabindex("13")
                .setType("none")
                .setCommandBtn('save')
                .onCommand("_comboinput28_onsave")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput35")
                .setLeft(470)
                .setTop(200)
                .setTabindex("14")
                .setType("date")
                .setValue("-28800000")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput26")
                .setLeft(470)
                .setTop(230)
                .setTabindex("15")
                .setType("spin")
                .setValue("0")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput41")
                .setLeft(470)
                .setTop(260)
                .setWidth(240)
                .setTabindex("16")
                .setType("upload")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _comboinput13_beforeComboPop:function (profile, pos) {
            profile.boxing().setUIValue(xui.stamp());
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