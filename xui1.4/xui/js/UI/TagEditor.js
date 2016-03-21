Class("xui.UI.TagEditor", ['xui.UI',"xui.absValue"], {
    Dependency:['xui.UI.Input'],
    Instance:{
        activate:function(){
            // activate the first input
            var i=this.getTagInput(0);
            if(i && i.get(0))
                i.activate();
            return this;
        },
        getTagInput:function(index){
            var prf=this.get(0),r=null;
            if(prf.__inputs){
                if(_.isNumb(index)){
                    if(r=prf.__inputs[index])
                        r=r.boxing();
                }else{
                    r=xui.UI.Input.pack(prf.__inputs,false);
                }
            }
            return r;
        },
        _setDirtyMark:function(){
            arguments.callee.upper.apply(this, arguments);

            return this.each(function(profile){
                //format statux
                if(profile.beforeFormatMark && false===box.beforeFormatMark(profile, profile._inValid==2)){}
                else{
                    profile.getSubNode('ERROR').css('display',profile._inValid==2?'block':'none');
                }
            });
        }
    },
    Static:{
        $valuemode:'multi',
        Templates:{
            tagName : 'div',
            style:'{_style}',
            className:'{_className}',
            BORDER:{
               tagName:'div',
               className:'{_bordertype}',
                ITEMS:{
                   $order:10,
                   tagName:'div',
                   style:'{_padding}',
                   text:"{items}"
                }
            },
            ERROR:{
                $order:2
            }
        },
        Appearances:{
            KEY:{
                'font-size':'12px'
            },
            ITEMS:{
                position:'relative',
                overflow:'hidden'
            },
            BORDER:{
                position:'relative',
                overflow:'hidden'
            },
            ERROR:{
                width:'16px',
                height:'16px',
                position:'absolute',
                right:'2px',
                top:'2px',
                display:'none',
                'font-size':0,
                'background-image': xui.UI.$bg('icons.gif', '', true),
                'background-repeat':'no-repeat',
                'background-position':'left -244px',
                'z-index':'50'
            }
        },
        Behaviors:{
            onSize:xui.UI.$onSize
        },
        DataModel:{
            selectable:true,
            borderType:{
                ini:'flat',
                listbox:['none','flat','inset','outset'],
                action:function(v){
                    var ns=this,
                        p=ns.properties,
                        node=ns.getSubNode('BORDER'),
                        reg=/^xui-uiborder-/,
                        pretag='xui-uiborder-',
                        root=ns.getRoot();
                    node.removeClass(reg);
                    node.addClass(pretag+v);

                    //force to resize
                    xui.UI.$tryResize(ns,root.get(0).style.width,root.get(0).style.height,true);
                }
            },
            valueSeparator:{
                ini:',',
                action:function(){
                    //this.properties._valueSeparator=new RegExp("["+this.properties.valueSeparator+"\\s]+");
                }
            },
            padding:{
                ini:"4px",
                action:function(v){
                    this.getSubNode("ITEMS").css("padding",v);
                }
            },
            valueFormat:{
                ini:'',
                action:function(v){
                    var i=this.boxing().getTagInput();
                    if(i)i.setValueFormat(v);
                }
            },
            required:{
                ini:false
            },
            tagCount:{
                ini:3,
                action:function(v){
                    this.boxing().refresh();
                }
            },
            tagMaxlength:{
                ini:6,
                action:function(v){
                    var i=this.boxing().getTagInput();
                    if(i)i.setMaxlength(v);
                }
            },
            tagInputWidth:{
                ini:80,
                action:function(v){
                    var i=this.boxing().getTagInput();
                    if(i)i.setWidth(v);
                }
            },
            tagInputHeight:{
                ini:22,
                action:function(v){
                    var i=this.boxing().getTagInput();
                    if(i)i.setHeight(v);
                }
            },
            tagSpacing:{
                ini:6,
                action:function(v){
                    var i=this.boxing().getTagInput();
                    if(i)i.setCustomStyle("KEY","margin-right:"+(parseInt(v,10)||0)+"px;margin-bottom:"+(parseInt(v,10)||0)+"px;");
                }
            },
            width:300,
            height:32
        },
        RenderTrigger:function(){            
            this.$onValueSet=this.$onUIValueSet=function(o,v){
                v=v.split(this.properties.valueSeparator);
                _.arr.each(this.__inputs,function(o,i){
                    o.boxing().setValue(v[i]||"",true,'render');
                });
            };

            var i=this.boxing().getTagInput();
            if(i)i.render(true);
        },
        _checkValid:function(profile, value){
            if(profile.properties.required && 
                (!value || !value.replace(new RegExp("\\s*\\"+profile.properties.valueSeparator+"\\s*","img"),""))
            ){
                profile._inValid=2;
                return false;
            }else
                profile._inValid=3;
            return true;
        },
        _ensureValue:function(profile, value){
            var prop=profile.properties, nv=[];
            if(!value)
                value="";
            // ensure array
            if(_.isStr(value))
                value=value.split(prop.valueSeparator);
            // ensure count
            for(var i=0,vv;i<prop.tagCount;i++){
                vv=value[i];
                // ensure string
                if(!vv)
                    vv="";
                // ensure string maxlength
                if(vv.length>prop.tagMaxlength)
                    vv=vv.slice(0,prop.tagMaxlength);
                vv=_.str.trim(vv);
                if(vv)
                    nv.push(vv);
            }
            return nv.join(prop.valueSeparator);
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            data._bordertype='xui-uiborder-'+data.borderType;
            
            
            
            var prop=profile.properties,
                inputs=[],properties,events,CS,iprf;
            if(prop.padding)
                data._padding = "padding:"+prop.padding;
            
            //prop._valueSeparator = new RegExp("["+prop.valueSeparator+"\\s]+");
            
            var vs = this._ensureValue(profile,prop.value).split(prop.valueSeparator);
            
            if(prop.tagSpacing)
                CS={
                    KEY:"margin-right:"+prop.tagSpacing+"px;margin-bottom:"+prop.tagSpacing+"px;"
                };

            properties = {
               position:'relative',
               width:prop.tagInputWidth,
               height:prop.tagInputHeight,
               maxlength:prop.tagMaxlength,
               valueFormat:prop.valueFormat,
               dirtyMark:false 
            };
            
            for(var i=0;i<prop.tagCount;i++){
                properties.value=vs[i]||"";
                
                iprf=(new xui.UI.Input(properties,events,null,profile.theme,CS)).get(0);
                
                iprf.$onUIValueSet=function(v){
                    var pf=this,index,arr=[];
                    _.arr.each(profile.__inputs,function(o,i){
                         arr.push(_.str.trim(o.boxing().getUIValue()||""));
                         if(o===pf)index=i;
                    });
                    _.filter(arr,function(o,i){
                        return o.replace(/\s+/g,'')!=='';
                    });
                    var sp=profile.properties.valueSeparator,uiv=arr.join(sp);
                    var oi=profile._inValid;
                    profile.boxing().setUIValue(uiv,null,null,'inner');
                    
                    // input/textarea is special, ctrl value will be set before the $UIvalue
                    prop.$UIvalue=uiv;
                    if(oi!==profile._inValid) if(profile.renderId)profile.boxing()._setDirtyMark();
                    
                    // ensure no valueSeparator
                    return uiv.split(sp)[index]||"";
                };

                inputs.push(iprf);
            }

            // to html, but not render
            data.items=xui.UI.Input.pack(inputs,false).toHtml();
            
            // keep refrence
            profile.__inputs=inputs;
            
            return data;
        },
        _onresize:function(profile,width,height){
            var size=profile.properties.borderType!='none'?2:0;
            if(height)
                profile.getSubNode('BORDER').height(height=='auto'?height:(height-size));
            if(width)
                profile.getSubNode('BORDER').width(width=='auto'?width:(width-size));
        }
    }
});

