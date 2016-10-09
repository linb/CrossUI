Class("xui.UI.Gallery", "xui.UI.List",{
    Instance:{
        getStatus:function(id){
            var item=this.get(0).getItemByItemId(id);
            return (item && item._status)||'ini';
        },
        _afterInsertItems:function(profile){
            profile.getSubNodes("IMAGE").each(function(o){
                if(o.src==xui.ini.img_bg){
                    o.src=o.title;
                    o.title=null;
                }
            });
        }
    },
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        t.$submap={
            items:{
                ITEM:{
                    tabindex:'{_tabindex}',
                    className:'xui-uitembg xui-uiborder-radius xui-showfocus {itemClass} {disabled} {readonly}',
                    style:'padding:{itemPadding};margin:{itemMargin};{itemStyle}',
                    ITEMFRAME:{
                        style:'{_itemSize};',
                        CAPTION:{
                            tagName : 'div',
                            style:'{capDisplay}',
                            text: '{caption}',
                            $order:0
                        },
                        CONTENT:{
                                tagName : 'div',
                                $order:1,
                                className:'xui-icon-loading',
                                style:'{_loadbg}',
                                //for firefox2 image in -moz-inline-box cant change height bug
                                IBWRAP:{
                                    tagName : 'div',
                                    IMAGE:{
                                        tagName : 'img',
                                        src:xui.ini.img_bg,
                                        title:'{image}',
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
                    },
                    FLAG:{
                        $order:20,
                        className:'xui-uiflag-1 xui-display-none {flagClass}',
                        style:'{_flagStyle};{flagStyle}',
                        text:'{flagText}'
                    },
                    EXTRA:{
                        text : '{ext}',
                        $order:30
                    }
                }
            }
        };
        this.setTemplate(t);
    },
    Static:{
        IMGNODE:1,
        Appearances:{
            EXTRA:{
                display:'none'
            },
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
                margin:0,
                'border-radius':'4px'
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
            },
            IMAGE:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
                visibility:'hidden',
            	'vertical-align': 'middle'
            },
            CAPTION:{
            	'text-align': 'center',
                overflow:'hidden',
                'white-space':'nowrap',
                'font-weight':'bold',
                'font-size':'1em'
            },
            CONTENT:{
            	'text-align': 'center',
                overflow:'hidden',
                'white-space':'nowrap',
                'background-repeat':'no-repeat',
                'background-position':'center center',
                'font-size':'1em'
            },
            COMMENT:{
                display:'block',
                margin:'.25em',
                'text-align':'center',
                'font-size':'1em'
            },
            FLAG:{
                top:'-.5em',
                right:'-.5em'
            }
        },
        Behaviors:{
            IMAGE:{
                onLoad:function(profile,e,src){
                    var img=xui.use(src).get(0),path=img.src;
                    if(path!=xui.ini.img_bg){
                            var p=profile.properties,
                                    nn=xui.use(src),
                                  node=nn.get(0),
                                  item=profile.getItemByDom(src);
                            if(item.autoItemSize||p.autoItemSize){
                                nn.attr('width','');nn.attr('height','');
                            }
                            xui(node).parent(2).removeClass('xui-icon-loading'); 
                            nn.onLoad(null).onError(null).$removeEventHandler('load').$removeEventHandler('error');
                            node.style.visibility="visible";
                            item._status='loaded';
                    }
                },
                onError:function(profile,e,src){
                    var p=profile.properties,
                          nn=xui.use(src),
                          node=nn.get(0),
                          item=profile.getItemByDom(src);
                    xui(node).parent(2).removeClass('xui-icon-loading').addClass('xui-err');
                    if(item.errImg||p.errImg)xui(node).parent(2).css('backgroundImage','url('+(item.errImg||p.errImg)+')');
                    nn.onLoad(null).onError(null).$removeEventHandler('load').$removeEventHandler('error');
                    node.style.visibility="hidden";
                    item._status='error';
                }
            }
        },
        DataModel:({
            tagCmds:null,
            autoItemSize:{
                ini:false,
                action:function(){
                    this.boxing().refresh();
                }
            },
            loadingImg:"",
            errImg:"",
            itemMargin:{
                $spaceunit:1,
                ini:6,
                action:function(v){
                    if(typeof v!='object')
                        this.getSubNode('ITEM',true).css('margin', this.$forceu(v));
                    else
                        this.getSubNode('ITEM',true).css(v);
                }
            },
            itemPadding:{
                $spaceunit:1,
                ini:2,
                action:function(v){
                    if(typeof v!='object')
                        this.getSubNode('ITEM',true).css('padding',this.$forceu(v));
                    else
                        this.getSubNode('ITEM',true).css(v);
                }
            },
            itemWidth:{
                $spaceunit:1,
                ini:32,
                action:function(v){
                    this.getSubNode('ITEMFRAME',true).width(v);
                }
            },
            itemHeight:{
                $spaceunit:1,
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
            width:{
                $spaceunit:1,
                ini:200
            },
            height:{
                $spaceunit:1,
                ini:200
            }
        }),
        EventHandlers:{
            onCmd:null
        },
        _prepareItem:function(profile, item){
            var p = profile.properties,
                css=xui.CSS,
                t;

            xui.arr.each(xui.toArr('itemWidth,itemHeight,imgWidth,imgHeight,itemPadding,itemMargin,autoItemSize,loadingImg,errImg'),function(i){
                item[i] = xui.isSet(item[i])?item[i]:p[i];
            });
            if(t=item.itemMargin)item.itemMargin=css.$forceu(t);
            if(t=item.itemPadding)item.itemPadding=css.$forceu(t);
            item.caption = item.caption || '';
            if(item.caption==='')item.capDisplay='display:none;';
            item.comment = item.comment || '';
            item._tabindex = p.tabindex;
            if(item.flagText)item._flagStyle='display:block';
            if(item.autoItemSize||p.autoItemSize){
                item._itemSize='';
            }else{
                item._itemSize='width:'+css.$forceu(item.itemWidth)+'height:'+css.$forceu(item.itemHeight);
            }
            if(item.loadingImg||p.loadingImg)item._loadbg="background-image:url("+(item.loadingImg||p.loadingImg)+")";
        },
        RenderTrigger:function(){
            this.boxing()._afterInsertItems(this);
        }
    }
});
