Class('App.Table', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
                        
            append((new xui.UI.Block)
                .setHost(host,"block1")
                .setDock("bottom")
                .setHeight(30)
            );
                        
            append((new xui.UI.TreeGrid)
                .setHost(host,"treegrid3")
                .setRowNumbered(true)
            );

            host.block1.append((new xui.UI.PageBar)
                .setHost(host,"pagebar1")
                .setLeft(20)
                .setTop(4)
                .onClick("_pagebar1_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        clear:function(){
            if(this.treegrid3)this.treegrid3.setHeader([]);
        }, 
        getList:function(page){
            if(!page)page=1;

            var me=this, tagVars = me.tagVars;
            SPA.request({action:'list', dbname:tagVars._dbname, tablename:tagVars._tablename, page: tagVars._page, coutnt: tagVars._count},function(rsp){
                var pc = parseInt(rsp.data[0][0][0])||1;
                me.pagebar1.setValue([1,page,Math.ceil(pc/tagVars._count)].join(':'));

                var data=rsp.data[1];

                var header = me.treegrid3.getHeader(),arr=[],a=[],b,rows=[];

                _.arr.each(data,function(o){
                    a=[];
                    _.each(o,function(v,i){
                        if(!b)arr.push(i);
                        a.push(v);
                    });
                    b=1;
                    rows.push(a);
                });

                if(!header.length)
                    me.treegrid3.setHeader(arr)
                me.treegrid3.setRows(rows);
            });
        }, 
        _pagebar1_onclick:function (profile, page) {
            var tagVars = this.tagVars, me=this;
            tagVars._page = page;
            me.getList(page);
        }
    }
});