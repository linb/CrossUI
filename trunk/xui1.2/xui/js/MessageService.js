Class("xui.MessageService",null,{
    Instance:{
        initialize:function(){
            this.$subscribers={};
        },
        subscribe:function(topic, subscriber, receiver, asy){
            if(topic===null||topic===undefined||subscriber===null||subscriber===undefined||typeof receiver!='function')return;
            var c=this.$subscribers,i;
            c[topic]=c[topic]||[];
            i=_.arr.subIndexOf(c[topic],"id",subscriber);
            if(i!=-1)_.arr.removeFrom(c[topic],i);
            return c[topic].push({id:subscriber,receiver:receiver,asy:!!asy});
        },
        unsubscribe:function(topic, subscriber){
            var c=this.$subscribers,i;
            if(!subscriber){
                if(topic===null||topic===undefined)
                    c={};
                else
                    delete c[topic];
            }else if(c[topic]){
                i=_.arr.subIndexOf(c[topic],"id",subscriber);
                if(i!=-1)_.arr.removeFrom(c[topic],i);
            }
        },
        publish:function(topic, args, scope){
            var c=this.$subscribers;
            if(topic===null||topic===undefined){
                for(var topic in c){
                    _.arr.each(c[topic],function(o){
                        if(o.asy)
                            _.asyRun(o.receiver, 0, args, scope);
                        else
                            return _.tryF(o.receiver, args, scope, true);
                    });
                }
            }else if(c[topic]){
                _.arr.each(c[topic],function(o){
                    if(o.asy)
                        _.asyRun(o.receiver, 0, args, scope);
                    else
                        return _.tryF(o.receiver, args, scope, true);
                });
            }
        },
        getSubscribers:function(topic){
            return (topic===null||topic===undefined)?this.$subscribers:this.$subscribers[topic];
        }
    }
});