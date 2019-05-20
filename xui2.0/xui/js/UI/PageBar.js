xui.Class("xui.UI.PageBar",["xui.UI","xui.absValue"] ,{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                if(!profile.renderId)return;
                var t,
                    prop = profile.properties,
                    hidemore = !prop.showMoreBtns,
                    arr = profile.box._v2a(value),
                    min=arr[0],
                    cur=arr[1],
                    max=arr[2],
                    keys = profile.keys,
                    fun = function(p,k){return p.getSubNode(k)},

                    first = fun(profile, 'FIRST'),
                    prev = fun(profile, 'PREV'),
                    prem = fun(profile, 'PREM'),
                    current = fun(profile, 'CUR'),
                    next = fun(profile, 'NEXT'),
                    nextm = fun(profile, 'NEXTM'),
                    last = fun(profile, 'LAST'),

                    change = function(n,i,j,k,t){
                        if(i){
                            n.attr('href', prop.uriTpl.replace('*',i));
                            n.attr('title', i);
                        }else if(t){
                            n.attr('title', t);                        
                        }
                        if(xui.isSet(j))
                            n.html(prop.textTpl.replace('*',j),false);
                        
                        if(xui.isSet(k))
                            n.get(0)._real_page=k;
                    },
                    display = function(n,f){n.css('display',f?'':'none')}
                    ;
                //change href and text
                change(first, min, min);
                change(prem, '','..' + xui.str.repeat('.',String(cur-1-min).length) , 1, (min+1) + "~" + (cur-2));
                change(prev, cur-1, prop.prevMark||(cur-1));
                current.get(0).value = cur+"";
                change(next, cur+1, prop.nextMark||(cur+1));
                change(nextm, '','..' + xui.str.repeat('.',String(max-cur-1).length) , 1, (cur+2) + "~" + (max-1));
                change(last, max, max);

                //show or hide
                if((t=cur-min)<=0){
                    display(first,0);display(prem,0);display(prev,0);
                }else if(t==1){
                    display(first,1);display(prem,0);display(prev,0);
                }else if(t==2){
                    display(first,1);display(prem,0);display(prev,1);
                    change(prev, cur-1, cur-1);
                }else{
                    display(first,1);display(prem,hidemore?0:1);display(prev,1);
                    if(t==3){
                        change(prev, cur-1, cur-1);
                        change(prem, cur-2, cur-2, 0);
                    }
                }
                if((t=max-cur)<=0){
                    display(last,0);display(nextm,0);display(next,0);
                }else if(t==1){
                    display(last,1);display(nextm,0);display(next,0);
                }else if(t==2){
                    display(last,1);display(nextm,0);display(next,1);
                    change(next, cur+1, cur+1);
                }else{
                    display(last,1);display(nextm,hidemore?0:1);display(next,1);
                    if(t==3){
                        change(next, cur+1, cur+1);
                        change(nextm, cur+2, cur+2, 0);
                    }
                }
            });
        },
        setPage:function(value, force, type){
            return this.each(function(o){
                if(!/^[1-9]\d*$/.test(value+""))return;
                var p=o.properties,
                    pc = p.pageCount, 
                    v=(p.$UIvalue||p.value||"")+"",
                    a=v.split(':'),
                    b=parseInt(a[1],10);

                if(value > parseInt(a[2],10))return;
                a[1]=parseInt(value,10) || b;

                if(force || a[1]!==b){
                    o.boxing().setUIValue(a.join(':'),false,false,'page');
                    if(o.onPageSet)o.boxing().onPageSet(o, a[1], (a[1]-1)*pc, pc, type||"code", b, (b-1)*pc);
                }
            });
        },
        getPage:function(total){
            var o=this.get(0),
                p=o.properties,
                v=(p.$UIvalue||p.value||"")+"",
                a=v.split(':');
            return a[total?2:1];
        },
        getTotalPages:function(){
            return this.getPage(true);
        },
        setTotalCount:function(count){
            count=parseInt(count,10)||0;
            return this.each(function(o){
                var p=o.properties,
                    pc=parseInt(p.pageCount,10),
                    max = parseInt((count + pc -1) /pc,10),
                    v=(p.$UIvalue||p.value||"")+"",
                    a=v.split(':');

                a[2]=max;
                if(parseInt(a[1],10)>max)a[1]=1;

                o.boxing().setUIValue(a.join(':'),false,false,'settotal');
            });
        }
    },
    Static:{
        Templates:{
            style:'{_style}',
            className:'{_className}',
            POOL:{
                style:'position:absolute;display:none;',
                POP:{
                    tagName:'div',
                    className:'xui-uibase xui-ui-reset xui-ui-ctrl'
                }
            },
            LABEL:{
                text:'{caption}'
            },
            FIRST:{
                $order:1,
                tagName:"a",
                className:'xui-ui-btn xui-uibar xui-uigradient xui-uiborder-radius',
                href:'#',
                tabindex: '{tabindex}'
            },
            PREM:{
                $order:2,
                className:'xui-ui-btn xui-uibar xui-uigradient xui-uiborder-radius',
                style:'{_css2}',
                tagName:'a',
                href:'#',
                tabindex: '{tabindex}'
            },
            PREV:{
                $order:3,
                className:'xui-ui-btn xui-uibar xui-uigradient xui-uiborder-radius',
                tagName:'a',
                href:'#',
                tabindex: '{tabindex}',
                text:'{prevMark}'
            },
            CUR:{
                $order:4,
                className:'xui-ui-input xui-ui-shadow-input xui-uiborder-flat xui-uiborder-radius xui-uibase',
                tagName : 'input',
                autocorrect:"off",
                autocomplete:"off",
                //autocapitalize:"off",                
                tabindex:'{tabindex}',
                style:'{_css}'
            },
            NEXT:{
                $order:5,
                className:'xui-ui-btn xui-uibar xui-uigradient xui-uiborder-radius',
                tagName:'a',
                href:'#',
                tabindex: '{tabindex}',
                text:'{nextMark}'
            },
            NEXTM:{
                $order:6,
                className:'xui-ui-btn xui-uibar xui-uigradient xui-uiborder-radius',
                style:'{_css2}',
                tagName:'a',
                href:'#',
                tabindex: '{tabindex}'
            },
            LAST:{
                $order:7,
                className:'xui-ui-btn xui-uibar xui-uigradient xui-uiborder-radius',
                tagName:'a',
                href:'#',
                tabindex: '{tabindex}'
            }
        },
        Appearances:{
            LABEL:{
                padding:'.25em .5em 0 .5em',
                'vertical-align':'top',                
                'white-space':'nowrap'
            },
            KEY:{
                display:'inline',
                overflow:'visible'
            },
            'KEY a:focus, POP a:focus':{
                'outline-offset':'',
                '-moz-outline-offset': (xui.browser.gek && xui.browser.ver<3)?'':null
            },
            'KEY .xui-ui-btn, KEY .xui-ui-input, POP .xui-ui-btn':{
                'margin-right':'.25em'
            },
            CUR:{
                'font-weight' : 'bold',
                'text-align':'center',
                padding:'.25em',
                'width':'2em',
                'margin-top':'-1px'
            },
            POP:{
                border:'dotted 1px gray',
                position:'absolute',
                padding:'.25em',
                'line-height':'2.25em'
            }
        },
        Behaviors:{
            HoverEffected:{FIRST:'FIRST',PREM:'PREM',PREV:'PREV',NEXT:'NEXT',NEXTM:'NEXTM',LAST:'LAST',POPI:'POPI',CUR:'CUR'},
            ClickEffected:{FIRST:'FIRST',PREM:'PREM',PREV:'PREV',NEXT:'NEXT',NEXTM:'NEXTM',LAST:'LAST',POPI:'POPI'},
            POP:{
                onClick:function(profile, e, src){
                    var o=xui(src),
                        r = xui.Event.getSrc(e)
                        ;
                    o.setBlurTrigger(profile.key+":"+profile.$xid, null);
                    profile.getSubNode('POOL').append(o);
                    if(r.tagName.toLowerCase()=='a' || ((r=r.firstChild)&&(r.tagName.toLowerCase()=='a')) || ((r=r.firstChild)&&(r.tagName.toLowerCase()=='a')) || ((r=r.firstChild)&&(r.tagName.toLowerCase()=='a')))
                        return profile.box._click(profile,r);
                }
            },
            FIRST:{
                onClick:function(profile, e, src){
                    return profile.box._click(profile,src);
                }
            },
            PREM:{
                onClick:function(profile, e, src){
                    if(xui.use(src).get(0)._real_page){
                        profile.box._show(profile,e,src,0);
                        return false;
                    }else{
                        return profile.box._click(profile,src);
                    }
                }
            },
            PREV:{
                onClick:function(profile, e, src){
                    return profile.box._click(profile,src);
                }
            },
            CUR:{
                onKeypress:function(profile, e, src){
                    var k=xui.Event.getKey(e),
                        caret=xui.use(src).caret();
                    // if not positive integer, set back
                    if(!/^\d$/.test(k.key)){
                        return false;
                    }
                    if(k.key==='0' && caret[0]===0){
                        return false;
                    }
                },
                onChange:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled || p.readonly)return;

                    var v=(p.$UIvalue||p.value||"")+"",
                        a=v.split(':'),
                        cur=parseInt(a[1]||"",10),
                        max=parseInt(a[2]||"",10),
                        value=xui.use(src).get(0).value||"";

                    // if not positive integer, set back
                    if(!/^[1-9]\d*$/.test(value)){
                        xui(src).attr('value',cur+"");
                        return;
                    }

                    value = parseInt(value,10);
                    if(cur!==value){
                        value =value > max ? max : value;
                        xui(src).attr('value', value+"");
                        profile.boxing().setPage(value,false,'input');
                    }
                },
                onKeydown:function(profile, e, src){
                   var p=profile.properties,b=profile.box,
                        evt=xui.Event,
                        k=evt.getKey(e);
                    if(p.disabled || p.readonly)return;

                    //fire onchange
                    if(k.key=='enter')
                        xui.use(src).onChange();
                }
            },
            NEXT:{
                onClick:function(profile, e, src){
                    return profile.box._click(profile,src);
                }
            },
            NEXTM:{
                onClick:function(profile, e, src){
                    if(xui.use(src).get(0)._real_page){
                        profile.box._show(profile,e,src,1);
                        return false;
                    }else{
                        return profile.box._click(profile,src);
                    }
                }
            },
            LAST:{
                onClick:function(profile, e, src){
                    return profile.box._click(profile,src);
                }
            }
        },
        DataModel:{
            dataField:null,
            dataBinder:null,
            autoTips:false,
            dirtyMark:false,
            showDirtyMark:false,
            parentID:'',
            isFormField:{
                hidden:true,
                ini:false
            },
            caption:{
                ini:' Page: ',
                action:function(v){
                    v=(xui.isSet(v)?v:"")+"";
                    this.getSubNode('LABEL').html(xui.adjustRes(v,true));
                }
            },
            showMoreBtns:{
                ini:true,
                action:function(v){
                    this.getSubNodes(['PREM','NEXTM']).css('display', v?'':'none');
                }
            },
            pageCount:20,
            disabled:{
                ini:false,
                action: function(v){
                    var i=this.getSubNode('CUR'),
                        cls="xui-ui-disabled";
                    
                    if(v)this.getRoot().addClass(cls);
                    else this.getRoot().removeClass(cls);
                        
                    if(!v && this.properties.readonly)
                        v=true;
                    // use 'readonly'(not 'disabled') for selection
                    i.attr('readonly',v);
                }
            },
            readonly:{
                ini:false,
                action: function(v){
                    var i=this.getSubNode('CUR'),
                        cls="xui-ui-readonly";
                    
                    if(v)this.getRoot().addClass(cls);
                    else this.getRoot().removeClass(cls);

                    if(!v && this.properties.disabled)
                        v=true;
                    // use 'readonly'(not 'disabled') for selection
                    i.attr('readonly',v);
                }
            },
            value:"1:1:1",
            uriTpl:"#*",
            textTpl:"*",
            prevMark:'',
            nextMark:'',
            _moreStep:30
        },
        EventHandlers:{
            onClick:function(profile, page){},
            onPageSet:function(profile, page, start, count, eventType, opage, ostart){}
        },
        RenderTrigger:function(){
            var ns=this,p=ns.properties,a=((p.value||"")+"").split(':');
            if(p.readonly)
                ns.boxing().setReadonly(true,true);
            if(!ns.$inDesign)
                ns.boxing().setPage(a[1]||a[0],true,'inited');
        },
        _ensureValue:function(profile,value){
            value=value+'';
            var a = value.split(':'),
                p=profile.properties,
                b=[],
                fun=function(a){return parseInt(a,10)||1};
            if(a.length<3){
                b=((p.$UIvalue||p.value||'')+'').split(':');
                a[1]=a[0];
                a[0]=b[0];
                a[2]=b[2];
            }
            b[0]=fun(a[0]);
            b[1]=fun(a[1]);
            b[2]=fun(a[2]);

            b[0] = Math.max(b[0],1);
            b[0] = Math.min(b[0],b[1]);
            b[2] = Math.max(b[1],b[2]);

            return b.join(':');
        },
        _v2a:function(v){
            v = typeof v == 'string'? v.split(':') : v;
            v[0]=parseInt(v[0],10);v[1]=parseInt(v[1],10);v[2]=parseInt(v[2],10);
            return v;
        },
        _click:function(profile, src){
            var p=profile.properties;
            if(p.disabled||p.readonly)return false;
            var b=profile.boxing(),
                a=(p.$UIvalue||p.value||"").split(':'),
                nv=parseInt(xui(src).attr('href').split('#')[1],10)||a[1]||a[0];

            var r = b.onClick(nv);

            // if didn't call setPage  in onclick event, setPage here
            if(!a.length || (nv+"")!==(a[1]+"")){
                b.setPage(nv,false,'click');
            }

            return typeof r=="boolean"?r:false;
        },
        _show:function(profile, e, src, flag){
            var prop=profile.properties;
            if(prop.disabled||prop.readonly)return false;

            var pid=prop.parentID||xui.ini.$rootContainer,
                arr = profile.box._v2a(prop.value),
                min=arr[0],
                cur=arr[1],
                max=arr[2],

                keys = profile.keys,
                fun = function(p,k){return p.getSubNode(k)},
                pool = fun(profile, 'POOL'),
                pop = fun(profile, 'POP'),
                ceil = function(n){return Math.ceil((n+1)/10)*10},
                a=[],
                t,m,n,i,l
                ;

            if(flag){
                if((t=max-1-cur)<=0)return;
                n=cur + 1;
                l=max;
            }else{
                if((t=cur-1-min)<=0)return;
                n=1;
                l=cur-1;
            }
            m=Math.ceil(t/prop._moreStep);
            if(m>10){
                n=ceil(n);
                l=ceil(l)-1;
                m=ceil(m);
            }else
                n=n+m;
            //
            var _id=profile.keys.POPI+':'+profile.serialId+':';
            while(n<l){
                //margin-top for ie6
                a.push('<a style="margin-top:.25em;" id="'+_id+n+'" class="xui-node xui-node-span xui-ui-btn xui-uibar xui-uigradient xui-uiborder-radius" href="'+prop.uriTpl.replace('*',n)+'">'+prop.textTpl.replace('*',n)+'</a>')
                n=n+m;
            }
            pop.width('auto');
            pop.html(a.join(' '));
            xui('body').append(pop);
            if(pop.width()>300)pop.width(300);
            pop.popToTop(src,null,pid? xui.get(profile,["host", pid]) ? profile.host[pid].getContainer():xui(pid):null);
            pop.setBlurTrigger(profile.key+":"+profile.$xid, function(){
                pool.append(pop);
            });
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            data._css=xui.browser.kde?'resize:none;':'';
            data._css2 = data.showMoreBtns?'':'display:none;';
            return data;
        }   
    },
    Initialize:function(){
        this.addTemplateKeys(['POPI']);
    }
});
