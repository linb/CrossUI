
xui.Class('App.xui_UI_FoldingList', 'xui.Module',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.FoldingList)
                .setHost(host,"FoldingList1")
                .setItems([{"id":"a", "caption":"itema", "title":"item a", "text":"text1"}, {"id":"b", "caption":"itemb", "title":"item b", "text":"text2"}, {"id":"c", "caption":"itemc", "title":"item c", "text":"text3"}])
                .setLeft(50)
                .setTop(40)
                .setWidth(280)
                .setHeight(110)
            );
            
            append((new xui.UI.FoldingList)
                .setHost(host,"foldinglist2")
                .setItems([{"id":"a", "caption":"itema", "title":"item a", "text":"text1",optBtn:true}, {"id":"b", "caption":"itemb", "title":"item b", "text":"text2"}, {"id":"c", "caption":"itemc", "title":"item c", "text":"text3"}])
                .setLeft(390)
                .setTop(40)
                .setWidth(280)
                .setHeight(110)
                .setTagCmds([{"id":"reply", "caption":"reply"}, {"id":"remove", "caption":"remove"}])
                .setActiveLast(true)
                .onCmd("_foldinglist2_oncommand")
                .onShowOptions("_foldinglist2_onshowoptions")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _foldinglist2_onshowoptions:function (profile, item, e, src) {
            xui.message('options');
        }, 
        _foldinglist2_oncommand:function (profile, item, cmdkey, src) {
            xui.message(cmdkey+":"+item.id+" clicked!")
        }
    }
});