xui.Class("xui.DataBinder","xui.absObj",{
    Instance:{
        _ini:xui.Timer.prototype._ini,
        destroy:function(){
            this.each(function(profile){
                var box=profile.box,name=profile.properties.name;
                //unlink
                xui.arr.each(profile._n, function(v){if(v)box._unBind(name,v)});
                //delete from pool
                delete box._pool[name];
                //free profile
                profile.__gc();
            });
        },
        setHost:function(value, alias){
            var self=this;
            if(value && alias)
                self.setName(alias);
            return arguments.callee.upper.apply(self,arguments);
        },

        isDirtied:function(){
            var elems=this.constructor._getBoundElems(this.get(0));
            for(var i=0,l=elems.length;i<l;i++){
                var profile=elems[i],ins;
                if(profile.box["xui.absValue"]){
                    ins = profile.boxing();
                    if((ins.getUIValue()+" ")!==(ins.getValue()+" ")){
                        return true;
                    }
                }
            }
            return false;
        },
        checkValid:function(ignoreAlert){
            var result=true,profile=this.get(0);
            // check required first
            if(!this.checkRequired(ignoreAlert)){
                return false;
            }
            xui.absValue.pack(this.constructor._getBoundElems(profile),false).each(function(prf){
                if(!prf.boxing().checkValid()){
                    if(!ignoreAlert){
                        if(!prf.beforeInputAlert || false!==prf.boxing().prf.beforeInputAlert(profile, prf, 'invalid')){
                            xui.alert('$inline.invalid',xui.getRes('$inline.invalid') + (prf.properties.labelCaption?(" : " +prf.properties.labelCaption):"")  , function(){
                                if(prf&&prf.renderId)
                                       prf.boxing().activate();
                            });
                        }
                        return result=false;
                    }
                     result=false;
                }
            });
            return result;
        },
        checkRequired:function(ignoreAlert){
            var result = true, i,profile=this.get(0);
            xui.absValue.pack(this.constructor._getBoundElems(profile),false).each(function(prf){
                if(prf.properties.required && (!(i=prf.boxing().getUIValue())) && i!==0){
                    if(!ignoreAlert){
                        if(!prf.beforeInputAlert || false!==prf.boxing().prf.beforeInputAlert(profile, prf, 'required')){
                            xui.alert('$inline.required',xui.getRes('$inline.required') + (prf.properties.labelCaption?(" : " +prf.properties.labelCaption):"")  , function(){
                                if(prf&&prf.renderId)
                                       prf.boxing().activate();
                            });
                        }
                        return result=false;
                    }
                    result=false;
                }
            });
            return result;
        },

        // for UI Controls
        getUI:function(key){
            var r;
            if(!key)
                r=xui.UI.pack(this.constructor._getBoundElems(this.get(0)),false);
            else
                xui.arr.each(this.constructor._getBoundElems(this.get(0)),function(profile){
                    var p=profile.properties;
                    if((p.dataField || p.name || profile.alias)==key){
                        r=profile.boxing();
                        return false;
                    }
                });
            return r;
        },
        getUIValue:function(withCaption, dirtied){
            var ns=this,
                prf=ns.get(0),
                hash={};
            xui.arr.each(this.constructor._getBoundElems(prf),function(profile){
                if(!profile.box["xui.absValue"])return;
                var p=profile.properties,
                    ins = profile.boxing(),
                    // maybe return array
                    uv = ins.getUIValue(),
                    key = p.dataField || p.name || profile.alias, keys;
                // v and uv can be object(Date,Number)
                if(!dirtied || (uv+" ")!==(ins.getValue()+" ")){
                    if(ins.getCaption){
                        if(key.indexOf(":")!=-1){
                            keys=key.split(':');
                        }
                        if(keys && keys[0] && keys[1]){
                            hash[keys[0]]=uv;
                            hash[keys[1]]=ins.getCaption();
                        }else if(withCaption){
                            xui.set(hash,key,{
                                value : uv,
                                caption : ins.getCaption()
                            },true);
                        }else{
                            xui.set(hash,key,uv,true);
                        }
                    }else{
                        xui.set(hash,key,uv,true);
                    }
                }
            });
            return hash;
        },
        // get dirtied UI Value
        getDirtied:function(withCaption){
            return this.getUIValue(withCaption, true);
        },
        getData:function(key, force, ignoreAlert){
            var prf=this.get(0);
            // refresh
            if(prf.$inDesign || force){
                prf.properties.data=  {};
                this.updateDataFromUI(false,false,false,null,null,ignoreAlert,false);
            }

            var data=prf.properties.data;
            return xui.isSet(key)?xui.get(data,key,true):data;
        },
        setData:function(key,value, force){
            var prf=this.get(0), prop=prf.properties;

            //clear data
            if(key===false){
                xui.each(prop.data,function(o,i){
                    prop.data[i]=null;
                });
            }
            // reset all data
            else if(!xui.isSet(key))
                prop.data={};
            // reset all data
            else if(xui.isHash(key))
                prop.data=key;
            // reset one
            else
                xui.set(prop.data,key,value,true);

            if(prf.$inDesign || force){
                this.updateDataToUI();
            }
            return this;
        },
        resetValue:function(){
            xui.arr.each(this.constructor._getBoundElems(this.get(0)), function(p,i){
                    if((i=p.properties.value) !== p.properties.$UIvalue)
                        p.boxing().resetValue(i);
            });
            return this;
        },
        clearValue:function(){
            xui.absValue.pack(this.constructor._getBoundElems(this.get(0)),false).resetValue(null);
            return this;
        },
        updateValue:function(){
            xui.absValue.pack(this.constructor._getBoundElems(this.get(0)),false).updateValue();
            return this;
        },
        updateDataFromUI:function(updateUIValue,withCaption,returnArr,adjustData,dataKeys,ignoreAlert,ignoreEvent){
            var ns=this,
                prf=ns.get(0),
                prop=prf.properties,
                map={},
                mapb;
            if(!ignoreAlert){
                // check valid first
                if(!ns.checkValid()){
                    return false;
                }
                // and check required
                if(!ns.checkRequired()){
                    return false;
                }
            }
            xui.merge(map,prop.data,function(v,t){
                return !dataKeys || dataKeys===t || (xui.isArr(dataKeys)?xui.arr.indexOf(dataKeys,t)!=-1:false);
            });
            xui.arr.each(ns.constructor._getBoundElems(prf),function(profile){
                var p=profile.properties,
                      eh=profile.box.$EventHandlers,
                      ins=profile.boxing(),
                      key=p.dataField || p.name || profile.alias, keys, cap;
                if(typeof(ins.setCaption)=="function" && key.indexOf(":")!=-1){
                    keys=key.split(":");
                    if(keys[1] && keys[2]){
                        key=keys[0];
                        cap=keys[1];
                    }
                }
                if(!dataKeys || dataKeys===key || (xui.isArr(dataKeys)?xui.arr.indexOf(dataKeys,key)!=-1:false)){
                    var b = profile.boxing(),capv,
                        // for absValue, maybe return array
                        uv = profile.box['xui.absValue']?b.getUIValue(xui.isBool(returnArr)?returnArr:profile.__returnArray):null,
                        target = xui.get(map, key, true);
                    // v and uv can be object(Date,Number)
                    if(xui.isHash(target)){
                        var pp=target.properties,theme=target.theme,cc=target.CC,ca=target.CA,cs=target.CS;

                        if(pp)delete target.properties;
                        if(theme)delete target.theme;
                        if(ca)delete target.CA;
                        if(cc)delete target.CC;
                        if(cs)delete target.CS;
                        // remove non-properties
                        xui.filter(target,function(o,i){
                            return !!(i in p);
                        });
                        // reset
                        if(!xui.isEmpty(target)){
                            xui.each(target,function(o,i){
                                if(i in p)target[i]=p[i];
                            });
                        }
                        // reset pp
                        if(xui.isHash(pp)){
                            xui.filter(pp,function(o,i){
                                return i in p && !(i in target);
                            });
                            if(!xui.isEmpty(pp)){
                                xui.each(pp,function(o,i){
                                    if(i in p)pp[i]=p[i];
                                });
                                target.properties=pp
                            }
                        }
                         if(theme)target.theme=profile.theme;
                        if(ca)target.CA=xui.clone(profile.CA,true);
                        if(cc)target.CC=xui.clone(profile.CC,true);
                        if(cs)target.CS=xui.clone(profile.CS,true);

                        if('caption' in p && b.getCaption)
                        if(cap){
                            map[cap]=b.getCaption();
                        }else if('caption' in target || withCaption)
                            if(pp&&'caption' in pp)pp.caption=b.getCaption();else target.caption=b.getCaption();
                        if(xui.isDefined(uv) && 'value' in p)
                            if(pp&&'value' in pp)pp.value=uv;else target.value=uv;
                    }else{
                        if(profile.box['xui.UI.ComboInput'] && (p.type=='file')){
                            target=profile;
                        }else if('caption' in p){
                            capv=typeof(b.getCaption)=="function"?b.getCaption():p.caption;
                            if(cap){
                                target=uv;
                                map[cap]=capv;
                            }else if(withCaption){
                                // igore unnecessary caption
                                if((!capv && !uv) || capv==uv)
                                    target=uv;
                                else
                                    target={value:uv, caption:capv};
                            }else{
                                target=uv;
                            }
                        }else{
                            target=uv;
                        }
                        xui.set(map,key,target,true);
                    }
                    // for absValue
                    if(updateUIValue!==false && profile.renderId && profile.box['xui.absValue'])
                        b.updateValue();
                }
            });

            // adjust UI data
            if(adjustData)
                map = xui.tryF(adjustData,[map, prf],this);

            if(!ignoreEvent && prf.afterUpdateDataFromUI){
                mapb = this.afterUpdateDataFromUI(prf, map);
                if(xui.isHash(mapb))map=mapb;
                mapb=null;
            }

            xui.merge(prf.properties.data,map,'all');

            return true;
        },
        updateDataToUI:function(adjustData, dataKeys, ignoreEvent){
            var key,keys,cap,ins,p,v,c,b,pp,uv,eh,
                ns=this,
                prf=ns.get(0),
                prop=prf.properties,
                map={},mapb;

            xui.merge(map,prop.data,function(v,t){
                return !dataKeys || dataKeys===t || (xui.isArr(dataKeys)?xui.arr.indexOf(dataKeys,t)!=-1:false);
            });

            if(adjustData)
                map = xui.tryF(adjustData,[map, prf],ns);

            if(!ignoreEvent && prf.beforeUpdateDataToUI){
                mapb = ns.beforeUpdateDataToUI(prf, map);
                if(xui.isHash(mapb))map=mapb;
                mapb=null;
            }

            xui.arr.each(ns.constructor._getBoundElems(prf),function(profile){
                p=profile.properties;
                eh=profile.box.$EventHandlers;
                key=p.dataField || p.name || profile.alias;
                ins=profile.boxing();
                if(typeof(ins.setCaption)=="function" && key.indexOf(":")!=-1){
                    keys=key.split(":");
                    if(keys[1] && keys[2]){
                        key=keys[0];
                        cap=keys[1];
                    }
                }

                if(!dataKeys || dataKeys===key || (xui.isArr(dataKeys)?xui.arr.indexOf(dataKeys,key)!=-1:false)){
                    // need reset?
                    if(map && xui.isDefined(xui.get(map,key,true))){
                        v=xui.clone(xui.get(map,key,true),null,2);
                        uv=c=undefined;
                        b=profile.boxing();
                        if(xui.isHash(v)){
                            if(pp=v.properties){
                                xui.filter(pp,function(o,i){
                                    return i in p;
                                });
                                // keep value and caption at first
                                c= (cap&&pp[cap]) || (xui.isSet(pp.caption)?pp.caption:null);
                                uv=xui.isSet(pp.value)?pp.value:null;
                                delete pp.caption;delete pp.value;
                                if(!xui.isEmpty(pp))
                                    b.setProperties(pp);
                                delete v.properties;
                            }
                            if(pp=v.theme){if(typeof(b.setTheme)=="function")b.setTheme(pp);delete v.theme}
                            if(pp=v.CS){if(!xui.isEmpty(pp))b.setCustomStyle(pp);delete v.CS}
                            if(pp=v.CC){if(!xui.isEmpty(pp))b.setCustomClass(pp);delete v.CC}
                            if(pp=v.CA){if(!xui.isEmpty(pp))b.setCustomAttr(pp);delete v.CA}

                            if(!xui.isEmpty(v)){
                                xui.filter(v,function(o,i){
                                    return (i in p) || (i in v);
                                });
                                if(!xui.isEmpty(v)){
                                    // keep value and caption at first
                                    // value and caption in properties have high priority
                                    c=xui.isSet(c)?c:((cap&&pp[cap]) || xui.isSet(v.caption)?v.caption:null);
                                    uv=xui.isSet(uv)?uv:xui.isSet(v.value)?v.value:null;
                                    delete v.caption;delete v.value;

                                    if(!xui.isEmpty(v))
                                        b.setProperties(v);
                                }
                            }
                        }else{
                            uv=v;
                            c= (cap&&pp[cap]) || undefined;
                        }
                        // set value and caption at last
                        if(xui.isDefined(uv) && xui.isFun(b.resetValue)){
                            b.resetValue(uv);
                            profile.__returnArray=xui.isArr(uv);
                        }
                        // set caption
                        if(xui.isDefined(c) && xui.isFun(b.setCaption))
                            xui.tryF(b.setCaption,[c,true],b);
                    }
                }
            });
            return ns;
        }
    },
    Static:{
        $nameTag:"databinder_",
        _pool:{},
        _objectProp:{tagVar:1,propBinder:1,data:1},
        destroyAll:function(){
            this.pack(xui.toArr(this._pool,false),false).destroy();
            this._pool={};
        },
        getFromName:function(name){
            var o=this._pool[name];
            return o && o.boxing();
        },
        _beforeSerialized:xui.Timer._beforeSerialized,
        _getBoundElems:function(prf){
            var arr=[];
            xui.arr.each(prf._n,function(profile){
                // for container
                if(profile.behavior.PanelKeys){
                     xui.absValue.pack(profile.boxing().getChildren(null, true)).each(function(p){
                        arr.push(p);
                    });
                }
                // for absValue
                else if(profile.box['xui.absValue']){
                    arr.push(profile);
                }
            });
            return xui.arr.removeDuplicate(arr);
        },
        _bind:function(name, profile){
            if(!name)return;
            var o=this._pool[name],b;
            if(!o){
                b=new xui.DataBinder();
                b.setName(name);
                o=b.get(0);
            }
            if(profile){
                if(xui.arr.indexOf(o._n,profile)==-1){
                    //use link for 'destroy UIProfile' trigger 'auto unbind function '
                    profile.link(o._n, 'databinder.'+name);
                }
            }
        },
        _unBind:function(name, profile){
            if(profile && profile.box && this._pool[name])
                profile.unLink('databinder.'+name);
        },
        DataModel:{
            dataBinder:null,
            dataField:null,
            "name":{
                set:function(value){
                    var o=this,
                        ovalue=o.properties.name,
                         c=o.box,
                        _p=c._pool,
                        _old=_p[ovalue],
                        _new=_p[value],
                        ui;

                    //if it exists, overwrite it dir
                    //if(_old && _new)
                    //    throw value+' exists!';

                    _p[o.properties.name=value]=o;
                    //modify name
                    if(_old && !_new && o._n.length)
                        for(var i=0,l=o._n.length;i<l;i++)
                            xui.set(o._n[i], ["properties","dataBinder"], value);

                    //pointer _old the old one
                    if(_new && !_old) o._n=_new._n;
                    //delete the old name from pool
                    if(_old)delete _p[ovalue];
                }
            },
            "data":{
                ini:{}
            }
        },
        EventHandlers:{
            beforeInputAlert:function(profile, ctrlPrf, type){},
            beforeUpdateDataToUI:function(profile, dataToUI){},
            afterUpdateDataFromUI:function(profile, dataFromUI){}
        }
    }
});