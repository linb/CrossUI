Class('App', 'xui.Com',{ 
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.SButton)
                .setHost(host,"sbutton1")
                .setLeft(280)
                .setTop(430)
                .setWidth(160)
                .setCaption("Make Grid Editable")
                .onClick("_sbutton1_onclick")
            );
            
            append(
                (new xui.UI.Div)
                .setHost(host,"div8")
                .setLeft(160)
                .setTop(460)
                .setWidth(450)
                .setHeight(180)
                .setHtml("<b>Try keyboard</b>: <br /><b>up</b> : to upper cell;<br /><b>down</b> : to below cell; <br /><b>(alt+)left</b>: to left cell; <br /><b>(alt+)right</b> : to right cell;<br /><b>tab</b> : direct to the last cell; <br /><b>enter</b> : equal to down(in edit mode); <br /><b>alt+enter</b> : input 'enter' in textarea(in edit mode); <br /><b>ctrl+enter</b>: show pop wnd(in edit mode); ")
            );
            
            append(
                (new xui.UI.Panel)
                .setHost(host,"ctl_panel9")
                .setDock("none")
                .setLeft(50)
                .setTop(20)
                .setWidth(670)
                .setHeight(400)
                .setZIndex(1)
                .setCaption("JSON & XML")
            );
            
            host.ctl_panel9.append(
                (new xui.UI.Pane)
                .setHost(host,"ctl_pane7")
                .setDock("fill")
            );
            
            host.ctl_pane7.append(
                (new xui.UI.ButtonViews)
                .setHost(host,"ctl_buttonviews1")
                .setItems([{"id":"json", "caption":"Build Grid from JSON"}, {"id":"xml", "caption":"Build Grid from XML"}])
                .setBarSize(28)
                .setValue("json")
                .onIniPanelView("_ctl_buttonviews1_oninipanelview")
            );
            
            host.ctl_buttonviews1.append(
                (new xui.UI.TreeGrid)
                .setHost(host,"treegrid2")
                .setRowHandler(false)
                .setColHidable(true)
                .setColMovable(true)
                .setHeader({})
                .setRows({})
            , 'xml');
            
            host.ctl_buttonviews1.append(
                (new xui.UI.TreeGrid)
                .setHost(host,"treegrid1")
                .setRowHandler(false)
                .setColHidable(true)
                .setColMovable(true)
            , 'json');
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _sbutton1_onclick:function (profile, e, src, value) {
            this.treegrid1.setEditable(true);
            this.treegrid2.setEditable(true);
         },
        _ctl_buttonviews1_oninipanelview : function (profile, item) {
            var ns=this;
            if(item.id=='json'){
                xui.Ajax("json/data.js","",function(rsp){
                    var data =rsp;
                    if(!data)alert("no data");
                    else{
                        if(data.header)
                            ns.treegrid1.setHeader(data.header);
                        if(data.rows)
                            ns.treegrid1.setRows(data.rows);
                    }
                }).start();
            }else{
                xui.Ajax("xml/data.xml","",function(rsp){
                    if(!rsp)return;
                    var data = xui.XML.xml2json(rsp);
                    if(!data)alert("no data");
                    else{
                        if(data.data.header)
                            ns.treegrid2.setHeader(data.data.header);
                        if(data.data.rows)
                            ns.treegrid2.setRows(data.data.rows);             
                    }
                },null,null,{rspType:'xml'}).start();
            }
        }
    }
});