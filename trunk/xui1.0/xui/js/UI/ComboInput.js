Class("xui.UI.ComboInput", "xui.UI.Input",{
    /*Instance*/
    Instance:{
        _adjustV:function(v){
            var profile=this.get(0),p=profile.properties;
            if(profile.$isNumber){
                v=(''+v).replace(/[^\d.-]/g,'');
                v=_.isNumb(parseFloat(v))?_.toFixedNumber(v,p.precision):null;
            }else if(profile.properties.type=='datepicker'||profile.properties.type=='date'||profile.properties.type=='datetime'){
                v=_.isDate(v)?v:_.isFinite(v)?new Date(parseInt(v,10)):null;                
            }
            return v;
        },
        getValue:function(){
            var v = arguments.callee.upper.apply(this,arguments);
            return this._adjustV(v);
        },
        getUIValue:function(){
            var v = arguments.callee.upper.apply(this,arguments);
            return this._adjustV(v);
        },
        _getCtrlValue:function(){
            return this.get(0).properties.$UIvalue;
            //return this._fromEditor(this.getSubNode('INPUT').attr('value'));
        },
        _setCtrlValue:function(value){
            var ns=this,me=arguments.callee, r1=me._r1||(me._r1=/\</),r2=me._r2||(me._r2=/\<\/?[^>]+\>/g);
            return this.each(function(profile){
                if(!profile.$typeOK)
                    profile.box._iniType(profile);
                var o=profile.getSubNode('INPUT'), type=profile.properties.type;

                value=profile.$_onedit
                    // for enter/esc key, show editMode value
                    ? ns._toEditor(value)
                    : ns.getShowValue(value);

                if(type!=='none'&& type!=='input'&& type!=='password' && !profile.properties.multiLines && typeof value=='string' && r1.test(value))value=value.replace(r2,'');
                o.attr('value',value||'');
                if(type=='colorpicker'||type=='color')
                    o.css({backgroundColor:value, color:xui.UI.ColorPicker.getTextColor(value)});
            })
        },
        _compareValue:function(v1,v2){
            var profile=this.get(0),t;
            if(t= profile.CF.compareValue||profile.$compareValue)
                return t(profile, v1, v2);

            return v1===v2;
        },
        getShowValue:function(value){
            var profile=this.get(0),
                pro=profile.properties,v,t;
            if(!_.isDefined(value))
                value=pro.$UIvalue;

            // try to give default caption
            if(t = profile.CF.getShowValue||profile.$getShowValue)
                v = t(profile, value);
            else{
                //get from items
                if('listbox'==pro.type){
                    var list = (pro.listKey)?xui.UI.getCachedData(pro.listKey):pro.items;
                    if( list && (t=_.arr.subIndexOf(list,'id',value))!=-1){
                      v=list[t].caption;
                      if(v.length>0)
                        v=v.charAt(0)=='$'?xui.getRes(v.slice(1)):v;
                    }else
                        v=null;
                }else
                    v=profile.$showValue;
            }
            if(!_.isSet(v) && (profile.$inputReadonly || pro.inputReadonly))
                v=_.isSet(pro.caption)?pro.caption:null;
            return ""+( _.isSet(v) ? v : _.isSet(value) ? value : "");
        },
        _toEditor:function(value){
            var profile=this.get(0),
                pro=profile.properties,t;
                if(t= profile.CF.toEditor||profile.$toEditor)
                    return t(profile, value);
            return value;
        },
        _fromEditor:function(value){
            var profile=this.get(0),
                pro=profile.properties,t;

                if(t= profile.CF.fromEditor||profile.$fromEditor)
                    return t(profile, value);
            return value;
        },
        _cache:function(focus){
            if(this.isDestroyed())return ;
            var profile=this.get(0);
            
            var drop=profile.$drop, cached=profile.properties.cachePopWnd;
            if(drop){
                if(!cached){
                    drop.boxing().destroy();
                    delete profile.$drop;
                    if(focus)
                        profile.boxing().activate();
                }else{
                    if(!profile.__tryToHide){
                        profile.__tryToHide= _.asyRun(function(){
                            // destroyed
                            if(!profile.box)return;
                            delete profile.__tryToHide;

                            if(xui.browser.opr)
                                drop.getRoot().css('display','none');
                            if(drop.boxing()._clearMouseOver)drop.boxing()._clearMouseOver();
                            profile.getSubNode('POOL').append(drop.getRoot());
                            
                            if(focus)
                                profile.boxing().activate();
                        });
                    }
                }
            }
            delete profile.$poplink;
            return cached;
        },
        clearPopCache:function(){
            var profile=this.get(0);
            if(profile.renderId)
                profile.getSubNode('POOL').empty();
            delete profile.$drop;
            return this;
        },
        setUploadObj:function(input){
            var profile=this.get(0),
                prop=profile.properties,
                c = xui(input).get(0);
            if(c.tagName && c.tagName.toLowerCase()=='input' && c.type=='file'){
                if(profile.renderId && (prop.type=='upload'||prop.type=='file')){
                    var o = profile.getSubNode('FILE').get(0);
                    
                    xui.setNodeData(c.$xid=o.$xid,'element',c);
                    c.id=o.id;
                    c.onclick=o.onclick;
                    c.onchange=o.onchange;
                    o.$xid=null;                
                    o.id=o.onclick=o.onchange=null;
                    //a special node, must delete if from cache here:
                    delete profile.$_domid[profile.keys['FILE']];
                    xui([o]).addPrev(c).remove(false);
                    this.setUIValue(c.value||"");
                }
            }
            return this;
        },
        //for upload ,special must get the original node
        getUploadObj:function(){
            var profile=this.get(0),prop=profile.properties;
            if(profile.renderId && (prop.type=='upload'||prop.type=='file')){
                var o = profile.getSubNode('FILE').get(0);
                if(!o.value)
                    return null;
                    
                var c=o.cloneNode(false);
                c.value="";
                //inner replace
                xui.setNodeData(c.$xid=o.$xid,'element',c);
                c.onclick=o.onclick;
                c.onchange=o.onchange;

                //remove those
                //if(xui.browser.ie)
                //    o.removeAttribute('$xid');
                //else
                //    delete o.$xid;
                //**: "removeAttribute" doesn't work in IE9+
                o.$xid=null;
                
                o.id=o.onclick=o.onchange=null;

                //a special node, must delete if from cache here:
                delete profile.$_domid[profile.keys['FILE']];
                xui([o]).addPrev(c).remove(false);
                c=null;

                this.setUIValue(this.getValue());

                return o;
            }
        },
        resetValue:function(value){
            this.each(function(p){
                if(p.properties.type=='upload'||p.properties.type=='file')
                    p.getSubNode('FILE').attr('value','');
            });
            return arguments.callee.upper.apply(this,arguments);
        },
        _drop:function(e,src){
            return this.each(function(profile){
                var pro = profile.properties, type=pro.type, cacheDrop=pro.cachePopWnd;
                if(pro.disabled||pro.readonly)return;

                if(type=='upload'||type=='file'||type=='none'||type=='input'||type=='password'||type=='spin'||type=='currency'||type=='number')return;
                //open already
                if(profile.$poplink)return;

                var o,v,
                box = profile.boxing(),
                main = profile.getRoot(),
                pos = main.offset(),
                size = main.cssSize()
                ;
                size.width += 2;
                pos.top += main.offsetHeight();


                //special cmd type: getter, 'cmdbox' and 'popbox'
                if((profile.beforeComboPop && false===box.beforeComboPop(profile, pos, e, src))||type=='getter'||type=='cmdbox'||type=='popbox')
                    return;

                if(profile.__tryToHide){
                    clearTimeout(profile.__tryToHide);
                    delete profile.__tryToHide;
                }

                //get cache key
                var cachekey;
                if(cacheDrop){
                    switch(type){
                        case 'timepicker':
                        case 'time':
                        case 'datepicker':
                        case 'date':
                        case 'datetime':
                        case 'colorpicker':
                        case 'color':
                            cachekey=type;
                            break;
                        default:
                            if(pro.listKey)
                                //function no cache
                                if(typeof _.get(xui.$cache,['UIDATA', pro.listKey])=='function')
                                    profile.$drop = cachekey = null;
                                else
                                    cachekey = "!"+pro.listKey;
                            else
                                cachekey = "$"+profile.$xid;
                    }
                    //get from global cache
                    if(cachekey){
                        //filter first
                        _.filter(profile.box.$drop,function(o){
                            return !!o.renderId;
                        });
                        profile.$drop = profile.box.$drop[cachekey];
                    }
                }

                //cache pop
                if(!profile.$drop){
                    switch(type){
                        case 'combobox':
                        case 'listbox':
                        case 'helpinput':
                            o = xui.create('List').render();
                            o.setHost(profile).setDirtyMark(false).setItems(_.copy(pro.items)).setListKey(pro.listKey||'');
                            o.setWidth(pro.dropListWidth || (pro.width-(pro.labelSize||0)));
                            if(pro.dropListHeight)
                                o.setHeight(pro.dropListHeight);
                            else
                                o.adjustSize();
                            o.afterClick(function(){
                                if(!this.destroyed)
                                    this.boxing()._cache(true);
                                else
                                    o.destroy();
                                return false;
                            });
                            o.beforeUIValueSet(function(p, ovalue, value){
                                var b2=this.boxing();
                                if(type=='combobox'){
                                    var item=p.queryItems(p.properties.items,function(o){return o.id==value},false,true);
                                    if(item.length)
                                        value = item[0].caption;
                                }
                                //update value
                                b2.setUIValue(value);

                                //cache pop
                                return b2._cache(true);
                            });
                            break;
                        case 'time':
                        case 'timepicker':
                            o = xui.create('TimePicker').render();
                            o.setHost(profile);
                            o.beforeClose(function(){
                               if(!this.destroyed)
                                    this.boxing()._cache(true);
                                return false
                            });
                            o.beforeUIValueSet(function(p, o, v){
                                var b2=this.boxing();
                                //update value
                                b2.setUIValue(v);
                                return b2._cache(true);
                            });
                            break;
                        case 'date':
                        case 'datepicker':
                        case 'datetime':
                            o = xui.create('DatePicker').render();

                            if(type=='datetime')
                                o.setTimeInput(true);

                            o.setHost(profile);
                            o.beforeClose(function(){
                                if(!this.destroyed)
                                    this.boxing()._cache(true);
                                else
                                    o.destroy();
                                return false
                            });
                            o.beforeUIValueSet(function(p, o, v){
                                var b2=this.boxing();
                                //update value
                                b2.setUIValue(String(v.getTime()));
                                return b2._cache(true);
                            });

                            break;
                        case 'color':
                        case 'colorpicker':
                            o = xui.create('ColorPicker').render();
                            o.setHost(profile);
                            o.beforeClose(function(){
                                if(!this.destroyed)
                                    this.boxing()._cache(true);
                                else
                                    o.destroy();
                                return false
                            });
                            o.beforeUIValueSet(function(p, o, v){
                                var b2=this.boxing();
                                //update value
                                b2.setUIValue('#'+v);
                                return b2._cache(true);
                            });
                            break;
                    }
                    if(_.isHash(pro.popCtrlProp) && !_.isEmpty(pro.popCtrlProp))
                        o.setProperties(pro.popCtrlProp);
                    if(_.isHash(pro.popCtrlEvents) && !_.isEmpty(pro.popCtrlEvents))
                        o.setEvents(pro.popCtrlEvents);

                    profile.$drop = o.get(0);

                    //set to global cache
                    if(cachekey)
                        profile.box.$drop[cachekey]=profile.$drop;
                }

                o=profile.$drop.boxing();
                o.setHost(profile);

                //set pop
                switch(type){
                    case 'combobox':
                    case 'listbox':
                    case 'helpinput':
                    case 'time':
                    case 'timepicker':
                        o.setValue(profile.properties.$UIvalue, true);
                        break;
                    case 'date':
                    case 'datepicker':
                    case 'datetime':
                        var t = profile.$drop.properties;
                        if(t=profile.properties.$UIvalue)
                            o.setValue(new Date( parseInt(t,10)), true);
                        break;
                    case 'color':
                    case 'colorpicker':
                        o.setValue(profile.properties.$UIvalue.replace('#',''), true);
                        break;
                }

                profile.$poplink = o.get(0);

                if(profile.beforePopShow && false===box.beforePopShow(profile, profile.$drop))
                    return;

                //pop
                var node=o.reBoxing();
                node.popToTop(profile.getSubNode('BOX'));

                _.tryF(o.activate,[],o);

                //for on blur disappear
                node.setBlurTrigger(profile.key+":"+profile.$xid, function(){
                    box._cache();
                });

                //for esc
                xui.Event.keyboardHookUp('esc',0,0,0,function(){
                    profile.$escclosedrop=1;
                    _.asyRun(function(){
                        delete profile.$escclosedrop;
                    });
                    box.activate();
                    //unhook
                    xui.Event.keyboardHook('esc');
                    box._cache(true);
                });
                
                if(profile.afterPopShow)
                    box.afterPopShow(profile, profile.$drop);

            });
        },
        expand:function(){
            var profile=this.get(0);
            if(profile.renderId)
                profile.boxing()._drop();
        },
        collapse:function(){
            var profile=this.get(0);
            if(profile.renderId && profile.$poplink)
                profile.boxing()._cache();
        },
        getPopWnd:function(force){
            var profile=this.get(0);
            if(profile.$drop && (force||profile.$poplink))
                return profile.$drop.boxing();
        }
    },
    /*Initialize*/
    Initialize:function(){
        this.addTemplateKeys(['FILE','BTN','TOP','MID','RBTN','R1','R1T','R1B','R2','R2T','R2B']);
        //modify default template for shell
        var t = this.getTemplate();
        _.merge(t.FRAME.BORDER,{
            SBTN:{
                $order:10,
                style:"{_saveDisplay}",
                STOP:{},
                SMID:{
                    className:"{_commandCls}"
                }
            }
        },'all');
        t.FRAME.POOL={};
        t.className +=' {typecls}';

        this.setTemplate(t);

        this._adjustItems=xui.absList._adjustItems;
    },
    Static:{
        _beforeResetValue:function(profile){
            profile.properties.caption=undefined;
        },
        _iniType:function(profile){
            var pro=profile.properties, type=pro.type, c=profile.box;
            delete profile.$beforeKeypress;
            delete profile.$inputReadonly;
            delete profile.$isNumber;
            delete profile.$compareValue;
            delete profile.$getShowValue;
            delete profile.$toEditor;
            delete profile.$fromEditor;
            delete profile.$typeOK;

            if(type=='listbox'||type=='upload'||type=='file'||type=='cmdbox')
                profile.$inputReadonly=true;

            if(type!='listbox' && type!='combobox' && type!='helpinput')
                pro.items=[];

            if(type=='timepicker' || type=='time'){
                var keymap={a:1,c:1,v:1,x:1};
                _.merge(profile,{
                    $beforeKeypress : function(p,c,k){
                        return k.key.length!=1 || /[-0-9:]/.test(k.key)|| (k.ctrlKey&& !!keymap[k.key]);
                    },
                    $getShowValue : function(p,v){
                        return v?xui.UI.TimePicker._ensureValue(p,v):'';
                    },
                    $fromEditor : function(p,v){
                        if(v){
                            v = xui.UI.TimePicker._ensureValue(p,v);
                            if(v=='00:00')v=p.properties.$UIvalue;
                        }
                        return v;
                    }
                },'all');
            }else if(type=='datepicker' || type=='date' || type=='datetime'){
                var date=xui.Date;
                var keymap={a:1,c:1,v:1,x:1};
                _.merge(profile,{
                    $beforeKeypress : function(p,c,k){
                        return k.key.length!=1 || /[0-9:/\-_ ]/.test(k.key) ||(k.ctrlKey && !!keymap[k.key]);
                    },
                    $compareValue : function(p,a,b){
                        return (!a&&!b) || (String(a)==String(b))
                    },
                    $getShowValue : function(p,v){
                        if(p.properties.dateEditorTpl)
                            return v?date.format(v, p.properties.dateEditorTpl):'';
                        else
                            return v?date.getText(new Date(parseInt(v,10)), p.properties.type=='datetime'?'ymdhn':'ymd'):'';
                    },
                    $toEditor : function(p,v){
                        if(!v)return "";

                        v=new Date(parseInt(v,10)||0);
                        if(p.properties.dateEditorTpl)
                            return date.format(v, p.properties.dateEditorTpl);
                        else{
                            var m=(date.get(v,'m')+1)+'',d=date.get(v,'d')+'',h=date.get(v,'h')+'',n=date.get(v,'n')+'';
                            return date.get(v,'y')+'-'+(m.length==1?'0':'')+m+'-'+(d.length==1?'0':'')+d 
                            
                              +(p.properties.type=='datetime'?(" "+(h.length==1?'0':'')+h +":" +(n.length==1?'0':'')+n):"");
                        }
                    },
                    $fromEditor : function(p,v){
                        if(v){
                            if(p.properties.dateEditorTpl)
                                v=date.parse(v, p.properties.dateEditorTpl);
                            else
                                v=xui.Date.parse(v);
                            // set to old UIvalue
                            if(!v){
                                v=p.properties.$UIvalue;
                                if(_.isFinite(v))v=new Date(parseInt(v,10));
                            }
                            if(v){
                                if(p.properties.type!='datetime')
                                    v=date.getTimSpanStart(v,'d',1);
                                // min/max year
                                if(v.getFullYear()<p.properties.min)
                                    v.setTime(p.properties.min);
                                if(v.getFullYear()>p.properties.max)
                                    v.setTime(p.properties.max);
                            }
                        }
                        return v?String(v.getTime()):'';
                    }
                },'all');
            }else if(type=='currency'){
                profile.$isNumber=1;
                var keymap={a:1,c:1,v:1,x:1};
                _.merge(profile,{
                    $beforeKeypress : function(p,c,k){
                        return k.key.length!=1 || /[-0-9,. ]/.test(k.key) ||(k.ctrlKey && !!keymap[k.key]);
                    },
                    $compareValue : function(p,a,b){
                        return ((a===''&&b!=='')||(b===''&&a!==''))?false:p.box._number(p, a)==p.box._number(p, b)
                    },
                    $getShowValue : function(p,v){
                        var pp=p.properties;
                        if(_.isSet(v)&&v!==""){
                            v=_.formatNumeric(p.box._number(p, v), pp.precision, pp.groupingSeparator, pp.decimalSeparator, pp.forceFillZero);
                            if(p.properties.currencyTpl)
                                v=p.properties.currencyTpl.replace("*", v);
                        }else
                            v="";
                        return v;
                    },
                    $toEditor : function(p,v){
                        var pp=p.properties;
                        return (_.isSet(v)&&v!=="")?_.formatNumeric(p.box._number(p, v), pp.precision, pp.groupingSeparator, pp.decimalSeparator, pp.forceFillZero):"";
                    },
                    $fromEditor : function(p,v){
                        return (_.isSet(v)&&v!=="")?p.box._number(p, v):"";
                    }
                },'all');
            }else if(type=='number' || type=='spin'){
                profile.$isNumber=1;
                var keymap={a:1,c:1,v:1,x:1};
                _.merge(profile,{
                    $beforeKeypress : function(p,c,k){
                        return k.key.length!=1 || /[-0-9. ]/.test(k.key)|| (k.ctrlKey && !!keymap[k.key]);
                    },
                    $compareValue : function(p,a,b){
                        return ((a===''&&b!=='')||(b===''&&a!==''))?false:p.box._number(p, a)==p.box._number(p, b)
                    },
                    $getShowValue : function(p,v){
                        var pp=p.properties;
                        v=(_.isSet(v)&&v!=="")?_.formatNumeric(p.box._number(p, v), pp.precision, pp.groupingSeparator, pp.decimalSeparator, pp.forceFillZero):"";
                        if(p.properties.numberTpl)
                            v=p.properties.numberTpl.replace("*", v);
                        return v;
                    },
                    $toEditor : function(p,v){
                        var pp=p.properties;
                        return (_.isSet(v)&&v!=="")?_.formatNumeric(p.box._number(p, v), pp.precision, pp.groupingSeparator, pp.decimalSeparator, pp.forceFillZero):"";
                    },
                    $fromEditor : function(p,v){
                        return (_.isSet(v)&&v!=="")?p.box._number(p, v):"";
                    }
                },'all');
            }

            if(pro.value)
                pro.$UIvalue=pro.value=c._ensureValue(profile,pro.value);

            profile.$typeOK=true;
        },
        $drop:{},
        Appearances:{
            POOL:{
                position:'absolute',
                left:0,
                top:0,
                width:0,
                height:0,
                display:'none',
                visibility:'hidden'
            },
            FILE:{
                opacity:0,
                '*filter':'alpha(opacity=0)',
                'z-index':'3',
                border:0,
                height:'100%',
                width:'100%',
                position:'absolute',
                top:0,
                right:0,
                cursor:'pointer',
                'font-size':'12px',
                overflow:'hidden'
            },
            'KEY-type-number INPUT, KEY-type-spin INPUT, KEY-type-currency INPUT':{
                $order:4,
                'text-align':'right'
            },
            'KEY-type-file INPUT, KEY-type-cmdbox INPUT, KEY-type-listbox INPUT':{
                $order:4,
                cursor:'pointer',
                'text-align':'left',
                overflow:'hidden'
            },
            'KEY-type-file BOX, KEY-type-cmdbox BOX, KEY-type-listbox BOX':{
                $order:4,
                background:xui.UI.$bg('inputbgb.gif', '#fff left bottom repeat-x',"Input")
            },
            'RBTN,SBTN,BTN':{
                display:'block',
                'z-index':'1',
                cursor:'pointer',
                width:'16px',
                height:'20px',
                'font-size':0,
                'line-height':0,
                position:'absolute'
            },
            SBTN:{
                $order:2,
                'z-index':'6'
            },
            'SBTN,BTN,R1,R2':{
                'margin-top':'2px'
            },
            'R1, R2, BTN, SBTN, STOP, TOP, R1T, R2T, R1B, R2B, SMID,MID':{
                background: xui.UI.$bg('bg.gif')
            },
            'SBTN, BTN':{
                $order:1,
                'background-position':'left bottom'
            },
            'R1,R2':{
                $order:1,
                display:'block',
                'font-size':0,
                'line-height':0,
                cursor:'pointer',
                width:'16px',
                position:'absolute',
                height:'50%',
                'background-position':'left bottom',
                'margin-top':'2px'
            },
            R1:{
                top:0
            },
            R2:{
                bottom:'-2px'
            },

            'BTN-mouseover, SBTN-mouseover, R1-mouseover, R2-mouseover':{
                $order:2,
                'background-position': '-16px bottom'
            },
            'BTN-mousedown, SBTN-mousedown, R1-mousedown, R2-mousedown':{
                $order:3,
                'background-position': '-32px bottom'
            },
            'STOP, TOP, R1T, R2T':{
                $order:1,
                cursor:'pointer',
                width:'16px',
                'font-size':0,
                'line-height':0,
                position:'absolute',
                top:'-2px',
                left:0,
                height:'4px',
                'background-position':'left -104px'
            },
            'BTN-mouseover TOP,SBTN-mouseover STOP, R1-mouseover R1T, R2-mouseover R2T':{
                $order:2,
                'background-position': '-16px -104px'
            },
            'BTN-mousedown TOP,SBTN-mousedown STOP, R1-mousedown R1T, R2-mousedown R2T':{
                $order:3,
                'background-position': '-32px -104px'
            },
            'R1B,R2B':{
                cursor:'pointer',
                width:'16px',
                'font-size':0,
                'line-height':0,
                position:'absolute',
                left:0,
                top:'50%',
                'margin-top':'-4px',
                height:'6px',
                'z-index':2
            },
            R1B:{
                $order:1,
                'background-position':'-14px -36px'
            },
            R2B:{
                $order:1,
                'background-position':'left -5px'
            },
            'SMID,MID':{
                $order:2,
                cursor:'pointer',
                width:'16px',
                'font-size':0,
                'line-height':0,
                position:'absolute',
                bottom:'0',
                left:0,
                height:'16px'
            },
            'SMID':{
                $order:3,
                'background-position':'-16px -16px'
            },
            'SMID-save':{
                $order:8,
                'background-position': '-32px 0'
            },
            'SMID-delete':{
                $order:8,
                'background-position': '-32px -16px'
            },
            'SMID-add':{
                $order:8,
                'background-position': '-32px -32px'
            },
            'SMID-remove':{
                $order:8,
                'background-position': '-32px -48px'
            },
            'SMID-select':{
                $order:8,
                'background-position': 'left -16px'
            },
            'SMID-pop':{
                $order:8,
                'background-position': '-32px -64px'
            },
            '.setting-xui-comboinput':{
                'border-style':'solid',
                'border-top-width':'1px',
                'border-bottom-width':'1px',
                'border-left-width':'1px',
                'border-right-width':'1px'
            }
        },

        _objectProp:{tagVar:1,popCtrlProp:1,popCtrlEvents:1},
        Behaviors:{
            HoverEffected:{BOX:'BOX',BTN:'BTN',SBTN:'SBTN',R1:'R1',R2:'R2'},
            ClickEffected:{BTN:'BTN',SBTN:'SBTN',R1:'R1',R2:'R2'},
            FILE:{
                onClick : function(profile, e, src){
                    var prop=profile.properties;
                    if(prop.disabled || prop.readonly)return;
                    if(profile.onFileDlgOpen)profile.boxing().onFileDlgOpen(profile,src);
                },
                onChange:function(profile, e, src){
                    profile.boxing().setUIValue(xui.use(src).get(0).value+'');
                }
            },
            BTN:{
                onClick : function(profile, e, src){
                    var prop=profile.properties;

                    if(prop.type=='popbox' || prop.type=='getter'){
                        if(profile.onClick && false===profile.boxing().onClick(profile, e, src, prop.$UIvalue))
                            return;
                    }

                    if(prop.disabled || prop.readonly)return;
                    profile.boxing()._drop(e, src);
                    return false;
                }
            },
            SBTN:{
                onClick : function(profile, e, src){
                    var prop=profile.properties;
                    if(prop.disabled || prop.readonly)return;
                    if(profile.onCommand)profile.boxing().onCommand(profile,src);
                }
            },
            BOX:{
                onClick : function(profile, e, src){
                    var prop=profile.properties;
                    if(prop.type=='cmdbox'){
                        if(profile.onClick)
                            profile.boxing().onClick(profile, e, src, prop.$UIvalue);
                    //DOM node's readOnly
                    }else if(prop.inputReadonly || profile.$inputReadonly){
                        if(prop.disabled || prop.readonly)return;
                        profile.boxing()._drop(e, src);
                    }
                }
            },
            INPUT:{
                onChange:function(profile, e, src){
                    if(profile.$_onedit||profile.$_inner)return;
                    var o=profile._inValid,
                        b=profile.box,
                        instance=profile.boxing(),
                        v = instance._fromEditor(xui.use(src).get(0).value),
                        uiv=profile.properties.$UIvalue;
                    if(!instance._compareValue(uiv,v)){
                        profile.$_inner=1;
                        delete profile.$_inner;

                        //give a invalid value in edit mode
                        if(v===null)
                            instance._setCtrlValue(uiv);
                        else{
                            // trigger events
                            instance.setUIValue(v);
                            // input/textarea is special, ctrl value will be set before the $UIvalue
                            profile.properties.$UIvalue=v;
                            if(o!==profile._inValid) if(profile.renderId)instance._setDirtyMark();
                        }
                    }
                    b._asyCheck(profile);
                },
                onKeyup:function(profile, e, src){
                    var p=profile.properties,b=profile.box,
                        key=xui.Event.getKey(e);
                    if(p.disabled || p.readonly)return false;
                    if(profile.$inputReadonly || p.inputReadonly)return;

                    // must be key up event
                    if(key.key=='esc'){
                        if(profile.$escclosedrop){
                            return;
                        }
                        
                        profile.$_onedit=true;
                        profile.boxing().setUIValue(p.value,true);
                        profile.$_onedit=false;
                        if(profile.onCancel)
                            profile.boxing().onCancel(profile);
                    }

                    if(p.dynCheck){
                        var value=xui.use(src).get(0).value;
                        profile.box._checkValid(profile, value);
                        profile.boxing()._setDirtyMark();
                    }
                    b._asyCheck(profile);

                    if(key.key=='down'|| key.key=='up'){
                        if(p.type=='spin'){
                            xui.Thread.abort(profile.$xid+':spin');
                            return false;
                        }
                    }
                },
                onMouseup:function(profile, e, src){
                    if(profile.properties.selectOnFocus && profile._justFocus){
                        var node=xui.use(src).get(0);
                        if(!node.readOnly && node.select){
                            _.asyRun(function(){try{node.select()}catch(e){}})
                        }
                        delete profile._justFocus;
                    }
                },
                onFocus:function(profile, e, src){
                    var p=profile.properties,b=profile.box;
                    if(p.disabled || p.readonly)return false;
                    if(profile.onFocus)profile.boxing().onFocus(profile);
                    if(profile.$inputReadonly || p.inputReadonly)return;
                    profile.getSubNode('BORDER').tagClass('-focus');
                    
                    var instance=profile.boxing(),
                        uiv=p.$UIvalue,
                        v=instance._toEditor(uiv),
                        node=xui.use(src).get(0);
                    //string compare
                    if(node.value!==v){
                        //here, dont use $valueFormat, valueFormat or onValueFormat
                        //use $getShowValue, $toEditor, $fromEditor related functions
                        profile.$_onedit=true;
                        node.value=v;
                        delete profile.$_onedit;
                    }

                    //if no value, add mask
                    if(p.mask){
                        var value=node.value;
                        if(!value)
                            _.asyRun(function(){
                                // destroyed
                                if(!profile.box)return;
                                profile.boxing().setUIValue(value=profile.$Mask);
                                b._setCaret(profile,node)
                            });
                    }

                    if(p.selectOnFocus && !node.readOnly && node.select){
                        profile._justFocus=1;
                        if(xui.browser.kde)
                            _.asyRun(function(){try{node.select()}catch(e){}})
                        else{
                            try{node.select()}catch(e){}
                        }
                    }
                    //show tips color
                    profile.boxing()._setTB(3);                
                },
                onBlur:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled || p.readonly)return false;
                    if(profile.onBlur)profile.boxing().onBlur(profile);
                    if(profile.$inputReadonly || p.inputReadonly)return;

                    var b=profile.box,
                        instance=profile.boxing(),
                        uiv=p.$UIvalue,
                        v = instance._fromEditor(xui.use(src).get(0).value);

                    profile.getSubNode('BORDER').tagClass('-focus',false);

                    //onblur check it
                    if(instance._compareValue(p.$UIvalue,v)){
                        profile.box._checkValid(profile, v);
                        instance._setCtrlValue(uiv);
                    }
                    instance._setDirtyMark();
                    b._asyCheck(profile);
                },
                onKeydown : function(profile, e, src){
                   var  p=profile.properties;
                   if(p.disabled || p.readonly)return;
                   var b=profile.box,
                        m=p.multiLines,
                        evt=xui.Event,
                        k=evt.getKey(e);

                    //fire onchange first
                    if(k.key=='enter' && (!m||k.altKey) && !p.inputReadonly && !profile.$inputReadonly){
                        profile.$_onedit=true;
                        profile.boxing().setUIValue(profile.boxing()._fromEditor(xui.use(src).get(0).value),true);
                        profile.$_onedit=false;
                    }

                    b._asyCheck(profile);

                    if(p.mask){
                        if(k.key.length>1)profile.$ignore=true;
                        else delete profile.$ignore;
                        switch(k.key){
                            case 'backspace':
                                b._changeMask(profile,xui.use(src).get(0),'',false);
                                return false;
                            case 'delete':
                                b._changeMask(profile,xui.use(src).get(0),'');
                                return false;
                        }
                    }

                    if(k.key=='down'|| k.key=='up'){
                        if(p.type=='spin'){
                            if(!k.ctrlKey){
                                profile.box._spin(profile, k.key=='up');
                                return false;
                            }
                        }else if(k.ctrlKey && p.type!='none' && p.type!='input' && p.type!='password'){
                            profile.boxing()._drop(e,src);
                            return false;
                        }
                    }
                }
            },
            R1:{
                onMousedown:function(profile){
                    var prop=profile.properties;
                    if(prop.disabled || prop.readonly)return;
                    profile.box._spin(profile, true);
                },
                onMouseout:function(profile){
                    xui.Thread.abort(profile.$xid+':spin');
                },
                onMouseup:function(profile){
                    xui.Thread.abort(profile.$xid+':spin');
                }
            },
            R2:{
                onMousedown:function(profile){
                    var prop=profile.properties;
                    if(prop.disabled || prop.readonly)return;
                    profile.box._spin(profile, false);
                },
                onMouseout:function(profile){
                    xui.Thread.abort(profile.$xid+':spin');
                },
                onMouseup:function(profile){
                    xui.Thread.abort(profile.$xid+':spin');
                }
            }
        },
        EventHandlers:{
            onFileDlgOpen:function(profile, src){},
            onCommand:function(profile, src){},
            beforeComboPop:function(profile, pos, e, src){},
            beforePopShow:function(profile, popCtl){},
            afterPopShow:function(profile, popCtl){},
            onClick:function(profile, e, src, value){}
        },
        _posMap:{
            none:'',
            currency:'',
            'number':'',
            combobox:'left top',
            listbox:'left top',
            file:'-16px top',
            getter:'left -31px',
            helpinput:'-16px -46px',
            cmdbox:'left -16px',
            popbox:'left -46px',
            time:'left -60px',
            date:'left -75px',
            color:'-16px -60px',
 
            // Deprecated
            timepicker:'left -60px',
            datepicker:'left -75px',
            datetime:'left -75px',
            colorpicker:'-16px -60px'
        },
        DataModel:{
            cachePopWnd:true,
            // allowed: yyyy,mm,dd,y,m,d
            // yyyy-mm-dd
            // yyyy/mm/dd
            dateEditorTpl:"",
            
            // for number&currency
            precision:2,
            groupingSeparator:",",
            decimalSeparator:".",
            forceFillZero:true,

            popCtrlProp:{
                ini:{}
            },
            popCtrlEvents:{
                ini:{}
            },
            numberTpl:{
                ini:"",
                action: function(){
                    this.boxing().setUIValue(this.properties.$UIvalue,true);
                }
            },
            currencyTpl:{
                ini:"$ *",
                action: function(){
                    this.boxing().setUIValue(this.properties.$UIvalue,true);
                }
            },
            listKey:{
                set:function(value){
                    var t = xui.UI.getCachedData(value),
                        o=this;
                    o.boxing().setItems(t?_.clone(t):o.properties.items);
                    o.properties.listKey = value;
                }
            },
            dropListWidth:0,
            dropListHeight:0,
            items:{
                ini:[],
                set:function(value){
                    var o=this;
                    value = o.properties.items = o.box._adjustItems(value);
                    if(o.renderId){
                        //clear those
                        o.SubSerialIdMapItem={};
                        o.ItemIdMapSubSerialId={};
                        o.box._prepareItems(o, value);

                        // if popped
                        if(o.$poplink)
                            o.$poplink.boxing().setItems(value).adjustSize();
                        else
                            o.boxing().clearPopCache();
                    }
                }
            },
            btnImage:{
                action: function(value){
                    this.getSubNode('MID')
                        .css('backgroundImage','url('+(value||'')+')');
                }
            },
            btnImagePos:{
                action: function(value){
                    this.getSubNode('MID')
                        .css('backgroundPosition', value);
                }
            },
            type:{
                ini:'combobox',
                listbox:_.toArr('none,input,password,combobox,listbox,file,getter,helpinput,cmdbox,popbox,date,time,datetime,color,spin,currency,number'),
                set:function(value){
                    var pro=this;
                    pro.properties.type=value;
                    if(pro.renderId)
                        pro.boxing().refresh(true);
                }
            },
            increment:0.01,
            min:-Math.pow(10,15),
            // big number for date
            max:Math.pow(10,15),
            commandBtn:{
                ini:"none",
                listbox:_.toArr("none,save,delete,add,remove,pop,select,custom"),
                action:function(v){
                    this.boxing().refresh();
                }
            },
            disabled:{
                ini:false,
                action: function(v){
                    var i=this.getSubNode('INPUT');
                    if(v)
                        i.addClass('xui-ui-inputdisabled');
                    else
                        i.removeClass('xui-ui-inputdisabled');
                    if((""+i.get(0).type).toLowerCase()!='button'){
                        if(!v && (this.properties.readonly||this.$inputReadonly))
                            v=true;
                        // use 'readonly'(not 'disabled') for selection
                        i.attr('readonly',v);
                    }
                }
            },
            inputReadonly:{
                ini:false,
                action: function(v){
                    var n=this.getSubNode('INPUT'),
                        cls=this.getClass('KEY','-inputreadonly');
                    if(v)this.getRoot().addClass(cls);
                    else this.getRoot().removeClass(cls);

                    if(!v && (this.properties.disabled||this.properties.readonly||this.$inputReadonly))
                        v=true;
                    n.attr('readonly',v).css('cursor',v?'pointer':'');
                }
            },
            readonly:{
                ini:false,
                action: function(v){
                    var n=this.getSubNode('INPUT'),
                        cls=this.getClass('KEY','-readonly');                    
                    if(v)this.getRoot().addClass(cls);
                    else this.getRoot().removeClass(cls);

                    if(!v && (this.properties.disabled||this.properties.inputReadonly||this.$inputReadonly))
                        v=true;
                    n.attr('readonly',v).css('cursor',v?'pointer':'');
                        
                }
            },
            // caption is for readonly comboinput(listbox/cmdbox are readonly)
            caption:{
                ini:null,
                set:function(v,force){
                    var p=this.properties;
                    p.caption=v;
                    
                    if(_.isSet(v)){
                        v=v+"";
                        p.caption=xui.adjustRes(v,false);
                    }
                    if(this.renderId){
                        if(this.$inputReadonly || p.inputReadonly){
                            this.getSubNode('INPUT').attr("value",this.boxing().getShowValue());
                        }
                    }
                },
                get:function(){
                    return this.boxing().getShowValue();
                }
            }
        },
        RenderTrigger:function(){
            var self=this,
                instance=self.boxing(),
                p=self.properties;
            self.box._iniType(self);

            if(p.readonly)
                instance.setReadonly(true,true);
            else if(p.inputReadonly)
                instance.setInputReadonly(true,true);
        },
        _spin:function(profile, flag){
            var id=profile.$xid+':spin';
            if(xui.Thread.isAlive(id))return;
            var prop=profile.properties,
                off=prop.increment*(flag?1:-1),
                task={delay:300},
                fun=function(){
                    var v=((+prop.$UIvalue)||0)+off;
                    v=(_.isSet(v)&&v!=="")?_.formatNumeric(profile.box._number(profile, v), prop.precision, prop.groupingSeparator, prop.decimalSeparator, prop.forceFillZero):"";
                    profile.boxing().setUIValue(v);
                    task.delay *=0.9;
                };
            task.task=fun;
            xui.Thread(id,[task],500,null,fun,null,true).start();
        },
        _dynamicTemplate:function(profile){
            var properties = profile.properties,
                hash = profile._exhash = "$" +
                    'multiLines:'+properties.multiLines+';'+
                    'type:'+properties.type+';',
                template = profile.box.getTemplate(hash);

            properties.$UIvalue = properties.value;

            // set template dynamic
            if(!template){
                template = _.clone(profile.box.getTemplate());
                var t=template.FRAME.BORDER;

                switch(properties.type){
                case 'none':
                case 'input':
                case 'currency':
                case 'number':
                    t.BOX.WRAP.INPUT.tagName='input';
                break;
                case 'password':
                    t.BOX.WRAP.INPUT.tagName='input';
                    t.BOX.WRAP.INPUT.type='password';
                break;
                case 'spin':
                    t.RBTN={
                        $order:20,
                        style:"{rDisplay}",
                        R1:{
                            R1T:{},
                            R1B:{}
                        },
                        R2:{
                            R2T:{},
                            R2B:{}
                        }
                    };
                break;
                case 'upload':
                case 'file':
                    t.FILE={
                        $order:20,
                        tagName:'input',
                        type:'file',
                        hidefocus:xui.browser.ie?"hidefocus":null,
                        size:'1'
                    };
                case 'listbox':
                case 'cmdbox':
                    t.BOX.WRAP.INPUT.tagName='input';
                    t.BOX.WRAP.INPUT.type='button';
                default:
                    t.BTN={
                        $order:20,
                        style:"{_popbtnDisplay}",
                        TOP:{},
                        MID:{
                            style:'{_btnStyle}'
                        }
                    };
                }
                if(properties.multiLines){
                    switch(properties.type){
                    case 'none':
                    case 'input':
                    case 'getter':
                    case 'helpinput':
                    case 'popbox':
                    case 'number':
                    case 'combobox':
                        t.BOX.WRAP.INPUT.tagName='textarea';
                        delete t.BOX.WRAP.INPUT.type;
                    }
                }

                // set template
                profile.box.setTemplate(template, hash);
            }
            profile.template = template;
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile),
                map=profile.box._posMap;
            if(map[data.type])
                data._btnStyle = data.btnImage? ('background: url('+data.btnImage+')' + (data.btnImagePos||'')) :('background-position:'+map[data.type]);

            data._type="text";

            data._saveDisplay = data.commandBtn!='none'?'':'display:none';
            data._commandCls = profile.getClass("SMID","-"+data.commandBtn);

            data._popbtnDisplay = (data.type!='none'&&data.type!='input'&&data.type!='password')?'':'display:none';
            data.typecls=profile.getClass('KEY','-type-'+(
            data.type=='colorpicker'?'color'
            :data.type=='datepicker'?'date'
            :data.type=='timepicker'?'time'
            :data.type=='upload'?'file'
            :data.type
            ));
            return data;
        },
        _ensureValue:function(profile, value){
            var me=arguments.callee, reg=me._reg||(me._reg=/^#[\w]{6}$/),prop=profile.properties;
            //if value is empty
            if(!_.isSet(value) || value==='')return '';

            switch(profile.properties.type){
                case 'date':
                case 'datepicker':
                case 'datetime':
                    var d;
                    if(value){
                        if(_.isDate(value))
                            d=value;
                        else if(_.isFinite(value))
                            d=new Date(parseInt(value,10));
                        else
                            d=xui.Date.parse(value+"");
                    }
                    return d?String(profile.properties.type=='datetime'?d.getTime():xui.Date.getTimSpanStart(d,'d',1).getTime()):"";
                case 'color':
                case 'colorpicker':
                    var c=xui.UI.ColorPicker._ensureValue(null,value);
                    return (c!=="transparent"?'#':'')+c;
                case 'time':
                case 'timepicker':
                    return xui.UI.TimePicker._ensureValue(null,value);
                case 'currency':
                case 'number':
                case 'spin':
                    return this._number(profile, value);                
                default:
                    return typeof value=='string'?value:(value||value===0)?String(value):'';
            }
        },        
        _number:function(profile, value){
            var prop=profile.properties;
            value=_.toNumeric(value, prop.precision, prop.groupingSeparator, prop.decimalSeparator, prop.forceFillZero);
            if(_.isSet(prop.max))
                value=value>prop.max?prop.max:value;
            if(_.isSet(prop.min))
                value=value<prop.min?prop.min:value;
            return value;
        },
        _onresize:function(profile,width,height){
            var f=function(k){return k?profile.getSubNode(k).get(0):null},
                v1=f('INPUT'),
                isB=v1.type.toLowerCase()=='button',
                $hborder=1, 
                $vborder=1,
                toff=isB?0:xui.UI.$getCSSValue('xui-comboinput-input','paddingTop'),
                loff=isB?0:xui.UI.$getCSSValue('xui-comboinput-input','paddingLeft'),
                roff=isB?0:xui.UI.$getCSSValue('xui-comboinput-input','paddingRight');

            var t = profile.properties,
                o = profile.getSubNode('BOX'),
                label = profile.getSubNode('LABEL'),
                labelSize=t.labelSize||0,
                labelGap=t.labelGap||0,
                labelPos=t.labelPos || 'left',
                px='px',
                commandbtn=f(t.commandBtn!='none'?'SBTN':null),
            functionbtn=f(t.type=='spin'?'RBTN':(t.type=='none'||t.type=='input'||t.type=='password')?null:'BTN'),
                ww=width,
                hh=height,
                bw1=0,
                bw2=0,
                left=Math.max(0, (t.$b_lw||0)-$hborder),
                top=Math.max(0, (t.$b_tw||0)-$vborder);
            if(null!==ww){
                ww -= Math.max($hborder*2, (t.$b_lw||0)+(t.$b_rw||0));
                bw1=(commandbtn?commandbtn.offsetWidth:0);
                bw2=(functionbtn?functionbtn.offsetWidth:0);
                ww -= (bw1+bw2);
                /*for ie6 bug*/
                /*for example, if single number, 100% width will add 1*/
                /*for example, if single number, attached shadow will overlap*/
                if(xui.browser.ie6)ww=(parseInt(ww/2,10))*2;
            }
            if(null!==hh){
                hh -=Math.max($vborder*2, (t.$b_lw||0) + (t.$b_rw||0));

                if(xui.browser.ie6)hh=(parseInt(hh/2,10))*2;
                /*for ie6 bug*/
                if(xui.browser.ie6&&null===width)o.ieRemedy();
            }
            var iL=left + (labelPos=='left'?labelSize:0),
                iT=top + (labelPos=='top'?labelSize:0),
                iW=ww===null?null:Math.max(0,ww - ((labelPos=='left'||labelPos=='right')?labelSize:0)),
                iH=hh===null?null:Math.max(0,hh - ((labelPos=='top'||labelPos=='bottom')?labelSize:0)),
                iH2=hh===null?null:Math.max(0,height - ((labelPos=='top'||labelPos=='bottom')?labelSize:0));

            if(null!==iW && iW-loff-roff>0)
                v1.style.width=Math.max(0,iW-loff-roff)+px;
            if(null!==iH && iH-toff>0)
                v1.style.height=Math.max(0,iH-toff)+px;

            o.cssRegion({
                left:iL,
                top:iT,
                width:iW,
                height:iH
            });
            
            if(labelSize)
                label.cssRegion({
                    left:ww===null?null:labelPos=='right'?(ww-labelSize+labelGap+bw1+bw2+$hborder*2):0,
                    top: height===null?null:labelPos=='bottom'?(height-labelSize+labelGap):0, 
                    width:ww===null?null:Math.max(0,((labelPos=='left'||labelPos=='right')?(labelSize-labelGap):ww)),
                    height:height===null?null:Math.max(0,((labelPos=='top'||labelPos=='bottom')?(labelSize-labelGap):height))
                });

            iL += (iW||0) + $hborder*2;
            if(commandbtn){
                if(iH2!==null)
                    commandbtn.style.height=Math.max(0,iH2-2) + px;
                if(iW!==null)
                    commandbtn.style.left=iL + px;
                commandbtn.style.top=iT + px;
            }
            iL += bw1;
            if(functionbtn){
                if(iH2!==null)
                    functionbtn.style.height=Math.max(0,iH2-2) + px;
                if(iW!==null)
                    functionbtn.style.left=iL + px;
                functionbtn.style.top=iT + px;

               if(iH2!==null && t.type=='spin'){
                    if(iH2/2-2>0){
                        f('R1').style.height=(iH2/2-2)+px;
                        f('R2').style.height=(iH2/2-2)+px;
                    }
                }
            }

            /*for ie6 bug*/
            if((profile.$border||profile.$shadow||profile.$resizer) && xui.browser.ie){
                o.ieRemedy();
            }

        }
    }
});
