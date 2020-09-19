xui.Class("xui.UI.Block", "xui.UI.Widget",{
    Initialize:function(){
        var self=this,
            t = self.getTemplate();
        //modify
        t.className += ' {_sidebarStatus}';
        xui.merge(t.FRAME.BORDER,{
            className:'xui-uiw-border {clsBorderType1}',
            SIDEBAR:{
                tagName:'div',
                className:'xui-uisb xui-uibar {_sidebar}',
                SBCAP:{
                    className:'xui-uisbcap xui-title-node',
                    text:'{sideBarCaption}'
                },
                SBBTN:{
                    $order:1,
                    className:'xui-uisbbtn xuifont',
                    $fonticon:'{_fi_btn}'
                }
            },
            PANEL:{
                tagName:'div',
                className:'xui-uibar xui-uicontainer {clsBorderType2}',
                style:'{_panelstyle};{background};{_overflow};',
                text:'{html}'+xui.UI.$childTag
            }
        },'all');
        //set back
        self.setTemplate(t);

        //get default Appearance
        t = self.getAppearance();
        //modify
        xui.merge(t,{
            PANEL:{
                position:'relative',
                overflow:'auto'
            },
            SBCAP:{
                'text-overflow': 'ellipsis',
                'white-space': 'nowrap',
                overflow: 'hidden'
            },
            SBBTN:{
                'z-index':2,
                margin:'0.33333em'
            }
        });
        //set back
        self.setAppearance(t);
    },
    Instance:{
        hide:function(ignoreEffects){
          this.each(function(profile){
              if(profile.$inModal)
                  profile.box._unModal(profile);
          });

          return arguments.callee.upper.apply(this);
        },
        getFiles:function(){
          return this.get(0).$files||[];
        },
        removeFiles:function(files){
          var prf = this.get(0);
          if(files && prf.$files){
            if(xui.isArr(files))
              xui.filter(prf.$files, function(item){return files.indexOf(item)==-1});
            else xui.arr.removeValue(prf.$files,files);
          }else{
            prf.$files = null;
          }
          if(prf.onFiles)prf.boxing().onFiles(prf, prf.$files||[]);
          return prf.$files;
        }
    },
    Static:{
        Behaviors:{
            HoverEffected:{SBBTN:'SBBTN',SBCAP:null},
            ClickEffected:{SBBTN:'SBBTN'},
            DroppableKeys:['PANEL'],
            PanelKeys:['PANEL'],
            PANEL:{
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return false;
                    if(profile.onClickPanel)
                        return profile.boxing().onClickPanel(profile, e, src);
                }
            },
            SBBTN:{
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return false;
                    profile.boxing().setSideBarStatus(p.sideBarStatus=='fold'?'expand':'fold');
                }
            },
            SIDEBAR:{
                onClick:function(profile, e, src){
                    var p=profile.properties,
                        btn=profile.getSubNode('SBBTN');
                    if(p.disabled)return false;
                    if(xui.Event.getSrc(e).$xid!=btn.xid()){
                        if(p.sideBarStatus=='fold'){
                            btn.onClick(true);
                        }
                    }
                }
            }
        },
        EventHandlers:{
            onClickPanel:function(profile, e, src){},
            onClickBackdrop:function(profile, e, src){},
            beforeGetFiles:function(profile, e){},
            onFiles:function(profile, files){},
            onFileError:function(profile, message, file){}
        },
        DataModel:{
            //delete those properties
            disabled:null,
            tips:null,
            rotate:null,
            iframeAutoLoad:{
                ini:"",
                action:function(){
                    xui.UI.Div._applyAutoLoad(this);
                }
            },
            ajaxAutoLoad:{
                ini:"",
                action:function(){
                    xui.UI.Div._applyAutoLoad(this);
                }
            },
            selectable:true,
            backdrop:{
                ini:'',
                combobox:['','transparent','#FFFFFF','background:#000;opacity:0.7;'],
                action:function(v){
                    if(this.box){
                        this.box._unModal(this);
                        if(v)this.box._modal(this);
                    }
                }
            },
            backdropClick:{
              ini:"",
              listbox:['','none','hide','destroy']
            },
            dropFileTypes:{
              ini:'',
              combobox:['','*','image/*','image/jpeg,image/png,image/gif','.doc,.docx']
            },
            maxFileSize:0,
            html:{
                html:1,
                action:function(v,ov,force){
                    this.getSubNode('PANEL').html(xui.adjustRes(v,0,1),null,null,force);
                }
            },
            borderType:{
                ini:'outset',
                listbox:['none','flat','inset','outset','groove','ridge'],
                action:function(v){
                    var ns=this,
                        p=ns.properties;
                    ns.box._borderType(ns, v, p.sideBarStatus, p.sideBarType.split('-'), true);
                }
            },

            // for side bar
            sideBarCaption:{
                ini:'',
                action:function(v){
                    this.getSubNode("SBCAP").html(v);
                }
            },
            sideBarType:{
                ini:'none',
                listbox:['none','left','right','top','bottom','left-top','left-bottom','right-top','right-bottom','top-left','top-right','bottom-left','bottom-right'],
                action:function(v){
                    var ns=this,
                        prop=ns.properties;
                    ns.box._adjustSideBar(ns, prop.sideBarStatus, v);

                    if(prop.dock!='none') ns.boxing().adjustDock(true);
                    else ns.adjustSize();
                }
            },
            sideBarStatus:{
                ini:'expand',
                listbox:['expand','fold'],
                action:function(v){
                    var ns=this,  prop=ns.properties;
                    ns.getRoot().tagClass('-fold', v!='expand');

                    ns.box._adjustSideBar(ns, v, prop.sideBarType);

                    // use sync way
                    xui.UI.$doResize(ns, prop.width, prop.height,true);
                    ns.boxing().adjustDock(true);
                }
            },
            sideBarSize:{
                ini:'2em',
                action:function(v){
                    var ns=this,
                        prop=ns.properties;
                    if(prop.dock=='none')
                        ns.adjustSize();
                    else
                        ns.boxing().adjustDock(true);
                }
            },

            background:{
                format:'color',
                ini:'',
                action:function(v){
                    this.getSubNode('PANEL').css('background',v);
                }
            },
            width:{
                $spaceunit:1,
                ini:'10em'
            },
            height:{
                $spaceunit:1,
                ini:'10em'
            }
        },
        Appearances:{
            KEY:{
                'line-height':'normal'
            },
            'KEY-fold PANEL':{
                display:'none'
            },
            'KEY-fold SIDEBAR':{
                cursor:'pointer',
                'background-color':'#B6B6B6'
            }
        },
        RenderTrigger:function(){
            // only div
            var ns=this;
            if(ns.box.KEY=="xui.UI.Block")
                if(ns.properties.iframeAutoLoad||ns.properties.ajaxAutoLoad)
                    xui.UI.Div._applyAutoLoad(this);
            ns.destroyTrigger = function(){
                var s=this,panel=this.getSubNode("PANEL").get(0);
                if(s.$inModal)s.box._unModal(s);

                if(s.$input){
                  if(s.$inputchange)s.$input.removeEventListener('change',s.$inputchange,false);
                }
                if(s.$dragover)panel.removeEventListener('dragover',s.$dragover,false);
                if(s.$dragleave)panel.removeEventListener('dragleave',s.$dragleave,false);
                if(s.$drop)panel.removeEventListener('drop',s.$drop,false);
                if(s.$click)panel.removeEventListener('click',s.$click,false);

                s.$files=null;
            };
            var dropFileTypes = ns.properties.dropFileTypes, maxFileSize = ns.properties.maxFileSize;
            if(!ns.$inDesign && xui.Dom.supportDropzone() && dropFileTypes){
              var panel = panel=ns.getSubNode("PANEL").get(0),
                input = ns.$input = document.createElement('input'),
                prevent = function(e){e.preventDefault(); e.stopPropagation();},
                validFiles = function(files) {
                  var fs=[], arr = dropFileTypes.split(/,\s*/);
                  for (var i = 0, len = files.length; i < len; i++) {
                    var pass;
                    if(maxFileSize && files[i].size>maxFileSize){
                      if(ns.onFileError)ns.boxing().onFileError(ns, 'File too large', files[i]);
                      continue;
                    }
                    if(!files[i].type){
                      try {
                          new FileReader().readAsBinaryString( file.slice( 0, 5 ) );
                      } catch( e ) {
                        if(ns.onFileError)ns.boxing().onFileError(ns, "It's a dir", files[i]);
                        continue;
                      }
                    }
                    if(arr.indexOf(files[i].type)!=-1){
                      fs.push(files[i]);
                      pass=1;
                    }else{
                      for(var j=0, k=arr.length;j<k;j++){
                        if(arr[j].indexOf("*")!=-1){
                          if(arr[j]=="*" || (new RegExp("^" + arr[j].replace('*','')+ "[.-\\w]+$")).test(files[i].type)){
                            fs.push(files[i]);
                            pass=1;
                            break;
                          }
                        }
                      }
                    }
                    if(!pass && ns.onFileError)ns.boxing().onFileError(ns, 'Type is not allowed: '+files[i].type, files[i]);
                  }
                  return fs;
                };
              var triggerCallback = function(e) {
                var files;
                if(e.dataTransfer) {
                  files = e.dataTransfer.files;
                  if(!files || !files.length){
                    var html = e.dataTransfer.getData('text/html'),
                    match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html),
                    url = match && match[1];
                    if (url) {
                      var img = new Image, c = document.createElement("canvas"),ctx = c.getContext("2d");
                      img.onload = function() {
                          c.width = this.naturalWidth;c.height = this.naturalHeight;
                          ctx.drawImage(this, 0, 0);
                          c.toBlob(function(blob) {
                              if(ns.onFiles)ns.boxing().onFiles(ns, ns.$files = validFiles([blob]));
                          }, "image/png");
                          img.onload = img.onerror = null;
                      };
                      img.onerror = function(e) {
                          if(ns.onFileError)ns.boxing().onFileError(ns, 'Error at: '+url, null);
                          img.onload = img.onerror = null;
                      }
                      img.crossOrigin = "";
                      img.src = url;
                    }
                    return;
                  }else{
                    if(ns.beforeGetFiles && false===ns.boxing().beforeGetFiles(ns, e)){
                        return;
                    }
                    /*
                    beforeGetFiles(function(prf, e){
                      if(xui.Dom.supportPromise() && e.dataTransfer.items && e.dataTransfer.items[0] && e.dataTransfer.items[0].webkitGetAsEntry){
                        var getFilesFromDataTransferItems = async function(dataTransferItems){
                          var readFile = function(entry, path){
                            return new Promise(function(resolve, reject){
                              entry.file(function(file){
                                file.filepath = (path||'') + file.name;
                                resolve(file)
                              }, function(err){reject(err)})
                            })
                          },
                          dirReadEntries = function(dirReader, path){
                            return new Promise(function(resolve, reject){
                              dirReader.readEntries(async function(entries){
                                var files = []
                                for (varentry of entries) {
                                  const itemFiles = await getFilesFromEntry(entry, path)
                                  files = files.concat(itemFiles)
                                }
                                resolve(files);
                              }, function(err){reject(err)})
                            })
                          },
                          readDir = async function(entry, path){
                            var dirReader = entry.createReader(),
                              newPath = path + entry.name + '/',
                              files = [], newFiles;
                            do {
                              newFiles = await dirReadEntries(dirReader, newPath)
                              files = files.concat(newFiles)
                            } while (newFiles.length > 0)
                            return files;
                          },
                          getFilesFromEntry = async function(entry){
                            return entry.isDirectory ? (await readDir(entry, path||'')) : [await readFile(entry, path||'')];
                          },
                          files = [], entries = [];
                          for (var i=0, l=dataTransferItems.length; i<l; i++) entries.push(dataTransferItems[i].webkitGetAsEntry())
                          for (var entry of entries) files = files.concat(await getFilesFromEntry(entry));
                          return files;
                        };
                        (async function(){
                          try{
                            var files = await getFilesFromDataTransferItems(e.dataTransfer.items)
                            if(prf.onFiles)prf.boxing().onFiles(ns, prf.$files = validFiles(files));
                          }catch(e){
                            if(prf.onFileError)prf.boxing().onFileError(ns, 'Error at: '+xui.getErrMsg(e), e);
                          }
                        })();
                        return;
                      }
                    });
                    */
                  }
                } else if(e.target) {
                  files = e.target.files;
                }
                ns.$files = files;
                if(ns.onFiles)ns.boxing().onFiles(ns, ns.$files = validFiles(files));
              }
              input.type = "file";
              input.accept = ns.properties.dropFileTypes;
              input.multiple = true;
              input.style.display = 'none';
              input.addEventListener('change', ns.$inputchange = function(e) {
                triggerCallback(e);
              }, false);
              this.getRootNode().appendChild(input);

              panel.addEventListener('dragover', ns.$dragover = function(e) {
                prevent(e);
                xui.DragDrop.setDropFace(panel);
              }, false);
              panel.addEventListener('dragleave', ns.$dragleave = function(e) {
                prevent(e);
                xui.DragDrop.setDropFace();
              }, false);
              panel.addEventListener('drop', ns.$drop = function(e) {
                prevent(e);
                xui.DragDrop.setDropFace();
                triggerCallback(e);
              }, false);
              panel.addEventListener('click', ns.$click = function() {
                input.value = null;
                input.click();
              }, false);
            }
        },
        _sbicon:function(profile, sideBarStatus, type, ui){
            var target=sideBarStatus=='fold'
                ? type=='left'?'left':type=='right'?'right':type=='top'?'up':'down'
                : type=='left'?'right':type=='right'?'left':type=='top'?'down':'up';

            return ui ? profile.getSubNode('SBBTN').replaceClass(/(xui-icon-double)[\w]+/g,'$1' + target) : 'xui-icon-double'+target;
        },
        _borderType:function(profile, borderType, sideBarStatus, type, adjust){
            type = sideBarStatus=='expand'?type[0]:(type[1]||type[0]);
            var ns=profile,
                v=borderType,
                n1=ns.getSubNode('BORDER'), n2=ns.getSubNode('PANEL'),
                reg=/^xui-uiborder-/,
                b='xui-uiborder-',
                r=b+'radius',
                i=b+'inset',
                o=b+'outset',
                f=b+'flat',
                ibr = type=='left'?r+'-tr '+r+'-br':type=='top'?r+'-bl '+r+'-br':type=='right'?r+'-tl '+r+'-bl':type=='bottom'?r+'-tl '+r+'-tr':r,
                flat=f+' ' +r,
                ins=i+' '+r,
                outs=o+' ' +r,
                ins2=i + ' '+ibr,
                outs2=o+' '+ibr,
                root=ns.getRoot();
            n1.removeClass(reg);
            n2.removeClass(reg);
            switch(v){
                case 'flat':
                n1.addClass(flat);
                n2.addClass(ibr);
                break;
                case 'inset':
                n1.addClass(ins);
                n2.addClass(ibr);
                break;
                case 'outset':
                n1.addClass(outs);
                n2.addClass(ibr);
                break;
                case 'groove':
                n1.addClass(ins);
                n2.addClass(outs2);
                break;
                case 'ridge':
                n1.addClass(outs);
                n2.addClass(ins2);
                break;
            }

            //force to resize
            ns.box._setB(ns);

            if(adjust)
                ns.adjustSize();
        },
        _adjustSideBar:function(prf, sideBarStatus, sideBarType){
            var ns=prf,
                prop=ns.properties,
                reg=/^xui-uisb-/,
                arr=sideBarType.split('-'),
                node=ns.getSubNode('SIDEBAR');
            node.removeClass(reg).addClass('xui-uisb-' + (sideBarStatus=='expand'?arr[0]:(arr[1]||arr[0])));
            ns.box._sbicon(ns, sideBarStatus, arr[1]||arr[0], true);
            ns.box._borderType(ns, prop.borderType, sideBarStatus, arr, false);
        },
        _setB:function(profile){
            var p=profile.properties,
                type=p.borderType,
                nd=profile.getSubNode("BORDER"),
                w=nd._borderW('left');
            p.$hborder=p.$vborder=p.$iborder=0;

            if(type=='flat'||type=='inset'||type=='outset'){p.$hborder=p.$vborder=w;p.$iborder=0;}
            else if(type=='groove'||type=='ridge'){p.$hborder=p.$vborder=p.$iborder=w;}
        },
        LayoutTrigger:function(){
            var self=this,
                prop=self.properties,
                m=prop.sideBarStatus,
                v=prop.borderType;
            if(v!='none')this.boxing().setBorderType(v,true);
            if(m=='fold')this.boxing().setSideBarStatus('fold',true);
            // ensure modal
            if(prop.backdrop){
                var p=self.$modalDiv&&self.$modalDiv.parent(),b=self.box;
                if(p&&p.get(0)&&p.get(0)!==self.getRootNode()){
                    b._unModal(self);
                }
                b._modal(self);
            }
        },
        _modal:function(profile){
            var s=profile.getRoot(),temp,p=s.parent(),props=profile.properties, bdc=props.backdropClick, bd=props.backdrop,cover;
            if(!p.isEmpty()){
                if(!profile.$inModal){
                    if(profile.$modalDiv)profile.$modalDiv.remove();
                    cover = profile.$modalDiv = xui.create("<div class='xui-cover xui-custom xui-cover-modal' style='cursor:default;left:0;top:0;position:absolute;overflow:hidden;display:block;z-index:0;'></div>");
                    cover.css({
                        display:'block',width:Math.max(p.width(), p.scrollWidth())+'px',height:Math.max(p.height(), p.scrollHeight())+'px'
                    })
                    if(/:/.test(bd)){
                      var ex={};
                      xui.arr.each(bd.split(/;\s*/), function(s){
                        var a = s.split(/:\s*/);
                        if(a[0]&&a[0]!=='display'&&a[0]!=='visibility')ex[a[0]] = a[1];
                      });
                      if(!xui.isEmpty(ex))
                         cover.css(ex);
                    }else cover.css('background-color',bd);

                    cover
                    .onClick(function(){
                      if(bdc){
                          if(bdc=="hide")profile.boxing().hide();
                          else if(bdc=="destroy")profile.boxing().destroy();
                      }else if(profile.onClickBackdrop){
                        return profile.boxing().onClickBackdrop(profile, e, src);
                      }
                      return profile.$inDesign?null:false;
                    })
                    .topZindex(true)
                    .setSelectable(false);

                    p.append(cover);

                    // attach onresize event
                    if(p.get(0)===document.body || p.get(0)===document || p.get(0)===window) p=xui.win;

                    if(profile.$inDesign)cover.onClick(function(){s.onClick(true)});

                    p.onSize(function(node){
                        node=xui(node);
                        var w=node.width()+"px",h=node.height()+"px";
                        // set widht/height first
                        cover.css({width:w,height:h});
                        xui.asyRun(function(){
                            var w=Math.max(node.width(),node.scrollWidth())+"px",h=Math.max(node.height(),node.scrollHeight())+"px";
                            cover.css({width:w,height:h});
                        });
                    },"dialog:"+profile.serialId);

                    var i=(parseInt(cover.css('zIndex'),10)||0)+1;
                    s.css('zIndex',i);

                    if(i>=xui.Dom.TOP_ZINDEX)
                        xui.Dom.TOP_ZINDEX =i+1;

                    profile.$inModal=true;
                    // avoid triggering the previously set trigger
                    p.setBlurTrigger(profile.$xid+"_anti", true, xui([cover.get(0),profile.getRootNode()]));
                }
            }
        },
        _unModal:function(profile){
            if(profile.$inModal){
                // detach onresize event
                var p=profile.$modalDiv.parent();
                if(p.get(0)===document.body || p.get(0)===document || p.get(0)===window)
                    p=xui.win;
                p.onSize(null, "block:"+profile.serialId);
                profile.getRoot().css('zIndex',0);
                profile.$modalDiv.css('display','none');
                var node=profile.getSubNode('BORDER');
                if(!node.isEmpty())
                    node.append(profile.$modalDiv);
                profile.$inModal=false;
                p.setBlurTrigger(profile.$xid+"_anti");
            }
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile),
                a=data.sideBarType.split('-'),
                b=data.sideBarStatus;
            data.background= data.background?'background:'+data.background:'';
            if(xui.isStr(data.overflow))
                data._overflow = data.overflow.indexOf(':')!=-1?(data.overflow):(data.overflow?("overflow:"+data.overflow):"");

            data._sidebar = 'xui-uisb-' + (b=='expand'?a[0]:(a[1]||a[0]));
            data._sidebarStatus = b=='fold'?profile.getClass('KEY','-fold'):'';
            data._fi_btn =  profile.box._sbicon(profile, b, a[1]||a[0]);

            return data;
        },
        _onresize:function(profile,width,height){
            var size = arguments.callee.upper.apply(this,arguments),
                root=profile.getRoot(),
                border=profile.getSubNode('BORDER'),
                panel=profile.getSubNode('PANEL'),
                sidebar=profile.getSubNode('SIDEBAR'),
                sbcap=profile.getSubNode('SBCAP'),
                prop=profile.properties,
                sbs=prop.sideBarStatus,
                sbtype=prop.sideBarType.split('-'),
                cb1=border.contentBox(),
                bv=(prop.$vborder||0)*2,
                bh=(prop.$hborder||0)*2,

                cb2=panel.contentBox(),
                b2=(prop.$iborder||0)*2,
                us = xui.$us(profile),
                adjustunit = function(v,emRate){return profile.$forceu(v, us>0?'em':'px', emRate)},

                fzrate=profile.getEmSize()/root._getEmSize(),
                panelfz = panel._getEmSize(fzrate),

                // caculate by px
                ww=width?profile.$px(size.width):size.width,
                hh=height?profile.$px(size.height):size.height,
                sbsize=profile.$px(prop.sideBarSize),
                sbsize2=adjustunit(sbsize);

            sbtype=sbs=='expand'?sbtype[0]:(sbtype[1]||sbtype[0]);

            size.left=size.top=0;
            if(sbtype && sbtype!='none'){
                sbcap.css('line-height',adjustunit(sbsize - (!cb1?0:bh)));
                if(sbtype=='left'||sbtype=='right'){
                    sidebar.width(sbsize2);
                    if(height&&'auto'!==height)
                        sidebar.height(adjustunit(hh- (cb1?0:bv) ));
                }else{
                    sidebar.height(sbsize2);
                    sidebar.width(adjustunit(ww- (cb1?0:bh) ));
                }

                if(sbs=='fold'){
                    if(sbtype=='left'||sbtype=='right'){
                        root.width(adjustunit(sbsize + bh));
                        border.width(adjustunit(sbsize+ (cb1?0:bh)));
                    }else{
                        root.height(adjustunit(sbsize + bv));
                        border.height(adjustunit(sbsize+ (cb1?0:bv)));
                    }
                    return;
                }else{
                    if(sbtype=='left'||sbtype=='right'){
                        root.width(adjustunit(width));
                        border.width(adjustunit(ww));
                    }else{
                        root.height(adjustunit(height));
                        border.height(adjustunit(hh));
                    }
                    switch(sbtype){
                        case 'left':
                            ww-=sbsize;
                            size.left=sbsize;
                            break;
                        case 'right':
                            ww-=sbsize;
                            break;
                        case 'top':
                            hh-=sbsize;
                            size.top=sbsize;
                            break;
                        case 'bottom':
                            hh-=sbsize;
                            break;
                    }
                }
            }
            if(size.width) size.width = adjustunit(ww - (cb1?0:bh) - (!cb2?0:b2), panelfz);
            if(size.height&&'auto'!==size.height)
                size.height = adjustunit(hh - (cb1?0:bv) - (!cb2?0:b2), panelfz);
            panel.cssRegion(size,true);

            if(size.width){
                xui.UI._adjustConW(profile, panel, size.width);
            }
        },
        _showTips:function(profile, node, pos){
            var p=profile.properties;
            if(p.disableTips)return;
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);

            if(!xui.Tips)return;
            if(p.sideBarType=='none')return;

            var id=node.id, ks=profile.keys;
            if(p.sideBarStatus=="fold" && (id.indexOf(ks.SBCAP)===0||id.indexOf(ks.SBBTN)===0)){
                xui.Tips.show(pos, {tips: xui.wrapRes('$inline.Expand')});
                return false;
            }else if(p.sideBarStatus=="expand" && id.indexOf(ks.SBBTN)===0){
                xui.Tips.show(pos, {tips: xui.wrapRes('$inline.Fold')});
                return false;
            }
        }
    }
});

