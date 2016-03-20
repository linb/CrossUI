Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new xui.UI.Block)
                .setHost(host,"block6")
                .setLeft(590)
                .setTop(20)
                .setWidth(170)
                .setHeight(152)
                .setBorder(true)
                .setResizer(true)
            );

            host.block6.append((new xui.UI.ButtonViews)
                .setHost(host,"buttonviews8")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setBarLocation("left")
                .setBarVAlign("bottom")
                .setValue("a")
            );

            append((new xui.UI.Block)
                .setHost(host,"block2")
                .setLeft(210)
                .setTop(20)
                .setWidth(170)
                .setHeight(152)
                .setBorder(true)
                .setResizer(true)
            );

            host.block2.append((new xui.UI.ButtonViews)
                .setHost(host,"buttonviews4")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setBarHAlign("right")
                .setBarSize("30")
                .setValue("a")
            );

            append((new xui.UI.Block)
                .setHost(host,"block9")
                .setLeft(20)
                .setTop(190)
                .setWidth(170)
                .setHeight(152)
                .setBorder(true)
                .setResizer(true)
            );

            host.block9.append((new xui.UI.ButtonViews)
                .setHost(host,"buttonviews11")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setBarLocation("right")
                .setValue("a")
            );

            append((new xui.UI.Block)
                .setHost(host,"block10")
                .setLeft(210)
                .setTop(190)
                .setWidth(170)
                .setHeight(152)
                .setBorder(true)
                .setResizer(true)
            );

            host.block10.append((new xui.UI.ButtonViews)
                .setHost(host,"buttonviews12")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setBarLocation("right")
                .setBarVAlign("bottom")
                .setValue("a")
            );

            append((new xui.UI.Block)
                .setHost(host,"block11")
                .setLeft(400)
                .setTop(190)
                .setWidth(170)
                .setHeight(152)
                .setBorder(true)
                .setResizer(true)
            );

            host.block11.append((new xui.UI.ButtonViews)
                .setHost(host,"buttonviews13")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setBarLocation("bottom")
                .setBarSize("30")
                .setValue("a")
            );

            append((new xui.UI.Block)
                .setHost(host,"block1")
                .setLeft(20)
                .setTop(20)
                .setWidth(170)
                .setHeight(152)
                .setBorder(true)
                .setResizer(true)
            );

            host.block1.append((new xui.UI.ButtonViews)
                .setHost(host,"buttonviews3")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setBarSize("30")
                .setValue("a")
            );

            append((new xui.UI.Block)
                .setHost(host,"block5")
                .setLeft(400)
                .setTop(20)
                .setWidth(170)
                .setHeight(152)
                .setBorder(true)
                .setResizer(true)
            );

            host.block5.append((new xui.UI.ButtonViews)
                .setHost(host,"buttonviews7")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setBarLocation("left")
                .setValue("a")
            );

            append((new xui.UI.Block)
                .setHost(host,"block12")
                .setLeft(590)
                .setTop(190)
                .setWidth(170)
                .setHeight(152)
                .setBorder(true)
                .setResizer(true)
            );

            host.block12.append((new xui.UI.ButtonViews)
                .setHost(host,"buttonviews14")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setBarLocation("bottom")
                .setBarHAlign("right")
                .setBarSize("30")
                .setValue("a")
            );

            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});