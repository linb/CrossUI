Class('App', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Layout)
                .setHost(host,"layout")
                .setDomId("ce_layout")
                .setItems([{"id":"before", "pos":"before", "locked":false, "size":200, "min":50, "max":400, "folded":false, "cmd":true, "caption":"before"}, {"id":"main", "min":10, "caption":"main"}])
                .setType("horizontal")
            );
            
            host.layout.append((new xui.UI.Layout)
                .setHost(host,"layout_r")
                .setDomId("ce_layout_r")
                .setItems([{"id":"main", "min":10, "caption":"main"}, {"id":"after", "pos":"after", "locked":false, "size":300, "min":50, "max":600, "folded":false, "cmd":true, "caption":"after"}])
            , 'main');
            
            host.layout_r.append((new xui.UI.Block)
                .setHost(host,"stage")
                .setDomId("ce_stage")
                .setDock("fill")
                .setBorderType("none")
                .setCustomStyle({"PANEL":"background:#fff;"})
            , 'main');
            
            host.stage.append((new xui.UI.Div)
                .setHost(host,"div17")
                .setLeft(150)
                .setTop(50)
                .setWidth(220)
                .setHeight(30)
            );
            
            host.layout_r.append((new xui.UI.Link)
                .setHost(host,"openinbuild")
                .setTop(10)
                .setRight(50)
                .setVisibility("hidden")
                .setCaption("Open it in CrossUI RAD Tools")
                .setTarget("_blank")
                .onClick("_openinbuild_onclick")
                .setCustomStyle({"KEY":"font-weight:bold;text-decoration:underline;"})
            , 'main');
            
            host.layout_r.append((new xui.UI.Block)
                .setHost(host,"blockCode")
                .setDomId("ce_blockCode")
                .setDock("fill")
                .setCustomStyle({"PANEL":"background:#F4F4F4;overflow:auto;"})
            , 'after');
            
            host.layout.append((new xui.UI.TreeBar)
                .setHost(host,"treebar")
                .setDomId("ce_treebar")
                .setAnimCollapse(true)
                .onItemSelected("_treebar_onitemselected")
            , 'before');
            
            append((new xui.UI.Block)
                .setHost(host,"blockTop")
                .setDock("top")
                .setHeight("30")
                .setBorderType('none')
                .setBorder(true)
                .setHtml('<div style="text-align:center;font-size:20px;line-height:28px;">CrossUI Code Snippets</div>')
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _onready:function () {
            Class("Component");
            var ns=this;
            ns.treebar.setItems(CONF.widgets);
            xui.History.setCallback(function(str){
                if(str){
                    ns.treebar.setValue(str, true);
                    //fire event
                    ns.treebar.onItemSelected(ns.treebar.get(0), {id: str} );
                }
            })
        }, 
        _treebar_onitemselected:function (profile, item) {
            var host=this,
                id = 'Classes.'+item.id,
                clsName = 'App.'+item.id.replace(/\./g,'_'),
                path = xui.getPath(id,'.js'),
                message = 'Getting file from <strong>"' + path + '"</strong>...',
                fail = function(msg){
                    if(!msg)
                        msg = 'Related file <strong>"' + path + '"</strong> doesn\'t exists, or has invalid format!';
                    host.stage.setHtml(msg);
                    host.blockCode.setHtml(msg);
                    host.openinbuild.setVisibility('hidden');
                    
                };

            //destroy the instance
            if(host._instance){
                host._instance.destroy();
                delete host._instance;
            }
            //destroy the Class
            if(host._class){
                host._class.__gc();
                delete host._class;
            }

            //set loading... message
            host.stage.setHtml(message);
            host.blockCode.setHtml(message);

            xui.History.setFI(item.id, false)

            xui.Thread.observableRun(function(threadid){
                //get com
                xui.Ajax(path,"",function(txt){
                    try{
                        //set code
                        host.blockCode.setHtml(xui.Coder.formatHTML(txt,'js',['plain']));
                        //get instance
                        _.exec(txt);
                        var obj=xui.SC.get(clsName);
                        if(obj){
                            host._class=obj;
                            var o = host._instance = new obj();
                            o.create(function(){
                                //show UI
                                host.stage.getSubNode('PANEL').empty();
                                host.stage.append(this);
                            });
                            host.openinbuild.setVisibility('visible');
                            
                            var path='http://www.crossui.com/RAD/Builder.html';
//                            host.openinbuild.setHref(path + "#url=" + encodeURIComponent(path))
                            
                            host.$path=path;
                        }else
                            fail();
                    }catch(e){
                        fail(String(e));
                    }
                },function(msg){
                    fail()
                },threadid,{rspType:'text'}).start();
            });

        }, 
        events:{"onReady":"_onready"}, 
        _openinbuild_onclick:function (profile, e) {
            return true;
        }
    }
});