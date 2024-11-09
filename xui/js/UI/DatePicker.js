xui.Class('xui.UI.DatePicker', ['xui.UI',"xui.absValue"], {
    Required:['xui.Date'],
    Instance:{
        activate:function(){
            this.getSubNode('PRE').focus(true);
            return this;
        },
        _setCtrlValue:function(value){
            return this.each(function(profile){
                if(!profile.renderId)return;
                var cls = profile.box,
                    p = profile.properties;
                cls._to(profile,value,true);
                if(profile.keys.CAPTION)
                    profile.getSubNode('CAPTION').html(xui.Date.getText(value,'ymd',xui.getFirstDayOfWeek(p)),false);
            });
        },
        getDateFrom:function(){
            return this.get(0)._realstart;
        }
    },
    Initialize:function(){
        var self=this,
            id=xui.UI.$ID,
            tag=xui.UI.$tag_special,
            cls=xui.UI.$CLS,
            key=self.KEY;

        self.addTemplateKeys(['H', 'COL', 'W','TBODY', 'THEADER','TD']);
        var colgroup = '<colgroup id="'+key+'-COL:'+id+':"  class="'+tag+'COL_CS'+tag+' xui-custom {comcls}"  style="'+tag+'COL_CS'+tag+'"><col width="1px"/><col width=""/><col width=""/><col width=""/><col width=""/><col width=""/><col width=""/><col width=""/></colgroup>',
            thead1='<thead ID="'+key+'-THEADER:'+id+':" class="'+tag+'THEADER_CS'+tag+' xui-custom {comcls}"  style="'+tag+'THEADER_CS'+tag+'" ><tr height="1px"><th id="'+key+'-H:'+id+':7" class="xui-node  xui-node-th xui-uiborder-b xui-uiborder-r '+cls+'-h '+cls+'-w '+tag+'H_CC'+tag+' xui-custom {comcls}" style="'+tag+'H_CS'+tag+'"></th>',
            thead2='</tr></thead>',
            th='<th id="'+key+'-H:'+id+':@" class="xui-node xui-node-th xui-uiborder-b xui-uiborder-r '+cls+'-h '+tag+'H_CC'+tag+' xui-custom {comcls}"  style="'+tag+'H_CS'+tag+'">@</th>',
            tbody1 = '<tbody id="'+key+'-TBODY:'+id +':"  class="'+tag+'TBODY_CS'+tag+' xui-custom {comcls}"  style="'+tag+'TBODY_CS'+tag+'" >',
            tbody2 = '</tbody>',
            tr1='<tr>',
            tr2='</tr>',
            td1='<th id="'+key+'-W:'+id+':@"  class="xui-node xui-node-th xui-uiborder-b xui-uiborder-r '+cls+'-w '+tag+'W_CC'+tag+' xui-custom {comcls}"  style="'+tag+'W_CS'+tag+'">@</th>',
            td2='<td id="'+key+'-TD:'+id+':@" class="xui-node xui-uicell  xui-node-td xui-uiborder-b xui-uiborder-r '+cls+'-td '+tag+'TD_CC'+tag+' xui-custom {comcls}"  style="'+tag+'TD_CS'+tag+'" '+xui.$IEUNSELECTABLE()+' >'+
                '</td>',
            body,i,j,k,l,a=[],b=[];
        for(i=0;i<7;i++)
            b[b.length]= th.replace(/@/g,i);

        k=l=0;
        for(i=0;i<48;i++){
            j=i%8;
            a[a.length]= (j==0?tr1:'') + (j==0?td1:td2).replace(/@/g,j==0?l:k) + (j==7?tr2:'');
            if(j!==0)k++;
            else l++;
        }

        body=colgroup+thead1+b.join('')+thead2+tbody1+a.join('')+tbody2;

        self.setTemplate({
            tagName : 'div',
            style:'{_style};height:auto;',
            //onselectstart:'return false',
            BORDER:{
                tagName : 'div',
                className: 'xui-uiborder-outset xui-uiborder-box xui-uiborder-radius-big',
                BAR:{
                    tagName:'div',
                    className:'xui-uibar-top',
                    style:'{barDisplay};',
                    BARTDL:{
                        className:'xui-uibar-tdl xui-uibar xui-uiborder-radius-big-tl',
                        BARTDLT:{
                            className:'xui-uibar-tdlt'
                        }
                    },
                    BARTDM:{
                        $order:1,
                        className:'xui-uibar-tdm xui-uibar',
                        BARTDMT:{
                            className:'xui-uibar-tdmt'
                        }
                    },
                    BARTDR:{
                        $order:2,
                        className:'xui-uibar-tdr xui-uibar xui-uiborder-radius-big-tr',
                        BARTDRT:{
                            className:'xui-uibar-tdrt'
                        }
                    },
                    BARCMDL:{
                        $order:3,
                        tagName:'div',
                        className:'xui-uibar-cmdl',
                        PRE2:{
                            $order:0,
                            className:'xuifont',
                            $fonticon:'xui-icon-doubleleft',
                            tabindex: '{tabindex}'
                        },
                        PRE:{
                            $order:1,
                            className:'xuifont',
                            $fonticon:'xui-icon-singleleft',
                            tabindex: '{tabindex}'
                        },
                        YEAR:{
                            $order:2,
                            className:'xui-ui-draggable xui-uibase xui-uiborder-flat xui-uiborder-radius'
                        },
                        YTXT:{$order:3,text:'-'},
                        MONTH:{
                            $order:4,
                            className:'xui-ui-draggable xui-uibase xui-uiborder-flat xui-uiborder-radius'
                        },
                        MTXT:{$order:5,text:'-'},
                        DAY:{
                            $order:6,
                            className:'xui-ui-draggable xui-uibase xui-uiborder-flat xui-uiborder-radius'
                        },
                        NEXT:{
                            $order:7,
                            className:'xuifont',
                            $fonticon:'xui-icon-singleright',
                            tabindex: '{tabindex}'
                        },
                        NEXT2:{
                            $order:8,
                            className:'xuifont',
                            $fonticon:'xui-icon-doubleright',
                            tabindex: '{tabindex}'
                        }
                    },
                    BARCMDR:{
                        $order:4,
                        tagName: 'div',
                        className:'xui-uibar-cmdr',
                        CLOSE:{
                            className:'xuifont',
                            $fonticon:'xui-uicmd-close',
                            style:'{closeDisplay}'
                        }
                    },
                    TBARTDB:{
                        $order:5,
                        tagName: 'div',
                        className:'xui-uibar-tdb xui-uiborder-inset xui-uiborder-radius'
                    }
                },
                MAIN:{
                    $order:2,
                    tagName:'div',
                    className:'xui-uicon-main xui-uibar',
                    MAINI:{
                        tagName:'div',
                        className:'xui-uicon-maini xui-uicon-maini xui-uibar',
                        CON:{
                            tagName:'div',
                            className:'xui-uiborder-inset',
                            BODY:{
                                tagName:'table',
                                cellpadding:"0",
                                cellspacing:"0",
                                text:body
                            }
                        }
                    }
                },
                TAIL:{
                    $order:3,
                    tagName:'div',
                    className:'xui-uicon-main xui-uibar',
                    TAILI:{
                        tagName:'div',
                        className:'xui-uicon-maini xui-uibar',
                        CAPTION:{
                            tagName:'div',
                            style:'{_nocap}',
                            text : '{caption}',
                            $order:0
                        },
                        TIME:{
                            style:"{_timectrl}",
                            tagName:'div',
                            TPRE2:{
                                $order:0,
                                className:'xuifont',
                                $fonticon:'xui-icon-doubleleft',
                                tabindex: '{tabindex}'
                            },
                            TPRE:{
                                $order:1,
                                className:'xuifont',
                                $fonticon:'xui-icon-singleleft',
                                tabindex: '{tabindex}'
                            },
                            HOUR:{
                                $order:2,
                                className:'xui-ui-draggable xui-uibase xui-uiborder-flat xui-uiborder-radius'
                            },
                            MTXT:{$order:3,text:':'},
                            MINUTE:{
                                $order:4,
                                className:'xui-ui-draggable xui-uibase xui-uiborder-flat xui-uiborder-radius'
                            },
                            TNEXT:{
                                $order:6,
                                className:'xuifont',
                                $fonticon:'xui-icon-singleright',
                                tabindex: '{tabindex}'
                            },
                            TNEXT2:{
                                $order:7,
                                className:'xuifont',
                                $fonticon:'xui-icon-doubleright',
                                tabindex: '{tabindex}'
                            }
                        },
                        TODAY:{
                             tabindex: '{tabindex}',
                             className:'xuifont',
                            $fonticon:'xui-icon-date',
                             title:"{_todaytitle}"
                        },
                        SET:{
                            tagName:"button",
                            className:'xui-ui-btn xui-uibar xui-uigradient xui-uiborder-radius',
                            tabindex: '{tabindex}',
                            text:"{_set}"
                        }
                    }
                },
                BBAR:{
                    $order:4,
                    tagName:'div',
                    className:'xui-uibar-bottom-s',
                    BBARTDL:{
                        className:'xui-uibar-tdl xui-uibar xui-uiborder-radius-big-bl'
                    },
                    BBARTDM:{
                        $order:1,
                        className:'xui-uibar-tdm xui-uibar'
                    },
                    BBARTDR:{
                        $order:2,
                        className:'xui-uibar-tdr xui-uibar xui-uiborder-radius-big-br'
                    }
                }
            }
        });
    },
    Static:{
        Appearances:{
            KEY:{
            },
            'TBART, BBART':{
                'border-spacing':0,
                'border-collapse':'separate'
            },
            BORDER:{
            },
            BODY:{
                position:'relative',
                overflow: 'visible'
            },
            BARCMDL:{
                top:'.125em'
            },
            TAILI:{
                position:'relative',
                 padding:'.5em 0 0 0'
            },
            TIME:{
                'padding':'.25em 1.5em'
            },
            SET:{
                position:'absolute',
                display:'none',
                top:'.125em',
                right:'.5em'
            },
            TODAY:{
                position:'absolute',
                top:'.25em',
                left:'.125em',
                display:xui.$inlineBlock,
                cursor:'default'
            },
            'PRE,PRE2,NEXT,NEXT2,TPRE,TPRE2,TNEXT,TNEXT2':{
                $order:0,
                display:xui.$inlineBlock,
                position:'relative',
                margin:'0 .25em',
                'vertical-align': 'middle',
                cursor:'default'
            },
            'YEAR,MONTH,DAY,HOUR,MINUTE':{
                $order:4,
                'font-weight':'bold',
                'vertical-align': 'middle',
                cursor:'e-resize',
                margin:'0 .25em',
                'padding':'0 .25em'
            },
            YEAR:{
            },
            'MONTH, DAY,HOUR, MINUTE':{
            },
            CAPTION:{
                'text-align':'center',
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                'font-size':'1em'
            },
            MAINI:{
                 'padding':'.5em .3333em .3333em 0'
            },
            TD:{
                $order:1,
                'text-align':'center'
            },
            'TD-checked':{
                $order:4,
                'font-weight':'bold'
            },
            'W,H':{
                $order:3,
                'vertical-align':'middle',
                'text-align':'center',
                'padding':'.25em'
            },
            W:{
                $order:4,
                padding:'.125em'
            },
            H:{
                $order:4,
                padding:'.25em 0.6666667em'
            }
        },
        Behaviors:{
            HoverEffected:{CLOSE:'CLOSE',TD:'TD',PRE:'PRE',PRE2:'PRE2',NEXT:'NEXT',NEXT2:'NEXT2',TPRE:'TPRE',TPRE2:'TPRE2',TNEXT:'TNEXT',TNEXT2:'TNEXT2',SET:'SET', TODAY:'TODAY'},
            ClickEffected:{CLOSE:'CLOSE',TD:'TD',PRE:'PRE',PRE2:'PRE2',NEXT:'NEXT',NEXT2:'NEXT2',TPRE:'TPRE',TPRE2:'TPRE2',TNEXT:'TNEXT',TNEXT2:'TNEXT2',SET:'SET', TODAY:'TODAY'},
            KEY:{onClick:function(){return false}},
            TD:{
                onClick:function(profile, e, src){
                    var p=profile.properties,
                        id=profile.getSubId(src),
                        map=profile.$daymap,
                        v=map[id];
                    if(p.disabled||p.readonly)return false;

                    xui.use(src).onMouseout(true,{$force:true});

                    v = xui.Date.add(profile.$tempValue, 'd', xui.Date.diff(profile.$tempValue, v, 'd', xui.getFirstDayOfWeek(p)));
                    profile.box._to(profile,v);

                    // set dir
                    if(!p.timeInput)
                        //onClick event
                        profile.boxing().setUIValue(v,null,null,'click');
                },
                onDblclick:function(profile,e,src){
                    var p=profile.properties;
                    if(p.timeInput){
                        xui.use(src).onMouseout(true,{$force:true});
                        profile.boxing().setUIValue(profile.$tempValue, true,null,'dblclick');
                    }
                }
            },
            TODAY:{
                onClick:function(profile,e,src){
                    xui.use(src).onMouseout(true,{$force:true});
                    profile.boxing().setUIValue(
                        profile.properties.timeInput ?
                        new Date :
                        xui.Date.getTimSpanStart(new Date,'d',1)
                    ,true,null,'today');
                }
            },
            SET:{
                onClick:function(profile,e,src){
                    xui.use(src).onMouseout(true,{$force:true});
                    profile.boxing().setUIValue(profile.$tempValue, true,null,'set');
                }
            },
            CLOSE:{
                onClick:function(profile, e, src){
                    var p = profile.properties,
                        instance = profile.boxing();
                    if(p.disabled||p.readonly)return;
                    if(false===instance.beforeClose(profile, src)) return;
                    instance.destroy(true);
                }
            },
            PRE:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,xui.Date.add(profile.$tempValue,'m',-1));
                }
            },
            NEXT:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,xui.Date.add(profile.$tempValue,'m',1));
                }
            },
            PRE2:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,xui.Date.add(profile.$tempValue,'y',-1));
                }
            },
            NEXT2:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,xui.Date.add(profile.$tempValue,'y',1));
                }
            },
            TPRE:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,xui.Date.add(profile.$tempValue,'n',-1));
                }
            },
            TNEXT:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,xui.Date.add(profile.$tempValue,'n',1));
                }
            },
            TPRE2:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,xui.Date.add(profile.$tempValue,'h',-1));
                }
            },
            TNEXT2:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    profile.box._to(profile,xui.Date.add(profile.$tempValue,'h',1));
                }
            },
            YEAR:{
                beforeMousedown:function(profile, e, src){
                    return profile.box._ondown(profile,e,src,10);
                },
                onDrag:function(profile, e, src){
                    var count,off = xui.DragDrop.getProfile().offset;
                    count=parseInt(profile.$year,10)+parseInt(off.x/10,10);
                    if(profile.$temp!=count){
                        profile.$temp2=parseInt(off.x/10,10);
                        profile.getSubNode('YEAR').html(count,false);
                    }
                },
                onDragstop:function(profile, e, src){
                    return profile.box._onds(profile,e,src,'y');
                }
            },
            MONTH:{
                beforeMousedown:function(profile, e, src){
                    return profile.box._ondown(profile,e,src,20);
                },
                onDrag:function(profile, e, src){
                    var count,off = xui.DragDrop.getProfile().offset;
                    count=parseInt(profile.$month,10)+(parseInt(off.x/20,10)%12);
                    count=(count%12+12)%12;
                    if(profile.$temp!=count){
                        profile.$temp=count;
                        profile.$temp2=count-profile.$month+1;
                        profile.getSubNode('MONTH').html(((count+1)<=9?"0":"")+(count+1),false);
                    }
                },
                onDragstop:function(profile, e, src){
                    return profile.box._onds(profile,e,src,'m');
                }
            },
            DAY:{
                beforeMousedown:function(profile, e, src){
                    return profile.box._ondown(profile,e,src,10);
                },
                onDrag:function(profile, e, src){
                    var date=new Date(profile.$year,profile.$month,0),
                        days=date.getDate();

                    var p=profile.properties,
                        count,
                        off = xui.DragDrop.getProfile().offset;
                    count=parseInt(profile.$day,10)+(parseInt(off.x/10,10)%days);
                    count=(count%days+days)%days + 1;
                    if(profile.$temp!=count){
                        profile.$temp=count;
                        profile.$temp2=count-profile.$day;
                        profile.getSubNode('DAY').html((count<=9?"0":"")+count,false);
                    }
                },
                onDragstop:function(profile, e, src){
                    return profile.box._onds(profile,e,src,'d');
                }
            },
            HOUR:{
                beforeMousedown:function(profile, e, src){
                    return profile.box._ondown(profile,e,src,20);
                },
                onDrag:function(profile, e, src){
                    return profile.box._ondrag(profile,20,24,'HOUR',profile.$hour);
                },
                onDragstop:function(profile, e, src){
                    return profile.box._onds(profile,e,src,'h');
                }
            },
            MINUTE:{
                beforeMousedown:function(profile, e, src){
                    return profile.box._ondown(profile,e,src,10);
                },
                onDrag:function(profile, e, src){
                    return profile.box._ondrag(profile,10,60,'MINUTE',profile.$minute);
                },
                onDragstop:function(profile, e, src){
                    return profile.box._onds(profile,e,src,'n');
                }
            }
        },
        DataModel:{
            timeInput:{
                ini:false,
                action:function(v){
                    this.getSubNode('CAPTION').css('display',v?'none':'block');
                    this.getSubNode('SET').css('display',v?'block':'none');
                    this.getSubNode('TIME').css('display',v?'block':'none');
                    this.getSubNode('TODAY').attr("title",xui.getRes(v?"inline.now":"inline.today"));
                }
            },
            height:{
                $spaceunit:1,
                ini:'auto',
                readonly:true
            },
            width:{
                $spaceunit:1,
                ini:'auto',
                readonly:true
            },
            value:{
                ini:new Date,
                format:'date'
            },
            isFormField:{
                ini:false
            },
            closeBtn:{
                ini:true,
                action:function(v){
                    this.getSubNode('CLOSE').css('display',v?'':'none');
                }
            },
            firstDayOfWeek:{
                ini:0,
                action:function(){
                    this.boxing().refresh();
                }
            },
            offDays:{
                ini:'60',
                action:function(){
                    this.boxing().refresh();
                }
            },
            hideWeekLabels:{
                ini:false,
                action:function(){
                    this.boxing().refresh();
                }
            },
            dateInputFormat:{
                ini:"yyyy-mm-dd",
                listbox:["yyyy-mm-dd","mm-dd-yyyy","dd-mm-yyyy"],
                action:function(){
                    this.boxing().refresh();
                }
            }
        },
        EventHandlers:{
            beforeClose:function(profile, src){}
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            var nodisplay='display:none';
            data.closeDisplay = data.closeBtn?'':nodisplay;

            var none="display:none;";
            if(profile.properties.timeInput){
                data._todaytitle=xui.getRes("inline.now");
                data._nocap=none;
            }else{
                data._todaytitle=xui.getRes("inline.today");
                data._timectrl=none;
            }
            data._set = xui.wrapRes('inline.set');

            return data;
        },
        _ensureValue:function(profile, value){
            var d;
            if(value){
                if(xui.isDate(value))
                    d=value;
                else if(xui.isFinite(value))
                    d=new Date(parseInt(value,10));
                else
                    d=xui.Date.parse(value+"");
            }
            d = d||new Date;
            if(!profile.properties.timeInput)
                d=xui.Date.getTimSpanStart(d,'d');
            return d;
        },
        RenderTrigger:function(){
            var self=this, p=self.properties, o=self.boxing(), b=self.box;
            b._setWeekLabel(self);

            var hash={yyyy:'YEAR',mm:'MONTH',dd:'DAY'},arr=p.dateInputFormat.split('-');
            if(hash[arr[0]] && hash[arr[1]] && hash[arr[2]]){
                self.getSubNode('YTXT').addPrev(self.getSubNode(hash[arr[0]]));
                self.getSubNode('MTXT').addPrev(self.getSubNode(hash[arr[1]]));
                self.getSubNode('MTXT').addNext(self.getSubNode(hash[arr[2]]));
            }

//            self.getSubNode('YTXT').html(xui.wrapRes('date.Y'),false);
//            self.getSubNode('MTXT').html(xui.wrapRes('date.M'),false);
        },
        _getWeekNodes:function(profile){
            return profile.$weeks || (profile.$weeks=profile.getSubNode('W',true));
        },
        _getTDNodes:function(profile){
            return profile.$tds || (profile.$tds=profile.getSubNode('TD',true));
        },
        _getLabelNodes:function(profile){
            return profile.$days || (profile.$days=profile.getSubNode('TD',true));
        },
        _getHeaderNodes:function(profile){
            return profile.$header || (profile.$header=profile.getSubNode('H',true));
        },
        _setWeekLabel:function(profile){
            var p=profile.properties;

            // for week
            var fw=xui.getFirstDayOfWeek(p),
                f=function(id){
                id=profile.getSubId(id);

                // The special one
                if(id=='7')return id;

                id=(parseInt(id,10)+fw);
                return id<7?id:(id-7);
            };

            profile.box._getHeaderNodes(profile).each(function(node,i){
                node.innerHTML=xui.wrapRes('date.WEEKS.'+f(node.id))
            });

            // for weeklable
            if(p.hideWeekLabels){
                profile.getSubNode('BODY').query('TR').first().remove();
                profile.getSubNode('COL').first().remove();
            }

            // for free days
            var cls2="xui-uicell-alt",
                fdmap={};
            if(p.offDays){
                xui.arr.each(p.offDays.split(""),function(i){
                    i=parseInt(i,10);
                    if(i>=0 && i<=6)
                        fdmap[i]=1;
                });
                profile.box._getTDNodes(profile).each(function(node,i){
                    i = ((i+fw) - 7*parseInt((i+fw)/7,10)) ;
                    if(fdmap[i])node.className=node.className + " " +cls2;
                    else node.className=node.className.replace(cls2,"");
                });
            }

        },
        _setBGV:function(profile, v, m){
            var date=xui.Date,
                p=profile.properties,
                daymap=profile.$daymap||(profile.$daymap=[]),
                t,n;
            profile.box._getLabelNodes(profile).each(function(node,i){
                n=date.add(v,'d',i);
                daymap[i]=n;
                t=date.get(n,'m')==m?'#':'<p class="xui-node xui-node-p xui-ui-readonly xui-custom {comcls}">#</p>';
                n=date.get(n,'d');
                node.innerHTML = t.replace('#',n);
            });

            if(!p.hideWeekLabels)
                profile.box._getWeekNodes(profile).each(function(node,i){
                    node.innerHTML=date.get(date.add(v,'ww',i),'ww',xui.getFirstDayOfWeek(p));
                });
        },
        _to:function(profile, time, force){
            var p = profile.properties,
                fw = xui.getFirstDayOfWeek(p),
                date=xui.Date,
                keys=profile.keys,
                uiv=p.$UIvalue,
                index=-1,
                node,
                temp,
                _realstart = date.getTimSpanStart(date.getTimSpanStart(time,'m'),'ww',1,fw),
                m=date.get(time,'m',fw);

            profile.$tempValue=time;
            this._setBGV(profile, profile._realstart=_realstart, m);

            //remove checked css class
            if(profile.$selnode)
                profile.$selnode.tagClass('-checked',false);
            //[[add cecked css class
            xui.arr.each(profile.$daymap,function(o,i){
                if(date.get(o,'m',fw)+'-'+date.get(o,'d',fw)==date.get(time,'m',fw)+'-'+date.get(time,'d',fw)){
                    index=i;
                    return false;
                }
            });
            node=this._getTDNodes(profile).get()[index];
            (profile.$selnode=xui([node]).tagClass('-checked'));
            //]]

            //[[ show dirty
            profile.getSubNode('SET').css('display',(force||uiv.getTime()==time.getTime())?'none':'block');
            profile.getSubNode('CAPTION').css('color',(force||uiv.getTime()==time.getTime())?'':'#ff0000');
            //]]

            temp=date.get(time,'y',fw);
            if(profile.$year!=temp){
                profile.$year=temp;
                profile.getSubNode('YEAR').html(temp,false);
            }
            temp=date.get(time,'m',fw)+1;
            if(profile.$month!=temp){
                profile.$month=temp;
                profile.getSubNode('MONTH').html((temp<=9?"0":"")+temp,false);
            }
            temp=date.get(time||time,'d',fw);
            if(profile.$day!=temp){
                profile.$day=temp;
                profile.getSubNode('DAY').html((temp<=9?"0":"")+temp,false);
            }
            temp=date.get(time,'h',fw);
            if(profile.$hour!=temp){
                profile.$hour=temp;
                profile.getSubNode('HOUR').html((temp<=9?"0":"")+temp,false);
            }
            temp=date.get(time,'n',fw);
            if(profile.$minute!=temp){
                profile.$minute=temp;
                profile.getSubNode('MINUTE').html((temp<=9?"0":"")+temp,false);
            }
        },
        _ondown:function(profile, e, src,increment){
            if(xui.Event.getBtn(e)!="left")return;
            xui.use(src).startDrag(e, {
                dragType:'blank',
                targetReposition:false,
                widthIncrement:increment,
                dragCursor:true
            });
            profile.$temp=profile.$temp2=0;
        },
        _ondrag:function(profile,increment,max,key,data){
            var p=profile.properties,
                count,
                off = xui.DragDrop.getProfile().offset;
            count=parseInt(data,10)+(parseInt(off.x/increment,10)%max);
            count=(count%max+max)%max;
            if(profile.$temp!=count){
                profile.$temp=count;
                profile.$temp2=count-data;
                profile.getSubNode(key).html((count<=9?"0":"")+count,false);
            }
        },
        _onds:function(profile, e, src, type){
            if(profile.$temp2){
                var p=profile.properties,
                    v = xui.Date.add(profile.$tempValue,type,profile.$temp2);
                profile.box._to(profile,v);
            }
            profile.$temp=profile.$temp2=0;
        },
        _onresize:function(){}
    }
});