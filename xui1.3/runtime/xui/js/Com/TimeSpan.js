Class('xui.Com.TimeSpan', 'xui.Com',{
    Instance:{
        //target time span
        iniFrom: '',//'2008-01-16T08:00Z',
        iniTo: '',//'2008-01-16T10:00Z',

        //target timezone '+0830'
        timezone:'',

        txtOK:'OK',
        txtCancel:'Cancel',

        //task caption
        taskTitle:'time span',//'task title',
        
        showCommandPanel:true,

        //text information
        txtInfo:'',//'info',
        txtFrom:'',//'from',
        txtTo:'',//'to',
        txtTZ:'',//'timezone',

        //small time range
        timeMinUnit:'h',
        timeMinCount:0,//2,
        timeMaxUnit:'ww',
        timeMaxCount:0,//4,

        //big time range
        timeStart:'',//"2008-01-16T00:00Z",
        timeEnd:'',//"2008-01-18T00:00Z",
        
        //getUIvalue actually
        getValue:function(){
            var ns=this,
                date=xui.Date,
                v=ns.timeline.getUIValue(),
                tz=ns._timezone,
                uv=v.split(":");
            return [date.offsetTimeZone(new Date(parseInt(uv[0],10)),tz,true), date.offsetTimeZone(new Date(parseInt(uv[1],10)),tz,true)];
        },
        setValue:function(iniFrom, iniTo, force){
            var ns=this,
                timeline=ns.timeline,
                tz=ns._timezone,
                date=xui.Date,
                aj,
                key = force===false?'setUIValue':'setValue';
            //set min/max time range first
            if(ns.timeEnd)
                ns._timeEnd = date.offsetTimeZone(date.parse(ns.timeEnd), tz);
            if(ns.timeStart)
                ns._timeStart = date.offsetTimeZone(date.parse(ns.timeStart), tz);
            //adjust time here
            aj = ns._adjustTime(iniFrom, iniTo);
            iniFrom=aj[1];
            iniTo=aj[2];

            var a=date.offsetTimeZone(iniFrom, tz),
                b=date.offsetTimeZone(iniTo, tz);

                if(a && b && !self.$lock){
                    self.$lock=1;

                    if(ns._timeEnd)
                        timeline.setMaxDate(ns._timeEnd);
                    if(ns._timeStart)
                        timeline.setMinDate(ns._timeStart);

                    timeline[key](a.getTime()+":"+b.getTime(),true);

                    ns.dateFrom[key](date.getTimSpanStart(a,'d').getTime(),true);
                    ns.dateTo[key](date.getTimSpanStart(b,'d').getTime(),true);
                    ns.timeFrom[key](date.get(a,'h')+':'+date.get(a,'n'), true);
                    ns.timeTo[key](date.get(b,'h')+':'+date.get(b,'n'), true);
                    
                    timeline.visibleTask();

                    self.$lock=0;
                }
        },
        setTimezone:function(tz){
            var ns=this,
                date=xui.Date,
                uv=ns.timeline.getUIValue(),
                a,b,
                old=ns._timezone;
            ns._timezone=ns._getTimezone(ns.timezone=tz);
            if(uv){
                uv=uv.split(':');
                ns.setValue(date.offsetTimeZone(new Date(parseInt(uv[0],10)),old,true), date.offsetTimeZone(new Date(parseInt(uv[1],10)),old,true), false);
            }
        },
        events:{
            onReady:"_on",
            afterIniComponents:'_ai'
        },
        refreshUI:function(){
            this._ai();
            this._on();
        },
        _ai:function(){
            _.tryF(this.onIniTimeLine,[this.timeline],this);
        },
        _on:function(){
            var ns=this,
                date=xui.Date,t,a,b,reg=/\./g,
                wrap=function(s){return xui.wrapRes('date.TIMEZONE.'+s)};
            ns.divFrom.setHtml(ns.txtFrom);
            ns.divTo.setHtml(ns.txtTo);
            if(!ns.showCommandPanel)
                ns.panelCmd.setDisplay('none');
            if(ns.txtInfo)
                ns.divInfo.setDisplay('').setHtml(ns.txtInfo);
            ns.divTZ.setHtml(ns.txtTZ);

            ns.timeline.setDftTaskName(ns.taskTitle);
            ns.cmdOK.setCaption(ns.txtOK);
            ns.cmdCancel.setCaption(ns.txtCancel);

            ns.cbiTZ.setValue(ns.timezone,true);
            //ini timezone
            ns._timezone=ns._getTimezone(ns.timezone);

            if(ns.iniFrom && ns.iniTo)
                ns.setValue(date.parse(ns.iniFrom), date.parse(ns.iniTo));

            t=[];
            _.arr.each(date.$TIMEZONE,function(o,i){
                a=null;
                if(o.sub){
                    a=[];
                    _.arr.each(o.sub,function(v,j){
                        a[a.length]={id:j, value:v.v, caption: (v.v?v.v+' -- ':'') + wrap(v.id.replace(reg,'_'))};
                    })
                }
                t[t.length]={id:i, caption: wrap(o.id),sub:a};
            });
            ns.tzpop.setItems(t);
            if(!ns.timezone)
                ns.timezone=(function(){
                    var d=((new Date).getTimezoneOffset()/60),
                        i=parseInt(d,10),
                        v=Math.abs(i)!==i,
                        j=(d-i)*60;
                    i=Math.abs(i);
                    return (v?'+':'-') + (i<=9?'0'+i:i) + (j<9?'0'+j:j);
                })();
        },
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.PopMenu)
                .setHost(host,"tzpop")
                .setItems([])
                .onMenuSelected("_pop")
            );
            
            append((new xui.UI.Pane)
                .setHost(host,"panelMain")
                .setWidth(410)
                .setHeight('auto')
                .setCustomStyle({"KEY":"padding-top:5px;"})
            );
            
            host.panelMain.append((new xui.UI.Div)
                .setHost(host,"divInfo")
                .setWidth(390)
                .setHeight(30)
                .setDisplay('none')
                .setPosition("relative")
                .setCustomStyle({KEY:'text-align:center;font-weight:bold;'})
            );
            
            host.panelMain.append((new xui.UI.TimeLine)
                .setHost(host,"timeline")
                .setHeight(130)
                .setWidth(390)
                .setPosition("relative")
                .setTabindex("2")
                .setLeft(10)
                .beforeUIValueSet("_5")
            );
            
            host.panelMain.append((new xui.UI.Pane)
                .setHost(host,"panel61")
                .setWidth(400)
                .setHeight(61)
                .setTabindex("4")
                .setPosition("relative")
            );
            
            host.panel61.append((new xui.UI.ComboInput)
                .setHost(host,"cbiTZ")
                .setItems([])
                .setType("popbox")
                .setLeft(60)
                .setTop(30)
                .setWidth(340)
                .beforeComboPop("_clc")
            );
            
            host.panel61.append((new xui.UI.ComboInput)
                .setHost(host,"timeFrom")
                .setLeft(166)
                .setTop(4)
                .setWidth(48)
                .setItems([])
                .setType("time")
                .beforeUIValueSet("_3")
            );
            
            host.panel61.append((new xui.UI.ComboInput)
                .setHost(host,"dateFrom")
                .setLeft(61)
                .setTop(4)
                .setItems([])
                .setType("date")
                .setWidth(104)
                .beforeUIValueSet("_4")
            );
            
            host.panel61.append((new xui.UI.Div)
                .setHost(host,"divFrom")
                .setLeft(4)
                .setTop(7)
                .setWidth(53)
                .setHeight(16)
                .setCustomStyle({"KEY":"text-align:right"})
            );
            
            host.panel61.append((new xui.UI.ComboInput)
                .setHost(host,"timeTo")
                .setLeft(352)
                .setTop(4)
                .setWidth(48)
                .setItems([])
                .setType("time")
                .beforeUIValueSet("_1")
            );
            
            host.panel61.append((new xui.UI.ComboInput)
                .setHost(host,"dateTo")
                .setLeft(247)
                .setTop(4)
                .setItems([])
                .setType("date")
                .setWidth(104)
                .beforeUIValueSet("_2")
            );
            
            host.panel61.append((new xui.UI.Div)
                .setHost(host,"divTo")
                .setLeft(217)
                .setTop(7)
                .setWidth(28)
                .setHeight(16)
                .setCustomStyle({"KEY":"text-align:right"})
            );
            
            host.panel61.append((new xui.UI.Div)
                .setHost(host,"divTZ")
                .setLeft(4)
                .setTop(34)
                .setWidth(53)
                .setHeight(16)
                .setCustomStyle({"KEY":"text-align:right"})
            );
            
            host.panelMain.append((new xui.UI.Pane)
                .setHost(host,"panelCmd")
                .setWidth(400)
                .setHeight(30)
                .setTabindex("5")
                .setPosition("relative")
            );
            
            host.panelCmd.append((new xui.UI.Button)
                .setHost(host,"cmdCancel")
                .setLeft(50)
                .setTop(5)
                .setCaption("cmdCancel")
                .onClick("_cancel")
            );
            
            host.panelCmd.append((new xui.UI.Button)
                .setHost(host,"cmdOK")
                .setLeft(250)
                .setTop(5)
                .setCaption("cmdOK")
                .onClick("_ok")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _getTimezone:function(s) {
           var sign,hh,mm;
           sign = s.substr(0,1)=='-'?-1:1;
           hh = Math.floor(s.substr(1,2));
           mm = Math.floor(s.substr(3,2));
           return sign*(hh+mm/60);
        },
        _update1:function(dateFrom, dateTo){
            var self=this;
            var date=xui.Date,
                rd = date.getTimSpanStart(dateFrom,'d'),
                h = date.get(dateFrom,'h'),
                n = date.get(dateFrom,'n');
            self.dateFrom.setUIValue(String(rd.getTime()), true);
            self.timeFrom.setUIValue(h+':'+n, true);

            rd = date.getTimSpanStart(dateTo,'d');
            h = date.get(dateTo,'h');
            n = date.get(dateTo,'n');
            self.dateTo.setUIValue(String(rd.getTime()), true);
            self.timeTo.setUIValue(h+':'+n, true);
        },
        _update2:function(dateFrom, dateTo){
            var self=this;
            var df=dateFrom.getTime(),
                dt=dateTo.getTime();
            self.timeline.setUIValue(df+":"+dt);
        },
        _adjustTime:function(dateFrom,dateTo){
            var self=this,
                date=xui.Date,
                adjust,
                fixEnd,
                t
                ;
            if(self.timeStart && dateFrom>self._timeEnd)
                dateTo=dateFrom
            if(self.timeEnd && dateTo<self._timeStart)
                dateFrom=dateTo;

            if(self.timeStart && dateFrom<self._timeStart){
                adjust=1;
                dateFrom=self._timeStart;
            }
            if(self.timeEnd && dateTo>self._timeEnd){
                fixEnd=adjust=1;
                dateTo=self._timeEnd;
            }
            if(self.timeMinCount && (t=date.add(dateFrom, self.timeMinUnit, self.timeMinCount))>dateTo){
                adjust=1;
                if(fixEnd)
                    dateFrom = date.add(dateTo, self.timeMinUnit, -self.timeMinCount);
                else
                    dateTo = t;
            }
            if(self.timeMaxCount && (t=date.add(dateFrom, self.timeMaxUnit, self.timeMaxCount))<dateTo){
                adjust=1;
                dateTo = t;
            }
            return [adjust,dateFrom,dateTo];
        },
        _change1:function(newValue){
            var self=this,
                date=xui.Date,
                a=newValue.split(':'),
                dateFrom=new Date(parseInt(a[0],10)),
                dateTo=new Date(parseInt(a[1],10)),
                df,dt,
                r,
                arr = self._adjustTime(dateFrom,dateTo);

                if(arr[0]){
                    self._update2(arr[1],arr[2]);
                    r=false;
                }
                self._update1(arr[1], arr[2]);
                return r;

        },
        _change2:function(dateFrom,dateTo,timeFrom,timeTo){
            var self=this,r;
            if(!dateFrom)dateFrom=new Date(parseInt(self.dateFrom.getUIValue(),10));
            if(!dateTo)dateTo=new Date(parseInt(self.dateTo.getUIValue(),10));
            if(!timeFrom)timeFrom=self.timeFrom.getUIValue().split(':');
            if(!timeTo)timeTo=self.timeTo.getUIValue().split(':');
            //if set manully, all need
            if(!dateFrom || !dateTo || timeFrom.length<2 || timeTo.length<2)return;

            dateFrom.setHours(timeFrom[0]||0);
            dateFrom.setMinutes(timeFrom[1]||0);
            dateTo.setHours(timeTo[0]||0);
            dateTo.setMinutes(timeTo[1]||0);
            var arr=self._adjustTime(dateFrom, dateTo);
            if(arr[0]){
                self._update1(arr[1],arr[2]);
                r=false;
            }
            self._update2(arr[1],arr[2]);
            self.timeline.visibleTask();
            return r;
        },
        _ok:function(){
            _.tryF(this.onOK,[],this);
        },
        _cancel:function(){
            _.tryF(this.onCancel,[],this);
        },
        _5:function (profile, oldValue, newValue) {
            var self=this,r
            if(!self.$lock){
                self.$lock=1;
                r=self._change1(newValue);
                self.$lock=0;
                return r;
            }
        },
        _4:function (profile, oldValue, newValue) {
            var self=this,r;
            if(!self.$lock){
                self.$lock=1;
                r=self._change2(new Date(parseInt(newValue,10)));
                self.$lock=0;
                return r;
            }
        },
        _3:function (profile, oldValue, newValue) {
            var self=this,r;
            if(!self.$lock){
                self.$lock=1;
                r=self._change2(null,null,newValue.split(':'),null);
                self.$lock=0;
                return r;
            }
        },
        _2:function (profile, oldValue, newValue) {
            var self=this,r;
            if(!self.$lock){
                self.$lock=1;
                r=self._change2(null,new Date(parseInt(newValue,10)));
                self.$lock=0;
                return r;
            }
        },
        _1:function (profile, oldValue, newValue) {
            var self=this,r;
            if(!self.$lock){
                self.$lock=1;
                r=self._change2(null,null,null,newValue.split(':'));
                self.$lock=0;
                return r;
            }
        },
        _pop:function (profile, item, src) {
            this.setTimezone(item.value);
            this.cbiTZ.setValue(item.caption.replace(/\<[^>]*\>/g,''),true);
        },
        _clc:function(profile, pos){
            this.tzpop.pop(profile.getSubNode('BTN'));
            return false;
        }
    }
});