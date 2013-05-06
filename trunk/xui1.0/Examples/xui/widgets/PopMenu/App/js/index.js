Class('App', 'xui.Com',{
    Instance:{
        initialize : function(){
            this.autoDestroy = true;
            this.properties = {};
        },
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.RadioBox)
                .setHost(host,"ctl_radiobox1")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setLeft(80)
                .setTop(90)
                .setValue("a")
                .onContextmenu("_oncontextmenu")
            );
            
            append(
                (new xui.UI.StatusButtons)
                .setHost(host,"ctl_statusbuttons1")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setLeft(90)
                .setTop(50)
                .setWidth(290)
                .setHeight(30)
                .setValue("a")
                .onContextmenu("_oncontextmenu")
            );
            
            append(
                (new xui.UI.List)
                .setHost(host,"ctl_list2")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setLeft(220)
                .setTop(90)
                .setValue("a")
                .onContextmenu("_oncontextmenu")
            );
            
            append(
                (new xui.UI.TreeView)
                .setHost(host,"ctl_treeview1")
                .setItems([{"id":"item a", "sub":["sub a1", "sub a2", "sub a3", "sub a4"], "caption":"item a"}, {"id":"item b", "sub":["sub b1", "sub b2", "sub b3", "sub b4"], "caption":"item b"}])
                .setDock("none")
                .setLeft(410)
                .setTop(50)
                .setWidth(140)
                .onContextmenu("_oncontextmenu")
            );
            
            append(
                (new xui.UI.TreeBar)
                .setHost(host,"ctl_treebar3")
                .setItems([{"id":"item a", "sub":["sub a1", "sub a2", "sub a3", "sub a4"], "caption":"item a"}, {"id":"item b", "sub":["sub b1", "sub b2", "sub b3", "sub b4"], "caption":"item b"}])
                .setDock("none")
                .setLeft(550)
                .setTop(50)
                .setWidth(140)
                .onContextmenu("_oncontextmenu")
            );
            
            append(
                (new xui.UI.TreeGrid)
                .setHost(host,"ctl_treegrid2")
                .setDock("none")
                .setLeft(90)
                .setTop(290)
                .setWidth(380)
                .setHeight(140)
                .setRowNumbered(true)
                .setColHidable(true)
                .setHeader([{"id":"col1", "width":80, "type":"label", "caption":"col1"}, {"id":"col2", "width":80, "type":"label", "caption":"col2"}, {"id":"col3", "width":80, "type":"label", "caption":"col3"}, {"id":"col4", "width":80, "type":"label", "caption":"col4"}])
                .setRows([{"cells":[{"value":"row1 col1", "id":"c_a", "oValue":"row1 col1"}, {"value":"row1 col2", "id":"c_b", "oValue":"row1 col2"}, {"value":"row1 col3", "id":"c_c", "oValue":"row1 col3"}, {"value":"row1 col4", "id":"c_d", "oValue":"row1 col4"}], "id":"a"}, {"cells":[{"value":"row2 col1", "id":"c_e", "oValue":"row2 col1"}, {"value":"row2 col2", "id":"c_f", "oValue":"row2 col2"}, {"value":"row2 col3", "id":"c_g", "oValue":"row2 col3"}, {"value":"row2 col4", "id":"c_h", "oValue":"row2 col4"}], "id":"b"}, {"cells":[{"value":"row3 col1", "id":"c_i", "oValue":"row3 col1"}, {"value":"row3 col2", "id":"c_j", "oValue":"row3 col2"}, {"value":"row3 col3", "id":"c_k", "oValue":"row3 col3"}, {"value":"row3 col4", "id":"c_l", "oValue":"row3 col4"}], "sub":[["sub1", "sub2", "sub3", "sub4"]], "id":"c"}])
                .onContextmenu("_oncontextmenu")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _oncontextmenu : function (profile, e, node, item) {
            if(!item || (item._cells && item.width))return false;

            var callback=function(prf, i){
                if(i.id=='delete'){
                    if(profile.key=='xui.UI.TreeGrid'){
                        profile.boxing().removeRows([item._row?item._row.id:item.id]);
                    }else
                        profile.boxing().removeItems([item.id]);
                }else if(i.id=='showid'){
                    xui.alert(item.id)
                }else if(i.id=='showtype'){
                    xui.alert(xui.UI.getFromDom(node).KEY)
                }else if(i.id=='showdomid'){
                    xui.alert(xui.use(node).id())
                }
            };

            if(!this._pop){
                var pop = new xui.UI.PopMenu();
                pop.setItems([{
                    id:'showid',
                    caption:"Show Item id"
                },{
                    id:'showtype',
                    caption:"Show Control's type"
                },{
                    id:'showdomid',
                    caption:"Show Dom id"
                },{type:'split'},{
                    id:'delete',
                    imageClass:"xui-uicmd-remove",
                    caption:"Delete Item"
                }]);
                this._pop=pop;
            }
            this._pop.onMenuSelected(callback);
            this._pop.pop(node);

            return false;
        }
    }
});