xui.Class('xui.Date',null,{
    Initialize:function(){
        var self=this;
        self._mapKeys(self.$TIMEUNIT);
        var a=self._key1,b=self._key2,u=self.$UNIT={};
        for(var i=0,l=a.length;i<l;i++)u[a[i]]=1;
        for(var i=0,l=b.length;i<l;i++)u[b[i]]=1;
        u.w=1;
    },
    Static:{
        _key1:'MILLISECOND,SECOND,MINUTE,HOUR,DAY,WEEK,MONTH,QUARTER,YEAR,DECADE,CENTURY'.split(','),
        _key2:'ms,s,n,h,d,ww,m,q,y,de,c'.split(','),
        // Conversion factors
        $TIMEUNIT : {
            MILLISECOND : 1,
            SECOND      : 1000,           //SECONDS
            MINUTE      : 60000,          //MINUTES 60 * 1000
            HOUR        : 3600000,        //HOURS 60 * 60 * 1000
            DAY         : 86400000,       //DAYS 24 * 60 * 60 * 1000
            WEEK        : 604800000,      //WEEKS 7 * 24 * 60 * 60 * 1000
            MONTH       : 2592000000,     //MONTHS 30 * 24 * 60 * 60 * 1000  (approx = 1 month)
            QUARTER     : 7776000000,     //QUARTERS 90 * 24 * 60 * 60 * 1000  (approx = 3 months)
            YEAR        : 31557600000,    //YEARS 365 * 24 * 60 * 60 * 1000 (approx = 1 year)
            DECADE      : 315576000000,   //DECADES 10 * 365 * 24 * 60 * 60 * 1000 (approx = 1 decade)
            CENTURY     : 3155760000000   //CENTURIES 100 * 365 * 24 * 60 * 60 * 1000 (approx = 1 century)
        },
        $TEXTFORMAT:{
            utciso:function(d,w,f){f=xui.Date._fix; return d.getUTCFullYear() + '-' +f(d.getUTCMonth() + 1) + '-' +f(d.getUTCDate()) + 'T' +f(d.getUTCHours()) + ':' +f(d.getUTCMinutes()) + ':' +f(d.getUTCSeconds()) + 'Z'},
            iso:function(d,w,f){f=xui.Date._fix; return d.getFullYear() + '-' +f(d.getMonth() + 1) + '-' +f(d.getDate()) + 'T' +f(d.getHours()) + ':' +f(d.getMinutes()) + ':' +f(d.getSeconds())},
            ms:function(d,w){return xui.Date._fix(d.getMilliseconds(),3)+ (w?"":xui.wrapRes('date.MS'))},
            s:function(d,w){return d.getSeconds()+ (w?"":xui.wrapRes('date.S'))},
            ss:function(d,w){return xui.Date._fix(d.getSeconds())+ (w?"":xui.wrapRes('date.S'))},
            n:function(d,w){return d.getMinutes()+ (w?"":xui.wrapRes('date.N'))},
            nn:function(d,w){return xui.Date._fix(d.getMinutes())+ (w?"":xui.wrapRes('date.N'))},
            h :function(d,w){return d.getHours()+ (w?"":xui.wrapRes('date.H'))},
            hh :function(d,w){return xui.Date._fix(d.getHours())+ (w?"":xui.wrapRes('date.H'))},
            d:function(d,w){return d.getDate()+ (w?"":xui.wrapRes('date.D'))},
            dd:function(d,w){return xui.Date._fix(d.getDate())+ (w?"":xui.wrapRes('date.D'))},
            w : function(d,w,firstDayOfWeek){var a=(d.getDay() - firstDayOfWeek +7)%7; return w?a:xui.wrapRes('date.WEEKS.'+a)},
            ww : function(d,w,firstDayOfWeek){return xui.Date.getWeek(d, firstDayOfWeek) + (w?"":xui.wrapRes('date.W'))},
            m:function(d,w){return (d.getMonth()+1) + (w?"":xui.wrapRes('date.M'))},
            mm:function(d,w){return xui.Date._fix(d.getMonth()+1) + (w?"":xui.wrapRes('date.M'))},
            q : function(d,w){return (parseInt((d.getMonth()+3)/3-1,10) + 1) + (w?"":xui.wrapRes('date.Q'))},
            y :function(d,w){return d.getYear() + (w?"":xui.wrapRes('date.Y'))},
            yyyy :function(d,w){return d.getFullYear() + (w?"":xui.wrapRes('date.Y'))},
            de:function(d,w){return parseInt(d.getFullYear()/10,10) + (w?"":xui.wrapRes('date.DE'))},
            c:function(d,w){return parseInt(d.getFullYear()/100,10) + (w?"":xui.wrapRes('date.C'))},

            hn:function(d,w){return xui.wrapRes('date.HN-'+d.getHours()+"-"+d.getMinutes())},
            dhn:function(d,w){return xui.wrapRes('date.DHN-'+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes())},
            mdhn:function(d,w){return xui.wrapRes('date.MDHN-'+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes())},
            hns:function(d,w){return xui.wrapRes('date.HNS-'+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds())},
            hnsms:function(d,w){return xui.wrapRes('date.HNSMS-'+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds()+"-"+d.getMilliseconds())},

            yq:function(d,w){return xui.wrapRes('date.YQ-'+d.getFullYear()+"-"+(parseInt((d.getMonth()+3)/3-1,10)+1))},

            ym :   function(d,w){return xui.wrapRes('date.YM-'+d.getFullYear()+"-"+(d.getMonth()+1))},
            md :  function(d,w){return xui.wrapRes('date.MD-'+(d.getMonth()+1)+"-"+d.getDate())},
            ymd :  function(d,w){return xui.wrapRes('date.YMD-'+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate())},
            ymd2 :  function(d,w){return xui.wrapRes('date.YMD2-'+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate())},
            ymdh:  function(d,w){return xui.wrapRes('date.YMDH-'+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours())},
            ymdhn: function(d,w){return xui.wrapRes('date.YMDHN-'+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes())},
            ymdhns:function(d,w){return xui.wrapRes('date.YMDHNS-'+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds())},
            'all' :  function(d,w){return xui.wrapRes('date.ALL-'+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds()+"-"+d.getMilliseconds())}
        },
        $TIMEZONE:[{
            id:"Asia(East,North)",
            sub:[{
                    id:"Brunei",
                    v:"+0800"
                },{
                    id:"Burma",
                    v:"+0630"
                },{
                    id:"Cambodia",
                    v:"+0700"
                },{
                    id:"China",
                    v:"+0800"
                },{
                    id:"China(HK,Macau)",
                    v:"+0800"
                },{
                    id:"China(TaiWan)",
                    v:"+0800"
                },{
                    id:"China(Urumchi)",
                    v:"+0700"
                },{
                    id:"East Timor",
                    v:"+0800"
                },{
                    id:"Indonesia",
                    v:"+0700"
                },{
                    id:"Japan",
                    v:"+0900"
                },{
                    id:"Kazakhstan(Aqtau)",
                    v:"+0400"
                },{
                    id:"Kazakhstan(Aqtobe)",
                    v:"+0500"
                },{
                    id:"Kazakhstan(Astana)",
                    v:"+0600"
                },{
                    id:"Kirghizia",
                    v:"+0500"
                },{
                    id:"Korea",
                    v:"+0900"
                },{
                    id:"Laos",
                    v:"+0700"
                },{
                    id:"Malaysia",
                    v:"+0800"
                },{
                    id:"Mongolia",
                    v:"+0800",
                    tag:"03L03|09L03"
                },{
                    id:"Philippines",
                    v:"+0800"
                },{
                    id:"Russia(Anadyr)",
                    v:"+1300",
                    tag:"03L03|10L03"
                },{
                    id:"Russia(Kamchatka)",
                    v:"+1200",
                    tag:"03L03|10L03"
                },{
                    id:"Russia(Magadan)",
                    v:"+1100",
                    tag:"03L03|10L03"
                },{
                    id:"Russia(Vladivostok)",
                    v:"+1000",
                    tag:"03L03|10L03"
                },{
                    id:"Russia(Yakutsk)",
                    v:"+0900",
                    tag:"03L03|10L03"
                },{
                    id:"Singapore",
                    v:"+0800"
                },{
                    id:"Thailand",
                    v:"+0700"
                },{
                    id:"Vietnam",
                    v:"+0700"
                }]
            },{
                id:"Asia(South,West)",
                sub:[{
                    id:"Afghanistan",
                    v:"+0430"
                },{
                    id:"Arab Emirates",
                    v:"+0400"
                },{
                    id:"Bahrain",
                    v:"+0300"
                },{
                    id:"Bangladesh",
                    v:"+0600"
                },{
                    id:"Bhutan",
                    v:"+0600"
                },{
                    id:"Cyprus",
                    v:"+0200"
                },{
                    id:"Georgia",
                    v:"+0500"
                },{
                    id:"India",
                    v:"+0530"
                },{
                    id:"Iran",
                    v:"+0330",
                    tag:"04 13|10 13"
                },{
                    id:"Iraq",
                    v:"+0300",
                    tag:"04 13|10 13"
                },{
                    id:"Israel",
                    v:"+0200",
                    tag:"04F53|09F53"
                },{
                    id:"Jordan",
                    v:"+0200"
                },{
                    id:"Kuwait",
                    v:"+0300"
                },{
                    id:"Lebanon",
                    v:"+0200",
                    tag:"03L03|10L03"
                },{
                    id:"Maldives",
                    v:"+0500"
                },{
                    id:"Nepal",
                    v:"+0545"
                },{
                    id:"Oman",
                    v:"+0400"
                },{
                    id:"Pakistan",
                    v:"+0500"
                },{
                    id:"Palestine",
                    v:"+0200"
                },{
                    id:"Qatar",
                    v:"+0300"
                },{
                    id:"Saudi Arabia",
                    v:"+0300"
                },{
                    id:"Sri Lanka",
                    v:"+0600"
                },{
                    id:"Syria",
                    v:"+0200",
                    tag:"04 13|10 13"
                },{
                    id:"Tajikistan",
                    v:"+0500"
                },{
                    id:"Turkey",
                    v:"+0200"
                },{
                    id:"Turkmenistan",
                    v:"+0500"
                },{
                    id:"Uzbekistan",
                    v:"+0500"
                },{
                    id:"Yemen",
                    v:"+0300"
                }]
            },{
                id:"North Europe",
                sub:[{
                    id:"Denmark",
                    v:"+0100",
                    tag:"04F03|10L03"
                },{
                    id:"Faroe Is.(DK)",
                    v:"+0100"
                },{
                    id:"Finland",
                    v:"+0200",
                    tag:"03L01|10L01"
                },{
                    id:"Iceland",
                    v:"+0000"
                },{
                    id:"Jan Mayen(Norway)",
                    v:"-0100"
                },{
                    id:"Norwegian",
                    v:"+0100"
                },{
                    id:"Svalbard(NORWAY)",
                    v:"+0100"
                },{
                    id:"Sweden",
                    v:"+0100",
                    tag:"03L01|10L01"
                }]
            },{
                id:"Eastern Europe",
                sub:[{
                    id:"Armenia",
                    v:"+0400"
                },{
                    id:"Austria",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Azerbaijan",
                    v:"+0400"
                },{
                    id:"Belarus",
                    v:"+0200",
                    tag:"03L03|10L03"
                },{
                    id:"Czech",
                    v:"+0100"
                },{
                    id:"Estonia",
                    v:"+0200"
                },{
                    id:"Georgia",
                    v:"+0500"
                },{
                    id:"Germany",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Hungarian",
                    v:"+0100"
                },{
                    id:"Latvia",
                    v:"+0200"
                },{
                    id:"Liechtenstein",
                    v:"+0100"
                },{
                    id:"Lithuania",
                    v:"+0200"
                },{
                    id:"Moldova",
                    v:"+0200"
                },{
                    id:"Poland",
                    v:"+0100"
                },{
                    id:"Rumania",
                    v:"+0200"
                },{
                    id:"Russia(Moscow)",
                    v:"+0300",
                    tag:"03L03|10L03"
                },{
                    id:"Slovakia",
                    v:"+0100"
                },{
                    id:"Switzerland",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Ukraine",
                    v:"+0200"
                },{
                    id:"Ukraine(Simferopol)",
                    v:"+0300"
                }]
            },{
                id:"Western Europe",
                sub:[{
                    id:"Andorra",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Belgium",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Channel Is.(UK)",
                    v:"+0000",
                    tag:"03L01|10L01"
                },{
                    id:"France",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Gibraltar(UK)",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Ireland",
                    v:"+0000",
                    tag:"03L01|10L01"
                },{
                    id:"Isle of Man(UK)",
                    v:"+0000",
                    tag:"03L01|10L01"
                },{
                    id:"Luxembourg",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Monaco",
                    v:"+0100"
                },{
                    id:"Netherlands",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"United Kingdom",
                    v:"+0000",
                    tag:"03L01|10L01"
                }]
            },{
                id:"South Europe",
                sub:[{
                    id:"Albania",
                    v:"+0100"
                },{
                    id:"Bosnia",
                    v:"+0100"
                },{
                    id:"Bulgaria",
                    v:"+0200"
                },{
                    id:"Croatia",
                    v:"+0100"
                },{
                    id:"Greece",
                    v:"+0200",
                    tag:"03L01|10L01"
                },{
                    id:"Holy See",
                    v:"+0100"
                },{
                    id:"Italy",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Macedonia",
                    v:"+0100"
                },{
                    id:"Malta",
                    v:"+0100"
                },{
                    id:"Montenegro",
                    v:"+0100"
                },{
                    id:"Portugal",
                    v:"+0000",
                    tag:"03L01|10L01"
                },{
                    id:"San Marino",
                    v:"+0100"
                },{
                    id:"Serbia",
                    v:"+0100"
                },{
                    id:"Slovenia",
                    v:"+0100"
                },{
                    id:"Span",
                    v:"+0100",
                    tag:"03L01|10L01"
                }]
            },{
                id:"North America",
                sub:[{
                    id:"Canada(AST)",
                    v:"-0400",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(CST)",
                    v:"-0600",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(EST)",
                    v:"-0500",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(MST)",
                    v:"-0700",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(NST)",
                    v:"-0330",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(PST)",
                    v:"-0800",
                    tag:"04F02|10L02"
                },{
                    id:"Greenland(DK)",
                    v:"-0300"
                },{
                    id:"US(Central)",
                    v:"-0600",
                    tag:"03S02|11F02"
                },{
                    id:"US(Eastern)",
                    v:"-0500",
                    tag:"03S02|11F02"
                },{
                    id:"US(Mountain)",
                    v:"-0700",
                    tag:"03S02|11F02"
                },{
                    id:"US(Pacific)",
                    v:"-0800",
                    tag:"03S02|11F02"
                },{
                    id:"US(Alaska)",
                    v:"-0900"
                },{
                    id:"US(Arizona)",
                    v:"-0700"
                }]
            },{
                id:"South America",
                sub:[{
                    id:"Anguilla(UK)",
                    v:"-0400"
                },{
                    id:"Antigua&amp;Barbuda",
                    v:"-0400"
                },{
                    id:"Antilles(NL)",
                    v:"-0400"
                },{
                    id:"Argentina",
                    v:"-0300"
                },{
                    id:"Aruba(NL)",
                    v:"-0400"
                },{
                    id:"Bahamas",
                    v:"-0500"
                },{
                    id:"Barbados",
                    v:"-0400"
                },{
                    id:"Belize",
                    v:"-0600"
                },{
                    id:"Bolivia",
                    v:"-0400"
                },{
                    id:"Brazil(AST)",
                    v:"-0500",
                    tag:"10F03|02L03"
                },{
                    id:"Brazil(EST)",
                    v:"-0300",
                    tag:"10F03|02L03"
                },{
                    id:"Brazil(FST)",
                    v:"-0200",
                    tag:"10F03|02L03"
                },{
                    id:"Brazil(WST)",
                    v:"-0400",
                    tag:"10F03|02L03"
                },{
                    id:"British Virgin Is.(UK)",
                    v:"-0400"
                },{
                    id:"Cayman Is.(UK)",
                    v:"-0500"
                },{
                    id:"Chilean",
                    v:"-0300",
                    tag:"10F03|03F03"
                },{
                    id:"Chilean(Hanga Roa)",
                    v:"-0500",
                    tag:"10F03|03F03"
                },{
                    id:"Colombia",
                    v:"-0500"
                },{
                    id:"Costa Rica",
                    v:"-0600"
                },{
                    id:"Cuba",
                    v:"-0500",
                    tag:"04 13|10L03"
                },{
                    id:"Dominican",
                    v:"-0400"
                },{
                    id:"Ecuador",
                    v:"-0500"
                },{
                    id:"El Salvador",
                    v:"-0600"
                },{
                    id:"Falklands",
                    v:"-0300",
                    tag:"09F03|04F03"
                },{
                    id:"Grenada",
                    v:"-0400"
                },{
                    id:"Guadeloupe(FR)",
                    v:"-0400"
                },{
                    id:"Guatemala",
                    v:"-0600"
                },{
                    id:"Guiana(FR)",
                    v:"-0300"
                },{
                    id:"Guyana",
                    v:"-0400"
                },{
                    id:"Haiti",
                    v:"-0500"
                },{
                    id:"Honduras",
                    v:"-0600"
                },{
                    id:"Jamaica",
                    v:"-0500"
                },{
                    id:"Martinique(FR)",
                    v:"-0400"
                },{
                    id:"Mexico(Mazatlan)",
                    v:"-0700"
                },{
                    id:"Mexico(Tijuana)",
                    v:"-0800"
                },{
                    id:"Mexico(Mexico)",
                    v:"-0600"
                },{
                    id:"Montserrat(UK)",
                    v:"-0400"
                },{
                    id:"Nicaragua",
                    v:"-0500"
                },{
                    id:"Panama",
                    v:"-0500"
                },{
                    id:"Paraguay",
                    v:"-0400",
                    tag:"10F03|02L03"
                },{
                    id:"Peru",
                    v:"-0500"
                },{
                    id:"Puerto Rico(US)",
                    v:"-0400"
                },{
                    id:"So. Georgia&amp;So. Sandwich Is.(UK)",
                    v:"-0200"
                },{
                    id:"St. Kitts&amp;Nevis",
                    v:"-0400"
                },{
                    id:"St. Lucia",
                    v:"-0400"
                },{
                    id:"St. Vincent&amp;Grenadines",
                    v:"-0400"
                },{
                    id:"Suriname",
                    v:"-0300"
                },{
                    id:"Trinidad&amp;Tobago",
                    v:"-0400"
                },{
                    id:"Turks&amp;Caicos Is.(UK)",
                    v:"-0500"
                },{
                    id:"Uruguay",
                    v:"-0300"
                },{
                    id:"Venezuela",
                    v:"-0400"
                },{
                    id:"Virgin Is.(US)",
                    v:"-0400"
                }]
            },{
                id:"Africa(North)",
                sub:[{
                    id:"Algeria",
                    v:"+0100"
                },{
                    id:"Egypt",
                    v:"+0200",
                    tag:"04L53|09L43"
                },{
                    id:"Libyan",
                    v:"+0200"
                },{
                    id:"Morocco",
                    v:"+0000"
                },{
                    id:"Sudan",
                    v:"+0200"
                },{
                    id:"Tunisia",
                    v:"+0100"
                }]
            },{
                id:"Africa(Western)",
                sub:[{
                    id:"Benin",
                    v:"+0100"
                },{
                    id:"Burkina Faso",
                    v:"+0000"
                },{
                    id:"Canary Is.(SP)",
                    v:"-0100"
                },{
                    id:"Cape Verde",
                    v:"-0100"
                },{
                    id:"Chad",
                    v:"+0100"
                },{
                    id:"Gambia",
                    v:"+0000"
                },{
                    id:"Ghana",
                    v:"+0000"
                },{
                    id:"Guinea",
                    v:"+0000"
                },{
                    id:"Guinea-Bissau",
                    v:"+0000"
                },{
                    id:"Ivory Coast",
                    v:"+0000"
                },{
                    id:"Liberia",
                    v:"+0000"
                },{
                    id:"Mali",
                    v:"+0000"
                },{
                    id:"Mauritania",
                    v:"+0000"
                },{
                    id:"Niger",
                    v:"+0100"
                },{
                    id:"Nigeria",
                    v:"+0100"
                },{
                    id:"Senegal",
                    v:"+0000"
                },{
                    id:"Sierra Leone",
                    v:"+0000"
                },{
                    id:"Togo",
                    v:"+0000"
                },{
                    id:"Western Sahara",
                    v:"+0000"
                }]
            },{
                id:"Africa(Central)",
                sub:[{
                    id:"Cameroon",
                    v:"+0100"
                },{
                    id:"Cen.African Rep.",
                    v:"+0100"
                },{
                    id:"Congo,Democratic",
                    v:"+0100"
                },{
                    id:"Congo,Republic",
                    v:"+0100"
                },{
                    id:"Equatorial Guinea",
                    v:"+0100"
                },{
                    id:"Gabon",
                    v:"+0100"
                },{
                    id:"Sao Tome&amp;Principe",
                    v:"+0000"
                }]
            },{
                id:"Africa(East)",
                sub:[{
                    id:"Burundi",
                    v:"+0200"
                },{
                    id:"Comoros",
                    v:"+0300"
                },{
                    id:"Djibouti",
                    v:"+0300"
                },{
                    id:"Eritrea",
                    v:"+0300"
                },{
                    id:"Ethiopia",
                    v:"+0300"
                },{
                    id:"Kenya",
                    v:"+0300"
                },{
                    id:"Madagascar",
                    v:"+0300"
                },{
                    id:"Malawi",
                    v:"+0200"
                },{
                    id:"Mauritius",
                    v:"+0400"
                },{
                    id:"Mayotte(FR)",
                    v:"+0300"
                },{
                    id:"Mozambique",
                    v:"+0200"
                },{
                    id:"Reunion(FR)",
                    v:"+0400"
                },{
                    id:"Rwanda",
                    v:"+0200"
                },{
                    id:"Seychelles",
                    v:"+0300"
                },{
                    id:"Somalia",
                    v:"+0300"
                },{
                    id:"Tanzania",
                    v:"+0300"
                },{
                    id:"Uganda",
                    v:"+0300"
                }]
            },{
                id:"Africa(South)",
                sub:[{
                    id:"Angola",
                    v:"+0100"
                },{
                    id:"Botswana",
                    v:"+0200"
                },{
                    id:"Lesotho",
                    v:"+0200"
                },{
                    id:"Namibia",
                    v:"+0200",
                    tag:"09F03|04F03"
                },{
                    id:"Saint Helena(UK)",
                    v:"-0100"
                },{
                    id:"South Africa",
                    v:"+0200"
                },{
                    id:"Swaziland",
                    v:"+0200"
                },{
                    id:"Zambia",
                    v:"+0200"
                },{
                    id:"Zimbabwe",
                    v:"+0200"
                }]
            },{
                id:"Oceania",
                sub:[{
                    id:"American Samoa(US)",
                    v:"-1100"
                },{
                    id:"Australia(Adelaide)",
                    v:"+0930",
                    sub:"10L03|03L03"
                },{
                    id:"Australia(Brisbane)",
                    v:"+1000"
                },{
                    id:"Australia(Darwin)",
                    v:"+0930"
                },{
                    id:"Australia(Hobart)",
                    v:"+1000",
                    sub:"10L03|03L03"
                },{
                    id:"Australia(Perth)",
                    v:"+0800"
                },{
                    id:"Australia(Sydney)",
                    v:"+1000",
                    sub:"10L03|03L03"
                },{
                    id:"Cook Islands(NZ)",
                    v:"-1000"
                },{
                    id:"Eniwetok",
                    v:"-1200"
                },{
                    id:"Fiji",
                    v:"+1200",
                    sub:"11F03|02L03"
                },{
                    id:"Guam",
                    v:"+1000"
                },{
                    id:"Hawaii(US)",
                    v:"-1000"
                },{
                    id:"Kiribati",
                    v:"+1100"
                },{
                    id:"Marshall Is.",
                    v:"+1200"
                },{
                    id:"Micronesia",
                    v:"+1000"
                },{
                    id:"Midway Is.(US)",
                    v:"-1100"
                },{
                    id:"Nauru Rep.",
                    v:"+1200"
                },{
                    id:"New Calednia(FR)",
                    v:"+1100"
                },{
                    id:"New Zealand",
                    v:"+1200",
                    sub:"10F03|04F63"
                },{
                    id:"New Zealand(CHADT)",
                    v:"+1245",
                    sub:"10F03|04F63"
                },{
                    id:"Niue(NZ)",
                    v:"-1100"
                },{
                    id:"Nor. Mariana Is.",
                    v:"+1000"
                },{
                    id:"Palau",
                    v:"+0900"
                },{
                    id:"Papua New Guinea",
                    v:"+1000"
                },{
                    id:"Pitcairn Is.(UK)",
                    v:"-0830"
                },{
                    id:"Polynesia(FR)",
                    v:"-1000"
                },{
                    id:"Solomon Is.",
                    v:"+1100"
                },{
                    id:"Tahiti",
                    v:"-1000"
                },{
                    id:"Tokelau(NZ)",
                    v:"-1100"
                },{
                    id:"Tonga",
                    v:"+1300",
                    tag:"10F63|04F63"
                },{
                    id:"Tuvalu",
                    v:"+1200"
                },{
                    id:"Vanuatu",
                    v:"+1100"
                },{
                    id:"Western Samoa",
                    v:"-1100"
                },{
                    id:"Data Line",
                    v:"-1200"
                }]
            }
        ],
        //map like: MILLISECOND <=> ms
        _mapKeys:function(obj){
            var self=this, t=self._key2, m=self._key1;
            for(var i=0,l=m.length;i<l;i++)
                obj[t[i]]=obj[m[i]];
        },
        //get valid datepart
        _validUnit:function(datepart){
            return this.$UNIT[datepart]?datepart:'d';
        },
        _date:function(value,df){return xui.isDate(value) ? value : ((value || value===0)&&isFinite(value)) ? new Date(parseInt(value,10)) : xui.isDate(df) ? df : new Date},
        _isNumb:function(target)  {return typeof target == 'number' && isFinite(target)},
        _numb:function(value,df){return this._isNumb(value)?value:this._isNumb(df)?df:0},
        //time Zone like: -8
        _timeZone:-((new Date).getTimezoneOffset()/60),

        /*get specific date datepart
        *
        */
        get:function(date, datepart, firstDayOfWeek){
            var self=this;
            date = self._date(date);
            datepart = self._validUnit(datepart);
            firstDayOfWeek = self._numb(firstDayOfWeek);

            var map = arguments.callee.map || ( arguments.callee.map = {
                    ms:function(d){return d.getMilliseconds()},
                    s:function(d){return d.getSeconds()},
                    n:function(d){return d.getMinutes()},
                    h :function(d){return d.getHours()},
                    d:function(d){return d.getDate()},
                    ww:function(d,fd){return xui.Date.getWeek(d, fd)},
                    w :function(d,fd){return (7+d.getDay()-fd)%7},
                    m:function(d){return d.getMonth()},
                    q:function(d){return parseInt((d.getMonth()+3)/3-1,10)},
                    y :function(d){return d.getFullYear()},
                    de:function(d){return parseInt(d.getFullYear()/10,10)},
                    c:function(d){return parseInt(d.getFullYear()/100,10)}
                });
            return map[datepart](date,firstDayOfWeek);
        },
        /*
        * _fix(1,3,'0') => '100'
        */
        _fix:function(str,len,chr){
            len=len||2;
            chr=chr||'0';
            str+="";
            if(str.length<len)
                for(var i=str.length;i<len;i++)
                    str=chr+str;
            return str;
        },
        /*add specific datepart to date
        *
        */
        add: function(date, datepart, count ){
            var self=this,
                tu=self.$TIMEUNIT,
                map,
                date2;
            date = self._date(date);
            datepart = self._validUnit(datepart);


            if(!(map=arguments.callee.map)){
                map=arguments.callee.map = {
                    MILLISECOND:function(date,count){date.setTime(date.getTime() + count*tu.ms)},
                    SECOND:function(date,count){date.setTime(date.getTime() + count*tu.s)},
                    MINUTE:function(date,count){date.setTime(date.getTime() + count*tu.n)},
                    HOUR:function(date,count){date.setTime(date.getTime() + count*tu.h)},
                    DAY:function(date,count){date.setTime(date.getTime() + count*tu.d)},
                    WEEK:function(date,count){date.setTime(date.getTime() + count*tu.ww)},
                    MONTH:function(date,count){
                        var a=date.getDate(),b;
                        count = date.getMonth() + count;
                        this.YEAR(date, Math.floor(count/12));
                        date.setMonth((count%12+12)%12);
                        if((b=date.getDate())!=a)
                            this.DAY(date, -b)
                    },
                    QUARTER:function(date,count){this.MONTH(date,count*3)},
                    YEAR:function(date,count){
                        var a=date.getDate(),b;
                        date.setFullYear(date.getFullYear() + count)
                        if((b=date.getDate())!=a)
                            this.DAY(date, -b)
                    },
                    DECADE:function(date,count){this.YEAR(date,10*count)},
                    CENTURY:function(date,count){this.YEAR(date,100*count)}
                };
                self._mapKeys(map);
            }
            map[datepart](date2=new Date(date), count);
            return date2;
        },
        /*get specific datepart diff between startdate and date2
        *
        */
        diff:function(startdate, enddate, datepart, firstDayOfWeek) {
            var self=this;
            startdate = self._date(startdate);
            enddate = self._date(enddate);
            datepart = self._validUnit(datepart);
            firstDayOfWeek = self._numb(firstDayOfWeek);

            var tu=self.$TIMEUNIT,
                map;

            if(!(map=arguments.callee.map)){
                map = arguments.callee.map = {
                    MILLISECOND:function(startdate,enddate){return enddate.getTime()-startdate.getTime()},
                    SECOND:function(startdate,enddate){
                        var startdate = self.getTimSpanStart(startdate,'s'),
                            enddate = self.getTimSpanStart(enddate,'s'),
                            t=enddate.getTime()-startdate.getTime();
                        return t/tu.s;
                    },
                    MINUTE:function(startdate,enddate){
                        var startdate = self.getTimSpanStart(startdate,'n'),
                            enddate = self.getTimSpanStart(enddate,'n'),
                            t=enddate.getTime()-startdate.getTime();
                        return t/tu.n;
                    },
                    HOUR:function(startdate,enddate){
                        var startdate = self.getTimSpanStart(startdate,'h'),
                            enddate = self.getTimSpanStart(enddate,'h'),
                            t=enddate.getTime()-startdate.getTime();
                        return t/tu.h;
                    },
                    DAY:function(startdate,enddate){
                        var startdate = self.getTimSpanStart(startdate,'d',1),
                            enddate = self.getTimSpanStart(enddate,'d',1),
                            t=enddate.getTime()-startdate.getTime();
                        return t/tu.d;
                    },
                    WEEK:function(startdate,enddate,firstDayOfWeek){
                        var startdate = self.getTimSpanStart(startdate,'ww',1,firstDayOfWeek),
                            enddate = self.getTimSpanStart(enddate,'ww',1,firstDayOfWeek),
                            t=enddate.getTime()-startdate.getTime();
                        return t/tu.ww;
                    },
                    MONTH:function(startdate,enddate){return (enddate.getFullYear()-startdate.getFullYear())*12 + (enddate.getMonth()-startdate.getMonth())},
                    QUARTER:function(startdate,enddate){return (enddate.getFullYear()-startdate.getFullYear())*4 + parseInt((enddate.getMonth()-startdate.getMonth())/3,10)},
                    YEAR:function(startdate,enddate){return parseInt((enddate.getFullYear()-startdate.getFullYear()),10)},
                    DECADE:function(startdate,enddate){return parseInt((enddate.getFullYear()-startdate.getFullYear())/10,10)},
                    CENTURY:function(startdate,enddate){return parseInt((enddate.getFullYear()-startdate.getFullYear())/100,10)}
                };
                self._mapKeys(map);
            }
            return map[datepart](new Date(startdate),new Date(enddate),firstDayOfWeek);
        },
        /*get the first datepart begin of certain datepart
        *
        */
        getTimSpanStart: function(date, datepart, count, firstDayOfWeek) {
            var self=this,
                tu=self.$TIMEUNIT,
                map,date2;
            date = self._date(date);
            datepart = self._validUnit(datepart);
            firstDayOfWeek = self._numb(firstDayOfWeek);
            count=self._numb(count,1);
            if(!(map=arguments.callee.map)){
                var clearInDay = function(d) {
                        d.setMilliseconds(0);
                        d.setSeconds(0);
                        d.setMinutes(0);
                        d.setHours(0);
                    },
                    clearInYear = function(d) {
                        clearInDay(d);
                        d.setDate(1);
                        d.setMonth(0);
                    };

                map = arguments.callee.map = {
                    MILLISECOND:function(date,count){
                        var x = date.getMilliseconds();
                        date.setMilliseconds(x - (x % count));
                    },
                    SECOND:function(date,count){
                        date.setMilliseconds(0);
                        var x = date.getSeconds();
                        date.setSeconds(x - (x % count));
                    },
                    MINUTE:function(date,count){
                        date.setMilliseconds(0);
                        date.setSeconds(0);
                        var x = date.getMinutes();
                        date.setTime(date.getTime() - (x % count) * tu.n);
                    },
                    HOUR:function(date,count){
                        date.setMilliseconds(0);
                        date.setSeconds(0);
                        date.setMinutes(0);

                        var x = date.getHours();
                        date.setHours(x - (x % count));
                    },
                    DAY:function(date,count){
                        clearInDay(date);
                        var x=date.getDate();
                        date.setDate(x - (x % count));
                    },
                    WEEK:function(date,count,firstDayOfWeek){
                        clearInDay(date);

                        var d = (date.getDay() + 7 - firstDayOfWeek) % 7,date2,x, a=new Date();
                        date.setTime(date.getTime() - d * tu.d);
                        clearInYear(a);
                        a.setFullYear(date.getFullYear());
                        date2 = (a.getDay() + 7 - firstDayOfWeek) % 7;
                        a.setTime(a.getTime() - date2 * tu.d);

                        x= (date.getTime()-a.getTime())/tu.d/7;

                        date.setTime(date.getTime() - (x % count) * tu.ww);
                    },
                    MONTH:function(date,count){
                        clearInDay(date);
                        date.setDate(1);
                        var x = date.getMonth();
                        date.setMonth(x - (x % count));
                    },
                    QUARTER:function(date,count){
                        count=self._numb(count,1);
                        return this.MONTH(date, count*3);
                    },
                    YEAR:function(date,count){
                        clearInYear(date);
                        var x = date.getFullYear();
                        date.setFullYear(x - (x % count));
                    },
                    DECADE:function(date,count){
                        clearInYear(date);
                        date.setFullYear(Math.floor(date.getFullYear() / 10) * 10);
                    },
                    CENTURY:function(date,count){
                        clearInYear(date);
                        date.setFullYear(Math.floor(date.getFullYear() / 100) * 100);
                    }
                };
                self._mapKeys(map);

            }
            map[datepart](date2=new Date(date),count, firstDayOfWeek);
            return date2;
        },
        /*get the last datepart begin of certain datepart
        *
        */
        getTimSpanEnd : function(date, datepart, count,firstDayOfWeek) {
            var self=this;

            date = self._date(date);
            datepart = self._validUnit(datepart);
            firstDayOfWeek = self._numb(firstDayOfWeek);

            count=self._numb(count,1);

            var originalTime = date.getTime(),
                date2 = self.getTimSpanStart(date, datepart, count, firstDayOfWeek);
            if (date2.getTime() < originalTime)
                date2=self.add(date2, datepart, count);
            return date2;
        },
        /*fake a date for a certain timezone (based on the current timezone of "Date object")
        * You have to offset back it, if you expect a total real date:
        *   var localDate = new Date, timezone9Date=xui.Date.offsetTimeZone(localDate, 9);
        *   localDate.toString() == xui.Date.offsetTimeZone(timezone9Date, -9);
        */
        offsetTimeZone:function(date, targetTimeZone, back){
            var self=this;
            date=self._date(date);
            return new Date(date.getTime() + (back?-1:1)*(targetTimeZone - self._timeZone)*self.$TIMEUNIT.h);
        },

        /*get week
        *
        */
        getWeek:function(date, firstDayOfWeek){
            var self=this, date2, y,
                 tz=xui.Date._timeZone, tz1, tz2;
            date=self._date(date);
            firstDayOfWeek = self._numb(firstDayOfWeek),
            y=date.getFullYear();

            tz1 = -date.getTimezoneOffset()/60;
            date = self.add(self.getTimSpanStart(date, 'ww', 1, firstDayOfWeek),'d',6);

            if(date.getFullYear()!=y)return 1;

            date2 = self.getTimSpanStart(date, 'y', 1);
            tz2 = -date2.getTimezoneOffset()/60;
            date2 = self.add(self.getTimSpanStart(date2, 'ww', 1, firstDayOfWeek),'d',6);
            // for DayLight case
            return self.diff(date2, date, 'ww') + 1 + (tz1==tz?0:tz1>tz?1:-1) - (tz2==tz?0:tz2>tz?1:-1);
        },
        parse:function(str, format){
            var rtn;
            if(xui.isDate(str)){
                rtn=str;
            }else{
                // avoid null
                str+="";
                if(isFinite(str)){
                    rtn=new Date(parseInt(str,10));
                }else{
                    if(typeof format=='string'){
                        var a=format.split(/[^ymdhns]+/),
                            b=str.split(/[^0-9]+/),
                            n={y:0,m:0,d:0,h:0,n:0,s:0,ms:0};
                        if(a.length && a.length===b.length){
                            for(var i=0;i<a.length;i++)
                                if(a[i].length)
                                    n[a[i]=='ms'?'ms':a[i].charAt(0)]=parseInt(b[i].replace(/^0*/,''),10);
                            rtn=new Date(n.y,n.m-1,n.d,n.h,n.n,n.s,n.ms);
                        }else
                            rtn=null;
                    }else{

                        var self=this,utc,
                            me=arguments.callee,
                            dp=me.dp||(me.dp={
                              FullYear: 2,
                              Month: 4,
                              Date: 6,
                              Hours: 8,
                              Minutes: 10,
                              Seconds: 12,
                              Milliseconds: 14
                            }),
                            match = str.match(me.iso||(me.iso=/^((-\d+|\d{4,})(-(\d{2})(-(\d{2}))?)?)?T((\d{2})(:(\d{2})(:(\d{2})(\.(\d{1,3})(\d)?\d*)?)?)?)?(([+-])(\d{2})((\d{2}))?|Z)?$/)),
                            date = new Date(0)
                            ;
                        if(match){
                            //month
                            if(match[4])match[4]--;
                            //ms to 3 digits
                            if (match[15]>=5)match[14]++;
                            utc = match[16]||match[18]?"UTC":"";
                            for (var i in dp) {
                                var v = match[dp[i]];
                                if(!v)continue;
                                date["set" + utc + i](v);
                                if (date["get" + utc + i]() != match[dp[i]])
                                    rtn=null;
                            }
                            if(match[18]){
                                var h = Number(match[17] + match[18]),
                                    m = Number(match[17] + (match[20] || 0));
                                date.setUTCMinutes(date.getUTCMinutes() + (h * 60) + m);
                            }
                            rtn=date;
                        }else{
                            if(/^((-\d+|\d{4,})(-(\d{1,2})(-(\d{1,2}))))/.test(str))
                                str = str.replace(/-/g,'/');
                            var r=Date.parse(str);
                            rtn=r?date.setTime(r) && date:null;
                        }
                    }
                }
            }
            return rtn===null?null:isFinite(+rtn)?rtn:null;
        },
        getText:function(date, datepart, firstDayOfWeek){
            var self=this, map=self.$TEXTFORMAT;
            date = self._date(date);
            firstDayOfWeek = self._numb(firstDayOfWeek);
            return map[datepart]?map[datepart](date, false, firstDayOfWeek):datepart;
        },
        format:function(date, format, firstDayOfWeek){
            var self=this, map=self.$TEXTFORMAT;
            date = self._date(date);
            firstDayOfWeek = self._numb(firstDayOfWeek);
            return format.replace(/(utciso|iso|yyyy|mm|ww|dd|hh|nn|ss|ms|de|c|y|q|m|w|d|h|n|s)/g, function(a,b){
                return map[b]?map[b](date,true,firstDayOfWeek):b;
            });
        }
    }
});