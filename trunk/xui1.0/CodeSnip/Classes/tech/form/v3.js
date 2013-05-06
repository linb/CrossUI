Class('App.tech_form_v3', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new xui.UI.Div)
                .setHost(host,"div13")
                .setLeft(60)
                .setTop(70)
                .setWidth(130)
                .setHeight(20)
                .setHtml("Using ValueFormat")
            );

            append((new xui.UI.Div)
                .setHost(host,"div12")
                .setLeft(170)
                .setTop(30)
                .setWidth(420)
                .setHeight(20)
                .setHtml("Format Validator (example : only number) -- check dynamically")
            );

            append((new xui.UI.Input)
                .setHost(host,"input2")
                .setLeft(210)
                .setTop(70)
                .setWidth(260)
                .setValueFormat("^-?(\\d\\d*\\.\\d*$)|(^-?\\d\\d*$)|(^-?\\.\\d\\d*$)")
                .setTips("Input number please")
                .setTipsErr(": (")
                .setTipsOK(": )")
                .setTipsBinder("divB1")
                .setDynCheck(true)
            );

            append((new xui.UI.Div)
                .setHost(host,"divB1")
                .setLeft(490)
                .setTop(70)
                .setWidth(230)
                .setHeight(20)
                .setHtml("Using ValueFormat")
            );

            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});