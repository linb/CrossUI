Class('App.Support', 'xui.Com',{
    Instance:{
        // To initialize internal components (mostly UI controls)
        // *** If you're not a skilled, dont modify this function manually ***
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group20")
                .setLeft(10)
                .setTop(10)
                .setWidth(300)
                .setHeight(550)
                .setCaption("CSS3 Compitable")
                .setToggleBtn(false)
            );
            
            host.ctl_group20.append(
                (new xui.UI.RadioBox)
                .setHost(host,"ctl_radiobox1")
                .setReadonly(true)
                .setDirtyMark(false)
                .setShowDirtyMark(false)
                .setItems([{"id":"fontFace", "caption":"$@font-face"}, {"id":"backgroundSize", "caption":"background-size"}, {"id":"borderImage", "caption":"border-image"}, {"id":"borderRadius", "caption":"border-radius"}, {"id":"boxShadow", "caption":"box-shadow"}, {"id":"flexWrap", "caption":"Flexible Box Model"}, {"id":"boxDirection", "caption":"Flexbox Legacy"}, {"id":"hsla", "caption":"Hue, Saturation, Lightness, Alpha"}, {"id":"multiplebgs", "caption":"multiple backgrounds"}, {"id":"opacity", "caption":"opacity"}, {"id":"rgba", "caption":"Red, Green, Blue, Alpha"}, {"id":"textShadow", "caption":"text-shadow"}, {"id":"animationName", "caption":"CSS Animations"}, {"id":"columnCount", "caption":"CSS Columns"}, {"id":"generatedContent", "caption":"CSS Generated Content"}, {"id":"gradient", "caption":"CSS Gradients"}, {"id":"boxReflect", "caption":"CSS Reflections"}, {"id":"transform", "caption":"CSS 2D Transforms"}, {"id":"transform3d", "caption":"CSS 3D Transforms"}, {"id":"transition", "caption":"CSS Transitions"}])
                .setLeft(10)
                .setTop(10)
                .setWidth(260)
                .setHeight(510)
                .setSelMode("multibycheckbox")
                .setCheckBox(true)
                .setValue("")
                .setCustomStyle({"ITEM":"display:block"})
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        events : {"onRender":"_com_onrender"},
        _com_onrender : function (com, threadid){
            var ns=this,
            items=ns.ctl_radiobox1.getItems("min"),
            arr=[];
            _.arr.each(items,function(o){
                if(xui.Dom.css3Support(o)){
                    arr.push(o);
                }
            });
            ns.ctl_radiobox1.setValue(arr);
        }
    }
});