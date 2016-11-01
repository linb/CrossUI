Class('RAD.CustomBoxShadow', 'xui.Module',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Dialog")
                .setHost(host,"mainPane")
                .setLeft("5.833333333333333em")
                .setTop("3.3333333333333335em")
                .setWidth("18.333333333333332em")
                .setHeight("20em")
                .setShadow(false)
                .setResizer(false)
                .setCaption("$(RAD.custom_dlg.shadow.Custom Box Shadow)")
                .setMinBtn(false)
                .setMaxBtn(false)
                .beforeClose("_ctl_panel4_beforeclose")
            );
            
            host.mainPane.append(
                xui.create("xui.UI.Block")
                .setHost(host,"bg")
                .setDock("fill")
                .setBorderType("inset")
                .setOverflow("hidden")
                );
            
            host.bg.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"sd_clr")
                .setDirtyMark(false)
                .setLeft("-0.08333333333333333em")
                .setTop("3.3333333333333335em")
                .setWidth("16.666666666666668em")
                .setLabelSize("9em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("$(RAD.custom_dlg.shadow.Shadow Color)")
                .setType("color")
                .afterUIValueSet("_t_sd_afteruivalueset")
                );
            
            host.bg.append(
                xui.create("xui.UI.CheckBox")
                .setHost(host,"c_inset")
                .setDirtyMark(false)
                .setLeft("9.916666666666666em")
                .setTop("0.8333333333333334em")
                .setCaption("$RAD.custom_dlg.shadow.Inset")
                .afterValueSet("_t_sd_afteruivalueset")
                );
            
            host.bg.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"sd_hl")
                .setDirtyMark(false)
                .setLeft("-0.08333333333333333em")
                .setTop("6em")
                .setWidth("16.666666666666668em")
                .setLabelSize("9em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("$(RAD.custom_dlg.shadow.Horizontal Length)")
                .setType("counter")
                .setUnit("px")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(100)
                .onChange("_sd_hl_onchange")
                );
            
            host.bg.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"sd_vl")
                .setDirtyMark(false)
                .setLeft("-0.08333333333333333em")
                .setTop("8.916666666666666em")
                .setWidth("16.666666666666668em")
                .setLabelSize("9em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("$(RAD.custom_dlg.shadow.Vertical Length)")
                .setType("counter")
                .setUnit("px")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(100)
                .onChange("_sd_vl_onchange")
                );
            
            host.bg.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"sd_br")
                .setDirtyMark(false)
                .setLeft("-0.08333333333333333em")
                .setTop("11.583333333333334em")
                .setWidth("16.666666666666668em")
                .setLabelSize("9em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("$(RAD.custom_dlg.shadow.Blur Radius)")
                .setType("counter")
                .setUnit("px")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(100)
                .onChange("_sd_br_onchange")
                );
            
            host.bg.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"sd_sr")
                .setDirtyMark(false)
                .setLeft("-0.08333333333333333em")
                .setTop("14.166666666666666em")
                .setWidth("16.666666666666668em")
                .setLabelSize("9em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("$(RAD.custom_dlg.shadow.Spread Radius)")
                .setType("counter")
                .setUnit("px")
                .setPrecision(0)
                .setIncrement(1)
                .setMin(0)
                .setMax(100)
                .onChange("_sd_sr_onchange")
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
                sr:ns.sd_sr.getValue(),
                clr:ns.sd_clr.getValue(),
                inset:ns.c_inset.getValue()
            };
        },
        _t_sd_afteruivalueset : function (profile){
            xui.resetRun("boxShadow",this.setBR,0,null,this);
        },
        setBR:function(){
            var values = this._getValues(),v;
            if(!(values.clr || parseInt(values.hl) || parseInt(values.vl) || parseInt(values.br)|| parseInt(values.sr))){
                v='';
            }else{
                v=(values.inset?("inset "):"")+values.hl + "px " + values.vl + "px " + values.br + "px " + values.sr + "px " + values.clr;
            }
            this.fireEvent("onChange",[v]);
        },
        init:function(prf,tplkey,prop,type){
            var ns=this;
            xui.merge(ns.properties,prop,'all');

            var v = ((type==2 ? tplkey : xui.get(prf.CS,[tplkey, "box-shadow"]))||'').toLowerCase(),
                style, args, 
                hl,vl,br,sr,clr,opacity=1, inset;
            if(v){
                v = v.replace(/(?:rgb\((\d+), ?(\d+), ?(\d+)\)([^,]*))+/g,function(a,b,c,d,e){
                    return '#'+xui.UI.ColorPicker.rgb2hex(b, c, d) + e;
                });
                v = v.replace(/(?:rgba\((\d+), ?(\d+), ?(\d+), ?([.\d]+)\)([^,]*))+/g,function(a,b,c,d,e,f){
                    opacity = parseFloat(e)||1;
                    return '#'+xui.UI.ColorPicker.rgb2hex(b, c, d) + f;
                });
                xui.arr.each(v.split(/\s/),function(s){
                    if(/#/.test(s)){ 
                        clr = s;
                    }else if('inset'==s){
                        inset="inset";
                    }else{
                        if(!xui.isDefined(hl)) hl=parseFloat(s)||0;
                        else if(!xui.isDefined(vl)) vl=parseFloat(s)||0;
                        else if(!xui.isDefined(br)) br=parseFloat(s)||0;
                        else if(!xui.isDefined(sr)) sr=parseFloat(s)||0;
                    }
                });
            }
            
            if(!clr){
                hl=vl=br=sr=0;
                clr=inset='';
            }
            ns.c_inset.setValue(inset=="inset");
            ns.sd_hl.setValue(hl||0,true);
            ns.sd_vl.setValue(vl||0,true);
            ns.sd_br.setValue(br||0,true);
            ns.sd_sr.setValue(sr||0,true);
            ns.sd_clr.setValue(clr||0,true);
        },
        _ctl_panel4_beforeclose : function (profile){
            profile.boxing().hide();
            return false;
        },
        _sd_hl_onchange:function (profile){
            this._t_sd_afteruivalueset(profile);
        },
        _sd_vl_onchange:function (profile){
            this._t_sd_afteruivalueset(profile);
        },
        _sd_br_onchange:function (profile){
            this._t_sd_afteruivalueset(profile);
        },
        _sd_sr_onchange:function (profile){
            this._t_sd_afteruivalueset(profile);
        }
    }
});