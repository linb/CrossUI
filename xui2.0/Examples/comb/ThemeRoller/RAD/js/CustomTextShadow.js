Class('RAD.CustomTextShadow', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Dialog")
                .setHost(host,"mainPane")
                .setLeft("5.833333333333333em")
                .setTop("3.1666666666666665em")
                .setWidth("20em")
                .setHeight("15.166666666666666em")
                .setShadow(false)
                .setResizer(false)
                .setCaption("$(RAD.custom_dlg.shadow.Custom Text Shadow)")
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
                .setHost(host,"sd_clr")
                .setDirtyMark(false)
                .setLeft("1.5833333333333333em")
                .setTop("0.8333333333333334em")
                .setWidth("15.833333333333334em")
                .setLabelSize("108px")
                .setLabelCaption("$(RAD.custom_dlg.shadow.Shadow Color)")
                .setType("color")
                .onChange("_changed")
                );
            
            host.bg.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"sd_hl")
                .setDirtyMark(false)
                .setLeft("1.5833333333333333em")
                .setTop("3.5em")
                .setWidth("15.833333333333334em")
                .setLabelSize("108px")
                .setLabelCaption("$(RAD.custom_dlg.shadow.Horizontal Length)")
                .setType("counter")
                .setUnit("px")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(100)
                .onChange("_changed")
                );
            
            host.bg.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"sd_vl")
                .setDirtyMark(false)
                .setLeft("1.5833333333333333em")
                .setTop("6.416666666666667em")
                .setWidth("15.833333333333334em")
                .setLabelSize("108px")
                .setLabelCaption("$(RAD.custom_dlg.shadow.Vertical Length)")
                .setType("counter")
                .setUnit("px")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(100)
                .onChange("_changed")
                );
            
            host.bg.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"sd_br")
                .setDirtyMark(false)
                .setLeft("1.5833333333333333em")
                .setTop("9.083333333333334em")
                .setWidth("15.833333333333334em")
                .setLabelSize("108px")
                .setLabelCaption("$(RAD.custom_dlg.shadow.Blur Radius)")
                .setType("counter")
                .setUnit("px")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(100)
                .onChange("_changed")
                );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },
        _getValues:function(){
            var ns=this;
            return {
                hl:parseInt(ns.sd_hl.getValue()),
                vl:parseInt(ns.sd_vl.getValue()),
                br:ns.sd_br.getValue(),
                clr:ns.sd_clr.getValue()
            };
        },
        _changed : function (profile){
            xui.resetRun("textShadow",this.setBR,0,null,this);
        },
        setBR:function(){
            var values = this._getValues(),v;
            if(!(values.clr || parseInt(values.hl) || parseInt(values.vl) || parseInt(values.br))){
                v='';
            }else{
                v=values.hl + "px " + values.vl + "px " + values.br + "px " + values.clr;
            }
            this.fireEvent("onChange",[v]);
        },
        init:function(prf,tplkey,prop,type){
            var ns=this,
                hl,vl,br,clr,
                opacity=1;
            xui.merge(ns.properties,prop,'all');

            var v=type==2?tplkey:xui.get(prf.CS,[tplkey, "text-shadow"]);
            if(v){
                v = v.replace(/(?:rgb\((\d+), ?(\d+), ?(\d+)\)([^,]*))+/g,function(a,b,c,d,e){
                    return '#'+xui.UI.ColorPicker.rgb2hex(b, c, d) + e;
                });
                v = v.replace(/(?:rgba\((\d+), ?(\d+), ?(\d+), ?([.\d]+)\)([^,]*))+/g,function(a,b,c,d,e,f){
                    opacity = parseFloat(e)||1;
                    return '#'+xui.UI.ColorPicker.rgb2hex(b, c, d) + f;
                });
                var arr=/([\w]*)?\s*([-\.\d]+)(px)?\s*([-\.\d]+)(px)?\s*([-\.\d]+)(px)?\s*(\S*)?\s*([\w]*)?/.exec(v);
                if(arr&&arr.length){
                    hl=parseFloat(arr[2]);
                    vl=parseFloat(arr[4]);
                    br=parseFloat(arr[6]);
                    clr=arr[1]||arr[8];
                }
            }
            if(!clr){
                hl=vl=br=0;
                clr='';
            }
            ns.sd_hl.setValue(hl||0,true);
            ns.sd_vl.setValue(vl||0,true);
            ns.sd_br.setValue(br||0,true);
            ns.sd_clr.setValue(clr||0,true);
        },
        _ctl_panel4_beforeclose : function (profile){
            profile.boxing().hide();
            return false;
        }
    }
});