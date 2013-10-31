Class("xui.UI.FusionChartFree", "xui.UI.Flash",{
    Instance:{
        refreshChart:function(){
            this.refreshFlash();
        },
        setDataXML:function(xml){
            var prf=this.get(0),chart = prf.box._getSWF(prf);
            if(chart){
            	chart.SetVariable("_root.dataURL","");
            	chart.SetVariable("_root.isNewData","1");
            	chart.SetVariable("_root.newData",xml);
            	chart.TGotoLabel("/", "JavaScriptHandler"); 
            }
        }
    },
    Static:{
        _FC_LINKTAG:'JavaScript:',
        _FC_SWFFILEPRETAG:"FCF_",
        DataModel:{
            selectable:true,
            FC_eventHandler:{
                ini:true,
                action:function(){
                    this.boxing().refreshChart();
                }
            },
            FC_chartType:{
                combobox:"Column2D,Column3D,Pie2D,Pie3D,Line,Bar2D,Area2D,Doughnut2D,MSColumn2D,MSColumn3D,MSLine,MSArea2D,MSBar2D,StackedColumn2D,StackedColumn3D,StackedArea2D,StackedBar2D,Candlestick,Funnel,Gantt".split(','),
                ini:"Column2D",
                action:function(v){
                    var ns=this,prop=ns.properties;
                    // from outside
                    if(prop.FC_demoDataPath){
                        xui.Ajax(prop.FC_demoDataPath + v +".xml", {rnd:_()},function(rsp){
                            prop.FC_data=xui.XML.xml2json(rsp,null,function(s){
                                return ns.box.replaceSpecialChars(x);
                            });
                        },null,null,{asy:false,rspType:'xml'}).start();
                    }
                    prop.src=prop.FC_swfPath + this.box._FC_SWFFILEPRETAG + prop.FC_chartType + ".swf";
 
                    this.boxing().refreshChart();
                }
            },
            FC_swfPath:"FusionChartsFree/Charts/",
            FC_demoDataPath:"FusionChartsFree/Data/",
            FC_attrs:{
                ini:{
                    bgcolor: "transparent",
                    quality: "high",
                    allowScriptAccess: "always",
                    debugMode: "false",
                    registerWithJS:"1",
                    scaleMode:'noScale'
                },
                action:function(){
                    this.boxing().refreshChart();
                }
            },
            FC_labels:{
                ini:{
                    PBarLoadingText:"Loading Chart. Please Wait",
                    XMLLoadingText:"Retrieving Data. Please Wait",
                    ParsingDataText:"Reading Data. Please Wait",
                    ChartNoDataText:"No data to display",

                    RenderingChartText:"Rendering Chart. Please Wait",
                    LoadDataErrorText:"Error in loading data",
                    InvalidXMLText:"Invalid XML data"
                },
                action:function(){
                    this.boxing().refreshChart();
                }
            },
            FC_data:{
                ini:{},
                action:function(v){
                    var ns=this;
                    ns.box._buildChartXML(ns, function(xml){
                        ns.boxing().setDataXML(ns.box._encodeDataXML(xui.XML.json2xml(xml)));
                    });
                }
            }
        },
        RenderTrigger:function(){
            this.boxing().setFC_chartType(this.properties.FC_chartType,true).refreshChart();
        },
        EventHandlers:{
            onFC_Click:function(profile, args){},
            onFC_PrepareXML:function(profile, json, callback){},
            onFC_SetXML:function(profile, xml){}
        },
        replaceSpecialChars:function(str){
            return (""+str).replace(/\%/g, '%25')
            .replace(/\&/g, '%26')
            .replace(/\</g, '&lt;')
            .replace(/\>/g, '&gt;')
            .replace(/\'/g, '&apos;');
        },
        _encodeDataXML:function(strDataXML){
            var regExpReservedCharacters=["\\$","\\+"];
			var arrDQAtt=strDataXML.match(/=\s*\".*?\"/g);
			if (arrDQAtt){
				for(var i=0;i<arrDQAtt.length;i++){
					var repStr=arrDQAtt[i].replace(/^=\s*\"|\"$/g,"");
					repStr=repStr.replace(/\'/g,"%26apos;");
					var strTo=strDataXML.indexOf(arrDQAtt[i]);
					var repStrr="='"+repStr+"'";
					var strStart=strDataXML.substring(0,strTo);
					var strEnd=strDataXML.substring(strTo+arrDQAtt[i].length);
					var strDataXML=strStart+repStrr+strEnd;
				}
			}
			
			strDataXML=strDataXML.replace(/\"/g,"%26quot;");
			strDataXML=strDataXML.replace(/%(?![\da-f]{2}|[\da-f]{4})/ig,"%25");
			strDataXML=strDataXML.replace(/\&/g,"%26");

			return strDataXML;
        },
        _buildChartXML:function(profile, callback){
            var ns=this, prop=profile.properties, ver = ns.getFlashVersion();
            if(ver.split(',')[0]<8){
                xui.alert(xui.getRes("inline.noFlash"));
                return "";
            }

            var data = _.clone(prop.FC_data);
            if(prop.FC_eventHandler){
                var serialId=profile.serialId,
                    linktag=ns._FC_LINKTAG,
                    idata;
                if(profile.onFC_PrepareXML && false === profile.boxing().onFC_PrepareXML(profile, data, callback)){}
                else{
                    // chart or graph
                    if(idata=(data.chart||data.graph)){
                        if(idata.set){
                            _.arr.each(idata.set,function(o){
                                if(o)
                                    o['@link']=encodeURIComponent(linktag+ns.KEY+'._e("'+serialId+'","'+(o['@label']||o['@name']||"")+'","'+(o['@value']||'')+'")');
                            });
                        }
                        _.arr.each(["lineSet","dataset","dataSet"],function(dskey){
                            if(idata[dskey]){
                                var arr=[];
                                if(idata.categories && idata.categories.category){
                                    _.arr.each(idata.categories.category,function(o){
                                        arr.push(o['@label']||o['@name']||"");
                                    });
                                }
                                
                                var ds=idata[dskey];
                                if(!_.isArr(ds))
                                    ds=[ds];
                                _.arr.each(ds,function(v, i){
                                    if(v){
                                        _.arr.each(["lineSet","dataset","dataSet"],function(dskey2){
                                            _.arr.each(v[dskey2],function(k){
                                                if(k && k.set){
                                                    var sn=k['@seriesName']||k['@seriesname']||'';
                                                    _.arr.each(k.set,function(o,j){
                                                        if(o)
                                                            o['@link']=encodeURIComponent(linktag+ns.KEY+'._e("'+serialId+'","'+(arr[j]||"")+'","'+sn+'","'+(o['@value']||o['@label']||o['@name']||'')+'")');
                                                    });
                                                }
                                            });
                                        });
                                        if(v.set){
                                            var sn=v['@seriesName']||v['@seriesname']||'';
                                            _.arr.each(v.set,function(o,j){
                                                if(o)
                                                    o['@link']=encodeURIComponent(linktag+ns.KEY+'._e("'+serialId+'","'+(arr[j]||"")+'","'+sn+'","'+(o['@value']||o['@label']||o['@name']||'')+'")');
                                            });
                                        }
                                    }
                                });
                            }
                        });
                        callback(data);
                    }else
                        callback("");
                }
            }else{
                callback(data);
            }
        },
        _drawSWF:function(profile){
            var ns=this;
            ns._buildChartXML(profile, function(data){
                var prop=profile.properties,
                    serialId=profile.serialId,
                    src=prop.src,
                    parameters={},
                    options={},
                    xml="";

                if(prop.flashvars && !_.isEmpty(prop.flashvars))_.merge(parameters, prop.flashvars, 'all');
                if(prop.parameters && !_.isEmpty(prop.parameters))_.merge(parameters, prop.parameters, 'all');
                if(prop.FC_attrs && !_.isEmpty(prop.FC_attrs))_.merge(options, prop.FC_attrs, 'all');
                if(prop.flashvars && !_.isEmpty(prop.flashvars))_.merge(options, prop.flashvars, 'all');

                options.DOMId = profile.box._idtag + profile.serialId;
                options.chartWidth=prop.width;
                options.chartHeight=prop.height;
                options.dataXML=ns._encodeDataXML(xui.XML.json2xml(data));

                if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){
                    xml += '<embed type="application/x-shockwave-flash" src="'+ src +'?'+_.urlEncode(parameters)+'" ';
                    xml += 'width="'+prop.width+'" height="'+prop.height+'" ';
                    xml += 'id="'+ options.DOMId +'" name="'+ options.DOMId +'" ';
                    xml += 'wmode="opaque" ';
                    xml += 'flashvars="'+ _.urlEncode(options) +'" ';
                    xml +=  '/>';
                }else{
                    xml += '<object id="'+ options.DOMId +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
                    xml += 'width="'+prop.width+'" height="'+prop.height+'">';
                    xml += '<param name="movie" value="'+ src +'?'+_.urlEncode(parameters)+'" />';
                    xml += '<param name="wmode" value="opaque" />';
                    xml += '<param name="flashvars" value="'+ _.urlEncode(options) +'" />';
                    xml += '</object>';
                }
                profile.getSubNode('BOX').html(xml, false);
                if(profile.onFC_SetXML)profile.boxing().onFC_SetXML(profile,xml);
            });
        },
        _idtag:"xui_UI_FCF_", 
        __events:{},
        _e:function(){
            var instance=this.getFromDom(this.KEY+":"+arguments[0]+":"),
                prf=instance && instance.get(0);
            if(prf && !prf.properties.disable && prf.onFC_Click){
                var args=_.toArr(arguments);
                args=args.slice(1);
                instance.onFC_Click(prf, args);
            }
        }
    }
});