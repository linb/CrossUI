Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Block)
                .setHost(host,"Block13")
                .setDock("right")
                .setWidth(80)
                .setBorder(true)
                .setHtml("dock : right")
                .setBorderType("none")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"Block11")
                .setDock("top")
                .setDockOrder("2")
                .setDockMargin({"left":20, "right":20, "top":20, "bottom":0})
                .setBorder(true)
                .setHtml("dock : top ; dockOder : 2 ; dockMargin : {left:20,top:20,bottom:0,right:20}")
                .setBorderType("none")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"Block14")
                .setDock("bottom")
                .setHeight(60)
                .setBorder(true)
                .setHtml("dock : bottom")
                .setBorderType("none")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"Block15")
                .setDock("middle")
                .setLeft(110)
                .setTop(249)
                .setWidth(130)
                .setHeight(78)
                .setBorder(true)
                .setHtml("dock : middle")
                .setBorderType("none")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"Block18")
                .setDock("origin")
                .setLeft(230)
                .setTop(282)
                .setWidth(210)
                .setHeight(88)
                .setBorder(true)
                .setHtml("dock : origin(both center and middle)")
                .setBorderType("none")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"Block20")
                .setDock("center")
                .setLeft(350)
                .setTop(150)
                .setWidth(140)
                .setHeight(60)
                .setZIndex("20")
                .setBorder(true)
                .setHtml("dock : center")
                .setBorderType("none")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"Block22")
                .setLeft(110)
                .setTop(420)
                .setWidth(180)
                .setHeight(70)
                .setBorder(true)
                .setHtml("dock : none")
                .setBorderType("none")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"Block29")
                .setLeft(100)
                .setTop(120)
                .setWidth(190)
                .setHeight(30)
                .setBorder(true)
                .setBorderType("none")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"Block10")
                .setDock("top")
                .setHeight(30)
                .setBorder(true)
                .setHtml("dock : top")
                .setBorderType("none")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"Block30")
                .setDock("width")
                .setTop(180)
                .setHeight(80)
                .setBorder(true)
                .setHtml("dock : width")
                .setBorderType("none")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"Block3")
                .setDock("height")
                .setDockMinH("500")
                .setLeft(530)
                .setWidth(180)
                .setZIndex("30")
                .setBorder(true)
                .setHtml("dock : height ; dockMinH : 500")
                .setBorderType("none")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"Block12")
                .setDock("left")
                .setWidth(70)
                .setBorder(true)
                .setHtml("dock : left")
                .setBorderType("none")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});