
Class('App', 'xui.Com',{
    Instance:{
        events:{onReady:'_onready'}, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
append((new xui.UI.TreeGrid)
                .setHost(host,"tg1")
                .setRowNumbered(true)
                .setEditable(true)
                .setAnimCollapse(true)
                .setHeader([])
                .setRows([])
                .setColMovable(true)
                .setColHidable(true)
                .setDropKeys("abc")
                .setDragKey("abc")
                .beforeComboPop("_tg1_beforeComboPop")
                .onClickCell("_tg1_onClickcell")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _tg1_onClickcell:function(profile, cell){
            xui.message(cell._row.id+'/'+cell._col.id+' clicked!');
        },
        _tg1_beforeComboPop:function(profile, cell, proEditor){
            switch(profile.box.getCellOption(profile, cell, 'type')){
                case 'getter':
                    proEditor.boxing().setUIValue(xui.rand());
                return false;
                case 'cmdbox':
                case 'popbox':
                    xui.message(cell._row.id+'/'+cell._col.id+' button clicked!');
                return false;
            }
        },
        iniResource:function (com, threadid) {
            xui.Ajax('App/js/grid1.js',"",function(rsp){
                com._data=rsp;
            },function(){},threadid).start();
        }, 
        _onready:function (com, threadid) {
            xui.UI.cacheData('demo',[{id:'a',caption:'cap a',image:'img/img.gif'},{id:'b',caption:'cap b',image:'img/img.gif',imagePos:'left -16px'},{id:'c',caption:'cap c',image:'img/img.gif',imagePos:'left -32px'}]);

            SPA=this;
            var hash=com._data;
            SPA.tg1.setHeader(hash.header)
               .setRows(hash.rows);
        }
    }
});