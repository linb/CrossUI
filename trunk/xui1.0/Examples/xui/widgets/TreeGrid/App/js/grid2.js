 {
     header: [
        {
            "id" : "col1",
            "caption" : "number",
            "type" : "number",
            "editorFormat": "^-?(\\d\\d*\\.\\d*$)|(^-?\\d\\d*$)|(^-?\\.\\d\\d*$)",
            "width" : 40
        },
        {
            "id" : "col2",
            "caption" : "checkbox",
            "type" : "checkbox",
            "width" : 30
        },
        {
            "id" : "col3",
            "caption" : "input",
            "type" : "input",
            "editorFormat" : "^[\\w\\.=-]+@[\\w\\.-]+\\.[\\w\\.-]{2,4}$"
        },
        {
            "id" : "col4",
            "caption" : "color",
            "type" : "color"
        },
        {
            "id" : "col5",
            "caption" : "date",
            "type" : "date"
        },
        {
            "id" : "col6",
            "caption" : "time",
            "type" : "time",
            "width" : 50
        },
        {
            "id" : "col7",
            "caption" : "listbox",
            "type" : "listbox",
            "editorListKey":"demo",
            "width" : 100
        },
        {
            "id" : "col8",
            "caption" : "combobox",
            "type" : "combobox",
            "editorListKey":"demo" 
        },
        {
            "id" : "col9",
            "caption" : "helpinput",
            "type" : "helpinput",
            "editorListKey":"demo" 
        },
        {
            "id" : "col10",
            "caption" : "textarea",
            "type" : "textarea",
            "width" : 50
        },
        {
            "id" : "col11",
            "caption" : "progress",
            "type" : "progress",
            "width" : 120
        }
    ],
    rows: [
        {
            "id" : "row1",
            "cells" : [ 1,true,'a@a.com', '#00FFFF', (new Date).getTime(),'01:00',{value:'a',caption:'cap a'},'combobox1','','a a',0.9]
        },
        {
            "id" : "row2",
            "cells" : [2,true,'b@b.com','#FF00FF',(new Date).getTime(),'02:00',{value:'b',caption:'cap b'},'combobox2','','b b',0.5]
        },
        {
            "id" : "row3",
            "cells" : [3,false,'c@c.com','#FF2F00',(new Date).getTime(),'03:00',{value:'c',caption:'cap c'},'combobox3','','c c',0.6]
        },
        {
            "id" : "row4",
            "cells" : [4,false,'d@d.com','#FFF230',(new Date).getTime(),'04:00',{value:'a',caption:'cap a'},'combobox4','','d d',0.9]
        },
        {
            "id" : "row5",
            "cells" : [5,false,'e@e.com','#44FF00',(new Date).getTime(),'05:00',{value:'b',caption:'cap b'},'combobox5','','e e',0.3]
        },
        {
            "id" : "row6",
            "cells" : [6,false,'f@f.com','#BBFF00',(new Date).getTime(),'06:00',{value:'a',caption:'cap a'},'combobox6','','f f',0.4]
        },
        {
            "id" : "row7",
            "cells" : [7,false,'g@g.com','#CCFF00',(new Date).getTime(),'07:00',{value:'ac',caption:'cap c'},'combobox7','','g g',0.5]
        },
        {
            "id" : "row8",
            "cells" : [8,false,'h@h.com','#AAFF00',(new Date).getTime(),'08:00',{value:'a',caption:'cap a'},'combobox8','','h h',0.6]
        },
        {
            "id" : "row9",
            "cells" : [9,false,'i@i.com','#FFFAE0',(new Date).getTime(),'09:00',{value:'b',caption:'cap b'},'combobox9','','i i',0.3]
        },
        {
            "id" : "row10",
            "cells" : [10,false,'j@j.com','#F34340',(new Date).getTime(),'10:00',{value:'c',caption:'cap c'},'combobox10','','j j',0.4]
        },
        {
            "id" : "row11",
            "cells" : [11,false,'k@k.com','#4FFF00',(new Date).getTime(),'11:00',{value:'a',caption:'cap a'},'combobox11','','k k',0.3]
        },
        {
            "id" : "row12",
            "cells" : [12,false,'l@l.com','#FFF440',(new Date).getTime(),'12:00',{value:'c',caption:'cap c'},'combobox12','','l l',0.8]
        },
        {
            "id" : "row13",
            "cells" : [13,false,'m@m.com','#FF4400',(new Date).getTime(),'13:00',{value:'b',caption:'cap b'},'combobox13','','m m',0.2]
        },
        {
            "id" : "row14",
            "cells" : [14,false,'n@n.com','#33FF00',(new Date).getTime(),'14:00',{value:'a',caption:'cap a'},'combobox14','','n n',0.9]
        },
        {
            "id" : "row15",
            "cells" : [15,false,'o@o.com','#FF3300',(new Date).getTime(),'15:00',{value:'a',caption:'cap a'},'combobox15','','o o',0.6]
        },
        {
            "id" : "row16",
            "cells" : [16,false,'p@p.com','#FDE500',(new Date).getTime(),'16:00',{value:'c',caption:'cap c'},'combobox16','','p p',0.3]
        },
        {
            "id" : "row17",
            "cells" : [17,false,'q@q.com','#FFAE00',(new Date).getTime(),'17:00',{value:'b',caption:'cap b'},'combobox17','','q q',0.5]
        },
        {
            "id" : "row18",
            "cells" : [18,false,'r@r.com','#FABF00',(new Date).getTime(),'18:00',{value:'a',caption:'cap a'},'combobox18','','r r',0.3]
        },
        {
            "id" : "row19",
            "cells" : [19,false,'s@s.com','#FEFF00',(new Date).getTime(),'19:00',{value:'a',caption:'cap a'},'combobox19','','s s',0.6]
        },
        {
            "id" : "row20",
            "cells" : [20,false,'t@t.com','#FFFCD0',(new Date).getTime(),'20:00',{value:'c',caption:'cap c'},'combobox20','','t t',0.8]
        },
        {
            "id" : "row21",
            "cells" : [21,false,'u@u.com','#FFFAB0',(new Date).getTime(),'21:00',{value:'a',caption:'cap a'},'combobox21','','u u',0.6]
        }
    ]
}