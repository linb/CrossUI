Class('App.tech_UI_ca', 'xui.Com',{
    Instance:{
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
                .setCustomStyle({"ITEMS":"border:dashed 2px #00ff00", "ITEM":"font-size:14px; border:solid 1px #ccc; margin: 4px;"})
            );

            append((new xui.UI.List)
                .setHost(host,"list5")
                .setItems([{"id":"a", "caption":"16px", "itemStyle":"font-size:14px;"}, {"id":"b", "caption":"18px", "itemStyle":"font-size:18px;"}, {"id":"d", "caption":"20px", "itemStyle":"font-size:20px;"}, {"id":"e", "caption":"22px", "itemStyle":"font-size:22px;"}])
                .setLeft(490)
                .setTop(70)
            );

            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});