xui.Class("xui.MQTT","xui.absObj",{
    Instance:{
       _ini:xui.Timer.prototype._ini,
        _after_ini:function(prf){
            var prop=prf.properties, fun=function(){
                xui.asyRun(function(){
                    if(!prf.$inDesign && !(prf.host && prf.host.$inDesign)){
                        if(prop.autoConn){
                            prf.boxing().connect();
                        }
                    }
                });
            };
            if(xui.get(window,"Paho.Client"))fun();
            else{
                xui.include("Paho.Client",prop.libCDN,function(){
                        if(prf && prf.box && fun) fun();
                },null,false,{cache:true});
            }
        },
        destroy:function(){
            this.each(function(prf){
                if(prf.$inDesign)return;
                prf.boxing().disconnect();
                //free prf
                prf.__gc();
            });
        },
        getParent:xui.Timer.prototype.getParent,
        getChildrenId:xui.Timer.prototype.getChildrenId,

        connect:function(){
            var prf=this.get(0),prop=prf.properties,t,p,
                path=xui.str.trim(prop.path),
                server=xui.str.trim(prop.server);
            if(path.length && path[0]!="/")path="/"+path;

            t = prf.$mqtt = new window.Paho.Client(server, parseInt(prop.port,10), path, prop.clientId);
            t.onConnected = function(reconnect){
                if(prf.onConnSuccess)prf.boxing().onConnSuccess(prf,reconnect);
            };
            t.onConnectionLost = function(err){
                if(prf&&prf.box){
                    prf.boxing()._clear();
                    if(prf.onConnLost)prf.boxing().onConnLost(prf,err);
                }
            };
            t.onMessageDelivered = function(msgObj){
                if(prf.onMsgDelivered)prf.boxing().onMsgDelivered(prf,msgObj.payloadString,msgObj);
            };
            t.onMessageArrived = function(msgObj){
                if(prf.onMsgArrived)prf.boxing().onMsgArrived(prf,msgObj.payloadString,msgObj);
            };
            var opt={
                cleanSession: prop.cleanSession,
                useSSL: prop.useSSL,
                onSuccess:function(){
                    prf.$mqtt_connected=1;
                    prf.$mqtt_subed={};
                    if(prop && prop.autoSub){
                        xui.arr.each(prop.subscribers,function(sub){
                            var topic  = sub.topic || (sub+""),
                                opt=xui.isHash(sub)?xui.copy(sub):{};
                            delete opt.topic;
                            opt.qos=parseInt(opt.qos)||0;
                            prf.boxing().subscribe(topic, opt);
                        });
                    }
                },
                onFailure:function(e){
                    if(prf&&prf.box){
                        if(prf.onConnFailed)prf.boxing().onConnFailed(prf,e);
                        else xui.log(e.errorMessage+"["+e.errorCode+"]");
                        prf.boxing()._clear();
                    }
                }
            };
            if(p=prop.timeout)opt.timeout=p;
            if(p=prop.userName)opt.userName=p;
            if(p=prop.password)opt.password=p;
            if(p=prop.keepAliveInterval)opt.keepAliveInterval=p;
            if(prop.willTopic && prop.willMessage){
                var msg = new window.Paho.Message(prop.willTopic);
                msg.destinationName = prop.willMessage;
                msg.qos=parseInt(prop.willQos)||0;
                msg.retained=prop.willRetained;
                opt.willMessage=msg;
            }
            t.connect(opt);
        },
        _clear:function(){
            var prf=this.get(0),t=prf.$mqtt;
            if(t){
                delete t.onConnected;
                delete t.onConnectionLost;
                delete t.onMessageDelivered;
                delete t.onMessageArrived;
            }
            delete prf.$mqtt_connected;
            delete prf.$mqtt_subed;
            delete prf.$mqtt;
        },
        disconnect:function(){
            var prf=this.get(0),t=prf.$mqtt;
            if(t&&prf.$mqtt_connected){
                t.disconnect();
            }
            this._clear();
        },
        subscribe:function(topic, option){
            var prf=this.get(0),prop=prf.properties,t=prf.$mqtt;
            if(t&&prf.$mqtt_connected){
                var opt=xui.isHash(option)?xui.copy(option):{};
                if(!prf.$mqtt_subed)prf.$mqtt_subed={};
                opt.qos=parseInt(opt.qos)||0;
                opt.onSuccess=function(){
                    prf.$mqtt_subed[topic]=new Date;
                    if(prf.onSubSuccess)prf.boxing().onSubSuccess(prf,topic);
                };
                opt.onFailure=function(e){
                    delete prf.$mqtt_subed[topic];
                    if(prf.onSubFailed)prf.boxing().onSubFailed(prf,e,topic);
                };
                opt.timeout=prop.timeout;

                t.subscribe(topic, opt);
            }
        },
        unsubscribe:function(topic, option){
            var prf=this.get(0),prop=prf.properties,t=prf.$mqtt;
            if(t&&prf.$mqtt_connected && prf.$mqtt_subed && prf.$mqtt_subed[topic]){
                var opt=xui.isHash(option)?xui.copy(option):{};
                opt.onSuccess=function(){
                   delete prf.$mqtt_subed[topic];
                    if(prf.onUnsubSuccess)prf.boxing().onUnsubSuccess(prf,topic);
                };
                opt.onFailure=function(e){
                    if(prf.onUnsubFailed)prf.boxing().onUnsubFailed(prf,e,topic);
                };
                opt.timeout=prop.timeout;

                t.unsubscribe(topic, opt);
            }
        },
        publish:function(topic, payload, qos, retained){
            var prf=this.get(0),prop=prf.properties,t=prf.$mqtt;
            if(t&&prf.$mqtt_connected && prf.$mqtt_subed && prf.$mqtt_subed[topic]){
                t.publish(topic, typeof(payload)=='string'?payload:xui.stringify(payload), parseInt(qos)||0, retained||false);
            }
        }
    },
    Static:{
        _objectProp:{tagVar:1,propBinder:1,subscribers:1},
        _beforeSerialized:xui.Timer._beforeSerialized,
        DataModel:{
            dataBinder:null,
            dataField:null,
            libCDN:"https://cdn.jsdelivr.net/npm/paho-mqtt@1.1.0/paho-mqtt-min.js",

            autoConn:true,
            autoSub:true,
            subscribers:[],

            server:"broker.mqttdashboard.com",
            port:"8000",
            path:"mqtt",
            clientId:"xui_mqtt_client",

            timeout:30,
            userName:"",
            password:"",
            keepAliveInterval:60,
            cleanSession:true,
            useSSL:false,
            reconnect:true,

            willTopic:"",
            willMessage:"",
            willQos:{
                ini:0,
                listbox:[0,1,2]
            },
            willRetained:false
        },
        EventHandlers:{
            onConnSuccess: function(profile, reconnect){},
            onConnFailed: function(profile, error){},
            onConnLost: function(profile, error){},
            onSubSuccess: function(profile, topic){},
            onSubFailed: function(profile, error, topic){},
            onUnsubSuccess: function(profile, topic){},
            onUnsubFailed: function(profile, error, topic){},
            onMsgDelivered: function(profile, payloadString, msgObj){},
            onMsgArrived: function(profile, payloadString, msgObj){}
        }
    }
});