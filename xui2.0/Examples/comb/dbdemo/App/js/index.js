
xui.Class('App', 'xui.Module',{
    Instance:{
        events:{"onReady":"_onready", "onRender":"_onrender"}, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Block)
               .setHost(host,"block3")
               .setLeft(50)
               .setTop(50)
               .setWidth(260)
               .setHeight(290)
            );
            
            host.block3.append((new xui.UI.TreeGrid)
               .setHost(host,"treegrid")
               .setRowHandler(false)
               .setHeader([{"id":"key", "caption":"key", "width":80, "type":"label"}, {"id":"value", "caption":"value", "width":160, "type":"label"}])
               .afterRowActive("_treegrid_afterrowactive")
            );
            
            append((new xui.UI.Group)
               .setHost(host,"group1")
               .setLeft(360)
               .setTop(80)
               .setWidth(270)
               .setHeight(120)
               .setCaption("update")
               .setToggleBtn(false)
           );
            
            host.group1.append((new xui.UI.Input)
               .setHost(host,"iKey")
               .setDisabled(true)
               .setLeft(70)
               .setTop(10)
               .setWidth(180)
           );
            
            host.group1.append((new xui.UI.Input)
               .setHost(host,"iValue")
               .setLeft(70)
               .setTop(40)
               .setWidth(180)
            );
            
            host.group1.append((new xui.UI.Button)
               .setHost(host,"btnU")
               .setDisabled(true)
               .setLeft(70)
               .setTop(70)
               .setWidth(180)
               .setCaption("Update")
               .onClick("_btnu_onclick")
            );
            
            host.group1.append((new xui.UI.Label)
               .setHost(host,"label23")
               .setLeft(10)
               .setTop(10)
               .setWidth(50)
               .setCaption("key")
            );
            
            host.group1.append((new xui.UI.Label)
               .setHost(host,"label24")
               .setLeft(10)
               .setTop(40)
               .setWidth(50)
               .setCaption("value")
            );
            
            append((new xui.UI.Group)
               .setHost(host,"group2")
               .setLeft(360)
               .setTop(220)
               .setWidth(270)
               .setHeight(120)
               .setCaption("create")
               .setToggleBtn(false)
            );
            
            host.group2.append((new xui.UI.Input)
               .setHost(host,"iKey2")
               .setLeft(70)
               .setTop(10)
               .setWidth(180)
            );
            
            host.group2.append((new xui.UI.Input)
               .setHost(host,"iValue2")
               .setLeft(70)
               .setTop(40)
               .setWidth(180)
            );
            
            host.group2.append((new xui.UI.Button)
               .setHost(host,"btnC")
               .setLeft(70)
               .setTop(70)
               .setWidth(180)
               .setCaption("Add a Row")
               .onClick("_btnc_onclick")
            );
            
            host.group2.append((new xui.UI.Label)
               .setHost(host,"label3")
               .setLeft(10)
               .setTop(10)
               .setWidth(50)
               .setCaption("key")
            );
            
            host.group2.append((new xui.UI.Label)
               .setHost(host,"label4")
               .setLeft(10)
               .setTop(40)
               .setWidth(50)
               .setCaption("value")
            );
            
            append((new xui.UI.Button)
               .setHost(host,"btnD")
               .setDisabled(true)
               .setLeft(360)
               .setTop(50)
               .setWidth(260)
               .setCaption("Delete")
               .onClick("_btnd_onclick")
           );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        
        
        _onready:function (com, threadid) {
            SPA=this;
        }, 
        //to show message
        popMsg:function(msg){
            xui.UI.Dialog.pop(msg);
        }, 
        //to interact with server
        request:function(hash, callback, onStart, onEnd, file){
            xui.tryF(onStart);
            xui.Thread.observableRun(function(threadid){
                var data={key:'DBProcess',paras:hash}, options;
                if(file){
                    data.file=file;
                    options={method:'post'};
                }
                xui.request('request.php', data, function(rsp){
                    var obj=rsp;
                    if(obj){
                        if(!obj.error)
                            xui.tryF(callback,[obj]);
                        else
                            SPA.popMsg(xui.serialize(obj.error));
                    }else
                        SPA.popMsg(xui.serialize(rsp));
                    xui.tryF(onEnd);
                },function(rsp){
                    SPA.popMsg(xui.serialize(rsp));
                    xui.tryF(onEnd);
                }, threadid,options)
             });
        }, 
        _onrender:function (com, threadid) {
            SPA._refreshList();
        }, 
        _treegrid_afterrowactive:function (profile, row) {
            if(!row)return;
            SPA.$row=row;
            
            SPA.iKey.resetValue(row.cells[0].value);
            SPA.iValue.resetValue(row.cells[1].value);
            
            SPA.btnD.setDisabled(false);
            SPA.btnU.setDisabled(false);
        }, 
        _btnc_onclick:function (profile, e, src, value) {
            var key=SPA.iKey2.getUIValue(),
                value=SPA.iValue2.getUIValue();
            if(!/^[\w_]+$/.test(key)){
                alert('Invalid key!');
                return;
            }
            if(!key || !value){
                alert('Specify key and value please!');
                return;
            }
            SPA.iKey2.resetValue();
            SPA.iValue2.resetValue();
            SPA.request({action:'create', key:key, value:value},
                function(rsp){
                    if(rsp.data=='ok'){
                        SPA.treegrid.insertRows([[key,value]]);
                        SPA.iKey2.updateValue();
                        SPA.iValue2.updateValue();
                    }
                }
            );
        }, 
        _btnd_onclick:function (profile, e, src, value) {
            if(!SPA.$row)return;
            var row=SPA.$row;
            
            SPA.request({action:'delete', key:row.cells[0].value},
                function(rsp){
                    if(rsp.data=='ok')
                        SPA.treegrid.removeRows([row.id]);
                },function(){},function(){
                    delete SPA.$row;
                    SPA.btnD.setDisabled(true);
                    SPA.btnU.setDisabled(true);
                }
            );
        }, 
        _btnu_onclick:function (profile, e, src, value) {
            if(!SPA.$row)return;
            var row=SPA.$row;
            var cells=row.cells;
            
            var key=cells[0].value,
                value=SPA.iValue.getUIValue();
            if(!/^[\w_]+$/.test(key)){
                alert('Invalid key!');
                return;
            }
            if(value==cells[1].value){
                alert('Modify the value first!');
                return;
            }
            SPA.request({action:'update', key:key, value:value},
                function(rsp){
                    if(rsp.data=='ok'){
                        SPA.treegrid.updateCell(cells[1],value,false);
                        SPA.iValue.updateValue()
                    }
                }
            );
        }, 
        _refreshList:function(rowId){
            SPA.treegrid.setRows([]);
            SPA.request({
                action:'getlist'
            },
                        function(obj){
                            xui.arr.each(obj.data,function(o,i){
                                obj.data[i]={cells:o,id:o[0]};
                            });
                            SPA.treegrid.setRows(obj.data);
                            if(!rowId){
                                var rows=SPA.treegrid.getRows();
                                if(rows.length)
                                    rowId=rows[0].id;
                            }
                            if(rowId)
                                SPA.treegrid.setActiveRow(rowId);
                        }
                       );
        }
    }
});