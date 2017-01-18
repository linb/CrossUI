
xui.Class('App.tech_UI_showUI', 'xui.Module',{
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
                .setHeight(120)
                .setType("helpinput")
                .setMultiLines(true)
                .setItems([])
            );
            
            append((new xui.UI.Div)
                .setHost(host,"divLabel")
                .setLeft(140)
                .setTop(10)
                .setWidth(470)
                .setHeight(40)
                .setHtml('How to show xui.UI components to DOM?')
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
                .setCaption("To show widget")
                .onClick("_clk")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _onready:function(){
            SPA=this;
            var code1='SPA.pane.append(\n    new xui.UI.Button({caption:"btn1"})\n)';
            this.ciMethods.setItems([
                {
                    id:code1,
                     caption:'1. Using "[container widget].append"'
                },
                {
                    id:'SPA.pane.getRoot().append(\n    new xui.UI.Button({caption:"btn2"})\n)',
                     caption:'2. Using "[xui.Dom object].append/prepend/addNext/addPrev"'
                },
                {
                    id:' var div=xui.create("div").cssSize({width:100,height:22}); \n SPA.pane.getRoot().append(div);\n new xui.UI.Button({caption:"btn2"}).renderOnto(div);',
                     caption:'3. Using "[widget].renderOnto"'
                },
                {
                    id:' var btn=new xui.UI.Button({caption:"btn3"}),\n       str=btn.toHtml(); \n SPA.pane.getRoot().html(str); \n btn.render(true);',
                    caption:'4. Using html string'
                },
                {
                    id:'(new xui.UI.Button({caption:"btn4"})).show(SPA.pane); \n xui.create("Button",{caption:"btn5"}).show(SPA.pane,null,100,10);',
                    caption:'5. Using show function'
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
            alert(xui.serialize(SPA.pane));
        }
    }
});