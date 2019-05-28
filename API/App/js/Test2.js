xui.Class('App.Test2', 'xui.Module',{
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