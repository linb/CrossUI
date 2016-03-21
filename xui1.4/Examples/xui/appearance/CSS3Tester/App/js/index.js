// The default code is a com class (inherited from xui.Com)
Class('App', 'xui.Com',{
    // Ensure that all the value of "key/value pair" does not refer to external variables
    Instance:{
        // To initialize internal components (mostly UI controls)
        // *** If you're not a skilled, dont modify this function manually ***
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Tabs)
                .setHost(host,"ctl_tabs2")
                .setItems([{"id":"Support", "caption":"Support"}, {"id":"Transform", "caption":"Transform"}, {"id":"BorderRadius", "caption":"BorderRadius"}, {"id":"TextShadow", "caption":"TextShadow"}, {"id":"BoxShadow", "caption":"BoxShadow"}, {"id":"rgba", "caption":"rgba"}, {"id":"Transition", "caption":"Transition"}, {"id":"Gradients", "caption":"Gradients"}])
                .setValue("Support")
                .beforeUIValueSet("_ctl_tabs2_beforeuivalueset")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        events : {"onReady":"_com_onready"},
        _com_onready : function (com, threadid){
            var ns=this,tag=ns.ctl_tabs2;
            xui.ComFactory.getCom("App.Support",function(){
                tag.append(this, "Support");
            });
            xui.ComFactory.getCom("App.Transform",function(){
                tag.append(this, "Transform");
            });
            xui.ComFactory.getCom("App.BorderRadius",function(){
                tag.append(this, "BorderRadius");
            });
            xui.ComFactory.getCom("App.TextShadow",function(){
                tag.append(this, "TextShadow");
            });
            xui.ComFactory.getCom("App.BoxShadow",function(){
                tag.append(this, "BoxShadow");
            });
            xui.ComFactory.getCom("App.RGBA",function(){
                tag.append(this, "rgba");
            });
            xui.ComFactory.getCom("App.Transition",function(){
                tag.append(this, "Transition");
            });
            xui.ComFactory.getCom("App.Gradients",function(){
                tag.append(this, "Gradients");
            });        
        },
        _ctl_tabs2_beforeuivalueset : function (profile, oldValue, newValue){
            var ns = this, uictrl = profile.boxing();
        }
    }
});