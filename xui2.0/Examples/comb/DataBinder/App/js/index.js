Class('App', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.DataBinder")
                .setHost(host,"databinder_1")
                .setName("databinder_1")
                .setData({
                    "ctl_input1" : "",
                    "ctl_comboinput2" : "",
                    "ctl_input9" : "",
                    "Name" : "",
                    "Gender" : "",
                    "Memo" : ""
                }
                )
                .afterUpdateDataFromUI("_databinder_1_afterupdatedatafromui")
            );
            
            append(
                xui.create("xui.UI.Panel")
                .setHost(host,"ctl_panel3")
                .setDock("none")
                .setLeft(20)
                .setTop(10)
                .setWidth(610)
                .setHeight(400)
                .setZIndex(1)
                .setOverflow("hidden")
                .setCaption("DataBinder OverView")
                .setCustomStyle({
                    "PANEL" : "background-color:#fff;"
                }
                )
            );
            
            host.ctl_panel3.append(
                xui.create("xui.UI.Group")
                .setHost(host,"ctl_group1")
                .setLeft(61)
                .setTop(33)
                .setWidth(387)
                .setHeight(97)
                .setCaption("The bound UI controls ( Optional )")
                .setToggleBtn(false)
                .setCustomStyle({
                    "KEY" : {
                        "font-weight" : "bold"
                    }
                }
                )
                );
            
            host.ctl_group1.append(
                xui.create("xui.UI.Input")
                .setHost(host,"ctl_input1")
                .setDataBinder("databinder_1")
                .setDataField("Name")
                .setRequired(true)
                .setLeft(3)
                .setTop(10)
                .setWidth(187)
                .setLabelSize(80)
                .setLabelCaption("Name")
                );
            
            host.ctl_group1.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"ctl_comboinput2")
                .setDataBinder("databinder_1")
                .setDataField("Gender")
                .setLeft(203)
                .setTop(10)
                .setWidth(147)
                .setLabelSize(80)
                .setLabelCaption("Gender")
                .setType("listbox")
                .setItems([{
                    "id" : "male",
                    "caption" : "Male"
                },
                {
                    "id" : "female",
                    "caption" : "Female"
                }])
                .setCaption("ctl_comboinput2")
                );
            
            host.ctl_group1.append(
                xui.create("xui.UI.Input")
                .setHost(host,"ctl_input9")
                .setDataBinder("databinder_1")
                .setDataField("Memo")
                .setLeft(3)
                .setTop(40)
                .setWidth(347)
                .setLabelSize(80)
                .setLabelCaption("Memo")
                );
            
            host.ctl_panel3.append(
                xui.create("xui.UI.SVGPaper")
                .setHost(host,"ctl_svgpaper1")
                .setLeft(0)
                .setTop(0)
                .setWidth(578)
                .setHeight(349)
                .setZIndex(0)
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.UI.SButton")
                .setHost(host,"ctl_updateValue")
                .setLeft(460)
                .setTop(46)
                .setWidth(76)
                .setCaption("updateValue")
                .onClick("_ctl_updatevalue_onclick")
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.UI.SButton")
                .setHost(host,"ctl_checkValue")
                .setLeft(460)
                .setTop(76)
                .setWidth(76)
                .setCaption("checkValue")
                .onClick("_ctl_checkvalue_onclick")
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.UI.SButton")
                .setHost(host,"ctl_getDirtied")
                .setLeft(460)
                .setTop(106)
                .setWidth(76)
                .setCaption("getDirtied")
                .onClick("_ctl_getdirtied_onclick")
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.UI.Span")
                .setHost(host,"ctl_span39")
                .setLeft(66)
                .setTop(303)
                .setWidth(100)
                .setHeight(20)
                .setHtml("onData / onError")
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.rect")
                .setHost(host,"ctl_rect2")
                .setSvgTag("Shapes:Rect")
                .setAttr({
                    "x" : 30,
                    "y" : 170,
                    "width" : 510,
                    "height" : 154,
                    "stroke" : "#004A7F",
                    "fill" : "#ffffff"
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path1")
                .setSvgTag("Shapes:Line")
                .setAttr({
                    "path" : "M,12,293C,12,293,170.2898677998985,293,170.2898677998985,293",
                    "stroke" : "#004A7F",
                    "fill" : "#ffffff",
                    "stroke-width" : 2,
                    "arrow-end" : "open-narrow-short",
                    "arrow-start" : "oval-midium-midium"
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path3")
                .setSvgTag("Shapes:Line")
                .setAttr({
                    "path" : "M,420.80304253023,293C,420.80304253023,293,572.0786063783031,293,572.0786063783031,293",
                    "stroke" : "#004A7F",
                    "fill" : "#ffffff",
                    "stroke-width" : 2,
                    "arrow-end" : "open-narrow-short",
                    "arrow-start" : "oval-midium-midium"
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path4")
                .setSvgTag("Shapes:Line")
                .setAttr({
                    "path" : "M,180.4408244542666,250.6377829513014C,180.4408244542666,250.6377829513014,180.4408244542666,130.81209515248543,180.4408244542666,130.81209515248543",
                    "stroke" : "#004A7F",
                    "fill" : "#ffffff",
                    "stroke-width" : 2,
                    "arrow-end" : "open-narrow-short",
                    "arrow-start" : "oval-midium-midium"
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path5")
                .setSvgTag("Shapes:Line")
                .setAttr({
                    "path" : "M,400.4408244542666,130.81209515248543C,400.4408244542666,130.81209515248543,400.4408244542666,250.6377829513014,400.4408244542666,250.6377829513014",
                    "stroke" : "#004A7F",
                    "fill" : "#ffffff",
                    "stroke-width" : 2,
                    "arrow-end" : "open-narrow-short",
                    "arrow-start" : "oval-midium-midium"
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.rect")
                .setHost(host,"ctl_rect4")
                .setSvgTag("Shapes:Rect")
                .setAttr({
                    "x" : 456,
                    "y" : 40,
                    "width" : 84,
                    "height" : 130,
                    "stroke" : "#004A7F",
                    "fill" : "#ffffff"
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.UI.SButton")
                .setHost(host,"xui_ui_sbutton31")
                .setLeft(460)
                .setTop(136)
                .setWidth(76)
                .setCaption("checkRequired")
                .onClick("_xui_ui_sbutton31_onclick")
                );
            
            host.ctl_panel3.append(
                xui.create("xui.UI.SButton")
                .setHost(host,"ctl_updateDataToUI")
                .setLeft(128)
                .setTop(198)
                .setCaption("updateDataToUI")
                .onClick("_ctl_updatedatatoui_onclick")
                );
            
            host.ctl_panel3.append(
                xui.create("xui.UI.SButton")
                .setHost(host,"ctl_updateDataFromUI")
                .setLeft(338)
                .setTop(198)
                .setCaption("updateDataFromUI")
                .onClick("_ctl_updatedatafromui_onclick")
                );
            
            host.ctl_panel3.append(
                xui.create("xui.UI.SButton")
                .setHost(host,"ctl_getData")
                .setLeft(469)
                .setTop(278)
                .setCaption("getData")
                .onClick("_ctl_getdata_onclick")
                );
            
            host.ctl_panel3.append(
                xui.create("xui.UI.SButton")
                .setHost(host,"ctl_setData")
                .setLeft(51)
                .setTop(278)
                .setCaption("setData")
                .onClick("_ctl_setdata_onclick")
                );
            
            host.ctl_panel3.append(
                xui.create("xui.UI.Input")
                .setHost(host,"innerData")
                .setLeft(168)
                .setTop(248)
                .setWidth(250)
                .setHeight(65)
                .setMultiLines(true)
                );
            
            host.ctl_panel3.append(
                xui.create("xui.UI.Label")
                .setHost(host,"ctl_slabel7")
                .setLeft(275)
                .setTop(235)
                .setCaption("Inner Data")
                );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },

        customAppend : function(parent, subId, left, top){
            // "return false"
            return false;
        },
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
            var data={Name:"Jack Lee - lyb", Gender:"male", Memo:"The author of CrossUI Framework"};
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
        _databinder_1_afterupdatedatafromui : function (profile, dataFromUI){
            this.innerData.setValue(_.stringify(dataFromUI),true);
        },
        _xui_ui_sbutton31_onclick:function (profile, e, src){
            this.databinder_1.checkRequired();
        }
    }
});