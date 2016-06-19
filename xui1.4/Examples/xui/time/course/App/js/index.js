
Class('App', 'xui.Com',{
    Instance:{
        events:{"onReady":"_onready", "onRender":"_onrender"}, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Pane)
                .setHost(host,"pane3")
                .setTop(10)
                .setWidth(780)
                .setHeight(640)
                .setPosition("relative")
                .setCustomClass({"KEY":"hcenter"})
            );
            
            host.pane3.append((new xui.UI.Pane)
                .setHost(host,"pane8")
                .setLeft(230)
                .setTop(84)
                .setWidth(547)
                .setHeight(175)
                .setCustomStyle({"KEY":"border:solid 1px #ccc;"})
            );
            
            host.pane8.append((new xui.UI.TreeGrid)
                .setHost(host,"treegrid2")
                .setRowNumbered(true)
                .setHeader([{"id":"course", "type":"label","width":240}, {"id":"from", "type":"date", "width":100}, {"id":"to", "type":"date", "width":100}, {"type":"button", "id":"remove", "width":45, "cellClass":"gridbutton"}])
                .setDropKeys("iEvent2")
                .setRowHandlerWidth(40)
                .onClickCell("_treegrid2_onclickcell")
                .onDrop("_od")
            );
            
            host.pane3.append((new xui.UI.TimeLine)
                .setHost(host,"timeline1")
                .setLeft(0)
                .setTop(265)
                .setWidth(780)
                .setHeight(260)
                .setReadonly(true)
                .setDftTaskName("course")
                .setTaskHeight(50)
                .setMultiTasks(true)
                .setDateBtn(false)
                .onGetContent("_timeline1_ongetcontent")
                .beforeNewTask("_timeline1_beforeNewTask")
                .beforeDragTask("_timeline1_beforedrag")
            );
            
            host.pane3.append((new xui.UI.Label)
                .setHost(host,"label1")
                .setLeft(480)
                .setTop(60)
                .setCaption("Your selection")
                .setFontSize("14px")
                .setFontWeight("bold")
            );
            
            host.pane3.append((new xui.UI.Button)
                .setHost(host,"button3")
                .setLeft(620)
                .setTop(20)
                .setWidth(150)
                .setCaption("Approve this request")
                .onClick("_button3_onclick")
            );
            
            host.pane3.append((new xui.UI.DatePicker)
                .setHost(host,"date1")
                .setLeft(0)
                .setTop(87)
                .afterUIValueSet("_date1_afteruivalueset")
            );
            
            host.pane3.append((new xui.UI.Label)
                .setHost(host,"label4")
                .setLeft(20)
                .setTop(10)
                .setWidth(480)
                .setHeight(30)
                .setCaption("Mr. xxx, welcom to training online management")
                .setHAlign("left")
                .setFontSize("14px")
                .setFontWeight("bold")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _timeline1_beforeNewTask:function (profile, task) {
        }, 
        _timeline1_beforedrag:function(profile, item,e,src){
            xui(src).startDrag(e, {
                dragDefer:1,
                dragCursor:'default',
                dragType:'icon',
                shadowFrom:xui.use(src).parent(),
                dragKey:'iEvent2',
                dragData:item
            });
            return false;
        }, 
        _od:function(profile,e,src,key,data,item){
            this._select(data);
        }, 
        _selectFromNode:function(src){
            var item=this.timeline1.getItemByDom(src);
            if(item)
                SPA._select(item, src);
        }, 
        _select:function(data, src){
            var grid=this.treegrid2,
                rows=grid.getRows(),
                index=_.arr.subIndexOf(rows,'id',data.id);
            if(index!=-1){
                xui.message('You\'ve selected it already!');
                return;
            }

            if(SPA.inSelectProcess)return;
            SPA.inSelectProcess=true;

            var item={id:data.id, cells:[data.value,data.from,data.to,'X']};
            {
                src = src||SPA.timeline1.getSubNodeByItemId('ITEM',data.id);
                var pos=xui(src).offset(),
                    size=xui(src).cssSize(),
                    body=SPA.treegrid2.getSubNode('BODY'),
                    last=body.last(),
                    width=body.parent().width(),
                    tpos;
                if(last.isEmpty()){
                    tpos=body.offset();
                }else{
                    tpos=last.offset();
                    tpos.top+=last.height();
                }
                xui.Dom.animate({border:'dashed 1px #ff0000'},{left:[pos.left,tpos.left],top:[pos.top,tpos.top],width:[size.width,width],height:[size.height, 20]}, null,function(){
                    grid.insertRows([item]);
                    SPA.inSelectProcess=false;
                },300,0,'expoOut').start();
            }

        }, 
        _button3_onclick:function (profile, e, src, value) {
            alert('This is for manager to approve the current selection.');
        }, 
        _date1_afteruivalueset:function (profile, oldValue, newValue) {
            this.timeline1.setDateStart(newValue);
        }, 
        _onrender:function(){
            SPA.date1.setUIValue(new Date);
        },
        _onready:function () {
            SPA=this;
            xui.CSS.addStyleSheet('.gridbutton button{border:0} .hcenter{margin:0 auto;}')
            SPA.timeline1.setMinDate(new Date());

            var arr=SPA.courses=[],
                d=xui.Date.getTimSpanStart(new Date(),'d'),
                renderer=function(v){
                    v.caption="<strong>"+v.value+"</strong><p>"+v.location+"</p>";
                    return "<strong>"+v.value+"</strong><button onclick='SPA._selectFromNode(this.parentNode)' >select</button><p>"+v.location+"</p>";
                };
            arr.push({
                id:_.id(),
                from:xui.Date.add(d,'d',1).getTime(),
                to:xui.Date.add(d,'d',4).getTime(),
                value:'Module 1',
                location:'[Beijing xxx Hotel]',
                renderer:renderer
            },{
                id:_.id(),
                from:xui.Date.add(d,'d',1).getTime(),
                to:xui.Date.add(d,'d',4).getTime(),
                value:'Module 1',
                location:'[Shanghai xx Hotel]',
                background:'#00ff00;',
                renderer:renderer
            },{
                id:_.id(),
                from:xui.Date.add(d,'d',5).getTime(),
                to:xui.Date.add(d,'d',8).getTime(),
                value:'Module 2',
                location:'[Beijing xxx Hotel]',
                renderer:renderer
            },{
                id:_.id(),
                from:xui.Date.add(d,'d',10).getTime(),
                to:xui.Date.add(d,'d',13).getTime(),
                value:'Module 3',
                location:'[Beijing xxx Hotel]',
                renderer:renderer
            });
        }, 
        _treegrid2_onclickcell:function (profile, cell,  e, src) {
            if(cell._col.id=='remove'){
                xui.UI.Dialog.confirm('confirm','Do you mean to remove the course?',function(){
                    profile.boxing().removeRows([cell._row.id]);
                });
            }
        }, 
        _timeline1_ongetcontent:function (profile, from, to, minMs, type, callback) {
            var datasource=SPA.courses;
 
            from=from.getTime();
            to=to.getTime();
            var tasks=[];
            if(type=='ini'){
                _.arr.each(datasource,function(o){
                    if(o.to >= from && o.from < to && (o.to - o.from > minMs))
                        tasks.push(o);
                });
            }else if(type=='left'){
                _.arr.each(datasource,function(o){
                    if(o.to >= from && o.to < to && (o.to - o.from > minMs))
                        tasks.push(o);
                });
            }else{
                _.arr.each(datasource,function(o){
                    if(o.from >= from && o.from < to && (o.to - o.from > minMs))
                        tasks.push(o);
                });
            }
            var arr = _.clone(tasks);
            profile.boxing().addTasks(arr);
        }
    }
});