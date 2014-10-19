    /*support
    tab: to 4 space
    enter: add head space
    {enter: add head+4 space
    }:add head-4 space
    */
Class("xui.UI.TextEditor", ["xui.UI.Widget","xui.absValue"] ,{
    Instance:{
        activate:function(){
            var profile = this.get(0);
            profile.getSubNode('INPUT').focus();
            return this;
        },
        _setCtrlValue:function(value){
            if(_.isNull(value) || !_.isDefined(value))value='';
            return this.each(function(profile){
                var node=profile.getSubNode('INPUT').get(0);
                if(node.value.replace(/(\r\n|\r)/g, "\n")!=value.replace(/(\r\n|\r)/g, "\n")){
                    var st=node.scrollTop;
                    node.value=value;
                    node.scrollTop=st;
                }
            });
        },
        _getCtrlValue:function(value){
            var profile = this.get(0);
            return profile.getSubNode('INPUT').attr('value').replace(/(\r\n|\r)/g, "\n").replace(/( +)(\n)/g, "$2").replace(/\t/g, "    ");
        }
    },
    Initialize:function(){
        //modify default template for shell
        var t = this.getTemplate();
        _.merge(t.FRAME.BORDER,{
            BOX:{
                tagName:'div',
                INPUT:{
                    tagName:'textarea',
                    tabindex:'{tabindex}',
                    style:'{_css}'
                }
            },
            BAK1:{},
            BAK2:{tagName:'div'}
        },'all');
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            BOX:{
                width:'100%',
                height:'100%',
                left:0,
                top:0,
                //for firefox bug: cursor not show
                position:'absolute',
                overflow:(xui.browser.gek&&xui.browser.ver<3)?'auto':'hidden',
                'z-index':'10'
            },
            INPUT:{
                'font-family': 'Courier New, Courier, monospace',
                'font-size':'12px',
                'line-height':'14px',
                position:'absolute',
                'background-color':'#fff',
                left:0,
                top:0,
                border:0,
                margin:0,
                padding:0,
                overflow:'auto',
                'overflow-y':'auto',
                'overflow-x':'hidden',
                resize:'none'
            },
            'BAK1, BAK2':{
                'font-family': 'Courier New, Courier, monospace',
                'font-size':'12px',
                position:'absolute',
                visibility:'hidden',
                left:'-10000px',
                top:'-10000px'
            }
        },
        Behaviors:{
            INPUT:{
                onFocus:function(profile,e,src){
                    profile.box._onchange(profile,xui.use(src).get(0));
                },
                onChange:function(profile, e, src){
                    profile.boxing().setUIValue(xui.use(src).get(0).value,null,null,'onchange');
                    profile.box._onchange(profile,xui.use(src).get(0));
                },
                afterKeydown:function(profile, e, src){
                    var pro=profile.properties,str,t;
                    if(pro.disabled || pro.readonly)return;
                    if(profile.$change)delete profile.$change;
                    var key = xui.Event.getKey(e),
                    node=xui.use(src).get(0),
                    k=key.key;
                    switch(k){
                        case 'tab':
                            var r=xui.use(src).caret(),
                                sel=node.value.slice(r[0],r[1]);
                            if(/(\n|\r)/.test(sel)){
                                //previous
                                str=node.value.slice(0,r[0]);
                                if(sel.charAt(0)!='\n' && sel.charAt(0)!='\r'){
                                    //change sel
                                    sel=str.slice(r[0]=str.lastIndexOf('\n'))+sel;
                                }
                                //
                                if(xui.browser.ie){
                                    t= (t=str.match(/\r/g))?t.length:0;
                                    r[0]-=t;
                                    t= (t=(node.value.slice(0,r[1])).match(/\r/g))?t.length:0;
                                    r[1]-=t;
                                }

                                //re caret
                                xui.use(src).caret(r[0],r[1]);

                                if(key.shiftKey){
                                    sel=sel.replace(/(\n|\n\r)    /g,'$1');
                                }else{
                                    sel=sel.replace(/(\n|\n\r)/g,'$1    ');
                                }
                                //insert
                                profile.box.insertAtCaret(profile,sel);

                                r[1]=r[0]+sel.length;
                                if(xui.browser.ie){
                                    t= (t=sel.match(/\r/g))?t.length:0;
                                    r[1]-=t;
                                }
                                //caret
                                xui.use(src).caret(r[0],r[1]);
                            }else{
                                if(key.shiftKey){
                                    xui.use(src).caret(r[0]-4,r[0]-4);
                                    r[0]-=4;
                                    r[1]-=4;
                                }else{
                                    profile.box.insertAtCaret(profile,'    ');
                                    r[0]+=4;
                                    r[1]+=4;
                                }
                            }
                            profile.$pos=r;
                            return false;
                        case 'enter':
                            var paras = profile.box.getParas(profile);
                            str = paras[1];
                            var len = str.length - _.str.ltrim(str).length;

                            if(str.charAt(str.length-1)=="{")
                                len +=4;
                            if(len){
                                profile.box.insertAtCaret(profile, '\n'+_.str.repeat(' ',len));
                                profile.$enter=true;
                                return false;
                            }
                            break;
                        default:
                            if(profile.tips){
                                profile.tips.destroy(true);
                                profile.tips=null;
                            }
                    }
                    node=null;
                },
                afterKeypress:function(profile, e, src){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    var key = xui.Event.getKey(e), k=key.key;
                    var me=arguments.callee, map=me.map || (me.map={space:1,enter:1,backspace:1,tab:1,"delete":1});
                    if(k.length==1 || map[k])
                        profile.$change=true;

                    switch(k){
                        case 'tab':
                            if(xui.browser.opr)
                                _.asyRun(function(){
                                    xui.use(src).caret(profile.$pos[0], profile.$pos[1]);
                                });
                            return false;
                        case 'enter':
                            if(profile.$enter){
                                delete profile.$enter;
                                return false;
                            }
                        case '}':
                            if(key.shiftKey){
                                var paras = profile.box.getParas(profile);
                                var
                                loc = paras[0],
                                str = paras[1],
                                pos=paras[2],
                                input=paras[3];
                                if(/ {4}$/.test(str)){
                                    var st=xui(src).scrollTop();
                                    input.value =
                                    input.value.substr(0,loc).replace(/ {4}$/,'}') +
                                    input.value.substr(loc, input.value.length);

                                    //fire event manully
                                    xui(input).onChange();

                                    profile.box.setCaretTo(input, loc - 4 + 1, st);

                                    return false;
                                }
                            }
                            break;
                    }
                },
                afterKeyup:function(profile, e, src){
                    var key = xui.Event.getKey(e),k=key.key;
                    var me=arguments.callee, map=me.map || (me.map={space:1,enter:1,backspace:1,tab:1,"delete":1});
                    if(k.length==1 || map[k])
                        profile.$change=true;

                    if(profile.$change){
                        delete profile.$change;
                        profile.box._onchange(profile,xui.use(src).get(0));
                    }
                }
            }
        },
        DataModel:{
            selectable:true,
            left:0,
            top:0,
            width:200,
            height:200,
            position:'absolute',
            disabled:{
                ini:false,
                action: function(v){
                    b.boxing().setReadonly(v);
                }
            },
            readonly:{
                ini:false,
                action: function(v){
                    this.getSubNode('INPUT').attr('readonly',v).css('background',v?'#EBEADB':'');
                }
            }
        },
        EventHandlers:{
            onChange:function(profile, oV, nV){}
        },
        RenderTrigger:function(){
            var ns=this;
            if(ns.properties.readonly)
                ns.boxing().setReadonly(true,true);

            var ie=xui.browser.ie,
                src=ns.getSubNode('INPUT').get(0),
                f=function(o){
                    //only for value in IE
                    if(ie && o.propertyName!='value')return true;

                    var src=ie?o.srcElement:this;
                    ns.box._onchange(ns,src);
                };
            if(ie){
                src.attachEvent("onpropertychange",f);
                src.attachEvent("ondrop",f);
                ns.$ondestory=function(){
                    src.detachEvent("onpropertychange",f);
                    src.detachEvent("ondrop",f);
                    src=f=null;
                }
            }else{
                src.addEventListener("input",f,false);
                src.addEventListener("dragdrop",f,false);
                ns.$ondestory=function(){
                    var src=this.getSubNode('INPUT').get(0);
                    if(src){
                        src.removeEventListener("input",f,false);
                        src.addEventListener("dragdrop",f,false);
                    }
                    src=f=null;
                }
                ns.getSubNode('BOX').$firfox2();
            }
        },
        _onchange:function(profile,src){
            if(profile.onChange){
                var v=src.id;
                _.resetRun(profile.$xid+'_drop', function(){
                    v=xui.Dom.byId(v).value||'';
                    profile.$prevV=profile.$prevV||'';
                    if(v!=profile.$prevV){
                        profile.boxing().onChange(profile, profile.$prevV, v);
                        profile.$prevV=v;
                    }
                });
            }
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile);
            if(xui.browser.kde)
                d._css='resize:none;';
            return d;
        },
        //
        _onresize:function(profile,width,height){
            var upper=arguments.callee.upper,
                size = upper.apply(this,_.toArr(arguments));
            upper=null;
            profile.getSubNode('BOX').cssSize(size);
            profile.getSubNode('INPUT').cssSize(size);
        },
        //for
        insertAtCaret:function(profile, text) {
            var input = profile.getSubNode('INPUT'),
                scrollTop = input.scrollTop() || null,
                ret;
            //fire onChange manully
            input.onChange();
            //replace text
            ret=input.caret(text);
            //set cursor
    	    this.setCaretTo(input.get(0), ret||0, scrollTop);
    	},
        //set cursor to textarea
        setCaretTo:function(input, pos, scrollTop){
            input.focus()
            var s,c,h,o=xui([input]);

            //opera not support scrollTop in textarea
            if(_.isNumb(scrollTop))
                o.scrollTop(scrollTop);

            if(scrollTop===true){
                if(o.get(0).tagName.toLowerCase() == 'textarea' && o.scrollHeight() !== o.offsetHeight()){
                    s = o.attr('value').substr(0,pos);
                    c = o.clone().id('').css({visibility:'hidden',position:'absolute',left:5000+'px'}).attr('value',s);
                    xui('body').append(c);
                    h = Math.max((c.scrollHeight() > c.offsetHeight()) ? c.scrollHeight() - 30 : 0,0);
                    o.scrollTop(h);
                    c.remove();
                }
            }
            o.caret(pos,pos);
        },
        /*
        return array
        [0] char number before caret
        [1] line number of caret
        [2] absPos of caret
        [3] text before caret
        */
        getParas:function(profile){
            var o = profile.getSubNode('INPUT'), 
                me=arguments.callee, 
                reg = me.reg ||(me.reg=/\r\n/g),
                v = o.get(0).value,
                loc = o.caret();

            if(loc[0]<0)loc[0]=0;

            //for ie/opera
            var l=0, m = v.substr(0,loc[0]).match(reg);
            if(m)l=m.length;
            v = v.replace(reg,'\n');
            var txt = v.substr(0,loc[0]-l);

            var
            li = txt.lastIndexOf('\n') ,
            line = txt.substr(li+1, loc[0]-li),
            w=o.innerWidth(),
            bak1 = profile.getSubNode('BAK1'),
            bak2 = profile.getSubNode('BAK2')
            ;
            if(txt.charAt(txt.length-1)=='\n')txt+='*';

            bak2.width(w);
            var
            x = bak1.html(line.replace(/ /g,'&nbsp;'),false).width(),
            y = bak2.html(txt.replace(/\n/g,'<br />'),false).height() - o.scrollTop();

            if(x>w){
                bak2.html(line,false);
                var lbak = line;
                var bl = bak2.height();
                while(lbak){
                    //delete last words
                    lbak=lbak.replace(/ [^ ]*$/,'');
                    bak2.html(lbak,false);
                    if(bak2.height()!=bl)break;
                }
                lbak = line.substr(lbak.length, line.length-lbak.length);
                x = bak1.html(lbak,true).width();
            }

            bak1.html('',false);
            bak2.html('',false);

            var pos = profile.getRoot().offset();
            pos.left+=x;
            pos.top+=y;
            return [loc[0],line,pos,o.get(0),txt];
        }
    }
});
