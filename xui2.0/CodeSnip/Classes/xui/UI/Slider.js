
xui.Class('App.xui_UI_Slider', 'xui.Module',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Slider)
                .setHost(host,"slider2")
                .setLeft(170)
                .setTop(220)
                .setWidth(360)
                .setValue("30:50")
                .afterUIValueSet("_slider2_afteruivalueset")
            );
            
            append((new xui.UI.Slider)
                .setHost(host,"slider1")
                .setLeft(170)
                .setTop(40)
                .setIsRange(false)
                .afterUIValueSet("_slider1_afteruivalueset")
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div14")
                .setLeft(570)
                .setTop(50)
                .setWidth(100)
                .setHeight(30)
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div15")
                .setLeft(570)
                .setTop(90)
                .setWidth(100)
                .setHeight(30)
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div20")
                .setLeft(570)
                .setTop(130)
                .setWidth(100)
                .setHeight(30)
            );
            
            append((new xui.UI.Slider)
                .setHost(host,"slider16")
                .setLeft(170)
                .setTop(160)
                .setWidth(230)
                .setSteps(100)
                .setIsRange(false)
                .afterUIValueSet("_slider16_afteruivalueset")
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div24")
                .setLeft(570)
                .setTop(170)
                .setWidth(100)
                .setHeight(30)
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div25")
                .setLeft(570)
                .setTop(230)
                .setWidth(100)
                .setHeight(30)
            );
            
            append((new xui.UI.Slider)
                .setHost(host,"slider17")
                .setLeft(170)
                .setTop(270)
                .setWidth(360)
                .setSteps(20)
                .setValue("10:20")
                .afterUIValueSet("_slider17_afteruivalueset")
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div26")
                .setLeft(570)
                .setTop(280)
                .setWidth(100)
                .setHeight(30)
            );
            
            append((new xui.UI.Slider)
                .setHost(host,"slider3")
                .setLeft(170)
                .setTop(80)
                .setSteps(10)
                .setIsRange(false)
                .setShowDecreaseHandle(false)
                .afterUIValueSet("_slider3_afteruivalueset")
            );
            
            append((new xui.UI.Slider)
                .setHost(host,"slider11")
                .setLeft(170)
                .setTop(120)
                .setWidth(230)
                .setSteps(7)
                .setIsRange(false)
                .setShowIncreaseHandle(false)
                .setValue("1")
                .afterUIValueSet("_slider11_afteruivalueset")
            );
            
            append((new xui.UI.Slider)
                .setHost(host,"slider8")
                .setLeft(40)
                .setTop(40)
                .setWidth(100)
                .setSteps(20)
                .setType("vertical")
                .setHeight(260)
                .setValue("10:20")
                .afterUIValueSet("_slider8_afteruivalueset")
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div17")
                .setLeft(40)
                .setTop(320)
                .setWidth(100)
                .setHeight(30)
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _slider1_afteruivalueset:function (profile, oldValue, newValue) {
            this.div14.setHtml(newValue)
        }, 
        _slider3_afteruivalueset:function (profile, oldValue, newValue) {
            this.div15.setHtml(newValue);
        }, 
        _slider11_afteruivalueset:function (profile, oldValue, newValue) {
            this.div20.setHtml(newValue)
        }, 
        _slider16_afteruivalueset:function (profile, oldValue, newValue) {
            this.div24.setHtml(newValue)
        }, 
        _slider2_afteruivalueset:function (profile, oldValue, newValue) {
            this.div25.setHtml(newValue)
        }, 
        _slider17_afteruivalueset:function (profile, oldValue, newValue) {
            this.div26.setHtml(newValue)
        }, 
        _slider8_afteruivalueset:function (profile, oldValue, newValue) {
            this.div17.setHtml(newValue)
        }
    }
});