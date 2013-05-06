Class('App', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new xui.DataBinder)
                .setHost(host,"databinder_1")
                .setDataSourceType("remoting")
                .setQueryURL("data.js")
                .setProxyType("Ajax")
                .setName("databinder_1")
                .afterRead("_databinder_1_afterread")
            );
            
            append(
                (new xui.UI.Panel)
                .setHost(host,"ctl_panel3")
                .setDock("none")
                .setLeft(20)
                .setTop(10)
                .setWidth(620)
                .setHeight(510)
                .setZIndex(1)
                .setCaption("DataBinder OverView")
                .setCustomStyle({"PANEL":"background-color:#fff;"})
            );
            
            host.ctl_panel3.append(
                (new xui.UI.Image)
                .setHost(host,"ctl_image3")
                .setLeft(10)
                .setTop(91)
                .setSrc("img/databinder.png")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_updateValue")
                .setLeft(170)
                .setTop(151)
                .setCaption("updateValue")
                .onClick("_ctl_updatevalue_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_checkValue")
                .setLeft(255)
                .setTop(151)
                .setCaption("checkValue")
                .onClick("_ctl_checkvalue_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_getDirtied")
                .setLeft(335)
                .setTop(151)
                .setCaption("getDirtied")
                .onClick("_ctl_getdirtied_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_updateDataToUI")
                .setLeft(120)
                .setTop(202)
                .setCaption("updateDataToUI")
                .onClick("_ctl_updatedatatoui_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_updateDataFromUI")
                .setLeft(310)
                .setTop(202)
                .setCaption("updateDataFromUI")
                .onClick("_ctl_updatedatafromui_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_getData")
                .setLeft(50)
                .setTop(268)
                .setCaption("getData")
                .onClick("_ctl_getdata_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_setData")
                .setLeft(470)
                .setTop(268)
                .setCaption("setData")
                .onClick("_ctl_setdata_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_read")
                .setLeft(95)
                .setTop(329)
                .setCaption("read")
                .onClick("_ctl_read_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group1")
                .setLeft(45)
                .setTop(10)
                .setWidth(477)
                .setHeight(70)
                .setCaption("The bound UI")
                .setToggleBtn(false)
            );
            
            host.ctl_group1.append(
                (new xui.UI.Input)
                .setHost(host,"ctl_input1")
                .setDataBinder("databinder_1")
                .setDataField("Name")
                .setLeft(70)
                .setTop(10)
                .setLabelCaption("ctl_input1")
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"ctl_comboinput2")
                .setDataBinder("databinder_1")
                .setDataField("Gender")
                .setLeft(270)
                .setTop(10)
                .setWidth(80)
                .setLabelCaption("ctl_comboinput2")
                .setType("listbox")
                .setItems([{"id":"male", "caption":"Male"}, {"id":"female", "caption":"Female"}])
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel1")
                .setLeft(20)
                .setTop(14)
                .setCaption("Name")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel2")
                .setLeft(220)
                .setTop(12)
                .setHeight(19)
                .setCaption("Gender")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        
        customAppend : function(parent, subId, left, top){
            // "return false" 表示默认情况下所有的第一层内部界面控件会被加入到父容器
            return false;
        },
        events : {},
        _ctl_updatevalue_onclick : function (profile, e, src, value) {
            this.databinder_1.updateValue();
            xui.message("Values are updated and reflected onto UI.");
        },
        _ctl_checkvalue_onclick : function (profile, e, src, value) {
            xui.message(this.databinder_1.checkValid()?"All inputs is valid!":"Invalid input exists!");
        },
        _ctl_getdirtied_onclick : function (profile, e, src, value) {
            xui.message("Dirtied values : "+_.stringify(this.databinder_1.getDirtied(true)));
        },
        _ctl_updatedatafromui_onclick : function (profile, e, src, value) {
            this.databinder_1.updateDataFromUI(true, true, true, function(data){
                if(data && data.Name){
                    data.Name = data.Name + " [author]";
                }
                return data;
            });
            xui.message("Values in DataBinder : "+_.stringify(this.databinder_1.getData()));
        },
        _ctl_updatedatatoui_onclick : function (profile, e, src, value) {
            this.databinder_1.updateDataToUI(
                // you can adjust data here                       
                function(data){
                    if(data && data.Name){
                        data.Name = data.Name.replace(" [author]","");
                    }
                    return data;
            });
        },
        _ctl_getdata_onclick : function (profile, e, src, value) {
            xui.message("Values in DataBinder : "+_.stringify(this.databinder_1.getData()));
        },
        _ctl_setdata_onclick : function (profile, e, src, value) {
            this.databinder_1.setData({Name:"Jack Lee", Gender:"male", Memo:"The author of CrossUI Framework"});
            this.databinder_1.updateDataToUI();
            xui.message("Values in DataBinder : "+_.stringify(this.databinder_1.getData()));
        },
        _ctl_read_onclick : function (profile, e, src, value) {
            this.databinder_1.read(function(data){
                xui.message("onSuccess",data);
            }, function(msg){
                xui.message("onFail",msg);               
            }, function(){
                xui.message("onStart");                
            }, function(){
                xui.message("onEnd");                
            }, "busy", null, null, 
            // you can adjust data here                       
            function(data){
                if(data && data.Name){
                    data.Name = data.Name.split(" ")[0];
                }
                return data;
            });
        },
        _databinder_1_afterread : function (profile, data) {
            // you can adjust data here
            if(data && data.Name){
                data.Name = data.Name.split(" ")[0];
            }
            return data;
        }
    }
});