Class('App', 'xui.Module',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel3")
                .setDock("none")
                .setLeft("0.833333em")
                .setTop("0.833333em")
                .setWidth("65em")
                .setHeight("22.5em")
                .setZIndex(1)
                .setCaption("TreeGrid Edit Mode")
            );
            
            host.xui_ui_panel3.append(
                xui.create("xui.UI.TreeGrid")
                .setHost(host,"xui_ui_treegrid3")
                .setLeft("0em")
                .setTop("0em")
                .setRowNumbered(true)
                .setEditable(true)
                .setGridHandlerCaption("Edit Mode")
                .setRowHandlerWidth("10em")
                .setHeader([{
                    "caption":"checkbox",
                    "type":"checkbox",
                    "id":"a",
                    "width":"8em"
                },
                {
                    "caption":"input",
                    "type":"input",
                    "id":"b",
                    "width":"8em"
                },
                {
                    "caption":"combobox",
                    "type":"combobox",
                    "editorListItems":[{
                        "id":"a",
                        "caption":"item a"
                    },
                    {
                        "id":"b",
                        "caption":"item b"
                    }],
                    "id":"c",
                    "width":"8em"
                },
                {
                    "caption":"listbox",
                    "type":"listbox",
                    "editorListItems":[{
                        "id":"a",
                        "caption":"item a"
                    },
                    {
                        "id":"b",
                        "caption":"item b"
                    }],
                    "id":"d",
                    "width":"8em"
                },
                {
                    "caption":"dropbutton",
                    "type":"dropbutton",
                    "id":"e",
                    "width":"8em"
                },
                {
                    "caption":"cmdbox",
                    "type":"cmdbox",
                    "id":"f",
                    "width":"8em"
                },
                {
                    "caption":"popbox",
                    "type":"popbox",
                    "id":"g",
                    "width":"8em"
                },
                {
                    "caption":"label",
                    "type":"label",
                    "id":"h",
                    "width":"8em"
                },
                {
                    "caption":"button",
                    "type":"button",
                    "id":"j",
                    "width":"8em"
                },
                {
                    "caption":"textarea",
                    "type":"textarea",
                    "id":"k",
                    "width":"8em"
                },
                {
                    "caption":"helpinput",
                    "type":"helpinput",
                    "editorListItems":[{
                        "id":"a",
                        "caption":"item a"
                    },
                    {
                        "id":"b",
                        "caption":"item b"
                    }],
                    "id":"l",
                    "width":"8em"
                },
                {
                    "caption":"file",
                    "type":"file",
                    "id":"m",
                    "width":"8em"
                },
                {
                    "caption":"getter",
                    "type":"getter",
                    "id":"n",
                    "width":"8em"
                },
                {
                    "caption":"date",
                    "type":"date",
                    "id":"o",
                    "width":"8em"
                },
                {
                    "caption":"time",
                    "type":"time",
                    "id":"p",
                    "width":"8em"
                },
                {
                    "caption":"datetime",
                    "type":"datetime",
                    "id":"q",
                    "width":"8em"
                },
                {
                    "caption":"color",
                    "type":"color",
                    "id":"r",
                    "width":"8em"
                },
                {
                    "caption":"spin",
                    "type":"spin",
                    "id":"s",
                    "width":"8em"
                },
                {
                    "caption":"counter",
                    "type":"counter",
                    "id":"t",
                    "width":"8em"
                },
                {
                    "caption":"currency",
                    "type":"currency",
                    "id":"u",
                    "width":"8em"
                },
                {
                    "caption":"number",
                    "type":"number",
                    "id":"v",
                    "width":"8em"
                },
                {
                    "caption":"progress",
                    "type":"progress",
                    "id":"w",
                    "width":"8em"
                }])
                .setRows([{
                    "caption":"none",
                    "editMode":"none",
                    "editable":false,
                    "cells":[{
                        "value":true
                    },
                    {
                        "value":"input"
                    },
                    {
                        "value":"item a"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"dropbutton"
                    },
                    {
                        "value":"cmdbox"
                    },
                    {
                        "value":"popbox"
                    },
                    {
                        "value":"label"
                    },
                    {
                        "value":"button"
                    },
                    {
                        "value":"textarea"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"file"
                    },
                    {
                        "value":"getter"
                    },
                    {},
                    {
                        "value":"10:10"
                    },
                    {},
                    {
                        "value":"#FFFFFF"
                    },
                    {
                        "value":0.22
                    },
                    {
                        "value":1.11
                    },
                    {
                        "value":20.99
                    },
                    {
                        "value":1.23
                    },
                    {
                        "value":0.78
                    }]
                },
                {
                    "caption":"focus mode",
                    "editMode":"focus",
                    "cells":[{
                        "value":true
                    },
                    {
                        "value":"input"
                    },
                    {
                        "value":"item a"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"dropbutton"
                    },
                    {
                        "value":"cmdbox"
                    },
                    {
                        "value":"popbox"
                    },
                    {
                        "value":"label"
                    },
                    {
                        "value":"button"
                    },
                    {
                        "value":"textarea"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"file"
                    },
                    {
                        "value":"getter"
                    },
                    {},
                    {
                        "value":"10:10"
                    },
                    {},
                    {
                        "value":"#FFFFFF"
                    },
                    {
                        "value":0.22
                    },
                    {
                        "value":1.11
                    },
                    {
                        "value":20.99
                    },
                    {
                        "value":1.23
                    },
                    {
                        "value":0.78
                    }]
                },
                {
                    "caption":"sharp mode",
                    "editMode":"sharp",
                    "cells":[{
                        "value":true
                    },
                    {
                        "value":"input"
                    },
                    {
                        "value":"item a"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"dropbutton"
                    },
                    {
                        "value":"cmdbox"
                    },
                    {
                        "value":"popbox"
                    },
                    {
                        "value":"label"
                    },
                    {
                        "value":"button"
                    },
                    {
                        "value":"textarea"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"file"
                    },
                    {
                        "value":"getter"
                    },
                    {},
                    {
                        "value":"10:10"
                    },
                    {},
                    {
                        "value":"#FFFFFF"
                    },
                    {
                        "value":0.22
                    },
                    {
                        "value":1.11
                    },
                    {
                        "value":20.99
                    },
                    {
                        "value":1.23
                    },
                    {
                        "value":0.78
                    }]
                },
                {
                    "caption":"hover mode",
                    "editMode":"hover",
                    "cells":[{
                        "value":true
                    },
                    {
                        "value":"input"
                    },
                    {
                        "value":"item a"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"dropbutton"
                    },
                    {
                        "value":"cmdbox"
                    },
                    {
                        "value":"popbox"
                    },
                    {
                        "value":"label"
                    },
                    {
                        "value":"button"
                    },
                    {
                        "value":"textarea"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"file"
                    },
                    {
                        "value":"getter"
                    },
                    {},
                    {
                        "value":"10:10"
                    },
                    {},
                    {
                        "value":"#FFFFFF"
                    },
                    {
                        "value":0.22
                    },
                    {
                        "value":1.11
                    },
                    {
                        "value":20.99
                    },
                    {
                        "value":1.23
                    },
                    {
                        "value":0.78
                    }]
                },
                {
                    "caption":"hoversharp mode",
                    "editMode":"hoversharp",
                    "cells":[{
                        "value":false
                    },
                    {
                        "value":"input"
                    },
                    {
                        "value":"item a"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"dropbutton"
                    },
                    {
                        "value":"cmdbox"
                    },
                    {
                        "value":"popbox"
                    },
                    {
                        "value":"label"
                    },
                    {
                        "value":"button"
                    },
                    {
                        "value":"textarea"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"file"
                    },
                    {
                        "value":"getter"
                    },
                    {},
                    {
                        "value":"10:10"
                    },
                    {},
                    {
                        "value":"#FFFFFF"
                    },
                    {
                        "value":0.22
                    },
                    {
                        "value":1.11
                    },
                    {
                        "value":20.99
                    },
                    {
                        "value":1.23
                    },
                    {
                        "value":0.78
                    }]
                },
                {
                    "caption":"inline mode",
                    "editMode":"inline",
                    "iniFold":false,
                    "cells":[{
                        "value":false
                    },
                    {
                        "value":"input"
                    },
                    {
                        "value":"item a"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"dropbutton"
                    },
                    {
                        "value":"cmdbox"
                    },
                    {
                        "value":"popbox"
                    },
                    {
                        "value":"label"
                    },
                    {
                        "value":"button"
                    },
                    {
                        "value":"textarea"
                    },
                    {
                        "value":"a"
                    },
                    {
                        "value":"file"
                    },
                    {
                        "value":"getter"
                    },
                    {},
                    {
                        "value":"10:10"
                    },
                    {},
                    {
                        "value":"#FFFFFF"
                    },
                    {
                        "value":0.22
                    },
                    {
                        "value":1.11
                    },
                    {
                        "value":20.99
                    },
                    {
                        "value":1.23
                    },
                    {
                        "value":0.78
                    }]
                }])
                .beforeIniEditor("beforeIniEditor")
                .onBeginEdit("onBeginEdit")
                .beforeEditApply("beforeEditApply")
                .onEndEdit("onEndEdit")
                .beforeCellUpdated("beforeCellUpdated")
                .afterCellUpdated("afterCellUpdated")
                .onClickCell("onClickCell")
                .beforeComboPop("beforeComboPop")
                .beforePopShow("beforePopShow")
                .afterPopShow("afterPopShow")
                .onCommand("onCommand")
                .onEditorClick("onEditorClick")
                .onFileDlgOpen("onFileDlgOpen")
                );
            
            append(
                xui.create("xui.UI.Group")
                .setHost(host,"xui_ui_group2")
                .setLeft("1.6666666666666667em")
                .setTop("24.666700000000002em")
                .setWidth("63.3333em")
                .setHeight("23.333299999999998em")
                .setCaption("Events")
                .setToggleBtn(false)
            );
            
            append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button9")
                .setLeft("6.66667em")
                .setTop("24.166700000000002em")
                .setWidth("55.8333em")
                .setCaption("Clear")
                .onClick([{
                    "desc":"动作 1",
                    "type":"control",
                    "target":"xui_ui_group2",
                    "params":[],
                    "method":"dumpContainer"
                }])
            );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },
        log:function(){
            var arr=xui.toArr(arguments),
                cell = arr.shift(),
                rows = this.xui_ui_treegrid3.getRows(),
                cols = this.xui_ui_treegrid3.getHeader(),
                colId=cell._col.id,
                rowId=cell._row.id,
                pos = xui.arr.subIndexOf(cols,'id', colId) +" - "+ xui.arr.subIndexOf(rows,'id',rowId);
            
            if(cell!=this._oldcell){
                this._oldcell=cell;
                this.xui_ui_group2.append(xui.create("<hr />"));
                
            }
            this.xui_ui_group2.append(xui.create("<p>"+arr.join(" : ")+" [ "+pos+" ]</p>"));

            var p = this.xui_ui_group2.getSubNode("PANEL").get(0);
            if(p)
                p.scrollTop = p.scrollHeight;
        },
        onClickCell:function(profile, cell, e, src){
            this.log(cell, 'onClickCell', '(profile, cell, e, src)');
        },
        beforeIniEditor:function(profile, cell, cellNode, pNode, type){
            this.log(cell, 'beforeIniEditor','(profile, cell, cellNode, pNode, type)');
        },
        onBeginEdit:function(profile, cell, editor, type){
            this.log(cell, 'onBeginEdit','(profile, cell, editor, type)');
        },
        beforeEditApply:function(profile, cell, options, editor, tag, type){
            this.log(cell, 'beforeEditApply','(profile, cell, options, editor, tag, type)');
        },
        onEndEdit:function(profile, cell, editor, type){
            this.log(cell, 'onEndEdit','(profile, cell, editor, type)');
        },
        beforeComboPop:function(profile, cell, proEditor, pos, e, src){
            this.log(cell, 'beforeComboPop','(profile, cell, proEditor, pos, e, src)');
        },
        beforePopShow:function(profile, cell, proEditor, popCtl){
            this.log(cell, 'beforePopShow','(profile, cell, proEditor, popCtl)');
        },
        afterPopShow:function(profile, cell, proEditor, popCtl){
            this.log(cell, 'afterPopShow','(profile, cell, proEditor, popCtl)');
        },
        onCommand:function(profile, cell, proEditor, src){
            this.log(cell, 'onCommand','(profile, cell, proEditor, src)');
        },
        onEditorClick:function(profile, cell, proEditor, type, src){
            this.log(cell, 'onEditorClick','(profile, cell, proEditor, type, src)');
        },
        onFileDlgOpen:function(profile, cell, proEditor, src){
            this.log(cell, 'onFileDlgOpen','(profile, cell, proEditor, src)');
        },
        beforeCellUpdated:function(profile, cell, options, isHotRow){
            this.log(cell, 'beforeCellUpdated','(profile, cell, options, isHotRow)');
        },
        afterCellUpdated:function(profile, cell, options, isHotRow){
            this.log(cell, 'afterCellUpdated','(profile, cell, options, isHotRow)');
        }
    }
});