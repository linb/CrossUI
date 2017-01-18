xui.Class('App.xui_UI_Gallery', 'xui.Module',{
    Instance:{
        //base Class for xui.Com
        base:["xui.UI"],
        //requried class for the App
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host = this,
                children = [],
                append = function(child){
                    children.push(child.get(0))
                };
            
            append((new xui.UI.Gallery)
                .setHost(host,"gallery2")
                .setLeft(434)
                .setTop(95)
                .setWidth(270)
                .setHeight(270)
                .setItems([{"id":"a","caption":"itema","image":"img/demo.gif","tips":"item a"},{"id":"b","caption":"itemb","image":"img/demo.gif","tips":"item b"},{"id":"c","caption":"itemc","image":"img/demo.gif","tips":"item c"}])
                .setItemWidth("120")
                .setItemHeight("80")
                .onItemSelected("_gallery2_onitemselected")
            );
            
            append((new xui.UI.Gallery)
                .setHost(host,"gallery4")
                .setLeft(70)
                .setTop(120)
                .setWidth(284)
                .setHeight(167)
                .setItems([{"id":"a","caption":"itema","image":"img/demo.gif","comment":"item a comment"},{"id":"b","caption":"itemb","image":"img/demo.gif","comment":"item b comment"},{"id":"c","caption":"itemc","image":"img/demo.gif","comment":"item c comment"},{"id":"d","caption":"itemd","image":"img/demo.gif","comment":"item d comment"},{"id":"e","caption":"iteme","image":"img/demo.gif","comment":"item e comment"},{"id":"f","caption":"itemf","image":"img/demo.gif","comment":"item f comment"}])
                .setItemWidth("64")
                .setItemHeight("64")
                .onItemSelected("_gallery2_onitemselected")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _gallery2_onitemselected:function (profile, item, src) {
            return false
        }
    }
});