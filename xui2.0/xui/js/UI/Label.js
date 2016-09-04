Class("xui.UI.Label", "xui.UI",{
    Initialize:function(){
        // compitable
        xui.UI.SLabel = xui.UI.Label;
        var key="xui.UI.SLabel";
        xui.absBox.$type[key.replace("xui.UI.","")]=xui.absBox.$type[key]=key;
    },    
    Static:{
        Templates:{
            tagName:"label",
            className:'{_className}',
            style:'{_style};text-align:{hAlign}',
            ICON:{
                $order:0,
                className:'xuicon {imageClass}',
                style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
            },
            CAPTION:{
                text : '{caption}',
                style:'{_fc}{_fw}{_fs}',
                'font-size':'1em',
                $order:1
            }
        },
        Appearances:{
        },
        DataModel:{
            selectable:true,
            caption:{
                ini:undefined,
                action: function(v){
                    v=(_.isSet(v)?v:"")+"";
                    this.getSubNode("CAPTION").html(xui.adjustRes(v,true));
                }
            },
            image:{
                format:'image',
                action: function(value){
                    var self=this,k=self.keys;
                    self.getSubNodes('ICON')
                        .css('display',value?'':'none')
                        .css('backgroundImage',value?('url('+xui.adjustRes(value||'')+')'):'');
                }
            },
            imagePos:{
                action: function(value){
                    var self=this,k=self.keys;
                    self.getSubNodes('ICON')
                        .css('backgroundPosition', value);
                }
            },            
            hAlign:{
                ini:'right',
                listbox:['left','center','right'],
                action: function(v){
                    this.getRoot().css('textAlign',v);
                }
            },
            'fontColor':{
                ini:'',
                type:"color",
                action: function(value){
                    this.getSubNode("CAPTION").css('color', value);
                }
            },
            'fontSize':{
                combobox:["","1.2em","1.5em","2em","3em"],
                action: function(value){
                    this.getSubNode("CAPTION").css('fontSize', value);
                }
            },
            'fontWeight':{
                combobox:["","normal","bolder","bold","lighter","100","200","300","400","500","600","700","800","900"],
                action: function(value){
                    this.getSubNode("CAPTION").css('fontWeight', value);
                }
            }            
        },
        Behaviors:{
            HoverEffected:{KEY:'KEY'},
            onClick:function(profile, e, src){
                var p=profile.properties;
                if(p.disabled)return false;
                if(profile.onClick)
                    return profile.boxing().onClick(profile, e, src);
            }
        },
        EventHandlers:{
            onClick:function(profile, e, src){}
        },
        _prepareData:function(profile, data){
            data=arguments.callee.upper.call(this, profile,data);
            data._fs = 'font-size:' + data.fontSize + ';';
            data._fw = 'font-weight:' + data.fontWeight + ';';
            data._fc = 'color:' + data.fontColor + ';';
            return data;
        }        
    }
});
