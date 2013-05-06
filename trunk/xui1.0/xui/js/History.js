Class("xui.History",null,{
    Static:{
        _fid:'xui:history',
        /* set callback function
        callback: function(hashStr<"string after #!">)
        */
    	setCallback: function(callback){
    	    var self=this;
    		self._callback = callback;
    		var hash = location.hash;
            if(callback){
        		self._lastFI = hash;
        		if(xui.browser.ie) {
        			if(self._lastFI=='')self._lastFI = '#!';
    
                    if(parseInt(xui.browser.ver,10)<9) {
                        var n=document.createElement("div");
                        n.style.display = "none";
                        document.body.appendChild(n);
            			n.innerHTML = '<iframe id="'+this._fid+'" style="display: none;"></iframe>';
            			var ihistory = document.getElementById(this._fid), iframe = ihistory.contentWindow.document;
            			iframe.open();
            			iframe.close();
            			iframe.location.hash = hash;
            			n=null;
            		}else{
            		    location.hash = hash;
            		}
        		}else if(xui.browser.kde && !xui.browser.isChrome) {
        			// etablish back/forward stacks
        			self.backStack = [];
        			self.backStack.length = history.length;
        			self.forwardStack = [];
        		}
        		self._callback(hash.replace(/^[#!]+/, ''));
                clearInterval(self._itimer);
                self._itimer = setInterval(self._timer,100);
            }else
                clearInterval(self._itimer);

    		return self;
    	},
        //cross case=>
	    //  1: goto another url, and back
	    //  2: back to another url, and forward
        //check location.hash change periodically
    	_timer: function(){
    	    var self=xui.History,hash;
    	    if(typeof self._callback!='function'){
    	        clearInterval(self._itimer);
    	        return;
    	    }

    		if(xui.browser.ie) {
		        if(parseInt(xui.browser.ver,10)<9) {
        		    var ihistory = document.getElementById(self._fid), 
        		        iframe = ihistory.contentWindow.document;
        		    hash = iframe.location.hash;
        			if(hash != self._lastFI) {
        				self._lastFI = location.hash = hash;
        				self._callback(hash.replace(/^[#!]+/, ''));
        			}
		        }else{
		            hash=location.hash;
        			if(hash != self._lastFI) {
        				self._lastFI = hash;
        				self._callback(hash.replace(/^[#!]+/, ''));
        			}
		        }    			
    		}else if(xui.browser.kde && !xui.browser.isChrome) {
    			if(!self.dontCheck) {
    			    var backStack=self.backStack,
    			        forwardStack=self.forwardStack,
    				    historyDelta = history.length - backStack.length;
    				//for back button or forward button
    				if(historyDelta) {
                        //back button case
    					if(historyDelta<0)
    						for (var i = 0; i < Math.abs(historyDelta); i++) forwardStack.unshift(backStack.pop());
    					//forward button case
    					else
    						for (var i = 0; i < historyDelta; i++) backStack.push(forwardStack.shift())
    					
    					var cachedHash = backStack[backStack.length-1];
    					if (cachedHash !== undefined) {
    						self._lastFI = location.hash;
    						self._callback(cachedHash);
    					}else{
    					    //cross case=>
    					}
    				}else if(backStack[backStack.length-1]===undefined){
    				    if(self._lastFI != location.hash){
    				        //cross case=>
        				    self._lastFI = location.hash;
        				    self._callback(location.hash);
        				}
    				}
    			}
    		}else{
    			// otherwise, check for location.hash
    			hash = location.hash;
    			if(hash != self._lastFI) {
    				self._lastFI = hash;
    				self._callback(hash.replace(/^[#!]+/, ''));
    			}
    		}
    	},
    	getFI:function(){
    	    return this._lastFI;
    	},
        /*change Fragement Identifier(string after '#!')
        */
    	setFI:function(fi,triggerCallback){
    	    var self=this;
    	    if(!self._callback)return;
    	    if(fi)fi=(''+fi).replace(/^[#!]+/,'');
            if(self._lastFI == '#!' + fi)return false;

    		if(xui.browser.ie) {
    		    if(parseInt(xui.browser.ver,10)<9) {
        			var ihistory = document.getElementById(self._fid), iframe = ihistory.contentWindow.document;
                    iframe.open();
        			iframe.close();
        			iframe.location.hash = location.hash = self._lastFI = '#!' + fi;
    		    }else{
    		        location.hash=self._lastFI = '#!' + fi;
        		}
    		}else if(xui.browser.kde && !xui.browser.isChrome) {
    			self.dontCheck = true;
        		self.backStack.push(fi);
        		self.forwardStack.length = 0;
    			var t=self;
    			_.asyRun(function(){t.dontCheck=false;t=null;},300);
    			location.hash = self._lastFI = fi;
    		}else
    		    location.hash = self._lastFI = '#!' + fi;
            if(triggerCallback!==false)
		        _.tryF(self._callback,[fi]);
    	}
    }
});