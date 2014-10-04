
Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Gallery)
                .setHost(host,"gallery1")
                .setItems([{"id":"a6", "image":"img/a.gif", "caption":"item6a", "tips":"item6 a"}, {"id":"b6", "caption":"itemb6", "image":"img/b.gif", "tips":"item6 b"}, {"id":"c6", "image":"img/c.gif", "caption":"itemc6", "tips":"item6 c"}])
                .setLeft(350)
                .setTop(50)
                .setWidth(160)
                .setHeight(100)
                .setDropKeys("abc")
                .setDragKey("abc")
                .setItemWidth("42")
                .setItemHeight("42")
                .setCustomStyle({"ITEMS":"border:solid 1px #ccc;"})
            );
            
            append(
                (new xui.UI.List)
                .setHost(host,"list3")
                .setItems([{"id":"1a", "caption":"item1a", "image":"img/a.gif", "tips":"item1 a"}, {"id":"1b", "caption":"item1b", "image":"img/a.gif", "tips":"item1 b"}, {"id":"1c", "image":"img/a.gif", "caption":"item1c", "tips":"item1 c"}])
                .setLeft(40)
                .setTop(50)
                .setWidth(110)
                .setHeight(100)
                .setDropKeys("abc")
                .setDragKey("abc")
            );
            
            append(
                (new xui.UI.Block)
                .setHost(host,"block3")
                .setLeft(30)
                .setTop(300)
                .setWidth(220)
                .setBorder(true)
            );
            
            host.block3.append(
                (new xui.UI.TreeBar)
                .setHost(host,"treebar3")
                .setItems([{"id":"a3", "image":"img/a.gif", "caption":"item3a", "tips":"item a", "sub":[{"id":"a3a", "image":"img/b.gif", "caption":"suba"}, {"id":"a3b", "image":"img/b.gif", "caption":"subb"}]}, {"id":"b3", "caption":"item3b", "image":"img/a.gif", "tips":"item3 b"}, {"id":"c3", "image":"img/a.gif", "caption":"itemc3", "tips":"item3 c"}])
                .setDropKeys("abc")
                .setDragKey("abc")
            );
            
            append(
                (new xui.UI.IconList)
                .setHost(host,"list4")
                .setItems([{"id":"2a", "image":"img/a.gif", "caption":"item2a", "tips":"item2 a"}, {"id":"2b", "caption":"item2b", "image":"img/b.gif", "tips":"item2 b"}, {"id":"2c", "image":"img/c.gif", "caption":"item2c", "tips":"item2 c"}])
                .setLeft(200)
                .setTop(50)
                .setWidth(110)
                .setHeight(90)
                .setDropKeys("abc")
                .setDragKey("abc")
                .setCustomStyle({"ITEMS":"border:solid 1px #ccc;"})
            );
            
            append(
                (new xui.UI.RadioBox)
                .setHost(host,"radiobox1")
                .setItems([{"id":"a4", "image":"img/a.gif", "caption":"item4a", "tips":"item4 a"}, {"id":"b4", "caption":"item4b", "image":"img/b.gif", "tips":"item4 b"}, {"id":"c4", "image":"img/c.gif", "caption":"item4c", "tips":"item4 c"}])
                .setLeft(40)
                .setTop(170)
                .setWidth(210)
                .setHeight(100)
                .setDropKeys("abc")
                .setDragKey("abc")
                .setCustomStyle({"ITEMS":"border:solid 1px #ccc;"})
            );
            
            append(
                (new xui.UI.Block)
                .setHost(host,"ctl_block4")
                .setLeft(300)
                .setTop(170)
                .setWidth(220)
                .setHeight(240)
                .setBorder(true)
            );
            
            host.ctl_block4.append(
                (new xui.UI.TreeView)
                .setHost(host,"ctl_treebar5")
                .setItems([{"id":"a3", "caption":"item3a", "tips":"item a", "sub":[{"id":"a3a", "caption":"suba"}, {"id":"a3b", "image":"img/b.gif", "caption":"subb"}]}, {"id":"b3", "caption":"item3b", "image":"img/a.gif", "tips":"item3 b"}, {"id":"c3", "caption":"itemc3", "tips":"item3 c"}])
                .setDropKeys("abc")
                .setDragKey("abc")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});