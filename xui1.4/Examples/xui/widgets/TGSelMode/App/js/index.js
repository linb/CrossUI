
Class('App', 'xui.Com',{
    Instance:{
        events:{onReady:'_onready'}, 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new xui.UI.SLabel)
                .setHost(host,"slabel1")
                .setLeft(157)
                .setTop(40)
                .setCaption("Click to select single cell")
            );
            
            append((new xui.UI.SLabel)
                .setHost(host,"slabel2")
                .setLeft(51)
                .setTop(194)
                .setCaption("Use Alt or Shift keyboard to select multi cells")
            );
            
            append((new xui.UI.SLabel)
                .setHost(host,"slabel3")
                .setLeft(156)
                .setTop(114)
                .setCaption("Click to select single row")
            );
            
            append((new xui.UI.SLabel)
                .setHost(host,"slabel4")
                .setLeft(50)
                .setTop(274)
                .setCaption("Use Alt or Shift keyboard to select multi rows")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput8")
                .setLeft(170)
                .setTop(214)
                .setType("popbox")
                .beforeComboPop("_comboinput8_beforeComboPop")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput4")
                .setLeft(170)
                .setTop(60)
                .setType("popbox")
                .beforeComboPop("_comboinput4_beforeComboPop")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput9")
                .setLeft(170)
                .setTop(140)
                .setType("popbox")
                .beforeComboPop("_comboinput9_beforeComboPop")
            );
            
            append((new xui.UI.ComboInput)
                .setHost(host,"comboinput10")
                .setLeft(170)
                .setTop(294)
                .setType("popbox")
                .beforeComboPop("_comboinput10_beforeComboPop")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _poptg:function(profile, pos, mode1, mode2, callback){
            var g;
            if(!SPA.popTg){
                g=SPA.popTg=new xui.UI.TreeGrid({width:300,height:160,dock:'none',visibility:'hidden',rowHandler:false});
                g.setCustomStyle('KEY','border:solid 1px #888');
                g.setHeader(['a','b','c','d'])
                 .setRows([['1','2','3','4'],['5','6','7','8'],['9','10','11','12'],['13','14','15','16']])
                 .setShowHeader(false);
                xui('body').append(g);
            }
            g=SPA.popTg;
            g.setValue('',true)
             .setActiveMode(mode1)
             .setSelMode(mode2)
             .afterUIValueSet(callback)
             .getRoot().popToTop(pos).setBlurTrigger('__a', function(){
                g.hide();
            });
            xui.Event.keyboardHook('esc',0,0,0,function(){
                g.hide();
                xui.Event.keyboardHook('esc');
            });
        }, 
        _comboinput4_beforeComboPop:function (profile, pos, e, src) {
            this._poptg(profile,pos,'cell','single',function(p, oldValue, newValue) {
                var a=(newValue||'').split('|');
                newValue=p.boxing().getCellbyRowCol(a[0],a[1]);
                profile.boxing().setUIValue(newValue.value);
                SPA.popTg.hide();
             });
             return false;
        }, 
        _comboinput8_beforeComboPop:function (profile, pos, e, src) {
            this._poptg(profile,pos,'cell','multi',function(p, oldValue, newValue) {
                newValue=newValue||'';
                var a=[];
                _.arr.each(newValue.split(';'),function(o){
                    var b=(o||'').split('|');
                    o=p.boxing().getCellbyRowCol(b[0],b[1]);
                    a.push(o.value);
                });
                profile.boxing().setUIValue(a.join(';'));
             });
             return false;
        }, 
        _comboinput9_beforeComboPop:function (profile, pos, e, src) {//
            this._poptg(profile,pos,'row','single',function(p, oldValue, newValue) {
                profile.boxing().setUIValue(newValue);
                SPA.popTg.hide();
             });
             return false;
        }, 
        _comboinput10_beforeComboPop:function (profile, pos, e, src) {
             this._poptg(profile,pos,'row','multi',function(p, oldValue, newValue) {
                profile.boxing().setUIValue(newValue);
             });
             return false;
        }, 
        _onready:function (com, threadid) {
            SPA=this;
        }
    }
});