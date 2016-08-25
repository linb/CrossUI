Class('App.xui_UI_Button', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Group)
                .setHost(host,"group2")
                .setLeft(30)
                .setTop(10)
                .setWidth(650)
                .setHeight(70)
                .setCaption("xui.UI.SButton (recommended)")
                .setToggleBtn(false)
            );
            
            host.group2.append((new xui.UI.SButton)
                .setHost(host,"sbutton1")
                .setLeft(20)
                .setTop(10)
                .setCaption("I'm a simple button (height is fixed )")
            );
            
            host.group2.append((new xui.UI.SButton)
                .setHost(host,"sbutton2")
                .setLeft(360)
                .setTop(10)
                .setCaption("click the simple button")
                .onClick("_sbutton2_onclick")
            );
            
            append((new xui.UI.Group)
                .setHost(host,"group3")
                .setLeft(30)
                .setTop(90)
                .setWidth(650)
                .setHeight(290)
                .setCaption("xui.UI.Button")
                .setToggleBtn(false)
            );
            
            host.group3.append((new xui.UI.Button)
                .setHost(host,"button20")
                .setDisabled(true)
                .setLeft(20)
                .setTop(10)
                .setWidth(180)
                .setCaption("a disabled button")
                .setType("status")
                .onChecked("_button28_ontoggle")
            );
            
            host.group3.append((new xui.UI.Button)
                .setHost(host,"button28")
                .setLeft(230)
                .setTop(10)
                .setWidth(270)
                .setCaption("a toggle button")
                .setType("status")
                .onChecked("_button28_ontoggle")
            );
            
            host.group3.append((new xui.UI.Button)
                .setHost(host,"button29")
                .setLeft(20)
                .setTop(40)
                .setWidth(190)
                .setHeight(30)
                .setCaption("with shadow")
            );
            
 
            host.group3.append((new xui.UI.Button)
                .setHost(host,"button12")
                .setLeft(230)
                .setTop(40)
                .setWidth(270)
                .setCaption("drop button with image")
                .setImage("img/demo.gif")
                .setType("drop")
                .onClick("_button12_onclick")
                .onClickDrop("_button12_onclickdrop")
            );
            
            host.group3.append((new xui.UI.Button)
                .setHost(host,"button13")
                .setLeft(20)
                .setTop(90)
                .setWidth(90)
                .setHeight(60)
                .setRenderer(function () {
                return "<img src=img/demo.gif /><br />renderer";
            })
                .setCaption("button13")
            );
            
            host.group3.append((new xui.UI.Button)
                .setHost(host,"button14")
                .setLeft(130)
                .setTop(90)
                .setWidth(90)
                .setHeight(60)
                .setRenderer(function anonymous() {
                return "renderer<br /><img src=img/demo.gif />";
            })
                .setCaption("button13")
            );
            
            host.group3.append((new xui.UI.Group)
                .setHost(host,"group4")
                .setLeft(30)
                .setTop(180)
                .setWidth(480)
                .setHeight(70)
                .setCaption("no border")
                .setToggleBtn(false)
            );
            
            host.group4.append((new xui.UI.Button)
                .setHost(host,"button22")
                .setLeft(20)
                .setTop(10)
                .setWidth(100)
                .setCaption("align:left")
                .setHAlign("left")
            );
            
            host.group4.append((new xui.UI.Button)
                .setHost(host,"button22")
                .setLeft(160)
                .setTop(10)
                .setWidth(100)
                .setCaption("align:right")
                .setHAlign("right")
            );
            
            host.group4.append((new xui.UI.Button)
                .setHost(host,"button30")
                .setLeft(320)
                .setTop(10)
                .setWidth(100)
                .setCaption("with image")
                .setImage("img/demo.gif")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _button25_onclick:function (profile, e, value) {
            xui.message('clicked');
        }, 
        _button24_onclick:function (profile, e, value) {
            xui.message('dbl clicked');
        }, 
        _button28_ontoggle:function (profile, e, value) {
            xui.message(value?'checked':'unchecked');
        }, 
        _button19_beforehovereffect:function (profile, item, src, type) {
            xui.message(type);
            return false;
        }, 
        _button18_beforeclickeffect:function (profile, item, src, type) {
            xui.message(type);
            return false;
        }, 
        _div9_aftercreated:function (profile) {
            profile.getRoot().css('backgroundImage','url(img/app.gif)')
        }, 
        _button12_onclick:function (profile, e, src, value) {
            xui.message('you clicked button')
        }, 
        _button12_onclickdrop:function (profile, e, src) {
            xui.message('you clicked drop button')
        }, 
        _sbutton2_onclick:function (profile, e, src, value) {
            xui.message('You cliced me')
        }
    }
});