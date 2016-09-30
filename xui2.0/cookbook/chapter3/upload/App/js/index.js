Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.SLabel)
                .setHost(host,"slabel1")
                .setLeft(40)
                .setTop(44)
                .setCaption("Select your file：")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"upload")
                .setLeft(140)
                .setTop(40)
                .setWidth(140)
                .setType("file")
                .setValue("Select a file ...")
            );
            
            append((new xui.UI.SButton)
                .setHost(host,"sbutton3")
                .setLeft(290)
                .setTop(40)
                .setCaption("Upload it")
                .onClick("_sbutton3_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _sbutton3_onclick:function (profile, e, src, value) {
            var file=this.upload.getUploadObj();
            if(file){
                xui.IAjax('../request.php',{key:'upload',paras:{},file:file},function(rsp){
                    xui.alert(rsp.data.message);
                },function(errMsg){
                    xui.alert(errMsg)
                }).start();
            }
        }
    }
});