xui.Class('App', 'xui.Module',{
    Instance:{
        events:{"onReady":"_onready"},
        iniComponents:function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Panel")
                .setHost(host,"panel4")
                .setDock("none")
                .setLeft(30)
                .setTop(20)
                .setWidth(750)
                .setHeight(210)
                .setZIndex(1)
                .setCaption("Update Grid dynamically!")
            );
            
            host.panel4.append(
                xui.create("xui.UI.TreeGrid")
                .setHost(host,"treegrid")
                .setWidth("300px")
                .setHeight("216px")
                .setSelMode("single")
                );
            
            append(
                xui.create("xui.UI.Pane")
                .setHost(host,"ctl_pane127")
                .setLeft(30)
                .setTop(240)
                .setWidth(750)
                .setHeight(500)
            );
            
            host.ctl_pane127.append(
                xui.create("xui.UI.FoldingTabs")
                .setHost(host,"ctl_foldingtabs16")
                .setItems([{
                    "id" : "e",
                    "caption" : "Grid",
                    "height" : 120
                },
                {
                    "id" : "a",
                    "caption" : "Row related",
                    "height" : 180
                },
                {
                    "id" : "b",
                    "caption" : "Column related",
                    "height" : 130,
                    "image" : ""
                },
                {
                    "id" : "c",
                    "caption" : "Cell Related",
                    "height" : 40
                }])
                .setWidth("216px")
                .setHeight("216px")
                .setValue("e")
                );
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Div")
                .setHost(host,"div1")
                .setLeft(140)
                .setTop(10)
                .setWidth(50)
                .setHeight(20)
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Div")
                .setHost(host,"div2")
                .setLeft(140)
                .setTop(40)
                .setWidth(50)
                .setHeight(20)
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Div")
                .setHost(host,"div5")
                .setLeft(140)
                .setTop(70)
                .setWidth(50)
                .setHeight(20)
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Div")
                .setHost(host,"div6")
                .setLeft(140)
                .setTop(100)
                .setWidth(50)
                .setHeight(20)
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Div")
                .setHost(host,"div10")
                .setLeft(160)
                .setTop(130)
                .setWidth(40)
                .setHeight(20)
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Div")
                .setHost(host,"div3")
                .setLeft(130)
                .setTop(70)
                .setWidth(70)
                .setHeight(20)
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Div")
                .setHost(host,"div4")
                .setLeft(130)
                .setTop(100)
                .setWidth(70)
                .setHeight(20)
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Div")
                .setHost(host,"div7")
                .setLeft(130)
                .setTop(10)
                .setWidth(70)
                .setHeight(20)
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Div")
                .setHost(host,"div8")
                .setLeft(130)
                .setTop(40)
                .setWidth(70)
                .setHeight(20)
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Div")
                .setHost(host,"div9")
                .setLeft(380)
                .setTop(100)
                .setWidth(40)
                .setHeight(20)
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Div")
                .setHost(host,"div93")
                .setLeft(110)
                .setTop(8)
                .setWidth(50)
                .setHeight(20)
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton67")
                .setLeft(30)
                .setTop(10)
                .setWidth(130)
                .setCaption("updateCellByRowCol")
                .onClick("_sbutton67_onclick")
                , "c");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton207")
                .setLeft(360)
                .setTop(10)
                .setWidth(130)
                .setCaption("editCellbyRowCol")
                .onClick("_sbutton207_onclick")
                , "c");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton1")
                .setLeft(20)
                .setTop(10)
                .setWidth(100)
                .setCaption("rowHandler")
                .onClick("_sbutton1_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton2")
                .setLeft(20)
                .setTop(40)
                .setWidth(100)
                .setCaption("rowResizer")
                .onClick("_sbutton2_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton5")
                .setLeft(20)
                .setTop(70)
                .setWidth(100)
                .setCaption("rowNumbered")
                .onClick("_sbutton5_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton6")
                .setLeft(20)
                .setTop(100)
                .setWidth(100)
                .setCaption("altRowsBg")
                .onClick("_sbutton6_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton8")
                .setLeft(20)
                .setTop(130)
                .setWidth(130)
                .setCaption("setRowHeight(30)")
                .onClick("_sbutton8_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton54")
                .setLeft(370)
                .setTop(10)
                .setWidth(130)
                .setCaption("getRows('min')")
                .onClick("_sbutton54_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton94")
                .setLeft(370)
                .setTop(40)
                .setWidth(130)
                .setCaption("getActiveRow")
                .onClick("_sbutton94_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton95")
                .setLeft(370)
                .setTop(70)
                .setWidth(130)
                .setCaption("setActiveRow")
                .onClick("_sbutton95_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton252")
                .setLeft(370)
                .setTop(100)
                .setWidth(130)
                .setCaption("toggleRow")
                .onClick("_sbutton252_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton253")
                .setLeft(210)
                .setTop(10)
                .setWidth(120)
                .setCaption("removeRows")
                .onClick("_sbutton253_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton254")
                .setLeft(210)
                .setTop(40)
                .setWidth(120)
                .setCaption("insertRows")
                .onClick("_sbutton254_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton30")
                .setLeft(210)
                .setTop(70)
                .setWidth(120)
                .setCaption("updateRow")
                .onClick("_sbutton30_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton31")
                .setLeft(210)
                .setTop(100)
                .setWidth(120)
                .setCaption("updateRow 2")
                .onClick("_sbutton31_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton32")
                .setLeft(210)
                .setTop(130)
                .setWidth(120)
                .setCaption("updateRow 3")
                .onClick("_sbutton32_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"ctl_sbutton2005")
                .setLeft(540)
                .setTop(10)
                .setWidth(130)
                .setCaption("autoRowHeight")
                .onClick("_ctl_sbutton2005_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"ctl_sbutton2006")
                .setLeft(540)
                .setTop(40)
                .setWidth(130)
                .setCaption("autoHeaderHeight")
                .onClick("_ctl_sbutton2006_onclick")
                , "a");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton3")
                .setLeft(10)
                .setTop(100)
                .setWidth(100)
                .setCaption("colMovable")
                .onClick("_sbutton3_onclick")
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton4")
                .setLeft(10)
                .setTop(70)
                .setWidth(100)
                .setCaption("colHidable")
                .onClick("_sbutton4_onclick")
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton17")
                .setLeft(10)
                .setTop(10)
                .setWidth(100)
                .setCaption("colResizer")
                .onClick("_sbutton17_onclick")
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton18")
                .setLeft(10)
                .setTop(40)
                .setWidth(100)
                .setCaption("colSortable")
                .onClick("_sbutton18_onclick")
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton7")
                .setLeft(240)
                .setTop(100)
                .setWidth(120)
                .setCaption("setHeaderHeight")
                .onClick("_sbutton7_onclick")
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton53")
                .setLeft(240)
                .setTop(10)
                .setWidth(120)
                .setCaption("getHeader('min')")
                .onClick("_sbutton53_onclick")
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton128")
                .setLeft(390)
                .setTop(40)
                .setWidth(100)
                .setCaption("show Column")
                .onClick("_sbutton128_onclick")
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton129")
                .setLeft(390)
                .setTop(10)
                .setWidth(100)
                .setCaption("hide Column")
                .onClick("_sbutton129_onclick")
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton208")
                .setLeft(240)
                .setTop(40)
                .setWidth(120)
                .setCaption("updateHeader")
                .onClick("_sbutton208_onclick")
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"ctl_sbutton2713")
                .setLeft(520)
                .setTop(10)
                .setWidth(130)
                .setCaption("autoColWidth")
                .onClick("_ctl_sbutton2713_onclick")
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"ctl_sbutton2914")
                .setLeft(520)
                .setTop(70)
                .setWidth(130)
                .setCaption("insertCol")
                .onClick("_ctl_sbutton2914_onclick")
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"ctl_sbutton2915")
                .setLeft(520)
                .setTop(100)
                .setWidth(130)
                .setCaption("removeCols")
                .onClick("_ctl_sbutton2915_onclick")
                , "b");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton111")
                .setLeft(10)
                .setTop(38)
                .setWidth(150)
                .setCaption("setValue (select 2rd row)")
                .onClick("_sbutton111_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton149")
                .setLeft(10)
                .setTop(8)
                .setWidth(90)
                .setCaption("editable")
                .onClick("_sbutton149_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton28")
                .setLeft(10)
                .setTop(68)
                .setWidth(150)
                .setCaption("setGridHandlerCaption")
                .onClick("_sbutton28_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"sbutton29")
                .setLeft(10)
                .setTop(98)
                .setWidth(150)
                .setCaption("setRowHandlerWidth")
                .onClick("_sbutton29_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"ctl_sbutton61")
                .setLeft(200)
                .setTop(8)
                .setWidth(130)
                .setCaption("set cell background")
                .onClick("_ctl_sbutton61_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"ctl_sbutton62")
                .setLeft(380)
                .setTop(8)
                .setWidth(130)
                .setCaption("\"left\" align header")
                .onClick("_ctl_sbutton62_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"ctl_sbutton63")
                .setLeft(200)
                .setTop(68)
                .setWidth(130)
                .setCaption("hide grid line")
                .onClick("_ctl_sbutton63_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"ctl_sbutton64")
                .setLeft(200)
                .setTop(38)
                .setWidth(130)
                .setCaption("set Custom cell tips")
                .onClick("_ctl_sbutton64_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"ctl_sbutton65")
                .setLeft(380)
                .setTop(68)
                .setWidth(130)
                .setCaption("disable tips")
                .onClick("_ctl_sbutton65_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"ctl_sbutton66")
                .setLeft(380)
                .setTop(98)
                .setWidth(130)
                .setCaption("enable tips")
                .onClick("_ctl_sbutton66_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"ctl_sbutton351")
                .setLeft(200)
                .setTop(98)
                .setWidth(130)
                .setCaption("show grid line")
                .onClick("_ctl_sbutton351_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"ctl_sbutton712")
                .setLeft(380)
                .setTop(38)
                .setWidth(130)
                .setCaption("set a row's height")
                .onClick("_ctl_sbutton712_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_htmlbutton1")
                .setLeft(542)
                .setTop(5)
                .setWidth(130)
                .setHeight(22)
                .setCaption("TreeMode(infirstcell)")
                .onClick("_xui_ui_htmlbutton1_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_htmlbutton2")
                .setLeft(540)
                .setTop(40)
                .setWidth(130)
                .setHeight(22)
                .setCaption("TreeMode(inhandler)")
                .onClick("_xui_ui_htmlbutton2_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button256")
                .setLeft(540)
                .setTop(70)
                .setWidth(130)
                .setHeight(22)
                .setCaption("Freeze first row")
                .setType("status")
                .onClick("_xui_uibt256_onclick")
                , "e");
            
            host.ctl_foldingtabs16.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button257")
                .setLeft(540)
                .setTop(100)
                .setWidth(130)
                .setHeight(22)
                .setType("status")
                .setCaption("Freeze first colomn")
                .onClick("_xui_uibt257_onclick")
                , "e");
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },
        _onready:function (com, threadid) {
            this.treegrid
            .setHeader([
{"id":"no", "width":60, "type":"label"},
{"id":"country", "width":60, "type":"listbox", editorListItems:["MA","SP","RA","UK","CA","IN"]},
{"id":"customer", "width":50, "type":"input"},
{"id":"employee", "width":70, "type":"input"},
{"id":"indoor", "width":50,type:"checkbox"},
{"id":"bill2008", "type":"number", "width":50, cellRenderer : function(cell){return '$'+(parseFloat(cell.value)||0);}},
{"id":"bill2009", "type":"number", "width":50, cellRenderer : function(cell){return '$'+(parseFloat(cell.value)||0);}},
{"id":"orderDate", "type":"date",  "width":70},
{"id":"color", "type":"color",  "width":70},
{"id":"progress", "type":"progress",  "width":120}
            ])
            .setRows([
["010-0", "MA", "Jerry", "Keith", false, 80, 46, 1242835200000,'#FF3300',0.4],
["010-1", "SP", "Charles", "Marks", false, 40, 90, 1244649600000,'#FDE500',0.5],
["010-2", "SP", "Vincent", "Harrison", false, 31, 40, 1247673600000,'#FFAE00',0.8],
["030-6", "SP", "Terence", "Edwin", false, 84, 41, 1237219200000,'#FFFAB0',0.5],
{id:"030-7", cells: ["030-7", "SP", "Brent", "Mike", false, 97, 83, 1243353600000,'#FABF00',0.6], sub:[
    ["030-71", "UK", "Sammy", "Kenneth", false, 31, 64, 1241625600000,'#FFAE00',0.2],
    ["030-72", "CA", "Evan", "Chris", false, 43, 63, 1242835200000,'#FFFAB0',0.9]
]},
["020-3", "RA", "Edward", "Sidney", true, 80, 47, 1242489600000,'#FABF00',0.4],
["020-4", "CA", "Patrick", "Solomon", true, 33, 38, 1241280000000,'#FEFF00',0.2],
["020-5", "MA", "Leopold", "Glendon", true, 98, 36, 1239552000000,'#FFFCD0',0.3]
            ]);


            var n=this, t=n.treegrid;
            n.div1.setHtml(t.getRowHandler());
            n.div2.setHtml(t.getRowResizer());
            n.div3.setHtml(t.getColHidable());
            n.div4.setHtml(t.getColMovable());
            n.div5.setHtml(t.getRowNumbered());
            n.div6.setHtml(t.getAltRowsBg());
            n.div7.setHtml(t.getColResizer());
            n.div8.setHtml(t.getColSortable());
            n.div9.setHtml(t.getHeaderHeight());
            n.div10.setHtml(t.getRowHeight());
            n.div93.setHtml(t.getEditable());
        },
        _sbutton1_onclick:function (profile, e, src, value) {
            this.treegrid.setRowHandler( !this.treegrid.getRowHandler() );
            this.div1.setHtml(this.treegrid.getRowHandler())
        },
        _sbutton2_onclick:function (profile, e, src, value) {
            this.treegrid.setRowResizer( !this.treegrid.getRowResizer() );
            this.div2.setHtml(this.treegrid.getRowResizer());
        },
        _sbutton4_onclick:function (profile, e, src, value) {
            this.treegrid.setColHidable( !this.treegrid.getColHidable());
            this.div3.setHtml(this.treegrid.getColHidable());
        },
        _sbutton3_onclick:function (profile, e, src, value) {
            this.treegrid.setColMovable( !this.treegrid.getColMovable());
             this.div4.setHtml(this.treegrid.getColMovable());
        },
        _sbutton5_onclick:function (profile, e, src, value) {
            this.treegrid.setRowNumbered( !this.treegrid.getRowNumbered());
             this.div5.setHtml(this.treegrid.getRowNumbered());
        },
        _sbutton6_onclick:function (profile, e, src, value) {
            this.treegrid.setAltRowsBg( !this.treegrid.getAltRowsBg());
            this.div6.setHtml(this.treegrid.getAltRowsBg());
        },
        _sbutton7_onclick:function (profile, e, src, value) {
            this.treegrid.setHeaderHeight(30);
            this.div9.setHtml(this.treegrid.getHeaderHeight());
        },
        _sbutton8_onclick:function (profile, e, src, value) {
            this.treegrid.setRowHeight(30)
            this.div10.setHtml(this.treegrid.getRowHeight());
        },
        _sbutton17_onclick:function (profile, e, src, value) {
            this.treegrid.setColResizer( !this.treegrid.getColResizer());
            this.div7.setHtml(this.treegrid.getColResizer());
        },
        _sbutton18_onclick:function (profile, e, src, value) {
            this.treegrid.setColSortable( !this.treegrid.getColSortable());
            this.div8.setHtml(this.treegrid.getColSortable());
        },
        _sbutton53_onclick:function (profile, e, src, value) {
            alert(xui.serialize(this.treegrid.getHeader('min')))
        },
        _sbutton54_onclick:function (profile, e, src, value) {
            alert(xui.serialize(this.treegrid.getRows('min')))
        },
        _sbutton67_onclick:function (profile, e, src, value) {
            var rows=this.treegrid.getRows();
            this.treegrid.updateCellByRowCol(rows[0].id,'no',{type:"checkbox",value:true})
            this.treegrid.updateCellByRowCol(rows[1].id,'no',{value:"updated", caption:'<span style="background:url(img/img.gif);width:15px;height:15px"></span><span>updated</span>'})
        },
        _sbutton94_onclick:function (profile, e, src, value) {
            var ar=this.treegrid.getActiveRow();
            alert(ar?ar.id:null);
        },
        _sbutton95_onclick:function (profile, e, src, value) {
            var rows=this.treegrid.getRows('data');
            this.treegrid.setActiveRow(rows[2].id);
        },
        _sbutton111_onclick:function (profile, e, src, value) {
            var rows=this.treegrid.getRows('data');
            this.treegrid.setValue(rows[1].id,true);
        },
        _sbutton128_onclick:function (profile, e, src, value) {
            this.treegrid.showColumn('employee',true);
        },
        _sbutton129_onclick:function (profile, e, src, value) {
            this.treegrid.showColumn('employee',false);
        },
        _sbutton149_onclick:function (profile, e, src, value) {
            this.treegrid.setEditable( !this.treegrid.getEditable());
            this.div93.setHtml(this.treegrid.getEditable());
        },
        _sbutton207_onclick:function (profile, e, src, value) {
            var rows=this.treegrid.getRows();
            this.treegrid.editCellbyRowCol(rows[0].id,'country')
        },
        _sbutton208_onclick:function (profile, e, src, value) {
            this.treegrid.updateHeader('no',{caption:'<span style="background:url(img/img.gif);width:15px;height:15px"></span><span>updated</span>',width:170});
        },
        _sbutton252_onclick:function (profile, e, src, value) {
            this.treegrid.toggleRow("030-7");
        },
        _sbutton253_onclick:function (profile, e, src, value) {
            this.treegrid.removeRows(['-a','-b']);
            xui.message('Two rows were removed!');
        },
        _sbutton254_onclick:function (profile, e, src, value) {
            this.treegrid.insertRows([["090-0", "MA", "Jerry", "Keith", false, 82, 56, 1242835200000,'#FFdd00',0.8]]);
        },
        _sbutton28_onclick:function (profile, e, src, value) {
            this.treegrid.setGridHandlerCaption('tg');
        },
        _sbutton29_onclick:function (profile, e, src, value) {
            this.treegrid.setRowHandlerWidth(100);
        },
        _sbutton30_onclick:function (profile, e, src, value) {
            this.treegrid.updateRow('-c',{caption:'updated',height:60});
            this.treegrid.setUIValue('-c');
        },
        _sbutton31_onclick:function (profile, e, src, value) {
            var ctrl=this.treegrid;
            var row=ctrl.getRowbyRowId('-d');
            ctrl.updateRow('-d',{sub:row.sub?null:[]});
            this.treegrid.setUIValue('-d');
        },
        _sbutton32_onclick:function (profile, e, src, value) {
            this.treegrid.updateRow('-d',{cells:["no"]});
            this.treegrid.updateRow('030-7',{group:true});
            this.treegrid.setUIValue('030-7');
        },
        _ctl_sbutton61_onclick : function (profile, e, src, value) {
            var rows=this.treegrid.getRows();
            this.treegrid.updateCellByRowCol(rows[0].id,'no',{cellStyle:"background-color:red"});
            xui.message("the first cell's background color is red now");
        },
        _ctl_sbutton62_onclick : function (profile, e, src, value) {
            this.treegrid.updateHeader("no", {headerStyle:"text-align:left"});
            xui.message("the first column align 'left' now");
        },
        _ctl_sbutton63_onclick : function (profile, e, src, value) {
            this.treegrid.setClassName("gridcellnoborder");
            
            var css =   ".gridcellnoborder .xui-treegrid-fcell,"
                      + ".gridcellnoborder .xui-treegrid-cell,"
                      + ".gridcellnoborder .xui-treegrid-cells"
                      + "{border-color:transparent;}";
    
            xui.CSS.addStyleSheet(css , "gridcellnoborder",true);
        },
        _ctl_sbutton351_onclick : function (profile, e, src, value) {
            this.treegrid.setClassName("");
            xui.CSS.remove("id", "gridcellnoborder");
        },
        _ctl_sbutton65_onclick : function (profile, e, src, value) {
            this.treegrid.setDisableTips(true);
        },
        _ctl_sbutton66_onclick : function (profile, e, src, value) {
            this.treegrid.setDisableTips(false);
        },
        _ctl_sbutton64_onclick : function (profile, e, src, value) {
            var rows=this.treegrid.getRows();
            this.treegrid.updateCellByRowCol(rows[0].id,'no',{tips:"custom tips"});
            xui.message("the first cell has custom tips now");
        },
        _ctl_sbutton712_onclick : function (profile, e, src, value) {
            var rows=this.treegrid.getRows();
            this.treegrid.updateRow(rows[0].id,{height:100});
            xui.message("the first row's height is 100px now");
        },
        _ctl_sbutton2005_onclick:function (profile, e, src, value){
            this.treegrid.autoRowHeight();
        },
        _ctl_sbutton2006_onclick:function (profile, e, src, value){
            this.treegrid.autoColHeight();
        },
        _ctl_sbutton2713_onclick:function (profile, e, src, value){
            this.treegrid.autoColWidth();
        },
        _ctl_sbutton2914_onclick:function (profile, e, src, value){
            this.treegrid.insertCol("tail",[{type:'checkbox'},{type:'date'},{type:'color'}]);
        },
        _ctl_sbutton2915_onclick:function (profile, e, src, value){
            this.treegrid.removeCols(["orderDate","progress"]);
        },
        _xui_ui_htmlbutton2_onclick:function (profile, e, src){
            this.treegrid.setTreeMode("inhandler");
        },
        _xui_ui_htmlbutton1_onclick:function (profile, e, src){
            this.treegrid.setTreeMode("infirstcell");
        },
        _xui_uibt256_onclick:function (profile, e, src, value){
            this.treegrid.setFreezedRow(value?1:0);
        },
        _xui_uibt257_onclick:function (profile, e, src, value){
            this.treegrid.setFreezedColumn(value?1:0);
        }
    }
});