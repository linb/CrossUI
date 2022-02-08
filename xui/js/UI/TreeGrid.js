//rowMap => row_SerialIdMapItem
//rowMap2 => row_ItemIdMapSerialId
//colMap => header_SerialIdMapItem
//colMap2 => header_ItemIdMapSerialId
//cellMap => cells_SerialIdMapItem
//cellType: label,input,textarea,combobox,listbox,file,getter,helpinput,button,dropbutton,cmdbox,popbox,date,time,datetime,color,spin,counter,currency,number,checkbox,progress
xui.Class("xui.UI.TreeGrid",["xui.UI","xui.absValue"],{
    Instance:{
        activate:function(){
            var profile=this.get(0),t;
            if(!profile.renderId)return;
            profile.getSubNode('ROWS22').nextFocus(true, true, true);
            return this;
        },
        _setCtrlValue:function(value){
            return this.each(function(profile){
                if(!profile.renderId)return;
                if(profile.properties.activeMode=='none')return;

                var box = profile.boxing(),
                    uiv = box.getUIValue(),
                    p = profile.properties,
                    rowMap=profile.rowMap,
                    k = p.activeMode=='row'?['CELLS1','CELLS2','MARK']:'CELLA',
                    getN = function(k,i){return profile.getSubNodes(k,i)},
                    getI = function(i){
                        var map1=profile.rowMap2;
                        if(p.activeMode=='row')
                            return map1[i];
                        else{
                            if(!i)return;
                            var r=(''+i).split('|');
                            return xui.get(profile.rowMap,[map1[r[0]],'_cells',r[1]]);
                        }
                    };

                if(p.selMode=='single'){
                    var itemId = getI(uiv);
                    if(uiv && itemId)
                        getN(k,itemId).tagClass('-checked',false);

                    itemId = getI(value);
                    if(itemId)
                        getN(k,itemId).tagClass('-checked');

                    /*if(itemId){
                        var o = getN("ROW",itemId);
                        if(o){
                            var top = o.offsetTop(),
                            items = getN('SCROLL'),
                            sh=items.scrollHeight(),
                            st=items.scrollTop(),
                            hh=items.height()
                            ;
                            if(sh > hh)
                                if(top<st || top>st+hh)
                                    items.scrollTop(top);
                        }
                    }*/
                }else if(p.selMode=='multi'||p.selMode=='multibycheckbox'){
                    uiv = uiv?(''+uiv).split(p.valueSeparator):[];
                    value = value?(''+value).split(p.valueSeparator):[];
                    //check all
                    xui.arr.each(uiv,function(o,i){
                        if(o=getI(o)){
                            if(i=rowMap[o])delete i._selected;
                            getN(k, o).tagClass('-checked',false);
                        }
                    });
                    xui.arr.each(value,function(o,i){
                        if(o=getI(o)){
                            if(i=rowMap[o])i._selected=1;
                            getN(k, o).tagClass('-checked');
                        }
                    });
                    // clear the header's row handler checkbox
                    if(value.length===0){
                        getN("HFMARK").tagClass('-checked',false);
                        delete profile._$checkAll;
                    }
                }
            });
        },
        calculateGridValue:function(){
            var profile=this.get(0), prop=profile.properties,
                f = prop.gridValueFormula,value=null,
                refs,coo,v2,cellsMap,xformula=xui.ExcelFormula,tcell, colMax, rowMax;
            if(profile.beforeGridValueCalculated && false!==(v2=profile.boxing().beforeGridValueCalculated(profile))){
                value = v2;
            }else{
                if(f){
                    colMax = prop.header.length;
                    // only for first level
                    rowMax = prop.rows.length;
                    if(xformula.validate(f)){
                        cellsMap={};
                        if(refs  = xformula.getRefCells(f, colMax, rowMax)){
                            xui.each(refs,function(v,i){
                                    coo = xformula.toCoordinate(i);
                                    tcell=prop.rows[coo.row].cells[coo.col];
                                    cellsMap[i] = tcell.value;
                            });
                        }
                        value = xformula.calculate(f, cellsMap,colMax,rowMax);
                    }
                }
            }
            if(profile.afterGridValueCalculated)
                profile.boxing().afterGridValueCalculated(profile, value);

            profile._$gridvalue = value;
            if(prop.excelCellId && profile._$oldgridvalue!==profile._$gridvalue){
                profile.boxing().notifyExcel(false) ;
            }
            return profile._$oldgridvalue = value;
        },
        // notify the grid's modification to fake excel ( in module )
        notifyExcel:xui.UI.Input.prototype.notifyExcel,
        // get grid's fake cexcel cell value
        getExcelCellValue:function(){
            var profile=this.get(0), prop=profile.properties,f,refs,coo,value,v2,cellsMap,xformula=xui.ExcelFormula,tcell, colMax, rowMax;
            if(prop.excelCellId){
                value = ('_$gridvalue' in profile) ? profile. _$gridvalue : this.caculateGridValue();
                if(xui.isSet(v2 = (profile.onGetExcelCellValue && profile.boxing().onGetExcelCellValue(profile, prop.excelCellId, value))))
                    value = v2;
                return value;
            }
            return null;
        },
        // calculate the cellTo's formula, and apply to the cell
        // only for first level
        applyCellFormula:function(cellTo, dirtyMark, triggerEvent){
            return this.each(function(prf){
                var tg=prf.box,  formula, j ,i, needUpdate,t2,cellsMap={},coo,tcell,
                    prop = prf.properties,
                    rows=prop.rows,
                    // only for first level
                    colMax = xui.arr.indexOf(prop.header, cellTo._col),
                    rowMax = xui.arr.indexOf(rows, cellTo._row),
                    xformula = xui.ExcelFormula;
                if(formula = tg._getCellFormula(prf, cellTo, xformula.toColumnChr(colMax+1),rowMax+1)){
                    var refs = xformula.getRefCells(formula, colMax,rowMax)
                    if(!refs)return ;
                    xui.each(refs,function(v,i){
                        coo = xformula.toCoordinate(i);
                        tcell = rows[coo.row].cells[coo.col];
                        cellsMap[i] = tcell.value;
                    });
                     t2=xformula.calculate(formula, cellsMap,colMax,rowMax);
                     if(t2!==cellTo.value){
                        needUpdate = [cellTo._serialId,t2,cellTo, formula];
                        if(prf.beforeApplyFormula && false===prf.boxing().beforeApplyFormula(prf, cellTo, t2, formula, cellTo._row, cellTo._col)){}else{
                            tg._updCell(prf, needUpdate[0], {value:needUpdate[1]}, dirtyMark, triggerEvent, true);
                        }
                        if(prf.afterApplyFormulas)
                            prf.boxing().afterApplyFormulas(prf, [needUpdate]);
                     }
                }
            });
        },
        // calculate all cells' (or cellFrom's)  formula, and apply to them(it)
        // only for first level
        triggerFormulas:function(cellFrom, dirtyMark, triggerEvent){
            return this.each(function(prf){
                var tg=prf.box,  cellId,
                    prop=prf.properties,
                    rows=prop.rows,
                    // only for first level
                    rowMax =rows.length,
                    colMax = prop.header.length,
                    xformula=xui.ExcelFormula,
                    formulaCells={}, formula, tcell;
                //1. collection all formula cells
                xui.arr.each(prop.rows, function(row,i){
                    xui.arr.each(row.cells,function(c,j){
                        if(c===cellFrom)cellId=xformula.toCellId(j,i);
                        if(formula = tg._getCellFormula(prf, c, xformula.toColumnChr(j+1), i+1)){
                            formulaCells[xformula.toCellId(j,i)]=[c,formula];
                        }
                    });
                });
                // if input cell, must remove itself;
                if(cellId)delete formulaCells[cellId];
                if(xui.isEmpty(formulaCells))return;

                //2. collect refs for formulaCells
                var refs={};
                xui.each(formulaCells,function(a, id){
                     if(a = xformula.getRefCells(a[1],colMax,rowMax))
                         refs[id]=a;
                });

                //3. loop to calculate non-ref cells
                var count, noFormulaRef, cellsMap={}, coo, needUpdate=[], t1,t2,
                    changed={}, needRec;
                if(cellId){
                    changed[cellId]=1;
                }
                do{
                    count=0;
                    xui.filter(refs,function(v,k){
                        needRec=0;
                        if(!cellId)needRec=1;
                        else{
                            for(var i in v){
                                if(i in changed){
                                    needRec=1;
                                    break;
                                }
                            }
                        }
                        // no need to re-calculate
                        if(!needRec){
                            return false;
                        }

                        noFormulaRef=true;
                         for(var i in v){
                            if(!cellId && (i in formulaCells)){
                                noFormulaRef=false;
                            }else{
                                if(!(i in cellsMap)){
                                    coo = xformula.toCoordinate(i);
                                    tcell = rows[coo.row].cells[coo.col];
                                    cellsMap[i] = tcell.value;
                                }
                            }
                         }
                         if(noFormulaRef){
                             t1=formulaCells[k];
                             t2=xformula.calculate(t1[1], cellsMap,colMax,rowMax);
                             if(t2!==t1[0].value){
                                 // keep update value
                                needUpdate.push([t1[0], t2, t1[1], t1[0]._serialId]);
                                if(cellId)changed[k]=1;
                             }
                            // remove from formulaCells
                            delete formulaCells[k];
                            count++;
                            return false;
                         }
                    });
                }
                // Avoid circular references
                while(!xui.isEmpty(formulaCells) && count>0);

                // update cell by order
                for(var i=0,l=needUpdate.length;i<l;i++){
                    if(prf.beforeApplyFormula && false===prf.boxing().beforeApplyFormula(prf, needUpdate[i][0], needUpdate[i][1], needUpdate[i][2], needUpdate[i][0]._row, needUpdate[i][0]._col)){}else{
                        tg._updCell(prf, needUpdate[i][3], {value:needUpdate[i][1]}, dirtyMark, triggerEvent, false);
                    }
                }
                // [[cell servialid, cell value, cell, fomula]]
                if(prf.afterApplyFormulas)
                    prf.boxing().afterApplyFormulas(prf, needUpdate);

                if(prop.gridValueFormula){
                    prf.boxing().calculateGridValue(false) ;
                }
            });
        },
        /*insert rows to dom
        arr is formatted properties
        pid,base are item id
        before: insert before?
        */
        _insertRowsToDom:function(profile, arr, pid, base, before,temp){
            //if parent not open, return
            if(pid){
                var parent = profile.rowMap[pid];
                if(parent && !parent._inited)return;
            }
            if(!arr)
                arr=[];

            var obj21,obj22,hw,
                box=profile.box,
                prop=profile.properties,
                hw=profile.getSubNode('FHCELL').width();
            if(hw)hw=profile.$forceu(hw);

            //give width at here, and do filter
            xui.arr.each(arr,function(o){
                o._row0DfW = hw?('width:'+hw):'';
                xui.arr.each(o.cells,function(v,i){
                    v.width=v._col._colWidth;
                })
            });
            // check freezed row exists?
            if(profile.properties.freezedRow){
                var t = profile.getSubNode('ROWS12');
                if(!t.isEmpty()  && t.query('div','id',/-ROWS12\:/).isEmpty())
                    delete profile._passFreezedRow;
            }

            //build dom
            var nodes21 = profile._buildItems('rows21', arr),
                nodes22 = profile._buildItems('rows22', arr);

            //get base dom
            if(!base){
                //no base add to parent
                if(pid){
                    obj21 = profile.getSubNode('SUB1', pid);
                    obj22 = profile.getSubNode('SUB2', pid);
                }else{
                    obj21 = profile.getSubNode('ROWS21');
                    obj22 = profile.getSubNode('ROWS22');
                }
                if(before){
                    obj21.prepend(nodes21);
                    obj22.prepend(nodes22);
                }else{
                    obj21.append(nodes21);
                    obj22.append(nodes22);
                }
            }else{
                //
                obj21 = profile.getSubNode('ROW1', base);
                obj22 = profile.getSubNode('ROW2', base);
                if(obj22 && obj22.get(0)){
                  if(before){
                      obj21.addPrev(nodes21);
                      obj22.addPrev(nodes22);
                  }else{
                      obj21.addNext(nodes21);
                      obj22.addNext(nodes22);
                  }
                }
            }

            //add sub
            xui.arr.each(arr,function(o){
                if(o.sub){
                    o.open=false;
                    if(false===box.getCellOption(profile, o, "iniFold"))
                        profile.boxing()._toggleRows([o],true,false,true);
                }
            });

            if(temp&&temp.length){
                var needshowinput=[],arrt=[];
                xui.arr.each(temp,function(o){
                       if(box.getCellOption(profile, o, "editable")&&
                           (box.getCellOption(profile, o, "editMode")=="inline"|| box.getCellOption(profile, o, "type")=='dropbutton'))
                            needshowinput.push(o);
                });
                temp.length=0;
                // for performance 25
                if(needshowinput.length){
                    for(var i=0,l=needshowinput.length,t;i<l;i++){
                        t=parseInt(i/25,10);
                        if(!arrt[t])arrt[t]=[];
                        arrt[t].push(needshowinput[i]);
                    }
                    needshowinput.length=0;
                    var fun=function(){
                        if(arrt.length){
                            var a=arrt.shift();
                            if(a&&a.length){
                                for(var i=0,l=a.length;i<l;i++){
                                    if(profile&&profile.box&&!profile.destroyed&&a[i]&&a[i]._row)
                                        profile.box._editCell(profile,a[i],null,true);
                                }
                                xui.asyRun(fun);
                            }
                        }else{
                            arrt=null;
                        }
                    };
                    // for event attached
                    xui.asyRun(fun);
                }
            }

            //clear rows cache
            delete profile.$allrowscache1;
            delete profile.$allrowscache2;

            profile.box._adjustBody(profile,'addrow');
        },
        _refreshHeader:function(header){
            var profile=this.get(0),
                prop=profile.properties,
                box=profile.box,
                grpcols=xui.clone(prop.grpCols,false,2),
                arr,arr2,
                rows=this.getRows("data");

            xui.breakO(profile.colMap,2);
            profile._$cache = {};

            header=box._adjustHeader(header||[]);
            arr=box._prepareHeader(profile, header);
            prop.header = header;

            this.removeAllRows();

            profile.getSubNodes(['HCELL','HSCELL'], true).remove();

            var nodes1, nodes2;
            if(arr.length){
                nodes1=profile._buildItems('header1', arr);
                profile.getSubNode('HCELLS1').append(nodes1);
                nodes2=profile._buildItems('header2', arr);
                profile.getSubNode('LHCELL').addPrev(nodes2);
            }
            if(grpcols && xui.isArr(grpcols) && grpcols.length>0){
                grpcols=box._adjustGrpColsData(profile,grpcols);
                prop.grpCols=grpcols;
                arr2=box._prepareGrpCols(profile, grpcols, arr);
                if(arr2 && arr2.length){
                    nodes1=profile._buildItems('grpCols1', arr2);
                    profile.getSubNode('GRPCELLBOX1').append(nodes1);
                    nodes2=profile._buildItems('grpCols2', arr2);
                    profile.getSubNode('GRPCELLBOX2').append(nodes2);
                }
                box._adjustColsWidth(profile);
                box._adjustColsHeight(profile);

                profile.adjustSize();
            }
            if(rows&&rows.length)
                this.setRows(rows);

            box._adjustBody(profile,'refreshheader');

            //render
            var co=profile.properties.colOptions;
            xui.arr.each(arr,function(o){
                if(xui.isFun(o.colRenderer||co.colRenderer))
                    (o.colRenderer||co.colRenderer).call(null,profile,o);
            });
            // move it manually
            if(prop.treeMode=='infirstcell' && arr[0]){
                profile.getSubNode('HCELLA', arr[0]._serialId).prepend(
                    profile.getSubNode('LTAGCMDS')
                ).prepend(
                    profile.getSubNode('HFMARK')
                );
            }

            // clear collist cache
            if(profile.$col_pop){
                profile.$col_pop.destroy(true);
                delete profile.$col_pop;
            }
            //clear editor cache
            xui.each(profile.$cache_editor,function(o){
                if(!o.destroyed)o.destroy(true);
            });
            profile.$cache_editor={};
        },
        _toggleRows:function(rows, expand){
            var self=this;
            if(rows && rows.length)
                xui.arr.each(rows,function(o){
                    if(o.id)self.toggleRow(o.id, expand);
                });
        },
        isSubInited:function(id){
            var row=this.getRowbyRowId(id);
            return row && row.sub && xui.isArr(row.sub);
        },
        autoRowHeight:function(rowId){
            return this.each(function(prf){
                if(prf.renderId ){
                    var ev=xui.Event;
                    if(ev.__realtouch)ev.__simulatedMousedown=1;
                    if(rowId && prf.rowMap2[rowId])
                        prf.getSubNode('FHANDLER',prf.rowMap2[rowId]).onDblclick(true);
                    else
                        xui.each(prf.rowMap,function(o,i){
                            prf.getSubNode('FHANDLER',i).onDblclick(true);
                        });
                    if(ev.__realtouch)ev.__simulatedMousedown=0;
                }
            });
        },
        autoColWidth:function(colId){
            return this.each(function(prf){
                if(prf.renderId){
                    var ev=xui.Event;
                    if(ev.__realtouch)ev.__simulatedMousedown=1;

                    if(colId && prf.colMap2[colId])
                        prf.getSubNode('HHANDLER',prf.colMap2[colId]).onDblclick(true);
                    else
                        xui.each(prf.colMap,function(o,i){
                            prf.getSubNode('HHANDLER',i).onDblclick(true);
                        });
                    if(ev.__realtouch)ev.__simulatedMousedown=0;
                }
            });
        },
        autoColHeight:function(){
            return this.each(function(prf){
                if(prf.renderId){
                    var ev=xui.Event;
                    if(ev.__realtouch)ev.__simulatedMousedown=1;
                    prf.getSubNode('FHANDLER').onDblclick(true);
                    if(ev.__realtouch)ev.__simulatedMousedown=0;
                }
            });
        },
        addHotRow:function(focusPos, pid, baseRow){
            var prf=this.get(0);
            if(prf.renderId)
                prf.box._addTempRow(prf, focusPos||null, pid, baseRow);
            return this;
        },
        focusHotRow:function(focusPos){
            var prf=this.get(0);
            if(prf.renderId&&prf.__hastmpRow)
                this.focusCellbyRowCol(prf.box._temprowid, focusPos||0);
            return this;
        },
        getHotRow:function(type){
            return this.getRowbyRowId(this.Class._temprowid, type);
        },
        updateHotRow:function(cells,dirtyMark,triggerEvent){
            return this.updateRow(this.Class._temprowid, {cells: cells}, dirtyMark,triggerEvent);
        },
        removeHotRow:function(){
            var profile=this.get(0);
            profile.box._sethotrowoutterblur(profile,true);
            delete profile.__hastmpRow;
            this.removeRows([profile.box._temprowid],false);
            return this;
        },
        isDirtied:function(){
            var dirty=false, prf=this.get(0);
            // check grid (for delete)
            if(prf._dirty)return true;
            // check row (for new row)
            xui.each(prf.rowMap,function(v){
                if(v._dirty || v._oValue!==v.value||(('unit' in v) && v._oUnit!==v.unit)){
                    dirty=true;
                    return false;
                }
            });
            // check cell
            xui.each(prf.cellMap,function(v){
                if(v._dirty || v._oValue!==v.value || (('unit' in v) && v._oUnit!==v.unit)){
                    dirty=true;
                    return false;
                }
            });
            return dirty;
        },
        isCellDirtied:function(cell){
            return cell._dirty || cell._oValue!==cell.value || (('unit' in cell) && cell._oUnit!==cell.unit);
        },
        isRowDirtied:function(row){
            var ns=this, prf=ns.get(0), dirty = row._dirty || row._oValue!==row.value;
            if(prf._dirty)return true;
            for(var i=0,l=row.cells.length;i<l;i++){
                if(ns.isCellDirtied(row.cells[i]))
                    return true;
            }
            return false;
        },
        _getObjByDom:function(src, type){
            var prf=this.get(0),
                subId=prf.getSubId(typeof src=='string'
                    ? src.charAt(0)=='!'
                        ? ((src=xui.use(src).get(0))&&src.id)
                        : src
                    : src.id );
            return prf[type=="row"?"rowMap":type=="col"?"colMap":"cellMap"][subId];
        },
        getRowByDom:function(src, type, splitMixColumn){
            return this.get(0).box._getRow(this.get(0), this._getObjByDom(src, "row"),type,splitMixColumn);
        },
        getHeaderByDom:function(src){
            return this._getObjByDom(src, "col");
        },
        getCellByDom:function(src){
            return this._getObjByDom(src, "cell");
        },
        /*rows related*/
        //type: 'original', 'data', 'map', 'min', 'value'
        getRows:function(type, splitMixColumn){
            var v=this.get(0).properties.rows,a,b;
            if(!xui.isArr(v))return [];
            if(type=='data'||type=='min'||type=='value'||type=='map'){
                a=xui.clone(v,true);

                if(a&&a.length&&a[a.length-1]&&a[a.length-1].id==this.constructor._temprowid)
                    a.pop();

                if(type=='min'||type=='value'){
                    xui.arr.each(a,function(o,i){
                        if(a[i].cells){
                            xui.each(b=a[i]=a[i].cells,function(v,j){
                                b[j] = ('value' in v)?v.value:v;
                            });
                        }
                    });
                }else if(type=='map'){
                    a = this.getRawData(null, splitMixColumn);
                }
                return a;
            }else
                return v;
        },
        getRowbyRowId:function(rowId, type, splitMixColumn){
            var profile=this.get(0),v=profile.rowMap2,rows=profile.properties.rows,t;
            if(xui.isNumb(rowId))rowId=xui.get(rows,[rowId==-1?(rows.length-1):rowId,"id"]);
            if(v&&v[rowId])
                return profile.box._getRow(profile, profile.rowMap[v[rowId]], type, splitMixColumn);
            if((v=profile.queryItems(rows, function(v,k){
                return v.id==rowId;
            }, 1,1))&&v.length)
                return profile.box._getRow(profile, v[0], type, splitMixColumn);
        },
        getRowbyCell:function(cell, type, splitMixColumn){
            return this.constructor._getRow(this.get(0), cell._row, type, splitMixColumn);
        },
        toggleRow:function(rowId, expand, recursive, stopanim, callback){
            var ns=this, profile = this.get(0),self=arguments.callee,
                    v=profile.rowMap2,rows=profile.properties.rows;
            if(xui.isNumb(rowId))rowId=xui.get(rows,[rowId==-1?(rows.length-1):rowId,"id"]);
            if(v&&v[rowId]){
                var row = profile.rowMap[v[rowId]];
                if(row && row.sub && (!xui.isSet(expand) || !!expand !== !!row._checked)){
                    profile.box._setSub(profile, row, xui.isSet(expand) ?!!expand:!row._checked, recursive, stopanim||recursive, callback);
                }
            }else{
                xui.arr.each(rows,function(row){
                    if(row.sub)
                        self.call(ns,row.id,expand,recursive, true, callback);
                })
            }
            return this;
        },
        showRows:function(rowId,/*default is the current*/ show){
            var ns=this,
                profile = ns.get(0),
                showNodes=xui(),
                hideNodes=xui(),
                prop = profile.properties;
            rowId = xui.isHash(rowId)?rowId.id:xui.isArr(rowId)?rowId:rowId===0?[0]:rowId?(rowId+'').split(prop.valueSeparator):null;
            if(!rowId){
                rowId=xui.get(ns.getActiveRow(),"id") || ((prop.$UIvalue||prop.value)+"");
                rowId=rowId.split(prop.valueSeparator);
            }
            if(rowId&&rowId.length){
                xui.arr.each(rowId, function(r, row){
                    if(row=ns.getRowbyRowId(r)){
                        if(show===false){
                            if(!row.hidden)hideNodes.merge(ns.getSubNodes(['ROW1','ROW2'],row._serialId));
                        }else{
                            if(row.hidden)showNodes.merge(ns.getSubNodes(['ROW1','ROW2'],row._serialId));
                        }
                        row.hidden=show===false;
                    }
                });
            }

            // reflect to dom
            if(!showNodes.isEmpty())showNodes.css('display','');
            if(!hideNodes.isEmpty())hideNodes.css('display','none');
            return this;
        },
        updateRow:function(rowId/*default is the current*/,options,dirtyMark,triggerEvent){
            var ns=this,
                profile = ns.get(0),
                box = profile.box,
                prop = profile.properties,
                orow;

            if(!rowId&&rowId!==0)rowId=xui.get(ns.getActiveRow(),"id") || ((prop.$UIvalue||prop.value)+"").split(prop.valueSeparator)[0];
            orow = ns.getRowbyRowId(rowId);
            if(!orow)return ns;

            var pdm = prop.dirtyMark,
                psdm = pdm && prop.showDirtyMark,
                ishotrow = orow.id==box._temprowid,
                sc = xui.absObj.$specialChars,
                ext;


            if(!xui.isHash(options)){
                if(xui.isArr(options)) options={cells:options};
                else options={value:options};
            }

            options=xui.filter(options,function(o,i,r){r= !sc[i.charAt(0)]; if(!r){ext=ext||{}; ext[i]=o} return r;});

            if(triggerEvent){
                if(profile.beforeRowUpdated && false === profile.boxing().beforeRowUpdated(profile, orow, options, ishotrow, ext))
                    return;
            }
            if(!xui.isEmpty(options)){
                if(orow){
                    var rid=orow._serialId, t, tt, nid ;

                    // [[modify id
                    if(xui.isSet(options.id))options.id+="";
                    if(options.id && options.id!==rowId){
                        nid=options.id;
                        var m2=profile.rowMap2, v;
                        if(!m2[nid]){
                            if(v=m2[rowId]){
                                m2[nid]=v;
                                delete m2[rowId];
                                profile.rowMap[v].id=nid;
                                // modify cells link
                                xui.each(profile.colMap,function(o){
                                    if(o=o._cells){
                                        o[nid]=o[rowId];
                                        delete o[rowId];
                                    }
                                });
                            }
                        }
                    }else{
                        options.id=rowId;
                    }
                    // modify id only
                    if(xui.isEmpty(options))
                        return ns;
                    //]]

                    // need to refresh
                    if(('group' in options && options.group!=orow.group) ||
                        'cells' in options ||
                        ('sub' in options &&
                        // only try to show/hide toggle icon
                        !((options.sub===true && !orow.sub) || (!options.sub && orow.sub===true)))
                    ){
                        var id="__special",pid=orow._pid?profile.rowMap[orow._pid].id:null;
                        // change id in rowMap
                        orow.id=id;
                        // change link in rowMap2
                        profile.rowMap2[id]=profile.rowMap2[nid||rowId];
                        delete profile.rowMap2[nid||rowId];
                        // remove cells link
                        xui.each(profile.colMap,function(o){
                            if(o=o._cells)
                                delete o[nid||rowId];
                        });
                        // make sure data
                        orow=xui.clone(orow,true);
                        xui.merge(orow, options, 'all');
                        if('sub' in options && !options.sub)delete orow.sub;

                        ns.insertRows([orow],pid,id,true);
                        ns.removeRows([id]);

                        if(profile.properties.activeMode=='row'){
                            var uiv=profile.properties.$UIvalue||"", arr=(''+uiv).split(profile.properties.valueSeparator);
                            if(arr.length && xui.arr.indexOf(arr, rowId)!=-1){
                                if(nid)
                                    xui.arr.removeValue(arr, rowId);
                                ns.setUIValue(arr.join(profile.properties.valueSeparator), true,null,'sub');
                            }
                        }
                    }else{
                        if('sub' in options){
                            t = box._getToggleNode(profile, rid);
                            if(options.sub){
                                t.addClass('xui-uicmd-toggle');
                                if(orow._layer)
                                    t.removeClass('xui-uicmd-empty');
                            }else{
                                t.removeClass('xui-uicmd-toggle');
                                if(orow._layer)
                                    t.addClass('xui-uicmd-empty');
                            }
                        }
                        //
                        tt = ns.getSubNodes(['CELLS1','CELLS2'],rid);
                        if(t=profile.$px(options.height)) profile.box._adjusteditorH(profile, tt.height(orow._rowHeight=profile.$forceu(t) ),t);
                        if(t=options.rowStyle) tt.attr('style',tt.attr('style')+";"+t);
                        if(t=options.rowClass) tt.addClass(t);
                        if(options.hasOwnProperty('disabled')){
                            var cls='xui-uicell-disabled';
                            if(options.disabled)
                                tt.addClass(cls);
                            else
                                tt.removeClass(cls);
                        }
                        if(options.hasOwnProperty('readonly')){
                            var cls='xui-ui-readonly';
                            if(options.readonly)
                                tt.addClass(cls);
                            else
                                tt.removeClass(cls);
                        }
                        //
                        if(t=options.firstCellStyle) (tt=ns.getSubNode('FCELL',rid)).first().attr('style',tt.attr('style')+";"+t);
                        if(t=options.firstCellClass) ns.getSubNode('FCELL',rid).first().addClass(t);

                        if(options.hasOwnProperty('value') && !xui.isSet(options.caption) ) {
                            options.caption = options.value +"";
                        }
                        if(options.hasOwnProperty('caption'))
                            ns.getSubNode('FCELLCAPTION',rid).get(0).innerHTML=options.caption||"";

                        if(options.hasOwnProperty('rowResizer')){
                            t=!!options.rowResizer;
                            ns.getSubNode('FHANDLER',rid).css('display',(options.rowResizer=t)?"block":'none');
                        }

                        if(options.hasOwnProperty('hidden')){
                            var  b = !!options.hidden;
                            if(b){
                                if(orow.hidden!==true){
                                    ns.getSubNodes(['ROW1','ROW2'],rid).css('display','none');
                                }
                            }else{
                                if(orow.hidden===true){
                                    ns.getSubNodes(['ROW1','ROW2'],rid).css('display','');
                                }
                            }
                        }

                        xui.merge(orow, options, 'all');

                        //if update value
                        if(options.hasOwnProperty('value')){
                            var node=profile.getSubNode('CELLA', rid);
                            if(!pdm || dirtyMark===false)
                                orow._oValue=orow.value;
                            else{
                                if(orow.value===orow._oValue){
                                    if(psdm)
                                        node.removeClass('xui-ui-dirty');
                                }else{
                                    if(psdm)
                                        node.addClass('xui-ui-dirty');
                                }
                            }
                            if(orow._editor)orow._editor.setValue(options.value,true,'editorini');
                        }
                    }
                }else{
                    var rst=ns.get(0).queryItems(ns.getRows(),function(o){return typeof o=='object'?o.id===rowId:o==rowId},true,true,true);
                    if(rst.length)
                        xui.merge(orow = rst[0][0], options, 'all');
                }
                orow._dirty=true;
            }
            if(triggerEvent){
                if(profile.afterRowUpdated)
                    profile.boxing().afterRowUpdated(profile, orow, options, ishotrow, ext);
            }
            return ns;
        },
        insertMapRows:function(arr, pid/*true: the current item*/, base/*true: the current item*/, before, ignoreMixColumn, ensureHotRow){
            var ns=this,
                args = xui.toArr(arguments);
            if(xui.isHash(arr))arr=[arr];
            var cols={},rowdata=[],cellsArr=[],i,j,l=arr.length,hash;
            // collect data
            for(i=0;i<l;i++){
                if(!xui.isHash(hash=arr[i])){
                    continue;
                }
                for(var k in hash){
                    if(k=="__row__id"){
                        rowdata[i] = rowdata[i]||{};
                        rowdata[i].id = hash[k];
                    }else if(k.indexOf("__row__")==0){
                        rowdata[i] = rowdata[i]||{};
                        rowdata[i][k] = hash[k];
                    }else{
                        if(!(k in cols))cols[k]=[];
                        cols[k][i] = hash[k];
                    }
                }
            }
            var map={};
            xui.arr.each(ns.getHeader(), function(o,i){
                map[o.id] = i;
            });
            //convert to header / cellsArr
            for(var k in cols){
                if(k in map){
                    j=map[k];
                    for(i=0;i<l;i++){
                        if(!cellsArr[i])cellsArr[i]=[];
                        cellsArr[i][j]=cols[k][i];
                    }
                }
            }
            // set row id&other
            if(rowdata.length){
                xui.each(cellsArr,function(cells, i){
                    if(rowdata[i]){
                        cellsArr[i]=rowdata[i];
                        cellsArr[i].cells=cells;
                    }
                });
            }
            args[0] = cellsArr;
            return ns.insertRows.apply(this, args);
        },
        //pid,base are id
        insertRows:function(arr, pid/*true: the current item*/, base/*true: the current item*/, before, ignoreMixColumn,ensureHotRow){
            var ns=this,
                rows, v,
                c=ns.constructor,
                profile=ns.get(0);
            if(xui.isHash(arr))arr=[arr];
            if(arr && xui.isArr(arr) && arr.length>0){
                var prop=profile.properties,
                    row_m=profile.rowMap2,
                    ro=prop.rowOptions,
                    b=profile.rowMap, temp,
                    tar, t, k;
                // current
                if(pid===true){
                    v=prop.$UIvalue||prop.value;
                    if(v)v=(v+'').split(prop.valueSeparator);
                    pid=v[0];
                }

                pid = row_m&&row_m[pid];
                if(base===true){
                    v=prop.$UIvalue||prop.value;
                    if(v)v=(v+'').split(prop.valueSeparator);
                    base=v[0];
                }
                base = row_m&&row_m[base];
                if(base){
                    t=profile.rowMap[base];
                    if(t)pid=t._pid;
                }
                arr=c._adjustRows(profile, arr, ignoreMixColumn);
                if(!pid)
                    tar = xui.isArr(prop.rows)?prop.rows:(prop.rows=[]);
                else{
                    k=b&&b[pid];
                    if(!k){
                        return;
                    }
                    tar = xui.isArr(k.sub)?k.sub:(k.sub=[]);
                }

                //1
                if(profile.renderId){
                    // if insert to root, or the parent node is inited
                    if(!xui.isSet(pid) || k._inited){
                        //prepareData(add links)
                        temp=[];
                        rows = c._prepareItems(profile, arr, pid,temp);
                        ns._insertRowsToDom(profile, rows, pid, base, before,temp);

                        //render
                        xui.arr.each(arr,function(o){
                            if(xui.isFun(o.rowRenderer||ro.rowRenderer))
                                (o.rowRenderer||ro.rowRenderer).call(null,profile,o);
                        });
                    }
                    // normal row to tree row
                    else if(xui.isSet(pid) && !k.inited){
                        profile.box._getToggleNode(profile, pid)
                                .removeClass('xui-icon-placeholder xui-uicmd-none')
                                .addClass('xui-uicmd-toggle');
                    }
                }
                //2
                //must be here
                if(!base)
                    xui.arr.insertAny(tar, arr, before?0:-1);
                else{
                    var index = xui.arr.subIndexOf(tar,'_serialId', base);
                    xui.arr.insertAny(tar,arr, before?index:(index+1));
                }
                //3
                if(profile.renderId){
                    profile.box._asy(profile);
                }
            }
            if(ensureHotRow!==false && profile.renderId){
                profile.box.__ensurehotrow(profile,ensureHotRow);
            }

            // try to hide ui-no-children row
            // logic must same to doFilter
            if(profile.$itemFilter){
                var hideRows=[];
                xui.arr.each(arr,function(row){
                   if(row.sub && !row.hidden){
                    //  if(!row._checked && row.id)
                    //      ns.toggleRow(row.id, true, false, true);
                       if(true!==profile.$itemFilter(row,'checkSub',profile)){
                            var flag;
                            for(var i=0,l=row.sub.length;i<l;i++){
                               if( !row.sub[i].hidden){
                                   flag=1;break;
                               }
                           }
                           if(!flag)hideRows.push(row.id);
                       }else{
                           hideRows.push(row.id);
                       }
                   }
                });
                if(hideRows.length)ns.showRows(hideRows,false);
            }
            return rows;
        },
        doFilter:xui.absList.prototype.doFilter,
        //delete row according to id
        //xui.UI.TreeGrid.getAll().removeRows(['2','5'])
        removeRows:function(ids/*default is the current*/,ensureHotRow){
            var self=this,
                profile=self.get(0);
            if(!profile.rowMap2)return;

            var p=profile.properties,
                cell=profile.cellMap,
                nodes=[],v,count=0;

            //get array
            ids = xui.isHash(ids)?[ids.id]:xui.isArr(ids)?ids:ids===0?[0]:ids?(ids+"").split(p.valueSeparator):null;
            if(!ids){
                ids= xui.get(self.getActiveRow(),"id") || ((p.$UIvalue||p.value)+"");
                ids = ids.split(p.valueSeparator);
            }
            if(!ids || !ids.length)return self;

            xui.arr.each(ids,function(o,i){
                if(xui.isNumb(o))
                    o=p.rows[o] && p.rows[o].id;
                ids[i]=''+o;
            });
            xui.arr.each(ids,function(id){
                //get item id
                if(id=profile.rowMap2[id]){
                    count++;
                    //get row
                    var row;
                    if(row = profile.rowMap[id]){
                        var tdids = row._cells,
                            rowid = row.id,
                            temp;
                        //for sub delete
                        if(row.sub && xui.isArr(row.sub)){
                            var arr=[];
                            xui.arr.each(row.sub,function(o){
                                arr.push(o.id)
                            });
                            self.removeRows(arr);
                        }

                        ////delete and clear links
                        xui.each(tdids,function(o,i){
                            //clear colMap/properties.header
                            delete cell[o]._col._cells[rowid];
                            xui.breakO(cell[o]);
                            //clear cellMap
                            delete cell[o];
                            profile.reclaimSubId(o.slice(3), 'cell');
                        });

                        //clear properties.row array
                        if(temp= row._pid?(temp=profile.rowMap[row._pid])?temp.sub:null:profile.properties.rows)
                            if(xui.isArr(temp))
                                xui.filter(temp,function(o){
                                    return o._serialId != id;
                                });

                        //clear profile.rowMap2
                        delete profile.rowMap2[rowid];

                        //clear rowMap
                        xui.breakO(profile.rowMap[id]);
                        delete profile.rowMap[id];

                        nodes.push(profile.getSubNode('ROW1', id).get(0));
                        nodes.push(profile.getSubNode('ROW2', id).get(0));
                    }
                    profile.reclaimSubId(id.slice(3), 'row');
                }else{
                    var f=function(rows){
                        var index=xui.arr.subIndexOf(rows, "id", id);
                        if(index!==-1){
                            count++;
                            xui.arr.removeFrom(rows,index);
                        }
                        xui.arr.each(rows,function(row){
                            if(row.sub)f(row.sub);
                        });
                    };
                    f(p.rows);
                }
            });
            if(count>0){
                // clear UI value
                if(v=p.$UIvalue){
                    if((v=(''+v).split(p.valueSeparator)).length>1){
                        xui.filter(v,function(o){
                            return xui.arr.indexOf(ids,o)==-1;
                        });
                        p.$UIvalue=v.join(p.valueSeparator);
                    }else{
                        if(xui.arr.indexOf(ids,p.$UIvalue)!=-1)
                            p.$UIvalue=null;
                    }
                }
                xui(nodes).remove();

                // remove activerow/cell
                if(profile.$activeCell && !xui.Dom.byId(profile.$activeCell))
                    delete profile.$activeCell;
                if(profile.$activeRow && !xui.Dom.byId(profile.$activeRow))
                    delete profile.$activeRow;

                //clear rows cache
                delete profile.$allrowscache1;
                delete profile.$allrowscache2;

                profile.box._asy(profile);
                profile.box._adjustBody(profile,'delrow');
            }
            if(ensureHotRow!==false && profile.renderId){
                profile.box.__ensurehotrow(profile,ensureHotRow);
            }
            profile._dirty=1;
            return self;
        },
        insertCol:function(col, cells, pos){
            var profile=this.get(0),
                prop=profile.properties,
                box=profile.box,
                rows=prop.rows,
                cell,base,colResult,cellResult;

            //// handle header
            // position
            pos=xui.isNumb(pos)?pos:-1;
            if(pos===-1||prop.header.length<pos)pos=prop.header.length;
            if(pos<0)pos=0;
            if(prop.treeMode=='infirstcell' && pos===0)return false;

            var leftRegion = pos <= prop.freezedColumn -1 ;

            var arr=prop.grpCols;
            if(arr && xui.isArr(arr)&& arr.length){
                for(var j=0,m=arr.length,grp;j<m;j++){
                    grp=arr[j];
                    if(grp.from>pos){
                        grp.from++;
                        grp['to']++;
                    }else if(pos>=grp.from && pos<=grp['to']){
                        grp['to']++;
                    }
                }
            }

            if(profile.renderId){
                colResult = box._parepareCol(profile, col,prop.header);
                col=colResult[0];

                // insert header
                xui.arr.insertAny(prop.header, col, pos);
                // insert dom node
                base = profile.getSubNode(leftRegion?'HCELLS1':'HCELLS2').children().get(pos-1/*must be before LCELL*/);
                if(base)
                    xui(base).addNext(profile._buildItems(leftRegion?'header1':'header2', [colResult[1]]));

                // render
                var co=profile.properties.colOptions;
                if(xui.isFun(col.colRenderer||co.colRenderer))
                    (col.colRenderer||co.colRenderer).call(null,profile,col);

                // for adjust UI
                prop.grpCols=box._adjustGrpColsData(profile,arr);
                box._adjustColsWidth(profile);
                box._adjustColsHeight(profile);
                box._adjustBody(profile,'addcol');
            }else{
                // insert header dir
                xui.arr.insertAny(prop.header, col, pos);
            }

            //// handle cells
            cells=xui.isArr(cells)?cells:[];
            var k=0, applaycell=function(rows){
                    var temp=[];
                    xui.arr.each(rows,function(row,i){
                        if(row.group){
                            applaycell(row.sub);
                        }else{
                            cell=cells[k];
                            // this row was rendered
                            base=profile.getSubNode(leftRegion?'CELLS1':'CELLS2',row._serialId).children().get(pos-1/*must be before LCELL*/);
                            if(base){
                                cellResult = box._prepareCell(profile,cell,row,col,temp);

                                // original cell only
                                xui.arr.insertAny(row.cells, cellResult[0], pos);
                                // insert dom node
                                xui(base).addNext(profile._buildItems(leftRegion?'rows1.cells':'rows2.cells', [cellResult[1]]));
                            }else{
                                // insert cell dir
                                xui.arr.insertAny(row.cells, cell||{}, pos);
                            }
                        }
                        k++;
                    });
                    if(temp.length){
                        xui.arr.each(temp,function(o){
                               if(box.getCellOption(profile, o, "editable")&&
                                   (box.getCellOption(profile, o, "editMode")=="inline"||box.getCellOption(profile, o, "type")=="dropbutton"))
                                    box._editCell(profile,o);
                        });
                        temp.length=0;
                    }
                };
            if(rows&&xui.isArr(rows)){
                applaycell(rows);
            }
            profile._dirty=1;
        },
        removeCols:function(ids){
            var self=this,
                profile=self.get(0),
                box=profile.box,
                p=profile.properties,
                cell=profile.cellMap,
                SubID=xui.UI.$tag_subId,
                nodes=[],count=0;

            //get array
            ids = xui.isArr(ids)?ids:(ids+"").split(p.valueSeparator);
            xui.arr.each(ids,function(o,i){ids[i]=''+o});
            if(ids&&ids.length>1){
                ids.sort(function(x,y){
                    var xx=xui.arr.indexOf(p.header, x);
                    if(xx==-1)xx=xui.arr.subIndexOf(p.header, "id", x);
                    var yy=xui.arr.indexOf(p.header, y);
                    if(yy==-1)yy=xui.arr.subIndexOf(p.header, "id", y);
                    return xx>yy?1:xx===yy?0:-1;
                });
            }

            var arr=p.grpCols;
            if(arr && xui.isArr(arr)&& arr.length){
                xui.arr.each(ids,function(id){
                    var pos=xui.arr.indexOf(p.header, id);
                    if(pos==-1)pos=xui.arr.subIndexOf(p.header, "id", id);
                    if(pos==-1)return;
                    for(var j=0,m=arr.length,grp;j<m;j++){
                        grp=arr[j];
                        if(grp.from>pos){
                            grp.from--;
                            grp['to']--;
                        }else if(pos>=grp.from && pos<=grp['to']){
                           grp['to']--;
                        }
                    }
                },null,true);

                xui.filter(arr,function(o){
                    var r=o['to']>=o.from;
                    if(!r && profile.renderId){
                        profile.getSubNode(["HCELL","HSCELL"],o[SubID]).remove();
                        delete profile.colMap[o[SubID]];
                        delete profile.colMap2[o.id];
                    }
                    return r;
                });
            }

            xui.arr.each(ids,function(id){
                var index=xui.arr.indexOf(p.header, id);
                if(index==-1)index=xui.arr.subIndexOf(p.header, "id", id);
                if(index==-1)return;

                // clear UI and links
                if(profile.colMap2 && (id=profile.colMap2[id])){
                    count++;
                    //get row
                    var col;
                    if(col = profile.colMap[id]){
                        var tdids = col._cells,
                            colid = col.id;

                        ////delete and clear links
                        xui.each(tdids,function(o,i){
                            nodes.push(profile.getSubNode('CELL', o).get(0));
                            //clear colMap/properties.header
                            delete cell[o]._row._cells[colid];
                            xui.breakO(cell[o]);
                            //clear cellMap
                            delete cell[o];
                            profile.reclaimSubId(o.slice(3), 'cell');
                        });

                        //clear profile.rowMap2
                        delete profile.colMap2[colid];

                        //clear rowMap
                        xui.breakO(profile.colMap[id]);
                        delete profile.colMap[id];
                        var t;
                        t=profile.getSubNode('HCELL', id).get(0);
                        if(t)nodes.push(t);
                        t=profile.getSubNode('HSCELL', id).get(0);
                        if(t)nodes.push(t);
                    }
                    profile.reclaimSubId(id.slice(3), 'header');
                }

                var applaycell=function(rows){
                    xui.arr.each(rows,function(row){
                        if(row.cells)xui.arr.removeFrom(row.cells,index);
                        if(row.sub){
                            applaycell(row.sub);
                        }
                    });
                };
                applaycell(p.rows);

                xui.arr.removeFrom(p.header,index);
            },null,true);
            if(count>0){
                xui(nodes).remove();

                // remove activerow/cell
                if(profile.$activeCell && !xui.Dom.byId(profile.$activeCell))
                    delete profile.$activeCell;

                p.grpCols=box._adjustGrpColsData(profile,arr);
                box._adjustColsWidth(profile);
                box._adjustColsHeight(profile);
                box._adjustBody(profile,'delcol');
            }
            profile._dirty=1;
            return self;
        },
        removeAllRows:function(ensureHotRow){
            var profile=this.get(0),
                box=profile.box,
                prop=profile.properties;
            if(!prop.rows || prop.rows.length<=0)
                return this;

            for(var i in profile.cellMap)
                profile.reclaimSubId(i.slice(3), 'cell');
            for(var i in profile.rowMap)
                profile.reclaimSubId(i.slice(3), 'row');

            //remove links
            xui.each(profile.colMap,function(o){
                o._cells={};
            });
            xui.breakO([profile.rowMap, profile.cellMap],3);

            profile.rowMap = {};
            profile.cellMap = {};
            profile.rowMap2 = {};

            // remove activerow/cell
            delete profile.$activeCell;
            delete profile.$activeRow;

            profile.properties.rows.length=0;
            if(profile.renderId){
                // ensure the column header scroll to zero
                // code must same to the SCROLL->onScroll event
                if(profile.$sl!=0)
                    profile.getSubNode('HEADER2').get(0).scrollLeft=profile.$sl=0;
                profile.getSubNodes(['SCROLL21','SCROLL22']).scrollTop(0).scrollLeft(0);
                profile.getSubNodes(['ROWS21','ROWS22']).empty();
            }
            //clear rows cache
            delete profile.$allrowscache1;
            delete profile.$allrowscache2;
            profile.properties.$UIvalue=null;

            if(ensureHotRow!==false&&profile.renderId&&profile.__hastmpRow){
                box.__ensurehotrow(profile,ensureHotRow);
            }

            box._adjustBody(profile,'delrow');

            return this;
        },

        // reset all cells' value, and clear all dirty mark
        updateGridValue:function(){
            return this.each(function(profile){
                var prop=profile.properties;
                delete profile._dirty;
                xui.each(profile.rowMap,function(v){
                    v._oValue=v.value;
                    if('unit' in v)v._oUnit=v.unit;
                    delete v._dirty;
                });
                xui.each(profile.cellMap,function(v){
                    v._oValue=v.value;
                    if('unit' in v)v._oUnit=v.unit
                    delete v._dirty;
                });
                if(prop.dirtyMark && prop.showDirtyMark)
                    profile.getSubNode('CELLA',true).removeClass('xui-ui-dirty');
            })
        },
        updateRowValue:function(rowId){
            var profile=this.get(0),row=this.getRowbyRowId(rowId),arr=[],prop=profile.properties;
            // for cells
            xui.arr.each(row.cells,function(o){
                if(o._oValue!==o.value||(('unit' in o) && o._oUnit!==o.unit)){
                    o._oValue=o.value;
                    if('unit' in o)o._oUnit=o.unit
                    delete o._dirty;
                    if(prop.dirtyMark)
                        arr.push(profile.getSubNode('CELLA',o._serialId).get(0));
                }
            });
            // for row
            row._oValue = row.value;
            delete row._dirty;
            if(prop.dirtyMark)
                arr.push(profile.getSubNode('CELLA',row._serialId).get(0));

            if(prop.dirtyMark && prop.showDirtyMark)
                xui(arr).removeClass('xui-ui-dirty');
        },
        updateColValue:function(colId){
            var profile=this.get(0),col=this.getHeaderByColId(colId),arr=[],prop=profile.properties;
            xui.arr.each(col.cells,function(o){
                if(o._oValue!==o.value||(('unit' in o) && o._oUnit!==o.unit)){
                    o._oValue=o.value;
                    if('unit' in o)o._oUnit=o.unit;
                    delete o._dirty;
                    if(prop.dirtyMark)
                        arr.push(profile.getSubNode('CELLA',o._serialId).get(0));
                }
            });
            if(prop.dirtyMark && prop.showDirtyMark)
                xui(arr).removeClass('xui-ui-dirty');
        },
        updateCellValue:function(cell){
            var ns=this, profile=ns.get(0), prop=profile.properties;
            if(typeof cell=='string')cell=ns.getCell(cell);
            if(cell._oValue!==cell.value||(('unit' in cell) && cell._oUnit!==cell.unit)){
                cell._oValue=cell.value;
                if('unit' in cell)cell._oUnit=cell.unit;
                delete cell._dirty;
                if(prop.dirtyMark)
                    profile.getSubNode('CELLA',cell._serialId).removeClass('xui-ui-dirty');
            }
            return ns;
        },
        //resetGridValue
        //resetRow
        //resetCol
        resetCellValue:function(cell,force){
            var ns=this, profile=ns.get(0), prop=profile.properties;
            if(typeof cell=='string')cell=ns.getCell(cell);
            if(force||cell._oValue!==cell.value||(('unit' in cell) && cell._oUnit!==cell.unit)){
                cell.value=cell._oValue;
                if('unit' in cell)cell.unit=cell._oUnit;
                delete cell._dirty;
                profile.box._renderCell(profile, cell, {}, profile.getSubNode('CELLA', cell._serialId));
            }
            return ns;
        },
        getActiveRow:function(type, splitMixColumn){
            var ar,profile=this.get(0);
            if(profile.properties.activeMode!='row')return;
            if(!(ar=profile.$activeRow))return;
            ar=profile.rowMap[profile.getSubId(ar)];
         //   if(ar && ar.id && ar.id==profile.box._temprowid){
         //       ar=null;
          //  }
            return profile.box._getRow(profile, ar, type, splitMixColumn);
        },
        setActiveRow:function(rowId){
            var dr, row, profile=this.get(0);
            if(profile.properties.activeMode!='row')return;
            // deative first
            profile.box._activeRow(profile, false);

            if(!(row=this.getRowbyRowId(rowId)))return;
            if(!(dr=profile.getSubNodes(['CELLS1','CELLS2'],row._serialId)).isEmpty()){
                profile.box._activeRow(profile, dr.get(0).id);
                dr.scrollIntoView();
            }
            return this;
        },
        getRowMap:function(rowId, withRowVars){
            var prf=this.get(0),ins=prf.boxing(),p=prf.properties,t,hash;
            if(xui.isHash(rowId))rowId=rowId.id;
            if(!xui.isSet(rowId)&&prf.renderId&&!prf.destroyed){
                if(p.activeMode==="row"){
                    if(t=ins.getActiveRow())rowId=t.id;
                }else if(p.activeMode==="cell"){
                    if(t=ins.getActiveCell())rowId=t._row.id;
                }
            }
            var map = ins.getRowbyRowId(rowId, "map");
            if(withRowVars===false){
                map = xui.filter(map, function(v,k){
                    return k.indexOf("__row__")!==0;
                });
            }
            return map;
        },
        setRowMap:function(rowId, hash, dirtyMark, triggerEvent){
            if(xui.isHash(rowId))rowId=rowId.id;
            return this.each(function(prf){
                var ins=prf.boxing(),p=prf.properties,t;
                if(!rowId&&prf.renderId&&!prf.destroyed){
                    if(p.activeMode="row"){
                        if(t=ins.getActiveRow())rowId=t.id;
                    }else if(p.activeMode="cell"){
                        if(t=ins.getActiveCell())rowId=t._row.id;
                    }
                }
                if(rowId){
                    var row=ins.getRowbyRowId(rowId),
                        header=ins.getHeader('min');
                    if(row){
                        rowId=row.id;
                        // must adjust it first
                        var rows=prf.box._adjustRows(prf, [hash]),
                            cells=rows[0].cells;
                        xui.arr.each(row.cells,function(t,j){
                            xui.isDefined(cells[j] && cells[j].value) && ins.updateCellByRowCol(rowId, header[j], cells[j], dirtyMark, triggerEvent);
                        });
                    }
                }
                p.rowMap=hash;
            });
        },
        /*column and header related*/
        //type: 'original', 'data', 'min', 'value'
        getHeader:function(type){
            var v=this.get(0).properties.header;
            if(!xui.isArr(v))return [];
            if(type=='data')
                return xui.clone(v,true);
            else if(type=='min'||type=='value'){
                var a=xui.clone(v,true),b;
                xui.arr.each(a,function(o,i){
                    a[i]='id' in o ?o.id :o;
                });
                return a;
            }else
                return v;
        },
        getHeaderByColId:function(colId, type){
            var profile = this.get(0), v=profile.properties.header,i;
            if(xui.isNumb(colId))colId=xui.get(profile.properties.header,[colId,"id"]);
            i=xui.arr.subIndexOf(v,"id",colId);
            return i==-1?null:
                type=='data'?xui.clone(v[i],true):
                (type=='min'||type=='value')? 'id' in v[i] ? v[i].id: v[i] :
                v[i];
        },
        clearGrid:function(){
            return this.setHeader();
        },
        getHeaderByCell:function(cell, type){
            var v=cell._col;
            return !v?null:
                type=='data'?xui.clone(v,true):
                (type=='min'||type=='value')?'id' in v?v.id:v :
                v;
        },

        updateHeader:function(colId,options){
            var ns=this,
                profile=ns.get(0),
                prop=profile.properties,
                colh=ns.getHeaderByColId(colId), isGroup;
            if(!colh){
                var grpCols=prop.grpCols,
                    index=xui.arr.subIndexOf(grpCols,"id",colId);
                colh=grpCols[index];
                isGroup=true;
            }
            if(colh){
                if(typeof options!='object') options={caption:options+''};
                else xui.filter(options,true);
                delete options.id;

                if(profile.renderId){
                    var hid=colh._serialId, t, tt,nd;
                    if(!isGroup){
                        if(t=options.width){
                            t=profile.$px(t);
                            var n=[];
                            nd=ns.getSubNode('HCELL',hid).get(0);
                            if(nd)n.push(nd);
                            nd=ns.getSubNode('HSCELL',hid).get(0);
                            if(nd)n.push(nd);
                            xui.each(colh._cells,function(o){
                                n.push(ns.getSubNode('CELL',o).get(0));
                            });
                            profile.box._adjusteditorW(profile, xui(n).width(colh._colWidth=profile.$forceu(t)),t);

                            ns.getSubNode('SCROLL22').onScroll();
                            ns.constructor._adjustColsWidth(ns.get(0));
                            ns.constructor._adjustBody(ns.get(0),'setcol');
                        }

                        //  Forward-compatible with 'visibility'
                        if(options.hasOwnProperty('visibility') && !options.hasOwnProperty('hidden'))
                            options.hidden=!options.visibility;

                        if(options.hasOwnProperty('hidden')){
                            var  b = !!options.hidden;
                            if(b){
                                if(colh.hidden!==true){
                                    ns.showColumn(colId, false);
                                }
                            }else{
                                if(colh.hidden===true){
                                    ns.showColumn(colId, true);
                                }
                            }
                        }
                        if('type' in options){
                            delete colh.editorCacheKey;
                        }
                    }

                    if(t=options.headerStyle||options.colStyle)
                        (tt=ns.getSubNodes(['HCELLA','HSCELLA'],hid)).attr('style',tt.attr('style')+";"+t);
                    if(t=options.headerClass)
                        ns.getSubNodes(['HCELLA','HSCELLA'],hid).addClass(t);
                    if(options.hasOwnProperty('caption'))
                        ns.getSubNodes(['HCELLCAPTION','HSCELLCAPTION'],hid).get(0).innerHTML=options.caption;
                    if('colResizer' in options){
                        t=!!options.colResizer;
                        ns.getSubNode('HHANDLER',hid).css('display',(options.colResizer=t)?"block":'none');
                    }
                }

                xui.merge(colh, options, 'all');

                if('flexSize' in options){
                    profile._$cache = {};
                    profile.adjustSize();
                }
            }
        },
        showColumn:function(colId, flag){
            var profile=this.get(0),
                map=profile.colMap2,
                    cols=profile.colMap,
                    col,
                    sid,
                    cells,
                    nd,
                    n=[];
                if(col=cols[sid=map[colId]]){
                if(profile.beforeColShowHide && false===profile.boxing().beforeColShowHide(profile,colId,flag))
                    return false;
                    nd=profile.getSubNode('HCELL',sid).get(0);
                    if(nd)n.push(nd);
                    nd=profile.getSubNode('HSCELL',sid).get(0);
                    if(nd)n.push(nd);
                    xui.each(col._cells,function(id){
                        n.push(profile.getSubNode('CELL',id).get(0));
                    });
                    xui(n).css('display',(col.hidden=(flag===false?true:false))?'none':'');

                if(profile.afterColShowHide)
                    profile.boxing().afterColShowHide(profile,colId,flag);
                }

                profile.box._adjustColsWidth(profile);
                profile.box._adjustBody(profile,'setcol');
            return true;
        },
        sortColumn:function(colId, desc, sortby){
            var prf=this.get(0), sId=prf.colMap2[colId],col=prf.colMap[sId];
            if(sId && col){
                if(xui.isBool(desc))
                    col._order=!desc;
                if(xui.isFun(sortby))
                    col.sortby=sortby;
                prf.getSubNode("HCELLA",sId).onClick();
            }
            return this;
        },
        /*cell realted*/
        getCell:function(cellId, type){
            var self=this,profile=this.get(0),v,m;
            xui.each(profile.cellMap,function(o){
                if(o.id && o.id===(cellId.id||cellId)){
                    cellId=o._serialId;
                    return false;
                }
            });
            v=profile.cellMap[cellId];
            return !v?null:
                    type=='data'? xui.merge({rowId:v._row.id, colId:v._col.id},xui.clone(v,true)):
                    (type=='min'||type=='value')? v.value:
                    type=='map'?( (m={})&&((m[v._col.id]=v.value)||1)&&m):
                    v;
        },
        getCellbyRowCol:function(rowId, colId, type){
            var self=this,profile=self.get(0),v,m;
            if(xui.isNumb(rowId))rowId=xui.get(profile.properties.rows,[rowId,"id"]);
            if(xui.isNumb(colId))colId=xui.get(profile.properties.header,[colId,"id"]);
            v=xui.get(profile.rowMap,[profile.rowMap2[rowId], '_cells',colId]);
            v=v && profile.cellMap[v];
            if(!v){
                var row=self.getRowbyRowId(rowId),header=self.getHeader('min'),col;
                if(row&&row.cells){
                    col=xui.arr.indexOf(header,colId);
                    if(col!=-1)v=row.cells[col];
                }
            }
            return !v?null:
                type=='data'? xui.merge({rowId:rowId, colId:colId},xui.clone(v,true)):
                (type=='min'||type=='value')? 'value' in v?v.value:v :
                type=='map'?( (m={})&&((m[colId]=v.value)||1)&&m):
                v;
        },
        getCells:function(rowId, colId, type){
            var map={};
            xui.each(this.get(0).cellMap,function(v){
                if((rowId?(rowId==v._row.id):1) && (colId?(colId==v._col.id):1)){
                    map[v.id]= type=='data'?xui.merge({rowId:v._row.id, colId:v._col.id},xui.clone(v,true)):
                               (type=='min'||type=='value') ? ('value' in v)?v.value:v:
                               v;
                }
            });
            //dont return inner value
            return map;
        },
        getCells2:function(rowId, colId, type){
           var o=this.get(0), prop=o.properties, header=prop.header,
                tid = o.box._temprowid,
                row = xui.isSet(rowId)?this.getRowbyRowId(rowId):null,
                col = xui.isSet(colId)?this.getHeaderByColId(colId):null,
                oneRow = row&&row.cells&&xui.isArr(row.cells),
                oneCol = xui.isSet(colId) && col,
                rows=  oneRow ? [row] : xui.isArr(row)&&row[0]&&row[0].cells&&xui.isArr(row[0].cells) ? row: prop.rows,
                l=header.length, h=rows.length,
                columns=[],cell,value,
                index=oneCol?xui.arr.indexOf(header,col):-1,
                data=[];

            if(h){
                if(oneCol){
                    columns.push(col);
                }else{
                    for(var i=0;i<l;i++){
                        columns.push(header[i].id);
                    }
                }

                for(var j=0;j<h;j++){
                    //ignore temp row for all rows
                    if(!oneRow && rows[j].id==tid)continue;
                    if(oneCol){
                        value=null;
                        if(!rows[j].group && rows[j].cells){
                            cell = rows[j].cells[index];
                            value = type=='data'?xui.merge({rowId:cell._row.id, colId:cell._col.id},xui.clone(cell,true)):
                               (type=='min'||type=='value') ? ('value' in cell)?cell.value:cell:
                               cell;
                        }
                        data.push(value);
                    }else{
                        var arr=[];
                        if(!rows[j].group && rows[j].cells){
                            for(var i=0;i<l;i++){
                                cell = rows[j].cells[i];
                                value = type=='data'?xui.merge({rowId:cell._row.id, colId:cell._col.id},xui.clone(cell,true)):
                                   (type=='min'||type=='value') ? ('value' in cell)?cell.value:cell:
                                   cell;
                                arr.push(value);
                            }
                        }
                        data.push(arr);
                    }
                }
            }
            return oneRow?data[0]:data;
        },
        updateCellByRowCol:function(rowId, colId, options, dirtyMark, triggerEvent, triggerFormula){
            var t,self=this,con=self.constructor;
            if(t=con._getCellId(self.get(0), rowId, colId))
                con._updCell(self.get(0), t, options, dirtyMark, triggerEvent, triggerFormula);
            else{
                var row=self.getRowbyRowId(rowId),header=self.getHeader('min'),col;
                if(row&&row.cells){
                    col=xui.arr.indexOf(header,colId);
                    if(col!=-1){
                        if(!xui.isHash(row.cells[col]))row.cells[col]={value:row.cells[col]};
                        xui.merge(row.cells[col],options,'all');
                    }
                }
            }
            return self;
        },
        getCellPos:function(cell, excelType){
            if(!cell || !cell._row || !cell._col)return null;
            var prf=this.get(0),
                col=xui.arr.indexOf(cell._row.cells,cell),
                row=xui.arr.indexOf(prf.properties.rows, cell._row);
            return col==-1||row==-1?null:excelType?xui.ExcelFormula.toCellId(col,row):{row:row,col:col};
        },
        // 2:0 => row:2, col:0
        // A3 => [2,0] > row:2, col:0
        updateCellByRowCol2:function(mixedId, options, dirtyMark, triggerEvent){
            var arr=mixedId.indexOf(":")!=-1?mixedId.split(":"):xui.ExcelFormula.toCoordinate(mixedId,-1,true),
                row=parseInt(arr[0],10),
                col=parseInt(arr[1],10);
            return this.updateCellByRowCol(row,col,options,dirtyMark,triggerEvent);
        },
        updateCell:function(cellId, options, dirtyMark, triggerEvent, triggerFormula){
            var self=this,profile=this.get(0);
            xui.each(profile.cellMap,function(o){
                if(o.id && o.id===cellId){
                    cellId=o._serialId;
                    return false;
                }
            });
            self.constructor._updCell(profile,cellId,options, dirtyMark, triggerEvent, triggerFormula);
            return self;
        },
        editCellbyRowCol:function(rowId, colId){
            var profile=this.get(0),con=profile.box;
            con._editCell(profile, con._getCellId(profile, rowId, colId));
            return this;
        },
        editCell:function(cell/*default is the active cell*/){
            if(cell=cell?cell:this.get(0).getSubId(this.get(0).$activeCell+''))
                this.constructor._editCell(this.get(0), cell);
            return this;
        },
        // only support single line text input
        editFirstCell:function(rowId){
            var profile=this.get(0),
                getPro=function(key){return profile.box.getCellOption(profile, row, key)},
                row = typeof rowId=='string' ? (profile.rowMap[profile.rowMap2[rowId]]) : rowId,
                editor;

            if(!profile.properties.firstCellEditable || !row)return;
            if(getPro(profile, row, 'disabled')||getPro(profile, row, 'readonly'))return;
            if(!(profile && profile.renderId) || profile.destroyed)return;

            var cellNode = profile.getSubNode('FCELLCAPTION',row._serialId);
            if(!cellNode.isEmpty()){
                var pp=cellNode.parent();
                if(profile.beforeIniEditor){
                    editor=profile.boxing().beforeIniEditor(profile, row, cellNode, pp, 'row', row, null);
                    if(editor===false)
                        return;
                }

                var size2 = pp.cssSize(),
                    baseNode = profile.getSubNode('BORDER'),
                    borderW=profile._$cache.hasOwnProperty('_border_b_w') ? profile._$cache._border_b_w : (profile._$cache._border_b_w = baseNode.contentBox()?2:0),
                    absPos = cellNode.offset(null, pp),
                    absPos2 = pp.offset(null, baseNode);
                // too small
                if(absPos2.left > size2.width - 8)return;

                // try to get from cache
                editor = profile.$cache_editor['firstCellEditor'];
                if(!editor || !editor['xui.UI'] || editor.isDestroyed()){
                    editor=new xui.UI.ComboInput({type:"input",zIndex:100});
                    profile.$cache_editor['firstCellEditor'] = editor;
                }
                editor.setWidth(size2.width - absPos.left + borderW)
                    .setHeight(size2.height + borderW)
                    .setValue(row.value||row.value||"");

                if(profile.onBeginEdit)profile.boxing().onBeginEdit(profile,row,editor, 'row',row, null);

                editor.undo=function(){
                    var editor=this, row=editor.get(0) && editor.get(0).$row;
                    // execute once
                    editor.undo=null;
                    pp.removeClass("editing");
                    // row dirty alert
                    if(profile.box){
                        if(row && row._oValue!==row.value && row.id !=profile.box._temprowid && profile.onRowDirtied)
                            profile.boxing().onRowDirtied(profile,row);
                    }
                    if(editor.get(0) && editor.get(0).box){
                        // for ie's setBlurTrigger doesn't trigger onchange event
                        editor.getSubNode('INPUT').onBlur(true);
                        editor.getRoot().setBlurTrigger("tg_editor_blur:"+profile.$xid);

                        if(profile.properties){
                            editor.beforeUnitUpdated(null).afterUIValueSet(null).beforeNextFocus(null).onCancel(null).onFileDlgOpen(null);
                            editor.setValue('',true,'editorreset');
                        }
                        delete editor.get(0).$row;
                        delete editor.get(0)._smartnav;
                        delete editor.get(0).$editMode;
                        //don't use disply:none, firfox has many bugs about Caret or renderer
                        editor.hide();
                    }
                    if(row)delete row._editor;
                    profile.$curEditor=null;
                    if(profile.onEndEdit)
                        profile.boxing().onEndEdit(profile, row, editor, 'row', row, null);

                    // don't cache it
                    if(editor.get(0)){
                        editor.destroy(true);
                    }

                    editor=null;
                };
                editor.afterUIValueSet(function(prf, ov, nv, force, tag){
                    var options={value:nv},t;
                    if(prf.properties.hasOwnProperty("tagVar") && !xui.isEmpty(t=prf.properties.tagVar))
                        options.tagVar=t;
                    if(false!==(profile.beforeEditApply&&profile.boxing().beforeEditApply(profile, row, options, editor, tag, 'row', row, null))){
                        profile.boxing().updateRow(row.id, {value:nv, caption:nv+""});
                        xui.tryF(editor.undo,[],editor);
                    }
                })
                .beforeNextFocus(function(prop, e){
                    xui.tryF(editor.undo,[true],editor);
                    var hash=xui.Event.getEventPara(e);
                    if(hash.key=='enter')hash.$key='right';
                    profile.getSubNode('CELLA', row._serialId).onKeydown(true,hash);
                    //prevent
                    return false;
                })
                .onCancel(function(){
                    xui.tryF(editor.undo,[],editor);
                })

                baseNode.append(editor);

                //show editor
                editor.reBoxing().show((absPos.left + absPos2.left -1 )+'px',(absPos2.top - 1)+'px');
                pp.addClass("editing");

                var root=editor.getRoot();
                // For scroll to undo
                root.setBlurTrigger("tg_editor_blur:"+profile.$xid,function(){
                    xui.tryF(editor.undo,[],editor);
                    return false;
                });

                //give reference
                editor.get(0).$row = row;
                editor.get(0)._smartnav = true;
                row._editor=editor;
                profile.$curEditor=editor;

                editor.activate();
            }

            return this;
        },
        focusCellbyRowCol:function(rowId, colId){
            var profile=this.get(0),con=profile.box,
                cellId=con._getCellId(profile, rowId, colId),
                node=profile.getSubNode('CELLA', cellId);
            if(node && node.get(0))node.focus(true);
            return this;
        },
        focusCell:function(cell){
            var cellId=cell._serialId;
            this.get(0).getSubNode('CELLA', cellId).focus(true);
            return this;
        },
        getActiveCell:function(type){
            var ar,profile=this.get(0),m,v;
            if(profile.properties.activeMode!='cell')return;
            if(!(ar=profile.$activeCell))return;
            v=profile.cellMap[profile.getSubId(ar)];
            return !v?null:
                    type=='data'? xui.merge({rowId:v._row.id, colId:v._col.id},xui.clone(v,true)):
                    (type=='min'||type=='value')? 'value' in v?v.value:v :
                    type=='map'?( (m={})&&((m[v._col.id]=v.value)||1)&&m):
                    v;
        },
        setActiveCell:function(rowId, colId){
            var dr, cell, profile=this.get(0);
            if(profile.properties.activeMode!='cell')return;
            // deative first
            profile.box._activeCell(profile, false);

            if(typeof rowId=='object')
                cell=rowId;
            else
                cell=this.getCellbyRowCol(rowId, colId);

            if(!cell)
                return;

            if(!(dr=profile.getSubNode('CELLA',cell._serialId)).isEmpty())
                profile.box._activeCell(profile, dr.get(0).id);
            return this;
        },

        /*others*/
        getDirtied:function(rowId, colId){
            var map={};
            xui.each(this.get(0).cellMap,function(v){
                if((v._oValue!==v.value||(('unit' in v)&&v._oUnit!==v.unit)) &&(rowId?(rowId==v._row.id):1) && (colId?(colId==v._col.id):1)){
                    map[v.id]={rowId:v._row.id, colId:v._col.id, value:v.value, _oValue:v._oValue};
                    if('unit' in v)map[v.id]._oUnit=v._oUnit;
                }
            });
            //dont return inner value
            return map;
        },
        getSubNodeInGrid:function(key, rowId, colId){
            var ns=this,
                t=  (xui.isSet(rowId) && xui.isSet(colId)) ? ns.getCellbyRowCol(rowId, colId) :
                    colId ? ns.getHeaderByColId(colId):
                    rowId ? ns.getRowbyRowId(rowId):null;
            return ns.getSubNode(key, (t&&t._serialId)||true);
        },
        getInlineEditors:function(rowId, colId){
            var map={};
            xui.each(this.getCells(rowId, colId), function(cell, id){
                map[id]=cell._editor;
            });
            return map;
        },
        getEditor:function(){
            return xui.get(this.get(0),["$curEditor"]);
        },
        updateEditor:function(value, caption, prop){
            var editor = this.getEditor();
            if(editor){
                if(xui.isHash(prop))editor.setProperties(prop, true);
                if(xui.isDefined(caption))editor.setCaption(caption, true);
                // last one
                if(xui.isDefined(value))editor.setUIValue(value, true);
            }
            return this;
        },
        getEditCell:function(){
            return xui.get(this.get(0),["$cellInEditor"]);
        },
        offEditor:function(refresh, ignoreInline){
            var profile=this.get(0),editor;
            if(!profile)return;
            if(editor = profile.$curEditor){
                xui.tryF(editor.undo,[],editor);
            }
            if(!ignoreInline)
                xui.each(profile.cellMap,function(cell){
                    if(editor = cell._editor){
                        editor.destroy();
                        delete cell._editor;
                    }
                });

            if(refresh){
                var getPro=profile.box.getCellOption;
                xui.each(profile.cellMap,function(o){
                       if(getPro(profile, o, "editable") &&
                           (getPro(profile, o, "editMode")=="inline" || getPro(profile, o, "type")=='dropbutton' ))
                            profile.box._editCell(profile,o,null,true);
                });
            }
        },
        adjustEditor:function(adjustFun){
            var ns=this,prf=this.get(0),cb=profile._$cache.hasOwnProperty('_root_cb') ? profile._$cache._root_cb : (profile._$cache._root_cb = profile.getRoot().contentBox()?1:0);
            if(prf && prf.$curEditor){
                var editor=prf.$curEditor,
                    cell=prf.$cellInEditor;
                if(typeof adjustFun=='function'){
                    adjustFun.apply(ns,[editor, cell]);
                }else if(editor.KEY=="xui.UI.ComboInput"){
                    var cellNode = prf.getSubNode('CELL', cell.id),
                        absPos=cellNode.offset(null, prf.getSubNode('SCROLL22')),
                        size = cellNode.cssSize();
                    editor.setLeft(absPos.left-(cb?1:0)).setTop(absPos.top-(cb?1:0))
                    .setWidth(size.width+(cb?1:0)+1).setHeight(size.height+(cb?1:0))
                    .reLayout(true);
                }
            }
            return ns;
        }
    },
    Before:function(key, parent_key, o){
        if(key=='xui.UI.TreeGrid'){
            this.Behaviors.CELLS1=this.Behaviors.CELLS2;
            this.Behaviors.GCELLA=this.Behaviors.CELLA;
        }
        return arguments.callee.upper.apply(this,arguments);
    },
    Initialize:function(){
        this.addTemplateKeys(['ALT','PROGRESS']);
        this.getCellPro = this.getCellOption;

        var p=this.prototype;

        p.getColumn=p.getHeader;
        p.updateColumn=p.updateHeader;

        p.getColByDom=p.getHeaderByDom;
        p.getColByColId=p.getHeaderByColId;
        p.getColByCell=p.getHeaderByCell;
    },
    Static:{
        HasHtmlTableNode:1,
        DIRYMARKICON:"DIRTYMARK",
        Templates:{
            tagName : 'div',
            style:'{_style}',
            className:'{_className}',
            BORDER:{
                tagName : 'div',
                BOX:{
                    tagName:'table',
                    cellspacing:'0',
                    cellpadding:'0',
                    className:'xui-uibase',
                    TBODY:{
                        tagName:'tbody',
                        TRHEADER:{
                            tagName:'tr',
                            className:'xuitgtr',
                            TDHEADER1:{
                                tagName:'td',
                                className:'xuitgtd',
                                HEADER1:{
                                    tagName:'div',
                                    className:'xuitgtd', //'{_columnfreezed}',
                                    style:"{showHeader}",
                                    HI1:{
                                        tagName:'div',
                                        HCELLS1:{
                                            tagName:'div',
                                            style:'{headerHeight}',
                                            /*the first col (row handler) in table header*/
                                            FHCELL:{
                                                $order:0,
                                                style:'{rowHandlerDisplay};{_row0DfW};height:{_hcellheight};',
                                                className:'xui-uiborder-noradius xui-uibar xui-uiborder-outset {cellCls}',
                                                tabindex: '{_tabindex}',
                                                HCELLA:{
                                                    //for IE78
                                                    style:'{firstCellStyle};',
                                                    className:'xui-v-wrapper xui-showfocus {firstCellClass}',
                                                    HHANDLER:{
                                                        $order:1,
                                                        tagName:'div',
                                                        style:'{colDDDisplay}'
                                                    },
                                                    FHANDLER:{
                                                        $order:2,
                                                        tagName:'div',
                                                        style:'{rowDDDisplay}'
                                                    },
                                                    HFMARK:{
                                                        $order:3,
                                                        className:"xuifont",
                                                        $fonticon:"xui-uicmd-check",
                                                        style:'{_rowMarkDisplay}'
                                                    },
                                                    LTAGCMDS:{
                                                        $order:4,
                                                        tagName:'span',
                                                        className:'xui-ltag-cmds',
                                                        style:'{_ltagDisplay}',
                                                        text:"{ltagCmds}"
                                                    },
                                                    GRIDCAPTION:{
                                                        $order:5,
                                                        text:'{gridHandlerCaption}'
                                                    },
                                                    SORT:{
                                                        $order:6,
                                                        className:'xuifont',
                                                        $fonticon:'xui-icon-sort',
                                                        style:'{sortDisplay}'
                                                    }
                                                }
                                            },
                                            OTHERHCELLS:{
                                                $order:1,
                                                tagName:'text',
                                                text:'{header1}'
                                            }
                                        },
                                        GRPCELLBOX1:{
                                            tagName:'div',
                                            style:'{headerHeight};',
                                            GRPCELLS:{
                                                $order: 3,
                                                tagName:'text',
                                                text:'{grpCols1}'
                                            }
                                        }
                                    }
                                }
                            },
                            TDHEADER2:{
                                tagName:'td',
                                className:'xuitgtd',
                                HEADER2:{
                                    $order:0,
                                    tagName:'div',
                                    style:"{showHeader}",
                                    //for scroll performance
                                    HI2:{
                                        tagName:'div',
                                        HCELLS2:{
                                            tagName:'div',
                                            style:'{headerHeight};',
                                            OTHERHCELLS:{
                                                $order:1,
                                                tagName:'text',
                                                text:'{header2}'
                                            },
                                            LHCELL:{
                                                $order: 2,
                                                style:"height:{_hcellheight};",
                                                className:'xui-v-wrapper',
                                                LHCELLINNER:{
                                                    $order:1,
                                                    text:'{headerTail}'
                                                },
                                                RTAGCMDS:{
                                                    $order:2,
                                                    tagName:'span',
                                                    className:'xui-rtag-cmds',
                                                    style:'{_rtagDisplay}',
                                                    text:"{rtagCmds}"
                                                }
                                            },
                                            FORSCROLLBAR:{
                                                $order:3,
                                                tagName:'span'
                                            }
                                        },
                                        GRPCELLBOX2:{
                                            tagName:'div',
                                            style:'{headerHeight};',
                                            GRPCELLS:{
                                                $order: 3,
                                                tagName:'text',
                                                text:'{grpCols2}'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        TRLOCKED1:{
                            tagName:'tr',
                            className:'xuitgtr',
                            TDBODY11:{
                                tagName:'td',
                                className:'xuitgtd',
                                SCROLL11:{
                                    $order:1,
                                    tagName:'div',
                                    className:'',
                                    BODY11:{
                                        tagName:'div',
                                        ROWS11:{
                                            $order:1,
                                            tagName:'div',
                                            text:'{rows11}'
                                        }
                                    }
                                }
                            },
                            TDBODY12:{
                                tagName:'td',
                                className:'xuitgtd',
                                SCROLL12:{
                                    $order:1,
                                    tagName:'div',
                                    className:'{_rowfreezed}',
                                    BODY12:{
                                        tagName:'div',
                                        ROWS12:{
                                            $order:1,
                                            tagName:'div',
                                            text:'{rows12}'
                                        }
                                    }
                                }
                            }
                        },
                        TRBODY:{
                            tagName:'tr',
                            className:'xuitgtr',
                            TDBODY21:{
                                tagName:'td',
                                className:'xuitgtd',
                                SCROLL21:{
                                    $order:1,
                                    tagName:'div',
                                    className:'{_columnfreezed}',
                                    BODY21:{
                                        tagName:'div',
                                        ROWS21:{
                                            $order:1,
                                            tagName:'div',
                                            text:'{rows21}'
                                        }
                                    }
                                }
                            },
                            TDBODY22:{
                                tagName:'td',
                                className:'xuitgtd',
                                SCROLL22:{
                                    $order:1,
                                    tagName:'div',
                                    BODY22:{
                                        tagName:'div',
                                        ROWS22:{
                                            $order:1,
                                            tagName:'div',
                                            text:'{rows22}'
                                        }
                                    }
                                }
                            }
                        },
                        TRTAIL:{
                            tagName:'tr',
                            className:'xuitgtr',
                            TDTAIL1:{
                                tagName:'td',
                                className:'xuitgtd'
                            },
                            TDTAIL2:{
                                tagName:'td',
                                className:'xuitgtd'
                            }
                        }
                    }
                },
                COLLIST:{
                    tagName:'div',
                    COLLISTDROP:{
                        className:'xuifont xui-special-icon',
                        $fonticon:'xui-icon-triangle-down'
                    }
                },
                ARROW:{
                    className:'xuifont xui-special-icon',
                    $fonticon:'xui-icon-bigup',
                    text:'&nbsp;'
                }
            },
            DIRTYMARK:{
              className:"xui-display-none"
            },
            $submap : {
                /*the other header in table header*/
                header1:function(profile,template,v,tag,result,index){
                    if(index > profile.properties.freezedColumn)return;
                    profile.colMap[v._serialId]._region=1;
                    tag="header";
                    xui.UI.$doTemplate(profile,template,v,tag, result);
                    return tag;
                },
                header2:function(profile,template,v,tag,result,index){
                    if(index > profile.properties.freezedColumn){
                        profile.colMap[v._serialId]._region=2;
                        tag="header";
                        xui.UI.$doTemplate(profile,template,v,tag, result);
                        return tag;
                    }
                },
                header:{
                    HCELL:{
                        style:"width:{_cellWidth};height:{_hcellheight};{colDisplay};",
                        className:'xui-uiborder-noradius xui-uibar xui-uiborder-outset {cellCls}',
                        HCELLA:{
                            className:'xui-v-wrapper xui-showfocus {headerClass}',
                            style:"{headerStyle};{colStyle}",
                            tabindex: '{_tabindex}',
                            HCELLCAPTION:{
                                $order:5,
                                className:'xui-v-node',
                                text:"{caption}"
                            },
                            SORT:{
                                className:'xuifont',
                                $fonticon:'xui-icon-sort',
                                style:'{sortDisplay}'
                            },
                            HHANDLER : {
                                $order:2,
                                tagName:'div',
                                style:'{colDDDisplay}'
                            }
                        }
                    }
                },
                grpCols1:function(profile,template,v,tag,result,index){
                    var index=profile.properties.freezedColumn - 1,
                        map=profile.colMap;
                    if(v.from > index)return;
                    if(v['to'] > index){
                        map[v._serialId]._region=2;
                        map[v._serialId]._shadow=1;
                        tag="grpColsShadow";
                        xui.UI.$doTemplate(profile,template,v,tag, result);
                    }else{
                        map[v._serialId]._region=1;
                        tag="grpCols";
                        xui.UI.$doTemplate(profile,template,v,tag, result);
                    }
                    return tag;
                },
                grpCols2:function(profile,template,v,tag,result,index){
                    var index=profile.properties.freezedColumn - 1;
                    if(v['to'] > index){
                        profile.colMap[v._serialId]._region=2;
                        tag="grpCols";
                        xui.UI.$doTemplate(profile,template,v,tag, result);
                        return tag;
                    }
                },
                grpColsShadow:{
                    HSCELL:{
                        style:"position:absolute;width:{_cellWidth};height:{_hcellheight};top:{_hcelltop};left:{_hcellleft};",
                        className:'xui-uiborder-noradius xui-uibar xui-uiborder-outset {cellCls}',
                        HSCELLA:{
                            className:'xui-v-wrapper xui-showfocus {headerClass}',
                            style:"{headerStyle};{colStyle}",
                            tabindex: '{_tabindex}',
                            HSCELLCAPTION:{
                                className:"xui-v-node",
                                text:"{caption}"
                            }
                        }
                    }
                },
                grpCols:{
                    HCELL:{
                        style:"position:absolute;width:{_cellWidth};height:{_hcellheight};top:{_hcelltop};left:{_hcellleft};",
                        className:'xui-uiborder-noradius xui-uibar xui-uiborder-outset {cellCls}',
                        HCELLA:{
                            className:'xui-v-wrapper xui-showfocus {headerClass}',
                            style:"{headerStyle};{colStyle}",
                            tabindex: '{_tabindex}',
                            HCELLCAPTION:{
                                $order:5,
                                className:"xui-v-node",
                                text:"{caption}"
                            },
                            HHANDLER : {
                                $order:2,
                                tagName:'div',
                                style:'{colDDDisplay}'
                            }
                        }
                    }
                },
                rows11:function(profile,template,v,tag,result,index){
                    if(profile._passFreezedRow)return false;
                    if(index > profile.properties.freezedRow)return false;
                    profile.rowMap[v._serialId]._region=1;
                    // keep realtag for real data
                    xui.UI.$doTemplate(profile,template,v, "row1", result, index,'rows1');
                },
                rows12:function(profile,template,v,tag,result,index){
                    if(profile._passFreezedRow)return false;
                    if(index > profile.properties.freezedRow)return false;
                    profile.rowMap[v._serialId]._region=1;
                    // keep realtag for real data
                    xui.UI.$doTemplate(profile,template,v, "row2", result, index,'rows2');
                },
                rows21:function(profile,template,v,tag,result,index){
                    if(!profile._passFreezedRow && index <= profile.properties.freezedRow)return;
                    profile.rowMap[v._serialId]._region=2;
                    // keep realtag for real data
                    xui.UI.$doTemplate(profile,template,v, "row1", result, index,'rows1');
                },
                rows22:function(profile,template,v,tag,result,index){
                    if(!profile._passFreezedRow && index <= profile.properties.freezedRow)return;
                    // *** dont calculate freeeze rows again
                    profile._passFreezedRow=1;
                    profile.rowMap[v._serialId]._region=2;
                    // keep realtag for real data
                    xui.UI.$doTemplate(profile,template,v, "row2", result, index,'rows2');
                },
                row1:{
                    ROW1:{
                        tagName:'div',
                        style:'{rowDisplay}',
                        CELLS1:{
                            $order:2,
                            tagName:'div',
                            className:'xui-uirowbg xui-uiborder-b xui-uiborder-light {rowCls} {rowClass}',
                            style:'{_rowHeight};{rowStyle}',
                            CELLHANDLER:{
                                tagName:'text',
                                text:'{_handler_cell}'
                            },
                            GRPCELL2:{
                                tagName:'text',
                                text:'{_firstcell_grp}'
                            },
                            OTHERCELLS:{
                                tagName:'text',
                                $order: 2,
                                text:'{cells}'
                            }
                        },
                        SUB1:{
                            $order:3,
                            tagName:'div'
                        }
                    }
                },
                row2:{
                    ROW2:{
                        tagName:'div',
                        style:'{rowDisplay}',
                        CELLS2:{
                            $order:2,
                            tagName:'div',
                            className:'xui-uirowbg xui-uiborder-b xui-uiborder-light {rowCls} {rowClass}',
                            style:'{_rowHeight};{rowStyle}',
                            GRPCELL2:{
                                tagName:'text',
                                text:'{_firstcell_grp}'
                            },
                            OTHERCELLS:{
                                tagName:'text',
                                $order: 2,
                                text:'{cells}'
                            },
                            LCELL:{
                                $order: 3,
                                className:'xui-v-wrapper',
                                LCELLINNER:{
                                    $order:1,
                                    text:'{rowTail}'
                                },
                                RTAGCMDS:{
                                    $order:2,
                                    tagName:'span',
                                    className:'xui-rtag-cmds',
                                    style:'{_rtagDisplay}',
                                    text:"{rtagCmds}"
                                }
                            }
                        },
                        SUB2:{
                            $order:3,
                            tagName:'div'
                        }
                    }
                },
                'rows1._handler_cell':function(profile,template,v,tag,result,index){
                    xui.UI.$doTemplate(profile,template,v, profile.properties.treeMode=="infirstcell" ?"rows1._handler_cell2" : "rows1._handler_cell1", result);
                },
                'rows1._handler_cell1':{
                    FCELL:{
                        $order:0,
                        style:'{rowHandlerDisplay};{_row0DfW};',
                        className:'xui-uiborder-r xui-uiborder-light {cellCls}',
                        CELLA:{
                            tabindex: '{_tabindex}',
                            style:'{cellStyle}{firstCellStyle}',
                            className:'xui-v-wrapper xui-showfocus {cellClass}{firstCellClass}',
                            FHANDLER:{
                                $order:0,
                                tagName:'div',
                                style:'{rowDDDisplay}'
                            },
                            ROWLRULER:{
                                $order:1,
                                style:'{_treeMode};{_rulerW}'
                            },
                            MARK:{
                                $order:2,
                                className:'xuifont',
                                $fonticon:'xui-uicmd-check',
                                style:'{_rowMarkDisplay}'
                            },
                            LTAGCMDS:{
                                $order:3,
                                tagName:'span',
                                className:'xui-ltag-cmds',
                                style:'{_ltagDisplay}',
                                text:"{ltagCmds}"
                            },
                            ROWNUM:{
                                $order:4,
                                className:'xui-ui-readonly',
                                style:'{_rowNumbDisplay}'
                            },
                            ROWTOGGLE:{
                                $order:5,
                                style:'{_treeMode};',
                                className:'xuifont',
                                $fonticon:'{_fi_togglemark}'
                            },
                            FCELLCAPTION:{
                                $order:6,
                                className:"xui-v-node",
                                text:"{caption}"
                            }
                        }
                    }
                },
                'rows1._handler_cell2':{
                    FCELL:{
                        $order:0,
                        style:'{rowHandlerDisplay};{_row0DfW};',
                        className:'xui-uiborder-r xui-uiborder-light {cellCls}',
                        CELLA:{
                            tabindex: '{_tabindex}',
                            style:'{cellStyle}{firstCellStyle}',
                            className:'xui-v-wrapper xui-showfocus {cellClass}{firstCellClass}',
                            FHANDLER:{
                                $order:6,
                                tagName:'div',
                                style:'{rowDDDisplay}'
                            }
                        }
                    }
                },
                'rows1._firstcell_grp':function(profile,template,v,tag,result,index){
                    if(profile.properties.treeMode!="infirstcell")return;
                    if(!profile.properties.freezedColumn)return;
                    xui.UI.$doTemplate(profile,template,v,  "rows._firstcell_grp", result);
                },
                'rows2._firstcell_grp':function(profile,template,v,tag,result,index){
                    if(profile.properties.treeMode!="infirstcell")return;
                    if(profile.properties.freezedColumn)return;
                    xui.UI.$doTemplate(profile,template,v,  "rows._firstcell_grp", result);
                },
                'rows._firstcell_grp':{
                    GCELL:{
                        $order:0,
                        className:'{cellCls}',
                        GCELLA:{
                            tabindex: '{_tabindex}',
                            style:'{cellStyle}{firstCellStyle}',
                            className:'xui-v-wrapper xui-showfocus {cellClass}{firstCellClass}',
                            ROWLRULER:{
                                $order:1,
                                $customId:1,
                                style:'{_treeMode};{_rulerW}'
                            },
                            MARK:{
                                $order:2,
                                $customId:1,
                                className:'xuifont',
                                $fonticon:'xui-uicmd-check',
                                style:'{_rowMarkDisplay}'
                            },
                            LTAGCMDS:{
                                $order:3,
                                $customId:1,
                                tagName:'span',
                                style:'{_ltagDisplay}',
                                text:"{ltagCmds}"
                            },
                            ROWNUM:{
                                $order:4,
                                $customId:1,
                                className:'xui-ui-readonly',
                                style:'{_rowNumbDisplay}'
                            },
                            ROWTOGGLE:{
                                $order:5,
                                $customId:1,
                                style:'{_treeMode};',
                                className:'xuifont',
                                $fonticon:'{_fi_togglemark}'
                            },
                            FCELLCAPTION:{
                                $order:6,
                                $customId:1,
                                className:"xui-v-node",
                                text:"{caption}"
                            }
                        }
                    }
                },
                'rows1.cells':function(profile,template,v,tag,result,index){
                    if(index > profile.properties.freezedColumn)return;
                    tag = 'rows.cells';

                    var t = profile.box._tplMap2[v.type] || '.input';
                    if(profile.properties.treeMode=='infirstcell' && index==1 && t=='.input'){
                        t='._first_cell';
                    }
                    xui.UI.$doTemplate(profile,template,v,tag + t, result);

                    return tag;
                },
                'rows2.cells':function(profile,template,v,tag,result,index){
                    if(index <= profile.properties.freezedColumn)return;
                    tag = 'rows.cells';

                    var t = profile.box._tplMap2[v.type] || '.input';
                    if(profile.properties.treeMode=='infirstcell' && index==1 && t=='.input'){
                        t='._first_cell';
                    }
                    xui.UI.$doTemplate(profile,template,v,tag + t, result);

                    return tag;
                },
                'rows.cells._first_cell':{
                    CELL:{
                        style:'width:{_cellWidth};{cellDisplay};',
                        className:'xui-uiborder-r xui-uiborder-light xui-treegrid-fcell {cellCls}',
                        CELLA:{
                            className:'xui-v-wrapper xui-showfocus {cellClass}',
                            style:'{bgcolor};{cellStyle}',
                            tabindex: '{_tabindex}',
                            ROWLRULER:{
                                $order:1,
                                $customId:1,
                                style:'{_treeMode};{_rulerW}'
                            },
                            MARK:{
                                $order:2,
                                $customId:1,
                                className:'xuifont',
                                $fonticon:'xui-uicmd-check',
                                style:'{_rowMarkDisplay}'
                            },
                            LTAGCMDS:{
                                $order:3,
                                $customId:1,
                                tagName:'span',
                                style:'{_ltagDisplay}',
                                text:"{ltagCmds}"
                            },
                            ROWNUM:{
                                $order:4,
                                $customId:1,
                                 className:'xui-ui-readonly',
                                style:'{_rowNumbDisplay}'
                            },
                            ROWTOGGLE:{
                                $order:5,
                                $customId:1,
                                style:'{_treeMode};',
                                className:'xuifont',
                                $fonticon:'{_fi_togglemark}'
                            },
                            CELLCAPTION:{
                                $order:6,
                                style:'{color}',
                                className:'xui-v-node xui-treegrid-fcellcaption',
                                text:"{_caption}"
                            }
                        }
                    }
                },
                'rows.cells.input':{
                    CELL:{
                        style:'width:{_cellWidth};{cellDisplay};',
                        className:'xui-uiborder-r xui-uiborder-light {cellCls}',
                        CELLA:{
                            className:'xui-v-wrapper xui-showfocus {cellClass}',
                            style:'{bgcolor};{cellStyle}',
                            tabindex: '{_tabindex}',
                            CELLCAPTION:{
                                className:'xui-v-node',
                                style:'{color}',
                                text:"{_caption}"
                            }
                        }
                    }
                },
                'rows.cells.textarea':{
                    CELL:{
                        style:'width:{_cellWidth};{cellDisplay};',
                        className:'xui-uiborder-r xui-uiborder-light {cellCls}',
                        CELLA:{
                            className:'xui-v-wrapper xui-showfocus xui-cls-wordwrap {cellClass}',
                            style:'{bgcolor};{cellStyle}',
                            tabindex: '{_tabindex}',
                            CELLCAPTION:{
                                className:'xui-v-node',
                                style:'{color}',
                                text:"{_caption}"
                            }
                        }
                    }
                },
                'rows.cells.button':{
                    CELL:{
                        style:'width:{_cellWidth};{cellDisplay};',
                        className:'xui-uiborder-r xui-uiborder-light {cellCls}',
                        CELLA:{
                            tagName:'button',
                            className:'xui-node xui-showfocus xui-wrapper xui-ui-btn xui-uibar xui-uigradient xui-uiborder-radius xui-treegrid-tgbtn {cellClass}',
                            style:'{cellStyle}',
                            tabindex: '{_tabindex}',
                            CELLCAPTION:{
                                className:'xui-v-node',
                                text:"{_caption}"
                            }
                        }
                    }
                },
                'rows.cells.checkbox':{
                    CELL:{
                        style:'width:{_cellWidth};{cellDisplay}',
                        className:'xui-uiborder-r xui-uiborder-light {cellCls}',
                        CELLA:{
                            className:'xui-v-wrapper xui-showfocus {cellClass}',
                            style:'{cellStyle}',
                            tabindex: '{_tabindex}',
                            CHECKBOX:{
                                className:'xuifont xui-uicmd-check',
                                $fonticon:'{_fi_checkboxCls}'
                            },
                            CELLCAPTION:{
                                className:'xui-v-node',
                                text:"{_caption}"
                            }
                        }
                    }
                },
                'rows.cells.progress':{
                    CELL:{
                        style:'width:{_cellWidth};{cellDisplay}',
                        className:'xui-uiborder-r xui-uiborder-light {cellCls}',
                        CELLA:{
                            className:'xui-showfocus {cellClass}',
                            style:'{cellStyle}',
                            tabindex: '{_tabindex}',
                            PROGRESS:{
                                $order:2,
                                tagName:'div',
                                className:'xui-v-wrapper xui-uibar',
                                style:'width:{progress};',
                                CELLCAPTION:{
                                    className:'xui-v-node',
                                    text:"{_caption}"
                                }
                            }
                        }
                    }
                },
                'rows1._handler_cell1.ltagCmds':function(profile,template,v,tag,result){
                    if(v.id==profile.box._temprowid)return;
                    xui.UI.$doTemplate(profile,template,v,'rows.tagCmds'+(profile.box._tplMap[v.type]||'.button'),result)
                },
                'rows._firstcell_grp.ltagCmds':function(profile,template,v,tag,result){
                    xui.UI.$doTemplate(profile,template,v,'rows.tagCmds'+(profile.box._tplMap[v.type]||'.button'),result)
                },
                'rows.cells._first_cell.ltagCmds':function(profile,template,v,tag,result){
                    xui.UI.$doTemplate(profile,template,v,'rows.tagCmds'+(profile.box._tplMap[v.type]||'.button'),result)
                },
                'rows2.rtagCmds':function(profile,template,v,tag,result){
                    xui.UI.$doTemplate(profile,template,v,'rows.tagCmds'+(profile.box._tplMap[v.type]||'.button'),result)
                },
                'ltagCmds':function(profile,template,v,tag,result){
                    xui.UI.$doTemplate(profile,template,v,"rows.tagCmds"+(profile.box._tplMap[v.type]||'.button'),result)
                },
                'rtagCmds':function(profile,template,v,tag,result){
                    xui.UI.$doTemplate(profile,template,v,"rows.tagCmds"+(profile.box._tplMap[v.type]||'.button'),result)
                },
                'rows.tagCmds.text':xui.UI.$getTagCmdsTpl('text'),
                'rows.tagCmds.button':xui.UI.$getTagCmdsTpl('button'),
                'rows.tagCmds.image':xui.UI.$getTagCmdsTpl('image')
            }
        },
        Appearances:{
            KEY:{
                //in firefox, a can focused with display:block
                display:'block',
                position:'absolute',
                overflow:'hidden'
            },
            FORSCROLLBAR:{
                // for scroll position reight, + scroll bar width
                width:'10em'
            },
            'KEY .xuitgtd, KEY .xuitgth, KEY .xuitgtr':{
                border:'0!important',
                padding:'0!important',
                margin:'0!important',
                height:'auto!important',
                width:'auto!important'
            },
            'LTAGCMDS, RTAGCMDS':{
                padding:0,
                margin:0,
                'vertical-align': 'middle'
            },
            'HFMARK, MARK':{
                'margin-right':'.5em'
            },
            DIRTYMARK:{
                position:'absolute',
                width:"1em",
                height:"1em",
                left: "1px",
                top: "1px",
                "z-index":10
            },
            BOX:{
                'border-collapse':'collapse',
                 height: '100%',
                 width: '100%'
            },
            'HEADER1, HEADER2':{
                'background-color':'#EDEDED',
                position:'relative',
                overflow:'hidden',
                'text-align':'left'
            },
            'HI1, HI2':{
                position:'relative'
            },
            'GRPCELLBOX1, GRPCELLBOX2':{
                position:'absolute',
                overflow:'visible',
                left:0,
                top:0,
                width:0,
                height:0
            },
            'SCROLL11, SCROLL12, SCROLL21, SCROLL22':{
                position:'relative',
                'text-align':'left'
            },
            'SCROLL11, SCROLL12, SCROLL21':{
                overflow:'hidden'
            },
            SCROLL22:{
                overflow:'auto'
            },
            ARROW:{
                position:'absolute',
                'z-index':'20',
                left:0,
                top:0,
                display:'none',
                width:'auto',
                height:'auto',
                'font-weight': 'bold',
                'text-align': 'center',
                'font-size': '2em'
            },
            'ARROW:before':{
                'margin-left':'-50%'
            },
            COLLIST:{
                position:'absolute',
                'z-index':'10',
                left:0,
                top:0,
                cursor:'pointer',
                visibility:'hidden'
            },
            COLLISTDROP:{
                position:'absolute',
                left:0,
                bottom:0,
                cursor:'pointer'
            },
            'BODY11, BODY12, BODY21, BODY22':{
                overflow:'visible',
                position:'absolute',
                left:0,
                top:0
            },
            SORT:{
                position:'absolute',
                right:'.25em',
                bottom:'.25em'
            },
            HHANDLER:{
                position:'absolute',
                //if set z-index, disappearing in opera
                //'z-index':'10',
                background: xui.browser.ie?'url('+xui.ini.img_bg+')':null,
                width:'.5em',
                top:'0',
                right:'0',
                height:'100%',
                cursor:'e-resize'
            },
            'HCELLS1, HCELLS2, CELLS1, CELLS2':{
                //for ie height change trigger
                'overflow-y': xui.browser.ie ?'hidden':'',
                position:'relative',
                background:'transparent',
                'white-space': 'nowrap'
            },
            'HCELLS1, HCELLS2, GRPCELLBOX1, GRPCELLBOX2':{
                overflow:'visible'
            },
            'CELLS1, CELLS2':{
                overflow:'visible'
            },
            'CELLS1-group FCELL, CELLS2-group FCELL':{
                'border-right':0,
                'padding-right':'1px',
                overflow:'visible'
            },
            'CELLS1-group FCELLCAPTION, CELLS2-group FCELLCAPTION':{
                'font-weight':'bold',
            },
            'CELLS1-group FCELLCAPTION, CELLS1-group CELLA,  CELLS1-group GCELLA, CELLS1-group ROWNUM, CELLS2-group FCELLCAPTION, CELLS2-group CELLA, CELLS2-group GCELLA':{
                overflow:'visible'
            },
            'CELLS1-active, CELLS2-active, CELLA-active':{
                 $order:5,
                 'background-color':'#DDDDDD'
            },
            "CELLS1-hot, CELLS2-hot":{
                $order:6,
                'background-color':'#FFE97F'
            },
            // hot always use CELLS2
            "CELLS2-hot LTAGCMDS, CELLS2-hot RTAGCMDS":{
                $order:6,
                'display':'none'
            },
            'CELLS1-checked, CELLS2-checked, CELLS1-checked .xui-node, CELLS2-checked .xui-node, CELLA-checked, CELLA-checked .xui-node':{
                 $order:6,
                'background-color':'#ABABAB',
                color:'#fff'
            },
            "FCELL CELLA, GCELL GCELLA":{
                'text-align': 'left'
            },
            "FHCELL HCELLA, HSCELLA":{
                'text-align': 'center'
            },
            'CELLCAPTION,HCELLCAPTION,HSCELLCAPTION,SORT,HHANDLER':{
                'vertical-align':'middle'
            },
            'CELLCAPTION,HCELLCAPTION,HSCELLCAPTION,FCELLCAPTION,GRIDCAPTION':{
                "max-width": "100%",
                "text-overflow": "ellipsis",
                "white-space": "nowrap",
                "overflow": "hidden",
                'font-size':'1em'
            },
            // for "text-overflow": "ellipsis",
            'FCELL FCELLCAPTION, FHCELL GRIDCAPTION':{
                display:"inline"
            },
            'CELL-textarea CELLCAPTION':{
                $order:10,
                 "white-space": "normal"
            },
            FHANDLER:{
                position:'absolute',
                'height':'.5em',
                left:'0',
                width:'100%',
                bottom:'0',
                cursor:'n-resize',
                'z-index':10
            },
            'FCELLCAPTION, ROWNUM':{
                'vertical-align':'middle',
                overflow:'hidden'
            },
            'GCELL, FHCELL, FCELL, HCELL, HSCELL, CELL, LCELL':{
              "content-visibility":"auto"
            },
            'FHCELL, HCELL, HSCELL':{
               padding:0,
               'vertical-align':'bottom'
            },
            'ROW1, ROW2':{
                position:'relative',
                zoom:xui.browser.ie?1:null,
                width:xui.browser.ie?'100%':null
            },
            ROWNUM:{
                'padding-right':'.5em'
            },
            'FCELL, CELL':{
                height:'100%',
                //firefox:height:100% without overflow:hidden
                'padding-left':'1px',
                position:'relative',
                overflow:xui.browser.ie6?'hidden':'',
                'vertical-align':'top',
                display:xui.$inlineBlock
            },
            'GCELL':{
                height:'100%',
                width:'100%',
                //firefox:height:100% without overflow:hidden
                'padding-left':'1px',
                position:'relative',
                overflow:xui.browser.ie6?'hidden':'',
                'vertical-align':'top',
                display:xui.$inlineBlock
            },
            "LHCELL":{
                height: '100%',
                position: 'relative',
                'vertical-align': 'top',
                display: 'inline-block'
            },
            "LCELL":{
                height: '100%',
                'padding-left': '1px',
                position: 'relative',
                'vertical-align': 'top',
                display: 'inline-block'
            },
            'CELLS1-alt, CELLS2-alt':{
                $order:1,
                'background-color':'#EFF8FF'
            },
            //
            'CELL-input':{
            },
            'CELL-number, CELL-spin, CELL-currency':{
                'text-align':'right'
            },
            'CELL-counter':{
                'text-align':'center'
            },
            'CELL-checkbox':{
                'text-align':'center'
            },
            'KEY-tgbtn':{
                $order:100,
                width:'100%',
                padding: 0,
                'vertical-align': 'text-bottom',
                'line-height':'100%',
                height:'100%'
            },
           'CELLS1-hover, CELLS2-hover':{
                $order:4,
                'background-color':'#F6F6F6'
            },
            'CELLA-hover, CELLA-hover .xui-node[class*="xui-treegrid-"]':{
                $order:5,
                'background-color':'#C5C5C5 !important'
            },
            'FCELL CELLA, GCELL GCELLA, HCELLA, HSCELLA':{
                position:'relative',
                "text-overflow": "ellipsis"
            },
            'HCELLA, HSCELLA':{
                $order:3,
                'text-align': 'center',
                'vertical-align':'middle',
                'line-height':'inherit'
            },
            'HCELLA, HSCELLA, CELLA, GCELLA':{
                display:'block',
                overflow:'hidden',
                '-moz-box-flex':'1',
                'outline-offset':'-1px',
                '-moz-outline-offset':(xui.browser.gek && xui.browser.ver<3)?'-1px !important':null,
                height:'100%',
                //ie need this
                width:xui.browser.ie?'100%':'',
                // depends on parent
                'line-height':'inherit'
            },
            'FCELL.editing CELLA, CELL.editing CELLA':{
              'text-overflow':'unset!important'
            },
            'FCELL.editing CELLCAPTION, CELL.editing CELLCAPTION':{
              'visibility':'hidden!important'
            },
            'CELLA-inline':{
                $order:5,
                display:xui.$inlineBlock,
                width:'auto',
                '-moz-box-flex':0
            },
            PROGRESS:{
                border:'none',
                height:'100%',
                'line-height':'1.83333em',
                overflow:'visible',
                opacity:0.7,
                '*filter':'alpha(opacity=70)'
            },
            'PROGRESS CELLCAPTION':{
                overflow:'visible'
            },
            'CHECKBOX, MARK':{
               cursor:'pointer',
               'vertical-align':'middle'
            },
            'SUB1, SUM22':{
                //for ie bug: relative , height='auto' will disppear
                zoom:xui.browser.ie?1:null,
                height:0,
                position:'relative',
                overflow:'visible'
            },
            ROWTOGGLE:{
                padding:'0 .334em 0 0'
            }
        },
        _objectProp:{rowOptions:1,colOptions:1},
        Behaviors:{
            //don't add cell in HoverEffected, for 'hover' editMode
            HoverEffected:{ROWTOGGLE:'ROWTOGGLE', GCELL:'GCELLA', CELL:'CELLA', HCELL:['HCELLA','HSCELLA'],HSCELL:['HCELLA','HSCELLA'], FHCELL:'HCELLA',FCELL:'CELLA',CMD:'CMD',SCROLL22:"SCROLL22",BODY11:"BODY11",BODY12:"BODY12",BODY21:"BODY22",BODY22:"BODY22",HEADER1:"HEADER1",HEADER2:"HEADER2"},
            ClickEffected:  {ROWTOGGLE:'ROWTOGGLE', GCELL:'GCELLA', CELL:'CELLA', HCELL:['HCELLA','HSCELLA'],HSCELL:['HCELLA','HSCELLA'], CMD:'CMD'},
            DraggableKeys:['FCELL'],
            DroppableKeys:['SCROLL21','SCROLL22','CELLS1','CELLS2','FCELL'],
            onMouseout:function(profile, e, src){
                if(!xui(src).contains(xui.Event.getSrc(e)))
                  profile.box.$cancelHoverEditor(profile);
            },
            HFMARK:{
                onClick:function(profile,e,src){
                    if(profile.properties.selMode!='multi'&&profile.properties.selMode!='multibycheckbox')return;

                    var rows=[];
                    xui.each(profile.rowMap,function(o){
                        rows.push(o.id);
                    });

                    if(profile._$checkAll){
                        delete profile._$checkAll;
                        profile.boxing().setUIValue("",null,null,'checkbox');
                        xui.use(src).tagClass('-checked',false)
                        profile.boxing().onRowSelected(profile, "allrows", e, src, -1);
                    }else{
                        profile._$checkAll=true;
                        xui.use(src).tagClass('-checked')
                        profile.boxing().setUIValue(rows.join(profile.properties.valueSeparator),null,null,'click');
                        profile.boxing().onRowSelected(profile, "allrows", e, src, 1);
                    }
                    return false;
                }
            },
            TRLOCKED1:{
                onMouseover:function(profile, e, src){
                    profile.box.$cancelHoverEditor(profile);
                }
            },
            TRTAIL:{
                onMouseover:function(profile, e, src){
                    profile.box.$cancelHoverEditor(profile);
                }
            },
            TDBODY21:{
                onMouseover:function(profile, e, src){
                    profile.box.$cancelHoverEditor(profile);
                }
            },
            TRHEADER:{
                onMouseover:function(profile, e, src){
                    profile.box.$cancelHoverEditor(profile);
                }
            },
            SCROLL22:{
                onScroll:function(profile, e, src){
                    var node=xui.use(src).get(0),
                        l=node.scrollLeft||0,
                        t=node.scrollTop||0;
                    xui.resetRun(profile.$xid+':scroll',function(){
                      if(profile.destroyed)return;

                      if(profile.$sl!=l){
                          profile.getSubNodes(['HEADER2','SCROLL12']).scrollLeft(profile.$sl=l);
                      }
                      if(profile.$st!=t){
                          profile.getSubNode('SCROLL21').get(0).scrollTop=profile.$st=t;
                          //for IE11's scrollbar bug
                          if((t=profile.getSubNode('SCROLL21').get(0).scrollTop) && t!=profile.$st){
                              node.scrollTop=profile.$st=t;
                          }
                      }
                    });
                },
                onMousedown:function(profile, e, src){
                    if(xui.Event.getSrc(e)==xui(src).get(0) && profile.__hastmpRow && profile.__needchecktmprow)
                        profile.box._checkNewLine(profile,'oninner');
                },
                onMouseover:function(profile, e, src){
                    profile.box.$cancelHoverEditor(profile);
                }
            },
            SCROLL21:{
                onScroll:function(profile, e, src){
                    var node=xui.use(src).get(0),
                        t=node.scrollTop||0;
                    if(profile.$st!=t)
                        profile.getSubNode('SCROLL22').get(0).scrollTop=profile.$st=t;
                },
                onMousedown:function(profile, e, src){
                    if(xui.Event.getSrc(e)==xui(src).get(0) && profile.__hastmpRow && profile.__needchecktmprow)
                        profile.box._checkNewLine(profile,'oninner');
                },
                onMouseover:function(profile, e, src){
                    profile.box.$cancelHoverEditor(profile);
                }
            },
            HEADER2:{
                onScroll:function(profile, e, src){
                    var node=xui.use(src).get(0),
                        l=node.scrollLeft||0;
                    if(profile.$sl!=l)
                        profile.getSubNodes(['SCROLL12','SCROLL22']).scrollLeft(profile.$sl=l);
                }
            },
            SCROLL12:{
                onScroll:function(profile, e, src){
                    var node=xui.use(src).get(0),
                        l=node.scrollLeft||0;
                    if(profile.$sl!=l)
                        profile.getSubNodes(['HEADER2','SCROLL22']).scrollLeft(profile.$sl=l);
                }
            },
            //colomn resizer
            HHANDLER:{
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!='left')return;
                    var p=profile.properties,
                        id = profile.getSubId(src),
                        col = profile.colMap[id],o;
                    if(col && col._isgroup){
                        o=profile.getSubNode("HHANDLER",profile.properties.header[col["to"]]._serialId);
                    }else{
                        o=xui(src);
                    }
                    var minW =o.parent(2).width()-profile.$px(p._minColW),
                    scroll = profile.getSubNode('SCROLL22'),
                    maxW = scroll.offset().left + scroll.width() - xui.Event.getPos(e).left - 4;

                    if(p.disabled)return false;
                    if(col && col.disabled)return false;

                    o.startDrag(e, {
                        horizontalOnly:true,
                        dragType:'blank',
                        dragDefer:2,
                        maxLeftOffset:minW,
                        maxRightOffset:maxW,
                        targetReposition:false
                    });
                    xui.use(src).parent(2).onMouseout(true,{$force:true}).onMouseup(true);
                },
                onDragbegin:function(profile, e, src){
                    xui.DragDrop.getProfile().proxyNode
                    .css({
                        height:profile.getRoot().height()+'px',
                        width:'4px',
                        backgroundColor:'#DDDDDD',
                        cursor:'e-resize'
                    });
                },
                onDrag:function(profile, e, src){
                    var d=xui.DragDrop,p=d.getProfile(),b=0;
                    if(p.x<=p.restrictedLeft || p.x>=p.restrictedRight)b=true;
                    if(b){
                        if(!profile._limited){
                            p.proxyNode.css('backgroundColor','#ff6600');
                            profile._limited=true;
                        }
                    }else{
                        if(profile._limited){
                            p.proxyNode.css('backgroundColor','#DDDDDD');
                            profile._limited=0;
                        }
                    }
                },
                onDragstop:function(profile, e, src){
                    var p=profile.properties,
                        o=xui(src).parent(2),
                        ks=profile.keys,
                        col=profile.colMap[profile.getSubId(src)],
                        oldw=o.width(),
                        w=oldw + xui.DragDrop.getProfile().offset.x,
                        emw;
                    if(col){
                        if(col&&col._isgroup){
                            col=profile.properties.header[col['to']];
                            o=profile.getSubNode("HCELL",col._serialId);
                        }
                        if(col.hasOwnProperty('maxWidth'))w=Math.min(profile.$px(col.maxWidth),w);
                        if(col.hasOwnProperty('minWidth'))w=Math.max(profile.$px(col.minWidth),w);
                    }

                    if(profile.beforeColResized && false===profile.boxing().beforeColResized(profile,col?col.id:null,w)){
                        profile._limited=0;
                        return;
                    }
                    emw = profile.$forceu(w);
                    o.width(emw);
                    if(col){
                        if(col.flexSize){
                            var emw = parseFloat(col.width),
                                percent = w / profile._relAvailable,
                                oldPercent = oldw / profile._relAvailable;
                            col.width =  (emw / oldPercent - emw)  * percent / (1 -percent) + profile.$picku(col.width);
                        }else{
                            col.width=emw;
                        }
                        col._colWidth=emw;
                    }

                    //collect cell id
                    var ids=[],ws=[];
                    if(profile.getKey(xui.use(src).parent(2).id())==ks.FHCELL){
                        profile.box._setRowHanderW(profile,w);
                    }else{
                        var cells = col._cells,t;
                        xui.each(cells,function(o){
                            if(!(t=profile.getSubNode(ks.CELL, o)).isEmpty()) ids.push(t.id());
                        });
                        profile.box._adjusteditorW(profile, xui(ids).width(emw), w);
                    }

                    if(profile.afterColResized)
                        profile.boxing().afterColResized(profile,col?col.id:null,w);

                    profile.getSubNode('SCROLL22').onScroll();
                    profile.box._adjustColsWidth(profile);
                    profile.box._adjustBody(profile,'setcol');
                    profile._limited=0;
                },
                onClick:function(){
                    return false
                },
                onDblclick:function(profile, e, src){
                    var p = profile.properties,
                        o = xui.use(src).parent(2),
                        id = profile.getSubId(src),
                        col = profile.colMap[id];

                    if(col&&col._isgroup){
                        col=profile.properties.header[col['to']];
                        o=profile.getSubNode("HCELL",col._serialId);
                    }

                    if(col && col.flexSize)return;
                    if(profile.getRootNode().clientHeight<=0)return;

                    //for row0
                    if(profile.getKey(xui.use(src).parent(2).id())==profile.keys.FHCELL){
                        profile.box._setRowHanderW(profile,true);
                        return;
                    }

                    //for other rows
                    var cells=col._cells,
                        cls=profile.getClass('CELLA','-inline'),
                        n,nodes=[],ws=[],w,emw;
                    xui.each(cells,function(o){
                        n=profile.getSubNode('CELLA',o);
                        if(n._nodes.length){
                            nodes.push(n.get(0));
                            ws.push(n.addClass(cls).width());
                        }
                    });
                    // for group in the first column
                    if(p.treeMode=='infirstcell' && p.header[0]==col){
                        profile.getSubNode("GCELLA",true).each(function(o){
                            ws.push(xui(o).addClass(cls).width());
                            xui(o).removeClass(cls);
                        });
                    }

                    ws.push(profile.$px(p._minColW));
                    w=parseFloat(Math.max.apply(null,ws));
                    if(w>profile.$px(p._maxColW))w=profile.$px(p._maxColW);

                    if(profile.beforeColResized && false===profile.boxing().beforeColResized(profile,col?col.id:null,w))
                        return;

                    if(col){
                        if(col.hasOwnProperty('maxWidth'))w=Math.min(profile.$px(col.maxWidth),w);
                        if(col.hasOwnProperty('minWidth'))w=Math.max(profile.$px(col.minWidth),w);
                    }
                    w+=2;
                    emw=profile.$forceu(w);

                    profile.box._adjusteditorW(profile, xui(nodes).parent().width(emw),w);
                    o.width(col.width=col._colWidth=emw);

                    xui(nodes).removeClass(cls);
                    if(profile.afterColResized)
                        profile.boxing().afterColResized(profile,col.id,w);

                    profile.box._adjustColsWidth(profile);
                    profile.box._adjustBody(profile,'setcol');
                    return false;
                }
            },
            //row resizer
            FHANDLER:{
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!='left')return;
                    var p=profile.properties,
                    row = profile.rowMap[profile.getSubId(src)],
                    o=xui(src),
                    minH =o.parent(3).height()-profile.$px(p._minRowH),
                    scroll = profile.getSubNode('SCROLL21'),
                    maxH = scroll.offset().top + scroll.height() - xui.Event.getPos(e).top - 4;

                    if(p.disabled || (row&&row.disabled))return false;
                    o.startDrag(e, {
                        verticalOnly:true,
                        dragType:'blank',
                        dragDefer:2,
                        maxTopOffset:minH,
                        maxBottomOffset:maxH ,
                        targetReposition:false
                    });
                    xui.use(src).parent(2).onMouseout(true,{$force:true}).onMouseup(true);
                    if(!row)
                        profile.getSubNode('COLLIST').css('visibility','hidden');
                },
                onDragbegin:function(profile, e, src){
                    xui.DragDrop.getProfile().proxyNode
                    .css({
                        width:profile.getRoot().width()+'px',
                        height:'4px',
                        backgroundColor:'#DDDDDD',
                        cursor:'n-resize'
                    });
                },
                onDrag:function(profile, e, src){
                    var d=xui.DragDrop,p=d.getProfile(),b=0;
                    if(p.y<=p.restrictedTop || p.y>=p.restrictedBottom)b=true;
                    if(b){
                        if(!profile._limited){
                            p.proxyNode.css('backgroundColor','#ff6600');
                            profile._limited=true;
                        }
                    }else{
                        if(profile._limited){
                            p.proxyNode.css('backgroundColor','#DDDDDD');
                            profile._limited=0;
                        }
                    }
                },
                onDragstop:function(profile, e, src){
                    var subId=profile.getSubId(src),
                        o=xui(src).parent(3),
                        h=o.height()+xui.DragDrop.getProfile().offset.y,
                        row = profile.rowMap[profile.getSubId(src)],
                        prop=profile.properties,
                        header=prop.header,
                        headerHeight=prop.headerHeight;

                    //for ie's weird bug
                    if(xui.browser.ie && xui.browser.ver<=8 && h%2==1)h+=1;

                    if(profile.beforeRowResized && false===profile.boxing().beforeRowResized(profile, row?row.id:null, h)){
                        profile._limited=0;
                        return;
                    }
                     // use em
                    if(profile.getKey(xui.use(src).parent(2).id())==profile.keys.FHCELL){
                        prop.headerHeight=profile.$forceu(h);
                        profile.box._adjustColsHeight(profile);
                        profile.adjustSize();
                    }else{
                        row.height=profile.$forceu(h);
                        profile.getSubNode("CELLS2",subId).css({
                          height:row.height,
                          'contain-intrinsic-size':row.height
                        });
                        o.height(row._rowHeight=row.height);
                        profile.box._adjusteditorH(profile, o, row._rowHeight);
                    }

                    if(profile.afterRowResized)
                        profile.boxing().afterRowResized(profile, row?row.id:null, h);

                    profile.box._adjustBody(profile,'setrow');

                    profile._limited=0;
                },
                onDblclick:function(profile, e, src){
                    var prop = profile.properties,
                        sid = profile.getSubId(src),
                        row,cells;
                    if(profile.getRootNode().clientHeight<=0)return;

                    if(sid){
                        row=profile.rowMap[sid];
                        cells=profile.getSubNodes(['CELLS2','CELLS1'], sid);
                        var h=cells.height('auto').height();

                        if(profile.beforeRowResized && false===profile.boxing().beforeRowResized(profile, row.id, h))
                            return;
                        cells.height(row.height=row._rowHeight=profile.$forceu(h));
                        profile.box._adjusteditorH(profile, cells, h);
                    }else{
                        // fake
                        var h=(profile._headerLayers||0 + 1)*profile.$px(profile.box.$DataStruct.headerHeight);
                        if(profile.beforeRowResized && false===profile.boxing().beforeRowResized(profile, null, h))
                            return;
                        profile.box._adjustColsHeight(profile,true);

                        prop.headerHeight = profile.$forceu(h, profile.$picku(prop.headerHeight));
                        profile.adjustSize();
                    }

                    if(profile.afterRowResized)
                        profile.boxing().afterRowResized(profile, row?row.id:null, h);

                    profile.box._adjustBody(profile,'setrow');

                    return false;
                },
                onClick:function(){return false}
            },
            //mark click for tree build
            ROWTOGGLE:{
                onClick:function(profile, e, src){
                    var  p = profile.properties,cell,
                        row = profile.rowMap[profile.getSubId(src)];
                    if(!row){
                        cell = profile.cellMap[profile.getSubId(src)];
                        if(cell)row=cell._row;
                    }
                    if(!row)return;
                    if(p.disabled || row.disabled)return false;
                    //for selection click
                    if(!row.sub)return;

                    profile.box._setSub(profile, row, !row._checked);

                    return false;
                },
                beforeMousedown:function(){
                    return false;
                }
            },
            //HCELLA handler dragdrop
            HSCELLA:{
                onClick:function(profile, e, src){
                    profile.getSubNode("HCELLA", profile.getSubId(src)).onClick(true);
                }
            },
            HCELLA:{
                onClick:function(profile, e, src){
                    var p=profile.properties,
                    id = profile.getSubId(src),
                    col = profile.colMap[id];

                    if(!col){
                        if(profile.onClickGridHandler)
                            profile.boxing().onClickGridHandler(profile,e,src);

                        if(p.disabled)return false;
                        if(!p.colSortable)return;
                    }else{
                        if(profile.onClickHeader)
                            profile.boxing().onClickHeader(profile, col, e, src);

                        if(p.disabled || col.disabled)return false;
                        if(!(col.hasOwnProperty('colSortable')?col.colSortable:p.colSortable))return;
                    }

                    if(col&&col._isgroup){
                        col=profile.properties.header[col.from];
                    }
                    if(profile.beforeColSorted && false===profile.boxing().beforeColSorted(profile, col))
                        return false;

                    var order = (col ? col._order : profile._order) || false,
                    type = (col ? col.type : null) || 'input',
                    sortby = col ? col.sortby : null,
                    index = col ? xui.arr.indexOf(p.header,col) :-1,
                    me=arguments.callee,
                    fun = me.fun||(me.fun = function(profile, subNode, index, type, sortby,order,lastrownode1,lastrownode2){
                        var rows,parent1,parent2,self=arguments.callee;
                        if(subNode){
                            rows = subNode.sub;
                            parent1 = profile.getSubNode('SUB1', subNode._serialId).get(0);
                            parent2 = profile.getSubNode('SUB2', subNode._serialId).get(0);
                        }else{
                            subNode={_inited:true};
                            rows = profile.properties.rows;
                            parent1 = profile.getSubNode('ROWS21').get(0);
                            parent2 = profile.getSubNode('ROWS22').get(0);
                        }
                        //sor sub first
                        var a1=[],a2=[], a4=[],t,ff;
                        var a11=[], a12=[], a31=[], a32=[];
                        xui.arr.each(rows,function(row){
                            if(row._region==1)return;

                            if(row.sub && row.sub.length>1)
                                self(profile, row, index, type, sortby, order, null);
                             //for short input
                             a1[a1.length]= index==-1
                                ? row.caption
                                : (t=row.cells)?(t=t[index])?t.value:'':row[index];
                             a4[a4.length]= index==-1
                                    ? row
                                : (t=row.cells)?t[index]:row[index];
                             a2[a2.length]=a2.length;
                        });
                        var sortf;
                        if(typeof sortby!='function'){
                            switch(type){
                                case 'number':
                                case 'spin':
                                case 'counter':
                                case 'currency':
                                    ff=function(n){return parseFloat(n)||0};
                                    break;
                                case 'datetime':
                                case 'date':
                                    ff=function(n){return xui.isDate(n)?n.getTime():xui.isFinite(n)?parseInt(n,10):0};
                                    break;
                                default:
                                    ff=function(n){return n||''};
                            }
                            sortf=function(x,y){
                               var xx=ff(a1[x]), yy=ff(a1[y]);
                               return (xx>yy?(order?1:-1):xx===yy?(x>y?-1:1):(order?-1:1));
                            };
                        }else{
                            sortf=function(x,y){
                               return sortby.apply(profile,[x,y,a1,order,index,a4]);
                            };
                        }
                        a2.sort(sortf);

                        //sort memory array
                        //sort dom node
                        var b = subNode._inited, bak=xui.copy(rows), c;
                        if(b){
                            a11=parent1.childNodes;
                            a12=parent2.childNodes;
                        }
                        xui.arr.each(a2,function(o,i){
                            rows[i]=bak[o];
                            if(b){
                                a31[i]=a11[o];
                                a32[i]=a12[o];
                            }
                        });
                        if(b){
                            var fragment1=document.createDocumentFragment(),
                                fragment2=document.createDocumentFragment();
                            for(var i=0;t=a31[i];i++) fragment1.appendChild(t);
                            for(var i=0;t=a32[i];i++) fragment2.appendChild(t);

                            if(lastrownode1){
                                parent1.insertBefore(fragment1, lastrownode1);
                                parent2.insertBefore(fragment2, lastrownode2);
                            }else{
                                parent1.appendChild(fragment1);
                                parent2.appendChild(fragment2);
                            }
                        }
                    });

                    var lastrow, lastrownode1, lastrownode2;
                    if(profile.__hastmpRow){
                        lastrow=profile.properties.rows.pop();
                        lastrownode1=profile.getSubNode('ROWS21').get(0).lastChild;
                        lastrownode2=profile.getSubNode('ROWS22').get(0).lastChild;
                    }

                    fun(profile, null, index, type, sortby,order, lastrownode1, lastrownode2);

                    if(profile.__hastmpRow)
                        profile.properties.rows.push(lastrow);

                    //show sort mark
                    profile.getSubNode('SORT', true).css('display','none');
                    var node = (col ? profile.getSubNode('SORT', col._serialId) : profile.getSubNode('SORT')).css('display','');
                    node.tagClass('-checked', col ? (!(col._order = !col._order)) : (!(profile._order = !profile._order)));

                    profile.box._asy(profile);

                    //clear rows cache
                    delete profile.$allrowscache1;
                    delete profile.$allrowscache2;

                    if(profile.afterColSorted)
                        profile.boxing().afterColSorted(profile, col);
                },
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!='left')return;

                    var p=profile.properties;
                    if(p.disabled)return;

                    var col=profile.colMap[profile.getSubId(src)];
                    if(!col||col._isgroup)return;
                    if(p.disabled || col.disabled)return false;
                    if(p.treeMode=='infirstcell' && p.header[0]==col)return false;
                    if(!(col.hasOwnProperty('colMovable')?col.colMovable:p.colMovable))return;

                    //fire before event
                    if(false === profile.boxing().beforeColDrag(profile, col.id))return;

                    var pos=xui.Event.getPos(e),
                        o = xui(src),
                        itemId = profile.getSubId(src);

                    o.startDrag(e,{
                        dragType:'icon',
                        shadowFrom:o.parent(),
                        dragCursor:'pointer',
                        targetLeft:pos.left+12,
                        targetTop:pos.top+12,
                        targetReposition:false,
                        dragDefer: 2,
                        dragKey:profile.$xid + ":col",
                        dragData:o.parent().id(),
                        tagVar:col._region
                    });
                },
                onDragbegin:function(profile, e, src){
                    xui(src).parent().onMouseout(true,{$force:true});
                    xui(src).onMouseup(true);
                },
                beforeMouseover:function(profile, e, src){
                    var p=profile.properties,
                        id = profile.getSubId(src),
                        col = profile.colMap[id];
                    if(!col || col._isgroup)return;
                    if(p.disabled || col.disabled)return false;

                    var dp=xui.DragDrop.getProfile();
                    if(!dp.dragData||dp.dragKey!=profile.$xid + ":col")return;
                    if(dp.tagVar!=col._region)return;

                    var psrc=xui.use(src).parent().xid();
                    if(false===profile.box._colDragCheck(profile,psrc))return;
                    xui.DragDrop.setDropElement(src).setDropFace(src,'move');
                    var nn=xui.use(psrc).get(0), left=nn.offsetLeft + (col._region==2?profile._leftregionw:0), top=nn.offsetTop+nn.offsetHeight;
                    profile.getSubNode("ARROW")
                        .left(left)
                        .top(top)
                        .css("display","block");
                },
                beforeMouseout:function(profile, e, src){
                    var p=profile.properties,
                        id = profile.getSubId(src),
                        col = profile.colMap[id];
                    if(!col)return;
                    if(p.disabled || col.disabled)return false;

                   var dp=xui.DragDrop.getProfile();
                    if(!dp.dragData||dp.dragKey!=profile.$xid + ":col")return;

                    var psrc=xui.use(src).parent().xid();
                    xui.DragDrop.setDropElement(null).setDropFace(null,'none');
                    if(false===profile.box._colDragCheck(profile, psrc))return;
                    profile.getSubNode("ARROW").css("display","none");
                },
                onDrop:function(profile, e, src){
                    var p=profile.properties,
                        box=profile.box,
                        id = profile.getSubId(src),
                        SubID=xui.UI.$tag_subId,
                        col = profile.colMap[id];
                    if(!col)return;
                    if(p.disabled || col.disabled)return false;

                    var psrc=xui.use(src).parent().xid();
                    profile.getSubNode("ARROW").css("display","none");
                    if(false===box._colDragCheck(profile, psrc))return;

                    //check dragData
                    var data=xui.DragDrop.getProfile().dragData,
                        fromId = data && profile.getSubId(data),
                        toId = profile.getSubId(psrc),
                    //get properties
                        map=profile.colMap,
                        fromTh=map[fromId],
                        toTh=map[toId];

                    //fire before event
                    if(false === profile.boxing().beforeColMoved(profile,fromTh.id, toTh.id))return;

                    //remove dragover appearance
                    xui.DragDrop.setDropFace(psrc,'none');

                    //get index in HCELL array
                    var fromIndex = xui.arr.subIndexOf(p.header,'_serialId',fromId),
                        toIndex = xui.arr.subIndexOf(p.header,'_serialId',toId);

                    //if same or same position, return
                    if(fromIndex===toIndex|| fromIndex===toIndex-1)return;

                    //reposition header dom node
                    profile.getSubNode('HCELL', toId).addPrev(xui(xui.DragDrop.getProfile().dragData));
                    //reposition cell dom nodes
                    xui.each(toTh._cells, function(o,i){
                        profile.getSubNode('CELL',o).addPrev(profile.getSubNode('CELL',fromTh._cells[i]));
                    });

                    //update memory
                    //HCELL position
                    //keep refrence, and remove
                    var temp=p.header[fromIndex];
                    // 1. insert to right pos
                    xui.arr.insertAny(p.header,temp,toIndex);
                    // 2. then, remove
                    xui.arr.removeFrom(p.header,fromIndex+(fromIndex>toIndex?1:0));
                    //cell position rowMap
                    var allitems = profile.queryItems(p.rows, true, true);
                    xui.arr.each(allitems,function(o){
                        //for those non-prepared data
                        o=o.cells?o.cells:o;
                        if(!o || !xui.isArr(o))return;
                        temp=o[fromIndex];
                        xui.arr.removeFrom(o,fromIndex);
                        xui.arr.insertAny(o,temp,toIndex);
                    });

                    // group columns
                    var arr=p.grpCols;
                    if(arr && xui.isArr(arr)&& arr.length){
                        for(var j=0,m=arr.length,grp;j<m;j++){
                            grp=arr[j];
                            if(grp.from>toIndex){
                                grp.from++;
                                grp['to']++;
                            }else if(toIndex>=grp.from && toIndex<=grp['to']){
                                grp['to']++;
                            }
                        }
                        for(var j=0,m=arr.length,grp;j<m;j++){
                            grp=arr[j];
                            if(grp.from>fromIndex){
                                grp.from--;
                                grp['to']--;
                            }else if(fromIndex>=grp.from && fromIndex<=grp['to']){
                               grp['to']--;
                            }
                        }
                        xui.filter(arr,function(o){
                            var r=o['to']>=o.from;
                            if(!r && profile.renderId){
                                profile.getSubNodes(["HCELL","HSCELL"],o[SubID]).remove();
                                delete profile.colMap[o[SubID]];
                                delete profile.colMap2[o.id];
                            }
                            return r;
                        });
                        p.grpCols=box._adjustGrpColsData(profile,arr);
                        box._adjustColsWidth(profile);
                        box._adjustColsHeight(profile);
                    }

                    //fire after event
                    profile.boxing().afterColMoved(profile, fromTh.id, toTh.id);

                    //clear rows cache
                    delete profile.$allrowscache1;
                    delete profile.$allrowscache2;
                },
                onMouseover:function(profile,e,src){
                    var p=profile.properties,
                        id = profile.getSubId(src),
                        col = profile.colMap[id];

                    if(col){
                        if(p.disabled || col.disabled)return false;
                        if(!(col.hasOwnProperty('colHidable')?col.colHidable:p.colHidable))return;
                        if(!(col.hasOwnProperty('colDroppable')?col.colDroppable:p.colDroppable))return;
                    }else{
                        if(p.disabled)return false;
                        if(!p.colHidable)return;
                    }

                    xui.resetRun(profile.$xid+':collist',null);
                    var region={},
                        pos=xui.use(src).parent().offset(null,profile.getSubNode('BOX')),
                        size=xui.use(src).parent().cssSize();
                    if(size.width<16)return;

                    region.height=profile.$forceu(size.height);
                    region.left=profile.$forceu(pos.left);
                    region.top=profile.$forceu(pos.top);

                    profile.getSubNode('COLLIST').cssRegion(region).css('visibility','visible');
                },
                onMouseout:function(profile,e,src){
                    var p=profile.properties,
                        id = profile.getSubId(src),
                        col = profile.colMap[id];

                    if(col){
                        if(p.disabled || col.disabled)return false;
                        if(!(col.hasOwnProperty('colHidable')?col.colHidable:p.colHidable))return;
                    }else{
                        if(p.disabled)return false;
                        if(!p.colHidable)return;
                    }

                    xui.resetRun(profile.$xid+':collist',function(){
                        // destroyed
                        if(!profile.box)return;
                        profile.getSubNode('COLLIST').css({visibility:'hidden',left:0+profile.$picku(),top:0+profile.$picku()});
                    });
                },
                onContextmenu:function(profile, e, src){
                    if(profile.onContextmenu){
                        var sid=profile.getSubId(src);
                        return profile.boxing().onContextmenu(profile, e, src, sid?profile.colMap[sid]:null)!==false;
                    }
                }
            },
            COLLIST:{
                onMouseover:function(profile,e,src){
                    xui.resetRun(profile.$xid+':collist',null);
                },
                onMouseout:function(profile,e,src){
                    xui.resetRun(profile.$xid+':collist',function(){
                        // destroyed
                        if(!profile.box)return;
                        xui.use(src).css('visibility','hidden');
                    });
                },
                onClick:function(profile,e,src){
                    var p=profile.properties;
                    if(!profile.$col_pop){
                        var items=[],pop;
                        xui.arr.each(profile.properties.header,function(o){
                            if(o.hasOwnProperty('colHidable')?o.colHidable:p.colHidable)
                                items.push({id:o.id,caption:o.caption,type:'checkbox',value:o.hidden!==true});
                        });
                        if(items.length){
                            pop=profile.$col_pop=new xui.UI.PopMenu({hideAfterClick:false,items:items}).render(true);
                            pop.onMenuSelected(function(p,i,s){
                                var b=1;
                                xui.arr.each(p.properties.items, function(o){
                                    if(o.value!==false)
                                        return b=false;
                                });
                                if(!b){
                                    profile.boxing().showColumn(i.id, i.value);
                                }else{
                                    p.getSubNodeByItemId('CHECKBOX',i.id).tagClass('-checked');
                                    i.value=true;
                                }
                            })
                        }
                    }
                    if(profile.$col_pop)
                        profile.$col_pop.popUp(src);
                }
            },
            CELLS2:{
                afterMouseover:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return;
                    if(p.disableHoverEffect===true)return;
                    if(p.disableHoverEffect && /\bCELLS2\b/.test(p.disableHoverEffect||""))return;
                    //if(p.activeMode=='row'){
                        var subid=profile.getSubId(src);
                        profile.getSubNodes(['CELLS1','CELLS2'], subid).tagClass('-hover');
                        if(profile.onRowHover){
                            var row = profile.rowMap[subid];
                            profile.boxing().onRowHover(profile, row, true, e, src);
                        }
                    //}
                },
                afterMouseout:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return;
                    if(p.disableHoverEffect===true)return;
                    if(p.disableHoverEffect && /\bCELLS2\b/.test(p.disableHoverEffect||""))return;
                   //if(p.activeMode=='row'){
                        var subid=profile.getSubId(src);
                        profile.getSubNodes(['CELLS1','CELLS2'], subid).tagClass('-hover',false);
                        if(profile.onRowHover){
                            var row = profile.rowMap[subid];
                            profile.boxing().onRowHover(profile, row, false, e, src);
                        }
                    //}
                },
                onDblclick:function(profile, e, src){
                    var p = profile.properties,
                        row = profile.rowMap[profile.getSubId(src)],
                        nn = xui.Event.getSrc(e),
                        eid = nn&&(nn.id||""),
                        ks=profile.keys,
                        ck=profile.getKey(eid)
                    while(!ck){
                        nn=nn.offsetParent;
                        ck=profile.getKey(eid = nn.id);
                    }
                    if(!row || p.disabled || row.disabled)return false;
                    if(eid && xui.UIProfile.getFromDom(eid)!=profile)return false;
                    if(ck==ks.ROWTOGGLE || ck==ks.MARK) return false;
                    if(profile.onDblclickRow)profile.boxing().onDblclickRow(profile, row, e, src);
                    return false;
                },
                onClick:function(profile, e, src){
                    var p = profile.properties,
                        subid = profile.getSubId(src),
                        ks=profile.keys,
                        row = profile.rowMap[subid],
                        eid = xui.Event.getSrc(e).id||"";
                    if(p.disabled || row.disabled)return false;
                    if(eid && xui.UIProfile.getFromDom(eid)!=profile)return false;
                    if(profile.onClickRow)
                        profile.boxing().onClickRow(profile, row, e, src);
                }
            },
            CELL:{
                onMouseover:function(profile, e, src){
                    if(false == profile.box.$cancelHoverEditor(profile))return;

                    var box=profile.box, p=profile.properties, i=xui.use(src).id(),editor;
                    if(p.disableHoverEffect===true)return;
                    if(p.disableHoverEffect && /\bCELL\b/.test(p.disableHoverEffect||""))return;
                    i=i.split(":")[2];
                    if(!i)return;
                    i=profile.cellMap[i];
                    if(!i)return;

                    if(box.getCellOption(profile, i, "disabled"))return;

                    var editMode=box.getCellOption(profile, i, "editMode");
                    if( box.getCellOption(profile, i, "editable") && xui.str.startWith(editMode,"hover")){
                        if(editMode=='hoversharp' && box.getCellOption(profile, i, "type")=='file'){
                        //    profile.box.$cancelHoverEditor(profile);
                        }else{
                        //    profile.box.$cancelHoverEditor(profile);
                            xui.resetRun(profile.key+":"+profile.$xid+":hovereditor",function(subId){
                                    if(profile.destroyed)return;
                                    if(subId=profile.getSubId(src))
                                        profile.box._editCell(profile, subId,true);
                            });
                            return false;
                        }
                    }//else{
                     //   profile.box.$cancelHoverEditor(profile);
                    //}
                }
            },
            GCELL:{
                onMouseover:function(profile, e, src){
                    profile.box.$cancelHoverEditor(profile);
                }
            },
            CELLA:{
                onDblclick:function(profile, e, src){
                    var cell = profile.cellMap[profile.getSubId(src)];
                    if(!cell)return;
                    if(profile.properties.disabled)return;
                    var box=profile.box,
                        getPro=box.getCellOption,
                        type=getPro(profile, cell, 'type'),
                        disabled=getPro(profile, cell, 'disabled'),
                        editable=getPro(profile, cell, 'editable');

                    if(!disabled && (!editable || (type=='button'||type=='label'))){
                        profile.boxing().onDblclickCell(profile, cell, e, src, cell._row, cell._col);
                        // stop to trigger row's onDblclick event
                        if(type=='button')
                            return false;
                    }
                },
                afterMousedown:function(profile,e,src){
                    xui.setNodeData(src,'_tmp_forcefocus');
                },
                onClick:function(profile, e, src){
                    var p = profile.properties,
                        box=profile.box,
                        getPro=box.getCellOption,
                        cell = profile.cellMap[profile.getSubId(src)],
                        id;
                    if(cell){
                        if(profile.properties.disabled)return false;
                        var type=getPro(profile, cell, 'type'),
                            disabled=getPro(profile, cell, 'disabled'),
                            readonly=getPro(profile, cell, 'readonly'),
                            onClickCell=getPro(profile, cell, 'onClickCell')||getPro(profile, cell, 'event'),
                            mode = p.activeMode,
                            editable=getPro(profile, cell, 'editable');

                        if(!disabled && (!editable || (type=='button'||type=='label'))){
                            if(typeof onClickCell == 'function' && false===onClickCell.call(profile._host||profile, profile, cell, e, src, cell._row, cell._col)){}
                            else if(profile.onClickCell)
                                profile.boxing().onClickCell(profile, cell, e, src, cell._row, cell._col);
                            if(type=='button')
                                return false;
                        }
                        // checkbox is special for editor
                        if(!disabled && !readonly && type=='checkbox')
                            if(editable){
                                var v = cell.value;

                                box._updCell(profile, cell, !v, p.dirtyMark, true, true);
                                var e = xui.get(cell,['editorEvents','onChange']);
                                if(e)e(null, v, !v);

                                profile.box._trycheckrowdirty(profile,cell);

                                var ishotrow=cell._row.id==profile.box._temprowid
                                if(ishotrow){
                                    profile.__needchecktmprow=true;
                                    profile.box._sethotrowoutterblur(profile);
                                }
                            }

                        if(!p.editable){
                            if(mode=='cell'){
                                if(getPro(profile, cell, 'disabled'))
                                    return false;
                                id = xui(src).parent().id();
                                box._sel(profile, 'cell', src, id, e);
                            }else if(mode=='row'){
                                if(p.disabled || cell._row.disabled)
                                    return false;
                                id = xui(src).parent(3).id();
                                box._sel(profile, 'row', src, id, e);
                            }
                        }else{
                            if(p.activeMode=='row'){
                                id = xui(src).parent(3).id();
                                box._sel(profile, 'row', src, id, e);
                            }
                        }
                    // handler CELL
                    }else{
                        var row = profile.rowMap[profile.getSubId(src)],
                          onClickCell=getPro(profile, row, 'onClickCell')||getPro(profile, row, 'event');
                        if(p.disabled || row.disabled)
                            return false;
                        if(profile.keys.MARK){
                            var ck=profile.getKey(xui.Event.getSrc(e).id||""),
                                clickMark=ck==profile.keys.MARK;
                        }
                        if(!clickMark){
                            if(typeof onClickCell == 'function' && false===onClickCell.call(profile._host||profile, profile, row, null,null,e,src)){}
                            else if(profile.onClickRowHandler)
                                profile.boxing().onClickRowHandler(profile, row, e, src);
                            // toggle
                            if(row.group) profile.box._getToggleNode(profile, row._serialId).onClick();
                        }

                        if(p.activeMode=='row'){
                            id = xui(src).parent(3).id();
                            box._sel(profile, 'row', src, id, e);
                        }
                    }
                    if(profile.box){
                        if(xui.use(src).get(0)){
                            //in some browsers: if CELLA has a child 'span', you click 'span' will not tigger to focus CELLA
                            if(!xui.getNodeData(src,'_tmp_forcefocus') )
                                profile.box._focusEvent(profile, e, src);
                        }
                    }
                },
                onFocus:function(profile, e, src){
                    xui.setNodeData(src,'_tmp_forcefocus',1);
                    profile.box._focusEvent(profile, e, src);
                },
                onKeydown:function(profile, e, src){
                    var akeys={"tab":1,"left":1,"right":1,"up":1,"down":1},
                        keys=xui.Event.getKey(e),
                        key = keys.key,
                        cell=profile.cellMap[profile.getSubId(src)],
                        editable=profile.box.getCellOption(profile, cell, 'editable'),
                        type=profile.box.getCellOption(profile, cell, 'type');


                    if(key=='enter'){
                        if(!editable || type=='button'||type=='label'||type=='checkbox'){
                            xui(src).onClick();
                            return;
                        }else
                            key="tab";
                    }else if(key==" "){
                        if(type=='button'||type=='label'||type=='checkbox'){
                            xui(src).onClick();
                            return;
                        }
                    }

                    if(!akeys[key])return;

                    if(profile.beforeCellKeydown && false===profile.boxing().beforeCellKeydown(profile,cell,keys)){
                        return false;
                    }

                    // for navigation
                    var p = profile.properties,
                        shift=keys.shiftKey,
                        ctrl=keys.ctrlKey,
                        cur = xui(src),
                        row = cell ? cell._row : profile.rowMap[profile.getSubId(src)],
                        ishotrow = row && row.id==profile.box._temprowid,
                        body11 = profile.getSubNode('SCROLL11'),
                        body12 = profile.getSubNode('SCROLL12'),
                        body21 = profile.getSubNode('SCROLL21'),
                        body22 = profile.getSubNode('SCROLL22'),
                        keyid=new RegExp("^"+profile.box.$Keys.CELLA+":"+profile.serialId+":"),
                        hasBody12 = !!body12.offsetWidth() ,
                        hasBody21 = !!body21.offsetWidth() ,
                        hasBody22 = !!body22.offsetHeight() ,
                        first11 = body11.nextFocus(true, true, false, keyid),
                        first12 = body12.nextFocus(true, true, false, keyid),
                        first21 = body21.nextFocus(true, true, false, keyid),
                        first22 = body22.nextFocus(true, true, false, keyid),
                        last11 = body11.nextFocus(false, true, false, keyid),
                        last12 = body12.nextFocus(false, true, false, keyid),
                        last21 = body21.nextFocus(false, true, false, keyid),
                        last22 = body22.nextFocus(false, true, false, keyid),
                        first = hasBody12 ? hasBody21 ? first11 : first12: hasBody21 ? first21 : first22,
                        last = body22 ? last22 : body12 ? last12 : body21 ? last21 : last11,

                        cellNode = cur.parent(),
                        cellsid = cellNode.parent().id(),
                        subId = profile.getSubId(cellsid),
                        region = cell ? (cell._row._region + "" + cell._col._region) : (row._region + "1"),
                        t;

                    var toLeft=function(inner){
                        if(src!=first.xid()){
                            var ok;
                            if(!cellNode.get(0).previousSibling || !cellNode.get(0).previousSibling.clientWidth){
                                switch(region){
                                    case '11':
                                    case '21':
                                        // has right region
                                        if(hasBody22){
                                            if(src==first21.xid()){
                                                last12.focus(true);
                                                ok=1;
                                            }else{
                                                var prev = profile.getSubNode("ROW2",subId).prev();
                                                if(prev){
                                                    prev.nextFocus(false, true, true,keyid);
                                                    ok=1;
                                                }
                                            }
                                        }
                                    break;
                                    case '12':
                                    case '22':
                                        // has left region
                                        if(hasBody21){
                                            profile.getSubNode("CELLS1",subId).last(2).focus(true);
                                            ok=1;
                                        }
                                    break;
                                }
                            }
                            if(!ok){
                                cur.nextFocus(false,false,true,keyid);
                            }
                            return false;
                        }else if(inner){
                            last.focus(true);
                        }
                    },
                    toRight=function(inner){
                        if(src!=last.xid()){
                            var ok;
                            if(region=="11"||region=="21" ? !cellNode.get(0).nextSibling : (!(t=cellNode.get(0).nextSibling)||!t.clientWidth)){
                                switch(region){
                                    case '11':
                                    case '21':
                                        // has right region
                                        if(hasBody22){
                                            profile.getSubNode("CELLS2",subId).first(2).focus(true);
                                            ok=1;
                                        }
                                    break;
                                    case '12':
                                    case '22':
                                        // has left region
                                        if(hasBody21){
                                            if(src==last12.xid()){
                                                first21.focus(true);
                                                ok=1;
                                            }else{
                                                var next = profile.getSubNode("ROW1",subId).next();
                                                if(next){
                                                    next.nextFocus(true, true, true,keyid);
                                                    ok=1;
                                                }
                                            }
                                        }
                                    break;
                                }
                            }
                            if(!ok){
                                cur.nextFocus(true,false,true,keyid);
                            }
                            return false;
                        }else if(inner){
                            toDown();
                        }
                    },
                    verticalNav=function(up){
                        //get no.
                        var count=1,
                            temp = cur.parent().get(0),
                            max=temp.parentNode.childNodes.length;
                        while(temp=temp.previousSibling)count++;

                        //get row
                        temp=cur.parent(2).get(0);

                        //get all rows
                        if(!profile.$allrowscache2)
                            profile.box._cacheRows(profile);

                        //get index
                        var index = xui.arr.indexOf(region=="12"||region=="22" ? profile.$allrowscache2 : profile.$allrowscache1, temp),
                            rowLen = profile.$allrowscache2.length,
                            newLine=0;

                        //adjust index
                        if(key=='up'){
                            index--;
                            if(index==-1){
                                index = rowLen-1;
                                count--;
                                if(count==0)count=max;
                            }
                        }else{
                            index++;
                            if(index==rowLen){
                                newLine=1;
                                index=0;
                                count++;
                                if(count==max+1)count=1;
                            }
                        }
                        //get node
                        var node = xui( (region=="12"||region=="22" ? profile.$allrowscache2 : profile.$allrowscache1)[index]).first(),
                            node2=node;
                        // it's normal cell
                        if(count>1)
                            node2=node2.next(count-1);
                        // no normal cell(group)
                        if(node2.isEmpty())
                            node2=node;
                        // get CELLA
                        if(node2 && !node2.isEmpty())
                            node2=node2.first();
                        // focus
                        if(!node2.isEmpty())
                            return  [node2, newLine];
                        return null;
                    },
                    toUp=function(){
                        var tnode;
                        if(src!=first.xid()){
                            if(cur.get(0)==first12.get(0) || cur.get(0)==first22.get(0)){
                                if(hasBody21){
                                    tnode=last21;
                                }else{
                                    tnode=last11;
                                }
                            }
                            if(!tnode){
                                tnode=verticalNav(true)[0];
                            }
                        }else{
                            tnode=last;
                        }
                        if(ishotrow){
                            if(!cell){
                                var row=profile.rowMap[profile.getSubId(src)];
                                if(!row)return false;
                            }
                            var colId = xui.get(cell,['_col','id']);
                            var addhotrow = profile.box._checkNewLine(profile,'keydown',colId);
                            if(addhotrow){
                                // focus to new hotrow, dont focus to next cell
                                if(profile.__hastmpRow)
                                    return false;
                            }
                        }
                        if(tnode)tnode.focus(true);
                    },
                    toDown=function(){
                        var tnode;
                        if(src!=last.xid()){
                            if(cur.get(0)==last11.get(0) || cur.get(0)==last21.get(0)){
                                if(hasBody12){
                                    tnode = first12;
                                }else{
                                    tnode=first22;
                                }
                            }
                            if(!tnode){
                                tnode=verticalNav();
                                tnode=tnode[0];
                            }
                        }else{
                            tnode=first;
                        }

                        if(ishotrow){
                            if(!cell){
                                var row=profile.rowMap[profile.getSubId(src)];
                                if(!row)return false;
                            }
                            var colId = xui.get(cell,['_col','id']);
                            var addhotrow = profile.box._checkNewLine(profile,'keydown',colId);
                            if(addhotrow){
                                // focus to new hotrow, dont focus to next cell
                                if(profile.__hastmpRow)
                                    return false;
                            }
                        }
                        if(tnode)tnode.focus(true);
                    };
                    switch(key){
                    //tab to next/pre
                    case 'tab':
                        if(shift){
                            if(false===toLeft(ishotrow)){
                                return false;
                            }
                        }else{
                            if(false===toRight(ishotrow)){
                                return false;
                            }
                        }
                        break;
                    case 'left':
                        if(false===toLeft(true)){
                            return false;
                        }
                        break;
                    case 'right':
                        if(false===toRight(true)){
                            return false;
                        }
                        break;
                    case 'up':
                        if(ctrl){
                            if(row && !(p.disabled || row.disabled) && (row.group||row.sub)){
                                profile.box._getToggleNode(profile, row._serialId).onClick();
                                return false;
                            }
                        }
                        toUp();
                        return false;
                        break;
                    case 'down':
                        if(ctrl){
                            if(row && !(p.disabled || row.disabled) &&  (row.group||row.sub)){
                                profile.box._getToggleNode(profile, row._serialId).onClick();
                                return false;
                            }
                        }
                        toDown();
                        return false;
                        break;
                    }
                },
                onContextmenu:function(profile, e, src){
                    if(profile.onContextmenu){
                        var sid=profile.getSubId(src);
                        // cell or row
                        return profile.boxing().onContextmenu(profile, e, src,sid?(profile.cellMap[sid]||profile.rowMap[sid]):null)!==false;
                    }
                }
            },
            CMD:{
                onFocus:function(profile,e,src){
                  return false;
                },
                onClick:function(profile,e,src){
                    var p=profile.properties,
                        id=xui.use(src).id().split('_'),
                        cmdkey=id[id.length-1];
                    id.pop();
                    var row = profile.rowMap[profile.getSubId(id.join("_"))];
                    if(p.disabled|| (row&&row.disabled))return false;

                    if(profile.onCmd)
                        profile.boxing().onCmd(profile,row, cmdkey, e, src);
                    return false;
                }
            }
        },
        DataModel:{
            directInput:true,
            listKey:null,
            currencyTpl:"$ *",
            numberTpl:"",
            valueSeparator:";",
            activeRow:{
                hidden:true,
                ini:null
            },
            activeCell:{
                hidden:true,
                ini:null
            },
            rowMap:{
                hidden:true,
                ini:null
            },
            selMode:{
                ini:'none',
                listbox:['single','none','multi','multibycheckbox'],
                action:function(value){
                    this.getSubNodes(['HFMARK','MARK'],true).css('display',(value=='multi'||value=='multibycheckbox')?'':'none');
                }
            },
            editMode:{
                ini:'focus',
                listbox:["focus","sharp","hover","hoversharp","inline"]
            },
            dock:'fill',
            togglePlaceholder:false,
            isFormField:{
                hidden:true,
                ini:false
            },
            altRowsBg: {
                ini:false,
                action:function(value){
                    var ns=this;
                    var altCls = ns.getClass('CELLS1', '-alt'),
                        nodes21 = ns.getSubNode('CELLS1',true),
                        nodes22 = ns.getSubNode('CELLS2',true),
                        j,o1,o2,alt;
                    nodes21.removeClass(altCls);
                    nodes22.removeClass(altCls);
                    if(value){
                        alt=[];
                        j=0;
                        nodes22.each(function(o2,i){
                            if(o2.clientHeight){
                                o2=xui([o2]);
                                o1=xui([nodes21.get(i)]);
                                if((j++)%2==1){
                                    if(!o1.hasClass(altCls))o1.addClass(altCls);
                                    if(!o2.hasClass(altCls))o2.addClass(altCls);
                                }else{
                                    if(o1.hasClass(altCls))o1.removeClass(altCls);
                                    if(o2.hasClass(altCls))o2.removeClass(altCls);
                                }
                            }
                        });
                    }
                }
            },
            rowNumbered:{
                ini:false,
                action:function(value){
                    var ns=this,
                        f=ns.CF.getNumberedStr||function(a){return a},
                        nodes = ns.getSubNode('ROWNUM',true),
                        i=0,
                        map=ns.rowMap,
                        row,ol=0,l=0,a1=[],a2=[],tag='',temp,t;

                    nodes.css('display',value?'':'none');
                    if(value)
                        nodes.each(function(o){
// for perfomance: remove this
//                            if(o.parentNode.clientHeight){
                            if((row=map[ns.getSubId(o.id)])&&row.id!=ns.box._temprowid){
                                l=row._layer;
                                if(l>ol){
                                    a1.push(i);
                                    a2.push(tag);
                                    tag=tag+i+'.';
                                    i=0;
                                }else if(l<ol){
                                    while(l<ol--){
                                        i=a1.pop();
                                        tag=a2.pop();
                                    }
                                }
                                i++;
                                ol=l;
                                //o.innerHTML=''+tag+i;
                                row._autoNumber=f(tag+i);
                                temp=row.rowNumber||row._autoNumber;
                                if(t=o.firstChild){
                                    if(t.nodeValue!=temp)
                                        t.nodeValue=temp;
                                }else
                                    o.appendChild(document.createTextNode(temp));
                            }
//                            }
                        });
                    else
                        nodes.text('');
                }
            },
            editable:false,
            firstCellEditable:false,

            $subMargin:'1.375em',

            iniFold:true,
            animCollapse:false,

            position:'absolute',
            width:'25em',
            height:'18em',

            _minColW:'.5em',
            _maxColW:'25em',
            _minRowH:'1.83333em',

            gridHandlerCaption:{
                ini:"",
                action:function(v){
                    v=(xui.isSet(v)?v:"")+"";
                    this.getSubNode('GRIDCAPTION').html(xui.adjustRes(v,true));
                }
            },
            rowHandlerWidth: {
                $spaceunit:1,
                ini:'5em',
                set:function(value){
                    var o=this;
                    if(o.renderId)
                        o.box._setRowHanderW(o,value);
                    else
                        o.properties.rowHandlerWidth=value;
                }
            },

            showHeader:{
                ini:true,
                action:function(value){
                    this.getSubNodes(['HEADER1','HEADER2']).css('display',value?'':'none');
                }
            },
            headerHeight:{
                $spaceunit:1,
                ini:'2em',
                action:function(v){
                    var profile=this,
                        prop=profile.properties;
                    profile.box._adjustColsHeight(profile);
                    profile.adjustSize();
                }
            },
            rowHeight:{
                $spaceunit:1,
                ini:'2em',
                action:function(v){
                    this.box._adjusteditorH(this, this.getSubNodes(['CELLS1','CELLS2'], true).height(v),v);
                }
            },
            _colDfWidth: '8em',

            rowHandler:{
                ini:true,
                action:function(value){
                    this.getSubNode('FHCELL').css('display',value?'':'none');
                    this.getSubNode('FCELL',true).css('display',value?'':'none');

                    this.box._adjustColsWidth(this);
                    this.box._adjustBody(this,'rowhandler');
                }
            },
            rowResizer:{
                ini:false,
                action:function(value){
                    this.getSubNode('FHANDLER',true).css('display',value?'':'none');
                }
            },

            colHidable:false,
            colResizer:{
                ini:true,
                action:function(value){
                    this.getSubNode('HHANDLER',true).css('display',value?'':'none');
                }
            },
            colSortable:{
                ini:true,
                action:function(value){
                    if(!value)
                        this.getSubNode('SORT',true).css('display','none');
                }
            },
            colMovable:false,

            header:{
                ini:{},
                set:function(value){
                    var o=this;
                    if(o.renderId){
                        o.boxing()._refreshHeader(value);
                    }else
                        o.properties.header = xui.copy(value);
                }
            },
            uidColumn:'',
            grpCols:{
                //for default merge
                ini:{},
                set:function(value){
                    var o=this;
                    o.properties.grpCols = xui.copy(value);
                    if(o.renderId){
                        o.boxing()._refreshHeader(xui.clone(o.properties.header,false,2));
                    }
                }
            },
            rows:{
                //for default merge
                ini:{},
                set:function(value){
                    var o=this;
                    if(o.renderId)
                        o.boxing().removeAllRows(false).insertRows(value);
                    //use copy to avoid outer memory link
                    else
                        o.properties.rows = xui.copy(value);
                }
            },
            // can be se dynamic only
            rawData:{
                ini:[],
                set:function(value){
                    if(!value || !xui.isArr(value) || !value.length){
                        this.boxing().removeAllRows();
                        return;
                    }
                    var o=this,cols={},header=[],rowdata=[],cellsArr=[],i,j,l=value.length,hash,
                        ins=o.boxing(),
                        oheader = ins.getHeader('min');
                    // collect data
                    for(i=0;i<l;i++){
                        if(!xui.isHash(hash=value[i])){
                            continue;
                        }
                        for(var k in hash){
                            if(k=="__row__id"){
                                rowdata[i] = rowdata[i]||{};
                                rowdata[i].id = hash[k];
                            }else if(k.indexOf("__row__")==0){
                                rowdata[i] = rowdata[i]||{};
                                rowdata[i][k] = hash[k];
                            }else{
                                if(!(k in cols))cols[k]=[];
                                cols[k][i] = hash[k];
                            }
                        }
                    }
                    // if no header
                    if(oheader==null || oheader.length==0){
                        for(var k in cols)
                           header.push(k);
                        ins.setHeader(header)
                    }else{
                        var ex;
                        header = ins.getHeader('data');
                        for(var k in cols){
                            // if has extra key
                            if(xui.arr.indexOf(oheader, k)==-1){
                                header.push({id:k,caption:"["+k+"]"});
                                ex=1;
                            }
                        }
                        if(ex)ins.setHeader(header, true);
                    }
                    header = ins.getHeader();

                    var map={};
                    xui.arr.each(header, function(o,i){
                        map[o.id] = i;
                    });
                    //convert to header / cellsArr
                    for(var k in cols){
                        if(k in map){
                            j=map[k];
                            for(i=0;i<l;i++){
                                if(!cellsArr[i])cellsArr[i]=[];
                                cellsArr[i][j]=cols[k][i];
                            }
                        }
                    }
                    // set row id&other
                    if(rowdata.length){
                        xui.each(cellsArr,function(cells, i){
                            if(rowdata[i]){
                                cellsArr[i]=rowdata[i];
                                cellsArr[i].cells=cells;
                            }
                        });
                    }
                    ins.setRows(cellsArr);
                },
                get:function(row, splitMixColumn){
                    var o=this, prop=o.properties, header=prop.header,
                        tid=this.box._temprowid,
                        one = row&&row.cells&&xui.isArr(row.cells),
                        rows=  one ? [row] : xui.isArr(row)&&row[0]&&row[0].cells&&xui.isArr(row[0].cells) ? row: prop.rows,
                        l=header.length, h=rows.length,
                        columns=[],cell,key,keys,
                        data=[];

                    if(h){
                        for(var i=0;i<l;i++){
                            columns.push(header[i].id);
                        }
                        for(var j=0;j<h;j++){
                            //ignore temp row for all rows
                            if(!one && rows[j].id==tid)continue;
                            if(rows[j].group || !rows[j].cells)continue;

                            var hash={};
                            for(var i=0;i<l;i++){
                                key = columns[i];
                                cell = rows[j].cells[i]
                                if(splitMixColumn && key.indexOf(":")!=-1){
                                    keys=key.split(':');
                                    hash[keys[0]]=('value' in cell)?cell.value:cell;
                                    hash[keys[1]]=('caption' in cell)?cell.caption:null;
                                }else{
                                    hash[key.split(':')[0]]=('value' in cell)?cell.value:cell;
                                }
                            }
                            hash["__row__id"]=rows[j].id;
                            for(var i in rows[j]){
                                if(i.indexOf("__row__")===0){
                                    hash[i] = rows[j][i];
                                }
                            }
                            data.push(hash);
                        }
                    }
                    return one?data[0]:data;
                }
            },
            dataset:{
                ini:{},
                get:function(){
                     var prf=this, ins=prf.boxing(),prop=prf.properties;
                     return {
                        name:prop.gridHandlerCaption,
                        dimensions:ins.getHeader('min'),
                        source:ins.getRows('min')
                     };
                },
                set:function(v){
                    var prf=this, ins=prf.boxing(), prop=prf.properties;
                    var dataset = xui.isFun(v.getDataset)?v.getDataset():v;
                    if((v=prop.tagVar.datasetAdapter) && xui.isFun(v))dataset=v.call(ins, dataset,prf);
                    if((v=ins.datasetAdapter) && xui.isFun(v))dataset=v.call(ins, dataset,prf);
                    if(ins.beforeApplyDataset && false===ins.beforeApplyDataset(prf, dataset)){}else{
                        if('name' in dataset)ins.setGridHandlerCaption(dataset.name);
                        if('dimensions' in dataset)ins.setHeader(dataset.dimensions);
                        if('source' in dataset)ins.setRows(dataset.source);
                    }
                }
            },
            tagCmds:{
                ini:[],
                action:function(){
                    this.boxing().refresh();
                }
            },
            activeMode:{
                ini:'row',
                listbox:['row','cell','none'],
                action:function(value){
                    var profile=this;
                    if(value!='cell' && profile.$activeCell){
                        xui(profile.$activeCell).tagClass('-active',false);
                        delete profile.$activeCell;
                    }
                    if(value!='row' && profile.$activeRow){
                        xui(profile.$activeRow).tagClass('-active',false);
                        delete profile.$activeRow;
                    }
                }
            },

            rowOptions:{
                ini:{},
                action:function(value){
                    var ins=this.boxing(),
                        rows=ins.getRows('data');
                    ins.removeAllRows();
                    ins.insertRows(rows);
                }
            },
            colOptions:{
                ini:{},
                action:function(value){
                    var ins=this.boxing(),
                        rows=ins.getRows('data');
                    ins.removeAllRows();
                    ins.insertRows(rows);
                }
            },
            treeMode:{
                ini:'inhandler',
                // compitable: false->'none'; true->inhanlder
                listbox:['none','inhandler','infirstcell'],
                action:function(value, ovalue){
                    if((ovalue=='inhandler' && value=='infirstcell')||(ovalue=='infirstcell' && value=='inhandler')){
                        this.boxing().refresh();
                    }else{
                        this.getSubNodes(['ROWLRULER', 'ROWTOGGLE'],true).css('display',value?'':'none');
                    }
                }
            },
            freezedColumn:{
                ini:0,
                action:function(){
                    this.boxing().refresh();
                    this.box._adjustColsWidth(this);
                }
            },
            freezedRow:{
                ini:0,
                action:function(){
                    this.boxing().refresh();
                }
            },
            hotRowMode:{
                ini:'hidden',
                listbox:['hidden'/*none*/,'before','after'/*auto, show*/],
                action:function(value){
                    if(this.renderId){
                        if(value=='hidden')
                            this.boxing().removeHotRow();
                        else
                            this.box.__ensurehotrow(this,null);
                    }
                }
            },
            excelCellId:{
                ini:"",
                action:function(){
                    this.boxing().notifyExcel(false);
                }
            },
            gridValueFormula:"",
            hotRowNumber:'[*]',
            hotRowCellCap:'(*)',
            hotRowRequired:'',
            noCtrlKey:true
        },
        EventHandlers:{
            onBodyLayout:function(profile, trigger){},
            beforeApplyDataset:function(profile, dataset){},

            beforeCellKeydown:function(profile,cell,keys){},
            afterCellFocused:function(profile, cell, row){},

            beforeInitHotRow:function(profile){},
            onInitHotRow:function(profile,row){},

            beforeHotRowAdded:function(profile, cellMap, row, leaveGrid){},
            afterHotRowAdded:function(profile, row){},

            onGetContent:function(profile, row, callback){},
            onRowSelected:function(profile, row, e, src, type){},
            onCmd:function(profile, row, cmdkey, e, src){},

            beforeFold:function(profile,item){},
            beforeExpand:function(profile,item){},
            afterFold:function(profile,item){},
            afterExpand:function(profile,item){},

            beforeColDrag:function(profile, colId){},
            beforeColMoved:function(profile, colId, toId){},
            afterColMoved:function(profile, colId, toId){},
            beforeColSorted:function(profile, col){},
            afterColSorted:function(profile, col){},

            beforeColShowHide:function(profile,colId,flag){},
            afterColShowHide:function(profile,colId,flag){},
            beforeColResized:function(profile,colId,width){},
            afterColResized:function(profile,colId,width){},
            beforeRowResized:function(profile, rowId, height){},
            afterRowResized:function(profile, rowId, height){},

            beforePrepareRow:function(profile, row, pid){},
            beforePrepareCol:function(profile,  col){},

            beforeRowActive:function(profile, row){},
            afterRowActive:function(profile, row){},
            beforeCellActive:function(profile, cell, row, col){},
            afterCellActive:function(profile, cell, row, col){},

            beforeCellUpdated:function(profile, cell, options, isHotRow, extOpt, row, col){},
            afterCellUpdated:function(profile, cell, options, isHotRow, extOpt, row, col){},
            beforeRowUpdated:function(profile, row, options, isHotRow){},
            afterRowUpdated:function(profile, row, options, isHotRow){},

            onRowDirtied:function(profile, row){},

            onRowHover:function(profile, row, hover, e, src){},
            onClickHeader:function(profile, col, e, src){},
            onClickRow:function(profile, row, e, src){},
            onClickRowHandler:function(profile, row, e, src){},
            onDblclickRow:function(profile, row, e, src){},
            onClickCell:function(profile, cell, e, src, row, col){},
            onDblclickCell:function(profile, cell, e, src, row, col){},
            onClickGridHandler:function(profile, e, src){},

            beforeIniEditor:function(profile, cell, cellNode, pNode, type, row, col){},
            onBeginEdit:function(profile, cell, editor, type, row, col){},
            beforeEditApply:function(profile, cell, options, editor, tag, type, row, col){},
            onEndEdit:function(profile, cell, editor, type, row, col){},

           // Editors' default events
            onFileDlgOpen:function(profile, cell, editorPrf, src,row,col){},
            beforeComboPop:function(profile, cell, editorPrf, pos, e, src,row,col){},
            beforePopShow:function(profile, cell, editorPrf, popCtl, items,row,col){},
            afterPopShow:function(profile, cell, editorPrf, popCtl,row,col){},
            onCommand:function(profile, cell, editorPrf, src, type,row, col){},
            onEditorClick:function(profile, cell, editorPrf, type, src, row ,col){},
            beforeUnitUpdated:function(profile, cell, editorPrf, type, row, col){},

            // beforeApplyGridExcelFormula
            // afterApplyGridExcelFormula
            beforeApplyFormula:function(profile, cell, value, formula, row, col){},
            afterApplyFormulas:function(profile, dataArrs){},
            beforeGridValueCalculated:function(profile){},
            afterGridValueCalculated:function(profile, value){},

            onGetExcelCellValue:function(profile, excelCellId, dftValue){}
        },
        RenderTrigger:function(){
            var ns=this,
                box=ns.box,
                prop=ns.properties,
                ins=ns.boxing(),
                getPro=box.getCellOption;

            ns.destroyTrigger=function(){
                var ns=this, prop=ns.properties;
                xui.each(ns.cellMap,function(cell){
                    if(cell._editor)cell._editor.destroy();
                });
                xui.breakO([ns.colMap, ns.rowMap, ns.cellMap], 3);
                prop.header.length=0;
                prop.rows.length=0;
                prop.grpCols.length=0;
            };
            ns.$cache_editor={};
            if(!prop.iniFold)
                ins._toggleRows(prop.rows,true);
            // trigger render
            xui.arr.each(prop.header,function(o){
                if(xui.isFun(o.colRenderer||prop.colOptions.colRenderer))
                    (o.colRenderer||prop.colOptions.colRenderer).call(null,ns,o);
            });
            // move it manually
            if(prop.treeMode=='infirstcell'){
                ns.getSubNode('HCELLA', prop.header[0]._serialId).prepend(
                    ns.getSubNode('LTAGCMDS')
                ).prepend(
                    ns.getSubNode('HFMARK')
                );
            }
            xui.arr.each(prop.rows,function(o){
                if(xui.isFun(o.rowRenderer||prop.rowOptions.rowRenderer))
                    (o.rowRenderer||prop.rowOptions.rowRenderer).call(null,ns,o);
                    if(false===getPro(ns, o, "iniFold"))
                        ins._toggleRows([o],true);
            });

            ns.box.__ensurehotrow(ns,null);

            xui.each(ns.cellMap,function(o){
                   if(getPro(ns, o, "editable") &&
                       (getPro(ns, o, "editMode")=="inline" || getPro(ns, o, "type")=='dropbutton' ))
                        box._editCell(ns,o);
            });

            if(prop.excelCellId)
                ns.boxing().calculateGridValue();
        },
        LayoutTrigger:function(){
            var ns=this, box=ns.box, prop=ns.properties,ins=ns.boxing();
            if(xui.isArr(prop.grpCols)){
                xui.arr.each(prop.grpCols,function(o){
                    if(xui.isFun(o.colRenderer||prop.colOptions.colRenderer))
                        (o.colRenderer||prop.colOptions.colRenderer).call(null,ns,o);
                });
                box._adjustColsHeight(ns);
            }
            ns.box._asy(ns);
            ns.box._adjustBody(ns,'render');
        },
        _tplMap:{'text':'.text','button':'.button','image':'.image'},
        _tplMap2:{'textarea':'.textarea','checkbox':'.checkbox','button':'.button','progress':'.progress'},
        _focusEvent:function(profile, e, src){
            var ins=profile.boxing(),
                prop=profile.properties,
                cell=profile.cellMap[profile.getSubId(src)],
                row;

            profile.box._focuscell(profile, e, src);

            if(profile.afterCellFocused){
                if(cell)
                    row=cell._row;
                else
                    row=profile.rowMap[profile.getSubId(src)];
                ins.afterCellFocused(profile, cell, row);
            }
            // to check hot row
            if(prop.editable && (prop.hotRowMode||'hidden')!='hidden'){
                var cell=profile.cellMap[profile.getSubId(src)],row;
                if(cell)
                    row=cell._row;
                else
                    row=profile.rowMap[profile.getSubId(src)];
                if(profile.__hastmpRow && profile.__needchecktmprow && row.id!==profile.box._temprowid)
                    profile.box._checkNewLine(profile,'focuscell');
            }
        },
        __ensurehotrow:function(profile,focusPos){
            var prop=profile.properties;
            if(!profile.box || !profile.renderId|| !prop.editable ||  (prop.hotRowMode||'hidden')=="hidden")return;
            profile.box._addTempRow(profile,focusPos);
        },
        _temprowid:'_ r _temp_',
        isHotRow:function(row){
            return row && (row.id||row)===this._temprowid;
        },
        _addTempRow:function(profile,focusPos, pid, baseRow){
            var prop=profile.properties;
            if(prop.readonly || prop.disabled  || !prop.editable || !prop.header || prop.header.length<=0)
                return false;

            delete profile.__hastmpRow;
            profile.boxing().removeRows([this._temprowid],false);

            if(profile.beforeInitHotRow && false===profile.boxing().beforeInitHotRow(profile))
                return false;

            profile.__needchecktmprow=true;

            var required = profile.box._getRequiredCols(profile);
            var cells=[],
                row={cells:cells},
                newcell={caption:prop.hotRowCellCap},
                ins=profile.boxing(),cell;
            xui.arr.each(prop.header,function(col, i){
                if(xui.isSet(col.defaultValue)){
                   cell={value: col.defaultValue};
                }else if(xui.isSet(col.tagVar && col.tagVar.defaultValue)){
                   cell={value: col.tagVar.defaultValue};
                }else if(required.length && xui.arr.indexOf(required, col.id)!=-1){
                    // must hash for mix column
                    cell=newcell;
                }else cell={};
                cells.push(cell);
            });

            if(profile.onInitHotRow){
                row=ins.onInitHotRow(profile,row)||row;

                if(xui.isArr(row)) row={cells:row};
                else if(!xui.isHash(row)) row={cells:[row]};
            }

            // gives a special id
            row.id = this._temprowid;
            row.rowNumber=prop.hotRowNumber;
            row.rowClass=profile.getClass('CELLS2', '-hot');

            ins.insertRows([row],pid||null,baseRow||null,prop.hotRowMode=="before",true,false);

            profile.__hastmpRow=true;

            // focus to next cell
            if(focusPos){
                ins.focusCellbyRowCol(row.id, focusPos);
            }
        },
        _getRequiredCols:function(profile){
            var prop=profile.properties;
            var required=(prop.hotRowRequired||"").split(prop.valueSeparator);
            xui.each(profile.colMap,function(o){
                if(o.required)required.push(o.id);
            });
            xui.filter(required,function(v){return !!xui.str.trim(v)});
            if(!required.length){
                xui.arr.each(prop.header,function(col){
                    if(!col.hidden){
                        required.push(col.id);
                        return false;
                    }
                });
            }
            return required;
        },
        _checkNewLine:function(profile,trigger, colId){
            var prop=profile.properties;
            if(!prop.editable)return;

            profile.box._sethotrowoutterblur(profile,true);

            // checked already
            if(!profile.__hastmpRow)
                return;

            delete profile.__needchecktmprow;

            var ins=profile.boxing(),
                rowId=this._temprowid,t,
                // must be map row
                tempRow=ins.getRowbyRowId(rowId, 'map', true),
                hotRowO = ins.getRowbyRowId(rowId),
                pid = hotRowO._pid,
                hhot = (prop.hotRowMode||'hidden')=="hidden";
            if(!tempRow)
                return;
            delete tempRow["__row__id"];
            var required = profile.box._getRequiredCols(profile);
            if(required.length){
                for(var i=0,j,cell,l=required.length;i<l;i++){
                    j=xui.arr.subIndexOf(prop.header, 'id',required[i]);
                    if( j!=-1 && !((t=xui.isHash(cell=tempRow[required[i].split(':')[0]]) ? cell.value : cell) || t===0) ) {
                        // no required field
                        return;
                    }
                }
            }else{
                var hasValue;
                for(var i in tempRow) {
                    if(tempRow[i]||tempRow[i]!==0){
                        hasValue=1;
                        break;
                    }
                }
                // no any value
                if(!hasValue)
                    return;
            }
            var result=!!trigger,
                tempRowData=ins.getRowbyRowId(rowId, 'data', true);
            // clear temp data
            delete tempRowData.id; delete tempRowData.rowClass; delete tempRowData.rowNumber;
            xui.arr.each(tempRowData.cells, function(cell){
                if(cell.id.indexOf('-c_')==0)delete cell.id;
                if(cell.caption===prop.hotRowCellCap)delete cell.caption;
            });

            if(profile.beforeHotRowAdded){
                var result2=ins.beforeHotRowAdded(profile, tempRow, tempRowData, !trigger);
                if(xui.isDefined(result2))
                    result=result2===true?result2:result2===false?result2:null;
            }

            // do nothing
            if(result===null){
                if(hhot)
                    profile.box._sethotrowoutterblur(profile);
                return false;
            }
            // remove the hot row
            else if(result===false){
                if(hhot){
                    delete profile.__hastmpRow;
                    ins.removeRows([rowId],false);
                }
                // dont add new hot row
                return false;
            }
            // add a new row
            else if(result===true){
                var newRow = ins.insertRows(tempRowData,pid,rowId,true,true,true);
                delete profile.__hastmpRow;
                ins.removeRows([rowId],false);

                tempRow = newRow[0];
                tempRow._dirty=1;
                if(profile.afterHotRowAdded)
                    ins.afterHotRowAdded(profile, tempRow);

                if(!hhot){
                    if(!profile.__hastmpRow)
                        this._addTempRow(profile,colId,pid,tempRow.id);
                }
                return tempRow;
            }
            // focus the invalid cell, and keep this hot row
            else{
                profile.__needchecktmprow=true;
                // if returns cell
                if(xui.isHash(result))
                    ins.focusCell(result);
                // if return cell id
                else
                    ins.focusCell(ins.getCell(result));

                profile.box._sethotrowoutterblur(profile);
                // dont add new hot row
                return false;
            }
        },
        _sethotrowoutterblur:function(profile, clear){
            var f=function(k){return profile.getSubNode(k).get(0) },k="__tmpRowBlurTrigger";
            profile.getSubNode('ROWS22').setBlurTrigger(profile.$domId+':ROWS22');
            if(profile[k]){
                xui.clearTimeout(profile[k]);
                delete profile[k];
            }
            if(!clear){
                profile.getSubNode('ROWS22').setBlurTrigger(profile.$domId+':ROWS22',function(pos,e){
                    profile[k]=xui.asyRun(function(){
                        // destroyed
                        if(profile.box)
                            profile.box._checkNewLine(profile,"blur");
                        xui.clearTimeout(profile[k]);
                        delete profile[k];
                    });
                },xui([f('SCROLL11'),f('SCROLL12'),f('SCROLL21'),f('SCROLL22')]),null,true);
            }
        },
        _cacheRows:function(profile){
            var all1=profile.getSubNodes('CELLS1',true).get(),
                all2=profile.getSubNodes('CELLS2',true).get();
            //filter dispaly==none
            xui.filter(all1,function(o){
                return !!o.clientHeight;
            });
            xui.filter(all2,function(o){
                return !!o.clientHeight;
            });
            profile.$allrowscache1 = all1;
            profile.$allrowscache2 = all2;
        },
        _asy:function(profile){
            var prop=profile.properties,b=profile.boxing(),id=profile.$xid;
            if(prop.altRowsBg)xui.resetRun(id+"1",function(){if(profile.rowMap)b.setAltRowsBg(true,true)});
            if(prop.rowNumbered)xui.resetRun(id+"2",function(){if(profile.rowMap)b.setRowNumbered(true,true)});
        },
        _setRowHanderW:function(profile, flag){
            var prop=profile.properties,
                ww=profile._$subMargin || (profile._$subMargin=profile.$px(prop.$subMargin)),
                map=profile.rowMap,
                hcell=profile.getSubNode('FHCELL'),
                n,w;
            if(xui.isFinite(flag) || profile.$isEm(flag)|| profile.$isPx(flag))
                w=profile.$forceu(flag);
            else if(flag===true){
                var ws=[],t;
                profile.getSubNode('FCELLCAPTION',true).each(function(o){
                    if((t=o.parentNode).parentNode.offsetHeight>0 && xui.Dom.getStyle(t,'overflow')!='visible')
                        if(n=map[profile.getSubId(o.id)])
                            ws.push(xui([o]).width() + n._layer*ww);
                });
                ws.push(profile.$px(prop._minColW));
                w=profile.$forceu(Math.max.apply(null,ws)+ww*2);
            }else
                w=profile.$forceu(hcell.width());

            //set width
            if(w){
                if(profile.$px(w)<profile.$px(prop._minColW))w=profile.$em(prop._minColW)+'em';
                if(profile.$px(w)<=0)return;
                if(prop.rowHandlerWidth!=w){
                    hcell.width(prop.rowHandlerWidth=w);
                    profile.getSubNode('FCELL',true).width(w);
                    profile.getSubNode('GCELL',true).width(w);

                    /*
                    profile.getSubNode('ROWLRULER',true).each(function(o){
                        n=map[profile.getSubId(o.id)];
                        o.style.width=(4 + n._layer*ww)+'px';
                    });
                    */
                    profile.box._adjustColsWidth(profile);
                    profile.box._adjustBody(profile,'rowhandler');
                }
            }
        },
        _onStartDrag:function(profile, e, src){
            var row = profile.rowMap[profile.getSubId(src)];
            if(row && row.id==profile.box._temprowid)return false;

            var pos=xui.Event.getPos(e);
            profile.$_ond=src;
            xui.use(src).startDrag(e, {
                dragSource:profile.$xid,
                dragType:'icon',
                shadowFrom:xui.use(src).parent()._get(0),
                targetLeft:pos.left+12,
                targetTop:pos.top+12,
                dragCursor:'pointer',
                dragDefer:2,
                dragKey: profile.box.getDragKey(profile, src),
                dragData: profile.box.getDragData(profile, e, src)
            });
            return false;
        },
        _onDropTest:function(profile, e, src, key, data, item){
            var fid=data&&data.domId, tid=src, fp=data&&data.profile,t;
            if(tid){
                var k=profile.getKey(tid),
                    ks=profile.keys,
                    row=profile.rowMap[profile.getSubId(tid)];
                if(k==ks.FCELL && !row.sub)
                    return false;
                if(profile.properties.rowHandler){
                    if(k==ks.CELLS2||k==ks.SCROLL22)return false;
                }else{
                    if(k==ks.CELLS1||k==ks.SCROLL21)return false;
                }
            }
            if(fp && fp.$xid==profile.$xid){
                if(fid && profile.getSubId(fid)==profile.getSubId(tid))
                    return false;
                t=profile.$_ond;

                src=xui(src).get(0);
                if(xui.get(src,['parentNode','previousSibling'])==t)return false;
                do{
                    if(src==t){
                        src=t=null;
                        return false;
                    }
                }while(src && (src=src.parentNode) && src!==document && src!==window)
                src=t=null;
            }
        },
        _onDragstop:function(profile, e, src, key, data, item){
            delete profile.$_ond;
        },
        _onDrop:function(profile, e, src, key, data, item){
            if(!data.profile || !data.profile[profile.KEY])return;
            var k = profile.getKey(src),
                po = data.profile,
                ps = data.domId,
                oitem,
                ks = profile.keys,
                t = xui.absObj.$specialChars,
                b = profile.boxing(),
                arr = xui.copy(b.getUIValue(true)),
                orow = po.rowMap[po.getSubId(ps)],
                row = profile.rowMap[profile.getSubId(src)];

            //remove
            orow=xui.clone(orow,function(o,i){return !t[(i+'').charAt(0)]});
            po.boxing().removeRows([orow.id]);

            //add
            if(k==ks.SCROLL21||k==ks.SCROLL22)
                b.insertRows([orow], null, null, false);
            else if((k==ks.FCELL) && row.sub)
                b.insertRows([orow], row.id, null, false);
            else if(k==ks.CELLS1||k==ks.CELLS2)
                b.insertRows([orow], row._pid, row.id, true);

            if(arr && arr.length){
                if(xui.arr.indexOf(arr, orow.id)!=-1){
                    b.setUIValue(arr,true,null,'drop');
                }
            }
            data._new = orow;
            return false;
        },

        _beforeSerialized:function(profile){
            var o=arguments.callee.upper.call(this, profile),
                pp=profile.properties,
                map=xui.absObj.$specialChars,
                op=o.properties,
                us=xui.$us(profile),
                unit=us==2?'em':us==-2?'px':null,
                t;
            op.header = xui.clone(pp.header, function(o,i,d,h){
                if(d===2&&i==='width'&& o && o!='auto'){
                    h[i] = profile.$forceu(o,unit);
                    return false;
                }else
                return !map[(i+'').charAt(0)]  && o!=undefined
            });
            op.grpCols = xui.clone(pp.grpCols, function(o,i,d,h){
                if(d===2&&i==='width'&& o && o!='auto'){
                    h[i] = profile.$forceu(o,unit);
                    return false;
                }else
                return !map[(i+'').charAt(0)]  && o!=undefined
            });
            op.rows = xui.clone(pp.rows, function(o,i,d,h){
                if(d===2&&i==='height'&& o && o!='auto'){
                    h[i] = profile.$forceu(o,unit);
                    return false;
                }else
                return !map[((d===1?o.id:i)+'').charAt(0)]  && o!=undefined && ((i=="id"&&typeof(o)=="string")?o.charAt(0)!="-":true);
            });
            if(xui.isEmpty(op.header))delete op.header;
            if(xui.isEmpty(op.grpCols))delete op.grpCols;
            if(xui.isEmpty(op.rows))delete op.rows;

            delete op.activeRow;
            delete op.activeCell;
            delete op.rawData;
            delete op.dataset;
            return o;
        },
        _clsCache:{},

        _colDragCheck:function(profile, src){
            var p=profile.properties,
                dd = xui.DragDrop.getProfile(), key=dd.dragKey, data=dd.dragData,
                col=profile.colMap[profile.getSubId(src)];
            if(!col || col._isgroup)return false;
            if(p.treeMode=='infirstcell' && p.header[0]==col)return false;
            if(!(col.hasOwnProperty('colMovable')?col.colMovable:profile.properties.colMovable))return false;
            if(!key || !data || key!=(profile.$xid+":col"))return false;
            if(data==xui.use(src).id() || data==xui.use(src).prev().id())return false;
        },
        _prepareData:function(profile){
            var data = arguments.callee.upper.call(this, profile),
                NONE='display:none',
                prop=profile.properties;

            // init row/cell cache
            profile.rowMap2 = {};
            profile.rowMap = {};
            profile.cellMap = {};

            data.showHeader=prop.showHeader?'':NONE;
            data.colDDDisplay=prop.colResizer?'':NONE;
            data.rowDDDisplay=prop.rowResizer?'':NONE;
            data.rowHandlerDisplay=prop.rowHandler?'':NONE;
            data.sortDisplay=NONE;
            data._rowMarkDisplay=(prop.selMode=="multi"||prop.selMode=="multibycheckbox")?"":"display:none;";

            if(!prop.header || !xui.isArr(prop.header))
                prop.header = [];
            if(!prop.grpCols || !xui.isArr(prop.grpCols))
                prop.grpCols = [];
            if(!prop.rows || !xui.isArr(prop.rows))
                prop.rows = [];

            if(prop.hotRowMode=="none")prop.hotRowMode="hidden";
            if(prop.hotRowMode!="hidden"&&prop.hotRowMode!="before")prop.hotRowMode="after";

            prop.header=this._adjustHeader(prop.header);
            data.header=this._prepareHeader(profile, prop.header);
            // for triggerring render
            data.header1=data.header2= data.header;
            prop.grpCols=this._adjustGrpColsData(profile,prop.grpCols);
            data.grpCols=this._prepareGrpCols(profile, prop.grpCols, data.header);
            // for triggerring render
            data.grpCols1=data.grpCols2=data.grpCols;
            data._row0DfW=data.rowHandlerWidth?('width:'+profile.$forceu(data.rowHandlerWidth)):'';

            // make sure its' size
            if(profile.$isEm(prop.headerHeight))data.headerHeight = profile.$forceu(profile.$px(prop.headerHeight,0,true),'em');
            if(profile.$isEm(prop.rowHeight))data.rowHeight = profile.$forceu(profile.$px(prop.rowHeight,0,true),'em');
            if(profile.$isEm(prop.rowHandlerWidth))data.headerHeight = profile.$forceu(profile.$px(prop.rowHandlerWidth,0,true),'em');

            arguments.callee.upper.call(this, profile);

            prop.rows=this._adjustRows(profile, prop.rows);
            data.rows11 = data.rows12 = data.rows21 = data.rows22 = this._prepareItems(profile, prop.rows);

            data.tagCmds = xui.clone(prop.colOptions.tagCmds || data.tagCmds);
            if(data.tagCmds){
                this._prepareCmds(profile, data, function(cmd){
                    return !cmd.tag || !!cmd.tag.match(/\bheader\b/) || !cmd.tag.match(/\brow\b/);
                });
            }
            data._columnfreezed = prop.freezedColumn?'xui-ui-shadow-r xui-uiborder-r xui-uiborder-dark':'';
            data._rowfreezed = prop.freezedRow?'xui-ui-shadow-b xui-uiborder-b xui-uiborder-dark':'';

            return data;
        },
        _parepareCol:function(profile,col,cols,index){
            // build header
            var SubID=xui.UI.$tag_subId,
                prop=profile.properties,
                headerHeight=profile.$px(prop.headerHeight),
                borderH=profile._$cache.hasOwnProperty('_root_b_h') ? profile._$cache._root_b_h : (profile._$cache._root_b_h = profile.getRoot().contentBox()?2:0),
                NONE='display:none',iid,
                ii=1,tt,
                oid, uicol;

            if(!xui.isHash(col)){
                oid = col + "";
                col={id : oid};
            }else{
                oid = col.id +"";
            }

            // links
            col._cells={};
            iid = profile.pickSubId('header');
            col[SubID]='-h_'+iid;

            col.id = col.id || iid;
            if(col.id.charAt(0)=="_" && col.hidden!==false){
                col.hidden=true;
            }
            while((tt=xui.arr.subIndexOf(cols,"id",col.id) )!= -1 && tt!==index){
                col.id = iid + (ii++);
            }

            profile.colMap[col[SubID]]=col;

            var _ww=profile.$px(col.width)||profile.$px(prop._colDfWidth);
            if('relWidth' in col){
                col.flexSize = col.relWidth
                delete col.relWidth;
            }
            // width
            if(!col.flexSize){
                if(col.hasOwnProperty('minWidth'))_ww=Math.max(_ww, profile.$px(col.minWidth));
                if(col.hasOwnProperty('maxWidth'))_ww=Math.min(_ww, profile.$px(col.minWidth));
            }

            col.width = col._cellWidth = col._colWidth = profile.$forceu(_ww);
            col._hcellheight=profile.$forceu(headerHeight-borderH);

            uicol={
                sortDisplay : NONE,
                rowHandlerDisplay : prop.rowHandler?'':NONE
            };
            uicol[SubID]=col[SubID];
            uicol._tabindex=prop.tabindex;
            uicol.colDDDisplay = (('colResizer' in col)?col.colResizer:prop.colResizer)?'':NONE;

            //if(col.flexSize)uicol.colDDDisplay = NONE;

            //  Forward-compatible with 'visibility'
            if(col.hasOwnProperty('visibility') && !col.hasOwnProperty('hidden'))
                col.hidden=!col.visibility;

            uicol.colDisplay = col.hidden===true?NONE:'';

            uicol.firstCellStyle=prop.colOptions.firstCellStyle||'';
            uicol.firstCellClass=prop.colOptions.firstCellClass||'';

            if(!col.type)col.type=prop.colOptions.type || 'input';
            if(!(('caption' in col) && xui.isDefined(col.caption)))col.caption = oid;
            col._for = "col";
            xui.UI.adjustData(profile, col, uicol, 'sub');

            // id to dom item id
            profile.colMap2[col.id]=col[SubID];

            return [col,uicol];
        },
        _prepareCell:function(profile,cell,row,col,temp,_row,index){
            // build header
            var ns=this,
                SubID=xui.UI.$tag_subId,
                prop=profile.properties,
                NONE='display:none',
                uicell={};
            cell=xui.isSet(cell) ? xui.isHash(cell) ? cell : {value:cell} :{};
            //cell/cell link to row
            cell._row=row;
            //cell/cell link to header
            cell._col=col;
            //_serialId
            cell[SubID]='-c_'+profile.pickSubId('cell');
            // give id
            cell.id=cell.id||cell[SubID];
            cell._for = "cell";
            // adjust
            ns._adjustCell(profile, cell, uicell);
            // cell only link its' dom item id to properties item
            profile.cellMap[uicell[SubID]]=cell;
            if(temp)temp.push(cell);
            // row link to cell/cell
            row._cells[col.id]=uicell[SubID];
            // header link to cell/cell
            col._cells[row.id]=uicell[SubID];

            // for _first_cell
            if(prop.treeMode=='infirstcell' && index===0 && _row){
                uicell._treeMode=_row._treeMode;
                uicell._rulerW=_row._rulerW;
                uicell._fi_togglemark=_row._fi_togglemark;
                uicell._rowMarkDisplay = _row._rowMarkDisplay;
                uicell._rowNumbDisplay = _row._rowNumbDisplay;
                uicell._ltagDisplay = _row._ltagDisplay;
                uicell.ltagCmds = _row.ltagCmds;
                uicell[xui.UI.$tag_subId_c]=_row[xui.UI.$tag_subId];
            }

            return [cell, uicell];
        },
        _prepareGrpCols:function(profile, arr, _header){
            var prop=profile.properties;
            if(prop.showHeader && arr && xui.isArr(arr)&& arr.length){
                var header=prop.header,
                    headerHeight=profile.$px(prop.headerHeight),
                    borderH=profile._$cache.hasOwnProperty('_root_b_h') ? profile._$cache._root_b_h : (profile._$cache._root_b_h = profile.getRoot().contentBox()?2:0),
                    SubID=xui.UI.$tag_subId,
                    NONE='display:none',
                    _ngrp=[],
                    _grp,w,h,_left,_ww,

                    layer=profile._headerLayers,
                    h=headerHeight/(layer+1),
                    flag=false;

                for(var j=0,m=arr.length,grp;j<m;j++){
                    _grp={};
                    w=0;
                    flag=false;
                    _left=0;//prop.rowHandler?(profile.$px(prop.rowHandlerWidth)+borderH):0;

                    grp=arr[j];
                    xui.UI.adjustData(profile, grp, _grp, 'sub');
                    for(var k=0,o,p;k<=grp['to'];k++){
                        o=header[k];p=_header[k];_ww=profile.$px(p._colWidth);
                        if(k===grp.from){
                            flag=true;
                            _grp._hcellleft=profile.$forceu(_left);
                        }
                        _left+= _ww + borderH;
                        if(flag && !o.hidden){
                            w += _ww + borderH;
                        }
                    }
                    _grp._colWidth = _grp._cellWidth = profile.$forceu(w -borderH);

                    _grp._hcellheight = profile.$forceu(h-borderH);
                    _grp._hcelltop = profile.$forceu(h*(grp._layer-1));

                    _grp._tabindex=prop.tabindex;
                    _grp.colDDDisplay = (('colResizer' in grp)?grp.colResizer:prop.colResizer)?'':NONE;

                    _ngrp.push(_grp)
                }

                // adjust base columns' height
                for(var k=0,n=header.length,o,p;k<n;k++){
                    o=header[k];p=_header[k];
                    if(o._grp && o._grp.length){
                        p._hcellheight=profile.$forceu(headerHeight - o._grp.length*h - borderH);
                    }
                }
                return _ngrp;
            }
        },
        _prepareHeader:function(profile, arr){
            var header=[], colResult;

            // init cols cache
            profile.colMap2 = {};
            profile.colMap = {};

            xui.arr.each(arr,function(o,i){
                if(profile.beforePrepareCol && false===profile.boxing().beforePrepareCol(profile, o)){
                    return;
                }
                colResult=profile.box._parepareCol(profile,o,arr,i);
                arr[i]=colResult[0];
                header.push(colResult[1]);
            });

            return header;
        },
        // to set uicell, or set dom node directly
        // uicell and node are not occur at the same time
        _renderCell:function(profile, cell, uicell, node,options){
            var getPro=profile.box.getCellOption,
                type=getPro(profile, cell, 'type'),
                t1='',
                t2='',
                caption,
                cellanode=node,
                capOut= uicell && xui.isStr(uicell._caption)?uicell._caption:uicell &&xui.isStr(cell.caption) ? uicell.caption : xui.isStr(cell.caption) ? cell.caption : null,
                reg1=/</g,
                dcls='xui-uicell-disabled',
                rcls='xui-ui-readonly',
                ren=function(profile,cell,uicell,fun,o){return (
                        // 1 renderer in cell
                        (o=cell.renderer||cell._renderer)? xui.UI._applyRenderer(profile, o, cell, uicell) :
                        // typeof (cell.renderer||cell._renderer)=='function'? (cell.renderer||cell._renderer).call(profile,cell) :
                        // 2 template in cell
                        (uicell && typeof uicell.caption =='string') ? uicell.caption:
                        // 3 default caption function
                        typeof fun=='function'?fun(cell.value, profile, cell):
                        // 4 value in cell
                        (xui.isSet(cell.value)?(""+cell.value):
                        // 5 empty
                        "")
                    // default value
                    ) || ""},
                f0=function(v,profile,cell){
                    return v ? xui.Date.getText(v, getPro(profile, cell, 'dateEditorTpl')||'ymdhn') : "";
                },
                f1=function(v,profile,cell){
                    return v ? xui.Date.getText(v, getPro(profile, cell, 'dateEditorTpl')||'ymd') : "";
                },
                f2=function(v){return v?(v+'').replace(reg1,'&lt;').replace(/\t/g,'    ').replace(/ /g,'&nbsp;').replace(/(\r\n|\n|\r)/g,"<br />"):""},
                f3=function(v){return (v||v===0) ? ((v*100).toFixed(2)+'%') : ""},
                f4=function(v,profile,cell){
                    if(v||v===0){
                        return xui.formatNumeric(
                                parseFloat(v),
                                getPro(profile, cell, 'precision'),
                                getPro(profile, cell, 'groupingSeparator'),
                                getPro(profile, cell, 'decimalSeparator'),
                                getPro(profile, cell, 'forceFillZero'),
                                getPro(profile, cell, 'trimTailZero')
                            );
                    }else
                        return "";
                },
                f5=function(v,profile,cell){
                    if(v||v===0){
                        var precision=getPro(profile, cell, 'precision');
                        return xui.formatNumeric(
                                parseFloat(v),
                                // currency default precision is 2
                                xui.isSet(precision)?precision:2,
                                getPro(profile, cell, 'groupingSeparator'),
                                getPro(profile, cell, 'decimalSeparator'),
                                getPro(profile, cell, 'forceFillZero'),
                                getPro(profile, cell, 'trimTailZero')
                            );
                    }else
                        return "";
                },
                f6=function(v,profile,cell){
                    var t=getPro(profile,cell,'editorListItems');
                    if(!t)
                        if(t=getPro(profile,cell,'editorListKey'))
                           t=xui.UI.getCachedData(typeof(t)=="function"?t():t);
                    if((typeof(t)=="function"?(t=t()):t) && t.length)
                        for(var i=0,l=t.length;i<l;i++)
                            if(t[i].id===v)
                                return t[i].caption||v;
                    return f7(v,profile,cell);
                },
                f7=function(v,profile,cell){
                   if(v){
                       v=v+"";
                        var t=v.indexOf('=');
                        if(t!=-1){
                            cell.value = v.substr(0,t);
                            return v.substr(t+1);
                        }
                   }
                    return v;
                },
                unit=function(caption, cell){return caption + (cell.unit?" "+cell.unit:"")};
            // get caption node
            if(node && node.get(0))node=node.last();
            switch(type){
                case 'number':
                case 'spin':
                case 'counter':
                    var v=parseFloat(cell.value);
                    cell.value=(v||v===0)?v:null;
                    caption=unit(xui.isSet(capOut)?capOut:ren(profile,cell,uicell,f4), cell);
                    var tpl = getPro(profile, cell, 'numberTpl');
                    if(tpl && caption)
                        caption = tpl.replace("*", caption);
                    if(node)
                        node.html(caption,false);
                break;
                case 'currency':
                    var v=parseFloat((cell.value+"").replace(/[^\d.-]/g,''));
                    cell.value=(v||v===0)?v:null;
                    //  Note that cell value has true numeric value, while caption has currency format with commas.
                    caption=unit(xui.isSet(capOut)?capOut:ren(profile,cell,uicell,f5),cell);
                    var tpl = getPro(profile, cell, 'currencyTpl');
                    if(tpl && caption!=="")
                        caption = tpl.replace("*", caption);
                    if(node)
                        node.html(caption,false);
                break;
                case 'date':
                    cell.value= xui.isDate(cell.value)?cell.value:xui.isFinite(cell.value)?new Date(parseInt(cell.value,10)):xui.Date.parse(cell.value);
                    caption=unit(xui.isSet(capOut)?capOut:ren(profile,cell,uicell,f1),cell);
                    if(node)
                        node.html(caption, false);
                break;
                case 'datetime':
                    cell.value= xui.isDate(cell.value)?cell.value:xui.isFinite(cell.value)?new Date(parseInt(cell.value,10)):xui.Date.parse(cell.value);
                    caption=unit(xui.isSet(capOut)?capOut:ren(profile,cell,uicell,f0),cell);
                    if(node)
                        node.html(caption, false);
                break;
                case 'input':
                    cell.value=cell.value||"";
                    caption=unit(xui.isSet(capOut)?capOut:ren(profile,cell,uicell),cell);
                    if(node)node.html(caption,false);
                break;
                case 'textarea':
                    cell.value=cell.value||"";
                    caption=unit(xui.isSet(capOut)?capOut:ren(profile,cell,uicell,f2),cell);
                    if(node)node.html(caption,false);
                break;
                case 'color':
                    var c=xui.UI.ColorPicker._ensureValue(0,cell.value);
                    cell.value=cell.value?((c!=="transparent"?'#':'')+c):"";
                    caption=unit(xui.isSet(capOut)?capOut:ren(profile,cell,uicell),cell);
                    if(cell.value){
                        t1=xui.UI.ColorPicker.getTextColor(cell.value);
                        if(node){
                            node.html(caption,false);
                            node.css('color',t1);
                            node.parent().css('backgroundColor',cell.value);
                        }else{
                            uicell.color='color:'+t1+';';
                            uicell.bgcolor='background-color:'+cell.value+';';
                        }
                    }else{
                        if(node){
                            node.html(caption,false);
                            node.css('color','');
                            node.parent().css('backgroundColor','');
                        }else{
                            //uicell.color='color:#000;';
                            //uicell.bgcolor='background-color:#fff;';
                        }
                    }
                break;
                case 'checkbox':
                    cell.value=cell.value==="0"?false:!!cell.value;
                    caption=xui.isSet(capOut)?capOut:ren(profile,cell,uicell,function(v){return ''});
                    if(node)
                        profile.getSubNode('CHECKBOX', profile.getSubId(xui(node).id())).tagClass('-checked', cell.value);
                    else{
                        uicell._fi_checkboxCls = cell.value?'xuifont-checked xui-uicmd-check-checked':'';
                     }
                break;
                case 'progress':
                    cell.value=parseFloat(cell.value)||0;
                    cell.value=Math.min(Math.max(cell.value,0),1);
                    caption=unit(xui.isSet(capOut)?capOut:ren(profile,cell,uicell,f3),cell);
                    if(node){
                        node.first().html(caption, false);
                        node.width(caption);
                    }else
                        uicell.progress=caption;
                break;
                case 'listbox':
                    cell.value=cell.hasOwnProperty("value")?cell.value:"";
                    // don't use capOut in capOut case
                    caption=xui.adjustRes(unit(/*xui.isSet(capOut)?capOut:*/ren(profile,cell,uicell,f6),cell));
                    if(node)node.html((caption===null||caption===undefined)?cell.value:caption,false);
                break;
                case 'dropbox':
                case 'cmdbox':
                    cell.value=cell.hasOwnProperty("value")?cell.value:"";
                    caption=xui.adjustRes(unit(xui.isSet(capOut)?capOut:ren(profile,cell,uicell,f7),cell));
                    if(node)node.html((caption===null||caption===undefined)?cell.value:caption,false);
                break;
                default:
                    cell.value=cell.hasOwnProperty("value")?cell.value:"";
                    caption=xui.adjustRes(unit(xui.isSet(capOut)?capOut:ren(profile,cell,uicell),cell));
                    if(node)node.html((caption===null||caption===undefined)?cell.value:caption,false);
            }

            if('_renderer' in cell)delete cell._renderer;
            cell._caption = cell._$tips = cell._$tmpcap = caption;

            var t2=getPro(profile, cell, 'disabled'),
                t3=getPro(profile, cell, 'readonly');
            if(uicell){
                /*
                    colRenderer
                    rowRenderer

                    cellStyle
                    cellClass
                    cellRenderer

                    renderer
                    type
                    disabled
                    readonly
                    increment
                    min
                    max
                    maxlength
                    precision
                    dateEditorTpl
                    editable
                    value
                    caption
                    sortby [for column only]

                    customEditor -> an object for custom editor. or the below prop

                    editorListKey
                    editorListItems
                    editorFormat
                    editorMask
                    editorReadonly
                    editorDropListWidth
                    editorDropListHeight
                    editorProperties
                    editorCC
                    editorCS
                    editorEvents
                */
                uicell.cellCls=profile.getClass('CELL', '-'+type) + (t2?(' '+dcls):'') + (t3?(' '+rcls):'');
                uicell.type=type;
                uicell.value=cell.value;
                uicell._caption=caption;
                uicell.cellStyle=getPro(profile, cell, 'cellStyle');
                uicell.cellClass=getPro(profile, cell, 'cellClass');
            }else{
                if(t2) cellanode.parent().addClass(dcls);
                else cellanode.parent().removeClass(dcls);
                if(t3) cellanode.parent().addClass(rcls);
                else cellanode.parent().removeClass(rcls);

                if(t2=options.cellStyle)
                    cellanode.attr('style',cellanode.attr('style')+";"+t2);
                if(t2=options.cellUnclass)
                    cellanode.removeClass(t2);
                if(t2=options.cellClass)
                    cellanode.addClass(t2);
            }
            return cell;
        },
        _applyRendererEx:function(profile, prop, events, cell, adjustRenderer, t){
            // for cell only
            if(cell){
                if(t = cell._col){
                    adjustRenderer(t, prop, events);
                    adjustRenderer(t.tagVar, prop, events);
                }
                if(t = cell._row){
                    adjustRenderer(t, prop, events);
                    adjustRenderer(t.tagVar, prop, events);
                }
            }
        },
        _prepareItems:function(profile, arr, pid ,temparr){
            var self=this,
                prop=profile.properties,
                _treemode=prop.treeMode,
                mm = profile._$subMargin || (profile._$subMargin=profile.$px(prop.$subMargin)),
                a = profile.rowMap2,
                b = profile.rowMap,
                _layer=pid?b[pid]?(b[pid]._layer+1):0:0,
                SubID=xui.UI.$tag_subId,
                ider = profile._id||(profile._id=new xui.id()),
                rows=[],
                temp,cells,t,row,v,cellResult,
                ro =  prop.rowOptions,
                itemFilter=profile.$itemFilter,
                NONE='display:none';

            _treemode= !(!_treemode || _treemode=="none");
            if(itemFilter)itemFilter('begin','prepareItem',profile)
            for(var i=0,l=arr.length;i<l;i++){
                row = arr[i];
                // give id (avoid conflicts)
                if(!row.id || a[row.id]){
                    while(a[t=ider.next()]);
                    row.id="-"+t;
                }else{
                    row.id+="";
                }
                if(profile.beforePrepareRow && false===profile.boxing().beforePrepareRow(profile, row, pid, temparr)){
                    continue;
                }

                // give _serialId
                temp='-r_'+profile.pickSubId('row');
                row[SubID]=temp;
                b[temp]=row;

                //#
                row._for = "row";
                row._pid = pid;
                row._cells={};
                row._layer=_layer;

                row._tabindex=prop.tabindex;
                row._rowMarkDisplay=(prop.selMode=="multi"||prop.selMode=="multibycheckbox")?"":NONE;

                row._treeMode=_treemode?'':NONE;

                row._rowNumbDisplay=prop.rowNumbered?'':NONE;

                t={id: row.id};

                t.rowCls = ""
                if(row.disabled)
                    t.rowCls += ' xui-uicell-disabled';
                if(row.readonly)
                    t.rowCls += ' xui-ui-readonly';
                if(row.group){
                    t.group=1;
                    t.rowCls += ' ' + profile.getClass('CELLS1','-group') + " xui-uiborder-r xui-uiborder-light";
                }
                // filter: hidden
                if(itemFilter)row.hidden = !!itemFilter(row,'prepareItem',profile);

                if(row.hidden)
                    t.rowDisplay=NONE;

                t._row0DfW=prop.rowHandlerWidth?('width:'+profile.$forceu(prop.rowHandlerWidth)):'';
                t._rulerW='width:'+ (row.rulerWidth || profile.$forceu(4+_layer*mm));

                // use em for row Height
                t._rowHeight = profile.$forceu(row._rowHeight || row.height || prop.rowHeight, 'em');
                row._rowHeight = t._rowHeight;
                t._rowHeight="height:"+t._rowHeight+";contain-intrinsic-size:"+t._rowHeight;

                t.rowHandlerDisplay=prop.rowHandler?'':NONE;
                t.rowDDDisplay=(('rowResizer' in row)?row.rowResizer:prop.rowResizer)?'':NONE;

                t.firstCellStyle=row.firstCellStyle||ro.firstCellStyle||'';
                t.firstCellClass=row.firstCellClass||ro.firstCellClass||'';

                cells = t.cells = [];

                t[SubID]=temp;
               //   t._fi_togglemark = row.sub?'xui-uicmd-toggle':(row._layer?'xui-uicmd-empty':'');
                // t._fi_togglemark = row.sub?'xui-uicmd-toggle':'';
                t._fi_togglemark = row.sub?('xui-uicmd-toggle'+(row._checked?" xuifont-checked xui-uicmd-toggle-checked":"")):(prop.togglePlaceholder?'xui-icon-placeholder':'xui-uicmd-none');

                // id to dom item id
                a[row.id]=temp;

                if(!row.hasOwnProperty('caption') && row.hasOwnProperty('value'))
                    row.caption=''+row.value;

                 row._oValue=row.value;

                if(row.caption && !row.tips)
                    row._$tips=row.caption;

                xui.UI.adjustData(profile, row, t, 'sub');

                t.tagCmds = xui.clone(t.tagCmds || ro.tagCmds || prop.tagCmds);
                if(t.tagCmds){
                    this._prepareCmds(profile, t, function(cmd){
                        return !cmd.tag || !!cmd.tag.match(/\brow\b/) || !cmd.tag.match(/\bheader\b/);
                    });
                }

                // for cells
                if(row.group)
                    row.cells=null;
                if((v=row.cells)){
                    xui.arr.each(prop.header,function(col,j){
                        cellResult = profile.box._prepareCell(profile, v[j], row, col,temparr,t,j);
                        v[j]=cellResult[0];
                        cells.push(cellResult[1]);
                    });
                }

                var hash={};
                xui.merge(hash, t, function(o, i){
                    return xui.isNumb(o) || xui.isStr(o) || i=='ltagCmds';
                });
                hash[xui.UI.$tag_subId_c]=t[xui.UI.$tag_subId];
                t._handler_cell = xui.clone(hash);

                if(prop.treeMode=='infirstcell'){
                    if(row.group)
                        t._firstcell_grp = xui.clone(hash);

                    t._rulerW=t._fi_togglemark='';
                    t._treeMode=t.tMarkDisplay=t.tNumbDisplay=t._ltagDisplay=NONE;
                    t.ltagCmds=null;
                }
                rows.push(t);
            }
            if(itemFilter)itemFilter('end','prepareItem',profile);
            return rows;
        },
        _adjustCell:function(profile, cell, uicell){
            var self=this,
                prop=profile.properties,
                col=cell._col,
                renderer=self.getCellOption(profile, cell, 'cellRenderer') || prop.renderer,
                cellCapTpl=self.getCellOption(profile, cell, 'cellCapTpl');

            // allow to set caption dynamically
            if(cellCapTpl)
                cell._caption=cellCapTpl;
            xui.UI.adjustData(profile, cell, uicell, 'sub');

            if(renderer)
                cell._renderer=renderer;
            if(!uicell._cellWidth)
                uicell._cellWidth=col._colWidth;

            uicell._tabindex=prop.tabindex;
            uicell.cellDisplay=col.hidden===true?'display:none;':'';

            self._renderCell(profile, cell, uicell);

            //next
            cell._oValue=cell.value;
            if('unit' in cell)cell._oUnit=cell.unit;
        },
        _setSub:function(profile, item, flag, recursive, stopanim, cb){
            var id=profile.domId,
                ins=profile.boxing(),
                prop=profile.properties,
                itemId = profile.rowMap2[item.id],
                markNode = profile.box._getToggleNode(profile, itemId),
                subNs = profile.getSubNodes(['SUB1','SUB2'], itemId),
                subNs1 = xui(subNs.get(0)),
                subNs2 = xui(subNs.get(1));

            if(xui.Thread.isAlive(profile.key+":"+profile.$xid)) return;
            //close
            if(!flag){
                if(item._checked){
                    if(ins.beforeFold && false===ins.beforeFold(profile,item)){
                        return;
                    }
                    var onend=function(){
                        subNs.css({display:'none', height:0, overflow:''});
                        markNode.tagClass('-checked', false);
                        item._checked = false;

                        if(prop.dynDestory || item.dynDestory){
                            var s=item.sub, arr=[];
                            for(var i=0,l=s.length;i<l;i++)
                                arr.push(s[i].id);
                            profile.boxing().removeRows(arr);
                            item.sub=true;
                            delete item._inited;
                        }
                        if(ins.afterFold)
                            ins.afterFold(profile,item);

                        xui.resetRun(id, function(cb){
                            profile.box._asy(profile);
                            //clear rows cache
                            delete profile.$allrowscache1;
                            delete profile.$allrowscache2;
                            profile.box._adjustBody(profile,'foldrow');
                            if(cb)xui.tryF(cb,[profile,item],ins);
                         },0,[cb]);
                    };
                    if(!stopanim){
                        if(prop.animCollapse) {
                            subNs.css('overflow','hidden');
                            subNs.animate({'height':[subNs2.height(),0]},null,onend, 200, null, 'expoOut', profile.key+":"+profile.$xid).start();
                        }else onend();
                    }else onend();
                }
                if(recursive && item.sub && !prop.dynDestory && !item.dynDestory){
                    xui.arr.each(item.sub,function(o){
                        if(o.sub && o.sub.length)
                            profile.box._setSub(profile, o, flag, recursive, true, cb);
                    });
                }
            }else{
                //open
                if(!item._checked){
                    if(ins.beforeExpand && false===ins.beforeExpand(profile,item)){
                        return;
                    }
                    var onend=function(empty,t){
                        //markNode.css('background','');
                        // compitable with IE<8
                        if(xui.browser.ie && xui.browser.ver<=8){
                            markNode.css({
                                backgroundImage:'',
                                backgroundRepeat:'',
                                backgroundPositionX:'',
                                backgroundPositionY:'',
                                backgroundColor:'',
                                backgroundAttachment:''
                              });
                        }else{
                            markNode.removeClass('xui-icon-loading');
                        }
                        if(!empty){
                            item._checked = true;
                            if(ins.afterExpand)
                                ins.afterExpand(profile,item);
                        }
                        subNs.css({display:'',height:'auto',overflow:''});
                        if((prop.freezedRow||prop.rowHandler) && !subNs1.height() && (t=subNs2.height()))
                            subNs1.height(t);

                       xui.resetRun(id, function(cb){
                            profile.box._asy(profile);
                            //clear rows cache
                            delete profile.$allrowscache1;
                            delete profile.$allrowscache2;
                            profile.box._adjustBody(profile,'expandrow');
                            if(cb)xui.tryF(cb,[profile,item],ins);
                        },0,[cb]);
                    },
                    openSub = function(profile, item, id, markNode, subNs1, subNs2, subNs, sub){
                        var b=profile.boxing(),
                            p = profile.properties,
                            empty = sub===false;
                        //created
                        if(!empty && !item._inited){
                            delete item.sub;
                            //before insertRows
                            item._inited=true;
                            if(sub){
                                if(typeof sub=='string'){
                                    subNs2.html(item.sub=sub,false);
                                    // right-bottom border
                                    subNs.addClass('xui-uiborder-r xui-uiborder-b xui-uiborder-light');
                                }else if(sub['xui.Template']||sub['xui.UI']){
                                    subNs2.append(item.sub=sub.render(true));
                                    // right-bottom border
                                    subNs.addClass('xui-uiborder-r xui-uiborder-b xui-uiborder-light');
                                }else if(xui.isArr(sub)){
                                    b.insertRows(sub, item.id);
                                    // for []
                                    if(!item.sub)item.sub=sub;
                                }
                                var s=0,arr=b.getUIValue(true);
                                if(arr && arr.length){
                                    xui.arr.each(sub,function(o){
                                        if(xui.arr.indexOf(arr, o.id||o)!=-1){
                                            s=1;
                                            return false;
                                        }
                                    });
                                    if(s){
                                        //set checked items
                                        b._setCtrlValue(b.getUIValue());
                                    }
                                }
                            }
                        }

                        if(!empty){
                            markNode.tagClass('-checked');
                        }

                        if(!stopanim){
                            subNs.css("height","0px").css("display",'');

                            if(p.animCollapse) {
                                var h=0;
                                subNs2.children().each(function(o){
                                    h+=o.offsetHeight;
                                });
                                subNs.css('overflow','hidden');
                                subNs.animate({'height':[0,h]},null,function(){
                                    onend(empty);
                                }, 200, null, 'expoIn', profile.key+":"+profile.$xid).start();
                            }else onend(empty);
                        }else onend(empty);
                    },
                    sub = item.sub,
                    callback=function(sub){
                        openSub(profile, item, id, markNode, subNs1, subNs2, subNs, sub);
                    },t;

                    if((t=typeof sub)=='string'||t=='object')
                        callback(sub);
                    else if(profile.onGetContent){
                        if(xui.browser.ie && xui.browser.ver<=8){
                            markNode.css('background','url('+xui.ini.img_busy+') no-repeat');
                        }else{
                            markNode.addClass('xui-icon-loading');
                        }
                        var r=profile.boxing().onGetContent(profile, item, callback);
                        if(r||r===false){
                            //return true: toggle icon will be checked
                            if(r===true)
                                item._inited=true;
                            callback(r);
                        }
                    }
                }
                if(recursive&& item.sub){
                    xui.arr.each(item.sub,function(o){
                        if(o.sub && o.sub.length && !o._checked)
                            profile.box._setSub(profile, o, flag, recursive, true, cb);
                    });
                }
            }
        },
        _getCellId:function(profile, rowId, colId){
            if(xui.isNumb(rowId))rowId=xui.get(profile.properties.rows,[rowId,"id"]);
            if(xui.isNumb(colId))colId=xui.get(profile.properties.header,[colId,"id"]);
            return xui.get(profile.rowMap,[profile.rowMap2[rowId], '_cells',colId]);
        },
        _updCell:function(profile, cellId, options, dirtyMark, triggerEvent, triggerFormula){
            var box=profile.box,
                prop=profile.properties,
                pdm=prop.dirtyMark,
                psdm=pdm&&prop.showDirtyMark,
                sc=xui.absObj.$specialChars,
                cell,node,ishotrow,ext;

            if(typeof cellId == 'string')
                cell = profile.cellMap[cellId];
            else{
                cell = cellId;
                cellId = cell._serialId;
            }
            if(!cell || !cell._row)return;
            ishotrow=cell._row.id==box._temprowid;
            if(ishotrow && cell.caption==prop.hotRowCellCap)
                delete cell.caption;

            if(!xui.isHash(options))options={value:options};
            options=xui.filter(options,function(o,i,r){r= !sc[i.charAt(0)]; if(!r){ext=ext||{}; ext[i]=o} return r;});
            if(triggerEvent){
                if(profile.beforeCellUpdated && false === profile.boxing().beforeCellUpdated(profile, cell, options,ishotrow, ext, cell._row, cell._col))
                    return;
            }
            if(!xui.isEmpty(options)){
                // * remove cell's special setting first
                delete cell._$tips;
                delete cell._$tmpcap;

                xui.merge(cell,options,'all');

                node=profile.getSubNode('CELLA', cellId);
                if('type' in options){
                    var uicell={};
                    box._adjustCell(profile, cell, uicell);
                    node.parent().replace(profile._buildItems('rows2.cells', [uicell]));
                    node=profile.getSubNode('CELLA', cellId);
                }else{
                    // allow to set caption dynamically
                    var cellCapTpl=box.getCellOption(profile, cell, 'cellCapTpl');
                    // * : only for cellCapTpl => caption
                    if(cellCapTpl)
                        cell.caption=xui.adjustRes(cellCapTpl,true,false,null,null,cell);
                    cell = box._renderCell(profile, cell, null, node, options);
                }

                var editor=cell._editor;

                //if update value
                if('value' in options){
                    if(!pdm || dirtyMark===false){
                        cell._oValue=cell.value;
                        if('unit' in cell)cell._oUnit=cell.unit;
                    }else{
                        if(cell.value===cell._oValue&&( !('unit' in cell) || cell._oUnit===cell.unit)){
                            if(psdm)
                                node.removeClass('xui-ui-dirty');
                        }else{
                            if(psdm)
                                node.addClass('xui-ui-dirty');
                        }
                    }
                    if(editor && triggerEvent && !(options.ignoreEditor) && !profile._setFromEditor){
                        editor.setValue(cell.value,true,'editorini');
                    }
                    // formula
                    if(triggerFormula!==false)
                        xui.resetRun(profile.key+":"+profile.$xid+":"+cell.id,function(){
                            if(profile&&profile.box)profile.boxing().triggerFormulas(cell, 'updatecell');
                        });
                }
                if(('caption' in options) && editor && editor.setCaption){
                    editor.setCaption(xui.isSet(options.caption)?options.caption:null,true);
                }

                cell._dirty=1;
            }
            if(triggerEvent){
                if(profile.afterCellUpdated)
                    profile.boxing().afterCellUpdated(profile,cell, options,ishotrow,ext,cell._row,cell._col);
            }
        },
        _ensureValue:function(profile,value){
            if(profile.properties.selMode=='multi'||profile.properties.selMode=='multibycheckbox'){
                var arr = xui.isArr(value) ? value : (value ? (''+value) : '').split(profile.properties.valueSeparator);
                // ignore hot row
                xui.arr.removeValue(arr,this._temprowid);
                arr.sort();
                return arr.join(profile.properties.valueSeparator);
            }else{
                // ignore hot row
                return value==this._temprowid?null:value;
            }
        },
        _sel:function(profile, type, src, id, e){
            var properties=profile.properties;
            if(properties.activeMode!=type)return;

            var targetId = profile.getSubId(id),
                map = type=='cell'?profile.cellMap:profile.rowMap,
                box=profile.boxing(),
                targetItem=map[targetId],
                ks=xui.Event.getKey(e),
                sid=type=='cell'?(targetItem._row.id+'|'+targetItem._col.id):targetItem.id,
                mode=properties.selMode;
            switch(mode){
            case 'none':
                box.onRowSelected(profile, targetItem, e, src, 0);
                break;
            case 'multibycheckbox':
                if(profile.keys.MARK){
                    var ck=profile.getKey(xui.Event.getSrc(e).id||""),
                        clickMark=ck==profile.keys.MARK;
                    if(!clickMark){
                        box.onRowSelected(profile, targetItem, e, src, 0);
                        break;
                    }
                }
            case 'multi':
                var value = box.getUIValue(),
                    arr = value?(''+value).split(properties.valueSeparator):[],
                    checktype=1;
                if(arr.length&&(ks.ctrlKey||ks.shiftKey||properties.noCtrlKey)){
                    //todo: give cell multi selection function
                    if(ks.shiftKey && type=='row'){
                        if(profile.$firstV._pid!=targetItem._pid)return false;
                        var items=properties.rows;
                        if(targetItem._pid){
                            var pitem=map[targetItem._pid];
                            if(pitem)items=pitem.sub;
                        }
                        var i1=xui.arr.subIndexOf(items,'id',profile.$firstV.id),
                            i2=xui.arr.subIndexOf(items,'id',targetItem.id),
                            i;
                        arr.length=0;
                        for(i=Math.min(i1,i2);i<=Math.max(i1,i2);i++)
                            arr.push(items[i].id);
                    }else{
                        if(xui.arr.indexOf(arr,sid)!=-1){
                            xui.arr.removeValue(arr,sid);
                            checktype=-1;
                        }else
                            arr.push(sid);
                    }

                    arr.sort();
                    value = arr.join(properties.valueSeparator);

                    //update string value only for setCtrlValue
                    if(box.getUIValue() != value){
                        box.setUIValue(value,null,null,'click');
                        if(box.get(0) && box.getUIValue() == value)
                            box.onRowSelected(profile, targetItem, e, src, checktype);
                    }
                    break;
                }
            case 'single':
                if(box.getUIValue() != sid){
                    profile.$firstV=targetItem;
                    box.setUIValue(sid,null,null,'click');
                    if(box.get(0) && box.getUIValue() == sid)
                        box.onRowSelected(profile, targetItem, e, src, 1);
                }
                break;
            }
        },
        _activeCell:function(profile, id){
            if(profile.properties.activeMode!='cell')return;
            if(profile.$activeCell == id)return;
            var targetCell=null;
            if(profile.$activeCell){
                xui(profile.$activeCell).tagClass('-active', false);
                delete profile.$activeCell;
            }
            if(id!==false){
                var targetId = profile.getSubId(id),
                    map = profile.cellMap;
                targetCell=map[targetId];
                if(profile.beforeCellActive && (false===profile.boxing().beforeCellActive(profile, targetCell, targetCell._row, targetCell._col)))return;
                xui(profile.$activeCell = id).tagClass('-active');
            }
            if(profile.afterCellActive)profile.boxing().afterCellActive(profile, targetCell, targetCell._row, targetCell._col);
        },
        _activeRow:function(profile, id){
            if(profile.properties.activeMode!='row')return;
            if(profile.$activeRow == id)return;
            var targetRow=null, subId;
            if(profile.$activeRow){
               subId=profile.getSubId(profile.$activeRow);
               profile.getSubNodes(['CELLS1','CELLS2'],subId).tagClass('-active', false);
               delete profile.$activeRow;
            }
            if(id!==false){
                var targetId = profile.getSubId(id),
                    map = profile.rowMap;
                targetRow=map[targetId];
                //before event
                if(profile.beforeRowActive && (false===profile.boxing().beforeRowActive(profile, targetRow)))return;
                subId=profile.getSubId(profile.$activeRow = id);
                profile.getSubNodes(['CELLS1','CELLS2'],subId).tagClass('-active');
            }
            //after event
            if(profile.afterRowActive)profile.boxing().afterRowActive(profile, targetRow);
        },
        _getCellFormula:function(profile, cell, col, row){
            var t, p=profile.properties,f1=function(t,col){
                t=xui.isStr(t) ? t : ('='+t);
                return t.replace(/(\B)(\?)([0-9]+\b)/g, '$1'+col+'$3').replace(/(\b)(_)([0-9]+\b)/g, '$1'+col+'$3');
            },f2=function(t,row){
                t=xui.isStr(t) ? t : ('='+t);
                return t.replace(/(\b[A-Z]+)(\?)(\B)/g, '$1'+row+'$3').replace(/(\b[A-Z]+)(_)(\b)/g, '$1'+row+'$3');
            };
            return (cell&&(t=cell.formula))? t
                    : (cell&&(t=cell._row)&&(t=t.formula)) ?f1(t, col)
                    : ((t=p.rowOptions)&&(t=t.formula)) ? f1(t, col)
                    : (cell&&(t=cell._col)&&(t=t.formula)) ? f2(t, row)
                    : ((t=p.colOptions)&&(t=t.formula)) ?  f2(t, row)
                    :  null ;
        },
        getCellOption:function(profile, cell, key){
            var t=cell,p=profile.properties;
            return (t && t.hasOwnProperty(key)&&xui.isSet(t=t[key]))?t
                    :(cell&&(t=cell._row)&&t.hasOwnProperty(key)&&xui.isSet(t=t[key]))? t
                    :((t=p.rowOptions)&&t.hasOwnProperty(key)&&xui.isSet(t=t[key]))? t
                    :(cell&&(t=cell._col)&&t.hasOwnProperty(key)&&xui.isSet(t=t[key]))?t
                    :((t=p.colOptions)&&t.hasOwnProperty(key)&&xui.isSet(t=t[key]))?t
                    :((t=p)&&t.hasOwnProperty(key)&&xui.isSet(t=t[key]))?t:null;
        },
        _trycheckrowdirty:function(profile,cell){
            if(!cell || !cell._row)return;

            xui.resetRun(profile.key+":"+profile.$xid+":"+cell._row.id,function(){
                // destroyed
                if(!profile.box)return;
                var lc=profile.$cellInEditor;
                if(cell._row && (!lc || (lc._row && lc._row!=cell._row))){
                    var dirty=false;
                    xui.arr.each(cell._row.cells,function(v){
                        if(v._oValue!==v.value||(('unit' in v) &&v._oUnit!==v.unit)){
                            dirty=true;
                            return false;
                        }
                    });
                    if(dirty && cell._row.id !=profile.box._temprowid && profile.onRowDirtied)
                        profile.boxing().onRowDirtied(profile,cell._row);
                }
            },100);
        },
        _adjusteditorW:function(profile, nodes, width){
            if(nodes){
                nodes.each(function(n,i){
                    if(!(i=n.id))return;
                    i=i.split(":")[2];
                    if(i=profile.cellMap[i])
                      if(i._editor && i._editor!==profile.$curEditor) // only for inline editor
                        i._editor.setWidth(width - i._editor.getRoot().offsetLeft());
                });
            }
        },
        _adjusteditorH:function(profile, nodes,height){
            nodes.each(function(n,i){
                if(!(i=n.id))return;
                i=i.split(":")[2];
                if(i=profile.rowMap[i]){
                    i=i.cells;
                    for(var j in i){
                       j=i[j];
                       if(j._editor && j._editor!==profile.$curEditor) // only for inline editor
                            j._editor.setHeight(profile.$addpx(height, 1, j._editor.getRootNode()));
                    }
                }
            });
        },
        _editCell:function(profile, cellId, byhover, inactive){
            var cell = typeof cellId=='string' ? profile.cellMap[cellId] : cellId;
            if(!cell)return;
            // real cellId
            cellId=cell._serialId;

            var box=profile.box,
                getPro=function(key, _cell){return box.getCellOption(profile, _cell||cell, key)};

            if(getPro('disabled') || getPro('readonly') ||  !getPro('editable'))return ;

            var editor,
                grid = this, tt,
                prop = profile.properties,
                cb=profile._$cache.hasOwnProperty('_root_cb') ? profile._$cache._root_cb : (profile._$cache._root_cb = profile.getRoot().contentBox()),
                rowb=profile._$cache.hasOwnProperty('_cell2_b') ? profile._$cache._cell2_b : (tt = profile.getSubNode("ROWS22").first(2) ) ? (profile._$cache._cell2_b = tt._borderH()) : 0,
                type=getPro('type')||'input',
                //region = prop.freezedColumn prop.freezedRow
                col = cell._col,
                colId = col.id,
                row = cell._row,
                rowId = row.id,
                ishotrow=rowId==profile.box._temprowid,
                editMode= getPro('editMode'),
                adjustEditorInput= getPro('adjustEditorInput'),
                inline=editMode=="inline"||(getPro('type')=='dropbutton'),
                baseNode = profile.getSubNode('SCROLL' + row._region + col._region),
                //baseNode = profile.getSubNode('BORDER'),
                cellNode = profile.getSubNode('CELL', cellId),
                cap,offX=0;

            // only for first cell and, shown toggle
            if(prop.treeMode=='infirstcell' && profile.properties.header.indexOf(col)===0){
                cap = profile.getSubNode('CELLCAPTION', cellId);
                if(cap && !cap.isEmpty()){
                  offX = cap.offsetLeft() - (cb?1:0);
                }
            }

            if(!inline){
                //clear the prev editor
                editor = profile.$curEditor;
                if(editor)xui.tryF(editor.undo,[],editor);
                editor=null;
            }

            // -1. for special type
            if(inline && cell._editor){
                if(!inactive)cell._editor.activate();
                return;
            }else if(type=='checkbox'||type=='button'){
                if(!inactive)profile.getSubNode('CELLA', cellId).focus(true);
                return;
            }

            // 1. customEditor in cell/row or header
            if((editor = getPro('customEditor')) && typeof editor.iniEditor=='function'){
                editor.iniEditor(profile, cell, cellNode);
                if(!inactive)xui.tryF(editor.activate,[],editor);
                if(profile.onBeginEdit) profile.boxing().onBeginEdit(profile, cell, editor, 'cell', cell._row, cell._col);
            }else{
                // 2. beforeIniEditor
                //      returns an editor(xui.UI object)
                //      or, sets $editorValue
                if(profile.beforeIniEditor){
                    editor=profile.boxing().beforeIniEditor(profile, cell, cellNode, baseNode, 'cell', cell._row, cell._col);
                    // if return false, dont set $curEditor
                    if(editor===false)
                        return;
                }

                // 3. for lable type only, give it an chance to customEditor/beforeIniEditor
                if(type=='label'){
                    if(!inactive)profile.getSubNode('CELLA', cellId).focus(true);
                    return;
                }

                // if beforeIniEditor doesnt return an editor
                if(!editor || !editor['xui.UI']){
                    var editorAutoPop= getPro('editorAutoPop'),
                        editorCacheKey = getPro('editorCacheKey'),
                        editorProperties = getPro('editorProperties'),
                        editorCC= getPro('editorCC'),
                        editorCS= getPro('editorCS'),
                        editorEvents = getPro('editorEvents'),
                        editorFormat = getPro('editorFormat'),
                        editorMask = getPro('editorMask'),
                        editorReadonly = getPro('editorReadonly'),
                        editorHAlign=getPro('editorHAlign'),
                        editorDropListWidth = getPro('editorDropListWidth'),
                        editorDropListHeight = getPro('editorDropListHeight'),
                        editorCommandBtn=getPro('editorCommandBtn'),
                        beforeEditApply=getPro('beforeEditApply'),
                        t,oldProp;


                    if(!inline){
                        // 4. try to get editor from cache
                        if(editorCacheKey && profile.$cache_editor[editorCacheKey])
                            editor=profile.$cache_editor[editorCacheKey];
                        if(editor && (!editor.get(0) || editor.isDestroyed()))
                            editor=null;
                    }
                    // 5. else, create a ComboInput Editor, and cache it
                    if(!editor){
                        var iniprop={
                            dirtyMark:false,cachePopWnd:false,left:-1000,top:-1000,position:'absolute',visibility:'hidden',zIndex:100
                        };
                        if(inline){
                            xui.merge(iniprop,{
                                left:offX,
                                top:0,
                                cachePopWnd:true,
                                width:Math.max(0, profile.$px(cell._col._colWidth) - offX + (cb?2:1)),
                                height:profile.$px(cell._row._rowHeight)+(cb?1:0) - rowb,
                                visibility:'visible',
                                zIndex:100
                            },'all');
                        }
                        editor=new xui.UI.ComboInput(iniprop);
                    }
                    switch(type){
                        // input
                        // button
                        // checkbox
                        case 'number':
                        case 'spin':
                        case 'counter':
                        case 'currency':
                            editor.setType(type);
                            xui.each(xui.toArr('precision,increment,min,max,maxlength,currencyTpl,numberTpl,groupingSeparator,decimalSeparator,forceFillZero,trimTailZero,unit,units'),function(key,u){
                                var v=getPro(key);
                                if(type=='currency'){
                                    if(key=='precision'&&!v)v=2;
                                }else{
                                    if(key=='precision'&&!v)v=0;
                                    if(key=='increment'&&!v)v=1;
                                }

                                if(xui.isSet(v))editor['set'+xui.str.initial(key)](v);
                            });
                            break;
                        case 'progress':
                            editor.setType('spin').setMax(1).setMin(0).setPrecision(4).setIncrement(0.01);
                            break;
                        case 'input':
                            editor.setType('none');
                            break;
                        case 'textarea':
                            editor.setType('none').setMultiLines(true).setCommandBtn('save').onCommand(function(p){
                                p.boxing().hide();
                            });
                            if(!inline)
                                xui.tryF(editor.setResizer,[true],editor);
                            break;
                        case 'date':
                        case 'datetime':
                            var dateEditorTpl=getPro('dateEditorTpl');
                            if(dateEditorTpl)
                                editor.setDateEditorTpl(dateEditorTpl);
                        case 'listbox':
                        case 'combobox':
                        case 'helpinput':
                        case 'time':
                        case 'color':
                        case 'getter':
                        case 'popbox':
                        case 'dropbutton':
                        case 'cmdbox':
                            editor.setType(type);
                            if(profile.box.getCellOption(profile, cell,'disabled')){
                            }else{
                                editor.beforeComboPop(function(editorprf, pos, e, src){
                                    var cell=editorprf.$cell,onClickCell=profile.box.getCellOption(profile, cell, 'onClickCell');
                                    if(typeof onClickCell == 'function')
                                        return onClickCell.call(profile._host||profile, profile, cell, editorprf, pos,e,src);
                                    else
                                        return profile.boxing().beforeComboPop(profile, cell, editorprf, pos, e, src,cell._row,cell._col);
                                });
                                if(profile.beforePopShow)
                                    editor.beforePopShow(function(editorprf, popCtl, items){
                                        var rst;
                                        if(editorEvents && editorEvents.beforePopShow)rst = editorEvents.beforePopShow(editorprf, popCtl, items);
                                        rst = profile.boxing().beforePopShow(profile, editorprf.$cell, editorprf, popCtl, items, editorprf.$cell._row, editorprf.$cell._col);
                                        return rst;
                                    });
                                if(profile.afterPopShow)
                                    editor.afterPopShow(function(editorprf, popCtl){
                                        return profile.boxing().afterPopShow(profile, editorprf.$cell, editorprf, popCtl, editorprf.$cell._row, editorprf.$cell._col);
                                    });
                                if(type=='popbox' || type=='cmdbox' || type=='getter' || type=='dropbutton'){
                                    if(profile.onEditorClick)
                                        editor.onClick(function(prf, e, src, btn){
                                            return profile.boxing().onEditorClick(profile, prf.$cell, prf, btn, src, prf.$cell._row, prf.$cell._col);
                                        });
                                }
                            }
                            break;
                        case 'file':
                            editor.setType(type);
                        break;
                    }
                    if(profile.onCommand)
                        editor.onCommand(function(editorprf, node, type){
                            return profile.boxing().onCommand(profile, editorprf.$cell, editorprf, node, type, editorprf.$cell._row, editorprf.$cell._col);
                        });

                    cell._editor = editor;
                    if(inline){
                       cellNode.append(editor);
                    }else{
                        baseNode.append(editor);
                    }
                    cellNode.addClass("editing");

                    //cache the stantdard editor
                    if(!inline && editorCacheKey)
                        profile.$cache_editor[editorCacheKey] = editor;

                    if(editor.setInputReadonly)
                        editor.setInputReadonly(!!editorReadonly);
                    if(editor.setDropListWidth && editorDropListWidth)
                        editor.setDropListWidth(editorDropListWidth);
                    if(editor.setDropListHeight && editorDropListHeight)
                        editor.setDropListHeight(editorDropListHeight);
                    if(editor.setHAlign&&editorHAlign)
                        editor.setHAlign(editorHAlign);
                    if(editor.setCommandBtn&&editorCommandBtn)
                        editor.setCommandBtn(editorCommandBtn);
                    if(editorFormat){
                        if(typeof editorFormat=='function' && editor.beforeFormatCheck)
                            editor.beforeFormatCheck(editorFormat);
                        else if(typeof editorFormat=='string' && editor.setValueFormat)
                            editor.setValueFormat(editorFormat);
                    }
                    if(editorMask && editor.setMask)
                        editor.setMask(editorMask);
                    if(editorProperties){
                        oldProp={}
                        var h=profile.getProperties();
                        xui.each(editorProperties,function(o,i){
                            oldProp=h[i];
                        });
                        editor.setProperties(editorProperties);
                    }
                    if(editorCC)
                        editor.setCustomClass(xui.clone(editorCC,2));
                    if(editorCS)
                        editor.setCustomStyle(xui.clone(editorCS,2));
                    if(editorEvents)
                        editor.setEvents(editorEvents);
                    if(!inline){
                        // clear for valueFormat, setValue maybe cant set value because of valueFormat
                        editor.resetValue();
                    }
                    //set properities
                    switch(type){
                        case 'listbox':
                        case 'combobox':
                        case 'helpinput':
                            // set properties
                            if(t=getPro('editorListItems')){
                                editor.setListKey(null);
                                editor.setItems(typeof(t)=="function"?t():t);
                            }else if(t=getPro('editorListKey')) {
                                editor.setItems(null);
                                editor.setListKey(typeof(t)=="function"?t():t);
                            }
                            break;
                    }

                    // must set value here, after setItems/setListKey
                    //$editorValue must be set in beforeIniEditor
                    editor.setValue(xui.isSet(cell.$editorValue)?cell.$editorValue:cell.value,true,'editorini');
                    delete cell.$editorValue;

                    if(editor.setCaption){
                        if(editorProperties&&('caption' in editorProperties)&& xui.isDefined(editorProperties.caption)){
                            editor.setCaption(editorProperties.caption,true);
                        }else  if(type=="cmdbox"||type=="popbox"||type=="button"||type=="dropbutton"){
                            editor.setCaption(cell._caption||cell._$tmpcap||cell.caption||"",true);
                        }
                    }
                    //$tag for compatible
                    if(cell.$tag){
                        if(editor.setCaption)editor.setCaption(cell.$tag);
                        else if(editor.setValue)editor.setValue(cell.$tag,null,'editortag');
                    }
                    //give a reference
                    editor.get(0).$cell = cell;
                    editor.get(0)._smartnav=true;

                    var g1=profile.boxing(),pos=g1.getCellPos(cell),cc,nc,
                        _getcell=function(editorPrf){
                            if(pos) return g1.getCellbyRowCol(pos.row, pos.col);
                            else return editorPrf.$cell;
                        };

                    //undo function is a must
                    editor.undo=function(refocus, inactive){
                        var editor=this, cell=editor.get(0).$cell;
                        // execute once
                        editor.undo=null;
                        profile.getSubNode('CELL', _getcell(editor.get(0))._serialId).removeClass("editing");
                        // row dirty alert
                        if(profile.box)
                            profile.box._trycheckrowdirty(profile,profile.$cellInEditor);
                        if(!inactive){
                            if(xui.isFun(editor.collapse))editor.collapse();

                            if(editor.get(0) && editor.get(0).box){
                                // for ie's setBlurTrigger doesn't trigger onchange event
                                editor.getSubNode('INPUT').onBlur(true);

                                if(refocus && xui.str.endWith(editMode,"sharp")){
                                   cell._ignorefocus=1;
                                   profile.boxing().focusCell (profile.$cellInEditor);
                                   xui.asyRun(function(){
                                        delete cell._ignorefocus;
                                   });
                                }
                            }
                            editor.getRoot().setBlurTrigger(profile.$xid+":editor");
                            if(profile.properties && !profile.properties.directInput){
                                editor.beforeUnitUpdated(null).afterUIValueSet(null).beforeNextFocus(null).onCancel(null).afterPopHide(null);
                                editor.setValue('',true,'editorreset');
                            }
                            // clear those setting
                            if(editorFormat){
                                if(editor.beforeFormatCheck)editor.beforeFormatCheck(null);
                                if(editor.setValueFormat)editor.setValueFormat('');
                            }
                            if(editorMask)
                                if(editor.setMask)editor.setMask('');
                            if(editor.setInputReadonly)editor.setInputReadonly(!editorReadonly);
                            if(editorDropListWidth)
                                if(editor.setDropListWidth)editor.setDropListWidth(0);
                            if(editorDropListHeight)
                                if(editor.setDropListHeight)editor.setDropListHeight(0);
                            if(oldProp){
                                editor.setProperties(oldProp);
                                oldProp=null;
                            }
                            delete editor.get(0).$cell;
                            delete editor.get(0)._smartnav;
                            //don't use disply:none, firfox has many bugs about Caret or renderer
                            editor.hide();

                        }
                        if(editorEvents){
                            var h={};
                            xui.each(editorEvents,function(o,i){
                                h[i]=null;
                            });
                            editor.setEvents(h);
                        }
                        profile.$curEditor=null;
                        profile.$cellInEditor=null;
                        if(profile.onEndEdit)
                            profile.boxing().onEndEdit(profile, cell, editor, 'cell', cell._row, cell._col);

                        // don't cache it
                        if(!editorCacheKey && editor.get(0)){
                            editor.destroy(true);
                        }
                        delete cell._editor;
                    };


                    //editor change value, update cell value
                    editor
                    .beforeUnitUpdated(function(editorPrf,v){
                        cc=_getcell(editorPrf);
                        if(profile.beforeUnitUpdated&&false===g1.beforeUnitUpdated(profile, cc, editorPrf, v, cc._row, cc._col))
                            return false;
                        grid._updCell(profile, cc, {value:cc.value, unit: v},profile.properties.dirtyMark,true,true);
                        if((nc=_getcell(editorPrf)) && nc!==cc){
                            editorPrf.$cell = nc
                            nc._editor=editor;
                            if(!inline){
                                profile.$cellInEditor=nc;
                            }
                        }
                    })
                    .afterUIValueSet(function(editorPrf,oV,nV,force,tag){
                        cc=_getcell(editorPrf);
                        if(!cc)return;

                        var type=getPro('type',cc),caption;
                        switch(type){
                            case 'number':
                            case 'spin':
                            case 'counter':
                            case 'progress':
                                nV=parseFloat(nV);
                                nV=(nV||nV===0)?nV:null;
                                break;
                            case 'currency':
                                nV=parseFloat((''+nV).replace(/[^\d.-]/g,''));
                                nV=(nV||nV===0)?nV:null;
                                break;
                            case 'cmdbox':
                            case 'button':
                            case 'dropbutton':
                            case 'popbox':
                            case 'combobox':
                            case 'listbox':
                            case 'helpinput':
                                caption=editorPrf.boxing().getShowValue();
                                break;
                        }
                        var options={
                            value:nV
                        };

                        if(xui.isDefined(caption))
                            options.caption=caption;

                        if(editorPrf.properties.hasOwnProperty("tagVar") && !xui.isEmpty(editorPrf.properties.tagVar))
                            options.tagVar=editorPrf.properties.tagVar;

                        if(false!==(profile.beforeEditApply&&profile.boxing().beforeEditApply(profile, cc, options, editor, tag, 'cell', cc._row, cc._col))){
                            if(false!==(beforeEditApply && beforeEditApply(options, cc, profile, editor))) {
                              profile._setFromEditor=1;
                              grid._updCell(profile, cc, options, profile.properties.dirtyMark, true, true);
                              delete profile._setFromEditor;
                            }
                            if((nc=_getcell(editorPrf)) && nc!==cc){
                              editorPrf.$cell = nc
                              nc._editor=editor;
                              if(!inline){
                                profile.$cellInEditor=nc;
                              }
                            }

                            if(xui.str.endWith(editMode,"sharp") && type!='spin' && type!='counter'){
                              xui.tryF(editor.undo,[true],editor);
                            }
                        }
                    })
                    .beforeNextFocus(function(editorPrf, e){
                        if(editor.undo)
                            xui.tryF(editor.undo,[true],editor);
                        var hash=xui.Event.getEventPara(e);
                        // fake 'right' key
                        if(hash.key=='enter')hash.$key='right';
                        profile.getSubNode('CELLA', cell._serialId).onKeydown(true,hash);
                        //prevent
                        return false;
                    })
                    .onFileDlgOpen(function(editorPrf,src){
                        if(profile.onFileDlgOpen)profile.boxing().onFileDlgOpen(profile,cell,editorPrf,src,cell._row,cell._col);
                    });

                    if(!inline){
                        editor
                        .onCancel(function(){
                            if(editor)
                                xui.tryF(editor.undo,[],editor);
                        })
                        .afterPopHide(function(p,r,type){
                            if(xui.str.endWith(editMode,"sharp"))
                                xui.tryF(editor.undo,[type!="blur"&&type!="call"],editor);
                        })
                        .getRoot().setBlurTrigger(profile.$xid+":editor", function(){
                            if(editor)
                                xui.tryF(editor.undo,[],editor);
                            return false;
                        });

                        var absPos=cellNode.offset(null, baseNode),
                            size = cellNode.cssSize(),
                            w2 = -1,
                            mw=-1,mh=-1,w1=-1,h2=-1,t;

                        // too small
                        if(  offX && (offX > size.width - 8))return;

                        //show editor
                        if(type=='textarea'){
                            mw=200;
                            mh=100;
                        }
                        if(t = editorProperties && editorProperties.width){
                          w2= xui.CSS.$px(t)||0;
                        }
                        if(t == "fill"){
                          mw = Math.max(mw, baseNode.get(0).clientWidth);
                        }
                        if(t = editorProperties && editorProperties.height){
                          h2= xui.CSS.$px(t)||0;
                        }
                        editor
                        .setWidth(Math.max(mw, w2, size.width  - offX +(cb?3:0)))
                        .setHeight(Math.max(mh, h2, size.height +(cb?2:0)))
                        .reLayout(true,true);

                        if(mw!=-1||mh!=-1){
                          editor.reBoxing().popToTop(cellNode, 4, baseNode);
                        }else{
                          editor.reBoxing().show((absPos.left + offX -(cb?1:0))+'px',(absPos.top -(cb?1:0))+'px');
                        }

                        var expand,
                            noInputType = type=='cmdbox'||type=='cmdbox'|| type=='listbox'||type=='file',
                            insPopType = noInputType || type=='date' || type=='time' || type=='datetime' || type=='color',
                            inputReadonly = editor.getInputReadonly && editor.getInputReadonly(),
                        issharp = xui.str.endWith(editMode,"sharp")  && (editorAutoPop || inputReadonly || insPopType);
                        if(!inactive){
                            if( xui.isFun(editor.expand)
                                && editorAutoPop!==false
                                && ( issharp || ((xui.str.endWith(editMode,"sharp") || editMode=="focus") &&   (editorAutoPop || noInputType)))
                             ) {
                                expand=1;
                                editor.expand(cellNode,false,null);
                             }
                        }

                        if(!inline)
                            editor.setVisibility(issharp ? "hidden" : "visible");
                       //activate editor
                        if(!xui.str.startWith(editMode,"hover") || !byhover){
                            if(!inactive){
                                xui.asyRun(function(){
                                    // destroyed
                                    if(!profile.box)return;
                                    var target=editor;
                                    if(target.get(0)&&target.get(0).box){
                                        if(expand && editor.getPopWnd)
                                            target = editor.getPopWnd();
                                        if(target){
                                            xui.tryF(target&&target.activate,[],target);
                                            target.get(0)._stopmouseupcaret=1;
                                        }
                                    }
                                });
                            }
                        }else{
                            var bfun=function(){
                                if(editor)editor.getRoot().onMouseout(null,"tg-hover-edit");
                            },cfun=function(){
                                if(editor)editor.getRoot().onMouseout(function(){
                                    if(editor) xui.tryF(editor.undo,[],editor);
                                },"tg-hover-edit");
                            },dfun=function(){
                               // if(editor) xui.tryF(editor.undo,[],editor);
                            };
                            editor.onFocus(bfun).beforePopShow(function(editorprf, popCtl,items){
                                bfun();
                                editor.onBlur(null);
                                var rst;
                                if(editorEvents && editorEvents.beforePopShow)rst = editorEvents.beforePopShow(editorprf, popCtl, items);
                                if(profile.beforePopShow)rst = profile.boxing().beforePopShow(profile, editorprf.$cell, editorprf, popCtl, items, editorprf.$cell._row, editorprf.$cell_col);
                                return rst;
                            }).afterPopHide(function(){
                                cfun();
                                editor.onBlur(dfun);
                            }).onBlur(dfun);

                            if(!inactive&& !expand)
                                xui.tryF(editor&&editor.activate,[],editor);
                        }
                    }
          			if(adjustEditorInput)adjustEditorInput(cell, editor, profile);
                    if(profile.onBeginEdit)profile.boxing().onBeginEdit(profile, cell, editor, 'cell', cell._row, cell._col);
                }
            }
            if(!inline){
                //give a reference
                profile.$curEditor=editor;
                profile.$cellInEditor=cell;
            }
            editor.get(0).$editMode=editMode;
            if(ishotrow){
                profile.__needchecktmprow=true;
                profile.box._sethotrowoutterblur(profile);
            }
        },
        _adjustBody:function(profile, trigger, callback){
            if(!profile.renderId || profile.destroyed)return;
            xui.resetRun(profile.$xid+'4',function(){
                // destroyed
                if(!profile.renderId || profile.destroyed)return;

                var prop = profile.properties,
                    us = xui.$us(profile),
                    adjustunit = function(v,emRate){return profile.$forceu(v, us>0?'em':'px', emRate)},
                    size = profile.getSubNode("BORDER").cssSize(),
                    _border = profile._$cache.hasOwnProperty('_root_b_w') ? profile._$cache._root_b_w : (profile._$cache._root_b_w = profile.getRoot().contentBox()?2:0),
                    width = profile.$px(size.width),
                    height = profile.$px(size.height),

                    //left region
                    w1 = prop.rowHandler?(profile.$px(prop.rowHandlerWidth) + _border):0,
                    w2,
                    h1 = profile.getSubNode('HEADER1'),
                    h2 = profile.getSubNode('HEADER2'),
                    b12 = profile.getSubNode('BODY12'),
                    b21 = profile.getSubNode('BODY21'),
                    s11 = profile.getSubNode('SCROLL11'),
                    s12 = profile.getSubNode('SCROLL12'),
                    s21 = profile.getSubNode('SCROLL21'),
                    s22 = profile.getSubNode('SCROLL22'),
                    rh = h2.height(),
                    rr = b12.height();

                // adjust width
                // left region
                if(prop.freezedColumn){
                    xui.arr.each(prop.header,function(col,i){
                        if(i==prop.freezedColumn)return false;
                        if(!col.hidden)w1 += profile.$px(col.width) + _border;
                    });
                }
                // for border-bottom
                if(rr && prop.freezedRow)rr-=1;
                // for border-right
                if(w1 && prop.freezedColumn)w1-=1;

                w2 = width - w1;
                profile._leftregionw = w1;

                //h1.width(adjustunit(w1));
                //s21.width(adjustunit(w1));
                h2.width(adjustunit(w2));
                s22.width(adjustunit(w2));

                // for scroll sync
                xui.asyRun(function(){
                    // separated read/write
                    var b21e=b21.isEmpty(),
                        s21e=s21.isEmpty(),
                        b12e=b12.isEmpty(),
                        s12e=s12.isEmpty(),
                        fr=prop.freezedRow,
                        pb=!s21e?((s22.isScrollBarShowed('x')?xui.Dom.getScrollBarSize():0) + 'px'):'',
                        st=!s21e?s22.scrollTop():0,
                        sl=(fr&&!s12e)?s22.scrollLeft():0,
                        pr=(fr&&!b12e)?((s22.isScrollBarShowed('y')?xui.Dom.getScrollBarSize():0) + 'px'):'';

                    if(!b21e)b21.css('padding-bottom', pb);
                    if(fr&&!b12e)b12.css('padding-right', pr);
                    if(!s21e)s21.scrollTop(st);
                    if(fr&&!s12e)s12.scrollLeft(sl);
                },100);

                // adjust height
                s11.height(rr?adjustunit(rr):0);
                s12.height(rr?adjustunit(rr):0);
                s21.height(adjustunit(height - rh - rr));
                s22.height(adjustunit(height - rh - rr));

                // avoid onmouseout of CELLS2 trigger CELLS1 scroll to top
                s11.css('display',rr&&profile._leftregionw?'':'none');
                s12.css('display',rr?'':'none');
                s21.css('display',profile._leftregionw?'':'none');

                // others
                s22.css('overflow','hidden');
                var overflowX=profile.box._adjustRelWith(profile);

                var body12=profile.getSubNode('ROWS12'),
                    body22=profile.getSubNode('ROWS22'),
                    header=profile.getSubNode('HCELLS2'),
                    cols=profile.properties.header,
                    scroll=profile.getSubNode('SCROLL22'),
                    t,l,last1,last2,keys=profile.keys,ww,bw=0,hiw,bodyw;

                if(body22.get(0).clientHeight){
                    if(header.get(0).clientHeight){
                        if(t=header.get(0).childNodes){
                            l=t.length;
                            while(l){
                                if(t[l-1].clientHeight){
                                    last1=t[l-1];
                                    break;
                                }
                                --l;
                            }
                        }
                        ww=last1?(last1.offsetWidth+last1.offsetLeft):0;
                        hiw = adjustunit(ww+100);
                        bodyw = bw = last1.offsetLeft;
                    }
                    if(t=body22.get(0).childNodes){
                        l=t.length;
                        while(l){
                            if(t[l-1].clientHeight && !(t[l-1].firstChild && (t[l-1].firstChild.id+"").indexOf("-GCELL:")!=1)){
                                last2=t[l-1];
                                break;
                            }
                            --l;
                        }
                        if(last2){
                            var sid=profile.getSubId(last2.id);
                            t=profile.getSubNode('CELLS2',sid);
                            last2 = null;
                            if(t=t.get(0) && t.get(0).childNodes){
                                l=t.length;
                                while(l){
                                    if(t[l-1].clientHeight){
                                        last2=t[l-1];
                                        break;
                                    }
                                    --l;
                                }
                            }
                        }
                    }
                }

                if(last2||last1){
                    bodyw=adjustunit(bw = last2?last2.offsetLeft:last1.offsetLeft);
                }else{
                    var prop = profile.properties,hd=prop.header,rows=prop.rows,
                    //defult
                    w = 0;
                    xui.arr.each(hd,function(o){
                        if(o.hidden!==true)
                            w += ('_colWidth' in o) ? profile.$px(o._colWidth) : (profile.$px(o.width) + _border);
                    });
                    bodyw = bw= w;
                }
                t=last1=last2=null;

                //HI
                if(hiw>100)header.parent().width(hiw);
                if(bodyw){
                  body12.width(bodyw);
                  body22.width(bodyw);
                }

                // must use 'auto' for Android
                scroll.css('overflow','auto');

                if(bw>scroll.width()+_border){
                    overflowX="auto";
                }

                scroll.css('overflowX', overflowX);

                scroll.onScroll();

                if(profile.onBodyLayout)
                    profile.boxing().onBodyLayout(profile, trigger);

                if(callback)callback();
            });
            // formula
            if(trigger!='render' && trigger!='rowhandler' && trigger!='foldrow' && trigger!='expandrow' && trigger!='setcol' && trigger!='resize')
                xui.resetRun(profile.key+":"+profile.$xid,function(){
                    if(profile&&profile.box)profile.boxing().triggerFormulas(null, trigger);
                });
        },
        _adjustHeader:function(arr){
            var a=xui.copy(arr),m;
            xui.arr.each(a,function(o,i){
                //id will be adjusted in _prepareHeader
                a[i]=xui.copy(o);
            });
            return a;
        },
        _adjustGrpColsData:function(profile,arr){
            if(!xui.isArr(arr))return xui.copy(arr);

            var prop=profile.properties,
                header=prop.header,
                len=header.length,
                slen=(len+'').length,
                SubID=xui.UI.$tag_subId,
                a=xui.copy(arr,function(o){
                    o.from=parseInt(o.from,10)||0;
                    o['to']=parseInt(o['to'],10)||0;
                    return o.from<=len && o['to']<=len && o['to']>=o.from;
                });

            xui.arr.each(a,function(o,i){
                a[i]=xui.isHash?xui.copy(o):{};
            });
            xui.arr.stableSort(a,function(x,y){
                // desc by from, aesc by to
                return x.from>y.from?1:x.from==y.from?(x['to']>y['to']?-1:x['to']==y['to']?0:1):-1;
            });
            for(var j=0,m=a.length,grp;j<m;j++){
                grp=a[j];
                grp[SubID]=grp[SubID]||('-g_'+profile.pickSubId('grpCol'));
                grp.id=grp.id||grp[SubID];
                if(!grp.caption)grp.caption=grp.id;
                grp._isgroup=1;
                delete grp._grp;

                profile.colMap[grp[SubID]]=grp;
                profile.colMap2[grp.id]=grp[SubID];
            }
            xui.arr.each(a,function(o,i){
                for(var j=0;j<i;j++){
                    // across
                    if(a[i]['to'] > a[j].from && a[i].from < a[j]['to']){
                        // cut
                        if(a[i]['to'] > a[j]['to'])a[i]['to'] = a[j]['to'];
                        // record it
                        (a[i]._grp||(a[i]._grp=[])).push(a[j].id);
                    }
                }
            });
            xui.arr.each(header,function(o){
                delete o._grp;
            });

            var layer=0;
            // calculate layers
            for(var j=0,m=a.length,grp,o;j<m;j++){
                grp=a[j];
                for(var i=grp.from;i<=grp['to'];i++){
                    o=header[i];
                    (o._grp||(o._grp=[])).push(grp.id);
                    if(!grp._layer){
                        grp._layer=o._grp.length;
                    }
                    layer=Math.max(layer,grp._layer);
                }
            }
            profile._headerLayers = layer;
            return a;
        },
        _adjustRows:function(profile, arr, ignoreMixColumn){
            var a,m,h={},hvalue={},hcap={},p=profile.properties,uid=p.uidColumn,key,keys, mixcol,rheader=[];
            if(uid)uid=xui.arr.subIndexOf(p.header,'id',uid);
            else uid=-1;

            xui.arr.each(p.header,function(c,i){
                key=c.id||c;
                keys=null;
                if(!ignoreMixColumn && key.indexOf(":")!=-1){
                    keys=key.split(':');
                }
                if(keys && keys[0] && keys[1]){
                    hvalue[keys[0]]=hcap[keys[1]]=i;
                    rheader.push(keys[0], keys[1]);
                    mixcol=1;
                }else{
                    h[key]=i;
                    rheader.push(key);
                }
            });

            if(xui.isArr(arr) && arr.length && typeof arr[0] !='object')a=[arr];
            else a=xui.copy(arr);

            xui.arr.each(a,function(o,i){
                //id will be adjusted in _prepareItems
                if(xui.isArr(o))a[i]={cells:xui.copy(o)};
                else a[i]=xui.copy(o);

                // there's mix column
                if(mixcol && xui.isArr(a[i].cells)){
                    var cells1=a[i].cells,cells2=[],col;
                    for(var j=0,l=rheader.length;j<l;j++){
                        col=rheader[j];
                        if(col in h)cells2.push(cells1[j]);
                        else{
                            if(col in hvalue){
                                cells2.push({
                                    value:cells1[j],
                                    caption:cells1[++j]
                                });
                            }
                        }
                    }
                    a[i].cells=cells2;
                }

                // check if it's a map row data
                //1 > {col:value} 2 >{cells:{col:value}}
                var tt = (xui.isHash(a[i]) && (!a[i].cells || !xui.isObj(a[i].cells))) ? 1 : (a[i].cells && xui.isHash(a[i].cells)) ? 2: 0;
                if(!o.group && tt){
                    var cells=[], hash;
                    xui.each(tt==1?a[i]:a[i].cells,function(v,i){
                        if(i in h)cells[h[i]]=xui.isHash(v)?v:{value:v};
                        else{
                            if(i in hvalue){
                                hash=cells[hvalue[i]]||{};
                                hash.value=v;
                                cells[hvalue[i]]=hash;
                            }
                            if(i in hcap){
                                hash=cells[hcap[i]]||{};
                                hash.caption=v;
                                cells[hcap[i]]=hash;
                            }
                        }
                    });
                    a[i].cells=cells;
                }

                xui.arr.each(m = a[i].cells, function(o,i){
                    if(xui.isDefined(o)){
                        //It's a hash
                        if(!!o && xui.isHash(o))
                            m[i]=xui.copy(o);
                        // not a hash
                        else
                            m[i]={value:o};
                    }
                });
                // set uidColumn cell's value to row id
                if(!('id' in a[i]) && uid!=-1 && m[uid]&& m[uid].value){
                    a[i].id=m[uid].value;
                }
            });
            return a;
        },
        _adjustColsWidth:function(profile){
            var prop=profile.properties,
                header=prop.header,
                arr=prop.grpCols,
                border=profile._$cache.hasOwnProperty('_root_b_w') ? profile._$cache._root_b_w : (profile._$cache._root_b_w = profile.getRoot().contentBox()?2:0);

            if(prop.showHeader){
                if(arr && xui.isArr(arr)&& arr.length){
                    var _left,_l,_w,flag=false,_ww,
                         _l2=0;
                    for(var j=0,m=arr.length,grp,n;j<m;j++){
                        _l=_w=0;
                        flag=false;
                        grp=arr[j];
                        _left=0;
                        for(var k=0,o;k<=grp['to'];k++){
                            o=header[k];
                            _ww=profile.$px(o._colWidth,null,true);
                            // for the main region
                            if(prop.freezedColumn && prop.freezedColumn==k && !_l2){
                                _l2 = _left;
                            }
                            if(k===grp.from){
                                flag=true;
                                _l=_left;
                            }
                            _left+= _ww + border;
                            if(flag && !o.hidden){
                                _w += _ww + border;
                            }
                        }
                        n=profile.getSubNode("HCELL",grp._serialId);
                        if(_w>border){
                            n.css({display:'',left:profile.$forceu(_l - (prop.freezedColumn
                                                                        ? (grp['to'] > prop.freezedColumn - 1
                                                                                ? _l2
                                                                                : (prop.rowHandler ? -(profile.$px(prop.rowHandlerWidth)+border) : 0)
                                                                            )
                                                                        : 0
                                                                    )
                                                          ), width:profile.$forceu(_w-border)});
                        }else{
                            n.css({display:'none'});
                        }
                        if(prop.freezedColumn && prop.rowHandler && grp._shadow){
                            n=profile.getSubNode("HSCELL",grp._serialId);
                            if(_w>border){
                                n.css({display:'',
                                    left: profile.$forceu(_l + (profile.$px(prop.rowHandlerWidth)+border) ) ,
                                    width:profile.$forceu(_w-border)
                                });
                            }else{
                                n.css({display:'none'});
                            }
                        }
                    }
                }
            }
        },
        // use em here
        _adjustColsHeight:function(profile, force){
            var map=profile.colMap,
                map2=profile.colMap2,
                _layers=profile._headerLayers,
                headerh=profile.properties.headerHeight,
                h=profile.$px(headerh,0,true),
                cacuH=profile.$px(profile.box.$DataModel.headerHeight.ini,0,true)*(_layers+1),
                border=profile._$cache.hasOwnProperty('_root_b_w') ? profile._$cache._root_b_w : (profile._$cache._root_b_w = profile.getRoot().contentBox()?2:0),
                tt,l,th,col,rt,rh,upper,grpcolsh,h2;
            // ensure height here
            if(force||h<cacuH){
                h=cacuH;
            }

            profile.getSubNodes(['HCELLS1','HCELLS2','GRPCELLBOX1','GRPCELLBOX2']).height(profile.$px2em(h)+'em');
            h2=profile.$px2em(h-border)+"em";
            profile.getSubNode('FHCELL').css({height:h2});
            profile.getSubNode('LHCELL').css({height:h2});
            if(!_layers){
                 profile.getSubNode('HCELL',true).css({height:h2});
                // if(xui.browser.ie6) // ignore ie6 here
                //    profile.getSubNode('HCELLA',true).css({'line-height':h2});
            }else{
                th=h/(_layers+1);
                profile.getSubNode('HCELL',true).each(function(o){
                    col=profile.getSubId(o.id);
                    if(col=map[col]){
                        // group
                        if(col&&col._isgroup){
                            upper=0;
                            for(var i in map){
                                tt=map[i];
                                if(tt._isgroup && tt._layer<col._layer && tt. from <=col['to'] && tt['to']>=col['from']){
                                    upper += profile.$px(tt.height || th);
                                }
                            }
                            xui(o).top(profile.$px2em(upper)+'em');
                            rh = profile.$px(col.height || th);
                        }else{
                            if(col._grp&&(l=col._grp.length)){
                                grpcolsh=0;
                                for(var i=0;i<l;i++){
                                    if(tt=map2[col._grp[i]]){
                                        grpcolsh += profile.$px(map[tt].height || th);
                                    }
                                }
                                rh = h - grpcolsh;
                            }else
                                rh = h;
                        }
                        xui(o).height(profile.$px2em(rh-border)+'em');

                        if(col && col._isgroup && col._shadow){
                            o=profile.getSubNode("HSCELL",col._serialId);
                            xui(o).top(profile.$px2em(upper)+'em');
                            xui(o).height(profile.$px2em(rh-border)+'em');
                        }
                    }
                });
            }
        },
         _focuscell:function(profile, e, src){
            if(profile.properties.disabled||profile.properties.readonly)return;
            if(!xui.use(src).get(0))return;
            // ensure call _focuscell once when click
            if(!profile.$_ensureOnce){
                profile.$_ensureOnce=1;
                xui.asyRun(function(){
                    profile.$_ensureOnce=0;
                });
            }else return;

            var p = profile.properties,
                box=profile.box,
                getPro=box.getCellOption,
                cell = profile.cellMap[profile.getSubId(src)],
                mode = p.activeMode, id;

            if(cell && cell._ignorefocus)return;

            if(cell){
                var edit=false,type=getPro(profile, cell, "type");
                if(getPro(profile, cell, 'editable')){
                    if(getPro(profile, cell, 'disabled')||getPro(profile, cell, 'readonly')){
                        edit=false;
                    }else{
                        edit=true;
                        if((getPro(profile, cell, 'editMode')=="inline"&&type!=='label')|| type=='dropbutton'){
                            if(cell._editor)cell._editor.activate();
                        }else{
                            box._editCell(profile, cell._serialId);
                            xui(src).tagClass('-active', false);
                            xui.asyRun(function(){
                                // destroyed
                                if(!profile.box)return;
                                xui.use(src).parent().onMouseout(true,{$force:true})
                                          .parent().onMouseout(true,{$force:true});
                            });
                        }
                    }
                }
                // if not in edit mode
                if(!edit){
                    if(cell && mode=='cell'){
                        id = xui.use(src).id();
                        box._activeCell(profile, id);
                    }
                }else{
                    if(cell && mode=='cell'){
                        box._activeCell(profile, false);
                    }
                }
            }else{
                var row = profile.rowMap[profile.getSubId(src)];
                if(getPro(profile, row, 'editable')){
                    if(getPro(profile, row, 'disabled')||getPro(profile, row, 'readonly')){
                    }else{
                        profile.boxing().editFirstCell(row);
                    }
                }
            }
            if(mode=='row'){
                id = xui.use(src).parent(2).id();
                box._activeRow(profile, id);
            }
        },
        _getToggleNode:function(profile, rowId){
            return profile.getSubNode('ROWTOGGLE', rowId);
        },
        _showTips:function(profile, node, pos){
            if(profile.properties.disableTips)return;
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);
            if(!xui.Tips)return;

            var ks=profile.keys,item,sid,id,pid,ppid;
            if(profile.properties.disabled)return;

            id=node.id;
            pid=xui.get(node,["parentNode","id"])||"";
            ppid=xui.get(node,["parentNode","parentNode","id"])||"";
            sid=profile.getSubId(id);

            if(id.indexOf(ks.FHCELL)==0||pid.indexOf(ks.FHCELL)==0||ppid.indexOf(ks.FHCELL)==0)
                item = {tips:profile.properties.tips};
            else if(id.indexOf(ks.FCELL)==0 || pid.indexOf(ks.FCELL)==0)
                item = profile.rowMap[sid];
            else if(id.indexOf(ks.HCELL)==0 || id.indexOf(ks.HSCELL)==0 || pid.indexOf(ks.HCELLA)==0)
                item = profile.colMap[sid];
            else if(id.indexOf(ks.CELL)==0 || pid.indexOf(ks.CELLA)==0)
                item = profile.cellMap[sid];

            if(item){
                xui.Tips.show(pos, xui.isSet(item.tips)?item.tips:(item._$tips||item._caption||item.caption));
                return false;
            }else
                return true;
        },
        _adjustRelWith:function(profile){
            var prop=profile.properties,
                _ww,
                cols=profile.colMap,
                t2=profile.getSubNode('SCROLL22'),
                t3=profile.getSubNode('BODY22'),
                bW = profile._$cache.hasOwnProperty('_body22_b_w') ? profile._$cache._body22_b_w : (profile._$cache._body22_b_w = t3.contentBox()?1:0),
                width=t2.width(),
                borderC=0;

            var fixW=0,relWTotal=0,relWCol=[],relWCol2=[],overflowX;
            //if(prop.rowHandler){
                //borderC++;
                //fixW=profile.$px(prop.rowHandlerWidth);
            //}
            xui.each(profile.colMap,function(col){
                if(col.hidden || col._isgroup)return;
                // ignore left region columns
                if(col._region==1)return;

                if(!col.flexSize){
                    fixW+=profile.$px(col.width);
                }else{
                    relWTotal+=profile.$px(col.width);
                    relWCol.push(col)
                    relWCol2.push(col);
                }
                borderC++;
            });

            if(!relWCol.length){
                overflowX='auto';
                profile.box._adjustColsWidth(profile);

                return;

            }else{
                overflowX='hidden';
                if(t2.scrollable('y'))
                    width-=xui.Dom.getScrollBarSize();
            }

            if(!profile._$cache.hasOwnProperty('_col_border_w')){
              profile.getSubNodes('HCELL',true).each(function(hc){
                  if(hc.clientHeight){
                      profile._$cache._col_border_w = hc.offsetWidth - profile.$px(hc.style.width);
                      return false;
                  }
              });
            }

            // try the best to avoid using offsetWidth for performance
            if(!profile._$cache.hasOwnProperty("__lcellW")){
              var hc = profile.getSubNode("LHCELL").get(0), lcw,
                lcellw = xui.get(hc,["firstChild","firstChild"]) || xui.get(hc,["lastChild","firstChild"]) ? (lcw=hc.offsetWidth) : 0;
              profile.getSubNodes('LCELL',true).each(function(hc){
                  if(xui.get(hc,["firstChild","firstChild"]) || xui.get(hc,["lastChild","firstChild"])){
                      lcellw=Math.max(lcellw, lcw);
                  }
              });
              profile._$cache.__lcellW = lcellw;
            }

            width -= profile._$cache.__lcellW;
            // all flexSize cols' width
            profile._relWTotal=relWTotal;
            // available room for flexSize cols
            profile._relAvailable=width-(fixW+borderC*(profile._$cache._col_border_w||0));

            while(relWCol.length && width!=fixW+borderC*(profile._$cache._col_border_w||0)){
                var fW=profile._relAvailable,
                    fW1=0,t,
                    l=relWCol.length,
                    retry=0;
                for(var i=l-1;i>=0;i--){
                    var col=relWCol[i],
                        w = i===0?(fW-fW1):Math.round(fW*(profile.$px(col.width)/relWTotal));

                    if(w<0)w=0;
                    _ww=w;
                    if(col.hasOwnProperty('minWidth')){
                        if((t=profile.$px(col.minWidth))>w){
                            fixW+=t;
                            _ww=t;
                            xui.arr.removeFrom(relWCol,i);
                            retry++;
                        }
                    }
                    if(col.hasOwnProperty('maxWidth')){
                        if((t=profile.$px(col.maxWidth))<w){
                            fixW+=t;
                            _ww=t;
                            xui.arr.removeFrom(relWCol,i);
                            retry++;
                        }
                    }
                    col._colWidth = profile.$forceu(_ww);
                    fW1+=_ww;
                }
                // break while;
                if(retry===0||retry===l)
                    break;
            }
            profile.box._adjustColsWidth(profile);
            if(relWCol2.length){
                xui.arr.each(relWCol2,function(col){
                    var n,nodes=[];
                    xui.each(col._cells,function(o){
                        n=profile.getSubNode('CELL',o);
                        if(n._nodes.length)nodes.push(n.get(0));
                    });
                    n=profile.getSubNode('HCELL',col._serialId);
                    if(n._nodes.length){
                        nodes.push(n.get(0));
                    }
                    profile.box._adjusteditorW(profile, xui(nodes).width(col._colWidth), profile.$px(col._colWidth)+bW);
                });
            }
            return overflowX;
        },
        _getRow:function(profile,row,type,splitMixColumn){
            if(row){
                if(type=='data')
                    return xui.clone(row,true);
                else if(type=='min'||type=='value'){
                    var a=[];
                    xui.each(row.cells||row,function(cell,j){
                        a[j]=('value' in cell)?cell.value:cell;
                    });
                    return a;
                }else if(type=='map'){
                    return profile.boxing().getRawData(row, splitMixColumn);
                }else
                    return row;
            }
        },
        $cancelHoverEditor:function(profile){
            if(profile.destroyed)return;
            var type=xui.get(profile,['$curEditor','_nodes',0,'$editMode'])||"",t;
            if(xui.str.startWith(type,'hover')){
                var editor=profile.$curEditor;
                if(type=="hover" && (t=editor.get(0)) && t.$poplink)return false;
                xui.tryF(editor.undo,[],editor);
            }
        },
        _onresize:function(profile,width,height){
            var prop = profile.properties,
                f=function(k){return profile.getSubNode(k)},
                us = xui.$us(profile),
                adjustunit = function(v,emRate){return profile.$forceu(v, us>0?'em':'px', emRate)},
                root = profile.getRoot(),
                borderW = profile._$cache.hasOwnProperty('_root_b_w') ? profile._$cache._root_b_w : (profile._$cache._root_b_w = root.contentBox()?2:0),
                w1 = prop.rowHandler?(profile.$px(prop.rowHandlerWidth) + borderW):0,
                w2,
                border = f('BORDER'),
                h1 = f('HEADER1'),
                h2 = f('HEADER2'),
                b12 = f('BODY12'),
                b21 = f('BODY21'),
                s11 = f('SCROLL11'),
                s12 = f('SCROLL12'),
                s21 = f('SCROLL21'),
                s22 = f('SCROLL22'),

                rh = h2.height(),
                rr = b12.height();

             // calculate by px
            width=width?profile.$px(width,null, true):width;
            height=height?profile.$px(height, null, true):height;

            border.cssSize({
                width:width?adjustunit(width):null,
                height:height?adjustunit(height):null
            });

            // adjust width
            if(width){
                // left region
                if(prop.freezedColumn){
                    xui.arr.each(prop.header,function(col,i){
                        if(i==prop.freezedColumn)return false;
                        if(!col.hidden)w1 += profile.$px(col.width) + borderW;
                    });
                }
                // for border-bottom
                if(rr && prop.freezedRow)rr-=1;
                // for border-right
                if(w1 && prop.freezedColumn)w1-=1;

                w2 = width - w1;
                profile._leftregionw = w1;

                //h1.width(adjustunit(w1));
                h2.width(adjustunit(w2));
                //s21.width(adjustunit(w1));
                //s22.width(adjustunit(w2));
            }

            // adjust height
            if(height){
                s11.height(rr?adjustunit(rr):0);
                s12.height(rr?adjustunit(rr):0);
                s21.height(adjustunit(height - rh - rr));
                s22.height(adjustunit(height - rh - rr));
                // avoid onmouseout of CELLS2 trigger CELLS1 scroll to top
                s11.css('display',rr?'':'none');
                s12.css('display',rr?'':'none');
            }
            if(width){
                // avoid onmouseout of CELLS2 trigger CELLS1 scroll to top
                s11.css('display',profile._leftregionw?'':'none');
                s21.css('display',profile._leftregionw?'':'none');
            }
            // for modify em value
            if(profile.$forceRelayout){
                this._adjustColsWidth(profile);
                this._adjustColsHeight(profile);
            }

            this._adjustBody(profile,'resize');
        }
    }
});
