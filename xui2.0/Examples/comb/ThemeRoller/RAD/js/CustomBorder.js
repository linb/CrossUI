Class('RAD.CustomBorder', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Dialog")
                .setHost(host,"mainPane")
                .setLeft("5.833333333333333em")
                .setTop("3.3333333333333335em")
                .setWidth("15.833333333333334em")
                .setHeight("12.5em")
                .setShadow(false)
                .setResizer(false)
                .setCaption("$(RAD.custom_dlg.borderdlg.Custom Border)")
                .setMinBtn(false)
                .setMaxBtn(false)
                .beforeClose("_ctl_panel4_beforeclose")
            );
            
            host.mainPane.append(
                xui.create("xui.UI.Block")
                .setHost(host,"bg")
                .setDock("fill")
                .setBorderType("inset")
                );
            
            host.bg.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"r_cS")
                .setDirtyMark(false)
                .setLeft("-0.08333333333333333em")
                .setTop("0.9166666666666666em")
                .setWidth("13.333333333333334em")
                .setLabelSize("6em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Style")
                .setType("listbox")
                .setItems([{
                    "id":"dashed",
                    "caption":"$RAD.custom_dlg.borderdlg.dashed"
                },
                {
                    "id":"dotted",
                    "caption":"$RAD.custom_dlg.borderdlg.dotted"
                },
                {
                    "id":"double",
                    "caption":"$RAD.custom_dlg.borderdlg.double"
                },
                {
                    "id":"groove",
                    "caption":"$RAD.custom_dlg.borderdlg.groove"
                },
                {
                    "id":"hidden",
                    "caption":"$RAD.custom_dlg.borderdlg.hidden"
                },
                {
                    "id":"inset",
                    "caption":"$RAD.custom_dlg.borderdlg.inset"
                },
                {
                    "id":"none",
                    "caption":"$RAD.custom_dlg.borderdlg.none"
                },
                {
                    "id":"outset",
                    "caption":"$RAD.custom_dlg.borderdlg.outset"
                },
                {
                    "id":"ridge",
                    "caption":"$RAD.custom_dlg.borderdlg.ridge"
                },
                {
                    "id":"solid",
                    "caption":"$RAD.custom_dlg.borderdlg.solid"
                },
                {
                    "id":"inherit",
                    "caption":"$RAD.custom_dlg.borderdlg.inherit"
                }])
                .setValue("none")
                .afterUIValueSet("_r_cs_afteruivalueset")
                );
            
            host.bg.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"r_sW")
                .setDirtyMark(false)
                .setLeft("-0.08333333333333333em")
                .setTop("6em")
                .setWidth("13.333333333333334em")
                .setLabelSize("6em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("$(RAD.custom_dlg.borderdlg.Width)")
                .setType("counter")
                .setUnit("px")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(100)
                .onChange("_r_cs_afteruivalueset")
                );
            
            host.bg.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"r_cC")
                .setDirtyMark(false)
                .setLeft("-0.08333333333333333em")
                .setTop("3.4166666666666665em")
                .setWidth("13.333333333333334em")
                .setLabelSize("6em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("$RAD.custom_dlg.borderdlg.Color")
                .setType("color")
                .afterUIValueSet("_r_cs_afteruivalueset")
                );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },
        _getValues:function(){
            var ns=this;
            return {
                style:ns.r_cS.getValue(),
                color:ns.r_cC.getValue(),
                width:ns.r_sW.getValue()
            };
        },
        _r_cs_afteruivalueset : function (profile){
            xui.resetRun("border_radius",this.setBR,0,null,this);
        },
        setBR:function(){
            var values = this._getValues();
            this.fireEvent("onChange",[values.style=='none'?'':(values.style +  " " + values.color + " " + values.width +"px")]);
        },
        init:function(prf,tplkey,prop,type){
            var ns=this,n;

            xui.merge(ns.properties,prop,'all');

            if(type==2){
                n=xui(xui.$getGhostDiv());
                n.css('border',tplkey);
            }else{
                n=prf.getSubNode(tplkey);
            }
            
            ns.r_cS.setValue(n.css("borderStyle")||"none",true);
            ns.r_cC.setValue(n.css("borderColor")||"",true);
            ns.r_sW.setValue(n.css("borderWidth")||0);

        },
        _ctl_panel4_beforeclose : function (profile){
            profile.boxing().hide();
            return false;
        }
    }
});
