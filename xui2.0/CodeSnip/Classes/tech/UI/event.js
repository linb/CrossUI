xui.Class('App.tech_UI_event', 'xui.Module',{
    Instance:{
        arr:[],
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new xui.UI.Input)
                .setHost(host,"input1")
                .setLeft(100)
                .setTop(40)
                .setWidth(278)
                .beforeValueSet("_traceEvent")
                .afterValueSet("_traceEvent")
                .beforeUIValueSet("_traceEvent")
                .afterUIValueSet("_traceEvent")
                .beforeHoverEffect("_traceEvent")
                .onRender("_traceEvent")
                .onLayout("_traceEvent")
                .onDestroy("_traceEvent")
                .onHotKeydown("_traceEvent")
                .onHotKeypress("_traceEvent")
                .onHotKeyup("_traceEvent")
                .onShowTips("_traceEvent")
                .onFocus("_traceEvent")
                .onBlur("_traceEvent")
                .beforeDirtyMark("_traceEvent")
                .beforeFormatCheck("_traceEvent")
                .beforeFormatMark("_traceEvent")
            );

            append((new xui.UI.Panel)
                .setHost(host,"panelbar2")
                .setDock("none")
                .setLeft(100)
                .setTop(70)
                .setWidth(278)
                .setHeight(298)
                .setZIndex(1)
                .setCaption("Event Tracer")
                .setCustomStyle({"KEY":"border:solid 1px #ccc"})
            );

            append((new xui.UI.Button)
                .setHost(host,"button3")
                .setLeft(100)
                .setTop(390)
                .setCaption("Clear")
                .setWidth(278)
                .onClick("_button3_onclick")
            );

            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _traceEvent:function(p) {
            var holder = this.panelbar2 && this.panelbar2.getSubNode('PANEL');
            if(holder && !holder.isEmpty()){
                if(this.arr.length){
                    xui.arr.each(this.arr,function(o){
                        holder.prepend( xui.create('<p>'+o[0]+' -> ' + o[1] + '</p>'));
                    });
                    this.arr.length=0;
                }
                holder.prepend( xui.create('<p>' + (arguments[0].alias||"com") + " -> " + p.$lastEvent+ '</p>'));
            }else
                this.arr.push([p.alias||'com', p.$lastEvent]);
        },
        _button3_onclick:function (profile, e, value) {
             this.panelbar2.getSubNode('PANEL').empty();
        }, 
        events:{
            "beforeCreated":"_traceEvent",
            "onCreated":"_traceEvent", 
            "onLoadBaseClass":"_traceEvent", 
            "onLoadReqiredClass":"_traceEvent", 
            "onIniResource":"_traceEvent", 
            "beforeIniComponents":"_traceEvent", 
            "afterIniComponents":"_traceEvent", 
            "onLoadReqiredClass":"_traceEvent", 
            "onReady":"_traceEvent",
            "onRender":"_traceEvent"}
    }
});