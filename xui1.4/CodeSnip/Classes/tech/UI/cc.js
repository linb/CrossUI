Class('App.tech_UI_cc', 'xui.Com',{
    Instance:{
        events:{"onReady":"_onready"},
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new xui.UI.List)
                .setHost(host,"list3")
                .setItems([{"id":"a", "caption":"itema"}, {"id":"b", "caption":"itemb"}])
                .setLeft(170)
                .setTop(70)
            );

            append((new xui.UI.List)
                .setHost(host,"list4")
                .setItems([{"id":"a", "caption":"itema"}, {"id":"b", "caption":"itemb"}])
                .setLeft(330)
                .setTop(70)
                .setCustomClass({"ITEMS":"css-class-a", "ITEM":"css-class-b"})
            );

            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _onready:function () {
            xui.CSS.addStyleSheet(".css-class-a{border:dashed 2px #00ff00} .css-class-b{font-size:14px; border:solid 1px #ccc; margin: 4px;}", '__class_added')
        }
    }
});