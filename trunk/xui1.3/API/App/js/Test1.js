Class('App.Test1', 'xui.Com',{
    Instance:{
        showDlg:function(){
            if(this.properties.dlgCaption)
                this.dlg.setCaption(this.properties.dlgCaption);
            this.dlg.show();
        },
        events:{
            beforeCreated : function(com){
            },
            onReady : function(com){
            }
        },
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var t=this, n=[], u=xui.UI, f=function(c){n.push(c.get(0))};
            f(
            (new u.Dialog)
            .setHost(t,"dlg")
            .setCaption("From 'App.Test1; class!")
            .setTop(100)
            .setLeft(100)
            );
            return n;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});