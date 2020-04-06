 {
     header: [
        {
            "id" : "col1",
            "caption" : "label",
            "colHidable":false,
            "colMovable":false,
            "colSortable":false,
            "colResizer":false,
            "type" : "label",
            "renderer" : function(cell){return "<span style='width:16px;height:16px;background:url(img/demo.gif) left top'></span>"+cell.caption},
            "cellRenderer" : function(cell){return "<span style='width:16px;height:16px;background:url(img/demo.gif) left -16px'></span>"+cell.value},
            "width" : 120
        },
        {
            "id" : "col2",
            "caption" : "number",
            "colHidable":false,
            "colMovable":false,
            "colSortable":false,
            "colResizer":false,
            "type" : "number",
            "cellStyle":"background-color:#00ff00;",
            "editorFormat": "^-?(\\d\\d*\\.\\d*$)|(^-?\\d\\d*$)|(^-?\\.\\d\\d*$)",
            "cellRenderer" : function(cell){return '$'+cell.value},
            "width" : 40
        },
        {
            "id" : "col3",
            "caption" : "checkbox",
            "colHidable":false,
            "colMovable":false,
            "colSortable":false,
            "colResizer":false,
            "type" : "checkbox",
            "width" : 30
        },
        {
            "id" : "col4",
            "caption" : "input",
            "type" : "input",
            "editorFormat" : "^[\\w\\.=-]+@[\\w\\.-]+\\.[\\w\\.-]{2,4}$"
        },
        {
            "id" : "col5",
            "caption" : "color",
            "type" : "color"
        },
        {
            "id" : "col6",
            "caption" : "date",
            "type" : "date"
        },
        {
            "id" : "col7",
            "caption" : "time",
            disabled:true,
            "type" : "time",
            "width" : 50
        },
        {
            "id" : "col8",
            "caption" : "listbox",
            "type" : "listbox",
            "editorListKey":"demo",
            "width" : 100
        },
        {
            "id" : "col9",
            "caption" : "cmdbox",
            "type" : "cmdbox",
            "width" : 50
        },
        {
            "id" : "col10",
            "caption" : "popbox",
            "type" : "popbox",
            "editable":false,
            "width" : 50
        },
        {
            "id" : "col11",
            "caption" : "combobox",
            "type" : "combobox",
            "editable":true,
            "editorListKey":"demo"
        },
        {
            "id" : "col12",
            "caption" : "helpinput",
            "type" : "helpinput",
            "editorListKey":"demo"
        },
        {
            "id" : "col13",
            "caption" : "textarea",
            "type" : "textarea",
            "width" : 50
        },
        {
            "id" : "col14",
            "caption" : "getter",
            "type" : "getter",
            "width" : 80
        },
        {
            "id" : "col15",
            "caption" : "progress",
            "type" : "progress",
            "width" : 120
        },
        {
            "id" : "col16",
            "caption" : "button",
            "type" : "button",
            "onClickCell" : function(prorile,cell){alert('Event in column!');return false;},
            "width" : 50
        }
    ],
    rows: [
        {
            "id" : "row1",
            "height":50,
            rowResizer:false,
            "cells" : ["customized <br/ >row height",1,true,{
                value:'a@a.com',
                cellStyle:"font-size:18px;",
                cellClass:"xui-demo1"
            },
            '#00FFFF', (new Date).getTime(),'00:00',{value:'a',caption:'cap a'},'cmdbox','uneditable','combobox','helpinput','a a','a',0.9,'button']
        },
        {
            "id" : "row2",
            rowResizer:false,
            "cells" : [
            {
                "value":"label2",
                "cellRenderer" : function(cell){return 'cell:'+cell.value}
            }
            ,2,true,
            {
                value:'false@editable.com',
                editable:false
            },{
                value:'#FF00FF',
                "cellRenderer":function(cell){return 'rgb('+xui.UI.ColorPicker.hex2rgb(cell.value.replace('#','')).join(',')+')'}
            },
            {
                "value":(new Date).getTime(),
                "editable":true,
                "cellRenderer" : function(cell){return xui.Date.getText(new Date(parseInt(cell.value)), 'ymd2')}
            },
            '00:00',
            {
                value:'a',
                disabled:true,
                caption:'disabled'
            },
            {
                value:0.6,
                 "type" : "progress"
            },'uneditable','combobox','helpinput','b b','b',0.5,
            {
                "value":'disabled',
                disabled:true,
                "onClickCell":function(){alert('Event in cell!')}
            }
            ]
        },
        {
            "id" : "row3",
            "disabled":true,
            "cells" : ["disabled row",3,false,'a@a.com','#FFFF00',(new Date).getTime(),{
                value:'00:00',
                disabled:false
            },{value:'a',caption:'cap a'},{
                type:'button',
                value:'button'
            },'uneditable','combobox','helpinput','c c','c',0.6,'button']
        },
        {
            "id" : "row4",
            "cellStyle":"background-color:#00ff00;",
            "cells" : ["asd d",{
                value:4,
                "cellStyle":"background-color:#fff;"
            },false,'a@a.com','#FFFFFF',(new Date).getTime(),'00:00',{value:'a',caption:'cap a'},
            {
                value:'#00ffff',
                type:'color'
            },'uneditable','combobox','helpinput','d d','d',0.8,'button'],
            "sub" : [
                {
                    "id" : "row5",
                    "cells" : ["label5",5,false,'a@a.com','#FFFFFF',(new Date).getTime(),'00:00',{value:'a',caption:'cap a'},'cmdbox','uneditable','combobox','helpinput','e e','',0.9,'button']
                },
                {
                    "id" : "row6",
                    "cells" : ["label6",6,false,'a@a.com','#FFFFFF',(new Date).getTime(),'00:00',{value:'a',caption:'cap a'},'cmdbox','uneditable','combobox','helpinput','f f','',0.6,'button']
                },
                {
                    "id" : "row7",
                    "cells" : ["label7",7,false,'a@a.com','#FFFFFF',(new Date).getTime(),'00:00',{value:'a',caption:'cap a'},'cmdbox','uneditable','combobox','helpinput','','',0.5,'button']
                },
                {
                    "id" : "row8",
                    "cells" : ["label8",8,false,'a@a.com','#FFFFFF',(new Date).getTime(),'00:00',{value:'a',caption:'cap a'},'cmdbox','uneditable','combobox','helpinput','','',0.4,'button']
                }
            ]
        },
        {
            "id" : "row9",
            "cells" : ["label9",9,false,'a@a.com','#FFFFFF',(new Date).getTime(),'00:00',{value:'a',caption:'cap a'},'cmdbox','uneditable','combobox','helpinput','i i','i',0.3,'button'],
            "sub" : [
                {
                    "id" : "row10",
                    "cells" : ["label10",10,false,'a@a.com','#FFFFFF',(new Date).getTime(),'00:00',{value:'a',caption:'cap a'},'cmdbox','uneditable','combobox','helpinput','j j','j',0.5,'button']
                },
                {
                    "id" : "row11",
                    "cells" : ["label11",11,false,'a@a.com','#FFFFFF',(new Date).getTime(),'00:00',{value:'a',caption:'cap a'},'cmdbox','uneditable','combobox','helpinput','k k','k',0.6,'button']
                },
                {
                    "id" : "row12",
                    "cells" : ["label12",12,false,'a@a.com','#FFFFFF',(new Date).getTime(),'00:00',{value:'a',caption:'cap a'},'cmdbox','uneditable','combobox','helpinput','l l','l',0.7,'button']
                },
                {
                    "id" : "row13",
                    "cells" : ["label13",13,false,'a@a.com','#FFFFFF',(new Date).getTime(),'00:00',{value:'a',caption:'cap a'},'cmdbox','uneditable','combobox','helpinput','m m','m',0.4,'button']
                }
            ]
        }
    ]
}