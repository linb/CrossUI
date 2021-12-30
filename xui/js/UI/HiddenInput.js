xui.Class("xui.UI.HiddenInput", ["xui.UI", "xui.absValue"] ,{
    Instance:{
        activate:function(){
            return this;
        },
        _setCtrlValue:function(value){
            if(xui.isNull(value) || !xui.isDefined(value))value='';
            return this.each(function(profile){
                profile.getRoot().attr('value',value+"");
            });
        },
        _getCtrlValue:function(){
            var node=this.getRoot(),
                v= (node&&!node.isEmpty()) ? node.attr('value') : "";
            if(v.indexOf("\r")!=-1)v=v.replace(/(\r\n|\r)/g, "\n");
            return v;
        }
    },
    Static:{
        _beforeSerialized:function(profile){
          profile = xui.UI._beforeSerialized(profile);
          var o=profile.properties;
          delete o.left;delete o.top;delete o.width;delete o.height;delete o.bottom;delete o.right;delete o.zIndex;delete o.position;
          return profile;
        },
        Templates:{
            className:'xui-display-none',
            style:'display:none',
            tagName : 'input',
            type:'hidden'
        },
        DataModel:{
            locked:null,
            required:null,
            display:null,
            visibility:null,
            rotate:null,
            showEffects:null,
            hideEffects:null,
            activeAnim:null,
            defaultFocus:null,
            hoverPop:null,
            hoverPopType:null,
            disabled:null,
            readonly:null,
            disableClickEffect:null,
            disableHoverEffect:null,
            dock:null,
            dockOrder:null,
            dockMargin:null,
            dockMinW:null,
            dockMinH:null,
            dockMaxW:null,
            dockMaxH:null,
            dockFloat:null,
            dockIgnore:null,
            dirtyMark:null,
            showDirtyMark:null,
            selectable:null,
            autoTips:null,
            tips:null,
            disableTips:null,
            renderer:null,
            className:null
        },
        EventHandlers:{
            beforeDirtyMark:null,
            onContextmenu:null,
            onDock:null,
            onLayout:null,
            onMove:null,
            onRender:null,
            onResize:null,
            onShowTips:null,
            beforeAppend:null,
            afterAppend:null,
            beforeRender:null,
            afterRender:null,
            beforeRemove:null,
            afterRemove:null,
            onHotKeydown:null,
            onHotKeypress:null,
            onHotKeyup:null
        },
        _ensureValue:function(profile, value){
            // ensure return string
            return ""+(xui.isSet(value)?value:"");
        }
    }
});