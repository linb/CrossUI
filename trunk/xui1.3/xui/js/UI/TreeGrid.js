//rowMap => row_SerialIdMapItem
//rowMap2 => row_ItemIdMapSerialId
//colMap => header_SerialIdMapItem
//colMap2 => header_ItemIdMapSerialId
//cellMap => cells_SerialIdMapItem
Class("xui.UI.TreeGrid",["xui.UI","xui.absValue"],{
    Instance:{
        activate:function(){
            var profile=this.get(0),t;
            if(!profile.renderId)return;
            profile.getSubNode('ROWS').nextFocus(true, true, true);
            return this;
        },
        _setCtrlValue:function(value){
            return this.each(function(profile){
                if(!profile.renderId)return;
                if(profile.properties.activeMode=='none')return;

                var box = profile.boxing(),
                    uiv = box.getUIValue(),
                    p = profile.properties,
                    k = p.activeMode=='row'?'CELLS':'CELL',
                    getN = function(k,i){return profile.getSubNode(k,i)},
                    getI = function(i){
                        var map1=profile.rowMap2;
                        if(p.activeMode=='row')
                            return map1[i];
                        else{
                            if(!i)return;
                            var r=(''+i).split('|');
                            return _.get(profile.rowMap,[map1[r[0]],'_cells',r[1]]);
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
                    _.arr.each(uiv,function(o){
                        getN(k, getI(o)).tagClass('-checked',false)
                    });
                    _.arr.each(value,function(o){
                        getN(k, getI(o)).tagClass('-checked')
                    });
                    // clear the header's row handler checkbox
                    if(value.length===0){
                        getN("HFMARK").tagClass('-checked',false);
                        delete profile._$checkAll;
                    }
                }
            });
        },
        /*insert rows to dom
        arr is formatted properties
        pid,base are item id
        before: insert before?
        */
        _insertRowsToDom:function(profile, arr, pid, base, before){
            //if parent not open, return
            if(pid){
                var parent = profile.rowMap[pid];
                if(parent && !parent._inited)return;
            }
            if(!arr)
                arr=[];

            var obj,hw,
                hw=profile.getSubNode('FHCELL').width();
            //give width at here
            _.arr.each(arr,function(o){
                o._row0DfW = hw?('width:'+hw+'px'):'';
                _.arr.each(o.cells,function(v,i){
                    v.width=v._col._pxWidth;
                })
            });

            //build dom
            var nodes = profile._buildItems('rows', arr);
            //get base dom
            if(!base){
                //no base add to parent
                if(pid){
                    obj = profile.getSubNode('SUB', pid);
                }else{
                    obj = profile.getSubNode('ROWS');
                }
                if(before)
                    obj.prepend(nodes);
                else
                    obj.append(nodes);
            }else{
                //
                obj = profile.getSubNode('ROW', base);
                if(before)
                    obj.addPrev(nodes);
                else{
                    obj.addNext(nodes);
                }
            }

            //add sub
            _.arr.each(arr,function(o){
                o.open=false;
            });

            //clear rows cache
            delete profile.$allrowscache;

            profile.box._adjustBody(profile,'addrow');
        },
        _refreshHeader:function(header){
            var profile=this.get(0),
                pro=profile.properties,
                box=profile.box,
                grpcols=_.clone(pro.grpCols,false,2),
                arr,arr2,
                rows=this.getRows("data");

            _.breakO(profile.colMap,2);

            header=box._adjustHeader(header||[]);
            arr=box._prepareHeader(profile, header);
            pro.header = header;

            this.removeAllRows();

            profile.getSubNode('HCELL', true).remove();

            var nodes;
            if(arr.length){
                nodes=profile._buildItems('header', arr);
                profile.getSubNode('LHCELL').addPrev(nodes);
            }
            if(grpcols && _.isArr(grpcols) && grpcols.length>0){
                grpcols=box._adjustGrpColsData(profile,grpcols);
                pro.grpCols=grpcols;
                arr2=box._prepareGrpCols(profile, grpcols, arr);
                if(arr2 && arr2.length){
                    nodes=profile._buildItems('grpCols', arr2);
                    profile.getSubNode('GRPCELLBOX').append(nodes);
                }
                box._adjustColsH(profile);
                box._adjustColsV(profile,pro.headerHeight);
            }
            if(rows&&rows.length)
                this.setRows(rows);

            box._adjustBody(profile,'addcol');

            //render
            var co=profile.properties.colOptions;
            _.arr.each(arr,function(o){
                if(_.isFun(o.colRenderer||co.colRenderer))
                    (o.colRenderer||co.colRenderer).call(null,profile,o);
            });

            // clear collist cache
            if(profile.$col_pop){
                profile.$col_pop.destroy(true);
                delete profile.$col_pop;
            }
            //clear editor cache
            _.each(profile.$cache_editor,function(o){
                if(!o.destroyed)o.destroy(true);
            });
            profile.$cache_editor={};
        },
        _toggleRows:function(rows, expand){
            var self=this;
            if(rows && rows.length)
                _.arr.each(rows,function(o){
                    self.toggleRow(o.id, expand);
                });
        },
        autoRowHeight:function(rowId){
            return this.each(function(prf){
                if(prf.renderId ){
                    var ev=xui.Event;
                    if(ev.__realtouch)ev.__simulatedMousedown=1;
                    if(rowId && prf.rowMap2[rowId])
                        prf.getSubNode('FHANDLER',prf.rowMap2[rowId]).onDblclick(true);
                    else
                        _.each(prf.rowMap,function(o,i){
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
                        _.each(prf.colMap,function(o,i){
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
        addHotRow:function(focusColId){
            var prf=this.get(0);
            if(prf.renderId)
                prf.box._addTempRow(prf, focusColId);
            return this;
        },
        removeHotRow:function(){
            var profile=this.get(0);
            profile.box._sethotrowoutterblur(profile,true);
            delete profile.__hastmpRow;
            this.removeRows([profile.box._temprowid],false);
            return this;
        },
        isDirtied:function(){
            var dirty=false;
            _.each(this.get(0).cellMap,function(v){
                if(v._oValue!==v.value){
                    dirty=true;
                    return false;
                }
            });
            return dirty;
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
        getRowByDom:function(src, type){
            return this.get(0).box._getRow(this.get(0), this._getObjByDom(src, "row"),type);
        },
        getHeaderByDom:function(src){
            return this._getObjByDom(src, "col");
        },
        getCellByDom:function(src){
            return this._getObjByDom(src, "cell");
        },
        /*rows related*/
        //type: 'original', 'data', 'min'
        getRows:function(type){
            var v=this.get(0).properties.rows,a,b;
            if(!_.isArr(v))return [];
            if(type=='data'||type=='min'||type=='map'){
                a=_.clone(v,true);

                if(a&&a.length&&a[a.length-1]&&a[a.length-1].id==this.constructor._temprowid)
                    a.pop();

                if(type=='min'){
                    _.arr.each(a,function(o,i){
                        if(a[i].cells){
                            _.each(b=a[i]=(a[i].cells||a[i]),function(v,j){
                                b[j] = v.value;
                            });
                        }
                    });
                }
                return a;
            }else
                return v;
        },
        getRowbyRowId:function(rowId, type){
            var profile=this.get(0),v=profile.rowMap2;
            if(v&&v[rowId]){
                return profile.box._getRow(profile, profile.rowMap[v[rowId]], type);
            }else return;
        },
        getRowbyCell:function(cell, type){
            return this.constructor._getRow(this.get(0), cell._row, type);
        },

        toggleRow:function(id, expand){
            var profile = this.get(0),
            row = profile.rowMap[profile.rowMap2[id]];
            if(row && row.sub)
                profile.box._setSub(profile, row, typeof expand=="boolean"?expand:!row._checked);
            return this;
        },
        updateRow:function(rowId,options){
            var ns=this, profile=ns.get(0), orow=ns.getRowbyRowId(rowId), nid;
            if(orow){
                var rid=orow._serialId, t,tt;
                if(typeof options!='object') options={caption:options};
                else _.filter(options,true);

                // [[modify id
                if(_.isSet(options.id))options.id+="";
                if(options.id && options.id!==rowId){
                    nid=options.id;
                    var m2=profile.rowMap2, v;
                    if(!m2[nid]){
                        if(v=m2[rowId]){
                            m2[nid]=v;
                            delete m2[rowId];
                            profile.rowMap[v].id=nid;
                            // modify cells link
                            _.each(profile.colMap,function(o){
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
                if(_.isEmpty(options))
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
                    _.each(profile.colMap,function(o){
                        if(o=o._cells)
                            delete o[nid||rowId];
                    });
                    // make sure data
                    orow=_.clone(orow,true);
                    _.merge(orow, options, 'all');
                    if('sub' in options && !options.sub)delete orow.sub;

                    ns.insertRows([orow],pid,id,true);
                    ns.removeRows([id]);

                    if(profile.properties.activeMode=='row'){
                        var uiv=profile.properties.$UIvalue||"", arr=(''+uiv).split(profile.properties.valueSeparator);
                        if(arr.length && _.arr.indexOf(arr, rowId)!=-1){
                            if(nid)
                                _.arr.removeValue(arr, rowId);
                            ns.setUIValue(arr.join(profile.properties.valueSeparator), true);
                        }
                    }

                }else{
                    if('sub' in options){
                        t=ns.getSubNode('ROWTOGGLE',rid);
                        if(options.sub)
                            t.removeClass('xui-uicmd-empty').addClass('xui-uicmd-toggle2')
                        else
                            t.removeClass('xui-uicmd-toggle2').addClass('xui-uicmd-empty')
                    }

                    if(t=options.height)
                        ns.getSubNode('CELLS',rid).height(t);

                    if(t=options.rowStyle)
                        (tt=ns.getSubNode('CELLS',rid)).attr('style',tt.attr('style')+";"+t);

                    if(t=options.rowClass)
                        ns.getSubNode('CELLS',rid).addClass(t);

                    if(options.hasOwnProperty('disabled')){
                        var cls=profile.getClass('CELLS', '-disabled');
                        if(options.disabled)
                            ns.getSubNode('CELLS',rid).addClass(cls);
                        else
                            ns.getSubNode('CELLS',rid).removeClass(cls);
                    }
                    if(options.hasOwnProperty('readonly')){
                        var cls=profile.getClass('CELLS', '-readonly');
                        if(options.readonly)
                            ns.getSubNode('CELLS',rid).addClass(cls);
                        else
                            ns.getSubNode('CELLS',rid).removeClass(cls);
                    }
                    if(t=options.firstCellStyle)
                        (tt=ns.getSubNode('FCELL',rid)).first().attr('style',tt.attr('style')+";"+t);
                    if(t=options.firstCellClass)
                        ns.getSubNode('FCELL',rid).first().addClass(t);

                    if(options.hasOwnProperty('caption'))
                        ns.getSubNode('FCELLCAPTION',rid).get(0).innerHTML=options.caption;
                    if(options.hasOwnProperty('preview')){
                        if(options.preview)
                            ns.getSubNode('PREVIEW',rid).css('display','block').html(options.preview);
                        else
                            ns.getSubNode('PREVIEW',rid).css('display','none');
                    }
                    if(options.hasOwnProperty('summary')){
                        if(options.summary)
                            ns.getSubNode('SUMMARY',rid).css('display','block').html(options.summary);
                        else
                            ns.getSubNode('SUMMARY',rid).css('display','none');
                    }
                    if(options.hasOwnProperty('rowResizer')){
                        t=!!options.rowResizer;
                        ns.getSubNode('FHANDLER',rid).css('display',(options.rowResizer=t)?"block":'none');
                    }

                    if('hidden' in options){
                        var  b = !!options.hidden;
                        if(b){
                            if(orow.hidden!==true){
                                ns.getSubNode('ROW',rid).css('display','none');
                            }
                        }else{
                            if(orow.hidden===true){
                                ns.getSubNode('ROW',rid).css('display','');
                            }
                        }
                    }

                    _.merge(orow, options, 'all');
                }
            }else{
                var rst=ns.get(0).queryItems(ns.getRows(),function(o){return typeof o=='object'?o.id===rowId:o==rowId},true,true,true);
                if(rst.length)
                    _.merge(rst[0][0], options, 'all');
            }
            return ns;
        },
        //pid,base are id
        insertRows:function(arr, pid, base, before){
            var affectUI=arguments[4],
                c=this.constructor,
                profile=this.get(0);

            if(arr && _.isArr(arr) && arr.length>0){
                var pro=profile.properties,
                    row_m=profile.rowMap2,
                    ro=pro.rowOptions,
                    b=profile.rowMap,
                    tar, t, k;

                pid = row_m&&row_m[pid];

                base = row_m&&row_m[base];
                if(base){
                    t=profile.rowMap[base];
                    if(t)pid=t._pid;
                }
                arr=c._adjustRows(arr);
                if(!pid)
                    tar = _.isArr(pro.rows)?pro.rows:(pro.rows=[]);
                else{
                    k=b&&b[pid];
                    tar = _.isArr(k.sub)?k.sub:(k.sub=[]);
                }

                //1
                var rows;
                if(profile.renderId){
                    // if insert to root, or the parent node is inited
                    if(!pid || k._inited){
                        //prepareData(add links)
                        rows = c._prepareItems(profile, arr, pid);
                        this._insertRowsToDom(profile, rows, pid, base, before, arr);

                        //render
                        _.arr.each(arr,function(o){
                            if(_.isFun(o.rowRenderer||ro.rowRenderer))
                                (o.rowRenderer||ro.rowRenderer).call(null,profile,o);
                        });
                    }
                }
                //2
                //must be here
                if(!base)
                    _.arr.insertAny(tar, arr, before?0:-1);
                else{
                    var index = _.arr.subIndexOf(tar,'_serialId', base);
                    _.arr.insertAny(tar,arr, before?index:(index+1));
                }
                //3
                if(profile.renderId){
                    if(!pro.iniFold)
                        profile.boxing()._toggleRows(rows,true);
                    profile.box._asy(profile);
                }

                if(rows&&rows.length){
                    _.breakO(rows,2);
                    rows.length=0;
                }
            }
            if(affectUI!==false && profile.renderId&&profile.__hastmpRow){
                profile.box.__ensurehotrow(profile,null);
            }
            return this;
        },
        //delete row according to id
        //xui.UI.TreeGrid.getAll().removeRows(['2','5'])
        removeRows:function(ids){
            var affectUI=arguments[1],
                self=this,
                profile=self.get(0),
                p=profile.properties,
                cell=profile.cellMap,
                nodes=[],v,count=0;

            //get array
            ids = _.isArr(ids)?ids:[ids];
            _.arr.each(ids,function(o,i){ids[i]=''+o});
            _.arr.each(ids,function(id){
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
                        if(row.sub && _.isArr(row.sub)){
                            var arr=[];
                            _.arr.each(row.sub,function(o){
                                arr.push(o.id)
                            });
                            self.removeRows(arr);
                        }

                        ////delete and clear links
                        _.each(tdids,function(o,i){
                            //clear colMap/properties.header
                            delete cell[o]._col._cells[rowid];
                            _.breakO(cell[o]);
                            //clear cellMap
                            delete cell[o];
                            profile.reclaimSubId(o.slice(3), 'cell');
                        });

                        //clear properties.row array
                        if(temp= row._pid?(temp=profile.rowMap[row._pid])?temp.sub:null:profile.properties.rows)
                            if(_.isArr(temp))
                                _.filter(temp,function(o){
                                    return o._serialId != id;
                                });

                        //clear profile.rowMap2
                        delete profile.rowMap2[rowid];

                        //clear rowMap
                        _.breakO(profile.rowMap[id]);
                        delete profile.rowMap[id];

                        nodes.push(profile.getSubNode('ROW', id).get(0));
                    }
                    profile.reclaimSubId(id.slice(3), 'row');
                }else{
                    var f=function(rows){
                        var index=_.arr.subIndexOf(rows, "id", id);
                        if(index!==-1)_.arr.removeFrom(rows,index);
                        _.arr.each(rows,function(row){
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
                        _.filter(v,function(o){
                            return _.arr.indexOf(ids,o)==-1;
                        });
                        p.$UIvalue=v.join(p.valueSeparator);
                    }else{
                        if(_.arr.indexOf(ids,p.$UIvalue)!=-1)
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
                delete profile.$allrowscache;

                profile.box._asy(profile);
                profile.box._adjustBody(profile,'delrow');
            }
            if(affectUI!==false && profile.renderId&&profile.__hastmpRow){
                profile.box.__ensurehotrow(profile,null);
            }
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
            pos=_.isNumb(pos)?pos:-1;
            if(pos===-1||prop.header.length<pos)pos=prop.header.length;
            if(pos<0)pos=0;

            var arr=prop.grpCols;
            if(arr && _.isArr(arr)&& arr.length){
                for(var j=0,m=arr.length,grp;j<m;j++){
                    grp=arr[j];
                    if(grp.from>pos){
                        grp.from++;
                        grp.to++;
                    }else if(pos>=grp.from && pos<=grp.to){
                        grp.to++;
                    }
                }
            }

            if(profile.renderId){
                colResult = box._parepareCol(profile, col);
                col=colResult[0];

                // insert header
                _.arr.insertAny(prop.header, col, pos);
                // insert dom node
                base = profile.getSubNode('HCELLS').children().get(pos);
                if(base)
                    xui(base).addNext(profile._buildItems('header', [colResult[1]]));

                // render
                var co=profile.properties.colOptions;
                if(_.isFun(col.colRenderer||co.colRenderer))
                    (col.colRenderer||co.colRenderer).call(null,profile,col);

                // for adjust UI
                prop.grpCols=box._adjustGrpColsData(profile,arr);
                box._adjustColsH(profile);
                box._adjustColsV(profile,prop.headerHeight);
                box._adjustBody(profile,'addcol');
            }else{
                // insert header dir
                _.arr.insertAny(prop.header, col, pos);
            }

            //// handle cells
            cells=_.isArr(cells)?cells:[];
            var k=0,
                applaycell=function(rows){
                    _.arr.each(rows,function(row,i){
                        if(row.group){
                            applaycell(row.sub);
                        }else{
                            cell=cells[k];
                            // this row was rendered
                            base=profile.getSubNode('CELLS',row._serialId).children().get(pos);
                            if(base){
                                cellResult = box._parepareCell(profile,cell,row,col);

                                // original cell only
                                _.arr.insertAny(row.cells, cellResult[0], pos);
                                // insert dom node
                                xui(base).addNext(profile._buildItems('rows.cells', [cellResult[1]]));
                            }else{
                                // insert cell dir
                                _.arr.insertAny(row.cells, cell||{}, pos);
                            }
                        }
                        k++;
                    });
                };
            if(rows&&_.isArr(rows)){
                applaycell(rows);
            }
        },
        removeCols:function(ids){
            var affectUI=arguments[1],
                self=this,
                profile=self.get(0),
                box=profile.box,
                prop=profile.properties,
                cell=profile.cellMap,
                SubID=xui.UI.$tag_subId,
                nodes=[],count=0;

            //get array
            ids = _.isArr(ids)?ids:[ids];
            _.arr.each(ids,function(o,i){ids[i]=''+o});
            if(ids&&ids.length>1){
                ids.sort(function(x,y){
                    var xx=_.arr.indexOf(prop.header, x);
                    if(xx==-1)xx=_.arr.subIndexOf(prop.header, "id", x);
                    var yy=_.arr.indexOf(prop.header, y);
                    if(yy==-1)yy=_.arr.subIndexOf(prop.header, "id", y);
                    return xx>yy?1:xx===yy?0:-1;
                });
            }

            var arr=prop.grpCols;
            if(arr && _.isArr(arr)&& arr.length){
                _.arr.each(ids,function(id){
                    var pos=_.arr.indexOf(prop.header, id);
                    if(pos==-1)pos=_.arr.subIndexOf(prop.header, "id", id);
                    if(pos==-1)return;
                    for(var j=0,m=arr.length,grp;j<m;j++){
                        grp=arr[j];
                        if(grp.from>pos){
                            grp.from--;
                            grp.to--;
                        }else if(pos>=grp.from && pos<=grp.to){
                           grp.to--;
                        }
                    }
                },null,true);

                _.filter(arr,function(o){
                    var r=o.to>=o.from;
                    if(!r && profile.renderId){
                        profile.getSubNode("HCELL",o[SubID]).remove();
                        delete profile.colMap[o[SubID]];
                        delete profile.colMap2[o.id];
                    }
                    return r;
                });
            }

            _.arr.each(ids,function(id){
                var index=_.arr.indexOf(prop.header, id);
                if(index==-1)index=_.arr.subIndexOf(prop.header, "id", id);
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
                        _.each(tdids,function(o,i){
                            nodes.push(profile.getSubNode('CELL', o).get(0));
                            //clear colMap/properties.header
                            delete cell[o]._row._cells[colid];
                            _.breakO(cell[o]);
                            //clear cellMap
                            delete cell[o];
                            profile.reclaimSubId(o.slice(3), 'cell');
                        });

                        //clear profile.rowMap2
                        delete profile.colMap2[colid];

                        //clear rowMap
                        _.breakO(profile.colMap[id]);
                        delete profile.colMap[id];

                        nodes.push(profile.getSubNode('HCELL', id).get(0));
                    }
                    profile.reclaimSubId(id.slice(3), 'header');
                }

                var applaycell=function(rows){
                    _.arr.each(rows,function(row){
                        if(row.cells)_.arr.removeFrom(row.cells,index);
                        if(row.sub){
                            applaycell(row.sub);
                        }
                    });
                };
                applaycell(prop.rows);

                _.arr.removeFrom(prop.header,index);
            },null,true);
            if(count>0){
                xui(nodes).remove();

                // remove activerow/cell
                if(profile.$activeCell && !xui.Dom.byId(profile.$activeCell))
                    delete profile.$activeCell;

                prop.grpCols=box._adjustGrpColsData(profile,arr);
                box._adjustColsH(profile);
                box._adjustColsV(profile,prop.headerHeight);
                box._adjustBody(profile,'delcol');
            }
            return self;
        },
        removeAllRows:function(){
            var affectUI=arguments[0],
                profile=this.get(0),
                box=profile.box,
                prop=profile.properties;
            if(!prop.rows || prop.rows.length<00)
                return this;

            for(var i in profile.cellMap)
                profile.reclaimSubId(i.slice(3), 'cell');
            for(var i in profile.rowMap)
                profile.reclaimSubId(i.slice(3), 'row');

            //remove links
            _.each(profile.colMap,function(o){
                o._cells={};
            });
            _.breakO([profile.rowMap, profile.cellMap],3);

            profile.rowMap={};
            profile.cellMap={};
            profile.rowMap2={};

            // remove activerow/cell
            delete profile.$activeCell;
            delete profile.$activeRow;

            profile.properties.rows.length=0;
            if(profile.renderId){
                // ensure the column header scroll to zero
                // code must same to the SCROLL->onScroll event
                if(profile.$sl!=0)
                    profile.getSubNode('HEADER').get(0).scrollLeft=profile.$sl=0;
                profile.getSubNode('SCROLL').scrollTop(0).scrollLeft(0);
                profile.getSubNode('ROWS').empty();
            }
            //clear rows cache
            delete profile.$allrowscache;
            profile.properties.$UIvalue=null;

            if(affectUI!==false&&profile.renderId&&profile.__hastmpRow){
                box.__ensurehotrow(profile,null);
            }

            box._adjustBody(profile,'delrow');

            return this;
        },
        resetRowValue:function(rowId){
            var profile=this.get(0),row=this.getRowbyRowId(rowId),arr=[],prop=profile.properties;
            _.arr.each(row.cells,function(o){
                if(o._oValue!==o.value){
                    o._oValue=o.value;
                    delete o.dirty;
                    if(prop.dirtyMark)
                        arr.push(profile.getSubNode('CELLA',o._serialId).get(0));
                }
            });
            if(prop.dirtyMark && prop.showDirtyMark)
                xui(arr).removeClass('xui-ui-dirty');
        },
        resetColValue:function(colId){
            var profile=this.get(0),col=this.getHeaderByColId(colId),arr=[],prop=profile.properties;
            _.arr.each(col.cells,function(o){
                if(o._oValue!==o.value){
                    o._oValue=o.value;
                    delete o.dirty;
                    if(prop.dirtyMark)
                        arr.push(profile.getSubNode('CELLA',o._serialId).get(0));
                }
            });
            if(prop.dirtyMark && prop.showDirtyMark)
                xui(arr).removeClass('xui-ui-dirty');
        },
        getActiveRow:function(){
            var ar,profile=this.get(0);
            if(profile.properties.activeMode!='row')return;
            if(!(ar=profile.$activeRow))return;
            ar=profile.rowMap[profile.getSubId(ar)];
            if(ar && ar.id && ar.id==profile.box._temprowid){
                ar=null;
            }
            return ar;
        },
        setActiveRow:function(rowId){
            var dr, row, profile=this.get(0);
            if(profile.properties.activeMode!='row')return;
            // deative first
            profile.box._activeRow(profile, false);

            if(!(row=this.getRowbyRowId(rowId)))return;
            if(!(dr=profile.getSubNode('CELLS',row._serialId)).isEmpty())
                profile.box._activeRow(profile, dr.get(0).id);
            return this;
        },

        /*column and header related*/
        //type: 'original', 'data', 'min'
        getHeader:function(type){
            var v=this.get(0).properties.header;
            if(!_.isArr(v))return [];
            if(type=='data')
                return _.clone(v,true);
            else if(type=='min'){
                var a=_.clone(v,true),b;
                _.arr.each(a,function(o,i){
                    a[i]=o.id;
                });
                return a;
            }else
                return v;
        },
        getHeaderByColId:function(colId, type){
            var v=this.get(0).properties.header,
                i=_.arr.subIndexOf(v,"id",colId);
            return i==-1?null:
                type=='data'?_.clone(v[i],true):
                type=='min'?v[i].id:
                v[i];
        },
        getHeaderByCell:function(cell, type){
            var v=cell._col;
            return !v?null:
                type=='data'?_.clone(v,true):
                type=='min'?v.id:
                v;
        },

        updateHeader:function(colId,options){
            var ns=this,
                prf=ns.get(0),
                colh=ns.getHeaderByColId(colId), isGroup;
            if(!colh){
                var grpCols=prf.properties.grpCols,
                    index=_.arr.subIndexOf(grpCols,"id",colId);
                colh=grpCols[index];
                isGroup=true;
            }
            if(colh){
                if(typeof options!='object') options={caption:options+''};
                else _.filter(options,true);
                delete options.id;

                if(prf.renderId){
                    var hid=colh._serialId, t, tt;
                    if(!isGroup){
                        if(t=options.width){
                            var n=[];
                            n.push(ns.getSubNode('HCELL',hid).get(0));
                            _.each(colh._cells,function(o){
                                n.push(ns.getSubNode('CELL',o).get(0));
                            });
                            xui(n).width(colh._pxWidth=t);

                            ns.getSubNode('SCROLL').onScroll();
                            ns.constructor._adjustColsH(ns.get(0));
                            ns.constructor._adjustBody(ns.get(0),'setcol');
                        }

                        //  Forward-compatible with 'visibility'
                        if(options.hasOwnProperty('visibility') && !options.hasOwnProperty('hidden'))
                            options.hidden=!options.visibility;

                        if('hidden' in options){
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
                    }

                    if(t=options.headerStyle||options.colStyle)
                        (tt=ns.getSubNode('HCELLA',hid)).attr('style',tt.attr('style')+";"+t);
                    if(t=options.headerClass)
                        ns.getSubNode('HCELLA',hid).addClass(t);
                    if(options.hasOwnProperty('caption'))
                        ns.getSubNode('HCELLCAPTION',hid).get(0).innerHTML=options.caption;
                    if('colResizer' in options){
                        t=!!options.colResizer;
                        ns.getSubNode('HHANDLER',hid).css('display',(options.colResizer=t)?"block":'none');
                    }
                }

                _.merge(colh, options, 'all');
            }
        },
        showColumn:function(colId, flag){
            var profile=this.get(0),
                map=profile.colMap2,
                    cols=profile.colMap,
                    col,
                    sid,
                    cells,
                    n=[];
                if(col=cols[sid=map[colId]]){
                if(profile.beforeColShowHide && false===profile.boxing().beforeColShowHide(profile,colId,flag))
                    return false;

                    n.push(profile.getSubNode('HCELL',sid).get(0));
                    _.each(col._cells,function(id){
                        n.push(profile.getSubNode('CELL',id).get(0));
                    });
                    xui(n).css('display',(col.hidden=(flag===false?true:false))?'none':'');

                if(profile.afterColShowHide)
                    profile.boxing().afterColShowHide(profile,colId,flag);
                }

                profile.box._adjustColsH(profile);
                profile.box._adjustBody(profile,'setcol');
            return true;
        },
        sortColumn:function(colId, desc, sortby){
            var prf=this.get(0), sId=prf.colMap2[colId],col=prf.colMap[sId];
            if(sId && col){
                if(_.isBool(desc))
                    col._order=!desc;
                if(_.isFun(sortby))
                    col.sortby=sortby;
                prf.getSubNode("HCELLA",sId).onClick();
            }
            return this;
        },
        /*cell realted*/
        getCell:function(cellId, type){
            var self=this,profile=this.get(0),v;
            _.each(profile.cellMap,function(o){
                if(o.id && o.id===cellId){
                    cellId=o._serialId;
                    return false;
                }
            });
            v=profile.cellMap[cellId];
            return !v?null:
                    type=='data'? _.merge({rowId:v._row.id, colId:v._col.id},_.clone(v,true)):
                    type=='min'? v.value:
                    v;
        },
        getCellbyRowCol:function(rowId, colId, type){
            var profile=this.get(0),v;
            v=_.get(profile.rowMap,[profile.rowMap2[rowId], '_cells',colId]);
            v=v && profile.cellMap[v];
            return !v?null:
                    type=='data'? _.merge({rowId:v._row.id, colId:v._col.id},_.clone(v,true)):
                    type=='min'? v.value:
                    v;
        },
        getCells:function(rowId, colId, type){
            var map={};
            _.each(this.get(0).cellMap,function(v){
                if((rowId?(rowId==v._row.id):1) && (colId?(colId==v._col.id):1)){
                    map[v.id]= type=='data'?_.merge({rowId:v._row.id, colId:v._col.id},_.clone(v,true)):
                               type=='min' ? v.value:
                               v;
                }
            });
            //dont return inner value
            return map;
        },

        updateCellByRowCol:function(rowId, colId, options, dirtyMark, triggerEvent){
            var t,self=this,con=self.constructor;
            if(t=con._getCellId(self.get(0), rowId, colId))
                con._updCell(self.get(0), t, options, dirtyMark, triggerEvent);
            return self;
        },
        updateCell:function(cellId, options, dirtyMark, triggerEvent){
            var self=this,profile=this.get(0);
            _.each(profile.cellMap,function(o){
                if(o.id && o.id===cellId){
                    cellId=o._serialId;
                    return false;
                }
            });
            self.constructor._updCell(profile,cellId,options, dirtyMark, triggerEvent);
            return self;
        },
        editCellbyRowCol:function(rowId, colId){
            var profile=this.get(0),con=profile.box;
            con._editCell(profile, con._getCellId(profile, rowId, colId));
            return this;
        },
        editCell:function(cell){
            this.constructor._editCell(this.get(0), cell);
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
        getActiveCell:function(){
            var ar,profile=this.get(0);
            if(profile.properties.activeMode!='cell')return;
            if(!(ar=profile.$activeCell))return;
            return profile.cellMap[profile.getSubId(ar)];
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

            if(!(dr=profile.getSubNode('CELL',cell._serialId)).isEmpty())
                profile.box._activeCell(profile, dr.get(0).id);
            return this;
        },

        /*others*/
        // reset all cells' value, and clear all dirty mark
        resetGridValue:function(){
            return this.each(function(profile){
                var prop=profile.properties;
                _.each(profile.cellMap,function(v){
                    v._oValue=v.value;
                    delete v.dirty;
                });
                if(prop.dirtyMark && prop.showDirtyMark)
                    profile.getSubNode('CELLA',true).removeClass('xui-ui-dirty');
            })
        },
        getDirtied:function(rowId, colId){
            var map={};
            _.each(this.get(0).cellMap,function(v){
                if(v._oValue!==v.value &&(rowId?(rowId==v._row.id):1) &&(colId?(colId==v._col.id):1)){
                    map[v.id]={rowId:v._row.id, colId:v._col.id, value:v.value, _oValue:v._oValue};
                }
            });
            //dont return inner value
            return map;
        },
        getSubNodeInGrid:function(key, rowId, colId){
            var ns=this,
                t=  (rowId && colId) ? ns.getCellbyRowCol(rowId, colId) :
                    colId ? ns.getHeaderByColId(colId):
                    rowId ? ns.getRowbyRowId(rowId):null;
            return ns.getSubNode(key, (t&&t._serialId)||true);
        },
        getEditor:function(){
            return _.get(this.get(0),["$curEditor"]);
        },
        getEditCell:function(){
            return _.get(this.get(0),["$cellInEditor"]);
        },
        offEditor:function(){
            var profile=this.get(0),editor;
            if(profile&&profile.$curEditor){
                editor=profile.$curEditor;
                _.tryF(editor.undo,[],editor);
            }
        },
        adjustEditor:function(adjustFun){
            var ns=this,prf=this.get(0);
            if(prf && prf.$curEditor){
                var editor=prf.$curEditor,
                    cell=prf.$cellInEditor;
                if(typeof adjustFun=='function'){
                    adjustFun.apply(ns,[editor, cell]);
                }else if(editor.KEY=="xui.UI.ComboInput"){
                    var cellNode = prf.getSubNode('CELL', cell.id),
                        absPos=cellNode.offset(null, prf.getSubNode('SCROLL')),
                        size = cellNode.cssSize();
                    editor.setLeft(absPos.left-1).setTop(absPos.top-1)
                    .setWidth(size.width+3).setHeight(size.height+2)
                    .reLayout(true);
                }
            }
            return ns;
        }
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
        Templates:{
            tagName : 'div',
            style:'{_style}',
            className:'{_className}',
            BORDER:{
                tagName : 'div',
                BOX:{
                    tagName:'div',
                    HEADER:{
                        $order:0,
                        tagName:'div',
                        style:"{showHeader}",
                        //for scroll performance
                        HI:{
                            tagName:'div',
                            HCELLS:{
                                tagName:'div',
                                style:'{headerHeight};',
                                /*the first col (row handler) in table header*/
                                FHCELL:{
                                    $order:0,
                                    style:'{rowHandlerDisplay};{_row0DfW};height:{_hcellheight}px;line-height:{_hcelllineh}px;}',
                                    className:'{cellCls}',
                                    tabindex: '{_tabindex}',
                                    HCELLA:{
                                        //for IE78
                                        style:'line-height:inherit;{firstCellStyle};',
                                        className:'{firstCellClass}',
                                        HHANDLER:{
                                            tagName:'div',
                                            style:'{colDDDisplay}'
                                        },
                                        FHANDLER:{
                                            tagName:'div',
                                            style:'{rowDDDisplay}'
                                        },
                                        HFMARK:{
                                            className:"xui-uicmd-check",
                                            style:'{_rowMarkDisplay}'
                                        },
                                        GRIDCAPTION:{
                                            $order:2,
                                            text:'{gridHandlerCaption}'
                                        },
                                        SORT:{
                                            style:'{sortDisplay}'
                                        }
                                    }
                                },
                                OTHERHCELLS:{
                                    $order:1,
                                    tagName:'text',
                                    text:'{header}'
                                },
                                LHCELL:{
                                    $order: 2
                                }
                            },
                            GRPCELLBOX:{
                                tagName:'div',
                                style:'{headerHeight};',
                                GRPCELLS:{
                                    $order: 3,
                                    tagName:'text',
                                    text:'{grpCols}'
                                }
                            }
                        }
                    },
                    SCROLL:{
                        $order:1,
                        tagName:'div',
                        className:'xui-uibg-base ',
                        BODY:{
                            tagName:'div',
                            FROW:{
                                $order:0,
                                tagName:'div'
                            },
                            ROWS:{
                                $order:1,
                                tagName:'div',
                                text:'{rows}'
                            },
                            LROW:{
                                $order: 2,
                                tagName:'div'
                            }
                        }
                    },
                    FOOTER:{
                        $order:2
                    },
                    COLLIST:{
                        tagName:'div'
                    },
                    ARROW:{}
                }
            },
            $submap : {
                /*the other header in table header*/
                header:{
                    HCELL:{
                        style:"width:{_pxWidth}px;height:{_hcellheight}px;line-height:{_hcelllineh}px;{colDisplay};",
                        className:'{cellCls}',
                        HCELLA:{
                            className:'{headerClass}',
                            style:"lline-height:inherit;{headerStyle};{colStyle}",
                            tabindex: '{_tabindex}',
                            HCELLCAPTION:{
                                text:"{caption}"
                            },
                            SORT:{
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
                grpCols:{
                    HCELL:{
                        style:"position:absolute;width:{_pxWidth}px;height:{_hcellheight}px;line-height:{_hcelllineh}px;top:{_hcelltop}px;left:{_hcellleft}px;",
                        className:'{cellCls}',
                        HCELLA:{
                            className:'{headerClass}',
                            style:"line-height:inherit;{headerStyle};{colStyle}",
                            tabindex: '{_tabindex}',
                            HCELLCAPTION:{
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
                rows:{
                    ROW:{
                        tagName:'div',
                        style:'{rowDisplay}',
                        PREVIEW:{
                            $order:1,
                            tagName:'div',
                            style:'{previewDisplay}',
                            text:'{preview}'
                        },
                        CELLS:{
                            $order:2,
                            tagName:'div',
                            className:'{rowCls} {rowClass}',
                            style:'height:{rowHeight}px;{rowStyle}',
                            FCELL:{
                                $order:0,
                                style:'{rowHandlerDisplay};{_row0DfW};',
                                className:'{cellCls}',
                                CELLA:{
                                    tabindex: '{_tabindex}',
                                    style:'{cellStyle}{firstCellStyle}',
                                    className:'{cellClass}{firstCellClass}',
                                    ROWLRULER:{
                                        style:'{_treeMode};width:{_rulerW}px'
                                    },
                                    ROWTOGGLE:{
                                        $order:2,
                                        style:'{_treeMode};',
                                        className:'{subClass}'
                                    },
                                    FHANDLER:{
                                        tagName:'div',
                                        style:'{rowDDDisplay}'
                                    },
                                    FCELLINN:{
                                        $order:3,
                                        ROWNUM:{
                                            style:'{_rowNumbDisplay}'
                                        },
                                        FCELLCAPTION:{
                                            $order:1,
                                            text:'{caption}'
                                        }
                                    },
                                    MARK:{
                                        $order:1,
                                        style:'{_rowMarkDisplay}'
                                    }
                                }
                            },
                            OTHERCELLS:{
                                tagName:'text',
                                $order: 1,
                                text:'{cells}'
                            },
                            LCELL:{
                                $order: 2
                            }
                        },
                        SUB:{
                            $order:3,
                            tagName:'div'
                        },
                        SUMMARY:{
                            $order:4,
                            tagName:'div',
                            style:'{summaryDisplay}',
                            text:'{summary}'
                        }
                    }
                },
                'rows.cells':function(profile,template,v,tag,result){
                    var me=arguments.callee,map=me._m||(me._m={'checkbox':'.checkbox','button':'.button','progress':'.progress'});
                    xui.UI.$doTemplate(profile,template,v,tag+(map[v.type]||'.input'),result)
                },
                'rows.cells.input':{
                    CELL:{
                        style:'width:{width}px;{cellDisplay};',
                        className:'{cellCls}',
                        CELLA:{
                            className:'{cellClass}',
                            style:'{bgcolor};{color};{cellStyle}',
                            tabindex: '{_tabindex}',
                            text:"{caption}"
                        }
                    }
                },
                'rows.cells.button':{
                    CELL:{
                        style:'width:{width}px;{cellDisplay};',
                        className:'{cellCls}',
                        CELLA:{
                            _NativeElement:true,
                            tagName:'button',
                            className:'xui-treegrid-tgbtn {cellClass}',
                            style:'{cellStyle}',
                            tabindex: '{_tabindex}',
                            text:"{caption}"
                        }
                    }
                },
                'rows.cells.checkbox':{
                    CELL:{
                        style:'width:{width}px;{cellDisplay}',
                        className:'{cellCls}',
                        CELLA:{
                            className:'{cellClass}',
                            style:'{cellStyle}',
                            tabindex: '{_tabindex}',
                            CHECKBOX:{
                                className:'{checkboxCls}'
                            }
                        }
                    }
                },
                'rows.cells.progress':{
                    CELL:{
                        style:'width:{width}px;{cellDisplay}',
                        className:'{cellCls}',
                        CELLA:{
                            className:'{cellClass}',
                            style:'{cellStyle}',
                            tabindex: '{_tabindex}',
                            PROGRESS:{
                                tagName:'div',
                                style:'width:{progress};',
                                text:'{caption}'
                            }
                        }
                    }
                }
            }
        },
        Appearances:{
            KEY:{
                //in firefox, a can focused with display:block
                display:'block',
                position:'absolute',
                overflow:'hidden'
            },
            BOX:{
                display:'block',
                position:'relative',
                overflow:'hidden',
                'text-align':'left'
            },

            HEADER:{
                'background-image':  xui.UI.$bg('head.gif'),
                'background-repeat':'repeat-x',
                'background-position':'left top',
                'background-color':'#CAE3FF',
                position:'relative',
                overflow:'hidden',
                'text-align':'left'
            },
            HI:{
                position:'relative'
            },
            GRPCELLBOX:{
                position:'absolute',
                overflow:'visible',
                left:0,
                top:0,
                width:0,
                height:0,
                'font-size':0,
                'line-height':0
            },
            SCROLL:{
                overflow:'auto',
                position:'relative',
                'text-align':'left'
            },
            ARROW:{
                position:'absolute',
                'z-index':'20',
                left:0,
                top:0,
                display:'none',
                width:'14px',
                height:'18px',
                'background-image':  xui.UI.$bg('icons.gif','',true),
                'background-repeat':'no-repeat',
                'background-position':'-72px -270px'
            },
            COLLIST:{
                position:'absolute',
                'z-index':'10',
                left:0,
                top:0,
                cursor:'pointer',
                visibility:'hidden',
                'background-image': xui.UI.$bg('collist.gif', ''),
                'background-repeat':'no-repeat',
                'background-position':'center bottom',
                'background-color':'#FFF1A0',

                border:'1px solid',
                'border-color':  '#fff #ACA899 #ACA899 #fff'
            },
            BODY:{
                overflow:'visible',
                position:'absolute',
                'background-color':'#fff',
                'padding-bottom':'1px',
                left:0,
                top:'0',
                'font-size':0,
                'line-height':0
            },
            'SORT, SORT-checked':{
                width:'16px',
                height:'16px'
            },
            SORT:{
                'background-image': xui.UI.$bg('icons.gif', '', true),
                'background-repeat':'no-repeat',
                'background-position':'-110px -220px',

                position:'absolute',
                right:'2px',
                bottom:'2px'
            },
            'HCELL-mouseover SORT':{
                $order:1,
                'background-position': '-110px -240px'
            },
            'HCELL-mousedown SORT':{
                $order:2,
                'background-position': '-110px -260px'
            },
            'SORT-checked':{
                $order:3,
                'background-position': '-130px -220px'
            },
            'HCELL-mouseover SORT-checked':{
                $order:4,
                'background-position': '-130px -240px'
            },
            'HCELL-mousedown SORT-checked':{
                $order:5,
                'background-position': '-130px -260px'
            },
            HHANDLER:{
                position:'absolute',
                //if set z-index, disappearing in opera
                //'z-index':'10',
                background: xui.browser.ie?'url('+xui.ini.img_bg+')':null,
                width:'4px',
                top:'0',
                right:'0',
                height:'100%',
                cursor:'e-resize',
                'font-size':0,
                'line-height':0
            },
            'HCELLS, CELLS':{
                //for ie height change trigger
                'overflow-y': xui.browser.ie ?'hidden':'',
                position:'relative',
                'white-space': 'nowrap',
                'font-size':'12px',
                'line-height':'18px'
            },
            'HCELLS, GRPCELLBOX':{
                overflow:'visible'
            },
            CELLS:{
                'border-bottom': '1px solid #A2BBD9',
                overflow:'visible'
            },
            'CELLS-group':{
                $order:1,
                'border-right': '1px solid #A2BBD9'
            },
            'CELLS-group FCELL':{
                'border-right':0,
                'padding-right':'1px',
                overflow:'visible'
            },
            'CELLS-group FCELLCAPTION, CELLS-group CELLA, CELLS-group FCELLINN':{
                'font-weight':'bold',
                color:'#3764A0',
                overflow:'visible'
            },
            'PREVIEW,SUMMARY':{
                position:'relative',
                display:'none',
                'padding-left':'16px',
                'border-right': '1px solid #A2BBD9'
            },
            PREVIEW:{
                $order:4,
                'border-bottom': '1px solid #A2BBD9'
            },
            SUMMARY:{
                $order:4,
                'border-bottom': '1px solid #A2BBD9'
            },
           'CELLS-mouseover':{
                $order:4,
                'background-color':'#DFE8F6'
            },

            'CELLS-readonly CELLA':{
                 $order:5,
                 color:'#808080'
            },
            'CELL-readonly CELLA':{
                 $order:6,
                 color:'#808080'
            },
            'CELLS-disabled':{
                 $order:7,
                 'background-color':'#EBEADB'
            },
            'CELLS-disabled CELLA':{
                 $order:7,
                 color:'#808080'
            },
            'CELL-disabled':{
                 $order:8,
                 'background-color':'#EBEADB'
            },
            'CELL-disabled CELLA':{
                 $order:8,
                 color:'#808080'
            },

            'CELLS-active, CELL-active':{
                 $order:5,
                 'background-color':'#A3BAE9'
            },
            "CELLS-hot":{
                $order:6,
                'background-color':'#FFE97F'
            },
            'CELLS-checked, CELL-checked, CELLS-checked CELLA, CELL-checked CELLA':{
                 $order:6,
                'background-color':'#7199E8',
                color:'#fff'
            },
            "FCELL CELLA":{
                'text-align': 'left'
            },
            "FHCELL HCELLA":{
                'text-align': 'center'
            },
            'HCELLCAPTION,SORT,HHANDLER':{
                'vertical-align':'middle'
            },
            FHANDLER:{
                position:'absolute',
                'height':'4px',
                left:'0px',
                width:'100%',
                bottom:'0px',
                cursor:'n-resize',
                'z-index':10,
                'font-size':0,
                'line-height':0
            },
            'FCELLCAPTION, FCELLINN':{
                'vertical-align':'middle',
                overflow:'hidden'
            },
            'FHCELL, HCELL':{
               'background-image': xui.UI.$bg('head.gif', ''),
               'background-repeat':'repeat-x',
               'background-position':'left top',
               'background-color':'#CAE3FF',
               'border-left':'1px solid #fff',
               'border-top':'1px solid #fff',
               'border-right':'1px solid #A2BBD9',
               'border-bottom':'1px solid #A2BBD9',
               padding:0,
               'vertical-align':'bottom',
                'font-size':'12px'
            },
            'FHCELL-mouseover, HCELL-mouseover':{
               'background-image': xui.UI.$bg('head_mouseover.gif', ''),
               'background-repeat':'repeat-x',
               'background-position':'left top',
               'background-color':'#FFF1A0'
            },
            ROW:{
                position:'relative',
                zoom:xui.browser.ie?1:null,
                width:xui.browser.ie?'100%':null,
                'font-size':0,
                'line-height':0
            },
            ROWNUM:{
                'padding-right':'6px',
                color:'#808080'
            },
            'FCELL, CELL':{
                height:'100%',
                //firefox:height:100% without overflow:hidden
                'padding-left':'1px',
                'border-right':'1px solid #A2BBD9',
                position:'relative',
                overflow:xui.browser.ie6?'hidden':'',
                'font-size':'12px',
                'line-height':'20px',
                'vertical-align':'top'
            },
            "LHCELL, LCELL":{
                height:'100%',
                position:'relative',
                'font-size':'12px',
                'line-height':'20px',
                'vertical-align':'top'
            },
            'ALT':{
                'background-color':'#EFF8FF'
            },
            //
            'CELL-label a':{
                color: '#000'
            },
            'CELL-input':{
            },
            'CELL-number, CELL-spin, CELL-currency':{
                'text-align':'right'
            },
            'CELL-checkbox':{
                'text-align':'center'
            },
            'KEY-tgbtn':{
                width:'100%',
                padding: 0,
                'vertical-align': 'middle',
                'line-height':'100%',
                height:'100%'
            },
            'CELL-mouseover':{
                $order:5,
                'background-color':'#DFE8F6'
            },
            'FCELL CELLA, HCELLA':{
                position:'relative'
            },
            HCELLA:{
                $order:3,
                'text-align': 'center',
                'vertical-align':'middle',
                'line-height':'inherit'
            },
            'HCELLA, CELLA':{
                display:'block',
                overflow:'hidden',
                '-moz-box-flex':'1',
                'outline-offset':'-1px',
                '-moz-outline-offset':(xui.browser.gek && xui.browser.ver<3)?'-1px !important':null,
                height:'100%',
                color:'#000',
                //ie need this
                width:xui.browser.ie?'100%':'',
                // depends on parent
                'line-height':'inherit'
            },
            'CELLA-inline':{
                $order:5,
                display:xui.$inlineBlock,
                width:'auto',
                '-moz-box-flex':0
            },
            PROGRESS:{
                height:'100%',
                'background-color':'#00ffff',
                'text-align':'center',
                'line-height':'22px',
                overflow:'visible',
                opacity:0.7,
                '*filter':'alpha(opacity=70)'
            },
            'CHECKBOX, MARK':{
               cursor:'pointer',
               width:'16px',
               height:'16px',
               'vertical-align':'middle',
               'background-image': xui.UI.$bg('icons.gif', '', true),
               'background-repeat':'no-repeat',
               'background-position':'-20px -70px'
            },
            'CELL-mouseover CHECKBOX':{
                $order:1,
                'background-position': '-20px -90px'
            },
            'CELL-mousedown CHECKBOX':{
                $order:2,
                'background-position': '-20px -110px'
            },
            'CHECKBOX-checked, CELLS-checked MARK':{
                $order:3,
                'background-position': '0 -70px'
            },
            'CELL-mouseover CHECKBOX-checked':{
                $order:4,
                'background-position': '0 -90px'
            },
            'CELL-mousedown CHECKBOX-checked':{
                $order:5,
                'background-position': '0 -110px'
            },
            SUB:{
                //for ie bug: relative , height='auto' will disppear
                zoom:xui.browser.ie?1:null,
                height:0,
                position:'relative',
                overflow:'hidden',
                'font-size':'1px',
                //1px for ie8
                'line-height':'1px'
            }
        },
        _objectProp:{tagVar:1,dockMargin:1,rowOptions:1,colOptions:1},
        Behaviors:{
            HoverEffected:{ROWTOGGLE:'ROWTOGGLE', HCELL:'HCELL', FHCELL:'FHCELL'},
            ClickEffected:{ROWTOGGLE:'ROWTOGGLE', CELL:'CELL', HCELL:'HCELL'},
            DroppableKeys:['SCROLL','CELLS','ROWTOGGLE'],
            DraggableKeys:['FCELL'],

            onSize:xui.UI.$onSize,
            HFMARK:{
                onClick:function(profile,e,src){
                    if(profile.properties.selMode!='multi'&&profile.properties.selMode!='multibycheckbox')return;

                    var rows=[];
                    _.each(profile.rowMap,function(o){
                        rows.push(o.id);
                    });

                    if(profile._$checkAll){
                        delete profile._$checkAll;
                        profile.boxing().setUIValue("");
                        xui.use(src).tagClass('-checked',false)
                        profile.boxing().onRowSelected(profile, "allrows", e, src, -1);
                    }else{
                        profile._$checkAll=true;
                        xui.use(src).tagClass('-checked')
                        profile.boxing().setUIValue(rows.join(profile.properties.valueSeparator));
                        profile.boxing().onRowSelected(profile, "allrows", e, src, 1);
                    }
                }
            },
            //key navigator
            SCROLL:{
                onScroll:function(profile, e, src){
                    var node=xui.use(src).get(0),
                        l=node.scrollLeft||0;
                    if(profile.$sl!=l)
                        profile.getSubNode('HEADER').get(0).scrollLeft=profile.$sl=l;
                }
            },
            HEADER:{
                onScroll:function(profile, e, src){
                    var l=xui.use(src).get(0).scrollLeft||0;
                    if(profile.$sl!=l)
                        profile.getSubNode('SCROLL').get(0).scrollLeft=profile.$sl=l;
                }
            },
            //colomn resizer
            HHANDLER:{
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!='left')return;
                    var p=profile.properties,
                        id = profile.getSubId(src)
                        col = profile.colMap[id];
                    if(col && col.relWidth)return;

                    var o=xui(src),
                    minW =o.parent(2).width()-p._minColW,
                    scroll = profile.getSubNode('SCROLL'),
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
                        backgroundColor:'#ddd',
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
                            p.proxyNode.css('backgroundColor','#ddd');
                            profile._limited=0;
                        }
                    }
                },
                onDragstop:function(profile, e, src){
                    var o=xui(src).parent(2),
                        col=profile.colMap[profile.getSubId(src)];
                    if(col){
                        if(col&&col._isgroup){
                            col=profile.properties.header[col.to];
                            o=profile.getSubNode("HCELL",col._serialId);
                        }
                        if('maxWidth' in col)
                            w=Math.min(col.maxWidth,w);
                        if('minWidth' in col)
                            w=Math.max(col.minWidth,w);
                    }

                    var w=o.width() + xui.DragDrop.getProfile().offset.x;

                    if(profile.beforeColResized && false===profile.boxing().beforeColResized(profile,col?col.id:null,w)){
                        profile._limited=0;
                        return;
                    }

                    o.width(w);
                    if(col)col._pxWidth=col.width=w;

                    //collect cell id
                    var ids=[],ws=[];
                    if(profile.getKey(xui.use(src).parent(2).id())==profile.keys.FHCELL){
                        profile.box._setRowHanderW(profile,w);
                    }else{
                        var cells = profile.colMap[profile.getSubId(src)]._cells;
                        _.each(cells,function(o){
                            ids.push(profile.getSubNode(profile.keys.CELL,o).id())
                        });
                        xui(ids).width(w);
                    }

                    if(profile.afterColResized)
                        profile.boxing().afterColResized(profile,col?col.id:null,w);

                    profile.getSubNode('SCROLL').onScroll();
                    profile.box._adjustColsH(profile);
                    profile.box._adjustBody(profile,'setcol');
                    profile._limited=0;
                },
                onClick:function(){
                    return false
                },
                onDblclick:function(profile, e, src){
                    var p = profile.properties,
                        o = xui.use(src).parent(2),
                        id = profile.getSubId(src)
                        col = profile.colMap[id];

                    if(col&&col._isgroup){
                        col=profile.properties.header[col.to];
                        o=profile.getSubNode("HCELL",col._serialId);
                    }

                    if(col && col.relWidth)return;

                    //for row0
                    if(profile.getKey(xui.use(src).parent(2).id())==profile.keys.FHCELL){
                        profile.box._setRowHanderW(profile,true);
                        return;
                    }
                    if(profile.getRootNode().clientHeight<=0)return;

                    //for other rows
                    var cells=col._cells,
                        cls=profile.getClass('CELLA','-inline'),
                        n,ns=[],ws=[],w;
                    _.each(cells,function(o){
                        n=profile.getSubNode('CELLA',o);
                        if(n._nodes.length){
                            ns.push(n.get(0));
                            ws.push(n.addClass(cls).width());
                        }
                    });
                    ws.push(p._minColW);
                    w=parseInt(Math.max.apply(null,ws),10);
                    if(w>p._maxColW)w=p._maxColW;

                    if(profile.beforeColResized && false===profile.boxing().beforeColResized(profile,col?col.id:null,w))
                        return;

                    if(col){
                        if('maxWidth' in col)
                            w=Math.min(col.maxWidth,w);
                        if('minWidth' in col)
                            w=Math.max(col.minWidth,w);
                    }

                    xui(ns).parent().width(w);
                    o.width(col._pxWidth=col.width=w);
                    xui(ns).removeClass(cls);

                    if(profile.afterColResized)
                        profile.boxing().afterColResized(profile,col.id,w);

                    profile.box._adjustColsH(profile);
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
                    minH =o.parent(3).height()-p._minRowH,
                    scroll = profile.getSubNode('SCROLL'),
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
                        backgroundColor:'#ddd',
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
                            p.proxyNode.css('backgroundColor','#ddd');
                            profile._limited=0;
                        }
                    }
                },
                onDragstop:function(profile, e, src){
                    var o=xui(src).parent(3),
                        h=o.height()+xui.DragDrop.getProfile().offset.y,
                        row = profile.rowMap[profile.getSubId(src)],
                        header = profile.properties.header,
                        h1,t1;

                    //for ie's weird bug
                    if(xui.browser.ie && h%2==1)h+=1;

                    if(profile.beforeRowResized && false===profile.boxing().beforeRowResized(profile, row?row.id:null, h)){
                        profile._limited=0;
                        return;
                    }

                    o.height(h);
                    if(profile.getKey(xui.use(src).parent(2).id())==profile.keys.FHCELL){
                        profile.properties.headerHeight=h;
                        profile.box._adjustColsV(profile,h);
                        xui.UI.$tryResize(profile,profile.getRoot().width(),profile.getRoot().height(),true);
                    }else
                        row.height=h;

                    if(profile.afterRowResized)
                        profile.boxing().afterRowResized(profile, row?row.id:null, h);

                    profile.box._adjustBody(profile,'setrow');

                    profile._limited=0;
                },
                onDblclick:function(profile, e, src){
                    var p = profile.properties,
                        sid = profile.getSubId(src),
                        row,cells;
                    if(profile.getRootNode().clientHeight<=0)return;

                    if(sid){
                        row=profile.rowMap[sid];
                        cells=profile.getSubNode('CELLS', sid);
                        var h=cells.height('auto').height();

                        if(profile.beforeRowResized && false===profile.boxing().beforeRowResized(profile, row.id, h))
                            return;

                        cells.height(row.height=h);
                    }else{
                        // fake
                        var h=(profile._headerLayers||0)*profile.box.$DataStruct.headerHeight;
                        if(profile.beforeRowResized && false===profile.boxing().beforeRowResized(profile, null, h))
                            return;
                        profile.box._adjustColsV(profile,h);
                        xui.UI.$tryResize(profile, profile.getRoot().width(), profile.getRoot().height(),true);
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
                    var
                    p = profile.properties,
                    row = profile.rowMap[profile.getSubId(src)]
                    ;
                    if(p.disabled || row.disabled)return false;
                    //for selection click
                    if(!row.sub)return;

                    profile.box._setSub(profile, row, !row._checked);

                    return false;
                }
            },
            //HCELLA handler dragdrop
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
                    index = col ? _.arr.indexOf(p.header,col) :-1,
                    me=arguments.callee,
                    fun = me.fun||(me.fun = function(profile, subNode, index, type, sortby,order,lastrownode){
                        var rows,parent,self=arguments.callee;
                        if(subNode){
                            rows = subNode.sub;
                            parent = profile.getSubNode('SUB', subNode._serialId).get(0);
                        }else{
                            subNode={_inited:true};
                            rows = profile.properties.rows;
                            parent = profile.getSubNode('ROWS').get(0);
                        }
                        //sor sub first
                        var a1=[], a2=[], a3=[], a4=[],t,ff;
                        _.arr.each(rows,function(row){
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
                                case 'currency':
                                    ff=function(n){return parseFloat(n)||0};
                                    break;
                                case 'datetime':
                                case 'date':
                                    ff=function(n){return _.isDate(n)?n.getTime():_.isFinite(n)?parseInt(n,10):0};
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
                        var b = subNode._inited, bak=_.copy(rows), c;
                        if(b)
                            a1=parent.childNodes;
                        _.arr.each(a2,function(o,i){
                            rows[i]=bak[o];
                            if(b)a3[i]=a1[o];
                        });
                        if(b){
                            var fragment=document.createDocumentFragment();
                            for(var i=0;t=a3[i];i++)
                                fragment.appendChild(t);

                            if(lastrownode)
                                parent.insertBefore(fragment, lastrownode);
                            else
                                parent.appendChild(fragment);
                        }
                    });

                    var lastrow,lastrownode;
                    if(profile.__hastmpRow){
                        lastrow=profile.properties.rows.pop();
                        lastrownode=profile.getSubNode('ROWS').get(0).lastChild;
                    }

                    fun(profile, null, index, type, sortby,order, lastrownode);

                    if(profile.__hastmpRow)
                        profile.properties.rows.push(lastrow);

                    //show sort mark
                    profile.getSubNode('SORT', true).css('display','none');
                    var node = (col ? profile.getSubNode('SORT', col._serialId) : profile.getSubNode('SORT')).css('display','');
                    node.tagClass('-checked', col ? (!(col._order = !col._order)) : (!(profile._order = !profile._order)));

                    profile.box._asy(profile);

                    //clear rows cache
                    delete profile.$allrowscache;

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
                        dragData:o.parent().id()
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

                    var psrc=xui.use(src).parent().xid();
                    if(false===profile.box._colDragCheck(profile,psrc))return;
                    xui.DragDrop.setDropElement(src).setDropFace(src,'move');
                    var nn=xui.use(psrc).get(0);
                    profile.getSubNode("ARROW")
                        .left(nn.offsetLeft-8)
                        .top(nn.offsetTop+nn.offsetHeight)
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
                    var fromIndex = _.arr.subIndexOf(p.header,'_serialId',fromId),
                        toIndex = _.arr.subIndexOf(p.header,'_serialId',toId);

                    //if same or same position, return
                    if(fromIndex===toIndex|| fromIndex===toIndex-1)return;

                    //reposition header dom node
                    profile.getSubNode('HCELL', toId).addPrev(xui(xui.DragDrop.getProfile().dragData));
                    //reposition cell dom nodes
                    _.each(toTh._cells, function(o,i){
                        profile.getSubNode('CELL',o).addPrev(profile.getSubNode('CELL',fromTh._cells[i]));
                    });

                    //update memory
                    //HCELL position
                    //keep refrence, and remove
                    var temp=p.header[fromIndex];
                    // 1. insert to right pos
                    _.arr.insertAny(p.header,temp,toIndex);
                    // 2. then, remove
                    _.arr.removeFrom(p.header,fromIndex+(fromIndex>toIndex?1:0));
                    //cell position rowMap
                    var allitems = profile.queryItems(p.rows, true, true);
                    _.arr.each(allitems,function(o){
                        //for those non-prepared data
                        o=o.cells?o.cells:o;
                        if(!o || !_.isArr(o))return;
                        temp=o[fromIndex];
                        _.arr.removeFrom(o,fromIndex);
                        _.arr.insertAny(o,temp,toIndex);
                    });

                    // group columns
                    var arr=p.grpCols;
                    if(arr && _.isArr(arr)&& arr.length){
                        for(var j=0,m=arr.length,grp;j<m;j++){
                            grp=arr[j];
                            if(grp.from>toIndex){
                                grp.from++;
                                grp.to++;
                            }else if(toIndex>=grp.from && toIndex<=grp.to){
                                grp.to++;
                            }
                        }
                        for(var j=0,m=arr.length,grp;j<m;j++){
                            grp=arr[j];
                            if(grp.from>fromIndex){
                                grp.from--;
                                grp.to--;
                            }else if(fromIndex>=grp.from && fromIndex<=grp.to){
                               grp.to--;
                            }
                        }
                        _.filter(arr,function(o){
                            var r=o.to>=o.from;
                            if(!r && profile.renderId){
                                profile.getSubNode("HCELL",o[SubID]).remove();
                                delete profile.colMap[o[SubID]];
                                delete profile.colMap2[o.id];
                            }
                            return r;
                        });
                        p.grpCols=box._adjustGrpColsData(profile,arr);
                        box._adjustColsH(profile);
                        box._adjustColsV(profile,p.headerHeight);
                    }

                    //fire after event
                    profile.boxing().afterColMoved(profile, fromTh.id, toTh.id);

                    //clear rows cache
                    delete profile.$allrowscache;
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

                    _.resetRun(profile.$xid+':collist',null);
                    var region={},
                        pos=xui.use(src).parent().offset(null,profile.getSubNode('BOX')),
                        size=xui.use(src).parent().cssSize();
                    if(size.width<16)return;
                    region.height=size.height;
                    region.width=14;
                    region.left=pos.left;
                    region.top=pos.top;
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

                    _.resetRun(profile.$xid+':collist',function(){
                        // destroyed
                        if(!profile.box)return;
                        profile.getSubNode('COLLIST').css({visibility:'hidden',left:0,top:0});
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
                    _.resetRun(profile.$xid+':collist',null);
                },
                onMouseout:function(profile,e,src){
                    _.resetRun(profile.$xid+':collist',function(){
                        // destroyed
                        if(!profile.box)return;
                        xui.use(src).css('visibility','hidden');
                    });
                },
                onClick:function(profile,e,src){
                    var p=profile.properties;
                    if(!profile.$col_pop){
                        var items=[],pop;
                        _.arr.each(profile.properties.header,function(o){
                            if(o.hasOwnProperty('colHidable')?o.colHidable:p.colHidable)
                                items.push({id:o.id,caption:o.caption,type:'checkbox',value:o.hidden!==true});
                        });
                        if(items.length){
                            pop=profile.$col_pop=new xui.UI.PopMenu({hideAfterClick:false,items:items}).render(true);
                            pop.onMenuSelected(function(p,i,s){
                                var b=1;
                                _.arr.each(p.properties.items, function(o){
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
                        profile.$col_pop.pop(src);
                }
            },
            CELLS:{
                afterMouseover:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return;
                    if(p.disableHoverEffect)return;
                    if(p.activeMode=='row'){
                        xui.use(src).tagClass('-mouseover');
                        if(profile.onRowHover){
                            var row = profile.rowMap[profile.getSubId(src)];
                            profile.boxing().onRowHover(profile, row, true, e, src);
                        }
                    }
                },
                afterMouseout:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return;
                    if(p.disableHoverEffect)return;
                    if(p.activeMode=='row'){
                        xui.use(src).tagClass('-mouseover',false);
                        if(profile.onRowHover){
                            var row = profile.rowMap[profile.getSubId(src)];
                            profile.boxing().onRowHover(profile, row, false, e, src);
                        }
                    }
                },
                onDblclick:function(profile, e, src){
                    var p = profile.properties,
                        row = profile.rowMap[profile.getSubId(src)];
                    if(p.disabled || row.disabled)return false;
                    if(profile.onDblclickRow)profile.boxing().onDblclickRow(profile, row, e, src);
                    return false;
                },
                onClick:function(profile, e, src){
                    var p = profile.properties,
                        subid = profile.getSubId(src),
                        ks=profile.keys,
                        row = profile.rowMap[subid],
                        ck=profile.getKey(xui.Event.getSrc(e).id||"");
                    if(p.disabled || row.disabled)return false;
                    if(ck==ks.ROWTOGGLE || ck==ks.MARK) return false;
                    if(row.group) profile.getSubNode('ROWTOGGLE',row._serialId).onClick();
                    if(profile.onClickRow)
                        profile.boxing().onClickRow(profile, row, e, src);
                }
            },
            CELL:{
                afterMouseover:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return;
                    if(p.disableHoverEffect)return;
                    if(p.activeMode=='cell')
                        xui.use(src).tagClass('-mouseover');
                },
                afterMouseout:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return;
                    if(p.disableHoverEffect)return;
                    if(p.activeMode=='cell')
                        xui.use(src).tagClass('-mouseover',false);
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
                        profile.boxing().onDblclickCell(profile, cell, e, src);
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
                            event=getPro(profile, cell, 'event'),
                            mode = p.activeMode,
                            editable=getPro(profile, cell, 'editable');

                        if(!disabled && (!editable || (type=='button'||type=='label'))){
                            if(typeof event == 'function' && false===event.call(profile._host||profile, profile, cell, null,null,e,src)){}
                            else if(profile.onClickCell)
                                profile.boxing().onClickCell(profile, cell, e, src);
                            if(type=='button')
                                return false;
                        }
                        // checkbox is special for editor
                        if(!disabled && !readonly && type=='checkbox')
                            if(editable){
                                box._updCell(profile, cell, !cell.value, p.dirtyMark, true);

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
                        }
                    // handler CELL
                    }else{
                        var row = profile.rowMap[profile.getSubId(src)];
                        if(p.disabled || row.disabled)
                            return false;

                        if(typeof event == 'function' && false===event.call(profile._host||profile, profile, row, null,null,e,src)){}
                        else if(profile.onClickRowHandler)
                            profile.boxing().onClickRowHandler(profile, row, e, src);

                        if(p.activeMode=='row'){
                            id = xui(src).parent(3).id();
                            box._sel(profile, 'row', src, id, e);
                        }
                    }
                    if(profile.box){
                        if(xui.use(src).get(0)){
                            //in some browsers: if CELLA has a child 'span', you click 'span' will not tigger to focus CELLA
                            if(!xui.getNodeData(src,'_tmp_forcefocus'))
                                profile.box._focusEvent(profile, e, src);
                        }
                    }
                },
                onFocus:function(profile, e, src){
                    xui.setNodeData(src,'_tmp_forcefocus',1);
                    profile.box._focusEvent(profile, e, src);
                },
                onKeydown:function(profile, e, src){
                    var p = profile.properties,
                        keys=xui.Event.getKey(e),
                        key = keys.key,
                        shift=keys.shiftKey,
                        ctrl=keys.ctrlKey,
                        cur = xui(src),
                        body = profile.getSubNode('ROWS'),
                        first = body.nextFocus(true, true, false),
                        last = body.nextFocus(false, true, false),
                        cell=profile.cellMap[profile.getSubId(src)],
                        row;

                    if(profile.beforeCellKeydown && false===profile.boxing().beforeCellKeydown(profile,cell,keys)){
                        return false;
                    }
                    switch(key){
                    case 'enter':
                        xui(src).onClick();
                    break;
                    //tab to next/pre
                    case 'tab':
                        if(shift){
                            if(src!=first.xid()){
                                cur.nextFocus(false);
                                return false;
                            }
                        }else{
                            if(src!=last.xid()){
                                cur.nextFocus();
                                return false;
                            }
                        }
                        break;
                    case 'left':
                        if(cur.get(0)==first.get(0))
                            last.focus();
                        else
                            cur.nextFocus(false);
                        return false;
                        break;
                    case 'right':
                        if(cur.get(0)==last.get(0))
                            first.focus();
                        else
                            cur.nextFocus();
                        return false;
                        break;
                    case 'up':
                        if(ctrl){
                            if(cell)
                                row=cell._row
                            else
                                row=profile.rowMap[profile.getSubId(src)];
                            if(row && !(p.disabled || row.disabled) && (row.group||row.sub)){
                                profile.getSubNode('ROWTOGGLE',row._serialId).onClick();
                                return false;
                            }
                        }
                        if(cur.get(0)==first.get(0)){
                            last.focus();
                            return;
                        }
                   case 'down':
                        if(ctrl){
                            if(cell)
                                row=cell._row
                            else
                                row=profile.rowMap[profile.getSubId(src)];
                            if(row && !(p.disabled || row.disabled) &&  (row.group||row.sub)){
                                profile.getSubNode('ROWTOGGLE',row._serialId).onClick();
                                return false;
                            }
                        }

                        //get no.
                        var count=1,
                            temp = cur.parent().get(0),
                            max=temp.parentNode.childNodes.length;
                        while(temp=temp.previousSibling)count++;

                        //get row
                        temp=cur.parent(2).get(0);

                        //get all rows(include header)
                        if(!profile.$allrowscache)
                            profile.box._cacheRows(profile);

                        //get index
                        var index = _.arr.indexOf(profile.$allrowscache,temp),
                            rowLen = profile.$allrowscache.length,
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
                        if(newLine && p.hotRowMode!='none'){
                            var colId;
                            if(!cell){
                                var row=profile.rowMap[profile.getSubId(src)];
                                if(!row)return false;
                            }else
                                colId=cell._col.id;

                            var addhotrow=true,
                                cacheAll=profile.$allrowscache;
                            // if it's just the active row
                            if(profile.__hastmpRow){
                                // if it's invalid, dont add new row
                                addhotrow=profile.box._checkNewLine(profile,'keydown');

                                if(!profile.$allrowscache)
                                    profile.box._cacheRows(profile);
                            }

                            if(addhotrow){
                                profile.box._addTempRow(profile,colId);
                                // dont focus to next cell
                                return false;
                            }
                        }
                        //get node
                        var node = xui(profile.$allrowscache[index]).first(),
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
                            node2.focus();

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
            }
        },
        DataModel:{
            directInput:true,
            listKey:null,
            currencyTpl:"$ *",
            numberTpl:"",
            valueSeparator:";",
            selMode:{
                ini:'none',
                listbox:['single','none','multi','multibycheckbox'],
                action:function(value){
                    this.getSubNodes(['HFMARK','MARK'],true).css('display',(value=='multi'||value=='multibycheckbox')?'':'none');
                }
            },
            dock:'fill',

            altRowsBg: {
                ini:false,
                action:function(value){
                    var ns=this;
                    var altCls = ns.getClass('ALT'),
                        nodes = ns.getSubNode('CELLS',true),alt,j;
                    nodes.removeClass(altCls);
                    if(value){
                        alt=[];
                        j=0;
                        nodes.each(function(o,i){
                            if(o.clientHeight){
                                o=xui([o]);
                                if((j++)%2==1){
                                    if(!o.hasClass(altCls))o.addClass(altCls);
                                }else{
                                    if(o.hasClass(altCls))o.removeClass(altCls);
                                }
                            }
                        });
                        xui(alt).addClass(altCls);
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
                                row=map[ns.getSubId(o.id)];
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
//                            }
                        });
                    else
                        nodes.text('');
                }
            },
            editable:false,

            $subMargin:16,

            iniFold:true,
            animCollapse:false,

            position:'absolute',
            width:300,
            height:200,

            _minColW:5,
            _maxColW:300,
            _minRowH:20,

            gridHandlerCaption:{
                ini:"",
                action:function(v){
                    v=(_.isSet(v)?v:"")+"";
                    this.getSubNode('GRIDCAPTION').html(xui.adjustRes(v,true));
                }
            },
            rowHandlerWidth: {
                ini:50,
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
                    this.getSubNode('HEADER').css('display',value?'':'none');
                }
            },
            headerHeight:{
                ini:18,
                action:function(v){
                    var o=this;
                    o.box._adjustColsV(o,v);
                    xui.UI.$tryResize(o, o.getRoot().width(), o.getRoot().height(),true);
                }
            },
            rowHeight:{
                ini:20,
                action:function(v){
                    this.getSubNode('CELLS', true).height(v);
                }
            },
            _colDfWidth: 80,

            rowHandler:{
                ini:true,
                action:function(value){
                    this.getSubNode('FHCELL').css('display',value?'':'none');
                    this.getSubNode('FCELL',true).css('display',value?'':'none');

                    this.box._adjustColsH(this);
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
                set:function(value,ov){
                    var o=this;
                    if(o.renderId){
                        o.boxing()._refreshHeader(value);
                    }else
                        o.properties.header = _.copy(value);
                }
            },
            grpCols:{
                //for default merge
                ini:{},
                set:function(value,ov){
                    var o=this;
                    o.properties.grpCols = _.copy(value);
                    if(o.renderId){
                        o.boxing()._refreshHeader(_.clone(o.properties.header,false,2));
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
                        o.properties.rows = _.copy(value);
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
                ini:true,
                action:function(value){
                    this.getSubNodes(['ROWLRULER', 'ROWTOGGLE'],true).css('display',value?'':'none');
                }
            },
            hotRowMode:{
                ini:'none',
                listbox:['none','show','hide','auto'],
                action:function(value){
                    if(this.renderId){
                        if(value=='none')
                            this.boxing().removeHotRow();
                        else
                            this.box.__ensurehotrow(this,null);
                    }
                }
            },
            hotRowNumber:'[*]',
            noCtrlKey:true
        },
        EventHandlers:{
            onBodyLayout:function(profile, trigger){},
            beforeCellKeydown:function(profile,cell,keys){},
            afterCellFocused:function(profile, cell, row){},

            beforeInitHotRow:function(profile){},
            onInitHotRow:function(profile){},
            beforeHotRowAdded:function(profile, row, leaveGrid){},
            afterHotRowAdded:function(profile, row){},

            onGetContent:function(profile, row, callback){},
            onRowSelected:function(profile, row, e, src, type){},

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

            beforeRowActive:function(profile, row){},
            afterRowActive:function(profile, row){},
            beforeCellActive:function(profile, cell){},
            afterCellActive:function(profile, cell){},

            beforeIniEditor:function(profile, cell, cellNode, pNode){},
            onBeginEdit:function(profile, cell, editor){},
            onEndEdit:function(profile, cell, editor){},

            beforeCellUpdated:function(profile, cell, options, isHotRow){},
            afterCellUpdated:function(profile, cell, options, isHotRow){},

            onRowDirtied:function(profile, row){},

            onRowHover:function(profile, row, hover, e, src){},
            onClickHeader:function(profile, col, e, src){},
            onClickRow:function(profile, row, e, src){},
            onClickRowHandler:function(profile, row, e, src){},
            onDblclickRow:function(profile, row, e, src){},
            onClickCell:function(profile, cell, e, src){},
            onDblclickCell:function(profile, cell, e, src){},
            onClickGridHandler:function(profile, e, src){},

            // Editors' default events
            beforeComboPop:function(profile, cell, proEditor, pos, e, src){},
            beforePopShow:function(profile, cell, proEditor, popCtl){},
            afterPopShow:function(profile, cell, proEditor, popCtl){},
            onCommand:function(profile, cell, proEditor, src){}
        },
        RenderTrigger:function(){
            var ns=this, pro=ns.properties,ins=ns.boxing();
            ns.destroyTrigger=function(){
                var ns=this, pro=ns.properties;
                _.breakO([ns.colMap, ns.rowMap, ns.cellMap], 3);
                pro.header.length=0;
                pro.rows.length=0;
                pro.grpCols.length=0;
            };
            ns.$cache_editor={};
            if(!pro.iniFold)
                ins._toggleRows(pro.rows,true);
            // trigger render
            _.arr.each(pro.header,function(o){
                if(_.isFun(o.colRenderer||pro.colOptions.colRenderer))
                    (o.colRenderer||pro.colOptions.colRenderer).call(null,ns,o);
            });
            _.arr.each(pro.grpCols,function(o){
                if(_.isFun(o.colRenderer||pro.colOptions.colRenderer))
                    (o.colRenderer||pro.colOptions.colRenderer).call(null,ns,o);
            });
            _.arr.each(pro.rows,function(o){
                if(_.isFun(o.rowRenderer||pro.rowOptions.rowRenderer))
                    (o.rowRenderer||pro.rowOptions.rowRenderer).call(null,ns,o);
            });
            ns.box._asy(ns);
            ns.box._adjustBody(ns,'render');
            ns.box.__ensurehotrow(ns,null);
        },
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
            if(prop.hotRowMode!='none'){
                var cell=profile.cellMap[profile.getSubId(src)],row;
                if(cell)
                    row=cell._row;
                else
                    row=profile.rowMap[profile.getSubId(src)];
                if(profile.__hastmpRow && profile.__needchecktmprow && row.id!==profile.box._temprowid)
                    profile.box._checkNewLine(profile,'focuscell');
            }
        },
        __ensurehotrow:function(profile,focusColId){
            var prop=profile.properties,
                box=profile.box,
                need=false;
            if(!box || !profile.renderId|| prop.hotRowMode=="none")return;

            if(profile.__hastmpRow){
                var rows=profile.properties.rows;
                if(rows.length===0 || rows[rows.length-1].id!=profile.box._temprowid)
                    need=true;
            }else{
                need=true;
            }

            if(need){
                // add a temp row
                switch(prop.hotRowMode){
                    case 'auto':
                        if(!prop.rows||prop.rows.length===0)
                            box._addTempRow(profile,focusColId);
                    break;
                    case 'show':
                        box._addTempRow(profile,focusColId);
                    break;
                }
            }
        },
        _temprowid:'_ r _temp_',
        isHotRow:function(row){
            return (row.id||row)===this._temprowid;
        },
        _addTempRow:function(profile,focusColId){
            var prop=profile.properties;
            if(prop.readonly || prop.disabled  || !prop.header || prop.header.length<=0)
                return false;

            // clear first, ensure only one
            profile.box._sethotrowoutterblur(profile,true);
            delete profile.__hastmpRow;
            profile.boxing().removeRows([this._temprowid],false);

            if(profile.beforeInitHotRow && false===profile.boxing().beforeInitHotRow(profile))
                return false;

            profile.__needchecktmprow=true;

            var row=[],
                ins=profile.boxing();
            if(profile.onInitHotRow)
                row=ins.onInitHotRow(profile);

            if(_.isArr(row))
                row={cells:row};
            else if(!_.isHash(row))
                row={cells:[row]};

            // gives a special id
            row.id = this._temprowid;
            row.rowNumber=prop.hotRowNumber;
            row.rowClass=profile.getClass('CELLS', '-hot');

            ins.insertRows([row],null,null,false,false);

            profile.__hastmpRow=true;

            // focus to next cell
            if(focusColId!==null){
                ins.focusCellbyRowCol(row.id, focusColId||prop.header[0].id);
                profile.box._sethotrowoutterblur(profile);
            }
        },

        _checkNewLine:function(profile,trigger){
            var prop=profile.properties;
            profile.box._sethotrowoutterblur(profile,true);

            // checked already
            if(!profile.__hastmpRow)
                return;

            delete profile.__needchecktmprow;

            var ins=profile.boxing(),
                rowId=this._temprowid,
                tempRow=ins.getRowbyRowId(rowId),
                result=prop.hotRowMode=='show'
                    ?trigger=='keydown'?true:null
                    :trigger?true:false;
            if(!tempRow)
                return;

            if(profile.beforeHotRowAdded){
                var result2=ins.beforeHotRowAdded(profile, tempRow, !trigger);
                if(_.isDefined(result2))
                    result=result2;
            }

            // do nothing
            if(result===null){
                if(prop.hotRowMode=='hide'||prop.hotRowMode=='auto'){
                    profile.box._sethotrowoutterblur(profile);
                }
                return false;
            }
            // remove the hot row
            else if(result===false){
                if(prop.hotRowMode=='hide'||prop.hotRowMode=='auto'){
                    delete profile.__hastmpRow;
                    ins.removeRows([rowId],false);
                    if(prop.rows.length===0 && prop.hotRowMode=='auto')
                        this._addTempRow(profile,null);
                }
                // dont add new hot row
                return false;
            }
            // add a new row
            else if(result===true){
                var newrow=_.clone(tempRow,true);
                // remove CELLS-hot;
                var hotcls=profile.getClass('CELLS', '-hot');
                if(hotcls==newrow.rowClass)delete newrow.rowClass;
                else newrow.rowClass=newrow.rowClass.replace(hotcls,'');

                delete profile.__hastmpRow;
                ins.removeRows([rowId],false);

                if(newrow.id==rowId)
                    delete newrow.id;
                if(newrow.rowNumber==prop.hotRowNumber)
                    delete newrow.rowNumber;

                ins.insertRows([newrow],null,null,false,false);

                if(profile.afterHotRowAdded)
                    ins.afterHotRowAdded(profile, prop.rows[prop.rows.length-1]);
                if(prop.hotRowMode=='show'){
                    if(!profile.__hastmpRow)
                        this._addTempRow(profile,null);
                }
                return true;
            }
            // focus the invalid cell, and keep this hot row
            else{
                profile.__needchecktmprow=true;
                // if returns cell
                if(_.isHash(result))
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
            profile.getSubNode('ROWS').setBlurTrigger(profile.$domId+':ROWS',clear?null:function(pos,e){
                var trigger = xui.Event.getSrc(e)==profile.getSubNode('SCROLL').get(0)?'focusin':null;
                profile.__tmpRowBlurTrigger=_.asyRun(function(){
                    // destroyed
                    if(!profile.box)return;
                    profile.box._checkNewLine(profile,trigger);
                });
            },null,null,true);
            if(clear){
                if(profile.__tmpRowBlurTrigger){
                    _.clearTimeout(profile.__tmpRowBlurTrigger);
                    delete profile.__tmpRowBlurTrigger;
                }
            }
        },
        _cacheRows:function(profile){
            var all=profile.getSubNode('CELLS',true).get();
            //filter dispaly==none
            _.filter(all,function(o){
                return !!o.clientHeight;
            });
            profile.$allrowscache = all;
        },
        _asy:function(profile){
            var pro=profile.properties,b=profile.boxing(),id=profile.$xid;
            if(pro.altRowsBg)_.resetRun(id+"1",function(){b.setAltRowsBg(true,true)});
            if(pro.rowNumbered)_.resetRun(id+"2",function(){b.setRowNumbered(true,true)});
        },
        _setRowHanderW:function(profile, flag){
            var pro=profile.properties,
                ww=pro.$subMargin,
                map=profile.rowMap,
                hcell=profile.getSubNode('FHCELL'),
                n,w;
            if(typeof flag=='number')
                w=flag;
            else if(flag===true){
                var ws=[],t;
                profile.getSubNode('FCELLINN',true).each(function(o){
                    if((t=o.parentNode).parentNode.offsetHeight>0 && xui.Dom.getStyle(t,'overflow')!='visible')
                        if(n=map[profile.getSubId(o.id)])
                            ws.push(xui([o]).width() + n._layer*ww);
                });
                ws.push(pro._minColW);
                w=parseInt(Math.max.apply(null,ws),10)+ww*2;
            }else
                w=hcell.width();

            //set width
            if(w){
                if(w<pro._minColW)w=pro._minColW;
                if(w<=0)return;
                if(pro.rowHandlerWidth!=w){
                    hcell.width(pro.rowHandlerWidth=w);
                    profile.getSubNode('FCELL',true).width(w);
                    profile.getSubNode('ROWLRULER',true).each(function(o){
                        n=map[profile.getSubId(o.id)];
                        o.style.width=(4+n._layer*ww)+'px';
                    });

                    profile.box._adjustColsH(profile);
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
                if(k==ks.ROWTOGGLE && !row.sub)
                    return false;
            }
            if(fp && fp.$xid==profile.$xid){
                if(fid && profile.getSubId(fid)==profile.getSubId(tid))
                    return false;
                t=profile.$_ond;

                src=xui(src).get(0);
                if(_.get(src,['parentNode','previousSibling'])==t)return false;
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
            xui.DragDrop.setDragIcon('none');
            if(!data.profile || !data.profile[profile.KEY])return;
            var k=profile.getKey(src),
                po=data.profile,
                ps=data.domId,
                oitem,
                ks=profile.keys,
                t=xui.absObj.$specialChars,
                b=profile.boxing(),

                orow= po.rowMap[po.getSubId(ps)],
                row= profile.rowMap[profile.getSubId(src)];

            //remove
            orow=_.clone(orow,function(o,i){return !t[(i+'').charAt(0)]});
            po.boxing().removeRows([orow.id]);

            //add
            if(k==ks.SCROLL)
                b.insertRows([orow], null, null, false);
            else if((k==ks.ROWTOGGLE) && row.sub)
                b.insertRows([orow], row.id, null, false);
            else if(k==ks.CELLS)
                b.insertRows([orow], row._pid, row.id, true);
            return false;
        },

        _beforeSerialized:function(profile){
            var o=arguments.callee.upper.call(this, profile),
                pp=profile.properties,
                map=xui.absObj.$specialChars,
                t;
            o.properties.header = _.clone(pp.header, function(o,i,d){
                return !map[((d===1?o.id:i)+'').charAt(0)]  && o!=undefined
            });
            o.properties.grpCols = _.clone(pp.grpCols, function(o,i,d){
                return !map[((d===1?o.id:i)+'').charAt(0)]  && o!=undefined
            });
            o.properties.rows = _.clone(pp.rows, function(o,i,d){
                return !map[((d===1?o.id:i)+'').charAt(0)]  && o!=undefined && (i=="id"?o.charAt(0)!="-":true);
            });
            if(o.properties.header.length===0)delete o.properties.header;
            if(o.properties.grpCols.length===0)delete o.properties.grpCols;
            if(o.properties.rows.length===0)delete o.properties.rows;
            return o;
        },
        _clsCache:{},

        _colDragCheck:function(profile, src){
            var dd = xui.DragDrop.getProfile(), key=dd.dragKey, data=dd.dragData,
                col=profile.colMap[profile.getSubId(src)];
            if(!col || col._isgroup)return false;
            if(!(col.hasOwnProperty('colMovable')?col.colMovable:profile.properties.colMovable))return false;
            if(!key || !data || key!=(profile.$xid+":col"))return false;
            if(data==xui.use(src).id() || data==xui.use(src).prev().id())return false;
        },
        _prepareData:function(profile){
            var data = arguments.callee.upper.call(this, profile),NONE='display:none',
                pro=profile.properties;

            // init row/cell cache
            profile.rowMap2 = {};
            profile.rowMap = {};
            profile.cellMap = {};

            data.showHeader=pro.showHeader?'':NONE;
            data.colDDDisplay=pro.colResizer?'':NONE;
            data.rowDDDisplay=pro.rowResizer?'':NONE;
            data.rowHandlerDisplay=pro.rowHandler?'':NONE;
            data.sortDisplay=NONE;
            data._hcelllineh=data._hcellheight=data.headerHeight?(data.headerHeight-2):'';
            data.headerHeight=data.headerHeight?('height:'+data.headerHeight+'px;'):'';
            data._rowMarkDisplay=(pro.selMode=="multi"||pro.selMode=="multibycheckbox")?"":"display:none;";

            if(pro.header && !_.isArr(pro.header))
                pro.header = [];
            if(pro.grpCols && !_.isArr(pro.grpCols))
                pro.grpCols = [];
            if(pro.rows && !_.isArr(pro.rows))
                pro.rows = [];

            pro.header=this._adjustHeader(pro.header);
            data.header=this._prepareHeader(profile, pro.header);
            data._row0DfW=data.rowHandlerWidth?('width:'+data.rowHandlerWidth+'px'):'';

            pro.grpCols=this._adjustGrpColsData(profile,pro.grpCols);
            data.grpCols=this._prepareGrpCols(profile, pro.grpCols, data.header);

            arguments.callee.upper.call(this, profile);

            pro.rows=this._adjustRows(pro.rows);
            data.rows = this._prepareItems(profile, pro.rows);
            return data;
        },
        _parepareCol:function(profile,col){
            // build header
            var SubID=xui.UI.$tag_subId,
                prop=profile.properties,
                headerHeight=prop.headerHeight,
                NONE='display:none',
                forDom;

            if(typeof col=='string')
                col={id:col};

            // links
            col._cells={};
            col[SubID]='-h_'+profile.pickSubId('header');

            col.id=col.id||col[SubID];

            profile.colMap[col[SubID]]=col;
            col.width = col.width||prop._colDfWidth;
            // width
            if(!col.relWidth){
                if(col.hasOwnProperty('minWidth'))col.width=Math.max(col.minWidth);
                if(col.hasOwnProperty('maxWidth'))col.width=Math.min(col.minWidth);
            }
            col._pxWidth=col.width;
            col._hcelllineh=col._hcellheight=headerHeight-2;

            forDom={
                sortDisplay : NONE,
                rowHandlerDisplay : prop.rowHandler?'':NONE
            };
            forDom[SubID]=col[SubID];
            forDom._tabindex=prop.tabindex;
            forDom.colDDDisplay = (('colResizer' in col)?col.colResizer:prop.colResizer)?'':NONE;

            if(col.relWidth)forDom.colDDDisplay = NONE;

            //  Forward-compatible with 'visibility'
            if(col.hasOwnProperty('visibility') && !col.hasOwnProperty('hidden'))
                col.hidden=!col.visibility;

            forDom.colDisplay = col.hidden===true?NONE:'';

            forDom.firstCellStyle=prop.colOptions.firstCellStyle||'';
            forDom.firstCellClass=prop.colOptions.firstCellClass||'';

            if(!col.type)col.type=prop.colOptions.type || 'input';
            if(!col.caption)col.caption=col.id;
            xui.UI.adjustData(profile, col, forDom);

            // id to dom item id
            profile.colMap2[col.id]=col[SubID];

            return [col,forDom];
        },
        _parepareCell:function(profile,cell,row,col){
            // build header
            var ns=this,
                SubID=xui.UI.$tag_subId,
                prop=profile.properties,
                NONE='display:none',
                forDom={};
            cell=_.isSet(cell) ? _.isHash(cell) ? cell : {value:cell} :{};
            //cell/cell link to row
            cell._row=row;
            //cell/cell link to header
            cell._col=col;
            //_serialId
            cell[SubID]='-c_'+profile.pickSubId('cell');
            // give id
            cell.id=cell.id||cell[SubID];
            // adjust
            ns._adjustCell(profile, cell, forDom);
            // cell only link its' dom item id to properties item
            profile.cellMap[forDom[SubID]]=cell;
            // row link to cell/cell
            row._cells[col.id]=forDom[SubID];
            // header link to cell/cell
            col._cells[row.id]=forDom[SubID];

            return [cell, forDom];
        },
        _prepareGrpCols:function(profile, arr, _header){
            var prop=profile.properties;
            if(prop.showHeader && arr && _.isArr(arr)&& arr.length){
                var header=prop.header,
                    headerHeight=prop.headerHeight,
                    SubID=xui.UI.$tag_subId,
                    NONE='display:none',
                    _ngrp=[],
                    _grp,w,h,_left,

                    layer=profile._headerLayers,
                    h=parseInt(headerHeight/(layer+1),10);
                    flag=false;

                for(var j=0,m=arr.length,grp;j<m;j++){
                    _grp={};
                    w=0;
                    flag=false;
                    _left=prop.rowHandler?(prop.rowHandlerWidth+2):0;

                    grp=arr[j];
                    xui.UI.adjustData(profile, grp, _grp);
                    for(var k=0,o;k<=grp.to;k++){
                        o=header[k];p=_header[k];
                        if(k===grp.from){
                            flag=true;
                            _grp._hcellleft=_left;
                        }
                        _left+= p._pxWidth + 2;
                        if(flag && !o.hidden){
                            w += p._pxWidth + 2;
                        }
                    }
                    _grp._pxWidth = w -2;
                    _grp._hcelllineh=_grp._hcellheight = h-2;
                    _grp._hcelltop = h*(grp._layer-1);

                    _grp._tabindex=prop.tabindex;
                    _grp.colDDDisplay = (('colResizer' in grp)?grp.colResizer:prop.colResizer)?'':NONE;

                    _ngrp.push(_grp)
                }

                // adjust base columns' height
                for(var k=0,n=header.length,o,p;k<n;k++){
                    o=header[k];p=_header[k];
                    if(o._grp && o._grp.length){
                        p._hcelllineh=p._hcellheight=headerHeight - o._grp.length*h - 2;
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

            _.arr.each(arr,function(o,i){
                colResult=profile.box._parepareCol(profile,o);
                arr[i]=colResult[0];
                header.push(colResult[1]);
            });
            return header;
        },
        _renderCell:function(profile,cell,node,options){
            var getPro=profile.box.getCellOption,
                dom=node['xui.Dom'],
                ncell=dom?cell:node,
                type=getPro(profile, cell, 'type'),
                t1='',
                t2='',
                caption,
                capOut=(!dom)&&node.caption,
                reg1=/</g,
                me=arguments.callee,
                dcls=me._dcls||(me._dcls=profile.getClass('CELL', '-disabled')),
                rcls=me._rcls||(me._rcls=profile.getClass('CELL', '-readonly')),
                //1. _$caption in cell (for special set)
                //2. caption in ncell(if [ncell] is not [cell], the [caption] maybe is the result of cell.renderer)
                //3. renderer in cell
                //4. default caption function
                //5. value in cell
                //6. ""
                ren=me._ren||(me._ren=function(profile,cell,ncell,fun){return (
                        // priority 1
                        typeof cell._$caption=='string'? cell._$caption:
                        // priority 2
                        typeof ncell.caption =='string'? xui.adjustRes(ncell.caption):
                        // priority 3
                        typeof (cell.renderer||cell._renderer)=='function'? (cell.renderer||cell._renderer).call(profile,cell) :
                        // priority 4
                        typeof fun=='function'?fun(cell.value, profile, cell):
                        // priority 5
                        (_.isSet(cell.value)?(""+cell.value):
                        // priority 6
                        "")
                    // default value
                    ) || ""}),
                f0=me._f0=(me._f0=function(v,profile,cell){
                    return v ? xui.Date.getText(v, getPro(profile, cell, 'dateEditorTpl')||'ymdhn') : "";
                }),
                f1=me._f1=(me._f1=function(v,profile,cell){
                    return v ? xui.Date.getText(v, getPro(profile, cell, 'dateEditorTpl')||'ymd') : "";
                }),
                f2=me._f2=(me._f2=function(v){return v?(v+'').replace(reg1,'&lt;').replace(/\t/g,'    ')/*.replace(/ /g,' ')*/.replace(/(\r\n|\n|\r)/g,"<br />"):""}),
                f3=me._f3=(me._f3=function(v){return (v||v===0) ? ((v*100).toFixed(2)+'%') : ""}),
                f4=me._f4=(me._f4=function(v,profile,cell){
                    if(v||v===0){
                        return _.formatNumeric(
                                parseFloat(v),
                                getPro(profile, cell, 'precision'),
                                getPro(profile, cell, 'groupingSeparator'),
                                getPro(profile, cell, 'decimalSeparator'),
                                getPro(profile, cell, 'forceFillZero')
                            );
                    }else
                        return "";
               }),
               f5=me._f5=(me._f5=function(v,profile,cell){
                    if(v||v===0){
                        var precision=getPro(profile, cell, 'precision');
                        return _.formatNumeric(
                                parseFloat(v),
                                // currency default precision is 2
                                _.isSet(precision)?precision:2,
                                getPro(profile, cell, 'groupingSeparator'),
                                getPro(profile, cell, 'decimalSeparator'),
                                getPro(profile, cell, 'forceFillZero')
                            );
                    }else
                        return "";
               }),
               f6=me._f6=(me._f6=function(v,profile,cell){
                    var t=getPro(profile,cell,'editorListItems');
                    if(!t)
                        if(t=getPro(profile,cell,'editorListKey'))
                           t=xui.UI.getCachedData(t);
                    if(t && t.length)
                        for(var i=0,l=t.length;i<l;i++)
                            if(t[i].id===v)
                                return t[i].caption||v;
                    return v;
               })
            ;

            switch(type){
                case 'number':
                case 'spin':
                    var v=parseFloat(cell.value);
                    cell.value=(v||v===0)?v:null;
                    caption= capOut ||ren(profile,cell,ncell,f4);
                    var tpl = getPro(profile, cell, 'numberTpl');
                    if(tpl && caption)
                        caption = tpl.replace("*", caption);
                    if(dom)
                        node.html(caption,false);
                break;
                case 'currency':
                    var v=parseFloat((cell.value+"").replace(/[^\d.-]/g,''));
                    cell.value=(v||v===0)?v:null;
                    //  Note that cell value has true numeric value, while caption has currency format with commas.
                    caption= capOut ||ren(profile,cell,ncell,f5);
                    var tpl = getPro(profile, cell, 'currencyTpl');
                    if(tpl && caption!=="")
                        caption = tpl.replace("*", caption);
                    if(dom)
                        node.html(caption,false);
                break;
                case 'date':
                case 'datepicker':
                    cell.value= _.isDate(cell.value)?cell.value:_.isFinite(cell.value)?new Date(parseInt(cell.value,10)):null;
                    caption= capOut || ren(profile,cell,ncell,f1);
                    if(dom)
                        node.html(caption, false);
                break;
                case 'datetime':
                    cell.value= _.isDate(cell.value)?cell.value:_.isFinite(cell.value)?new Date(parseInt(cell.value,10)):null;
                    caption= capOut || ren(profile,cell,ncell,f0);
                    if(dom)
                        node.html(caption, false);
                break;
                case 'textarea':
                    cell.value=cell.value||"";
                    cell.cellClass = "xui-cls-wordwrap "+cell.cellClass;
                    caption= capOut ||ren(profile,cell,ncell,f2);
                    if(dom)
                        node.html(caption,false);
                break;
                case 'color':
                case 'colorpicker':
                    var c=xui.UI.ColorPicker._ensureValue(0,cell.value);
                    cell.value=cell.value?((c!=="transparent"?'#':'')+c):"";
                    caption= capOut ||ren(profile,cell,ncell);
                    if(cell.value){
                        t1=xui.UI.ColorPicker.getTextColor(cell.value);
                        if(dom){
                            node.html(caption,false);
                            node.css('color',t1).css('backgroundColor',cell.value);
                        }else{
                            node.color='color:'+t1+';';
                            node.bgcolor='background-color:'+cell.value+';';
                        }
                    }else{
                        if(dom){
                            node.html(caption,false);
                            node.css('color','').css('backgroundColor','');
                        }else{
                            //node.color='color:#000;';
                            //node.bgcolor='background-color:#fff;';
                        }
                    }
                break;
                case 'checkbox':
                    cell.value=!!cell.value;
                    caption=cell.value+'';
                    if(dom)
                        node.first().tagClass('-checked', cell.value);
                    else
                        node.checkboxCls = profile.getClass('CHECKBOX', cell.value?'-checked':'');
                break;
                case 'progress':
                    cell.value=parseFloat(cell.value)||0;
                    cell.value=Math.min(Math.max(cell.value,0),1);
                    caption= capOut ||ren(profile,cell,ncell,f3);
                    if(dom){
                        node.first().html(caption, false).width(caption);
                    }else
                        node.progress=caption;

                break;
                case 'listbox':
                    cell.value=cell.hasOwnProperty("value")?cell.value:"";
                    caption= capOut ||ren(profile,cell,ncell,f6);
                    if(dom)node.html((caption===null||caption===undefined)?cell.value:caption,false);
                break;
                default:
                    cell.value=cell.hasOwnProperty("value")?cell.value:"";
                    caption= capOut ||ren(profile,cell,ncell);
                    if(dom)node.html((caption===null||caption===undefined)?cell.value:caption,false);
            }

            cell._$tips=caption;

            var t2=cell.disabled || cell._row.disabled || cell._col.disabled,
                t3=cell.readonly || cell._row.readonly || cell._col.readonly;
            if(!dom){
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
editorEvents

*/
                node.cellCls=profile.getClass('CELL', '-'+type) + (t2?(' '+dcls):'') + (t3?(' '+rcls):'');
                node.type=type;
                node.value=cell.value;
                node.caption=caption;

                node.cellStyle=getPro(profile, cell, 'cellStyle');
                node.cellClass=getPro(profile, cell, 'cellClass');

            }else{
                if(t2) node.parent().addClass(dcls);
                else node.parent().removeClass(dcls);
                if(t3) node.parent().addClass(rcls);
                else node.parent().removeClass(rcls);

                if(t2=options.cellStyle)
                    node.attr('style',node.attr('style')+";"+t2);
                if(t2=options.cellClass)
                    node.addClass(t2);
            }
        },
        _prepareItems:function(profile, arr, pid){
            var self=this,
                pro=profile.properties,
                mm = pro.$subMargin,
                a = profile.rowMap2,
                b = profile.rowMap,
                _layer=pid?b[pid]?(b[pid]._layer+1):0:0,
                SubID=xui.UI.$tag_subId,
                me=arguments.callee,
                ider = me._id||(me._id=new _.id()),
                rows=[],
                temp,cells,t,row,v,cellResult,
                NONE='display:none';

            for(var i=0,l=arr.length;i<l;i++){
                row = arr[i];
                // give id (avoid conflicts)
                if(!row.id || a[row.id]){
                    while(a[t=ider.next()]);
                    row.id="-"+t;
                }else{
                    row.id+="";
                }

                // give _serialId
                temp='-r_'+profile.pickSubId('row');
                row[SubID]=temp;
                b[temp]=row;

                //#
                row._pid = pid;
                row._cells={};
                row._layer=_layer;

                row._tabindex=pro.tabindex;
                row._rowMarkDisplay=(pro.selMode=="multi"||pro.selMode=="multibycheckbox")?"":NONE;

                row._treeMode=pro.treeMode?'':NONE;

                row._rowNumbDisplay=pro.rowNumbered?'':NONE;

                t={id: row.id};

                t.rowCls = ""
                if(row.disabled)
                    t.rowCls += profile.getClass('CELLS', '-disabled');
                if(row.readonly)
                    t.rowCls += profile.getClass('CELLS', '-readonly');
                if(row.group)
                    t.rowCls += profile.getClass('CELLS','-group');

                if(row.summary)
                    t.summaryDisplay='display:block;';
                if(row.preview)
                    t.previewDisplay='display:block;';
                if(row.hidden)
                    t.rowDisplay=NONE;

                t._row0DfW=pro.rowHandlerWidth?('width:'+pro.rowHandlerWidth+'px'):'';
                t._rulerW=4+_layer*mm;

                t.rowHeight=row.height||pro.rowHeight;
                t.rowHandlerDisplay=pro.rowHandler?'':NONE;
                t.rowDDDisplay=(('rowResizer' in row)?row.rowResizer:pro.rowResizer)?'':NONE;

                t.firstCellStyle=row.firstCellStyle||pro.rowOptions.firstCellStyle||'';
                t.firstCellClass=row.firstCellClass||pro.rowOptions.firstCellClass||'';

                cells = t.cells = [];

                t[SubID]=temp;
                t.subClass = row.sub?'xui-uicmd-toggle2':'xui-uicmd-empty';

                // id to dom item id
                a[row.id]=temp;

                // for cells
                if(row.group)
                    row.cells=null;
                if(!row.hasOwnProperty('caption') && row.hasOwnProperty('value'))
                    row.caption=''+row.value;

                if(row.caption && !row.tips)
                    row._$tips=row.caption;

                if(v=row.cells)
                    _.arr.each(pro.header,function(col,j){
                        cellResult = profile.box._parepareCell(profile, v[j], row, col);
                        v[j]=cellResult[0];
                        cells.push(cellResult[1]);
                    });

                xui.UI.adjustData(profile, row, t);

                rows.push(t);
            }
            return rows;
        },
        _adjustCell:function(profile, cell, uicell){
            var self=this,
                pro=profile.properties,
                col=cell._col,
                renderer;
            if(renderer=self.getCellOption(profile, cell, 'cellRenderer'))
                cell._renderer=renderer;

            //first
            xui.UI.adjustData(profile, cell, uicell);

            if(!uicell.width)uicell.width=col._pxWidth;
            uicell._tabindex=pro.tabindex;
            uicell.cellDisplay=col.hidden===true?'display:none;':'';

            self._renderCell(profile, cell, uicell);

            //next
            cell._oValue=cell.value;
        },
        _setSub:function(profile, item, flag){
            var id=profile.domId,
                pro=profile.properties,
                serialId = profile.rowMap2[item.id],
                markNode = profile.getSubNode('ROWTOGGLE', serialId),
                subNs = profile.getSubNode('SUB', serialId)
                ;

            if(xui.Thread.isAlive(profile.key+profile.id)) return;
            //close
            if(item._checked){
                if(!flag){
                    var onend=function(){
                        subNs.css({display:'none',height:0});
                        markNode.tagClass('-checked', false);
                        item._checked = false;
                        profile.box._asy(profile);

                        //clear rows cache
                        delete profile.$allrowscache;
                        profile.box._adjustBody(profile,'showrow');
                    };
                    if(pro.animCollapse) subNs.animate({'height':[subNs.height(),0]},null,onend, 200, 0, 'expoOut', profile.key+profile.id).start();
                    else onend();
                }
            }else{
                //open
                if(flag){
                    var openSub = function(profile, item, id, markNode, subNs, sub){
                        var b=profile.boxing(),
                            p = profile.properties,
                            empty = sub===false ||  (_.isArr(sub) && sub.length===0);
                        //created
                        if(!item._inited){
                            delete item.sub;
                            //before insertRows
                            item._inited=true;
                            //subNs.css('display','none');
                            if(sub){
                                if(typeof sub=='string')
                                    subNs.html(item.sub=sub,false);
                                else if(_.isArr(sub))
                                    b.insertRows(sub, item.id);
                                else if(sub['xui.Template']||sub['xui.UI'])
                                    subNs.append(item.sub=sub.render(true));
                            }
                            //set checked items
                            b._setCtrlValue(b.getUIValue(), true);
                        }

                        var h=0;
                        subNs.css("height","0px").css("display",'');
                        subNs.children().each(function(o){
                            h+=o.offsetHeight;
                        });
                        var onend=function(){
                            markNode.removeClass('xui-ui-busy');
                            markNode.tagClass('-busy', false);
                            if(empty){
                                markNode.css('background','none');
                            }else{
                                subNs.css({display:'',height:'auto'});
                                markNode.tagClass('-checked');
                            }
                            item._checked = true;
                            profile.box._asy(profile);
                            //clear rows cache
                            delete profile.$allrowscache;
                            profile.box._adjustBody(profile,'showrow');
                        };
                        if(p.animCollapse) subNs.animate({'height':[0,h]},null,onend, 200, 0, 'expoIn', profile.key+profile.id).start();
                        else onend();
                    };

                    var sub = item.sub, callback=function(sub){
                        openSub(profile, item, id, markNode, subNs, sub);
                    },t;
                    if((t=typeof sub)=='string'||t=='object')
                        callback(sub);
                    else if(profile.onGetContent){
                        markNode.addClass('xui-ui-busy');
                        var r=profile.boxing().onGetContent(profile, item, callback);
                        if(r||r===false){
                            //return true: continue UI changing
                            if(r===true)
                                item._inited=true;
                            callback(r);
                        }
                    }
                }
            }
        },
        _getCellId:function(profile, rowId, colId){
            return _.get(profile.rowMap,[profile.rowMap2[rowId], '_cells',colId]);
        },
        _updCell:function(profile, cellId, options, dirtyMark, triggerEvent){
            var box=profile.box,
                prop=profile.properties,
                pdm=prop.dirtyMark,
                psdm=prop.showDirtyMark,
                sc=xui.absObj.$specialChars,
                cell,node,ishotrow;

            if(typeof cellId == 'string')
                cell = profile.cellMap[cellId];
            else{
                cell = cellId;
                cellId = cell._serialId;
            }
            if(!cell)return;
            ishotrow=cell._row.id==box._temprowid;

            if(!_.isHash(options))options={value:options};
            options=_.filter(options,function(o,i){return !sc[i.charAt(0)] || i=='_$caption' });

            if(triggerEvent){
                if(profile.beforeCellUpdated && false === profile.boxing().beforeCellUpdated(profile, cell, options,ishotrow))
                    return;
            }

            // * remove cell's caption first
            delete cell.caption;
            delete cell._$caption;
            delete cell._$tips;

            _.merge(cell,options,'all');

            node=profile.getSubNode('CELLA', cellId);

            if('type' in options){
                var uicell={};
                box._adjustCell(profile, cell, uicell);
                node.parent().replace(profile._buildItems('rows.cells', [uicell]));
            }else
                box._renderCell(profile, cell, node, options);

            //if update value
            if('value' in options){
                if(!pdm || dirtyMark===false)
                    cell._oValue=cell.value;
                else{
                    if(cell.value===cell._oValue){
                        if(psdm)
                            node.removeClass('xui-ui-dirty');
                        delete cell.dirty;
                    }else{
                        if(psdm)
                            node.addClass('xui-ui-dirty');
                        cell.dirty=true;
                    }
                }
            }

            if(triggerEvent){
                if(profile.afterCellUpdated)
                    profile.boxing().afterCellUpdated(profile,cell, options,ishotrow);
            }
        },
        _ensureValue:function(profile,value){
            if(profile.properties.selMode=='multi'||profile.properties.selMode=='multibycheckbox'){
                var arr = _.isArr(value) ? vaue : (value ? (''+value) : '').split(profile.properties.valueSeparator);
                // ignore hot row
                _.arr.removeValue(arr,this._temprowid);
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
                        var i1=_.arr.subIndexOf(items,'id',profile.$firstV.id),
                            i2=_.arr.subIndexOf(items,'id',targetItem.id),
                            i;
                        arr.length=0;
                        for(i=Math.min(i1,i2);i<=Math.max(i1,i2);i++)
                            arr.push(items[i].id);
                    }else{
                        if(_.arr.indexOf(arr,sid)!=-1){
                            _.arr.removeValue(arr,sid);
                            checktype=-1;
                        }else
                            arr.push(sid);
                    }

                    arr.sort();
                    value = arr.join(properties.valueSeparator);

                    //update string value only for setCtrlValue
                    if(box.getUIValue() != value){
                        box.setUIValue(value);
                        if(box.get(0) && box.getUIValue() == value)
                            box.onRowSelected(profile, targetItem, e, src, checktype);
                    }
                    break;
                }
            case 'single':
                if(box.getUIValue() != sid){
                    profile.$firstV=targetItem;
                    box.setUIValue(sid);
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
                if(profile.beforeCellActive && (false===profile.boxing().beforeCellActive(profile, targetCell)))return;
                xui(profile.$activeCell = id).tagClass('-active');
            }
            if(profile.afterCellActive)profile.boxing().afterCellActive(profile, targetCell);
        },
        _activeRow:function(profile, id){
            if(profile.properties.activeMode!='row')return;
            if(profile.$activeRow == id)return;
            var targetRow=null;
            if(profile.$activeRow){
               xui(profile.$activeRow).tagClass('-active', false);
               delete profile.$activeRow;
            }
            if(id!==false){
                var targetId = profile.getSubId(id),
                    map = profile.rowMap;
                targetRow=map[targetId];
                //before event
                if(profile.beforeRowActive && (false===profile.boxing().beforeRowActive(profile, targetRow)))return;
                xui(profile.$activeRow = id).tagClass('-active');
            }
            //after event
            if(profile.afterRowActive)profile.boxing().afterRowActive(profile, targetRow);
        },
        getCellOption:function(profile, cell, key){
            var t=cell,p=profile.properties;
            return (t && t.hasOwnProperty(key)&&_.isSet(t[key]))?t[key]
                    :((t=cell._row)&&t.hasOwnProperty(key)&&_.isSet(t[key]))? t[key]
                    :((t=p.rowOptions)&&t.hasOwnProperty(key)&&_.isSet(t[key]))? t[key]
                    :((t=cell._col)&&t.hasOwnProperty(key)&&_.isSet(t[key]))?t[key]
                    :((t=p.colOptions)&&t.hasOwnProperty(key)&&_.isSet(t[key]))?t[key]
                    :((t=p)&&t.hasOwnProperty(key)&&_.isSet(t[key]))?t[key]:null;
        },
        _trycheckrowdirty:function(profile,cell){
            if(!cell || !cell._row)return;

            _.resetRun(profile.key+":"+profile.$xid+":"+cell._row.id,function(){
                // destroyed
                if(!profile.box)return;
                var lc=profile.$cellInEditor;
                if(cell._row && (!lc || (lc._row && lc._row!=cell._row))){
                    var dirty=false;
                    _.arr.each(cell._row.cells,function(v){
                        if(v._oValue!==v.value){
                            dirty=true;
                            return false;
                        }
                    });
                    if(dirty && cell._row.id !=profile.box._temprowid && profile.onRowDirtied)
                        profile.boxing().onRowDirtied(profile,cell._row);
                }
            },100);
        },
        _editCell:function(profile, cellId){
            var cell = typeof cellId=='string'?profile.cellMap[cellId]:cellId;
            if(!cell)return;
            if(profile.box.getCellOption(profile, cell,'disabled') || profile.box.getCellOption(profile, cell,'readonly'))return ;

            // real cellId
            cellId=cell._serialId;
            var cellNode = profile.getSubNode('CELL', cellId),
                colId = cell._col.id,
                ishotrow=cell._row.id==profile.box._temprowid;

            //clear the prev editor
            var editor = profile.$curEditor;
            if(editor)_.tryF(editor.undo,[],editor);
            editor=null;

            var grid = this,
                baseNode = profile.getSubNode('SCROLL'),
                box=profile.box,
                getPro=function(key){return box.getCellOption(profile, cell, key)};

            // 1. customEditor in cell/row or header
            editor = profile.box.getCellOption(profile, cell,'customEditor');
            if(editor && typeof editor.iniEditor=='function'){
                editor.iniEditor(profile, cell, cellNode);
                _.tryF(editor.activate,[],editor);
                if(profile.onBeginEdit)
                    profile.boxing().onBeginEdit(profile, cell, editor);
            }else{
                // 2. beforeIniEditor
                //      returns an editor(xui.UI object)
                //      or, sets $editorValue
                if(profile.beforeIniEditor){
                    editor=profile.boxing().beforeIniEditor(profile, cell, cellNode, baseNode);
                    // if return false, dont set $curEditor
                    if(editor===false)
                        return;
                }

                // if beforeIniEditor doesnt return an editor
                if(!editor || !editor['xui.UI']){
                    var type=getPro('type')||'input',
                        editorAutoPop= getPro('editorAutoPop'),
                        editorCacheKey = getPro('editorCacheKey'),
                        editorProperties = getPro('editorProperties'),
                        editorEvents = getPro('editorEvents'),
                        editorFormat = getPro('editorFormat'),
                        editorMask = getPro('editorMask'),
                        editorSharp = getPro('editorSharp'),
                        editorReadonly = getPro('editorReadonly'),
                        editorDropListWidth = getPro('editorDropListWidth'),
                        editorDropListHeight = getPro('editorDropListHeight'),
                        t,oldProp;

                    // 3. for checkbox/lable,button type
                    if(type=='checkbox'){
                        cellNode.first().focus();
                        return;
                    }else if(type=='button'||type=='label')
                        return;

                    // 4. try to get editor from cache
                    if(editorCacheKey && profile.$cache_editor[editorCacheKey])
                        editor=profile.$cache_editor[editorCacheKey];
                    // 5. else, create a ComboInput Editor, and cache it
                    if(!editor)
                        editor=new xui.UI.ComboInput({dirtyMark:false,cachePopWnd:false,left:-1000,top:-1000,position:'absolute',visibility:'hidden',zIndex:100});
                    switch(type){
                        case 'number':
                        case 'spin':
                        case 'currency':
                            var precision=getPro('precision'),
                                increment=getPro('increment'),
                                min=getPro('min'),
                                max=getPro('max'),
                                maxlength=getPro('maxlength'),
                                currencyTpl=getPro('currencyTpl'),
                                numberTpl=getPro('numberTpl'),
                                groupingSeparator=getPro('groupingSeparator'),
                                decimalSeparator=getPro('decimalSeparator'),
                                forceFillZero=getPro('forceFillZero');
                            editor.setType(type);
                            if(type=='currency'){
                                if(!_.isSet(precision))
                                    precision=2;
                                if(_.isSet(currencyTpl))
                                    editor.setCurrencyTpl(currencyTpl);
                            }else{
                                if(!_.isSet(precision))
                                    precision=0;
                                if(_.isSet(numberTpl))
                                    editor.setNumberTpl(numberTpl);
                                if(type=='spin' && _.isSet(increment))
                                    editor.setIncrement(increment);
                                if(_.isSet(min))
                                    editor.setMin(min);
                                if(_.isSet(max))
                                    editor.setMax(max);
                                if(_.isSet(maxlength))
                                    editor.setMaxlength(maxlength);
                            }
                            if(_.isSet(precision))
                                editor.setPrecision(precision);
                            if(_.isSet(groupingSeparator))
                                editor.setFroupingSeparator(groupingSeparator);
                            if(_.isSet(decimalSeparator))
                                editor.setDecimalSeparator(decimalSeparator);
                            if(_.isSet(forceFillZero))
                                editor.setForceFillZero(forceFillZero);
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
                            _.tryF(editor.setResizer,[true],editor);
                            break;
                        case 'date':
                        case 'datepicker':
                        case 'datetime':
                            var dateEditorTpl=getPro('dateEditorTpl');
                            if(dateEditorTpl)
                                editor.setDateEditorTpl(dateEditorTpl);
                        case 'listbox':
                        case 'combobox':
                        case 'helpinput':
                        case 'time':
                        case 'timepicker':
                        case 'color':
                        case 'colorpicker':
                        case 'getter':
                        case 'popbox':
                        case 'cmdbox':
                        case 'droplist':
                            editor.setType(type);
                            if(profile.box.getCellOption(profile, cell,'disabled')){
                            }else{
                                editor.beforeComboPop(function(pro, pos, e, src){
                                    var cell=pro.$cell,event=profile.box.getCellOption(profile, cell, 'event');
                                    if(typeof event == 'function')
                                        return event.call(profile._host||profile, profile, cell, pro, pos,e,src);
                                    else
                                        return profile.boxing().beforeComboPop(profile, cell, pro, pos, e, src);
                                });
                                if(profile.beforePopShow)
                                    editor.beforePopShow(function(pro, popCtl){
                                        return profile.boxing().beforePopShow(profile, pro.$cell, pro, popCtl);
                                    });
                                if(profile.afterPopShow)
                                    editor.afterPopShow(function(pro, popCtl){
                                        return profile.boxing().afterPopShow(profile, pro.$cell, pro, popCt);
                                    });
                                if(profile.onCommand)
                                    editor.onCommand(function(pro, node){
                                        return profile.boxing().onCommand(profile, pro.$cell, pro, node);
                                    });
                            }
                            break;
                        case 'file':
                            editor.setType(type);
                        break;
                    }
                    baseNode.append(editor);
                    //cache the stantdard editor
                    if(editorCacheKey)
                        profile.$cache_editor[editorCacheKey] = editor;

                    if(editor.setInputReadonly && editorReadonly)
                        editor.setInputReadonly(true);
                    if(editor.setDropListWidth && editorDropListWidth)
                        editor.setDropListWidth(editorDropListWidth);
                    if(editor.setDropListHeight && editorDropListHeight)
                        editor.setDropListHeight(editorDropListHeight);
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
                        _.each(editorProperties,function(o,i){
                            oldProp=h[i];
                        });
                        editor.setProperties(editorProperties);
                    }
                    if(editorEvents)
                        editor.setEvents(editorEvents);

                    // clear for valueFormat, setValue maybe cant set value because of valueFormat
                    editor.resetValue();

                    //set properities
                    switch(type){
                        case 'listbox':
                        case 'combobox':
                        case 'helpinput':
                            // set properties
                            if(t=getPro('editorListItems')){
                                editor.setListKey(null);
                                editor.setItems(t);
                            }else if(t=getPro('editorListKey')) {
                                editor.setItems(null);
                                editor.setListKey(t);
                            }
                            break;
                        case 'cmdbox':
                        case 'popbox':
                            // reset Caption
                            if(editor.setCaption)
                                editor.setCaption(cell.caption||"");
                    }

                    // must set value here, after setItems/setListKey
                    //$editorValue must be set in beforeIniEditor
                    editor.setValue(cell.$editorValue||cell.value,true);
                    delete cell.$editorValue;

                    //$tag for compatible
                    if(cell.$tag){
                        if(editor.setCaption)editor.setCaption(cell.$tag);
                        else if(editor.setValue)editor.setValue(cell.$tag);
                    }
                    //give a reference
                    editor.get(0).$cell = cell;
                    editor.get(0)._smartnav=true;

                    //undo function is a must
                    editor.undo=function(refocus){
                        var editor=this;
                        
                        // row dirty alert
                        if(profile.box)
                            profile.box._trycheckrowdirty(profile,profile.$cellInEditor);

                        if(editor.get(0) && editor.get(0).box){
                            // for ie's setBlurTrigger doesn't trigger onchange event
                            editor.getSubNode('INPUT').onBlur(true);

                            if(refocus && editorSharp){
                               cell._ignorefocus=1;
                               profile.boxing().focusCell (profile.$cellInEditor);
                               _.asyRun(function(){
                                    delete cell._ignorefocus;
                               });
                            }
                            editor.getRoot().setBlurTrigger(profile.$xid+":editor");
                            if(profile.properties && !profile.properties.directInput){
                                editor.afterUIValueSet(null).beforeNextFocus(null).onCancel(null).afterPopHide(null);
                                editor.setValue('',true);
                            }
                            // clear those setting
                            if(editorFormat){
                                if(editor.beforeFormatCheck)editor.beforeFormatCheck(null);
                                if(editor.setValueFormat)editor.setValueFormat('');
                            }
                            if(editorMask)
                                if(editor.setMask)editor.setMask('');
                            if(editorReadonly)
                                if(editor.setInputReadonly)editor.setInputReadonly(false);
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
                            editor.setVisibility('hidden');

                            if(_.isFun(editor.collapse))editor.collapse();
                        }
                        if(editorEvents){
                            var h={};
                            _.each(editorEvents,function(o,i){
                                h[i]=null;
                            });
                            editor.setEvents(h);
                        }
                        profile.$curEditor=null;
                        profile.$cellInEditor=null;
                        // execute once
                        editor.undo=null;
                        if(profile.onEndEdit)
                            profile.boxing().onEndEdit(profile, cell, editor);

                        // don't cache it
                        if(!editorCacheKey && editor.get(0)){
                            editor.destroy(true);
                        }
                        editor=null;
                    };

                    //editor change value, update cell value
                    editor
                    .afterUIValueSet(function(pro,oV,nV){
                        var type=getPro('type'),_$caption;
                        switch(type){
                            case 'number':
                            case 'spin':
                            case 'progress':
                                nV=parseFloat(nV);
                                nV=(nV||nV===0)?nV:null;
                                break;
                            case 'currency':
                                nV=parseFloat((''+nV).replace(/[^\d.-]/g,''));
                                nV=(nV||nV===0)?nV:null;
                                break;
                            case 'cmdbox':
                            case 'popbox':
                            case 'combobox':
                            case 'listbox':
                            case 'helpinput':
                                _$caption=pro.boxing().getShowValue();
                                break;
                        }
                        var options={value:nV};

                        if(_.isDefined(_$caption))
                            options.caption=options._$caption=_$caption;

                        if(pro.properties.hasOwnProperty("tagVar"))
                            options.tagVar=pro.properties.tagVar;

                        grid._updCell(profile, cellId, options, profile.properties.dirtyMark, true);

                        if(editorSharp)
                            _.tryF(editor.undo,[true],editor);
                    })
                    .beforeNextFocus(function(pro, e){
                        if(editor){    
                            _.tryF(editor.undo,[true],editor);
                            var hash=xui.Event.getEventPara(e);
                            if(hash.keyCode=='enter')hash.keyCode='right';

                            profile.getSubNode('CELLA', cell._serialId).onKeydown(true,hash);
                        }
                        //prevent
                        return false;
                    })
                    .onCancel(function(){
                        if(editor)
                            _.tryF(editor.undo,[],editor);
                    })
                    .afterPopHide(function(p,r,type){
                        if(editorSharp)
                            _.tryF(editor.undo,[type!="blur"&&type!="call"],editor);
                    })
                    .getRoot().setBlurTrigger(profile.$xid+":editor", function(){
                        if(editor)
                            _.tryF(editor.undo,[],editor);
                        return false;
                    });

                    var absPos=cellNode.offset(null, baseNode),
                        size = cellNode.cssSize();
                    //show editor
                    if(type=='textarea'){
                        editor.setWidth(Math.max(200,size.width+3)).setHeight(Math.max(100,size.height+2))
                        .reLayout(true,true)
                        .reBoxing()
                        .popToTop(cellNode, 4, baseNode);
                    }else{
                        editor.setWidth(size.width+3).setHeight(size.height+2).reLayout(true);
                        editor.reBoxing().show((absPos.left-1) + 'px',(absPos.top-1) + 'px');
                    }

                    var expand;
                    if( editorSharp||
                        (_.isFun(editor.expand) &&
                            (editorAutoPop!==false) &&
                            (editorAutoPop || type=='listbox'||type=='date'||type=='datepicker'||type=='datetime'||type=='time'||type=='timepicker'||type=='color'||type=='colorpicker')
                        )
                     ){
                        expand=1;
                        editor.expand();
                     }
                    //activate editor
                    _.asyRun(function(){
                        // destroyed
                        if(!profile.box)return;
                        var target=editor;
                        if(expand && editor.getPopWnd)
                            target = editor.getPopWnd();
                        _.tryF(target&&target.activate,[],target);
                    });
                    editor.setVisibility(editorSharp?"hidden":"visible");

                    if(profile.onBeginEdit)
                        profile.boxing().onBeginEdit(profile, cell, editor);
                }
            }

            //give a reference
            profile.$curEditor=editor;
            profile.$cellInEditor=cell;

            if(ishotrow){
                profile.__needchecktmprow=true;
                profile.box._sethotrowoutterblur(profile);
            }
        },
        _adjustBody:function(profile, trigger, callback){
            if(!profile.renderId || profile.destroyed)return;
            _.resetRun(profile.$xid+'4',function(){
                // destroyed
                if(!profile.renderId || profile.destroyed)return;
                profile.getSubNode('SCROLL').css('overflow','hidden');
                var overflowX=profile.box._adjustRelWith(profile);

                var body=profile.getSubNode('ROWS'),
                    header=profile.getSubNode('HCELLS'),
                    cols=profile.properties.header,
                    scroll=profile.getSubNode('SCROLL'),
                    t,l,last,keys=profile.keys,ww,bw;
                if(body.get(0).clientHeight){
                    if(header.get(0).clientHeight){
                        if(t=header.get(0).childNodes){
                            l=t.length;
                            while(l){
                                if(t[l-1].clientHeight){
                                    last=t[l-1];
                                    break;
                                }
                                --l;
                            }
                        }
                        ww=last?(last.offsetWidth+last.offsetLeft+100):0;
                        //set HI node
                        header.parent().width(ww);
                        body.width(bw=ww);
                    }else{
                        if(t=body.get(0).childNodes){
                            l=t.length;
                            while(l){
                                if(t[l-1].clientHeight){
                                    last=t[l-1];
                                    break;
                                }
                                --l;
                            }
                            if(last){
                                var sid=profile.getSubId(last.id);
                                t=profile.getSubNode('CELLS',sid);
                                if(t=t.get(0).childNodes){
                                    l=t.length;
                                    while(l){
                                        if(t[l-1].clientHeight){
                                            last=t[l-1];
                                            break;
                                        }
                                        --l;
                                    }
                                }
                            }
                        }
                    }
                }

                if(last){
                    body.width(bw=last.offsetWidth+last.offsetLeft);
                }else{
                    var prop = profile.properties,hd=prop.header,rows=prop.rows,
                    //defult
                    w = prop.rowHandler?(prop.rowHandlerWidth+2):0;
                    _.each(hd,function(o){
                        if(o.hidden!==true)
                            w += ('_pxWidth' in o) ? o._pxWidth : (o.width + 2);
                    });
                    body.width(bw=w);
                }
                t=last=null;

                // must use 'auto' for Android
                scroll.css('overflow','auto');

                if(bw>scroll.width()+2){
                    overflowX="auto";
                }

                scroll.css('overflowX', overflowX);

                scroll.onScroll();

                if(profile.onBodyLayout)
                    profile.boxing().onBodyLayout(profile, trigger);

                if(callback)callback();
            });
        },
        _adjustHeader:function(arr){
            var a=_.copy(arr),m;
            _.arr.each(a,function(o,i){
                //id will be adjusted in _prepareHeader
                a[i]=_.copy(o);
            });
            return a;
        },
        _adjustGrpColsData:function(profile,arr){
            if(!_.isArr(arr))return _.copy(arr);

            var prop=profile.properties,
                header=prop.header,
                len=header.length,
                slen=(len+'').length,
                SubID=xui.UI.$tag_subId,
                a=_.copy(arr,function(o){
                    o.from=parseInt(o.from,10)||0;
                    o.to=parseInt(o.to,10)||0;
                    return o.from<=len && o.to<=len && o.to>=o.from;
                });

            _.arr.each(a,function(o,i){
                a[i]=_.isHash?_.copy(o):{};
            });
            _.arr.stableSort(a,function(x,y){
                // desc by from, aesc by to
                x.from>y.from?1:x.from==y.from?(x.to>y.to?-1:x.to==y.to?0:1):-1;
            });
            for(var j=0,m=a.length,grp;j<m;j++){
                grp=a[j];
                grp[SubID]=grp[SubID]||('g_'+profile.pickSubId('grpCol'));
                grp.id=grp.id||grp[SubID];
                if(!grp.caption)grp.caption=grp.id;
                grp._isgroup=1;
                delete grp._grp;

                profile.colMap[grp[SubID]]=grp;
                profile.colMap2[grp.id]=grp[SubID];
            }
            _.arr.each(a,function(o,i){
                for(var j=0;j<i;j++){
                    // across
                    if(a[i].to > a[j].from && a[i].from < a[j].to){
                        // cut
                        if(a[i].to > a[j].to)a[i].to = a[j].to;
                        // record it
                        (a[i]._grp||(a[i]._grp=[])).push(a[j].id);
                    }
                }
            });
            _.arr.each(header,function(o){
                delete o._grp;
            });

            var layer=0;
            // caculate layers
            for(var j=0,m=a.length,grp;j<m;j++){
                grp=a[j];
                for(var i=grp.from;i<=grp.to;i++){
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
        _adjustRows:function(arr){
            var a,m;
            if(_.isArr(arr) && arr.length && typeof arr[0] !='object')a=[arr];
            else a=_.copy(arr);

            _.arr.each(a,function(o,i){
                //id will be adjusted in _prepareItems
                if(_.isArr(o))
                    a[i]={cells:o};
                else a[i]=_.copy(o);

                m=a[i].cells=_.copy(a[i].cells);
                _.arr.each(m,function(o,i){
                    //It's a hash
                    if(!!o && _.isHash(o))
                        m[i]=_.copy(o);
                    // not a hash
                    else
                        m[i]={value:o};
                })
            });
            return a;
        },
        _adjustColsH:function(profile){
            var prop=profile.properties,
                header=prop.header,
                arr=prop.grpCols;
            if(prop.showHeader && arr && _.isArr(arr)&& arr.length){
                var _left,_l,_w,flag=false;
                for(var j=0,m=arr.length,grp,n;j<m;j++){
                    _l=_w=0;
                    flag=false;
                    _left=prop.rowHandler?(prop.rowHandlerWidth+2):0;
                    grp=arr[j];
                    for(var k=0,o;k<=grp.to;k++){
                        o=header[k];
                        if(k===grp.from){
                            flag=true;
                            _l=_left;
                        }
                        _left+= o._pxWidth + 2;
                        if(flag && !o.hidden){
                            _w += o._pxWidth + 2;
                        }
                    }
                    n=profile.getSubNode("HCELL",grp._serialId);
                    if(_w>2){
                        n.css({display:'',left:_l+"px",width:(_w-2)+"px"});
                    }else{
                        n.css({display:'none'});
                    }
                }
            }
        },
        _adjustColsV:function(profile, h){
            var map=profile.colMap,
                _layers=profile._headerLayers,
                l,th,col,rt,rh;
            profile.getSubNodes(['HCELLS','GRPCELLBOX']).height(h);
            profile.getSubNode('FHCELL').css({height:h-2+"px",'line-height':h-2+"px"});
            if(!_layers){
                 profile.getSubNode('HCELL',true).css({height:h-2+"px",'line-height':h-2+"px"});
                // if(xui.browser.ie6) // ignore ie6 here
                //    profile.getSubNode('HCELLA',true).css({'line-height':h-2+"px"});
            }else{
                th=parseInt(h/(_layers+1),10);
                profile.getSubNode('HCELL',true).each(function(o){
                    col=profile.getSubId(o.id);
                    if(col=map[col]){
                        // group
                        if(col&&col._isgroup){
                            xui(o).top(th*(col._layer-1));
                            rh=th;
                        }else{
                            if(col._grp&&(l=col._grp.length))
                                rh=h-l*th;
                            else
                                rh=h;
                        }
                        xui(o).css({height:rh-2+"px",'line-height':rh-2+"px"});
                        // for IE6 // ignore ie6 here
                        //if(xui.browser.ie6)
                        //    xui(o).first().css({'line-height':rh-2+"px"});
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
                _.asyRun(function(){
                    profile.$_ensureOnce=0;
                });
            }else return;

            var p = profile.properties,
                box=profile.box,
                getPro=box.getCellOption,
                cell = profile.cellMap[profile.getSubId(src)],
                mode = p.activeMode, id;

            if(!cell || cell._ignorefocus)return;

            if(cell){
                var edit=false;
                if(getPro(profile, cell, 'editable')){
                    if(getPro(profile, cell, 'disabled')||getPro(profile, cell, 'readonly')){
                        edit=false;
                    }else{
                        edit=true;
                        xui(src).parent().tagClass('-mousedown', false);
                        box._editCell(profile, cell._serialId);
                        _.asyRun(function(){
                            // destroyed
                            if(!profile.box)return;
                            xui.use(src).parent().onMouseout(true,{$force:true})
                                      .parent().onMouseout(true,{$force:true});
                        });
                    }
                }
                // if not in edit mode
                if(!edit){
                    if(cell && mode=='cell'){
                        id = xui.use(src).parent().id();
                        box._activeCell(profile, id);
                    }
                }else{
                    if(cell && mode=='cell'){
                        box._activeCell(profile, false);
                    }
                }
            }
            if(mode=='row'){
                id = xui.use(src).parent(2).id();
                box._activeRow(profile, id);
            }
        },
        _showTips:function(profile, node, pos){
            if(profile.properties.disableTips)return;
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);
            if(!xui.Tips)return;

            var ks=profile.keys,item,hcell=ks.HCELL+':',sid,id,pid,ppid;
            if(profile.properties.disabled)return;

            id=node.id;
            pid=_.get(node,["parentNode","id"])||"";
            ppid=_.get(node,["parentNode","parentNode","id"])||"";
            sid=profile.getSubId(id);

            if(id.indexOf(ks.FHCELL)==0||pid.indexOf(ks.FHCELL)==0||ppid.indexOf(ks.FHCELL)==0)
                item = {tips:profile.properties.tips};
            else if(id.indexOf(ks.FCELL)==0 || pid.indexOf(ks.FCELL)==0)
                item = profile.rowMap[sid];
            else if(id.indexOf(ks.HCELL)==0 || pid.indexOf(ks.HCELLA)==0)
                item = profile.colMap[sid];
            else if(id.indexOf(ks.CELL)==0 || pid.indexOf(ks.CELLA)==0)
                item = profile.cellMap[sid];

            if(item){
                xui.Tips.show(pos, ('tips' in item)?item.tips:(item._$tips||item.caption));
            }else
                xui.Tips.hide();
            return true;
        },
        _adjustRelWith:function(profile){
            var prop=profile.properties,
                cols=profile.colMap,
                t2=profile.getSubNode('SCROLL'),
                t3=profile.getSubNode('BODY'),
                width=t2.width(),
                borderW=0,
                borderC=0;

            profile.getSubNodes('HCELL',true).each(function(hc){
                if(hc.clientHeight){
                    borderW=hc.offsetWidth-parseInt(hc.style.width);
                    return false;
                }
            });

            var fixW=0,relWTotal=0,relWCol=[],relWCol2=[];
            if(prop.rowHandler){
                borderC++;
                fixW=prop.rowHandlerWidth;
            }
            _.each(profile.colMap,function(col){
                if(col.hidden)return;
                if(!col.relWidth){
                    fixW+=col.width;
                }else{
                    relWTotal+=parseFloat(col.width);
                    relWCol.push(col)
                    relWCol2.push(col);
                }
                borderC++;
            });

            if(!relWCol.length){
                overflowX='auto';
                return;
            }else{
                overflowX='hidden';
                if(t2.isScrollBarShowed('y'))
                    width-=xui.Dom.getScrollBarSize();
            }

            while(relWCol.length && width!=fixW+borderC*borderW){
                var fW=width-(fixW+borderC*borderW),
                    fW1=0,
                    l=relWCol.length,
                    retry=0;
                for(var i=l-1;i>=0;i--){
                    var col=relWCol[i],
                        w = i===0?(fW-fW1):Math.round(fW*(col.width/relWTotal));

                    if(w<0)w=0;
                    col._pxWidth=w;
                    if(col.hasOwnProperty('minWidth')){
                        if(col.minWidth>w){
                            fixW+=col.minWidth;
                            col._pxWidth=col.minWidth;
                            _.arr.removeFrom(relWCol,i);
                            retry++;
                        }
                    }
                    if(col.hasOwnProperty('maxWidth')){
                        if(col.maxWidth<w){
                            fixW+=col.maxWidth;
                            col._pxWidth=col.maxWidth;
                            _.arr.removeFrom(relWCol,i);
                            retry++;
                        }
                    }
                    fW1+=col._pxWidth;
                }
                // break while;
                if(retry===0||retry===l)
                    break;
            }
            if(relWCol2.length){
                _.arr.each(relWCol2,function(col){
                    var n,nodes=[];
                    _.each(col._cells,function(o){
                        n=profile.getSubNode('CELL',o);
                        if(n._nodes.length){
                            nodes.push(n.get(0));
                        }
                    });
                    n=profile.getSubNode('HCELL',col._serialId);
                    if(n._nodes.length){
                        nodes.push(n.get(0));
                    }
                    xui(nodes).width(col._pxWidth);
                });
            }
            return overflowX;
        },
        _getRow:function(profile,row,type){
            if(row){
                if(type=='data')
                    return _.clone(row,true);
                else if(type=='min'){
                    var a=_.clone(row,true),b;
                    _.each(b=a=a.cells,function(row,j){
                        b[j] = row.value;
                    });
                    return a;
                }else if(type=='map'){
                    var hash={},header=profile.properties.header;
                    _.each(b=a=a.cells,function(row,j){
                        hash[header[j].id]=row;
                    });
                    return hash;
                }else
                    return row;
            }
        },
        _onresize:function(profile,width,height){
            var css={};
            if(width)css.width=width;
            if(height)css.height=height;

            var prop=profile.properties,
                t1=profile.getSubNode('HEADER'),
                t2=profile.getSubNode('SCROLL'),
                cols=profile.colMap,
                rh=0;

            profile.getSubNode('BORDER').cssSize(css);
            profile.getSubNode('BOX').cssSize(css);

            if(width)t1.width(width);
            if(height)rh=t1.offsetHeight();

            css.height=height?(height-rh):null;
            t2.cssSize(css);

            this._adjustBody(profile,'resize');
        }
   }
});
