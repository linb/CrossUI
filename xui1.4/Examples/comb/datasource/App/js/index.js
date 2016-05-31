Class('App', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.DataBinder)
                .setHost(host, "db_json")
                .setName("db_json")
            );
            
            append(
                (new xui.DataBinder)
                .setHost(host, "db_xmlrpc")
                .setName("db_json")
            );
            
            append(
                (new xui.DataBinder)
                .setHost(host, "db_soap")
                .setName("db_json")
            );

            append(
                (new xui.APICaller)
                .setHost(host,"apicaller_json")
                .setQueryURL("http://ajax.googleapis.com/ajax/services/search/web")
                .setQueryArgs({"v":"1.0", "q":"CrossUI"})
                .setName("apicaller_json")
                .setResponseDataTarget([{type:'databinder',name:'db_json'}])
                .afterInvoke("_apicaller_1_afterInvoke")
            );
            
            append(
                (new xui.APICaller)
                .setHost(host,"apicaller_xmlrpc")
                .setQueryURL("../../../backend/test/rpc/server.php")
                .setRequestType("XML")
                .setResponseType("XML")
                .setQueryArgs({"methodName":"passThrough", "params":[2790, 1290320.2323, null, "Hello world ☺", "Hello world2", new Date(2011,4,9,18,4,15,586), {"Color":"Red", "Truth":true}, [1, 2, 3, 4]]})
                .setName("apicaller_xmlrpc")
                .setResponseDataTarget([{type:'databinder',name:'db_xmlrpc'}])
                .afterInvoke("_apicaller_xmlrpc_afterInvoke")
            );
            
            append(
                (new xui.APICaller)
                .setHost(host,"apicaller_soap")
                .setQueryURL("../../../backend/test/soap/soap.php")
                .setRequestType("SOAP")
                .setResponseType("SOAP")
                .setQueryArgs({"methodName":"getUserInfo", "params":{"bgin":"3", "limit":"323"}})
                .setName("apicaller_soap")
                .setResponseDataTarget([{type:'databinder',name:'db_soap'}])
                .afterInvoke("_apicaller_soap_afterInvoke")
            );
            
            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group1")
                .setLeft(40)
                .setTop(40)
                .setWidth(650)
                .setHeight(80)
                .setCaption("apicaller for <strong>google search API (JSON service)</strong>")
                .setToggleBtn(false)
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel3")
                .setLeft(30)
                .setTop(24)
                .setWidth(124)
                .setCaption("results count :")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel4")
                .setLeft(310)
                .setTop(24)
                .setWidth(124)
                .setCaption("the top url is :")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Input)
                .setHost(host,"ctl_input1")
                .setDataBinder("db_json")
                .setDataField("returnurls")
                .setLeft(180)
                .setTop(20)
                .setLabelCaption("ctl_input1")
            );
            
            host.ctl_group1.append(
                (new xui.UI.Input)
                .setHost(host,"ctl_input11")
                .setDataBinder("db_json")
                .setDataField("topurl")
                .setLeft(440)
                .setTop(20)
                .setLabelCaption("ctl_input1")
            );
            
            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group15")
                .setLeft(40)
                .setTop(140)
                .setWidth(650)
                .setHeight(80)
                .setCaption("apicaller for local <strong>XMLRPC service</strong>")
                .setToggleBtn(false)
            );
            
            host.ctl_group15.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel33")
                .setLeft(30)
                .setTop(24)
                .setWidth(124)
                .setCaption("result 1 :")
            );
            
            host.ctl_group15.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel34")
                .setLeft(310)
                .setTop(24)
                .setWidth(124)
                .setCaption("result 2 :")
            );
            
            host.ctl_group15.append(
                (new xui.UI.Input)
                .setHost(host,"ctl_input20")
                .setDataBinder("db_xmlrpc")
                .setDataField("r1")
                .setLeft(180)
                .setTop(20)
                .setLabelCaption("ctl_input1")
            );
            
            host.ctl_group15.append(
                (new xui.UI.Input)
                .setHost(host,"ctl_input21")
                .setDataBinder("db_xmlrpc")
                .setDataField("r2")
                .setLeft(440)
                .setTop(20)
                .setLabelCaption("ctl_input1")
            );
            
            append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group26")
                .setLeft(40)
                .setTop(240)
                .setWidth(650)
                .setHeight(80)
                .setCaption("apicaller for local <strong>SOAP service</strong>")
                .setToggleBtn(false)
            );
            
            host.ctl_group26.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel55")
                .setLeft(30)
                .setTop(24)
                .setWidth(124)
                .setCaption("user :")
            );
            
            host.ctl_group26.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel56")
                .setLeft(310)
                .setTop(24)
                .setWidth(124)
                .setCaption("msg :")
            );
            
            host.ctl_group26.append(
                (new xui.UI.Input)
                .setHost(host,"ctl_input42")
                .setDataBinder("db_soap")
                .setDataField("user")
                .setLeft(180)
                .setTop(20)
                .setLabelCaption("ctl_input1")
            );
            
            host.ctl_group26.append(
                (new xui.UI.Input)
                .setHost(host,"ctl_input43")
                .setDataBinder("db_soap")
                .setDataField("msg")
                .setLeft(440)
                .setTop(20)
                .setLabelCaption("ctl_input1")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        events:{onReady:'_onready'},
        _onready:function(){
            this.apicaller_json.invoke();
            this.apicaller_xmlrpc.invoke();
            this.apicaller_soap.invoke();
        },
        _apicaller_1_afterInvoke : function (profile, rspData) {
            if(!_.isHash(rspData)){
                alert(rspData+"");
                return;
            }
            var rst=_.get(rspData,["responseData","results"]);
            return {
                returnurls:rst.length,
                topurl:rst[0].url
            };
        },
        _apicaller_xmlrpc_afterInvoke : function (profile, rspData) {
            return {
                r1: rspData.result[0],
                r2: rspData.result[3]
            };
        },
        _apicaller_soap_afterInvoke : function (profile, rspData) {
            return rspData.result;
        }
    }
});