
// [[Page Appearance
xui.ini.$PageAppearance = {
    "theme":"classic"
};
// ]]Page Appearance
// To set Font Icons CDN
// [[Font Icons CDN
xui.ini.$FontIconsCDN = {
    "fontawesome":{
        "href":"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
        "integrity":"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
    }
};
// ]]Font Icons CDN
// To set default prop to all xui.UI instances
// [[Default Prop
xui.ini.$DefaultProp={
    "dirtyMark": false,
    "xui.UI.Dialog":{
        "maxBtn": false
    }
};
// ]]Default Prop

// To set Web API mocker
// [[Web API Mocker
 xui.ini.$WebAPIMocker={
//    "remoteSericeURL":"",
//    "mockerURL":"",
//    "blacklist":{
//      "xxx":1
//    },
//    "whitelist":{
//      "yyy":1
//    }
};
// ]]Web API Mocker
// [[Develop Env Setting
xui.ini.$DevEnv = {
    "designViewConf":{
        "width":600,
        "height":960
    }
};
// ]]Develop Env Setting
//
// [[Global Functions
xui.$cache.functions = {
    "tooptions":{
        "desc":"",
        "params":[],
        "actions":[{
            "desc":"set var",
            "type":"other",
            "target":"callback",
            "args":[{
                "ipage":"status_options",
                "tab":"home"
            }],
            "method":"setFI"
        }]
    }
};
// ]]Global Functions
