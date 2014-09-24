Class("xui.UI.PageBar",["xui.UI","xui.absValue"] ,{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                if(!profile.renderId)return;
                var t,
                    prop = profile.properties,
                    arr = profile.box._v2a(value),
                    min=arr[0],
                    cur=arr[1],
                    max=arr[2],
                    keys = profile.keys,
                    fun = function(p,k){return p.getSubNode(k)},

                    first = fun(profile, 'FIRST'),
                    prev = fun(profile, 'PREV'),
                    prehide = fun(profile, 'PREM'),
                    current = fun(profile, 'CUR'),
                    next = fun(profile, 'NEXT'),
                    nexthide = fun(profile, 'NEXTM'),
                    last = fun(profile, 'LAST'),

                    change = function(n,i,j,k){
                        if(i)n.first(3).attr('href',prop.uriTpl.replace('*',i));
                        if(_.isSet(j))
                            n.first(3).html(prop.textTpl.replace('*',j),false);
                        
                        if(_.isSet(k))
                            n.get(0)._real_page=k;
                    },
                    display = function(n,f){n.css('display',f?'':'none')}
                    ;
                //change href and text
                change(first, min, min);
                change(prehide, '','..' + _.str.repeat('.',String(cur-1-min).length) , 1);
                change(prev, cur-1, prop.prevMark);
                change(current, cur, cur);
                change(next, cur+1, prop.nextMark);
                change(nexthide, '','..' + _.str.repeat('.',String(max-cur-1).length) , 1);
                change(last, max, max);

                //show or hide
                if((t=cur-min)<=0){
                    display(first,0);display(prehide,0);display(prev,0);
                }else if(t==1){
                    display(first,1);display(prehide,0);display(prev,0);
                }else if(t==2){
                    display(first,1);display(prehide,0);display(prev,1);
                    change(prev, cur-1, cur-1);
                }else{
                    display(first,1);display(prehide,1);display(prev,1);
                    if(t==3){
                        change(prev, cur-1, cur-1);
                        change(prehide, cur-2, cur-2, 0);
                    }
                }
                if((t=max-cur)<=0){
                    display(last,0);display(nexthide,0);display(next,0);
                }else if(t==1){
                    display(last,1);display(nexthide,0);display(next,0);
                }else if(t==2){
                    display(last,1);display(nexthide,0);display(next,1);
                    change(next, cur+1, cur+1);
                }else{
                    display(last,1);display(nexthide,1);display(next,1);
                    if(t==3){
                        change(next, cur+1, cur+1);
                        change(nexthide, cur+2, cur+2, 0);
                    }
                }
            });
        },
        setPage:function(value){
            return this.each(function(o){
                var v=o.properties.value,
                    a=v.split(':');
                a[1]=parseInt(value,10)||a[0];
                o.boxing().setValue(a.join(':'));
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
                    className:'xui-uibg-base'
                }
            },
            LABEL:{
                text:'{caption}'
            },
            FIRST:{
                $order:1,
                className:'xui-ui-btn',
                FIRSTI:{
                    className:'xui-ui-btni',
                    FIRSTC:{
                        className:'xui-ui-btnc',
                        FIRSTA:{
                            tagName:'a',
                            href:'#',
                            tabindex: '{tabindex}'
                        }
                    }
                }
            },
            PREM:{
                $order:2,
                className:'xui-ui-btn',
                PREMI:{
                    className:'xui-ui-btni',
                    PREMC:{
                        className:'xui-ui-btnc',
                        PREMA:{
                            tagName:'a',
                            href:'#',
                            tabindex: '{tabindex}'
                        }
                    }
                }
            },
            PREV:{
                $order:3,
                className:'xui-ui-btn',
                PREVI:{
                    className:'xui-ui-btni',
                    PREVC:{
                        className:'xui-ui-btnc',
                        PREVA:{
                            tagName:'a',
                            href:'#',
                            tabindex: '{tabindex}',
                            text:'{prevMark}'
                        }
                    }
                }
            },
            CUR:{
                $order:4,
                className:'xui-ui-btn xui-ui-btn-focus',
                CURI:{
                    className:'xui-ui-btni',
                    CURC:{
                        className:'xui-ui-btnc',
                        CURA:{
                            tagName:'a',
                            href:'#',
                            tabindex: '{tabindex}'
                        }
                    }
                }
            },
            NEXT:{
                $order:5,
                className:'xui-ui-btn',
                NEXTI:{
                    className:'xui-ui-btni',
                    NEXTC:{
                        className:'xui-ui-btnc',
                        NEXTA:{
                            tagName:'a',
                            href:'#',
                            tabindex: '{tabindex}',
                            text:'{nextMark}'
                        }
                    }
                }
            },
            NEXTM:{
                $order:6,
                className:'xui-ui-btn',
                NEXTMI:{
                    className:'xui-ui-btni',
                    NEXTMC:{
                        className:'xui-ui-btnc',
                        NEXTMA:{
                            tagName:'a',
                            href:'#',
                            tabindex: '{tabindex}'
                        }
                    }
                }
            },
            LAST:{
                $order:7,
                className:'xui-ui-btn',
                LASTI:{
                    className:'xui-ui-btni',
                    LASTC:{
                        className:'xui-ui-btnc',
                        LASTA:{
                            tagName:'a',
                            href:'#',
                            tabindex: '{tabindex}'
                        }
                    }
                }
            }
        },
        Appearances:{
            LABEL:{
                'font-size':'12px',
                padding:'3px 6px 0 6px',
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
            'KEY .xui-ui-btn, POP .xui-ui-btn':{
                'margin-right':'3px'
            },
            'KEY .xui-ui-btn a, POP .xui-ui-btn a':{
                padding:'0 3px 0 3px'
            },
            'PREV,CUR,NEXT':{
                'font-weight' : 'bold'
            },
            POP:{
                border:'dotted 1px gray',
                background:'#fff',
                position:'absolute',
                padding:'3px',
                'line-height':'26px'
            }
        },
        Behaviors:{
            HoverEffected:{FIRST:'FIRST',PREM:'PREM',PREV:'PREV',NEXT:'NEXT',NEXTM:'NEXTM',LAST:'LAST',POPI:'POPI',CUR:'CUR'},
            ClickEffected:{FIRST:'FIRST',PREM:'PREM',PREV:'PREV',NEXT:'NEXT',NEXTM:'NEXTM',LAST:'LAST',POPI:'POPI',CUR:'CUR'},
            POP:{
                onClick:function(profile, e, src){
                    var o=xui(src),
                        r = xui.Event.getSrc(e)
                        ;
                    o.setBlurTrigger(profile.key+":"+profile.$xid, null);
                    profile.getSubNode('POOL').append(o);
                    if(r.tagName.toLowerCase()=='a' || ((r=r.firstChild)&&(r.tagName.toLowerCase()=='a')) || ((r=r.firstChild)&&(r.tagName.toLowerCase()=='a')) || ((r=r.firstChild)&&(r.tagName.toLowerCase()=='a')))
                        return profile.box._click(profile,r.parentNode.parentNode.parentNode);
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
                onClick:function(profile, e, src){
                    return profile.box._click(profile,src);
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
            readonly:null,
            autoTips:false,
            caption:{
                ini:' Page: ',
                action:function(v){
                    v=(_.isSet(v)?v:"")+"";
                    this.getSubNode('LABEL').html(xui.adjustRes(v,true));
                }
            },
            value:"1:1:1",
            uriTpl:"#*",
            textTpl:"*",
            prevMark:'&lt;',
            nextMark:'&gt;',
            _moreStep:100
        },
        EventHandlers:{
            onClick:function(profile, page){}
        },
        _ensureValue:function(profile,value){
            value=value+'';
            var a = value.split(':'),
                b=[],
                fun=function(a){return parseInt(a,10)||1};
            if(a.length<3){
                b=profile.properties.$UIvalue.split(':');
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
            if(profile.properties.disabled)return false;
            var b=profile.boxing(),
                v=b.getValue(),
                a=v.split(':');

            var r = b.onClick(profile, parseInt(xui(src).first(3).attr('href').split('#')[1],10)||a[0]);
            return typeof r=="boolean"?r:false;
        },
        _show:function(profile, e, src, flag){
            if(profile.properties.disabled)return false;
            var prop = profile.properties,
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
                a.push('<span style="margin-top:3px;" id="'+_id+n+'" class="xui-node xui-node-span xui-ui-btn"><span class="xui-node xui-node-span xui-ui-btni"><span class="xui-node xui-node-span xui-ui-btnc"><a class="xui-node xui-node-a" href="'+prop.uriTpl.replace('*',n)+'">'+prop.textTpl.replace('*',n)+'</a></span></span></span>')
                n=n+m;
            }
            pop.width('auto');
            pop.html(a.join(' '));
            xui('body').append(pop);
            if(pop.width()>300)pop.width(300);
            pop.popToTop(src);
            pop.setBlurTrigger(profile.key+":"+profile.$xid, function(){
                pool.append(pop);
            });
        }
    },
    Initialize:function(){
        this.addTemplateKeys(['POPI']);
    }
});
