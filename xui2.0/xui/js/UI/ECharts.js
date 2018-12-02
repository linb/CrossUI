xui.Class("xui.UI.ECharts","xui.UI",{
    Initialize:function(){
/*
        var dataModals={};
        for(var i=0;i<9;i++){
            dataModals["seriesData"+(i+1)]={
                ini:null,
                dynamic:true,
                get:(function(index){
                    return function(v){
                        v=this.properties.optionUpdater["series.0.data."+index];
                        return v?xui.stringify(v):"";
                    }
                })(i),
                set:(function(index){
                    return function(v){
                        var p=this.properties;
                        v=v&&typeof(v)=="string"?xui.unserialize(v):v;
                        if(v)p.optionUpdater["series.0.data."+index]=v;
                        else delete p.optionUpdater["series.0.data."+index];
                        this.boxing().setoptionUpdater(p.optionUpdater,true);
                    }
                })(i)
            };
            dataModals["datasetSource"+(i+1)]={
                ini:null,
                dynamic:true,
                get:(function(index){
                    return function(v){
                        v=this.properties.optionUpdater["dataset.source."+index];
                        return v?xui.stringify(v):"";
                    }
                })(i),
                set:(function(index){
                    return function(v){
                        var p=this.properties;
                        v=v&&typeof(v)=="string"?xui.unserialize(v):v;
                        if(v)p.optionUpdater["dataset.source."+index]=v;
                        else delete p.optionUpdater["dataset.source."+index];
                        this.boxing().setoptionUpdater(p.optionUpdater,true);
                    }
                })(i)
            };
        }
        this.setDataModel(dataModals);
*/
    },
    Instance:{
        _reBindProp:function(prf, hash, key){
            var ins=prf.boxing(),fn,nhash={};
            if(key=="optionUpdater" && xui.isHash(hash)){
                for(var i in hash)
                    nhash[i] =  xui.isFun(hash[i])?hash[i](prf):xui.adjustVar(hash[i]);
                if(xui.isFun(ins[fn='set'+xui.str.initial(key)])) ins[fn](nhash,true);
                return false;
            }
        },
        getECharts:function(){
            return this.get(0) && this.get(0).$echarts;
        },
        optionAdapter:function(option){
            return option;
        },
        echarts_call:function(funName,params){
            var echarts = this.getECharts();
            if(echarts && echarts[funName]){
                return echarts[funName].apply(echarts,params||[]);
            }
        },
        echarts_dispatchAction:function(payload){
            return this.echarts_call("dispatchAction",[payload]);
        },
        echarts_showLoading:function(type, opts){
            return this.echarts_call("showLoading",[type, opts]);
        },
        echarts_hideLoading:function(){
            return this.echarts_call("hideLoading");
        },
        echarts_getOptoin:function(){
            return this.echarts_call("getOptoin",[]);
        },
        echarts_setOptoin:function(opts){
            return this.echarts_call("setOptoin",[opts]);
        },
        echarts_getDataURL:function(opts){
            return this.echarts_call("getDataURL",[opts]);
        },
        echarts_getConnectedDataURL:function(opts){
            return this.echarts_call("getConnectedDataURL",[opts]);
        },
        echarts_appendData:function(opts){
            return this.echarts_call("appendData",[opts]);
        },
        echarts_clear:function(){
            return this.echarts_call("clear");
        },
        echarts_isDisposed:function(){
            return !this.get(0) || !this.get(0).$echarts || this.echarts_call("isDisposed");
        }
    },
    Static:{
        _objectProp:{chartOption:1,optionUpdater:1,dataset:1},
        Appearances:{
            KEY:{
                overflow:'hidden'
            },
            BOX:{
                position:'absolute',
                left:0,
                top:0,
                'z-index':1
            },
            COVER:{
                position:'absolute',
                left:'-1px',
                top:'-1px',
                width:0,
                height:0,
                'z-index':4
            }
        },
        Templates:{
            tagName:'div',
            className:'{_className}',
            style:'{_style}',
            BOX:{
                tagName:'div'
            },
            COVER:{
                tagName:'div',
                style:"background-image:url("+xui.ini.img_bg+");"
            }
        },
        Behaviors:{
            HotKeyAllowed:false
        },
        DataModel:{
            tabindex:null,
            defaultFocus:null,
            disableClickEffect:null,
            disableHoverEffect:null,
            disableTips:null,
            disabled:null,
            renderer:null,
            selectable:null,
            tips:null,
            width:{
                $spaceunit:1,
                ini:'30em'
            },
            height:{
                $spaceunit:1,
                ini:'25em'
            },
            chartCDN:"http://echarts.baidu.com/dist/echarts.min.js",
            chartCDNGL:"http://echarts.baidu.com/dist/echarts-gl.min.js",
            chartTheme:{
                ini:"",
                action: function(v){
                    this.boxing().refresh();
                }
            },
            chartRenderer:{
                ini:"canvas",
                listbox:['','canvas','svg'],
                action: function(v){
                    this.boxing().refresh();
                }
            },
            chartDevicePixelRatio:{
                ini:window.devicePixelRatio,
                action: function(v){
                    this.boxing().refresh();
                }
            },
            chartResizeSilent:false,
            chartOption:{
                ini:{},
                action: function(v){
                    var prf=this, ins=prf.boxing(),prop = prf.properties;
                    if(!ins.echarts_isDisposed() && prf.$echarts){
                        var option = xui.isFun(v.getOption)?v.getOption():v,
                            binder = prop.optionUpdater;
                        for(var i in binder){
                            xui.set(option, i.split('.'), binder[i]);
                        }
                        if((v=prop.tagVar.optionAdapter) && xui.isFun(v))option=v.call(ins, option,prf);
                        if((v=ins.optionAdapter) && xui.isFun(v))option=v.call(ins, option,prf);
                        if(ins.beforeSetOption && false===ins.beforeSetOption(prf, option)){}else{
                            prf.$echarts.setOption(option);
                        }
                    }
                }
            },
            optionUpdater:{
                ini:{},
                action:function(v){
                    var prf=this;
                    xui.resetRun("echart-data-setting:" + prf.xid, function(){
                        if(prf&&prf.box)prf.boxing().setChartOption(prf.properties.chartOption, true);
                    });
                }
            },
            dataset:{
                ini:[],
                get:function(){
                    var v = this.properties.optionUpdater.dataset;
                    if(!v)v=[];
                    if(xui.isHash(v))v=[v];
                    return v;
                },
                set:function(v){
                    var o=this.properties.optionUpdater;
                    if(!v || !xui.isArr(v) || v.length===0){
                        delete o.dataset;
                    } else {
                        o.dataset=v;
                    }
                    return this.boxing().setOptionUpdater(o, true);
                }
            }
        },
        RenderTrigger:function(){
            var prf=this,prop=prf.properties;
            prf.boxing().busy(false, "Loading charts ...");
            var fun=function(){
                if(!prf || !prf.box)return;

                prf.boxing().free();
                
                var opts = {
                    width:prf.$px(prop.width),
                    height:prf.$px(prop.height)
                };
                if(prop.chartRenderer!="canvas")opts.chartRenderer=prop.chartRenderer;
                if(prop.chartDevicePixelRatio!=window.devicePixelRatio)opts.chartDevicePixelRatio=prop.chartDevicePixelRatio;

                var chart = echarts.init(prf.getSubNode("BOX").get(0), prop.chartTheme, opts);
                prf.$echarts = chart;
                prf.boxing().setChartOption(prop.chartOption, true);
                var evts1="click,dblclick,mousedown,mouseup,mouseover,mouseout,globalout,contextmenu".split(",");
                if(prf.onMouseEvent)
                    xui.arr.each(evts1,function(name){
                        chart.on(name, function(params){
                            if(prf && prf.onMouseEvent)prf.onMouseEvent(prf, name, params);
                        });
                    });
                
                var evts2="legendselectchanged,legendunselected,legendscroll,datazoom,datarangeselected,timelinechanged,timelineplaychanged,restore,dataviewchanged,magictypechanged,geoselectchanged,geoselected,geounselected,pieselectchanged,pieselected,pieunselected,mapselectchanged,mapselected,mapunselected,axisareaselected,focusnodeadjacency,unfocusnodeadjacency,brush,brushselected,rendered,finished".split(",");
                if(prf.onChartEvent)
                    xui.arr.each(evts2,function(name){
                         chart.on(name, function(params){
                            if(prf && prf.onChartEvent)prf.onChartEvent(prf, name, params);
                        });
                    });

                // set before destroy function
                (prf.$beforeDestroy=(prf.$beforeDestroy||{}))["destroyechart"]=function(){
                    var t=this.$echarts;
                    if(t){
                        xui.arr.each(evts1,function(name){t.off(name);});
                        xui.arr.each(evts2,function(name){t.off(name);});
                        t.dispose();
                        delete this.$echarts;
                    }
                }
            };
            if(window.echarts)fun();
            else{
                var gl=prop.chartCDNGL;
                xui.include("echarts",prop.chartCDN,function(){
                    if(gl) xui.include("",gl,function(){
                        if(prf && prf.box) fun();
                    },null,false,{cache:true});
                },null,false,{cache:true});
            }
        },
        EventHandlers:{
            onMouseEvent:function(profile, eventName, eventParams){},
            onChartEvent:function(profile, eventName, eventParams){},
            onShowTips:null
        },
        _onresize:function(prf,width,height){
            var size = prf.getSubNode('BOX').cssSize(),
                prop=prf.properties,
                // compare with px
                us = xui.$us(prf),
                adjustunit = function(v,emRate){return prf.$forceu(v, us>0?'em':'px', emRate)},
                root = prf.getRoot(),
                
                // caculate by px
                ww=width?prf.$px(width):width, 
                hh=height?prf.$px(height):height,
                t;

            if( (width && !xui.compareNumber(size.width,ww,6)) || (height && !xui.compareNumber(size.height,hh,6)) ){
                // reset here
                if(width)prop.width=adjustunit(ww);
                if(height)prop.height=adjustunit(hh);

                size={
                    width:width?prop.width:null,
                    height:height?prop.height:null
                };
                prf.getSubNode('BOX').cssSize(size,true);
                if(prf.$inDesign || prop.cover){
                    prf.getSubNode('COVER').cssSize(size,true);
                }
                if(prf.renderId && (t=prf.$echarts)){
                    // ensure by px
                    t.resize({width:ww, height:hh,silent:prop.chartResizeSilent});
                }
            }
        }
    }
});