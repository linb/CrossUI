Class('xui.UI.Calendar', 'xui.UI.DatePicker', {
    Instance:{
        setDayInfo:function(key,index,value){
            var node=this.getSubNode(key, ""+index);
            if(node.get(0)){
                node.get(0).innerHTML=value;
            }
            return this;
        },
        addContents : function(index,node){
            this.getSubNode('DC',""+index).append(node);
            return this;
        },
        clearContents : function(index){
            this.getSubNode('DC',""+index).empty();
            return this;
        }
    },
    Initialize:function(){
        var self=this,
            id=xui.UI.$ID,
            tag=xui.UI.$tag_special,
            cls=xui.UI.$CLS,
            key=self.KEY;

        self.addTemplateKeys(['H', 'W','COL','DH','DAYBOX','DC','TBODY', 'THEADER', 'TD','DF1','DF2','DF3','DF4']);
        var colgroup = '<colgroup id="'+key+'-COL:'+id+':"  class="'+tag+'COL_CS'+tag+' xui-custom {comcls}"  style="'+tag+'COL_CS'+tag+'"><col width="2%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/></colgroup>',
            thead1='<thead ID="'+key+'-THEADER:'+id+':" class="'+tag+'THEADER_CS'+tag+' xui-custom {comcls}"  style="'+tag+'THEADER_CS'+tag+'" ><tr height="1%"><th id="'+key+'-H:'+id+':7" class="xui-node xui-node-th '+cls+'-h '+tag+'H_CC'+tag+' xui-custom {comcls}"  style="'+tag+'H_CS'+tag+'"></th>',
            thead2='</tr></thead>',
            th='<th id="'+key+'-H:'+id+':@" class="xui-node xui-node-th '+cls+'-h '+tag+'H_CC'+tag+' xui-custom {comcls}"  style="'+tag+'H_CS'+tag+'">@</th>',
            tbody1 = '<tbody id="'+key+'-TBODY:'+id +':"  class="'+tag+'TBODY_CS'+tag+' xui-custom {comcls}"  style="'+tag+'TBODY_CS'+tag+'">',
            tbody2 = '</tbody>',
            tr1='<tr>',
            tr2='</tr>',
            td1='<th id="'+key+'-W:'+id+':@"  class="xui-node xui-node-th '+cls+'-w '+tag+'W_CC'+tag+' xui-custom {comcls}" style="'+tag+'W_CS'+tag+'">@</th>',
            td2='<td id="'+key+'-TD:'+id+':@" class="xui-node xui-node-td '+cls+'-td '+tag+'TD_CC'+tag+' xui-custom {comcls}"  style="'+tag+'TD_CS'+tag+'" '+xui.$IEUNSELECTABLE()+'  >'+
                '<div id="'+key+'-DAYBOX:'+id+':@" class="xui-node xui-node-div '+cls+'-daybox '+tag+'DAY_CC'+tag+' xui-custom {comcls}"  style="'+tag+'DAY_CS'+tag+'" '+xui.$IEUNSELECTABLE()+' >'+
                    '<div id="'+key+'-DH:'+id+':@" class="xui-node xui-node-div '+cls+'-dh '+tag+'DH_CC'+tag+' xui-custom {comcls}"  style="'+tag+'DH_CS'+tag+'"></div>'+
                    '<div id="'+key+'-DF1:'+id+':@" class="xui-node xui-node-div '+cls+'-df1 '+tag+'DF1_CC'+tag+' xui-custom {comcls}" style="'+tag+'DF1_CS'+tag+'"></div>'+
                    '<div id="'+key+'-DF2:'+id+':@" class="xui-node xui-node-div '+cls+'-df2 '+tag+'DF2_CC'+tag+' xui-custom {comcls}" style="'+tag+'DF2_CS'+tag+'"></div>'+
                    '<div id="'+key+'-DF3:'+id+':@" class="xui-node xui-node-div '+cls+'-df3 '+tag+'DF3_CC'+tag+' xui-custom {comcls}" style="'+tag+'DF3_CS'+tag+'"></div>'+
                    '<div id="'+key+'-DF4:'+id+':@" class="xui-node xui-node-div '+cls+'-df4 '+tag+'DF4_CC'+tag+' xui-custom {comcls}"  style="'+tag+'DF4_CS'+tag+'"></div>'+
                    '<div id="'+key+'-DC:'+id+':@" class="xui-node xui-node-div '+cls+'-dc '+tag+'DC_CC'+tag+' xui-custom {comcls}"  style="'+tag+'DC_CS'+tag+'"></div>'+
                '</div>'+
                '</td>',
            body,i,j,k,l,a=[],b=[];
        for(i=0;i<7;i++)
            b[b.length]= th.replace(/@/g,i);

        k=l=0;
        for(i=0;i<48;i++){
            j=i%8;
            a[a.length]= (j==0?tr1:'') + (j==0?td1:td2).replace(/@/g,j==0?l:k) + (j==7?tr2:'');
            if(j!==0)k++;
            else l++;
        }

        body=colgroup+thead1+b.join('')+thead2+tbody1+a.join('')+tbody2;

        self.setTemplate({
            tagName : 'div',
            style:'{_style}',
            className:'{_className}',
            onselectstart:'return false',
            BORDER:{
                tagName : 'div',
                BODY:{
                    $order:1,
                    tagName:'table',
                    cellpadding:"0",
                    cellspacing:"0",
                    width:'100%',
                    text:body
                }
            }
        });
        delete self.$Keys.YEAR;
        delete self.$Keys.MONTH;
    },
    Static:{
        Behaviors:{        
            DroppableKeys:['DAYBOX'],
            HoverEffected:{},
            ClickEffected:{},
            onSize:xui.UI.$onSize,
            TD:{onClick:null,
                onDblclick:function(profile, e, src){
                    var p=profile.properties,
                        index=profile.getSubId(src);
                    if(p.disabled)return false;
                    profile.boxing().onDblclick(profile, index, e, src);
                }
            }
        },
        DataModel:{
            handleHeight : null,
            tipsHeight :null,
            closeBtn:null,
            timeInput:null,
            dataBinder:null,
            dateField:null,

            dock:'fill',
            width:200,
            height:200
        },
        EventHandlers:{
            onDblclick:function(profile, item, e, src){},
            beforeClose:null
        },
        _getLabelNodes:function(profile){
            return profile.$day1 || (profile.$day1=profile.getSubNode('DF1',true));
        },
        _getDayNodes:function(profile){
            return profile.$day2 || (profile.$day2=profile.getSubNode('DAYBOX',true));
        },
        Appearances:{
            'DAYBOX, DC':{
                position:'relative'
            },
            'DF1, DF2, DF3, DF4':{
                position:'absolute',
                'white-space':'nowrap'
            },
            DF1:{
                left:'2px',
                top:'2px'
            },
            DF2:{
                right:'2px',
                top:'2px'
            },
            DF3:{
                left:'2px',
                bottom:'2px'
            },
            DF4:{
                right:'2px',
                bottom:'2px'
            },
            DAYBOX:{
                overflow:'hidden'
            },
            DC:{
                'text-align':'left'
            },
            TD:{
                "background-color":"#F9F7D1"
            },
            'TD-checked':{
                $order:1//,
                //"background-color":"#FFFB1E"
            },
            'TD-free':{
                $order:1,
                "background-color":"#FFF"
            }
        },
        _onresize:function(profile,width,height){
            var p=profile.properties,
                f=function(k){return profile.getSubNode(k)},
                t;
            //for border, view and items
            if(height){
                f('BORDER').height(t=height);
                f('BODY').height(t);
                t=(t-16)/6-1;
                profile.box._getDayNodes(profile).height(t);
            }
        }
    }
});