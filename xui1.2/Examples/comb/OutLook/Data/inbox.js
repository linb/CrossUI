 {
     header: [
        {
            "id" : "col1",
            "caption" : "From",
            "type" : "input",
            "width" : 150
        },
        {
            "id" : "col4",
            "caption" : "Subject",
            "type" : "input",
            "width" : 450
        },
        {
            "id" : "col2",
            "caption" : "Size(kb)",
            "type" : "number",
            "format":"^-?\\d\\d*$",
            "width" : 80
        },
        {
            "id" : "col3",
            "caption" : "Importance",
            "type" : "checkbox",
            "width" : 50
        }
    ],
    rows: [
        {
            "id" : "row1",
            "cells" : ["Mitchell@crossui.com","Join us to have a nice party!",50,false],
            "mailbody" : ""
        },
        {
            "id" : "row2",
            "cells" : ["Betty@crossui.com","Merry Christmas and Happy New Year",20,true]
        },
        {
            "id" : "row5",
            "cells" : ["Anny@crossui.com","the following emails are all from Any",0,false],
            "sub" : [
                {
                    "id" : "row6",
                    "cells" : ["Anny@crossui.com","Merry Christmas",30,false]
                },
                {
                    "id" : "row7",
                    "cells" : ["Anny@crossui.com","Promotions - Coupon inside",12,true]
                },
                {
                    "id" : "row8",
                    "cells" : ["Anny@crossui.com","Have a nice day",15,false]
                }
            ]
        }
    ]
}