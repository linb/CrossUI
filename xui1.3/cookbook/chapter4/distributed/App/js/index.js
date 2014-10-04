
Class('App', 'xui.Com',{
    Instance:{
        events:{"onReady":"_onready"}, 
        _onready:function () {
            SPA=this;
            //set com factory profile
            xui.ComFactory.setProfile(CONF.ComFactoryProfile);
        }, 
        _button9_onclick:function (profile, e, value) {
            var host=this;
            xui.ComFactory.getCom('module1',function(){
                var ns=this;
                host.div16.append(ns.getUIComponents(),false);
            });
        }, 
        _button10_onclick:function (profile, e, value) {
            var host=this;
            xui.ComFactory.getCom('App.Module2',function(){
                var ns=this;
                host.div17.append(ns.panelMain,false);
            });
        }, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Div)
                .setHost(host,"div21")
                .setLeft(100)
                .setTop(20)
                .setWidth(370)
                .setHeight(30)
                .setHtml("Loading code from outside dynamically!")
                .setCustomStyle({"KEY":"font-weight:bold;font-size:14px;"})
            );
            
            append((new xui.UI.Button)
                .setHost(host,"button10")
                .setLeft(470)
                .setTop(340)
                .setCaption("Load Module2")
                .onClick("_button10_onclick")
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div16")
                .setLeft(100)
                .setTop(100)
                .setWidth(268)
                .setHeight(210)
                .setCustomStyle({"KEY":"border:dashed 1px;"})
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div17")
                .setLeft(390)
                .setTop(100)
                .setWidth(268)
                .setHeight(210)
                .setCustomStyle({"KEY":"border:dashed 1px;"})
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div20")
                .setLeft(100)
                .setTop(50)
                .setWidth(380)
                .setHeight(40)
                .setHtml("Get Module code from out file on the fly, and append module UI to the current page")
            );
            
            append((new xui.UI.Button)
                .setHost(host,"button9")
                .setLeft(160)
                .setTop(340)
                .setCaption("Load module1")
                .onClick("_button9_onclick")
            );
            
            append((new xui.UI.Button)
                .setHost(host,"button3")
                .setLeft(250)
                .setTop(410)
                .setWidth(160)
                .setCaption("Load Module3 manually")
                .onClick("_button3_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _button3_onclick:function (profile, e, value) {
            var host=this;
            xui.ComFactory.newCom('App.Module3' ,function(){
                this.show(xui([document.body]));
            });
        }
    }
});