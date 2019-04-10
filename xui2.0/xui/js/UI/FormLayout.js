xui.Class("xui.UI.FormLayout",["xui.UI","xui.absList"],{
    Initialize:function(){
        this.addTemplateKeys(['ITEM','HODER']);
    },
    Instance:{
        getHTable:function(){
            return this.get(0) && this.get(0).$htable;
        },
        htable_call:function(funName,params){
            var htable = this.getHTable();
            if(htable && htable[funName]){
                return htable[funName].apply(htable,params||[]);
            }
        }
    },
    Static:{
        _SUBCONTAINERKEY:"ITEM",
        //_CONTAINERKEY:"BOX",
        _ACTIVEHANDLER:["KEY","HODER"],
        _objectProp:{columns:1,rows:1,cells:1,merged:1,borders:1},
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
            POOL:{
                position:'absolute',
                left:'100%',
                top:'100%',
                width:0,
                height:0
            },
            ITEM: {
              "position": "relative"
            },
            // for handsontable solid grid lines
            ".handsontable.solidgridline td": {
              "border-right": "1px solid #444",
              "border-bottom": "1px solid #444"
            },
            ".handsontable.solidgridline tr:first-child td": {
                "border-top": "1px solid #444"
            },
            ".handsontable.solidgridline th:nth-child(2), .handsontable.solidgridline td:first-of-type, .handsontable.solidgridline .htNoFrame + th, .handsontable.solidgridline .htNoFrame + td": {
                "border-left": "1px solid #444"
            },
            ".handsontable.nogridline td": {
              "border-right": "1px solid #fff",
              "border-bottom": "1px solid #fff"
            },
            ".handsontable.nogridline tr:first-child td": {
                "border-top": "1px solid #fff"
            },
            ".handsontable.nogridline th:nth-child(2), .handsontable.nogridline .htNoFrame + th, .handsontable.nogridline .htNoFrame + td": {
                "border-left": "1px solid #fff"
            }
        },
        Templates:{
            tagName:'div',
            className:'{_className}',
            style:'{_style}',
            BOX:{
                tagName:'div'
            },
            POOL:{
                tagName:'div'
            }
        },
        Behaviors:{
            DroppableKeys:['ITEM'],
            PanelKeys:['ITEM'],
            HotKeyAllowed:false,
            ITEM:{}
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
            autoTips:null,
            width:{
                $spaceunit:1,
                ini:'30em'
            },
            height:{
                $spaceunit:1,
                ini:'25em'
            },

            solidGridlines:true,
            stretchH:{
                ini:"all",
                listBox:["","none","last","all"]
            },
            defaultRowHeight: 50,//23,
            defaultColumnWidth: 50,
            //[{...}]
            columns:{
                ini:[]
            },
            //[{...}]
            rows:{
                ini:[]
            },
            //[[{...},null]]
            cells:{
                ini:[]
            },
            //["A1B2","A","3"]
            merged:{
                ini:[]
            },
            // [{range:"A1B2",top,left,bottom,right}]
            borders:{
                ini:[]
            },

            // currently, use handsontable 6.2.2 as html table for form layout
            // will use simple template for small script size at runtime
            renderType:{
                hidden:true,
                ini:"handsontable"
            },
            // if use handsontable 6.22 (MIT license) as renderer
            rendererCDNJS:"https://cdn.jsdelivr.net/npm/handsontable@6.2.2/dist/handsontable.full.min.js",
            rendererCDNCSS:"https://cdn.jsdelivr.net/npm/handsontable@6.2.2/dist/handsontable.full.min.css"
        },
        RenderTrigger:function(){
            var prf=this,prop=prf.properties,cls=prf.box;
            if(prop.renderType=="handsontable"){
                if(window.Handsontable)cls._renderAsHandsontable(prf);
                else{
                    // prf.boxing().busy(false, "Loading table ...");
                    var cssId="xui.UI.HTable:Handsontable";
                    xui.CSS.includeLink(prop.rendererCDNCSS,cssId);
                    xui.include("Handsontable",prop.rendererCDNJS,function(){
                        if(xui(cssId).get(0)){
                            //prf.boxing().free();
                            cls._renderAsHandsontable(prf);
                        }else{
                            xui.Thread.repeat(function(){
                                if(xui(cssId).get(0)){
                                    //prf.boxing().free();
                                    cls._renderAsHandsontable(prf);
                                    return false;
                                }
                            },200);
                        }
                    },null,false,{cache:true});
                }
            }
        },
        EventHandlers:{
            onChange: function(profile, changes, source){},
            onShowTips:null
        },
        _renderAsHandsontable: function(prf){
            if(!prf || !prf.box)return;
            var elem = prf.getSubNode("BOX").get(0), htable, 
                prop=prf.properties,
                fixedSet = {
                    // "fix" some functions for handsontable
                    autoWrapRow: true,
                    renderAllRows: true,

                    // "readonly" handsontable
                    disableVisualSelection: false,
                    enterBeginsEditing:true,
                    manualRowResize: true,
                    manualColumnResize: true,
                    rowHeaders: true,
                    manualRowMove: true,
                    manualColumnMove: true,
                    contextMenu: true,
                    mergeCells: true,
                    copyable: true,
                    copyPaste: true,
                    colHeaders: true,
/*                    cells : function(){
                        return {readOnly:true};
                    },
*/
                    beforeOnCellMouseDown:function(e,c){
                        // fire event
                        if(c.row===-1 && c.col===-1){
                            e.stopImmediatePropagation();
                        }
                    },
                    afterOnCellMouseUp:function(e,c){
                        // fire event
                        if(c.row===-1 && c.col===-1){
                            this.deselectCell();
                            prf.getRoot().onClick(true);
                            e.stopImmediatePropagation();
                        }
                    },
                    // export events
                    afterChange : function(changes, source){
console.log('afterChange');
                        if(prf && prf.onChange)prf.onChange(prf, changes, source);
                    },
                    /* cell render*/
                    // for xui dom id & event handler
                    beforeRenderer : function(TD, row, col, prop, value, cellprop){
                        var subSerialId = prf.pickSubId('items');             ;
                        // memory map
                        cellprop.id=subSerialId;
                        prf.ItemIdMapSubSerialId[subSerialId] = subSerialId;
                        prf.SubSerialIdMapItem[subSerialId] = cellprop;

                        TD.id = prf.key + "-ITEM:" + prf.serialId + ":" +subSerialId;
                        TD.className = (TD.className||"")  + prf.getClass("ITEM");
                        xui.UI.$addEventsHandler(prf, TD, true);
                    },
                    // for append xui widgets
                    afterRenderer : function(TD, row, col, prop, value, cellprop){
                        //
                    },
                    
                    /* table render*/
                    beforeRender: function(){
                        // **: updateSetting will re-render all table elements
                        // we have to reset memory map, and keep children here
                        if(prf._$renderedAll){
                            //*** save children first
                            var pool=prf.getSubNode("POOL").get(0),arr=[];
                            xui.arr.each(prf.children,function(v){
                                if(v[0] && v[0].rendered){
                                    pool.appendChild(v[0].getRootNode());
                                    arr.push(v);
                                }
                            });
                            //keep children, prevent to be destroyed
                            if(arr.length){
                                prf._pool_children = arr;
                            }
                            
                            // reset memory map
                            prf.children=[];
                            for(var i in prf.SubSerialIdMapItem)
                                prf.reclaimSubId(i, "items");
                            prf.ItemIdMapSubSerialId={};
                            prf.SubSerialIdMapItem={};
                        }
                    },
                    afterRender:function(){
                        xui.tryF(prf.$onrender,[],prf);

                        // Set id for important nodes, for getting profile from dom id
                        var node = prf.getSubNode("BOX");
                        node = node.first(); node.id(prf.key + "-MASTER:" + prf.serialId + ":");
                        node = node.first(); node.id(prf.key + "-HODER:" + prf.serialId + ":");
                        node = node.first(); node.id(prf.key + "-HIDER:" + prf.serialId + ":");
                        node = node.first(); node.id(prf.key + "-SPREADER:" + prf.serialId + ":");
                        
                        if(prf._$renderedAll){
                            //*** restore children
                            if(prf._pool_children){
                                xui.arr.each(prf._pool_children,function(v){
                                    delete v[0].$dockParent;
                                    prf.boxing().append(v[0], v[1]);
                                });
                                delete prf._pool_children;
                            }
                        }else{
                            // lazy append
                            var arr=[];
                            xui.each(prf.children,function(v){
                                arr.push(v);
                            });
                            prf.children=[];
                            xui.arr.each(arr,function(v){
                                prf.boxing().append(v[0], v[1]);
                            });

                            prf._$renderedAll=1;
                        }
                    }
                },
                settings={},t;

            // TODO : xui to handsontable
            settings.height = prf.$px(prop.height);
            settings.width = prf.$px(prop.width);

            settings.stretchH = (t=prop.stretchH)=="last"?"last":t=="all"?"all":"none";
            settings.rowHeights = prop.defaultRowHeight;
            settings.defaultColumnWidth = prop.defaultColumnWidth;
            
            settings.className=prop.solidGridlines?"solidgridline":prf.$inDesign?"":"nogridline";

/*
            //[{...}]
            columns:{
                ini:[]
            },
            //[{...}]
            rows:{
                ini:[]
            },
            //[[{...},null]]
            cells:{
                ini:[]
            },
            //["A1B2","A","3"]
            merged:{
                ini:[]
            },
            // [{range:"A1B2",top,left,bottom,right}]
            borders:{
                ini:[]
            },
*/
            prf.$htable = htable = new Handsontable(elem, xui.merge(settings, fixedSet, 'all'));

            // set before destroy function
            (prf.$beforeDestroy=(prf.$beforeDestroy||{}))["destroyhtable"]=function(){
                // must purge lazy-bound node here
                xui.$purgeChildren(this.getSubNode("BOX").get(0));

                var t=this.$htable;
                if(t){
                    if(!t.isDestroyed){
                        Handsontable.hooks.destroy(t);
                        t.destroy();
                    }
                    delete this.$htable;
                }
            }
        },
        _resizeHTable: function(prf,size){
            var t;
            if(prf.properties.renderType=="handsontable" && (t=prf.$htable)){
                // ensure by px
                t.updateSettings(size);
            }
        },
        _beforeSerialized:function(prf){
            var o=xui.UI._beforeSerialized.call(this, prf),
                prop=o.properties;

            // TODO : handsontable to xui
             if(prop.renderType=="handsontable"){
            }

            return o;
        },
        $beforeAppend:function(prf,target,subId){
            if(!subId)return;
            // only one allowed
            if(target.size()==1){
                xui.arr.each(prf.children,function(v){
                    if(v[0] && subId == v[1] && v[0]!==target.get(0) ){
                        v[0].boxing().destroy();
                    }
                }, true);
            }
        },
        $afterAppend:function(prf, target,subId){
            if(!subId)return;
            // force dock for single widget
            if(target['xui.UI'] && target.size()==1){
                target.setDock("cover");
            }
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
                if(prf.renderId){
                    xui.resetRun(prf.key+":"+prf.$xid+"|resize",function(){
                        if(prf&&prf.box)prf.box._resizeHTable(prf, root.cssSize());
                    });
                }
            }
        }
    }
});