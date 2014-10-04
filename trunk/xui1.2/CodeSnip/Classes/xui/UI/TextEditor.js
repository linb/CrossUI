Class('App.xui_UI_TextEditor', 'xui.Com',{
    Instance:{
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.TextEditor)
                .setHost(host,"texteditor3")
                .setLeft(70)
                .setTop(60)
                .setWidth(228)
                .setHeight(206)
                .setBorder(true)
                .setValue("//tab: add 4 space\n//shift+tab: remove 4 space\n//enter: auto head spaces\n// { + enter: auto head spaces(add 4 more)\n// } : remove 4 spaces\n\nvar function(){\n    var a=2;\n}")
                .onChange("_texteditor3_onchange")
            );
            
            append((new xui.UI.TextEditor)
                .setHost(host,"texteditor4")
                .setLeft(368)
                .setTop(60)
                .setWidth(228)
                .setHeight(206)
                .setBorder(true)
                .setReadonly(true)
                .setValue("var function(){\n    //readonly\n}")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _texteditor3_onchange:function (profile, oV, nV) {
            xui.message('changed!');
        }
    }
});