xui.Class("xui.UI.FormLayout",["xui.UI","xui.absList"],{
    Initialize:function(){
        this.addTemplateKeys(['ITEM','HOLDER','SPREADER']);
    },
    Instance:{
        selectCell:function (row, col){
            var prf=this.get(0),prop=prf.properties;
            if(prop.renderType=="handsontable"){
                if(prf.$htable)
                    prf.$htable.selectCell(row, col);
            }
        },
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
        _ACTIVEHANDLER:["KEY","HOLDER"],
        _NoProp : {"conLayoutColumns":1},
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
            mode:{
                ini:'',
                listbox:['','design','write','read'],
                get:function(){
                    return this.$inDesign?'design':(this.properties.mode || 'read');
                },
                action:function(){
                    this.boxing().refresh();
                }
            },
            width:{
                $spaceunit:1,
                ini:'30em'
            },
            height:{
                $spaceunit:1,
                ini:'25em'
            },
            menuCaptions:{
                ini:{
                    'row_above':'Insert row above',
                    'row_below':'Insert row below',
                    'col_left':'Insert column left',
                    'col_right':'Insert column right',
                    'clear_column':'Clear selected column',
                    'remove_row':'Remove row',
                    'remove_col':'Remove column',
                    'alignment:left':'Left',
                    'alignment:top':'Top',
                    'alignment:right':'Right',
                    'alignment:bottom':'Bottom',
                    'alignment:middle':'Middle',
                    'alignment:center':'Center',
                    'alignment:justify':'Justify',

                    'bgcolor':'Background color'
                }
            },
            solidGridlines:{
                ini:true,
                action:function(value){
                    var cls = value ? "solidgridline" : this.boxing().getMode()=='design' ? "" : "nogridline",
                        node = this.getSubNode('BOX');
                    node.removeClass("solidgridline nogridline");
                    if(cls)node.addClass(cls);
                }
            },
            stretchH:{
                ini:"all",
                listbox:["","none","last","all"],
                action:function(){
                    this.box.$updateSetting(this,'stretchH');
                }
            },
            rowHeaderWidth:{
                ini:25,
                action:function(){
                    this.box.$updateSetting(this,'rowHeaderWidth');
                    var size=this.getRoot().cssSize();
                    xui.UI.$tryResize(this, size.width, size.height);
                }
            },
            columnHeaderHeight:{
                ini:25,
                action:function(){
                    this.box.$updateSetting(this,'columnHeaderHeight');
                    var size=this.getRoot().cssSize();
                    xui.UI.$tryResize(this, size.width, size.height);
                }
            },
            defaultRowHeight: 50,
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
                            var size=prf.getRoot().cssSize();
                            xui.UI.$tryResize(prf, size.width, size.height);
                        }else{
                            xui.Thread.repeat(function(){
                                if(xui(cssId).get(0)){
                                    //prf.boxing().free();
                                    cls._renderAsHandsontable(prf);
                                    var size=prf.getRoot().cssSize();
                                    xui.UI.$tryResize(prf, size.width, size.height);
                                    return false;
                                }
                            },200);
                        }
                    },null,false,{cache:true});
                }
            }

            prf.boxing().setSolidGridlines(prop.solidGridlines, true);
        },
        EventHandlers:{
            onShowTips:null
        },
        _popMenu : function(prf, _menu, capMap){
            var ignoreMap={cut:1,copy:1,make_read_only:1,undo:1,redo:1};
            var xuimenu, htable = _menu.hot;
            if(xuimenu = prf.$popmenu){
                xui.each(_menu.menuItems,function(item){
                     if(item.name!='---------'){
                        xuimenu.updateItem(item.key, {disabled: item.disabled ? item.disabled.call(htable) : false});
                     }
                });
            }else{
                xuimenu = new xui.UI.PopMenu();
                var mapMenu=function(items){
                    var nitems=[], lastSplit;
                    xui.each(items,function(item){
                        if(ignoreMap[item.key])return;
                        if(item.name=='---------'){
                            if(!lastSplit){
                                lastSplit=1;
                                nitems.push({type:'split'});
                            }
                        }else{
                            lastSplit=0;
                            nitems.push({
                                    id: item.key,
                                    disabled: item.disabled ? item.disabled.call(htable) : false,
                                    caption: capMap && capMap[item.key] || item.name.call(htable),
                                    sub: item.submenu?mapMenu(item.submenu.items):null,
                                    _cb: item.callback
                            });
                        }
                    });
                    return nitems;
                },
                normalizeSelection = function(selRanges) {
                    var arr=[];
                    for(var i=0,l=selRanges.length;i<l;i++){
                        arr.push({
                                start: selRanges[i].getTopLeftCorner(),
                                end: selRanges[i].getBottomRightCorner()
                        });
                    }
                    return arr;
                },
                nitems = mapMenu(_menu.menuItems);
                nitems.push({type:'split'});
                nitems.push({
                    id:'bgcolor',
                    caption: capMap && capMap.bgcolor || 'bgcolor',
                    sub:true
                });

                xuimenu.setItems(nitems);

                xuimenu.onMenuSelected(function(prf, item){
                    if(item._cb){
                            item._cb.call(htable, item.id, normalizeSelection(htable.getSelectedRange()));
                    }else{
                        if(item.id=='bgcolor'){
                            xui.each(htable.getSelectedRange(), function(selection){
                                var fromRow = Math.min(selection.from.row, selection.to.row),
                                    toRow = Math.max(selection.from.row, selection.to.row),
                                    fromCol = Math.min(selection.from.col, selection.to.col),
                                    toCol = Math.max(selection.from.col, selection.to.col);
                                
                                for (var row = fromRow; row <= toRow; row++) {
                                  for (var col = fromCol; col <= toCol; col++) {
                                    var cellMeta = htable.getCellMeta(row, col),
                                        TD = htable.getCell(row, col);
                                    TD.style.backgroundColor =  "#"+item.value;
                                    cellMeta.style=cellMeta.style||{};
                                    cellMeta.style.backgroundColor =  "#"+item.value;
                                  }
                                }
                            });
                            // no need render
                            //htable.render();
                        }
                    }
                })
                .onShowSubMenu(function(profile, item, src) {
                    var menubar=profile.boxing(), obj;
                    switch(item.id){
                        case 'bgcolor':
                            obj=(new xui.UI.ColorPicker).render(true);
                            obj.afterUIValueSet(function(p, old, n){ 
                               menubar.hide(false); 
                               menubar.onMenuSelected(profile,{
                                  id : item.id, 
                                  value : n 
                               });
                            });
                            obj.get(0).$rootmenu = profile;
                        break;
                    }
                    return obj;
                }); 

                prf.$popmenu = xuimenu;
            }

            xuimenu.pop(prf.$lastMousePos);
        },
        _getHeaderOffset:function(prf){
            var prop=prf.properties,
                  offset = {left:0,top:0};
            if(prop.renderType=="handsontable"){
                if(prf.boxing().getMode()=="design"){
                    offset.left=prop.rowHeaderWidth;
                    offset.top=prop.columnHeaderHeight + 1;
                }
/*
                var node = prf.getSubNode("BOX");
                node.children().each(function(n){
                    if(xui(n).hasClass("ht_clone_top")){
                        offset.top = xui(n).first(2).height();
                    }else if(xui(n).hasClass("ht_clone_left")){
                        offset.left = xui(n).first(4).width();
                    }
                });
*/
            }
            return offset;
        },
        _renderAsHandsontable: function(prf){
            if(!prf || !prf.box)return;
            var boxNode = prf.getSubNode("BOX"),
                elem = boxNode.get(0), 
                htable, 
                prop = prf.properties,
                mode = prf.boxing().getMode(),
                designMode = mode == "design",
                fixedSet = {
                    // "fix" some functions for handsontable
                    autoWrapRow: true,
                    renderAllRows: true,

                    // "readonly" handsontable
                    readOnly: !designMode,
                    comments: !designMode,
                    disableVisualSelection: !designMode,
                    enterBeginsEditing: designMode,
                    manualRowResize: designMode,
                    manualColumnResize: designMode,
                    manualRowMove: designMode,
                    manualColumnMove: designMode,
                    contextMenu: designMode,
                    mergeCells: designMode,
                    copyable: designMode,
                    copyPaste: designMode,

                    beforeOnCellMouseDown:!designMode?null:function(e,c){
                        // fire event
                        if(c.row===-1 && c.col===-1){
                            e.stopImmediatePropagation();
                        }
                    },
                    afterOnCellMouseUp:!designMode?null:function(e,c){
                        // fire event
                        if(c.row===-1 && c.col===-1){
                            this.deselectCell();
                            prf.getRoot().onClick(true);
                            e.stopImmediatePropagation();
                        }
                    },

                    /* cell render*/
                    // for xui dom id & event handler
                    beforeRenderer : function(TD, row, col, prop, value, cellprop){
                        var subSerialId = prf.pickSubId('items');
                        // memory map
                        cellprop.id=subSerialId;
                        prf.ItemIdMapSubSerialId[subSerialId] = subSerialId;
                        prf.SubSerialIdMapItem[subSerialId] = cellprop;

                        TD.id = prf.key + "-ITEM:" + prf.serialId + ":" +subSerialId;
                        TD.className = (TD.className||"")  + prf.getClass("ITEM");
                        xui.UI.$addEventsHandler(prf, TD, true);

                        // custom
                        if(cellprop.style){
                            for(var i in cellprop.style)
                                TD.style[i] = cellprop.style[i];
                        }
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
                        console.log("afterRender");
                        xui.tryF(prf.$onrender,[],prf);

                        // Set id for important nodes, for getting profile from dom id
                        var node = prf.getSubNode("BOX");
                        node = node.first(); node.id(prf.key + "-MASTER:" + prf.serialId + ":");
                        node = node.first(); node.id(prf.key + "-HOLDER:" + prf.serialId + ":");
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
                            //
                            // lazy append
                            var arr=[];
                            xui.each(prf.children,function(v){
                                arr.push(v);
                            });
                            prf.children=[];
                            xui.arr.each(arr,function(v){
                                prf.boxing().append(v[0], v[1]);
                            });

                            prf.getRoot().onMouseup(function(p,e){
                                prf.$lastMousePos = xui.Event.getPos(e);
                            });
                            prf._$renderedAll=1;
                        }
                    },

                    afterSelection: mode=='read'?null:function(){
                        prf.getRoot().css('overflow','visible');
                    },
                    outsideClickDeselects: mode=='read'?null:function(node){
                        var p=xui.UIProfile.getFromDom(node);
                        if(p && prf.$popmenu){
                            var r=prf.$popmenu.get(0);
                            if(p==r || p.$rootmenu==r){
                                return false;
                            }
                        }

                        prf.getRoot().css('overflow','');
                        return true;
                    },

                    afterContextMenuShow: !designMode?null:function(context){
                         prf.box._popMenu(prf, context.menu, prop.menuCaptions);
                         // don't use dft menu
                         context.menu.container.style.display='none';
                    }
                },
                settings={},t;

            var offset = prf.box._getHeaderOffset(prf);
            // TODO : xui to handsontable
            settings.height = prf.$px(prop.height) + offset.top;
            settings.width = prf.$px(prop.width) + offset.left;
            settings.stretchH = (t=prop.stretchH)=="last"?"last":t=="all"?"all":"none";

            settings.defaultColumnWidth = prop.defaultColumnWidth;
            settings.rowHeaderWidth  = prop.rowHeaderWidth;
            settings.columnHeaderHeight = prop.columnHeaderHeight;
            // row 
            settings.rowHeaders = designMode;
            settings.rowHeights = prop.defaultRowHeight;
            // column 
            settings.colHeaders =  designMode;
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
                var t;
                if(t=this.$htable){
                    // must purge lazy-bound node here
                    var node=this.getSubNode("BOX").get(0);
                    if(node)
                        xui.$purgeChildren(node);

                    if(!t.isDestroyed){
                        Handsontable.hooks.destroy(t);
                        t.destroy();
                    }
                    delete this.$htable;
                }
                if(t = this.$popmenu){
                    t.destroy();
                }
            }
        },
        _resizeHTable: function(prf,size){
            var t;
            if(prf.properties.renderType=="handsontable" && (t=prf.$htable)){
                var holder = prf.getSubNode("HOLDER").cssSize();
                if(holder.width!=size.width || holder.height!=size.height){
                    // ensure by px
                    t.updateSettings(size);
                }
            }
        },
        $updateSetting:function(prf, opt){
            var t;
            if(prf.properties.renderType=="handsontable" && (t=prf.$htable)){
                if(typeof opt=="string"){
                    var h={};
                    h[opt] = prf.properties[opt];
                    opt=h;
                }
                t.updateSettings(opt);
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
            var prop=prf.properties,
                // compare with px
                us = xui.$us(prf),
                adjustunit = function(v,emRate){return prf.$forceu(v, us>0?'em':'px', emRate)},
                root = prf.getRoot(),
                boxNode = prf.getSubNode('BOX'),
                offset = prf.box._getHeaderOffset(prf),
                // caculate by px
                ww=width?prf.$px(width):width, 
                hh=height?prf.$px(height):height,
                t;
            if( width ||  height){
                // reset here
                if(width)prop.width=adjustunit(ww);
                if(height)prop.height=adjustunit(hh);

                boxNode.css({
                    marginLeft:-offset.left+"px",
                    marginTop:-offset.top+"px",
                    width:width?(ww+offset.left+'px'):null,
                    height:height?(hh+offset.top+'px'):null
                });

                xui.resetRun(prf.key+":"+prf.$xid+"|resize",function(){
                   if(prf&&prf.box)prf.box._resizeHTable(prf, prf.getSubNode('BOX').cssSize());
                });
            }
        }
    }
});