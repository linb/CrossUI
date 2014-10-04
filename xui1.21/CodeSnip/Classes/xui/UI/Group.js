Class('App.xui_UI_Group', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Group)
                .setHost(host,"group2")
                .setTips("this is group2")
                .setLeft(40)
                .setTop(20)
                .setWidth(200)
                .setHeight(150)
                .setCaption("group2")
                .setImage("img/demo.gif")
            );
            
            host.group2.append(
                (new xui.UI.Input)
                .setHost(host,"input2")
                .setLeft(24)
                .setTop(64)
            );
            
            host.group2.append(
                (new xui.UI.Button)
                .setHost(host,"button1")
                .setLeft(24)
                .setTop(24)
                .setCaption("button1")
            );
            
            append(
                (new xui.UI.Group)
                .setHost(host,"group3")
                .setLeft(270)
                .setTop(20)
                .setWidth(370)
                .setHeight(150)
                .setCaption("group3")
                .setToggleBtn(false)
            );
            
            host.group3.append(
                (new xui.UI.Group)
                .setHost(host,"group5")
                .setLeft(170)
                .setTop(10)
                .setWidth(120)
                .setHeight(108)
                .setCaption("group5")
            );
            
            host.group3.append(
                (new xui.UI.Group)
                .setHost(host,"group4")
                .setLeft(30)
                .setTop(10)
                .setWidth(110)
                .setHeight(108)
                .setCaption("group4")
                .setToggleBtn(false)
            );
            
            append(
                (new xui.UI.Pane)
                .setHost(host,"panel3")
                .setLeft(40)
                .setTop(200)
                .setWidth(200)
                .setHeight(160)
            );
            
            host.panel3.append(
                (new xui.UI.Group)
                .setHost(host,"fieldset1")
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                .setCaption("height:auto")
            );
            
            host.fieldset1.append(
                (new xui.UI.Pane)
                .setHost(host,"panel12")
                .setLeft(10)
                .setWidth(170)
                .setHeight(90)
                .setPosition("relative")
            );
            
            host.panel12.append(
                (new xui.UI.Button)
                .setHost(host,"button14")
                .setLeft(30)
                .setTop(30)
                .setCaption("button14")
            );
            
            append(
                (new xui.UI.Group)
                .setHost(host,"group9")
                .setLeft(270)
                .setTop(200)
                .setWidth(370)
                .setHeight(100)
                .setAjaxAutoLoad("files/block.html")
                .setCaption("fold")
                .setToggle(false)
            );
            
            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group13")
                .setLeft(280)
                .setTop(320)
                .setWidth(370)
                .setHeight(100)
                .setCaption("fold")
                .setToggle(false)
                .setIframeAutoLoad("http://www.crossui.com")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});