xui.Class('xui.Debugger', null, {
    Static:{
        $time:xui.stamp(),
        _id1:'xui:dbg::_frm',
        _id4:'xui:dbg::_head',
        _id2:'xui:dbg::_con',
        _id3:'xui:dbg::_inp',
        err:function(sMsg,sUrl,sLine){
            if(xui.browser.gek && sMsg=='Error loading script')
                return true;
            xui.Debugger.log('>>' + sMsg+' at File: '+ sUrl + ' ( line ' + sLine + ' ).');
            return true;
        },
        trace:function(obj){
            var args=xui.toArr(arguments),
                fun=args[1]||arguments.callee.caller,
                arr=args[2]||[];
            if(fun){
                arr.push('function "' + (fun.$name$||'') + '" in Class "' + (fun.$original$||'') +'"');
                if(fun.caller){
                    try{
                        arguments.callee(null,fun.caller,arr,1);
                    }catch(e){}
                }
            }
            if(!args[3]){
                var a=[];
                a.push(' >> Object Info:');
                if(typeof obj == 'object')
                    for(var i in obj)
                        a.push(' -- ' + i + " : " + obj[i]);
                else
                    a.push(obj);
                a.push(' >> Function Trace: ' + arr.join(' <= '));
                xui.Debugger.log.apply(xui.Debugger,a);
            }
            fun=null;
        },
        log:function(){
            var t1,t2,time,self=this,arr=xui.toArr(arguments),str;
            if(!arr.length)return;

            t1 = document.createElement("div");
            t2 = document.createElement("div");
            t2.className='xui-uibase xui-dbg-con1';
            time=xui.stamp();
            t2.appendChild(document.createTextNode('Time stamp : '+time +'('+(time-self.$time)+')' ));
            self.$time=time;
            t1.appendChild(t2);
            for(var i=0,l=arr.length;i<l;i++){
                str=arr[i];
                t2 = document.createElement("div");
                t2.className='xui-uibase xui-dbg-con2';
                t2.appendChild(document.createTextNode(" "+xui.stringify(xui.isArguments(str)?xui.toArr(str):str)));
                t1.appendChild(t2);
            }

            if(!xui.Dom.byId(self._id2)){
                var ns=xui.create('<div id='+self._id1+' style="left:5px;top:'+(xui.win.scrollTop()+5)+'px;" class="xui-ui-reset xui-node xui-node-div xui-wrapper xui-dbg-frm xui-custom"><div class="xui-node xui-node-div xui-dbg-box xui-custom"><div id='+self._id4+' class="xui-node xui-node-div xui-uibar xui-dbg-header xui-custom">&nbsp;&nbsp;:&nbsp;)&nbsp;&nbsp;CrossUI Monitor window <span class="xui-node xui-node-span xui-dbg-cmds xui-custom"><a class="xui-node xui-node-a xui-custom" href="javascript:;" onclick="xui(\''+self._id2+'\').empty();">Clear</a><a class="xui-node xui-node-a xui-custom" href="javascript:;" onclick="xui(\''+self._id1+'\').remove();">✖</a></span></div><div id='+self._id2+' class="xui-node xui-node-div xui-uibase xui-dbg-content xui-custom"></div><div class="xui-node xui-node-div xui-uibase xui-dbg-tail xui-custom"><table class="xui-node xui-node-table xui-custom"><tr><td style="font-family:serif;">&nbsp;>>>&nbsp;</td><td style="width:100%"><input class="xui-node xui-node-input xui-custom" id='+self._id3+' /></td></tr></table></div></div></div>');
                xui('body').append(ns);
                self.$con=xui(self._id2);
                xui(self._id4).draggable(true,null,null,null,xui(self._id4).parent(2));

                if(xui.Dom.css3Support("boxShadow")){
                    ns.css("boxShadow","2px 2px 5px #ababab");
                }

                if(xui.browser.ie6){
                    ns.height(ns.offsetHeight());
                    ns.width(299);
                    xui.asyRun(function(){ns.width(300);})
                }
                var bak='',temp;
                xui(self._id3).onKeydown(function(p,e,s){
                    var k=xui.Event.getKey(e).key;
                    s=xui.use(s).get(0);
                    if(k=='enter'){
                        switch(s.value){
                            case '?':
                            case 'help':
                                self.$con.append(xui.create("<div class='xui-node xui-node-div xui-uibase xui-dbg-con3 xui-custom'><p class='xui-node xui-node-p xui-custom'><strong  class='xui-node xui-node-strong xui-custom'>vailable commands:</strong></p><ul  class='xui-node xui-node-ul xui-custom'><li  class='xui-node xui-node-li xui-custom'> -- <strong  class='xui-node xui-node-strong xui-custom'>[clr]</strong> or <strong>[clear]</strong> : clears the message</li><li  class='xui-node xui-node-li xui-custom'> -- <strong  class='xui-node xui-node-strong xui-custom'>[?]</strong> or <strong  class='xui-node xui-node-strong xui-custom'>[help]</strong> : shows this message</li><li  class='xui-node xui-node-li xui-custom'> -- <strong class='xui-node xui-node-strong xui-custom'>any other</strong>: shows its string representation</li></ul></div>"));
                                break;
                            case 'clr':
                            case 'clear':
                                xui(self._id2).empty();
                                break;
                            default:
                                try{
                                    temp=s.value;
                                    if(/^\s*\x7b/.test(temp))temp='('+temp+')';
                                    self.log(eval(temp));
                                }catch(e){self.$con.append(xui.create("<div  class='xui-node xui-node-div xui-uibase xui-dbg-con4 xui-custom'>"+String(e)+"</div>"));return;}
                        }
                        bak=s.value;
                        s.value='';
                    }else if(k=='up'||k=='down'){
                        var a=s.value;
                        s.value=bak||'';
                        bak=a;
                    }
                    k=s=temp=bak=null;
                });
            }
            self.$con.append(t1).scrollTop(self.$con.scrollHeight());
            t1=t2=null;
        }
    },
    Initialize:function(){
        xui.CSS.addStyleSheet(
            '.xui-dbg-frm{position:absolute;width:25em;z-index:2000;}'+
            '.xui-dbg-header{cursor:move;height:1.5em;padding-top:.25em;position:relative;border-bottom:solid 1px #CCC;background-color:#FFAB3F;font-weight:bold;}'+
            '.xui-dbg-cmds{position:absolute;right:.25em;top:.25em;}'+
            '.xui-dbg-cmds a{margin:.25em;}'+
            '.xui-dbg-box{position:relative;overflow:hidden;border:solid 1px #AAA;}'+
            '.xui-dbg-content{position:relative;width:100%;overflow:auto;height:25em;overflow-x:hidden;}'+
            '.xui-dbg-con1{background-color:#CCC;width:24.5empx;}'+
            '.xui-dbg-con2{padding-left:.5em;border-bottom:dashed 1px #CCC;width:24.5em;}'+
            '.xui-dbg-con3{padding-left:.5em;border-bottom:dashed 1px #CCC;background:#EEE;color:#0000ff;width:24.5em;}'+
            '.xui-dbg-con4{padding-left:.5em;border-bottom:dashed 1px #CCC;background:#EEE;color:#ff0000;width:24.5em;}'+
            '.xui-dbg-tail{overflow:hidden;position:relative;border-top:solid 1px #CCC;height:1.3333333333333333em;background:#fff;color:#0000ff;}'+
            '.xui-dbg-tail input{width:100%;border:0;background:transparent;}'
        ,this.KEY);
        //fix ie6:

        //shorcut
        xui.echo = function(){
            if(!xui.debugMode)return false;
            xui.Debugger.log.apply(xui.Debugger,xui.toArr(arguments));
        };
        xui.message = function(body, head, width, duration){
           width = width || 300;
           if(xui.browser.ie)width=width+(width%2);
           var div, h, me=arguments.callee,
           stack=me.stack||(me.stack=[]),
           allmsg=me.allmsg||(me.allmsg=[]),
           t=xui.win, left = t.scrollLeft() + t.width()/2 - width/2, height=t.height(), st=t.scrollTop();

           div=stack.pop();
           while(div&&!div.get(0))
                div=stack.pop();

           if(!div){
               div =
               '<div class="xui-ui-reset xui-node xui-node-div xui-wrapper xui-uibar xui-uiborder-outset xui-custom" style="border:solid 1px #cdcdcd;position:absolute;overflow:visible;top:-50px;">' +
                   '<div class="xui-node xui-node-div xui-custom" style="font-size:1.25em;overflow:hidden;font-weight:bold;padding:.25em;"></div>'+
                   '<div class="xui-node xui-node-div xui-custom" style="font-size:1em;padding:.5em;overflow:hidden;"></div>'+
               '</div>';
               div = xui.create(div);
               if(div.addBorder)div.addBorder();
               allmsg.push(div);
               if(xui.Dom.css3Support("boxShadow")){
                    div.css("boxShadow","2px 2px 5px #ababab");
               }
            }
            if(document.body.lastChild!=div.get(0))
                xui('body').append(div,false,true);

            div.topZindex(true);

            div.__hide=0;

            div.css({left:left+'px', width:width+'px', visibility:'visible'})
            .first().html(head||'').css('display',head?'':'none')
            .next().html(body||'');

            if(xui.browser.ie && xui.browser.ver<=8)
                div.ieRemedy();

            if(me.last && me.last.get(0) && div!=me.last){
                var last=me.last;
                var l=last.left();
                if(last._thread&&last._thread.id&&last._thread.isAlive())last._thread.abort();
                last._thread=last.animate({left:[l,l+(last.width+width)/2+20]},function(){
                    last.left(l);
                },function(){
                    last.left(l+(last.width+width)/2+20);
                }).start();
                
                var lh=last.offsetHeight();
               xui.filter(allmsg,function(ind){
                    if(ind.isEmpty())
                        return false;
                   if(!ind.__hide && ind!=div && ind!=last){
                       if(ind._thread.id&&ind._thread.isAlive())
                            ind._thread.abort();
                       ind.topBy(lh);
                    }
               });

            }
            me.last = div;
            me.last.width = width;

            //height() is ok
            h = div.height();

            if(xui.browser.ie6)div.cssSize({ height :h, width :width+2});

            if(div._thread&&div._thread.id&&div._thread.isAlive())div._thread.abort();
            div._thread=div.animate({top:[st-h-20,st+20]},function(){
                div.top(st-h-20);
            },function(){
                div.top(st+20);
            },300,0,'expoOut').start();

            xui.asyRun(function(){
                if(div._thread&&div._thread.id&&div._thread.isAlive())div._thread.abort();
                div._thread=div.animate({top:[div.top(), height+20]},null,function(){
                     stack.push(div); 
                     div.hide();
                     div.__hide=1;
                },300,0).start();
            }, duration||5000);
            me=null;
        };

        if(xui.isDefined(window.console) && (typeof window.console.log=="function")){
            xui.log=function(){window.console.log.apply(window.console,xui.toArr(arguments));};
        }else if(xui.debugMode){
            xui.log=xui.echo;
            window.onerror=this.err;
        }
    }
});