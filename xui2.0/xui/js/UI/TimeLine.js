Class('xui.UI.TimeLine', ['xui.UI','xui.absList',"xui.absValue"], {
    Dependencies:['xui.Date'],
    Instance:{
        _setCtrlValue:function(value){
            if(!value)return;
            if(value.indexOf(':')==-1)return;
            var profile=this.get(0),
                p=profile.properties,
                box=this.constructor,
                a=value.split(':'),
                from=new Date(parseInt(a[0],10)),
                to=new Date(parseInt(a[1],10)),
                pxStart=box._getX(profile,from),
                pxEnd=box._getX(profile,to),
                task;

            if(p.items.length===0)
                this.insertItems([{id:'$', caption:p.dftTaskName, from:parseInt(a[0],10), to:parseInt(a[1],10)}],null,true);
            else
                box._resetItem(profile,{left:pxStart,width:pxEnd-pxStart},profile.getSubNodeByItemId('ITEM',p.items[0].id)._get(0));
        },
        visibleTask:function(){
            var profile=this.get(0),
                p=profile.properties,
                date=xui.Date,
                items=p.items,sv,target;

            if(!p.multiTasks){
                sv=items.length?items[0].from:p.$UIvalue?p.$UIvalue.split(':')[0]:0;
                if(sv){
                    target=new Date(+sv);
                    if(profile.renderId){
                        if(target<p.dateStart || target>date.add(p.dateStart,'ms',p.width*p._rate)){
                            p.dateStart=target;
                            var k=p.$UIvalue;
                            this.refresh().setUIValue(k,true,null,'task');
                        }
                    }else{
                        p.dateStart=target;
                    }
                }
            }
            return this;
        },
        _afterInsertItems:function(profile){
            if(!profile.renderId)return;
           profile.box._reArrage(profile);
        },
        _afterRemoveItems:function(profile){
            profile.box._reArrage(profile);
        },
        _cache:function(){
            var profile=this.get(0),
                cls=this.constructor,
                picker=cls._picker;
            if(picker && picker.renderId)
                profile.getSubNode('POOL').append(picker.getRoot().css('display','none'));
        },
        getTimeRange:function(){
            var profile=this.get(0), p=profile.properties;
            return [p._smallLabelStart, p._smallLabelEnd];
        },
        iniContent:function(){
            return this.each(function(profile){
                var p=profile.properties;
                profile.boxing()._getContent(p._smallLabelStart,p._smallLabelEnd,p._rate,'ini');
                profile._iniOK=true
            });
        },

        addTasks:function(arr){
            return this.insertItems(arr,null,true);
        },
        removeTasks:function(ids){
            this.removeItems(ids);
            return this;
        },
        _getContent:function(from,to,rate,type){
//console.log('getContent',from,to,rate,type);
            return this.each(function(profile){
                if(profile.onGetContent){
                    var ins=profile.boxing(),
                        callback=function(arr){
                            if(type=='ini')
                                ins.clearItems();
                            ins.addTasks(arr);
                        };
                    if(profile.onGetContent){
                        var r = ins.onGetContent(profile, from, to, rate, type, callback);
                        if(r)callback(r);
                    }
                }
            });
        },
        scrollToLeft:function(callback){
            var profile=this.get(0);
            if(profile.pauseA||profile.pause)return;

            var t=profile.properties,
                date=xui.Date,
                rate=t._rate,
                o=profile.box._getMoveNodes(profile),
                x1=t._band_left,
                x2=0;
            ;
            if(t.minDate && t._smallLabelStart<t.minDate)
                x2-=date.diff(t._smallLabelStart,t.minDate,'ms')/rate;

            profile.pause=true;
            o.animate({left:[x1,x2]}, null, function(){
                if(typeof callback=='function')
                    callback();
                profile.pause=false;
            },Math.max(300,(x2-x1)/10),0,'sineInOut').start();
        },
        scrollToRight:function(callback){
            var profile=this.get(0);                    
            if(profile.pauseA||profile.pause)return;
            var t=profile.properties,
                date=xui.Date,
                rate=t._rate,
                o=profile.box._getMoveNodes(profile),
                x1=t._band_left,
                x2=t.width-t._band_width;
            ;
            if(t.maxDate && t._smallLabelEnd>t.maxDate)
               x2+=date.diff(t.maxDate,t._smallLabelEnd,'ms')/rate;

            if(x1>x2){
                profile.pause=true;
                o.animate({left:[x1,x2]}, null, function(){
                    if(typeof callback=='function')
                        callback();
                    profile.pause=false;
                },Math.max(300,(x2-x1)/10),0,'sineInOut').start();
            }
        }
    },
    Static:{
        Templates:{
            tagName:'div',
            style:'{_style}',
            className:'{_className}',
            BORDER:{
                tagName:'div',
                className: 'xui-uiborder-radius',
                style:'height:{_bHeight}px;width:{_bWidth}px;',
                POOL:{
                    tagName:'div',
                    style:'position:absolute;left:0;top:0;width:0;height:0;display:none;'
                },
                TBAR:{
                    tagName:'div',
                    className:'xui-uibar-top',
                    style:'{_bardisplay};',
                    TBARTDL:{
                        className:'xui-uibar-tdl xui-uibg-bar xui-uiborder-lt'
                    },
                    TBARTDM:{
                        $order:1,
                        className:'xui-uibar-tdm xui-uibg-bar xui-uiborder-t'
                    },
                    TBARTDR:{
                        $order:2,
                        className:'xui-uibar-tdr xui-uibg-bar xui-uiborder-rt'
                    },
                    BARCMDL:{
                        $order:3,
                        tagName:'div',
                        className:'xui-uibar-cmdl',
                        DATE:{$order:0,style:'{dateDisplay}',className:'xuifont xui-icon-date'},
                        PRE:{$order:2,className:'xuifont xui-icon-singleleft'},
                        'ZOOMIN':{$order:3,style:'{zoomDisplay}',className:'xuifont xui-icon-zoomin'},
                        'ZOOMOUT':{$order:4,style:'{zoomDisplay}',className:'xuifont xui-icon-zoomout'},
                        NEXT:{$order:5,className:'xuifont xui-icon-singleright'}
                    },
                    BARCMDR:{
                        $order:4,
                        tagName: 'div',
                        className:'xui-uibar-cmdr',
                        OPT:{
                            className:'xuifont xui-uicmd-opt',
                            style:'{optDisplay}',
                            $order:0
                        },
                        CLOSE:{
                            $order:4,
                            className:'xuifont xui-uicmd-close ',
                            style:'{closeDisplay}'
                        }
                    }
                },
                MAIN:{
                    $order:2,
                    tagName:'div',
                    className:'xui-uicon-main xui-uibg-bar xui-uiborder-l',
                    MAINI:{
                        tagName:'div',
                        className:'xui-uibg-bar xui-uicon-maini xui-uibg-bar xui-uiborder-r',
                        MAINC:{
                            className:'xui-uiborder-flat xui-uibg-base',
                            tagName:'div',
                            MAINP:{
                                tagName:'div',
                                VIEW:{
                                    tagName:'div',
                                    style:'left:{_band_left}px;width:{_band_width}px;',
                                    BAND:{
                                        $order:2,
                                        tagName:'div',
                                        tabindex: '{tabindex}',
                                        BIGLABEL:{
                                            tagName:'div',
                                            className:"xui-uitd xui-uiborder-b",
                                            style:'{_showBigLabel}',
                                            text:"{_bigMarks}"
                                        },
                                        SMALLLABEL:{
                                            $order:1,
                                            tagName:'div',
                                            className:"xui-uitd xui-uiborder-b",
                                            text:"{_smallMarks}"
                                        }
                                    },
                                    CON:{
                                        $order:3,
                                        tagName:'div',
                                        style:'height:{_viewHeight}px;',
                                        BG:{
                                            tagName:'div',
                                            style:'height:{_viewHeight}px;'
                                        },
                                        LINES:{
                                            $order:1,
                                            tagName:'div'
                                        },
                                        ITEMS:{
                                            $order:2,
                                            tagName:'div',
                                            style:'height:{_viewHeight}px;',
                                            text:'{items}'
                                        }
                                    },
                                    ACTIVE:{
                                        $order:4,
                                        tagName:'div'
                                    }
                                },
                                SCROLL:{
                                    $order:2,
                                    tagName:'div',
                                    SCROLLI:{
                                        tagName:'div'
                                    }
                                }
                            }
                        }
                    }
                },
                TAIL:{
                    $order:4,
                    tagName:'div',
                    className:'xui-uicon-main xui-uibg-bar xui-uiborder-l',
                    TIPS:{
                        className:'xui-uibg-bar xui-uicon-maini xui-uibg-bar xui-uiborder-r',
                        style:'z-index:2;{_tipsdisplay};',
                        tagName:'div'
                    }
                },
                BBAR:{
                    $order:5,
                    tagName:'div',
                    style:'{_bardisplay};',
                    className:'xui-uibar-bottom-s',
                    BBARTDL:{
                        className:'xui-uibar-tdl xui-uibg-bar xui-uiborder-lb'
                    },
                    BBARTDM:{
                        $order:1,
                        className:'xui-uibar-tdm xui-uibg-bar xui-uiborder-b'
                    },
                    BBARTDR:{
                        $order:2,
                        className:'xui-uibar-tdr xui-uibg-bar xui-uiborder-rb'
                    }
                }
            },
            $submap : {
                _bigMarks:{
                    LABELT:{
                        id:null,
                        className:"xui-uiborder-r",
                        tagName:'div',
                        style:'width:{width}px;left:{left}px;',
                        text:'&nbsp;&nbsp;{text}'
                    }
                },
                _smallMarks:{
                    LABELB:{
                        id:null,
                        className:"xui-uiborder-r",
                        tagName:'div',
                        style:'width:{width}px;left:{left}px;',
                        text:'{text}'
                    }
                },
                bgitems:{
                    BGITEM:{
                        tagName:'div',
                        style:'left:{_left}px;width:{_width}px;'
                    }
                },
                items:{
                    ITEM:{
                        tagName:'div',
                        className:'xui-uiborder-flat {itemClass} {disabled} {readonly} {_excls}',
                        style:'left:{_left}px;width:{_width}px;{_top};{_zindex}{itemStyle}',
                        HEAD:{
                            tagName:'div',
                            className:"xui-uiborder-b",
                            TSKBAR:{
                                tagName:'div',
                                className:"xui-uibg-bar",
                                style:'width:{_perw}%;'
                            },
                            HANDLER:{
                                $order:2,
                                tagName:'div',
                                LEFT:{
                                    tagName:'div'
                                },
                                RIGHT:{
                                    tagName:'div'
                                }
                            }
                        },
                        BODY:{
                            $order:1,
                            tagName:'div',
                            style:'{_background}',
                            CON:{
                                $order:3,
                                tagName:'div',
                                text:'{caption}'
                            }
                        }
                    }
                }
            }
        },
        Behaviors:{
            DroppableKeys:['VIEW'],
            HoverEffected:{PRE:'PRE',NEXT:'NEXT',ZOOMIN:'ZOOMIN',ZOOMOUT:'ZOOMOUT',DATE:'DATE',OPT:'OPT',CLOSE:'CLOSE'},
            ClickEffected:{PRE:'PRE',NEXT:'NEXT',ZOOMIN:'ZOOMIN',ZOOMOUT:'ZOOMOUT',DATE:'DATE',OPT:'OPT',CLOSE:'CLOSE'},
            onSize:xui.UI.$onSize,
            CLOSE:{
                onClick:function(profile, e, src){
                    if(profile.properties.disabled||profile.properties.readonly)return;
                    var instance = profile.boxing();

                    if(false===instance.beforeClose(profile, src)) return false;

                    instance.destroy(true);
                }
            },
            OPT:{
                onClick:function(profile, e, src){
                    if(profile.properties.disabled||profile.properties.readonly)return false;
                    profile.boxing().onShowOptions(profile, e, src);
                }
            },
            BAND:{
                onKeydown:function(profile, e, src){
                    if(profile.pauseA||profile.pause)return;
                    profile.pause=true;

                    // speed
                    var t=profile.properties,
                        date=xui.Date,
                        rate=t._rate,
                        maxOffset = 30,
                        o=profile.box._getMoveNodes(profile),
                        x=o.left(),
                        xx=t._band_left,
                        off=t._scroll_offset
                        ;

                    off = t._scroll_offset = off>maxOffset ? off :off*1.05;

                    switch(xui.Event.getKey(e).key){
                        case 'left':
                        case 'up':
                            if(t.minDate && date.add(t.dateStart,'ms',(xx-x-off)*rate)<t.minDate)
                                off=date.diff(t.minDate, t.dateStart,'ms')/rate + (xx-x);
                            if(off<0)off=0;
                            o.left(x + off);
                            break;
                        case 'right':
                        case 'down':
                            if(t.maxDate && date.add(t.dateStart,'ms',(xx-x+off+t.width)*rate)>t.maxDate)
                                off=date.diff(t.dateStart,t.maxDate,'ms')/rate - (xx-x+t.width);
                            if(off<0)off=0;
                            o.left(x - off);
                            break;
                    }

                    if((x + maxOffset > 0) || (x + o.width() - t.width - maxOffset < 0))
                        profile.box._rePosition(profile);
                    profile.pause=false;
                    return false;
                },
                onKeyup:function(profile, e){
                    var p=profile.properties;
                    p._scroll_offset = p._scrollRate;
                    profile.box._rePosition(profile);
                },
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    if(profile.pauseA||profile.pause)return;
                    var t=profile.properties,
                        r=-t._band_left,
                        date=xui.Date,
                        rate=t._rate,
                        ep=xui.Event.getPos(e),
                        l=t._band_width-r-t.width;
                    ;
                    if(t.minDate && t._smallLabelStart<t.minDate)
                        r-=date.diff(t._smallLabelStart,t.minDate,'ms')/rate;
                    if(t.maxDate && t._smallLabelEnd>t.maxDate)
                        l-=date.diff(t.maxDate,t._smallLabelEnd,'ms')/rate;
                    if(r<0)r=0;
                    if(l<0)l=0;

                    xui.use(src).startDrag(e, {
                        targetReposition:false,
                        dragType:'blank',
                        dragDefer:2,
                        horizontalOnly:true,
                        targetLeft:ep.left,
                        targetTop:ep.top,
                        maxLeftOffset:l,
                        maxRightOffset:r
                     });
                     xui.use(src).focus();
                },
                onDragstop:function(profile, e, src){
                    profile.box._rePosition(profile);
                },
                onDrag:function(profile, e, src){
                    var ns=profile.box._getMoveNodes(profile),
                        dd=xui.DragDrop.getProfile();
                    ns.left(profile.properties._band_left +  dd.offset.x);
                },
                onContextmenu:function(profile, e, src){
                    return profile.boxing().onContextmenu(profile, e, src)!==false;
                }
            },
            SCROLL:{
                onScroll:function(profile, e, src){
                    profile.getSubNodes(['ITEMS','LINES']).top(-xui.use(src).scrollTop() );
                }
            },
            VIEW:{
                onMouseover:function(profile,e,src){
                    if(xui.DragDrop.getProfile().isWorking)return;
                    profile.$itemspos = xui.use(src).offset();
                },
                onMousemove:function(profile,e){
                    var ddd=xui.DragDrop.getProfile();
                    if(ddd.isWorking){
                        //ondrag add here, for performance of 'dont-use-droppable situation'.
                        if(profile.$$ondrag)
                            profile.box._moveActive(profile, profile.$active, ddd.x-profile.$dd_ox, profile.properties._unitPixs, 'move');
                    }else{
                        var t=profile.properties,
                            date=xui.Date,
                            s=t._smallLabelStart,
                            r=t._rate,
                            u=t._timeFormat,
                            p2=profile.$itemspos;
                        if(p2 && t.showTips){
                            var p1=xui.Event.getPos(e);
                            profile.box._setTips(profile, date.getText(date.add(s, 'ms', (p1.left-p2.left)*r),u));
                        }
                    }
                },
                onMouseout:function(profile,e,src){
                    if(xui.DragDrop.getProfile().isWorking)return;
                    if(profile.properties.showTips)
                        profile.box._setTips(profile, '');
                }
            },
            ITEMS:{
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    var pro=profile.properties;
                    if(pro.disabled || pro.readonly)return;
                    if(profile.pauseA||profile.pause)return;
                    if(xui.Event.getSrc(e)!=xui.use(src).get(0))return;

                    var o = profile.getSubNode('ACTIVE');
                    o.css({width:0,visibility:'hidden'}).offset({left :xui.Event.getPos(e).left,  top :null});

                    profile.__actives=1;
                    o.startDrag(e, {
                        dragDefer:2,
                        dragType:'none'
                     });
                },
                onMouseup:function(profile){
                    if(profile.__actives)
                        delete profile.__actives;
                }
            },
            ACTIVE:{
                onDragbegin:function(profile, e, src){
                    profile.$dd_ox = xui.DragDrop.getProfile().x;
                    profile.$dd_oleft = parseInt(xui.use(src).get(0).style.left,10)||0;
                    xui.use(src).css('cursor','e-resize')
                    .parent().css('cursor','e-resize');
                },
                onDrag:function(profile, e, src){
                    var x=profile.$dd_oleft,
                        ddx=xui.DragDrop.getProfile().x,
                        w,offset;
                    if((offset =ddx-profile.$dd_ox)>=0){
                        w = offset;
                    }else{
                        x = x+offset; w = -offset;
                    }
                    profile.box._moveActive(profile, xui.use(src).get(0), x, w, 'all');
                },
                onDragstop:function(profile, e, src){
                    var r = profile.box._deActive(profile);
                    xui.use(src).css('cursor','').parent().css('cursor','');

                    var box=profile.box,
                        from=box._getTime(profile, r.left),
                        to=box._getTime(profile, r.left+r.width),
                        p=profile.properties,
                        task,t,
                        b=profile.boxing();

                    if(profile.properties.multiTasks){
                        task={id:_.id(),caption:p.dftTaskName,from:from,to:to};
                        if(profile.beforeNewTask && false===b.beforeNewTask(profile, task)){}else
                            b.addTasks([task]);
                    }else
                        b.setUIValue(from+":"+to,null,null,'drag');

                    profile.$dd_ox =profile.$dd_oleft=null;
                }
            },
            PRE:{
                onClick:function(profile, e){
                    profile.boxing().scrollToLeft(function(){
                        profile.box._rePosition(profile);
                    });
                 }
            },
            NEXT:{
                onClick:function(profile, e){
                    profile.boxing().scrollToRight(function(){
                        profile.box._rePosition(profile);
                    });
                }
            },
            ZOOMIN:{
                onClick:function(profile, e){
                    if(profile.pauseA||profile.pause)return;
                    var p=profile.properties,
                        box=profile.box,
                        z=box.$zoom,
                        index = _.arr.indexOf(z,p._unitParas),
                        o;
                    if(index > 0){
                        //profile.pause=true;
                        p.timeSpanKey =  z[index- 1][0];
                        box._refresh(profile,true);
                    }
                }
            },
            ZOOMOUT:{
                onClick:function(profile, e){
                    if(profile.pauseA||profile.pause)return;
                    var p=profile.properties,
                        box=profile.box,
                        z=box.$zoom,
                        index = _.arr.indexOf(z,p._unitParas),
                        o;
                    if(index < z.length -1){
                        //profile.pause=true;
                        p.timeSpanKey = z[index + 1][0];
                        box._refresh(profile,true);
                    }
                }
            },
            DATE:{
                onClick:function(profile, e, src){
                    if(profile.pauseA||profile.pause)return;
                    var cls=profile.box,
                        box=profile.boxing(),
                        from=profile.properties.dateStart,
                        o,node;

                    if(cls._picker && cls._picker.renderId){
                       o=cls._picker.boxing();
                    }else{
                        o=xui.create('DatePicker');
                        cls._picker=o.get(0);
                        o.beforeClose(function(){
                            this.boxing()._cache();
                            return false;
                        })
                        .beforeUIValueSet(function(p, ov, v){
                            var profile=this,
                                box=profile.boxing(),
                                p=profile.properties;
                            p.dateStart=v;
                            box._cache();
                        });
                    }
                    o.setValue(from,true,'click').setHost(profile);
                    node=o.reBoxing();
                    node.popToTop(src);

                    //for on blur disappear
                    node.setBlurTrigger(profile.key+" - "+profile.$xid, function(){
                        box._cache();
                    });

                    //for esc
                    xui.Event.keyboardHook('esc',0,0,0,function(){
                        box._cache();
                        //unhook
                        xui.Event.keyboardHook('esc');
                    });
                }
            },
            ITEM:{
                onClick:function(profile, e, src){
                    if(profile.onClickTask)
                        profile.boxing().onClickTask(profile, profile.getItemByDom(src), e, src);
                },
                onDblclick:function(profile, e, src){
                    if(profile.onDblclickTask)
                        profile.boxing().onDblclickTask(profile, profile.getItemByDom(src), e, src);
                },
                onDragbegin:function(profile, e, src){
                    var t=profile.getItemByDom(src),
                        type=profile.$dd_type,
                        cursor=type?'e-resize':'move',
                        ac=profile.$active;
                    profile.$dd_ox = xui.DragDrop.getProfile().x;
                    profile.$dd_oleft = parseInt(xui.use(src).get(0).style.left,10);
                    profile.$dd_owidth = Math.min(t._realwidth, parseInt(xui.use(src).get(0).style.width,10));
                    xui([ac]).css('display','block').cssPos({left :profile.$dd_oleft,  top :null}).width(profile.$dd_owidth-2);
                    xui([ac,ac.parentNode]).css('cursor',cursor);
                },
                onDrag:function(profile, e, src){
                    var x,w,
                        offset =xui.DragDrop.getProfile().x-profile.$dd_ox,
                        ddl=profile.$dd_oleft,
                        ddw=profile.$dd_owidth,
                        type=profile.$dd_type,
                        mtype=type;
                    if(type=="left"){
                        if(offset < ddw){
                            x = ddl + offset;
                            w = ddl + ddw - x;
                        }else{
                            mtype='right';
                            x = ddl + ddw;
                            w = offset - ddw;
                        }
                    }else if(type == "right"){
                        if(-offset < ddw){
                            x = ddl;
                            w = ddw + offset;
                        }else{
                            mtype='left';
                            x = ddl + offset + ddw;
                            w = -offset - ddw;
                        }
                    }else{
                        mtype='move';
                        x = ddl + offset;
                        w = ddw;
                    }
                    profile.box._moveActive(profile, profile.$active, x, w, mtype);
                },
                onDragstop:function(profile, e, src){
                    var box=profile.box,
                        r = profile.box._deActive(profile),
                        ac=profile.$active;

                        var from=box._getTime(profile, r.left),
                            to=box._getTime(profile,r.left+r.width);
                    if(profile.properties.multiTasks){
                        if(profile.beforeTaskUpdated && false===profile.boxing().beforeTaskUpdated(profile, profile.getItemByDom(src), from, to)){}else
                            box._resetItem(profile,r,src);
                    }else
                        profile.boxing().setUIValue(from+":"+to,null,null,'drag2');

                    profile.$dd_type = null;

                    xui([ac,ac.parentNode]).css('cursor','');
                },
                onContextmenu:function(profile, e, src){
                    return profile.boxing().onContextmenu(profile, e, src)!==false;
                }
            },
            HEAD:{
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    var ps=profile.properties, item=profile.getItemByDom(src);
                    if(ps.disabled  || item.disabled)return;
                    if(ps.readonly  || item.readonly)return;
                    if(profile.beforeDragTask && false===profile.boxing().beforeDragTask(profile, item, e, src))
                        return;
                    if(ps.readonly||item.readonly)return;
                    xui.use(src).parent().startDrag(e, {
                        dragDefer:2,
                        dragType:'none'
                    });
                },
                onClick:function(){
                    return false;
                }
            },
            LEFT:{
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    var ps=profile.properties, item=profile.getItemByDom(src);
                    if(ps.disabled || ps.readonly || item.readonly || item.disabled)return;
                    profile.$dd_type='left';
                    xui.use(src).parent(3).startDrag(e, {
                        dragDefer:2,
                        dragType:'none'
                    });
                }
            },
            RIGHT:{
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    var ps=profile.properties, item=profile.getItemByDom(src);
                    if(ps.disabled || ps.readonly || item.readonly || item.disabled)return;
                    profile.$dd_type='right';
                    xui.use(src).parent(3).startDrag(e, {
                        dragDefer:2,
                        dragType:'none'
                    });
                }
            }
        },
        DataModel:{
            readonly:false,
            // control width and height
            width : 400,
            height : 200,
            //invisible band count (left,right)
            //if it's zero, leftSpanCount will be equal to the visible span count(based on widget width)
            leftSpanCount:{
                ini:0,
                inner:1
            },
            rightSpanCount:{
                ini:0,
                inner:1
            },
            increment:0,
            zoomable:{
                ini:true,
                action:function(v){
                    if(this.properties.timeSpanKey)
                        this.getSubNodes(['ZOOMIN','ZOOMOUT']).css('display',v?'':'none');
                }
            },
            dftTaskName:'task',
            taskHeight:{
                ini:25,
                action:function(v){
                    this.getSubNode('ITEM',true).height(v);
                }
            },

            //time span key
            timeSpanKey : {
                ini:'1 d',
                combobox:['10 ms', '100 ms','1 s','10 s', '1 n','5 n', '10 n', '30 n', '1 h', '2 h', '6 h', '1 d', '1 w', '15 d', '1 m',  '1 q',  '1 y',  '1 de',  '1 c'],
                action:function(){
                    this.box._refresh(this,true);
                }
            },
            // how much px to represent a unit
            // defalut value is from timeSpanKey
            unitPixs : 0,

/*
*inner properties
*defalut value is from timeSpanKey
*/
            //time span count
            smallLabelCount:{
                inner:1
            },
            //time span unit
            smallLabelUnit:{
                inner:1,
                listbox:_.toArr(xui.Date.$TIMEUNIT,true)
            },
            //small label format
            smallLabelFormat:{
                inner:1,
                listbox:_.toArr(xui.Date.$TEXTFORMAT,true)
            },
            bigLabelCount:{
                inner:1
            },
            //time span unit
            bigLabelUnit:{
                inner:1,
                listbox:_.toArr(xui.Date.$TIMEUNIT,true)
            },

            //big label format
            bigLabelFormat:{
                inner:1,
                listbox:_.toArr(xui.Date.$TEXTFORMAT,true)
            },
            //time format
            timeFormat:{
                inner:1,
                listbox:_.toArr(xui.Date.$TEXTFORMAT,true)
            },
/*inner properties*/
            //bar
            showBar:{
                ini:true,
                action:function(v){
                    this.getSubNode('TBAR').css('display',v?'':'none');
                    var p=this.properties,w=p.width,h=p.height;
                    p.width=p.height=0;
                    xui.UI.$tryResize(this,w,h,true);
                    p.width=w,p.height=h;
                }
            },
            //tips
            showTips:{
                ini:true,
                action:function(v){
                    this.getSubNode('TIPS').css('display',v?'':'none');
                    var p=this.properties,w=p.width,h=p.height;
                    p.width=p.height=0;
                    xui.UI.$tryResize(this,w,h,true);
                    p.width=w,p.height=h;
                }
            },
            //big label
            showBigLabel: {
                ini:true,
                action:function(v){
                    this.getSubNode('BIGLABEL').css('display',v?'':'none');
                    var p=this.properties,w=p.width,h=p.height;
                    p.width=p.height=0;
                    xui.UI.$tryResize(this,w,h,true);
                    p.width=w,p.height=h;
                }
            },

            _scrollRate:5,

            multiTasks: {
                ini:false,
                action:function(){
                    this.box._refresh(this,true);
                }
            },
            taskMinSize:60,
            minDate:{
                ini:null,
                type:'date'
            },
            maxDate:{
                ini:null,
                type:'date'
            },
            dateBtn:{
                ini:true,
                action:function(v){
                    this.getSubNode('DATE').css('display',v?'':'none');
                }
            },
            closeBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('CLOSE').css('display',v?'':'none');
                }
            },
            optBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('OPT').css('display',v?'':'none');
                }
            },
            dateStart : {
                ini:new Date,
                action:function(){
                    this.box._refresh(this,true);
                }
            }
        },
        EventHandlers:{
            beforeClose:function(profile, src){},
            onShowOptions:function(profile, e, src){},
            onGetContent:function(profile, from, to, minMs, type, callback){},
            onStartDateChanged:function(profile, odate, date){},
            beforeTaskUpdated:function(profile, task, from, to){},
            beforeNewTask:function(profile, task){},
            beforeDragTask:function(profile, task, e, src){},
            onClickTask:function(profile, task, e, src){},
            onDblclickTask:function(profile, task, e, src){}
        },
        Appearances:{
            'TBART, BBART':{
                'border-spacing':0,
                'border-collapse':'separate'
            },
            MAINI:{
                'padding-top':'4px'
            },
            MAINC:{
            },
            'BARCMDL span':{
                $order:0,
                width:'15px',
                height:'15px',
                margin:'2px',
                'vertical-align': 'middle',
                cursor:'default'
            },
            BAND:{
                'outline-offset':'-1px',
                '-moz-outline-offset':(xui.browser.gek && xui.browser.ver<3)?'-1px !important':null,
                'font-size':'0',
                'line-height':'0'                
            },
            'MAINP, VIEW, BAND, CON, BIGLABEL, SMALLLABEL':{
                position:'relative'
            },
            'MAINP, VIEW':{
                width:xui.browser.ie6?'100%':null,
                overflow:'hidden'
            },
            SCROLL:{
                'z-index':500,
                position:'absolute',
                'font-size':'0',
                'line-height':'0',
                right:0,
                width:'18px',
                overflow:'auto',
                'overflow-x': 'hidden'
            },
            SCROLLI:{
                height:'1000px',
                width:'1px'
            },
            BG:{
                'z-index':2,
                position:'absolute',
                left:0,
                top:0,
                width:'100%'
            },
            LINES:{
                'z-index':3,
                position:'absolute',
                left:0,
                top:0,
                width:'100%'
            },
            ITEMS:{
                'z-index':4,
                position:'absolute',
                left:0,
                top:0,
                width:'100%',
                overflow:'hidden'
            },
            'LINES div':{
                position:'relative'
            },
            'BIGLABEL, SMALLLABEL':{
                height:'16px',
                cursor:'move'
            },
            'BIGLABEL div, SMALLLABEL div':{
                height:'16px',
                'text-align':'center',
                position:'absolute',
                cursor:'move',
                top:0,
                overflow:'visible'
            },
            'BIGLABEL div':{
                $order:2,
                'text-align':'left'
            },
            TIPS:{
                position:'relative',
                height:'14px',
                'text-align':'center'
            },
            ACTIVE:{
                'z-index':300,
                'border-left': '1px dashed',
                'border-right': '1px dashed',
                position:'absolute',
                top:0,
                left:'-1000px',
                width:0,
                background:0,
                visibility:'hidden',
                height:'100%'
            },
            BGITEM:{
                position:'absolute',
                top:0,
                height:'100%'
            },
            ITEM:{
                position:'absolute',
                overflow:'hidden'
            },
            'HEAD, BODY':{
                position:'relative',
                overflow:'hidden',
                'z-index':'1'
            },
            BODY:{
                $order:2,
                cursor:'pointer'
            },
            'HEAD, HANDLER, TSKBAR, LEFT, RIGHT':{
                'font-size':'1px',
                'line-height':'1px'
            },
            HEAD:{
                cursor:'move'
            },
            HANDLER:{
                position:'relative',
                height:'7px',
                'background-image': 'url('+xui.ini.img_handler+')',
                'background-repeat':'repeat'
            },
            TSKBAR:{
                position:'relative',
                height:'1px',
                width:'100%'
            },
            'LEFT, RIGHT':{
                position:'absolute',
                top:0,
                height:'100%',
                width:'6px',
                'z-index':10
            },
            'LEFT':{
                cursor:'e-resize',
                left:'-1px'
            },
            'RIGHT':{
                cursor:'w-resize',
                right:'-1px'
            },
            CON:{
                position:'relative',
                overflow:'hidden'
            },
            'ITEM-readonly HANDLER, ITEM-disabled HANDLER, ITEM-readonly LEFT, ITEM-disabled LEFT, ITEM-readonly RIGHT, ITEM-disabled RIGHT':{
                $order:2,
                display:'none'
            },
            'ITEM-readonly HEAD, ITEM-disabled HEAD':{
                cursor:'default'
            },
            'ITEM-readonly CON, ITEM-disabled CON':{
                $order:2
            }
        },
        RenderTrigger:function(){
            var self=this, p=self.properties,cls=self.box;
            self.$active = self.getSubNode('ACTIVE').get(0);
            cls._ajustHeight(self);
        },
        _onDropMarkShow:function(){xui.DragDrop.setDragIcon('add');return false},
        _onDropMarkClear:function(){xui.DragDrop.setDragIcon('none');return false},
        _onDragEnter:function(profile,e,src){
            var t=profile.properties,
                ep=xui.Event.getPos(e),
                _left = t._unitPixs/2
            ;
            xui(profile.$active).css('visibility','visible');
            profile.$dd_ox =xui.use(src).offset().left+_left;

            profile.$$ondrag=true;
        },
        _onDragLeave:function(profile){
            profile.$$ondrag=profile.$dd_ox=null;

            profile.box._deActive(profile);
        },
        _onDrop:function(profile){
            profile.$$ondrag=profile.$dd_ox=null;

            var r = profile.box._deActive(profile),
                task={id:_.id(),caption:profile.properties.dftTaskName},
                box=profile.box,
                b=profile.boxing();

            task.from = box._getTime(profile, r.left);
            task.to = box._getTime(profile, r.left+r.width);
            task._dropData=xui.DragDrop.getProfile().dragData;

            if(profile.beforeNewTask && false===b.beforeNewTask(profile, task)){}else
                b.addTasks([task]);
        },
        _prepareData:function(profile){
            var p=profile.properties,
                d={},
                date=xui.Date,
                us=date.$TIMEUNIT,
                nodisplay='display:none',
                zoom=profile.box.$zoom,
                m=0,u,
                i,t,label,temp,_date,width,rate,
                _unitParas,
                _dateStart,
                _barCount,_leftBarCount,_rightBarCount,_barCountall,

                smallMarks,smallLabelStart,smallLabelEnd,smallLabelUnit,smallLabelCount,smallLabelFormat
                ;


            d.dateDisplay = p.dateBtn?'':nodisplay;
            d.closeDisplay = p.closeBtn?'':nodisplay;
            d.optDisplay = p.optBtn?'':nodisplay;
            d._showBigLabel=p.showBigLabel?'':nodisplay;

            // for quick move
            p._scroll_offset = p._scrollRate;

            p._lines=[{}];

            //border
            d._bWidth = p.width;
            d._bHeight = p.height;
            //view
            p._viewHeight = d._bHeight;
            d._tipsdisplay=p.showTips?'':nodisplay;
            d._bardisplay = p.showBar?'':nodisplay;

            //get unitparas from timespan key
            if(p.timeSpanKey){
                _.arr.each(zoom,function(o){
                    if(o[0]===p.timeSpanKey){
                        _unitParas=p._unitParas=o;
                        return false;
                    }
                });
                //give a default key
                if(!_unitParas)
                    _unitParas=p._unitParas=zoom[p.timeSpanKey='1 d'];
            }
            //if no timeSpanKey( _unitParas) input,
            d.zoomDisplay = (p.zoomable && _unitParas)?'':nodisplay

            if(_unitParas){
                p._unitPixs = p.unitPixs||_unitParas[1];
                p._smallLabelCount = p.smallLabelCount||_unitParas[2];
                p._smallLabelUnit = p.smallLabelUnit||_unitParas[3];
                p._smallLabelFormat = p.smallLabelFormat||_unitParas[4];
                p._bigLabelCount = p.bigLabelCount||_unitParas[5];
                p._bigLabelUnit = p.bigLabelUnit||_unitParas[6];
                p._bigLabelFormat = p.bigLabelFormat||_unitParas[7];
                p._timeFormat = p.timeFormat||_unitParas[8];
            }
            u=p._unitPixs;
            smallLabelCount = p._smallLabelCount;
            smallLabelUnit = p._smallLabelUnit;
            smallLabelFormat = p._smallLabelFormat;

            // get bar count in view
            _barCount = (Math.ceil(p.width / u)||0);
            _leftBarCount = p.leftSpanCount?p.leftSpanCount:_barCount;
            _rightBarCount = p.rightSpanCount?p.rightSpanCount:_barCount;
            _barCountall =  _barCount + _leftBarCount + _rightBarCount;

            // ms per px
            rate = p._rate = us[smallLabelUnit]*smallLabelCount/u;

            //adjust dateStart
            if(p.maxDate&& date.add(p.dateStart,'ms',p.width*rate) > p.maxDate)
                p.dateStart=date.add(p.maxDate,'ms',-p.width*rate);
            if(p.minDate&& p.dateStart<p.minDate)
                p.dateStart=p.minDate;

            // get the round start from the approximate start
            _dateStart = date.getTimSpanStart(p.dateStart, smallLabelUnit, smallLabelCount);
            // rel start in band
            smallLabelStart=p._smallLabelStart = date.add(_dateStart, smallLabelUnit, -_leftBarCount*smallLabelCount);
            // rel to in band
            smallLabelEnd = p._smallLabelEnd = date.add(smallLabelStart, smallLabelUnit, _barCountall*smallLabelCount);

            // get band with
            p._band_width = Math.ceil(date.diff(smallLabelStart,smallLabelEnd, 'ms')/rate);

            // set band left
            p._band_left_fix = p._band_left = - Math.ceil(date.diff(smallLabelStart, p.dateStart, 'ms')/rate);

            // build bars
            smallMarks = p._smallMarks = [];

            temp=0;
            label=date.get(smallLabelStart, smallLabelFormat);
            for(i=0; i< _barCountall; i++){
                _date = date.add(smallLabelStart, smallLabelUnit, smallLabelCount*(i+1));
                width = Math.ceil(date.diff(smallLabelStart, _date, 'ms')/rate);
                smallMarks.push({
                    left : temp,
                    width : width - temp,
                    text : label
                });
                temp=width;
                label=date.getText(_date, smallLabelFormat);
            }


            if(p.showBigLabel){
                var _barCount2,off,
                    bigMarks,bigLabelStart,bigLabelEnd,

                    bigLabelCount = p._bigLabelCount,
                    bigLabelUnit = p._bigLabelUnit,
                    bigLabelFormat = p._bigLabelFormat
                    ;

                bigMarks = p._bigMarks = [];
                bigLabelStart=p._bigLabelStart =date.getTimSpanStart(smallLabelStart, bigLabelUnit, bigLabelCount);
                bigLabelEnd=p._bigLabelEnd = date.getTimSpanEnd(smallLabelEnd, bigLabelUnit, bigLabelCount);
                _barCount2 = date.diff(bigLabelStart, bigLabelEnd, bigLabelUnit)/bigLabelCount;
                off=date.diff(smallLabelStart, bigLabelStart, 'ms')/rate;
                label=date.getText(bigLabelStart, bigLabelFormat);
                temp=0;
                for(i=0; i< _barCount2; i++){
                    _date = date.add(bigLabelStart, bigLabelUnit, bigLabelCount*(i+1));
                    width = date.diff(bigLabelStart, _date, 'ms')/rate;
                    bigMarks.push({
                        left : Math.ceil(temp + off),
                        width : Math.ceil(width - temp),
                        text : label
                    });
                    temp=width;
                    label=date.getText(_date, bigLabelFormat);
                }
            }
            return arguments.callee.upper.call(this, profile, d);
        },
        _prepareItem:function(profile, item, oitem, pid){
            var self=this,
                t=profile.properties,
                index;
            if(!item.id)item.id=_.id();
            if(!item.caption)item.caption=t.dftTaskName;
            // caculate left and width
            item._realleft=item._left=self._getX(profile, item.from);
            item._realwidth=item._width=Math.max(self._getX(profile, item.to) - item._left, 0);
            if(item._width<=t.taskMinSize){
                item._width=t.taskMinSize;
            }
            // if too long, cut left
            if(item._left<0){
                item._left=0;
            }
            // if too long, cut right
            if(item._left+item._width>t._band_width){
                item._width=t._band_width-item._left;
            }
            item._perw=+(item._realwidth/item._width*100).toFixed(2);
            if(item._perw>=100)item._perw=100;

            // caculate top and set task to lines cache
            index = self._getLinePos(profile, item);

            item._top = 'top:' + (t.taskHeight+1) * (index-1) + 'px';
            item._zindex = 'z-index:'+index;

            item._background = item.background?'background:'+item.background+';':'';
            
            item._excls=item.disabled?profile.getClass('ITEM','-disabled'):item.readonly?profile.getClass('ITEM','-readonly'):'';

            t._lines = t._lines || [{}];

            //set double link
            t._lines[index][item.id]=item;
            item._line = index;

            oitem._realleft=item._realleft;
            oitem._left=item._left;
            oitem._width=item._width;
            oitem._realwidth=item._realwidth;
            oitem._perw=item._perw;
            oitem._line=item._line;
        },
        $zoom:[
            /*
            *[
            *  id,
            *  small span unit count,
            *  small span unit,
            *  small span to big span function,
            *  small span lable format,
            *  big span lable format,
            *  value format
            *]
            */
            ['10 ms', 54, 10, 'ms', 'ms', 100, 'ms','hnsms','hnsms'],
            ['100 ms',54,  100, 'ms', 'ms', 1, 's','hns','hnsms'],
            ['1 s',30,  1, 's','s', 10, 's','hns','hnsms'],
            ['10 s', 30, 10, 's', 's',60, 's','hns','hnsms'],
            ['1 n',30,  1, 'n','n', 10, 'n','dhn','hns'],
            ['5 n', 30, 5, 'n','n', 30, 'n','mdhn','hns'],
            ['10 n', 30, 10, 'n','n', 60, 'n','mdhn','hns'],
            ['30 n', 30, 30, 'n','n', 4, 'h','ymdh','mdhn'],
            ['1 h', 30, 1, 'h','h',  6, 'h','ymdh','mdhn'],
            ['2 h', 30, 2, 'h','h', 12, 'h','ymdh','mdhn'],
            ['6 h', 30, 6, 'h','h', 24, 'h','ymd','mdhn'],
            ['1 d', 24, 1, 'd','w', 1, 'ww','ymd','ymdh'],
            ['1 w', 30, 1, 'ww','ww', 4, 'ww','ymd','ymd'],
            ['15 d', 30, 15, 'd','d', 2, 'm','ymd','ymd'],

//Not every unit width is the same value:
            ['1 m',  30,1, 'm','m', 1, 'q','yq','ymd'],
            ['1 q',  30,1, 'q','q', 1, 'y','y','ymd'],
            ['1 y',  48,1, 'y','y', 10, 'y','y','ym'],
            ['1 de',  48, 1, 'de','de', 100, 'y','y','ym'],
            ['1 c',  48, 1, 'c', 'c', 1000, 'y','y','y']

        ],
        _getTips:function(profile){
            var t,s='$dd_tooltip';
            if(t = profile[s] || (profile[s] = profile.getSubNode('TIPS').get(0).childNodes[0]))
                return t.nodeValue;
            else
                return profile.getSubNode('TIPS').get(0).innerHTML;
        },
        _rr:/\<[^>]*\>/g,
        _setTips:function(profile, text, force){
            if(!force && profile.pauseA)return;
            var t,s='$dd_tooltip';
            text=text.replace(this._rr,'');
            if(t = profile[s] || (profile[s] = profile.getSubNode('TIPS').get(0).childNodes[0])){
                if(t.nodeValue!=text)t.nodeValue=text;
            }else
                profile.getSubNode('TIPS').get(0).innerHTML=text;
        },
        _getX:function(profile, time){
            var t=profile.properties,d=new Date;
            d.setTime(time);
            return (Math.ceil(xui.Date.diff(t._smallLabelStart, d, 'ms')||0) / t._rate);
        },
        _getTime:function(profile, x, flag){
            var t=profile.properties;
            t = xui.Date.add(t._smallLabelStart, 'ms', x*t._rate);
            return flag?t:t.getTime();
        },
        _moveActive:function(profile, src, x, w, mtype){
            var p=Math.ceil,
                t=profile.properties,
                d=xui.Date,
                s=t._smallLabelStart,
                r=t._rate,
                u=t._timeFormat,
                ms='ms',
                y=src.style,
                z='px',
                m,n,increment,
                xx=x
                ww=w;
            if(!y.visibility || y.visibility=='hidden')
                y.visibility='visible';

            if(increment=t.increment){
                if(mtype=='move'){
                    x=Math.floor(xx/increment)*increment;
                }else{
                    if(mtype=='left'||mtype=='all'){
                        x=Math.floor(xx/increment)*increment;
                        w=ww-(x-xx);
                    }
                    if(mtype=='right'||mtype=='all'){
                        m=Math.floor((w+increment-1)/increment);
                        w=m*increment;
                    }                    
                }
            }

            m = (p(x)||0);
            n = ((p(w)||0)-2);

            if(n>0){
                y.left= m+z;
                y.width= n+z;
                if(t.showTips)
                    profile.box._setTips(profile, d.getText(d.add(s, ms, x*r),u)
                        + " - "
                        + d.getText(d.add(s, ms, (x+w)*r),u)
                    )
            }
            y=src=null;
        },
        _deActive:function(profile){
            var t=profile.$active.style, x=parseInt(t.left,10)||0, w=(parseInt(t.width,10)||0)+2;
            t.visibility='hidden';
            t.left=xui.Dom.HIDE_VALUE;
            t.width=0;
            t=null;
            if(profile.properties.showTips)
                profile.box._setTips(profile, '');
            return {left :x, width :w};
        },
        _minusLeft:function(profile,marks,node,offsetCount){
            var t=profile.properties;
            while((offsetCount--)>0){
                node.first().remove();
                temp=marks.shift();
            }
        },
        _minusRight:function(profile,marks,node,offsetCount){
            var t=profile.properties;
            while((offsetCount--)>0){
                node.last().remove();
                temp=marks.pop();
            }
        },
        _addLeft:function(profile, tag, node, offsetCount,  offset){
            // get additional bars
            var t=profile.properties,
                date=xui.Date,
                key=tag+'Marks',
                marks=t[key],
                labelStart=t[tag+'LabelStart'],
                labelUnit=t[tag+'LabelUnit'],
                labelCount=t[tag+'LabelCount'],
                labelFormat=t[tag+'LabelFormat'],
                rate=t._rate,
                addLb=[],
                temp,label,_date,i;

            temp=0;
            label=date.getText(labelStart, labelFormat);
            for(i=0; i< offsetCount; i++){
                _date = date.add(labelStart, labelUnit, labelCount*(i+1));
                width = date.diff(labelStart, _date, 'ms')/rate;
                addLb.push({
                    left : Math.ceil(temp + (offset||0)-0.0000000000003),
                    width : Math.ceil(width - temp),
                    text : label
                });
                temp=width;
                label=date.getText(_date, labelFormat);
            }
            addLb.reverse();
            // add to band UI
            node.prepend(profile._buildItems(key, addLb,false));
            // add to memory list
            _.arr.insertAny(marks,addLb.reverse(),0);
        },
        _addRight:function(profile, labelEnd, tag, node, offsetCount,  offset){
            var t=profile.properties,
                date=xui.Date,
                key=tag+'Marks',
                marks=t[key],
                labelStart=t[tag+'LabelStart'],
                labelUnit=t[tag+'LabelUnit'],
                labelCount=t[tag+'LabelCount'],
                labelFormat=t[tag+'LabelFormat'],
                rate=t._rate,
                addLb=[],_d1,
                _date,i;
            _d1=labelEnd;
            for(i=0; i<offsetCount; i++){
                _date = date.add(labelEnd, labelUnit, labelCount*(i+1));
                addLb.push({
                    left : Math.ceil(date.diff(labelStart,_d1,'ms')/rate+ (offset||0)-0.0000000000003),
                    width : Math.ceil(date.diff(_d1, _date, 'ms')/rate),
                    text : date.getText(_d1, labelFormat)
                });
                _d1=_date;
            }
            // build
            // add to band UI
            node.append(profile._buildItems(key, addLb,false));
            // add to memory list
            _.arr.insertAny(marks,addLb,-1);
        },
        _getMoveNodes:function(profile){
            return profile.$moveban = profile.$moveban || profile.getSubNode('VIEW');
        },
        //if left is numb, force to move
        _rePosition:function(profile, left){
            profile.pause=true;
            var self=this,
                date = xui.Date,
                t=profile.properties,
                rate=t._rate,
                label,m,n,
                labelsBottom = profile.getSubNode('SMALLLABEL'),
                band = self._getMoveNodes(profile),
                x = left || band.left(),
                //ralated to the fix position
                offset = x - t._band_left_fix;

            // if offset out a bar width
            if(Math.abs(offset)/t._unitPixs >=1 || left){
                var offsetCount = parseInt(offset/t._unitPixs,10),
                    bak_s = t._smallLabelStart,
                    bak_e = t._smallLabelEnd,
                    _c=-offsetCount*t._smallLabelCount,
                    offsetPxs,
                    _smallLabelStart,
                    _smallLabelEnd;

                _smallLabelStart=t._smallLabelStart = date.add(t._smallLabelStart, t._smallLabelUnit, _c);
                _smallLabelEnd=t._smallLabelEnd = date.add(t._smallLabelEnd, t._smallLabelUnit, _c);
                offsetPxs = Math.ceil(date.diff(_smallLabelStart, bak_s, 'ms')/rate);

                band.left(x - offsetPxs);

                // reset band paras
                t._band_width = Math.ceil(date.diff(_smallLabelStart, _smallLabelEnd, 'ms')/rate);

                //reset tasks position var
                _.arr.each(t.items,function(o){
                    o._left += offsetPxs;
                    o._realleft += offsetPxs;
                    profile.box._trimTask(profile,o);
                });
                labelsBottom.children().each(function(o){
                    o.style.left = (parseFloat(o.style.left)||0) + offsetPxs + "px";
                });
                _.arr.each(t._smallMarks,function(o){
                    o.left += offsetPxs;
                });

                // delete out, andd add to blank
                if(offsetCount>0){
                    self._minusRight(profile,t._smallMarks, labelsBottom,offsetCount);
                    self._addLeft(profile, '_small', labelsBottom, offsetCount);
                }else{
                    self._minusLeft(profile,t._smallMarks, labelsBottom, -offsetCount);
                    self._addRight(profile, bak_e, '_small', labelsBottom, -offsetCount);
                }

                if(t.multiTasks){
                    var arr=[];
                    // remove tasks
                    _.arr.each(t.items,function(o){
                        if(o._left >= t._band_width ||  (o._left+o._width) <= 0){
                            //delete from lines
                            delete t._lines[o._line][o.id];
                            arr.push(o.id);
                        }
                    });
                    profile.boxing().removeItems(arr);

                    profile.boxing()._getContent(offsetCount>0 ? _smallLabelStart : bak_e,
                        offsetCount>0 ? bak_s : _smallLabelEnd,
                        t._rate,
                        offsetCount>0 ? 'left' : 'right');

                    //adjust the items
                    self._reArrage(profile);
                }

                if(t.showBigLabel){
                    var labelsTop = profile.getSubNode('BIGLABEL'),
                        bigLabelUnit=t._bigLabelUnit,
                        bigLabelCount=t._bigLabelCount,
                        off,
                        offsetCount2,offsetCount3,
                        bigLabelStart,bigLabelEnd;
                    bak_e=t._bigLabelEnd;

                    labelsTop.children().each(function(o){
                        o.style.left = (parseFloat(o.style.left)||0) + offsetPxs + "px";
                    });
                    _.arr.each(t._bigMarks,function(o){
                        o.left += offsetPxs;
                    });
                    bigLabelStart=date.getTimSpanStart(_smallLabelStart, bigLabelUnit, bigLabelCount);

                    offsetCount2 = Math.ceil(date.diff(_smallLabelStart, t._bigLabelStart, bigLabelUnit)/bigLabelCount);
                    offsetCount3 = Math.ceil(date.diff(t._bigLabelEnd, _smallLabelEnd, bigLabelUnit)/bigLabelCount);

                    //reset offset of big and small
                    if(offsetCount2){
                        off = date.diff(_smallLabelStart, bigLabelStart, 'ms')/rate;
                        t._bigLabelStart=bigLabelStart;
                        if(offsetCount2>0)
                            self._addLeft(profile, '_big',labelsTop, offsetCount2, off);
                        else
                            self._minusLeft(profile,t._bigMarks, labelsTop, -offsetCount2);
                    }
                    //reset offset of big and small
                    if(offsetCount3){
                        off = date.diff(_smallLabelStart, bigLabelStart, 'ms')/rate;
                        t._bigLabelEnd=date.add(t._bigLabelEnd, bigLabelUnit, offsetCount3*bigLabelCount);
                        if(offsetCount3<0)
                            self._minusRight(profile,t._bigMarks, labelsTop, -offsetCount3);
                        else
                            self._addRight(profile, bak_e, '_big',labelsTop, offsetCount3, off);
                    }
                }
            }
            // reset date start point
            t._band_left = band.left();
            var od=t.dateStart;
            t.dateStart = self._getTime(profile, -t._band_left, 1);

            if(profile.onStartDateChanged){
                profile.boxing().onStartDateChanged(profile,od,t.dateStart);
            }

            profile.pause = false;
        },
        _trimTask:function(profile, o){
            //****
            // if too long, cut left
            var x=o._realleft,
                w=o._realwidth,
                pro=profile.properties,
                bw=pro._band_width;

            if(w<=pro.taskMinSize){
                w=pro.taskMinSize;
            }
            if(x < 0){
                if(x+w<0)
                    w=0;
                else
                    w = w + x;
                x = 0;
            }
            if(x>bw)x=bw;
            this._setItemNode(profile, o,'left',x+'px');

            // 直接设置            
            o._left=x;

            // if too long, cut right
            if(x + w > bw)
                w = bw - x;
            // 只有改变才设置
            if(w>=0){
                if(o._width!=w){
                    o._width=w;
                    this._setItemNode(profile, o,'width',w+'px');
                }
            }

        },
        _setItemNode:function(profile, item, key, value){
            var t=profile.getSubNodeByItemId('ITEM',item.id).get(0);
            t.style[key]=value;
        },
        _getLinePos:function(profile,o){
            var t=profile.properties,
                b=false,
                index=0;
            _.arr.each(t._lines,function(v,i){
                if(i===0)return;
                b=true;
                _.each(v,function(v){
                    if(o.id!==v.id)
                        if(((o._left + o._width)>=v._left) && ((v._left + v._width)>=o._left))
                            return b=false;
                });
                if(b){index=i;return false;}
            });
            if(!b)
                index = t._lines.push({})-1;
            return index;
        },
        // _reArrage tasks for top position
        _reArrage:function(profile){
            var self=this, o, h,
                t=profile.properties;
            t._lines.length = 1;
            _.arr.stableSort(t.items,function(x,y){
                    x=x.from;y=y.from;
                    return x>y?1:x==y?0:-1;
            });
            //re caculate from current line
            _.arr.each(t.items,function(v){
                if(v._line===0)return;

                //get pos from current line
                index = self._getLinePos(profile, v);
                t._lines[index][v.id]=v;
                // if has space, reset position
                if(v._line !== index){
                    // reset double link
                    v._line = index;
                    // set top
                    if(t.multiTasks){
                        self._setItemNode(profile, v, 'top', (t.taskHeight+1) * (index-1) +'px');
                        self._setItemNode(profile, v, 'zIndex', index);
                    }
                };
            });

            h = t._linesHeight = t._lines.length * (t.taskHeight+1);

            self._ajustHeight(profile);
        },
        _resetItem:function(profile,o,src){
            var p=profile.properties,
                t=profile.getItemByDom(src),
                bandW=p._band_width,
                f=function(k,i){return profile.getSubNodeByItemId(k,i)},
                timeline=profile.box,
                max=Math.max,
                temp;

            if(o.left){
                t._realleft=t._left=o.left;
                t.from = timeline._getTime(profile,o.left);

                xui.use(src).get(0).style.left=t._left+'px';
            }
            if(o.width){
                t.to = timeline._getTime(profile,o.left+o.width);

                t._realwidth=t._width=o.width;

                if(t._width<=p.taskMinSize){
                    t._width=p.taskMinSize;
                }else{
                    // if too long ,cut right
                    if(o.left + o.width > bandW)
                        t._width = bandW - o.left;
                }                
                xui.use(src).get(0).style.width=t._width+'px';

                temp=+(t._realwidth/t._width*100).toFixed(2);
                if(temp>=100)temp=100;                
                if(temp!=t._perw){
                    t._perw=temp;
                    xui.use(src).first(2).get(0).style.width=temp+'%';
                }
            }
            // _reArrage top position
            timeline._reArrage(profile);
        },
        _ajustHeight:function(profile){
            var p=profile.properties,
                f=function(p){return profile.getSubNode(p)},
                view = f('CON'),
                items = f('ITEMS'),
                lines = f('LINES'),
                h,b,
                ih=p._linesHeight||0,
                vh=view.height();

            h=Math.max(ih,vh);

            b=ih>vh;
            f('SCROLLI').height(h);
            f('SCROLL').css('display',b?'block':'none');
            items.height(h);
            lines.height(h);
            items.top(b?-f('SCROLL').scrollTop():0);
            lines.top(b?-f('SCROLL').scrollTop():0);
            
            var len=parseInt(h/p.taskHeight,10)+1, 
                size=f('LINES').get(0).childNodes.length;
            if(size<len){
                f('LINES').append(xui.create(_.str.repeat('<div class="xui-uiborder-b" style="height:'+p.taskHeight+'px;"></div>',len-size)));
            }
        },
        _showTips:function(profile, node, pos){
            if(profile.properties.disableTips)return;
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);
            if(!xui.Tips)return;

             var t=profile.properties,
                id=node.id,
                format=t._timeFormat,
                sid=profile.getSubId(id),
                map=profile.SubSerialIdMapItem,
                item=map&&map[sid],
                date=xui.Date;

            if(t.disabled)return;
            if(item && item.disabled)return;
            if(item){
                item.tips = '<p style="font-weight:bold">'+item.caption +'</p>'+ date.getText(new Date(item.from),format)+" - "+date.getText(new Date(item.to),format);
                xui.Tips.show(pos, item);
                return false;
            }
        },
        _beforeSerialized:function(profile){
            var w=profile.properties.width,
                o=arguments.callee.upper.call(this, profile);
            o.properties.width=w;
            return o;
        },
        _onresize:function(profile,width,height){
            var pro=profile.properties,
                f=function(k){return profile.getSubNode(k)},
                _bbarH=f('BBAR').height(),
                _tipsH=f('TAIL').height(),
                off2=f('CON').offset(null, profile.getRoot()),
                off3=2,h2,
                t;

            //for border, view and items
            if(height && profile._$h != height){
                f('BORDER').height(profile._$h = t = height);
                f('CON').height(t=t - (pro.showTips?_tipsH:0) -off2.top - (pro.showBar?_bbarH:0) -off3);
                h2=f('BAND').height();

                f('SCROLL').top(h2).height(t+h2);
                profile.getSubNodes(['BG','ITEMS','SCROLL']).height(t);
                this._ajustHeight(profile);
                
                if(xui.browser.ie6)
                    f('ACTIVE').height(f('VIEW').height()+2);
            }
            if(width && profile._$w != width){
                // special: modified widget width here
                f('BORDER').width(profile._$w =  pro.width = width);
                var ins=profile.boxing(),
                    items = ins.getItems('data'),
                    bak_s = pro._smallLabelStart,
                    bak_e = pro._smallLabelEnd,
                    offset, uivalue;
                this._refresh(profile);
                offset = bak_s - pro._smallLabelStart;

                if(!pro.multiTasks)
                    uivalue=pro.$UIvalue;

                // reset all items
                ins.setItems(items);
                
                if(!pro.multiTasks){
                    ins.setUIValue(uivalue, true,null,'resize');
                }else{
                    var arr=[];
                    // filter tasks
                    _.arr.each(pro.items,function(o){
                        if(o._left >= pro._band_width ||  (o._left+o._width) <= 0){
                            //delete from lines
                            delete pro._lines[o._line][o.id];
                            arr.push(o.id);
                        }
                    });
                    ins.removeItems(arr);
                }

                if(offset>0){
                    // first time, call iniContent
                    if(!profile._iniOK){
                        ins.iniContent();
                    }else{
                        ins._getContent(pro._smallLabelStart, bak_s, pro._rate, 'left');
                        ins._getContent(bak_e, pro._smallLabelEnd, pro._rate, 'right');
                    }
                }
                //adjust the items
                this._reArrage(profile);
            }
        },
        _refresh:function(profile,force){
            var pro=profile.properties, ins=profile.boxing(), nodes, uivalue;

            if(!pro.multiTasks)
                uivalue=pro.$UIvalue;

            //clear items first
            ins.clearItems();

            //ins.refresh()
            this._prepareData(profile);

            //refresh labels
            nodes=profile._buildItems('_smallMarks', pro._smallMarks,false);
            profile.getSubNode('SMALLLABEL').empty().append(nodes);
            if(pro.showBigLabel){
                nodes=profile._buildItems('_bigMarks', pro._bigMarks,false);
                profile.getSubNode('BIGLABEL').empty().append(nodes);
            }

            //view/band set left
            profile.getSubNode('VIEW').left(pro._band_left).width(pro._band_width);

            //if singleTask, setUIValue
            if(!pro.multiTasks){
                ins.setUIValue(uivalue, true,null,'refresh');
            //if multiTasks, call iniContent to get tasks
            }else{
                if(force)
                    ins.iniContent();
            }
            return this;
        }
    }
});