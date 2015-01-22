Class("xui.UI.FusionChartsXT","xui.UI",{
    Initialize:function(){
        var ns=this;
        FusionCharts.addEventListener(["beforeRender","renderCancelled","beforeResize","resized","resizeCancelled","beforeDispose","disposed","disposeCancelled","pageNavigated","rotationEnd","rotationStart","centerLabelRollover","centerLabelRollout","centerLabelClick","centerLabelChanged","linkClicked","chartTypeChanged","chartClick","chartMouseMove","chartRollOver","chartRollOut","backgroundLoaded","backgroundLoadError","logoRollover","logoRollout","logoClick","logoLoaded","logoLoadError","scrollStart","scrollEnd","slicingStart","slicingEnd","dataRestored","beforeDataSubmit","dataSubmitError","dataSubmitted","dataSubmitCancelled","chartUpdated","nodeAdded","nodeUpdated","nodeDeleted","connectorAdded","connectorUpdated","connectorDeleted","labelAdded","labelDeleted","selectionRemoved","labelClick","labelRollOver","labelRollOut","labelDragStart","labelDragEnd","dataplotDragStart","dataplotDragEnd","alertComplete","realTimeUpdateComplete","realTimeUpdateError","chartCleared","zoomReset","zoomedOut","zoomedIn","zoomed","zoomModeChanged","pinned","beforeExport","exported","exportCancelled","beforePrint","printComplete","printCancelled","<static> ready","legendPointerDragStart","legendPointerDragStop","legendRangeUpdated","legendItemClicked","legendItemRollover","legendItemRollout","beforeLinkedItemOpen","linkedItemOpened","beforeLinkedItemClose","linkedItemClosed","entityRollOut","entityRollOver","entityClick","connectorRollOver","connectorRollOut","markerRollOver","markerRollOut","markerClick","printReadyStateChange","dataplotRollOver","dataplotRollOut","dataplotClick","processClick","processRollOver","processRollOut","categoryClick","categoryRollOver","categoryRollOut","milestoneClick","milestoneRollOver","milestoneRollOut","overlayButtonClick","loaded","rendered","drawComplete","renderComplete","dataInvalid","dataXMLInvalid","dataLoaded","noDataToDisplay","connectorClick","selectionStart","selectionEnd","dataLabelClick","dataLabelRollOver","dataLabelRollOut","dataLoadRequestCompleted","dataLoadError","dataLoadCancelled","dataLoadRequestCancelled","dataUpdated","dataUpdateCancelled","dataLoadRequested","beforeDataUpdate"], 
            function(eventObject, argumentsObject){
                ns.getAll().each(function(prf,t){
                     if(prf.onFusionChartsEvent && prf.renderId && prf._chartId && (t=FusionCharts(prf._chartId)) && t==eventObject.sender)
                        prf.boxing().onFusionChartsEvent(prf,eventObject,argumentsObject);
                });
            }
        );
    },
    Instance:{
        refreshChart:function(dataFormat){
            return this.each(function(prf){
                if(prf.renderId){
                    var prop=prf.properties,t;
                    if(prf._chartId && (t=FusionCharts(prf._chartId))){
                        // dispose
                        t.dispose();
                        // clear node
                        prf.getSubNode('BOX').html("",false);
                    }

                    // new one
                    var fc=new FusionCharts(prop.chartType, prf._chartId, prop.width, prop.height),
                        flag;
                    
                    switch(dataFormat){
                        case 'XMLUrl':
                            var xml=linb.getFileSync(prop.XMLUrl);
                            if(xml)fc.setXMLData(xml);
                        break;
                        case 'JSONUrl':
                            var json=linb.getFileSync(prop.JSONUrl);
                            if(json)fc.setJSONData(json);
                        break;
                        case 'XMLData':
                            fc.setXMLData(prop.XMLData);
                        break;
                        default:
                            if(prop.XMLUrl){
                                var xml=linb.getFileSync(prop.XMLUrl);
                                if(xml)fc.setXMLData(xml);
                            }else if(prop.JSONUrl){
                                var json=linb.getFileSync(prop.JSONUrl);
                                if(json)fc.setJSONData(json);
                            }else if(prop.XMLData){
                                fc.setXMLData(prop.XMLData);
                            }else if(!_.isEmpty(prop.JSONData)){
                                flag=1;
                                fc.setJSONData(prf.box._prepareFCData(prf,prop.JSONData));
                            }
                    }
                    // ensure cursor pointer
                    if(!flag){
                        fc.setJSONData(prf.box._prepareFCData(prf,fc.getJSONData()));
                    }

                    fc.render(prf.getSubNode('BOX').id());
                }
            });
        },
        setTransparent:function(isTransparent){
           return this.each(function(prf){
               var t;
               _.set(prf.properties,["JSONData","chart","bgalpha"], isTransparent?"0,0":"");
               if(prf.renderId && prf._chartId && (t=FusionCharts(prf._chartId))){
                   t.setTransparent(isTransparent);
               }
           });
        },
        getChartAttribute:function(key){
            var prf=this.get(0);
            return _.isStr(key)?_.get(prf.properties,["JSONData","chart",key]):_.get(prf.properties,["JSONData","chart"]);
        },
        setChartAttribute:function(key,value){
            var h={};
            if(_.isStr(key)){
                h[key]=value;
            }else h=key;
                
            return this.each(function(prf){
                var t;
                if(prf.renderId && prf._chartId && (t=FusionCharts(prf._chartId))){
                    t.setChartAttribute(h);
                    // refresh memory in xui from real
                    _.set(prf.properties,["JSONData","chart"], t.getChartAttribute());
                }else{
                    // reset memory in xui only 
                    var opt=_.get(prf.properties,["JSONData","chart"]);
                    if(opt)_.merge(opt, h, 'all');
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
                data=_.clone(data);
                if(_.isArr(data) && _.isArr(data[0])){
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
                            _.set(JSONData,["lineset",index||0,"data"],data);
                        }
                    }else{
                        if('dataset' in JSONData){
                            _.set(JSONData,["dataset",index||0,"data"],data);
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
            if((fc=this.getFCObject())&&_.isFun(fc[funName]))
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
        _objectProp:{tagVar:1,propBinder:1,dockMargin:1,JSONData:1,configure:1,plotData:1,feedData:1},
        Appearances:{
            KEY:{
                'font-size':xui.browser.ie?0:null,
                'line-height':xui.browser.ie?0:null,
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
            HotKeyAllowed:false,
            onSize:xui.UI.$onSize
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
            width:400,
            height:300,
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
                        "Pyramid ","Radar","MultiLevelPie"
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
                    if(!_.isEmpty(prop.JSONData))
                        return prop.JSONData;
                    else if(fc=prf.boxing().getFCObject())
                        return prf.box._cleanData(prf,fc.getJSONData());
                },
                set:function(data){
                    var prf=this,prop=prf.properties;
                    if(_.isStr(data))data=_.unserialize(data);
                    if(data){
                        prop.XMLData=prop.XMLUrl=prop.JSONUrl="";
                        prop.JSONData=_.clone(data);

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
                    var JSONData=this.properties.JSONData,
                        bak=JSONData.animation;
                    JSONData.animation=0;
                    if(('dataset' in JSONData) || (_.isArr(data) && _.isArr(data[0])) )
                        JSONData.dataset=_.clone(data);
                    else
                        JSONData.data=_.clone(data);
                     this.boxing().refreshChart();
                     if(bak)JSONData.animation=bak;else delete JSONData.animation;
                     return this;
                }
            },
            feedData:{
                ini:"",
                set:function(data){
                    var prf=this,t;
                     if(prf.renderId && prf._chartId && (t=FusionCharts(prf._chartId)) && t.feedData){
                        t.feedData(data||"");
                    }
                }
            }
        },
        _cleanData:function(prf,data){
            var hoder="Javascript:void(0)";
            if(data.dataset){
                _.arr.each(data.dataset,function(o,i){
                    _.arr.each(o.dataset,function(v,j){
                        _.arr.each(v.data,function(w,k){
                            if(w.link==hoder)delete w.link;
                        });
                    });
                    _.arr.each(o.data,function(v,j){
                        if(v.link==hoder)delete v.link;
                    });
                });
            }else if(data.data){
                _.arr.each(data.data,function(o,i){
                    if(o.link==hoder)delete o.link;
                    if(o.labelLink==hoder)delete o.labelLink;
                });                
            }
            if(data.categories){
                _.arr.each(data.categories,function(o,i){
                    _.arr.each(o.category,function(v,j){
                       if(v.link==hoder)delete v.link;
                    });
                });
            }
            return data;
        },
        _prepareFCData:function(prf, data){
            var id=prf.$xid;
                data=_.clone(data),
                hoder="Javascript:void(0)";
            //show cursor as pointer
            if(data.dataset){
                _.arr.each(data.dataset,function(o,i){
                    _.arr.each(o.dataset,function(v,j){
                        _.arr.each(v.data,function(w,k){
                            if(!w.link)w.link=hoder;
                        });
                    });
                    _.arr.each(o.data,function(v,j){
                       if(!v.link)v.link=hoder;
                    });
                });
            }else if(data.data){
                _.arr.each(data.data,function(o,i){
                    if(!o.link)o.link=hoder;
                    if(!o.labelLink)o.labelLink=hoder;
                });                
            }
            if(data.categories){
                _.arr.each(data.categories,function(o,i){
                    _.arr.each(o.category,function(v,j){
                       if(!v.link)v.link=hoder;
                    });
                });
            }
            return data;
        },
        RenderTrigger:function(){
            var prf=this;
            // give chart dom id
            prf._chartId="FC_"+prf.properties.chartType+"_"+prf.$xid;

            if(!_.isEmpty(prf.properties.configure)){
                prf.boxing().setConfigure(prf.properties.configure, true);
            }
            if(prf.theme)
                prf.boxing().setTheme(prf.theme);
            // render it
            prf.boxing().refreshChart();
            
            var t=FusionCharts(prf._chartId),
                f1=function(a,argsMap){
                    if(prf.onDataClick)prf.boxing().onDataClick(prf,argsMap);
                },f2=function(a,argsMap){
                    if(prf.onLabelClick)prf.boxing().onLabelClick(prf,argsMap);
                },f2=function(a,argsMap){
                    if(prf.onAnnotationClick)prf.boxing().onAnnotationClick(prf,argsMap);
                };
            t.addEventListener("dataplotClick",f1);
            t.addEventListener("dataLabelClick",f2);
            t.addEventListener("onAnnotationClick",f3);
            // set before destroy function
            (prf.$beforeDestroy=(prf.$beforeDestroy||{}))["unsubscribe"]=function(){
                var t;
                if(this._chartId && (t=FusionCharts(this._chartId))){
                    t.removeEventListener("dataplotClick",f1);
                    t.removeEventListener("dataLabelClick",f2);
                    t.removeEventListener("onAnnotationClick",f3);
                    f1=f2=f3=null;
                    t.dispose();
                }
            }
        },
        EventHandlers:{
            onFusionChartsEvent:function(prf, eventObject, argumentsObject){},
            onDataClick:function(prf, argsMap){},
            onLabelClick:function(prf, argsMap){},
            onAnnotationClick:function(prf, argsMap){},
            onShowTips:null
        },
        _onresize:function(prf,width,height){
            var size = prf.getSubNode('BOX').cssSize(),prop=prf.properties,t;
            if( (width && size.width!=width) || (height && size.height!=height) ){
                // reset here
                if(width)prop.width=width;
                if(height)prop.height=height;

                size={width:width,height:height};
                prf.getSubNode('BOX').cssSize(size,true);
                if(prf.$inDesign || prop.cover){
                    prf.getSubNode('COVER').cssSize(size,true);
                }
                if(prf.renderId && prf._chartId && (t=FusionCharts(prf._chartId))){
                    t.resizeTo(prop.width, prop.height);
                }
            }
        }
    }
});
