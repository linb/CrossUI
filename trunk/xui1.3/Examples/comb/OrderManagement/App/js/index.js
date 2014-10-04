Class('App', 'xui.Com',{
    Instance:{
        $v1:null,
        $v2:null,
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.DataBinder)
                .setHost(host,"dbOrder")
                .setName("order")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"block1")
                .setDock("top")
                .setHeight(70)
            );
            
            host.block1.append((new xui.UI.Div)
                .setHost(host,"div18")
                .setLeft(10)
                .setTop(1)
                .setWidth("62")
                .setHeight("62")
                .setHtml("<img src='img/001.gif'>")
            );
            
            host.block1.append((new xui.UI.Div)
                .setHost(host,"div19")
                .setLeft(90)
                .setTop(0)
                .setWidth(470)
                .setHeight(60)
                .setHtml("<font size=8>Order Management</font>")
            );
            
            append((new xui.UI.Block)
                .setHost(host,"block3")
                .setDock("left")
                .setWidth(160)
            );
            
            host.block3.append((new xui.UI.Stacks)
                .setHost(host,"stacks1")
                .setItems([{"id":"a", "caption":"Task", "tips":"Task - Orders - Customers", "image":"img/module.gif"}, {"id":"b", "caption":"Set up", "tips":"item b", "image":"img/module.gif"}, {"id":"c", "caption":"About", "tips":"item c", "image":"img/module.gif"}])
                .setLeft(0)
                .setTop(0)
                .setValue("a")
            );
            
            host.stacks1.append((new xui.UI.Div)
                .setHost(host,"div22")
                .setLeft(10)
                .setTop(10)
                .setWidth(130)
                .setHtml("<font color=red>All copy right reserved<br>xui<br>2005-2011</font>")
            , 'c');
            
            host.stacks1.append((new xui.UI.Button)
                .setHost(host,"button12")
                .setLeft(10)
                .setTop(20)
                .setWidth(110)
                .setPosition("relative")
                .setCaption("Orders")
                .setImage("img/order.gif")
                .setVAlign("middle")
                .onClick("_button12_onclick")
            , 'a');
            
            host.stacks1.append((new xui.UI.Button)
                .setHost(host,"button13")
                .setLeft(10)
                .setTop(60)
                .setWidth(110)
                .setCaption("Customers")
                .setImage("img/customer.gif")
                .onClick("_button13_onclick")
            , 'a');
            
            host.stacks1.append((new xui.UI.Label)
                .setHost(host,"label67")
                .setLeft(10)
                .setTop(10)
                .setWidth(110)
                .setCaption("Not implemented")
                .setHAlign("left")
            , 'b');
            
            append((new xui.UI.Block)
                .setHost(host,"block6")
                .setDock("fill")
                .setLeft(450)
                .setTop(310)
            );
            
            host.block6.append((new xui.UI.Panel)
                .setHost(host,"dialog7")
                .setLeft(0)
                .setTop(0)
                .setCaption("Orders")
                .setImage("img/order.gif")
            );
            
            host.dialog7.append((new xui.UI.Label)
                .setHost(host,"label4")
                .setLeft(30)
                .setTop(320)
                .setWidth(110)
                .setCaption("Ship Date:")
                .setHAlign("left")
            );
            
            host.dialog7.append((new xui.UI.Label)
                .setHost(host,"label8")
                .setLeft(30)
                .setTop(50)
                .setWidth(110)
                .setCaption("Ship Method:")
                .setHAlign("left")
            );
            
            host.dialog7.append((new xui.UI.Label)
                .setHost(host,"label13")
                .setLeft(370)
                .setTop(20)
                .setCaption("Order ID:")
                .setHAlign("left")
            );
            
            host.dialog7.append((new xui.UI.Label)
                .setHost(host,"label10")
                .setLeft(370)
                .setTop(50)
                .setWidth(140)
                .setCaption("Order Date:")
                .setHAlign("left")
            );
            
            host.dialog7.append((new xui.UI.Label)
                .setHost(host,"label6")
                .setLeft(370)
                .setTop(80)
                .setWidth(110)
                .setCaption("PO Number:")
                .setHAlign("left")
            );
            
            host.dialog7.append((new xui.UI.Label)
                .setHost(host,"label7")
                .setLeft(30)
                .setTop(80)
                .setCaption("Employee:")
                .setHAlign("left")
            );
            
            host.dialog7.append((new xui.UI.Label)
                .setHost(host,"label37")
                .setLeft(30)
                .setTop(350)
                .setWidth(100)
                .setCaption("Sale Tax Rate")
                .setHAlign("left")
            );
            
            host.dialog7.append((new xui.UI.Label)
                .setHost(host,"label11")
                .setLeft(30)
                .setTop(20)
                .setCaption("Customer:")
                .setHAlign("left")
            );
            
            host.dialog7.append((new xui.UI.Label)
                .setHost(host,"label14")
                .setLeft(370)
                .setTop(320)
                .setWidth(110)
                .setCaption("Order Subtotal:")
                .setHAlign("left")
            );
            
            host.dialog7.append((new xui.UI.Label)
                .setHost(host,"label38")
                .setLeft(370)
                .setTop(410)
                .setWidth(110)
                .setCaption("Order total:")
                .setHAlign("left")
            );
            
            host.dialog7.append((new xui.UI.Label)
                .setHost(host,"Sales Tax:")
                .setLeft(370)
                .setTop(350)
                .setCaption("Shipping & Handle:")
                .setHAlign("left")
            );
            
            host.dialog7.append((new xui.UI.Label)
                .setHost(host,"label9")
                .setLeft(370)
                .setTop(380)
                .setWidth(100)
                .setCaption("Sale Tax:")
                .setHAlign("left")
            );
            
            host.dialog7.append((new xui.UI.Input)
                .setHost(host,"ipt_orders_tax_rate")
                .setDataBinder("order")
                .setDataField("tax_rate")
                .setLeft(130)
                .setTop(350)
                .setWidth(140)
            );
            
            host.dialog7.append((new xui.UI.Input)
                .setHost(host,"ipt_orders_handle")
                .setDataBinder("order")
                .setDataField("handle")
                .setLeft(480)
                .setTop(350)
                .setWidth(140)
            );
            
            host.dialog7.append((new xui.UI.ComboInput)
                .setHost(host,"cbi_orders_employee")
                .setDataBinder("order")
                .setDataField("employee")
                .setLeft(130)
                .setTop(80)
                .setWidth(140)
                .setType("listbox")
                .setItems([{"id":"a", "caption":"Cok,Oliver"}, {"id":"b", "caption":"Jimi,Larry"}, {"id":"c", "caption":"Steven, Du"}, {"id":"d", "caption":"Tracy, Tang"}])
                .setValue(null)
            );
            
            host.dialog7.append((new xui.UI.ComboInput)
                .setHost(host,"cbi_orders_ship_method")
                .setDataBinder("order")
                .setDataField("shipment")
                .setLeft(130)
                .setTop(50)
                .setWidth(140)
                .setType("listbox")
                .setItems([{"id":"1", "caption":"Federal Express"}, {"id":"2", "caption":"UPS Ground"}, {"id":"3", "caption":"UPS Mail"}])
                .setValue(null)
            );
            
            host.dialog7.append((new xui.UI.ComboInput)
                .setHost(host,"cbi_orders_customer")
                .setDataBinder("order")
                .setDataField("customer")
                .setLeft(130)
                .setTop(20)
                .setWidth(140)
                .setType("listbox")
                .setItems([{"id":"1", "caption":"Mike,Silla"}, {"id":"2", "caption":"Rose,Kim"}, {"id":"3", "caption":"Betty,Jin"}])
            );
            
            host.dialog7.append((new xui.UI.Input)
                .setHost(host,"ipt_orders_order_id")
                .setDataBinder("order")
                .setDataField("order_id")
                .setLeft(480)
                .setTop(20)
                .setWidth(140)
            );
            
            host.dialog7.append((new xui.UI.PageBar)
                .setHost(host,"pagebar1")
                .setLeft(30)
                .setTop(420)
                .setWidth('auto')
                .setHeight(20)
                .setCaption("<font color=red>Click No To See Orders</font>")
                .setValue("1:1:3")
                .onClick("_pagebar1_onclick")
            );
            
            host.dialog7.append((new xui.UI.Input)
                .setHost(host,"ipt_orders_subtotal")
                .setDisabled(true)
                .setLeft(480)
                .setTop(320)
                .setWidth(140)
            );
            
            host.dialog7.append((new xui.UI.Input)
                .setHost(host,"ipt_orders_order_date")
                .setDataBinder("order")
                .setDataField("order_date")
                .setLeft(480)
                .setTop(50)
                .setWidth(140)
            );
            
            host.dialog7.append((new xui.UI.Input)
                .setHost(host,"ipt_orders_po_number")
                .setDataBinder("order")
                .setDataField("po_number")
                .setLeft(480)
                .setTop(80)
                .setWidth(140)
            );
            
            host.dialog7.append((new xui.UI.ComboInput)
                .setHost(host,"dpi_orders_ship_date")
                .setDataBinder("order")
                .setLeft(130)
                .setTop(320)
                .setWidth(140)
                .setType("date")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
            );
            
            host.dialog7.append((new xui.UI.TreeGrid)
                .setHost(host,"tgd_orders_details")
                .setDock("none")
                .setDockMargin({"left":0, "top":0, "right":0, "bottom":0})
                .setLeft(30)
                .setTop(200)
                .setWidth(590)
                .setHeight(110)
                .setHeader([{"id":"col1", "caption":"Product", "type":"input", "width":120}, {"id":"col4", "caption":"quantity", "type":"input", "width":100}, {"id":"col2", "caption":"Unit Price", "type":"number", "format":"^-?\\d\\d*$", "width":100}, {"id":"col3", "caption":"Discount", "type":"number", "format":"^-?\\d\\d*$", "width":100}, {"id":"col5", "caption":"Tatal Price", "type":"number", "format":"^-?\\d\\d*$", "width":120}])
                .setRows([])
            );
            
            host.dialog7.append((new xui.UI.Input)
                .setHost(host,"ipt_orders_total")
                .setDisabled(true)
                .setLeft(480)
                .setTop(410)
                .setWidth(140)
            );
            
            host.dialog7.append((new xui.UI.CheckBox)
                .setHost(host,"cbi_shipment_received")
                .setDataBinder("order")
                .setDataField("shipment_received")
                .setLeft(30)
                .setTop(380)
                .setWidth(150)
                .setCaption("Shipment Received")
            );
            
            host.dialog7.append((new xui.UI.Input)
                .setHost(host,"ipt_orders_tax")
                .setDisabled(true)
                .setLeft(480)
                .setTop(380)
                .setWidth(140)
            );
            
            host.dialog7.append((new xui.UI.Group)
                .setHost(host,"group1")
                .setLeft(30)
                .setTop(100)
                .setWidth(590)
                .setHeight(90)
                .setCaption("Notes")
            );
            
            host.group1.append((new xui.UI.TextEditor)
                .setHost(host,"texteditor8")
                .setDock("fill")
                .setDockMargin({"left":0, "top":0, "right":0, "bottom":3})
                .setPosition("relative")
            );
            
            host.block6.append((new xui.UI.Panel)
                .setHost(host,"dialog14")
                .setLeft(0)
                .setTop(0)
                .setCaption("Customers")
                .setImage("img/customer.gif")
            );
            
            host.dialog14.append((new xui.UI.Tabs)
                .setHost(host,"tabs2")
                .setItems([{"id":"a", "caption":"Customer", "tips":"Customer Info"}, {"id":"b", "caption":"Order Summary & Details", "tips":"Order Info"}])
                .setDockMargin({"left":4, "top":4, "right":4, "bottom":4})
                .setLeft(0)
                .setTop(0)
                .setValue("a")
            );
            
            host.tabs2.append((new xui.UI.Label)
                .setHost(host,"label43")
                .setLeft(330)
                .setTop(50)
                .setWidth(110)
                .setCaption("Phone Number")
                .setHAlign("left")
            , 'a');
            
            host.tabs2.append((new xui.UI.Label)
                .setHost(host,"label51")
                .setLeft(20)
                .setTop(250)
                .setWidth(110)
                .setCaption("Shipments Address:")
                .setHAlign("left")
            , 'a');
            
            host.tabs2.append((new xui.UI.Label)
                .setHost(host,"label52")
                .setLeft(20)
                .setTop(140)
                .setWidth(110)
                .setCaption("Bill Address:")
                .setHAlign("left")
            , 'a');
            
            host.tabs2.append((new xui.UI.Label)
                .setHost(host,"label45")
                .setLeft(330)
                .setTop(110)
                .setWidth(110)
                .setCaption("Notes:")
                .setHAlign("left")
            , 'a');
            
            host.tabs2.append((new xui.UI.Label)
                .setHost(host,"label46")
                .setLeft(330)
                .setTop(80)
                .setWidth(110)
                .setCaption("Fax Number:")
                .setHAlign("left")
            , 'a');
            
            host.tabs2.append((new xui.UI.Label)
                .setHost(host,"label44")
                .setLeft(20)
                .setTop(20)
                .setWidth(110)
                .setCaption("Company Name:")
                .setHAlign("left")
            , 'a');
            
            host.tabs2.append((new xui.UI.Label)
                .setHost(host,"label48")
                .setLeft(20)
                .setTop(110)
                .setWidth(110)
                .setCaption("Email:")
                .setHAlign("left")
            , 'a');
            
            host.tabs2.append((new xui.UI.Label)
                .setHost(host,"label47")
                .setLeft(330)
                .setTop(20)
                .setWidth(110)
                .setCaption("Web Site:")
                .setHAlign("left")
            , 'a');
            
            host.tabs2.append((new xui.UI.Label)
                .setHost(host,"label49")
                .setLeft(20)
                .setTop(80)
                .setWidth(110)
                .setCaption("Last Name:")
                .setHAlign("left")
            , 'a');
            
            host.tabs2.append((new xui.UI.Label)
                .setHost(host,"label50")
                .setLeft(20)
                .setTop(50)
                .setWidth(110)
                .setCaption("First Name:")
                .setHAlign("left")
            , 'a');
            
            host.tabs2.append((new xui.UI.Group)
                .setHost(host,"group7")
                .setLeft(10)
                .setTop(10)
                .setWidth(600)
                .setHeight(150)
                .setCaption("Orders - Double Click Row Header To See Details")
            , 'b');
            
            host.group7.append((new xui.UI.TreeGrid)
                .setHost(host,"treegrid14")
                .setDockMargin({"left":4, "top":4, "right":4, "bottom":4})
                .setHeader([{"id":"col1", "caption":"Order ID", "type":"input", "width":160}, {"id":"col4", "caption":"Ship Method", "type":"input", "width":100}, {"id":"col2", "caption":"Order Date", "type":"number", "format":"^-?\\d\\d*$", "width":100}, {"id":"col3", "caption":"Employee", "type":"number", "format":"^-?\\d\\d*$", "width":100}, {"id":"col5", "caption":"PO Name", "type":"number", "format":"^-?\\d\\d*$", "width":120}])
                .setRows([])
                .onDblclickRow("_treegrid14_ondblclickrow")
            );
            
            host.tabs2.append((new xui.UI.Input)
                .setHost(host,"ipt_customer_email")
                .setLeft(140)
                .setTop(110)
                .setWidth(170)
            , 'a');
            
            host.tabs2.append((new xui.UI.Input)
                .setHost(host,"ipt_customer_last_name")
                .setLeft(140)
                .setTop(80)
                .setWidth(170)
            , 'a');
            
            host.tabs2.append((new xui.UI.Input)
                .setHost(host,"ipt_customer_company")
                .setLeft(140)
                .setTop(20)
                .setWidth(170)
            , 'a');
            
            host.tabs2.append((new xui.UI.Input)
                .setHost(host,"ipt_customer_first_name")
                .setLeft(140)
                .setTop(50)
                .setWidth(170)
            , 'a');
            
            host.tabs2.append((new xui.UI.TextEditor)
                .setHost(host,"tdt_customer_bill_addr")
                .setLeft(20)
                .setTop(160)
                .setWidth(280)
                .setHeight(70)
            , 'a');
            
            host.tabs2.append((new xui.UI.TextEditor)
                .setHost(host,"texteditor19")
                .setLeft(330)
                .setTop(140)
                .setWidth(280)
            , 'a');
            
            host.tabs2.append((new xui.UI.TextEditor)
                .setHost(host,"tdt_customer_ship_addr")
                .setLeft(20)
                .setTop(270)
                .setWidth(280)
                .setHeight(70)
            , 'a');
            
            host.tabs2.append((new xui.UI.Input)
                .setHost(host,"ipt_customer_fax")
                .setLeft(440)
                .setTop(80)
                .setWidth(170)
            , 'a');
            
            host.tabs2.append((new xui.UI.Input)
                .setHost(host,"ipt_customer_web")
                .setLeft(440)
                .setTop(20)
                .setWidth(170)
            , 'a');
            
            host.tabs2.append((new xui.UI.Input)
                .setHost(host,"ipt_customer_phone")
                .setLeft(440)
                .setTop(50)
                .setWidth(170)
            , 'a');
            
            host.tabs2.append((new xui.UI.Group)
                .setHost(host,"group8")
                .setLeft(10)
                .setTop(170)
                .setWidth(600)
                .setHeight(200)
                .setCaption("Order Details")
            , 'b');
            
            host.group8.append((new xui.UI.TreeGrid)
                .setHost(host,"treegrid15")
                .setDockMargin({"left":4, "top":4, "right":4, "bottom":4})
                .setHeader([{"id":"col1", "caption":"Product", "type":"input", "width":160}, {"id":"col4", "caption":"quantity", "type":"input", "width":100}, {"id":"col2", "caption":"Unit Price", "type":"number", "format":"^-?\\d\\d*$", "width":100}, {"id":"col3", "caption":"Discount", "type":"number", "format":"^-?\\d\\d*$", "width":100}, {"id":"col5", "caption":"Tatal Price", "type":"number", "format":"^-?\\d\\d*$", "width":120}])
                .setRows([])
            );
            
            host.dialog14.append((new xui.UI.PageBar)
                .setHost(host,"pagebar11")
                .setLeft(20)
                .setTop(410)
                .setWidth(110)
                .setCaption("<font color=red>Click No To See Customers</font>")
                .setValue("1:1:4")
                .onClick("_pagebar11_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _button9_onclick:function (profile, e, value) {
            this.dialog7.setZIndex(2);
            this.dialog14.setZIndex(1);

        }, 

        _ajax1_onrequestok:function (response, rspType, threadId) {
            //xui.message(SPA);
            var obj =response;
            SPA.global_data_order = obj;

            var idx = parseInt(SPA.tgd_orders_details.getTag())-1;
            SPA.tgd_orders_details.setRows(obj[idx].order_details);

            SPA.dbOrder.setData(obj[idx]).updateDataToUI();

            SPA._calculateTotal(obj[idx]);
        }, 
        _ajax2_onrequestok:function (response, rspType, threadId) {
            //xui.message(SPA);
            var obj = response;
            var a = SPA.pagebar11.getValue().split(':');
            var idx = a[1]-1;
            SPA._bindCustomerData(obj[idx]);
            SPA._bindOrdersDataByCustomer(obj[idx].company_name);
        }, 
        _load1:function(key){
            if(SPA.$v1==key)return;
            SPA.$v1=key;
            var ns=this;
            ns.tgd_orders_details.setTag(key);
            xui.Thread.observableRun(function(threadid){
                xui.Ajax('Data/Orders.js',null,ns._ajax1_onrequestok,null,threadid).start();
            });
        },  
        _pagebar1_onclick:function (profile, page) {
            profile.boxing().setPage(page);
            this._load1(page);
        }, 
        _onReady:function(page, threadid){
            SPA = page;
        }, 
        events:{"onReady":"_onReady", "onRender":"_onrender"}, 

        _button12_onclick:function (profile, e, value) {
            this.dialog7.show();
            this.dialog14.hide();
            SPA._load1(SPA.$v1||'1');
        }, 
        _button13_onclick:function (profile, e, value) {
            this.dialog7.hide();
            this.dialog14.show();
            SPA._load2(SPA.$v2||'1');
        }, 

        _bindCustomerData:function(obj){
            //alert(this.cbi_orders_customer);
            this.ipt_customer_company.setValue(obj["company_name"]);
            this.ipt_customer_first_name.setValue(obj["first_name"]);
            this.ipt_customer_last_name.setValue(obj["last_name"]);
            this.ipt_customer_email.setValue(obj["email"]);
            this.ipt_customer_web.setValue(obj["web_site"]);
            this.ipt_customer_phone.setValue(obj["phone_number"]);

            this.ipt_customer_fax.setValue(obj["fax_number"]);
            this.tdt_customer_bill_addr.setValue(obj["bill_address"]);
            this.tdt_customer_ship_addr.setValue(obj["shipment_address"]);

        }, 
        _bindOrdersDataByCustomer:function(custName){
            //alert(SPA.global_data_order.length);
            var ar = new Array();

            for(var i = 0; i < SPA.global_data_order.length;i++){
                //alert(custName + " # " + SPA.global_data_order[i].customer);
                if(custName==SPA.global_data_order[i].customer){

                    ar.push({"id" : SPA.global_data_order[i].order_id,
                    cells:[SPA.global_data_order[i].order_id,
                    SPA.global_data_order[i].shipment,SPA.global_data_order[i].order_date,
                    SPA.global_data_order[i].employee,SPA.global_data_order[i].po_number]});
                }
            }
            SPA.treegrid14.setRows(ar);
            SPA.treegrid15.setRows([]);
        }, 
        _calculateTotal:function(obj){
            var t = 0.0;
            for(var i = 0;i<obj.order_details.length;i++){
                t += obj.order_details[i].cells[1].value;
            }
            this.ipt_orders_subtotal.setValue(t);
            //ipt_orders_tax
            this.ipt_orders_total.setValue(t + this.ipt_orders_tax.getValue());
        }, 
        _load2:function(key){
            if(SPA.global_data_customer){
                var idx = parseInt(a[1]);
                SPA.tgd_orders_details.setRows(SPA.global_data_id[idx].order_details);

                SPA.dbOrder.setData(SPA.global_data_customer[idx]).updateDataToUI();

                this._calculateTotal(SPA.global_data_customer[idx]);
            }else{
                var ns=this;
                xui.Thread.observableRun(function(threadid){
                    xui.Ajax('Data/Customers.js',null,ns._ajax2_onrequestok,null,threadid).start();
                });
            }
        },
        _pagebar11_onclick:function (profile, page) {
            profile.boxing().setPage(page);
            this._load2(page);
        }, 
        _treegrid14_ondblclickrow:function (profile, row, e, src) {
            for(var i = 0; i < SPA.global_data_order.length;i++){
                //alert(custName + " # " + SPA.global_data_order[i].customer);
                if(row.id==SPA.global_data_order[i].order_id){
                    this.treegrid15.setRows(SPA.global_data_order[i].order_details);
                }
            }
        }, 
        _onrender:function () {
            this._button12_onclick();
        }
    }
});