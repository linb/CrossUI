xui.Class('xui.Module.PageGrid', 'xui.Module',{
    Instance:{
        // To initialize internal components (mostly UI controls)
        // *** If you're not a skilled, dont modify this function manually ***
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.MessageService")
                .setHost(host,"xui_msgs1")
                .onMessageReceived("_xui_msgs1_onmessagereceived")
            );
            
            append(
                xui.create("xui.UI.TreeGrid")
                .setHost(host,"grid")
                .setShowDirtyMark(false)
                .setSelMode("multibycheckbox")
                .setRowHandlerWidth("2.3333333333333335em")
                .setColHidable(true)
                .setColMovable(true)
                .setTreeMode(false)
                .setValue("")
                .afterUIValueSet("_grid_afteruivalueset")
                .afterRowActive("_grid_afterrowactive")
                .onClickRow("_grid_onclickrow")
                .onDblclickRow("_grid_ondblclickrow")
            );
            
            append(
                xui.create("xui.UI.ToolBar")
                .setHost(host,"toolbar")
                .setItems([
                    {
                        "id":"grp1",
                        "sub":[
                            {
                                "id":"new",
                                "caption":"New",
                                "image":"",
                                "imageClass":"xui-uicmd-add"
                            },
                            {
                                "id":"open",
                                "caption":"Open",
                                "image":"",
                                "imageClass":"xui-uicmd-popbox",
                                "disabled":true
                            },
                            {
                                "id":"delete",
                                "caption":"Delete",
                                "image":"",
                                "imageClass":"xui-uicmd-close",
                                "disabled":true
                            }
                        ],
                        "caption":"grp1"
                    }
                ])
                .onClick("_toolbar_onclick")
            );
            
            append(
                xui.create("xui.UI.PageBar")
                .setHost(host,"pagebar")
                .setTop("0.4166666666666667em")
                .setRight("3em")
                .setCaption("")
                .onPageSet("_pagebar_onpageset")
            );
            
            
            append(
                xui.create("xui.UI.Icon")
                .setHost(host,"ctl_sbutton1")
                .setTips("Refresh")
                .setTop("0.5833333333333334em")
                .setWidth("1.6666666666666667em")
                .setRight("0.8333333333333334em")
                .setZIndex(1002)
                .setImageClass("xuicon xui-refresh")
                .onClick("_ctl_sbutton1_onclick")
                .setCustomStyle({
                    "KEY":{
                        "cursor":"pointer"
                    }
                })
            );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },
        loadGridData:function(page, size){
            var ns=this, 
                grid=ns.grid;
            xui.Dom.busy("Getting Data ...");
            ns.fireEvent("onListRecords", [
                page, 
                size, 
                function(data){
                    if(data.totalCount){
                        ns.pagebar.setTotalCount(data.totalCount);
                    }
                    var rows=data.rows;

                    // maybe need to collect rowsMap
                    if(data.rows && data.columns){
                        rows=[];
                        var cols=data.columns;
                        xui.arr.each(data.rows,function(cells){
                            var row={};
                            for(var i=0,l=cols.length;i<l;i++){
                                row[cols[i]] = cells[i]||"";
                            }
                            rows.push(row);
                        });
                    }
                    grid.removeAllRows().setRows(rows);
                    xui.Dom.free();
                }
            ]);
        },
        _grid_onclickrowonClickRow:function(profile, row, e, src){
        },
        _grid_ondblclickrow:function (profile, row, e, src){
            var ns = this, 
                grid=profile.boxing(),
                rowId=row.id;

            ns._openForm(rowId, grid.getRowMap(rowId));
        },
        // output
        addRow:function(recordId, fields){
            ns=this;
            //console.log(recordId, fields);
            ns.grid.insertRows(fields,null,null,true);
        },
        updateRow:function(recordId, fields){
            ns=this;
            //console.log(recordId, fields);
            xui.each(fields,function(v, k){
                ns.grid.updateCellByRowCol(recordId, k, v, false, false);
            });
        },
        deleteRows:function(ids){
            ns=this;
            ns.grid.removeRows(ids);
            ns.toolbar.updateItem("delete",{disabled:true});
            ns.toolbar.updateItem("open",{disabled:true});
            xui.message("You deleted "+ids.length+" record(s)!");
            xui.Dom.free();
        },
        _openForm:function(recordId, fields){
            var ns = this;
            var prop={};
            if(xui.isSet(recordId)){
                ns.fireEvent("onOpenRecord",[recordId,fields,ns.updateRow]);
            }else{
                ns.fireEvent("onCreateRecords",[ns.addRow, ns.updateRow]);
            }
        },
        _delRecords:function(ids){
            var ns=this, grid=ns.grid;
            xui.Dom.busy("Deleting Data ...");
            ns.fireEvent("onDeleteRecords", [ ids, function(){
                ns.deleteRows(ids);
            }]);
        },
        _toolbar_onclick:function (profile, item, group, e, src){
            var ns = this,row;
            switch(item.id){
                case "new": 
                    ns._openForm();
                    break;
                case "open": 
                    if((row=ns.grid.getActiveRow())){
                        ns._openForm(row.id, ns.grid.getRowMap(row.id));
                    }
                    break;
                case "delete": 
                    var ids=ns.grid.getUIValue(true);
                    if(ids&&ids.length){
                        xui.confirm("Confirm", "Are you sure you want to delete these "+ids.length+" records?", function(){
                            ns._delRecords(ids);
                        });
                    }else{
                        xui.message("You have to select some rows first!");
                    }
                    break;
                          }
        },
        _grid_afterrowactive:function (profile, row){
            this.toolbar.updateItem("open",{disabled:!row});
        },
        _grid_afteruivalueset:function (profile, oldValue, newValue){
            this.toolbar.updateItem("delete",{disabled:!newValue});
        },
        _ctl_sbutton1_onclick:function (){
            var ns=this, pb = this.pagebar;
            this.loadGridData(pb.getPage(), pb.getPageCount());
        },
        _pagebar_onpageset:function (profile, page, start, size, eventType, opage, ostart){
            this.loadGridData(page,size); 
        },
        _xui_msgs1_onmessagereceived:function (profile, msg1, msg2, msg3){
            var ns = this, uictrl = profile.boxing();
            ns.fireEvent("onMessageServiceReceived", [msg1, msg2, msg3]);
        }
    },
    Static:{
        // export functions
        $Functions:{
            addRow:function(recordId/*String, the record id*/, fields/*Hash, record fields map*/){},
            updateRow:function(recordId/*String, the record id*/, fields/*Hash, record fields map*/){},
            deleteRows:function(ids/*Array, target record ids*/){}
        },
        // export prop
        $DataModel:{
            type:"list", // selection
            inMsgType:"",
            outMsgType:""
        },
        // export events
        $EventHandlers:{
            onListRecords:function(page/*Number, page number*/, 
                                    size/*Number, record number in the page*/, 
                                    callback/*
                                             * Function, 
                                             * function(data){data={columns:[], rows:[[]],fields:[{}],page, size, total:0}, 
                                             * callback to show rows
                                             */
                                   ){},
            onDeleteRecords:function(ids/*Array, target record ids*/, 
                                    deleteCallback/*Function, function(ids){},callback to delete rows*/){},
            onOpenRecord:function(id/*String, the record id*/, 
                                   fields/*Hash, record fields*/, 
                                   updateCallback/*Function, function(id, fields){}, callback to update row*/){},
            onCreateRecords:function(
                                   createCallback/*Function, function(id, fields){}, callback to add new row*/,
                                   updateCallback/*Function, function(id, fields){}, callback to update row*/
                               ){},
            onSelectRecord:function(id/*String, target record id*/){},
            onMessageServiceReceived:function(
                                   msg1/*String, message 1*/,
                                   msg2/*String, message 2*/,
                                   msg3/*String, message 3*/
                               ){}
        }
    }    
});