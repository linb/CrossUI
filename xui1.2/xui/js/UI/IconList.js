Class("xui.UI.IconList", "xui.UI.List",{
    Instance:{
        getStatus:function(id){
            var item=this.get(0).getItemByItemId(id);
            return (item && item._status)||'ini';
        }
    },
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        t.$submap={
            items:{
                ITEM:{
                    tabindex:'{_tabindex}',
                    className:'xui-busy;{itemClass} {disabled}  {readonly}',
                    style:'padding:{itemPadding}px;margin:{itemMargin}px;{itemStyle};{itemDisplay};{_loadbg}',
                    //for firefox2 image in -moz-inline-box cant change height bug
                    IBWRAP:{
                        tagName:'div',
                        IMAGE:{
                            tagName:'img',
                            src:'{image}',
                            width:'{itemWidth}',
                            height:'{itemHeight}',
                            style:'{imgStyle}'
                        }
                    }
                }
            }
        };
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            KEY:{
                overflow:'auto',
                'overflow-x': 'hidden'
            },
            ITEMS:{
                overflow:'auto',
                'overflow-x': 'hidden',
                position:'relative',
                'line-height':'14px',
                zoom:xui.browser.ie6?1:null
            },
            ITEM:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                position:'relative',
                cursor:'pointer',
                border:'solid 1px #C2E4FC',
                'vertical-align':'top',
                'background-repeat':'no-repeat',
                'background-position':'center center'
            },
            IBWRAP:{
                'font-size':0,
                'line-height':0
            },
             'ITEM-mouseover':{
                $order:1,
                padding:0,
                border:'solid 1px #a0c8f0',
                'background-color':'#e1f0ff'
            },
            'ITEM-mousedown':{
                $order:2,
                padding:0,
                border:'solid 1px #dcdcdc',
                'background-color':'#bbcef1'
             },
            'ITEM-checked':{
                $order:2,
                padding:0,
                border:'solid 1px #bbcef1',
                'background-color':'#bbcef1'
            },
            'ITEM-mouseover, ITEM-mousedown, ITEM-checked':{
            }
        },
        Behaviors:{
            IMAGE:{
                onLoad:function(profile,e,src){
                    var p=profile.properties,
                         nn=xui.use(src),
                          node=nn.get(0),
                          item=profile.getItemByDom(src);
                     if(node.src == xui.ini.img_bg && item.image!==xui.ini.img_bg){
                        if(item.autoItemSize||p.autoItemSize){
                            nn.attr('width','');nn.attr('height','');
                        }
                        if(item.image){
                            node.src=xui.adjustRes(item.image);
                            return;
                        }
                    }
                    
                    xui(node).parent(2).removeClass('xui-busy'); 
                    nn.onLoad(null).onError(null).$removeEventHandler('load').$removeEventHandler('error');
                    item._status='loaded';
                },
                onError:function(profile,e,src){
                    var p=profile.properties,
                          nn=xui.use(src),
                          node=nn.get(0),
                          item=profile.getItemByDom(src);
                    if(node.src == xui.ini.img_bg && item.image!==xui.ini.img_bg){
                        if(item.autoItemSize||p.autoItemSize){
                            nn.attr('width','');nn.attr('height','');
                        }
                        if(item.image){
                            node.src=xui.adjustRes(item.image);
                            return;
                        }
                    }
                    xui(node).parent(2).removeClass('xui-busy').addClass('xui-err');
                    if(item.errImg||p.errImg)xui(node).parent(2).css('backgroundImage','url('+(item.errImg||p.errImg)+')');
                    node.width=item.itemWidth||p.itemWidth;
                    node.height=item.itemHeight||p.itemHeight;
                    nn.onLoad(null).onError(null).$removeEventHandler('load').$removeEventHandler('error');
                    node.style.visibility="hidden";
                    item._status='error';
                }
            }
        },
        DataModel:({
            autoItemSize:{
                ini:false,
                action:function(){
                    this.boxing().refresh();
                }
            },
            loadingImg:"",
            errImg:"",
            itemMargin:{
                ini:6,
                action:function(v){
                    if(typeof v!='object')
                        this.getSubNode('ITEM',true).css('margin',(''+parseFloat(v))==(''+v)?v+'px':v);
                    else
                        this.getSubNode('ITEM',true).css(v);
                }
            },
            itemPadding:{
                ini:2,
                action:function(v){
                    if(typeof v!='object')
                        this.getSubNode('ITEM',true).css('padding',(''+parseFloat(v))==(''+v)?v+'px':v);
                    else
                        this.getSubNode('ITEM',true).css(v);
                }
            },
            itemWidth:{
                ini:16,
                action:function(v){
                    this.getSubNode('IMAGE',true).width(v);
                }
            },
            itemHeight:{
                ini:16,
                action:function(v){
                    this.getSubNode('IMAGE',true).height(v);
                }
            },
            width:200,
            height:200
        }),
        _prepareItem:function(profile, item){
            var p = profile.properties;
            _.arr.each(_.toArr('itemWidth,itemHeight,itemPadding,itemMargin,autoItemSize,loadingImg,errImg'),function(i){
                item[i] = _.isSet(item[i])?item[i]:p[i];
            });
            item._tabindex = p.tabindex;
            if(item.loadingImg||p.loadingImg)item._loadbg="background-image:url("+(item.loadingImg||p.loadingImg)+")";
            item.image=xui.ini.img_bg;
        }
    }
});
