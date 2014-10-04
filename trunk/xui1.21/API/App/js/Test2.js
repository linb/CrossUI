Class('App.Test2', 'xui.Com',{
    Instance:{
        properties:{
            pro1:'pro1'
        },
        iniComponents:function(){
            return (new xui.UI.Dialog({
                caption:"From 'App.Test2; class!"
            })).get();
        }
    }
});