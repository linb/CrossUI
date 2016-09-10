Class('App.Dlg', 'xui.Com',{
    Instance:{
        customAppend:function(){
            var self=this,
                prop = this.properties;
            if(prop.fromRegion)
                self.dialog.setFromRegion(prop.fromRegion);

            if(!self.dialog.get(0).renderId)
                self.dialog.render();

            self.col1.resetValue(prop.col1);
            self.col2.resetValue(prop.col2);
            self.col3.resetValue(prop.col3);

            //asy
            self.dialog.show(self.parent, true);
        }, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Dialog)
                .setHost(host,"dialog")
                .setLeft(230)
                .setTop(80)
                .setWidth(350)
                .setHeight(190)
                .setCaption("dialog")
                .onHotKeydown("_dialog_onhotkey")
                .beforeClose("_dialog_beforeclose")
            );
            
            host.dialog.append((new xui.UI.Div)
                .setHost(host,"div13")
                .setLeft(20)
                .setTop(100)
                .setWidth(300)
                .setHeight(30)
                .setHtml("Try to use 'Tab' to leave this dialog!")
                .setCustomStyle({"KEY":"overflow:visible; "})
            );
            
            host.dialog.append((new xui.UI.Button)
                .setHost(host,"btnOK")
                .setLeft(110)
                .setTop(70)
                .setTabindex("1")
                .setCaption("OK")
                .onClick("_btnok_onclick")
            );
            
            host.dialog.append((new xui.UI.Input)
                .setHost(host,"col1")
                .setLeft(20)
                .setTop(10)
                .setTabindex("2")
            );
            
            host.dialog.append((new xui.UI.Input)
                .setHost(host,"col2")
                .setLeft(160)
                .setTop(10)
                .setZIndex("3")
                .setTabindex("3")
                .setValueFormat("^-?\\d\\d*$")
            );
            
            host.dialog.append((new xui.UI.CheckBox)
                .setHost(host,"col3")
                .setLeft(20)
                .setTop(40)
                .setTabindex("4")
                .setCaption("col3")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _btnok_onclick:function (profile, e, value) {
            xui.tryF(this.events.onOK, [this.col1.getUIValue(), this.col2.getUIValue(), this.col3.getUIValue()], this.$parent);
            this.dialog.close();
        }, 
        _dialog_beforeclose:function (profile) {
            profile.boxing().hide();
            return false;
        }, 
        _dialog_onhotkey:function(profile, key){
            if(key.key=='esc')
                profile.boxing().close();
        }
    }
});