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
                    className:'xui-busy xui-uitembg xui-showfocus {itemClass} {disabled}  {readonly}',
                    style:'padding:{itemPadding};margin:{itemMargin};{itemStyle};{_itemDisplay};{_loadbg}',
                    //for firefox2 image in -moz-inline-box cant change height bug
                    IBWRAP:{
                        tagName:'div',
                        IMAGE:{
                            tagName:'img',
                            src:xui.ini.img_bg,
                            title:'{image}',
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
                'line-height':'1.25em',
                zoom:xui.browser.ie6?1:null
            },
            ITEM:{
                padding:0,
                display:xui.$inlineBlock,
                zoom:xui.browser.ie6?1:null,
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
                'font-size':0,
                'line-height':0
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
                        xui(node).parent(2).removeClass('xui-busy'); 
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
                    xui(node).parent(2).removeClass('xui-busy').addClass('xui-err');
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
                ini:6,
                action:function(v){
                    if(typeof v!='object')
                        this.getSubNode('ITEM',true).css('margin',xui.CSS.$forceu(v));
                    else
                        this.getSubNode('ITEM',true).css(v);
                }
            },
            itemPadding:{
                ini:2,
                action:function(v){
                    if(typeof v!='object')
                        this.getSubNode('ITEM',true).css('padding',xui.CSS.$forceu(v));
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
            var p = profile.properties,t;
            _.arr.each(_.toArr('itemWidth,itemHeight,itemPadding,itemMargin,autoItemSize,loadingImg,errImg'),function(i){
                item[i] = _.isSet(item[i])?item[i]:p[i];
            });
            if(t=item.itemMargin)item.itemMargin=xui.CSS.$forceu(t);
            if(t=item.itemPadding)item.itemPadding=xui.CSS.$forceu(t);
            item._tabindex = p.tabindex;
            if(item.loadingImg||p.loadingImg)item._loadbg="background-image:url("+(item.loadingImg||p.loadingImg)+")";
        },
        RenderTrigger:function(){
            this.boxing()._afterInsertItems(this);
        }
    }
});
