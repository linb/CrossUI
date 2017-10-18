xui.Class('xui.Module.PageGrid', 'xui.Module',{
    Instance:{
        _mode:"normal",
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
        propSetAction:function(prop){
            var module=this;
            if(module._innerModulesCreated && module.xui_msgs1){
                if('inMsgType' in prop) module.xui_msgs1.setMsgType(prop.inMsgType);
            }
        },
        loadGridData:function(page, size){
            var ns=this, 
                grid=ns.grid,
                cb=function(data){
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
                };
            xui.Dom.busy("Getting Data ...");
            ns.fireEvent("onListRecords", [page, size, cb]);
            ns.xui_msgs1.broadcast(ns.properties.outMsgType, "list",  page, size, cb);
        },
        _grid_ondblclickrow:function (profile, row, e, src){
            var ns = this, 
                grid=profile.boxing(),
                rowId=row.id;
            if(ns._mode=="selection")return;
            
            ns._openForm(rowId, grid.getRowMap(rowId));
        },
        _grid_onclickrow:function (profile, row, e, src){
            var ns = this, grid = profile.boxing(), prop=ns.properties;
            if(ns._mode!="selection")return;
            var map=grid.getRowMap(row);
            ns.fireEvent("onSelectRecord", [map[prop.valueColumn] || row.id, (prop.captionExpression||"").replace(/[\w]+/g,function(a){
                return map[a]||"";
            }) , map]);
        },
        setMode:function(mode){
            var ns=this;
            if(mode=="readonly"){
                ns.grid.setSelMode("none").setRowHandler(true);
                ns.toolbar.updateItem("new",{hidden:true});
                ns.toolbar.updateItem("delete",{hidden:true});
            }else if(mode=="selection"){
                ns.grid.setSelMode("none").setRowHandler(false);
                ns.toolbar.updateItem("open",{hidden:true});
                ns.toolbar.updateItem("delete",{hidden:true});
            }else{
                ns.grid.setSelMode("multi").setRowHandler(true);             
                ns.toolbar.updateItem("new",{hidden:false});
                ns.toolbar.updateItem("open",{hidden:false});
                ns.toolbar.updateItem("delete",{hidden:false});
            }
            ns._mode = mode;
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
                ns.xui_msgs1.broadcast(ns.properties.outMsgType, "open",  recordId, fields, ns.updateRow);
            }else{
                ns.fireEvent("onCreateRecords",[ns.addRow, ns.updateRow]);
                ns.xui_msgs1.broadcast(ns.properties.outMsgType, "create",  '', ns.updateRow, ns.addRow);
            }
        },
        _delRecords:function(ids){
            var ns=this, grid=ns.grid, cb=function(){
                ns.deleteRows(ids);
            };
            xui.Dom.busy("Deleting Data ...");
            ns.fireEvent("onDeleteRecords", [ ids, cb]);
            ns.xui_msgs1.broadcast(ns.properties.outMsgType, "delete",  ids, '', cb);
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
        _xui_msgs1_onmessagereceived:function (profile, msg1, msg2, msg3, msg4, msg5, callback){
            var ns = this, uictrl = profile.boxing();
            ns.fireEvent("onMessageServiceReceived", [msg1, msg2, msg3, msg4, msg5, callback]);
        }
    },
    Static:{
        // export functions
        $Functions:{
            setMode:function(mode/*String, normal/selection/readonly */){},
            addRow:function(recordId/*String, the record id*/, fields/*Hash, record fields map*/){},
            updateRow:function(recordId/*String, the record id*/, fields/*Hash, record fields map*/){},
            deleteRows:function(ids/*Array, target record ids*/){}
        },
        // export prop
        $DataModel:{
            valueColumn:"",
            captionExpression:"",
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
            onSelectRecord:function(value/*String, value*/,caption/*String, caption */,fields/*Hash, record fields map*/){},
            onMessageServiceReceived:function(
                                   msg1/*String, message 1*/,
                                   msg2/*String, message 2*/,
                                   msg3/*String, message 3*/,
                                   msg4/*String, message 4*/,
                                   msg5/*String, message 5*/,
                                   callback/*Function, function(){}, callback function*/
                               ){}
        }
    }    
});