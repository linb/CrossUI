xui.Class('App.xui_UI_Label', 'xui.Module',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Group)
                .setHost(host,"group1")
                .setLeft(50)
                .setTop(20)
                .setWidth(690)
                .setHeight(100)
                .setCaption("xui.UI.SLabel (recommended)")
                .setToggleBtn(false)
            );
            
            host.group1.append((new xui.UI.SLabel)
                .setHost(host,"slabel2")
                .setLeft(280)
                .setTop(10)
                .setWidth(220)
                .setCaption("simple label 1")
            );
            
            host.group1.append((new xui.UI.SLabel)
                .setHost(host,"slabel3")
                .setLeft(280)
                .setTop(30)
                .setWidth(220)
                .setCaption("simple label 1-1")
            );
            
            host.group1.append((new xui.UI.SLabel)
                .setHost(host,"slabel4")
                .setLeft(280)
                .setTop(50)
                .setWidth(220)
                .setCaption("simple label 1-1-1")
            );
            
            host.group1.append((new xui.UI.SLabel)
                .setHost(host,"slabel5")
                .setLeft(10)
                .setTop(10)
                .setCaption("simple label 1")
            );
            
            host.group1.append((new xui.UI.SLabel)
                .setHost(host,"slabel6")
                .setLeft(10)
                .setTop(30)
                .setCaption("simple label 1-1")
            );
            
            host.group1.append((new xui.UI.SLabel)
                .setHost(host,"slabel7")
                .setLeft(10)
                .setTop(50)
                .setCaption("simple label 1-1-1")
            );
            
            append((new xui.UI.Group)
                .setHost(host,"group2")
                .setLeft(50)
                .setTop(140)
                .setWidth(690)
                .setHeight(310)
                .setCaption("xui.UI.Label")
                .setToggleBtn(false)
            );
            
            host.group2.append((new xui.UI.Label)
                .setHost(host,"label6")
                .setLeft(10)
                .setTop(202)
                .setWidth(232)
                .setHeight(42)
                .setCaption("<strong>label</strong> (left/bottom)")
                .setHAlign("left")
            );
            
            host.group2.append((new xui.UI.Label)
                .setHost(host,"label2")
                .setLeft(10)
                .setTop(50)
                .setWidth(224)
                .setHeight(32)
                .setCaption("label with border")
            );
            
            host.group2.append((new xui.UI.Label)
                .setHost(host,"label7")
                .setLeft(530)
                .setTop(50)
                .setWidth(110)
                .setHeight(117)
                .setCaption("resizable label")
                .setHAlign("center")
            );
            
            host.group2.append((new xui.UI.Label)
                .setHost(host,"label9")
                .setLeft(282)
                .setTop(50)
                .setWidth(224)
                .setHeight(32)
                .setCaption("label (exStyle:'cursor:pointer')")
                .setCustomStyle({"KEY":"cursor:pointer"})
            );
            
            host.group2.append((new xui.UI.Label)
                .setHost(host,"label10")
                .setLeft(282)
                .setTop(94)
                .setWidth(224)
                .setHeight(32)
                .setCaption("label with image")
                .setImage("img/demo.gif")
            );
            
            host.group2.append((new xui.UI.Label)
                .setHost(host,"label11")
                .setLeft(226)
                .setTop(150)
                .setWidth(280)
                .setHeight(50)
                .setZIndex("2")
                .setCaption("label (zIndex:2)")
            );
            
            host.group2.append((new xui.UI.Label)
                .setHost(host,"label1")
                .setLeft(11)
                .setTop(10)
                .setWidth(224)
                .setHeight(32)
                .setCaption("a advanced label")
            );
            
            host.group2.append((new xui.UI.Label)
                .setHost(host,"label3")
                .setLeft(10)
                .setTop(128)
                .setWidth(224)
                .setHeight(22)
                .setCaption("label with shadow text")
                .setFontSize("16px")
                .setFontWeight("bold")
            );
            
            host.group2.append((new xui.UI.Label)
                .setHost(host,"label4")
                .setLeft(10)
                .setTop(158)
                .setWidth(232)
                .setHeight(32)
                .setCaption("<strong>label</strong> (center/middle)")
                .setHAlign("center")
            );
            
            host.group2.append((new xui.UI.Label)
                .setHost(host,"label5")
                .setLeft(10)
                .setTop(94)
                .setWidth(224)
                .setHeight(32)
                .setCaption("label with border&shadow")
            );
            
            host.group2.append((new xui.UI.Label)
                .setHost(host,"label12")
                .setLeft(226)
                .setTop(232)
                .setWidth(280)
                .setHeight(42)
                .setZIndex("2")
                .setCaption("label (set background in onRender event)")
                .onRender("_label12_onrender")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _label12_onrender:function (profile) {
             profile.getSubNode('BORDER').css('background','#fff');
        }
    }
});