xui.Class('App', 'xui.Module',{
    Instance:{
        _cache:{},
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Pane)
                .setHost(host,"pane16")
                .setLeft(20)
                .setTop(40)
                .setWidth(520)
                .setHeight(300)
            );
            
            host.pane16.append((new xui.UI.MenuBar)
                .setHost(host,"menubar2")
                .setItems([{"id":"menu1", "sub":[{"id":"normal", "caption":"normal"}, {"id":"disabled", "caption":"disabled", "disabled":true}, {"id":"image", "caption":"iimage"}, {"id":"sub menu 1", "caption":"sub menu 1", "sub":
                    [{
                        id:"sub 1",
                        type:"radiobox"
                    }, {
                        id:"sub 2",
                        type:"radiobox"
                    }, {
                        id:"sub 3"
                    }]
                    }, {"id":"sub menu 2", "caption":"sub menu 2", "sub":["sub 3", "sub 4"]}, {"type":"split"}, {"id":"checkbox 1", "caption":"checkbox 1", "type":"checkbox"}, {"id":"checkbox 2", "caption":"checkbox 2", "type":"checkbox"}, {"type":"split"}, {"id":"date", "caption":"date ", "sub":true}, {"id":"time", "caption":"time ", "sub":true}, {"id":"color", "caption":"color ", "sub":true}, {"id":"customized pop", "caption":"customized pop", "sub":true}], "caption":"advanced pop"}, {"id":"lots items", "sub":["item 1", "item 2", "item 3", "item 4", "item 5", "item 6", "item 7", "item 8", "item 9", "item 10", "item 11", "item 12", "item 13", "item 14", "item 15", "item 16", "item 17", "item 18", "item 19"], "caption":"more items"}])
                .onShowSubMenu("_menubar2_onshowsubmenu")
                .onMenuSelected("_menubar2_onmenuselected")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _menubar2_onshowsubmenu:function (profile, popProfile, item, src) {
            var menubar=profile.boxing(),
                obj=this._cache[item.id];
            if(!obj){
                switch(item.id){
                    case 'date':
                        obj=(new xui.UI.DatePicker).render(true);
                        obj.beforeClose(function(p){ 
                           p.boxing().hide(); 
                           return false; 
                        })
                        .afterUIValueSet(function(p, old, n){ 
                           menubar.onMenuSelected(profile,p,{
                              id : item.id, 
                              value : n 
                           });
                           menubar.hide(); 
                        });
                    break;
                    case 'time':
                        obj=(new xui.UI.TimePicker).render(true);
                        obj.beforeClose(function(p){ 
                           p.boxing().hide(); 
                           return false; 
                        })
                        .afterUIValueSet(function(p, old, n){ 
                           menubar.onMenuSelected(profile,p,{
                              id : item.id, 
                              value : n 
                           });
                           menubar.hide(); 
                        });
                    break;
                    case 'color':
                        obj=(new xui.UI.ColorPicker).render(true);
                        obj.beforeClose(function(p){ 
                           p.boxing().hide(); 
                           return false; 
                        })
                        .afterUIValueSet(function(p, old, n){ 
                           menubar.onMenuSelected(profile,p,{
                              id : item.id, 
                              value : n 
                           });
                           menubar.hide(); 
                        });
                    break;
                    case 'customized pop':
                        obj=xui.create({key:'xui.UI.Panel',properties:{dock:'none',width:200,heihgt:300},children:[[{
                            key:'xui.UI.TreeBar',
                            properties:{
                                items:['a','b',{id:'c',sub:['c1', 'c2']}]
                            },
                            events:{
                                onItemSelected:function(p, item){
                                   menubar.onMenuSelected(profile,p,{
                                      id : 'customized pop',
                                      value : item.id
                                   });
                                   menubar.hide();
                                }
                            }
                        }]]});
                    break;
                }
                this._cache[item.id]=obj;
            }
            return obj;
        }, 
        _menubar2_onmenuselected:function (profile, subprf, item, src) {
            xui.message((item.id||'')+ ' ' + (item.value||''));
        }
    }
});