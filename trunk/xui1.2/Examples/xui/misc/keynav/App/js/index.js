Class('App', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append((new xui.UI.Block())
            .setHost(host,"ctl_block41")
            .setLeft(230)
            .setTop(90)
            .setWidth(363)
            .setHeight(323)
            .setOverflow("visible")
            .setBorderType("inset")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button1")
            .setDirtyMark(false)
            .setLeft(0)
            .setTop(0)
            .setWidth(90)
            .setHeight(80)
            .setCaption("1")
            .setType("status")
            .setValue(true)
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button2")
            .setDirtyMark(false)
            .setLeft(90)
            .setTop(0)
            .setWidth(90)
            .setHeight(80)
            .setCaption("2")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button3")
            .setDirtyMark(false)
            .setLeft(180)
            .setTop(0)
            .setWidth(90)
            .setHeight(80)
            .setCaption("3")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button4")
            .setDirtyMark(false)
            .setLeft(270)
            .setTop(0)
            .setWidth(90)
            .setHeight(80)
            .setCaption("4")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button5")
            .setDirtyMark(false)
            .setLeft(0)
            .setTop(80)
            .setWidth(90)
            .setHeight(80)
            .setCaption("5")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button6")
            .setDirtyMark(false)
            .setLeft(90)
            .setTop(80)
            .setWidth(90)
            .setHeight(80)
            .setCaption("6")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button7")
            .setDirtyMark(false)
            .setLeft(180)
            .setTop(80)
            .setWidth(90)
            .setHeight(80)
            .setCaption("7")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button8")
            .setDirtyMark(false)
            .setLeft(270)
            .setTop(80)
            .setWidth(90)
            .setHeight(80)
            .setCaption("8")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button9")
            .setDirtyMark(false)
            .setLeft(0)
            .setTop(160)
            .setWidth(90)
            .setHeight(80)
            .setCaption("9")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button10")
            .setDirtyMark(false)
            .setLeft(90)
            .setTop(160)
            .setWidth(90)
            .setHeight(80)
            .setCaption("10")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button11")
            .setDirtyMark(false)
            .setLeft(180)
            .setTop(160)
            .setWidth(90)
            .setHeight(80)
            .setCaption("11")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button12")
            .setDirtyMark(false)
            .setLeft(270)
            .setTop(160)
            .setWidth(90)
            .setHeight(80)
            .setCaption("12")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button13")
            .setDirtyMark(false)
            .setLeft(0)
            .setTop(240)
            .setWidth(90)
            .setHeight(80)
            .setCaption("13")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button14")
            .setDirtyMark(false)
            .setLeft(90)
            .setTop(240)
            .setWidth(90)
            .setHeight(80)
            .setCaption("14")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button15")
            .setDirtyMark(false)
            .setLeft(180)
            .setTop(240)
            .setWidth(90)
            .setHeight(80)
            .setCaption("15")
            .setType("status")
            .onClick("_onclick")
            );
            
            host.ctl_block41.append((new xui.UI.Button())
            .setHost(host,"ctl_button16")
            .setDirtyMark(false)
            .setLeft(270)
            .setTop(240)
            .setWidth(90)
            .setHeight(80)
            .setCaption("16")
            .setType("status")
            .onClick("_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        events:{"onRender":"_com_onrender"},
        curIndex:0,
        selIndex:function(index){
            var ns=this;
            ns["ctl_button"+(ns.curIndex+1)].setValue(false);

            if(index<0)index+=16;
            if(index>15)index-=16;
            ns.curIndex=index;
            ns["ctl_button"+(ns.curIndex+1)].setValue(true);
        },
        _com_onrender:function (com, threadid){
            var ns=this;
            xui.Event.keyboardHook("left", 0, 0, 0, function(){
                ns.selIndex(ns.curIndex-1);
            });
            xui.Event.keyboardHook("right", 0, 0, 0, function(){
                ns.selIndex(ns.curIndex+1);
            });
            xui.Event.keyboardHook("up", 0, 0, 0, function(){
                var i;
                if(ns.curIndex==0)i=15;
                else{
                    i=ns.curIndex-4;
                    if(i<0)i--;
                }
                ns.selIndex(i);
            });
            xui.Event.keyboardHook("down", 0, 0, 0, function(){
                var i;
                if(ns.curIndex==15)i=0;
                else{
                    i=ns.curIndex+4;
                    if(i>15)i++;
                }
                ns.selIndex(i);
            });
        },
        _onclick:function (profile, e, src, value){
            var ns=this;
            
            ns.selIndex(parseInt(profile.alias.replace(/[^0-9]/g,''),10)-1);
        }
    }
});