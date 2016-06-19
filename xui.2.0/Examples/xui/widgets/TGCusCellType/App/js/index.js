Class('App', 'xui.Com',{
    Instance:{
        events:{"onReady":"_onready"}, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Panel)
                .setHost(host,"panel4")
                .setDock("none")
                .setLeft(120)
                .setTop(70)
                .setWidth(540)
                .setHeight(370)
                .setZIndex(1)
                .setCaption("customize cell type")
            );
            
            host.panel4.append((new xui.UI.TreeGrid)
                .setHost(host,"treegrid")
                .setRowHandler(false)
                .setRowResizer(false)
                .setColHidable(true)
                .setColMovable(true)
            );
            
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _onready:function (com, threadid) {
            this.treegrid
            .setHeader([
                {
                    "id" : "col2",
                    "caption" : "desc"
                },
                {
                    "id" : "col2",
                    "caption" : "checkbox",
                    "type" : "checkbox"
                },
                {
                    "id" : "col3",
                    "caption" : "input",
                    "type" : "input"
                },
                {
                    "id" : "col4",
                    "caption" : "color",
                    "type" : "color"
                }
            ])
            .setRows([
                {
                    id:'row1',
                    cells:['type in column',true,'abc','#FFFFFF']
                },
                {
                    id:'row2',
                    type:'checkbox',
                    cells:[{type:'label',value:'type in row'},true,false,true]
                },
                {
                    id:'row3',
                    cells:[
                        'type in cell',
                        {value:true,type:'checkbox'},
                        {value:'#F00FFF',type:'color'},
                        {value:'def',type:'input'}
                    ]
                }
            ]);
        }
    }
});