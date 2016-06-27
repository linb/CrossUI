Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Pane)
                .setHost(host,"panel3")
                .setLeft(30)
                .setTop(10)
                .setWidth(420)
                .setHeight(108)
                .setCustomStyle({"KEY":"border:solid 1px;"})
            );
            
            host.panel3.append((new xui.UI.Layout)
                .setHost(host,"layout4")
                .setItems([{"id":"before", "pos":"before", "locked":false, "size":129, "min":50, "max":200, "folded":false, "cmd":true}, {"id":"main", "min":10}, {"id":"after", "pos":"after", "locked":false, "size":118, "min":50, "max":200, "folded":false, "cmd":true}])
                .setLeft(0)
                .setTop(0)
                .setType("horizontal")
                .setDropKeys("panel")
                .onDrop("_block1_ondrop")
            , '');
            
            host.layout4.append((new xui.UI.Panel)
                .setHost(host,"panelbar1")
                .setTag("pb1")
                .setDragKey("panel")
                .setLeft(0)
                .setTop(0)
                .setZIndex(1)
                .setCaption("panelbar1")
            , 'main');
            
            host.panelbar1.append((new xui.UI.Button)
                .setHost(host,"button3")
                .setLeft(20)
                .setTop(40)
                .setCaption("button3")
            );
            
            host.layout4.append((new xui.UI.Panel)
                .setHost(host,"panelbar2")
                .setTag("pb2")
                .setDragKey("panel")
                .setLeft(0)
                .setTop(0)
                .setZIndex(1)
                .setCaption("panelbar2")
            , 'before');
            
            host.panelbar2.append((new xui.UI.Button)
                .setHost(host,"button4")
                .setLeft(20)
                .setTop(20)
                .setWidth(80)
                .setCaption("button4")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"block1")
                .setLeft(50)
                .setTop(300)
                .setWidth(400)
                .setHeight(130)
                .setResizer(true)
                .setDropKeys("panel")
                .onDrop("_block1_ondrop")
            );
            
            append((new xui.UI.Group)
                .setHost(host,"group1")
                .setLeft(500)
                .setTop(300)
                .setWidth(250)
                .setHeight(130)
                .setCaption("group1")
                .setDropKeys("panel")
                .onDrop("_block1_ondrop")
            );
            
            append((new xui.UI.Pane)
                .setHost(host,"panel6")
                .setLeft(490)
                .setTop(140)
                .setWidth(260)
                .setHeight(128)
                .setCustomStyle({"KEY":"border:solid 1px;"})
            );
            
            host.panel6.append((new xui.UI.Stacks)
                .setHost(host,"stacks1")
                .setItems([{"id":"ca", "caption":"itema", "tips":"item a"}, {"id":"cb", "caption":"itemb", "tips":"item b"}, {"id":"cc", "caption":"itemc", "tips":"item c", "closeBtn":"true", "popBtn":true}])
                .setDragKey("panel")
                .setLeft(0)
                .setTop(0)
                .setDropKeysPanel("panel")
                .setValue("cc")
                .onDrop("_block1_ondrop")
            , '');
            
            host.stacks1.append((new xui.UI.Button)
                .setHost(host,"button10")
                .setLeft(60)
                .setTop(50)
                .setCaption("button10")
            , 'cb');
            
            host.stacks1.append((new xui.UI.Button)
                .setHost(host,"button11")
                .setLeft(60)
                .setTop(20)
                .setCaption("button11")
            , 'cc');
            
            host.stacks1.append((new xui.UI.Button)
                .setHost(host,"button9")
                .setLeft(100)
                .setTop(10)
                .setCaption("button9")
            , 'ca');
            
            append((new xui.UI.Pane)
                .setHost(host,"panel4")
                .setLeft(490)
                .setTop(10)
                .setWidth(260)
                .setHeight(108)
            );
            
            host.panel4.append((new xui.UI.ButtonViews)
                .setHost(host,"buttonviews2")
                .setItems([{"id":"ba", "caption":"itema", "tips":"item a"}, {"id":"bb", "caption":"itemb", "tips":"item b"}, {"id":"bc", "caption":"itemc", "tips":"item c", "closeBtn":"true", "popBtn":true}])
                .setDragKey("panel")
                .setLeft(0)
                .setTop(0)
                .setDropKeysPanel("panel")
                .setBarSize("26")
                .setValue("ba")
                .onDrop("_block1_ondrop")
            , '');
            
            host.buttonviews2.append((new xui.UI.Button)
                .setHost(host,"button13")
                .setLeft(90)
                .setTop(40)
                .setCaption("button13")
            , 'bb');
            
            host.buttonviews2.append((new xui.UI.Button)
                .setHost(host,"button14")
                .setLeft(90)
                .setTop(30)
                .setCaption("button14")
            , 'bc');
            
            host.buttonviews2.append((new xui.UI.Button)
                .setHost(host,"button12")
                .setLeft(40)
                .setTop(50)
                .setCaption("button12")
            , 'ba');
            
            append((new xui.UI.Pane)
                .setHost(host,"panel5")
                .setLeft(30)
                .setTop(140)
                .setWidth(420)
                .setHeight(128)
            );
            
            host.panel5.append((new xui.UI.Tabs)
                .setHost(host,"tabs2")
                .setItems([{"id":"aa", "caption":"itema", "tips":"item a"}, {"id":"ab", "caption":"itemb", "tips":"item b", "_w":420, "_h":128}, {"id":"ac", "caption":"itemc", "tips":"item c", "closeBtn":"true", "popBtnBtn":true}])
                .setDragKey("panel")
                .setLeft(0)
                .setTop(0)
                .setDropKeysPanel("panel")
                .setValue("ab")
                .onDrop("_block1_ondrop")
            , '');
            
            host.tabs2.append((new xui.UI.Button)
                .setHost(host,"button7")
                .setLeft(90)
                .setTop(40)
                .setCaption("button7")
            , 'aa');
            
            host.tabs2.append((new xui.UI.Button)
                .setHost(host,"button8")
                .setLeft(110)
                .setTop(40)
                .setCaption("button8")
            , 'ac');
            
            host.tabs2.append((new xui.UI.Button)
                .setHost(host,"button6")
                .setLeft(80)
                .setTop(40)
                .setCaption("button6")
            , 'ab');
            
            append((new xui.UI.Dialog)
                .setHost(host,"dialog2")
                .setTag("pb3")
                .setTagVar("")
                .setDragKey("panel")
                .setLeft(260)
                .setTop(140)
                .setWidth(190)
                .setHeight(120)
                .setTabindex("100")
                .setCaption("dialog2")
                .setLandBtn(true)
            );
            
            host.dialog2.append((new xui.UI.Button)
                .setHost(host,"button5")
                .setLeft(30)
                .setTop(20)
                .setCaption("button5")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _block1_ondrop:function (profile, e, node, key, data, item) {
            var target = profile.boxing(),
                source = data.profile.boxing(),
                paras = source.getPanelPara(data.domId),
                children = source.getPanelChildren(data.domId)
            
            paras.popBtn=paras.popBtn||paras.landBtn;
            
            if(target.addPanel(paras, children, item))
                source.removePanel(data.domId);
        } 
    }
});