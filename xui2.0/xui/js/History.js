Class("xui.History",null,{
    Static:{
        _fid:'xui:history',
        _type:(xui.browser.ie && (xui.browser.ver<8))?'iframe':("onhashchange" in window)?'event':'timer',
        _excallback:null,
        _callback:function(fragment, init, newAdd){
            var ns=this, arr=[], f;
            xui.arr.each(xui.Module._cache,function(m){
              // by created order
               if(m._events && ('onFragmentChanged' in m._events)){
                   // function or pseudocode
                   if(xui.isFun(f = m._events.onFragmentChanged) || (xui.isArr(f) && f[0].type)){
                       m.fireEvent('onFragmentChanged', [fragment, init, newAdd]);
                   }
               }
            });
            // the last one
            if(xui.isFun(ns._excallback))
                ns._excallback(fragment, init, newAdd);
        },
        /* set callback function
        callback: function(hashStr<"string after #!">)
        */
        setCallback: function(callback){
            var self=this,
                hash = location.hash;
            if(hash)hash='#!' + encodeURIComponent((''+decodeURIComponent(hash)).replace(/^#!/,''));
            else hash="#!";
            self._excallback = callback;

            self._lastFI = decodeURIComponent(hash);
            switch(self._type){
                case 'event':
                    window.onhashchange=self._checker;
                break;
                case "iframe":
                    document.body.appendChild(document.createElement('<iframe id="'+self._fid+'" src="about:blank" style="display: none;"></iframe>'));
                    var doc=document.getElementById(self._fid).contentWindow.document;
                    doc.open("javascript:'<html></html>'");
                    doc.write("<html><head><scri" + "pt type=\"text/javascript\">parent.xui.History._checker('"+hash+"');</scri" + "pt></head><body></body></html>");
                    doc.close();
                case 'timer':
                    if(self._itimer)
                        clearInterval(self._itimer);
                    self._itimer = setInterval(self._checker, 200);
                break;
            }
            self._callback(decodeURIComponent(self._lastFI.replace(/^#!/, '')), true, callback);

            return self;
        },
        _checker: function(hash){
            var self=xui.History;
            switch(self._type){
                case "iframe":
                    if(xui.isSet(hash))
                        location.hash=hash;
                case 'event':
                case 'timer':
                    if(decodeURIComponent(location.hash) != decodeURIComponent(self._lastFI)) {
                        self._lastFI = decodeURIComponent(location.hash);
                        self._callback(decodeURIComponent(location.hash.replace(/^#(!)?/, '')));
                    }
                break;
            }
        },
        getFI:function(){
            return this._lastFI;
        },
        /*change Fragement Identifier(string after '#!')
        */
        setFI:function(fi,triggerCallback){
            var self=this;
            // ensure encode once
            if(fi)fi='#!' + encodeURIComponent((''+decodeURIComponent(fi)).replace(/^#!/,''));
            else fi="#!";
            if(self._lastFI == decodeURIComponent(fi))return false;

            switch(self._type){
                case "iframe":
                    var doc=document.getElementById(self._fid).contentWindow.document;
                    doc.open("javascript:'<html></html>'");
                    doc.write("<html><head><scri" + "pt type=\"text/javascript\">parent.xui.History._checker('"+fi+"');</scri" + "pt></head><body></body></html>");
                    doc.close();
                break;
                case 'event':
                case 'timer':
                    location.hash = self._lastFI = decodeURIComponent(fi);
                if(triggerCallback!==false)
                    self._callback(decodeURIComponent(fi.replace(/^#!/,'')));
                break;
            }
        }
    }
});