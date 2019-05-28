xui.Class("xui.UI.CheckBox", ["xui.UI","xui.absValue"],{
    Initialize:function(){
        // compitable
        xui.UI.SCheckBox = xui.UI.CheckBox;
        var key="xui.UI.SCheckBox";
        xui.absBox.$type[key.replace("xui.UI.","")]=xui.absBox.$type[key]=key;
    },
    Instance:{
        fireClickEvent:function(){
            this.getRoot().onClick();
            return this;
        },
        activate:function(){
            this.getSubNode('FOCUS').focus(true);
            return this;
        },
        _setCtrlValue:function(value){
            return this.each(function(profile){
               profile.getSubNode('MARK').tagClass('-checked', !!value);
            });
        },
        //update UI face
        _setDirtyMark:function(){
            return arguments.callee.upper.apply(this,['CAPTION']);
        },
        notifyExcel:xui.UI.Input.prototype.notifyExcel,
        // get control's fake cexcel cell value
        getExcelCellValue:xui.UI.Input.prototype.getExcelCellValue
    },
    Static:{
        Templates:{
            className:'{_className} ',
            style:'{_style} {_hAlign}',
            VALIGN:{
                $order:0,
                style:'{_vAlign}'
            },
            FOCUS:{
                tabindex: '{tabindex}',
                MARK:{
                    $order:0,
                    className:'{_iconPosCls} xuifont',
                    $fonticon:'xui-uicmd-check'
                },
                ICON:{
                    $order:1,
                    className:'xuicon {imageClass}  {picClass}',
                    style:'{backgroundImage}{backgroundPosition}{backgroundSize}{backgroundRepeat}{iconFontSize}{imageDisplay}{iconStyle}',
                    text:'{iconFontCode}' 
                },
                CAPTION:{
                    $order:2,
                    text:'{caption}'
                }
            }
        },
        Appearances:{
            KEY:{
                overflow:'visible'
            },
            MARK:{
               cursor:'pointer',
               margin: '0 .334em 0 .1667em',
               'vertical-align':'middle'
            },
            VALIGN: {
                'font-size':0,
                width:0,
                display: 'inline-block',
                height: '100%'
            },
            FOCUS:{
                cursor:'default',
                'vertical-align':'middle',
                padding:'.1667em 0'
            },
            CAPTION:{
                'vertical-align':xui.browser.ie6?'baseline':'middle',
                'font-size':'1em'
            }
        },
        Behaviors:{
            HoverEffected:{KEY:'MARK',ICON:'ICON'},
            ClickEffected:{KEY:'MARK'},
            NavKeys:{FOCUS:1},
            onClick:function(profile, e, src){
                var p=profile.properties,b=profile.boxing();
                if(p.disabled)return false;
                if(p.readonly)return false;
                b.setUIValue(!p.$UIvalue,null,null,'click');
                if(profile.onChecked)b.onChecked(profile, e, p.$UIvalue);
                profile.getSubNode('FOCUS').focus(true);
            },
            FOCUS:{
                onKeydown:function(profile, e, src){
                    var key = xui.Event.getKey(e).key;
                    if(key ==' ' || key=='enter'){
                        profile.getRoot().onClick(true);
                        return false;
                    }
                }
            }
        },
        DataModel:{
            value:false,
            hAlign:{
                ini:'left',
                listbox:['left','center','right'],
                action: function(v){
                    this.getRoot().css('textAlign',v);
                }
            },
            vAlign:{
                ini:'top',
                listbox:['top','middle','bottom'],
                action: function(v){
                    this.getSubNode('VALIGN').css('verticalAlign', v||'');
                }
            },
            iconPos:{
                ini:'left',
                listbox:['left','right'],
                action:function(v){
                    this.getSubNode("MARK").removeClass('xui-float-left xui-float-right').addClass('xui-float-'+v);
                }
            },
            image:{
                format:'image',
                action: function(v){
                    xui.UI.$iconAction(this);
                }
            },
            imagePos:{
                action: function(value){
                    this.getSubNode('ICON').css('backgroundPosition', value||'center');
                }
            },
            imageBgSize:{
                action: function(value){
                    this.getSubNode('ICON').css('backgroundSize', value||'');
                }
            },
            imageClass: {
                ini:'',
                action:function(v,ov){
                    xui.UI.$iconAction(this, 'ICON', ov);
                }
            },
            iconFontCode:{
                action:function(v){
                    xui.UI.$iconAction(this);
                }
            },
            caption:{
                ini:undefined,
                action: function(v){
                    v=(xui.isSet(v)?v:"")+"";
                    this.getSubNode('CAPTION').html(xui.adjustRes(v,true));
                }
            },
            excelCellId:{
                ini:"",
                action:function(){
                    this.boxing().notifyExcel(false);
                }
            }
        },
        EventHandlers:{
            onChecked:function(profile, e, value){},
            onGetExcelCellValue:function(profile, excelCellId, dftValue){}
        },
        RenderTrigger:function(){
            var ns=this,p=ns.properties;
            if(p.excelCellId)
                ns.boxing().notifyExcel();
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            data._hAlign = 'text-align:'+data.hAlign+';';
            data._vAlign = 'vertical-align:'+(data.vAlign||'');
            data._iconPosCls = 'xui-float-'+data.iconPos;
            return data;
        },
        _ensureValue:function(profile, value){
            return value==="0"?false:!!value;
        }
    }
});
