Class("xui.UI.IconList", "xui.UI.List",{
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
                    className:'xui-uiborder-radius xui-uitembg xui-showfocus {itemClass} {disabled}  {readonly}',
                    style:'padding:{itemPadding};margin:{itemMargin};{itemStyle};{_itemDisplay};',
                    ICON:{
                        className:'xuifont {_imageClass}',
                        style:"{_fontSize}",
                        text:'{iconFontCode}'
                    },
                    IMAGE:{
                        tagName:'img',
                        src:xui.ini.img_bg,
                        title:'{image}',
                        style:'{imgStyle}'
                    },
                    FLAG:{
                        $order:20,
                        className:'xui-uiflag-1 xui-display-none {flagClass}',
                        style:'{_flagStyle};{flagStyle}',
                        text:'{flagText}'
                    }
                }
            }
        };
        this.setTemplate(t);
    },
    Static:{
        IMGNODE:1,
        Appearances:{
            KEY:{
                overflow:'auto',
                'overflow-x': 'hidden'
            },
            ITEMS:{
                overflow:'auto',
                'overflow-x': 'hidden',
                position:'relative',
                'line-height':'1.25em',
                zoom:xui.browser.ie6?1:null,
                padding:'.5em'
            },
            ITEM:{
                padding:0,
                display:xui.$inlineBlock,
                zoom:xui.browser.ie67?1:null,
                position:'relative',
                cursor:'pointer',
                'vertical-align':'top',
                'background-repeat':'no-repeat',
                'background-position':'center center'
            },
            IMAGE:{
                visibility:'hidden'
            },
            IBWRAP:{
                'font-size':xui.browser.ie678?0:null,
                'line-height':xui.browser.ie678?0:null
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
                                nn.attr('width',item.itemWidth);nn.attr('height',item.itemHeight);
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
                    if(typeof v!='object')
                        this.getSubNode('ITEM',true).css('margin',this.$forceu(v));
                    else
                        this.getSubNode('ITEM',true).css(v);
                }
            },
            itemPadding:{
                ini:2,
                action:function(v){
                    if(typeof v!='object')
                        this.getSubNode('ITEM',true).css('padding',this.$forceu(v));
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
        EventHandlers:{
            onCmd:null
        },
        _prepareItem:function(profile, item){
            var p = profile.properties,
            css=xui.CSS, t;

            xui.arr.each(xui.toArr('itemWidth,itemHeight,itemPadding,itemMargin,autoItemSize'),function(i){
                item[i] = xui.isSet(item[i])?item[i]:p[i];
            });
            if(t=item.itemMargin)item.itemMargin=css.$forceu(t);
            if(t=item.itemPadding)item.itemPadding=css.$forceu(t);
            item._tabindex = p.tabindex;

            if(t=item.fontSize)item._fontSize='font-size:'+t+';'
            if(!item.iconFontCode)item._imageClass='xui-icon-loading';
            if(item.imageClass)item._imageClass +=' ' + item.imageClass;

            if(item.flagText)item._flagStyle='display:block';
        },
        RenderTrigger:function(){
            this.boxing()._afterInsertItems(this);
        }
    }
});
