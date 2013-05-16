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
                .afterUpdateDataFromUI("_databinder_1_afterupdatedatafromui")
                .afterInvoke("_databinder_1_afterinvoke")
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
                .setTop(97)
                .setSrc("img/databinder.png")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_updateDataToUI")
                .setLeft(120)
                .setTop(203)
                .setCaption("updateDataToUI")
                .onClick("_ctl_updatedatatoui_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_updateDataFromUI")
                .setLeft(310)
                .setTop(203)
                .setCaption("updateDataFromUI")
                .onClick("_ctl_updatedatafromui_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_getData")
                .setLeft(469)
                .setTop(269)
                .setCaption("getData")
                .onClick("_ctl_getdata_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_setData")
                .setLeft(51)
                .setTop(269)
                .setCaption("setData")
                .onClick("_ctl_setdata_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_read")
                .setLeft(95)
                .setTop(330)
                .setCaption("read")
                .onClick("_ctl_read_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.Group)
                .setHost(host,"ctl_group1")
                .setLeft(61)
                .setTop(11)
                .setWidth(450)
                .setHeight(94)
                .setCaption("UI Demo")
                .setToggleBtn(false)
            );
            
            host.ctl_group1.append(
                (new xui.UI.Input)
                .setHost(host,"ctl_input1")
                .setDataBinder("databinder_1")
                .setDataField("Name")
                .setLeft(70)
                .setTop(40)
                .setLabelCaption("ctl_input1")
            );
            
            host.ctl_group1.append(
                (new xui.UI.ComboInput)
                .setHost(host,"ctl_comboinput2")
                .setDataBinder("databinder_1")
                .setDataField("Gender")
                .setLeft(270)
                .setTop(40)
                .setWidth(80)
                .setLabelCaption("ctl_comboinput2")
                .setType("listbox")
                .setItems([{"id":"male", "caption":"Male"}, {"id":"female", "caption":"Female"}])
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel1")
                .setLeft(20)
                .setTop(44)
                .setCaption("Name")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SLabel)
                .setHost(host,"ctl_slabel2")
                .setLeft(220)
                .setTop(42)
                .setHeight(19)
                .setCaption("Gender")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_updateValue")
                .setLeft(200)
                .setTop(0)
                .setCaption("updateValue")
                .onClick("_ctl_updatevalue_onclick")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_checkValue")
                .setLeft(284)
                .setTop(0)
                .setCaption("checkValue")
                .onClick("_ctl_checkvalue_onclick")
            );
            
            host.ctl_group1.append(
                (new xui.UI.SButton)
                .setHost(host,"ctl_getDirtied")
                .setLeft(362)
                .setTop(0)
                .setCaption("getDirtied")
                .onClick("_ctl_getdirtied_onclick")
            );
            
            host.ctl_panel3.append(
                (new xui.UI.Input)
                .setHost(host,"innerData")
                .setDisabled(true)
                .setLeft(241)
                .setTop(248)
                .setWidth(220)
                .setHeight(65)
                .setMultiLines(true)
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        
        customAppend : function(parent, subId, left, top){
            // "return false"
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
            var data={Name:"Jack Lee", Gender:"male", Memo:"The author of CrossUI Framework"};
            this.databinder_1.setData(data);
            this.innerData.setValue(_.stringify(data),true);
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
        },
        _databinder_1_afterupdatedatafromui : function (profile, dataFromUI){
            this.innerData.setValue(_.stringify(dataFromUI),true);
        },
        _databinder_1_afterinvoke : function (profile,rspData){
            this.innerData.setValue(_.stringify(rspData),true);
        }
    }
});