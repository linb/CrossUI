Class('App', 'xui.Com',{
    Instance:{
        //Com events
        events:{"onReady":"_onready"},
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new xui.UI.Input)
                .setHost(host,"inCode")
                .setLeft(40)
                .setTop(40)
                .setWidth(200)
                .setHeight(410)
                .setMultiLines(true)
            );

            append((new xui.UI.Button)
                .setHost(host,"button29")
                .setLeft(250)
                .setTop(230)
                .setWidth(90)
                .setCaption("Build Form")
                .onClick("_button29_onclick")
            );

            append((new xui.UI.Button)
                .setHost(host,"button22")
                .setLeft(500)
                .setTop(460)
                .setCaption("Get form values")
                .onClick("_button22_onclick")
            );

            append((new xui.UI.Block)
                .setHost(host,"blockForm")
                .setLeft(350)
                .setTop(40)
                .setWidth(440)
                .setHeight(410)
            );

            append((new xui.UI.Div)
                .setHost(host,"div8")
                .setLeft(40)
                .setTop(20)
                .setHeight(20)
                .setHtml("Form Data :")
            );

            append((new xui.UI.Div)
                .setHost(host,"div9")
                .setLeft(350)
                .setTop(20)
                .setHeight(20)
                .setHtml("Output:")
            );

            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _button22_onclick:function (profile, e, value) {
            var db;
            if(!this.$formObj)return;
            if(!(db=this.$formObj.dbbinder))return;

            db=xui.DataBinder.getFromName(db);
            var data=db.updateDataFromUI().getData();

            if(!data)
                alert('Ensure all the fields are valid first!');
            else
                alert(_.serialize(data));
        },
        _onready:function () {
            SPA=this;
            SPA.inCode.setValue("{\n \"dbbinder\" : \"db1\",\n \"cols\" : 2,\n \"ctrls\" : [{\n \"id\" : \"label\",\n \"type\" : \"label\"\n },\n {\n \"id\" : \"button\",\n \"type\" : \"button\"\n },\n {\n \"id\" : \"checkbox\",\n \"type\" : \"checkbox\",\n \"value\" : true\n },\n {\n \"id\" : \"number\",\n \"type\" : \"number\",\n \"value\" : 20\n },\n {\n \"id\" : \"spin\",\n \"type\" : \"spin\",\n \"value\" : 20.01\n },\n {\n \"id\" : \"input\",\n \"type\" : \"input\",\n \"value\" : \"input\"\n },\n {\n \"id\" : \"combox\",\n \"type\" : \"combox\",\n \"value\" : \"combobox\"\n },\n {\n \"id\" : \"listbox\",\n \"type\" : \"listbox\"\n },\n {\n \"id\" : \"popbox\",\n \"type\" : \"popbox\",\n \"value\" : \"popbox\"\n },\n {\n \"id\" : \"cmdbox\",\n \"type\" : \"cmdbox\",\n \"value\" : \"cmdbox\"\n },\n {\n \"id\" : \"helpinput\",\n \"type\" : \"helpinput\",\n \"value\" : \"helpinput\"\n },\n {\n \"id\" : \"getter\",\n \"type\" : \"getter\",\n \"value\" : \"getter\"\n },\n {\n \"id\" : \"upload\",\n \"type\" : \"upload\"\n },\n {\n \"id\" : \"date\",\n \"type\" : \"date\",\n \"value\" : new Date(2008,11,9)\n },\n {\n \"id\" : \"time\",\n \"type\" : \"time\",\n \"value\" : \"09:10\"\n },\n {\n \"id\" : \"color\",\n \"type\" : \"color\",\n \"value\" : \"#00ff00\"\n },\n {\n \"id\" : \"textarea\",\n \"type\" : \"textarea\",\n \"value\" : \"text \\n area\"\n }]\n}\n");
        },
        _button29_onclick:function (profile, e, value) {
            var code=this.inCode.getUIValue();
            try{
                code=_.unserialize(code);
            }catch(e){
                alert(e);
                return;
            }
            this.$formObj=code;
            this.buildForm(code,this.blockForm.getSubNode('PANEL'));
        },
        buildForm:function(form, parent, cols){
            var widget, type, ns=[], nodes=[], t, strA=[],
                idc=new _.id;
                databinder = form.dbbinder|| (form.dbbinder='db'+_()),
                cols=cols||form.cols||2;
                parent=parent?xui(parent):xui('body');

            // clear data
            var dtbd=xui.DataBinder.getFromName(databinder);
            if(dtbd)dtbd.setData();

            _.each(form.ctrls,function(o){
                if(!o.id)o.id=idc.next();

                type=o.type||'input';
                ns.push(t=[o.label||o.id||""]);

                if(type=='checkbox')
                    widget=new xui.UI.CheckBox(o.properties);
                else if(type=='label'){
                    if(!o.properties)
                        o.properties={caption:o.caption||o.label||o.id}
                    widget=new xui.UI.Label(o.properties);
                }else if(type=='button')
                    widget=new xui.UI.Button(o.properties);
                else{
                    if(type=='textarea'){
                        o.properties=o.properties||{};
                        o.properties.height=o.properties.height||120;
                    }
                    widget=new xui.UI.ComboInput(o.properties);
                }

                if(widget.setDataBinder)
                    widget.setDataBinder(databinder).setDataField(o.id);

                t[1]=widget.get(0);

                switch(type){
                    case 'number':
                        widget.setType('none').setCustomStyle('INPUT',"text-align:right;");
                        break;
                    case 'progress':
                        widget.setType('none').setValueFormat("^(0([\\.]\\d*[0-9]+)|0|1)$").setCustomStyle('INPUT',"text-align:right;");
                        break;
                    case 'input':
                        widget.setType('none');
                        break;
                    case 'textarea':
                        widget.setType('none').setMultiLines(true);
                        break;
                    case 'listbox':
                    case 'combobox':
                    case 'helpinput':
                        widget.setType(type);
                        if(o.listKey)
                            widget.setListKey(o.listKey);
                        else if(o.items)
                            widget.setItems(o.items);
                        break;
                    case 'time':
                    case 'date':
                    case 'color':
                        widget.setType(type);
                        break;
                    case 'spin':
                        widget.setType(type);
                        break;
                    case 'getter':
                    case 'popbox':
                    case 'cmdbox':
                        widget.setType(type);
                        if(o.beforeComboPop)
                            widget.beforeComboPop(o.beforeComboPop);
                        break;
                }

                if(widget.setValue){
                    if('value' in o)
                        widget.setValue(o.value);
                    if('uiValue' in o)
                        widget.setUIValue(o.uiValue);
                }
                if(widget.setReadonly){
                    if('readonly' in o)
                        widget.setReadonly(o.readonly);
                }
                if(widget.setDisabled){
                    if('disabled' in o)
                        widget.setDisabled(o.disabled);
                }
                if('valueFormat' in o){
                    if(typeof o.valueFormat == 'function')
                        if(widget.beforeFormatCheck)
                            widget.beforeFormatCheck(o.valueFormat);
                    else
                        if(widget.setValueFormat)
                            widget.setValueFormat(o.valueFormat);
                }
            });


            _.arr.each(ns,function(arr){
                nodes.push(arr[1]);
            });
            nodes=xui.UI.pack(nodes,false);
            nodes.setPosition('relative');
            form.ui=nodes;
            strA.push('<table cellspacing="4" style="border-spacing:10px;border-collapse:separate;">');
            for(var i=0;i<ns.length;i+=cols){
                strA.push('<tr>');
                for(var j=0; j<cols; j++)
                    strA.push('<td align="right" style="text-decoration:underline;">'+ (ns[i+j]?ns[i+j][0]:"") +"</td><td>"+ (ns[i+j]?ns[i+j][1].toHtml():"") +'</td>');
                strA.push('</tr>');
            }
            strA.push('</table>');
            var div=xui.Dom.getEmptyDiv();
            div.html(strA.join(''));
            nodes.render(true);
            parent.html('',true);
            parent.append(div.first());

            ns.length=nodes.length=strA.length=0;
        }
    }
});