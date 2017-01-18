xui.Class("xui.Template.SButton","xui.Template",{
    Constructor:function(template,properties,events,domId){
        var self=this,arr=xui.toArr(arguments);
        arr[0]=arr[0]||'<span [event] class="xuit-sbtn"><span class="xuit-sbtn-btn"><span class="xuit-sbtn-btni"><span class="xuit-sbtn-btnc"><a class="xuit-sbtn-focus" href="javascript:;">{caption}</a></span></span></span></span>';
        arr[2]=arr[2]||{
            "root":{
                onMouseover:function(profile,e,src){
                    xui.use(src).tagClass('-hover');
                },
                onMouseout:function(profile,e,src){
                    xui.use(src).tagClass('-hover',false);
                    xui.use(src).tagClass('-active',false);
                },
                onMousedown:function(profile,e,src){
                    xui.use(src).tagClass('-active');
                },
                onMouseup:function(profile,e,src){
                    xui.use(src).tagClass('-active',false);
                },
                onClick:function(profile,e,src){
                    xui.tryF(profile.handler_onClick,arguments,profile.host||profile)
                }
            }
        };
        return arguments.callee.upper.apply(self,arr);
    },
    Instance:{
        setCaption:function(caption){
            return this.setProperties('caption',caption);
        },
        onClick:function(fun){
            this.handler_onClick=fun;
            return this;
        }
    }
});
