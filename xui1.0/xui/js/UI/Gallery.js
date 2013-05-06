Class("xui.UI.Gallery", "xui.UI.List",{
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
                    className:'{itemClass} {disabled} {readonly}',
                    style:'padding:{itemPadding}px;margin:{itemMargin}px;{itemStyle}',
                    ITEMFRAME:{
                        style:'width:{itemWidth}px;height:{itemHeight}px;',
                        CAPTION:{
                            tagName : 'div',
                            style:'{capDisplay}',
                            text: '{caption}',
                            $order:0
                        },
                        CONTENT:{
                                tagName : 'div',
                                $order:1,
                                //for firefox2 image in -moz-inline-box cant change height bug
                                IBWRAP:{
                                    tagName : 'div',
                                    IMAGE:{
                                        tagName : 'img',
                                        src:'{image}',
                                        width:'{imgWidth}',
                                        height:'{imgHeight}',
                                        style:'{imgStyle}'
                                    }
                                }
                        },
                        COMMENT:{
                            tagName : 'div',
                            text: '{comment}',
                            $order:2
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
                overflow:'visible'
            },
            ITEMS:{
                position:'relative',
                overflow:'auto',
                'overflow-x': 'hidden',
                zoom:xui.browser.ie6?1:null
            },
            ITEM:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                position:'relative',
                cursor:'pointer',
                'vertical-align':'top',
                /*opera must be 0 not 'none'*/
                border:'solid 1px #C2E4FC',
                margin:0
            },
            ITEMFRAME:{
                display:xui.browser.ie?'inline-block':'block',
                position:'relative',
                overflow:'hidden',
                border:0,
                padding:0,
                margin:0,
                width:'100%',
                height:'100%',
                '-moz-box-flex':'1'
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
            },
            IMAGE:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
            	'vertical-align': 'middle'
            },
            'CONTENT, CAPTION':{
            	'text-align': 'center',
                overflow:'hidden',
                'white-space':'nowrap'
            },
            CAPTION:{
                'font-weight':'bold'
            },
            COMMENT:{
                display:'block',
                'font-size':'12px',
                margin:'0 2px 0 2px',
                'text-align':'center'
            }
        },
        Behaviors:{
            IMAGE:{
                onLoad:function(profile,e,src){
                    var item=profile.getItemByDom(src);
                    item._status='loaded';
                },
                onError:function(profile,e,src){
                    var item=profile.getItemByDom(src);
                    item._status='error';
                }
            }
        },
        DataModel:({
            itemMargin:{
                ini:6,
                action:function(v){
                    if(typeof v!='object')
                        this.getSubNode('ITEM',true).css('margin', (''+parseFloat(v))==(''+v)?v+'px':v);
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
                ini:32,
                action:function(v){
                    this.getSubNode('ITEMFRAME',true).width(v);
                }
            },
            itemHeight:{
                ini:32,
                action:function(v){
                    this.getSubNode('ITEMFRAME',true).height(v);
                }
            },
            imgWidth:{
                ini:16,
                action:function(v){
                    this.getSubNode('IMAGE',true).width(v);
                }
            },
            imgHeight:{
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

            _.arr.each(_.toArr('itemWidth,itemHeight,imgWidth,imgHeight,itemPadding,itemMargin'),function(i){
                item[i] = item[i] || p[i];
            });
            item.capition = item.capition || '';
            if(item.caption===null)capDisplay='display:none;';
            item.comment = item.comment || '';
            item._tabindex = p.tabindex;
            //Avoid Empty Image src
            if(!item.image)item.image=xui.ini.img_bg;
        }
    }
});
