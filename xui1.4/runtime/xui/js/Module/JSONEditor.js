Class('xui.Module.JSONEditor', 'xui.Module',{
    Instance:{ 
        _index:0,  
        setValue:function(str){
            var ns=this,
                obj=_.unserialize(str),
                rows=ns._json2rows(obj);
            ns.tg.insertRows(rows).free();
        },
        getValue:function(){
            var rows=this.tg.getRows();
            return this._rows2json(rows);
        },
        getEditor:function(){
            return this.tg;
        },
        iniComponents:function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.TreeGrid")
                .setHost(host,"tg")
                .setEditable(true)
                .setIniFold(false)
                .setRowHandler(false)
                .setColSortable(false)
                .setHeader([{
                    "id" : "key",
                    "width" : 100,
                    "type" : "input",
                    "caption" : "key",
                    "editorCacheKey" : "input",
                    "flexSize" : true
                },{
                    "id" : "value",
                    "width" : 200,
                    "type" : "textarea",
                    "caption" : "value",
                    "editorCacheKey" : "textarea",
                    "flexSize" : true
                }])
                .setTagCmds([{
                    "id" : "add",
                    "type" : "text",
                    "caption" : "↯",
                    "location" : "right",
                    "tag" : "header row",
                    "tips" : "Append a child"
                },{
                    "id" : "up",
                    "type" : "text",
                    "caption" : "↑",
                    "location" : "right",
                    "tag" : "row",
                    "tips" : "Add a node to the front of the node"
                },{
                    "id" : "down",
                    "type" : "text",
                    "location" : "right",
                    "caption" : "↓",
                    "tag" : "row",
                    "tips" : "Add a node at the back of this node"
                },{
                    "id" : "del",
                    "type" : "text",
                    "location" : "right",
                    "caption" : "✕",
                    "tag" : "row",
                    "tips" : "Delete this node"
                }])
                .setTreeMode("infirstcell")
                .onCmd("_tg_oncmd")
                .beforeIniEditor("_tg_beforeIniEditor")
                .onBeginEdit("_tg_onEdit")
                .beforeCellUpdated("_tg_beforecellupdated")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },
        _getCellValue:function(n){
            var ns=this, v;
            try{
                v=_.str.trim(n);
                //special string
                if(/^'/.test(v) && !ns._isString(v.slice(1))){
                    v=['string', v.slice(1)];
                }else{
                    v=v.replace(/^\s*/,'').replace(/\s*$/,'');
                    v= v=='null'? ['null','null'] :
                      //number
                        _.isFinite(v) ? ['number',v]  :
                      //reg
                        /^\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*$/.test(v) ? ['regexp', v]  :
                      //bool
                        /^(true|false)$/.test(v) ? ['boolean',v.toLowerCase()] :
                      //date
                        /^new Date\([0-9 \,]*\)$/i.test(v) ? ['date', _.serialize(_.unserialize(v))] :
                      //function
                        /^((function\s*([\w$]+\s*)?\(\s*([\w$\s,]*)\s*\)\s*)(\{([^\{\}]*)\}))$/i.test(v) ? ['function',v] :
                      //hash
                        /^\{[\s\S]*\}$/.test(v) ? ['hash',_.stringify(_.unserialize(v))] :
                      //array
                        /^\[[\s\S]*\]$/.test(v) ? ['array', _.stringify(_.unserialize(v))] :
                      ['string', n];
                  }
              }catch(e){
                  v=null;
              }
              if(v[0]=='string'){
                if(v[1]===false)
                    return null;
                v[1]=_.stringify(v[1]);
            }
            if(v[1]==="false" && v[0]!='string')
                v[0]='boolean';
            return v;
        },
        _json2rows:function(obj,array,rows){
            var ns=this, me=arguments.callee;
            if(!rows)rows=[];
            _.each(obj,function(o,i){
                var row={},type=ns._getType(o);
                i={value:array?'[index]':i,disabled:array};

                if(type=='hash'){
                    row.sub=[];
                    row.cells=[i,{value:'{...}'},''];
                    me.call(ns, o,false,row.sub);
                }else if(type=='array'){
                    row.sub=[];
                    row.cells=[i,{value:'[...]'},''];
                    me.call(ns, o,true,row.sub);
                }else{
                    ns._getType(o);
                    row.cells=[i,_.stringify(o),''];
                }
                row._type=type;
                row.caption="";
                rows.push(row);
            });
            return rows;
        },
        _getType:function(o){
            return o===null?null:
                    _.isStr(o)?'string':
                    _.isNumb(o)?'number':
                    _.isHash(o)?'hash':
                    _.isArr(o)?'array':
                    _.isBool(o)?'boolean':
                    _.isDate(o)?'date':
                    _.isReg(o)?'regexp':
                    _.isFun(o)?'function':
                    'undefined';
        },
        _rows2json:function(arr,array){
            var me=arguments.callee,
                a=[], key,value;
            _.arr.each(arr, function(o){
                key=((typeof o.cells[0]=='object')?o.cells[0].value:o.cells[0]);
                if(o._type=='hash')
                    value=me(o.sub);
                else if(o._type=='array')
                    value=me(o.sub, true);
                else
                    value=(typeof o.cells[1]=='object')?o.cells[1].value:o.cells[1];
                if(array)
                    a.push(value);
                else
                    a.push('"'+key + '":' + value);
            });
            return array ? '['+a.join(',')+']' : '{'+a.join(',')+'}';
        },
        _tg_onEdit:function(profile, obj, editor, type){
            editor.getSubNode("INPUT").css("font-size", "16px").scrollTop(0);
        },
            // for value 
        _tg_beforeIniEditor:function(profile, obj, cellNode, pNode, type){
            var ns=this;
            if(type!='cell')return;
            if(obj._col.id!='value')return;

            var type=obj._row._type;
            if(type=='hash'||type=='array'){
                obj.$editorValue = xui.Coder.formatText(this._rows2json(obj._row.sub, type=='array'));
            }else if(type=='string'){
                var v=_.unserialize(obj.value);
                      //number
                if(  !ns._isString(v) ){
                    obj.$editorValue = "'" + v;
                }else{
                    obj.$editorValue = v;
                }
            }
        },
        _isString:function(v){
            return !(v=='undifined' || v=='null' || v=='NaN' ||
                       _.isFinite(v) ||
                      //reg
                        /^\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*$/.test(v)  ||
                      //bool
                        /^(true|false)$/.test(v)  ||
                      //date
                        /^new Date\([0-9 \,]*\)$/i.test(v)  ||
                      //function
                        /^((function\s*([\w$]+\s*)?\(\s*([\w$\s,]*)\s*\)\s*)(\{([^\{\}]*)\}))$/i.test(v)  ||
                      //hash
                        /^\{[\s\S]*\}$/.test(v)  ||
                      //array
                        /^\[[\s\S]*\]$/.test(v)  );
        },
        _tg_beforecellupdated:function (profile, cell, options) {
            var map={'hash':1,'array':2},
                row=cell._row,
                rowId=row.id,
                tg=profile.boxing();
            if(cell._col.id=='value'){
                var  va=this._getCellValue(options.value);
                if(!va){
                    alert('Text format is not valid!');
                    return false;
                }else{
                    var ops={};
                    options.value=va[1];
                    
                    if(map[va[0]]){
                        ops.sub=this._json2rows(_.unserialize(va[1]),va[0]=='array');
                        options.caption=va[0]=='hash'?'{...}':'[...]';
                    }else{
                        ops.sub=null;
                    }
                    _.asyRun(function(){
                        tg.updateRow(rowId, ops);
                        // must get
                        row = tg.getRowbyRowId(rowId);
                        row._type=va[0];
                    },100);
                }
            }else{
                if(!/^"(\\.|[^"\\])*"$/.test('"'+options.value+'"')){
                    alert('Text format is not valid!');
                    return false;
                }
            }
        },
        _tg_oncmd:function (profile, row, cmdkey, e, src){
            var ns = this, 
                tg = profile.boxing(),
                type, nid;
            switch(cmdkey){
                case 'add': 
                    nid=_();
                    if(row){
                        type=_.get(profile.rowMap, [row._serialId,'_type']);
                        if(type=="array"||type=="hash"){
                            tg.insertRows([{id:nid, cells:[{value:type=='array'?'[index]':('new' + ++ns._index),disabled:type=='array'},'null','']}],row.id);
                        }else{
                            var id=row.id;
                            xui.confirm("Hash or Array", "Modify this node as an Hash or Array?",function(){
                                tg.updateCellByRowCol(id, "value", "{"+('new' + ++ns._index)+":"+row.cells[1].value+"}", false, true);
                                _.asyRun(function(){
                                    tg.editCellbyRowCol(id, "value");
                                },200);
                            },function(type){ 
                                if(type=='close')return;
                                var id=row.id;
                                tg.updateCellByRowCol(id, "value", "["+row.cells[1].value+"]", false, true);
                                _.asyRun(function(){
                                    tg.editCellbyRowCol(id,"value");
                                },200);
                            },'As a Hash','As an Array');
                        }
                    }else{
                        tg.insertRows([{id:nid, cells:['new' + ++ns._index,'null','']}]);
                    }
                    break;
                case 'up': 
                     nid=_();
                    if(row._pid) type=_.get(profile.rowMap, [row._pid,'_type']);
                    tg.insertRows([{id:nid, cells:[{value:type=='array'?'[index]':('new' + ++ns._index),disabled:type=='array'},'null','']}],null,row.id,true);
                    break;
                case 'down':
                     nid=_();
                    if(row._pid) type=_.get(profile.rowMap, [row._pid,'_type']);
                    tg.insertRows([{id:nid, cells:[{value:type=='array'?'[index]':('new' + ++ns._index),disabled:type=='array'},'null','']}],null,row.id,false);
                    break;
                case 'del': 
                   // xui.confirm('confirm','Do you want to delete this node?',function(){
                          tg.removeRows([row.id]);
                  //  });
                    break;
            }
            if( nid )
                _.asyRun(function(){
                    tg.editCellbyRowCol(nid+'', type=='array'?"value":"key");
                });
        } 
    }
});