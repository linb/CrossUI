
Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.PageBar)
                .setHost(host,"pagebar1")
                .setLeft(330)
                .setTop(90)
                .setValue("1:50:100")
                .onClick("_pagebar1_onclick")
            );
            
            
            append((new xui.UI.Div)
                .setHost(host,"divInfo")
                .setLeft(30)
                .setTop(40)
                .setWidth(430)
                .setHeight(30)
                .setCustomStyle({"KEY":"font-size:16px;font-weight:bold;"})
            );
            
            append((new xui.UI.TreeBar)
                .setHost(host,"treebar3")
                .setItems([{"id":"a", "caption":"itema", "href":"item a", "sub":[{"id":"aa", "caption":"suba", "href":"suba"}, {"id":"ab", "caption":"subb", "href":"subb"}]}, {"id":"b", "caption":"itemb", "href":"item b"}, {"id":"c", "caption":"itemc", "href":"item c"}])
                .setDock("none")
                .setLeft(420)
                .setTop(150)
                .setWidth(130)
                .setHeight(140)
                .onItemSelected("_treebar3_onitemselected")
            );
            
            append((new xui.UI.Link)
                .setHost(host,"link1")
                .setLeft(50)
                .setTop(90)
                .setCaption("link1")
                .setHref("#link1")
                .onClick("_link1_onclick")
            );
            
            append((new xui.UI.List)
                .setHost(host,"list2")
                .setItems([{"id":"a", "caption":"itema", "href":"item a"}, {"id":"b", "caption":"itemb", "href":"item b"}, {"id":"c", "caption":"itemc", "href":"item c"}])
                .setLeft(250)
                .setTop(140)
                .onItemSelected("_list2_onitemselected")
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div30")
                .setLeft(50)
                .setTop(320)
                .setWidth(480)
                .setHeight(12)
                .setHtml("<a href='#normal_href_element_of_HTML'>normal href element of HTML'</a><a href=www.google.cn>google</a>")
            );
            
            append((new xui.UI.Div)
                .setHost(host,"div13")
                .setLeft(30)
                .setTop(20)
                .setWidth(670)
                .setHeight(20)
                .setHtml("Press backward button on your browser after playing with the following control to see what happens")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        fakeHreflick:function(str,flag){
            xui.History.setFI(str);
        }, 
        _onready:function () {
            SPA=this;
            xui.History.setCallback(function(str){
                //set history, for back/forword button in browser
                SPA.divInfo.setHtml(str);
            })
        }, 
        _list2_onitemselected:function (profile, item, src) {
            //set history
            SPA.fakeHreflick(item.href);
            return false;
        }, 
        _treebar3_onitemselected:function (profile, item, src) {
            //set history
            SPA.fakeHreflick(item.href);
            return false;
        }, 
        _pagebar1_onclick:function (profile, page) {
            profile.boxing().setPage(page);
            SPA.fakeHreflick(page);
        }, 
        _link1_onclick:function(){
            return true;
        }, 
        events:{"onReady":"_onready"}
    }
});