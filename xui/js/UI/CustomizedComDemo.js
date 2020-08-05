xui.Class("xui.UI.CustomizedComDemo","xui.UI",{
    Initialize:function(){
      console.log("Initialize for xui.Class", "before the class created");
    },
    Instance:{
        initialize:function(){
          console.log("Initialize for the instance", "before the instance created");
        }
        //, other functions for instance
    },
    Static:{
        // controllable DOM struct
        Templates:{
            tagName:'div',
            className:'{_className}',
            style:'{_style}',
            DEMO:{
                tagName: 'div',
                text: '{text}'
            }
        },
        // for CSS class of the DOM node
        Appearances:{
            // for root DOM node
            KEY:{
                overflow:'hidden',
                background:'#cdcdcd'
            },
            // for other DOM nodes
            DEMO:{
                position:'absolute',
                border:'dotted 1px #444',
                background:'#808080'
            }
        },
        // DOM node event handlers
        Behaviors:{
            // PanelKeys:['KEY'],
            // DraggableKeys:['FCELL'],
            // NoDraggableKeys:['TOGGLE'],
            // DroppableKeys:['KEY'],
            // HoverEffected:{KEY:'KEY',KEY:['KEY','DROP']},
            // ClickEffected:{KEY:'KEY'},
            // HotKeyAllowed:true,
            // NavKeys:{KEY:1},
            // NoTips:["GROUP","HANDLER"],

            // event handlers for root
            KEY:{
              onClick:function(profile, event, src){
                xui.message("You clicked the root node");
              }
            },
            // event handlers for other nodes
            DEMO:{
              onClick:function(profile, event, src){
                xui.message("You clicked the demo node");
                profile.boxing().fireEvent("onClickDemo");
              }
            }
        },
        // data prop
        DataModel:{
            // to remove a prop
            // propName:null,

            // to add a prop
            text:{
                ini:'default text',
                action:function(value){
                    this.getSubNode('DEMO').html( (value||value===0) ? ("<hr />" + value + "<hr />") : "" );
                }
                /*,
                // getPropName ( will be coverred by the same name in Instance )
                get:function(){
                },
                // setPropName ( will be coverred by the same name in Instance )
                set:function(data){
                }
                */
            }
        },
        // event for the xui.Class
        EventHandlers:{
            onClickDemo:function(profile){}
        },

        // tiggers
        RenderTrigger:function(){
            // when it's rendered, only once
            console.log("RenderTrigger");
        },
        LayoutTrigger:function(){
            // for ecch layout, after render + after append to dom
            console.log("LayoutTrigger");
        },

        // other tools
        _onresize:function(profile,width,height){
            console.log("_onresize");
            // to ajust size related
            profile.getSubNode('DEMO').cssRegion({
              left : '10%',
              top : '10%',
              width : width?'80%':null,
              height : height?'80%':null
            });
        },
        // to adjust data for filling the template
         _prepareData:function(profile, data){
            var data = arguments.callee.upper.call(this, profile, data);
            data.text = (data.text||data.text===0) ? ("<hr />" + data.text + "<hr />") : "";
            return data;
         }
    }
});