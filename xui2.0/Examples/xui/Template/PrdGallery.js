//defines a class here, first
Class("xui.Template.PrdGallery","xui.Template",{
    Constructor:function(template,properties,events,domId){
        var self=this,arr=xui.toArr(arguments);
        arr[0]=arr[0]||{
            ""      : "<div><h3 class='gallery1-head'>{head}</h3><ul class='gallery1-ul'>{items}</ul><div style='clear:both;'></div></div>",
            items : "<li class='gallery1-li' [event]><div class='gallery1-left'><div><a href='{href}'><img src='{src}'/><p>{price}</p></a></div></div><div class='gallery1-right'><a href='{href}'><h4>{title}</h4><div>{desc}</div></a></div></li>"
        };
        arr[2]=arr[2]||{
            items:{
                onMouseover:function(profile,e,src){
                    xui(src).css('backgroundColor','#EEE');

                    //here, just use xui.Template to build a html string
                    var item=profile.getItem(src),
                        tpl=new xui.Template({"":"<div style='text-align:center;border:solid 1px;background:#fff;'><h4>{title}</h4><img src='{src}'></div><p>{desc}</p>"},item),
                        html=tpl.toHtml();
                    xui.Tips.show(xui.Event.getPos(e),html);
                },
                onMouseout:function(profile,e,src){
                    xui(src).css('backgroundColor','transparent');
                    xui.Tips.hide();
                },
                onMousedown:function(profile,e,src){
                    xui(src).startDrag(e,{dragType:"icon",dragCursor:"default",shadowFrom:src},'prd',profile.getItem(src));
                    xui(src).css('backgroundColor','transparent');
                    xui.Tips.hide();
                }
            }
        };
        return arguments.callee.upper.apply(self,arr);
    },
    Instance:{
        output:function(properties,node){
            this.setProperties(properties);
            xui(node).append(this);
        }
    },
    Initialize:function(){
        //add css
        xui.CSS.addStyleSheet(''+

         '.gallery1-head{border-bottom:dashed 1px #888;}'+
         '.gallery1-ul{clear:both;padding-top:6px;}'+
         '.gallery1-li{float:left;height:100px;width:200px;overflow:hidden;line-height:15px;margin:3px;cursor:pointer;}'+
         '.gallery1-left{float:left;width:90px;overflow:hidden;}'+
         '.gallery1-left p{text-align:center;font-weight:bold;}'+
         '.gallery1-left img{border:solid 1px #CCC;width:80px;height:80px;}'+
         '.gallery1-right{float:left;width:100px;padding-left:2px;overflow:hidden;}'

        ,'gallery1.css');
    }
});