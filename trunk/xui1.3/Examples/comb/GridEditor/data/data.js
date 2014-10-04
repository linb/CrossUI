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
            "type" : "label",
            "width" : 40
        }
    ],
    rows: [
        {
            "id" : "row1",
            "cells" : ["cell11",1,true,'label1']
        },
        {
            "id" : "row2",
            "cells" : ["cell21",2,true,'label2']
        },
        {
            "id" : "row3",
            "cells" : ["cell31",3,false,'label3']
        },
        {
            "id" : "row4",
            "cells" : ["cell41",4,false,'label4'],
            "sub" : [
                {
                    "id" : "row5",
                    "cells" : ["in51",5,false,'label5']
                },
                {
                    "id" : "row6",
                    "cells" : ["in61",6,false,'label6']
                },
                {
                    "id" : "row7",
                    "cells" : ["in71",7,false,'label7']
                },
                {
                    "id" : "row8",
                    "cells" : ["in81",8,false,'label8']
                }
            ]
        },
        {
            "id" : "row9",
            "cells" : ["cell91",9,false,'label9'],
            "sub" : [
                {
                    "id" : "row10",
                    "cells" : ["in101",10,false,'label10']
                },
                {
                    "id" : "row11",
                    "cells" : ["in111",11,false,'label11']
                },
                {
                    "id" : "row12",
                    "cells" : ["in121",12,false,'label12']
                },
                {
                    "id" : "row13",
                    "cells" : ["in131",13,false,'label13']
                }
            ]
        }
    ]
}