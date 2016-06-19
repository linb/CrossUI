
Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Button)
                .setHost(host,"button3")
                .setLeft(310)
                .setTop(30)
                .setWidth(140)
                .setCaption("drag me to calendar")
                .setImage("img/task.gif")
                .onRender("_button3_aftercreated")
            );
            
            append((new xui.UI.Pane)
                .setHost(host,"pane55")
                .setDock("center")
                .setLeft(40)
                .setTop(60)
                .setWidth(798)
                .setHeight(480)
            );
            
            host.pane55.append((new xui.UI.Tabs)
                .setHost(host,"tabs12")
                .setItems([{"id":"timeline", "caption":"TimeLine"}, {"id":"calendar", "caption":"Calendar"}])
                .setLeft(0)
                .setTop(0)
                .setValue("timeline")
            );
            
            host.tabs12.append((new xui.UI.Calendar)
                .setHost(host,"calendar1")
                .setLeft(10)
                .setTop(40)
                .setDropKeys("iEvent")
                .onDrop("_calendar1_ondrop")
            , 'calendar');
            
            host.tabs12.append((new xui.UI.TimeLine)
                .setHost(host,"timeline1")
                .setDock("fill")
                .setLeft(70)
                .setTop(120)
                .setUnitPixs(30)
                .setIncrement(30)
                .setTimeSpanKey("2 h")
                .setMultiTasks(true)
                .setDropKeys("iEvent")
                .setWidth(796)
                .beforeNewTask("_timeline1_beforeNewTask")
            , 'timeline');
            
            append((new xui.UI.Button)
                .setHost(host,"button13")
                .setLeft(470)
                .setTop(30)
                .setWidth(140)
                .setCaption("drag me to calendar")
                .setImage("img/task2.gif")
                .onRender("_button4_aftercreated")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _button3_aftercreated:function (profile) {
            profile.boxing().draggable('iEvent','task');
        }, 
        _button4_aftercreated:function (profile) {
            profile.boxing().draggable('iEvent','task2');
        }, 
        _calendar1_ondrop:function (profile, e, node, key, data, item) {
            var subId=profile.getSubId(node),
                d=profile.boxing().getDateFrom()
                d2=xui.Date.add(d,'d',parseInt(subId));
            if(data && data.profile)
                profile.getSubNode('DC',subId).append(data.profile.boxing());
            else{
                var img=new xui.UI.Image({
                    position:'relative',
                    src:'img/'+data+'.gif',
                    dragKey:'iEvent',
                    tips:'tips'
                }).setCustomClass('KEY','xui-task');
                profile.getSubNode('DC',subId).append(img);
            }
        }, 
        _onready:function () {
            xui.CSS.addStyleSheet(".xui-task{padding:1px;vertical-align:middle;}.xui-task-mouseover{padding:0;border:solid 1px #ccc;",'xui-task');
        }, 
        events:{"onReady":"_onready"}, 
        _timeline1_beforeNewTask:function (profile, task) {
            var o=task;
            if(xui.Date.diff(new Date(o.from), new Date(o.to),  'h')<3)
                o.to=xui.Date.add(new Date(o.from),'h',6).getTime();
            o.renderer=function(){return (o._dropData?"<img class='xui-task' src='img/"+o._dropData+".gif'>":"")+o.caption;}
        }
    }
});