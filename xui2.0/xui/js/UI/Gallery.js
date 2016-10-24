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
                                style:'{_loadbg}',
                                ICON:{
                                    className:'xuifont {_imageClass}',
                                    style:"{_fontSize}",
                                    text:'{iconFontCode}'
                                },
                                IMAGE:{
                                    tagName : 'img',
                                    src:xui.ini.img_bg,
                                    title:'{image}',
                                    style:'{imgStyle}'
                                }
                        },
                        COMMENT:{
                            tagName : 'div',
                            text: '{comment}',
                            style:'{commentDisplay}',
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
                zoom:xui.browser.ie6?1:null,
                padding:'.5em'
            },
            ITEM:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie67?1:null,
                position:'relative',
                cursor:'pointer',
                'vertical-align':'top',
                margin:0
            },
            ITEMFRAME:{
                display:xui.browser.ie67?xui.$inlineBlock:'block',
                zoom:xui.browser.ie67?1:null,
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
                                  item=profile.getItemByDom(src),
                                  icon=profile.getSubNodeByItemId('ICON',item.id);
                            
                            // bug fix
                             if(node.currentSrc && node.currentSrc!=path){
                                icon.removeClass('xui-icon-loading xui-display-none').addClass('xui-load-error');
                                nn.onLoad(null).onError(null).$removeEventHandler('load').$removeEventHandler('error');
                                node.style.visibility="hidden";
                                node.style.display="none";
                                item._status='error';
                                return;
                             }

                            if(item.autoItemSize||p.autoItemSize){
                                nn.attr('width','');nn.attr('height','');
                            }else{
                                nn.attr('width',item.imgWidth);nn.attr('height',item.imgWidth);
                            }

                            icon.removeClass('xui-icon-loading');
                            // hide
                            if(!item.iconFontCode && !item.imageClass){
                                icon.addClass("xui-display-none"); 
                            }
                            nn.onLoad(null).onError(null).$removeEventHandler('load').$removeEventHandler('error');

                            // don't show img_blank
                            if(path==xui.ini.img_blank){
                                node.style.visibility="hidden";
                                node.style.display="none";
                            }else{
                                node.style.visibility="visible";
                                node.style.display="";
                            }
                            item._status='loaded';
                    }
                },
                onError:function(profile,e,src){
                    var item=profile.getItemByDom(src);
                    if(item._status=='error')return;

                    var p=profile.properties,
                          nn=xui.use(src),
                          node=nn.get(0),
                          icon=profile.getSubNodeByItemId('ICON',item.id);
                    icon.removeClass('xui-icon-loading xui-display-none').addClass('xui-load-error');
                    nn.onLoad(null).onError(null).$removeEventHandler('load').$removeEventHandler('error');
                    node.style.visibility="hidden";
                    node.style.display="none";
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
            itemMargin:{
                ini:6,
                action:function(v){
                    this.getSubNode('ITEM',true).css(v);
                }
            },
            itemPadding:{
                ini:2,
                action:function(v){
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
                css=xui.CSS, t;

            xui.arr.each(xui.toArr('itemWidth,itemHeight,imgWidth,imgHeight,itemPadding,itemMargin,autoItemSize'),function(i){
                item[i] = xui.isSet(item[i])?item[i]:p[i];
            });
            if(t=item.itemWidth)item.itemWidth=css.$forceu(t);
            if(t=item.itemHeight)item.itemHeight=css.$forceu(t);
            if(t=item.itemMargin)item.itemMargin=css.$forceu(t);
            if(t=item.itemPadding)item.itemPadding=css.$forceu(t);
            item._tabindex = p.tabindex;

            if(t=item.fontSize)item._fontSize='font-size:'+t+';'
            if(!item.iconFontCode)item._imageClass='xui-icon-loading';
            if(item.imageClass)item._imageClass +=' ' + item.imageClass;

            if(item.flagText)item._flagStyle='display:block';

            item.caption = item.caption || '';
            if(item.caption==='')item.capDisplay='display:none;';
            item.comment = item.comment || '';
            if(item.comment==='')item.commentDisplay='display:none;';

            if(item.autoItemSize||p.autoItemSize){
                item._itemSize='';
            }else{
                item._itemSize='width:'+css.$forceu(item.itemWidth)+';height:'+css.$forceu(item.itemHeight);
            }
        },
        RenderTrigger:function(){
            this.boxing()._afterInsertItems(this);
        }
    }
});
