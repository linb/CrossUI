Class('App', 'xui.Com',{
    Instance:{
        initialize : function(){
            this.autoDestroy = true;
            this.properties = {};
        },
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Dialog)
                .setHost(host,"ctl_dialog2")
                .setLeft(10)
                .setTop(10)
                .setWidth(380)
                .setCaption("FusionChartFree")
                .setMinBtn(false)
                .setMaxBtn(false)
                .setCloseBtn(false)
            );
            
            host.ctl_dialog2.append(
                (new xui.UI.FusionChartFree)
                .setHost(host,"ctl_fusionchartfree1")
                .setDock("fill")
                .setFC_swfPath("http://www.crossui.com/RAD/FusionChartsFree/Charts/")
                .setFC_demoDataPath("http://www.crossui.com/RAD/FusionChartsFree/Data/")
                .setFC_attrs({"bgcolor":"transparent", "quality":"high", "allowScriptAccess":"always", "debugMode":"false", "registerWithJS":"1", "scaleMode":"noScale"})
                .setFC_labels({"PBarLoadingText":"Loading Chart. Please Wait", "XMLLoadingText":"Retrieving Data. Please Wait", "ParsingDataText":"Reading Data. Please Wait", "ChartNoDataText":"No data to display", "RenderingChartText":"Rendering Chart. Please Wait", "LoadDataErrorText":"Error in loading data", "InvalidXMLText":"Invalid XML data"})
                .setFC_data({"graph":{"@caption":"Monthly Unit Sales", "@xAxisName":"Month", "@yAxisName":"Units", "@decimalPrecision":"0", "@formatNumberScale":"0", "set":[{"@name":"Jan", "@value":"462", "@color":"AFD8F8"}, {"@name":"Feb", "@value":"857", "@color":"F6BD0F"}, {"@name":"Mar", "@value":"671", "@color":"8BBA00"}, {"@name":"Apr", "@value":"494", "@color":"FF8E46"}, {"@name":"May", "@value":"761", "@color":"008E8E"}, {"@name":"Jun", "@value":"960", "@color":"D64646"}, {"@name":"Jul", "@value":"629", "@color":"8E468E"}, {"@name":"Aug", "@value":"622", "@color":"588526"}, {"@name":"Sep", "@value":"376", "@color":"B3AA00"}, {"@name":"Oct", "@value":"494", "@color":"008ED6"}, {"@name":"Nov", "@value":"761", "@color":"9D080D"}, {"@name":"Dec", "@value":"960", "@color":"A186BE"}]}})
                .onFC_Click("_ctl_fusionchartfree1_onfc_click")
                .onFC_PrepareXML("_ctl_fusionchartfree1_onfc_preparexml")
            );
            
            append(
                (new xui.UI.Dialog)
                .setHost(host,"ctl_dialog3")
                .setLeft(410)
                .setTop(10)
                .setWidth(380)
                .setCaption("FusionChart3")
                .setMinBtn(false)
                .setMaxBtn(false)
                .setCloseBtn(false)
            );
            
            host.ctl_dialog3.append(
                (new xui.UI.FusionChart3)
                .setHost(host,"ctl_fusionchart31")
                .setDock("fill")
                .setFC_swfPath("http://www.crossui.com/RAD/FusionCharts3/Charts/")
                .setFC_demoDataPath("http://www.crossui.com/RAD/FusionCharts3/Data/")
                .setFC_attrs({"bgcolor":"transparent", "quality":"high", "allowScriptAccess":"always", "debugMode":"false", "registerWithJS":"1", "scaleMode":"noScale"})
                .setFC_labels({"PBarLoadingText":"Loading Chart. Please Wait", "XMLLoadingText":"Retrieving Data. Please Wait", "ParsingDataText":"Reading Data. Please Wait", "ChartNoDataText":"No data to display", "RenderingChartText":"Rendering Chart. Please Wait", "LoadDataErrorText":"Error in loading data", "InvalidXMLText":"Invalid XML data"})
                .setFC_data({"chart":{"@palette":"2", "@caption":"Unit Sales", "@xAxisName":"Month", "@yAxisName":"Units", "@showValues":"0", "@decimals":"0", "@formatNumberScale":"0", "@useRoundEdges":"1", "set":[{"@label":"Jan", "@value":"462"}, {"@label":"Feb", "@value":"857"}, {"@label":"Mar", "@value":"671"}, {"@label":"Apr", "@value":"494"}, {"@label":"May", "@value":"761"}, {"@label":"Jun", "@value":"960"}]}})
                .onFC_Click("_ctl_fusionchart31_onfc_click")
                .onFC_PrepareXML("_ctl_fusionchart31_onfc_preparexml")
                .onFC_Loaded("_ctl_fusionchart31_onfc_loaded")
                .onFC_Rendered("_ctl_fusionchart31_onfc_rendered")
                .onFC_DataLoaded("_ctl_fusionchart31_onfc_dataloaded")
                .onFC_DataLoadError("_ctl_fusionchart31_onfc_dataloaderror")
                .onFC_NoDataToDisplay("_ctl_fusionchart31_onfc_nodatatodisplay")
                .onFC_DataXMLInvalid("_ctl_fusionchart31_onfc_dataxmlinvalid")
            );
            
            append(
                (new xui.UI.Dialog)
                .setHost(host,"ctl_dialog46")
                .setLeft(800)
                .setTop(10)
                .setWidth(210)
                .setHeight(440)
                .setCaption("Events")
                .setMinBtn(false)
                .setMaxBtn(false)
                .setCloseBtn(false)
                .setRefreshBtn(true)
                .onRefresh("_ctl_dialog46_onrefresh")
            );
            
            append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_sbutton5")
                .setLeft(430)
                .setTop(330)
                .setCaption("Print FC3")
                .onClick("_ctl_sbutton5_onclick")
            );
            
            append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_sbutton6")
                .setLeft(500)
                .setTop(330)
                .setCaption("getDataAsCSV FC3")
                .onClick("_ctl_sbutton6_onclick")
            );
            
            append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_sbutton7")
                .setLeft(630)
                .setTop(330)
                .setCaption("hasRendered FC3")
                .onClick("_ctl_sbutton7_onclick")
            );
            
            append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_sbutton8")
                .setLeft(430)
                .setTop(370)
                .setCaption("getXML FC3")
                .onClick("_ctl_sbutton8_onclick")
            );
            
            append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_sbutton9")
                .setLeft(520)
                .setTop(370)
                .setCaption("getChartAttribute FC3")
                .onClick("_ctl_sbutton9_onclick")
            );
            
            append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_sbutton10")
                .setLeft(430)
                .setTop(420)
                .setCaption("setDataXML(\"\") to FC3")
                .onClick("_ctl_sbutton10_onclick")
            );
            
            append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_sbutton11")
                .setLeft(130)
                .setTop(340)
                .setCaption("setDataXML(\"\") to FCF")
                .onClick("_ctl_sbutton11_onclick")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"ctl_comboinput4")
                .setLeft(130)
                .setTop(370)
                .setWidth(130)
                .setType("listbox")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setValue("Column2D")
                .onChange("_ctl_comboinput4_onchange")
            );
            
            append(
                (new xui.UI.ComboInput)
                .setHost(host,"ctl_comboinput6")
                .setLeft(590)
                .setTop(420)
                .setWidth(130)
                .setType("listbox")
                .setValue("Column2D")
                .onChange("_ctl_comboinput6_onchange")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        events : {"onReady":"_com_onready"},
        _ctl_fusionchartfree1_onfc_click : function (profile, args) {
            this.showMsg("FCF click:"+args);
        },
        _ctl_fusionchartfree1_onfc_preparexml : function (profile, json, callback) {
            this.showMsg("FCF preparexml ");
        },
        _ctl_fusionchart31_onfc_click : function (profile, args) {
            this.showMsg("FC3 click:"+args);
        },
        _ctl_fusionchart31_onfc_dataloaderror : function (profile) {
            this.showMsg("FC3 dataloaderror");
        },
        _ctl_fusionchart31_onfc_dataloaded : function (profile) {
            this.showMsg("FC3 dataloaded");
        },
        _ctl_fusionchart31_onfc_dataxmlinvalid : function (profile) {
            this.showMsg("FC3 dataxmlinvalid");
        },
        _ctl_fusionchart31_onfc_loaded : function (profile) {
            this.showMsg("FC3 loaded");
        },
        _ctl_fusionchart31_onfc_nodatatodisplay : function (profile) {
            this.showMsg("FC3 nodatatodisplay ");
        },
        _ctl_fusionchart31_onfc_preparexml : function (profile, json, callback) {
            this.showMsg("FC3 preparexml");
        },
        _ctl_fusionchart31_onfc_rendered : function (profile) {
            this.showMsg("FC3 rendered");
        },
        showMsg:function(msg){
            this.ctl_dialog46.append("<div>"+msg+"</div>");
        },
        _ctl_sbutton5_onclick : function (profile, e, src, value) {
            this.ctl_fusionchart31.print();
        },
        _ctl_sbutton6_onclick : function (profile, e, src, value) {
            xui.alert(this.ctl_fusionchart31.getDataAsCSV());
        },
        _ctl_sbutton7_onclick : function (profile, e, src, value) {
            xui.alert(this.ctl_fusionchart31.hasRendered());
        },
        _ctl_sbutton8_onclick : function (profile, e, src, value) {
            xui.alert(this.ctl_fusionchart31.getXML());
        },
        _ctl_sbutton9_onclick : function (profile, e, src, value) {
            xui.alert(this.ctl_fusionchart31.getChartAttribute('quality'));
        },
        _ctl_sbutton11_onclick : function (profile, e, src, value) {
            this.ctl_fusionchartfree1.setDataXML("");
        },
        _ctl_sbutton10_onclick : function (profile, e, src, value) {
           this.ctl_fusionchart31.setDataXML("");
        },
        _com_onready : function (com, threadid) {
            this.ctl_comboinput4.setItems(xui.UI.FusionChartFree.$DataModel.FC_chartType.combobox);
            this.ctl_comboinput6.setItems(xui.UI.FusionChart3.$DataModel.FC_chartType.combobox);
        },
        _ctl_comboinput4_onchange : function (profile, oldValue, newValue) {
            this.ctl_fusionchartfree1.setFC_chartType(newValue);
        },
        _ctl_comboinput6_onchange : function (profile, oldValue, newValue) {
            this.ctl_fusionchart31.setFC_chartType(newValue);
        },
        _ctl_dialog46_onrefresh : function (profile) {
            var ns = this, uictrl = profile.boxing();
            uictrl.setHtml("",true);
        }
    }
});