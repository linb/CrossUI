Class("xui.UI.HiddenInput", ["xui.UI", "xui.absValue"] ,{
    Instance:{
        activate:function(){
            return this;
        },
        _setCtrlValue:function(value){
            if(_.isNull(value) || !_.isDefined(value))value='';
            return this.each(function(profile){
                profile.getSubNode('KEY').attr('value',value+"");
            });
        },
        _getCtrlValue:function(){
            var node=this.getSubNode('KEY');
            if(v.indexOf("\r")!=-1)v=v.replace(/(\r\n|\r)/g, "\n");
            return v;
        }
    },
    Static:{
        $initRootHidden:true,
        Templates:{
            className:'xui-display-none',
            style:'display:none',
            tagName:'input',
            type:'hidden'
        },
        DataModel:{
            locked:null,
            required:null,
            dataBinder:null,
            dataField:null,
            display:null,
            visibility:null,
            position:null,
            left:null,
            top:null,
            right:null,
            bottom:null,
            width:null,
            height:null,
            rotate:null,
            showEffects:null,
            hideEffects:null,
            activeAnim:null,
            tabindex:null,
            zIndex:null,
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
            return ""+(_.isSet(value)?value:"");
        }
    }
});