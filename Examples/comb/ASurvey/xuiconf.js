
// [[Page Appearance
xui.ini.$PageAppearance = {
    "theme":"classic"
};
// ]]Page Appearance
// To set Font Icons CDN
// [[Font Icons CDN
xui.ini.$FontIconsCDN = {
    "fontawesome":{
        "href":"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css",
        "integrity":"sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==",
        "crossorigin":"anonymous"
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
