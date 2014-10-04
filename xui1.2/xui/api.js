/***

*==how to use==
*   add <script src=".../api.js?key=value&..."></script> to head/body
*   if script is in 'head', it'll load script to the current window
*   if script is in 'body', 
*       if type==frm, it'll load script to an iframe
*       if type==frm, it'll load script to the current body

*==parameters==
*   module: api module name, e.g. "m1"
*   ver: version mark, e.g. "1.0.00"
*   type: frame mark e.g. "frm","div","htm"
*   width, height: for the  attribute of iframe or div
*   appPath: app path, e.g. "http://www.x.com/", for xui.ini.appPath

*==cache setting==
*   set this file: expired already, and never cached
*   set all in verPath: gzip, never expired, cached for ever, and when version updated need to change file name(version)

***/
new function(){
    
    var key="___xui____api____",
        
        //load api timeout(seconds)
        timeout=60,
        //window.xui is the lib root var
        libKey = "xui",
        //xui path
        libPath = "",
        //xui js file Path
        libName = "js/xui.js",
        //verPath
        verPath = "",        
        //remote app root path(modules'll be in this path), e.g. apis
        apiPath = "",
        //app path, e.g. "http://www.x.com/", for xui.ini.appPath (notice: xui.ini.path get from the src property of xui.js file)
        appPath = "",
        //ini string
        iniStr = '<div id="loading"><img src="../runtime/loading.gif" alt="Loading..." /></div>',

        //default version mark
        dft_ver = "";

    new function(){
        var d = document,
            t = d.getElementsByTagName('script'),
            r = (t[t.length-1]),
            v = r.parentNode==d.getElementsByTagName('head')[0],
            s = r.src.replace(/^[^\?]+\??/,'').replace(/%\w?$/, ""),
            id = "XUI:API.NODE:" + new Date().getTime() + Math.ceil(Math.random()*10000),
            index, a, b, i, h={}, path, appPath, rPath;
        if(s){
            a = s.split('&');
            for(i=0;t=a[i];i++)
                if(t){
                    b=t.split('=');
                    h[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
                }
        }

        if(dft_ver = h.ver || dft_ver);
            h.ver = dft_ver;
        if(verPath= h.verPath || verPath)
            h.verPath=verPath;
        if(appPath = h.appPath || appPath)
            h.appPath=appPath;
        //dummy
        if(!h.type && h.dummy)
            h.dummy=location.href.split('?')[0].split('#')[0]+"?$_dummy_$";

        if(appPath && !/\/$/.test(appPath+"")) appPath+='/';
        //default is the current html file path
        appPath = h.appPath || location.href.split('?')[0].replace(/[^\\\/]+$/,'');
        rPath = appPath+(verPath?verPath+"/":"")+(dft_ver?dft_ver+"/":"");
        h.path = rPath + libPath;
        path = rPath + libPath + libName;

        a=[];
        a.push('"appPath":"'+appPath+'"');

        if(v){
            //check overlap, if api script in head tag
            if(!window[key])window[key]=1;else return;
            
            for(i in h)
                a.push('"'+i+'":"'+h[i]+'"');
            s='window.xui_ini=({'+a.join(',')+'})';

            d.write('<script>'+ s + '</script>');
            d.write('<script src="'+ path + '"></script>');
            if(h.module)
                 d.write('<script src="'+ rPath + (apiPath?apiPath+"/":"")+ h.module + '.js"></script>');
        }else{
            h.width=h.width||560;
            h.height=h.height||80;
            a.push('"nodeid":"'+id+'"');
            for(i in h)
                a.push('"'+i+'":"'+h[i]+'"');
            s='window.xui_ini=({'+a.join(',')+'})';
            d.open();
            //show in iframe
            if(h.type=='frm'){
                d.write('<iframe id=' +id+ ' name=' +id+ ' width="' + h.width + '" height="'+ h.height +'" frameborder="' +(h.frameborder?'1':'0')+ '" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no"></iframe>');
                setTimeout(function(){
                    var t=document.getElementById(id);
                    if(!t){
                        if(++index>20*timeout)return;
                        setTimeout(arguments.callee,50);
                    }else{
                        var d = (t.contentWindow || t).document;
                        d.open();
                        d.write(
                            '<script>'+s+'</script>'
                            + '<script src="'+ path + '"></script>'
                            + (h.module ?  '<script src="'+ rPath + (apiPath?apiPath+"/":"")+ h.module + '.js"></script>' : '')
                            + iniStr
                        );
                        d.close();
                    }
                },0);
            //show in div
            }else{
                d.write( '<script>'+s+'</script>'
                    + (window[libKey]?'':'<script src="'+ path + '"></script>')
                    + (h.module ?  (h.type=='div'?'<div id=' +id+ ' style="width:' + h.width + 'px; height:'+ h.height +'px;position:relative;">'+ iniStr + '</div>':'') 
                        + '<script src="'+ rPath + (apiPath?apiPath+"/":"")+ h.module + '.js"></script>' : ''
                      )
                );
            }
           d.close();
        }
    }
}