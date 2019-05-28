xui.Class("xui.Cookies", null,{
    Static:{
        set:function(name,value,days,path,domain,isSecure){
            if(xui.isHash(name)){
                for(var i in name) this.set(i, name[i],days,path,domain,isSecure);
           }else{
	           if(typeof value !="string")value=xui.serialize(value);
    	       document.cookie = escape(name+'') + "=" + escape(value) +
    		        (days?"; expires="+(new Date((new Date()).getTime()+(24*60*60*1000*days))).toGMTString():"")+
    		        (path?"; path="+path:"")+
    		        (domain?"; domain="+domain:"")+ 
    		        (isSecure?"; secure":"");
    	    }
            return this;
        },
        get:function(name){
        	var i,a,s,ca = document.cookie.split( "; " ),hash={},unserialize=function(v){
                return  /^\s*\{[\s\S]*\}$/.test(v) ? xui.unserialize(v) : /^\s*\[[\s\S]*\]$/.test(v) ? xui.unserialize(v) : v;
            };
        	for(i=0;i<ca.length;i++){
        		a=ca[i].split("=");
    	        s=a[1]?unescape(a[1]):'';
    	        hash[a[0]] = unserialize(s)||s;
        		if(name && a[0]==escape(name))
        		    return hash[a[0]];
        	}
        	return name?null:hash;
        },
        remove:function(name){
        	return this.set(name,"",-1).set(name,"/",-1);
        },
        clear:function(){
            xui.arr.each(document.cookie.split(";"),function(o){
                xui.Cookies.remove(xui.str.trim(o.split("=")[0]));
            });
        }
    }
});