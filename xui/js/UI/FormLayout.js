xui.Class("xui.UI.FormLayout",["xui.UI"],{
    Initialize:function(){
        this.addTemplateKeys(['TABLE','CAPTION','TH', 'TR','TD','THF','THTF', 'TRF','THT','CBORDER','CBT','CBL','HOLDER','HIDER','SPREADER']);
    },
    Instance:{
        _isDesignMode:function(){
            return this.getMode()=="design";
        },
        getContainer:function(subId){
            var prf=this.get(0);
            if(prf.ItemIdMapSubSerialId && prf.ItemIdMapSubSerialId[subId]){
                return arguments.callee.upper.apply(this,[subId]);
            }else{
                return this.getSubNode("POOL");
            }
        },
        setMatrix:function(arr_arr, merged, keep_rows, keep_cols, colSetting, rowSetting){
            if(!arr_arr)arr_arr=[];
            keep_rows = keep_rows||0;
            keep_cols = keep_cols||0;
            return this.each(function(prf){
                var layoutData = xui.copy(prf.properties.layoutData);
                layoutData.cols = keep_rows ? layoutData.cols : ((arr_arr[0]?arr_arr[0].length:0) + keep_cols);
                layoutData.rows = arr_arr.length + keep_rows;
                if(colSetting)layoutData.colSetting = colSetting;
                if(rowSetting)layoutData.rowSetting = rowSetting;
                if(merged)layoutData.merged = merged;
                var cells = {};
                xui.arr.each(arr_arr, function(arr, i){
                    xui.arr.each(arr, function(v, j){
                        cells[xui.ExcelFormula.toCellId(j+keep_cols,i+keep_rows)] = v;
                    });
                });
                if(keep_rows){
                    xui.each(layoutData.cells, function(cell,id){
                        if(parseInt(id.replace(/[^\d]/g,'')) <= keep_rows && xui.ExcelFormula.toColumnNum(id.replace(/[\d]/g,'')) <= layoutData.cols){
                            cells[id] = xui.copy(cell);
                        }
                    });
                }
                if(keep_cols){
                    xui.each(layoutData.cells, function(cell,id){
                        if(xui.ExcelFormula.toColumnNum(id.replace(/[\d]/g,'')) <= keep_cols && layoutData.rows){
                            cells[id] = xui.copy(cell);
                        }
                    });
                }
                layoutData.cells = cells;
                prf.properties.layoutData = layoutData;
                prf.box._rerender(prf);
            });
        }
    },
    Static:{
        HasHtmlTableNode:1,
        _ITEMKEY:"TD",
        _CONTAINERKEY:"TD",
        _ITEMCONTAINER:1,
        _getActiveHanders:function(prf){
            return prf.boxing()._isDesignMode()?['KEY','HOLDER']:null;
        },
        _NoProp : {"conLayoutColumns":1},
        _objectProp:{layoutData:1},
        Appearances:{
            KEY:{
                overflow:'hidden'
            },
            BOX:{
                position:'relative',
                left:0,
                top:0,
                'z-index':1
            },
            CBORDER:{
                position:'absolute',
                left:0,
                top:0
            },
            'CBORDER div':{
                position:'absolute',
                display:'block'
            },
            POOL:{
                position:'absolute',
                left:'-100%',
                top:'-100%',
                width:0,
                height:0
            },
            HOLDER:{
                overflow:'auto',
                position: 'relative'
            },
            TABLE:{
                'overflow':'hidden',
                'border-collapse': 'separate',
                'border-spacing': '0',
                margin: '0',
                'border-width': '0',
                'table-layout': 'fixed',
                width: '0',
                'outline-width': '0',
                cursor: 'default',
                'max-width': 'none',
                'max-height': 'none'
            },
            "TD:empty:after":{
                'text-align': 'center',
                color: '#ccc',
                content: 'attr(data-coord)',
                position: 'absolute',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                margin: 'auto',
                height: '1.5em',
                '-moz-user-select': xui.browser.gek?'-moz-none':null,
                '-khtml-user-select': xui.browser.kde?'none':null,
                '-webkit-user-select': xui.browser.kde?'none':null,
                '-o-user-select':xui.browser.opr?'none':null,
                '-ms-user-select':(xui.browser.ie||xui.browser.newie)?'none':null,
                'user-select':'none',
                'touch-action':'none'
            },
             // {{ for read/write mode (layout-cell)
             "TD, THT, THTF":{
              "border-right": "1px solid transparent",
              "border-bottom": "1px solid transparent",
              "border-left": "none",
              "border-top": "none",
               $order:1
             },
            "TD.firstrow, THT, THTF":{
              "border-top": "1px solid transparent",
               $order:2
             },
            "TD.firstcol, THT.firstcol, THF, THTF":{
              "border-left": "1px solid transparent",
               $order:2
             },
            "BOX.solidgridline TD, BOX.solidgridline THT, BOX.solidgridline THF, BOX.solidgridline THTF":{
              "border-right": "1px solid #444",
              "border-bottom": "1px solid #444",
              "border-left": "none",
              "border-top": "none",
               $order:3
             },
            "BOX.solidgridline TD.firstrow, BOX.solidgridline THF.firstrow, BOX.solidgridline THT, BOX.solidgridline THTF":{
              "border-top": "1px solid #444",
               $order:4
             },
            "BOX.solidgridline TD.firstcol, BOX.solidgridline THT.firstcol, BOX.solidgridline THF, BOX.solidgridline THTF":{
              "border-left": "1px solid #444",
               $order:4
             },
             // }}

             // {{ for design mode (handsontable)
            // reset
            "KEY TD, KEY THT, KEY THF": {
              "position": "relative",
                background:"transparent",
                height: '22px',
                padding: '0 4px',
                overflow: 'hidden',
                'outline-width': '0',
                'white-space': 'pre-line',
                'empty-cells': 'show',
                'line-height': '1.22',
                'text-align':'left',
                'vertical-align': 'middle',
                'background-clip': 'padding-box'
            },
            "KEY .handsontableInput":{
                'line-height': '1.22'
            },
            "KEY .handsontable tr":{
                background:"transparent"
             },
            // reset
            "BOX.handsontable tr:first-child td, BOX.handsontable tr:first-child th":{
                "border-top":"none"
            },
            "BOX.handsontable tr:first-child > td, BOX.handsontable tr:first-child > th":{
                "border-top":"1px solid #ccc"
            },
            // for handsontable solid grid lines
            ".handsontable.solidgridline td": {
              "border-right": "1px solid #444",
              "border-bottom": "1px solid #444"
            },
            ".handsontable.solidgridline tr:first-child > td": {
                "border-top": "1px solid #444"
            },
            ".handsontable.solidgridline th:nth-child(2), .handsontable.solidgridline td:first-of-type, .handsontable.solidgridline .htNoFrame + th, .handsontable.solidgridline .htNoFrame + td": {
                "border-left": "1px solid #444"
            },
            ".handsontable.nogridline td": {
              "border-right": "1px solid transparent",
              "border-bottom": "1px solid transparent"
            },
            ".handsontable.nogridline tr:first-child > td": {
                "border-top": "1px solid transparent"
            },
            ".handsontable.nogridline th:nth-child(2), .handsontable.nogridline td:first-of-type, .handsontable.nogridline .htNoFrame + th, .handsontable.nogridline .htNoFrame + td": {
                "border-left": "1px solid transparent"
            }
             // }}
        },
        Templates:{
            tagName:'div',
            className:'{_className}',
            style:'{_style}',
            BOX:{
                tagName:'div'
            },
            POOL:{
                tagName:'div'
            }
        },
        Behaviors:{
            HoverEffected:{TH:'TH',TD:'TD',TR:'TR'},
            ClickEffected:{TH:'TH',TD:'TD',TR:'TR'},
            DroppableKeys:['TD'],
            PanelKeys:['TD'],
            HotKeyAllowed:false,
            TR:{
                onClick:function(profile,e,src){
                    var n=xui(src).get(0), i = xui.arr.indexOf(n.closest('table').rows, n);
                    if(profile.onClickRow && false == profile.boxing().onClickRow(profile, profile.SubSerialIdMapRow[profile.RowIdMapSubSerialId[i + 1]], e, src)){
                        return false;
                    }
                },
                onMouseover:function(profile, e, src){
                    var n=xui(src).get(0), i = xui.arr.indexOf(n.closest('table').rows, n);
                    if(profile.onHoverRow && false == profile.boxing().onHoverRow(profile, profile.SubSerialIdMapRow[profile.RowIdMapSubSerialId[i + 1]], e, src, true)){
                        return false;
                    }
                },
                onMouseout:function(profile, e, src){
                    var n=xui(src).get(0), i = xui.arr.indexOf(n.closest('table').rows, n);
                    if(profile.onHoverRow && false == profile.boxing().onHoverRow(profile, profile.SubSerialIdMapRow[profile.RowIdMapSubSerialId[i + 1]], e, src, false)){
                        return false;
                    }
                }
            },
            TH:{
                onClick:function(profile,e,src){
                    var n=xui(src).get(0).parentNode, i;
                    if(n.parentNode.tagName === 'THEAD'){
                        if(n.firstElementChild.$xid == src){
                            if(profile.onClickHeadTopCell && false == profile.boxing().onClickHeadTopCell(profile, profile.properties.layoutData, e, src)){
                                return false;
                            }
                        }else{
                            var col = profile.SubSerialIdMapCol[profile.getSubId(src)];
                            if(profile.onClickColumn && false == profile.boxing().onClickColumn(profile, col, e, src)){
                                return false;
                            }
                        }
                    }else{
                        i = xui.arr.indexOf(n.closest('table').rows, n);
                        if(profile.onClickHeadCell && false == profile.boxing().onClickHeadCell(profile, profile.SubSerialIdMapRow[profile.RowIdMapSubSerialId[i + 1]], e, src)){
                            return false;
                        }
                    }
                }
            },
            TD:{
                onClick:function(profile,e,src){
                    var n=xui(src).get(0).parentNode,
                        cell = profile.SubSerialIdMapItem[profile.getSubId(src)];
                    if(profile.onClickCell && false == profile.boxing().onClickCell(profile, cell, e, src)){
                        return false;
                    }
                }
            }
        },
        DataModel:{
            tabindex:null,
            defaultFocus:null,
            disableClickEffect:null,
            disableHoverEffect:null,
            disableTips:null,
            disabled:null,
            renderer:null,
            selectable:null,
            tips:null,
            autoTips:null,
            overflow:null,
            mode:{
                ini:'write',
                listbox:['design','write','read'],
                get:function(){
                    return this.$inDesign&&!this.getModule()?'design':(this.properties.mode || 'read');
                },
                action:function(){
                    this.boxing().refresh();
                }
            },
            width:{
                $spaceunit:1,
                ini:'30em'
            },
            height:{
                $spaceunit:1,
                ini:'25em'
            },
            solidGridlines:{
                ini:true,
                action:function(value){
                    var des = this.boxing()._isDesignMode(),node = this.getSubNode('BOX');
                    if(des){
                        if(value)node.removeClass("nogridline");
                        else node.addClass("nogridline");
                    }else{
                        if(value)node.addClass("solidgridline");
                        else node.removeClass("solidgridline");
                    }
                }
            },
            stretchH:{
                ini:"all",
                listbox:["none","last","all"],
                action:function(){
                    if(this.boxing()._isDesignMode())
                        this.box._updateSetting(this,'stretchH');
                    else{
                        this.box._resizeTable(this, this.getSubNode('BOX').cssSize(), true);
                    }
                }
            },
            rowHeaderWidth:{
                ini:25,
                action:function(){
                    if(this.boxing()._isDesignMode()){
                        this.box._updateSetting(this,'rowHeaderWidth');
                        var size=this.getRoot().cssSize();
                        xui.UI.$tryResize(this, size.width, size.height);
                    }
                }
            },
            columnHeaderHeight:{
                ini:25,
                action:function(){
                    if(this.boxing()._isDesignMode()){
                        this.box._updateSetting(this,'columnHeaderHeight');
                        var size=this.getRoot().cssSize();
                        xui.UI.$tryResize(this, size.width, size.height);
                    }
                }
            },
            floatHandler: {
                ini:true,
                action:function(){
                    if(this.boxing()._isDesignMode()){
                        var size=this.getRoot().cssSize();
                        xui.UI.$tryResize(this, size.width, size.height, true);
                    }
                }
            },

            defaultRowSize: 5,
            defaultColumnSize: 5,

            defaultRowHeight: 30,
            defaultColWidth: 30,

            showH5Header: false,
            showH5TH: false,
            gridCaption:"",
            gridHeaderCaption:"",
            // don't use handsometable's cell className - buggy (when moving row/column)
            // rows:5, cols:5, rowSetting:{'3':{}}, colSetting:{"B":{}}, cells:{A3:{type:"",value:"",,style:"",border:""}}, merged:[]
            layoutData:{
                ini:{},
                action:function(){
                    this.boxing().refresh();
                }
            },
            // Use handsontable 6.22 (MIT license) as renderer in design mode
            rendererCDNJS:{
                hidden:true,
                ini:"https://cdn.jsdelivr.net/gh/linb/handsontable622/handsontable.full.min.js"
            },
            rendererCDNCSS:{
                hidden:true,
                ini:"https://cdn.jsdelivr.net/gh/linb/handsontable622/handsontable.full.min.css"
            }
        },
        _rerender:function(prf){
            var prop=prf.properties, cls=prf.box;

            for(var i in prf.SubSerialIdMapItem)
                prf.reclaimSubId(i, "td");
            for(var i in prf.SubSerialIdMapCol)
                prf.reclaimSubId(i, "tr");
            for(var i in prf.SubSerialIdMapRow)
                prf.reclaimSubId(i, "tr");

            prf.ItemIdMapSubSerialId = {};
            prf.SubSerialIdMapItem = {};

            prf.ColIdMapSubSerialId = {};
            prf.SubSerialIdMapCol = {};

            prf.RowIdMapSubSerialId = {};
            prf.SubSerialIdMapRow = {};

            if(prf.boxing()._isDesignMode()){
                if(window.Handsontable)cls._renderAsHandsontable(prf);
                else{
                    // prf.boxing().busy(false, "Loading table ...");
                    var cssId="xui.UI.HTable:Handsontable";
                    xui.CSS.includeLink(prop.rendererCDNCSS,cssId);
                    xui.include("Handsontable",prop.rendererCDNJS,function(){
                        if(xui(cssId).get(0)){
                            //prf.boxing().free();
                            cls._renderAsHandsontable(prf);
                            var size=prf.getRoot().cssSize();
                            xui.UI.$tryResize(prf, size.width, size.height);
                        }else{
                            xui.Thread.repeat(function(){
                                if(xui(cssId).get(0)){
                                    //prf.boxing().free();
                                    cls._renderAsHandsontable(prf);
                                    var size=prf.getRoot().cssSize();
                                    xui.UI.$tryResize(prf, size.width, size.height);
                                    return false;
                                }
                            },200);
                        }
                    },null,false,{cache:true});
                }
            }else{
                cls._renderAsH5Table(prf);
            }
            // will be called in refresh()
            prf.$handleCustomVars=function(d){
                if(!d){
                    xui.arr.each(prf.children,function(c){
                        delete c[0]._attached2cell;
                        delete c[0]._autoexpand;
                    });
                }
            }
            prf.boxing().setSolidGridlines(prop.solidGridlines, true);
        },
        RenderTrigger:function(){
            this.box._rerender(this);
        },
        EventHandlers:{
            onShowTips: null,
            onGetCellData: function(cellCoord, cellObj, cellChild){},
            onClickHeadTopCell: function(profile, data, e, src){},
            onClickHeadCell: function(profile, row, e, src){},
            onClickColumn: function(profile, column, e, src){},
            onClickRow: function(profile, row, e, src){},
            onClickCell: function(profile, cell, e, src){},
            onHoverRow: function(profile, row, e, src, over){}
        },
        _getHeaderOffset:function(prf){
            var prop=prf.properties, offset = {left:0,top:0};
            if(prop.floatHandler && prf.boxing()._isDesignMode()){
                offset.left=prop.rowHeaderWidth;
                offset.top=prop.columnHeaderHeight + 1;
            }
            return offset;
        },
        _layoutChanged:function(prf, force){
            if(force || prf._$tableInited)
                xui.resetRun(prf.getUid("layoutchanged"),function(){
                    //console.log("onLayoutChanged");
                    var oData = prf.properties.layoutData;
                    prf.properties.layoutData = prf.box._getLayoutData(prf);
                    if(prf.$onLayoutChanged)prf.$onLayoutChanged(prf, oData, prf.properties.layoutData);
                });
        },
        _getLayoutData:function(prf){
            var prop=prf.properties,
                cells={}, borders, rowSetting={}, colSetting={}, merged=[],
                layoutData = {},
                data, rows, cols, t, p, s, tmp;

            // handsontable to xui
             if(t = prf.$htable){
                // rows:5, cols:5, merged:[]
                layoutData.rows = t.countRows();
                layoutData.cols = t.countCols();
                merged = xui.copy(xui.get(t.getPlugin("mergeCells"),["mergedCellsCollection","mergedCells"]));
                if(!xui.isEmpty(merged)) layoutData.merged=merged;

                s = t.getSettings();
                // rowSetting:{'3':{}}
                p = t.getPlugin("ManualRowResize");
                for(var i=0, l=layoutData.rows,h; i<l;i++){
                    var row=t.toPhysicalRow(i);
                    if(p.manualRowHeights && p.manualRowHeights[row] && p.manualRowHeights[row] !== prop.defaultRowHeight){
                        xui.set(rowSetting, [i+1, 'height'], p.manualRowHeights[row]);
                    }else{
                        if(rowSetting[i+1]) delete rowSetting[i+1].height;
                    }
                    if(rowSetting[i+1]){
                        if(xui.isEmpty(rowSetting[i+1]))delete rowSetting[i+1];
                    }
                }
                if(!xui.isEmpty(rowSetting)) layoutData.rowSetting=rowSetting;

                // colSetting:{"B":{}}
                p = t.getPlugin("ManualColumnResize");
                for(var i=0, l=layoutData.cols,w; i<l;i++){
                    var col=t.toPhysicalColumn(i),cr=xui.ExcelFormula.toColumnChr(i+1);
                    if(p.manualColumnWidths && p.manualColumnWidths[col] && p.manualColumnWidths[col]!=prop.defaultColWidth){
                        xui.set(colSetting, [cr, 'width'], p.manualColumnWidths[col]);
                    }else{
                        if(colSetting && colSetting[cr])delete colSetting[cr]['width'];
                    }
                    // if(tmp = xui.isArr(s.colWidths)?s.colWidths[col]:s.colWidths) xui.set(colSetting, [xui.ExcelFormula.toColumnChr(i+1), 'width'], tmp);
                }
                if(!xui.isEmpty(colSetting)) layoutData.colSetting=colSetting;

                // cells:{A3:{type:"",value:"",style:"",border:""}
                data = t.getData();
                // cells:{A3:{value:"v"}
                for(var i=0,l=data.length;i<l;i++){
                    var row=data[i];
                    for(var m=0,n=row.length;m<n;m++){
                       // ignore null/undefined/""
                       if(xui.isSet(data[i][m]) && data[i][m]!==""){
                           xui.set(cells, [xui.ExcelFormula.toCellId(m,i), "value"], data[i][m]);
                       }
                    }
                }
                // cells:{A3:{style:{}}
                for(var i=0,l=layoutData.rows;i<l;i++){
                    var row=t.toPhysicalRow(i);
                    var rowMetas = t.getCellMetaAtRow(row);
                    for(var m=0,n=rowMetas.length;m<n;m++){
                        var col=t.toPhysicalColumn(m);
                        // align settings
                        // don't use className - buggy
                        //  if(rowMetas[col].className)
                        //      xui.set(cells, [xui.ExcelFormula.toCellId(m,i), "className"], xui.str.trim(rowMetas[col].className));
                        // style: ignore empty {}
                        if(!xui.isEmpty(rowMetas[col].style))
                            xui.set(cells, [xui.ExcelFormula.toCellId(m,i), "style"], xui.copy(rowMetas[col].style));
                    }
                }
                if(!xui.isEmpty(cells)) layoutData.cells=cells;

                var cbPlugin = t.getPlugin('customBorders');
                if((borders = cbPlugin.getBorders()).length){
                    layoutData.customBorders = xui.clone(borders,function(h,i){return i!='id' && i!='border'});
                }
            }
            return layoutData;
        },
        _renderAsH5Table: function(prf){
            var boxNode = prf.getSubNode("BOX"),
                elem = boxNode.get(0),
                prop = prf.properties,
                layoutData = prop.layoutData,
                rowSize=layoutData.rows||prop.defaultRowSize,
                colSize=layoutData.cols||prop.defaultColumnSize,
                childrenMap={}, t, merged={}, merged2={},
                getCellData= function(childrenMap, type, itemId){
                    var data = prf.onGetCellData && prf.boxing().onGetCellData(prf, itemId, xui.get(layoutData, [type, itemId]), childrenMap[itemId]);
                    if(!xui.isSet(data)){
                        data = xui.get(layoutData, [type, itemId]) || {};
                        if(!xui.isHash(data)) data = {value:data||""};
                        if(childrenMap[itemId]){
                            var childPrf = childrenMap[itemId], ins = childPrf && childPrf.boxing();
                            if(childPrf.key=='xui.UI.RichEditor'){
                                data.value = '';
                            }else if(childPrf.key=='xui.UI.CheckBox'||childPrf.key=='xui.UI.SCheckBox'){
                                data.value = '<input type="checkbox" disabled tabindex="-1"  onclick="javascript:return false;"'
                                          + (ins.getUIValue()?"checked":"")
                                          +'>' + ins.getCaption();
                            }else{
                                data.value = ins.getShowValue?ins.getShowValue():
                                    ins.getValue?('$UIvalue' in childPrf.properties?ins.getUIValue():ins.getValue()):
                                    ins.getCaption?ins.getCaption():
                                    ins.getHtml?ins.getHtml():
                                    ins.getLabel?ins.getLabel():
                                '';
                            }
                        }
                    }
                    return data;
                },
                cellProp,subSerialId,item, itemId, domId, styles, rowid, tpl=[];

            xui.arr.each(prf.children,function(v){
                childrenMap[v[1]]=v[0];
            });
            xui.arr.each(layoutData.merged,function(v){
                merged[v.row+":"+v.col] = (v.rowspan>1?(" rowspan=" + v.rowspan):"") + (v.colspan?(" colspan = " + v.colspan):"") +" ";
                for(var i=0,l=v.rowspan;i<l;i++){
                    for(var j=0,k=v.colspan;j<k;j++){
                        if(i===0&&j===0)continue;
                         merged2[(v.row+i)+":"+(v.col+j)] = 1;
                    }
                }
            });

            tpl.push("<div id='"+prf.key+"-HOLDER:"+prf.serialId + ":" +"' class='"+prf.getClass("HOLDER")
                +"' style='width:"+prop.width+"; height:"+prop.height
                +"' >");
            tpl.push("<table id='"+prf.key + "-TABLE:" + prf.serialId + ":" +"' class='layout-table "+prf.getClass("TABLE") +"'"
                + (prop.stretchH!='none'?(" style='width:"+(prop.width=='auto'?'100%':prop.width)+";'"):"")
                +">");
            tpl.push("<caption class='layout-caption "+prf.getClass("CAPTION") +"'>"+ prop.gridCaption +"</caption>");
            // colgroup
            var colWidths = prf.box._getColWidths(prf, prf.$px(prop.width));
            tpl.push("<colgroup><col style='"+(prop.showH5TH?(prop.rowHeaderWidth=="auto"?"":("width:"+prop.rowHeaderWidth+"px;")):"width:0;border:0;margin:0;padding:0;")+"'></col>");
            for(var col=0,n=colSize;col<n;col++){
                tpl.push("<col style='width:" + colWidths[col] + ";'></col>");
            }
            tpl.push("</colgroup>");
            // thead
            if(prop.showH5Header){
                trid = prf.pickSubId('tr');
                tpl.push("<thead>");
                tpl.push("<tr id='"+prf.key + "-TRF:" + prf.serialId + ":" + trid + "'"
                    +" class='header "+prf.getClass("TRF") + " " + (xui.get(layoutData, ['rowSetting', "0", 'className'])||"") + "'"
                    +" title='" + (xui.get(layoutData, ['rowSetting', "0", 'tips'])||"")  + "'"
                    + ">");
                tpl.push("<th id='"+prf.key + "-TH:" + prf.serialId + ":" + trid + "' class='row-top col-0 layout-cell header "+ prf.getClass("THTF") +"' style='"+(prop.showH5TH?("width:"+prop.rowHeaderWidth+"px;"):"width:0;border:0;margin:0;padding:0;")+"");
                if(t = xui.get(layoutData, ['headerSetting', 'height']) || prop.columnHeaderHeight){
                    tpl.push(t=="auto"?"":("height:"+ (t - 1) + "px;"));
                }
                tpl.push("'>"+prop.gridHeaderCaption+"</th>");
                for(var col=0,n=colSize;col<n;col++){
                    // use tr here, avoid duplication with those TH in TBODY
                    subSerialId = prf.pickSubId('tr');
                    itemId = xui.ExcelFormula.toColumnChr(col + 1);
                    item={
                        _serialId:subSerialId,
                        col:col+1,
                        id:itemId,
                        data: getCellData(childrenMap, "colSetting", itemId)
                    };
                    prf.ColIdMapSubSerialId[itemId] = subSerialId;
                    prf.SubSerialIdMapCol[subSerialId] = item;

                    domId = prf.key + "-TH:" + prf.serialId + ":" +subSerialId;
                    styles = [];
                    xui.each(item.data.style,function(v,k){
                        styles.push(k.replace(/[A-Z]/g,function(a){return '-'+a.toLowerCase()}) + ":" + v);
                    });
                    tpl.push("<th id='" + domId + "'"
                        + (item.data.tips ? ("title='" + item.data.tips +"' ") : "")
                        + " class='row-top layout-cell " + (!prop.showH5TH && col===0?'firstcol ':'') +prf.getClass("THT")+ " " + (item.data.className||"") + " header col-" + itemId.toLowerCase() + "'"
                        + " style='"+styles.join(";")+"' "+  (merged[row+":"+col]||"") +">");
                    tpl.push(item.data.value||"");
                    tpl.push("</th>");
                }
                tpl.push("</tr>");
                tpl.push("</thead>");
            }
            // tbody
            tpl.push("<tbody>");
            for(var row=0,l=rowSize;row<l;row++){
                trid = prf.pickSubId('tr');
                itemId = row+1;
                item={
                    _serialId:trid,
                    row:itemId,
                    id:itemId,
                    data: getCellData(childrenMap, "rowSetting", itemId)
                };
                prf.RowIdMapSubSerialId[itemId] = subSerialId;
                prf.SubSerialIdMapRow[subSerialId] = item;
                tpl.push("<tr id='"+prf.key + "-TR:" + prf.serialId + ":" + trid + "'"
                    + " class='row-" + (row+1) + " " + (item.data.className||"") + " " + prf.getClass("TR") + " " + prf.getClass("TR",(row%2==1?"-even":"-odd")) + "'"
                    + (item.data.tips ? ("title='" + item.data.tips +"' ") : "")
                    + ">");
                tpl.push("<th id='"+prf.key + "-TH:" + prf.serialId + ":" + trid + "'"
                    + " class='row-" + (row+1) +" col-0 layout-cell "+(!prop.showH5Header && row===0?'firstrow ':'') + prf.getClass("THF") + "'"
                    + " style='"+(prop.showH5TH?("width:"+prop.rowHeaderWidth+"px;"):"width:0;border:0;margin:0;padding:0;"));
                if(t = item.data.height || prop.defaultRowHeight){
                    tpl.push(t=="auto"?"":("height:"+ (t - (row===0?1/*2*/:1)) + "px;"));
                }
                tpl.push("'");
                tpl.push(item.data.tips ? (" title='" + item.data.tips +"'") : "");
                tpl.push(">"+ (item.data.value||"") +"</th>");
                for(var col=0,n=colSize;col<n;col++){
                    subSerialId = prf.pickSubId('td');
                    itemId = xui.ExcelFormula.toCellId(col,row);
                    item={
                        _serialId:subSerialId,
                        col:col,
                        row:row,
                        id:itemId,
                        data: getCellData(childrenMap, "cells", itemId)
                    };
                    prf.ItemIdMapSubSerialId[itemId] = subSerialId;
                    prf.SubSerialIdMapItem[subSerialId] = item;

                    domId = prf.key + "-TD:" + prf.serialId + ":" +subSerialId;
                    styles = [];
                    xui.each(item.data.style,function(v,k){
                        styles.push(k.replace(/[A-Z]/g,function(a){return '-'+a.toLowerCase()}) + ":" + v);
                    });
                    // layoutData.merged
                    if(!merged2[row+":"+col]){
                        tpl.push("<td id='" + domId + "'"
                            + (item.data.tips ? (" title='" + item.data.tips +"'") : "")
                            + " class='layout-cell "+ (!prop.showH5Header && row===0?'firstrow ':'') + (!prop.showH5TH && col===0?'firstcol ':'') +prf.getClass("TD")+ " " + (item.data.className||"") + " col-" + itemId.replace(/\d/g,'').toLowerCase() + " row-" + (row+1) + " cell-" + itemId.toLowerCase() + "'"
                            + " style='"+styles.join(";")+"' "+  (merged[row+":"+col]||"") +">");
                        tpl.push(item.data.value||"");
                        tpl.push("</td>");
                    }
                }
                tpl.push("</tr>");
            }
            tpl.push("</tbody></table>");
            tpl.push("<div id='"+prf.key+"-CBORDER:"+prf.serialId + ":" +"' class='"+prf.getClass("CBORDER") +"' ></div>");
            tpl.push("</div>");

            var frag = document.createDocumentFragment(), tempDiv = document.createElement('div');
            tempDiv.innerHTML = tpl.join("");
            while (tempDiv.firstChild) {
              frag.appendChild(tempDiv.firstChild);
            }
            elem.innerHTML = '';
            elem.append(frag);

            xui.UI.$addEventsHandler(prf, elem, false);

            // layoutData.customBorders
            prf.box._setCustomBorders(prf);

            // lazy append
            var arr=[];
            xui.each(prf.children,function(v){
                arr.push(v);
            });
            prf.children=[];
            xui.arr.each(arr,function(v){
                prf.boxing().append(v[0], v[1]);
            });
        },
        _renderAsHandsontable: function(prf){
            if(!prf || !prf.box)return;
            var onLayoutChanged = function(prf, force){
                prf.box._layoutChanged(prf,force);
            };
            var boxNode = prf.getSubNode("BOX"),
                elem = boxNode.get(0),
                htable,
                prop = prf.properties,
                layoutData = prop.layoutData,
                designMode = true,
                fixedSet = {
                    // "fix" some functions for handsontable
                    autoWrapRow: true,
                    renderAllRows: true,
                    persistentState:false ,

                    // "readonly" handsontable
                    readOnly: !designMode,
                    readOnlyCellClassName:"no",
                    comments: !designMode,
                    disableVisualSelection: !designMode,
                    enterBeginsEditing: designMode,
                    manualRowMove: designMode,
                    manualColumnMove: designMode,
                    contextMenu: designMode,
                    copyable: designMode,
                    copyPaste: designMode,
                    beforeOnCellMouseDown:!designMode?null:function(e,c){
                        // fire event
                        if(c.row===-1 && c.col===-1){
                            e.stopImmediatePropagation();
                        }
                    },
                    afterOnCellMouseUp:!designMode?null:function(e,c){
                        // fire event
                        if(c.row===-1 && c.col===-1){
                            this.deselectCell();
                            prf.getRoot().onClick(true);
                            e.stopImmediatePropagation();
                        }
                    },

                    /* cell render*/
                    // for xui dom id & event handler
                    beforeRenderer: function(TD, row, col, vprop, value, cellprop){
                        var subSerialId = prf.pickSubId('td'),
                              itemId = xui.ExcelFormula.toCellId(col,row);
                        // memory map
                        cellprop.oid=cellprop.id;
                        cellprop.id=itemId;
                        if(cellprop.oid && cellprop.oid!=cellprop.id){
                            prf.$cellIdChangedMap[cellprop.oid]=cellprop.id;
                        }
                        cellprop._serialId=subSerialId;
                        prf.ItemIdMapSubSerialId[itemId] = subSerialId;
                        prf.SubSerialIdMapItem[subSerialId] = cellprop;
                        // customized styles
                        // first time, set cellprop.style from prop.layoutData
                        if(!cellprop.style){
                            cellprop.style = xui.get(prop.layoutData, ["cells", xui.ExcelFormula.toCellId(col,row),"style"]) || {};
                        }
                        // dom
                        TD.id = prf.key + "-TD:" + prf.serialId + ":" +subSerialId;
                        xui.UI.$addEventsHandler(prf, TD, true);
                        for(var i in cellprop.style) TD.style[i] = cellprop.style[i];
                        // align class
                        //if(!cellprop.className){
                        //    cellprop.className = xui.get(prop.layoutData, ["cells", xui.ExcelFormula.toCellId(col,row),"className"]) || "";
                        //}
                        TD.className = (TD.className||"")  + prf.getClass("TD");
                        if(designMode)
                            TD.setAttribute('data-coord', itemId);
                        if(cellprop._child_autoexpandH){
                            TD.style.height=cellprop._child_autoexpandH+"px";
                        }else{
                            TD.style.height="";
                        }
                    },
                    /* cell renderer
                    renderer : function(instance, TD, row, col, vprop, value, cellprop){
                    },
                    */
                    /* table render*/
                    beforeRender: function(flag){
                        // **: updateSetting will re-render all table elements
                        // we have to reset memory map, and keep children here
                        if(prf._$tableInited){
                            prf.$cellIdChangedMap={};
                            //*** save children first
                            var pool=prf.getSubNode("POOL").get(0),arr=[];
                            xui.arr.each(prf.children,function(v){
                                if(v[0] && v[0].rendered){
                                    pool.appendChild(v[0].getRootNode());
                                    arr.push(v);
                                }
                            });
                            //keep children, prevent to be destroyed
                            if(arr.length){
                                prf._pool_children = arr;
                            }

                            // reset memory map
                            prf.children=[];
                        }
                    },
                    afterInit:function(){
                        prf._$tableInited=1;
                    },
                    afterRender:function(isForced){
                        var table=this;
                        //console.log('afterRender');
                        xui.tryF(prf.$onrender,[],prf);

                        //  onLayoutChanged(prf);

                        // Set id for important nodes, for getting profile from dom id
                        var node = prf.getSubNode("BOX");
                        node = node.first(); node.id(prf.key + "-MASTER:" + prf.serialId + ":");
                        node = node.first(); node.id(prf.key + "-HOLDER:" + prf.serialId + ":");
                        node = node.first(); node.id(prf.key + "-HIDER:" + prf.serialId + ":");
                        node = node.first(); node.id(prf.key + "-SPREADER:" + prf.serialId + ":");
                        if(prf.properties.height=="auto"){
                            prf.getSubNodes("BOX").height('auto');
                        }
                        if(prf._$tableInited){
                            var map = prf.$cellIdChangedMap, exists=prf.ItemIdMapSubSerialId;

                            //*** adjut formula
                            var adjustFormula=function(formula){
                                return xui.replace(formula, [
                                    // protect all
                                    [/\/\*[^*]*\*+([^\/][^*]*\*+)*\//,'$0'],
                                    [/\/\/[^\n]*/,'$0'],
                                    [/\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*/,'$0'],
                                    [/"(\\.|[^"\\])*"/,'$0'],
                                    [/'(\\.|[^'\\])*'/,'$0'],
                                    [/[\w]+\(/,'$0'],
                                    // replace cells
                                    [/\b([A-Z]+[\d]+)\b/,function(a){
                                        return map[a[0]] || (exists[a[0]] ? a[0] : ("'"+a[0]+"'"));
                                    }]
                                ]);
                            };
                            xui.each(prf.SubSerialIdMapItem,function(cell){
                                var ov=table.getDataAtCell(cell.row, cell.col);
                                if(ov && (ov+"").charAt(0)=="="){
                                    var nv=adjustFormula(ov);
                                    if(nv!==ov) table.setDataAtCell(cell.row, cell.col, nv);
                                }
                            });

                            //*** restore children
                            if(prf._pool_children){
                                xui.arr.each(prf._pool_children,function(v){
                                    delete v[0].$dockParent;
                                    prf.boxing().append(v[0], map[v[1]]||v[1]);
                                });
                                delete prf._pool_children;
                            }
                        }else{
                            //
                            // lazy append
                            var arr=[];
                            xui.each(prf.children,function(v){
                                arr.push(v);
                            });
                            prf.children=[];
                            xui.arr.each(arr,function(v){
                                prf.boxing().append(v[0], v[1]);
                            });

                            prf.getRoot().onMouseup(function(p,e){
                                prf.$lastMousePos = xui.Event.getPos(e);
                            });
                        }
                    },

                    afterSelection: function(){
                        if(prop.floatHandler)
                            prf.getRoot().css('overflow','visible');
                    },
                    outsideClickDeselects: function(node){
                        //for lang span, or inner renderer
                        while((
                                (!node.id)
                                || node.id==xui.$localeDomId
                                || node.tagName=='tspan'
                            )
                            && node.parentNode!==document && node.parentNode!==window
                        ) node=node.parentNode;
                        var p=xui.UIProfile.getFromDom(node);
                        if(p && prf.$popmenu){
                            var r=prf.$popmenu.get(0);
                            if(p==r || p.$parentPopMenu==r || p.$popGrp==r.$popGrp){
                                return false;
                            }
                        }

                        prf.getRoot().css('overflow','');
                        return true;
                    },
                    afterContextMenuShow: !designMode?null:function(context){
                         if(prf.$onPopMenu)prf.$popmenu = prf.$onPopMenu(prf, prf.$popmenu, context.menu);
                         // don't use dft menu
                         context.menu.container.style.display='none';
                    },

                    afterUpdateSettings:function(){
                    // only resize use this
                    //    onLayoutChanged(prf);
                    },
                    afterRedo:function(){
                        onLayoutChanged(prf);
                    },
                    afterUndo:function(){
                        onLayoutChanged(prf);
                    },
                    afterChange:function(change, source){
                        if(source!='loadData' && source!='populateFromArray')
                            onLayoutChanged(prf);
                    },
                    beforeCellAlignment:function(){
                        onLayoutChanged(prf);
                    },
                    afterMergeCells:function(a,b,auto){
                        if(!auto)
                            onLayoutChanged(prf);
                    },
                    afterUnmergeCells:function(a,b,auto){
                        if(!auto)
                            onLayoutChanged(prf);
                    },

                    // reset autoexpand
                    afterRowResize:function(row, size, dblclick){
                        onLayoutChanged(prf);
                        var cells = this.getCellMetaAtRow(row);
                        for(var i=0, l=cells.length;i<l;i++){
                            var target = prf.boxing().getChildren(cells[i].id);
                            if(target['xui.UI.Input']
                                && target.getMultiLines && target.getMultiLines()
                                && target.setAutoexpand
                                ) {
                                    target.get(0)._autoexpand = (size-1)+"px";
                                }
                        }
                        if(prf.properties.height=="auto"){
                            prf.box._resizeTable(prf, {height:'auto'});
                        }
                    },

                    afterColumnResize:function(){
                        onLayoutChanged(prf);
                    },
                    afterColumnSort:function(){
                        onLayoutChanged(prf);
                    },
                    afterRowMove:function(rows, target){
                        onLayoutChanged(prf);
                    },
                    afterColumnMove:function(){
                        onLayoutChanged(prf);
                    },
                    // for fix ManualColumnResize and ManualRowResize
                    afterCreateCol:function(index,amount){
                        onLayoutChanged(prf);

                        // patch for ManualColumnResize
                        var p = this.getPlugin("ManualColumnResize");
                        // new cols
                        var arr=[];
                        for(var i=0;i<amount;i++) arr.push(prop.defaultColWidth);
                        // ensure length
                        if(!p.manualColumnWidths) p.manualColumnWidths=[];
                        for(var i=0;i<index;i++) p.manualColumnWidths[i] = p.manualColumnWidths[i] || (void 0);
                        // insert
                        p.manualColumnWidths.splice.apply(p.manualColumnWidths, [index, 0].concat(arr));

                        this.deselectCell();
                        var ns=this;
                        xui.asyRun(function(){
                            ns.selectColumns(index);
                        });
                    },
                    afterCreateRow:function(index,amount){
                        onLayoutChanged(prf);
                        // patch for ManualRowResize
                        var p = this.getPlugin("ManualRowResize");
                        // new row
                        var arr=[];
                        for(var i=0;i<amount;i++) arr.push(prop.defaultRowHeight);
                        // ensure length
                        if(!p.manualRowHeights) p.manualRowHeights=[];
                        for(var i=0;i<index;i++) p.manualRowHeights[i] = p.manualRowHeights[i] || (void 0);
                        // insert
                        p.manualRowHeights.splice.apply(p.manualRowHeights, [index, 0].concat(arr));

                        this.deselectCell();
                        var ns=this;
                        xui.asyRun(function(){
                            ns.selectRows(index);
                        });
                        if(prf.properties.height=="auto"){
                            prf.box._resizeTable(prf, {height:'auto'});
                        }
                    },
                    afterRemoveCol:function(index,amount){
                        onLayoutChanged(prf);
                        var p = this.getPlugin("ManualColumnResize");
                        if(p.manualColumnWidths){
                            p.manualColumnWidths.splice(index, amount);
                        }
                        this.deselectCell();
                    },
                    afterRemoveRow:function(index,amount){
                        onLayoutChanged(prf);
                        var p = this.getPlugin("ManualRowResize");
                        if(p.manualRowHeights){
                            p.manualRowHeights.splice(index, amount);
                        }
                        this.deselectCell();
                        if(prf.properties.height=="auto"){
                            prf.box._resizeTable(prf, {height:'auto'});
                        }
                    }
                },
                settings={},t;

            var offset = prf.box._getHeaderOffset(prf);
            // size
            if(prop.height!="auto")
                settings.height = prf.$px(prop.height) + offset.top;
            settings.width = prf.$px(prop.width) + offset.left;
            // stretch
            settings.stretchH = (t=prop.stretchH)=="last"?"last":t=="all"?"all":"none";
            // dft widht/height
            settings.rowHeaderWidth  = prop.rowHeaderWidth;
            settings.columnHeaderHeight = prop.columnHeaderHeight;
            settings.defaultColumnWidth = prop.defaultColWidth;
            // show header?
            settings.rowHeaders = designMode;
            settings.colHeaders =  designMode;


            // merged info
            if(layoutData.merged){
                settings.mergeCells = layoutData.merged;
            }else{
                settings.mergeCells = designMode;
            }

            // data, manualRowResize, minRowHeights, manualColumnResize, colWidths, cellMetas
            // if there's table data
            if(layoutData.cols){
                // cell data
                var minRowHeights=[], colWidths=[], manualRowResize=[],manualColumnResize=[], data = [], row;
                // manualRowResize (start from "1")
                xui.each(layoutData.rowSetting,function(v,k){
                    if(xui.isSet(v.height||v))manualRowResize[parseInt(k,10) - 1]=parseInt(v.height||v,10);
                    if(xui.isSet(v.minHeight||v))minRowHeights[parseInt(k,10) - 1]=parseInt(v.minHeight||v,10);
                });
                // manualColumnResize (start from "A"=>"1")
                xui.each(layoutData.colSetting,function(v,k){
                    k = xui.ExcelFormula.toColumnNum(k);
                    if(xui.isSet(v.width||v))manualColumnResize[k - 1]=parseInt(v.width||v,10);
                    // if(xui.isSet(v.width||v))colWidths[k - 1]=parseInt(v.width||v,10);
                });
                // init data
                for(var i=0,l=layoutData.rows||prop.defaultRowSize;i<l;i++){
                    data.push(row=[]);
                    for(var m=0,n=layoutData.cols||prop.defaultColumnSize;m<n;m++){
                        row.push(null);
                    }
                }
                // fill data
                xui.each(layoutData.cells,function(cell, id){
                    var coord = xui.ExcelFormula.toCoordinate(id);
                    data[coord.row][coord.col] = xui.isSet(cell.value)?cell.value:null;
                });

                // set manualRowResize, manualColumnResize and data
                for(var i=0;i<layoutData.rows;i++){
                    manualRowResize[i] = manualRowResize[i] || prop.defaultRowHeight;
                }
                settings.manualRowResize = manualRowResize;
                settings.manualColumnResize = !xui.isEmpty(manualColumnResize) ? manualColumnResize : designMode;

                if(!xui.isEmpty(minRowHeights))settings.rowHeights = minRowHeights;
                // don't use colWidths
                //if(!xui.isEmpty(colWidths))settings.colWidths = colWidths;

                settings.data = data;

                if(layoutData.customBorders)
                    settings.customBorders = layoutData.customBorders;
            }else{
                settings.manualColumnResize = designMode;
                var manualRowResize=[];
                for(var i=0;i<prop.defaultRowSize;i++){
                    manualRowResize[i] = prop.defaultRowHeight;
                }
                settings.manualRowResize = manualRowResize;
            }
            prf.$htable = htable = new window.Handsontable(elem, xui.merge(settings, fixedSet, 'all'));

            if(!layoutData.cols){
                // reset layoutData
                prf.properties.layoutData = prf.box._getLayoutData(prf);
            }

            // set before destroy function
            (prf.$beforeDestroy=(prf.$beforeDestroy||{}))["destroyhtable"]=function(){
                var t;
                if(t=this.$htable){
                    // must purge lazy-bound node here
                    var node=this.getSubNode("BOX").get(0);
                    if(node)
                        xui.$purgeChildren(node);

                    if(!t.isDestroyed){
                        window.Handsontable.hooks.destroy(t);
                        t.destroy();
                    }
                    delete this.$htable;
                }
                if(t = this.$popmenu){
                    t.destroy();
                }
            }
        },
        _getColWidths:function(prf, tableWidth){
            var prop=prf.properties, layoutData = prop.layoutData, t,
                colSize=layoutData.cols||prop.defaultColumnSize,
                reCalculated=[], colWidths=[], fix=prop.showH5TH?prop.rowHeaderWidth:0, count=0, per, rc=0, bW=0;
            if(prop.stretchH=="all"){
                for(var col=0,n=colSize;col<n;col++){
                    var chr = xui.ExcelFormula.toColumnChr(col+1);
                    if(t = xui.get(layoutData, ['colSetting', chr,'width'])){
                        fix += t;
                        reCalculated.push(t);
                    }else{
                        count++;
                        reCalculated.push(null);
                    }
                }
                per = (tableWidth - fix ) / count;
            }
            for(var col=0,n=colSize;col<n;col++){
                var chr = xui.ExcelFormula.toColumnChr(col+1), aW;
                rc++;
                t = xui.get(layoutData, ['colSetting', chr,'width']) || (prop.defaultColWidth);
                switch(prf.properties.stretchH){
                    case 'all':
                        aW = reCalculated[col]===null?Math.max(prop.defaultColWidth, (Math.round(per) )):reCalculated[col];
                        bW += aW;
                        colWidths.push((col==colSize-1?Math.round(tableWidth-(prop.showH5TH?prop.rowHeaderWidth:0)-bW+aW):aW)+"px");
                        break;
                    case 'last':
                        colWidths.push(col==colSize-1?"100%":(t + "px"));
                        break;
                    default:
                        colWidths.push(t + "px");
                }
            }
            return colWidths;
        },
        _setCustomBorders:function(prf){
            xui.resetRun(prf.getUid()+":cborder",function(){
                if(!prf.renderId)return;
                var cborder = prf.getSubNode("CBORDER").get(0);
                xui.arr.each(prf.properties.layoutData.customBorders,function(conf){
                    var itemId = xui.ExcelFormula.toCellId(conf.col,conf.row),
                        subSerialId = prf.ItemIdMapSubSerialId[itemId],
                        table=prf.getSubNode("TABLE").get(0),
                        td=prf.getSubNode("TD", subSerialId),
                        pos = td.offset(null, table),
                        id, div, style;
                     if(conf.top&&conf.top.width){
                        id=prf.key + "-CBT:" + prf.serialId + ":" +subSerialId;
                        div=xui.Dom.byId(id);
                        style=div&&div.style;
                        if(!div){
                            div = document.createElement("div");
                            div.id=id;
                            cborder.appendChild(div);
                        }
                        style=div.style;
                        style.backgroundColor=conf.top.color;
                        style.left=(pos.left-1)+"px";
                        style.top=(pos.top-1)+"px";
                        style.width=td.offsetWidth()+"px";
                        style.height="1px";
                    }
                    if(conf.left&&conf.left.width){
                        id=prf.key + "-CBL:" + prf.serialId + ":" +subSerialId;
                        div=xui.Dom.byId(id);
                        if(!div){
                            div = document.createElement("div");
                            div.id=id;
                            cborder.appendChild(div);
                        }
                        style=div.style;
                        style.backgroundColor=conf.left.color;
                        style.left=(pos.left-1)+"px";
                        style.top=(pos.top-1)+"px";
                        style.width="1px";
                        style.height=td.offsetHeight()+"px";
                    }
                });
            });
        },
        _resizeTable: function(prf,size,force){
            var node = prf.getSubNode("HOLDER"),
                prop = prf.properties,
                autoW = prop.width=="auto",
                autoH = prop.height=="auto";
            if(!node.get(0))return ;

            if(prf.boxing()._isDesignMode()){
                var t;
                if(t=prf.$htable){
                    var holder = node.cssSize();
                    if(autoH) {
                        // handsontable must has height
                        size.height = autoW?"auto":prf.getSubNode('HIDER').height();
                    }
                    if(holder.width!=size.width || holder.height!=size.height){
                        // for merged cells
                        size.mergeCells  = xui.copy(xui.get(t.getPlugin("mergeCells"),["mergedCellsCollection","mergedCells"]));
                        // ensure by px
                        t.updateSettings(size);
                    }
                }
            }else{
                if(autoH)size.height="auto";
                if(autoW)size.width="auto";
                node.cssSize(size);
                 var tb = prf.getSubNode("TABLE");
                 if(tb.get(0)){
                     if(!(autoW || autoH || prf.properties.stretchH=='none') ){
                         var rw = size.width - (tb.offsetHeight() > size.height ? xui.Dom.getScrollBarSize() : 0);
                         tb.width(rw);
                     }
                    if(force || prf.properties.stretchH=="all"){
                        var colWidths = this._getColWidths(prf, rw);
                        tb.first().children().each(function(node,i){
                            // ignore the first one for th
                            if(i!==0){
                                node.style.width = colWidths[i-1];
                            }
                        });
                    }
                    // to trigger cells onsize
                    var cells=[];
                    prf.getSubNodes("TD",true).each(function(cell){
                        if(xui.Dom.$hasEventHandler(cell,'onsize')) cells.push(cell);
                    });
                    if(cells.length) xui(cells).onSize(true);

                    // adjust custom borders
                    prf.box._setCustomBorders(prf);
                 }
            }
        },
        _updateSetting:function(prf, opt){
            var t=prf.$htable;
            if(typeof opt=="string"){
                var h={};
                h[opt] = prf.properties[opt];
                opt=h;
            }
            // for merged cells
            opt.mergeCells  = xui.copy(xui.get(t.getPlugin("mergeCells"),["mergedCellsCollection","mergedCells"]));
            t.updateSettings(opt);
        },
        $beforeAppend:function(prf,target,subId){
            if(!subId)return false;
            // only one allowed
            if(target.size()==1){
                xui.arr.each(prf.children,function(v){
                    if(v[0] && subId == v[1] && v[0]!==target.get(0) ){
                        v[0].boxing().destroy();
                    }
                }, true);
            }
        },
        $afterAppend:function(prf, target,subId){
            if(!subId)return;
            // force dock for the only widget
            if(prf.renderId && target['xui.UI'] && target.size()==1){
                var item = prf.getItemByItemId(subId), inputPrf = target.get(0), iProp=inputPrf.properties;
                if(item){
                    var cell = prf.getSubNode("TD", item._serialId),
                        isFormField = inputPrf.box._isFormField ? inputPrf.box._isFormField(inputPrf) : !!xui.get(inputPrf,['properties','isFormField']),
                        mode = prf.boxing().getMode(),
                        show = mode!='read' || target['xui.UI.RichEditor'];
                    if(isFormField && (!iProp.name || prf.ItemIdMapSubSerialId[iProp.name])){
                        iProp.name = item.id;
                    }
                    // for form field only
                    // onsize for dom must here
                    if(cell && cell.get(0)){
                        // if parent is re-rendered
                        if(inputPrf._cellresizeP!=cell){
                            var adjustSize = function(){
                                    if(!cell.get(0))return;
                                    target.setPosition('absolute').setLeft(0).setTop(0);
                                    // first row/col , 2 pix border
                                    if(target.setWidth)target.setWidth(cell.offsetWidth()-(item.col?1:2));
                                    if(target.setHeight)target.setHeight(cell.offsetHeight()-(item.row?1:2));
                                };
                            adjustSize();
                            cell.onSize(adjustSize,'cellresize');
                            inputPrf._cellresizeP=cell;
                        }
                    }

                    if(!inputPrf._attached2cell){
                        //console.log('afterappend',subId);
                        inputPrf._attached2cell = 1;
                        // for form field only
                        // prop and autoexpand
                        if(isFormField){
                            if(show){
                                inputPrf.locked = 1;
                                inputPrf.boxing().setDisplay('');
                                if(target.setLabelPos)  target.setLabelPos('none').setLabelCaption('').setLabelSize('0');
                                if(target.setVAlign)  target.setVAlign('middle');

                                if(target['xui.UI.Input']
                                    && target.getMultiLines && target.getMultiLines()
                                    && target.setAutoexpand
                                ){
                                    // use the hidden one: _autoexpand
                                    // once: set minH from subId
                                    if(!parseFloat(inputPrf._autoexpand)){
                                        // need set autoexpand in afterRowResize too
                                        inputPrf._autoexpand = (cell.offsetHeight()-1)+"px";
                                        inputPrf.getSubNode("INPUT").addClass("autoexpand");
                                        inputPrf.$beforeAutoexpand=function(p,h){
                                            h=target.getAutoexpandHeight();
                                            item._child_autoexpandH = h;
                                            if(prf.boxing()._isDesignMode()){
                                                // ensure to trigger table render once
                                                xui.resetRun(prf.getUid("autoex"), function(){
                                                    if(prf.$htable)prf.$htable.render();
                                                });
                                            }else{
                                                cell.height(h);
                                            }
                                            // adjust custom borders
                                            if(!prf.boxing()._isDesignMode())
                                                prf.box._setCustomBorders(prf);
                                            return false;
                                        };
                                        // try to trigger aoutoexpand
                                        inputPrf.box._checkAutoexpand(inputPrf);
                                    }
                                }
                                if(mode=='read'){
                                    if(target.setReadonly)target.setReadonly(true,true);
                                }
                            }else{
                                inputPrf.boxing().setDisplay('none');
                            }
                        }
                        inputPrf.$handleCustomVars=function(d){
                            if(d){
                                for(var i in d)if(d[i])this[i]=d[i];
                            }else{
                                return {
                                    _attached2cell: this._attached2cell,
                                    _autoexpand: this._autoexpand,
                                    $beforeAutoexpand: this.$beforeAutoexpand
                                }
                            }
                        }
                    }
                }
            }
        },
/*
        _IllegalDetect:function(pro, target, throwErr){
            return null;
            // detect those with html table node
            var count=0, detect = function(arr){
                xui.arr.each(arr, function(c){
                    c=c[0]||c;
                    if(c.box && c.box.HasHtmlTableNode)count++;
                    else detect(c.children);
                });
            };
            detect(target._nodes);
            if(count){
                if(throwErr)throw new Error('Cant append control with HTML TABLE node into '+ pro.key);
                else return count;
            }
        },
*/
        _onresize:function(prf,width,height){
            var prop=prf.properties,
                autow=prop.width=="auto",
                autoh=prop.height=="auto",
                // compare with px
                us = xui.$us(prf),
                adjustunit = function(v,emRate){return prf.$forceu(v, us>0?'em':'px', emRate)},
                root = prf.getRoot(),
                boxNode = prf.getSubNode('BOX'),
                offset = prf.box._getHeaderOffset(prf),
                // caculate by px
                ww=width?prf.$px(width):width,
                hh=height?prf.$px(height):height,
                t;
            if( width || height){
                // reset here
                if(width)prop.width=adjustunit(ww);
                if(height)prop.height=adjustunit(hh);

                boxNode.css({
                    marginLeft:-offset.left+"px",
                    marginTop:-offset.top+"px",
                    width:autow?"auto":width?(ww+offset.left+'px'):null,
                    height:autoh?"auto":height?(hh+offset.top+'px'):null
                });

                xui.resetRun(prf.getUid("resize"),function(){
                   if(prf&&prf.box)prf.box._resizeTable(prf, prf.getSubNode('BOX').cssSize());
                });
            }
        }
    }
});