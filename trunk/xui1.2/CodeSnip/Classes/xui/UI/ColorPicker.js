Class('App.xui_UI_ColorPicker', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput3")
                .setLeft(30)
                .setTop(40)
                .setWidth(170)
                .setType("color")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .afterUIValueSet("_comboinput3_aftervalueupdated")
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div10")
                .setLeft(270)
                .setTop(90)
                .setWidth(160)
                .setHeight(140)
            );
            
            append((new xui.UI.ColorPicker)
                .setHost(host,"color3")
                .setLeft(440)
                .setTop(30)
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _comboinput3_aftervalueupdated:function (profile, oldValue, newValue) {
            this.div10.getRoot().css('background', newValue);
        }
    }
});