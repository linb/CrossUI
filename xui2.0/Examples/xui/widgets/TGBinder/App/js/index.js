
Class('App', 'xui.Com',{
    Instance:{
        tg2page:0, 

        events:{"onReady":"_onready"}, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.Panel)
                .setHost(host,"panel4")
                .setDock("none")
                .setLeft(20)
                .setTop(10)
                .setWidth(770)
                .setHeight(630)
                .setZIndex(1)
                .setCaption("panel4")
            );
            
            host.panel4.append((new xui.UI.Layout)
                .setHost(host,"layout4")
                .setItems([{"id":"before", "pos":"before", "locked":false, "size":260, "min":50, "max":500, "folded":false, "cmd":false, "caption":"before"}, {"id":"main", "min":10, "caption":"main"}])
            );
            
            host.layout4.append((new xui.UI.TreeGrid)
                .setHost(host,"tg2")
                .setRowHandler(false)
                .afterRowActive("_tg2_afterRowActive")
                .setCustomStyle({"CELL":"border-right:none;padding-right:1px;", "CELL-GROUP":"border-right:none;padding-right:1px;", "PREVIEW":"border-right:none;padding-right:1px;", "SUMMARY":"border-right:none;padding-right:1px;"})
            , 'before');
            
            host.layout4.append((new xui.UI.Panel)
                .setHost(host,"FormBuilder")
                .setCaption("Form Builder")
            , 'main');
            
            host.layout4.append((new xui.UI.Button)
                .setHost(host,"button19")
                .setLeft(520)
                .setTop(50)
                .setWidth(130)
                .setZIndex(10)
                .setCaption("Update")
                .onClick("_button19_onclick")
            , 'main');
            
            host.layout4.append((new xui.UI.Block)
                .setHost(host,"block2")
                .setDock("bottom")
                .setHeight(30)
                .setCustomStyle({"BORDER":"border:solid 1px #CDCDCD;", "PANEL":"background-color:#F4F4F4;"})
            , 'before');
            
            host.block2.append((new xui.UI.PageBar)
                .setHost(host,"pagebar3")
                .setLeft(20)
                .setTop(3)
                .setValue("1:1:5")
                .onClick("_pagebar3_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _pagebar3_onclick:function (profile, page) {
            profile.boxing().setPage(page);

            SPA.tg2page=(page-1)||0;

            SPA.tg2.setRows(SPA.tg2data.slice(SPA.tg2page*5, (SPA.tg2page+1)*5));

            if(SPA.$dbBinder){
                SPA.$dbBinder.setData({}).updateDataToUI().getUI().setDisabled(true)
            }
            SPA.$curRow=null;

            return false;
        }, 
        _button19_onclick:function (profile, e, src, value) {
            if(SPA.$dbBinder && SPA.$curRow){
                if(SPA.$dbBinder.checkValid()){
                    if(SPA.$dbBinder.updateDataFromUI()){
                        var hash=SPA.$dbBinder.getData(), t;

                        //for listbox
                        var items=xui.UI.getCachedData('demo'),
                            index=xui.arr.subIndexOf(items,'id',hash.col7);
                        hash.col7={
                            value:hash.col7.value,
                            caption:items[index].caption
                        },
                        //for slider
                        hash.col11 =Math.round(hash.col11)/100;

                        xui.arr.each(SPA.$curRow.cells,function(cell){
                            t=hash[cell._col.id];
                            SPA.tg2.updateCellByRowCol(cell._row.id,cell._col.id,  typeof t=='object'?t:{value:t} );
                        });
                        SPA.tg2.resetRowValue(SPA.$curRow.id);
                        xui.message('data updated!');
                    }
                }
                else
                    xui.message('please correct input first!');
            }
        }, 
        _tg2_afterRowActive:function(profile, row){
            if(!row)return;
            if(!SPA.$dbBinder){
                SPA.$dbBinder = new xui.DataBinder();
                SPA.$dbBinder.setName('tr2');

                var cells=profile.properties.header,t,
                    ns=[],
                    name,widget,type,t;

                xui.arr.each(cells,function(o){
                    type=o.type;
                    ns.push(t=[o.caption]);

                    if(type=='checkbox')
                        widget=widget=new xui.UI.CheckBox();
                    else if(!type || type=='label')
                        widget=new xui.UI.Label({caption:o.caption});
                    else if(type=='button')
                        widget=new xui.UI.Button();
                    else if(type=='progress')
                        widget=new xui.UI.Slider({isRange:false,width:120});
                    else
                        widget=new xui.UI.ComboInput();

                    if(widget.setDataBinder)
                        widget.setDataBinder('tr2').setDataField(o.id);

                    t[1]=widget.get(0);

                    switch(type){
                        case 'number':
                            widget.setType('none').setCustomStyle('INPUT',"text-align:right;");
                            break;
                        case 'input':
                            widget.setType('none');
                            break;
                        case 'textarea':
                            widget.setType('none').setMultiLines(true).setWidth(200).setHeight(100);
                            break;
                        case 'listbox':
                        case 'combobox':
                        case 'helpinput':
                            widget.setType(type);
                            if(t=o.editorListKey)
                                widget.setListKey(t);
                            else if(t=o.editorListItems)
                                widget.setItems(t);
                            break;
                        case 'time':
                        case 'date':
                        case 'color':
                            widget.setType(type);
                            break;
                        case 'getter':
                        case 'popbox':
                        case 'cmdbox':
                            widget.setType(type);
                            break;
                    }


                    var editorFormat = o.editorFormat,
                        editorReadonly = o.editorReadonly;

                    if(widget.setReadonly)widget.setReadonly(!!editorReadonly);
                    if(editorFormat){
                        if(typeof editorFormat == 'function'){
                            if(widget.beforeFormatCheck)widget.beforeFormatCheck(editorFormat);
                        }else{
                            if(widget.setValueFormat)widget.setValueFormat(editorFormat);
                        }
                    }
                });

                var str='', nodes=[];

                xui.arr.each(ns,function(arr){
                    nodes.push(arr[1]);
                })
                nodes=xui.UI.pack(nodes,false);
                nodes.setPosition('relative');

                for(var i=0;i<ns.length;i+=2){
                    str += '<tr><td align="right" style="text-decoration:underline;">'+ ns[i][0] +"</td><td>"+ ns[i][1].toHtml() +'</td>';
                    if(ns[i+1])
                        str +='<td align="right"  style="text-decoration:underline;">'+ ns[i+1][0] +"</td><td>"+ ns[i+1][1].toHtml() +'</td>';
                    str +='</tr>';
                }

                SPA.FormBuilder.setHtml('<table cellspacing="4" style="border-spacing:10px;border-collapse:separate;">'+str+'</table>',false);
                nodes.render(true);
            }
            var hash={};
            SPA.$curRow=row;
            xui.arr.each(row.cells,function(o){
                hash[o._col.id]=o.value;
            });
            //for slider
            hash.col11=hash.col11*100;
            
            SPA.$dbBinder.setData(hash).updateDataToUI().getUI().setDisabled(false)
        }, 
        iniResource:function (com, threadid) {
            xui.Ajax('App/js/grid2.js',"",function(rsp){
                com._data=rsp;
            },function(){},threadid).start();
        }, 
        _onready:function (com, threadid) {
            xui.UI.cacheData('demo',[{id:'a',caption:'cap a',image:'img/img.gif'},{id:'b',caption:'cap b',image:'img/img.gif',imagePos:'left -16px'},{id:'c',caption:'cap c',image:'img/img.gif',imagePos:'left -32px'}]);

            SPA=this;
            var hash=com._data;
            SPA.tg2data=hash.rows;
            SPA.tg2.setHeader(hash.header)
               .setRows(SPA.tg2data.slice(SPA.tg2page*5, (SPA.tg2page+1)*5));
        }
    }
});