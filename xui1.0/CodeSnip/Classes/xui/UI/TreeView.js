// The default code is a com class (inherited from xui.Com)
Class('App.xui_UI_TreeView', 'xui.Com',{
    // Ensure that all the value of "key/value pair" does not refer to external variables
    Instance:{
        // To initialize instance(e.g. properties)
        initialize : function(){
            this.autoDestroy = true;
        },
        // To initialize internal components (mostly UI controls)
        // *** If you're not a skilled, dont modify this function manually ***
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Panel)
                .setHost(host,"ctl_panel3")
                .setDock("none")
                .setLeft(20)
                .setTop(40)
                .setWidth(260)
                .setHeight(260)
                .setZIndex(1)
                .setCaption("TreeView Demo")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.TreeView)
                .setHost(host,"ctl_treeview1")
                .setItems([{"id":"folder1", "caption":"folder1", "image":"img/App.gif", "imagePos":"-32px -32px", "sub":true}, {"id":"folder2", "caption":"folder2", "sub":true}, {"id":"file1", "caption":"file1"}])
                .setDropKeys("hihi")
                .setDragKey("hihi")
                .onGetContent("_ctl_treeview1_ongetcontent")
                .onItemSelected("_ctl_treeview1_onitemselected")
                .afterFold("_ctl_treeview1_afterfold")
                .afterExpend("_ctl_treeview1_afterexpend")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        // Give a chance to load other com
        iniExComs : function(com, threadid){
        },
        // Give a chance to determine which UI controls will be appended to parent container
        customAppend : function(parent, subId, left, top){
            // "return false" will cause all the internal UI controls will be added to the parent panel
            return false;
        },
        // This instance's events
        events : {},
        _ctl_treeview1_ongetcontent : function (profile, item, callback) {
            var ns = this,
                uictrl = profile.boxing();
            var id=item.id,tid="temp"+_();
           
            // to simulate asyn ajax loading
            _.asyRun(function(){
                // remove first
                uictrl.removeItems([tid]);
                var items=[];
                // two files
                items.push({id:'file_'+_.id(), caption:'file_'+_.id(),image:"img/App.gif", imagePos:"-80px -48px"});
                items.push({id:'file_'+_.id(), caption:'file_'+_.id(),image:"img/App.gif", imagePos:"-16px -48px"});
                // a folder
                items.push({id:id+'_1', caption:id+'_1', sub:true});
                items.push({id:id+'_2', caption:id+'_2', sub:true, image:"img/App.gif", imagePos:"-32px -48px"});
                items.push({id:id+'_3', caption:id+'_3', sub:true});
                // add new sub items
                uictrl.insertItems(items, id);
            },300);

            // for showing loading icon
            return [{id:tid, caption:"Loading...", image:xui.ini.img_busy}];
        },
        _ctl_treeview1_onitemselected : function (profile, item, src) {
           xui.message(item.id + " was selected!");
        },
        _ctl_treeview1_afterfold : function (profile, item) {
            xui.message(item.id + " is fold!");
        },
        _ctl_treeview1_afterexpend : function (profile, item) {
             xui.message(item.id + " is expand!");
        }
    }
});