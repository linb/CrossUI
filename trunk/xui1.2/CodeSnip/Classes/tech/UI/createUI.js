Class('App.tech_UI_createUI', 'xui.Com',{
    Instance:{
        events:{onReady:'_onready'}, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.ComboInput)
                .setHost(host,"ciMethods")
                .setLeft(140)
                .setTop(110)
                .setWidth(470)
                .setHeight(160)
                .setType("helpinput")
                .setMultiLines(true)
                .setItems([{"id":"item a", "caption":"item a"}, {"id":"item b", "caption":"item b"}, {"id":"item c", "caption":"item c"}, {"id":"item d", "caption":"item d"}])
            );
            
            append((new xui.UI.Div)
                .setHost(host,"divLabel")
                .setLeft(140)
                .setTop(10)
                .setWidth(470)
                .setHeight(40)
                .setHtml('How to create xui.UI components?')
            );

            append((new xui.UI.Pane)
                .setHost(host,"pane")
                .setLeft(140)
                .setTop(40)
                .setWidth(470)
                .setHeight(40)
                .setCustomStyle({"KEY":"border:solid 1px #ccc"})
            );
            
            append((new xui.UI.Button)
                .setHost(host,"button5")
                .setLeft(330)
                .setTop(360)
                .setCaption("Create Widget")
                .onClick("_clk")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _onready:function(){
            SPA=this;
            var code1='SPA.pane.append(\n\n    new xui.UI.Button(\n        {caption:"btn1",left:10,top:10},\n        {onClick:function(){alert("btn1")}}\n    ) \n\n);';
            this.ciMethods.setItems([
                {
                    id:code1,
                    caption:'1. new xui.UI.Button(properties,events,host,children,CS,CC,CB,CF)'
                },
                {
                    id:'SPA.pane.append(\n\n    new xui.UI.Button()\n    .setCaption("btn2")\n        .setLeft(10)\n        .setTop(10)\n        .onClick(function(){alert("btn2")}\n    ) \n\n);',
                    caption:'2. new xui.UI.Button().setXXX...'
                },
                {
                    id:'SPA.pane.append(\n\n    xui.create("Button",\n        {caption:"btn3",left:10,top:10},\n        {onClick:function(){alert("btn3")}}\n    ) \n\n);',
                    caption:'3. xui.create()'
                }
            ])
            .setValue(code1);
        }, 
        _clk:function(){
            var str=this.ciMethods.getUIValue();
            SPA.pane.removeChildren().setHtml('');
            try{
                eval(str);
            }catch(e){
                alert('Cant execute your code, check it first!');
                return;
            }
        }
    }
});