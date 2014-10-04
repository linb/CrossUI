 Class('App.xui_UI_Div', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Image)
                .setHost(host,"ctl_image5")
                .setClassName("xui-uicmd-max")
                .setLeft(240)
                .setTop(10)
                .setZIndex(10)
            );
            
            append(
                (new xui.UI.Span)
                .setHost(host,"ctl_span5")
                .setClassName("xui-uicmd-min")
                .setLeft(210)
                .setTop(10)
                .setWidth(16)
                .setHeight(16)
                .setZIndex(10)
            );
            
            append(
                (new xui.UI.Div)
                .setHost(host,"div1")
                .setWidth("auto")
                .setHeight(68)
                .setPosition("relative")
                .setHtml("text string")
                .setCustomStyle({"KEY":"border:solid 1px #888"})
            );
            
            append(
                (new xui.UI.Div)
                .setHost(host,"div2")
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                .setHtml("<strong>auto height</strong>")
                .onShowTips("_showtips")
                .setCustomStyle({"KEY":"background:#00ff00;border:solid 1px #888"})
            );
            
            append(
                (new xui.UI.Div)
                .setHost(host,"div3")
                .setWidth("auto")
                .setHeight(100)
                .setRenderer(function (data, uidata) {
                uidata.html = "[rederer]";
            })
                .setPosition("relative")
                .setCustomStyle({"KEY":"border:solid 1px #888"})
            );
            
            append(
                (new xui.UI.SButton)
                .setHost(host,"sbutton1")
                .setLeft(40)
                .setTop(30)
                .setCaption("Add content")
                .onClick("_sbutton1_onclick")
            );
            
            append(
                (new xui.UI.Div)
                .setHost(host,"ctl_div24")
                .setWidth("auto")
                .setHeight(100)
                .setAjaxAutoLoad("files/block.html")
                .setPosition("relative")
                .setCustomStyle({"KEY":"border:solid 1px #888"})
            );
            
            append(
                (new xui.UI.Div)
                .setHost(host,"ctl_div24")
                .setWidth("auto")
                .setHeight(100)
                .setIframeAutoLoad("http://www.crossui.com")
                .setPosition("relative")
                .setCustomStyle({"KEY":"border:solid 1px #888"})
            );

            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _showtips:function(profile, node, pos){
            xui.Tips.show(pos, 'div tips');
            return true;
        }, 
        _sbutton1_onclick:function (profile, e, src, value) {
            var html=this.div2.getHtml();
            this.div2.setHtml(html+"<p>new line</p>")
        }
    }
});