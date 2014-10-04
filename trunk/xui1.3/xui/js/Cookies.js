
Class("xui.Cookies", null,{
    Static:{
        set:function(name,value,days,path,domain,isSecure){
	        if(name){
    	        document.cookie = escape(name) + "=" + escape(value) +
    		        (days?";expires="+(new Date((new Date()).getTime()+(24*60*60*1000*days))).toGMTString():"")+
    		        (path?";path="+path:"")+
    		        (domain?";domain="+domain:"")+ 
    		        (isSecure?";secure":"");
    		}
    		return this;
        },
        get:function(name){
        	var i,a,ca = document.cookie.split( "; " );
        	for(i=0;i<ca.length;i++){
        		a=ca[i].split("=");
        		if(a[0]==escape(name))
        		    return a[1]?unescape(a[1]):'';
        	}
        	return null;
        },
        remove:function(name){
        	return this.set(name,"",-1).set(name,"/",-1);
        },
        clear:function(){
            _.arr.each(document.cookie.split(";"),function(o){
                xui.Cookies.remove(_.str.trim(o.split("=")[0]));
            });
        }
    }
});