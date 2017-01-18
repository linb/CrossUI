xui.Class('App', 'xui.Module',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Panel)
                .setHost(host,"ctl_panel3")
                .setDock("none")
                .setLeft(70)
                .setTop(50)
                .setWidth(650)
                .setHeight(350)
                .setZIndex(1)
                .setCaption("Grid Editor")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.ButtonViews)
                .setHost(host,"ctl_buttonviews1")
                .setItems([{"id":"pop", "caption":"With a dialog"}, {"id":"inline", "caption":"Inline"}, {"id":"inline2", "caption":"Inline 2"}])
                .setBarSize(28)
                .setValue("inline")
                .onChange("_ctl_buttonviews1_onchange")
            );
            
            host.ctl_buttonviews1.append(
                (new xui.UI.TreeGrid)
                .setHost(host,"treegrid")
                .setCurrencyTpl("$ *")
                .setRowNumbered(true)
                .setEditable(true)
                .setHeader([{"id":"label", "type":"label", "width":80, "caption":"label"}, {"id":"input", "type":"input", "width":80, "caption":"input"}, {"id":"number", "type":"number", "width":80, "caption":"number"}, {"id":"currency", "type":"currency", "width":80, "caption":"currency"}])
                .setRows([{"cells":[{"value":"label1", "id":"c_a"}, {"value":"input1", "id":"c_b"}, {"value":100, "id":"c_c"}, {"value":100, "id":"c_d"}], "id":"a"}, {"cells":[{"value":"label2", "id":"c_e"}, {"value":"input2", "id":"c_f"}, {"value":200, "id":"c_g"}, {"value":200, "id":"c_h"}], "id":"b"}, {"cells":[{"value":"label3", "id":"c_i"}, {"value":"input3", "id":"c_j"}, {"value":300, "id":"c_k"}, {"value":300, "id":"c_l"}], "id":"c"}])
                .setRowHandlerWidth(16)
                .setTreeMode(false)
                .setHotRowMode('auto')
                .onInitHotRow("_onInitHotRow")
                .beforeHotRowAdded("_beforeHotRowAdded")
                .afterHotRowAdded("_afterHotRowAdded")
            , 'inline');
            
            
            host.ctl_buttonviews1.append(
                (new xui.UI.TreeGrid)
                .setHost(host,"treegrid2")
                .setCurrencyTpl("$ *")
                .setRowNumbered(true)
                .setEditable(true)
                .setHeader([{"id":"label", "type":"label", "width":80, "caption":"label"}, {"id":"input", "type":"input", "width":80, "caption":"input"}, {"id":"number", "type":"number", "width":80, "caption":"number"}, {"id":"currency", "type":"currency", "width":80, "caption":"currency"}])
                .setRows([{"cells":[{"value":"label1", "id":"c_a"}, {"value":"input1", "id":"c_b"}, {"value":100, "id":"c_c"}, {"value":100, "id":"c_d"}], "id":"a"}, {"cells":[{"value":"label2", "id":"c_e"}, {"value":"input2", "id":"c_f"}, {"value":200, "id":"c_g"}, {"value":200, "id":"c_h"}], "id":"b"}, {"cells":[{"value":"label3", "id":"c_i"}, {"value":"input3", "id":"c_j"}, {"value":300, "id":"c_k"}, {"value":300, "id":"c_l"}], "id":"c"}])
                .setRowHandlerWidth(16)
                .setTreeMode(false)
                .setHotRowMode('show')
                .onInitHotRow("_onInitHotRow")
                .beforeHotRowAdded("_beforeHotRowAdded2")
                .afterHotRowAdded("_afterHotRowAdded")
            , 'inline2');
                        
            
            host.ctl_buttonviews1.append(
                (new xui.UI.TreeGrid)
                .setHost(host,"tg")
                .setTabindex("4")
                .onDblclickRow("_tg_ondblclickrow")
            , 'pop');
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _changeRow:function(v1,v2,v3){
            var cells=this._activeRow.cells;
            if(cells[0]!=v1)
                this.tg.updateCell(cells[0],{value:v1});
            if(cells[1]!=v2)
                this.tg.updateCell(cells[1],{value:v2});
            if(cells[2]!=v3){
                this.tg.updateCell(cells[2],{value:v3});
            }
        }, 
        _tg_ondblclickrow:function (p,row, e, src) {
            this._activeRow = row;
            var self=this;
            xui.newModule('App.Dlg' ,function(){
                this.$parent=self;
                this
                    .setProperties({
                        fromRegion:xui.use(src).cssRegion(true),
                        col1:row.cells[0].value,
                        col2:row.cells[1].value,
                        col3:row.cells[2].value
                    })
                    .setEvents('onOK', self._changeRow);
                this.show(xui([document.body]));
            });
        }, 
        events:{
            onReady:'_onready'
        }, 
        _onready:function(){
            var self=this;
            xui.Ajax("data/data.js",'',function(s){
                var hash=s;
                self.tg.setHeader(hash.header).setRows(hash.rows);
            }).start();
        },
        _onInitHotRow:function(profile){
            return ['label','input',0,0];
        },
        // check new row
        _beforeHotRowAdded:function(profile, row, leaveGrid){
            var cells=row.cells;
            if(cells[3].value<=0){
                xui.message("Cancelled! The last row's 4th cell must be greater than 0");
                if(leaveGrid){
                    return false;
                }else{
                    return cells[3];
                }
            }
            return true;
        },
        _beforeHotRowAdded2:function(profile, row, leaveGrid){
            var cells=row.cells;
            if(cells[3].value<=0){
                xui.message("Cancelled! The last row's 4th cell must be greater than 0");
                return null;
            }
            return true;
        },
        _afterHotRowAdded:function(){
                xui.message("New row added!");
        },
        _ctl_buttonviews1_onchange : function (profile, oldValue, newValue) {
            if(newValue=='inline')
                xui.message("Using up/down keyboard to add rows");
            else
                xui.message("Double click a row to pop the dialog");
        }
    }
});