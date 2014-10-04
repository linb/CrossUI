
Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Div)
                .setHost(host,"div19")
                .setLeft(140)
                .setTop(210)
                .setWidth(80)
                .setHeight(20)
                .setHtml("Change skin")
            );
            
            append((new xui.UI.Pane)
                .setHost(host,"panel9")
                .setDomId("panelId")
                .setLeft(100)
                .setTop(60)
                .setWidth(190)
            );
            
            host.panel9.append((new xui.UI.Button)
                .setHost(host,"button5")
                .setDomId("buttonId")
                .setLeft(40)
                .setTop(40)
                .setCaption("button5")
            );
            
            append((new xui.UI.Button)
                .setHost(host,"button11")
                .setLeft(100)
                .setTop(260)
                .setCaption("clear style")
                .onClick("_button11_onclick")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput2")
                .setLeft(240)
                .setTop(210)
                .setType('listbox')
                .setItems([{"id":"default", "caption":"default skin"}, {"id":"a", "caption":"skin a"}, {"id":"b", "caption":"skin b"}])
                .setValue("default")
                .afterUIValueSet("_comboinput2_aftervalueupdated")
            );
            
            append((new xui.UI.Button)
                .setHost(host,"button4")
                .setLeft(240)
                .setTop(260)
                .setCaption("set rules manually")
                .onClick("_button4_onclick")
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div10")
                .setDomId("unchanged")
                .setLeft(300)
                .setTop(110)
                .setWidth(60)
                .setHeight(50)
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _onready:function () {
            SPA=this;
            SPA.ChangeSkin('default');
        }, 
        ChangeSkin:function(skin){
            if(SPA.skinKey && !skin)
                xui.CSS.remove('title', SPA.skinKey);
            else
                xui.CSS.replaceLink(xui.getPath('App','css.css','css/'+skin+'/'), 'title', SPA.skinKey, SPA.skinKey = skin);
        }, 
        events:{"onReady":"_onready"}, 
        _comboinput2_aftervalueupdated:function (profile, oldValue, newValue) {
            SPA.ChangeSkin(newValue);
        }, 
        _button4_onclick:function () {
             xui.CSS.setStyleRules('.xui-div',{border:"solid 1px red"});
             xui.CSS.setStyleRules('#panelId',{border:"solid 3px red"});
        }, 
        _button11_onclick:function () {
            xui.CSS.setStyleRules('#panelId').setStyleRules('#buttonId .xui-button-caption');
        }
    }
});