xui.Class('App.tech_form_f1', 'xui.Module',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new xui.UI.Group)
                .setHost(host,"group1")
                .setLeft(60)
                .setTop(40)
                .setWidth(500)
                .setCaption("mask input")
            );

            host.group1.append((new xui.UI.Div)
                .setHost(host,"div14")
                .setLeft(233)
                .setTop(19)
                .setWidth(90)
                .setHeight(20)
                .setHtml("(111) 111-1111")
            );

            host.group1.append((new xui.UI.Div)
                .setHost(host,"div13")
                .setLeft(20)
                .setTop(19)
                .setWidth(80)
                .setHeight(20)
                .setHtml("11/11/1111")
            );

            host.group1.append((new xui.UI.Div)
                .setHost(host,"div15")
                .setLeft(20)
                .setTop(50)
                .setWidth(80)
                .setHeight(20)
                .setHtml("~1.11")
            );

            host.group1.append((new xui.UI.Div)
                .setHost(host,"div16")
                .setLeft(250)
                .setTop(50)
                .setWidth(80)
                .setHeight(20)
                .setHtml("(111) a-a *$*")
            );

            host.group1.append((new xui.UI.Input)
                .setHost(host,"iMask")
                .setLeft(100)
                .setTop(19)
                .setMask("11/11/1111")
                .setTabindex("17")
            );

            host.group1.append((new xui.UI.Input)
                .setHost(host,"input18")
                .setLeft(330)
                .setTop(19)
                .setMask("(111) 111-1111")
                .setTabindex("18")
            );

            host.group1.append((new xui.UI.Input)
                .setHost(host,"input19")
                .setLeft(100)
                .setTop(50)
                .setMask("~1.11")
                .setTabindex("19")
            );

            host.group1.append((new xui.UI.Input)
                .setHost(host,"input20")
                .setLeft(330)
                .setTop(50)
                .setMask("(111) a-a *$*")
                .setTabindex("20")
            );

            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    }
});