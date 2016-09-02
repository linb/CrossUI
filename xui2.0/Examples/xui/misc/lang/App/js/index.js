Class('App', 'xui.Com',{
    Instance:{
        langKey:'app', 
        _radiobox1_onitemselected:function (profile, item, src) {
            xui.setLang(item.id, function(){
                xui.message(xui.getRes('app.message'))
            });
        }, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Button)
                .setHost(host,"button5")
                .setTips("$app.tips")
                .setLeft(60)
                .setTop(20)
                .setCaption("$app.caption")
            );
            
            append((new xui.UI.RadioBox)
                .setHost(host,"radiobox1")
                .setItems([{"id":"en", "caption":"English"}, {"id":"cn", "caption":"Chniese"}])
                .setLeft(290)
                .setTop(420)
                .setHeight(60)
                .setValue("en")
                .onItemSelected("_radiobox1_onitemselected")
            );
            
            append((new xui.UI.List)
                .setHost(host,"list4")
                .setItems([{"id":"a", "caption":"$app.list.a"}, {"id":"b", "caption":"$app.list.b"}, {"id":"c", "caption":"$app.list.c"}, {"id":"e", "caption":"$app.list.d"}])
                .setLeft(60)
                .setTop(50)
                .setHeight(80)
            );
            
            append((new xui.UI.DatePicker)
                .setHost(host,"date1")
                .setLeft(500)
                .setTop(230)
            );
            
            append((new xui.UI.TimePicker)
                .setHost(host,"time1")
                .setLeft(260)
                .setTop(230)
            );
            
            append((new xui.UI.ColorPicker)
                .setHost(host,"color1")
                .setLeft(40)
                .setTop(140)
                .setValue("A0532D")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});