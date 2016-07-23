Class("xui.UI.Flash", "xui.UI",{
    Instance:{
        refreshFlash:function(){
            var html='', cls=this.constructor;
            return this.each(function(profile){
                _.resetRun(profile.domId,function(){
                    // clear first
                    cls._clearMemory(profile);
    
                    // build and set flash
                    if(profile.properties.src)
                        cls._drawSWF(profile);
                });
            });
        },
        // Return the flash object
        getFlash:function(){
            return this.constructor._getSWF(this.get(0));
        }
    },
    Static:{
        Appearances:{
            KEY:{
                'font-size':xui.__iefix1,
                'line-height':xui.__iefix1,
                overflow:'hidden'
            },
            BOX:{
                position:'absolute',
                left:0,
                top:0,
                'z-index':1
            },
            COVER:{
                position:'absolute',
                left:'-1px',
                top:'-1px',
                width:0,
                height:0,
                'z-index':4
            }
        },
        Templates:{
            tagName:'div',
            className:'{_className}',
            style:'{_style}',
            BOX:{
                tagName:'div'
            },
            COVER:{
                tagName:'div',
                style:"background-image:url("+xui.ini.img_bg+");"
            }
        },
        Behaviors:{
            onSize:xui.UI.$onSize
        },
        DataModel:{
            selectable:true,
            width:500,
            height:300,
            cover:false,
            src:{
                format:'flash',
                ini:'',
                action:function(v){
                    this.boxing().refreshFlash();
                }
            },
            parameters:{
                ini:{},
                action:function(v){
                    this.boxing().refreshFlash();
                }
            },
            flashvars:{
                ini:{},
                action:function(v){
                    this.boxing().refreshFlash();
                }
            }
        },
        RenderTrigger:function(){
            (this.$beforeDestroy=(this.$beforeDestroy||{}))["flashClearMem"]=function(){
                if(this.box)
                    this.box._clearMemory(this);
            };
            // add swf
            this.boxing().refreshFlash();
        },
        getFlashVersion:function(){
          if(xui.browser.ie){
            try {
              var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
              try{axo.AllowScriptAccess='always'}catch(e){return '6,0,0'}
            }catch(e){}finally{
                try{
                    return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
                }catch(e){}
            }
          }else{
            try {
              if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
                return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
              }
            }catch(e){}
          }
          return '0,0,0';
        },
        _getSWF:function(profile){
            var id= _.isStr(profile)?profile:(this._idtag + profile.serialId);
            return (xui.browser.ie ? window[id] : ((document.embeds && document.embeds[id])||window.document[id])) || document.getElementById(id);
        }, 
        _clearMemory:function(profile){
            var id=this._idtag + profile.serialId;
            var _e=_.fun(), chart = profile.box._getSWF(profile);
            if(chart){
                chart.style.display = 'none';
                if(xui.browser.ie){
                    for(var x in chart )
                        if(typeof chart[x]=='function')
                            chart[x]=_e;                        
                    if(window[id])
                        window[id]=undefined;
                }else{
                    if(document.embeds && document.embeds[id])
                        document.embeds[id]=undefined;
                    if(window.document[id])
                        window.document[id]=undefined;
                }
               chart=_e=null;
            }
        }, 
        _drawSWF:function(profile){
            var ns=this;
            var prop=profile.properties,
                serialId=profile.serialId,
                src=xui.adjustRes(prop.src),
                parameters=prop.parameters,
                options = _.copy(prop.flashvars),
                xml="";

            options.DOMId = profile.box._idtag + profile.serialId;
            options.chartWidth=prop.width;
            options.chartHeight=prop.height;

            if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){
                xml += '<embed type="application/x-shockwave-flash" src="'+ src +'?'+_.urlEncode(parameters)+'" ';
                xml += 'width="'+prop.width+'" height="'+prop.height+'" ';
                xml += 'id="'+ options.DOMId +'" name="'+ options.DOMId +'" ';
                xml += 'wmode="opaque" ';
                xml += 'flashvars="'+ _.urlEncode(options) +'" ';
                xml +=  '/>';
            }else{
                xml += '<object id="'+ options.DOMId +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
                xml += 'width="'+prop.width+'" height="'+prop.height+'">';
                xml += '<param name="movie" value="'+ src +'?'+_.urlEncode(parameters)+'" />';
                xml += '<param name="wmode" value="opaque" />';
                xml += '<param name="flashvars" value="'+ _.urlEncode(options) +'" />';
                xml += '</object>';
            }
            profile.getSubNode('BOX').html(xml, false);
        },
        _onresize:function(profile,width,height){
            var size = profile.getSubNode('BOX').cssSize(),prop=profile.properties;
            if( (width && size.width!=width) || (height && size.height!=height) ){
                // reset here
                if(width)prop.width=width;
                if(height)prop.height=height;

                size={width:width,height:height};
                profile.getSubNode('BOX').cssSize(size,true);
                if(profile.$inDesign || prop.cover){
                    profile.getSubNode('COVER').cssSize(size,true);
                }
                profile.boxing().refreshFlash();
            }
        }
    }
});