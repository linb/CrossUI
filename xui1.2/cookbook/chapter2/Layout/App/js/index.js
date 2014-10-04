Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Block)
                .setHost(host,"block4")
                .setLeft(30)
                .setTop(10)
                .setWidth(256)
                .setHeight(206)
                .setBorder(true)
                .setResizer(true)
            );
            
            host.block4.append((new xui.UI.Layout)
                .setHost(host,"layout12")
                .setItems([{id:"b1", pos:"before", size:50, cmd:true}, {id:"a1", pos:"after", size:60, cmd:true, height:60, folded:true}])
                .setLeft(0)
                .setTop(0)
            );
            
            host.layout12.append((new xui.UI.Button)
                .setHost(host,"button3")
                .setLeft(90)
                .setTop(20)
                .setCaption("button3")
            , 'after');
            
            append((new xui.UI.Block)
                .setHost(host,"block6")
                .setLeft(320)
                .setTop(10)
                .setWidth(338)
                .setHeight(208)
                .setBorder(true)
                .setResizer(true)
            );
            
            host.block6.append((new xui.UI.Layout)
                .setHost(host,"layout13")
                .setItems([{id:"b1", pos:"before",size:50,cmd:true}, {id:"a1", pos:"after", size:120, cmd:true}])
                .setType("horizontal")
            );
            
            host.layout13.append((new xui.UI.Layout)
                .setHost(host,"layout8")
                .setItems([{id:"b1", pos:"before", size:60, cmd:true}, {id:"after", pos:"after", size:60,cmd:true}])
            , 'main');
            
            host.layout8.append((new xui.UI.Link)
                .setHost(host,"link1")
                .setLeft(40)
                .setTop(30)
                .setCaption("link1")
            , 'main');
            
            host.layout8.append((new xui.UI.Button)
                .setHost(host,"button25")
                .setLeft(10)
                .setTop(10)
                .setCaption("button25")
            , 'before');
            
            host.layout8.append((new xui.UI.Input)
                .setHost(host,"input1")
                .setLeft(10)
                .setTop(20)
            , 'after');
            
            host.layout13.append((new xui.UI.List)
                .setHost(host,"list3")
                .setItems(["item a","item b","item c","item d"])
                .setLeft(30)
                .setTop(50)
                .setWidth(70)
                .setHeight(90)
            , 'a1');
            
            append((new xui.UI.Block)
                .setHost(host,"Block3")
                .setLeft(34)
                .setTop(230)
                .setWidth(624)
                .setHeight(300)
                .setBorder(true)
                .setResizer(true)
            );
            
            host.Block3.append((new xui.UI.Layout)
                .setHost(host,"layout8")
                .setItems([{id:"before", pos:"before", size:50, cmd:true}, {id:"after", pos:"after", size:79}])
            );
            
            host.layout8.append((new xui.UI.Layout)
                .setHost(host,"layout9")
                .setItems([{id:"before", pos:"before", locked:true, size:50, cmd:true}, {id:"before2", pos:"before", size:50, cmd:true}, {id:"after", pos:"after", locked:false, size:63, cmd:true}])
                .setType("horizontal")
            , 'main');
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});