Class('App', 'xui.Com',{
    Instance:{
        events:{"onReady":"_onready"}, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Panel)
                .setHost(host,"panel4")
                .setDock("none")
                .setLeft(30)
                .setTop(20)
                .setWidth(540)
                .setHeight(300)
                .setZIndex(1)
                .setCaption("Update Grid dynamically!")
            );
            
            host.panel4.append((new xui.UI.TreeGrid)
                .setHost(host,"treegrid")
                .setSelMode("single")
            );
            
            append((new xui.UI.Group)
                .setHost(host,"group1")
                .setLeft(40)
                .setTop(340)
                .setWidth(420)
                .setHeight(280)
                .setCaption("Row related")
                .setToggleBtn(false)
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton1")
                .setLeft(40)
                .setTop(20)
                .setWidth(100)
                .setCaption("rowHandler")
                .onClick("_sbutton1_onclick")
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton2")
                .setLeft(40)
                .setTop(50)
                .setWidth(100)
                .setCaption("rowResizer")
                .onClick("_sbutton2_onclick")
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton5")
                .setLeft(40)
                .setTop(80)
                .setWidth(100)
                .setCaption("rowNumbered")
                .onClick("_sbutton5_onclick")
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton6")
                .setLeft(40)
                .setTop(110)
                .setWidth(100)
                .setCaption("altRowsBg")
                .onClick("_sbutton6_onclick")
            );
            
            host.group1.append((new xui.UI.Div)
                .setHost(host,"div1")
                .setLeft(160)
                .setTop(20)
                .setWidth(50)
                .setHeight(20)
            );
            
            host.group1.append((new xui.UI.Div)
                .setHost(host,"div2")
                .setLeft(160)
                .setTop(50)
                .setWidth(50)
                .setHeight(20)
            );
            
            host.group1.append((new xui.UI.Div)
                .setHost(host,"div5")
                .setLeft(160)
                .setTop(80)
                .setWidth(50)
                .setHeight(20)
            );
            
            host.group1.append((new xui.UI.Div)
                .setHost(host,"div6")
                .setLeft(160)
                .setTop(110)
                .setWidth(50)
                .setHeight(20)
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton8")
                .setLeft(220)
                .setTop(190)
                .setWidth(130)
                .setCaption("setRowHeight(30)")
                .onClick("_sbutton8_onclick")
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton54")
                .setLeft(40)
                .setTop(160)
                .setWidth(130)
                .setCaption("getRows('min')")
                .onClick("_sbutton54_onclick")
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton94")
                .setLeft(40)
                .setTop(190)
                .setWidth(130)
                .setCaption("getActiveRow")
                .onClick("_sbutton94_onclick")
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton95")
                .setLeft(40)
                .setTop(220)
                .setWidth(130)
                .setCaption("setActiveRow")
                .onClick("_sbutton95_onclick")
            );
            
            host.group1.append((new xui.UI.Div)
                .setHost(host,"div10")
                .setLeft(360)
                .setTop(190)
                .setWidth(40)
                .setHeight(20)
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton252")
                .setLeft(220)
                .setTop(220)
                .setWidth(130)
                .setCaption("toggleRow")
                .onClick("_sbutton252_onclick")
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton253")
                .setLeft(230)
                .setTop(20)
                .setWidth(120)
                .setCaption("removeRows")
                .onClick("_sbutton253_onclick")
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton254")
                .setLeft(230)
                .setTop(50)
                .setWidth(120)
                .setCaption("insertRows")
                .onClick("_sbutton254_onclick")
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton30")
                .setLeft(230)
                .setTop(80)
                .setWidth(120)
                .setCaption("updateRow")
                .onClick("_sbutton30_onclick")
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton31")
                .setLeft(230)
                .setTop(110)
                .setWidth(120)
                .setCaption("updateRow 2")
                .onClick("_sbutton31_onclick")
            );
            
            host.group1.append((new xui.UI.SButton)
                .setHost(host,"sbutton32")
                .setLeft(230)
                .setTop(140)
                .setWidth(120)
                .setCaption("updateRow 3")
                .onClick("_sbutton32_onclick")
            );
            
            append((new xui.UI.Group)
                .setHost(host,"group2")
                .setLeft(480)
                .setTop(340)
                .setWidth(280)
                .setHeight(280)
                .setCaption("Col related")
                .setToggleBtn(false)
            );
            
            host.group2.append((new xui.UI.SButton)
                .setHost(host,"sbutton3")
                .setLeft(30)
                .setTop(110)
                .setWidth(100)
                .setCaption("colMovable")
                .onClick("_sbutton3_onclick")
            );
            
            host.group2.append((new xui.UI.SButton)
                .setHost(host,"sbutton4")
                .setLeft(30)
                .setTop(80)
                .setWidth(100)
                .setCaption("colHidable")
                .onClick("_sbutton4_onclick")
            );
            
            host.group2.append((new xui.UI.SButton)
                .setHost(host,"sbutton17")
                .setLeft(30)
                .setTop(20)
                .setWidth(100)
                .setCaption("colResizer")
                .onClick("_sbutton17_onclick")
            );
            
            host.group2.append((new xui.UI.SButton)
                .setHost(host,"sbutton18")
                .setLeft(30)
                .setTop(50)
                .setWidth(100)
                .setCaption("colSortable")
                .onClick("_sbutton18_onclick")
            );
            
            host.group2.append((new xui.UI.Div)
                .setHost(host,"div3")
                .setLeft(150)
                .setTop(80)
                .setWidth(70)
                .setHeight(20)
            );
            
            host.group2.append((new xui.UI.Div)
                .setHost(host,"div4")
                .setLeft(150)
                .setTop(110)
                .setWidth(70)
                .setHeight(20)
            );
            
            host.group2.append((new xui.UI.Div)
                .setHost(host,"div7")
                .setLeft(150)
                .setTop(20)
                .setWidth(70)
                .setHeight(20)
            );
            
            host.group2.append((new xui.UI.Div)
                .setHost(host,"div8")
                .setLeft(150)
                .setTop(50)
                .setWidth(70)
                .setHeight(20)
            );
            
            host.group2.append((new xui.UI.SButton)
                .setHost(host,"sbutton7")
                .setLeft(30)
                .setTop(150)
                .setWidth(120)
                .setCaption("setHeaderHeight")
                .onClick("_sbutton7_onclick")
            );
            
            host.group2.append((new xui.UI.SButton)
                .setHost(host,"sbutton53")
                .setLeft(30)
                .setTop(190)
                .setWidth(120)
                .setCaption("getHeader('min')")
                .onClick("_sbutton53_onclick")
            );
            
            host.group2.append((new xui.UI.SButton)
                .setHost(host,"sbutton128")
                .setLeft(170)
                .setTop(220)
                .setWidth(100)
                .setCaption("show Column")
                .onClick("_sbutton128_onclick")
            );
            
            host.group2.append((new xui.UI.SButton)
                .setHost(host,"sbutton129")
                .setLeft(170)
                .setTop(190)
                .setWidth(100)
                .setCaption("hide Column")
                .onClick("_sbutton129_onclick")
            );
            
            host.group2.append((new xui.UI.SButton)
                .setHost(host,"sbutton208")
                .setLeft(30)
                .setTop(220)
                .setWidth(120)
                .setCaption("updateHeader")
                .onClick("_sbutton208_onclick")
            );
            
            host.group2.append((new xui.UI.Div)
                .setHost(host,"div9")
                .setLeft(170)
                .setTop(150)
                .setWidth(40)
                .setHeight(20)
            );
            
            append((new xui.UI.Group)
                .setHost(host,"group3")
                .setLeft(590)
                .setTop(190)
                .setWidth(170)
                .setHeight(120)
                .setCaption("Cell related")
                .setToggleBtn(false)
            );
            
            host.group3.append((new xui.UI.SButton)
                .setHost(host,"sbutton67")
                .setLeft(20)
                .setTop(20)
                .setWidth(130)
                .setCaption("updateCellByRowCol")
                .onClick("_sbutton67_onclick")
            );
            
            host.group3.append((new xui.UI.SButton)
                .setHost(host,"sbutton207")
                .setLeft(20)
                .setTop(60)
                .setWidth(130)
                .setCaption("editCellbyRowCol")
                .onClick("_sbutton207_onclick")
            );
            
            append((new xui.UI.Group)
                .setHost(host,"group4")
                .setLeft(590)
                .setTop(20)
                .setWidth(170)
                .setHeight(150)
                .setCaption("others")
                .setToggleBtn(false)
            );
            
            host.group4.append((new xui.UI.SButton)
                .setHost(host,"sbutton111")
                .setLeft(10)
                .setTop(40)
                .setWidth(90)
                .setCaption("setValue")
                .onClick("_sbutton111_onclick")
            );
            
            host.group4.append((new xui.UI.SButton)
                .setHost(host,"sbutton149")
                .setLeft(10)
                .setTop(10)
                .setWidth(90)
                .setCaption("editable")
                .onClick("_sbutton149_onclick")
            );
            
            host.group4.append((new xui.UI.Div)
                .setHost(host,"div93")
                .setLeft(110)
                .setTop(10)
                .setWidth(50)
                .setHeight(20)
            );
            
            host.group4.append((new xui.UI.SButton)
                .setHost(host,"sbutton28")
                .setLeft(10)
                .setTop(70)
                .setWidth(150)
                .setCaption("setGridHandlerCaption")
                .onClick("_sbutton28_onclick")
            );
            
            host.group4.append((new xui.UI.SButton)
                .setHost(host,"sbutton29")
                .setLeft(10)
                .setTop(100)
                .setWidth(150)
                .setCaption("setRowHandlerWidth")
                .onClick("_sbutton29_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _onready:function (com, threadid) {
            this.treegrid
            .setHeader([
{"caption":"no", "width":60, "type":"label"},
{"caption":"country", "width":60, "type":"listbox", editorListItems:["MA","SP","RA","UK","CA","IN"]},
{"caption":"customer", "width":50, "type":"input"},
{"caption":"employee", "width":70, "type":"input"},
{"caption":"indoor", "width":50,type:"checkbox"},
{"caption":"bill2008", "type":"number", "width":50, cellRenderer : function(cell){return '$'+(parseFloat(cell.value)||0)}},
{"caption":"bill2009", "type":"number", "width":50, cellRenderer : function(cell){return '$'+(parseFloat(cell.value)||0)}},
{"caption":"orderDate", "type":"date",  "width":70},
{"caption":"color", "type":"color",  "width":70},
{"caption":"progress", "type":"progress",  "width":120}
            ])
            .setRows([
["010-0", "MA", "Jerry", "Keith", false, 80, 46, 1242835200000,'#FF3300',0.4],
["010-1", "SP", "Charles", "Marks", false, 40, 90, 1244649600000,'#FDE500',0.5],
["010-2", "SP", "Vincent", "Harrison", false, 31, 40, 1247673600000,'#FFAE00',0.8],
["020-3", "RA", "Edward", "Sidney", true, 80, 47, 1242489600000,'#FABF00',0.4],
["020-4", "CA", "Patrick", "Solomon", true, 33, 38, 1241280000000,'#FEFF00',0.2],
["020-5", "MA", "Leopold", "Glendon", true, 98, 36, 1239552000000,'#FFFCD0',0.3],
["030-6", "SP", "Terence", "Edwin", false, 84, 41, 1237219200000,'#FFFAB0',0.5],
{id:"030-7", cells: ["030-7", "SP", "Brent", "Mike", false, 97, 83, 1243353600000,'#FABF00',0.6], sub:[
    ["030-71", "UK", "Sammy", "Kenneth", false, 31, 64, 1241625600000,'#FFAE00',0.2],
    ["030-72", "CA", "Evan", "Chris", false, 43, 63, 1242835200000,'#FFFAB0',0.9]
]}
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
            this.treegrid.updateHeader('no',{caption:'<span style="background:url(img/img.gif);width:15px;height:15px"></span><span>updated</span>',width:80});
        }, 
        _sbutton252_onclick:function (profile, e, src, value) {
            this.treegrid.toggleRow("030-7");
        }, 
        _sbutton253_onclick:function (profile, e, src, value) {
            this.treegrid.removeRows(['a','b'])
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
            this.treegrid.updateRow('c',{caption:'updated',height:60});
        }, 
        _sbutton31_onclick:function (profile, e, src, value) {
            var ctrl=this.treegrid;
            var row=ctrl.getRowbyRowId('d');
            ctrl.updateRow('d',{sub:row.sub?null:[]});
        }, 
        _sbutton32_onclick:function (profile, e, src, value) {
            this.treegrid.updateRow('d',{cells:["no"]});
            this.treegrid.updateRow('030-7',{group:true});
        }
    }
});