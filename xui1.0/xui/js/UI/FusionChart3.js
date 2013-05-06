Class("xui.UI.FusionChart3", "xui.UI.FusionChartFree",{
    Instance:{
        setDataXML:function(xml){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.setDataXML(xml);
        },
        print:function(){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.print();
        },
        setDataURL:function(strDataURL){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.setDataURL(strDataURL);
        },
        getDataAsCSV:function(){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.getDataAsCSV();
        },
        hasRendered:function(){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.hasRendered();
        },
        getChartAttribute:function(attrName){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.getChartAttribute(attrName);
        },
        getXML:function(){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.getXML();
        },
        callFCFunction:function(funName, funArgs){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart[funName].apply(chart, funArgs);
        }
    },
    Initialize:function(){
        var ns=this,fireEvent=function(domId, eName){
            if(domId && ns._getSWF(domId)){
                var instance=ns.getFromDom(ns.KEY+":"+domId.replace(ns._idtag,'')+":"),
                    prf=instance && instance.get(0);
                if(prf && prf[eName])
                    instance[eName](prf);
                }
            },
            old;
        old=window.FC_Loaded;
        window.FC_Loaded=function(domId){
            fireEvent(domId,"onFC_Loaded");
            if(old)old(domId);
        };
        old=window.FC_Rendered;
        window.FC_Rendered=function(domId){
            fireEvent(domId,"onFC_Rendered");
            if(old)old(domId);
        };
        old=window.FC_DataLoaded;
        window.FC_DataLoaded=function(domId){
            fireEvent(domId,"onFC_DataLoaded");
            if(old)old(domId);
        };
        old=window.FC_DataLoadError;
        window.FC_DataLoadError=function(domId){
            fireEvent(domId,"onFC_DataLoadError");
            if(old)old(domId);
        };
        old=window.FC_NoDataToDisplay;
        window.FC_NoDataToDisplay=function(domId){
            fireEvent(domId,"onFC_NoDataToDisplay");
            if(old)old(domId);
        };
        old=window.FC_DataXMLInvalid;
        window.FC_DataXMLInvalid=function(domId){
            fireEvent(domId,"onFC_DataXMLInvalid");
            if(old)old(domId);
        };
    },
    Static:{
        _idtag:"xui_UI_FC3_", 
        _FC_SWFFILEPRETAG:"",
        DataModel:{
            selectable:true,
            FC_chartType:{
                combobox:"Column2D,Column3D,Pie2D,Pie3D,Line,Bar2D,Area2D,Doughnut2D,Doughnut3D,MSColumn2D,MSColumn3D,MSLine,MSArea,MSBar2D,MSBar3D,StackedColumn2D,StackedColumn3D,StackedArea2D,StackedBar2D,StackedBar3D,MSStackedColumn2D,MSCombi2D,MSCombi3D,MSColumnLine3D,MSCombiDY2D,MSColumn3DLineDY,StackedColumn3DLineDY,MSStackedColumn2DLineDY,Scatter,Bubble,ScrollColumn2D,ScrollLine2D,ScrollArea2D,ScrollStackedColumn2D,ScrollCombi2D,ScrollCombiDY2D".split(',')
            },
            FC_swfPath:"FusionCharts3/Charts/",
            FC_demoDataPath:"FusionCharts3/Data/"
        },
        EventHandlers:{
            onFC_Loaded:function(profile){},
            onFC_Rendered:function(profile){},
            onFC_DataLoaded:function(profile){},
            onFC_DataLoadError:function(profile){},
            onFC_NoDataToDisplay:function(profile){},
            onFC_DataXMLInvalid:function(profile){}
        }
    }
});