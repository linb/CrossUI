Class("xui.UI.Poll", "xui.UI.List",{
    Instance:{
        fillContent:function(id, obj){
            var profile=this.get(0),t,item;
            if(profile.renderId){
                if(item=profile.getItemByItemId(id)){
                    t=profile.getSubNodeByItemId('BODY',id).html('');
                    if(obj){
                        item._obj = obj;
                        item._fill=true;
                        if(typeof obj=='string')t.html(obj);
                        else t.append(obj.render(true));
                    }else
                        item._obj=item._fill=null;
                }
            }
            return this;
        },
        _setOptCap:function(item, value){
            return this.each(function(pro){
                var items = pro.properties.items,
                i = pro.queryItems(pro.properties.items, function(o){
                    return o.id==item.id;
                },false,true);
                if(i && (i=i[0])){
                    i.caption=value;
                    if(pro.renderId)
                        pro.getSubNodeByItemId('CAPTION',i.id).html(value);
                }
            });
        },
        getBindEditor:function(){
            return this.get(0)._bind;
        },
        _insertOpt:function(opt){
            if(!opt.id)opt.id='$'+_();
            this.insertItems([opt]);
            return this;
        },
        _removeOpt:function(id){
            this.removeItems([id],'OUTER');
            return this;
        },
        _setDirtyMark:function(){return this}
    },
    Initialize:function(){
        var self=this;
        self.addTemplateKeys(['EDIT']);
        //modify default template fro shell
        var t = self.getTemplate();
        t.ITEMS.className='{_bordertype}';
        t.TITLE={
            $order:2,
            tagName : 'DIV',
            style:'{titleDisplay}',
            text : '{title}',
            className:"xui-uibg-bar xui-uiborder-outset {disabled} {_cls}"
        };
        t.TAIL={
            $order:20,
            tagName : 'DIV',
            className:"xui-uibg-bar xui-uiborder-outset {disabled}",
            text:"{tagCmds}"
        };
        t.$submap={
            items:{
                OUTER:{
                    tagName:'div',
                    className:'xui-uibg-bar xui-uiborder-outset',
                    TOGGLE:{
                        className:'xui-uicmd-toggle',
                        style:'{_togdisplay}'
                    },
                    ITEM:{
                        tabindex: '{_tabindex}',
                        className:'{itemClass} {disabled}',
                        style:'{itemStyle}',
                        OPTION:{
                            $order:0,
                            tagName : 'DIV',
                            MARK2:{$order:1,className:'{_optclass}'}
                        },
                        CAPTION:{
                            $order:1,
                            tagName : 'DIV',
                            text : '{caption}',
                            className:"{disabled} {_itemcls}"
                        },
                        CHART:{
                            $order:2,
                            tagName : 'DIV',
                            style:'{_display}',
                            CAST:{
                                $order:0,
                                text:'{message}'
                            },
                            PROGRESS:{
                                $order:1,
                                style:'background-position: -{_per}px -200px;',
                                PROGRESSI:{}
                            },
                            DEL:{
                                $order:2,
                                className:'xui-ui-btn',
                                style:'{_del}',
                                DELI:{
                                    className:'xui-ui-btni',
                                    DELC:{
                                        className:'xui-ui-btnc',
                                        DELA:{
                                            _NativeElement:true,
                                            tagName:'button',
                                            text:'{removeText}'
                                        }
                                    }
                                }
                            }
                        },
                        CLEAR:{
                            $order:3,
                            tagName : 'DIV'
                        }
                    },
                    BODY:{
                        $order:1,
                        tagName : 'DIV',
                        text:'{_body}'
                    }
                }
            },
            "tagCmds":t.$submap["items.tagCmds"],
            "tagCmds.text":t.$submap["items.tagCmds.text"],
            "tagCmds.button":t.$submap["items.tagCmds.button"],
            "tagCmds.image":t.$submap["items.tagCmds.image"]
        };
        t.ITEMS.className='';
        self.setTemplate(t);

        //for modify
        var inlineEdit=function(profile,node,flag,value,item){
            var o,useC,prop=profile.properties,
                callback=function(v){
                    var b=profile.boxing();
                    switch(flag){
                        //edit option
                        case '1':
                            if(b.beforeOptionChanged(profile, item, v)!==false)
                                b._setOptCap(item,v);
                        break;
                        //new option
                        case '2':
                            if(b.beforeOptionAdded(profile, v)!==false ){
                                var id="["+v.replace(/[^\w_]*/g,'')+"]";
                                b._insertOpt({caption:v,id:id});
                                if(!profile.properties.editable){
                                    profile.boxing().fireItemClickEvent(id);
                                }
                            }
                        break;
                        //edit title
                        default:
                            if(b.beforeTitleChanged(profile, v)!==false)
                                b.setTitle(v);
                    }
                };

            if(profile.onCustomEdit)
                if(o=profile._bind=profile.boxing().onCustomEdit(profile, node, flag, value, item, callback))
                    useC=true;
            if(!useC){
                o=profile._bind;
                if(!o){
                    var pp={type:prop.editorType,commandBtn:'save',left:-10000,top:-10000};
                    profile._bind=o=xui.create('ComboInput', pp);
                    o.onHotKeydown(function(p,key){
                        if(key.key=='enter'){
                            p.boxing().onCommand(p);
                            return false;
                        }else if(key.key=='esc'){
                            o.hide();
                            return false;
                        }
                    })
                    profile.getRoot().append(o);
                }

                var r=node.cssRegion(true,profile.getRoot());
                if(r.height>o.getHeight())
                    o.setHeight(r.height);
                else
                    r.top-=3;
                if(r.top<0)r.top=0;

                o.setValue(value||'',true,'inner')
                .setWidth(r.width + (parseInt(node.css('paddingLeft'),10)||0)+ (parseInt(node.css('paddingRight'),10)||0))
                .onCommand(function(p){
                    var pro=p.properties,v=pro.$UIvalue, ov=pro.value;
                    if(v!=ov)
                        callback(v);
                    _.asyRun(function(){
                        o.hide();
                    });
                })
                .reBoxing()
                .setBlurTrigger(o.KEY+":"+o.$xid, function(){
                    o.hide();
                })
                .show(r.left+'px',r.top+'px');

                _.asyRun(function(){
                    o.activate()
                });
            }
        };

        t = self.getBehavior();
        var old=t.ITEM.onClick;
        t.ITEM.onClick = function(profile, e, src){
            var p = profile.properties,
                item = profile.getItemByDom(src),
                editable=item.id=='$custom' || item.editable;
            if(p.disabled)return;

            if(p.editable)
                inlineEdit(profile, profile.getSubNodeByItemId('CAPTION',item.id), editable?'2':'1', editable?'':item.caption, item);
            else{
                if(editable)
                    inlineEdit(profile, profile.getSubNodeByItemId('CAPTION',item.id), '2');
                else
                    old.apply(this, arguments);
            }
        };
        t.TITLE={
            onClick : function(profile, e, src){
                var p = profile.properties,
                    item = profile.getItemByDom(src);
                if(p.disabled)return;

                if(p.editable)
                    inlineEdit(profile, profile.getSubNode('TITLE'), '3', p.title);
            }
        };
        t.DEL={
            onClick : function(profile, e, src){
                var p = profile.properties,
                    b = profile.boxing(),
                    item = profile.getItemByDom(src);
                if(p.disabled)return;
                if(b.beforeOptionRemoved(profile, item)!==false )
                    b._removeOpt(item.id);
                return false;
            }
        }
        t.CMD={
            onClick : function(profile, e, src){
                var p = profile.properties,
                    key = profile.getSubId(src);
                if(p.disabled)return;
                profile.boxing().onCmd(profile, key, src);
            }
        };
        t.TOGGLE={
            onClick:function(profile, e, src){
                var properties = profile.properties,
                    items=properties.items,
                    item = profile.getItemByDom(src),
                    itemId = profile.getSubId(src),
                    node = xui.use(src),
                    body = profile.getSubNode('BODY',itemId),t
                    ;
                if(item._show){
                    node.tagClass('-checked',false);
                    body.css('display','none');
                }else{
                    node.tagClass('-checked');
                    body.css('display','block');
                    //fill value
                    if(!item._fill){
                        item._fill=true;
                        var callback=function(o){
                            profile.boxing().fillContent(item.id, item._body=o);
                        };
                        if(profile.onGetContent){
                            var r = profile.boxing().onGetContent(profile, item, callback);
                            if(r) callback(r);
                        }else
                            callback(profile.box._buildBody(profile, item));
                    }
                }

                item._show=!item._show;
            }
        };

        self.setBehavior(t);
    },
    Static:{
        _DIRTYKEY:'MARK2',
        _ITEMKEY:'OUTER',
        Appearances:{
            KEY:{
                zoom:xui.browser.ie?1:null
            },
            'TITLE, ITEMS, TAIL':{
                position:'relative',
                overflow:'auto',
                'line-height':'14px'
            },
            TAIL:{
                zoom:xui.browser.ie?1:null,
                'padding':'5px 0 5px 40px'
            },
            CMD:{
                margin:'3px',
                'white-space':'nowrap',
                'vertical-align':'middle'
            },
            TITLE:{
                'font-weight':'bold',
                padding:'4px'
            },
            ITEMS:{
                'overflow-x': 'hidden',
                zoom:xui.browser.ie?1:null
            },
            OUTER:{
                position:'relative',
                zoom:xui.browser.ie?1:null,
                'padding-left':'15px'
            },
            TOGGLE:{
                position:'absolute',
                left:0,
                top:'4px'
            },
            BODY:{
                display:'none',
                'padding-left':'27px'
            },
            ITEM:{
                display:'block',
                position:'relative',
                zoom:xui.browser.ie?1:null,
                padding:'4px 2px 4px 2px'
            },
            OPTION:{
                position:'absolute',
                left:'2px',
                top:'4px'
            },
            CAPTION:{
                'float':'left',
                zoom:xui.browser.ie?1:null,
                'margin-left':'24px',
                //{*1*}for: ie6 double margin bug
                display:xui.browser.ie6?'inline':null
            },
            'EDIT, EDITS':{
                $order:2,
                'float':'none',
                'background-color':'#EBEADB',
                cursor:'pointer',
                //{*1*}for: ie6 double margin bug
                display:xui.browser.ie6?'block':null
            },

            CHART:{
                'float':'right'
            },
            CLEAR:{
                clear:'both',
                'text-align':'right'
            },
            'PROGRESS, PROGRESSI':{
               'background-image':xui.UI.$bg('icons.gif', '',true),
               'background-repeat':'no-repeat',
               width:'200px',
                height:'14px',
                border:0,
                'vertical-align':'middle',
                'line-height':0,
                'font-size':0
            },
            PROGRESS:{
                $order:1,
                'margin-left':'2px',
                'background-position':'-180px -200px'
            },
            PROGRESSI:{
                $order:1,
                'background-position':'-200px -216px'
            },
            DEL:{
                margin:'0 0 0 4px'
            }
        },
        DataModel:{
            $checkbox:1,
            selectable:true,
            noCtrlKey:null,
            title:{
                action:function(v){
                    this.getSubNode('TITLE').html(v);
                }
            },
            selMode:{
                ini:'single',
                listbox:['single','multi'],
                action:function(){
                    this.boxing().refresh();
                }
            },
            noTitle:{
              ini:false,
              action:function(v){
                 this.getSubNode('TITLE').css('display',v?'none':'');
              }
            },
            toggle:{
                ini:false,
                action:function(v){
                    this.getSubNode('TOGGLE',true).css('display',v?'':'none');
                }
            },
            removeText:{
                ini:'remove',
                action:function(v){
                    this.getSubNode('DEL',true).text(v);
                }
            },
            editable:{
                ini:false,
                action:function(v){
                    var self=this,t,cls;
                    self.getSubNode('DEL',true).css('display',v?'':'none');
                    t=self.getSubNode('CAPTION',true).merge(self.getSubNode('TITLE'));
                    cls=self.getClass('EDIT');
                    if(v)
                        t.addClass(cls);
                    else
                        t.removeClass(cls);
                }
            },
            newOption:{
                ini:'',
                action:function(v){
                    var self=this,
                        id='$custom',
                        sid='_special',
                        t,
                        cs=self._cs;
                    if(!v){
                        if(cs)
                            cs.remove();
                    }else{
                        if(!cs){
                            t={
                                id:id,
                                caption:v
                            };
                            t[xui.UI.$tag_subId]=sid;
                            cs=self._buildItems('items',self.box._prepareItems(self,[t]));
                            self.getSubNode('ITEMS').addNext(self._cs=cs);
                        }else
                            self.getSubNodeByItemId('CAPTION',sid).html(v);
                    }
                }
            },
            editorType:'none'
        },
        Behaviors:{
            HoverEffected:{DEL:'DEL',ITEM:'MARK2'},
            ClickEffected:{DEL:'DEL',ITEM:'MARK2'}
        },
        EventHandlers:{
            beforeTitleChanged:function(profile, value){},
            beforeOptionAdded:function(profile, value){},
            beforeOptionRemoved:function(profile, item){},
            beforeOptionChanged:function(profile, item, value){},
            onCustomEdit:function(profile, node, flag, value, item, callback){},
            onCmd:function(profile, key, src){},
            onGetContent:function(profile,item,callback){}
        },
        RenderTrigger:function(){
            var self=this,t=self.properties.newOption;
            if(t)
                self.boxing().setNewOption(t,true);
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile),
                p=profile.properties
            if(p.editable)
                data._cls = profile.getClass('EDIT');
            data.titleDisplay=p.noTitle?'display:none':'';

            this._prepareCmds(profile, data);

            return data;
        },
        _prepareItem:function(profile, item){
            var p = profile.properties, f=profile.CF;
            item._tabindex = p.tabindex;

            if(typeof f.formatCaption == 'function')
                item.caption = f.formatCaption(item.caption);

            item._body= item._body || 'Loading...'
            if(item.id!='$custom'){
                item._togdisplay=((p.toggle && item.toggle!==false) || item.toggle)?'':'display:none;';
                item._optclass=p.selMode=='multi'?'xui-uicmd-check':'xui-uicmd-radio';
                item._display='';
                item.percent = parseFloat(item.percent)||0;
                if(item.percent<0)item.percent=0;
                if(item.percent>1)item.percent=1;
                item._per = 200*(1-item.percent);
            }else{
                item._optclass='xui-uicmd-add';
                item._togdisplay=item._display='display:none;';
                item._per = 0;
                item._itemcls=profile.getClass('EDITS');
            }
            item.removeText=p.removeText;
            item._del='display:none;';
            if((('editable' in item) && item.editable)||p.editable){
                item._itemcls=profile.getClass('EDIT');
                item._del = '';
            }

        },
        _buildBody:function(profile,item){
            return item.text?'<pre>'+item.text.replace(/</g,"&lt;")+'</pre>':'';
        },
        _onresize:function(){}
    }
});
