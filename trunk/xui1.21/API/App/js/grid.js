 {
     header: [
        {
            "id" : "col1",
            "caption" : "col1",
            "type" : "input",
            "width" : 50
        },
        {
            "id" : "col2",
            "caption" : "col2",
            "type" : "number",
            "format":"^-?\\d\\d*$",
            "renderer":function(i,oi){return '['+ i.caption+']'},
            "cellRenderer":function(i,oi){return 'RMB'+ i.value},
            "width" : 80
        },
        {
            "id" : "col3",
            "caption" : "col3",
            "type" : "checkbox",
            "width" : 40
        },
        {
            "id" : "col4",
            "caption" : "col4",
            "type" : "color",
            "width" : 60
        }
    ],
    rows: [
        {
            "id" : "row1",
            "cells" : ["cell11",1,true,'#FFFFFF']
        },
        {
            "id" : "row2",
            "cells" : ["cell21",2,true,'#AAAAAA']
        },
        {
            "id" : "row3",
            "cells" : ["cell31",3,false,'#00FFFF']
        },
        {
            "id" : "row4",
            "cells" : ["cell41",4,false,'#FF00FF'],
            "sub" : [
                {
                    "id" : "row5",
                    "cells" : ["in51",5,false,'#0000FF']
                },
                {
                    "id" : "row6",
                    "cells" : ["in61",6,false,'#FF0000']
                },
                {
                    "id" : "row7",
                    "cells" : ["in71",7,false,'#F0000F']
                },
                {
                    "id" : "row8",
                    "cells" : ["in81",8,false,'#555555']
                }
            ]
        },
        {
            "id" : "row9",
            "cells" : ["cell91",9,false,'#FFFFFF'],
            "sub" : [
                {
                    "id" : "row10",
                    "cells" : ["in101",10,false,'#FFFFFF']
                },
                {
                    "id" : "row11",
                    "cells" : ["in111",11,false,'#FFFF00']
                },
                {
                    "id" : "row12",
                    "cells" : ["in121",12,false,'#FF00FF']
                },
                {
                    "id" : "row13",
                    "cells" : ["in131",13,false,'#00FFFF']
                }
            ]
        }
    ]
}