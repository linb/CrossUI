Class('App.xui_UI_Block', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Block)
                .setHost(host,"block3")
                .setLeft(320)
                .setTop(60)
                .setShadow(true)
                .setHtml("shadow")
                .setBorderType("none")
            );
            
            append(
                (new xui.UI.Block)
                .setHost(host,"block2")
                .setLeft(170)
                .setTop(60)
                .setHtml("border")
                .setBorderType("none")
            );
            
            append(
                (new xui.UI.Block)
                .setHost(host,"block1")
                .setLeft(50)
                .setTop(60)
            );
            
            host.block1.append(
                (new xui.UI.Button)
                .setHost(host,"button21")
                .setLeft(10)
                .setTop(30)
                .setWidth(80)
                .setCaption("button21")
            );
            
            append(
                (new xui.UI.Block)
                .setHost(host,"block4")
                .setLeft(470)
                .setTop(60)
                .setResizer(true)
                .setHtml("resizer")
            );
            
            append(
                (new xui.UI.Block)
                .setHost(host,"block6")
                .setLeft(60)
                .setTop(230)
                .setWidth(110)
                .setHtml("borderType:inset")
                .setBorderType("inset")
            );
            
            append(
                (new xui.UI.Block)
                .setHost(host,"block7")
                .setLeft(180)
                .setTop(230)
                .setWidth(110)
                .setHtml("borderType:outset")
            );
            
            append(
                (new xui.UI.Block)
                .setHost(host,"block8")
                .setLeft(300)
                .setTop(230)
                .setWidth(110)
                .setHtml("borderType:groove")
                .setBorderType("groove")
            );
            
            append(
                (new xui.UI.Block)
                .setHost(host,"block9")
                .setLeft(420)
                .setTop(230)
                .setWidth(110)
                .setHtml("borderType:ridge")
                .setBorderType("ridge")
            );
            
            append(
                (new xui.UI.Block)
                .setHost(host,"ctl_block18")
                .setLeft(650)
                .setTop(220)
                .setIframeAutoLoad("http://www.crossui.com")
                .setBorderType("inset")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});