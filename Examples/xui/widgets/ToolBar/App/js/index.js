
xui.Class('App', 'xui.Module',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.PopMenu)
                .setHost(host,"pop")
                .setItems(['item 1', 'item 2', 'item 3'])
            );
            
            append((new xui.UI.Pane)
                .setHost(host,"pane3")
                .setLeft(40)
                .setTop(50)
                .setWidth(700)
                .setHeight(160)
            );
            
            host.pane3.append((new xui.UI.ToolBar)
                .setHost(host,"toolbar5")
            .setItems([{"id":"grp1", "sub":[{"id":"a", "label":"normal button:", "caption":"button"},{"id":"b", "label":"image button:", "caption":"button",image:'img/demo.gif'},  {"id":"c", label:"image only:",image:'img/demo.gif' },{id:'btn',object: new xui.UI.CheckBox({caption:'checkbox'})}]},{"id":"grp2", "sub":[{"id":"d", label:'status button:',"caption":"status", "statusButton":true}, {"id":"e", label:'drop button:',"caption":"drop", "dropButton":true},{"split":true}, {id:'clr',object: new xui.UI.ComboInput({type:'color'})},{"split":true}, {id:'date',object: new xui.UI.ComboInput({type:'date'})},{"split":true}, {id:'date',object: new xui.UI.ComboInput({type:'time'})}]},{id:'grp3',sub:[{id:'radio',object: new xui.UI.ProgressBar({value:75})},{id:'btn',object: new xui.UI.Button({caption:'status button',type:'status'})},{id:'btn2',object: new xui.UI.Button({caption:'drop button',type:'drop'})}]},{id:'grp4',sub:[{id:'radio',object:new xui.UI.RadioBox({width:'auto',height:'auto',items:['radio1','radio2','radio3','radio4']},{onRender:function(prf){
                prf.getRoot().setInlineBlock()
                }})}]}])
                .onClick("_toolbar5_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _toolbar5_onclick:function (profile, item, group, e, src) {
            switch(item.id){
                case 'd':
                    xui.message(item.caption + " was clicked!" + " value was changed to " + item.value);
                break;
                case 'e':
                    this.pop.pop(src);
                break;
                default:
                    xui.message(item.caption + " was clicked!");
            }
        }
    }
});