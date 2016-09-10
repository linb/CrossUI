Class('App', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group1")
                .setLeft(40)
                .setTop(110)
                .setWidth(430)
                .setHeight(96)
                .setCaption("Example Request Object")
                .setToggleBtn(false)
            );
            
            host.ctl_group1.append(
                (new xui.UI.Input)
                .setHost(host,"ctl_request")
                .setDirtyMark(false)
                .setLeft(10)
                .setTop(0)
                .setWidth(400)
                .setHeight(70)
                .setLabelCaption("")
                .setMultiLines(true)
                .setValue('{\n\t"methodName" : "getUserInfo",\n\t"params" : {\n\t\t"bgin" : "3", \n\t\t"limit" : "323", \n\t\t"a" : 1, \n\t\t"b" : new Date(2011,4,9,12,31,55,434), \n\t\t"c" : 2.33, \n\t\t"d" : [1,[1,2],{ "da" : 1 }], \n\t\t"e" : { "e1" : 1, "d3" : "s" } \n\t} \n}')
            );
            
            append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_do")
                .setLeft(90)
                .setTop(220)
                .setWidth(340)
                .setCaption("Invoke")
                .onClick("_ctl_do_onclick")
            );
            
            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group2")
                .setLeft(40)
                .setTop(250)
                .setWidth(430)
                .setHeight(240)
                .setCaption("Response Object")
                .setToggleBtn(false)
            );
            
            host.ctl_group2.append(
                (new xui.UI.Input)
                .setHost(host,"ctl_response")
                .setDirtyMark(false)
                .setLeft(10)
                .setTop(0)
                .setWidth(410)
                .setHeight(210)
                .setLabelCaption("")
                .setMultiLines(true)
            );
            
            append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel10")
                .setLeft(40)
                .setTop(74)
                .setWidth(54)
                .setCaption("WS URL")
            );
            
            append(
                (new xui.UI.Input)
                .setHost(host,"ctl_url")
                .setReadonly(true)
                .setLeft(110)
                .setTop(70)
                .setWidth(350)
                .setLabelCaption("")
                .setValue("../../../backend/test/rpc/server.php")
            );
            
            append(
                (new xui.UI.Block)
                .setHost(host,"ctl_block6")
                .setLeft(30)
                .setTop(20)
                .setWidth(440)
                .setHeight(30)
                .setBorderType("ridge")
            );
            
            host.ctl_block6.append(
                (new xui.UI.Label)
                .setHost(host,"ctl_slabel7")
                .setLeft(111)
                .setTop(6)
                .setWidth(181)
                .setCaption("CrossUI SOAP Client")
                .setFontSize("14px")
                .setFontWeight("bold")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        events : {"onReady":"_com_onready"},
        _ctl_do_onclick : function (profile, e, src, value) {
            var ns = this,
                uri = ns.ctl_url.getValue(),
                args = xui.unserialize(ns.ctl_request.getValue());
            if(uri && args){
                ns.ctl_response.setValue("Asynchronous calling...");
                
                var wsdl = xui.SOAP.getWsdl("../../../backend/test/soap/soap.php");
                if(wsdl)
                    xui.Thread.observableRun(function(threadid){
                        xui.request("../../../backend/test/soap/soap.php",
                            xui.SOAP.wrapRequest(args, wsdl),
                            function(rsp){
                                ns.ctl_response.setValue(xui.Coder.formatText(xui.stringify(xui.SOAP.parseResponse(rsp, args.methodName, wsdl))));
                            },
                            function(msg){
                                ns.ctl_response.setValue(msg);
                            },threadid,{
                            method:'POST',
                            proxyType:'ajax',
                            reqType:'XML',
                            rspType:'XML'
                        });
                    });
            }
        }
    }
});