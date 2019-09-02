/*
xui.UI.FusionChartsXT is a CrossUI wrap for FusionChartsXT(www.FusionCharts.com), it is NOT part of Crossui products
If you use this widget in commercial projects, please purchase it separately
*/
xui.Class("xui.UI.FusionChartsXT","xui.UI",{
    Initialize:function(){
        // for fusioncharts in IE<=7
        if(!window.JSON)window.JSON={
            parse:function(a){return xui.unserialize(a)},
            stringify:function(a){return xui.stringify(a)}
        };
    },
    Instance:{
        initialize:function(){
        },
        refreshChart:function(dataFormat){
            return this.each(function(prf){
                if(!prf || !prf.box)return;
                prf.boxing().busy(false,'');
                if(prf.renderId){
                    var fun=function(){
                        if(!prf || !prf.box)return;
                        var prop=prf.properties,t;
                        if(prf._chartId && (t=FusionCharts(prf._chartId))){
                            // dispose
                            t.dispose();
                            // clear node
                            prf.getSubNode('BOX').html("",false);
                        }

                        // new one
                        var fc=new FusionCharts(
                                prop.chartType, 
                                prf._chartId, 
                                prf.$isEm(prop.width)?prf.$em2px(prop.width):prop.width, 
                                prf.$isEm(prop.height)?prf.$em2px(prop.height):prop.height
                        ),
                         flag;
                        
                        switch(dataFormat){
                            case 'XMLUrl':
                                var xml=xui.getFileSync(prop.XMLUrl);
                                if(xml)fc.setXMLData(xml);
                            break;
                            case 'JSONUrl':
                                var json=xui.getFileSync(prop.JSONUrl);
                                if(json)fc.setJSONData(json);
                            break;
                            case 'XMLData':
                                fc.setXMLData(prop.XMLData);
                            break;
                            default:
                                if(prop.XMLUrl){
                                    var xml=xui.getFileSync(prop.XMLUrl);
                                    if(xml)fc.setXMLData(xml);
                                }else if(prop.JSONUrl){
                                    var json=xui.getFileSync(prop.JSONUrl);
                                    if(json)fc.setJSONData(json);
                                }else if(prop.XMLData){
                                    fc.setXMLData(prop.XMLData);
                                }else if(!xui.isEmpty(prop.JSONData)){
                                    flag=1;
                                    fc.setJSONData(prf.box._prepareFCData(prf,prop.JSONData));
                                }
                        }
                        // ensure cursor pointer
                        if(!flag){
                            fc.setJSONData(prf.box._prepareFCData(prf,fc.getJSONData()));
                        }
                        fc.setTransparent(true);
                        fc.render(prf.getSubNode('BOX').id());
                        // attachEvents
                        var t=FusionCharts(prf._chartId),
                            f1=function(a,argsMap){
                                if(prf.onDataClick)prf.boxing().onDataClick(prf,argsMap);
                            },f2=function(a,argsMap){
                                if(prf.onLabelClick)prf.boxing().onLabelClick(prf,argsMap);
                            },f3=function(a,argsMap){
                                if(prf.onAnnotationClick)prf.boxing().onAnnotationClick(prf,argsMap);
                            };

                        if(prf._f1)t.removeEventListener("dataplotClick",prf._f1);
                        if(prf._f2)t.removeEventListener("dataLabelClick",prf._f2);
                        if(prf._f3)t.removeEventListener("annotationClick",prf._f3);
                        
                        t.addEventListener("dataplotClick",prf._f1=f1);
                        t.addEventListener("dataLabelClick",prf._f2=f1);
                        t.addEventListener("annotationClick",prf._f3=f1);

                        prf.boxing().free();
                    };
                    xui.resetRun('xui.UI.FusionChartsXT:'+prf.$xid,fun, 200);
                }
            });
        },
        setTransparent:function(isTransparent){
           return this.each(function(prf){
               var t;
               xui.set(prf.properties,["JSONData","chart","bgalpha"], isTransparent?"0,0":"");
               if(prf.renderId && prf._chartId && (t=FusionCharts(prf._chartId))){
                   t.setTransparent(isTransparent);
               }
           });
        },
        getChartAttribute:function(key){
            var prf=this.get(0);
            return xui.isStr(key)?xui.get(prf.properties,["JSONData","chart",key]):xui.get(prf.properties,["JSONData","chart"]);
        },
        setChartAttribute:function(key,value){
            var h={};
            if(xui.isStr(key)){
                h[key]=value;
            }else h=key;
                
            return this.each(function(prf){
                var t;
                if(prf.renderId && prf._chartId && (t=FusionCharts(prf._chartId))){
                    t.setChartAttribute(h);
                    // refresh memory in xui from real
                    xui.set(prf.properties,["JSONData","chart"], t.getChartAttribute());
                }else{
                    // reset memory in xui only 
                    var opt=xui.get(prf.properties,["JSONData","chart"]);
                    if(opt)xui.merge(opt, h, 'all');
                }
            });
        },
        getFCObject:function(){
            var prf=this.get(0);
            return prf.renderId && prf._chartId && FusionCharts(prf._chartId);
        },
        getSVGString:function(){
            var prf=this.get(0), o=prf.renderId && prf._chartId && FusionCharts(prf._chartId);
            return o?o.getSVGString():null;
        },
        fillData:function(data,index,isLineset){
            this.each(function(prf){
                var JSONData=prf.properties.JSONData;
                data=xui.clone(data);
                if(xui.isArr(data) && xui.isArr(data[0])){
                    if(isLineset){
                        JSONData.lineset=data;
                    }else{
                        if('dataset' in JSONData){
                            JSONData.dataset=data;
                        }else{
                            JSONData.data=data[0];
                        }
                    }
                }else{
                    if(isLineset){
                        if('lineset' in JSONData){
                            xui.set(JSONData,["lineset",index||0,"data"],data);
                        }
                    }else{
                        if('dataset' in JSONData){
                            xui.set(JSONData,["dataset",index||0,"data"],data);
                        }else{
                            JSONData.data=data;
                        }
                    }
                }
            });
            return this.refreshChart();
        },
        updateData:function(index, value){
            return this.each(function(prf){
                 if(prf.renderId && prf._chartId && (t=FusionCharts(prf._chartId))){
                        if(t.setData)
                            t.setData(index, value);
                }
            });
        },
        updateDataById:function(key, value){
            return this.each(function(prf){
                 if(prf.renderId && prf._chartId && (t=FusionCharts(prf._chartId)))
                        if(t.setDataForId)
                            t.setDataForId(key, value);
            });
        },
        callFC:function(funName, params){
            var fc;
            if((fc=this.getFCObject())&&xui.isFun(fc[funName]))
                return fc[funName].apply(fc, params||[]);
        },
        configure:function(options){
            var prf=this.get(0),t;
            if(prf.renderId && prf._chartId && (t=FusionCharts(prf._chartId))){
                t.configure(options);
            }
        },
        setTheme:function(theme){
            if(typeof theme!="string" || !theme)theme=null;
            this.each(function(o){
                if(theme!=o.theme){
                    if(theme===null)
                        delete o.theme;
                    else
                        o.theme=theme;
                }
            });
            return this.setChartAttribute("theme",theme);
        }
    },
    Static:{
        _objectProp:{JSONData:1,configure:1,plotData:1,feedData:1},
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
            chartCDN:"https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js",
            chartType:{
                ini:"Column2D",
                //Single Series Charts
                listbox:["Column2D","Column3D","Line","Area2D","Bar2D","Bar3D","Pie2D","Pie3D","Doughnut2D","Doughnut3D","Pareto2D","Pareto3D",
                //Multi-series
                         "MSColumn2D","MSColumn3D","MSLine","MSBar2D","MSBar3D","MSArea","Marimekko","ZoomLine",
                //Stacked 
                         "StackedColumn3D","StackedColumn2D","StackedBar2D","StackedBar3D","StackedArea2D","MSStackedColumn2D",
                //Combination 
                         "MSCombi3D","MSCombi2D","MSColumnLine3D","StackedColumn2DLine","StackedColumn3DLine","MSCombiDY2D","MSColumn3DLineDY","StackedColumn3DLineDY","MSStackedColumn2DLineDY",
                //XYPlot
                         "Scatter","Bubble",
                //Scroll
                         "ScrollColumn2D","ScrollLine2D","ScrollArea2D","ScrollStackedColumn2D","ScrollCombi2D","ScrollCombiDY2D",
                // funnel
                        "Funnel",
               // real time
                        "RealTimeLine", "RealTimeArea", "RealTimeColumn", "RealTimeLineDY", "RealTimeStackedArea", "RealTimeStackedColumn",
               // Gauges
                        "HLinearGauge","Cylinder","HLED","VLED","Thermometer","AngularGauge",
               // others
                        "Pyramid ","Radar"//,"MultiLevelPie"
                ],
                action:function(){
                    if(this.renderId){
                        this.boxing().refreshChart();
                    }
                }
            },
            JSONData:{
                ini:{},
                get:function(){
                    var prf=this,prop=prf.properties,fc;
                    if(!xui.isEmpty(prop.JSONData))
                        return prop.JSONData;
                    else if(fc=prf.boxing().getFCObject())
                        return prf.box._cleanData(prf,fc.getJSONData());
                },
                set:function(data){
                    var prf=this,prop=prf.properties;
                    if(xui.isStr(data))data=xui.unserialize(data);
                    if(data){
                        prop.XMLData=prop.XMLUrl=prop.JSONUrl="";
                        prop.JSONData=xui.clone(data);

                        if(prf.renderId){
                            prf.boxing().refreshChart('JSONData');
                        }
                    }
                }
            },
            XMLUrl:{
                ini:"",
                set:function(url){
                    var prf=this,prop=prf.properties;

                    prop.XMLUrl=url;
                    prop.JSONUrl=prop.XMLData="";
                    prop.JSONData={};

                    if(prf.renderId){
                        prf.boxing().refreshChart('XMLUrl');
                    }
                }
            },
            XMLData:{
                ini:"",
                get:function(force){
                    var prf=this,prop=prf.properties,fc;
                    if(prop.XMLData)
                        return prop.XMLData;
                    else if(fc=prf.boxing().getFCObject())
                        return fc.getXMLData();
                },
                set:function(url){
                    var prf=this,prop=prf.properties;

                    prop.XMLData=url;
                    prop.XMLUrl=prop.JSONUrl="";
                    prop.JSONData={};

                    if(prf.renderId){
                        prf.boxing().refreshChart('XMLData');
                    }
                }
            },
            JSONUrl :{
                ini:"",
                set:function(url){
                    var prf=this,prop=prf.properties;

                    prop.JSONUrl=url;
                    prop.XMLUrl=prop.XMLData="";
                    prop.JSONData={};

                    if(prf.renderId){
                        prf.boxing().refreshChart('JSONUrl');
                    }
                }
            },
            plotData:{
                ini:{},
                get:function(data){
                    var data=this.properties.JSONData;
                    return data.dataset||data.data||{};
                },
                set:function(data){
                    var JSONData=this.properties.JSONData;
                    if(('dataset' in JSONData) || (xui.isArr(data) && xui.isArr(data[0])) )
                        JSONData.dataset=xui.clone(data);
                    else
                        JSONData.data=xui.clone(data);

                    var bak=JSONData.chart.animation;
                    JSONData.chart.animation='0';
                     this.boxing().refreshChart();
                     if(bak)JSONData.chart.animation=bak;else delete JSONData.chart.animation;
                     return this;
                }
            },
            feedData:{
                ini:"",
                set:function(data){
                    var prf=this,t;
                     if(prf.renderId && prf._chartId && (t=FusionCharts(prf._chartId)) && t.feedData){
                        if(xui.isFinite(data))data="value="+data;
                        t.feedData(data||"");
                    }
                }
            }
        },
        _cleanData:function(prf,data){
            var hoder="Javascript:void(0)";
            if(data.dataset){
                xui.arr.each(data.dataset,function(o,i){
                    xui.arr.each(o.dataset,function(v,j){
                        xui.arr.each(v.data,function(w,k){
                            if(w.link==hoder)delete w.link;
                        });
                    });
                    xui.arr.each(o.data,function(v,j){
                        if(v.link==hoder)delete v.link;
                    });
                });
            }else if(data.data){
                xui.arr.each(data.data,function(o,i){
                    if(o.link==hoder)delete o.link;
                    if(o.labelLink==hoder)delete o.labelLink;
                });                
            }
            if(data.categories){
                xui.arr.each(data.categories,function(o,i){
                    xui.arr.each(o.category,function(v,j){
                       if(v.link==hoder)delete v.link;
                    });
                });
            }
            return data;
        },
        _prepareFCData:function(prf, data){
            var id=prf.$xid;
                data=xui.clone(data),
                hoder="Javascript:void(0)";
            //show cursor as pointer
            if(data.dataset){
                xui.arr.each(data.dataset,function(o,i){
                    xui.arr.each(o.dataset,function(v,j){
                        xui.arr.each(v.data,function(w,k){
                            if(!w.link)w.link=hoder;
                        });
                    });
                    xui.arr.each(o.data,function(v,j){
                       if(!v.link)v.link=hoder;
                    });
                });
            }else if(data.data){
                xui.arr.each(data.data,function(o,i){
                    if(!o.link)o.link=hoder;
                    if(!o.labelLink)o.labelLink=hoder;
                });                
            }
            if(data.categories){
                xui.arr.each(data.categories,function(o,i){
                    xui.arr.each(o.category,function(v,j){
                       if(!v.link)v.link=hoder;
                    });
                });
            }
            return data;
        },
        RenderTrigger:function(){
            var prf=this,prop=prf.properties;
            var fun=function(){
                if(!prf || !prf.box)return;

                // give chart dom id
                prf._chartId="FC_"+prf.properties.chartType+"_"+prf.$xid;

                if(!xui.isEmpty(prf.properties.configure)){
                    prf.boxing().setConfigure(prf.properties.configure, true);
                }
                if(prf.theme)
                    prf.boxing().setTheme(prf.theme);
                // render it
                prf.boxing().refreshChart();
                
                // set before destroy function
                (prf.$beforeDestroy=(prf.$beforeDestroy||{}))["unsubscribe"]=function(){
                    var t;
                    if(this._chartId && (t=FusionCharts(this._chartId))){
                        t.removeEventListener("dataplotClick",prf._f1);
                        t.removeEventListener("dataLabelClick",prf._f2);
                        t.removeEventListener("annotationClick",prf._f3);
                        prf._f1=prf._f2=prf._f3=null;
                        t.dispose();
                    }
                }
            };

            if(window.FusionCharts)fun();
            else{
                prf.boxing().busy(false, "Loading charts ...");
                xui.include("FusionCharts",prop.chartCDN,function(){
                    if(prf && prf.box){
                        prf.boxing().free();
                        fun();
                    }
                },null,false,{cache:true});
            }
        },
        EventHandlers:{
            onFusionChartsEvent:function(profile, eventObject, argumentsObject){},
            onDataClick:function(profile, argsMap){},
            onLabelClick:function(profile, argsMap){},
            onAnnotationClick:function(profile, argsMap){},
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
                if(prf.renderId && prf._chartId && (t=FusionCharts(prf._chartId))){
                    // ensure by px
                    t.resizeTo(ww||void 0, hh||void 0);
                }
            }
        }
    }
});