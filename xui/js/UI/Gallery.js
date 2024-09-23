xui.Class("xui.UI.Gallery", "xui.UI.List",{
    Instance:{
        getStatus:function(id){
            var item=this.get(0).getItemByItemId(id);
            return (item && item._status)||'ini';
        },
        _afterInsertItems:function(profile){
            profile.getSubNodes("IMAGE",true).each(function(o){
                if(o.src==xui.ini.img_bg){
                    // bug fix for firefox
                    if(xui.browser.isFF)o.src='';
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
                    className:'xui-uitembg xui-uiborder-radius xui-showfocus {_itemRow} {itemClass} {disabled} {readonly}',
                    style:'padding:{itemPadding};margin:{itemMargin};{_itemSize};{itemStyle}',
                    ITEMFRAME:{
                        style:'{_inneritemSize}',
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
                                    style:'{_innerimgSize};{imgStyle}'
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
                        className:'xui-display-none xui-uiflag {flagClass}',
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
            'ITEMS-nowrap':{
                'white-space':'nowrap'
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
//                width:'100%',
//                height:'100%',
                '-moz-box-flex':'1'
            },
            IBWRAP:{
            },
            IMAGE:{
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
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
                'white-space':'nowrap',
                'background-repeat':'no-repeat',
                'background-position':'center center',
                'font-size':'1em'
            },
            COMMENT:{
                display:'block',
                margin:'.1667em',
                'text-align':'center',
                'font-size':'1em'
            },
            FLAG:{
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
                                  item=profile.getItemByDom(src);
                            if(!item)return;
                            var icon=profile.getSubNodeByItemId('ICON',item.id);
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

                            item._status='loaded';
                            // don't show img_blank
                            if(xui.ini.img_blank==path){
                                node.style.display="none";
                            }else{
                                node.style.display="";
                            }
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
                    node.style.display="none";
                    item._status='error';
                }
            },
            FLAG:{
                onClick:function(profile, e, src){
                    var item = profile.getItemByDom(src),
                        box = profile.boxing();

                    if(profile.onFlagClick){
                        box.onFlagClick(profile,item,e,src);
                        return false;
                    }
                }
            }
        },
        DataModel:{
            lite: null,
            tagCmds:null,
            tagCmdsAlign:null,
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
            iconFontSize:{
                ini:'',
                action:function(v){
                    this.getSubNode('ICON',true).css('font-size',v);
                }
            },
            itemMargin:{
                ini:6,
                action:function(v){
                    this.getSubNode('ITEM',true).css('margin',v||0);
                }
            },
            itemPadding:{
                ini:2,
                action:function(v){
                    this.getSubNode('ITEM',true).css('padding',v||0);
                }
            },
            itemWidth:{
                $spaceunit:1,
                ini:32,
                action:function(v){
                    if(!this.properties.autoItemSize)this.getSubNode('ITEMFRAME',true).width(v||'');
                }
            },
            itemHeight:{
                $spaceunit:1,
                ini:32,
                action:function(v){
                    if(!this.properties.autoItemSize)this.getSubNode('ITEMFRAME',true).height(v||'');
                }
            },
            imgWidth:{
                ini:16,
                action:function(v){
                    if(!this.properties.autoImgSize)this.getSubNode('IMAGE',true).width(v||'');
                }
            },
            imgHeight:{
                ini:16,
                action:function(v){
                    if(!this.properties.autoImgSize)this.getSubNode('IMAGE',true).height(v||'');
                }
            },
            width:{
                $spaceunit:1,
                ini:'16rem'
            },
            height:{
                $spaceunit:1,
                ini:'16rem'
            },
            columns:{
                ini:0,
                action:function(){
                    this.boxing().refresh();
                }
            },
            rows:{
                ini:0,
                action:function(){
                    this.boxing().refresh();
                }
            }
        },
        EventHandlers:{
            onCmd:null,
            onFlagClick:function(profile,item,e,src){}
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile), p=profile.properties;
            if(p.cols)d._itemscls1=profile.getClass('ITEMS','-nowrap');
            return d;
        },
        _prepareItem:function(profile, item){
            var p = profile.properties,
                cols=p.columns,
                rows=p.rows,
                auto1=item.autoItemSize||p.autoItemSize,
                auto2=item.autoImgSize||p.autoImgSize,
                t;

            xui.arr.each(xui.toArr('itemWidth,itemHeight,imgWidth,imgHeight,itemPadding,itemMargin,iconFontSize,autoItemSize,autoImgSize'),function(i){
                item[i] = xui.isSet(item[i])?item[i]:p[i];
            });
            item._itemRow = profile.properties.itemRow?'xui-item-row':'';
            item.itemWidth=(!auto1&&(t=item.itemWidth))?profile.$forceu(t):'';
            item.itemHeight=(!auto1&&(t=item.itemHeight))?profile.$forceu(t):'';
            item.itemMargin=(t=item.itemMargin)?profile.$forceu(t):0;
            item.itemPadding=(t=item.itemPadding)?profile.$forceu(t):0;
            item.imgWidth=(!auto2&&(t=item.imgWidth))?profile.$forceu(t):'';
            item.imgHeight=(!auto2&&(t=item.imgHeight))?profile.$forceu(t):'';
            item._tabindex = p.tabindex;

            if(t=item.iconFontSize)item._fontSize="font-size:"+t;
            item._imageClass='';
            if(!item.iconFontCode && !item.imageClass)item._imageClass += 'xui-icon-loading';
            if(item.imageClass)item._imageClass +=' ' + item.imageClass;

            if(item.flagText||item.flagClass)item._flagStyle='display:block';
            if(!item.flagClass)item.flagClass='xui-uiflag-1';

            if(p.iconOnly){
                delete item.caption;
                delete item.comment;
            }

            if(( item.caption = item.caption || '')==='')item.capDisplay='display:none;';
            if((item.comment = item.comment || '')==='')item.commentDisplay='display:none;';
            item._itemSize='';
            if(cols)
                item._itemSize+='width:'+(100/cols+'%') +';border:0;margin-left:0;margin-right:0;padding-left:0;padding-right:0;';
            if(rows)
                item._itemSize+='height:'+(100/rows+'%')+';border:0;margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;';

            if(!auto1) item._inneritemSize=(!cols&&item.itemWidth?('width:'+item.itemWidth+';'):'') +
                    (!rows&&item.itemHeight?('height:'+item.itemHeight):'');
            if(!auto2)
                item._innerimgSize=(item.imgWidth?('width:'+item.imgWidth+';'):'') + (!rows&&item.imgHeight?('height:'+item.imgHeight):'');
        },
        RenderTrigger:function(){
            this.boxing()._afterInsertItems(this);
        }
    }
});
