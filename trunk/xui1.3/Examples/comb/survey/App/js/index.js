Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.DataBinder)
                .setHost(host,"db1")
                .setName("db1")
            );
            
            append((new xui.UI.Pane)
                .setHost(host,"layout")
                .setTop(30)
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                .setCustomStyle({"KEY":"margin:0 auto;width:600px;"})
            );
            
            host.layout.append((new xui.UI.Pane)
                .setHost(host,"pane6")
                .setWidth("auto")
                .setHeight(100)
                .setTabindex("1")
                .setPosition("relative")
            );
            
            host.pane6.append((new xui.UI.Input)
                .setHost(host,"iPhone")
                .setDataBinder("db1")
                .setDataField("phone")
                .setLeft(140)
                .setTop(70)
                .setWidth(310)
            );
            
            host.pane6.append((new xui.UI.Div)
                .setHost(host,"div9")
                .setLeft(10)
                .setTop(12)
                .setWidth(120)
                .setHeight(20)
                .setHtml("Your name : ")
            );
            
            host.pane6.append((new xui.UI.Div)
                .setHost(host,"vName")
                .setLeft(460)
                .setTop(12)
                .setWidth(130)
                .setHeight(20)
            );
            
            host.pane6.append((new xui.UI.Input)
                .setHost(host,"iEmail")
                .setDataBinder("db1")
                .setDataField("email")
                .setTips("Email Address")
                .setLeft(140)
                .setTop(40)
                .setWidth(310)
                .setTipsErr("Input a valid email")
                .setTipsOK("OK")
                .setValueFormat("^[\\w\\.=-]+@[\\w\\.-]+\\.[\\w\\.-]{2,4}$")
                .setTipsBinder("vEmail")
            );
            
            host.pane6.append((new xui.UI.Div)
                .setHost(host,"div11")
                .setLeft(10)
                .setTop(72)
                .setWidth(120)
                .setHeight(20)
                .setHtml("Your phone number : ")
            );
            
            host.pane6.append((new xui.UI.Input)
                .setHost(host,"iName")
                .setDataBinder("db1")
                .setDataField("name")
                .setTips("Required")
                .setLeft(140)
                .setTop(10)
                .setWidth(310)
                .setTipsErr("Required")
                .setTipsOK("OK")
                .setValueFormat("[^.*]")
                .setTipsBinder("vName")
            );
            
            host.pane6.append((new xui.UI.Div)
                .setHost(host,"div10")
                .setLeft(10)
                .setTop(42)
                .setWidth(120)
                .setHeight(20)
                .setHtml("Your email address : ")
            );
            
            host.pane6.append((new xui.UI.Div)
                .setHost(host,"vEmail")
                .setLeft(460)
                .setTop(40)
                .setWidth(130)
                .setHeight(20)
            );
            
            host.layout.append((new xui.UI.Pane)
                .setHost(host,"pane2")
                .setWidth("auto")
                .setHeight("auto")
                .setTabindex("2")
                .setPosition("relative")
            );
            
            host.pane2.append((new xui.UI.Poll)
                .setHost(host,"poll7")
                .setDataBinder("db1")
                .setDataField("gender")
                .setItems([{"id":"Male", "caption":"Male", "message":"78%", "percent":"0.78"}, {"id":"Female", "caption":"Female", "message":"22%", "percent":"0.22"}])
                .setLeft(null)
                .setTop(null)
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                .setTitle("What is your gender?")
                .setValue("")
            );
            
            host.pane2.append((new xui.UI.Poll)
                .setHost(host,"poll05")
                .setDataBinder("db1")
                .setDataField("age")
                .setItems([{"id":"under 20", "caption":"under 20", "message":"18%", "percent":"0.18"}, {"id":"20 - 34", "caption":"20 - 34", "message":"52%", "percent":"0.52"}, {"id":"35 - 49", "caption":"35 - 49", "message":"20%", "percent":"0.2"}, {"id":"50 - 64", "caption":"50 - 64", "message":"10%", "percent":"0.1"}, {"id":"over 65", "caption":"over 65", "message":"0%", "percent":"0"}])
                .setLeft(null)
                .setTop(null)
                .setWidth("auto")
                .setHeight("auto")
                .setTabindex("2")
                .setPosition("relative")
                .setTitle("What is your age?")
                .setValue("")
            );
            
            host.pane2.append((new xui.UI.Poll)
                .setHost(host,"poll10")
                .setDataBinder("db1")
                .setDataField("styles")
                .setItems([{"id":"rover", "caption":"Land Rover LRX Concept", "message":"67%", "percent":"0.67"}, {"id":"suzuki", "caption":"Suzuki X-HEAD Concept", "message":"67%", "percent":"0.67"}, {"id":"toyotat", "caption":"Toyota RiN Concept", "message":"67%", "percent":"0.67"}])
                .setLeft(null)
                .setTop(null)
                .setWidth("auto")
                .setHeight("auto")
                .setTabindex("4")
                .setPosition("relative")
                .setSelMode("multi")
                .setTitle("What kind of styles do you like?")
                .setToggle(true)
                .setValue("")
                .onGetContent("_poll10_ongetcontent")
            );
            
            host.pane2.append((new xui.UI.Poll)
                .setHost(host,"poll8")
                .setDataBinder("db1")
                .setDataField("favorite")
                .setItems([{"id":"1", "caption":"C5/C6 Corvettes", "message":"180 votes", "percent":"0.18"}, {"id":"2", "caption":" New Mustang (not the V6)", "message":"180 votes", "percent":"0.18"}, {"id":"3", "caption":"Cadillac CTS-V", "message":"180 votes", "percent":"0.18"}, {"id":"4", "caption":"Pontiac GTO", "message":"180 votes", "percent":"0.18"}, {"id":"5", "caption":"Lincoln LS", "message":"180 votes", "percent":"0.18"}])
                .setWidth("auto")
                .setHeight("auto")
                .setTabindex("5")
                .setPosition("relative")
                .setSelMode("multi")
                .setTitle("Your favorite newer American cars?")
                .setNewOption("Any others")
                .setValue("")
            );
            
            host.layout.append((new xui.UI.Pane)
                .setHost(host,"pane28")
                .setWidth("auto")
                .setHeight(40)
                .setTabindex("3")
                .setPosition("relative")
                .setCustomStyle({"KEY":"text-align:center"})
            );
            
            host.pane28.append((new xui.UI.Button)
                .setHost(host,"btnSubmit")
                .setPosition("static")
                .setCaption("Submit")
                .onClick("_btnsubmit_onclick")
            );
            
            host.layout.append((new xui.UI.FoldingList)
                .setHost(host,"fl")
                .setItems([{id:'1',"title":"A nice survey [John]", "caption":"Tue Nov 18 2008 18:51:55", "text":"Oh! It's really a nice survey online."}, {id:'2',"title":"Re: A nice survey [Make]", "caption":"Tue Nov 18 2008 18:52:05", "text":"I agree. :) "}])
                .setTop(-7)
                .setWidth("auto")
                .setHeight(116)
                .setTabindex("4")
                .setPosition("relative")
                .setTagCmds([])
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _toggle:function(profile,item,callback){
            return new xui.UI.Button({position:'relative'})
        }, 
        _poll10_ongetcontent:function (profile, item, callback) {
            return '<img src=img/'+item.id+'.jpg>';
        }, 
        _btnsubmit_onclick:function (profile, e, src, value) {
            var results=this.db1.updateDataFromUI(true).getData();
            if(results){
                if(!results.age){
                    alert('Specify age please!');
                    return;
                }
                if(!results.gender){
                    alert('Specify gender please!');
                    return;
                }
                xui.Dom.submit('result.html',results);
            }
        }, 
        _onready:function () {
            SPA=this;
        }, 
        events:{"onReady":"_onready"}
    }
});