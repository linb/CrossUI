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
                    o.title='';
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
                            className:'xui-ui-ellipsis',
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
                            className:'xui-ui-ellipsis',
                            text: '{comment}',
                            style:'{commentDisplay}',
                            $order:2
                        }
                    },
                    FLAG:{
                        $order:20,
                        className:'xui-display-none {flagClass}',
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

        // compitable
        xui.UI.IconList = xui.UI.Gallery;
        var key="xui.UI.IconList";
        xui.absBox.$type[key.replace("xui.UI.","")]=xui.absBox.$type[key]=key;
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
                right:'-.5em',
                position:'absolute',
                'z-index':10
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

                            if(item.autoImgSize||p.autoImgSize){
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
                            node.style.visibility="visible";
                            node.style.display="";
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
            autoImgSize:{
                ini:false,
                action:function(){
                    this.boxing().refresh();
                }
            },
            autoItemSize:{
                ini:true,
                action:function(){
                    this.boxing().refresh();
                }
            },
            iconOnly:{
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
                ini:'16rem'
            },
            height:{
                $spaceunit:1,
                ini:'16rem'
            }
        }),
        EventHandlers:{
            onCmd:null
        },
        _prepareItem:function(profile, item){
            var p = profile.properties, t;

            xui.arr.each(xui.toArr('itemWidth,itemHeight,imgWidth,imgHeight,itemPadding,itemMargin,autoItemSize'),function(i){
                item[i] = xui.isSet(item[i])?item[i]:p[i];
            });
            if(t=item.itemWidth)item.itemWidth=profile.$forceu(t);
            if(t=item.itemHeight)item.itemHeight=profile.$forceu(t);
            if(t=item.itemMargin)item.itemMargin=profile.$forceu(t);
            if(t=item.itemPadding)item.itemPadding=profile.$forceu(t);
            item._tabindex = p.tabindex;

            if(t=item.fontSize)item._fontSize='font-size:'+t+';'
            if(!item.iconFontCode)item._imageClass='xui-icon-loading';
            if(item.imageClass)item._imageClass +=' ' + item.imageClass;

            if(item.flagText||item.flagClass)item._flagStyle='display:block';
            if(!item.flagClass)item.flagClass='xui-uiflag-1';

            if(p.iconOnly)delete item.caption;

            if(( item.caption = item.caption || '')==='')item.capDisplay='display:none;';
            if((item.comment = item.comment || '')==='')item.commentDisplay='display:none;';

            if(item.autoItemSize||p.autoItemSize){
                item._itemSize='';
            }else{
                item._itemSize='width:'+profile.$forceu(item.itemWidth)+';height:'+profile.$forceu(item.itemHeight);
            }
        },
        RenderTrigger:function(){
            this.boxing()._afterInsertItems(this);
        }
    }
});
