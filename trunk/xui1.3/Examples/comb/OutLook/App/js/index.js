
Class('App', 'xui.Com',{
        Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.PopMenu)
                .setHost(host,"popmenu5")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a", "sub":[{"id":"aa", "caption":"suba"}, {"id":"ab", "caption":"subb"}]}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setWidth(91)
                .setHeight(73)
            );
            
            append((new xui.UI.Layout)
                .setHost(host,"layout4")
                .setItems([{"id":"before", "pos":"before", "locked":false, "size":260, "min":50, "max":200, "folded":false, "cmd":true, "caption":"before"}, {"id":"main", "min":10, "caption":"main"}])
                .setType("horizontal")
            );
            
            host.layout4.append((new xui.UI.Pane)
                .setHost(host,"panel13")
                .setDock("top")
                .setHeight(30)
            , 'main');
            
            host.panel13.append((new xui.UI.Button)
                .setHost(host,"button11")
                .setLeft(480)
                .setTop(4)
                .setWidth(50)
                .setCaption("option")
                .onClick("_button11_onclick")
            );
            
            host.panel13.append((new xui.UI.Label)
                .setHost(host,"label4")
                .setLeft(10)
                .setTop(7)
                .setCaption("<b>Look for:</b>")
            );
            
            host.panel13.append((new xui.UI.Input)
                .setHost(host,"input6")
                .setLeft(340)
                .setTop(5)
            );
            
            host.panel13.append((new xui.UI.Label)
                .setHost(host,"button11")
                .setLeft(260)
                .setTop(7)
                .setWidth(70)
                .setCaption("<b>Search in:</b>")
            );
            
            host.panel13.append((new xui.UI.ComboInput)
                .setHost(host,"comboinput14")
                .setLeft(130)
                .setTop(5)
                .setItems([{"id":"a", "caption":"itema", "tips":"item a", "sub":[{"id":"aa", "caption":"suba"}, {"id":"ab", "caption":"subb"}]}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
            );
            
            host.layout4.append((new xui.UI.Panel)
                .setHost(host,"pnlNote")
                .setCaption("Note Pane")
            , 'main');
            
            host.pnlNote.append((new xui.UI.Gallery)
                .setHost(host,"gallery5")
                .setItems([{"id":"a", "caption":"Meeting..", "tips":"Meeting with Mr. Lincon", "image":"img/notice.gif"}, {"id":"b", "caption":"1:1 talk", "tips":"1:1 talk with Mr. Terry", "image":"img/notice.gif"}, {"id":"c", "caption":"Interview", "tips":"Interview with BCC", "image":"img/notice.gif"}])
                .setDock("fill")
                .setItemPadding("4")
                .setItemWidth("64")
                .setItemHeight("64")
                .setImgWidth("48")
                .setImgHeight("48")
            );
            
            host.layout4.append((new xui.UI.Panel)
                .setHost(host,"pnlEmail")
                .setCaption("Emails")
            , 'main');
            
            host.pnlEmail.append((new xui.UI.Layout)
                .setHost(host,"layout5")
                .setItems([{"id":"before", "pos":"before", "locked":false, "size":200, "min":50, "max":200, "folded":false, "cmd":true, "caption":"before"}, {"id":"main", "min":10, "caption":"main"}])
            );
            
            host.layout5.append((new xui.UI.TreeGrid)
                .setHost(host,"treegrid2")
                .setHeader([{"id":"col1", "caption":"From", "type":"input", "width":80}, {"id":"col2", "caption":"Subject", "type":"input", "width":340}, {"id":"col3", "caption":"Received", "type":"input", "width":80}, {"id":"col4", "caption":"size", "type":"input", "width":80}])
                .afterRowActive("_treegrid2_afterrowactive")
                .setRowNumbered(true)
            , 'before');
            
            host.layout5.append((new xui.UI.Block)
                .setHost(host,"block2")
                .setDock("fill")
                .setBorderType("inset")
            , 'main');
            
            host.layout4.append((new xui.UI.ButtonViews)
                .setHost(host,"buttonviews4")
                .setItems([{"id":"email", "image":"img/allinone.gif", "imagePos":"-80px top", "tips":"Email", "caption":"email"}, {"id":"note", "image":"img/allinone.gif", "imagePos":"-96px top", "tips":"Note", "caption":"note"}, {"id":"contact", "image":"img/allinone.gif", "imagePos":"-48px top", "tips":"Contact", "caption":"contact"}])
                .setBarHAlign("right")
                .setBarSize("28")
                .onItemSelected("_buttonviews4_onitemselected")
            , 'before');
            
            host.buttonviews4.append((new xui.UI.Panel)
                .setHost(host,"panelbar4")
                .setZIndex(1)
                .setCaption("Email")
            , 'email');
            
            host.panelbar4.append((new xui.UI.TreeBar)
                .setHost(host,"treebar5")
                .setItems([{"id":"a", "caption":"Personal Folder", "image":"img/allinone.gif", "imagePos":"-128px top", "tips":"Personal Only", "sub":[{"id":"aa", "caption":"Inbox", "image":"img/allinone.gif", "imagePos":"-16px top"}, {"id":"ab", "caption":"Sent Items", "image":"img/allinone.gif", "imagePos":"-208px top"}, {"id":"ac", "caption":"Deleted Items", "image":"img/allinone.gif", "imagePos":"-240px top"}]}, {"id":"b", "caption":"<font color=red><b>Inbox(6)</b></font>", "tips":"incoming messages go here", "image":"img/allinone.gif", "imagePos":"-16px top"}, {"id":"c", "caption":"Outbox", "tips":"Sent items go here", "image":"img/allinone.gif", "imagePos":"-112px top"}])
                .setValue("")
                .onItemSelected("_treebar5_onitemselected")
            );
            
            host.buttonviews4.append((new xui.UI.Panel)
                .setHost(host,"panelbar12")
                .setZIndex(1)
                .setCaption("Note")
            , 'note');
            
            host.panelbar12.append((new xui.UI.Group)
                .setHost(host,"group1")
                .setDock("top")
                .setHeight(170)
                .setCaption("Current View")
            );
            
            host.group1.append((new xui.UI.RadioBox)
                .setHost(host,"radiobox2")
                .setItems([{"id":"a", "caption":"Show note images", "tips":"Show note images"}, {"id":"b", "caption":"Notes List", "tips":"Show notes within a list"}, {"id":"c", "caption":"Other", "tips":"Other"}])
                .setDock("fill")
            );
            
            host.layout4.append((new xui.UI.Panel)
                .setHost(host,"pnlContact")
                .setCaption("Bussiness & Contact ")
            , 'main');
            
            host.pnlContact.append((new xui.UI.Group)
                .setHost(host,"group3")
                .setLeft(20)
                .setTop(30)
                .setWidth(560)
                .setHeight(150)
                .setCaption("All Contact")
            );
            
            host.group3.append((new xui.UI.Panel)
                .setHost(host,"panelbar16")
                .setDock("none")
                .setLeft(20)
                .setTop(10)
                .setWidth(160)
                .setHeight(90)
                .setZIndex(1)
                .setHtml("<b>Balara</b><br>01-4567-890<br>xui@crossui.com")
                .setCaption("Balara, Kenny")
                .setDragKey("contactkey")
            );
            
            host.group3.append((new xui.UI.Panel)
                .setHost(host,"panelbar17")
                .setDock("none")
                .setLeft(190)
                .setTop(10)
                .setWidth(160)
                .setHeight(90)
                .setZIndex(1)
                .setHtml("<b>Linda</b><br>01-3238-727<br>linda@abc.com")
                .setCaption("Linda, Wen")
                .setDragKey("contactkey")
            );
            
            host.group3.append((new xui.UI.Panel)
                .setHost(host,"panelbar18")
                .setDock("none")
                .setLeft(360)
                .setTop(10)
                .setWidth(160)
                .setHeight(90)
                .setZIndex(1)
                .setHtml("<b>Jim</b><br>01-6543-321<br>Jim@blabla.com")
                .setCaption("Jim, Stephen")
                .setDragKey("contactkey")
            );
            
            host.pnlContact.append((new xui.UI.Group)
                .setHost(host,"group4")
                .setLeft(20)
                .setTop(200)
                .setWidth(560)
                .setHeight(130)
                .setCaption("Drag customers to this box")
            );
            
            host.group4.append((new xui.UI.Pane)
                .setHost(host,"panel16")
                .setLeft(20)
                .setTop(10)
                .setWidth(150)
                .setHeight(80)
                .setHtml("Drag bussiness card over me")
                .setDropKeys("contactkey")
                .onDrop("_panel16_ondrop")
            );
            
            host.group4.append((new xui.UI.Pane)
                .setHost(host,"panel17")
                .setLeft(190)
                .setTop(10)
                .setWidth(150)
                .setHeight(80)
                .setHtml("Drag bussiness card over me")
                .setDropKeys("contactkey")
                .onDrop("_panel16_ondrop")
            );
            
            host.pnlContact.append((new xui.UI.Group)
                .setHost(host,"group5")
                .setLeft(20)
                .setTop(360)
                .setWidth(560)
                .setHeight(130)
                .setCaption("Drag venders here")
            );
            
            host.group5.append((new xui.UI.Pane)
                .setHost(host,"panel18")
                .setLeft(20)
                .setTop(10)
                .setWidth(150)
                .setHeight(80)
                .setHtml("Drag bussiness card over me")
                .setDropKeys("contactkey")
                .onDrop("_panel16_ondrop")
            );
            
            host.group5.append((new xui.UI.Pane)
                .setHost(host,"panel19")
                .setLeft(200)
                .setTop(10)
                .setWidth(150)
                .setHeight(80)
                .setHtml("Drag bussiness card over me")
                .setDropKeys("contactkey")
                .onDrop("_panel16_ondrop")
            );
            
            append((new xui.UI.ToolBar)
                .setHost(host,"toolbar7")
                .setItems([{"id":"toolSection1", "sub":[{"id":"toolNewMail", "caption":"New Mail", "tips":"New Mail Message", "image":"img/allinone.gif", "imagePos":"-80px top"}], "caption":"toolSection1"}, {"id":"toolSection2", "sub":[{"id":"toolPrint", "tips":"print", "image":"img/allinone.gif", "imagePos":"top left"}, {"id":"toolMove", "tips":"Move to folder", "image":"img/allinone.gif", "imagePos":"-64px top"}, {"id":"toolDelete", "tips":"Delete", "image":"img/allinone.gif", "imagePos":"-224px top"}], "caption":"toolSection2"}, {"id":"toolSection3", "sub":[{"id":"toolReply", "tips":"reply", "caption":"Reply", "image":"img/allinone.gif", "imagePos":"-160px top"}, {"id":"toolReplyAll", "tips":"Reply to all", "caption":"Reply to All", "image":"img/allinone.gif", "imagePos":"-176px top"}, {"id":"toolForward", "tips":"Forward", "caption":"Forward", "image":"img/allinone.gif", "imagePos":"-112px top"}, {"id":"toolRendReceive", "tips":"Rend / Receive", "caption":"Rend/Receive", "image":"img/allinone.gif", "imagePos":"-192px top"}], "caption":"toolSection3"}])
                .setDockOrder("3")
                .onClick("_toolbar7_onclick")
            );
            
            append((new xui.UI.MenuBar)
                .setHost(host,"menubar2")
                .setItems([{"id":"menFile", "caption":"File", "tips":"File", "sub":[{"id":"menFileNew", "caption":"New", "sub":[{"id":"menFileNewMailMessage", "caption":"Main Message", "image":"img/allinone.gif", "imagePos":"-80px top"}, {"id":"menFileNewAppointment", "caption":"Appointment", "image":"img/allinone.gif", "imagePos":"-256px top"}]}, {"id":"menFileOpen", "caption":"Open"}, {"id":"menFileOpen", "caption":"Open"}, {"id":"menFileDataFile", "caption":"Data File Management..."}, {"id":"menFileClose", "caption":"Close All Items"}, {"id":"menFileExport", "caption":"Export and import"}, {"id":"menFileWorkOffline", "caption":"Work Offline"}, {"id":"menPrint", "caption":"Print ...", "image":"img/allinone.gif", "imagePos":"top left"}, {"id":"menFileExit", "caption":"Exit"}]}, {"id":"menEdit", "caption":"Edit", "sub":[{"id":"idNotImplented", "caption":"Not Implemented"}]}, {"id":"menView", "caption":"View", "sub":[{"id":"idNotImplented", "caption":"Not Implemented"}]}])
                .setHandler(false)
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        events:{
            "onRender":"_onRender"
        }, 
        _onRender:function(page, threadid){
            SPA=page;
            //select email button
            SPA.pnlNote.hide();
            SPA.pnlContact.hide();
            SPA.buttonviews4.setValue('email',true);
            SPA.treebar5.fireItemClickEvent('b');
        }, 
        _treebar5_onitemselected:function (profile, item, src) {
            this.pnlEmail.setCaption("Emails in " + item.caption);
            if(item.id=="b"){
                //this.ajax1.request();
                xui.Ajax('Data/inbox.js','a=1&b=2',this._ajax1_onrequestok).start();
            }else{
                xui.message("You selected " + item.caption);
                this.treegrid2.setRows([]);
            }
        }, 
        _ajax1_onrequestok:function (response, rspType, threadId) {
            if(!response)return;
            var obj = response;
            SPA.treegrid2
            .removeAllRows()
            .setHeader(obj.header)
            .setRows(obj.rows);
        }, 
        _treegrid2_afterrowactive:function (profile, row) {
            if(!row)return;
            this.block2.setHtml(row.cells[1].value);
        }, 
        _buttonviews4_onitemselected:function (profile, item, src) {
            var id=item.id;
            if(id=="email"){
                this.pnlNote.hide();
                this.pnlContact.hide();
                this.pnlEmail.show();   
            }else if(id=="note"){
                this.pnlEmail.hide();   
                this.pnlContact.hide();
                this.pnlNote.show();
            }else{
                this.pnlNote.hide();
                this.pnlEmail.hide();   
                this.pnlContact.show();
            }
        }, 
        _button11_onclick:function (profile, e, value) {
            this.popmenu5.pop(profile.getRoot());
            this.popmenu5.$target = profile;
        }, 
        _panel16_ondrop:function (profile, e, node, key, data, item) {
            var target = profile.boxing(),
                source = data.profile.boxing(),
                paras = source.getPanelPara(data.domId),
                children = source.getPanelChildren(data.domId)

            source.removePanel(data.domId);
            target.addPanel(paras, children, item);

        }, 
        _toolbar7_onclick:function (profile, id, groupid, src) {
            if(id == "toolNewMail"){
                this.popmenu5.pop(profile.getRoot());
                this.popmenu5.$target = profile;
            }
        }
    }
});