//shadow class, add a plugin to xui.Dom
Class("xui.UI.Shadow","xui.UI",{
    Instance:{
        _attachTo:function(obj){
            //to xui.Dom
            obj=obj.reBoxing();
            var self=this;
            //set target first
            self.get(0)._target=obj.get(0);
            // add dom for dom node
            obj.append(self);
            return obj;
        }
    },
    Initialize:function(){
        //for xui.Dom
        _.each({
            addShadow :function(properties){
                return new xui.UI.Shadow(properties)._attachTo(xui([this.get(0)]));
            },
            $getShadow:function(){
                var s=this.get(0),b;
                _.arr.each(xui.UI.Shadow._cache,function(o){
                    if(o._target==s){b=o;return false;}
                });
                return b && b.boxing();
            },
            removeShadow:function(){
                var s = this.get();
                _.arr.each(xui.UI.Shadow._cache,function(o){
                    if(o && o.renderId && o._target)
                        if(_.arr.indexOf(s,xui(o._target).get(0))!=-1)
                            o.boxing().destroy();
                });
                return this;
            }
        },function(o,i){
            xui.Dom.plugIn(i,o);
        });
        //for xui.UI.Widget
        _.each({
            _shadow:function(key){
                return this.each(function(o){
                    var target = o.getSubNode('BORDER');
                    if(target.$getShadow())return;

                    var d = o.properties;
                    o.$shadow=target.addShadow({shadowSize:d._shadowSize});
                });
            },
            _unShadow:function(){
                return this.each(function(o){
                    var target = o.getSubNode('BORDER');
                    if(!target.$getShadow())return;
                    target.removeShadow();
                    delete o.$shadow
                });
            }
        },function(o,i){
            xui.UI.Widget.plugIn(i,o);
        });
        xui.UI.Widget.setDataModel({
            shadow:{
                ini:false,
                action: function(v){
                    var b=this.boxing();
                    if(v)b._shadow();
                    else b._unShadow();
                }
            },
            _shadowSize:this.SIZE
        });
    },
    Static:{
        SIZE:8,
        Templates:{
            tagName:'div',
            R:{
                tagName: 'div',
                style:'top:{shadowOffset}px;width:{shadowSize}px;right:-{pos}px;'
            },
            RB:{
                tagName: 'div',
                style:'height:{rbsize}px;width:{rbsize}px;right:-{pos}px;bottom:-{pos}px;'
            },
            B:{
                tagName: 'div',
                style: 'left:{shadowOffset}px;height:{shadowSize}px;bottom:-{pos}px;'
            }
        },
        Appearances:{
            KEY:{
               width:0,
               height:0,
               display:xui.browser.ie6?'inline':null,
               'font-size':xui.browser.ie6?0:null,
               'line-height':xui.browser.ie6?0:null
            },
            'B, RB, R':{
                position:'absolute',
                display:'block',
                'font-size':xui.browser.ie?0:null,
                'line-height':xui.browser.ie?0:null,
                'z-index':'-1'
            },
            B:{
                left:0,
                width:'100%',
                background: xui.browser.ie6 ? '' : xui.UI.$bg('bottom.png', 'repeat-x left bottom'),
                _filter: xui.UI.$ieBg('bottom.png')
            },
            RB:{
                background: xui.browser.ie6?'':xui.UI.$bg('right_bottom.png', 'left top'),
                _filter: xui.UI.$ieBg('right_bottom.png')
            },
            R:{
                top:0,
                height:'100%',
                background: xui.browser.ie6?'': xui.UI.$bg('right.png', 'repeat-y right top'),
                _filter: xui.UI.$ieBg('right.png')
            }
        },
        DataModel:{
            shadowSize:{
                ini:8,
                action: function(value){
                    var self=this,
                    shadowOffset =self.properties.shadowOffset;
                    self.getSubNode('R').cssRegion({width:value,top:shadowOffset,right:-value-shadowOffset});
                    self.getSubNode('RB').cssRegion({width:value,height:value,right:-value-shadowOffset+1,bottom:-value-shadowOffset+1});
                self.getSubNode('B').cssRegion({height:value,left:shadowOffset,bottom:-value-shadowOffset});
                }
            },
            shadowOffset:{
                ini:0,
                action: function(value){
                    this.boxing().setShadowSize(this.properties.shadowSize, true);
                }
            }
        },
        _prepareData:function(profile){
            var t = arguments.callee.upper.call(this, profile);
            t.pos = (parseInt(t.shadowSize,10)||0) + (parseInt(t.shadowOffset,10)||0);
            t.rbsize=t.shadowSize+4;
            return t;
        },
        LayoutTrigger:function(){
            // refresh height for IE6
            if(xui.browser.ie) this.getRoot().ieRemedy()
        } 
    }
});